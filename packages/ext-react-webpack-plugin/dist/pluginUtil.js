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

  process.stdout.clearLine();
  process.stdout.write(s);
  process.stdout.write('\n');
}

function logv(options, s) {
  if (options.verbose == 'yes') {
    require('readline').cursorTo(process.stdout, 0);

    process.stdout.clearLine();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9wbHVnaW5VdGlsLmpzIl0sIm5hbWVzIjpbIl9jb25zdHJ1Y3RvciIsIm9wdGlvbnMiLCJ0aGlzVmFycyIsInRoaXNPcHRpb25zIiwiZnMiLCJyZXF1aXJlIiwidmFsaWRhdGVPcHRpb25zIiwiZnJhbWV3b3JrIiwidW5kZWZpbmVkIiwicGx1Z2luRXJyb3JzIiwicHVzaCIsInBsdWdpbiIsInZhcnMiLCJnZXREZWZhdWx0VmFycyIsInBsdWdpbk5hbWUiLCJhcHAiLCJfZ2V0QXBwIiwibG9ndiIsInJjIiwiZXhpc3RzU3luYyIsIkpTT04iLCJwYXJzZSIsInJlYWRGaWxlU3luYyIsImdldERlZmF1bHRPcHRpb25zIiwiZW52aXJvbm1lbnQiLCJwcm9kdWN0aW9uIiwibG9nIiwiX2dldFZlcnNpb25zIiwiX2NvbXBpbGF0aW9uIiwiY29tcGlsYXRpb24iLCJob29rcyIsInN1Y2NlZWRNb2R1bGUiLCJ0YXAiLCJtb2R1bGUiLCJyZXNvdXJjZSIsIm1hdGNoIiwiZGVwcyIsImV4dHJhY3RGcm9tU291cmNlIiwiX3NvdXJjZSIsIl92YWx1ZSIsImh0bWxXZWJwYWNrUGx1Z2luQmVmb3JlSHRtbEdlbmVyYXRpb24iLCJkYXRhIiwicGF0aCIsInB1YmxpY1BhdGgiLCJvdXRwdXRPcHRpb25zIiwianNQYXRoIiwiam9pbiIsImV4dFBhdGgiLCJjc3NQYXRoIiwiYXNzZXRzIiwianMiLCJ1bnNoaWZ0IiwiY3NzIiwiZW1pdCIsImNvbXBpbGVyIiwiY2FsbGJhY2siLCJfYnVpbGRFeHRCdW5kbGUiLCJvdXRwdXRQYXRoIiwiZGV2U2VydmVyIiwiY29udGVudEJhc2UiLCJfcHJlcGFyZUZvckJ1aWxkIiwicmVidWlsZCIsInBhcm1zIiwicHJvZmlsZSIsImJyb3dzZXJDb3VudCIsImVycm9ycyIsImxlbmd0aCIsInVybCIsInBvcnQiLCJvcG4iLCJvdXRwdXQiLCJyaW1yYWYiLCJta2RpcnAiLCJmc3giLCJwYWNrYWdlcyIsInRvb2xraXQiLCJ0aGVtZSIsImZpcnN0VGltZSIsInN5bmMiLCJidWlsZFhNTCIsImNyZWF0ZUFwcEpzb24iLCJjcmVhdGVXb3Jrc3BhY2VKc29uIiwiY3JlYXRlSlNET01FbnZpcm9ubWVudCIsIndyaXRlRmlsZVN5bmMiLCJwcm9jZXNzIiwiY3dkIiwiZnJvbVJlc291cmNlcyIsInRvUmVzb3VyY2VzIiwiY29weVN5bmMiLCJyZXBsYWNlIiwiZnJvbVBhY2thZ2VzIiwidG9QYWNrYWdlcyIsImZyb21PdmVycmlkZXMiLCJ0b092ZXJyaWRlcyIsIm1hbmlmZXN0Iiwic2VuY2hhIiwiZSIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0Iiwib25CdWlsZERvbmUiLCJvcHRzIiwic2lsZW50Iiwic3RkaW8iLCJlbmNvZGluZyIsImV4ZWN1dGVBc3luYyIsInRoZW4iLCJyZWFzb24iLCJjb21tYW5kIiwiREVGQVVMVF9TVUJTVFJTIiwic3Vic3RyaW5ncyIsImNoYWxrIiwiY3Jvc3NTcGF3biIsInN0cmluZ2lmeSIsImNoaWxkIiwib24iLCJjb2RlIiwic2lnbmFsIiwiRXJyb3IiLCJlcnJvciIsInN0ZG91dCIsInN0ciIsInRvU3RyaW5nIiwidHJpbSIsInNvbWUiLCJ2IiwiaW5kZXhPZiIsImluY2x1ZGVzIiwicmVkIiwic3RkZXJyIiwic3RySmF2YU9wdHMiLCJjb25zb2xlIiwicyIsImN1cnNvclRvIiwiY2xlYXJMaW5lIiwid3JpdGUiLCJ2ZXJib3NlIiwicHJlZml4IiwicGxhdGZvcm0iLCJncmVlbiIsImZyYW1ld29ya05hbWUiLCJwbHVnaW5QYXRoIiwicGx1Z2luUGtnIiwicGx1Z2luVmVyc2lvbiIsInZlcnNpb24iLCJ3ZWJwYWNrUGF0aCIsIndlYnBhY2tQa2ciLCJ3ZWJwYWNrVmVyc2lvbiIsImV4dFBrZyIsImV4dFZlcnNpb24iLCJjbWRQYXRoIiwiY21kUGtnIiwiY21kVmVyc2lvbiIsInZlcnNpb25fZnVsbCIsImZyYW1ld29ya0luZm8iLCJmcmFtZXdvcmtQYXRoIiwiZnJhbWV3b3JrUGtnIiwiZnJhbWV3b3JrVmVyc2lvbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDTyxTQUFTQSxZQUFULENBQXNCQyxPQUF0QixFQUErQjtBQUNwQyxNQUFJQyxRQUFRLEdBQUcsRUFBZjtBQUNBLE1BQUlDLFdBQVcsR0FBRyxFQUFsQjs7QUFDQSxRQUFNQyxFQUFFLEdBQUdDLE9BQU8sQ0FBQyxJQUFELENBQWxCOztBQUNBLFFBQU1DLGVBQWUsR0FBR0QsT0FBTyxDQUFDLGNBQUQsQ0FBL0I7O0FBQ0FDLEVBQUFBLGVBQWUsQ0FBQ0QsT0FBTyxDQUFDLGlCQUFELENBQVIsRUFBNkJKLE9BQTdCLEVBQXNDLEVBQXRDLENBQWY7O0FBQ0EsTUFBSUEsT0FBTyxDQUFDTSxTQUFSLElBQXFCQyxTQUF6QixFQUFvQztBQUNsQ04sSUFBQUEsUUFBUSxDQUFDTyxZQUFULEdBQXdCLEVBQXhCO0FBQ0FQLElBQUFBLFFBQVEsQ0FBQ08sWUFBVCxDQUFzQkMsSUFBdEIsQ0FBMkIsMEdBQTNCO0FBQ0EsUUFBSUMsTUFBTSxHQUFHLEVBQWI7QUFDQUEsSUFBQUEsTUFBTSxDQUFDQyxJQUFQLEdBQWNWLFFBQWQ7QUFDQSxXQUFPUyxNQUFQO0FBQ0Q7O0FBQ0RULEVBQUFBLFFBQVEsR0FBR0csT0FBTyxDQUFFLEtBQUlKLE9BQU8sQ0FBQ00sU0FBVSxNQUF4QixDQUFQLENBQXNDTSxjQUF0QyxFQUFYO0FBQ0FYLEVBQUFBLFFBQVEsQ0FBQ0ssU0FBVCxHQUFxQk4sT0FBTyxDQUFDTSxTQUE3Qjs7QUFDQSxVQUFPTCxRQUFRLENBQUNLLFNBQWhCO0FBQ0UsU0FBSyxPQUFMO0FBQ0VMLE1BQUFBLFFBQVEsQ0FBQ1ksVUFBVCxHQUFzQixvQkFBdEI7QUFDQTs7QUFDRixTQUFLLE9BQUw7QUFDRVosTUFBQUEsUUFBUSxDQUFDWSxVQUFULEdBQXNCLDBCQUF0QjtBQUNBOztBQUNGLFNBQUssU0FBTDtBQUNFWixNQUFBQSxRQUFRLENBQUNZLFVBQVQsR0FBc0IsNEJBQXRCO0FBQ0E7O0FBQ0Y7QUFDRVosTUFBQUEsUUFBUSxDQUFDWSxVQUFULEdBQXNCLG9CQUF0QjtBQVhKOztBQWFBWixFQUFBQSxRQUFRLENBQUNhLEdBQVQsR0FBZVYsT0FBTyxDQUFDLGNBQUQsQ0FBUCxDQUF3QlcsT0FBeEIsRUFBZjtBQUNBQyxFQUFBQSxJQUFJLENBQUNoQixPQUFELEVBQVcsZ0JBQWVDLFFBQVEsQ0FBQ1ksVUFBVyxFQUE5QyxDQUFKO0FBQ0FHLEVBQUFBLElBQUksQ0FBQ2hCLE9BQUQsRUFBVyxrQkFBaUJDLFFBQVEsQ0FBQ2EsR0FBSSxFQUF6QyxDQUFKO0FBQ0EsUUFBTUcsRUFBRSxHQUFJZCxFQUFFLENBQUNlLFVBQUgsQ0FBZSxRQUFPakIsUUFBUSxDQUFDSyxTQUFVLElBQXpDLEtBQWlEYSxJQUFJLENBQUNDLEtBQUwsQ0FBV2pCLEVBQUUsQ0FBQ2tCLFlBQUgsQ0FBaUIsUUFBT3BCLFFBQVEsQ0FBQ0ssU0FBVSxJQUEzQyxFQUFnRCxPQUFoRCxDQUFYLENBQWpELElBQXlILEVBQXJJO0FBQ0FKLEVBQUFBLFdBQVcscUJBQVFFLE9BQU8sQ0FBRSxLQUFJSCxRQUFRLENBQUNLLFNBQVUsTUFBekIsQ0FBUCxDQUF1Q2dCLGlCQUF2QyxFQUFSLEVBQXVFdEIsT0FBdkUsRUFBbUZpQixFQUFuRixDQUFYOztBQUNBLE1BQUlmLFdBQVcsQ0FBQ3FCLFdBQVosSUFBMkIsWUFBL0IsRUFDRTtBQUFDdEIsSUFBQUEsUUFBUSxDQUFDdUIsVUFBVCxHQUFzQixJQUF0QjtBQUEyQixHQUQ5QixNQUdFO0FBQUN2QixJQUFBQSxRQUFRLENBQUN1QixVQUFULEdBQXNCLEtBQXRCO0FBQTRCOztBQUMvQkMsRUFBQUEsR0FBRyxDQUFDckIsT0FBTyxDQUFDLGNBQUQsQ0FBUCxDQUF3QnNCLFlBQXhCLENBQXFDekIsUUFBUSxDQUFDYSxHQUE5QyxFQUFtRGIsUUFBUSxDQUFDWSxVQUE1RCxFQUF3RVosUUFBUSxDQUFDSyxTQUFqRixDQUFELENBQUg7QUFDQW1CLEVBQUFBLEdBQUcsQ0FBQ3hCLFFBQVEsQ0FBQ2EsR0FBVCxHQUFlLGVBQWYsR0FBaUNaLFdBQVcsQ0FBQ3FCLFdBQTlDLENBQUg7QUFFQSxNQUFJYixNQUFNLEdBQUcsRUFBYjtBQUNBQSxFQUFBQSxNQUFNLENBQUNDLElBQVAsR0FBY1YsUUFBZDtBQUNBUyxFQUFBQSxNQUFNLENBQUNWLE9BQVAsR0FBaUJFLFdBQWpCO0FBQ0EsU0FBT1EsTUFBUDtBQUNELEMsQ0FFRDs7O0FBQ08sU0FBU2lCLFlBQVQsQ0FBc0JDLFdBQXRCLEVBQW1DakIsSUFBbkMsRUFBeUNYLE9BQXpDLEVBQWtEO0FBQ3ZELE1BQUlXLElBQUksQ0FBQ2EsVUFBVCxFQUFxQjtBQUNuQlIsSUFBQUEsSUFBSSxDQUFDaEIsT0FBRCxFQUFVLDRCQUFWLENBQUo7QUFDQTRCLElBQUFBLFdBQVcsQ0FBQ0MsS0FBWixDQUFrQkMsYUFBbEIsQ0FBZ0NDLEdBQWhDLENBQXFDLG9CQUFyQyxFQUEyREMsTUFBRCxJQUFZO0FBQ3BFLFVBQUlBLE1BQU0sQ0FBQ0MsUUFBUCxJQUFtQkQsTUFBTSxDQUFDQyxRQUFQLENBQWdCQyxLQUFoQixDQUFzQixhQUF0QixDQUFuQixJQUEyRCxDQUFDRixNQUFNLENBQUNDLFFBQVAsQ0FBZ0JDLEtBQWhCLENBQXNCLGNBQXRCLENBQTVELElBQXFHLENBQUNGLE1BQU0sQ0FBQ0MsUUFBUCxDQUFnQkMsS0FBaEIsQ0FBc0Isa0JBQXRCLENBQTFHLEVBQXFKO0FBQ25KdkIsUUFBQUEsSUFBSSxDQUFDd0IsSUFBTCxHQUFZLENBQ1YsSUFBSXhCLElBQUksQ0FBQ3dCLElBQUwsSUFBYSxFQUFqQixDQURVLEVBRVYsR0FBRy9CLE9BQU8sQ0FBRSxLQUFJTyxJQUFJLENBQUNMLFNBQVUsTUFBckIsQ0FBUCxDQUFtQzhCLGlCQUFuQyxDQUFxREosTUFBTSxDQUFDSyxPQUFQLENBQWVDLE1BQXBFLENBRk8sQ0FBWjtBQUlEO0FBQ0YsS0FQRDtBQVFELEdBVkQsTUFXSztBQUNIdEIsSUFBQUEsSUFBSSxDQUFDaEIsT0FBRCxFQUFXLGlCQUFYLENBQUo7QUFDRCxHQWRzRCxDQWV2RDs7O0FBQ0U0QixFQUFBQSxXQUFXLENBQUNDLEtBQVosQ0FBa0JVLHFDQUFsQixDQUF3RFIsR0FBeEQsQ0FBNkQscUJBQTdELEVBQW1GUyxJQUFELElBQVU7QUFDMUZ4QixJQUFBQSxJQUFJLENBQUNoQixPQUFELEVBQVMsOEJBQVQsQ0FBSjs7QUFDQSxVQUFNeUMsSUFBSSxHQUFHckMsT0FBTyxDQUFDLE1BQUQsQ0FBcEI7O0FBQ0EsUUFBSXNDLFVBQVUsR0FBRyxFQUFqQjs7QUFDQSxRQUFJZCxXQUFXLENBQUNlLGFBQVosQ0FBMEJELFVBQTFCLElBQXdDbkMsU0FBNUMsRUFBdUQ7QUFDckRtQyxNQUFBQSxVQUFVLEdBQUdkLFdBQVcsQ0FBQ2UsYUFBWixDQUEwQkQsVUFBdkM7QUFDRDs7QUFDRCxRQUFJRSxNQUFNLEdBQUdILElBQUksQ0FBQ0ksSUFBTCxDQUFVSCxVQUFWLEVBQXFCL0IsSUFBSSxDQUFDbUMsT0FBTCxHQUFlLFNBQXBDLENBQWI7QUFDQSxRQUFJQyxPQUFPLEdBQUdOLElBQUksQ0FBQ0ksSUFBTCxDQUFVSCxVQUFWLEVBQXFCL0IsSUFBSSxDQUFDbUMsT0FBTCxHQUFlLFVBQXBDLENBQWQ7QUFDQU4sSUFBQUEsSUFBSSxDQUFDUSxNQUFMLENBQVlDLEVBQVosQ0FBZUMsT0FBZixDQUF1Qk4sTUFBdkI7QUFDQUosSUFBQUEsSUFBSSxDQUFDUSxNQUFMLENBQVlHLEdBQVosQ0FBZ0JELE9BQWhCLENBQXdCSCxPQUF4QjtBQUNBdEIsSUFBQUEsR0FBRyxDQUFDZCxJQUFJLENBQUNHLEdBQUwsR0FBWSxVQUFTOEIsTUFBTyxRQUFPRyxPQUFRLGdCQUE1QyxDQUFIO0FBQ0QsR0FaRCxFQWhCcUQsQ0E2QnZEO0FBQ0QsQyxDQUVEOzs7U0FDc0JLLEk7O0VBMkN0Qjs7Ozs7OzBCQTNDTyxpQkFBb0JDLFFBQXBCLEVBQThCekIsV0FBOUIsRUFBMkNqQixJQUEzQyxFQUFpRFgsT0FBakQsRUFBMERzRCxRQUExRDtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUNEeEMsVUFBQUEsR0FEQyxHQUNLSCxJQUFJLENBQUNHLEdBRFY7QUFFRFIsVUFBQUEsU0FGQyxHQUVXSyxJQUFJLENBQUNMLFNBRmhCO0FBR0NtQixVQUFBQSxHQUhELEdBR09yQixPQUFPLENBQUMsY0FBRCxDQUFQLENBQXdCcUIsR0FIL0I7QUFJQ1QsVUFBQUEsSUFKRCxHQUlRWixPQUFPLENBQUMsY0FBRCxDQUFQLENBQXdCWSxJQUpoQztBQUtMQSxVQUFBQSxJQUFJLENBQUNoQixPQUFELEVBQVMsbUJBQVQsQ0FBSjtBQUNNeUMsVUFBQUEsSUFORCxHQU1RckMsT0FBTyxDQUFDLE1BQUQsQ0FOZjtBQU9DbUQsVUFBQUEsZUFQRCxHQU9tQm5ELE9BQU8sQ0FBQyxjQUFELENBQVAsQ0FBd0JtRCxlQVAzQztBQVFEQyxVQUFBQSxVQVJDLEdBUVlmLElBQUksQ0FBQ0ksSUFBTCxDQUFVUSxRQUFRLENBQUNHLFVBQW5CLEVBQThCN0MsSUFBSSxDQUFDbUMsT0FBbkMsQ0FSWjs7QUFTTCxjQUFJTyxRQUFRLENBQUNHLFVBQVQsS0FBd0IsR0FBeEIsSUFBK0JILFFBQVEsQ0FBQ3JELE9BQVQsQ0FBaUJ5RCxTQUFwRCxFQUErRDtBQUM3REQsWUFBQUEsVUFBVSxHQUFHZixJQUFJLENBQUNJLElBQUwsQ0FBVVEsUUFBUSxDQUFDckQsT0FBVCxDQUFpQnlELFNBQWpCLENBQTJCQyxXQUFyQyxFQUFrREYsVUFBbEQsQ0FBYjtBQUNEOztBQUNEeEMsVUFBQUEsSUFBSSxDQUFDaEIsT0FBRCxFQUFTLGlCQUFpQndELFVBQTFCLENBQUo7QUFDQXhDLFVBQUFBLElBQUksQ0FBQ2hCLE9BQUQsRUFBUyxnQkFBZ0JNLFNBQXpCLENBQUo7O0FBQ0EsY0FBSUEsU0FBUyxJQUFJLE9BQWpCLEVBQTBCO0FBQ3hCcUQsWUFBQUEsZ0JBQWdCLENBQUM3QyxHQUFELEVBQU1ILElBQU4sRUFBWVgsT0FBWixFQUFxQndELFVBQXJCLENBQWhCO0FBQ0QsV0FGRCxNQUdLO0FBQ0hwRCxZQUFBQSxPQUFPLENBQUUsS0FBSUUsU0FBVSxNQUFoQixDQUFQLENBQThCcUQsZ0JBQTlCLENBQStDN0MsR0FBL0MsRUFBb0RILElBQXBELEVBQTBEWCxPQUExRCxFQUFtRXdELFVBQW5FLEVBQStFNUIsV0FBL0U7QUFDRDs7QUFuQkksZ0JBb0JEakIsSUFBSSxDQUFDaUQsT0FBTCxJQUFnQixJQXBCZjtBQUFBO0FBQUE7QUFBQTs7QUFxQkNDLFVBQUFBLEtBckJELEdBcUJTLEVBckJUOztBQXNCSCxjQUFJN0QsT0FBTyxDQUFDOEQsT0FBUixJQUFtQnZELFNBQW5CLElBQWdDUCxPQUFPLENBQUM4RCxPQUFSLElBQW1CLEVBQW5ELElBQXlEOUQsT0FBTyxDQUFDOEQsT0FBUixJQUFtQixJQUFoRixFQUFzRjtBQUNwRkQsWUFBQUEsS0FBSyxHQUFHLENBQUMsS0FBRCxFQUFRLE9BQVIsRUFBaUI3RCxPQUFPLENBQUN1QixXQUF6QixDQUFSO0FBQ0QsV0FGRCxNQUdLO0FBQ0hzQyxZQUFBQSxLQUFLLEdBQUcsQ0FBQyxLQUFELEVBQVEsT0FBUixFQUFpQjdELE9BQU8sQ0FBQzhELE9BQXpCLEVBQWtDOUQsT0FBTyxDQUFDdUIsV0FBMUMsQ0FBUjtBQUNEOztBQTNCRTtBQUFBLGlCQTRCR2dDLGVBQWUsQ0FBQ3pDLEdBQUQsRUFBTWMsV0FBTixFQUFtQjRCLFVBQW5CLEVBQStCSyxLQUEvQixFQUFzQzdELE9BQXRDLENBNUJsQjs7QUFBQTtBQTZCSCxjQUFJVyxJQUFJLENBQUNvRCxZQUFMLElBQXFCLENBQXJCLElBQTBCbkMsV0FBVyxDQUFDb0MsTUFBWixDQUFtQkMsTUFBbkIsSUFBNkIsQ0FBM0QsRUFBOEQ7QUFDeERDLFlBQUFBLEdBRHdELEdBQ2xELHNCQUFzQmxFLE9BQU8sQ0FBQ21FLElBRG9CO0FBRTVEMUMsWUFBQUEsR0FBRyxDQUFDWCxHQUFHLEdBQUksc0JBQXFCb0QsR0FBSSxFQUFqQyxDQUFIO0FBQ0F2RCxZQUFBQSxJQUFJLENBQUNvRCxZQUFMO0FBQ01LLFlBQUFBLEdBSnNELEdBSWhEaEUsT0FBTyxDQUFDLEtBQUQsQ0FKeUM7QUFLNURnRSxZQUFBQSxHQUFHLENBQUNGLEdBQUQsQ0FBSDtBQUNEOztBQUNEWixVQUFBQSxRQUFRO0FBcENMO0FBQUE7O0FBQUE7QUF1Q0hBLFVBQUFBLFFBQVE7O0FBdkNMO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHOzs7O0FBNENBLFNBQVNLLGdCQUFULENBQTBCN0MsR0FBMUIsRUFBK0JILElBQS9CLEVBQXFDWCxPQUFyQyxFQUE4Q3FFLE1BQTlDLEVBQXNEO0FBQzNEckQsRUFBQUEsSUFBSSxDQUFDaEIsT0FBRCxFQUFTLGtCQUFULENBQUo7O0FBQ0EsUUFBTXNFLE1BQU0sR0FBR2xFLE9BQU8sQ0FBQyxRQUFELENBQXRCOztBQUNBLFFBQU1tRSxNQUFNLEdBQUduRSxPQUFPLENBQUMsUUFBRCxDQUF0Qjs7QUFDQSxRQUFNb0UsR0FBRyxHQUFHcEUsT0FBTyxDQUFDLFVBQUQsQ0FBbkI7O0FBQ0EsUUFBTUQsRUFBRSxHQUFHQyxPQUFPLENBQUMsSUFBRCxDQUFsQjs7QUFDQSxRQUFNcUMsSUFBSSxHQUFHckMsT0FBTyxDQUFDLE1BQUQsQ0FBcEI7O0FBRUEsTUFBSXFFLFFBQVEsR0FBR3pFLE9BQU8sQ0FBQ3lFLFFBQXZCO0FBQ0EsTUFBSUMsT0FBTyxHQUFHMUUsT0FBTyxDQUFDMEUsT0FBdEI7QUFDQSxNQUFJQyxLQUFLLEdBQUczRSxPQUFPLENBQUMyRSxLQUFwQjtBQUVBQSxFQUFBQSxLQUFLLEdBQUdBLEtBQUssS0FBS0QsT0FBTyxLQUFLLFNBQVosR0FBd0IsY0FBeEIsR0FBeUMsZ0JBQTlDLENBQWI7QUFDQTFELEVBQUFBLElBQUksQ0FBQ2hCLE9BQUQsRUFBU1csSUFBSSxDQUFDaUUsU0FBZCxDQUFKOztBQUNBLE1BQUlqRSxJQUFJLENBQUNpRSxTQUFULEVBQW9CO0FBQ2xCNUQsSUFBQUEsSUFBSSxDQUFDaEIsT0FBRCxFQUFTcUUsTUFBVCxDQUFKO0FBQ0FDLElBQUFBLE1BQU0sQ0FBQ08sSUFBUCxDQUFZUixNQUFaO0FBQ0FFLElBQUFBLE1BQU0sQ0FBQ00sSUFBUCxDQUFZUixNQUFaO0FBQ0FyRCxJQUFBQSxJQUFJLENBQUNoQixPQUFELEVBQVNJLE9BQU8sQ0FBQyxhQUFELENBQWhCLENBQUo7O0FBQ0EsVUFBTTBFLFFBQVEsR0FBRzFFLE9BQU8sQ0FBQyxhQUFELENBQVAsQ0FBdUIwRSxRQUF4Qzs7QUFDQSxVQUFNQyxhQUFhLEdBQUczRSxPQUFPLENBQUMsYUFBRCxDQUFQLENBQXVCMkUsYUFBN0M7O0FBQ0EsVUFBTUMsbUJBQW1CLEdBQUc1RSxPQUFPLENBQUMsYUFBRCxDQUFQLENBQXVCNEUsbUJBQW5EOztBQUNBLFVBQU1DLHNCQUFzQixHQUFHN0UsT0FBTyxDQUFDLGFBQUQsQ0FBUCxDQUF1QjZFLHNCQUF0RDs7QUFFQTlFLElBQUFBLEVBQUUsQ0FBQytFLGFBQUgsQ0FBaUJ6QyxJQUFJLENBQUNJLElBQUwsQ0FBVXdCLE1BQVYsRUFBa0IsV0FBbEIsQ0FBakIsRUFBaURTLFFBQVEsQ0FBQ25FLElBQUksQ0FBQ2EsVUFBTixFQUFrQnhCLE9BQWxCLENBQXpELEVBQXFGLE1BQXJGO0FBQ0FHLElBQUFBLEVBQUUsQ0FBQytFLGFBQUgsQ0FBaUJ6QyxJQUFJLENBQUNJLElBQUwsQ0FBVXdCLE1BQVYsRUFBa0IsVUFBbEIsQ0FBakIsRUFBZ0RVLGFBQWEsQ0FBQ0osS0FBRCxFQUFRRixRQUFSLEVBQWtCQyxPQUFsQixFQUEyQjFFLE9BQTNCLENBQTdELEVBQWtHLE1BQWxHO0FBQ0FHLElBQUFBLEVBQUUsQ0FBQytFLGFBQUgsQ0FBaUJ6QyxJQUFJLENBQUNJLElBQUwsQ0FBVXdCLE1BQVYsRUFBa0Isc0JBQWxCLENBQWpCLEVBQTREWSxzQkFBc0IsQ0FBQ2pGLE9BQUQsQ0FBbEYsRUFBNkYsTUFBN0Y7QUFDQUcsSUFBQUEsRUFBRSxDQUFDK0UsYUFBSCxDQUFpQnpDLElBQUksQ0FBQ0ksSUFBTCxDQUFVd0IsTUFBVixFQUFrQixnQkFBbEIsQ0FBakIsRUFBc0RXLG1CQUFtQixDQUFDaEYsT0FBRCxDQUF6RSxFQUFvRixNQUFwRjs7QUFFQSxRQUFJRyxFQUFFLENBQUNlLFVBQUgsQ0FBY3VCLElBQUksQ0FBQ0ksSUFBTCxDQUFVc0MsT0FBTyxDQUFDQyxHQUFSLEVBQVYsRUFBeUIsWUFBekIsQ0FBZCxDQUFKLEVBQTJEO0FBQ3pELFVBQUlDLGFBQWEsR0FBRzVDLElBQUksQ0FBQ0ksSUFBTCxDQUFVc0MsT0FBTyxDQUFDQyxHQUFSLEVBQVYsRUFBeUIsWUFBekIsQ0FBcEI7QUFDQSxVQUFJRSxXQUFXLEdBQUc3QyxJQUFJLENBQUNJLElBQUwsQ0FBVXdCLE1BQVYsRUFBa0IsY0FBbEIsQ0FBbEI7QUFDQUcsTUFBQUEsR0FBRyxDQUFDZSxRQUFKLENBQWFGLGFBQWIsRUFBNEJDLFdBQTVCO0FBQ0E3RCxNQUFBQSxHQUFHLENBQUNYLEdBQUcsR0FBRyxVQUFOLEdBQW1CdUUsYUFBYSxDQUFDRyxPQUFkLENBQXNCTCxPQUFPLENBQUNDLEdBQVIsRUFBdEIsRUFBcUMsRUFBckMsQ0FBbkIsR0FBOEQsT0FBOUQsR0FBd0VFLFdBQVcsQ0FBQ0UsT0FBWixDQUFvQkwsT0FBTyxDQUFDQyxHQUFSLEVBQXBCLEVBQW1DLEVBQW5DLENBQXpFLENBQUg7QUFDRDs7QUFFRCxRQUFJakYsRUFBRSxDQUFDZSxVQUFILENBQWN1QixJQUFJLENBQUNJLElBQUwsQ0FBVXNDLE9BQU8sQ0FBQ0MsR0FBUixFQUFWLEVBQXdCLFlBQXhCLENBQWQsQ0FBSixFQUEwRDtBQUN4RCxVQUFJQyxhQUFhLEdBQUc1QyxJQUFJLENBQUNJLElBQUwsQ0FBVXNDLE9BQU8sQ0FBQ0MsR0FBUixFQUFWLEVBQXlCLFlBQXpCLENBQXBCO0FBQ0EsVUFBSUUsV0FBVyxHQUFHN0MsSUFBSSxDQUFDSSxJQUFMLENBQVV3QixNQUFWLEVBQWtCLFdBQWxCLENBQWxCO0FBQ0FHLE1BQUFBLEdBQUcsQ0FBQ2UsUUFBSixDQUFhRixhQUFiLEVBQTRCQyxXQUE1QjtBQUNBN0QsTUFBQUEsR0FBRyxDQUFDWCxHQUFHLEdBQUcsVUFBTixHQUFtQnVFLGFBQWEsQ0FBQ0csT0FBZCxDQUFzQkwsT0FBTyxDQUFDQyxHQUFSLEVBQXRCLEVBQXFDLEVBQXJDLENBQW5CLEdBQThELE9BQTlELEdBQXdFRSxXQUFXLENBQUNFLE9BQVosQ0FBb0JMLE9BQU8sQ0FBQ0MsR0FBUixFQUFwQixFQUFtQyxFQUFuQyxDQUF6RSxDQUFIO0FBQ0Q7O0FBRUQsUUFBSWpGLEVBQUUsQ0FBQ2UsVUFBSCxDQUFjdUIsSUFBSSxDQUFDSSxJQUFMLENBQVVzQyxPQUFPLENBQUNDLEdBQVIsRUFBVixFQUF3QnpFLElBQUksQ0FBQ21DLE9BQUwsR0FBZSxZQUF2QyxDQUFkLENBQUosRUFBeUU7QUFDdkUsVUFBSTJDLFlBQVksR0FBR2hELElBQUksQ0FBQ0ksSUFBTCxDQUFVc0MsT0FBTyxDQUFDQyxHQUFSLEVBQVYsRUFBd0J6RSxJQUFJLENBQUNtQyxPQUFMLEdBQWUsWUFBdkMsQ0FBbkI7QUFDQSxVQUFJNEMsVUFBVSxHQUFHakQsSUFBSSxDQUFDSSxJQUFMLENBQVV3QixNQUFWLEVBQWtCLFdBQWxCLENBQWpCO0FBQ0FHLE1BQUFBLEdBQUcsQ0FBQ2UsUUFBSixDQUFhRSxZQUFiLEVBQTJCQyxVQUEzQjtBQUNBakUsTUFBQUEsR0FBRyxDQUFDWCxHQUFHLEdBQUcsVUFBTixHQUFtQjJFLFlBQVksQ0FBQ0QsT0FBYixDQUFxQkwsT0FBTyxDQUFDQyxHQUFSLEVBQXJCLEVBQW9DLEVBQXBDLENBQW5CLEdBQTZELE9BQTdELEdBQXVFTSxVQUFVLENBQUNGLE9BQVgsQ0FBbUJMLE9BQU8sQ0FBQ0MsR0FBUixFQUFuQixFQUFrQyxFQUFsQyxDQUF4RSxDQUFIO0FBQ0Q7O0FBRUQsUUFBSWpGLEVBQUUsQ0FBQ2UsVUFBSCxDQUFjdUIsSUFBSSxDQUFDSSxJQUFMLENBQVVzQyxPQUFPLENBQUNDLEdBQVIsRUFBVixFQUF3QnpFLElBQUksQ0FBQ21DLE9BQUwsR0FBZSxhQUF2QyxDQUFkLENBQUosRUFBMEU7QUFDeEUsVUFBSTZDLGFBQWEsR0FBR2xELElBQUksQ0FBQ0ksSUFBTCxDQUFVc0MsT0FBTyxDQUFDQyxHQUFSLEVBQVYsRUFBd0J6RSxJQUFJLENBQUNtQyxPQUFMLEdBQWUsYUFBdkMsQ0FBcEI7QUFDQSxVQUFJOEMsV0FBVyxHQUFHbkQsSUFBSSxDQUFDSSxJQUFMLENBQVV3QixNQUFWLEVBQWtCLFlBQWxCLENBQWxCO0FBQ0FHLE1BQUFBLEdBQUcsQ0FBQ2UsUUFBSixDQUFhSSxhQUFiLEVBQTRCQyxXQUE1QjtBQUNBbkUsTUFBQUEsR0FBRyxDQUFDWCxHQUFHLEdBQUcsVUFBTixHQUFtQjZFLGFBQWEsQ0FBQ0gsT0FBZCxDQUFzQkwsT0FBTyxDQUFDQyxHQUFSLEVBQXRCLEVBQXFDLEVBQXJDLENBQW5CLEdBQThELE9BQTlELEdBQXdFUSxXQUFXLENBQUNKLE9BQVosQ0FBb0JMLE9BQU8sQ0FBQ0MsR0FBUixFQUFwQixFQUFtQyxFQUFuQyxDQUF6RSxDQUFIO0FBQ0Q7QUFDRjs7QUFDRHpFLEVBQUFBLElBQUksQ0FBQ2lFLFNBQUwsR0FBaUIsS0FBakI7QUFDQSxNQUFJM0IsRUFBSjs7QUFDQSxNQUFJdEMsSUFBSSxDQUFDYSxVQUFULEVBQXFCO0FBQ25CYixJQUFBQSxJQUFJLENBQUN3QixJQUFMLENBQVUxQixJQUFWLENBQWUsZ0NBQWY7QUFDQXdDLElBQUFBLEVBQUUsR0FBR3RDLElBQUksQ0FBQ3dCLElBQUwsQ0FBVVUsSUFBVixDQUFlLEtBQWYsQ0FBTDtBQUNELEdBSEQsTUFJSztBQUNISSxJQUFBQSxFQUFFLEdBQUcsc0JBQUw7QUFDRDs7QUFDRCxNQUFJdEMsSUFBSSxDQUFDa0YsUUFBTCxLQUFrQixJQUFsQixJQUEwQjVDLEVBQUUsS0FBS3RDLElBQUksQ0FBQ2tGLFFBQTFDLEVBQW9EO0FBQ2xEbEYsSUFBQUEsSUFBSSxDQUFDa0YsUUFBTCxHQUFnQjVDLEVBQWhCO0FBQ0EsVUFBTTRDLFFBQVEsR0FBR3BELElBQUksQ0FBQ0ksSUFBTCxDQUFVd0IsTUFBVixFQUFrQixhQUFsQixDQUFqQjtBQUNBbEUsSUFBQUEsRUFBRSxDQUFDK0UsYUFBSCxDQUFpQlcsUUFBakIsRUFBMkI1QyxFQUEzQixFQUErQixNQUEvQjtBQUNBdEMsSUFBQUEsSUFBSSxDQUFDaUQsT0FBTCxHQUFlLElBQWY7QUFDQW5DLElBQUFBLEdBQUcsQ0FBQ1gsR0FBRyxHQUFHLDBCQUFOLEdBQW1DdUQsTUFBTSxDQUFDbUIsT0FBUCxDQUFlTCxPQUFPLENBQUNDLEdBQVIsRUFBZixFQUE4QixFQUE5QixDQUFwQyxDQUFIO0FBQ0QsR0FORCxNQU9LO0FBQ0h6RSxJQUFBQSxJQUFJLENBQUNpRCxPQUFMLEdBQWUsS0FBZjtBQUNBbkMsSUFBQUEsR0FBRyxDQUFDWCxHQUFHLEdBQUcsNkJBQVAsQ0FBSDtBQUNEO0FBQ0YsQyxDQUVEOzs7QUFDTyxTQUFTeUMsZUFBVCxDQUF5QnpDLEdBQXpCLEVBQThCYyxXQUE5QixFQUEyQzRCLFVBQTNDLEVBQXVESyxLQUF2RCxFQUE4RDdELE9BQTlELEVBQXVFO0FBQzVFLFFBQU1HLEVBQUUsR0FBR0MsT0FBTyxDQUFDLElBQUQsQ0FBbEI7O0FBQ0EsUUFBTVksSUFBSSxHQUFHWixPQUFPLENBQUMsY0FBRCxDQUFQLENBQXdCWSxJQUFyQzs7QUFDQUEsRUFBQUEsSUFBSSxDQUFDaEIsT0FBRCxFQUFTLDBCQUFULENBQUo7QUFFQSxNQUFJOEYsTUFBSjs7QUFBWSxNQUFJO0FBQUVBLElBQUFBLE1BQU0sR0FBRzFGLE9BQU8sQ0FBQyxhQUFELENBQWhCO0FBQWlDLEdBQXZDLENBQXdDLE9BQU8yRixDQUFQLEVBQVU7QUFBRUQsSUFBQUEsTUFBTSxHQUFHLFFBQVQ7QUFBbUI7O0FBQ25GLE1BQUkzRixFQUFFLENBQUNlLFVBQUgsQ0FBYzRFLE1BQWQsQ0FBSixFQUEyQjtBQUN6QjlFLElBQUFBLElBQUksQ0FBQ2hCLE9BQUQsRUFBUyxzQkFBVCxDQUFKO0FBQ0QsR0FGRCxNQUdLO0FBQ0hnQixJQUFBQSxJQUFJLENBQUNoQixPQUFELEVBQVMsOEJBQVQsQ0FBSjtBQUNEOztBQUVELFNBQU8sSUFBSWdHLE9BQUosQ0FBWSxDQUFDQyxPQUFELEVBQVVDLE1BQVYsS0FBcUI7QUFDdkMsVUFBTUMsV0FBVyxHQUFHLE1BQU07QUFDekJuRixNQUFBQSxJQUFJLENBQUNoQixPQUFELEVBQVMsYUFBVCxDQUFKO0FBQ0FpRyxNQUFBQSxPQUFPO0FBQ1AsS0FIRDs7QUFLQSxRQUFJRyxJQUFJLEdBQUc7QUFBRWhCLE1BQUFBLEdBQUcsRUFBRTVCLFVBQVA7QUFBbUI2QyxNQUFBQSxNQUFNLEVBQUUsSUFBM0I7QUFBaUNDLE1BQUFBLEtBQUssRUFBRSxNQUF4QztBQUFnREMsTUFBQUEsUUFBUSxFQUFFO0FBQTFELEtBQVg7QUFDQUMsSUFBQUEsWUFBWSxDQUFDMUYsR0FBRCxFQUFNZ0YsTUFBTixFQUFjakMsS0FBZCxFQUFxQnVDLElBQXJCLEVBQTJCeEUsV0FBM0IsRUFBd0M1QixPQUF4QyxDQUFaLENBQTZEeUcsSUFBN0QsQ0FDRSxZQUFXO0FBQUVOLE1BQUFBLFdBQVc7QUFBSSxLQUQ5QixFQUVFLFVBQVNPLE1BQVQsRUFBaUI7QUFBRVIsTUFBQUEsTUFBTSxDQUFDUSxNQUFELENBQU47QUFBZ0IsS0FGckM7QUFJRCxHQVhPLENBQVA7QUFZRCxDLENBRUQ7OztTQUNzQkYsWTs7Ozs7OzswQkFBZixrQkFBNkIxRixHQUE3QixFQUFrQzZGLE9BQWxDLEVBQTJDOUMsS0FBM0MsRUFBa0R1QyxJQUFsRCxFQUF3RHhFLFdBQXhELEVBQXFFNUIsT0FBckU7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNMO0FBQ000RyxVQUFBQSxlQUZELEdBRW1CLENBQUMsZUFBRCxFQUFrQixjQUFsQixFQUFrQyxrQkFBbEMsRUFBc0Qsd0JBQXRELEVBQWdGLDhCQUFoRixFQUFnSCxPQUFoSCxFQUF5SCxPQUF6SCxFQUFrSSxjQUFsSSxFQUFrSixlQUFsSixFQUFtSyxxQkFBbkssRUFBMEwsZUFBMUwsRUFBMk0sdUJBQTNNLENBRm5CO0FBR0RDLFVBQUFBLFVBSEMsR0FHWUQsZUFIWjtBQUlERSxVQUFBQSxLQUpDLEdBSU8xRyxPQUFPLENBQUMsT0FBRCxDQUpkO0FBS0MyRyxVQUFBQSxVQUxELEdBS2MzRyxPQUFPLENBQUMsYUFBRCxDQUxyQjtBQU1DcUIsVUFBQUEsR0FORCxHQU1PckIsT0FBTyxDQUFDLGNBQUQsQ0FBUCxDQUF3QnFCLEdBTi9CO0FBT0xULFVBQUFBLElBQUksQ0FBQ2hCLE9BQUQsRUFBVSx1QkFBVixDQUFKO0FBUEs7QUFBQSxpQkFRQyxJQUFJZ0csT0FBSixDQUFZLENBQUNDLE9BQUQsRUFBVUMsTUFBVixLQUFxQjtBQUNyQ2xGLFlBQUFBLElBQUksQ0FBQ2hCLE9BQUQsRUFBVSxhQUFZMkcsT0FBUSxFQUE5QixDQUFKO0FBQ0EzRixZQUFBQSxJQUFJLENBQUNoQixPQUFELEVBQVcsV0FBVTZELEtBQU0sRUFBM0IsQ0FBSjtBQUNBN0MsWUFBQUEsSUFBSSxDQUFDaEIsT0FBRCxFQUFXLFVBQVNtQixJQUFJLENBQUM2RixTQUFMLENBQWVaLElBQWYsQ0FBcUIsRUFBekMsQ0FBSjtBQUNBLGdCQUFJYSxLQUFLLEdBQUdGLFVBQVUsQ0FBQ0osT0FBRCxFQUFVOUMsS0FBVixFQUFpQnVDLElBQWpCLENBQXRCO0FBQ0FhLFlBQUFBLEtBQUssQ0FBQ0MsRUFBTixDQUFTLE9BQVQsRUFBa0IsQ0FBQ0MsSUFBRCxFQUFPQyxNQUFQLEtBQWtCO0FBQ2xDcEcsY0FBQUEsSUFBSSxDQUFDaEIsT0FBRCxFQUFXLFVBQVgsQ0FBSjs7QUFDQSxrQkFBR21ILElBQUksS0FBSyxDQUFaLEVBQWU7QUFBRWxCLGdCQUFBQSxPQUFPLENBQUMsQ0FBRCxDQUFQO0FBQVksZUFBN0IsTUFDSztBQUFFckUsZ0JBQUFBLFdBQVcsQ0FBQ29DLE1BQVosQ0FBbUJ2RCxJQUFuQixDQUF5QixJQUFJNEcsS0FBSixDQUFVRixJQUFWLENBQXpCO0FBQTRDbEIsZ0JBQUFBLE9BQU8sQ0FBQyxDQUFELENBQVA7QUFBWTtBQUNoRSxhQUpEO0FBS0FnQixZQUFBQSxLQUFLLENBQUNDLEVBQU4sQ0FBUyxPQUFULEVBQW1CSSxLQUFELElBQVc7QUFDM0J0RyxjQUFBQSxJQUFJLENBQUNoQixPQUFELEVBQVcsVUFBWCxDQUFKO0FBQ0E0QixjQUFBQSxXQUFXLENBQUNvQyxNQUFaLENBQW1CdkQsSUFBbkIsQ0FBd0I2RyxLQUF4QjtBQUNBckIsY0FBQUEsT0FBTyxDQUFDLENBQUQsQ0FBUDtBQUNELGFBSkQ7QUFLQWdCLFlBQUFBLEtBQUssQ0FBQ00sTUFBTixDQUFhTCxFQUFiLENBQWdCLE1BQWhCLEVBQXlCMUUsSUFBRCxJQUFVO0FBQ2hDLGtCQUFJZ0YsR0FBRyxHQUFHaEYsSUFBSSxDQUFDaUYsUUFBTCxHQUFnQmpDLE9BQWhCLENBQXdCLFdBQXhCLEVBQXFDLEdBQXJDLEVBQTBDa0MsSUFBMUMsRUFBVjtBQUNBMUcsY0FBQUEsSUFBSSxDQUFDaEIsT0FBRCxFQUFXLEdBQUV3SCxHQUFJLEVBQWpCLENBQUo7O0FBQ0Esa0JBQUloRixJQUFJLElBQUlBLElBQUksQ0FBQ2lGLFFBQUwsR0FBZ0J2RixLQUFoQixDQUFzQiwyQkFBdEIsQ0FBWixFQUFnRTtBQUM5RCtELGdCQUFBQSxPQUFPLENBQUMsQ0FBRCxDQUFQO0FBQ0QsZUFGRCxNQUdLO0FBQ0gsb0JBQUlZLFVBQVUsQ0FBQ2MsSUFBWCxDQUFnQixVQUFTQyxDQUFULEVBQVk7QUFBRSx5QkFBT3BGLElBQUksQ0FBQ3FGLE9BQUwsQ0FBYUQsQ0FBYixLQUFtQixDQUExQjtBQUE4QixpQkFBNUQsQ0FBSixFQUFtRTtBQUNqRUosa0JBQUFBLEdBQUcsR0FBR0EsR0FBRyxDQUFDaEMsT0FBSixDQUFZLE9BQVosRUFBcUIsRUFBckIsQ0FBTjtBQUNBZ0Msa0JBQUFBLEdBQUcsR0FBR0EsR0FBRyxDQUFDaEMsT0FBSixDQUFZLE9BQVosRUFBcUIsRUFBckIsQ0FBTjtBQUNBZ0Msa0JBQUFBLEdBQUcsR0FBR0EsR0FBRyxDQUFDaEMsT0FBSixDQUFZTCxPQUFPLENBQUNDLEdBQVIsRUFBWixFQUEyQixFQUEzQixFQUErQnNDLElBQS9CLEVBQU47O0FBQ0Esc0JBQUlGLEdBQUcsQ0FBQ00sUUFBSixDQUFhLE9BQWIsQ0FBSixFQUEyQjtBQUN6QmxHLG9CQUFBQSxXQUFXLENBQUNvQyxNQUFaLENBQW1CdkQsSUFBbkIsQ0FBd0JLLEdBQUcsR0FBRzBHLEdBQUcsQ0FBQ2hDLE9BQUosQ0FBWSxhQUFaLEVBQTJCLEVBQTNCLENBQTlCO0FBQ0FnQyxvQkFBQUEsR0FBRyxHQUFHQSxHQUFHLENBQUNoQyxPQUFKLENBQVksT0FBWixFQUFzQixHQUFFc0IsS0FBSyxDQUFDaUIsR0FBTixDQUFVLE9BQVYsQ0FBbUIsRUFBM0MsQ0FBTjtBQUNEOztBQUNEdEcsa0JBQUFBLEdBQUcsQ0FBRSxHQUFFWCxHQUFJLEdBQUUwRyxHQUFJLEVBQWQsQ0FBSDtBQUNEO0FBQ0Y7QUFDRixhQWxCRDtBQW1CQVAsWUFBQUEsS0FBSyxDQUFDZSxNQUFOLENBQWFkLEVBQWIsQ0FBZ0IsTUFBaEIsRUFBeUIxRSxJQUFELElBQVU7QUFDaEN4QixjQUFBQSxJQUFJLENBQUNoQixPQUFELEVBQVcsZ0JBQVgsQ0FBSjtBQUNBLGtCQUFJd0gsR0FBRyxHQUFHaEYsSUFBSSxDQUFDaUYsUUFBTCxHQUFnQmpDLE9BQWhCLENBQXdCLFdBQXhCLEVBQXFDLEdBQXJDLEVBQTBDa0MsSUFBMUMsRUFBVjtBQUNBLGtCQUFJTyxXQUFXLEdBQUcseUJBQWxCO0FBQ0Esa0JBQUlILFFBQVEsR0FBR04sR0FBRyxDQUFDTSxRQUFKLENBQWFHLFdBQWIsQ0FBZjs7QUFDQSxrQkFBSSxDQUFDSCxRQUFMLEVBQWU7QUFDYkksZ0JBQUFBLE9BQU8sQ0FBQ3pHLEdBQVIsQ0FBYSxHQUFFWCxHQUFJLElBQUdnRyxLQUFLLENBQUNpQixHQUFOLENBQVUsT0FBVixDQUFtQixJQUFHUCxHQUFJLEVBQWhEO0FBQ0Q7QUFDRixhQVJEO0FBU0QsV0EzQ0ssQ0FSRDs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRzs7OztBQXVEQSxTQUFTL0YsR0FBVCxDQUFhMEcsQ0FBYixFQUFnQjtBQUNyQi9ILEVBQUFBLE9BQU8sQ0FBQyxVQUFELENBQVAsQ0FBb0JnSSxRQUFwQixDQUE2QmpELE9BQU8sQ0FBQ29DLE1BQXJDLEVBQTZDLENBQTdDOztBQUNBcEMsRUFBQUEsT0FBTyxDQUFDb0MsTUFBUixDQUFlYyxTQUFmO0FBQ0FsRCxFQUFBQSxPQUFPLENBQUNvQyxNQUFSLENBQWVlLEtBQWYsQ0FBcUJILENBQXJCO0FBQ0FoRCxFQUFBQSxPQUFPLENBQUNvQyxNQUFSLENBQWVlLEtBQWYsQ0FBcUIsSUFBckI7QUFDRDs7QUFFTSxTQUFTdEgsSUFBVCxDQUFjaEIsT0FBZCxFQUF1Qm1JLENBQXZCLEVBQTBCO0FBQy9CLE1BQUluSSxPQUFPLENBQUN1SSxPQUFSLElBQW1CLEtBQXZCLEVBQThCO0FBQzVCbkksSUFBQUEsT0FBTyxDQUFDLFVBQUQsQ0FBUCxDQUFvQmdJLFFBQXBCLENBQTZCakQsT0FBTyxDQUFDb0MsTUFBckMsRUFBNkMsQ0FBN0M7O0FBQ0FwQyxJQUFBQSxPQUFPLENBQUNvQyxNQUFSLENBQWVjLFNBQWY7QUFDQWxELElBQUFBLE9BQU8sQ0FBQ29DLE1BQVIsQ0FBZWUsS0FBZixDQUFzQixhQUFZSCxDQUFFLEVBQXBDO0FBQ0FoRCxJQUFBQSxPQUFPLENBQUNvQyxNQUFSLENBQWVlLEtBQWYsQ0FBcUIsSUFBckI7QUFDRDtBQUNGOztBQUVNLFNBQVN2SCxPQUFULEdBQW1CO0FBQ3hCLE1BQUkrRixLQUFLLEdBQUcxRyxPQUFPLENBQUMsT0FBRCxDQUFuQjs7QUFDQSxNQUFJb0ksTUFBTSxHQUFJLEVBQWQ7O0FBQ0EsUUFBTUMsUUFBUSxHQUFHckksT0FBTyxDQUFDLElBQUQsQ0FBUCxDQUFjcUksUUFBZCxFQUFqQjs7QUFDQSxNQUFJQSxRQUFRLElBQUksUUFBaEIsRUFBMEI7QUFBRUQsSUFBQUEsTUFBTSxHQUFJLFVBQVY7QUFBcUIsR0FBakQsTUFDSztBQUFFQSxJQUFBQSxNQUFNLEdBQUksVUFBVjtBQUFxQjs7QUFDNUIsU0FBUSxHQUFFMUIsS0FBSyxDQUFDNEIsS0FBTixDQUFZRixNQUFaLENBQW9CLEdBQTlCO0FBQ0Q7O0FBRU0sU0FBUzlHLFlBQVQsQ0FBc0JaLEdBQXRCLEVBQTJCRCxVQUEzQixFQUF1QzhILGFBQXZDLEVBQXNEO0FBQzNELFFBQU1sRyxJQUFJLEdBQUdyQyxPQUFPLENBQUMsTUFBRCxDQUFwQjs7QUFDQSxRQUFNRCxFQUFFLEdBQUdDLE9BQU8sQ0FBQyxJQUFELENBQWxCOztBQUVBLE1BQUl3SCxDQUFDLEdBQUcsRUFBUjtBQUNBLE1BQUlnQixVQUFVLEdBQUduRyxJQUFJLENBQUN3RCxPQUFMLENBQWFkLE9BQU8sQ0FBQ0MsR0FBUixFQUFiLEVBQTJCLHNCQUEzQixFQUFtRHZFLFVBQW5ELENBQWpCO0FBQ0EsTUFBSWdJLFNBQVMsR0FBSTFJLEVBQUUsQ0FBQ2UsVUFBSCxDQUFjMEgsVUFBVSxHQUFDLGVBQXpCLEtBQTZDekgsSUFBSSxDQUFDQyxLQUFMLENBQVdqQixFQUFFLENBQUNrQixZQUFILENBQWdCdUgsVUFBVSxHQUFDLGVBQTNCLEVBQTRDLE9BQTVDLENBQVgsQ0FBN0MsSUFBaUgsRUFBbEk7QUFDQWhCLEVBQUFBLENBQUMsQ0FBQ2tCLGFBQUYsR0FBa0JELFNBQVMsQ0FBQ0UsT0FBNUI7QUFFQSxNQUFJQyxXQUFXLEdBQUd2RyxJQUFJLENBQUN3RCxPQUFMLENBQWFkLE9BQU8sQ0FBQ0MsR0FBUixFQUFiLEVBQTJCLHNCQUEzQixDQUFsQjtBQUNBLE1BQUk2RCxVQUFVLEdBQUk5SSxFQUFFLENBQUNlLFVBQUgsQ0FBYzhILFdBQVcsR0FBQyxlQUExQixLQUE4QzdILElBQUksQ0FBQ0MsS0FBTCxDQUFXakIsRUFBRSxDQUFDa0IsWUFBSCxDQUFnQjJILFdBQVcsR0FBQyxlQUE1QixFQUE2QyxPQUE3QyxDQUFYLENBQTlDLElBQW1ILEVBQXJJO0FBQ0FwQixFQUFBQSxDQUFDLENBQUNzQixjQUFGLEdBQW1CRCxVQUFVLENBQUNGLE9BQTlCO0FBRUEsTUFBSWpHLE9BQU8sR0FBR0wsSUFBSSxDQUFDd0QsT0FBTCxDQUFhZCxPQUFPLENBQUNDLEdBQVIsRUFBYixFQUEyQiwwQkFBM0IsQ0FBZDtBQUNBLE1BQUkrRCxNQUFNLEdBQUloSixFQUFFLENBQUNlLFVBQUgsQ0FBYzRCLE9BQU8sR0FBQyxlQUF0QixLQUEwQzNCLElBQUksQ0FBQ0MsS0FBTCxDQUFXakIsRUFBRSxDQUFDa0IsWUFBSCxDQUFnQnlCLE9BQU8sR0FBQyxlQUF4QixFQUF5QyxPQUF6QyxDQUFYLENBQTFDLElBQTJHLEVBQXpIO0FBQ0E4RSxFQUFBQSxDQUFDLENBQUN3QixVQUFGLEdBQWVELE1BQU0sQ0FBQ3JELE1BQVAsQ0FBY2lELE9BQTdCO0FBRUEsTUFBSU0sT0FBTyxHQUFHNUcsSUFBSSxDQUFDd0QsT0FBTCxDQUFhZCxPQUFPLENBQUNDLEdBQVIsRUFBYixFQUE0Qix3QkFBdUJ2RSxVQUFXLDJCQUE5RCxDQUFkO0FBQ0EsTUFBSXlJLE1BQU0sR0FBSW5KLEVBQUUsQ0FBQ2UsVUFBSCxDQUFjbUksT0FBTyxHQUFDLGVBQXRCLEtBQTBDbEksSUFBSSxDQUFDQyxLQUFMLENBQVdqQixFQUFFLENBQUNrQixZQUFILENBQWdCZ0ksT0FBTyxHQUFDLGVBQXhCLEVBQXlDLE9BQXpDLENBQVgsQ0FBMUMsSUFBMkcsRUFBekg7QUFDQXpCLEVBQUFBLENBQUMsQ0FBQzJCLFVBQUYsR0FBZUQsTUFBTSxDQUFDRSxZQUF0QjtBQUVBLE1BQUlDLGFBQWEsR0FBRyxFQUFwQjs7QUFDQyxNQUFJZCxhQUFhLElBQUlwSSxTQUFqQixJQUE4Qm9JLGFBQWEsSUFBSSxPQUFuRCxFQUE0RDtBQUMzRCxRQUFJZSxhQUFhLEdBQUcsRUFBcEI7O0FBQ0EsUUFBSWYsYUFBYSxJQUFJLE9BQXJCLEVBQThCO0FBQzVCZSxNQUFBQSxhQUFhLEdBQUdqSCxJQUFJLENBQUN3RCxPQUFMLENBQWFkLE9BQU8sQ0FBQ0MsR0FBUixFQUFiLEVBQTJCLG9CQUEzQixDQUFoQjtBQUNEOztBQUNELFFBQUl1RCxhQUFhLElBQUksU0FBckIsRUFBZ0M7QUFDOUJlLE1BQUFBLGFBQWEsR0FBR2pILElBQUksQ0FBQ3dELE9BQUwsQ0FBYWQsT0FBTyxDQUFDQyxHQUFSLEVBQWIsRUFBMkIsNEJBQTNCLENBQWhCO0FBQ0Q7O0FBQ0QsUUFBSXVFLFlBQVksR0FBSXhKLEVBQUUsQ0FBQ2UsVUFBSCxDQUFjd0ksYUFBYSxHQUFDLGVBQTVCLEtBQWdEdkksSUFBSSxDQUFDQyxLQUFMLENBQVdqQixFQUFFLENBQUNrQixZQUFILENBQWdCcUksYUFBYSxHQUFDLGVBQTlCLEVBQStDLE9BQS9DLENBQVgsQ0FBaEQsSUFBdUgsRUFBM0k7QUFDQTlCLElBQUFBLENBQUMsQ0FBQ2dDLGdCQUFGLEdBQXFCRCxZQUFZLENBQUNaLE9BQWxDO0FBQ0FVLElBQUFBLGFBQWEsR0FBRyxPQUFPZCxhQUFQLEdBQXVCLElBQXZCLEdBQThCZixDQUFDLENBQUNnQyxnQkFBaEQ7QUFDRDs7QUFFRCxTQUFPOUksR0FBRyxHQUFHLHNCQUFOLEdBQStCOEcsQ0FBQyxDQUFDa0IsYUFBakMsR0FBaUQsWUFBakQsR0FBZ0VsQixDQUFDLENBQUN3QixVQUFsRSxHQUErRSxnQkFBL0UsR0FBa0d4QixDQUFDLENBQUMyQixVQUFwRyxHQUFpSCxhQUFqSCxHQUFpSTNCLENBQUMsQ0FBQ3NCLGNBQW5JLEdBQW9KTyxhQUEzSjtBQUNEIiwic291cmNlc0NvbnRlbnQiOlsiLy8qKioqKioqKioqXG5leHBvcnQgZnVuY3Rpb24gX2NvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgdmFyIHRoaXNWYXJzID0ge31cbiAgdmFyIHRoaXNPcHRpb25zID0ge31cbiAgY29uc3QgZnMgPSByZXF1aXJlKCdmcycpXG4gIGNvbnN0IHZhbGlkYXRlT3B0aW9ucyA9IHJlcXVpcmUoJ3NjaGVtYS11dGlscycpXG4gIHZhbGlkYXRlT3B0aW9ucyhyZXF1aXJlKCcuLi9vcHRpb25zLmpzb24nKSwgb3B0aW9ucywgJycpXG4gIGlmIChvcHRpb25zLmZyYW1ld29yayA9PSB1bmRlZmluZWQpIHtcbiAgICB0aGlzVmFycy5wbHVnaW5FcnJvcnMgPSBbXVxuICAgIHRoaXNWYXJzLnBsdWdpbkVycm9ycy5wdXNoKCd3ZWJwYWNrIGNvbmZpZzogZnJhbWV3b3JrIHBhcmFtZXRlciBvbiBleHQtd2VicGFjay1wbHVnaW4gaXMgbm90IGRlZmluZWQgLSB2YWx1ZXM6IHJlYWN0LCBhbmd1bGFyLCBleHRqcycpXG4gICAgdmFyIHBsdWdpbiA9IHt9XG4gICAgcGx1Z2luLnZhcnMgPSB0aGlzVmFyc1xuICAgIHJldHVybiBwbHVnaW5cbiAgfVxuICB0aGlzVmFycyA9IHJlcXVpcmUoYC4vJHtvcHRpb25zLmZyYW1ld29ya31VdGlsYCkuZ2V0RGVmYXVsdFZhcnMoKVxuICB0aGlzVmFycy5mcmFtZXdvcmsgPSBvcHRpb25zLmZyYW1ld29ya1xuICBzd2l0Y2godGhpc1ZhcnMuZnJhbWV3b3JrKSB7XG4gICAgY2FzZSAnZXh0anMnOlxuICAgICAgdGhpc1ZhcnMucGx1Z2luTmFtZSA9ICdleHQtd2VicGFjay1wbHVnaW4nXG4gICAgICBicmVhaztcbiAgICBjYXNlICdyZWFjdCc6XG4gICAgICB0aGlzVmFycy5wbHVnaW5OYW1lID0gJ2V4dC1yZWFjdC13ZWJwYWNrLXBsdWdpbidcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ2FuZ3VsYXInOlxuICAgICAgdGhpc1ZhcnMucGx1Z2luTmFtZSA9ICdleHQtYW5ndWxhci13ZWJwYWNrLXBsdWdpbidcbiAgICAgIGJyZWFrO1xuICAgIGRlZmF1bHQ6XG4gICAgICB0aGlzVmFycy5wbHVnaW5OYW1lID0gJ2V4dC13ZWJwYWNrLXBsdWdpbidcbiAgfVxuICB0aGlzVmFycy5hcHAgPSByZXF1aXJlKCcuL3BsdWdpblV0aWwnKS5fZ2V0QXBwKClcbiAgbG9ndihvcHRpb25zLCBgcGx1Z2luTmFtZSAtICR7dGhpc1ZhcnMucGx1Z2luTmFtZX1gKVxuICBsb2d2KG9wdGlvbnMsIGB0aGlzVmFycy5hcHAgLSAke3RoaXNWYXJzLmFwcH1gKVxuICBjb25zdCByYyA9IChmcy5leGlzdHNTeW5jKGAuZXh0LSR7dGhpc1ZhcnMuZnJhbWV3b3JrfXJjYCkgJiYgSlNPTi5wYXJzZShmcy5yZWFkRmlsZVN5bmMoYC5leHQtJHt0aGlzVmFycy5mcmFtZXdvcmt9cmNgLCAndXRmLTgnKSkgfHwge30pXG4gIHRoaXNPcHRpb25zID0geyAuLi5yZXF1aXJlKGAuLyR7dGhpc1ZhcnMuZnJhbWV3b3JrfVV0aWxgKS5nZXREZWZhdWx0T3B0aW9ucygpLCAuLi5vcHRpb25zLCAuLi5yYyB9XG4gIGlmICh0aGlzT3B0aW9ucy5lbnZpcm9ubWVudCA9PSAncHJvZHVjdGlvbicpIFxuICAgIHt0aGlzVmFycy5wcm9kdWN0aW9uID0gdHJ1ZX1cbiAgZWxzZSBcbiAgICB7dGhpc1ZhcnMucHJvZHVjdGlvbiA9IGZhbHNlfVxuICBsb2cocmVxdWlyZSgnLi9wbHVnaW5VdGlsJykuX2dldFZlcnNpb25zKHRoaXNWYXJzLmFwcCwgdGhpc1ZhcnMucGx1Z2luTmFtZSwgdGhpc1ZhcnMuZnJhbWV3b3JrKSlcbiAgbG9nKHRoaXNWYXJzLmFwcCArICdCdWlsZGluZyBmb3IgJyArIHRoaXNPcHRpb25zLmVudmlyb25tZW50KVxuXG4gIHZhciBwbHVnaW4gPSB7fVxuICBwbHVnaW4udmFycyA9IHRoaXNWYXJzXG4gIHBsdWdpbi5vcHRpb25zID0gdGhpc09wdGlvbnNcbiAgcmV0dXJuIHBsdWdpblxufVxuXG4vLyoqKioqKioqKipcbmV4cG9ydCBmdW5jdGlvbiBfY29tcGlsYXRpb24oY29tcGlsYXRpb24sIHZhcnMsIG9wdGlvbnMpIHtcbiAgaWYgKHZhcnMucHJvZHVjdGlvbikge1xuICAgIGxvZ3Yob3B0aW9ucyxgZXh0LWNvbXBpbGF0aW9uLXByb2R1Y3Rpb25gKVxuICAgIGNvbXBpbGF0aW9uLmhvb2tzLnN1Y2NlZWRNb2R1bGUudGFwKGBleHQtc3VjY2VlZC1tb2R1bGVgLCAobW9kdWxlKSA9PiB7XG4gICAgICBpZiAobW9kdWxlLnJlc291cmNlICYmIG1vZHVsZS5yZXNvdXJjZS5tYXRjaCgvXFwuKGp8dClzeD8kLykgJiYgIW1vZHVsZS5yZXNvdXJjZS5tYXRjaCgvbm9kZV9tb2R1bGVzLykgJiYgIW1vZHVsZS5yZXNvdXJjZS5tYXRjaCgnL2V4dC1yZWFjdC9kaXN0LycpKSB7XG4gICAgICAgIHZhcnMuZGVwcyA9IFsgXG4gICAgICAgICAgLi4uKHZhcnMuZGVwcyB8fCBbXSksIFxuICAgICAgICAgIC4uLnJlcXVpcmUoYC4vJHt2YXJzLmZyYW1ld29ya31VdGlsYCkuZXh0cmFjdEZyb21Tb3VyY2UobW9kdWxlLl9zb3VyY2UuX3ZhbHVlKSBcbiAgICAgICAgXVxuICAgICAgfVxuICAgIH0pXG4gIH1cbiAgZWxzZSB7XG4gICAgbG9ndihvcHRpb25zLCBgZXh0LWNvbXBpbGF0aW9uYClcbiAgfVxuICAvL2lmICh2YXJzLnBsdWdpbkVycm9ycy5sZW5ndGggPT0gMCkge1xuICAgIGNvbXBpbGF0aW9uLmhvb2tzLmh0bWxXZWJwYWNrUGx1Z2luQmVmb3JlSHRtbEdlbmVyYXRpb24udGFwKGBleHQtaHRtbC1nZW5lcmF0aW9uYCwoZGF0YSkgPT4ge1xuICAgICAgbG9ndihvcHRpb25zLCdGVU5DVElPTiBleHQtaHRtbC1nZW5lcmF0aW9uJylcbiAgICAgIGNvbnN0IHBhdGggPSByZXF1aXJlKCdwYXRoJylcbiAgICAgIHZhciBwdWJsaWNQYXRoID0gJydcbiAgICAgIGlmIChjb21waWxhdGlvbi5vdXRwdXRPcHRpb25zLnB1YmxpY1BhdGggIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHB1YmxpY1BhdGggPSBjb21waWxhdGlvbi5vdXRwdXRPcHRpb25zLnB1YmxpY1BhdGhcbiAgICAgIH1cbiAgICAgIHZhciBqc1BhdGggPSBwYXRoLmpvaW4ocHVibGljUGF0aCx2YXJzLmV4dFBhdGggKyAnL2V4dC5qcycpXG4gICAgICB2YXIgY3NzUGF0aCA9IHBhdGguam9pbihwdWJsaWNQYXRoLHZhcnMuZXh0UGF0aCArICcvZXh0LmNzcycpXG4gICAgICBkYXRhLmFzc2V0cy5qcy51bnNoaWZ0KGpzUGF0aClcbiAgICAgIGRhdGEuYXNzZXRzLmNzcy51bnNoaWZ0KGNzc1BhdGgpXG4gICAgICBsb2codmFycy5hcHAgKyBgQWRkaW5nICR7anNQYXRofSBhbmQgJHtjc3NQYXRofSB0byBpbmRleC5odG1sYClcbiAgICB9KVxuICAvL31cbn1cblxuLy8qKioqKioqKioqXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZW1pdChjb21waWxlciwgY29tcGlsYXRpb24sIHZhcnMsIG9wdGlvbnMsIGNhbGxiYWNrKSB7XG4gIHZhciBhcHAgPSB2YXJzLmFwcFxuICB2YXIgZnJhbWV3b3JrID0gdmFycy5mcmFtZXdvcmtcbiAgY29uc3QgbG9nID0gcmVxdWlyZSgnLi9wbHVnaW5VdGlsJykubG9nXG4gIGNvbnN0IGxvZ3YgPSByZXF1aXJlKCcuL3BsdWdpblV0aWwnKS5sb2d2XG4gIGxvZ3Yob3B0aW9ucywnRlVOQ1RJT04gZXh0LWVtaXQnKVxuICBjb25zdCBwYXRoID0gcmVxdWlyZSgncGF0aCcpXG4gIGNvbnN0IF9idWlsZEV4dEJ1bmRsZSA9IHJlcXVpcmUoJy4vcGx1Z2luVXRpbCcpLl9idWlsZEV4dEJ1bmRsZVxuICBsZXQgb3V0cHV0UGF0aCA9IHBhdGguam9pbihjb21waWxlci5vdXRwdXRQYXRoLHZhcnMuZXh0UGF0aClcbiAgaWYgKGNvbXBpbGVyLm91dHB1dFBhdGggPT09ICcvJyAmJiBjb21waWxlci5vcHRpb25zLmRldlNlcnZlcikge1xuICAgIG91dHB1dFBhdGggPSBwYXRoLmpvaW4oY29tcGlsZXIub3B0aW9ucy5kZXZTZXJ2ZXIuY29udGVudEJhc2UsIG91dHB1dFBhdGgpXG4gIH1cbiAgbG9ndihvcHRpb25zLCdvdXRwdXRQYXRoOiAnICsgb3V0cHV0UGF0aClcbiAgbG9ndihvcHRpb25zLCdmcmFtZXdvcms6ICcgKyBmcmFtZXdvcmspXG4gIGlmIChmcmFtZXdvcmsgIT0gJ2V4dGpzJykge1xuICAgIF9wcmVwYXJlRm9yQnVpbGQoYXBwLCB2YXJzLCBvcHRpb25zLCBvdXRwdXRQYXRoKVxuICB9XG4gIGVsc2Uge1xuICAgIHJlcXVpcmUoYC4vJHtmcmFtZXdvcmt9VXRpbGApLl9wcmVwYXJlRm9yQnVpbGQoYXBwLCB2YXJzLCBvcHRpb25zLCBvdXRwdXRQYXRoLCBjb21waWxhdGlvbilcbiAgfVxuICBpZiAodmFycy5yZWJ1aWxkID09IHRydWUpIHtcbiAgICB2YXIgcGFybXMgPSBbXVxuICAgIGlmIChvcHRpb25zLnByb2ZpbGUgPT0gdW5kZWZpbmVkIHx8IG9wdGlvbnMucHJvZmlsZSA9PSAnJyB8fCBvcHRpb25zLnByb2ZpbGUgPT0gbnVsbCkge1xuICAgICAgcGFybXMgPSBbJ2FwcCcsICdidWlsZCcsIG9wdGlvbnMuZW52aXJvbm1lbnRdXG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgcGFybXMgPSBbJ2FwcCcsICdidWlsZCcsIG9wdGlvbnMucHJvZmlsZSwgb3B0aW9ucy5lbnZpcm9ubWVudF1cbiAgICB9XG4gICAgYXdhaXQgX2J1aWxkRXh0QnVuZGxlKGFwcCwgY29tcGlsYXRpb24sIG91dHB1dFBhdGgsIHBhcm1zLCBvcHRpb25zKVxuICAgIGlmICh2YXJzLmJyb3dzZXJDb3VudCA9PSAwICYmIGNvbXBpbGF0aW9uLmVycm9ycy5sZW5ndGggPT0gMCkge1xuICAgICAgdmFyIHVybCA9ICdodHRwOi8vbG9jYWxob3N0OicgKyBvcHRpb25zLnBvcnRcbiAgICAgIGxvZyhhcHAgKyBgT3BlbmluZyBicm93c2VyIGF0ICR7dXJsfWApXG4gICAgICB2YXJzLmJyb3dzZXJDb3VudCsrXG4gICAgICBjb25zdCBvcG4gPSByZXF1aXJlKCdvcG4nKVxuICAgICAgb3BuKHVybClcbiAgICB9XG4gICAgY2FsbGJhY2soKVxuICB9XG4gIGVsc2Uge1xuICAgIGNhbGxiYWNrKClcbiAgfVxufVxuXG4vLyoqKioqKioqKipcbmV4cG9ydCBmdW5jdGlvbiBfcHJlcGFyZUZvckJ1aWxkKGFwcCwgdmFycywgb3B0aW9ucywgb3V0cHV0KSB7XG4gIGxvZ3Yob3B0aW9ucywnX3ByZXBhcmVGb3JCdWlsZCcpXG4gIGNvbnN0IHJpbXJhZiA9IHJlcXVpcmUoJ3JpbXJhZicpXG4gIGNvbnN0IG1rZGlycCA9IHJlcXVpcmUoJ21rZGlycCcpXG4gIGNvbnN0IGZzeCA9IHJlcXVpcmUoJ2ZzLWV4dHJhJylcbiAgY29uc3QgZnMgPSByZXF1aXJlKCdmcycpXG4gIGNvbnN0IHBhdGggPSByZXF1aXJlKCdwYXRoJylcblxuICB2YXIgcGFja2FnZXMgPSBvcHRpb25zLnBhY2thZ2VzXG4gIHZhciB0b29sa2l0ID0gb3B0aW9ucy50b29sa2l0XG4gIHZhciB0aGVtZSA9IG9wdGlvbnMudGhlbWVcblxuICB0aGVtZSA9IHRoZW1lIHx8ICh0b29sa2l0ID09PSAnY2xhc3NpYycgPyAndGhlbWUtdHJpdG9uJyA6ICd0aGVtZS1tYXRlcmlhbCcpXG4gIGxvZ3Yob3B0aW9ucyx2YXJzLmZpcnN0VGltZSlcbiAgaWYgKHZhcnMuZmlyc3RUaW1lKSB7XG4gICAgbG9ndihvcHRpb25zLG91dHB1dClcbiAgICByaW1yYWYuc3luYyhvdXRwdXQpXG4gICAgbWtkaXJwLnN5bmMob3V0cHV0KVxuICAgIGxvZ3Yob3B0aW9ucyxyZXF1aXJlKCcuL2FydGlmYWN0cycpKVxuICAgIGNvbnN0IGJ1aWxkWE1MID0gcmVxdWlyZSgnLi9hcnRpZmFjdHMnKS5idWlsZFhNTFxuICAgIGNvbnN0IGNyZWF0ZUFwcEpzb24gPSByZXF1aXJlKCcuL2FydGlmYWN0cycpLmNyZWF0ZUFwcEpzb25cbiAgICBjb25zdCBjcmVhdGVXb3Jrc3BhY2VKc29uID0gcmVxdWlyZSgnLi9hcnRpZmFjdHMnKS5jcmVhdGVXb3Jrc3BhY2VKc29uXG4gICAgY29uc3QgY3JlYXRlSlNET01FbnZpcm9ubWVudCA9IHJlcXVpcmUoJy4vYXJ0aWZhY3RzJykuY3JlYXRlSlNET01FbnZpcm9ubWVudFxuXG4gICAgZnMud3JpdGVGaWxlU3luYyhwYXRoLmpvaW4ob3V0cHV0LCAnYnVpbGQueG1sJyksIGJ1aWxkWE1MKHZhcnMucHJvZHVjdGlvbiwgb3B0aW9ucyksICd1dGY4JylcbiAgICBmcy53cml0ZUZpbGVTeW5jKHBhdGguam9pbihvdXRwdXQsICdhcHAuanNvbicpLCBjcmVhdGVBcHBKc29uKHRoZW1lLCBwYWNrYWdlcywgdG9vbGtpdCwgb3B0aW9ucyksICd1dGY4JylcbiAgICBmcy53cml0ZUZpbGVTeW5jKHBhdGguam9pbihvdXRwdXQsICdqc2RvbS1lbnZpcm9ubWVudC5qcycpLCBjcmVhdGVKU0RPTUVudmlyb25tZW50KG9wdGlvbnMpLCAndXRmOCcpXG4gICAgZnMud3JpdGVGaWxlU3luYyhwYXRoLmpvaW4ob3V0cHV0LCAnd29ya3NwYWNlLmpzb24nKSwgY3JlYXRlV29ya3NwYWNlSnNvbihvcHRpb25zKSwgJ3V0ZjgnKVxuXG4gICAgaWYgKGZzLmV4aXN0c1N5bmMocGF0aC5qb2luKHByb2Nlc3MuY3dkKCksICdyZXNvdXJjZXMvJykpKSB7XG4gICAgICB2YXIgZnJvbVJlc291cmNlcyA9IHBhdGguam9pbihwcm9jZXNzLmN3ZCgpLCAncmVzb3VyY2VzLycpXG4gICAgICB2YXIgdG9SZXNvdXJjZXMgPSBwYXRoLmpvaW4ob3V0cHV0LCAnLi4vcmVzb3VyY2VzJylcbiAgICAgIGZzeC5jb3B5U3luYyhmcm9tUmVzb3VyY2VzLCB0b1Jlc291cmNlcylcbiAgICAgIGxvZyhhcHAgKyAnQ29weWluZyAnICsgZnJvbVJlc291cmNlcy5yZXBsYWNlKHByb2Nlc3MuY3dkKCksICcnKSArICcgdG86ICcgKyB0b1Jlc291cmNlcy5yZXBsYWNlKHByb2Nlc3MuY3dkKCksICcnKSlcbiAgICB9XG5cbiAgICBpZiAoZnMuZXhpc3RzU3luYyhwYXRoLmpvaW4ocHJvY2Vzcy5jd2QoKSwncmVzb3VyY2VzLycpKSkge1xuICAgICAgdmFyIGZyb21SZXNvdXJjZXMgPSBwYXRoLmpvaW4ocHJvY2Vzcy5jd2QoKSwgJ3Jlc291cmNlcy8nKVxuICAgICAgdmFyIHRvUmVzb3VyY2VzID0gcGF0aC5qb2luKG91dHB1dCwgJ3Jlc291cmNlcycpXG4gICAgICBmc3guY29weVN5bmMoZnJvbVJlc291cmNlcywgdG9SZXNvdXJjZXMpXG4gICAgICBsb2coYXBwICsgJ0NvcHlpbmcgJyArIGZyb21SZXNvdXJjZXMucmVwbGFjZShwcm9jZXNzLmN3ZCgpLCAnJykgKyAnIHRvOiAnICsgdG9SZXNvdXJjZXMucmVwbGFjZShwcm9jZXNzLmN3ZCgpLCAnJykpXG4gICAgfVxuXG4gICAgaWYgKGZzLmV4aXN0c1N5bmMocGF0aC5qb2luKHByb2Nlc3MuY3dkKCksdmFycy5leHRQYXRoICsgJy9wYWNrYWdlcy8nKSkpIHtcbiAgICAgIHZhciBmcm9tUGFja2FnZXMgPSBwYXRoLmpvaW4ocHJvY2Vzcy5jd2QoKSx2YXJzLmV4dFBhdGggKyAnL3BhY2thZ2VzLycpXG4gICAgICB2YXIgdG9QYWNrYWdlcyA9IHBhdGguam9pbihvdXRwdXQsICdwYWNrYWdlcy8nKVxuICAgICAgZnN4LmNvcHlTeW5jKGZyb21QYWNrYWdlcywgdG9QYWNrYWdlcylcbiAgICAgIGxvZyhhcHAgKyAnQ29weWluZyAnICsgZnJvbVBhY2thZ2VzLnJlcGxhY2UocHJvY2Vzcy5jd2QoKSwgJycpICsgJyB0bzogJyArIHRvUGFja2FnZXMucmVwbGFjZShwcm9jZXNzLmN3ZCgpLCAnJykpXG4gICAgfVxuXG4gICAgaWYgKGZzLmV4aXN0c1N5bmMocGF0aC5qb2luKHByb2Nlc3MuY3dkKCksdmFycy5leHRQYXRoICsgJy9vdmVycmlkZXMvJykpKSB7XG4gICAgICB2YXIgZnJvbU92ZXJyaWRlcyA9IHBhdGguam9pbihwcm9jZXNzLmN3ZCgpLHZhcnMuZXh0UGF0aCArICcvb3ZlcnJpZGVzLycpXG4gICAgICB2YXIgdG9PdmVycmlkZXMgPSBwYXRoLmpvaW4ob3V0cHV0LCAnb3ZlcnJpZGVzLycpXG4gICAgICBmc3guY29weVN5bmMoZnJvbU92ZXJyaWRlcywgdG9PdmVycmlkZXMpXG4gICAgICBsb2coYXBwICsgJ0NvcHlpbmcgJyArIGZyb21PdmVycmlkZXMucmVwbGFjZShwcm9jZXNzLmN3ZCgpLCAnJykgKyAnIHRvOiAnICsgdG9PdmVycmlkZXMucmVwbGFjZShwcm9jZXNzLmN3ZCgpLCAnJykpXG4gICAgfVxuICB9XG4gIHZhcnMuZmlyc3RUaW1lID0gZmFsc2VcbiAgbGV0IGpzXG4gIGlmICh2YXJzLnByb2R1Y3Rpb24pIHtcbiAgICB2YXJzLmRlcHMucHVzaCgnRXh0LnJlcXVpcmUoXCJFeHQubGF5b3V0LipcIik7XFxuJylcbiAgICBqcyA9IHZhcnMuZGVwcy5qb2luKCc7XFxuJyk7XG4gIH1cbiAgZWxzZSB7XG4gICAganMgPSAnRXh0LnJlcXVpcmUoXCJFeHQuKlwiKSdcbiAgfVxuICBpZiAodmFycy5tYW5pZmVzdCA9PT0gbnVsbCB8fCBqcyAhPT0gdmFycy5tYW5pZmVzdCkge1xuICAgIHZhcnMubWFuaWZlc3QgPSBqc1xuICAgIGNvbnN0IG1hbmlmZXN0ID0gcGF0aC5qb2luKG91dHB1dCwgJ21hbmlmZXN0LmpzJylcbiAgICBmcy53cml0ZUZpbGVTeW5jKG1hbmlmZXN0LCBqcywgJ3V0ZjgnKVxuICAgIHZhcnMucmVidWlsZCA9IHRydWVcbiAgICBsb2coYXBwICsgJ0J1aWxkaW5nIEV4dCBidW5kbGUgYXQ6ICcgKyBvdXRwdXQucmVwbGFjZShwcm9jZXNzLmN3ZCgpLCAnJykpXG4gIH1cbiAgZWxzZSB7XG4gICAgdmFycy5yZWJ1aWxkID0gZmFsc2VcbiAgICBsb2coYXBwICsgJ0V4dFJlYWN0IHJlYnVpbGQgTk9UIG5lZWRlZCcpXG4gIH1cbn1cblxuLy8qKioqKioqKioqXG5leHBvcnQgZnVuY3Rpb24gX2J1aWxkRXh0QnVuZGxlKGFwcCwgY29tcGlsYXRpb24sIG91dHB1dFBhdGgsIHBhcm1zLCBvcHRpb25zKSB7XG4gIGNvbnN0IGZzID0gcmVxdWlyZSgnZnMnKVxuICBjb25zdCBsb2d2ID0gcmVxdWlyZSgnLi9wbHVnaW5VdGlsJykubG9ndlxuICBsb2d2KG9wdGlvbnMsJ0ZVTkNUSU9OIF9idWlsZEV4dEJ1bmRsZScpXG5cbiAgbGV0IHNlbmNoYTsgdHJ5IHsgc2VuY2hhID0gcmVxdWlyZSgnQHNlbmNoYS9jbWQnKSB9IGNhdGNoIChlKSB7IHNlbmNoYSA9ICdzZW5jaGEnIH1cbiAgaWYgKGZzLmV4aXN0c1N5bmMoc2VuY2hhKSkge1xuICAgIGxvZ3Yob3B0aW9ucywnc2VuY2hhIGZvbGRlciBleGlzdHMnKVxuICB9XG4gIGVsc2Uge1xuICAgIGxvZ3Yob3B0aW9ucywnc2VuY2hhIGZvbGRlciBET0VTIE5PVCBleGlzdCcpXG4gIH1cblxuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgY29uc3Qgb25CdWlsZERvbmUgPSAoKSA9PiB7XG4gICAgbG9ndihvcHRpb25zLCdvbkJ1aWxkRG9uZScpXG4gICAgcmVzb2x2ZSgpXG4gICB9XG5cbiAgIHZhciBvcHRzID0geyBjd2Q6IG91dHB1dFBhdGgsIHNpbGVudDogdHJ1ZSwgc3RkaW86ICdwaXBlJywgZW5jb2Rpbmc6ICd1dGYtOCd9XG4gICBleGVjdXRlQXN5bmMoYXBwLCBzZW5jaGEsIHBhcm1zLCBvcHRzLCBjb21waWxhdGlvbiwgb3B0aW9ucykudGhlbiAoXG4gICAgIGZ1bmN0aW9uKCkgeyBvbkJ1aWxkRG9uZSgpIH0sIFxuICAgICBmdW5jdGlvbihyZWFzb24pIHsgcmVqZWN0KHJlYXNvbikgfVxuICAgKVxuIH0pXG59XG5cbi8vKioqKioqKioqKlxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGV4ZWN1dGVBc3luYyAoYXBwLCBjb21tYW5kLCBwYXJtcywgb3B0cywgY29tcGlsYXRpb24sIG9wdGlvbnMpIHtcbiAgLy9jb25zdCBERUZBVUxUX1NVQlNUUlMgPSBbJ1tJTkZdIExvYWRpbmcnLCAnW0lORl0gUHJvY2Vzc2luZycsICdbTE9HXSBGYXNoaW9uIGJ1aWxkIGNvbXBsZXRlJywgJ1tFUlJdJywgJ1tXUk5dJywgXCJbSU5GXSBTZXJ2ZXJcIiwgXCJbSU5GXSBXcml0aW5nXCIsIFwiW0lORl0gTG9hZGluZyBCdWlsZFwiLCBcIltJTkZdIFdhaXRpbmdcIiwgXCJbTE9HXSBGYXNoaW9uIHdhaXRpbmdcIl07XG4gIGNvbnN0IERFRkFVTFRfU1VCU1RSUyA9IFsnW0lORl0gTG9hZGluZycsICdbSU5GXSBBcHBlbmQnLCAnW0lORl0gUHJvY2Vzc2luZycsICdbSU5GXSBQcm9jZXNzaW5nIEJ1aWxkJywgJ1tMT0ddIEZhc2hpb24gYnVpbGQgY29tcGxldGUnLCAnW0VSUl0nLCAnW1dSTl0nLCBcIltJTkZdIFNlcnZlclwiLCBcIltJTkZdIFdyaXRpbmdcIiwgXCJbSU5GXSBMb2FkaW5nIEJ1aWxkXCIsIFwiW0lORl0gV2FpdGluZ1wiLCBcIltMT0ddIEZhc2hpb24gd2FpdGluZ1wiXTtcbiAgdmFyIHN1YnN0cmluZ3MgPSBERUZBVUxUX1NVQlNUUlMgXG4gIHZhciBjaGFsayA9IHJlcXVpcmUoJ2NoYWxrJylcbiAgY29uc3QgY3Jvc3NTcGF3biA9IHJlcXVpcmUoJ2Nyb3NzLXNwYXduJylcbiAgY29uc3QgbG9nID0gcmVxdWlyZSgnLi9wbHVnaW5VdGlsJykubG9nXG4gIGxvZ3Yob3B0aW9ucywgJ0ZVTkNUSU9OIGV4ZWN1dGVBc3luYycpXG4gIGF3YWl0IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBsb2d2KG9wdGlvbnMsYGNvbW1hbmQgLSAke2NvbW1hbmR9YClcbiAgICBsb2d2KG9wdGlvbnMsIGBwYXJtcyAtICR7cGFybXN9YClcbiAgICBsb2d2KG9wdGlvbnMsIGBvcHRzIC0gJHtKU09OLnN0cmluZ2lmeShvcHRzKX1gKVxuICAgIGxldCBjaGlsZCA9IGNyb3NzU3Bhd24oY29tbWFuZCwgcGFybXMsIG9wdHMpXG4gICAgY2hpbGQub24oJ2Nsb3NlJywgKGNvZGUsIHNpZ25hbCkgPT4ge1xuICAgICAgbG9ndihvcHRpb25zLCBgb24gY2xvc2VgKSBcbiAgICAgIGlmKGNvZGUgPT09IDApIHsgcmVzb2x2ZSgwKSB9XG4gICAgICBlbHNlIHsgY29tcGlsYXRpb24uZXJyb3JzLnB1c2goIG5ldyBFcnJvcihjb2RlKSApOyByZXNvbHZlKDApIH1cbiAgICB9KVxuICAgIGNoaWxkLm9uKCdlcnJvcicsIChlcnJvcikgPT4geyBcbiAgICAgIGxvZ3Yob3B0aW9ucywgYG9uIGVycm9yYCkgXG4gICAgICBjb21waWxhdGlvbi5lcnJvcnMucHVzaChlcnJvcilcbiAgICAgIHJlc29sdmUoMClcbiAgICB9KVxuICAgIGNoaWxkLnN0ZG91dC5vbignZGF0YScsIChkYXRhKSA9PiB7XG4gICAgICB2YXIgc3RyID0gZGF0YS50b1N0cmluZygpLnJlcGxhY2UoL1xccj9cXG58XFxyL2csIFwiIFwiKS50cmltKClcbiAgICAgIGxvZ3Yob3B0aW9ucywgYCR7c3RyfWApXG4gICAgICBpZiAoZGF0YSAmJiBkYXRhLnRvU3RyaW5nKCkubWF0Y2goL1dhaXRpbmcgZm9yIGNoYW5nZXNcXC5cXC5cXC4vKSkge1xuICAgICAgICByZXNvbHZlKDApXG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgaWYgKHN1YnN0cmluZ3Muc29tZShmdW5jdGlvbih2KSB7IHJldHVybiBkYXRhLmluZGV4T2YodikgPj0gMDsgfSkpIHsgXG4gICAgICAgICAgc3RyID0gc3RyLnJlcGxhY2UoXCJbSU5GXVwiLCBcIlwiKVxuICAgICAgICAgIHN0ciA9IHN0ci5yZXBsYWNlKFwiW0xPR11cIiwgXCJcIilcbiAgICAgICAgICBzdHIgPSBzdHIucmVwbGFjZShwcm9jZXNzLmN3ZCgpLCAnJykudHJpbSgpXG4gICAgICAgICAgaWYgKHN0ci5pbmNsdWRlcyhcIltFUlJdXCIpKSB7XG4gICAgICAgICAgICBjb21waWxhdGlvbi5lcnJvcnMucHVzaChhcHAgKyBzdHIucmVwbGFjZSgvXlxcW0VSUlxcXSAvZ2ksICcnKSk7XG4gICAgICAgICAgICBzdHIgPSBzdHIucmVwbGFjZShcIltFUlJdXCIsIGAke2NoYWxrLnJlZChcIltFUlJdXCIpfWApXG4gICAgICAgICAgfVxuICAgICAgICAgIGxvZyhgJHthcHB9JHtzdHJ9YCkgXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KVxuICAgIGNoaWxkLnN0ZGVyci5vbignZGF0YScsIChkYXRhKSA9PiB7XG4gICAgICBsb2d2KG9wdGlvbnMsIGBlcnJvciBvbiBjbG9zZWApIFxuICAgICAgdmFyIHN0ciA9IGRhdGEudG9TdHJpbmcoKS5yZXBsYWNlKC9cXHI/XFxufFxcci9nLCBcIiBcIikudHJpbSgpXG4gICAgICB2YXIgc3RySmF2YU9wdHMgPSBcIlBpY2tlZCB1cCBfSkFWQV9PUFRJT05TXCI7XG4gICAgICB2YXIgaW5jbHVkZXMgPSBzdHIuaW5jbHVkZXMoc3RySmF2YU9wdHMpXG4gICAgICBpZiAoIWluY2x1ZGVzKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGAke2FwcH0gJHtjaGFsay5yZWQoXCJbRVJSXVwiKX0gJHtzdHJ9YClcbiAgICAgIH1cbiAgICB9KVxuICB9KVxufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBsb2cocykge1xuICByZXF1aXJlKCdyZWFkbGluZScpLmN1cnNvclRvKHByb2Nlc3Muc3Rkb3V0LCAwKVxuICBwcm9jZXNzLnN0ZG91dC5jbGVhckxpbmUoKVxuICBwcm9jZXNzLnN0ZG91dC53cml0ZShzKVxuICBwcm9jZXNzLnN0ZG91dC53cml0ZSgnXFxuJylcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGxvZ3Yob3B0aW9ucywgcykge1xuICBpZiAob3B0aW9ucy52ZXJib3NlID09ICd5ZXMnKSB7XG4gICAgcmVxdWlyZSgncmVhZGxpbmUnKS5jdXJzb3JUbyhwcm9jZXNzLnN0ZG91dCwgMClcbiAgICBwcm9jZXNzLnN0ZG91dC5jbGVhckxpbmUoKVxuICAgIHByb2Nlc3Muc3Rkb3V0LndyaXRlKGAtdmVyYm9zZTogJHtzfWApXG4gICAgcHJvY2Vzcy5zdGRvdXQud3JpdGUoJ1xcbicpXG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9nZXRBcHAoKSB7XG4gIHZhciBjaGFsayA9IHJlcXVpcmUoJ2NoYWxrJylcbiAgdmFyIHByZWZpeCA9IGBgXG4gIGNvbnN0IHBsYXRmb3JtID0gcmVxdWlyZSgnb3MnKS5wbGF0Zm9ybSgpXG4gIGlmIChwbGF0Zm9ybSA9PSAnZGFyd2luJykgeyBwcmVmaXggPSBg4oS5IO+9omV4dO+9ozpgIH1cbiAgZWxzZSB7IHByZWZpeCA9IGBpIFtleHRdOmAgfVxuICByZXR1cm4gYCR7Y2hhbGsuZ3JlZW4ocHJlZml4KX0gYFxufVxuXG5leHBvcnQgZnVuY3Rpb24gX2dldFZlcnNpb25zKGFwcCwgcGx1Z2luTmFtZSwgZnJhbWV3b3JrTmFtZSkge1xuICBjb25zdCBwYXRoID0gcmVxdWlyZSgncGF0aCcpXG4gIGNvbnN0IGZzID0gcmVxdWlyZSgnZnMnKVxuXG4gIHZhciB2ID0ge31cbiAgdmFyIHBsdWdpblBhdGggPSBwYXRoLnJlc29sdmUocHJvY2Vzcy5jd2QoKSwnbm9kZV9tb2R1bGVzL0BzZW5jaGEnLCBwbHVnaW5OYW1lKVxuICB2YXIgcGx1Z2luUGtnID0gKGZzLmV4aXN0c1N5bmMocGx1Z2luUGF0aCsnL3BhY2thZ2UuanNvbicpICYmIEpTT04ucGFyc2UoZnMucmVhZEZpbGVTeW5jKHBsdWdpblBhdGgrJy9wYWNrYWdlLmpzb24nLCAndXRmLTgnKSkgfHwge30pO1xuICB2LnBsdWdpblZlcnNpb24gPSBwbHVnaW5Qa2cudmVyc2lvblxuXG4gIHZhciB3ZWJwYWNrUGF0aCA9IHBhdGgucmVzb2x2ZShwcm9jZXNzLmN3ZCgpLCdub2RlX21vZHVsZXMvd2VicGFjaycpXG4gIHZhciB3ZWJwYWNrUGtnID0gKGZzLmV4aXN0c1N5bmMod2VicGFja1BhdGgrJy9wYWNrYWdlLmpzb24nKSAmJiBKU09OLnBhcnNlKGZzLnJlYWRGaWxlU3luYyh3ZWJwYWNrUGF0aCsnL3BhY2thZ2UuanNvbicsICd1dGYtOCcpKSB8fCB7fSk7XG4gIHYud2VicGFja1ZlcnNpb24gPSB3ZWJwYWNrUGtnLnZlcnNpb25cblxuICB2YXIgZXh0UGF0aCA9IHBhdGgucmVzb2x2ZShwcm9jZXNzLmN3ZCgpLCdub2RlX21vZHVsZXMvQHNlbmNoYS9leHQnKVxuICB2YXIgZXh0UGtnID0gKGZzLmV4aXN0c1N5bmMoZXh0UGF0aCsnL3BhY2thZ2UuanNvbicpICYmIEpTT04ucGFyc2UoZnMucmVhZEZpbGVTeW5jKGV4dFBhdGgrJy9wYWNrYWdlLmpzb24nLCAndXRmLTgnKSkgfHwge30pO1xuICB2LmV4dFZlcnNpb24gPSBleHRQa2cuc2VuY2hhLnZlcnNpb25cblxuICB2YXIgY21kUGF0aCA9IHBhdGgucmVzb2x2ZShwcm9jZXNzLmN3ZCgpLGBub2RlX21vZHVsZXMvQHNlbmNoYS8ke3BsdWdpbk5hbWV9L25vZGVfbW9kdWxlcy9Ac2VuY2hhL2NtZGApXG4gIHZhciBjbWRQa2cgPSAoZnMuZXhpc3RzU3luYyhjbWRQYXRoKycvcGFja2FnZS5qc29uJykgJiYgSlNPTi5wYXJzZShmcy5yZWFkRmlsZVN5bmMoY21kUGF0aCsnL3BhY2thZ2UuanNvbicsICd1dGYtOCcpKSB8fCB7fSk7XG4gIHYuY21kVmVyc2lvbiA9IGNtZFBrZy52ZXJzaW9uX2Z1bGxcblxuICB2YXIgZnJhbWV3b3JrSW5mbyA9ICcnXG4gICBpZiAoZnJhbWV3b3JrTmFtZSAhPSB1bmRlZmluZWQgJiYgZnJhbWV3b3JrTmFtZSAhPSAnZXh0anMnKSB7XG4gICAgdmFyIGZyYW1ld29ya1BhdGggPSAnJ1xuICAgIGlmIChmcmFtZXdvcmtOYW1lID09ICdyZWFjdCcpIHtcbiAgICAgIGZyYW1ld29ya1BhdGggPSBwYXRoLnJlc29sdmUocHJvY2Vzcy5jd2QoKSwnbm9kZV9tb2R1bGVzL3JlYWN0JylcbiAgICB9XG4gICAgaWYgKGZyYW1ld29ya05hbWUgPT0gJ2FuZ3VsYXInKSB7XG4gICAgICBmcmFtZXdvcmtQYXRoID0gcGF0aC5yZXNvbHZlKHByb2Nlc3MuY3dkKCksJ25vZGVfbW9kdWxlcy9AYW5ndWxhci9jb3JlJylcbiAgICB9XG4gICAgdmFyIGZyYW1ld29ya1BrZyA9IChmcy5leGlzdHNTeW5jKGZyYW1ld29ya1BhdGgrJy9wYWNrYWdlLmpzb24nKSAmJiBKU09OLnBhcnNlKGZzLnJlYWRGaWxlU3luYyhmcmFtZXdvcmtQYXRoKycvcGFja2FnZS5qc29uJywgJ3V0Zi04JykpIHx8IHt9KTtcbiAgICB2LmZyYW1ld29ya1ZlcnNpb24gPSBmcmFtZXdvcmtQa2cudmVyc2lvblxuICAgIGZyYW1ld29ya0luZm8gPSAnLCAnICsgZnJhbWV3b3JrTmFtZSArICcgdicgKyB2LmZyYW1ld29ya1ZlcnNpb25cbiAgfVxuXG4gIHJldHVybiBhcHAgKyAnZXh0LXdlYnBhY2stcGx1Z2luIHYnICsgdi5wbHVnaW5WZXJzaW9uICsgJywgRXh0IEpTIHYnICsgdi5leHRWZXJzaW9uICsgJywgU2VuY2hhIENtZCB2JyArIHYuY21kVmVyc2lvbiArICcsIHdlYnBhY2sgdicgKyB2LndlYnBhY2tWZXJzaW9uICsgZnJhbWV3b3JrSW5mb1xufSJdfQ==