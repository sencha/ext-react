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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJyZWFjdFZlcnNpb24iLCJyZWFjdFZlcnNpb25GdWxsIiwid2F0Y2hpbmciLCJhcHAiLCJjaGFsayIsImdyZWVuIiwibW9kdWxlIiwiZXhwb3J0cyIsIkV4dFJlYWN0V2VicGFja1BsdWdpbiIsImNvbnN0cnVjdG9yIiwib3B0aW9ucyIsImZpcnN0VGltZSIsImNvdW50IiwicGtnIiwiZnMiLCJleGlzdHNTeW5jIiwiSlNPTiIsInBhcnNlIiwicmVhZEZpbGVTeW5jIiwiZGVwZW5kZW5jaWVzIiwicmVhY3QiLCJpczE2IiwiaW5jbHVkZXMiLCJleHRSZWFjdFJjIiwiZ2V0RGVmYXVsdE9wdGlvbnMiLCJidWlsZHMiLCJPYmplY3QiLCJrZXlzIiwibGVuZ3RoIiwiYnVpbGRPcHRpb25zIiwiZXh0IiwibmFtZSIsIl92YWxpZGF0ZUJ1aWxkQ29uZmlnIiwiYXNzaWduIiwiY3VycmVudEZpbGUiLCJtYW5pZmVzdCIsIndhdGNoUnVuIiwid2F0Y2giLCJhcHBseSIsImNvbXBpbGVyIiwid2VicGFja1ZlcnNpb24iLCJ1bmRlZmluZWQiLCJpc1dlYnBhY2s0IiwiaG9va3MiLCJyZWFkbGluZSIsImN1cnNvclRvIiwicHJvY2VzcyIsInN0ZG91dCIsImNvbnNvbGUiLCJsb2ciLCJtZSIsImFzeW5jaHJvbm91cyIsInRhcEFzeW5jIiwiY2IiLCJ0YXAiLCJwbHVnaW4iLCJhZGRUb01hbmlmZXN0IiwiY2FsbCIsImZpbGUiLCJzdGF0ZSIsInJlc291cmNlIiwiZSIsImVycm9yIiwiY29tcGlsYXRpb24iLCJkYXRhIiwic3VjY2VlZE1vZHVsZSIsIm5vcm1hbE1vZHVsZUZhY3RvcnkiLCJwYXJzZXIiLCJodG1sV2VicGFja1BsdWdpbkJlZm9yZUh0bWxHZW5lcmF0aW9uIiwib3V0cHV0T3B0aW9ucyIsInB1YmxpY1BhdGgiLCJhc3NldHMiLCJqcyIsInVuc2hpZnQiLCJjc3MiLCJwYXRoIiwiam9pbiIsImVtaXQiLCJjYWxsYmFjayIsImRvbmUiLCJtb2R1bGVzIiwiY2h1bmtzIiwicmVkdWNlIiwiYSIsImIiLCJjb25jYXQiLCJkZXBzIiwiYnVpbGQiLCJvdXRwdXRQYXRoIiwib3V0cHV0IiwiZGV2U2VydmVyIiwiY29udGVudEJhc2UiLCJjbWRFcnJvcnMiLCJwcm9taXNlIiwiX2J1aWxkRXh0QnVuZGxlIiwidXJsIiwicG9ydCIsIm9wbiIsInJlcXVpcmUiLCJ0b29sa2l0IiwidGhlbWUiLCJwYWNrYWdlcyIsInBhY2thZ2VEaXJzIiwic2RrIiwib3ZlcnJpZGVzIiwic2VuY2hhIiwiX2dldFNlbmNoQ21kUGF0aCIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0Iiwib25CdWlsZERvbmUiLCJFcnJvciIsInVzZXJQYWNrYWdlcyIsInB1c2giLCJ3cml0ZUZpbGVTeW5jIiwiY29tcHJlc3MiLCJwcm9kdWN0aW9uIiwicGFybXMiLCJjd2QiLCJzaWxlbnQiLCJzdGRpbyIsImVuY29kaW5nIiwidmVyYm9zZSIsImVudiIsIkVYVFJFQUNUX1ZFUkJPU0UiLCJ0aGVuIiwicmVhc29uIiwiZGVidWciLCJ0ZXN0IiwibWFuaWZlc3RFeHRyYWN0b3IiLCJleHRyYWN0RnJvbUpTWCIsInRyZWVTaGFraW5nIiwibWF0Y2giLCJkb1BhcnNlIiwiX3NvdXJjZSIsIl92YWx1ZSIsInJlZCIsImRpcm5hbWUiLCJiYXNlZGlyIiwiX2ZpbmRQYWNrYWdlcyIsIm1vZHVsZXNEaXIiLCJyZWFkZGlyU3luYyIsImZpbHRlciIsImRpciIsIm1hcCIsInBhY2thZ2VJbmZvIiwidHlwZSJdLCJtYXBwaW5ncyI6IkFBQUE7O0FBQ0E7O0FBR0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBRUE7O0FBQ0E7O0FBR0E7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWZBLElBQUlBLFlBQVksR0FBRyxDQUFuQjtBQUNBLElBQUlDLGdCQUFnQixHQUFHLEVBQXZCO0FBWUEsSUFBSUMsUUFBUSxHQUFHLEtBQWY7QUFDQSxNQUFN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O0FBRUQ7Ozs7Ozs7QUFLQTJFLEVBQUFBLGdCQUFnQixHQUFHO0FBQ2pCLFFBQUk7QUFBRSxhQUFPUixPQUFPLENBQUMsYUFBRCxDQUFkO0FBQStCLEtBQXJDLENBQ0EsT0FBT3JDLENBQVAsRUFBVTtBQUFFLGFBQU8sUUFBUDtBQUFpQjtBQUM5Qjs7QUF0aEIwQyxDQUE3QyxDLENBNGhCTTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFJTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQU9BO0FBQ0k7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDSjtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBR0k7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcbmltcG9ydCAnQGJhYmVsL3BvbHlmaWxsJztcbnZhciByZWFjdFZlcnNpb24gPSAwXG52YXIgcmVhY3RWZXJzaW9uRnVsbCA9ICcnXG5pbXBvcnQgY2hhbGsgZnJvbSAnY2hhbGsnO1xuaW1wb3J0IGZzIGZyb20gJ2ZzJztcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IHsgc3luYyBhcyBta2RpcnAgfSBmcm9tICdta2RpcnAnO1xuaW1wb3J0IHsgZXhlY3V0ZUFzeW5jIH0gZnJvbSAnLi9leGVjdXRlQXN5bmMnXG5pbXBvcnQgZXh0cmFjdEZyb21KU1ggZnJvbSAnLi9leHRyYWN0RnJvbUpTWCc7XG5pbXBvcnQgeyBzeW5jIGFzIHJpbXJhZiB9IGZyb20gJ3JpbXJhZic7XG5pbXBvcnQgeyBidWlsZFhNTCwgY3JlYXRlQXBwSnNvbiwgY3JlYXRlV29ya3NwYWNlSnNvbiB9IGZyb20gJy4vYXJ0aWZhY3RzJztcbmltcG9ydCB7IGNyZWF0ZUpTRE9NRW52aXJvbm1lbnQgfSBmcm9tICcuL2FydGlmYWN0cyc7XG5pbXBvcnQgeyBnZW5lcmF0ZSB9IGZyb20gJ2FzdHJpbmcnO1xuaW1wb3J0IHsgc3luYyBhcyByZXNvbHZlIH0gZnJvbSAncmVzb2x2ZSc7XG5sZXQgd2F0Y2hpbmcgPSBmYWxzZTtcbmNvbnN0IGFwcCA9IGAke2NoYWxrLmdyZWVuKCfihLkg772iZXh0772jOicpfSBleHQtcmVhY3Qtd2VicGFjay1wbHVnaW46IGA7XG5pbXBvcnQgKiBhcyByZWFkbGluZSBmcm9tICdyZWFkbGluZSdcblxubW9kdWxlLmV4cG9ydHMgPSBjbGFzcyBFeHRSZWFjdFdlYnBhY2tQbHVnaW4ge1xuICAvKipcbiAgICogQHBhcmFtIHtPYmplY3RbXX0gYnVpbGRzXG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gW2RlYnVnPWZhbHNlXSBTZXQgdG8gdHJ1ZSB0byBwcmV2ZW50IGNsZWFudXAgb2YgYnVpbGQgdGVtcG9yYXJ5IGJ1aWxkIGFydGlmYWN0cyB0aGF0IG1pZ2h0IGJlIGhlbHBmdWwgaW4gdHJvdWJsZXNob290aW5nIGlzc3Vlcy5cbiAgICogZGVwcmVjYXRlZCBAcGFyYW0ge1N0cmluZ30gc2RrIFRoZSBmdWxsIHBhdGggdG8gdGhlIEV4dFJlYWN0IFNES1xuICAgKiBAcGFyYW0ge1N0cmluZ30gW3Rvb2xraXQ9J21vZGVybiddIFwibW9kZXJuXCIgb3IgXCJjbGFzc2ljXCJcbiAgICogQHBhcmFtIHtTdHJpbmd9IHRoZW1lIFRoZSBuYW1lIG9mIHRoZSBFeHRSZWFjdCB0aGVtZSBwYWNrYWdlIHRvIHVzZSwgZm9yIGV4YW1wbGUgXCJ0aGVtZS1tYXRlcmlhbFwiXG4gICAqIEBwYXJhbSB7U3RyaW5nW119IHBhY2thZ2VzIEFuIGFycmF5IG9mIEV4dFJlYWN0IHBhY2thZ2VzIHRvIGluY2x1ZGVcbiAgICogQHBhcmFtIHtTdHJpbmdbXX0gb3ZlcnJpZGVzIEFuIGFycmF5IHdpdGggdGhlIHBhdGhzIG9mIGRpcmVjdG9yaWVzIG9yIGZpbGVzIHRvIHNlYXJjaC4gQW55IGNsYXNzZXNcbiAgICogZGVjbGFyZWQgaW4gdGhlc2UgbG9jYXRpb25zIHdpbGwgYmUgYXV0b21hdGljYWxseSByZXF1aXJlZCBhbmQgaW5jbHVkZWQgaW4gdGhlIGJ1aWxkLlxuICAgKiBJZiBhbnkgZmlsZSBkZWZpbmVzIGFuIEV4dFJlYWN0IG92ZXJyaWRlICh1c2luZyBFeHQuZGVmaW5lIHdpdGggYW4gXCJvdmVycmlkZVwiIHByb3BlcnR5KSxcbiAgICogdGhhdCBvdmVycmlkZSB3aWxsIGluIGZhY3Qgb25seSBiZSBpbmNsdWRlZCBpbiB0aGUgYnVpbGQgaWYgdGhlIHRhcmdldCBjbGFzcyBzcGVjaWZpZWRcbiAgICogaW4gdGhlIFwib3ZlcnJpZGVcIiBwcm9wZXJ0eSBpcyBhbHNvIGluY2x1ZGVkLlxuICAgKiBAcGFyYW0ge1N0cmluZ30gb3V0cHV0IFRoZSBwYXRoIHRvIGRpcmVjdG9yeSB3aGVyZSB0aGUgRXh0UmVhY3QgYnVuZGxlIHNob3VsZCBiZSB3cml0dGVuXG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gYXN5bmNocm9ub3VzIFNldCB0byB0cnVlIHRvIHJ1biBTZW5jaGEgQ21kIGJ1aWxkcyBhc3luY2hyb25vdXNseS4gVGhpcyBtYWtlcyB0aGUgd2VicGFjayBidWlsZCBmaW5pc2ggbXVjaCBmYXN0ZXIsIGJ1dCB0aGUgYXBwIG1heSBub3QgbG9hZCBjb3JyZWN0bHkgaW4geW91ciBicm93c2VyIHVudGlsIFNlbmNoYSBDbWQgaXMgZmluaXNoZWQgYnVpbGRpbmcgdGhlIEV4dFJlYWN0IGJ1bmRsZVxuICAgKiBAcGFyYW0ge0Jvb2xlYW59IHByb2R1Y3Rpb24gU2V0IHRvIHRydWUgZm9yIHByb2R1Y3Rpb24gYnVpbGRzLiAgVGhpcyB0ZWxsIFNlbmNoYSBDbWQgdG8gY29tcHJlc3MgdGhlIGdlbmVyYXRlZCBKUyBidW5kbGUuXG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gdHJlZVNoYWtpbmcgU2V0IHRvIGZhbHNlIHRvIGRpc2FibGUgdHJlZSBzaGFraW5nIGluIGRldmVsb3BtZW50IGJ1aWxkcy4gIFRoaXMgbWFrZXMgaW5jcmVtZW50YWwgcmVidWlsZHMgZmFzdGVyIGFzIGFsbCBFeHRSZWFjdCBjb21wb25lbnRzIGFyZSBpbmNsdWRlZCBpbiB0aGUgZXh0LmpzIGJ1bmRsZSBpbiB0aGUgaW5pdGlhbCBidWlsZCBhbmQgdGh1cyB0aGUgYnVuZGxlIGRvZXMgbm90IG5lZWQgdG8gYmUgcmVidWlsdCBhZnRlciBlYWNoIGNoYW5nZS4gRGVmYXVsdHMgdG8gdHJ1ZS5cbiAgICovXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICB0aGlzLmZpcnN0VGltZSA9IHRydWVcbiAgICB0aGlzLmNvdW50ID0gMFxuICAgIC8vY2FuIGJlIGluIGRldmRlcGVuZGVuY2llcyAtIGFjY291bnQgZm9yIHRoaXM6IHJlYWN0OiBcIjE1LjE2LjBcIlxuICAgIHZhciBwa2cgPSAoZnMuZXhpc3RzU3luYygncGFja2FnZS5qc29uJykgJiYgSlNPTi5wYXJzZShmcy5yZWFkRmlsZVN5bmMoJ3BhY2thZ2UuanNvbicsICd1dGYtOCcpKSB8fCB7fSlcbiAgICByZWFjdFZlcnNpb25GdWxsID0gcGtnLmRlcGVuZGVuY2llcy5yZWFjdFxuICAgIHZhciBpczE2ID0gcmVhY3RWZXJzaW9uRnVsbC5pbmNsdWRlcyhcIjE2XCIpXG4gICAgaWYgKGlzMTYpIHsgcmVhY3RWZXJzaW9uID0gMTYgfVxuICAgIGVsc2UgeyByZWFjdFZlcnNpb24gPSAxNSB9XG4gICAgdGhpcy5yZWFjdFZlcnNpb24gPSByZWFjdFZlcnNpb25cbiAgICB0aGlzLnJlYWN0VmVyc2lvbkZ1bGwgPSByZWFjdFZlcnNpb25GdWxsXG4gICAgY29uc3QgZXh0UmVhY3RSYyA9IChmcy5leGlzdHNTeW5jKCcuZXh0LXJlYWN0cmMnKSAmJiBKU09OLnBhcnNlKGZzLnJlYWRGaWxlU3luYygnLmV4dC1yZWFjdHJjJywgJ3V0Zi04JykpIHx8IHt9KVxuICAgIG9wdGlvbnMgPSB7IC4uLnRoaXMuZ2V0RGVmYXVsdE9wdGlvbnMoKSwgLi4ub3B0aW9ucywgLi4uZXh0UmVhY3RSYyB9XG4gICAgY29uc3QgeyBidWlsZHMgfSA9IG9wdGlvbnNcbiAgICBpZiAoT2JqZWN0LmtleXMoYnVpbGRzKS5sZW5ndGggPT09IDApIHtcbiAgICAgIGNvbnN0IHsgYnVpbGRzLCAuLi5idWlsZE9wdGlvbnMgfSA9IG9wdGlvbnNcbiAgICAgIGJ1aWxkcy5leHQgPSBidWlsZE9wdGlvbnNcbiAgICB9XG4gICAgZm9yIChsZXQgbmFtZSBpbiBidWlsZHMpIHtcbiAgICAgIHRoaXMuX3ZhbGlkYXRlQnVpbGRDb25maWcobmFtZSwgYnVpbGRzW25hbWVdKVxuICAgIH1cbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIHtcbiAgICAgIC4uLm9wdGlvbnMsXG4gICAgICBjdXJyZW50RmlsZTogbnVsbCxcbiAgICAgIG1hbmlmZXN0OiBudWxsLFxuICAgICAgZGVwZW5kZW5jaWVzOiBbXVxuICAgIH0pXG4gIH1cblxuICB3YXRjaFJ1bigpIHtcbiAgICB0aGlzLndhdGNoID0gdHJ1ZVxuICB9XG5cbiAgYXBwbHkoY29tcGlsZXIpIHtcbiAgICBpZiAodGhpcy53ZWJwYWNrVmVyc2lvbiA9PSB1bmRlZmluZWQpIHtcbiAgICAgIGNvbnN0IGlzV2VicGFjazQgPSBjb21waWxlci5ob29rcztcbiAgICAgIGlmIChpc1dlYnBhY2s0KSB7dGhpcy53ZWJwYWNrVmVyc2lvbiA9ICdJUyB3ZWJwYWNrIDQnfVxuICAgICAgZWxzZSB7dGhpcy53ZWJwYWNrVmVyc2lvbiA9ICdOT1Qgd2VicGFjayA0J31cbiAgICAgIHJlYWRsaW5lLmN1cnNvclRvKHByb2Nlc3Muc3Rkb3V0LCAwKTtjb25zb2xlLmxvZyhhcHAgKyAncmVhY3RWZXJzaW9uOiAnICsgdGhpcy5yZWFjdFZlcnNpb25GdWxsICsgJywgJyArIHRoaXMud2VicGFja1ZlcnNpb24pXG4gICAgfVxuICAgIGNvbnN0IG1lID0gdGhpc1xuXG4gICAgaWYgKGNvbXBpbGVyLmhvb2tzKSB7XG4gICAgICBpZiAodGhpcy5hc3luY2hyb25vdXMpIHtcbiAgICAgICAgY29tcGlsZXIuaG9va3Mud2F0Y2hSdW4udGFwQXN5bmMoJ2V4dC1yZWFjdC13YXRjaC1ydW4gKGFzeW5jKScsICh3YXRjaGluZywgY2IpID0+IHtcbiAgICAgICAgICByZWFkbGluZS5jdXJzb3JUbyhwcm9jZXNzLnN0ZG91dCwgMCk7Y29uc29sZS5sb2coYXBwICsgJ2V4dC1yZWFjdC13YXRjaC1ydW4gKGFzeW5jKScpXG4gICAgICAgICAgdGhpcy53YXRjaFJ1bigpXG4gICAgICAgICAgY2IoKVxuICAgICAgICB9KVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGNvbXBpbGVyLmhvb2tzLndhdGNoUnVuLnRhcCgnZXh0LXJlYWN0LXdhdGNoLXJ1bicsICh3YXRjaGluZykgPT4ge1xuICAgICAgICAgIHJlYWRsaW5lLmN1cnNvclRvKHByb2Nlc3Muc3Rkb3V0LCAwKTtjb25zb2xlLmxvZyhhcHAgKyAnZXh0LXJlYWN0LXdhdGNoLXJ1bicpXG4gICAgICAgICAgdGhpcy53YXRjaFJ1bigpXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgY29tcGlsZXIucGx1Z2luKCd3YXRjaC1ydW4nLCAod2F0Y2hpbmcsIGNiKSA9PiB7XG4gICAgICAgIHJlYWRsaW5lLmN1cnNvclRvKHByb2Nlc3Muc3Rkb3V0LCAwKTtjb25zb2xlLmxvZyhhcHAgKyAnd2F0Y2gtcnVuJylcbiAgICAgICAgdGhpcy53YXRjaFJ1bigpXG4gICAgICAgIGNiKClcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWRkcyB0aGUgY29kZSBmb3IgdGhlIHNwZWNpZmllZCBmdW5jdGlvbiBjYWxsIHRvIHRoZSBtYW5pZmVzdC5qcyBmaWxlXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGNhbGwgQSBmdW5jdGlvbiBjYWxsIEFTVCBub2RlLlxuICAgICAqL1xuICAgIGNvbnN0IGFkZFRvTWFuaWZlc3QgPSBmdW5jdGlvbihjYWxsKSB7XG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCBmaWxlID0gdGhpcy5zdGF0ZS5tb2R1bGUucmVzb3VyY2U7XG4gICAgICAgIG1lLmRlcGVuZGVuY2llc1tmaWxlXSA9IFsgLi4uKG1lLmRlcGVuZGVuY2llc1tmaWxlXSB8fCBbXSksIGdlbmVyYXRlKGNhbGwpIF07XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoYEVycm9yIHByb2Nlc3NpbmcgJHtmaWxlfWApO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBpZiAoY29tcGlsZXIuaG9va3MpIHtcbiAgICAgIGNvbXBpbGVyLmhvb2tzLmNvbXBpbGF0aW9uLnRhcCgnZXh0LXJlYWN0LWNvbXBpbGF0aW9uJywgKGNvbXBpbGF0aW9uLGRhdGEpID0+IHtcbiAgICAgICAgcmVhZGxpbmUuY3Vyc29yVG8ocHJvY2Vzcy5zdGRvdXQsIDApO2NvbnNvbGUubG9nKGFwcCArICdleHQtcmVhY3QtY29tcGlsYXRpb24nKVxuICAgICAgICBjb21waWxhdGlvbi5ob29rcy5zdWNjZWVkTW9kdWxlLnRhcCgnZXh0LXJlYWN0LXN1Y2NlZWQtbW9kdWxlJywgKG1vZHVsZSkgPT4ge1xuICAgICAgICAgIHRoaXMuc3VjY2VlZE1vZHVsZShjb21waWxhdGlvbiwgbW9kdWxlKVxuICAgICAgICB9KVxuXG4gICAgICAgIGRhdGEubm9ybWFsTW9kdWxlRmFjdG9yeS5wbHVnaW4oXCJwYXJzZXJcIiwgZnVuY3Rpb24ocGFyc2VyLCBvcHRpb25zKSB7XG4gICAgICAgICAgLy8gZXh0cmFjdCB4dHlwZXMgYW5kIGNsYXNzZXMgZnJvbSBFeHQuY3JlYXRlIGNhbGxzXG4gICAgICAgICAgcGFyc2VyLnBsdWdpbignY2FsbCBFeHQuY3JlYXRlJywgYWRkVG9NYW5pZmVzdCk7XG4gICAgICAgICAgLy8gY29weSBFeHQucmVxdWlyZSBjYWxscyB0byB0aGUgbWFuaWZlc3QuICBUaGlzIGFsbG93cyB0aGUgdXNlcnMgdG8gZXhwbGljaXRseSByZXF1aXJlIGEgY2xhc3MgaWYgdGhlIHBsdWdpbiBmYWlscyB0byBkZXRlY3QgaXQuXG4gICAgICAgICAgcGFyc2VyLnBsdWdpbignY2FsbCBFeHQucmVxdWlyZScsIGFkZFRvTWFuaWZlc3QpO1xuICAgICAgICAgIC8vIGNvcHkgRXh0LmRlZmluZSBjYWxscyB0byB0aGUgbWFuaWZlc3QuICBUaGlzIGFsbG93cyB1c2VycyB0byB3cml0ZSBzdGFuZGFyZCBFeHRSZWFjdCBjbGFzc2VzLlxuICAgICAgICAgIHBhcnNlci5wbHVnaW4oJ2NhbGwgRXh0LmRlZmluZScsIGFkZFRvTWFuaWZlc3QpO1xuICAgICAgICB9KVxuXG4gICAgICAgIGNvbXBpbGF0aW9uLmhvb2tzLmh0bWxXZWJwYWNrUGx1Z2luQmVmb3JlSHRtbEdlbmVyYXRpb24udGFwQXN5bmMoJ2V4dC1yZWFjdC1odG1sZ2VuZXJhdGlvbicsKGRhdGEsIGNiKSA9PiB7XG5cbiAgICAgICAgICByZWFkbGluZS5jdXJzb3JUbyhwcm9jZXNzLnN0ZG91dCwgMCk7Y29uc29sZS5sb2coYXBwICsgJ2V4dC1yZWFjdC1odG1sZ2VuZXJhdGlvbicpXG4gICAgICAgICAgLy9yZWFkbGluZS5jdXJzb3JUbyhwcm9jZXNzLnN0ZG91dCwgMCk7Y29uc29sZS5sb2coYXBwICsgY29tcGlsYXRpb24ub3V0cHV0T3B0aW9ucy5wdWJsaWNQYXRoKVxuICAgICAgICAgIGlmIChjb21waWxhdGlvbi5vdXRwdXRPcHRpb25zLnB1YmxpY1BhdGggPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBkYXRhLmFzc2V0cy5qcy51bnNoaWZ0KCdleHQtcmVhY3QvZXh0LmpzJylcbiAgICAgICAgICAgIGRhdGEuYXNzZXRzLmNzcy51bnNoaWZ0KCdleHQtcmVhY3QvZXh0LmNzcycpXG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZGF0YS5hc3NldHMuanMudW5zaGlmdChwYXRoLmpvaW4oY29tcGlsYXRpb24ub3V0cHV0T3B0aW9ucy5wdWJsaWNQYXRoLCAnZXh0LXJlYWN0L2V4dC5qcycpKVxuICAgICAgICAgICAgZGF0YS5hc3NldHMuY3NzLnVuc2hpZnQocGF0aC5qb2luKGNvbXBpbGF0aW9uLm91dHB1dE9wdGlvbnMucHVibGljUGF0aCwgJ2V4dC1yZWFjdC9leHQuY3NzJykpXG4gICAgICAgICAgfVxuICAgICAgICAgIGNiKG51bGwsIGRhdGEpXG4gICAgICAgIH0pXG5cbiAgICAgIH0pXG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgY29tcGlsZXIucGx1Z2luKCdjb21waWxhdGlvbicsIChjb21waWxhdGlvbiwgZGF0YSkgPT4ge1xuICAgICAgICByZWFkbGluZS5jdXJzb3JUbyhwcm9jZXNzLnN0ZG91dCwgMCk7Y29uc29sZS5sb2coYXBwICsgJ2NvbXBpbGF0aW9uJylcbiAgICAgICAgY29tcGlsYXRpb24ucGx1Z2luKCdzdWNjZWVkLW1vZHVsZScsIChtb2R1bGUpID0+IHtcbiAgICAgICAgICB0aGlzLnN1Y2NlZWRNb2R1bGUoY29tcGlsYXRpb24sIG1vZHVsZSlcbiAgICAgICAgfSlcbiAgICAgICAgZGF0YS5ub3JtYWxNb2R1bGVGYWN0b3J5LnBsdWdpbihcInBhcnNlclwiLCBmdW5jdGlvbihwYXJzZXIsIG9wdGlvbnMpIHtcbiAgICAgICAgICAvLyBleHRyYWN0IHh0eXBlcyBhbmQgY2xhc3NlcyBmcm9tIEV4dC5jcmVhdGUgY2FsbHNcbiAgICAgICAgICBwYXJzZXIucGx1Z2luKCdjYWxsIEV4dC5jcmVhdGUnLCBhZGRUb01hbmlmZXN0KTtcbiAgICAgICAgICAvLyBjb3B5IEV4dC5yZXF1aXJlIGNhbGxzIHRvIHRoZSBtYW5pZmVzdC4gIFRoaXMgYWxsb3dzIHRoZSB1c2VycyB0byBleHBsaWNpdGx5IHJlcXVpcmUgYSBjbGFzcyBpZiB0aGUgcGx1Z2luIGZhaWxzIHRvIGRldGVjdCBpdC5cbiAgICAgICAgICBwYXJzZXIucGx1Z2luKCdjYWxsIEV4dC5yZXF1aXJlJywgYWRkVG9NYW5pZmVzdCk7XG4gICAgICAgICAgLy8gY29weSBFeHQuZGVmaW5lIGNhbGxzIHRvIHRoZSBtYW5pZmVzdC4gIFRoaXMgYWxsb3dzIHVzZXJzIHRvIHdyaXRlIHN0YW5kYXJkIEV4dFJlYWN0IGNsYXNzZXMuXG4gICAgICAgICAgcGFyc2VyLnBsdWdpbignY2FsbCBFeHQuZGVmaW5lJywgYWRkVG9NYW5pZmVzdCk7XG4gICAgICAgIH0pXG5cbiAgICAgIH0pXG4gICAgfVxuXG4vLyplbWl0IC0gb25jZSBhbGwgbW9kdWxlcyBhcmUgcHJvY2Vzc2VkLCBjcmVhdGUgdGhlIG9wdGltaXplZCBFeHRSZWFjdCBidWlsZC5cbiAgICBpZiAoY29tcGlsZXIuaG9va3MpIHtcbiAgICAgIGlmICh0cnVlKSB7XG4gICAgICAgIGNvbXBpbGVyLmhvb2tzLmVtaXQudGFwQXN5bmMoJ2V4dC1yZWFjdC1lbWl0IChhc3luYyknLCAoY29tcGlsYXRpb24sIGNhbGxiYWNrKSA9PiB7XG4gICAgICAgICAgcmVhZGxpbmUuY3Vyc29yVG8ocHJvY2Vzcy5zdGRvdXQsIDApO2NvbnNvbGUubG9nKGFwcCArICdleHQtcmVhY3QtZW1pdCAgKGFzeW5jKScpXG4gICAgICAgICAgdGhpcy5lbWl0KGNvbXBpbGVyLCBjb21waWxhdGlvbiwgY2FsbGJhY2spXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgY29tcGlsZXIuaG9va3MuZW1pdC50YXAoJ2V4dC1yZWFjdC1lbWl0JywgKGNvbXBpbGF0aW9uKSA9PiB7XG4gICAgICAgICAgcmVhZGxpbmUuY3Vyc29yVG8ocHJvY2Vzcy5zdGRvdXQsIDApO2NvbnNvbGUubG9nKGFwcCArICdleHQtcmVhY3QtZW1pdCcpXG4gICAgICAgICAgdGhpcy5lbWl0KGNvbXBpbGVyLCBjb21waWxhdGlvbilcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBjb21waWxlci5wbHVnaW4oJ2VtaXQnLCAoY29tcGlsYXRpb24sIGNhbGxiYWNrKSA9PiB7XG4gICAgICAgIHJlYWRsaW5lLmN1cnNvclRvKHByb2Nlc3Muc3Rkb3V0LCAwKTtjb25zb2xlLmxvZyhhcHAgKyAnZW1pdCcpXG4gICAgICAgIHRoaXMuZW1pdChjb21waWxlciwgY29tcGlsYXRpb24sIGNhbGxiYWNrKVxuICAgICAgfSlcbiAgICB9XG5cbiAgICBpZiAoY29tcGlsZXIuaG9va3MpIHtcbiAgICAgIGlmICh0aGlzLmFzeW5jaHJvbm91cykge1xuICAgICAgICBjb21waWxlci5ob29rcy5kb25lLnRhcEFzeW5jKCdleHQtcmVhY3QtZG9uZSAoYXN5bmMpJywgKGNvbXBpbGF0aW9uLCBjYWxsYmFjaykgPT4ge1xuICAgICAgICAgIHJlYWRsaW5lLmN1cnNvclRvKHByb2Nlc3Muc3Rkb3V0LCAwKTtjb25zb2xlLmxvZyhhcHAgKyAnZXh0LXJlYWN0LWRvbmUgKGFzeW5jKScpXG4gICAgICAgICAgaWYgKGNhbGxiYWNrICE9IG51bGwpIFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmFzeW5jaHJvbm91cykgXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdjYWxsaW5nIGNhbGxiYWNrIGZvciBleHQtcmVhY3QtZW1pdCAgKGFzeW5jKScpXG4gICAgICAgICAgICAgIGNhbGxiYWNrKClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgY29tcGlsZXIuaG9va3MuZG9uZS50YXAoJ2V4dC1yZWFjdC1kb25lJywgKCkgPT4ge1xuICAgICAgICAgIHJlYWRsaW5lLmN1cnNvclRvKHByb2Nlc3Muc3Rkb3V0LCAwKTtjb25zb2xlLmxvZyhhcHAgKyAnZXh0LXJlYWN0LWRvbmUnKVxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGFzeW5jIGVtaXQoY29tcGlsZXIsIGNvbXBpbGF0aW9uLCBjYWxsYmFjaykge1xuICAgIHZhciBpc1dlYnBhY2s0ID0gY29tcGlsYXRpb24uaG9va3M7XG4gICAgdmFyIG1vZHVsZXMgPSBbXVxuICAgIGlmIChpc1dlYnBhY2s0KSB7XG4gICAgICBpc1dlYnBhY2s0ID0gdHJ1ZVxuXG5cblxuXG4vLyAgICAgICBtb2R1bGVzID0gY29tcGlsYXRpb24uY2h1bmtzLnJlZHVjZSgoYSwgYikgPT4gYS5jb25jYXQoYi5fbW9kdWxlcyksIFtdKVxuLy8gLy8gICAgICBjb25zb2xlLmxvZyhtb2R1bGVzKVxuLy8gICAgICAgdmFyIGkgPSAwXG4vLyAgICAgICB2YXIgdGhlTW9kdWxlID0gJydcbi8vICAgICAgIGZvciAobGV0IG1vZHVsZSBvZiBtb2R1bGVzKSB7XG4vLyAgICAgICAgIGlmIChpID09IDApIHtcbi8vICAgICAgICAgICB0aGVNb2R1bGUgPSBtb2R1bGVcbi8vICAgICAgICAgICBpKytcbi8vICAgICAgICAgfVxuLy8gLy9jb25zdCBkZXBzID0gdGhpcy5kZXBlbmRlbmNpZXNbbW9kdWxlLnJlc291cmNlXVxuLy8gICAgICAgICAvL2NvbnNvbGUubG9nKGRlcHMpXG4vLyAgICAgICAgIC8vaWYgKGRlcHMpIHN0YXRlbWVudHMgPSBzdGF0ZW1lbnRzLmNvbmNhdChkZXBzKTtcbi8vICAgICAgIH1cbi8vICAgICAgIHZhciB0aGVQYXRoID0gcGF0aC5qb2luKGNvbXBpbGVyLm91dHB1dFBhdGgsICdtb2R1bGUudHh0Jylcbi8vICAgICAgIC8vY29uc29sZS5sb2codGhlUGF0aClcblxuLy8gICAgICAgLy92YXIgbyA9IHt9O1xuLy8gICAgICAgLy9vLm8gPSB0aGVNb2R1bGU7XG4vLyAgICAgICAvL2NvbnNvbGUubG9nKHRoZU1vZHVsZVswXS5jb250ZXh0KVxuICAgICAgXG4vLyAgICAgICB2YXIgY2FjaGUgPSBbXTtcbi8vICAgICAgIHZhciBoID0gSlNPTi5zdHJpbmdpZnkodGhlTW9kdWxlLCBmdW5jdGlvbihrZXksIHZhbHVlKSB7XG4vLyAgICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgIT09IG51bGwpIHtcbi8vICAgICAgICAgICAgICAgaWYgKGNhY2hlLmluZGV4T2YodmFsdWUpICE9PSAtMSkge1xuLy8gICAgICAgICAgICAgICAgICAgLy8gQ2lyY3VsYXIgcmVmZXJlbmNlIGZvdW5kLCBkaXNjYXJkIGtleVxuLy8gICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuLy8gICAgICAgICAgICAgICB9XG4vLyAgICAgICAgICAgICAgIC8vIFN0b3JlIHZhbHVlIGluIG91ciBjb2xsZWN0aW9uXG4vLyAgICAgICAgICAgICAgIGNhY2hlLnB1c2godmFsdWUpO1xuLy8gICAgICAgICAgIH1cbi8vICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4vLyAgICAgICB9KTtcbi8vICAgICAgIGNhY2hlID0gbnVsbDsgLy8gRW5hYmxlIGdhcmJhZ2UgY29sbGVjdGlvblxuLy8gICAgICAgLy9mcy53cml0ZUZpbGVTeW5jKCB0aGVQYXRoLCBoLCAndXRmOCcpXG5cblxuXG5cbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBpc1dlYnBhY2s0ID0gZmFsc2VcblxuXG5cbiAgICAgIG1vZHVsZXMgPSBjb21waWxhdGlvbi5jaHVua3MucmVkdWNlKChhLCBiKSA9PiBhLmNvbmNhdChiLm1vZHVsZXMpLCBbXSlcblxuICAgICAgZm9yIChsZXQgbW9kdWxlIG9mIG1vZHVsZXMpIHtcbiAgICAgICAgY29uc3QgZGVwcyA9IHRoaXMuZGVwZW5kZW5jaWVzW21vZHVsZS5yZXNvdXJjZV1cbiAgICAgICAgY29uc29sZS5sb2coZGVwcylcbiAgICAgICAgLy9pZiAoZGVwcykgc3RhdGVtZW50cyA9IHN0YXRlbWVudHMuY29uY2F0KGRlcHMpO1xuICAgICAgfVxuXG5cblxuXG4gICAgfVxuICAgIGNvbnN0IGJ1aWxkID0gdGhpcy5idWlsZHNbT2JqZWN0LmtleXModGhpcy5idWlsZHMpWzBdXTtcbiAgICBsZXQgb3V0cHV0UGF0aCA9IHBhdGguam9pbihjb21waWxlci5vdXRwdXRQYXRoLCB0aGlzLm91dHB1dCk7XG4gICAgLy8gd2VicGFjay1kZXYtc2VydmVyIG92ZXJ3cml0ZXMgdGhlIG91dHB1dFBhdGggdG8gXCIvXCIsIHNvIHdlIG5lZWQgdG8gcHJlcGVuZCBjb250ZW50QmFzZVxuICAgIGlmIChjb21waWxlci5vdXRwdXRQYXRoID09PSAnLycgJiYgY29tcGlsZXIub3B0aW9ucy5kZXZTZXJ2ZXIpIHtcbiAgICAgIG91dHB1dFBhdGggPSBwYXRoLmpvaW4oY29tcGlsZXIub3B0aW9ucy5kZXZTZXJ2ZXIuY29udGVudEJhc2UsIG91dHB1dFBhdGgpO1xuICAgIH1cbiAgICB2YXIgY21kRXJyb3JzID0gW11cblxuICAgIGxldCBwcm9taXNlID0gdGhpcy5fYnVpbGRFeHRCdW5kbGUoY29tcGlsYXRpb24sIGNtZEVycm9ycywgb3V0cHV0UGF0aCwgYnVpbGQpXG5cbiAgICBhd2FpdCBwcm9taXNlXG4gXG4gICAgaWYgKHRoaXMud2F0Y2ggJiYgdGhpcy5jb3VudCA9PSAwICYmIGNtZEVycm9ycy5sZW5ndGggPT0gMCkge1xuICAgICAgdmFyIHVybCA9ICdodHRwOi8vbG9jYWxob3N0OicgKyB0aGlzLnBvcnRcbiAgICAgIHJlYWRsaW5lLmN1cnNvclRvKHByb2Nlc3Muc3Rkb3V0LCAwKTtjb25zb2xlLmxvZyhhcHAgKyAnZXh0LXJlYWN0LWVtaXQgLSBvcGVuIGJyb3dzZXIgYXQgJyArIHVybClcbiAgICAgIHRoaXMuY291bnQrK1xuICAgICAgY29uc3Qgb3BuID0gcmVxdWlyZSgnb3BuJylcbiAgICAgIG9wbih1cmwpXG4gICAgfVxuICAgIGlmIChjYWxsYmFjayAhPSBudWxsKXsgY2FsbGJhY2soKSB9XG4gIH1cblxuICAvKipcbiAgIC8qKlxuICAgICogQnVpbGRzIGEgbWluaW1hbCB2ZXJzaW9uIG9mIHRoZSBFeHRSZWFjdCBmcmFtZXdvcmsgYmFzZWQgb24gdGhlIGNsYXNzZXMgdXNlZFxuICAgICogQHBhcmFtIHtTdHJpbmd9IG5hbWUgVGhlIG5hbWUgb2YgdGhlIGJ1aWxkXG4gICAgKiBAcGFyYW0ge01vZHVsZVtdfSBtb2R1bGVzIHdlYnBhY2sgbW9kdWxlc1xuICAgICogQHBhcmFtIHtTdHJpbmd9IG91dHB1dCBUaGUgcGF0aCB0byB3aGVyZSB0aGUgZnJhbWV3b3JrIGJ1aWxkIHNob3VsZCBiZSB3cml0dGVuXG4gICAgKiBAcGFyYW0ge1N0cmluZ30gW3Rvb2xraXQ9J21vZGVybiddIFwibW9kZXJuXCIgb3IgXCJjbGFzc2ljXCJcbiAgICAqIEBwYXJhbSB7U3RyaW5nfSBvdXRwdXQgVGhlIHBhdGggdG8gdGhlIGRpcmVjdG9yeSB0byBjcmVhdGUgd2hpY2ggd2lsbCBjb250YWluIHRoZSBqcyBhbmQgY3NzIGJ1bmRsZXNcbiAgICAqIEBwYXJhbSB7U3RyaW5nfSB0aGVtZSBUaGUgbmFtZSBvZiB0aGUgRXh0UmVhY3QgdGhlbWUgcGFja2FnZSB0byB1c2UsIGZvciBleGFtcGxlIFwidGhlbWUtbWF0ZXJpYWxcIlxuICAgICogQHBhcmFtIHtTdHJpbmdbXX0gcGFja2FnZXMgQW4gYXJyYXkgb2YgRXh0UmVhY3QgcGFja2FnZXMgdG8gaW5jbHVkZVxuICAgICogQHBhcmFtIHtTdHJpbmdbXX0gcGFja2FnZURpcnMgRGlyZWN0b3JpZXMgY29udGFpbmluZyBwYWNrYWdlc1xuICAgICogQHBhcmFtIHtTdHJpbmdbXX0gb3ZlcnJpZGVzIEFuIGFycmF5IG9mIGxvY2F0aW9ucyBmb3Igb3ZlcnJpZGVzXG4gICAgKiBAcGFyYW0ge1N0cmluZ30gc2RrIFRoZSBmdWxsIHBhdGggdG8gdGhlIEV4dFJlYWN0IFNES1xuICAgICogQHByaXZhdGVcbiAgICAqL1xuICBfYnVpbGRFeHRCdW5kbGUoY29tcGlsYXRpb24sIGNtZEVycm9ycywgb3V0cHV0LCB7IHRvb2xraXQ9J21vZGVybicsIHRoZW1lLCBwYWNrYWdlcz1bXSwgcGFja2FnZURpcnM9W10sIHNkaywgb3ZlcnJpZGVzfSkge1xuICAgIGxldCBzZW5jaGEgPSB0aGlzLl9nZXRTZW5jaENtZFBhdGgoKVxuICAgIHRoZW1lID0gdGhlbWUgfHwgKHRvb2xraXQgPT09ICdjbGFzc2ljJyA/ICd0aGVtZS10cml0b24nIDogJ3RoZW1lLW1hdGVyaWFsJylcblxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBjb25zdCBvbkJ1aWxkRG9uZSA9ICgpID0+IHtcbiAgICAgICAgaWYgKGNtZEVycm9ycy5sZW5ndGgpIHtcbiAgICAgICAgICByZWplY3QobmV3IEVycm9yKGNtZEVycm9ycy5qb2luKFwiXCIpKSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXNvbHZlKClcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBjb25zdCB1c2VyUGFja2FnZXMgPSBwYXRoLmpvaW4oJy4nLCAnZXh0LXJlYWN0JywgJ3BhY2thZ2VzJylcbiAgICAgIGlmIChmcy5leGlzdHNTeW5jKHVzZXJQYWNrYWdlcykpIHtcbiAgICAgICAgcmVhZGxpbmUuY3Vyc29yVG8ocHJvY2Vzcy5zdGRvdXQsIDApO2NvbnNvbGUubG9nKGFwcCArICdBZGRpbmcgUGFja2FnZSBGb2xkZXI6ICcgKyB1c2VyUGFja2FnZXMpXG4gICAgICAgIHBhY2thZ2VEaXJzLnB1c2godXNlclBhY2thZ2VzKVxuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5maXJzdFRpbWUpIHtcbiAgICAgICAgcmltcmFmKG91dHB1dClcbiAgICAgICAgbWtkaXJwKG91dHB1dClcbiAgICAgICAgZnMud3JpdGVGaWxlU3luYyhwYXRoLmpvaW4ob3V0cHV0LCAnYnVpbGQueG1sJyksIGJ1aWxkWE1MKHsgY29tcHJlc3M6IHRoaXMucHJvZHVjdGlvbiB9KSwgJ3V0ZjgnKVxuICAgICAgICBmcy53cml0ZUZpbGVTeW5jKHBhdGguam9pbihvdXRwdXQsICdqc2RvbS1lbnZpcm9ubWVudC5qcycpLCBjcmVhdGVKU0RPTUVudmlyb25tZW50KCksICd1dGY4JylcbiAgICAgICAgZnMud3JpdGVGaWxlU3luYyhwYXRoLmpvaW4ob3V0cHV0LCAnYXBwLmpzb24nKSwgY3JlYXRlQXBwSnNvbih7IHRoZW1lLCBwYWNrYWdlcywgdG9vbGtpdCwgb3ZlcnJpZGVzLCBwYWNrYWdlRGlycyB9KSwgJ3V0ZjgnKVxuICAgICAgICBmcy53cml0ZUZpbGVTeW5jKHBhdGguam9pbihvdXRwdXQsICd3b3Jrc3BhY2UuanNvbicpLCBjcmVhdGVXb3Jrc3BhY2VKc29uKHNkaywgcGFja2FnZURpcnMsIG91dHB1dCksICd1dGY4JylcbiAgICAgIH1cbiAgICAgIHRoaXMuZmlyc3RUaW1lID0gZmFsc2VcblxuICAgICAgbGV0IGpzXG4gICAgICBqcyA9ICdFeHQucmVxdWlyZShcIkV4dC4qXCIpJ1xuXG4gICAgICAvLyBpZiAodGhpcy50cmVlU2hha2luZykge1xuICAgICAgLy8gICAvL2xldCBzdGF0ZW1lbnRzID0gWydFeHQucmVxdWlyZShbXCJFeHQuYXBwLkFwcGxpY2F0aW9uXCIsIFwiRXh0LkNvbXBvbmVudFwiLCBcIkV4dC5XaWRnZXRcIiwgXCJFeHQubGF5b3V0LkZpdFwiLCBcIkV4dC5yZWFjdC5UcmFuc2l0aW9uXCIsIFwiRXh0LnJlYWN0LlJlbmRlcmVyQ2VsbFwiXSknXTsgLy8gZm9yIHNvbWUgcmVhc29uIGNvbW1hbmQgZG9lc24ndCBsb2FkIGNvbXBvbmVudCB3aGVuIG9ubHkgcGFuZWwgaXMgcmVxdWlyZWRcbiAgICAgIC8vICAgbGV0IHN0YXRlbWVudHMgPSBbJ0V4dC5yZXF1aXJlKFtcIkV4dC5hcHAuQXBwbGljYXRpb25cIiwgXCJFeHQuQ29tcG9uZW50XCIsIFwiRXh0LldpZGdldFwiLCBcIkV4dC5sYXlvdXQuRml0XCIsIFwiRXh0LnJlYWN0LlRyYW5zaXRpb25cIl0pJ107IC8vIGZvciBzb21lIHJlYXNvbiBjb21tYW5kIGRvZXNuJ3QgbG9hZCBjb21wb25lbnQgd2hlbiBvbmx5IHBhbmVsIGlzIHJlcXVpcmVkXG4gICAgICAvLyAgIC8vIGlmIChwYWNrYWdlcy5pbmRleE9mKCdyZWFjdG8nKSAhPT0gLTEpIHtcbiAgICAgIC8vICAgLy8gICBzdGF0ZW1lbnRzLnB1c2goJ0V4dC5yZXF1aXJlKFwiRXh0LnJlYWN0LlJlbmRlcmVyQ2VsbFwiKScpO1xuICAgICAgLy8gICAvLyB9XG4gICAgICAvLyAgIC8vbWpnXG4gICAgICAvLyAgIGZvciAobGV0IG1vZHVsZSBvZiBtb2R1bGVzKSB7XG4gICAgICAvLyAgICAgY29uc3QgZGVwcyA9IHRoaXMuZGVwZW5kZW5jaWVzW21vZHVsZS5yZXNvdXJjZV07XG4gICAgICAvLyAgICAgaWYgKGRlcHMpIHN0YXRlbWVudHMgPSBzdGF0ZW1lbnRzLmNvbmNhdChkZXBzKTtcbiAgICAgIC8vICAgfVxuICAgICAgLy8gICBqcyA9IHN0YXRlbWVudHMuam9pbignO1xcbicpO1xuICAgICAgLy8gfSBlbHNlIHtcbiAgICAgIC8vICAganMgPSAnRXh0LnJlcXVpcmUoXCJFeHQuKlwiKSc7XG4gICAgICAvLyB9XG5cblxuXG4gICAgICAvLyBpZiAoZnMuZXhpc3RzU3luYyhwYXRoLmpvaW4oc2RrLCAnZXh0JykpKSB7XG4gICAgICAvLyAgIC8vIGxvY2FsIGNoZWNrb3V0IG9mIHRoZSBTREsgcmVwb1xuICAgICAgLy8gICBwYWNrYWdlRGlycy5wdXNoKHBhdGguam9pbignZXh0JywgJ3BhY2thZ2VzJykpO1xuICAgICAgLy8gICBzZGsgPSBwYXRoLmpvaW4oc2RrLCAnZXh0Jyk7XG4gICAgICAvLyB9XG5cblxuXG4gICAgICB2YXIgcGFybXMgPSBbXVxuICAgICAgaWYgKHRoaXMud2F0Y2gpIHsgcGFybXMgPSBbJ2FwcCcsICd3YXRjaCddIH1cbiAgICAgIGVsc2UgeyBwYXJtcyA9IFsnYXBwJywgJ2J1aWxkJ10gfVxuXG4gICAgICBpZiAodGhpcy5tYW5pZmVzdCA9PT0gbnVsbCB8fCBqcyAhPT0gdGhpcy5tYW5pZmVzdCkge1xuICAgICAgICB0aGlzLm1hbmlmZXN0ID0ganNcbiAgICAgICAgLy9yZWFkbGluZS5jdXJzb3JUbyhwcm9jZXNzLnN0ZG91dCwgMCk7Y29uc29sZS5sb2coYXBwICsgJ3RyZWUgc2hha2luZzogJyArIHRoaXMudHJlZVNoYWtpbmcpXG4gICAgICAgIGNvbnN0IG1hbmlmZXN0ID0gcGF0aC5qb2luKG91dHB1dCwgJ21hbmlmZXN0LmpzJylcbiAgICAgICAgZnMud3JpdGVGaWxlU3luYyhtYW5pZmVzdCwganMsICd1dGY4JylcbiAgICAgICAgcmVhZGxpbmUuY3Vyc29yVG8ocHJvY2Vzcy5zdGRvdXQsIDApO2NvbnNvbGUubG9nKGFwcCArIGBidWlsZGluZyBFeHRSZWFjdCBidW5kbGUgYXQ6ICR7b3V0cHV0fWApXG5cbiAgICAgICAgaWYgKHRoaXMud2F0Y2ggJiYgIXdhdGNoaW5nIHx8ICF0aGlzLndhdGNoKSB7XG4gICAgICAgICAgdmFyIG9wdGlvbnMgPSB7IGN3ZDogb3V0cHV0LCBzaWxlbnQ6IHRydWUsIHN0ZGlvOiAncGlwZScsIGVuY29kaW5nOiAndXRmLTgnfVxuICAgICAgICAgIHZhciB2ZXJib3NlID0gJ25vJ1xuICAgICAgICAgIGlmIChwcm9jZXNzLmVudi5FWFRSRUFDVF9WRVJCT1NFICA9PSAneWVzJykge1xuICAgICAgICAgICAgdmVyYm9zZSA9ICd5ZXMnXG4gICAgICAgICAgfVxuICAgICAgICAgIGV4ZWN1dGVBc3luYyhzZW5jaGEsIHBhcm1zLCBvcHRpb25zLCBjb21waWxhdGlvbiwgY21kRXJyb3JzLCB2ZXJib3NlKS50aGVuIChcbiAgICAgICAgICAgIGZ1bmN0aW9uKCkgeyBvbkJ1aWxkRG9uZSgpIH0sIFxuICAgICAgICAgICAgZnVuY3Rpb24ocmVhc29uKSB7IHJlc29sdmUocmVhc29uKSB9XG4gICAgICAgICAgKVxuICAgICAgICB9XG5cbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICByZWFkbGluZS5jdXJzb3JUbyhwcm9jZXNzLnN0ZG91dCwgMCk7Y29uc29sZS5sb2coYXBwICsgJ0V4dCByZWJ1aWxkIE5PVCBuZWVkZWQnKVxuICAgICAgICBvbkJ1aWxkRG9uZSgpXG4gICAgICB9XG5cbiAgICAgIC8vIHZhciBwYXJtc1xuICAgICAgLy8gaWYgKHRoaXMud2F0Y2gpIHtcbiAgICAgIC8vICAgaWYgKCF3YXRjaGluZykge1xuICAgICAgLy8gICAgIHBhcm1zID0gWydhcHAnLCAnd2F0Y2gnXVxuICAgICAgLy8gICB9XG4gICAgICAvLyAgIC8vIGlmICghY21kUmVidWlsZE5lZWRlZCkge1xuICAgICAgLy8gICAvLyAgIHJlYWRsaW5lLmN1cnNvclRvKHByb2Nlc3Muc3Rkb3V0LCAwKTtjb25zb2xlLmxvZyhhcHAgKyAnRXh0IHJlYnVpbGQgTk9UIG5lZWRlZCcpXG4gICAgICAvLyAgIC8vICAgb25CdWlsZERvbmUoKVxuICAgICAgLy8gICAvLyB9XG4gICAgICAvLyB9XG4gICAgICAvLyBlbHNlIHtcbiAgICAgIC8vICAgcGFybXMgPSBbJ2FwcCcsICdidWlsZCddXG4gICAgICAvLyB9XG4gICAgICAvLyBpZiAoY21kUmVidWlsZE5lZWRlZCkge1xuICAgICAgLy8gICB2YXIgb3B0aW9ucyA9IHsgY3dkOiBvdXRwdXQsIHNpbGVudDogdHJ1ZSwgc3RkaW86ICdwaXBlJywgZW5jb2Rpbmc6ICd1dGYtOCd9XG4gICAgICAvLyAgIGV4ZWN1dGVBc3luYyhzZW5jaGEsIHBhcm1zLCBvcHRpb25zLCBjb21waWxhdGlvbiwgY21kRXJyb3JzKS50aGVuKGZ1bmN0aW9uKCkge1xuICAgICAgLy8gICAgIG9uQnVpbGREb25lKClcbiAgICAgIC8vICAgfSwgZnVuY3Rpb24ocmVhc29uKXtcbiAgICAgIC8vICAgICByZXNvbHZlKHJlYXNvbilcbiAgICAgIC8vICAgfSlcbiAgICAgIC8vIH1cblxuXG4gICAgfSlcbiAgfVxuXG4gIC8qKlxuICAgKiBEZWZhdWx0IGNvbmZpZyBvcHRpb25zXG4gICAqIEBwcm90ZWN0ZWRcbiAgICogQHJldHVybiB7T2JqZWN0fVxuICAgKi9cbiAgZ2V0RGVmYXVsdE9wdGlvbnMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHBvcnQ6IDgwMTYsXG4gICAgICBidWlsZHM6IHt9LFxuICAgICAgZGVidWc6IGZhbHNlLFxuICAgICAgd2F0Y2g6IGZhbHNlLFxuICAgICAgdGVzdDogL1xcLihqfHQpc3g/JC8sXG5cbiAgICAgIC8qIGJlZ2luIHNpbmdsZSBidWlsZCBvbmx5ICovXG4gICAgICBvdXRwdXQ6ICdleHQtcmVhY3QnLFxuICAgICAgdG9vbGtpdDogJ21vZGVybicsXG4gICAgICBwYWNrYWdlczogbnVsbCxcbiAgICAgIHBhY2thZ2VEaXJzOiBbXSxcbiAgICAgIG92ZXJyaWRlczogW10sXG4gICAgICBhc3luY2hyb25vdXM6IGZhbHNlLFxuICAgICAgcHJvZHVjdGlvbjogZmFsc2UsXG4gICAgICBtYW5pZmVzdEV4dHJhY3RvcjogZXh0cmFjdEZyb21KU1gsXG4gICAgICB0cmVlU2hha2luZzogZmFsc2VcbiAgICAgIC8qIGVuZCBzaW5nbGUgYnVpbGQgb25seSAqL1xuICAgIH1cbiAgfVxuXG4gIHN1Y2NlZWRNb2R1bGUoY29tcGlsYXRpb24sIG1vZHVsZSkge1xuICAgIHRoaXMuY3VycmVudEZpbGUgPSBtb2R1bGUucmVzb3VyY2U7XG4gICAgaWYgKG1vZHVsZS5yZXNvdXJjZSAmJiBtb2R1bGUucmVzb3VyY2UubWF0Y2godGhpcy50ZXN0KSAmJiAhbW9kdWxlLnJlc291cmNlLm1hdGNoKC9ub2RlX21vZHVsZXMvKSAmJiAhbW9kdWxlLnJlc291cmNlLm1hdGNoKGAvZXh0LXJlYWN0JHtyZWFjdFZlcnNpb259L2ApKSB7XG4gICAgICBjb25zdCBkb1BhcnNlID0gKCkgPT4ge1xuICAgICAgICB0aGlzLmRlcGVuZGVuY2llc1t0aGlzLmN1cnJlbnRGaWxlXSA9IFtcbiAgICAgICAgICAuLi4odGhpcy5kZXBlbmRlbmNpZXNbdGhpcy5jdXJyZW50RmlsZV0gfHwgW10pLFxuICAgICAgICAgIC4uLnRoaXMubWFuaWZlc3RFeHRyYWN0b3IobW9kdWxlLl9zb3VyY2UuX3ZhbHVlLCBjb21waWxhdGlvbiwgbW9kdWxlLCByZWFjdFZlcnNpb24pXG4gICAgICAgIF1cbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLmRlYnVnKSB7XG4gICAgICAgIGRvUGFyc2UoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRyeSB7IGRvUGFyc2UoKTsgfSBjYXRjaCAoZSkgXG4gICAgICAgIHsgXG4gICAgICAgICAgY29uc29sZS5lcnJvcignXFxuZXJyb3IgcGFyc2luZyAnICsgdGhpcy5jdXJyZW50RmlsZSk7IFxuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZSk7IFxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrcyBlYWNoIGJ1aWxkIGNvbmZpZyBmb3IgbWlzc2luZy9pbnZhbGlkIHByb3BlcnRpZXNcbiAgICogQHBhcmFtIHtTdHJpbmd9IG5hbWUgVGhlIG5hbWUgb2YgdGhlIGJ1aWxkXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBidWlsZCBUaGUgYnVpbGQgY29uZmlnXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfdmFsaWRhdGVCdWlsZENvbmZpZyhuYW1lLCBidWlsZCkge1xuICAgIGxldCB7IHNkaywgcHJvZHVjdGlvbiB9ID0gYnVpbGQ7XG5cbiAgICBpZiAocHJvZHVjdGlvbikge1xuICAgICAgYnVpbGQudHJlZVNoYWtpbmcgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBpZiAoc2RrKSB7XG4gICAgICAvL2NvbXBpbGF0aW9uLmVycm9ycy5wdXNoKCBuZXcgRXJyb3IoY21kRXJyb3JzLmpvaW4oXCJcIikpIClcbiAgICAgIHRocm93IG5ldyBFcnJvcihgJHtjaGFsay5yZWQoJ1NESyBwYXJhbWV0ZXIgbm8gbG9uZ2VyIHN1cHBvcnRlZCB3aXRoIGV4dC1yZWFjdC13ZWJwYWNrLXBsdWdpbicpfSAgLSB1c2UgdGhlIEV4dCBKUyBucG0gcGFja2FnZXMgaW5zdGVhZGApO1xuXG4gICAgICAvLyBpZiAoIWZzLmV4aXN0c1N5bmMoc2RrKSkge1xuICAgICAgLy8gICAgIHRocm93IG5ldyBFcnJvcihgTm8gU0RLIGZvdW5kIGF0ICR7cGF0aC5yZXNvbHZlKHNkayl9LiAgRGlkIHlvdSBmb3IgZ2V0IHRvIGxpbmsvY29weSB5b3VyIEV4dCBKUyBTREsgdG8gdGhhdCBsb2NhdGlvbj9gKTtcbiAgICAgIC8vIH0gZWxzZSB7XG4gICAgICAvLyAgICAgLy9tamcgdGhpcyBuZWVkZWQ/IHRoaXMuX2FkZEV4dFJlYWN0UGFja2FnZShidWlsZClcbiAgICAgIC8vIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdHJ5IHtcbiAgICAgICAgYnVpbGQuc2RrID0gcGF0aC5kaXJuYW1lKHJlc29sdmUoJ0BzZW5jaGEvZXh0JywgeyBiYXNlZGlyOiBwcm9jZXNzLmN3ZCgpIH0pKVxuICAgICAgICBidWlsZC5wYWNrYWdlRGlycyA9IFsuLi4oYnVpbGQucGFja2FnZURpcnMgfHwgW10pLCBwYXRoLmRpcm5hbWUoYnVpbGQuc2RrKV07XG4gICAgICAgIGJ1aWxkLnBhY2thZ2VzID0gYnVpbGQucGFja2FnZXMgfHwgdGhpcy5fZmluZFBhY2thZ2VzKGJ1aWxkLnNkayk7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vdGhyb3cgbmV3IEVycm9yKGBAc2VuY2hhL2V4dC1tb2Rlcm4gbm90IGZvdW5kLiAgWW91IGNhbiBpbnN0YWxsIGl0IHdpdGggXCJucG0gaW5zdGFsbCAtLXNhdmUgQHNlbmNoYS9leHQtbW9kZXJuXCIgb3IsIGlmIHlvdSBoYXZlIGEgbG9jYWwgY29weSBvZiB0aGUgU0RLLCBzcGVjaWZ5IHRoZSBwYXRoIHRvIGl0IHVzaW5nIHRoZSBcInNka1wiIG9wdGlvbiBpbiBidWlsZCBcIiR7bmFtZX0uXCJgKTtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBAc2VuY2hhL2V4dCBub3QgZm91bmQuICBZb3UgY2FuIGluc3RhbGwgaXQgd2l0aCBcIm5wbSBpbnN0YWxsIC0tc2F2ZSBAc2VuY2hhL2V4dGApO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vIC8qKlxuICAvLyAgKiBBZGRzIHRoZSBFeHRSZWFjdCBwYWNrYWdlIGlmIHByZXNlbnQgYW5kIHRoZSB0b29sa2l0IGlzIG1vZGVyblxuICAvLyAgKiBAcGFyYW0ge09iamVjdH0gYnVpbGQgXG4gIC8vICAqL1xuICAvLyBfYWRkRXh0UmVhY3RQYWNrYWdlKGJ1aWxkKSB7XG4gIC8vICAgaWYgKGJ1aWxkLnRvb2xraXQgPT09ICdjbGFzc2ljJykgcmV0dXJuO1xuICAvLyAgIGlmIChmcy5leGlzdHNTeW5jKHBhdGguam9pbihidWlsZC5zZGssICdleHQnLCAnbW9kZXJuJywgJ3JlYWN0JykpIHx8ICAvLyByZXBvXG4gIC8vICAgICBmcy5leGlzdHNTeW5jKHBhdGguam9pbihidWlsZC5zZGssICdtb2Rlcm4nLCAncmVhY3QnKSkpIHsgLy8gcHJvZHVjdGlvbiBidWlsZFxuICAvLyAgICAgaWYgKCFidWlsZC5wYWNrYWdlcykge1xuICAvLyAgICAgICBidWlsZC5wYWNrYWdlcyA9IFtdO1xuICAvLyAgICAgfVxuICAvLyAgICAgYnVpbGQucGFja2FnZXMucHVzaCgncmVhY3QnKTtcbiAgLy8gICB9XG4gIC8vIH1cblxuICAvKipcbiAgICogUmV0dXJuIHRoZSBuYW1lcyBvZiBhbGwgRXh0UmVhY3QgcGFja2FnZXMgaW4gdGhlIHNhbWUgcGFyZW50IGRpcmVjdG9yeSBhcyBleHQtcmVhY3QgKHR5cGljYWxseSBub2RlX21vZHVsZXMvQHNlbmNoYSlcbiAgICogQHByaXZhdGVcbiAgICogQHBhcmFtIHtTdHJpbmd9IHNkayBQYXRoIHRvIGV4dC1yZWFjdFxuICAgKiBAcmV0dXJuIHtTdHJpbmdbXX1cbiAgICovXG4gIF9maW5kUGFja2FnZXMoc2RrKSB7XG4gICAgY29uc3QgbW9kdWxlc0RpciA9IHBhdGguam9pbihzZGssICcuLicpO1xuICAgIHJldHVybiBmcy5yZWFkZGlyU3luYyhtb2R1bGVzRGlyKVxuICAgICAgLy8gRmlsdGVyIG91dCBkaXJlY3RvcmllcyB3aXRob3V0ICdwYWNrYWdlLmpzb24nXG4gICAgICAuZmlsdGVyKGRpciA9PiBmcy5leGlzdHNTeW5jKHBhdGguam9pbihtb2R1bGVzRGlyLCBkaXIsICdwYWNrYWdlLmpzb24nKSkpXG4gICAgICAvLyBHZW5lcmF0ZSBhcnJheSBvZiBwYWNrYWdlIG5hbWVzXG4gICAgICAubWFwKGRpciA9PiB7XG4gICAgICAgICAgY29uc3QgcGFja2FnZUluZm8gPSBKU09OLnBhcnNlKGZzLnJlYWRGaWxlU3luYyhwYXRoLmpvaW4obW9kdWxlc0RpciwgZGlyLCAncGFja2FnZS5qc29uJykpKTtcbiAgICAgICAgICAvLyBEb24ndCBpbmNsdWRlIHRoZW1lIHR5cGUgcGFja2FnZXMuXG4gICAgICAgICAgaWYocGFja2FnZUluZm8uc2VuY2hhICYmIHBhY2thZ2VJbmZvLnNlbmNoYS50eXBlICE9PSAndGhlbWUnKSB7XG4gICAgICAgICAgICAgIHJldHVybiBwYWNrYWdlSW5mby5zZW5jaGEubmFtZTtcbiAgICAgICAgICB9XG4gICAgICB9KVxuICAgICAgLy8gUmVtb3ZlIGFueSB1bmRlZmluZWRzIGZyb20gbWFwXG4gICAgICAuZmlsdGVyKG5hbWUgPT4gbmFtZSk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgcGF0aCB0byB0aGUgc2VuY2hhIGNtZCBleGVjdXRhYmxlXG4gICAqIEBwcml2YXRlXG4gICAqIEByZXR1cm4ge1N0cmluZ31cbiAgICovXG4gIF9nZXRTZW5jaENtZFBhdGgoKSB7XG4gICAgdHJ5IHsgcmV0dXJuIHJlcXVpcmUoJ0BzZW5jaGEvY21kJykgfSBcbiAgICBjYXRjaCAoZSkgeyByZXR1cm4gJ3NlbmNoYScgfVxuICB9XG59XG5cblxuXG5cbiAgICAgIC8vIGlmICh0aGlzLndhdGNoKSB7XG4gICAgICAvLyAgIGlmICghd2F0Y2hpbmcpIHtcbiAgICAgIC8vICAgICB3YXRjaGluZyA9IGdhdGhlckVycm9ycyhmb3JrKHNlbmNoYSwgWydhbnQnLCAnd2F0Y2gnXSwgeyBjd2Q6IG91dHB1dCwgc2lsZW50OiB0cnVlIH0pKTtcbiAgICAgIC8vICAgICB3YXRjaGluZy5zdGRlcnIucGlwZShwcm9jZXNzLnN0ZGVycik7XG4gICAgICAvLyAgICAgd2F0Y2hpbmcuc3Rkb3V0LnBpcGUocHJvY2Vzcy5zdGRvdXQpO1xuICAgICAgLy8gICAgIHdhdGNoaW5nLnN0ZG91dC5vbignZGF0YScsIGRhdGEgPT4ge1xuICAgICAgLy8gICAgICAgaWYgKGRhdGEgJiYgZGF0YS50b1N0cmluZygpLm1hdGNoKC9XYWl0aW5nIGZvciBjaGFuZ2VzXFwuXFwuXFwuLykpIHtcbiAgICAgIC8vICAgICAgICAgb25CdWlsZERvbmUoKVxuICAgICAgLy8gICAgICAgfVxuICAgICAgLy8gICAgIH0pXG4gICAgICAvLyAgICAgd2F0Y2hpbmcub24oJ2V4aXQnLCBvbkJ1aWxkRG9uZSlcbiAgICAgIC8vICAgfVxuICAgICAgLy8gICBpZiAoIWNtZFJlYnVpbGROZWVkZWQpIHtcbiAgICAgIC8vICAgICByZWFkbGluZS5jdXJzb3JUbyhwcm9jZXNzLnN0ZG91dCwgMCk7Y29uc29sZS5sb2coYXBwICsgJ0V4dCByZWJ1aWxkIE5PVCBuZWVkZWQnKVxuICAgICAgLy8gICAgIG9uQnVpbGREb25lKClcbiAgICAgIC8vICAgfVxuICAgICAgLy8gICBlbHNlIHtcbiAgICAgIC8vICAgICAvL3JlYWRsaW5lLmN1cnNvclRvKHByb2Nlc3Muc3Rkb3V0LCAwKTtjb25zb2xlLmxvZyhhcHAgKyAnRXh0IHJlYnVpbGQgSVMgbmVlZGVkJylcbiAgICAgIC8vICAgfVxuICAgICAgLy8gfSBcbiAgICAgIC8vIGVsc2Uge1xuICAgICAgLy8gICBjb25zdCBidWlsZCA9IGdhdGhlckVycm9ycyhmb3JrKHNlbmNoYSwgWydhbnQnLCAnYnVpbGQnXSwgeyBzdGRpbzogJ2luaGVyaXQnLCBlbmNvZGluZzogJ3V0Zi04JywgY3dkOiBvdXRwdXQsIHNpbGVudDogZmFsc2UgfSkpO1xuICAgICAgLy8gICByZWFkbGluZS5jdXJzb3JUbyhwcm9jZXNzLnN0ZG91dCwgMCk7Y29uc29sZS5sb2coYXBwICsgJ3NlbmNoYSBhbnQgYnVpbGQnKVxuICAgICAgLy8gICBpZihidWlsZC5zdGRvdXQpIHsgYnVpbGQuc3Rkb3V0LnBpcGUocHJvY2Vzcy5zdGRvdXQpIH1cbiAgICAgIC8vICAgaWYoYnVpbGQuc3RkZXJyKSB7IGJ1aWxkLnN0ZGVyci5waXBlKHByb2Nlc3Muc3RkZXJyKSB9XG4gICAgICAvLyAgIGJ1aWxkLm9uKCdleGl0Jywgb25CdWlsZERvbmUpO1xuICAgICAgLy8gfVxuXG5cblxuLy8gY29uc3QgZ2F0aGVyRXJyb3JzMiA9IChjbWQpID0+IHtcbi8vICAgaWYgKGNtZC5zdGRvdXQpIHtcbi8vICAgICBjbWQuc3Rkb3V0Lm9uKCdkYXRhJywgZGF0YSA9PiB7XG4vLyAgICAgICBjb25zdCBtZXNzYWdlID0gZGF0YS50b1N0cmluZygpO1xuLy8gICAgICAgaWYgKG1lc3NhZ2UubWF0Y2goL15cXFtFUlJcXF0vKSkge1xuLy8gICAgICAgICBjbWRFcnJvcnMucHVzaChtZXNzYWdlLnJlcGxhY2UoL15cXFtFUlJcXF0gL2dpLCAnJykpO1xuLy8gICAgICAgfVxuLy8gICAgIH0pXG4vLyAgIH1cbi8vICAgcmV0dXJuIGNtZDtcbi8vIH1cblxuLy8gZnVuY3Rpb24gZ2F0aGVyRXJyb3JzIChjbWQpIHtcbi8vICAgaWYgKGNtZC5zdGRvdXQpIHtcbi8vICAgICBjbWQuc3Rkb3V0Lm9uKCdkYXRhJywgZGF0YSA9PiB7XG4vLyAgICAgICBjb25zdCBtZXNzYWdlID0gZGF0YS50b1N0cmluZygpO1xuLy8gICAgICAgaWYgKG1lc3NhZ2UubWF0Y2goL15cXFtFUlJcXF0vKSkge1xuLy8gICAgICAgICBjbWRFcnJvcnMucHVzaChtZXNzYWdlLnJlcGxhY2UoL15cXFtFUlJcXF0gL2dpLCAnJykpO1xuLy8gICAgICAgfVxuLy8gICAgIH0pXG4vLyAgIH1cbi8vICAgcmV0dXJuIGNtZFxuLy8gfVxuXG5cblxuXG5cblxuLy8gZnJvbSB0aGlzLmVtaXRcbiAgICAvLyB0aGUgZm9sbG93aW5nIGlzIG5lZWRlZCBmb3IgaHRtbC13ZWJwYWNrLXBsdWdpbiB0byBpbmNsdWRlIDxzY3JpcHQ+IGFuZCA8bGluaz4gdGFncyBmb3IgRXh0UmVhY3RcbiAgICAvLyBjb25zb2xlLmxvZygnY29tcGlsYXRpb24nKVxuICAgIC8vIGNvbnNvbGUubG9nKCcqKioqKioqKmNvbXBpbGF0aW9uLmNodW5rc1swXScpXG4gICAgLy8gY29uc29sZS5sb2coY29tcGlsYXRpb24uY2h1bmtzWzBdLmlkKVxuICAgIC8vIGNvbnNvbGUubG9nKHBhdGguam9pbih0aGlzLm91dHB1dCwgJ2V4dC5qcycpKVxuICAgIC8vIGNvbnN0IGpzQ2h1bmsgPSBjb21waWxhdGlvbi5hZGRDaHVuayhgJHt0aGlzLm91dHB1dH0tanNgKTtcbiAgICAvLyBqc0NodW5rLmhhc1J1bnRpbWUgPSBqc0NodW5rLmlzSW5pdGlhbCA9ICgpID0+IHRydWU7XG4gICAgLy8ganNDaHVuay5maWxlcy5wdXNoKHBhdGguam9pbih0aGlzLm91dHB1dCwgJ2V4dC5qcycpKTtcbiAgICAvLyBqc0NodW5rLmZpbGVzLnB1c2gocGF0aC5qb2luKHRoaXMub3V0cHV0LCAnZXh0LmNzcycpKTtcbiAgICAvLyBqc0NodW5rLmlkID0gJ2FhYWFwJzsgLy8gdGhpcyBmb3JjZXMgaHRtbC13ZWJwYWNrLXBsdWdpbiB0byBpbmNsdWRlIGV4dC5qcyBmaXJzdFxuICAgIC8vIGNvbnNvbGUubG9nKCcqKioqKioqKmNvbXBpbGF0aW9uLmNodW5rc1sxXScpXG4gICAgLy8gY29uc29sZS5sb2coY29tcGlsYXRpb24uY2h1bmtzWzFdLmlkKVxuXG4gICAgLy9pZiAodGhpcy5hc3luY2hyb25vdXMpIGNhbGxiYWNrKCk7XG4vLyAgICBjb25zb2xlLmxvZyhjYWxsYmFjaylcblxuLy8gaWYgKGlzV2VicGFjazQpIHtcbi8vICAgY29uc29sZS5sb2cocGF0aC5qb2luKHRoaXMub3V0cHV0LCAnZXh0LmpzJykpXG4vLyAgIGNvbnN0IHN0YXRzID0gZnMuc3RhdFN5bmMocGF0aC5qb2luKG91dHB1dFBhdGgsICdleHQuanMnKSlcbi8vICAgY29uc3QgZmlsZVNpemVJbkJ5dGVzID0gc3RhdHMuc2l6ZVxuLy8gICBjb21waWxhdGlvbi5hc3NldHNbJ2V4dC5qcyddID0ge1xuLy8gICAgIHNvdXJjZTogZnVuY3Rpb24oKSB7cmV0dXJuIGZzLnJlYWRGaWxlU3luYyhwYXRoLmpvaW4ob3V0cHV0UGF0aCwgJ2V4dC5qcycpKX0sXG4vLyAgICAgc2l6ZTogZnVuY3Rpb24oKSB7cmV0dXJuIGZpbGVTaXplSW5CeXRlc31cbi8vICAgfVxuLy8gICBjb25zb2xlLmxvZyhjb21waWxhdGlvbi5lbnRyeXBvaW50cylcblxuLy8gICB2YXIgZmlsZWxpc3QgPSAnSW4gdGhpcyBidWlsZDpcXG5cXG4nO1xuXG4vLyAgIC8vIExvb3AgdGhyb3VnaCBhbGwgY29tcGlsZWQgYXNzZXRzLFxuLy8gICAvLyBhZGRpbmcgYSBuZXcgbGluZSBpdGVtIGZvciBlYWNoIGZpbGVuYW1lLlxuLy8gICBmb3IgKHZhciBmaWxlbmFtZSBpbiBjb21waWxhdGlvbi5hc3NldHMpIHtcbi8vICAgICBmaWxlbGlzdCArPSAoJy0gJysgZmlsZW5hbWUgKydcXG4nKTtcbi8vICAgfVxuXG4vLyAgIC8vIEluc2VydCB0aGlzIGxpc3QgaW50byB0aGUgd2VicGFjayBidWlsZCBhcyBhIG5ldyBmaWxlIGFzc2V0OlxuLy8gICBjb21waWxhdGlvbi5hc3NldHNbJ2ZpbGVsaXN0Lm1kJ10gPSB7XG4vLyAgICAgc291cmNlKCkge1xuLy8gICAgICAgcmV0dXJuIGZpbGVsaXN0O1xuLy8gICAgIH0sXG4vLyAgICAgc2l6ZSgpIHtcbi8vICAgICAgIHJldHVybiBmaWxlbGlzdC5sZW5ndGg7XG4vLyAgICAgfVxuLy8gICB9XG4vLyB9XG5cblxuICAgIC8vIGlmIChjb21waWxlci5ob29rcykge1xuICAgIC8vICAgICAvLyBpbiAnZXh0cmVhY3QtY29tcGlsYXRpb24nXG4gICAgLy8gICAgIC8vaHR0cHM6Ly9naXRodWIuY29tL2pha2V0cmVudC9odG1sLXdlYnBhY2stdGVtcGxhdGVcbiAgICAvLyAgICAgLy9odHRwczovL2dpdGh1Yi5jb20vamFudGltb24vaHRtbC13ZWJwYWNrLXBsdWdpbiNcbiAgICAvLyAgICAgLy8gdGhlIGZvbGxvd2luZyBpcyBuZWVkZWQgZm9yIGh0bWwtd2VicGFjay1wbHVnaW4gdG8gaW5jbHVkZSA8c2NyaXB0PiBhbmQgPGxpbms+IHRhZ3MgZm9yIEV4dFJlYWN0XG4gICAgLy8gICAgIGNvbXBpbGVyLmhvb2tzLmh0bWxXZWJwYWNrUGx1Z2luQmVmb3JlSHRtbEdlbmVyYXRpb24udGFwQXN5bmMoXG4gICAgLy8gICAgICAgJ2V4dHJlYWN0LWh0bWxnZW5lcmF0aW9uJyxcbiAgICAvLyAgICAgICAoZGF0YSwgY2IpID0+IHtcbiAgICAvLyAgICAgICAgIHJlYWRsaW5lLmN1cnNvclRvKHByb2Nlc3Muc3Rkb3V0LCAwKTtjb25zb2xlLmxvZyhhcHAgKyAnZXh0cmVhY3QtaHRtbGdlbmVyYXRpb24nKVxuICAgIC8vICAgICAgICAgY29uc29sZS5sb2coJ2RhdGEuYXNzZXRzLmpzLmxlbmd0aCcpXG4gICAgLy8gICAgICAgICBjb25zb2xlLmxvZyhkYXRhLmFzc2V0cy5qcy5sZW5ndGgpXG4gICAgLy8gICAgICAgICBkYXRhLmFzc2V0cy5qcy51bnNoaWZ0KCdleHQtcmVhY3QvZXh0LmpzJylcbiAgICAvLyAgICAgICAgIGRhdGEuYXNzZXRzLmNzcy51bnNoaWZ0KCdleHQtcmVhY3QvZXh0LmNzcycpXG4gICAgLy8gICAgICAgICBjYihudWxsLCBkYXRhKVxuICAgIC8vICAgICAgIH1cbiAgICAvLyAgICAgKVxuICAgIC8vICAgfVxuXG4iXX0=