'use strict';

require("@babel/polyfill");

var _chalk = _interopRequireDefault(require("chalk"));

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _mkdirp = require("mkdirp");

var _executeAsync = require("./executeAsync");

var _extractFromJSX = _interopRequireDefault(require("./extractFromJSX"));

var _rimraf = require("rimraf");

var _artifacts = require("./artifacts");

var _astring = require("astring");

var _resolve = require("resolve");

var readline = _interopRequireWildcard(require("readline"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var reactVersion = 0;
var reactVersionFull = '';
let watching = false;
const app = `${_chalk.default.green('ℹ ｢ext｣:')} ext-react-webpack-plugin: `;
module.exports = class ExtReactWebpackPlugin {
  /**
   * @param {Object[]} builds
   * @param {Boolean} [debug=false] Set to true to prevent cleanup of build temporary build artifacts that might be helpful in troubleshooting issues.
   * deprecated @param {String} sdk The full path to the ExtReact SDK
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
  constructor(options) {
    this.firstTime = true;
    this.count = 0; //can be in devdependencies - account for this: react: "15.16.0"

    var pkg = _fs.default.existsSync('package.json') && JSON.parse(_fs.default.readFileSync('package.json', 'utf-8')) || {};
    reactVersionFull = pkg.dependencies.react;
    var is16 = reactVersionFull.includes("16");

    if (is16) {
      reactVersion = 16;
    } else {
      reactVersion = 15;
    }

    this.reactVersion = reactVersion;
    this.reactVersionFull = reactVersionFull;
    const extReactRc = _fs.default.existsSync('.ext-reactrc') && JSON.parse(_fs.default.readFileSync('.ext-reactrc', 'utf-8')) || {};
    options = _objectSpread({}, this.getDefaultOptions(), options, extReactRc);
    const {
      builds
    } = options;

    if (Object.keys(builds).length === 0) {
      const {
        builds
      } = options,
            buildOptions = _objectWithoutProperties(options, ["builds"]);

      builds.ext = buildOptions;
    }

    for (let name in builds) {
      this._validateBuildConfig(name, builds[name]);
    }

    Object.assign(this, _objectSpread({}, options, {
      currentFile: null,
      manifest: null,
      dependencies: []
    }));
  }

  watchRun() {
    this.watch = true;
  }

  apply(compiler) {
    if (this.webpackVersion == undefined) {
      const isWebpack4 = compiler.hooks;

      if (isWebpack4) {
        this.webpackVersion = 'IS webpack 4';
      } else {
        this.webpackVersion = 'NOT webpack 4';
      }

      readline.cursorTo(process.stdout, 0);
      console.log(app + 'reactVersion: ' + this.reactVersionFull + ', ' + this.webpackVersion);
    }

    const me = this;

    if (compiler.hooks) {
      if (this.asynchronous) {
        compiler.hooks.watchRun.tapAsync('ext-react-watch-run (async)', (watching, cb) => {
          readline.cursorTo(process.stdout, 0);
          console.log(app + 'ext-react-watch-run (async)');
          this.watchRun();
          cb();
        });
      } else {
        compiler.hooks.watchRun.tap('ext-react-watch-run', watching => {
          readline.cursorTo(process.stdout, 0);
          console.log(app + 'ext-react-watch-run');
          this.watchRun();
        });
      }
    } else {
      compiler.plugin('watch-run', (watching, cb) => {
        readline.cursorTo(process.stdout, 0);
        console.log(app + 'watch-run');
        this.watchRun();
        cb();
      });
    }
    /**
     * Adds the code for the specified function call to the manifest.js file
     * @param {Object} call A function call AST node.
     */


    const addToManifest = function (call) {
      try {
        const file = this.state.module.resource;
        me.dependencies[file] = [...(me.dependencies[file] || []), (0, _astring.generate)(call)];
      } catch (e) {
        console.error(`Error processing ${file}`);
      }
    };

    if (compiler.hooks) {
      compiler.hooks.compilation.tap('ext-react-compilation', (compilation, data) => {
        readline.cursorTo(process.stdout, 0);
        console.log(app + 'ext-react-compilation');
        compilation.hooks.succeedModule.tap('ext-react-succeed-module', module => {
          this.succeedModule(compilation, module);
        });
        data.normalModuleFactory.plugin("parser", function (parser, options) {
          // extract xtypes and classes from Ext.create calls
          parser.plugin('call Ext.create', addToManifest); // copy Ext.require calls to the manifest.  This allows the users to explicitly require a class if the plugin fails to detect it.

          parser.plugin('call Ext.require', addToManifest); // copy Ext.define calls to the manifest.  This allows users to write standard ExtReact classes.

          parser.plugin('call Ext.define', addToManifest);
        });
        compilation.hooks.htmlWebpackPluginBeforeHtmlGeneration.tapAsync('ext-react-htmlgeneration', (data, cb) => {
          readline.cursorTo(process.stdout, 0);
          console.log(app + 'ext-react-htmlgeneration'); //readline.cursorTo(process.stdout, 0);console.log(app + compilation.outputOptions.publicPath)

          if (compilation.outputOptions.publicPath == undefined) {
            data.assets.js.unshift('ext-react/ext.js');
            data.assets.css.unshift('ext-react/ext.css');
          } else {
            data.assets.js.unshift(_path.default.join(compilation.outputOptions.publicPath, 'ext-react/ext.js'));
            data.assets.css.unshift(_path.default.join(compilation.outputOptions.publicPath, 'ext-react/ext.css'));
          }

          cb(null, data);
        });
      });
    } else {
      compiler.plugin('compilation', (compilation, data) => {
        readline.cursorTo(process.stdout, 0);
        console.log(app + 'compilation');
        compilation.plugin('succeed-module', module => {
          this.succeedModule(compilation, module);
        });
        data.normalModuleFactory.plugin("parser", function (parser, options) {
          // extract xtypes and classes from Ext.create calls
          parser.plugin('call Ext.create', addToManifest); // copy Ext.require calls to the manifest.  This allows the users to explicitly require a class if the plugin fails to detect it.

          parser.plugin('call Ext.require', addToManifest); // copy Ext.define calls to the manifest.  This allows users to write standard ExtReact classes.

          parser.plugin('call Ext.define', addToManifest);
        });
      });
    } //*emit - once all modules are processed, create the optimized ExtReact build.


    if (compiler.hooks) {
      if (true) {
        compiler.hooks.emit.tapAsync('ext-react-emit (async)', (compilation, callback) => {
          readline.cursorTo(process.stdout, 0);
          console.log(app + 'ext-react-emit  (async)');
          this.emit(compiler, compilation, callback);
        });
      } else {
        compiler.hooks.emit.tap('ext-react-emit', compilation => {
          readline.cursorTo(process.stdout, 0);
          console.log(app + 'ext-react-emit');
          this.emit(compiler, compilation);
        });
      }
    } else {
      compiler.plugin('emit', (compilation, callback) => {
        readline.cursorTo(process.stdout, 0);
        console.log(app + 'emit');
        this.emit(compiler, compilation, callback);
      });
    }

    if (compiler.hooks) {
      if (this.asynchronous) {
        compiler.hooks.done.tapAsync('ext-react-done (async)', (compilation, callback) => {
          readline.cursorTo(process.stdout, 0);
          console.log(app + 'ext-react-done (async)');

          if (callback != null) {
            if (this.asynchronous) {
              console.log('calling callback for ext-react-emit  (async)');
              callback();
            }
          }
        });
      } else {
        compiler.hooks.done.tap('ext-react-done', () => {
          readline.cursorTo(process.stdout, 0);
          console.log(app + 'ext-react-done');
        });
      }
    }
  }

  emit(compiler, compilation, callback) {
    var _this = this;

    return _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      var isWebpack4, modules, i, theModule, module, thePath, cache, h, deps, build, outputPath, cmdErrors, promise, url, opn;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            isWebpack4 = compilation.hooks;
            modules = [];

            if (isWebpack4) {
              isWebpack4 = true;
              modules = compilation.chunks.reduce((a, b) => a.concat(b._modules), []); //      console.log(modules)

              i = 0;
              theModule = '';

              for (module of modules) {
                if (i == 0) {
                  //console.log('@@@@@@@@@@@@@@@@@@@@')
                  theModule = module;
                  i++;
                } //const deps = this.dependencies[module.resource]
                //console.log(deps)
                //if (deps) statements = statements.concat(deps);

              }

              thePath = _path.default.join(compiler.outputPath, 'module.txt'); //console.log(thePath)
              //var o = {};
              //o.o = theModule;
              //console.log(theModule[0].context)

              cache = [];
              h = JSON.stringify(theModule, function (key, value) {
                if (typeof value === 'object' && value !== null) {
                  if (cache.indexOf(value) !== -1) {
                    // Circular reference found, discard key
                    return;
                  } // Store value in our collection


                  cache.push(value);
                }

                return value;
              });
              cache = null; // Enable garbage collection
              //fs.writeFileSync( thePath, h, 'utf8')
            } else {
              isWebpack4 = false;
              modules = compilation.chunks.reduce((a, b) => a.concat(b.modules), []);

              for (module of modules) {
                deps = _this.dependencies[module.resource];
                console.log(deps); //if (deps) statements = statements.concat(deps);
              }
            }

            build = _this.builds[Object.keys(_this.builds)[0]];
            outputPath = _path.default.join(compiler.outputPath, _this.output); // webpack-dev-server overwrites the outputPath to "/", so we need to prepend contentBase

            if (compiler.outputPath === '/' && compiler.options.devServer) {
              outputPath = _path.default.join(compiler.options.devServer.contentBase, outputPath);
            }

            cmdErrors = [];
            promise = _this._buildExtBundle(compilation, cmdErrors, outputPath, build);
            _context.next = 10;
            return promise;

          case 10:
            if (_this.watch && _this.count == 0 && cmdErrors.length == 0) {
              url = 'http://localhost:' + _this.port;
              readline.cursorTo(process.stdout, 0);
              console.log(app + 'ext-react-emit - open browser at ' + url);
              _this.count++;
              opn = require('opn');
              opn(url);
            }

            if (callback != null) {
              callback();
            }

          case 12:
          case "end":
            return _context.stop();
        }
      }, _callee, this);
    }))();
  }
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


  _buildExtBundle(compilation, cmdErrors, output, {
    toolkit = 'modern',
    theme,
    packages = [],
    packageDirs = [],
    sdk,
    overrides
  }) {
    let sencha = this._getSenchCmdPath();

    theme = theme || (toolkit === 'classic' ? 'theme-triton' : 'theme-material');
    return new Promise((resolve, reject) => {
      //this.onBuildFail = reject
      //this.onBuildSuccess = resolve
      const onBuildDone = () => {
        if (cmdErrors.length) {
          //this.onBuildFail(new Error(cmdErrors.join("")))
          reject(new Error(cmdErrors.join("")));
        } else {
          //this.onBuildSuccess()
          resolve();
        }
      };

      const userPackages = _path.default.join('.', 'ext-react', 'packages');

      if (_fs.default.existsSync(userPackages)) {
        packageDirs.push(userPackages);
      }

      if (this.firstTime) {
        (0, _rimraf.sync)(output);
        (0, _mkdirp.sync)(output);

        _fs.default.writeFileSync(_path.default.join(output, 'build.xml'), (0, _artifacts.buildXML)({
          compress: this.production
        }), 'utf8');

        _fs.default.writeFileSync(_path.default.join(output, 'app.json'), (0, _artifacts.createAppJson)({
          theme,
          packages,
          toolkit,
          overrides,
          packageDirs
        }), 'utf8');

        _fs.default.writeFileSync(_path.default.join(output, 'workspace.json'), (0, _artifacts.createWorkspaceJson)(sdk, packageDirs, output), 'utf8');
      }

      this.firstTime = false;
      let js;
      js = 'Ext.require("Ext.*")'; // if (this.treeShaking) {
      //   //let statements = ['Ext.require(["Ext.app.Application", "Ext.Component", "Ext.Widget", "Ext.layout.Fit", "Ext.react.Transition", "Ext.react.RendererCell"])']; // for some reason command doesn't load component when only panel is required
      //   let statements = ['Ext.require(["Ext.app.Application", "Ext.Component", "Ext.Widget", "Ext.layout.Fit", "Ext.react.Transition"])']; // for some reason command doesn't load component when only panel is required
      //   // if (packages.indexOf('reacto') !== -1) {
      //   //   statements.push('Ext.require("Ext.react.RendererCell")');
      //   // }
      //   //mjg
      //   for (let module of modules) {
      //     const deps = this.dependencies[module.resource];
      //     if (deps) statements = statements.concat(deps);
      //   }
      //   js = statements.join(';\n');
      // } else {
      //   js = 'Ext.require("Ext.*")';
      // }
      // if (fs.existsSync(path.join(sdk, 'ext'))) {
      //   // local checkout of the SDK repo
      //   packageDirs.push(path.join('ext', 'packages'));
      //   sdk = path.join(sdk, 'ext');
      // }

      var parms = [];

      if (this.watch) {
        parms = ['app', 'watch'];
      } else {
        parms = ['app', 'build'];
      }

      if (this.manifest === null || js !== this.manifest) {
        this.manifest = js; //readline.cursorTo(process.stdout, 0);console.log(app + 'tree shaking: ' + this.treeShaking)

        const manifest = _path.default.join(output, 'manifest.js');

        _fs.default.writeFileSync(manifest, js, 'utf8');

        readline.cursorTo(process.stdout, 0);
        console.log(app + `building ExtReact bundle at: ${output}`);

        if (this.watch && !watching || !this.watch) {
          var options = {
            cwd: output,
            silent: true,
            stdio: 'pipe',
            encoding: 'utf-8'
          };
          (0, _executeAsync.executeAsync)(sencha, parms, options, compilation, cmdErrors).then(function () {
            onBuildDone();
          }, function (reason) {
            resolve(reason);
          });
        }
      } else {
        readline.cursorTo(process.stdout, 0);
        console.log(app + 'Ext rebuild NOT needed');
        onBuildDone();
      } // var parms
      // if (this.watch) {
      //   if (!watching) {
      //     parms = ['app', 'watch']
      //   }
      //   // if (!cmdRebuildNeeded) {
      //   //   readline.cursorTo(process.stdout, 0);console.log(app + 'Ext rebuild NOT needed')
      //   //   onBuildDone()
      //   // }
      // }
      // else {
      //   parms = ['app', 'build']
      // }
      // if (cmdRebuildNeeded) {
      //   var options = { cwd: output, silent: true, stdio: 'pipe', encoding: 'utf-8'}
      //   executeAsync(sencha, parms, options, compilation, cmdErrors).then(function() {
      //     onBuildDone()
      //   }, function(reason){
      //     resolve(reason)
      //   })
      // }

    });
  }
  /**
   * Default config options
   * @protected
   * @return {Object}
   */


  getDefaultOptions() {
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
      manifestExtractor: _extractFromJSX.default,
      treeShaking: false
      /* end single build only */

    };
  }

  succeedModule(compilation, module) {
    this.currentFile = module.resource;

    if (module.resource && module.resource.match(this.test) && !module.resource.match(/node_modules/) && !module.resource.match(`/ext-react${reactVersion}/`)) {
      const doParse = () => {
        this.dependencies[this.currentFile] = [...(this.dependencies[this.currentFile] || []), ...this.manifestExtractor(module._source._value, compilation, module, reactVersion)];
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


  _validateBuildConfig(name, build) {
    let {
      sdk,
      production
    } = build;

    if (production) {
      build.treeShaking = false;
    }

    if (sdk) {
      if (!_fs.default.existsSync(sdk)) {
        throw new Error(`No SDK found at ${_path.default.resolve(sdk)}.  Did you for get to link/copy your Ext JS SDK to that location?`);
      } else {//mjg this needed? this._addExtReactPackage(build)
      }
    } else {
      try {
        //build.sdk = path.dirname(resolve('@sencha/ext-modern', { basedir: process.cwd() }))
        build.sdk = _path.default.dirname((0, _resolve.sync)('@sencha/ext', {
          basedir: process.cwd()
        }));
        build.packageDirs = [...(build.packageDirs || []), _path.default.dirname(build.sdk)];
        build.packages = build.packages || this._findPackages(build.sdk);
      } catch (e) {
        //throw new Error(`@sencha/ext-modern not found.  You can install it with "npm install --save @sencha/ext-modern" or, if you have a local copy of the SDK, specify the path to it using the "sdk" option in build "${name}."`);
        throw new Error(`@sencha/ext not found.  You can install it with "npm install --save @sencha/ext-modern" or, if you have a local copy of the SDK, specify the path to it using the "sdk" option in build "${name}."`);
      }
    }
  } // /**
  //  * Adds the ExtReact package if present and the toolkit is modern
  //  * @param {Object} build 
  //  */
  // _addExtReactPackage(build) {
  //   if (build.toolkit === 'classic') return;
  //   if (fs.existsSync(path.join(build.sdk, 'ext', 'modern', 'react')) ||  // repo
  //     fs.existsSync(path.join(build.sdk, 'modern', 'react'))) { // production build
  //     if (!build.packages) {
  //       build.packages = [];
  //     }
  //     build.packages.push('react');
  //   }
  // }

  /**
   * Return the names of all ExtReact packages in the same parent directory as ext-react (typically node_modules/@sencha)
   * @private
   * @param {String} sdk Path to ext-react
   * @return {String[]}
   */


  _findPackages(sdk) {
    const modulesDir = _path.default.join(sdk, '..');

    return _fs.default.readdirSync(modulesDir) // Filter out directories without 'package.json'
    .filter(dir => _fs.default.existsSync(_path.default.join(modulesDir, dir, 'package.json'))) // Generate array of package names
    .map(dir => {
      const packageInfo = JSON.parse(_fs.default.readFileSync(_path.default.join(modulesDir, dir, 'package.json'))); // Don't include theme type packages.

      if (packageInfo.sencha && packageInfo.sencha.type !== 'theme') {
        return packageInfo.sencha.name;
      }
    }) // Remove any undefineds from map
    .filter(name => name);
  }
  /**
   * Returns the path to the sencha cmd executable
   * @private
   * @return {String}
   */


  _getSenchCmdPath() {
    try {
      return require('@sencha/cmd');
    } catch (e) {
      return 'sencha';
    }
  }

}; // if (this.watch) {
//   if (!watching) {
//     watching = gatherErrors(fork(sencha, ['ant', 'watch'], { cwd: output, silent: true }));
//     watching.stderr.pipe(process.stderr);
//     watching.stdout.pipe(process.stdout);
//     watching.stdout.on('data', data => {
//       if (data && data.toString().match(/Waiting for changes\.\.\./)) {
//         onBuildDone()
//       }
//     })
//     watching.on('exit', onBuildDone)
//   }
//   if (!cmdRebuildNeeded) {
//     readline.cursorTo(process.stdout, 0);console.log(app + 'Ext rebuild NOT needed')
//     onBuildDone()
//   }
//   else {
//     //readline.cursorTo(process.stdout, 0);console.log(app + 'Ext rebuild IS needed')
//   }
// } 
// else {
//   const build = gatherErrors(fork(sencha, ['ant', 'build'], { stdio: 'inherit', encoding: 'utf-8', cwd: output, silent: false }));
//   readline.cursorTo(process.stdout, 0);console.log(app + 'sencha ant build')
//   if(build.stdout) { build.stdout.pipe(process.stdout) }
//   if(build.stderr) { build.stderr.pipe(process.stderr) }
//   build.on('exit', onBuildDone);
// }
// const gatherErrors2 = (cmd) => {
//   if (cmd.stdout) {
//     cmd.stdout.on('data', data => {
//       const message = data.toString();
//       if (message.match(/^\[ERR\]/)) {
//         cmdErrors.push(message.replace(/^\[ERR\] /gi, ''));
//       }
//     })
//   }
//   return cmd;
// }
// function gatherErrors (cmd) {
//   if (cmd.stdout) {
//     cmd.stdout.on('data', data => {
//       const message = data.toString();
//       if (message.match(/^\[ERR\]/)) {
//         cmdErrors.push(message.replace(/^\[ERR\] /gi, ''));
//       }
//     })
//   }
//   return cmd
// }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJyZWFjdFZlcnNpb24iLCJyZWFjdFZlcnNpb25GdWxsIiwid2F0Y2hpbmciLCJhcHAiLCJjaGFsayIsImdyZWVuIiwibW9kdWxlIiwiZXhwb3J0cyIsIkV4dFJlYWN0V2VicGFja1BsdWdpbiIsImNvbnN0cnVjdG9yIiwib3B0aW9ucyIsImZpcnN0VGltZSIsImNvdW50IiwicGtnIiwiZnMiLCJleGlzdHNTeW5jIiwiSlNPTiIsInBhcnNlIiwicmVhZEZpbGVTeW5jIiwiZGVwZW5kZW5jaWVzIiwicmVhY3QiLCJpczE2IiwiaW5jbHVkZXMiLCJleHRSZWFjdFJjIiwiZ2V0RGVmYXVsdE9wdGlvbnMiLCJidWlsZHMiLCJPYmplY3QiLCJrZXlzIiwibGVuZ3RoIiwiYnVpbGRPcHRpb25zIiwiZXh0IiwibmFtZSIsIl92YWxpZGF0ZUJ1aWxkQ29uZmlnIiwiYXNzaWduIiwiY3VycmVudEZpbGUiLCJtYW5pZmVzdCIsIndhdGNoUnVuIiwid2F0Y2giLCJhcHBseSIsImNvbXBpbGVyIiwid2VicGFja1ZlcnNpb24iLCJ1bmRlZmluZWQiLCJpc1dlYnBhY2s0IiwiaG9va3MiLCJyZWFkbGluZSIsImN1cnNvclRvIiwicHJvY2VzcyIsInN0ZG91dCIsImNvbnNvbGUiLCJsb2ciLCJtZSIsImFzeW5jaHJvbm91cyIsInRhcEFzeW5jIiwiY2IiLCJ0YXAiLCJwbHVnaW4iLCJhZGRUb01hbmlmZXN0IiwiY2FsbCIsImZpbGUiLCJzdGF0ZSIsInJlc291cmNlIiwiZSIsImVycm9yIiwiY29tcGlsYXRpb24iLCJkYXRhIiwic3VjY2VlZE1vZHVsZSIsIm5vcm1hbE1vZHVsZUZhY3RvcnkiLCJwYXJzZXIiLCJodG1sV2VicGFja1BsdWdpbkJlZm9yZUh0bWxHZW5lcmF0aW9uIiwib3V0cHV0T3B0aW9ucyIsInB1YmxpY1BhdGgiLCJhc3NldHMiLCJqcyIsInVuc2hpZnQiLCJjc3MiLCJwYXRoIiwiam9pbiIsImVtaXQiLCJjYWxsYmFjayIsImRvbmUiLCJtb2R1bGVzIiwiY2h1bmtzIiwicmVkdWNlIiwiYSIsImIiLCJjb25jYXQiLCJfbW9kdWxlcyIsImkiLCJ0aGVNb2R1bGUiLCJ0aGVQYXRoIiwib3V0cHV0UGF0aCIsImNhY2hlIiwiaCIsInN0cmluZ2lmeSIsImtleSIsInZhbHVlIiwiaW5kZXhPZiIsInB1c2giLCJkZXBzIiwiYnVpbGQiLCJvdXRwdXQiLCJkZXZTZXJ2ZXIiLCJjb250ZW50QmFzZSIsImNtZEVycm9ycyIsInByb21pc2UiLCJfYnVpbGRFeHRCdW5kbGUiLCJ1cmwiLCJwb3J0Iiwib3BuIiwicmVxdWlyZSIsInRvb2xraXQiLCJ0aGVtZSIsInBhY2thZ2VzIiwicGFja2FnZURpcnMiLCJzZGsiLCJvdmVycmlkZXMiLCJzZW5jaGEiLCJfZ2V0U2VuY2hDbWRQYXRoIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJvbkJ1aWxkRG9uZSIsIkVycm9yIiwidXNlclBhY2thZ2VzIiwid3JpdGVGaWxlU3luYyIsImNvbXByZXNzIiwicHJvZHVjdGlvbiIsInBhcm1zIiwiY3dkIiwic2lsZW50Iiwic3RkaW8iLCJlbmNvZGluZyIsInRoZW4iLCJyZWFzb24iLCJkZWJ1ZyIsInRlc3QiLCJtYW5pZmVzdEV4dHJhY3RvciIsImV4dHJhY3RGcm9tSlNYIiwidHJlZVNoYWtpbmciLCJtYXRjaCIsImRvUGFyc2UiLCJfc291cmNlIiwiX3ZhbHVlIiwiZGlybmFtZSIsImJhc2VkaXIiLCJfZmluZFBhY2thZ2VzIiwibW9kdWxlc0RpciIsInJlYWRkaXJTeW5jIiwiZmlsdGVyIiwiZGlyIiwibWFwIiwicGFja2FnZUluZm8iLCJ0eXBlIl0sIm1hcHBpbmdzIjoiQUFBQTs7QUFDQTs7QUFHQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFHQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBZEEsSUFBSUEsWUFBWSxHQUFHLENBQW5CO0FBQ0EsSUFBSUMsZ0JBQWdCLEdB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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDSjtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBR0k7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcbmltcG9ydCAnQGJhYmVsL3BvbHlmaWxsJztcbnZhciByZWFjdFZlcnNpb24gPSAwXG52YXIgcmVhY3RWZXJzaW9uRnVsbCA9ICcnXG5pbXBvcnQgY2hhbGsgZnJvbSAnY2hhbGsnO1xuaW1wb3J0IGZzIGZyb20gJ2ZzJztcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IHsgc3luYyBhcyBta2RpcnAgfSBmcm9tICdta2RpcnAnO1xuaW1wb3J0IHsgZXhlY3V0ZUFzeW5jIH0gZnJvbSAnLi9leGVjdXRlQXN5bmMnXG5pbXBvcnQgZXh0cmFjdEZyb21KU1ggZnJvbSAnLi9leHRyYWN0RnJvbUpTWCc7XG5pbXBvcnQgeyBzeW5jIGFzIHJpbXJhZiB9IGZyb20gJ3JpbXJhZic7XG5pbXBvcnQgeyBidWlsZFhNTCwgY3JlYXRlQXBwSnNvbiwgY3JlYXRlV29ya3NwYWNlSnNvbiB9IGZyb20gJy4vYXJ0aWZhY3RzJztcbmltcG9ydCB7IGdlbmVyYXRlIH0gZnJvbSAnYXN0cmluZyc7XG5pbXBvcnQgeyBzeW5jIGFzIHJlc29sdmUgfSBmcm9tICdyZXNvbHZlJztcbmxldCB3YXRjaGluZyA9IGZhbHNlO1xuY29uc3QgYXBwID0gYCR7Y2hhbGsuZ3JlZW4oJ+KEuSDvvaJleHTvvaM6Jyl9IGV4dC1yZWFjdC13ZWJwYWNrLXBsdWdpbjogYDtcbmltcG9ydCAqIGFzIHJlYWRsaW5lIGZyb20gJ3JlYWRsaW5lJ1xuXG5tb2R1bGUuZXhwb3J0cyA9IGNsYXNzIEV4dFJlYWN0V2VicGFja1BsdWdpbiB7XG4gIC8qKlxuICAgKiBAcGFyYW0ge09iamVjdFtdfSBidWlsZHNcbiAgICogQHBhcmFtIHtCb29sZWFufSBbZGVidWc9ZmFsc2VdIFNldCB0byB0cnVlIHRvIHByZXZlbnQgY2xlYW51cCBvZiBidWlsZCB0ZW1wb3JhcnkgYnVpbGQgYXJ0aWZhY3RzIHRoYXQgbWlnaHQgYmUgaGVscGZ1bCBpbiB0cm91Ymxlc2hvb3RpbmcgaXNzdWVzLlxuICAgKiBkZXByZWNhdGVkIEBwYXJhbSB7U3RyaW5nfSBzZGsgVGhlIGZ1bGwgcGF0aCB0byB0aGUgRXh0UmVhY3QgU0RLXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBbdG9vbGtpdD0nbW9kZXJuJ10gXCJtb2Rlcm5cIiBvciBcImNsYXNzaWNcIlxuICAgKiBAcGFyYW0ge1N0cmluZ30gdGhlbWUgVGhlIG5hbWUgb2YgdGhlIEV4dFJlYWN0IHRoZW1lIHBhY2thZ2UgdG8gdXNlLCBmb3IgZXhhbXBsZSBcInRoZW1lLW1hdGVyaWFsXCJcbiAgICogQHBhcmFtIHtTdHJpbmdbXX0gcGFja2FnZXMgQW4gYXJyYXkgb2YgRXh0UmVhY3QgcGFja2FnZXMgdG8gaW5jbHVkZVxuICAgKiBAcGFyYW0ge1N0cmluZ1tdfSBvdmVycmlkZXMgQW4gYXJyYXkgd2l0aCB0aGUgcGF0aHMgb2YgZGlyZWN0b3JpZXMgb3IgZmlsZXMgdG8gc2VhcmNoLiBBbnkgY2xhc3Nlc1xuICAgKiBkZWNsYXJlZCBpbiB0aGVzZSBsb2NhdGlvbnMgd2lsbCBiZSBhdXRvbWF0aWNhbGx5IHJlcXVpcmVkIGFuZCBpbmNsdWRlZCBpbiB0aGUgYnVpbGQuXG4gICAqIElmIGFueSBmaWxlIGRlZmluZXMgYW4gRXh0UmVhY3Qgb3ZlcnJpZGUgKHVzaW5nIEV4dC5kZWZpbmUgd2l0aCBhbiBcIm92ZXJyaWRlXCIgcHJvcGVydHkpLFxuICAgKiB0aGF0IG92ZXJyaWRlIHdpbGwgaW4gZmFjdCBvbmx5IGJlIGluY2x1ZGVkIGluIHRoZSBidWlsZCBpZiB0aGUgdGFyZ2V0IGNsYXNzIHNwZWNpZmllZFxuICAgKiBpbiB0aGUgXCJvdmVycmlkZVwiIHByb3BlcnR5IGlzIGFsc28gaW5jbHVkZWQuXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBvdXRwdXQgVGhlIHBhdGggdG8gZGlyZWN0b3J5IHdoZXJlIHRoZSBFeHRSZWFjdCBidW5kbGUgc2hvdWxkIGJlIHdyaXR0ZW5cbiAgICogQHBhcmFtIHtCb29sZWFufSBhc3luY2hyb25vdXMgU2V0IHRvIHRydWUgdG8gcnVuIFNlbmNoYSBDbWQgYnVpbGRzIGFzeW5jaHJvbm91c2x5LiBUaGlzIG1ha2VzIHRoZSB3ZWJwYWNrIGJ1aWxkIGZpbmlzaCBtdWNoIGZhc3RlciwgYnV0IHRoZSBhcHAgbWF5IG5vdCBsb2FkIGNvcnJlY3RseSBpbiB5b3VyIGJyb3dzZXIgdW50aWwgU2VuY2hhIENtZCBpcyBmaW5pc2hlZCBidWlsZGluZyB0aGUgRXh0UmVhY3QgYnVuZGxlXG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gcHJvZHVjdGlvbiBTZXQgdG8gdHJ1ZSBmb3IgcHJvZHVjdGlvbiBidWlsZHMuICBUaGlzIHRlbGwgU2VuY2hhIENtZCB0byBjb21wcmVzcyB0aGUgZ2VuZXJhdGVkIEpTIGJ1bmRsZS5cbiAgICogQHBhcmFtIHtCb29sZWFufSB0cmVlU2hha2luZyBTZXQgdG8gZmFsc2UgdG8gZGlzYWJsZSB0cmVlIHNoYWtpbmcgaW4gZGV2ZWxvcG1lbnQgYnVpbGRzLiAgVGhpcyBtYWtlcyBpbmNyZW1lbnRhbCByZWJ1aWxkcyBmYXN0ZXIgYXMgYWxsIEV4dFJlYWN0IGNvbXBvbmVudHMgYXJlIGluY2x1ZGVkIGluIHRoZSBleHQuanMgYnVuZGxlIGluIHRoZSBpbml0aWFsIGJ1aWxkIGFuZCB0aHVzIHRoZSBidW5kbGUgZG9lcyBub3QgbmVlZCB0byBiZSByZWJ1aWx0IGFmdGVyIGVhY2ggY2hhbmdlLiBEZWZhdWx0cyB0byB0cnVlLlxuICAgKi9cbiAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgIHRoaXMuZmlyc3RUaW1lID0gdHJ1ZVxuICAgIHRoaXMuY291bnQgPSAwXG4gICAgLy9jYW4gYmUgaW4gZGV2ZGVwZW5kZW5jaWVzIC0gYWNjb3VudCBmb3IgdGhpczogcmVhY3Q6IFwiMTUuMTYuMFwiXG4gICAgdmFyIHBrZyA9IChmcy5leGlzdHNTeW5jKCdwYWNrYWdlLmpzb24nKSAmJiBKU09OLnBhcnNlKGZzLnJlYWRGaWxlU3luYygncGFja2FnZS5qc29uJywgJ3V0Zi04JykpIHx8IHt9KVxuICAgIHJlYWN0VmVyc2lvbkZ1bGwgPSBwa2cuZGVwZW5kZW5jaWVzLnJlYWN0XG4gICAgdmFyIGlzMTYgPSByZWFjdFZlcnNpb25GdWxsLmluY2x1ZGVzKFwiMTZcIilcbiAgICBpZiAoaXMxNikgeyByZWFjdFZlcnNpb24gPSAxNiB9XG4gICAgZWxzZSB7IHJlYWN0VmVyc2lvbiA9IDE1IH1cbiAgICB0aGlzLnJlYWN0VmVyc2lvbiA9IHJlYWN0VmVyc2lvblxuICAgIHRoaXMucmVhY3RWZXJzaW9uRnVsbCA9IHJlYWN0VmVyc2lvbkZ1bGxcbiAgICBjb25zdCBleHRSZWFjdFJjID0gKGZzLmV4aXN0c1N5bmMoJy5leHQtcmVhY3RyYycpICYmIEpTT04ucGFyc2UoZnMucmVhZEZpbGVTeW5jKCcuZXh0LXJlYWN0cmMnLCAndXRmLTgnKSkgfHwge30pXG4gICAgb3B0aW9ucyA9IHsgLi4udGhpcy5nZXREZWZhdWx0T3B0aW9ucygpLCAuLi5vcHRpb25zLCAuLi5leHRSZWFjdFJjIH1cbiAgICBjb25zdCB7IGJ1aWxkcyB9ID0gb3B0aW9uc1xuICAgIGlmIChPYmplY3Qua2V5cyhidWlsZHMpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgY29uc3QgeyBidWlsZHMsIC4uLmJ1aWxkT3B0aW9ucyB9ID0gb3B0aW9uc1xuICAgICAgYnVpbGRzLmV4dCA9IGJ1aWxkT3B0aW9uc1xuICAgIH1cbiAgICBmb3IgKGxldCBuYW1lIGluIGJ1aWxkcykge1xuICAgICAgdGhpcy5fdmFsaWRhdGVCdWlsZENvbmZpZyhuYW1lLCBidWlsZHNbbmFtZV0pXG4gICAgfVxuICAgIE9iamVjdC5hc3NpZ24odGhpcywge1xuICAgICAgLi4ub3B0aW9ucyxcbiAgICAgIGN1cnJlbnRGaWxlOiBudWxsLFxuICAgICAgbWFuaWZlc3Q6IG51bGwsXG4gICAgICBkZXBlbmRlbmNpZXM6IFtdXG4gICAgfSlcbiAgfVxuXG4gIHdhdGNoUnVuKCkge1xuICAgIHRoaXMud2F0Y2ggPSB0cnVlXG4gIH1cblxuICBhcHBseShjb21waWxlcikge1xuICAgIGlmICh0aGlzLndlYnBhY2tWZXJzaW9uID09IHVuZGVmaW5lZCkge1xuICAgICAgY29uc3QgaXNXZWJwYWNrNCA9IGNvbXBpbGVyLmhvb2tzO1xuICAgICAgaWYgKGlzV2VicGFjazQpIHt0aGlzLndlYnBhY2tWZXJzaW9uID0gJ0lTIHdlYnBhY2sgNCd9XG4gICAgICBlbHNlIHt0aGlzLndlYnBhY2tWZXJzaW9uID0gJ05PVCB3ZWJwYWNrIDQnfVxuICAgICAgcmVhZGxpbmUuY3Vyc29yVG8ocHJvY2Vzcy5zdGRvdXQsIDApO2NvbnNvbGUubG9nKGFwcCArICdyZWFjdFZlcnNpb246ICcgKyB0aGlzLnJlYWN0VmVyc2lvbkZ1bGwgKyAnLCAnICsgdGhpcy53ZWJwYWNrVmVyc2lvbilcbiAgICB9XG4gICAgY29uc3QgbWUgPSB0aGlzXG5cbiAgICBpZiAoY29tcGlsZXIuaG9va3MpIHtcbiAgICAgIGlmICh0aGlzLmFzeW5jaHJvbm91cykge1xuICAgICAgICBjb21waWxlci5ob29rcy53YXRjaFJ1bi50YXBBc3luYygnZXh0LXJlYWN0LXdhdGNoLXJ1biAoYXN5bmMpJywgKHdhdGNoaW5nLCBjYikgPT4ge1xuICAgICAgICAgIHJlYWRsaW5lLmN1cnNvclRvKHByb2Nlc3Muc3Rkb3V0LCAwKTtjb25zb2xlLmxvZyhhcHAgKyAnZXh0LXJlYWN0LXdhdGNoLXJ1biAoYXN5bmMpJylcbiAgICAgICAgICB0aGlzLndhdGNoUnVuKClcbiAgICAgICAgICBjYigpXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgY29tcGlsZXIuaG9va3Mud2F0Y2hSdW4udGFwKCdleHQtcmVhY3Qtd2F0Y2gtcnVuJywgKHdhdGNoaW5nKSA9PiB7XG4gICAgICAgICAgcmVhZGxpbmUuY3Vyc29yVG8ocHJvY2Vzcy5zdGRvdXQsIDApO2NvbnNvbGUubG9nKGFwcCArICdleHQtcmVhY3Qtd2F0Y2gtcnVuJylcbiAgICAgICAgICB0aGlzLndhdGNoUnVuKClcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBjb21waWxlci5wbHVnaW4oJ3dhdGNoLXJ1bicsICh3YXRjaGluZywgY2IpID0+IHtcbiAgICAgICAgcmVhZGxpbmUuY3Vyc29yVG8ocHJvY2Vzcy5zdGRvdXQsIDApO2NvbnNvbGUubG9nKGFwcCArICd3YXRjaC1ydW4nKVxuICAgICAgICB0aGlzLndhdGNoUnVuKClcbiAgICAgICAgY2IoKVxuICAgICAgfSlcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBZGRzIHRoZSBjb2RlIGZvciB0aGUgc3BlY2lmaWVkIGZ1bmN0aW9uIGNhbGwgdG8gdGhlIG1hbmlmZXN0LmpzIGZpbGVcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gY2FsbCBBIGZ1bmN0aW9uIGNhbGwgQVNUIG5vZGUuXG4gICAgICovXG4gICAgY29uc3QgYWRkVG9NYW5pZmVzdCA9IGZ1bmN0aW9uKGNhbGwpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IGZpbGUgPSB0aGlzLnN0YXRlLm1vZHVsZS5yZXNvdXJjZTtcbiAgICAgICAgbWUuZGVwZW5kZW5jaWVzW2ZpbGVdID0gWyAuLi4obWUuZGVwZW5kZW5jaWVzW2ZpbGVdIHx8IFtdKSwgZ2VuZXJhdGUoY2FsbCkgXTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihgRXJyb3IgcHJvY2Vzc2luZyAke2ZpbGV9YCk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGlmIChjb21waWxlci5ob29rcykge1xuICAgICAgY29tcGlsZXIuaG9va3MuY29tcGlsYXRpb24udGFwKCdleHQtcmVhY3QtY29tcGlsYXRpb24nLCAoY29tcGlsYXRpb24sZGF0YSkgPT4ge1xuICAgICAgICByZWFkbGluZS5jdXJzb3JUbyhwcm9jZXNzLnN0ZG91dCwgMCk7Y29uc29sZS5sb2coYXBwICsgJ2V4dC1yZWFjdC1jb21waWxhdGlvbicpXG4gICAgICAgIGNvbXBpbGF0aW9uLmhvb2tzLnN1Y2NlZWRNb2R1bGUudGFwKCdleHQtcmVhY3Qtc3VjY2VlZC1tb2R1bGUnLCAobW9kdWxlKSA9PiB7XG4gICAgICAgICAgdGhpcy5zdWNjZWVkTW9kdWxlKGNvbXBpbGF0aW9uLCBtb2R1bGUpXG4gICAgICAgIH0pXG5cbiAgICAgICAgZGF0YS5ub3JtYWxNb2R1bGVGYWN0b3J5LnBsdWdpbihcInBhcnNlclwiLCBmdW5jdGlvbihwYXJzZXIsIG9wdGlvbnMpIHtcbiAgICAgICAgICAvLyBleHRyYWN0IHh0eXBlcyBhbmQgY2xhc3NlcyBmcm9tIEV4dC5jcmVhdGUgY2FsbHNcbiAgICAgICAgICBwYXJzZXIucGx1Z2luKCdjYWxsIEV4dC5jcmVhdGUnLCBhZGRUb01hbmlmZXN0KTtcbiAgICAgICAgICAvLyBjb3B5IEV4dC5yZXF1aXJlIGNhbGxzIHRvIHRoZSBtYW5pZmVzdC4gIFRoaXMgYWxsb3dzIHRoZSB1c2VycyB0byBleHBsaWNpdGx5IHJlcXVpcmUgYSBjbGFzcyBpZiB0aGUgcGx1Z2luIGZhaWxzIHRvIGRldGVjdCBpdC5cbiAgICAgICAgICBwYXJzZXIucGx1Z2luKCdjYWxsIEV4dC5yZXF1aXJlJywgYWRkVG9NYW5pZmVzdCk7XG4gICAgICAgICAgLy8gY29weSBFeHQuZGVmaW5lIGNhbGxzIHRvIHRoZSBtYW5pZmVzdC4gIFRoaXMgYWxsb3dzIHVzZXJzIHRvIHdyaXRlIHN0YW5kYXJkIEV4dFJlYWN0IGNsYXNzZXMuXG4gICAgICAgICAgcGFyc2VyLnBsdWdpbignY2FsbCBFeHQuZGVmaW5lJywgYWRkVG9NYW5pZmVzdCk7XG4gICAgICAgIH0pXG5cbiAgICAgICAgY29tcGlsYXRpb24uaG9va3MuaHRtbFdlYnBhY2tQbHVnaW5CZWZvcmVIdG1sR2VuZXJhdGlvbi50YXBBc3luYygnZXh0LXJlYWN0LWh0bWxnZW5lcmF0aW9uJywoZGF0YSwgY2IpID0+IHtcblxuICAgICAgICAgIHJlYWRsaW5lLmN1cnNvclRvKHByb2Nlc3Muc3Rkb3V0LCAwKTtjb25zb2xlLmxvZyhhcHAgKyAnZXh0LXJlYWN0LWh0bWxnZW5lcmF0aW9uJylcbiAgICAgICAgICAvL3JlYWRsaW5lLmN1cnNvclRvKHByb2Nlc3Muc3Rkb3V0LCAwKTtjb25zb2xlLmxvZyhhcHAgKyBjb21waWxhdGlvbi5vdXRwdXRPcHRpb25zLnB1YmxpY1BhdGgpXG4gICAgICAgICAgaWYgKGNvbXBpbGF0aW9uLm91dHB1dE9wdGlvbnMucHVibGljUGF0aCA9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGRhdGEuYXNzZXRzLmpzLnVuc2hpZnQoJ2V4dC1yZWFjdC9leHQuanMnKVxuICAgICAgICAgICAgZGF0YS5hc3NldHMuY3NzLnVuc2hpZnQoJ2V4dC1yZWFjdC9leHQuY3NzJylcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBkYXRhLmFzc2V0cy5qcy51bnNoaWZ0KHBhdGguam9pbihjb21waWxhdGlvbi5vdXRwdXRPcHRpb25zLnB1YmxpY1BhdGgsICdleHQtcmVhY3QvZXh0LmpzJykpXG4gICAgICAgICAgICBkYXRhLmFzc2V0cy5jc3MudW5zaGlmdChwYXRoLmpvaW4oY29tcGlsYXRpb24ub3V0cHV0T3B0aW9ucy5wdWJsaWNQYXRoLCAnZXh0LXJlYWN0L2V4dC5jc3MnKSlcbiAgICAgICAgICB9XG4gICAgICAgICAgY2IobnVsbCwgZGF0YSlcbiAgICAgICAgfSlcblxuICAgICAgfSlcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBjb21waWxlci5wbHVnaW4oJ2NvbXBpbGF0aW9uJywgKGNvbXBpbGF0aW9uLCBkYXRhKSA9PiB7XG4gICAgICAgIHJlYWRsaW5lLmN1cnNvclRvKHByb2Nlc3Muc3Rkb3V0LCAwKTtjb25zb2xlLmxvZyhhcHAgKyAnY29tcGlsYXRpb24nKVxuICAgICAgICBjb21waWxhdGlvbi5wbHVnaW4oJ3N1Y2NlZWQtbW9kdWxlJywgKG1vZHVsZSkgPT4ge1xuICAgICAgICAgIHRoaXMuc3VjY2VlZE1vZHVsZShjb21waWxhdGlvbiwgbW9kdWxlKVxuICAgICAgICB9KVxuICAgICAgICBkYXRhLm5vcm1hbE1vZHVsZUZhY3RvcnkucGx1Z2luKFwicGFyc2VyXCIsIGZ1bmN0aW9uKHBhcnNlciwgb3B0aW9ucykge1xuICAgICAgICAgIC8vIGV4dHJhY3QgeHR5cGVzIGFuZCBjbGFzc2VzIGZyb20gRXh0LmNyZWF0ZSBjYWxsc1xuICAgICAgICAgIHBhcnNlci5wbHVnaW4oJ2NhbGwgRXh0LmNyZWF0ZScsIGFkZFRvTWFuaWZlc3QpO1xuICAgICAgICAgIC8vIGNvcHkgRXh0LnJlcXVpcmUgY2FsbHMgdG8gdGhlIG1hbmlmZXN0LiAgVGhpcyBhbGxvd3MgdGhlIHVzZXJzIHRvIGV4cGxpY2l0bHkgcmVxdWlyZSBhIGNsYXNzIGlmIHRoZSBwbHVnaW4gZmFpbHMgdG8gZGV0ZWN0IGl0LlxuICAgICAgICAgIHBhcnNlci5wbHVnaW4oJ2NhbGwgRXh0LnJlcXVpcmUnLCBhZGRUb01hbmlmZXN0KTtcbiAgICAgICAgICAvLyBjb3B5IEV4dC5kZWZpbmUgY2FsbHMgdG8gdGhlIG1hbmlmZXN0LiAgVGhpcyBhbGxvd3MgdXNlcnMgdG8gd3JpdGUgc3RhbmRhcmQgRXh0UmVhY3QgY2xhc3Nlcy5cbiAgICAgICAgICBwYXJzZXIucGx1Z2luKCdjYWxsIEV4dC5kZWZpbmUnLCBhZGRUb01hbmlmZXN0KTtcbiAgICAgICAgfSlcblxuICAgICAgfSlcbiAgICB9XG5cbi8vKmVtaXQgLSBvbmNlIGFsbCBtb2R1bGVzIGFyZSBwcm9jZXNzZWQsIGNyZWF0ZSB0aGUgb3B0aW1pemVkIEV4dFJlYWN0IGJ1aWxkLlxuICAgIGlmIChjb21waWxlci5ob29rcykge1xuICAgICAgaWYgKHRydWUpIHtcbiAgICAgICAgY29tcGlsZXIuaG9va3MuZW1pdC50YXBBc3luYygnZXh0LXJlYWN0LWVtaXQgKGFzeW5jKScsIChjb21waWxhdGlvbiwgY2FsbGJhY2spID0+IHtcbiAgICAgICAgICByZWFkbGluZS5jdXJzb3JUbyhwcm9jZXNzLnN0ZG91dCwgMCk7Y29uc29sZS5sb2coYXBwICsgJ2V4dC1yZWFjdC1lbWl0ICAoYXN5bmMpJylcbiAgICAgICAgICB0aGlzLmVtaXQoY29tcGlsZXIsIGNvbXBpbGF0aW9uLCBjYWxsYmFjaylcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBjb21waWxlci5ob29rcy5lbWl0LnRhcCgnZXh0LXJlYWN0LWVtaXQnLCAoY29tcGlsYXRpb24pID0+IHtcbiAgICAgICAgICByZWFkbGluZS5jdXJzb3JUbyhwcm9jZXNzLnN0ZG91dCwgMCk7Y29uc29sZS5sb2coYXBwICsgJ2V4dC1yZWFjdC1lbWl0JylcbiAgICAgICAgICB0aGlzLmVtaXQoY29tcGlsZXIsIGNvbXBpbGF0aW9uKVxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGNvbXBpbGVyLnBsdWdpbignZW1pdCcsIChjb21waWxhdGlvbiwgY2FsbGJhY2spID0+IHtcbiAgICAgICAgcmVhZGxpbmUuY3Vyc29yVG8ocHJvY2Vzcy5zdGRvdXQsIDApO2NvbnNvbGUubG9nKGFwcCArICdlbWl0JylcbiAgICAgICAgdGhpcy5lbWl0KGNvbXBpbGVyLCBjb21waWxhdGlvbiwgY2FsbGJhY2spXG4gICAgICB9KVxuICAgIH1cblxuICAgIGlmIChjb21waWxlci5ob29rcykge1xuICAgICAgaWYgKHRoaXMuYXN5bmNocm9ub3VzKSB7XG4gICAgICAgIGNvbXBpbGVyLmhvb2tzLmRvbmUudGFwQXN5bmMoJ2V4dC1yZWFjdC1kb25lIChhc3luYyknLCAoY29tcGlsYXRpb24sIGNhbGxiYWNrKSA9PiB7XG4gICAgICAgICAgcmVhZGxpbmUuY3Vyc29yVG8ocHJvY2Vzcy5zdGRvdXQsIDApO2NvbnNvbGUubG9nKGFwcCArICdleHQtcmVhY3QtZG9uZSAoYXN5bmMpJylcbiAgICAgICAgICBpZiAoY2FsbGJhY2sgIT0gbnVsbCkgXG4gICAgICAgICAge1xuICAgICAgICAgICAgaWYgKHRoaXMuYXN5bmNocm9ub3VzKSBcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2NhbGxpbmcgY2FsbGJhY2sgZm9yIGV4dC1yZWFjdC1lbWl0ICAoYXN5bmMpJylcbiAgICAgICAgICAgICAgY2FsbGJhY2soKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBjb21waWxlci5ob29rcy5kb25lLnRhcCgnZXh0LXJlYWN0LWRvbmUnLCAoKSA9PiB7XG4gICAgICAgICAgcmVhZGxpbmUuY3Vyc29yVG8ocHJvY2Vzcy5zdGRvdXQsIDApO2NvbnNvbGUubG9nKGFwcCArICdleHQtcmVhY3QtZG9uZScpXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgZW1pdChjb21waWxlciwgY29tcGlsYXRpb24sIGNhbGxiYWNrKSB7XG4gICAgdmFyIGlzV2VicGFjazQgPSBjb21waWxhdGlvbi5ob29rcztcbiAgICB2YXIgbW9kdWxlcyA9IFtdXG4gICAgaWYgKGlzV2VicGFjazQpIHtcbiAgICAgIGlzV2VicGFjazQgPSB0cnVlXG5cblxuXG5cbiAgICAgIG1vZHVsZXMgPSBjb21waWxhdGlvbi5jaHVua3MucmVkdWNlKChhLCBiKSA9PiBhLmNvbmNhdChiLl9tb2R1bGVzKSwgW10pXG4vLyAgICAgIGNvbnNvbGUubG9nKG1vZHVsZXMpXG5cbiAgICAgIHZhciBpID0gMFxuICAgICAgdmFyIHRoZU1vZHVsZSA9ICcnXG4gICAgICBmb3IgKGxldCBtb2R1bGUgb2YgbW9kdWxlcykge1xuICAgICAgICBpZiAoaSA9PSAwKSB7XG4gICAgICAgICAgLy9jb25zb2xlLmxvZygnQEBAQEBAQEBAQEBAQEBAQEBAQEAnKVxuICAgICAgICAgIHRoZU1vZHVsZSA9IG1vZHVsZVxuICAgICAgICAgIGkrK1xuICAgICAgICB9XG4vL2NvbnN0IGRlcHMgPSB0aGlzLmRlcGVuZGVuY2llc1ttb2R1bGUucmVzb3VyY2VdXG4gICAgICAgIC8vY29uc29sZS5sb2coZGVwcylcbiAgICAgICAgLy9pZiAoZGVwcykgc3RhdGVtZW50cyA9IHN0YXRlbWVudHMuY29uY2F0KGRlcHMpO1xuICAgICAgfVxuICAgICAgdmFyIHRoZVBhdGggPSBwYXRoLmpvaW4oY29tcGlsZXIub3V0cHV0UGF0aCwgJ21vZHVsZS50eHQnKVxuICAgICAgLy9jb25zb2xlLmxvZyh0aGVQYXRoKVxuXG4gICAgICAvL3ZhciBvID0ge307XG4gICAgICAvL28ubyA9IHRoZU1vZHVsZTtcbiAgICAgIC8vY29uc29sZS5sb2codGhlTW9kdWxlWzBdLmNvbnRleHQpXG4gICAgICBcbiAgICAgIHZhciBjYWNoZSA9IFtdO1xuICAgICAgdmFyIGggPSBKU09OLnN0cmluZ2lmeSh0aGVNb2R1bGUsIGZ1bmN0aW9uKGtleSwgdmFsdWUpIHtcbiAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICBpZiAoY2FjaGUuaW5kZXhPZih2YWx1ZSkgIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAvLyBDaXJjdWxhciByZWZlcmVuY2UgZm91bmQsIGRpc2NhcmQga2V5XG4gICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgLy8gU3RvcmUgdmFsdWUgaW4gb3VyIGNvbGxlY3Rpb25cbiAgICAgICAgICAgICAgY2FjaGUucHVzaCh2YWx1ZSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgIH0pO1xuICAgICAgY2FjaGUgPSBudWxsOyAvLyBFbmFibGUgZ2FyYmFnZSBjb2xsZWN0aW9uXG4gICAgICAvL2ZzLndyaXRlRmlsZVN5bmMoIHRoZVBhdGgsIGgsICd1dGY4JylcblxuXG5cblxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGlzV2VicGFjazQgPSBmYWxzZVxuXG5cblxuICAgICAgbW9kdWxlcyA9IGNvbXBpbGF0aW9uLmNodW5rcy5yZWR1Y2UoKGEsIGIpID0+IGEuY29uY2F0KGIubW9kdWxlcyksIFtdKVxuXG4gICAgICBmb3IgKGxldCBtb2R1bGUgb2YgbW9kdWxlcykge1xuICAgICAgICBjb25zdCBkZXBzID0gdGhpcy5kZXBlbmRlbmNpZXNbbW9kdWxlLnJlc291cmNlXVxuICAgICAgICBjb25zb2xlLmxvZyhkZXBzKVxuICAgICAgICAvL2lmIChkZXBzKSBzdGF0ZW1lbnRzID0gc3RhdGVtZW50cy5jb25jYXQoZGVwcyk7XG4gICAgICB9XG5cblxuXG5cbiAgICB9XG4gICAgY29uc3QgYnVpbGQgPSB0aGlzLmJ1aWxkc1tPYmplY3Qua2V5cyh0aGlzLmJ1aWxkcylbMF1dO1xuICAgIGxldCBvdXRwdXRQYXRoID0gcGF0aC5qb2luKGNvbXBpbGVyLm91dHB1dFBhdGgsIHRoaXMub3V0cHV0KTtcbiAgICAvLyB3ZWJwYWNrLWRldi1zZXJ2ZXIgb3ZlcndyaXRlcyB0aGUgb3V0cHV0UGF0aCB0byBcIi9cIiwgc28gd2UgbmVlZCB0byBwcmVwZW5kIGNvbnRlbnRCYXNlXG4gICAgaWYgKGNvbXBpbGVyLm91dHB1dFBhdGggPT09ICcvJyAmJiBjb21waWxlci5vcHRpb25zLmRldlNlcnZlcikge1xuICAgICAgb3V0cHV0UGF0aCA9IHBhdGguam9pbihjb21waWxlci5vcHRpb25zLmRldlNlcnZlci5jb250ZW50QmFzZSwgb3V0cHV0UGF0aCk7XG4gICAgfVxuICAgIHZhciBjbWRFcnJvcnMgPSBbXVxuXG4gICAgbGV0IHByb21pc2UgPSB0aGlzLl9idWlsZEV4dEJ1bmRsZShjb21waWxhdGlvbiwgY21kRXJyb3JzLCBvdXRwdXRQYXRoLCBidWlsZClcblxuICAgIGF3YWl0IHByb21pc2VcbiBcbiAgICBpZiAodGhpcy53YXRjaCAmJiB0aGlzLmNvdW50ID09IDAgJiYgY21kRXJyb3JzLmxlbmd0aCA9PSAwKSB7XG4gICAgICB2YXIgdXJsID0gJ2h0dHA6Ly9sb2NhbGhvc3Q6JyArIHRoaXMucG9ydFxuICAgICAgcmVhZGxpbmUuY3Vyc29yVG8ocHJvY2Vzcy5zdGRvdXQsIDApO2NvbnNvbGUubG9nKGFwcCArICdleHQtcmVhY3QtZW1pdCAtIG9wZW4gYnJvd3NlciBhdCAnICsgdXJsKVxuICAgICAgdGhpcy5jb3VudCsrXG4gICAgICBjb25zdCBvcG4gPSByZXF1aXJlKCdvcG4nKVxuICAgICAgb3BuKHVybClcbiAgICB9XG4gICAgaWYgKGNhbGxiYWNrICE9IG51bGwpeyBjYWxsYmFjaygpIH1cbiAgfVxuXG4gIC8qKlxuICAgLyoqXG4gICAgKiBCdWlsZHMgYSBtaW5pbWFsIHZlcnNpb24gb2YgdGhlIEV4dFJlYWN0IGZyYW1ld29yayBiYXNlZCBvbiB0aGUgY2xhc3NlcyB1c2VkXG4gICAgKiBAcGFyYW0ge1N0cmluZ30gbmFtZSBUaGUgbmFtZSBvZiB0aGUgYnVpbGRcbiAgICAqIEBwYXJhbSB7TW9kdWxlW119IG1vZHVsZXMgd2VicGFjayBtb2R1bGVzXG4gICAgKiBAcGFyYW0ge1N0cmluZ30gb3V0cHV0IFRoZSBwYXRoIHRvIHdoZXJlIHRoZSBmcmFtZXdvcmsgYnVpbGQgc2hvdWxkIGJlIHdyaXR0ZW5cbiAgICAqIEBwYXJhbSB7U3RyaW5nfSBbdG9vbGtpdD0nbW9kZXJuJ10gXCJtb2Rlcm5cIiBvciBcImNsYXNzaWNcIlxuICAgICogQHBhcmFtIHtTdHJpbmd9IG91dHB1dCBUaGUgcGF0aCB0byB0aGUgZGlyZWN0b3J5IHRvIGNyZWF0ZSB3aGljaCB3aWxsIGNvbnRhaW4gdGhlIGpzIGFuZCBjc3MgYnVuZGxlc1xuICAgICogQHBhcmFtIHtTdHJpbmd9IHRoZW1lIFRoZSBuYW1lIG9mIHRoZSBFeHRSZWFjdCB0aGVtZSBwYWNrYWdlIHRvIHVzZSwgZm9yIGV4YW1wbGUgXCJ0aGVtZS1tYXRlcmlhbFwiXG4gICAgKiBAcGFyYW0ge1N0cmluZ1tdfSBwYWNrYWdlcyBBbiBhcnJheSBvZiBFeHRSZWFjdCBwYWNrYWdlcyB0byBpbmNsdWRlXG4gICAgKiBAcGFyYW0ge1N0cmluZ1tdfSBwYWNrYWdlRGlycyBEaXJlY3RvcmllcyBjb250YWluaW5nIHBhY2thZ2VzXG4gICAgKiBAcGFyYW0ge1N0cmluZ1tdfSBvdmVycmlkZXMgQW4gYXJyYXkgb2YgbG9jYXRpb25zIGZvciBvdmVycmlkZXNcbiAgICAqIEBwYXJhbSB7U3RyaW5nfSBzZGsgVGhlIGZ1bGwgcGF0aCB0byB0aGUgRXh0UmVhY3QgU0RLXG4gICAgKiBAcHJpdmF0ZVxuICAgICovXG4gIF9idWlsZEV4dEJ1bmRsZShjb21waWxhdGlvbiwgY21kRXJyb3JzLCBvdXRwdXQsIHsgdG9vbGtpdD0nbW9kZXJuJywgdGhlbWUsIHBhY2thZ2VzPVtdLCBwYWNrYWdlRGlycz1bXSwgc2RrLCBvdmVycmlkZXN9KSB7XG4gICAgbGV0IHNlbmNoYSA9IHRoaXMuX2dldFNlbmNoQ21kUGF0aCgpXG4gICAgdGhlbWUgPSB0aGVtZSB8fCAodG9vbGtpdCA9PT0gJ2NsYXNzaWMnID8gJ3RoZW1lLXRyaXRvbicgOiAndGhlbWUtbWF0ZXJpYWwnKVxuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIC8vdGhpcy5vbkJ1aWxkRmFpbCA9IHJlamVjdFxuICAgICAgLy90aGlzLm9uQnVpbGRTdWNjZXNzID0gcmVzb2x2ZVxuICAgICAgY29uc3Qgb25CdWlsZERvbmUgPSAoKSA9PiB7XG4gICAgICAgIGlmIChjbWRFcnJvcnMubGVuZ3RoKSB7XG4gICAgICAgICAgLy90aGlzLm9uQnVpbGRGYWlsKG5ldyBFcnJvcihjbWRFcnJvcnMuam9pbihcIlwiKSkpXG4gICAgICAgICAgcmVqZWN0KG5ldyBFcnJvcihjbWRFcnJvcnMuam9pbihcIlwiKSkpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy90aGlzLm9uQnVpbGRTdWNjZXNzKClcbiAgICAgICAgICByZXNvbHZlKClcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBjb25zdCB1c2VyUGFja2FnZXMgPSBwYXRoLmpvaW4oJy4nLCAnZXh0LXJlYWN0JywgJ3BhY2thZ2VzJylcbiAgICAgIGlmIChmcy5leGlzdHNTeW5jKHVzZXJQYWNrYWdlcykpIHtcbiAgICAgICAgcGFja2FnZURpcnMucHVzaCh1c2VyUGFja2FnZXMpXG4gICAgICB9XG5cblxuICAgICAgaWYgKHRoaXMuZmlyc3RUaW1lKSB7XG4gICAgICAgIHJpbXJhZihvdXRwdXQpXG4gICAgICAgIG1rZGlycChvdXRwdXQpXG4gICAgICAgIGZzLndyaXRlRmlsZVN5bmMocGF0aC5qb2luKG91dHB1dCwgJ2J1aWxkLnhtbCcpLCBidWlsZFhNTCh7IGNvbXByZXNzOiB0aGlzLnByb2R1Y3Rpb24gfSksICd1dGY4JylcbiAgICAgICAgZnMud3JpdGVGaWxlU3luYyhwYXRoLmpvaW4ob3V0cHV0LCAnYXBwLmpzb24nKSwgY3JlYXRlQXBwSnNvbih7IHRoZW1lLCBwYWNrYWdlcywgdG9vbGtpdCwgb3ZlcnJpZGVzLCBwYWNrYWdlRGlycyB9KSwgJ3V0ZjgnKVxuICAgICAgICBmcy53cml0ZUZpbGVTeW5jKHBhdGguam9pbihvdXRwdXQsICd3b3Jrc3BhY2UuanNvbicpLCBjcmVhdGVXb3Jrc3BhY2VKc29uKHNkaywgcGFja2FnZURpcnMsIG91dHB1dCksICd1dGY4JylcbiAgICAgIH1cbiAgICAgIHRoaXMuZmlyc3RUaW1lID0gZmFsc2VcblxuICAgICAgbGV0IGpzXG4gICAgICBqcyA9ICdFeHQucmVxdWlyZShcIkV4dC4qXCIpJ1xuXG4gICAgICAvLyBpZiAodGhpcy50cmVlU2hha2luZykge1xuICAgICAgLy8gICAvL2xldCBzdGF0ZW1lbnRzID0gWydFeHQucmVxdWlyZShbXCJFeHQuYXBwLkFwcGxpY2F0aW9uXCIsIFwiRXh0LkNvbXBvbmVudFwiLCBcIkV4dC5XaWRnZXRcIiwgXCJFeHQubGF5b3V0LkZpdFwiLCBcIkV4dC5yZWFjdC5UcmFuc2l0aW9uXCIsIFwiRXh0LnJlYWN0LlJlbmRlcmVyQ2VsbFwiXSknXTsgLy8gZm9yIHNvbWUgcmVhc29uIGNvbW1hbmQgZG9lc24ndCBsb2FkIGNvbXBvbmVudCB3aGVuIG9ubHkgcGFuZWwgaXMgcmVxdWlyZWRcbiAgICAgIC8vICAgbGV0IHN0YXRlbWVudHMgPSBbJ0V4dC5yZXF1aXJlKFtcIkV4dC5hcHAuQXBwbGljYXRpb25cIiwgXCJFeHQuQ29tcG9uZW50XCIsIFwiRXh0LldpZGdldFwiLCBcIkV4dC5sYXlvdXQuRml0XCIsIFwiRXh0LnJlYWN0LlRyYW5zaXRpb25cIl0pJ107IC8vIGZvciBzb21lIHJlYXNvbiBjb21tYW5kIGRvZXNuJ3QgbG9hZCBjb21wb25lbnQgd2hlbiBvbmx5IHBhbmVsIGlzIHJlcXVpcmVkXG4gICAgICAvLyAgIC8vIGlmIChwYWNrYWdlcy5pbmRleE9mKCdyZWFjdG8nKSAhPT0gLTEpIHtcbiAgICAgIC8vICAgLy8gICBzdGF0ZW1lbnRzLnB1c2goJ0V4dC5yZXF1aXJlKFwiRXh0LnJlYWN0LlJlbmRlcmVyQ2VsbFwiKScpO1xuICAgICAgLy8gICAvLyB9XG4gICAgICAvLyAgIC8vbWpnXG4gICAgICAvLyAgIGZvciAobGV0IG1vZHVsZSBvZiBtb2R1bGVzKSB7XG4gICAgICAvLyAgICAgY29uc3QgZGVwcyA9IHRoaXMuZGVwZW5kZW5jaWVzW21vZHVsZS5yZXNvdXJjZV07XG4gICAgICAvLyAgICAgaWYgKGRlcHMpIHN0YXRlbWVudHMgPSBzdGF0ZW1lbnRzLmNvbmNhdChkZXBzKTtcbiAgICAgIC8vICAgfVxuICAgICAgLy8gICBqcyA9IHN0YXRlbWVudHMuam9pbignO1xcbicpO1xuICAgICAgLy8gfSBlbHNlIHtcbiAgICAgIC8vICAganMgPSAnRXh0LnJlcXVpcmUoXCJFeHQuKlwiKSc7XG4gICAgICAvLyB9XG5cblxuXG4gICAgICAvLyBpZiAoZnMuZXhpc3RzU3luYyhwYXRoLmpvaW4oc2RrLCAnZXh0JykpKSB7XG4gICAgICAvLyAgIC8vIGxvY2FsIGNoZWNrb3V0IG9mIHRoZSBTREsgcmVwb1xuICAgICAgLy8gICBwYWNrYWdlRGlycy5wdXNoKHBhdGguam9pbignZXh0JywgJ3BhY2thZ2VzJykpO1xuICAgICAgLy8gICBzZGsgPSBwYXRoLmpvaW4oc2RrLCAnZXh0Jyk7XG4gICAgICAvLyB9XG5cblxuXG4gICAgICB2YXIgcGFybXMgPSBbXVxuICAgICAgaWYgKHRoaXMud2F0Y2gpIHsgcGFybXMgPSBbJ2FwcCcsICd3YXRjaCddIH1cbiAgICAgIGVsc2UgeyBwYXJtcyA9IFsnYXBwJywgJ2J1aWxkJ10gfVxuXG4gICAgICBpZiAodGhpcy5tYW5pZmVzdCA9PT0gbnVsbCB8fCBqcyAhPT0gdGhpcy5tYW5pZmVzdCkge1xuICAgICAgICB0aGlzLm1hbmlmZXN0ID0ganNcbiAgICAgICAgLy9yZWFkbGluZS5jdXJzb3JUbyhwcm9jZXNzLnN0ZG91dCwgMCk7Y29uc29sZS5sb2coYXBwICsgJ3RyZWUgc2hha2luZzogJyArIHRoaXMudHJlZVNoYWtpbmcpXG4gICAgICAgIGNvbnN0IG1hbmlmZXN0ID0gcGF0aC5qb2luKG91dHB1dCwgJ21hbmlmZXN0LmpzJylcbiAgICAgICAgZnMud3JpdGVGaWxlU3luYyhtYW5pZmVzdCwganMsICd1dGY4JylcbiAgICAgICAgcmVhZGxpbmUuY3Vyc29yVG8ocHJvY2Vzcy5zdGRvdXQsIDApO2NvbnNvbGUubG9nKGFwcCArIGBidWlsZGluZyBFeHRSZWFjdCBidW5kbGUgYXQ6ICR7b3V0cHV0fWApXG5cbiAgICAgICAgaWYgKHRoaXMud2F0Y2ggJiYgIXdhdGNoaW5nIHx8ICF0aGlzLndhdGNoKSB7XG4gICAgICAgICAgdmFyIG9wdGlvbnMgPSB7IGN3ZDogb3V0cHV0LCBzaWxlbnQ6IHRydWUsIHN0ZGlvOiAncGlwZScsIGVuY29kaW5nOiAndXRmLTgnfVxuICAgICAgICAgIGV4ZWN1dGVBc3luYyhzZW5jaGEsIHBhcm1zLCBvcHRpb25zLCBjb21waWxhdGlvbiwgY21kRXJyb3JzKS50aGVuIChcbiAgICAgICAgICAgIGZ1bmN0aW9uKCkgeyBvbkJ1aWxkRG9uZSgpIH0sIFxuICAgICAgICAgICAgZnVuY3Rpb24ocmVhc29uKSB7IHJlc29sdmUocmVhc29uKSB9XG4gICAgICAgICAgKVxuICAgICAgICB9XG5cbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICByZWFkbGluZS5jdXJzb3JUbyhwcm9jZXNzLnN0ZG91dCwgMCk7Y29uc29sZS5sb2coYXBwICsgJ0V4dCByZWJ1aWxkIE5PVCBuZWVkZWQnKVxuICAgICAgICBvbkJ1aWxkRG9uZSgpXG4gICAgICB9XG5cbiAgICAgIC8vIHZhciBwYXJtc1xuICAgICAgLy8gaWYgKHRoaXMud2F0Y2gpIHtcbiAgICAgIC8vICAgaWYgKCF3YXRjaGluZykge1xuICAgICAgLy8gICAgIHBhcm1zID0gWydhcHAnLCAnd2F0Y2gnXVxuICAgICAgLy8gICB9XG4gICAgICAvLyAgIC8vIGlmICghY21kUmVidWlsZE5lZWRlZCkge1xuICAgICAgLy8gICAvLyAgIHJlYWRsaW5lLmN1cnNvclRvKHByb2Nlc3Muc3Rkb3V0LCAwKTtjb25zb2xlLmxvZyhhcHAgKyAnRXh0IHJlYnVpbGQgTk9UIG5lZWRlZCcpXG4gICAgICAvLyAgIC8vICAgb25CdWlsZERvbmUoKVxuICAgICAgLy8gICAvLyB9XG4gICAgICAvLyB9XG4gICAgICAvLyBlbHNlIHtcbiAgICAgIC8vICAgcGFybXMgPSBbJ2FwcCcsICdidWlsZCddXG4gICAgICAvLyB9XG4gICAgICAvLyBpZiAoY21kUmVidWlsZE5lZWRlZCkge1xuICAgICAgLy8gICB2YXIgb3B0aW9ucyA9IHsgY3dkOiBvdXRwdXQsIHNpbGVudDogdHJ1ZSwgc3RkaW86ICdwaXBlJywgZW5jb2Rpbmc6ICd1dGYtOCd9XG4gICAgICAvLyAgIGV4ZWN1dGVBc3luYyhzZW5jaGEsIHBhcm1zLCBvcHRpb25zLCBjb21waWxhdGlvbiwgY21kRXJyb3JzKS50aGVuKGZ1bmN0aW9uKCkge1xuICAgICAgLy8gICAgIG9uQnVpbGREb25lKClcbiAgICAgIC8vICAgfSwgZnVuY3Rpb24ocmVhc29uKXtcbiAgICAgIC8vICAgICByZXNvbHZlKHJlYXNvbilcbiAgICAgIC8vICAgfSlcbiAgICAgIC8vIH1cblxuXG4gICAgfSlcbiAgfVxuXG4gIC8qKlxuICAgKiBEZWZhdWx0IGNvbmZpZyBvcHRpb25zXG4gICAqIEBwcm90ZWN0ZWRcbiAgICogQHJldHVybiB7T2JqZWN0fVxuICAgKi9cbiAgZ2V0RGVmYXVsdE9wdGlvbnMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHBvcnQ6IDgwMTYsXG4gICAgICBidWlsZHM6IHt9LFxuICAgICAgZGVidWc6IGZhbHNlLFxuICAgICAgd2F0Y2g6IGZhbHNlLFxuICAgICAgdGVzdDogL1xcLihqfHQpc3g/JC8sXG5cbiAgICAgIC8qIGJlZ2luIHNpbmdsZSBidWlsZCBvbmx5ICovXG4gICAgICBvdXRwdXQ6ICdleHQtcmVhY3QnLFxuICAgICAgdG9vbGtpdDogJ21vZGVybicsXG4gICAgICBwYWNrYWdlczogbnVsbCxcbiAgICAgIHBhY2thZ2VEaXJzOiBbXSxcbiAgICAgIG92ZXJyaWRlczogW10sXG4gICAgICBhc3luY2hyb25vdXM6IGZhbHNlLFxuICAgICAgcHJvZHVjdGlvbjogZmFsc2UsXG4gICAgICBtYW5pZmVzdEV4dHJhY3RvcjogZXh0cmFjdEZyb21KU1gsXG4gICAgICB0cmVlU2hha2luZzogZmFsc2VcbiAgICAgIC8qIGVuZCBzaW5nbGUgYnVpbGQgb25seSAqL1xuICAgIH1cbiAgfVxuXG4gIHN1Y2NlZWRNb2R1bGUoY29tcGlsYXRpb24sIG1vZHVsZSkge1xuICAgIHRoaXMuY3VycmVudEZpbGUgPSBtb2R1bGUucmVzb3VyY2U7XG4gICAgaWYgKG1vZHVsZS5yZXNvdXJjZSAmJiBtb2R1bGUucmVzb3VyY2UubWF0Y2godGhpcy50ZXN0KSAmJiAhbW9kdWxlLnJlc291cmNlLm1hdGNoKC9ub2RlX21vZHVsZXMvKSAmJiAhbW9kdWxlLnJlc291cmNlLm1hdGNoKGAvZXh0LXJlYWN0JHtyZWFjdFZlcnNpb259L2ApKSB7XG4gICAgICBjb25zdCBkb1BhcnNlID0gKCkgPT4ge1xuICAgICAgICB0aGlzLmRlcGVuZGVuY2llc1t0aGlzLmN1cnJlbnRGaWxlXSA9IFtcbiAgICAgICAgICAuLi4odGhpcy5kZXBlbmRlbmNpZXNbdGhpcy5jdXJyZW50RmlsZV0gfHwgW10pLFxuICAgICAgICAgIC4uLnRoaXMubWFuaWZlc3RFeHRyYWN0b3IobW9kdWxlLl9zb3VyY2UuX3ZhbHVlLCBjb21waWxhdGlvbiwgbW9kdWxlLCByZWFjdFZlcnNpb24pXG4gICAgICAgIF1cbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLmRlYnVnKSB7XG4gICAgICAgIGRvUGFyc2UoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRyeSB7IGRvUGFyc2UoKTsgfSBjYXRjaCAoZSkgXG4gICAgICAgIHsgXG4gICAgICAgICAgY29uc29sZS5lcnJvcignXFxuZXJyb3IgcGFyc2luZyAnICsgdGhpcy5jdXJyZW50RmlsZSk7IFxuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZSk7IFxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrcyBlYWNoIGJ1aWxkIGNvbmZpZyBmb3IgbWlzc2luZy9pbnZhbGlkIHByb3BlcnRpZXNcbiAgICogQHBhcmFtIHtTdHJpbmd9IG5hbWUgVGhlIG5hbWUgb2YgdGhlIGJ1aWxkXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBidWlsZCBUaGUgYnVpbGQgY29uZmlnXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfdmFsaWRhdGVCdWlsZENvbmZpZyhuYW1lLCBidWlsZCkge1xuICAgIGxldCB7IHNkaywgcHJvZHVjdGlvbiB9ID0gYnVpbGQ7XG5cbiAgICBpZiAocHJvZHVjdGlvbikge1xuICAgICAgYnVpbGQudHJlZVNoYWtpbmcgPSBmYWxzZTtcbiAgICB9XG4gICAgaWYgKHNkaykge1xuICAgICAgaWYgKCFmcy5leGlzdHNTeW5jKHNkaykpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYE5vIFNESyBmb3VuZCBhdCAke3BhdGgucmVzb2x2ZShzZGspfS4gIERpZCB5b3UgZm9yIGdldCB0byBsaW5rL2NvcHkgeW91ciBFeHQgSlMgU0RLIHRvIHRoYXQgbG9jYXRpb24/YCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vbWpnIHRoaXMgbmVlZGVkPyB0aGlzLl9hZGRFeHRSZWFjdFBhY2thZ2UoYnVpbGQpXG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vYnVpbGQuc2RrID0gcGF0aC5kaXJuYW1lKHJlc29sdmUoJ0BzZW5jaGEvZXh0LW1vZGVybicsIHsgYmFzZWRpcjogcHJvY2Vzcy5jd2QoKSB9KSlcbiAgICAgICAgYnVpbGQuc2RrID0gcGF0aC5kaXJuYW1lKHJlc29sdmUoJ0BzZW5jaGEvZXh0JywgeyBiYXNlZGlyOiBwcm9jZXNzLmN3ZCgpIH0pKVxuICAgICAgICBidWlsZC5wYWNrYWdlRGlycyA9IFsuLi4oYnVpbGQucGFja2FnZURpcnMgfHwgW10pLCBwYXRoLmRpcm5hbWUoYnVpbGQuc2RrKV07XG4gICAgICAgIGJ1aWxkLnBhY2thZ2VzID0gYnVpbGQucGFja2FnZXMgfHwgdGhpcy5fZmluZFBhY2thZ2VzKGJ1aWxkLnNkayk7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vdGhyb3cgbmV3IEVycm9yKGBAc2VuY2hhL2V4dC1tb2Rlcm4gbm90IGZvdW5kLiAgWW91IGNhbiBpbnN0YWxsIGl0IHdpdGggXCJucG0gaW5zdGFsbCAtLXNhdmUgQHNlbmNoYS9leHQtbW9kZXJuXCIgb3IsIGlmIHlvdSBoYXZlIGEgbG9jYWwgY29weSBvZiB0aGUgU0RLLCBzcGVjaWZ5IHRoZSBwYXRoIHRvIGl0IHVzaW5nIHRoZSBcInNka1wiIG9wdGlvbiBpbiBidWlsZCBcIiR7bmFtZX0uXCJgKTtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBAc2VuY2hhL2V4dCBub3QgZm91bmQuICBZb3UgY2FuIGluc3RhbGwgaXQgd2l0aCBcIm5wbSBpbnN0YWxsIC0tc2F2ZSBAc2VuY2hhL2V4dC1tb2Rlcm5cIiBvciwgaWYgeW91IGhhdmUgYSBsb2NhbCBjb3B5IG9mIHRoZSBTREssIHNwZWNpZnkgdGhlIHBhdGggdG8gaXQgdXNpbmcgdGhlIFwic2RrXCIgb3B0aW9uIGluIGJ1aWxkIFwiJHtuYW1lfS5cImApO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vIC8qKlxuICAvLyAgKiBBZGRzIHRoZSBFeHRSZWFjdCBwYWNrYWdlIGlmIHByZXNlbnQgYW5kIHRoZSB0b29sa2l0IGlzIG1vZGVyblxuICAvLyAgKiBAcGFyYW0ge09iamVjdH0gYnVpbGQgXG4gIC8vICAqL1xuICAvLyBfYWRkRXh0UmVhY3RQYWNrYWdlKGJ1aWxkKSB7XG4gIC8vICAgaWYgKGJ1aWxkLnRvb2xraXQgPT09ICdjbGFzc2ljJykgcmV0dXJuO1xuICAvLyAgIGlmIChmcy5leGlzdHNTeW5jKHBhdGguam9pbihidWlsZC5zZGssICdleHQnLCAnbW9kZXJuJywgJ3JlYWN0JykpIHx8ICAvLyByZXBvXG4gIC8vICAgICBmcy5leGlzdHNTeW5jKHBhdGguam9pbihidWlsZC5zZGssICdtb2Rlcm4nLCAncmVhY3QnKSkpIHsgLy8gcHJvZHVjdGlvbiBidWlsZFxuICAvLyAgICAgaWYgKCFidWlsZC5wYWNrYWdlcykge1xuICAvLyAgICAgICBidWlsZC5wYWNrYWdlcyA9IFtdO1xuICAvLyAgICAgfVxuICAvLyAgICAgYnVpbGQucGFja2FnZXMucHVzaCgncmVhY3QnKTtcbiAgLy8gICB9XG4gIC8vIH1cblxuICAvKipcbiAgICogUmV0dXJuIHRoZSBuYW1lcyBvZiBhbGwgRXh0UmVhY3QgcGFja2FnZXMgaW4gdGhlIHNhbWUgcGFyZW50IGRpcmVjdG9yeSBhcyBleHQtcmVhY3QgKHR5cGljYWxseSBub2RlX21vZHVsZXMvQHNlbmNoYSlcbiAgICogQHByaXZhdGVcbiAgICogQHBhcmFtIHtTdHJpbmd9IHNkayBQYXRoIHRvIGV4dC1yZWFjdFxuICAgKiBAcmV0dXJuIHtTdHJpbmdbXX1cbiAgICovXG4gIF9maW5kUGFja2FnZXMoc2RrKSB7XG4gICAgY29uc3QgbW9kdWxlc0RpciA9IHBhdGguam9pbihzZGssICcuLicpO1xuICAgIHJldHVybiBmcy5yZWFkZGlyU3luYyhtb2R1bGVzRGlyKVxuICAgICAgLy8gRmlsdGVyIG91dCBkaXJlY3RvcmllcyB3aXRob3V0ICdwYWNrYWdlLmpzb24nXG4gICAgICAuZmlsdGVyKGRpciA9PiBmcy5leGlzdHNTeW5jKHBhdGguam9pbihtb2R1bGVzRGlyLCBkaXIsICdwYWNrYWdlLmpzb24nKSkpXG4gICAgICAvLyBHZW5lcmF0ZSBhcnJheSBvZiBwYWNrYWdlIG5hbWVzXG4gICAgICAubWFwKGRpciA9PiB7XG4gICAgICAgICAgY29uc3QgcGFja2FnZUluZm8gPSBKU09OLnBhcnNlKGZzLnJlYWRGaWxlU3luYyhwYXRoLmpvaW4obW9kdWxlc0RpciwgZGlyLCAncGFja2FnZS5qc29uJykpKTtcbiAgICAgICAgICAvLyBEb24ndCBpbmNsdWRlIHRoZW1lIHR5cGUgcGFja2FnZXMuXG4gICAgICAgICAgaWYocGFja2FnZUluZm8uc2VuY2hhICYmIHBhY2thZ2VJbmZvLnNlbmNoYS50eXBlICE9PSAndGhlbWUnKSB7XG4gICAgICAgICAgICAgIHJldHVybiBwYWNrYWdlSW5mby5zZW5jaGEubmFtZTtcbiAgICAgICAgICB9XG4gICAgICB9KVxuICAgICAgLy8gUmVtb3ZlIGFueSB1bmRlZmluZWRzIGZyb20gbWFwXG4gICAgICAuZmlsdGVyKG5hbWUgPT4gbmFtZSk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgcGF0aCB0byB0aGUgc2VuY2hhIGNtZCBleGVjdXRhYmxlXG4gICAqIEBwcml2YXRlXG4gICAqIEByZXR1cm4ge1N0cmluZ31cbiAgICovXG4gIF9nZXRTZW5jaENtZFBhdGgoKSB7XG4gICAgdHJ5IHsgcmV0dXJuIHJlcXVpcmUoJ0BzZW5jaGEvY21kJykgfSBcbiAgICBjYXRjaCAoZSkgeyByZXR1cm4gJ3NlbmNoYScgfVxuICB9XG59XG5cblxuXG5cbiAgICAgIC8vIGlmICh0aGlzLndhdGNoKSB7XG4gICAgICAvLyAgIGlmICghd2F0Y2hpbmcpIHtcbiAgICAgIC8vICAgICB3YXRjaGluZyA9IGdhdGhlckVycm9ycyhmb3JrKHNlbmNoYSwgWydhbnQnLCAnd2F0Y2gnXSwgeyBjd2Q6IG91dHB1dCwgc2lsZW50OiB0cnVlIH0pKTtcbiAgICAgIC8vICAgICB3YXRjaGluZy5zdGRlcnIucGlwZShwcm9jZXNzLnN0ZGVycik7XG4gICAgICAvLyAgICAgd2F0Y2hpbmcuc3Rkb3V0LnBpcGUocHJvY2Vzcy5zdGRvdXQpO1xuICAgICAgLy8gICAgIHdhdGNoaW5nLnN0ZG91dC5vbignZGF0YScsIGRhdGEgPT4ge1xuICAgICAgLy8gICAgICAgaWYgKGRhdGEgJiYgZGF0YS50b1N0cmluZygpLm1hdGNoKC9XYWl0aW5nIGZvciBjaGFuZ2VzXFwuXFwuXFwuLykpIHtcbiAgICAgIC8vICAgICAgICAgb25CdWlsZERvbmUoKVxuICAgICAgLy8gICAgICAgfVxuICAgICAgLy8gICAgIH0pXG4gICAgICAvLyAgICAgd2F0Y2hpbmcub24oJ2V4aXQnLCBvbkJ1aWxkRG9uZSlcbiAgICAgIC8vICAgfVxuICAgICAgLy8gICBpZiAoIWNtZFJlYnVpbGROZWVkZWQpIHtcbiAgICAgIC8vICAgICByZWFkbGluZS5jdXJzb3JUbyhwcm9jZXNzLnN0ZG91dCwgMCk7Y29uc29sZS5sb2coYXBwICsgJ0V4dCByZWJ1aWxkIE5PVCBuZWVkZWQnKVxuICAgICAgLy8gICAgIG9uQnVpbGREb25lKClcbiAgICAgIC8vICAgfVxuICAgICAgLy8gICBlbHNlIHtcbiAgICAgIC8vICAgICAvL3JlYWRsaW5lLmN1cnNvclRvKHByb2Nlc3Muc3Rkb3V0LCAwKTtjb25zb2xlLmxvZyhhcHAgKyAnRXh0IHJlYnVpbGQgSVMgbmVlZGVkJylcbiAgICAgIC8vICAgfVxuICAgICAgLy8gfSBcbiAgICAgIC8vIGVsc2Uge1xuICAgICAgLy8gICBjb25zdCBidWlsZCA9IGdhdGhlckVycm9ycyhmb3JrKHNlbmNoYSwgWydhbnQnLCAnYnVpbGQnXSwgeyBzdGRpbzogJ2luaGVyaXQnLCBlbmNvZGluZzogJ3V0Zi04JywgY3dkOiBvdXRwdXQsIHNpbGVudDogZmFsc2UgfSkpO1xuICAgICAgLy8gICByZWFkbGluZS5jdXJzb3JUbyhwcm9jZXNzLnN0ZG91dCwgMCk7Y29uc29sZS5sb2coYXBwICsgJ3NlbmNoYSBhbnQgYnVpbGQnKVxuICAgICAgLy8gICBpZihidWlsZC5zdGRvdXQpIHsgYnVpbGQuc3Rkb3V0LnBpcGUocHJvY2Vzcy5zdGRvdXQpIH1cbiAgICAgIC8vICAgaWYoYnVpbGQuc3RkZXJyKSB7IGJ1aWxkLnN0ZGVyci5waXBlKHByb2Nlc3Muc3RkZXJyKSB9XG4gICAgICAvLyAgIGJ1aWxkLm9uKCdleGl0Jywgb25CdWlsZERvbmUpO1xuICAgICAgLy8gfVxuXG5cblxuLy8gY29uc3QgZ2F0aGVyRXJyb3JzMiA9IChjbWQpID0+IHtcbi8vICAgaWYgKGNtZC5zdGRvdXQpIHtcbi8vICAgICBjbWQuc3Rkb3V0Lm9uKCdkYXRhJywgZGF0YSA9PiB7XG4vLyAgICAgICBjb25zdCBtZXNzYWdlID0gZGF0YS50b1N0cmluZygpO1xuLy8gICAgICAgaWYgKG1lc3NhZ2UubWF0Y2goL15cXFtFUlJcXF0vKSkge1xuLy8gICAgICAgICBjbWRFcnJvcnMucHVzaChtZXNzYWdlLnJlcGxhY2UoL15cXFtFUlJcXF0gL2dpLCAnJykpO1xuLy8gICAgICAgfVxuLy8gICAgIH0pXG4vLyAgIH1cbi8vICAgcmV0dXJuIGNtZDtcbi8vIH1cblxuLy8gZnVuY3Rpb24gZ2F0aGVyRXJyb3JzIChjbWQpIHtcbi8vICAgaWYgKGNtZC5zdGRvdXQpIHtcbi8vICAgICBjbWQuc3Rkb3V0Lm9uKCdkYXRhJywgZGF0YSA9PiB7XG4vLyAgICAgICBjb25zdCBtZXNzYWdlID0gZGF0YS50b1N0cmluZygpO1xuLy8gICAgICAgaWYgKG1lc3NhZ2UubWF0Y2goL15cXFtFUlJcXF0vKSkge1xuLy8gICAgICAgICBjbWRFcnJvcnMucHVzaChtZXNzYWdlLnJlcGxhY2UoL15cXFtFUlJcXF0gL2dpLCAnJykpO1xuLy8gICAgICAgfVxuLy8gICAgIH0pXG4vLyAgIH1cbi8vICAgcmV0dXJuIGNtZFxuLy8gfVxuXG5cblxuXG5cblxuLy8gZnJvbSB0aGlzLmVtaXRcbiAgICAvLyB0aGUgZm9sbG93aW5nIGlzIG5lZWRlZCBmb3IgaHRtbC13ZWJwYWNrLXBsdWdpbiB0byBpbmNsdWRlIDxzY3JpcHQ+IGFuZCA8bGluaz4gdGFncyBmb3IgRXh0UmVhY3RcbiAgICAvLyBjb25zb2xlLmxvZygnY29tcGlsYXRpb24nKVxuICAgIC8vIGNvbnNvbGUubG9nKCcqKioqKioqKmNvbXBpbGF0aW9uLmNodW5rc1swXScpXG4gICAgLy8gY29uc29sZS5sb2coY29tcGlsYXRpb24uY2h1bmtzWzBdLmlkKVxuICAgIC8vIGNvbnNvbGUubG9nKHBhdGguam9pbih0aGlzLm91dHB1dCwgJ2V4dC5qcycpKVxuICAgIC8vIGNvbnN0IGpzQ2h1bmsgPSBjb21waWxhdGlvbi5hZGRDaHVuayhgJHt0aGlzLm91dHB1dH0tanNgKTtcbiAgICAvLyBqc0NodW5rLmhhc1J1bnRpbWUgPSBqc0NodW5rLmlzSW5pdGlhbCA9ICgpID0+IHRydWU7XG4gICAgLy8ganNDaHVuay5maWxlcy5wdXNoKHBhdGguam9pbih0aGlzLm91dHB1dCwgJ2V4dC5qcycpKTtcbiAgICAvLyBqc0NodW5rLmZpbGVzLnB1c2gocGF0aC5qb2luKHRoaXMub3V0cHV0LCAnZXh0LmNzcycpKTtcbiAgICAvLyBqc0NodW5rLmlkID0gJ2FhYWFwJzsgLy8gdGhpcyBmb3JjZXMgaHRtbC13ZWJwYWNrLXBsdWdpbiB0byBpbmNsdWRlIGV4dC5qcyBmaXJzdFxuICAgIC8vIGNvbnNvbGUubG9nKCcqKioqKioqKmNvbXBpbGF0aW9uLmNodW5rc1sxXScpXG4gICAgLy8gY29uc29sZS5sb2coY29tcGlsYXRpb24uY2h1bmtzWzFdLmlkKVxuXG4gICAgLy9pZiAodGhpcy5hc3luY2hyb25vdXMpIGNhbGxiYWNrKCk7XG4vLyAgICBjb25zb2xlLmxvZyhjYWxsYmFjaylcblxuLy8gaWYgKGlzV2VicGFjazQpIHtcbi8vICAgY29uc29sZS5sb2cocGF0aC5qb2luKHRoaXMub3V0cHV0LCAnZXh0LmpzJykpXG4vLyAgIGNvbnN0IHN0YXRzID0gZnMuc3RhdFN5bmMocGF0aC5qb2luKG91dHB1dFBhdGgsICdleHQuanMnKSlcbi8vICAgY29uc3QgZmlsZVNpemVJbkJ5dGVzID0gc3RhdHMuc2l6ZVxuLy8gICBjb21waWxhdGlvbi5hc3NldHNbJ2V4dC5qcyddID0ge1xuLy8gICAgIHNvdXJjZTogZnVuY3Rpb24oKSB7cmV0dXJuIGZzLnJlYWRGaWxlU3luYyhwYXRoLmpvaW4ob3V0cHV0UGF0aCwgJ2V4dC5qcycpKX0sXG4vLyAgICAgc2l6ZTogZnVuY3Rpb24oKSB7cmV0dXJuIGZpbGVTaXplSW5CeXRlc31cbi8vICAgfVxuLy8gICBjb25zb2xlLmxvZyhjb21waWxhdGlvbi5lbnRyeXBvaW50cylcblxuLy8gICB2YXIgZmlsZWxpc3QgPSAnSW4gdGhpcyBidWlsZDpcXG5cXG4nO1xuXG4vLyAgIC8vIExvb3AgdGhyb3VnaCBhbGwgY29tcGlsZWQgYXNzZXRzLFxuLy8gICAvLyBhZGRpbmcgYSBuZXcgbGluZSBpdGVtIGZvciBlYWNoIGZpbGVuYW1lLlxuLy8gICBmb3IgKHZhciBmaWxlbmFtZSBpbiBjb21waWxhdGlvbi5hc3NldHMpIHtcbi8vICAgICBmaWxlbGlzdCArPSAoJy0gJysgZmlsZW5hbWUgKydcXG4nKTtcbi8vICAgfVxuXG4vLyAgIC8vIEluc2VydCB0aGlzIGxpc3QgaW50byB0aGUgd2VicGFjayBidWlsZCBhcyBhIG5ldyBmaWxlIGFzc2V0OlxuLy8gICBjb21waWxhdGlvbi5hc3NldHNbJ2ZpbGVsaXN0Lm1kJ10gPSB7XG4vLyAgICAgc291cmNlKCkge1xuLy8gICAgICAgcmV0dXJuIGZpbGVsaXN0O1xuLy8gICAgIH0sXG4vLyAgICAgc2l6ZSgpIHtcbi8vICAgICAgIHJldHVybiBmaWxlbGlzdC5sZW5ndGg7XG4vLyAgICAgfVxuLy8gICB9XG4vLyB9XG5cblxuICAgIC8vIGlmIChjb21waWxlci5ob29rcykge1xuICAgIC8vICAgICAvLyBpbiAnZXh0cmVhY3QtY29tcGlsYXRpb24nXG4gICAgLy8gICAgIC8vaHR0cHM6Ly9naXRodWIuY29tL2pha2V0cmVudC9odG1sLXdlYnBhY2stdGVtcGxhdGVcbiAgICAvLyAgICAgLy9odHRwczovL2dpdGh1Yi5jb20vamFudGltb24vaHRtbC13ZWJwYWNrLXBsdWdpbiNcbiAgICAvLyAgICAgLy8gdGhlIGZvbGxvd2luZyBpcyBuZWVkZWQgZm9yIGh0bWwtd2VicGFjay1wbHVnaW4gdG8gaW5jbHVkZSA8c2NyaXB0PiBhbmQgPGxpbms+IHRhZ3MgZm9yIEV4dFJlYWN0XG4gICAgLy8gICAgIGNvbXBpbGVyLmhvb2tzLmh0bWxXZWJwYWNrUGx1Z2luQmVmb3JlSHRtbEdlbmVyYXRpb24udGFwQXN5bmMoXG4gICAgLy8gICAgICAgJ2V4dHJlYWN0LWh0bWxnZW5lcmF0aW9uJyxcbiAgICAvLyAgICAgICAoZGF0YSwgY2IpID0+IHtcbiAgICAvLyAgICAgICAgIHJlYWRsaW5lLmN1cnNvclRvKHByb2Nlc3Muc3Rkb3V0LCAwKTtjb25zb2xlLmxvZyhhcHAgKyAnZXh0cmVhY3QtaHRtbGdlbmVyYXRpb24nKVxuICAgIC8vICAgICAgICAgY29uc29sZS5sb2coJ2RhdGEuYXNzZXRzLmpzLmxlbmd0aCcpXG4gICAgLy8gICAgICAgICBjb25zb2xlLmxvZyhkYXRhLmFzc2V0cy5qcy5sZW5ndGgpXG4gICAgLy8gICAgICAgICBkYXRhLmFzc2V0cy5qcy51bnNoaWZ0KCdleHQtcmVhY3QvZXh0LmpzJylcbiAgICAvLyAgICAgICAgIGRhdGEuYXNzZXRzLmNzcy51bnNoaWZ0KCdleHQtcmVhY3QvZXh0LmNzcycpXG4gICAgLy8gICAgICAgICBjYihudWxsLCBkYXRhKVxuICAgIC8vICAgICAgIH1cbiAgICAvLyAgICAgKVxuICAgIC8vICAgfVxuXG4iXX0=