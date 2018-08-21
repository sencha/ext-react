'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

require('babel-polyfill');

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _cjson = require('cjson');

var _cjson2 = _interopRequireDefault(_cjson);

var _mkdirp = require('mkdirp');

var _extractFromJSX = require('./extractFromJSX');

var _extractFromJSX2 = _interopRequireDefault(_extractFromJSX);

var _rimraf = require('rimraf');

var _artifacts = require('./artifacts');

var _child_process = require('child_process');

var _astring = require('astring');

var _resolve = require('resolve');

var _readline = require('readline');

var readline = _interopRequireWildcard(_readline);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var reactVersion = 0;

var watching = false;
var cmdErrors = void 0;
var app = _chalk2.default.green('ℹ ｢ext｣:') + ' ext-react-webpack-plugin: ';


var gatherErrors = function gatherErrors(cmd) {
  if (cmd.stdout) {
    cmd.stdout.on('data', function (data) {
      var message = data.toString();
      if (message.match(/^\[ERR\]/)) {
        cmdErrors.push(message.replace(/^\[ERR\] /gi, ''));
      }
    });
  }
  return cmd;
};

module.exports = function () {
  /**
   * @param {Object[]} builds
   * @param {Boolean} [debug=false] Set to true to prevent cleanup of build temporary build artifacts that might be helpful in troubleshooting issues.
   * @param {String} sdk The full path to the ExtReact SDK
   * @param {String} [toolkit='modern'] "modern" or "classic"
   * @param {String} theme The name of the ExtReact theme package to use, for example "theme-material"
   * @param {String[]} packages An array of ExtReact packages to include
   * @param {String[]} overrides An array with the paths of directories or files to search. Any classes
   * declared in these locations will be automatically required and included in the build.
   * If any file defines an ExtReact override (using Ext.define with an "override" property),
   * that override will in fact only be included in the build if the target class specified
   * in the "override" property is also included.
   * @param {String} output The path to directory where the ExtReact bundle should be written
   * @param {Boolean} asynchronous Set to true to run Sencha Cmd builds asynchronously. This makes the webpack build finish much faster, but the app may not load correctly in your browser until Sencha Cmd is finished building the ExtReact bundle
   * @param {Boolean} production Set to true for production builds.  This tell Sencha Cmd to compress the generated JS bundle.
   * @param {Boolean} treeShaking Set to false to disable tree shaking in development builds.  This makes incremental rebuilds faster as all ExtReact components are included in the ext.js bundle in the initial build and thus the bundle does not need to be rebuilt after each change. Defaults to true.
   */
  function ExtReactWebpackPlugin(options) {
    _classCallCheck(this, ExtReactWebpackPlugin);

    this.count = 0;
    //can be in devdependencies - account for this: react: "15.16.0"
    var pkg = _fs2.default.existsSync('package.json') && JSON.parse(_fs2.default.readFileSync('package.json', 'utf-8')) || {};
    var reactEntry = pkg.dependencies.react;
    var is16 = reactEntry.includes("16");

    if (is16) {
      reactVersion = 16;
    } else {
      reactVersion = 15;
    }
    this.reactVersion = reactVersion;
    var extReactRc = _fs2.default.existsSync('.ext-reactrc') && JSON.parse(_fs2.default.readFileSync('.ext-reactrc', 'utf-8')) || {};
    options = _extends({}, this.getDefaultOptions(), options, extReactRc);
    var _options = options,
        builds = _options.builds;

    if (Object.keys(builds).length === 0) {
      var _options2 = options,
          _builds = _options2.builds,
          buildOptions = _objectWithoutProperties(_options2, ['builds']);

      _builds.ext = buildOptions;
    }
    for (var name in builds) {
      this._validateBuildConfig(name, builds[name]);
    }Object.assign(this, _extends({}, options, {
      currentFile: null,
      manifest: null,
      dependencies: []
    }));
  }

  _createClass(ExtReactWebpackPlugin, [{
    key: 'watchRun',
    value: function watchRun() {
      this.watch = true;
    }
  }, {
    key: 'apply',
    value: function apply(compiler) {
      var _this = this;

      if (this.webpackVersion == undefined) {
        var isWebpack4 = compiler.hooks;
        if (isWebpack4) {
          this.webpackVersion = 'IS webpack 4';
        } else {
          this.webpackVersion = 'NOT webpack 4';
        }
        readline.cursorTo(process.stdout, 0);console.log(app + 'reactVersion: ' + this.reactVersion + ', ' + this.webpackVersion);
      }
      var me = this;

      if (compiler.hooks) {
        if (this.asynchronous) {
          compiler.hooks.watchRun.tapAsync('ext-react-watch-run (async)', function (watching, cb) {
            readline.cursorTo(process.stdout, 0);console.log(app + 'ext-react-watch-run (async)');
            _this.watchRun();
            cb();
          });
        } else {
          compiler.hooks.watchRun.tap('ext-react-watch-run', function (watching) {
            readline.cursorTo(process.stdout, 0);console.log(app + 'ext-react-watch-run');
            _this.watchRun();
          });
        }
      } else {
        compiler.plugin('watch-run', function (watching, cb) {
          readline.cursorTo(process.stdout, 0);console.log(app + 'watch-run');
          _this.watchRun();
          cb();
        });
      }

      /**
       * Adds the code for the specified function call to the manifest.js file
       * @param {Object} call A function call AST node.
       */
      var addToManifest = function addToManifest(call) {
        try {
          var _file = this.state.module.resource;
          me.dependencies[_file] = [].concat(_toConsumableArray(me.dependencies[_file] || []), [(0, _astring.generate)(call)]);
        } catch (e) {
          console.error('Error processing ' + file);
        }
      };

      if (compiler.hooks) {
        compiler.hooks.compilation.tap('ext-react-compilation', function (compilation, data) {
          readline.cursorTo(process.stdout, 0);console.log(app + 'ext-react-compilation');
          compilation.hooks.succeedModule.tap('ext-react-succeed-module', function (module) {
            _this.succeedModule(compilation, module);
          });

          data.normalModuleFactory.plugin("parser", function (parser, options) {
            // extract xtypes and classes from Ext.create calls
            parser.plugin('call Ext.create', addToManifest);
            // copy Ext.require calls to the manifest.  This allows the users to explicitly require a class if the plugin fails to detect it.
            parser.plugin('call Ext.require', addToManifest);
            // copy Ext.define calls to the manifest.  This allows users to write standard ExtReact classes.
            parser.plugin('call Ext.define', addToManifest);
          });

          compilation.hooks.htmlWebpackPluginBeforeHtmlGeneration.tapAsync('ext-react-htmlgeneration', function (data, cb) {
            readline.cursorTo(process.stdout, 0);console.log(app + 'ext-react-htmlgeneration');
            data.assets.js.unshift('ext-react/ext.js');
            data.assets.css.unshift('ext-react/ext.css');
            cb(null, data);
          });
        });
      } else {
        compiler.plugin('compilation', function (compilation, data) {
          readline.cursorTo(process.stdout, 0);console.log(app + 'compilation');
          compilation.plugin('succeed-module', function (module) {
            _this.succeedModule(compilation, module);
          });
          data.normalModuleFactory.plugin("parser", function (parser, options) {
            // extract xtypes and classes from Ext.create calls
            parser.plugin('call Ext.create', addToManifest);
            // copy Ext.require calls to the manifest.  This allows the users to explicitly require a class if the plugin fails to detect it.
            parser.plugin('call Ext.require', addToManifest);
            // copy Ext.define calls to the manifest.  This allows users to write standard ExtReact classes.
            parser.plugin('call Ext.define', addToManifest);
          });
        });
      }

      //*emit - once all modules are processed, create the optimized ExtReact build.
      if (compiler.hooks) {
        if (true) {
          compiler.hooks.emit.tapAsync('ext-react-emit (async)', function (compilation, callback) {
            readline.cursorTo(process.stdout, 0);console.log(app + 'ext-react-emit  (async)');
            _this.emit(compiler, compilation, callback);
            //console.log(app + 'after ext-react-emit  (async)')
          });
        } else {
          compiler.hooks.emit.tap('ext-react-emit', function (compilation) {
            readline.cursorTo(process.stdout, 0);console.log(app + 'ext-react-emit');
            _this.emit(compiler, compilation);
            //console.log(app + 'after ext-react-emit')
          });
        }
      } else {
        compiler.plugin('emit', function (compilation, callback) {
          readline.cursorTo(process.stdout, 0);console.log(app + 'emit');
          _this.emit(compiler, compilation, callback);
          callback();
        });
      }

      if (compiler.hooks) {
        if (this.asynchronous) {
          compiler.hooks.done.tapAsync('ext-react-done (async)', function (compilation, callback) {
            readline.cursorTo(process.stdout, 0);console.log(app + 'ext-react-done (async)');
            if (callback != null) {
              if (_this.asynchronous) {
                console.log('calling callback for ext-react-emit  (async)');
                callback();
              }
            }
          });
        } else {
          compiler.hooks.done.tap('ext-react-done', function () {
            readline.cursorTo(process.stdout, 0);console.log(app + 'ext-react-done');
          });
        }
      }
    }
  }, {
    key: 'emit',
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(compiler, compilation, callback) {
        var isWebpack4, modules, build, outputPath, promise, result, url, opn;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                isWebpack4 = compilation.hooks;
                modules = [];

                if (isWebpack4) {
                  isWebpack4 = true;
                  //modules = compilation.chunks.reduce((a, b) => a.concat(b._modules), []);
                } else {
                  isWebpack4 = false;
                  //modules = compilation.chunks.reduce((a, b) => a.concat(b.modules), []);
                }
                build = this.builds[Object.keys(this.builds)[0]];
                outputPath = _path2.default.join(compiler.outputPath, this.output);
                // webpack-dev-server overwrites the outputPath to "/", so we need to prepend contentBase

                if (compiler.outputPath === '/' && compiler.options.devServer) {
                  outputPath = _path2.default.join(compiler.options.devServer.contentBase, outputPath);
                }
                promise = this._buildExtBundle(isWebpack4, 'not', modules, outputPath, build, callback);
                _context.next = 9;
                return promise;

              case 9:
                result = _context.sent;


                if (this.watch) {
                  if (this.count == 0) {
                    url = 'http://localhost:' + this.port;

                    readline.cursorTo(process.stdout, 0);console.log(app + 'ext-react-emit - open browser at ' + url);
                    this.count++;
                    opn = require('opn');

                    opn(url);
                  }
                }
                //if (callback != null){if (this.asynchronous){callback()}}
                if (callback != null) {
                  if (true) {
                    callback();
                  }
                }

              case 12:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function emit(_x, _x2, _x3) {
        return _ref.apply(this, arguments);
      }

      return emit;
    }()

    /**
     /**
      * Builds a minimal version of the ExtReact framework based on the classes used
      * @param {String} name The name of the build
      * @param {Module[]} modules webpack modules
      * @param {String} output The path to where the framework build should be written
      * @param {String} [toolkit='modern'] "modern" or "classic"
      * @param {String} output The path to the directory to create which will contain the js and css bundles
      * @param {String} theme The name of the ExtReact theme package to use, for example "theme-material"
      * @param {String[]} packages An array of ExtReact packages to include
      * @param {String[]} packageDirs Directories containing packages
      * @param {String[]} overrides An array of locations for overrides
      * @param {String} sdk The full path to the ExtReact SDK
      * @private
      */

  }, {
    key: '_buildExtBundle',
    value: function _buildExtBundle(isWebpack4, name, modules, output, _ref2) {
      var _this2 = this;

      var _ref2$toolkit = _ref2.toolkit,
          toolkit = _ref2$toolkit === undefined ? 'modern' : _ref2$toolkit,
          theme = _ref2.theme,
          _ref2$packages = _ref2.packages,
          packages = _ref2$packages === undefined ? [] : _ref2$packages,
          _ref2$packageDirs = _ref2.packageDirs,
          packageDirs = _ref2$packageDirs === undefined ? [] : _ref2$packageDirs,
          sdk = _ref2.sdk,
          overrides = _ref2.overrides,
          callback = _ref2.callback;

      var sencha = this._getSenchCmdPath();
      theme = theme || (toolkit === 'classic' ? 'theme-triton' : 'theme-material');

      return new Promise(function (resolve, reject) {
        _this2.onBuildFail = reject;
        _this2.onBuildSuccess = resolve;
        cmdErrors = [];

        var onBuildDone = function onBuildDone() {
          if (cmdErrors.length) {
            _this2.onBuildFail(new Error(cmdErrors.join("")));
          } else {
            _this2.onBuildSuccess();
          }
        };

        if (!watching) {
          (0, _rimraf.sync)(output);
          (0, _mkdirp.sync)(output);
        }

        var js = void 0;
        if (_this2.treeShaking) {
          var statements = ['Ext.require(["Ext.app.Application", "Ext.Component", "Ext.Widget", "Ext.layout.Fit", "Ext.react.Transition", "Ext.react.RendererCell"])']; // for some reason command doesn't load component when only panel is required
          // if (packages.indexOf('reacto') !== -1) {
          //   statements.push('Ext.require("Ext.react.RendererCell")');
          // }
          //mjg
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = modules[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var _module = _step.value;

              var deps = _this2.dependencies[_module.resource];
              if (deps) statements = statements.concat(deps);
            }
          } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
              }
            } finally {
              if (_didIteratorError) {
                throw _iteratorError;
              }
            }
          }

          js = statements.join(';\n');
        } else {
          js = 'Ext.require("Ext.*")';
        }
        var manifest = _path2.default.join(output, 'manifest.js');
        // add ext-react/packages automatically if present
        var userPackages = _path2.default.join('.', 'ext-react', 'packages');
        if (_fs2.default.existsSync(userPackages)) {
          packageDirs.push(userPackages);
        }

        if (_fs2.default.existsSync(_path2.default.join(sdk, 'ext'))) {
          // local checkout of the SDK repo
          packageDirs.push(_path2.default.join('ext', 'packages'));
          sdk = _path2.default.join(sdk, 'ext');
        }
        if (!watching) {
          _fs2.default.writeFileSync(_path2.default.join(output, 'build.xml'), (0, _artifacts.buildXML)({ compress: _this2.production }), 'utf8');
          _fs2.default.writeFileSync(_path2.default.join(output, 'jsdom-environment.js'), (0, _artifacts.createJSDOMEnvironment)(), 'utf8');
          _fs2.default.writeFileSync(_path2.default.join(output, 'app.json'), (0, _artifacts.createAppJson)({ theme: theme, packages: packages, toolkit: toolkit, overrides: overrides, packageDirs: packageDirs }), 'utf8');
          _fs2.default.writeFileSync(_path2.default.join(output, 'workspace.json'), (0, _artifacts.createWorkspaceJson)(sdk, packageDirs, output), 'utf8');
        }
        var cmdRebuildNeeded = false;
        if (_this2.manifest === null || js !== _this2.manifest) {
          // Only write manifest if it differs from the last run.  This prevents unnecessary cmd rebuilds.
          _this2.manifest = js;
          //readline.cursorTo(process.stdout, 0);console.log(app + js)
          readline.cursorTo(process.stdout, 0);console.log(app + 'tree shaking: ' + _this2.treeShaking);
          _fs2.default.writeFileSync(manifest, js, 'utf8');
          cmdRebuildNeeded = true;
          readline.cursorTo(process.stdout, 0);console.log(app + ('building ExtReact bundle at: ' + output));
        }

        if (_this2.watch) {
          if (!watching) {
            watching = gatherErrors((0, _child_process.fork)(sencha, ['ant', 'watch'], { cwd: output, silent: true }));
            watching.stderr.pipe(process.stderr);
            watching.stdout.pipe(process.stdout);
            watching.stdout.on('data', function (data) {
              if (data && data.toString().match(/Waiting for changes\.\.\./)) {
                onBuildDone();
              }
            });
            watching.on('exit', onBuildDone);
          }
          if (!cmdRebuildNeeded) {
            readline.cursorTo(process.stdout, 0);console.log(app + 'Ext rebuild NOT needed');
            onBuildDone();
          } else {
            //readline.cursorTo(process.stdout, 0);console.log(app + 'Ext rebuild IS needed')
          }
        } else {
          var build = gatherErrors((0, _child_process.fork)(sencha, ['ant', 'build'], { stdio: 'inherit', encoding: 'utf-8', cwd: output, silent: false }));
          readline.cursorTo(process.stdout, 0);console.log(app + 'sencha ant build');
          if (build.stdout) {
            build.stdout.pipe(process.stdout);
          }
          if (build.stderr) {
            build.stderr.pipe(process.stderr);
          }
          build.on('exit', onBuildDone);
        }
      });
    }

    /**
     * Default config options
     * @protected
     * @return {Object}
     */

  }, {
    key: 'getDefaultOptions',
    value: function getDefaultOptions() {
      return {
        port: 8016,
        builds: {},
        debug: false,
        watch: false,
        test: /\.(j|t)sx?$/,

        /* begin single build only */
        output: 'ext-react',
        toolkit: 'modern',
        packages: null,
        packageDirs: [],
        overrides: [],
        asynchronous: false,
        production: false,
        manifestExtractor: _extractFromJSX2.default,
        treeShaking: false
        /* end single build only */
      };
    }
  }, {
    key: 'succeedModule',
    value: function succeedModule(compilation, module) {
      var _this3 = this;

      this.currentFile = module.resource;
      if (module.resource && module.resource.match(this.test) && !module.resource.match(/node_modules/) && !module.resource.match('/ext-react' + reactVersion + '/')) {
        var doParse = function doParse() {
          _this3.dependencies[_this3.currentFile] = [].concat(_toConsumableArray(_this3.dependencies[_this3.currentFile] || []), _toConsumableArray(_this3.manifestExtractor(module._source._value, compilation, module, reactVersion)));
        };
        if (this.debug) {
          doParse();
        } else {
          try {
            doParse();
          } catch (e) {
            console.error('\nerror parsing ' + this.currentFile);
            console.error(e);
          }
        }
      }
    }

    /**
     * Checks each build config for missing/invalid properties
     * @param {String} name The name of the build
     * @param {String} build The build config
     * @private
     */

  }, {
    key: '_validateBuildConfig',
    value: function _validateBuildConfig(name, build) {
      var sdk = build.sdk,
          production = build.production;


      if (production) {
        build.treeShaking = false;
      }
      if (sdk) {
        if (!_fs2.default.existsSync(sdk)) {
          throw new Error('No SDK found at ' + _path2.default.resolve(sdk) + '.  Did you for get to link/copy your Ext JS SDK to that location?');
        } else {
          //mjg this needed? this._addReactorPackage(build)
        }
      } else {
        try {
          //build.sdk = path.dirname(resolve('@sencha/ext-modern', { basedir: process.cwd() }))
          build.sdk = _path2.default.dirname((0, _resolve.sync)('@sencha/ext', { basedir: process.cwd() }));
          build.packageDirs = [].concat(_toConsumableArray(build.packageDirs || []), [_path2.default.dirname(build.sdk)]);
          build.packages = build.packages || this._findPackages(build.sdk);
        } catch (e) {
          //throw new Error(`@sencha/ext-modern not found.  You can install it with "npm install --save @sencha/ext-modern" or, if you have a local copy of the SDK, specify the path to it using the "sdk" option in build "${name}."`);
          throw new Error('@sencha/ext not found.  You can install it with "npm install --save @sencha/ext-modern" or, if you have a local copy of the SDK, specify the path to it using the "sdk" option in build "' + name + '."');
        }
      }
    }

    // /**
    //  * Adds the reactor package if present and the toolkit is modern
    //  * @param {Object} build 
    //  */
    // _addReactorPackage(build) {
    //   if (build.toolkit === 'classic') return;
    //   if (fs.existsSync(path.join(build.sdk, 'ext', 'modern', 'reactor')) ||  // repo
    //     fs.existsSync(path.join(build.sdk, 'modern', 'reactor'))) { // production build
    //     if (!build.packages) {
    //       build.packages = [];
    //     }
    //     build.packages.push('reactor');
    //   }
    // }

    /**
     * Return the names of all ExtReact packages in the same parent directory as ext-react (typically node_modules/@extjs)
     * @private
     * @param {String} sdk Path to ext-react
     * @return {String[]}
     */

  }, {
    key: '_findPackages',
    value: function _findPackages(sdk) {
      var modulesDir = _path2.default.join(sdk, '..');
      return _fs2.default.readdirSync(modulesDir)
      // Filter out directories without 'package.json'
      .filter(function (dir) {
        return _fs2.default.existsSync(_path2.default.join(modulesDir, dir, 'package.json'));
      })
      // Generate array of package names
      .map(function (dir) {
        var packageInfo = JSON.parse(_fs2.default.readFileSync(_path2.default.join(modulesDir, dir, 'package.json')));
        // Don't include theme type packages.
        if (packageInfo.sencha && packageInfo.sencha.type !== 'theme') {
          return packageInfo.sencha.name;
        }
      })
      // Remove any undefineds from map
      .filter(function (name) {
        return name;
      });
    }

    /**
     * Returns the path to the sencha cmd executable
     * @private
     * @return {String}
     */

  }, {
    key: '_getSenchCmdPath',
    value: function _getSenchCmdPath() {
      try {
        // use @extjs/sencha-cmd from node_modules
        return require('@sencha/cmd');
      } catch (e) {
        // attempt to use globally installed Sencha Cmd
        return 'sencha';
      }
    }
  }]);

  return ExtReactWebpackPlugin;
}();

