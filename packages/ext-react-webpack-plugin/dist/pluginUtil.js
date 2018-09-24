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
} // export function logv(verbose, s) {
//   if (verbose == 'yes') {
//     require('readline').cursorTo(process.stdout, 0)
//     process.stdout.clearLine()
//     process.stdout.write('-v-' + s)
//     process.stdout.write('\n')
//   }
// }


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
  const logv = require('./pluginUtil').logv;

  logv(options, 'FUNCTION _buildExtBundle');
  let sencha;

  try {
    sencha = require('@sencha/cmd');
  } catch (e) {
    sencha = 'sencha';
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9wbHVnaW5VdGlsLmpzIl0sIm5hbWVzIjpbImxvZyIsInMiLCJyZXF1aXJlIiwiY3Vyc29yVG8iLCJwcm9jZXNzIiwic3Rkb3V0IiwiY2xlYXJMaW5lIiwid3JpdGUiLCJsb2d2Iiwib3B0aW9ucyIsInZlcmJvc2UiLCJfY29uc3RydWN0b3IiLCJmcmFtZXdvcmsiLCJ0aGlzVmFycyIsInRoaXNPcHRpb25zIiwicGx1Z2luTmFtZSIsImZzIiwidmFsaWRhdGVPcHRpb25zIiwidW5kZWZpbmVkIiwicGx1Z2luRXJyb3JzIiwicHVzaCIsImRhdGEiLCJwbHVnaW4iLCJ2YXJzIiwiY29uc29sZSIsImdldERlZmF1bHRWYXJzIiwiYXBwIiwiX2dldEFwcCIsInJjIiwiZXhpc3RzU3luYyIsIkpTT04iLCJwYXJzZSIsInJlYWRGaWxlU3luYyIsImdldERlZmF1bHRPcHRpb25zIiwiZW52aXJvbm1lbnQiLCJwcm9kdWN0aW9uIiwiX2dldFZlcnNpb25zIiwiY2hhbGsiLCJwcmVmaXgiLCJwbGF0Zm9ybSIsImdyZWVuIiwiZnJhbWV3b3JrTmFtZSIsInBhdGgiLCJ2IiwicGx1Z2luUGF0aCIsInJlc29sdmUiLCJjd2QiLCJwbHVnaW5Qa2ciLCJwbHVnaW5WZXJzaW9uIiwidmVyc2lvbiIsIndlYnBhY2tQYXRoIiwid2VicGFja1BrZyIsIndlYnBhY2tWZXJzaW9uIiwiZXh0UGF0aCIsImV4dFBrZyIsImV4dFZlcnNpb24iLCJzZW5jaGEiLCJjbWRQYXRoIiwiY21kUGtnIiwiY21kVmVyc2lvbiIsInZlcnNpb25fZnVsbCIsImZyYW1ld29ya0luZm8iLCJmcmFtZXdvcmtQYXRoIiwiZnJhbWV3b3JrUGtnIiwiZnJhbWV3b3JrVmVyc2lvbiIsIl9jb21waWxlIiwiY29tcGlsYXRpb24iLCJsZW5ndGgiLCJlcnJvcnMiLCJFcnJvciIsImpvaW4iLCJob29rcyIsInN1Y2NlZWRNb2R1bGUiLCJ0YXAiLCJtb2R1bGUiLCJyZXNvdXJjZSIsIm1hdGNoIiwiZGVwcyIsImV4dHJhY3RGcm9tU291cmNlIiwiX3NvdXJjZSIsIl92YWx1ZSIsImh0bWxXZWJwYWNrUGx1Z2luQmVmb3JlSHRtbEdlbmVyYXRpb24iLCJwdWJsaWNQYXRoIiwib3V0cHV0T3B0aW9ucyIsImpzUGF0aCIsImNzc1BhdGgiLCJhc3NldHMiLCJqcyIsInVuc2hpZnQiLCJjc3MiLCJlbWl0IiwiY29tcGlsZXIiLCJjYWxsYmFjayIsIl9idWlsZEV4dEJ1bmRsZSIsIm91dHB1dFBhdGgiLCJkZXZTZXJ2ZXIiLCJjb250ZW50QmFzZSIsIl9wcmVwYXJlRm9yQnVpbGQiLCJyZWJ1aWxkIiwicGFybXMiLCJwcm9maWxlIiwiYnJvd3NlckNvdW50IiwidXJsIiwicG9ydCIsIm9wbiIsIm91dHB1dCIsInJpbXJhZiIsIm1rZGlycCIsImZzeCIsInBhY2thZ2VzIiwidG9vbGtpdCIsInRoZW1lIiwiZmlyc3RUaW1lIiwic3luYyIsImJ1aWxkWE1MIiwiY3JlYXRlQXBwSnNvbiIsImNyZWF0ZVdvcmtzcGFjZUpzb24iLCJjcmVhdGVKU0RPTUVudmlyb25tZW50Iiwid3JpdGVGaWxlU3luYyIsImNvbXByZXNzIiwiZnJvbVJlc291cmNlcyIsInRvUmVzb3VyY2VzIiwiY29weVN5bmMiLCJyZXBsYWNlIiwiZnJvbVBhY2thZ2VzIiwidG9QYWNrYWdlcyIsImZyb21PdmVycmlkZXMiLCJ0b092ZXJyaWRlcyIsIm1hbmlmZXN0IiwiZSIsIlByb21pc2UiLCJyZWplY3QiLCJvbkJ1aWxkRG9uZSIsIm9wdHMiLCJzaWxlbnQiLCJzdGRpbyIsImVuY29kaW5nIiwiZXhlY3V0ZUFzeW5jIiwidGhlbiIsInJlYXNvbiIsImNvbW1hbmQiLCJERUZBVUxUX1NVQlNUUlMiLCJzdWJzdHJpbmdzIiwiY3Jvc3NTcGF3biIsInN0cmluZ2lmeSIsImNoaWxkIiwib24iLCJjb2RlIiwic2lnbmFsIiwiZXJyb3IiLCJzdHIiLCJ0b1N0cmluZyIsInRyaW0iLCJzb21lIiwiaW5kZXhPZiIsImluY2x1ZGVzIiwicmVkIiwic3RkZXJy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QUNILFFBQUwsRUFBZTtBQUNibkksZ0JBQUFBLE9BQU8sQ0FBQ3hCLEdBQVIsQ0FBYSxHQUFFMEIsR0FBSSxJQUFHVyxLQUFLLENBQUN1SCxHQUFOLENBQVUsT0FBVixDQUFtQixJQUFHTixHQUFJLEVBQWhEO0FBQ0Q7QUFDRixhQVJEO0FBU0QsV0E1Q0ssQ0FSRDs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBmdW5jdGlvbiBsb2cocykge1xuICByZXF1aXJlKCdyZWFkbGluZScpLmN1cnNvclRvKHByb2Nlc3Muc3Rkb3V0LCAwKVxuICBwcm9jZXNzLnN0ZG91dC5jbGVhckxpbmUoKVxuICBwcm9jZXNzLnN0ZG91dC53cml0ZShzKVxuICBwcm9jZXNzLnN0ZG91dC53cml0ZSgnXFxuJylcbn1cblxuLy8gZXhwb3J0IGZ1bmN0aW9uIGxvZ3YodmVyYm9zZSwgcykge1xuLy8gICBpZiAodmVyYm9zZSA9PSAneWVzJykge1xuLy8gICAgIHJlcXVpcmUoJ3JlYWRsaW5lJykuY3Vyc29yVG8ocHJvY2Vzcy5zdGRvdXQsIDApXG4vLyAgICAgcHJvY2Vzcy5zdGRvdXQuY2xlYXJMaW5lKClcbi8vICAgICBwcm9jZXNzLnN0ZG91dC53cml0ZSgnLXYtJyArIHMpXG4vLyAgICAgcHJvY2Vzcy5zdGRvdXQud3JpdGUoJ1xcbicpXG4vLyAgIH1cbi8vIH1cblxuZXhwb3J0IGZ1bmN0aW9uIGxvZ3Yob3B0aW9ucywgcykge1xuICBpZiAob3B0aW9ucy52ZXJib3NlID09ICd5ZXMnKSB7XG4gICAgcmVxdWlyZSgncmVhZGxpbmUnKS5jdXJzb3JUbyhwcm9jZXNzLnN0ZG91dCwgMClcbiAgICBwcm9jZXNzLnN0ZG91dC5jbGVhckxpbmUoKVxuICAgIHByb2Nlc3Muc3Rkb3V0LndyaXRlKGAtdmVyYm9zZTogJHtzfWApXG4gICAgcHJvY2Vzcy5zdGRvdXQud3JpdGUoJ1xcbicpXG4gIH1cbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gX2NvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgdmFyIGZyYW1ld29yayA9ICcnXG4gIHZhciB0aGlzVmFycyA9IHt9XG4gIHZhciB0aGlzT3B0aW9ucyA9IHt9XG4gIHZhciBwbHVnaW5OYW1lID0gJydcbiAgY29uc3QgZnMgPSByZXF1aXJlKCdmcycpXG4gIGNvbnN0IHZhbGlkYXRlT3B0aW9ucyA9IHJlcXVpcmUoJ3NjaGVtYS11dGlscycpXG4gIHZhbGlkYXRlT3B0aW9ucyhyZXF1aXJlKCcuLi9vcHRpb25zLmpzb24nKSwgb3B0aW9ucywgJycpXG4gIGlmIChvcHRpb25zLmZyYW1ld29yayA9PSB1bmRlZmluZWQpIFxuICAgIHtcbiAgICAgIHRoaXNWYXJzLnBsdWdpbkVycm9ycyA9IFtdXG4gICAgICB0aGlzVmFycy5wbHVnaW5FcnJvcnMucHVzaCgnd2VicGFjayBjb25maWc6IGZyYW1ld29yayBwYXJhbWV0ZXIgb24gZXh0LXdlYnBhY2stcGx1Z2luIGlzIG5vdCBkZWZpbmVkIC0gdmFsdWVzOiByZWFjdCwgYW5ndWxhciwgZXh0anMnKVxuICAgICAgdmFyIGRhdGEgPSB7fVxuICAgICAgZGF0YS5wbHVnaW4gPSB7fVxuICAgICAgZGF0YS5wbHVnaW4udmFycyA9IHRoaXNWYXJzXG4gICAgICBjb25zb2xlLmxvZyhkYXRhKVxuICAgICAgcmV0dXJuIGRhdGFcbiAgICB9XG4gIGlmIChvcHRpb25zLmZyYW1ld29yayA9PSAnZXh0anMnKSBcbiAgICB7XG4gICAgICBmcmFtZXdvcmsgPSAnZXh0anMnXG4gICAgICBwbHVnaW5OYW1lID0gYGV4dC13ZWJwYWNrLXBsdWdpbmBcbiAgICB9XG4gIGVsc2UgXG4gICAge1xuICAgICAgZnJhbWV3b3JrID0gb3B0aW9ucy5mcmFtZXdvcmtcbiAgICAgIHBsdWdpbk5hbWUgPSBgZXh0LSR7ZnJhbWV3b3JrfS13ZWJwYWNrLXBsdWdpbmBcbiAgICB9XG4gIHRoaXNWYXJzID0gcmVxdWlyZShgLi8ke2ZyYW1ld29ya31VdGlsYCkuZ2V0RGVmYXVsdFZhcnMoKVxuICB0aGlzVmFycy5mcmFtZXdvcmsgPSBmcmFtZXdvcmtcbiAgdGhpc1ZhcnMuYXBwID0gcmVxdWlyZSgnLi9wbHVnaW5VdGlsJykuX2dldEFwcCgpXG4gIGxvZ3Yob3B0aW9ucywgYHBsdWdpbk5hbWUgLSAke3BsdWdpbk5hbWV9YClcbiAgbG9ndihvcHRpb25zLCBgdGhpc1ZhcnMuYXBwIC0gJHt0aGlzVmFycy5hcHB9YClcbiAgY29uc3QgcmMgPSAoZnMuZXhpc3RzU3luYyhgLmV4dC0ke3RoaXNWYXJzLmZyYW1ld29ya31yY2ApICYmIEpTT04ucGFyc2UoZnMucmVhZEZpbGVTeW5jKGAuZXh0LSR7dGhpc1ZhcnMuZnJhbWV3b3JrfXJjYCwgJ3V0Zi04JykpIHx8IHt9KVxuICB0aGlzT3B0aW9ucyA9IHsgLi4ucmVxdWlyZShgLi8ke3RoaXNWYXJzLmZyYW1ld29ya31VdGlsYCkuZ2V0RGVmYXVsdE9wdGlvbnMoKSwgLi4ub3B0aW9ucywgLi4ucmMgfVxuICBpZiAodGhpc09wdGlvbnMuZW52aXJvbm1lbnQgPT0gJ3Byb2R1Y3Rpb24nKSBcbiAgICB7dGhpc1ZhcnMucHJvZHVjdGlvbiA9IHRydWV9XG4gIGVsc2UgXG4gICAge3RoaXNWYXJzLnByb2R1Y3Rpb24gPSBmYWxzZX1cbiAgbG9nKHJlcXVpcmUoJy4vcGx1Z2luVXRpbCcpLl9nZXRWZXJzaW9ucyh0aGlzVmFycy5hcHAsIHBsdWdpbk5hbWUsIHRoaXNWYXJzLmZyYW1ld29yaykpXG4gIGxvZyh0aGlzVmFycy5hcHAgKyAnQnVpbGRpbmcgZm9yICcgKyB0aGlzT3B0aW9ucy5lbnZpcm9ubWVudClcblxuICB2YXIgZGF0YSA9IHt9XG4gIGRhdGEucGx1Z2luID0ge31cbiAgZGF0YS5wbHVnaW4uYXBwID0gdGhpc1ZhcnMuYXBwXG4gIGRhdGEucGx1Z2luLmZyYW1ld29yayA9IHRoaXNWYXJzLmZyYW1ld29ya1xuICBkYXRhLnBsdWdpbi52YXJzID0gdGhpc1ZhcnNcbiAgZGF0YS5wbHVnaW4ub3B0aW9ucyA9IHRoaXNPcHRpb25zXG4gIHJldHVybiBkYXRhXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfZ2V0QXBwKCkge1xuICB2YXIgY2hhbGsgPSByZXF1aXJlKCdjaGFsaycpXG4gIHZhciBwcmVmaXggPSBgYFxuICBjb25zdCBwbGF0Zm9ybSA9IHJlcXVpcmUoJ29zJykucGxhdGZvcm0oKVxuICBpZiAocGxhdGZvcm0gPT0gJ2RhcndpbicpIHsgcHJlZml4ID0gYOKEuSDvvaJleHTvvaM6YCB9XG4gIGVsc2UgeyBwcmVmaXggPSBgaSBbZXh0XTpgIH1cbiAgcmV0dXJuIGAke2NoYWxrLmdyZWVuKHByZWZpeCl9IGBcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9nZXRWZXJzaW9ucyhhcHAsIHBsdWdpbk5hbWUsIGZyYW1ld29ya05hbWUpIHtcbiAgY29uc3QgcGF0aCA9IHJlcXVpcmUoJ3BhdGgnKVxuICBjb25zdCBmcyA9IHJlcXVpcmUoJ2ZzJylcblxuICB2YXIgdiA9IHt9XG4gIHZhciBwbHVnaW5QYXRoID0gcGF0aC5yZXNvbHZlKHByb2Nlc3MuY3dkKCksJ25vZGVfbW9kdWxlcy9Ac2VuY2hhJywgcGx1Z2luTmFtZSlcbiAgdmFyIHBsdWdpblBrZyA9IChmcy5leGlzdHNTeW5jKHBsdWdpblBhdGgrJy9wYWNrYWdlLmpzb24nKSAmJiBKU09OLnBhcnNlKGZzLnJlYWRGaWxlU3luYyhwbHVnaW5QYXRoKycvcGFja2FnZS5qc29uJywgJ3V0Zi04JykpIHx8IHt9KTtcbiAgdi5wbHVnaW5WZXJzaW9uID0gcGx1Z2luUGtnLnZlcnNpb25cblxuICB2YXIgd2VicGFja1BhdGggPSBwYXRoLnJlc29sdmUocHJvY2Vzcy5jd2QoKSwnbm9kZV9tb2R1bGVzL3dlYnBhY2snKVxuICB2YXIgd2VicGFja1BrZyA9IChmcy5leGlzdHNTeW5jKHdlYnBhY2tQYXRoKycvcGFja2FnZS5qc29uJykgJiYgSlNPTi5wYXJzZShmcy5yZWFkRmlsZVN5bmMod2VicGFja1BhdGgrJy9wYWNrYWdlLmpzb24nLCAndXRmLTgnKSkgfHwge30pO1xuICB2LndlYnBhY2tWZXJzaW9uID0gd2VicGFja1BrZy52ZXJzaW9uXG5cbiAgdmFyIGV4dFBhdGggPSBwYXRoLnJlc29sdmUocHJvY2Vzcy5jd2QoKSwnbm9kZV9tb2R1bGVzL0BzZW5jaGEvZXh0JylcbiAgdmFyIGV4dFBrZyA9IChmcy5leGlzdHNTeW5jKGV4dFBhdGgrJy9wYWNrYWdlLmpzb24nKSAmJiBKU09OLnBhcnNlKGZzLnJlYWRGaWxlU3luYyhleHRQYXRoKycvcGFja2FnZS5qc29uJywgJ3V0Zi04JykpIHx8IHt9KTtcbiAgdi5leHRWZXJzaW9uID0gZXh0UGtnLnNlbmNoYS52ZXJzaW9uXG5cbiAgdmFyIGNtZFBhdGggPSBwYXRoLnJlc29sdmUocGx1Z2luUGF0aCwnbm9kZV9tb2R1bGVzL0BzZW5jaGEvY21kJylcbiAgdmFyIGNtZFBrZyA9IChmcy5leGlzdHNTeW5jKGNtZFBhdGgrJy9wYWNrYWdlLmpzb24nKSAmJiBKU09OLnBhcnNlKGZzLnJlYWRGaWxlU3luYyhjbWRQYXRoKycvcGFja2FnZS5qc29uJywgJ3V0Zi04JykpIHx8IHt9KTtcbiAgdi5jbWRWZXJzaW9uID0gY21kUGtnLnZlcnNpb25fZnVsbFxuXG4gIHZhciBmcmFtZXdvcmtJbmZvID0gJydcbiAgaWYgKGZyYW1ld29ya05hbWUgIT0gdW5kZWZpbmVkICYmIGZyYW1ld29ya05hbWUgIT0gJ2V4dGpzJykge1xuICAgIHZhciBmcmFtZXdvcmtQYXRoID0gcGF0aC5yZXNvbHZlKHByb2Nlc3MuY3dkKCksJ25vZGVfbW9kdWxlcycsIGZyYW1ld29ya05hbWUpXG4gICAgdmFyIGZyYW1ld29ya1BrZyA9IChmcy5leGlzdHNTeW5jKGZyYW1ld29ya1BhdGgrJy9wYWNrYWdlLmpzb24nKSAmJiBKU09OLnBhcnNlKGZzLnJlYWRGaWxlU3luYyhmcmFtZXdvcmtQYXRoKycvcGFja2FnZS5qc29uJywgJ3V0Zi04JykpIHx8IHt9KTtcbiAgICB2LmZyYW1ld29ya1ZlcnNpb24gPSBmcmFtZXdvcmtQa2cudmVyc2lvblxuICAgIGZyYW1ld29ya0luZm8gPSAnLCAnICsgZnJhbWV3b3JrTmFtZSArICcgdicgKyB2LmZyYW1ld29ya1ZlcnNpb25cbiAgfVxuXG4gIHJldHVybiBhcHAgKyAnZXh0LXdlYnBhY2stcGx1Z2luIHYnICsgdi5wbHVnaW5WZXJzaW9uICsgJywgRXh0IEpTIHYnICsgdi5leHRWZXJzaW9uICsgJywgU2VuY2hhIENtZCB2JyArIHYuY21kVmVyc2lvbiArICcsIHdlYnBhY2sgdicgKyB2LndlYnBhY2tWZXJzaW9uICsgZnJhbWV3b3JrSW5mb1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX2NvbXBpbGUoY29tcGlsYXRpb24sIHZhcnMsIG9wdGlvbnMpIHtcbiAgaWYgKHZhcnMucGx1Z2luRXJyb3JzLmxlbmd0aCA+IDApIHtcbiAgICBjb21waWxhdGlvbi5lcnJvcnMucHVzaCggbmV3IEVycm9yKHZhcnMucGx1Z2luRXJyb3JzLmpvaW4oXCJcIikpIClcbiAgICByZXR1cm5cbiAgfVxuICBjb25zdCBsb2cgPSByZXF1aXJlKCcuL3BsdWdpblV0aWwnKS5sb2dcbiAgY29uc3QgbG9ndiA9IHJlcXVpcmUoJy4vcGx1Z2luVXRpbCcpLmxvZ3ZcbiAgaWYgKHZhcnMucHJvZHVjdGlvbikge1xuICAgIGxvZ3Yob3B0aW9ucyxgZXh0LWNvbXBpbGF0aW9uLXByb2R1Y3Rpb25gKVxuICAgIGNvbXBpbGF0aW9uLmhvb2tzLnN1Y2NlZWRNb2R1bGUudGFwKGBleHQtc3VjY2VlZC1tb2R1bGVgLCAobW9kdWxlKSA9PiB7XG4gICAgICBpZiAobW9kdWxlLnJlc291cmNlICYmIG1vZHVsZS5yZXNvdXJjZS5tYXRjaCgvXFwuKGp8dClzeD8kLykgJiYgIW1vZHVsZS5yZXNvdXJjZS5tYXRjaCgvbm9kZV9tb2R1bGVzLykgJiYgIW1vZHVsZS5yZXNvdXJjZS5tYXRjaCgnL2V4dC1yZWFjdC9kaXN0LycpKSB7XG4gICAgICAgIHZhcnMuZGVwcyA9IFsgXG4gICAgICAgICAgLi4uKHZhcnMuZGVwcyB8fCBbXSksIFxuICAgICAgICAgIC4uLnJlcXVpcmUoYC4vJHt2YXJzLmZyYW1ld29ya31VdGlsYCkuZXh0cmFjdEZyb21Tb3VyY2UobW9kdWxlLl9zb3VyY2UuX3ZhbHVlKSBcbiAgICAgICAgXVxuICAgICAgfVxuICAgIH0pXG4gIH1cbiAgZWxzZSB7XG4gICAgbG9ndihvcHRpb25zLCBgZXh0LWNvbXBpbGF0aW9uYClcbiAgfVxuICBpZiAodmFycy5wbHVnaW5FcnJvcnMubGVuZ3RoID09IDApIHtcbiAgICBjb21waWxhdGlvbi5ob29rcy5odG1sV2VicGFja1BsdWdpbkJlZm9yZUh0bWxHZW5lcmF0aW9uLnRhcChgZXh0LWh0bWwtZ2VuZXJhdGlvbmAsKGRhdGEpID0+IHtcbiAgICAgIC8vY29uc3QgbG9ndiA9IHJlcXVpcmUoJy4vcGx1Z2luVXRpbCcpLmxvZ3ZcbiAgICAgIGxvZ3Yob3B0aW9ucywnRlVOQ1RJT04gZXh0LWh0bWwtZ2VuZXJhdGlvbicpXG4gICAgXG4gICAgICBjb25zdCBwYXRoID0gcmVxdWlyZSgncGF0aCcpXG4gICAgICB2YXIgcHVibGljUGF0aCA9ICcnXG4gICAgICBpZiAoY29tcGlsYXRpb24ub3V0cHV0T3B0aW9ucy5wdWJsaWNQYXRoICE9IHVuZGVmaW5lZCkge1xuICAgICAgICBwdWJsaWNQYXRoID0gY29tcGlsYXRpb24ub3V0cHV0T3B0aW9ucy5wdWJsaWNQYXRoXG4gICAgICB9XG4gICAgICB2YXIganNQYXRoID0gcGF0aC5qb2luKHB1YmxpY1BhdGgsdmFycy5leHRQYXRoICsgJy9leHQuanMnKVxuICAgICAgdmFyIGNzc1BhdGggPSBwYXRoLmpvaW4ocHVibGljUGF0aCx2YXJzLmV4dFBhdGggKyAnL2V4dC5jc3MnKVxuICAgICAgZGF0YS5hc3NldHMuanMudW5zaGlmdChqc1BhdGgpXG4gICAgICBkYXRhLmFzc2V0cy5jc3MudW5zaGlmdChjc3NQYXRoKVxuICAgICAgbG9nKHZhcnMuYXBwICsgYEFkZGluZyAke2pzUGF0aH0gYW5kICR7Y3NzUGF0aH0gdG8gaW5kZXguaHRtbGApXG5cbiAgICB9KVxuICB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBlbWl0KGNvbXBpbGVyLCBjb21waWxhdGlvbiwgdmFycywgb3B0aW9ucywgY2FsbGJhY2spIHtcbiAgdmFyIGFwcCA9IHZhcnMuYXBwXG4gIHZhciBmcmFtZXdvcmsgPSB2YXJzLmZyYW1ld29ya1xuICBjb25zdCBsb2cgPSByZXF1aXJlKCcuL3BsdWdpblV0aWwnKS5sb2dcbiAgY29uc3QgbG9ndiA9IHJlcXVpcmUoJy4vcGx1Z2luVXRpbCcpLmxvZ3ZcbiAgbG9ndihvcHRpb25zLCdGVU5DVElPTiBleHQtZW1pdCcpXG4gIGNvbnN0IHBhdGggPSByZXF1aXJlKCdwYXRoJylcbiAgY29uc3QgX2J1aWxkRXh0QnVuZGxlID0gcmVxdWlyZSgnLi9wbHVnaW5VdGlsJykuX2J1aWxkRXh0QnVuZGxlXG4gIGxldCBvdXRwdXRQYXRoID0gcGF0aC5qb2luKGNvbXBpbGVyLm91dHB1dFBhdGgsdmFycy5leHRQYXRoKVxuICBpZiAoY29tcGlsZXIub3V0cHV0UGF0aCA9PT0gJy8nICYmIGNvbXBpbGVyLm9wdGlvbnMuZGV2U2VydmVyKSB7XG4gICAgb3V0cHV0UGF0aCA9IHBhdGguam9pbihjb21waWxlci5vcHRpb25zLmRldlNlcnZlci5jb250ZW50QmFzZSwgb3V0cHV0UGF0aClcbiAgfVxuICBsb2d2KG9wdGlvbnMsJ291dHB1dFBhdGg6ICcgKyBvdXRwdXRQYXRoKVxuICBsb2d2KG9wdGlvbnMsJ2ZyYW1ld29yazogJyArIGZyYW1ld29yaylcbiAgaWYgKGZyYW1ld29yayAhPSAnZXh0anMnKSB7XG4gICAgcmVxdWlyZShgLi9wbHVnaW5VdGlsYCkuX3ByZXBhcmVGb3JCdWlsZChhcHAsIHZhcnMsIG9wdGlvbnMsIG91dHB1dFBhdGgpXG4gIH1cbiAgZWxzZSB7XG4gICAgcmVxdWlyZShgLi8ke2ZyYW1ld29ya31VdGlsYCkuX3ByZXBhcmVGb3JCdWlsZChhcHAsIHZhcnMsIG9wdGlvbnMsIG91dHB1dFBhdGgsIGNvbXBpbGF0aW9uKVxuICB9XG4gIGlmICh2YXJzLnJlYnVpbGQgPT0gdHJ1ZSkge1xuICAgIHZhciBwYXJtcyA9IFsnYXBwJywgJ2J1aWxkJywgb3B0aW9ucy5wcm9maWxlLCBvcHRpb25zLmVudmlyb25tZW50XVxuICAgIGF3YWl0IF9idWlsZEV4dEJ1bmRsZShhcHAsIGNvbXBpbGF0aW9uLCBvdXRwdXRQYXRoLCBwYXJtcywgb3B0aW9ucylcbiAgICBpZiAodmFycy5icm93c2VyQ291bnQgPT0gMCAmJiBjb21waWxhdGlvbi5lcnJvcnMubGVuZ3RoID09IDApIHtcbiAgICAgIHZhciB1cmwgPSAnaHR0cDovL2xvY2FsaG9zdDonICsgb3B0aW9ucy5wb3J0XG4gICAgICBsb2coYXBwICsgYE9wZW5pbmcgYnJvd3NlciBhdCAke3VybH1gKVxuICAgICAgdmFycy5icm93c2VyQ291bnQrK1xuICAgICAgY29uc3Qgb3BuID0gcmVxdWlyZSgnb3BuJylcbiAgICAgIG9wbih1cmwpXG4gICAgfVxuICAgIGNhbGxiYWNrKClcbiAgfVxuICBlbHNlIHtcbiAgICBjYWxsYmFjaygpXG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9wcmVwYXJlRm9yQnVpbGQoYXBwLCB2YXJzLCBvcHRpb25zLCBvdXRwdXQpIHtcbiAgY29uc3QgbG9nID0gcmVxdWlyZSgnLi9wbHVnaW5VdGlsJykubG9nXG4gIGNvbnN0IHJpbXJhZiA9IHJlcXVpcmUoJ3JpbXJhZicpXG4gIGNvbnN0IG1rZGlycCA9IHJlcXVpcmUoJ21rZGlycCcpXG4gIGNvbnN0IGZzeCA9IHJlcXVpcmUoJ2ZzLWV4dHJhJylcbiAgY29uc3QgZnMgPSByZXF1aXJlKCdmcycpXG4gIGNvbnN0IHBhdGggPSByZXF1aXJlKCdwYXRoJylcblxuICB2YXIgcGFja2FnZXMgPSBvcHRpb25zLnBhY2thZ2VzXG4gIHZhciB0b29sa2l0ID0gb3B0aW9ucy50b29sa2l0XG4gIHZhciB0aGVtZSA9IG9wdGlvbnMudGhlbWVcblxuICB0aGVtZSA9IHRoZW1lIHx8ICh0b29sa2l0ID09PSAnY2xhc3NpYycgPyAndGhlbWUtdHJpdG9uJyA6ICd0aGVtZS1tYXRlcmlhbCcpXG4gIGlmICh2YXJzLmZpcnN0VGltZSkge1xuICAgIHJpbXJhZi5zeW5jKG91dHB1dClcbiAgICBta2RpcnAuc3luYyhvdXRwdXQpXG4gICAgY29uc3QgYnVpbGRYTUwgPSByZXF1aXJlKCcuL2FydGlmYWN0cycpLmJ1aWxkWE1MXG4gICAgY29uc3QgY3JlYXRlQXBwSnNvbiA9IHJlcXVpcmUoJy4vYXJ0aWZhY3RzJykuY3JlYXRlQXBwSnNvblxuICAgIGNvbnN0IGNyZWF0ZVdvcmtzcGFjZUpzb24gPSByZXF1aXJlKCcuL2FydGlmYWN0cycpLmNyZWF0ZVdvcmtzcGFjZUpzb25cbiAgICBjb25zdCBjcmVhdGVKU0RPTUVudmlyb25tZW50ID0gcmVxdWlyZSgnLi9hcnRpZmFjdHMnKS5jcmVhdGVKU0RPTUVudmlyb25tZW50XG4gICAgZnMud3JpdGVGaWxlU3luYyhwYXRoLmpvaW4ob3V0cHV0LCAnYnVpbGQueG1sJyksIGJ1aWxkWE1MKHsgY29tcHJlc3M6IHZhcnMucHJvZHVjdGlvbiB9KSwgJ3V0ZjgnKVxuICAgIGZzLndyaXRlRmlsZVN5bmMocGF0aC5qb2luKG91dHB1dCwgJ2pzZG9tLWVudmlyb25tZW50LmpzJyksIGNyZWF0ZUpTRE9NRW52aXJvbm1lbnQoKSwgJ3V0ZjgnKVxuICAgIGZzLndyaXRlRmlsZVN5bmMocGF0aC5qb2luKG91dHB1dCwgJ2FwcC5qc29uJyksIGNyZWF0ZUFwcEpzb24oIHRoZW1lLCBwYWNrYWdlcywgdG9vbGtpdCApLCAndXRmOCcpXG4gICAgZnMud3JpdGVGaWxlU3luYyhwYXRoLmpvaW4ob3V0cHV0LCAnd29ya3NwYWNlLmpzb24nKSwgY3JlYXRlV29ya3NwYWNlSnNvbigpLCAndXRmOCcpXG5cbiAgICBpZiAoZnMuZXhpc3RzU3luYyhwYXRoLmpvaW4ocHJvY2Vzcy5jd2QoKSwgJ3Jlc291cmNlcy8nKSkpIHtcbiAgICAgIHZhciBmcm9tUmVzb3VyY2VzID0gcGF0aC5qb2luKHByb2Nlc3MuY3dkKCksICdyZXNvdXJjZXMvJylcbiAgICAgIHZhciB0b1Jlc291cmNlcyA9IHBhdGguam9pbihvdXRwdXQsICcuLi9yZXNvdXJjZXMnKVxuICAgICAgZnN4LmNvcHlTeW5jKGZyb21SZXNvdXJjZXMsIHRvUmVzb3VyY2VzKVxuICAgICAgbG9nKGFwcCArICdDb3B5aW5nICcgKyBmcm9tUmVzb3VyY2VzLnJlcGxhY2UocHJvY2Vzcy5jd2QoKSwgJycpICsgJyB0bzogJyArIHRvUmVzb3VyY2VzLnJlcGxhY2UocHJvY2Vzcy5jd2QoKSwgJycpKVxuICAgIH1cblxuICAgIGlmIChmcy5leGlzdHNTeW5jKHBhdGguam9pbihwcm9jZXNzLmN3ZCgpLCdyZXNvdXJjZXMvJykpKSB7XG4gICAgICB2YXIgZnJvbVJlc291cmNlcyA9IHBhdGguam9pbihwcm9jZXNzLmN3ZCgpLCAncmVzb3VyY2VzLycpXG4gICAgICB2YXIgdG9SZXNvdXJjZXMgPSBwYXRoLmpvaW4ob3V0cHV0LCAncmVzb3VyY2VzJylcbiAgICAgIGZzeC5jb3B5U3luYyhmcm9tUmVzb3VyY2VzLCB0b1Jlc291cmNlcylcbiAgICAgIGxvZyhhcHAgKyAnQ29weWluZyAnICsgZnJvbVJlc291cmNlcy5yZXBsYWNlKHByb2Nlc3MuY3dkKCksICcnKSArICcgdG86ICcgKyB0b1Jlc291cmNlcy5yZXBsYWNlKHByb2Nlc3MuY3dkKCksICcnKSlcbiAgICB9XG5cbiAgICBpZiAoZnMuZXhpc3RzU3luYyhwYXRoLmpvaW4ocHJvY2Vzcy5jd2QoKSx2YXJzLmV4dFBhdGggKyAnL3BhY2thZ2VzLycpKSkge1xuICAgICAgdmFyIGZyb21QYWNrYWdlcyA9IHBhdGguam9pbihwcm9jZXNzLmN3ZCgpLHZhcnMuZXh0UGF0aCArICcvcGFja2FnZXMvJylcbiAgICAgIHZhciB0b1BhY2thZ2VzID0gcGF0aC5qb2luKG91dHB1dCwgJ3BhY2thZ2VzLycpXG4gICAgICBmc3guY29weVN5bmMoZnJvbVBhY2thZ2VzLCB0b1BhY2thZ2VzKVxuICAgICAgbG9nKGFwcCArICdDb3B5aW5nICcgKyBmcm9tUGFja2FnZXMucmVwbGFjZShwcm9jZXNzLmN3ZCgpLCAnJykgKyAnIHRvOiAnICsgdG9QYWNrYWdlcy5yZXBsYWNlKHByb2Nlc3MuY3dkKCksICcnKSlcbiAgICB9XG5cbiAgICBpZiAoZnMuZXhpc3RzU3luYyhwYXRoLmpvaW4ocHJvY2Vzcy5jd2QoKSx2YXJzLmV4dFBhdGggKyAnL292ZXJyaWRlcy8nKSkpIHtcbiAgICAgIHZhciBmcm9tT3ZlcnJpZGVzID0gcGF0aC5qb2luKHByb2Nlc3MuY3dkKCksdmFycy5leHRQYXRoICsgJy9vdmVycmlkZXMvJylcbiAgICAgIHZhciB0b092ZXJyaWRlcyA9IHBhdGguam9pbihvdXRwdXQsICdvdmVycmlkZXMvJylcbiAgICAgIGZzeC5jb3B5U3luYyhmcm9tT3ZlcnJpZGVzLCB0b092ZXJyaWRlcylcbiAgICAgIGxvZyhhcHAgKyAnQ29weWluZyAnICsgZnJvbU92ZXJyaWRlcy5yZXBsYWNlKHByb2Nlc3MuY3dkKCksICcnKSArICcgdG86ICcgKyB0b092ZXJyaWRlcy5yZXBsYWNlKHByb2Nlc3MuY3dkKCksICcnKSlcbiAgICB9XG4gIH1cbiAgdmFycy5maXJzdFRpbWUgPSBmYWxzZVxuICBsZXQganNcbiAgaWYgKHZhcnMucHJvZHVjdGlvbikge1xuICAgIHZhcnMuZGVwcy5wdXNoKCdFeHQucmVxdWlyZShcIkV4dC5sYXlvdXQuKlwiKTtcXG4nKVxuICAgIGpzID0gdmFycy5kZXBzLmpvaW4oJztcXG4nKTtcbiAgfVxuICBlbHNlIHtcbiAgICBqcyA9ICdFeHQucmVxdWlyZShcIkV4dC4qXCIpJ1xuICB9XG4gIGlmICh2YXJzLm1hbmlmZXN0ID09PSBudWxsIHx8IGpzICE9PSB2YXJzLm1hbmlmZXN0KSB7XG4gICAgdmFycy5tYW5pZmVzdCA9IGpzXG4gICAgY29uc3QgbWFuaWZlc3QgPSBwYXRoLmpvaW4ob3V0cHV0LCAnbWFuaWZlc3QuanMnKVxuICAgIGZzLndyaXRlRmlsZVN5bmMobWFuaWZlc3QsIGpzLCAndXRmOCcpXG4gICAgdmFycy5yZWJ1aWxkID0gdHJ1ZVxuICAgIGxvZyhhcHAgKyAnQnVpbGRpbmcgRXh0IGJ1bmRsZSBhdDogJyArIG91dHB1dC5yZXBsYWNlKHByb2Nlc3MuY3dkKCksICcnKSlcbiAgfVxuICBlbHNlIHtcbiAgICB2YXJzLnJlYnVpbGQgPSBmYWxzZVxuICAgIGxvZyhhcHAgKyAnRXh0UmVhY3QgcmVidWlsZCBOT1QgbmVlZGVkJylcbiAgfVxufVxuXG5cblxuZXhwb3J0IGZ1bmN0aW9uIF9idWlsZEV4dEJ1bmRsZShhcHAsIGNvbXBpbGF0aW9uLCBvdXRwdXRQYXRoLCBwYXJtcywgb3B0aW9ucykge1xuICBjb25zdCBsb2d2ID0gcmVxdWlyZSgnLi9wbHVnaW5VdGlsJykubG9ndlxuICBsb2d2KG9wdGlvbnMsJ0ZVTkNUSU9OIF9idWlsZEV4dEJ1bmRsZScpXG5cbiAgbGV0IHNlbmNoYTsgdHJ5IHsgc2VuY2hhID0gcmVxdWlyZSgnQHNlbmNoYS9jbWQnKSB9IGNhdGNoIChlKSB7IHNlbmNoYSA9ICdzZW5jaGEnIH1cblxuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgY29uc3Qgb25CdWlsZERvbmUgPSAoKSA9PiB7XG4gICAgbG9ndihvcHRpb25zLCdvbkJ1aWxkRG9uZScpXG4gICAgcmVzb2x2ZSgpXG4gICB9XG5cbiAgIHZhciBvcHRzID0geyBjd2Q6IG91dHB1dFBhdGgsIHNpbGVudDogdHJ1ZSwgc3RkaW86ICdwaXBlJywgZW5jb2Rpbmc6ICd1dGYtOCd9XG5cbiAgIGV4ZWN1dGVBc3luYyhhcHAsIHNlbmNoYSwgcGFybXMsIG9wdHMsIGNvbXBpbGF0aW9uLCBvcHRpb25zKS50aGVuIChcbiAgICAgZnVuY3Rpb24oKSB7IG9uQnVpbGREb25lKCkgfSwgXG4gICAgIGZ1bmN0aW9uKHJlYXNvbikgeyByZWplY3QocmVhc29uKSB9XG4gICApXG4gfSlcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGV4ZWN1dGVBc3luYyAoYXBwLCBjb21tYW5kLCBwYXJtcywgb3B0cywgY29tcGlsYXRpb24sIG9wdGlvbnMpIHtcbiAgLy9jb25zdCBERUZBVUxUX1NVQlNUUlMgPSBbJ1tJTkZdIExvYWRpbmcnLCAnW0lORl0gUHJvY2Vzc2luZycsICdbTE9HXSBGYXNoaW9uIGJ1aWxkIGNvbXBsZXRlJywgJ1tFUlJdJywgJ1tXUk5dJywgXCJbSU5GXSBTZXJ2ZXJcIiwgXCJbSU5GXSBXcml0aW5nXCIsIFwiW0lORl0gTG9hZGluZyBCdWlsZFwiLCBcIltJTkZdIFdhaXRpbmdcIiwgXCJbTE9HXSBGYXNoaW9uIHdhaXRpbmdcIl07XG4gIGNvbnN0IERFRkFVTFRfU1VCU1RSUyA9IFsnW0lORl0gTG9hZGluZycsICdbSU5GXSBBcHBlbmQnLCAnW0lORl0gUHJvY2Vzc2luZycsICdbSU5GXSBQcm9jZXNzaW5nIEJ1aWxkJywgJ1tMT0ddIEZhc2hpb24gYnVpbGQgY29tcGxldGUnLCAnW0VSUl0nLCAnW1dSTl0nLCBcIltJTkZdIFNlcnZlclwiLCBcIltJTkZdIFdyaXRpbmdcIiwgXCJbSU5GXSBMb2FkaW5nIEJ1aWxkXCIsIFwiW0lORl0gV2FpdGluZ1wiLCBcIltMT0ddIEZhc2hpb24gd2FpdGluZ1wiXTtcbiAgdmFyIHN1YnN0cmluZ3MgPSBERUZBVUxUX1NVQlNUUlMgXG4gIHZhciBjaGFsayA9IHJlcXVpcmUoJ2NoYWxrJylcbiAgY29uc3QgY3Jvc3NTcGF3biA9IHJlcXVpcmUoJ2Nyb3NzLXNwYXduJylcbiAgY29uc3QgbG9nID0gcmVxdWlyZSgnLi9wbHVnaW5VdGlsJykubG9nXG4gIGxvZ3Yob3B0aW9ucywgJ0ZVTkNUSU9OIGV4ZWN1dGVBc3luYycpXG4gIGF3YWl0IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBsb2d2KG9wdGlvbnMsYGNvbW1hbmQgLSAke2NvbW1hbmR9YClcbiAgICBsb2d2KG9wdGlvbnMsIGBwYXJtcyAtICR7cGFybXN9YClcbiAgICBsb2d2KG9wdGlvbnMsIGBvcHRzIC0gJHtKU09OLnN0cmluZ2lmeShvcHRzKX1gKVxuICAgIGxldCBjaGlsZCA9IGNyb3NzU3Bhd24oY29tbWFuZCwgcGFybXMsIG9wdHMpXG4gICAgY2hpbGQub24oJ2Nsb3NlJywgKGNvZGUsIHNpZ25hbCkgPT4ge1xuICAgICAgbG9ndihvcHRpb25zLCBgb24gY2xvc2VgKSBcbiAgICAgIGlmKGNvZGUgPT09IDApIHsgcmVzb2x2ZSgwKSB9XG4gICAgICBlbHNlIHsgY29tcGlsYXRpb24uZXJyb3JzLnB1c2goIG5ldyBFcnJvcihjb2RlKSApOyByZXNvbHZlKDApIH1cbiAgICB9KVxuICAgIGNoaWxkLm9uKCdlcnJvcicsIChlcnJvcikgPT4geyBcbiAgICAgIGxvZ3Yob3B0aW9ucywgYG9uIGVycm9yYCkgXG4gICAgICBjb21waWxhdGlvbi5lcnJvcnMucHVzaChlcnJvcilcbiAgICAgIHJlc29sdmUoMClcbiAgICB9KVxuICAgIGNoaWxkLnN0ZG91dC5vbignZGF0YScsIChkYXRhKSA9PiB7XG4gICAgICBsb2d2KG9wdGlvbnMsIGBvbiBkYXRhYCkgXG4gICAgICB2YXIgc3RyID0gZGF0YS50b1N0cmluZygpLnJlcGxhY2UoL1xccj9cXG58XFxyL2csIFwiIFwiKS50cmltKClcbiAgICAgIGxvZ3Yob3B0aW9ucywgYCR7c3RyfWApXG4gICAgICBpZiAoZGF0YSAmJiBkYXRhLnRvU3RyaW5nKCkubWF0Y2goL1dhaXRpbmcgZm9yIGNoYW5nZXNcXC5cXC5cXC4vKSkge1xuICAgICAgICByZXNvbHZlKDApXG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgaWYgKHN1YnN0cmluZ3Muc29tZShmdW5jdGlvbih2KSB7IHJldHVybiBkYXRhLmluZGV4T2YodikgPj0gMDsgfSkpIHsgXG4gICAgICAgICAgc3RyID0gc3RyLnJlcGxhY2UoXCJbSU5GXVwiLCBcIlwiKVxuICAgICAgICAgIHN0ciA9IHN0ci5yZXBsYWNlKFwiW0xPR11cIiwgXCJcIilcbiAgICAgICAgICBzdHIgPSBzdHIucmVwbGFjZShwcm9jZXNzLmN3ZCgpLCAnJykudHJpbSgpXG4gICAgICAgICAgaWYgKHN0ci5pbmNsdWRlcyhcIltFUlJdXCIpKSB7XG4gICAgICAgICAgICBjb21waWxhdGlvbi5lcnJvcnMucHVzaChhcHAgKyBzdHIucmVwbGFjZSgvXlxcW0VSUlxcXSAvZ2ksICcnKSk7XG4gICAgICAgICAgICBzdHIgPSBzdHIucmVwbGFjZShcIltFUlJdXCIsIGAke2NoYWxrLnJlZChcIltFUlJdXCIpfWApXG4gICAgICAgICAgfVxuICAgICAgICAgIGxvZyhgJHthcHB9JHtzdHJ9YCkgXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KVxuICAgIGNoaWxkLnN0ZGVyci5vbignZGF0YScsIChkYXRhKSA9PiB7XG4gICAgICBsb2d2KG9wdGlvbnMsIGBlcnJvciBvbiBjbG9zZWApIFxuICAgICAgdmFyIHN0ciA9IGRhdGEudG9TdHJpbmcoKS5yZXBsYWNlKC9cXHI/XFxufFxcci9nLCBcIiBcIikudHJpbSgpXG4gICAgICB2YXIgc3RySmF2YU9wdHMgPSBcIlBpY2tlZCB1cCBfSkFWQV9PUFRJT05TXCI7XG4gICAgICB2YXIgaW5jbHVkZXMgPSBzdHIuaW5jbHVkZXMoc3RySmF2YU9wdHMpXG4gICAgICBpZiAoIWluY2x1ZGVzKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGAke2FwcH0gJHtjaGFsay5yZWQoXCJbRVJSXVwiKX0gJHtzdHJ9YClcbiAgICAgIH1cbiAgICB9KVxuICB9KVxufVxuIl19