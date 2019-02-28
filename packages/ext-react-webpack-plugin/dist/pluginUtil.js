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

    if (options.framework == 'angular' && options.treeshake == false || options.framework == 'react') {
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
            if (options.framework == 'angular' && options.treeshake == false) {
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
      var framework = vars.framework; //because of a problem with colorpicker

      if (fs.existsSync(path.join(process.cwd(), `ext-${framework}/ux/`))) {
        var fromPath = path.join(process.cwd(), `ext-${framework}/ux/`);
        var toPath = path.join(output, 'ux');
        fsx.copySync(fromPath, toPath);
        log(app + 'Copying (ux) ' + fromPath.replace(process.cwd(), '') + ' to: ' + toPath.replace(process.cwd(), ''));
      }

      if (fs.existsSync(path.join(process.cwd(), `ext-${framework}/packages/`))) {
        var fromPath = path.join(process.cwd(), `ext-${framework}/packages/`);
        var toPath = path.join(output, 'packages');
        fsx.copySync(fromPath, toPath);
        log(app + 'Copying ' + fromPath.replace(process.cwd(), '') + ' to: ' + toPath.replace(process.cwd(), ''));
      }

      if (fs.existsSync(path.join(process.cwd(), `ext-${framework}/overrides/`))) {
        var fromPath = path.join(process.cwd(), `ext-${framework}/overrides/`);
        var toPath = path.join(output, 'overrides');
        fsx.copySync(fromPath, toPath);
        log(app + 'Copying ' + fromPath.replace(process.cwd(), '') + ' to: ' + toPath.replace(process.cwd(), ''));
      }

      if (fs.existsSync(path.join(process.cwd(), 'resources/'))) {
        var fromResources = path.join(process.cwd(), 'resources/');
        var toResources = path.join(output, '../resources');
        fsx.copySync(fromResources, toResources);
        log(app + 'Copying ' + fromResources.replace(process.cwd(), '') + ' to: ' + toResources.replace(process.cwd(), ''));
      }
    }

    vars.firstTime = false;
    var js = '';

    if (vars.production) {
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
      vars.rebuild = true;
      log(app + 'Ext rebuild NOT needed');
      log(app + 'but done');
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

              if (data && data.toString().match(/Fashion waiting for changes\.\.\./)) {
                const fs = require('fs');

                var filename = process.cwd() + '/src/index.js';
                var data = fs.readFileSync(filename);
                fs.writeFileSync(filename, data + ' ', 'utf8');
                logv(options, `touching ${filename}`);
                resolve(0);
              } // if (data && data.toString().match(/waiting for changes\.\.\./)) {
              //   resolve(0)
              // }
              else {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9wbHVnaW5VdGlsLmpzIl0sIm5hbWVzIjpbIl9jb25zdHJ1Y3RvciIsIm9wdGlvbnMiLCJmcyIsInJlcXVpcmUiLCJ0aGlzVmFycyIsInRoaXNPcHRpb25zIiwicGx1Z2luIiwiZnJhbWV3b3JrIiwidW5kZWZpbmVkIiwicGx1Z2luRXJyb3JzIiwicHVzaCIsInZhcnMiLCJ2YWxpZGF0ZU9wdGlvbnMiLCJnZXRWYWxpZGF0ZU9wdGlvbnMiLCJnZXREZWZhdWx0VmFycyIsInBsdWdpbk5hbWUiLCJhcHAiLCJfZ2V0QXBwIiwibG9ndiIsInJjIiwiZXhpc3RzU3luYyIsIkpTT04iLCJwYXJzZSIsInJlYWRGaWxlU3luYyIsImdldERlZmF1bHRPcHRpb25zIiwic3RyaW5naWZ5IiwiZW52aXJvbm1lbnQiLCJwcm9kdWN0aW9uIiwibG9nIiwiX2dldFZlcnNpb25zIiwidHJlZXNoYWtlIiwiX3RvUHJvZCIsIl9jb21waWxhdGlvbiIsImNvbXBpbGVyIiwiY29tcGlsYXRpb24iLCJleHRDb21wb25lbnRzIiwiX2dldEFsbENvbXBvbmVudHMiLCJob29rcyIsInN1Y2NlZWRNb2R1bGUiLCJ0YXAiLCJtb2R1bGUiLCJyZXNvdXJjZSIsIm1hdGNoIiwiX3NvdXJjZSIsIl92YWx1ZSIsInRvTG93ZXJDYXNlIiwiaW5jbHVkZXMiLCJkZXBzIiwiZXh0cmFjdEZyb21Tb3VyY2UiLCJmaW5pc2hNb2R1bGVzIiwibW9kdWxlcyIsIl93cml0ZUZpbGVzVG9Qcm9kRm9sZGVyIiwiaHRtbFdlYnBhY2tQbHVnaW5CZWZvcmVIdG1sR2VuZXJhdGlvbiIsImRhdGEiLCJwYXRoIiwib3V0cHV0UGF0aCIsImRldlNlcnZlciIsImpvaW4iLCJjb250ZW50QmFzZSIsInJlcGxhY2UiLCJwcm9jZXNzIiwiY3dkIiwidHJpbSIsImpzUGF0aCIsImV4dFBhdGgiLCJjc3NQYXRoIiwiYXNzZXRzIiwianMiLCJ1bnNoaWZ0IiwiY3NzIiwiZSIsImVycm9ycyIsIl9hZnRlckNvbXBpbGUiLCJlbWl0IiwiY2FsbGJhY2siLCJfYnVpbGRFeHRCdW5kbGUiLCJfcHJlcGFyZUZvckJ1aWxkIiwiY29tbWFuZCIsIndhdGNoIiwicmVidWlsZCIsInBhcm1zIiwicHJvZmlsZSIsIndhdGNoU3RhcnRlZCIsIm91dHB1dCIsInJpbXJhZiIsIm1rZGlycCIsImZzeCIsInBhY2thZ2VzIiwidG9vbGtpdCIsInRoZW1lIiwiZmlyc3RUaW1lIiwic3luYyIsImJ1aWxkWE1MIiwiY3JlYXRlQXBwSnNvbiIsImNyZWF0ZVdvcmtzcGFjZUpzb24iLCJjcmVhdGVKU0RPTUVudmlyb25tZW50Iiwid3JpdGVGaWxlU3luYyIsImZyb21QYXRoIiwidG9QYXRoIiwiY29weVN5bmMiLCJmcm9tUmVzb3VyY2VzIiwidG9SZXNvdXJjZXMiLCJtYW5pZmVzdCIsImJ1bmRsZURpciIsInNlbmNoYSIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0Iiwib25CdWlsZERvbmUiLCJvcHRzIiwic2lsZW50Iiwic3RkaW8iLCJlbmNvZGluZyIsImV4ZWN1dGVBc3luYyIsInRoZW4iLCJyZWFzb24iLCJjb25zb2xlIiwiX2RvbmUiLCJfdG9EZXYiLCJicm93c2VyIiwiYnJvd3NlckNvdW50IiwidXJsIiwicG9ydCIsIm9wbiIsIkRFRkFVTFRfU1VCU1RSUyIsInN1YnN0cmluZ3MiLCJjaGFsayIsImNyb3NzU3Bhd24iLCJjaGlsZCIsIm9uIiwiY29kZSIsInNpZ25hbCIsIkVycm9yIiwiZXJyb3IiLCJzdGRvdXQiLCJzdHIiLCJ0b1N0cmluZyIsImZpbGVuYW1lIiwic29tZSIsInYiLCJpbmRleE9mIiwicmVkIiwic3RkZXJyIiwic3RySmF2YU9wdHMiLCJzIiwiY3Vyc29yVG8iLCJjbGVhckxpbmUiLCJ3cml0ZSIsInZlcmJvc2UiLCJwcmVmaXgiLCJwbGF0Zm9ybSIsImdyZWVuIiwiZnJhbWV3b3JrTmFtZSIsInBsdWdpblBhdGgiLCJwbHVnaW5Qa2ciLCJwbHVnaW5WZXJzaW9uIiwidmVyc2lvbiIsIl9yZXNvbHZlZCIsImVkaXRpb24iLCJ3ZWJwYWNrUGF0aCIsIndlYnBhY2tQa2ciLCJ3ZWJwYWNrVmVyc2lvbiIsImV4dFBrZyIsImV4dFZlcnNpb24iLCJjbWRQYXRoIiwiY21kUGtnIiwiY21kVmVyc2lvbiIsInZlcnNpb25fZnVsbCIsImZyYW1ld29ya0luZm8iLCJmcmFtZXdvcmtQYXRoIiwiZnJhbWV3b3JrUGtnIiwiZnJhbWV3b3JrVmVyc2lvbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNPLFNBQVNBLFlBQVQsQ0FBc0JDLE9BQXRCLEVBQStCO0FBQ3BDLFFBQU1DLEVBQUUsR0FBR0MsT0FBTyxDQUFDLElBQUQsQ0FBbEI7O0FBRUEsTUFBSUMsUUFBUSxHQUFHLEVBQWY7QUFDQSxNQUFJQyxXQUFXLEdBQUcsRUFBbEI7QUFDQSxNQUFJQyxNQUFNLEdBQUcsRUFBYjs7QUFFQSxNQUFJTCxPQUFPLENBQUNNLFNBQVIsSUFBcUJDLFNBQXpCLEVBQW9DO0FBQ2xDSixJQUFBQSxRQUFRLENBQUNLLFlBQVQsR0FBd0IsRUFBeEI7QUFDQUwsSUFBQUEsUUFBUSxDQUFDSyxZQUFULENBQXNCQyxJQUF0QixDQUEyQiwwR0FBM0I7QUFDQUosSUFBQUEsTUFBTSxDQUFDSyxJQUFQLEdBQWNQLFFBQWQ7QUFDQSxXQUFPRSxNQUFQO0FBQ0Q7O0FBRUQsUUFBTU0sZUFBZSxHQUFHVCxPQUFPLENBQUMsY0FBRCxDQUEvQjs7QUFDQVMsRUFBQUEsZUFBZSxDQUFDVCxPQUFPLENBQUUsS0FBSUYsT0FBTyxDQUFDTSxTQUFVLE1BQXhCLENBQVAsQ0FBc0NNLGtCQUF0QyxFQUFELEVBQTZEWixPQUE3RCxFQUFzRSxFQUF0RSxDQUFmO0FBQ0FHLEVBQUFBLFFBQVEsR0FBR0QsT0FBTyxDQUFFLEtBQUlGLE9BQU8sQ0FBQ00sU0FBVSxNQUF4QixDQUFQLENBQXNDTyxjQUF0QyxFQUFYO0FBQ0FWLEVBQUFBLFFBQVEsQ0FBQ0csU0FBVCxHQUFxQk4sT0FBTyxDQUFDTSxTQUE3Qjs7QUFDQSxVQUFP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QUNEOztBQUNELFFBQUk2RyxZQUFZLEdBQUl4SyxFQUFFLENBQUNrQixVQUFILENBQWNxSixhQUFhLEdBQUMsZUFBNUIsS0FBZ0RwSixJQUFJLENBQUNDLEtBQUwsQ0FBV3BCLEVBQUUsQ0FBQ3FCLFlBQUgsQ0FBZ0JrSixhQUFhLEdBQUMsZUFBOUIsRUFBK0MsT0FBL0MsQ0FBWCxDQUFoRCxJQUF1SCxFQUEzSTtBQUNBOUIsSUFBQUEsQ0FBQyxDQUFDZ0MsZ0JBQUYsR0FBcUJELFlBQVksQ0FBQ2QsT0FBbEM7QUFDQVksSUFBQUEsYUFBYSxHQUFHLE9BQU9oQixhQUFQLEdBQXVCLElBQXZCLEdBQThCYixDQUFDLENBQUNnQyxnQkFBaEQ7QUFDRDs7QUFDRCxTQUFPM0osR0FBRyxHQUFHLHNCQUFOLEdBQStCMkgsQ0FBQyxDQUFDZ0IsYUFBakMsR0FBaUQsWUFBakQsR0FBZ0VoQixDQUFDLENBQUN3QixVQUFsRSxHQUErRSxHQUEvRSxHQUFxRnhCLENBQUMsQ0FBQ21CLE9BQXZGLEdBQWlHLHdCQUFqRyxHQUE0SG5CLENBQUMsQ0FBQzJCLFVBQTlILEdBQTJJLGFBQTNJLEdBQTJKM0IsQ0FBQyxDQUFDc0IsY0FBN0osR0FBOEtPLGFBQXJMO0FBQ0EiLCJzb3VyY2VzQ29udGVudCI6WyIvLyoqKioqKioqKipcbmV4cG9ydCBmdW5jdGlvbiBfY29uc3RydWN0b3Iob3B0aW9ucykge1xuICBjb25zdCBmcyA9IHJlcXVpcmUoJ2ZzJylcbiBcbiAgdmFyIHRoaXNWYXJzID0ge31cbiAgdmFyIHRoaXNPcHRpb25zID0ge31cbiAgdmFyIHBsdWdpbiA9IHt9XG5cbiAgaWYgKG9wdGlvbnMuZnJhbWV3b3JrID09IHVuZGVmaW5lZCkge1xuICAgIHRoaXNWYXJzLnBsdWdpbkVycm9ycyA9IFtdXG4gICAgdGhpc1ZhcnMucGx1Z2luRXJyb3JzLnB1c2goJ3dlYnBhY2sgY29uZmlnOiBmcmFtZXdvcmsgcGFyYW1ldGVyIG9uIGV4dC13ZWJwYWNrLXBsdWdpbiBpcyBub3QgZGVmaW5lZCAtIHZhbHVlczogcmVhY3QsIGFuZ3VsYXIsIGV4dGpzJylcbiAgICBwbHVnaW4udmFycyA9IHRoaXNWYXJzXG4gICAgcmV0dXJuIHBsdWdpblxuICB9XG5cbiAgY29uc3QgdmFsaWRhdGVPcHRpb25zID0gcmVxdWlyZSgnc2NoZW1hLXV0aWxzJylcbiAgdmFsaWRhdGVPcHRpb25zKHJlcXVpcmUoYC4vJHtvcHRpb25zLmZyYW1ld29ya31VdGlsYCkuZ2V0VmFsaWRhdGVPcHRpb25zKCksIG9wdGlvbnMsICcnKVxuICB0aGlzVmFycyA9IHJlcXVpcmUoYC4vJHtvcHRpb25zLmZyYW1ld29ya31VdGlsYCkuZ2V0RGVmYXVsdFZhcnMoKVxuICB0aGlzVmFycy5mcmFtZXdvcmsgPSBvcHRpb25zLmZyYW1ld29ya1xuICBzd2l0Y2godGhpc1ZhcnMuZnJhbWV3b3JrKSB7XG4gICAgY2FzZSAnZXh0anMnOlxuICAgICAgdGhpc1ZhcnMucGx1Z2luTmFtZSA9ICdleHQtd2VicGFjay1wbHVnaW4nXG4gICAgICBicmVhaztcbiAgICBjYXNlICdyZWFjdCc6XG4gICAgICB0aGlzVmFycy5wbHVnaW5OYW1lID0gJ2V4dC1yZWFjdC13ZWJwYWNrLXBsdWdpbidcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ2FuZ3VsYXInOlxuICAgICAgdGhpc1ZhcnMucGx1Z2luTmFtZSA9ICdleHQtYW5ndWxhci13ZWJwYWNrLXBsdWdpbidcbiAgICAgIGJyZWFrO1xuICAgIGRlZmF1bHQ6XG4gICAgICB0aGlzVmFycy5wbHVnaW5OYW1lID0gJ2V4dC13ZWJwYWNrLXBsdWdpbidcbiAgfVxuXG4gIHRoaXNWYXJzLmFwcCA9IHJlcXVpcmUoJy4vcGx1Z2luVXRpbCcpLl9nZXRBcHAoKVxuICBsb2d2KG9wdGlvbnMsIGBwbHVnaW5OYW1lIC0gJHt0aGlzVmFycy5wbHVnaW5OYW1lfWApXG4gIGxvZ3Yob3B0aW9ucywgYHRoaXNWYXJzLmFwcCAtICR7dGhpc1ZhcnMuYXBwfWApXG5cbiAgY29uc3QgcmMgPSAoZnMuZXhpc3RzU3luYyhgLmV4dC0ke3RoaXNWYXJzLmZyYW1ld29ya31yY2ApICYmIEpTT04ucGFyc2UoZnMucmVhZEZpbGVTeW5jKGAuZXh0LSR7dGhpc1ZhcnMuZnJhbWV3b3JrfXJjYCwgJ3V0Zi04JykpIHx8IHt9KVxuICB0aGlzT3B0aW9ucyA9IHsgLi4ucmVxdWlyZShgLi8ke3RoaXNWYXJzLmZyYW1ld29ya31VdGlsYCkuZ2V0RGVmYXVsdE9wdGlvbnMoKSwgLi4ub3B0aW9ucywgLi4ucmMgfVxuICBsb2d2KG9wdGlvbnMsIGB0aGlzT3B0aW9ucyAtICR7SlNPTi5zdHJpbmdpZnkodGhpc09wdGlvbnMpfWApXG5cbiAgaWYgKHRoaXNPcHRpb25zLmVudmlyb25tZW50ID09ICdwcm9kdWN0aW9uJykgXG4gICAge3RoaXNWYXJzLnByb2R1Y3Rpb24gPSB0cnVlfVxuICBlbHNlIFxuICAgIHt0aGlzVmFycy5wcm9kdWN0aW9uID0gZmFsc2V9XG4gIGxvZ3Yob3B0aW9ucywgYHRoaXNWYXJzIC0gJHtKU09OLnN0cmluZ2lmeSh0aGlzVmFycyl9YClcblxuICBsb2cocmVxdWlyZSgnLi9wbHVnaW5VdGlsJykuX2dldFZlcnNpb25zKHRoaXNWYXJzLmFwcCwgdGhpc1ZhcnMucGx1Z2luTmFtZSwgdGhpc1ZhcnMuZnJhbWV3b3JrKSlcbiAgbG9nKHRoaXNWYXJzLmFwcCArICdCdWlsZGluZyBmb3IgJyArIHRoaXNPcHRpb25zLmVudmlyb25tZW50KVxuICBsb2codGhpc1ZhcnMuYXBwICsgJ1RyZWVzaGFrZSBpcyAnICsgdGhpc09wdGlvbnMudHJlZXNoYWtlKVxuXG4gIGlmICh0aGlzVmFycy5wcm9kdWN0aW9uID09IHRydWUgJiYgdGhpc09wdGlvbnMudHJlZXNoYWtlID09IHRydWUgJiYgb3B0aW9ucy5mcmFtZXdvcmsgPT0gJ2FuZ3VsYXInKSB7XG4gICAgcmVxdWlyZShgLi9hbmd1bGFyVXRpbGApLl90b1Byb2QodGhpc1ZhcnMsIHRoaXNPcHRpb25zKVxuICB9XG5cbiAgcGx1Z2luLnZhcnMgPSB0aGlzVmFyc1xuICBwbHVnaW4ub3B0aW9ucyA9IHRoaXNPcHRpb25zXG4gIHJlcXVpcmUoJy4vcGx1Z2luVXRpbCcpLmxvZ3Yob3B0aW9ucywgJ0ZVTkNUSU9OIGNvbnN0cnVjdG9yIChlbmQpJylcbiAgcmV0dXJuIHBsdWdpblxufVxuXG4vLyoqKioqKioqKipcbmV4cG9ydCBmdW5jdGlvbiBfY29tcGlsYXRpb24oY29tcGlsZXIsIGNvbXBpbGF0aW9uLCB2YXJzLCBvcHRpb25zKSB7XG4gIHRyeSB7XG4gICAgcmVxdWlyZSgnLi9wbHVnaW5VdGlsJykubG9ndihvcHRpb25zLCAnRlVOQ1RJT04gX2NvbXBpbGF0aW9uJylcblxuICAgIHZhciBleHRDb21wb25lbnRzID0gW11cblxuICAgIGlmICh2YXJzLnByb2R1Y3Rpb24pIHtcbiAgICAgIGlmIChvcHRpb25zLmZyYW1ld29yayA9PSAnYW5ndWxhcicgJiYgb3B0aW9ucy50cmVlc2hha2UpIHtcbiAgICAgICAgZXh0Q29tcG9uZW50cyA9IHJlcXVpcmUoJy4vYW5ndWxhclV0aWwnKS5fZ2V0QWxsQ29tcG9uZW50cyh2YXJzLCBvcHRpb25zKVxuICAgICAgfVxuXG4gICAgICBjb21waWxhdGlvbi5ob29rcy5zdWNjZWVkTW9kdWxlLnRhcChgZXh0LXN1Y2NlZWQtbW9kdWxlYCwgbW9kdWxlID0+IHtcbiAgICAgICAgLy9yZXF1aXJlKCcuL3BsdWdpblV0aWwnKS5sb2d2KG9wdGlvbnMsICdIT09LIHN1Y2NlZWRNb2R1bGUnKVxuICAgICAgICBpZiAobW9kdWxlLnJlc291cmNlICYmICFtb2R1bGUucmVzb3VyY2UubWF0Y2goL25vZGVfbW9kdWxlcy8pKSB7XG4gICAgICAgICAgaWYobW9kdWxlLnJlc291cmNlLm1hdGNoKC9cXC5odG1sJC8pICE9IG51bGwpIHtcbiAgICAgICAgICAgIGlmKG1vZHVsZS5fc291cmNlLl92YWx1ZS50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKCdkb2N0eXBlIGh0bWwnKSA9PSBmYWxzZSkge1xuICAgICAgICAgICAgICB2YXJzLmRlcHMgPSBbLi4uKHZhcnMuZGVwcyB8fCBbXSksIC4uLnJlcXVpcmUoYC4vJHt2YXJzLmZyYW1ld29ya31VdGlsYCkuZXh0cmFjdEZyb21Tb3VyY2UobW9kdWxlLCBvcHRpb25zLCBjb21waWxhdGlvbiwgZXh0Q29tcG9uZW50cyldXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdmFycy5kZXBzID0gWy4uLih2YXJzLmRlcHMgfHwgW10pLCAuLi5yZXF1aXJlKGAuLyR7dmFycy5mcmFtZXdvcmt9VXRpbGApLmV4dHJhY3RGcm9tU291cmNlKG1vZHVsZSwgb3B0aW9ucywgY29tcGlsYXRpb24sIGV4dENvbXBvbmVudHMpXVxuXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIGlmIChleHRDb21wb25lbnRzLmxlbmd0aCAmJiBtb2R1bGUucmVzb3VyY2UgJiYgKG1vZHVsZS5yZXNvdXJjZS5tYXRjaCgvXFwuKGp8dClzeD8kLykgfHxcbiAgICAgICAgLy8gb3B0aW9ucy5mcmFtZXdvcmsgPT0gJ2FuZ3VsYXInICYmIG1vZHVsZS5yZXNvdXJjZS5tYXRjaCgvXFwuaHRtbCQvKSkgJiZcbiAgICAgICAgLy8gIW1vZHVsZS5yZXNvdXJjZS5tYXRjaCgvbm9kZV9tb2R1bGVzLykgJiYgIW1vZHVsZS5yZXNvdXJjZS5tYXRjaChgL2V4dC17JG9wdGlvbnMuZnJhbWV3b3JrfS9idWlsZC9gKSkge1xuICAgICAgICAvLyAgIHZhcnMuZGVwcyA9IFsuLi4odmFycy5kZXBzIHx8IFtdKSwgLi4ucmVxdWlyZShgLi8ke3ZhcnMuZnJhbWV3b3JrfVV0aWxgKS5leHRyYWN0RnJvbVNvdXJjZShtb2R1bGUsIG9wdGlvbnMsIGNvbXBpbGF0aW9uLCBleHRDb21wb25lbnRzKV1cbiAgICAgICAgLy8gfVxuICAgICAgfSlcblxuICAgICAgaWYgKG9wdGlvbnMuZnJhbWV3b3JrID09ICdhbmd1bGFyJyAmJiBvcHRpb25zLnRyZWVzaGFrZSA9PSB0cnVlKSB7XG4gICAgICAgIGNvbXBpbGF0aW9uLmhvb2tzLmZpbmlzaE1vZHVsZXMudGFwKGBleHQtZmluaXNoLW1vZHVsZXNgLCBtb2R1bGVzID0+IHtcbiAgICAgICAgICByZXF1aXJlKCcuL3BsdWdpblV0aWwnKS5sb2d2KG9wdGlvbnMsICdIT09LIGZpbmlzaE1vZHVsZXMnKVxuICAgICAgICAgIHJlcXVpcmUoJy4vYW5ndWxhclV0aWwnKS5fd3JpdGVGaWxlc1RvUHJvZEZvbGRlcih2YXJzLCBvcHRpb25zKVxuICAgICAgICB9KVxuICAgICAgfVxuXG4gICAgfVxuXG4gICAgaWYgKFxuICAgICAgKG9wdGlvbnMuZnJhbWV3b3JrID09ICdhbmd1bGFyJyAmJiBvcHRpb25zLnRyZWVzaGFrZSA9PSBmYWxzZSkgfHxcbiAgICAgIChvcHRpb25zLmZyYW1ld29yayA9PSAncmVhY3QnKVxuICAgICkge1xuICAgICAgICBjb21waWxhdGlvbi5ob29rcy5odG1sV2VicGFja1BsdWdpbkJlZm9yZUh0bWxHZW5lcmF0aW9uLnRhcChgZXh0LWh0bWwtZ2VuZXJhdGlvbmAsKGRhdGEpID0+IHtcbiAgICAgICAgbG9ndihvcHRpb25zLCdIT09LIGV4dC1odG1sLWdlbmVyYXRpb24nKVxuICAgICAgICBjb25zdCBwYXRoID0gcmVxdWlyZSgncGF0aCcpXG4gICAgICAgIHZhciBvdXRwdXRQYXRoID0gJydcbiAgICAgICAgaWYgKGNvbXBpbGVyLm9wdGlvbnMuZGV2U2VydmVyKSB7XG4gICAgICAgICAgaWYgKGNvbXBpbGVyLm91dHB1dFBhdGggPT09ICcvJykge1xuICAgICAgICAgICAgb3V0cHV0UGF0aCA9IHBhdGguam9pbihjb21waWxlci5vcHRpb25zLmRldlNlcnZlci5jb250ZW50QmFzZSwgb3V0cHV0UGF0aClcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpZiAoY29tcGlsZXIub3B0aW9ucy5kZXZTZXJ2ZXIuY29udGVudEJhc2UgPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgIG91dHB1dFBhdGggPSAnYnVpbGQnXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgb3V0cHV0UGF0aCA9ICcnXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIG91dHB1dFBhdGggPSAnYnVpbGQnXG4gICAgICAgIH1cbiAgICAgICAgb3V0cHV0UGF0aCA9IG91dHB1dFBhdGgucmVwbGFjZShwcm9jZXNzLmN3ZCgpLCAnJykudHJpbSgpXG4gICAgICAgIHZhciBqc1BhdGggPSBwYXRoLmpvaW4ob3V0cHV0UGF0aCwgdmFycy5leHRQYXRoLCAnZXh0LmpzJylcbiAgICAgICAgdmFyIGNzc1BhdGggPSBwYXRoLmpvaW4ob3V0cHV0UGF0aCwgdmFycy5leHRQYXRoLCAnZXh0LmNzcycpXG4gICAgICAgIGRhdGEuYXNzZXRzLmpzLnVuc2hpZnQoanNQYXRoKVxuICAgICAgICBkYXRhLmFzc2V0cy5jc3MudW5zaGlmdChjc3NQYXRoKVxuICAgICAgICBsb2codmFycy5hcHAgKyBgQWRkaW5nICR7anNQYXRofSBhbmQgJHtjc3NQYXRofSB0byBpbmRleC5odG1sYClcbiAgICAgIH0pXG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgbG9ndihvcHRpb25zLCdza2lwcGVkIEhPT0sgZXh0LWh0bWwtZ2VuZXJhdGlvbicpXG4gICAgfVxuICB9XG4gIGNhdGNoKGUpIHtcbiAgICByZXF1aXJlKCcuL3BsdWdpblV0aWwnKS5sb2d2KG9wdGlvbnMsZSlcbiAgICBjb21waWxhdGlvbi5lcnJvcnMucHVzaCgnX2NvbXBpbGF0aW9uOiAnICsgZSlcbiAgfVxufVxuXG4vLyoqKioqKioqKipcbmV4cG9ydCBmdW5jdGlvbiBfYWZ0ZXJDb21waWxlKGNvbXBpbGVyLCBjb21waWxhdGlvbiwgdmFycywgb3B0aW9ucykge1xuICByZXF1aXJlKCcuL3BsdWdpblV0aWwnKS5sb2d2KG9wdGlvbnMsICdGVU5DVElPTiBfYWZ0ZXJDb21waWxlJylcbn1cblxuLy8qKioqKioqKioqXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZW1pdChjb21waWxlciwgY29tcGlsYXRpb24sIHZhcnMsIG9wdGlvbnMsIGNhbGxiYWNrKSB7XG4gIHRyeSB7XG4gICAgY29uc3QgbG9nID0gcmVxdWlyZSgnLi9wbHVnaW5VdGlsJykubG9nXG4gICAgY29uc3QgbG9ndiA9IHJlcXVpcmUoJy4vcGx1Z2luVXRpbCcpLmxvZ3ZcbiAgICBsb2d2KG9wdGlvbnMsJ0ZVTkNUSU9OIGVtaXQnKVxuICAgIHZhciBhcHAgPSB2YXJzLmFwcFxuICAgIHZhciBmcmFtZXdvcmsgPSB2YXJzLmZyYW1ld29ya1xuICAgIGNvbnN0IHBhdGggPSByZXF1aXJlKCdwYXRoJylcbiAgICBjb25zdCBfYnVpbGRFeHRCdW5kbGUgPSByZXF1aXJlKCcuL3BsdWdpblV0aWwnKS5fYnVpbGRFeHRCdW5kbGVcbiAgICBsZXQgb3V0cHV0UGF0aCA9IHBhdGguam9pbihjb21waWxlci5vdXRwdXRQYXRoLHZhcnMuZXh0UGF0aClcbiAgICBpZiAoY29tcGlsZXIub3V0cHV0UGF0aCA9PT0gJy8nICYmIGNvbXBpbGVyLm9wdGlvbnMuZGV2U2VydmVyKSB7XG4gICAgICBvdXRwdXRQYXRoID0gcGF0aC5qb2luKGNvbXBpbGVyLm9wdGlvbnMuZGV2U2VydmVyLmNvbnRlbnRCYXNlLCBvdXRwdXRQYXRoKVxuICAgIH1cbiAgICBsb2d2KG9wdGlvbnMsJ291dHB1dFBhdGg6ICcgKyBvdXRwdXRQYXRoKVxuICAgIGxvZ3Yob3B0aW9ucywnZnJhbWV3b3JrOiAnICsgZnJhbWV3b3JrKVxuICAgIGlmIChvcHRpb25zLmVtaXQgPT0gdHJ1ZSkge1xuICAgICAgaWYgKGZyYW1ld29yayAhPSAnZXh0anMnKSB7XG4gICAgICAgIF9wcmVwYXJlRm9yQnVpbGQoYXBwLCB2YXJzLCBvcHRpb25zLCBvdXRwdXRQYXRoLCBjb21waWxhdGlvbilcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBpZiAob3B0aW9ucy5mcmFtZXdvcmsgPT0gJ2FuZ3VsYXInICYmIG9wdGlvbnMudHJlZXNoYWtlID09IGZhbHNlKSB7XG4gICAgICAgICAgcmVxdWlyZShgLi8ke2ZyYW1ld29ya31VdGlsYCkuX3ByZXBhcmVGb3JCdWlsZChhcHAsIHZhcnMsIG9wdGlvbnMsIG91dHB1dFBhdGgsIGNvbXBpbGF0aW9uKVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIHJlcXVpcmUoYC4vJHtmcmFtZXdvcmt9VXRpbGApLl9wcmVwYXJlRm9yQnVpbGQoYXBwLCB2YXJzLCBvcHRpb25zLCBvdXRwdXRQYXRoLCBjb21waWxhdGlvbilcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB2YXIgY29tbWFuZCA9ICcnXG4gICAgICBpZiAob3B0aW9ucy53YXRjaCA9PSAneWVzJyAmJiB2YXJzLnByb2R1Y3Rpb24gPT0gZmFsc2UpIHtcbiAgICAgICAgY29tbWFuZCA9ICd3YXRjaCdcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBjb21tYW5kID0gJ2J1aWxkJ1xuICAgICAgfVxuXG4gICAgICBpZiAodmFycy5yZWJ1aWxkID09IHRydWUpIHtcbiAgICAgICAgdmFyIHBhcm1zID0gW11cbiAgICAgICAgaWYgKG9wdGlvbnMucHJvZmlsZSA9PSB1bmRlZmluZWQgfHwgb3B0aW9ucy5wcm9maWxlID09ICcnIHx8IG9wdGlvbnMucHJvZmlsZSA9PSBudWxsKSB7XG4gICAgICAgICAgaWYgKGNvbW1hbmQgPT0gJ2J1aWxkJykge1xuICAgICAgICAgICAgcGFybXMgPSBbJ2FwcCcsIGNvbW1hbmQsIG9wdGlvbnMuZW52aXJvbm1lbnRdXG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcGFybXMgPSBbJ2FwcCcsIGNvbW1hbmQsICctLXdlYi1zZXJ2ZXInLCAnZmFsc2UnLCBvcHRpb25zLmVudmlyb25tZW50XVxuICAgICAgICAgIH1cblxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIGlmIChjb21tYW5kID09ICdidWlsZCcpIHtcbiAgICAgICAgICAgIHBhcm1zID0gWydhcHAnLCBjb21tYW5kLCBvcHRpb25zLnByb2ZpbGUsIG9wdGlvbnMuZW52aXJvbm1lbnRdXG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcGFybXMgPSBbJ2FwcCcsIGNvbW1hbmQsICctLXdlYi1zZXJ2ZXInLCAnZmFsc2UnLCBvcHRpb25zLnByb2ZpbGUsIG9wdGlvbnMuZW52aXJvbm1lbnRdXG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHZhcnMud2F0Y2hTdGFydGVkID09IGZhbHNlKSB7XG4gICAgICAgICAgYXdhaXQgX2J1aWxkRXh0QnVuZGxlKGFwcCwgY29tcGlsYXRpb24sIG91dHB1dFBhdGgsIHBhcm1zLCBvcHRpb25zKVxuICAgICAgICAgIHZhcnMud2F0Y2hTdGFydGVkID0gdHJ1ZVxuICAgICAgICB9XG5cbiAgICAgICAgY2FsbGJhY2soKVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgICAgY2FsbGJhY2soKVxuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGxvZyhgJHt2YXJzLmFwcH1GVU5DVElPTiBlbWl0IG5vdCBydW5gKVxuICAgICAgY2FsbGJhY2soKVxuICAgIH1cbiAgfVxuICBjYXRjaChlKSB7XG4gICAgcmVxdWlyZSgnLi9wbHVnaW5VdGlsJykubG9ndihvcHRpb25zLGUpXG4gICAgY29tcGlsYXRpb24uZXJyb3JzLnB1c2goJ2VtaXQ6ICcgKyBlKVxuICAgIGNhbGxiYWNrKClcbiAgfVxufVxuXG4vLyoqKioqKioqKipcbmV4cG9ydCBmdW5jdGlvbiBfcHJlcGFyZUZvckJ1aWxkKGFwcCwgdmFycywgb3B0aW9ucywgb3V0cHV0LCBjb21waWxhdGlvbikge1xuICB0cnkge1xuICAgIGxvZ3Yob3B0aW9ucywnRlVOQ1RJT04gX3ByZXBhcmVGb3JCdWlsZCcpXG4gICAgY29uc3QgcmltcmFmID0gcmVxdWlyZSgncmltcmFmJylcbiAgICBjb25zdCBta2RpcnAgPSByZXF1aXJlKCdta2RpcnAnKVxuICAgIGNvbnN0IGZzeCA9IHJlcXVpcmUoJ2ZzLWV4dHJhJylcbiAgICBjb25zdCBmcyA9IHJlcXVpcmUoJ2ZzJylcbiAgICBjb25zdCBwYXRoID0gcmVxdWlyZSgncGF0aCcpXG5cbiAgICB2YXIgcGFja2FnZXMgPSBvcHRpb25zLnBhY2thZ2VzXG4gICAgdmFyIHRvb2xraXQgPSBvcHRpb25zLnRvb2xraXRcbiAgICB2YXIgdGhlbWUgPSBvcHRpb25zLnRoZW1lXG5cbiAgICB0aGVtZSA9IHRoZW1lIHx8ICh0b29sa2l0ID09PSAnY2xhc3NpYycgPyAndGhlbWUtdHJpdG9uJyA6ICd0aGVtZS1tYXRlcmlhbCcpXG4gICAgbG9ndihvcHRpb25zLCdmaXJzdFRpbWU6ICcgKyB2YXJzLmZpcnN0VGltZSlcbiAgICBpZiAodmFycy5maXJzdFRpbWUpIHtcbiAgICAgIHJpbXJhZi5zeW5jKG91dHB1dClcbiAgICAgIG1rZGlycC5zeW5jKG91dHB1dClcbiAgICAgIGNvbnN0IGJ1aWxkWE1MID0gcmVxdWlyZSgnLi9hcnRpZmFjdHMnKS5idWlsZFhNTFxuICAgICAgY29uc3QgY3JlYXRlQXBwSnNvbiA9IHJlcXVpcmUoJy4vYXJ0aWZhY3RzJykuY3JlYXRlQXBwSnNvblxuICAgICAgY29uc3QgY3JlYXRlV29ya3NwYWNlSnNvbiA9IHJlcXVpcmUoJy4vYXJ0aWZhY3RzJykuY3JlYXRlV29ya3NwYWNlSnNvblxuICAgICAgY29uc3QgY3JlYXRlSlNET01FbnZpcm9ubWVudCA9IHJlcXVpcmUoJy4vYXJ0aWZhY3RzJykuY3JlYXRlSlNET01FbnZpcm9ubWVudFxuXG4gICAgICBmcy53cml0ZUZpbGVTeW5jKHBhdGguam9pbihvdXRwdXQsICdidWlsZC54bWwnKSwgYnVpbGRYTUwodmFycy5wcm9kdWN0aW9uLCBvcHRpb25zLCBvdXRwdXQpLCAndXRmOCcpXG4gICAgICBmcy53cml0ZUZpbGVTeW5jKHBhdGguam9pbihvdXRwdXQsICdhcHAuanNvbicpLCBjcmVhdGVBcHBKc29uKHRoZW1lLCBwYWNrYWdlcywgdG9vbGtpdCwgb3B0aW9ucywgb3V0cHV0KSwgJ3V0ZjgnKVxuICAgICAgZnMud3JpdGVGaWxlU3luYyhwYXRoLmpvaW4ob3V0cHV0LCAnanNkb20tZW52aXJvbm1lbnQuanMnKSwgY3JlYXRlSlNET01FbnZpcm9ubWVudChvcHRpb25zLCBvdXRwdXQpLCAndXRmOCcpXG4gICAgICBmcy53cml0ZUZpbGVTeW5jKHBhdGguam9pbihvdXRwdXQsICd3b3Jrc3BhY2UuanNvbicpLCBjcmVhdGVXb3Jrc3BhY2VKc29uKG9wdGlvbnMsIG91dHB1dCksICd1dGY4JylcblxuICAgICAgdmFyIGZyYW1ld29yayA9IHZhcnMuZnJhbWV3b3JrO1xuICAgICAgLy9iZWNhdXNlIG9mIGEgcHJvYmxlbSB3aXRoIGNvbG9ycGlja2VyXG4gICAgICBpZiAoZnMuZXhpc3RzU3luYyhwYXRoLmpvaW4ocHJvY2Vzcy5jd2QoKSxgZXh0LSR7ZnJhbWV3b3JrfS91eC9gKSkpIHtcbiAgICAgICAgdmFyIGZyb21QYXRoID0gcGF0aC5qb2luKHByb2Nlc3MuY3dkKCksIGBleHQtJHtmcmFtZXdvcmt9L3V4L2ApXG4gICAgICAgIHZhciB0b1BhdGggPSBwYXRoLmpvaW4ob3V0cHV0LCAndXgnKVxuICAgICAgICBmc3guY29weVN5bmMoZnJvbVBhdGgsIHRvUGF0aClcbiAgICAgICAgbG9nKGFwcCArICdDb3B5aW5nICh1eCkgJyArIGZyb21QYXRoLnJlcGxhY2UocHJvY2Vzcy5jd2QoKSwgJycpICsgJyB0bzogJyArIHRvUGF0aC5yZXBsYWNlKHByb2Nlc3MuY3dkKCksICcnKSlcbiAgICAgIH1cbiAgICAgIGlmIChmcy5leGlzdHNTeW5jKHBhdGguam9pbihwcm9jZXNzLmN3ZCgpLGBleHQtJHtmcmFtZXdvcmt9L3BhY2thZ2VzL2ApKSkge1xuICAgICAgICB2YXIgZnJvbVBhdGggPSBwYXRoLmpvaW4ocHJvY2Vzcy5jd2QoKSwgYGV4dC0ke2ZyYW1ld29ya30vcGFja2FnZXMvYClcbiAgICAgICAgdmFyIHRvUGF0aCA9IHBhdGguam9pbihvdXRwdXQsICdwYWNrYWdlcycpXG4gICAgICAgIGZzeC5jb3B5U3luYyhmcm9tUGF0aCwgdG9QYXRoKVxuICAgICAgICBsb2coYXBwICsgJ0NvcHlpbmcgJyArIGZyb21QYXRoLnJlcGxhY2UocHJvY2Vzcy5jd2QoKSwgJycpICsgJyB0bzogJyArIHRvUGF0aC5yZXBsYWNlKHByb2Nlc3MuY3dkKCksICcnKSlcbiAgICAgIH1cbiAgICAgIGlmIChmcy5leGlzdHNTeW5jKHBhdGguam9pbihwcm9jZXNzLmN3ZCgpLGBleHQtJHtmcmFtZXdvcmt9L292ZXJyaWRlcy9gKSkpIHtcbiAgICAgICAgdmFyIGZyb21QYXRoID0gcGF0aC5qb2luKHByb2Nlc3MuY3dkKCksIGBleHQtJHtmcmFtZXdvcmt9L292ZXJyaWRlcy9gKVxuICAgICAgICB2YXIgdG9QYXRoID0gcGF0aC5qb2luKG91dHB1dCwgJ292ZXJyaWRlcycpXG4gICAgICAgIGZzeC5jb3B5U3luYyhmcm9tUGF0aCwgdG9QYXRoKVxuICAgICAgICBsb2coYXBwICsgJ0NvcHlpbmcgJyArIGZyb21QYXRoLnJlcGxhY2UocHJvY2Vzcy5jd2QoKSwgJycpICsgJyB0bzogJyArIHRvUGF0aC5yZXBsYWNlKHByb2Nlc3MuY3dkKCksICcnKSlcbiAgICAgIH1cbiAgICAgIGlmIChmcy5leGlzdHNTeW5jKHBhdGguam9pbihwcm9jZXNzLmN3ZCgpLCdyZXNvdXJjZXMvJykpKSB7XG4gICAgICAgIHZhciBmcm9tUmVzb3VyY2VzID0gcGF0aC5qb2luKHByb2Nlc3MuY3dkKCksICdyZXNvdXJjZXMvJylcbiAgICAgICAgdmFyIHRvUmVzb3VyY2VzID0gcGF0aC5qb2luKG91dHB1dCwgJy4uL3Jlc291cmNlcycpXG4gICAgICAgIGZzeC5jb3B5U3luYyhmcm9tUmVzb3VyY2VzLCB0b1Jlc291cmNlcylcbiAgICAgICAgbG9nKGFwcCArICdDb3B5aW5nICcgKyBmcm9tUmVzb3VyY2VzLnJlcGxhY2UocHJvY2Vzcy5jd2QoKSwgJycpICsgJyB0bzogJyArIHRvUmVzb3VyY2VzLnJlcGxhY2UocHJvY2Vzcy5jd2QoKSwgJycpKVxuICAgICAgfVxuICAgIH1cbiAgICB2YXJzLmZpcnN0VGltZSA9IGZhbHNlXG4gICAgdmFyIGpzID0gJydcbiAgICBpZiAodmFycy5wcm9kdWN0aW9uKSB7XG4gICAgICBqcyA9IHZhcnMuZGVwcy5qb2luKCc7XFxuJyk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAganMgPSAnRXh0LnJlcXVpcmUoXCJFeHQuKlwiKSdcbiAgICB9XG4gICAgaWYgKHZhcnMubWFuaWZlc3QgPT09IG51bGwgfHwganMgIT09IHZhcnMubWFuaWZlc3QpIHtcbiAgICAgIHZhcnMubWFuaWZlc3QgPSBqc1xuICAgICAgY29uc3QgbWFuaWZlc3QgPSBwYXRoLmpvaW4ob3V0cHV0LCAnbWFuaWZlc3QuanMnKVxuICAgICAgZnMud3JpdGVGaWxlU3luYyhtYW5pZmVzdCwganMsICd1dGY4JylcbiAgICAgIHZhcnMucmVidWlsZCA9IHRydWVcbiAgICAgIHZhciBidW5kbGVEaXIgPSBvdXRwdXQucmVwbGFjZShwcm9jZXNzLmN3ZCgpLCAnJylcbiAgICAgIGlmIChidW5kbGVEaXIudHJpbSgpID09ICcnKSB7YnVuZGxlRGlyID0gJy4vJ31cbiAgICAgIGxvZyhhcHAgKyAnQnVpbGRpbmcgRXh0IGJ1bmRsZSBhdDogJyArIGJ1bmRsZURpcilcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICB2YXJzLnJlYnVpbGQgPSB0cnVlXG4gICAgICBsb2coYXBwICsgJ0V4dCByZWJ1aWxkIE5PVCBuZWVkZWQnKVxuICAgICAgbG9nKGFwcCArICdidXQgZG9uZScpXG4gICAgfVxuICB9XG4gIGNhdGNoKGUpIHtcbiAgICByZXF1aXJlKCcuL3BsdWdpblV0aWwnKS5sb2d2KG9wdGlvbnMsZSlcbiAgICBjb21waWxhdGlvbi5lcnJvcnMucHVzaCgnX3ByZXBhcmVGb3JCdWlsZDogJyArIGUpXG4gIH1cbn1cblxuLy8qKioqKioqKioqXG5leHBvcnQgZnVuY3Rpb24gX2J1aWxkRXh0QnVuZGxlKGFwcCwgY29tcGlsYXRpb24sIG91dHB1dFBhdGgsIHBhcm1zLCBvcHRpb25zKSB7XG4gIHRyeSB7XG4gICAgY29uc3QgZnMgPSByZXF1aXJlKCdmcycpXG4gICAgY29uc3QgbG9ndiA9IHJlcXVpcmUoJy4vcGx1Z2luVXRpbCcpLmxvZ3ZcbiAgICBsb2d2KG9wdGlvbnMsJ0ZVTkNUSU9OIF9idWlsZEV4dEJ1bmRsZScpXG5cbiAgICBsZXQgc2VuY2hhOyB0cnkgeyBzZW5jaGEgPSByZXF1aXJlKCdAc2VuY2hhL2NtZCcpIH0gY2F0Y2ggKGUpIHsgc2VuY2hhID0gJ3NlbmNoYScgfVxuICAgIGlmIChmcy5leGlzdHNTeW5jKHNlbmNoYSkpIHtcbiAgICAgIGxvZ3Yob3B0aW9ucywnc2VuY2hhIGZvbGRlciBleGlzdHMnKVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGxvZ3Yob3B0aW9ucywnc2VuY2hhIGZvbGRlciBET0VTIE5PVCBleGlzdCcpXG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGNvbnN0IG9uQnVpbGREb25lID0gKCkgPT4ge1xuICAgICAgICBsb2d2KG9wdGlvbnMsJ29uQnVpbGREb25lJylcbiAgICAgICAgcmVzb2x2ZSgpXG4gICAgICB9XG5cbiAgICAgIHZhciBvcHRzID0geyBjd2Q6IG91dHB1dFBhdGgsIHNpbGVudDogdHJ1ZSwgc3RkaW86ICdwaXBlJywgZW5jb2Rpbmc6ICd1dGYtOCd9XG4gICAgICBleGVjdXRlQXN5bmMoYXBwLCBzZW5jaGEsIHBhcm1zLCBvcHRzLCBjb21waWxhdGlvbiwgb3B0aW9ucykudGhlbiAoXG4gICAgICAgIGZ1bmN0aW9uKCkgeyBvbkJ1aWxkRG9uZSgpIH0sIFxuICAgICAgICBmdW5jdGlvbihyZWFzb24pIHsgcmVqZWN0KHJlYXNvbikgfVxuICAgICAgKVxuICAgIH0pXG4gIH1cbiAgY2F0Y2goZSkge1xuICAgIGNvbnNvbGUubG9nKCdlJylcbiAgICByZXF1aXJlKCcuL3BsdWdpblV0aWwnKS5sb2d2KG9wdGlvbnMsZSlcbiAgICBjb21waWxhdGlvbi5lcnJvcnMucHVzaCgnX2J1aWxkRXh0QnVuZGxlOiAnICsgZSlcbiAgICBjYWxsYmFjaygpXG4gIH1cbn1cblxuLy8qKioqKioqKioqXG5leHBvcnQgZnVuY3Rpb24gX2RvbmUodmFycywgb3B0aW9ucykge1xuICB0cnkge1xuICAgIGNvbnN0IGxvZyA9IHJlcXVpcmUoJy4vcGx1Z2luVXRpbCcpLmxvZ1xuICAgIGNvbnN0IGxvZ3YgPSByZXF1aXJlKCcuL3BsdWdpblV0aWwnKS5sb2d2XG4gICAgbG9ndihvcHRpb25zLCdGVU5DVElPTiBfZG9uZScpXG5cblxuICAgIGlmICh2YXJzLnByb2R1Y3Rpb24gPT0gdHJ1ZSAmJiBvcHRpb25zLnRyZWVzaGFrZSA9PSBmYWxzZSAmJiBvcHRpb25zLmZyYW1ld29yayA9PSAnYW5ndWxhcicpIHtcbiAgICAgIHJlcXVpcmUoYC4vJHtvcHRpb25zLmZyYW1ld29ya31VdGlsYCkuX3RvRGV2KHZhcnMsIG9wdGlvbnMpXG4gICAgfVxuXG5cbiAgICB0cnkge1xuICAgICAgaWYob3B0aW9ucy5icm93c2VyID09IHRydWUgJiYgb3B0aW9ucy53YXRjaCA9PSAneWVzJyAmJiB2YXJzLnByb2R1Y3Rpb24gPT0gZmFsc2UpIHtcbiAgICAgICAgaWYgKHZhcnMuYnJvd3NlckNvdW50ID09IDApIHtcbiAgICAgICAgICB2YXIgdXJsID0gJ2h0dHA6Ly9sb2NhbGhvc3Q6JyArIG9wdGlvbnMucG9ydFxuICAgICAgICAgIHJlcXVpcmUoJy4vcGx1Z2luVXRpbCcpLmxvZyh2YXJzLmFwcCArIGBPcGVuaW5nIGJyb3dzZXIgYXQgJHt1cmx9YClcbiAgICAgICAgICB2YXJzLmJyb3dzZXJDb3VudCsrXG4gICAgICAgICAgY29uc3Qgb3BuID0gcmVxdWlyZSgnb3BuJylcbiAgICAgICAgICBvcG4odXJsKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGNhdGNoIChlKSB7XG4gICAgICBjb25zb2xlLmxvZyhlKVxuICAgICAgLy9jb21waWxhdGlvbi5lcnJvcnMucHVzaCgnc2hvdyBicm93c2VyIHdpbmRvdyAtIGV4dC1kb25lOiAnICsgZSlcbiAgICB9XG4gIH1cbiAgY2F0Y2goZSkge1xuICAgIHJlcXVpcmUoJy4vcGx1Z2luVXRpbCcpLmxvZ3Yob3B0aW9ucyxlKVxuICB9XG59XG5cbi8vKioqKioqKioqKlxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGV4ZWN1dGVBc3luYyAoYXBwLCBjb21tYW5kLCBwYXJtcywgb3B0cywgY29tcGlsYXRpb24sIG9wdGlvbnMpIHtcbiAgXG4gIHRyeSB7XG4gICAgLy9jb25zdCBERUZBVUxUX1NVQlNUUlMgPSBbJ1tJTkZdIExvYWRpbmcnLCAnW0lORl0gUHJvY2Vzc2luZycsICdbTE9HXSBGYXNoaW9uIGJ1aWxkIGNvbXBsZXRlJywgJ1tFUlJdJywgJ1tXUk5dJywgXCJbSU5GXSBTZXJ2ZXJcIiwgXCJbSU5GXSBXcml0aW5nXCIsIFwiW0lORl0gTG9hZGluZyBCdWlsZFwiLCBcIltJTkZdIFdhaXRpbmdcIiwgXCJbTE9HXSBGYXNoaW9uIHdhaXRpbmdcIl07XG4gICAgY29uc3QgREVGQVVMVF9TVUJTVFJTID0gW1wiW0lORl0geFNlcnZlclwiLCAnW0lORl0gTG9hZGluZycsICdbSU5GXSBBcHBlbmQnLCAnW0lORl0gUHJvY2Vzc2luZycsICdbSU5GXSBQcm9jZXNzaW5nIEJ1aWxkJywgJ1tMT0ddIEZhc2hpb24gYnVpbGQgY29tcGxldGUnLCAnW0VSUl0nLCAnW1dSTl0nLCBcIltJTkZdIFdyaXRpbmdcIiwgXCJbSU5GXSBMb2FkaW5nIEJ1aWxkXCIsIFwiW0lORl0gV2FpdGluZ1wiLCBcIltMT0ddIEZhc2hpb24gd2FpdGluZ1wiXTtcbiAgICB2YXIgc3Vic3RyaW5ncyA9IERFRkFVTFRfU1VCU1RSUyBcbiAgICB2YXIgY2hhbGsgPSByZXF1aXJlKCdjaGFsaycpXG4gICAgY29uc3QgY3Jvc3NTcGF3biA9IHJlcXVpcmUoJ2Nyb3NzLXNwYXduJylcbiAgICBjb25zdCBsb2cgPSByZXF1aXJlKCcuL3BsdWdpblV0aWwnKS5sb2dcbiAgICBsb2d2KG9wdGlvbnMsICdGVU5DVElPTiBleGVjdXRlQXN5bmMnKVxuICAgIGF3YWl0IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGxvZ3Yob3B0aW9ucyxgY29tbWFuZCAtICR7Y29tbWFuZH1gKVxuICAgICAgbG9ndihvcHRpb25zLCBgcGFybXMgLSAke3Bhcm1zfWApXG4gICAgICBsb2d2KG9wdGlvbnMsIGBvcHRzIC0gJHtKU09OLnN0cmluZ2lmeShvcHRzKX1gKVxuICAgICAgbGV0IGNoaWxkID0gY3Jvc3NTcGF3bihjb21tYW5kLCBwYXJtcywgb3B0cylcbiAgICAgIGNoaWxkLm9uKCdjbG9zZScsIChjb2RlLCBzaWduYWwpID0+IHtcbiAgICAgICAgbG9ndihvcHRpb25zLCBgb24gY2xvc2U6IGAgKyBjb2RlKSBcbiAgICAgICAgaWYoY29kZSA9PT0gMCkgeyByZXNvbHZlKDApIH1cbiAgICAgICAgZWxzZSB7IGNvbXBpbGF0aW9uLmVycm9ycy5wdXNoKCBuZXcgRXJyb3IoY29kZSkgKTsgcmVzb2x2ZSgwKSB9XG4gICAgICB9KVxuICAgICAgY2hpbGQub24oJ2Vycm9yJywgKGVycm9yKSA9PiB7IFxuICAgICAgICBsb2d2KG9wdGlvbnMsIGBvbiBlcnJvcmApIFxuICAgICAgICBjb21waWxhdGlvbi5lcnJvcnMucHVzaChlcnJvcilcbiAgICAgICAgcmVzb2x2ZSgwKVxuICAgICAgfSlcbiAgICAgIGNoaWxkLnN0ZG91dC5vbignZGF0YScsIChkYXRhKSA9PiB7XG4gICAgICAgIHZhciBzdHIgPSBkYXRhLnRvU3RyaW5nKCkucmVwbGFjZSgvXFxyP1xcbnxcXHIvZywgXCIgXCIpLnRyaW0oKVxuICAgICAgICBsb2d2KG9wdGlvbnMsIGAke3N0cn1gKVxuICAgICAgICBpZiAoZGF0YSAmJiBkYXRhLnRvU3RyaW5nKCkubWF0Y2goL0Zhc2hpb24gd2FpdGluZyBmb3IgY2hhbmdlc1xcLlxcLlxcLi8pKSB7XG4gICAgICAgICAgY29uc3QgZnMgPSByZXF1aXJlKCdmcycpO1xuICAgICAgICAgIHZhciBmaWxlbmFtZSA9IHByb2Nlc3MuY3dkKCkrJy9zcmMvaW5kZXguanMnO1xuICAgICAgICAgIHZhciBkYXRhID0gZnMucmVhZEZpbGVTeW5jKGZpbGVuYW1lKTtcbiAgICAgICAgICBmcy53cml0ZUZpbGVTeW5jKGZpbGVuYW1lLCBkYXRhICsgJyAnLCAndXRmOCcpXG4gICAgICAgICAgbG9ndihvcHRpb25zLCBgdG91Y2hpbmcgJHtmaWxlbmFtZX1gKVxuICAgICAgICAgIHJlc29sdmUoMClcbiAgICAgICAgfVxuICAgICAgICAvLyBpZiAoZGF0YSAmJiBkYXRhLnRvU3RyaW5nKCkubWF0Y2goL3dhaXRpbmcgZm9yIGNoYW5nZXNcXC5cXC5cXC4vKSkge1xuICAgICAgICAvLyAgIHJlc29sdmUoMClcbiAgICAgICAgLy8gfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBpZiAoc3Vic3RyaW5ncy5zb21lKGZ1bmN0aW9uKHYpIHsgcmV0dXJuIGRhdGEuaW5kZXhPZih2KSA+PSAwOyB9KSkgeyBcbiAgICAgICAgICAgIHN0ciA9IHN0ci5yZXBsYWNlKFwiW0lORl1cIiwgXCJcIilcbiAgICAgICAgICAgIHN0ciA9IHN0ci5yZXBsYWNlKFwiW0xPR11cIiwgXCJcIilcbiAgICAgICAgICAgIHN0ciA9IHN0ci5yZXBsYWNlKHByb2Nlc3MuY3dkKCksICcnKS50cmltKClcbiAgICAgICAgICAgIGlmIChzdHIuaW5jbHVkZXMoXCJbRVJSXVwiKSkge1xuICAgICAgICAgICAgICBjb21waWxhdGlvbi5lcnJvcnMucHVzaChhcHAgKyBzdHIucmVwbGFjZSgvXlxcW0VSUlxcXSAvZ2ksICcnKSk7XG4gICAgICAgICAgICAgIHN0ciA9IHN0ci5yZXBsYWNlKFwiW0VSUl1cIiwgYCR7Y2hhbGsucmVkKFwiW0VSUl1cIil9YClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxvZyhgJHthcHB9JHtzdHJ9YCkgXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgY2hpbGQuc3RkZXJyLm9uKCdkYXRhJywgKGRhdGEpID0+IHtcbiAgICAgICAgbG9ndihvcHRpb25zLCBgZXJyb3Igb24gY2xvc2U6IGAgKyBkYXRhKSBcbiAgICAgICAgdmFyIHN0ciA9IGRhdGEudG9TdHJpbmcoKS5yZXBsYWNlKC9cXHI/XFxufFxcci9nLCBcIiBcIikudHJpbSgpXG4gICAgICAgIHZhciBzdHJKYXZhT3B0cyA9IFwiUGlja2VkIHVwIF9KQVZBX09QVElPTlNcIjtcbiAgICAgICAgdmFyIGluY2x1ZGVzID0gc3RyLmluY2x1ZGVzKHN0ckphdmFPcHRzKVxuICAgICAgICBpZiAoIWluY2x1ZGVzKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coYCR7YXBwfSAke2NoYWxrLnJlZChcIltFUlJdXCIpfSAke3N0cn1gKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0pXG4gIH1cbiAgY2F0Y2goZSkge1xuICAgIHJlcXVpcmUoJy4vcGx1Z2luVXRpbCcpLmxvZ3Yob3B0aW9ucyxlKVxuICAgIGNvbXBpbGF0aW9uLmVycm9ycy5wdXNoKCdleGVjdXRlQXN5bmM6ICcgKyBlKVxuICAgIGNhbGxiYWNrKClcbiAgfSBcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGxvZyhzKSB7XG4gIHJlcXVpcmUoJ3JlYWRsaW5lJykuY3Vyc29yVG8ocHJvY2Vzcy5zdGRvdXQsIDApXG4gIHRyeSB7XG4gICAgcHJvY2Vzcy5zdGRvdXQuY2xlYXJMaW5lKClcbiAgfVxuICBjYXRjaChlKSB7fVxuICBwcm9jZXNzLnN0ZG91dC53cml0ZShzKVxuICBwcm9jZXNzLnN0ZG91dC53cml0ZSgnXFxuJylcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGxvZ3Yob3B0aW9ucywgcykge1xuICBpZiAob3B0aW9ucy52ZXJib3NlID09ICd5ZXMnKSB7XG4gICAgcmVxdWlyZSgncmVhZGxpbmUnKS5jdXJzb3JUbyhwcm9jZXNzLnN0ZG91dCwgMClcbiAgICB0cnkge1xuICAgICAgcHJvY2Vzcy5zdGRvdXQuY2xlYXJMaW5lKClcbiAgICB9XG4gICAgY2F0Y2goZSkge31cbiAgICBwcm9jZXNzLnN0ZG91dC53cml0ZShgLXZlcmJvc2U6ICR7c31gKVxuICAgIHByb2Nlc3Muc3Rkb3V0LndyaXRlKCdcXG4nKVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfZ2V0QXBwKCkge1xuICB2YXIgY2hhbGsgPSByZXF1aXJlKCdjaGFsaycpXG4gIHZhciBwcmVmaXggPSBgYFxuICBjb25zdCBwbGF0Zm9ybSA9IHJlcXVpcmUoJ29zJykucGxhdGZvcm0oKVxuICBpZiAocGxhdGZvcm0gPT0gJ2RhcndpbicpIHsgcHJlZml4ID0gYOKEuSDvvaJleHTvvaM6YCB9XG4gIGVsc2UgeyBwcmVmaXggPSBgaSBbZXh0XTpgIH1cbiAgcmV0dXJuIGAke2NoYWxrLmdyZWVuKHByZWZpeCl9IGBcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9nZXRWZXJzaW9ucyhhcHAsIHBsdWdpbk5hbWUsIGZyYW1ld29ya05hbWUpIHtcbiAgY29uc3QgcGF0aCA9IHJlcXVpcmUoJ3BhdGgnKVxuICBjb25zdCBmcyA9IHJlcXVpcmUoJ2ZzJylcblxuICB2YXIgdiA9IHt9XG4gIHZhciBwbHVnaW5QYXRoID0gcGF0aC5yZXNvbHZlKHByb2Nlc3MuY3dkKCksJ25vZGVfbW9kdWxlcy9Ac2VuY2hhJywgcGx1Z2luTmFtZSlcbiAgdmFyIHBsdWdpblBrZyA9IChmcy5leGlzdHNTeW5jKHBsdWdpblBhdGgrJy9wYWNrYWdlLmpzb24nKSAmJiBKU09OLnBhcnNlKGZzLnJlYWRGaWxlU3luYyhwbHVnaW5QYXRoKycvcGFja2FnZS5qc29uJywgJ3V0Zi04JykpIHx8IHt9KTtcbiAgdi5wbHVnaW5WZXJzaW9uID0gcGx1Z2luUGtnLnZlcnNpb25cbiAgdi5fcmVzb2x2ZWQgPSBwbHVnaW5Qa2cuX3Jlc29sdmVkXG4gIGlmICh2Ll9yZXNvbHZlZCA9PSB1bmRlZmluZWQpIHtcbiAgICB2LmVkaXRpb24gPSBgQ29tbWVyY2lhbGBcbiAgfVxuICBlbHNlIHtcbiAgICBpZiAoLTEgPT0gdi5fcmVzb2x2ZWQuaW5kZXhPZignY29tbXVuaXR5JykpIHtcbiAgICAgIHYuZWRpdGlvbiA9IGBDb21tZXJjaWFsYFxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHYuZWRpdGlvbiA9IGBDb21tdW5pdHlgXG4gICAgfVxuICB9XG5cbiAgdmFyIHdlYnBhY2tQYXRoID0gcGF0aC5yZXNvbHZlKHByb2Nlc3MuY3dkKCksJ25vZGVfbW9kdWxlcy93ZWJwYWNrJylcbiAgdmFyIHdlYnBhY2tQa2cgPSAoZnMuZXhpc3RzU3luYyh3ZWJwYWNrUGF0aCsnL3BhY2thZ2UuanNvbicpICYmIEpTT04ucGFyc2UoZnMucmVhZEZpbGVTeW5jKHdlYnBhY2tQYXRoKycvcGFja2FnZS5qc29uJywgJ3V0Zi04JykpIHx8IHt9KTtcbiAgdi53ZWJwYWNrVmVyc2lvbiA9IHdlYnBhY2tQa2cudmVyc2lvblxuXG4gIHZhciBleHRQYXRoID0gcGF0aC5yZXNvbHZlKHByb2Nlc3MuY3dkKCksJ25vZGVfbW9kdWxlcy9Ac2VuY2hhL2V4dCcpXG4gIHZhciBleHRQa2cgPSAoZnMuZXhpc3RzU3luYyhleHRQYXRoKycvcGFja2FnZS5qc29uJykgJiYgSlNPTi5wYXJzZShmcy5yZWFkRmlsZVN5bmMoZXh0UGF0aCsnL3BhY2thZ2UuanNvbicsICd1dGYtOCcpKSB8fCB7fSk7XG4gIHYuZXh0VmVyc2lvbiA9IGV4dFBrZy5zZW5jaGEudmVyc2lvblxuXG4gIHZhciBjbWRQYXRoID0gcGF0aC5yZXNvbHZlKHByb2Nlc3MuY3dkKCksYG5vZGVfbW9kdWxlcy9Ac2VuY2hhL2NtZGApXG4gIHZhciBjbWRQa2cgPSAoZnMuZXhpc3RzU3luYyhjbWRQYXRoKycvcGFja2FnZS5qc29uJykgJiYgSlNPTi5wYXJzZShmcy5yZWFkRmlsZVN5bmMoY21kUGF0aCsnL3BhY2thZ2UuanNvbicsICd1dGYtOCcpKSB8fCB7fSk7XG4gIHYuY21kVmVyc2lvbiA9IGNtZFBrZy52ZXJzaW9uX2Z1bGxcblxuICBpZiAodi5jbWRWZXJzaW9uID09IHVuZGVmaW5lZCkge1xuICAgIHZhciBjbWRQYXRoID0gcGF0aC5yZXNvbHZlKHByb2Nlc3MuY3dkKCksYG5vZGVfbW9kdWxlcy9Ac2VuY2hhLyR7cGx1Z2luTmFtZX0vbm9kZV9tb2R1bGVzL0BzZW5jaGEvY21kYClcbiAgICB2YXIgY21kUGtnID0gKGZzLmV4aXN0c1N5bmMoY21kUGF0aCsnL3BhY2thZ2UuanNvbicpICYmIEpTT04ucGFyc2UoZnMucmVhZEZpbGVTeW5jKGNtZFBhdGgrJy9wYWNrYWdlLmpzb24nLCAndXRmLTgnKSkgfHwge30pO1xuICAgIHYuY21kVmVyc2lvbiA9IGNtZFBrZy52ZXJzaW9uX2Z1bGxcbiAgfVxuXG4gIHZhciBmcmFtZXdvcmtJbmZvID0gJydcbiAgIGlmIChmcmFtZXdvcmtOYW1lICE9IHVuZGVmaW5lZCAmJiBmcmFtZXdvcmtOYW1lICE9ICdleHRqcycpIHtcbiAgICB2YXIgZnJhbWV3b3JrUGF0aCA9ICcnXG4gICAgaWYgKGZyYW1ld29ya05hbWUgPT0gJ3JlYWN0Jykge1xuICAgICAgZnJhbWV3b3JrUGF0aCA9IHBhdGgucmVzb2x2ZShwcm9jZXNzLmN3ZCgpLCdub2RlX21vZHVsZXMvcmVhY3QnKVxuICAgIH1cbiAgICBpZiAoZnJhbWV3b3JrTmFtZSA9PSAnYW5ndWxhcicpIHtcbiAgICAgIGZyYW1ld29ya1BhdGggPSBwYXRoLnJlc29sdmUocHJvY2Vzcy5jd2QoKSwnbm9kZV9tb2R1bGVzL0Bhbmd1bGFyL2NvcmUnKVxuICAgIH1cbiAgICB2YXIgZnJhbWV3b3JrUGtnID0gKGZzLmV4aXN0c1N5bmMoZnJhbWV3b3JrUGF0aCsnL3BhY2thZ2UuanNvbicpICYmIEpTT04ucGFyc2UoZnMucmVhZEZpbGVTeW5jKGZyYW1ld29ya1BhdGgrJy9wYWNrYWdlLmpzb24nLCAndXRmLTgnKSkgfHwge30pO1xuICAgIHYuZnJhbWV3b3JrVmVyc2lvbiA9IGZyYW1ld29ya1BrZy52ZXJzaW9uXG4gICAgZnJhbWV3b3JrSW5mbyA9ICcsICcgKyBmcmFtZXdvcmtOYW1lICsgJyB2JyArIHYuZnJhbWV3b3JrVmVyc2lvblxuICB9XG4gIHJldHVybiBhcHAgKyAnZXh0LXdlYnBhY2stcGx1Z2luIHYnICsgdi5wbHVnaW5WZXJzaW9uICsgJywgRXh0IEpTIHYnICsgdi5leHRWZXJzaW9uICsgJyAnICsgdi5lZGl0aW9uICsgJyBFZGl0aW9uLCBTZW5jaGEgQ21kIHYnICsgdi5jbWRWZXJzaW9uICsgJywgd2VicGFjayB2JyArIHYud2VicGFja1ZlcnNpb24gKyBmcmFtZXdvcmtJbmZvXG4gfSJdfQ==