"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports._constructor = _constructor;
exports._compilation = _compilation;
exports.emit = emit;
exports._prepareForBuild = _prepareForBuild;
exports._buildExtBundle = _buildExtBundle;
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

  const fs = require('fs');

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
  plugin.vars = thisVars;
  plugin.options = thisOptions;
  return plugin;
} //**********


function _compilation(compiler, compilation, vars, options) {
  try {
    require('./pluginUtil').logv(options, 'FUNCTION _compilation');

    if (vars.production) {
      logv(options, `ext-compilation: production is ` + vars.production);
      compilation.hooks.succeedModule.tap(`ext-succeed-module`, module => {
        if (module.resource && module.resource.match(/\.(j|t)sx?$/) && !module.resource.match(/node_modules/) && !module.resource.match(`/ext-{$options.framework}/dist/`) && !module.resource.match(`/ext-${options.framework}-${options.toolkit}/`)) {
          vars.deps = [...(vars.deps || []), ...require(`./${vars.framework}Util`).extractFromSource(module, options, compilation)];
        }
      });
    } else {
      logv(options, `ext-compilation: production is ` + vars.production);
    }

    if (options.framework != 'angular') {
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


function emit(_x, _x2, _x3, _x4, _x5) {
  return _emit.apply(this, arguments);
} //**********


function _emit() {
  _emit = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(compiler, compilation, vars, options, callback) {
    var log, logv, app, framework, path, _buildExtBundle, outputPath, command, parms, url, opn;

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
            _context.next = 28;
            break;
          }

          if (framework != 'extjs') {
            _prepareForBuild(app, vars, options, outputPath, compilation);
          } else {
            require(`./${framework}Util`)._prepareForBuild(app, vars, options, outputPath, compilation);
          }

          command = '';

          if (options.watch == 'yes') {
            command = 'watch';
          } else {
            command = 'build';
          }

          if (!(vars.rebuild == true)) {
            _context.next = 25;
            break;
          }

          parms = [];

          if (options.profile == undefined || options.profile == '' || options.profile == null) {
            parms = ['app', command, options.environment];
          } else {
            parms = ['app', command, options.profile, options.environment];
          }

          _context.next = 21;
          return _buildExtBundle(app, compilation, outputPath, parms, options);

        case 21:
          //const jsChunk = compilation.addChunk(`ext-angular-js`)
          //jsChunk.hasRuntime = jsChunk.isInitial = () => true;
          //jsChunk.files.push(path.join('build', 'ext-angular', 'ext.js'));
          //jsChunk.files.push(path.join('build', 'ext-angular',  'ext.css'));
          //jsChunk.id = -2; // this forces html-webpack-plugin to include ext.js first
          if (options.browser == true && options.watch == 'yes') {
            if (vars.browserCount == 0 && compilation.errors.length == 0) {
              url = 'http://localhost:' + options.port;
              log(app + `Opening browser at ${url}`);
              vars.browserCount++;
              opn = require('opn');
              opn(url);
            }
          } else {
            logv(options, 'browser NOT opened');
          }

          callback();
          _context.next = 26;
          break;

        case 25:
          callback();

        case 26:
          _context.next = 31;
          break;

        case 28:
          log(`${vars.app}FUNCTION emit not run`);

          if (options.browser == true) {
            if (vars.browserCount == 0 && options.watch == 'yes') {
              url = 'http://localhost:' + options.port;
              log(app + `Opening browser at ${url}`);
              vars.browserCount++;
              opn = require('opn');
              opn(url);
            }
          } else {
            logv(options, 'browser NOT opened');
          }

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

      fs.writeFileSync(path.join(output, 'build.xml'), buildXML(vars.production, options), 'utf8');
      fs.writeFileSync(path.join(output, 'app.json'), createAppJson(theme, packages, toolkit, options), 'utf8');
      fs.writeFileSync(path.join(output, 'jsdom-environment.js'), createJSDOMEnvironment(options), 'utf8');
      fs.writeFileSync(path.join(output, 'workspace.json'), createWorkspaceJson(options), 'utf8');

      if (fs.existsSync(path.join(process.cwd(), 'resources/'))) {
        var fromResources = path.join(process.cwd(), 'resources/');
        var toResources = path.join(output, '../resources');
        fsx.copySync(fromResources, toResources);
        log(app + 'Copying ' + fromResources.replace(process.cwd(), '') + ' to: ' + toResources.replace(process.cwd(), ''));
      }

      if (fs.existsSync(path.join(process.cwd(), 'resources/'))) {
        var fromResources = path.join(process.cwd(), 'resources/');
        var toResources = path.join(output, 'resources');
        fsx.copySync(fromResources, toResources);
        log(app + 'Copying ' + fromResources.replace(process.cwd(), '') + ' to: ' + toResources.replace(process.cwd(), ''));
      }
    }

    vars.firstTime = false;
    var js = '';

    if (vars.production) {
      vars.deps.push('Ext.require("Ext.layout.*");\n');
      js = vars.deps.join(';\n');
    } else {
      js = 'Ext.require("Ext.*")';
    }

    if (vars.manifest === null || js !== vars.manifest) {
      vars.manifest = js;
      const manifest = path.join(output, 'manifest.js');
      fs.writeFileSync(manifest, js, 'utf8');
      vars.rebuild = true;
      log(app + 'Building Ext bundle at: ' + output.replace(process.cwd(), ''));
    } else {
      vars.rebuild = false;
      log(app + 'ExtReact rebuild NOT needed');
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
    require('./pluginUtil').logv(options, e);

    compilation.errors.push('_buildExtBundle: ' + e);
    callback();
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
          DEFAULT_SUBSTRS = ['[INF] Loading', '[INF] Append', '[INF] Processing', '[INF] Processing Build', '[LOG] Fashion build complete', '[ERR]', '[WRN]', "[INF] Server", "[INF] Writing", "[INF] Loading Build", "[INF] Waiting", "[LOG] Fashion waiting"];
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

  return app + 'ext-webpack-plugin v' + v.pluginVersion + ', Ext JS v' + v.extVersion + ', Sencha Cmd v' + v.cmdVersion + ', webpack v' + v.webpackVersion + frameworkInfo;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9wbHVnaW5VdGlsLmpzIl0sIm5hbWVzIjpbIl9jb25zdHJ1Y3RvciIsIm9wdGlvbnMiLCJ0aGlzVmFycyIsInRoaXNPcHRpb25zIiwicGx1Z2luIiwiZnJhbWV3b3JrIiwidW5kZWZpbmVkIiwicGx1Z2luRXJyb3JzIiwicHVzaCIsInZhcnMiLCJ2YWxpZGF0ZU9wdGlvbnMiLCJyZXF1aXJlIiwiZ2V0VmFsaWRhdGVPcHRpb25zIiwiZ2V0RGVmYXVsdFZhcnMiLCJwbHVnaW5OYW1lIiwiYXBwIiwiX2dldEFwcCIsImxvZ3YiLCJmcyIsInJjIiwiZXhpc3RzU3luYyIsIkpTT04iLCJwYXJzZSIsInJlYWRGaWxlU3luYyIsImdldERlZmF1bHRPcHRpb25zIiwic3RyaW5naWZ5IiwiZW52aXJvbm1lbnQiLCJwcm9kdWN0aW9uIiwibG9nIiwiX2dldFZlcnNpb25zIiwiX2NvbXBpbGF0aW9uIiwiY29tcGlsZXIiLCJjb21waWxhdGlvbiIsImhvb2tzIiwic3VjY2VlZE1vZHVsZSIsInRhcCIsIm1vZHVsZSIsInJlc291cmNlIiwibWF0Y2giLCJ0b29sa2l0IiwiZGVwcyIsImV4dHJhY3RGcm9tU291cmNlIiwiaHRtbFdlYnBhY2tQbHVnaW5CZWZvcmVIdG1sR2VuZXJhdGlvbiIsImRhdGEiLCJwYXRoIiwib3V0cHV0UGF0aCIsImRldlNlcnZlciIsImpvaW4iLCJjb250ZW50QmFzZSIsInJlcGxhY2UiLCJwcm9jZXNzIiwiY3dkIiwidHJpbSIsImpzUGF0aCIsImV4dFBhdGgiLCJjc3NQYXRoIiwiYXNzZXRzIiwianMiLCJ1bnNoaWZ0IiwiY3NzIiwiZSIsImVycm9ycyIsImVtaXQiLCJjYWxsYmFjayIsIl9idWlsZEV4dEJ1bmRsZSIsIl9wcmVwYXJlRm9yQnVpbGQiLCJjb21tYW5kIiwid2F0Y2giLCJyZWJ1aWxkIiwicGFybXMiLCJwcm9maWxlIiwiYnJvd3NlciIsImJyb3dzZXJDb3VudCIsImxlbmd0aCIsInVybCIsInBvcnQiLCJvcG4iLCJvdXRwdXQiLCJyaW1yYWYiLCJta2RpcnAiLCJmc3giLCJwYWNrYWdlcyIsInRoZW1lIiwiZmlyc3RUaW1lIiwic3luYyIsImJ1aWxkWE1MIiwiY3JlYXRlQXBwSnNvbiIsImNyZWF0ZVdvcmtzcGFjZUpzb24iLCJjcmVhdGVKU0RPTUVudmlyb25tZW50Iiwid3JpdGVGaWxlU3luYyIsImZyb21SZXNvdXJjZXMiLCJ0b1Jlc291cmNlcyIsImNvcHlTeW5jIiwibWFuaWZlc3QiLCJzZW5jaGEiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsIm9uQnVpbGREb25lIiwib3B0cyIsInNpbGVudCIsInN0ZGlvIiwiZW5jb2RpbmciLCJleGVjdXRlQXN5bmMiLCJ0aGVuIiwicmVhc29uIiwiREVGQVVMVF9TVUJTVFJTIiwic3Vic3RyaW5ncyIsImNoYWxrIiwiY3Jvc3NTcGF3biIsImNoaWxkIiwib24iLCJjb2RlIiwic2lnbmFsIiwiRXJyb3IiLCJlcnJvciIsInN0ZG91dCIsInN0ciIsInRvU3RyaW5nIiwic29tZSIsInYiLCJpbmRleE9mIiwiaW5jbHVkZXMiLCJyZWQiLCJzdGRlcnIiLCJzdHJKYXZhT3B0cyIsImNvbnNvbGUiLCJzIiwiY3Vyc29yVG8iLCJjbGVhckxpbmUiLCJ3cml0ZSIsInZlcmJvc2UiLCJwcmVmaXgiLCJwbGF0Zm9ybSIsImdyZWVuIiwiZnJhbWV3b3JrTmFtZSIsInBsdWdpblBhdGgiLCJwbHVnaW5Qa2ciLCJwbHVnaW5WZXJzaW9uIiwidmVyc2lvbiIsIndlYnBhY2tQYXRoIiwid2VicGFja1BrZyIsIndlYnBhY2tWZXJzaW9uIiwiZXh0UGtnIiwiZXh0VmVyc2lvbiIsImNtZFBhdGgiLCJjbWRQa2ciLCJjbWRWZXJzaW9uIiwidmVyc2lvbl9mdWxsIiwiZnJhbWV3b3JrSW5mbyIsImZyYW1ld29ya1BhdGgiLCJmcmFtZXdvcmtQa2ciLCJmcmFtZXdvcmtWZXJzaW9uIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNPLFNBQVNBLFlBQVQs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QWIsRUFBMkIsNEJBQTNCLENBQWhCO0FBQ0Q7O0FBQ0QsUUFBSW9HLFlBQVksR0FBSXJJLEVBQUUsQ0FBQ0UsVUFBSCxDQUFja0ksYUFBYSxHQUFDLGVBQTVCLEtBQWdEakksSUFBSSxDQUFDQyxLQUFMLENBQVdKLEVBQUUsQ0FBQ0ssWUFBSCxDQUFnQitILGFBQWEsR0FBQyxlQUE5QixFQUErQyxPQUEvQyxDQUFYLENBQWhELElBQXVILEVBQTNJO0FBQ0E5QixJQUFBQSxDQUFDLENBQUNnQyxnQkFBRixHQUFxQkQsWUFBWSxDQUFDWixPQUFsQztBQUNBVSxJQUFBQSxhQUFhLEdBQUcsT0FBT2QsYUFBUCxHQUF1QixJQUF2QixHQUE4QmYsQ0FBQyxDQUFDZ0MsZ0JBQWhEO0FBQ0Q7O0FBRUQsU0FBT3pJLEdBQUcsR0FBRyxzQkFBTixHQUErQnlHLENBQUMsQ0FBQ2tCLGFBQWpDLEdBQWlELFlBQWpELEdBQWdFbEIsQ0FBQyxDQUFDd0IsVUFBbEUsR0FBK0UsZ0JBQS9FLEdBQWtHeEIsQ0FBQyxDQUFDMkIsVUFBcEcsR0FBaUgsYUFBakgsR0FBaUkzQixDQUFDLENBQUNzQixjQUFuSSxHQUFvSk8sYUFBM0o7QUFDRCIsInNvdXJjZXNDb250ZW50IjpbIi8vKioqKioqKioqKlxuZXhwb3J0IGZ1bmN0aW9uIF9jb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gIHZhciB0aGlzVmFycyA9IHt9XG4gIHZhciB0aGlzT3B0aW9ucyA9IHt9XG4gIHZhciBwbHVnaW4gPSB7fVxuXG4gIGlmIChvcHRpb25zLmZyYW1ld29yayA9PSB1bmRlZmluZWQpIHtcbiAgICB0aGlzVmFycy5wbHVnaW5FcnJvcnMgPSBbXVxuICAgIHRoaXNWYXJzLnBsdWdpbkVycm9ycy5wdXNoKCd3ZWJwYWNrIGNvbmZpZzogZnJhbWV3b3JrIHBhcmFtZXRlciBvbiBleHQtd2VicGFjay1wbHVnaW4gaXMgbm90IGRlZmluZWQgLSB2YWx1ZXM6IHJlYWN0LCBhbmd1bGFyLCBleHRqcycpXG4gICAgcGx1Z2luLnZhcnMgPSB0aGlzVmFyc1xuICAgIHJldHVybiBwbHVnaW5cbiAgfVxuXG4gIGNvbnN0IHZhbGlkYXRlT3B0aW9ucyA9IHJlcXVpcmUoJ3NjaGVtYS11dGlscycpXG4gIHZhbGlkYXRlT3B0aW9ucyhyZXF1aXJlKGAuLyR7b3B0aW9ucy5mcmFtZXdvcmt9VXRpbGApLmdldFZhbGlkYXRlT3B0aW9ucygpLCBvcHRpb25zLCAnJylcblxuICB0aGlzVmFycyA9IHJlcXVpcmUoYC4vJHtvcHRpb25zLmZyYW1ld29ya31VdGlsYCkuZ2V0RGVmYXVsdFZhcnMoKVxuICB0aGlzVmFycy5mcmFtZXdvcmsgPSBvcHRpb25zLmZyYW1ld29ya1xuICBzd2l0Y2godGhpc1ZhcnMuZnJhbWV3b3JrKSB7XG4gICAgY2FzZSAnZXh0anMnOlxuICAgICAgdGhpc1ZhcnMucGx1Z2luTmFtZSA9ICdleHQtd2VicGFjay1wbHVnaW4nXG4gICAgICBicmVhaztcbiAgICBjYXNlICdyZWFjdCc6XG4gICAgICB0aGlzVmFycy5wbHVnaW5OYW1lID0gJ2V4dC1yZWFjdC13ZWJwYWNrLXBsdWdpbidcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ2FuZ3VsYXInOlxuICAgICAgdGhpc1ZhcnMucGx1Z2luTmFtZSA9ICdleHQtYW5ndWxhci13ZWJwYWNrLXBsdWdpbidcbiAgICAgIGJyZWFrO1xuICAgIGRlZmF1bHQ6XG4gICAgICB0aGlzVmFycy5wbHVnaW5OYW1lID0gJ2V4dC13ZWJwYWNrLXBsdWdpbidcbiAgfVxuICB0aGlzVmFycy5hcHAgPSByZXF1aXJlKCcuL3BsdWdpblV0aWwnKS5fZ2V0QXBwKClcbiAgbG9ndihvcHRpb25zLCBgcGx1Z2luTmFtZSAtICR7dGhpc1ZhcnMucGx1Z2luTmFtZX1gKVxuICBsb2d2KG9wdGlvbnMsIGB0aGlzVmFycy5hcHAgLSAke3RoaXNWYXJzLmFwcH1gKVxuICBjb25zdCBmcyA9IHJlcXVpcmUoJ2ZzJylcbiAgY29uc3QgcmMgPSAoZnMuZXhpc3RzU3luYyhgLmV4dC0ke3RoaXNWYXJzLmZyYW1ld29ya31yY2ApICYmIEpTT04ucGFyc2UoZnMucmVhZEZpbGVTeW5jKGAuZXh0LSR7dGhpc1ZhcnMuZnJhbWV3b3JrfXJjYCwgJ3V0Zi04JykpIHx8IHt9KVxuICB0aGlzT3B0aW9ucyA9IHsgLi4ucmVxdWlyZShgLi8ke3RoaXNWYXJzLmZyYW1ld29ya31VdGlsYCkuZ2V0RGVmYXVsdE9wdGlvbnMoKSwgLi4ub3B0aW9ucywgLi4ucmMgfVxuICBsb2d2KG9wdGlvbnMsIGB0aGlzT3B0aW9ucyAtICR7SlNPTi5zdHJpbmdpZnkodGhpc09wdGlvbnMpfWApXG4gIGlmICh0aGlzT3B0aW9ucy5lbnZpcm9ubWVudCA9PSAncHJvZHVjdGlvbicpIFxuICAgIHt0aGlzVmFycy5wcm9kdWN0aW9uID0gdHJ1ZX1cbiAgZWxzZSBcbiAgICB7dGhpc1ZhcnMucHJvZHVjdGlvbiA9IGZhbHNlfVxuICBsb2cocmVxdWlyZSgnLi9wbHVnaW5VdGlsJykuX2dldFZlcnNpb25zKHRoaXNWYXJzLmFwcCwgdGhpc1ZhcnMucGx1Z2luTmFtZSwgdGhpc1ZhcnMuZnJhbWV3b3JrKSlcbiAgbG9nKHRoaXNWYXJzLmFwcCArICdCdWlsZGluZyBmb3IgJyArIHRoaXNPcHRpb25zLmVudmlyb25tZW50KVxuXG4gIHBsdWdpbi52YXJzID0gdGhpc1ZhcnNcbiAgcGx1Z2luLm9wdGlvbnMgPSB0aGlzT3B0aW9uc1xuICByZXR1cm4gcGx1Z2luXG59XG5cbi8vKioqKioqKioqKlxuZXhwb3J0IGZ1bmN0aW9uIF9jb21waWxhdGlvbihjb21waWxlciwgY29tcGlsYXRpb24sIHZhcnMsIG9wdGlvbnMpIHtcbiAgdHJ5IHtcbiAgICByZXF1aXJlKCcuL3BsdWdpblV0aWwnKS5sb2d2KG9wdGlvbnMsJ0ZVTkNUSU9OIF9jb21waWxhdGlvbicpXG4gICAgaWYgKHZhcnMucHJvZHVjdGlvbikge1xuICAgICAgbG9ndihvcHRpb25zLGBleHQtY29tcGlsYXRpb246IHByb2R1Y3Rpb24gaXMgYCArICB2YXJzLnByb2R1Y3Rpb24pXG4gICAgICBjb21waWxhdGlvbi5ob29rcy5zdWNjZWVkTW9kdWxlLnRhcChgZXh0LXN1Y2NlZWQtbW9kdWxlYCwgKG1vZHVsZSkgPT4ge1xuICAgICAgICBpZiAobW9kdWxlLnJlc291cmNlICYmIG1vZHVsZS5yZXNvdXJjZS5tYXRjaCgvXFwuKGp8dClzeD8kLykgJiYgIW1vZHVsZS5yZXNvdXJjZS5tYXRjaCgvbm9kZV9tb2R1bGVzLykgJiYgIW1vZHVsZS5yZXNvdXJjZS5tYXRjaChgL2V4dC17JG9wdGlvbnMuZnJhbWV3b3JrfS9kaXN0L2ApICYmICFtb2R1bGUucmVzb3VyY2UubWF0Y2goYC9leHQtJHtvcHRpb25zLmZyYW1ld29ya30tJHtvcHRpb25zLnRvb2xraXR9L2ApKSB7XG4gICAgICAgICAgdmFycy5kZXBzID0gWyBcbiAgICAgICAgICAgIC4uLih2YXJzLmRlcHMgfHwgW10pLCBcbiAgICAgICAgICAgIC4uLnJlcXVpcmUoYC4vJHt2YXJzLmZyYW1ld29ya31VdGlsYCkuZXh0cmFjdEZyb21Tb3VyY2UobW9kdWxlLCBvcHRpb25zLCBjb21waWxhdGlvbikgXG4gICAgICAgICAgXVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGxvZ3Yob3B0aW9ucyxgZXh0LWNvbXBpbGF0aW9uOiBwcm9kdWN0aW9uIGlzIGAgKyAgdmFycy5wcm9kdWN0aW9uKVxuICAgIH1cbiAgICBpZiAob3B0aW9ucy5mcmFtZXdvcmsgIT0gJ2FuZ3VsYXInKSB7XG4gICAgICBjb21waWxhdGlvbi5ob29rcy5odG1sV2VicGFja1BsdWdpbkJlZm9yZUh0bWxHZW5lcmF0aW9uLnRhcChgZXh0LWh0bWwtZ2VuZXJhdGlvbmAsKGRhdGEpID0+IHtcbiAgICAgICAgbG9ndihvcHRpb25zLCdIT09LIGV4dC1odG1sLWdlbmVyYXRpb24nKVxuICAgICAgICBjb25zdCBwYXRoID0gcmVxdWlyZSgncGF0aCcpXG4gICAgICAgIHZhciBvdXRwdXRQYXRoID0gJydcbiAgICAgICAgaWYgKGNvbXBpbGVyLm9wdGlvbnMuZGV2U2VydmVyKSB7XG4gICAgICAgICAgaWYgKGNvbXBpbGVyLm91dHB1dFBhdGggPT09ICcvJykge1xuICAgICAgICAgICAgb3V0cHV0UGF0aCA9IHBhdGguam9pbihjb21waWxlci5vcHRpb25zLmRldlNlcnZlci5jb250ZW50QmFzZSwgb3V0cHV0UGF0aClcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpZiAoY29tcGlsZXIub3B0aW9ucy5kZXZTZXJ2ZXIuY29udGVudEJhc2UgPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgIG91dHB1dFBhdGggPSAnYnVpbGQnXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgb3V0cHV0UGF0aCA9ICcnXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIG91dHB1dFBhdGggPSAnYnVpbGQnXG4gICAgICAgIH1cbiAgICAgICAgb3V0cHV0UGF0aCA9IG91dHB1dFBhdGgucmVwbGFjZShwcm9jZXNzLmN3ZCgpLCAnJykudHJpbSgpXG4gICAgICAgIHZhciBqc1BhdGggPSBwYXRoLmpvaW4ob3V0cHV0UGF0aCwgdmFycy5leHRQYXRoLCAnZXh0LmpzJylcbiAgICAgICAgdmFyIGNzc1BhdGggPSBwYXRoLmpvaW4ob3V0cHV0UGF0aCwgdmFycy5leHRQYXRoLCAnZXh0LmNzcycpXG4gICAgICAgIGRhdGEuYXNzZXRzLmpzLnVuc2hpZnQoanNQYXRoKVxuICAgICAgICBkYXRhLmFzc2V0cy5jc3MudW5zaGlmdChjc3NQYXRoKVxuICAgICAgICBsb2codmFycy5hcHAgKyBgQWRkaW5nICR7anNQYXRofSBhbmQgJHtjc3NQYXRofSB0byBpbmRleC5odG1sYClcbiAgICAgIH0pXG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgbG9ndihvcHRpb25zLCdza2lwcGVkIEhPT0sgZXh0LWh0bWwtZ2VuZXJhdGlvbicpXG4gICAgfVxuICB9XG4gIGNhdGNoKGUpIHtcbiAgICByZXF1aXJlKCcuL3BsdWdpblV0aWwnKS5sb2d2KG9wdGlvbnMsZSlcbiAgICBjb21waWxhdGlvbi5lcnJvcnMucHVzaCgnX2NvbXBpbGF0aW9uOiAnICsgZSlcbiAgfVxufVxuXG4vLyoqKioqKioqKipcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBlbWl0KGNvbXBpbGVyLCBjb21waWxhdGlvbiwgdmFycywgb3B0aW9ucywgY2FsbGJhY2spIHtcbiAgdHJ5IHtcbiAgICBjb25zdCBsb2cgPSByZXF1aXJlKCcuL3BsdWdpblV0aWwnKS5sb2dcbiAgICBjb25zdCBsb2d2ID0gcmVxdWlyZSgnLi9wbHVnaW5VdGlsJykubG9ndlxuICAgIGxvZ3Yob3B0aW9ucywnRlVOQ1RJT04gZW1pdCcpXG4gICAgdmFyIGFwcCA9IHZhcnMuYXBwXG4gICAgdmFyIGZyYW1ld29yayA9IHZhcnMuZnJhbWV3b3JrXG4gICAgY29uc3QgcGF0aCA9IHJlcXVpcmUoJ3BhdGgnKVxuICAgIGNvbnN0IF9idWlsZEV4dEJ1bmRsZSA9IHJlcXVpcmUoJy4vcGx1Z2luVXRpbCcpLl9idWlsZEV4dEJ1bmRsZVxuICAgIGxldCBvdXRwdXRQYXRoID0gcGF0aC5qb2luKGNvbXBpbGVyLm91dHB1dFBhdGgsdmFycy5leHRQYXRoKVxuICAgIGlmIChjb21waWxlci5vdXRwdXRQYXRoID09PSAnLycgJiYgY29tcGlsZXIub3B0aW9ucy5kZXZTZXJ2ZXIpIHtcbiAgICAgIG91dHB1dFBhdGggPSBwYXRoLmpvaW4oY29tcGlsZXIub3B0aW9ucy5kZXZTZXJ2ZXIuY29udGVudEJhc2UsIG91dHB1dFBhdGgpXG4gICAgfVxuICAgIGxvZ3Yob3B0aW9ucywnb3V0cHV0UGF0aDogJyArIG91dHB1dFBhdGgpXG4gICAgbG9ndihvcHRpb25zLCdmcmFtZXdvcms6ICcgKyBmcmFtZXdvcmspXG4gICAgaWYgKG9wdGlvbnMuZW1pdCA9PSB0cnVlKSB7XG4gICAgICBpZiAoZnJhbWV3b3JrICE9ICdleHRqcycpIHtcbiAgICAgICAgX3ByZXBhcmVGb3JCdWlsZChhcHAsIHZhcnMsIG9wdGlvbnMsIG91dHB1dFBhdGgsIGNvbXBpbGF0aW9uKVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHJlcXVpcmUoYC4vJHtmcmFtZXdvcmt9VXRpbGApLl9wcmVwYXJlRm9yQnVpbGQoYXBwLCB2YXJzLCBvcHRpb25zLCBvdXRwdXRQYXRoLCBjb21waWxhdGlvbilcbiAgICAgIH1cblxuICAgICAgdmFyIGNvbW1hbmQgPSAnJ1xuICAgICAgaWYgKG9wdGlvbnMud2F0Y2ggPT0gJ3llcycpIHtcbiAgICAgICAgY29tbWFuZCA9ICd3YXRjaCdcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBjb21tYW5kID0gJ2J1aWxkJ1xuICAgICAgfVxuXG4gICAgICBpZiAodmFycy5yZWJ1aWxkID09IHRydWUpIHtcbiAgICAgICAgdmFyIHBhcm1zID0gW11cbiAgICAgICAgaWYgKG9wdGlvbnMucHJvZmlsZSA9PSB1bmRlZmluZWQgfHwgb3B0aW9ucy5wcm9maWxlID09ICcnIHx8IG9wdGlvbnMucHJvZmlsZSA9PSBudWxsKSB7XG4gICAgICAgICAgcGFybXMgPSBbJ2FwcCcsIGNvbW1hbmQsIG9wdGlvbnMuZW52aXJvbm1lbnRdXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgcGFybXMgPSBbJ2FwcCcsIGNvbW1hbmQsIG9wdGlvbnMucHJvZmlsZSwgb3B0aW9ucy5lbnZpcm9ubWVudF1cbiAgICAgICAgfVxuICAgICAgICBhd2FpdCBfYnVpbGRFeHRCdW5kbGUoYXBwLCBjb21waWxhdGlvbiwgb3V0cHV0UGF0aCwgcGFybXMsIG9wdGlvbnMpXG5cbiAgICAgICAgLy9jb25zdCBqc0NodW5rID0gY29tcGlsYXRpb24uYWRkQ2h1bmsoYGV4dC1hbmd1bGFyLWpzYClcbiAgICAgICAgLy9qc0NodW5rLmhhc1J1bnRpbWUgPSBqc0NodW5rLmlzSW5pdGlhbCA9ICgpID0+IHRydWU7XG4gICAgICAgIC8vanNDaHVuay5maWxlcy5wdXNoKHBhdGguam9pbignYnVpbGQnLCAnZXh0LWFuZ3VsYXInLCAnZXh0LmpzJykpO1xuICAgICAgICAvL2pzQ2h1bmsuZmlsZXMucHVzaChwYXRoLmpvaW4oJ2J1aWxkJywgJ2V4dC1hbmd1bGFyJywgICdleHQuY3NzJykpO1xuICAgICAgICAvL2pzQ2h1bmsuaWQgPSAtMjsgLy8gdGhpcyBmb3JjZXMgaHRtbC13ZWJwYWNrLXBsdWdpbiB0byBpbmNsdWRlIGV4dC5qcyBmaXJzdFxuXG4gICAgICAgIGlmKG9wdGlvbnMuYnJvd3NlciA9PSB0cnVlICYmIG9wdGlvbnMud2F0Y2ggPT0gJ3llcycpIHtcbiAgICAgICAgICBpZiAodmFycy5icm93c2VyQ291bnQgPT0gMCAmJiBjb21waWxhdGlvbi5lcnJvcnMubGVuZ3RoID09IDApIHtcbiAgICAgICAgICAgIHZhciB1cmwgPSAnaHR0cDovL2xvY2FsaG9zdDonICsgb3B0aW9ucy5wb3J0XG4gICAgICAgICAgICBsb2coYXBwICsgYE9wZW5pbmcgYnJvd3NlciBhdCAke3VybH1gKVxuICAgICAgICAgICAgdmFycy5icm93c2VyQ291bnQrK1xuICAgICAgICAgICAgY29uc3Qgb3BuID0gcmVxdWlyZSgnb3BuJylcbiAgICAgICAgICAgIG9wbih1cmwpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIGxvZ3Yob3B0aW9ucywnYnJvd3NlciBOT1Qgb3BlbmVkJylcbiAgICAgICAgfVxuICAgICAgICBjYWxsYmFjaygpXG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgY2FsbGJhY2soKVxuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGxvZyhgJHt2YXJzLmFwcH1GVU5DVElPTiBlbWl0IG5vdCBydW5gKVxuICAgICAgaWYob3B0aW9ucy5icm93c2VyID09IHRydWUpIHtcbiAgICAgICAgaWYgKHZhcnMuYnJvd3NlckNvdW50ID09IDAgJiYgb3B0aW9ucy53YXRjaCA9PSAneWVzJykge1xuICAgICAgICAgIHZhciB1cmwgPSAnaHR0cDovL2xvY2FsaG9zdDonICsgb3B0aW9ucy5wb3J0XG4gICAgICAgICAgbG9nKGFwcCArIGBPcGVuaW5nIGJyb3dzZXIgYXQgJHt1cmx9YClcbiAgICAgICAgICB2YXJzLmJyb3dzZXJDb3VudCsrXG4gICAgICAgICAgY29uc3Qgb3BuID0gcmVxdWlyZSgnb3BuJylcbiAgICAgICAgICBvcG4odXJsKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgbG9ndihvcHRpb25zLCdicm93c2VyIE5PVCBvcGVuZWQnKVxuICAgICAgfVxuICAgICAgY2FsbGJhY2soKVxuICAgIH1cbiAgfVxuICBjYXRjaChlKSB7XG4gICAgcmVxdWlyZSgnLi9wbHVnaW5VdGlsJykubG9ndihvcHRpb25zLGUpXG4gICAgY29tcGlsYXRpb24uZXJyb3JzLnB1c2goJ2VtaXQ6ICcgKyBlKVxuICAgIGNhbGxiYWNrKClcbiAgfVxufVxuXG4vLyoqKioqKioqKipcbmV4cG9ydCBmdW5jdGlvbiBfcHJlcGFyZUZvckJ1aWxkKGFwcCwgdmFycywgb3B0aW9ucywgb3V0cHV0LCBjb21waWxhdGlvbikge1xuICB0cnkge1xuICAgIGxvZ3Yob3B0aW9ucywnRlVOQ1RJT04gX3ByZXBhcmVGb3JCdWlsZCcpXG4gICAgY29uc3QgcmltcmFmID0gcmVxdWlyZSgncmltcmFmJylcbiAgICBjb25zdCBta2RpcnAgPSByZXF1aXJlKCdta2RpcnAnKVxuICAgIGNvbnN0IGZzeCA9IHJlcXVpcmUoJ2ZzLWV4dHJhJylcbiAgICBjb25zdCBmcyA9IHJlcXVpcmUoJ2ZzJylcbiAgICBjb25zdCBwYXRoID0gcmVxdWlyZSgncGF0aCcpXG5cbiAgICB2YXIgcGFja2FnZXMgPSBvcHRpb25zLnBhY2thZ2VzXG4gICAgdmFyIHRvb2xraXQgPSBvcHRpb25zLnRvb2xraXRcbiAgICB2YXIgdGhlbWUgPSBvcHRpb25zLnRoZW1lXG5cbiAgICB0aGVtZSA9IHRoZW1lIHx8ICh0b29sa2l0ID09PSAnY2xhc3NpYycgPyAndGhlbWUtdHJpdG9uJyA6ICd0aGVtZS1tYXRlcmlhbCcpXG4gICAgbG9ndihvcHRpb25zLCdmaXJzdFRpbWU6ICcgKyB2YXJzLmZpcnN0VGltZSlcbiAgICBpZiAodmFycy5maXJzdFRpbWUpIHtcbiAgICAgIHJpbXJhZi5zeW5jKG91dHB1dClcbiAgICAgIG1rZGlycC5zeW5jKG91dHB1dClcbiAgICAgIGNvbnN0IGJ1aWxkWE1MID0gcmVxdWlyZSgnLi9hcnRpZmFjdHMnKS5idWlsZFhNTFxuICAgICAgY29uc3QgY3JlYXRlQXBwSnNvbiA9IHJlcXVpcmUoJy4vYXJ0aWZhY3RzJykuY3JlYXRlQXBwSnNvblxuICAgICAgY29uc3QgY3JlYXRlV29ya3NwYWNlSnNvbiA9IHJlcXVpcmUoJy4vYXJ0aWZhY3RzJykuY3JlYXRlV29ya3NwYWNlSnNvblxuICAgICAgY29uc3QgY3JlYXRlSlNET01FbnZpcm9ubWVudCA9IHJlcXVpcmUoJy4vYXJ0aWZhY3RzJykuY3JlYXRlSlNET01FbnZpcm9ubWVudFxuXG4gICAgICBmcy53cml0ZUZpbGVTeW5jKHBhdGguam9pbihvdXRwdXQsICdidWlsZC54bWwnKSwgYnVpbGRYTUwodmFycy5wcm9kdWN0aW9uLCBvcHRpb25zKSwgJ3V0ZjgnKVxuICAgICAgZnMud3JpdGVGaWxlU3luYyhwYXRoLmpvaW4ob3V0cHV0LCAnYXBwLmpzb24nKSwgY3JlYXRlQXBwSnNvbih0aGVtZSwgcGFja2FnZXMsIHRvb2xraXQsIG9wdGlvbnMpLCAndXRmOCcpXG4gICAgICBmcy53cml0ZUZpbGVTeW5jKHBhdGguam9pbihvdXRwdXQsICdqc2RvbS1lbnZpcm9ubWVudC5qcycpLCBjcmVhdGVKU0RPTUVudmlyb25tZW50KG9wdGlvbnMpLCAndXRmOCcpXG4gICAgICBmcy53cml0ZUZpbGVTeW5jKHBhdGguam9pbihvdXRwdXQsICd3b3Jrc3BhY2UuanNvbicpLCBjcmVhdGVXb3Jrc3BhY2VKc29uKG9wdGlvbnMpLCAndXRmOCcpXG5cbiAgICAgIGlmIChmcy5leGlzdHNTeW5jKHBhdGguam9pbihwcm9jZXNzLmN3ZCgpLCdyZXNvdXJjZXMvJykpKSB7XG4gICAgICAgIHZhciBmcm9tUmVzb3VyY2VzID0gcGF0aC5qb2luKHByb2Nlc3MuY3dkKCksICdyZXNvdXJjZXMvJylcbiAgICAgICAgdmFyIHRvUmVzb3VyY2VzID0gcGF0aC5qb2luKG91dHB1dCwgJy4uL3Jlc291cmNlcycpXG4gICAgICAgIGZzeC5jb3B5U3luYyhmcm9tUmVzb3VyY2VzLCB0b1Jlc291cmNlcylcbiAgICAgICAgbG9nKGFwcCArICdDb3B5aW5nICcgKyBmcm9tUmVzb3VyY2VzLnJlcGxhY2UocHJvY2Vzcy5jd2QoKSwgJycpICsgJyB0bzogJyArIHRvUmVzb3VyY2VzLnJlcGxhY2UocHJvY2Vzcy5jd2QoKSwgJycpKVxuICAgICAgfVxuXG4gICAgICBpZiAoZnMuZXhpc3RzU3luYyhwYXRoLmpvaW4ocHJvY2Vzcy5jd2QoKSwncmVzb3VyY2VzLycpKSkge1xuICAgICAgICB2YXIgZnJvbVJlc291cmNlcyA9IHBhdGguam9pbihwcm9jZXNzLmN3ZCgpLCAncmVzb3VyY2VzLycpXG4gICAgICAgIHZhciB0b1Jlc291cmNlcyA9IHBhdGguam9pbihvdXRwdXQsICdyZXNvdXJjZXMnKVxuICAgICAgICBmc3guY29weVN5bmMoZnJvbVJlc291cmNlcywgdG9SZXNvdXJjZXMpXG4gICAgICAgIGxvZyhhcHAgKyAnQ29weWluZyAnICsgZnJvbVJlc291cmNlcy5yZXBsYWNlKHByb2Nlc3MuY3dkKCksICcnKSArICcgdG86ICcgKyB0b1Jlc291cmNlcy5yZXBsYWNlKHByb2Nlc3MuY3dkKCksICcnKSlcbiAgICAgIH1cbiAgICB9XG4gICAgdmFycy5maXJzdFRpbWUgPSBmYWxzZVxuICAgIHZhciBqcyA9ICcnXG4gICAgaWYgKHZhcnMucHJvZHVjdGlvbikge1xuICAgICAgdmFycy5kZXBzLnB1c2goJ0V4dC5yZXF1aXJlKFwiRXh0LmxheW91dC4qXCIpO1xcbicpXG4gICAgICBqcyA9IHZhcnMuZGVwcy5qb2luKCc7XFxuJyk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAganMgPSAnRXh0LnJlcXVpcmUoXCJFeHQuKlwiKSdcbiAgICB9XG4gICAgaWYgKHZhcnMubWFuaWZlc3QgPT09IG51bGwgfHwganMgIT09IHZhcnMubWFuaWZlc3QpIHtcbiAgICAgIHZhcnMubWFuaWZlc3QgPSBqc1xuICAgICAgY29uc3QgbWFuaWZlc3QgPSBwYXRoLmpvaW4ob3V0cHV0LCAnbWFuaWZlc3QuanMnKVxuICAgICAgZnMud3JpdGVGaWxlU3luYyhtYW5pZmVzdCwganMsICd1dGY4JylcbiAgICAgIHZhcnMucmVidWlsZCA9IHRydWVcbiAgICAgIGxvZyhhcHAgKyAnQnVpbGRpbmcgRXh0IGJ1bmRsZSBhdDogJyArIG91dHB1dC5yZXBsYWNlKHByb2Nlc3MuY3dkKCksICcnKSlcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICB2YXJzLnJlYnVpbGQgPSBmYWxzZVxuICAgICAgbG9nKGFwcCArICdFeHRSZWFjdCByZWJ1aWxkIE5PVCBuZWVkZWQnKVxuICAgIH1cbiAgfVxuICBjYXRjaChlKSB7XG4gICAgcmVxdWlyZSgnLi9wbHVnaW5VdGlsJykubG9ndihvcHRpb25zLGUpXG4gICAgY29tcGlsYXRpb24uZXJyb3JzLnB1c2goJ19wcmVwYXJlRm9yQnVpbGQ6ICcgKyBlKVxuICB9XG59XG5cbi8vKioqKioqKioqKlxuZXhwb3J0IGZ1bmN0aW9uIF9idWlsZEV4dEJ1bmRsZShhcHAsIGNvbXBpbGF0aW9uLCBvdXRwdXRQYXRoLCBwYXJtcywgb3B0aW9ucykge1xuICB0cnkge1xuICAgIGNvbnN0IGZzID0gcmVxdWlyZSgnZnMnKVxuICAgIGNvbnN0IGxvZ3YgPSByZXF1aXJlKCcuL3BsdWdpblV0aWwnKS5sb2d2XG4gICAgbG9ndihvcHRpb25zLCdGVU5DVElPTiBfYnVpbGRFeHRCdW5kbGUnKVxuXG4gICAgbGV0IHNlbmNoYTsgdHJ5IHsgc2VuY2hhID0gcmVxdWlyZSgnQHNlbmNoYS9jbWQnKSB9IGNhdGNoIChlKSB7IHNlbmNoYSA9ICdzZW5jaGEnIH1cbiAgICBpZiAoZnMuZXhpc3RzU3luYyhzZW5jaGEpKSB7XG4gICAgICBsb2d2KG9wdGlvbnMsJ3NlbmNoYSBmb2xkZXIgZXhpc3RzJylcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBsb2d2KG9wdGlvbnMsJ3NlbmNoYSBmb2xkZXIgRE9FUyBOT1QgZXhpc3QnKVxuICAgIH1cblxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBjb25zdCBvbkJ1aWxkRG9uZSA9ICgpID0+IHtcbiAgICAgICAgbG9ndihvcHRpb25zLCdvbkJ1aWxkRG9uZScpXG4gICAgICAgIHJlc29sdmUoKVxuICAgICAgfVxuXG4gICAgICB2YXIgb3B0cyA9IHsgY3dkOiBvdXRwdXRQYXRoLCBzaWxlbnQ6IHRydWUsIHN0ZGlvOiAncGlwZScsIGVuY29kaW5nOiAndXRmLTgnfVxuICAgICAgZXhlY3V0ZUFzeW5jKGFwcCwgc2VuY2hhLCBwYXJtcywgb3B0cywgY29tcGlsYXRpb24sIG9wdGlvbnMpLnRoZW4gKFxuICAgICAgICBmdW5jdGlvbigpIHsgb25CdWlsZERvbmUoKSB9LCBcbiAgICAgICAgZnVuY3Rpb24ocmVhc29uKSB7IHJlamVjdChyZWFzb24pIH1cbiAgICAgIClcbiAgICB9KVxuICB9XG4gIGNhdGNoKGUpIHtcbiAgICByZXF1aXJlKCcuL3BsdWdpblV0aWwnKS5sb2d2KG9wdGlvbnMsZSlcbiAgICBjb21waWxhdGlvbi5lcnJvcnMucHVzaCgnX2J1aWxkRXh0QnVuZGxlOiAnICsgZSlcbiAgICBjYWxsYmFjaygpXG4gIH1cbn1cblxuLy8qKioqKioqKioqXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZXhlY3V0ZUFzeW5jIChhcHAsIGNvbW1hbmQsIHBhcm1zLCBvcHRzLCBjb21waWxhdGlvbiwgb3B0aW9ucykge1xuICB0cnkge1xuICAgIC8vY29uc3QgREVGQVVMVF9TVUJTVFJTID0gWydbSU5GXSBMb2FkaW5nJywgJ1tJTkZdIFByb2Nlc3NpbmcnLCAnW0xPR10gRmFzaGlvbiBidWlsZCBjb21wbGV0ZScsICdbRVJSXScsICdbV1JOXScsIFwiW0lORl0gU2VydmVyXCIsIFwiW0lORl0gV3JpdGluZ1wiLCBcIltJTkZdIExvYWRpbmcgQnVpbGRcIiwgXCJbSU5GXSBXYWl0aW5nXCIsIFwiW0xPR10gRmFzaGlvbiB3YWl0aW5nXCJdO1xuICAgIGNvbnN0IERFRkFVTFRfU1VCU1RSUyA9IFsnW0lORl0gTG9hZGluZycsICdbSU5GXSBBcHBlbmQnLCAnW0lORl0gUHJvY2Vzc2luZycsICdbSU5GXSBQcm9jZXNzaW5nIEJ1aWxkJywgJ1tMT0ddIEZhc2hpb24gYnVpbGQgY29tcGxldGUnLCAnW0VSUl0nLCAnW1dSTl0nLCBcIltJTkZdIFNlcnZlclwiLCBcIltJTkZdIFdyaXRpbmdcIiwgXCJbSU5GXSBMb2FkaW5nIEJ1aWxkXCIsIFwiW0lORl0gV2FpdGluZ1wiLCBcIltMT0ddIEZhc2hpb24gd2FpdGluZ1wiXTtcbiAgICB2YXIgc3Vic3RyaW5ncyA9IERFRkFVTFRfU1VCU1RSUyBcbiAgICB2YXIgY2hhbGsgPSByZXF1aXJlKCdjaGFsaycpXG4gICAgY29uc3QgY3Jvc3NTcGF3biA9IHJlcXVpcmUoJ2Nyb3NzLXNwYXduJylcbiAgICBjb25zdCBsb2cgPSByZXF1aXJlKCcuL3BsdWdpblV0aWwnKS5sb2dcbiAgICBsb2d2KG9wdGlvbnMsICdGVU5DVElPTiBleGVjdXRlQXN5bmMnKVxuICAgIGF3YWl0IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGxvZ3Yob3B0aW9ucyxgY29tbWFuZCAtICR7Y29tbWFuZH1gKVxuICAgICAgbG9ndihvcHRpb25zLCBgcGFybXMgLSAke3Bhcm1zfWApXG4gICAgICBsb2d2KG9wdGlvbnMsIGBvcHRzIC0gJHtKU09OLnN0cmluZ2lmeShvcHRzKX1gKVxuICAgICAgbGV0IGNoaWxkID0gY3Jvc3NTcGF3bihjb21tYW5kLCBwYXJtcywgb3B0cylcbiAgICAgIGNoaWxkLm9uKCdjbG9zZScsIChjb2RlLCBzaWduYWwpID0+IHtcbiAgICAgICAgbG9ndihvcHRpb25zLCBgb24gY2xvc2U6IGAgKyBjb2RlKSBcbiAgICAgICAgaWYoY29kZSA9PT0gMCkgeyByZXNvbHZlKDApIH1cbiAgICAgICAgZWxzZSB7IGNvbXBpbGF0aW9uLmVycm9ycy5wdXNoKCBuZXcgRXJyb3IoY29kZSkgKTsgcmVzb2x2ZSgwKSB9XG4gICAgICB9KVxuICAgICAgY2hpbGQub24oJ2Vycm9yJywgKGVycm9yKSA9PiB7IFxuICAgICAgICBsb2d2KG9wdGlvbnMsIGBvbiBlcnJvcmApIFxuICAgICAgICBjb21waWxhdGlvbi5lcnJvcnMucHVzaChlcnJvcilcbiAgICAgICAgcmVzb2x2ZSgwKVxuICAgICAgfSlcbiAgICAgIGNoaWxkLnN0ZG91dC5vbignZGF0YScsIChkYXRhKSA9PiB7XG4gICAgICAgIHZhciBzdHIgPSBkYXRhLnRvU3RyaW5nKCkucmVwbGFjZSgvXFxyP1xcbnxcXHIvZywgXCIgXCIpLnRyaW0oKVxuICAgICAgICBsb2d2KG9wdGlvbnMsIGAke3N0cn1gKVxuICAgICAgICBpZiAoZGF0YSAmJiBkYXRhLnRvU3RyaW5nKCkubWF0Y2goL3dhaXRpbmcgZm9yIGNoYW5nZXNcXC5cXC5cXC4vKSkge1xuICAgICAgICAgIHJlc29sdmUoMClcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBpZiAoc3Vic3RyaW5ncy5zb21lKGZ1bmN0aW9uKHYpIHsgcmV0dXJuIGRhdGEuaW5kZXhPZih2KSA+PSAwOyB9KSkgeyBcbiAgICAgICAgICAgIHN0ciA9IHN0ci5yZXBsYWNlKFwiW0lORl1cIiwgXCJcIilcbiAgICAgICAgICAgIHN0ciA9IHN0ci5yZXBsYWNlKFwiW0xPR11cIiwgXCJcIilcbiAgICAgICAgICAgIHN0ciA9IHN0ci5yZXBsYWNlKHByb2Nlc3MuY3dkKCksICcnKS50cmltKClcbiAgICAgICAgICAgIGlmIChzdHIuaW5jbHVkZXMoXCJbRVJSXVwiKSkge1xuICAgICAgICAgICAgICBjb21waWxhdGlvbi5lcnJvcnMucHVzaChhcHAgKyBzdHIucmVwbGFjZSgvXlxcW0VSUlxcXSAvZ2ksICcnKSk7XG4gICAgICAgICAgICAgIHN0ciA9IHN0ci5yZXBsYWNlKFwiW0VSUl1cIiwgYCR7Y2hhbGsucmVkKFwiW0VSUl1cIil9YClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxvZyhgJHthcHB9JHtzdHJ9YCkgXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgY2hpbGQuc3RkZXJyLm9uKCdkYXRhJywgKGRhdGEpID0+IHtcbiAgICAgICAgbG9ndihvcHRpb25zLCBgZXJyb3Igb24gY2xvc2U6IGAgKyBkYXRhKSBcbiAgICAgICAgdmFyIHN0ciA9IGRhdGEudG9TdHJpbmcoKS5yZXBsYWNlKC9cXHI/XFxufFxcci9nLCBcIiBcIikudHJpbSgpXG4gICAgICAgIHZhciBzdHJKYXZhT3B0cyA9IFwiUGlja2VkIHVwIF9KQVZBX09QVElPTlNcIjtcbiAgICAgICAgdmFyIGluY2x1ZGVzID0gc3RyLmluY2x1ZGVzKHN0ckphdmFPcHRzKVxuICAgICAgICBpZiAoIWluY2x1ZGVzKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coYCR7YXBwfSAke2NoYWxrLnJlZChcIltFUlJdXCIpfSAke3N0cn1gKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0pXG4gIH1cbiAgY2F0Y2goZSkge1xuICAgIHJlcXVpcmUoJy4vcGx1Z2luVXRpbCcpLmxvZ3Yob3B0aW9ucyxlKVxuICAgIGNvbXBpbGF0aW9uLmVycm9ycy5wdXNoKCdleGVjdXRlQXN5bmM6ICcgKyBlKVxuICAgIGNhbGxiYWNrKClcbiAgfSBcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gbG9nKHMpIHtcbiAgcmVxdWlyZSgncmVhZGxpbmUnKS5jdXJzb3JUbyhwcm9jZXNzLnN0ZG91dCwgMClcbiAgdHJ5IHtcbiAgICBwcm9jZXNzLnN0ZG91dC5jbGVhckxpbmUoKVxuICB9XG4gIGNhdGNoKGUpIHt9XG4gIHByb2Nlc3Muc3Rkb3V0LndyaXRlKHMpXG4gIHByb2Nlc3Muc3Rkb3V0LndyaXRlKCdcXG4nKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gbG9ndihvcHRpb25zLCBzKSB7XG4gIGlmIChvcHRpb25zLnZlcmJvc2UgPT0gJ3llcycpIHtcbiAgICByZXF1aXJlKCdyZWFkbGluZScpLmN1cnNvclRvKHByb2Nlc3Muc3Rkb3V0LCAwKVxuICAgIHRyeSB7XG4gICAgICBwcm9jZXNzLnN0ZG91dC5jbGVhckxpbmUoKVxuICAgIH1cbiAgICBjYXRjaChlKSB7fVxuICAgIHByb2Nlc3Muc3Rkb3V0LndyaXRlKGAtdmVyYm9zZTogJHtzfWApXG4gICAgcHJvY2Vzcy5zdGRvdXQud3JpdGUoJ1xcbicpXG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9nZXRBcHAoKSB7XG4gIHZhciBjaGFsayA9IHJlcXVpcmUoJ2NoYWxrJylcbiAgdmFyIHByZWZpeCA9IGBgXG4gIGNvbnN0IHBsYXRmb3JtID0gcmVxdWlyZSgnb3MnKS5wbGF0Zm9ybSgpXG4gIGlmIChwbGF0Zm9ybSA9PSAnZGFyd2luJykgeyBwcmVmaXggPSBg4oS5IO+9omV4dO+9ozpgIH1cbiAgZWxzZSB7IHByZWZpeCA9IGBpIFtleHRdOmAgfVxuICByZXR1cm4gYCR7Y2hhbGsuZ3JlZW4ocHJlZml4KX0gYFxufVxuXG5leHBvcnQgZnVuY3Rpb24gX2dldFZlcnNpb25zKGFwcCwgcGx1Z2luTmFtZSwgZnJhbWV3b3JrTmFtZSkge1xuICBjb25zdCBwYXRoID0gcmVxdWlyZSgncGF0aCcpXG4gIGNvbnN0IGZzID0gcmVxdWlyZSgnZnMnKVxuXG4gIHZhciB2ID0ge31cbiAgdmFyIHBsdWdpblBhdGggPSBwYXRoLnJlc29sdmUocHJvY2Vzcy5jd2QoKSwnbm9kZV9tb2R1bGVzL0BzZW5jaGEnLCBwbHVnaW5OYW1lKVxuICB2YXIgcGx1Z2luUGtnID0gKGZzLmV4aXN0c1N5bmMocGx1Z2luUGF0aCsnL3BhY2thZ2UuanNvbicpICYmIEpTT04ucGFyc2UoZnMucmVhZEZpbGVTeW5jKHBsdWdpblBhdGgrJy9wYWNrYWdlLmpzb24nLCAndXRmLTgnKSkgfHwge30pO1xuICB2LnBsdWdpblZlcnNpb24gPSBwbHVnaW5Qa2cudmVyc2lvblxuXG4gIHZhciB3ZWJwYWNrUGF0aCA9IHBhdGgucmVzb2x2ZShwcm9jZXNzLmN3ZCgpLCdub2RlX21vZHVsZXMvd2VicGFjaycpXG4gIHZhciB3ZWJwYWNrUGtnID0gKGZzLmV4aXN0c1N5bmMod2VicGFja1BhdGgrJy9wYWNrYWdlLmpzb24nKSAmJiBKU09OLnBhcnNlKGZzLnJlYWRGaWxlU3luYyh3ZWJwYWNrUGF0aCsnL3BhY2thZ2UuanNvbicsICd1dGYtOCcpKSB8fCB7fSk7XG4gIHYud2VicGFja1ZlcnNpb24gPSB3ZWJwYWNrUGtnLnZlcnNpb25cblxuICB2YXIgZXh0UGF0aCA9IHBhdGgucmVzb2x2ZShwcm9jZXNzLmN3ZCgpLCdub2RlX21vZHVsZXMvQHNlbmNoYS9leHQnKVxuICB2YXIgZXh0UGtnID0gKGZzLmV4aXN0c1N5bmMoZXh0UGF0aCsnL3BhY2thZ2UuanNvbicpICYmIEpTT04ucGFyc2UoZnMucmVhZEZpbGVTeW5jKGV4dFBhdGgrJy9wYWNrYWdlLmpzb24nLCAndXRmLTgnKSkgfHwge30pO1xuICB2LmV4dFZlcnNpb24gPSBleHRQa2cuc2VuY2hhLnZlcnNpb25cblxuICB2YXIgY21kUGF0aCA9IHBhdGgucmVzb2x2ZShwcm9jZXNzLmN3ZCgpLGBub2RlX21vZHVsZXMvQHNlbmNoYS9jbWRgKVxuICB2YXIgY21kUGtnID0gKGZzLmV4aXN0c1N5bmMoY21kUGF0aCsnL3BhY2thZ2UuanNvbicpICYmIEpTT04ucGFyc2UoZnMucmVhZEZpbGVTeW5jKGNtZFBhdGgrJy9wYWNrYWdlLmpzb24nLCAndXRmLTgnKSkgfHwge30pO1xuICB2LmNtZFZlcnNpb24gPSBjbWRQa2cudmVyc2lvbl9mdWxsXG5cbiAgaWYgKHYuY21kVmVyc2lvbiA9PSB1bmRlZmluZWQpIHtcbiAgICB2YXIgY21kUGF0aCA9IHBhdGgucmVzb2x2ZShwcm9jZXNzLmN3ZCgpLGBub2RlX21vZHVsZXMvQHNlbmNoYS8ke3BsdWdpbk5hbWV9L25vZGVfbW9kdWxlcy9Ac2VuY2hhL2NtZGApXG4gICAgdmFyIGNtZFBrZyA9IChmcy5leGlzdHNTeW5jKGNtZFBhdGgrJy9wYWNrYWdlLmpzb24nKSAmJiBKU09OLnBhcnNlKGZzLnJlYWRGaWxlU3luYyhjbWRQYXRoKycvcGFja2FnZS5qc29uJywgJ3V0Zi04JykpIHx8IHt9KTtcbiAgICB2LmNtZFZlcnNpb24gPSBjbWRQa2cudmVyc2lvbl9mdWxsXG4gIH1cblxuICB2YXIgZnJhbWV3b3JrSW5mbyA9ICcnXG4gICBpZiAoZnJhbWV3b3JrTmFtZSAhPSB1bmRlZmluZWQgJiYgZnJhbWV3b3JrTmFtZSAhPSAnZXh0anMnKSB7XG4gICAgdmFyIGZyYW1ld29ya1BhdGggPSAnJ1xuICAgIGlmIChmcmFtZXdvcmtOYW1lID09ICdyZWFjdCcpIHtcbiAgICAgIGZyYW1ld29ya1BhdGggPSBwYXRoLnJlc29sdmUocHJvY2Vzcy5jd2QoKSwnbm9kZV9tb2R1bGVzL3JlYWN0JylcbiAgICB9XG4gICAgaWYgKGZyYW1ld29ya05hbWUgPT0gJ2FuZ3VsYXInKSB7XG4gICAgICBmcmFtZXdvcmtQYXRoID0gcGF0aC5yZXNvbHZlKHByb2Nlc3MuY3dkKCksJ25vZGVfbW9kdWxlcy9AYW5ndWxhci9jb3JlJylcbiAgICB9XG4gICAgdmFyIGZyYW1ld29ya1BrZyA9IChmcy5leGlzdHNTeW5jKGZyYW1ld29ya1BhdGgrJy9wYWNrYWdlLmpzb24nKSAmJiBKU09OLnBhcnNlKGZzLnJlYWRGaWxlU3luYyhmcmFtZXdvcmtQYXRoKycvcGFja2FnZS5qc29uJywgJ3V0Zi04JykpIHx8IHt9KTtcbiAgICB2LmZyYW1ld29ya1ZlcnNpb24gPSBmcmFtZXdvcmtQa2cudmVyc2lvblxuICAgIGZyYW1ld29ya0luZm8gPSAnLCAnICsgZnJhbWV3b3JrTmFtZSArICcgdicgKyB2LmZyYW1ld29ya1ZlcnNpb25cbiAgfVxuXG4gIHJldHVybiBhcHAgKyAnZXh0LXdlYnBhY2stcGx1Z2luIHYnICsgdi5wbHVnaW5WZXJzaW9uICsgJywgRXh0IEpTIHYnICsgdi5leHRWZXJzaW9uICsgJywgU2VuY2hhIENtZCB2JyArIHYuY21kVmVyc2lvbiArICcsIHdlYnBhY2sgdicgKyB2LndlYnBhY2tWZXJzaW9uICsgZnJhbWV3b3JrSW5mb1xufSJdfQ==