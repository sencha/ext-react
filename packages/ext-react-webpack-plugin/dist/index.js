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
      var isWebpack4, modules, module, deps, build, outputPath, cmdErrors, promise, url, opn;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            isWebpack4 = compilation.hooks;
            modules = [];

            if (isWebpack4) {
              isWebpack4 = true; //       modules = compilation.chunks.reduce((a, b) => a.concat(b._modules), [])
              // //      console.log(modules)
              //       var i = 0
              //       var theModule = ''
              //       for (let module of modules) {
              //         if (i == 0) {
              //           theModule = module
              //           i++
              //         }
              // //const deps = this.dependencies[module.resource]
              //         //console.log(deps)
              //         //if (deps) statements = statements.concat(deps);
              //       }
              //       var thePath = path.join(compiler.outputPath, 'module.txt')
              //       //console.log(thePath)
              //       //var o = {};
              //       //o.o = theModule;
              //       //console.log(theModule[0].context)
              //       var cache = [];
              //       var h = JSON.stringify(theModule, function(key, value) {
              //           if (typeof value === 'object' && value !== null) {
              //               if (cache.indexOf(value) !== -1) {
              //                   // Circular reference found, discard key
              //                   return;
              //               }
              //               // Store value in our collection
              //               cache.push(value);
              //           }
              //           return value;
              //       });
              //       cache = null; // Enable garbage collection
              //       //fs.writeFileSync( thePath, h, 'utf8')
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
        readline.cursorTo(process.stdout, 0);
        console.log(app + 'Adding Package Folder: ' + userPackages);
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
          var verbose = 'no';

          if (process.env.EXTREACT_VERBOSE == 'yes') {
            verbose = 'yes';
          }

          console.log(verbose);
          (0, _executeAsync.executeAsync)(sencha, parms, options, compilation, cmdErrors, verbose).then(function () {
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
      //compilation.errors.push( new Error(cmdErrors.join("")) )
      throw new Error(`${_chalk.default.red('SDK parameter no longer supported with ext-react-webpack-plugin')}  - use the Ext JS npm packages instead`); // if (!fs.existsSync(sdk)) {
      //     throw new Error(`No SDK found at ${path.resolve(sdk)}.  Did you for get to link/copy your Ext JS SDK to that location?`);
      // } else {
      //     //mjg this needed? this._addExtReactPackage(build)
      // }
    } else {
      try {
        build.sdk = _path.default.dirname((0, _resolve.sync)('@sencha/ext', {
          basedir: process.cwd()
        }));
        build.packageDirs = [...(build.packageDirs || []), _path.default.dirname(build.sdk)];
        build.packages = build.packages || this._findPackages(build.sdk);
      } catch (e) {
        //throw new Error(`@sencha/ext-modern not found.  You can install it with "npm install --save @sencha/ext-modern" or, if you have a local copy of the SDK, specify the path to it using the "sdk" option in build "${name}."`);
        throw new Error(`@sencha/ext not found.  You can install it with "npm install --save @sencha/ext`);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJyZWFjdFZlcnNpb24iLCJyZWFjdFZlcnNpb25GdWxsIiwid2F0Y2hpbmciLCJhcHAiLCJjaGFsayIsImdyZWVuIiwibW9kdWxlIiwiZXhwb3J0cyIsIkV4dFJlYWN0V2VicGFja1BsdWdpbiIsImNvbnN0cnVjdG9yIiwib3B0aW9ucyIsImZpcnN0VGltZSIsImNvdW50IiwicGtnIiwiZnMiLCJleGlzdHNTeW5jIiwiSlNPTiIsInBhcnNlIiwicmVhZEZpbGVTeW5jIiwiZGVwZW5kZW5jaWVzIiwicmVhY3QiLCJpczE2IiwiaW5jbHVkZXMiLCJleHRSZWFjdFJjIiwiZ2V0RGVmYXVsdE9wdGlvbnMiLCJidWlsZHMiLCJPYmplY3QiLCJrZXlzIiwibGVuZ3RoIiwiYnVpbGRPcHRpb25zIiwiZXh0IiwibmFtZSIsIl92YWxpZGF0ZUJ1aWxkQ29uZmlnIiwiYXNzaWduIiwiY3VycmVudEZpbGUiLCJtYW5pZmVzdCIsIndhdGNoUnVuIiwid2F0Y2giLCJhcHBseSIsImNvbXBpbGVyIiwid2VicGFja1ZlcnNpb24iLCJ1bmRlZmluZWQiLCJpc1dlYnBhY2s0IiwiaG9va3MiLCJyZWFkbGluZSIsImN1cnNvclRvIiwicHJvY2VzcyIsInN0ZG91dCIsImNvbnNvbGUiLCJsb2ciLCJtZSIsImFzeW5jaHJvbm91cyIsInRhcEFzeW5jIiwiY2IiLCJ0YXAiLCJwbHVnaW4iLCJhZGRUb01hbmlmZXN0IiwiY2FsbCIsImZpbGUiLCJzdGF0ZSIsInJlc291cmNlIiwiZSIsImVycm9yIiwiY29tcGlsYXRpb24iLCJkYXRhIiwic3VjY2VlZE1vZHVsZSIsIm5vcm1hbE1vZHVsZUZhY3RvcnkiLCJwYXJzZXIiLCJodG1sV2VicGFja1BsdWdpbkJlZm9yZUh0bWxHZW5lcmF0aW9uIiwib3V0cHV0T3B0aW9ucyIsInB1YmxpY1BhdGgiLCJhc3NldHMiLCJqcyIsInVuc2hpZnQiLCJjc3MiLCJwYXRoIiwiam9pbiIsImVtaXQiLCJjYWxsYmFjayIsImRvbmUiLCJtb2R1bGVzIiwiY2h1bmtzIiwicmVkdWNlIiwiYSIsImIiLCJjb25jYXQiLCJkZXBzIiwiYnVpbGQiLCJvdXRwdXRQYXRoIiwib3V0cHV0IiwiZGV2U2VydmVyIiwiY29udGVudEJhc2UiLCJjbWRFcnJvcnMiLCJwcm9taXNlIiwiX2J1aWxkRXh0QnVuZGxlIiwidXJsIiwicG9ydCIsIm9wbiIsInJlcXVpcmUiLCJ0b29sa2l0IiwidGhlbWUiLCJwYWNrYWdlcyIsInBhY2thZ2VEaXJzIiwic2RrIiwib3ZlcnJpZGVzIiwic2VuY2hhIiwiX2dldFNlbmNoQ21kUGF0aCIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0Iiwib25CdWlsZERvbmUiLCJFcnJvciIsInVzZXJQYWNrYWdlcyIsInB1c2giLCJ3cml0ZUZpbGVTeW5jIiwiY29tcHJlc3MiLCJwcm9kdWN0aW9uIiwicGFybXMiLCJjd2QiLCJzaWxlbnQiLCJzdGRpbyIsImVuY29kaW5nIiwidmVyYm9zZSIsImVudiIsIkVYVFJFQUNUX1ZFUkJPU0UiLCJ0aGVuIiwicmVhc29uIiwiZGVidWciLCJ0ZXN0IiwibWFuaWZlc3RFeHRyYWN0b3IiLCJleHRyYWN0RnJvbUpTWCIsInRyZWVTaGFraW5nIiwibWF0Y2giLCJkb1BhcnNlIiwiX3NvdXJjZSIsIl92YWx1ZSIsInJlZCIsImRpcm5hbWUiLCJiYXNlZGlyIiwiX2ZpbmRQYWNrYWdlcyIsIm1vZHVsZXNEaXIiLCJyZWFkZGlyU3luYyIsImZpbHRlciIsImRpciIsIm1hcCIsInBhY2thZ2VJbmZvIiwidHlwZSJdLCJtYXBwaW5ncyI6IkFBQUE7O0FBQ0E7O0FBR0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBR0E7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWRBLElBQUlBLFlBQVksR0FBRyxDQUFuQjtBQUNBLElBQUlDLGdCQUFnQixHQUFHLEVBQXZCO0FBV0EsSUFBSUMsUUFBUSxHQUFHLEtBQWY7QUFDQSxNQUFNQyxHQUFHLEdBQUksR0FBRUMsZUFBTUMsS0FBTixDQUFZLFVBQVosQ0FBd0IsNkJBQXZDO0FBR0FDLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQixNQUFNQyxxQkFBTixDQUE0QjtBQUMzQzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFpQkFDLEVBQUFBLFdBQVcsQ0FBQ0MsT0FBRCxFQUFVO0FBQ25CLFNBQUtDLFNBQUwsR0FBaUIsSUFBakI7QUFDQSxTQUFLQyxLQUFMLEdBQWEsQ0FBYixDQUZtQixDQUduQjs7QUFDQSxRQUFJQyxHQUFHLEdBQUlDLFlBQUdDLFVBQUgsQ0FBYyxjQUFkLEtBQWlDQyxJQUFJLENBQUNDLEtBQUwsQ0FBV0gsWUFBR0ksWUFBSCxDQUFnQixjQUFoQixFQUFnQyxPQUFoQyxDQUFYLENBQWpDLElBQXlGLEVBQXBHO0FBQ0FqQixJQUFBQSxnQkFBZ0IsR0FBR1ksR0FBRyxDQUFDTSxZQUFKLENBQWlCQyxLQUFwQztBQUNBLFFBQUlDLElBQUksR0FBR3BCLGdCQUFnQixDQUFDcUIsUUFBakIsQ0FBMEIsSUFBMUIsQ0FBWDs7QUFDQSxRQUFJRCxJQUFKLEVBQVU7QUFBRXJCLE1BQUFBLFlBQVksR0FBRyxFQUFmO0FBQW1CLEtBQS9CLE1BQ0s7QUFBRUEsTUFBQUEsWUFBWSxHQUFHLEVBQWY7QUFBbUI7O0FBQzFCLFNBQUtBLFlBQUwsR0FBb0JBLFlBQXBCO0FBQ0EsU0FBS0MsZ0JBQUwsR0FBd0JBLGdCQUF4QjtBQUNBLFVBQU1zQixVQUFVLEdBQUlULFlBQUdDLFVBQUgsQ0FBYyxjQUFkLEtBQWlDQyxJQUFJLENBQUNDLEtBQUwsQ0FBV0gsWUFBR0ksWUFBSCxDQUFnQixjQUFoQixFQUFnQyxPQUFoQyxDQUFYLENBQWpDLElBQXlGLEVBQTdHO0FBQ0FSLElBQUFBLE9BQU8scUJBQVEsS0FBS2MsaUJBQUwsRUFBUixFQUFxQ2QsT0FBckMsRUFBaURhLFVBQWpELENBQVA7QUFDQSxVQUFNO0FBQUVFLE1BQUFBO0FBQUYsUUFBYWYsT0FBbkI7O0FBQ0EsUUFBSWdCLE1BQU0sQ0FBQ0MsSUFBUCxDQUFZRixNQUFaLEVBQW9CRyxNQUFwQixLQUErQixDQUFuQyxFQUFzQztBQUNwQyxZQUFNO0FBQUVILFFBQUFBO0FBQUYsVUFBOEJmLE9BQXBDO0FBQUEsWUFBbUJtQixZQUFuQiw0QkFBb0NuQixPQUFwQzs7QUFDQWUsTUFBQUEsTUFBTSxDQUFDSyxHQUFQLEdBQWFELFlBQWI7QUFDRDs7QUFDRCxTQUFLLElBQUlFLElBQVQsSUFBaUJOLE1BQWpCLEVBQXlCO0FBQ3ZCLFdBQUtPLG9CQUFMLENBQTBCRCxJQUExQixFQUFnQ04sTUFBTSxDQUFDTSxJQUFELENBQXRDO0FBQ0Q7O0FBQ0RMLElBQUFBLE1BQU0sQ0FBQ08sTUFBUCxDQUFjLElBQWQsb0JBQ0t2QixPQURMO0FBRUV3QixNQUFBQSxXQUFXLEVBQUUsSUFGZjtBQUdFQyxNQUFBQSxRQUFRLEVBQUUsSUFIWjtBQUlFaEIsTUFBQUEsWUFBWSxFQUFFO0FBSmhCO0FBTUQ7O0FBRURpQixFQUFBQSxRQUFRLEdBQUc7QUFDVCxTQUFLQyxLQUFMLEdBQWEsSUFBYjtBQUNEOztBQUVEQyxFQUFBQSxLQUFLLENBQUNDLFFBQUQsRUFBVztBQUNkLFFBQUksS0FBS0MsY0FBTCxJQUF1QkMsU0FBM0IsRUFBc0M7QUFDcEMsWUFBTUMsVUFBVSxHQUFHSCxRQUFRLENBQUNJLEtBQTVCOztBQUNBLFVBQUlELFVBQUosRUFBZ0I7QUFBQyxhQUFLRixjQUFMLEdBQXNCLGNBQXRCO0FBQXFDLE9BQXRELE1BQ0s7QUFBQyxhQUFLQSxjQUFMLEdBQXNCLGVBQXRCO0FBQXNDOztBQUM1Q0ksTUFBQUEsUUFBUSxDQUFDQyxRQUFULENBQWtCQyxPQUFPLENBQUNDLE1BQTFCLEVBQWtDLENBQWxDO0FBQXFDQyxNQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWTlDLEdBQUcsR0FBRyxnQkFBTixHQUF5QixLQUFLRixnQkFBOUIsR0FBaUQsSUFBakQsR0FBd0QsS0FBS3VDLGNBQXpFO0FBQ3RDOztBQUNELFVBQU1VLEVBQUUsR0FBRyxJQUFYOztBQUVBLFFBQUlYLFFBQVEsQ0FBQ0ksS0FBYixFQUFvQjtBQUNsQixVQUFJLEtBQUtRLFlBQVQsRUFBdUI7QUFDckJaLFFBQUFBLFFBQVEsQ0FBQ0ksS0FBVCxDQUFlUCxRQUFmLENBQXdCZ0IsUUFBeEIsQ0FBaUMsNkJBQWpDLEVBQWdFLENBQUNsRCxRQUFELEVBQVdtRCxFQUFYLEtBQWtCO0FBQ2hGVCxVQUFBQSxRQUFRLENBQUNDLFFBQVQsQ0FBa0JDLE9BQU8sQ0FBQ0MsTUFBMUIsRUFBa0MsQ0FBbEM7QUFBcUNDLFVBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZOUMsR0FBRyxHQUFHLDZCQUFsQjtBQUNyQyxlQUFLaUMsUUFBTDtBQUNBaUIsVUFBQUEsRUFBRTtBQUNILFNBSkQ7QUFLRCxPQU5ELE1BT0s7QUFDSGQsUUFBQUEsUUFBUSxDQUFDSSxLQUFULENBQWVQLFFBQWYsQ0FBd0JrQixHQUF4QixDQUE0QixxQkFBNUIsRUFBb0RwRCxRQUFELElBQWM7QUFDL0QwQyxVQUFBQSxRQUFRLENBQUNDLFFBQVQsQ0FBa0JDLE9BQU8sQ0FBQ0MsTUFBMUIsRUFBa0MsQ0FBbEM7QUFBcUNDLFVBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZOUMsR0FBRyxHQUFHLHFCQUFsQjtBQUNyQyxlQUFLaUMsUUFBTDtBQUNELFNBSEQ7QUFJRDtBQUNGLEtBZEQsTUFlSztBQUNIRyxNQUFBQSxRQUFRLENBQUNnQixNQUFULENBQWdCLFdBQWhCLEVBQTZCLENBQUNyRCxRQUFELEVBQVdtRCxFQUFYLEtBQWtCO0FBQzdDVCxRQUFBQSxRQUFRLENBQUNDLFFBQVQsQ0FBa0JDLE9BQU8sQ0FBQ0MsTUFBMUIsRUFBa0MsQ0FBbEM7QUFBcUNDLFFBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZOUMsR0FBRyxHQUFHLFdBQWxCO0FBQ3JDLGFBQUtpQyxRQUFMO0FBQ0FpQixRQUFBQSxFQUFFO0FBQ0gsT0FKRDtBQUtEO0FBRUQ7Ozs7OztBQUlBLFVBQU1HLGFBQWEsR0FBRyxVQUFTQyxJQUFULEVBQWU7QUFDbkMsVUFBSTtBQUNGLGNBQU1DLElBQUksR0FBRyxLQUFLQyxLQUFMLENBQVdyRCxNQUFYLENBQWtCc0QsUUFBL0I7QUFDQVYsUUFBQUEsRUFBRSxDQUFDL0IsWUFBSCxDQUFnQnVDLElBQWhCLElBQXdCLENBQUUsSUFBSVIsRUFBRSxDQUFDL0IsWUFBSCxDQUFnQnVDLElBQWhCLEtBQXlCLEVBQTdCLENBQUYsRUFBb0MsdUJBQVNELElBQVQsQ0FBcEMsQ0FBeEI7QUFDRCxPQUhELENBR0UsT0FBT0ksQ0FBUCxFQUFVO0FBQ1ZiLFFBQUFBLE9BQU8sQ0FBQ2MsS0FBUixDQUFlLG9CQUFtQkosSUFBSyxFQUF2QztBQUNEO0FBQ0YsS0FQRDs7QUFTQSxRQUFJbkIsUUFBUSxDQUFDSSxLQUFiLEVBQW9CO0FBQ2xCSixNQUFBQSxRQUFRLENBQUNJLEtBQVQsQ0FBZW9CLFdBQWYsQ0FBMkJULEdBQTNCLENBQStCLHVCQUEvQixFQUF3RCxDQUFDUyxXQUFELEVBQWFDLElBQWIsS0FBc0I7QUFDNUVwQixRQUFBQSxRQUFRLENBQUNDLFFBQVQsQ0FBa0JDLE9BQU8sQ0FBQ0MsTUFBMUIsRUFBa0MsQ0FBbEM7QUFBcUNDLFFBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZOUMsR0FBRyxHQUFHLHVCQUFsQjtBQUNyQzRELFFBQUFBLFdBQVcsQ0FBQ3BCLEtBQVosQ0FBa0JzQixhQUFsQixDQUFnQ1gsR0FBaEMsQ0FBb0MsMEJBQXBDLEVBQWlFaEQsTUFBRCxJQUFZO0FBQzFFLGVBQUsyRCxhQUFMLENBQW1CRixXQUFuQixFQUFnQ3pELE1BQWhDO0FBQ0QsU0FGRDtBQUlBMEQsUUFBQUEsSUFBSSxDQUFDRSxtQkFBTCxDQUF5QlgsTUFBekIsQ0FBZ0MsUUFBaEMsRUFBMEMsVUFBU1ksTUFBVCxFQUFpQnpELE9BQWpCLEVBQTBCO0FBQ2xFO0FBQ0F5RCxVQUFBQSxNQUFNLENBQUNaLE1BQVAsQ0FBYyxpQkFBZCxFQUFpQ0MsYUFBakMsRUFGa0UsQ0FHbEU7O0FBQ0FXLFVBQUFBLE1BQU0sQ0FBQ1osTUFBUCxDQUFjLGtCQUFkLEVBQWtDQyxhQUFsQyxFQUprRSxDQUtsRTs7QUFDQVcsVUFBQUEsTUFBTSxDQUFDWixNQUFQLENBQWMsaUJBQWQsRUFBaUNDLGFBQWpDO0FBQ0QsU0FQRDtBQVNBTyxRQUFBQSxXQUFXLENBQUNwQixLQUFaLENBQWtCeUIscUNBQWxCLENBQXdEaEIsUUFBeEQsQ0FBaUUsMEJBQWpFLEVBQTRGLENBQUNZLElBQUQsRUFBT1gsRUFBUCxLQUFjO0FBRXhHVCxVQUFBQSxRQUFRLENBQUNDLFFBQVQsQ0FBa0JDLE9BQU8sQ0FBQ0MsTUFBMUIsRUFBa0MsQ0FBbEM7QUFBcUNDLFVBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZOUMsR0FBRyxHQUFHLDBCQUFsQixFQUZtRSxDQUd4Rzs7QUFDQSxjQUFJNEQsV0FBVyxDQUFDTSxhQUFaLENBQTBCQyxVQUExQixJQUF3QzdCLFNBQTVDLEVBQXVEO0FBQ3JEdUIsWUFBQUEsSUFBSSxDQUFDTyxNQUFMLENBQVlDLEVBQVosQ0FBZUMsT0FBZixDQUF1QixrQkFBdkI7QUFDQVQsWUFBQUEsSUFBSSxDQUFDTyxNQUFMLENBQVlHLEdBQVosQ0FBZ0JELE9BQWhCLENBQXdCLG1CQUF4QjtBQUNELFdBSEQsTUFJSztBQUNIVCxZQUFBQSxJQUFJLENBQUNPLE1BQUwsQ0FBWUMsRUFBWixDQUFlQyxPQUFmLENBQXVCRSxjQUFLQyxJQUFMLENBQVViLFdBQVcsQ0FBQ00sYUFBWixDQUEwQkMsVUFBcEMsRUFBZ0Qsa0JBQWhELENBQXZCO0FBQ0FOLFlBQUFBLElBQUksQ0FBQ08sTUFBTCxDQUFZRyxHQUFaLENBQWdCRCxPQUFoQixDQUF3QkUsY0FBS0MsSUFBTCxDQUFVYixXQUFXLENBQUNNLGFBQVosQ0FBMEJDLFVBQXBDLEVBQWdELG1CQUFoRCxDQUF4QjtBQUNEOztBQUNEakIsVUFBQUEsRUFBRSxDQUFDLElBQUQsRUFBT1csSUFBUCxDQUFGO0FBQ0QsU0FiRDtBQWVELE9BOUJEO0FBK0JELEtBaENELE1BaUNLO0FBQ0h6QixNQUFBQSxRQUFRLENBQUNnQixNQUFULENBQWdCLGFBQWhCLEVBQStCLENBQUNRLFdBQUQsRUFBY0MsSUFBZCxLQUF1QjtBQUNwRHBCLFFBQUFBLFFBQVEsQ0FBQ0MsUUFBVCxDQUFrQkMsT0FBTyxDQUFDQyxNQUExQixFQUFrQyxDQUFsQztBQUFxQ0MsUUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVk5QyxHQUFHLEdBQUcsYUFBbEI7QUFDckM0RCxRQUFBQSxXQUFXLENBQUNSLE1BQVosQ0FBbUIsZ0JBQW5CLEVBQXNDakQsTUFBRCxJQUFZO0FBQy9DLGVBQUsyRCxhQUFMLENBQW1CRixXQUFuQixFQUFnQ3pELE1BQWhDO0FBQ0QsU0FGRDtBQUdBMEQsUUFBQUEsSUFBSSxDQUFDRSxtQkFBTCxDQUF5QlgsTUFBekIsQ0FBZ0MsUUFBaEMsRUFBMEMsVUFBU1ksTUFBVCxFQUFpQnpELE9BQWpCLEVBQTBCO0FBQ2xFO0FBQ0F5RCxVQUFBQSxNQUFNLENBQUNaLE1BQVAsQ0FBYyxpQkFBZCxFQUFpQ0MsYUFBakMsRUFGa0UsQ0FHbEU7O0FBQ0FXLFVBQUFBLE1BQU0sQ0FBQ1osTUFBUCxDQUFjLGtCQUFkLEVBQWtDQyxhQUFsQyxFQUprRSxDQUtsRTs7QUFDQVcsVUFBQUEsTUFBTSxDQUFDWixNQUFQLENBQWMsaUJBQWQsRUFBaUNDLGFBQWpDO0FBQ0QsU0FQRDtBQVNELE9BZEQ7QUFlRCxLQTlGYSxDQWdHbEI7OztBQUNJLFFBQUlqQixRQUFRLENBQUNJLEtBQWIsRUFBb0I7QUFDbEIsVUFBSSxJQUFKLEVBQVU7QUFDUkosUUFBQUEsUUFBUSxDQUFDSSxLQUFULENBQWVrQyxJQUFmLENBQW9CekIsUUFBcEIsQ0FBNkIsd0JBQTdCLEVBQXVELENBQUNXLFdBQUQsRUFBY2UsUUFBZCxLQUEyQjtBQUNoRmxDLFVBQUFBLFFBQVEsQ0FBQ0MsUUFBVCxDQUFrQkMsT0FBTyxDQUFDQyxNQUExQixFQUFrQyxDQUFsQztBQUFxQ0MsVUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVk5QyxHQUFHLEdBQUcseUJBQWxCO0FBQ3JDLGVBQUswRSxJQUFMLENBQVV0QyxRQUFWLEVBQW9Cd0IsV0FBcEIsRUFBaUNlLFFBQWpDO0FBQ0QsU0FIRDtBQUlELE9BTEQsTUFNSztBQUNIdkMsUUFBQUEsUUFBUSxDQUFDSSxLQUFULENBQWVrQyxJQUFmLENBQW9CdkIsR0FBcEIsQ0FBd0IsZ0JBQXhCLEVBQTJDUyxXQUFELElBQWlCO0FBQ3pEbkIsVUFBQUEsUUFBUSxDQUFDQyxRQUFULENBQWtCQyxPQUFPLENBQUNDLE1BQTFCLEVBQWtDLENBQWxDO0FBQXFDQyxVQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWTlDLEdBQUcsR0FBRyxnQkFBbEI7QUFDckMsZUFBSzBFLElBQUwsQ0FBVXRDLFFBQVYsRUFBb0J3QixXQUFwQjtBQUNELFNBSEQ7QUFJRDtBQUNGLEtBYkQsTUFjSztBQUNIeEIsTUFBQUEsUUFBUSxDQUFDZ0IsTUFBVCxDQUFnQixNQUFoQixFQUF3QixDQUFDUSxXQUFELEVBQWNlLFFBQWQsS0FBMkI7QUFDakRsQyxRQUFBQSxRQUFRLENBQUNDLFFBQVQsQ0FBa0JDLE9BQU8sQ0FBQ0MsTUFBMUIsRUFBa0MsQ0FBbEM7QUFBcUNDLFFBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZOUMsR0FBRyxHQUFHLE1BQWxCO0FBQ3JDLGFBQUswRSxJQUFMLENBQVV0QyxRQUFWLEVBQW9Cd0IsV0FBcEIsRUFBaUNlLFFBQWpDO0FBQ0QsT0FIRDtBQUlEOztBQUVELFFBQUl2QyxRQUFRLENBQUNJLEtBQWIsRUFBb0I7QUFDbEIsVUFBSSxLQUFLUSxZQUFULEVBQXVCO0FBQ3JCWixRQUFBQSxRQUFRLENBQUNJLEtBQVQsQ0FBZW9DLElBQWYsQ0FBb0IzQixRQUFwQixDQUE2Qix3QkFBN0IsRUFBdUQsQ0FBQ1csV0FBRCxFQUFjZSxRQUFkLEtBQTJCO0FBQ2hGbEMsVUFBQUEsUUFBUSxDQUFDQyxRQUFULENBQWtCQyxPQUFPLENBQUNDLE1BQTFCLEVBQWtDLENBQWxDO0FBQXFDQyxVQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWTlDLEdBQUcsR0FBRyx3QkFBbEI7O0FBQ3JDLGNBQUkyRSxRQUFRLElBQUksSUFBaEIsRUFDQTtBQUNFLGdCQUFJLEtBQUszQixZQUFULEVBQ0E7QUFDRUgsY0FBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksOENBQVo7QUFDQTZCLGNBQUFBLFFBQVE7QUFDVDtBQUNGO0FBQ0YsU0FWRDtBQVdELE9BWkQsTUFhSztBQUNIdkMsUUFBQUEsUUFBUSxDQUFDSSxLQUFULENBQWVvQyxJQUFmLENBQW9CekIsR0FBcEIsQ0FBd0IsZ0JBQXhCLEVBQTBDLE1BQU07QUFDOUNWLFVBQUFBLFFBQVEsQ0FBQ0MsUUFBVCxDQUFrQkMsT0FBTyxDQUFDQyxNQUExQixFQUFrQyxDQUFsQztBQUFxQ0MsVUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVk5QyxHQUFHLEdBQUcsZ0JBQWxCO0FBQ3RDLFNBRkQ7QUFHRDtBQUNGO0FBQ0Y7O0FBRUswRSxFQUFBQSxJQUFOLENBQVd0QyxRQUFYLEVBQXFCd0IsV0FBckIsRUFBa0NlLFFBQWxDLEVBQTRDO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDdENwQyxZQUFBQSxVQURzQyxHQUN6QnFCLFdBQVcsQ0FBQ3BCLEtBRGE7QUFFdENxQyxZQUFBQSxPQUZzQyxHQUU1QixFQUY0Qjs7QUFHMUMsZ0JBQUl0QyxVQUFKLEVBQWdCO0FBQ2RBLGNBQUFBLFVBQVUsR0FBRyxJQUFiLENBRGMsQ0FNcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUtLLGFBNUNELE1BNkNLO0FBQ0hBLGNBQUFBLFVBQVUsR0FBRyxLQUFiO0FBSUFzQyxjQUFBQSxPQUFPLEdBQUdqQixXQUFXLENBQUNrQixNQUFaLENBQW1CQyxNQUFuQixDQUEwQixDQUFDQyxDQUFELEVBQUlDLENBQUosS0FBVUQsQ0FBQyxDQUFDRSxNQUFGLENBQVNELENBQUMsQ0FBQ0osT0FBWCxDQUFwQyxFQUF5RCxFQUF6RCxDQUFWOztBQUVBLG1CQUFTMUUsTUFBVCxJQUFtQjBFLE9BQW5CLEVBQTRCO0FBQ3BCTSxnQkFBQUEsSUFEb0IsR0FDYixLQUFJLENBQUNuRSxZQUFMLENBQWtCYixNQUFNLENBQUNzRCxRQUF6QixDQURhO0FBRTFCWixnQkFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVlxQyxJQUFaLEVBRjBCLENBRzFCO0FBQ0Q7QUFLRjs7QUFDS0MsWUFBQUEsS0FqRW9DLEdBaUU1QixLQUFJLENBQUM5RCxNQUFMLENBQVlDLE1BQU0sQ0FBQ0MsSUFBUCxDQUFZLEtBQUksQ0FBQ0YsTUFBakIsRUFBeUIsQ0FBekIsQ0FBWixDQWpFNEI7QUFrRXRDK0QsWUFBQUEsVUFsRXNDLEdBa0V6QmIsY0FBS0MsSUFBTCxDQUFVckMsUUFBUSxDQUFDaUQsVUFBbkIsRUFBK0IsS0FBSSxDQUFDQyxNQUFwQyxDQWxFeUIsRUFtRTFDOztBQUNBLGdCQUFJbEQsUUFBUSxDQUFDaUQsVUFBVCxLQUF3QixHQUF4QixJQUErQmpELFFBQVEsQ0FBQzdCLE9BQVQsQ0FBaUJnRixTQUFwRCxFQUErRDtBQUM3REYsY0FBQUEsVUFBVSxHQUFHYixjQUFLQyxJQUFMLENBQVVyQyxRQUFRLENBQUM3QixPQUFULENBQWlCZ0YsU0FBakIsQ0FBMkJDLFdBQXJDLEVBQWtESCxVQUFsRCxDQUFiO0FBQ0Q7O0FBQ0dJLFlBQUFBLFNBdkVzQyxHQXVFMUIsRUF2RTBCO0FBeUV0Q0MsWUFBQUEsT0F6RXNDLEdBeUU1QixLQUFJLENBQUNDLGVBQUwsQ0FBcUIvQixXQUFyQixFQUFrQzZCLFNBQWxDLEVBQTZDSixVQUE3QyxFQUF5REQsS0FBekQsQ0F6RTRCO0FBQUE7QUFBQSxtQkEyRXBDTSxPQTNFb0M7O0FBQUE7QUE2RTFDLGdCQUFJLEtBQUksQ0FBQ3hELEtBQUwsSUFBYyxLQUFJLENBQUN6QixLQUFMLElBQWMsQ0FBNUIsSUFBaUNnRixTQUFTLENBQUNoRSxNQUFWLElBQW9CLENBQXpELEVBQTREO0FBQ3REbUUsY0FBQUEsR0FEc0QsR0FDaEQsc0JBQXNCLEtBQUksQ0FBQ0MsSUFEcUI7QUFFMURwRCxjQUFBQSxRQUFRLENBQUNDLFFBQVQsQ0FBa0JDLE9BQU8sQ0FBQ0MsTUFBMUIsRUFBa0MsQ0FBbEM7QUFBcUNDLGNBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZOUMsR0FBRyxHQUFHLG1DQUFOLEdBQTRDNEYsR0FBeEQ7QUFDckMsY0FBQSxLQUFJLENBQUNuRixLQUFMO0FBQ01xRixjQUFBQSxHQUpvRCxHQUk5Q0MsT0FBTyxDQUFDLEtBQUQsQ0FKdUM7QUFLMURELGNBQUFBLEdBQUcsQ0FBQ0YsR0FBRCxDQUFIO0FBQ0Q7O0FBQ0QsZ0JBQUlqQixRQUFRLElBQUksSUFBaEIsRUFBcUI7QUFBRUEsY0FBQUEsUUFBUTtBQUFJOztBQXBGTztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFxRjNDO0FBRUQ7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBZUFnQixFQUFBQSxlQUFlLENBQUMvQixXQUFELEVBQWM2QixTQUFkLEVBQXlCSCxNQUF6QixFQUFpQztBQUFFVSxJQUFBQSxPQUFPLEdBQUMsUUFBVjtBQUFvQkMsSUFBQUEsS0FBcEI7QUFBMkJDLElBQUFBLFFBQVEsR0FBQyxFQUFwQztBQUF3Q0MsSUFBQUEsV0FBVyxHQUFDLEVBQXBEO0FBQXdEQyxJQUFBQSxHQUF4RDtBQUE2REMsSUFBQUE7QUFBN0QsR0FBakMsRUFBMEc7QUFDdkgsUUFBSUMsTUFBTSxHQUFHLEtBQUtDLGdCQUFMLEVBQWI7O0FBQ0FOLElBQUFBLEtBQUssR0FBR0EsS0FBSyxLQUFLRCxPQUFPLEtBQUssU0FBWixHQUF3QixjQUF4QixHQUF5QyxnQkFBOUMsQ0FBYjtBQUVBLFdBQU8sSUFBSVEsT0FBSixDQUFZLENBQUNDLE9BQUQsRUFBVUMsTUFBVixLQUFxQjtBQUN0QztBQUNBO0FBQ0EsWUFBTUMsV0FBVyxHQUFHLE1BQU07QUFDeEIsWUFBSWxCLFNBQVMsQ0FBQ2hFLE1BQWQsRUFBc0I7QUFDcEI7QUFDQWlGLFVBQUFBLE1BQU0sQ0FBQyxJQUFJRSxLQUFKLENBQVVuQixTQUFTLENBQUNoQixJQUFWLENBQWUsRUFBZixDQUFWLENBQUQsQ0FBTjtBQUNELFNBSEQsTUFHTztBQUNMO0FBQ0FnQyxVQUFBQSxPQUFPO0FBQ1I7QUFDRixPQVJEOztBQVVBLFlBQU1JLFlBQVksR0FBR3JDLGNBQUtDLElBQUwsQ0FBVSxHQUFWLEVBQWUsV0FBZixFQUE0QixVQUE1QixDQUFyQjs7QUFDQSxVQUFJOUQsWUFBR0MsVUFBSCxDQUFjaUcsWUFBZCxDQUFKLEVBQWlDO0FBQy9CcEUsUUFBQUEsUUFBUSxDQUFDQyxRQUFULENBQWtCQyxPQUFPLENBQUNDLE1BQTFCLEVBQWtDLENBQWxDO0FBQXFDQyxRQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWTlDLEdBQUcsR0FBRyx5QkFBTixHQUFrQzZHLFlBQTlDO0FBQ3JDVixRQUFBQSxXQUFXLENBQUNXLElBQVosQ0FBaUJELFlBQWpCO0FBQ0Q7O0FBR0QsVUFBSSxLQUFLckcsU0FBVCxFQUFvQjtBQUNsQiwwQkFBTzhFLE1BQVA7QUFDQSwwQkFBT0EsTUFBUDs7QUFDQTNFLG9CQUFHb0csYUFBSCxDQUFpQnZDLGNBQUtDLElBQUwsQ0FBVWEsTUFBVixFQUFrQixXQUFsQixDQUFqQixFQUFpRCx5QkFBUztBQUFFMEIsVUFBQUEsUUFBUSxFQUFFLEtBQUtDO0FBQWpCLFNBQVQsQ0FBakQsRUFBMEYsTUFBMUY7O0FBQ0F0RyxvQkFBR29HLGFBQUgsQ0FBaUJ2QyxjQUFLQyxJQUFMLENBQVVhLE1BQVYsRUFBa0IsVUFBbEIsQ0FBakIsRUFBZ0QsOEJBQWM7QUFBRVcsVUFBQUEsS0FBRjtBQUFTQyxVQUFBQSxRQUFUO0FBQW1CRixVQUFBQSxPQUFuQjtBQUE0QkssVUFBQUEsU0FBNUI7QUFBdUNGLFVBQUFBO0FBQXZDLFNBQWQsQ0FBaEQsRUFBcUgsTUFBckg7O0FBQ0F4RixvQkFBR29HLGFBQUgsQ0FBaUJ2QyxjQUFLQyxJQUFMLENBQVVhLE1BQVYsRUFBa0IsZ0JBQWxCLENBQWpCLEVBQXNELG9DQUFvQmMsR0FBcEIsRUFBeUJELFdBQXpCLEVBQXNDYixNQUF0QyxDQUF0RCxFQUFxRyxNQUFyRztBQUNEOztBQUNELFdBQUs5RSxTQUFMLEdBQWlCLEtBQWpCO0FBRUEsVUFBSTZELEVBQUo7QUFDQUEsTUFBQUEsRUFBRSxHQUFHLHNCQUFMLENBOUJzQyxDQWdDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFJQSxVQUFJNkMsS0FBSyxHQUFHLEVBQVo7O0FBQ0EsVUFBSSxLQUFLaEYsS0FBVCxFQUFnQjtBQUFFZ0YsUUFBQUEsS0FBSyxHQUFHLENBQUMsS0FBRCxFQUFRLE9BQVIsQ0FBUjtBQUEwQixPQUE1QyxNQUNLO0FBQUVBLFFBQUFBLEtBQUssR0FBRyxDQUFDLEtBQUQsRUFBUSxPQUFSLENBQVI7QUFBMEI7O0FBRWpDLFVBQUksS0FBS2xGLFFBQUwsS0FBa0IsSUFBbEIsSUFBMEJxQyxFQUFFLEtBQUssS0FBS3JDLFFBQTFDLEVBQW9EO0FBQ2xELGFBQUtBLFFBQUwsR0FBZ0JxQyxFQUFoQixDQURrRCxDQUVsRDs7QUFDQSxjQUFNckMsUUFBUSxHQUFHd0MsY0FBS0MsSUFBTCxDQUFVYSxNQUFWLEVBQWtCLGFBQWxCLENBQWpCOztBQUNBM0Usb0JBQUdvRyxhQUFILENBQWlCL0UsUUFBakIsRUFBMkJxQyxFQUEzQixFQUErQixNQUEvQjs7QUFDQTVCLFFBQUFBLFFBQVEsQ0FBQ0MsUUFBVCxDQUFrQkMsT0FBTyxDQUFDQyxNQUExQixFQUFrQyxDQUFsQztBQUFxQ0MsUUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVk5QyxHQUFHLEdBQUksZ0NBQStCc0YsTUFBTyxFQUF6RDs7QUFFckMsWUFBSSxLQUFLcEQsS0FBTCxJQUFjLENBQUNuQyxRQUFmLElBQTJCLENBQUMsS0FBS21DLEtBQXJDLEVBQTRDO0FBQzFDLGNBQUkzQixPQUFPLEdBQUc7QUFBRTRHLFlBQUFBLEdBQUcsRUFBRTdCLE1BQVA7QUFBZThCLFlBQUFBLE1BQU0sRUFBRSxJQUF2QjtBQUE2QkMsWUFBQUEsS0FBSyxFQUFFLE1BQXBDO0FBQTRDQyxZQUFBQSxRQUFRLEVBQUU7QUFBdEQsV0FBZDtBQUNBLGNBQUlDLE9BQU8sR0FBRyxJQUFkOztBQUNBLGNBQUk1RSxPQUFPLENBQUM2RSxHQUFSLENBQVlDLGdCQUFaLElBQWlDLEtBQXJDLEVBQTRDO0FBQzFDRixZQUFBQSxPQUFPLEdBQUcsS0FBVjtBQUNEOztBQUNEMUUsVUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVl5RSxPQUFaO0FBQ0EsMENBQWFqQixNQUFiLEVBQXFCWSxLQUFyQixFQUE0QjNHLE9BQTVCLEVBQXFDcUQsV0FBckMsRUFBa0Q2QixTQUFsRCxFQUE2RDhCLE9BQTdELEVBQXNFRyxJQUF0RSxDQUNFLFlBQVc7QUFBRWYsWUFBQUEsV0FBVztBQUFJLFdBRDlCLEVBRUUsVUFBU2dCLE1BQVQsRUFBaUI7QUFBRWxCLFlBQUFBLE9BQU8sQ0FBQ2tCLE1BQUQsQ0FBUDtBQUFpQixXQUZ0QztBQUlEO0FBRUYsT0FwQkQsTUFxQks7QUFDSGxGLFFBQUFBLFFBQVEsQ0FBQ0MsUUFBVCxDQUFrQkMsT0FBTyxDQUFDQyxNQUExQixFQUFrQyxDQUFsQztBQUFxQ0MsUUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVk5QyxHQUFHLEdBQUcsd0JBQWxCO0FBQ3JDMkcsUUFBQUEsV0FBVztBQUNaLE9BdEZxQyxDQXdGdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUdELEtBL0dNLENBQVA7QUFnSEQ7QUFFRDs7Ozs7OztBQUtBdEYsRUFBQUEsaUJBQWlCLEdBQUc7QUFDbEIsV0FBTztBQUNMd0UsTUFBQUEsSUFBSSxFQUFFLElBREQ7QUFFTHZFLE1BQUFBLE1BQU0sRUFBRSxFQUZIO0FBR0xzRyxNQUFBQSxLQUFLLEVBQUUsS0FIRjtBQUlMMUYsTUFBQUEsS0FBSyxFQUFFLEtBSkY7QUFLTDJGLE1BQUFBLElBQUksRUFBRSxhQUxEOztBQU9MO0FBQ0F2QyxNQUFBQSxNQUFNLEVBQUUsV0FSSDtBQVNMVSxNQUFBQSxPQUFPLEVBQUUsUUFUSjtBQVVMRSxNQUFBQSxRQUFRLEVBQUUsSUFWTDtBQVdMQyxNQUFBQSxXQUFXLEVBQUUsRUFYUjtBQVlMRSxNQUFBQSxTQUFTLEVBQUUsRUFaTjtBQWFMckQsTUFBQUEsWUFBWSxFQUFFLEtBYlQ7QUFjTGlFLE1BQUFBLFVBQVUsRUFBRSxLQWRQO0FBZUxhLE1BQUFBLGlCQUFpQixFQUFFQyx1QkFmZDtBQWdCTEMsTUFBQUEsV0FBVyxFQUFFO0FBQ2I7O0FBakJLLEtBQVA7QUFtQkQ7O0FBRURsRSxFQUFBQSxhQUFhLENBQUNGLFdBQUQsRUFBY3pELE1BQWQsRUFBc0I7QUFDakMsU0FBSzRCLFdBQUwsR0FBbUI1QixNQUFNLENBQUNzRCxRQUExQjs7QUFDQSxRQUFJdEQsTUFBTSxDQUFDc0QsUUFBUCxJQUFtQnRELE1BQU0sQ0FBQ3NELFFBQVAsQ0FBZ0J3RSxLQUFoQixDQUFzQixLQUFLSixJQUEzQixDQUFuQixJQUF1RCxDQUFDMUgsTUFBTSxDQUFDc0QsUUFBUCxDQUFnQndFLEtBQWhCLENBQXNCLGNBQXRCLENBQXhELElBQWlHLENBQUM5SCxNQUFNLENBQUNzRCxRQUFQLENBQWdCd0UsS0FBaEIsQ0FBdUIsYUFBWXBJLFlBQWEsR0FBaEQsQ0FBdEcsRUFBMko7QUFDekosWUFBTXFJLE9BQU8sR0FBRyxNQUFNO0FBQ3BCLGFBQUtsSCxZQUFMLENBQWtCLEtBQUtlLFdBQXZCLElBQXNDLENBQ3BDLElBQUksS0FBS2YsWUFBTCxDQUFrQixLQUFLZSxXQUF2QixLQUF1QyxFQUEzQyxDQURvQyxFQUVwQyxHQUFHLEtBQUsrRixpQkFBTCxDQUF1QjNILE1BQU0sQ0FBQ2dJLE9BQVAsQ0FBZUMsTUFBdEMsRUFBOEN4RSxXQUE5QyxFQUEyRHpELE1BQTNELEVBQW1FTixZQUFuRSxDQUZpQyxDQUF0QztBQUlELE9BTEQ7O0FBTUEsVUFBSSxLQUFLK0gsS0FBVCxFQUFnQjtBQUNkTSxRQUFBQSxPQUFPO0FBQ1IsT0FGRCxNQUVPO0FBQ0wsWUFBSTtBQUFFQSxVQUFBQSxPQUFPO0FBQUssU0FBbEIsQ0FBbUIsT0FBT3hFLENBQVAsRUFDbkI7QUFDRWIsVUFBQUEsT0FBTyxDQUFDYyxLQUFSLENBQWMscUJBQXFCLEtBQUs1QixXQUF4QztBQUNBYyxVQUFBQSxPQUFPLENBQUNjLEtBQVIsQ0FBY0QsQ0FBZDtBQUNEO0FBQ0Y7QUFDRjtBQUNGO0FBRUQ7Ozs7Ozs7O0FBTUE3QixFQUFBQSxvQkFBb0IsQ0FBQ0QsSUFBRCxFQUFPd0QsS0FBUCxFQUFjO0FBQ2hDLFFBQUk7QUFBRWdCLE1BQUFBLEdBQUY7QUFBT2EsTUFBQUE7QUFBUCxRQUFzQjdCLEtBQTFCOztBQUVBLFFBQUk2QixVQUFKLEVBQWdCO0FBQ2Q3QixNQUFBQSxLQUFLLENBQUM0QyxXQUFOLEdBQW9CLEtBQXBCO0FBQ0Q7O0FBRUQsUUFBSTVCLEdBQUosRUFBUztBQUNQO0FBQ0EsWUFBTSxJQUFJUSxLQUFKLENBQVcsR0FBRTNHLGVBQU1vSSxHQUFOLENBQVUsaUVBQVYsQ0FBNkUseUNBQTFGLENBQU4sQ0FGTyxDQUlQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDRCxLQVRELE1BU087QUFDTCxVQUFJO0FBQ0ZqRCxRQUFBQSxLQUFLLENBQUNnQixHQUFOLEdBQVk1QixjQUFLOEQsT0FBTCxDQUFhLG1CQUFRLGFBQVIsRUFBdUI7QUFBRUMsVUFBQUEsT0FBTyxFQUFFNUYsT0FBTyxDQUFDd0UsR0FBUjtBQUFYLFNBQXZCLENBQWIsQ0FBWjtBQUNBL0IsUUFBQUEsS0FBSyxDQUFDZSxXQUFOLEdBQW9CLENBQUMsSUFBSWYsS0FBSyxDQUFDZSxXQUFOLElBQXFCLEVBQXpCLENBQUQsRUFBK0IzQixjQUFLOEQsT0FBTCxDQUFhbEQsS0FBSyxDQUFDZ0IsR0FBbkIsQ0FBL0IsQ0FBcEI7QUFDQWhCLFFBQUFBLEtBQUssQ0FBQ2MsUUFBTixHQUFpQmQsS0FBSyxDQUFDYyxRQUFOLElBQWtCLEtBQUtzQyxhQUFMLENBQW1CcEQsS0FBSyxDQUFDZ0IsR0FBekIsQ0FBbkM7QUFDRCxPQUpELENBSUUsT0FBTzFDLENBQVAsRUFBVTtBQUNWO0FBQ0EsY0FBTSxJQUFJa0QsS0FBSixDQUFXLGlGQUFYLENBQU47QUFDRDtBQUNGO0FBQ0YsR0EzZTBDLENBNmUzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7OztBQU1BNEIsRUFBQUEsYUFBYSxDQUFDcEMsR0FBRCxFQUFNO0FBQ2pCLFVBQU1xQyxVQUFVLEdBQUdqRSxjQUFLQyxJQUFMLENBQVUyQixHQUFWLEVBQWUsSUFBZixDQUFuQjs7QUFDQSxXQUFPekYsWUFBRytILFdBQUgsQ0FBZUQsVUFBZixFQUNMO0FBREssS0FFSkUsTUFGSSxDQUVHQyxHQUFHLElBQUlqSSxZQUFHQyxVQUFILENBQWM0RCxjQUFLQyxJQUFMLENBQVVnRSxVQUFWLEVBQXNCRyxHQUF0QixFQUEyQixjQUEzQixDQUFkLENBRlYsRUFHTDtBQUhLLEtBSUpDLEdBSkksQ0FJQUQsR0FBRyxJQUFJO0FBQ1IsWUFBTUUsV0FBVyxHQUFHakksSUFBSSxDQUFDQyxLQUFMLENBQVdILFlBQUdJLFlBQUgsQ0FBZ0J5RCxjQUFLQyxJQUFMLENBQVVnRSxVQUFWLEVBQXNCRyxHQUF0QixFQUEyQixjQUEzQixDQUFoQixDQUFYLENBQXBCLENBRFEsQ0FFUjs7QUFDQSxVQUFHRSxXQUFXLENBQUN4QyxNQUFaLElBQXNCd0MsV0FBVyxDQUFDeEMsTUFBWixDQUFtQnlDLElBQW5CLEtBQTRCLE9BQXJELEVBQThEO0FBQzFELGVBQU9ELFdBQVcsQ0FBQ3hDLE1BQVosQ0FBbUIxRSxJQUExQjtBQUNIO0FBQ0osS0FWSSxFQVdMO0FBWEssS0FZSitHLE1BWkksQ0FZRy9HLElBQUksSUFBSUEsSUFaWCxDQUFQO0FBYUQ7QUFFRDs7Ozs7OztBQUtBMkUsRUFBQUEsZ0JBQWdCLEdBQUc7QUFDakIsUUFBSTtBQUFFLGFBQU9SLE9BQU8sQ0FBQyxhQUFELENBQWQ7QUFBK0IsS0FBckMsQ0FDQSxPQUFPckMsQ0FBUCxFQUFVO0FBQUUsYUFBTyxRQUFQO0FBQWlCO0FBQzlCOztBQTNoQjBDLENBQTdDLEMsQ0FpaUJNO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUlOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBT0E7QUFDSTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNKO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFHSTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuaW1wb3J0ICdAYmFiZWwvcG9seWZpbGwnO1xudmFyIHJlYWN0VmVyc2lvbiA9IDBcbnZhciByZWFjdFZlcnNpb25GdWxsID0gJydcbmltcG9ydCBjaGFsayBmcm9tICdjaGFsayc7XG5pbXBvcnQgZnMgZnJvbSAnZnMnO1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgeyBzeW5jIGFzIG1rZGlycCB9IGZyb20gJ21rZGlycCc7XG5pbXBvcnQgeyBleGVjdXRlQXN5bmMgfSBmcm9tICcuL2V4ZWN1dGVBc3luYydcbmltcG9ydCBleHRyYWN0RnJvbUpTWCBmcm9tICcuL2V4dHJhY3RGcm9tSlNYJztcbmltcG9ydCB7IHN5bmMgYXMgcmltcmFmIH0gZnJvbSAncmltcmFmJztcbmltcG9ydCB7IGJ1aWxkWE1MLCBjcmVhdGVBcHBKc29uLCBjcmVhdGVXb3Jrc3BhY2VKc29uIH0gZnJvbSAnLi9hcnRpZmFjdHMnO1xuaW1wb3J0IHsgZ2VuZXJhdGUgfSBmcm9tICdhc3RyaW5nJztcbmltcG9ydCB7IHN5bmMgYXMgcmVzb2x2ZSB9IGZyb20gJ3Jlc29sdmUnO1xubGV0IHdhdGNoaW5nID0gZmFsc2U7XG5jb25zdCBhcHAgPSBgJHtjaGFsay5ncmVlbign4oS5IO+9omV4dO+9ozonKX0gZXh0LXJlYWN0LXdlYnBhY2stcGx1Z2luOiBgO1xuaW1wb3J0ICogYXMgcmVhZGxpbmUgZnJvbSAncmVhZGxpbmUnXG5cbm1vZHVsZS5leHBvcnRzID0gY2xhc3MgRXh0UmVhY3RXZWJwYWNrUGx1Z2luIHtcbiAgLyoqXG4gICAqIEBwYXJhbSB7T2JqZWN0W119IGJ1aWxkc1xuICAgKiBAcGFyYW0ge0Jvb2xlYW59IFtkZWJ1Zz1mYWxzZV0gU2V0IHRvIHRydWUgdG8gcHJldmVudCBjbGVhbnVwIG9mIGJ1aWxkIHRlbXBvcmFyeSBidWlsZCBhcnRpZmFjdHMgdGhhdCBtaWdodCBiZSBoZWxwZnVsIGluIHRyb3VibGVzaG9vdGluZyBpc3N1ZXMuXG4gICAqIGRlcHJlY2F0ZWQgQHBhcmFtIHtTdHJpbmd9IHNkayBUaGUgZnVsbCBwYXRoIHRvIHRoZSBFeHRSZWFjdCBTREtcbiAgICogQHBhcmFtIHtTdHJpbmd9IFt0b29sa2l0PSdtb2Rlcm4nXSBcIm1vZGVyblwiIG9yIFwiY2xhc3NpY1wiXG4gICAqIEBwYXJhbSB7U3RyaW5nfSB0aGVtZSBUaGUgbmFtZSBvZiB0aGUgRXh0UmVhY3QgdGhlbWUgcGFja2FnZSB0byB1c2UsIGZvciBleGFtcGxlIFwidGhlbWUtbWF0ZXJpYWxcIlxuICAgKiBAcGFyYW0ge1N0cmluZ1tdfSBwYWNrYWdlcyBBbiBhcnJheSBvZiBFeHRSZWFjdCBwYWNrYWdlcyB0byBpbmNsdWRlXG4gICAqIEBwYXJhbSB7U3RyaW5nW119IG92ZXJyaWRlcyBBbiBhcnJheSB3aXRoIHRoZSBwYXRocyBvZiBkaXJlY3RvcmllcyBvciBmaWxlcyB0byBzZWFyY2guIEFueSBjbGFzc2VzXG4gICAqIGRlY2xhcmVkIGluIHRoZXNlIGxvY2F0aW9ucyB3aWxsIGJlIGF1dG9tYXRpY2FsbHkgcmVxdWlyZWQgYW5kIGluY2x1ZGVkIGluIHRoZSBidWlsZC5cbiAgICogSWYgYW55IGZpbGUgZGVmaW5lcyBhbiBFeHRSZWFjdCBvdmVycmlkZSAodXNpbmcgRXh0LmRlZmluZSB3aXRoIGFuIFwib3ZlcnJpZGVcIiBwcm9wZXJ0eSksXG4gICAqIHRoYXQgb3ZlcnJpZGUgd2lsbCBpbiBmYWN0IG9ubHkgYmUgaW5jbHVkZWQgaW4gdGhlIGJ1aWxkIGlmIHRoZSB0YXJnZXQgY2xhc3Mgc3BlY2lmaWVkXG4gICAqIGluIHRoZSBcIm92ZXJyaWRlXCIgcHJvcGVydHkgaXMgYWxzbyBpbmNsdWRlZC5cbiAgICogQHBhcmFtIHtTdHJpbmd9IG91dHB1dCBUaGUgcGF0aCB0byBkaXJlY3Rvcnkgd2hlcmUgdGhlIEV4dFJlYWN0IGJ1bmRsZSBzaG91bGQgYmUgd3JpdHRlblxuICAgKiBAcGFyYW0ge0Jvb2xlYW59IGFzeW5jaHJvbm91cyBTZXQgdG8gdHJ1ZSB0byBydW4gU2VuY2hhIENtZCBidWlsZHMgYXN5bmNocm9ub3VzbHkuIFRoaXMgbWFrZXMgdGhlIHdlYnBhY2sgYnVpbGQgZmluaXNoIG11Y2ggZmFzdGVyLCBidXQgdGhlIGFwcCBtYXkgbm90IGxvYWQgY29ycmVjdGx5IGluIHlvdXIgYnJvd3NlciB1bnRpbCBTZW5jaGEgQ21kIGlzIGZpbmlzaGVkIGJ1aWxkaW5nIHRoZSBFeHRSZWFjdCBidW5kbGVcbiAgICogQHBhcmFtIHtCb29sZWFufSBwcm9kdWN0aW9uIFNldCB0byB0cnVlIGZvciBwcm9kdWN0aW9uIGJ1aWxkcy4gIFRoaXMgdGVsbCBTZW5jaGEgQ21kIHRvIGNvbXByZXNzIHRoZSBnZW5lcmF0ZWQgSlMgYnVuZGxlLlxuICAgKiBAcGFyYW0ge0Jvb2xlYW59IHRyZWVTaGFraW5nIFNldCB0byBmYWxzZSB0byBkaXNhYmxlIHRyZWUgc2hha2luZyBpbiBkZXZlbG9wbWVudCBidWlsZHMuICBUaGlzIG1ha2VzIGluY3JlbWVudGFsIHJlYnVpbGRzIGZhc3RlciBhcyBhbGwgRXh0UmVhY3QgY29tcG9uZW50cyBhcmUgaW5jbHVkZWQgaW4gdGhlIGV4dC5qcyBidW5kbGUgaW4gdGhlIGluaXRpYWwgYnVpbGQgYW5kIHRodXMgdGhlIGJ1bmRsZSBkb2VzIG5vdCBuZWVkIHRvIGJlIHJlYnVpbHQgYWZ0ZXIgZWFjaCBjaGFuZ2UuIERlZmF1bHRzIHRvIHRydWUuXG4gICAqL1xuICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgdGhpcy5maXJzdFRpbWUgPSB0cnVlXG4gICAgdGhpcy5jb3VudCA9IDBcbiAgICAvL2NhbiBiZSBpbiBkZXZkZXBlbmRlbmNpZXMgLSBhY2NvdW50IGZvciB0aGlzOiByZWFjdDogXCIxNS4xNi4wXCJcbiAgICB2YXIgcGtnID0gKGZzLmV4aXN0c1N5bmMoJ3BhY2thZ2UuanNvbicpICYmIEpTT04ucGFyc2UoZnMucmVhZEZpbGVTeW5jKCdwYWNrYWdlLmpzb24nLCAndXRmLTgnKSkgfHwge30pXG4gICAgcmVhY3RWZXJzaW9uRnVsbCA9IHBrZy5kZXBlbmRlbmNpZXMucmVhY3RcbiAgICB2YXIgaXMxNiA9IHJlYWN0VmVyc2lvbkZ1bGwuaW5jbHVkZXMoXCIxNlwiKVxuICAgIGlmIChpczE2KSB7IHJlYWN0VmVyc2lvbiA9IDE2IH1cbiAgICBlbHNlIHsgcmVhY3RWZXJzaW9uID0gMTUgfVxuICAgIHRoaXMucmVhY3RWZXJzaW9uID0gcmVhY3RWZXJzaW9uXG4gICAgdGhpcy5yZWFjdFZlcnNpb25GdWxsID0gcmVhY3RWZXJzaW9uRnVsbFxuICAgIGNvbnN0IGV4dFJlYWN0UmMgPSAoZnMuZXhpc3RzU3luYygnLmV4dC1yZWFjdHJjJykgJiYgSlNPTi5wYXJzZShmcy5yZWFkRmlsZVN5bmMoJy5leHQtcmVhY3RyYycsICd1dGYtOCcpKSB8fCB7fSlcbiAgICBvcHRpb25zID0geyAuLi50aGlzLmdldERlZmF1bHRPcHRpb25zKCksIC4uLm9wdGlvbnMsIC4uLmV4dFJlYWN0UmMgfVxuICAgIGNvbnN0IHsgYnVpbGRzIH0gPSBvcHRpb25zXG4gICAgaWYgKE9iamVjdC5rZXlzKGJ1aWxkcykubGVuZ3RoID09PSAwKSB7XG4gICAgICBjb25zdCB7IGJ1aWxkcywgLi4uYnVpbGRPcHRpb25zIH0gPSBvcHRpb25zXG4gICAgICBidWlsZHMuZXh0ID0gYnVpbGRPcHRpb25zXG4gICAgfVxuICAgIGZvciAobGV0IG5hbWUgaW4gYnVpbGRzKSB7XG4gICAgICB0aGlzLl92YWxpZGF0ZUJ1aWxkQ29uZmlnKG5hbWUsIGJ1aWxkc1tuYW1lXSlcbiAgICB9XG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCB7XG4gICAgICAuLi5vcHRpb25zLFxuICAgICAgY3VycmVudEZpbGU6IG51bGwsXG4gICAgICBtYW5pZmVzdDogbnVsbCxcbiAgICAgIGRlcGVuZGVuY2llczogW11cbiAgICB9KVxuICB9XG5cbiAgd2F0Y2hSdW4oKSB7XG4gICAgdGhpcy53YXRjaCA9IHRydWVcbiAgfVxuXG4gIGFwcGx5KGNvbXBpbGVyKSB7XG4gICAgaWYgKHRoaXMud2VicGFja1ZlcnNpb24gPT0gdW5kZWZpbmVkKSB7XG4gICAgICBjb25zdCBpc1dlYnBhY2s0ID0gY29tcGlsZXIuaG9va3M7XG4gICAgICBpZiAoaXNXZWJwYWNrNCkge3RoaXMud2VicGFja1ZlcnNpb24gPSAnSVMgd2VicGFjayA0J31cbiAgICAgIGVsc2Uge3RoaXMud2VicGFja1ZlcnNpb24gPSAnTk9UIHdlYnBhY2sgNCd9XG4gICAgICByZWFkbGluZS5jdXJzb3JUbyhwcm9jZXNzLnN0ZG91dCwgMCk7Y29uc29sZS5sb2coYXBwICsgJ3JlYWN0VmVyc2lvbjogJyArIHRoaXMucmVhY3RWZXJzaW9uRnVsbCArICcsICcgKyB0aGlzLndlYnBhY2tWZXJzaW9uKVxuICAgIH1cbiAgICBjb25zdCBtZSA9IHRoaXNcblxuICAgIGlmIChjb21waWxlci5ob29rcykge1xuICAgICAgaWYgKHRoaXMuYXN5bmNocm9ub3VzKSB7XG4gICAgICAgIGNvbXBpbGVyLmhvb2tzLndhdGNoUnVuLnRhcEFzeW5jKCdleHQtcmVhY3Qtd2F0Y2gtcnVuIChhc3luYyknLCAod2F0Y2hpbmcsIGNiKSA9PiB7XG4gICAgICAgICAgcmVhZGxpbmUuY3Vyc29yVG8ocHJvY2Vzcy5zdGRvdXQsIDApO2NvbnNvbGUubG9nKGFwcCArICdleHQtcmVhY3Qtd2F0Y2gtcnVuIChhc3luYyknKVxuICAgICAgICAgIHRoaXMud2F0Y2hSdW4oKVxuICAgICAgICAgIGNiKClcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBjb21waWxlci5ob29rcy53YXRjaFJ1bi50YXAoJ2V4dC1yZWFjdC13YXRjaC1ydW4nLCAod2F0Y2hpbmcpID0+IHtcbiAgICAgICAgICByZWFkbGluZS5jdXJzb3JUbyhwcm9jZXNzLnN0ZG91dCwgMCk7Y29uc29sZS5sb2coYXBwICsgJ2V4dC1yZWFjdC13YXRjaC1ydW4nKVxuICAgICAgICAgIHRoaXMud2F0Y2hSdW4oKVxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGNvbXBpbGVyLnBsdWdpbignd2F0Y2gtcnVuJywgKHdhdGNoaW5nLCBjYikgPT4ge1xuICAgICAgICByZWFkbGluZS5jdXJzb3JUbyhwcm9jZXNzLnN0ZG91dCwgMCk7Y29uc29sZS5sb2coYXBwICsgJ3dhdGNoLXJ1bicpXG4gICAgICAgIHRoaXMud2F0Y2hSdW4oKVxuICAgICAgICBjYigpXG4gICAgICB9KVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFkZHMgdGhlIGNvZGUgZm9yIHRoZSBzcGVjaWZpZWQgZnVuY3Rpb24gY2FsbCB0byB0aGUgbWFuaWZlc3QuanMgZmlsZVxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBjYWxsIEEgZnVuY3Rpb24gY2FsbCBBU1Qgbm9kZS5cbiAgICAgKi9cbiAgICBjb25zdCBhZGRUb01hbmlmZXN0ID0gZnVuY3Rpb24oY2FsbCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgZmlsZSA9IHRoaXMuc3RhdGUubW9kdWxlLnJlc291cmNlO1xuICAgICAgICBtZS5kZXBlbmRlbmNpZXNbZmlsZV0gPSBbIC4uLihtZS5kZXBlbmRlbmNpZXNbZmlsZV0gfHwgW10pLCBnZW5lcmF0ZShjYWxsKSBdO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjb25zb2xlLmVycm9yKGBFcnJvciBwcm9jZXNzaW5nICR7ZmlsZX1gKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgaWYgKGNvbXBpbGVyLmhvb2tzKSB7XG4gICAgICBjb21waWxlci5ob29rcy5jb21waWxhdGlvbi50YXAoJ2V4dC1yZWFjdC1jb21waWxhdGlvbicsIChjb21waWxhdGlvbixkYXRhKSA9PiB7XG4gICAgICAgIHJlYWRsaW5lLmN1cnNvclRvKHByb2Nlc3Muc3Rkb3V0LCAwKTtjb25zb2xlLmxvZyhhcHAgKyAnZXh0LXJlYWN0LWNvbXBpbGF0aW9uJylcbiAgICAgICAgY29tcGlsYXRpb24uaG9va3Muc3VjY2VlZE1vZHVsZS50YXAoJ2V4dC1yZWFjdC1zdWNjZWVkLW1vZHVsZScsIChtb2R1bGUpID0+IHtcbiAgICAgICAgICB0aGlzLnN1Y2NlZWRNb2R1bGUoY29tcGlsYXRpb24sIG1vZHVsZSlcbiAgICAgICAgfSlcblxuICAgICAgICBkYXRhLm5vcm1hbE1vZHVsZUZhY3RvcnkucGx1Z2luKFwicGFyc2VyXCIsIGZ1bmN0aW9uKHBhcnNlciwgb3B0aW9ucykge1xuICAgICAgICAgIC8vIGV4dHJhY3QgeHR5cGVzIGFuZCBjbGFzc2VzIGZyb20gRXh0LmNyZWF0ZSBjYWxsc1xuICAgICAgICAgIHBhcnNlci5wbHVnaW4oJ2NhbGwgRXh0LmNyZWF0ZScsIGFkZFRvTWFuaWZlc3QpO1xuICAgICAgICAgIC8vIGNvcHkgRXh0LnJlcXVpcmUgY2FsbHMgdG8gdGhlIG1hbmlmZXN0LiAgVGhpcyBhbGxvd3MgdGhlIHVzZXJzIHRvIGV4cGxpY2l0bHkgcmVxdWlyZSBhIGNsYXNzIGlmIHRoZSBwbHVnaW4gZmFpbHMgdG8gZGV0ZWN0IGl0LlxuICAgICAgICAgIHBhcnNlci5wbHVnaW4oJ2NhbGwgRXh0LnJlcXVpcmUnLCBhZGRUb01hbmlmZXN0KTtcbiAgICAgICAgICAvLyBjb3B5IEV4dC5kZWZpbmUgY2FsbHMgdG8gdGhlIG1hbmlmZXN0LiAgVGhpcyBhbGxvd3MgdXNlcnMgdG8gd3JpdGUgc3RhbmRhcmQgRXh0UmVhY3QgY2xhc3Nlcy5cbiAgICAgICAgICBwYXJzZXIucGx1Z2luKCdjYWxsIEV4dC5kZWZpbmUnLCBhZGRUb01hbmlmZXN0KTtcbiAgICAgICAgfSlcblxuICAgICAgICBjb21waWxhdGlvbi5ob29rcy5odG1sV2VicGFja1BsdWdpbkJlZm9yZUh0bWxHZW5lcmF0aW9uLnRhcEFzeW5jKCdleHQtcmVhY3QtaHRtbGdlbmVyYXRpb24nLChkYXRhLCBjYikgPT4ge1xuXG4gICAgICAgICAgcmVhZGxpbmUuY3Vyc29yVG8ocHJvY2Vzcy5zdGRvdXQsIDApO2NvbnNvbGUubG9nKGFwcCArICdleHQtcmVhY3QtaHRtbGdlbmVyYXRpb24nKVxuICAgICAgICAgIC8vcmVhZGxpbmUuY3Vyc29yVG8ocHJvY2Vzcy5zdGRvdXQsIDApO2NvbnNvbGUubG9nKGFwcCArIGNvbXBpbGF0aW9uLm91dHB1dE9wdGlvbnMucHVibGljUGF0aClcbiAgICAgICAgICBpZiAoY29tcGlsYXRpb24ub3V0cHV0T3B0aW9ucy5wdWJsaWNQYXRoID09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgZGF0YS5hc3NldHMuanMudW5zaGlmdCgnZXh0LXJlYWN0L2V4dC5qcycpXG4gICAgICAgICAgICBkYXRhLmFzc2V0cy5jc3MudW5zaGlmdCgnZXh0LXJlYWN0L2V4dC5jc3MnKVxuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGRhdGEuYXNzZXRzLmpzLnVuc2hpZnQocGF0aC5qb2luKGNvbXBpbGF0aW9uLm91dHB1dE9wdGlvbnMucHVibGljUGF0aCwgJ2V4dC1yZWFjdC9leHQuanMnKSlcbiAgICAgICAgICAgIGRhdGEuYXNzZXRzLmNzcy51bnNoaWZ0KHBhdGguam9pbihjb21waWxhdGlvbi5vdXRwdXRPcHRpb25zLnB1YmxpY1BhdGgsICdleHQtcmVhY3QvZXh0LmNzcycpKVxuICAgICAgICAgIH1cbiAgICAgICAgICBjYihudWxsLCBkYXRhKVxuICAgICAgICB9KVxuXG4gICAgICB9KVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGNvbXBpbGVyLnBsdWdpbignY29tcGlsYXRpb24nLCAoY29tcGlsYXRpb24sIGRhdGEpID0+IHtcbiAgICAgICAgcmVhZGxpbmUuY3Vyc29yVG8ocHJvY2Vzcy5zdGRvdXQsIDApO2NvbnNvbGUubG9nKGFwcCArICdjb21waWxhdGlvbicpXG4gICAgICAgIGNvbXBpbGF0aW9uLnBsdWdpbignc3VjY2VlZC1tb2R1bGUnLCAobW9kdWxlKSA9PiB7XG4gICAgICAgICAgdGhpcy5zdWNjZWVkTW9kdWxlKGNvbXBpbGF0aW9uLCBtb2R1bGUpXG4gICAgICAgIH0pXG4gICAgICAgIGRhdGEubm9ybWFsTW9kdWxlRmFjdG9yeS5wbHVnaW4oXCJwYXJzZXJcIiwgZnVuY3Rpb24ocGFyc2VyLCBvcHRpb25zKSB7XG4gICAgICAgICAgLy8gZXh0cmFjdCB4dHlwZXMgYW5kIGNsYXNzZXMgZnJvbSBFeHQuY3JlYXRlIGNhbGxzXG4gICAgICAgICAgcGFyc2VyLnBsdWdpbignY2FsbCBFeHQuY3JlYXRlJywgYWRkVG9NYW5pZmVzdCk7XG4gICAgICAgICAgLy8gY29weSBFeHQucmVxdWlyZSBjYWxscyB0byB0aGUgbWFuaWZlc3QuICBUaGlzIGFsbG93cyB0aGUgdXNlcnMgdG8gZXhwbGljaXRseSByZXF1aXJlIGEgY2xhc3MgaWYgdGhlIHBsdWdpbiBmYWlscyB0byBkZXRlY3QgaXQuXG4gICAgICAgICAgcGFyc2VyLnBsdWdpbignY2FsbCBFeHQucmVxdWlyZScsIGFkZFRvTWFuaWZlc3QpO1xuICAgICAgICAgIC8vIGNvcHkgRXh0LmRlZmluZSBjYWxscyB0byB0aGUgbWFuaWZlc3QuICBUaGlzIGFsbG93cyB1c2VycyB0byB3cml0ZSBzdGFuZGFyZCBFeHRSZWFjdCBjbGFzc2VzLlxuICAgICAgICAgIHBhcnNlci5wbHVnaW4oJ2NhbGwgRXh0LmRlZmluZScsIGFkZFRvTWFuaWZlc3QpO1xuICAgICAgICB9KVxuXG4gICAgICB9KVxuICAgIH1cblxuLy8qZW1pdCAtIG9uY2UgYWxsIG1vZHVsZXMgYXJlIHByb2Nlc3NlZCwgY3JlYXRlIHRoZSBvcHRpbWl6ZWQgRXh0UmVhY3QgYnVpbGQuXG4gICAgaWYgKGNvbXBpbGVyLmhvb2tzKSB7XG4gICAgICBpZiAodHJ1ZSkge1xuICAgICAgICBjb21waWxlci5ob29rcy5lbWl0LnRhcEFzeW5jKCdleHQtcmVhY3QtZW1pdCAoYXN5bmMpJywgKGNvbXBpbGF0aW9uLCBjYWxsYmFjaykgPT4ge1xuICAgICAgICAgIHJlYWRsaW5lLmN1cnNvclRvKHByb2Nlc3Muc3Rkb3V0LCAwKTtjb25zb2xlLmxvZyhhcHAgKyAnZXh0LXJlYWN0LWVtaXQgIChhc3luYyknKVxuICAgICAgICAgIHRoaXMuZW1pdChjb21waWxlciwgY29tcGlsYXRpb24sIGNhbGxiYWNrKVxuICAgICAgICB9KVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGNvbXBpbGVyLmhvb2tzLmVtaXQudGFwKCdleHQtcmVhY3QtZW1pdCcsIChjb21waWxhdGlvbikgPT4ge1xuICAgICAgICAgIHJlYWRsaW5lLmN1cnNvclRvKHByb2Nlc3Muc3Rkb3V0LCAwKTtjb25zb2xlLmxvZyhhcHAgKyAnZXh0LXJlYWN0LWVtaXQnKVxuICAgICAgICAgIHRoaXMuZW1pdChjb21waWxlciwgY29tcGlsYXRpb24pXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgY29tcGlsZXIucGx1Z2luKCdlbWl0JywgKGNvbXBpbGF0aW9uLCBjYWxsYmFjaykgPT4ge1xuICAgICAgICByZWFkbGluZS5jdXJzb3JUbyhwcm9jZXNzLnN0ZG91dCwgMCk7Y29uc29sZS5sb2coYXBwICsgJ2VtaXQnKVxuICAgICAgICB0aGlzLmVtaXQoY29tcGlsZXIsIGNvbXBpbGF0aW9uLCBjYWxsYmFjaylcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgaWYgKGNvbXBpbGVyLmhvb2tzKSB7XG4gICAgICBpZiAodGhpcy5hc3luY2hyb25vdXMpIHtcbiAgICAgICAgY29tcGlsZXIuaG9va3MuZG9uZS50YXBBc3luYygnZXh0LXJlYWN0LWRvbmUgKGFzeW5jKScsIChjb21waWxhdGlvbiwgY2FsbGJhY2spID0+IHtcbiAgICAgICAgICByZWFkbGluZS5jdXJzb3JUbyhwcm9jZXNzLnN0ZG91dCwgMCk7Y29uc29sZS5sb2coYXBwICsgJ2V4dC1yZWFjdC1kb25lIChhc3luYyknKVxuICAgICAgICAgIGlmIChjYWxsYmFjayAhPSBudWxsKSBcbiAgICAgICAgICB7XG4gICAgICAgICAgICBpZiAodGhpcy5hc3luY2hyb25vdXMpIFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBjb25zb2xlLmxvZygnY2FsbGluZyBjYWxsYmFjayBmb3IgZXh0LXJlYWN0LWVtaXQgIChhc3luYyknKVxuICAgICAgICAgICAgICBjYWxsYmFjaygpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGNvbXBpbGVyLmhvb2tzLmRvbmUudGFwKCdleHQtcmVhY3QtZG9uZScsICgpID0+IHtcbiAgICAgICAgICByZWFkbGluZS5jdXJzb3JUbyhwcm9jZXNzLnN0ZG91dCwgMCk7Y29uc29sZS5sb2coYXBwICsgJ2V4dC1yZWFjdC1kb25lJylcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBhc3luYyBlbWl0KGNvbXBpbGVyLCBjb21waWxhdGlvbiwgY2FsbGJhY2spIHtcbiAgICB2YXIgaXNXZWJwYWNrNCA9IGNvbXBpbGF0aW9uLmhvb2tzO1xuICAgIHZhciBtb2R1bGVzID0gW11cbiAgICBpZiAoaXNXZWJwYWNrNCkge1xuICAgICAgaXNXZWJwYWNrNCA9IHRydWVcblxuXG5cblxuLy8gICAgICAgbW9kdWxlcyA9IGNvbXBpbGF0aW9uLmNodW5rcy5yZWR1Y2UoKGEsIGIpID0+IGEuY29uY2F0KGIuX21vZHVsZXMpLCBbXSlcbi8vIC8vICAgICAgY29uc29sZS5sb2cobW9kdWxlcylcbi8vICAgICAgIHZhciBpID0gMFxuLy8gICAgICAgdmFyIHRoZU1vZHVsZSA9ICcnXG4vLyAgICAgICBmb3IgKGxldCBtb2R1bGUgb2YgbW9kdWxlcykge1xuLy8gICAgICAgICBpZiAoaSA9PSAwKSB7XG4vLyAgICAgICAgICAgdGhlTW9kdWxlID0gbW9kdWxlXG4vLyAgICAgICAgICAgaSsrXG4vLyAgICAgICAgIH1cbi8vIC8vY29uc3QgZGVwcyA9IHRoaXMuZGVwZW5kZW5jaWVzW21vZHVsZS5yZXNvdXJjZV1cbi8vICAgICAgICAgLy9jb25zb2xlLmxvZyhkZXBzKVxuLy8gICAgICAgICAvL2lmIChkZXBzKSBzdGF0ZW1lbnRzID0gc3RhdGVtZW50cy5jb25jYXQoZGVwcyk7XG4vLyAgICAgICB9XG4vLyAgICAgICB2YXIgdGhlUGF0aCA9IHBhdGguam9pbihjb21waWxlci5vdXRwdXRQYXRoLCAnbW9kdWxlLnR4dCcpXG4vLyAgICAgICAvL2NvbnNvbGUubG9nKHRoZVBhdGgpXG5cbi8vICAgICAgIC8vdmFyIG8gPSB7fTtcbi8vICAgICAgIC8vby5vID0gdGhlTW9kdWxlO1xuLy8gICAgICAgLy9jb25zb2xlLmxvZyh0aGVNb2R1bGVbMF0uY29udGV4dClcbiAgICAgIFxuLy8gICAgICAgdmFyIGNhY2hlID0gW107XG4vLyAgICAgICB2YXIgaCA9IEpTT04uc3RyaW5naWZ5KHRoZU1vZHVsZSwgZnVuY3Rpb24oa2V5LCB2YWx1ZSkge1xuLy8gICAgICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICE9PSBudWxsKSB7XG4vLyAgICAgICAgICAgICAgIGlmIChjYWNoZS5pbmRleE9mKHZhbHVlKSAhPT0gLTEpIHtcbi8vICAgICAgICAgICAgICAgICAgIC8vIENpcmN1bGFyIHJlZmVyZW5jZSBmb3VuZCwgZGlzY2FyZCBrZXlcbi8vICAgICAgICAgICAgICAgICAgIHJldHVybjtcbi8vICAgICAgICAgICAgICAgfVxuLy8gICAgICAgICAgICAgICAvLyBTdG9yZSB2YWx1ZSBpbiBvdXIgY29sbGVjdGlvblxuLy8gICAgICAgICAgICAgICBjYWNoZS5wdXNoKHZhbHVlKTtcbi8vICAgICAgICAgICB9XG4vLyAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuLy8gICAgICAgfSk7XG4vLyAgICAgICBjYWNoZSA9IG51bGw7IC8vIEVuYWJsZSBnYXJiYWdlIGNvbGxlY3Rpb25cbi8vICAgICAgIC8vZnMud3JpdGVGaWxlU3luYyggdGhlUGF0aCwgaCwgJ3V0ZjgnKVxuXG5cblxuXG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgaXNXZWJwYWNrNCA9IGZhbHNlXG5cblxuXG4gICAgICBtb2R1bGVzID0gY29tcGlsYXRpb24uY2h1bmtzLnJlZHVjZSgoYSwgYikgPT4gYS5jb25jYXQoYi5tb2R1bGVzKSwgW10pXG5cbiAgICAgIGZvciAobGV0IG1vZHVsZSBvZiBtb2R1bGVzKSB7XG4gICAgICAgIGNvbnN0IGRlcHMgPSB0aGlzLmRlcGVuZGVuY2llc1ttb2R1bGUucmVzb3VyY2VdXG4gICAgICAgIGNvbnNvbGUubG9nKGRlcHMpXG4gICAgICAgIC8vaWYgKGRlcHMpIHN0YXRlbWVudHMgPSBzdGF0ZW1lbnRzLmNvbmNhdChkZXBzKTtcbiAgICAgIH1cblxuXG5cblxuICAgIH1cbiAgICBjb25zdCBidWlsZCA9IHRoaXMuYnVpbGRzW09iamVjdC5rZXlzKHRoaXMuYnVpbGRzKVswXV07XG4gICAgbGV0IG91dHB1dFBhdGggPSBwYXRoLmpvaW4oY29tcGlsZXIub3V0cHV0UGF0aCwgdGhpcy5vdXRwdXQpO1xuICAgIC8vIHdlYnBhY2stZGV2LXNlcnZlciBvdmVyd3JpdGVzIHRoZSBvdXRwdXRQYXRoIHRvIFwiL1wiLCBzbyB3ZSBuZWVkIHRvIHByZXBlbmQgY29udGVudEJhc2VcbiAgICBpZiAoY29tcGlsZXIub3V0cHV0UGF0aCA9PT0gJy8nICYmIGNvbXBpbGVyLm9wdGlvbnMuZGV2U2VydmVyKSB7XG4gICAgICBvdXRwdXRQYXRoID0gcGF0aC5qb2luKGNvbXBpbGVyLm9wdGlvbnMuZGV2U2VydmVyLmNvbnRlbnRCYXNlLCBvdXRwdXRQYXRoKTtcbiAgICB9XG4gICAgdmFyIGNtZEVycm9ycyA9IFtdXG5cbiAgICBsZXQgcHJvbWlzZSA9IHRoaXMuX2J1aWxkRXh0QnVuZGxlKGNvbXBpbGF0aW9uLCBjbWRFcnJvcnMsIG91dHB1dFBhdGgsIGJ1aWxkKVxuXG4gICAgYXdhaXQgcHJvbWlzZVxuIFxuICAgIGlmICh0aGlzLndhdGNoICYmIHRoaXMuY291bnQgPT0gMCAmJiBjbWRFcnJvcnMubGVuZ3RoID09IDApIHtcbiAgICAgIHZhciB1cmwgPSAnaHR0cDovL2xvY2FsaG9zdDonICsgdGhpcy5wb3J0XG4gICAgICByZWFkbGluZS5jdXJzb3JUbyhwcm9jZXNzLnN0ZG91dCwgMCk7Y29uc29sZS5sb2coYXBwICsgJ2V4dC1yZWFjdC1lbWl0IC0gb3BlbiBicm93c2VyIGF0ICcgKyB1cmwpXG4gICAgICB0aGlzLmNvdW50KytcbiAgICAgIGNvbnN0IG9wbiA9IHJlcXVpcmUoJ29wbicpXG4gICAgICBvcG4odXJsKVxuICAgIH1cbiAgICBpZiAoY2FsbGJhY2sgIT0gbnVsbCl7IGNhbGxiYWNrKCkgfVxuICB9XG5cbiAgLyoqXG4gICAvKipcbiAgICAqIEJ1aWxkcyBhIG1pbmltYWwgdmVyc2lvbiBvZiB0aGUgRXh0UmVhY3QgZnJhbWV3b3JrIGJhc2VkIG9uIHRoZSBjbGFzc2VzIHVzZWRcbiAgICAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lIFRoZSBuYW1lIG9mIHRoZSBidWlsZFxuICAgICogQHBhcmFtIHtNb2R1bGVbXX0gbW9kdWxlcyB3ZWJwYWNrIG1vZHVsZXNcbiAgICAqIEBwYXJhbSB7U3RyaW5nfSBvdXRwdXQgVGhlIHBhdGggdG8gd2hlcmUgdGhlIGZyYW1ld29yayBidWlsZCBzaG91bGQgYmUgd3JpdHRlblxuICAgICogQHBhcmFtIHtTdHJpbmd9IFt0b29sa2l0PSdtb2Rlcm4nXSBcIm1vZGVyblwiIG9yIFwiY2xhc3NpY1wiXG4gICAgKiBAcGFyYW0ge1N0cmluZ30gb3V0cHV0IFRoZSBwYXRoIHRvIHRoZSBkaXJlY3RvcnkgdG8gY3JlYXRlIHdoaWNoIHdpbGwgY29udGFpbiB0aGUganMgYW5kIGNzcyBidW5kbGVzXG4gICAgKiBAcGFyYW0ge1N0cmluZ30gdGhlbWUgVGhlIG5hbWUgb2YgdGhlIEV4dFJlYWN0IHRoZW1lIHBhY2thZ2UgdG8gdXNlLCBmb3IgZXhhbXBsZSBcInRoZW1lLW1hdGVyaWFsXCJcbiAgICAqIEBwYXJhbSB7U3RyaW5nW119IHBhY2thZ2VzIEFuIGFycmF5IG9mIEV4dFJlYWN0IHBhY2thZ2VzIHRvIGluY2x1ZGVcbiAgICAqIEBwYXJhbSB7U3RyaW5nW119IHBhY2thZ2VEaXJzIERpcmVjdG9yaWVzIGNvbnRhaW5pbmcgcGFja2FnZXNcbiAgICAqIEBwYXJhbSB7U3RyaW5nW119IG92ZXJyaWRlcyBBbiBhcnJheSBvZiBsb2NhdGlvbnMgZm9yIG92ZXJyaWRlc1xuICAgICogQHBhcmFtIHtTdHJpbmd9IHNkayBUaGUgZnVsbCBwYXRoIHRvIHRoZSBFeHRSZWFjdCBTREtcbiAgICAqIEBwcml2YXRlXG4gICAgKi9cbiAgX2J1aWxkRXh0QnVuZGxlKGNvbXBpbGF0aW9uLCBjbWRFcnJvcnMsIG91dHB1dCwgeyB0b29sa2l0PSdtb2Rlcm4nLCB0aGVtZSwgcGFja2FnZXM9W10sIHBhY2thZ2VEaXJzPVtdLCBzZGssIG92ZXJyaWRlc30pIHtcbiAgICBsZXQgc2VuY2hhID0gdGhpcy5fZ2V0U2VuY2hDbWRQYXRoKClcbiAgICB0aGVtZSA9IHRoZW1lIHx8ICh0b29sa2l0ID09PSAnY2xhc3NpYycgPyAndGhlbWUtdHJpdG9uJyA6ICd0aGVtZS1tYXRlcmlhbCcpXG5cbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgLy90aGlzLm9uQnVpbGRGYWlsID0gcmVqZWN0XG4gICAgICAvL3RoaXMub25CdWlsZFN1Y2Nlc3MgPSByZXNvbHZlXG4gICAgICBjb25zdCBvbkJ1aWxkRG9uZSA9ICgpID0+IHtcbiAgICAgICAgaWYgKGNtZEVycm9ycy5sZW5ndGgpIHtcbiAgICAgICAgICAvL3RoaXMub25CdWlsZEZhaWwobmV3IEVycm9yKGNtZEVycm9ycy5qb2luKFwiXCIpKSlcbiAgICAgICAgICByZWplY3QobmV3IEVycm9yKGNtZEVycm9ycy5qb2luKFwiXCIpKSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvL3RoaXMub25CdWlsZFN1Y2Nlc3MoKVxuICAgICAgICAgIHJlc29sdmUoKVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHVzZXJQYWNrYWdlcyA9IHBhdGguam9pbignLicsICdleHQtcmVhY3QnLCAncGFja2FnZXMnKVxuICAgICAgaWYgKGZzLmV4aXN0c1N5bmModXNlclBhY2thZ2VzKSkge1xuICAgICAgICByZWFkbGluZS5jdXJzb3JUbyhwcm9jZXNzLnN0ZG91dCwgMCk7Y29uc29sZS5sb2coYXBwICsgJ0FkZGluZyBQYWNrYWdlIEZvbGRlcjogJyArIHVzZXJQYWNrYWdlcylcbiAgICAgICAgcGFja2FnZURpcnMucHVzaCh1c2VyUGFja2FnZXMpXG4gICAgICB9XG5cblxuICAgICAgaWYgKHRoaXMuZmlyc3RUaW1lKSB7XG4gICAgICAgIHJpbXJhZihvdXRwdXQpXG4gICAgICAgIG1rZGlycChvdXRwdXQpXG4gICAgICAgIGZzLndyaXRlRmlsZVN5bmMocGF0aC5qb2luKG91dHB1dCwgJ2J1aWxkLnhtbCcpLCBidWlsZFhNTCh7IGNvbXByZXNzOiB0aGlzLnByb2R1Y3Rpb24gfSksICd1dGY4JylcbiAgICAgICAgZnMud3JpdGVGaWxlU3luYyhwYXRoLmpvaW4ob3V0cHV0LCAnYXBwLmpzb24nKSwgY3JlYXRlQXBwSnNvbih7IHRoZW1lLCBwYWNrYWdlcywgdG9vbGtpdCwgb3ZlcnJpZGVzLCBwYWNrYWdlRGlycyB9KSwgJ3V0ZjgnKVxuICAgICAgICBmcy53cml0ZUZpbGVTeW5jKHBhdGguam9pbihvdXRwdXQsICd3b3Jrc3BhY2UuanNvbicpLCBjcmVhdGVXb3Jrc3BhY2VKc29uKHNkaywgcGFja2FnZURpcnMsIG91dHB1dCksICd1dGY4JylcbiAgICAgIH1cbiAgICAgIHRoaXMuZmlyc3RUaW1lID0gZmFsc2VcblxuICAgICAgbGV0IGpzXG4gICAgICBqcyA9ICdFeHQucmVxdWlyZShcIkV4dC4qXCIpJ1xuXG4gICAgICAvLyBpZiAodGhpcy50cmVlU2hha2luZykge1xuICAgICAgLy8gICAvL2xldCBzdGF0ZW1lbnRzID0gWydFeHQucmVxdWlyZShbXCJFeHQuYXBwLkFwcGxpY2F0aW9uXCIsIFwiRXh0LkNvbXBvbmVudFwiLCBcIkV4dC5XaWRnZXRcIiwgXCJFeHQubGF5b3V0LkZpdFwiLCBcIkV4dC5yZWFjdC5UcmFuc2l0aW9uXCIsIFwiRXh0LnJlYWN0LlJlbmRlcmVyQ2VsbFwiXSknXTsgLy8gZm9yIHNvbWUgcmVhc29uIGNvbW1hbmQgZG9lc24ndCBsb2FkIGNvbXBvbmVudCB3aGVuIG9ubHkgcGFuZWwgaXMgcmVxdWlyZWRcbiAgICAgIC8vICAgbGV0IHN0YXRlbWVudHMgPSBbJ0V4dC5yZXF1aXJlKFtcIkV4dC5hcHAuQXBwbGljYXRpb25cIiwgXCJFeHQuQ29tcG9uZW50XCIsIFwiRXh0LldpZGdldFwiLCBcIkV4dC5sYXlvdXQuRml0XCIsIFwiRXh0LnJlYWN0LlRyYW5zaXRpb25cIl0pJ107IC8vIGZvciBzb21lIHJlYXNvbiBjb21tYW5kIGRvZXNuJ3QgbG9hZCBjb21wb25lbnQgd2hlbiBvbmx5IHBhbmVsIGlzIHJlcXVpcmVkXG4gICAgICAvLyAgIC8vIGlmIChwYWNrYWdlcy5pbmRleE9mKCdyZWFjdG8nKSAhPT0gLTEpIHtcbiAgICAgIC8vICAgLy8gICBzdGF0ZW1lbnRzLnB1c2goJ0V4dC5yZXF1aXJlKFwiRXh0LnJlYWN0LlJlbmRlcmVyQ2VsbFwiKScpO1xuICAgICAgLy8gICAvLyB9XG4gICAgICAvLyAgIC8vbWpnXG4gICAgICAvLyAgIGZvciAobGV0IG1vZHVsZSBvZiBtb2R1bGVzKSB7XG4gICAgICAvLyAgICAgY29uc3QgZGVwcyA9IHRoaXMuZGVwZW5kZW5jaWVzW21vZHVsZS5yZXNvdXJjZV07XG4gICAgICAvLyAgICAgaWYgKGRlcHMpIHN0YXRlbWVudHMgPSBzdGF0ZW1lbnRzLmNvbmNhdChkZXBzKTtcbiAgICAgIC8vICAgfVxuICAgICAgLy8gICBqcyA9IHN0YXRlbWVudHMuam9pbignO1xcbicpO1xuICAgICAgLy8gfSBlbHNlIHtcbiAgICAgIC8vICAganMgPSAnRXh0LnJlcXVpcmUoXCJFeHQuKlwiKSc7XG4gICAgICAvLyB9XG5cblxuXG4gICAgICAvLyBpZiAoZnMuZXhpc3RzU3luYyhwYXRoLmpvaW4oc2RrLCAnZXh0JykpKSB7XG4gICAgICAvLyAgIC8vIGxvY2FsIGNoZWNrb3V0IG9mIHRoZSBTREsgcmVwb1xuICAgICAgLy8gICBwYWNrYWdlRGlycy5wdXNoKHBhdGguam9pbignZXh0JywgJ3BhY2thZ2VzJykpO1xuICAgICAgLy8gICBzZGsgPSBwYXRoLmpvaW4oc2RrLCAnZXh0Jyk7XG4gICAgICAvLyB9XG5cblxuXG4gICAgICB2YXIgcGFybXMgPSBbXVxuICAgICAgaWYgKHRoaXMud2F0Y2gpIHsgcGFybXMgPSBbJ2FwcCcsICd3YXRjaCddIH1cbiAgICAgIGVsc2UgeyBwYXJtcyA9IFsnYXBwJywgJ2J1aWxkJ10gfVxuXG4gICAgICBpZiAodGhpcy5tYW5pZmVzdCA9PT0gbnVsbCB8fCBqcyAhPT0gdGhpcy5tYW5pZmVzdCkge1xuICAgICAgICB0aGlzLm1hbmlmZXN0ID0ganNcbiAgICAgICAgLy9yZWFkbGluZS5jdXJzb3JUbyhwcm9jZXNzLnN0ZG91dCwgMCk7Y29uc29sZS5sb2coYXBwICsgJ3RyZWUgc2hha2luZzogJyArIHRoaXMudHJlZVNoYWtpbmcpXG4gICAgICAgIGNvbnN0IG1hbmlmZXN0ID0gcGF0aC5qb2luKG91dHB1dCwgJ21hbmlmZXN0LmpzJylcbiAgICAgICAgZnMud3JpdGVGaWxlU3luYyhtYW5pZmVzdCwganMsICd1dGY4JylcbiAgICAgICAgcmVhZGxpbmUuY3Vyc29yVG8ocHJvY2Vzcy5zdGRvdXQsIDApO2NvbnNvbGUubG9nKGFwcCArIGBidWlsZGluZyBFeHRSZWFjdCBidW5kbGUgYXQ6ICR7b3V0cHV0fWApXG5cbiAgICAgICAgaWYgKHRoaXMud2F0Y2ggJiYgIXdhdGNoaW5nIHx8ICF0aGlzLndhdGNoKSB7XG4gICAgICAgICAgdmFyIG9wdGlvbnMgPSB7IGN3ZDogb3V0cHV0LCBzaWxlbnQ6IHRydWUsIHN0ZGlvOiAncGlwZScsIGVuY29kaW5nOiAndXRmLTgnfVxuICAgICAgICAgIHZhciB2ZXJib3NlID0gJ25vJ1xuICAgICAgICAgIGlmIChwcm9jZXNzLmVudi5FWFRSRUFDVF9WRVJCT1NFICA9PSAneWVzJykge1xuICAgICAgICAgICAgdmVyYm9zZSA9ICd5ZXMnXG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbnNvbGUubG9nKHZlcmJvc2UpXG4gICAgICAgICAgZXhlY3V0ZUFzeW5jKHNlbmNoYSwgcGFybXMsIG9wdGlvbnMsIGNvbXBpbGF0aW9uLCBjbWRFcnJvcnMsIHZlcmJvc2UpLnRoZW4gKFxuICAgICAgICAgICAgZnVuY3Rpb24oKSB7IG9uQnVpbGREb25lKCkgfSwgXG4gICAgICAgICAgICBmdW5jdGlvbihyZWFzb24pIHsgcmVzb2x2ZShyZWFzb24pIH1cbiAgICAgICAgICApXG4gICAgICAgIH1cblxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHJlYWRsaW5lLmN1cnNvclRvKHByb2Nlc3Muc3Rkb3V0LCAwKTtjb25zb2xlLmxvZyhhcHAgKyAnRXh0IHJlYnVpbGQgTk9UIG5lZWRlZCcpXG4gICAgICAgIG9uQnVpbGREb25lKClcbiAgICAgIH1cblxuICAgICAgLy8gdmFyIHBhcm1zXG4gICAgICAvLyBpZiAodGhpcy53YXRjaCkge1xuICAgICAgLy8gICBpZiAoIXdhdGNoaW5nKSB7XG4gICAgICAvLyAgICAgcGFybXMgPSBbJ2FwcCcsICd3YXRjaCddXG4gICAgICAvLyAgIH1cbiAgICAgIC8vICAgLy8gaWYgKCFjbWRSZWJ1aWxkTmVlZGVkKSB7XG4gICAgICAvLyAgIC8vICAgcmVhZGxpbmUuY3Vyc29yVG8ocHJvY2Vzcy5zdGRvdXQsIDApO2NvbnNvbGUubG9nKGFwcCArICdFeHQgcmVidWlsZCBOT1QgbmVlZGVkJylcbiAgICAgIC8vICAgLy8gICBvbkJ1aWxkRG9uZSgpXG4gICAgICAvLyAgIC8vIH1cbiAgICAgIC8vIH1cbiAgICAgIC8vIGVsc2Uge1xuICAgICAgLy8gICBwYXJtcyA9IFsnYXBwJywgJ2J1aWxkJ11cbiAgICAgIC8vIH1cbiAgICAgIC8vIGlmIChjbWRSZWJ1aWxkTmVlZGVkKSB7XG4gICAgICAvLyAgIHZhciBvcHRpb25zID0geyBjd2Q6IG91dHB1dCwgc2lsZW50OiB0cnVlLCBzdGRpbzogJ3BpcGUnLCBlbmNvZGluZzogJ3V0Zi04J31cbiAgICAgIC8vICAgZXhlY3V0ZUFzeW5jKHNlbmNoYSwgcGFybXMsIG9wdGlvbnMsIGNvbXBpbGF0aW9uLCBjbWRFcnJvcnMpLnRoZW4oZnVuY3Rpb24oKSB7XG4gICAgICAvLyAgICAgb25CdWlsZERvbmUoKVxuICAgICAgLy8gICB9LCBmdW5jdGlvbihyZWFzb24pe1xuICAgICAgLy8gICAgIHJlc29sdmUocmVhc29uKVxuICAgICAgLy8gICB9KVxuICAgICAgLy8gfVxuXG5cbiAgICB9KVxuICB9XG5cbiAgLyoqXG4gICAqIERlZmF1bHQgY29uZmlnIG9wdGlvbnNcbiAgICogQHByb3RlY3RlZFxuICAgKiBAcmV0dXJuIHtPYmplY3R9XG4gICAqL1xuICBnZXREZWZhdWx0T3B0aW9ucygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcG9ydDogODAxNixcbiAgICAgIGJ1aWxkczoge30sXG4gICAgICBkZWJ1ZzogZmFsc2UsXG4gICAgICB3YXRjaDogZmFsc2UsXG4gICAgICB0ZXN0OiAvXFwuKGp8dClzeD8kLyxcblxuICAgICAgLyogYmVnaW4gc2luZ2xlIGJ1aWxkIG9ubHkgKi9cbiAgICAgIG91dHB1dDogJ2V4dC1yZWFjdCcsXG4gICAgICB0b29sa2l0OiAnbW9kZXJuJyxcbiAgICAgIHBhY2thZ2VzOiBudWxsLFxuICAgICAgcGFja2FnZURpcnM6IFtdLFxuICAgICAgb3ZlcnJpZGVzOiBbXSxcbiAgICAgIGFzeW5jaHJvbm91czogZmFsc2UsXG4gICAgICBwcm9kdWN0aW9uOiBmYWxzZSxcbiAgICAgIG1hbmlmZXN0RXh0cmFjdG9yOiBleHRyYWN0RnJvbUpTWCxcbiAgICAgIHRyZWVTaGFraW5nOiBmYWxzZVxuICAgICAgLyogZW5kIHNpbmdsZSBidWlsZCBvbmx5ICovXG4gICAgfVxuICB9XG5cbiAgc3VjY2VlZE1vZHVsZShjb21waWxhdGlvbiwgbW9kdWxlKSB7XG4gICAgdGhpcy5jdXJyZW50RmlsZSA9IG1vZHVsZS5yZXNvdXJjZTtcbiAgICBpZiAobW9kdWxlLnJlc291cmNlICYmIG1vZHVsZS5yZXNvdXJjZS5tYXRjaCh0aGlzLnRlc3QpICYmICFtb2R1bGUucmVzb3VyY2UubWF0Y2goL25vZGVfbW9kdWxlcy8pICYmICFtb2R1bGUucmVzb3VyY2UubWF0Y2goYC9leHQtcmVhY3Qke3JlYWN0VmVyc2lvbn0vYCkpIHtcbiAgICAgIGNvbnN0IGRvUGFyc2UgPSAoKSA9PiB7XG4gICAgICAgIHRoaXMuZGVwZW5kZW5jaWVzW3RoaXMuY3VycmVudEZpbGVdID0gW1xuICAgICAgICAgIC4uLih0aGlzLmRlcGVuZGVuY2llc1t0aGlzLmN1cnJlbnRGaWxlXSB8fCBbXSksXG4gICAgICAgICAgLi4udGhpcy5tYW5pZmVzdEV4dHJhY3Rvcihtb2R1bGUuX3NvdXJjZS5fdmFsdWUsIGNvbXBpbGF0aW9uLCBtb2R1bGUsIHJlYWN0VmVyc2lvbilcbiAgICAgICAgXVxuICAgICAgfVxuICAgICAgaWYgKHRoaXMuZGVidWcpIHtcbiAgICAgICAgZG9QYXJzZSgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdHJ5IHsgZG9QYXJzZSgpOyB9IGNhdGNoIChlKSBcbiAgICAgICAgeyBcbiAgICAgICAgICBjb25zb2xlLmVycm9yKCdcXG5lcnJvciBwYXJzaW5nICcgKyB0aGlzLmN1cnJlbnRGaWxlKTsgXG4gICAgICAgICAgY29uc29sZS5lcnJvcihlKTsgXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2tzIGVhY2ggYnVpbGQgY29uZmlnIGZvciBtaXNzaW5nL2ludmFsaWQgcHJvcGVydGllc1xuICAgKiBAcGFyYW0ge1N0cmluZ30gbmFtZSBUaGUgbmFtZSBvZiB0aGUgYnVpbGRcbiAgICogQHBhcmFtIHtTdHJpbmd9IGJ1aWxkIFRoZSBidWlsZCBjb25maWdcbiAgICogQHByaXZhdGVcbiAgICovXG4gIF92YWxpZGF0ZUJ1aWxkQ29uZmlnKG5hbWUsIGJ1aWxkKSB7XG4gICAgbGV0IHsgc2RrLCBwcm9kdWN0aW9uIH0gPSBidWlsZDtcblxuICAgIGlmIChwcm9kdWN0aW9uKSB7XG4gICAgICBidWlsZC50cmVlU2hha2luZyA9IGZhbHNlO1xuICAgIH1cblxuICAgIGlmIChzZGspIHtcbiAgICAgIC8vY29tcGlsYXRpb24uZXJyb3JzLnB1c2goIG5ldyBFcnJvcihjbWRFcnJvcnMuam9pbihcIlwiKSkgKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKGAke2NoYWxrLnJlZCgnU0RLIHBhcmFtZXRlciBubyBsb25nZXIgc3VwcG9ydGVkIHdpdGggZXh0LXJlYWN0LXdlYnBhY2stcGx1Z2luJyl9ICAtIHVzZSB0aGUgRXh0IEpTIG5wbSBwYWNrYWdlcyBpbnN0ZWFkYCk7XG5cbiAgICAgIC8vIGlmICghZnMuZXhpc3RzU3luYyhzZGspKSB7XG4gICAgICAvLyAgICAgdGhyb3cgbmV3IEVycm9yKGBObyBTREsgZm91bmQgYXQgJHtwYXRoLnJlc29sdmUoc2RrKX0uICBEaWQgeW91IGZvciBnZXQgdG8gbGluay9jb3B5IHlvdXIgRXh0IEpTIFNESyB0byB0aGF0IGxvY2F0aW9uP2ApO1xuICAgICAgLy8gfSBlbHNlIHtcbiAgICAgIC8vICAgICAvL21qZyB0aGlzIG5lZWRlZD8gdGhpcy5fYWRkRXh0UmVhY3RQYWNrYWdlKGJ1aWxkKVxuICAgICAgLy8gfVxuICAgIH0gZWxzZSB7XG4gICAgICB0cnkge1xuICAgICAgICBidWlsZC5zZGsgPSBwYXRoLmRpcm5hbWUocmVzb2x2ZSgnQHNlbmNoYS9leHQnLCB7IGJhc2VkaXI6IHByb2Nlc3MuY3dkKCkgfSkpXG4gICAgICAgIGJ1aWxkLnBhY2thZ2VEaXJzID0gWy4uLihidWlsZC5wYWNrYWdlRGlycyB8fCBbXSksIHBhdGguZGlybmFtZShidWlsZC5zZGspXTtcbiAgICAgICAgYnVpbGQucGFja2FnZXMgPSBidWlsZC5wYWNrYWdlcyB8fCB0aGlzLl9maW5kUGFja2FnZXMoYnVpbGQuc2RrKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy90aHJvdyBuZXcgRXJyb3IoYEBzZW5jaGEvZXh0LW1vZGVybiBub3QgZm91bmQuICBZb3UgY2FuIGluc3RhbGwgaXQgd2l0aCBcIm5wbSBpbnN0YWxsIC0tc2F2ZSBAc2VuY2hhL2V4dC1tb2Rlcm5cIiBvciwgaWYgeW91IGhhdmUgYSBsb2NhbCBjb3B5IG9mIHRoZSBTREssIHNwZWNpZnkgdGhlIHBhdGggdG8gaXQgdXNpbmcgdGhlIFwic2RrXCIgb3B0aW9uIGluIGJ1aWxkIFwiJHtuYW1lfS5cImApO1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEBzZW5jaGEvZXh0IG5vdCBmb3VuZC4gIFlvdSBjYW4gaW5zdGFsbCBpdCB3aXRoIFwibnBtIGluc3RhbGwgLS1zYXZlIEBzZW5jaGEvZXh0YCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy8gLyoqXG4gIC8vICAqIEFkZHMgdGhlIEV4dFJlYWN0IHBhY2thZ2UgaWYgcHJlc2VudCBhbmQgdGhlIHRvb2xraXQgaXMgbW9kZXJuXG4gIC8vICAqIEBwYXJhbSB7T2JqZWN0fSBidWlsZCBcbiAgLy8gICovXG4gIC8vIF9hZGRFeHRSZWFjdFBhY2thZ2UoYnVpbGQpIHtcbiAgLy8gICBpZiAoYnVpbGQudG9vbGtpdCA9PT0gJ2NsYXNzaWMnKSByZXR1cm47XG4gIC8vICAgaWYgKGZzLmV4aXN0c1N5bmMocGF0aC5qb2luKGJ1aWxkLnNkaywgJ2V4dCcsICdtb2Rlcm4nLCAncmVhY3QnKSkgfHwgIC8vIHJlcG9cbiAgLy8gICAgIGZzLmV4aXN0c1N5bmMocGF0aC5qb2luKGJ1aWxkLnNkaywgJ21vZGVybicsICdyZWFjdCcpKSkgeyAvLyBwcm9kdWN0aW9uIGJ1aWxkXG4gIC8vICAgICBpZiAoIWJ1aWxkLnBhY2thZ2VzKSB7XG4gIC8vICAgICAgIGJ1aWxkLnBhY2thZ2VzID0gW107XG4gIC8vICAgICB9XG4gIC8vICAgICBidWlsZC5wYWNrYWdlcy5wdXNoKCdyZWFjdCcpO1xuICAvLyAgIH1cbiAgLy8gfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gdGhlIG5hbWVzIG9mIGFsbCBFeHRSZWFjdCBwYWNrYWdlcyBpbiB0aGUgc2FtZSBwYXJlbnQgZGlyZWN0b3J5IGFzIGV4dC1yZWFjdCAodHlwaWNhbGx5IG5vZGVfbW9kdWxlcy9Ac2VuY2hhKVxuICAgKiBAcHJpdmF0ZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gc2RrIFBhdGggdG8gZXh0LXJlYWN0XG4gICAqIEByZXR1cm4ge1N0cmluZ1tdfVxuICAgKi9cbiAgX2ZpbmRQYWNrYWdlcyhzZGspIHtcbiAgICBjb25zdCBtb2R1bGVzRGlyID0gcGF0aC5qb2luKHNkaywgJy4uJyk7XG4gICAgcmV0dXJuIGZzLnJlYWRkaXJTeW5jKG1vZHVsZXNEaXIpXG4gICAgICAvLyBGaWx0ZXIgb3V0IGRpcmVjdG9yaWVzIHdpdGhvdXQgJ3BhY2thZ2UuanNvbidcbiAgICAgIC5maWx0ZXIoZGlyID0+IGZzLmV4aXN0c1N5bmMocGF0aC5qb2luKG1vZHVsZXNEaXIsIGRpciwgJ3BhY2thZ2UuanNvbicpKSlcbiAgICAgIC8vIEdlbmVyYXRlIGFycmF5IG9mIHBhY2thZ2UgbmFtZXNcbiAgICAgIC5tYXAoZGlyID0+IHtcbiAgICAgICAgICBjb25zdCBwYWNrYWdlSW5mbyA9IEpTT04ucGFyc2UoZnMucmVhZEZpbGVTeW5jKHBhdGguam9pbihtb2R1bGVzRGlyLCBkaXIsICdwYWNrYWdlLmpzb24nKSkpO1xuICAgICAgICAgIC8vIERvbid0IGluY2x1ZGUgdGhlbWUgdHlwZSBwYWNrYWdlcy5cbiAgICAgICAgICBpZihwYWNrYWdlSW5mby5zZW5jaGEgJiYgcGFja2FnZUluZm8uc2VuY2hhLnR5cGUgIT09ICd0aGVtZScpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHBhY2thZ2VJbmZvLnNlbmNoYS5uYW1lO1xuICAgICAgICAgIH1cbiAgICAgIH0pXG4gICAgICAvLyBSZW1vdmUgYW55IHVuZGVmaW5lZHMgZnJvbSBtYXBcbiAgICAgIC5maWx0ZXIobmFtZSA9PiBuYW1lKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBwYXRoIHRvIHRoZSBzZW5jaGEgY21kIGV4ZWN1dGFibGVcbiAgICogQHByaXZhdGVcbiAgICogQHJldHVybiB7U3RyaW5nfVxuICAgKi9cbiAgX2dldFNlbmNoQ21kUGF0aCgpIHtcbiAgICB0cnkgeyByZXR1cm4gcmVxdWlyZSgnQHNlbmNoYS9jbWQnKSB9IFxuICAgIGNhdGNoIChlKSB7IHJldHVybiAnc2VuY2hhJyB9XG4gIH1cbn1cblxuXG5cblxuICAgICAgLy8gaWYgKHRoaXMud2F0Y2gpIHtcbiAgICAgIC8vICAgaWYgKCF3YXRjaGluZykge1xuICAgICAgLy8gICAgIHdhdGNoaW5nID0gZ2F0aGVyRXJyb3JzKGZvcmsoc2VuY2hhLCBbJ2FudCcsICd3YXRjaCddLCB7IGN3ZDogb3V0cHV0LCBzaWxlbnQ6IHRydWUgfSkpO1xuICAgICAgLy8gICAgIHdhdGNoaW5nLnN0ZGVyci5waXBlKHByb2Nlc3Muc3RkZXJyKTtcbiAgICAgIC8vICAgICB3YXRjaGluZy5zdGRvdXQucGlwZShwcm9jZXNzLnN0ZG91dCk7XG4gICAgICAvLyAgICAgd2F0Y2hpbmcuc3Rkb3V0Lm9uKCdkYXRhJywgZGF0YSA9PiB7XG4gICAgICAvLyAgICAgICBpZiAoZGF0YSAmJiBkYXRhLnRvU3RyaW5nKCkubWF0Y2goL1dhaXRpbmcgZm9yIGNoYW5nZXNcXC5cXC5cXC4vKSkge1xuICAgICAgLy8gICAgICAgICBvbkJ1aWxkRG9uZSgpXG4gICAgICAvLyAgICAgICB9XG4gICAgICAvLyAgICAgfSlcbiAgICAgIC8vICAgICB3YXRjaGluZy5vbignZXhpdCcsIG9uQnVpbGREb25lKVxuICAgICAgLy8gICB9XG4gICAgICAvLyAgIGlmICghY21kUmVidWlsZE5lZWRlZCkge1xuICAgICAgLy8gICAgIHJlYWRsaW5lLmN1cnNvclRvKHByb2Nlc3Muc3Rkb3V0LCAwKTtjb25zb2xlLmxvZyhhcHAgKyAnRXh0IHJlYnVpbGQgTk9UIG5lZWRlZCcpXG4gICAgICAvLyAgICAgb25CdWlsZERvbmUoKVxuICAgICAgLy8gICB9XG4gICAgICAvLyAgIGVsc2Uge1xuICAgICAgLy8gICAgIC8vcmVhZGxpbmUuY3Vyc29yVG8ocHJvY2Vzcy5zdGRvdXQsIDApO2NvbnNvbGUubG9nKGFwcCArICdFeHQgcmVidWlsZCBJUyBuZWVkZWQnKVxuICAgICAgLy8gICB9XG4gICAgICAvLyB9IFxuICAgICAgLy8gZWxzZSB7XG4gICAgICAvLyAgIGNvbnN0IGJ1aWxkID0gZ2F0aGVyRXJyb3JzKGZvcmsoc2VuY2hhLCBbJ2FudCcsICdidWlsZCddLCB7IHN0ZGlvOiAnaW5oZXJpdCcsIGVuY29kaW5nOiAndXRmLTgnLCBjd2Q6IG91dHB1dCwgc2lsZW50OiBmYWxzZSB9KSk7XG4gICAgICAvLyAgIHJlYWRsaW5lLmN1cnNvclRvKHByb2Nlc3Muc3Rkb3V0LCAwKTtjb25zb2xlLmxvZyhhcHAgKyAnc2VuY2hhIGFudCBidWlsZCcpXG4gICAgICAvLyAgIGlmKGJ1aWxkLnN0ZG91dCkgeyBidWlsZC5zdGRvdXQucGlwZShwcm9jZXNzLnN0ZG91dCkgfVxuICAgICAgLy8gICBpZihidWlsZC5zdGRlcnIpIHsgYnVpbGQuc3RkZXJyLnBpcGUocHJvY2Vzcy5zdGRlcnIpIH1cbiAgICAgIC8vICAgYnVpbGQub24oJ2V4aXQnLCBvbkJ1aWxkRG9uZSk7XG4gICAgICAvLyB9XG5cblxuXG4vLyBjb25zdCBnYXRoZXJFcnJvcnMyID0gKGNtZCkgPT4ge1xuLy8gICBpZiAoY21kLnN0ZG91dCkge1xuLy8gICAgIGNtZC5zdGRvdXQub24oJ2RhdGEnLCBkYXRhID0+IHtcbi8vICAgICAgIGNvbnN0IG1lc3NhZ2UgPSBkYXRhLnRvU3RyaW5nKCk7XG4vLyAgICAgICBpZiAobWVzc2FnZS5tYXRjaCgvXlxcW0VSUlxcXS8pKSB7XG4vLyAgICAgICAgIGNtZEVycm9ycy5wdXNoKG1lc3NhZ2UucmVwbGFjZSgvXlxcW0VSUlxcXSAvZ2ksICcnKSk7XG4vLyAgICAgICB9XG4vLyAgICAgfSlcbi8vICAgfVxuLy8gICByZXR1cm4gY21kO1xuLy8gfVxuXG4vLyBmdW5jdGlvbiBnYXRoZXJFcnJvcnMgKGNtZCkge1xuLy8gICBpZiAoY21kLnN0ZG91dCkge1xuLy8gICAgIGNtZC5zdGRvdXQub24oJ2RhdGEnLCBkYXRhID0+IHtcbi8vICAgICAgIGNvbnN0IG1lc3NhZ2UgPSBkYXRhLnRvU3RyaW5nKCk7XG4vLyAgICAgICBpZiAobWVzc2FnZS5tYXRjaCgvXlxcW0VSUlxcXS8pKSB7XG4vLyAgICAgICAgIGNtZEVycm9ycy5wdXNoKG1lc3NhZ2UucmVwbGFjZSgvXlxcW0VSUlxcXSAvZ2ksICcnKSk7XG4vLyAgICAgICB9XG4vLyAgICAgfSlcbi8vICAgfVxuLy8gICByZXR1cm4gY21kXG4vLyB9XG5cblxuXG5cblxuXG4vLyBmcm9tIHRoaXMuZW1pdFxuICAgIC8vIHRoZSBmb2xsb3dpbmcgaXMgbmVlZGVkIGZvciBodG1sLXdlYnBhY2stcGx1Z2luIHRvIGluY2x1ZGUgPHNjcmlwdD4gYW5kIDxsaW5rPiB0YWdzIGZvciBFeHRSZWFjdFxuICAgIC8vIGNvbnNvbGUubG9nKCdjb21waWxhdGlvbicpXG4gICAgLy8gY29uc29sZS5sb2coJyoqKioqKioqY29tcGlsYXRpb24uY2h1bmtzWzBdJylcbiAgICAvLyBjb25zb2xlLmxvZyhjb21waWxhdGlvbi5jaHVua3NbMF0uaWQpXG4gICAgLy8gY29uc29sZS5sb2cocGF0aC5qb2luKHRoaXMub3V0cHV0LCAnZXh0LmpzJykpXG4gICAgLy8gY29uc3QganNDaHVuayA9IGNvbXBpbGF0aW9uLmFkZENodW5rKGAke3RoaXMub3V0cHV0fS1qc2ApO1xuICAgIC8vIGpzQ2h1bmsuaGFzUnVudGltZSA9IGpzQ2h1bmsuaXNJbml0aWFsID0gKCkgPT4gdHJ1ZTtcbiAgICAvLyBqc0NodW5rLmZpbGVzLnB1c2gocGF0aC5qb2luKHRoaXMub3V0cHV0LCAnZXh0LmpzJykpO1xuICAgIC8vIGpzQ2h1bmsuZmlsZXMucHVzaChwYXRoLmpvaW4odGhpcy5vdXRwdXQsICdleHQuY3NzJykpO1xuICAgIC8vIGpzQ2h1bmsuaWQgPSAnYWFhYXAnOyAvLyB0aGlzIGZvcmNlcyBodG1sLXdlYnBhY2stcGx1Z2luIHRvIGluY2x1ZGUgZXh0LmpzIGZpcnN0XG4gICAgLy8gY29uc29sZS5sb2coJyoqKioqKioqY29tcGlsYXRpb24uY2h1bmtzWzFdJylcbiAgICAvLyBjb25zb2xlLmxvZyhjb21waWxhdGlvbi5jaHVua3NbMV0uaWQpXG5cbiAgICAvL2lmICh0aGlzLmFzeW5jaHJvbm91cykgY2FsbGJhY2soKTtcbi8vICAgIGNvbnNvbGUubG9nKGNhbGxiYWNrKVxuXG4vLyBpZiAoaXNXZWJwYWNrNCkge1xuLy8gICBjb25zb2xlLmxvZyhwYXRoLmpvaW4odGhpcy5vdXRwdXQsICdleHQuanMnKSlcbi8vICAgY29uc3Qgc3RhdHMgPSBmcy5zdGF0U3luYyhwYXRoLmpvaW4ob3V0cHV0UGF0aCwgJ2V4dC5qcycpKVxuLy8gICBjb25zdCBmaWxlU2l6ZUluQnl0ZXMgPSBzdGF0cy5zaXplXG4vLyAgIGNvbXBpbGF0aW9uLmFzc2V0c1snZXh0LmpzJ10gPSB7XG4vLyAgICAgc291cmNlOiBmdW5jdGlvbigpIHtyZXR1cm4gZnMucmVhZEZpbGVTeW5jKHBhdGguam9pbihvdXRwdXRQYXRoLCAnZXh0LmpzJykpfSxcbi8vICAgICBzaXplOiBmdW5jdGlvbigpIHtyZXR1cm4gZmlsZVNpemVJbkJ5dGVzfVxuLy8gICB9XG4vLyAgIGNvbnNvbGUubG9nKGNvbXBpbGF0aW9uLmVudHJ5cG9pbnRzKVxuXG4vLyAgIHZhciBmaWxlbGlzdCA9ICdJbiB0aGlzIGJ1aWxkOlxcblxcbic7XG5cbi8vICAgLy8gTG9vcCB0aHJvdWdoIGFsbCBjb21waWxlZCBhc3NldHMsXG4vLyAgIC8vIGFkZGluZyBhIG5ldyBsaW5lIGl0ZW0gZm9yIGVhY2ggZmlsZW5hbWUuXG4vLyAgIGZvciAodmFyIGZpbGVuYW1lIGluIGNvbXBpbGF0aW9uLmFzc2V0cykge1xuLy8gICAgIGZpbGVsaXN0ICs9ICgnLSAnKyBmaWxlbmFtZSArJ1xcbicpO1xuLy8gICB9XG5cbi8vICAgLy8gSW5zZXJ0IHRoaXMgbGlzdCBpbnRvIHRoZSB3ZWJwYWNrIGJ1aWxkIGFzIGEgbmV3IGZpbGUgYXNzZXQ6XG4vLyAgIGNvbXBpbGF0aW9uLmFzc2V0c1snZmlsZWxpc3QubWQnXSA9IHtcbi8vICAgICBzb3VyY2UoKSB7XG4vLyAgICAgICByZXR1cm4gZmlsZWxpc3Q7XG4vLyAgICAgfSxcbi8vICAgICBzaXplKCkge1xuLy8gICAgICAgcmV0dXJuIGZpbGVsaXN0Lmxlbmd0aDtcbi8vICAgICB9XG4vLyAgIH1cbi8vIH1cblxuXG4gICAgLy8gaWYgKGNvbXBpbGVyLmhvb2tzKSB7XG4gICAgLy8gICAgIC8vIGluICdleHRyZWFjdC1jb21waWxhdGlvbidcbiAgICAvLyAgICAgLy9odHRwczovL2dpdGh1Yi5jb20vamFrZXRyZW50L2h0bWwtd2VicGFjay10ZW1wbGF0ZVxuICAgIC8vICAgICAvL2h0dHBzOi8vZ2l0aHViLmNvbS9qYW50aW1vbi9odG1sLXdlYnBhY2stcGx1Z2luI1xuICAgIC8vICAgICAvLyB0aGUgZm9sbG93aW5nIGlzIG5lZWRlZCBmb3IgaHRtbC13ZWJwYWNrLXBsdWdpbiB0byBpbmNsdWRlIDxzY3JpcHQ+IGFuZCA8bGluaz4gdGFncyBmb3IgRXh0UmVhY3RcbiAgICAvLyAgICAgY29tcGlsZXIuaG9va3MuaHRtbFdlYnBhY2tQbHVnaW5CZWZvcmVIdG1sR2VuZXJhdGlvbi50YXBBc3luYyhcbiAgICAvLyAgICAgICAnZXh0cmVhY3QtaHRtbGdlbmVyYXRpb24nLFxuICAgIC8vICAgICAgIChkYXRhLCBjYikgPT4ge1xuICAgIC8vICAgICAgICAgcmVhZGxpbmUuY3Vyc29yVG8ocHJvY2Vzcy5zdGRvdXQsIDApO2NvbnNvbGUubG9nKGFwcCArICdleHRyZWFjdC1odG1sZ2VuZXJhdGlvbicpXG4gICAgLy8gICAgICAgICBjb25zb2xlLmxvZygnZGF0YS5hc3NldHMuanMubGVuZ3RoJylcbiAgICAvLyAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEuYXNzZXRzLmpzLmxlbmd0aClcbiAgICAvLyAgICAgICAgIGRhdGEuYXNzZXRzLmpzLnVuc2hpZnQoJ2V4dC1yZWFjdC9leHQuanMnKVxuICAgIC8vICAgICAgICAgZGF0YS5hc3NldHMuY3NzLnVuc2hpZnQoJ2V4dC1yZWFjdC9leHQuY3NzJylcbiAgICAvLyAgICAgICAgIGNiKG51bGwsIGRhdGEpXG4gICAgLy8gICAgICAgfVxuICAgIC8vICAgICApXG4gICAgLy8gICB9XG5cbiJdfQ==