"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.log = log;
exports.logv = logv;
exports._constructor = _constructor;
exports._getApp = _getApp;
exports._getVersions = _getVersions;
exports._compile = _compile;
exports.emit = emit;
exports._prepareForBuild = _prepareForBuild;
exports._buildExtBundle = _buildExtBundle;
exports.executeAsync = executeAsync;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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

function _constructor(options) {
  var framework = '';
  var thisVars = {};
  var thisOptions = {};
  var pluginName = '';

  const fs = require('fs');

  const validateOptions = require('schema-utils');

  validateOptions(require('../options.json'), options, '');

  if (options.framework == undefined) {
    thisVars.pluginErrors = [];
    thisVars.pluginErrors.push('webpack config: framework parameter on ext-webpack-plugin is not defined - values: react, angular, extjs');
    var data = {};
    data.plugin = {};
    data.plugin.vars = thisVars;
    console.log(data);
    return data;
  }

  if (options.framework == 'extjs') {
    framework = 'extjs';
    pluginName = `ext-webpack-plugin`;
  } else {
    framework = options.framework;
    pluginName = `ext-${framework}-webpack-plugin`;
  }

  thisVars = require(`./${framework}Util`).getDefaultVars();
  thisVars.framework = framework;
  thisVars.app = require('./pluginUtil')._getApp();
  logv(options, `pluginName - ${pluginName}`);
  logv(options, `thisVars.app - ${thisVars.app}`);
  const rc = fs.existsSync(`.ext-${thisVars.framework}rc`) && JSON.parse(fs.readFileSync(`.ext-${thisVars.framework}rc`, 'utf-8')) || {};
  thisOptions = _objectSpread({}, require(`./${thisVars.framework}Util`).getDefaultOptions(), options, rc);

  if (thisOptions.environment == 'production') {
    thisVars.production = true;
  } else {
    thisVars.production = false;
  }

  log(require('./pluginUtil')._getVersions(thisVars.app, pluginName, thisVars.framework));
  log(thisVars.app + 'Building for ' + thisOptions.environment);
  var data = {};
  data.plugin = {};
  data.plugin.app = thisVars.app;
  data.plugin.framework = thisVars.framework;
  data.plugin.vars = thisVars;
  data.plugin.options = thisOptions;
  return data;
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
  var cmdPath = path.resolve(pluginPath, 'node_modules/@sencha/cmd');
  var cmdPkg = fs.existsSync(cmdPath + '/package.json') && JSON.parse(fs.readFileSync(cmdPath + '/package.json', 'utf-8')) || {};
  v.cmdVersion = cmdPkg.version_full;
  var frameworkInfo = '';

  if (frameworkName != undefined && frameworkName != 'extjs') {
    var frameworkPath = path.resolve(process.cwd(), 'node_modules', frameworkName);
    var frameworkPkg = fs.existsSync(frameworkPath + '/package.json') && JSON.parse(fs.readFileSync(frameworkPath + '/package.json', 'utf-8')) || {};
    v.frameworkVersion = frameworkPkg.version;
    frameworkInfo = ', ' + frameworkName + ' v' + v.frameworkVersion;
  }

  return app + 'ext-webpack-plugin v' + v.pluginVersion + ', Ext JS v' + v.extVersion + ', Sencha Cmd v' + v.cmdVersion + ', webpack v' + v.webpackVersion + frameworkInfo;
}

function _compile(compilation, vars, options) {
  if (vars.pluginErrors.length > 0) {
    compilation.errors.push(new Error(vars.pluginErrors.join("")));
    return;
  }

  const log = require('./pluginUtil').log;

  const logv = require('./pluginUtil').logv;

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

  if (vars.pluginErrors.length == 0) {
    compilation.hooks.htmlWebpackPluginBeforeHtmlGeneration.tap(`ext-html-generation`, data => {
      //const logv = require('./pluginUtil').logv
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
    });
  }
}

function emit(_x, _x2, _x3, _x4, _x5) {
  return _emit.apply(this, arguments);
}

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
            require(`./pluginUtil`)._prepareForBuild(app, vars, options, outputPath);
          } else {
            require(`./${framework}Util`)._prepareForBuild(app, vars, options, outputPath, compilation);
          }

          if (!(vars.rebuild == true)) {
            _context.next = 20;
            break;
          }

          parms = ['app', 'build', options.profile, options.environment];
          _context.next = 16;
          return _buildExtBundle(app, compilation, outputPath, parms, options);

        case 16:
          if (vars.browserCount == 0 && compilation.errors.length == 0) {
            url = 'http://localhost:' + options.port;
            log(app + `Opening browser at ${url}`);
            vars.browserCount++;
            opn = require('opn');
            opn(url);
          }

          callback();
          _context.next = 21;
          break;

        case 20:
          callback();

        case 21:
        case "end":
          return _context.stop();
      }
    }, _callee, this);
  }));
  return _emit.apply(this, arguments);
}

