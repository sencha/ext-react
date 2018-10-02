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
  if (vars.production) {
    logv(options, `ext-compilation-production`);
    compilation.hooks.succeedModule.tap(`ext-succeed-module`, module => {
      if (module.resource && module.resource.match(/\.(j|t)sx?$/) && !module.resource.match(/node_modules/) && !module.resource.match('/ext-react/dist/')) {
        vars.deps = [...(vars.deps || []), ...require(`./${vars.framework}Util`).extractFromSource(module._source._value)];
      }
    });
  } else {
    logv(options, `ext-compilation`);
  }

  if (options.framework != 'angular') {
    compilation.hooks.htmlWebpackPluginBeforeHtmlGeneration.tap(`ext-html-generation`, data => {
      logv(options, 'FUNCTION ext-html-generation');

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
  }
} //**********


function emit(_x, _x2, _x3, _x4, _x5) {
  return _emit.apply(this, arguments);
} //**********


function _emit() {
  _emit = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(compiler, compilation, vars, options, callback) {
    var app, framework, log, logv, path, _buildExtBundle, outputPath, parms, url, opn;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          app = vars.app;
          framework = vars.framework;
          log = require('./pluginUtil').log;
          logv = require('./pluginUtil').logv;
          logv(options, 'FUNCTION ext-emit');
          path = require('path');
          _buildExtBundle = require('./pluginUtil')._buildExtBundle;
          outputPath = path.join(compiler.outputPath, vars.extPath);

          if (compiler.outputPath === '/' && compiler.options.devServer) {
            outputPath = path.join(compiler.options.devServer.contentBase, outputPath);
          }

          logv(options, 'outputPath: ' + outputPath);
          logv(options, 'framework: ' + framework);

          if (!(options.emit == true)) {
            _context.next = 23;
            break;
          }

          if (framework != 'extjs') {
            _prepareForBuild(app, vars, options, outputPath);
          } else {
            require(`./${framework}Util`)._prepareForBuild(app, vars, options, outputPath, compilation);
          }

          if (!(vars.rebuild == true)) {
            _context.next = 21;
            break;
          }

          parms = [];

          if (options.profile == undefined || options.profile == '' || options.profile == null) {
            parms = ['app', 'build', options.environment];
          } else {
            parms = ['app', 'build', options.profile, options.environment];
          }

          _context.next = 19;
          return _buildExtBundle(app, compilation, outputPath, parms, options);

        case 19:
          if (options.browser == true) {
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

        case 21:
          _context.next = 26;
          break;

        case 23:
          log(`${vars.app}Emit not run`);

          if (options.browser == true) {
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

        case 26:
          _context.next = 32;
          break;

        case 28:
          _context.prev = 28;
          _context.t0 = _context["catch"](0);
          compilation.errors.push('emit: ' + _context.t0);
          callback();

        case 32:
        case "end":
          return _context.stop();
      }
    }, _callee, this, [[0, 28]]);
  }));
  return _emit.apply(this, arguments);
}

function _prepareForBuild(app, vars, options, output) {
  logv(options, '_prepareForBuild');

  const rimraf = require('rimraf');

  const mkdirp = require('mkdirp');

  const fsx = require('fs-extra');

  const fs = require('fs');

  const path = require('path');

  var packages = options.packages;
  var toolkit = options.toolkit;
  var theme = options.theme;
  theme = theme || (toolkit === 'classic' ? 'theme-triton' : 'theme-material');
  logv(options, vars.firstTime);

  if (vars.firstTime) {
    logv(options, output);
    rimraf.sync(output);
    mkdirp.sync(output);
    logv(options, require('./artifacts'));

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

    if (fs.existsSync(path.join(process.cwd(), vars.extPath + '/packages/'))) {
      var fromPackages = path.join(process.cwd(), vars.extPath + '/packages/');
      var toPackages = path.join(output, 'packages/');
      fsx.copySync(fromPackages, toPackages);
      log(app + 'Copying ' + fromPackages.replace(process.cwd(), '') + ' to: ' + toPackages.replace(process.cwd(), ''));
    }

    if (fs.existsSync(path.join(process.cwd(), vars.extPath + '/overrides/'))) {
      var fromOverrides = path.join(process.cwd(), vars.extPath + '/overrides/');
      var toOverrides = path.join(output, 'overrides/');
      fsx.copySync(fromOverrides, toOverrides);
      log(app + 'Copying ' + fromOverrides.replace(process.cwd(), '') + ' to: ' + toOverrides.replace(process.cwd(), ''));
    }
  }

  vars.firstTime = false;
  let js;

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
} //**********


