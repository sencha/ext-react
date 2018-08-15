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
          var statements = ['Ext.require(["Ext.app.Application", "Ext.Component", "Ext.Widget", "Ext.layout.Fit", "Ext.react.Transition"])']; // for some reason command doesn't load component when only panel is required
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
        return require('@extjs/sencha-cmd');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJyZWFkbGluZSIsInJlYWN0VmVyc2lvbiIsIndhdGNoaW5nIiwiY21kRXJyb3JzIiwiYXBwIiwiY2hhbGsiLCJncmVlbiIsImdhdGhlckVycm9ycyIsImNtZCIsInN0ZG91dCIsIm9uIiwibWVzc2FnZSIsImRhdGEiLCJ0b1N0cmluZyIsIm1hdGNoIiwicHVzaCIsInJlcGxhY2UiLCJtb2R1bGUiLCJleHBvcnRzIiwib3B0aW9ucyIsImNvdW50IiwicGtnIiwiZnMiLCJleGlzdHNTeW5jIiwiSlNPTiIsInBhcnNlIiwicmVhZEZpbGVTeW5jIiwicmVhY3RFbnRyeSIsImRlcGVuZGVuY2llcyIsInJlYWN0IiwiaXMxNiIsImluY2x1ZGVzIiwiZXh0UmVhY3RSYyIsImdldERlZmF1bHRPcHRpb25zIiwiYnVpbGRzIiwiT2JqZWN0Iiwia2V5cyIsImxlbmd0aCIsImJ1aWxkT3B0aW9ucyIsImV4dCIsIm5hbWUiLCJfdmFsaWRhdGVCdWlsZENvbmZpZyIsImFzc2lnbiIsImN1cnJlbnRGaWxlIiwibWFuaWZlc3QiLCJ3YXRjaCIsImNvbXBpbGVyIiwid2VicGFja1ZlcnNpb24iLCJ1bmRlZmluZWQiLCJpc1dlYnBhY2s0IiwiaG9va3MiLCJjdXJzb3JUbyIsInByb2Nlc3MiLCJjb25zb2xlIiwibG9nIiwibWUiLCJhc3luY2hyb25vdXMiLCJ3YXRjaFJ1biIsInRhcEFzeW5jIiwiY2IiLCJ0YXAiLCJwbHVnaW4iLCJhZGRUb01hbmlmZXN0IiwiY2FsbCIsImZpbGUiLCJzdGF0ZSIsInJlc291cmNlIiwiZSIsImVycm9yIiwiY29tcGlsYXRpb24iLCJzdWNjZWVkTW9kdWxlIiwibm9ybWFsTW9kdWxlRmFjdG9yeSIsInBhcnNlciIsImh0bWxXZWJwYWNrUGx1Z2luQmVmb3JlSHRtbEdlbmVyYXRpb24iLCJhc3NldHMiLCJqcyIsInVuc2hpZnQiLCJjc3MiLCJlbWl0IiwiY2FsbGJhY2siLCJkb25lIiwibW9kdWxlcyIsImJ1aWxkIiwib3V0cHV0UGF0aCIsInBhdGgiLCJqb2luIiwib3V0cHV0IiwiZGV2U2VydmVyIiwiY29udGVudEJhc2UiLCJwcm9taXNlIiwiX2J1aWxkRXh0QnVuZGxlIiwicmVzdWx0IiwidXJsIiwicG9ydCIsIm9wbiIsInJlcXVpcmUiLCJ0b29sa2l0IiwidGhlbWUiLCJwYWNrYWdlcyIsInBhY2thZ2VEaXJzIiwic2RrIiwib3ZlcnJpZGVzIiwic2VuY2hhIiwiX2dldFNlbmNoQ21kUGF0aCIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0Iiwib25CdWlsZEZhaWwiLCJvbkJ1aWxkU3VjY2VzcyIsIm9uQnVpbGREb25lIiwiRXJyb3IiLCJ0cmVlU2hha2luZyIsInN0YXRlbWVudHMiLCJkZXBzIiwiY29uY2F0IiwidXNlclBhY2thZ2VzIiwid3JpdGVGaWxlU3luYyIsImNvbXByZXNzIiwicHJvZHVjdGlvbiIsImNtZFJlYnVpbGROZWVkZWQiLCJjd2QiLCJzaWxlbnQiLCJzdGRlcnIiLCJwaXBlIiwic3RkaW8iLCJlbmNvZGluZyIsImRlYnVnIiwidGVzdCIsIm1hbmlmZXN0RXh0cmFjdG9yIiwiZXh0cmFjdEZyb21KU1giLCJkb1BhcnNlIiwiX3NvdXJjZSIsIl92YWx1ZSIsImRpcm5hbWUiLCJiYXNlZGlyIiwiX2ZpbmRQYWNrYWdlcyIsIm1vZHVsZXNEaXIiLCJyZWFkZGlyU3luYyIsImZpbHRlciIsImRpciIsIm1hcCIsInBhY2thZ2VJbmZvIiwidHlwZSJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztBQUNBOztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFJQTs7SUFBWUEsUTs7Ozs7Ozs7Ozs7Ozs7QUFmWixJQUFJQyxlQUFlLENBQW5COztBQVlBLElBQUlDLFdBQVcsS0FBZjtBQUNBLElBQUlDLGtCQUFKO0FBQ0EsSUFBTUMsTUFBU0MsZ0JBQU1DLEtBQU4sQ0FBWSxVQUFaLENBQVQs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O0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdJO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5pbXBvcnQgJ2JhYmVsLXBvbHlmaWxsJztcbnZhciByZWFjdFZlcnNpb24gPSAwXG5pbXBvcnQgY2hhbGsgZnJvbSAnY2hhbGsnO1xuaW1wb3J0IGZzIGZyb20gJ2ZzJztcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IGNqc29uIGZyb20gJ2Nqc29uJztcbmltcG9ydCB7IHN5bmMgYXMgbWtkaXJwIH0gZnJvbSAnbWtkaXJwJztcbmltcG9ydCBleHRyYWN0RnJvbUpTWCBmcm9tICcuL2V4dHJhY3RGcm9tSlNYJztcbmltcG9ydCB7IHN5bmMgYXMgcmltcmFmIH0gZnJvbSAncmltcmFmJztcbmltcG9ydCB7IGJ1aWxkWE1MLCBjcmVhdGVBcHBKc29uLCBjcmVhdGVXb3Jrc3BhY2VKc29uLCBjcmVhdGVKU0RPTUVudmlyb25tZW50IH0gZnJvbSAnLi9hcnRpZmFjdHMnO1xuaW1wb3J0IHsgZXhlY1N5bmMsIHNwYXduLCBmb3JrIH0gZnJvbSAnY2hpbGRfcHJvY2Vzcyc7XG5pbXBvcnQgeyBnZW5lcmF0ZSB9IGZyb20gJ2FzdHJpbmcnO1xuaW1wb3J0IHsgc3luYyBhcyByZXNvbHZlIH0gZnJvbSAncmVzb2x2ZSc7XG5sZXQgd2F0Y2hpbmcgPSBmYWxzZTtcbmxldCBjbWRFcnJvcnM7XG5jb25zdCBhcHAgPSBgJHtjaGFsay5ncmVlbign4oS5IO+9omV4dO+9ozonKX0gZXh0LXJlYWN0LXdlYnBhY2stcGx1Z2luOiBgO1xuaW1wb3J0ICogYXMgcmVhZGxpbmUgZnJvbSAncmVhZGxpbmUnXG5cbmNvbnN0IGdhdGhlckVycm9ycyA9IChjbWQpID0+IHtcbiAgaWYgKGNtZC5zdGRvdXQpIHtcbiAgICBjbWQuc3Rkb3V0Lm9uKCdkYXRhJywgZGF0YSA9PiB7XG4gICAgICBjb25zdCBtZXNzYWdlID0gZGF0YS50b1N0cmluZygpO1xuICAgICAgaWYgKG1lc3NhZ2UubWF0Y2goL15cXFtFUlJcXF0vKSkge1xuICAgICAgICBjbWRFcnJvcnMucHVzaChtZXNzYWdlLnJlcGxhY2UoL15cXFtFUlJcXF0gL2dpLCAnJykpO1xuICAgICAgfVxuICAgIH0pXG4gIH1cbiAgcmV0dXJuIGNtZDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjbGFzcyBFeHRSZWFjdFdlYnBhY2tQbHVnaW4ge1xuICAvKipcbiAgICogQHBhcmFtIHtPYmplY3RbXX0gYnVpbGRzXG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gW2RlYnVnPWZhbHNlXSBTZXQgdG8gdHJ1ZSB0byBwcmV2ZW50IGNsZWFudXAgb2YgYnVpbGQgdGVtcG9yYXJ5IGJ1aWxkIGFydGlmYWN0cyB0aGF0IG1pZ2h0IGJlIGhlbHBmdWwgaW4gdHJvdWJsZXNob290aW5nIGlzc3Vlcy5cbiAgICogQHBhcmFtIHtTdHJpbmd9IHNkayBUaGUgZnVsbCBwYXRoIHRvIHRoZSBFeHRSZWFjdCBTREtcbiAgICogQHBhcmFtIHtTdHJpbmd9IFt0b29sa2l0PSdtb2Rlcm4nXSBcIm1vZGVyblwiIG9yIFwiY2xhc3NpY1wiXG4gICAqIEBwYXJhbSB7U3RyaW5nfSB0aGVtZSBUaGUgbmFtZSBvZiB0aGUgRXh0UmVhY3QgdGhlbWUgcGFja2FnZSB0byB1c2UsIGZvciBleGFtcGxlIFwidGhlbWUtbWF0ZXJpYWxcIlxuICAgKiBAcGFyYW0ge1N0cmluZ1tdfSBwYWNrYWdlcyBBbiBhcnJheSBvZiBFeHRSZWFjdCBwYWNrYWdlcyB0byBpbmNsdWRlXG4gICAqIEBwYXJhbSB7U3RyaW5nW119IG92ZXJyaWRlcyBBbiBhcnJheSB3aXRoIHRoZSBwYXRocyBvZiBkaXJlY3RvcmllcyBvciBmaWxlcyB0byBzZWFyY2guIEFueSBjbGFzc2VzXG4gICAqIGRlY2xhcmVkIGluIHRoZXNlIGxvY2F0aW9ucyB3aWxsIGJlIGF1dG9tYXRpY2FsbHkgcmVxdWlyZWQgYW5kIGluY2x1ZGVkIGluIHRoZSBidWlsZC5cbiAgICogSWYgYW55IGZpbGUgZGVmaW5lcyBhbiBFeHRSZWFjdCBvdmVycmlkZSAodXNpbmcgRXh0LmRlZmluZSB3aXRoIGFuIFwib3ZlcnJpZGVcIiBwcm9wZXJ0eSksXG4gICAqIHRoYXQgb3ZlcnJpZGUgd2lsbCBpbiBmYWN0IG9ubHkgYmUgaW5jbHVkZWQgaW4gdGhlIGJ1aWxkIGlmIHRoZSB0YXJnZXQgY2xhc3Mgc3BlY2lmaWVkXG4gICAqIGluIHRoZSBcIm92ZXJyaWRlXCIgcHJvcGVydHkgaXMgYWxzbyBpbmNsdWRlZC5cbiAgICogQHBhcmFtIHtTdHJpbmd9IG91dHB1dCBUaGUgcGF0aCB0byBkaXJlY3Rvcnkgd2hlcmUgdGhlIEV4dFJlYWN0IGJ1bmRsZSBzaG91bGQgYmUgd3JpdHRlblxuICAgKiBAcGFyYW0ge0Jvb2xlYW59IGFzeW5jaHJvbm91cyBTZXQgdG8gdHJ1ZSB0byBydW4gU2VuY2hhIENtZCBidWlsZHMgYXN5bmNocm9ub3VzbHkuIFRoaXMgbWFrZXMgdGhlIHdlYnBhY2sgYnVpbGQgZmluaXNoIG11Y2ggZmFzdGVyLCBidXQgdGhlIGFwcCBtYXkgbm90IGxvYWQgY29ycmVjdGx5IGluIHlvdXIgYnJvd3NlciB1bnRpbCBTZW5jaGEgQ21kIGlzIGZpbmlzaGVkIGJ1aWxkaW5nIHRoZSBFeHRSZWFjdCBidW5kbGVcbiAgICogQHBhcmFtIHtCb29sZWFufSBwcm9kdWN0aW9uIFNldCB0byB0cnVlIGZvciBwcm9kdWN0aW9uIGJ1aWxkcy4gIFRoaXMgdGVsbCBTZW5jaGEgQ21kIHRvIGNvbXByZXNzIHRoZSBnZW5lcmF0ZWQgSlMgYnVuZGxlLlxuICAgKiBAcGFyYW0ge0Jvb2xlYW59IHRyZWVTaGFraW5nIFNldCB0byBmYWxzZSB0byBkaXNhYmxlIHRyZWUgc2hha2luZyBpbiBkZXZlbG9wbWVudCBidWlsZHMuICBUaGlzIG1ha2VzIGluY3JlbWVudGFsIHJlYnVpbGRzIGZhc3RlciBhcyBhbGwgRXh0UmVhY3QgY29tcG9uZW50cyBhcmUgaW5jbHVkZWQgaW4gdGhlIGV4dC5qcyBidW5kbGUgaW4gdGhlIGluaXRpYWwgYnVpbGQgYW5kIHRodXMgdGhlIGJ1bmRsZSBkb2VzIG5vdCBuZWVkIHRvIGJlIHJlYnVpbHQgYWZ0ZXIgZWFjaCBjaGFuZ2UuIERlZmF1bHRzIHRvIHRydWUuXG4gICAqL1xuICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgdGhpcy5jb3VudCA9IDBcbiAgICAvL2NhbiBiZSBpbiBkZXZkZXBlbmRlbmNpZXMgLSBhY2NvdW50IGZvciB0aGlzOiByZWFjdDogXCIxNS4xNi4wXCJcbiAgICB2YXIgcGtnID0gKGZzLmV4aXN0c1N5bmMoJ3BhY2thZ2UuanNvbicpICYmIEpTT04ucGFyc2UoZnMucmVhZEZpbGVTeW5jKCdwYWNrYWdlLmpzb24nLCAndXRmLTgnKSkgfHwge30pO1xuICAgIHZhciByZWFjdEVudHJ5ID0gcGtnLmRlcGVuZGVuY2llcy5yZWFjdFxuICAgIHZhciBpczE2ID0gcmVhY3RFbnRyeS5pbmNsdWRlcyhcIjE2XCIpO1xuXG4gICAgaWYgKGlzMTYpIHsgcmVhY3RWZXJzaW9uID0gMTYgfVxuICAgIGVsc2UgeyByZWFjdFZlcnNpb24gPSAxNSB9XG4gICAgdGhpcy5yZWFjdFZlcnNpb24gPSByZWFjdFZlcnNpb25cbiAgICBjb25zdCBleHRSZWFjdFJjID0gKGZzLmV4aXN0c1N5bmMoJy5leHQtcmVhY3RyYycpICYmIEpTT04ucGFyc2UoZnMucmVhZEZpbGVTeW5jKCcuZXh0LXJlYWN0cmMnLCAndXRmLTgnKSkgfHwge30pO1xuICAgIG9wdGlvbnMgPSB7IC4uLnRoaXMuZ2V0RGVmYXVsdE9wdGlvbnMoKSwgLi4ub3B0aW9ucywgLi4uZXh0UmVhY3RSYyB9O1xuICAgIGNvbnN0IHsgYnVpbGRzIH0gPSBvcHRpb25zO1xuICAgIGlmIChPYmplY3Qua2V5cyhidWlsZHMpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgY29uc3QgeyBidWlsZHMsIC4uLmJ1aWxkT3B0aW9ucyB9ID0gb3B0aW9ucztcbiAgICAgIGJ1aWxkcy5leHQgPSBidWlsZE9wdGlvbnM7XG4gICAgfVxuICAgIGZvciAobGV0IG5hbWUgaW4gYnVpbGRzKVxuICAgICAgdGhpcy5fdmFsaWRhdGVCdWlsZENvbmZpZyhuYW1lLCBidWlsZHNbbmFtZV0pO1xuICAgIE9iamVjdC5hc3NpZ24odGhpcywge1xuICAgICAgLi4ub3B0aW9ucyxcbiAgICAgIGN1cnJlbnRGaWxlOiBudWxsLFxuICAgICAgbWFuaWZlc3Q6IG51bGwsXG4gICAgICBkZXBlbmRlbmNpZXM6IFtdXG4gICAgfSk7XG4gIH1cblxuICB3YXRjaFJ1bigpIHtcbiAgICB0aGlzLndhdGNoID0gdHJ1ZVxuICB9XG5cbiAgYXBwbHkoY29tcGlsZXIpIHtcbiAgICBpZiAodGhpcy53ZWJwYWNrVmVyc2lvbiA9PSB1bmRlZmluZWQpIHtcbiAgICAgIGNvbnN0IGlzV2VicGFjazQgPSBjb21waWxlci5ob29rcztcbiAgICAgIGlmIChpc1dlYnBhY2s0KSB7dGhpcy53ZWJwYWNrVmVyc2lvbiA9ICdJUyB3ZWJwYWNrIDQnfVxuICAgICAgZWxzZSB7dGhpcy53ZWJwYWNrVmVyc2lvbiA9ICdOT1Qgd2VicGFjayA0J31cbiAgICAgIHJlYWRsaW5lLmN1cnNvclRvKHByb2Nlc3Muc3Rkb3V0LCAwKTtjb25zb2xlLmxvZyhhcHAgKyAncmVhY3RWZXJzaW9uOiAnICsgdGhpcy5yZWFjdFZlcnNpb24gKyAnLCAnICsgdGhpcy53ZWJwYWNrVmVyc2lvbilcbiAgICB9XG4gICAgY29uc3QgbWUgPSB0aGlzO1xuXG4gICAgaWYgKGNvbXBpbGVyLmhvb2tzKSB7XG4gICAgICBpZiAodGhpcy5hc3luY2hyb25vdXMpIHtcbiAgICAgICAgY29tcGlsZXIuaG9va3Mud2F0Y2hSdW4udGFwQXN5bmMoJ2V4dC1yZWFjdC13YXRjaC1ydW4gKGFzeW5jKScsICh3YXRjaGluZywgY2IpID0+IHtcbiAgICAgICAgICByZWFkbGluZS5jdXJzb3JUbyhwcm9jZXNzLnN0ZG91dCwgMCk7Y29uc29sZS5sb2coYXBwICsgJ2V4dC1yZWFjdC13YXRjaC1ydW4gKGFzeW5jKScpXG4gICAgICAgICAgdGhpcy53YXRjaFJ1bigpXG4gICAgICAgICAgY2IoKVxuICAgICAgICB9KVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGNvbXBpbGVyLmhvb2tzLndhdGNoUnVuLnRhcCgnZXh0LXJlYWN0LXdhdGNoLXJ1bicsICh3YXRjaGluZykgPT4ge1xuICAgICAgICAgIHJlYWRsaW5lLmN1cnNvclRvKHByb2Nlc3Muc3Rkb3V0LCAwKTtjb25zb2xlLmxvZyhhcHAgKyAnZXh0LXJlYWN0LXdhdGNoLXJ1bicpXG4gICAgICAgICAgdGhpcy53YXRjaFJ1bigpXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgY29tcGlsZXIucGx1Z2luKCd3YXRjaC1ydW4nLCAod2F0Y2hpbmcsIGNiKSA9PiB7XG4gICAgICAgIHJlYWRsaW5lLmN1cnNvclRvKHByb2Nlc3Muc3Rkb3V0LCAwKTtjb25zb2xlLmxvZyhhcHAgKyAnd2F0Y2gtcnVuJylcbiAgICAgICAgdGhpcy53YXRjaFJ1bigpXG4gICAgICAgIGNiKClcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWRkcyB0aGUgY29kZSBmb3IgdGhlIHNwZWNpZmllZCBmdW5jdGlvbiBjYWxsIHRvIHRoZSBtYW5pZmVzdC5qcyBmaWxlXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGNhbGwgQSBmdW5jdGlvbiBjYWxsIEFTVCBub2RlLlxuICAgICAqL1xuICAgIGNvbnN0IGFkZFRvTWFuaWZlc3QgPSBmdW5jdGlvbihjYWxsKSB7XG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCBmaWxlID0gdGhpcy5zdGF0ZS5tb2R1bGUucmVzb3VyY2U7XG4gICAgICAgIG1lLmRlcGVuZGVuY2llc1tmaWxlXSA9IFsgLi4uKG1lLmRlcGVuZGVuY2llc1tmaWxlXSB8fCBbXSksIGdlbmVyYXRlKGNhbGwpIF07XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoYEVycm9yIHByb2Nlc3NpbmcgJHtmaWxlfWApO1xuICAgICAgfVxuICAgIH07XG5cblxuXG5cblxuXG4gICAgaWYgKGNvbXBpbGVyLmhvb2tzKSB7XG4gICAgICBjb21waWxlci5ob29rcy5jb21waWxhdGlvbi50YXAoJ2V4dC1yZWFjdC1jb21waWxhdGlvbicsIChjb21waWxhdGlvbixkYXRhKSA9PiB7XG4gICAgICAgIHJlYWRsaW5lLmN1cnNvclRvKHByb2Nlc3Muc3Rkb3V0LCAwKTtjb25zb2xlLmxvZyhhcHAgKyAnZXh0LXJlYWN0LWNvbXBpbGF0aW9uJylcbiAgICAgICAgY29tcGlsYXRpb24uaG9va3Muc3VjY2VlZE1vZHVsZS50YXAoJ2V4dC1yZWFjdC1zdWNjZWVkLW1vZHVsZScsIChtb2R1bGUpID0+IHtcbiAgICAgICAgICB0aGlzLnN1Y2NlZWRNb2R1bGUoY29tcGlsYXRpb24sIG1vZHVsZSlcbiAgICAgICAgfSlcblxuICAgICAgICBkYXRhLm5vcm1hbE1vZHVsZUZhY3RvcnkucGx1Z2luKFwicGFyc2VyXCIsIGZ1bmN0aW9uKHBhcnNlciwgb3B0aW9ucykge1xuICAgICAgICAgIC8vIGV4dHJhY3QgeHR5cGVzIGFuZCBjbGFzc2VzIGZyb20gRXh0LmNyZWF0ZSBjYWxsc1xuICAgICAgICAgIHBhcnNlci5wbHVnaW4oJ2NhbGwgRXh0LmNyZWF0ZScsIGFkZFRvTWFuaWZlc3QpO1xuICAgICAgICAgIC8vIGNvcHkgRXh0LnJlcXVpcmUgY2FsbHMgdG8gdGhlIG1hbmlmZXN0LiAgVGhpcyBhbGxvd3MgdGhlIHVzZXJzIHRvIGV4cGxpY2l0bHkgcmVxdWlyZSBhIGNsYXNzIGlmIHRoZSBwbHVnaW4gZmFpbHMgdG8gZGV0ZWN0IGl0LlxuICAgICAgICAgIHBhcnNlci5wbHVnaW4oJ2NhbGwgRXh0LnJlcXVpcmUnLCBhZGRUb01hbmlmZXN0KTtcbiAgICAgICAgICAvLyBjb3B5IEV4dC5kZWZpbmUgY2FsbHMgdG8gdGhlIG1hbmlmZXN0LiAgVGhpcyBhbGxvd3MgdXNlcnMgdG8gd3JpdGUgc3RhbmRhcmQgRXh0UmVhY3QgY2xhc3Nlcy5cbiAgICAgICAgICBwYXJzZXIucGx1Z2luKCdjYWxsIEV4dC5kZWZpbmUnLCBhZGRUb01hbmlmZXN0KTtcbiAgICAgICAgfSlcblxuICAgICAgICBjb21waWxhdGlvbi5ob29rcy5odG1sV2VicGFja1BsdWdpbkJlZm9yZUh0bWxHZW5lcmF0aW9uLnRhcEFzeW5jKCdleHQtcmVhY3QtaHRtbGdlbmVyYXRpb24nLChkYXRhLCBjYikgPT4ge1xuICAgICAgICAgIHJlYWRsaW5lLmN1cnNvclRvKHByb2Nlc3Muc3Rkb3V0LCAwKTtjb25zb2xlLmxvZyhhcHAgKyAnZXh0LXJlYWN0LWh0bWxnZW5lcmF0aW9uJylcbiAgICAgICAgICBkYXRhLmFzc2V0cy5qcy51bnNoaWZ0KCdleHQtcmVhY3QvZXh0LmpzJylcbiAgICAgICAgICBkYXRhLmFzc2V0cy5jc3MudW5zaGlmdCgnZXh0LXJlYWN0L2V4dC5jc3MnKSAgICAgICAgICBcbiAgICAgICAgICBjYihudWxsLCBkYXRhKVxuICAgICAgICB9KVxuXG4gICAgICB9KVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGNvbXBpbGVyLnBsdWdpbignY29tcGlsYXRpb24nLCAoY29tcGlsYXRpb24sIGRhdGEpID0+IHtcbiAgICAgICAgcmVhZGxpbmUuY3Vyc29yVG8ocHJvY2Vzcy5zdGRvdXQsIDApO2NvbnNvbGUubG9nKGFwcCArICdjb21waWxhdGlvbicpXG4gICAgICAgIGNvbXBpbGF0aW9uLnBsdWdpbignc3VjY2VlZC1tb2R1bGUnLCAobW9kdWxlKSA9PiB7XG4gICAgICAgICAgdGhpcy5zdWNjZWVkTW9kdWxlKGNvbXBpbGF0aW9uLCBtb2R1bGUpXG4gICAgICAgIH0pXG4gICAgICAgIGRhdGEubm9ybWFsTW9kdWxlRmFjdG9yeS5wbHVnaW4oXCJwYXJzZXJcIiwgZnVuY3Rpb24ocGFyc2VyLCBvcHRpb25zKSB7XG4gICAgICAgICAgLy8gZXh0cmFjdCB4dHlwZXMgYW5kIGNsYXNzZXMgZnJvbSBFeHQuY3JlYXRlIGNhbGxzXG4gICAgICAgICAgcGFyc2VyLnBsdWdpbignY2FsbCBFeHQuY3JlYXRlJywgYWRkVG9NYW5pZmVzdCk7XG4gICAgICAgICAgLy8gY29weSBFeHQucmVxdWlyZSBjYWxscyB0byB0aGUgbWFuaWZlc3QuICBUaGlzIGFsbG93cyB0aGUgdXNlcnMgdG8gZXhwbGljaXRseSByZXF1aXJlIGEgY2xhc3MgaWYgdGhlIHBsdWdpbiBmYWlscyB0byBkZXRlY3QgaXQuXG4gICAgICAgICAgcGFyc2VyLnBsdWdpbignY2FsbCBFeHQucmVxdWlyZScsIGFkZFRvTWFuaWZlc3QpO1xuICAgICAgICAgIC8vIGNvcHkgRXh0LmRlZmluZSBjYWxscyB0byB0aGUgbWFuaWZlc3QuICBUaGlzIGFsbG93cyB1c2VycyB0byB3cml0ZSBzdGFuZGFyZCBFeHRSZWFjdCBjbGFzc2VzLlxuICAgICAgICAgIHBhcnNlci5wbHVnaW4oJ2NhbGwgRXh0LmRlZmluZScsIGFkZFRvTWFuaWZlc3QpO1xuICAgICAgICB9KVxuXG4gICAgICB9KVxuICAgIH1cblxuLy8qZW1pdCAtIG9uY2UgYWxsIG1vZHVsZXMgYXJlIHByb2Nlc3NlZCwgY3JlYXRlIHRoZSBvcHRpbWl6ZWQgRXh0UmVhY3QgYnVpbGQuXG4gICAgaWYgKGNvbXBpbGVyLmhvb2tzKSB7XG4gICAgICBpZiAodHJ1ZSkge1xuICAgICAgICBjb21waWxlci5ob29rcy5lbWl0LnRhcEFzeW5jKCdleHQtcmVhY3QtZW1pdCAoYXN5bmMpJywgKGNvbXBpbGF0aW9uLCBjYWxsYmFjaykgPT4ge1xuICAgICAgICAgIHJlYWRsaW5lLmN1cnNvclRvKHByb2Nlc3Muc3Rkb3V0LCAwKTtjb25zb2xlLmxvZyhhcHAgKyAnZXh0LXJlYWN0LWVtaXQgIChhc3luYyknKVxuICAgICAgICAgIHRoaXMuZW1pdChjb21waWxlciwgY29tcGlsYXRpb24sIGNhbGxiYWNrKVxuICAgICAgICAgIC8vY29uc29sZS5sb2coYXBwICsgJ2FmdGVyIGV4dC1yZWFjdC1lbWl0ICAoYXN5bmMpJylcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBjb21waWxlci5ob29rcy5lbWl0LnRhcCgnZXh0LXJlYWN0LWVtaXQnLCAoY29tcGlsYXRpb24pID0+IHtcbiAgICAgICAgICByZWFkbGluZS5jdXJzb3JUbyhwcm9jZXNzLnN0ZG91dCwgMCk7Y29uc29sZS5sb2coYXBwICsgJ2V4dC1yZWFjdC1lbWl0JylcbiAgICAgICAgICB0aGlzLmVtaXQoY29tcGlsZXIsIGNvbXBpbGF0aW9uKVxuICAgICAgICAgIC8vY29uc29sZS5sb2coYXBwICsgJ2FmdGVyIGV4dC1yZWFjdC1lbWl0JylcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBjb21waWxlci5wbHVnaW4oJ2VtaXQnLCAoY29tcGlsYXRpb24sIGNhbGxiYWNrKSA9PiB7XG4gICAgICAgIHJlYWRsaW5lLmN1cnNvclRvKHByb2Nlc3Muc3Rkb3V0LCAwKTtjb25zb2xlLmxvZyhhcHAgKyAnZW1pdCcpXG4gICAgICAgIHRoaXMuZW1pdChjb21waWxlciwgY29tcGlsYXRpb24sIGNhbGxiYWNrKVxuICAgICAgICBjYWxsYmFjaygpXG4gICAgICB9KVxuICAgIH1cblxuICAgIGlmIChjb21waWxlci5ob29rcykge1xuICAgICAgaWYgKHRoaXMuYXN5bmNocm9ub3VzKSB7XG4gICAgICAgIGNvbXBpbGVyLmhvb2tzLmRvbmUudGFwQXN5bmMoJ2V4dC1yZWFjdC1kb25lIChhc3luYyknLCAoY29tcGlsYXRpb24sIGNhbGxiYWNrKSA9PiB7XG4gICAgICAgICAgcmVhZGxpbmUuY3Vyc29yVG8ocHJvY2Vzcy5zdGRvdXQsIDApO2NvbnNvbGUubG9nKGFwcCArICdleHQtcmVhY3QtZG9uZSAoYXN5bmMpJylcbiAgICAgICAgICBpZiAoY2FsbGJhY2sgIT0gbnVsbCkgXG4gICAgICAgICAge1xuICAgICAgICAgICAgaWYgKHRoaXMuYXN5bmNocm9ub3VzKSBcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2NhbGxpbmcgY2FsbGJhY2sgZm9yIGV4dC1yZWFjdC1lbWl0ICAoYXN5bmMpJylcbiAgICAgICAgICAgICAgY2FsbGJhY2soKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBjb21waWxlci5ob29rcy5kb25lLnRhcCgnZXh0LXJlYWN0LWRvbmUnLCAoKSA9PiB7XG4gICAgICAgICAgcmVhZGxpbmUuY3Vyc29yVG8ocHJvY2Vzcy5zdGRvdXQsIDApO2NvbnNvbGUubG9nKGFwcCArICdleHQtcmVhY3QtZG9uZScpXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgZW1pdChjb21waWxlciwgY29tcGlsYXRpb24sIGNhbGxiYWNrKSB7XG4gICAgdmFyIGlzV2VicGFjazQgPSBjb21waWxhdGlvbi5ob29rcztcbiAgICB2YXIgbW9kdWxlcyA9IFtdXG4gICAgaWYgKGlzV2VicGFjazQpIHtcbiAgICAgIGlzV2VicGFjazQgPSB0cnVlXG4gICAgICAvL21vZHVsZXMgPSBjb21waWxhdGlvbi5jaHVua3MucmVkdWNlKChhLCBiKSA9PiBhLmNvbmNhdChiLl9tb2R1bGVzKSwgW10pO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGlzV2VicGFjazQgPSBmYWxzZVxuICAgICAgLy9tb2R1bGVzID0gY29tcGlsYXRpb24uY2h1bmtzLnJlZHVjZSgoYSwgYikgPT4gYS5jb25jYXQoYi5tb2R1bGVzKSwgW10pO1xuICAgIH1cbiAgICBjb25zdCBidWlsZCA9IHRoaXMuYnVpbGRzW09iamVjdC5rZXlzKHRoaXMuYnVpbGRzKVswXV07XG4gICAgbGV0IG91dHB1dFBhdGggPSBwYXRoLmpvaW4oY29tcGlsZXIub3V0cHV0UGF0aCwgdGhpcy5vdXRwdXQpO1xuICAgIC8vIHdlYnBhY2stZGV2LXNlcnZlciBvdmVyd3JpdGVzIHRoZSBvdXRwdXRQYXRoIHRvIFwiL1wiLCBzbyB3ZSBuZWVkIHRvIHByZXBlbmQgY29udGVudEJhc2VcbiAgICBpZiAoY29tcGlsZXIub3V0cHV0UGF0aCA9PT0gJy8nICYmIGNvbXBpbGVyLm9wdGlvbnMuZGV2U2VydmVyKSB7XG4gICAgICBvdXRwdXRQYXRoID0gcGF0aC5qb2luKGNvbXBpbGVyLm9wdGlvbnMuZGV2U2VydmVyLmNvbnRlbnRCYXNlLCBvdXRwdXRQYXRoKTtcbiAgICB9XG4gICAgbGV0IHByb21pc2UgPSB0aGlzLl9idWlsZEV4dEJ1bmRsZShpc1dlYnBhY2s0LCAnbm90JywgbW9kdWxlcywgb3V0cHV0UGF0aCwgYnVpbGQsIGNhbGxiYWNrKVxuICAgIGxldCByZXN1bHQgPSBhd2FpdCBwcm9taXNlXG5cbiAgICBpZiAodGhpcy53YXRjaCkge1xuICAgICAgaWYgKHRoaXMuY291bnQgPT0gMCkge1xuICAgICAgICB2YXIgdXJsID0gJ2h0dHA6Ly9sb2NhbGhvc3Q6JyArIHRoaXMucG9ydFxuICAgICAgICByZWFkbGluZS5jdXJzb3JUbyhwcm9jZXNzLnN0ZG91dCwgMCk7Y29uc29sZS5sb2coYXBwICsgJ2V4dC1yZWFjdC1lbWl0IC0gb3BlbiBicm93c2VyIGF0ICcgKyB1cmwpXG4gICAgICAgIHRoaXMuY291bnQrK1xuICAgICAgICBjb25zdCBvcG4gPSByZXF1aXJlKCdvcG4nKVxuICAgICAgICBvcG4odXJsKVxuICAgICAgfVxuICAgIH1cbiAgICAvL2lmIChjYWxsYmFjayAhPSBudWxsKXtpZiAodGhpcy5hc3luY2hyb25vdXMpe2NhbGxiYWNrKCl9fVxuICAgIGlmIChjYWxsYmFjayAhPSBudWxsKXtpZiAodHJ1ZSl7Y2FsbGJhY2soKX19XG4gIH1cblxuICAvKipcbiAgIC8qKlxuICAgICogQnVpbGRzIGEgbWluaW1hbCB2ZXJzaW9uIG9mIHRoZSBFeHRSZWFjdCBmcmFtZXdvcmsgYmFzZWQgb24gdGhlIGNsYXNzZXMgdXNlZFxuICAgICogQHBhcmFtIHtTdHJpbmd9IG5hbWUgVGhlIG5hbWUgb2YgdGhlIGJ1aWxkXG4gICAgKiBAcGFyYW0ge01vZHVsZVtdfSBtb2R1bGVzIHdlYnBhY2sgbW9kdWxlc1xuICAgICogQHBhcmFtIHtTdHJpbmd9IG91dHB1dCBUaGUgcGF0aCB0byB3aGVyZSB0aGUgZnJhbWV3b3JrIGJ1aWxkIHNob3VsZCBiZSB3cml0dGVuXG4gICAgKiBAcGFyYW0ge1N0cmluZ30gW3Rvb2xraXQ9J21vZGVybiddIFwibW9kZXJuXCIgb3IgXCJjbGFzc2ljXCJcbiAgICAqIEBwYXJhbSB7U3RyaW5nfSBvdXRwdXQgVGhlIHBhdGggdG8gdGhlIGRpcmVjdG9yeSB0byBjcmVhdGUgd2hpY2ggd2lsbCBjb250YWluIHRoZSBqcyBhbmQgY3NzIGJ1bmRsZXNcbiAgICAqIEBwYXJhbSB7U3RyaW5nfSB0aGVtZSBUaGUgbmFtZSBvZiB0aGUgRXh0UmVhY3QgdGhlbWUgcGFja2FnZSB0byB1c2UsIGZvciBleGFtcGxlIFwidGhlbWUtbWF0ZXJpYWxcIlxuICAgICogQHBhcmFtIHtTdHJpbmdbXX0gcGFja2FnZXMgQW4gYXJyYXkgb2YgRXh0UmVhY3QgcGFja2FnZXMgdG8gaW5jbHVkZVxuICAgICogQHBhcmFtIHtTdHJpbmdbXX0gcGFja2FnZURpcnMgRGlyZWN0b3JpZXMgY29udGFpbmluZyBwYWNrYWdlc1xuICAgICogQHBhcmFtIHtTdHJpbmdbXX0gb3ZlcnJpZGVzIEFuIGFycmF5IG9mIGxvY2F0aW9ucyBmb3Igb3ZlcnJpZGVzXG4gICAgKiBAcGFyYW0ge1N0cmluZ30gc2RrIFRoZSBmdWxsIHBhdGggdG8gdGhlIEV4dFJlYWN0IFNES1xuICAgICogQHByaXZhdGVcbiAgICAqL1xuICBfYnVpbGRFeHRCdW5kbGUoaXNXZWJwYWNrNCwgbmFtZSwgbW9kdWxlcywgb3V0cHV0LCB7IHRvb2xraXQ9J21vZGVybicsIHRoZW1lLCBwYWNrYWdlcz1bXSwgcGFja2FnZURpcnM9W10sIHNkaywgb3ZlcnJpZGVzLCBjYWxsYmFja30pIHtcbiAgICBsZXQgc2VuY2hhID0gdGhpcy5fZ2V0U2VuY2hDbWRQYXRoKCk7XG4gICAgdGhlbWUgPSB0aGVtZSB8fCAodG9vbGtpdCA9PT0gJ2NsYXNzaWMnID8gJ3RoZW1lLXRyaXRvbicgOiAndGhlbWUtbWF0ZXJpYWwnKTtcblxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB0aGlzLm9uQnVpbGRGYWlsID0gcmVqZWN0O1xuICAgICAgdGhpcy5vbkJ1aWxkU3VjY2VzcyA9IHJlc29sdmU7XG4gICAgICBjbWRFcnJvcnMgPSBbXTtcbiAgICAgIFxuICAgICAgY29uc3Qgb25CdWlsZERvbmUgPSAoKSA9PiB7XG4gICAgICAgIGlmIChjbWRFcnJvcnMubGVuZ3RoKSB7XG4gICAgICAgICAgdGhpcy5vbkJ1aWxkRmFpbChuZXcgRXJyb3IoY21kRXJyb3JzLmpvaW4oXCJcIikpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLm9uQnVpbGRTdWNjZXNzKCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKCF3YXRjaGluZykge1xuICAgICAgICByaW1yYWYob3V0cHV0KTtcbiAgICAgICAgbWtkaXJwKG91dHB1dCk7XG4gICAgICB9XG5cbiAgICAgIGxldCBqcztcbiAgICAgIGlmICh0aGlzLnRyZWVTaGFraW5nKSB7XG4gICAgICAgIGxldCBzdGF0ZW1lbnRzID0gWydFeHQucmVxdWlyZShbXCJFeHQuYXBwLkFwcGxpY2F0aW9uXCIsIFwiRXh0LkNvbXBvbmVudFwiLCBcIkV4dC5XaWRnZXRcIiwgXCJFeHQubGF5b3V0LkZpdFwiLCBcIkV4dC5yZWFjdC5UcmFuc2l0aW9uXCJdKSddOyAvLyBmb3Igc29tZSByZWFzb24gY29tbWFuZCBkb2Vzbid0IGxvYWQgY29tcG9uZW50IHdoZW4gb25seSBwYW5lbCBpcyByZXF1aXJlZFxuICAgICAgICAvLyBpZiAocGFja2FnZXMuaW5kZXhPZigncmVhY3RvJykgIT09IC0xKSB7XG4gICAgICAgIC8vICAgc3RhdGVtZW50cy5wdXNoKCdFeHQucmVxdWlyZShcIkV4dC5yZWFjdC5SZW5kZXJlckNlbGxcIiknKTtcbiAgICAgICAgLy8gfVxuICAgICAgICAvL21qZ1xuICAgICAgICBmb3IgKGxldCBtb2R1bGUgb2YgbW9kdWxlcykge1xuICAgICAgICAgIGNvbnN0IGRlcHMgPSB0aGlzLmRlcGVuZGVuY2llc1ttb2R1bGUucmVzb3VyY2VdO1xuICAgICAgICAgIGlmIChkZXBzKSBzdGF0ZW1lbnRzID0gc3RhdGVtZW50cy5jb25jYXQoZGVwcyk7XG4gICAgICAgIH1cbiAgICAgICAganMgPSBzdGF0ZW1lbnRzLmpvaW4oJztcXG4nKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGpzID0gJ0V4dC5yZXF1aXJlKFwiRXh0LipcIiknO1xuICAgICAgfVxuICAgICAgY29uc3QgbWFuaWZlc3QgPSBwYXRoLmpvaW4ob3V0cHV0LCAnbWFuaWZlc3QuanMnKTtcbiAgICAgIC8vIGFkZCBleHQtcmVhY3QvcGFja2FnZXMgYXV0b21hdGljYWxseSBpZiBwcmVzZW50XG4gICAgICBjb25zdCB1c2VyUGFja2FnZXMgPSBwYXRoLmpvaW4oJy4nLCAnZXh0LXJlYWN0JywgJ3BhY2thZ2VzJyk7XG4gICAgICBpZiAoZnMuZXhpc3RzU3luYyh1c2VyUGFja2FnZXMpKSB7XG4gICAgICAgIHBhY2thZ2VEaXJzLnB1c2godXNlclBhY2thZ2VzKVxuICAgICAgfVxuXG4gICAgICBpZiAoZnMuZXhpc3RzU3luYyhwYXRoLmpvaW4oc2RrLCAnZXh0JykpKSB7XG4gICAgICAgIC8vIGxvY2FsIGNoZWNrb3V0IG9mIHRoZSBTREsgcmVwb1xuICAgICAgICBwYWNrYWdlRGlycy5wdXNoKHBhdGguam9pbignZXh0JywgJ3BhY2thZ2VzJykpO1xuICAgICAgICBzZGsgPSBwYXRoLmpvaW4oc2RrLCAnZXh0Jyk7XG4gICAgICB9XG4gICAgICBpZiAoIXdhdGNoaW5nKSB7XG4gICAgICAgIGZzLndyaXRlRmlsZVN5bmMocGF0aC5qb2luKG91dHB1dCwgJ2J1aWxkLnhtbCcpLCBidWlsZFhNTCh7IGNvbXByZXNzOiB0aGlzLnByb2R1Y3Rpb24gfSksICd1dGY4Jyk7XG4gICAgICAgIGZzLndyaXRlRmlsZVN5bmMocGF0aC5qb2luKG91dHB1dCwgJ2pzZG9tLWVudmlyb25tZW50LmpzJyksIGNyZWF0ZUpTRE9NRW52aXJvbm1lbnQoKSwgJ3V0ZjgnKTtcbiAgICAgICAgZnMud3JpdGVGaWxlU3luYyhwYXRoLmpvaW4ob3V0cHV0LCAnYXBwLmpzb24nKSwgY3JlYXRlQXBwSnNvbih7IHRoZW1lLCBwYWNrYWdlcywgdG9vbGtpdCwgb3ZlcnJpZGVzLCBwYWNrYWdlRGlycyB9KSwgJ3V0ZjgnKTtcbiAgICAgICAgZnMud3JpdGVGaWxlU3luYyhwYXRoLmpvaW4ob3V0cHV0LCAnd29ya3NwYWNlLmpzb24nKSwgY3JlYXRlV29ya3NwYWNlSnNvbihzZGssIHBhY2thZ2VEaXJzLCBvdXRwdXQpLCAndXRmOCcpO1xuICAgICAgfVxuICAgICAgbGV0IGNtZFJlYnVpbGROZWVkZWQgPSBmYWxzZTtcbiAgICAgIGlmICh0aGlzLm1hbmlmZXN0ID09PSBudWxsIHx8IGpzICE9PSB0aGlzLm1hbmlmZXN0KSB7XG4gICAgICAgIC8vIE9ubHkgd3JpdGUgbWFuaWZlc3QgaWYgaXQgZGlmZmVycyBmcm9tIHRoZSBsYXN0IHJ1bi4gIFRoaXMgcHJldmVudHMgdW5uZWNlc3NhcnkgY21kIHJlYnVpbGRzLlxuICAgICAgICB0aGlzLm1hbmlmZXN0ID0ganM7XG4gICAgICAgIC8vcmVhZGxpbmUuY3Vyc29yVG8ocHJvY2Vzcy5zdGRvdXQsIDApO2NvbnNvbGUubG9nKGFwcCArIGpzKVxuICAgICAgICByZWFkbGluZS5jdXJzb3JUbyhwcm9jZXNzLnN0ZG91dCwgMCk7Y29uc29sZS5sb2coYXBwICsgJ3RyZWUgc2hha2luZzogJyArIHRoaXMudHJlZVNoYWtpbmcpXG4gICAgICAgIGZzLndyaXRlRmlsZVN5bmMobWFuaWZlc3QsIGpzLCAndXRmOCcpO1xuICAgICAgICBjbWRSZWJ1aWxkTmVlZGVkID0gdHJ1ZTtcbiAgICAgICAgcmVhZGxpbmUuY3Vyc29yVG8ocHJvY2Vzcy5zdGRvdXQsIDApO2NvbnNvbGUubG9nKGFwcCArIGBidWlsZGluZyBFeHRSZWFjdCBidW5kbGUgYXQ6ICR7b3V0cHV0fWApXG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLndhdGNoKSB7XG4gICAgICAgIGlmICghd2F0Y2hpbmcpIHtcbiAgICAgICAgICB3YXRjaGluZyA9IGdhdGhlckVycm9ycyhmb3JrKHNlbmNoYSwgWydhbnQnLCAnd2F0Y2gnXSwgeyBjd2Q6IG91dHB1dCwgc2lsZW50OiB0cnVlIH0pKTtcbiAgICAgICAgICB3YXRjaGluZy5zdGRlcnIucGlwZShwcm9jZXNzLnN0ZGVycik7XG4gICAgICAgICAgd2F0Y2hpbmcuc3Rkb3V0LnBpcGUocHJvY2Vzcy5zdGRvdXQpO1xuICAgICAgICAgIHdhdGNoaW5nLnN0ZG91dC5vbignZGF0YScsIGRhdGEgPT4ge1xuICAgICAgICAgICAgaWYgKGRhdGEgJiYgZGF0YS50b1N0cmluZygpLm1hdGNoKC9XYWl0aW5nIGZvciBjaGFuZ2VzXFwuXFwuXFwuLykpIHtcbiAgICAgICAgICAgICAgb25CdWlsZERvbmUoKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgICAgd2F0Y2hpbmcub24oJ2V4aXQnLCBvbkJ1aWxkRG9uZSlcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWNtZFJlYnVpbGROZWVkZWQpIHtcbiAgICAgICAgICByZWFkbGluZS5jdXJzb3JUbyhwcm9jZXNzLnN0ZG91dCwgMCk7Y29uc29sZS5sb2coYXBwICsgJ0V4dCByZWJ1aWxkIE5PVCBuZWVkZWQnKVxuICAgICAgICAgIG9uQnVpbGREb25lKClcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAvL3JlYWRsaW5lLmN1cnNvclRvKHByb2Nlc3Muc3Rkb3V0LCAwKTtjb25zb2xlLmxvZyhhcHAgKyAnRXh0IHJlYnVpbGQgSVMgbmVlZGVkJylcbiAgICAgICAgfVxuICAgICAgfSBcbiAgICAgIGVsc2Uge1xuICAgICAgICBjb25zdCBidWlsZCA9IGdhdGhlckVycm9ycyhmb3JrKHNlbmNoYSwgWydhbnQnLCAnYnVpbGQnXSwgeyBzdGRpbzogJ2luaGVyaXQnLCBlbmNvZGluZzogJ3V0Zi04JywgY3dkOiBvdXRwdXQsIHNpbGVudDogZmFsc2UgfSkpO1xuICAgICAgICByZWFkbGluZS5jdXJzb3JUbyhwcm9jZXNzLnN0ZG91dCwgMCk7Y29uc29sZS5sb2coYXBwICsgJ3NlbmNoYSBhbnQgYnVpbGQnKVxuICAgICAgICBpZihidWlsZC5zdGRvdXQpIHsgYnVpbGQuc3Rkb3V0LnBpcGUocHJvY2Vzcy5zdGRvdXQpIH1cbiAgICAgICAgaWYoYnVpbGQuc3RkZXJyKSB7IGJ1aWxkLnN0ZGVyci5waXBlKHByb2Nlc3Muc3RkZXJyKSB9XG4gICAgICAgIGJ1aWxkLm9uKCdleGl0Jywgb25CdWlsZERvbmUpO1xuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICAvKipcbiAgICogRGVmYXVsdCBjb25maWcgb3B0aW9uc1xuICAgKiBAcHJvdGVjdGVkXG4gICAqIEByZXR1cm4ge09iamVjdH1cbiAgICovXG4gIGdldERlZmF1bHRPcHRpb25zKCkge1xuICAgIHJldHVybiB7XG4gICAgICBwb3J0OiA4MDE2LFxuICAgICAgYnVpbGRzOiB7fSxcbiAgICAgIGRlYnVnOiBmYWxzZSxcbiAgICAgIHdhdGNoOiBmYWxzZSxcbiAgICAgIHRlc3Q6IC9cXC4oanx0KXN4PyQvLFxuXG4gICAgICAvKiBiZWdpbiBzaW5nbGUgYnVpbGQgb25seSAqL1xuICAgICAgb3V0cHV0OiAnZXh0LXJlYWN0JyxcbiAgICAgIHRvb2xraXQ6ICdtb2Rlcm4nLFxuICAgICAgcGFja2FnZXM6IG51bGwsXG4gICAgICBwYWNrYWdlRGlyczogW10sXG4gICAgICBvdmVycmlkZXM6IFtdLFxuICAgICAgYXN5bmNocm9ub3VzOiBmYWxzZSxcbiAgICAgIHByb2R1Y3Rpb246IGZhbHNlLFxuICAgICAgbWFuaWZlc3RFeHRyYWN0b3I6IGV4dHJhY3RGcm9tSlNYLFxuICAgICAgdHJlZVNoYWtpbmc6IGZhbHNlXG4gICAgICAvKiBlbmQgc2luZ2xlIGJ1aWxkIG9ubHkgKi9cbiAgICB9XG4gIH1cblxuICBzdWNjZWVkTW9kdWxlKGNvbXBpbGF0aW9uLCBtb2R1bGUpIHtcbiAgICB0aGlzLmN1cnJlbnRGaWxlID0gbW9kdWxlLnJlc291cmNlO1xuICAgIGlmIChtb2R1bGUucmVzb3VyY2UgJiYgbW9kdWxlLnJlc291cmNlLm1hdGNoKHRoaXMudGVzdCkgJiYgIW1vZHVsZS5yZXNvdXJjZS5tYXRjaCgvbm9kZV9tb2R1bGVzLykgJiYgIW1vZHVsZS5yZXNvdXJjZS5tYXRjaChgL2V4dC1yZWFjdCR7cmVhY3RWZXJzaW9ufS9gKSkge1xuICAgICAgY29uc3QgZG9QYXJzZSA9ICgpID0+IHtcbiAgICAgICAgdGhpcy5kZXBlbmRlbmNpZXNbdGhpcy5jdXJyZW50RmlsZV0gPSBbXG4gICAgICAgICAgLi4uKHRoaXMuZGVwZW5kZW5jaWVzW3RoaXMuY3VycmVudEZpbGVdIHx8IFtdKSxcbiAgICAgICAgICAuLi50aGlzLm1hbmlmZXN0RXh0cmFjdG9yKG1vZHVsZS5fc291cmNlLl92YWx1ZSwgY29tcGlsYXRpb24sIG1vZHVsZSwgcmVhY3RWZXJzaW9uKVxuICAgICAgICBdXG4gICAgICB9XG4gICAgICBpZiAodGhpcy5kZWJ1Zykge1xuICAgICAgICBkb1BhcnNlKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0cnkgeyBkb1BhcnNlKCk7IH0gY2F0Y2ggKGUpIFxuICAgICAgICB7IFxuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ1xcbmVycm9yIHBhcnNpbmcgJyArIHRoaXMuY3VycmVudEZpbGUpOyBcbiAgICAgICAgICBjb25zb2xlLmVycm9yKGUpOyBcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVja3MgZWFjaCBidWlsZCBjb25maWcgZm9yIG1pc3NpbmcvaW52YWxpZCBwcm9wZXJ0aWVzXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lIFRoZSBuYW1lIG9mIHRoZSBidWlsZFxuICAgKiBAcGFyYW0ge1N0cmluZ30gYnVpbGQgVGhlIGJ1aWxkIGNvbmZpZ1xuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX3ZhbGlkYXRlQnVpbGRDb25maWcobmFtZSwgYnVpbGQpIHtcbiAgICBsZXQgeyBzZGssIHByb2R1Y3Rpb24gfSA9IGJ1aWxkO1xuXG4gICAgaWYgKHByb2R1Y3Rpb24pIHtcbiAgICAgIGJ1aWxkLnRyZWVTaGFraW5nID0gZmFsc2U7XG4gICAgfVxuICAgIGlmIChzZGspIHtcbiAgICAgIGlmICghZnMuZXhpc3RzU3luYyhzZGspKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBObyBTREsgZm91bmQgYXQgJHtwYXRoLnJlc29sdmUoc2RrKX0uICBEaWQgeW91IGZvciBnZXQgdG8gbGluay9jb3B5IHlvdXIgRXh0IEpTIFNESyB0byB0aGF0IGxvY2F0aW9uP2ApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvL21qZyB0aGlzIG5lZWRlZD8gdGhpcy5fYWRkUmVhY3RvclBhY2thZ2UoYnVpbGQpXG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vYnVpbGQuc2RrID0gcGF0aC5kaXJuYW1lKHJlc29sdmUoJ0BzZW5jaGEvZXh0LW1vZGVybicsIHsgYmFzZWRpcjogcHJvY2Vzcy5jd2QoKSB9KSlcbiAgICAgICAgYnVpbGQuc2RrID0gcGF0aC5kaXJuYW1lKHJlc29sdmUoJ0BzZW5jaGEvZXh0JywgeyBiYXNlZGlyOiBwcm9jZXNzLmN3ZCgpIH0pKVxuICAgICAgICBidWlsZC5wYWNrYWdlRGlycyA9IFsuLi4oYnVpbGQucGFja2FnZURpcnMgfHwgW10pLCBwYXRoLmRpcm5hbWUoYnVpbGQuc2RrKV07XG4gICAgICAgIGJ1aWxkLnBhY2thZ2VzID0gYnVpbGQucGFja2FnZXMgfHwgdGhpcy5fZmluZFBhY2thZ2VzKGJ1aWxkLnNkayk7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vdGhyb3cgbmV3IEVycm9yKGBAc2VuY2hhL2V4dC1tb2Rlcm4gbm90IGZvdW5kLiAgWW91IGNhbiBpbnN0YWxsIGl0IHdpdGggXCJucG0gaW5zdGFsbCAtLXNhdmUgQHNlbmNoYS9leHQtbW9kZXJuXCIgb3IsIGlmIHlvdSBoYXZlIGEgbG9jYWwgY29weSBvZiB0aGUgU0RLLCBzcGVjaWZ5IHRoZSBwYXRoIHRvIGl0IHVzaW5nIHRoZSBcInNka1wiIG9wdGlvbiBpbiBidWlsZCBcIiR7bmFtZX0uXCJgKTtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBAc2VuY2hhL2V4dCBub3QgZm91bmQuICBZb3UgY2FuIGluc3RhbGwgaXQgd2l0aCBcIm5wbSBpbnN0YWxsIC0tc2F2ZSBAc2VuY2hhL2V4dC1tb2Rlcm5cIiBvciwgaWYgeW91IGhhdmUgYSBsb2NhbCBjb3B5IG9mIHRoZSBTREssIHNwZWNpZnkgdGhlIHBhdGggdG8gaXQgdXNpbmcgdGhlIFwic2RrXCIgb3B0aW9uIGluIGJ1aWxkIFwiJHtuYW1lfS5cImApO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vIC8qKlxuICAvLyAgKiBBZGRzIHRoZSByZWFjdG9yIHBhY2thZ2UgaWYgcHJlc2VudCBhbmQgdGhlIHRvb2xraXQgaXMgbW9kZXJuXG4gIC8vICAqIEBwYXJhbSB7T2JqZWN0fSBidWlsZCBcbiAgLy8gICovXG4gIC8vIF9hZGRSZWFjdG9yUGFja2FnZShidWlsZCkge1xuICAvLyAgIGlmIChidWlsZC50b29sa2l0ID09PSAnY2xhc3NpYycpIHJldHVybjtcbiAgLy8gICBpZiAoZnMuZXhpc3RzU3luYyhwYXRoLmpvaW4oYnVpbGQuc2RrLCAnZXh0JywgJ21vZGVybicsICdyZWFjdG9yJykpIHx8ICAvLyByZXBvXG4gIC8vICAgICBmcy5leGlzdHNTeW5jKHBhdGguam9pbihidWlsZC5zZGssICdtb2Rlcm4nLCAncmVhY3RvcicpKSkgeyAvLyBwcm9kdWN0aW9uIGJ1aWxkXG4gIC8vICAgICBpZiAoIWJ1aWxkLnBhY2thZ2VzKSB7XG4gIC8vICAgICAgIGJ1aWxkLnBhY2thZ2VzID0gW107XG4gIC8vICAgICB9XG4gIC8vICAgICBidWlsZC5wYWNrYWdlcy5wdXNoKCdyZWFjdG9yJyk7XG4gIC8vICAgfVxuICAvLyB9XG5cbiAgLyoqXG4gICAqIFJldHVybiB0aGUgbmFtZXMgb2YgYWxsIEV4dFJlYWN0IHBhY2thZ2VzIGluIHRoZSBzYW1lIHBhcmVudCBkaXJlY3RvcnkgYXMgZXh0LXJlYWN0ICh0eXBpY2FsbHkgbm9kZV9tb2R1bGVzL0BleHRqcylcbiAgICogQHByaXZhdGVcbiAgICogQHBhcmFtIHtTdHJpbmd9IHNkayBQYXRoIHRvIGV4dC1yZWFjdFxuICAgKiBAcmV0dXJuIHtTdHJpbmdbXX1cbiAgICovXG4gIF9maW5kUGFja2FnZXMoc2RrKSB7XG4gICAgY29uc3QgbW9kdWxlc0RpciA9IHBhdGguam9pbihzZGssICcuLicpO1xuICAgIHJldHVybiBmcy5yZWFkZGlyU3luYyhtb2R1bGVzRGlyKVxuICAgICAgLy8gRmlsdGVyIG91dCBkaXJlY3RvcmllcyB3aXRob3V0ICdwYWNrYWdlLmpzb24nXG4gICAgICAuZmlsdGVyKGRpciA9PiBmcy5leGlzdHNTeW5jKHBhdGguam9pbihtb2R1bGVzRGlyLCBkaXIsICdwYWNrYWdlLmpzb24nKSkpXG4gICAgICAvLyBHZW5lcmF0ZSBhcnJheSBvZiBwYWNrYWdlIG5hbWVzXG4gICAgICAubWFwKGRpciA9PiB7XG4gICAgICAgICAgY29uc3QgcGFja2FnZUluZm8gPSBKU09OLnBhcnNlKGZzLnJlYWRGaWxlU3luYyhwYXRoLmpvaW4obW9kdWxlc0RpciwgZGlyLCAncGFja2FnZS5qc29uJykpKTtcbiAgICAgICAgICAvLyBEb24ndCBpbmNsdWRlIHRoZW1lIHR5cGUgcGFja2FnZXMuXG4gICAgICAgICAgaWYocGFja2FnZUluZm8uc2VuY2hhICYmIHBhY2thZ2VJbmZvLnNlbmNoYS50eXBlICE9PSAndGhlbWUnKSB7XG4gICAgICAgICAgICAgIHJldHVybiBwYWNrYWdlSW5mby5zZW5jaGEubmFtZTtcbiAgICAgICAgICB9XG4gICAgICB9KVxuICAgICAgLy8gUmVtb3ZlIGFueSB1bmRlZmluZWRzIGZyb20gbWFwXG4gICAgICAuZmlsdGVyKG5hbWUgPT4gbmFtZSk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgcGF0aCB0byB0aGUgc2VuY2hhIGNtZCBleGVjdXRhYmxlXG4gICAqIEBwcml2YXRlXG4gICAqIEByZXR1cm4ge1N0cmluZ31cbiAgICovXG4gIF9nZXRTZW5jaENtZFBhdGgoKSB7XG4gICAgdHJ5IHtcbiAgICAgIC8vIHVzZSBAZXh0anMvc2VuY2hhLWNtZCBmcm9tIG5vZGVfbW9kdWxlc1xuICAgICAgcmV0dXJuIHJlcXVpcmUoJ0BleHRqcy9zZW5jaGEtY21kJyk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgLy8gYXR0ZW1wdCB0byB1c2UgZ2xvYmFsbHkgaW5zdGFsbGVkIFNlbmNoYSBDbWRcbiAgICAgIHJldHVybiAnc2VuY2hhJztcbiAgICB9XG4gIH1cbn1cblxuXG5cblxuXG5cbi8vIGZyb20gdGhpcy5lbWl0XG4gICAgLy8gdGhlIGZvbGxvd2luZyBpcyBuZWVkZWQgZm9yIGh0bWwtd2VicGFjay1wbHVnaW4gdG8gaW5jbHVkZSA8c2NyaXB0PiBhbmQgPGxpbms+IHRhZ3MgZm9yIEV4dFJlYWN0XG4gICAgLy8gY29uc29sZS5sb2coJ2NvbXBpbGF0aW9uJylcbiAgICAvLyBjb25zb2xlLmxvZygnKioqKioqKipjb21waWxhdGlvbi5jaHVua3NbMF0nKVxuICAgIC8vIGNvbnNvbGUubG9nKGNvbXBpbGF0aW9uLmNodW5rc1swXS5pZClcbiAgICAvLyBjb25zb2xlLmxvZyhwYXRoLmpvaW4odGhpcy5vdXRwdXQsICdleHQuanMnKSlcbiAgICAvLyBjb25zdCBqc0NodW5rID0gY29tcGlsYXRpb24uYWRkQ2h1bmsoYCR7dGhpcy5vdXRwdXR9LWpzYCk7XG4gICAgLy8ganNDaHVuay5oYXNSdW50aW1lID0ganNDaHVuay5pc0luaXRpYWwgPSAoKSA9PiB0cnVlO1xuICAgIC8vIGpzQ2h1bmsuZmlsZXMucHVzaChwYXRoLmpvaW4odGhpcy5vdXRwdXQsICdleHQuanMnKSk7XG4gICAgLy8ganNDaHVuay5maWxlcy5wdXNoKHBhdGguam9pbih0aGlzLm91dHB1dCwgJ2V4dC5jc3MnKSk7XG4gICAgLy8ganNDaHVuay5pZCA9ICdhYWFhcCc7IC8vIHRoaXMgZm9yY2VzIGh0bWwtd2VicGFjay1wbHVnaW4gdG8gaW5jbHVkZSBleHQuanMgZmlyc3RcbiAgICAvLyBjb25zb2xlLmxvZygnKioqKioqKipjb21waWxhdGlvbi5jaHVua3NbMV0nKVxuICAgIC8vIGNvbnNvbGUubG9nKGNvbXBpbGF0aW9uLmNodW5rc1sxXS5pZClcblxuICAgIC8vaWYgKHRoaXMuYXN5bmNocm9ub3VzKSBjYWxsYmFjaygpO1xuLy8gICAgY29uc29sZS5sb2coY2FsbGJhY2spXG5cbi8vIGlmIChpc1dlYnBhY2s0KSB7XG4vLyAgIGNvbnNvbGUubG9nKHBhdGguam9pbih0aGlzLm91dHB1dCwgJ2V4dC5qcycpKVxuLy8gICBjb25zdCBzdGF0cyA9IGZzLnN0YXRTeW5jKHBhdGguam9pbihvdXRwdXRQYXRoLCAnZXh0LmpzJykpXG4vLyAgIGNvbnN0IGZpbGVTaXplSW5CeXRlcyA9IHN0YXRzLnNpemVcbi8vICAgY29tcGlsYXRpb24uYXNzZXRzWydleHQuanMnXSA9IHtcbi8vICAgICBzb3VyY2U6IGZ1bmN0aW9uKCkge3JldHVybiBmcy5yZWFkRmlsZVN5bmMocGF0aC5qb2luKG91dHB1dFBhdGgsICdleHQuanMnKSl9LFxuLy8gICAgIHNpemU6IGZ1bmN0aW9uKCkge3JldHVybiBmaWxlU2l6ZUluQnl0ZXN9XG4vLyAgIH1cbi8vICAgY29uc29sZS5sb2coY29tcGlsYXRpb24uZW50cnlwb2ludHMpXG5cbi8vICAgdmFyIGZpbGVsaXN0ID0gJ0luIHRoaXMgYnVpbGQ6XFxuXFxuJztcblxuLy8gICAvLyBMb29wIHRocm91Z2ggYWxsIGNvbXBpbGVkIGFzc2V0cyxcbi8vICAgLy8gYWRkaW5nIGEgbmV3IGxpbmUgaXRlbSBmb3IgZWFjaCBmaWxlbmFtZS5cbi8vICAgZm9yICh2YXIgZmlsZW5hbWUgaW4gY29tcGlsYXRpb24uYXNzZXRzKSB7XG4vLyAgICAgZmlsZWxpc3QgKz0gKCctICcrIGZpbGVuYW1lICsnXFxuJyk7XG4vLyAgIH1cblxuLy8gICAvLyBJbnNlcnQgdGhpcyBsaXN0IGludG8gdGhlIHdlYnBhY2sgYnVpbGQgYXMgYSBuZXcgZmlsZSBhc3NldDpcbi8vICAgY29tcGlsYXRpb24uYXNzZXRzWydmaWxlbGlzdC5tZCddID0ge1xuLy8gICAgIHNvdXJjZSgpIHtcbi8vICAgICAgIHJldHVybiBmaWxlbGlzdDtcbi8vICAgICB9LFxuLy8gICAgIHNpemUoKSB7XG4vLyAgICAgICByZXR1cm4gZmlsZWxpc3QubGVuZ3RoO1xuLy8gICAgIH1cbi8vICAgfVxuLy8gfVxuXG5cbiAgICAvLyBpZiAoY29tcGlsZXIuaG9va3MpIHtcbiAgICAvLyAgICAgLy8gaW4gJ2V4dHJlYWN0LWNvbXBpbGF0aW9uJ1xuICAgIC8vICAgICAvL2h0dHBzOi8vZ2l0aHViLmNvbS9qYWtldHJlbnQvaHRtbC13ZWJwYWNrLXRlbXBsYXRlXG4gICAgLy8gICAgIC8vaHR0cHM6Ly9naXRodWIuY29tL2phbnRpbW9uL2h0bWwtd2VicGFjay1wbHVnaW4jXG4gICAgLy8gICAgIC8vIHRoZSBmb2xsb3dpbmcgaXMgbmVlZGVkIGZvciBodG1sLXdlYnBhY2stcGx1Z2luIHRvIGluY2x1ZGUgPHNjcmlwdD4gYW5kIDxsaW5rPiB0YWdzIGZvciBFeHRSZWFjdFxuICAgIC8vICAgICBjb21waWxlci5ob29rcy5odG1sV2VicGFja1BsdWdpbkJlZm9yZUh0bWxHZW5lcmF0aW9uLnRhcEFzeW5jKFxuICAgIC8vICAgICAgICdleHRyZWFjdC1odG1sZ2VuZXJhdGlvbicsXG4gICAgLy8gICAgICAgKGRhdGEsIGNiKSA9PiB7XG4gICAgLy8gICAgICAgICByZWFkbGluZS5jdXJzb3JUbyhwcm9jZXNzLnN0ZG91dCwgMCk7Y29uc29sZS5sb2coYXBwICsgJ2V4dHJlYWN0LWh0bWxnZW5lcmF0aW9uJylcbiAgICAvLyAgICAgICAgIGNvbnNvbGUubG9nKCdkYXRhLmFzc2V0cy5qcy5sZW5ndGgnKVxuICAgIC8vICAgICAgICAgY29uc29sZS5sb2coZGF0YS5hc3NldHMuanMubGVuZ3RoKVxuICAgIC8vICAgICAgICAgZGF0YS5hc3NldHMuanMudW5zaGlmdCgnZXh0LXJlYWN0L2V4dC5qcycpXG4gICAgLy8gICAgICAgICBkYXRhLmFzc2V0cy5jc3MudW5zaGlmdCgnZXh0LXJlYWN0L2V4dC5jc3MnKVxuICAgIC8vICAgICAgICAgY2IobnVsbCwgZGF0YSlcbiAgICAvLyAgICAgICB9XG4gICAgLy8gICAgIClcbiAgICAvLyAgIH1cblxuIl19