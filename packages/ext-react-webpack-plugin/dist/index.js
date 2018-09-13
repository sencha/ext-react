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

var _rimraf = require("rimraf");

var _astring = require("astring");

var _resolve = require("resolve");

var _artifacts = require("./artifacts");

var _extractFromJSX = _interopRequireDefault(require("./extractFromJSX"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
    }

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
    // Object.assign(this, {
    //   ...this.options
    // })

  }

  watchRun() {
    this.options.watch = true;
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
        me.options.dependencies[file] = [...(me.options.dependencies[file] || []), (0, _astring.generate)(call)];
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
      var outputPath, parms, cmdErrors, url, opn;
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
            outputPath = _path.default.join(compiler.outputPath, _this.options.output); // webpack-dev-server overwrites the outputPath to "/", so we need to prepend contentBase

            if (compiler.outputPath === '/' && compiler.options.devServer) {
              outputPath = _path.default.join(compiler.options.devServer.contentBase, outputPath);
            }

            _this._buildExtFolder(outputPath); //var parms = ['app', 'build', this.options.profile, this.options.environment]


            parms = ['app', 'build'];
            cmdErrors = [];
            _context.next = 7;
            return (0, _pluginUtil._buildExtBundle)(compilation, cmdErrors, outputPath, parms, _this.options.verbose);

          case 7:
            if (_this.options.watch && _this.count == 0 && cmdErrors.length == 0) {
              url = 'http://localhost:' + _this.options.port;
              readline.cursorTo(process.stdout, 0);
              console.log(app + 'ext-react-emit - open browser at ' + url);
              _this.count++;
              opn = require('opn');
              opn(url);
            }

            callback();

          case 9:
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
    js = 'Ext.require("Ext.*")'; // if (this.options.treeShaking) {
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

    if (this.options.manifest === null || js !== this.options.manifest) {
      this.options.manifest = js; //readline.cursorTo(process.stdout, 0);console.log(app + 'tree shaking: ' + this.options.treeShaking)

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
  //     // if (this.options.treeShaking) {
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
    this.options.currentFile = module.resource;

    if (module.resource && module.resource.match(this.options.test) && !module.resource.match(/node_modules/) && !module.resource.match(`/ext-react${this.reactVersion}/`)) {
      const doParse = () => {
        this.options.dependencies[this.options.currentFile] = [...(this.options.dependencies[this.options.currentFile] || []), ...this.options.manifestExtractor(module._source._value, compilation, module, this.reactVersion)];
      };

      if (this.options.debug) {
        doParse();
      } else {
        try {
          doParse();
        } catch (e) {
          console.error('\nerror parsing ' + this.options.currentFile);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJwbHVnaW5OYW1lIiwiYXBwIiwiRXh0UmVhY3RXZWJwYWNrUGx1Z2luIiwiZ2V0RGVmYXVsdE9wdGlvbnMiLCJwb3J0IiwicHJvZmlsZSIsImVudmlyb25tZW50IiwidmVyYm9zZSIsImN1cnJlbnRGaWxlIiwibWFuaWZlc3QiLCJkZXBlbmRlbmNpZXMiLCJidWlsZHMiLCJkZWJ1ZyIsIndhdGNoIiwidGVzdCIsIm91dHB1dCIsInRvb2xraXQiLCJwYWNrYWdlcyIsInBhY2thZ2VEaXJzIiwib3ZlcnJpZGVzIiwiYXN5bmNocm9ub3VzIiwicHJvZHVjdGlvbiIsIm1hbmlmZXN0RXh0cmFjdG9yIiwiZXh0cmFjdEZyb21KU1giLCJ0cmVlU2hha2luZyIsImNvbnN0cnVjdG9yIiwib3B0aW9ucyIsImZpcnN0VGltZSIsImNvdW50IiwicGtnIiwiZnMiLCJleGlzdHNTeW5jIiwiSlNPTiIsInBhcnNlIiwicmVhZEZpbGVTeW5jIiwicmVhY3RWZXJzaW9uRnVsbCIsInJlYWN0IiwiaXMxNiIsImluY2x1ZGVzIiwicmVhY3RWZXJzaW9uIiwiZXh0UmVhY3RSYyIsIk9iamVjdCIsImtleXMiLCJsZW5ndGgiLCJidWlsZE9wdGlvbnMiLCJleHQiLCJuYW1lIiwiX3ZhbGlkYXRlQnVpbGRDb25maWciLCJ3YXRjaFJ1biIsImFwcGx5IiwiY29tcGlsZXIiLCJ3ZWJwYWNrVmVyc2lvbiIsInVuZGVmaW5lZCIsImlzV2VicGFjazQiLCJob29rcyIsInByb2Nlc3MiLCJzdGRvdXQiLCJjdXJzb3JUbyIsImNvbnNvbGUiLCJsb2ciLCJtZSIsInRhcEFzeW5jIiwid2F0Y2hpbmciLCJjYiIsInJlYWRsaW5lIiwidGFwIiwicGx1Z2luIiwiYWRkVG9NYW5pZmVzdCIsImNhbGwiLCJmaWxlIiwic3RhdGUiLCJtb2R1bGUiLCJyZXNvdXJjZSIsImUiLCJlcnJvciIsImNvbXBpbGF0aW9uIiwiZGF0YSIsInN1Y2NlZWRNb2R1bGUiLCJub3JtYWxNb2R1bGVGYWN0b3J5IiwicGFyc2VyIiwiaHRtbFdlYnBhY2tQbHVnaW5CZWZvcmVIdG1sR2VuZXJhdGlvbiIsIm91dHB1dE9wdGlvbnMiLCJwdWJsaWNQYXRoIiwiYXNzZXRzIiwianMiLCJ1bnNoaWZ0IiwiY3NzIiwicGF0aCIsImpvaW4iLCJlbWl0IiwiY2FsbGJhY2siLCJkb25lIiwib3V0cHV0UGF0aCIsImRldlNlcnZlciIsImNvbnRlbnRCYXNlIiwiX2J1aWxkRXh0Rm9sZGVyIiwicGFybXMiLCJjbWRFcnJvcnMiLCJ1cmwiLCJvcG4iLCJyZXF1aXJlIiwidGhlbWUiLCJzZGsiLCJ1c2VyUGFja2FnZXMiLCJwdXNoIiwid3JpdGVGaWxlU3luYyIsImNvbXByZXNzIiwibWF0Y2giLCJkb1BhcnNlIiwiX3NvdXJjZSIsIl92YWx1ZSIsImJ1aWxkIiwiRXJyb3IiLCJjaGFsayIsInJlZCIsImRpcm5hbWUiLCJiYXNlZGlyIiwiY3dkIiwiX2ZpbmRQYWNrYWdlcyIsIm1vZHVsZXNEaXIiLCJyZWFkZGlyU3luYyIsImZpbHRlciIsImRpciIsIm1hcCIsInBhY2thZ2VJbmZvIiwic2VuY2hhIiwidHlwZSJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFFQTs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUEsTUFBTUEsVUFBVSxHQUFHLDBCQUFuQjtBQUNBLE1BQU1DLEdBQUcsR0FBRyx5QkFBUUQsVUFBUixDQUFaOztBQUVlLE1BQU1FLHFCQUFOLENBQTRCO0FBQ3pDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFtQkFDLEVBQUFBLGlCQUFpQixHQUFHO0FBQ2xCLFdBQU87QUFDTEMsTUFBQUEsSUFBSSxFQUFFLElBREQ7QUFFTEMsTUFBQUEsT0FBTyxFQUFFLFNBRko7QUFHTEMsTUFBQUEsV0FBVyxFQUFFLGFBSFI7QUFJTEMsTUFBQUEsT0FBTyxFQUFFLElBSko7QUFLTEMsTUFBQUEs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Q0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFHSTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnXG5pbXBvcnQgJ0BiYWJlbC9wb2x5ZmlsbCdcbmltcG9ydCAqIGFzIHJlYWRsaW5lIGZyb20gJ3JlYWRsaW5lJ1xuaW1wb3J0IHsgX2dldEFwcCwgX2dldFZlcnNpb25zLCBfYnVpbGRFeHRCdW5kbGUgfSBmcm9tICcuL3BsdWdpblV0aWwnXG5pbXBvcnQgZnMgZnJvbSAnZnMnXG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJ1xuaW1wb3J0IGNoYWxrIGZyb20gJ2NoYWxrJ1xuaW1wb3J0IHsgc3luYyBhcyBta2RpcnAgfSBmcm9tICdta2RpcnAnXG5pbXBvcnQgeyBzeW5jIGFzIHJpbXJhZiB9IGZyb20gJ3JpbXJhZidcbmltcG9ydCB7IGdlbmVyYXRlIH0gZnJvbSAnYXN0cmluZydcbmltcG9ydCB7IHN5bmMgYXMgcmVzb2x2ZSB9IGZyb20gJ3Jlc29sdmUnXG5cbmltcG9ydCB7IGJ1aWxkWE1MLCBjcmVhdGVBcHBKc29uLCBjcmVhdGVXb3Jrc3BhY2VKc29uLCBjcmVhdGVKU0RPTUVudmlyb25tZW50IH0gZnJvbSAnLi9hcnRpZmFjdHMnXG5pbXBvcnQgZXh0cmFjdEZyb21KU1ggZnJvbSAnLi9leHRyYWN0RnJvbUpTWCdcblxuY29uc3QgcGx1Z2luTmFtZSA9ICdleHQtcmVhY3Qtd2VicGFjay1wbHVnaW4nXG5jb25zdCBhcHAgPSBfZ2V0QXBwKHBsdWdpbk5hbWUpXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEV4dFJlYWN0V2VicGFja1BsdWdpbiB7XG4gIC8qKlxuICAgKiBAcGFyYW0ge1N0cmluZ30gcG9ydCAtIHRoZSBVUkwgcG9ydCBudW1iZXJcbiAgICogQHBhcmFtIHtPYmplY3RbXX0gYnVpbGRzXG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gW2RlYnVnPWZhbHNlXSBTZXQgdG8gdHJ1ZSB0byBwcmV2ZW50IGNsZWFudXAgb2YgYnVpbGQgdGVtcG9yYXJ5IGJ1aWxkIGFydGlmYWN0cyB0aGF0IG1pZ2h0IGJlIGhlbHBmdWwgaW4gdHJvdWJsZXNob290aW5nIGlzc3Vlcy5cbiAgICogZGVwcmVjYXRlZCBAcGFyYW0ge1N0cmluZ30gc2RrIFRoZSBmdWxsIHBhdGggdG8gdGhlIEV4dFJlYWN0IFNES1xuICAgKiBAcGFyYW0ge1N0cmluZ30gW3Rvb2xraXQ9J21vZGVybiddIFwibW9kZXJuXCIgb3IgXCJjbGFzc2ljXCJcbiAgICogQHBhcmFtIHtTdHJpbmd9IHRoZW1lIFRoZSBuYW1lIG9mIHRoZSBFeHRSZWFjdCB0aGVtZSBwYWNrYWdlIHRvIHVzZSwgZm9yIGV4YW1wbGUgXCJ0aGVtZS1tYXRlcmlhbFwiXG4gICAqIEBwYXJhbSB7U3RyaW5nW119IHBhY2thZ2VzIEFuIGFycmF5IG9mIEV4dFJlYWN0IHBhY2thZ2VzIHRvIGluY2x1ZGVcbiAgICogQHBhcmFtIHtTdHJpbmdbXX0gb3ZlcnJpZGVzIEFuIGFycmF5IHdpdGggdGhlIHBhdGhzIG9mIGRpcmVjdG9yaWVzIG9yIGZpbGVzIHRvIHNlYXJjaC4gQW55IGNsYXNzZXNcbiAgICogZGVjbGFyZWQgaW4gdGhlc2UgbG9jYXRpb25zIHdpbGwgYmUgYXV0b21hdGljYWxseSByZXF1aXJlZCBhbmQgaW5jbHVkZWQgaW4gdGhlIGJ1aWxkLlxuICAgKiBJZiBhbnkgZmlsZSBkZWZpbmVzIGFuIEV4dFJlYWN0IG92ZXJyaWRlICh1c2luZyBFeHQuZGVmaW5lIHdpdGggYW4gXCJvdmVycmlkZVwiIHByb3BlcnR5KSxcbiAgICogdGhhdCBvdmVycmlkZSB3aWxsIGluIGZhY3Qgb25seSBiZSBpbmNsdWRlZCBpbiB0aGUgYnVpbGQgaWYgdGhlIHRhcmdldCBjbGFzcyBzcGVjaWZpZWRcbiAgICogaW4gdGhlIFwib3ZlcnJpZGVcIiBwcm9wZXJ0eSBpcyBhbHNvIGluY2x1ZGVkLlxuICAgKiBAcGFyYW0ge1N0cmluZ30gb3V0cHV0IFRoZSBwYXRoIHRvIGRpcmVjdG9yeSB3aGVyZSB0aGUgRXh0UmVhY3QgYnVuZGxlIHNob3VsZCBiZSB3cml0dGVuXG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gYXN5bmNocm9ub3VzIFNldCB0byB0cnVlIHRvIHJ1biBTZW5jaGEgQ21kIGJ1aWxkcyBhc3luY2hyb25vdXNseS4gVGhpcyBtYWtlcyB0aGUgd2VicGFjayBidWlsZCBmaW5pc2ggbXVjaCBmYXN0ZXIsIGJ1dCB0aGUgYXBwIG1heSBub3QgbG9hZCBjb3JyZWN0bHkgaW4geW91ciBicm93c2VyIHVudGlsIFNlbmNoYSBDbWQgaXMgZmluaXNoZWQgYnVpbGRpbmcgdGhlIEV4dFJlYWN0IGJ1bmRsZVxuICAgKiBAcGFyYW0ge0Jvb2xlYW59IHByb2R1Y3Rpb24gU2V0IHRvIHRydWUgZm9yIHByb2R1Y3Rpb24gYnVpbGRzLiAgVGhpcyB0ZWxsIFNlbmNoYSBDbWQgdG8gY29tcHJlc3MgdGhlIGdlbmVyYXRlZCBKUyBidW5kbGUuXG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gdHJlZVNoYWtpbmcgU2V0IHRvIGZhbHNlIHRvIGRpc2FibGUgdHJlZSBzaGFraW5nIGluIGRldmVsb3BtZW50IGJ1aWxkcy4gIFRoaXMgbWFrZXMgaW5jcmVtZW50YWwgcmVidWlsZHMgZmFzdGVyIGFzIGFsbCBFeHRSZWFjdCBjb21wb25lbnRzIGFyZSBpbmNsdWRlZCBpbiB0aGUgZXh0LmpzIGJ1bmRsZSBpbiB0aGUgaW5pdGlhbCBidWlsZCBhbmQgdGh1cyB0aGUgYnVuZGxlIGRvZXMgbm90IG5lZWQgdG8gYmUgcmVidWlsdCBhZnRlciBlYWNoIGNoYW5nZS4gRGVmYXVsdHMgdG8gdHJ1ZS5cbiAgICovXG5cbiAgZ2V0RGVmYXVsdE9wdGlvbnMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHBvcnQ6IDgwMTYsXG4gICAgICBwcm9maWxlOiAnZGVza3RvcCcsIFxuICAgICAgZW52aXJvbm1lbnQ6ICdkZXZlbG9wbWVudCcsIFxuICAgICAgdmVyYm9zZTogJ25vJyxcbiAgICAgIGN1cnJlbnRGaWxlOiBudWxsLFxuICAgICAgbWFuaWZlc3Q6IG51bGwsXG4gICAgICBkZXBlbmRlbmNpZXM6IFtdLFxuICAgICAgYnVpbGRzOiB7fSxcbiAgICAgIGRlYnVnOiBmYWxzZSxcbiAgICAgIHdhdGNoOiBmYWxzZSxcbiAgICAgIHRlc3Q6IC9cXC4oanx0KXN4PyQvLFxuICAgICAgLyogYmVnaW4gc2luZ2xlIGJ1aWxkIG9ubHkgKi9cbiAgICAgIG91dHB1dDogJ2V4dC1yZWFjdCcsXG4gICAgICB0b29sa2l0OiAnbW9kZXJuJyxcbiAgICAgIHBhY2thZ2VzOiBudWxsLFxuICAgICAgcGFja2FnZURpcnM6IFtdLFxuICAgICAgb3ZlcnJpZGVzOiBbXSxcbiAgICAgIGFzeW5jaHJvbm91czogZmFsc2UsXG4gICAgICBwcm9kdWN0aW9uOiBmYWxzZSxcbiAgICAgIG1hbmlmZXN0RXh0cmFjdG9yOiBleHRyYWN0RnJvbUpTWCxcbiAgICAgIHRyZWVTaGFraW5nOiBmYWxzZVxuICAgICAgLyogZW5kIHNpbmdsZSBidWlsZCBvbmx5ICovXG4gICAgfVxuICB9XG5cbiAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuXG4gICAgdGhpcy5maXJzdFRpbWUgPSB0cnVlXG4gICAgdGhpcy5jb3VudCA9IDBcblxuICAgIC8vY2FuIGJlIGluIGRldmRlcGVuZGVuY2llcyAtIGFjY291bnQgZm9yIHRoaXM6IHJlYWN0OiBcIjE1LjE2LjBcIlxuICAgIHZhciBwa2cgPSAoZnMuZXhpc3RzU3luYygncGFja2FnZS5qc29uJykgJiYgSlNPTi5wYXJzZShmcy5yZWFkRmlsZVN5bmMoJ3BhY2thZ2UuanNvbicsICd1dGYtOCcpKSB8fCB7fSlcbiAgICB0aGlzLnJlYWN0VmVyc2lvbkZ1bGwgPSBwa2cuZGVwZW5kZW5jaWVzLnJlYWN0XG4gICAgdmFyIGlzMTYgPSB0aGlzLnJlYWN0VmVyc2lvbkZ1bGwuaW5jbHVkZXMoXCIxNlwiKVxuICAgIGlmIChpczE2KSB7IHRoaXMucmVhY3RWZXJzaW9uID0gMTYgfVxuICAgIGVsc2UgeyB0aGlzLnJlYWN0VmVyc2lvbiA9IDE1IH1cblxuICAgIGNvbnN0IGV4dFJlYWN0UmMgPSAoZnMuZXhpc3RzU3luYygnLmV4dC1yZWFjdHJjJykgJiYgSlNPTi5wYXJzZShmcy5yZWFkRmlsZVN5bmMoJy5leHQtcmVhY3RyYycsICd1dGYtOCcpKSB8fCB7fSlcbiAgICB0aGlzLm9wdGlvbnMgPSB7IC4uLnRoaXMuZ2V0RGVmYXVsdE9wdGlvbnMoKSwgLi4ub3B0aW9ucywgLi4uZXh0UmVhY3RSYyB9XG4gICAgXG4gICAgY29uc3QgeyBidWlsZHMgfSA9IHRoaXMub3B0aW9uc1xuICAgIGlmIChPYmplY3Qua2V5cyhidWlsZHMpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgY29uc3QgeyBidWlsZHMsIC4uLmJ1aWxkT3B0aW9ucyB9ID0gdGhpcy5vcHRpb25zXG4gICAgICBidWlsZHMuZXh0ID0gYnVpbGRPcHRpb25zXG4gICAgfVxuICAgIGZvciAobGV0IG5hbWUgaW4gYnVpbGRzKSB7XG4gICAgICB0aGlzLl92YWxpZGF0ZUJ1aWxkQ29uZmlnKG5hbWUsIGJ1aWxkc1tuYW1lXSlcbiAgICB9XG5cbiAgICAvLyB0aGlzLm9wdGlvbnMgPSB7IFxuICAgIC8vICAgLi4ub3B0aW9uc1xuICAgIC8vIH1cblxuICAgIC8vIE9iamVjdC5hc3NpZ24odGhpcywge1xuICAgIC8vICAgLi4udGhpcy5vcHRpb25zXG4gICAgLy8gfSlcblxuXG4gIH1cblxuICB3YXRjaFJ1bigpIHtcbiAgICB0aGlzLm9wdGlvbnMud2F0Y2ggPSB0cnVlXG4gIH1cblxuICBhcHBseShjb21waWxlcikge1xuICAgIGlmICh0aGlzLndlYnBhY2tWZXJzaW9uID09IHVuZGVmaW5lZCkge1xuICAgICAgY29uc3QgaXNXZWJwYWNrNCA9IGNvbXBpbGVyLmhvb2tzO1xuICAgICAgaWYgKGlzV2VicGFjazQpIHt0aGlzLndlYnBhY2tWZXJzaW9uID0gJ0lTIHdlYnBhY2sgNCd9XG4gICAgICBlbHNlIHt0aGlzLndlYnBhY2tWZXJzaW9uID0gJ05PVCB3ZWJwYWNrIDQnfVxuICAgICAgcHJvY2Vzcy5zdGRvdXQuY3Vyc29yVG8oMCk7Y29uc29sZS5sb2coX2dldFZlcnNpb25zKGFwcCwgcGx1Z2luTmFtZSwgJ1JlYWN0JykpXG4gICAgfVxuICAgIGNvbnN0IG1lID0gdGhpc1xuICAgIGlmIChjb21waWxlci5ob29rcykge1xuICAgICAgaWYgKHRoaXMuYXN5bmNocm9ub3VzKSB7XG4gICAgICAgIGNvbXBpbGVyLmhvb2tzLndhdGNoUnVuLnRhcEFzeW5jKCdleHQtcmVhY3Qtd2F0Y2gtcnVuIChhc3luYyknLCAod2F0Y2hpbmcsIGNiKSA9PiB7XG4gICAgICAgICAgcmVhZGxpbmUuY3Vyc29yVG8ocHJvY2Vzcy5zdGRvdXQsIDApO2NvbnNvbGUubG9nKGFwcCArICdleHQtcmVhY3Qtd2F0Y2gtcnVuIChhc3luYyknKVxuICAgICAgICAgIHRoaXMud2F0Y2hSdW4oKVxuICAgICAgICAgIGNiKClcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBjb21waWxlci5ob29rcy53YXRjaFJ1bi50YXAoJ2V4dC1yZWFjdC13YXRjaC1ydW4nLCAod2F0Y2hpbmcpID0+IHtcbiAgICAgICAgICByZWFkbGluZS5jdXJzb3JUbyhwcm9jZXNzLnN0ZG91dCwgMCk7Y29uc29sZS5sb2coYXBwICsgJ2V4dC1yZWFjdC13YXRjaC1ydW4nKVxuICAgICAgICAgIHRoaXMud2F0Y2hSdW4oKVxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGNvbXBpbGVyLnBsdWdpbignd2F0Y2gtcnVuJywgKHdhdGNoaW5nLCBjYikgPT4ge1xuICAgICAgICByZWFkbGluZS5jdXJzb3JUbyhwcm9jZXNzLnN0ZG91dCwgMCk7Y29uc29sZS5sb2coYXBwICsgJ3dhdGNoLXJ1bicpXG4gICAgICAgIHRoaXMud2F0Y2hSdW4oKVxuICAgICAgICBjYigpXG4gICAgICB9KVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFkZHMgdGhlIGNvZGUgZm9yIHRoZSBzcGVjaWZpZWQgZnVuY3Rpb24gY2FsbCB0byB0aGUgbWFuaWZlc3QuanMgZmlsZVxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBjYWxsIEEgZnVuY3Rpb24gY2FsbCBBU1Qgbm9kZS5cbiAgICAgKi9cbiAgICBjb25zdCBhZGRUb01hbmlmZXN0ID0gZnVuY3Rpb24oY2FsbCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgZmlsZSA9IHRoaXMuc3RhdGUubW9kdWxlLnJlc291cmNlO1xuICAgICAgICBtZS5vcHRpb25zLmRlcGVuZGVuY2llc1tmaWxlXSA9IFsgLi4uKG1lLm9wdGlvbnMuZGVwZW5kZW5jaWVzW2ZpbGVdIHx8IFtdKSwgZ2VuZXJhdGUoY2FsbCkgXTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihgRXJyb3IgcHJvY2Vzc2luZyAke2ZpbGV9YCk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGlmIChjb21waWxlci5ob29rcykge1xuICAgICAgY29tcGlsZXIuaG9va3MuY29tcGlsYXRpb24udGFwKCdleHQtcmVhY3QtY29tcGlsYXRpb24nLCAoY29tcGlsYXRpb24sZGF0YSkgPT4ge1xuICAgICAgICByZWFkbGluZS5jdXJzb3JUbyhwcm9jZXNzLnN0ZG91dCwgMCk7Y29uc29sZS5sb2coYXBwICsgJ2V4dC1yZWFjdC1jb21waWxhdGlvbicpXG4gICAgICAgIGNvbXBpbGF0aW9uLmhvb2tzLnN1Y2NlZWRNb2R1bGUudGFwKCdleHQtcmVhY3Qtc3VjY2VlZC1tb2R1bGUnLCAobW9kdWxlKSA9PiB7XG4gICAgICAgICAgdGhpcy5zdWNjZWVkTW9kdWxlKGNvbXBpbGF0aW9uLCBtb2R1bGUpXG4gICAgICAgIH0pXG5cbiAgICAgICAgZGF0YS5ub3JtYWxNb2R1bGVGYWN0b3J5LnBsdWdpbihcInBhcnNlclwiLCBmdW5jdGlvbihwYXJzZXIsIG9wdGlvbnMpIHtcbiAgICAgICAgICAvLyBleHRyYWN0IHh0eXBlcyBhbmQgY2xhc3NlcyBmcm9tIEV4dC5jcmVhdGUgY2FsbHNcbiAgICAgICAgICBwYXJzZXIucGx1Z2luKCdjYWxsIEV4dC5jcmVhdGUnLCBhZGRUb01hbmlmZXN0KTtcbiAgICAgICAgICAvLyBjb3B5IEV4dC5yZXF1aXJlIGNhbGxzIHRvIHRoZSBtYW5pZmVzdC4gIFRoaXMgYWxsb3dzIHRoZSB1c2VycyB0byBleHBsaWNpdGx5IHJlcXVpcmUgYSBjbGFzcyBpZiB0aGUgcGx1Z2luIGZhaWxzIHRvIGRldGVjdCBpdC5cbiAgICAgICAgICBwYXJzZXIucGx1Z2luKCdjYWxsIEV4dC5yZXF1aXJlJywgYWRkVG9NYW5pZmVzdCk7XG4gICAgICAgICAgLy8gY29weSBFeHQuZGVmaW5lIGNhbGxzIHRvIHRoZSBtYW5pZmVzdC4gIFRoaXMgYWxsb3dzIHVzZXJzIHRvIHdyaXRlIHN0YW5kYXJkIEV4dFJlYWN0IGNsYXNzZXMuXG4gICAgICAgICAgcGFyc2VyLnBsdWdpbignY2FsbCBFeHQuZGVmaW5lJywgYWRkVG9NYW5pZmVzdCk7XG4gICAgICAgIH0pXG5cbiAgICAgICAgY29tcGlsYXRpb24uaG9va3MuaHRtbFdlYnBhY2tQbHVnaW5CZWZvcmVIdG1sR2VuZXJhdGlvbi50YXBBc3luYygnZXh0LXJlYWN0LWh0bWxnZW5lcmF0aW9uJywoZGF0YSwgY2IpID0+IHtcblxuICAgICAgICAgIHJlYWRsaW5lLmN1cnNvclRvKHByb2Nlc3Muc3Rkb3V0LCAwKTtjb25zb2xlLmxvZyhhcHAgKyAnZXh0LXJlYWN0LWh0bWxnZW5lcmF0aW9uJylcbiAgICAgICAgICAvL3JlYWRsaW5lLmN1cnNvclRvKHByb2Nlc3Muc3Rkb3V0LCAwKTtjb25zb2xlLmxvZyhhcHAgKyBjb21waWxhdGlvbi5vdXRwdXRPcHRpb25zLnB1YmxpY1BhdGgpXG4gICAgICAgICAgaWYgKGNvbXBpbGF0aW9uLm91dHB1dE9wdGlvbnMucHVibGljUGF0aCA9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGRhdGEuYXNzZXRzLmpzLnVuc2hpZnQoJ2V4dC1yZWFjdC9leHQuanMnKVxuICAgICAgICAgICAgZGF0YS5hc3NldHMuY3NzLnVuc2hpZnQoJ2V4dC1yZWFjdC9leHQuY3NzJylcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBkYXRhLmFzc2V0cy5qcy51bnNoaWZ0KHBhdGguam9pbihjb21waWxhdGlvbi5vdXRwdXRPcHRpb25zLnB1YmxpY1BhdGgsICdleHQtcmVhY3QvZXh0LmpzJykpXG4gICAgICAgICAgICBkYXRhLmFzc2V0cy5jc3MudW5zaGlmdChwYXRoLmpvaW4oY29tcGlsYXRpb24ub3V0cHV0T3B0aW9ucy5wdWJsaWNQYXRoLCAnZXh0LXJlYWN0L2V4dC5jc3MnKSlcbiAgICAgICAgICB9XG4gICAgICAgICAgY2IobnVsbCwgZGF0YSlcbiAgICAgICAgfSlcblxuICAgICAgfSlcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBjb21waWxlci5wbHVnaW4oJ2NvbXBpbGF0aW9uJywgKGNvbXBpbGF0aW9uLCBkYXRhKSA9PiB7XG4gICAgICAgIHJlYWRsaW5lLmN1cnNvclRvKHByb2Nlc3Muc3Rkb3V0LCAwKTtjb25zb2xlLmxvZyhhcHAgKyAnY29tcGlsYXRpb24nKVxuICAgICAgICBjb21waWxhdGlvbi5wbHVnaW4oJ3N1Y2NlZWQtbW9kdWxlJywgKG1vZHVsZSkgPT4ge1xuICAgICAgICAgIHRoaXMuc3VjY2VlZE1vZHVsZShjb21waWxhdGlvbiwgbW9kdWxlKVxuICAgICAgICB9KVxuICAgICAgICBkYXRhLm5vcm1hbE1vZHVsZUZhY3RvcnkucGx1Z2luKFwicGFyc2VyXCIsIGZ1bmN0aW9uKHBhcnNlciwgb3B0aW9ucykge1xuICAgICAgICAgIC8vIGV4dHJhY3QgeHR5cGVzIGFuZCBjbGFzc2VzIGZyb20gRXh0LmNyZWF0ZSBjYWxsc1xuICAgICAgICAgIHBhcnNlci5wbHVnaW4oJ2NhbGwgRXh0LmNyZWF0ZScsIGFkZFRvTWFuaWZlc3QpO1xuICAgICAgICAgIC8vIGNvcHkgRXh0LnJlcXVpcmUgY2FsbHMgdG8gdGhlIG1hbmlmZXN0LiAgVGhpcyBhbGxvd3MgdGhlIHVzZXJzIHRvIGV4cGxpY2l0bHkgcmVxdWlyZSBhIGNsYXNzIGlmIHRoZSBwbHVnaW4gZmFpbHMgdG8gZGV0ZWN0IGl0LlxuICAgICAgICAgIHBhcnNlci5wbHVnaW4oJ2NhbGwgRXh0LnJlcXVpcmUnLCBhZGRUb01hbmlmZXN0KTtcbiAgICAgICAgICAvLyBjb3B5IEV4dC5kZWZpbmUgY2FsbHMgdG8gdGhlIG1hbmlmZXN0LiAgVGhpcyBhbGxvd3MgdXNlcnMgdG8gd3JpdGUgc3RhbmRhcmQgRXh0UmVhY3QgY2xhc3Nlcy5cbiAgICAgICAgICBwYXJzZXIucGx1Z2luKCdjYWxsIEV4dC5kZWZpbmUnLCBhZGRUb01hbmlmZXN0KTtcbiAgICAgICAgfSlcbiAgICAgIH0pXG4gICAgfVxuXG4vLyplbWl0IC0gb25jZSBhbGwgbW9kdWxlcyBhcmUgcHJvY2Vzc2VkLCBjcmVhdGUgdGhlIG9wdGltaXplZCBFeHRSZWFjdCBidWlsZC5cbiAgICBpZiAoY29tcGlsZXIuaG9va3MpIHtcbiAgICAgIGlmICh0cnVlKSB7XG4gICAgICAgIGNvbXBpbGVyLmhvb2tzLmVtaXQudGFwQXN5bmMoJ2V4dC1yZWFjdC1lbWl0LWFzeW5jJywgKGNvbXBpbGF0aW9uLCBjYWxsYmFjaykgPT4ge1xuICAgICAgICAgIHJlYWRsaW5lLmN1cnNvclRvKHByb2Nlc3Muc3Rkb3V0LCAwKTtjb25zb2xlLmxvZyhhcHAgKyAnZXh0LXJlYWN0LWVtaXQtYXN5bmMnKVxuICAgICAgICAgIHRoaXMuZW1pdChjb21waWxlciwgY29tcGlsYXRpb24sIGNhbGxiYWNrKVxuICAgICAgICB9KVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGNvbXBpbGVyLmhvb2tzLmVtaXQudGFwKCdleHQtcmVhY3QtZW1pdCcsIChjb21waWxhdGlvbikgPT4ge1xuICAgICAgICAgIHJlYWRsaW5lLmN1cnNvclRvKHByb2Nlc3Muc3Rkb3V0LCAwKTtjb25zb2xlLmxvZyhhcHAgKyAnZXh0LXJlYWN0LWVtaXQnKVxuICAgICAgICAgIHRoaXMuZW1pdChjb21waWxlciwgY29tcGlsYXRpb24pXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgY29tcGlsZXIucGx1Z2luKCdlbWl0JywgKGNvbXBpbGF0aW9uLCBjYWxsYmFjaykgPT4ge1xuICAgICAgICByZWFkbGluZS5jdXJzb3JUbyhwcm9jZXNzLnN0ZG91dCwgMCk7Y29uc29sZS5sb2coYXBwICsgJ2VtaXQnKVxuICAgICAgICB0aGlzLmVtaXQoY29tcGlsZXIsIGNvbXBpbGF0aW9uLCBjYWxsYmFjaylcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgaWYgKGNvbXBpbGVyLmhvb2tzKSB7XG4gICAgICBpZiAodGhpcy5hc3luY2hyb25vdXMpIHtcbiAgICAgICAgY29tcGlsZXIuaG9va3MuZG9uZS50YXBBc3luYygnZXh0LXJlYWN0LWRvbmUgKGFzeW5jKScsIChjb21waWxhdGlvbiwgY2FsbGJhY2spID0+IHtcbiAgICAgICAgICByZWFkbGluZS5jdXJzb3JUbyhwcm9jZXNzLnN0ZG91dCwgMCk7Y29uc29sZS5sb2coYXBwICsgJ2V4dC1yZWFjdC1kb25lIChhc3luYyknKVxuICAgICAgICAgIGlmIChjYWxsYmFjayAhPSBudWxsKSBcbiAgICAgICAgICB7XG4gICAgICAgICAgICBpZiAodGhpcy5hc3luY2hyb25vdXMpIFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBjb25zb2xlLmxvZygnY2FsbGluZyBjYWxsYmFjayBmb3IgZXh0LXJlYWN0LWVtaXQgIChhc3luYyknKVxuICAgICAgICAgICAgICBjYWxsYmFjaygpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGNvbXBpbGVyLmhvb2tzLmRvbmUudGFwKCdleHQtcmVhY3QtZG9uZScsICgpID0+IHtcbiAgICAgICAgICByZWFkbGluZS5jdXJzb3JUbyhwcm9jZXNzLnN0ZG91dCwgMCk7Y29uc29sZS5sb2coYXBwICsgJ2V4dC1yZWFjdC1kb25lJylcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBhc3luYyBlbWl0KGNvbXBpbGVyLCBjb21waWxhdGlvbiwgY2FsbGJhY2spIHtcbi8vICAgICB2YXIgaXNXZWJwYWNrNCA9IGNvbXBpbGF0aW9uLmhvb2tzO1xuLy8gICAgIHZhciBtb2R1bGVzID0gW11cbi8vICAgICBpZiAoaXNXZWJwYWNrNCkge1xuLy8gICAgICAgaXNXZWJwYWNrNCA9IHRydWVcbi8vIC8vICAgICAgIG1vZHVsZXMgPSBjb21waWxhdGlvbi5jaHVua3MucmVkdWNlKChhLCBiKSA9PiBhLmNvbmNhdChiLl9tb2R1bGVzKSwgW10pXG4vLyAvLyAvLyAgICAgIGNvbnNvbGUubG9nKG1vZHVsZXMpXG4vLyAvLyAgICAgICB2YXIgaSA9IDBcbi8vIC8vICAgICAgIHZhciB0aGVNb2R1bGUgPSAnJ1xuLy8gLy8gICAgICAgZm9yIChsZXQgbW9kdWxlIG9mIG1vZHVsZXMpIHtcbi8vIC8vICAgICAgICAgaWYgKGkgPT0gMCkge1xuLy8gLy8gICAgICAgICAgIHRoZU1vZHVsZSA9IG1vZHVsZVxuLy8gLy8gICAgICAgICAgIGkrK1xuLy8gLy8gICAgICAgICB9XG4vLyAvLyAvL2NvbnN0IGRlcHMgPSB0aGlzLmRlcGVuZGVuY2llc1ttb2R1bGUucmVzb3VyY2VdXG4vLyAvLyAgICAgICAgIC8vY29uc29sZS5sb2coZGVwcylcbi8vIC8vICAgICAgICAgLy9pZiAoZGVwcykgc3RhdGVtZW50cyA9IHN0YXRlbWVudHMuY29uY2F0KGRlcHMpO1xuLy8gLy8gICAgICAgfVxuLy8gLy8gICAgICAgdmFyIHRoZVBhdGggPSBwYXRoLmpvaW4oY29tcGlsZXIub3V0cHV0UGF0aCwgJ21vZHVsZS50eHQnKVxuLy8gLy8gICAgICAgLy9jb25zb2xlLmxvZyh0aGVQYXRoKVxuXG4vLyAvLyAgICAgICAvL3ZhciBvID0ge307XG4vLyAvLyAgICAgICAvL28ubyA9IHRoZU1vZHVsZTtcbi8vIC8vICAgICAgIC8vY29uc29sZS5sb2codGhlTW9kdWxlWzBdLmNvbnRleHQpXG4gICAgICBcbi8vIC8vICAgICAgIHZhciBjYWNoZSA9IFtdO1xuLy8gLy8gICAgICAgdmFyIGggPSBKU09OLnN0cmluZ2lmeSh0aGVNb2R1bGUsIGZ1bmN0aW9uKGtleSwgdmFsdWUpIHtcbi8vIC8vICAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAhPT0gbnVsbCkge1xuLy8gLy8gICAgICAgICAgICAgICBpZiAoY2FjaGUuaW5kZXhPZih2YWx1ZSkgIT09IC0xKSB7XG4vLyAvLyAgICAgICAgICAgICAgICAgICAvLyBDaXJjdWxhciByZWZlcmVuY2UgZm91bmQsIGRpc2NhcmQga2V5XG4vLyAvLyAgICAgICAgICAgICAgICAgICByZXR1cm47XG4vLyAvLyAgICAgICAgICAgICAgIH1cbi8vIC8vICAgICAgICAgICAgICAgLy8gU3RvcmUgdmFsdWUgaW4gb3VyIGNvbGxlY3Rpb25cbi8vIC8vICAgICAgICAgICAgICAgY2FjaGUucHVzaCh2YWx1ZSk7XG4vLyAvLyAgICAgICAgICAgfVxuLy8gLy8gICAgICAgICAgIHJldHVybiB2YWx1ZTtcbi8vIC8vICAgICAgIH0pO1xuLy8gLy8gICAgICAgY2FjaGUgPSBudWxsOyAvLyBFbmFibGUgZ2FyYmFnZSBjb2xsZWN0aW9uXG4vLyAvLyAgICAgICAvL2ZzLndyaXRlRmlsZVN5bmMoIHRoZVBhdGgsIGgsICd1dGY4Jylcbi8vICAgICB9XG4vLyAgICAgZWxzZSB7XG4vLyAgICAgICBpc1dlYnBhY2s0ID0gZmFsc2Vcbi8vICAgICAgIC8vIG1vZHVsZXMgPSBjb21waWxhdGlvbi5jaHVua3MucmVkdWNlKChhLCBiKSA9PiBhLmNvbmNhdChiLm1vZHVsZXMpLCBbXSlcblxuLy8gICAgICAgLy8gZm9yIChsZXQgbW9kdWxlIG9mIG1vZHVsZXMpIHtcbi8vICAgICAgIC8vICAgY29uc3QgZGVwcyA9IHRoaXMuZGVwZW5kZW5jaWVzW21vZHVsZS5yZXNvdXJjZV1cbi8vICAgICAgIC8vICAgY29uc29sZS5sb2coZGVwcylcbi8vICAgICAgIC8vICAgLy9pZiAoZGVwcykgc3RhdGVtZW50cyA9IHN0YXRlbWVudHMuY29uY2F0KGRlcHMpO1xuLy8gICAgICAgLy8gfVxuLy8gICAgIH1cbiAgICAvL2NvbnN0IGJ1aWxkID0gdGhpcy5idWlsZHNbT2JqZWN0LmtleXModGhpcy5idWlsZHMpWzBdXTtcblxuICAgIGxldCBvdXRwdXRQYXRoID0gcGF0aC5qb2luKGNvbXBpbGVyLm91dHB1dFBhdGgsIHRoaXMub3B0aW9ucy5vdXRwdXQpXG4gICAgLy8gd2VicGFjay1kZXYtc2VydmVyIG92ZXJ3cml0ZXMgdGhlIG91dHB1dFBhdGggdG8gXCIvXCIsIHNvIHdlIG5lZWQgdG8gcHJlcGVuZCBjb250ZW50QmFzZVxuICAgIGlmIChjb21waWxlci5vdXRwdXRQYXRoID09PSAnLycgJiYgY29tcGlsZXIub3B0aW9ucy5kZXZTZXJ2ZXIpIHtcbiAgICAgIG91dHB1dFBhdGggPSBwYXRoLmpvaW4oY29tcGlsZXIub3B0aW9ucy5kZXZTZXJ2ZXIuY29udGVudEJhc2UsIG91dHB1dFBhdGgpXG4gICAgfVxuICAgIHRoaXMuX2J1aWxkRXh0Rm9sZGVyKG91dHB1dFBhdGgpXG4gICAgLy92YXIgcGFybXMgPSBbJ2FwcCcsICdidWlsZCcsIHRoaXMub3B0aW9ucy5wcm9maWxlLCB0aGlzLm9wdGlvbnMuZW52aXJvbm1lbnRdXG4gICAgdmFyIHBhcm1zID0gWydhcHAnLCAnYnVpbGQnXVxuICAgIHZhciBjbWRFcnJvcnMgPSBbXVxuICAgIGF3YWl0IF9idWlsZEV4dEJ1bmRsZShjb21waWxhdGlvbiwgY21kRXJyb3JzLCBvdXRwdXRQYXRoLCBwYXJtcywgdGhpcy5vcHRpb25zLnZlcmJvc2UpXG4gXG4gICAgaWYgKHRoaXMub3B0aW9ucy53YXRjaCAmJiB0aGlzLmNvdW50ID09IDAgJiYgY21kRXJyb3JzLmxlbmd0aCA9PSAwKSB7XG4gICAgICB2YXIgdXJsID0gJ2h0dHA6Ly9sb2NhbGhvc3Q6JyArIHRoaXMub3B0aW9ucy5wb3J0XG4gICAgICByZWFkbGluZS5jdXJzb3JUbyhwcm9jZXNzLnN0ZG91dCwgMCk7Y29uc29sZS5sb2coYXBwICsgJ2V4dC1yZWFjdC1lbWl0IC0gb3BlbiBicm93c2VyIGF0ICcgKyB1cmwpXG4gICAgICB0aGlzLmNvdW50KytcbiAgICAgIGNvbnN0IG9wbiA9IHJlcXVpcmUoJ29wbicpXG4gICAgICBvcG4odXJsKVxuICAgIH1cbiAgICBjYWxsYmFjaygpXG4gIH1cblxuICBfYnVpbGRFeHRGb2xkZXIob3V0cHV0LCB0b29sa2l0PSdtb2Rlcm4nLCB0aGVtZSwgcGFja2FnZXM9W10sIHBhY2thZ2VEaXJzPVtdLCBzZGs9J25vZGVfbW9kdWxlcy9Ac2VuY2hhL2V4dCcsIG92ZXJyaWRlcz1bXSkge1xuICAgIHRoZW1lID0gdGhlbWUgfHwgKHRvb2xraXQgPT09ICdjbGFzc2ljJyA/ICd0aGVtZS10cml0b24nIDogJ3RoZW1lLW1hdGVyaWFsJylcbiAgICBjb25zdCB1c2VyUGFja2FnZXMgPSBwYXRoLmpvaW4oJy4nLCAnZXh0LXJlYWN0JywgJ3BhY2thZ2VzJylcbiAgICBpZiAoZnMuZXhpc3RzU3luYyh1c2VyUGFja2FnZXMpKSB7XG4gICAgICByZWFkbGluZS5jdXJzb3JUbyhwcm9jZXNzLnN0ZG91dCwgMCk7Y29uc29sZS5sb2coYXBwICsgJ0FkZGluZyBQYWNrYWdlIEZvbGRlcjogJyArIHVzZXJQYWNrYWdlcylcbiAgICAgIHBhY2thZ2VEaXJzLnB1c2godXNlclBhY2thZ2VzKVxuICAgIH1cbiAgICBpZiAodGhpcy5maXJzdFRpbWUpIHtcbiAgICAgIHJpbXJhZihvdXRwdXQpXG4gICAgICBta2RpcnAob3V0cHV0KVxuICAgICAgZnMud3JpdGVGaWxlU3luYyhwYXRoLmpvaW4ob3V0cHV0LCAnYnVpbGQueG1sJyksIGJ1aWxkWE1MKHsgY29tcHJlc3M6IHRoaXMucHJvZHVjdGlvbiB9KSwgJ3V0ZjgnKVxuICAgICAgZnMud3JpdGVGaWxlU3luYyhwYXRoLmpvaW4ob3V0cHV0LCAnanNkb20tZW52aXJvbm1lbnQuanMnKSwgY3JlYXRlSlNET01FbnZpcm9ubWVudCgpLCAndXRmOCcpXG4gICAgICBmcy53cml0ZUZpbGVTeW5jKHBhdGguam9pbihvdXRwdXQsICdhcHAuanNvbicpLCBjcmVhdGVBcHBKc29uKHsgdGhlbWUsIHBhY2thZ2VzLCB0b29sa2l0LCBvdmVycmlkZXMsIHBhY2thZ2VEaXJzIH0pLCAndXRmOCcpXG4gICAgICBmcy53cml0ZUZpbGVTeW5jKHBhdGguam9pbihvdXRwdXQsICd3b3Jrc3BhY2UuanNvbicpLCBjcmVhdGVXb3Jrc3BhY2VKc29uKHNkaywgcGFja2FnZURpcnMsIG91dHB1dCksICd1dGY4JylcbiAgICB9XG4gICAgdGhpcy5maXJzdFRpbWUgPSBmYWxzZVxuICAgIGxldCBqc1xuICAgIGpzID0gJ0V4dC5yZXF1aXJlKFwiRXh0LipcIiknXG5cbiAgICAvLyBpZiAodGhpcy5vcHRpb25zLnRyZWVTaGFraW5nKSB7XG4gICAgLy8gICAvL2xldCBzdGF0ZW1lbnRzID0gWydFeHQucmVxdWlyZShbXCJFeHQuYXBwLkFwcGxpY2F0aW9uXCIsIFwiRXh0LkNvbXBvbmVudFwiLCBcIkV4dC5XaWRnZXRcIiwgXCJFeHQubGF5b3V0LkZpdFwiLCBcIkV4dC5yZWFjdC5UcmFuc2l0aW9uXCIsIFwiRXh0LnJlYWN0LlJlbmRlcmVyQ2VsbFwiXSknXTsgLy8gZm9yIHNvbWUgcmVhc29uIGNvbW1hbmQgZG9lc24ndCBsb2FkIGNvbXBvbmVudCB3aGVuIG9ubHkgcGFuZWwgaXMgcmVxdWlyZWRcbiAgICAvLyAgIGxldCBzdGF0ZW1lbnRzID0gWydFeHQucmVxdWlyZShbXCJFeHQuYXBwLkFwcGxpY2F0aW9uXCIsIFwiRXh0LkNvbXBvbmVudFwiLCBcIkV4dC5XaWRnZXRcIiwgXCJFeHQubGF5b3V0LkZpdFwiLCBcIkV4dC5yZWFjdC5UcmFuc2l0aW9uXCJdKSddOyAvLyBmb3Igc29tZSByZWFzb24gY29tbWFuZCBkb2Vzbid0IGxvYWQgY29tcG9uZW50IHdoZW4gb25seSBwYW5lbCBpcyByZXF1aXJlZFxuICAgIC8vICAgLy8gaWYgKHBhY2thZ2VzLmluZGV4T2YoJ3JlYWN0bycpICE9PSAtMSkge1xuICAgIC8vICAgLy8gICBzdGF0ZW1lbnRzLnB1c2goJ0V4dC5yZXF1aXJlKFwiRXh0LnJlYWN0LlJlbmRlcmVyQ2VsbFwiKScpO1xuICAgIC8vICAgLy8gfVxuICAgIC8vICAgLy9tamdcbiAgICAvLyAgIGZvciAobGV0IG1vZHVsZSBvZiBtb2R1bGVzKSB7XG4gICAgLy8gICAgIGNvbnN0IGRlcHMgPSB0aGlzLmRlcGVuZGVuY2llc1ttb2R1bGUucmVzb3VyY2VdO1xuICAgIC8vICAgICBpZiAoZGVwcykgc3RhdGVtZW50cyA9IHN0YXRlbWVudHMuY29uY2F0KGRlcHMpO1xuICAgIC8vICAgfVxuICAgIC8vICAganMgPSBzdGF0ZW1lbnRzLmpvaW4oJztcXG4nKTtcbiAgICAvLyB9IGVsc2Uge1xuICAgIC8vICAganMgPSAnRXh0LnJlcXVpcmUoXCJFeHQuKlwiKSc7XG4gICAgLy8gfVxuXG4gICAgaWYgKHRoaXMub3B0aW9ucy5tYW5pZmVzdCA9PT0gbnVsbCB8fCBqcyAhPT0gdGhpcy5vcHRpb25zLm1hbmlmZXN0KSB7XG4gICAgICB0aGlzLm9wdGlvbnMubWFuaWZlc3QgPSBqc1xuICAgICAgLy9yZWFkbGluZS5jdXJzb3JUbyhwcm9jZXNzLnN0ZG91dCwgMCk7Y29uc29sZS5sb2coYXBwICsgJ3RyZWUgc2hha2luZzogJyArIHRoaXMub3B0aW9ucy50cmVlU2hha2luZylcbiAgICAgIGNvbnN0IG1hbmlmZXN0ID0gcGF0aC5qb2luKG91dHB1dCwgJ21hbmlmZXN0LmpzJylcbiAgICAgIGZzLndyaXRlRmlsZVN5bmMobWFuaWZlc3QsIGpzLCAndXRmOCcpXG4gICAgICByZWFkbGluZS5jdXJzb3JUbyhwcm9jZXNzLnN0ZG91dCwgMCk7Y29uc29sZS5sb2coYXBwICsgYGJ1aWxkaW5nIEV4dFJlYWN0IGJ1bmRsZSBhdDogJHtvdXRwdXR9YClcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICByZWFkbGluZS5jdXJzb3JUbyhwcm9jZXNzLnN0ZG91dCwgMCk7Y29uc29sZS5sb2coYXBwICsgJ0V4dFJlYWN0IHJlYnVpbGQgTk9UIG5lZWRlZCcpXG4gICAgfVxuICB9XG5cblxuICAvKipcbiAgIC8qKlxuICAgICogQnVpbGRzIGEgbWluaW1hbCB2ZXJzaW9uIG9mIHRoZSBFeHRSZWFjdCBmcmFtZXdvcmsgYmFzZWQgb24gdGhlIGNsYXNzZXMgdXNlZFxuICAgICogQHBhcmFtIHtTdHJpbmd9IG5hbWUgVGhlIG5hbWUgb2YgdGhlIGJ1aWxkXG4gICAgKiBAcGFyYW0ge01vZHVsZVtdfSBtb2R1bGVzIHdlYnBhY2sgbW9kdWxlc1xuICAgICogQHBhcmFtIHtTdHJpbmd9IG91dHB1dCBUaGUgcGF0aCB0byB3aGVyZSB0aGUgZnJhbWV3b3JrIGJ1aWxkIHNob3VsZCBiZSB3cml0dGVuXG4gICAgKiBAcGFyYW0ge1N0cmluZ30gW3Rvb2xraXQ9J21vZGVybiddIFwibW9kZXJuXCIgb3IgXCJjbGFzc2ljXCJcbiAgICAqIEBwYXJhbSB7U3RyaW5nfSBvdXRwdXQgVGhlIHBhdGggdG8gdGhlIGRpcmVjdG9yeSB0byBjcmVhdGUgd2hpY2ggd2lsbCBjb250YWluIHRoZSBqcyBhbmQgY3NzIGJ1bmRsZXNcbiAgICAqIEBwYXJhbSB7U3RyaW5nfSB0aGVtZSBUaGUgbmFtZSBvZiB0aGUgRXh0UmVhY3QgdGhlbWUgcGFja2FnZSB0byB1c2UsIGZvciBleGFtcGxlIFwidGhlbWUtbWF0ZXJpYWxcIlxuICAgICogQHBhcmFtIHtTdHJpbmdbXX0gcGFja2FnZXMgQW4gYXJyYXkgb2YgRXh0UmVhY3QgcGFja2FnZXMgdG8gaW5jbHVkZVxuICAgICogQHBhcmFtIHtTdHJpbmdbXX0gcGFja2FnZURpcnMgRGlyZWN0b3JpZXMgY29udGFpbmluZyBwYWNrYWdlc1xuICAgICogQHBhcmFtIHtTdHJpbmdbXX0gb3ZlcnJpZGVzIEFuIGFycmF5IG9mIGxvY2F0aW9ucyBmb3Igb3ZlcnJpZGVzXG4gICAgKiBAcGFyYW0ge1N0cmluZ30gc2RrIFRoZSBmdWxsIHBhdGggdG8gdGhlIEV4dFJlYWN0IFNES1xuICAgICogQHByaXZhdGVcbiAgICAqL1xuICAvLyBfYnVpbGRFeHRCdW5kbGUoY29tcGlsYXRpb24sIGNtZEVycm9ycywgb3V0cHV0LCB7IHRvb2xraXQ9J21vZGVybicsIHRoZW1lLCBwYWNrYWdlcz1bXSwgcGFja2FnZURpcnM9W10sIHNkaywgb3ZlcnJpZGVzfSkge1xuICAvLyAgIGxldCBzZW5jaGEgPSB0aGlzLl9nZXRTZW5jaENtZFBhdGgoKVxuICAvLyAgIHRoZW1lID0gdGhlbWUgfHwgKHRvb2xraXQgPT09ICdjbGFzc2ljJyA/ICd0aGVtZS10cml0b24nIDogJ3RoZW1lLW1hdGVyaWFsJylcblxuICAvLyAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gIC8vICAgICBjb25zdCBvbkJ1aWxkRG9uZSA9ICgpID0+IHtcbiAgLy8gICAgICAgaWYgKGNtZEVycm9ycy5sZW5ndGgpIHtcbiAgLy8gICAgICAgICByZWplY3QobmV3IEVycm9yKGNtZEVycm9ycy5qb2luKFwiXCIpKSlcbiAgLy8gICAgICAgfSBlbHNlIHtcbiAgLy8gICAgICAgICByZXNvbHZlKClcbiAgLy8gICAgICAgfVxuICAvLyAgICAgfVxuXG4gIC8vICAgICBjb25zdCB1c2VyUGFja2FnZXMgPSBwYXRoLmpvaW4oJy4nLCAnZXh0LXJlYWN0JywgJ3BhY2thZ2VzJylcbiAgLy8gICAgIGlmIChmcy5leGlzdHNTeW5jKHVzZXJQYWNrYWdlcykpIHtcbiAgLy8gICAgICAgcmVhZGxpbmUuY3Vyc29yVG8ocHJvY2Vzcy5zdGRvdXQsIDApO2NvbnNvbGUubG9nKGFwcCArICdBZGRpbmcgUGFja2FnZSBGb2xkZXI6ICcgKyB1c2VyUGFja2FnZXMpXG4gIC8vICAgICAgIHBhY2thZ2VEaXJzLnB1c2godXNlclBhY2thZ2VzKVxuICAvLyAgICAgfVxuXG4gIC8vICAgICBpZiAodGhpcy5maXJzdFRpbWUpIHtcbiAgLy8gICAgICAgcmltcmFmKG91dHB1dClcbiAgLy8gICAgICAgbWtkaXJwKG91dHB1dClcbiAgLy8gICAgICAgZnMud3JpdGVGaWxlU3luYyhwYXRoLmpvaW4ob3V0cHV0LCAnYnVpbGQueG1sJyksIGJ1aWxkWE1MKHsgY29tcHJlc3M6IHRoaXMucHJvZHVjdGlvbiB9KSwgJ3V0ZjgnKVxuICAvLyAgICAgICBmcy53cml0ZUZpbGVTeW5jKHBhdGguam9pbihvdXRwdXQsICdqc2RvbS1lbnZpcm9ubWVudC5qcycpLCBjcmVhdGVKU0RPTUVudmlyb25tZW50KCksICd1dGY4JylcbiAgLy8gICAgICAgZnMud3JpdGVGaWxlU3luYyhwYXRoLmpvaW4ob3V0cHV0LCAnYXBwLmpzb24nKSwgY3JlYXRlQXBwSnNvbih7IHRoZW1lLCBwYWNrYWdlcywgdG9vbGtpdCwgb3ZlcnJpZGVzLCBwYWNrYWdlRGlycyB9KSwgJ3V0ZjgnKVxuICAvLyAgICAgICBmcy53cml0ZUZpbGVTeW5jKHBhdGguam9pbihvdXRwdXQsICd3b3Jrc3BhY2UuanNvbicpLCBjcmVhdGVXb3Jrc3BhY2VKc29uKHNkaywgcGFja2FnZURpcnMsIG91dHB1dCksICd1dGY4JylcbiAgLy8gICAgIH1cbiAgLy8gICAgIHRoaXMuZmlyc3RUaW1lID0gZmFsc2VcblxuICAvLyAgICAgbGV0IGpzXG4gIC8vICAgICBqcyA9ICdFeHQucmVxdWlyZShcIkV4dC4qXCIpJ1xuXG4gIC8vICAgICAvLyBpZiAodGhpcy5vcHRpb25zLnRyZWVTaGFraW5nKSB7XG4gIC8vICAgICAvLyAgIC8vbGV0IHN0YXRlbWVudHMgPSBbJ0V4dC5yZXF1aXJlKFtcIkV4dC5hcHAuQXBwbGljYXRpb25cIiwgXCJFeHQuQ29tcG9uZW50XCIsIFwiRXh0LldpZGdldFwiLCBcIkV4dC5sYXlvdXQuRml0XCIsIFwiRXh0LnJlYWN0LlRyYW5zaXRpb25cIiwgXCJFeHQucmVhY3QuUmVuZGVyZXJDZWxsXCJdKSddOyAvLyBmb3Igc29tZSByZWFzb24gY29tbWFuZCBkb2Vzbid0IGxvYWQgY29tcG9uZW50IHdoZW4gb25seSBwYW5lbCBpcyByZXF1aXJlZFxuICAvLyAgICAgLy8gICBsZXQgc3RhdGVtZW50cyA9IFsnRXh0LnJlcXVpcmUoW1wiRXh0LmFwcC5BcHBsaWNhdGlvblwiLCBcIkV4dC5Db21wb25lbnRcIiwgXCJFeHQuV2lkZ2V0XCIsIFwiRXh0LmxheW91dC5GaXRcIiwgXCJFeHQucmVhY3QuVHJhbnNpdGlvblwiXSknXTsgLy8gZm9yIHNvbWUgcmVhc29uIGNvbW1hbmQgZG9lc24ndCBsb2FkIGNvbXBvbmVudCB3aGVuIG9ubHkgcGFuZWwgaXMgcmVxdWlyZWRcbiAgLy8gICAgIC8vICAgLy8gaWYgKHBhY2thZ2VzLmluZGV4T2YoJ3JlYWN0bycpICE9PSAtMSkge1xuICAvLyAgICAgLy8gICAvLyAgIHN0YXRlbWVudHMucHVzaCgnRXh0LnJlcXVpcmUoXCJFeHQucmVhY3QuUmVuZGVyZXJDZWxsXCIpJyk7XG4gIC8vICAgICAvLyAgIC8vIH1cbiAgLy8gICAgIC8vICAgLy9tamdcbiAgLy8gICAgIC8vICAgZm9yIChsZXQgbW9kdWxlIG9mIG1vZHVsZXMpIHtcbiAgLy8gICAgIC8vICAgICBjb25zdCBkZXBzID0gdGhpcy5kZXBlbmRlbmNpZXNbbW9kdWxlLnJlc291cmNlXTtcbiAgLy8gICAgIC8vICAgICBpZiAoZGVwcykgc3RhdGVtZW50cyA9IHN0YXRlbWVudHMuY29uY2F0KGRlcHMpO1xuICAvLyAgICAgLy8gICB9XG4gIC8vICAgICAvLyAgIGpzID0gc3RhdGVtZW50cy5qb2luKCc7XFxuJyk7XG4gIC8vICAgICAvLyB9IGVsc2Uge1xuICAvLyAgICAgLy8gICBqcyA9ICdFeHQucmVxdWlyZShcIkV4dC4qXCIpJztcbiAgLy8gICAgIC8vIH1cblxuXG5cbiAgLy8gICAgIC8vIGlmIChmcy5leGlzdHNTeW5jKHBhdGguam9pbihzZGssICdleHQnKSkpIHtcbiAgLy8gICAgIC8vICAgLy8gbG9jYWwgY2hlY2tvdXQgb2YgdGhlIFNESyByZXBvXG4gIC8vICAgICAvLyAgIHBhY2thZ2VEaXJzLnB1c2gocGF0aC5qb2luKCdleHQnLCAncGFja2FnZXMnKSk7XG4gIC8vICAgICAvLyAgIHNkayA9IHBhdGguam9pbihzZGssICdleHQnKTtcbiAgLy8gICAgIC8vIH1cblxuXG5cbiAgLy8gICAgIHZhciBwYXJtcyA9IFtdXG4gIC8vICAgICBpZiAodGhpcy53YXRjaCkgeyBwYXJtcyA9IFsnYXBwJywgJ3dhdGNoJ10gfVxuICAvLyAgICAgZWxzZSB7IHBhcm1zID0gWydhcHAnLCAnYnVpbGQnXSB9XG5cbiAgLy8gICAgIGlmICh0aGlzLm1hbmlmZXN0ID09PSBudWxsIHx8IGpzICE9PSB0aGlzLm1hbmlmZXN0KSB7XG4gIC8vICAgICAgIHRoaXMubWFuaWZlc3QgPSBqc1xuICAvLyAgICAgICAvL3JlYWRsaW5lLmN1cnNvclRvKHByb2Nlc3Muc3Rkb3V0LCAwKTtjb25zb2xlLmxvZyhhcHAgKyAndHJlZSBzaGFraW5nOiAnICsgdGhpcy50cmVlU2hha2luZylcbiAgLy8gICAgICAgY29uc3QgbWFuaWZlc3QgPSBwYXRoLmpvaW4ob3V0cHV0LCAnbWFuaWZlc3QuanMnKVxuICAvLyAgICAgICBmcy53cml0ZUZpbGVTeW5jKG1hbmlmZXN0LCBqcywgJ3V0ZjgnKVxuICAvLyAgICAgICByZWFkbGluZS5jdXJzb3JUbyhwcm9jZXNzLnN0ZG91dCwgMCk7Y29uc29sZS5sb2coYXBwICsgYGJ1aWxkaW5nIEV4dFJlYWN0IGJ1bmRsZSBhdDogJHtvdXRwdXR9YClcblxuICAvLyAgICAgICBpZiAodGhpcy53YXRjaCAmJiAhd2F0Y2hpbmcgfHwgIXRoaXMud2F0Y2gpIHtcbiAgLy8gICAgICAgICB2YXIgb3B0aW9ucyA9IHsgY3dkOiBvdXRwdXQsIHNpbGVudDogdHJ1ZSwgc3RkaW86ICdwaXBlJywgZW5jb2Rpbmc6ICd1dGYtOCd9XG4gIC8vICAgICAgICAgdmFyIHZlcmJvc2UgPSAnbm8nXG4gIC8vICAgICAgICAgaWYgKHByb2Nlc3MuZW52LkVYVFJFQUNUX1ZFUkJPU0UgID09ICd5ZXMnKSB7XG4gIC8vICAgICAgICAgICB2ZXJib3NlID0gJ3llcydcbiAgLy8gICAgICAgICB9XG4gIC8vICAgICAgICAgZXhlY3V0ZUFzeW5jKHNlbmNoYSwgcGFybXMsIG9wdGlvbnMsIGNvbXBpbGF0aW9uLCBjbWRFcnJvcnMsIHZlcmJvc2UpLnRoZW4gKFxuICAvLyAgICAgICAgICAgZnVuY3Rpb24oKSB7IG9uQnVpbGREb25lKCkgfSwgXG4gIC8vICAgICAgICAgICBmdW5jdGlvbihyZWFzb24pIHsgcmVzb2x2ZShyZWFzb24pIH1cbiAgLy8gICAgICAgICApXG4gIC8vICAgICAgIH1cblxuICAvLyAgICAgfVxuICAvLyAgICAgZWxzZSB7XG4gIC8vICAgICAgIHJlYWRsaW5lLmN1cnNvclRvKHByb2Nlc3Muc3Rkb3V0LCAwKTtjb25zb2xlLmxvZyhhcHAgKyAnRXh0IHJlYnVpbGQgTk9UIG5lZWRlZCcpXG4gIC8vICAgICAgIG9uQnVpbGREb25lKClcbiAgLy8gICAgIH1cblxuICAvLyAgICAgLy8gdmFyIHBhcm1zXG4gIC8vICAgICAvLyBpZiAodGhpcy53YXRjaCkge1xuICAvLyAgICAgLy8gICBpZiAoIXdhdGNoaW5nKSB7XG4gIC8vICAgICAvLyAgICAgcGFybXMgPSBbJ2FwcCcsICd3YXRjaCddXG4gIC8vICAgICAvLyAgIH1cbiAgLy8gICAgIC8vICAgLy8gaWYgKCFjbWRSZWJ1aWxkTmVlZGVkKSB7XG4gIC8vICAgICAvLyAgIC8vICAgcmVhZGxpbmUuY3Vyc29yVG8ocHJvY2Vzcy5zdGRvdXQsIDApO2NvbnNvbGUubG9nKGFwcCArICdFeHQgcmVidWlsZCBOT1QgbmVlZGVkJylcbiAgLy8gICAgIC8vICAgLy8gICBvbkJ1aWxkRG9uZSgpXG4gIC8vICAgICAvLyAgIC8vIH1cbiAgLy8gICAgIC8vIH1cbiAgLy8gICAgIC8vIGVsc2Uge1xuICAvLyAgICAgLy8gICBwYXJtcyA9IFsnYXBwJywgJ2J1aWxkJ11cbiAgLy8gICAgIC8vIH1cbiAgLy8gICAgIC8vIGlmIChjbWRSZWJ1aWxkTmVlZGVkKSB7XG4gIC8vICAgICAvLyAgIHZhciBvcHRpb25zID0geyBjd2Q6IG91dHB1dCwgc2lsZW50OiB0cnVlLCBzdGRpbzogJ3BpcGUnLCBlbmNvZGluZzogJ3V0Zi04J31cbiAgLy8gICAgIC8vICAgZXhlY3V0ZUFzeW5jKHNlbmNoYSwgcGFybXMsIG9wdGlvbnMsIGNvbXBpbGF0aW9uLCBjbWRFcnJvcnMpLnRoZW4oZnVuY3Rpb24oKSB7XG4gIC8vICAgICAvLyAgICAgb25CdWlsZERvbmUoKVxuICAvLyAgICAgLy8gICB9LCBmdW5jdGlvbihyZWFzb24pe1xuICAvLyAgICAgLy8gICAgIHJlc29sdmUocmVhc29uKVxuICAvLyAgICAgLy8gICB9KVxuICAvLyAgICAgLy8gfVxuXG5cbiAgLy8gICB9KVxuICAvLyB9XG5cblxuXG4gIHN1Y2NlZWRNb2R1bGUoY29tcGlsYXRpb24sIG1vZHVsZSkge1xuICAgIHRoaXMub3B0aW9ucy5jdXJyZW50RmlsZSA9IG1vZHVsZS5yZXNvdXJjZTtcbiAgICBpZiAobW9kdWxlLnJlc291cmNlICYmIG1vZHVsZS5yZXNvdXJjZS5tYXRjaCh0aGlzLm9wdGlvbnMudGVzdCkgJiYgIW1vZHVsZS5yZXNvdXJjZS5tYXRjaCgvbm9kZV9tb2R1bGVzLykgJiYgIW1vZHVsZS5yZXNvdXJjZS5tYXRjaChgL2V4dC1yZWFjdCR7dGhpcy5yZWFjdFZlcnNpb259L2ApKSB7XG4gICAgICBjb25zdCBkb1BhcnNlID0gKCkgPT4ge1xuICAgICAgICB0aGlzLm9wdGlvbnMuZGVwZW5kZW5jaWVzW3RoaXMub3B0aW9ucy5jdXJyZW50RmlsZV0gPSBbXG4gICAgICAgICAgLi4uKHRoaXMub3B0aW9ucy5kZXBlbmRlbmNpZXNbdGhpcy5vcHRpb25zLmN1cnJlbnRGaWxlXSB8fCBbXSksXG4gICAgICAgICAgLi4udGhpcy5vcHRpb25zLm1hbmlmZXN0RXh0cmFjdG9yKG1vZHVsZS5fc291cmNlLl92YWx1ZSwgY29tcGlsYXRpb24sIG1vZHVsZSwgdGhpcy5yZWFjdFZlcnNpb24pXG4gICAgICAgIF1cbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLm9wdGlvbnMuZGVidWcpIHtcbiAgICAgICAgZG9QYXJzZSgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdHJ5IHsgZG9QYXJzZSgpOyB9IGNhdGNoIChlKSBcbiAgICAgICAgeyBcbiAgICAgICAgICBjb25zb2xlLmVycm9yKCdcXG5lcnJvciBwYXJzaW5nICcgKyB0aGlzLm9wdGlvbnMuY3VycmVudEZpbGUpOyBcbiAgICAgICAgICBjb25zb2xlLmVycm9yKGUpOyBcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVja3MgZWFjaCBidWlsZCBjb25maWcgZm9yIG1pc3NpbmcvaW52YWxpZCBwcm9wZXJ0aWVzXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lIFRoZSBuYW1lIG9mIHRoZSBidWlsZFxuICAgKiBAcGFyYW0ge1N0cmluZ30gYnVpbGQgVGhlIGJ1aWxkIGNvbmZpZ1xuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX3ZhbGlkYXRlQnVpbGRDb25maWcobmFtZSwgYnVpbGQpIHtcbiAgICBsZXQgeyBzZGssIHByb2R1Y3Rpb24gfSA9IGJ1aWxkO1xuXG4gICAgaWYgKHByb2R1Y3Rpb24pIHtcbiAgICAgIGJ1aWxkLnRyZWVTaGFraW5nID0gZmFsc2U7XG4gICAgfVxuXG4gICAgaWYgKHNkaykge1xuICAgICAgLy9jb21waWxhdGlvbi5lcnJvcnMucHVzaCggbmV3IEVycm9yKGNtZEVycm9ycy5qb2luKFwiXCIpKSApXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYCR7Y2hhbGsucmVkKCdTREsgcGFyYW1ldGVyIG5vIGxvbmdlciBzdXBwb3J0ZWQgd2l0aCBleHQtcmVhY3Qtd2VicGFjay1wbHVnaW4nKX0gIC0gdXNlIHRoZSBFeHQgSlMgbnBtIHBhY2thZ2VzIGluc3RlYWRgKTtcblxuICAgICAgLy8gaWYgKCFmcy5leGlzdHNTeW5jKHNkaykpIHtcbiAgICAgIC8vICAgICB0aHJvdyBuZXcgRXJyb3IoYE5vIFNESyBmb3VuZCBhdCAke3BhdGgucmVzb2x2ZShzZGspfS4gIERpZCB5b3UgZm9yIGdldCB0byBsaW5rL2NvcHkgeW91ciBFeHQgSlMgU0RLIHRvIHRoYXQgbG9jYXRpb24/YCk7XG4gICAgICAvLyB9IGVsc2Uge1xuICAgICAgLy8gICAgIC8vbWpnIHRoaXMgbmVlZGVkPyB0aGlzLl9hZGRFeHRSZWFjdFBhY2thZ2UoYnVpbGQpXG4gICAgICAvLyB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGJ1aWxkLnNkayA9IHBhdGguZGlybmFtZShyZXNvbHZlKCdAc2VuY2hhL2V4dCcsIHsgYmFzZWRpcjogcHJvY2Vzcy5jd2QoKSB9KSlcbiAgICAgICAgYnVpbGQucGFja2FnZURpcnMgPSBbLi4uKGJ1aWxkLnBhY2thZ2VEaXJzIHx8IFtdKSwgcGF0aC5kaXJuYW1lKGJ1aWxkLnNkayldO1xuICAgICAgICBidWlsZC5wYWNrYWdlcyA9IGJ1aWxkLnBhY2thZ2VzIHx8IHRoaXMuX2ZpbmRQYWNrYWdlcyhidWlsZC5zZGspO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvL3Rocm93IG5ldyBFcnJvcihgQHNlbmNoYS9leHQtbW9kZXJuIG5vdCBmb3VuZC4gIFlvdSBjYW4gaW5zdGFsbCBpdCB3aXRoIFwibnBtIGluc3RhbGwgLS1zYXZlIEBzZW5jaGEvZXh0LW1vZGVyblwiIG9yLCBpZiB5b3UgaGF2ZSBhIGxvY2FsIGNvcHkgb2YgdGhlIFNESywgc3BlY2lmeSB0aGUgcGF0aCB0byBpdCB1c2luZyB0aGUgXCJzZGtcIiBvcHRpb24gaW4gYnVpbGQgXCIke25hbWV9LlwiYCk7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgQHNlbmNoYS9leHQgbm90IGZvdW5kLiAgWW91IGNhbiBpbnN0YWxsIGl0IHdpdGggXCJucG0gaW5zdGFsbCAtLXNhdmUgQHNlbmNoYS9leHRgKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyAvKipcbiAgLy8gICogQWRkcyB0aGUgRXh0UmVhY3QgcGFja2FnZSBpZiBwcmVzZW50IGFuZCB0aGUgdG9vbGtpdCBpcyBtb2Rlcm5cbiAgLy8gICogQHBhcmFtIHtPYmplY3R9IGJ1aWxkIFxuICAvLyAgKi9cbiAgLy8gX2FkZEV4dFJlYWN0UGFja2FnZShidWlsZCkge1xuICAvLyAgIGlmIChidWlsZC50b29sa2l0ID09PSAnY2xhc3NpYycpIHJldHVybjtcbiAgLy8gICBpZiAoZnMuZXhpc3RzU3luYyhwYXRoLmpvaW4oYnVpbGQuc2RrLCAnZXh0JywgJ21vZGVybicsICdyZWFjdCcpKSB8fCAgLy8gcmVwb1xuICAvLyAgICAgZnMuZXhpc3RzU3luYyhwYXRoLmpvaW4oYnVpbGQuc2RrLCAnbW9kZXJuJywgJ3JlYWN0JykpKSB7IC8vIHByb2R1Y3Rpb24gYnVpbGRcbiAgLy8gICAgIGlmICghYnVpbGQucGFja2FnZXMpIHtcbiAgLy8gICAgICAgYnVpbGQucGFja2FnZXMgPSBbXTtcbiAgLy8gICAgIH1cbiAgLy8gICAgIGJ1aWxkLnBhY2thZ2VzLnB1c2goJ3JlYWN0Jyk7XG4gIC8vICAgfVxuICAvLyB9XG5cbiAgLyoqXG4gICAqIFJldHVybiB0aGUgbmFtZXMgb2YgYWxsIEV4dFJlYWN0IHBhY2thZ2VzIGluIHRoZSBzYW1lIHBhcmVudCBkaXJlY3RvcnkgYXMgZXh0LXJlYWN0ICh0eXBpY2FsbHkgbm9kZV9tb2R1bGVzL0BzZW5jaGEpXG4gICAqIEBwcml2YXRlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBzZGsgUGF0aCB0byBleHQtcmVhY3RcbiAgICogQHJldHVybiB7U3RyaW5nW119XG4gICAqL1xuICBfZmluZFBhY2thZ2VzKHNkaykge1xuICAgIGNvbnN0IG1vZHVsZXNEaXIgPSBwYXRoLmpvaW4oc2RrLCAnLi4nKTtcbiAgICByZXR1cm4gZnMucmVhZGRpclN5bmMobW9kdWxlc0RpcilcbiAgICAgIC8vIEZpbHRlciBvdXQgZGlyZWN0b3JpZXMgd2l0aG91dCAncGFja2FnZS5qc29uJ1xuICAgICAgLmZpbHRlcihkaXIgPT4gZnMuZXhpc3RzU3luYyhwYXRoLmpvaW4obW9kdWxlc0RpciwgZGlyLCAncGFja2FnZS5qc29uJykpKVxuICAgICAgLy8gR2VuZXJhdGUgYXJyYXkgb2YgcGFja2FnZSBuYW1lc1xuICAgICAgLm1hcChkaXIgPT4ge1xuICAgICAgICAgIGNvbnN0IHBhY2thZ2VJbmZvID0gSlNPTi5wYXJzZShmcy5yZWFkRmlsZVN5bmMocGF0aC5qb2luKG1vZHVsZXNEaXIsIGRpciwgJ3BhY2thZ2UuanNvbicpKSk7XG4gICAgICAgICAgLy8gRG9uJ3QgaW5jbHVkZSB0aGVtZSB0eXBlIHBhY2thZ2VzLlxuICAgICAgICAgIGlmKHBhY2thZ2VJbmZvLnNlbmNoYSAmJiBwYWNrYWdlSW5mby5zZW5jaGEudHlwZSAhPT0gJ3RoZW1lJykge1xuICAgICAgICAgICAgICByZXR1cm4gcGFja2FnZUluZm8uc2VuY2hhLm5hbWU7XG4gICAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIC8vIFJlbW92ZSBhbnkgdW5kZWZpbmVkcyBmcm9tIG1hcFxuICAgICAgLmZpbHRlcihuYW1lID0+IG5hbWUpO1xuICB9XG59XG5cblxuXG5cblxuXG4gIC8vIC8qKlxuICAvLyAgKiBSZXR1cm5zIHRoZSBwYXRoIHRvIHRoZSBzZW5jaGEgY21kIGV4ZWN1dGFibGVcbiAgLy8gICogQHByaXZhdGVcbiAgLy8gICogQHJldHVybiB7U3RyaW5nfVxuICAvLyAgKi9cbiAgLy8gX2dldFNlbmNoQ21kUGF0aCgpIHtcbiAgLy8gICB0cnkgeyByZXR1cm4gcmVxdWlyZSgnQHNlbmNoYS9jbWQnKSB9IFxuICAvLyAgIGNhdGNoIChlKSB7IHJldHVybiAnc2VuY2hhJyB9XG4gIC8vIH1cblxuXG4gICAgICAvLyBpZiAodGhpcy53YXRjaCkge1xuICAgICAgLy8gICBpZiAoIXdhdGNoaW5nKSB7XG4gICAgICAvLyAgICAgd2F0Y2hpbmcgPSBnYXRoZXJFcnJvcnMoZm9yayhzZW5jaGEsIFsnYW50JywgJ3dhdGNoJ10sIHsgY3dkOiBvdXRwdXQsIHNpbGVudDogdHJ1ZSB9KSk7XG4gICAgICAvLyAgICAgd2F0Y2hpbmcuc3RkZXJyLnBpcGUocHJvY2Vzcy5zdGRlcnIpO1xuICAgICAgLy8gICAgIHdhdGNoaW5nLnN0ZG91dC5waXBlKHByb2Nlc3Muc3Rkb3V0KTtcbiAgICAgIC8vICAgICB3YXRjaGluZy5zdGRvdXQub24oJ2RhdGEnLCBkYXRhID0+IHtcbiAgICAgIC8vICAgICAgIGlmIChkYXRhICYmIGRhdGEudG9TdHJpbmcoKS5tYXRjaCgvV2FpdGluZyBmb3IgY2hhbmdlc1xcLlxcLlxcLi8pKSB7XG4gICAgICAvLyAgICAgICAgIG9uQnVpbGREb25lKClcbiAgICAgIC8vICAgICAgIH1cbiAgICAgIC8vICAgICB9KVxuICAgICAgLy8gICAgIHdhdGNoaW5nLm9uKCdleGl0Jywgb25CdWlsZERvbmUpXG4gICAgICAvLyAgIH1cbiAgICAgIC8vICAgaWYgKCFjbWRSZWJ1aWxkTmVlZGVkKSB7XG4gICAgICAvLyAgICAgcmVhZGxpbmUuY3Vyc29yVG8ocHJvY2Vzcy5zdGRvdXQsIDApO2NvbnNvbGUubG9nKGFwcCArICdFeHQgcmVidWlsZCBOT1QgbmVlZGVkJylcbiAgICAgIC8vICAgICBvbkJ1aWxkRG9uZSgpXG4gICAgICAvLyAgIH1cbiAgICAgIC8vICAgZWxzZSB7XG4gICAgICAvLyAgICAgLy9yZWFkbGluZS5jdXJzb3JUbyhwcm9jZXNzLnN0ZG91dCwgMCk7Y29uc29sZS5sb2coYXBwICsgJ0V4dCByZWJ1aWxkIElTIG5lZWRlZCcpXG4gICAgICAvLyAgIH1cbiAgICAgIC8vIH0gXG4gICAgICAvLyBlbHNlIHtcbiAgICAgIC8vICAgY29uc3QgYnVpbGQgPSBnYXRoZXJFcnJvcnMoZm9yayhzZW5jaGEsIFsnYW50JywgJ2J1aWxkJ10sIHsgc3RkaW86ICdpbmhlcml0JywgZW5jb2Rpbmc6ICd1dGYtOCcsIGN3ZDogb3V0cHV0LCBzaWxlbnQ6IGZhbHNlIH0pKTtcbiAgICAgIC8vICAgcmVhZGxpbmUuY3Vyc29yVG8ocHJvY2Vzcy5zdGRvdXQsIDApO2NvbnNvbGUubG9nKGFwcCArICdzZW5jaGEgYW50IGJ1aWxkJylcbiAgICAgIC8vICAgaWYoYnVpbGQuc3Rkb3V0KSB7IGJ1aWxkLnN0ZG91dC5waXBlKHByb2Nlc3Muc3Rkb3V0KSB9XG4gICAgICAvLyAgIGlmKGJ1aWxkLnN0ZGVycikgeyBidWlsZC5zdGRlcnIucGlwZShwcm9jZXNzLnN0ZGVycikgfVxuICAgICAgLy8gICBidWlsZC5vbignZXhpdCcsIG9uQnVpbGREb25lKTtcbiAgICAgIC8vIH1cblxuXG5cbi8vIGNvbnN0IGdhdGhlckVycm9yczIgPSAoY21kKSA9PiB7XG4vLyAgIGlmIChjbWQuc3Rkb3V0KSB7XG4vLyAgICAgY21kLnN0ZG91dC5vbignZGF0YScsIGRhdGEgPT4ge1xuLy8gICAgICAgY29uc3QgbWVzc2FnZSA9IGRhdGEudG9TdHJpbmcoKTtcbi8vICAgICAgIGlmIChtZXNzYWdlLm1hdGNoKC9eXFxbRVJSXFxdLykpIHtcbi8vICAgICAgICAgY21kRXJyb3JzLnB1c2gobWVzc2FnZS5yZXBsYWNlKC9eXFxbRVJSXFxdIC9naSwgJycpKTtcbi8vICAgICAgIH1cbi8vICAgICB9KVxuLy8gICB9XG4vLyAgIHJldHVybiBjbWQ7XG4vLyB9XG5cbi8vIGZ1bmN0aW9uIGdhdGhlckVycm9ycyAoY21kKSB7XG4vLyAgIGlmIChjbWQuc3Rkb3V0KSB7XG4vLyAgICAgY21kLnN0ZG91dC5vbignZGF0YScsIGRhdGEgPT4ge1xuLy8gICAgICAgY29uc3QgbWVzc2FnZSA9IGRhdGEudG9TdHJpbmcoKTtcbi8vICAgICAgIGlmIChtZXNzYWdlLm1hdGNoKC9eXFxbRVJSXFxdLykpIHtcbi8vICAgICAgICAgY21kRXJyb3JzLnB1c2gobWVzc2FnZS5yZXBsYWNlKC9eXFxbRVJSXFxdIC9naSwgJycpKTtcbi8vICAgICAgIH1cbi8vICAgICB9KVxuLy8gICB9XG4vLyAgIHJldHVybiBjbWRcbi8vIH1cblxuXG5cblxuXG5cbi8vIGZyb20gdGhpcy5lbWl0XG4gICAgLy8gdGhlIGZvbGxvd2luZyBpcyBuZWVkZWQgZm9yIGh0bWwtd2VicGFjay1wbHVnaW4gdG8gaW5jbHVkZSA8c2NyaXB0PiBhbmQgPGxpbms+IHRhZ3MgZm9yIEV4dFJlYWN0XG4gICAgLy8gY29uc29sZS5sb2coJ2NvbXBpbGF0aW9uJylcbiAgICAvLyBjb25zb2xlLmxvZygnKioqKioqKipjb21waWxhdGlvbi5jaHVua3NbMF0nKVxuICAgIC8vIGNvbnNvbGUubG9nKGNvbXBpbGF0aW9uLmNodW5rc1swXS5pZClcbiAgICAvLyBjb25zb2xlLmxvZyhwYXRoLmpvaW4odGhpcy5vdXRwdXQsICdleHQuanMnKSlcbiAgICAvLyBjb25zdCBqc0NodW5rID0gY29tcGlsYXRpb24uYWRkQ2h1bmsoYCR7dGhpcy5vdXRwdXR9LWpzYCk7XG4gICAgLy8ganNDaHVuay5oYXNSdW50aW1lID0ganNDaHVuay5pc0luaXRpYWwgPSAoKSA9PiB0cnVlO1xuICAgIC8vIGpzQ2h1bmsuZmlsZXMucHVzaChwYXRoLmpvaW4odGhpcy5vdXRwdXQsICdleHQuanMnKSk7XG4gICAgLy8ganNDaHVuay5maWxlcy5wdXNoKHBhdGguam9pbih0aGlzLm91dHB1dCwgJ2V4dC5jc3MnKSk7XG4gICAgLy8ganNDaHVuay5pZCA9ICdhYWFhcCc7IC8vIHRoaXMgZm9yY2VzIGh0bWwtd2VicGFjay1wbHVnaW4gdG8gaW5jbHVkZSBleHQuanMgZmlyc3RcbiAgICAvLyBjb25zb2xlLmxvZygnKioqKioqKipjb21waWxhdGlvbi5jaHVua3NbMV0nKVxuICAgIC8vIGNvbnNvbGUubG9nKGNvbXBpbGF0aW9uLmNodW5rc1sxXS5pZClcblxuICAgIC8vaWYgKHRoaXMuYXN5bmNocm9ub3VzKSBjYWxsYmFjaygpO1xuLy8gICAgY29uc29sZS5sb2coY2FsbGJhY2spXG5cbi8vIGlmIChpc1dlYnBhY2s0KSB7XG4vLyAgIGNvbnNvbGUubG9nKHBhdGguam9pbih0aGlzLm91dHB1dCwgJ2V4dC5qcycpKVxuLy8gICBjb25zdCBzdGF0cyA9IGZzLnN0YXRTeW5jKHBhdGguam9pbihvdXRwdXRQYXRoLCAnZXh0LmpzJykpXG4vLyAgIGNvbnN0IGZpbGVTaXplSW5CeXRlcyA9IHN0YXRzLnNpemVcbi8vICAgY29tcGlsYXRpb24uYXNzZXRzWydleHQuanMnXSA9IHtcbi8vICAgICBzb3VyY2U6IGZ1bmN0aW9uKCkge3JldHVybiBmcy5yZWFkRmlsZVN5bmMocGF0aC5qb2luKG91dHB1dFBhdGgsICdleHQuanMnKSl9LFxuLy8gICAgIHNpemU6IGZ1bmN0aW9uKCkge3JldHVybiBmaWxlU2l6ZUluQnl0ZXN9XG4vLyAgIH1cbi8vICAgY29uc29sZS5sb2coY29tcGlsYXRpb24uZW50cnlwb2ludHMpXG5cbi8vICAgdmFyIGZpbGVsaXN0ID0gJ0luIHRoaXMgYnVpbGQ6XFxuXFxuJztcblxuLy8gICAvLyBMb29wIHRocm91Z2ggYWxsIGNvbXBpbGVkIGFzc2V0cyxcbi8vICAgLy8gYWRkaW5nIGEgbmV3IGxpbmUgaXRlbSBmb3IgZWFjaCBmaWxlbmFtZS5cbi8vICAgZm9yICh2YXIgZmlsZW5hbWUgaW4gY29tcGlsYXRpb24uYXNzZXRzKSB7XG4vLyAgICAgZmlsZWxpc3QgKz0gKCctICcrIGZpbGVuYW1lICsnXFxuJyk7XG4vLyAgIH1cblxuLy8gICAvLyBJbnNlcnQgdGhpcyBsaXN0IGludG8gdGhlIHdlYnBhY2sgYnVpbGQgYXMgYSBuZXcgZmlsZSBhc3NldDpcbi8vICAgY29tcGlsYXRpb24uYXNzZXRzWydmaWxlbGlzdC5tZCddID0ge1xuLy8gICAgIHNvdXJjZSgpIHtcbi8vICAgICAgIHJldHVybiBmaWxlbGlzdDtcbi8vICAgICB9LFxuLy8gICAgIHNpemUoKSB7XG4vLyAgICAgICByZXR1cm4gZmlsZWxpc3QubGVuZ3RoO1xuLy8gICAgIH1cbi8vICAgfVxuLy8gfVxuXG5cbiAgICAvLyBpZiAoY29tcGlsZXIuaG9va3MpIHtcbiAgICAvLyAgICAgLy8gaW4gJ2V4dHJlYWN0LWNvbXBpbGF0aW9uJ1xuICAgIC8vICAgICAvL2h0dHBzOi8vZ2l0aHViLmNvbS9qYWtldHJlbnQvaHRtbC13ZWJwYWNrLXRlbXBsYXRlXG4gICAgLy8gICAgIC8vaHR0cHM6Ly9naXRodWIuY29tL2phbnRpbW9uL2h0bWwtd2VicGFjay1wbHVnaW4jXG4gICAgLy8gICAgIC8vIHRoZSBmb2xsb3dpbmcgaXMgbmVlZGVkIGZvciBodG1sLXdlYnBhY2stcGx1Z2luIHRvIGluY2x1ZGUgPHNjcmlwdD4gYW5kIDxsaW5rPiB0YWdzIGZvciBFeHRSZWFjdFxuICAgIC8vICAgICBjb21waWxlci5ob29rcy5odG1sV2VicGFja1BsdWdpbkJlZm9yZUh0bWxHZW5lcmF0aW9uLnRhcEFzeW5jKFxuICAgIC8vICAgICAgICdleHRyZWFjdC1odG1sZ2VuZXJhdGlvbicsXG4gICAgLy8gICAgICAgKGRhdGEsIGNiKSA9PiB7XG4gICAgLy8gICAgICAgICByZWFkbGluZS5jdXJzb3JUbyhwcm9jZXNzLnN0ZG91dCwgMCk7Y29uc29sZS5sb2coYXBwICsgJ2V4dHJlYWN0LWh0bWxnZW5lcmF0aW9uJylcbiAgICAvLyAgICAgICAgIGNvbnNvbGUubG9nKCdkYXRhLmFzc2V0cy5qcy5sZW5ndGgnKVxuICAgIC8vICAgICAgICAgY29uc29sZS5sb2coZGF0YS5hc3NldHMuanMubGVuZ3RoKVxuICAgIC8vICAgICAgICAgZGF0YS5hc3NldHMuanMudW5zaGlmdCgnZXh0LXJlYWN0L2V4dC5qcycpXG4gICAgLy8gICAgICAgICBkYXRhLmFzc2V0cy5jc3MudW5zaGlmdCgnZXh0LXJlYWN0L2V4dC5jc3MnKVxuICAgIC8vICAgICAgICAgY2IobnVsbCwgZGF0YSlcbiAgICAvLyAgICAgICB9XG4gICAgLy8gICAgIClcbiAgICAvLyAgIH1cblxuIl19