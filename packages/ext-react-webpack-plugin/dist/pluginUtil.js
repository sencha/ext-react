"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports._constructor = _constructor;
exports._compilation = _compilation;
exports._afterCompile = _afterCompile;
exports.emit = emit;
exports._prepareForBuild = _prepareForBuild;
exports._buildExtBundle = _buildExtBundle;
exports._done = _done;
exports.executeAsync = executeAsync;
exports.log = log;
exports.logv = logv;
exports._getApp = _getApp;
exports._getVersions = _getVersions;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//**********
function _constructor(options) {
  //const path = require('path')
  const fs = require('fs'); //const fsx = require('fs-extra')


  var thisVars = {};
  var thisOptions = {};
  var plugin = {};

  if (options.framework == undefined) {
    thisVars.pluginErrors = [];
    thisVars.pluginErrors.push('webpack config: framework parameter on ext-webpack-plugin is not defined - values: react, angular, extjs');
    plugin.vars = thisVars;
    return plugin;
  }

  const validateOptions = require('schema-utils');

  validateOptions(require(`./${options.framework}Util`).getValidateOptions(), options, '');
  thisVars = require(`./${options.framework}Util`).getDefaultVars();
  thisVars.framework = options.framework;

  switch (thisVars.framework) {
    case 'extjs':
      thisVars.pluginName = 'ext-webpack-plugin';
      break;

    case 'react':
      thisVars.pluginName = 'ext-react-webpack-plugin';
      break;

    case 'angular':
      thisVars.pluginName = 'ext-angular-webpack-plugin';
      break;

    default:
      thisVars.pluginName = 'ext-webpack-plugin';
  }

  thisVars.app = require('./pluginUtil')._getApp();
  logv(options, `pluginName - ${thisVars.pluginName}`);
  logv(options, `thisVars.app - ${thisVars.app}`);
  const rc = fs.existsSync(`.ext-${thisVars.framework}rc`) && JSON.parse(fs.readFileSync(`.ext-${thisVars.framework}rc`, 'utf-8')) || {};
  thisOptions = _objectSpread({}, require(`./${thisVars.framework}Util`).getDefaultOptions(), options, rc);
  logv(options, `thisOptions - ${JSON.stringify(thisOptions)}`);

  if (thisOptions.environment == 'production') {
    thisVars.production = true;
  } else {
    thisVars.production = false;
  }

  log(require('./pluginUtil')._getVersions(thisVars.app, thisVars.pluginName, thisVars.framework));
  log(thisVars.app + 'Building for ' + thisOptions.environment);
  log(thisVars.app + 'Treeshake is ' + thisOptions.treeshake);
  plugin.vars = thisVars;
  plugin.options = thisOptions;

  require('./pluginUtil').logv(options, 'FUNCTION constructor (end)');

  return plugin;
} //**********


function _compilation(compiler, compilation, vars, options) {
  try {
    require('./pluginUtil').logv(options, 'FUNCTION _compilation');

    const fsx = require('fs-extra');

    const fs = require('fs');

    const mkdirp = require('mkdirp');

    const path = require('path');

    const extAngularPackage = '@sencha/ext-angular';
    const extAngularFolder = 'ext-angular-prod';
    const extAngularModule = 'ext-angular.module';
    const pathToExtAngularModern = path.resolve(process.cwd(), `src/app/${extAngularFolder}`);
    var extComponents = [];

    if (vars.production) {
      if (options.framework == 'angular' && options.treeshake) {
        const packagePath = path.resolve(process.cwd(), 'node_modules/' + extAngularPackage);
        var files = fsx.readdirSync(`${packagePath}/lib`);
        files.forEach(fileName => {
          if (fileName && fileName.substr(0, 4) == 'ext-') {
            var end = fileName.substr(4).indexOf('.component');

            if (end >= 0) {
              extComponents.push(fileName.substring(4, end + 4));
            }
          }
        });

        try {
          const appModulePath = path.resolve(process.cwd(), 'src/app/app.module.ts');
          var js = fsx.readFileSync(appModulePath).toString();
          var newJs = js.replace(`import { ExtAngularModule } from '@sencha/ext-angular'`, `import { ExtAngularModule } from './ext-angular-prod/ext-angular.module'`);
          fsx.writeFileSync(appModulePath, newJs, 'utf-8', () => {
            return;
          });
          const mainPath = path.resolve(process.cwd(), 'src/main.ts');
          var jsMain = fsx.readFileSync(mainPath).toString();
          var newJsMain = jsMain.replace(`bootstrapModule(AppModule);`, `enableProdMode();bootstrapModule( AppModule );`);
          fsx.writeFileSync(mainPath, newJsMain, 'utf-8', () => {
            return;
          });

          if (!fs.existsSync(pathToExtAngularModern)) {
            mkdirp.sync(pathToExtAngularModern);

            const t = require('./artifacts').extAngularModule('', '', '');

            fsx.writeFileSync(`${pathToExtAngularModern}/${extAngularModule}.ts`, t, 'utf-8', () => {
              return;
            });
          }
        } catch (e) {
          console.log(e);
          compilation.errors.push('buildModule hook in _compilation: ' + e);
          return [];
        }
      }

      compilation.hooks.succeedModule.tap(`ext-succeed-module`, module => {
        //require('./pluginUtil').logv(options, 'HOOK succeedModule')
        if (module.resource && !module.resource.match(/node_modules/) && !module.resource.match(/\.html$/)) {
          vars.deps = [...(vars.deps || []), ...require(`./${vars.framework}Util`).extractFromSource(module, options, compilation, extComponents)];
        } // if (extComponents.length && module.resource && (module.resource.match(/\.(j|t)sx?$/) ||
        // options.framework == 'angular' && module.resource.match(/\.html$/)) &&
        // !module.resource.match(/node_modules/) && !module.resource.match(`/ext-{$options.framework}/build/`)) {
        //   vars.deps = [...(vars.deps || []), ...require(`./${vars.framework}Util`).extractFromSource(module, options, compilation, extComponents)]
        // }

      });

      if (options.framework == 'angular' && options.treeshake) {
        compilation.hooks.finishModules.tap(`ext-finish-modules`, modules => {
          require('./pluginUtil').logv(options, 'HOOK finishModules');

          const string = 'Ext.create({\"xtype\":\"';
          vars.deps.forEach(code => {
            var index = code.indexOf(string);

            if (index >= 0) {
              code = code.substring(index + string.length);
              var end = code.indexOf('\"');
              vars.usedExtComponents.push(code.substr(0, end));
            }
          });
          vars.usedExtComponents = [...new Set(vars.usedExtComponents)];
          const readFrom = path.resolve(process.cwd(), 'node_modules/' + extAngularPackage + '/src/lib');
          const writeToPath = pathToExtAngularModern;
          const baseContent = fsx.readFileSync(`${readFrom}/base.ts`).toString();
          fsx.writeFileSync(`${writeToPath}/base.ts`, baseContent, 'utf-8', () => {
            return;
          });
          var writeToPathWritten = false;
          var moduleVars = {
            imports: '',
            exports: '',
            declarations: ''
          };
          vars.usedExtComponents.forEach(xtype => {
            var capclassname = xtype.charAt(0).toUpperCase() + xtype.replace(/-/g, "_").slice(1);
            moduleVars.imports = moduleVars.imports + `import { Ext${capclassname}Component } from './ext-${xtype}.component';\n`;
            moduleVars.exports = moduleVars.exports + `    Ext${capclassname}Component,\n`;
            moduleVars.declarations = moduleVars.declarations + `    Ext${capclassname}Component,\n`;
            var classFile = `/ext-${xtype}.component.ts`;
            const contents = fsx.readFileSync(`${readFrom}${classFile}`).toString();
            fsx.writeFileSync(`${writeToPath}${classFile}`, contents, 'utf-8', () => {
              return;
            });
            writeToPathWritten = true;
          });

          if (writeToPathWritten) {
            var t = require('./artifacts').extAngularModule(moduleVars.imports, moduleVars.exports, moduleVars.declarations);

            fsx.writeFileSync(`${writeToPath}/${extAngularModule}.ts`, t, 'utf-8', () => {
              return;
            });
          }
        });
      }
    }

    if (options.framework != 'extjs' && !options.treeshake) {
      compilation.hooks.htmlWebpackPluginBeforeHtmlGeneration.tap(`ext-html-generation`, data => {
        logv(options, 'HOOK ext-html-generation');

        const path = require('path');

        var outputPath = '';

        if (compiler.options.devServer) {
          if (compiler.outputPath === '/') {
            outputPath = path.join(compiler.options.devServer.contentBase, outputPath);
          } else {
            if (compiler.options.devServer.contentBase == undefined) {
              outputPath = 'build';
            } else {
              outputPath = '';
            }
          }
        } else {
          outputPath = 'build';
        }

        outputPath = outputPath.replace(process.cwd(), '').trim();
        var jsPath = path.join(outputPath, vars.extPath, 'ext.js');
        var cssPath = path.join(outputPath, vars.extPath, 'ext.css');
        data.assets.js.unshift(jsPath);
        data.assets.css.unshift(cssPath);
        log(vars.app + `Adding ${jsPath} and ${cssPath} to index.html`);
      });
    } else {
      logv(options, 'skipped HOOK ext-html-generation');
    }
  } catch (e) {
    require('./pluginUtil').logv(options, e);

    compilation.errors.push('_compilation: ' + e);
  }
} //**********


function _afterCompile(compiler, compilation, vars, options) {
  require('./pluginUtil').logv(options, 'FUNCTION _afterCompile');
} //**********


function emit(_x, _x2, _x3, _x4, _x5) {
  return _emit.apply(this, arguments);
} //**********


function _emit() {
  _emit = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(compiler, compilation, vars, options, callback) {
    var log, logv, app, framework, path, _buildExtBundle, outputPath, command, parms;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          log = require('./pluginUtil').log;
          logv = require('./pluginUtil').logv;
          logv(options, 'FUNCTION emit');
          app = vars.app;
          framework = vars.framework;
          path = require('path');
          _buildExtBundle = require('./pluginUtil')._buildExtBundle;
          outputPath = path.join(compiler.outputPath, vars.extPath);

          if (compiler.outputPath === '/' && compiler.options.devServer) {
            outputPath = path.join(compiler.options.devServer.contentBase, outputPath);
          }

          logv(options, 'outputPath: ' + outputPath);
          logv(options, 'framework: ' + framework);

          if (!(options.emit == true)) {
            _context.next = 29;
            break;
          }

          if (framework != 'extjs') {
            _prepareForBuild(app, vars, options, outputPath, compilation);
          } else {
            if (options.framework == 'angular' && !options.treeshake) {
              require(`./${framework}Util`)._prepareForBuild(app, vars, options, outputPath, compilation);
            } else {
              require(`./${framework}Util`)._prepareForBuild(app, vars, options, outputPath, compilation);
            }
          }

          command = '';

          if (options.watch == 'yes' && vars.production == false) {
            command = 'watch';
          } else {
            command = 'build';
          }

          if (!(vars.rebuild == true)) {
            _context.next = 26;
            break;
          }

          parms = [];

          if (options.profile == undefined || options.profile == '' || options.profile == null) {
            if (command == 'build') {
              parms = ['app', command, options.environment];
            } else {
              parms = ['app', command, '--web-server', 'false', options.environment];
            }
          } else {
            if (command == 'build') {
              parms = ['app', command, options.profile, options.environment];
            } else {
              parms = ['app', command, '--web-server', 'false', options.profile, options.environment];
            }
          }

          if (!(vars.watchStarted == false)) {
            _context.next = 23;
            break;
          }

          _context.next = 22;
          return _buildExtBundle(app, compilation, outputPath, parms, options);

        case 22:
          vars.watchStarted = true;

        case 23:
          callback();
          _context.next = 27;
          break;

        case 26:
          callback();

        case 27:
          _context.next = 31;
          break;

        case 29:
          log(`${vars.app}FUNCTION emit not run`);
          callback();

        case 31:
          _context.next = 38;
          break;

        case 33:
          _context.prev = 33;
          _context.t0 = _context["catch"](0);

          require('./pluginUtil').logv(options, _context.t0);

          compilation.errors.push('emit: ' + _context.t0);
          callback();

        case 38:
        case "end":
          return _context.stop();
      }
    }, _callee, this, [[0, 33]]);
  }));
  return _emit.apply(this, arguments);
}

function _prepareForBuild(app, vars, options, output, compilation) {
  try {
    logv(options, 'FUNCTION _prepareForBuild');

    const rimraf = require('rimraf');

    const mkdirp = require('mkdirp');

    const fsx = require('fs-extra');

    const fs = require('fs');

    const path = require('path');

    var packages = options.packages;
    var toolkit = options.toolkit;
    var theme = options.theme;
    theme = theme || (toolkit === 'classic' ? 'theme-triton' : 'theme-material');
    logv(options, 'firstTime: ' + vars.firstTime);

    if (vars.firstTime) {
      rimraf.sync(output);
      mkdirp.sync(output);

      const buildXML = require('./artifacts').buildXML;

      const createAppJson = require('./artifacts').createAppJson;

      const createWorkspaceJson = require('./artifacts').createWorkspaceJson;

      const createJSDOMEnvironment = require('./artifacts').createJSDOMEnvironment;

      fs.writeFileSync(path.join(output, 'build.xml'), buildXML(vars.production, options, output), 'utf8');
      fs.writeFileSync(path.join(output, 'app.json'), createAppJson(theme, packages, toolkit, options, output), 'utf8');
      fs.writeFileSync(path.join(output, 'jsdom-environment.js'), createJSDOMEnvironment(options, output), 'utf8');
      fs.writeFileSync(path.join(output, 'workspace.json'), createWorkspaceJson(options, output), 'utf8');

      if (vars.framework == 'angular') {
        //because of a problem in colorpicker
        if (fs.existsSync(path.join(process.cwd(), 'ext-angular/ux/'))) {
          var fromPath = path.join(process.cwd(), 'ext-angular/');
          var toPath = path.join(output);
          fsx.copySync(fromPath, toPath);
          log(app + 'Copying (ux) ' + fromPath.replace(process.cwd(), '') + ' to: ' + toPath.replace(process.cwd(), ''));
        }

        if (fs.existsSync(path.join(process.cwd(), 'ext-angular/packages/'))) {
          var fromPath = path.join(process.cwd(), 'ext-angular/');
          var toPath = path.join(output);
          fsx.copySync(fromPath, toPath);
          log(app + 'Copying ' + fromPath.replace(process.cwd(), '') + ' to: ' + toPath.replace(process.cwd(), ''));
        }

        if (fs.existsSync(path.join(process.cwd(), 'ext-angular/overrides/'))) {
          var fromPath = path.join(process.cwd(), 'ext-angular/');
          var toPath = path.join(output);
          fsx.copySync(fromPath, toPath);
          log(app + 'Copying ' + fromPath.replace(process.cwd(), '') + ' to: ' + toPath.replace(process.cwd(), ''));
        }
      }

      if (vars.framework == 'react') {
        if (fs.existsSync(path.join(process.cwd(), 'ext-react/packages/'))) {
          var fromPath = path.join(process.cwd(), 'ext-react/packages/');
          var toPath = path.join(output, 'packages');
          fsx.copySync(fromPath, toPath);
          log(app + 'Copying ' + fromPath.replace(process.cwd(), '') + ' to: ' + toPath.replace(process.cwd(), ''));
        }

        if (fs.existsSync(path.join(process.cwd(), 'ext-react/overrides/'))) {
          var fromPath = path.join(process.cwd(), 'ext-react/overrides/');
          var toPath = path.join(output, 'overrides');
          fsx.copySync(fromPath, toPath);
          log(app + 'Copying ' + fromPath.replace(process.cwd(), '') + ' to: ' + toPath.replace(process.cwd(), ''));
        }
      }

      if (fs.existsSync(path.join(process.cwd(), 'resources/'))) {
        var fromResources = path.join(process.cwd(), 'resources/');
        var toResources = path.join(output, '../resources');
        fsx.copySync(fromResources, toResources);
        log(app + 'Copying ' + fromResources.replace(process.cwd(), '') + ' to: ' + toResources.replace(process.cwd(), ''));
      }

      if (fs.existsSync(path.join(process.cwd(), 'packages/'))) {
        var fromPackages = path.join(process.cwd(), 'packages/');
        var toPackages = path.join(output, 'packages');
        fsx.copySync(fromPackages, toPackages);
        log(app + 'Copying ' + fromPackages.replace(process.cwd(), '') + ' to: ' + toPackages.replace(process.cwd(), ''));
      }

      if (fs.existsSync(path.join(process.cwd(), 'overrides/'))) {
        var fromPath = path.join(process.cwd(), 'overrides/');
        var toPath = path.join(output, 'overrides');
        fsx.copySync(fromPath, toPath);
        log(app + 'Copying ' + fromPath.replace(process.cwd(), '') + ' to: ' + toPath.replace(process.cwd(), ''));
      }
    }

    vars.firstTime = false;
    var js = '';

    if (vars.production) {
      if (!vars.deps.includes('Ext.require("Ext.layout.*");\n')) {
        vars.deps.push('Ext.require("Ext.layout.*");\n');
      }

      js = vars.deps.join(';\n');
    } else {
      js = 'Ext.require("Ext.*")';
    }

    if (vars.manifest === null || js !== vars.manifest) {
      vars.manifest = js;
      const manifest = path.join(output, 'manifest.js');
      fs.writeFileSync(manifest, js, 'utf8');
      vars.rebuild = true;
      var bundleDir = output.replace(process.cwd(), '');

      if (bundleDir.trim() == '') {
        bundleDir = './';
      }

      log(app + 'Building Ext bundle at: ' + bundleDir);
    } else {
      vars.rebuild = false;
      log(app + 'Ext rebuild NOT needed');
    }
  } catch (e) {
    require('./pluginUtil').logv(options, e);

    compilation.errors.push('_prepareForBuild: ' + e);
  }
} //**********


function _buildExtBundle(app, compilation, outputPath, parms, options) {
  try {
    const fs = require('fs');

    const logv = require('./pluginUtil').logv;

    logv(options, 'FUNCTION _buildExtBundle');
    let sencha;

    try {
      sencha = require('@sencha/cmd');
    } catch (e) {
      sencha = 'sencha';
    }

    if (fs.existsSync(sencha)) {
      logv(options, 'sencha folder exists');
    } else {
      logv(options, 'sencha folder DOES NOT exist');
    }

    return new Promise((resolve, reject) => {
      const onBuildDone = () => {
        logv(options, 'onBuildDone');
        resolve();
      };

      var opts = {
        cwd: outputPath,
        silent: true,
        stdio: 'pipe',
        encoding: 'utf-8'
      };
      executeAsync(app, sencha, parms, opts, compilation, options).then(function () {
        onBuildDone();
      }, function (reason) {
        reject(reason);
      });
    });
  } catch (e) {
    console.log('e');

    require('./pluginUtil').logv(options, e);

    compilation.errors.push('_buildExtBundle: ' + e);
    callback();
  }
} //**********


function _done(vars, options) {
  try {
    const log = require('./pluginUtil').log;

    const logv = require('./pluginUtil').logv;

    logv(options, 'FUNCTION _done');

    if (vars.production && !options.treeshake && options.framework == 'angular') {
      require(`./${framework}Util`)._done(vars, options);
    }

    try {
      if (options.browser == true && options.watch == 'yes' && vars.production == false) {
        if (vars.browserCount == 0) {
          var url = 'http://localhost:' + options.port;

          require('./pluginUtil').log(vars.app + `Opening browser at ${url}`);

          vars.browserCount++;

          const opn = require('opn');

          opn(url);
        }
      }
    } catch (e) {
      console.log(e); //compilation.errors.push('show browser window - ext-done: ' + e)
    }
  } catch (e) {
    require('./pluginUtil').logv(options, e);
  }
} //**********


function executeAsync(_x6, _x7, _x8, _x9, _x10, _x11) {
  return _executeAsync.apply(this, arguments);
}

function _executeAsync() {
  _executeAsync = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(app, command, parms, opts, compilation, options) {
    var DEFAULT_SUBSTRS, substrings, chalk, crossSpawn, log;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          //const DEFAULT_SUBSTRS = ['[INF] Loading', '[INF] Processing', '[LOG] Fashion build complete', '[ERR]', '[WRN]', "[INF] Server", "[INF] Writing", "[INF] Loading Build", "[INF] Waiting", "[LOG] Fashion waiting"];
          DEFAULT_SUBSTRS = ["[INF] xServer", '[INF] Loading', '[INF] Append', '[INF] Processing', '[INF] Processing Build', '[LOG] Fashion build complete', '[ERR]', '[WRN]', "[INF] Writing", "[INF] Loading Build", "[INF] Waiting", "[LOG] Fashion waiting"];
          substrings = DEFAULT_SUBSTRS;
          chalk = require('chalk');
          crossSpawn = require('cross-spawn');
          log = require('./pluginUtil').log;
          logv(options, 'FUNCTION executeAsync');
          _context2.next = 9;
          return new Promise((resolve, reject) => {
            logv(options, `command - ${command}`);
            logv(options, `parms - ${parms}`);
            logv(options, `opts - ${JSON.stringify(opts)}`);
            let child = crossSpawn(command, parms, opts);
            child.on('close', (code, signal) => {
              logv(options, `on close: ` + code);

              if (code === 0) {
                resolve(0);
              } else {
                compilation.errors.push(new Error(code));
                resolve(0);
              }
            });
            child.on('error', error => {
              logv(options, `on error`);
              compilation.errors.push(error);
              resolve(0);
            });
            child.stdout.on('data', data => {
              var str = data.toString().replace(/\r?\n|\r/g, " ").trim();
              logv(options, `${str}`);

              if (data && data.toString().match(/waiting for changes\.\.\./)) {
                resolve(0);
              } else {
                if (substrings.some(function (v) {
                  return data.indexOf(v) >= 0;
                })) {
                  str = str.replace("[INF]", "");
                  str = str.replace("[LOG]", "");
                  str = str.replace(process.cwd(), '').trim();

                  if (str.includes("[ERR]")) {
                    compilation.errors.push(app + str.replace(/^\[ERR\] /gi, ''));
                    str = str.replace("[ERR]", `${chalk.red("[ERR]")}`);
                  }

                  log(`${app}${str}`);
                }
              }
            });
            child.stderr.on('data', data => {
              logv(options, `error on close: ` + data);
              var str = data.toString().replace(/\r?\n|\r/g, " ").trim();
              var strJavaOpts = "Picked up _JAVA_OPTIONS";
              var includes = str.includes(strJavaOpts);

              if (!includes) {
                console.log(`${app} ${chalk.red("[ERR]")} ${str}`);
              }
            });
          });

        case 9:
          _context2.next = 16;
          break;

        case 11:
          _context2.prev = 11;
          _context2.t0 = _context2["catch"](0);

          require('./pluginUtil').logv(options, _context2.t0);

          compilation.errors.push('executeAsync: ' + _context2.t0);
          callback();

        case 16:
        case "end":
          return _context2.stop();
      }
    }, _callee2, this, [[0, 11]]);
  }));
  return _executeAsync.apply(this, arguments);
}

function log(s) {
  require('readline').cursorTo(process.stdout, 0);

  try {
    process.stdout.clearLine();
  } catch (e) {}

  process.stdout.write(s);
  process.stdout.write('\n');
}

function logv(options, s) {
  if (options.verbose == 'yes') {
    require('readline').cursorTo(process.stdout, 0);

    try {
      process.stdout.clearLine();
    } catch (e) {}

    process.stdout.write(`-verbose: ${s}`);
    process.stdout.write('\n');
  }
}

function _getApp() {
  var chalk = require('chalk');

  var prefix = ``;

  const platform = require('os').platform();

  if (platform == 'darwin') {
    prefix = `ℹ ｢ext｣:`;
  } else {
    prefix = `i [ext]:`;
  }

  return `${chalk.green(prefix)} `;
}

