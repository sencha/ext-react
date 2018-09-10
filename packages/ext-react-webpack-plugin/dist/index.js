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
   * @param {Object} sass Sass configuration properties.
   * @param {Object} resources Extra resources to be copied into the resource folder as specified in the "resources" property of the "output" object. Folders specified in this list will be deeply copied.
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
    * @param {Object} sass Sass configuration properties.
    * @param {Object} resources Extra resources to be copied into the resource folder as specified in the "resources" property of the "output" object. Folders specified in this list will be deeply copied.
    * @private
    */


  _buildExtBundle(compilation, cmdErrors, output, {
    toolkit = 'modern',
    theme,
    packages = [],
    packageDirs = [],
    sdk,
    overrides,
    sass,
    resources
  }) {
    let sencha = this._getSenchCmdPath();

    theme = theme || (toolkit === 'classic' ? 'theme-triton' : 'theme-material');
    return new Promise((resolve, reject) => {
      const onBuildDone = () => {
        if (cmdErrors.length) {
          reject(new Error(cmdErrors.join("")));
        } else {
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

        _fs.default.writeFileSync(_path.default.join(output, 'jsdom-environment.js'), (0, _artifacts.createJSDOMEnvironment)(), 'utf8');

        _fs.default.writeFileSync(_path.default.join(output, 'app.json'), (0, _artifacts.createAppJson)({
          theme,
          packages,
          toolkit,
          overrides,
          packageDirs,
          sass,
          resources
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJyZWFjdFZlcnNpb24iLCJyZWFjdFZlcnNpb25GdWxsIiwid2F0Y2hpbmciLCJhcHAiLCJjaGFsayIsImdyZWVuIiwibW9kdWxlIiwiZXhwb3J0cyIsIkV4dFJlYWN0V2VicGFja1BsdWdpbiIsImNvbnN0cnVjdG9yIiwib3B0aW9ucyIsImZpcnN0VGltZSIsImNvdW50IiwicGtnIiwiZnMiLCJleGlzdHNTeW5jIiwiSlNPTiIsInBhcnNlIiwicmVhZEZpbGVTeW5jIiwiZGVwZW5kZW5jaWVzIiwicmVhY3QiLCJpczE2IiwiaW5jbHVkZXMiLCJleHRSZWFjdFJjIiwiZ2V0RGVmYXVsdE9wdGlvbnMiLCJidWlsZHMiLCJPYmplY3QiLCJrZXlzIiwibGVuZ3RoIiwiYnVpbGRPcHRpb25zIiwiZXh0IiwibmFtZSIsIl92YWxpZGF0ZUJ1aWxkQ29uZmlnIiwiYXNzaWduIiwiY3VycmVudEZpbGUiLCJtYW5pZmVzdCIsIndhdGNoUnVuIiwid2F0Y2giLCJhcHBseSIsImNvbXBpbGVyIiwid2VicGFja1ZlcnNpb24iLCJ1bmRlZmluZWQiLCJpc1dlYnBhY2s0IiwiaG9va3MiLCJyZWFkbGluZSIsImN1cnNvclRvIiwicHJvY2VzcyIsInN0ZG91dCIsImNvbnNvbGUiLCJsb2ciLCJtZSIsImFzeW5jaHJvbm91cyIsInRhcEFzeW5jIiwiY2IiLCJ0YXAiLCJwbHVnaW4iLCJhZGRUb01hbmlmZXN0IiwiY2FsbCIsImZpbGUiLCJzdGF0ZSIsInJlc291cmNlIiwiZSIsImVycm9yIiwiY29tcGlsYXRpb24iLCJkYXRhIiwic3VjY2VlZE1vZHVsZSIsIm5vcm1hbE1vZHVsZUZhY3RvcnkiLCJwYXJzZXIiLCJodG1sV2VicGFja1BsdWdpbkJlZm9yZUh0bWxHZW5lcmF0aW9uIiwib3V0cHV0T3B0aW9ucyIsInB1YmxpY1BhdGgiLCJhc3NldHMiLCJqcyIsInVuc2hpZnQiLCJjc3MiLCJwYXRoIiwiam9pbiIsImVtaXQiLCJjYWxsYmFjayIsImRvbmUiLCJtb2R1bGVzIiwiY2h1bmtzIiwicmVkdWNlIiwiYSIsImIiLCJjb25jYXQiLCJkZXBzIiwiYnVpbGQiLCJvdXRwdXRQYXRoIiwib3V0cHV0IiwiZGV2U2VydmVyIiwiY29udGVudEJhc2UiLCJjbWRFcnJvcnMiLCJwcm9taXNlIiwiX2J1aWxkRXh0QnVuZGxlIiwidXJsIiwicG9ydCIsIm9wbiIsInJlcXVpcmUiLCJ0b29sa2l0IiwidGhlbWUiLCJwYWNrYWdlcyIsInBhY2thZ2VEaXJzIiwic2RrIiwib3ZlcnJpZGVzIiwic2FzcyIsInJlc291cmNlcyIsInNlbmNoYSIsIl9nZXRTZW5jaENtZFBhdGgiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsIm9uQnVpbGREb25lIiwiRXJyb3IiLCJ1c2VyUGFja2FnZXMiLCJwdXNoIiwid3JpdGVGaWxlU3luYyIsImNvbXByZXNzIiwicHJvZHVjdGlvbiIsInBhcm1zIiwiY3dkIiwic2lsZW50Iiwic3RkaW8iLCJlbmNvZGluZyIsInZlcmJvc2UiLCJlbnYiLCJFWFRSRUFDVF9WRVJCT1NFIiwidGhlbiIsInJlYXNvbiIsImRlYnVnIiwidGVzdCIsIm1hbmlmZXN0RXh0cmFjdG9yIiwiZXh0cmFjdEZyb21KU1giLCJ0cmVlU2hha2luZyIsIm1hdGNoIiwiZG9QYXJzZSIsIl9zb3VyY2UiLCJfdmFsdWUiLCJyZWQiLCJkaXJuYW1lIiwiYmFzZWRpciIsIl9maW5kUGFja2FnZXMiLCJtb2R1bGVzRGlyIiwicmVhZGRpclN5bmMiLCJmaWx0ZXIiLCJkaXIiLCJtYXAiLCJwYWNrYWdlSW5mbyIsInR5cGUiXSwibWFwcGluZ3MiOiJBQUFBOztBQUNBOztBQUdBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUVBOztBQUNBOztBQUdBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFmQSxJQUFJQSxZQUFZLEdBQUcsQ0FBbkI7QUFDQSxJQUFJQyxnQkFBZ0IsR0FBRyxFQUF2QjtBQVlBLElBQUlDLFFBQVEs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V0FBVyxDQUFDeEMsTUFBWixDQUFtQjVFLElBQTFCO0FBQ0g7QUFDSixLQVZJLEVBV0w7QUFYSyxLQVlKaUgsTUFaSSxDQVlHakgsSUFBSSxJQUFJQSxJQVpYLENBQVA7QUFhRDtBQUVEOzs7Ozs7O0FBS0E2RSxFQUFBQSxnQkFBZ0IsR0FBRztBQUNqQixRQUFJO0FBQUUsYUFBT1YsT0FBTyxDQUFDLGFBQUQsQ0FBZDtBQUErQixLQUFyQyxDQUNBLE9BQU9yQyxDQUFQLEVBQVU7QUFBRSxhQUFPLFFBQVA7QUFBaUI7QUFDOUI7O0FBMWhCMEMsQ0FBN0MsQyxDQWdpQk07QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSU47QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFPQTtBQUNJO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0o7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUdJO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5pbXBvcnQgJ0BiYWJlbC9wb2x5ZmlsbCc7XG52YXIgcmVhY3RWZXJzaW9uID0gMFxudmFyIHJlYWN0VmVyc2lvbkZ1bGwgPSAnJ1xuaW1wb3J0IGNoYWxrIGZyb20gJ2NoYWxrJztcbmltcG9ydCBmcyBmcm9tICdmcyc7XG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCB7IHN5bmMgYXMgbWtkaXJwIH0gZnJvbSAnbWtkaXJwJztcbmltcG9ydCB7IGV4ZWN1dGVBc3luYyB9IGZyb20gJy4vZXhlY3V0ZUFzeW5jJ1xuaW1wb3J0IGV4dHJhY3RGcm9tSlNYIGZyb20gJy4vZXh0cmFjdEZyb21KU1gnO1xuaW1wb3J0IHsgc3luYyBhcyByaW1yYWYgfSBmcm9tICdyaW1yYWYnO1xuaW1wb3J0IHsgYnVpbGRYTUwsIGNyZWF0ZUFwcEpzb24sIGNyZWF0ZVdvcmtzcGFjZUpzb24gfSBmcm9tICcuL2FydGlmYWN0cyc7XG5pbXBvcnQgeyBjcmVhdGVKU0RPTUVudmlyb25tZW50IH0gZnJvbSAnLi9hcnRpZmFjdHMnO1xuaW1wb3J0IHsgZ2VuZXJhdGUgfSBmcm9tICdhc3RyaW5nJztcbmltcG9ydCB7IHN5bmMgYXMgcmVzb2x2ZSB9IGZyb20gJ3Jlc29sdmUnO1xubGV0IHdhdGNoaW5nID0gZmFsc2U7XG5jb25zdCBhcHAgPSBgJHtjaGFsay5ncmVlbign4oS5IO+9omV4dO+9ozonKX0gZXh0LXJlYWN0LXdlYnBhY2stcGx1Z2luOiBgO1xuaW1wb3J0ICogYXMgcmVhZGxpbmUgZnJvbSAncmVhZGxpbmUnXG5cbm1vZHVsZS5leHBvcnRzID0gY2xhc3MgRXh0UmVhY3RXZWJwYWNrUGx1Z2luIHtcbiAgLyoqXG4gICAqIEBwYXJhbSB7T2JqZWN0W119IGJ1aWxkc1xuICAgKiBAcGFyYW0ge0Jvb2xlYW59IFtkZWJ1Zz1mYWxzZV0gU2V0IHRvIHRydWUgdG8gcHJldmVudCBjbGVhbnVwIG9mIGJ1aWxkIHRlbXBvcmFyeSBidWlsZCBhcnRpZmFjdHMgdGhhdCBtaWdodCBiZSBoZWxwZnVsIGluIHRyb3VibGVzaG9vdGluZyBpc3N1ZXMuXG4gICAqIGRlcHJlY2F0ZWQgQHBhcmFtIHtTdHJpbmd9IHNkayBUaGUgZnVsbCBwYXRoIHRvIHRoZSBFeHRSZWFjdCBTREtcbiAgICogQHBhcmFtIHtTdHJpbmd9IFt0b29sa2l0PSdtb2Rlcm4nXSBcIm1vZGVyblwiIG9yIFwiY2xhc3NpY1wiXG4gICAqIEBwYXJhbSB7U3RyaW5nfSB0aGVtZSBUaGUgbmFtZSBvZiB0aGUgRXh0UmVhY3QgdGhlbWUgcGFja2FnZSB0byB1c2UsIGZvciBleGFtcGxlIFwidGhlbWUtbWF0ZXJpYWxcIlxuICAgKiBAcGFyYW0ge1N0cmluZ1tdfSBwYWNrYWdlcyBBbiBhcnJheSBvZiBFeHRSZWFjdCBwYWNrYWdlcyB0byBpbmNsdWRlXG4gICAqIEBwYXJhbSB7U3RyaW5nW119IG92ZXJyaWRlcyBBbiBhcnJheSB3aXRoIHRoZSBwYXRocyBvZiBkaXJlY3RvcmllcyBvciBmaWxlcyB0byBzZWFyY2guIEFueSBjbGFzc2VzXG4gICAqIGRlY2xhcmVkIGluIHRoZXNlIGxvY2F0aW9ucyB3aWxsIGJlIGF1dG9tYXRpY2FsbHkgcmVxdWlyZWQgYW5kIGluY2x1ZGVkIGluIHRoZSBidWlsZC5cbiAgICogSWYgYW55IGZpbGUgZGVmaW5lcyBhbiBFeHRSZWFjdCBvdmVycmlkZSAodXNpbmcgRXh0LmRlZmluZSB3aXRoIGFuIFwib3ZlcnJpZGVcIiBwcm9wZXJ0eSksXG4gICAqIHRoYXQgb3ZlcnJpZGUgd2lsbCBpbiBmYWN0IG9ubHkgYmUgaW5jbHVkZWQgaW4gdGhlIGJ1aWxkIGlmIHRoZSB0YXJnZXQgY2xhc3Mgc3BlY2lmaWVkXG4gICAqIGluIHRoZSBcIm92ZXJyaWRlXCIgcHJvcGVydHkgaXMgYWxzbyBpbmNsdWRlZC5cbiAgICogQHBhcmFtIHtTdHJpbmd9IG91dHB1dCBUaGUgcGF0aCB0byBkaXJlY3Rvcnkgd2hlcmUgdGhlIEV4dFJlYWN0IGJ1bmRsZSBzaG91bGQgYmUgd3JpdHRlblxuICAgKiBAcGFyYW0ge0Jvb2xlYW59IGFzeW5jaHJvbm91cyBTZXQgdG8gdHJ1ZSB0byBydW4gU2VuY2hhIENtZCBidWlsZHMgYXN5bmNocm9ub3VzbHkuIFRoaXMgbWFrZXMgdGhlIHdlYnBhY2sgYnVpbGQgZmluaXNoIG11Y2ggZmFzdGVyLCBidXQgdGhlIGFwcCBtYXkgbm90IGxvYWQgY29ycmVjdGx5IGluIHlvdXIgYnJvd3NlciB1bnRpbCBTZW5jaGEgQ21kIGlzIGZpbmlzaGVkIGJ1aWxkaW5nIHRoZSBFeHRSZWFjdCBidW5kbGVcbiAgICogQHBhcmFtIHtCb29sZWFufSBwcm9kdWN0aW9uIFNldCB0byB0cnVlIGZvciBwcm9kdWN0aW9uIGJ1aWxkcy4gIFRoaXMgdGVsbCBTZW5jaGEgQ21kIHRvIGNvbXByZXNzIHRoZSBnZW5lcmF0ZWQgSlMgYnVuZGxlLlxuICAgKiBAcGFyYW0ge0Jvb2xlYW59IHRyZWVTaGFraW5nIFNldCB0byBmYWxzZSB0byBkaXNhYmxlIHRyZWUgc2hha2luZyBpbiBkZXZlbG9wbWVudCBidWlsZHMuICBUaGlzIG1ha2VzIGluY3JlbWVudGFsIHJlYnVpbGRzIGZhc3RlciBhcyBhbGwgRXh0UmVhY3QgY29tcG9uZW50cyBhcmUgaW5jbHVkZWQgaW4gdGhlIGV4dC5qcyBidW5kbGUgaW4gdGhlIGluaXRpYWwgYnVpbGQgYW5kIHRodXMgdGhlIGJ1bmRsZSBkb2VzIG5vdCBuZWVkIHRvIGJlIHJlYnVpbHQgYWZ0ZXIgZWFjaCBjaGFuZ2UuIERlZmF1bHRzIHRvIHRydWUuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBzYXNzIFNhc3MgY29uZmlndXJhdGlvbiBwcm9wZXJ0aWVzLlxuICAgKiBAcGFyYW0ge09iamVjdH0gcmVzb3VyY2VzIEV4dHJhIHJlc291cmNlcyB0byBiZSBjb3BpZWQgaW50byB0aGUgcmVzb3VyY2UgZm9sZGVyIGFzIHNwZWNpZmllZCBpbiB0aGUgXCJyZXNvdXJjZXNcIiBwcm9wZXJ0eSBvZiB0aGUgXCJvdXRwdXRcIiBvYmplY3QuIEZvbGRlcnMgc3BlY2lmaWVkIGluIHRoaXMgbGlzdCB3aWxsIGJlIGRlZXBseSBjb3BpZWQuXG4gICAqL1xuICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgdGhpcy5maXJzdFRpbWUgPSB0cnVlXG4gICAgdGhpcy5jb3VudCA9IDBcbiAgICAvL2NhbiBiZSBpbiBkZXZkZXBlbmRlbmNpZXMgLSBhY2NvdW50IGZvciB0aGlzOiByZWFjdDogXCIxNS4xNi4wXCJcbiAgICB2YXIgcGtnID0gKGZzLmV4aXN0c1N5bmMoJ3BhY2thZ2UuanNvbicpICYmIEpTT04ucGFyc2UoZnMucmVhZEZpbGVTeW5jKCdwYWNrYWdlLmpzb24nLCAndXRmLTgnKSkgfHwge30pXG4gICAgcmVhY3RWZXJzaW9uRnVsbCA9IHBrZy5kZXBlbmRlbmNpZXMucmVhY3RcbiAgICB2YXIgaXMxNiA9IHJlYWN0VmVyc2lvbkZ1bGwuaW5jbHVkZXMoXCIxNlwiKVxuICAgIGlmIChpczE2KSB7IHJlYWN0VmVyc2lvbiA9IDE2IH1cbiAgICBlbHNlIHsgcmVhY3RWZXJzaW9uID0gMTUgfVxuICAgIHRoaXMucmVhY3RWZXJzaW9uID0gcmVhY3RWZXJzaW9uXG4gICAgdGhpcy5yZWFjdFZlcnNpb25GdWxsID0gcmVhY3RWZXJzaW9uRnVsbFxuICAgIGNvbnN0IGV4dFJlYWN0UmMgPSAoZnMuZXhpc3RzU3luYygnLmV4dC1yZWFjdHJjJykgJiYgSlNPTi5wYXJzZShmcy5yZWFkRmlsZVN5bmMoJy5leHQtcmVhY3RyYycsICd1dGYtOCcpKSB8fCB7fSlcbiAgICBvcHRpb25zID0geyAuLi50aGlzLmdldERlZmF1bHRPcHRpb25zKCksIC4uLm9wdGlvbnMsIC4uLmV4dFJlYWN0UmMgfVxuICAgIGNvbnN0IHsgYnVpbGRzIH0gPSBvcHRpb25zXG4gICAgaWYgKE9iamVjdC5rZXlzKGJ1aWxkcykubGVuZ3RoID09PSAwKSB7XG4gICAgICBjb25zdCB7IGJ1aWxkcywgLi4uYnVpbGRPcHRpb25zIH0gPSBvcHRpb25zXG4gICAgICBidWlsZHMuZXh0ID0gYnVpbGRPcHRpb25zXG4gICAgfVxuICAgIGZvciAobGV0IG5hbWUgaW4gYnVpbGRzKSB7XG4gICAgICB0aGlzLl92YWxpZGF0ZUJ1aWxkQ29uZmlnKG5hbWUsIGJ1aWxkc1tuYW1lXSlcbiAgICB9XG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCB7XG4gICAgICAuLi5vcHRpb25zLFxuICAgICAgY3VycmVudEZpbGU6IG51bGwsXG4gICAgICBtYW5pZmVzdDogbnVsbCxcbiAgICAgIGRlcGVuZGVuY2llczogW11cbiAgICB9KVxuICB9XG5cbiAgd2F0Y2hSdW4oKSB7XG4gICAgdGhpcy53YXRjaCA9IHRydWVcbiAgfVxuXG4gIGFwcGx5KGNvbXBpbGVyKSB7XG4gICAgaWYgKHRoaXMud2VicGFja1ZlcnNpb24gPT0gdW5kZWZpbmVkKSB7XG4gICAgICBjb25zdCBpc1dlYnBhY2s0ID0gY29tcGlsZXIuaG9va3M7XG4gICAgICBpZiAoaXNXZWJwYWNrNCkge3RoaXMud2VicGFja1ZlcnNpb24gPSAnSVMgd2VicGFjayA0J31cbiAgICAgIGVsc2Uge3RoaXMud2VicGFja1ZlcnNpb24gPSAnTk9UIHdlYnBhY2sgNCd9XG4gICAgICByZWFkbGluZS5jdXJzb3JUbyhwcm9jZXNzLnN0ZG91dCwgMCk7Y29uc29sZS5sb2coYXBwICsgJ3JlYWN0VmVyc2lvbjogJyArIHRoaXMucmVhY3RWZXJzaW9uRnVsbCArICcsICcgKyB0aGlzLndlYnBhY2tWZXJzaW9uKVxuICAgIH1cbiAgICBjb25zdCBtZSA9IHRoaXNcblxuICAgIGlmIChjb21waWxlci5ob29rcykge1xuICAgICAgaWYgKHRoaXMuYXN5bmNocm9ub3VzKSB7XG4gICAgICAgIGNvbXBpbGVyLmhvb2tzLndhdGNoUnVuLnRhcEFzeW5jKCdleHQtcmVhY3Qtd2F0Y2gtcnVuIChhc3luYyknLCAod2F0Y2hpbmcsIGNiKSA9PiB7XG4gICAgICAgICAgcmVhZGxpbmUuY3Vyc29yVG8ocHJvY2Vzcy5zdGRvdXQsIDApO2NvbnNvbGUubG9nKGFwcCArICdleHQtcmVhY3Qtd2F0Y2gtcnVuIChhc3luYyknKVxuICAgICAgICAgIHRoaXMud2F0Y2hSdW4oKVxuICAgICAgICAgIGNiKClcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBjb21waWxlci5ob29rcy53YXRjaFJ1bi50YXAoJ2V4dC1yZWFjdC13YXRjaC1ydW4nLCAod2F0Y2hpbmcpID0+IHtcbiAgICAgICAgICByZWFkbGluZS5jdXJzb3JUbyhwcm9jZXNzLnN0ZG91dCwgMCk7Y29uc29sZS5sb2coYXBwICsgJ2V4dC1yZWFjdC13YXRjaC1ydW4nKVxuICAgICAgICAgIHRoaXMud2F0Y2hSdW4oKVxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGNvbXBpbGVyLnBsdWdpbignd2F0Y2gtcnVuJywgKHdhdGNoaW5nLCBjYikgPT4ge1xuICAgICAgICByZWFkbGluZS5jdXJzb3JUbyhwcm9jZXNzLnN0ZG91dCwgMCk7Y29uc29sZS5sb2coYXBwICsgJ3dhdGNoLXJ1bicpXG4gICAgICAgIHRoaXMud2F0Y2hSdW4oKVxuICAgICAgICBjYigpXG4gICAgICB9KVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFkZHMgdGhlIGNvZGUgZm9yIHRoZSBzcGVjaWZpZWQgZnVuY3Rpb24gY2FsbCB0byB0aGUgbWFuaWZlc3QuanMgZmlsZVxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBjYWxsIEEgZnVuY3Rpb24gY2FsbCBBU1Qgbm9kZS5cbiAgICAgKi9cbiAgICBjb25zdCBhZGRUb01hbmlmZXN0ID0gZnVuY3Rpb24oY2FsbCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgZmlsZSA9IHRoaXMuc3RhdGUubW9kdWxlLnJlc291cmNlO1xuICAgICAgICBtZS5kZXBlbmRlbmNpZXNbZmlsZV0gPSBbIC4uLihtZS5kZXBlbmRlbmNpZXNbZmlsZV0gfHwgW10pLCBnZW5lcmF0ZShjYWxsKSBdO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjb25zb2xlLmVycm9yKGBFcnJvciBwcm9jZXNzaW5nICR7ZmlsZX1gKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgaWYgKGNvbXBpbGVyLmhvb2tzKSB7XG4gICAgICBjb21waWxlci5ob29rcy5jb21waWxhdGlvbi50YXAoJ2V4dC1yZWFjdC1jb21waWxhdGlvbicsIChjb21waWxhdGlvbixkYXRhKSA9PiB7XG4gICAgICAgIHJlYWRsaW5lLmN1cnNvclRvKHByb2Nlc3Muc3Rkb3V0LCAwKTtjb25zb2xlLmxvZyhhcHAgKyAnZXh0LXJlYWN0LWNvbXBpbGF0aW9uJylcbiAgICAgICAgY29tcGlsYXRpb24uaG9va3Muc3VjY2VlZE1vZHVsZS50YXAoJ2V4dC1yZWFjdC1zdWNjZWVkLW1vZHVsZScsIChtb2R1bGUpID0+IHtcbiAgICAgICAgICB0aGlzLnN1Y2NlZWRNb2R1bGUoY29tcGlsYXRpb24sIG1vZHVsZSlcbiAgICAgICAgfSlcblxuICAgICAgICBkYXRhLm5vcm1hbE1vZHVsZUZhY3RvcnkucGx1Z2luKFwicGFyc2VyXCIsIGZ1bmN0aW9uKHBhcnNlciwgb3B0aW9ucykge1xuICAgICAgICAgIC8vIGV4dHJhY3QgeHR5cGVzIGFuZCBjbGFzc2VzIGZyb20gRXh0LmNyZWF0ZSBjYWxsc1xuICAgICAgICAgIHBhcnNlci5wbHVnaW4oJ2NhbGwgRXh0LmNyZWF0ZScsIGFkZFRvTWFuaWZlc3QpO1xuICAgICAgICAgIC8vIGNvcHkgRXh0LnJlcXVpcmUgY2FsbHMgdG8gdGhlIG1hbmlmZXN0LiAgVGhpcyBhbGxvd3MgdGhlIHVzZXJzIHRvIGV4cGxpY2l0bHkgcmVxdWlyZSBhIGNsYXNzIGlmIHRoZSBwbHVnaW4gZmFpbHMgdG8gZGV0ZWN0IGl0LlxuICAgICAgICAgIHBhcnNlci5wbHVnaW4oJ2NhbGwgRXh0LnJlcXVpcmUnLCBhZGRUb01hbmlmZXN0KTtcbiAgICAgICAgICAvLyBjb3B5IEV4dC5kZWZpbmUgY2FsbHMgdG8gdGhlIG1hbmlmZXN0LiAgVGhpcyBhbGxvd3MgdXNlcnMgdG8gd3JpdGUgc3RhbmRhcmQgRXh0UmVhY3QgY2xhc3Nlcy5cbiAgICAgICAgICBwYXJzZXIucGx1Z2luKCdjYWxsIEV4dC5kZWZpbmUnLCBhZGRUb01hbmlmZXN0KTtcbiAgICAgICAgfSlcblxuICAgICAgICBjb21waWxhdGlvbi5ob29rcy5odG1sV2VicGFja1BsdWdpbkJlZm9yZUh0bWxHZW5lcmF0aW9uLnRhcEFzeW5jKCdleHQtcmVhY3QtaHRtbGdlbmVyYXRpb24nLChkYXRhLCBjYikgPT4ge1xuXG4gICAgICAgICAgcmVhZGxpbmUuY3Vyc29yVG8ocHJvY2Vzcy5zdGRvdXQsIDApO2NvbnNvbGUubG9nKGFwcCArICdleHQtcmVhY3QtaHRtbGdlbmVyYXRpb24nKVxuICAgICAgICAgIC8vcmVhZGxpbmUuY3Vyc29yVG8ocHJvY2Vzcy5zdGRvdXQsIDApO2NvbnNvbGUubG9nKGFwcCArIGNvbXBpbGF0aW9uLm91dHB1dE9wdGlvbnMucHVibGljUGF0aClcbiAgICAgICAgICBpZiAoY29tcGlsYXRpb24ub3V0cHV0T3B0aW9ucy5wdWJsaWNQYXRoID09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgZGF0YS5hc3NldHMuanMudW5zaGlmdCgnZXh0LXJlYWN0L2V4dC5qcycpXG4gICAgICAgICAgICBkYXRhLmFzc2V0cy5jc3MudW5zaGlmdCgnZXh0LXJlYWN0L2V4dC5jc3MnKVxuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGRhdGEuYXNzZXRzLmpzLnVuc2hpZnQocGF0aC5qb2luKGNvbXBpbGF0aW9uLm91dHB1dE9wdGlvbnMucHVibGljUGF0aCwgJ2V4dC1yZWFjdC9leHQuanMnKSlcbiAgICAgICAgICAgIGRhdGEuYXNzZXRzLmNzcy51bnNoaWZ0KHBhdGguam9pbihjb21waWxhdGlvbi5vdXRwdXRPcHRpb25zLnB1YmxpY1BhdGgsICdleHQtcmVhY3QvZXh0LmNzcycpKVxuICAgICAgICAgIH1cbiAgICAgICAgICBjYihudWxsLCBkYXRhKVxuICAgICAgICB9KVxuXG4gICAgICB9KVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGNvbXBpbGVyLnBsdWdpbignY29tcGlsYXRpb24nLCAoY29tcGlsYXRpb24sIGRhdGEpID0+IHtcbiAgICAgICAgcmVhZGxpbmUuY3Vyc29yVG8ocHJvY2Vzcy5zdGRvdXQsIDApO2NvbnNvbGUubG9nKGFwcCArICdjb21waWxhdGlvbicpXG4gICAgICAgIGNvbXBpbGF0aW9uLnBsdWdpbignc3VjY2VlZC1tb2R1bGUnLCAobW9kdWxlKSA9PiB7XG4gICAgICAgICAgdGhpcy5zdWNjZWVkTW9kdWxlKGNvbXBpbGF0aW9uLCBtb2R1bGUpXG4gICAgICAgIH0pXG4gICAgICAgIGRhdGEubm9ybWFsTW9kdWxlRmFjdG9yeS5wbHVnaW4oXCJwYXJzZXJcIiwgZnVuY3Rpb24ocGFyc2VyLCBvcHRpb25zKSB7XG4gICAgICAgICAgLy8gZXh0cmFjdCB4dHlwZXMgYW5kIGNsYXNzZXMgZnJvbSBFeHQuY3JlYXRlIGNhbGxzXG4gICAgICAgICAgcGFyc2VyLnBsdWdpbignY2FsbCBFeHQuY3JlYXRlJywgYWRkVG9NYW5pZmVzdCk7XG4gICAgICAgICAgLy8gY29weSBFeHQucmVxdWlyZSBjYWxscyB0byB0aGUgbWFuaWZlc3QuICBUaGlzIGFsbG93cyB0aGUgdXNlcnMgdG8gZXhwbGljaXRseSByZXF1aXJlIGEgY2xhc3MgaWYgdGhlIHBsdWdpbiBmYWlscyB0byBkZXRlY3QgaXQuXG4gICAgICAgICAgcGFyc2VyLnBsdWdpbignY2FsbCBFeHQucmVxdWlyZScsIGFkZFRvTWFuaWZlc3QpO1xuICAgICAgICAgIC8vIGNvcHkgRXh0LmRlZmluZSBjYWxscyB0byB0aGUgbWFuaWZlc3QuICBUaGlzIGFsbG93cyB1c2VycyB0byB3cml0ZSBzdGFuZGFyZCBFeHRSZWFjdCBjbGFzc2VzLlxuICAgICAgICAgIHBhcnNlci5wbHVnaW4oJ2NhbGwgRXh0LmRlZmluZScsIGFkZFRvTWFuaWZlc3QpO1xuICAgICAgICB9KVxuXG4gICAgICB9KVxuICAgIH1cblxuLy8qZW1pdCAtIG9uY2UgYWxsIG1vZHVsZXMgYXJlIHByb2Nlc3NlZCwgY3JlYXRlIHRoZSBvcHRpbWl6ZWQgRXh0UmVhY3QgYnVpbGQuXG4gICAgaWYgKGNvbXBpbGVyLmhvb2tzKSB7XG4gICAgICBpZiAodHJ1ZSkge1xuICAgICAgICBjb21waWxlci5ob29rcy5lbWl0LnRhcEFzeW5jKCdleHQtcmVhY3QtZW1pdCAoYXN5bmMpJywgKGNvbXBpbGF0aW9uLCBjYWxsYmFjaykgPT4ge1xuICAgICAgICAgIHJlYWRsaW5lLmN1cnNvclRvKHByb2Nlc3Muc3Rkb3V0LCAwKTtjb25zb2xlLmxvZyhhcHAgKyAnZXh0LXJlYWN0LWVtaXQgIChhc3luYyknKVxuICAgICAgICAgIHRoaXMuZW1pdChjb21waWxlciwgY29tcGlsYXRpb24sIGNhbGxiYWNrKVxuICAgICAgICB9KVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGNvbXBpbGVyLmhvb2tzLmVtaXQudGFwKCdleHQtcmVhY3QtZW1pdCcsIChjb21waWxhdGlvbikgPT4ge1xuICAgICAgICAgIHJlYWRsaW5lLmN1cnNvclRvKHByb2Nlc3Muc3Rkb3V0LCAwKTtjb25zb2xlLmxvZyhhcHAgKyAnZXh0LXJlYWN0LWVtaXQnKVxuICAgICAgICAgIHRoaXMuZW1pdChjb21waWxlciwgY29tcGlsYXRpb24pXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgY29tcGlsZXIucGx1Z2luKCdlbWl0JywgKGNvbXBpbGF0aW9uLCBjYWxsYmFjaykgPT4ge1xuICAgICAgICByZWFkbGluZS5jdXJzb3JUbyhwcm9jZXNzLnN0ZG91dCwgMCk7Y29uc29sZS5sb2coYXBwICsgJ2VtaXQnKVxuICAgICAgICB0aGlzLmVtaXQoY29tcGlsZXIsIGNvbXBpbGF0aW9uLCBjYWxsYmFjaylcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgaWYgKGNvbXBpbGVyLmhvb2tzKSB7XG4gICAgICBpZiAodGhpcy5hc3luY2hyb25vdXMpIHtcbiAgICAgICAgY29tcGlsZXIuaG9va3MuZG9uZS50YXBBc3luYygnZXh0LXJlYWN0LWRvbmUgKGFzeW5jKScsIChjb21waWxhdGlvbiwgY2FsbGJhY2spID0+IHtcbiAgICAgICAgICByZWFkbGluZS5jdXJzb3JUbyhwcm9jZXNzLnN0ZG91dCwgMCk7Y29uc29sZS5sb2coYXBwICsgJ2V4dC1yZWFjdC1kb25lIChhc3luYyknKVxuICAgICAgICAgIGlmIChjYWxsYmFjayAhPSBudWxsKSBcbiAgICAgICAgICB7XG4gICAgICAgICAgICBpZiAodGhpcy5hc3luY2hyb25vdXMpIFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBjb25zb2xlLmxvZygnY2FsbGluZyBjYWxsYmFjayBmb3IgZXh0LXJlYWN0LWVtaXQgIChhc3luYyknKVxuICAgICAgICAgICAgICBjYWxsYmFjaygpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGNvbXBpbGVyLmhvb2tzLmRvbmUudGFwKCdleHQtcmVhY3QtZG9uZScsICgpID0+IHtcbiAgICAgICAgICByZWFkbGluZS5jdXJzb3JUbyhwcm9jZXNzLnN0ZG91dCwgMCk7Y29uc29sZS5sb2coYXBwICsgJ2V4dC1yZWFjdC1kb25lJylcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBhc3luYyBlbWl0KGNvbXBpbGVyLCBjb21waWxhdGlvbiwgY2FsbGJhY2spIHtcbiAgICB2YXIgaXNXZWJwYWNrNCA9IGNvbXBpbGF0aW9uLmhvb2tzO1xuICAgIHZhciBtb2R1bGVzID0gW11cbiAgICBpZiAoaXNXZWJwYWNrNCkge1xuICAgICAgaXNXZWJwYWNrNCA9IHRydWVcblxuXG5cblxuLy8gICAgICAgbW9kdWxlcyA9IGNvbXBpbGF0aW9uLmNodW5rcy5yZWR1Y2UoKGEsIGIpID0+IGEuY29uY2F0KGIuX21vZHVsZXMpLCBbXSlcbi8vIC8vICAgICAgY29uc29sZS5sb2cobW9kdWxlcylcbi8vICAgICAgIHZhciBpID0gMFxuLy8gICAgICAgdmFyIHRoZU1vZHVsZSA9ICcnXG4vLyAgICAgICBmb3IgKGxldCBtb2R1bGUgb2YgbW9kdWxlcykge1xuLy8gICAgICAgICBpZiAoaSA9PSAwKSB7XG4vLyAgICAgICAgICAgdGhlTW9kdWxlID0gbW9kdWxlXG4vLyAgICAgICAgICAgaSsrXG4vLyAgICAgICAgIH1cbi8vIC8vY29uc3QgZGVwcyA9IHRoaXMuZGVwZW5kZW5jaWVzW21vZHVsZS5yZXNvdXJjZV1cbi8vICAgICAgICAgLy9jb25zb2xlLmxvZyhkZXBzKVxuLy8gICAgICAgICAvL2lmIChkZXBzKSBzdGF0ZW1lbnRzID0gc3RhdGVtZW50cy5jb25jYXQoZGVwcyk7XG4vLyAgICAgICB9XG4vLyAgICAgICB2YXIgdGhlUGF0aCA9IHBhdGguam9pbihjb21waWxlci5vdXRwdXRQYXRoLCAnbW9kdWxlLnR4dCcpXG4vLyAgICAgICAvL2NvbnNvbGUubG9nKHRoZVBhdGgpXG5cbi8vICAgICAgIC8vdmFyIG8gPSB7fTtcbi8vICAgICAgIC8vby5vID0gdGhlTW9kdWxlO1xuLy8gICAgICAgLy9jb25zb2xlLmxvZyh0aGVNb2R1bGVbMF0uY29udGV4dClcbiAgICAgIFxuLy8gICAgICAgdmFyIGNhY2hlID0gW107XG4vLyAgICAgICB2YXIgaCA9IEpTT04uc3RyaW5naWZ5KHRoZU1vZHVsZSwgZnVuY3Rpb24oa2V5LCB2YWx1ZSkge1xuLy8gICAgICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICE9PSBudWxsKSB7XG4vLyAgICAgICAgICAgICAgIGlmIChjYWNoZS5pbmRleE9mKHZhbHVlKSAhPT0gLTEpIHtcbi8vICAgICAgICAgICAgICAgICAgIC8vIENpcmN1bGFyIHJlZmVyZW5jZSBmb3VuZCwgZGlzY2FyZCBrZXlcbi8vICAgICAgICAgICAgICAgICAgIHJldHVybjtcbi8vICAgICAgICAgICAgICAgfVxuLy8gICAgICAgICAgICAgICAvLyBTdG9yZSB2YWx1ZSBpbiBvdXIgY29sbGVjdGlvblxuLy8gICAgICAgICAgICAgICBjYWNoZS5wdXNoKHZhbHVlKTtcbi8vICAgICAgICAgICB9XG4vLyAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuLy8gICAgICAgfSk7XG4vLyAgICAgICBjYWNoZSA9IG51bGw7IC8vIEVuYWJsZSBnYXJiYWdlIGNvbGxlY3Rpb25cbi8vICAgICAgIC8vZnMud3JpdGVGaWxlU3luYyggdGhlUGF0aCwgaCwgJ3V0ZjgnKVxuXG5cblxuXG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgaXNXZWJwYWNrNCA9IGZhbHNlXG5cblxuXG4gICAgICBtb2R1bGVzID0gY29tcGlsYXRpb24uY2h1bmtzLnJlZHVjZSgoYSwgYikgPT4gYS5jb25jYXQoYi5tb2R1bGVzKSwgW10pXG5cbiAgICAgIGZvciAobGV0IG1vZHVsZSBvZiBtb2R1bGVzKSB7XG4gICAgICAgIGNvbnN0IGRlcHMgPSB0aGlzLmRlcGVuZGVuY2llc1ttb2R1bGUucmVzb3VyY2VdXG4gICAgICAgIGNvbnNvbGUubG9nKGRlcHMpXG4gICAgICAgIC8vaWYgKGRlcHMpIHN0YXRlbWVudHMgPSBzdGF0ZW1lbnRzLmNvbmNhdChkZXBzKTtcbiAgICAgIH1cblxuXG5cblxuICAgIH1cbiAgICBjb25zdCBidWlsZCA9IHRoaXMuYnVpbGRzW09iamVjdC5rZXlzKHRoaXMuYnVpbGRzKVswXV07XG4gICAgbGV0IG91dHB1dFBhdGggPSBwYXRoLmpvaW4oY29tcGlsZXIub3V0cHV0UGF0aCwgdGhpcy5vdXRwdXQpO1xuICAgIC8vIHdlYnBhY2stZGV2LXNlcnZlciBvdmVyd3JpdGVzIHRoZSBvdXRwdXRQYXRoIHRvIFwiL1wiLCBzbyB3ZSBuZWVkIHRvIHByZXBlbmQgY29udGVudEJhc2VcbiAgICBpZiAoY29tcGlsZXIub3V0cHV0UGF0aCA9PT0gJy8nICYmIGNvbXBpbGVyLm9wdGlvbnMuZGV2U2VydmVyKSB7XG4gICAgICBvdXRwdXRQYXRoID0gcGF0aC5qb2luKGNvbXBpbGVyLm9wdGlvbnMuZGV2U2VydmVyLmNvbnRlbnRCYXNlLCBvdXRwdXRQYXRoKTtcbiAgICB9XG4gICAgdmFyIGNtZEVycm9ycyA9IFtdXG5cbiAgICBsZXQgcHJvbWlzZSA9IHRoaXMuX2J1aWxkRXh0QnVuZGxlKGNvbXBpbGF0aW9uLCBjbWRFcnJvcnMsIG91dHB1dFBhdGgsIGJ1aWxkKVxuXG4gICAgYXdhaXQgcHJvbWlzZVxuIFxuICAgIGlmICh0aGlzLndhdGNoICYmIHRoaXMuY291bnQgPT0gMCAmJiBjbWRFcnJvcnMubGVuZ3RoID09IDApIHtcbiAgICAgIHZhciB1cmwgPSAnaHR0cDovL2xvY2FsaG9zdDonICsgdGhpcy5wb3J0XG4gICAgICByZWFkbGluZS5jdXJzb3JUbyhwcm9jZXNzLnN0ZG91dCwgMCk7Y29uc29sZS5sb2coYXBwICsgJ2V4dC1yZWFjdC1lbWl0IC0gb3BlbiBicm93c2VyIGF0ICcgKyB1cmwpXG4gICAgICB0aGlzLmNvdW50KytcbiAgICAgIGNvbnN0IG9wbiA9IHJlcXVpcmUoJ29wbicpXG4gICAgICBvcG4odXJsKVxuICAgIH1cbiAgICBpZiAoY2FsbGJhY2sgIT0gbnVsbCl7IGNhbGxiYWNrKCkgfVxuICB9XG5cbiAgLyoqXG4gICAvKipcbiAgICAqIEJ1aWxkcyBhIG1pbmltYWwgdmVyc2lvbiBvZiB0aGUgRXh0UmVhY3QgZnJhbWV3b3JrIGJhc2VkIG9uIHRoZSBjbGFzc2VzIHVzZWRcbiAgICAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lIFRoZSBuYW1lIG9mIHRoZSBidWlsZFxuICAgICogQHBhcmFtIHtNb2R1bGVbXX0gbW9kdWxlcyB3ZWJwYWNrIG1vZHVsZXNcbiAgICAqIEBwYXJhbSB7U3RyaW5nfSBvdXRwdXQgVGhlIHBhdGggdG8gd2hlcmUgdGhlIGZyYW1ld29yayBidWlsZCBzaG91bGQgYmUgd3JpdHRlblxuICAgICogQHBhcmFtIHtTdHJpbmd9IFt0b29sa2l0PSdtb2Rlcm4nXSBcIm1vZGVyblwiIG9yIFwiY2xhc3NpY1wiXG4gICAgKiBAcGFyYW0ge1N0cmluZ30gb3V0cHV0IFRoZSBwYXRoIHRvIHRoZSBkaXJlY3RvcnkgdG8gY3JlYXRlIHdoaWNoIHdpbGwgY29udGFpbiB0aGUganMgYW5kIGNzcyBidW5kbGVzXG4gICAgKiBAcGFyYW0ge1N0cmluZ30gdGhlbWUgVGhlIG5hbWUgb2YgdGhlIEV4dFJlYWN0IHRoZW1lIHBhY2thZ2UgdG8gdXNlLCBmb3IgZXhhbXBsZSBcInRoZW1lLW1hdGVyaWFsXCJcbiAgICAqIEBwYXJhbSB7U3RyaW5nW119IHBhY2thZ2VzIEFuIGFycmF5IG9mIEV4dFJlYWN0IHBhY2thZ2VzIHRvIGluY2x1ZGVcbiAgICAqIEBwYXJhbSB7U3RyaW5nW119IHBhY2thZ2VEaXJzIERpcmVjdG9yaWVzIGNvbnRhaW5pbmcgcGFja2FnZXNcbiAgICAqIEBwYXJhbSB7U3RyaW5nW119IG92ZXJyaWRlcyBBbiBhcnJheSBvZiBsb2NhdGlvbnMgZm9yIG92ZXJyaWRlc1xuICAgICogQHBhcmFtIHtTdHJpbmd9IHNkayBUaGUgZnVsbCBwYXRoIHRvIHRoZSBFeHRSZWFjdCBTREtcbiAgICAqIEBwYXJhbSB7T2JqZWN0fSBzYXNzIFNhc3MgY29uZmlndXJhdGlvbiBwcm9wZXJ0aWVzLlxuICAgICogQHBhcmFtIHtPYmplY3R9IHJlc291cmNlcyBFeHRyYSByZXNvdXJjZXMgdG8gYmUgY29waWVkIGludG8gdGhlIHJlc291cmNlIGZvbGRlciBhcyBzcGVjaWZpZWQgaW4gdGhlIFwicmVzb3VyY2VzXCIgcHJvcGVydHkgb2YgdGhlIFwib3V0cHV0XCIgb2JqZWN0LiBGb2xkZXJzIHNwZWNpZmllZCBpbiB0aGlzIGxpc3Qgd2lsbCBiZSBkZWVwbHkgY29waWVkLlxuICAgICogQHByaXZhdGVcbiAgICAqL1xuICBfYnVpbGRFeHRCdW5kbGUoY29tcGlsYXRpb24sIGNtZEVycm9ycywgb3V0cHV0LCB7IHRvb2xraXQ9J21vZGVybicsIHRoZW1lLCBwYWNrYWdlcz1bXSwgcGFja2FnZURpcnM9W10sIHNkaywgb3ZlcnJpZGVzLCBzYXNzLCByZXNvdXJjZXMgfSkge1xuICAgIGxldCBzZW5jaGEgPSB0aGlzLl9nZXRTZW5jaENtZFBhdGgoKVxuICAgIHRoZW1lID0gdGhlbWUgfHwgKHRvb2xraXQgPT09ICdjbGFzc2ljJyA/ICd0aGVtZS10cml0b24nIDogJ3RoZW1lLW1hdGVyaWFsJylcblxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBjb25zdCBvbkJ1aWxkRG9uZSA9ICgpID0+IHtcbiAgICAgICAgaWYgKGNtZEVycm9ycy5sZW5ndGgpIHtcbiAgICAgICAgICByZWplY3QobmV3IEVycm9yKGNtZEVycm9ycy5qb2luKFwiXCIpKSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXNvbHZlKClcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBjb25zdCB1c2VyUGFja2FnZXMgPSBwYXRoLmpvaW4oJy4nLCAnZXh0LXJlYWN0JywgJ3BhY2thZ2VzJylcbiAgICAgIGlmIChmcy5leGlzdHNTeW5jKHVzZXJQYWNrYWdlcykpIHtcbiAgICAgICAgcmVhZGxpbmUuY3Vyc29yVG8ocHJvY2Vzcy5zdGRvdXQsIDApO2NvbnNvbGUubG9nKGFwcCArICdBZGRpbmcgUGFja2FnZSBGb2xkZXI6ICcgKyB1c2VyUGFja2FnZXMpXG4gICAgICAgIHBhY2thZ2VEaXJzLnB1c2godXNlclBhY2thZ2VzKVxuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5maXJzdFRpbWUpIHtcbiAgICAgICAgcmltcmFmKG91dHB1dClcbiAgICAgICAgbWtkaXJwKG91dHB1dClcbiAgICAgICAgZnMud3JpdGVGaWxlU3luYyhwYXRoLmpvaW4ob3V0cHV0LCAnYnVpbGQueG1sJyksIGJ1aWxkWE1MKHsgY29tcHJlc3M6IHRoaXMucHJvZHVjdGlvbiB9KSwgJ3V0ZjgnKVxuICAgICAgICBmcy53cml0ZUZpbGVTeW5jKHBhdGguam9pbihvdXRwdXQsICdqc2RvbS1lbnZpcm9ubWVudC5qcycpLCBjcmVhdGVKU0RPTUVudmlyb25tZW50KCksICd1dGY4JylcbiAgICAgICAgZnMud3JpdGVGaWxlU3luYyhwYXRoLmpvaW4ob3V0cHV0LCAnYXBwLmpzb24nKSwgY3JlYXRlQXBwSnNvbih7IHRoZW1lLCBwYWNrYWdlcywgdG9vbGtpdCwgb3ZlcnJpZGVzLCBwYWNrYWdlRGlycywgc2FzcywgcmVzb3VyY2VzIH0pLCAndXRmOCcpXG4gICAgICAgIGZzLndyaXRlRmlsZVN5bmMocGF0aC5qb2luKG91dHB1dCwgJ3dvcmtzcGFjZS5qc29uJyksIGNyZWF0ZVdvcmtzcGFjZUpzb24oc2RrLCBwYWNrYWdlRGlycywgb3V0cHV0KSwgJ3V0ZjgnKVxuICAgICAgfVxuICAgICAgdGhpcy5maXJzdFRpbWUgPSBmYWxzZVxuXG4gICAgICBsZXQganNcbiAgICAgIGpzID0gJ0V4dC5yZXF1aXJlKFwiRXh0LipcIiknXG5cbiAgICAgIC8vIGlmICh0aGlzLnRyZWVTaGFraW5nKSB7XG4gICAgICAvLyAgIC8vbGV0IHN0YXRlbWVudHMgPSBbJ0V4dC5yZXF1aXJlKFtcIkV4dC5hcHAuQXBwbGljYXRpb25cIiwgXCJFeHQuQ29tcG9uZW50XCIsIFwiRXh0LldpZGdldFwiLCBcIkV4dC5sYXlvdXQuRml0XCIsIFwiRXh0LnJlYWN0LlRyYW5zaXRpb25cIiwgXCJFeHQucmVhY3QuUmVuZGVyZXJDZWxsXCJdKSddOyAvLyBmb3Igc29tZSByZWFzb24gY29tbWFuZCBkb2Vzbid0IGxvYWQgY29tcG9uZW50IHdoZW4gb25seSBwYW5lbCBpcyByZXF1aXJlZFxuICAgICAgLy8gICBsZXQgc3RhdGVtZW50cyA9IFsnRXh0LnJlcXVpcmUoW1wiRXh0LmFwcC5BcHBsaWNhdGlvblwiLCBcIkV4dC5Db21wb25lbnRcIiwgXCJFeHQuV2lkZ2V0XCIsIFwiRXh0LmxheW91dC5GaXRcIiwgXCJFeHQucmVhY3QuVHJhbnNpdGlvblwiXSknXTsgLy8gZm9yIHNvbWUgcmVhc29uIGNvbW1hbmQgZG9lc24ndCBsb2FkIGNvbXBvbmVudCB3aGVuIG9ubHkgcGFuZWwgaXMgcmVxdWlyZWRcbiAgICAgIC8vICAgLy8gaWYgKHBhY2thZ2VzLmluZGV4T2YoJ3JlYWN0bycpICE9PSAtMSkge1xuICAgICAgLy8gICAvLyAgIHN0YXRlbWVudHMucHVzaCgnRXh0LnJlcXVpcmUoXCJFeHQucmVhY3QuUmVuZGVyZXJDZWxsXCIpJyk7XG4gICAgICAvLyAgIC8vIH1cbiAgICAgIC8vICAgLy9tamdcbiAgICAgIC8vICAgZm9yIChsZXQgbW9kdWxlIG9mIG1vZHVsZXMpIHtcbiAgICAgIC8vICAgICBjb25zdCBkZXBzID0gdGhpcy5kZXBlbmRlbmNpZXNbbW9kdWxlLnJlc291cmNlXTtcbiAgICAgIC8vICAgICBpZiAoZGVwcykgc3RhdGVtZW50cyA9IHN0YXRlbWVudHMuY29uY2F0KGRlcHMpO1xuICAgICAgLy8gICB9XG4gICAgICAvLyAgIGpzID0gc3RhdGVtZW50cy5qb2luKCc7XFxuJyk7XG4gICAgICAvLyB9IGVsc2Uge1xuICAgICAgLy8gICBqcyA9ICdFeHQucmVxdWlyZShcIkV4dC4qXCIpJztcbiAgICAgIC8vIH1cblxuXG5cbiAgICAgIC8vIGlmIChmcy5leGlzdHNTeW5jKHBhdGguam9pbihzZGssICdleHQnKSkpIHtcbiAgICAgIC8vICAgLy8gbG9jYWwgY2hlY2tvdXQgb2YgdGhlIFNESyByZXBvXG4gICAgICAvLyAgIHBhY2thZ2VEaXJzLnB1c2gocGF0aC5qb2luKCdleHQnLCAncGFja2FnZXMnKSk7XG4gICAgICAvLyAgIHNkayA9IHBhdGguam9pbihzZGssICdleHQnKTtcbiAgICAgIC8vIH1cblxuXG5cbiAgICAgIHZhciBwYXJtcyA9IFtdXG4gICAgICBpZiAodGhpcy53YXRjaCkgeyBwYXJtcyA9IFsnYXBwJywgJ3dhdGNoJ10gfVxuICAgICAgZWxzZSB7IHBhcm1zID0gWydhcHAnLCAnYnVpbGQnXSB9XG5cbiAgICAgIGlmICh0aGlzLm1hbmlmZXN0ID09PSBudWxsIHx8IGpzICE9PSB0aGlzLm1hbmlmZXN0KSB7XG4gICAgICAgIHRoaXMubWFuaWZlc3QgPSBqc1xuICAgICAgICAvL3JlYWRsaW5lLmN1cnNvclRvKHByb2Nlc3Muc3Rkb3V0LCAwKTtjb25zb2xlLmxvZyhhcHAgKyAndHJlZSBzaGFraW5nOiAnICsgdGhpcy50cmVlU2hha2luZylcbiAgICAgICAgY29uc3QgbWFuaWZlc3QgPSBwYXRoLmpvaW4ob3V0cHV0LCAnbWFuaWZlc3QuanMnKVxuICAgICAgICBmcy53cml0ZUZpbGVTeW5jKG1hbmlmZXN0LCBqcywgJ3V0ZjgnKVxuICAgICAgICByZWFkbGluZS5jdXJzb3JUbyhwcm9jZXNzLnN0ZG91dCwgMCk7Y29uc29sZS5sb2coYXBwICsgYGJ1aWxkaW5nIEV4dFJlYWN0IGJ1bmRsZSBhdDogJHtvdXRwdXR9YClcblxuICAgICAgICBpZiAodGhpcy53YXRjaCAmJiAhd2F0Y2hpbmcgfHwgIXRoaXMud2F0Y2gpIHtcbiAgICAgICAgICB2YXIgb3B0aW9ucyA9IHsgY3dkOiBvdXRwdXQsIHNpbGVudDogdHJ1ZSwgc3RkaW86ICdwaXBlJywgZW5jb2Rpbmc6ICd1dGYtOCd9XG4gICAgICAgICAgdmFyIHZlcmJvc2UgPSAnbm8nXG4gICAgICAgICAgaWYgKHByb2Nlc3MuZW52LkVYVFJFQUNUX1ZFUkJPU0UgID09ICd5ZXMnKSB7XG4gICAgICAgICAgICB2ZXJib3NlID0gJ3llcydcbiAgICAgICAgICB9XG4gICAgICAgICAgZXhlY3V0ZUFzeW5jKHNlbmNoYSwgcGFybXMsIG9wdGlvbnMsIGNvbXBpbGF0aW9uLCBjbWRFcnJvcnMsIHZlcmJvc2UpLnRoZW4gKFxuICAgICAgICAgICAgZnVuY3Rpb24oKSB7IG9uQnVpbGREb25lKCkgfSwgXG4gICAgICAgICAgICBmdW5jdGlvbihyZWFzb24pIHsgcmVzb2x2ZShyZWFzb24pIH1cbiAgICAgICAgICApXG4gICAgICAgIH1cblxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHJlYWRsaW5lLmN1cnNvclRvKHByb2Nlc3Muc3Rkb3V0LCAwKTtjb25zb2xlLmxvZyhhcHAgKyAnRXh0IHJlYnVpbGQgTk9UIG5lZWRlZCcpXG4gICAgICAgIG9uQnVpbGREb25lKClcbiAgICAgIH1cblxuICAgICAgLy8gdmFyIHBhcm1zXG4gICAgICAvLyBpZiAodGhpcy53YXRjaCkge1xuICAgICAgLy8gICBpZiAoIXdhdGNoaW5nKSB7XG4gICAgICAvLyAgICAgcGFybXMgPSBbJ2FwcCcsICd3YXRjaCddXG4gICAgICAvLyAgIH1cbiAgICAgIC8vICAgLy8gaWYgKCFjbWRSZWJ1aWxkTmVlZGVkKSB7XG4gICAgICAvLyAgIC8vICAgcmVhZGxpbmUuY3Vyc29yVG8ocHJvY2Vzcy5zdGRvdXQsIDApO2NvbnNvbGUubG9nKGFwcCArICdFeHQgcmVidWlsZCBOT1QgbmVlZGVkJylcbiAgICAgIC8vICAgLy8gICBvbkJ1aWxkRG9uZSgpXG4gICAgICAvLyAgIC8vIH1cbiAgICAgIC8vIH1cbiAgICAgIC8vIGVsc2Uge1xuICAgICAgLy8gICBwYXJtcyA9IFsnYXBwJywgJ2J1aWxkJ11cbiAgICAgIC8vIH1cbiAgICAgIC8vIGlmIChjbWRSZWJ1aWxkTmVlZGVkKSB7XG4gICAgICAvLyAgIHZhciBvcHRpb25zID0geyBjd2Q6IG91dHB1dCwgc2lsZW50OiB0cnVlLCBzdGRpbzogJ3BpcGUnLCBlbmNvZGluZzogJ3V0Zi04J31cbiAgICAgIC8vICAgZXhlY3V0ZUFzeW5jKHNlbmNoYSwgcGFybXMsIG9wdGlvbnMsIGNvbXBpbGF0aW9uLCBjbWRFcnJvcnMpLnRoZW4oZnVuY3Rpb24oKSB7XG4gICAgICAvLyAgICAgb25CdWlsZERvbmUoKVxuICAgICAgLy8gICB9LCBmdW5jdGlvbihyZWFzb24pe1xuICAgICAgLy8gICAgIHJlc29sdmUocmVhc29uKVxuICAgICAgLy8gICB9KVxuICAgICAgLy8gfVxuXG5cbiAgICB9KVxuICB9XG5cbiAgLyoqXG4gICAqIERlZmF1bHQgY29uZmlnIG9wdGlvbnNcbiAgICogQHByb3RlY3RlZFxuICAgKiBAcmV0dXJuIHtPYmplY3R9XG4gICAqL1xuICBnZXREZWZhdWx0T3B0aW9ucygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcG9ydDogODAxNixcbiAgICAgIGJ1aWxkczoge30sXG4gICAgICBkZWJ1ZzogZmFsc2UsXG4gICAgICB3YXRjaDogZmFsc2UsXG4gICAgICB0ZXN0OiAvXFwuKGp8dClzeD8kLyxcblxuICAgICAgLyogYmVnaW4gc2luZ2xlIGJ1aWxkIG9ubHkgKi9cbiAgICAgIG91dHB1dDogJ2V4dC1yZWFjdCcsXG4gICAgICB0b29sa2l0OiAnbW9kZXJuJyxcbiAgICAgIHBhY2thZ2VzOiBudWxsLFxuICAgICAgcGFja2FnZURpcnM6IFtdLFxuICAgICAgb3ZlcnJpZGVzOiBbXSxcbiAgICAgIGFzeW5jaHJvbm91czogZmFsc2UsXG4gICAgICBwcm9kdWN0aW9uOiBmYWxzZSxcbiAgICAgIG1hbmlmZXN0RXh0cmFjdG9yOiBleHRyYWN0RnJvbUpTWCxcbiAgICAgIHRyZWVTaGFraW5nOiBmYWxzZVxuICAgICAgLyogZW5kIHNpbmdsZSBidWlsZCBvbmx5ICovXG4gICAgfVxuICB9XG5cbiAgc3VjY2VlZE1vZHVsZShjb21waWxhdGlvbiwgbW9kdWxlKSB7XG4gICAgdGhpcy5jdXJyZW50RmlsZSA9IG1vZHVsZS5yZXNvdXJjZTtcbiAgICBpZiAobW9kdWxlLnJlc291cmNlICYmIG1vZHVsZS5yZXNvdXJjZS5tYXRjaCh0aGlzLnRlc3QpICYmICFtb2R1bGUucmVzb3VyY2UubWF0Y2goL25vZGVfbW9kdWxlcy8pICYmICFtb2R1bGUucmVzb3VyY2UubWF0Y2goYC9leHQtcmVhY3Qke3JlYWN0VmVyc2lvbn0vYCkpIHtcbiAgICAgIGNvbnN0IGRvUGFyc2UgPSAoKSA9PiB7XG4gICAgICAgIHRoaXMuZGVwZW5kZW5jaWVzW3RoaXMuY3VycmVudEZpbGVdID0gW1xuICAgICAgICAgIC4uLih0aGlzLmRlcGVuZGVuY2llc1t0aGlzLmN1cnJlbnRGaWxlXSB8fCBbXSksXG4gICAgICAgICAgLi4udGhpcy5tYW5pZmVzdEV4dHJhY3Rvcihtb2R1bGUuX3NvdXJjZS5fdmFsdWUsIGNvbXBpbGF0aW9uLCBtb2R1bGUsIHJlYWN0VmVyc2lvbilcbiAgICAgICAgXVxuICAgICAgfVxuICAgICAgaWYgKHRoaXMuZGVidWcpIHtcbiAgICAgICAgZG9QYXJzZSgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdHJ5IHsgZG9QYXJzZSgpOyB9IGNhdGNoIChlKSBcbiAgICAgICAgeyBcbiAgICAgICAgICBjb25zb2xlLmVycm9yKCdcXG5lcnJvciBwYXJzaW5nICcgKyB0aGlzLmN1cnJlbnRGaWxlKTsgXG4gICAgICAgICAgY29uc29sZS5lcnJvcihlKTsgXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2tzIGVhY2ggYnVpbGQgY29uZmlnIGZvciBtaXNzaW5nL2ludmFsaWQgcHJvcGVydGllc1xuICAgKiBAcGFyYW0ge1N0cmluZ30gbmFtZSBUaGUgbmFtZSBvZiB0aGUgYnVpbGRcbiAgICogQHBhcmFtIHtTdHJpbmd9IGJ1aWxkIFRoZSBidWlsZCBjb25maWdcbiAgICogQHByaXZhdGVcbiAgICovXG4gIF92YWxpZGF0ZUJ1aWxkQ29uZmlnKG5hbWUsIGJ1aWxkKSB7XG4gICAgbGV0IHsgc2RrLCBwcm9kdWN0aW9uIH0gPSBidWlsZDtcblxuICAgIGlmIChwcm9kdWN0aW9uKSB7XG4gICAgICBidWlsZC50cmVlU2hha2luZyA9IGZhbHNlO1xuICAgIH1cblxuICAgIGlmIChzZGspIHtcbiAgICAgIC8vY29tcGlsYXRpb24uZXJyb3JzLnB1c2goIG5ldyBFcnJvcihjbWRFcnJvcnMuam9pbihcIlwiKSkgKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKGAke2NoYWxrLnJlZCgnU0RLIHBhcmFtZXRlciBubyBsb25nZXIgc3VwcG9ydGVkIHdpdGggZXh0LXJlYWN0LXdlYnBhY2stcGx1Z2luJyl9ICAtIHVzZSB0aGUgRXh0IEpTIG5wbSBwYWNrYWdlcyBpbnN0ZWFkYCk7XG5cbiAgICAgIC8vIGlmICghZnMuZXhpc3RzU3luYyhzZGspKSB7XG4gICAgICAvLyAgICAgdGhyb3cgbmV3IEVycm9yKGBObyBTREsgZm91bmQgYXQgJHtwYXRoLnJlc29sdmUoc2RrKX0uICBEaWQgeW91IGZvciBnZXQgdG8gbGluay9jb3B5IHlvdXIgRXh0IEpTIFNESyB0byB0aGF0IGxvY2F0aW9uP2ApO1xuICAgICAgLy8gfSBlbHNlIHtcbiAgICAgIC8vICAgICAvL21qZyB0aGlzIG5lZWRlZD8gdGhpcy5fYWRkRXh0UmVhY3RQYWNrYWdlKGJ1aWxkKVxuICAgICAgLy8gfVxuICAgIH0gZWxzZSB7XG4gICAgICB0cnkge1xuICAgICAgICBidWlsZC5zZGsgPSBwYXRoLmRpcm5hbWUocmVzb2x2ZSgnQHNlbmNoYS9leHQnLCB7IGJhc2VkaXI6IHByb2Nlc3MuY3dkKCkgfSkpXG4gICAgICAgIGJ1aWxkLnBhY2thZ2VEaXJzID0gWy4uLihidWlsZC5wYWNrYWdlRGlycyB8fCBbXSksIHBhdGguZGlybmFtZShidWlsZC5zZGspXTtcbiAgICAgICAgYnVpbGQucGFja2FnZXMgPSBidWlsZC5wYWNrYWdlcyB8fCB0aGlzLl9maW5kUGFja2FnZXMoYnVpbGQuc2RrKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy90aHJvdyBuZXcgRXJyb3IoYEBzZW5jaGEvZXh0LW1vZGVybiBub3QgZm91bmQuICBZb3UgY2FuIGluc3RhbGwgaXQgd2l0aCBcIm5wbSBpbnN0YWxsIC0tc2F2ZSBAc2VuY2hhL2V4dC1tb2Rlcm5cIiBvciwgaWYgeW91IGhhdmUgYSBsb2NhbCBjb3B5IG9mIHRoZSBTREssIHNwZWNpZnkgdGhlIHBhdGggdG8gaXQgdXNpbmcgdGhlIFwic2RrXCIgb3B0aW9uIGluIGJ1aWxkIFwiJHtuYW1lfS5cImApO1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEBzZW5jaGEvZXh0IG5vdCBmb3VuZC4gIFlvdSBjYW4gaW5zdGFsbCBpdCB3aXRoIFwibnBtIGluc3RhbGwgLS1zYXZlIEBzZW5jaGEvZXh0YCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy8gLyoqXG4gIC8vICAqIEFkZHMgdGhlIEV4dFJlYWN0IHBhY2thZ2UgaWYgcHJlc2VudCBhbmQgdGhlIHRvb2xraXQgaXMgbW9kZXJuXG4gIC8vICAqIEBwYXJhbSB7T2JqZWN0fSBidWlsZCBcbiAgLy8gICovXG4gIC8vIF9hZGRFeHRSZWFjdFBhY2thZ2UoYnVpbGQpIHtcbiAgLy8gICBpZiAoYnVpbGQudG9vbGtpdCA9PT0gJ2NsYXNzaWMnKSByZXR1cm47XG4gIC8vICAgaWYgKGZzLmV4aXN0c1N5bmMocGF0aC5qb2luKGJ1aWxkLnNkaywgJ2V4dCcsICdtb2Rlcm4nLCAncmVhY3QnKSkgfHwgIC8vIHJlcG9cbiAgLy8gICAgIGZzLmV4aXN0c1N5bmMocGF0aC5qb2luKGJ1aWxkLnNkaywgJ21vZGVybicsICdyZWFjdCcpKSkgeyAvLyBwcm9kdWN0aW9uIGJ1aWxkXG4gIC8vICAgICBpZiAoIWJ1aWxkLnBhY2thZ2VzKSB7XG4gIC8vICAgICAgIGJ1aWxkLnBhY2thZ2VzID0gW107XG4gIC8vICAgICB9XG4gIC8vICAgICBidWlsZC5wYWNrYWdlcy5wdXNoKCdyZWFjdCcpO1xuICAvLyAgIH1cbiAgLy8gfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gdGhlIG5hbWVzIG9mIGFsbCBFeHRSZWFjdCBwYWNrYWdlcyBpbiB0aGUgc2FtZSBwYXJlbnQgZGlyZWN0b3J5IGFzIGV4dC1yZWFjdCAodHlwaWNhbGx5IG5vZGVfbW9kdWxlcy9Ac2VuY2hhKVxuICAgKiBAcHJpdmF0ZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gc2RrIFBhdGggdG8gZXh0LXJlYWN0XG4gICAqIEByZXR1cm4ge1N0cmluZ1tdfVxuICAgKi9cbiAgX2ZpbmRQYWNrYWdlcyhzZGspIHtcbiAgICBjb25zdCBtb2R1bGVzRGlyID0gcGF0aC5qb2luKHNkaywgJy4uJyk7XG4gICAgcmV0dXJuIGZzLnJlYWRkaXJTeW5jKG1vZHVsZXNEaXIpXG4gICAgICAvLyBGaWx0ZXIgb3V0IGRpcmVjdG9yaWVzIHdpdGhvdXQgJ3BhY2thZ2UuanNvbidcbiAgICAgIC5maWx0ZXIoZGlyID0+IGZzLmV4aXN0c1N5bmMocGF0aC5qb2luKG1vZHVsZXNEaXIsIGRpciwgJ3BhY2thZ2UuanNvbicpKSlcbiAgICAgIC8vIEdlbmVyYXRlIGFycmF5IG9mIHBhY2thZ2UgbmFtZXNcbiAgICAgIC5tYXAoZGlyID0+IHtcbiAgICAgICAgICBjb25zdCBwYWNrYWdlSW5mbyA9IEpTT04ucGFyc2UoZnMucmVhZEZpbGVTeW5jKHBhdGguam9pbihtb2R1bGVzRGlyLCBkaXIsICdwYWNrYWdlLmpzb24nKSkpO1xuICAgICAgICAgIC8vIERvbid0IGluY2x1ZGUgdGhlbWUgdHlwZSBwYWNrYWdlcy5cbiAgICAgICAgICBpZihwYWNrYWdlSW5mby5zZW5jaGEgJiYgcGFja2FnZUluZm8uc2VuY2hhLnR5cGUgIT09ICd0aGVtZScpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHBhY2thZ2VJbmZvLnNlbmNoYS5uYW1lO1xuICAgICAgICAgIH1cbiAgICAgIH0pXG4gICAgICAvLyBSZW1vdmUgYW55IHVuZGVmaW5lZHMgZnJvbSBtYXBcbiAgICAgIC5maWx0ZXIobmFtZSA9PiBuYW1lKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBwYXRoIHRvIHRoZSBzZW5jaGEgY21kIGV4ZWN1dGFibGVcbiAgICogQHByaXZhdGVcbiAgICogQHJldHVybiB7U3RyaW5nfVxuICAgKi9cbiAgX2dldFNlbmNoQ21kUGF0aCgpIHtcbiAgICB0cnkgeyByZXR1cm4gcmVxdWlyZSgnQHNlbmNoYS9jbWQnKSB9IFxuICAgIGNhdGNoIChlKSB7IHJldHVybiAnc2VuY2hhJyB9XG4gIH1cbn1cblxuXG5cblxuICAgICAgLy8gaWYgKHRoaXMud2F0Y2gpIHtcbiAgICAgIC8vICAgaWYgKCF3YXRjaGluZykge1xuICAgICAgLy8gICAgIHdhdGNoaW5nID0gZ2F0aGVyRXJyb3JzKGZvcmsoc2VuY2hhLCBbJ2FudCcsICd3YXRjaCddLCB7IGN3ZDogb3V0cHV0LCBzaWxlbnQ6IHRydWUgfSkpO1xuICAgICAgLy8gICAgIHdhdGNoaW5nLnN0ZGVyci5waXBlKHByb2Nlc3Muc3RkZXJyKTtcbiAgICAgIC8vICAgICB3YXRjaGluZy5zdGRvdXQucGlwZShwcm9jZXNzLnN0ZG91dCk7XG4gICAgICAvLyAgICAgd2F0Y2hpbmcuc3Rkb3V0Lm9uKCdkYXRhJywgZGF0YSA9PiB7XG4gICAgICAvLyAgICAgICBpZiAoZGF0YSAmJiBkYXRhLnRvU3RyaW5nKCkubWF0Y2goL1dhaXRpbmcgZm9yIGNoYW5nZXNcXC5cXC5cXC4vKSkge1xuICAgICAgLy8gICAgICAgICBvbkJ1aWxkRG9uZSgpXG4gICAgICAvLyAgICAgICB9XG4gICAgICAvLyAgICAgfSlcbiAgICAgIC8vICAgICB3YXRjaGluZy5vbignZXhpdCcsIG9uQnVpbGREb25lKVxuICAgICAgLy8gICB9XG4gICAgICAvLyAgIGlmICghY21kUmVidWlsZE5lZWRlZCkge1xuICAgICAgLy8gICAgIHJlYWRsaW5lLmN1cnNvclRvKHByb2Nlc3Muc3Rkb3V0LCAwKTtjb25zb2xlLmxvZyhhcHAgKyAnRXh0IHJlYnVpbGQgTk9UIG5lZWRlZCcpXG4gICAgICAvLyAgICAgb25CdWlsZERvbmUoKVxuICAgICAgLy8gICB9XG4gICAgICAvLyAgIGVsc2Uge1xuICAgICAgLy8gICAgIC8vcmVhZGxpbmUuY3Vyc29yVG8ocHJvY2Vzcy5zdGRvdXQsIDApO2NvbnNvbGUubG9nKGFwcCArICdFeHQgcmVidWlsZCBJUyBuZWVkZWQnKVxuICAgICAgLy8gICB9XG4gICAgICAvLyB9IFxuICAgICAgLy8gZWxzZSB7XG4gICAgICAvLyAgIGNvbnN0IGJ1aWxkID0gZ2F0aGVyRXJyb3JzKGZvcmsoc2VuY2hhLCBbJ2FudCcsICdidWlsZCddLCB7IHN0ZGlvOiAnaW5oZXJpdCcsIGVuY29kaW5nOiAndXRmLTgnLCBjd2Q6IG91dHB1dCwgc2lsZW50OiBmYWxzZSB9KSk7XG4gICAgICAvLyAgIHJlYWRsaW5lLmN1cnNvclRvKHByb2Nlc3Muc3Rkb3V0LCAwKTtjb25zb2xlLmxvZyhhcHAgKyAnc2VuY2hhIGFudCBidWlsZCcpXG4gICAgICAvLyAgIGlmKGJ1aWxkLnN0ZG91dCkgeyBidWlsZC5zdGRvdXQucGlwZShwcm9jZXNzLnN0ZG91dCkgfVxuICAgICAgLy8gICBpZihidWlsZC5zdGRlcnIpIHsgYnVpbGQuc3RkZXJyLnBpcGUocHJvY2Vzcy5zdGRlcnIpIH1cbiAgICAgIC8vICAgYnVpbGQub24oJ2V4aXQnLCBvbkJ1aWxkRG9uZSk7XG4gICAgICAvLyB9XG5cblxuXG4vLyBjb25zdCBnYXRoZXJFcnJvcnMyID0gKGNtZCkgPT4ge1xuLy8gICBpZiAoY21kLnN0ZG91dCkge1xuLy8gICAgIGNtZC5zdGRvdXQub24oJ2RhdGEnLCBkYXRhID0+IHtcbi8vICAgICAgIGNvbnN0IG1lc3NhZ2UgPSBkYXRhLnRvU3RyaW5nKCk7XG4vLyAgICAgICBpZiAobWVzc2FnZS5tYXRjaCgvXlxcW0VSUlxcXS8pKSB7XG4vLyAgICAgICAgIGNtZEVycm9ycy5wdXNoKG1lc3NhZ2UucmVwbGFjZSgvXlxcW0VSUlxcXSAvZ2ksICcnKSk7XG4vLyAgICAgICB9XG4vLyAgICAgfSlcbi8vICAgfVxuLy8gICByZXR1cm4gY21kO1xuLy8gfVxuXG4vLyBmdW5jdGlvbiBnYXRoZXJFcnJvcnMgKGNtZCkge1xuLy8gICBpZiAoY21kLnN0ZG91dCkge1xuLy8gICAgIGNtZC5zdGRvdXQub24oJ2RhdGEnLCBkYXRhID0+IHtcbi8vICAgICAgIGNvbnN0IG1lc3NhZ2UgPSBkYXRhLnRvU3RyaW5nKCk7XG4vLyAgICAgICBpZiAobWVzc2FnZS5tYXRjaCgvXlxcW0VSUlxcXS8pKSB7XG4vLyAgICAgICAgIGNtZEVycm9ycy5wdXNoKG1lc3NhZ2UucmVwbGFjZSgvXlxcW0VSUlxcXSAvZ2ksICcnKSk7XG4vLyAgICAgICB9XG4vLyAgICAgfSlcbi8vICAgfVxuLy8gICByZXR1cm4gY21kXG4vLyB9XG5cblxuXG5cblxuXG4vLyBmcm9tIHRoaXMuZW1pdFxuICAgIC8vIHRoZSBmb2xsb3dpbmcgaXMgbmVlZGVkIGZvciBodG1sLXdlYnBhY2stcGx1Z2luIHRvIGluY2x1ZGUgPHNjcmlwdD4gYW5kIDxsaW5rPiB0YWdzIGZvciBFeHRSZWFjdFxuICAgIC8vIGNvbnNvbGUubG9nKCdjb21waWxhdGlvbicpXG4gICAgLy8gY29uc29sZS5sb2coJyoqKioqKioqY29tcGlsYXRpb24uY2h1bmtzWzBdJylcbiAgICAvLyBjb25zb2xlLmxvZyhjb21waWxhdGlvbi5jaHVua3NbMF0uaWQpXG4gICAgLy8gY29uc29sZS5sb2cocGF0aC5qb2luKHRoaXMub3V0cHV0LCAnZXh0LmpzJykpXG4gICAgLy8gY29uc3QganNDaHVuayA9IGNvbXBpbGF0aW9uLmFkZENodW5rKGAke3RoaXMub3V0cHV0fS1qc2ApO1xuICAgIC8vIGpzQ2h1bmsuaGFzUnVudGltZSA9IGpzQ2h1bmsuaXNJbml0aWFsID0gKCkgPT4gdHJ1ZTtcbiAgICAvLyBqc0NodW5rLmZpbGVzLnB1c2gocGF0aC5qb2luKHRoaXMub3V0cHV0LCAnZXh0LmpzJykpO1xuICAgIC8vIGpzQ2h1bmsuZmlsZXMucHVzaChwYXRoLmpvaW4odGhpcy5vdXRwdXQsICdleHQuY3NzJykpO1xuICAgIC8vIGpzQ2h1bmsuaWQgPSAnYWFhYXAnOyAvLyB0aGlzIGZvcmNlcyBodG1sLXdlYnBhY2stcGx1Z2luIHRvIGluY2x1ZGUgZXh0LmpzIGZpcnN0XG4gICAgLy8gY29uc29sZS5sb2coJyoqKioqKioqY29tcGlsYXRpb24uY2h1bmtzWzFdJylcbiAgICAvLyBjb25zb2xlLmxvZyhjb21waWxhdGlvbi5jaHVua3NbMV0uaWQpXG5cbiAgICAvL2lmICh0aGlzLmFzeW5jaHJvbm91cykgY2FsbGJhY2soKTtcbi8vICAgIGNvbnNvbGUubG9nKGNhbGxiYWNrKVxuXG4vLyBpZiAoaXNXZWJwYWNrNCkge1xuLy8gICBjb25zb2xlLmxvZyhwYXRoLmpvaW4odGhpcy5vdXRwdXQsICdleHQuanMnKSlcbi8vICAgY29uc3Qgc3RhdHMgPSBmcy5zdGF0U3luYyhwYXRoLmpvaW4ob3V0cHV0UGF0aCwgJ2V4dC5qcycpKVxuLy8gICBjb25zdCBmaWxlU2l6ZUluQnl0ZXMgPSBzdGF0cy5zaXplXG4vLyAgIGNvbXBpbGF0aW9uLmFzc2V0c1snZXh0LmpzJ10gPSB7XG4vLyAgICAgc291cmNlOiBmdW5jdGlvbigpIHtyZXR1cm4gZnMucmVhZEZpbGVTeW5jKHBhdGguam9pbihvdXRwdXRQYXRoLCAnZXh0LmpzJykpfSxcbi8vICAgICBzaXplOiBmdW5jdGlvbigpIHtyZXR1cm4gZmlsZVNpemVJbkJ5dGVzfVxuLy8gICB9XG4vLyAgIGNvbnNvbGUubG9nKGNvbXBpbGF0aW9uLmVudHJ5cG9pbnRzKVxuXG4vLyAgIHZhciBmaWxlbGlzdCA9ICdJbiB0aGlzIGJ1aWxkOlxcblxcbic7XG5cbi8vICAgLy8gTG9vcCB0aHJvdWdoIGFsbCBjb21waWxlZCBhc3NldHMsXG4vLyAgIC8vIGFkZGluZyBhIG5ldyBsaW5lIGl0ZW0gZm9yIGVhY2ggZmlsZW5hbWUuXG4vLyAgIGZvciAodmFyIGZpbGVuYW1lIGluIGNvbXBpbGF0aW9uLmFzc2V0cykge1xuLy8gICAgIGZpbGVsaXN0ICs9ICgnLSAnKyBmaWxlbmFtZSArJ1xcbicpO1xuLy8gICB9XG5cbi8vICAgLy8gSW5zZXJ0IHRoaXMgbGlzdCBpbnRvIHRoZSB3ZWJwYWNrIGJ1aWxkIGFzIGEgbmV3IGZpbGUgYXNzZXQ6XG4vLyAgIGNvbXBpbGF0aW9uLmFzc2V0c1snZmlsZWxpc3QubWQnXSA9IHtcbi8vICAgICBzb3VyY2UoKSB7XG4vLyAgICAgICByZXR1cm4gZmlsZWxpc3Q7XG4vLyAgICAgfSxcbi8vICAgICBzaXplKCkge1xuLy8gICAgICAgcmV0dXJuIGZpbGVsaXN0Lmxlbmd0aDtcbi8vICAgICB9XG4vLyAgIH1cbi8vIH1cblxuXG4gICAgLy8gaWYgKGNvbXBpbGVyLmhvb2tzKSB7XG4gICAgLy8gICAgIC8vIGluICdleHRyZWFjdC1jb21waWxhdGlvbidcbiAgICAvLyAgICAgLy9odHRwczovL2dpdGh1Yi5jb20vamFrZXRyZW50L2h0bWwtd2VicGFjay10ZW1wbGF0ZVxuICAgIC8vICAgICAvL2h0dHBzOi8vZ2l0aHViLmNvbS9qYW50aW1vbi9odG1sLXdlYnBhY2stcGx1Z2luI1xuICAgIC8vICAgICAvLyB0aGUgZm9sbG93aW5nIGlzIG5lZWRlZCBmb3IgaHRtbC13ZWJwYWNrLXBsdWdpbiB0byBpbmNsdWRlIDxzY3JpcHQ+IGFuZCA8bGluaz4gdGFncyBmb3IgRXh0UmVhY3RcbiAgICAvLyAgICAgY29tcGlsZXIuaG9va3MuaHRtbFdlYnBhY2tQbHVnaW5CZWZvcmVIdG1sR2VuZXJhdGlvbi50YXBBc3luYyhcbiAgICAvLyAgICAgICAnZXh0cmVhY3QtaHRtbGdlbmVyYXRpb24nLFxuICAgIC8vICAgICAgIChkYXRhLCBjYikgPT4ge1xuICAgIC8vICAgICAgICAgcmVhZGxpbmUuY3Vyc29yVG8ocHJvY2Vzcy5zdGRvdXQsIDApO2NvbnNvbGUubG9nKGFwcCArICdleHRyZWFjdC1odG1sZ2VuZXJhdGlvbicpXG4gICAgLy8gICAgICAgICBjb25zb2xlLmxvZygnZGF0YS5hc3NldHMuanMubGVuZ3RoJylcbiAgICAvLyAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEuYXNzZXRzLmpzLmxlbmd0aClcbiAgICAvLyAgICAgICAgIGRhdGEuYXNzZXRzLmpzLnVuc2hpZnQoJ2V4dC1yZWFjdC9leHQuanMnKVxuICAgIC8vICAgICAgICAgZGF0YS5hc3NldHMuY3NzLnVuc2hpZnQoJ2V4dC1yZWFjdC9leHQuY3NzJylcbiAgICAvLyAgICAgICAgIGNiKG51bGwsIGRhdGEpXG4gICAgLy8gICAgICAgfVxuICAgIC8vICAgICApXG4gICAgLy8gICB9XG5cbiJdfQ==