function _prepareForBuild(app, vars, options, output) {
  const log = require('./pluginUtil').log;

  const rimraf = require('rimraf');

  const mkdirp = require('mkdirp');

  const fsx = require('fs-extra');

  const fs = require('fs');

  const path = require('path');

  var packages = options.packages;
  var toolkit = options.toolkit;
  var theme = options.theme;
  theme = theme || (toolkit === 'classic' ? 'theme-triton' : 'theme-material');

  if (vars.firstTime) {
    rimraf.sync(output);
    mkdirp.sync(output);

    const buildXML = require('./artifacts').buildXML;

    const createAppJson = require('./artifacts').createAppJson;

    const createWorkspaceJson = require('./artifacts').createWorkspaceJson;

    const createJSDOMEnvironment = require('./artifacts').createJSDOMEnvironment;

    fs.writeFileSync(path.join(output, 'build.xml'), buildXML({
      compress: vars.production
    }), 'utf8');
    fs.writeFileSync(path.join(output, 'jsdom-environment.js'), createJSDOMEnvironment(), 'utf8');
    fs.writeFileSync(path.join(output, 'app.json'), createAppJson(theme, packages, toolkit), 'utf8');
    fs.writeFileSync(path.join(output, 'workspace.json'), createWorkspaceJson(), 'utf8');

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
}

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
}

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
              logv(options, `on data`);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9wbHVnaW5VdGlsLmpzIl0sIm5hbWVzIjpbImxvZyIsInMiLCJyZXF1aXJlIiwiY3Vyc29yVG8iLCJwcm9jZXNzIiwic3Rkb3V0IiwiY2xlYXJMaW5lIiwid3JpdGUiLCJsb2d2Iiwib3B0aW9ucyIsInZlcmJvc2UiLCJfY29uc3RydWN0b3IiLCJmcmFtZXdvcmsiLCJ0aGlzVmFycyIsInRoaXNPcHRpb25zIiwicGx1Z2luTmFtZSIsImZzIiwidmFsaWRhdGVPcHRpb25zIiwidW5kZWZpbmVkIiwicGx1Z2luRXJyb3JzIiwicHVzaCIsImRhdGEiLCJwbHVnaW4iLCJ2YXJzIiwiY29uc29sZSIsImdldERlZmF1bHRWYXJzIiwiYXBwIiwiX2dldEFwcCIsInJjIiwiZXhpc3RzU3luYyIsIkpTT04iLCJwYXJzZSIsInJlYWRGaWxlU3luYyIsImdldERlZmF1bHRPcHRpb25zIiwiZW52aXJvbm1lbnQiLCJwcm9kdWN0aW9uIiwiX2dldFZlcnNpb25zIiwiY2hhbGsiLCJwcmVmaXgiLCJwbGF0Zm9ybSIsImdyZWVuIiwiZnJhbWV3b3JrTmFtZSIsInBhdGgiLCJ2IiwicGx1Z2luUGF0aCIsInJlc29sdmUiLCJjd2QiLCJwbHVnaW5Qa2ciLCJwbHVnaW5WZXJzaW9uIiwidmVyc2lvbiIsIndlYnBhY2tQYXRoIiwid2VicGFja1BrZyIsIndlYnBhY2tWZXJzaW9uIiwiZXh0UGF0aCIsImV4dFBrZyIsImV4dFZlcnNpb24iLCJzZW5jaGEiLCJjbWRQYXRoIiwiY21kUGtnIiwiY21kVmVyc2lvbiIsInZlcnNpb25fZnVsbCIsImZyYW1ld29ya0luZm8iLCJmcmFtZXdvcmtQYXRoIiwiZnJhbWV3b3JrUGtnIiwiZnJhbWV3b3JrVmVyc2lvbiIsIl9jb21waWxlIiwiY29tcGlsYXRpb24iLCJsZW5ndGgiLCJlcnJvcnMiLCJFcnJvciIsImpvaW4iLCJob29rcyIsInN1Y2NlZWRNb2R1bGUiLCJ0YXAiLCJtb2R1bGUiLCJyZXNvdXJjZSIsIm1hdGNoIiwiZGVwcyIsImV4dHJhY3RGcm9tU291cmNlIiwiX3NvdXJjZSIsIl92YWx1ZSIsImh0bWxXZWJwYWNrUGx1Z2luQmVmb3JlSHRtbEdlbmVyYXRpb24iLCJwdWJsaWNQYXRoIiwib3V0cHV0T3B0aW9ucyIsImpzUGF0aCIsImNzc1BhdGgiLCJhc3NldHMiLCJqcyIsInVuc2hpZnQiLCJjc3MiLCJlbWl0IiwiY29tcGlsZXIiLCJjYWxsYmFjayIsIl9idWlsZEV4dEJ1bmRsZSIsIm91dHB1dFBhdGgiLCJkZXZTZXJ2ZXIiLCJjb250ZW50QmFzZSIsIl9wcmVwYXJlRm9yQnVpbGQiLCJyZWJ1aWxkIiwicGFybXMiLCJwcm9maWxlIiwiYnJvd3NlckNvdW50IiwidXJsIiwicG9ydCIsIm9wbiIsIm91dHB1dCIsInJpbXJhZiIsIm1rZGlycCIsImZzeCIsInBhY2thZ2VzIiwidG9vbGtpdCIsInRoZW1lIiwiZmlyc3RUaW1lIiwic3luYyIsImJ1aWxkWE1MIiwiY3JlYXRlQXBwSnNvbiIsImNyZWF0ZVdvcmtzcGFjZUpzb24iLCJjcmVhdGVKU0RPTUVudmlyb25tZW50Iiwid3JpdGVGaWxlU3luYyIsImNvbXByZXNzIiwiZnJvbVJlc291cmNlcyIsInRvUmVzb3VyY2VzIiwiY29weVN5bmMiLCJyZXBsYWNlIiwiZnJvbVBhY2thZ2VzIiwidG9QYWNrYWdlcyIsImZyb21PdmVycmlkZXMiLCJ0b092ZXJyaWRlcyIsIm1hbmlmZXN0IiwiZSIsIlByb21pc2UiLCJyZWplY3QiLCJvbkJ1aWxkRG9uZSIsIm9wdHMiLCJzaWxlbnQiLCJzdGRpbyIsImVuY29kaW5nIiwiZXhlY3V0ZUFzeW5jIiwidGhlbiIsInJlYXNvbiIsImNvbW1hbmQiLCJERUZBVUxUX1NVQlNUUlMiLCJzdWJzdHJpbmdzIiwiY3Jvc3NTcGF3biIsInN0cmluZ2lmeSIsImNoaWxkIiwib24iLCJjb2RlIiwic2lnbmFsIiwiZXJyb3IiLCJzdHIiLCJ0b1N0cmluZyIsInRyaW0iLCJzb21lIiwiaW5kZXhPZiIsImluY2x1ZGVzIiwicmVkIiwic3RkZXJyIiwic3RySmF2YU9wdHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFPLFNBQVNBLEdBQVQsQ0FBYUMsQ0FBYixFQUFnQjtBQUNyQkMsRUFBQUEsT0FBTyxDQUFDLFVBQUQsQ0FBUCxDQUFvQkMsUUFBcEIsQ0FBNkJDLE9BQU8sQ0FBQ0MsTUFBckMsRUFBNkMsQ0FBN0M7O0FBQ0FELEVBQUFBLE9BQU8sQ0FBQ0MsTUFBUixDQUFlQyxTQUFmO0FBQ0FGLEVBQUFBLE9BQU8sQ0FBQ0MsTUFBUixDQUFlRSxLQUFmLENBQXFCTixDQUFyQjtBQUNBRyxFQUFBQSxPQUFPLENBQUNDLE1BQVIsQ0FBZUUsS0FBZixDQUFxQixJQUFyQjtBQUNEOztBQUVNLFNBQVNDLElBQVQsQ0FBY0MsT0FBZCxFQUF1QlIsQ0FBdkIsRUFBMEI7QUFDL0IsTUFBSVEsT0FBTyxDQUFDQyxPQUFSLElBQW1CLEtBQXZCLEVBQThCO0FBQzVCUixJQUFBQSxPQUFPLENBQUMsVUFBRCxDQUFQLENBQW9CQyxRQUFwQixDQUE2QkMsT0FBTyxDQUFDQyxNQUFyQyxFQUE2QyxDQUE3Qzs7QUFDQUQsSUFBQUEsT0FBTyxDQUFDQyxNQUFSLENBQWVDLFNBQWY7QUFDQUYsSUFBQUEsT0FBTyxDQUFDQyxNQUFSLENBQWVFLEtBQWYsQ0FBc0IsYUFBWU4sQ0FBRSxFQUFwQztBQUNBRyxJQUFBQSxPQUFPLENBQUNDLE1BQVIsQ0FBZUUsS0FBZixDQUFxQixJQUFyQjtBQUNEO0FBQ0Y7O0FBRU0sU0FBU0ksWUFBVCxDQUFzQkYsT0FBdEIsRUFBK0I7QUFDcEMsTUFBSUcsU0FBUyxHQUFHLEVBQWhCO0FBQ0EsTUFBSUMsUUFBUSxHQUFHLEVBQWY7QUFDQSxNQUFJQyxXQUFXLEdBQUcsRUFBbEI7QUFDQSxNQUFJQyxVQUFVLEdBQUcsRUFBakI7O0FBQ0EsUUFBTUMsRUFBRSxHQUFHZCxPQUFPLENBQUMsSUFBRCxDQUFsQjs7QUFDQSxRQUFNZSxlQUFlLEdBQUdmLE9BQU8sQ0FBQyxjQUFELENBQS9COztBQUNBZSxFQUFBQSxlQUFlLENBQUNmLE9BQU8sQ0FBQyxpQkFBRCxDQUFSLEVBQTZCTyxPQUE3QixFQUFzQyxFQUF0QyxDQUFmOztBQUNBLE1BQUlBLE9BQU8sQ0FBQ0csU0FBUixJQUFxQk0sU0FBekIsRUFDRTtBQUNFTCxJQUFBQSxRQUFRLENBQUNNLFlBQVQsR0FBd0IsRUFBeEI7QUFDQU4sSUFBQUEsUUFBUSxDQUFDTSxZQUFULENBQXNCQyxJQUF0QixDQUEyQiwwR0FBM0I7QUFDQSxRQUFJQyxJQUFJLEdBQUcsRUFBWDtBQUNBQSxJQUFBQSxJQUFJLENBQUNDLE1BQUwsR0FBYyxFQUFkO0FBQ0FELElBQUFBLElBQUksQ0FBQ0MsTUFBTCxDQUFZQyxJQUFaLEdBQW1CVixRQUFuQjtBQUNBVyxJQUFBQSxPQUFPLENBQUN4QixHQUFSLENBQVlxQixJQUFaO0FBQ0EsV0FBT0EsSUFBUDtBQUNEOztBQUNILE1BQUlaLE9BQU8sQ0FBQ0csU0FBUixJQUFxQixPQUF6QixFQUNFO0FBQ0VBLElBQUFBLFNBQVMsR0FBRyxPQUFaO0FBQ0FHLElBQUFBLFVBQVUsR0FBSSxvQkFBZDtBQUNELEdBSkgsTUFNRTtBQUNFSCxJQUFBQSxTQUFTLEdBQUdILE9BQU8sQ0FBQ0csU0FBcEI7QUFDQUcsSUFBQUEsVUFBVSxHQUFJLE9BQU1ILFNBQVUsaUJBQTlCO0FBQ0Q7O0FBQ0hDLEVBQUFBLFFBQVEsR0FBR1gsT0FBTyxDQUFFLEtBQUlVLFNBQVUsTUFBaEIsQ0FBUCxDQUE4QmEsY0FBOUIsRUFBWDtBQUNBWixFQUFBQSxRQUFRLENBQUNELFNBQVQsR0FBcUJBLFNBQXJCO0FBQ0FDLEVBQUFBLFFBQVEsQ0FBQ2EsR0FBVCxHQUFleEIsT0FBTyxDQUFDLGNBQUQsQ0FBUCxDQUF3QnlCLE9BQXhCLEVBQWY7QUFDQW5CLEVBQUFBLElBQUksQ0FBQ0MsT0FBRCxFQUFXLGdCQUFlTSxVQUFXLEVBQXJDLENBQUo7QUFDQVAsRUFBQUEsSUFBSSxDQUFDQyxPQUFELEVBQVcsa0JBQWlCSSxRQUFRLENBQUNhLEdBQUksRUFBekMsQ0FBSjtBQUNBLFFBQU1FLEVBQUUsR0FBSVosRUFBRSxDQUFDYSxVQUFILENBQWUsUUFBT2hCLFFBQVEsQ0FBQ0QsU0FBVSxJQUF6QyxLQUFpRGtCLElBQUksQ0FBQ0MsS0FBTCxDQUFXZixFQUFFLENBQUNnQixZQUFILENBQWlCLFFBQU9uQixRQUFRLENBQUNELFNBQVUsSUFBM0MsRUFBZ0QsT0FBaEQsQ0FBWCxDQUFqRCxJQUF5SCxFQUFySTtBQUNBRSxFQUFBQSxXQUFXLHFCQUFRWixPQUFPLENBQUUsS0FBSVcsUUFBUSxDQUFDRCxTQUFVLE1BQXpCLENBQVAsQ0FBdUNxQixpQkFBdkMsRUFBUixFQUF1RXhCLE9BQXZFLEVBQW1GbUIsRUFBbkYsQ0FBWDs7QUFDQSxNQUFJZCxXQUFXLENBQUNvQixXQUFaLElBQTJCLFlBQS9CLEVBQ0U7QUFBQ3JCLElBQUFBLFFBQVEsQ0FBQ3NCLFVBQVQsR0FBc0IsSUFBdEI7QUFBMkIsR0FEOUIsTUFHRTtBQUFDdEIsSUFBQUEsUUFBUSxDQUFDc0IsVUFBVCxHQUFzQixLQUF0QjtBQUE0Qjs7QUFDL0JuQyxFQUFBQSxHQUFHLENBQUNFLE9BQU8sQ0FBQyxjQUFELENBQVAsQ0FBd0JrQyxZQUF4QixDQUFxQ3ZCLFFBQVEsQ0FBQ2EsR0FBOUMsRUFBbURYLFVBQW5ELEVBQStERixRQUFRLENBQUNELFNBQXhFLENBQUQsQ0FBSDtBQUNBWixFQUFBQSxHQUFHLENBQUNhLFFBQVEsQ0FBQ2EsR0FBVCxHQUFlLGVBQWYsR0FBaUNaLFdBQVcsQ0FBQ29CLFdBQTlDLENBQUg7QUFFQSxNQUFJYixJQUFJLEdBQUcsRUFBWDtBQUNBQSxFQUFBQSxJQUFJLENBQUNDLE1BQUwsR0FBYyxFQUFkO0FBQ0FELEVBQUFBLElBQUksQ0FBQ0MsTUFBTCxDQUFZSSxHQUFaLEdBQWtCYixRQUFRLENBQUNhLEdBQTNCO0FBQ0FMLEVBQUFBLElBQUksQ0FBQ0MsTUFBTCxDQUFZVixTQUFaLEdBQXdCQyxRQUFRLENBQUNELFNBQWpDO0FBQ0FTLEVBQUFBLElBQUksQ0FBQ0MsTUFBTCxDQUFZQyxJQUFaLEdBQW1CVixRQUFuQjtBQUNBUSxFQUFBQSxJQUFJLENBQUNDLE1BQUwsQ0FBWWIsT0FBWixHQUFzQkssV0FBdEI7QUFDQSxTQUFPTyxJQUFQO0FBQ0Q7O0FBRU0sU0FBU00sT0FBVCxHQUFtQjtBQUN4QixNQUFJVSxLQUFLLEdBQUduQyxPQUFPLENBQUMsT0FBRCxDQUFuQjs7QUFDQSxNQUFJb0MsTUFBTSxHQUFJLEVBQWQ7O0FBQ0EsUUFBTUMsUUFBUSxHQUFHckMsT0FBTyxDQUFDLElBQUQsQ0FBUCxDQUFjcUMsUUFBZCxFQUFqQjs7QUFDQSxNQUFJQSxRQUFRLElBQUksUUFBaEIsRUFBMEI7QUFBRUQsSUFBQUEsTUFBTSxHQUFJLFVBQVY7QUFBcUIsR0FBakQsTUFDSztBQUFFQSxJQUFBQSxNQUFNLEdBQUksVUFBVjtBQUFxQjs7QUFDNUIsU0FBUSxHQUFFRCxLQUFLLENBQUNHLEtBQU4sQ0FBWUYsTUFBWixDQUFvQixHQUE5QjtBQUNEOztBQUVNLFNBQVNGLFlBQVQsQ0FBc0JWLEdBQXRCLEVBQTJCWCxVQUEzQixFQUF1QzBCLGFBQXZDLEVBQXNEO0FBQzNELFFBQU1DLElBQUksR0FBR3hDLE9BQU8sQ0FBQyxNQUFELENBQXBCOztBQUNBLFFBQU1jLEVBQUUsR0FBR2QsT0FBTyxDQUFDLElBQUQsQ0FBbEI7O0FBRUEsTUFBSXlDLENBQUMsR0FBRyxFQUFSO0FBQ0EsTUFBSUMsVUFBVSxHQUFHRixJQUFJLENBQUNHLE9BQUwsQ0FBYXpDLE9BQU8sQ0FBQzBDLEdBQVIsRUFBYixFQUEyQixzQkFBM0IsRUFBbUQvQixVQUFuRCxDQUFqQjtBQUNBLE1BQUlnQyxTQUFTLEdBQUkvQixFQUFFLENBQUNhLFVBQUgsQ0FBY2UsVUFBVSxHQUFDLGVBQXpCLEtBQTZDZCxJQUFJLENBQUNDLEtBQUwsQ0FBV2YsRUFBRSxDQUFDZ0IsWUFBSCxDQUFnQlksVUFBVSxHQUFDLGVBQTNCLEVBQTRDLE9BQTVDLENBQVgsQ0FBN0MsSUFBaUgsRUFBbEk7QUFDQUQsRUFBQUEsQ0FBQyxDQUFDSyxhQUFGLEdBQWtCRCxTQUFTLENBQUNFLE9BQTVCO0FBRUEsTUFBSUMsV0FBVyxHQUFHUixJQUFJLENBQUNHLE9BQUwsQ0FBYXpDLE9BQU8sQ0FBQzBDLEdBQVIsRUFBYixFQUEyQixzQkFBM0IsQ0FBbEI7QUFDQSxNQUFJSyxVQUFVLEdBQUluQyxFQUFFLENBQUNhLFVBQUgsQ0FBY3FCLFdBQVcsR0FBQyxlQUExQixLQUE4Q3BCLElBQUksQ0FBQ0MsS0FBTCxDQUFXZixFQUFFLENBQUNnQixZQUFILENBQWdCa0IsV0FBVyxHQUFDLGVBQTVCLEVBQTZDLE9BQTdDLENBQVgsQ0FBOUMsSUFBbUgsRUFBckk7QUFDQVAsRUFBQUEsQ0FBQyxDQUFDUyxjQUFGLEdBQW1CRCxVQUFVLENBQUNGLE9BQTlCO0FBRUEsTUFBSUksT0FBTyxHQUFHWCxJQUFJLENBQUNHLE9BQUwsQ0FBYXpDLE9BQU8sQ0FBQzBDLEdBQVIsRUFBYixFQUEyQiwwQkFBM0IsQ0FBZDtBQUNBLE1BQUlRLE1BQU0sR0FBSXRDLEVBQUUsQ0FBQ2EsVUFBSCxDQUFjd0IsT0FBTyxHQUFDLGVBQXRCLEtBQTBDdkIsSUFBSSxDQUFDQyxLQUFMLENBQVdmLEVBQUUsQ0FBQ2dCLFlBQUgsQ0FBZ0JxQixPQUFPLEdBQUMsZUFBeEIsRUFBeUMsT0FBekMsQ0FBWCxDQUExQyxJQUEyRyxFQUF6SDtBQUNBVixFQUFBQSxDQUFDLENBQUNZLFVBQUYsR0FBZUQsTUFBTSxDQUFDRSxNQUFQLENBQWNQLE9BQTdCO0FBRUEsTUFBSVEsT0FBTyxHQUFHZixJQUFJLENBQUNHLE9BQUwsQ0FBYUQsVUFBYixFQUF3QiwwQkFBeEIsQ0FBZDtBQUNBLE1BQUljLE1BQU0sR0FBSTFDLEVBQUUsQ0FBQ2EsVUFBSCxDQUFjNEIsT0FBTyxHQUFDLGVBQXRCLEtBQTBDM0IsSUFBSSxDQUFDQyxLQUFMLENBQVdmLEVBQUUsQ0FBQ2dCLFlBQUgsQ0FBZ0J5QixPQUFPLEdBQUMsZUFBeEIsRUFBeUMsT0FBekMsQ0FBWCxDQUExQyxJQUEyRyxFQUF6SDtBQUNBZCxFQUFBQSxDQUFDLENBQUNnQixVQUFGLEdBQWVELE1BQU0sQ0FBQ0UsWUFBdEI7QUFFQSxNQUFJQyxhQUFhLEdBQUcsRUFBcEI7O0FBQ0EsTUFBSXBCLGFBQWEsSUFBSXZCLFNBQWpCLElBQThCdUIsYUFBYSxJQUFJLE9BQW5ELEVBQTREO0FBQzFELFFBQUlxQixhQUFhLEdBQUdwQixJQUFJLENBQUNHLE9BQUwsQ0FBYXpDLE9BQU8sQ0FBQzBDLEdBQVIsRUFBYixFQUEyQixjQUEzQixFQUEyQ0wsYUFBM0MsQ0FBcEI7QUFDQSxRQUFJc0IsWUFBWSxHQUFJL0MsRUFBRSxDQUFDYSxVQUFILENBQWNpQyxhQUFhLEdBQUMsZUFBNUIsS0FBZ0RoQyxJQUFJLENBQUNDLEtBQUwsQ0FBV2YsRUFBRSxDQUFDZ0IsWUFBSCxDQUFnQjhCLGFBQWEsR0FBQyxlQUE5QixFQUErQyxPQUEvQyxDQUFYLENBQWhELElBQXVILEVBQTNJO0FBQ0FuQixJQUFBQSxDQUFDLENBQUNxQixnQkFBRixHQUFxQkQsWUFBWSxDQUFDZCxPQUFsQztBQUNBWSxJQUFBQSxhQUFhLEdBQUcsT0FBT3BCLGFBQVAsR0FBdUIsSUFBdkIsR0FBOEJFLENBQUMsQ0FBQ3FCLGdCQUFoRDtBQUNEOztBQUVELFNBQU90QyxHQUFHLEdBQUcsc0JBQU4sR0FBK0JpQixDQUFDLENBQUNLLGFBQWpDLEdBQWlELFlBQWpELEdBQWdFTCxDQUFDLENBQUNZLFVBQWxFLEdBQStFLGdCQUEvRSxHQUFrR1osQ0FBQyxDQUFDZ0IsVUFBcEcsR0FBaUgsYUFBakgsR0FBaUloQixDQUFDLENBQUNTLGNBQW5JLEdBQW9KUyxhQUEzSjtBQUNEOztBQUVNLFNBQVNJLFFBQVQsQ0FBa0JDLFdBQWxCLEVBQStCM0MsSUFBL0IsRUFBcUNkLE9BQXJDLEVBQThDO0FBQ25ELE1BQUljLElBQUksQ0FBQ0osWUFBTCxDQUFrQmdELE1BQWxCLEdBQTJCLENBQS9CLEVBQWtDO0FBQ2hDRCxJQUFBQSxXQUFXLENBQUNFLE1BQVosQ0FBbUJoRCxJQUFuQixDQUF5QixJQUFJaUQsS0FBSixDQUFVOUMsSUFBSSxDQUFDSixZQUFMLENBQWtCbUQsSUFBbEIsQ0FBdUIsRUFBdkIsQ0FBVixDQUF6QjtBQUNBO0FBQ0Q7O0FBQ0QsUUFBTXRFLEdBQUcsR0FBR0UsT0FBTyxDQUFDLGNBQUQsQ0FBUCxDQUF3QkYsR0FBcEM7O0FBQ0EsUUFBTVEsSUFBSSxHQUFHTixPQUFPLENBQUMsY0FBRCxDQUFQLENBQXdCTSxJQUFyQzs7QUFDQSxNQUFJZSxJQUFJLENBQUNZLFVBQVQsRUFBcUI7QUFDbkIzQixJQUFBQSxJQUFJLENBQUNDLE9BQUQsRUFBVSw0QkFBVixDQUFKO0FBQ0F5RCxJQUFBQSxXQUFXLENBQUNLLEtBQVosQ0FBa0JDLGFBQWxCLENBQWdDQyxHQUFoQyxDQUFxQyxvQkFBckMsRUFBMkRDLE1BQUQsSUFBWTtBQUNwRSxVQUFJQSxNQUFNLENBQUNDLFFBQVAsSUFBbUJELE1BQU0sQ0FBQ0MsUUFBUCxDQUFnQkMsS0FBaEIsQ0FBc0IsYUFBdEIsQ0FBbkIsSUFBMkQsQ0FBQ0YsTUFBTSxDQUFDQyxRQUFQLENBQWdCQyxLQUFoQixDQUFzQixjQUF0QixDQUE1RCxJQUFxRyxDQUFDRixNQUFNLENBQUNDLFFBQVAsQ0FBZ0JDLEtBQWhCLENBQXNCLGtCQUF0QixDQUExRyxFQUFxSjtBQUNuSnJELFFBQUFBLElBQUksQ0FBQ3NELElBQUwsR0FBWSxDQUNWLElBQUl0RCxJQUFJLENBQUNzRCxJQUFMLElBQWEsRUFBakIsQ0FEVSxFQUVWLEdBQUczRSxPQUFPLENBQUUsS0FBSXFCLElBQUksQ0FBQ1gsU0FBVSxNQUFyQixDQUFQLENBQW1Da0UsaUJBQW5DLENBQXFESixNQUFNLENBQUNLLE9BQVAsQ0FBZUMsTUFBcEUsQ0FGTyxDQUFaO0FBSUQ7QUFDRixLQVBEO0FBUUQsR0FWRCxNQVdLO0FBQ0h4RSxJQUFBQSxJQUFJLENBQUNDLE9BQUQsRUFBVyxpQkFBWCxDQUFKO0FBQ0Q7O0FBQ0QsTUFBSWMsSUFBSSxDQUFDSixZQUFMLENBQWtCZ0QsTUFBbEIsSUFBNEIsQ0FBaEMsRUFBbUM7QUFDakNELElBQUFBLFdBQVcsQ0FBQ0ssS0FBWixDQUFrQlUscUNBQWxCLENBQXdEUixHQUF4RCxDQUE2RCxxQkFBN0QsRUFBbUZwRCxJQUFELElBQVU7QUFDMUY7QUFDQWIsTUFBQUEsSUFBSSxDQUFDQyxPQUFELEVBQVMsOEJBQVQsQ0FBSjs7QUFFQSxZQUFNaUMsSUFBSSxHQUFHeEMsT0FBTyxDQUFDLE1BQUQsQ0FBcEI7O0FBQ0EsVUFBSWdGLFVBQVUsR0FBRyxFQUFqQjs7QUFDQSxVQUFJaEIsV0FBVyxDQUFDaUIsYUFBWixDQUEwQkQsVUFBMUIsSUFBd0NoRSxTQUE1QyxFQUF1RDtBQUNyRGdFLFFBQUFBLFVBQVUsR0FBR2hCLFdBQVcsQ0FBQ2lCLGFBQVosQ0FBMEJELFVBQXZDO0FBQ0Q7O0FBQ0QsVUFBSUUsTUFBTSxHQUFHMUMsSUFBSSxDQUFDNEIsSUFBTCxDQUFVWSxVQUFWLEVBQXFCM0QsSUFBSSxDQUFDOEIsT0FBTCxHQUFlLFNBQXBDLENBQWI7QUFDQSxVQUFJZ0MsT0FBTyxHQUFHM0MsSUFBSSxDQUFDNEIsSUFBTCxDQUFVWSxVQUFWLEVBQXFCM0QsSUFBSSxDQUFDOEIsT0FBTCxHQUFlLFVBQXBDLENBQWQ7QUFDQWhDLE1BQUFBLElBQUksQ0FBQ2lFLE1BQUwsQ0FBWUMsRUFBWixDQUFlQyxPQUFmLENBQXVCSixNQUF2QjtBQUNBL0QsTUFBQUEsSUFBSSxDQUFDaUUsTUFBTCxDQUFZRyxHQUFaLENBQWdCRCxPQUFoQixDQUF3QkgsT0FBeEI7QUFDQXJGLE1BQUFBLEdBQUcsQ0FBQ3VCLElBQUksQ0FBQ0csR0FBTCxHQUFZLFVBQVMwRCxNQUFPLFFBQU9DLE9BQVEsZ0JBQTVDLENBQUg7QUFFRCxLQWZEO0FBZ0JEO0FBQ0Y7O1NBRXFCSyxJOzs7Ozs7OzBCQUFmLGlCQUFvQkMsUUFBcEIsRUFBOEJ6QixXQUE5QixFQUEyQzNDLElBQTNDLEVBQWlEZCxPQUFqRCxFQUEwRG1GLFFBQTFEO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQ0RsRSxVQUFBQSxHQURDLEdBQ0tILElBQUksQ0FBQ0csR0FEVjtBQUVEZCxVQUFBQSxTQUZDLEdBRVdXLElBQUksQ0FBQ1gsU0FGaEI7QUFHQ1osVUFBQUEsR0FIRCxHQUdPRSxPQUFPLENBQUMsY0FBRCxDQUFQLENBQXdCRixHQUgvQjtBQUlDUSxVQUFBQSxJQUpELEdBSVFOLE9BQU8sQ0FBQyxjQUFELENBQVAsQ0FBd0JNLElBSmhDO0FBS0xBLFVBQUFBLElBQUksQ0FBQ0MsT0FBRCxFQUFTLG1CQUFULENBQUo7QUFDTWlDLFVBQUFBLElBTkQsR0FNUXhDLE9BQU8sQ0FBQyxNQUFELENBTmY7QUFPQzJGLFVBQUFBLGVBUEQsR0FPbUIzRixPQUFPLENBQUMsY0FBRCxDQUFQLENBQXdCMkYsZUFQM0M7QUFRREMsVUFBQUEsVUFSQyxHQVFZcEQsSUFBSSxDQUFDNEIsSUFBTCxDQUFVcUIsUUFBUSxDQUFDRyxVQUFuQixFQUE4QnZFLElBQUksQ0FBQzhCLE9BQW5DLENBUlo7O0FBU0wsY0FBSXNDLFFBQVEsQ0FBQ0csVUFBVCxLQUF3QixHQUF4QixJQUErQkgsUUFBUSxDQUFDbEYsT0FBVCxDQUFpQnNGLFNBQXBELEVBQStEO0FBQzdERCxZQUFBQSxVQUFVLEdBQUdwRCxJQUFJLENBQUM0QixJQUFMLENBQVVxQixRQUFRLENBQUNsRixPQUFULENBQWlCc0YsU0FBakIsQ0FBMkJDLFdBQXJDLEVBQWtERixVQUFsRCxDQUFiO0FBQ0Q7O0FBQ0R0RixVQUFBQSxJQUFJLENBQUNDLE9BQUQsRUFBUyxpQkFBaUJxRixVQUExQixDQUFKO0FBQ0F0RixVQUFBQSxJQUFJLENBQUNDLE9BQUQsRUFBUyxnQkFBZ0JHLFNBQXpCLENBQUo7O0FBQ0EsY0FBSUEsU0FBUyxJQUFJLE9BQWpCLEVBQTBCO0FBQ3hCVixZQUFBQSxPQUFPLENBQUUsY0FBRixDQUFQLENBQXdCK0YsZ0JBQXhCLENBQXlDdkUsR0FBekMsRUFBOENILElBQTlDLEVBQW9EZCxPQUFwRCxFQUE2RHFGLFVBQTdEO0FBQ0QsV0FGRCxNQUdLO0FBQ0g1RixZQUFBQSxPQUFPLENBQUUsS0FBSVUsU0FBVSxNQUFoQixDQUFQLENBQThCcUYsZ0JBQTlCLENBQStDdkUsR0FBL0MsRUFBb0RILElBQXBELEVBQTBEZCxPQUExRCxFQUFtRXFGLFVBQW5FLEVBQStFNUIsV0FBL0U7QUFDRDs7QUFuQkksZ0JBb0JEM0MsSUFBSSxDQUFDMkUsT0FBTCxJQUFnQixJQXBCZjtBQUFBO0FBQUE7QUFBQTs7QUFxQkNDLFVBQUFBLEtBckJELEdBcUJTLENBQUMsS0FBRCxFQUFRLE9BQVIsRUFBaUIxRixPQUFPLENBQUMyRixPQUF6QixFQUFrQzNGLE9BQU8sQ0FBQ3lCLFdBQTFDLENBckJUO0FBQUE7QUFBQSxpQkFzQkcyRCxlQUFlLENBQUNuRSxHQUFELEVBQU13QyxXQUFOLEVBQW1CNEIsVUFBbkIsRUFBK0JLLEtBQS9CLEVBQXNDMUYsT0FBdEMsQ0F0QmxCOztBQUFBO0FBdUJILGNBQUljLElBQUksQ0FBQzhFLFlBQUwsSUFBcUIsQ0FBckIsSUFBMEJuQyxXQUFXLENBQUNFLE1BQVosQ0FBbUJELE1BQW5CLElBQTZCLENBQTNELEVBQThEO0FBQ3hEbUMsWUFBQUEsR0FEd0QsR0FDbEQsc0JBQXNCN0YsT0FBTyxDQUFDOEYsSUFEb0I7QUFFNUR2RyxZQUFBQSxHQUFHLENBQUMwQixHQUFHLEdBQUksc0JBQXFCNEUsR0FBSSxFQUFqQyxDQUFIO0FBQ0EvRSxZQUFBQSxJQUFJLENBQUM4RSxZQUFMO0FBQ01HLFlBQUFBLEdBSnNELEdBSWhEdEcsT0FBTyxDQUFDLEtBQUQsQ0FKeUM7QUFLNURzRyxZQUFBQSxHQUFHLENBQUNGLEdBQUQsQ0FBSDtBQUNEOztBQUNEVixVQUFBQSxRQUFRO0FBOUJMO0FBQUE7O0FBQUE7QUFpQ0hBLFVBQUFBLFFBQVE7O0FBakNMO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHOzs7O0FBcUNBLFNBQVNLLGdCQUFULENBQTBCdkUsR0FBMUIsRUFBK0JILElBQS9CLEVBQXFDZCxPQUFyQyxFQUE4Q2dHLE1BQTlDLEVBQXNEO0FBQzNELFFBQU16RyxHQUFHLEdBQUdFLE9BQU8sQ0FBQyxjQUFELENBQVAsQ0FBd0JGLEdBQXBDOztBQUNBLFFBQU0wRyxNQUFNLEdBQUd4RyxPQUFPLENBQUMsUUFBRCxDQUF0Qjs7QUFDQSxRQUFNeUcsTUFBTSxHQUFHekcsT0FBTyxDQUFDLFFBQUQsQ0FBdEI7O0FBQ0EsUUFBTTBHLEdBQUcsR0FBRzFHLE9BQU8sQ0FBQyxVQUFELENBQW5COztBQUNBLFFBQU1jLEVBQUUsR0FBR2QsT0FBTyxDQUFDLElBQUQsQ0FBbEI7O0FBQ0EsUUFBTXdDLElBQUksR0FBR3hDLE9BQU8sQ0FBQyxNQUFELENBQXBCOztBQUVBLE1BQUkyRyxRQUFRLEdBQUdwRyxPQUFPLENBQUNvRyxRQUF2QjtBQUNBLE1BQUlDLE9BQU8sR0FBR3JHLE9BQU8sQ0FBQ3FHLE9BQXRCO0FBQ0EsTUFBSUMsS0FBSyxHQUFHdEcsT0FBTyxDQUFDc0csS0FBcEI7QUFFQUEsRUFBQUEsS0FBSyxHQUFHQSxLQUFLLEtBQUtELE9BQU8sS0FBSyxTQUFaLEdBQXdCLGNBQXhCLEdBQXlDLGdCQUE5QyxDQUFiOztBQUNBLE1BQUl2RixJQUFJLENBQUN5RixTQUFULEVBQW9CO0FBQ2xCTixJQUFBQSxNQUFNLENBQUNPLElBQVAsQ0FBWVIsTUFBWjtBQUNBRSxJQUFBQSxNQUFNLENBQUNNLElBQVAsQ0FBWVIsTUFBWjs7QUFDQSxVQUFNUyxRQUFRLEdBQUdoSCxPQUFPLENBQUMsYUFBRCxDQUFQLENBQXVCZ0gsUUFBeEM7O0FBQ0EsVUFBTUMsYUFBYSxHQUFHakgsT0FBTyxDQUFDLGFBQUQsQ0FBUCxDQUF1QmlILGFBQTdDOztBQUNBLFVBQU1DLG1CQUFtQixHQUFHbEgsT0FBTyxDQUFDLGFBQUQsQ0FBUCxDQUF1QmtILG1CQUFuRDs7QUFDQSxVQUFNQyxzQkFBc0IsR0FBR25ILE9BQU8sQ0FBQyxhQUFELENBQVAsQ0FBdUJtSCxzQkFBdEQ7O0FBQ0FyRyxJQUFBQSxFQUFFLENBQUNzRyxhQUFILENBQWlCNUUsSUFBSSxDQUFDNEIsSUFBTCxDQUFVbUMsTUFBVixFQUFrQixXQUFsQixDQUFqQixFQUFpRFMsUUFBUSxDQUFDO0FBQUVLLE1BQUFBLFFBQVEsRUFBRWhHLElBQUksQ0FBQ1k7QUFBakIsS0FBRCxDQUF6RCxFQUEwRixNQUExRjtBQUNBbkIsSUFBQUEsRUFBRSxDQUFDc0csYUFBSCxDQUFpQjVFLElBQUksQ0FBQzRCLElBQUwsQ0FBVW1DLE1BQVYsRUFBa0Isc0JBQWxCLENBQWpCLEVBQTREWSxzQkFBc0IsRUFBbEYsRUFBc0YsTUFBdEY7QUFDQXJHLElBQUFBLEVBQUUsQ0FBQ3NHLGFBQUgsQ0FBaUI1RSxJQUFJLENBQUM0QixJQUFMLENBQVVtQyxNQUFWLEVBQWtCLFVBQWxCLENBQWpCLEVBQWdEVSxhQUFhLENBQUVKLEtBQUYsRUFBU0YsUUFBVCxFQUFtQkMsT0FBbkIsQ0FBN0QsRUFBMkYsTUFBM0Y7QUFDQTlGLElBQUFBLEVBQUUsQ0FBQ3NHLGFBQUgsQ0FBaUI1RSxJQUFJLENBQUM0QixJQUFMLENBQVVtQyxNQUFWLEVBQWtCLGdCQUFsQixDQUFqQixFQUFzRFcsbUJBQW1CLEVBQXpFLEVBQTZFLE1BQTdFOztBQUVBLFFBQUlwRyxFQUFFLENBQUNhLFVBQUgsQ0FBY2EsSUFBSSxDQUFDNEIsSUFBTCxDQUFVbEUsT0FBTyxDQUFDMEMsR0FBUixFQUFWLEVBQXlCLFlBQXpCLENBQWQsQ0FBSixFQUEyRDtBQUN6RCxVQUFJMEUsYUFBYSxHQUFHOUUsSUFBSSxDQUFDNEIsSUFBTCxDQUFVbEUsT0FBTyxDQUFDMEMsR0FBUixFQUFWLEVBQXlCLFlBQXpCLENBQXBCO0FBQ0EsVUFBSTJFLFdBQVcsR0FBRy9FLElBQUksQ0FBQzRCLElBQUwsQ0FBVW1DLE1BQVYsRUFBa0IsY0FBbEIsQ0FBbEI7QUFDQUcsTUFBQUEsR0FBRyxDQUFDYyxRQUFKLENBQWFGLGFBQWIsRUFBNEJDLFdBQTVCO0FBQ0F6SCxNQUFBQSxHQUFHLENBQUMwQixHQUFHLEdBQUcsVUFBTixHQUFtQjhGLGFBQWEsQ0FBQ0csT0FBZCxDQUFzQnZILE9BQU8sQ0FBQzBDLEdBQVIsRUFBdEIsRUFBcUMsRUFBckMsQ0FBbkIsR0FBOEQsT0FBOUQsR0FBd0UyRSxXQUFXLENBQUNFLE9BQVosQ0FBb0J2SCxPQUFPLENBQUMwQyxHQUFSLEVBQXBCLEVBQW1DLEVBQW5DLENBQXpFLENBQUg7QUFDRDs7QUFFRCxRQUFJOUIsRUFBRSxDQUFDYSxVQUFILENBQWNhLElBQUksQ0FBQzRCLElBQUwsQ0FBVWxFLE9BQU8sQ0FBQzBDLEdBQVIsRUFBVixFQUF3QixZQUF4QixDQUFkLENBQUosRUFBMEQ7QUFDeEQsVUFBSTBFLGFBQWEsR0FBRzlFLElBQUksQ0FBQzRCLElBQUwsQ0FBVWxFLE9BQU8sQ0FBQzBDLEdBQVIsRUFBVixFQUF5QixZQUF6QixDQUFwQjtBQUNBLFVBQUkyRSxXQUFXLEdBQUcvRSxJQUFJLENBQUM0QixJQUFMLENBQVVtQyxNQUFWLEVBQWtCLFdBQWxCLENBQWxCO0FBQ0FHLE1BQUFBLEdBQUcsQ0FBQ2MsUUFBSixDQUFhRixhQUFiLEVBQTRCQyxXQUE1QjtBQUNBekgsTUFBQUEsR0FBRyxDQUFDMEIsR0FBRyxHQUFHLFVBQU4sR0FBbUI4RixhQUFhLENBQUNHLE9BQWQsQ0FBc0J2SCxPQUFPLENBQUMwQyxHQUFSLEVBQXRCLEVBQXFDLEVBQXJDLENBQW5CLEdBQThELE9BQTlELEdBQXdFMkUsV0FBVyxDQUFDRSxPQUFaLENBQW9CdkgsT0FBTyxDQUFDMEMsR0FBUixFQUFwQixFQUFtQyxFQUFuQyxDQUF6RSxDQUFIO0FBQ0Q7O0FBRUQsUUFBSTlCLEVBQUUsQ0FBQ2EsVUFBSCxDQUFjYSxJQUFJLENBQUM0QixJQUFMLENBQVVsRSxPQUFPLENBQUMwQyxHQUFSLEVBQVYsRUFBd0J2QixJQUFJLENBQUM4QixPQUFMLEdBQWUsWUFBdkMsQ0FBZCxDQUFKLEVBQXlFO0FBQ3ZFLFVBQUl1RSxZQUFZLEdBQUdsRixJQUFJLENBQUM0QixJQUFMLENBQVVsRSxPQUFPLENBQUMwQyxHQUFSLEVBQVYsRUFBd0J2QixJQUFJLENBQUM4QixPQUFMLEdBQWUsWUFBdkMsQ0FBbkI7QUFDQSxVQUFJd0UsVUFBVSxHQUFHbkYsSUFBSSxDQUFDNEIsSUFBTCxDQUFVbUMsTUFBVixFQUFrQixXQUFsQixDQUFqQjtBQUNBRyxNQUFBQSxHQUFHLENBQUNjLFFBQUosQ0FBYUUsWUFBYixFQUEyQkMsVUFBM0I7QUFDQTdILE1BQUFBLEdBQUcsQ0FBQzBCLEdBQUcsR0FBRyxVQUFOLEdBQW1Ca0csWUFBWSxDQUFDRCxPQUFiLENBQXFCdkgsT0FBTyxDQUFDMEMsR0FBUixFQUFyQixFQUFvQyxFQUFwQyxDQUFuQixHQUE2RCxPQUE3RCxHQUF1RStFLFVBQVUsQ0FBQ0YsT0FBWCxDQUFtQnZILE9BQU8sQ0FBQzBDLEdBQVIsRUFBbkIsRUFBa0MsRUFBbEMsQ0FBeEUsQ0FBSDtBQUNEOztBQUVELFFBQUk5QixFQUFFLENBQUNhLFVBQUgsQ0FBY2EsSUFBSSxDQUFDNEIsSUFBTCxDQUFVbEUsT0FBTyxDQUFDMEMsR0FBUixFQUFWLEVBQXdCdkIsSUFBSSxDQUFDOEIsT0FBTCxHQUFlLGFBQXZDLENBQWQsQ0FBSixFQUEwRTtBQUN4RSxVQUFJeUUsYUFBYSxHQUFHcEYsSUFBSSxDQUFDNEIsSUFBTCxDQUFVbEUsT0FBTyxDQUFDMEMsR0FBUixFQUFWLEVBQXdCdkIsSUFBSSxDQUFDOEIsT0FBTCxHQUFlLGFBQXZDLENBQXBCO0FBQ0EsVUFBSTBFLFdBQVcsR0FBR3JGLElBQUksQ0FBQzRCLElBQUwsQ0FBVW1DLE1BQVYsRUFBa0IsWUFBbEIsQ0FBbEI7QUFDQUcsTUFBQUEsR0FBRyxDQUFDYyxRQUFKLENBQWFJLGFBQWIsRUFBNEJDLFdBQTVCO0FBQ0EvSCxNQUFBQSxHQUFHLENBQUMwQixHQUFHLEdBQUcsVUFBTixHQUFtQm9HLGFBQWEsQ0FBQ0gsT0FBZCxDQUFzQnZILE9BQU8sQ0FBQzBDLEdBQVIsRUFBdEIsRUFBcUMsRUFBckMsQ0FBbkIsR0FBOEQsT0FBOUQsR0FBd0VpRixXQUFXLENBQUNKLE9BQVosQ0FBb0J2SCxPQUFPLENBQUMwQyxHQUFSLEVBQXBCLEVBQW1DLEVBQW5DLENBQXpFLENBQUg7QUFDRDtBQUNGOztBQUNEdkIsRUFBQUEsSUFBSSxDQUFDeUYsU0FBTCxHQUFpQixLQUFqQjtBQUNBLE1BQUl6QixFQUFKOztBQUNBLE1BQUloRSxJQUFJLENBQUNZLFVBQVQsRUFBcUI7QUFDbkJaLElBQUFBLElBQUksQ0FBQ3NELElBQUwsQ0FBVXpELElBQVYsQ0FBZSxnQ0FBZjtBQUNBbUUsSUFBQUEsRUFBRSxHQUFHaEUsSUFBSSxDQUFDc0QsSUFBTCxDQUFVUCxJQUFWLENBQWUsS0FBZixDQUFMO0FBQ0QsR0FIRCxNQUlLO0FBQ0hpQixJQUFBQSxFQUFFLEdBQUcsc0JBQUw7QUFDRDs7QUFDRCxNQUFJaEUsSUFBSSxDQUFDeUcsUUFBTCxLQUFrQixJQUFsQixJQUEwQnpDLEVBQUUsS0FBS2hFLElBQUksQ0FBQ3lHLFFBQTFDLEVBQW9EO0FBQ2xEekcsSUFBQUEsSUFBSSxDQUFDeUcsUUFBTCxHQUFnQnpDLEVBQWhCO0FBQ0EsVUFBTXlDLFFBQVEsR0FBR3RGLElBQUksQ0FBQzRCLElBQUwsQ0FBVW1DLE1BQVYsRUFBa0IsYUFBbEIsQ0FBakI7QUFDQXpGLElBQUFBLEVBQUUsQ0FBQ3NHLGFBQUgsQ0FBaUJVLFFBQWpCLEVBQTJCekMsRUFBM0IsRUFBK0IsTUFBL0I7QUFDQWhFLElBQUFBLElBQUksQ0FBQzJFLE9BQUwsR0FBZSxJQUFmO0FBQ0FsRyxJQUFBQSxHQUFHLENBQUMwQixHQUFHLEdBQUcsMEJBQU4sR0FBbUMrRSxNQUFNLENBQUNrQixPQUFQLENBQWV2SCxPQUFPLENBQUMwQyxHQUFSLEVBQWYsRUFBOEIsRUFBOUIsQ0FBcEMsQ0FBSDtBQUNELEdBTkQsTUFPSztBQUNIdkIsSUFBQUEsSUFBSSxDQUFDMkUsT0FBTCxHQUFlLEtBQWY7QUFDQWxHLElBQUFBLEdBQUcsQ0FBQzBCLEdBQUcsR0FBRyw2QkFBUCxDQUFIO0FBQ0Q7QUFDRjs7QUFFTSxTQUFTbUUsZUFBVCxDQUF5Qm5FLEdBQXpCLEVBQThCd0MsV0FBOUIsRUFBMkM0QixVQUEzQyxFQUF1REssS0FBdkQsRUFBOEQxRixPQUE5RCxFQUF1RTtBQUM1RSxRQUFNTyxFQUFFLEdBQUdkLE9BQU8sQ0FBQyxJQUFELENBQWxCOztBQUNBLFFBQU1NLElBQUksR0FBR04sT0FBTyxDQUFDLGNBQUQsQ0FBUCxDQUF3Qk0sSUFBckM7O0FBQ0FBLEVBQUFBLElBQUksQ0FBQ0MsT0FBRCxFQUFTLDBCQUFULENBQUo7QUFFQSxNQUFJK0MsTUFBSjs7QUFBWSxNQUFJO0FBQUVBLElBQUFBLE1BQU0sR0FBR3RELE9BQU8sQ0FBQyxhQUFELENBQWhCO0FBQWlDLEdBQXZDLENBQXdDLE9BQU8rSCxDQUFQLEVBQVU7QUFBRXpFLElBQUFBLE1BQU0sR0FBRyxRQUFUO0FBQW1COztBQUNuRixNQUFJeEMsRUFBRSxDQUFDYSxVQUFILENBQWMyQixNQUFkLENBQUosRUFBMkI7QUFDekJoRCxJQUFBQSxJQUFJLENBQUNDLE9BQUQsRUFBUyxzQkFBVCxDQUFKO0FBQ0QsR0FGRCxNQUdLO0FBQ0hELElBQUFBLElBQUksQ0FBQ0MsT0FBRCxFQUFTLDhCQUFULENBQUo7QUFDRDs7QUFFRCxTQUFPLElBQUl5SCxPQUFKLENBQVksQ0FBQ3JGLE9BQUQsRUFBVXNGLE1BQVYsS0FBcUI7QUFDdkMsVUFBTUMsV0FBVyxHQUFHLE1BQU07QUFDekI1SCxNQUFBQSxJQUFJLENBQUNDLE9BQUQsRUFBUyxhQUFULENBQUo7QUFDQW9DLE1BQUFBLE9BQU87QUFDUCxLQUhEOztBQUtBLFFBQUl3RixJQUFJLEdBQUc7QUFBRXZGLE1BQUFBLEdBQUcsRUFBRWdELFVBQVA7QUFBbUJ3QyxNQUFBQSxNQUFNLEVBQUUsSUFBM0I7QUFBaUNDLE1BQUFBLEtBQUssRUFBRSxNQUF4QztBQUFnREMsTUFBQUEsUUFBUSxFQUFFO0FBQTFELEtBQVg7QUFFQUMsSUFBQUEsWUFBWSxDQUFDL0csR0FBRCxFQUFNOEIsTUFBTixFQUFjMkMsS0FBZCxFQUFxQmtDLElBQXJCLEVBQTJCbkUsV0FBM0IsRUFBd0N6RCxPQUF4QyxDQUFaLENBQTZEaUksSUFBN0QsQ0FDRSxZQUFXO0FBQUVOLE1BQUFBLFdBQVc7QUFBSSxLQUQ5QixFQUVFLFVBQVNPLE1BQVQsRUFBaUI7QUFBRVIsTUFBQUEsTUFBTSxDQUFDUSxNQUFELENBQU47QUFBZ0IsS0FGckM7QUFJRCxHQVpPLENBQVA7QUFhRDs7U0FFcUJGLFk7Ozs7Ozs7MEJBQWYsa0JBQTZCL0csR0FBN0IsRUFBa0NrSCxPQUFsQyxFQUEyQ3pDLEtBQTNDLEVBQWtEa0MsSUFBbEQsRUFBd0RuRSxXQUF4RCxFQUFxRXpELE9BQXJFO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDTDtBQUNNb0ksVUFBQUEsZUFGRCxHQUVtQixDQUFDLGVBQUQsRUFBa0IsY0FBbEIsRUFBa0Msa0JBQWxDLEVBQXNELHdCQUF0RCxFQUFnRiw4QkFBaEYsRUFBZ0gsT0FBaEgsRUFBeUgsT0FBekgsRUFBa0ksY0FBbEksRUFBa0osZUFBbEosRUFBbUsscUJBQW5LLEVBQTBMLGVBQTFMLEVBQTJNLHVCQUEzTSxDQUZuQjtBQUdEQyxVQUFBQSxVQUhDLEdBR1lELGVBSFo7QUFJRHhHLFVBQUFBLEtBSkMsR0FJT25DLE9BQU8sQ0FBQyxPQUFELENBSmQ7QUFLQzZJLFVBQUFBLFVBTEQsR0FLYzdJLE9BQU8sQ0FBQyxhQUFELENBTHJCO0FBTUNGLFVBQUFBLEdBTkQsR0FNT0UsT0FBTyxDQUFDLGNBQUQsQ0FBUCxDQUF3QkYsR0FOL0I7QUFPTFEsVUFBQUEsSUFBSSxDQUFDQyxPQUFELEVBQVUsdUJBQVYsQ0FBSjtBQVBLO0FBQUEsaUJBUUMsSUFBSXlILE9BQUosQ0FBWSxDQUFDckYsT0FBRCxFQUFVc0YsTUFBVixLQUFxQjtBQUNyQzNILFlBQUFBLElBQUksQ0FBQ0MsT0FBRCxFQUFVLGFBQVltSSxPQUFRLEVBQTlCLENBQUo7QUFDQXBJLFlBQUFBLElBQUksQ0FBQ0MsT0FBRCxFQUFXLFdBQVUwRixLQUFNLEVBQTNCLENBQUo7QUFDQTNGLFlBQUFBLElBQUksQ0FBQ0MsT0FBRCxFQUFXLFVBQVNxQixJQUFJLENBQUNrSCxTQUFMLENBQWVYLElBQWYsQ0FBcUIsRUFBekMsQ0FBSjtBQUNBLGdCQUFJWSxLQUFLLEdBQUdGLFVBQVUsQ0FBQ0gsT0FBRCxFQUFVekMsS0FBVixFQUFpQmtDLElBQWpCLENBQXRCO0FBQ0FZLFlBQUFBLEtBQUssQ0FBQ0MsRUFBTixDQUFTLE9BQVQsRUFBa0IsQ0FBQ0MsSUFBRCxFQUFPQyxNQUFQLEtBQWtCO0FBQ2xDNUksY0FBQUEsSUFBSSxDQUFDQyxPQUFELEVBQVcsVUFBWCxDQUFKOztBQUNBLGtCQUFHMEksSUFBSSxLQUFLLENBQVosRUFBZTtBQUFFdEcsZ0JBQUFBLE9BQU8sQ0FBQyxDQUFELENBQVA7QUFBWSxlQUE3QixNQUNLO0FBQUVxQixnQkFBQUEsV0FBVyxDQUFDRSxNQUFaLENBQW1CaEQsSUFBbkIsQ0FBeUIsSUFBSWlELEtBQUosQ0FBVThFLElBQVYsQ0FBekI7QUFBNEN0RyxnQkFBQUEsT0FBTyxDQUFDLENBQUQsQ0FBUDtBQUFZO0FBQ2hFLGFBSkQ7QUFLQW9HLFlBQUFBLEtBQUssQ0FBQ0MsRUFBTixDQUFTLE9BQVQsRUFBbUJHLEtBQUQsSUFBVztBQUMzQjdJLGNBQUFBLElBQUksQ0FBQ0MsT0FBRCxFQUFXLFVBQVgsQ0FBSjtBQUNBeUQsY0FBQUEsV0FBVyxDQUFDRSxNQUFaLENBQW1CaEQsSUFBbkIsQ0FBd0JpSSxLQUF4QjtBQUNBeEcsY0FBQUEsT0FBTyxDQUFDLENBQUQsQ0FBUDtBQUNELGFBSkQ7QUFLQW9HLFlBQUFBLEtBQUssQ0FBQzVJLE1BQU4sQ0FBYTZJLEVBQWIsQ0FBZ0IsTUFBaEIsRUFBeUI3SCxJQUFELElBQVU7QUFDaENiLGNBQUFBLElBQUksQ0FBQ0MsT0FBRCxFQUFXLFNBQVgsQ0FBSjtBQUNBLGtCQUFJNkksR0FBRyxHQUFHakksSUFBSSxDQUFDa0ksUUFBTCxHQUFnQjVCLE9BQWhCLENBQXdCLFdBQXhCLEVBQXFDLEdBQXJDLEVBQTBDNkIsSUFBMUMsRUFBVjtBQUNBaEosY0FBQUEsSUFBSSxDQUFDQyxPQUFELEVBQVcsR0FBRTZJLEdBQUksRUFBakIsQ0FBSjs7QUFDQSxrQkFBSWpJLElBQUksSUFBSUEsSUFBSSxDQUFDa0ksUUFBTCxHQUFnQjNFLEtBQWhCLENBQXNCLDJCQUF0QixDQUFaLEVBQWdFO0FBQzlEL0IsZ0JBQUFBLE9BQU8sQ0FBQyxDQUFELENBQVA7QUFDRCxlQUZELE1BR0s7QUFDSCxvQkFBSWlHLFVBQVUsQ0FBQ1csSUFBWCxDQUFnQixVQUFTOUcsQ0FBVCxFQUFZO0FBQUUseUJBQU90QixJQUFJLENBQUNxSSxPQUFMLENBQWEvRyxDQUFiLEtBQW1CLENBQTFCO0FBQThCLGlCQUE1RCxDQUFKLEVBQW1FO0FBQ2pFMkcsa0JBQUFBLEdBQUcsR0FBR0EsR0FBRyxDQUFDM0IsT0FBSixDQUFZLE9BQVosRUFBcUIsRUFBckIsQ0FBTjtBQUNBMkIsa0JBQUFBLEdBQUcsR0FBR0EsR0FBRyxDQUFDM0IsT0FBSixDQUFZLE9BQVosRUFBcUIsRUFBckIsQ0FBTjtBQUNBMkIsa0JBQUFBLEdBQUcsR0FBR0EsR0FBRyxDQUFDM0IsT0FBSixDQUFZdkgsT0FBTyxDQUFDMEMsR0FBUixFQUFaLEVBQTJCLEVBQTNCLEVBQStCMEcsSUFBL0IsRUFBTjs7QUFDQSxzQkFBSUYsR0FBRyxDQUFDSyxRQUFKLENBQWEsT0FBYixDQUFKLEVBQTJCO0FBQ3pCekYsb0JBQUFBLFdBQVcsQ0FBQ0UsTUFBWixDQUFtQmhELElBQW5CLENBQXdCTSxHQUFHLEdBQUc0SCxHQUFHLENBQUMzQixPQUFKLENBQVksYUFBWixFQUEyQixFQUEzQixDQUE5QjtBQUNBMkIsb0JBQUFBLEdBQUcsR0FBR0EsR0FBRyxDQUFDM0IsT0FBSixDQUFZLE9BQVosRUFBc0IsR0FBRXRGLEtBQUssQ0FBQ3VILEdBQU4sQ0FBVSxPQUFWLENBQW1CLEVBQTNDLENBQU47QUFDRDs7QUFDRDVKLGtCQUFBQSxHQUFHLENBQUUsR0FBRTBCLEdBQUksR0FBRTRILEdBQUksRUFBZCxDQUFIO0FBQ0Q7QUFDRjtBQUNGLGFBbkJEO0FBb0JBTCxZQUFBQSxLQUFLLENBQUNZLE1BQU4sQ0FBYVgsRUFBYixDQUFnQixNQUFoQixFQUF5QjdILElBQUQsSUFBVTtBQUNoQ2IsY0FBQUEsSUFBSSxDQUFDQyxPQUFELEVBQVcsZ0JBQVgsQ0FBSjtBQUNBLGtCQUFJNkksR0FBRyxHQUFHakksSUFBSSxDQUFDa0ksUUFBTCxHQUFnQjVCLE9BQWhCLENBQXdCLFdBQXhCLEVBQXFDLEdBQXJDLEVBQTBDNkIsSUFBMUMsRUFBVjtBQUNBLGtCQUFJTSxXQUFXLEdBQUcseUJBQWxCO0FBQ0Esa0JBQUlILFFBQVEsR0FBR0wsR0FBRyxDQUFDSyxRQUFKLENBQWFHLFdBQWIsQ0FBZjs7QUFDQSxrQkFBSSxDQUFDSCxRQUFMLEVBQWU7QUFDYm5JLGdCQUFBQSxPQUFPLENBQUN4QixHQUFSLENBQWEsR0FBRTBCLEdBQUksSUFBR1csS0FBSyxDQUFDdUgsR0FBTixDQUFVLE9BQVYsQ0FBbUIsSUFBR04sR0FBSSxFQUFoRDtBQUNEO0FBQ0YsYUFSRDtBQVNELFdBNUNLLENBUkQ7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEciLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZnVuY3Rpb24gbG9nKHMpIHtcbiAgcmVxdWlyZSgncmVhZGxpbmUnKS5jdXJzb3JUbyhwcm9jZXNzLnN0ZG91dCwgMClcbiAgcHJvY2Vzcy5zdGRvdXQuY2xlYXJMaW5lKClcbiAgcHJvY2Vzcy5zdGRvdXQud3JpdGUocylcbiAgcHJvY2Vzcy5zdGRvdXQud3JpdGUoJ1xcbicpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBsb2d2KG9wdGlvbnMsIHMpIHtcbiAgaWYgKG9wdGlvbnMudmVyYm9zZSA9PSAneWVzJykge1xuICAgIHJlcXVpcmUoJ3JlYWRsaW5lJykuY3Vyc29yVG8ocHJvY2Vzcy5zdGRvdXQsIDApXG4gICAgcHJvY2Vzcy5zdGRvdXQuY2xlYXJMaW5lKClcbiAgICBwcm9jZXNzLnN0ZG91dC53cml0ZShgLXZlcmJvc2U6ICR7c31gKVxuICAgIHByb2Nlc3Muc3Rkb3V0LndyaXRlKCdcXG4nKVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfY29uc3RydWN0b3Iob3B0aW9ucykge1xuICB2YXIgZnJhbWV3b3JrID0gJydcbiAgdmFyIHRoaXNWYXJzID0ge31cbiAgdmFyIHRoaXNPcHRpb25zID0ge31cbiAgdmFyIHBsdWdpbk5hbWUgPSAnJ1xuICBjb25zdCBmcyA9IHJlcXVpcmUoJ2ZzJylcbiAgY29uc3QgdmFsaWRhdGVPcHRpb25zID0gcmVxdWlyZSgnc2NoZW1hLXV0aWxzJylcbiAgdmFsaWRhdGVPcHRpb25zKHJlcXVpcmUoJy4uL29wdGlvbnMuanNvbicpLCBvcHRpb25zLCAnJylcbiAgaWYgKG9wdGlvbnMuZnJhbWV3b3JrID09IHVuZGVmaW5lZCkgXG4gICAge1xuICAgICAgdGhpc1ZhcnMucGx1Z2luRXJyb3JzID0gW11cbiAgICAgIHRoaXNWYXJzLnBsdWdpbkVycm9ycy5wdXNoKCd3ZWJwYWNrIGNvbmZpZzogZnJhbWV3b3JrIHBhcmFtZXRlciBvbiBleHQtd2VicGFjay1wbHVnaW4gaXMgbm90IGRlZmluZWQgLSB2YWx1ZXM6IHJlYWN0LCBhbmd1bGFyLCBleHRqcycpXG4gICAgICB2YXIgZGF0YSA9IHt9XG4gICAgICBkYXRhLnBsdWdpbiA9IHt9XG4gICAgICBkYXRhLnBsdWdpbi52YXJzID0gdGhpc1ZhcnNcbiAgICAgIGNvbnNvbGUubG9nKGRhdGEpXG4gICAgICByZXR1cm4gZGF0YVxuICAgIH1cbiAgaWYgKG9wdGlvbnMuZnJhbWV3b3JrID09ICdleHRqcycpIFxuICAgIHtcbiAgICAgIGZyYW1ld29yayA9ICdleHRqcydcbiAgICAgIHBsdWdpbk5hbWUgPSBgZXh0LXdlYnBhY2stcGx1Z2luYFxuICAgIH1cbiAgZWxzZSBcbiAgICB7XG4gICAgICBmcmFtZXdvcmsgPSBvcHRpb25zLmZyYW1ld29ya1xuICAgICAgcGx1Z2luTmFtZSA9IGBleHQtJHtmcmFtZXdvcmt9LXdlYnBhY2stcGx1Z2luYFxuICAgIH1cbiAgdGhpc1ZhcnMgPSByZXF1aXJlKGAuLyR7ZnJhbWV3b3JrfVV0aWxgKS5nZXREZWZhdWx0VmFycygpXG4gIHRoaXNWYXJzLmZyYW1ld29yayA9IGZyYW1ld29ya1xuICB0aGlzVmFycy5hcHAgPSByZXF1aXJlKCcuL3BsdWdpblV0aWwnKS5fZ2V0QXBwKClcbiAgbG9ndihvcHRpb25zLCBgcGx1Z2luTmFtZSAtICR7cGx1Z2luTmFtZX1gKVxuICBsb2d2KG9wdGlvbnMsIGB0aGlzVmFycy5hcHAgLSAke3RoaXNWYXJzLmFwcH1gKVxuICBjb25zdCByYyA9IChmcy5leGlzdHNTeW5jKGAuZXh0LSR7dGhpc1ZhcnMuZnJhbWV3b3JrfXJjYCkgJiYgSlNPTi5wYXJzZShmcy5yZWFkRmlsZVN5bmMoYC5leHQtJHt0aGlzVmFycy5mcmFtZXdvcmt9cmNgLCAndXRmLTgnKSkgfHwge30pXG4gIHRoaXNPcHRpb25zID0geyAuLi5yZXF1aXJlKGAuLyR7dGhpc1ZhcnMuZnJhbWV3b3JrfVV0aWxgKS5nZXREZWZhdWx0T3B0aW9ucygpLCAuLi5vcHRpb25zLCAuLi5yYyB9XG4gIGlmICh0aGlzT3B0aW9ucy5lbnZpcm9ubWVudCA9PSAncHJvZHVjdGlvbicpIFxuICAgIHt0aGlzVmFycy5wcm9kdWN0aW9uID0gdHJ1ZX1cbiAgZWxzZSBcbiAgICB7dGhpc1ZhcnMucHJvZHVjdGlvbiA9IGZhbHNlfVxuICBsb2cocmVxdWlyZSgnLi9wbHVnaW5VdGlsJykuX2dldFZlcnNpb25zKHRoaXNWYXJzLmFwcCwgcGx1Z2luTmFtZSwgdGhpc1ZhcnMuZnJhbWV3b3JrKSlcbiAgbG9nKHRoaXNWYXJzLmFwcCArICdCdWlsZGluZyBmb3IgJyArIHRoaXNPcHRpb25zLmVudmlyb25tZW50KVxuXG4gIHZhciBkYXRhID0ge31cbiAgZGF0YS5wbHVnaW4gPSB7fVxuICBkYXRhLnBsdWdpbi5hcHAgPSB0aGlzVmFycy5hcHBcbiAgZGF0YS5wbHVnaW4uZnJhbWV3b3JrID0gdGhpc1ZhcnMuZnJhbWV3b3JrXG4gIGRhdGEucGx1Z2luLnZhcnMgPSB0aGlzVmFyc1xuICBkYXRhLnBsdWdpbi5vcHRpb25zID0gdGhpc09wdGlvbnNcbiAgcmV0dXJuIGRhdGFcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9nZXRBcHAoKSB7XG4gIHZhciBjaGFsayA9IHJlcXVpcmUoJ2NoYWxrJylcbiAgdmFyIHByZWZpeCA9IGBgXG4gIGNvbnN0IHBsYXRmb3JtID0gcmVxdWlyZSgnb3MnKS5wbGF0Zm9ybSgpXG4gIGlmIChwbGF0Zm9ybSA9PSAnZGFyd2luJykgeyBwcmVmaXggPSBg4oS5IO+9omV4dO+9ozpgIH1cbiAgZWxzZSB7IHByZWZpeCA9IGBpIFtleHRdOmAgfVxuICByZXR1cm4gYCR7Y2hhbGsuZ3JlZW4ocHJlZml4KX0gYFxufVxuXG5leHBvcnQgZnVuY3Rpb24gX2dldFZlcnNpb25zKGFwcCwgcGx1Z2luTmFtZSwgZnJhbWV3b3JrTmFtZSkge1xuICBjb25zdCBwYXRoID0gcmVxdWlyZSgncGF0aCcpXG4gIGNvbnN0IGZzID0gcmVxdWlyZSgnZnMnKVxuXG4gIHZhciB2ID0ge31cbiAgdmFyIHBsdWdpblBhdGggPSBwYXRoLnJlc29sdmUocHJvY2Vzcy5jd2QoKSwnbm9kZV9tb2R1bGVzL0BzZW5jaGEnLCBwbHVnaW5OYW1lKVxuICB2YXIgcGx1Z2luUGtnID0gKGZzLmV4aXN0c1N5bmMocGx1Z2luUGF0aCsnL3BhY2thZ2UuanNvbicpICYmIEpTT04ucGFyc2UoZnMucmVhZEZpbGVTeW5jKHBsdWdpblBhdGgrJy9wYWNrYWdlLmpzb24nLCAndXRmLTgnKSkgfHwge30pO1xuICB2LnBsdWdpblZlcnNpb24gPSBwbHVnaW5Qa2cudmVyc2lvblxuXG4gIHZhciB3ZWJwYWNrUGF0aCA9IHBhdGgucmVzb2x2ZShwcm9jZXNzLmN3ZCgpLCdub2RlX21vZHVsZXMvd2VicGFjaycpXG4gIHZhciB3ZWJwYWNrUGtnID0gKGZzLmV4aXN0c1N5bmMod2VicGFja1BhdGgrJy9wYWNrYWdlLmpzb24nKSAmJiBKU09OLnBhcnNlKGZzLnJlYWRGaWxlU3luYyh3ZWJwYWNrUGF0aCsnL3BhY2thZ2UuanNvbicsICd1dGYtOCcpKSB8fCB7fSk7XG4gIHYud2VicGFja1ZlcnNpb24gPSB3ZWJwYWNrUGtnLnZlcnNpb25cblxuICB2YXIgZXh0UGF0aCA9IHBhdGgucmVzb2x2ZShwcm9jZXNzLmN3ZCgpLCdub2RlX21vZHVsZXMvQHNlbmNoYS9leHQnKVxuICB2YXIgZXh0UGtnID0gKGZzLmV4aXN0c1N5bmMoZXh0UGF0aCsnL3BhY2thZ2UuanNvbicpICYmIEpTT04ucGFyc2UoZnMucmVhZEZpbGVTeW5jKGV4dFBhdGgrJy9wYWNrYWdlLmpzb24nLCAndXRmLTgnKSkgfHwge30pO1xuICB2LmV4dFZlcnNpb24gPSBleHRQa2cuc2VuY2hhLnZlcnNpb25cblxuICB2YXIgY21kUGF0aCA9IHBhdGgucmVzb2x2ZShwbHVnaW5QYXRoLCdub2RlX21vZHVsZXMvQHNlbmNoYS9jbWQnKVxuICB2YXIgY21kUGtnID0gKGZzLmV4aXN0c1N5bmMoY21kUGF0aCsnL3BhY2thZ2UuanNvbicpICYmIEpTT04ucGFyc2UoZnMucmVhZEZpbGVTeW5jKGNtZFBhdGgrJy9wYWNrYWdlLmpzb24nLCAndXRmLTgnKSkgfHwge30pO1xuICB2LmNtZFZlcnNpb24gPSBjbWRQa2cudmVyc2lvbl9mdWxsXG5cbiAgdmFyIGZyYW1ld29ya0luZm8gPSAnJ1xuICBpZiAoZnJhbWV3b3JrTmFtZSAhPSB1bmRlZmluZWQgJiYgZnJhbWV3b3JrTmFtZSAhPSAnZXh0anMnKSB7XG4gICAgdmFyIGZyYW1ld29ya1BhdGggPSBwYXRoLnJlc29sdmUocHJvY2Vzcy5jd2QoKSwnbm9kZV9tb2R1bGVzJywgZnJhbWV3b3JrTmFtZSlcbiAgICB2YXIgZnJhbWV3b3JrUGtnID0gKGZzLmV4aXN0c1N5bmMoZnJhbWV3b3JrUGF0aCsnL3BhY2thZ2UuanNvbicpICYmIEpTT04ucGFyc2UoZnMucmVhZEZpbGVTeW5jKGZyYW1ld29ya1BhdGgrJy9wYWNrYWdlLmpzb24nLCAndXRmLTgnKSkgfHwge30pO1xuICAgIHYuZnJhbWV3b3JrVmVyc2lvbiA9IGZyYW1ld29ya1BrZy52ZXJzaW9uXG4gICAgZnJhbWV3b3JrSW5mbyA9ICcsICcgKyBmcmFtZXdvcmtOYW1lICsgJyB2JyArIHYuZnJhbWV3b3JrVmVyc2lvblxuICB9XG5cbiAgcmV0dXJuIGFwcCArICdleHQtd2VicGFjay1wbHVnaW4gdicgKyB2LnBsdWdpblZlcnNpb24gKyAnLCBFeHQgSlMgdicgKyB2LmV4dFZlcnNpb24gKyAnLCBTZW5jaGEgQ21kIHYnICsgdi5jbWRWZXJzaW9uICsgJywgd2VicGFjayB2JyArIHYud2VicGFja1ZlcnNpb24gKyBmcmFtZXdvcmtJbmZvXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfY29tcGlsZShjb21waWxhdGlvbiwgdmFycywgb3B0aW9ucykge1xuICBpZiAodmFycy5wbHVnaW5FcnJvcnMubGVuZ3RoID4gMCkge1xuICAgIGNvbXBpbGF0aW9uLmVycm9ycy5wdXNoKCBuZXcgRXJyb3IodmFycy5wbHVnaW5FcnJvcnMuam9pbihcIlwiKSkgKVxuICAgIHJldHVyblxuICB9XG4gIGNvbnN0IGxvZyA9IHJlcXVpcmUoJy4vcGx1Z2luVXRpbCcpLmxvZ1xuICBjb25zdCBsb2d2ID0gcmVxdWlyZSgnLi9wbHVnaW5VdGlsJykubG9ndlxuICBpZiAodmFycy5wcm9kdWN0aW9uKSB7XG4gICAgbG9ndihvcHRpb25zLGBleHQtY29tcGlsYXRpb24tcHJvZHVjdGlvbmApXG4gICAgY29tcGlsYXRpb24uaG9va3Muc3VjY2VlZE1vZHVsZS50YXAoYGV4dC1zdWNjZWVkLW1vZHVsZWAsIChtb2R1bGUpID0+IHtcbiAgICAgIGlmIChtb2R1bGUucmVzb3VyY2UgJiYgbW9kdWxlLnJlc291cmNlLm1hdGNoKC9cXC4oanx0KXN4PyQvKSAmJiAhbW9kdWxlLnJlc291cmNlLm1hdGNoKC9ub2RlX21vZHVsZXMvKSAmJiAhbW9kdWxlLnJlc291cmNlLm1hdGNoKCcvZXh0LXJlYWN0L2Rpc3QvJykpIHtcbiAgICAgICAgdmFycy5kZXBzID0gWyBcbiAgICAgICAgICAuLi4odmFycy5kZXBzIHx8IFtdKSwgXG4gICAgICAgICAgLi4ucmVxdWlyZShgLi8ke3ZhcnMuZnJhbWV3b3JrfVV0aWxgKS5leHRyYWN0RnJvbVNvdXJjZShtb2R1bGUuX3NvdXJjZS5fdmFsdWUpIFxuICAgICAgICBdXG4gICAgICB9XG4gICAgfSlcbiAgfVxuICBlbHNlIHtcbiAgICBsb2d2KG9wdGlvbnMsIGBleHQtY29tcGlsYXRpb25gKVxuICB9XG4gIGlmICh2YXJzLnBsdWdpbkVycm9ycy5sZW5ndGggPT0gMCkge1xuICAgIGNvbXBpbGF0aW9uLmhvb2tzLmh0bWxXZWJwYWNrUGx1Z2luQmVmb3JlSHRtbEdlbmVyYXRpb24udGFwKGBleHQtaHRtbC1nZW5lcmF0aW9uYCwoZGF0YSkgPT4ge1xuICAgICAgLy9jb25zdCBsb2d2ID0gcmVxdWlyZSgnLi9wbHVnaW5VdGlsJykubG9ndlxuICAgICAgbG9ndihvcHRpb25zLCdGVU5DVElPTiBleHQtaHRtbC1nZW5lcmF0aW9uJylcbiAgICBcbiAgICAgIGNvbnN0IHBhdGggPSByZXF1aXJlKCdwYXRoJylcbiAgICAgIHZhciBwdWJsaWNQYXRoID0gJydcbiAgICAgIGlmIChjb21waWxhdGlvbi5vdXRwdXRPcHRpb25zLnB1YmxpY1BhdGggIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHB1YmxpY1BhdGggPSBjb21waWxhdGlvbi5vdXRwdXRPcHRpb25zLnB1YmxpY1BhdGhcbiAgICAgIH1cbiAgICAgIHZhciBqc1BhdGggPSBwYXRoLmpvaW4ocHVibGljUGF0aCx2YXJzLmV4dFBhdGggKyAnL2V4dC5qcycpXG4gICAgICB2YXIgY3NzUGF0aCA9IHBhdGguam9pbihwdWJsaWNQYXRoLHZhcnMuZXh0UGF0aCArICcvZXh0LmNzcycpXG4gICAgICBkYXRhLmFzc2V0cy5qcy51bnNoaWZ0KGpzUGF0aClcbiAgICAgIGRhdGEuYXNzZXRzLmNzcy51bnNoaWZ0KGNzc1BhdGgpXG4gICAgICBsb2codmFycy5hcHAgKyBgQWRkaW5nICR7anNQYXRofSBhbmQgJHtjc3NQYXRofSB0byBpbmRleC5odG1sYClcblxuICAgIH0pXG4gIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGVtaXQoY29tcGlsZXIsIGNvbXBpbGF0aW9uLCB2YXJzLCBvcHRpb25zLCBjYWxsYmFjaykge1xuICB2YXIgYXBwID0gdmFycy5hcHBcbiAgdmFyIGZyYW1ld29yayA9IHZhcnMuZnJhbWV3b3JrXG4gIGNvbnN0IGxvZyA9IHJlcXVpcmUoJy4vcGx1Z2luVXRpbCcpLmxvZ1xuICBjb25zdCBsb2d2ID0gcmVxdWlyZSgnLi9wbHVnaW5VdGlsJykubG9ndlxuICBsb2d2KG9wdGlvbnMsJ0ZVTkNUSU9OIGV4dC1lbWl0JylcbiAgY29uc3QgcGF0aCA9IHJlcXVpcmUoJ3BhdGgnKVxuICBjb25zdCBfYnVpbGRFeHRCdW5kbGUgPSByZXF1aXJlKCcuL3BsdWdpblV0aWwnKS5fYnVpbGRFeHRCdW5kbGVcbiAgbGV0IG91dHB1dFBhdGggPSBwYXRoLmpvaW4oY29tcGlsZXIub3V0cHV0UGF0aCx2YXJzLmV4dFBhdGgpXG4gIGlmIChjb21waWxlci5vdXRwdXRQYXRoID09PSAnLycgJiYgY29tcGlsZXIub3B0aW9ucy5kZXZTZXJ2ZXIpIHtcbiAgICBvdXRwdXRQYXRoID0gcGF0aC5qb2luKGNvbXBpbGVyLm9wdGlvbnMuZGV2U2VydmVyLmNvbnRlbnRCYXNlLCBvdXRwdXRQYXRoKVxuICB9XG4gIGxvZ3Yob3B0aW9ucywnb3V0cHV0UGF0aDogJyArIG91dHB1dFBhdGgpXG4gIGxvZ3Yob3B0aW9ucywnZnJhbWV3b3JrOiAnICsgZnJhbWV3b3JrKVxuICBpZiAoZnJhbWV3b3JrICE9ICdleHRqcycpIHtcbiAgICByZXF1aXJlKGAuL3BsdWdpblV0aWxgKS5fcHJlcGFyZUZvckJ1aWxkKGFwcCwgdmFycywgb3B0aW9ucywgb3V0cHV0UGF0aClcbiAgfVxuICBlbHNlIHtcbiAgICByZXF1aXJlKGAuLyR7ZnJhbWV3b3JrfVV0aWxgKS5fcHJlcGFyZUZvckJ1aWxkKGFwcCwgdmFycywgb3B0aW9ucywgb3V0cHV0UGF0aCwgY29tcGlsYXRpb24pXG4gIH1cbiAgaWYgKHZhcnMucmVidWlsZCA9PSB0cnVlKSB7XG4gICAgdmFyIHBhcm1zID0gWydhcHAnLCAnYnVpbGQnLCBvcHRpb25zLnByb2ZpbGUsIG9wdGlvbnMuZW52aXJvbm1lbnRdXG4gICAgYXdhaXQgX2J1aWxkRXh0QnVuZGxlKGFwcCwgY29tcGlsYXRpb24sIG91dHB1dFBhdGgsIHBhcm1zLCBvcHRpb25zKVxuICAgIGlmICh2YXJzLmJyb3dzZXJDb3VudCA9PSAwICYmIGNvbXBpbGF0aW9uLmVycm9ycy5sZW5ndGggPT0gMCkge1xuICAgICAgdmFyIHVybCA9ICdodHRwOi8vbG9jYWxob3N0OicgKyBvcHRpb25zLnBvcnRcbiAgICAgIGxvZyhhcHAgKyBgT3BlbmluZyBicm93c2VyIGF0ICR7dXJsfWApXG4gICAgICB2YXJzLmJyb3dzZXJDb3VudCsrXG4gICAgICBjb25zdCBvcG4gPSByZXF1aXJlKCdvcG4nKVxuICAgICAgb3BuKHVybClcbiAgICB9XG4gICAgY2FsbGJhY2soKVxuICB9XG4gIGVsc2Uge1xuICAgIGNhbGxiYWNrKClcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gX3ByZXBhcmVGb3JCdWlsZChhcHAsIHZhcnMsIG9wdGlvbnMsIG91dHB1dCkge1xuICBjb25zdCBsb2cgPSByZXF1aXJlKCcuL3BsdWdpblV0aWwnKS5sb2dcbiAgY29uc3QgcmltcmFmID0gcmVxdWlyZSgncmltcmFmJylcbiAgY29uc3QgbWtkaXJwID0gcmVxdWlyZSgnbWtkaXJwJylcbiAgY29uc3QgZnN4ID0gcmVxdWlyZSgnZnMtZXh0cmEnKVxuICBjb25zdCBmcyA9IHJlcXVpcmUoJ2ZzJylcbiAgY29uc3QgcGF0aCA9IHJlcXVpcmUoJ3BhdGgnKVxuXG4gIHZhciBwYWNrYWdlcyA9IG9wdGlvbnMucGFja2FnZXNcbiAgdmFyIHRvb2xraXQgPSBvcHRpb25zLnRvb2xraXRcbiAgdmFyIHRoZW1lID0gb3B0aW9ucy50aGVtZVxuXG4gIHRoZW1lID0gdGhlbWUgfHwgKHRvb2xraXQgPT09ICdjbGFzc2ljJyA/ICd0aGVtZS10cml0b24nIDogJ3RoZW1lLW1hdGVyaWFsJylcbiAgaWYgKHZhcnMuZmlyc3RUaW1lKSB7XG4gICAgcmltcmFmLnN5bmMob3V0cHV0KVxuICAgIG1rZGlycC5zeW5jKG91dHB1dClcbiAgICBjb25zdCBidWlsZFhNTCA9IHJlcXVpcmUoJy4vYXJ0aWZhY3RzJykuYnVpbGRYTUxcbiAgICBjb25zdCBjcmVhdGVBcHBKc29uID0gcmVxdWlyZSgnLi9hcnRpZmFjdHMnKS5jcmVhdGVBcHBKc29uXG4gICAgY29uc3QgY3JlYXRlV29ya3NwYWNlSnNvbiA9IHJlcXVpcmUoJy4vYXJ0aWZhY3RzJykuY3JlYXRlV29ya3NwYWNlSnNvblxuICAgIGNvbnN0IGNyZWF0ZUpTRE9NRW52aXJvbm1lbnQgPSByZXF1aXJlKCcuL2FydGlmYWN0cycpLmNyZWF0ZUpTRE9NRW52aXJvbm1lbnRcbiAgICBmcy53cml0ZUZpbGVTeW5jKHBhdGguam9pbihvdXRwdXQsICdidWlsZC54bWwnKSwgYnVpbGRYTUwoeyBjb21wcmVzczogdmFycy5wcm9kdWN0aW9uIH0pLCAndXRmOCcpXG4gICAgZnMud3JpdGVGaWxlU3luYyhwYXRoLmpvaW4ob3V0cHV0LCAnanNkb20tZW52aXJvbm1lbnQuanMnKSwgY3JlYXRlSlNET01FbnZpcm9ubWVudCgpLCAndXRmOCcpXG4gICAgZnMud3JpdGVGaWxlU3luYyhwYXRoLmpvaW4ob3V0cHV0LCAnYXBwLmpzb24nKSwgY3JlYXRlQXBwSnNvbiggdGhlbWUsIHBhY2thZ2VzLCB0b29sa2l0ICksICd1dGY4JylcbiAgICBmcy53cml0ZUZpbGVTeW5jKHBhdGguam9pbihvdXRwdXQsICd3b3Jrc3BhY2UuanNvbicpLCBjcmVhdGVXb3Jrc3BhY2VKc29uKCksICd1dGY4JylcblxuICAgIGlmIChmcy5leGlzdHNTeW5jKHBhdGguam9pbihwcm9jZXNzLmN3ZCgpLCAncmVzb3VyY2VzLycpKSkge1xuICAgICAgdmFyIGZyb21SZXNvdXJjZXMgPSBwYXRoLmpvaW4ocHJvY2Vzcy5jd2QoKSwgJ3Jlc291cmNlcy8nKVxuICAgICAgdmFyIHRvUmVzb3VyY2VzID0gcGF0aC5qb2luKG91dHB1dCwgJy4uL3Jlc291cmNlcycpXG4gICAgICBmc3guY29weVN5bmMoZnJvbVJlc291cmNlcywgdG9SZXNvdXJjZXMpXG4gICAgICBsb2coYXBwICsgJ0NvcHlpbmcgJyArIGZyb21SZXNvdXJjZXMucmVwbGFjZShwcm9jZXNzLmN3ZCgpLCAnJykgKyAnIHRvOiAnICsgdG9SZXNvdXJjZXMucmVwbGFjZShwcm9jZXNzLmN3ZCgpLCAnJykpXG4gICAgfVxuXG4gICAgaWYgKGZzLmV4aXN0c1N5bmMocGF0aC5qb2luKHByb2Nlc3MuY3dkKCksJ3Jlc291cmNlcy8nKSkpIHtcbiAgICAgIHZhciBmcm9tUmVzb3VyY2VzID0gcGF0aC5qb2luKHByb2Nlc3MuY3dkKCksICdyZXNvdXJjZXMvJylcbiAgICAgIHZhciB0b1Jlc291cmNlcyA9IHBhdGguam9pbihvdXRwdXQsICdyZXNvdXJjZXMnKVxuICAgICAgZnN4LmNvcHlTeW5jKGZyb21SZXNvdXJjZXMsIHRvUmVzb3VyY2VzKVxuICAgICAgbG9nKGFwcCArICdDb3B5aW5nICcgKyBmcm9tUmVzb3VyY2VzLnJlcGxhY2UocHJvY2Vzcy5jd2QoKSwgJycpICsgJyB0bzogJyArIHRvUmVzb3VyY2VzLnJlcGxhY2UocHJvY2Vzcy5jd2QoKSwgJycpKVxuICAgIH1cblxuICAgIGlmIChmcy5leGlzdHNTeW5jKHBhdGguam9pbihwcm9jZXNzLmN3ZCgpLHZhcnMuZXh0UGF0aCArICcvcGFja2FnZXMvJykpKSB7XG4gICAgICB2YXIgZnJvbVBhY2thZ2VzID0gcGF0aC5qb2luKHByb2Nlc3MuY3dkKCksdmFycy5leHRQYXRoICsgJy9wYWNrYWdlcy8nKVxuICAgICAgdmFyIHRvUGFja2FnZXMgPSBwYXRoLmpvaW4ob3V0cHV0LCAncGFja2FnZXMvJylcbiAgICAgIGZzeC5jb3B5U3luYyhmcm9tUGFja2FnZXMsIHRvUGFja2FnZXMpXG4gICAgICBsb2coYXBwICsgJ0NvcHlpbmcgJyArIGZyb21QYWNrYWdlcy5yZXBsYWNlKHByb2Nlc3MuY3dkKCksICcnKSArICcgdG86ICcgKyB0b1BhY2thZ2VzLnJlcGxhY2UocHJvY2Vzcy5jd2QoKSwgJycpKVxuICAgIH1cblxuICAgIGlmIChmcy5leGlzdHNTeW5jKHBhdGguam9pbihwcm9jZXNzLmN3ZCgpLHZhcnMuZXh0UGF0aCArICcvb3ZlcnJpZGVzLycpKSkge1xuICAgICAgdmFyIGZyb21PdmVycmlkZXMgPSBwYXRoLmpvaW4ocHJvY2Vzcy5jd2QoKSx2YXJzLmV4dFBhdGggKyAnL292ZXJyaWRlcy8nKVxuICAgICAgdmFyIHRvT3ZlcnJpZGVzID0gcGF0aC5qb2luKG91dHB1dCwgJ292ZXJyaWRlcy8nKVxuICAgICAgZnN4LmNvcHlTeW5jKGZyb21PdmVycmlkZXMsIHRvT3ZlcnJpZGVzKVxuICAgICAgbG9nKGFwcCArICdDb3B5aW5nICcgKyBmcm9tT3ZlcnJpZGVzLnJlcGxhY2UocHJvY2Vzcy5jd2QoKSwgJycpICsgJyB0bzogJyArIHRvT3ZlcnJpZGVzLnJlcGxhY2UocHJvY2Vzcy5jd2QoKSwgJycpKVxuICAgIH1cbiAgfVxuICB2YXJzLmZpcnN0VGltZSA9IGZhbHNlXG4gIGxldCBqc1xuICBpZiAodmFycy5wcm9kdWN0aW9uKSB7XG4gICAgdmFycy5kZXBzLnB1c2goJ0V4dC5yZXF1aXJlKFwiRXh0LmxheW91dC4qXCIpO1xcbicpXG4gICAganMgPSB2YXJzLmRlcHMuam9pbignO1xcbicpO1xuICB9XG4gIGVsc2Uge1xuICAgIGpzID0gJ0V4dC5yZXF1aXJlKFwiRXh0LipcIiknXG4gIH1cbiAgaWYgKHZhcnMubWFuaWZlc3QgPT09IG51bGwgfHwganMgIT09IHZhcnMubWFuaWZlc3QpIHtcbiAgICB2YXJzLm1hbmlmZXN0ID0ganNcbiAgICBjb25zdCBtYW5pZmVzdCA9IHBhdGguam9pbihvdXRwdXQsICdtYW5pZmVzdC5qcycpXG4gICAgZnMud3JpdGVGaWxlU3luYyhtYW5pZmVzdCwganMsICd1dGY4JylcbiAgICB2YXJzLnJlYnVpbGQgPSB0cnVlXG4gICAgbG9nKGFwcCArICdCdWlsZGluZyBFeHQgYnVuZGxlIGF0OiAnICsgb3V0cHV0LnJlcGxhY2UocHJvY2Vzcy5jd2QoKSwgJycpKVxuICB9XG4gIGVsc2Uge1xuICAgIHZhcnMucmVidWlsZCA9IGZhbHNlXG4gICAgbG9nKGFwcCArICdFeHRSZWFjdCByZWJ1aWxkIE5PVCBuZWVkZWQnKVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfYnVpbGRFeHRCdW5kbGUoYXBwLCBjb21waWxhdGlvbiwgb3V0cHV0UGF0aCwgcGFybXMsIG9wdGlvbnMpIHtcbiAgY29uc3QgZnMgPSByZXF1aXJlKCdmcycpXG4gIGNvbnN0IGxvZ3YgPSByZXF1aXJlKCcuL3BsdWdpblV0aWwnKS5sb2d2XG4gIGxvZ3Yob3B0aW9ucywnRlVOQ1RJT04gX2J1aWxkRXh0QnVuZGxlJylcblxuICBsZXQgc2VuY2hhOyB0cnkgeyBzZW5jaGEgPSByZXF1aXJlKCdAc2VuY2hhL2NtZCcpIH0gY2F0Y2ggKGUpIHsgc2VuY2hhID0gJ3NlbmNoYScgfVxuICBpZiAoZnMuZXhpc3RzU3luYyhzZW5jaGEpKSB7XG4gICAgbG9ndihvcHRpb25zLCdzZW5jaGEgZm9sZGVyIGV4aXN0cycpXG4gIH1cbiAgZWxzZSB7XG4gICAgbG9ndihvcHRpb25zLCdzZW5jaGEgZm9sZGVyIERPRVMgTk9UIGV4aXN0JylcbiAgfVxuXG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICBjb25zdCBvbkJ1aWxkRG9uZSA9ICgpID0+IHtcbiAgICBsb2d2KG9wdGlvbnMsJ29uQnVpbGREb25lJylcbiAgICByZXNvbHZlKClcbiAgIH1cblxuICAgdmFyIG9wdHMgPSB7IGN3ZDogb3V0cHV0UGF0aCwgc2lsZW50OiB0cnVlLCBzdGRpbzogJ3BpcGUnLCBlbmNvZGluZzogJ3V0Zi04J31cblxuICAgZXhlY3V0ZUFzeW5jKGFwcCwgc2VuY2hhLCBwYXJtcywgb3B0cywgY29tcGlsYXRpb24sIG9wdGlvbnMpLnRoZW4gKFxuICAgICBmdW5jdGlvbigpIHsgb25CdWlsZERvbmUoKSB9LCBcbiAgICAgZnVuY3Rpb24ocmVhc29uKSB7IHJlamVjdChyZWFzb24pIH1cbiAgIClcbiB9KVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZXhlY3V0ZUFzeW5jIChhcHAsIGNvbW1hbmQsIHBhcm1zLCBvcHRzLCBjb21waWxhdGlvbiwgb3B0aW9ucykge1xuICAvL2NvbnN0IERFRkFVTFRfU1VCU1RSUyA9IFsnW0lORl0gTG9hZGluZycsICdbSU5GXSBQcm9jZXNzaW5nJywgJ1tMT0ddIEZhc2hpb24gYnVpbGQgY29tcGxldGUnLCAnW0VSUl0nLCAnW1dSTl0nLCBcIltJTkZdIFNlcnZlclwiLCBcIltJTkZdIFdyaXRpbmdcIiwgXCJbSU5GXSBMb2FkaW5nIEJ1aWxkXCIsIFwiW0lORl0gV2FpdGluZ1wiLCBcIltMT0ddIEZhc2hpb24gd2FpdGluZ1wiXTtcbiAgY29uc3QgREVGQVVMVF9TVUJTVFJTID0gWydbSU5GXSBMb2FkaW5nJywgJ1tJTkZdIEFwcGVuZCcsICdbSU5GXSBQcm9jZXNzaW5nJywgJ1tJTkZdIFByb2Nlc3NpbmcgQnVpbGQnLCAnW0xPR10gRmFzaGlvbiBidWlsZCBjb21wbGV0ZScsICdbRVJSXScsICdbV1JOXScsIFwiW0lORl0gU2VydmVyXCIsIFwiW0lORl0gV3JpdGluZ1wiLCBcIltJTkZdIExvYWRpbmcgQnVpbGRcIiwgXCJbSU5GXSBXYWl0aW5nXCIsIFwiW0xPR10gRmFzaGlvbiB3YWl0aW5nXCJdO1xuICB2YXIgc3Vic3RyaW5ncyA9IERFRkFVTFRfU1VCU1RSUyBcbiAgdmFyIGNoYWxrID0gcmVxdWlyZSgnY2hhbGsnKVxuICBjb25zdCBjcm9zc1NwYXduID0gcmVxdWlyZSgnY3Jvc3Mtc3Bhd24nKVxuICBjb25zdCBsb2cgPSByZXF1aXJlKCcuL3BsdWdpblV0aWwnKS5sb2dcbiAgbG9ndihvcHRpb25zLCAnRlVOQ1RJT04gZXhlY3V0ZUFzeW5jJylcbiAgYXdhaXQgbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIGxvZ3Yob3B0aW9ucyxgY29tbWFuZCAtICR7Y29tbWFuZH1gKVxuICAgIGxvZ3Yob3B0aW9ucywgYHBhcm1zIC0gJHtwYXJtc31gKVxuICAgIGxvZ3Yob3B0aW9ucywgYG9wdHMgLSAke0pTT04uc3RyaW5naWZ5KG9wdHMpfWApXG4gICAgbGV0IGNoaWxkID0gY3Jvc3NTcGF3bihjb21tYW5kLCBwYXJtcywgb3B0cylcbiAgICBjaGlsZC5vbignY2xvc2UnLCAoY29kZSwgc2lnbmFsKSA9PiB7XG4gICAgICBsb2d2KG9wdGlvbnMsIGBvbiBjbG9zZWApIFxuICAgICAgaWYoY29kZSA9PT0gMCkgeyByZXNvbHZlKDApIH1cbiAgICAgIGVsc2UgeyBjb21waWxhdGlvbi5lcnJvcnMucHVzaCggbmV3IEVycm9yKGNvZGUpICk7IHJlc29sdmUoMCkgfVxuICAgIH0pXG4gICAgY2hpbGQub24oJ2Vycm9yJywgKGVycm9yKSA9PiB7IFxuICAgICAgbG9ndihvcHRpb25zLCBgb24gZXJyb3JgKSBcbiAgICAgIGNvbXBpbGF0aW9uLmVycm9ycy5wdXNoKGVycm9yKVxuICAgICAgcmVzb2x2ZSgwKVxuICAgIH0pXG4gICAgY2hpbGQuc3Rkb3V0Lm9uKCdkYXRhJywgKGRhdGEpID0+IHtcbiAgICAgIGxvZ3Yob3B0aW9ucywgYG9uIGRhdGFgKSBcbiAgICAgIHZhciBzdHIgPSBkYXRhLnRvU3RyaW5nKCkucmVwbGFjZSgvXFxyP1xcbnxcXHIvZywgXCIgXCIpLnRyaW0oKVxuICAgICAgbG9ndihvcHRpb25zLCBgJHtzdHJ9YClcbiAgICAgIGlmIChkYXRhICYmIGRhdGEudG9TdHJpbmcoKS5tYXRjaCgvV2FpdGluZyBmb3IgY2hhbmdlc1xcLlxcLlxcLi8pKSB7XG4gICAgICAgIHJlc29sdmUoMClcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBpZiAoc3Vic3RyaW5ncy5zb21lKGZ1bmN0aW9uKHYpIHsgcmV0dXJuIGRhdGEuaW5kZXhPZih2KSA+PSAwOyB9KSkgeyBcbiAgICAgICAgICBzdHIgPSBzdHIucmVwbGFjZShcIltJTkZdXCIsIFwiXCIpXG4gICAgICAgICAgc3RyID0gc3RyLnJlcGxhY2UoXCJbTE9HXVwiLCBcIlwiKVxuICAgICAgICAgIHN0ciA9IHN0ci5yZXBsYWNlKHByb2Nlc3MuY3dkKCksICcnKS50cmltKClcbiAgICAgICAgICBpZiAoc3RyLmluY2x1ZGVzKFwiW0VSUl1cIikpIHtcbiAgICAgICAgICAgIGNvbXBpbGF0aW9uLmVycm9ycy5wdXNoKGFwcCArIHN0ci5yZXBsYWNlKC9eXFxbRVJSXFxdIC9naSwgJycpKTtcbiAgICAgICAgICAgIHN0ciA9IHN0ci5yZXBsYWNlKFwiW0VSUl1cIiwgYCR7Y2hhbGsucmVkKFwiW0VSUl1cIil9YClcbiAgICAgICAgICB9XG4gICAgICAgICAgbG9nKGAke2FwcH0ke3N0cn1gKSBcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pXG4gICAgY2hpbGQuc3RkZXJyLm9uKCdkYXRhJywgKGRhdGEpID0+IHtcbiAgICAgIGxvZ3Yob3B0aW9ucywgYGVycm9yIG9uIGNsb3NlYCkgXG4gICAgICB2YXIgc3RyID0gZGF0YS50b1N0cmluZygpLnJlcGxhY2UoL1xccj9cXG58XFxyL2csIFwiIFwiKS50cmltKClcbiAgICAgIHZhciBzdHJKYXZhT3B0cyA9IFwiUGlja2VkIHVwIF9KQVZBX09QVElPTlNcIjtcbiAgICAgIHZhciBpbmNsdWRlcyA9IHN0ci5pbmNsdWRlcyhzdHJKYXZhT3B0cylcbiAgICAgIGlmICghaW5jbHVkZXMpIHtcbiAgICAgICAgY29uc29sZS5sb2coYCR7YXBwfSAke2NoYWxrLnJlZChcIltFUlJdXCIpfSAke3N0cn1gKVxuICAgICAgfVxuICAgIH0pXG4gIH0pXG59XG4iXX0=