function _getVersions(app, pluginName, frameworkName) {
  const path = require('path');

  const fs = require('fs');

  var v = {};
  var pluginPath = path.resolve(process.cwd(), 'node_modules/@sencha', pluginName);
  var pluginPkg = fs.existsSync(pluginPath + '/package.json') && JSON.parse(fs.readFileSync(pluginPath + '/package.json', 'utf-8')) || {};
  v.pluginVersion = pluginPkg.version;
  v._resolved = pluginPkg._resolved;

  if (v._resolved == undefined) {
    v.edition = `Commercial`;
  } else {
    if (-1 == v._resolved.indexOf('community')) {
      v.edition = `Commercial`;
    } else {
      v.edition = `Community`;
    }
  }

  var webpackPath = path.resolve(process.cwd(), 'node_modules/webpack');
  var webpackPkg = fs.existsSync(webpackPath + '/package.json') && JSON.parse(fs.readFileSync(webpackPath + '/package.json', 'utf-8')) || {};
  v.webpackVersion = webpackPkg.version;
  var extPath = path.resolve(process.cwd(), 'node_modules/@sencha/ext');
  var extPkg = fs.existsSync(extPath + '/package.json') && JSON.parse(fs.readFileSync(extPath + '/package.json', 'utf-8')) || {};
  v.extVersion = extPkg.sencha.version;
  var cmdPath = path.resolve(process.cwd(), `node_modules/@sencha/cmd`);
  var cmdPkg = fs.existsSync(cmdPath + '/package.json') && JSON.parse(fs.readFileSync(cmdPath + '/package.json', 'utf-8')) || {};
  v.cmdVersion = cmdPkg.version_full;

  if (v.cmdVersion == undefined) {
    var cmdPath = path.resolve(process.cwd(), `node_modules/@sencha/${pluginName}/node_modules/@sencha/cmd`);
    var cmdPkg = fs.existsSync(cmdPath + '/package.json') && JSON.parse(fs.readFileSync(cmdPath + '/package.json', 'utf-8')) || {};
    v.cmdVersion = cmdPkg.version_full;
  }

  var frameworkInfo = '';

  if (frameworkName != undefined && frameworkName != 'extjs') {
    var frameworkPath = '';

    if (frameworkName == 'react') {
      frameworkPath = path.resolve(process.cwd(), 'node_modules/react');
    }

    if (frameworkName == 'angular') {
      frameworkPath = path.resolve(process.cwd(), 'node_modules/@angular/core');
    }

    var frameworkPkg = fs.existsSync(frameworkPath + '/package.json') && JSON.parse(fs.readFileSync(frameworkPath + '/package.json', 'utf-8')) || {};
    v.frameworkVersion = frameworkPkg.version;
    frameworkInfo = ', ' + frameworkName + ' v' + v.frameworkVersion;
  }

  return app + 'ext-webpack-plugin v' + v.pluginVersion + ', Ext JS v' + v.extVersion + ' ' + v.edition + ' Edition, Sencha Cmd v' + v.cmdVersion + ', webpack v' + v.webpackVersion + frameworkInfo;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9wbHVnaW5VdGlsLmpzIl0sIm5hbWVzIjpbIl9jb25zdHJ1Y3RvciIsIm9wdGlvbnMiLCJmcyIsInJlcXVpcmUiLCJ0aGlzVmFycyIsInRoaXNPcHRpb25zIiwicGx1Z2luIiwiZnJhbWV3b3JrIiwidW5kZWZpbmVkIiwicGx1Z2luRXJyb3JzIiwicHVzaCIsInZhcnMiLCJ2YWxpZGF0ZU9wdGlvbnMiLCJnZXRWYWxpZGF0ZU9wdGlvbnMiLCJnZXREZWZhdWx0VmFycyIsInBsdWdpbk5hbWUiLCJhcHAiLCJfZ2V0QXBwIiwibG9ndiIsInJjIiwiZXhpc3RzU3luYyIsIkpTT04iLCJwYXJzZSIsInJlYWRGaWxlU3luYyIsImdldERlZmF1bHRPcHRpb25zIiwic3RyaW5naWZ5IiwiZW52aXJvbm1lbnQiLCJwcm9kdWN0aW9uIiwibG9nIiwiX2dldFZlcnNpb25zIiwidHJlZXNoYWtlIiwiX2NvbXBpbGF0aW9uIiwiY29tcGlsZXIiLCJjb21waWxhdGlvbiIsImZzeCIsIm1rZGlycCIsInBhdGgiLCJleHRBbmd1bGFyUGFja2FnZSIsImV4dEFuZ3VsYXJGb2xkZXIiLCJleHRBbmd1bGFyTW9kdWxlIiwicGF0aFRvRXh0QW5ndWxhck1vZGVybiIsInJlc29sdmUiLCJwcm9jZXNzIiwiY3dkIiwiZXh0Q29tcG9uZW50cyIsInBhY2thZ2VQYXRoIiwiZmlsZXMiLCJyZWFkZGlyU3luYyIsImZvckVhY2giLCJmaWxlTmFtZSIsInN1YnN0ciIsImVuZCIsImluZGV4T2YiLCJzdWJzdHJpbmciLCJhcHBNb2R1bGVQYXRoIiwianMiLCJ0b1N0cmluZyIsIm5ld0pzIiwicmVwbGFjZSIsIndyaXRlRmlsZVN5bmMiLCJtYWluUGF0aCIsImpzTWFpbiIsIm5ld0pzTWFpbiIsInN5bmMiLCJ0IiwiZSIsImNvbnNvbGUiLCJlcnJvcnMiLCJob29rcyIsInN1Y2NlZWRNb2R1bGUiLCJ0YXAiLCJtb2R1bGUiLCJyZXNvdXJjZSIsIm1hdGNoIiwiZGVwcyIsImV4dHJhY3RGcm9tU291cmNlIiwiZmluaXNoTW9kdWxlcyIsIm1vZHVsZXMiLCJzdHJpbmciLCJjb2RlIiwiaW5kZXgiLCJsZW5ndGgiLCJ1c2VkRXh0Q29tcG9uZW50cyIsIlNldCIsInJlYWRGcm9tIiwid3JpdGVUb1BhdGgiLCJiYXNlQ29udGVudCIsIndyaXRlVG9QYXRoV3JpdHRlbiIsIm1vZHVsZVZhcnMiLCJpbXBvcnRzIiwiZXhwb3J0cyIsImRlY2xhcmF0aW9ucyIsInh0eXBlIiwiY2FwY2xhc3NuYW1lIiwiY2hhckF0IiwidG9VcHBlckNhc2UiLCJzbGljZSIsImNsYXNzRmlsZSIsImNvbnRlbnRzIiwiaHRtbFdlYnBhY2tQbHVnaW5CZWZvcmVIdG1sR2VuZXJhdGlvbiIsImRhdGEiLCJvdXRwdXRQYXRoIiwiZGV2U2VydmVyIiwiam9pbiIsImNvbnRlbnRCYXNlIiwidHJpbSIsImpzUGF0aCIsImV4dFBhdGgiLCJjc3NQYXRoIiwiYXNzZXRzIiwidW5zaGlmdCIsImNzcyIsIl9hZnRlckNvbXBpbGUiLCJlbWl0IiwiY2FsbGJhY2siLCJfYnVpbGRFeHRCdW5kbGUiLCJfcHJlcGFyZUZvckJ1aWxkIiwiY29tbWFuZCIsIndhdGNoIiwicmVidWlsZCIsInBhcm1zIiwicHJvZmlsZSIsIndhdGNoU3RhcnRlZCIsIm91dHB1dCIsInJpbXJhZiIsInBhY2thZ2VzIiwidG9vbGtpdCIsInRoZW1lIiwiZmlyc3RUaW1lIiwiYnVpbGRYTUwiLCJjcmVhdGVBcHBKc29uIiwiY3JlYXRlV29ya3NwYWNlSnNvbiIsImNyZWF0ZUpTRE9NRW52aXJvbm1lbnQiLCJmcm9tUGF0aCIsInRvUGF0aCIsImNvcHlTeW5jIiwiZnJvbVJlc291cmNlcyIsInRvUmVzb3VyY2VzIiwiZnJvbVBhY2thZ2VzIiwidG9QYWNrYWdlcyIsImluY2x1ZGVzIiwibWFuaWZlc3QiLCJidW5kbGVEaXIiLCJzZW5jaGEiLCJQcm9taXNlIiwicmVqZWN0Iiwib25CdWlsZERvbmUiLCJvcHRzIiwic2lsZW50Iiwic3RkaW8iLCJlbmNvZGluZyIsImV4ZWN1dGVBc3luYyIsInRoZW4iLCJyZWFzb24iLCJfZG9uZSIsImJyb3dzZXIiLCJicm93c2VyQ291bnQiLCJ1cmwiLCJwb3J0Iiwib3BuIiwiREVGQVVMVF9TVUJTVFJTIiwic3Vic3RyaW5ncyIsImNoYWxrIiwiY3Jvc3NTcGF3biIsImNoaWxkIiwib24iLCJzaWduYWwiLCJFcnJvciIsImVycm9yIiwic3Rkb3V0Iiwic3RyIiwic29tZSIsInYiLCJyZWQiLCJzdGRlcnIiLCJzdHJKYXZhT3B0cyIsInMiLCJjdXJzb3JUbyIsImNsZWFyTGluZSIsIndyaXRlIiwidmVyYm9zZSIsInByZWZpeCIsInBsYXRmb3JtIiwiZ3JlZW4iLCJmcmFtZXdvcmtOYW1lIiwicGx1Z2luUGF0aCIsInBsdWdpblBrZyIsInBsdWdpblZlcnNpb24iLCJ2ZXJzaW9uIiwiX3Jlc29sdmVkIiwiZWRpdGlvbiIsIndlYnBhY2tQYXRoIiwid2VicGFja1BrZyIsIndlYnBhY2tWZXJzaW9uIiwiZXh0UGtnIiwiZXh0VmVyc2lvbiIsImNtZFBhdGgiLCJjbWRQa2ciLCJjbWRWZXJzaW9uIiwidmVyc2lvbl9mdWxsIiwiZnJhbWV3b3JrSW5mbyIsImZyYW1ld29ya1BhdGgiLCJmcmFtZXdvcmtQa2ciLCJmcmFtZXdvcmtWZXJzaW9uIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ08sU0FBU0EsWUFBVCxDQUFzQkMsT0FBdEIsRUFBK0I7QUFDcEM7QUFDQSxRQUFNQyxFQUFFLEdBQUdDLE9BQU8sQ0FBQyxJQUFELENBQWxCLENBRm9DLENBR3BDOzs7QUFFQSxNQUFJQyxRQUFRLEdBQUcsRUFBZjtBQUNBLE1BQUlDLFdBQVcsR0FBRyxFQUFsQjtBQUNBLE1BQUlDLE1BQU0sR0FBRyxFQUFiOztBQUVBLE1BQUlMLE9BQU8sQ0FBQ00sU0FBUixJQUFxQkMsU0FBekIsRUFBb0M7QUFDbENKLElBQUFBLFFBQVEsQ0FBQ0ssWUFBVCxHQUF3QixFQUF4QjtBQUNBTCxJQUFBQSxRQUFRLENBQUNLLFlBQVQsQ0FBc0JDLElBQXRCLENBQTJCLDBHQUEzQjtBQUNBSixJQUFBQSxNQUFNLENBQUNLLElBQVAsR0FBY1AsUUFBZDtBQUNBLFdBQU9FLE1BQVA7QUFDRDs7QUFFRCxRQUFNTSxlQUFlLEdBQUdULE9BQU8sQ0FBQyxjQUFELENBQS9COztBQUNBUyxFQUFBQSxlQUFlLENBQUNULE9BQU8sQ0FBRSxLQUFJRixPQUFPLENBQUNNLFNBQVUsTUFBeEIsQ0FBUCxDQUFzQ00sa0JBQXRDLEVBQUQsRUFBNkRaLE9BQTdELEVBQXNFLEVBQXRFLENBQWY7QUFDQUcsRUFBQUEsUUFBUSxHQUFHRCxPQUFPLENBQUUsS0FBSUYsT0FBTyxDQUFDTSxTQUFVLE1BQXhCLENBQVAsQ0FBc0NPLGNBQXRDLEVBQVg7QUFDQVYsRUFBQUEsUUFBUSxDQUFDRyxTQUFULEdBQXFCTixPQUFPLENBQUNNLFNBQTdCOztBQUNBLFVBQU9ILFFBQVEsQ0FBQ0csU0FBaEI7QUFDRSxTQUFLLE9BQUw7QUFDRUgsTUFBQUEsUUFBUSxDQUFDVyxVQUFULEdBQXNCLG9CQUF0QjtBQUNBOztBQUNGLFNBQUssT0FBTDtBQUNFWCxNQUFBQSxRQUFRLENBQUNXLFVBQVQsR0FBc0IsMEJBQXRCO0FBQ0E7O0FBQ0YsU0FBSyxTQUFMO0FBQ0VYLE1BQUFBLFFBQVEsQ0FBQ1csVUFBVCxHQUFzQiw0QkFBdEI7QUFDQTs7QUFDRjtBQUNFWCxNQUFBQSxRQUFRLENBQUNXLFVBQVQsR0FBc0Isb0JBQXRCO0FBWEo7O0FBY0FYLEVBQUFBLFFBQVEsQ0FBQ1ksR0FBVCxHQUFlYixPQUFPLENBQUMsY0FBRCxDQUFQLENBQXdCYyxPQUF4QixFQUFmO0FBQ0FDLEVBQUFBLElBQUksQ0FBQ2pCLE9BQUQsRUFBVyxnQkFBZUcsUUFBUSxDQUFDVyxVQUFXLEVBQTlDLENBQUo7QUFDQUcsRUFBQUEsSUFBSSxDQUFDakIsT0FBRCxFQUFXLGtCQUFpQkcsUUFBUSxDQUFDWSxHQUFJLEVBQXpDLENBQUo7QUFFQSxRQUFNRyxFQUFFLEdBQUlqQixFQUFFLENBQUNrQixVQUFILENBQWUsUUFBT2hCLFFBQVEsQ0FBQ0csU0FBVSxJQUF6QyxLQUFpRGMsSUFBSSxDQUFDQyxLQUFMLENBQVdwQixFQUFFLENBQUNxQixZQUFILENBQWlCLFFBQU9uQixRQUFRLENBQUNHLFNBQVUsSUFBM0MsRUFBZ0QsT0FBaEQsQ0FBWCxDQUFqRCxJQUF5SCxFQUFySTtBQUNBRixFQUFBQSxXQUFXLHFCQUFRRixPQUFPLENBQUUsS0FBSUMsUUFBUSxDQUFDRyxTQUFVLE1BQXpCLENBQVAsQ0FBdUNpQixpQkFBdkMsRUFBUixFQUF1RXZCLE9BQXZFLEVBQW1Ga0IsRUFBbkYsQ0FBWDtBQUNBRCxFQUFBQSxJQUFJLENBQUNqQixPQUFELEVBQVcsaUJBQWdCb0IsSUFBSSxDQUFDSSxTQUFMLENBQWVwQixXQUFmLENBQTRCLEVBQXZELENBQUo7O0FBRUEsTUFBSUEsV0FBVyxDQUFDcUIsV0FBWixJQUEyQixZQUEvQixFQUNFO0FBQUN0QixJQUFBQSxRQUFRLENBQUN1QixVQUFULEdBQXNCLElBQXRCO0FBQTJCLEdBRDlCLE1BR0U7QUFBQ3ZCLElBQUFBLFFBQVEsQ0FBQ3VCLFVBQVQsR0FBc0IsS0FBdEI7QUFBNEI7O0FBRS9CQyxFQUFBQSxHQUFHLENBQUN6QixPQUFPLENBQUMsY0FBRCxDQUFQLENBQXdCMEIsWUFBeEIsQ0FBcUN6QixRQUFRLENBQUNZLEdBQTlDLEVBQW1EWixRQUFRLENBQUNXLFVBQTVELEVBQXdFWCxRQUFRLENBQUNHLFNBQWpGLENBQUQsQ0FBSDtBQUNBcUIsRUFBQUEsR0FBRyxDQUFDeEIsUUFBUSxDQUFDWSxHQUFULEdBQWUsZUFBZixHQUFpQ1gsV0FBVyxDQUFDcUIsV0FBOUMsQ0FBSDtBQUNBRSxFQUFBQSxHQUFHLENBQUN4QixRQUFRLENBQUNZLEdBQVQsR0FBZSxlQUFmLEdBQWlDWCxXQUFXLENBQUN5QixTQUE5QyxDQUFIO0FBRUF4QixFQUFBQSxNQUFNLENBQUNLLElBQVAsR0FBY1AsUUFBZDtBQUNBRSxFQUFBQSxNQUFNLENBQUNMLE9BQVAsR0FBaUJJLFdBQWpCOztBQUNBRixFQUFBQSxPQUFPLENBQUMsY0FBRCxDQUFQLENBQXdCZSxJQUF4QixDQUE2QmpCLE9BQTdCLEVBQXNDLDRCQUF0Qzs7QUFDQSxTQUFPSyxNQUFQO0FBQ0QsQyxDQUVEOzs7QUFDTyxTQUFTeUIsWUFBVCxDQUFzQkMsUUFBdEIsRUFBZ0NDLFdBQWhDLEVBQTZDdEIsSUFBN0MsRUFBbURWLE9BQW5ELEVBQTREO0FBQ2pFLE1BQUk7QUFDRkUsSUFBQUEsT0FBTyxDQUFDLGNBQUQsQ0FBUCxDQUF3QmUsSUFBeEIsQ0FBNkJqQixPQUE3QixFQUFzQyx1QkFBdEM7O0FBRUEsVUFBTWlDLEdBQUcsR0FBRy9CLE9BQU8sQ0FBQyxVQUFELENBQW5COztBQUNBLFVBQU1ELEVBQUUsR0FBR0MsT0FBTyxDQUFDLElBQUQsQ0FBbEI7O0FBQ0EsVUFBTWdDLE1BQU0sR0FBR2hDLE9BQU8sQ0FBQyxRQUFELENBQXRCOztBQUNBLFVBQU1pQyxJQUFJLEdBQUdqQyxPQUFPLENBQUMsTUFBRCxDQUFwQjs7QUFFQSxVQUFNa0MsaUJBQWlCLEdBQUcscUJBQTFCO0FBQ0EsVUFBTUMsZ0JBQWdCLEdBQUcsa0JBQXpCO0FBQ0EsVUFBTUMsZ0JBQWdCLEdBQUcsb0JBQXpCO0FBQ0EsVUFBTUMsc0JBQXNCLEdBQUdKLElBQUksQ0FBQ0ssT0FBTCxDQUFhQyxPQUFPLENBQUNDLEdBQVIsRUFBYixFQUE2QixXQUFVTCxnQkFBaUIsRUFBeEQsQ0FBL0I7QUFDQSxRQUFJTSxhQUFhLEdBQUcsRUFBcEI7O0FBRUEsUUFBSWpDLElBQUksQ0FBQ2dCLFVBQVQsRUFBcUI7QUFDbkIsVUFBSTFCLE9BQU8sQ0FBQ00sU0FBUixJQUFxQixTQUFyQixJQUFrQ04sT0FBTyxDQUFDNkIsU0FBOUMsRUFBeUQ7QUFDdkQsY0FBTWUsV0FBVyxHQUFHVCxJQUFJLENBQUNLLE9BQUwsQ0FBYUMsT0FBTyxDQUFDQyxHQUFSLEVBQWIsRUFBNEIsa0JBQWtCTixpQkFBOUMsQ0FBcEI7QUFDQSxZQUFJUyxLQUFLLEdBQUdaLEdBQUcsQ0FBQ2EsV0FBSixDQUFpQixHQUFFRixXQUFZLE1BQS9CLENBQVo7QUFDQUMsUUFBQUEsS0FBSyxDQUFDRSxPQUFOLENBQWVDLFFBQUQsSUFBYztBQUMxQixjQUFJQSxRQUFRLElBQUlBLFFBQVEsQ0FBQ0MsTUFBVCxDQUFnQixDQUFoQixFQUFtQixDQUFuQixLQUF5QixNQUF6QyxFQUFpRDtBQUMvQyxnQkFBSUMsR0FBRyxHQUFHRixRQUFRLENBQUNDLE1BQVQsQ0FBZ0IsQ0FBaEIsRUFBbUJFLE9BQW5CLENBQTJCLFlBQTNCLENBQVY7O0FBQ0EsZ0JBQUlELEdBQUcsSUFBSSxDQUFYLEVBQWM7QUFDWlAsY0FBQUEsYUFBYSxDQUFDbEMsSUFBZCxDQUFtQnVDLFFBQVEsQ0FBQ0ksU0FBVCxDQUFtQixDQUFuQixFQUFzQkYsR0FBRyxHQUFHLENBQTVCLENBQW5CO0FBQ0Q7QUFDRjtBQUNGLFNBUEQ7O0FBU0EsWUFBSTtBQUNGLGdCQUFNRyxhQUFhLEdBQUdsQixJQUFJLENBQUNLLE9BQUwsQ0FBYUMsT0FBTyxDQUFDQyxHQUFSLEVBQWIsRUFBNEIsdUJBQTVCLENBQXRCO0FBQ0EsY0FBSVksRUFBRSxHQUFHckIsR0FBRyxDQUFDWCxZQUFKLENBQWlCK0IsYUFBakIsRUFBZ0NFLFFBQWhDLEVBQVQ7QUFDQSxjQUFJQyxLQUFLLEdBQUdGLEVBQUUsQ0FBQ0csT0FBSCxDQUNULHdEQURTLEVBRVQsMEVBRlMsQ0FBWjtBQUlBeEIsVUFBQUEsR0FBRyxDQUFDeUIsYUFBSixDQUFrQkwsYUFBbEIsRUFBaUNHLEtBQWpDLEVBQXdDLE9BQXhDLEVBQWlELE1BQUk7QUFBQztBQUFPLFdBQTdEO0FBRUEsZ0JBQU1HLFFBQVEsR0FBR3hCLElBQUksQ0FBQ0ssT0FBTCxDQUFhQyxPQUFPLENBQUNDLEdBQVIsRUFBYixFQUE0QixhQUE1QixDQUFqQjtBQUNBLGNBQUlrQixNQUFNLEdBQUczQixHQUFHLENBQUNYLFlBQUosQ0FBaUJxQyxRQUFqQixFQUEyQkosUUFBM0IsRUFBYjtBQUNBLGNBQUlNLFNBQVMsR0FBR0QsTUFBTSxDQUFDSCxPQUFQLENBQ2IsNkJBRGEsRUFFYixnREFGYSxDQUFoQjtBQUlBeEIsVUFBQUEsR0FBRyxDQUFDeUIsYUFBSixDQUFrQkMsUUFBbEIsRUFBNEJFLFNBQTVCLEVBQXVDLE9BQXZDLEVBQWdELE1BQUk7QUFBQztBQUFPLFdBQTVEOztBQUVBLGNBQUksQ0FBQzVELEVBQUUsQ0FBQ2tCLFVBQUgsQ0FBY29CLHNCQUFkLENBQUwsRUFBNEM7QUFDMUNMLFlBQUFBLE1BQU0sQ0FBQzRCLElBQVAsQ0FBWXZCLHNCQUFaOztBQUNBLGtCQUFNd0IsQ0FBQyxHQUFHN0QsT0FBTyxDQUFDLGFBQUQsQ0FBUCxDQUF1Qm9DLGdCQUF2QixDQUF3QyxFQUF4QyxFQUE0QyxFQUE1QyxFQUFnRCxFQUFoRCxDQUFWOztBQUNBTCxZQUFBQSxHQUFHLENBQUN5QixhQUFKLENBQW1CLEdBQUVuQixzQkFBdUIsSUFBR0QsZ0JBQWlCLEtBQWhFLEVBQXNFeUIsQ0FBdEUsRUFBeUUsT0FBekUsRUFBa0YsTUFBTTtBQUFDO0FBQU8sYUFBaEc7QUFDRDtBQUVGLFNBdkJELENBd0JBLE9BQU9DLENBQVAsRUFBVTtBQUNSQyxVQUFBQSxPQUFPLENBQUN0QyxHQUFSLENBQVlxQyxDQUFaO0FBQ0FoQyxVQUFBQSxXQUFXLENBQUNrQyxNQUFaLENBQW1CekQsSUFBbkIsQ0FBd0IsdUNBQXVDdUQsQ0FBL0Q7QUFDQSxpQkFBTyxFQUFQO0FBQ0Q7QUFDRjs7QUFFRGhDLE1BQUFBLFdBQVcsQ0FBQ21DLEtBQVosQ0FBa0JDLGFBQWxCLENBQWdDQyxHQUFoQyxDQUFxQyxvQkFBckMsRUFBMERDLE1BQU0sSUFBSTtBQUNsRTtBQUNBLFlBQUlBLE1BQU0sQ0FBQ0MsUUFBUCxJQUFtQixDQUFDRCxNQUFNLENBQUNDLFFBQVAsQ0FBZ0JDLEtBQWhCLENBQXNCLGNBQXRCLENBQXBCLElBQTZELENBQUNGLE1BQU0sQ0FBQ0MsUUFBUCxDQUFnQkMsS0FBaEIsQ0FBc0IsU0FBdEIsQ0FBbEUsRUFBb0c7QUFDbEc5RCxVQUFBQSxJQUFJLENBQUMrRCxJQUFMLEdBQVksQ0FBQyxJQUFJL0QsSUFBSSxDQUFDK0QsSUFBTCxJQUFhLEVBQWpCLENBQUQsRUFBdUIsR0FBR3ZFLE9BQU8sQ0FBRSxLQUFJUSxJQUFJLENBQUNKLFNBQVUsTUFBckIsQ0FBUCxDQUFtQ29FLGlCQUFuQyxDQUFxREosTUFBckQsRUFBNkR0RSxPQUE3RCxFQUFzRWdDLFdBQXRFLEVBQW1GVyxhQUFuRixDQUExQixDQUFaO0FBQ0QsU0FKaUUsQ0FLbEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDRCxPQVZEOztBQVlBLFVBQUkzQyxPQUFPLENBQUNNLFNBQVIsSUFBcUIsU0FBckIsSUFBa0NOLE9BQU8sQ0FBQzZCLFNBQTlDLEVBQXlEO0FBSXZERyxRQUFBQSxXQUFXLENBQUNtQyxLQUFaLENBQWtCUSxhQUFsQixDQUFnQ04sR0FBaEMsQ0FBcUMsb0JBQXJDLEVBQTBETyxPQUFPLElBQUk7QUFDbkUxRSxVQUFBQSxPQUFPLENBQUMsY0FBRCxDQUFQLENBQXdCZSxJQUF4QixDQUE2QmpCLE9BQTdCLEVBQXNDLG9CQUF0Qzs7QUFDQSxnQkFBTTZFLE1BQU0sR0FBRywwQkFBZjtBQUNBbkUsVUFBQUEsSUFBSSxDQUFDK0QsSUFBTCxDQUFVMUIsT0FBVixDQUFrQitCLElBQUksSUFBSTtBQUN4QixnQkFBSUMsS0FBSyxHQUFHRCxJQUFJLENBQUMzQixPQUFMLENBQWEwQixNQUFiLENBQVo7O0FBQ0EsZ0JBQUlFLEtBQUssSUFBSSxDQUFiLEVBQWdCO0FBQ2RELGNBQUFBLElBQUksR0FBR0EsSUFBSSxDQUFDMUIsU0FBTCxDQUFlMkIsS0FBSyxHQUFHRixNQUFNLENBQUNHLE1BQTlCLENBQVA7QUFDQSxrQkFBSTlCLEdBQUcsR0FBRzRCLElBQUksQ0FBQzNCLE9BQUwsQ0FBYSxJQUFiLENBQVY7QUFDQXpDLGNBQUFBLElBQUksQ0FBQ3VFLGlCQUFMLENBQXVCeEUsSUFBdkIsQ0FBNEJxRSxJQUFJLENBQUM3QixNQUFMLENBQVksQ0FBWixFQUFlQyxHQUFmLENBQTVCO0FBQ0Q7QUFDRixXQVBEO0FBUUF4QyxVQUFBQSxJQUFJLENBQUN1RSxpQkFBTCxHQUF5QixDQUFDLEdBQUcsSUFBSUMsR0FBSixDQUFReEUsSUFBSSxDQUFDdUUsaUJBQWIsQ0FBSixDQUF6QjtBQUNBLGdCQUFNRSxRQUFRLEdBQUdoRCxJQUFJLENBQUNLLE9BQUwsQ0FBYUMsT0FBTyxDQUFDQyxHQUFSLEVBQWIsRUFBNEIsa0JBQWtCTixpQkFBbEIsR0FBc0MsVUFBbEUsQ0FBakI7QUFDQSxnQkFBTWdELFdBQVcsR0FBRzdDLHNCQUFwQjtBQUVBLGdCQUFNOEMsV0FBVyxHQUFHcEQsR0FBRyxDQUFDWCxZQUFKLENBQWtCLEdBQUU2RCxRQUFTLFVBQTdCLEVBQXdDNUIsUUFBeEMsRUFBcEI7QUFDQXRCLFVBQUFBLEdBQUcsQ0FBQ3lCLGFBQUosQ0FBbUIsR0FBRTBCLFdBQVksVUFBakMsRUFBNENDLFdBQTVDLEVBQXlELE9BQXpELEVBQWtFLE1BQUk7QUFBQztBQUFPLFdBQTlFO0FBRUEsY0FBSUMsa0JBQWtCLEdBQUcsS0FBekI7QUFDQSxjQUFJQyxVQUFVLEdBQUc7QUFDZkMsWUFBQUEsT0FBTyxFQUFFLEVBRE07QUFFZkMsWUFBQUEsT0FBTyxFQUFFLEVBRk07QUFHZkMsWUFBQUEsWUFBWSxFQUFFO0FBSEMsV0FBakI7QUFLQWhGLFVBQUFBLElBQUksQ0FBQ3VFLGlCQUFMLENBQXVCbEMsT0FBdkIsQ0FBK0I0QyxLQUFLLElBQUk7QUFDdEMsZ0JBQUlDLFlBQVksR0FBR0QsS0FBSyxDQUFDRSxNQUFOLENBQWEsQ0FBYixFQUFnQkMsV0FBaEIsS0FBZ0NILEtBQUssQ0FBQ2xDLE9BQU4sQ0FBYyxJQUFkLEVBQW9CLEdBQXBCLEVBQXlCc0MsS0FBekIsQ0FBK0IsQ0FBL0IsQ0FBbkQ7QUFDQVIsWUFBQUEsVUFBVSxDQUFDQyxPQUFYLEdBQXFCRCxVQUFVLENBQUNDLE9BQVgsR0FBc0IsZUFBY0ksWUFBYSwyQkFBMEJELEtBQU0sZ0JBQXRHO0FBQ0FKLFlBQUFBLFVBQVUsQ0FBQ0UsT0FBWCxHQUFxQkYsVUFBVSxDQUFDRSxPQUFYLEdBQXNCLFVBQVNHLFlBQWEsY0FBakU7QUFDQUwsWUFBQUEsVUFBVSxDQUFDRyxZQUFYLEdBQTBCSCxVQUFVLENBQUNHLFlBQVgsR0FBMkIsVUFBU0UsWUFBYSxjQUEzRTtBQUNBLGdCQUFJSSxTQUFTLEdBQUksUUFBT0wsS0FBTSxlQUE5QjtBQUNBLGtCQUFNTSxRQUFRLEdBQUdoRSxHQUFHLENBQUNYLFlBQUosQ0FBa0IsR0FBRTZELFFBQVMsR0FBRWEsU0FBVSxFQUF6QyxFQUE0Q3pDLFFBQTVDLEVBQWpCO0FBQ0F0QixZQUFBQSxHQUFHLENBQUN5QixhQUFKLENBQW1CLEdBQUUwQixXQUFZLEdBQUVZLFNBQVUsRUFBN0MsRUFBZ0RDLFFBQWhELEVBQTBELE9BQTFELEVBQW1FLE1BQUk7QUFBQztBQUFPLGFBQS9FO0FBQ0FYLFlBQUFBLGtCQUFrQixHQUFHLElBQXJCO0FBQ0QsV0FURDs7QUFVQSxjQUFJQSxrQkFBSixFQUF3QjtBQUN0QixnQkFBSXZCLENBQUMsR0FBRzdELE9BQU8sQ0FBQyxhQUFELENBQVAsQ0FBdUJvQyxnQkFBdkIsQ0FDTmlELFVBQVUsQ0FBQ0MsT0FETCxFQUNjRCxVQUFVLENBQUNFLE9BRHpCLEVBQ2tDRixVQUFVLENBQUNHLFlBRDdDLENBQVI7O0FBR0F6RCxZQUFBQSxHQUFHLENBQUN5QixhQUFKLENBQW1CLEdBQUUwQixXQUFZLElBQUc5QyxnQkFBaUIsS0FBckQsRUFBMkR5QixDQUEzRCxFQUE4RCxPQUE5RCxFQUF1RSxNQUFJO0FBQUM7QUFBTyxhQUFuRjtBQUNEO0FBQ0YsU0F4Q0Q7QUF5Q0Q7QUFHRjs7QUFFRCxRQUFJL0QsT0FBTyxDQUFDTSxTQUFSLElBQXFCLE9BQXJCLElBQWdDLENBQUNOLE9BQU8sQ0FBQzZCLFNBQTdDLEVBQXdEO0FBRXRERyxNQUFBQSxXQUFXLENBQUNtQyxLQUFaLENBQWtCK0IscUNBQWxCLENBQXdEN0IsR0FBeEQsQ0FBNkQscUJBQTdELEVBQW1GOEIsSUFBRCxJQUFVO0FBQzFGbEYsUUFBQUEsSUFBSSxDQUFDakIsT0FBRCxFQUFTLDBCQUFULENBQUo7O0FBQ0EsY0FBTW1DLElBQUksR0FBR2pDLE9BQU8sQ0FBQyxNQUFELENBQXBCOztBQUNBLFlBQUlrRyxVQUFVLEdBQUcsRUFBakI7O0FBQ0EsWUFBSXJFLFFBQVEsQ0FBQy9CLE9BQVQsQ0FBaUJxRyxTQUFyQixFQUFnQztBQUM5QixjQUFJdEUsUUFBUSxDQUFDcUUsVUFBVCxLQUF3QixHQUE1QixFQUFpQztBQUMvQkEsWUFBQUEsVUFBVSxHQUFHakUsSUFBSSxDQUFDbUUsSUFBTCxDQUFVdkUsUUFBUSxDQUFDL0IsT0FBVCxDQUFpQnFHLFNBQWpCLENBQTJCRSxXQUFyQyxFQUFrREgsVUFBbEQsQ0FBYjtBQUNELFdBRkQsTUFHSztBQUNILGdCQUFJckUsUUFBUSxDQUFDL0IsT0FBVCxDQUFpQnFHLFNBQWpCLENBQTJCRSxXQUEzQixJQUEwQ2hHLFNBQTlDLEVBQXlEO0FBQ3ZENkYsY0FBQUEsVUFBVSxHQUFHLE9BQWI7QUFDRCxhQUZELE1BR0s7QUFDSEEsY0FBQUEsVUFBVSxHQUFHLEVBQWI7QUFDRDtBQUNGO0FBQ0YsU0FaRCxNQWFLO0FBQ0hBLFVBQUFBLFVBQVUsR0FBRyxPQUFiO0FBQ0Q7O0FBQ0RBLFFBQUFBLFVBQVUsR0FBR0EsVUFBVSxDQUFDM0MsT0FBWCxDQUFtQmhCLE9BQU8sQ0FBQ0MsR0FBUixFQUFuQixFQUFrQyxFQUFsQyxFQUFzQzhELElBQXRDLEVBQWI7QUFDQSxZQUFJQyxNQUFNLEdBQUd0RSxJQUFJLENBQUNtRSxJQUFMLENBQVVGLFVBQVYsRUFBc0IxRixJQUFJLENBQUNnRyxPQUEzQixFQUFvQyxRQUFwQyxDQUFiO0FBQ0EsWUFBSUMsT0FBTyxHQUFHeEUsSUFBSSxDQUFDbUUsSUFBTCxDQUFVRixVQUFWLEVBQXNCMUYsSUFBSSxDQUFDZ0csT0FBM0IsRUFBb0MsU0FBcEMsQ0FBZDtBQUNBUCxRQUFBQSxJQUFJLENBQUNTLE1BQUwsQ0FBWXRELEVBQVosQ0FBZXVELE9BQWYsQ0FBdUJKLE1BQXZCO0FBQ0FOLFFBQUFBLElBQUksQ0FBQ1MsTUFBTCxDQUFZRSxHQUFaLENBQWdCRCxPQUFoQixDQUF3QkYsT0FBeEI7QUFDQWhGLFFBQUFBLEdBQUcsQ0FBQ2pCLElBQUksQ0FBQ0ssR0FBTCxHQUFZLFVBQVMwRixNQUFPLFFBQU9FLE9BQVEsZ0JBQTVDLENBQUg7QUFDRCxPQTFCRDtBQTJCRCxLQTdCRCxNQThCSztBQUNIMUYsTUFBQUEsSUFBSSxDQUFDakIsT0FBRCxFQUFTLGtDQUFULENBQUo7QUFDRDtBQUNGLEdBekpELENBMEpBLE9BQU1nRSxDQUFOLEVBQVM7QUFDUDlELElBQUFBLE9BQU8sQ0FBQyxjQUFELENBQVAsQ0FBd0JlLElBQXhCLENBQTZCakIsT0FBN0IsRUFBcUNnRSxDQUFyQzs7QUFDQWhDLElBQUFBLFdBQVcsQ0FBQ2tDLE1BQVosQ0FBbUJ6RCxJQUFuQixDQUF3QixtQkFBbUJ1RCxDQUEzQztBQUNEO0FBQ0YsQyxDQUVEOzs7QUFDTyxTQUFTK0MsYUFBVCxDQUF1QmhGLFFBQXZCLEVBQWlDQyxXQUFqQyxFQUE4Q3RCLElBQTlDLEVBQW9EVixPQUFwRCxFQUE2RDtBQUNsRUUsRUFBQUEsT0FBTyxDQUFDLGNBQUQsQ0FBUCxDQUF3QmUsSUFBeEIsQ0FBNkJqQixPQUE3QixFQUFzQyx3QkFBdEM7QUFDRCxDLENBRUQ7OztTQUNzQmdILEk7O0VBOEV0Qjs7Ozs7OzBCQTlFTyxpQkFBb0JqRixRQUFwQixFQUE4QkMsV0FBOUIsRUFBMkN0QixJQUEzQyxFQUFpRFYsT0FBakQsRUFBMERpSCxRQUExRDtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBRUd0RixVQUFBQSxHQUZILEdBRVN6QixPQUFPLENBQUMsY0FBRCxDQUFQLENBQXdCeUIsR0FGakM7QUFHR1YsVUFBQUEsSUFISCxHQUdVZixPQUFPLENBQUMsY0FBRCxDQUFQLENBQXdCZSxJQUhsQztBQUlIQSxVQUFBQSxJQUFJLENBQUNqQixPQUFELEVBQVMsZUFBVCxDQUFKO0FBQ0llLFVBQUFBLEdBTEQsR0FLT0wsSUFBSSxDQUFDSyxHQUxaO0FBTUNULFVBQUFBLFNBTkQsR0FNYUksSUFBSSxDQUFDSixTQU5sQjtBQU9HNkIsVUFBQUEsSUFQSCxHQU9VakMsT0FBTyxDQUFDLE1BQUQsQ0FQakI7QUFRR2dILFVBQUFBLGVBUkgsR0FRcUJoSCxPQUFPLENBQUMsY0FBRCxDQUFQLENBQXdCZ0gsZUFSN0M7QUFTQ2QsVUFBQUEsVUFURCxHQVNjakUsSUFBSSxDQUFDbUUsSUFBTCxDQUFVdkUsUUFBUSxDQUFDcUUsVUFBbkIsRUFBOEIxRixJQUFJLENBQUNnRyxPQUFuQyxDQVRkOztBQVVILGNBQUkzRSxRQUFRLENBQUNxRSxVQUFULEtBQXdCLEdBQXhCLElBQStCckUsUUFBUSxDQUFDL0IsT0FBVCxDQUFpQnFHLFNBQXBELEVBQStEO0FBQzdERCxZQUFBQSxVQUFVLEdBQUdqRSxJQUFJLENBQUNtRSxJQUFMLENBQVV2RSxRQUFRLENBQUMvQixPQUFULENBQWlCcUcsU0FBakIsQ0FBMkJFLFdBQXJDLEVBQWtESCxVQUFsRCxDQUFiO0FBQ0Q7O0FBQ0RuRixVQUFBQSxJQUFJLENBQUNqQixPQUFELEVBQVMsaUJBQWlCb0csVUFBMUIsQ0FBSjtBQUNBbkYsVUFBQUEsSUFBSSxDQUFDakIsT0FBRCxFQUFTLGdCQUFnQk0sU0FBekIsQ0FBSjs7QUFkRyxnQkFlQ04sT0FBTyxDQUFDZ0gsSUFBUixJQUFnQixJQWZqQjtBQUFBO0FBQUE7QUFBQTs7QUFnQkQsY0FBSTFHLFNBQVMsSUFBSSxPQUFqQixFQUEwQjtBQUN4QjZHLFlBQUFBLGdCQUFnQixDQUFDcEcsR0FBRCxFQUFNTCxJQUFOLEVBQVlWLE9BQVosRUFBcUJvRyxVQUFyQixFQUFpQ3BFLFdBQWpDLENBQWhCO0FBQ0QsV0FGRCxNQUdLO0FBQ0gsZ0JBQUloQyxPQUFPLENBQUNNLFNBQVIsSUFBcUIsU0FBckIsSUFBa0MsQ0FBQ04sT0FBTyxDQUFDNkIsU0FBL0MsRUFBMEQ7QUFDeEQzQixjQUFBQSxPQUFPLENBQUUsS0FBSUksU0FBVSxNQUFoQixDQUFQLENBQThCNkcsZ0JBQTlCLENBQStDcEcsR0FBL0MsRUFBb0RMLElBQXBELEVBQTBEVixPQUExRCxFQUFtRW9HLFVBQW5FLEVBQStFcEUsV0FBL0U7QUFDRCxhQUZELE1BR0s7QUFDSDlCLGNBQUFBLE9BQU8sQ0FBRSxLQUFJSSxTQUFVLE1BQWhCLENBQVAsQ0FBOEI2RyxnQkFBOUIsQ0FBK0NwRyxHQUEvQyxFQUFvREwsSUFBcEQsRUFBMERWLE9BQTFELEVBQW1Fb0csVUFBbkUsRUFBK0VwRSxXQUEvRTtBQUNEO0FBQ0Y7O0FBRUdvRixVQUFBQSxPQTVCSCxHQTRCYSxFQTVCYjs7QUE2QkQsY0FBSXBILE9BQU8sQ0FBQ3FILEtBQVIsSUFBaUIsS0FBakIsSUFBMEIzRyxJQUFJLENBQUNnQixVQUFMLElBQW1CLEtBQWpELEVBQXdEO0FBQ3REMEYsWUFBQUEsT0FBTyxHQUFHLE9BQVY7QUFDRCxXQUZELE1BR0s7QUFDSEEsWUFBQUEsT0FBTyxHQUFHLE9BQVY7QUFDRDs7QUFsQ0EsZ0JBb0NHMUcsSUFBSSxDQUFDNEcsT0FBTCxJQUFnQixJQXBDbkI7QUFBQTtBQUFBO0FBQUE7O0FBcUNLQyxVQUFBQSxLQXJDTCxHQXFDYSxFQXJDYjs7QUFzQ0MsY0FBSXZILE9BQU8sQ0FBQ3dILE9BQVIsSUFBbUJqSCxTQUFuQixJQUFnQ1AsT0FBTyxDQUFDd0gsT0FBUixJQUFtQixFQUFuRCxJQUF5RHhILE9BQU8sQ0FBQ3dILE9BQVIsSUFBbUIsSUFBaEYsRUFBc0Y7QUFDcEYsZ0JBQUlKLE9BQU8sSUFBSSxPQUFmLEVBQXdCO0FBQ3RCRyxjQUFBQSxLQUFLLEdBQUcsQ0FBQyxLQUFELEVBQVFILE9BQVIsRUFBaUJwSCxPQUFPLENBQUN5QixXQUF6QixDQUFSO0FBQ0QsYUFGRCxNQUdLO0FBQ0g4RixjQUFBQSxLQUFLLEdBQUcsQ0FBQyxLQUFELEVBQVFILE9BQVIsRUFBaUIsY0FBakIsRUFBaUMsT0FBakMsRUFBMENwSCxPQUFPLENBQUN5QixXQUFsRCxDQUFSO0FBQ0Q7QUFFRixXQVJELE1BU0s7QUFDSCxnQkFBSTJGLE9BQU8sSUFBSSxPQUFmLEVBQXdCO0FBQ3RCRyxjQUFBQSxLQUFLLEdBQUcsQ0FBQyxLQUFELEVBQVFILE9BQVIsRUFBaUJwSCxPQUFPLENBQUN3SCxPQUF6QixFQUFrQ3hILE9BQU8sQ0FBQ3lCLFdBQTFDLENBQVI7QUFDRCxhQUZELE1BR0s7QUFDSDhGLGNBQUFBLEtBQUssR0FBRyxDQUFDLEtBQUQsRUFBUUgsT0FBUixFQUFpQixjQUFqQixFQUFpQyxPQUFqQyxFQUEwQ3BILE9BQU8sQ0FBQ3dILE9BQWxELEVBQTJEeEgsT0FBTyxDQUFDeUIsV0FBbkUsQ0FBUjtBQUNEO0FBQ0Y7O0FBdERGLGdCQXdES2YsSUFBSSxDQUFDK0csWUFBTCxJQUFxQixLQXhEMUI7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQSxpQkF5RFNQLGVBQWUsQ0FBQ25HLEdBQUQsRUFBTWlCLFdBQU4sRUFBbUJvRSxVQUFuQixFQUErQm1CLEtBQS9CLEVBQXNDdkgsT0FBdEMsQ0F6RHhCOztBQUFBO0FBMERHVSxVQUFBQSxJQUFJLENBQUMrRyxZQUFMLEdBQW9CLElBQXBCOztBQTFESDtBQTREQ1IsVUFBQUEsUUFBUTtBQTVEVDtBQUFBOztBQUFBO0FBK0RDQSxVQUFBQSxRQUFROztBQS9EVDtBQUFBO0FBQUE7O0FBQUE7QUFtRUR0RixVQUFBQSxHQUFHLENBQUUsR0FBRWpCLElBQUksQ0FBQ0ssR0FBSSx1QkFBYixDQUFIO0FBQ0FrRyxVQUFBQSxRQUFROztBQXBFUDtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBOztBQXdFSC9HLFVBQUFBLE9BQU8sQ0FBQyxjQUFELENBQVAsQ0FBd0JlLElBQXhCLENBQTZCakIsT0FBN0I7O0FBQ0FnQyxVQUFBQSxXQUFXLENBQUNrQyxNQUFaLENBQW1CekQsSUFBbkIsQ0FBd0Isc0JBQXhCO0FBQ0F3RyxVQUFBQSxRQUFROztBQTFFTDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRzs7OztBQStFQSxTQUFTRSxnQkFBVCxDQUEwQnBHLEdBQTFCLEVBQStCTCxJQUEvQixFQUFxQ1YsT0FBckMsRUFBOEMwSCxNQUE5QyxFQUFzRDFGLFdBQXRELEVBQW1FO0FBQ3hFLE1BQUk7QUFDRmYsSUFBQUEsSUFBSSxDQUFDakIsT0FBRCxFQUFTLDJCQUFULENBQUo7O0FBQ0EsVUFBTTJILE1BQU0sR0FBR3pILE9BQU8sQ0FBQyxRQUFELENBQXRCOztBQUNBLFVBQU1nQyxNQUFNLEdBQUdoQyxPQUFPLENBQUMsUUFBRCxDQUF0Qjs7QUFDQSxVQUFNK0IsR0FBRyxHQUFHL0IsT0FBTyxDQUFDLFVBQUQsQ0FBbkI7O0FBQ0EsVUFBTUQsRUFBRSxHQUFHQyxPQUFPLENBQUMsSUFBRCxDQUFsQjs7QUFDQSxVQUFNaUMsSUFBSSxHQUFHakMsT0FBTyxDQUFDLE1BQUQsQ0FBcEI7O0FBRUEsUUFBSTBILFFBQVEsR0FBRzVILE9BQU8sQ0FBQzRILFFBQXZCO0FBQ0EsUUFBSUMsT0FBTyxHQUFHN0gsT0FBTyxDQUFDNkgsT0FBdEI7QUFDQSxRQUFJQyxLQUFLLEdBQUc5SCxPQUFPLENBQUM4SCxLQUFwQjtBQUVBQSxJQUFBQSxLQUFLLEdBQUdBLEtBQUssS0FBS0QsT0FBTyxLQUFLLFNBQVosR0FBd0IsY0FBeEIsR0FBeUMsZ0JBQTlDLENBQWI7QUFDQTVHLElBQUFBLElBQUksQ0FBQ2pCLE9BQUQsRUFBUyxnQkFBZ0JVLElBQUksQ0FBQ3FILFNBQTlCLENBQUo7O0FBQ0EsUUFBSXJILElBQUksQ0FBQ3FILFNBQVQsRUFBb0I7QUFDbEJKLE1BQUFBLE1BQU0sQ0FBQzdELElBQVAsQ0FBWTRELE1BQVo7QUFDQXhGLE1BQUFBLE1BQU0sQ0FBQzRCLElBQVAsQ0FBWTRELE1BQVo7O0FBQ0EsWUFBTU0sUUFBUSxHQUFHOUgsT0FBTyxDQUFDLGFBQUQsQ0FBUCxDQUF1QjhILFFBQXhDOztBQUNBLFlBQU1DLGFBQWEsR0FBRy9ILE9BQU8sQ0FBQyxhQUFELENBQVAsQ0FBdUIrSCxhQUE3Qzs7QUFDQSxZQUFNQyxtQkFBbUIsR0FBR2hJLE9BQU8sQ0FBQyxhQUFELENBQVAsQ0FBdUJnSSxtQkFBbkQ7O0FBQ0EsWUFBTUMsc0JBQXNCLEdBQUdqSSxPQUFPLENBQUMsYUFBRCxDQUFQLENBQXVCaUksc0JBQXREOztBQUVBbEksTUFBQUEsRUFBRSxDQUFDeUQsYUFBSCxDQUFpQnZCLElBQUksQ0FBQ21FLElBQUwsQ0FBVW9CLE1BQVYsRUFBa0IsV0FBbEIsQ0FBakIsRUFBaURNLFFBQVEsQ0FBQ3RILElBQUksQ0FBQ2dCLFVBQU4sRUFBa0IxQixPQUFsQixFQUEyQjBILE1BQTNCLENBQXpELEVBQTZGLE1BQTdGO0FBQ0F6SCxNQUFBQSxFQUFFLENBQUN5RCxhQUFILENBQWlCdkIsSUFBSSxDQUFDbUUsSUFBTCxDQUFVb0IsTUFBVixFQUFrQixVQUFsQixDQUFqQixFQUFnRE8sYUFBYSxDQUFDSCxLQUFELEVBQVFGLFFBQVIsRUFBa0JDLE9BQWxCLEVBQTJCN0gsT0FBM0IsRUFBb0MwSCxNQUFwQyxDQUE3RCxFQUEwRyxNQUExRztBQUNBekgsTUFBQUEsRUFBRSxDQUFDeUQsYUFBSCxDQUFpQnZCLElBQUksQ0FBQ21FLElBQUwsQ0FBVW9CLE1BQVYsRUFBa0Isc0JBQWxCLENBQWpCLEVBQTREUyxzQkFBc0IsQ0FBQ25JLE9BQUQsRUFBVTBILE1BQVYsQ0FBbEYsRUFBcUcsTUFBckc7QUFDQXpILE1BQUFBLEVBQUUsQ0FBQ3lELGFBQUgsQ0FBaUJ2QixJQUFJLENBQUNtRSxJQUFMLENBQVVvQixNQUFWLEVBQWtCLGdCQUFsQixDQUFqQixFQUFzRFEsbUJBQW1CLENBQUNsSSxPQUFELEVBQVUwSCxNQUFWLENBQXpFLEVBQTRGLE1BQTVGOztBQUVBLFVBQUloSCxJQUFJLENBQUNKLFNBQUwsSUFBa0IsU0FBdEIsRUFBaUM7QUFFL0I7QUFDQSxZQUFJTCxFQUFFLENBQUNrQixVQUFILENBQWNnQixJQUFJLENBQUNtRSxJQUFMLENBQVU3RCxPQUFPLENBQUNDLEdBQVIsRUFBVixFQUF3QixpQkFBeEIsQ0FBZCxDQUFKLEVBQStEO0FBQzdELGNBQUkwRixRQUFRLEdBQUdqRyxJQUFJLENBQUNtRSxJQUFMLENBQVU3RCxPQUFPLENBQUNDLEdBQVIsRUFBVixFQUF5QixjQUF6QixDQUFmO0FBQ0EsY0FBSTJGLE1BQU0sR0FBR2xHLElBQUksQ0FBQ21FLElBQUwsQ0FBVW9CLE1BQVYsQ0FBYjtBQUNBekYsVUFBQUEsR0FBRyxDQUFDcUcsUUFBSixDQUFhRixRQUFiLEVBQXVCQyxNQUF2QjtBQUNBMUcsVUFBQUEsR0FBRyxDQUFDWixHQUFHLEdBQUcsZUFBTixHQUF3QnFILFFBQVEsQ0FBQzNFLE9BQVQsQ0FBaUJoQixPQUFPLENBQUNDLEdBQVIsRUFBakIsRUFBZ0MsRUFBaEMsQ0FBeEIsR0FBOEQsT0FBOUQsR0FBd0UyRixNQUFNLENBQUM1RSxPQUFQLENBQWVoQixPQUFPLENBQUNDLEdBQVIsRUFBZixFQUE4QixFQUE5QixDQUF6RSxDQUFIO0FBQ0Q7O0FBRUQsWUFBSXpDLEVBQUUsQ0FBQ2tCLFVBQUgsQ0FBY2dCLElBQUksQ0FBQ21FLElBQUwsQ0FBVTdELE9BQU8sQ0FBQ0MsR0FBUixFQUFWLEVBQXdCLHVCQUF4QixDQUFkLENBQUosRUFBcUU7QUFDbkUsY0FBSTBGLFFBQVEsR0FBR2pHLElBQUksQ0FBQ21FLElBQUwsQ0FBVTdELE9BQU8sQ0FBQ0MsR0FBUixFQUFWLEVBQXlCLGNBQXpCLENBQWY7QUFDQSxjQUFJMkYsTUFBTSxHQUFHbEcsSUFBSSxDQUFDbUUsSUFBTCxDQUFVb0IsTUFBVixDQUFiO0FBQ0F6RixVQUFBQSxHQUFHLENBQUNxRyxRQUFKLENBQWFGLFFBQWIsRUFBdUJDLE1BQXZCO0FBQ0ExRyxVQUFBQSxHQUFHLENBQUNaLEdBQUcsR0FBRyxVQUFOLEdBQW1CcUgsUUFBUSxDQUFDM0UsT0FBVCxDQUFpQmhCLE9BQU8sQ0FBQ0MsR0FBUixFQUFqQixFQUFnQyxFQUFoQyxDQUFuQixHQUF5RCxPQUF6RCxHQUFtRTJGLE1BQU0sQ0FBQzVFLE9BQVAsQ0FBZWhCLE9BQU8sQ0FBQ0MsR0FBUixFQUFmLEVBQThCLEVBQTlCLENBQXBFLENBQUg7QUFDRDs7QUFDRCxZQUFJekMsRUFBRSxDQUFDa0IsVUFBSCxDQUFjZ0IsSUFBSSxDQUFDbUUsSUFBTCxDQUFVN0QsT0FBTyxDQUFDQyxHQUFSLEVBQVYsRUFBd0Isd0JBQXhCLENBQWQsQ0FBSixFQUFzRTtBQUNwRSxjQUFJMEYsUUFBUSxHQUFHakcsSUFBSSxDQUFDbUUsSUFBTCxDQUFVN0QsT0FBTyxDQUFDQyxHQUFSLEVBQVYsRUFBeUIsY0FBekIsQ0FBZjtBQUNBLGNBQUkyRixNQUFNLEdBQUdsRyxJQUFJLENBQUNtRSxJQUFMLENBQVVvQixNQUFWLENBQWI7QUFDQXpGLFVBQUFBLEdBQUcsQ0FBQ3FHLFFBQUosQ0FBYUYsUUFBYixFQUF1QkMsTUFBdkI7QUFDQTFHLFVBQUFBLEdBQUcsQ0FBQ1osR0FBRyxHQUFHLFVBQU4sR0FBbUJxSCxRQUFRLENBQUMzRSxPQUFULENBQWlCaEIsT0FBTyxDQUFDQyxHQUFSLEVBQWpCLEVBQWdDLEVBQWhDLENBQW5CLEdBQXlELE9BQXpELEdBQW1FMkYsTUFBTSxDQUFDNUUsT0FBUCxDQUFlaEIsT0FBTyxDQUFDQyxHQUFSLEVBQWYsRUFBOEIsRUFBOUIsQ0FBcEUsQ0FBSDtBQUNEO0FBQ0Y7O0FBQ0QsVUFBSWhDLElBQUksQ0FBQ0osU0FBTCxJQUFrQixPQUF0QixFQUFnQztBQUM5QixZQUFJTCxFQUFFLENBQUNrQixVQUFILENBQWNnQixJQUFJLENBQUNtRSxJQUFMLENBQVU3RCxPQUFPLENBQUNDLEdBQVIsRUFBVixFQUF3QixxQkFBeEIsQ0FBZCxDQUFKLEVBQW1FO0FBQ2pFLGNBQUkwRixRQUFRLEdBQUdqRyxJQUFJLENBQUNtRSxJQUFMLENBQVU3RCxPQUFPLENBQUNDLEdBQVIsRUFBVixFQUF5QixxQkFBekIsQ0FBZjtBQUNBLGNBQUkyRixNQUFNLEdBQUdsRyxJQUFJLENBQUNtRSxJQUFMLENBQVVvQixNQUFWLEVBQWtCLFVBQWxCLENBQWI7QUFDQXpGLFVBQUFBLEdBQUcsQ0FBQ3FHLFFBQUosQ0FBYUYsUUFBYixFQUF1QkMsTUFBdkI7QUFDQTFHLFVBQUFBLEdBQUcsQ0FBQ1osR0FBRyxHQUFHLFVBQU4sR0FBbUJxSCxRQUFRLENBQUMzRSxPQUFULENBQWlCaEIsT0FBTyxDQUFDQyxHQUFSLEVBQWpCLEVBQWdDLEVBQWhDLENBQW5CLEdBQXlELE9BQXpELEdBQW1FMkYsTUFBTSxDQUFDNUUsT0FBUCxDQUFlaEIsT0FBTyxDQUFDQyxHQUFSLEVBQWYsRUFBOEIsRUFBOUIsQ0FBcEUsQ0FBSDtBQUNEOztBQUNELFlBQUl6QyxFQUFFLENBQUNrQixVQUFILENBQWNnQixJQUFJLENBQUNtRSxJQUFMLENBQVU3RCxPQUFPLENBQUNDLEdBQVIsRUFBVixFQUF3QixzQkFBeEIsQ0FBZCxDQUFKLEVBQW9FO0FBQ2xFLGNBQUkwRixRQUFRLEdBQUdqRyxJQUFJLENBQUNtRSxJQUFMLENBQVU3RCxPQUFPLENBQUNDLEdBQVIsRUFBVixFQUF5QixzQkFBekIsQ0FBZjtBQUNBLGNBQUkyRixNQUFNLEdBQUdsRyxJQUFJLENBQUNtRSxJQUFMLENBQVVvQixNQUFWLEVBQWtCLFdBQWxCLENBQWI7QUFDQXpGLFVBQUFBLEdBQUcsQ0FBQ3FHLFFBQUosQ0FBYUYsUUFBYixFQUF1QkMsTUFBdkI7QUFDQTFHLFVBQUFBLEdBQUcsQ0FBQ1osR0FBRyxHQUFHLFVBQU4sR0FBbUJxSCxRQUFRLENBQUMzRSxPQUFULENBQWlCaEIsT0FBTyxDQUFDQyxHQUFSLEVBQWpCLEVBQWdDLEVBQWhDLENBQW5CLEdBQXlELE9BQXpELEdBQW1FMkYsTUFBTSxDQUFDNUUsT0FBUCxDQUFlaEIsT0FBTyxDQUFDQyxHQUFSLEVBQWYsRUFBOEIsRUFBOUIsQ0FBcEUsQ0FBSDtBQUNEO0FBQ0Y7O0FBRUQsVUFBSXpDLEVBQUUsQ0FBQ2tCLFVBQUgsQ0FBY2dCLElBQUksQ0FBQ21FLElBQUwsQ0FBVTdELE9BQU8sQ0FBQ0MsR0FBUixFQUFWLEVBQXdCLFlBQXhCLENBQWQsQ0FBSixFQUEwRDtBQUN4RCxZQUFJNkYsYUFBYSxHQUFHcEcsSUFBSSxDQUFDbUUsSUFBTCxDQUFVN0QsT0FBTyxDQUFDQyxHQUFSLEVBQVYsRUFBeUIsWUFBekIsQ0FBcEI7QUFDQSxZQUFJOEYsV0FBVyxHQUFHckcsSUFBSSxDQUFDbUUsSUFBTCxDQUFVb0IsTUFBVixFQUFrQixjQUFsQixDQUFsQjtBQUNBekYsUUFBQUEsR0FBRyxDQUFDcUcsUUFBSixDQUFhQyxhQUFiLEVBQTRCQyxXQUE1QjtBQUNBN0csUUFBQUEsR0FBRyxDQUFDWixHQUFHLEdBQUcsVUFBTixHQUFtQndILGFBQWEsQ0FBQzlFLE9BQWQsQ0FBc0JoQixPQUFPLENBQUNDLEdBQVIsRUFBdEIsRUFBcUMsRUFBckMsQ0FBbkIsR0FBOEQsT0FBOUQsR0FBd0U4RixXQUFXLENBQUMvRSxPQUFaLENBQW9CaEIsT0FBTyxDQUFDQyxHQUFSLEVBQXBCLEVBQW1DLEVBQW5DLENBQXpFLENBQUg7QUFDRDs7QUFFRCxVQUFJekMsRUFBRSxDQUFDa0IsVUFBSCxDQUFjZ0IsSUFBSSxDQUFDbUUsSUFBTCxDQUFVN0QsT0FBTyxDQUFDQyxHQUFSLEVBQVYsRUFBd0IsV0FBeEIsQ0FBZCxDQUFKLEVBQXlEO0FBQ3ZELFlBQUkrRixZQUFZLEdBQUd0RyxJQUFJLENBQUNtRSxJQUFMLENBQVU3RCxPQUFPLENBQUNDLEdBQVIsRUFBVixFQUF5QixXQUF6QixDQUFuQjtBQUNBLFlBQUlnRyxVQUFVLEdBQUd2RyxJQUFJLENBQUNtRSxJQUFMLENBQVVvQixNQUFWLEVBQWtCLFVBQWxCLENBQWpCO0FBQ0F6RixRQUFBQSxHQUFHLENBQUNxRyxRQUFKLENBQWFHLFlBQWIsRUFBMkJDLFVBQTNCO0FBQ0EvRyxRQUFBQSxHQUFHLENBQUNaLEdBQUcsR0FBRyxVQUFOLEdBQW1CMEgsWUFBWSxDQUFDaEYsT0FBYixDQUFxQmhCLE9BQU8sQ0FBQ0MsR0FBUixFQUFyQixFQUFvQyxFQUFwQyxDQUFuQixHQUE2RCxPQUE3RCxHQUF1RWdHLFVBQVUsQ0FBQ2pGLE9BQVgsQ0FBbUJoQixPQUFPLENBQUNDLEdBQVIsRUFBbkIsRUFBa0MsRUFBbEMsQ0FBeEUsQ0FBSDtBQUNEOztBQUVELFVBQUl6QyxFQUFFLENBQUNrQixVQUFILENBQWNnQixJQUFJLENBQUNtRSxJQUFMLENBQVU3RCxPQUFPLENBQUNDLEdBQVIsRUFBVixFQUF3QixZQUF4QixDQUFkLENBQUosRUFBMEQ7QUFDeEQsWUFBSTBGLFFBQVEsR0FBR2pHLElBQUksQ0FBQ21FLElBQUwsQ0FBVTdELE9BQU8sQ0FBQ0MsR0FBUixFQUFWLEVBQXlCLFlBQXpCLENBQWY7QUFDQSxZQUFJMkYsTUFBTSxHQUFHbEcsSUFBSSxDQUFDbUUsSUFBTCxDQUFVb0IsTUFBVixFQUFrQixXQUFsQixDQUFiO0FBQ0F6RixRQUFBQSxHQUFHLENBQUNxRyxRQUFKLENBQWFGLFFBQWIsRUFBdUJDLE1BQXZCO0FBQ0ExRyxRQUFBQSxHQUFHLENBQUNaLEdBQUcsR0FBRyxVQUFOLEdBQW1CcUgsUUFBUSxDQUFDM0UsT0FBVCxDQUFpQmhCLE9BQU8sQ0FBQ0MsR0FBUixFQUFqQixFQUFnQyxFQUFoQyxDQUFuQixHQUF5RCxPQUF6RCxHQUFtRTJGLE1BQU0sQ0FBQzVFLE9BQVAsQ0FBZWhCLE9BQU8sQ0FBQ0MsR0FBUixFQUFmLEVBQThCLEVBQTlCLENBQXBFLENBQUg7QUFDRDtBQUVGOztBQUNEaEMsSUFBQUEsSUFBSSxDQUFDcUgsU0FBTCxHQUFpQixLQUFqQjtBQUNBLFFBQUl6RSxFQUFFLEdBQUcsRUFBVDs7QUFDQSxRQUFJNUMsSUFBSSxDQUFDZ0IsVUFBVCxFQUFxQjtBQUNuQixVQUFJLENBQUNoQixJQUFJLENBQUMrRCxJQUFMLENBQVVrRSxRQUFWLENBQW1CLGdDQUFuQixDQUFMLEVBQTJEO0FBQ3pEakksUUFBQUEsSUFBSSxDQUFDK0QsSUFBTCxDQUFVaEUsSUFBVixDQUFlLGdDQUFmO0FBQ0Q7O0FBQ0Q2QyxNQUFBQSxFQUFFLEdBQUc1QyxJQUFJLENBQUMrRCxJQUFMLENBQVU2QixJQUFWLENBQWUsS0FBZixDQUFMO0FBQ0QsS0FMRCxNQU1LO0FBQ0hoRCxNQUFBQSxFQUFFLEdBQUcsc0JBQUw7QUFDRDs7QUFDRCxRQUFJNUMsSUFBSSxDQUFDa0ksUUFBTCxLQUFrQixJQUFsQixJQUEwQnRGLEVBQUUsS0FBSzVDLElBQUksQ0FBQ2tJLFFBQTFDLEVBQW9EO0FBQ2xEbEksTUFBQUEsSUFBSSxDQUFDa0ksUUFBTCxHQUFnQnRGLEVBQWhCO0FBQ0EsWUFBTXNGLFFBQVEsR0FBR3pHLElBQUksQ0FBQ21FLElBQUwsQ0FBVW9CLE1BQVYsRUFBa0IsYUFBbEIsQ0FBakI7QUFDQXpILE1BQUFBLEVBQUUsQ0FBQ3lELGFBQUgsQ0FBaUJrRixRQUFqQixFQUEyQnRGLEVBQTNCLEVBQStCLE1BQS9CO0FBQ0E1QyxNQUFBQSxJQUFJLENBQUM0RyxPQUFMLEdBQWUsSUFBZjtBQUNBLFVBQUl1QixTQUFTLEdBQUduQixNQUFNLENBQUNqRSxPQUFQLENBQWVoQixPQUFPLENBQUNDLEdBQVIsRUFBZixFQUE4QixFQUE5QixDQUFoQjs7QUFDQSxVQUFJbUcsU0FBUyxDQUFDckMsSUFBVixNQUFvQixFQUF4QixFQUE0QjtBQUFDcUMsUUFBQUEsU0FBUyxHQUFHLElBQVo7QUFBaUI7O0FBQzlDbEgsTUFBQUEsR0FBRyxDQUFDWixHQUFHLEdBQUcsMEJBQU4sR0FBbUM4SCxTQUFwQyxDQUFIO0FBQ0QsS0FSRCxNQVNLO0FBQ0huSSxNQUFBQSxJQUFJLENBQUM0RyxPQUFMLEdBQWUsS0FBZjtBQUNBM0YsTUFBQUEsR0FBRyxDQUFDWixHQUFHLEdBQUcsd0JBQVAsQ0FBSDtBQUNEO0FBQ0YsR0EvR0QsQ0FnSEEsT0FBTWlELENBQU4sRUFBUztBQUNQOUQsSUFBQUEsT0FBTyxDQUFDLGNBQUQsQ0FBUCxDQUF3QmUsSUFBeEIsQ0FBNkJqQixPQUE3QixFQUFxQ2dFLENBQXJDOztBQUNBaEMsSUFBQUEsV0FBVyxDQUFDa0MsTUFBWixDQUFtQnpELElBQW5CLENBQXdCLHVCQUF1QnVELENBQS9DO0FBQ0Q7QUFDRixDLENBRUQ7OztBQUNPLFNBQVNrRCxlQUFULENBQXlCbkcsR0FBekIsRUFBOEJpQixXQUE5QixFQUEyQ29FLFVBQTNDLEVBQXVEbUIsS0FBdkQsRUFBOER2SCxPQUE5RCxFQUF1RTtBQUM1RSxNQUFJO0FBQ0YsVUFBTUMsRUFBRSxHQUFHQyxPQUFPLENBQUMsSUFBRCxDQUFsQjs7QUFDQSxVQUFNZSxJQUFJLEdBQUdmLE9BQU8sQ0FBQyxjQUFELENBQVAsQ0FBd0JlLElBQXJDOztBQUNBQSxJQUFBQSxJQUFJLENBQUNqQixPQUFELEVBQVMsMEJBQVQsQ0FBSjtBQUVBLFFBQUk4SSxNQUFKOztBQUFZLFFBQUk7QUFBRUEsTUFBQUEsTUFBTSxHQUFHNUksT0FBTyxDQUFDLGFBQUQsQ0FBaEI7QUFBaUMsS0FBdkMsQ0FBd0MsT0FBTzhELENBQVAsRUFBVTtBQUFFOEUsTUFBQUEsTUFBTSxHQUFHLFFBQVQ7QUFBbUI7O0FBQ25GLFFBQUk3SSxFQUFFLENBQUNrQixVQUFILENBQWMySCxNQUFkLENBQUosRUFBMkI7QUFDekI3SCxNQUFBQSxJQUFJLENBQUNqQixPQUFELEVBQVMsc0JBQVQsQ0FBSjtBQUNELEtBRkQsTUFHSztBQUNIaUIsTUFBQUEsSUFBSSxDQUFDakIsT0FBRCxFQUFTLDhCQUFULENBQUo7QUFDRDs7QUFFRCxXQUFPLElBQUkrSSxPQUFKLENBQVksQ0FBQ3ZHLE9BQUQsRUFBVXdHLE1BQVYsS0FBcUI7QUFDdEMsWUFBTUMsV0FBVyxHQUFHLE1BQU07QUFDeEJoSSxRQUFBQSxJQUFJLENBQUNqQixPQUFELEVBQVMsYUFBVCxDQUFKO0FBQ0F3QyxRQUFBQSxPQUFPO0FBQ1IsT0FIRDs7QUFLQSxVQUFJMEcsSUFBSSxHQUFHO0FBQUV4RyxRQUFBQSxHQUFHLEVBQUUwRCxVQUFQO0FBQW1CK0MsUUFBQUEsTUFBTSxFQUFFLElBQTNCO0FBQWlDQyxRQUFBQSxLQUFLLEVBQUUsTUFBeEM7QUFBZ0RDLFFBQUFBLFFBQVEsRUFBRTtBQUExRCxPQUFYO0FBQ0FDLE1BQUFBLFlBQVksQ0FBQ3ZJLEdBQUQsRUFBTStILE1BQU4sRUFBY3ZCLEtBQWQsRUFBcUIyQixJQUFyQixFQUEyQmxILFdBQTNCLEVBQXdDaEMsT0FBeEMsQ0FBWixDQUE2RHVKLElBQTdELENBQ0UsWUFBVztBQUFFTixRQUFBQSxXQUFXO0FBQUksT0FEOUIsRUFFRSxVQUFTTyxNQUFULEVBQWlCO0FBQUVSLFFBQUFBLE1BQU0sQ0FBQ1EsTUFBRCxDQUFOO0FBQWdCLE9BRnJDO0FBSUQsS0FYTSxDQUFQO0FBWUQsR0F6QkQsQ0EwQkEsT0FBTXhGLENBQU4sRUFBUztBQUNQQyxJQUFBQSxPQUFPLENBQUN0QyxHQUFSLENBQVksR0FBWjs7QUFDQXpCLElBQUFBLE9BQU8sQ0FBQyxjQUFELENBQVAsQ0FBd0JlLElBQXhCLENBQTZCakIsT0FBN0IsRUFBcUNnRSxDQUFyQzs7QUFDQWhDLElBQUFBLFdBQVcsQ0FBQ2tDLE1BQVosQ0FBbUJ6RCxJQUFuQixDQUF3QixzQkFBc0J1RCxDQUE5QztBQUNBaUQsSUFBQUEsUUFBUTtBQUNUO0FBQ0YsQyxDQUVEOzs7QUFDTyxTQUFTd0MsS0FBVCxDQUFlL0ksSUFBZixFQUFxQlYsT0FBckIsRUFBOEI7QUFDbkMsTUFBSTtBQUNGLFVBQU0yQixHQUFHLEdBQUd6QixPQUFPLENBQUMsY0FBRCxDQUFQLENBQXdCeUIsR0FBcEM7O0FBQ0EsVUFBTVYsSUFBSSxHQUFHZixPQUFPLENBQUMsY0FBRCxDQUFQLENBQXdCZSxJQUFyQzs7QUFDQUEsSUFBQUEsSUFBSSxDQUFDakIsT0FBRCxFQUFTLGdCQUFULENBQUo7O0FBRUEsUUFBSVUsSUFBSSxDQUFDZ0IsVUFBTCxJQUFtQixDQUFDMUIsT0FBTyxDQUFDNkIsU0FBNUIsSUFBeUM3QixPQUFPLENBQUNNLFNBQVIsSUFBcUIsU0FBbEUsRUFBNkU7QUFDM0VKLE1BQUFBLE9BQU8sQ0FBRSxLQUFJSSxTQUFVLE1BQWhCLENBQVAsQ0FBOEJtSixLQUE5QixDQUFvQy9JLElBQXBDLEVBQTBDVixPQUExQztBQUNEOztBQUVELFFBQUk7QUFDRixVQUFHQSxPQUFPLENBQUMwSixPQUFSLElBQW1CLElBQW5CLElBQTJCMUosT0FBTyxDQUFDcUgsS0FBUixJQUFpQixLQUE1QyxJQUFxRDNHLElBQUksQ0FBQ2dCLFVBQUwsSUFBbUIsS0FBM0UsRUFBa0Y7QUFDaEYsWUFBSWhCLElBQUksQ0FBQ2lKLFlBQUwsSUFBcUIsQ0FBekIsRUFBNEI7QUFDMUIsY0FBSUMsR0FBRyxHQUFHLHNCQUFzQjVKLE9BQU8sQ0FBQzZKLElBQXhDOztBQUNBM0osVUFBQUEsT0FBTyxDQUFDLGNBQUQsQ0FBUCxDQUF3QnlCLEdBQXhCLENBQTRCakIsSUFBSSxDQUFDSyxHQUFMLEdBQVksc0JBQXFCNkksR0FBSSxFQUFqRTs7QUFDQWxKLFVBQUFBLElBQUksQ0FBQ2lKLFlBQUw7O0FBQ0EsZ0JBQU1HLEdBQUcsR0FBRzVKLE9BQU8sQ0FBQyxLQUFELENBQW5COztBQUNBNEosVUFBQUEsR0FBRyxDQUFDRixHQUFELENBQUg7QUFDRDtBQUNGO0FBQ0YsS0FWRCxDQVdBLE9BQU81RixDQUFQLEVBQVU7QUFDUkMsTUFBQUEsT0FBTyxDQUFDdEMsR0FBUixDQUFZcUMsQ0FBWixFQURRLENBRVI7QUFDRDtBQUNGLEdBeEJELENBeUJBLE9BQU1BLENBQU4sRUFBUztBQUNQOUQsSUFBQUEsT0FBTyxDQUFDLGNBQUQsQ0FBUCxDQUF3QmUsSUFBeEIsQ0FBNkJqQixPQUE3QixFQUFxQ2dFLENBQXJDO0FBQ0Q7QUFDRixDLENBRUQ7OztTQUNzQnNGLFk7Ozs7Ozs7MEJBQWYsa0JBQTZCdkksR0FBN0IsRUFBa0NxRyxPQUFsQyxFQUEyQ0csS0FBM0MsRUFBa0QyQixJQUFsRCxFQUF3RGxILFdBQXhELEVBQXFFaEMsT0FBckU7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBRUg7QUFDTStKLFVBQUFBLGVBSEgsR0FHcUIsQ0FBQyxlQUFELEVBQWtCLGVBQWxCLEVBQW1DLGNBQW5DLEVBQW1ELGtCQUFuRCxFQUF1RSx3QkFBdkUsRUFBaUcsOEJBQWpHLEVBQWlJLE9BQWpJLEVBQTBJLE9BQTFJLEVBQW1KLGVBQW5KLEVBQW9LLHFCQUFwSyxFQUEyTCxlQUEzTCxFQUE0TSx1QkFBNU0sQ0FIckI7QUFJQ0MsVUFBQUEsVUFKRCxHQUljRCxlQUpkO0FBS0NFLFVBQUFBLEtBTEQsR0FLUy9KLE9BQU8sQ0FBQyxPQUFELENBTGhCO0FBTUdnSyxVQUFBQSxVQU5ILEdBTWdCaEssT0FBTyxDQUFDLGFBQUQsQ0FOdkI7QUFPR3lCLFVBQUFBLEdBUEgsR0FPU3pCLE9BQU8sQ0FBQyxjQUFELENBQVAsQ0FBd0J5QixHQVBqQztBQVFIVixVQUFBQSxJQUFJLENBQUNqQixPQUFELEVBQVUsdUJBQVYsQ0FBSjtBQVJHO0FBQUEsaUJBU0csSUFBSStJLE9BQUosQ0FBWSxDQUFDdkcsT0FBRCxFQUFVd0csTUFBVixLQUFxQjtBQUNyQy9ILFlBQUFBLElBQUksQ0FBQ2pCLE9BQUQsRUFBVSxhQUFZb0gsT0FBUSxFQUE5QixDQUFKO0FBQ0FuRyxZQUFBQSxJQUFJLENBQUNqQixPQUFELEVBQVcsV0FBVXVILEtBQU0sRUFBM0IsQ0FBSjtBQUNBdEcsWUFBQUEsSUFBSSxDQUFDakIsT0FBRCxFQUFXLFVBQVNvQixJQUFJLENBQUNJLFNBQUwsQ0FBZTBILElBQWYsQ0FBcUIsRUFBekMsQ0FBSjtBQUNBLGdCQUFJaUIsS0FBSyxHQUFHRCxVQUFVLENBQUM5QyxPQUFELEVBQVVHLEtBQVYsRUFBaUIyQixJQUFqQixDQUF0QjtBQUNBaUIsWUFBQUEsS0FBSyxDQUFDQyxFQUFOLENBQVMsT0FBVCxFQUFrQixDQUFDdEYsSUFBRCxFQUFPdUYsTUFBUCxLQUFrQjtBQUNsQ3BKLGNBQUFBLElBQUksQ0FBQ2pCLE9BQUQsRUFBVyxZQUFELEdBQWU4RSxJQUF6QixDQUFKOztBQUNBLGtCQUFHQSxJQUFJLEtBQUssQ0FBWixFQUFlO0FBQUV0QyxnQkFBQUEsT0FBTyxDQUFDLENBQUQsQ0FBUDtBQUFZLGVBQTdCLE1BQ0s7QUFBRVIsZ0JBQUFBLFdBQVcsQ0FBQ2tDLE1BQVosQ0FBbUJ6RCxJQUFuQixDQUF5QixJQUFJNkosS0FBSixDQUFVeEYsSUFBVixDQUF6QjtBQUE0Q3RDLGdCQUFBQSxPQUFPLENBQUMsQ0FBRCxDQUFQO0FBQVk7QUFDaEUsYUFKRDtBQUtBMkgsWUFBQUEsS0FBSyxDQUFDQyxFQUFOLENBQVMsT0FBVCxFQUFtQkcsS0FBRCxJQUFXO0FBQzNCdEosY0FBQUEsSUFBSSxDQUFDakIsT0FBRCxFQUFXLFVBQVgsQ0FBSjtBQUNBZ0MsY0FBQUEsV0FBVyxDQUFDa0MsTUFBWixDQUFtQnpELElBQW5CLENBQXdCOEosS0FBeEI7QUFDQS9ILGNBQUFBLE9BQU8sQ0FBQyxDQUFELENBQVA7QUFDRCxhQUpEO0FBS0EySCxZQUFBQSxLQUFLLENBQUNLLE1BQU4sQ0FBYUosRUFBYixDQUFnQixNQUFoQixFQUF5QmpFLElBQUQsSUFBVTtBQUNoQyxrQkFBSXNFLEdBQUcsR0FBR3RFLElBQUksQ0FBQzVDLFFBQUwsR0FBZ0JFLE9BQWhCLENBQXdCLFdBQXhCLEVBQXFDLEdBQXJDLEVBQTBDK0MsSUFBMUMsRUFBVjtBQUNBdkYsY0FBQUEsSUFBSSxDQUFDakIsT0FBRCxFQUFXLEdBQUV5SyxHQUFJLEVBQWpCLENBQUo7O0FBQ0Esa0JBQUl0RSxJQUFJLElBQUlBLElBQUksQ0FBQzVDLFFBQUwsR0FBZ0JpQixLQUFoQixDQUFzQiwyQkFBdEIsQ0FBWixFQUFnRTtBQUM5RGhDLGdCQUFBQSxPQUFPLENBQUMsQ0FBRCxDQUFQO0FBQ0QsZUFGRCxNQUdLO0FBQ0gsb0JBQUl3SCxVQUFVLENBQUNVLElBQVgsQ0FBZ0IsVUFBU0MsQ0FBVCxFQUFZO0FBQUUseUJBQU94RSxJQUFJLENBQUNoRCxPQUFMLENBQWF3SCxDQUFiLEtBQW1CLENBQTFCO0FBQThCLGlCQUE1RCxDQUFKLEVBQW1FO0FBQ2pFRixrQkFBQUEsR0FBRyxHQUFHQSxHQUFHLENBQUNoSCxPQUFKLENBQVksT0FBWixFQUFxQixFQUFyQixDQUFOO0FBQ0FnSCxrQkFBQUEsR0FBRyxHQUFHQSxHQUFHLENBQUNoSCxPQUFKLENBQVksT0FBWixFQUFxQixFQUFyQixDQUFOO0FBQ0FnSCxrQkFBQUEsR0FBRyxHQUFHQSxHQUFHLENBQUNoSCxPQUFKLENBQVloQixPQUFPLENBQUNDLEdBQVIsRUFBWixFQUEyQixFQUEzQixFQUErQjhELElBQS9CLEVBQU47O0FBQ0Esc0JBQUlpRSxHQUFHLENBQUM5QixRQUFKLENBQWEsT0FBYixDQUFKLEVBQTJCO0FBQ3pCM0csb0JBQUFBLFdBQVcsQ0FBQ2tDLE1BQVosQ0FBbUJ6RCxJQUFuQixDQUF3Qk0sR0FBRyxHQUFHMEosR0FBRyxDQUFDaEgsT0FBSixDQUFZLGFBQVosRUFBMkIsRUFBM0IsQ0FBOUI7QUFDQWdILG9CQUFBQSxHQUFHLEdBQUdBLEdBQUcsQ0FBQ2hILE9BQUosQ0FBWSxPQUFaLEVBQXNCLEdBQUV3RyxLQUFLLENBQUNXLEdBQU4sQ0FBVSxPQUFWLENBQW1CLEVBQTNDLENBQU47QUFDRDs7QUFDRGpKLGtCQUFBQSxHQUFHLENBQUUsR0FBRVosR0FBSSxHQUFFMEosR0FBSSxFQUFkLENBQUg7QUFDRDtBQUNGO0FBQ0YsYUFsQkQ7QUFtQkFOLFlBQUFBLEtBQUssQ0FBQ1UsTUFBTixDQUFhVCxFQUFiLENBQWdCLE1BQWhCLEVBQXlCakUsSUFBRCxJQUFVO0FBQ2hDbEYsY0FBQUEsSUFBSSxDQUFDakIsT0FBRCxFQUFXLGtCQUFELEdBQXFCbUcsSUFBL0IsQ0FBSjtBQUNBLGtCQUFJc0UsR0FBRyxHQUFHdEUsSUFBSSxDQUFDNUMsUUFBTCxHQUFnQkUsT0FBaEIsQ0FBd0IsV0FBeEIsRUFBcUMsR0FBckMsRUFBMEMrQyxJQUExQyxFQUFWO0FBQ0Esa0JBQUlzRSxXQUFXLEdBQUcseUJBQWxCO0FBQ0Esa0JBQUluQyxRQUFRLEdBQUc4QixHQUFHLENBQUM5QixRQUFKLENBQWFtQyxXQUFiLENBQWY7O0FBQ0Esa0JBQUksQ0FBQ25DLFFBQUwsRUFBZTtBQUNiMUUsZ0JBQUFBLE9BQU8sQ0FBQ3RDLEdBQVIsQ0FBYSxHQUFFWixHQUFJLElBQUdrSixLQUFLLENBQUNXLEdBQU4sQ0FBVSxPQUFWLENBQW1CLElBQUdILEdBQUksRUFBaEQ7QUFDRDtBQUNGLGFBUkQ7QUFTRCxXQTNDSyxDQVRIOztBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7O0FBdURIdkssVUFBQUEsT0FBTyxDQUFDLGNBQUQsQ0FBUCxDQUF3QmUsSUFBeEIsQ0FBNkJqQixPQUE3Qjs7QUFDQWdDLFVBQUFBLFdBQVcsQ0FBQ2tDLE1BQVosQ0FBbUJ6RCxJQUFuQixDQUF3QiwrQkFBeEI7QUFDQXdHLFVBQUFBLFFBQVE7O0FBekRMO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHOzs7O0FBNkRBLFNBQVN0RixHQUFULENBQWFvSixDQUFiLEVBQWdCO0FBQ3JCN0ssRUFBQUEsT0FBTyxDQUFDLFVBQUQsQ0FBUCxDQUFvQjhLLFFBQXBCLENBQTZCdkksT0FBTyxDQUFDK0gsTUFBckMsRUFBNkMsQ0FBN0M7O0FBQ0EsTUFBSTtBQUNGL0gsSUFBQUEsT0FBTyxDQUFDK0gsTUFBUixDQUFlUyxTQUFmO0FBQ0QsR0FGRCxDQUdBLE9BQU1qSCxDQUFOLEVBQVMsQ0FBRTs7QUFDWHZCLEVBQUFBLE9BQU8sQ0FBQytILE1BQVIsQ0FBZVUsS0FBZixDQUFxQkgsQ0FBckI7QUFDQXRJLEVBQUFBLE9BQU8sQ0FBQytILE1BQVIsQ0FBZVUsS0FBZixDQUFxQixJQUFyQjtBQUNEOztBQUVNLFNBQVNqSyxJQUFULENBQWNqQixPQUFkLEVBQXVCK0ssQ0FBdkIsRUFBMEI7QUFDL0IsTUFBSS9LLE9BQU8sQ0FBQ21MLE9BQVIsSUFBbUIsS0FBdkIsRUFBOEI7QUFDNUJqTCxJQUFBQSxPQUFPLENBQUMsVUFBRCxDQUFQLENBQW9COEssUUFBcEIsQ0FBNkJ2SSxPQUFPLENBQUMrSCxNQUFyQyxFQUE2QyxDQUE3Qzs7QUFDQSxRQUFJO0FBQ0YvSCxNQUFBQSxPQUFPLENBQUMrSCxNQUFSLENBQWVTLFNBQWY7QUFDRCxLQUZELENBR0EsT0FBTWpILENBQU4sRUFBUyxDQUFFOztBQUNYdkIsSUFBQUEsT0FBTyxDQUFDK0gsTUFBUixDQUFlVSxLQUFmLENBQXNCLGFBQVlILENBQUUsRUFBcEM7QUFDQXRJLElBQUFBLE9BQU8sQ0FBQytILE1BQVIsQ0FBZVUsS0FBZixDQUFxQixJQUFyQjtBQUNEO0FBQ0Y7O0FBRU0sU0FBU2xLLE9BQVQsR0FBbUI7QUFDeEIsTUFBSWlKLEtBQUssR0FBRy9KLE9BQU8sQ0FBQyxPQUFELENBQW5COztBQUNBLE1BQUlrTCxNQUFNLEdBQUksRUFBZDs7QUFDQSxRQUFNQyxRQUFRLEdBQUduTCxPQUFPLENBQUMsSUFBRCxDQUFQLENBQWNtTCxRQUFkLEVBQWpCOztBQUNBLE1BQUlBLFFBQVEsSUFBSSxRQUFoQixFQUEwQjtBQUFFRCxJQUFBQSxNQUFNLEdBQUksVUFBVjtBQUFxQixHQUFqRCxNQUNLO0FBQUVBLElBQUFBLE1BQU0sR0FBSSxVQUFWO0FBQXFCOztBQUM1QixTQUFRLEdBQUVuQixLQUFLLENBQUNxQixLQUFOLENBQVlGLE1BQVosQ0FBb0IsR0FBOUI7QUFDRDs7QUFFTSxTQUFTeEosWUFBVCxDQUFzQmIsR0FBdEIsRUFBMkJELFVBQTNCLEVBQXVDeUssYUFBdkMsRUFBc0Q7QUFDM0QsUUFBTXBKLElBQUksR0FBR2pDLE9BQU8sQ0FBQyxNQUFELENBQXBCOztBQUNBLFFBQU1ELEVBQUUsR0FBR0MsT0FBTyxDQUFDLElBQUQsQ0FBbEI7O0FBRUEsTUFBSXlLLENBQUMsR0FBRyxFQUFSO0FBQ0EsTUFBSWEsVUFBVSxHQUFHckosSUFBSSxDQUFDSyxPQUFMLENBQWFDLE9BQU8sQ0FBQ0MsR0FBUixFQUFiLEVBQTJCLHNCQUEzQixFQUFtRDVCLFVBQW5ELENBQWpCO0FBQ0EsTUFBSTJLLFNBQVMsR0FBSXhMLEVBQUUsQ0FBQ2tCLFVBQUgsQ0FBY3FLLFVBQVUsR0FBQyxlQUF6QixLQUE2Q3BLLElBQUksQ0FBQ0MsS0FBTCxDQUFXcEIsRUFBRSxDQUFDcUIsWUFBSCxDQUFnQmtLLFVBQVUsR0FBQyxlQUEzQixFQUE0QyxPQUE1QyxDQUFYLENBQTdDLElBQWlILEVBQWxJO0FBQ0FiLEVBQUFBLENBQUMsQ0FBQ2UsYUFBRixHQUFrQkQsU0FBUyxDQUFDRSxPQUE1QjtBQUNBaEIsRUFBQUEsQ0FBQyxDQUFDaUIsU0FBRixHQUFjSCxTQUFTLENBQUNHLFNBQXhCOztBQUNBLE1BQUlqQixDQUFDLENBQUNpQixTQUFGLElBQWVyTCxTQUFuQixFQUE4QjtBQUM1Qm9LLElBQUFBLENBQUMsQ0FBQ2tCLE9BQUYsR0FBYSxZQUFiO0FBQ0QsR0FGRCxNQUdLO0FBQ0gsUUFBSSxDQUFDLENBQUQsSUFBTWxCLENBQUMsQ0FBQ2lCLFNBQUYsQ0FBWXpJLE9BQVosQ0FBb0IsV0FBcEIsQ0FBVixFQUE0QztBQUMxQ3dILE1BQUFBLENBQUMsQ0FBQ2tCLE9BQUYsR0FBYSxZQUFiO0FBQ0QsS0FGRCxNQUdLO0FBQ0hsQixNQUFBQSxDQUFDLENBQUNrQixPQUFGLEdBQWEsV0FBYjtBQUNEO0FBQ0Y7O0FBRUQsTUFBSUMsV0FBVyxHQUFHM0osSUFBSSxDQUFDSyxPQUFMLENBQWFDLE9BQU8sQ0FBQ0MsR0FBUixFQUFiLEVBQTJCLHNCQUEzQixDQUFsQjtBQUNBLE1BQUlxSixVQUFVLEdBQUk5TCxFQUFFLENBQUNrQixVQUFILENBQWMySyxXQUFXLEdBQUMsZUFBMUIsS0FBOEMxSyxJQUFJLENBQUNDLEtBQUwsQ0FBV3BCLEVBQUUsQ0FBQ3FCLFlBQUgsQ0FBZ0J3SyxXQUFXLEdBQUMsZUFBNUIsRUFBNkMsT0FBN0MsQ0FBWCxDQUE5QyxJQUFtSCxFQUFySTtBQUNBbkIsRUFBQUEsQ0FBQyxDQUFDcUIsY0FBRixHQUFtQkQsVUFBVSxDQUFDSixPQUE5QjtBQUVBLE1BQUlqRixPQUFPLEdBQUd2RSxJQUFJLENBQUNLLE9BQUwsQ0FBYUMsT0FBTyxDQUFDQyxHQUFSLEVBQWIsRUFBMkIsMEJBQTNCLENBQWQ7QUFDQSxNQUFJdUosTUFBTSxHQUFJaE0sRUFBRSxDQUFDa0IsVUFBSCxDQUFjdUYsT0FBTyxHQUFDLGVBQXRCLEtBQTBDdEYsSUFBSSxDQUFDQyxLQUFMLENBQVdwQixFQUFFLENBQUNxQixZQUFILENBQWdCb0YsT0FBTyxHQUFDLGVBQXhCLEVBQXlDLE9BQXpDLENBQVgsQ0FBMUMsSUFBMkcsRUFBekg7QUFDQWlFLEVBQUFBLENBQUMsQ0FBQ3VCLFVBQUYsR0FBZUQsTUFBTSxDQUFDbkQsTUFBUCxDQUFjNkMsT0FBN0I7QUFFQSxNQUFJUSxPQUFPLEdBQUdoSyxJQUFJLENBQUNLLE9BQUwsQ0FBYUMsT0FBTyxDQUFDQyxHQUFSLEVBQWIsRUFBNEIsMEJBQTVCLENBQWQ7QUFDQSxNQUFJMEosTUFBTSxHQUFJbk0sRUFBRSxDQUFDa0IsVUFBSCxDQUFjZ0wsT0FBTyxHQUFDLGVBQXRCLEtBQTBDL0ssSUFBSSxDQUFDQyxLQUFMLENBQVdwQixFQUFFLENBQUNxQixZQUFILENBQWdCNkssT0FBTyxHQUFDLGVBQXhCLEVBQXlDLE9BQXpDLENBQVgsQ0FBMUMsSUFBMkcsRUFBekg7QUFDQXhCLEVBQUFBLENBQUMsQ0FBQzBCLFVBQUYsR0FBZUQsTUFBTSxDQUFDRSxZQUF0Qjs7QUFFQSxNQUFJM0IsQ0FBQyxDQUFDMEIsVUFBRixJQUFnQjlMLFNBQXBCLEVBQStCO0FBQzdCLFFBQUk0TCxPQUFPLEdBQUdoSyxJQUFJLENBQUNLLE9BQUwsQ0FBYUMsT0FBTyxDQUFDQyxHQUFSLEVBQWIsRUFBNEIsd0JBQXVCNUIsVUFBVywyQkFBOUQsQ0FBZDtBQUNBLFFBQUlzTCxNQUFNLEdBQUluTSxFQUFFLENBQUNrQixVQUFILENBQWNnTCxPQUFPLEdBQUMsZUFBdEIsS0FBMEMvSyxJQUFJLENBQUNDLEtBQUwsQ0FBV3BCLEVBQUUsQ0FBQ3FCLFlBQUgsQ0FBZ0I2SyxPQUFPLEdBQUMsZUFBeEIsRUFBeUMsT0FBekMsQ0FBWCxDQUExQyxJQUEyRyxFQUF6SDtBQUNBeEIsSUFBQUEsQ0FBQyxDQUFDMEIsVUFBRixHQUFlRCxNQUFNLENBQUNFLFlBQXRCO0FBQ0Q7O0FBRUQsTUFBSUMsYUFBYSxHQUFHLEVBQXBCOztBQUNDLE1BQUloQixhQUFhLElBQUloTCxTQUFqQixJQUE4QmdMLGFBQWEsSUFBSSxPQUFuRCxFQUE0RDtBQUMzRCxRQUFJaUIsYUFBYSxHQUFHLEVBQXBCOztBQUNBLFFBQUlqQixhQUFhLElBQUksT0FBckIsRUFBOEI7QUFDNUJpQixNQUFBQSxhQUFhLEdBQUdySyxJQUFJLENBQUNLLE9BQUwsQ0FBYUMsT0FBTyxDQUFDQyxHQUFSLEVBQWIsRUFBMkIsb0JBQTNCLENBQWhCO0FBQ0Q7O0FBQ0QsUUFBSTZJLGFBQWEsSUFBSSxTQUFyQixFQUFnQztBQUM5QmlCLE1BQUFBLGFBQWEsR0FBR3JLLElBQUksQ0FBQ0ssT0FBTCxDQUFhQyxPQUFPLENBQUNDLEdBQVIsRUFBYixFQUEyQiw0QkFBM0IsQ0FBaEI7QUFDRDs7QUFDRCxRQUFJK0osWUFBWSxHQUFJeE0sRUFBRSxDQUFDa0IsVUFBSCxDQUFjcUwsYUFBYSxHQUFDLGVBQTVCLEtBQWdEcEwsSUFBSSxDQUFDQyxLQUFMLENBQVdwQixFQUFFLENBQUNxQixZQUFILENBQWdCa0wsYUFBYSxHQUFDLGVBQTlCLEVBQStDLE9BQS9DLENBQVgsQ0FBaEQsSUFBdUgsRUFBM0k7QUFDQTdCLElBQUFBLENBQUMsQ0FBQytCLGdCQUFGLEdBQXFCRCxZQUFZLENBQUNkLE9BQWxDO0FBQ0FZLElBQUFBLGFBQWEsR0FBRyxPQUFPaEIsYUFBUCxHQUF1QixJQUF2QixHQUE4QlosQ0FBQyxDQUFDK0IsZ0JBQWhEO0FBQ0Q7O0FBQ0QsU0FBTzNMLEdBQUcsR0FBRyxzQkFBTixHQUErQjRKLENBQUMsQ0FBQ2UsYUFBakMsR0FBaUQsWUFBakQsR0FBZ0VmLENBQUMsQ0FBQ3VCLFVBQWxFLEdBQStFLEdBQS9FLEdBQXFGdkIsQ0FBQyxDQUFDa0IsT0FBdkYsR0FBaUcsd0JBQWpHLEdBQTRIbEIsQ0FBQyxDQUFDMEIsVUFBOUgsR0FBMkksYUFBM0ksR0FBMkoxQixDQUFDLENBQUNxQixjQUE3SixHQUE4S08sYUFBckw7QUFDQSIsInNvdXJjZXNDb250ZW50IjpbIi8vKioqKioqKioqKlxuZXhwb3J0IGZ1bmN0aW9uIF9jb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gIC8vY29uc3QgcGF0aCA9IHJlcXVpcmUoJ3BhdGgnKVxuICBjb25zdCBmcyA9IHJlcXVpcmUoJ2ZzJylcbiAgLy9jb25zdCBmc3ggPSByZXF1aXJlKCdmcy1leHRyYScpXG5cbiAgdmFyIHRoaXNWYXJzID0ge31cbiAgdmFyIHRoaXNPcHRpb25zID0ge31cbiAgdmFyIHBsdWdpbiA9IHt9XG5cbiAgaWYgKG9wdGlvbnMuZnJhbWV3b3JrID09IHVuZGVmaW5lZCkge1xuICAgIHRoaXNWYXJzLnBsdWdpbkVycm9ycyA9IFtdXG4gICAgdGhpc1ZhcnMucGx1Z2luRXJyb3JzLnB1c2goJ3dlYnBhY2sgY29uZmlnOiBmcmFtZXdvcmsgcGFyYW1ldGVyIG9uIGV4dC13ZWJwYWNrLXBsdWdpbiBpcyBub3QgZGVmaW5lZCAtIHZhbHVlczogcmVhY3QsIGFuZ3VsYXIsIGV4dGpzJylcbiAgICBwbHVnaW4udmFycyA9IHRoaXNWYXJzXG4gICAgcmV0dXJuIHBsdWdpblxuICB9XG5cbiAgY29uc3QgdmFsaWRhdGVPcHRpb25zID0gcmVxdWlyZSgnc2NoZW1hLXV0aWxzJylcbiAgdmFsaWRhdGVPcHRpb25zKHJlcXVpcmUoYC4vJHtvcHRpb25zLmZyYW1ld29ya31VdGlsYCkuZ2V0VmFsaWRhdGVPcHRpb25zKCksIG9wdGlvbnMsICcnKVxuICB0aGlzVmFycyA9IHJlcXVpcmUoYC4vJHtvcHRpb25zLmZyYW1ld29ya31VdGlsYCkuZ2V0RGVmYXVsdFZhcnMoKVxuICB0aGlzVmFycy5mcmFtZXdvcmsgPSBvcHRpb25zLmZyYW1ld29ya1xuICBzd2l0Y2godGhpc1ZhcnMuZnJhbWV3b3JrKSB7XG4gICAgY2FzZSAnZXh0anMnOlxuICAgICAgdGhpc1ZhcnMucGx1Z2luTmFtZSA9ICdleHQtd2VicGFjay1wbHVnaW4nXG4gICAgICBicmVhaztcbiAgICBjYXNlICdyZWFjdCc6XG4gICAgICB0aGlzVmFycy5wbHVnaW5OYW1lID0gJ2V4dC1yZWFjdC13ZWJwYWNrLXBsdWdpbidcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ2FuZ3VsYXInOlxuICAgICAgdGhpc1ZhcnMucGx1Z2luTmFtZSA9ICdleHQtYW5ndWxhci13ZWJwYWNrLXBsdWdpbidcbiAgICAgIGJyZWFrO1xuICAgIGRlZmF1bHQ6XG4gICAgICB0aGlzVmFycy5wbHVnaW5OYW1lID0gJ2V4dC13ZWJwYWNrLXBsdWdpbidcbiAgfVxuXG4gIHRoaXNWYXJzLmFwcCA9IHJlcXVpcmUoJy4vcGx1Z2luVXRpbCcpLl9nZXRBcHAoKVxuICBsb2d2KG9wdGlvbnMsIGBwbHVnaW5OYW1lIC0gJHt0aGlzVmFycy5wbHVnaW5OYW1lfWApXG4gIGxvZ3Yob3B0aW9ucywgYHRoaXNWYXJzLmFwcCAtICR7dGhpc1ZhcnMuYXBwfWApXG5cbiAgY29uc3QgcmMgPSAoZnMuZXhpc3RzU3luYyhgLmV4dC0ke3RoaXNWYXJzLmZyYW1ld29ya31yY2ApICYmIEpTT04ucGFyc2UoZnMucmVhZEZpbGVTeW5jKGAuZXh0LSR7dGhpc1ZhcnMuZnJhbWV3b3JrfXJjYCwgJ3V0Zi04JykpIHx8IHt9KVxuICB0aGlzT3B0aW9ucyA9IHsgLi4ucmVxdWlyZShgLi8ke3RoaXNWYXJzLmZyYW1ld29ya31VdGlsYCkuZ2V0RGVmYXVsdE9wdGlvbnMoKSwgLi4ub3B0aW9ucywgLi4ucmMgfVxuICBsb2d2KG9wdGlvbnMsIGB0aGlzT3B0aW9ucyAtICR7SlNPTi5zdHJpbmdpZnkodGhpc09wdGlvbnMpfWApXG5cbiAgaWYgKHRoaXNPcHRpb25zLmVudmlyb25tZW50ID09ICdwcm9kdWN0aW9uJykgXG4gICAge3RoaXNWYXJzLnByb2R1Y3Rpb24gPSB0cnVlfVxuICBlbHNlIFxuICAgIHt0aGlzVmFycy5wcm9kdWN0aW9uID0gZmFsc2V9XG5cbiAgbG9nKHJlcXVpcmUoJy4vcGx1Z2luVXRpbCcpLl9nZXRWZXJzaW9ucyh0aGlzVmFycy5hcHAsIHRoaXNWYXJzLnBsdWdpbk5hbWUsIHRoaXNWYXJzLmZyYW1ld29yaykpXG4gIGxvZyh0aGlzVmFycy5hcHAgKyAnQnVpbGRpbmcgZm9yICcgKyB0aGlzT3B0aW9ucy5lbnZpcm9ubWVudClcbiAgbG9nKHRoaXNWYXJzLmFwcCArICdUcmVlc2hha2UgaXMgJyArIHRoaXNPcHRpb25zLnRyZWVzaGFrZSlcblxuICBwbHVnaW4udmFycyA9IHRoaXNWYXJzXG4gIHBsdWdpbi5vcHRpb25zID0gdGhpc09wdGlvbnNcbiAgcmVxdWlyZSgnLi9wbHVnaW5VdGlsJykubG9ndihvcHRpb25zLCAnRlVOQ1RJT04gY29uc3RydWN0b3IgKGVuZCknKVxuICByZXR1cm4gcGx1Z2luXG59XG5cbi8vKioqKioqKioqKlxuZXhwb3J0IGZ1bmN0aW9uIF9jb21waWxhdGlvbihjb21waWxlciwgY29tcGlsYXRpb24sIHZhcnMsIG9wdGlvbnMpIHtcbiAgdHJ5IHtcbiAgICByZXF1aXJlKCcuL3BsdWdpblV0aWwnKS5sb2d2KG9wdGlvbnMsICdGVU5DVElPTiBfY29tcGlsYXRpb24nKVxuXG4gICAgY29uc3QgZnN4ID0gcmVxdWlyZSgnZnMtZXh0cmEnKVxuICAgIGNvbnN0IGZzID0gcmVxdWlyZSgnZnMnKVxuICAgIGNvbnN0IG1rZGlycCA9IHJlcXVpcmUoJ21rZGlycCcpXG4gICAgY29uc3QgcGF0aCA9IHJlcXVpcmUoJ3BhdGgnKVxuXG4gICAgY29uc3QgZXh0QW5ndWxhclBhY2thZ2UgPSAnQHNlbmNoYS9leHQtYW5ndWxhcidcbiAgICBjb25zdCBleHRBbmd1bGFyRm9sZGVyID0gJ2V4dC1hbmd1bGFyLXByb2QnXG4gICAgY29uc3QgZXh0QW5ndWxhck1vZHVsZSA9ICdleHQtYW5ndWxhci5tb2R1bGUnXG4gICAgY29uc3QgcGF0aFRvRXh0QW5ndWxhck1vZGVybiA9IHBhdGgucmVzb2x2ZShwcm9jZXNzLmN3ZCgpLCBgc3JjL2FwcC8ke2V4dEFuZ3VsYXJGb2xkZXJ9YClcbiAgICB2YXIgZXh0Q29tcG9uZW50cyA9IFtdXG5cbiAgICBpZiAodmFycy5wcm9kdWN0aW9uKSB7XG4gICAgICBpZiAob3B0aW9ucy5mcmFtZXdvcmsgPT0gJ2FuZ3VsYXInICYmIG9wdGlvbnMudHJlZXNoYWtlKSB7XG4gICAgICAgIGNvbnN0IHBhY2thZ2VQYXRoID0gcGF0aC5yZXNvbHZlKHByb2Nlc3MuY3dkKCksICdub2RlX21vZHVsZXMvJyArIGV4dEFuZ3VsYXJQYWNrYWdlKVxuICAgICAgICB2YXIgZmlsZXMgPSBmc3gucmVhZGRpclN5bmMoYCR7cGFja2FnZVBhdGh9L2xpYmApXG4gICAgICAgIGZpbGVzLmZvckVhY2goKGZpbGVOYW1lKSA9PiB7XG4gICAgICAgICAgaWYgKGZpbGVOYW1lICYmIGZpbGVOYW1lLnN1YnN0cigwLCA0KSA9PSAnZXh0LScpIHtcbiAgICAgICAgICAgIHZhciBlbmQgPSBmaWxlTmFtZS5zdWJzdHIoNCkuaW5kZXhPZignLmNvbXBvbmVudCcpXG4gICAgICAgICAgICBpZiAoZW5kID49IDApIHtcbiAgICAgICAgICAgICAgZXh0Q29tcG9uZW50cy5wdXNoKGZpbGVOYW1lLnN1YnN0cmluZyg0LCBlbmQgKyA0KSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pXG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBjb25zdCBhcHBNb2R1bGVQYXRoID0gcGF0aC5yZXNvbHZlKHByb2Nlc3MuY3dkKCksICdzcmMvYXBwL2FwcC5tb2R1bGUudHMnKVxuICAgICAgICAgIHZhciBqcyA9IGZzeC5yZWFkRmlsZVN5bmMoYXBwTW9kdWxlUGF0aCkudG9TdHJpbmcoKVxuICAgICAgICAgIHZhciBuZXdKcyA9IGpzLnJlcGxhY2UoXG4gICAgICAgICAgICBgaW1wb3J0IHsgRXh0QW5ndWxhck1vZHVsZSB9IGZyb20gJ0BzZW5jaGEvZXh0LWFuZ3VsYXInYCxcbiAgICAgICAgICAgIGBpbXBvcnQgeyBFeHRBbmd1bGFyTW9kdWxlIH0gZnJvbSAnLi9leHQtYW5ndWxhci1wcm9kL2V4dC1hbmd1bGFyLm1vZHVsZSdgXG4gICAgICAgICAgKTtcbiAgICAgICAgICBmc3gud3JpdGVGaWxlU3luYyhhcHBNb2R1bGVQYXRoLCBuZXdKcywgJ3V0Zi04JywgKCk9PntyZXR1cm59KVxuXG4gICAgICAgICAgY29uc3QgbWFpblBhdGggPSBwYXRoLnJlc29sdmUocHJvY2Vzcy5jd2QoKSwgJ3NyYy9tYWluLnRzJylcbiAgICAgICAgICB2YXIganNNYWluID0gZnN4LnJlYWRGaWxlU3luYyhtYWluUGF0aCkudG9TdHJpbmcoKVxuICAgICAgICAgIHZhciBuZXdKc01haW4gPSBqc01haW4ucmVwbGFjZShcbiAgICAgICAgICAgIGBib290c3RyYXBNb2R1bGUoQXBwTW9kdWxlKTtgLFxuICAgICAgICAgICAgYGVuYWJsZVByb2RNb2RlKCk7Ym9vdHN0cmFwTW9kdWxlKCBBcHBNb2R1bGUgKTtgXG4gICAgICAgICAgKTtcbiAgICAgICAgICBmc3gud3JpdGVGaWxlU3luYyhtYWluUGF0aCwgbmV3SnNNYWluLCAndXRmLTgnLCAoKT0+e3JldHVybn0pXG5cbiAgICAgICAgICBpZiAoIWZzLmV4aXN0c1N5bmMocGF0aFRvRXh0QW5ndWxhck1vZGVybikpIHtcbiAgICAgICAgICAgIG1rZGlycC5zeW5jKHBhdGhUb0V4dEFuZ3VsYXJNb2Rlcm4pXG4gICAgICAgICAgICBjb25zdCB0ID0gcmVxdWlyZSgnLi9hcnRpZmFjdHMnKS5leHRBbmd1bGFyTW9kdWxlKCcnLCAnJywgJycpXG4gICAgICAgICAgICBmc3gud3JpdGVGaWxlU3luYyhgJHtwYXRoVG9FeHRBbmd1bGFyTW9kZXJufS8ke2V4dEFuZ3VsYXJNb2R1bGV9LnRzYCwgdCwgJ3V0Zi04JywgKCkgPT4ge3JldHVybn0pXG4gICAgICAgICAgfVxuXG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhlKVxuICAgICAgICAgIGNvbXBpbGF0aW9uLmVycm9ycy5wdXNoKCdidWlsZE1vZHVsZSBob29rIGluIF9jb21waWxhdGlvbjogJyArIGUpXG4gICAgICAgICAgcmV0dXJuIFtdXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgY29tcGlsYXRpb24uaG9va3Muc3VjY2VlZE1vZHVsZS50YXAoYGV4dC1zdWNjZWVkLW1vZHVsZWAsIG1vZHVsZSA9PiB7XG4gICAgICAgIC8vcmVxdWlyZSgnLi9wbHVnaW5VdGlsJykubG9ndihvcHRpb25zLCAnSE9PSyBzdWNjZWVkTW9kdWxlJylcbiAgICAgICAgaWYgKG1vZHVsZS5yZXNvdXJjZSAmJiAhbW9kdWxlLnJlc291cmNlLm1hdGNoKC9ub2RlX21vZHVsZXMvKSAmJiAhbW9kdWxlLnJlc291cmNlLm1hdGNoKC9cXC5odG1sJC8pKSB7XG4gICAgICAgICAgdmFycy5kZXBzID0gWy4uLih2YXJzLmRlcHMgfHwgW10pLCAuLi5yZXF1aXJlKGAuLyR7dmFycy5mcmFtZXdvcmt9VXRpbGApLmV4dHJhY3RGcm9tU291cmNlKG1vZHVsZSwgb3B0aW9ucywgY29tcGlsYXRpb24sIGV4dENvbXBvbmVudHMpXVxuICAgICAgICB9XG4gICAgICAgIC8vIGlmIChleHRDb21wb25lbnRzLmxlbmd0aCAmJiBtb2R1bGUucmVzb3VyY2UgJiYgKG1vZHVsZS5yZXNvdXJjZS5tYXRjaCgvXFwuKGp8dClzeD8kLykgfHxcbiAgICAgICAgLy8gb3B0aW9ucy5mcmFtZXdvcmsgPT0gJ2FuZ3VsYXInICYmIG1vZHVsZS5yZXNvdXJjZS5tYXRjaCgvXFwuaHRtbCQvKSkgJiZcbiAgICAgICAgLy8gIW1vZHVsZS5yZXNvdXJjZS5tYXRjaCgvbm9kZV9tb2R1bGVzLykgJiYgIW1vZHVsZS5yZXNvdXJjZS5tYXRjaChgL2V4dC17JG9wdGlvbnMuZnJhbWV3b3JrfS9idWlsZC9gKSkge1xuICAgICAgICAvLyAgIHZhcnMuZGVwcyA9IFsuLi4odmFycy5kZXBzIHx8IFtdKSwgLi4ucmVxdWlyZShgLi8ke3ZhcnMuZnJhbWV3b3JrfVV0aWxgKS5leHRyYWN0RnJvbVNvdXJjZShtb2R1bGUsIG9wdGlvbnMsIGNvbXBpbGF0aW9uLCBleHRDb21wb25lbnRzKV1cbiAgICAgICAgLy8gfVxuICAgICAgfSlcblxuICAgICAgaWYgKG9wdGlvbnMuZnJhbWV3b3JrID09ICdhbmd1bGFyJyAmJiBvcHRpb25zLnRyZWVzaGFrZSkge1xuXG5cblxuICAgICAgICBjb21waWxhdGlvbi5ob29rcy5maW5pc2hNb2R1bGVzLnRhcChgZXh0LWZpbmlzaC1tb2R1bGVzYCwgbW9kdWxlcyA9PiB7XG4gICAgICAgICAgcmVxdWlyZSgnLi9wbHVnaW5VdGlsJykubG9ndihvcHRpb25zLCAnSE9PSyBmaW5pc2hNb2R1bGVzJylcbiAgICAgICAgICBjb25zdCBzdHJpbmcgPSAnRXh0LmNyZWF0ZSh7XFxcInh0eXBlXFxcIjpcXFwiJ1xuICAgICAgICAgIHZhcnMuZGVwcy5mb3JFYWNoKGNvZGUgPT4ge1xuICAgICAgICAgICAgdmFyIGluZGV4ID0gY29kZS5pbmRleE9mKHN0cmluZylcbiAgICAgICAgICAgIGlmIChpbmRleCA+PSAwKSB7XG4gICAgICAgICAgICAgIGNvZGUgPSBjb2RlLnN1YnN0cmluZyhpbmRleCArIHN0cmluZy5sZW5ndGgpXG4gICAgICAgICAgICAgIHZhciBlbmQgPSBjb2RlLmluZGV4T2YoJ1xcXCInKVxuICAgICAgICAgICAgICB2YXJzLnVzZWRFeHRDb21wb25lbnRzLnB1c2goY29kZS5zdWJzdHIoMCwgZW5kKSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICAgIHZhcnMudXNlZEV4dENvbXBvbmVudHMgPSBbLi4ubmV3IFNldCh2YXJzLnVzZWRFeHRDb21wb25lbnRzKV1cbiAgICAgICAgICBjb25zdCByZWFkRnJvbSA9IHBhdGgucmVzb2x2ZShwcm9jZXNzLmN3ZCgpLCAnbm9kZV9tb2R1bGVzLycgKyBleHRBbmd1bGFyUGFja2FnZSArICcvc3JjL2xpYicpXG4gICAgICAgICAgY29uc3Qgd3JpdGVUb1BhdGggPSBwYXRoVG9FeHRBbmd1bGFyTW9kZXJuXG5cbiAgICAgICAgICBjb25zdCBiYXNlQ29udGVudCA9IGZzeC5yZWFkRmlsZVN5bmMoYCR7cmVhZEZyb219L2Jhc2UudHNgKS50b1N0cmluZygpXG4gICAgICAgICAgZnN4LndyaXRlRmlsZVN5bmMoYCR7d3JpdGVUb1BhdGh9L2Jhc2UudHNgLCBiYXNlQ29udGVudCwgJ3V0Zi04JywgKCk9PntyZXR1cm59KVxuICAgICAgICAgIFxuICAgICAgICAgIHZhciB3cml0ZVRvUGF0aFdyaXR0ZW4gPSBmYWxzZVxuICAgICAgICAgIHZhciBtb2R1bGVWYXJzID0ge1xuICAgICAgICAgICAgaW1wb3J0czogJycsXG4gICAgICAgICAgICBleHBvcnRzOiAnJyxcbiAgICAgICAgICAgIGRlY2xhcmF0aW9uczogJydcbiAgICAgICAgICB9XG4gICAgICAgICAgdmFycy51c2VkRXh0Q29tcG9uZW50cy5mb3JFYWNoKHh0eXBlID0+IHtcbiAgICAgICAgICAgIHZhciBjYXBjbGFzc25hbWUgPSB4dHlwZS5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHh0eXBlLnJlcGxhY2UoLy0vZywgXCJfXCIpLnNsaWNlKDEpXG4gICAgICAgICAgICBtb2R1bGVWYXJzLmltcG9ydHMgPSBtb2R1bGVWYXJzLmltcG9ydHMgKyBgaW1wb3J0IHsgRXh0JHtjYXBjbGFzc25hbWV9Q29tcG9uZW50IH0gZnJvbSAnLi9leHQtJHt4dHlwZX0uY29tcG9uZW50JztcXG5gXG4gICAgICAgICAgICBtb2R1bGVWYXJzLmV4cG9ydHMgPSBtb2R1bGVWYXJzLmV4cG9ydHMgKyBgICAgIEV4dCR7Y2FwY2xhc3NuYW1lfUNvbXBvbmVudCxcXG5gXG4gICAgICAgICAgICBtb2R1bGVWYXJzLmRlY2xhcmF0aW9ucyA9IG1vZHVsZVZhcnMuZGVjbGFyYXRpb25zICsgYCAgICBFeHQke2NhcGNsYXNzbmFtZX1Db21wb25lbnQsXFxuYFxuICAgICAgICAgICAgdmFyIGNsYXNzRmlsZSA9IGAvZXh0LSR7eHR5cGV9LmNvbXBvbmVudC50c2BcbiAgICAgICAgICAgIGNvbnN0IGNvbnRlbnRzID0gZnN4LnJlYWRGaWxlU3luYyhgJHtyZWFkRnJvbX0ke2NsYXNzRmlsZX1gKS50b1N0cmluZygpXG4gICAgICAgICAgICBmc3gud3JpdGVGaWxlU3luYyhgJHt3cml0ZVRvUGF0aH0ke2NsYXNzRmlsZX1gLCBjb250ZW50cywgJ3V0Zi04JywgKCk9PntyZXR1cm59KVxuICAgICAgICAgICAgd3JpdGVUb1BhdGhXcml0dGVuID0gdHJ1ZVxuICAgICAgICAgIH0pXG4gICAgICAgICAgaWYgKHdyaXRlVG9QYXRoV3JpdHRlbikge1xuICAgICAgICAgICAgdmFyIHQgPSByZXF1aXJlKCcuL2FydGlmYWN0cycpLmV4dEFuZ3VsYXJNb2R1bGUoXG4gICAgICAgICAgICAgIG1vZHVsZVZhcnMuaW1wb3J0cywgbW9kdWxlVmFycy5leHBvcnRzLCBtb2R1bGVWYXJzLmRlY2xhcmF0aW9uc1xuICAgICAgICAgICAgKVxuICAgICAgICAgICAgZnN4LndyaXRlRmlsZVN5bmMoYCR7d3JpdGVUb1BhdGh9LyR7ZXh0QW5ndWxhck1vZHVsZX0udHNgLCB0LCAndXRmLTgnLCAoKT0+e3JldHVybn0pXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfVxuXG5cbiAgICB9XG5cbiAgICBpZiAob3B0aW9ucy5mcmFtZXdvcmsgIT0gJ2V4dGpzJyAmJiAhb3B0aW9ucy50cmVlc2hha2UpIHtcblxuICAgICAgY29tcGlsYXRpb24uaG9va3MuaHRtbFdlYnBhY2tQbHVnaW5CZWZvcmVIdG1sR2VuZXJhdGlvbi50YXAoYGV4dC1odG1sLWdlbmVyYXRpb25gLChkYXRhKSA9PiB7XG4gICAgICAgIGxvZ3Yob3B0aW9ucywnSE9PSyBleHQtaHRtbC1nZW5lcmF0aW9uJylcbiAgICAgICAgY29uc3QgcGF0aCA9IHJlcXVpcmUoJ3BhdGgnKVxuICAgICAgICB2YXIgb3V0cHV0UGF0aCA9ICcnXG4gICAgICAgIGlmIChjb21waWxlci5vcHRpb25zLmRldlNlcnZlcikge1xuICAgICAgICAgIGlmIChjb21waWxlci5vdXRwdXRQYXRoID09PSAnLycpIHtcbiAgICAgICAgICAgIG91dHB1dFBhdGggPSBwYXRoLmpvaW4oY29tcGlsZXIub3B0aW9ucy5kZXZTZXJ2ZXIuY29udGVudEJhc2UsIG91dHB1dFBhdGgpXG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaWYgKGNvbXBpbGVyLm9wdGlvbnMuZGV2U2VydmVyLmNvbnRlbnRCYXNlID09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICBvdXRwdXRQYXRoID0gJ2J1aWxkJ1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgIG91dHB1dFBhdGggPSAnJ1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBvdXRwdXRQYXRoID0gJ2J1aWxkJ1xuICAgICAgICB9XG4gICAgICAgIG91dHB1dFBhdGggPSBvdXRwdXRQYXRoLnJlcGxhY2UocHJvY2Vzcy5jd2QoKSwgJycpLnRyaW0oKVxuICAgICAgICB2YXIganNQYXRoID0gcGF0aC5qb2luKG91dHB1dFBhdGgsIHZhcnMuZXh0UGF0aCwgJ2V4dC5qcycpXG4gICAgICAgIHZhciBjc3NQYXRoID0gcGF0aC5qb2luKG91dHB1dFBhdGgsIHZhcnMuZXh0UGF0aCwgJ2V4dC5jc3MnKVxuICAgICAgICBkYXRhLmFzc2V0cy5qcy51bnNoaWZ0KGpzUGF0aClcbiAgICAgICAgZGF0YS5hc3NldHMuY3NzLnVuc2hpZnQoY3NzUGF0aClcbiAgICAgICAgbG9nKHZhcnMuYXBwICsgYEFkZGluZyAke2pzUGF0aH0gYW5kICR7Y3NzUGF0aH0gdG8gaW5kZXguaHRtbGApXG4gICAgICB9KVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGxvZ3Yob3B0aW9ucywnc2tpcHBlZCBIT09LIGV4dC1odG1sLWdlbmVyYXRpb24nKVxuICAgIH1cbiAgfVxuICBjYXRjaChlKSB7XG4gICAgcmVxdWlyZSgnLi9wbHVnaW5VdGlsJykubG9ndihvcHRpb25zLGUpXG4gICAgY29tcGlsYXRpb24uZXJyb3JzLnB1c2goJ19jb21waWxhdGlvbjogJyArIGUpXG4gIH1cbn1cblxuLy8qKioqKioqKioqXG5leHBvcnQgZnVuY3Rpb24gX2FmdGVyQ29tcGlsZShjb21waWxlciwgY29tcGlsYXRpb24sIHZhcnMsIG9wdGlvbnMpIHtcbiAgcmVxdWlyZSgnLi9wbHVnaW5VdGlsJykubG9ndihvcHRpb25zLCAnRlVOQ1RJT04gX2FmdGVyQ29tcGlsZScpXG59XG5cbi8vKioqKioqKioqKlxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGVtaXQoY29tcGlsZXIsIGNvbXBpbGF0aW9uLCB2YXJzLCBvcHRpb25zLCBjYWxsYmFjaykge1xuICB0cnkge1xuICAgIGNvbnN0IGxvZyA9IHJlcXVpcmUoJy4vcGx1Z2luVXRpbCcpLmxvZ1xuICAgIGNvbnN0IGxvZ3YgPSByZXF1aXJlKCcuL3BsdWdpblV0aWwnKS5sb2d2XG4gICAgbG9ndihvcHRpb25zLCdGVU5DVElPTiBlbWl0JylcbiAgICB2YXIgYXBwID0gdmFycy5hcHBcbiAgICB2YXIgZnJhbWV3b3JrID0gdmFycy5mcmFtZXdvcmtcbiAgICBjb25zdCBwYXRoID0gcmVxdWlyZSgncGF0aCcpXG4gICAgY29uc3QgX2J1aWxkRXh0QnVuZGxlID0gcmVxdWlyZSgnLi9wbHVnaW5VdGlsJykuX2J1aWxkRXh0QnVuZGxlXG4gICAgbGV0IG91dHB1dFBhdGggPSBwYXRoLmpvaW4oY29tcGlsZXIub3V0cHV0UGF0aCx2YXJzLmV4dFBhdGgpXG4gICAgaWYgKGNvbXBpbGVyLm91dHB1dFBhdGggPT09ICcvJyAmJiBjb21waWxlci5vcHRpb25zLmRldlNlcnZlcikge1xuICAgICAgb3V0cHV0UGF0aCA9IHBhdGguam9pbihjb21waWxlci5vcHRpb25zLmRldlNlcnZlci5jb250ZW50QmFzZSwgb3V0cHV0UGF0aClcbiAgICB9XG4gICAgbG9ndihvcHRpb25zLCdvdXRwdXRQYXRoOiAnICsgb3V0cHV0UGF0aClcbiAgICBsb2d2KG9wdGlvbnMsJ2ZyYW1ld29yazogJyArIGZyYW1ld29yaylcbiAgICBpZiAob3B0aW9ucy5lbWl0ID09IHRydWUpIHtcbiAgICAgIGlmIChmcmFtZXdvcmsgIT0gJ2V4dGpzJykge1xuICAgICAgICBfcHJlcGFyZUZvckJ1aWxkKGFwcCwgdmFycywgb3B0aW9ucywgb3V0cHV0UGF0aCwgY29tcGlsYXRpb24pXG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgaWYgKG9wdGlvbnMuZnJhbWV3b3JrID09ICdhbmd1bGFyJyAmJiAhb3B0aW9ucy50cmVlc2hha2UpIHtcbiAgICAgICAgICByZXF1aXJlKGAuLyR7ZnJhbWV3b3JrfVV0aWxgKS5fcHJlcGFyZUZvckJ1aWxkKGFwcCwgdmFycywgb3B0aW9ucywgb3V0cHV0UGF0aCwgY29tcGlsYXRpb24pXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgcmVxdWlyZShgLi8ke2ZyYW1ld29ya31VdGlsYCkuX3ByZXBhcmVGb3JCdWlsZChhcHAsIHZhcnMsIG9wdGlvbnMsIG91dHB1dFBhdGgsIGNvbXBpbGF0aW9uKVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHZhciBjb21tYW5kID0gJydcbiAgICAgIGlmIChvcHRpb25zLndhdGNoID09ICd5ZXMnICYmIHZhcnMucHJvZHVjdGlvbiA9PSBmYWxzZSkge1xuICAgICAgICBjb21tYW5kID0gJ3dhdGNoJ1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGNvbW1hbmQgPSAnYnVpbGQnXG4gICAgICB9XG5cbiAgICAgIGlmICh2YXJzLnJlYnVpbGQgPT0gdHJ1ZSkge1xuICAgICAgICB2YXIgcGFybXMgPSBbXVxuICAgICAgICBpZiAob3B0aW9ucy5wcm9maWxlID09IHVuZGVmaW5lZCB8fCBvcHRpb25zLnByb2ZpbGUgPT0gJycgfHwgb3B0aW9ucy5wcm9maWxlID09IG51bGwpIHtcbiAgICAgICAgICBpZiAoY29tbWFuZCA9PSAnYnVpbGQnKSB7XG4gICAgICAgICAgICBwYXJtcyA9IFsnYXBwJywgY29tbWFuZCwgb3B0aW9ucy5lbnZpcm9ubWVudF1cbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBwYXJtcyA9IFsnYXBwJywgY29tbWFuZCwgJy0td2ViLXNlcnZlcicsICdmYWxzZScsIG9wdGlvbnMuZW52aXJvbm1lbnRdXG4gICAgICAgICAgfVxuXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgaWYgKGNvbW1hbmQgPT0gJ2J1aWxkJykge1xuICAgICAgICAgICAgcGFybXMgPSBbJ2FwcCcsIGNvbW1hbmQsIG9wdGlvbnMucHJvZmlsZSwgb3B0aW9ucy5lbnZpcm9ubWVudF1cbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBwYXJtcyA9IFsnYXBwJywgY29tbWFuZCwgJy0td2ViLXNlcnZlcicsICdmYWxzZScsIG9wdGlvbnMucHJvZmlsZSwgb3B0aW9ucy5lbnZpcm9ubWVudF1cbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodmFycy53YXRjaFN0YXJ0ZWQgPT0gZmFsc2UpIHtcbiAgICAgICAgICBhd2FpdCBfYnVpbGRFeHRCdW5kbGUoYXBwLCBjb21waWxhdGlvbiwgb3V0cHV0UGF0aCwgcGFybXMsIG9wdGlvbnMpXG4gICAgICAgICAgdmFycy53YXRjaFN0YXJ0ZWQgPSB0cnVlXG4gICAgICAgIH1cbiAgICAgICAgY2FsbGJhY2soKVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGNhbGxiYWNrKClcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBsb2coYCR7dmFycy5hcHB9RlVOQ1RJT04gZW1pdCBub3QgcnVuYClcbiAgICAgIGNhbGxiYWNrKClcbiAgICB9XG4gIH1cbiAgY2F0Y2goZSkge1xuICAgIHJlcXVpcmUoJy4vcGx1Z2luVXRpbCcpLmxvZ3Yob3B0aW9ucyxlKVxuICAgIGNvbXBpbGF0aW9uLmVycm9ycy5wdXNoKCdlbWl0OiAnICsgZSlcbiAgICBjYWxsYmFjaygpXG4gIH1cbn1cblxuLy8qKioqKioqKioqXG5leHBvcnQgZnVuY3Rpb24gX3ByZXBhcmVGb3JCdWlsZChhcHAsIHZhcnMsIG9wdGlvbnMsIG91dHB1dCwgY29tcGlsYXRpb24pIHtcbiAgdHJ5IHtcbiAgICBsb2d2KG9wdGlvbnMsJ0ZVTkNUSU9OIF9wcmVwYXJlRm9yQnVpbGQnKVxuICAgIGNvbnN0IHJpbXJhZiA9IHJlcXVpcmUoJ3JpbXJhZicpXG4gICAgY29uc3QgbWtkaXJwID0gcmVxdWlyZSgnbWtkaXJwJylcbiAgICBjb25zdCBmc3ggPSByZXF1aXJlKCdmcy1leHRyYScpXG4gICAgY29uc3QgZnMgPSByZXF1aXJlKCdmcycpXG4gICAgY29uc3QgcGF0aCA9IHJlcXVpcmUoJ3BhdGgnKVxuXG4gICAgdmFyIHBhY2thZ2VzID0gb3B0aW9ucy5wYWNrYWdlc1xuICAgIHZhciB0b29sa2l0ID0gb3B0aW9ucy50b29sa2l0XG4gICAgdmFyIHRoZW1lID0gb3B0aW9ucy50aGVtZVxuXG4gICAgdGhlbWUgPSB0aGVtZSB8fCAodG9vbGtpdCA9PT0gJ2NsYXNzaWMnID8gJ3RoZW1lLXRyaXRvbicgOiAndGhlbWUtbWF0ZXJpYWwnKVxuICAgIGxvZ3Yob3B0aW9ucywnZmlyc3RUaW1lOiAnICsgdmFycy5maXJzdFRpbWUpXG4gICAgaWYgKHZhcnMuZmlyc3RUaW1lKSB7XG4gICAgICByaW1yYWYuc3luYyhvdXRwdXQpXG4gICAgICBta2RpcnAuc3luYyhvdXRwdXQpXG4gICAgICBjb25zdCBidWlsZFhNTCA9IHJlcXVpcmUoJy4vYXJ0aWZhY3RzJykuYnVpbGRYTUxcbiAgICAgIGNvbnN0IGNyZWF0ZUFwcEpzb24gPSByZXF1aXJlKCcuL2FydGlmYWN0cycpLmNyZWF0ZUFwcEpzb25cbiAgICAgIGNvbnN0IGNyZWF0ZVdvcmtzcGFjZUpzb24gPSByZXF1aXJlKCcuL2FydGlmYWN0cycpLmNyZWF0ZVdvcmtzcGFjZUpzb25cbiAgICAgIGNvbnN0IGNyZWF0ZUpTRE9NRW52aXJvbm1lbnQgPSByZXF1aXJlKCcuL2FydGlmYWN0cycpLmNyZWF0ZUpTRE9NRW52aXJvbm1lbnRcblxuICAgICAgZnMud3JpdGVGaWxlU3luYyhwYXRoLmpvaW4ob3V0cHV0LCAnYnVpbGQueG1sJyksIGJ1aWxkWE1MKHZhcnMucHJvZHVjdGlvbiwgb3B0aW9ucywgb3V0cHV0KSwgJ3V0ZjgnKVxuICAgICAgZnMud3JpdGVGaWxlU3luYyhwYXRoLmpvaW4ob3V0cHV0LCAnYXBwLmpzb24nKSwgY3JlYXRlQXBwSnNvbih0aGVtZSwgcGFja2FnZXMsIHRvb2xraXQsIG9wdGlvbnMsIG91dHB1dCksICd1dGY4JylcbiAgICAgIGZzLndyaXRlRmlsZVN5bmMocGF0aC5qb2luKG91dHB1dCwgJ2pzZG9tLWVudmlyb25tZW50LmpzJyksIGNyZWF0ZUpTRE9NRW52aXJvbm1lbnQob3B0aW9ucywgb3V0cHV0KSwgJ3V0ZjgnKVxuICAgICAgZnMud3JpdGVGaWxlU3luYyhwYXRoLmpvaW4ob3V0cHV0LCAnd29ya3NwYWNlLmpzb24nKSwgY3JlYXRlV29ya3NwYWNlSnNvbihvcHRpb25zLCBvdXRwdXQpLCAndXRmOCcpXG5cbiAgICAgIGlmICh2YXJzLmZyYW1ld29yayA9PSAnYW5ndWxhcicpIHtcblxuICAgICAgICAvL2JlY2F1c2Ugb2YgYSBwcm9ibGVtIGluIGNvbG9ycGlja2VyXG4gICAgICAgIGlmIChmcy5leGlzdHNTeW5jKHBhdGguam9pbihwcm9jZXNzLmN3ZCgpLCdleHQtYW5ndWxhci91eC8nKSkpIHtcbiAgICAgICAgICB2YXIgZnJvbVBhdGggPSBwYXRoLmpvaW4ocHJvY2Vzcy5jd2QoKSwgJ2V4dC1hbmd1bGFyLycpXG4gICAgICAgICAgdmFyIHRvUGF0aCA9IHBhdGguam9pbihvdXRwdXQpXG4gICAgICAgICAgZnN4LmNvcHlTeW5jKGZyb21QYXRoLCB0b1BhdGgpXG4gICAgICAgICAgbG9nKGFwcCArICdDb3B5aW5nICh1eCkgJyArIGZyb21QYXRoLnJlcGxhY2UocHJvY2Vzcy5jd2QoKSwgJycpICsgJyB0bzogJyArIHRvUGF0aC5yZXBsYWNlKHByb2Nlc3MuY3dkKCksICcnKSlcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChmcy5leGlzdHNTeW5jKHBhdGguam9pbihwcm9jZXNzLmN3ZCgpLCdleHQtYW5ndWxhci9wYWNrYWdlcy8nKSkpIHtcbiAgICAgICAgICB2YXIgZnJvbVBhdGggPSBwYXRoLmpvaW4ocHJvY2Vzcy5jd2QoKSwgJ2V4dC1hbmd1bGFyLycpXG4gICAgICAgICAgdmFyIHRvUGF0aCA9IHBhdGguam9pbihvdXRwdXQpXG4gICAgICAgICAgZnN4LmNvcHlTeW5jKGZyb21QYXRoLCB0b1BhdGgpXG4gICAgICAgICAgbG9nKGFwcCArICdDb3B5aW5nICcgKyBmcm9tUGF0aC5yZXBsYWNlKHByb2Nlc3MuY3dkKCksICcnKSArICcgdG86ICcgKyB0b1BhdGgucmVwbGFjZShwcm9jZXNzLmN3ZCgpLCAnJykpXG4gICAgICAgIH1cbiAgICAgICAgaWYgKGZzLmV4aXN0c1N5bmMocGF0aC5qb2luKHByb2Nlc3MuY3dkKCksJ2V4dC1hbmd1bGFyL292ZXJyaWRlcy8nKSkpIHtcbiAgICAgICAgICB2YXIgZnJvbVBhdGggPSBwYXRoLmpvaW4ocHJvY2Vzcy5jd2QoKSwgJ2V4dC1hbmd1bGFyLycpXG4gICAgICAgICAgdmFyIHRvUGF0aCA9IHBhdGguam9pbihvdXRwdXQpXG4gICAgICAgICAgZnN4LmNvcHlTeW5jKGZyb21QYXRoLCB0b1BhdGgpXG4gICAgICAgICAgbG9nKGFwcCArICdDb3B5aW5nICcgKyBmcm9tUGF0aC5yZXBsYWNlKHByb2Nlc3MuY3dkKCksICcnKSArICcgdG86ICcgKyB0b1BhdGgucmVwbGFjZShwcm9jZXNzLmN3ZCgpLCAnJykpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmICh2YXJzLmZyYW1ld29yayA9PSAncmVhY3QnKSAge1xuICAgICAgICBpZiAoZnMuZXhpc3RzU3luYyhwYXRoLmpvaW4ocHJvY2Vzcy5jd2QoKSwnZXh0LXJlYWN0L3BhY2thZ2VzLycpKSkge1xuICAgICAgICAgIHZhciBmcm9tUGF0aCA9IHBhdGguam9pbihwcm9jZXNzLmN3ZCgpLCAnZXh0LXJlYWN0L3BhY2thZ2VzLycpXG4gICAgICAgICAgdmFyIHRvUGF0aCA9IHBhdGguam9pbihvdXRwdXQsICdwYWNrYWdlcycpXG4gICAgICAgICAgZnN4LmNvcHlTeW5jKGZyb21QYXRoLCB0b1BhdGgpXG4gICAgICAgICAgbG9nKGFwcCArICdDb3B5aW5nICcgKyBmcm9tUGF0aC5yZXBsYWNlKHByb2Nlc3MuY3dkKCksICcnKSArICcgdG86ICcgKyB0b1BhdGgucmVwbGFjZShwcm9jZXNzLmN3ZCgpLCAnJykpXG4gICAgICAgIH1cbiAgICAgICAgaWYgKGZzLmV4aXN0c1N5bmMocGF0aC5qb2luKHByb2Nlc3MuY3dkKCksJ2V4dC1yZWFjdC9vdmVycmlkZXMvJykpKSB7XG4gICAgICAgICAgdmFyIGZyb21QYXRoID0gcGF0aC5qb2luKHByb2Nlc3MuY3dkKCksICdleHQtcmVhY3Qvb3ZlcnJpZGVzLycpXG4gICAgICAgICAgdmFyIHRvUGF0aCA9IHBhdGguam9pbihvdXRwdXQsICdvdmVycmlkZXMnKVxuICAgICAgICAgIGZzeC5jb3B5U3luYyhmcm9tUGF0aCwgdG9QYXRoKVxuICAgICAgICAgIGxvZyhhcHAgKyAnQ29weWluZyAnICsgZnJvbVBhdGgucmVwbGFjZShwcm9jZXNzLmN3ZCgpLCAnJykgKyAnIHRvOiAnICsgdG9QYXRoLnJlcGxhY2UocHJvY2Vzcy5jd2QoKSwgJycpKVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChmcy5leGlzdHNTeW5jKHBhdGguam9pbihwcm9jZXNzLmN3ZCgpLCdyZXNvdXJjZXMvJykpKSB7XG4gICAgICAgIHZhciBmcm9tUmVzb3VyY2VzID0gcGF0aC5qb2luKHByb2Nlc3MuY3dkKCksICdyZXNvdXJjZXMvJylcbiAgICAgICAgdmFyIHRvUmVzb3VyY2VzID0gcGF0aC5qb2luKG91dHB1dCwgJy4uL3Jlc291cmNlcycpXG4gICAgICAgIGZzeC5jb3B5U3luYyhmcm9tUmVzb3VyY2VzLCB0b1Jlc291cmNlcylcbiAgICAgICAgbG9nKGFwcCArICdDb3B5aW5nICcgKyBmcm9tUmVzb3VyY2VzLnJlcGxhY2UocHJvY2Vzcy5jd2QoKSwgJycpICsgJyB0bzogJyArIHRvUmVzb3VyY2VzLnJlcGxhY2UocHJvY2Vzcy5jd2QoKSwgJycpKVxuICAgICAgfVxuICAgICAgXG4gICAgICBpZiAoZnMuZXhpc3RzU3luYyhwYXRoLmpvaW4ocHJvY2Vzcy5jd2QoKSwncGFja2FnZXMvJykpKSB7XG4gICAgICAgIHZhciBmcm9tUGFja2FnZXMgPSBwYXRoLmpvaW4ocHJvY2Vzcy5jd2QoKSwgJ3BhY2thZ2VzLycpXG4gICAgICAgIHZhciB0b1BhY2thZ2VzID0gcGF0aC5qb2luKG91dHB1dCwgJ3BhY2thZ2VzJylcbiAgICAgICAgZnN4LmNvcHlTeW5jKGZyb21QYWNrYWdlcywgdG9QYWNrYWdlcylcbiAgICAgICAgbG9nKGFwcCArICdDb3B5aW5nICcgKyBmcm9tUGFja2FnZXMucmVwbGFjZShwcm9jZXNzLmN3ZCgpLCAnJykgKyAnIHRvOiAnICsgdG9QYWNrYWdlcy5yZXBsYWNlKHByb2Nlc3MuY3dkKCksICcnKSlcbiAgICAgIH1cblxuICAgICAgaWYgKGZzLmV4aXN0c1N5bmMocGF0aC5qb2luKHByb2Nlc3MuY3dkKCksJ292ZXJyaWRlcy8nKSkpIHtcbiAgICAgICAgdmFyIGZyb21QYXRoID0gcGF0aC5qb2luKHByb2Nlc3MuY3dkKCksICdvdmVycmlkZXMvJylcbiAgICAgICAgdmFyIHRvUGF0aCA9IHBhdGguam9pbihvdXRwdXQsICdvdmVycmlkZXMnKVxuICAgICAgICBmc3guY29weVN5bmMoZnJvbVBhdGgsIHRvUGF0aClcbiAgICAgICAgbG9nKGFwcCArICdDb3B5aW5nICcgKyBmcm9tUGF0aC5yZXBsYWNlKHByb2Nlc3MuY3dkKCksICcnKSArICcgdG86ICcgKyB0b1BhdGgucmVwbGFjZShwcm9jZXNzLmN3ZCgpLCAnJykpXG4gICAgICB9XG5cbiAgICB9XG4gICAgdmFycy5maXJzdFRpbWUgPSBmYWxzZVxuICAgIHZhciBqcyA9ICcnXG4gICAgaWYgKHZhcnMucHJvZHVjdGlvbikge1xuICAgICAgaWYgKCF2YXJzLmRlcHMuaW5jbHVkZXMoJ0V4dC5yZXF1aXJlKFwiRXh0LmxheW91dC4qXCIpO1xcbicpKSB7XG4gICAgICAgIHZhcnMuZGVwcy5wdXNoKCdFeHQucmVxdWlyZShcIkV4dC5sYXlvdXQuKlwiKTtcXG4nKVxuICAgICAgfVxuICAgICAganMgPSB2YXJzLmRlcHMuam9pbignO1xcbicpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGpzID0gJ0V4dC5yZXF1aXJlKFwiRXh0LipcIiknXG4gICAgfVxuICAgIGlmICh2YXJzLm1hbmlmZXN0ID09PSBudWxsIHx8IGpzICE9PSB2YXJzLm1hbmlmZXN0KSB7XG4gICAgICB2YXJzLm1hbmlmZXN0ID0ganNcbiAgICAgIGNvbnN0IG1hbmlmZXN0ID0gcGF0aC5qb2luKG91dHB1dCwgJ21hbmlmZXN0LmpzJylcbiAgICAgIGZzLndyaXRlRmlsZVN5bmMobWFuaWZlc3QsIGpzLCAndXRmOCcpXG4gICAgICB2YXJzLnJlYnVpbGQgPSB0cnVlXG4gICAgICB2YXIgYnVuZGxlRGlyID0gb3V0cHV0LnJlcGxhY2UocHJvY2Vzcy5jd2QoKSwgJycpXG4gICAgICBpZiAoYnVuZGxlRGlyLnRyaW0oKSA9PSAnJykge2J1bmRsZURpciA9ICcuLyd9XG4gICAgICBsb2coYXBwICsgJ0J1aWxkaW5nIEV4dCBidW5kbGUgYXQ6ICcgKyBidW5kbGVEaXIpXG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdmFycy5yZWJ1aWxkID0gZmFsc2VcbiAgICAgIGxvZyhhcHAgKyAnRXh0IHJlYnVpbGQgTk9UIG5lZWRlZCcpXG4gICAgfVxuICB9XG4gIGNhdGNoKGUpIHtcbiAgICByZXF1aXJlKCcuL3BsdWdpblV0aWwnKS5sb2d2KG9wdGlvbnMsZSlcbiAgICBjb21waWxhdGlvbi5lcnJvcnMucHVzaCgnX3ByZXBhcmVGb3JCdWlsZDogJyArIGUpXG4gIH1cbn1cblxuLy8qKioqKioqKioqXG5leHBvcnQgZnVuY3Rpb24gX2J1aWxkRXh0QnVuZGxlKGFwcCwgY29tcGlsYXRpb24sIG91dHB1dFBhdGgsIHBhcm1zLCBvcHRpb25zKSB7XG4gIHRyeSB7XG4gICAgY29uc3QgZnMgPSByZXF1aXJlKCdmcycpXG4gICAgY29uc3QgbG9ndiA9IHJlcXVpcmUoJy4vcGx1Z2luVXRpbCcpLmxvZ3ZcbiAgICBsb2d2KG9wdGlvbnMsJ0ZVTkNUSU9OIF9idWlsZEV4dEJ1bmRsZScpXG5cbiAgICBsZXQgc2VuY2hhOyB0cnkgeyBzZW5jaGEgPSByZXF1aXJlKCdAc2VuY2hhL2NtZCcpIH0gY2F0Y2ggKGUpIHsgc2VuY2hhID0gJ3NlbmNoYScgfVxuICAgIGlmIChmcy5leGlzdHNTeW5jKHNlbmNoYSkpIHtcbiAgICAgIGxvZ3Yob3B0aW9ucywnc2VuY2hhIGZvbGRlciBleGlzdHMnKVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGxvZ3Yob3B0aW9ucywnc2VuY2hhIGZvbGRlciBET0VTIE5PVCBleGlzdCcpXG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGNvbnN0IG9uQnVpbGREb25lID0gKCkgPT4ge1xuICAgICAgICBsb2d2KG9wdGlvbnMsJ29uQnVpbGREb25lJylcbiAgICAgICAgcmVzb2x2ZSgpXG4gICAgICB9XG5cbiAgICAgIHZhciBvcHRzID0geyBjd2Q6IG91dHB1dFBhdGgsIHNpbGVudDogdHJ1ZSwgc3RkaW86ICdwaXBlJywgZW5jb2Rpbmc6ICd1dGYtOCd9XG4gICAgICBleGVjdXRlQXN5bmMoYXBwLCBzZW5jaGEsIHBhcm1zLCBvcHRzLCBjb21waWxhdGlvbiwgb3B0aW9ucykudGhlbiAoXG4gICAgICAgIGZ1bmN0aW9uKCkgeyBvbkJ1aWxkRG9uZSgpIH0sIFxuICAgICAgICBmdW5jdGlvbihyZWFzb24pIHsgcmVqZWN0KHJlYXNvbikgfVxuICAgICAgKVxuICAgIH0pXG4gIH1cbiAgY2F0Y2goZSkge1xuICAgIGNvbnNvbGUubG9nKCdlJylcbiAgICByZXF1aXJlKCcuL3BsdWdpblV0aWwnKS5sb2d2KG9wdGlvbnMsZSlcbiAgICBjb21waWxhdGlvbi5lcnJvcnMucHVzaCgnX2J1aWxkRXh0QnVuZGxlOiAnICsgZSlcbiAgICBjYWxsYmFjaygpXG4gIH1cbn1cblxuLy8qKioqKioqKioqXG5leHBvcnQgZnVuY3Rpb24gX2RvbmUodmFycywgb3B0aW9ucykge1xuICB0cnkge1xuICAgIGNvbnN0IGxvZyA9IHJlcXVpcmUoJy4vcGx1Z2luVXRpbCcpLmxvZ1xuICAgIGNvbnN0IGxvZ3YgPSByZXF1aXJlKCcuL3BsdWdpblV0aWwnKS5sb2d2XG4gICAgbG9ndihvcHRpb25zLCdGVU5DVElPTiBfZG9uZScpXG5cbiAgICBpZiAodmFycy5wcm9kdWN0aW9uICYmICFvcHRpb25zLnRyZWVzaGFrZSAmJiBvcHRpb25zLmZyYW1ld29yayA9PSAnYW5ndWxhcicpIHtcbiAgICAgIHJlcXVpcmUoYC4vJHtmcmFtZXdvcmt9VXRpbGApLl9kb25lKHZhcnMsIG9wdGlvbnMpXG4gICAgfSBcblxuICAgIHRyeSB7XG4gICAgICBpZihvcHRpb25zLmJyb3dzZXIgPT0gdHJ1ZSAmJiBvcHRpb25zLndhdGNoID09ICd5ZXMnICYmIHZhcnMucHJvZHVjdGlvbiA9PSBmYWxzZSkge1xuICAgICAgICBpZiAodmFycy5icm93c2VyQ291bnQgPT0gMCkge1xuICAgICAgICAgIHZhciB1cmwgPSAnaHR0cDovL2xvY2FsaG9zdDonICsgb3B0aW9ucy5wb3J0XG4gICAgICAgICAgcmVxdWlyZSgnLi9wbHVnaW5VdGlsJykubG9nKHZhcnMuYXBwICsgYE9wZW5pbmcgYnJvd3NlciBhdCAke3VybH1gKVxuICAgICAgICAgIHZhcnMuYnJvd3NlckNvdW50KytcbiAgICAgICAgICBjb25zdCBvcG4gPSByZXF1aXJlKCdvcG4nKVxuICAgICAgICAgIG9wbih1cmwpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgY2F0Y2ggKGUpIHtcbiAgICAgIGNvbnNvbGUubG9nKGUpXG4gICAgICAvL2NvbXBpbGF0aW9uLmVycm9ycy5wdXNoKCdzaG93IGJyb3dzZXIgd2luZG93IC0gZXh0LWRvbmU6ICcgKyBlKVxuICAgIH1cbiAgfVxuICBjYXRjaChlKSB7XG4gICAgcmVxdWlyZSgnLi9wbHVnaW5VdGlsJykubG9ndihvcHRpb25zLGUpXG4gIH1cbn1cblxuLy8qKioqKioqKioqXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZXhlY3V0ZUFzeW5jIChhcHAsIGNvbW1hbmQsIHBhcm1zLCBvcHRzLCBjb21waWxhdGlvbiwgb3B0aW9ucykge1xuICB0cnkge1xuICAgIC8vY29uc3QgREVGQVVMVF9TVUJTVFJTID0gWydbSU5GXSBMb2FkaW5nJywgJ1tJTkZdIFByb2Nlc3NpbmcnLCAnW0xPR10gRmFzaGlvbiBidWlsZCBjb21wbGV0ZScsICdbRVJSXScsICdbV1JOXScsIFwiW0lORl0gU2VydmVyXCIsIFwiW0lORl0gV3JpdGluZ1wiLCBcIltJTkZdIExvYWRpbmcgQnVpbGRcIiwgXCJbSU5GXSBXYWl0aW5nXCIsIFwiW0xPR10gRmFzaGlvbiB3YWl0aW5nXCJdO1xuICAgIGNvbnN0IERFRkFVTFRfU1VCU1RSUyA9IFtcIltJTkZdIHhTZXJ2ZXJcIiwgJ1tJTkZdIExvYWRpbmcnLCAnW0lORl0gQXBwZW5kJywgJ1tJTkZdIFByb2Nlc3NpbmcnLCAnW0lORl0gUHJvY2Vzc2luZyBCdWlsZCcsICdbTE9HXSBGYXNoaW9uIGJ1aWxkIGNvbXBsZXRlJywgJ1tFUlJdJywgJ1tXUk5dJywgXCJbSU5GXSBXcml0aW5nXCIsIFwiW0lORl0gTG9hZGluZyBCdWlsZFwiLCBcIltJTkZdIFdhaXRpbmdcIiwgXCJbTE9HXSBGYXNoaW9uIHdhaXRpbmdcIl07XG4gICAgdmFyIHN1YnN0cmluZ3MgPSBERUZBVUxUX1NVQlNUUlMgXG4gICAgdmFyIGNoYWxrID0gcmVxdWlyZSgnY2hhbGsnKVxuICAgIGNvbnN0IGNyb3NzU3Bhd24gPSByZXF1aXJlKCdjcm9zcy1zcGF3bicpXG4gICAgY29uc3QgbG9nID0gcmVxdWlyZSgnLi9wbHVnaW5VdGlsJykubG9nXG4gICAgbG9ndihvcHRpb25zLCAnRlVOQ1RJT04gZXhlY3V0ZUFzeW5jJylcbiAgICBhd2FpdCBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBsb2d2KG9wdGlvbnMsYGNvbW1hbmQgLSAke2NvbW1hbmR9YClcbiAgICAgIGxvZ3Yob3B0aW9ucywgYHBhcm1zIC0gJHtwYXJtc31gKVxuICAgICAgbG9ndihvcHRpb25zLCBgb3B0cyAtICR7SlNPTi5zdHJpbmdpZnkob3B0cyl9YClcbiAgICAgIGxldCBjaGlsZCA9IGNyb3NzU3Bhd24oY29tbWFuZCwgcGFybXMsIG9wdHMpXG4gICAgICBjaGlsZC5vbignY2xvc2UnLCAoY29kZSwgc2lnbmFsKSA9PiB7XG4gICAgICAgIGxvZ3Yob3B0aW9ucywgYG9uIGNsb3NlOiBgICsgY29kZSkgXG4gICAgICAgIGlmKGNvZGUgPT09IDApIHsgcmVzb2x2ZSgwKSB9XG4gICAgICAgIGVsc2UgeyBjb21waWxhdGlvbi5lcnJvcnMucHVzaCggbmV3IEVycm9yKGNvZGUpICk7IHJlc29sdmUoMCkgfVxuICAgICAgfSlcbiAgICAgIGNoaWxkLm9uKCdlcnJvcicsIChlcnJvcikgPT4geyBcbiAgICAgICAgbG9ndihvcHRpb25zLCBgb24gZXJyb3JgKSBcbiAgICAgICAgY29tcGlsYXRpb24uZXJyb3JzLnB1c2goZXJyb3IpXG4gICAgICAgIHJlc29sdmUoMClcbiAgICAgIH0pXG4gICAgICBjaGlsZC5zdGRvdXQub24oJ2RhdGEnLCAoZGF0YSkgPT4ge1xuICAgICAgICB2YXIgc3RyID0gZGF0YS50b1N0cmluZygpLnJlcGxhY2UoL1xccj9cXG58XFxyL2csIFwiIFwiKS50cmltKClcbiAgICAgICAgbG9ndihvcHRpb25zLCBgJHtzdHJ9YClcbiAgICAgICAgaWYgKGRhdGEgJiYgZGF0YS50b1N0cmluZygpLm1hdGNoKC93YWl0aW5nIGZvciBjaGFuZ2VzXFwuXFwuXFwuLykpIHtcbiAgICAgICAgICByZXNvbHZlKDApXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgaWYgKHN1YnN0cmluZ3Muc29tZShmdW5jdGlvbih2KSB7IHJldHVybiBkYXRhLmluZGV4T2YodikgPj0gMDsgfSkpIHsgXG4gICAgICAgICAgICBzdHIgPSBzdHIucmVwbGFjZShcIltJTkZdXCIsIFwiXCIpXG4gICAgICAgICAgICBzdHIgPSBzdHIucmVwbGFjZShcIltMT0ddXCIsIFwiXCIpXG4gICAgICAgICAgICBzdHIgPSBzdHIucmVwbGFjZShwcm9jZXNzLmN3ZCgpLCAnJykudHJpbSgpXG4gICAgICAgICAgICBpZiAoc3RyLmluY2x1ZGVzKFwiW0VSUl1cIikpIHtcbiAgICAgICAgICAgICAgY29tcGlsYXRpb24uZXJyb3JzLnB1c2goYXBwICsgc3RyLnJlcGxhY2UoL15cXFtFUlJcXF0gL2dpLCAnJykpO1xuICAgICAgICAgICAgICBzdHIgPSBzdHIucmVwbGFjZShcIltFUlJdXCIsIGAke2NoYWxrLnJlZChcIltFUlJdXCIpfWApXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsb2coYCR7YXBwfSR7c3RyfWApIFxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIGNoaWxkLnN0ZGVyci5vbignZGF0YScsIChkYXRhKSA9PiB7XG4gICAgICAgIGxvZ3Yob3B0aW9ucywgYGVycm9yIG9uIGNsb3NlOiBgICsgZGF0YSkgXG4gICAgICAgIHZhciBzdHIgPSBkYXRhLnRvU3RyaW5nKCkucmVwbGFjZSgvXFxyP1xcbnxcXHIvZywgXCIgXCIpLnRyaW0oKVxuICAgICAgICB2YXIgc3RySmF2YU9wdHMgPSBcIlBpY2tlZCB1cCBfSkFWQV9PUFRJT05TXCI7XG4gICAgICAgIHZhciBpbmNsdWRlcyA9IHN0ci5pbmNsdWRlcyhzdHJKYXZhT3B0cylcbiAgICAgICAgaWYgKCFpbmNsdWRlcykge1xuICAgICAgICAgIGNvbnNvbGUubG9nKGAke2FwcH0gJHtjaGFsay5yZWQoXCJbRVJSXVwiKX0gJHtzdHJ9YClcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9KVxuICB9XG4gIGNhdGNoKGUpIHtcbiAgICByZXF1aXJlKCcuL3BsdWdpblV0aWwnKS5sb2d2KG9wdGlvbnMsZSlcbiAgICBjb21waWxhdGlvbi5lcnJvcnMucHVzaCgnZXhlY3V0ZUFzeW5jOiAnICsgZSlcbiAgICBjYWxsYmFjaygpXG4gIH0gXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBsb2cocykge1xuICByZXF1aXJlKCdyZWFkbGluZScpLmN1cnNvclRvKHByb2Nlc3Muc3Rkb3V0LCAwKVxuICB0cnkge1xuICAgIHByb2Nlc3Muc3Rkb3V0LmNsZWFyTGluZSgpXG4gIH1cbiAgY2F0Y2goZSkge31cbiAgcHJvY2Vzcy5zdGRvdXQud3JpdGUocylcbiAgcHJvY2Vzcy5zdGRvdXQud3JpdGUoJ1xcbicpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBsb2d2KG9wdGlvbnMsIHMpIHtcbiAgaWYgKG9wdGlvbnMudmVyYm9zZSA9PSAneWVzJykge1xuICAgIHJlcXVpcmUoJ3JlYWRsaW5lJykuY3Vyc29yVG8ocHJvY2Vzcy5zdGRvdXQsIDApXG4gICAgdHJ5IHtcbiAgICAgIHByb2Nlc3Muc3Rkb3V0LmNsZWFyTGluZSgpXG4gICAgfVxuICAgIGNhdGNoKGUpIHt9XG4gICAgcHJvY2Vzcy5zdGRvdXQud3JpdGUoYC12ZXJib3NlOiAke3N9YClcbiAgICBwcm9jZXNzLnN0ZG91dC53cml0ZSgnXFxuJylcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gX2dldEFwcCgpIHtcbiAgdmFyIGNoYWxrID0gcmVxdWlyZSgnY2hhbGsnKVxuICB2YXIgcHJlZml4ID0gYGBcbiAgY29uc3QgcGxhdGZvcm0gPSByZXF1aXJlKCdvcycpLnBsYXRmb3JtKClcbiAgaWYgKHBsYXRmb3JtID09ICdkYXJ3aW4nKSB7IHByZWZpeCA9IGDihLkg772iZXh0772jOmAgfVxuICBlbHNlIHsgcHJlZml4ID0gYGkgW2V4dF06YCB9XG4gIHJldHVybiBgJHtjaGFsay5ncmVlbihwcmVmaXgpfSBgXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfZ2V0VmVyc2lvbnMoYXBwLCBwbHVnaW5OYW1lLCBmcmFtZXdvcmtOYW1lKSB7XG4gIGNvbnN0IHBhdGggPSByZXF1aXJlKCdwYXRoJylcbiAgY29uc3QgZnMgPSByZXF1aXJlKCdmcycpXG5cbiAgdmFyIHYgPSB7fVxuICB2YXIgcGx1Z2luUGF0aCA9IHBhdGgucmVzb2x2ZShwcm9jZXNzLmN3ZCgpLCdub2RlX21vZHVsZXMvQHNlbmNoYScsIHBsdWdpbk5hbWUpXG4gIHZhciBwbHVnaW5Qa2cgPSAoZnMuZXhpc3RzU3luYyhwbHVnaW5QYXRoKycvcGFja2FnZS5qc29uJykgJiYgSlNPTi5wYXJzZShmcy5yZWFkRmlsZVN5bmMocGx1Z2luUGF0aCsnL3BhY2thZ2UuanNvbicsICd1dGYtOCcpKSB8fCB7fSk7XG4gIHYucGx1Z2luVmVyc2lvbiA9IHBsdWdpblBrZy52ZXJzaW9uXG4gIHYuX3Jlc29sdmVkID0gcGx1Z2luUGtnLl9yZXNvbHZlZFxuICBpZiAodi5fcmVzb2x2ZWQgPT0gdW5kZWZpbmVkKSB7XG4gICAgdi5lZGl0aW9uID0gYENvbW1lcmNpYWxgXG4gIH1cbiAgZWxzZSB7XG4gICAgaWYgKC0xID09IHYuX3Jlc29sdmVkLmluZGV4T2YoJ2NvbW11bml0eScpKSB7XG4gICAgICB2LmVkaXRpb24gPSBgQ29tbWVyY2lhbGBcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICB2LmVkaXRpb24gPSBgQ29tbXVuaXR5YFxuICAgIH1cbiAgfVxuXG4gIHZhciB3ZWJwYWNrUGF0aCA9IHBhdGgucmVzb2x2ZShwcm9jZXNzLmN3ZCgpLCdub2RlX21vZHVsZXMvd2VicGFjaycpXG4gIHZhciB3ZWJwYWNrUGtnID0gKGZzLmV4aXN0c1N5bmMod2VicGFja1BhdGgrJy9wYWNrYWdlLmpzb24nKSAmJiBKU09OLnBhcnNlKGZzLnJlYWRGaWxlU3luYyh3ZWJwYWNrUGF0aCsnL3BhY2thZ2UuanNvbicsICd1dGYtOCcpKSB8fCB7fSk7XG4gIHYud2VicGFja1ZlcnNpb24gPSB3ZWJwYWNrUGtnLnZlcnNpb25cblxuICB2YXIgZXh0UGF0aCA9IHBhdGgucmVzb2x2ZShwcm9jZXNzLmN3ZCgpLCdub2RlX21vZHVsZXMvQHNlbmNoYS9leHQnKVxuICB2YXIgZXh0UGtnID0gKGZzLmV4aXN0c1N5bmMoZXh0UGF0aCsnL3BhY2thZ2UuanNvbicpICYmIEpTT04ucGFyc2UoZnMucmVhZEZpbGVTeW5jKGV4dFBhdGgrJy9wYWNrYWdlLmpzb24nLCAndXRmLTgnKSkgfHwge30pO1xuICB2LmV4dFZlcnNpb24gPSBleHRQa2cuc2VuY2hhLnZlcnNpb25cblxuICB2YXIgY21kUGF0aCA9IHBhdGgucmVzb2x2ZShwcm9jZXNzLmN3ZCgpLGBub2RlX21vZHVsZXMvQHNlbmNoYS9jbWRgKVxuICB2YXIgY21kUGtnID0gKGZzLmV4aXN0c1N5bmMoY21kUGF0aCsnL3BhY2thZ2UuanNvbicpICYmIEpTT04ucGFyc2UoZnMucmVhZEZpbGVTeW5jKGNtZFBhdGgrJy9wYWNrYWdlLmpzb24nLCAndXRmLTgnKSkgfHwge30pO1xuICB2LmNtZFZlcnNpb24gPSBjbWRQa2cudmVyc2lvbl9mdWxsXG5cbiAgaWYgKHYuY21kVmVyc2lvbiA9PSB1bmRlZmluZWQpIHtcbiAgICB2YXIgY21kUGF0aCA9IHBhdGgucmVzb2x2ZShwcm9jZXNzLmN3ZCgpLGBub2RlX21vZHVsZXMvQHNlbmNoYS8ke3BsdWdpbk5hbWV9L25vZGVfbW9kdWxlcy9Ac2VuY2hhL2NtZGApXG4gICAgdmFyIGNtZFBrZyA9IChmcy5leGlzdHNTeW5jKGNtZFBhdGgrJy9wYWNrYWdlLmpzb24nKSAmJiBKU09OLnBhcnNlKGZzLnJlYWRGaWxlU3luYyhjbWRQYXRoKycvcGFja2FnZS5qc29uJywgJ3V0Zi04JykpIHx8IHt9KTtcbiAgICB2LmNtZFZlcnNpb24gPSBjbWRQa2cudmVyc2lvbl9mdWxsXG4gIH1cblxuICB2YXIgZnJhbWV3b3JrSW5mbyA9ICcnXG4gICBpZiAoZnJhbWV3b3JrTmFtZSAhPSB1bmRlZmluZWQgJiYgZnJhbWV3b3JrTmFtZSAhPSAnZXh0anMnKSB7XG4gICAgdmFyIGZyYW1ld29ya1BhdGggPSAnJ1xuICAgIGlmIChmcmFtZXdvcmtOYW1lID09ICdyZWFjdCcpIHtcbiAgICAgIGZyYW1ld29ya1BhdGggPSBwYXRoLnJlc29sdmUocHJvY2Vzcy5jd2QoKSwnbm9kZV9tb2R1bGVzL3JlYWN0JylcbiAgICB9XG4gICAgaWYgKGZyYW1ld29ya05hbWUgPT0gJ2FuZ3VsYXInKSB7XG4gICAgICBmcmFtZXdvcmtQYXRoID0gcGF0aC5yZXNvbHZlKHByb2Nlc3MuY3dkKCksJ25vZGVfbW9kdWxlcy9AYW5ndWxhci9jb3JlJylcbiAgICB9XG4gICAgdmFyIGZyYW1ld29ya1BrZyA9IChmcy5leGlzdHNTeW5jKGZyYW1ld29ya1BhdGgrJy9wYWNrYWdlLmpzb24nKSAmJiBKU09OLnBhcnNlKGZzLnJlYWRGaWxlU3luYyhmcmFtZXdvcmtQYXRoKycvcGFja2FnZS5qc29uJywgJ3V0Zi04JykpIHx8IHt9KTtcbiAgICB2LmZyYW1ld29ya1ZlcnNpb24gPSBmcmFtZXdvcmtQa2cudmVyc2lvblxuICAgIGZyYW1ld29ya0luZm8gPSAnLCAnICsgZnJhbWV3b3JrTmFtZSArICcgdicgKyB2LmZyYW1ld29ya1ZlcnNpb25cbiAgfVxuICByZXR1cm4gYXBwICsgJ2V4dC13ZWJwYWNrLXBsdWdpbiB2JyArIHYucGx1Z2luVmVyc2lvbiArICcsIEV4dCBKUyB2JyArIHYuZXh0VmVyc2lvbiArICcgJyArIHYuZWRpdGlvbiArICcgRWRpdGlvbiwgU2VuY2hhIENtZCB2JyArIHYuY21kVmVyc2lvbiArICcsIHdlYnBhY2sgdicgKyB2LndlYnBhY2tWZXJzaW9uICsgZnJhbWV3b3JrSW5mb1xuIH0iXX0=