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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9wbHVnaW5VdGlsLmpzIl0sIm5hbWVzIjpbIl9jb25zdHJ1Y3RvciIsIm9wdGlvbnMiLCJmcyIsInJlcXVpcmUiLCJ0aGlzVmFycyIsInRoaXNPcHRpb25zIiwicGx1Z2luIiwiZnJhbWV3b3JrIiwidW5kZWZpbmVkIiwicGx1Z2luRXJyb3JzIiwicHVzaCIsInZhcnMiLCJ2YWxpZGF0ZU9wdGlvbnMiLCJnZXRWYWxpZGF0ZU9wdGlvbnMiLCJnZXREZWZhdWx0VmFycyIsInBsdWdpbk5hbWUiLCJhcHAiLCJfZ2V0QXBwIiwibG9ndiIsInJjIiwiZXhpc3RzU3luYyIsIkpTT04iLCJwYXJzZSIsInJlYWRGaWxlU3luYyIsImdldERlZmF1bHRPcHRpb25zIiwic3RyaW5naWZ5IiwiZW52aXJvbm1lbnQiLCJwcm9kdWN0aW9uIiwibG9nIiwiX2dldFZlcnNpb25zIiwidHJlZXNoYWtlIiwiX3RvUHJvZCIsIl9jb21waWxhdGlvbiIsImNvbXBpbGVyIiwiY29tcGlsYXRpb24iLCJleHRDb21wb25lbnRzIiwiX2dldEFsbENvbXBvbmVudHMiLCJob29rcyIsInN1Y2NlZWRNb2R1bGUiLCJ0YXAiLCJtb2R1bGUiLCJyZXNvdXJjZSIsIm1hdGNoIiwiX3NvdXJjZSIsIl92YWx1ZSIsInRvTG93ZXJDYXNlIiwiaW5jbHVkZXMiLCJkZXBzIiwiZXh0cmFjdEZyb21Tb3VyY2UiLCJmaW5pc2hNb2R1bGVzIiwibW9kdWxlcyIsIl93cml0ZUZpbGVzVG9Qcm9kRm9sZGVyIiwiaHRtbFdlYnBhY2tQbHVnaW5CZWZvcmVIdG1sR2VuZXJhdGlvbiIsImRhdGEiLCJwYXRoIiwib3V0cHV0UGF0aCIsImRldlNlcnZlciIsImpvaW4iLCJjb250ZW50QmFzZSIsInJlcGxhY2UiLCJwcm9jZXNzIiwiY3dkIiwidHJpbSIsImpzUGF0aCIsImV4dFBhdGgiLCJjc3NQYXRoIiwiYXNzZXRzIiwianMiLCJ1bnNoaWZ0IiwiY3NzIiwiZSIsImVycm9ycyIsIl9hZnRlckNvbXBpbGUiLCJlbWl0IiwiY2FsbGJhY2siLCJfYnVpbGRFeHRCdW5kbGUiLCJfcHJlcGFyZUZvckJ1aWxkIiwiY29tbWFuZCIsIndhdGNoIiwicmVidWlsZCIsInBhcm1zIiwicHJvZmlsZSIsIndhdGNoU3RhcnRlZCIsIm91dHB1dCIsInJpbXJhZiIsIm1rZGlycCIsImZzeCIsInBhY2thZ2VzIiwidG9vbGtpdCIsInRoZW1lIiwiZmlyc3RUaW1lIiwic3luYyIsImJ1aWxkWE1MIiwiY3JlYXRlQXBwSnNvbiIsImNyZWF0ZVdvcmtzcGFjZUpzb24iLCJjcmVhdGVKU0RPTUVudmlyb25tZW50Iiwid3JpdGVGaWxlU3luYyIsImZyb21QYXRoIiwidG9QYXRoIiwiY29weVN5bmMiLCJmcm9tUmVzb3VyY2VzIiwidG9SZXNvdXJjZXMiLCJtYW5pZmVzdCIsImJ1bmRsZURpciIsInNlbmNoYSIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0Iiwib25CdWlsZERvbmUiLCJvcHRzIiwic2lsZW50Iiwic3RkaW8iLCJlbmNvZGluZyIsImV4ZWN1dGVBc3luYyIsInRoZW4iLCJyZWFzb24iLCJjb25zb2xlIiwiX2RvbmUiLCJfdG9EZXYiLCJicm93c2VyIiwiYnJvd3NlckNvdW50IiwidXJsIiwicG9ydCIsIm9wbiIsIkRFRkFVTFRfU1VCU1RSUyIsInN1YnN0cmluZ3MiLCJjaGFsayIsImNyb3NzU3Bhd24iLCJjaGlsZCIsIm9uIiwiY29kZSIsInNpZ25hbCIsIkVycm9yIiwiZXJyb3IiLCJzdGRvdXQiLCJzdHIiLCJ0b1N0cmluZyIsImZpbGVuYW1lIiwic29tZSIsInYiLCJpbmRleE9mIiwicmVkIiwic3RkZXJyIiwic3RySmF2YU9wdHMiLCJzIiwiY3Vyc29yVG8iLCJjbGVhckxpbmUiLCJ3cml0ZSIsInZlcmJvc2UiLCJwcmVmaXgiLCJwbGF0Zm9ybSIsImdyZWVuIiwiZnJhbWV3b3JrTmFtZSIsInBsdWdpblBhdGgiLCJwbHVnaW5Qa2ciLCJwbHVnaW5WZXJzaW9uIiwidmVyc2lvbiIsIl9yZXNvbHZlZCIsImVkaXRpb24iLCJ3ZWJwYWNrUGF0aCIsIndlYnBhY2tQa2ciLCJ3ZWJwYWNrVmVyc2lvbiIsImV4dFBrZyIsImV4dFZlcnNpb24iLCJjbWRQYXRoIiwiY21kUGtnIiwiY21kVmVyc2lvbiIsInZlcnNpb25fZnVsbCIsImZyYW1ld29ya0luZm8iLCJmcmFtZXdvcmtQYXRoIiwiZnJhbWV3b3JrUGtnIiwiZnJhbWV3b3JrVmVyc2lvbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNPLFNBQVNBLFlBQVQsQ0FBc0JDLE9BQXRCLEVBQStCO0FBQ3BDLFFBQU1DLEVBQUUsR0FBR0MsT0FBTyxDQUFDLElBQUQsQ0FBbEI7O0FBRUEsTUFBSUMsUUFBUSxHQUFHLEVBQWY7QUFDQSxNQUFJQyxXQUFXLEdBQUcsRUFBbEI7QUFDQSxNQUFJQyxNQUFNLEdBQUcsRUFBYjs7QUFFQSxNQUFJTCxPQUFPLENBQUNNLFNBQVIsSUFBcUJDLFNBQXpCLEVBQW9DO0FBQ2xDSixJQUFBQSxRQUFRLENBQUNLLFlBQVQsR0FBd0IsRUFBeEI7QUFDQUwsSUFBQUEsUUFBUSxDQUFDSyxZQUFULENBQXNCQyxJQUF0QixDQUEyQiwwR0FBM0I7QUFDQUosSUFBQUEsTUFBTSxDQUFDSyxJQUFQLEdBQWNQLFFBQWQ7QUFDQSxXQUFPRSxNQUFQO0FBQ0Q7O0FBRUQsUUFBTU0sZUFBZSxHQUFHVCxPQUFPLENBQUMsY0FBRCxDQUEvQjs7QUFDQVMsRUFBQUEsZUFBZSxDQUFDVCxPQUFPLENBQUUsS0FBSUYsT0FBTyxDQUFDTSxTQUFVLE1BQXhCLENBQVAsQ0FBc0NNLGtCQUF0QyxFQUFELEVBQTZEWixPQUE3RCxFQUFzRSxFQUF0RSxDQUFmO0FBQ0FHLEVBQUFBLFFBQVEsR0FBR0QsT0FBTyxDQUFFLEtBQUlGLE9BQU8sQ0FBQ00sU0FBVSxNQUF4QixDQUFQLENBQXNDTyxjQUF0QyxFQUFYO0FBQ0FWLEVBQUFBLFFBQVEsQ0FBQ0csU0FBVCxHQUFxQk4sT0FBTyxDQUFDTSxTQUE3Qjs7QUFDQSxVQUFP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QUgsQ0FBY3FKLGFBQWEsR0FBQyxlQUE1QixLQUFnRHBKLElBQUksQ0FBQ0MsS0FBTCxDQUFXcEIsRUFBRSxDQUFDcUIsWUFBSCxDQUFnQmtKLGFBQWEsR0FBQyxlQUE5QixFQUErQyxPQUEvQyxDQUFYLENBQWhELElBQXVILEVBQTNJO0FBQ0E5QixJQUFBQSxDQUFDLENBQUNnQyxnQkFBRixHQUFxQkQsWUFBWSxDQUFDZCxPQUFsQztBQUNBWSxJQUFBQSxhQUFhLEdBQUcsT0FBT2hCLGFBQVAsR0FBdUIsSUFBdkIsR0FBOEJiLENBQUMsQ0FBQ2dDLGdCQUFoRDtBQUNEOztBQUNELFNBQU8zSixHQUFHLEdBQUcsc0JBQU4sR0FBK0IySCxDQUFDLENBQUNnQixhQUFqQyxHQUFpRCxZQUFqRCxHQUFnRWhCLENBQUMsQ0FBQ3dCLFVBQWxFLEdBQStFLEdBQS9FLEdBQXFGeEIsQ0FBQyxDQUFDbUIsT0FBdkYsR0FBaUcsd0JBQWpHLEdBQTRIbkIsQ0FBQyxDQUFDMkIsVUFBOUgsR0FBMkksYUFBM0ksR0FBMkozQixDQUFDLENBQUNzQixjQUE3SixHQUE4S08sYUFBckw7QUFDQSIsInNvdXJjZXNDb250ZW50IjpbIi8vKioqKioqKioqKlxuZXhwb3J0IGZ1bmN0aW9uIF9jb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gIGNvbnN0IGZzID0gcmVxdWlyZSgnZnMnKVxuIFxuICB2YXIgdGhpc1ZhcnMgPSB7fVxuICB2YXIgdGhpc09wdGlvbnMgPSB7fVxuICB2YXIgcGx1Z2luID0ge31cblxuICBpZiAob3B0aW9ucy5mcmFtZXdvcmsgPT0gdW5kZWZpbmVkKSB7XG4gICAgdGhpc1ZhcnMucGx1Z2luRXJyb3JzID0gW11cbiAgICB0aGlzVmFycy5wbHVnaW5FcnJvcnMucHVzaCgnd2VicGFjayBjb25maWc6IGZyYW1ld29yayBwYXJhbWV0ZXIgb24gZXh0LXdlYnBhY2stcGx1Z2luIGlzIG5vdCBkZWZpbmVkIC0gdmFsdWVzOiByZWFjdCwgYW5ndWxhciwgZXh0anMnKVxuICAgIHBsdWdpbi52YXJzID0gdGhpc1ZhcnNcbiAgICByZXR1cm4gcGx1Z2luXG4gIH1cblxuICBjb25zdCB2YWxpZGF0ZU9wdGlvbnMgPSByZXF1aXJlKCdzY2hlbWEtdXRpbHMnKVxuICB2YWxpZGF0ZU9wdGlvbnMocmVxdWlyZShgLi8ke29wdGlvbnMuZnJhbWV3b3JrfVV0aWxgKS5nZXRWYWxpZGF0ZU9wdGlvbnMoKSwgb3B0aW9ucywgJycpXG4gIHRoaXNWYXJzID0gcmVxdWlyZShgLi8ke29wdGlvbnMuZnJhbWV3b3JrfVV0aWxgKS5nZXREZWZhdWx0VmFycygpXG4gIHRoaXNWYXJzLmZyYW1ld29yayA9IG9wdGlvbnMuZnJhbWV3b3JrXG4gIHN3aXRjaCh0aGlzVmFycy5mcmFtZXdvcmspIHtcbiAgICBjYXNlICdleHRqcyc6XG4gICAgICB0aGlzVmFycy5wbHVnaW5OYW1lID0gJ2V4dC13ZWJwYWNrLXBsdWdpbidcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ3JlYWN0JzpcbiAgICAgIHRoaXNWYXJzLnBsdWdpbk5hbWUgPSAnZXh0LXJlYWN0LXdlYnBhY2stcGx1Z2luJ1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnYW5ndWxhcic6XG4gICAgICB0aGlzVmFycy5wbHVnaW5OYW1lID0gJ2V4dC1hbmd1bGFyLXdlYnBhY2stcGx1Z2luJ1xuICAgICAgYnJlYWs7XG4gICAgZGVmYXVsdDpcbiAgICAgIHRoaXNWYXJzLnBsdWdpbk5hbWUgPSAnZXh0LXdlYnBhY2stcGx1Z2luJ1xuICB9XG5cbiAgdGhpc1ZhcnMuYXBwID0gcmVxdWlyZSgnLi9wbHVnaW5VdGlsJykuX2dldEFwcCgpXG4gIGxvZ3Yob3B0aW9ucywgYHBsdWdpbk5hbWUgLSAke3RoaXNWYXJzLnBsdWdpbk5hbWV9YClcbiAgbG9ndihvcHRpb25zLCBgdGhpc1ZhcnMuYXBwIC0gJHt0aGlzVmFycy5hcHB9YClcblxuICBjb25zdCByYyA9IChmcy5leGlzdHNTeW5jKGAuZXh0LSR7dGhpc1ZhcnMuZnJhbWV3b3JrfXJjYCkgJiYgSlNPTi5wYXJzZShmcy5yZWFkRmlsZVN5bmMoYC5leHQtJHt0aGlzVmFycy5mcmFtZXdvcmt9cmNgLCAndXRmLTgnKSkgfHwge30pXG4gIHRoaXNPcHRpb25zID0geyAuLi5yZXF1aXJlKGAuLyR7dGhpc1ZhcnMuZnJhbWV3b3JrfVV0aWxgKS5nZXREZWZhdWx0T3B0aW9ucygpLCAuLi5vcHRpb25zLCAuLi5yYyB9XG4gIGxvZ3Yob3B0aW9ucywgYHRoaXNPcHRpb25zIC0gJHtKU09OLnN0cmluZ2lmeSh0aGlzT3B0aW9ucyl9YClcblxuICBpZiAodGhpc09wdGlvbnMuZW52aXJvbm1lbnQgPT0gJ3Byb2R1Y3Rpb24nKSBcbiAgICB7dGhpc1ZhcnMucHJvZHVjdGlvbiA9IHRydWV9XG4gIGVsc2UgXG4gICAge3RoaXNWYXJzLnByb2R1Y3Rpb24gPSBmYWxzZX1cbiAgbG9ndihvcHRpb25zLCBgdGhpc1ZhcnMgLSAke0pTT04uc3RyaW5naWZ5KHRoaXNWYXJzKX1gKVxuXG4gIGxvZyhyZXF1aXJlKCcuL3BsdWdpblV0aWwnKS5fZ2V0VmVyc2lvbnModGhpc1ZhcnMuYXBwLCB0aGlzVmFycy5wbHVnaW5OYW1lLCB0aGlzVmFycy5mcmFtZXdvcmspKVxuICBsb2codGhpc1ZhcnMuYXBwICsgJ0J1aWxkaW5nIGZvciAnICsgdGhpc09wdGlvbnMuZW52aXJvbm1lbnQpXG4gIGxvZyh0aGlzVmFycy5hcHAgKyAnVHJlZXNoYWtlIGlzICcgKyB0aGlzT3B0aW9ucy50cmVlc2hha2UpXG5cbiAgaWYgKHRoaXNWYXJzLnByb2R1Y3Rpb24gPT0gdHJ1ZSAmJiB0aGlzT3B0aW9ucy50cmVlc2hha2UgPT0gdHJ1ZSAmJiBvcHRpb25zLmZyYW1ld29yayA9PSAnYW5ndWxhcicpIHtcbiAgICByZXF1aXJlKGAuL2FuZ3VsYXJVdGlsYCkuX3RvUHJvZCh0aGlzVmFycywgdGhpc09wdGlvbnMpXG4gIH1cblxuICBwbHVnaW4udmFycyA9IHRoaXNWYXJzXG4gIHBsdWdpbi5vcHRpb25zID0gdGhpc09wdGlvbnNcbiAgcmVxdWlyZSgnLi9wbHVnaW5VdGlsJykubG9ndihvcHRpb25zLCAnRlVOQ1RJT04gY29uc3RydWN0b3IgKGVuZCknKVxuICByZXR1cm4gcGx1Z2luXG59XG5cbi8vKioqKioqKioqKlxuZXhwb3J0IGZ1bmN0aW9uIF9jb21waWxhdGlvbihjb21waWxlciwgY29tcGlsYXRpb24sIHZhcnMsIG9wdGlvbnMpIHtcbiAgdHJ5IHtcbiAgICByZXF1aXJlKCcuL3BsdWdpblV0aWwnKS5sb2d2KG9wdGlvbnMsICdGVU5DVElPTiBfY29tcGlsYXRpb24nKVxuXG4gICAgdmFyIGV4dENvbXBvbmVudHMgPSBbXVxuXG4gICAgaWYgKHZhcnMucHJvZHVjdGlvbikge1xuICAgICAgaWYgKG9wdGlvbnMuZnJhbWV3b3JrID09ICdhbmd1bGFyJyAmJiBvcHRpb25zLnRyZWVzaGFrZSkge1xuICAgICAgICBleHRDb21wb25lbnRzID0gcmVxdWlyZSgnLi9hbmd1bGFyVXRpbCcpLl9nZXRBbGxDb21wb25lbnRzKHZhcnMsIG9wdGlvbnMpXG4gICAgICB9XG5cbiAgICAgIGNvbXBpbGF0aW9uLmhvb2tzLnN1Y2NlZWRNb2R1bGUudGFwKGBleHQtc3VjY2VlZC1tb2R1bGVgLCBtb2R1bGUgPT4ge1xuICAgICAgICAvL3JlcXVpcmUoJy4vcGx1Z2luVXRpbCcpLmxvZ3Yob3B0aW9ucywgJ0hPT0sgc3VjY2VlZE1vZHVsZScpXG4gICAgICAgIGlmIChtb2R1bGUucmVzb3VyY2UgJiYgIW1vZHVsZS5yZXNvdXJjZS5tYXRjaCgvbm9kZV9tb2R1bGVzLykpIHtcbiAgICAgICAgICBpZihtb2R1bGUucmVzb3VyY2UubWF0Y2goL1xcLmh0bWwkLykgIT0gbnVsbCkge1xuICAgICAgICAgICAgaWYobW9kdWxlLl9zb3VyY2UuX3ZhbHVlLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoJ2RvY3R5cGUgaHRtbCcpID09IGZhbHNlKSB7XG4gICAgICAgICAgICAgIHZhcnMuZGVwcyA9IFsuLi4odmFycy5kZXBzIHx8IFtdKSwgLi4ucmVxdWlyZShgLi8ke3ZhcnMuZnJhbWV3b3JrfVV0aWxgKS5leHRyYWN0RnJvbVNvdXJjZShtb2R1bGUsIG9wdGlvbnMsIGNvbXBpbGF0aW9uLCBleHRDb21wb25lbnRzKV1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB2YXJzLmRlcHMgPSBbLi4uKHZhcnMuZGVwcyB8fCBbXSksIC4uLnJlcXVpcmUoYC4vJHt2YXJzLmZyYW1ld29ya31VdGlsYCkuZXh0cmFjdEZyb21Tb3VyY2UobW9kdWxlLCBvcHRpb25zLCBjb21waWxhdGlvbiwgZXh0Q29tcG9uZW50cyldXG5cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gaWYgKGV4dENvbXBvbmVudHMubGVuZ3RoICYmIG1vZHVsZS5yZXNvdXJjZSAmJiAobW9kdWxlLnJlc291cmNlLm1hdGNoKC9cXC4oanx0KXN4PyQvKSB8fFxuICAgICAgICAvLyBvcHRpb25zLmZyYW1ld29yayA9PSAnYW5ndWxhcicgJiYgbW9kdWxlLnJlc291cmNlLm1hdGNoKC9cXC5odG1sJC8pKSAmJlxuICAgICAgICAvLyAhbW9kdWxlLnJlc291cmNlLm1hdGNoKC9ub2RlX21vZHVsZXMvKSAmJiAhbW9kdWxlLnJlc291cmNlLm1hdGNoKGAvZXh0LXskb3B0aW9ucy5mcmFtZXdvcmt9L2J1aWxkL2ApKSB7XG4gICAgICAgIC8vICAgdmFycy5kZXBzID0gWy4uLih2YXJzLmRlcHMgfHwgW10pLCAuLi5yZXF1aXJlKGAuLyR7dmFycy5mcmFtZXdvcmt9VXRpbGApLmV4dHJhY3RGcm9tU291cmNlKG1vZHVsZSwgb3B0aW9ucywgY29tcGlsYXRpb24sIGV4dENvbXBvbmVudHMpXVxuICAgICAgICAvLyB9XG4gICAgICB9KVxuXG4gICAgICBpZiAob3B0aW9ucy5mcmFtZXdvcmsgPT0gJ2FuZ3VsYXInICYmIG9wdGlvbnMudHJlZXNoYWtlID09IHRydWUpIHtcbiAgICAgICAgY29tcGlsYXRpb24uaG9va3MuZmluaXNoTW9kdWxlcy50YXAoYGV4dC1maW5pc2gtbW9kdWxlc2AsIG1vZHVsZXMgPT4ge1xuICAgICAgICAgIHJlcXVpcmUoJy4vcGx1Z2luVXRpbCcpLmxvZ3Yob3B0aW9ucywgJ0hPT0sgZmluaXNoTW9kdWxlcycpXG4gICAgICAgICAgcmVxdWlyZSgnLi9hbmd1bGFyVXRpbCcpLl93cml0ZUZpbGVzVG9Qcm9kRm9sZGVyKHZhcnMsIG9wdGlvbnMpXG4gICAgICAgIH0pXG4gICAgICB9XG5cbiAgICB9XG5cbiAgICBpZiAoXG4gICAgICAob3B0aW9ucy5mcmFtZXdvcmsgPT0gJ2FuZ3VsYXInICYmIG9wdGlvbnMudHJlZXNoYWtlID09IGZhbHNlKSB8fFxuICAgICAgKG9wdGlvbnMuZnJhbWV3b3JrID09ICdyZWFjdCcpXG4gICAgKSB7XG4gICAgICAgIGNvbXBpbGF0aW9uLmhvb2tzLmh0bWxXZWJwYWNrUGx1Z2luQmVmb3JlSHRtbEdlbmVyYXRpb24udGFwKGBleHQtaHRtbC1nZW5lcmF0aW9uYCwoZGF0YSkgPT4ge1xuICAgICAgICBsb2d2KG9wdGlvbnMsJ0hPT0sgZXh0LWh0bWwtZ2VuZXJhdGlvbicpXG4gICAgICAgIGNvbnN0IHBhdGggPSByZXF1aXJlKCdwYXRoJylcbiAgICAgICAgdmFyIG91dHB1dFBhdGggPSAnJ1xuICAgICAgICBpZiAoY29tcGlsZXIub3B0aW9ucy5kZXZTZXJ2ZXIpIHtcbiAgICAgICAgICBpZiAoY29tcGlsZXIub3V0cHV0UGF0aCA9PT0gJy8nKSB7XG4gICAgICAgICAgICBvdXRwdXRQYXRoID0gcGF0aC5qb2luKGNvbXBpbGVyLm9wdGlvbnMuZGV2U2VydmVyLmNvbnRlbnRCYXNlLCBvdXRwdXRQYXRoKVxuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlmIChjb21waWxlci5vcHRpb25zLmRldlNlcnZlci5jb250ZW50QmFzZSA9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgb3V0cHV0UGF0aCA9ICdidWlsZCdcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICBvdXRwdXRQYXRoID0gJydcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgb3V0cHV0UGF0aCA9ICdidWlsZCdcbiAgICAgICAgfVxuICAgICAgICBvdXRwdXRQYXRoID0gb3V0cHV0UGF0aC5yZXBsYWNlKHByb2Nlc3MuY3dkKCksICcnKS50cmltKClcbiAgICAgICAgdmFyIGpzUGF0aCA9IHBhdGguam9pbihvdXRwdXRQYXRoLCB2YXJzLmV4dFBhdGgsICdleHQuanMnKVxuICAgICAgICB2YXIgY3NzUGF0aCA9IHBhdGguam9pbihvdXRwdXRQYXRoLCB2YXJzLmV4dFBhdGgsICdleHQuY3NzJylcbiAgICAgICAgZGF0YS5hc3NldHMuanMudW5zaGlmdChqc1BhdGgpXG4gICAgICAgIGRhdGEuYXNzZXRzLmNzcy51bnNoaWZ0KGNzc1BhdGgpXG4gICAgICAgIGxvZyh2YXJzLmFwcCArIGBBZGRpbmcgJHtqc1BhdGh9IGFuZCAke2Nzc1BhdGh9IHRvIGluZGV4Lmh0bWxgKVxuICAgICAgfSlcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBsb2d2KG9wdGlvbnMsJ3NraXBwZWQgSE9PSyBleHQtaHRtbC1nZW5lcmF0aW9uJylcbiAgICB9XG4gIH1cbiAgY2F0Y2goZSkge1xuICAgIHJlcXVpcmUoJy4vcGx1Z2luVXRpbCcpLmxvZ3Yob3B0aW9ucyxlKVxuICAgIGNvbXBpbGF0aW9uLmVycm9ycy5wdXNoKCdfY29tcGlsYXRpb246ICcgKyBlKVxuICB9XG59XG5cbi8vKioqKioqKioqKlxuZXhwb3J0IGZ1bmN0aW9uIF9hZnRlckNvbXBpbGUoY29tcGlsZXIsIGNvbXBpbGF0aW9uLCB2YXJzLCBvcHRpb25zKSB7XG4gIHJlcXVpcmUoJy4vcGx1Z2luVXRpbCcpLmxvZ3Yob3B0aW9ucywgJ0ZVTkNUSU9OIF9hZnRlckNvbXBpbGUnKVxufVxuXG4vLyoqKioqKioqKipcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBlbWl0KGNvbXBpbGVyLCBjb21waWxhdGlvbiwgdmFycywgb3B0aW9ucywgY2FsbGJhY2spIHtcbiAgdHJ5IHtcbiAgICBjb25zdCBsb2cgPSByZXF1aXJlKCcuL3BsdWdpblV0aWwnKS5sb2dcbiAgICBjb25zdCBsb2d2ID0gcmVxdWlyZSgnLi9wbHVnaW5VdGlsJykubG9ndlxuICAgIGxvZ3Yob3B0aW9ucywnRlVOQ1RJT04gZW1pdCcpXG4gICAgdmFyIGFwcCA9IHZhcnMuYXBwXG4gICAgdmFyIGZyYW1ld29yayA9IHZhcnMuZnJhbWV3b3JrXG4gICAgY29uc3QgcGF0aCA9IHJlcXVpcmUoJ3BhdGgnKVxuICAgIGNvbnN0IF9idWlsZEV4dEJ1bmRsZSA9IHJlcXVpcmUoJy4vcGx1Z2luVXRpbCcpLl9idWlsZEV4dEJ1bmRsZVxuICAgIGxldCBvdXRwdXRQYXRoID0gcGF0aC5qb2luKGNvbXBpbGVyLm91dHB1dFBhdGgsdmFycy5leHRQYXRoKVxuICAgIGlmIChjb21waWxlci5vdXRwdXRQYXRoID09PSAnLycgJiYgY29tcGlsZXIub3B0aW9ucy5kZXZTZXJ2ZXIpIHtcbiAgICAgIG91dHB1dFBhdGggPSBwYXRoLmpvaW4oY29tcGlsZXIub3B0aW9ucy5kZXZTZXJ2ZXIuY29udGVudEJhc2UsIG91dHB1dFBhdGgpXG4gICAgfVxuICAgIGxvZ3Yob3B0aW9ucywnb3V0cHV0UGF0aDogJyArIG91dHB1dFBhdGgpXG4gICAgbG9ndihvcHRpb25zLCdmcmFtZXdvcms6ICcgKyBmcmFtZXdvcmspXG4gICAgaWYgKG9wdGlvbnMuZW1pdCA9PSB0cnVlKSB7XG4gICAgICBpZiAoZnJhbWV3b3JrICE9ICdleHRqcycpIHtcbiAgICAgICAgX3ByZXBhcmVGb3JCdWlsZChhcHAsIHZhcnMsIG9wdGlvbnMsIG91dHB1dFBhdGgsIGNvbXBpbGF0aW9uKVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGlmIChvcHRpb25zLmZyYW1ld29yayA9PSAnYW5ndWxhcicgJiYgb3B0aW9ucy50cmVlc2hha2UgPT0gZmFsc2UpIHtcbiAgICAgICAgICByZXF1aXJlKGAuLyR7ZnJhbWV3b3JrfVV0aWxgKS5fcHJlcGFyZUZvckJ1aWxkKGFwcCwgdmFycywgb3B0aW9ucywgb3V0cHV0UGF0aCwgY29tcGlsYXRpb24pXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgcmVxdWlyZShgLi8ke2ZyYW1ld29ya31VdGlsYCkuX3ByZXBhcmVGb3JCdWlsZChhcHAsIHZhcnMsIG9wdGlvbnMsIG91dHB1dFBhdGgsIGNvbXBpbGF0aW9uKVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHZhciBjb21tYW5kID0gJydcbiAgICAgIGlmIChvcHRpb25zLndhdGNoID09ICd5ZXMnICYmIHZhcnMucHJvZHVjdGlvbiA9PSBmYWxzZSkge1xuICAgICAgICBjb21tYW5kID0gJ3dhdGNoJ1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGNvbW1hbmQgPSAnYnVpbGQnXG4gICAgICB9XG5cbiAgICAgIGlmICh2YXJzLnJlYnVpbGQgPT0gdHJ1ZSkge1xuICAgICAgICB2YXIgcGFybXMgPSBbXVxuICAgICAgICBpZiAob3B0aW9ucy5wcm9maWxlID09IHVuZGVmaW5lZCB8fCBvcHRpb25zLnByb2ZpbGUgPT0gJycgfHwgb3B0aW9ucy5wcm9maWxlID09IG51bGwpIHtcbiAgICAgICAgICBpZiAoY29tbWFuZCA9PSAnYnVpbGQnKSB7XG4gICAgICAgICAgICBwYXJtcyA9IFsnYXBwJywgY29tbWFuZCwgb3B0aW9ucy5lbnZpcm9ubWVudF1cbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBwYXJtcyA9IFsnYXBwJywgY29tbWFuZCwgJy0td2ViLXNlcnZlcicsICdmYWxzZScsIG9wdGlvbnMuZW52aXJvbm1lbnRdXG4gICAgICAgICAgfVxuXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgaWYgKGNvbW1hbmQgPT0gJ2J1aWxkJykge1xuICAgICAgICAgICAgcGFybXMgPSBbJ2FwcCcsIGNvbW1hbmQsIG9wdGlvbnMucHJvZmlsZSwgb3B0aW9ucy5lbnZpcm9ubWVudF1cbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBwYXJtcyA9IFsnYXBwJywgY29tbWFuZCwgJy0td2ViLXNlcnZlcicsICdmYWxzZScsIG9wdGlvbnMucHJvZmlsZSwgb3B0aW9ucy5lbnZpcm9ubWVudF1cbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodmFycy53YXRjaFN0YXJ0ZWQgPT0gZmFsc2UpIHtcbiAgICAgICAgICBhd2FpdCBfYnVpbGRFeHRCdW5kbGUoYXBwLCBjb21waWxhdGlvbiwgb3V0cHV0UGF0aCwgcGFybXMsIG9wdGlvbnMpXG4gICAgICAgICAgdmFycy53YXRjaFN0YXJ0ZWQgPSB0cnVlXG4gICAgICAgIH1cblxuICAgICAgICBjYWxsYmFjaygpXG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgICBjYWxsYmFjaygpXG4gICAgICB9XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgbG9nKGAke3ZhcnMuYXBwfUZVTkNUSU9OIGVtaXQgbm90IHJ1bmApXG4gICAgICBjYWxsYmFjaygpXG4gICAgfVxuICB9XG4gIGNhdGNoKGUpIHtcbiAgICByZXF1aXJlKCcuL3BsdWdpblV0aWwnKS5sb2d2KG9wdGlvbnMsZSlcbiAgICBjb21waWxhdGlvbi5lcnJvcnMucHVzaCgnZW1pdDogJyArIGUpXG4gICAgY2FsbGJhY2soKVxuICB9XG59XG5cbi8vKioqKioqKioqKlxuZXhwb3J0IGZ1bmN0aW9uIF9wcmVwYXJlRm9yQnVpbGQoYXBwLCB2YXJzLCBvcHRpb25zLCBvdXRwdXQsIGNvbXBpbGF0aW9uKSB7XG4gIHRyeSB7XG4gICAgbG9ndihvcHRpb25zLCdGVU5DVElPTiBfcHJlcGFyZUZvckJ1aWxkJylcbiAgICBjb25zdCByaW1yYWYgPSByZXF1aXJlKCdyaW1yYWYnKVxuICAgIGNvbnN0IG1rZGlycCA9IHJlcXVpcmUoJ21rZGlycCcpXG4gICAgY29uc3QgZnN4ID0gcmVxdWlyZSgnZnMtZXh0cmEnKVxuICAgIGNvbnN0IGZzID0gcmVxdWlyZSgnZnMnKVxuICAgIGNvbnN0IHBhdGggPSByZXF1aXJlKCdwYXRoJylcblxuICAgIHZhciBwYWNrYWdlcyA9IG9wdGlvbnMucGFja2FnZXNcbiAgICB2YXIgdG9vbGtpdCA9IG9wdGlvbnMudG9vbGtpdFxuICAgIHZhciB0aGVtZSA9IG9wdGlvbnMudGhlbWVcblxuICAgIHRoZW1lID0gdGhlbWUgfHwgKHRvb2xraXQgPT09ICdjbGFzc2ljJyA/ICd0aGVtZS10cml0b24nIDogJ3RoZW1lLW1hdGVyaWFsJylcbiAgICBsb2d2KG9wdGlvbnMsJ2ZpcnN0VGltZTogJyArIHZhcnMuZmlyc3RUaW1lKVxuICAgIGlmICh2YXJzLmZpcnN0VGltZSkge1xuICAgICAgcmltcmFmLnN5bmMob3V0cHV0KVxuICAgICAgbWtkaXJwLnN5bmMob3V0cHV0KVxuICAgICAgY29uc3QgYnVpbGRYTUwgPSByZXF1aXJlKCcuL2FydGlmYWN0cycpLmJ1aWxkWE1MXG4gICAgICBjb25zdCBjcmVhdGVBcHBKc29uID0gcmVxdWlyZSgnLi9hcnRpZmFjdHMnKS5jcmVhdGVBcHBKc29uXG4gICAgICBjb25zdCBjcmVhdGVXb3Jrc3BhY2VKc29uID0gcmVxdWlyZSgnLi9hcnRpZmFjdHMnKS5jcmVhdGVXb3Jrc3BhY2VKc29uXG4gICAgICBjb25zdCBjcmVhdGVKU0RPTUVudmlyb25tZW50ID0gcmVxdWlyZSgnLi9hcnRpZmFjdHMnKS5jcmVhdGVKU0RPTUVudmlyb25tZW50XG5cbiAgICAgIGZzLndyaXRlRmlsZVN5bmMocGF0aC5qb2luKG91dHB1dCwgJ2J1aWxkLnhtbCcpLCBidWlsZFhNTCh2YXJzLnByb2R1Y3Rpb24sIG9wdGlvbnMsIG91dHB1dCksICd1dGY4JylcbiAgICAgIGZzLndyaXRlRmlsZVN5bmMocGF0aC5qb2luKG91dHB1dCwgJ2FwcC5qc29uJyksIGNyZWF0ZUFwcEpzb24odGhlbWUsIHBhY2thZ2VzLCB0b29sa2l0LCBvcHRpb25zLCBvdXRwdXQpLCAndXRmOCcpXG4gICAgICBmcy53cml0ZUZpbGVTeW5jKHBhdGguam9pbihvdXRwdXQsICdqc2RvbS1lbnZpcm9ubWVudC5qcycpLCBjcmVhdGVKU0RPTUVudmlyb25tZW50KG9wdGlvbnMsIG91dHB1dCksICd1dGY4JylcbiAgICAgIGZzLndyaXRlRmlsZVN5bmMocGF0aC5qb2luKG91dHB1dCwgJ3dvcmtzcGFjZS5qc29uJyksIGNyZWF0ZVdvcmtzcGFjZUpzb24ob3B0aW9ucywgb3V0cHV0KSwgJ3V0ZjgnKVxuXG4gICAgICB2YXIgZnJhbWV3b3JrID0gdmFycy5mcmFtZXdvcms7XG4gICAgICAvL2JlY2F1c2Ugb2YgYSBwcm9ibGVtIHdpdGggY29sb3JwaWNrZXJcbiAgICAgIGlmIChmcy5leGlzdHNTeW5jKHBhdGguam9pbihwcm9jZXNzLmN3ZCgpLGBleHQtJHtmcmFtZXdvcmt9L3V4L2ApKSkge1xuICAgICAgICB2YXIgZnJvbVBhdGggPSBwYXRoLmpvaW4ocHJvY2Vzcy5jd2QoKSwgYGV4dC0ke2ZyYW1ld29ya30vdXgvYClcbiAgICAgICAgdmFyIHRvUGF0aCA9IHBhdGguam9pbihvdXRwdXQsICd1eCcpXG4gICAgICAgIGZzeC5jb3B5U3luYyhmcm9tUGF0aCwgdG9QYXRoKVxuICAgICAgICBsb2coYXBwICsgJ0NvcHlpbmcgKHV4KSAnICsgZnJvbVBhdGgucmVwbGFjZShwcm9jZXNzLmN3ZCgpLCAnJykgKyAnIHRvOiAnICsgdG9QYXRoLnJlcGxhY2UocHJvY2Vzcy5jd2QoKSwgJycpKVxuICAgICAgfVxuICAgICAgaWYgKGZzLmV4aXN0c1N5bmMocGF0aC5qb2luKHByb2Nlc3MuY3dkKCksYGV4dC0ke2ZyYW1ld29ya30vcGFja2FnZXMvYCkpKSB7XG4gICAgICAgIHZhciBmcm9tUGF0aCA9IHBhdGguam9pbihwcm9jZXNzLmN3ZCgpLCBgZXh0LSR7ZnJhbWV3b3JrfS9wYWNrYWdlcy9gKVxuICAgICAgICB2YXIgdG9QYXRoID0gcGF0aC5qb2luKG91dHB1dCwgJ3BhY2thZ2VzJylcbiAgICAgICAgZnN4LmNvcHlTeW5jKGZyb21QYXRoLCB0b1BhdGgpXG4gICAgICAgIGxvZyhhcHAgKyAnQ29weWluZyAnICsgZnJvbVBhdGgucmVwbGFjZShwcm9jZXNzLmN3ZCgpLCAnJykgKyAnIHRvOiAnICsgdG9QYXRoLnJlcGxhY2UocHJvY2Vzcy5jd2QoKSwgJycpKVxuICAgICAgfVxuICAgICAgaWYgKGZzLmV4aXN0c1N5bmMocGF0aC5qb2luKHByb2Nlc3MuY3dkKCksYGV4dC0ke2ZyYW1ld29ya30vb3ZlcnJpZGVzL2ApKSkge1xuICAgICAgICB2YXIgZnJvbVBhdGggPSBwYXRoLmpvaW4ocHJvY2Vzcy5jd2QoKSwgYGV4dC0ke2ZyYW1ld29ya30vb3ZlcnJpZGVzL2ApXG4gICAgICAgIHZhciB0b1BhdGggPSBwYXRoLmpvaW4ob3V0cHV0LCAnb3ZlcnJpZGVzJylcbiAgICAgICAgZnN4LmNvcHlTeW5jKGZyb21QYXRoLCB0b1BhdGgpXG4gICAgICAgIGxvZyhhcHAgKyAnQ29weWluZyAnICsgZnJvbVBhdGgucmVwbGFjZShwcm9jZXNzLmN3ZCgpLCAnJykgKyAnIHRvOiAnICsgdG9QYXRoLnJlcGxhY2UocHJvY2Vzcy5jd2QoKSwgJycpKVxuICAgICAgfVxuICAgICAgaWYgKGZzLmV4aXN0c1N5bmMocGF0aC5qb2luKHByb2Nlc3MuY3dkKCksJ3Jlc291cmNlcy8nKSkpIHtcbiAgICAgICAgdmFyIGZyb21SZXNvdXJjZXMgPSBwYXRoLmpvaW4ocHJvY2Vzcy5jd2QoKSwgJ3Jlc291cmNlcy8nKVxuICAgICAgICB2YXIgdG9SZXNvdXJjZXMgPSBwYXRoLmpvaW4ob3V0cHV0LCAnLi4vcmVzb3VyY2VzJylcbiAgICAgICAgZnN4LmNvcHlTeW5jKGZyb21SZXNvdXJjZXMsIHRvUmVzb3VyY2VzKVxuICAgICAgICBsb2coYXBwICsgJ0NvcHlpbmcgJyArIGZyb21SZXNvdXJjZXMucmVwbGFjZShwcm9jZXNzLmN3ZCgpLCAnJykgKyAnIHRvOiAnICsgdG9SZXNvdXJjZXMucmVwbGFjZShwcm9jZXNzLmN3ZCgpLCAnJykpXG4gICAgICB9XG4gICAgfVxuICAgIHZhcnMuZmlyc3RUaW1lID0gZmFsc2VcbiAgICB2YXIganMgPSAnJ1xuICAgIGlmICh2YXJzLnByb2R1Y3Rpb24pIHtcbiAgICAgIGpzID0gdmFycy5kZXBzLmpvaW4oJztcXG4nKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBqcyA9ICdFeHQucmVxdWlyZShcIkV4dC4qXCIpJ1xuICAgIH1cbiAgICBpZiAodmFycy5tYW5pZmVzdCA9PT0gbnVsbCB8fCBqcyAhPT0gdmFycy5tYW5pZmVzdCkge1xuICAgICAgdmFycy5tYW5pZmVzdCA9IGpzXG4gICAgICBjb25zdCBtYW5pZmVzdCA9IHBhdGguam9pbihvdXRwdXQsICdtYW5pZmVzdC5qcycpXG4gICAgICBmcy53cml0ZUZpbGVTeW5jKG1hbmlmZXN0LCBqcywgJ3V0ZjgnKVxuICAgICAgdmFycy5yZWJ1aWxkID0gdHJ1ZVxuICAgICAgdmFyIGJ1bmRsZURpciA9IG91dHB1dC5yZXBsYWNlKHByb2Nlc3MuY3dkKCksICcnKVxuICAgICAgaWYgKGJ1bmRsZURpci50cmltKCkgPT0gJycpIHtidW5kbGVEaXIgPSAnLi8nfVxuICAgICAgbG9nKGFwcCArICdCdWlsZGluZyBFeHQgYnVuZGxlIGF0OiAnICsgYnVuZGxlRGlyKVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHZhcnMucmVidWlsZCA9IGZhbHNlXG4gICAgICBsb2coYXBwICsgJ0V4dCByZWJ1aWxkIE5PVCBuZWVkZWQnKVxuICAgIH1cbiAgfVxuICBjYXRjaChlKSB7XG4gICAgcmVxdWlyZSgnLi9wbHVnaW5VdGlsJykubG9ndihvcHRpb25zLGUpXG4gICAgY29tcGlsYXRpb24uZXJyb3JzLnB1c2goJ19wcmVwYXJlRm9yQnVpbGQ6ICcgKyBlKVxuICB9XG59XG5cbi8vKioqKioqKioqKlxuZXhwb3J0IGZ1bmN0aW9uIF9idWlsZEV4dEJ1bmRsZShhcHAsIGNvbXBpbGF0aW9uLCBvdXRwdXRQYXRoLCBwYXJtcywgb3B0aW9ucykge1xuICB0cnkge1xuICAgIGNvbnN0IGZzID0gcmVxdWlyZSgnZnMnKVxuICAgIGNvbnN0IGxvZ3YgPSByZXF1aXJlKCcuL3BsdWdpblV0aWwnKS5sb2d2XG4gICAgbG9ndihvcHRpb25zLCdGVU5DVElPTiBfYnVpbGRFeHRCdW5kbGUnKVxuXG4gICAgbGV0IHNlbmNoYTsgdHJ5IHsgc2VuY2hhID0gcmVxdWlyZSgnQHNlbmNoYS9jbWQnKSB9IGNhdGNoIChlKSB7IHNlbmNoYSA9ICdzZW5jaGEnIH1cbiAgICBpZiAoZnMuZXhpc3RzU3luYyhzZW5jaGEpKSB7XG4gICAgICBsb2d2KG9wdGlvbnMsJ3NlbmNoYSBmb2xkZXIgZXhpc3RzJylcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBsb2d2KG9wdGlvbnMsJ3NlbmNoYSBmb2xkZXIgRE9FUyBOT1QgZXhpc3QnKVxuICAgIH1cblxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBjb25zdCBvbkJ1aWxkRG9uZSA9ICgpID0+IHtcbiAgICAgICAgbG9ndihvcHRpb25zLCdvbkJ1aWxkRG9uZScpXG4gICAgICAgIHJlc29sdmUoKVxuICAgICAgfVxuXG4gICAgICB2YXIgb3B0cyA9IHsgY3dkOiBvdXRwdXRQYXRoLCBzaWxlbnQ6IHRydWUsIHN0ZGlvOiAncGlwZScsIGVuY29kaW5nOiAndXRmLTgnfVxuICAgICAgZXhlY3V0ZUFzeW5jKGFwcCwgc2VuY2hhLCBwYXJtcywgb3B0cywgY29tcGlsYXRpb24sIG9wdGlvbnMpLnRoZW4gKFxuICAgICAgICBmdW5jdGlvbigpIHsgb25CdWlsZERvbmUoKSB9LCBcbiAgICAgICAgZnVuY3Rpb24ocmVhc29uKSB7IHJlamVjdChyZWFzb24pIH1cbiAgICAgIClcbiAgICB9KVxuICB9XG4gIGNhdGNoKGUpIHtcbiAgICBjb25zb2xlLmxvZygnZScpXG4gICAgcmVxdWlyZSgnLi9wbHVnaW5VdGlsJykubG9ndihvcHRpb25zLGUpXG4gICAgY29tcGlsYXRpb24uZXJyb3JzLnB1c2goJ19idWlsZEV4dEJ1bmRsZTogJyArIGUpXG4gICAgY2FsbGJhY2soKVxuICB9XG59XG5cbi8vKioqKioqKioqKlxuZXhwb3J0IGZ1bmN0aW9uIF9kb25lKHZhcnMsIG9wdGlvbnMpIHtcbiAgdHJ5IHtcbiAgICBjb25zdCBsb2cgPSByZXF1aXJlKCcuL3BsdWdpblV0aWwnKS5sb2dcbiAgICBjb25zdCBsb2d2ID0gcmVxdWlyZSgnLi9wbHVnaW5VdGlsJykubG9ndlxuICAgIGxvZ3Yob3B0aW9ucywnRlVOQ1RJT04gX2RvbmUnKVxuXG5cbiAgICBpZiAodmFycy5wcm9kdWN0aW9uID09IHRydWUgJiYgb3B0aW9ucy50cmVlc2hha2UgPT0gZmFsc2UgJiYgb3B0aW9ucy5mcmFtZXdvcmsgPT0gJ2FuZ3VsYXInKSB7XG4gICAgICByZXF1aXJlKGAuLyR7b3B0aW9ucy5mcmFtZXdvcmt9VXRpbGApLl90b0Rldih2YXJzLCBvcHRpb25zKVxuICAgIH1cblxuXG4gICAgdHJ5IHtcbiAgICAgIGlmKG9wdGlvbnMuYnJvd3NlciA9PSB0cnVlICYmIG9wdGlvbnMud2F0Y2ggPT0gJ3llcycgJiYgdmFycy5wcm9kdWN0aW9uID09IGZhbHNlKSB7XG4gICAgICAgIGlmICh2YXJzLmJyb3dzZXJDb3VudCA9PSAwKSB7XG4gICAgICAgICAgdmFyIHVybCA9ICdodHRwOi8vbG9jYWxob3N0OicgKyBvcHRpb25zLnBvcnRcbiAgICAgICAgICByZXF1aXJlKCcuL3BsdWdpblV0aWwnKS5sb2codmFycy5hcHAgKyBgT3BlbmluZyBicm93c2VyIGF0ICR7dXJsfWApXG4gICAgICAgICAgdmFycy5icm93c2VyQ291bnQrK1xuICAgICAgICAgIGNvbnN0IG9wbiA9IHJlcXVpcmUoJ29wbicpXG4gICAgICAgICAgb3BuKHVybClcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBjYXRjaCAoZSkge1xuICAgICAgY29uc29sZS5sb2coZSlcbiAgICAgIC8vY29tcGlsYXRpb24uZXJyb3JzLnB1c2goJ3Nob3cgYnJvd3NlciB3aW5kb3cgLSBleHQtZG9uZTogJyArIGUpXG4gICAgfVxuICB9XG4gIGNhdGNoKGUpIHtcbiAgICByZXF1aXJlKCcuL3BsdWdpblV0aWwnKS5sb2d2KG9wdGlvbnMsZSlcbiAgfVxufVxuXG4vLyoqKioqKioqKipcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBleGVjdXRlQXN5bmMgKGFwcCwgY29tbWFuZCwgcGFybXMsIG9wdHMsIGNvbXBpbGF0aW9uLCBvcHRpb25zKSB7XG4gIFxuICB0cnkge1xuICAgIC8vY29uc3QgREVGQVVMVF9TVUJTVFJTID0gWydbSU5GXSBMb2FkaW5nJywgJ1tJTkZdIFByb2Nlc3NpbmcnLCAnW0xPR10gRmFzaGlvbiBidWlsZCBjb21wbGV0ZScsICdbRVJSXScsICdbV1JOXScsIFwiW0lORl0gU2VydmVyXCIsIFwiW0lORl0gV3JpdGluZ1wiLCBcIltJTkZdIExvYWRpbmcgQnVpbGRcIiwgXCJbSU5GXSBXYWl0aW5nXCIsIFwiW0xPR10gRmFzaGlvbiB3YWl0aW5nXCJdO1xuICAgIGNvbnN0IERFRkFVTFRfU1VCU1RSUyA9IFtcIltJTkZdIHhTZXJ2ZXJcIiwgJ1tJTkZdIExvYWRpbmcnLCAnW0lORl0gQXBwZW5kJywgJ1tJTkZdIFByb2Nlc3NpbmcnLCAnW0lORl0gUHJvY2Vzc2luZyBCdWlsZCcsICdbTE9HXSBGYXNoaW9uIGJ1aWxkIGNvbXBsZXRlJywgJ1tFUlJdJywgJ1tXUk5dJywgXCJbSU5GXSBXcml0aW5nXCIsIFwiW0lORl0gTG9hZGluZyBCdWlsZFwiLCBcIltJTkZdIFdhaXRpbmdcIiwgXCJbTE9HXSBGYXNoaW9uIHdhaXRpbmdcIl07XG4gICAgdmFyIHN1YnN0cmluZ3MgPSBERUZBVUxUX1NVQlNUUlMgXG4gICAgdmFyIGNoYWxrID0gcmVxdWlyZSgnY2hhbGsnKVxuICAgIGNvbnN0IGNyb3NzU3Bhd24gPSByZXF1aXJlKCdjcm9zcy1zcGF3bicpXG4gICAgY29uc3QgbG9nID0gcmVxdWlyZSgnLi9wbHVnaW5VdGlsJykubG9nXG4gICAgbG9ndihvcHRpb25zLCAnRlVOQ1RJT04gZXhlY3V0ZUFzeW5jJylcbiAgICBhd2FpdCBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBsb2d2KG9wdGlvbnMsYGNvbW1hbmQgLSAke2NvbW1hbmR9YClcbiAgICAgIGxvZ3Yob3B0aW9ucywgYHBhcm1zIC0gJHtwYXJtc31gKVxuICAgICAgbG9ndihvcHRpb25zLCBgb3B0cyAtICR7SlNPTi5zdHJpbmdpZnkob3B0cyl9YClcbiAgICAgIGxldCBjaGlsZCA9IGNyb3NzU3Bhd24oY29tbWFuZCwgcGFybXMsIG9wdHMpXG4gICAgICBjaGlsZC5vbignY2xvc2UnLCAoY29kZSwgc2lnbmFsKSA9PiB7XG4gICAgICAgIGxvZ3Yob3B0aW9ucywgYG9uIGNsb3NlOiBgICsgY29kZSkgXG4gICAgICAgIGlmKGNvZGUgPT09IDApIHsgcmVzb2x2ZSgwKSB9XG4gICAgICAgIGVsc2UgeyBjb21waWxhdGlvbi5lcnJvcnMucHVzaCggbmV3IEVycm9yKGNvZGUpICk7IHJlc29sdmUoMCkgfVxuICAgICAgfSlcbiAgICAgIGNoaWxkLm9uKCdlcnJvcicsIChlcnJvcikgPT4geyBcbiAgICAgICAgbG9ndihvcHRpb25zLCBgb24gZXJyb3JgKSBcbiAgICAgICAgY29tcGlsYXRpb24uZXJyb3JzLnB1c2goZXJyb3IpXG4gICAgICAgIHJlc29sdmUoMClcbiAgICAgIH0pXG4gICAgICBjaGlsZC5zdGRvdXQub24oJ2RhdGEnLCAoZGF0YSkgPT4ge1xuICAgICAgICB2YXIgc3RyID0gZGF0YS50b1N0cmluZygpLnJlcGxhY2UoL1xccj9cXG58XFxyL2csIFwiIFwiKS50cmltKClcbiAgICAgICAgbG9ndihvcHRpb25zLCBgJHtzdHJ9YClcbiAgICAgICAgaWYgKGRhdGEgJiYgZGF0YS50b1N0cmluZygpLm1hdGNoKC9GYXNoaW9uIHdhaXRpbmcgZm9yIGNoYW5nZXNcXC5cXC5cXC4vKSkge1xuICAgICAgICAgIGNvbnN0IGZzID0gcmVxdWlyZSgnZnMnKTtcbiAgICAgICAgICB2YXIgZmlsZW5hbWUgPSBwcm9jZXNzLmN3ZCgpKycvc3JjL2luZGV4LmpzJztcbiAgICAgICAgICB2YXIgZGF0YSA9IGZzLnJlYWRGaWxlU3luYyhmaWxlbmFtZSk7XG4gICAgICAgICAgZnMud3JpdGVGaWxlU3luYyhmaWxlbmFtZSwgZGF0YSArICcgJywgJ3V0ZjgnKVxuICAgICAgICAgIGxvZ3Yob3B0aW9ucywgYHRvdWNoaW5nICR7ZmlsZW5hbWV9YClcbiAgICAgICAgICByZXNvbHZlKDApXG4gICAgICAgIH1cbiAgICAgICAgLy8gaWYgKGRhdGEgJiYgZGF0YS50b1N0cmluZygpLm1hdGNoKC93YWl0aW5nIGZvciBjaGFuZ2VzXFwuXFwuXFwuLykpIHtcbiAgICAgICAgLy8gICByZXNvbHZlKDApXG4gICAgICAgIC8vIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgaWYgKHN1YnN0cmluZ3Muc29tZShmdW5jdGlvbih2KSB7IHJldHVybiBkYXRhLmluZGV4T2YodikgPj0gMDsgfSkpIHsgXG4gICAgICAgICAgICBzdHIgPSBzdHIucmVwbGFjZShcIltJTkZdXCIsIFwiXCIpXG4gICAgICAgICAgICBzdHIgPSBzdHIucmVwbGFjZShcIltMT0ddXCIsIFwiXCIpXG4gICAgICAgICAgICBzdHIgPSBzdHIucmVwbGFjZShwcm9jZXNzLmN3ZCgpLCAnJykudHJpbSgpXG4gICAgICAgICAgICBpZiAoc3RyLmluY2x1ZGVzKFwiW0VSUl1cIikpIHtcbiAgICAgICAgICAgICAgY29tcGlsYXRpb24uZXJyb3JzLnB1c2goYXBwICsgc3RyLnJlcGxhY2UoL15cXFtFUlJcXF0gL2dpLCAnJykpO1xuICAgICAgICAgICAgICBzdHIgPSBzdHIucmVwbGFjZShcIltFUlJdXCIsIGAke2NoYWxrLnJlZChcIltFUlJdXCIpfWApXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsb2coYCR7YXBwfSR7c3RyfWApIFxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIGNoaWxkLnN0ZGVyci5vbignZGF0YScsIChkYXRhKSA9PiB7XG4gICAgICAgIGxvZ3Yob3B0aW9ucywgYGVycm9yIG9uIGNsb3NlOiBgICsgZGF0YSkgXG4gICAgICAgIHZhciBzdHIgPSBkYXRhLnRvU3RyaW5nKCkucmVwbGFjZSgvXFxyP1xcbnxcXHIvZywgXCIgXCIpLnRyaW0oKVxuICAgICAgICB2YXIgc3RySmF2YU9wdHMgPSBcIlBpY2tlZCB1cCBfSkFWQV9PUFRJT05TXCI7XG4gICAgICAgIHZhciBpbmNsdWRlcyA9IHN0ci5pbmNsdWRlcyhzdHJKYXZhT3B0cylcbiAgICAgICAgaWYgKCFpbmNsdWRlcykge1xuICAgICAgICAgIGNvbnNvbGUubG9nKGAke2FwcH0gJHtjaGFsay5yZWQoXCJbRVJSXVwiKX0gJHtzdHJ9YClcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9KVxuICB9XG4gIGNhdGNoKGUpIHtcbiAgICByZXF1aXJlKCcuL3BsdWdpblV0aWwnKS5sb2d2KG9wdGlvbnMsZSlcbiAgICBjb21waWxhdGlvbi5lcnJvcnMucHVzaCgnZXhlY3V0ZUFzeW5jOiAnICsgZSlcbiAgICBjYWxsYmFjaygpXG4gIH0gXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBsb2cocykge1xuICByZXF1aXJlKCdyZWFkbGluZScpLmN1cnNvclRvKHByb2Nlc3Muc3Rkb3V0LCAwKVxuICB0cnkge1xuICAgIHByb2Nlc3Muc3Rkb3V0LmNsZWFyTGluZSgpXG4gIH1cbiAgY2F0Y2goZSkge31cbiAgcHJvY2Vzcy5zdGRvdXQud3JpdGUocylcbiAgcHJvY2Vzcy5zdGRvdXQud3JpdGUoJ1xcbicpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBsb2d2KG9wdGlvbnMsIHMpIHtcbiAgaWYgKG9wdGlvbnMudmVyYm9zZSA9PSAneWVzJykge1xuICAgIHJlcXVpcmUoJ3JlYWRsaW5lJykuY3Vyc29yVG8ocHJvY2Vzcy5zdGRvdXQsIDApXG4gICAgdHJ5IHtcbiAgICAgIHByb2Nlc3Muc3Rkb3V0LmNsZWFyTGluZSgpXG4gICAgfVxuICAgIGNhdGNoKGUpIHt9XG4gICAgcHJvY2Vzcy5zdGRvdXQud3JpdGUoYC12ZXJib3NlOiAke3N9YClcbiAgICBwcm9jZXNzLnN0ZG91dC53cml0ZSgnXFxuJylcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gX2dldEFwcCgpIHtcbiAgdmFyIGNoYWxrID0gcmVxdWlyZSgnY2hhbGsnKVxuICB2YXIgcHJlZml4ID0gYGBcbiAgY29uc3QgcGxhdGZvcm0gPSByZXF1aXJlKCdvcycpLnBsYXRmb3JtKClcbiAgaWYgKHBsYXRmb3JtID09ICdkYXJ3aW4nKSB7IHByZWZpeCA9IGDihLkg772iZXh0772jOmAgfVxuICBlbHNlIHsgcHJlZml4ID0gYGkgW2V4dF06YCB9XG4gIHJldHVybiBgJHtjaGFsay5ncmVlbihwcmVmaXgpfSBgXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfZ2V0VmVyc2lvbnMoYXBwLCBwbHVnaW5OYW1lLCBmcmFtZXdvcmtOYW1lKSB7XG4gIGNvbnN0IHBhdGggPSByZXF1aXJlKCdwYXRoJylcbiAgY29uc3QgZnMgPSByZXF1aXJlKCdmcycpXG5cbiAgdmFyIHYgPSB7fVxuICB2YXIgcGx1Z2luUGF0aCA9IHBhdGgucmVzb2x2ZShwcm9jZXNzLmN3ZCgpLCdub2RlX21vZHVsZXMvQHNlbmNoYScsIHBsdWdpbk5hbWUpXG4gIHZhciBwbHVnaW5Qa2cgPSAoZnMuZXhpc3RzU3luYyhwbHVnaW5QYXRoKycvcGFja2FnZS5qc29uJykgJiYgSlNPTi5wYXJzZShmcy5yZWFkRmlsZVN5bmMocGx1Z2luUGF0aCsnL3BhY2thZ2UuanNvbicsICd1dGYtOCcpKSB8fCB7fSk7XG4gIHYucGx1Z2luVmVyc2lvbiA9IHBsdWdpblBrZy52ZXJzaW9uXG4gIHYuX3Jlc29sdmVkID0gcGx1Z2luUGtnLl9yZXNvbHZlZFxuICBpZiAodi5fcmVzb2x2ZWQgPT0gdW5kZWZpbmVkKSB7XG4gICAgdi5lZGl0aW9uID0gYENvbW1lcmNpYWxgXG4gIH1cbiAgZWxzZSB7XG4gICAgaWYgKC0xID09IHYuX3Jlc29sdmVkLmluZGV4T2YoJ2NvbW11bml0eScpKSB7XG4gICAgICB2LmVkaXRpb24gPSBgQ29tbWVyY2lhbGBcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICB2LmVkaXRpb24gPSBgQ29tbXVuaXR5YFxuICAgIH1cbiAgfVxuXG4gIHZhciB3ZWJwYWNrUGF0aCA9IHBhdGgucmVzb2x2ZShwcm9jZXNzLmN3ZCgpLCdub2RlX21vZHVsZXMvd2VicGFjaycpXG4gIHZhciB3ZWJwYWNrUGtnID0gKGZzLmV4aXN0c1N5bmMod2VicGFja1BhdGgrJy9wYWNrYWdlLmpzb24nKSAmJiBKU09OLnBhcnNlKGZzLnJlYWRGaWxlU3luYyh3ZWJwYWNrUGF0aCsnL3BhY2thZ2UuanNvbicsICd1dGYtOCcpKSB8fCB7fSk7XG4gIHYud2VicGFja1ZlcnNpb24gPSB3ZWJwYWNrUGtnLnZlcnNpb25cblxuICB2YXIgZXh0UGF0aCA9IHBhdGgucmVzb2x2ZShwcm9jZXNzLmN3ZCgpLCdub2RlX21vZHVsZXMvQHNlbmNoYS9leHQnKVxuICB2YXIgZXh0UGtnID0gKGZzLmV4aXN0c1N5bmMoZXh0UGF0aCsnL3BhY2thZ2UuanNvbicpICYmIEpTT04ucGFyc2UoZnMucmVhZEZpbGVTeW5jKGV4dFBhdGgrJy9wYWNrYWdlLmpzb24nLCAndXRmLTgnKSkgfHwge30pO1xuICB2LmV4dFZlcnNpb24gPSBleHRQa2cuc2VuY2hhLnZlcnNpb25cblxuICB2YXIgY21kUGF0aCA9IHBhdGgucmVzb2x2ZShwcm9jZXNzLmN3ZCgpLGBub2RlX21vZHVsZXMvQHNlbmNoYS9jbWRgKVxuICB2YXIgY21kUGtnID0gKGZzLmV4aXN0c1N5bmMoY21kUGF0aCsnL3BhY2thZ2UuanNvbicpICYmIEpTT04ucGFyc2UoZnMucmVhZEZpbGVTeW5jKGNtZFBhdGgrJy9wYWNrYWdlLmpzb24nLCAndXRmLTgnKSkgfHwge30pO1xuICB2LmNtZFZlcnNpb24gPSBjbWRQa2cudmVyc2lvbl9mdWxsXG5cbiAgaWYgKHYuY21kVmVyc2lvbiA9PSB1bmRlZmluZWQpIHtcbiAgICB2YXIgY21kUGF0aCA9IHBhdGgucmVzb2x2ZShwcm9jZXNzLmN3ZCgpLGBub2RlX21vZHVsZXMvQHNlbmNoYS8ke3BsdWdpbk5hbWV9L25vZGVfbW9kdWxlcy9Ac2VuY2hhL2NtZGApXG4gICAgdmFyIGNtZFBrZyA9IChmcy5leGlzdHNTeW5jKGNtZFBhdGgrJy9wYWNrYWdlLmpzb24nKSAmJiBKU09OLnBhcnNlKGZzLnJlYWRGaWxlU3luYyhjbWRQYXRoKycvcGFja2FnZS5qc29uJywgJ3V0Zi04JykpIHx8IHt9KTtcbiAgICB2LmNtZFZlcnNpb24gPSBjbWRQa2cudmVyc2lvbl9mdWxsXG4gIH1cblxuICB2YXIgZnJhbWV3b3JrSW5mbyA9ICcnXG4gICBpZiAoZnJhbWV3b3JrTmFtZSAhPSB1bmRlZmluZWQgJiYgZnJhbWV3b3JrTmFtZSAhPSAnZXh0anMnKSB7XG4gICAgdmFyIGZyYW1ld29ya1BhdGggPSAnJ1xuICAgIGlmIChmcmFtZXdvcmtOYW1lID09ICdyZWFjdCcpIHtcbiAgICAgIGZyYW1ld29ya1BhdGggPSBwYXRoLnJlc29sdmUocHJvY2Vzcy5jd2QoKSwnbm9kZV9tb2R1bGVzL3JlYWN0JylcbiAgICB9XG4gICAgaWYgKGZyYW1ld29ya05hbWUgPT0gJ2FuZ3VsYXInKSB7XG4gICAgICBmcmFtZXdvcmtQYXRoID0gcGF0aC5yZXNvbHZlKHByb2Nlc3MuY3dkKCksJ25vZGVfbW9kdWxlcy9AYW5ndWxhci9jb3JlJylcbiAgICB9XG4gICAgdmFyIGZyYW1ld29ya1BrZyA9IChmcy5leGlzdHNTeW5jKGZyYW1ld29ya1BhdGgrJy9wYWNrYWdlLmpzb24nKSAmJiBKU09OLnBhcnNlKGZzLnJlYWRGaWxlU3luYyhmcmFtZXdvcmtQYXRoKycvcGFja2FnZS5qc29uJywgJ3V0Zi04JykpIHx8IHt9KTtcbiAgICB2LmZyYW1ld29ya1ZlcnNpb24gPSBmcmFtZXdvcmtQa2cudmVyc2lvblxuICAgIGZyYW1ld29ya0luZm8gPSAnLCAnICsgZnJhbWV3b3JrTmFtZSArICcgdicgKyB2LmZyYW1ld29ya1ZlcnNpb25cbiAgfVxuICByZXR1cm4gYXBwICsgJ2V4dC13ZWJwYWNrLXBsdWdpbiB2JyArIHYucGx1Z2luVmVyc2lvbiArICcsIEV4dCBKUyB2JyArIHYuZXh0VmVyc2lvbiArICcgJyArIHYuZWRpdGlvbiArICcgRWRpdGlvbiwgU2VuY2hhIENtZCB2JyArIHYuY21kVmVyc2lvbiArICcsIHdlYnBhY2sgdicgKyB2LndlYnBhY2tWZXJzaW9uICsgZnJhbWV3b3JrSW5mb1xuIH0iXX0=