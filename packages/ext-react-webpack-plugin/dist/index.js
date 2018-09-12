'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("@babel/polyfill");

var readline = _interopRequireWildcard(require("readline"));

var _pluginUtil = require("./pluginUtil");

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _chalk = _interopRequireDefault(require("chalk"));

var _mkdirp = require("mkdirp");

var _extractFromJSX = _interopRequireDefault(require("./extractFromJSX"));

var _rimraf = require("rimraf");

var _artifacts = require("./artifacts");

var _astring = require("astring");

var _resolve = require("resolve");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//let watching = false
const pluginName = 'ext-react-webpack-plugin';
const app = (0, _pluginUtil._getApp)(pluginName);

class ExtReactWebpackPlugin {
  /**
   * @param {String} port - the URL port number
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
  getDefaultOptions() {
    return {
      port: 8016,
      profile: 'desktop',
      environment: 'development',
      verbose: 'no',
      currentFile: null,
      manifest: null,
      dependencies: [],
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

  constructor(options) {
    this.firstTime = true;
    this.count = 0; //can be in devdependencies - account for this: react: "15.16.0"

    var pkg = _fs.default.existsSync('package.json') && JSON.parse(_fs.default.readFileSync('package.json', 'utf-8')) || {};
    this.reactVersionFull = pkg.dependencies.react;
    var is16 = this.reactVersionFull.includes("16");

    if (is16) {
      this.reactVersion = 16;
    } else {
      this.reactVersion = 15;
    } //this.reactVersion = reactVersion
    //this.reactVersionFull = reactVersionFull


    const extReactRc = _fs.default.existsSync('.ext-reactrc') && JSON.parse(_fs.default.readFileSync('.ext-reactrc', 'utf-8')) || {};
    this.options = _objectSpread({}, this.getDefaultOptions(), options, extReactRc);
    const {
      builds
    } = this.options;

    if (Object.keys(builds).length === 0) {
      const _this$options = this.options,
            {
        builds
      } = _this$options,
            buildOptions = _objectWithoutProperties(_this$options, ["builds"]);

      builds.ext = buildOptions;
    }

    for (let name in builds) {
      this._validateBuildConfig(name, builds[name]);
    } // this.options = { 
    //   ...options
    // }


    Object.assign(this, _objectSpread({}, this.options));
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

      process.stdout.cursorTo(0);
      console.log((0, _pluginUtil._getVersions)(app, pluginName, 'React'));
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
        compiler.hooks.emit.tapAsync('ext-react-emit-async', (compilation, callback) => {
          readline.cursorTo(process.stdout, 0);
          console.log(app + 'ext-react-emit-async');
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
      var outputPath, parms, verbose, cmdErrors, url, opn;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            //     var isWebpack4 = compilation.hooks;
            //     var modules = []
            //     if (isWebpack4) {
            //       isWebpack4 = true
            // //       modules = compilation.chunks.reduce((a, b) => a.concat(b._modules), [])
            // // //      console.log(modules)
            // //       var i = 0
            // //       var theModule = ''
            // //       for (let module of modules) {
            // //         if (i == 0) {
            // //           theModule = module
            // //           i++
            // //         }
            // // //const deps = this.dependencies[module.resource]
            // //         //console.log(deps)
            // //         //if (deps) statements = statements.concat(deps);
            // //       }
            // //       var thePath = path.join(compiler.outputPath, 'module.txt')
            // //       //console.log(thePath)
            // //       //var o = {};
            // //       //o.o = theModule;
            // //       //console.log(theModule[0].context)
            // //       var cache = [];
            // //       var h = JSON.stringify(theModule, function(key, value) {
            // //           if (typeof value === 'object' && value !== null) {
            // //               if (cache.indexOf(value) !== -1) {
            // //                   // Circular reference found, discard key
            // //                   return;
            // //               }
            // //               // Store value in our collection
            // //               cache.push(value);
            // //           }
            // //           return value;
            // //       });
            // //       cache = null; // Enable garbage collection
            // //       //fs.writeFileSync( thePath, h, 'utf8')
            //     }
            //     else {
            //       isWebpack4 = false
            //       // modules = compilation.chunks.reduce((a, b) => a.concat(b.modules), [])
            //       // for (let module of modules) {
            //       //   const deps = this.dependencies[module.resource]
            //       //   console.log(deps)
            //       //   //if (deps) statements = statements.concat(deps);
            //       // }
            //     }
            //const build = this.builds[Object.keys(this.builds)[0]];
            outputPath = _path.default.join(compiler.outputPath, _this.output); // webpack-dev-server overwrites the outputPath to "/", so we need to prepend contentBase

            if (compiler.outputPath === '/' && compiler.options.devServer) {
              outputPath = _path.default.join(compiler.options.devServer.contentBase, outputPath);
            }

            _this._buildExtFolder(outputPath); // var parms = ['app', 'build', this.options.profile, this.options.environment]
            // var verbose = 'no'
            // if (this.options.verbose != undefined) {
            //   verbose = this.options.verbose
            // }


            parms = ['app', 'build'];
            verbose = 'no';
            cmdErrors = [];
            _context.next = 8;
            return (0, _pluginUtil._buildExtBundle)(compilation, cmdErrors, outputPath, parms, verbose);

          case 8:
            if (_this.watch && _this.count == 0 && cmdErrors.length == 0) {
              url = 'http://localhost:' + _this.port;
              readline.cursorTo(process.stdout, 0);
              console.log(app + 'ext-react-emit - open browser at ' + url);
              _this.count++;
              opn = require('opn');
              opn(url);
            }

            callback();

          case 10:
          case "end":
            return _context.stop();
        }
      }, _callee, this);
    }))();
  }

  _buildExtFolder(output, toolkit = 'modern', theme, packages = [], packageDirs = [], sdk = 'node_modules/@sencha/ext', overrides = []) {
    theme = theme || (toolkit === 'classic' ? 'theme-triton' : 'theme-material');

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

      _fs.default.writeFileSync(_path.default.join(output, 'jsdom-environment.js'), (0, _artifacts.createJSDOMEnvironment)(), 'utf8');

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

    if (this.manifest === null || js !== this.manifest) {
      this.manifest = js; //readline.cursorTo(process.stdout, 0);console.log(app + 'tree shaking: ' + this.treeShaking)

      const manifest = _path.default.join(output, 'manifest.js');

      _fs.default.writeFileSync(manifest, js, 'utf8');

      readline.cursorTo(process.stdout, 0);
      console.log(app + `building ExtReact bundle at: ${output}`);
    } else {
      readline.cursorTo(process.stdout, 0);
      console.log(app + 'ExtReact rebuild NOT needed');
    }
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
  // _buildExtBundle(compilation, cmdErrors, output, { toolkit='modern', theme, packages=[], packageDirs=[], sdk, overrides}) {
  //   let sencha = this._getSenchCmdPath()
  //   theme = theme || (toolkit === 'classic' ? 'theme-triton' : 'theme-material')
  //   return new Promise((resolve, reject) => {
  //     const onBuildDone = () => {
  //       if (cmdErrors.length) {
  //         reject(new Error(cmdErrors.join("")))
  //       } else {
  //         resolve()
  //       }
  //     }
  //     const userPackages = path.join('.', 'ext-react', 'packages')
  //     if (fs.existsSync(userPackages)) {
  //       readline.cursorTo(process.stdout, 0);console.log(app + 'Adding Package Folder: ' + userPackages)
  //       packageDirs.push(userPackages)
  //     }
  //     if (this.firstTime) {
  //       rimraf(output)
  //       mkdirp(output)
  //       fs.writeFileSync(path.join(output, 'build.xml'), buildXML({ compress: this.production }), 'utf8')
  //       fs.writeFileSync(path.join(output, 'jsdom-environment.js'), createJSDOMEnvironment(), 'utf8')
  //       fs.writeFileSync(path.join(output, 'app.json'), createAppJson({ theme, packages, toolkit, overrides, packageDirs }), 'utf8')
  //       fs.writeFileSync(path.join(output, 'workspace.json'), createWorkspaceJson(sdk, packageDirs, output), 'utf8')
  //     }
  //     this.firstTime = false
  //     let js
  //     js = 'Ext.require("Ext.*")'
  //     // if (this.treeShaking) {
  //     //   //let statements = ['Ext.require(["Ext.app.Application", "Ext.Component", "Ext.Widget", "Ext.layout.Fit", "Ext.react.Transition", "Ext.react.RendererCell"])']; // for some reason command doesn't load component when only panel is required
  //     //   let statements = ['Ext.require(["Ext.app.Application", "Ext.Component", "Ext.Widget", "Ext.layout.Fit", "Ext.react.Transition"])']; // for some reason command doesn't load component when only panel is required
  //     //   // if (packages.indexOf('reacto') !== -1) {
  //     //   //   statements.push('Ext.require("Ext.react.RendererCell")');
  //     //   // }
  //     //   //mjg
  //     //   for (let module of modules) {
  //     //     const deps = this.dependencies[module.resource];
  //     //     if (deps) statements = statements.concat(deps);
  //     //   }
  //     //   js = statements.join(';\n');
  //     // } else {
  //     //   js = 'Ext.require("Ext.*")';
  //     // }
  //     // if (fs.existsSync(path.join(sdk, 'ext'))) {
  //     //   // local checkout of the SDK repo
  //     //   packageDirs.push(path.join('ext', 'packages'));
  //     //   sdk = path.join(sdk, 'ext');
  //     // }
  //     var parms = []
  //     if (this.watch) { parms = ['app', 'watch'] }
  //     else { parms = ['app', 'build'] }
  //     if (this.manifest === null || js !== this.manifest) {
  //       this.manifest = js
  //       //readline.cursorTo(process.stdout, 0);console.log(app + 'tree shaking: ' + this.treeShaking)
  //       const manifest = path.join(output, 'manifest.js')
  //       fs.writeFileSync(manifest, js, 'utf8')
  //       readline.cursorTo(process.stdout, 0);console.log(app + `building ExtReact bundle at: ${output}`)
  //       if (this.watch && !watching || !this.watch) {
  //         var options = { cwd: output, silent: true, stdio: 'pipe', encoding: 'utf-8'}
  //         var verbose = 'no'
  //         if (process.env.EXTREACT_VERBOSE  == 'yes') {
  //           verbose = 'yes'
  //         }
  //         executeAsync(sencha, parms, options, compilation, cmdErrors, verbose).then (
  //           function() { onBuildDone() }, 
  //           function(reason) { resolve(reason) }
  //         )
  //       }
  //     }
  //     else {
  //       readline.cursorTo(process.stdout, 0);console.log(app + 'Ext rebuild NOT needed')
  //       onBuildDone()
  //     }
  //     // var parms
  //     // if (this.watch) {
  //     //   if (!watching) {
  //     //     parms = ['app', 'watch']
  //     //   }
  //     //   // if (!cmdRebuildNeeded) {
  //     //   //   readline.cursorTo(process.stdout, 0);console.log(app + 'Ext rebuild NOT needed')
  //     //   //   onBuildDone()
  //     //   // }
  //     // }
  //     // else {
  //     //   parms = ['app', 'build']
  //     // }
  //     // if (cmdRebuildNeeded) {
  //     //   var options = { cwd: output, silent: true, stdio: 'pipe', encoding: 'utf-8'}
  //     //   executeAsync(sencha, parms, options, compilation, cmdErrors).then(function() {
  //     //     onBuildDone()
  //     //   }, function(reason){
  //     //     resolve(reason)
  //     //   })
  //     // }
  //   })
  // }


  succeedModule(compilation, module) {
    this.currentFile = module.resource;

    if (module.resource && module.resource.match(this.test) && !module.resource.match(/node_modules/) && !module.resource.match(`/ext-react${this.reactVersion}/`)) {
      const doParse = () => {
        this.dependencies[this.currentFile] = [...(this.dependencies[this.currentFile] || []), ...this.manifestExtractor(module._source._value, compilation, module, this.reactVersion)];
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

} // /**
//  * Returns the path to the sencha cmd executable
//  * @private
//  * @return {String}
//  */
// _getSenchCmdPath() {
//   try { return require('@sencha/cmd') } 
//   catch (e) { return 'sencha' }
// }
// if (this.watch) {
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


exports.default = ExtReactWebpackPlugin;
module.exports = exports["default"];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJwbHVnaW5OYW1lIiwiYXBwIiwiRXh0UmVhY3RXZWJwYWNrUGx1Z2luIiwiZ2V0RGVmYXVsdE9wdGlvbnMiLCJwb3J0IiwicHJvZmlsZSIsImVudmlyb25tZW50IiwidmVyYm9zZSIsImN1cnJlbnRGaWxlIiwibWFuaWZlc3QiLCJkZXBlbmRlbmNpZXMiLCJidWlsZHMiLCJkZWJ1ZyIsIndhdGNoIiwidGVzdCIsIm91dHB1dCIsInRvb2xraXQiLCJwYWNrYWdlcyIsInBhY2thZ2VEaXJzIiwib3ZlcnJpZGVzIiwiYXN5bmNocm9ub3VzIiwicHJvZHVjdGlvbiIsIm1hbmlmZXN0RXh0cmFjdG9yIiwiZXh0cmFjdEZyb21KU1giLCJ0cmVlU2hha2luZyIsImNvbnN0cnVjdG9yIiwib3B0aW9ucyIsImZpcnN0VGltZSIsImNvdW50IiwicGtnIiwiZnMiLCJleGlzdHNTeW5jIiwiSlNPTiIsInBhcnNlIiwicmVhZEZpbGVTeW5jIiwicmVhY3RWZXJzaW9uRnVsbCIsInJlYWN0IiwiaXMxNiIsImluY2x1ZGVzIiwicmVhY3RWZXJzaW9uIiwiZXh0UmVhY3RSYyIsIk9iamVjdCIsImtleXMiLCJsZW5ndGgiLCJidWlsZE9wdGlvbnMiLCJleHQiLCJuYW1lIiwiX3ZhbGlkYXRlQnVpbGRDb25maWciLCJhc3NpZ24iLCJ3YXRjaFJ1biIsImFwcGx5IiwiY29tcGlsZXIiLCJ3ZWJwYWNrVmVyc2lvbiIsInVuZGVmaW5lZCIsImlzV2VicGFjazQiLCJob29rcyIsInByb2Nlc3MiLCJzdGRvdXQiLCJjdXJzb3JUbyIsImNvbnNvbGUiLCJsb2ciLCJtZSIsInRhcEFzeW5jIiwid2F0Y2hpbmciLCJjYiIsInJlYWRsaW5lIiwidGFwIiwicGx1Z2luIiwiYWRkVG9NYW5pZmVzdCIsImNhbGwiLCJmaWxlIiwic3RhdGUiLCJtb2R1bGUiLCJyZXNvdXJjZSIsImUiLCJlcnJvciIsImNvbXBpbGF0aW9uIiwiZGF0YSIsInN1Y2NlZWRNb2R1bGUiLCJub3JtYWxNb2R1bGVGYWN0b3J5IiwicGFyc2VyIiwiaHRtbFdlYnBhY2tQbHVnaW5CZWZvcmVIdG1sR2VuZXJhdGlvbiIsIm91dHB1dE9wdGlvbnMiLCJwdWJsaWNQYXRoIiwiYXNzZXRzIiwianMiLCJ1bnNoaWZ0IiwiY3NzIiwicGF0aCIsImpvaW4iLCJlbWl0IiwiY2FsbGJhY2siLCJkb25lIiwib3V0cHV0UGF0aCIsImRldlNlcnZlciIsImNvbnRlbnRCYXNlIiwiX2J1aWxkRXh0Rm9sZGVyIiwicGFybXMiLCJjbWRFcnJvcnMiLCJ1cmwiLCJvcG4iLCJyZXF1aXJlIiwidGhlbWUiLCJzZGsiLCJ1c2VyUGFja2FnZXMiLCJwdXNoIiwid3JpdGVGaWxlU3luYyIsImNvbXByZXNzIiwibWF0Y2giLCJkb1BhcnNlIiwiX3NvdXJjZSIsIl92YWx1ZSIsImJ1aWxkIiwiRXJyb3IiLCJjaGFsayIsInJlZCIsImRpcm5hbWUiLCJiYXNlZGlyIiwiY3dkIiwiX2ZpbmRQYWNrYWdlcyIsIm1vZHVsZXNEaXIiLCJyZWFkZGlyU3luYyIsImZpbHRlciIsImRpciIsIm1hcCIsInBhY2thZ2VJbmZvIiwic2VuY2hhIiwidHlwZSJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0E7QUFFQSxNQUFNQSxVQUFVLEdBQUcsMEJBQW5CO0FBQ0EsTUFBTUMsR0FBRyxHQUFHLHlCQUFRRCxVQUFSLENBQVo7O0FBRWUsTUFBTUUscUJBQU4sQ0FBNEI7QUFDekM7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQW1CQUMsRUFBQUEsaUJBQWlCLEdBQUc7QUFDbEIsV0FBTztBQUNMQyxNQUFBQSxJQUFJLEVBQUUsSUFERDtBQUVMQyxNQUFBQSxPQUFPLEVBQUUsU0FGSjtBQUdMQyxNQUFBQSxXQUFXLEVBQUUsYUFIUjtBQUlMQyxNQUFBQSxPQUFPLEVBQUUsSUFK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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCdcbmltcG9ydCAnQGJhYmVsL3BvbHlmaWxsJ1xuaW1wb3J0ICogYXMgcmVhZGxpbmUgZnJvbSAncmVhZGxpbmUnXG5pbXBvcnQgeyBfZ2V0QXBwLCBfZ2V0VmVyc2lvbnMsIF9idWlsZEV4dEJ1bmRsZSB9IGZyb20gJy4vcGx1Z2luVXRpbCdcbmltcG9ydCBmcyBmcm9tICdmcydcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnXG5cbmltcG9ydCBjaGFsayBmcm9tICdjaGFsaydcblxuaW1wb3J0IHsgc3luYyBhcyBta2RpcnAgfSBmcm9tICdta2RpcnAnXG4vL2ltcG9ydCB7IF9idWlsZEV4dEJ1bmRsZSB9IGZyb20gJy4vZXhlY3V0ZUFzeW5jJ1xuaW1wb3J0IGV4dHJhY3RGcm9tSlNYIGZyb20gJy4vZXh0cmFjdEZyb21KU1gnXG5pbXBvcnQgeyBzeW5jIGFzIHJpbXJhZiB9IGZyb20gJ3JpbXJhZidcbmltcG9ydCB7IGJ1aWxkWE1MLCBjcmVhdGVBcHBKc29uLCBjcmVhdGVXb3Jrc3BhY2VKc29uLCBjcmVhdGVKU0RPTUVudmlyb25tZW50IH0gZnJvbSAnLi9hcnRpZmFjdHMnXG5pbXBvcnQgeyBnZW5lcmF0ZSB9IGZyb20gJ2FzdHJpbmcnXG5pbXBvcnQgeyBzeW5jIGFzIHJlc29sdmUgfSBmcm9tICdyZXNvbHZlJ1xuLy9sZXQgd2F0Y2hpbmcgPSBmYWxzZVxuXG5jb25zdCBwbHVnaW5OYW1lID0gJ2V4dC1yZWFjdC13ZWJwYWNrLXBsdWdpbidcbmNvbnN0IGFwcCA9IF9nZXRBcHAocGx1Z2luTmFtZSlcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRXh0UmVhY3RXZWJwYWNrUGx1Z2luIHtcbiAgLyoqXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBwb3J0IC0gdGhlIFVSTCBwb3J0IG51bWJlclxuICAgKiBAcGFyYW0ge09iamVjdFtdfSBidWlsZHNcbiAgICogQHBhcmFtIHtCb29sZWFufSBbZGVidWc9ZmFsc2VdIFNldCB0byB0cnVlIHRvIHByZXZlbnQgY2xlYW51cCBvZiBidWlsZCB0ZW1wb3JhcnkgYnVpbGQgYXJ0aWZhY3RzIHRoYXQgbWlnaHQgYmUgaGVscGZ1bCBpbiB0cm91Ymxlc2hvb3RpbmcgaXNzdWVzLlxuICAgKiBkZXByZWNhdGVkIEBwYXJhbSB7U3RyaW5nfSBzZGsgVGhlIGZ1bGwgcGF0aCB0byB0aGUgRXh0UmVhY3QgU0RLXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBbdG9vbGtpdD0nbW9kZXJuJ10gXCJtb2Rlcm5cIiBvciBcImNsYXNzaWNcIlxuICAgKiBAcGFyYW0ge1N0cmluZ30gdGhlbWUgVGhlIG5hbWUgb2YgdGhlIEV4dFJlYWN0IHRoZW1lIHBhY2thZ2UgdG8gdXNlLCBmb3IgZXhhbXBsZSBcInRoZW1lLW1hdGVyaWFsXCJcbiAgICogQHBhcmFtIHtTdHJpbmdbXX0gcGFja2FnZXMgQW4gYXJyYXkgb2YgRXh0UmVhY3QgcGFja2FnZXMgdG8gaW5jbHVkZVxuICAgKiBAcGFyYW0ge1N0cmluZ1tdfSBvdmVycmlkZXMgQW4gYXJyYXkgd2l0aCB0aGUgcGF0aHMgb2YgZGlyZWN0b3JpZXMgb3IgZmlsZXMgdG8gc2VhcmNoLiBBbnkgY2xhc3Nlc1xuICAgKiBkZWNsYXJlZCBpbiB0aGVzZSBsb2NhdGlvbnMgd2lsbCBiZSBhdXRvbWF0aWNhbGx5IHJlcXVpcmVkIGFuZCBpbmNsdWRlZCBpbiB0aGUgYnVpbGQuXG4gICAqIElmIGFueSBmaWxlIGRlZmluZXMgYW4gRXh0UmVhY3Qgb3ZlcnJpZGUgKHVzaW5nIEV4dC5kZWZpbmUgd2l0aCBhbiBcIm92ZXJyaWRlXCIgcHJvcGVydHkpLFxuICAgKiB0aGF0IG92ZXJyaWRlIHdpbGwgaW4gZmFjdCBvbmx5IGJlIGluY2x1ZGVkIGluIHRoZSBidWlsZCBpZiB0aGUgdGFyZ2V0IGNsYXNzIHNwZWNpZmllZFxuICAgKiBpbiB0aGUgXCJvdmVycmlkZVwiIHByb3BlcnR5IGlzIGFsc28gaW5jbHVkZWQuXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBvdXRwdXQgVGhlIHBhdGggdG8gZGlyZWN0b3J5IHdoZXJlIHRoZSBFeHRSZWFjdCBidW5kbGUgc2hvdWxkIGJlIHdyaXR0ZW5cbiAgICogQHBhcmFtIHtCb29sZWFufSBhc3luY2hyb25vdXMgU2V0IHRvIHRydWUgdG8gcnVuIFNlbmNoYSBDbWQgYnVpbGRzIGFzeW5jaHJvbm91c2x5LiBUaGlzIG1ha2VzIHRoZSB3ZWJwYWNrIGJ1aWxkIGZpbmlzaCBtdWNoIGZhc3RlciwgYnV0IHRoZSBhcHAgbWF5IG5vdCBsb2FkIGNvcnJlY3RseSBpbiB5b3VyIGJyb3dzZXIgdW50aWwgU2VuY2hhIENtZCBpcyBmaW5pc2hlZCBidWlsZGluZyB0aGUgRXh0UmVhY3QgYnVuZGxlXG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gcHJvZHVjdGlvbiBTZXQgdG8gdHJ1ZSBmb3IgcHJvZHVjdGlvbiBidWlsZHMuICBUaGlzIHRlbGwgU2VuY2hhIENtZCB0byBjb21wcmVzcyB0aGUgZ2VuZXJhdGVkIEpTIGJ1bmRsZS5cbiAgICogQHBhcmFtIHtCb29sZWFufSB0cmVlU2hha2luZyBTZXQgdG8gZmFsc2UgdG8gZGlzYWJsZSB0cmVlIHNoYWtpbmcgaW4gZGV2ZWxvcG1lbnQgYnVpbGRzLiAgVGhpcyBtYWtlcyBpbmNyZW1lbnRhbCByZWJ1aWxkcyBmYXN0ZXIgYXMgYWxsIEV4dFJlYWN0IGNvbXBvbmVudHMgYXJlIGluY2x1ZGVkIGluIHRoZSBleHQuanMgYnVuZGxlIGluIHRoZSBpbml0aWFsIGJ1aWxkIGFuZCB0aHVzIHRoZSBidW5kbGUgZG9lcyBub3QgbmVlZCB0byBiZSByZWJ1aWx0IGFmdGVyIGVhY2ggY2hhbmdlLiBEZWZhdWx0cyB0byB0cnVlLlxuICAgKi9cblxuICBnZXREZWZhdWx0T3B0aW9ucygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcG9ydDogODAxNixcbiAgICAgIHByb2ZpbGU6ICdkZXNrdG9wJywgXG4gICAgICBlbnZpcm9ubWVudDogJ2RldmVsb3BtZW50JywgXG4gICAgICB2ZXJib3NlOiAnbm8nLFxuICAgICAgY3VycmVudEZpbGU6IG51bGwsXG4gICAgICBtYW5pZmVzdDogbnVsbCxcbiAgICAgIGRlcGVuZGVuY2llczogW10sXG4gICAgICBidWlsZHM6IHt9LFxuICAgICAgZGVidWc6IGZhbHNlLFxuICAgICAgd2F0Y2g6IGZhbHNlLFxuICAgICAgdGVzdDogL1xcLihqfHQpc3g/JC8sXG4gICAgICAvKiBiZWdpbiBzaW5nbGUgYnVpbGQgb25seSAqL1xuICAgICAgb3V0cHV0OiAnZXh0LXJlYWN0JyxcbiAgICAgIHRvb2xraXQ6ICdtb2Rlcm4nLFxuICAgICAgcGFja2FnZXM6IG51bGwsXG4gICAgICBwYWNrYWdlRGlyczogW10sXG4gICAgICBvdmVycmlkZXM6IFtdLFxuICAgICAgYXN5bmNocm9ub3VzOiBmYWxzZSxcbiAgICAgIHByb2R1Y3Rpb246IGZhbHNlLFxuICAgICAgbWFuaWZlc3RFeHRyYWN0b3I6IGV4dHJhY3RGcm9tSlNYLFxuICAgICAgdHJlZVNoYWtpbmc6IGZhbHNlXG4gICAgICAvKiBlbmQgc2luZ2xlIGJ1aWxkIG9ubHkgKi9cbiAgICB9XG4gIH1cblxuICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG5cbiAgICB0aGlzLmZpcnN0VGltZSA9IHRydWVcbiAgICB0aGlzLmNvdW50ID0gMFxuXG4gICAgLy9jYW4gYmUgaW4gZGV2ZGVwZW5kZW5jaWVzIC0gYWNjb3VudCBmb3IgdGhpczogcmVhY3Q6IFwiMTUuMTYuMFwiXG4gICAgdmFyIHBrZyA9IChmcy5leGlzdHNTeW5jKCdwYWNrYWdlLmpzb24nKSAmJiBKU09OLnBhcnNlKGZzLnJlYWRGaWxlU3luYygncGFja2FnZS5qc29uJywgJ3V0Zi04JykpIHx8IHt9KVxuICAgIHRoaXMucmVhY3RWZXJzaW9uRnVsbCA9IHBrZy5kZXBlbmRlbmNpZXMucmVhY3RcbiAgICB2YXIgaXMxNiA9IHRoaXMucmVhY3RWZXJzaW9uRnVsbC5pbmNsdWRlcyhcIjE2XCIpXG4gICAgaWYgKGlzMTYpIHsgdGhpcy5yZWFjdFZlcnNpb24gPSAxNiB9XG4gICAgZWxzZSB7IHRoaXMucmVhY3RWZXJzaW9uID0gMTUgfVxuICAgIC8vdGhpcy5yZWFjdFZlcnNpb24gPSByZWFjdFZlcnNpb25cbiAgICAvL3RoaXMucmVhY3RWZXJzaW9uRnVsbCA9IHJlYWN0VmVyc2lvbkZ1bGxcblxuICAgIGNvbnN0IGV4dFJlYWN0UmMgPSAoZnMuZXhpc3RzU3luYygnLmV4dC1yZWFjdHJjJykgJiYgSlNPTi5wYXJzZShmcy5yZWFkRmlsZVN5bmMoJy5leHQtcmVhY3RyYycsICd1dGYtOCcpKSB8fCB7fSlcbiAgICB0aGlzLm9wdGlvbnMgPSB7IC4uLnRoaXMuZ2V0RGVmYXVsdE9wdGlvbnMoKSwgLi4ub3B0aW9ucywgLi4uZXh0UmVhY3RSYyB9XG4gICAgY29uc3QgeyBidWlsZHMgfSA9IHRoaXMub3B0aW9uc1xuICAgIGlmIChPYmplY3Qua2V5cyhidWlsZHMpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgY29uc3QgeyBidWlsZHMsIC4uLmJ1aWxkT3B0aW9ucyB9ID0gdGhpcy5vcHRpb25zXG4gICAgICBidWlsZHMuZXh0ID0gYnVpbGRPcHRpb25zXG4gICAgfVxuICAgIGZvciAobGV0IG5hbWUgaW4gYnVpbGRzKSB7XG4gICAgICB0aGlzLl92YWxpZGF0ZUJ1aWxkQ29uZmlnKG5hbWUsIGJ1aWxkc1tuYW1lXSlcbiAgICB9XG5cbiAgICAvLyB0aGlzLm9wdGlvbnMgPSB7IFxuICAgIC8vICAgLi4ub3B0aW9uc1xuICAgIC8vIH1cblxuICAgIE9iamVjdC5hc3NpZ24odGhpcywge1xuICAgICAgLi4udGhpcy5vcHRpb25zXG4gICAgfSlcblxuXG4gIH1cblxuICB3YXRjaFJ1bigpIHtcbiAgICB0aGlzLndhdGNoID0gdHJ1ZVxuICB9XG5cbiAgYXBwbHkoY29tcGlsZXIpIHtcbiAgICBpZiAodGhpcy53ZWJwYWNrVmVyc2lvbiA9PSB1bmRlZmluZWQpIHtcbiAgICAgIGNvbnN0IGlzV2VicGFjazQgPSBjb21waWxlci5ob29rcztcbiAgICAgIGlmIChpc1dlYnBhY2s0KSB7dGhpcy53ZWJwYWNrVmVyc2lvbiA9ICdJUyB3ZWJwYWNrIDQnfVxuICAgICAgZWxzZSB7dGhpcy53ZWJwYWNrVmVyc2lvbiA9ICdOT1Qgd2VicGFjayA0J31cbiAgICAgIHByb2Nlc3Muc3Rkb3V0LmN1cnNvclRvKDApO2NvbnNvbGUubG9nKF9nZXRWZXJzaW9ucyhhcHAsIHBsdWdpbk5hbWUsICdSZWFjdCcpKVxuICAgIH1cbiAgICBjb25zdCBtZSA9IHRoaXNcbiAgICBpZiAoY29tcGlsZXIuaG9va3MpIHtcbiAgICAgIGlmICh0aGlzLmFzeW5jaHJvbm91cykge1xuICAgICAgICBjb21waWxlci5ob29rcy53YXRjaFJ1bi50YXBBc3luYygnZXh0LXJlYWN0LXdhdGNoLXJ1biAoYXN5bmMpJywgKHdhdGNoaW5nLCBjYikgPT4ge1xuICAgICAgICAgIHJlYWRsaW5lLmN1cnNvclRvKHByb2Nlc3Muc3Rkb3V0LCAwKTtjb25zb2xlLmxvZyhhcHAgKyAnZXh0LXJlYWN0LXdhdGNoLXJ1biAoYXN5bmMpJylcbiAgICAgICAgICB0aGlzLndhdGNoUnVuKClcbiAgICAgICAgICBjYigpXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgY29tcGlsZXIuaG9va3Mud2F0Y2hSdW4udGFwKCdleHQtcmVhY3Qtd2F0Y2gtcnVuJywgKHdhdGNoaW5nKSA9PiB7XG4gICAgICAgICAgcmVhZGxpbmUuY3Vyc29yVG8ocHJvY2Vzcy5zdGRvdXQsIDApO2NvbnNvbGUubG9nKGFwcCArICdleHQtcmVhY3Qtd2F0Y2gtcnVuJylcbiAgICAgICAgICB0aGlzLndhdGNoUnVuKClcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBjb21waWxlci5wbHVnaW4oJ3dhdGNoLXJ1bicsICh3YXRjaGluZywgY2IpID0+IHtcbiAgICAgICAgcmVhZGxpbmUuY3Vyc29yVG8ocHJvY2Vzcy5zdGRvdXQsIDApO2NvbnNvbGUubG9nKGFwcCArICd3YXRjaC1ydW4nKVxuICAgICAgICB0aGlzLndhdGNoUnVuKClcbiAgICAgICAgY2IoKVxuICAgICAgfSlcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBZGRzIHRoZSBjb2RlIGZvciB0aGUgc3BlY2lmaWVkIGZ1bmN0aW9uIGNhbGwgdG8gdGhlIG1hbmlmZXN0LmpzIGZpbGVcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gY2FsbCBBIGZ1bmN0aW9uIGNhbGwgQVNUIG5vZGUuXG4gICAgICovXG4gICAgY29uc3QgYWRkVG9NYW5pZmVzdCA9IGZ1bmN0aW9uKGNhbGwpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IGZpbGUgPSB0aGlzLnN0YXRlLm1vZHVsZS5yZXNvdXJjZTtcbiAgICAgICAgbWUuZGVwZW5kZW5jaWVzW2ZpbGVdID0gWyAuLi4obWUuZGVwZW5kZW5jaWVzW2ZpbGVdIHx8IFtdKSwgZ2VuZXJhdGUoY2FsbCkgXTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihgRXJyb3IgcHJvY2Vzc2luZyAke2ZpbGV9YCk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGlmIChjb21waWxlci5ob29rcykge1xuICAgICAgY29tcGlsZXIuaG9va3MuY29tcGlsYXRpb24udGFwKCdleHQtcmVhY3QtY29tcGlsYXRpb24nLCAoY29tcGlsYXRpb24sZGF0YSkgPT4ge1xuICAgICAgICByZWFkbGluZS5jdXJzb3JUbyhwcm9jZXNzLnN0ZG91dCwgMCk7Y29uc29sZS5sb2coYXBwICsgJ2V4dC1yZWFjdC1jb21waWxhdGlvbicpXG4gICAgICAgIGNvbXBpbGF0aW9uLmhvb2tzLnN1Y2NlZWRNb2R1bGUudGFwKCdleHQtcmVhY3Qtc3VjY2VlZC1tb2R1bGUnLCAobW9kdWxlKSA9PiB7XG4gICAgICAgICAgdGhpcy5zdWNjZWVkTW9kdWxlKGNvbXBpbGF0aW9uLCBtb2R1bGUpXG4gICAgICAgIH0pXG5cbiAgICAgICAgZGF0YS5ub3JtYWxNb2R1bGVGYWN0b3J5LnBsdWdpbihcInBhcnNlclwiLCBmdW5jdGlvbihwYXJzZXIsIG9wdGlvbnMpIHtcbiAgICAgICAgICAvLyBleHRyYWN0IHh0eXBlcyBhbmQgY2xhc3NlcyBmcm9tIEV4dC5jcmVhdGUgY2FsbHNcbiAgICAgICAgICBwYXJzZXIucGx1Z2luKCdjYWxsIEV4dC5jcmVhdGUnLCBhZGRUb01hbmlmZXN0KTtcbiAgICAgICAgICAvLyBjb3B5IEV4dC5yZXF1aXJlIGNhbGxzIHRvIHRoZSBtYW5pZmVzdC4gIFRoaXMgYWxsb3dzIHRoZSB1c2VycyB0byBleHBsaWNpdGx5IHJlcXVpcmUgYSBjbGFzcyBpZiB0aGUgcGx1Z2luIGZhaWxzIHRvIGRldGVjdCBpdC5cbiAgICAgICAgICBwYXJzZXIucGx1Z2luKCdjYWxsIEV4dC5yZXF1aXJlJywgYWRkVG9NYW5pZmVzdCk7XG4gICAgICAgICAgLy8gY29weSBFeHQuZGVmaW5lIGNhbGxzIHRvIHRoZSBtYW5pZmVzdC4gIFRoaXMgYWxsb3dzIHVzZXJzIHRvIHdyaXRlIHN0YW5kYXJkIEV4dFJlYWN0IGNsYXNzZXMuXG4gICAgICAgICAgcGFyc2VyLnBsdWdpbignY2FsbCBFeHQuZGVmaW5lJywgYWRkVG9NYW5pZmVzdCk7XG4gICAgICAgIH0pXG5cbiAgICAgICAgY29tcGlsYXRpb24uaG9va3MuaHRtbFdlYnBhY2tQbHVnaW5CZWZvcmVIdG1sR2VuZXJhdGlvbi50YXBBc3luYygnZXh0LXJlYWN0LWh0bWxnZW5lcmF0aW9uJywoZGF0YSwgY2IpID0+IHtcblxuICAgICAgICAgIHJlYWRsaW5lLmN1cnNvclRvKHByb2Nlc3Muc3Rkb3V0LCAwKTtjb25zb2xlLmxvZyhhcHAgKyAnZXh0LXJlYWN0LWh0bWxnZW5lcmF0aW9uJylcbiAgICAgICAgICAvL3JlYWRsaW5lLmN1cnNvclRvKHByb2Nlc3Muc3Rkb3V0LCAwKTtjb25zb2xlLmxvZyhhcHAgKyBjb21waWxhdGlvbi5vdXRwdXRPcHRpb25zLnB1YmxpY1BhdGgpXG4gICAgICAgICAgaWYgKGNvbXBpbGF0aW9uLm91dHB1dE9wdGlvbnMucHVibGljUGF0aCA9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGRhdGEuYXNzZXRzLmpzLnVuc2hpZnQoJ2V4dC1yZWFjdC9leHQuanMnKVxuICAgICAgICAgICAgZGF0YS5hc3NldHMuY3NzLnVuc2hpZnQoJ2V4dC1yZWFjdC9leHQuY3NzJylcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBkYXRhLmFzc2V0cy5qcy51bnNoaWZ0KHBhdGguam9pbihjb21waWxhdGlvbi5vdXRwdXRPcHRpb25zLnB1YmxpY1BhdGgsICdleHQtcmVhY3QvZXh0LmpzJykpXG4gICAgICAgICAgICBkYXRhLmFzc2V0cy5jc3MudW5zaGlmdChwYXRoLmpvaW4oY29tcGlsYXRpb24ub3V0cHV0T3B0aW9ucy5wdWJsaWNQYXRoLCAnZXh0LXJlYWN0L2V4dC5jc3MnKSlcbiAgICAgICAgICB9XG4gICAgICAgICAgY2IobnVsbCwgZGF0YSlcbiAgICAgICAgfSlcblxuICAgICAgfSlcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBjb21waWxlci5wbHVnaW4oJ2NvbXBpbGF0aW9uJywgKGNvbXBpbGF0aW9uLCBkYXRhKSA9PiB7XG4gICAgICAgIHJlYWRsaW5lLmN1cnNvclRvKHByb2Nlc3Muc3Rkb3V0LCAwKTtjb25zb2xlLmxvZyhhcHAgKyAnY29tcGlsYXRpb24nKVxuICAgICAgICBjb21waWxhdGlvbi5wbHVnaW4oJ3N1Y2NlZWQtbW9kdWxlJywgKG1vZHVsZSkgPT4ge1xuICAgICAgICAgIHRoaXMuc3VjY2VlZE1vZHVsZShjb21waWxhdGlvbiwgbW9kdWxlKVxuICAgICAgICB9KVxuICAgICAgICBkYXRhLm5vcm1hbE1vZHVsZUZhY3RvcnkucGx1Z2luKFwicGFyc2VyXCIsIGZ1bmN0aW9uKHBhcnNlciwgb3B0aW9ucykge1xuICAgICAgICAgIC8vIGV4dHJhY3QgeHR5cGVzIGFuZCBjbGFzc2VzIGZyb20gRXh0LmNyZWF0ZSBjYWxsc1xuICAgICAgICAgIHBhcnNlci5wbHVnaW4oJ2NhbGwgRXh0LmNyZWF0ZScsIGFkZFRvTWFuaWZlc3QpO1xuICAgICAgICAgIC8vIGNvcHkgRXh0LnJlcXVpcmUgY2FsbHMgdG8gdGhlIG1hbmlmZXN0LiAgVGhpcyBhbGxvd3MgdGhlIHVzZXJzIHRvIGV4cGxpY2l0bHkgcmVxdWlyZSBhIGNsYXNzIGlmIHRoZSBwbHVnaW4gZmFpbHMgdG8gZGV0ZWN0IGl0LlxuICAgICAgICAgIHBhcnNlci5wbHVnaW4oJ2NhbGwgRXh0LnJlcXVpcmUnLCBhZGRUb01hbmlmZXN0KTtcbiAgICAgICAgICAvLyBjb3B5IEV4dC5kZWZpbmUgY2FsbHMgdG8gdGhlIG1hbmlmZXN0LiAgVGhpcyBhbGxvd3MgdXNlcnMgdG8gd3JpdGUgc3RhbmRhcmQgRXh0UmVhY3QgY2xhc3Nlcy5cbiAgICAgICAgICBwYXJzZXIucGx1Z2luKCdjYWxsIEV4dC5kZWZpbmUnLCBhZGRUb01hbmlmZXN0KTtcbiAgICAgICAgfSlcbiAgICAgIH0pXG4gICAgfVxuXG4vLyplbWl0IC0gb25jZSBhbGwgbW9kdWxlcyBhcmUgcHJvY2Vzc2VkLCBjcmVhdGUgdGhlIG9wdGltaXplZCBFeHRSZWFjdCBidWlsZC5cbiAgICBpZiAoY29tcGlsZXIuaG9va3MpIHtcbiAgICAgIGlmICh0cnVlKSB7XG4gICAgICAgIGNvbXBpbGVyLmhvb2tzLmVtaXQudGFwQXN5bmMoJ2V4dC1yZWFjdC1lbWl0LWFzeW5jJywgKGNvbXBpbGF0aW9uLCBjYWxsYmFjaykgPT4ge1xuICAgICAgICAgIHJlYWRsaW5lLmN1cnNvclRvKHByb2Nlc3Muc3Rkb3V0LCAwKTtjb25zb2xlLmxvZyhhcHAgKyAnZXh0LXJlYWN0LWVtaXQtYXN5bmMnKVxuICAgICAgICAgIHRoaXMuZW1pdChjb21waWxlciwgY29tcGlsYXRpb24sIGNhbGxiYWNrKVxuICAgICAgICB9KVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGNvbXBpbGVyLmhvb2tzLmVtaXQudGFwKCdleHQtcmVhY3QtZW1pdCcsIChjb21waWxhdGlvbikgPT4ge1xuICAgICAgICAgIHJlYWRsaW5lLmN1cnNvclRvKHByb2Nlc3Muc3Rkb3V0LCAwKTtjb25zb2xlLmxvZyhhcHAgKyAnZXh0LXJlYWN0LWVtaXQnKVxuICAgICAgICAgIHRoaXMuZW1pdChjb21waWxlciwgY29tcGlsYXRpb24pXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgY29tcGlsZXIucGx1Z2luKCdlbWl0JywgKGNvbXBpbGF0aW9uLCBjYWxsYmFjaykgPT4ge1xuICAgICAgICByZWFkbGluZS5jdXJzb3JUbyhwcm9jZXNzLnN0ZG91dCwgMCk7Y29uc29sZS5sb2coYXBwICsgJ2VtaXQnKVxuICAgICAgICB0aGlzLmVtaXQoY29tcGlsZXIsIGNvbXBpbGF0aW9uLCBjYWxsYmFjaylcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgaWYgKGNvbXBpbGVyLmhvb2tzKSB7XG4gICAgICBpZiAodGhpcy5hc3luY2hyb25vdXMpIHtcbiAgICAgICAgY29tcGlsZXIuaG9va3MuZG9uZS50YXBBc3luYygnZXh0LXJlYWN0LWRvbmUgKGFzeW5jKScsIChjb21waWxhdGlvbiwgY2FsbGJhY2spID0+IHtcbiAgICAgICAgICByZWFkbGluZS5jdXJzb3JUbyhwcm9jZXNzLnN0ZG91dCwgMCk7Y29uc29sZS5sb2coYXBwICsgJ2V4dC1yZWFjdC1kb25lIChhc3luYyknKVxuICAgICAgICAgIGlmIChjYWxsYmFjayAhPSBudWxsKSBcbiAgICAgICAgICB7XG4gICAgICAgICAgICBpZiAodGhpcy5hc3luY2hyb25vdXMpIFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBjb25zb2xlLmxvZygnY2FsbGluZyBjYWxsYmFjayBmb3IgZXh0LXJlYWN0LWVtaXQgIChhc3luYyknKVxuICAgICAgICAgICAgICBjYWxsYmFjaygpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGNvbXBpbGVyLmhvb2tzLmRvbmUudGFwKCdleHQtcmVhY3QtZG9uZScsICgpID0+IHtcbiAgICAgICAgICByZWFkbGluZS5jdXJzb3JUbyhwcm9jZXNzLnN0ZG91dCwgMCk7Y29uc29sZS5sb2coYXBwICsgJ2V4dC1yZWFjdC1kb25lJylcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBhc3luYyBlbWl0KGNvbXBpbGVyLCBjb21waWxhdGlvbiwgY2FsbGJhY2spIHtcbi8vICAgICB2YXIgaXNXZWJwYWNrNCA9IGNvbXBpbGF0aW9uLmhvb2tzO1xuLy8gICAgIHZhciBtb2R1bGVzID0gW11cbi8vICAgICBpZiAoaXNXZWJwYWNrNCkge1xuLy8gICAgICAgaXNXZWJwYWNrNCA9IHRydWVcbi8vIC8vICAgICAgIG1vZHVsZXMgPSBjb21waWxhdGlvbi5jaHVua3MucmVkdWNlKChhLCBiKSA9PiBhLmNvbmNhdChiLl9tb2R1bGVzKSwgW10pXG4vLyAvLyAvLyAgICAgIGNvbnNvbGUubG9nKG1vZHVsZXMpXG4vLyAvLyAgICAgICB2YXIgaSA9IDBcbi8vIC8vICAgICAgIHZhciB0aGVNb2R1bGUgPSAnJ1xuLy8gLy8gICAgICAgZm9yIChsZXQgbW9kdWxlIG9mIG1vZHVsZXMpIHtcbi8vIC8vICAgICAgICAgaWYgKGkgPT0gMCkge1xuLy8gLy8gICAgICAgICAgIHRoZU1vZHVsZSA9IG1vZHVsZVxuLy8gLy8gICAgICAgICAgIGkrK1xuLy8gLy8gICAgICAgICB9XG4vLyAvLyAvL2NvbnN0IGRlcHMgPSB0aGlzLmRlcGVuZGVuY2llc1ttb2R1bGUucmVzb3VyY2VdXG4vLyAvLyAgICAgICAgIC8vY29uc29sZS5sb2coZGVwcylcbi8vIC8vICAgICAgICAgLy9pZiAoZGVwcykgc3RhdGVtZW50cyA9IHN0YXRlbWVudHMuY29uY2F0KGRlcHMpO1xuLy8gLy8gICAgICAgfVxuLy8gLy8gICAgICAgdmFyIHRoZVBhdGggPSBwYXRoLmpvaW4oY29tcGlsZXIub3V0cHV0UGF0aCwgJ21vZHVsZS50eHQnKVxuLy8gLy8gICAgICAgLy9jb25zb2xlLmxvZyh0aGVQYXRoKVxuXG4vLyAvLyAgICAgICAvL3ZhciBvID0ge307XG4vLyAvLyAgICAgICAvL28ubyA9IHRoZU1vZHVsZTtcbi8vIC8vICAgICAgIC8vY29uc29sZS5sb2codGhlTW9kdWxlWzBdLmNvbnRleHQpXG4gICAgICBcbi8vIC8vICAgICAgIHZhciBjYWNoZSA9IFtdO1xuLy8gLy8gICAgICAgdmFyIGggPSBKU09OLnN0cmluZ2lmeSh0aGVNb2R1bGUsIGZ1bmN0aW9uKGtleSwgdmFsdWUpIHtcbi8vIC8vICAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAhPT0gbnVsbCkge1xuLy8gLy8gICAgICAgICAgICAgICBpZiAoY2FjaGUuaW5kZXhPZih2YWx1ZSkgIT09IC0xKSB7XG4vLyAvLyAgICAgICAgICAgICAgICAgICAvLyBDaXJjdWxhciByZWZlcmVuY2UgZm91bmQsIGRpc2NhcmQga2V5XG4vLyAvLyAgICAgICAgICAgICAgICAgICByZXR1cm47XG4vLyAvLyAgICAgICAgICAgICAgIH1cbi8vIC8vICAgICAgICAgICAgICAgLy8gU3RvcmUgdmFsdWUgaW4gb3VyIGNvbGxlY3Rpb25cbi8vIC8vICAgICAgICAgICAgICAgY2FjaGUucHVzaCh2YWx1ZSk7XG4vLyAvLyAgICAgICAgICAgfVxuLy8gLy8gICAgICAgICAgIHJldHVybiB2YWx1ZTtcbi8vIC8vICAgICAgIH0pO1xuLy8gLy8gICAgICAgY2FjaGUgPSBudWxsOyAvLyBFbmFibGUgZ2FyYmFnZSBjb2xsZWN0aW9uXG4vLyAvLyAgICAgICAvL2ZzLndyaXRlRmlsZVN5bmMoIHRoZVBhdGgsIGgsICd1dGY4Jylcbi8vICAgICB9XG4vLyAgICAgZWxzZSB7XG4vLyAgICAgICBpc1dlYnBhY2s0ID0gZmFsc2Vcbi8vICAgICAgIC8vIG1vZHVsZXMgPSBjb21waWxhdGlvbi5jaHVua3MucmVkdWNlKChhLCBiKSA9PiBhLmNvbmNhdChiLm1vZHVsZXMpLCBbXSlcblxuLy8gICAgICAgLy8gZm9yIChsZXQgbW9kdWxlIG9mIG1vZHVsZXMpIHtcbi8vICAgICAgIC8vICAgY29uc3QgZGVwcyA9IHRoaXMuZGVwZW5kZW5jaWVzW21vZHVsZS5yZXNvdXJjZV1cbi8vICAgICAgIC8vICAgY29uc29sZS5sb2coZGVwcylcbi8vICAgICAgIC8vICAgLy9pZiAoZGVwcykgc3RhdGVtZW50cyA9IHN0YXRlbWVudHMuY29uY2F0KGRlcHMpO1xuLy8gICAgICAgLy8gfVxuLy8gICAgIH1cbiAgICAvL2NvbnN0IGJ1aWxkID0gdGhpcy5idWlsZHNbT2JqZWN0LmtleXModGhpcy5idWlsZHMpWzBdXTtcblxuICAgIGxldCBvdXRwdXRQYXRoID0gcGF0aC5qb2luKGNvbXBpbGVyLm91dHB1dFBhdGgsIHRoaXMub3V0cHV0KVxuICAgIC8vIHdlYnBhY2stZGV2LXNlcnZlciBvdmVyd3JpdGVzIHRoZSBvdXRwdXRQYXRoIHRvIFwiL1wiLCBzbyB3ZSBuZWVkIHRvIHByZXBlbmQgY29udGVudEJhc2VcbiAgICBpZiAoY29tcGlsZXIub3V0cHV0UGF0aCA9PT0gJy8nICYmIGNvbXBpbGVyLm9wdGlvbnMuZGV2U2VydmVyKSB7XG4gICAgICBvdXRwdXRQYXRoID0gcGF0aC5qb2luKGNvbXBpbGVyLm9wdGlvbnMuZGV2U2VydmVyLmNvbnRlbnRCYXNlLCBvdXRwdXRQYXRoKVxuICAgIH1cbiAgICB0aGlzLl9idWlsZEV4dEZvbGRlcihvdXRwdXRQYXRoKVxuICAgIC8vIHZhciBwYXJtcyA9IFsnYXBwJywgJ2J1aWxkJywgdGhpcy5vcHRpb25zLnByb2ZpbGUsIHRoaXMub3B0aW9ucy5lbnZpcm9ubWVudF1cbiAgICAvLyB2YXIgdmVyYm9zZSA9ICdubydcbiAgICAvLyBpZiAodGhpcy5vcHRpb25zLnZlcmJvc2UgIT0gdW5kZWZpbmVkKSB7XG4gICAgLy8gICB2ZXJib3NlID0gdGhpcy5vcHRpb25zLnZlcmJvc2VcbiAgICAvLyB9XG4gICAgdmFyIHBhcm1zID0gWydhcHAnLCAnYnVpbGQnXVxuICAgIHZhciB2ZXJib3NlID0gJ25vJ1xuICAgIHZhciBjbWRFcnJvcnMgPSBbXVxuICAgIGF3YWl0IF9idWlsZEV4dEJ1bmRsZShjb21waWxhdGlvbiwgY21kRXJyb3JzLCBvdXRwdXRQYXRoLCBwYXJtcywgdmVyYm9zZSlcbiBcbiAgICBpZiAodGhpcy53YXRjaCAmJiB0aGlzLmNvdW50ID09IDAgJiYgY21kRXJyb3JzLmxlbmd0aCA9PSAwKSB7XG4gICAgICB2YXIgdXJsID0gJ2h0dHA6Ly9sb2NhbGhvc3Q6JyArIHRoaXMucG9ydFxuICAgICAgcmVhZGxpbmUuY3Vyc29yVG8ocHJvY2Vzcy5zdGRvdXQsIDApO2NvbnNvbGUubG9nKGFwcCArICdleHQtcmVhY3QtZW1pdCAtIG9wZW4gYnJvd3NlciBhdCAnICsgdXJsKVxuICAgICAgdGhpcy5jb3VudCsrXG4gICAgICBjb25zdCBvcG4gPSByZXF1aXJlKCdvcG4nKVxuICAgICAgb3BuKHVybClcbiAgICB9XG4gICAgY2FsbGJhY2soKVxuICB9XG5cbiAgX2J1aWxkRXh0Rm9sZGVyKG91dHB1dCwgdG9vbGtpdD0nbW9kZXJuJywgdGhlbWUsIHBhY2thZ2VzPVtdLCBwYWNrYWdlRGlycz1bXSwgc2RrPSdub2RlX21vZHVsZXMvQHNlbmNoYS9leHQnLCBvdmVycmlkZXM9W10pIHtcbiAgICB0aGVtZSA9IHRoZW1lIHx8ICh0b29sa2l0ID09PSAnY2xhc3NpYycgPyAndGhlbWUtdHJpdG9uJyA6ICd0aGVtZS1tYXRlcmlhbCcpXG4gICAgY29uc3QgdXNlclBhY2thZ2VzID0gcGF0aC5qb2luKCcuJywgJ2V4dC1yZWFjdCcsICdwYWNrYWdlcycpXG4gICAgaWYgKGZzLmV4aXN0c1N5bmModXNlclBhY2thZ2VzKSkge1xuICAgICAgcmVhZGxpbmUuY3Vyc29yVG8ocHJvY2Vzcy5zdGRvdXQsIDApO2NvbnNvbGUubG9nKGFwcCArICdBZGRpbmcgUGFja2FnZSBGb2xkZXI6ICcgKyB1c2VyUGFja2FnZXMpXG4gICAgICBwYWNrYWdlRGlycy5wdXNoKHVzZXJQYWNrYWdlcylcbiAgICB9XG4gICAgaWYgKHRoaXMuZmlyc3RUaW1lKSB7XG4gICAgICByaW1yYWYob3V0cHV0KVxuICAgICAgbWtkaXJwKG91dHB1dClcbiAgICAgIGZzLndyaXRlRmlsZVN5bmMocGF0aC5qb2luKG91dHB1dCwgJ2J1aWxkLnhtbCcpLCBidWlsZFhNTCh7IGNvbXByZXNzOiB0aGlzLnByb2R1Y3Rpb24gfSksICd1dGY4JylcbiAgICAgIGZzLndyaXRlRmlsZVN5bmMocGF0aC5qb2luKG91dHB1dCwgJ2pzZG9tLWVudmlyb25tZW50LmpzJyksIGNyZWF0ZUpTRE9NRW52aXJvbm1lbnQoKSwgJ3V0ZjgnKVxuICAgICAgZnMud3JpdGVGaWxlU3luYyhwYXRoLmpvaW4ob3V0cHV0LCAnYXBwLmpzb24nKSwgY3JlYXRlQXBwSnNvbih7IHRoZW1lLCBwYWNrYWdlcywgdG9vbGtpdCwgb3ZlcnJpZGVzLCBwYWNrYWdlRGlycyB9KSwgJ3V0ZjgnKVxuICAgICAgZnMud3JpdGVGaWxlU3luYyhwYXRoLmpvaW4ob3V0cHV0LCAnd29ya3NwYWNlLmpzb24nKSwgY3JlYXRlV29ya3NwYWNlSnNvbihzZGssIHBhY2thZ2VEaXJzLCBvdXRwdXQpLCAndXRmOCcpXG4gICAgfVxuICAgIHRoaXMuZmlyc3RUaW1lID0gZmFsc2VcbiAgICBsZXQganNcbiAgICBqcyA9ICdFeHQucmVxdWlyZShcIkV4dC4qXCIpJ1xuXG4gICAgLy8gaWYgKHRoaXMudHJlZVNoYWtpbmcpIHtcbiAgICAvLyAgIC8vbGV0IHN0YXRlbWVudHMgPSBbJ0V4dC5yZXF1aXJlKFtcIkV4dC5hcHAuQXBwbGljYXRpb25cIiwgXCJFeHQuQ29tcG9uZW50XCIsIFwiRXh0LldpZGdldFwiLCBcIkV4dC5sYXlvdXQuRml0XCIsIFwiRXh0LnJlYWN0LlRyYW5zaXRpb25cIiwgXCJFeHQucmVhY3QuUmVuZGVyZXJDZWxsXCJdKSddOyAvLyBmb3Igc29tZSByZWFzb24gY29tbWFuZCBkb2Vzbid0IGxvYWQgY29tcG9uZW50IHdoZW4gb25seSBwYW5lbCBpcyByZXF1aXJlZFxuICAgIC8vICAgbGV0IHN0YXRlbWVudHMgPSBbJ0V4dC5yZXF1aXJlKFtcIkV4dC5hcHAuQXBwbGljYXRpb25cIiwgXCJFeHQuQ29tcG9uZW50XCIsIFwiRXh0LldpZGdldFwiLCBcIkV4dC5sYXlvdXQuRml0XCIsIFwiRXh0LnJlYWN0LlRyYW5zaXRpb25cIl0pJ107IC8vIGZvciBzb21lIHJlYXNvbiBjb21tYW5kIGRvZXNuJ3QgbG9hZCBjb21wb25lbnQgd2hlbiBvbmx5IHBhbmVsIGlzIHJlcXVpcmVkXG4gICAgLy8gICAvLyBpZiAocGFja2FnZXMuaW5kZXhPZigncmVhY3RvJykgIT09IC0xKSB7XG4gICAgLy8gICAvLyAgIHN0YXRlbWVudHMucHVzaCgnRXh0LnJlcXVpcmUoXCJFeHQucmVhY3QuUmVuZGVyZXJDZWxsXCIpJyk7XG4gICAgLy8gICAvLyB9XG4gICAgLy8gICAvL21qZ1xuICAgIC8vICAgZm9yIChsZXQgbW9kdWxlIG9mIG1vZHVsZXMpIHtcbiAgICAvLyAgICAgY29uc3QgZGVwcyA9IHRoaXMuZGVwZW5kZW5jaWVzW21vZHVsZS5yZXNvdXJjZV07XG4gICAgLy8gICAgIGlmIChkZXBzKSBzdGF0ZW1lbnRzID0gc3RhdGVtZW50cy5jb25jYXQoZGVwcyk7XG4gICAgLy8gICB9XG4gICAgLy8gICBqcyA9IHN0YXRlbWVudHMuam9pbignO1xcbicpO1xuICAgIC8vIH0gZWxzZSB7XG4gICAgLy8gICBqcyA9ICdFeHQucmVxdWlyZShcIkV4dC4qXCIpJztcbiAgICAvLyB9XG5cbiAgICBpZiAodGhpcy5tYW5pZmVzdCA9PT0gbnVsbCB8fCBqcyAhPT0gdGhpcy5tYW5pZmVzdCkge1xuICAgICAgdGhpcy5tYW5pZmVzdCA9IGpzXG4gICAgICAvL3JlYWRsaW5lLmN1cnNvclRvKHByb2Nlc3Muc3Rkb3V0LCAwKTtjb25zb2xlLmxvZyhhcHAgKyAndHJlZSBzaGFraW5nOiAnICsgdGhpcy50cmVlU2hha2luZylcbiAgICAgIGNvbnN0IG1hbmlmZXN0ID0gcGF0aC5qb2luKG91dHB1dCwgJ21hbmlmZXN0LmpzJylcbiAgICAgIGZzLndyaXRlRmlsZVN5bmMobWFuaWZlc3QsIGpzLCAndXRmOCcpXG4gICAgICByZWFkbGluZS5jdXJzb3JUbyhwcm9jZXNzLnN0ZG91dCwgMCk7Y29uc29sZS5sb2coYXBwICsgYGJ1aWxkaW5nIEV4dFJlYWN0IGJ1bmRsZSBhdDogJHtvdXRwdXR9YClcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICByZWFkbGluZS5jdXJzb3JUbyhwcm9jZXNzLnN0ZG91dCwgMCk7Y29uc29sZS5sb2coYXBwICsgJ0V4dFJlYWN0IHJlYnVpbGQgTk9UIG5lZWRlZCcpXG4gICAgfVxuICB9XG5cblxuICAvKipcbiAgIC8qKlxuICAgICogQnVpbGRzIGEgbWluaW1hbCB2ZXJzaW9uIG9mIHRoZSBFeHRSZWFjdCBmcmFtZXdvcmsgYmFzZWQgb24gdGhlIGNsYXNzZXMgdXNlZFxuICAgICogQHBhcmFtIHtTdHJpbmd9IG5hbWUgVGhlIG5hbWUgb2YgdGhlIGJ1aWxkXG4gICAgKiBAcGFyYW0ge01vZHVsZVtdfSBtb2R1bGVzIHdlYnBhY2sgbW9kdWxlc1xuICAgICogQHBhcmFtIHtTdHJpbmd9IG91dHB1dCBUaGUgcGF0aCB0byB3aGVyZSB0aGUgZnJhbWV3b3JrIGJ1aWxkIHNob3VsZCBiZSB3cml0dGVuXG4gICAgKiBAcGFyYW0ge1N0cmluZ30gW3Rvb2xraXQ9J21vZGVybiddIFwibW9kZXJuXCIgb3IgXCJjbGFzc2ljXCJcbiAgICAqIEBwYXJhbSB7U3RyaW5nfSBvdXRwdXQgVGhlIHBhdGggdG8gdGhlIGRpcmVjdG9yeSB0byBjcmVhdGUgd2hpY2ggd2lsbCBjb250YWluIHRoZSBqcyBhbmQgY3NzIGJ1bmRsZXNcbiAgICAqIEBwYXJhbSB7U3RyaW5nfSB0aGVtZSBUaGUgbmFtZSBvZiB0aGUgRXh0UmVhY3QgdGhlbWUgcGFja2FnZSB0byB1c2UsIGZvciBleGFtcGxlIFwidGhlbWUtbWF0ZXJpYWxcIlxuICAgICogQHBhcmFtIHtTdHJpbmdbXX0gcGFja2FnZXMgQW4gYXJyYXkgb2YgRXh0UmVhY3QgcGFja2FnZXMgdG8gaW5jbHVkZVxuICAgICogQHBhcmFtIHtTdHJpbmdbXX0gcGFja2FnZURpcnMgRGlyZWN0b3JpZXMgY29udGFpbmluZyBwYWNrYWdlc1xuICAgICogQHBhcmFtIHtTdHJpbmdbXX0gb3ZlcnJpZGVzIEFuIGFycmF5IG9mIGxvY2F0aW9ucyBmb3Igb3ZlcnJpZGVzXG4gICAgKiBAcGFyYW0ge1N0cmluZ30gc2RrIFRoZSBmdWxsIHBhdGggdG8gdGhlIEV4dFJlYWN0IFNES1xuICAgICogQHByaXZhdGVcbiAgICAqL1xuICAvLyBfYnVpbGRFeHRCdW5kbGUoY29tcGlsYXRpb24sIGNtZEVycm9ycywgb3V0cHV0LCB7IHRvb2xraXQ9J21vZGVybicsIHRoZW1lLCBwYWNrYWdlcz1bXSwgcGFja2FnZURpcnM9W10sIHNkaywgb3ZlcnJpZGVzfSkge1xuICAvLyAgIGxldCBzZW5jaGEgPSB0aGlzLl9nZXRTZW5jaENtZFBhdGgoKVxuICAvLyAgIHRoZW1lID0gdGhlbWUgfHwgKHRvb2xraXQgPT09ICdjbGFzc2ljJyA/ICd0aGVtZS10cml0b24nIDogJ3RoZW1lLW1hdGVyaWFsJylcblxuICAvLyAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gIC8vICAgICBjb25zdCBvbkJ1aWxkRG9uZSA9ICgpID0+IHtcbiAgLy8gICAgICAgaWYgKGNtZEVycm9ycy5sZW5ndGgpIHtcbiAgLy8gICAgICAgICByZWplY3QobmV3IEVycm9yKGNtZEVycm9ycy5qb2luKFwiXCIpKSlcbiAgLy8gICAgICAgfSBlbHNlIHtcbiAgLy8gICAgICAgICByZXNvbHZlKClcbiAgLy8gICAgICAgfVxuICAvLyAgICAgfVxuXG4gIC8vICAgICBjb25zdCB1c2VyUGFja2FnZXMgPSBwYXRoLmpvaW4oJy4nLCAnZXh0LXJlYWN0JywgJ3BhY2thZ2VzJylcbiAgLy8gICAgIGlmIChmcy5leGlzdHNTeW5jKHVzZXJQYWNrYWdlcykpIHtcbiAgLy8gICAgICAgcmVhZGxpbmUuY3Vyc29yVG8ocHJvY2Vzcy5zdGRvdXQsIDApO2NvbnNvbGUubG9nKGFwcCArICdBZGRpbmcgUGFja2FnZSBGb2xkZXI6ICcgKyB1c2VyUGFja2FnZXMpXG4gIC8vICAgICAgIHBhY2thZ2VEaXJzLnB1c2godXNlclBhY2thZ2VzKVxuICAvLyAgICAgfVxuXG4gIC8vICAgICBpZiAodGhpcy5maXJzdFRpbWUpIHtcbiAgLy8gICAgICAgcmltcmFmKG91dHB1dClcbiAgLy8gICAgICAgbWtkaXJwKG91dHB1dClcbiAgLy8gICAgICAgZnMud3JpdGVGaWxlU3luYyhwYXRoLmpvaW4ob3V0cHV0LCAnYnVpbGQueG1sJyksIGJ1aWxkWE1MKHsgY29tcHJlc3M6IHRoaXMucHJvZHVjdGlvbiB9KSwgJ3V0ZjgnKVxuICAvLyAgICAgICBmcy53cml0ZUZpbGVTeW5jKHBhdGguam9pbihvdXRwdXQsICdqc2RvbS1lbnZpcm9ubWVudC5qcycpLCBjcmVhdGVKU0RPTUVudmlyb25tZW50KCksICd1dGY4JylcbiAgLy8gICAgICAgZnMud3JpdGVGaWxlU3luYyhwYXRoLmpvaW4ob3V0cHV0LCAnYXBwLmpzb24nKSwgY3JlYXRlQXBwSnNvbih7IHRoZW1lLCBwYWNrYWdlcywgdG9vbGtpdCwgb3ZlcnJpZGVzLCBwYWNrYWdlRGlycyB9KSwgJ3V0ZjgnKVxuICAvLyAgICAgICBmcy53cml0ZUZpbGVTeW5jKHBhdGguam9pbihvdXRwdXQsICd3b3Jrc3BhY2UuanNvbicpLCBjcmVhdGVXb3Jrc3BhY2VKc29uKHNkaywgcGFja2FnZURpcnMsIG91dHB1dCksICd1dGY4JylcbiAgLy8gICAgIH1cbiAgLy8gICAgIHRoaXMuZmlyc3RUaW1lID0gZmFsc2VcblxuICAvLyAgICAgbGV0IGpzXG4gIC8vICAgICBqcyA9ICdFeHQucmVxdWlyZShcIkV4dC4qXCIpJ1xuXG4gIC8vICAgICAvLyBpZiAodGhpcy50cmVlU2hha2luZykge1xuICAvLyAgICAgLy8gICAvL2xldCBzdGF0ZW1lbnRzID0gWydFeHQucmVxdWlyZShbXCJFeHQuYXBwLkFwcGxpY2F0aW9uXCIsIFwiRXh0LkNvbXBvbmVudFwiLCBcIkV4dC5XaWRnZXRcIiwgXCJFeHQubGF5b3V0LkZpdFwiLCBcIkV4dC5yZWFjdC5UcmFuc2l0aW9uXCIsIFwiRXh0LnJlYWN0LlJlbmRlcmVyQ2VsbFwiXSknXTsgLy8gZm9yIHNvbWUgcmVhc29uIGNvbW1hbmQgZG9lc24ndCBsb2FkIGNvbXBvbmVudCB3aGVuIG9ubHkgcGFuZWwgaXMgcmVxdWlyZWRcbiAgLy8gICAgIC8vICAgbGV0IHN0YXRlbWVudHMgPSBbJ0V4dC5yZXF1aXJlKFtcIkV4dC5hcHAuQXBwbGljYXRpb25cIiwgXCJFeHQuQ29tcG9uZW50XCIsIFwiRXh0LldpZGdldFwiLCBcIkV4dC5sYXlvdXQuRml0XCIsIFwiRXh0LnJlYWN0LlRyYW5zaXRpb25cIl0pJ107IC8vIGZvciBzb21lIHJlYXNvbiBjb21tYW5kIGRvZXNuJ3QgbG9hZCBjb21wb25lbnQgd2hlbiBvbmx5IHBhbmVsIGlzIHJlcXVpcmVkXG4gIC8vICAgICAvLyAgIC8vIGlmIChwYWNrYWdlcy5pbmRleE9mKCdyZWFjdG8nKSAhPT0gLTEpIHtcbiAgLy8gICAgIC8vICAgLy8gICBzdGF0ZW1lbnRzLnB1c2goJ0V4dC5yZXF1aXJlKFwiRXh0LnJlYWN0LlJlbmRlcmVyQ2VsbFwiKScpO1xuICAvLyAgICAgLy8gICAvLyB9XG4gIC8vICAgICAvLyAgIC8vbWpnXG4gIC8vICAgICAvLyAgIGZvciAobGV0IG1vZHVsZSBvZiBtb2R1bGVzKSB7XG4gIC8vICAgICAvLyAgICAgY29uc3QgZGVwcyA9IHRoaXMuZGVwZW5kZW5jaWVzW21vZHVsZS5yZXNvdXJjZV07XG4gIC8vICAgICAvLyAgICAgaWYgKGRlcHMpIHN0YXRlbWVudHMgPSBzdGF0ZW1lbnRzLmNvbmNhdChkZXBzKTtcbiAgLy8gICAgIC8vICAgfVxuICAvLyAgICAgLy8gICBqcyA9IHN0YXRlbWVudHMuam9pbignO1xcbicpO1xuICAvLyAgICAgLy8gfSBlbHNlIHtcbiAgLy8gICAgIC8vICAganMgPSAnRXh0LnJlcXVpcmUoXCJFeHQuKlwiKSc7XG4gIC8vICAgICAvLyB9XG5cblxuXG4gIC8vICAgICAvLyBpZiAoZnMuZXhpc3RzU3luYyhwYXRoLmpvaW4oc2RrLCAnZXh0JykpKSB7XG4gIC8vICAgICAvLyAgIC8vIGxvY2FsIGNoZWNrb3V0IG9mIHRoZSBTREsgcmVwb1xuICAvLyAgICAgLy8gICBwYWNrYWdlRGlycy5wdXNoKHBhdGguam9pbignZXh0JywgJ3BhY2thZ2VzJykpO1xuICAvLyAgICAgLy8gICBzZGsgPSBwYXRoLmpvaW4oc2RrLCAnZXh0Jyk7XG4gIC8vICAgICAvLyB9XG5cblxuXG4gIC8vICAgICB2YXIgcGFybXMgPSBbXVxuICAvLyAgICAgaWYgKHRoaXMud2F0Y2gpIHsgcGFybXMgPSBbJ2FwcCcsICd3YXRjaCddIH1cbiAgLy8gICAgIGVsc2UgeyBwYXJtcyA9IFsnYXBwJywgJ2J1aWxkJ10gfVxuXG4gIC8vICAgICBpZiAodGhpcy5tYW5pZmVzdCA9PT0gbnVsbCB8fCBqcyAhPT0gdGhpcy5tYW5pZmVzdCkge1xuICAvLyAgICAgICB0aGlzLm1hbmlmZXN0ID0ganNcbiAgLy8gICAgICAgLy9yZWFkbGluZS5jdXJzb3JUbyhwcm9jZXNzLnN0ZG91dCwgMCk7Y29uc29sZS5sb2coYXBwICsgJ3RyZWUgc2hha2luZzogJyArIHRoaXMudHJlZVNoYWtpbmcpXG4gIC8vICAgICAgIGNvbnN0IG1hbmlmZXN0ID0gcGF0aC5qb2luKG91dHB1dCwgJ21hbmlmZXN0LmpzJylcbiAgLy8gICAgICAgZnMud3JpdGVGaWxlU3luYyhtYW5pZmVzdCwganMsICd1dGY4JylcbiAgLy8gICAgICAgcmVhZGxpbmUuY3Vyc29yVG8ocHJvY2Vzcy5zdGRvdXQsIDApO2NvbnNvbGUubG9nKGFwcCArIGBidWlsZGluZyBFeHRSZWFjdCBidW5kbGUgYXQ6ICR7b3V0cHV0fWApXG5cbiAgLy8gICAgICAgaWYgKHRoaXMud2F0Y2ggJiYgIXdhdGNoaW5nIHx8ICF0aGlzLndhdGNoKSB7XG4gIC8vICAgICAgICAgdmFyIG9wdGlvbnMgPSB7IGN3ZDogb3V0cHV0LCBzaWxlbnQ6IHRydWUsIHN0ZGlvOiAncGlwZScsIGVuY29kaW5nOiAndXRmLTgnfVxuICAvLyAgICAgICAgIHZhciB2ZXJib3NlID0gJ25vJ1xuICAvLyAgICAgICAgIGlmIChwcm9jZXNzLmVudi5FWFRSRUFDVF9WRVJCT1NFICA9PSAneWVzJykge1xuICAvLyAgICAgICAgICAgdmVyYm9zZSA9ICd5ZXMnXG4gIC8vICAgICAgICAgfVxuICAvLyAgICAgICAgIGV4ZWN1dGVBc3luYyhzZW5jaGEsIHBhcm1zLCBvcHRpb25zLCBjb21waWxhdGlvbiwgY21kRXJyb3JzLCB2ZXJib3NlKS50aGVuIChcbiAgLy8gICAgICAgICAgIGZ1bmN0aW9uKCkgeyBvbkJ1aWxkRG9uZSgpIH0sIFxuICAvLyAgICAgICAgICAgZnVuY3Rpb24ocmVhc29uKSB7IHJlc29sdmUocmVhc29uKSB9XG4gIC8vICAgICAgICAgKVxuICAvLyAgICAgICB9XG5cbiAgLy8gICAgIH1cbiAgLy8gICAgIGVsc2Uge1xuICAvLyAgICAgICByZWFkbGluZS5jdXJzb3JUbyhwcm9jZXNzLnN0ZG91dCwgMCk7Y29uc29sZS5sb2coYXBwICsgJ0V4dCByZWJ1aWxkIE5PVCBuZWVkZWQnKVxuICAvLyAgICAgICBvbkJ1aWxkRG9uZSgpXG4gIC8vICAgICB9XG5cbiAgLy8gICAgIC8vIHZhciBwYXJtc1xuICAvLyAgICAgLy8gaWYgKHRoaXMud2F0Y2gpIHtcbiAgLy8gICAgIC8vICAgaWYgKCF3YXRjaGluZykge1xuICAvLyAgICAgLy8gICAgIHBhcm1zID0gWydhcHAnLCAnd2F0Y2gnXVxuICAvLyAgICAgLy8gICB9XG4gIC8vICAgICAvLyAgIC8vIGlmICghY21kUmVidWlsZE5lZWRlZCkge1xuICAvLyAgICAgLy8gICAvLyAgIHJlYWRsaW5lLmN1cnNvclRvKHByb2Nlc3Muc3Rkb3V0LCAwKTtjb25zb2xlLmxvZyhhcHAgKyAnRXh0IHJlYnVpbGQgTk9UIG5lZWRlZCcpXG4gIC8vICAgICAvLyAgIC8vICAgb25CdWlsZERvbmUoKVxuICAvLyAgICAgLy8gICAvLyB9XG4gIC8vICAgICAvLyB9XG4gIC8vICAgICAvLyBlbHNlIHtcbiAgLy8gICAgIC8vICAgcGFybXMgPSBbJ2FwcCcsICdidWlsZCddXG4gIC8vICAgICAvLyB9XG4gIC8vICAgICAvLyBpZiAoY21kUmVidWlsZE5lZWRlZCkge1xuICAvLyAgICAgLy8gICB2YXIgb3B0aW9ucyA9IHsgY3dkOiBvdXRwdXQsIHNpbGVudDogdHJ1ZSwgc3RkaW86ICdwaXBlJywgZW5jb2Rpbmc6ICd1dGYtOCd9XG4gIC8vICAgICAvLyAgIGV4ZWN1dGVBc3luYyhzZW5jaGEsIHBhcm1zLCBvcHRpb25zLCBjb21waWxhdGlvbiwgY21kRXJyb3JzKS50aGVuKGZ1bmN0aW9uKCkge1xuICAvLyAgICAgLy8gICAgIG9uQnVpbGREb25lKClcbiAgLy8gICAgIC8vICAgfSwgZnVuY3Rpb24ocmVhc29uKXtcbiAgLy8gICAgIC8vICAgICByZXNvbHZlKHJlYXNvbilcbiAgLy8gICAgIC8vICAgfSlcbiAgLy8gICAgIC8vIH1cblxuXG4gIC8vICAgfSlcbiAgLy8gfVxuXG5cblxuICBzdWNjZWVkTW9kdWxlKGNvbXBpbGF0aW9uLCBtb2R1bGUpIHtcbiAgICB0aGlzLmN1cnJlbnRGaWxlID0gbW9kdWxlLnJlc291cmNlO1xuICAgIGlmIChtb2R1bGUucmVzb3VyY2UgJiYgbW9kdWxlLnJlc291cmNlLm1hdGNoKHRoaXMudGVzdCkgJiYgIW1vZHVsZS5yZXNvdXJjZS5tYXRjaCgvbm9kZV9tb2R1bGVzLykgJiYgIW1vZHVsZS5yZXNvdXJjZS5tYXRjaChgL2V4dC1yZWFjdCR7dGhpcy5yZWFjdFZlcnNpb259L2ApKSB7XG4gICAgICBjb25zdCBkb1BhcnNlID0gKCkgPT4ge1xuICAgICAgICB0aGlzLmRlcGVuZGVuY2llc1t0aGlzLmN1cnJlbnRGaWxlXSA9IFtcbiAgICAgICAgICAuLi4odGhpcy5kZXBlbmRlbmNpZXNbdGhpcy5jdXJyZW50RmlsZV0gfHwgW10pLFxuICAgICAgICAgIC4uLnRoaXMubWFuaWZlc3RFeHRyYWN0b3IobW9kdWxlLl9zb3VyY2UuX3ZhbHVlLCBjb21waWxhdGlvbiwgbW9kdWxlLCB0aGlzLnJlYWN0VmVyc2lvbilcbiAgICAgICAgXVxuICAgICAgfVxuICAgICAgaWYgKHRoaXMuZGVidWcpIHtcbiAgICAgICAgZG9QYXJzZSgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdHJ5IHsgZG9QYXJzZSgpOyB9IGNhdGNoIChlKSBcbiAgICAgICAgeyBcbiAgICAgICAgICBjb25zb2xlLmVycm9yKCdcXG5lcnJvciBwYXJzaW5nICcgKyB0aGlzLmN1cnJlbnRGaWxlKTsgXG4gICAgICAgICAgY29uc29sZS5lcnJvcihlKTsgXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2tzIGVhY2ggYnVpbGQgY29uZmlnIGZvciBtaXNzaW5nL2ludmFsaWQgcHJvcGVydGllc1xuICAgKiBAcGFyYW0ge1N0cmluZ30gbmFtZSBUaGUgbmFtZSBvZiB0aGUgYnVpbGRcbiAgICogQHBhcmFtIHtTdHJpbmd9IGJ1aWxkIFRoZSBidWlsZCBjb25maWdcbiAgICogQHByaXZhdGVcbiAgICovXG4gIF92YWxpZGF0ZUJ1aWxkQ29uZmlnKG5hbWUsIGJ1aWxkKSB7XG4gICAgbGV0IHsgc2RrLCBwcm9kdWN0aW9uIH0gPSBidWlsZDtcblxuICAgIGlmIChwcm9kdWN0aW9uKSB7XG4gICAgICBidWlsZC50cmVlU2hha2luZyA9IGZhbHNlO1xuICAgIH1cblxuICAgIGlmIChzZGspIHtcbiAgICAgIC8vY29tcGlsYXRpb24uZXJyb3JzLnB1c2goIG5ldyBFcnJvcihjbWRFcnJvcnMuam9pbihcIlwiKSkgKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKGAke2NoYWxrLnJlZCgnU0RLIHBhcmFtZXRlciBubyBsb25nZXIgc3VwcG9ydGVkIHdpdGggZXh0LXJlYWN0LXdlYnBhY2stcGx1Z2luJyl9ICAtIHVzZSB0aGUgRXh0IEpTIG5wbSBwYWNrYWdlcyBpbnN0ZWFkYCk7XG5cbiAgICAgIC8vIGlmICghZnMuZXhpc3RzU3luYyhzZGspKSB7XG4gICAgICAvLyAgICAgdGhyb3cgbmV3IEVycm9yKGBObyBTREsgZm91bmQgYXQgJHtwYXRoLnJlc29sdmUoc2RrKX0uICBEaWQgeW91IGZvciBnZXQgdG8gbGluay9jb3B5IHlvdXIgRXh0IEpTIFNESyB0byB0aGF0IGxvY2F0aW9uP2ApO1xuICAgICAgLy8gfSBlbHNlIHtcbiAgICAgIC8vICAgICAvL21qZyB0aGlzIG5lZWRlZD8gdGhpcy5fYWRkRXh0UmVhY3RQYWNrYWdlKGJ1aWxkKVxuICAgICAgLy8gfVxuICAgIH0gZWxzZSB7XG4gICAgICB0cnkge1xuICAgICAgICBidWlsZC5zZGsgPSBwYXRoLmRpcm5hbWUocmVzb2x2ZSgnQHNlbmNoYS9leHQnLCB7IGJhc2VkaXI6IHByb2Nlc3MuY3dkKCkgfSkpXG4gICAgICAgIGJ1aWxkLnBhY2thZ2VEaXJzID0gWy4uLihidWlsZC5wYWNrYWdlRGlycyB8fCBbXSksIHBhdGguZGlybmFtZShidWlsZC5zZGspXTtcbiAgICAgICAgYnVpbGQucGFja2FnZXMgPSBidWlsZC5wYWNrYWdlcyB8fCB0aGlzLl9maW5kUGFja2FnZXMoYnVpbGQuc2RrKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy90aHJvdyBuZXcgRXJyb3IoYEBzZW5jaGEvZXh0LW1vZGVybiBub3QgZm91bmQuICBZb3UgY2FuIGluc3RhbGwgaXQgd2l0aCBcIm5wbSBpbnN0YWxsIC0tc2F2ZSBAc2VuY2hhL2V4dC1tb2Rlcm5cIiBvciwgaWYgeW91IGhhdmUgYSBsb2NhbCBjb3B5IG9mIHRoZSBTREssIHNwZWNpZnkgdGhlIHBhdGggdG8gaXQgdXNpbmcgdGhlIFwic2RrXCIgb3B0aW9uIGluIGJ1aWxkIFwiJHtuYW1lfS5cImApO1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEBzZW5jaGEvZXh0IG5vdCBmb3VuZC4gIFlvdSBjYW4gaW5zdGFsbCBpdCB3aXRoIFwibnBtIGluc3RhbGwgLS1zYXZlIEBzZW5jaGEvZXh0YCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy8gLyoqXG4gIC8vICAqIEFkZHMgdGhlIEV4dFJlYWN0IHBhY2thZ2UgaWYgcHJlc2VudCBhbmQgdGhlIHRvb2xraXQgaXMgbW9kZXJuXG4gIC8vICAqIEBwYXJhbSB7T2JqZWN0fSBidWlsZCBcbiAgLy8gICovXG4gIC8vIF9hZGRFeHRSZWFjdFBhY2thZ2UoYnVpbGQpIHtcbiAgLy8gICBpZiAoYnVpbGQudG9vbGtpdCA9PT0gJ2NsYXNzaWMnKSByZXR1cm47XG4gIC8vICAgaWYgKGZzLmV4aXN0c1N5bmMocGF0aC5qb2luKGJ1aWxkLnNkaywgJ2V4dCcsICdtb2Rlcm4nLCAncmVhY3QnKSkgfHwgIC8vIHJlcG9cbiAgLy8gICAgIGZzLmV4aXN0c1N5bmMocGF0aC5qb2luKGJ1aWxkLnNkaywgJ21vZGVybicsICdyZWFjdCcpKSkgeyAvLyBwcm9kdWN0aW9uIGJ1aWxkXG4gIC8vICAgICBpZiAoIWJ1aWxkLnBhY2thZ2VzKSB7XG4gIC8vICAgICAgIGJ1aWxkLnBhY2thZ2VzID0gW107XG4gIC8vICAgICB9XG4gIC8vICAgICBidWlsZC5wYWNrYWdlcy5wdXNoKCdyZWFjdCcpO1xuICAvLyAgIH1cbiAgLy8gfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gdGhlIG5hbWVzIG9mIGFsbCBFeHRSZWFjdCBwYWNrYWdlcyBpbiB0aGUgc2FtZSBwYXJlbnQgZGlyZWN0b3J5IGFzIGV4dC1yZWFjdCAodHlwaWNhbGx5IG5vZGVfbW9kdWxlcy9Ac2VuY2hhKVxuICAgKiBAcHJpdmF0ZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gc2RrIFBhdGggdG8gZXh0LXJlYWN0XG4gICAqIEByZXR1cm4ge1N0cmluZ1tdfVxuICAgKi9cbiAgX2ZpbmRQYWNrYWdlcyhzZGspIHtcbiAgICBjb25zdCBtb2R1bGVzRGlyID0gcGF0aC5qb2luKHNkaywgJy4uJyk7XG4gICAgcmV0dXJuIGZzLnJlYWRkaXJTeW5jKG1vZHVsZXNEaXIpXG4gICAgICAvLyBGaWx0ZXIgb3V0IGRpcmVjdG9yaWVzIHdpdGhvdXQgJ3BhY2thZ2UuanNvbidcbiAgICAgIC5maWx0ZXIoZGlyID0+IGZzLmV4aXN0c1N5bmMocGF0aC5qb2luKG1vZHVsZXNEaXIsIGRpciwgJ3BhY2thZ2UuanNvbicpKSlcbiAgICAgIC8vIEdlbmVyYXRlIGFycmF5IG9mIHBhY2thZ2UgbmFtZXNcbiAgICAgIC5tYXAoZGlyID0+IHtcbiAgICAgICAgICBjb25zdCBwYWNrYWdlSW5mbyA9IEpTT04ucGFyc2UoZnMucmVhZEZpbGVTeW5jKHBhdGguam9pbihtb2R1bGVzRGlyLCBkaXIsICdwYWNrYWdlLmpzb24nKSkpO1xuICAgICAgICAgIC8vIERvbid0IGluY2x1ZGUgdGhlbWUgdHlwZSBwYWNrYWdlcy5cbiAgICAgICAgICBpZihwYWNrYWdlSW5mby5zZW5jaGEgJiYgcGFja2FnZUluZm8uc2VuY2hhLnR5cGUgIT09ICd0aGVtZScpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHBhY2thZ2VJbmZvLnNlbmNoYS5uYW1lO1xuICAgICAgICAgIH1cbiAgICAgIH0pXG4gICAgICAvLyBSZW1vdmUgYW55IHVuZGVmaW5lZHMgZnJvbSBtYXBcbiAgICAgIC5maWx0ZXIobmFtZSA9PiBuYW1lKTtcbiAgfVxufVxuXG5cblxuXG5cblxuICAvLyAvKipcbiAgLy8gICogUmV0dXJucyB0aGUgcGF0aCB0byB0aGUgc2VuY2hhIGNtZCBleGVjdXRhYmxlXG4gIC8vICAqIEBwcml2YXRlXG4gIC8vICAqIEByZXR1cm4ge1N0cmluZ31cbiAgLy8gICovXG4gIC8vIF9nZXRTZW5jaENtZFBhdGgoKSB7XG4gIC8vICAgdHJ5IHsgcmV0dXJuIHJlcXVpcmUoJ0BzZW5jaGEvY21kJykgfSBcbiAgLy8gICBjYXRjaCAoZSkgeyByZXR1cm4gJ3NlbmNoYScgfVxuICAvLyB9XG5cblxuICAgICAgLy8gaWYgKHRoaXMud2F0Y2gpIHtcbiAgICAgIC8vICAgaWYgKCF3YXRjaGluZykge1xuICAgICAgLy8gICAgIHdhdGNoaW5nID0gZ2F0aGVyRXJyb3JzKGZvcmsoc2VuY2hhLCBbJ2FudCcsICd3YXRjaCddLCB7IGN3ZDogb3V0cHV0LCBzaWxlbnQ6IHRydWUgfSkpO1xuICAgICAgLy8gICAgIHdhdGNoaW5nLnN0ZGVyci5waXBlKHByb2Nlc3Muc3RkZXJyKTtcbiAgICAgIC8vICAgICB3YXRjaGluZy5zdGRvdXQucGlwZShwcm9jZXNzLnN0ZG91dCk7XG4gICAgICAvLyAgICAgd2F0Y2hpbmcuc3Rkb3V0Lm9uKCdkYXRhJywgZGF0YSA9PiB7XG4gICAgICAvLyAgICAgICBpZiAoZGF0YSAmJiBkYXRhLnRvU3RyaW5nKCkubWF0Y2goL1dhaXRpbmcgZm9yIGNoYW5nZXNcXC5cXC5cXC4vKSkge1xuICAgICAgLy8gICAgICAgICBvbkJ1aWxkRG9uZSgpXG4gICAgICAvLyAgICAgICB9XG4gICAgICAvLyAgICAgfSlcbiAgICAgIC8vICAgICB3YXRjaGluZy5vbignZXhpdCcsIG9uQnVpbGREb25lKVxuICAgICAgLy8gICB9XG4gICAgICAvLyAgIGlmICghY21kUmVidWlsZE5lZWRlZCkge1xuICAgICAgLy8gICAgIHJlYWRsaW5lLmN1cnNvclRvKHByb2Nlc3Muc3Rkb3V0LCAwKTtjb25zb2xlLmxvZyhhcHAgKyAnRXh0IHJlYnVpbGQgTk9UIG5lZWRlZCcpXG4gICAgICAvLyAgICAgb25CdWlsZERvbmUoKVxuICAgICAgLy8gICB9XG4gICAgICAvLyAgIGVsc2Uge1xuICAgICAgLy8gICAgIC8vcmVhZGxpbmUuY3Vyc29yVG8ocHJvY2Vzcy5zdGRvdXQsIDApO2NvbnNvbGUubG9nKGFwcCArICdFeHQgcmVidWlsZCBJUyBuZWVkZWQnKVxuICAgICAgLy8gICB9XG4gICAgICAvLyB9IFxuICAgICAgLy8gZWxzZSB7XG4gICAgICAvLyAgIGNvbnN0IGJ1aWxkID0gZ2F0aGVyRXJyb3JzKGZvcmsoc2VuY2hhLCBbJ2FudCcsICdidWlsZCddLCB7IHN0ZGlvOiAnaW5oZXJpdCcsIGVuY29kaW5nOiAndXRmLTgnLCBjd2Q6IG91dHB1dCwgc2lsZW50OiBmYWxzZSB9KSk7XG4gICAgICAvLyAgIHJlYWRsaW5lLmN1cnNvclRvKHByb2Nlc3Muc3Rkb3V0LCAwKTtjb25zb2xlLmxvZyhhcHAgKyAnc2VuY2hhIGFudCBidWlsZCcpXG4gICAgICAvLyAgIGlmKGJ1aWxkLnN0ZG91dCkgeyBidWlsZC5zdGRvdXQucGlwZShwcm9jZXNzLnN0ZG91dCkgfVxuICAgICAgLy8gICBpZihidWlsZC5zdGRlcnIpIHsgYnVpbGQuc3RkZXJyLnBpcGUocHJvY2Vzcy5zdGRlcnIpIH1cbiAgICAgIC8vICAgYnVpbGQub24oJ2V4aXQnLCBvbkJ1aWxkRG9uZSk7XG4gICAgICAvLyB9XG5cblxuXG4vLyBjb25zdCBnYXRoZXJFcnJvcnMyID0gKGNtZCkgPT4ge1xuLy8gICBpZiAoY21kLnN0ZG91dCkge1xuLy8gICAgIGNtZC5zdGRvdXQub24oJ2RhdGEnLCBkYXRhID0+IHtcbi8vICAgICAgIGNvbnN0IG1lc3NhZ2UgPSBkYXRhLnRvU3RyaW5nKCk7XG4vLyAgICAgICBpZiAobWVzc2FnZS5tYXRjaCgvXlxcW0VSUlxcXS8pKSB7XG4vLyAgICAgICAgIGNtZEVycm9ycy5wdXNoKG1lc3NhZ2UucmVwbGFjZSgvXlxcW0VSUlxcXSAvZ2ksICcnKSk7XG4vLyAgICAgICB9XG4vLyAgICAgfSlcbi8vICAgfVxuLy8gICByZXR1cm4gY21kO1xuLy8gfVxuXG4vLyBmdW5jdGlvbiBnYXRoZXJFcnJvcnMgKGNtZCkge1xuLy8gICBpZiAoY21kLnN0ZG91dCkge1xuLy8gICAgIGNtZC5zdGRvdXQub24oJ2RhdGEnLCBkYXRhID0+IHtcbi8vICAgICAgIGNvbnN0IG1lc3NhZ2UgPSBkYXRhLnRvU3RyaW5nKCk7XG4vLyAgICAgICBpZiAobWVzc2FnZS5tYXRjaCgvXlxcW0VSUlxcXS8pKSB7XG4vLyAgICAgICAgIGNtZEVycm9ycy5wdXNoKG1lc3NhZ2UucmVwbGFjZSgvXlxcW0VSUlxcXSAvZ2ksICcnKSk7XG4vLyAgICAgICB9XG4vLyAgICAgfSlcbi8vICAgfVxuLy8gICByZXR1cm4gY21kXG4vLyB9XG5cblxuXG5cblxuXG4vLyBmcm9tIHRoaXMuZW1pdFxuICAgIC8vIHRoZSBmb2xsb3dpbmcgaXMgbmVlZGVkIGZvciBodG1sLXdlYnBhY2stcGx1Z2luIHRvIGluY2x1ZGUgPHNjcmlwdD4gYW5kIDxsaW5rPiB0YWdzIGZvciBFeHRSZWFjdFxuICAgIC8vIGNvbnNvbGUubG9nKCdjb21waWxhdGlvbicpXG4gICAgLy8gY29uc29sZS5sb2coJyoqKioqKioqY29tcGlsYXRpb24uY2h1bmtzWzBdJylcbiAgICAvLyBjb25zb2xlLmxvZyhjb21waWxhdGlvbi5jaHVua3NbMF0uaWQpXG4gICAgLy8gY29uc29sZS5sb2cocGF0aC5qb2luKHRoaXMub3V0cHV0LCAnZXh0LmpzJykpXG4gICAgLy8gY29uc3QganNDaHVuayA9IGNvbXBpbGF0aW9uLmFkZENodW5rKGAke3RoaXMub3V0cHV0fS1qc2ApO1xuICAgIC8vIGpzQ2h1bmsuaGFzUnVudGltZSA9IGpzQ2h1bmsuaXNJbml0aWFsID0gKCkgPT4gdHJ1ZTtcbiAgICAvLyBqc0NodW5rLmZpbGVzLnB1c2gocGF0aC5qb2luKHRoaXMub3V0cHV0LCAnZXh0LmpzJykpO1xuICAgIC8vIGpzQ2h1bmsuZmlsZXMucHVzaChwYXRoLmpvaW4odGhpcy5vdXRwdXQsICdleHQuY3NzJykpO1xuICAgIC8vIGpzQ2h1bmsuaWQgPSAnYWFhYXAnOyAvLyB0aGlzIGZvcmNlcyBodG1sLXdlYnBhY2stcGx1Z2luIHRvIGluY2x1ZGUgZXh0LmpzIGZpcnN0XG4gICAgLy8gY29uc29sZS5sb2coJyoqKioqKioqY29tcGlsYXRpb24uY2h1bmtzWzFdJylcbiAgICAvLyBjb25zb2xlLmxvZyhjb21waWxhdGlvbi5jaHVua3NbMV0uaWQpXG5cbiAgICAvL2lmICh0aGlzLmFzeW5jaHJvbm91cykgY2FsbGJhY2soKTtcbi8vICAgIGNvbnNvbGUubG9nKGNhbGxiYWNrKVxuXG4vLyBpZiAoaXNXZWJwYWNrNCkge1xuLy8gICBjb25zb2xlLmxvZyhwYXRoLmpvaW4odGhpcy5vdXRwdXQsICdleHQuanMnKSlcbi8vICAgY29uc3Qgc3RhdHMgPSBmcy5zdGF0U3luYyhwYXRoLmpvaW4ob3V0cHV0UGF0aCwgJ2V4dC5qcycpKVxuLy8gICBjb25zdCBmaWxlU2l6ZUluQnl0ZXMgPSBzdGF0cy5zaXplXG4vLyAgIGNvbXBpbGF0aW9uLmFzc2V0c1snZXh0LmpzJ10gPSB7XG4vLyAgICAgc291cmNlOiBmdW5jdGlvbigpIHtyZXR1cm4gZnMucmVhZEZpbGVTeW5jKHBhdGguam9pbihvdXRwdXRQYXRoLCAnZXh0LmpzJykpfSxcbi8vICAgICBzaXplOiBmdW5jdGlvbigpIHtyZXR1cm4gZmlsZVNpemVJbkJ5dGVzfVxuLy8gICB9XG4vLyAgIGNvbnNvbGUubG9nKGNvbXBpbGF0aW9uLmVudHJ5cG9pbnRzKVxuXG4vLyAgIHZhciBmaWxlbGlzdCA9ICdJbiB0aGlzIGJ1aWxkOlxcblxcbic7XG5cbi8vICAgLy8gTG9vcCB0aHJvdWdoIGFsbCBjb21waWxlZCBhc3NldHMsXG4vLyAgIC8vIGFkZGluZyBhIG5ldyBsaW5lIGl0ZW0gZm9yIGVhY2ggZmlsZW5hbWUuXG4vLyAgIGZvciAodmFyIGZpbGVuYW1lIGluIGNvbXBpbGF0aW9uLmFzc2V0cykge1xuLy8gICAgIGZpbGVsaXN0ICs9ICgnLSAnKyBmaWxlbmFtZSArJ1xcbicpO1xuLy8gICB9XG5cbi8vICAgLy8gSW5zZXJ0IHRoaXMgbGlzdCBpbnRvIHRoZSB3ZWJwYWNrIGJ1aWxkIGFzIGEgbmV3IGZpbGUgYXNzZXQ6XG4vLyAgIGNvbXBpbGF0aW9uLmFzc2V0c1snZmlsZWxpc3QubWQnXSA9IHtcbi8vICAgICBzb3VyY2UoKSB7XG4vLyAgICAgICByZXR1cm4gZmlsZWxpc3Q7XG4vLyAgICAgfSxcbi8vICAgICBzaXplKCkge1xuLy8gICAgICAgcmV0dXJuIGZpbGVsaXN0Lmxlbmd0aDtcbi8vICAgICB9XG4vLyAgIH1cbi8vIH1cblxuXG4gICAgLy8gaWYgKGNvbXBpbGVyLmhvb2tzKSB7XG4gICAgLy8gICAgIC8vIGluICdleHRyZWFjdC1jb21waWxhdGlvbidcbiAgICAvLyAgICAgLy9odHRwczovL2dpdGh1Yi5jb20vamFrZXRyZW50L2h0bWwtd2VicGFjay10ZW1wbGF0ZVxuICAgIC8vICAgICAvL2h0dHBzOi8vZ2l0aHViLmNvbS9qYW50aW1vbi9odG1sLXdlYnBhY2stcGx1Z2luI1xuICAgIC8vICAgICAvLyB0aGUgZm9sbG93aW5nIGlzIG5lZWRlZCBmb3IgaHRtbC13ZWJwYWNrLXBsdWdpbiB0byBpbmNsdWRlIDxzY3JpcHQ+IGFuZCA8bGluaz4gdGFncyBmb3IgRXh0UmVhY3RcbiAgICAvLyAgICAgY29tcGlsZXIuaG9va3MuaHRtbFdlYnBhY2tQbHVnaW5CZWZvcmVIdG1sR2VuZXJhdGlvbi50YXBBc3luYyhcbiAgICAvLyAgICAgICAnZXh0cmVhY3QtaHRtbGdlbmVyYXRpb24nLFxuICAgIC8vICAgICAgIChkYXRhLCBjYikgPT4ge1xuICAgIC8vICAgICAgICAgcmVhZGxpbmUuY3Vyc29yVG8ocHJvY2Vzcy5zdGRvdXQsIDApO2NvbnNvbGUubG9nKGFwcCArICdleHRyZWFjdC1odG1sZ2VuZXJhdGlvbicpXG4gICAgLy8gICAgICAgICBjb25zb2xlLmxvZygnZGF0YS5hc3NldHMuanMubGVuZ3RoJylcbiAgICAvLyAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEuYXNzZXRzLmpzLmxlbmd0aClcbiAgICAvLyAgICAgICAgIGRhdGEuYXNzZXRzLmpzLnVuc2hpZnQoJ2V4dC1yZWFjdC9leHQuanMnKVxuICAgIC8vICAgICAgICAgZGF0YS5hc3NldHMuY3NzLnVuc2hpZnQoJ2V4dC1yZWFjdC9leHQuY3NzJylcbiAgICAvLyAgICAgICAgIGNiKG51bGwsIGRhdGEpXG4gICAgLy8gICAgICAgfVxuICAgIC8vICAgICApXG4gICAgLy8gICB9XG5cbiJdfQ==