// from this.emit
// the following is needed for html-webpack-plugin to include <script> and <link> tags for ExtReact
// console.log('compilation')
// console.log('********compilation.chunks[0]')
// console.log(compilation.chunks[0].id)
// console.log(path.join(this.output, 'ext.js'))
// const jsChunk = compilation.addChunk(`${this.output}-js`);
// jsChunk.hasRuntime = jsChunk.isInitial = () => true;
// jsChunk.files.push(path.join(this.output, 'ext.js'));
// jsChunk.files.push(path.join(this.output, 'ext.css'));
// jsChunk.id = 'aaaap'; // this forces html-webpack-plugin to include ext.js first
// console.log('********compilation.chunks[1]')
// console.log(compilation.chunks[1].id)

//if (this.asynchronous) callback();
//    console.log(callback)

// if (isWebpack4) {
//   console.log(path.join(this.output, 'ext.js'))
//   const stats = fs.statSync(path.join(outputPath, 'ext.js'))
//   const fileSizeInBytes = stats.size
//   compilation.assets['ext.js'] = {
//     source: function() {return fs.readFileSync(path.join(outputPath, 'ext.js'))},
//     size: function() {return fileSizeInBytes}
//   }
//   console.log(compilation.entrypoints)

//   var filelist = 'In this build:\n\n';

//   // Loop through all compiled assets,
//   // adding a new line item for each filename.
//   for (var filename in compilation.assets) {
//     filelist += ('- '+ filename +'\n');
//   }

//   // Insert this list into the webpack build as a new file asset:
//   compilation.assets['filelist.md'] = {
//     source() {
//       return filelist;
//     },
//     size() {
//       return filelist.length;
//     }
//   }
// }