function _buildExtBundle(app, compilation, outputPath, parms, options) {
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
          //const DEFAULT_SUBSTRS = ['[INF] Loading', '[INF] Processing', '[LOG] Fashion build complete', '[ERR]', '[WRN]', "[INF] Server", "[INF] Writing", "[INF] Loading Build", "[INF] Waiting", "[LOG] Fashion waiting"];
          DEFAULT_SUBSTRS = ['[INF] Loading', '[INF] Append', '[INF] Processing', '[INF] Processing Build', '[LOG] Fashion build complete', '[ERR]', '[WRN]', "[INF] Server", "[INF] Writing", "[INF] Loading Build", "[INF] Waiting", "[LOG] Fashion waiting"];
          substrings = DEFAULT_SUBSTRS;
          chalk = require('chalk');
          crossSpawn = require('cross-spawn');
          log = require('./pluginUtil').log;
          logv(options, 'FUNCTION executeAsync');
          _context2.next = 8;
          return new Promise((resolve, reject) => {
            logv(options, `command - ${command}`);
            logv(options, `parms - ${parms}`);
            logv(options, `opts - ${JSON.stringify(opts)}`);
            let child = crossSpawn(command, parms, opts);
            child.on('close', (code, signal) => {
              logv(options, `on close`);

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

              if (data && data.toString().match(/Waiting for changes\.\.\./)) {
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
              logv(options, `error on close`);
              var str = data.toString().replace(/\r?\n|\r/g, " ").trim();
              var strJavaOpts = "Picked up _JAVA_OPTIONS";
              var includes = str.includes(strJavaOpts);

              if (!includes) {
                console.log(`${app} ${chalk.red("[ERR]")} ${str}`);
              }
            });
          });

        case 8:
        case "end":
          return _context2.stop();
      }
    }, _callee2, this);
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
  var cmdPath = path.resolve(process.cwd(), `node_modules/@sencha/${pluginName}/node_modules/@sencha/cmd`);
  var cmdPkg = fs.existsSync(cmdPath + '/package.json') && JSON.parse(fs.readFileSync(cmdPath + '/package.json', 'utf-8')) || {};
  v.cmdVersion = cmdPkg.version_full;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9wbHVnaW5VdGlsLmpzIl0sIm5hbWVzIjpbIl9jb25zdHJ1Y3RvciIsIm9wdGlvbnMiLCJ0aGlzVmFycyIsInRoaXNPcHRpb25zIiwicGx1Z2luIiwiZnJhbWV3b3JrIiwidW5kZWZpbmVkIiwicGx1Z2luRXJyb3JzIiwicHVzaCIsInZhcnMiLCJ2YWxpZGF0ZU9wdGlvbnMiLCJyZXF1aXJlIiwiZ2V0VmFsaWRhdGVPcHRpb25zIiwiZ2V0RGVmYXVsdFZhcnMiLCJwbHVnaW5OYW1lIiwiYXBwIiwiX2dldEFwcCIsImxvZ3YiLCJmcyIsInJjIiwiZXhpc3RzU3luYyIsIkpTT04iLCJwYXJzZSIsInJlYWRGaWxlU3luYyIsImdldERlZmF1bHRPcHRpb25zIiwic3RyaW5naWZ5IiwiZW52aXJvbm1lbnQiLCJwcm9kdWN0aW9uIiwibG9nIiwiX2dldFZlcnNpb25zIiwiX2NvbXBpbGF0aW9uIiwiY29tcGlsZXIiLCJjb21waWxhdGlvbiIsImhvb2tzIiwic3VjY2VlZE1vZHVsZSIsInRhcCIsIm1vZHVsZSIsInJlc291cmNlIiwibWF0Y2giLCJkZXBzIiwiZXh0cmFjdEZyb21Tb3VyY2UiLCJfc291cmNlIiwiX3ZhbHVlIiwiaHRtbFdlYnBhY2tQbHVnaW5CZWZvcmVIdG1sR2VuZXJhdGlvbiIsImRhdGEiLCJwYXRoIiwib3V0cHV0UGF0aCIsImRldlNlcnZlciIsImpvaW4iLCJjb250ZW50QmFzZSIsInJlcGxhY2UiLCJwcm9jZXNzIiwiY3dkIiwidHJpbSIsImpzUGF0aCIsImV4dFBhdGgiLCJjc3NQYXRoIiwiYXNzZXRzIiwianMiLCJ1bnNoaWZ0IiwiY3NzIiwiZW1pdCIsImNhbGxiYWNrIiwiX2J1aWxkRXh0QnVuZGxlIiwiX3ByZXBhcmVGb3JCdWlsZCIsInJlYnVpbGQiLCJwYXJtcyIsInByb2ZpbGUiLCJicm93c2VyIiwiYnJvd3NlckNvdW50IiwiZXJyb3JzIiwibGVuZ3RoIiwidXJsIiwicG9ydCIsIm9wbiIsIm91dHB1dCIsInJpbXJhZiIsIm1rZGlycCIsImZzeCIsInBhY2thZ2VzIiwidG9vbGtpdCIsInRoZW1lIiwiZmlyc3RUaW1lIiwic3luYyIsImJ1aWxkWE1MIiwiY3JlYXRlQXBwSnNvbiIsImNyZWF0ZVdvcmtzcGFjZUpzb24iLCJjcmVhdGVKU0RPTUVudmlyb25tZW50Iiwid3JpdGVGaWxlU3luYyIsImZyb21SZXNvdXJjZXMiLCJ0b1Jlc291cmNlcyIsImNvcHlTeW5jIiwiZnJvbVBhY2thZ2VzIiwidG9QYWNrYWdlcyIsImZyb21PdmVycmlkZXMiLCJ0b092ZXJyaWRlcyIsIm1hbmlmZXN0Iiwic2VuY2hhIiwiZSIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0Iiwib25CdWlsZERvbmUiLCJvcHRzIiwic2lsZW50Iiwic3RkaW8iLCJlbmNvZGluZyIsImV4ZWN1dGVBc3luYyIsInRoZW4iLCJyZWFzb24iLCJjb21tYW5kIiwiREVGQVVMVF9TVUJTVFJTIiwic3Vic3RyaW5ncyIsImNoYWxrIiwiY3Jvc3NTcGF3biIsImNoaWxkIiwib24iLCJjb2RlIiwic2lnbmFsIiwiRXJyb3IiLCJlcnJvciIsInN0ZG91dCIsInN0ciIsInRvU3RyaW5nIiwic29tZSIsInYiLCJpbmRleE9mIiwiaW5jbHVkZXMiLCJyZWQiLCJzdGRlcnIiLCJzdHJKYXZhT3B0cyIsImNvbnNvbGUiLCJzIiwiY3Vyc29yVG8iLCJjbGVhckxpbmUiLCJ3cml0ZSIsInZlcmJvc2UiLCJwcmVmaXgiLCJwbGF0Zm9ybSIsImdyZWVuIiwiZnJhbWV3b3JrTmFtZSIsInBsdWdpblBhdGgiLCJwbHVnaW5Qa2ciLCJwbHVnaW5WZXJzaW9uIiwidmVyc2lvbiIsIndlYnBhY2tQYXRoIiwid2VicGFja1BrZyIsIndlYnBhY2tWZXJzaW9uIiwiZXh0UGtnIiwiZXh0VmVyc2lvbiIsImNtZFBhdGgiLCJjbWRQa2ciLCJjbWRWZXJzaW9uIiwidmVyc2lvbl9mdWxsIiwiZnJhbWV3b3JrSW5mbyIsImZyYW1ld29ya1BhdGgiLCJmcmFtZXdvcmtQa2ciLCJmcmFtZXdv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QyxDQUFDc0IsY0FBbkksR0FBb0pPLGFBQTNKO0FBQ0QiLCJzb3VyY2VzQ29udGVudCI6WyIvLyoqKioqKioqKipcbmV4cG9ydCBmdW5jdGlvbiBfY29uc3RydWN0b3Iob3B0aW9ucykge1xuICB2YXIgdGhpc1ZhcnMgPSB7fVxuICB2YXIgdGhpc09wdGlvbnMgPSB7fVxuICB2YXIgcGx1Z2luID0ge31cblxuICBpZiAob3B0aW9ucy5mcmFtZXdvcmsgPT0gdW5kZWZpbmVkKSB7XG4gICAgdGhpc1ZhcnMucGx1Z2luRXJyb3JzID0gW11cbiAgICB0aGlzVmFycy5wbHVnaW5FcnJvcnMucHVzaCgnd2VicGFjayBjb25maWc6IGZyYW1ld29yayBwYXJhbWV0ZXIgb24gZXh0LXdlYnBhY2stcGx1Z2luIGlzIG5vdCBkZWZpbmVkIC0gdmFsdWVzOiByZWFjdCwgYW5ndWxhciwgZXh0anMnKVxuICAgIHBsdWdpbi52YXJzID0gdGhpc1ZhcnNcbiAgICByZXR1cm4gcGx1Z2luXG4gIH1cblxuICBjb25zdCB2YWxpZGF0ZU9wdGlvbnMgPSByZXF1aXJlKCdzY2hlbWEtdXRpbHMnKVxuICB2YWxpZGF0ZU9wdGlvbnMocmVxdWlyZShgLi8ke29wdGlvbnMuZnJhbWV3b3JrfVV0aWxgKS5nZXRWYWxpZGF0ZU9wdGlvbnMoKSwgb3B0aW9ucywgJycpXG5cbiAgdGhpc1ZhcnMgPSByZXF1aXJlKGAuLyR7b3B0aW9ucy5mcmFtZXdvcmt9VXRpbGApLmdldERlZmF1bHRWYXJzKClcbiAgdGhpc1ZhcnMuZnJhbWV3b3JrID0gb3B0aW9ucy5mcmFtZXdvcmtcbiAgc3dpdGNoKHRoaXNWYXJzLmZyYW1ld29yaykge1xuICAgIGNhc2UgJ2V4dGpzJzpcbiAgICAgIHRoaXNWYXJzLnBsdWdpbk5hbWUgPSAnZXh0LXdlYnBhY2stcGx1Z2luJ1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAncmVhY3QnOlxuICAgICAgdGhpc1ZhcnMucGx1Z2luTmFtZSA9ICdleHQtcmVhY3Qtd2VicGFjay1wbHVnaW4nXG4gICAgICBicmVhaztcbiAgICBjYXNlICdhbmd1bGFyJzpcbiAgICAgIHRoaXNWYXJzLnBsdWdpbk5hbWUgPSAnZXh0LWFuZ3VsYXItd2VicGFjay1wbHVnaW4nXG4gICAgICBicmVhaztcbiAgICBkZWZhdWx0OlxuICAgICAgdGhpc1ZhcnMucGx1Z2luTmFtZSA9ICdleHQtd2VicGFjay1wbHVnaW4nXG4gIH1cbiAgdGhpc1ZhcnMuYXBwID0gcmVxdWlyZSgnLi9wbHVnaW5VdGlsJykuX2dldEFwcCgpXG4gIGxvZ3Yob3B0aW9ucywgYHBsdWdpbk5hbWUgLSAke3RoaXNWYXJzLnBsdWdpbk5hbWV9YClcbiAgbG9ndihvcHRpb25zLCBgdGhpc1ZhcnMuYXBwIC0gJHt0aGlzVmFycy5hcHB9YClcbiAgY29uc3QgZnMgPSByZXF1aXJlKCdmcycpXG4gIGNvbnN0IHJjID0gKGZzLmV4aXN0c1N5bmMoYC5leHQtJHt0aGlzVmFycy5mcmFtZXdvcmt9cmNgKSAmJiBKU09OLnBhcnNlKGZzLnJlYWRGaWxlU3luYyhgLmV4dC0ke3RoaXNWYXJzLmZyYW1ld29ya31yY2AsICd1dGYtOCcpKSB8fCB7fSlcbiAgdGhpc09wdGlvbnMgPSB7IC4uLnJlcXVpcmUoYC4vJHt0aGlzVmFycy5mcmFtZXdvcmt9VXRpbGApLmdldERlZmF1bHRPcHRpb25zKCksIC4uLm9wdGlvbnMsIC4uLnJjIH1cbiAgbG9ndihvcHRpb25zLCBgdGhpc09wdGlvbnMgLSAke0pTT04uc3RyaW5naWZ5KHRoaXNPcHRpb25zKX1gKVxuICBpZiAodGhpc09wdGlvbnMuZW52aXJvbm1lbnQgPT0gJ3Byb2R1Y3Rpb24nKSBcbiAgICB7dGhpc1ZhcnMucHJvZHVjdGlvbiA9IHRydWV9XG4gIGVsc2UgXG4gICAge3RoaXNWYXJzLnByb2R1Y3Rpb24gPSBmYWxzZX1cbiAgbG9nKHJlcXVpcmUoJy4vcGx1Z2luVXRpbCcpLl9nZXRWZXJzaW9ucyh0aGlzVmFycy5hcHAsIHRoaXNWYXJzLnBsdWdpbk5hbWUsIHRoaXNWYXJzLmZyYW1ld29yaykpXG4gIGxvZyh0aGlzVmFycy5hcHAgKyAnQnVpbGRpbmcgZm9yICcgKyB0aGlzT3B0aW9ucy5lbnZpcm9ubWVudClcblxuICBwbHVnaW4udmFycyA9IHRoaXNWYXJzXG4gIHBsdWdpbi5vcHRpb25zID0gdGhpc09wdGlvbnNcbiAgcmV0dXJuIHBsdWdpblxufVxuXG4vLyoqKioqKioqKipcbmV4cG9ydCBmdW5jdGlvbiBfY29tcGlsYXRpb24oY29tcGlsZXIsIGNvbXBpbGF0aW9uLCB2YXJzLCBvcHRpb25zKSB7XG4gIGlmICh2YXJzLnByb2R1Y3Rpb24pIHtcbiAgICBsb2d2KG9wdGlvbnMsYGV4dC1jb21waWxhdGlvbi1wcm9kdWN0aW9uYClcbiAgICBjb21waWxhdGlvbi5ob29rcy5zdWNjZWVkTW9kdWxlLnRhcChgZXh0LXN1Y2NlZWQtbW9kdWxlYCwgKG1vZHVsZSkgPT4ge1xuICAgICAgaWYgKG1vZHVsZS5yZXNvdXJjZSAmJiBtb2R1bGUucmVzb3VyY2UubWF0Y2goL1xcLihqfHQpc3g/JC8pICYmICFtb2R1bGUucmVzb3VyY2UubWF0Y2goL25vZGVfbW9kdWxlcy8pICYmICFtb2R1bGUucmVzb3VyY2UubWF0Y2goJy9leHQtcmVhY3QvZGlzdC8nKSkge1xuICAgICAgICB2YXJzLmRlcHMgPSBbIFxuICAgICAgICAgIC4uLih2YXJzLmRlcHMgfHwgW10pLCBcbiAgICAgICAgICAuLi5yZXF1aXJlKGAuLyR7dmFycy5mcmFtZXdvcmt9VXRpbGApLmV4dHJhY3RGcm9tU291cmNlKG1vZHVsZS5fc291cmNlLl92YWx1ZSkgXG4gICAgICAgIF1cbiAgICAgIH1cbiAgICB9KVxuICB9XG4gIGVsc2Uge1xuICAgIGxvZ3Yob3B0aW9ucywgYGV4dC1jb21waWxhdGlvbmApXG4gIH1cbiAgaWYgKG9wdGlvbnMuZnJhbWV3b3JrICE9ICdhbmd1bGFyJykge1xuICAgIGNvbXBpbGF0aW9uLmhvb2tzLmh0bWxXZWJwYWNrUGx1Z2luQmVmb3JlSHRtbEdlbmVyYXRpb24udGFwKGBleHQtaHRtbC1nZW5lcmF0aW9uYCwoZGF0YSkgPT4ge1xuICAgICAgbG9ndihvcHRpb25zLCdGVU5DVElPTiBleHQtaHRtbC1nZW5lcmF0aW9uJylcbiAgICAgIGNvbnN0IHBhdGggPSByZXF1aXJlKCdwYXRoJylcbiAgICAgIHZhciBvdXRwdXRQYXRoID0gJydcbiAgICAgIGlmIChjb21waWxlci5vcHRpb25zLmRldlNlcnZlcikge1xuICAgICAgICBpZiAoY29tcGlsZXIub3V0cHV0UGF0aCA9PT0gJy8nKSB7XG4gICAgICAgICAgb3V0cHV0UGF0aCA9IHBhdGguam9pbihjb21waWxlci5vcHRpb25zLmRldlNlcnZlci5jb250ZW50QmFzZSwgb3V0cHV0UGF0aClcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBpZiAoY29tcGlsZXIub3B0aW9ucy5kZXZTZXJ2ZXIuY29udGVudEJhc2UgPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBvdXRwdXRQYXRoID0gJ2J1aWxkJ1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIG91dHB1dFBhdGggPSAnJ1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIG91dHB1dFBhdGggPSAnYnVpbGQnXG4gICAgICB9XG4gICAgICBvdXRwdXRQYXRoID0gb3V0cHV0UGF0aC5yZXBsYWNlKHByb2Nlc3MuY3dkKCksICcnKS50cmltKClcbiAgICAgIHZhciBqc1BhdGggPSBwYXRoLmpvaW4ob3V0cHV0UGF0aCwgdmFycy5leHRQYXRoLCAnZXh0LmpzJylcbiAgICAgIHZhciBjc3NQYXRoID0gcGF0aC5qb2luKG91dHB1dFBhdGgsIHZhcnMuZXh0UGF0aCwgJ2V4dC5jc3MnKVxuICAgICAgZGF0YS5hc3NldHMuanMudW5zaGlmdChqc1BhdGgpXG4gICAgICBkYXRhLmFzc2V0cy5jc3MudW5zaGlmdChjc3NQYXRoKVxuICAgICAgbG9nKHZhcnMuYXBwICsgYEFkZGluZyAke2pzUGF0aH0gYW5kICR7Y3NzUGF0aH0gdG8gaW5kZXguaHRtbGApXG4gICAgfSlcbiAgfVxufVxuXG4vLyoqKioqKioqKipcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBlbWl0KGNvbXBpbGVyLCBjb21waWxhdGlvbiwgdmFycywgb3B0aW9ucywgY2FsbGJhY2spIHtcbiAgdHJ5IHtcbiAgICB2YXIgYXBwID0gdmFycy5hcHBcbiAgICB2YXIgZnJhbWV3b3JrID0gdmFycy5mcmFtZXdvcmtcbiAgICBjb25zdCBsb2cgPSByZXF1aXJlKCcuL3BsdWdpblV0aWwnKS5sb2dcbiAgICBjb25zdCBsb2d2ID0gcmVxdWlyZSgnLi9wbHVnaW5VdGlsJykubG9ndlxuICAgIGxvZ3Yob3B0aW9ucywnRlVOQ1RJT04gZXh0LWVtaXQnKVxuICAgIGNvbnN0IHBhdGggPSByZXF1aXJlKCdwYXRoJylcbiAgICBjb25zdCBfYnVpbGRFeHRCdW5kbGUgPSByZXF1aXJlKCcuL3BsdWdpblV0aWwnKS5fYnVpbGRFeHRCdW5kbGVcbiAgICBsZXQgb3V0cHV0UGF0aCA9IHBhdGguam9pbihjb21waWxlci5vdXRwdXRQYXRoLHZhcnMuZXh0UGF0aClcbiAgICBpZiAoY29tcGlsZXIub3V0cHV0UGF0aCA9PT0gJy8nICYmIGNvbXBpbGVyLm9wdGlvbnMuZGV2U2VydmVyKSB7XG4gICAgICBvdXRwdXRQYXRoID0gcGF0aC5qb2luKGNvbXBpbGVyLm9wdGlvbnMuZGV2U2VydmVyLmNvbnRlbnRCYXNlLCBvdXRwdXRQYXRoKVxuICAgIH1cbiAgICBsb2d2KG9wdGlvbnMsJ291dHB1dFBhdGg6ICcgKyBvdXRwdXRQYXRoKVxuICAgIGxvZ3Yob3B0aW9ucywnZnJhbWV3b3JrOiAnICsgZnJhbWV3b3JrKVxuICAgIGlmIChvcHRpb25zLmVtaXQgPT0gdHJ1ZSkge1xuICAgICAgaWYgKGZyYW1ld29yayAhPSAnZXh0anMnKSB7XG4gICAgICAgIF9wcmVwYXJlRm9yQnVpbGQoYXBwLCB2YXJzLCBvcHRpb25zLCBvdXRwdXRQYXRoKVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHJlcXVpcmUoYC4vJHtmcmFtZXdvcmt9VXRpbGApLl9wcmVwYXJlRm9yQnVpbGQoYXBwLCB2YXJzLCBvcHRpb25zLCBvdXRwdXRQYXRoLCBjb21waWxhdGlvbilcbiAgICAgIH1cbiAgICAgIGlmICh2YXJzLnJlYnVpbGQgPT0gdHJ1ZSkge1xuICAgICAgICB2YXIgcGFybXMgPSBbXVxuICAgICAgICBpZiAob3B0aW9ucy5wcm9maWxlID09IHVuZGVmaW5lZCB8fCBvcHRpb25zLnByb2ZpbGUgPT0gJycgfHwgb3B0aW9ucy5wcm9maWxlID09IG51bGwpIHtcbiAgICAgICAgICBwYXJtcyA9IFsnYXBwJywgJ2J1aWxkJywgb3B0aW9ucy5lbnZpcm9ubWVudF1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBwYXJtcyA9IFsnYXBwJywgJ2J1aWxkJywgb3B0aW9ucy5wcm9maWxlLCBvcHRpb25zLmVudmlyb25tZW50XVxuICAgICAgICB9XG4gICAgICAgIGF3YWl0IF9idWlsZEV4dEJ1bmRsZShhcHAsIGNvbXBpbGF0aW9uLCBvdXRwdXRQYXRoLCBwYXJtcywgb3B0aW9ucylcbiAgICAgICAgXG4gICAgICAgIGlmKG9wdGlvbnMuYnJvd3NlciA9PSB0cnVlKSB7XG4gICAgICAgICAgaWYgKHZhcnMuYnJvd3NlckNvdW50ID09IDAgJiYgY29tcGlsYXRpb24uZXJyb3JzLmxlbmd0aCA9PSAwKSB7XG4gICAgICAgICAgICB2YXIgdXJsID0gJ2h0dHA6Ly9sb2NhbGhvc3Q6JyArIG9wdGlvbnMucG9ydFxuICAgICAgICAgICAgbG9nKGFwcCArIGBPcGVuaW5nIGJyb3dzZXIgYXQgJHt1cmx9YClcbiAgICAgICAgICAgIHZhcnMuYnJvd3NlckNvdW50KytcbiAgICAgICAgICAgIGNvbnN0IG9wbiA9IHJlcXVpcmUoJ29wbicpXG4gICAgICAgICAgICBvcG4odXJsKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBsb2d2KG9wdGlvbnMsJ2Jyb3dzZXIgTk9UIG9wZW5lZCcpXG4gICAgICAgIH1cbiAgICAgICAgY2FsbGJhY2soKVxuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGxvZyhgJHt2YXJzLmFwcH1FbWl0IG5vdCBydW5gKVxuICAgICAgaWYob3B0aW9ucy5icm93c2VyID09IHRydWUpIHtcbiAgICAgICAgaWYgKHZhcnMuYnJvd3NlckNvdW50ID09IDAgJiYgY29tcGlsYXRpb24uZXJyb3JzLmxlbmd0aCA9PSAwKSB7XG4gICAgICAgICAgdmFyIHVybCA9ICdodHRwOi8vbG9jYWxob3N0OicgKyBvcHRpb25zLnBvcnRcbiAgICAgICAgICBsb2coYXBwICsgYE9wZW5pbmcgYnJvd3NlciBhdCAke3VybH1gKVxuICAgICAgICAgIHZhcnMuYnJvd3NlckNvdW50KytcbiAgICAgICAgICBjb25zdCBvcG4gPSByZXF1aXJlKCdvcG4nKVxuICAgICAgICAgIG9wbih1cmwpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBsb2d2KG9wdGlvbnMsJ2Jyb3dzZXIgTk9UIG9wZW5lZCcpXG4gICAgICB9XG4gICAgICBjYWxsYmFjaygpXG4gICAgfVxuICB9XG4gIGNhdGNoKGUpIHtcbiAgICBjb21waWxhdGlvbi5lcnJvcnMucHVzaCgnZW1pdDogJyArIGUpXG4gICAgY2FsbGJhY2soKVxuICB9XG59XG5cbi8vKioqKioqKioqKlxuZXhwb3J0IGZ1bmN0aW9uIF9wcmVwYXJlRm9yQnVpbGQoYXBwLCB2YXJzLCBvcHRpb25zLCBvdXRwdXQpIHtcbiAgbG9ndihvcHRpb25zLCdfcHJlcGFyZUZvckJ1aWxkJylcbiAgY29uc3QgcmltcmFmID0gcmVxdWlyZSgncmltcmFmJylcbiAgY29uc3QgbWtkaXJwID0gcmVxdWlyZSgnbWtkaXJwJylcbiAgY29uc3QgZnN4ID0gcmVxdWlyZSgnZnMtZXh0cmEnKVxuICBjb25zdCBmcyA9IHJlcXVpcmUoJ2ZzJylcbiAgY29uc3QgcGF0aCA9IHJlcXVpcmUoJ3BhdGgnKVxuXG4gIHZhciBwYWNrYWdlcyA9IG9wdGlvbnMucGFja2FnZXNcbiAgdmFyIHRvb2xraXQgPSBvcHRpb25zLnRvb2xraXRcbiAgdmFyIHRoZW1lID0gb3B0aW9ucy50aGVtZVxuXG4gIHRoZW1lID0gdGhlbWUgfHwgKHRvb2xraXQgPT09ICdjbGFzc2ljJyA/ICd0aGVtZS10cml0b24nIDogJ3RoZW1lLW1hdGVyaWFsJylcbiAgbG9ndihvcHRpb25zLHZhcnMuZmlyc3RUaW1lKVxuICBpZiAodmFycy5maXJzdFRpbWUpIHtcbiAgICBsb2d2KG9wdGlvbnMsb3V0cHV0KVxuICAgIHJpbXJhZi5zeW5jKG91dHB1dClcbiAgICBta2RpcnAuc3luYyhvdXRwdXQpXG4gICAgbG9ndihvcHRpb25zLHJlcXVpcmUoJy4vYXJ0aWZhY3RzJykpXG4gICAgY29uc3QgYnVpbGRYTUwgPSByZXF1aXJlKCcuL2FydGlmYWN0cycpLmJ1aWxkWE1MXG4gICAgY29uc3QgY3JlYXRlQXBwSnNvbiA9IHJlcXVpcmUoJy4vYXJ0aWZhY3RzJykuY3JlYXRlQXBwSnNvblxuICAgIGNvbnN0IGNyZWF0ZVdvcmtzcGFjZUpzb24gPSByZXF1aXJlKCcuL2FydGlmYWN0cycpLmNyZWF0ZVdvcmtzcGFjZUpzb25cbiAgICBjb25zdCBjcmVhdGVKU0RPTUVudmlyb25tZW50ID0gcmVxdWlyZSgnLi9hcnRpZmFjdHMnKS5jcmVhdGVKU0RPTUVudmlyb25tZW50XG5cbiAgICBmcy53cml0ZUZpbGVTeW5jKHBhdGguam9pbihvdXRwdXQsICdidWlsZC54bWwnKSwgYnVpbGRYTUwodmFycy5wcm9kdWN0aW9uLCBvcHRpb25zKSwgJ3V0ZjgnKVxuICAgIGZzLndyaXRlRmlsZVN5bmMocGF0aC5qb2luKG91dHB1dCwgJ2FwcC5qc29uJyksIGNyZWF0ZUFwcEpzb24odGhlbWUsIHBhY2thZ2VzLCB0b29sa2l0LCBvcHRpb25zKSwgJ3V0ZjgnKVxuICAgIGZzLndyaXRlRmlsZVN5bmMocGF0aC5qb2luKG91dHB1dCwgJ2pzZG9tLWVudmlyb25tZW50LmpzJyksIGNyZWF0ZUpTRE9NRW52aXJvbm1lbnQob3B0aW9ucyksICd1dGY4JylcbiAgICBmcy53cml0ZUZpbGVTeW5jKHBhdGguam9pbihvdXRwdXQsICd3b3Jrc3BhY2UuanNvbicpLCBjcmVhdGVXb3Jrc3BhY2VKc29uKG9wdGlvbnMpLCAndXRmOCcpXG5cbiAgICBpZiAoZnMuZXhpc3RzU3luYyhwYXRoLmpvaW4ocHJvY2Vzcy5jd2QoKSwgJ3Jlc291cmNlcy8nKSkpIHtcbiAgICAgIHZhciBmcm9tUmVzb3VyY2VzID0gcGF0aC5qb2luKHByb2Nlc3MuY3dkKCksICdyZXNvdXJjZXMvJylcbiAgICAgIHZhciB0b1Jlc291cmNlcyA9IHBhdGguam9pbihvdXRwdXQsICcuLi9yZXNvdXJjZXMnKVxuICAgICAgZnN4LmNvcHlTeW5jKGZyb21SZXNvdXJjZXMsIHRvUmVzb3VyY2VzKVxuICAgICAgbG9nKGFwcCArICdDb3B5aW5nICcgKyBmcm9tUmVzb3VyY2VzLnJlcGxhY2UocHJvY2Vzcy5jd2QoKSwgJycpICsgJyB0bzogJyArIHRvUmVzb3VyY2VzLnJlcGxhY2UocHJvY2Vzcy5jd2QoKSwgJycpKVxuICAgIH1cblxuICAgIGlmIChmcy5leGlzdHNTeW5jKHBhdGguam9pbihwcm9jZXNzLmN3ZCgpLCdyZXNvdXJjZXMvJykpKSB7XG4gICAgICB2YXIgZnJvbVJlc291cmNlcyA9IHBhdGguam9pbihwcm9jZXNzLmN3ZCgpLCAncmVzb3VyY2VzLycpXG4gICAgICB2YXIgdG9SZXNvdXJjZXMgPSBwYXRoLmpvaW4ob3V0cHV0LCAncmVzb3VyY2VzJylcbiAgICAgIGZzeC5jb3B5U3luYyhmcm9tUmVzb3VyY2VzLCB0b1Jlc291cmNlcylcbiAgICAgIGxvZyhhcHAgKyAnQ29weWluZyAnICsgZnJvbVJlc291cmNlcy5yZXBsYWNlKHByb2Nlc3MuY3dkKCksICcnKSArICcgdG86ICcgKyB0b1Jlc291cmNlcy5yZXBsYWNlKHByb2Nlc3MuY3dkKCksICcnKSlcbiAgICB9XG5cbiAgICBpZiAoZnMuZXhpc3RzU3luYyhwYXRoLmpvaW4ocHJvY2Vzcy5jd2QoKSx2YXJzLmV4dFBhdGggKyAnL3BhY2thZ2VzLycpKSkge1xuICAgICAgdmFyIGZyb21QYWNrYWdlcyA9IHBhdGguam9pbihwcm9jZXNzLmN3ZCgpLHZhcnMuZXh0UGF0aCArICcvcGFja2FnZXMvJylcbiAgICAgIHZhciB0b1BhY2thZ2VzID0gcGF0aC5qb2luKG91dHB1dCwgJ3BhY2thZ2VzLycpXG4gICAgICBmc3guY29weVN5bmMoZnJvbVBhY2thZ2VzLCB0b1BhY2thZ2VzKVxuICAgICAgbG9nKGFwcCArICdDb3B5aW5nICcgKyBmcm9tUGFja2FnZXMucmVwbGFjZShwcm9jZXNzLmN3ZCgpLCAnJykgKyAnIHRvOiAnICsgdG9QYWNrYWdlcy5yZXBsYWNlKHByb2Nlc3MuY3dkKCksICcnKSlcbiAgICB9XG5cbiAgICBpZiAoZnMuZXhpc3RzU3luYyhwYXRoLmpvaW4ocHJvY2Vzcy5jd2QoKSx2YXJzLmV4dFBhdGggKyAnL292ZXJyaWRlcy8nKSkpIHtcbiAgICAgIHZhciBmcm9tT3ZlcnJpZGVzID0gcGF0aC5qb2luKHByb2Nlc3MuY3dkKCksdmFycy5leHRQYXRoICsgJy9vdmVycmlkZXMvJylcbiAgICAgIHZhciB0b092ZXJyaWRlcyA9IHBhdGguam9pbihvdXRwdXQsICdvdmVycmlkZXMvJylcbiAgICAgIGZzeC5jb3B5U3luYyhmcm9tT3ZlcnJpZGVzLCB0b092ZXJyaWRlcylcbiAgICAgIGxvZyhhcHAgKyAnQ29weWluZyAnICsgZnJvbU92ZXJyaWRlcy5yZXBsYWNlKHByb2Nlc3MuY3dkKCksICcnKSArICcgdG86ICcgKyB0b092ZXJyaWRlcy5yZXBsYWNlKHByb2Nlc3MuY3dkKCksICcnKSlcbiAgICB9XG4gIH1cbiAgdmFycy5maXJzdFRpbWUgPSBmYWxzZVxuICBsZXQganNcbiAgaWYgKHZhcnMucHJvZHVjdGlvbikge1xuICAgIHZhcnMuZGVwcy5wdXNoKCdFeHQucmVxdWlyZShcIkV4dC5sYXlvdXQuKlwiKTtcXG4nKVxuICAgIGpzID0gdmFycy5kZXBzLmpvaW4oJztcXG4nKTtcbiAgfVxuICBlbHNlIHtcbiAgICBqcyA9ICdFeHQucmVxdWlyZShcIkV4dC4qXCIpJ1xuICB9XG4gIGlmICh2YXJzLm1hbmlmZXN0ID09PSBudWxsIHx8IGpzICE9PSB2YXJzLm1hbmlmZXN0KSB7XG4gICAgdmFycy5tYW5pZmVzdCA9IGpzXG4gICAgY29uc3QgbWFuaWZlc3QgPSBwYXRoLmpvaW4ob3V0cHV0LCAnbWFuaWZlc3QuanMnKVxuICAgIGZzLndyaXRlRmlsZVN5bmMobWFuaWZlc3QsIGpzLCAndXRmOCcpXG4gICAgdmFycy5yZWJ1aWxkID0gdHJ1ZVxuICAgIGxvZyhhcHAgKyAnQnVpbGRpbmcgRXh0IGJ1bmRsZSBhdDogJyArIG91dHB1dC5yZXBsYWNlKHByb2Nlc3MuY3dkKCksICcnKSlcbiAgfVxuICBlbHNlIHtcbiAgICB2YXJzLnJlYnVpbGQgPSBmYWxzZVxuICAgIGxvZyhhcHAgKyAnRXh0UmVhY3QgcmVidWlsZCBOT1QgbmVlZGVkJylcbiAgfVxufVxuXG4vLyoqKioqKioqKipcbmV4cG9ydCBmdW5jdGlvbiBfYnVpbGRFeHRCdW5kbGUoYXBwLCBjb21waWxhdGlvbiwgb3V0cHV0UGF0aCwgcGFybXMsIG9wdGlvbnMpIHtcbiAgY29uc3QgZnMgPSByZXF1aXJlKCdmcycpXG4gIGNvbnN0IGxvZ3YgPSByZXF1aXJlKCcuL3BsdWdpblV0aWwnKS5sb2d2XG4gIGxvZ3Yob3B0aW9ucywnRlVOQ1RJT04gX2J1aWxkRXh0QnVuZGxlJylcblxuICBsZXQgc2VuY2hhOyB0cnkgeyBzZW5jaGEgPSByZXF1aXJlKCdAc2VuY2hhL2NtZCcpIH0gY2F0Y2ggKGUpIHsgc2VuY2hhID0gJ3NlbmNoYScgfVxuICBpZiAoZnMuZXhpc3RzU3luYyhzZW5jaGEpKSB7XG4gICAgbG9ndihvcHRpb25zLCdzZW5jaGEgZm9sZGVyIGV4aXN0cycpXG4gIH1cbiAgZWxzZSB7XG4gICAgbG9ndihvcHRpb25zLCdzZW5jaGEgZm9sZGVyIERPRVMgTk9UIGV4aXN0JylcbiAgfVxuXG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICBjb25zdCBvbkJ1aWxkRG9uZSA9ICgpID0+IHtcbiAgICBsb2d2KG9wdGlvbnMsJ29uQnVpbGREb25lJylcbiAgICByZXNvbHZlKClcbiAgIH1cblxuICAgdmFyIG9wdHMgPSB7IGN3ZDogb3V0cHV0UGF0aCwgc2lsZW50OiB0cnVlLCBzdGRpbzogJ3BpcGUnLCBlbmNvZGluZzogJ3V0Zi04J31cbiAgIGV4ZWN1dGVBc3luYyhhcHAsIHNlbmNoYSwgcGFybXMsIG9wdHMsIGNvbXBpbGF0aW9uLCBvcHRpb25zKS50aGVuIChcbiAgICAgZnVuY3Rpb24oKSB7IG9uQnVpbGREb25lKCkgfSwgXG4gICAgIGZ1bmN0aW9uKHJlYXNvbikgeyByZWplY3QocmVhc29uKSB9XG4gICApXG4gfSlcbn1cblxuLy8qKioqKioqKioqXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZXhlY3V0ZUFzeW5jIChhcHAsIGNvbW1hbmQsIHBhcm1zLCBvcHRzLCBjb21waWxhdGlvbiwgb3B0aW9ucykge1xuICAvL2NvbnN0IERFRkFVTFRfU1VCU1RSUyA9IFsnW0lORl0gTG9hZGluZycsICdbSU5GXSBQcm9jZXNzaW5nJywgJ1tMT0ddIEZhc2hpb24gYnVpbGQgY29tcGxldGUnLCAnW0VSUl0nLCAnW1dSTl0nLCBcIltJTkZdIFNlcnZlclwiLCBcIltJTkZdIFdyaXRpbmdcIiwgXCJbSU5GXSBMb2FkaW5nIEJ1aWxkXCIsIFwiW0lORl0gV2FpdGluZ1wiLCBcIltMT0ddIEZhc2hpb24gd2FpdGluZ1wiXTtcbiAgY29uc3QgREVGQVVMVF9TVUJTVFJTID0gWydbSU5GXSBMb2FkaW5nJywgJ1tJTkZdIEFwcGVuZCcsICdbSU5GXSBQcm9jZXNzaW5nJywgJ1tJTkZdIFByb2Nlc3NpbmcgQnVpbGQnLCAnW0xPR10gRmFzaGlvbiBidWlsZCBjb21wbGV0ZScsICdbRVJSXScsICdbV1JOXScsIFwiW0lORl0gU2VydmVyXCIsIFwiW0lORl0gV3JpdGluZ1wiLCBcIltJTkZdIExvYWRpbmcgQnVpbGRcIiwgXCJbSU5GXSBXYWl0aW5nXCIsIFwiW0xPR10gRmFzaGlvbiB3YWl0aW5nXCJdO1xuICB2YXIgc3Vic3RyaW5ncyA9IERFRkFVTFRfU1VCU1RSUyBcbiAgdmFyIGNoYWxrID0gcmVxdWlyZSgnY2hhbGsnKVxuICBjb25zdCBjcm9zc1NwYXduID0gcmVxdWlyZSgnY3Jvc3Mtc3Bhd24nKVxuICBjb25zdCBsb2cgPSByZXF1aXJlKCcuL3BsdWdpblV0aWwnKS5sb2dcbiAgbG9ndihvcHRpb25zLCAnRlVOQ1RJT04gZXhlY3V0ZUFzeW5jJylcbiAgYXdhaXQgbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIGxvZ3Yob3B0aW9ucyxgY29tbWFuZCAtICR7Y29tbWFuZH1gKVxuICAgIGxvZ3Yob3B0aW9ucywgYHBhcm1zIC0gJHtwYXJtc31gKVxuICAgIGxvZ3Yob3B0aW9ucywgYG9wdHMgLSAke0pTT04uc3RyaW5naWZ5KG9wdHMpfWApXG4gICAgbGV0IGNoaWxkID0gY3Jvc3NTcGF3bihjb21tYW5kLCBwYXJtcywgb3B0cylcbiAgICBjaGlsZC5vbignY2xvc2UnLCAoY29kZSwgc2lnbmFsKSA9PiB7XG4gICAgICBsb2d2KG9wdGlvbnMsIGBvbiBjbG9zZWApIFxuICAgICAgaWYoY29kZSA9PT0gMCkgeyByZXNvbHZlKDApIH1cbiAgICAgIGVsc2UgeyBjb21waWxhdGlvbi5lcnJvcnMucHVzaCggbmV3IEVycm9yKGNvZGUpICk7IHJlc29sdmUoMCkgfVxuICAgIH0pXG4gICAgY2hpbGQub24oJ2Vycm9yJywgKGVycm9yKSA9PiB7IFxuICAgICAgbG9ndihvcHRpb25zLCBgb24gZXJyb3JgKSBcbiAgICAgIGNvbXBpbGF0aW9uLmVycm9ycy5wdXNoKGVycm9yKVxuICAgICAgcmVzb2x2ZSgwKVxuICAgIH0pXG4gICAgY2hpbGQuc3Rkb3V0Lm9uKCdkYXRhJywgKGRhdGEpID0+IHtcbiAgICAgIHZhciBzdHIgPSBkYXRhLnRvU3RyaW5nKCkucmVwbGFjZSgvXFxyP1xcbnxcXHIvZywgXCIgXCIpLnRyaW0oKVxuICAgICAgbG9ndihvcHRpb25zLCBgJHtzdHJ9YClcbiAgICAgIGlmIChkYXRhICYmIGRhdGEudG9TdHJpbmcoKS5tYXRjaCgvV2FpdGluZyBmb3IgY2hhbmdlc1xcLlxcLlxcLi8pKSB7XG4gICAgICAgIHJlc29sdmUoMClcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBpZiAoc3Vic3RyaW5ncy5zb21lKGZ1bmN0aW9uKHYpIHsgcmV0dXJuIGRhdGEuaW5kZXhPZih2KSA+PSAwOyB9KSkgeyBcbiAgICAgICAgICBzdHIgPSBzdHIucmVwbGFjZShcIltJTkZdXCIsIFwiXCIpXG4gICAgICAgICAgc3RyID0gc3RyLnJlcGxhY2UoXCJbTE9HXVwiLCBcIlwiKVxuICAgICAgICAgIHN0ciA9IHN0ci5yZXBsYWNlKHByb2Nlc3MuY3dkKCksICcnKS50cmltKClcbiAgICAgICAgICBpZiAoc3RyLmluY2x1ZGVzKFwiW0VSUl1cIikpIHtcbiAgICAgICAgICAgIGNvbXBpbGF0aW9uLmVycm9ycy5wdXNoKGFwcCArIHN0ci5yZXBsYWNlKC9eXFxbRVJSXFxdIC9naSwgJycpKTtcbiAgICAgICAgICAgIHN0ciA9IHN0ci5yZXBsYWNlKFwiW0VSUl1cIiwgYCR7Y2hhbGsucmVkKFwiW0VSUl1cIil9YClcbiAgICAgICAgICB9XG4gICAgICAgICAgbG9nKGAke2FwcH0ke3N0cn1gKSBcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pXG4gICAgY2hpbGQuc3RkZXJyLm9uKCdkYXRhJywgKGRhdGEpID0+IHtcbiAgICAgIGxvZ3Yob3B0aW9ucywgYGVycm9yIG9uIGNsb3NlYCkgXG4gICAgICB2YXIgc3RyID0gZGF0YS50b1N0cmluZygpLnJlcGxhY2UoL1xccj9cXG58XFxyL2csIFwiIFwiKS50cmltKClcbiAgICAgIHZhciBzdHJKYXZhT3B0cyA9IFwiUGlja2VkIHVwIF9KQVZBX09QVElPTlNcIjtcbiAgICAgIHZhciBpbmNsdWRlcyA9IHN0ci5pbmNsdWRlcyhzdHJKYXZhT3B0cylcbiAgICAgIGlmICghaW5jbHVkZXMpIHtcbiAgICAgICAgY29uc29sZS5sb2coYCR7YXBwfSAke2NoYWxrLnJlZChcIltFUlJdXCIpfSAke3N0cn1gKVxuICAgICAgfVxuICAgIH0pXG4gIH0pXG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIGxvZyhzKSB7XG4gIHJlcXVpcmUoJ3JlYWRsaW5lJykuY3Vyc29yVG8ocHJvY2Vzcy5zdGRvdXQsIDApXG4gIHRyeSB7XG4gICAgcHJvY2Vzcy5zdGRvdXQuY2xlYXJMaW5lKClcbiAgfVxuICBjYXRjaChlKSB7fVxuICBwcm9jZXNzLnN0ZG91dC53cml0ZShzKVxuICBwcm9jZXNzLnN0ZG91dC53cml0ZSgnXFxuJylcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGxvZ3Yob3B0aW9ucywgcykge1xuICBpZiAob3B0aW9ucy52ZXJib3NlID09ICd5ZXMnKSB7XG4gICAgcmVxdWlyZSgncmVhZGxpbmUnKS5jdXJzb3JUbyhwcm9jZXNzLnN0ZG91dCwgMClcbiAgICB0cnkge1xuICAgICAgcHJvY2Vzcy5zdGRvdXQuY2xlYXJMaW5lKClcbiAgICB9XG4gICAgY2F0Y2goZSkge31cbiAgICBwcm9jZXNzLnN0ZG91dC53cml0ZShgLXZlcmJvc2U6ICR7c31gKVxuICAgIHByb2Nlc3Muc3Rkb3V0LndyaXRlKCdcXG4nKVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfZ2V0QXBwKCkge1xuICB2YXIgY2hhbGsgPSByZXF1aXJlKCdjaGFsaycpXG4gIHZhciBwcmVmaXggPSBgYFxuICBjb25zdCBwbGF0Zm9ybSA9IHJlcXVpcmUoJ29zJykucGxhdGZvcm0oKVxuICBpZiAocGxhdGZvcm0gPT0gJ2RhcndpbicpIHsgcHJlZml4ID0gYOKEuSDvvaJleHTvvaM6YCB9XG4gIGVsc2UgeyBwcmVmaXggPSBgaSBbZXh0XTpgIH1cbiAgcmV0dXJuIGAke2NoYWxrLmdyZWVuKHByZWZpeCl9IGBcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9nZXRWZXJzaW9ucyhhcHAsIHBsdWdpbk5hbWUsIGZyYW1ld29ya05hbWUpIHtcbiAgY29uc3QgcGF0aCA9IHJlcXVpcmUoJ3BhdGgnKVxuICBjb25zdCBmcyA9IHJlcXVpcmUoJ2ZzJylcblxuICB2YXIgdiA9IHt9XG4gIHZhciBwbHVnaW5QYXRoID0gcGF0aC5yZXNvbHZlKHByb2Nlc3MuY3dkKCksJ25vZGVfbW9kdWxlcy9Ac2VuY2hhJywgcGx1Z2luTmFtZSlcbiAgdmFyIHBsdWdpblBrZyA9IChmcy5leGlzdHNTeW5jKHBsdWdpblBhdGgrJy9wYWNrYWdlLmpzb24nKSAmJiBKU09OLnBhcnNlKGZzLnJlYWRGaWxlU3luYyhwbHVnaW5QYXRoKycvcGFja2FnZS5qc29uJywgJ3V0Zi04JykpIHx8IHt9KTtcbiAgdi5wbHVnaW5WZXJzaW9uID0gcGx1Z2luUGtnLnZlcnNpb25cblxuICB2YXIgd2VicGFja1BhdGggPSBwYXRoLnJlc29sdmUocHJvY2Vzcy5jd2QoKSwnbm9kZV9tb2R1bGVzL3dlYnBhY2snKVxuICB2YXIgd2VicGFja1BrZyA9IChmcy5leGlzdHNTeW5jKHdlYnBhY2tQYXRoKycvcGFja2FnZS5qc29uJykgJiYgSlNPTi5wYXJzZShmcy5yZWFkRmlsZVN5bmMod2VicGFja1BhdGgrJy9wYWNrYWdlLmpzb24nLCAndXRmLTgnKSkgfHwge30pO1xuICB2LndlYnBhY2tWZXJzaW9uID0gd2VicGFja1BrZy52ZXJzaW9uXG5cbiAgdmFyIGV4dFBhdGggPSBwYXRoLnJlc29sdmUocHJvY2Vzcy5jd2QoKSwnbm9kZV9tb2R1bGVzL0BzZW5jaGEvZXh0JylcbiAgdmFyIGV4dFBrZyA9IChmcy5leGlzdHNTeW5jKGV4dFBhdGgrJy9wYWNrYWdlLmpzb24nKSAmJiBKU09OLnBhcnNlKGZzLnJlYWRGaWxlU3luYyhleHRQYXRoKycvcGFja2FnZS5qc29uJywgJ3V0Zi04JykpIHx8IHt9KTtcbiAgdi5leHRWZXJzaW9uID0gZXh0UGtnLnNlbmNoYS52ZXJzaW9uXG5cbiAgdmFyIGNtZFBhdGggPSBwYXRoLnJlc29sdmUocHJvY2Vzcy5jd2QoKSxgbm9kZV9tb2R1bGVzL0BzZW5jaGEvJHtwbHVnaW5OYW1lfS9ub2RlX21vZHVsZXMvQHNlbmNoYS9jbWRgKVxuICB2YXIgY21kUGtnID0gKGZzLmV4aXN0c1N5bmMoY21kUGF0aCsnL3BhY2thZ2UuanNvbicpICYmIEpTT04ucGFyc2UoZnMucmVhZEZpbGVTeW5jKGNtZFBhdGgrJy9wYWNrYWdlLmpzb24nLCAndXRmLTgnKSkgfHwge30pO1xuICB2LmNtZFZlcnNpb24gPSBjbWRQa2cudmVyc2lvbl9mdWxsXG5cbiAgdmFyIGZyYW1ld29ya0luZm8gPSAnJ1xuICAgaWYgKGZyYW1ld29ya05hbWUgIT0gdW5kZWZpbmVkICYmIGZyYW1ld29ya05hbWUgIT0gJ2V4dGpzJykge1xuICAgIHZhciBmcmFtZXdvcmtQYXRoID0gJydcbiAgICBpZiAoZnJhbWV3b3JrTmFtZSA9PSAncmVhY3QnKSB7XG4gICAgICBmcmFtZXdvcmtQYXRoID0gcGF0aC5yZXNvbHZlKHByb2Nlc3MuY3dkKCksJ25vZGVfbW9kdWxlcy9yZWFjdCcpXG4gICAgfVxuICAgIGlmIChmcmFtZXdvcmtOYW1lID09ICdhbmd1bGFyJykge1xuICAgICAgZnJhbWV3b3JrUGF0aCA9IHBhdGgucmVzb2x2ZShwcm9jZXNzLmN3ZCgpLCdub2RlX21vZHVsZXMvQGFuZ3VsYXIvY29yZScpXG4gICAgfVxuICAgIHZhciBmcmFtZXdvcmtQa2cgPSAoZnMuZXhpc3RzU3luYyhmcmFtZXdvcmtQYXRoKycvcGFja2FnZS5qc29uJykgJiYgSlNPTi5wYXJzZShmcy5yZWFkRmlsZVN5bmMoZnJhbWV3b3JrUGF0aCsnL3BhY2thZ2UuanNvbicsICd1dGYtOCcpKSB8fCB7fSk7XG4gICAgdi5mcmFtZXdvcmtWZXJzaW9uID0gZnJhbWV3b3JrUGtnLnZlcnNpb25cbiAgICBmcmFtZXdvcmtJbmZvID0gJywgJyArIGZyYW1ld29ya05hbWUgKyAnIHYnICsgdi5mcmFtZXdvcmtWZXJzaW9uXG4gIH1cblxuICByZXR1cm4gYXBwICsgJ2V4dC13ZWJwYWNrLXBsdWdpbiB2JyArIHYucGx1Z2luVmVyc2lvbiArICcsIEV4dCBKUyB2JyArIHYuZXh0VmVyc2lvbiArICcsIFNlbmNoYSBDbWQgdicgKyB2LmNtZFZlcnNpb24gKyAnLCB3ZWJwYWNrIHYnICsgdi53ZWJwYWNrVmVyc2lvbiArIGZyYW1ld29ya0luZm9cbn0iXX0=