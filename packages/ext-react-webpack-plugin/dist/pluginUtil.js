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
  const fs = require('fs');

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

  logv(options, `thisVars - ${JSON.stringify(thisVars)}`);
  log(require('./pluginUtil')._getVersions(thisVars.app, thisVars.pluginName, thisVars.framework));
  log(thisVars.app + 'Building for ' + thisOptions.environment);
  log(thisVars.app + 'Treeshake is ' + thisOptions.treeshake);

  if (thisVars.production == true && thisOptions.treeshake == true && options.framework == 'angular') {
    require(`./angularUtil`)._toProd(thisVars, thisOptions);
  }

  plugin.vars = thisVars;
  plugin.options = thisOptions;

  require('./pluginUtil').logv(options, 'FUNCTION constructor (end)');

  return plugin;
} //**********


function _compilation(compiler, compilation, vars, options) {
  try {
    require('./pluginUtil').logv(options, 'FUNCTION _compilation');

    var extComponents = [];

    if (vars.production) {
      if (options.framework == 'angular' && options.treeshake) {
        extComponents = require('./angularUtil')._getAllComponents(vars, options);
      }

      compilation.hooks.succeedModule.tap(`ext-succeed-module`, module => {
        //require('./pluginUtil').logv(options, 'HOOK succeedModule')
        if (module.resource && !module.resource.match(/node_modules/)) {
          if (module.resource.match(/\.html$/) != null) {
            if (module._source._value.toLowerCase().includes('doctype html') == false) {
              vars.deps = [...(vars.deps || []), ...require(`./${vars.framework}Util`).extractFromSource(module, options, compilation, extComponents)];
            }
          } else {
            vars.deps = [...(vars.deps || []), ...require(`./${vars.framework}Util`).extractFromSource(module, options, compilation, extComponents)];
          }
        } // if (extComponents.length && module.resource && (module.resource.match(/\.(j|t)sx?$/) ||
        // options.framework == 'angular' && module.resource.match(/\.html$/)) &&
        // !module.resource.match(/node_modules/) && !module.resource.match(`/ext-{$options.framework}/build/`)) {
        //   vars.deps = [...(vars.deps || []), ...require(`./${vars.framework}Util`).extractFromSource(module, options, compilation, extComponents)]
        // }

      });

      if (options.framework == 'angular' && options.treeshake == true) {
        compilation.hooks.finishModules.tap(`ext-finish-modules`, modules => {
          require('./pluginUtil').logv(options, 'HOOK finishModules');

          require('./angularUtil')._writeFilesToProdFolder(vars, options);
        });
      }
    }

    if (options.framework == 'angular' && options.treeshake == false || options.framework == 'react' && options.treeshake == true) {
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

      if (options.framework == 'angular') {
        //because of a problem with colorpicker
        if (fs.existsSync(path.join(process.cwd(), 'ext-angular/ux/'))) {
          var fromPath = path.join(process.cwd(), 'ext-angular/ux/');
          var toPath = path.join(output, 'ux');
          fsx.copySync(fromPath, toPath);
          log(app + 'Copying (ux) ' + fromPath.replace(process.cwd(), '') + ' to: ' + toPath.replace(process.cwd(), ''));
        }

        if (fs.existsSync(path.join(process.cwd(), 'ext-angular/packages/'))) {
          var fromPath = path.join(process.cwd(), 'ext-angular/packages/');
          var toPath = path.join(output, 'packages');
          fsx.copySync(fromPath, toPath);
          log(app + 'Copying ' + fromPath.replace(process.cwd(), '') + ' to: ' + toPath.replace(process.cwd(), ''));
        }

        if (fs.existsSync(path.join(process.cwd(), 'ext-angular/overrides/'))) {
          var fromPath = path.join(process.cwd(), 'ext-angular/overrides/');
          var toPath = path.join(output, 'overrides');
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
      // if (!vars.deps.includes('Ext.require("Ext.layout.*");\n')) {
      //   vars.deps.push('Ext.require("Ext.layout.*");\n')
      // }
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

    if (vars.production == true && options.treeshake == false && options.framework == 'angular') {
      require(`./${options.framework}Util`)._toDev(vars, options);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9wbHVnaW5VdGlsLmpzIl0sIm5hbWVzIjpbIl9jb25zdHJ1Y3RvciIsIm9wdGlvbnMiLCJmcyIsInJlcXVpcmUiLCJ0aGlzVmFycyIsInRoaXNPcHRpb25zIiwicGx1Z2luIiwiZnJhbWV3b3JrIiwidW5kZWZpbmVkIiwicGx1Z2luRXJyb3JzIiwicHVzaCIsInZhcnMiLCJ2YWxpZGF0ZU9wdGlvbnMiLCJnZXRWYWxpZGF0ZU9wdGlvbnMiLCJnZXREZWZhdWx0VmFycyIsInBsdWdpbk5hbWUiLCJhcHAiLCJfZ2V0QXBwIiwibG9ndiIsInJjIiwiZXhpc3RzU3luYyIsIkpTT04iLCJwYXJzZSIsInJlYWRGaWxlU3luYyIsImdldERlZmF1bHRPcHRpb25zIiwic3RyaW5naWZ5IiwiZW52aXJvbm1lbnQiLCJwcm9kdWN0aW9uIiwibG9nIiwiX2dldFZlcnNpb25zIiwidHJlZXNoYWtlIiwiX3RvUHJvZCIsIl9jb21waWxhdGlvbiIsImNvbXBpbGVyIiwiY29tcGlsYXRpb24iLCJleHRDb21wb25lbnRzIiwiX2dldEFsbENvbXBvbmVudHMiLCJob29rcyIsInN1Y2NlZWRNb2R1bGUiLCJ0YXAiLCJtb2R1bGUiLCJyZXNvdXJjZSIsIm1hdGNoIiwiX3NvdXJjZSIsIl92YWx1ZSIsInRvTG93ZXJDYXNlIiwiaW5jbHVkZXMiLCJkZXBzIiwiZXh0cmFjdEZyb21Tb3VyY2UiLCJmaW5pc2hNb2R1bGVzIiwibW9kdWxlcyIsIl93cml0ZUZpbGVzVG9Qcm9kRm9sZGVyIiwiaHRtbFdlYnBhY2tQbHVnaW5CZWZvcmVIdG1sR2VuZXJhdGlvbiIsImRhdGEiLCJwYXRoIiwib3V0cHV0UGF0aCIsImRldlNlcnZlciIsImpvaW4iLCJjb250ZW50QmFzZSIsInJlcGxhY2UiLCJwcm9jZXNzIiwiY3dkIiwidHJpbSIsImpzUGF0aCIsImV4dFBhdGgiLCJjc3NQYXRoIiwiYXNzZXRzIiwianMiLCJ1bnNoaWZ0IiwiY3NzIiwiZSIsImVycm9ycyIsIl9hZnRlckNvbXBpbGUiLCJlbWl0IiwiY2FsbGJhY2siLCJfYnVpbGRFeHRCdW5kbGUiLCJfcHJlcGFyZUZvckJ1aWxkIiwiY29tbWFuZCIsIndhdGNoIiwicmVidWlsZCIsInBhcm1zIiwicHJvZmlsZSIsIndhdGNoU3RhcnRlZCIsIm91dHB1dCIsInJpbXJhZiIsIm1rZGlycCIsImZzeCIsInBhY2thZ2VzIiwidG9vbGtpdCIsInRoZW1lIiwiZmlyc3RUaW1lIiwic3luYyIsImJ1aWxkWE1MIiwiY3JlYXRlQXBwSnNvbiIsImNyZWF0ZVdvcmtzcGFjZUpzb24iLCJjcmVhdGVKU0RPTUVudmlyb25tZW50Iiwid3JpdGVGaWxlU3luYyIsImZyb21QYXRoIiwidG9QYXRoIiwiY29weVN5bmMiLCJmcm9tUmVzb3VyY2VzIiwidG9SZXNvdXJjZXMiLCJmcm9tUGFja2FnZXMiLCJ0b1BhY2thZ2VzIiwibWFuaWZlc3QiLCJidW5kbGVEaXIiLCJzZW5jaGEiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsIm9uQnVpbGREb25lIiwib3B0cyIsInNpbGVudCIsInN0ZGlvIiwiZW5jb2RpbmciLCJleGVjdXRlQXN5bmMiLCJ0aGVuIiwicmVhc29uIiwiY29uc29sZSIsIl9kb25lIiwiX3RvRGV2IiwiYnJvd3NlciIsImJyb3dzZXJDb3VudCIsInVybCIsInBvcnQiLCJvcG4iLCJERUZBVUxUX1NVQlNUUlMiLCJzdWJzdHJpbmdzIiwiY2hhbGsiLCJjcm9zc1NwYXduIiwiY2hpbGQiLCJvbiIsImNvZGUiLCJzaWduYWwiLCJFcnJvciIsImVycm9yIiwic3Rkb3V0Iiwic3RyIiwidG9TdHJpbmciLCJzb21lIiwidiIsImluZGV4T2YiLCJyZWQiLCJzdGRlcnIiLCJzdHJKYXZhT3B0cyIsInMiLCJjdXJzb3JUbyIsImNsZWFyTGluZSIsIndyaXRlIiwidmVyYm9zZSIsInByZWZpeCIsInBsYXRmb3JtIiwiZ3JlZW4iLCJmcmFtZXdvcmtOYW1lIiwicGx1Z2luUGF0aCIsInBsdWdpblBrZyIsInBsdWdpblZlcnNpb24iLCJ2ZXJzaW9uIiwiX3Jlc29sdmVkIiwiZWRpdGlvbiIsIndlYnBhY2tQYXRoIiwid2VicGFja1BrZyIsIndlYnBhY2tWZXJzaW9uIiwiZXh0UGtnIiwiZXh0VmVyc2lvbiIsImNtZFBhdGgiLCJjbWRQa2ciLCJjbWRWZXJzaW9uIiwidmVyc2lvbl9mdWxsIiwiZnJhbWV3b3JrSW5mbyIsImZyYW1ld29ya1BhdGgiLCJmcmFtZXdvcmtQa2ciLCJmcmFtZXdvcmtWZXJzaW9uIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ08sU0FBU0EsWUFBVCxDQUFzQkMsT0FBdEIsRUFBK0I7QUFDcEMsUUFBTUMsRUFBRSxHQUFHQyxPQUFPLENBQUMsSUFBRCxDQUFsQjs7QUFFQSxNQUFJQyxRQUFRLEdBQUcsRUFBZjtBQUNBLE1BQUlDLFdBQVcsR0FBRyxFQUFsQjtBQUNBLE1BQUlDLE1BQU0sR0FBRyxFQUFiOztBQUVBLE1BQUlMLE9BQU8sQ0FBQ00sU0FBUixJQUFxQkMsU0FBekIsRUFBb0M7QUFDbENKLElBQUFBLFFBQVEsQ0FBQ0ssWUFBVCxHQUF3QixFQUF4QjtBQUNBTCxJQUFBQSxRQUFRLENBQUNLLFlBQVQsQ0FBc0JDLElBQXRCLENBQTJCLDBHQUEzQjtBQUNBSixJQUFBQSxNQUFNLENBQUNLLElBQVAsR0FBY1AsUUFBZDtBQUNBLFdBQU9FLE1BQVA7QUFDRDs7QUFFRCxRQUFNTSxlQUFlLEdBQUdULE9BQU8sQ0FBQyxjQUFELENBQS9COztBQUNBUyxFQUFBQSxlQUFlLENBQUNULE9BQU8sQ0FBRSxLQUFJRixPQUFPLENBQUNNLFNBQVUsTUFBeEIsQ0FBUCxDQUFzQ00sa0JBQXRDLEVBQUQsRUFBNkRaLE9BQTdELEVBQXNFLEVBQXRFLENBQWY7QUFDQUcsRUFBQUEsUUFBUSxHQUFHRCxPQUFPLENBQUUsS0FBSUYsT0FBTyxDQUFDTSxTQUFVLE1BQXhCLENBQVAsQ0FBc0NPLGNBQXRDLEVBQVg7QUFDQVYsRUFBQUEsUUFBUSxDQUFDRyxTQUFULEdBQXFCTixPQUFPLENBQUNN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QUFDa0IsVUFBSCxDQUFjc0osYUFBYSxHQUFDLGVBQTVCLEtBQWdEckosSUFBSSxDQUFDQyxLQUFMLENBQVdwQixFQUFFLENBQUNxQixZQUFILENBQWdCbUosYUFBYSxHQUFDLGVBQTlCLEVBQStDLE9BQS9DLENBQVgsQ0FBaEQsSUFBdUgsRUFBM0k7QUFDQTlCLElBQUFBLENBQUMsQ0FBQ2dDLGdCQUFGLEdBQXFCRCxZQUFZLENBQUNkLE9BQWxDO0FBQ0FZLElBQUFBLGFBQWEsR0FBRyxPQUFPaEIsYUFBUCxHQUF1QixJQUF2QixHQUE4QmIsQ0FBQyxDQUFDZ0MsZ0JBQWhEO0FBQ0Q7O0FBQ0QsU0FBTzVKLEdBQUcsR0FBRyxzQkFBTixHQUErQjRILENBQUMsQ0FBQ2dCLGFBQWpDLEdBQWlELFlBQWpELEdBQWdFaEIsQ0FBQyxDQUFDd0IsVUFBbEUsR0FBK0UsR0FBL0UsR0FBcUZ4QixDQUFDLENBQUNtQixPQUF2RixHQUFpRyx3QkFBakcsR0FBNEhuQixDQUFDLENBQUMyQixVQUE5SCxHQUEySSxhQUEzSSxHQUEySjNCLENBQUMsQ0FBQ3NCLGNBQTdKLEdBQThLTyxhQUFyTDtBQUNBIiwic291cmNlc0NvbnRlbnQiOlsiLy8qKioqKioqKioqXG5leHBvcnQgZnVuY3Rpb24gX2NvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgY29uc3QgZnMgPSByZXF1aXJlKCdmcycpXG4gXG4gIHZhciB0aGlzVmFycyA9IHt9XG4gIHZhciB0aGlzT3B0aW9ucyA9IHt9XG4gIHZhciBwbHVnaW4gPSB7fVxuXG4gIGlmIChvcHRpb25zLmZyYW1ld29yayA9PSB1bmRlZmluZWQpIHtcbiAgICB0aGlzVmFycy5wbHVnaW5FcnJvcnMgPSBbXVxuICAgIHRoaXNWYXJzLnBsdWdpbkVycm9ycy5wdXNoKCd3ZWJwYWNrIGNvbmZpZzogZnJhbWV3b3JrIHBhcmFtZXRlciBvbiBleHQtd2VicGFjay1wbHVnaW4gaXMgbm90IGRlZmluZWQgLSB2YWx1ZXM6IHJlYWN0LCBhbmd1bGFyLCBleHRqcycpXG4gICAgcGx1Z2luLnZhcnMgPSB0aGlzVmFyc1xuICAgIHJldHVybiBwbHVnaW5cbiAgfVxuXG4gIGNvbnN0IHZhbGlkYXRlT3B0aW9ucyA9IHJlcXVpcmUoJ3NjaGVtYS11dGlscycpXG4gIHZhbGlkYXRlT3B0aW9ucyhyZXF1aXJlKGAuLyR7b3B0aW9ucy5mcmFtZXdvcmt9VXRpbGApLmdldFZhbGlkYXRlT3B0aW9ucygpLCBvcHRpb25zLCAnJylcbiAgdGhpc1ZhcnMgPSByZXF1aXJlKGAuLyR7b3B0aW9ucy5mcmFtZXdvcmt9VXRpbGApLmdldERlZmF1bHRWYXJzKClcbiAgdGhpc1ZhcnMuZnJhbWV3b3JrID0gb3B0aW9ucy5mcmFtZXdvcmtcbiAgc3dpdGNoKHRoaXNWYXJzLmZyYW1ld29yaykge1xuICAgIGNhc2UgJ2V4dGpzJzpcbiAgICAgIHRoaXNWYXJzLnBsdWdpbk5hbWUgPSAnZXh0LXdlYnBhY2stcGx1Z2luJ1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAncmVhY3QnOlxuICAgICAgdGhpc1ZhcnMucGx1Z2luTmFtZSA9ICdleHQtcmVhY3Qtd2VicGFjay1wbHVnaW4nXG4gICAgICBicmVhaztcbiAgICBjYXNlICdhbmd1bGFyJzpcbiAgICAgIHRoaXNWYXJzLnBsdWdpbk5hbWUgPSAnZXh0LWFuZ3VsYXItd2VicGFjay1wbHVnaW4nXG4gICAgICBicmVhaztcbiAgICBkZWZhdWx0OlxuICAgICAgdGhpc1ZhcnMucGx1Z2luTmFtZSA9ICdleHQtd2VicGFjay1wbHVnaW4nXG4gIH1cblxuICB0aGlzVmFycy5hcHAgPSByZXF1aXJlKCcuL3BsdWdpblV0aWwnKS5fZ2V0QXBwKClcbiAgbG9ndihvcHRpb25zLCBgcGx1Z2luTmFtZSAtICR7dGhpc1ZhcnMucGx1Z2luTmFtZX1gKVxuICBsb2d2KG9wdGlvbnMsIGB0aGlzVmFycy5hcHAgLSAke3RoaXNWYXJzLmFwcH1gKVxuXG4gIGNvbnN0IHJjID0gKGZzLmV4aXN0c1N5bmMoYC5leHQtJHt0aGlzVmFycy5mcmFtZXdvcmt9cmNgKSAmJiBKU09OLnBhcnNlKGZzLnJlYWRGaWxlU3luYyhgLmV4dC0ke3RoaXNWYXJzLmZyYW1ld29ya31yY2AsICd1dGYtOCcpKSB8fCB7fSlcbiAgdGhpc09wdGlvbnMgPSB7IC4uLnJlcXVpcmUoYC4vJHt0aGlzVmFycy5mcmFtZXdvcmt9VXRpbGApLmdldERlZmF1bHRPcHRpb25zKCksIC4uLm9wdGlvbnMsIC4uLnJjIH1cbiAgbG9ndihvcHRpb25zLCBgdGhpc09wdGlvbnMgLSAke0pTT04uc3RyaW5naWZ5KHRoaXNPcHRpb25zKX1gKVxuXG4gIGlmICh0aGlzT3B0aW9ucy5lbnZpcm9ubWVudCA9PSAncHJvZHVjdGlvbicpIFxuICAgIHt0aGlzVmFycy5wcm9kdWN0aW9uID0gdHJ1ZX1cbiAgZWxzZSBcbiAgICB7dGhpc1ZhcnMucHJvZHVjdGlvbiA9IGZhbHNlfVxuICBsb2d2KG9wdGlvbnMsIGB0aGlzVmFycyAtICR7SlNPTi5zdHJpbmdpZnkodGhpc1ZhcnMpfWApXG5cbiAgbG9nKHJlcXVpcmUoJy4vcGx1Z2luVXRpbCcpLl9nZXRWZXJzaW9ucyh0aGlzVmFycy5hcHAsIHRoaXNWYXJzLnBsdWdpbk5hbWUsIHRoaXNWYXJzLmZyYW1ld29yaykpXG4gIGxvZyh0aGlzVmFycy5hcHAgKyAnQnVpbGRpbmcgZm9yICcgKyB0aGlzT3B0aW9ucy5lbnZpcm9ubWVudClcbiAgbG9nKHRoaXNWYXJzLmFwcCArICdUcmVlc2hha2UgaXMgJyArIHRoaXNPcHRpb25zLnRyZWVzaGFrZSlcblxuICBpZiAodGhpc1ZhcnMucHJvZHVjdGlvbiA9PSB0cnVlICYmIHRoaXNPcHRpb25zLnRyZWVzaGFrZSA9PSB0cnVlICYmIG9wdGlvbnMuZnJhbWV3b3JrID09ICdhbmd1bGFyJykge1xuICAgIHJlcXVpcmUoYC4vYW5ndWxhclV0aWxgKS5fdG9Qcm9kKHRoaXNWYXJzLCB0aGlzT3B0aW9ucylcbiAgfVxuXG4gIHBsdWdpbi52YXJzID0gdGhpc1ZhcnNcbiAgcGx1Z2luLm9wdGlvbnMgPSB0aGlzT3B0aW9uc1xuICByZXF1aXJlKCcuL3BsdWdpblV0aWwnKS5sb2d2KG9wdGlvbnMsICdGVU5DVElPTiBjb25zdHJ1Y3RvciAoZW5kKScpXG4gIHJldHVybiBwbHVnaW5cbn1cblxuLy8qKioqKioqKioqXG5leHBvcnQgZnVuY3Rpb24gX2NvbXBpbGF0aW9uKGNvbXBpbGVyLCBjb21waWxhdGlvbiwgdmFycywgb3B0aW9ucykge1xuICB0cnkge1xuICAgIHJlcXVpcmUoJy4vcGx1Z2luVXRpbCcpLmxvZ3Yob3B0aW9ucywgJ0ZVTkNUSU9OIF9jb21waWxhdGlvbicpXG5cbiAgICB2YXIgZXh0Q29tcG9uZW50cyA9IFtdXG5cbiAgICBpZiAodmFycy5wcm9kdWN0aW9uKSB7XG4gICAgICBpZiAob3B0aW9ucy5mcmFtZXdvcmsgPT0gJ2FuZ3VsYXInICYmIG9wdGlvbnMudHJlZXNoYWtlKSB7XG4gICAgICAgIGV4dENvbXBvbmVudHMgPSByZXF1aXJlKCcuL2FuZ3VsYXJVdGlsJykuX2dldEFsbENvbXBvbmVudHModmFycywgb3B0aW9ucylcbiAgICAgIH1cblxuICAgICAgY29tcGlsYXRpb24uaG9va3Muc3VjY2VlZE1vZHVsZS50YXAoYGV4dC1zdWNjZWVkLW1vZHVsZWAsIG1vZHVsZSA9PiB7XG4gICAgICAgIC8vcmVxdWlyZSgnLi9wbHVnaW5VdGlsJykubG9ndihvcHRpb25zLCAnSE9PSyBzdWNjZWVkTW9kdWxlJylcbiAgICAgICAgaWYgKG1vZHVsZS5yZXNvdXJjZSAmJiAhbW9kdWxlLnJlc291cmNlLm1hdGNoKC9ub2RlX21vZHVsZXMvKSkge1xuICAgICAgICAgIGlmKG1vZHVsZS5yZXNvdXJjZS5tYXRjaCgvXFwuaHRtbCQvKSAhPSBudWxsKSB7XG4gICAgICAgICAgICBpZihtb2R1bGUuX3NvdXJjZS5fdmFsdWUudG9Mb3dlckNhc2UoKS5pbmNsdWRlcygnZG9jdHlwZSBodG1sJykgPT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgdmFycy5kZXBzID0gWy4uLih2YXJzLmRlcHMgfHwgW10pLCAuLi5yZXF1aXJlKGAuLyR7dmFycy5mcmFtZXdvcmt9VXRpbGApLmV4dHJhY3RGcm9tU291cmNlKG1vZHVsZSwgb3B0aW9ucywgY29tcGlsYXRpb24sIGV4dENvbXBvbmVudHMpXVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHZhcnMuZGVwcyA9IFsuLi4odmFycy5kZXBzIHx8IFtdKSwgLi4ucmVxdWlyZShgLi8ke3ZhcnMuZnJhbWV3b3JrfVV0aWxgKS5leHRyYWN0RnJvbVNvdXJjZShtb2R1bGUsIG9wdGlvbnMsIGNvbXBpbGF0aW9uLCBleHRDb21wb25lbnRzKV1cblxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBpZiAoZXh0Q29tcG9uZW50cy5sZW5ndGggJiYgbW9kdWxlLnJlc291cmNlICYmIChtb2R1bGUucmVzb3VyY2UubWF0Y2goL1xcLihqfHQpc3g/JC8pIHx8XG4gICAgICAgIC8vIG9wdGlvbnMuZnJhbWV3b3JrID09ICdhbmd1bGFyJyAmJiBtb2R1bGUucmVzb3VyY2UubWF0Y2goL1xcLmh0bWwkLykpICYmXG4gICAgICAgIC8vICFtb2R1bGUucmVzb3VyY2UubWF0Y2goL25vZGVfbW9kdWxlcy8pICYmICFtb2R1bGUucmVzb3VyY2UubWF0Y2goYC9leHQteyRvcHRpb25zLmZyYW1ld29ya30vYnVpbGQvYCkpIHtcbiAgICAgICAgLy8gICB2YXJzLmRlcHMgPSBbLi4uKHZhcnMuZGVwcyB8fCBbXSksIC4uLnJlcXVpcmUoYC4vJHt2YXJzLmZyYW1ld29ya31VdGlsYCkuZXh0cmFjdEZyb21Tb3VyY2UobW9kdWxlLCBvcHRpb25zLCBjb21waWxhdGlvbiwgZXh0Q29tcG9uZW50cyldXG4gICAgICAgIC8vIH1cbiAgICAgIH0pXG5cbiAgICAgIGlmIChvcHRpb25zLmZyYW1ld29yayA9PSAnYW5ndWxhcicgJiYgb3B0aW9ucy50cmVlc2hha2UgPT0gdHJ1ZSkge1xuICAgICAgICBjb21waWxhdGlvbi5ob29rcy5maW5pc2hNb2R1bGVzLnRhcChgZXh0LWZpbmlzaC1tb2R1bGVzYCwgbW9kdWxlcyA9PiB7XG4gICAgICAgICAgcmVxdWlyZSgnLi9wbHVnaW5VdGlsJykubG9ndihvcHRpb25zLCAnSE9PSyBmaW5pc2hNb2R1bGVzJylcbiAgICAgICAgICByZXF1aXJlKCcuL2FuZ3VsYXJVdGlsJykuX3dyaXRlRmlsZXNUb1Byb2RGb2xkZXIodmFycywgb3B0aW9ucylcbiAgICAgICAgfSlcbiAgICAgIH1cblxuICAgIH1cblxuICAgIGlmIChcbiAgICAgIChvcHRpb25zLmZyYW1ld29yayA9PSAnYW5ndWxhcicgJiYgb3B0aW9ucy50cmVlc2hha2UgPT0gZmFsc2UpIHx8XG4gICAgICAob3B0aW9ucy5mcmFtZXdvcmsgPT0gJ3JlYWN0JyAmJiBvcHRpb25zLnRyZWVzaGFrZSA9PSB0cnVlKVxuICAgICkge1xuICAgICAgICBjb21waWxhdGlvbi5ob29rcy5odG1sV2VicGFja1BsdWdpbkJlZm9yZUh0bWxHZW5lcmF0aW9uLnRhcChgZXh0LWh0bWwtZ2VuZXJhdGlvbmAsKGRhdGEpID0+IHtcbiAgICAgICAgbG9ndihvcHRpb25zLCdIT09LIGV4dC1odG1sLWdlbmVyYXRpb24nKVxuICAgICAgICBjb25zdCBwYXRoID0gcmVxdWlyZSgncGF0aCcpXG4gICAgICAgIHZhciBvdXRwdXRQYXRoID0gJydcbiAgICAgICAgaWYgKGNvbXBpbGVyLm9wdGlvbnMuZGV2U2VydmVyKSB7XG4gICAgICAgICAgaWYgKGNvbXBpbGVyLm91dHB1dFBhdGggPT09ICcvJykge1xuICAgICAgICAgICAgb3V0cHV0UGF0aCA9IHBhdGguam9pbihjb21waWxlci5vcHRpb25zLmRldlNlcnZlci5jb250ZW50QmFzZSwgb3V0cHV0UGF0aClcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpZiAoY29tcGlsZXIub3B0aW9ucy5kZXZTZXJ2ZXIuY29udGVudEJhc2UgPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgIG91dHB1dFBhdGggPSAnYnVpbGQnXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgb3V0cHV0UGF0aCA9ICcnXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIG91dHB1dFBhdGggPSAnYnVpbGQnXG4gICAgICAgIH1cbiAgICAgICAgb3V0cHV0UGF0aCA9IG91dHB1dFBhdGgucmVwbGFjZShwcm9jZXNzLmN3ZCgpLCAnJykudHJpbSgpXG4gICAgICAgIHZhciBqc1BhdGggPSBwYXRoLmpvaW4ob3V0cHV0UGF0aCwgdmFycy5leHRQYXRoLCAnZXh0LmpzJylcbiAgICAgICAgdmFyIGNzc1BhdGggPSBwYXRoLmpvaW4ob3V0cHV0UGF0aCwgdmFycy5leHRQYXRoLCAnZXh0LmNzcycpXG4gICAgICAgIGRhdGEuYXNzZXRzLmpzLnVuc2hpZnQoanNQYXRoKVxuICAgICAgICBkYXRhLmFzc2V0cy5jc3MudW5zaGlmdChjc3NQYXRoKVxuICAgICAgICBsb2codmFycy5hcHAgKyBgQWRkaW5nICR7anNQYXRofSBhbmQgJHtjc3NQYXRofSB0byBpbmRleC5odG1sYClcbiAgICAgIH0pXG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgbG9ndihvcHRpb25zLCdza2lwcGVkIEhPT0sgZXh0LWh0bWwtZ2VuZXJhdGlvbicpXG4gICAgfVxuICB9XG4gIGNhdGNoKGUpIHtcbiAgICByZXF1aXJlKCcuL3BsdWdpblV0aWwnKS5sb2d2KG9wdGlvbnMsZSlcbiAgICBjb21waWxhdGlvbi5lcnJvcnMucHVzaCgnX2NvbXBpbGF0aW9uOiAnICsgZSlcbiAgfVxufVxuXG4vLyoqKioqKioqKipcbmV4cG9ydCBmdW5jdGlvbiBfYWZ0ZXJDb21waWxlKGNvbXBpbGVyLCBjb21waWxhdGlvbiwgdmFycywgb3B0aW9ucykge1xuICByZXF1aXJlKCcuL3BsdWdpblV0aWwnKS5sb2d2KG9wdGlvbnMsICdGVU5DVElPTiBfYWZ0ZXJDb21waWxlJylcbn1cblxuLy8qKioqKioqKioqXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZW1pdChjb21waWxlciwgY29tcGlsYXRpb24sIHZhcnMsIG9wdGlvbnMsIGNhbGxiYWNrKSB7XG4gIHRyeSB7XG4gICAgY29uc3QgbG9nID0gcmVxdWlyZSgnLi9wbHVnaW5VdGlsJykubG9nXG4gICAgY29uc3QgbG9ndiA9IHJlcXVpcmUoJy4vcGx1Z2luVXRpbCcpLmxvZ3ZcbiAgICBsb2d2KG9wdGlvbnMsJ0ZVTkNUSU9OIGVtaXQnKVxuICAgIHZhciBhcHAgPSB2YXJzLmFwcFxuICAgIHZhciBmcmFtZXdvcmsgPSB2YXJzLmZyYW1ld29ya1xuICAgIGNvbnN0IHBhdGggPSByZXF1aXJlKCdwYXRoJylcbiAgICBjb25zdCBfYnVpbGRFeHRCdW5kbGUgPSByZXF1aXJlKCcuL3BsdWdpblV0aWwnKS5fYnVpbGRFeHRCdW5kbGVcbiAgICBsZXQgb3V0cHV0UGF0aCA9IHBhdGguam9pbihjb21waWxlci5vdXRwdXRQYXRoLHZhcnMuZXh0UGF0aClcbiAgICBpZiAoY29tcGlsZXIub3V0cHV0UGF0aCA9PT0gJy8nICYmIGNvbXBpbGVyLm9wdGlvbnMuZGV2U2VydmVyKSB7XG4gICAgICBvdXRwdXRQYXRoID0gcGF0aC5qb2luKGNvbXBpbGVyLm9wdGlvbnMuZGV2U2VydmVyLmNvbnRlbnRCYXNlLCBvdXRwdXRQYXRoKVxuICAgIH1cbiAgICBsb2d2KG9wdGlvbnMsJ291dHB1dFBhdGg6ICcgKyBvdXRwdXRQYXRoKVxuICAgIGxvZ3Yob3B0aW9ucywnZnJhbWV3b3JrOiAnICsgZnJhbWV3b3JrKVxuICAgIGlmIChvcHRpb25zLmVtaXQgPT0gdHJ1ZSkge1xuICAgICAgaWYgKGZyYW1ld29yayAhPSAnZXh0anMnKSB7XG4gICAgICAgIF9wcmVwYXJlRm9yQnVpbGQoYXBwLCB2YXJzLCBvcHRpb25zLCBvdXRwdXRQYXRoLCBjb21waWxhdGlvbilcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBpZiAob3B0aW9ucy5mcmFtZXdvcmsgPT0gJ2FuZ3VsYXInICYmICFvcHRpb25zLnRyZWVzaGFrZSkge1xuICAgICAgICAgIHJlcXVpcmUoYC4vJHtmcmFtZXdvcmt9VXRpbGApLl9wcmVwYXJlRm9yQnVpbGQoYXBwLCB2YXJzLCBvcHRpb25zLCBvdXRwdXRQYXRoLCBjb21waWxhdGlvbilcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICByZXF1aXJlKGAuLyR7ZnJhbWV3b3JrfVV0aWxgKS5fcHJlcGFyZUZvckJ1aWxkKGFwcCwgdmFycywgb3B0aW9ucywgb3V0cHV0UGF0aCwgY29tcGlsYXRpb24pXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdmFyIGNvbW1hbmQgPSAnJ1xuICAgICAgaWYgKG9wdGlvbnMud2F0Y2ggPT0gJ3llcycgJiYgdmFycy5wcm9kdWN0aW9uID09IGZhbHNlKSB7XG4gICAgICAgIGNvbW1hbmQgPSAnd2F0Y2gnXG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgY29tbWFuZCA9ICdidWlsZCdcbiAgICAgIH1cblxuICAgICAgaWYgKHZhcnMucmVidWlsZCA9PSB0cnVlKSB7XG4gICAgICAgIHZhciBwYXJtcyA9IFtdXG4gICAgICAgIGlmIChvcHRpb25zLnByb2ZpbGUgPT0gdW5kZWZpbmVkIHx8IG9wdGlvbnMucHJvZmlsZSA9PSAnJyB8fCBvcHRpb25zLnByb2ZpbGUgPT0gbnVsbCkge1xuICAgICAgICAgIGlmIChjb21tYW5kID09ICdidWlsZCcpIHtcbiAgICAgICAgICAgIHBhcm1zID0gWydhcHAnLCBjb21tYW5kLCBvcHRpb25zLmVudmlyb25tZW50XVxuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHBhcm1zID0gWydhcHAnLCBjb21tYW5kLCAnLS13ZWItc2VydmVyJywgJ2ZhbHNlJywgb3B0aW9ucy5lbnZpcm9ubWVudF1cbiAgICAgICAgICB9XG5cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBpZiAoY29tbWFuZCA9PSAnYnVpbGQnKSB7XG4gICAgICAgICAgICBwYXJtcyA9IFsnYXBwJywgY29tbWFuZCwgb3B0aW9ucy5wcm9maWxlLCBvcHRpb25zLmVudmlyb25tZW50XVxuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHBhcm1zID0gWydhcHAnLCBjb21tYW5kLCAnLS13ZWItc2VydmVyJywgJ2ZhbHNlJywgb3B0aW9ucy5wcm9maWxlLCBvcHRpb25zLmVudmlyb25tZW50XVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh2YXJzLndhdGNoU3RhcnRlZCA9PSBmYWxzZSkge1xuICAgICAgICAgIGF3YWl0IF9idWlsZEV4dEJ1bmRsZShhcHAsIGNvbXBpbGF0aW9uLCBvdXRwdXRQYXRoLCBwYXJtcywgb3B0aW9ucylcbiAgICAgICAgICB2YXJzLndhdGNoU3RhcnRlZCA9IHRydWVcbiAgICAgICAgfVxuICAgICAgICBjYWxsYmFjaygpXG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgY2FsbGJhY2soKVxuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGxvZyhgJHt2YXJzLmFwcH1GVU5DVElPTiBlbWl0IG5vdCBydW5gKVxuICAgICAgY2FsbGJhY2soKVxuICAgIH1cbiAgfVxuICBjYXRjaChlKSB7XG4gICAgcmVxdWlyZSgnLi9wbHVnaW5VdGlsJykubG9ndihvcHRpb25zLGUpXG4gICAgY29tcGlsYXRpb24uZXJyb3JzLnB1c2goJ2VtaXQ6ICcgKyBlKVxuICAgIGNhbGxiYWNrKClcbiAgfVxufVxuXG4vLyoqKioqKioqKipcbmV4cG9ydCBmdW5jdGlvbiBfcHJlcGFyZUZvckJ1aWxkKGFwcCwgdmFycywgb3B0aW9ucywgb3V0cHV0LCBjb21waWxhdGlvbikge1xuICB0cnkge1xuICAgIGxvZ3Yob3B0aW9ucywnRlVOQ1RJT04gX3ByZXBhcmVGb3JCdWlsZCcpXG4gICAgY29uc3QgcmltcmFmID0gcmVxdWlyZSgncmltcmFmJylcbiAgICBjb25zdCBta2RpcnAgPSByZXF1aXJlKCdta2RpcnAnKVxuICAgIGNvbnN0IGZzeCA9IHJlcXVpcmUoJ2ZzLWV4dHJhJylcbiAgICBjb25zdCBmcyA9IHJlcXVpcmUoJ2ZzJylcbiAgICBjb25zdCBwYXRoID0gcmVxdWlyZSgncGF0aCcpXG5cbiAgICB2YXIgcGFja2FnZXMgPSBvcHRpb25zLnBhY2thZ2VzXG4gICAgdmFyIHRvb2xraXQgPSBvcHRpb25zLnRvb2xraXRcbiAgICB2YXIgdGhlbWUgPSBvcHRpb25zLnRoZW1lXG5cbiAgICB0aGVtZSA9IHRoZW1lIHx8ICh0b29sa2l0ID09PSAnY2xhc3NpYycgPyAndGhlbWUtdHJpdG9uJyA6ICd0aGVtZS1tYXRlcmlhbCcpXG4gICAgbG9ndihvcHRpb25zLCdmaXJzdFRpbWU6ICcgKyB2YXJzLmZpcnN0VGltZSlcbiAgICBpZiAodmFycy5maXJzdFRpbWUpIHtcbiAgICAgIHJpbXJhZi5zeW5jKG91dHB1dClcbiAgICAgIG1rZGlycC5zeW5jKG91dHB1dClcbiAgICAgIGNvbnN0IGJ1aWxkWE1MID0gcmVxdWlyZSgnLi9hcnRpZmFjdHMnKS5idWlsZFhNTFxuICAgICAgY29uc3QgY3JlYXRlQXBwSnNvbiA9IHJlcXVpcmUoJy4vYXJ0aWZhY3RzJykuY3JlYXRlQXBwSnNvblxuICAgICAgY29uc3QgY3JlYXRlV29ya3NwYWNlSnNvbiA9IHJlcXVpcmUoJy4vYXJ0aWZhY3RzJykuY3JlYXRlV29ya3NwYWNlSnNvblxuICAgICAgY29uc3QgY3JlYXRlSlNET01FbnZpcm9ubWVudCA9IHJlcXVpcmUoJy4vYXJ0aWZhY3RzJykuY3JlYXRlSlNET01FbnZpcm9ubWVudFxuXG4gICAgICBmcy53cml0ZUZpbGVTeW5jKHBhdGguam9pbihvdXRwdXQsICdidWlsZC54bWwnKSwgYnVpbGRYTUwodmFycy5wcm9kdWN0aW9uLCBvcHRpb25zLCBvdXRwdXQpLCAndXRmOCcpXG4gICAgICBmcy53cml0ZUZpbGVTeW5jKHBhdGguam9pbihvdXRwdXQsICdhcHAuanNvbicpLCBjcmVhdGVBcHBKc29uKHRoZW1lLCBwYWNrYWdlcywgdG9vbGtpdCwgb3B0aW9ucywgb3V0cHV0KSwgJ3V0ZjgnKVxuICAgICAgZnMud3JpdGVGaWxlU3luYyhwYXRoLmpvaW4ob3V0cHV0LCAnanNkb20tZW52aXJvbm1lbnQuanMnKSwgY3JlYXRlSlNET01FbnZpcm9ubWVudChvcHRpb25zLCBvdXRwdXQpLCAndXRmOCcpXG4gICAgICBmcy53cml0ZUZpbGVTeW5jKHBhdGguam9pbihvdXRwdXQsICd3b3Jrc3BhY2UuanNvbicpLCBjcmVhdGVXb3Jrc3BhY2VKc29uKG9wdGlvbnMsIG91dHB1dCksICd1dGY4JylcblxuICAgICAgaWYgKG9wdGlvbnMuZnJhbWV3b3JrID09ICdhbmd1bGFyJykge1xuXG4gICAgICAgIC8vYmVjYXVzZSBvZiBhIHByb2JsZW0gd2l0aCBjb2xvcnBpY2tlclxuICAgICAgICBpZiAoZnMuZXhpc3RzU3luYyhwYXRoLmpvaW4ocHJvY2Vzcy5jd2QoKSwnZXh0LWFuZ3VsYXIvdXgvJykpKSB7XG4gICAgICAgICAgdmFyIGZyb21QYXRoID0gcGF0aC5qb2luKHByb2Nlc3MuY3dkKCksICdleHQtYW5ndWxhci91eC8nKVxuICAgICAgICAgIHZhciB0b1BhdGggPSBwYXRoLmpvaW4ob3V0cHV0LCAndXgnKVxuICAgICAgICAgIGZzeC5jb3B5U3luYyhmcm9tUGF0aCwgdG9QYXRoKVxuICAgICAgICAgIGxvZyhhcHAgKyAnQ29weWluZyAodXgpICcgKyBmcm9tUGF0aC5yZXBsYWNlKHByb2Nlc3MuY3dkKCksICcnKSArICcgdG86ICcgKyB0b1BhdGgucmVwbGFjZShwcm9jZXNzLmN3ZCgpLCAnJykpXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZnMuZXhpc3RzU3luYyhwYXRoLmpvaW4ocHJvY2Vzcy5jd2QoKSwnZXh0LWFuZ3VsYXIvcGFja2FnZXMvJykpKSB7XG4gICAgICAgICAgdmFyIGZyb21QYXRoID0gcGF0aC5qb2luKHByb2Nlc3MuY3dkKCksICdleHQtYW5ndWxhci9wYWNrYWdlcy8nKVxuICAgICAgICAgIHZhciB0b1BhdGggPSBwYXRoLmpvaW4ob3V0cHV0LCAncGFja2FnZXMnKVxuICAgICAgICAgIGZzeC5jb3B5U3luYyhmcm9tUGF0aCwgdG9QYXRoKVxuICAgICAgICAgIGxvZyhhcHAgKyAnQ29weWluZyAnICsgZnJvbVBhdGgucmVwbGFjZShwcm9jZXNzLmN3ZCgpLCAnJykgKyAnIHRvOiAnICsgdG9QYXRoLnJlcGxhY2UocHJvY2Vzcy5jd2QoKSwgJycpKVxuICAgICAgICB9XG4gICAgICAgIGlmIChmcy5leGlzdHNTeW5jKHBhdGguam9pbihwcm9jZXNzLmN3ZCgpLCdleHQtYW5ndWxhci9vdmVycmlkZXMvJykpKSB7XG4gICAgICAgICAgdmFyIGZyb21QYXRoID0gcGF0aC5qb2luKHByb2Nlc3MuY3dkKCksICdleHQtYW5ndWxhci9vdmVycmlkZXMvJylcbiAgICAgICAgICB2YXIgdG9QYXRoID0gcGF0aC5qb2luKG91dHB1dCwgJ292ZXJyaWRlcycpXG4gICAgICAgICAgZnN4LmNvcHlTeW5jKGZyb21QYXRoLCB0b1BhdGgpXG4gICAgICAgICAgbG9nKGFwcCArICdDb3B5aW5nICcgKyBmcm9tUGF0aC5yZXBsYWNlKHByb2Nlc3MuY3dkKCksICcnKSArICcgdG86ICcgKyB0b1BhdGgucmVwbGFjZShwcm9jZXNzLmN3ZCgpLCAnJykpXG4gICAgICAgIH1cbiAgICAgIH1cblxuXG5cblxuICAgICAgaWYgKHZhcnMuZnJhbWV3b3JrID09ICdyZWFjdCcpICB7XG4gICAgICAgIGlmIChmcy5leGlzdHNTeW5jKHBhdGguam9pbihwcm9jZXNzLmN3ZCgpLCdleHQtcmVhY3QvcGFja2FnZXMvJykpKSB7XG4gICAgICAgICAgdmFyIGZyb21QYXRoID0gcGF0aC5qb2luKHByb2Nlc3MuY3dkKCksICdleHQtcmVhY3QvcGFja2FnZXMvJylcbiAgICAgICAgICB2YXIgdG9QYXRoID0gcGF0aC5qb2luKG91dHB1dCwgJ3BhY2thZ2VzJylcbiAgICAgICAgICBmc3guY29weVN5bmMoZnJvbVBhdGgsIHRvUGF0aClcbiAgICAgICAgICBsb2coYXBwICsgJ0NvcHlpbmcgJyArIGZyb21QYXRoLnJlcGxhY2UocHJvY2Vzcy5jd2QoKSwgJycpICsgJyB0bzogJyArIHRvUGF0aC5yZXBsYWNlKHByb2Nlc3MuY3dkKCksICcnKSlcbiAgICAgICAgfVxuICAgICAgICBpZiAoZnMuZXhpc3RzU3luYyhwYXRoLmpvaW4ocHJvY2Vzcy5jd2QoKSwnZXh0LXJlYWN0L292ZXJyaWRlcy8nKSkpIHtcbiAgICAgICAgICB2YXIgZnJvbVBhdGggPSBwYXRoLmpvaW4ocHJvY2Vzcy5jd2QoKSwgJ2V4dC1yZWFjdC9vdmVycmlkZXMvJylcbiAgICAgICAgICB2YXIgdG9QYXRoID0gcGF0aC5qb2luKG91dHB1dCwgJ292ZXJyaWRlcycpXG4gICAgICAgICAgZnN4LmNvcHlTeW5jKGZyb21QYXRoLCB0b1BhdGgpXG4gICAgICAgICAgbG9nKGFwcCArICdDb3B5aW5nICcgKyBmcm9tUGF0aC5yZXBsYWNlKHByb2Nlc3MuY3dkKCksICcnKSArICcgdG86ICcgKyB0b1BhdGgucmVwbGFjZShwcm9jZXNzLmN3ZCgpLCAnJykpXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKGZzLmV4aXN0c1N5bmMocGF0aC5qb2luKHByb2Nlc3MuY3dkKCksJ3Jlc291cmNlcy8nKSkpIHtcbiAgICAgICAgdmFyIGZyb21SZXNvdXJjZXMgPSBwYXRoLmpvaW4ocHJvY2Vzcy5jd2QoKSwgJ3Jlc291cmNlcy8nKVxuICAgICAgICB2YXIgdG9SZXNvdXJjZXMgPSBwYXRoLmpvaW4ob3V0cHV0LCAnLi4vcmVzb3VyY2VzJylcbiAgICAgICAgZnN4LmNvcHlTeW5jKGZyb21SZXNvdXJjZXMsIHRvUmVzb3VyY2VzKVxuICAgICAgICBsb2coYXBwICsgJ0NvcHlpbmcgJyArIGZyb21SZXNvdXJjZXMucmVwbGFjZShwcm9jZXNzLmN3ZCgpLCAnJykgKyAnIHRvOiAnICsgdG9SZXNvdXJjZXMucmVwbGFjZShwcm9jZXNzLmN3ZCgpLCAnJykpXG4gICAgICB9XG4gICAgICBcbiAgICAgIGlmIChmcy5leGlzdHNTeW5jKHBhdGguam9pbihwcm9jZXNzLmN3ZCgpLCdwYWNrYWdlcy8nKSkpIHtcbiAgICAgICAgdmFyIGZyb21QYWNrYWdlcyA9IHBhdGguam9pbihwcm9jZXNzLmN3ZCgpLCAncGFja2FnZXMvJylcbiAgICAgICAgdmFyIHRvUGFja2FnZXMgPSBwYXRoLmpvaW4ob3V0cHV0LCAncGFja2FnZXMnKVxuICAgICAgICBmc3guY29weVN5bmMoZnJvbVBhY2thZ2VzLCB0b1BhY2thZ2VzKVxuICAgICAgICBsb2coYXBwICsgJ0NvcHlpbmcgJyArIGZyb21QYWNrYWdlcy5yZXBsYWNlKHByb2Nlc3MuY3dkKCksICcnKSArICcgdG86ICcgKyB0b1BhY2thZ2VzLnJlcGxhY2UocHJvY2Vzcy5jd2QoKSwgJycpKVxuICAgICAgfVxuXG4gICAgICBpZiAoZnMuZXhpc3RzU3luYyhwYXRoLmpvaW4ocHJvY2Vzcy5jd2QoKSwnb3ZlcnJpZGVzLycpKSkge1xuICAgICAgICB2YXIgZnJvbVBhdGggPSBwYXRoLmpvaW4ocHJvY2Vzcy5jd2QoKSwgJ292ZXJyaWRlcy8nKVxuICAgICAgICB2YXIgdG9QYXRoID0gcGF0aC5qb2luKG91dHB1dCwgJ292ZXJyaWRlcycpXG4gICAgICAgIGZzeC5jb3B5U3luYyhmcm9tUGF0aCwgdG9QYXRoKVxuICAgICAgICBsb2coYXBwICsgJ0NvcHlpbmcgJyArIGZyb21QYXRoLnJlcGxhY2UocHJvY2Vzcy5jd2QoKSwgJycpICsgJyB0bzogJyArIHRvUGF0aC5yZXBsYWNlKHByb2Nlc3MuY3dkKCksICcnKSlcbiAgICAgIH1cblxuICAgIH1cbiAgICB2YXJzLmZpcnN0VGltZSA9IGZhbHNlXG4gICAgdmFyIGpzID0gJydcbiAgICBpZiAodmFycy5wcm9kdWN0aW9uKSB7XG4gICAgICAvLyBpZiAoIXZhcnMuZGVwcy5pbmNsdWRlcygnRXh0LnJlcXVpcmUoXCJFeHQubGF5b3V0LipcIik7XFxuJykpIHtcbiAgICAgIC8vICAgdmFycy5kZXBzLnB1c2goJ0V4dC5yZXF1aXJlKFwiRXh0LmxheW91dC4qXCIpO1xcbicpXG4gICAgICAvLyB9XG4gICAgICBqcyA9IHZhcnMuZGVwcy5qb2luKCc7XFxuJyk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAganMgPSAnRXh0LnJlcXVpcmUoXCJFeHQuKlwiKSdcbiAgICB9XG4gICAgaWYgKHZhcnMubWFuaWZlc3QgPT09IG51bGwgfHwganMgIT09IHZhcnMubWFuaWZlc3QpIHtcbiAgICAgIHZhcnMubWFuaWZlc3QgPSBqc1xuICAgICAgY29uc3QgbWFuaWZlc3QgPSBwYXRoLmpvaW4ob3V0cHV0LCAnbWFuaWZlc3QuanMnKVxuICAgICAgZnMud3JpdGVGaWxlU3luYyhtYW5pZmVzdCwganMsICd1dGY4JylcbiAgICAgIHZhcnMucmVidWlsZCA9IHRydWVcbiAgICAgIHZhciBidW5kbGVEaXIgPSBvdXRwdXQucmVwbGFjZShwcm9jZXNzLmN3ZCgpLCAnJylcbiAgICAgIGlmIChidW5kbGVEaXIudHJpbSgpID09ICcnKSB7YnVuZGxlRGlyID0gJy4vJ31cbiAgICAgIGxvZyhhcHAgKyAnQnVpbGRpbmcgRXh0IGJ1bmRsZSBhdDogJyArIGJ1bmRsZURpcilcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICB2YXJzLnJlYnVpbGQgPSBmYWxzZVxuICAgICAgbG9nKGFwcCArICdFeHQgcmVidWlsZCBOT1QgbmVlZGVkJylcbiAgICB9XG4gIH1cbiAgY2F0Y2goZSkge1xuICAgIHJlcXVpcmUoJy4vcGx1Z2luVXRpbCcpLmxvZ3Yob3B0aW9ucyxlKVxuICAgIGNvbXBpbGF0aW9uLmVycm9ycy5wdXNoKCdfcHJlcGFyZUZvckJ1aWxkOiAnICsgZSlcbiAgfVxufVxuXG4vLyoqKioqKioqKipcbmV4cG9ydCBmdW5jdGlvbiBfYnVpbGRFeHRCdW5kbGUoYXBwLCBjb21waWxhdGlvbiwgb3V0cHV0UGF0aCwgcGFybXMsIG9wdGlvbnMpIHtcbiAgdHJ5IHtcbiAgICBjb25zdCBmcyA9IHJlcXVpcmUoJ2ZzJylcbiAgICBjb25zdCBsb2d2ID0gcmVxdWlyZSgnLi9wbHVnaW5VdGlsJykubG9ndlxuICAgIGxvZ3Yob3B0aW9ucywnRlVOQ1RJT04gX2J1aWxkRXh0QnVuZGxlJylcblxuICAgIGxldCBzZW5jaGE7IHRyeSB7IHNlbmNoYSA9IHJlcXVpcmUoJ0BzZW5jaGEvY21kJykgfSBjYXRjaCAoZSkgeyBzZW5jaGEgPSAnc2VuY2hhJyB9XG4gICAgaWYgKGZzLmV4aXN0c1N5bmMoc2VuY2hhKSkge1xuICAgICAgbG9ndihvcHRpb25zLCdzZW5jaGEgZm9sZGVyIGV4aXN0cycpXG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgbG9ndihvcHRpb25zLCdzZW5jaGEgZm9sZGVyIERPRVMgTk9UIGV4aXN0JylcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgY29uc3Qgb25CdWlsZERvbmUgPSAoKSA9PiB7XG4gICAgICAgIGxvZ3Yob3B0aW9ucywnb25CdWlsZERvbmUnKVxuICAgICAgICByZXNvbHZlKClcbiAgICAgIH1cblxuICAgICAgdmFyIG9wdHMgPSB7IGN3ZDogb3V0cHV0UGF0aCwgc2lsZW50OiB0cnVlLCBzdGRpbzogJ3BpcGUnLCBlbmNvZGluZzogJ3V0Zi04J31cbiAgICAgIGV4ZWN1dGVBc3luYyhhcHAsIHNlbmNoYSwgcGFybXMsIG9wdHMsIGNvbXBpbGF0aW9uLCBvcHRpb25zKS50aGVuIChcbiAgICAgICAgZnVuY3Rpb24oKSB7IG9uQnVpbGREb25lKCkgfSwgXG4gICAgICAgIGZ1bmN0aW9uKHJlYXNvbikgeyByZWplY3QocmVhc29uKSB9XG4gICAgICApXG4gICAgfSlcbiAgfVxuICBjYXRjaChlKSB7XG4gICAgY29uc29sZS5sb2coJ2UnKVxuICAgIHJlcXVpcmUoJy4vcGx1Z2luVXRpbCcpLmxvZ3Yob3B0aW9ucyxlKVxuICAgIGNvbXBpbGF0aW9uLmVycm9ycy5wdXNoKCdfYnVpbGRFeHRCdW5kbGU6ICcgKyBlKVxuICAgIGNhbGxiYWNrKClcbiAgfVxufVxuXG4vLyoqKioqKioqKipcbmV4cG9ydCBmdW5jdGlvbiBfZG9uZSh2YXJzLCBvcHRpb25zKSB7XG4gIHRyeSB7XG4gICAgY29uc3QgbG9nID0gcmVxdWlyZSgnLi9wbHVnaW5VdGlsJykubG9nXG4gICAgY29uc3QgbG9ndiA9IHJlcXVpcmUoJy4vcGx1Z2luVXRpbCcpLmxvZ3ZcbiAgICBsb2d2KG9wdGlvbnMsJ0ZVTkNUSU9OIF9kb25lJylcblxuXG4gICAgaWYgKHZhcnMucHJvZHVjdGlvbiA9PSB0cnVlICYmIG9wdGlvbnMudHJlZXNoYWtlID09IGZhbHNlICYmIG9wdGlvbnMuZnJhbWV3b3JrID09ICdhbmd1bGFyJykge1xuICAgICAgcmVxdWlyZShgLi8ke29wdGlvbnMuZnJhbWV3b3JrfVV0aWxgKS5fdG9EZXYodmFycywgb3B0aW9ucylcbiAgICB9XG5cblxuICAgIHRyeSB7XG4gICAgICBpZihvcHRpb25zLmJyb3dzZXIgPT0gdHJ1ZSAmJiBvcHRpb25zLndhdGNoID09ICd5ZXMnICYmIHZhcnMucHJvZHVjdGlvbiA9PSBmYWxzZSkge1xuICAgICAgICBpZiAodmFycy5icm93c2VyQ291bnQgPT0gMCkge1xuICAgICAgICAgIHZhciB1cmwgPSAnaHR0cDovL2xvY2FsaG9zdDonICsgb3B0aW9ucy5wb3J0XG4gICAgICAgICAgcmVxdWlyZSgnLi9wbHVnaW5VdGlsJykubG9nKHZhcnMuYXBwICsgYE9wZW5pbmcgYnJvd3NlciBhdCAke3VybH1gKVxuICAgICAgICAgIHZhcnMuYnJvd3NlckNvdW50KytcbiAgICAgICAgICBjb25zdCBvcG4gPSByZXF1aXJlKCdvcG4nKVxuICAgICAgICAgIG9wbih1cmwpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgY2F0Y2ggKGUpIHtcbiAgICAgIGNvbnNvbGUubG9nKGUpXG4gICAgICAvL2NvbXBpbGF0aW9uLmVycm9ycy5wdXNoKCdzaG93IGJyb3dzZXIgd2luZG93IC0gZXh0LWRvbmU6ICcgKyBlKVxuICAgIH1cbiAgfVxuICBjYXRjaChlKSB7XG4gICAgcmVxdWlyZSgnLi9wbHVnaW5VdGlsJykubG9ndihvcHRpb25zLGUpXG4gIH1cbn1cblxuLy8qKioqKioqKioqXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZXhlY3V0ZUFzeW5jIChhcHAsIGNvbW1hbmQsIHBhcm1zLCBvcHRzLCBjb21waWxhdGlvbiwgb3B0aW9ucykge1xuICB0cnkge1xuICAgIC8vY29uc3QgREVGQVVMVF9TVUJTVFJTID0gWydbSU5GXSBMb2FkaW5nJywgJ1tJTkZdIFByb2Nlc3NpbmcnLCAnW0xPR10gRmFzaGlvbiBidWlsZCBjb21wbGV0ZScsICdbRVJSXScsICdbV1JOXScsIFwiW0lORl0gU2VydmVyXCIsIFwiW0lORl0gV3JpdGluZ1wiLCBcIltJTkZdIExvYWRpbmcgQnVpbGRcIiwgXCJbSU5GXSBXYWl0aW5nXCIsIFwiW0xPR10gRmFzaGlvbiB3YWl0aW5nXCJdO1xuICAgIGNvbnN0IERFRkFVTFRfU1VCU1RSUyA9IFtcIltJTkZdIHhTZXJ2ZXJcIiwgJ1tJTkZdIExvYWRpbmcnLCAnW0lORl0gQXBwZW5kJywgJ1tJTkZdIFByb2Nlc3NpbmcnLCAnW0lORl0gUHJvY2Vzc2luZyBCdWlsZCcsICdbTE9HXSBGYXNoaW9uIGJ1aWxkIGNvbXBsZXRlJywgJ1tFUlJdJywgJ1tXUk5dJywgXCJbSU5GXSBXcml0aW5nXCIsIFwiW0lORl0gTG9hZGluZyBCdWlsZFwiLCBcIltJTkZdIFdhaXRpbmdcIiwgXCJbTE9HXSBGYXNoaW9uIHdhaXRpbmdcIl07XG4gICAgdmFyIHN1YnN0cmluZ3MgPSBERUZBVUxUX1NVQlNUUlMgXG4gICAgdmFyIGNoYWxrID0gcmVxdWlyZSgnY2hhbGsnKVxuICAgIGNvbnN0IGNyb3NzU3Bhd24gPSByZXF1aXJlKCdjcm9zcy1zcGF3bicpXG4gICAgY29uc3QgbG9nID0gcmVxdWlyZSgnLi9wbHVnaW5VdGlsJykubG9nXG4gICAgbG9ndihvcHRpb25zLCAnRlVOQ1RJT04gZXhlY3V0ZUFzeW5jJylcbiAgICBhd2FpdCBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBsb2d2KG9wdGlvbnMsYGNvbW1hbmQgLSAke2NvbW1hbmR9YClcbiAgICAgIGxvZ3Yob3B0aW9ucywgYHBhcm1zIC0gJHtwYXJtc31gKVxuICAgICAgbG9ndihvcHRpb25zLCBgb3B0cyAtICR7SlNPTi5zdHJpbmdpZnkob3B0cyl9YClcbiAgICAgIGxldCBjaGlsZCA9IGNyb3NzU3Bhd24oY29tbWFuZCwgcGFybXMsIG9wdHMpXG4gICAgICBjaGlsZC5vbignY2xvc2UnLCAoY29kZSwgc2lnbmFsKSA9PiB7XG4gICAgICAgIGxvZ3Yob3B0aW9ucywgYG9uIGNsb3NlOiBgICsgY29kZSkgXG4gICAgICAgIGlmKGNvZGUgPT09IDApIHsgcmVzb2x2ZSgwKSB9XG4gICAgICAgIGVsc2UgeyBjb21waWxhdGlvbi5lcnJvcnMucHVzaCggbmV3IEVycm9yKGNvZGUpICk7IHJlc29sdmUoMCkgfVxuICAgICAgfSlcbiAgICAgIGNoaWxkLm9uKCdlcnJvcicsIChlcnJvcikgPT4geyBcbiAgICAgICAgbG9ndihvcHRpb25zLCBgb24gZXJyb3JgKSBcbiAgICAgICAgY29tcGlsYXRpb24uZXJyb3JzLnB1c2goZXJyb3IpXG4gICAgICAgIHJlc29sdmUoMClcbiAgICAgIH0pXG4gICAgICBjaGlsZC5zdGRvdXQub24oJ2RhdGEnLCAoZGF0YSkgPT4ge1xuICAgICAgICB2YXIgc3RyID0gZGF0YS50b1N0cmluZygpLnJlcGxhY2UoL1xccj9cXG58XFxyL2csIFwiIFwiKS50cmltKClcbiAgICAgICAgbG9ndihvcHRpb25zLCBgJHtzdHJ9YClcbiAgICAgICAgaWYgKGRhdGEgJiYgZGF0YS50b1N0cmluZygpLm1hdGNoKC93YWl0aW5nIGZvciBjaGFuZ2VzXFwuXFwuXFwuLykpIHtcbiAgICAgICAgICByZXNvbHZlKDApXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgaWYgKHN1YnN0cmluZ3Muc29tZShmdW5jdGlvbih2KSB7IHJldHVybiBkYXRhLmluZGV4T2YodikgPj0gMDsgfSkpIHsgXG4gICAgICAgICAgICBzdHIgPSBzdHIucmVwbGFjZShcIltJTkZdXCIsIFwiXCIpXG4gICAgICAgICAgICBzdHIgPSBzdHIucmVwbGFjZShcIltMT0ddXCIsIFwiXCIpXG4gICAgICAgICAgICBzdHIgPSBzdHIucmVwbGFjZShwcm9jZXNzLmN3ZCgpLCAnJykudHJpbSgpXG4gICAgICAgICAgICBpZiAoc3RyLmluY2x1ZGVzKFwiW0VSUl1cIikpIHtcbiAgICAgICAgICAgICAgY29tcGlsYXRpb24uZXJyb3JzLnB1c2goYXBwICsgc3RyLnJlcGxhY2UoL15cXFtFUlJcXF0gL2dpLCAnJykpO1xuICAgICAgICAgICAgICBzdHIgPSBzdHIucmVwbGFjZShcIltFUlJdXCIsIGAke2NoYWxrLnJlZChcIltFUlJdXCIpfWApXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsb2coYCR7YXBwfSR7c3RyfWApIFxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIGNoaWxkLnN0ZGVyci5vbignZGF0YScsIChkYXRhKSA9PiB7XG4gICAgICAgIGxvZ3Yob3B0aW9ucywgYGVycm9yIG9uIGNsb3NlOiBgICsgZGF0YSkgXG4gICAgICAgIHZhciBzdHIgPSBkYXRhLnRvU3RyaW5nKCkucmVwbGFjZSgvXFxyP1xcbnxcXHIvZywgXCIgXCIpLnRyaW0oKVxuICAgICAgICB2YXIgc3RySmF2YU9wdHMgPSBcIlBpY2tlZCB1cCBfSkFWQV9PUFRJT05TXCI7XG4gICAgICAgIHZhciBpbmNsdWRlcyA9IHN0ci5pbmNsdWRlcyhzdHJKYXZhT3B0cylcbiAgICAgICAgaWYgKCFpbmNsdWRlcykge1xuICAgICAgICAgIGNvbnNvbGUubG9nKGAke2FwcH0gJHtjaGFsay5yZWQoXCJbRVJSXVwiKX0gJHtzdHJ9YClcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9KVxuICB9XG4gIGNhdGNoKGUpIHtcbiAgICByZXF1aXJlKCcuL3BsdWdpblV0aWwnKS5sb2d2KG9wdGlvbnMsZSlcbiAgICBjb21waWxhdGlvbi5lcnJvcnMucHVzaCgnZXhlY3V0ZUFzeW5jOiAnICsgZSlcbiAgICBjYWxsYmFjaygpXG4gIH0gXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBsb2cocykge1xuICByZXF1aXJlKCdyZWFkbGluZScpLmN1cnNvclRvKHByb2Nlc3Muc3Rkb3V0LCAwKVxuICB0cnkge1xuICAgIHByb2Nlc3Muc3Rkb3V0LmNsZWFyTGluZSgpXG4gIH1cbiAgY2F0Y2goZSkge31cbiAgcHJvY2Vzcy5zdGRvdXQud3JpdGUocylcbiAgcHJvY2Vzcy5zdGRvdXQud3JpdGUoJ1xcbicpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBsb2d2KG9wdGlvbnMsIHMpIHtcbiAgaWYgKG9wdGlvbnMudmVyYm9zZSA9PSAneWVzJykge1xuICAgIHJlcXVpcmUoJ3JlYWRsaW5lJykuY3Vyc29yVG8ocHJvY2Vzcy5zdGRvdXQsIDApXG4gICAgdHJ5IHtcbiAgICAgIHByb2Nlc3Muc3Rkb3V0LmNsZWFyTGluZSgpXG4gICAgfVxuICAgIGNhdGNoKGUpIHt9XG4gICAgcHJvY2Vzcy5zdGRvdXQud3JpdGUoYC12ZXJib3NlOiAke3N9YClcbiAgICBwcm9jZXNzLnN0ZG91dC53cml0ZSgnXFxuJylcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gX2dldEFwcCgpIHtcbiAgdmFyIGNoYWxrID0gcmVxdWlyZSgnY2hhbGsnKVxuICB2YXIgcHJlZml4ID0gYGBcbiAgY29uc3QgcGxhdGZvcm0gPSByZXF1aXJlKCdvcycpLnBsYXRmb3JtKClcbiAgaWYgKHBsYXRmb3JtID09ICdkYXJ3aW4nKSB7IHByZWZpeCA9IGDihLkg772iZXh0772jOmAgfVxuICBlbHNlIHsgcHJlZml4ID0gYGkgW2V4dF06YCB9XG4gIHJldHVybiBgJHtjaGFsay5ncmVlbihwcmVmaXgpfSBgXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfZ2V0VmVyc2lvbnMoYXBwLCBwbHVnaW5OYW1lLCBmcmFtZXdvcmtOYW1lKSB7XG4gIGNvbnN0IHBhdGggPSByZXF1aXJlKCdwYXRoJylcbiAgY29uc3QgZnMgPSByZXF1aXJlKCdmcycpXG5cbiAgdmFyIHYgPSB7fVxuICB2YXIgcGx1Z2luUGF0aCA9IHBhdGgucmVzb2x2ZShwcm9jZXNzLmN3ZCgpLCdub2RlX21vZHVsZXMvQHNlbmNoYScsIHBsdWdpbk5hbWUpXG4gIHZhciBwbHVnaW5Qa2cgPSAoZnMuZXhpc3RzU3luYyhwbHVnaW5QYXRoKycvcGFja2FnZS5qc29uJykgJiYgSlNPTi5wYXJzZShmcy5yZWFkRmlsZVN5bmMocGx1Z2luUGF0aCsnL3BhY2thZ2UuanNvbicsICd1dGYtOCcpKSB8fCB7fSk7XG4gIHYucGx1Z2luVmVyc2lvbiA9IHBsdWdpblBrZy52ZXJzaW9uXG4gIHYuX3Jlc29sdmVkID0gcGx1Z2luUGtnLl9yZXNvbHZlZFxuICBpZiAodi5fcmVzb2x2ZWQgPT0gdW5kZWZpbmVkKSB7XG4gICAgdi5lZGl0aW9uID0gYENvbW1lcmNpYWxgXG4gIH1cbiAgZWxzZSB7XG4gICAgaWYgKC0xID09IHYuX3Jlc29sdmVkLmluZGV4T2YoJ2NvbW11bml0eScpKSB7XG4gICAgICB2LmVkaXRpb24gPSBgQ29tbWVyY2lhbGBcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICB2LmVkaXRpb24gPSBgQ29tbXVuaXR5YFxuICAgIH1cbiAgfVxuXG4gIHZhciB3ZWJwYWNrUGF0aCA9IHBhdGgucmVzb2x2ZShwcm9jZXNzLmN3ZCgpLCdub2RlX21vZHVsZXMvd2VicGFjaycpXG4gIHZhciB3ZWJwYWNrUGtnID0gKGZzLmV4aXN0c1N5bmMod2VicGFja1BhdGgrJy9wYWNrYWdlLmpzb24nKSAmJiBKU09OLnBhcnNlKGZzLnJlYWRGaWxlU3luYyh3ZWJwYWNrUGF0aCsnL3BhY2thZ2UuanNvbicsICd1dGYtOCcpKSB8fCB7fSk7XG4gIHYud2VicGFja1ZlcnNpb24gPSB3ZWJwYWNrUGtnLnZlcnNpb25cblxuICB2YXIgZXh0UGF0aCA9IHBhdGgucmVzb2x2ZShwcm9jZXNzLmN3ZCgpLCdub2RlX21vZHVsZXMvQHNlbmNoYS9leHQnKVxuICB2YXIgZXh0UGtnID0gKGZzLmV4aXN0c1N5bmMoZXh0UGF0aCsnL3BhY2thZ2UuanNvbicpICYmIEpTT04ucGFyc2UoZnMucmVhZEZpbGVTeW5jKGV4dFBhdGgrJy9wYWNrYWdlLmpzb24nLCAndXRmLTgnKSkgfHwge30pO1xuICB2LmV4dFZlcnNpb24gPSBleHRQa2cuc2VuY2hhLnZlcnNpb25cblxuICB2YXIgY21kUGF0aCA9IHBhdGgucmVzb2x2ZShwcm9jZXNzLmN3ZCgpLGBub2RlX21vZHVsZXMvQHNlbmNoYS9jbWRgKVxuICB2YXIgY21kUGtnID0gKGZzLmV4aXN0c1N5bmMoY21kUGF0aCsnL3BhY2thZ2UuanNvbicpICYmIEpTT04ucGFyc2UoZnMucmVhZEZpbGVTeW5jKGNtZFBhdGgrJy9wYWNrYWdlLmpzb24nLCAndXRmLTgnKSkgfHwge30pO1xuICB2LmNtZFZlcnNpb24gPSBjbWRQa2cudmVyc2lvbl9mdWxsXG5cbiAgaWYgKHYuY21kVmVyc2lvbiA9PSB1bmRlZmluZWQpIHtcbiAgICB2YXIgY21kUGF0aCA9IHBhdGgucmVzb2x2ZShwcm9jZXNzLmN3ZCgpLGBub2RlX21vZHVsZXMvQHNlbmNoYS8ke3BsdWdpbk5hbWV9L25vZGVfbW9kdWxlcy9Ac2VuY2hhL2NtZGApXG4gICAgdmFyIGNtZFBrZyA9IChmcy5leGlzdHNTeW5jKGNtZFBhdGgrJy9wYWNrYWdlLmpzb24nKSAmJiBKU09OLnBhcnNlKGZzLnJlYWRGaWxlU3luYyhjbWRQYXRoKycvcGFja2FnZS5qc29uJywgJ3V0Zi04JykpIHx8IHt9KTtcbiAgICB2LmNtZFZlcnNpb24gPSBjbWRQa2cudmVyc2lvbl9mdWxsXG4gIH1cblxuICB2YXIgZnJhbWV3b3JrSW5mbyA9ICcnXG4gICBpZiAoZnJhbWV3b3JrTmFtZSAhPSB1bmRlZmluZWQgJiYgZnJhbWV3b3JrTmFtZSAhPSAnZXh0anMnKSB7XG4gICAgdmFyIGZyYW1ld29ya1BhdGggPSAnJ1xuICAgIGlmIChmcmFtZXdvcmtOYW1lID09ICdyZWFjdCcpIHtcbiAgICAgIGZyYW1ld29ya1BhdGggPSBwYXRoLnJlc29sdmUocHJvY2Vzcy5jd2QoKSwnbm9kZV9tb2R1bGVzL3JlYWN0JylcbiAgICB9XG4gICAgaWYgKGZyYW1ld29ya05hbWUgPT0gJ2FuZ3VsYXInKSB7XG4gICAgICBmcmFtZXdvcmtQYXRoID0gcGF0aC5yZXNvbHZlKHByb2Nlc3MuY3dkKCksJ25vZGVfbW9kdWxlcy9AYW5ndWxhci9jb3JlJylcbiAgICB9XG4gICAgdmFyIGZyYW1ld29ya1BrZyA9IChmcy5leGlzdHNTeW5jKGZyYW1ld29ya1BhdGgrJy9wYWNrYWdlLmpzb24nKSAmJiBKU09OLnBhcnNlKGZzLnJlYWRGaWxlU3luYyhmcmFtZXdvcmtQYXRoKycvcGFja2FnZS5qc29uJywgJ3V0Zi04JykpIHx8IHt9KTtcbiAgICB2LmZyYW1ld29ya1ZlcnNpb24gPSBmcmFtZXdvcmtQa2cudmVyc2lvblxuICAgIGZyYW1ld29ya0luZm8gPSAnLCAnICsgZnJhbWV3b3JrTmFtZSArICcgdicgKyB2LmZyYW1ld29ya1ZlcnNpb25cbiAgfVxuICByZXR1cm4gYXBwICsgJ2V4dC13ZWJwYWNrLXBsdWdpbiB2JyArIHYucGx1Z2luVmVyc2lvbiArICcsIEV4dCBKUyB2JyArIHYuZXh0VmVyc2lvbiArICcgJyArIHYuZWRpdGlvbiArICcgRWRpdGlvbiwgU2VuY2hhIENtZCB2JyArIHYuY21kVmVyc2lvbiArICcsIHdlYnBhY2sgdicgKyB2LndlYnBhY2tWZXJzaW9uICsgZnJhbWV3b3JrSW5mb1xuIH0iXX0=