// if (compiler.hooks) {
//     // in 'extreact-compilation'
//     //https://github.com/jaketrent/html-webpack-template
//     //https://github.com/jantimon/html-webpack-plugin#
//     // the following is needed for html-webpack-plugin to include <script> and <link> tags for ExtReact
//     compiler.hooks.htmlWebpackPluginBeforeHtmlGeneration.tapAsync(
//       'extreact-htmlgeneration',
//       (data, cb) => {
//         readline.cursorTo(process.stdout, 0);console.log(app + 'extreact-htmlgeneration')
//         console.log('data.assets.js.length')
//         console.log(data.assets.js.length)
//         data.assets.js.unshift('ext-react/ext.js')
//         data.assets.css.unshift('ext-react/ext.css')
//         cb(null, data)
//       }
//     )
//   }
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJyZWFkbGluZSIsInJlYWN0VmVyc2lvbiIsIndhdGNoaW5nIiwiY21kRXJyb3JzIiwiYXBwIiwiY2hhbGsiLCJncmVlbiIsImdhdGhlckVycm9ycyIsImNtZCIsInN0ZG91dCIsIm9uIiwibWVzc2FnZSIsImRhdGEiLCJ0b1N0cmluZyIsIm1hdGNoIiwicHVzaCIsInJlcGxhY2UiLCJtb2R1bGUiLCJleHBvcnRzIiwib3B0aW9ucyIsImNvdW50IiwicGtnIiwiZnMiLCJleGlzdHNTeW5jIiwiSlNPTiIsInBhcnNlIiwicmVhZEZpbGVTeW5jIiwicmVhY3RFbnRyeSIsImRlcGVuZGVuY2llcyIsInJlYWN0IiwiaXMxNiIsImluY2x1ZGVzIiwiZXh0UmVhY3RSYyIsImdldERlZmF1bHRPcHRpb25zIiwiYnVpbGRzIiwiT2JqZWN0Iiwia2V5cyIsImxlbmd0aCIsImJ1aWxkT3B0aW9ucyIsImV4dCIsIm5hbWUiLCJfdmFsaWRhdGVCdWlsZENvbmZpZyIsImFzc2lnbiIsImN1cnJlbnRGaWxlIiwibWFuaWZlc3QiLCJ3YXRjaCIsImNvbXBpbGVyIiwid2VicGFja1ZlcnNpb24iLCJ1bmRlZmluZWQiLCJpc1dlYnBhY2s0IiwiaG9va3MiLCJjdXJzb3JUbyIsInByb2Nlc3MiLCJjb25zb2xlIiwibG9nIiwibWUiLCJhc3luY2hyb25vdXMiLCJ3YXRjaFJ1biIsInRhcEFzeW5jIiwiY2IiLCJ0YXAiLCJwbHVnaW4iLCJhZGRUb01hbmlmZXN0IiwiY2FsbCIsImZpbGUiLCJzdGF0ZSIsInJlc291cmNlIiwiZSIsImVycm9yIiwiY29tcGlsYXRpb24iLCJzdWNjZWVkTW9kdWxlIiwibm9ybWFsTW9kdWxlRmFjdG9yeSIsInBhcnNlciIsImh0bWxXZWJwYWNrUGx1Z2luQmVmb3JlSHRtbEdlbmVyYXRpb24iLCJhc3NldHMiLCJqcyIsInVuc2hpZnQiLCJjc3MiLCJlbWl0IiwiY2FsbGJhY2siLCJkb25lIiwibW9kdWxlcyIsImJ1aWxkIiwib3V0cHV0UGF0aCIsInBhdGgiLCJqb2luIiwib3V0cHV0IiwiZGV2U2VydmVyIiwiY29udGVudEJhc2UiLCJwcm9taXNlIiwiX2J1aWxkRXh0QnVuZGxlIiwicmVzdWx0IiwidXJsIiwicG9ydCIsIm9wbiIsInJlcXVpcmUiLCJ0b29sa2l0IiwidGhlbWUiLCJwYWNrYWdlcyIsInBhY2thZ2VEaXJzIiwic2RrIiwib3ZlcnJpZGVzIiwic2VuY2hhIiwiX2dldFNlbmNoQ21kUGF0aCIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0Iiwib25CdWlsZEZhaWwiLCJvbkJ1aWxkU3VjY2VzcyIsIm9uQnVpbGREb25lIiwiRXJyb3IiLCJ0cmVlU2hha2luZyIsInN0YXRlbWVudHMiLCJkZXBzIiwiY29uY2F0IiwidXNlclBhY2thZ2VzIiwid3JpdGVGaWxlU3luYyIsImNvbXByZXNzIiwicHJvZHVjdGlvbiIsImNtZFJlYnVpbGROZWVkZWQiLCJjd2QiLCJzaWxlbnQiLCJzdGRlcnIiLCJwaXBlIiwic3RkaW8iLCJlbmNvZGluZyIsImRlYnVnIiwidGVzdCIsIm1hbmlmZXN0RXh0cmFjdG9yIiwiZXh0cmFjdEZyb21KU1giLCJkb1BhcnNlIiwiX3NvdXJjZSIsIl92YWx1ZSIsImRpcm5hbWUiLCJiYXNlZGlyIiwiX2ZpbmRQYWNrYWdlcyIsIm1vZHVsZXNEaXIiLCJyZWFkZGlyU3luYyIsImZpbHRlciIsImRpciIsIm1hcCIsInBhY2thZ2VJbmZvIiwidHlwZSJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztBQUNBOztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFJQTs7SUFBWUEsUTs7Ozs7Ozs7Ozs7Ozs7QUFmWixJQUFJQyxlQUFlLENBQW5COztBQVlBLElBQUlDLFdBQVcsS0FBZjtBQUNBLElBQUlDLGtCQUFKO0FBQ0EsSUFBTUMsTUFBU0MsZ0JBQU1DLEtBQU4sQ0FBWSxVQUFaLENBQVQs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QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0k7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcbmltcG9ydCAnYmFiZWwtcG9seWZpbGwnO1xudmFyIHJlYWN0VmVyc2lvbiA9IDBcbmltcG9ydCBjaGFsayBmcm9tICdjaGFsayc7XG5pbXBvcnQgZnMgZnJvbSAnZnMnO1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgY2pzb24gZnJvbSAnY2pzb24nO1xuaW1wb3J0IHsgc3luYyBhcyBta2RpcnAgfSBmcm9tICdta2RpcnAnO1xuaW1wb3J0IGV4dHJhY3RGcm9tSlNYIGZyb20gJy4vZXh0cmFjdEZyb21KU1gnO1xuaW1wb3J0IHsgc3luYyBhcyByaW1yYWYgfSBmcm9tICdyaW1yYWYnO1xuaW1wb3J0IHsgYnVpbGRYTUwsIGNyZWF0ZUFwcEpzb24sIGNyZWF0ZVdvcmtzcGFjZUpzb24sIGNyZWF0ZUpTRE9NRW52aXJvbm1lbnQgfSBmcm9tICcuL2FydGlmYWN0cyc7XG5pbXBvcnQgeyBleGVjU3luYywgc3Bhd24sIGZvcmsgfSBmcm9tICdjaGlsZF9wcm9jZXNzJztcbmltcG9ydCB7IGdlbmVyYXRlIH0gZnJvbSAnYXN0cmluZyc7XG5pbXBvcnQgeyBzeW5jIGFzIHJlc29sdmUgfSBmcm9tICdyZXNvbHZlJztcbmxldCB3YXRjaGluZyA9IGZhbHNlO1xubGV0IGNtZEVycm9ycztcbmNvbnN0IGFwcCA9IGAke2NoYWxrLmdyZWVuKCfihLkg772iZXh0772jOicpfSBleHQtcmVhY3Qtd2VicGFjay1wbHVnaW46IGA7XG5pbXBvcnQgKiBhcyByZWFkbGluZSBmcm9tICdyZWFkbGluZSdcblxuY29uc3QgZ2F0aGVyRXJyb3JzID0gKGNtZCkgPT4ge1xuICBpZiAoY21kLnN0ZG91dCkge1xuICAgIGNtZC5zdGRvdXQub24oJ2RhdGEnLCBkYXRhID0+IHtcbiAgICAgIGNvbnN0IG1lc3NhZ2UgPSBkYXRhLnRvU3RyaW5nKCk7XG4gICAgICBpZiAobWVzc2FnZS5tYXRjaCgvXlxcW0VSUlxcXS8pKSB7XG4gICAgICAgIGNtZEVycm9ycy5wdXNoKG1lc3NhZ2UucmVwbGFjZSgvXlxcW0VSUlxcXSAvZ2ksICcnKSk7XG4gICAgICB9XG4gICAgfSlcbiAgfVxuICByZXR1cm4gY21kO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNsYXNzIEV4dFJlYWN0V2VicGFja1BsdWdpbiB7XG4gIC8qKlxuICAgKiBAcGFyYW0ge09iamVjdFtdfSBidWlsZHNcbiAgICogQHBhcmFtIHtCb29sZWFufSBbZGVidWc9ZmFsc2VdIFNldCB0byB0cnVlIHRvIHByZXZlbnQgY2xlYW51cCBvZiBidWlsZCB0ZW1wb3JhcnkgYnVpbGQgYXJ0aWZhY3RzIHRoYXQgbWlnaHQgYmUgaGVscGZ1bCBpbiB0cm91Ymxlc2hvb3RpbmcgaXNzdWVzLlxuICAgKiBAcGFyYW0ge1N0cmluZ30gc2RrIFRoZSBmdWxsIHBhdGggdG8gdGhlIEV4dFJlYWN0IFNES1xuICAgKiBAcGFyYW0ge1N0cmluZ30gW3Rvb2xraXQ9J21vZGVybiddIFwibW9kZXJuXCIgb3IgXCJjbGFzc2ljXCJcbiAgICogQHBhcmFtIHtTdHJpbmd9IHRoZW1lIFRoZSBuYW1lIG9mIHRoZSBFeHRSZWFjdCB0aGVtZSBwYWNrYWdlIHRvIHVzZSwgZm9yIGV4YW1wbGUgXCJ0aGVtZS1tYXRlcmlhbFwiXG4gICAqIEBwYXJhbSB7U3RyaW5nW119IHBhY2thZ2VzIEFuIGFycmF5IG9mIEV4dFJlYWN0IHBhY2thZ2VzIHRvIGluY2x1ZGVcbiAgICogQHBhcmFtIHtTdHJpbmdbXX0gb3ZlcnJpZGVzIEFuIGFycmF5IHdpdGggdGhlIHBhdGhzIG9mIGRpcmVjdG9yaWVzIG9yIGZpbGVzIHRvIHNlYXJjaC4gQW55IGNsYXNzZXNcbiAgICogZGVjbGFyZWQgaW4gdGhlc2UgbG9jYXRpb25zIHdpbGwgYmUgYXV0b21hdGljYWxseSByZXF1aXJlZCBhbmQgaW5jbHVkZWQgaW4gdGhlIGJ1aWxkLlxuICAgKiBJZiBhbnkgZmlsZSBkZWZpbmVzIGFuIEV4dFJlYWN0IG92ZXJyaWRlICh1c2luZyBFeHQuZGVmaW5lIHdpdGggYW4gXCJvdmVycmlkZVwiIHByb3BlcnR5KSxcbiAgICogdGhhdCBvdmVycmlkZSB3aWxsIGluIGZhY3Qgb25seSBiZSBpbmNsdWRlZCBpbiB0aGUgYnVpbGQgaWYgdGhlIHRhcmdldCBjbGFzcyBzcGVjaWZpZWRcbiAgICogaW4gdGhlIFwib3ZlcnJpZGVcIiBwcm9wZXJ0eSBpcyBhbHNvIGluY2x1ZGVkLlxuICAgKiBAcGFyYW0ge1N0cmluZ30gb3V0cHV0IFRoZSBwYXRoIHRvIGRpcmVjdG9yeSB3aGVyZSB0aGUgRXh0UmVhY3QgYnVuZGxlIHNob3VsZCBiZSB3cml0dGVuXG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gYXN5bmNocm9ub3VzIFNldCB0byB0cnVlIHRvIHJ1biBTZW5jaGEgQ21kIGJ1aWxkcyBhc3luY2hyb25vdXNseS4gVGhpcyBtYWtlcyB0aGUgd2VicGFjayBidWlsZCBmaW5pc2ggbXVjaCBmYXN0ZXIsIGJ1dCB0aGUgYXBwIG1heSBub3QgbG9hZCBjb3JyZWN0bHkgaW4geW91ciBicm93c2VyIHVudGlsIFNlbmNoYSBDbWQgaXMgZmluaXNoZWQgYnVpbGRpbmcgdGhlIEV4dFJlYWN0IGJ1bmRsZVxuICAgKiBAcGFyYW0ge0Jvb2xlYW59IHByb2R1Y3Rpb24gU2V0IHRvIHRydWUgZm9yIHByb2R1Y3Rpb24gYnVpbGRzLiAgVGhpcyB0ZWxsIFNlbmNoYSBDbWQgdG8gY29tcHJlc3MgdGhlIGdlbmVyYXRlZCBKUyBidW5kbGUuXG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gdHJlZVNoYWtpbmcgU2V0IHRvIGZhbHNlIHRvIGRpc2FibGUgdHJlZSBzaGFraW5nIGluIGRldmVsb3BtZW50IGJ1aWxkcy4gIFRoaXMgbWFrZXMgaW5jcmVtZW50YWwgcmVidWlsZHMgZmFzdGVyIGFzIGFsbCBFeHRSZWFjdCBjb21wb25lbnRzIGFyZSBpbmNsdWRlZCBpbiB0aGUgZXh0LmpzIGJ1bmRsZSBpbiB0aGUgaW5pdGlhbCBidWlsZCBhbmQgdGh1cyB0aGUgYnVuZGxlIGRvZXMgbm90IG5lZWQgdG8gYmUgcmVidWlsdCBhZnRlciBlYWNoIGNoYW5nZS4gRGVmYXVsdHMgdG8gdHJ1ZS5cbiAgICovXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICB0aGlzLmNvdW50ID0gMFxuICAgIC8vY2FuIGJlIGluIGRldmRlcGVuZGVuY2llcyAtIGFjY291bnQgZm9yIHRoaXM6IHJlYWN0OiBcIjE1LjE2LjBcIlxuICAgIHZhciBwa2cgPSAoZnMuZXhpc3RzU3luYygncGFja2FnZS5qc29uJykgJiYgSlNPTi5wYXJzZShmcy5yZWFkRmlsZVN5bmMoJ3BhY2thZ2UuanNvbicsICd1dGYtOCcpKSB8fCB7fSk7XG4gICAgdmFyIHJlYWN0RW50cnkgPSBwa2cuZGVwZW5kZW5jaWVzLnJlYWN0XG4gICAgdmFyIGlzMTYgPSByZWFjdEVudHJ5LmluY2x1ZGVzKFwiMTZcIik7XG5cbiAgICBpZiAoaXMxNikgeyByZWFjdFZlcnNpb24gPSAxNiB9XG4gICAgZWxzZSB7IHJlYWN0VmVyc2lvbiA9IDE1IH1cbiAgICB0aGlzLnJlYWN0VmVyc2lvbiA9IHJlYWN0VmVyc2lvblxuICAgIGNvbnN0IGV4dFJlYWN0UmMgPSAoZnMuZXhpc3RzU3luYygnLmV4dC1yZWFjdHJjJykgJiYgSlNPTi5wYXJzZShmcy5yZWFkRmlsZVN5bmMoJy5leHQtcmVhY3RyYycsICd1dGYtOCcpKSB8fCB7fSk7XG4gICAgb3B0aW9ucyA9IHsgLi4udGhpcy5nZXREZWZhdWx0T3B0aW9ucygpLCAuLi5vcHRpb25zLCAuLi5leHRSZWFjdFJjIH07XG4gICAgY29uc3QgeyBidWlsZHMgfSA9IG9wdGlvbnM7XG4gICAgaWYgKE9iamVjdC5rZXlzKGJ1aWxkcykubGVuZ3RoID09PSAwKSB7XG4gICAgICBjb25zdCB7IGJ1aWxkcywgLi4uYnVpbGRPcHRpb25zIH0gPSBvcHRpb25zO1xuICAgICAgYnVpbGRzLmV4dCA9IGJ1aWxkT3B0aW9ucztcbiAgICB9XG4gICAgZm9yIChsZXQgbmFtZSBpbiBidWlsZHMpXG4gICAgICB0aGlzLl92YWxpZGF0ZUJ1aWxkQ29uZmlnKG5hbWUsIGJ1aWxkc1tuYW1lXSk7XG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCB7XG4gICAgICAuLi5vcHRpb25zLFxuICAgICAgY3VycmVudEZpbGU6IG51bGwsXG4gICAgICBtYW5pZmVzdDogbnVsbCxcbiAgICAgIGRlcGVuZGVuY2llczogW11cbiAgICB9KTtcbiAgfVxuXG4gIHdhdGNoUnVuKCkge1xuICAgIHRoaXMud2F0Y2ggPSB0cnVlXG4gIH1cblxuICBhcHBseShjb21waWxlcikge1xuICAgIGlmICh0aGlzLndlYnBhY2tWZXJzaW9uID09IHVuZGVmaW5lZCkge1xuICAgICAgY29uc3QgaXNXZWJwYWNrNCA9IGNvbXBpbGVyLmhvb2tzO1xuICAgICAgaWYgKGlzV2VicGFjazQpIHt0aGlzLndlYnBhY2tWZXJzaW9uID0gJ0lTIHdlYnBhY2sgNCd9XG4gICAgICBlbHNlIHt0aGlzLndlYnBhY2tWZXJzaW9uID0gJ05PVCB3ZWJwYWNrIDQnfVxuICAgICAgcmVhZGxpbmUuY3Vyc29yVG8ocHJvY2Vzcy5zdGRvdXQsIDApO2NvbnNvbGUubG9nKGFwcCArICdyZWFjdFZlcnNpb246ICcgKyB0aGlzLnJlYWN0VmVyc2lvbiArICcsICcgKyB0aGlzLndlYnBhY2tWZXJzaW9uKVxuICAgIH1cbiAgICBjb25zdCBtZSA9IHRoaXM7XG5cbiAgICBpZiAoY29tcGlsZXIuaG9va3MpIHtcbiAgICAgIGlmICh0aGlzLmFzeW5jaHJvbm91cykge1xuICAgICAgICBjb21waWxlci5ob29rcy53YXRjaFJ1bi50YXBBc3luYygnZXh0LXJlYWN0LXdhdGNoLXJ1biAoYXN5bmMpJywgKHdhdGNoaW5nLCBjYikgPT4ge1xuICAgICAgICAgIHJlYWRsaW5lLmN1cnNvclRvKHByb2Nlc3Muc3Rkb3V0LCAwKTtjb25zb2xlLmxvZyhhcHAgKyAnZXh0LXJlYWN0LXdhdGNoLXJ1biAoYXN5bmMpJylcbiAgICAgICAgICB0aGlzLndhdGNoUnVuKClcbiAgICAgICAgICBjYigpXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgY29tcGlsZXIuaG9va3Mud2F0Y2hSdW4udGFwKCdleHQtcmVhY3Qtd2F0Y2gtcnVuJywgKHdhdGNoaW5nKSA9PiB7XG4gICAgICAgICAgcmVhZGxpbmUuY3Vyc29yVG8ocHJvY2Vzcy5zdGRvdXQsIDApO2NvbnNvbGUubG9nKGFwcCArICdleHQtcmVhY3Qtd2F0Y2gtcnVuJylcbiAgICAgICAgICB0aGlzLndhdGNoUnVuKClcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBjb21waWxlci5wbHVnaW4oJ3dhdGNoLXJ1bicsICh3YXRjaGluZywgY2IpID0+IHtcbiAgICAgICAgcmVhZGxpbmUuY3Vyc29yVG8ocHJvY2Vzcy5zdGRvdXQsIDApO2NvbnNvbGUubG9nKGFwcCArICd3YXRjaC1ydW4nKVxuICAgICAgICB0aGlzLndhdGNoUnVuKClcbiAgICAgICAgY2IoKVxuICAgICAgfSlcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBZGRzIHRoZSBjb2RlIGZvciB0aGUgc3BlY2lmaWVkIGZ1bmN0aW9uIGNhbGwgdG8gdGhlIG1hbmlmZXN0LmpzIGZpbGVcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gY2FsbCBBIGZ1bmN0aW9uIGNhbGwgQVNUIG5vZGUuXG4gICAgICovXG4gICAgY29uc3QgYWRkVG9NYW5pZmVzdCA9IGZ1bmN0aW9uKGNhbGwpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IGZpbGUgPSB0aGlzLnN0YXRlLm1vZHVsZS5yZXNvdXJjZTtcbiAgICAgICAgbWUuZGVwZW5kZW5jaWVzW2ZpbGVdID0gWyAuLi4obWUuZGVwZW5kZW5jaWVzW2ZpbGVdIHx8IFtdKSwgZ2VuZXJhdGUoY2FsbCkgXTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihgRXJyb3IgcHJvY2Vzc2luZyAke2ZpbGV9YCk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGlmIChjb21waWxlci5ob29rcykge1xuICAgICAgY29tcGlsZXIuaG9va3MuY29tcGlsYXRpb24udGFwKCdleHQtcmVhY3QtY29tcGlsYXRpb24nLCAoY29tcGlsYXRpb24sZGF0YSkgPT4ge1xuICAgICAgICByZWFkbGluZS5jdXJzb3JUbyhwcm9jZXNzLnN0ZG91dCwgMCk7Y29uc29sZS5sb2coYXBwICsgJ2V4dC1yZWFjdC1jb21waWxhdGlvbicpXG4gICAgICAgIGNvbXBpbGF0aW9uLmhvb2tzLnN1Y2NlZWRNb2R1bGUudGFwKCdleHQtcmVhY3Qtc3VjY2VlZC1tb2R1bGUnLCAobW9kdWxlKSA9PiB7XG4gICAgICAgICAgdGhpcy5zdWNjZWVkTW9kdWxlKGNvbXBpbGF0aW9uLCBtb2R1bGUpXG4gICAgICAgIH0pXG5cbiAgICAgICAgZGF0YS5ub3JtYWxNb2R1bGVGYWN0b3J5LnBsdWdpbihcInBhcnNlclwiLCBmdW5jdGlvbihwYXJzZXIsIG9wdGlvbnMpIHtcbiAgICAgICAgICAvLyBleHRyYWN0IHh0eXBlcyBhbmQgY2xhc3NlcyBmcm9tIEV4dC5jcmVhdGUgY2FsbHNcbiAgICAgICAgICBwYXJzZXIucGx1Z2luKCdjYWxsIEV4dC5jcmVhdGUnLCBhZGRUb01hbmlmZXN0KTtcbiAgICAgICAgICAvLyBjb3B5IEV4dC5yZXF1aXJlIGNhbGxzIHRvIHRoZSBtYW5pZmVzdC4gIFRoaXMgYWxsb3dzIHRoZSB1c2VycyB0byBleHBsaWNpdGx5IHJlcXVpcmUgYSBjbGFzcyBpZiB0aGUgcGx1Z2luIGZhaWxzIHRvIGRldGVjdCBpdC5cbiAgICAgICAgICBwYXJzZXIucGx1Z2luKCdjYWxsIEV4dC5yZXF1aXJlJywgYWRkVG9NYW5pZmVzdCk7XG4gICAgICAgICAgLy8gY29weSBFeHQuZGVmaW5lIGNhbGxzIHRvIHRoZSBtYW5pZmVzdC4gIFRoaXMgYWxsb3dzIHVzZXJzIHRvIHdyaXRlIHN0YW5kYXJkIEV4dFJlYWN0IGNsYXNzZXMuXG4gICAgICAgICAgcGFyc2VyLnBsdWdpbignY2FsbCBFeHQuZGVmaW5lJywgYWRkVG9NYW5pZmVzdCk7XG4gICAgICAgIH0pXG5cbiAgICAgICAgY29tcGlsYXRpb24uaG9va3MuaHRtbFdlYnBhY2tQbHVnaW5CZWZvcmVIdG1sR2VuZXJhdGlvbi50YXBBc3luYygnZXh0LXJlYWN0LWh0bWxnZW5lcmF0aW9uJywoZGF0YSwgY2IpID0+IHtcbiAgICAgICAgICByZWFkbGluZS5jdXJzb3JUbyhwcm9jZXNzLnN0ZG91dCwgMCk7Y29uc29sZS5sb2coYXBwICsgJ2V4dC1yZWFjdC1odG1sZ2VuZXJhdGlvbicpXG4gICAgICAgICAgZGF0YS5hc3NldHMuanMudW5zaGlmdCgnZXh0LXJlYWN0L2V4dC5qcycpXG4gICAgICAgICAgZGF0YS5hc3NldHMuY3NzLnVuc2hpZnQoJ2V4dC1yZWFjdC9leHQuY3NzJykgICAgICAgICAgXG4gICAgICAgICAgY2IobnVsbCwgZGF0YSlcbiAgICAgICAgfSlcblxuICAgICAgfSlcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBjb21waWxlci5wbHVnaW4oJ2NvbXBpbGF0aW9uJywgKGNvbXBpbGF0aW9uLCBkYXRhKSA9PiB7XG4gICAgICAgIHJlYWRsaW5lLmN1cnNvclRvKHByb2Nlc3Muc3Rkb3V0LCAwKTtjb25zb2xlLmxvZyhhcHAgKyAnY29tcGlsYXRpb24nKVxuICAgICAgICBjb21waWxhdGlvbi5wbHVnaW4oJ3N1Y2NlZWQtbW9kdWxlJywgKG1vZHVsZSkgPT4ge1xuICAgICAgICAgIHRoaXMuc3VjY2VlZE1vZHVsZShjb21waWxhdGlvbiwgbW9kdWxlKVxuICAgICAgICB9KVxuICAgICAgICBkYXRhLm5vcm1hbE1vZHVsZUZhY3RvcnkucGx1Z2luKFwicGFyc2VyXCIsIGZ1bmN0aW9uKHBhcnNlciwgb3B0aW9ucykge1xuICAgICAgICAgIC8vIGV4dHJhY3QgeHR5cGVzIGFuZCBjbGFzc2VzIGZyb20gRXh0LmNyZWF0ZSBjYWxsc1xuICAgICAgICAgIHBhcnNlci5wbHVnaW4oJ2NhbGwgRXh0LmNyZWF0ZScsIGFkZFRvTWFuaWZlc3QpO1xuICAgICAgICAgIC8vIGNvcHkgRXh0LnJlcXVpcmUgY2FsbHMgdG8gdGhlIG1hbmlmZXN0LiAgVGhpcyBhbGxvd3MgdGhlIHVzZXJzIHRvIGV4cGxpY2l0bHkgcmVxdWlyZSBhIGNsYXNzIGlmIHRoZSBwbHVnaW4gZmFpbHMgdG8gZGV0ZWN0IGl0LlxuICAgICAgICAgIHBhcnNlci5wbHVnaW4oJ2NhbGwgRXh0LnJlcXVpcmUnLCBhZGRUb01hbmlmZXN0KTtcbiAgICAgICAgICAvLyBjb3B5IEV4dC5kZWZpbmUgY2FsbHMgdG8gdGhlIG1hbmlmZXN0LiAgVGhpcyBhbGxvd3MgdXNlcnMgdG8gd3JpdGUgc3RhbmRhcmQgRXh0UmVhY3QgY2xhc3Nlcy5cbiAgICAgICAgICBwYXJzZXIucGx1Z2luKCdjYWxsIEV4dC5kZWZpbmUnLCBhZGRUb01hbmlmZXN0KTtcbiAgICAgICAgfSlcblxuICAgICAgfSlcbiAgICB9XG5cbi8vKmVtaXQgLSBvbmNlIGFsbCBtb2R1bGVzIGFyZSBwcm9jZXNzZWQsIGNyZWF0ZSB0aGUgb3B0aW1pemVkIEV4dFJlYWN0IGJ1aWxkLlxuICAgIGlmIChjb21waWxlci5ob29rcykge1xuICAgICAgaWYgKHRydWUpIHtcbiAgICAgICAgY29tcGlsZXIuaG9va3MuZW1pdC50YXBBc3luYygnZXh0LXJlYWN0LWVtaXQgKGFzeW5jKScsIChjb21waWxhdGlvbiwgY2FsbGJhY2spID0+IHtcbiAgICAgICAgICByZWFkbGluZS5jdXJzb3JUbyhwcm9jZXNzLnN0ZG91dCwgMCk7Y29uc29sZS5sb2coYXBwICsgJ2V4dC1yZWFjdC1lbWl0ICAoYXN5bmMpJylcbiAgICAgICAgICB0aGlzLmVtaXQoY29tcGlsZXIsIGNvbXBpbGF0aW9uLCBjYWxsYmFjaylcbiAgICAgICAgICAvL2NvbnNvbGUubG9nKGFwcCArICdhZnRlciBleHQtcmVhY3QtZW1pdCAgKGFzeW5jKScpXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgY29tcGlsZXIuaG9va3MuZW1pdC50YXAoJ2V4dC1yZWFjdC1lbWl0JywgKGNvbXBpbGF0aW9uKSA9PiB7XG4gICAgICAgICAgcmVhZGxpbmUuY3Vyc29yVG8ocHJvY2Vzcy5zdGRvdXQsIDApO2NvbnNvbGUubG9nKGFwcCArICdleHQtcmVhY3QtZW1pdCcpXG4gICAgICAgICAgdGhpcy5lbWl0KGNvbXBpbGVyLCBjb21waWxhdGlvbilcbiAgICAgICAgICAvL2NvbnNvbGUubG9nKGFwcCArICdhZnRlciBleHQtcmVhY3QtZW1pdCcpXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgY29tcGlsZXIucGx1Z2luKCdlbWl0JywgKGNvbXBpbGF0aW9uLCBjYWxsYmFjaykgPT4ge1xuICAgICAgICByZWFkbGluZS5jdXJzb3JUbyhwcm9jZXNzLnN0ZG91dCwgMCk7Y29uc29sZS5sb2coYXBwICsgJ2VtaXQnKVxuICAgICAgICB0aGlzLmVtaXQoY29tcGlsZXIsIGNvbXBpbGF0aW9uLCBjYWxsYmFjaylcbiAgICAgICAgY2FsbGJhY2soKVxuICAgICAgfSlcbiAgICB9XG5cbiAgICBpZiAoY29tcGlsZXIuaG9va3MpIHtcbiAgICAgIGlmICh0aGlzLmFzeW5jaHJvbm91cykge1xuICAgICAgICBjb21waWxlci5ob29rcy5kb25lLnRhcEFzeW5jKCdleHQtcmVhY3QtZG9uZSAoYXN5bmMpJywgKGNvbXBpbGF0aW9uLCBjYWxsYmFjaykgPT4ge1xuICAgICAgICAgIHJlYWRsaW5lLmN1cnNvclRvKHByb2Nlc3Muc3Rkb3V0LCAwKTtjb25zb2xlLmxvZyhhcHAgKyAnZXh0LXJlYWN0LWRvbmUgKGFzeW5jKScpXG4gICAgICAgICAgaWYgKGNhbGxiYWNrICE9IG51bGwpIFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmFzeW5jaHJvbm91cykgXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdjYWxsaW5nIGNhbGxiYWNrIGZvciBleHQtcmVhY3QtZW1pdCAgKGFzeW5jKScpXG4gICAgICAgICAgICAgIGNhbGxiYWNrKClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgY29tcGlsZXIuaG9va3MuZG9uZS50YXAoJ2V4dC1yZWFjdC1kb25lJywgKCkgPT4ge1xuICAgICAgICAgIHJlYWRsaW5lLmN1cnNvclRvKHByb2Nlc3Muc3Rkb3V0LCAwKTtjb25zb2xlLmxvZyhhcHAgKyAnZXh0LXJlYWN0LWRvbmUnKVxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGFzeW5jIGVtaXQoY29tcGlsZXIsIGNvbXBpbGF0aW9uLCBjYWxsYmFjaykge1xuICAgIHZhciBpc1dlYnBhY2s0ID0gY29tcGlsYXRpb24uaG9va3M7XG4gICAgdmFyIG1vZHVsZXMgPSBbXVxuICAgIGlmIChpc1dlYnBhY2s0KSB7XG4gICAgICBpc1dlYnBhY2s0ID0gdHJ1ZVxuICAgICAgLy9tb2R1bGVzID0gY29tcGlsYXRpb24uY2h1bmtzLnJlZHVjZSgoYSwgYikgPT4gYS5jb25jYXQoYi5fbW9kdWxlcyksIFtdKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBpc1dlYnBhY2s0ID0gZmFsc2VcbiAgICAgIC8vbW9kdWxlcyA9IGNvbXBpbGF0aW9uLmNodW5rcy5yZWR1Y2UoKGEsIGIpID0+IGEuY29uY2F0KGIubW9kdWxlcyksIFtdKTtcbiAgICB9XG4gICAgY29uc3QgYnVpbGQgPSB0aGlzLmJ1aWxkc1tPYmplY3Qua2V5cyh0aGlzLmJ1aWxkcylbMF1dO1xuICAgIGxldCBvdXRwdXRQYXRoID0gcGF0aC5qb2luKGNvbXBpbGVyLm91dHB1dFBhdGgsIHRoaXMub3V0cHV0KTtcbiAgICAvLyB3ZWJwYWNrLWRldi1zZXJ2ZXIgb3ZlcndyaXRlcyB0aGUgb3V0cHV0UGF0aCB0byBcIi9cIiwgc28gd2UgbmVlZCB0byBwcmVwZW5kIGNvbnRlbnRCYXNlXG4gICAgaWYgKGNvbXBpbGVyLm91dHB1dFBhdGggPT09ICcvJyAmJiBjb21waWxlci5vcHRpb25zLmRldlNlcnZlcikge1xuICAgICAgb3V0cHV0UGF0aCA9IHBhdGguam9pbihjb21waWxlci5vcHRpb25zLmRldlNlcnZlci5jb250ZW50QmFzZSwgb3V0cHV0UGF0aCk7XG4gICAgfVxuICAgIGxldCBwcm9taXNlID0gdGhpcy5fYnVpbGRFeHRCdW5kbGUoaXNXZWJwYWNrNCwgJ25vdCcsIG1vZHVsZXMsIG91dHB1dFBhdGgsIGJ1aWxkLCBjYWxsYmFjaylcbiAgICBsZXQgcmVzdWx0ID0gYXdhaXQgcHJvbWlzZVxuXG4gICAgaWYgKHRoaXMud2F0Y2gpIHtcbiAgICAgIGlmICh0aGlzLmNvdW50ID09IDApIHtcbiAgICAgICAgdmFyIHVybCA9ICdodHRwOi8vbG9jYWxob3N0OicgKyB0aGlzLnBvcnRcbiAgICAgICAgcmVhZGxpbmUuY3Vyc29yVG8ocHJvY2Vzcy5zdGRvdXQsIDApO2NvbnNvbGUubG9nKGFwcCArICdleHQtcmVhY3QtZW1pdCAtIG9wZW4gYnJvd3NlciBhdCAnICsgdXJsKVxuICAgICAgICB0aGlzLmNvdW50KytcbiAgICAgICAgY29uc3Qgb3BuID0gcmVxdWlyZSgnb3BuJylcbiAgICAgICAgb3BuKHVybClcbiAgICAgIH1cbiAgICB9XG4gICAgLy9pZiAoY2FsbGJhY2sgIT0gbnVsbCl7aWYgKHRoaXMuYXN5bmNocm9ub3VzKXtjYWxsYmFjaygpfX1cbiAgICBpZiAoY2FsbGJhY2sgIT0gbnVsbCl7aWYgKHRydWUpe2NhbGxiYWNrKCl9fVxuICB9XG5cbiAgLyoqXG4gICAvKipcbiAgICAqIEJ1aWxkcyBhIG1pbmltYWwgdmVyc2lvbiBvZiB0aGUgRXh0UmVhY3QgZnJhbWV3b3JrIGJhc2VkIG9uIHRoZSBjbGFzc2VzIHVzZWRcbiAgICAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lIFRoZSBuYW1lIG9mIHRoZSBidWlsZFxuICAgICogQHBhcmFtIHtNb2R1bGVbXX0gbW9kdWxlcyB3ZWJwYWNrIG1vZHVsZXNcbiAgICAqIEBwYXJhbSB7U3RyaW5nfSBvdXRwdXQgVGhlIHBhdGggdG8gd2hlcmUgdGhlIGZyYW1ld29yayBidWlsZCBzaG91bGQgYmUgd3JpdHRlblxuICAgICogQHBhcmFtIHtTdHJpbmd9IFt0b29sa2l0PSdtb2Rlcm4nXSBcIm1vZGVyblwiIG9yIFwiY2xhc3NpY1wiXG4gICAgKiBAcGFyYW0ge1N0cmluZ30gb3V0cHV0IFRoZSBwYXRoIHRvIHRoZSBkaXJlY3RvcnkgdG8gY3JlYXRlIHdoaWNoIHdpbGwgY29udGFpbiB0aGUganMgYW5kIGNzcyBidW5kbGVzXG4gICAgKiBAcGFyYW0ge1N0cmluZ30gdGhlbWUgVGhlIG5hbWUgb2YgdGhlIEV4dFJlYWN0IHRoZW1lIHBhY2thZ2UgdG8gdXNlLCBmb3IgZXhhbXBsZSBcInRoZW1lLW1hdGVyaWFsXCJcbiAgICAqIEBwYXJhbSB7U3RyaW5nW119IHBhY2thZ2VzIEFuIGFycmF5IG9mIEV4dFJlYWN0IHBhY2thZ2VzIHRvIGluY2x1ZGVcbiAgICAqIEBwYXJhbSB7U3RyaW5nW119IHBhY2thZ2VEaXJzIERpcmVjdG9yaWVzIGNvbnRhaW5pbmcgcGFja2FnZXNcbiAgICAqIEBwYXJhbSB7U3RyaW5nW119IG92ZXJyaWRlcyBBbiBhcnJheSBvZiBsb2NhdGlvbnMgZm9yIG92ZXJyaWRlc1xuICAgICogQHBhcmFtIHtTdHJpbmd9IHNkayBUaGUgZnVsbCBwYXRoIHRvIHRoZSBFeHRSZWFjdCBTREtcbiAgICAqIEBwcml2YXRlXG4gICAgKi9cbiAgX2J1aWxkRXh0QnVuZGxlKGlzV2VicGFjazQsIG5hbWUsIG1vZHVsZXMsIG91dHB1dCwgeyB0b29sa2l0PSdtb2Rlcm4nLCB0aGVtZSwgcGFja2FnZXM9W10sIHBhY2thZ2VEaXJzPVtdLCBzZGssIG92ZXJyaWRlcywgY2FsbGJhY2t9KSB7XG4gICAgbGV0IHNlbmNoYSA9IHRoaXMuX2dldFNlbmNoQ21kUGF0aCgpO1xuICAgIHRoZW1lID0gdGhlbWUgfHwgKHRvb2xraXQgPT09ICdjbGFzc2ljJyA/ICd0aGVtZS10cml0b24nIDogJ3RoZW1lLW1hdGVyaWFsJyk7XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdGhpcy5vbkJ1aWxkRmFpbCA9IHJlamVjdDtcbiAgICAgIHRoaXMub25CdWlsZFN1Y2Nlc3MgPSByZXNvbHZlO1xuICAgICAgY21kRXJyb3JzID0gW107XG4gICAgICBcbiAgICAgIGNvbnN0IG9uQnVpbGREb25lID0gKCkgPT4ge1xuICAgICAgICBpZiAoY21kRXJyb3JzLmxlbmd0aCkge1xuICAgICAgICAgIHRoaXMub25CdWlsZEZhaWwobmV3IEVycm9yKGNtZEVycm9ycy5qb2luKFwiXCIpKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5vbkJ1aWxkU3VjY2VzcygpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmICghd2F0Y2hpbmcpIHtcbiAgICAgICAgcmltcmFmKG91dHB1dCk7XG4gICAgICAgIG1rZGlycChvdXRwdXQpO1xuICAgICAgfVxuXG4gICAgICBsZXQganM7XG4gICAgICBpZiAodGhpcy50cmVlU2hha2luZykge1xuICAgICAgICBsZXQgc3RhdGVtZW50cyA9IFsnRXh0LnJlcXVpcmUoW1wiRXh0LmFwcC5BcHBsaWNhdGlvblwiLCBcIkV4dC5Db21wb25lbnRcIiwgXCJFeHQuV2lkZ2V0XCIsIFwiRXh0LmxheW91dC5GaXRcIiwgXCJFeHQucmVhY3QuVHJhbnNpdGlvblwiLCBcIkV4dC5yZWFjdC5SZW5kZXJlckNlbGxcIl0pJ107IC8vIGZvciBzb21lIHJlYXNvbiBjb21tYW5kIGRvZXNuJ3QgbG9hZCBjb21wb25lbnQgd2hlbiBvbmx5IHBhbmVsIGlzIHJlcXVpcmVkXG4gICAgICAgIC8vIGlmIChwYWNrYWdlcy5pbmRleE9mKCdyZWFjdG8nKSAhPT0gLTEpIHtcbiAgICAgICAgLy8gICBzdGF0ZW1lbnRzLnB1c2goJ0V4dC5yZXF1aXJlKFwiRXh0LnJlYWN0LlJlbmRlcmVyQ2VsbFwiKScpO1xuICAgICAgICAvLyB9XG4gICAgICAgIC8vbWpnXG4gICAgICAgIGZvciAobGV0IG1vZHVsZSBvZiBtb2R1bGVzKSB7XG4gICAgICAgICAgY29uc3QgZGVwcyA9IHRoaXMuZGVwZW5kZW5jaWVzW21vZHVsZS5yZXNvdXJjZV07XG4gICAgICAgICAgaWYgKGRlcHMpIHN0YXRlbWVudHMgPSBzdGF0ZW1lbnRzLmNvbmNhdChkZXBzKTtcbiAgICAgICAgfVxuICAgICAgICBqcyA9IHN0YXRlbWVudHMuam9pbignO1xcbicpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAganMgPSAnRXh0LnJlcXVpcmUoXCJFeHQuKlwiKSc7XG4gICAgICB9XG4gICAgICBjb25zdCBtYW5pZmVzdCA9IHBhdGguam9pbihvdXRwdXQsICdtYW5pZmVzdC5qcycpO1xuICAgICAgLy8gYWRkIGV4dC1yZWFjdC9wYWNrYWdlcyBhdXRvbWF0aWNhbGx5IGlmIHByZXNlbnRcbiAgICAgIGNvbnN0IHVzZXJQYWNrYWdlcyA9IHBhdGguam9pbignLicsICdleHQtcmVhY3QnLCAncGFja2FnZXMnKTtcbiAgICAgIGlmIChmcy5leGlzdHNTeW5jKHVzZXJQYWNrYWdlcykpIHtcbiAgICAgICAgcGFja2FnZURpcnMucHVzaCh1c2VyUGFja2FnZXMpXG4gICAgICB9XG5cbiAgICAgIGlmIChmcy5leGlzdHNTeW5jKHBhdGguam9pbihzZGssICdleHQnKSkpIHtcbiAgICAgICAgLy8gbG9jYWwgY2hlY2tvdXQgb2YgdGhlIFNESyByZXBvXG4gICAgICAgIHBhY2thZ2VEaXJzLnB1c2gocGF0aC5qb2luKCdleHQnLCAncGFja2FnZXMnKSk7XG4gICAgICAgIHNkayA9IHBhdGguam9pbihzZGssICdleHQnKTtcbiAgICAgIH1cbiAgICAgIGlmICghd2F0Y2hpbmcpIHtcbiAgICAgICAgZnMud3JpdGVGaWxlU3luYyhwYXRoLmpvaW4ob3V0cHV0LCAnYnVpbGQueG1sJyksIGJ1aWxkWE1MKHsgY29tcHJlc3M6IHRoaXMucHJvZHVjdGlvbiB9KSwgJ3V0ZjgnKTtcbiAgICAgICAgZnMud3JpdGVGaWxlU3luYyhwYXRoLmpvaW4ob3V0cHV0LCAnanNkb20tZW52aXJvbm1lbnQuanMnKSwgY3JlYXRlSlNET01FbnZpcm9ubWVudCgpLCAndXRmOCcpO1xuICAgICAgICBmcy53cml0ZUZpbGVTeW5jKHBhdGguam9pbihvdXRwdXQsICdhcHAuanNvbicpLCBjcmVhdGVBcHBKc29uKHsgdGhlbWUsIHBhY2thZ2VzLCB0b29sa2l0LCBvdmVycmlkZXMsIHBhY2thZ2VEaXJzIH0pLCAndXRmOCcpO1xuICAgICAgICBmcy53cml0ZUZpbGVTeW5jKHBhdGguam9pbihvdXRwdXQsICd3b3Jrc3BhY2UuanNvbicpLCBjcmVhdGVXb3Jrc3BhY2VKc29uKHNkaywgcGFja2FnZURpcnMsIG91dHB1dCksICd1dGY4Jyk7XG4gICAgICB9XG4gICAgICBsZXQgY21kUmVidWlsZE5lZWRlZCA9IGZhbHNlO1xuICAgICAgaWYgKHRoaXMubWFuaWZlc3QgPT09IG51bGwgfHwganMgIT09IHRoaXMubWFuaWZlc3QpIHtcbiAgICAgICAgLy8gT25seSB3cml0ZSBtYW5pZmVzdCBpZiBpdCBkaWZmZXJzIGZyb20gdGhlIGxhc3QgcnVuLiAgVGhpcyBwcmV2ZW50cyB1bm5lY2Vzc2FyeSBjbWQgcmVidWlsZHMuXG4gICAgICAgIHRoaXMubWFuaWZlc3QgPSBqcztcbiAgICAgICAgLy9yZWFkbGluZS5jdXJzb3JUbyhwcm9jZXNzLnN0ZG91dCwgMCk7Y29uc29sZS5sb2coYXBwICsganMpXG4gICAgICAgIHJlYWRsaW5lLmN1cnNvclRvKHByb2Nlc3Muc3Rkb3V0LCAwKTtjb25zb2xlLmxvZyhhcHAgKyAndHJlZSBzaGFraW5nOiAnICsgdGhpcy50cmVlU2hha2luZylcbiAgICAgICAgZnMud3JpdGVGaWxlU3luYyhtYW5pZmVzdCwganMsICd1dGY4Jyk7XG4gICAgICAgIGNtZFJlYnVpbGROZWVkZWQgPSB0cnVlO1xuICAgICAgICByZWFkbGluZS5jdXJzb3JUbyhwcm9jZXNzLnN0ZG91dCwgMCk7Y29uc29sZS5sb2coYXBwICsgYGJ1aWxkaW5nIEV4dFJlYWN0IGJ1bmRsZSBhdDogJHtvdXRwdXR9YClcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMud2F0Y2gpIHtcbiAgICAgICAgaWYgKCF3YXRjaGluZykge1xuICAgICAgICAgIHdhdGNoaW5nID0gZ2F0aGVyRXJyb3JzKGZvcmsoc2VuY2hhLCBbJ2FudCcsICd3YXRjaCddLCB7IGN3ZDogb3V0cHV0LCBzaWxlbnQ6IHRydWUgfSkpO1xuICAgICAgICAgIHdhdGNoaW5nLnN0ZGVyci5waXBlKHByb2Nlc3Muc3RkZXJyKTtcbiAgICAgICAgICB3YXRjaGluZy5zdGRvdXQucGlwZShwcm9jZXNzLnN0ZG91dCk7XG4gICAgICAgICAgd2F0Y2hpbmcuc3Rkb3V0Lm9uKCdkYXRhJywgZGF0YSA9PiB7XG4gICAgICAgICAgICBpZiAoZGF0YSAmJiBkYXRhLnRvU3RyaW5nKCkubWF0Y2goL1dhaXRpbmcgZm9yIGNoYW5nZXNcXC5cXC5cXC4vKSkge1xuICAgICAgICAgICAgICBvbkJ1aWxkRG9uZSgpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgICB3YXRjaGluZy5vbignZXhpdCcsIG9uQnVpbGREb25lKVxuICAgICAgICB9XG4gICAgICAgIGlmICghY21kUmVidWlsZE5lZWRlZCkge1xuICAgICAgICAgIHJlYWRsaW5lLmN1cnNvclRvKHByb2Nlc3Muc3Rkb3V0LCAwKTtjb25zb2xlLmxvZyhhcHAgKyAnRXh0IHJlYnVpbGQgTk9UIG5lZWRlZCcpXG4gICAgICAgICAgb25CdWlsZERvbmUoKVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIC8vcmVhZGxpbmUuY3Vyc29yVG8ocHJvY2Vzcy5zdGRvdXQsIDApO2NvbnNvbGUubG9nKGFwcCArICdFeHQgcmVidWlsZCBJUyBuZWVkZWQnKVxuICAgICAgICB9XG4gICAgICB9IFxuICAgICAgZWxzZSB7XG4gICAgICAgIGNvbnN0IGJ1aWxkID0gZ2F0aGVyRXJyb3JzKGZvcmsoc2VuY2hhLCBbJ2FudCcsICdidWlsZCddLCB7IHN0ZGlvOiAnaW5oZXJpdCcsIGVuY29kaW5nOiAndXRmLTgnLCBjd2Q6IG91dHB1dCwgc2lsZW50OiBmYWxzZSB9KSk7XG4gICAgICAgIHJlYWRsaW5lLmN1cnNvclRvKHByb2Nlc3Muc3Rkb3V0LCAwKTtjb25zb2xlLmxvZyhhcHAgKyAnc2VuY2hhIGFudCBidWlsZCcpXG4gICAgICAgIGlmKGJ1aWxkLnN0ZG91dCkgeyBidWlsZC5zdGRvdXQucGlwZShwcm9jZXNzLnN0ZG91dCkgfVxuICAgICAgICBpZihidWlsZC5zdGRlcnIpIHsgYnVpbGQuc3RkZXJyLnBpcGUocHJvY2Vzcy5zdGRlcnIpIH1cbiAgICAgICAgYnVpbGQub24oJ2V4aXQnLCBvbkJ1aWxkRG9uZSk7XG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIC8qKlxuICAgKiBEZWZhdWx0IGNvbmZpZyBvcHRpb25zXG4gICAqIEBwcm90ZWN0ZWRcbiAgICogQHJldHVybiB7T2JqZWN0fVxuICAgKi9cbiAgZ2V0RGVmYXVsdE9wdGlvbnMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHBvcnQ6IDgwMTYsXG4gICAgICBidWlsZHM6IHt9LFxuICAgICAgZGVidWc6IGZhbHNlLFxuICAgICAgd2F0Y2g6IGZhbHNlLFxuICAgICAgdGVzdDogL1xcLihqfHQpc3g/JC8sXG5cbiAgICAgIC8qIGJlZ2luIHNpbmdsZSBidWlsZCBvbmx5ICovXG4gICAgICBvdXRwdXQ6ICdleHQtcmVhY3QnLFxuICAgICAgdG9vbGtpdDogJ21vZGVybicsXG4gICAgICBwYWNrYWdlczogbnVsbCxcbiAgICAgIHBhY2thZ2VEaXJzOiBbXSxcbiAgICAgIG92ZXJyaWRlczogW10sXG4gICAgICBhc3luY2hyb25vdXM6IGZhbHNlLFxuICAgICAgcHJvZHVjdGlvbjogZmFsc2UsXG4gICAgICBtYW5pZmVzdEV4dHJhY3RvcjogZXh0cmFjdEZyb21KU1gsXG4gICAgICB0cmVlU2hha2luZzogZmFsc2VcbiAgICAgIC8qIGVuZCBzaW5nbGUgYnVpbGQgb25seSAqL1xuICAgIH1cbiAgfVxuXG4gIHN1Y2NlZWRNb2R1bGUoY29tcGlsYXRpb24sIG1vZHVsZSkge1xuICAgIHRoaXMuY3VycmVudEZpbGUgPSBtb2R1bGUucmVzb3VyY2U7XG4gICAgaWYgKG1vZHVsZS5yZXNvdXJjZSAmJiBtb2R1bGUucmVzb3VyY2UubWF0Y2godGhpcy50ZXN0KSAmJiAhbW9kdWxlLnJlc291cmNlLm1hdGNoKC9ub2RlX21vZHVsZXMvKSAmJiAhbW9kdWxlLnJlc291cmNlLm1hdGNoKGAvZXh0LXJlYWN0JHtyZWFjdFZlcnNpb259L2ApKSB7XG4gICAgICBjb25zdCBkb1BhcnNlID0gKCkgPT4ge1xuICAgICAgICB0aGlzLmRlcGVuZGVuY2llc1t0aGlzLmN1cnJlbnRGaWxlXSA9IFtcbiAgICAgICAgICAuLi4odGhpcy5kZXBlbmRlbmNpZXNbdGhpcy5jdXJyZW50RmlsZV0gfHwgW10pLFxuICAgICAgICAgIC4uLnRoaXMubWFuaWZlc3RFeHRyYWN0b3IobW9kdWxlLl9zb3VyY2UuX3ZhbHVlLCBjb21waWxhdGlvbiwgbW9kdWxlLCByZWFjdFZlcnNpb24pXG4gICAgICAgIF1cbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLmRlYnVnKSB7XG4gICAgICAgIGRvUGFyc2UoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRyeSB7IGRvUGFyc2UoKTsgfSBjYXRjaCAoZSkgXG4gICAgICAgIHsgXG4gICAgICAgICAgY29uc29sZS5lcnJvcignXFxuZXJyb3IgcGFyc2luZyAnICsgdGhpcy5jdXJyZW50RmlsZSk7IFxuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZSk7IFxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrcyBlYWNoIGJ1aWxkIGNvbmZpZyBmb3IgbWlzc2luZy9pbnZhbGlkIHByb3BlcnRpZXNcbiAgICogQHBhcmFtIHtTdHJpbmd9IG5hbWUgVGhlIG5hbWUgb2YgdGhlIGJ1aWxkXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBidWlsZCBUaGUgYnVpbGQgY29uZmlnXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfdmFsaWRhdGVCdWlsZENvbmZpZyhuYW1lLCBidWlsZCkge1xuICAgIGxldCB7IHNkaywgcHJvZHVjdGlvbiB9ID0gYnVpbGQ7XG5cbiAgICBpZiAocHJvZHVjdGlvbikge1xuICAgICAgYnVpbGQudHJlZVNoYWtpbmcgPSBmYWxzZTtcbiAgICB9XG4gICAgaWYgKHNkaykge1xuICAgICAgaWYgKCFmcy5leGlzdHNTeW5jKHNkaykpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYE5vIFNESyBmb3VuZCBhdCAke3BhdGgucmVzb2x2ZShzZGspfS4gIERpZCB5b3UgZm9yIGdldCB0byBsaW5rL2NvcHkgeW91ciBFeHQgSlMgU0RLIHRvIHRoYXQgbG9jYXRpb24/YCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vbWpnIHRoaXMgbmVlZGVkPyB0aGlzLl9hZGRSZWFjdG9yUGFja2FnZShidWlsZClcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy9idWlsZC5zZGsgPSBwYXRoLmRpcm5hbWUocmVzb2x2ZSgnQHNlbmNoYS9leHQtbW9kZXJuJywgeyBiYXNlZGlyOiBwcm9jZXNzLmN3ZCgpIH0pKVxuICAgICAgICBidWlsZC5zZGsgPSBwYXRoLmRpcm5hbWUocmVzb2x2ZSgnQHNlbmNoYS9leHQnLCB7IGJhc2VkaXI6IHByb2Nlc3MuY3dkKCkgfSkpXG4gICAgICAgIGJ1aWxkLnBhY2thZ2VEaXJzID0gWy4uLihidWlsZC5wYWNrYWdlRGlycyB8fCBbXSksIHBhdGguZGlybmFtZShidWlsZC5zZGspXTtcbiAgICAgICAgYnVpbGQucGFja2FnZXMgPSBidWlsZC5wYWNrYWdlcyB8fCB0aGlzLl9maW5kUGFja2FnZXMoYnVpbGQuc2RrKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy90aHJvdyBuZXcgRXJyb3IoYEBzZW5jaGEvZXh0LW1vZGVybiBub3QgZm91bmQuICBZb3UgY2FuIGluc3RhbGwgaXQgd2l0aCBcIm5wbSBpbnN0YWxsIC0tc2F2ZSBAc2VuY2hhL2V4dC1tb2Rlcm5cIiBvciwgaWYgeW91IGhhdmUgYSBsb2NhbCBjb3B5IG9mIHRoZSBTREssIHNwZWNpZnkgdGhlIHBhdGggdG8gaXQgdXNpbmcgdGhlIFwic2RrXCIgb3B0aW9uIGluIGJ1aWxkIFwiJHtuYW1lfS5cImApO1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEBzZW5jaGEvZXh0IG5vdCBmb3VuZC4gIFlvdSBjYW4gaW5zdGFsbCBpdCB3aXRoIFwibnBtIGluc3RhbGwgLS1zYXZlIEBzZW5jaGEvZXh0LW1vZGVyblwiIG9yLCBpZiB5b3UgaGF2ZSBhIGxvY2FsIGNvcHkgb2YgdGhlIFNESywgc3BlY2lmeSB0aGUgcGF0aCB0byBpdCB1c2luZyB0aGUgXCJzZGtcIiBvcHRpb24gaW4gYnVpbGQgXCIke25hbWV9LlwiYCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy8gLyoqXG4gIC8vICAqIEFkZHMgdGhlIHJlYWN0b3IgcGFja2FnZSBpZiBwcmVzZW50IGFuZCB0aGUgdG9vbGtpdCBpcyBtb2Rlcm5cbiAgLy8gICogQHBhcmFtIHtPYmplY3R9IGJ1aWxkIFxuICAvLyAgKi9cbiAgLy8gX2FkZFJlYWN0b3JQYWNrYWdlKGJ1aWxkKSB7XG4gIC8vICAgaWYgKGJ1aWxkLnRvb2xraXQgPT09ICdjbGFzc2ljJykgcmV0dXJuO1xuICAvLyAgIGlmIChmcy5leGlzdHNTeW5jKHBhdGguam9pbihidWlsZC5zZGssICdleHQnLCAnbW9kZXJuJywgJ3JlYWN0b3InKSkgfHwgIC8vIHJlcG9cbiAgLy8gICAgIGZzLmV4aXN0c1N5bmMocGF0aC5qb2luKGJ1aWxkLnNkaywgJ21vZGVybicsICdyZWFjdG9yJykpKSB7IC8vIHByb2R1Y3Rpb24gYnVpbGRcbiAgLy8gICAgIGlmICghYnVpbGQucGFja2FnZXMpIHtcbiAgLy8gICAgICAgYnVpbGQucGFja2FnZXMgPSBbXTtcbiAgLy8gICAgIH1cbiAgLy8gICAgIGJ1aWxkLnBhY2thZ2VzLnB1c2goJ3JlYWN0b3InKTtcbiAgLy8gICB9XG4gIC8vIH1cblxuICAvKipcbiAgICogUmV0dXJuIHRoZSBuYW1lcyBvZiBhbGwgRXh0UmVhY3QgcGFja2FnZXMgaW4gdGhlIHNhbWUgcGFyZW50IGRpcmVjdG9yeSBhcyBleHQtcmVhY3QgKHR5cGljYWxseSBub2RlX21vZHVsZXMvQGV4dGpzKVxuICAgKiBAcHJpdmF0ZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gc2RrIFBhdGggdG8gZXh0LXJlYWN0XG4gICAqIEByZXR1cm4ge1N0cmluZ1tdfVxuICAgKi9cbiAgX2ZpbmRQYWNrYWdlcyhzZGspIHtcbiAgICBjb25zdCBtb2R1bGVzRGlyID0gcGF0aC5qb2luKHNkaywgJy4uJyk7XG4gICAgcmV0dXJuIGZzLnJlYWRkaXJTeW5jKG1vZHVsZXNEaXIpXG4gICAgICAvLyBGaWx0ZXIgb3V0IGRpcmVjdG9yaWVzIHdpdGhvdXQgJ3BhY2thZ2UuanNvbidcbiAgICAgIC5maWx0ZXIoZGlyID0+IGZzLmV4aXN0c1N5bmMocGF0aC5qb2luKG1vZHVsZXNEaXIsIGRpciwgJ3BhY2thZ2UuanNvbicpKSlcbiAgICAgIC8vIEdlbmVyYXRlIGFycmF5IG9mIHBhY2thZ2UgbmFtZXNcbiAgICAgIC5tYXAoZGlyID0+IHtcbiAgICAgICAgICBjb25zdCBwYWNrYWdlSW5mbyA9IEpTT04ucGFyc2UoZnMucmVhZEZpbGVTeW5jKHBhdGguam9pbihtb2R1bGVzRGlyLCBkaXIsICdwYWNrYWdlLmpzb24nKSkpO1xuICAgICAgICAgIC8vIERvbid0IGluY2x1ZGUgdGhlbWUgdHlwZSBwYWNrYWdlcy5cbiAgICAgICAgICBpZihwYWNrYWdlSW5mby5zZW5jaGEgJiYgcGFja2FnZUluZm8uc2VuY2hhLnR5cGUgIT09ICd0aGVtZScpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHBhY2thZ2VJbmZvLnNlbmNoYS5uYW1lO1xuICAgICAgICAgIH1cbiAgICAgIH0pXG4gICAgICAvLyBSZW1vdmUgYW55IHVuZGVmaW5lZHMgZnJvbSBtYXBcbiAgICAgIC5maWx0ZXIobmFtZSA9PiBuYW1lKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBwYXRoIHRvIHRoZSBzZW5jaGEgY21kIGV4ZWN1dGFibGVcbiAgICogQHByaXZhdGVcbiAgICogQHJldHVybiB7U3RyaW5nfVxuICAgKi9cbiAgX2dldFNlbmNoQ21kUGF0aCgpIHtcbiAgICB0cnkge1xuICAgICAgLy8gdXNlIEBleHRqcy9zZW5jaGEtY21kIGZyb20gbm9kZV9tb2R1bGVzXG4gICAgICByZXR1cm4gcmVxdWlyZSgnQHNlbmNoYS9jbWQnKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAvLyBhdHRlbXB0IHRvIHVzZSBnbG9iYWxseSBpbnN0YWxsZWQgU2VuY2hhIENtZFxuICAgICAgcmV0dXJuICdzZW5jaGEnO1xuICAgIH1cbiAgfVxufVxuXG5cblxuXG5cblxuLy8gZnJvbSB0aGlzLmVtaXRcbiAgICAvLyB0aGUgZm9sbG93aW5nIGlzIG5lZWRlZCBmb3IgaHRtbC13ZWJwYWNrLXBsdWdpbiB0byBpbmNsdWRlIDxzY3JpcHQ+IGFuZCA8bGluaz4gdGFncyBmb3IgRXh0UmVhY3RcbiAgICAvLyBjb25zb2xlLmxvZygnY29tcGlsYXRpb24nKVxuICAgIC8vIGNvbnNvbGUubG9nKCcqKioqKioqKmNvbXBpbGF0aW9uLmNodW5rc1swXScpXG4gICAgLy8gY29uc29sZS5sb2coY29tcGlsYXRpb24uY2h1bmtzWzBdLmlkKVxuICAgIC8vIGNvbnNvbGUubG9nKHBhdGguam9pbih0aGlzLm91dHB1dCwgJ2V4dC5qcycpKVxuICAgIC8vIGNvbnN0IGpzQ2h1bmsgPSBjb21waWxhdGlvbi5hZGRDaHVuayhgJHt0aGlzLm91dHB1dH0tanNgKTtcbiAgICAvLyBqc0NodW5rLmhhc1J1bnRpbWUgPSBqc0NodW5rLmlzSW5pdGlhbCA9ICgpID0+IHRydWU7XG4gICAgLy8ganNDaHVuay5maWxlcy5wdXNoKHBhdGguam9pbih0aGlzLm91dHB1dCwgJ2V4dC5qcycpKTtcbiAgICAvLyBqc0NodW5rLmZpbGVzLnB1c2gocGF0aC5qb2luKHRoaXMub3V0cHV0LCAnZXh0LmNzcycpKTtcbiAgICAvLyBqc0NodW5rLmlkID0gJ2FhYWFwJzsgLy8gdGhpcyBmb3JjZXMgaHRtbC13ZWJwYWNrLXBsdWdpbiB0byBpbmNsdWRlIGV4dC5qcyBmaXJzdFxuICAgIC8vIGNvbnNvbGUubG9nKCcqKioqKioqKmNvbXBpbGF0aW9uLmNodW5rc1sxXScpXG4gICAgLy8gY29uc29sZS5sb2coY29tcGlsYXRpb24uY2h1bmtzWzFdLmlkKVxuXG4gICAgLy9pZiAodGhpcy5hc3luY2hyb25vdXMpIGNhbGxiYWNrKCk7XG4vLyAgICBjb25zb2xlLmxvZyhjYWxsYmFjaylcblxuLy8gaWYgKGlzV2VicGFjazQpIHtcbi8vICAgY29uc29sZS5sb2cocGF0aC5qb2luKHRoaXMub3V0cHV0LCAnZXh0LmpzJykpXG4vLyAgIGNvbnN0IHN0YXRzID0gZnMuc3RhdFN5bmMocGF0aC5qb2luKG91dHB1dFBhdGgsICdleHQuanMnKSlcbi8vICAgY29uc3QgZmlsZVNpemVJbkJ5dGVzID0gc3RhdHMuc2l6ZVxuLy8gICBjb21waWxhdGlvbi5hc3NldHNbJ2V4dC5qcyddID0ge1xuLy8gICAgIHNvdXJjZTogZnVuY3Rpb24oKSB7cmV0dXJuIGZzLnJlYWRGaWxlU3luYyhwYXRoLmpvaW4ob3V0cHV0UGF0aCwgJ2V4dC5qcycpKX0sXG4vLyAgICAgc2l6ZTogZnVuY3Rpb24oKSB7cmV0dXJuIGZpbGVTaXplSW5CeXRlc31cbi8vICAgfVxuLy8gICBjb25zb2xlLmxvZyhjb21waWxhdGlvbi5lbnRyeXBvaW50cylcblxuLy8gICB2YXIgZmlsZWxpc3QgPSAnSW4gdGhpcyBidWlsZDpcXG5cXG4nO1xuXG4vLyAgIC8vIExvb3AgdGhyb3VnaCBhbGwgY29tcGlsZWQgYXNzZXRzLFxuLy8gICAvLyBhZGRpbmcgYSBuZXcgbGluZSBpdGVtIGZvciBlYWNoIGZpbGVuYW1lLlxuLy8gICBmb3IgKHZhciBmaWxlbmFtZSBpbiBjb21waWxhdGlvbi5hc3NldHMpIHtcbi8vICAgICBmaWxlbGlzdCArPSAoJy0gJysgZmlsZW5hbWUgKydcXG4nKTtcbi8vICAgfVxuXG4vLyAgIC8vIEluc2VydCB0aGlzIGxpc3QgaW50byB0aGUgd2VicGFjayBidWlsZCBhcyBhIG5ldyBmaWxlIGFzc2V0OlxuLy8gICBjb21waWxhdGlvbi5hc3NldHNbJ2ZpbGVsaXN0Lm1kJ10gPSB7XG4vLyAgICAgc291cmNlKCkge1xuLy8gICAgICAgcmV0dXJuIGZpbGVsaXN0O1xuLy8gICAgIH0sXG4vLyAgICAgc2l6ZSgpIHtcbi8vICAgICAgIHJldHVybiBmaWxlbGlzdC5sZW5ndGg7XG4vLyAgICAgfVxuLy8gICB9XG4vLyB9XG5cblxuICAgIC8vIGlmIChjb21waWxlci5ob29rcykge1xuICAgIC8vICAgICAvLyBpbiAnZXh0cmVhY3QtY29tcGlsYXRpb24nXG4gICAgLy8gICAgIC8vaHR0cHM6Ly9naXRodWIuY29tL2pha2V0cmVudC9odG1sLXdlYnBhY2stdGVtcGxhdGVcbiAgICAvLyAgICAgLy9odHRwczovL2dpdGh1Yi5jb20vamFudGltb24vaHRtbC13ZWJwYWNrLXBsdWdpbiNcbiAgICAvLyAgICAgLy8gdGhlIGZvbGxvd2luZyBpcyBuZWVkZWQgZm9yIGh0bWwtd2VicGFjay1wbHVnaW4gdG8gaW5jbHVkZSA8c2NyaXB0PiBhbmQgPGxpbms+IHRhZ3MgZm9yIEV4dFJlYWN0XG4gICAgLy8gICAgIGNvbXBpbGVyLmhvb2tzLmh0bWxXZWJwYWNrUGx1Z2luQmVmb3JlSHRtbEdlbmVyYXRpb24udGFwQXN5bmMoXG4gICAgLy8gICAgICAgJ2V4dHJlYWN0LWh0bWxnZW5lcmF0aW9uJyxcbiAgICAvLyAgICAgICAoZGF0YSwgY2IpID0+IHtcbiAgICAvLyAgICAgICAgIHJlYWRsaW5lLmN1cnNvclRvKHByb2Nlc3Muc3Rkb3V0LCAwKTtjb25zb2xlLmxvZyhhcHAgKyAnZXh0cmVhY3QtaHRtbGdlbmVyYXRpb24nKVxuICAgIC8vICAgICAgICAgY29uc29sZS5sb2coJ2RhdGEuYXNzZXRzLmpzLmxlbmd0aCcpXG4gICAgLy8gICAgICAgICBjb25zb2xlLmxvZyhkYXRhLmFzc2V0cy5qcy5sZW5ndGgpXG4gICAgLy8gICAgICAgICBkYXRhLmFzc2V0cy5qcy51bnNoaWZ0KCdleHQtcmVhY3QvZXh0LmpzJylcbiAgICAvLyAgICAgICAgIGRhdGEuYXNzZXRzLmNzcy51bnNoaWZ0KCdleHQtcmVhY3QvZXh0LmNzcycpXG4gICAgLy8gICAgICAgICBjYihudWxsLCBkYXRhKVxuICAgIC8vICAgICAgIH1cbiAgICAvLyAgICAgKVxuICAgIC8vICAgfVxuXG4iXX0=