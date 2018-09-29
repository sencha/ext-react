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

  const fs = require('fs');

  const validateOptions = require('schema-utils');

  validateOptions(require('../options.json'), options, '');

  if (options.framework == undefined) {
    thisVars.pluginErrors = [];
    thisVars.pluginErrors.push('webpack config: framework parameter on ext-webpack-plugin is not defined - values: react, angular, extjs');
    var plugin = {};
    plugin.vars = thisVars;
    return plugin;
  }

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

  if (thisOptions.environment == 'production') {
    thisVars.production = true;
  } else {
    thisVars.production = false;
  }

  log(require('./pluginUtil')._getVersions(thisVars.app, thisVars.pluginName, thisVars.framework));
  log(thisVars.app + 'Building for ' + thisOptions.environment);
  var plugin = {};
  plugin.vars = thisVars;
  plugin.options = thisOptions;
  return plugin;
} //**********


function _compilation(compilation, vars, options) {
  if (vars.production) {
    logv(options, `ext-compilation-production`);
    compilation.hooks.succeedModule.tap(`ext-succeed-module`, module => {
      if (module.resource && module.resource.match(/\.(j|t)sx?$/) && !module.resource.match(/node_modules/) && !module.resource.match('/ext-react/dist/')) {
        vars.deps = [...(vars.deps || []), ...require(`./${vars.framework}Util`).extractFromSource(module._source._value)];
      }
    });
  } else {
    logv(options, `ext-compilation`);
  } //if (vars.pluginErrors.length == 0) {


  compilation.hooks.htmlWebpackPluginBeforeHtmlGeneration.tap(`ext-html-generation`, data => {
    logv(options, 'FUNCTION ext-html-generation');

    const path = require('path');

    var publicPath = '';

    if (compilation.outputOptions.publicPath != undefined) {
      publicPath = compilation.outputOptions.publicPath;
    }

    var jsPath = path.join(publicPath, vars.extPath + '/ext.js');
    var cssPath = path.join(publicPath, vars.extPath + '/ext.css');
    data.assets.js.unshift(jsPath);
    data.assets.css.unshift(cssPath);
    log(vars.app + `Adding ${jsPath} and ${cssPath} to index.html`);
  }); //}
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

          _context.next = 17;
          return _buildExtBundle(app, compilation, outputPath, parms, options);

        case 17:
          if (vars.browserCount == 0 && compilation.errors.length == 0) {
            url = 'http://localhost:' + options.port;
            log(app + `Opening browser at ${url}`);
            vars.browserCount++;
            opn = require('opn');
            opn(url);
          }

          callback();
          _context.next = 22;
          break;

        case 21:
          callback();

        case 22:
        case "end":
          return _context.stop();
      }
    }, _callee, this);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9wbHVnaW5VdGlsLmpzIl0sIm5hbWVzIjpbIl9jb25zdHJ1Y3RvciIsIm9wdGlvbnMiLCJ0aGlzVmFycyIsInRoaXNPcHRpb25zIiwiZnMiLCJyZXF1aXJlIiwidmFsaWRhdGVPcHRpb25zIiwiZnJhbWV3b3JrIiwidW5kZWZpbmVkIiwicGx1Z2luRXJyb3JzIiwicHVzaCIsInBsdWdpbiIsInZhcnMiLCJnZXREZWZhdWx0VmFycyIsInBsdWdpbk5hbWUiLCJhcHAiLCJfZ2V0QXBwIiwibG9ndiIsInJjIiwiZXhpc3RzU3luYyIsIkpTT04iLCJwYXJzZSIsInJlYWRGaWxlU3luYyIsImdldERlZmF1bHRPcHRpb25zIiwiZW52aXJvbm1lbnQiLCJwcm9kdWN0aW9uIiwibG9nIiwiX2dldFZlcnNpb25zIiwiX2NvbXBpbGF0aW9uIiwiY29tcGlsYXRpb24iLCJob29rcyIsInN1Y2NlZWRNb2R1bGUiLCJ0YXAiLCJtb2R1bGUiLCJyZXNvdXJjZSIsIm1hdGNoIiwiZGVwcyIsImV4dHJhY3RGcm9tU291cmNlIiwiX3NvdXJjZSIsIl92YWx1ZSIsImh0bWxXZWJwYWNrUGx1Z2luQmVmb3JlSHRtbEdlbmVyYXRpb24iLCJkYXRhIiwicGF0aCIsInB1YmxpY1BhdGgiLCJvdXRwdXRPcHRpb25zIiwianNQYXRoIiwiam9pbiIsImV4dFBhdGgiLCJjc3NQYXRoIiwiYXNzZXRzIiwianMiLCJ1bnNoaWZ0IiwiY3NzIiwiZW1pdCIsImNvbXBpbGVyIiwiY2FsbGJhY2siLCJfYnVpbGRFeHRCdW5kbGUiLCJvdXRwdXRQYXRoIiwiZGV2U2VydmVyIiwiY29udGVudEJhc2UiLCJfcHJlcGFyZUZvckJ1aWxkIiwicmVidWlsZCIsInBhcm1zIiwicHJvZmlsZSIsImJyb3dzZXJDb3VudCIsImVycm9ycyIsImxlbmd0aCIsInVybCIsInBvcnQiLCJvcG4iLCJvdXRwdXQiLCJyaW1yYWYiLCJta2RpcnAiLCJmc3giLCJwYWNrYWdlcyIsInRvb2xraXQiLCJ0aGVtZSIsImZpcnN0VGltZSIsInN5bmMiLCJidWlsZFhNTCIsImNyZWF0ZUFwcEpzb24iLCJjcmVhdGVXb3Jrc3BhY2VKc29uIiwiY3JlYXRlSlNET01FbnZpcm9ubWVudCIsIndyaXRlRmlsZVN5bmMiLCJwcm9jZXNzIiwiY3dkIiwiZnJvbVJlc291cmNlcyIsInRvUmVzb3VyY2VzIiwiY29weVN5bmMiLCJyZXBsYWNlIiwiZnJvbVBhY2thZ2VzIiwidG9QYWNrYWdlcyIsImZyb21PdmVycmlkZXMiLCJ0b092ZXJyaWRlcyIsIm1hbmlmZXN0Iiwic2VuY2hhIiwiZSIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0Iiwib25CdWlsZERvbmUiLCJvcHRzIiwic2lsZW50Iiwic3RkaW8iLCJlbmNvZGluZyIsImV4ZWN1dGVBc3luYyIsInRoZW4iLCJyZWFzb24iLCJjb21tYW5kIiwiREVGQVVMVF9TVUJTVFJTIiwic3Vic3RyaW5ncyIsImNoYWxrIiwiY3Jvc3NTcGF3biIsInN0cmluZ2lmeSIsImNoaWxkIiwib24iLCJjb2RlIiwic2lnbmFsIiwiRXJyb3IiLCJlcnJvciIsInN0ZG91dCIsInN0ciIsInRvU3RyaW5nIiwidHJpbSIsInNvbWUiLCJ2IiwiaW5kZXhPZiIsImluY2x1ZGVzIiwicmVkIiwic3RkZXJyIiwic3RySmF2YU9wdHMiLCJjb25zb2xlIiwicyIsImN1cnNvclRvIiwiY2xlYXJMaW5lIiwid3JpdGUiLCJ2ZXJib3NlIiwicHJlZml4IiwicGxhdGZvcm0iLCJncmVlbiIsImZyYW1ld29ya05hbWUiLCJwbHVnaW5QYXRoIiwicGx1Z2luUGtnIiwicGx1Z2luVmVyc2lvbiIsInZlcnNpb24iLCJ3ZWJwYWNrUGF0aCIsIndlYnBhY2tQa2ciLCJ3ZWJwYWNrVmVyc2lvbiIsImV4dFBrZyIsImV4dFZlcnNpb24iLCJjbWRQYXRoIiwiY21kUGtnIiwiY21kVmVyc2lvbiIsInZlcnNpb25fZnVsbCIsImZyYW1ld29ya0luZm8iLCJmcmFtZXdvcmtQYXRoIiwiZnJhbWV3b3JrUGtnIiwiZnJhbWV3b3Jr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LEdBQUl4SixFQUFFLENBQUNlLFVBQUgsQ0FBY3dJLGFBQWEsR0FBQyxlQUE1QixLQUFnRHZJLElBQUksQ0FBQ0MsS0FBTCxDQUFXakIsRUFBRSxDQUFDa0IsWUFBSCxDQUFnQnFJLGFBQWEsR0FBQyxlQUE5QixFQUErQyxPQUEvQyxDQUFYLENBQWhELElBQXVILEVBQTNJO0FBQ0E5QixJQUFBQSxDQUFDLENBQUNnQyxnQkFBRixHQUFxQkQsWUFBWSxDQUFDWixPQUFsQztBQUNBVSxJQUFBQSxhQUFhLEdBQUcsT0FBT2QsYUFBUCxHQUF1QixJQUF2QixHQUE4QmYsQ0FBQyxDQUFDZ0MsZ0JBQWhEO0FBQ0Q7O0FBRUQsU0FBTzlJLEdBQUcsR0FBRyxzQkFBTixHQUErQjhHLENBQUMsQ0FBQ2tCLGFBQWpDLEdBQWlELFlBQWpELEdBQWdFbEIsQ0FBQyxDQUFDd0IsVUFBbEUsR0FBK0UsZ0JBQS9FLEdBQWtHeEIsQ0FBQyxDQUFDMkIsVUFBcEcsR0FBaUgsYUFBakgsR0FBaUkzQixDQUFDLENBQUNzQixjQUFuSSxHQUFvSk8sYUFBM0o7QUFDRCIsInNvdXJjZXNDb250ZW50IjpbIi8vKioqKioqKioqKlxuZXhwb3J0IGZ1bmN0aW9uIF9jb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gIHZhciB0aGlzVmFycyA9IHt9XG4gIHZhciB0aGlzT3B0aW9ucyA9IHt9XG4gIGNvbnN0IGZzID0gcmVxdWlyZSgnZnMnKVxuICBjb25zdCB2YWxpZGF0ZU9wdGlvbnMgPSByZXF1aXJlKCdzY2hlbWEtdXRpbHMnKVxuICB2YWxpZGF0ZU9wdGlvbnMocmVxdWlyZSgnLi4vb3B0aW9ucy5qc29uJyksIG9wdGlvbnMsICcnKVxuICBpZiAob3B0aW9ucy5mcmFtZXdvcmsgPT0gdW5kZWZpbmVkKSB7XG4gICAgdGhpc1ZhcnMucGx1Z2luRXJyb3JzID0gW11cbiAgICB0aGlzVmFycy5wbHVnaW5FcnJvcnMucHVzaCgnd2VicGFjayBjb25maWc6IGZyYW1ld29yayBwYXJhbWV0ZXIgb24gZXh0LXdlYnBhY2stcGx1Z2luIGlzIG5vdCBkZWZpbmVkIC0gdmFsdWVzOiByZWFjdCwgYW5ndWxhciwgZXh0anMnKVxuICAgIHZhciBwbHVnaW4gPSB7fVxuICAgIHBsdWdpbi52YXJzID0gdGhpc1ZhcnNcbiAgICByZXR1cm4gcGx1Z2luXG4gIH1cbiAgdGhpc1ZhcnMgPSByZXF1aXJlKGAuLyR7b3B0aW9ucy5mcmFtZXdvcmt9VXRpbGApLmdldERlZmF1bHRWYXJzKClcbiAgdGhpc1ZhcnMuZnJhbWV3b3JrID0gb3B0aW9ucy5mcmFtZXdvcmtcbiAgc3dpdGNoKHRoaXNWYXJzLmZyYW1ld29yaykge1xuICAgIGNhc2UgJ2V4dGpzJzpcbiAgICAgIHRoaXNWYXJzLnBsdWdpbk5hbWUgPSAnZXh0LXdlYnBhY2stcGx1Z2luJ1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAncmVhY3QnOlxuICAgICAgdGhpc1ZhcnMucGx1Z2luTmFtZSA9ICdleHQtcmVhY3Qtd2VicGFjay1wbHVnaW4nXG4gICAgICBicmVhaztcbiAgICBjYXNlICdhbmd1bGFyJzpcbiAgICAgIHRoaXNWYXJzLnBsdWdpbk5hbWUgPSAnZXh0LWFuZ3VsYXItd2VicGFjay1wbHVnaW4nXG4gICAgICBicmVhaztcbiAgICBkZWZhdWx0OlxuICAgICAgdGhpc1ZhcnMucGx1Z2luTmFtZSA9ICdleHQtd2VicGFjay1wbHVnaW4nXG4gIH1cbiAgdGhpc1ZhcnMuYXBwID0gcmVxdWlyZSgnLi9wbHVnaW5VdGlsJykuX2dldEFwcCgpXG4gIGxvZ3Yob3B0aW9ucywgYHBsdWdpbk5hbWUgLSAke3RoaXNWYXJzLnBsdWdpbk5hbWV9YClcbiAgbG9ndihvcHRpb25zLCBgdGhpc1ZhcnMuYXBwIC0gJHt0aGlzVmFycy5hcHB9YClcbiAgY29uc3QgcmMgPSAoZnMuZXhpc3RzU3luYyhgLmV4dC0ke3RoaXNWYXJzLmZyYW1ld29ya31yY2ApICYmIEpTT04ucGFyc2UoZnMucmVhZEZpbGVTeW5jKGAuZXh0LSR7dGhpc1ZhcnMuZnJhbWV3b3JrfXJjYCwgJ3V0Zi04JykpIHx8IHt9KVxuICB0aGlzT3B0aW9ucyA9IHsgLi4ucmVxdWlyZShgLi8ke3RoaXNWYXJzLmZyYW1ld29ya31VdGlsYCkuZ2V0RGVmYXVsdE9wdGlvbnMoKSwgLi4ub3B0aW9ucywgLi4ucmMgfVxuICBpZiAodGhpc09wdGlvbnMuZW52aXJvbm1lbnQgPT0gJ3Byb2R1Y3Rpb24nKSBcbiAgICB7dGhpc1ZhcnMucHJvZHVjdGlvbiA9IHRydWV9XG4gIGVsc2UgXG4gICAge3RoaXNWYXJzLnByb2R1Y3Rpb24gPSBmYWxzZX1cbiAgbG9nKHJlcXVpcmUoJy4vcGx1Z2luVXRpbCcpLl9nZXRWZXJzaW9ucyh0aGlzVmFycy5hcHAsIHRoaXNWYXJzLnBsdWdpbk5hbWUsIHRoaXNWYXJzLmZyYW1ld29yaykpXG4gIGxvZyh0aGlzVmFycy5hcHAgKyAnQnVpbGRpbmcgZm9yICcgKyB0aGlzT3B0aW9ucy5lbnZpcm9ubWVudClcblxuICB2YXIgcGx1Z2luID0ge31cbiAgcGx1Z2luLnZhcnMgPSB0aGlzVmFyc1xuICBwbHVnaW4ub3B0aW9ucyA9IHRoaXNPcHRpb25zXG4gIHJldHVybiBwbHVnaW5cbn1cblxuLy8qKioqKioqKioqXG5leHBvcnQgZnVuY3Rpb24gX2NvbXBpbGF0aW9uKGNvbXBpbGF0aW9uLCB2YXJzLCBvcHRpb25zKSB7XG4gIGlmICh2YXJzLnByb2R1Y3Rpb24pIHtcbiAgICBsb2d2KG9wdGlvbnMsYGV4dC1jb21waWxhdGlvbi1wcm9kdWN0aW9uYClcbiAgICBjb21waWxhdGlvbi5ob29rcy5zdWNjZWVkTW9kdWxlLnRhcChgZXh0LXN1Y2NlZWQtbW9kdWxlYCwgKG1vZHVsZSkgPT4ge1xuICAgICAgaWYgKG1vZHVsZS5yZXNvdXJjZSAmJiBtb2R1bGUucmVzb3VyY2UubWF0Y2goL1xcLihqfHQpc3g/JC8pICYmICFtb2R1bGUucmVzb3VyY2UubWF0Y2goL25vZGVfbW9kdWxlcy8pICYmICFtb2R1bGUucmVzb3VyY2UubWF0Y2goJy9leHQtcmVhY3QvZGlzdC8nKSkge1xuICAgICAgICB2YXJzLmRlcHMgPSBbIFxuICAgICAgICAgIC4uLih2YXJzLmRlcHMgfHwgW10pLCBcbiAgICAgICAgICAuLi5yZXF1aXJlKGAuLyR7dmFycy5mcmFtZXdvcmt9VXRpbGApLmV4dHJhY3RGcm9tU291cmNlKG1vZHVsZS5fc291cmNlLl92YWx1ZSkgXG4gICAgICAgIF1cbiAgICAgIH1cbiAgICB9KVxuICB9XG4gIGVsc2Uge1xuICAgIGxvZ3Yob3B0aW9ucywgYGV4dC1jb21waWxhdGlvbmApXG4gIH1cbiAgLy9pZiAodmFycy5wbHVnaW5FcnJvcnMubGVuZ3RoID09IDApIHtcbiAgICBjb21waWxhdGlvbi5ob29rcy5odG1sV2VicGFja1BsdWdpbkJlZm9yZUh0bWxHZW5lcmF0aW9uLnRhcChgZXh0LWh0bWwtZ2VuZXJhdGlvbmAsKGRhdGEpID0+IHtcbiAgICAgIGxvZ3Yob3B0aW9ucywnRlVOQ1RJT04gZXh0LWh0bWwtZ2VuZXJhdGlvbicpXG4gICAgICBjb25zdCBwYXRoID0gcmVxdWlyZSgncGF0aCcpXG4gICAgICB2YXIgcHVibGljUGF0aCA9ICcnXG4gICAgICBpZiAoY29tcGlsYXRpb24ub3V0cHV0T3B0aW9ucy5wdWJsaWNQYXRoICE9IHVuZGVmaW5lZCkge1xuICAgICAgICBwdWJsaWNQYXRoID0gY29tcGlsYXRpb24ub3V0cHV0T3B0aW9ucy5wdWJsaWNQYXRoXG4gICAgICB9XG4gICAgICB2YXIganNQYXRoID0gcGF0aC5qb2luKHB1YmxpY1BhdGgsdmFycy5leHRQYXRoICsgJy9leHQuanMnKVxuICAgICAgdmFyIGNzc1BhdGggPSBwYXRoLmpvaW4ocHVibGljUGF0aCx2YXJzLmV4dFBhdGggKyAnL2V4dC5jc3MnKVxuICAgICAgZGF0YS5hc3NldHMuanMudW5zaGlmdChqc1BhdGgpXG4gICAgICBkYXRhLmFzc2V0cy5jc3MudW5zaGlmdChjc3NQYXRoKVxuICAgICAgbG9nKHZhcnMuYXBwICsgYEFkZGluZyAke2pzUGF0aH0gYW5kICR7Y3NzUGF0aH0gdG8gaW5kZXguaHRtbGApXG4gICAgfSlcbiAgLy99XG59XG5cbi8vKioqKioqKioqKlxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGVtaXQoY29tcGlsZXIsIGNvbXBpbGF0aW9uLCB2YXJzLCBvcHRpb25zLCBjYWxsYmFjaykge1xuICB2YXIgYXBwID0gdmFycy5hcHBcbiAgdmFyIGZyYW1ld29yayA9IHZhcnMuZnJhbWV3b3JrXG4gIGNvbnN0IGxvZyA9IHJlcXVpcmUoJy4vcGx1Z2luVXRpbCcpLmxvZ1xuICBjb25zdCBsb2d2ID0gcmVxdWlyZSgnLi9wbHVnaW5VdGlsJykubG9ndlxuICBsb2d2KG9wdGlvbnMsJ0ZVTkNUSU9OIGV4dC1lbWl0JylcbiAgY29uc3QgcGF0aCA9IHJlcXVpcmUoJ3BhdGgnKVxuICBjb25zdCBfYnVpbGRFeHRCdW5kbGUgPSByZXF1aXJlKCcuL3BsdWdpblV0aWwnKS5fYnVpbGRFeHRCdW5kbGVcbiAgbGV0IG91dHB1dFBhdGggPSBwYXRoLmpvaW4oY29tcGlsZXIub3V0cHV0UGF0aCx2YXJzLmV4dFBhdGgpXG4gIGlmIChjb21waWxlci5vdXRwdXRQYXRoID09PSAnLycgJiYgY29tcGlsZXIub3B0aW9ucy5kZXZTZXJ2ZXIpIHtcbiAgICBvdXRwdXRQYXRoID0gcGF0aC5qb2luKGNvbXBpbGVyLm9wdGlvbnMuZGV2U2VydmVyLmNvbnRlbnRCYXNlLCBvdXRwdXRQYXRoKVxuICB9XG4gIGxvZ3Yob3B0aW9ucywnb3V0cHV0UGF0aDogJyArIG91dHB1dFBhdGgpXG4gIGxvZ3Yob3B0aW9ucywnZnJhbWV3b3JrOiAnICsgZnJhbWV3b3JrKVxuICBpZiAoZnJhbWV3b3JrICE9ICdleHRqcycpIHtcbiAgICBfcHJlcGFyZUZvckJ1aWxkKGFwcCwgdmFycywgb3B0aW9ucywgb3V0cHV0UGF0aClcbiAgfVxuICBlbHNlIHtcbiAgICByZXF1aXJlKGAuLyR7ZnJhbWV3b3JrfVV0aWxgKS5fcHJlcGFyZUZvckJ1aWxkKGFwcCwgdmFycywgb3B0aW9ucywgb3V0cHV0UGF0aCwgY29tcGlsYXRpb24pXG4gIH1cbiAgaWYgKHZhcnMucmVidWlsZCA9PSB0cnVlKSB7XG4gICAgdmFyIHBhcm1zID0gW11cbiAgICBpZiAob3B0aW9ucy5wcm9maWxlID09IHVuZGVmaW5lZCB8fCBvcHRpb25zLnByb2ZpbGUgPT0gJycgfHwgb3B0aW9ucy5wcm9maWxlID09IG51bGwpIHtcbiAgICAgIHBhcm1zID0gWydhcHAnLCAnYnVpbGQnLCBvcHRpb25zLmVudmlyb25tZW50XVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHBhcm1zID0gWydhcHAnLCAnYnVpbGQnLCBvcHRpb25zLnByb2ZpbGUsIG9wdGlvbnMuZW52aXJvbm1lbnRdXG4gICAgfVxuICAgIGF3YWl0IF9idWlsZEV4dEJ1bmRsZShhcHAsIGNvbXBpbGF0aW9uLCBvdXRwdXRQYXRoLCBwYXJtcywgb3B0aW9ucylcbiAgICBpZiAodmFycy5icm93c2VyQ291bnQgPT0gMCAmJiBjb21waWxhdGlvbi5lcnJvcnMubGVuZ3RoID09IDApIHtcbiAgICAgIHZhciB1cmwgPSAnaHR0cDovL2xvY2FsaG9zdDonICsgb3B0aW9ucy5wb3J0XG4gICAgICBsb2coYXBwICsgYE9wZW5pbmcgYnJvd3NlciBhdCAke3VybH1gKVxuICAgICAgdmFycy5icm93c2VyQ291bnQrK1xuICAgICAgY29uc3Qgb3BuID0gcmVxdWlyZSgnb3BuJylcbiAgICAgIG9wbih1cmwpXG4gICAgfVxuICAgIGNhbGxiYWNrKClcbiAgfVxuICBlbHNlIHtcbiAgICBjYWxsYmFjaygpXG4gIH1cbn1cblxuLy8qKioqKioqKioqXG5leHBvcnQgZnVuY3Rpb24gX3ByZXBhcmVGb3JCdWlsZChhcHAsIHZhcnMsIG9wdGlvbnMsIG91dHB1dCkge1xuICBsb2d2KG9wdGlvbnMsJ19wcmVwYXJlRm9yQnVpbGQnKVxuICBjb25zdCByaW1yYWYgPSByZXF1aXJlKCdyaW1yYWYnKVxuICBjb25zdCBta2RpcnAgPSByZXF1aXJlKCdta2RpcnAnKVxuICBjb25zdCBmc3ggPSByZXF1aXJlKCdmcy1leHRyYScpXG4gIGNvbnN0IGZzID0gcmVxdWlyZSgnZnMnKVxuICBjb25zdCBwYXRoID0gcmVxdWlyZSgncGF0aCcpXG5cbiAgdmFyIHBhY2thZ2VzID0gb3B0aW9ucy5wYWNrYWdlc1xuICB2YXIgdG9vbGtpdCA9IG9wdGlvbnMudG9vbGtpdFxuICB2YXIgdGhlbWUgPSBvcHRpb25zLnRoZW1lXG5cbiAgdGhlbWUgPSB0aGVtZSB8fCAodG9vbGtpdCA9PT0gJ2NsYXNzaWMnID8gJ3RoZW1lLXRyaXRvbicgOiAndGhlbWUtbWF0ZXJpYWwnKVxuICBsb2d2KG9wdGlvbnMsdmFycy5maXJzdFRpbWUpXG4gIGlmICh2YXJzLmZpcnN0VGltZSkge1xuICAgIGxvZ3Yob3B0aW9ucyxvdXRwdXQpXG4gICAgcmltcmFmLnN5bmMob3V0cHV0KVxuICAgIG1rZGlycC5zeW5jKG91dHB1dClcbiAgICBsb2d2KG9wdGlvbnMscmVxdWlyZSgnLi9hcnRpZmFjdHMnKSlcbiAgICBjb25zdCBidWlsZFhNTCA9IHJlcXVpcmUoJy4vYXJ0aWZhY3RzJykuYnVpbGRYTUxcbiAgICBjb25zdCBjcmVhdGVBcHBKc29uID0gcmVxdWlyZSgnLi9hcnRpZmFjdHMnKS5jcmVhdGVBcHBKc29uXG4gICAgY29uc3QgY3JlYXRlV29ya3NwYWNlSnNvbiA9IHJlcXVpcmUoJy4vYXJ0aWZhY3RzJykuY3JlYXRlV29ya3NwYWNlSnNvblxuICAgIGNvbnN0IGNyZWF0ZUpTRE9NRW52aXJvbm1lbnQgPSByZXF1aXJlKCcuL2FydGlmYWN0cycpLmNyZWF0ZUpTRE9NRW52aXJvbm1lbnRcblxuICAgIGZzLndyaXRlRmlsZVN5bmMocGF0aC5qb2luKG91dHB1dCwgJ2J1aWxkLnhtbCcpLCBidWlsZFhNTCh2YXJzLnByb2R1Y3Rpb24sIG9wdGlvbnMpLCAndXRmOCcpXG4gICAgZnMud3JpdGVGaWxlU3luYyhwYXRoLmpvaW4ob3V0cHV0LCAnYXBwLmpzb24nKSwgY3JlYXRlQXBwSnNvbih0aGVtZSwgcGFja2FnZXMsIHRvb2xraXQsIG9wdGlvbnMpLCAndXRmOCcpXG4gICAgZnMud3JpdGVGaWxlU3luYyhwYXRoLmpvaW4ob3V0cHV0LCAnanNkb20tZW52aXJvbm1lbnQuanMnKSwgY3JlYXRlSlNET01FbnZpcm9ubWVudChvcHRpb25zKSwgJ3V0ZjgnKVxuICAgIGZzLndyaXRlRmlsZVN5bmMocGF0aC5qb2luKG91dHB1dCwgJ3dvcmtzcGFjZS5qc29uJyksIGNyZWF0ZVdvcmtzcGFjZUpzb24ob3B0aW9ucyksICd1dGY4JylcblxuICAgIGlmIChmcy5leGlzdHNTeW5jKHBhdGguam9pbihwcm9jZXNzLmN3ZCgpLCAncmVzb3VyY2VzLycpKSkge1xuICAgICAgdmFyIGZyb21SZXNvdXJjZXMgPSBwYXRoLmpvaW4ocHJvY2Vzcy5jd2QoKSwgJ3Jlc291cmNlcy8nKVxuICAgICAgdmFyIHRvUmVzb3VyY2VzID0gcGF0aC5qb2luKG91dHB1dCwgJy4uL3Jlc291cmNlcycpXG4gICAgICBmc3guY29weVN5bmMoZnJvbVJlc291cmNlcywgdG9SZXNvdXJjZXMpXG4gICAgICBsb2coYXBwICsgJ0NvcHlpbmcgJyArIGZyb21SZXNvdXJjZXMucmVwbGFjZShwcm9jZXNzLmN3ZCgpLCAnJykgKyAnIHRvOiAnICsgdG9SZXNvdXJjZXMucmVwbGFjZShwcm9jZXNzLmN3ZCgpLCAnJykpXG4gICAgfVxuXG4gICAgaWYgKGZzLmV4aXN0c1N5bmMocGF0aC5qb2luKHByb2Nlc3MuY3dkKCksJ3Jlc291cmNlcy8nKSkpIHtcbiAgICAgIHZhciBmcm9tUmVzb3VyY2VzID0gcGF0aC5qb2luKHByb2Nlc3MuY3dkKCksICdyZXNvdXJjZXMvJylcbiAgICAgIHZhciB0b1Jlc291cmNlcyA9IHBhdGguam9pbihvdXRwdXQsICdyZXNvdXJjZXMnKVxuICAgICAgZnN4LmNvcHlTeW5jKGZyb21SZXNvdXJjZXMsIHRvUmVzb3VyY2VzKVxuICAgICAgbG9nKGFwcCArICdDb3B5aW5nICcgKyBmcm9tUmVzb3VyY2VzLnJlcGxhY2UocHJvY2Vzcy5jd2QoKSwgJycpICsgJyB0bzogJyArIHRvUmVzb3VyY2VzLnJlcGxhY2UocHJvY2Vzcy5jd2QoKSwgJycpKVxuICAgIH1cblxuICAgIGlmIChmcy5leGlzdHNTeW5jKHBhdGguam9pbihwcm9jZXNzLmN3ZCgpLHZhcnMuZXh0UGF0aCArICcvcGFja2FnZXMvJykpKSB7XG4gICAgICB2YXIgZnJvbVBhY2thZ2VzID0gcGF0aC5qb2luKHByb2Nlc3MuY3dkKCksdmFycy5leHRQYXRoICsgJy9wYWNrYWdlcy8nKVxuICAgICAgdmFyIHRvUGFja2FnZXMgPSBwYXRoLmpvaW4ob3V0cHV0LCAncGFja2FnZXMvJylcbiAgICAgIGZzeC5jb3B5U3luYyhmcm9tUGFja2FnZXMsIHRvUGFja2FnZXMpXG4gICAgICBsb2coYXBwICsgJ0NvcHlpbmcgJyArIGZyb21QYWNrYWdlcy5yZXBsYWNlKHByb2Nlc3MuY3dkKCksICcnKSArICcgdG86ICcgKyB0b1BhY2thZ2VzLnJlcGxhY2UocHJvY2Vzcy5jd2QoKSwgJycpKVxuICAgIH1cblxuICAgIGlmIChmcy5leGlzdHNTeW5jKHBhdGguam9pbihwcm9jZXNzLmN3ZCgpLHZhcnMuZXh0UGF0aCArICcvb3ZlcnJpZGVzLycpKSkge1xuICAgICAgdmFyIGZyb21PdmVycmlkZXMgPSBwYXRoLmpvaW4ocHJvY2Vzcy5jd2QoKSx2YXJzLmV4dFBhdGggKyAnL292ZXJyaWRlcy8nKVxuICAgICAgdmFyIHRvT3ZlcnJpZGVzID0gcGF0aC5qb2luKG91dHB1dCwgJ292ZXJyaWRlcy8nKVxuICAgICAgZnN4LmNvcHlTeW5jKGZyb21PdmVycmlkZXMsIHRvT3ZlcnJpZGVzKVxuICAgICAgbG9nKGFwcCArICdDb3B5aW5nICcgKyBmcm9tT3ZlcnJpZGVzLnJlcGxhY2UocHJvY2Vzcy5jd2QoKSwgJycpICsgJyB0bzogJyArIHRvT3ZlcnJpZGVzLnJlcGxhY2UocHJvY2Vzcy5jd2QoKSwgJycpKVxuICAgIH1cbiAgfVxuICB2YXJzLmZpcnN0VGltZSA9IGZhbHNlXG4gIGxldCBqc1xuICBpZiAodmFycy5wcm9kdWN0aW9uKSB7XG4gICAgdmFycy5kZXBzLnB1c2goJ0V4dC5yZXF1aXJlKFwiRXh0LmxheW91dC4qXCIpO1xcbicpXG4gICAganMgPSB2YXJzLmRlcHMuam9pbignO1xcbicpO1xuICB9XG4gIGVsc2Uge1xuICAgIGpzID0gJ0V4dC5yZXF1aXJlKFwiRXh0LipcIiknXG4gIH1cbiAgaWYgKHZhcnMubWFuaWZlc3QgPT09IG51bGwgfHwganMgIT09IHZhcnMubWFuaWZlc3QpIHtcbiAgICB2YXJzLm1hbmlmZXN0ID0ganNcbiAgICBjb25zdCBtYW5pZmVzdCA9IHBhdGguam9pbihvdXRwdXQsICdtYW5pZmVzdC5qcycpXG4gICAgZnMud3JpdGVGaWxlU3luYyhtYW5pZmVzdCwganMsICd1dGY4JylcbiAgICB2YXJzLnJlYnVpbGQgPSB0cnVlXG4gICAgbG9nKGFwcCArICdCdWlsZGluZyBFeHQgYnVuZGxlIGF0OiAnICsgb3V0cHV0LnJlcGxhY2UocHJvY2Vzcy5jd2QoKSwgJycpKVxuICB9XG4gIGVsc2Uge1xuICAgIHZhcnMucmVidWlsZCA9IGZhbHNlXG4gICAgbG9nKGFwcCArICdFeHRSZWFjdCByZWJ1aWxkIE5PVCBuZWVkZWQnKVxuICB9XG59XG5cbi8vKioqKioqKioqKlxuZXhwb3J0IGZ1bmN0aW9uIF9idWlsZEV4dEJ1bmRsZShhcHAsIGNvbXBpbGF0aW9uLCBvdXRwdXRQYXRoLCBwYXJtcywgb3B0aW9ucykge1xuICBjb25zdCBmcyA9IHJlcXVpcmUoJ2ZzJylcbiAgY29uc3QgbG9ndiA9IHJlcXVpcmUoJy4vcGx1Z2luVXRpbCcpLmxvZ3ZcbiAgbG9ndihvcHRpb25zLCdGVU5DVElPTiBfYnVpbGRFeHRCdW5kbGUnKVxuXG4gIGxldCBzZW5jaGE7IHRyeSB7IHNlbmNoYSA9IHJlcXVpcmUoJ0BzZW5jaGEvY21kJykgfSBjYXRjaCAoZSkgeyBzZW5jaGEgPSAnc2VuY2hhJyB9XG4gIGlmIChmcy5leGlzdHNTeW5jKHNlbmNoYSkpIHtcbiAgICBsb2d2KG9wdGlvbnMsJ3NlbmNoYSBmb2xkZXIgZXhpc3RzJylcbiAgfVxuICBlbHNlIHtcbiAgICBsb2d2KG9wdGlvbnMsJ3NlbmNoYSBmb2xkZXIgRE9FUyBOT1QgZXhpc3QnKVxuICB9XG5cbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgIGNvbnN0IG9uQnVpbGREb25lID0gKCkgPT4ge1xuICAgIGxvZ3Yob3B0aW9ucywnb25CdWlsZERvbmUnKVxuICAgIHJlc29sdmUoKVxuICAgfVxuXG4gICB2YXIgb3B0cyA9IHsgY3dkOiBvdXRwdXRQYXRoLCBzaWxlbnQ6IHRydWUsIHN0ZGlvOiAncGlwZScsIGVuY29kaW5nOiAndXRmLTgnfVxuICAgZXhlY3V0ZUFzeW5jKGFwcCwgc2VuY2hhLCBwYXJtcywgb3B0cywgY29tcGlsYXRpb24sIG9wdGlvbnMpLnRoZW4gKFxuICAgICBmdW5jdGlvbigpIHsgb25CdWlsZERvbmUoKSB9LCBcbiAgICAgZnVuY3Rpb24ocmVhc29uKSB7IHJlamVjdChyZWFzb24pIH1cbiAgIClcbiB9KVxufVxuXG4vLyoqKioqKioqKipcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBleGVjdXRlQXN5bmMgKGFwcCwgY29tbWFuZCwgcGFybXMsIG9wdHMsIGNvbXBpbGF0aW9uLCBvcHRpb25zKSB7XG4gIC8vY29uc3QgREVGQVVMVF9TVUJTVFJTID0gWydbSU5GXSBMb2FkaW5nJywgJ1tJTkZdIFByb2Nlc3NpbmcnLCAnW0xPR10gRmFzaGlvbiBidWlsZCBjb21wbGV0ZScsICdbRVJSXScsICdbV1JOXScsIFwiW0lORl0gU2VydmVyXCIsIFwiW0lORl0gV3JpdGluZ1wiLCBcIltJTkZdIExvYWRpbmcgQnVpbGRcIiwgXCJbSU5GXSBXYWl0aW5nXCIsIFwiW0xPR10gRmFzaGlvbiB3YWl0aW5nXCJdO1xuICBjb25zdCBERUZBVUxUX1NVQlNUUlMgPSBbJ1tJTkZdIExvYWRpbmcnLCAnW0lORl0gQXBwZW5kJywgJ1tJTkZdIFByb2Nlc3NpbmcnLCAnW0lORl0gUHJvY2Vzc2luZyBCdWlsZCcsICdbTE9HXSBGYXNoaW9uIGJ1aWxkIGNvbXBsZXRlJywgJ1tFUlJdJywgJ1tXUk5dJywgXCJbSU5GXSBTZXJ2ZXJcIiwgXCJbSU5GXSBXcml0aW5nXCIsIFwiW0lORl0gTG9hZGluZyBCdWlsZFwiLCBcIltJTkZdIFdhaXRpbmdcIiwgXCJbTE9HXSBGYXNoaW9uIHdhaXRpbmdcIl07XG4gIHZhciBzdWJzdHJpbmdzID0gREVGQVVMVF9TVUJTVFJTIFxuICB2YXIgY2hhbGsgPSByZXF1aXJlKCdjaGFsaycpXG4gIGNvbnN0IGNyb3NzU3Bhd24gPSByZXF1aXJlKCdjcm9zcy1zcGF3bicpXG4gIGNvbnN0IGxvZyA9IHJlcXVpcmUoJy4vcGx1Z2luVXRpbCcpLmxvZ1xuICBsb2d2KG9wdGlvbnMsICdGVU5DVElPTiBleGVjdXRlQXN5bmMnKVxuICBhd2FpdCBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgbG9ndihvcHRpb25zLGBjb21tYW5kIC0gJHtjb21tYW5kfWApXG4gICAgbG9ndihvcHRpb25zLCBgcGFybXMgLSAke3Bhcm1zfWApXG4gICAgbG9ndihvcHRpb25zLCBgb3B0cyAtICR7SlNPTi5zdHJpbmdpZnkob3B0cyl9YClcbiAgICBsZXQgY2hpbGQgPSBjcm9zc1NwYXduKGNvbW1hbmQsIHBhcm1zLCBvcHRzKVxuICAgIGNoaWxkLm9uKCdjbG9zZScsIChjb2RlLCBzaWduYWwpID0+IHtcbiAgICAgIGxvZ3Yob3B0aW9ucywgYG9uIGNsb3NlYCkgXG4gICAgICBpZihjb2RlID09PSAwKSB7IHJlc29sdmUoMCkgfVxuICAgICAgZWxzZSB7IGNvbXBpbGF0aW9uLmVycm9ycy5wdXNoKCBuZXcgRXJyb3IoY29kZSkgKTsgcmVzb2x2ZSgwKSB9XG4gICAgfSlcbiAgICBjaGlsZC5vbignZXJyb3InLCAoZXJyb3IpID0+IHsgXG4gICAgICBsb2d2KG9wdGlvbnMsIGBvbiBlcnJvcmApIFxuICAgICAgY29tcGlsYXRpb24uZXJyb3JzLnB1c2goZXJyb3IpXG4gICAgICByZXNvbHZlKDApXG4gICAgfSlcbiAgICBjaGlsZC5zdGRvdXQub24oJ2RhdGEnLCAoZGF0YSkgPT4ge1xuICAgICAgdmFyIHN0ciA9IGRhdGEudG9TdHJpbmcoKS5yZXBsYWNlKC9cXHI/XFxufFxcci9nLCBcIiBcIikudHJpbSgpXG4gICAgICBsb2d2KG9wdGlvbnMsIGAke3N0cn1gKVxuICAgICAgaWYgKGRhdGEgJiYgZGF0YS50b1N0cmluZygpLm1hdGNoKC9XYWl0aW5nIGZvciBjaGFuZ2VzXFwuXFwuXFwuLykpIHtcbiAgICAgICAgcmVzb2x2ZSgwKVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGlmIChzdWJzdHJpbmdzLnNvbWUoZnVuY3Rpb24odikgeyByZXR1cm4gZGF0YS5pbmRleE9mKHYpID49IDA7IH0pKSB7IFxuICAgICAgICAgIHN0ciA9IHN0ci5yZXBsYWNlKFwiW0lORl1cIiwgXCJcIilcbiAgICAgICAgICBzdHIgPSBzdHIucmVwbGFjZShcIltMT0ddXCIsIFwiXCIpXG4gICAgICAgICAgc3RyID0gc3RyLnJlcGxhY2UocHJvY2Vzcy5jd2QoKSwgJycpLnRyaW0oKVxuICAgICAgICAgIGlmIChzdHIuaW5jbHVkZXMoXCJbRVJSXVwiKSkge1xuICAgICAgICAgICAgY29tcGlsYXRpb24uZXJyb3JzLnB1c2goYXBwICsgc3RyLnJlcGxhY2UoL15cXFtFUlJcXF0gL2dpLCAnJykpO1xuICAgICAgICAgICAgc3RyID0gc3RyLnJlcGxhY2UoXCJbRVJSXVwiLCBgJHtjaGFsay5yZWQoXCJbRVJSXVwiKX1gKVxuICAgICAgICAgIH1cbiAgICAgICAgICBsb2coYCR7YXBwfSR7c3RyfWApIFxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSlcbiAgICBjaGlsZC5zdGRlcnIub24oJ2RhdGEnLCAoZGF0YSkgPT4ge1xuICAgICAgbG9ndihvcHRpb25zLCBgZXJyb3Igb24gY2xvc2VgKSBcbiAgICAgIHZhciBzdHIgPSBkYXRhLnRvU3RyaW5nKCkucmVwbGFjZSgvXFxyP1xcbnxcXHIvZywgXCIgXCIpLnRyaW0oKVxuICAgICAgdmFyIHN0ckphdmFPcHRzID0gXCJQaWNrZWQgdXAgX0pBVkFfT1BUSU9OU1wiO1xuICAgICAgdmFyIGluY2x1ZGVzID0gc3RyLmluY2x1ZGVzKHN0ckphdmFPcHRzKVxuICAgICAgaWYgKCFpbmNsdWRlcykge1xuICAgICAgICBjb25zb2xlLmxvZyhgJHthcHB9ICR7Y2hhbGsucmVkKFwiW0VSUl1cIil9ICR7c3RyfWApXG4gICAgICB9XG4gICAgfSlcbiAgfSlcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gbG9nKHMpIHtcbiAgcmVxdWlyZSgncmVhZGxpbmUnKS5jdXJzb3JUbyhwcm9jZXNzLnN0ZG91dCwgMClcbiAgdHJ5IHtcbiAgICBwcm9jZXNzLnN0ZG91dC5jbGVhckxpbmUoKVxuICB9XG4gIGNhdGNoKGUpIHt9XG4gIHByb2Nlc3Muc3Rkb3V0LndyaXRlKHMpXG4gIHByb2Nlc3Muc3Rkb3V0LndyaXRlKCdcXG4nKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gbG9ndihvcHRpb25zLCBzKSB7XG4gIGlmIChvcHRpb25zLnZlcmJvc2UgPT0gJ3llcycpIHtcbiAgICByZXF1aXJlKCdyZWFkbGluZScpLmN1cnNvclRvKHByb2Nlc3Muc3Rkb3V0LCAwKVxuICAgIHRyeSB7XG4gICAgICBwcm9jZXNzLnN0ZG91dC5jbGVhckxpbmUoKVxuICAgIH1cbiAgICBjYXRjaChlKSB7fVxuICAgIHByb2Nlc3Muc3Rkb3V0LndyaXRlKGAtdmVyYm9zZTogJHtzfWApXG4gICAgcHJvY2Vzcy5zdGRvdXQud3JpdGUoJ1xcbicpXG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9nZXRBcHAoKSB7XG4gIHZhciBjaGFsayA9IHJlcXVpcmUoJ2NoYWxrJylcbiAgdmFyIHByZWZpeCA9IGBgXG4gIGNvbnN0IHBsYXRmb3JtID0gcmVxdWlyZSgnb3MnKS5wbGF0Zm9ybSgpXG4gIGlmIChwbGF0Zm9ybSA9PSAnZGFyd2luJykgeyBwcmVmaXggPSBg4oS5IO+9omV4dO+9ozpgIH1cbiAgZWxzZSB7IHByZWZpeCA9IGBpIFtleHRdOmAgfVxuICByZXR1cm4gYCR7Y2hhbGsuZ3JlZW4ocHJlZml4KX0gYFxufVxuXG5leHBvcnQgZnVuY3Rpb24gX2dldFZlcnNpb25zKGFwcCwgcGx1Z2luTmFtZSwgZnJhbWV3b3JrTmFtZSkge1xuICBjb25zdCBwYXRoID0gcmVxdWlyZSgncGF0aCcpXG4gIGNvbnN0IGZzID0gcmVxdWlyZSgnZnMnKVxuXG4gIHZhciB2ID0ge31cbiAgdmFyIHBsdWdpblBhdGggPSBwYXRoLnJlc29sdmUocHJvY2Vzcy5jd2QoKSwnbm9kZV9tb2R1bGVzL0BzZW5jaGEnLCBwbHVnaW5OYW1lKVxuICB2YXIgcGx1Z2luUGtnID0gKGZzLmV4aXN0c1N5bmMocGx1Z2luUGF0aCsnL3BhY2thZ2UuanNvbicpICYmIEpTT04ucGFyc2UoZnMucmVhZEZpbGVTeW5jKHBsdWdpblBhdGgrJy9wYWNrYWdlLmpzb24nLCAndXRmLTgnKSkgfHwge30pO1xuICB2LnBsdWdpblZlcnNpb24gPSBwbHVnaW5Qa2cudmVyc2lvblxuXG4gIHZhciB3ZWJwYWNrUGF0aCA9IHBhdGgucmVzb2x2ZShwcm9jZXNzLmN3ZCgpLCdub2RlX21vZHVsZXMvd2VicGFjaycpXG4gIHZhciB3ZWJwYWNrUGtnID0gKGZzLmV4aXN0c1N5bmMod2VicGFja1BhdGgrJy9wYWNrYWdlLmpzb24nKSAmJiBKU09OLnBhcnNlKGZzLnJlYWRGaWxlU3luYyh3ZWJwYWNrUGF0aCsnL3BhY2thZ2UuanNvbicsICd1dGYtOCcpKSB8fCB7fSk7XG4gIHYud2VicGFja1ZlcnNpb24gPSB3ZWJwYWNrUGtnLnZlcnNpb25cblxuICB2YXIgZXh0UGF0aCA9IHBhdGgucmVzb2x2ZShwcm9jZXNzLmN3ZCgpLCdub2RlX21vZHVsZXMvQHNlbmNoYS9leHQnKVxuICB2YXIgZXh0UGtnID0gKGZzLmV4aXN0c1N5bmMoZXh0UGF0aCsnL3BhY2thZ2UuanNvbicpICYmIEpTT04ucGFyc2UoZnMucmVhZEZpbGVTeW5jKGV4dFBhdGgrJy9wYWNrYWdlLmpzb24nLCAndXRmLTgnKSkgfHwge30pO1xuICB2LmV4dFZlcnNpb24gPSBleHRQa2cuc2VuY2hhLnZlcnNpb25cblxuICB2YXIgY21kUGF0aCA9IHBhdGgucmVzb2x2ZShwcm9jZXNzLmN3ZCgpLGBub2RlX21vZHVsZXMvQHNlbmNoYS8ke3BsdWdpbk5hbWV9L25vZGVfbW9kdWxlcy9Ac2VuY2hhL2NtZGApXG4gIHZhciBjbWRQa2cgPSAoZnMuZXhpc3RzU3luYyhjbWRQYXRoKycvcGFja2FnZS5qc29uJykgJiYgSlNPTi5wYXJzZShmcy5yZWFkRmlsZVN5bmMoY21kUGF0aCsnL3BhY2thZ2UuanNvbicsICd1dGYtOCcpKSB8fCB7fSk7XG4gIHYuY21kVmVyc2lvbiA9IGNtZFBrZy52ZXJzaW9uX2Z1bGxcblxuICB2YXIgZnJhbWV3b3JrSW5mbyA9ICcnXG4gICBpZiAoZnJhbWV3b3JrTmFtZSAhPSB1bmRlZmluZWQgJiYgZnJhbWV3b3JrTmFtZSAhPSAnZXh0anMnKSB7XG4gICAgdmFyIGZyYW1ld29ya1BhdGggPSAnJ1xuICAgIGlmIChmcmFtZXdvcmtOYW1lID09ICdyZWFjdCcpIHtcbiAgICAgIGZyYW1ld29ya1BhdGggPSBwYXRoLnJlc29sdmUocHJvY2Vzcy5jd2QoKSwnbm9kZV9tb2R1bGVzL3JlYWN0JylcbiAgICB9XG4gICAgaWYgKGZyYW1ld29ya05hbWUgPT0gJ2FuZ3VsYXInKSB7XG4gICAgICBmcmFtZXdvcmtQYXRoID0gcGF0aC5yZXNvbHZlKHByb2Nlc3MuY3dkKCksJ25vZGVfbW9kdWxlcy9AYW5ndWxhci9jb3JlJylcbiAgICB9XG4gICAgdmFyIGZyYW1ld29ya1BrZyA9IChmcy5leGlzdHNTeW5jKGZyYW1ld29ya1BhdGgrJy9wYWNrYWdlLmpzb24nKSAmJiBKU09OLnBhcnNlKGZzLnJlYWRGaWxlU3luYyhmcmFtZXdvcmtQYXRoKycvcGFja2FnZS5qc29uJywgJ3V0Zi04JykpIHx8IHt9KTtcbiAgICB2LmZyYW1ld29ya1ZlcnNpb24gPSBmcmFtZXdvcmtQa2cudmVyc2lvblxuICAgIGZyYW1ld29ya0luZm8gPSAnLCAnICsgZnJhbWV3b3JrTmFtZSArICcgdicgKyB2LmZyYW1ld29ya1ZlcnNpb25cbiAgfVxuXG4gIHJldHVybiBhcHAgKyAnZXh0LXdlYnBhY2stcGx1Z2luIHYnICsgdi5wbHVnaW5WZXJzaW9uICsgJywgRXh0IEpTIHYnICsgdi5leHRWZXJzaW9uICsgJywgU2VuY2hhIENtZCB2JyArIHYuY21kVmVyc2lvbiArICcsIHdlYnBhY2sgdicgKyB2LndlYnBhY2tWZXJzaW9uICsgZnJhbWV3b3JrSW5mb1xufSJdfQ==