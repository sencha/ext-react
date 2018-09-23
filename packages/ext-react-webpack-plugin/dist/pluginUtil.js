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

function logv(verbose, s) {
  if (verbose == 'yes') {
    require('readline').cursorTo(process.stdout, 0);

    process.stdout.clearLine();
    process.stdout.write('-v-' + s);
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
  logv(options.verbose, ` pluginName - ${pluginName}`);
  logv(options.verbose, ` thisVars.app - ${thisVars.app}`);
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

function _compile(compiler, vars) {
  compiler.hooks.compilation.tap(`ext-compilation`, compilation => {
    if (vars.pluginErrors.length > 0) {
      compilation.errors.push(new Error(vars.pluginErrors.join("")));
      return;
    }

    const log = require('./pluginUtil').log;

    const logv = require('./pluginUtil').logv;

    if (vars.production) {
      logv(vars.verbose, vars.app + `ext-compilation-production`);
      compilation.hooks.succeedModule.tap(`ext-succeed-module`, module => {
        if (module.resource && module.resource.match(/\.(j|t)sx?$/) && !module.resource.match(/node_modules/) && !module.resource.match('/ext-react/dist/')) {
          vars.deps = [...(vars.deps || []), ...require(`./${vars.framework}Util`).extractFromSource(module._source._value)];
        }
      });
    } else {
      logv(vars.verbose, vars.app + `ext-compilation`);
    }

    if (vars.pluginErrors.length == 0) {
      compilation.hooks.htmlWebpackPluginBeforeHtmlGeneration.tap(`ext-html-generation`, data => {
        const logv = require('./pluginUtil').logv;

        logv(vars.verbose, vars.app + 'FUNCTION ext-html-generation');

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
  });
}

function emit(_x, _x2, _x3, _x4, _x5) {
  return _emit.apply(this, arguments);
}

function _emit() {
  _emit = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(compiler, compilation, vars, options, callback) {
    var app, framework, log, logv, path, _buildExtBundle, outputPath, parms, cmdErrors, url, opn;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          app = vars.app;
          framework = vars.framework;
          log = require('./pluginUtil').log;
          logv = require('./pluginUtil').logv;
          logv(vars.verbose, app + 'FUNCTION ext-emit');
          path = require('path');
          _buildExtBundle = require('./pluginUtil')._buildExtBundle;
          outputPath = path.join(compiler.outputPath, vars.extPath);

          if (compiler.outputPath === '/' && compiler.options.devServer) {
            outputPath = path.join(compiler.options.devServer.contentBase, outputPath);
          }

          if (options.verbose == 'yes') {
            log('-v-' + app + 'outputPath: ' + outputPath);
          }

          if (options.verbose == 'yes') {
            log('-v-' + app + 'framework: ' + framework);
          }

          if (framework != 'extjs') {
            require(`./pluginUtil`)._prepareForBuild(app, vars, options, outputPath);
          } else {
            require(`./${framework}Util`)._prepareForBuild(app, vars, options, outputPath, compilation);
          }

          if (!(vars.rebuild == true)) {
            _context.next = 21;
            break;
          }

          parms = ['app', 'build', options.profile, options.environment];
          cmdErrors = [];
          _context.next = 17;
          return _buildExtBundle(app, compilation, cmdErrors, outputPath, parms, options);

        case 17:
          if (vars.browserCount == 0 && cmdErrors.length == 0) {
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

function _buildExtBundle(app, compilation, cmdErrors, output, parms, options) {
  const logv = require('./pluginUtil').logv;

  logv(options.verbose, app + 'FUNCTION _buildExtBundle');
  let sencha;

  try {
    sencha = require('@sencha/cmd');
  } catch (e) {
    sencha = 'sencha';
  }

  return new Promise((resolve, reject) => {
    const onBuildDone = () => {
      logv(options.verbose, app + 'onBuildDone');

      if (cmdErrors.length) {
        reject(new Error(cmdErrors.join("")));
      } else {
        resolve();
      }
    };

    var opts = {
      cwd: output,
      silent: true,
      stdio: 'pipe',
      encoding: 'utf-8'
    };
    executeAsync(app, sencha, parms, opts, compilation, cmdErrors, options).then(function () {
      onBuildDone();
    }, function (reason) {
      resolve(reason);
    });
  });
}

function executeAsync(_x6, _x7, _x8, _x9, _x10, _x11, _x12) {
  return _executeAsync.apply(this, arguments);
}

function _executeAsync() {
  _executeAsync = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(app, command, parms, opts, compilation, cmdErrors, options) {
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
          logv(options.verbose, app + 'FUNCTION executeAsync');
          _context2.next = 8;
          return new Promise((resolve, reject) => {
            logv(options.verbose, `${app} command - ${command}`);
            logv(options.verbose, `${app} parms - ${parms}`);
            logv(options.verbose, `${app} opts - ${JSON.stringify(opts)}`);
            let child = crossSpawn(command, parms, opts);
            child.on('close', (code, signal) => {
              //log(`-v-${app}`) 
              if (code === 0) {
                resolve(0);
              } else {
                compilation.errors.push(new Error(cmdErrors.join("")));
                reject(0);
              }
            });
            child.on('error', error => {
              //log(`-v-${app}0`) 
              cmdErrors.push(error);
              reject(error);
            });
            child.stdout.on('data', data => {
              var str = data.toString().replace(/\r?\n|\r/g, " ").trim();
              logv(options.verbose, `${app} ${str}`);

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
                    cmdErrors.push(app + str.replace(/^\[ERR\] /gi, ''));
                    str = str.replace("[ERR]", `${chalk.red("[ERR]")}`);
                  }

                  log(`${app}${str}`);
                }
              }
            });
            child.stderr.on('data', data => {
              //log(`-v-${app}4`) 
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9wbHVnaW5VdGlsLmpzIl0sIm5hbWVzIjpbImxvZyIsInMiLCJyZXF1aXJlIiwiY3Vyc29yVG8iLCJwcm9jZXNzIiwic3Rkb3V0IiwiY2xlYXJMaW5lIiwid3JpdGUiLCJsb2d2IiwidmVyYm9zZSIsIl9jb25zdHJ1Y3RvciIsIm9wdGlvbnMiLCJmcmFtZXdvcmsiLCJ0aGlzVmFycyIsInRoaXNPcHRpb25zIiwicGx1Z2luTmFtZSIsImZzIiwidmFsaWRhdGVPcHRpb25zIiwidW5kZWZpbmVkIiwicGx1Z2luRXJyb3JzIiwicHVzaCIsImRhdGEiLCJwbHVnaW4iLCJ2YXJzIiwiZ2V0RGVmYXVsdFZhcnMiLCJhcHAiLCJfZ2V0QXBwIiwicmMiLCJleGlzdHNTeW5jIiwiSlNPTiIsInBhcnNlIiwicmVhZEZpbGVTeW5jIiwiZ2V0RGVmYXVsdE9wdGlvbnMiLCJlbnZpcm9ubWVudCIsInByb2R1Y3Rpb24iLCJfZ2V0VmVyc2lvbnMiLCJjaGFsayIsInByZWZpeCIsInBsYXRmb3JtIiwiZ3JlZW4iLCJmcmFtZXdvcmtOYW1lIiwicGF0aCIsInYiLCJwbHVnaW5QYXRoIiwicmVzb2x2ZSIsImN3ZCIsInBsdWdpblBrZyIsInBsdWdpblZlcnNpb24iLCJ2ZXJzaW9uIiwid2VicGFja1BhdGgiLCJ3ZWJwYWNrUGtnIiwid2VicGFja1ZlcnNpb24iLCJleHRQYXRoIiwiZXh0UGtnIiwiZXh0VmVyc2lvbiIsInNlbmNoYSIsImNtZFBhdGgiLCJjbWRQa2ciLCJjbWRWZXJzaW9uIiwidmVyc2lvbl9mdWxsIiwiZnJhbWV3b3JrSW5mbyIsImZyYW1ld29ya1BhdGgiLCJmcmFtZXdvcmtQa2ciLCJmcmFtZXdvcmtWZXJzaW9uIiwiX2NvbXBpbGUiLCJjb21waWxlciIsImhvb2tzIiwiY29tcGlsYXRpb24iLCJ0YXAiLCJsZW5ndGgiLCJlcnJvcnMiLCJFcnJvciIsImpvaW4iLCJzdWNjZWVkTW9kdWxlIiwibW9kdWxlIiwicmVzb3VyY2UiLCJtYXRjaCIsImRlcHMiLCJleHRyYWN0RnJvbVNvdXJjZSIsIl9zb3VyY2UiLCJfdmFsdWUiLCJodG1sV2VicGFja1BsdWdpbkJlZm9yZUh0bWxHZW5lcmF0aW9uIiwicHVibGljUGF0aCIsIm91dHB1dE9wdGlvbnMiLCJqc1BhdGgiLCJjc3NQYXRoIiwiYXNzZXRzIiwianMiLCJ1bnNoaWZ0IiwiY3NzIiwiZW1pdCIsImNhbGxiYWNrIiwiX2J1aWxkRXh0QnVuZGxlIiwib3V0cHV0UGF0aCIsImRldlNlcnZlciIsImNvbnRlbnRCYXNlIiwiX3ByZXBhcmVGb3JCdWlsZCIsInJlYnVpbGQiLCJwYXJtcyIsInByb2ZpbGUiLCJjbWRFcnJvcnMiLCJicm93c2VyQ291bnQiLCJ1cmwiLCJwb3J0Iiwib3BuIiwib3V0cHV0IiwicmltcmFmIiwibWtkaXJwIiwiZnN4IiwicGFja2FnZXMiLCJ0b29sa2l0IiwidGhlbWUiLCJmaXJzdFRpbWUiLCJzeW5jIiwiYnVpbGRYTUwiLCJjcmVhdGVBcHBKc29uIiwiY3JlYXRlV29ya3NwYWNlSnNvbiIsImNyZWF0ZUpTRE9NRW52aXJvbm1lbnQiLCJ3cml0ZUZpbGVTeW5jIiwiY29tcHJlc3MiLCJmcm9tUmVzb3VyY2VzIiwidG9SZXNvdXJjZXMiLCJjb3B5U3luYyIsInJlcGxhY2UiLCJmcm9tUGFja2FnZXMiLCJ0b1BhY2thZ2VzIiwiZnJvbU92ZXJyaWRlcyIsInRvT3ZlcnJpZGVzIiwibWFuaWZlc3QiLCJlIiwiUHJvbWlzZSIsInJlamVjdCIsIm9uQnVpbGREb25lIiwib3B0cyIsInNpbGVudCIsInN0ZGlvIiwiZW5jb2RpbmciLCJleGVjdXRlQXN5bmMiLCJ0aGVuIiwicmVhc29uIiwiY29tbWFuZCIsIkRFRkFVTFRfU1VCU1RSUyIsInN1YnN0cmluZ3MiLCJjcm9zc1NwYXduIiwic3RyaW5naWZ5IiwiY2hpbGQiLCJvbiIsImNvZGUiLCJzaWduYWwiLCJlcnJvciIsInN0ciIsInRvU3RyaW5nIiwidHJpbSIsInNvbWUiLCJpbmRleE9mIiwiaW5jbHVkZXMiLCJyZWQiLCJzdGRl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VixDQUFlSyxHQUFHLEdBQUc2SCxHQUFHLENBQUMzQixPQUFKLENBQVksYUFBWixFQUEyQixFQUEzQixDQUFyQjtBQUNBMkIsb0JBQUFBLEdBQUcsR0FBR0EsR0FBRyxDQUFDM0IsT0FBSixDQUFZLE9BQVosRUFBc0IsR0FBRXZGLEtBQUssQ0FBQ3dILEdBQU4sQ0FBVSxPQUFWLENBQW1CLEVBQTNDLENBQU47QUFDRDs7QUFDRDVKLGtCQUFBQSxHQUFHLENBQUUsR0FBRXlCLEdBQUksR0FBRTZILEdBQUksRUFBZCxDQUFIO0FBQ0Q7QUFDRjtBQUNGLGFBbEJEO0FBbUJBTCxZQUFBQSxLQUFLLENBQUNZLE1BQU4sQ0FBYVgsRUFBYixDQUFnQixNQUFoQixFQUF5QjdILElBQUQsSUFBVTtBQUNoQztBQUNBLGtCQUFJaUksR0FBRyxHQUFHakksSUFBSSxDQUFDa0ksUUFBTCxHQUFnQjVCLE9BQWhCLENBQXdCLFdBQXhCLEVBQXFDLEdBQXJDLEVBQTBDNkIsSUFBMUMsRUFBVjtBQUNBLGtCQUFJTSxXQUFXLEdBQUcseUJBQWxCO0FBQ0Esa0JBQUlILFFBQVEsR0FBR0wsR0FBRyxDQUFDSyxRQUFKLENBQWFHLFdBQWIsQ0FBZjs7QUFDQSxrQkFBSSxDQUFDSCxRQUFMLEVBQWU7QUFDYkksZ0JBQUFBLE9BQU8sQ0FBQy9KLEdBQVIsQ0FBYSxHQUFFeUIsR0FBSSxJQUFHVyxLQUFLLENBQUN3SCxHQUFOLENBQVUsT0FBVixDQUFtQixJQUFHTixHQUFJLEVBQWhEO0FBQ0Q7QUFDRixhQVJEO0FBU0QsV0EzQ0ssQ0FSRDs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBmdW5jdGlvbiBsb2cocykge1xuICByZXF1aXJlKCdyZWFkbGluZScpLmN1cnNvclRvKHByb2Nlc3Muc3Rkb3V0LCAwKVxuICBwcm9jZXNzLnN0ZG91dC5jbGVhckxpbmUoKVxuICBwcm9jZXNzLnN0ZG91dC53cml0ZShzKVxuICBwcm9jZXNzLnN0ZG91dC53cml0ZSgnXFxuJylcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGxvZ3YodmVyYm9zZSwgcykge1xuICBpZiAodmVyYm9zZSA9PSAneWVzJykge1xuICAgIHJlcXVpcmUoJ3JlYWRsaW5lJykuY3Vyc29yVG8ocHJvY2Vzcy5zdGRvdXQsIDApXG4gICAgcHJvY2Vzcy5zdGRvdXQuY2xlYXJMaW5lKClcbiAgICBwcm9jZXNzLnN0ZG91dC53cml0ZSgnLXYtJyArIHMpXG4gICAgcHJvY2Vzcy5zdGRvdXQud3JpdGUoJ1xcbicpXG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9jb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gIHZhciBmcmFtZXdvcmsgPSAnJ1xuICB2YXIgdGhpc1ZhcnMgPSB7fVxuICB2YXIgdGhpc09wdGlvbnMgPSB7fVxuICB2YXIgcGx1Z2luTmFtZSA9ICcnXG4gIGNvbnN0IGZzID0gcmVxdWlyZSgnZnMnKVxuICBjb25zdCB2YWxpZGF0ZU9wdGlvbnMgPSByZXF1aXJlKCdzY2hlbWEtdXRpbHMnKVxuICB2YWxpZGF0ZU9wdGlvbnMocmVxdWlyZSgnLi4vb3B0aW9ucy5qc29uJyksIG9wdGlvbnMsICcnKVxuICBpZiAob3B0aW9ucy5mcmFtZXdvcmsgPT0gdW5kZWZpbmVkKSBcbiAgICB7XG4gICAgICB0aGlzVmFycy5wbHVnaW5FcnJvcnMgPSBbXVxuICAgICAgdGhpc1ZhcnMucGx1Z2luRXJyb3JzLnB1c2goJ3dlYnBhY2sgY29uZmlnOiBmcmFtZXdvcmsgcGFyYW1ldGVyIG9uIGV4dC13ZWJwYWNrLXBsdWdpbiBpcyBub3QgZGVmaW5lZCAtIHZhbHVlczogcmVhY3QsIGFuZ3VsYXIsIGV4dGpzJylcbiAgICAgIHZhciBkYXRhID0ge31cbiAgICAgIGRhdGEucGx1Z2luID0ge31cbiAgICAgIGRhdGEucGx1Z2luLnZhcnMgPSB0aGlzVmFyc1xuICAgICAgcmV0dXJuIGRhdGFcbiAgICB9XG4gIGlmIChvcHRpb25zLmZyYW1ld29yayA9PSAnZXh0anMnKSBcbiAgICB7XG4gICAgICBmcmFtZXdvcmsgPSAnZXh0anMnXG4gICAgICBwbHVnaW5OYW1lID0gYGV4dC13ZWJwYWNrLXBsdWdpbmBcbiAgICB9XG4gIGVsc2UgXG4gICAge1xuICAgICAgZnJhbWV3b3JrID0gb3B0aW9ucy5mcmFtZXdvcmtcbiAgICAgIHBsdWdpbk5hbWUgPSBgZXh0LSR7ZnJhbWV3b3JrfS13ZWJwYWNrLXBsdWdpbmBcbiAgICB9XG4gIHRoaXNWYXJzID0gcmVxdWlyZShgLi8ke2ZyYW1ld29ya31VdGlsYCkuZ2V0RGVmYXVsdFZhcnMoKVxuICB0aGlzVmFycy5mcmFtZXdvcmsgPSBmcmFtZXdvcmtcbiAgdGhpc1ZhcnMuYXBwID0gcmVxdWlyZSgnLi9wbHVnaW5VdGlsJykuX2dldEFwcCgpXG4gIGxvZ3Yob3B0aW9ucy52ZXJib3NlLCBgIHBsdWdpbk5hbWUgLSAke3BsdWdpbk5hbWV9YClcbiAgbG9ndihvcHRpb25zLnZlcmJvc2UsIGAgdGhpc1ZhcnMuYXBwIC0gJHt0aGlzVmFycy5hcHB9YClcbiAgY29uc3QgcmMgPSAoZnMuZXhpc3RzU3luYyhgLmV4dC0ke3RoaXNWYXJzLmZyYW1ld29ya31yY2ApICYmIEpTT04ucGFyc2UoZnMucmVhZEZpbGVTeW5jKGAuZXh0LSR7dGhpc1ZhcnMuZnJhbWV3b3JrfXJjYCwgJ3V0Zi04JykpIHx8IHt9KVxuICB0aGlzT3B0aW9ucyA9IHsgLi4ucmVxdWlyZShgLi8ke3RoaXNWYXJzLmZyYW1ld29ya31VdGlsYCkuZ2V0RGVmYXVsdE9wdGlvbnMoKSwgLi4ub3B0aW9ucywgLi4ucmMgfVxuICBpZiAodGhpc09wdGlvbnMuZW52aXJvbm1lbnQgPT0gJ3Byb2R1Y3Rpb24nKSBcbiAgICB7dGhpc1ZhcnMucHJvZHVjdGlvbiA9IHRydWV9XG4gIGVsc2UgXG4gICAge3RoaXNWYXJzLnByb2R1Y3Rpb24gPSBmYWxzZX1cbiAgbG9nKHJlcXVpcmUoJy4vcGx1Z2luVXRpbCcpLl9nZXRWZXJzaW9ucyh0aGlzVmFycy5hcHAsIHBsdWdpbk5hbWUsIHRoaXNWYXJzLmZyYW1ld29yaykpXG4gIGxvZyh0aGlzVmFycy5hcHAgKyAnQnVpbGRpbmcgZm9yICcgKyB0aGlzT3B0aW9ucy5lbnZpcm9ubWVudClcblxuICB2YXIgZGF0YSA9IHt9XG4gIGRhdGEucGx1Z2luID0ge31cbiAgZGF0YS5wbHVnaW4uYXBwID0gdGhpc1ZhcnMuYXBwXG4gIGRhdGEucGx1Z2luLmZyYW1ld29yayA9IHRoaXNWYXJzLmZyYW1ld29ya1xuICBkYXRhLnBsdWdpbi52YXJzID0gdGhpc1ZhcnNcbiAgZGF0YS5wbHVnaW4ub3B0aW9ucyA9IHRoaXNPcHRpb25zXG4gIHJldHVybiBkYXRhXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfZ2V0QXBwKCkge1xuICB2YXIgY2hhbGsgPSByZXF1aXJlKCdjaGFsaycpXG4gIHZhciBwcmVmaXggPSBgYFxuICBjb25zdCBwbGF0Zm9ybSA9IHJlcXVpcmUoJ29zJykucGxhdGZvcm0oKVxuICBpZiAocGxhdGZvcm0gPT0gJ2RhcndpbicpIHsgcHJlZml4ID0gYOKEuSDvvaJleHTvvaM6YCB9XG4gIGVsc2UgeyBwcmVmaXggPSBgaSBbZXh0XTpgIH1cbiAgcmV0dXJuIGAke2NoYWxrLmdyZWVuKHByZWZpeCl9IGBcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9nZXRWZXJzaW9ucyhhcHAsIHBsdWdpbk5hbWUsIGZyYW1ld29ya05hbWUpIHtcbiAgY29uc3QgcGF0aCA9IHJlcXVpcmUoJ3BhdGgnKVxuICBjb25zdCBmcyA9IHJlcXVpcmUoJ2ZzJylcblxuICB2YXIgdiA9IHt9XG4gIHZhciBwbHVnaW5QYXRoID0gcGF0aC5yZXNvbHZlKHByb2Nlc3MuY3dkKCksJ25vZGVfbW9kdWxlcy9Ac2VuY2hhJywgcGx1Z2luTmFtZSlcbiAgdmFyIHBsdWdpblBrZyA9IChmcy5leGlzdHNTeW5jKHBsdWdpblBhdGgrJy9wYWNrYWdlLmpzb24nKSAmJiBKU09OLnBhcnNlKGZzLnJlYWRGaWxlU3luYyhwbHVnaW5QYXRoKycvcGFja2FnZS5qc29uJywgJ3V0Zi04JykpIHx8IHt9KTtcbiAgdi5wbHVnaW5WZXJzaW9uID0gcGx1Z2luUGtnLnZlcnNpb25cblxuICB2YXIgd2VicGFja1BhdGggPSBwYXRoLnJlc29sdmUocHJvY2Vzcy5jd2QoKSwnbm9kZV9tb2R1bGVzL3dlYnBhY2snKVxuICB2YXIgd2VicGFja1BrZyA9IChmcy5leGlzdHNTeW5jKHdlYnBhY2tQYXRoKycvcGFja2FnZS5qc29uJykgJiYgSlNPTi5wYXJzZShmcy5yZWFkRmlsZVN5bmMod2VicGFja1BhdGgrJy9wYWNrYWdlLmpzb24nLCAndXRmLTgnKSkgfHwge30pO1xuICB2LndlYnBhY2tWZXJzaW9uID0gd2VicGFja1BrZy52ZXJzaW9uXG5cbiAgdmFyIGV4dFBhdGggPSBwYXRoLnJlc29sdmUocHJvY2Vzcy5jd2QoKSwnbm9kZV9tb2R1bGVzL0BzZW5jaGEvZXh0JylcbiAgdmFyIGV4dFBrZyA9IChmcy5leGlzdHNTeW5jKGV4dFBhdGgrJy9wYWNrYWdlLmpzb24nKSAmJiBKU09OLnBhcnNlKGZzLnJlYWRGaWxlU3luYyhleHRQYXRoKycvcGFja2FnZS5qc29uJywgJ3V0Zi04JykpIHx8IHt9KTtcbiAgdi5leHRWZXJzaW9uID0gZXh0UGtnLnNlbmNoYS52ZXJzaW9uXG5cbiAgdmFyIGNtZFBhdGggPSBwYXRoLnJlc29sdmUocGx1Z2luUGF0aCwnbm9kZV9tb2R1bGVzL0BzZW5jaGEvY21kJylcbiAgdmFyIGNtZFBrZyA9IChmcy5leGlzdHNTeW5jKGNtZFBhdGgrJy9wYWNrYWdlLmpzb24nKSAmJiBKU09OLnBhcnNlKGZzLnJlYWRGaWxlU3luYyhjbWRQYXRoKycvcGFja2FnZS5qc29uJywgJ3V0Zi04JykpIHx8IHt9KTtcbiAgdi5jbWRWZXJzaW9uID0gY21kUGtnLnZlcnNpb25fZnVsbFxuXG4gIHZhciBmcmFtZXdvcmtJbmZvID0gJydcbiAgaWYgKGZyYW1ld29ya05hbWUgIT0gdW5kZWZpbmVkICYmIGZyYW1ld29ya05hbWUgIT0gJ2V4dGpzJykge1xuICAgIHZhciBmcmFtZXdvcmtQYXRoID0gcGF0aC5yZXNvbHZlKHByb2Nlc3MuY3dkKCksJ25vZGVfbW9kdWxlcycsIGZyYW1ld29ya05hbWUpXG4gICAgdmFyIGZyYW1ld29ya1BrZyA9IChmcy5leGlzdHNTeW5jKGZyYW1ld29ya1BhdGgrJy9wYWNrYWdlLmpzb24nKSAmJiBKU09OLnBhcnNlKGZzLnJlYWRGaWxlU3luYyhmcmFtZXdvcmtQYXRoKycvcGFja2FnZS5qc29uJywgJ3V0Zi04JykpIHx8IHt9KTtcbiAgICB2LmZyYW1ld29ya1ZlcnNpb24gPSBmcmFtZXdvcmtQa2cudmVyc2lvblxuICAgIGZyYW1ld29ya0luZm8gPSAnLCAnICsgZnJhbWV3b3JrTmFtZSArICcgdicgKyB2LmZyYW1ld29ya1ZlcnNpb25cbiAgfVxuXG4gIHJldHVybiBhcHAgKyAnZXh0LXdlYnBhY2stcGx1Z2luIHYnICsgdi5wbHVnaW5WZXJzaW9uICsgJywgRXh0IEpTIHYnICsgdi5leHRWZXJzaW9uICsgJywgU2VuY2hhIENtZCB2JyArIHYuY21kVmVyc2lvbiArICcsIHdlYnBhY2sgdicgKyB2LndlYnBhY2tWZXJzaW9uICsgZnJhbWV3b3JrSW5mb1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX2NvbXBpbGUoY29tcGlsZXIsIHZhcnMpIHtcbiAgY29tcGlsZXIuaG9va3MuY29tcGlsYXRpb24udGFwKGBleHQtY29tcGlsYXRpb25gLCAoY29tcGlsYXRpb24pID0+IHtcbiAgICBpZiAodmFycy5wbHVnaW5FcnJvcnMubGVuZ3RoID4gMCkge1xuICAgICAgY29tcGlsYXRpb24uZXJyb3JzLnB1c2goIG5ldyBFcnJvcih2YXJzLnBsdWdpbkVycm9ycy5qb2luKFwiXCIpKSApXG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgY29uc3QgbG9nID0gcmVxdWlyZSgnLi9wbHVnaW5VdGlsJykubG9nXG4gICAgY29uc3QgbG9ndiA9IHJlcXVpcmUoJy4vcGx1Z2luVXRpbCcpLmxvZ3ZcbiAgICBpZiAodmFycy5wcm9kdWN0aW9uKSB7XG4gICAgICBsb2d2KHZhcnMudmVyYm9zZSwgdmFycy5hcHAgKyBgZXh0LWNvbXBpbGF0aW9uLXByb2R1Y3Rpb25gKVxuICAgICAgY29tcGlsYXRpb24uaG9va3Muc3VjY2VlZE1vZHVsZS50YXAoYGV4dC1zdWNjZWVkLW1vZHVsZWAsIChtb2R1bGUpID0+IHtcbiAgICAgICAgaWYgKG1vZHVsZS5yZXNvdXJjZSAmJiBtb2R1bGUucmVzb3VyY2UubWF0Y2goL1xcLihqfHQpc3g/JC8pICYmICFtb2R1bGUucmVzb3VyY2UubWF0Y2goL25vZGVfbW9kdWxlcy8pICYmICFtb2R1bGUucmVzb3VyY2UubWF0Y2goJy9leHQtcmVhY3QvZGlzdC8nKSkge1xuICAgICAgICAgIHZhcnMuZGVwcyA9IFsgXG4gICAgICAgICAgICAuLi4odmFycy5kZXBzIHx8IFtdKSwgXG4gICAgICAgICAgICAuLi5yZXF1aXJlKGAuLyR7dmFycy5mcmFtZXdvcmt9VXRpbGApLmV4dHJhY3RGcm9tU291cmNlKG1vZHVsZS5fc291cmNlLl92YWx1ZSkgXG4gICAgICAgICAgXVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGxvZ3YodmFycy52ZXJib3NlLCB2YXJzLmFwcCArIGBleHQtY29tcGlsYXRpb25gKVxuICAgIH1cbiAgICBpZiAodmFycy5wbHVnaW5FcnJvcnMubGVuZ3RoID09IDApIHtcbiAgICAgIGNvbXBpbGF0aW9uLmhvb2tzLmh0bWxXZWJwYWNrUGx1Z2luQmVmb3JlSHRtbEdlbmVyYXRpb24udGFwKGBleHQtaHRtbC1nZW5lcmF0aW9uYCwoZGF0YSkgPT4ge1xuICAgICAgICBjb25zdCBsb2d2ID0gcmVxdWlyZSgnLi9wbHVnaW5VdGlsJykubG9ndlxuICAgICAgICBsb2d2KHZhcnMudmVyYm9zZSwgdmFycy5hcHAgKyAnRlVOQ1RJT04gZXh0LWh0bWwtZ2VuZXJhdGlvbicpXG4gICAgICBcbiAgICAgICAgY29uc3QgcGF0aCA9IHJlcXVpcmUoJ3BhdGgnKVxuICAgICAgICB2YXIgcHVibGljUGF0aCA9ICcnXG4gICAgICAgIGlmIChjb21waWxhdGlvbi5vdXRwdXRPcHRpb25zLnB1YmxpY1BhdGggIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgcHVibGljUGF0aCA9IGNvbXBpbGF0aW9uLm91dHB1dE9wdGlvbnMucHVibGljUGF0aFxuICAgICAgICB9XG4gICAgICAgIHZhciBqc1BhdGggPSBwYXRoLmpvaW4ocHVibGljUGF0aCx2YXJzLmV4dFBhdGggKyAnL2V4dC5qcycpXG4gICAgICAgIHZhciBjc3NQYXRoID0gcGF0aC5qb2luKHB1YmxpY1BhdGgsdmFycy5leHRQYXRoICsgJy9leHQuY3NzJylcbiAgICAgICAgZGF0YS5hc3NldHMuanMudW5zaGlmdChqc1BhdGgpXG4gICAgICAgIGRhdGEuYXNzZXRzLmNzcy51bnNoaWZ0KGNzc1BhdGgpXG4gICAgICAgIGxvZyh2YXJzLmFwcCArIGBBZGRpbmcgJHtqc1BhdGh9IGFuZCAke2Nzc1BhdGh9IHRvIGluZGV4Lmh0bWxgKVxuXG4gICAgICB9KVxuICAgIH1cbiAgfSlcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGVtaXQoY29tcGlsZXIsIGNvbXBpbGF0aW9uLCB2YXJzLCBvcHRpb25zLCBjYWxsYmFjaykge1xuICB2YXIgYXBwID0gdmFycy5hcHBcbiAgdmFyIGZyYW1ld29yayA9IHZhcnMuZnJhbWV3b3JrXG4gIGNvbnN0IGxvZyA9IHJlcXVpcmUoJy4vcGx1Z2luVXRpbCcpLmxvZ1xuICBjb25zdCBsb2d2ID0gcmVxdWlyZSgnLi9wbHVnaW5VdGlsJykubG9ndlxuICBsb2d2KHZhcnMudmVyYm9zZSwgYXBwICsgJ0ZVTkNUSU9OIGV4dC1lbWl0JylcbiAgY29uc3QgcGF0aCA9IHJlcXVpcmUoJ3BhdGgnKVxuICBjb25zdCBfYnVpbGRFeHRCdW5kbGUgPSByZXF1aXJlKCcuL3BsdWdpblV0aWwnKS5fYnVpbGRFeHRCdW5kbGVcblxuICBsZXQgb3V0cHV0UGF0aCA9IHBhdGguam9pbihjb21waWxlci5vdXRwdXRQYXRoLHZhcnMuZXh0UGF0aClcbiAgaWYgKGNvbXBpbGVyLm91dHB1dFBhdGggPT09ICcvJyAmJiBjb21waWxlci5vcHRpb25zLmRldlNlcnZlcikge1xuICAgIG91dHB1dFBhdGggPSBwYXRoLmpvaW4oY29tcGlsZXIub3B0aW9ucy5kZXZTZXJ2ZXIuY29udGVudEJhc2UsIG91dHB1dFBhdGgpXG4gIH1cbiAgaWYob3B0aW9ucy52ZXJib3NlID09ICd5ZXMnKSB7bG9nKCctdi0nICsgYXBwICsgJ291dHB1dFBhdGg6ICcgKyBvdXRwdXRQYXRoKX1cbiAgaWYob3B0aW9ucy52ZXJib3NlID09ICd5ZXMnKSB7bG9nKCctdi0nICsgYXBwICsgJ2ZyYW1ld29yazogJyArIGZyYW1ld29yayl9XG5cbiAgaWYgKGZyYW1ld29yayAhPSAnZXh0anMnKSB7XG4gICAgcmVxdWlyZShgLi9wbHVnaW5VdGlsYCkuX3ByZXBhcmVGb3JCdWlsZChhcHAsIHZhcnMsIG9wdGlvbnMsIG91dHB1dFBhdGgpXG4gIH1cbiAgZWxzZSB7XG4gICAgcmVxdWlyZShgLi8ke2ZyYW1ld29ya31VdGlsYCkuX3ByZXBhcmVGb3JCdWlsZChhcHAsIHZhcnMsIG9wdGlvbnMsIG91dHB1dFBhdGgsIGNvbXBpbGF0aW9uKVxuICB9XG4gIGlmICh2YXJzLnJlYnVpbGQgPT0gdHJ1ZSkge1xuICAgIHZhciBwYXJtcyA9IFsnYXBwJywgJ2J1aWxkJywgb3B0aW9ucy5wcm9maWxlLCBvcHRpb25zLmVudmlyb25tZW50XVxuICAgIHZhciBjbWRFcnJvcnMgPSBbXVxuICAgIGF3YWl0IF9idWlsZEV4dEJ1bmRsZShhcHAsIGNvbXBpbGF0aW9uLCBjbWRFcnJvcnMsIG91dHB1dFBhdGgsIHBhcm1zLCBvcHRpb25zKVxuICAgIGlmICh2YXJzLmJyb3dzZXJDb3VudCA9PSAwICYmIGNtZEVycm9ycy5sZW5ndGggPT0gMCkge1xuICAgICAgdmFyIHVybCA9ICdodHRwOi8vbG9jYWxob3N0OicgKyBvcHRpb25zLnBvcnRcbiAgICAgIGxvZyhhcHAgKyBgT3BlbmluZyBicm93c2VyIGF0ICR7dXJsfWApXG4gICAgICB2YXJzLmJyb3dzZXJDb3VudCsrXG4gICAgICBjb25zdCBvcG4gPSByZXF1aXJlKCdvcG4nKVxuICAgICAgb3BuKHVybClcbiAgICB9XG4gICAgY2FsbGJhY2soKVxuICB9XG4gIGVsc2Uge1xuICAgIGNhbGxiYWNrKClcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gX3ByZXBhcmVGb3JCdWlsZChhcHAsIHZhcnMsIG9wdGlvbnMsIG91dHB1dCkge1xuICBjb25zdCBsb2cgPSByZXF1aXJlKCcuL3BsdWdpblV0aWwnKS5sb2dcbiAgY29uc3QgcmltcmFmID0gcmVxdWlyZSgncmltcmFmJylcbiAgY29uc3QgbWtkaXJwID0gcmVxdWlyZSgnbWtkaXJwJylcbiAgY29uc3QgZnN4ID0gcmVxdWlyZSgnZnMtZXh0cmEnKVxuICBjb25zdCBmcyA9IHJlcXVpcmUoJ2ZzJylcbiAgY29uc3QgcGF0aCA9IHJlcXVpcmUoJ3BhdGgnKVxuXG4gIHZhciBwYWNrYWdlcyA9IG9wdGlvbnMucGFja2FnZXNcbiAgdmFyIHRvb2xraXQgPSBvcHRpb25zLnRvb2xraXRcbiAgdmFyIHRoZW1lID0gb3B0aW9ucy50aGVtZVxuXG4gIHRoZW1lID0gdGhlbWUgfHwgKHRvb2xraXQgPT09ICdjbGFzc2ljJyA/ICd0aGVtZS10cml0b24nIDogJ3RoZW1lLW1hdGVyaWFsJylcbiAgaWYgKHZhcnMuZmlyc3RUaW1lKSB7XG4gICAgcmltcmFmLnN5bmMob3V0cHV0KVxuICAgIG1rZGlycC5zeW5jKG91dHB1dClcbiAgICBjb25zdCBidWlsZFhNTCA9IHJlcXVpcmUoJy4vYXJ0aWZhY3RzJykuYnVpbGRYTUxcbiAgICBjb25zdCBjcmVhdGVBcHBKc29uID0gcmVxdWlyZSgnLi9hcnRpZmFjdHMnKS5jcmVhdGVBcHBKc29uXG4gICAgY29uc3QgY3JlYXRlV29ya3NwYWNlSnNvbiA9IHJlcXVpcmUoJy4vYXJ0aWZhY3RzJykuY3JlYXRlV29ya3NwYWNlSnNvblxuICAgIGNvbnN0IGNyZWF0ZUpTRE9NRW52aXJvbm1lbnQgPSByZXF1aXJlKCcuL2FydGlmYWN0cycpLmNyZWF0ZUpTRE9NRW52aXJvbm1lbnRcbiAgICBmcy53cml0ZUZpbGVTeW5jKHBhdGguam9pbihvdXRwdXQsICdidWlsZC54bWwnKSwgYnVpbGRYTUwoeyBjb21wcmVzczogdmFycy5wcm9kdWN0aW9uIH0pLCAndXRmOCcpXG4gICAgZnMud3JpdGVGaWxlU3luYyhwYXRoLmpvaW4ob3V0cHV0LCAnanNkb20tZW52aXJvbm1lbnQuanMnKSwgY3JlYXRlSlNET01FbnZpcm9ubWVudCgpLCAndXRmOCcpXG4gICAgZnMud3JpdGVGaWxlU3luYyhwYXRoLmpvaW4ob3V0cHV0LCAnYXBwLmpzb24nKSwgY3JlYXRlQXBwSnNvbiggdGhlbWUsIHBhY2thZ2VzLCB0b29sa2l0ICksICd1dGY4JylcbiAgICBmcy53cml0ZUZpbGVTeW5jKHBhdGguam9pbihvdXRwdXQsICd3b3Jrc3BhY2UuanNvbicpLCBjcmVhdGVXb3Jrc3BhY2VKc29uKCksICd1dGY4JylcblxuICAgIGlmIChmcy5leGlzdHNTeW5jKHBhdGguam9pbihwcm9jZXNzLmN3ZCgpLCAncmVzb3VyY2VzLycpKSkge1xuICAgICAgdmFyIGZyb21SZXNvdXJjZXMgPSBwYXRoLmpvaW4ocHJvY2Vzcy5jd2QoKSwgJ3Jlc291cmNlcy8nKVxuICAgICAgdmFyIHRvUmVzb3VyY2VzID0gcGF0aC5qb2luKG91dHB1dCwgJy4uL3Jlc291cmNlcycpXG4gICAgICBmc3guY29weVN5bmMoZnJvbVJlc291cmNlcywgdG9SZXNvdXJjZXMpXG4gICAgICBsb2coYXBwICsgJ0NvcHlpbmcgJyArIGZyb21SZXNvdXJjZXMucmVwbGFjZShwcm9jZXNzLmN3ZCgpLCAnJykgKyAnIHRvOiAnICsgdG9SZXNvdXJjZXMucmVwbGFjZShwcm9jZXNzLmN3ZCgpLCAnJykpXG4gICAgfVxuXG4gICAgaWYgKGZzLmV4aXN0c1N5bmMocGF0aC5qb2luKHByb2Nlc3MuY3dkKCksJ3Jlc291cmNlcy8nKSkpIHtcbiAgICAgIHZhciBmcm9tUmVzb3VyY2VzID0gcGF0aC5qb2luKHByb2Nlc3MuY3dkKCksICdyZXNvdXJjZXMvJylcbiAgICAgIHZhciB0b1Jlc291cmNlcyA9IHBhdGguam9pbihvdXRwdXQsICdyZXNvdXJjZXMnKVxuICAgICAgZnN4LmNvcHlTeW5jKGZyb21SZXNvdXJjZXMsIHRvUmVzb3VyY2VzKVxuICAgICAgbG9nKGFwcCArICdDb3B5aW5nICcgKyBmcm9tUmVzb3VyY2VzLnJlcGxhY2UocHJvY2Vzcy5jd2QoKSwgJycpICsgJyB0bzogJyArIHRvUmVzb3VyY2VzLnJlcGxhY2UocHJvY2Vzcy5jd2QoKSwgJycpKVxuICAgIH1cblxuICAgIGlmIChmcy5leGlzdHNTeW5jKHBhdGguam9pbihwcm9jZXNzLmN3ZCgpLHZhcnMuZXh0UGF0aCArICcvcGFja2FnZXMvJykpKSB7XG4gICAgICB2YXIgZnJvbVBhY2thZ2VzID0gcGF0aC5qb2luKHByb2Nlc3MuY3dkKCksdmFycy5leHRQYXRoICsgJy9wYWNrYWdlcy8nKVxuICAgICAgdmFyIHRvUGFja2FnZXMgPSBwYXRoLmpvaW4ob3V0cHV0LCAncGFja2FnZXMvJylcbiAgICAgIGZzeC5jb3B5U3luYyhmcm9tUGFja2FnZXMsIHRvUGFja2FnZXMpXG4gICAgICBsb2coYXBwICsgJ0NvcHlpbmcgJyArIGZyb21QYWNrYWdlcy5yZXBsYWNlKHByb2Nlc3MuY3dkKCksICcnKSArICcgdG86ICcgKyB0b1BhY2thZ2VzLnJlcGxhY2UocHJvY2Vzcy5jd2QoKSwgJycpKVxuICAgIH1cblxuICAgIGlmIChmcy5leGlzdHNTeW5jKHBhdGguam9pbihwcm9jZXNzLmN3ZCgpLHZhcnMuZXh0UGF0aCArICcvb3ZlcnJpZGVzLycpKSkge1xuICAgICAgdmFyIGZyb21PdmVycmlkZXMgPSBwYXRoLmpvaW4ocHJvY2Vzcy5jd2QoKSx2YXJzLmV4dFBhdGggKyAnL292ZXJyaWRlcy8nKVxuICAgICAgdmFyIHRvT3ZlcnJpZGVzID0gcGF0aC5qb2luKG91dHB1dCwgJ292ZXJyaWRlcy8nKVxuICAgICAgZnN4LmNvcHlTeW5jKGZyb21PdmVycmlkZXMsIHRvT3ZlcnJpZGVzKVxuICAgICAgbG9nKGFwcCArICdDb3B5aW5nICcgKyBmcm9tT3ZlcnJpZGVzLnJlcGxhY2UocHJvY2Vzcy5jd2QoKSwgJycpICsgJyB0bzogJyArIHRvT3ZlcnJpZGVzLnJlcGxhY2UocHJvY2Vzcy5jd2QoKSwgJycpKVxuICAgIH1cbiAgfVxuICB2YXJzLmZpcnN0VGltZSA9IGZhbHNlXG4gIGxldCBqc1xuICBpZiAodmFycy5wcm9kdWN0aW9uKSB7XG4gICAgdmFycy5kZXBzLnB1c2goJ0V4dC5yZXF1aXJlKFwiRXh0LmxheW91dC4qXCIpO1xcbicpXG4gICAganMgPSB2YXJzLmRlcHMuam9pbignO1xcbicpO1xuICB9XG4gIGVsc2Uge1xuICAgIGpzID0gJ0V4dC5yZXF1aXJlKFwiRXh0LipcIiknXG4gIH1cbiAgaWYgKHZhcnMubWFuaWZlc3QgPT09IG51bGwgfHwganMgIT09IHZhcnMubWFuaWZlc3QpIHtcbiAgICB2YXJzLm1hbmlmZXN0ID0ganNcbiAgICBjb25zdCBtYW5pZmVzdCA9IHBhdGguam9pbihvdXRwdXQsICdtYW5pZmVzdC5qcycpXG4gICAgZnMud3JpdGVGaWxlU3luYyhtYW5pZmVzdCwganMsICd1dGY4JylcbiAgICB2YXJzLnJlYnVpbGQgPSB0cnVlXG4gICAgbG9nKGFwcCArICdCdWlsZGluZyBFeHQgYnVuZGxlIGF0OiAnICsgb3V0cHV0LnJlcGxhY2UocHJvY2Vzcy5jd2QoKSwgJycpKVxuICB9XG4gIGVsc2Uge1xuICAgIHZhcnMucmVidWlsZCA9IGZhbHNlXG4gICAgbG9nKGFwcCArICdFeHRSZWFjdCByZWJ1aWxkIE5PVCBuZWVkZWQnKVxuICB9XG59XG5cblxuXG5leHBvcnQgZnVuY3Rpb24gX2J1aWxkRXh0QnVuZGxlKGFwcCwgY29tcGlsYXRpb24sIGNtZEVycm9ycywgb3V0cHV0LCBwYXJtcywgb3B0aW9ucykge1xuICBjb25zdCBsb2d2ID0gcmVxdWlyZSgnLi9wbHVnaW5VdGlsJykubG9ndlxuICBsb2d2KG9wdGlvbnMudmVyYm9zZSwgYXBwICsgJ0ZVTkNUSU9OIF9idWlsZEV4dEJ1bmRsZScpXG5cbiAgbGV0IHNlbmNoYTsgdHJ5IHsgc2VuY2hhID0gcmVxdWlyZSgnQHNlbmNoYS9jbWQnKSB9IGNhdGNoIChlKSB7IHNlbmNoYSA9ICdzZW5jaGEnIH1cblxuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgY29uc3Qgb25CdWlsZERvbmUgPSAoKSA9PiB7XG4gICAgbG9ndihvcHRpb25zLnZlcmJvc2UsIGFwcCArICdvbkJ1aWxkRG9uZScpXG4gICAgaWYgKGNtZEVycm9ycy5sZW5ndGgpIHtcbiAgICAgIHJlamVjdChuZXcgRXJyb3IoY21kRXJyb3JzLmpvaW4oXCJcIikpKVxuICAgIH0gZWxzZSB7XG4gICAgICByZXNvbHZlKClcbiAgICB9XG4gICB9XG5cbiAgIHZhciBvcHRzID0geyBjd2Q6IG91dHB1dCwgc2lsZW50OiB0cnVlLCBzdGRpbzogJ3BpcGUnLCBlbmNvZGluZzogJ3V0Zi04J31cbiAgIGV4ZWN1dGVBc3luYyhhcHAsIHNlbmNoYSwgcGFybXMsIG9wdHMsIGNvbXBpbGF0aW9uLCBjbWRFcnJvcnMsIG9wdGlvbnMpLnRoZW4gKFxuICAgICBmdW5jdGlvbigpIHsgb25CdWlsZERvbmUoKSB9LCBcbiAgICAgZnVuY3Rpb24ocmVhc29uKSB7IHJlc29sdmUocmVhc29uKSB9XG4gICApXG4gfSlcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGV4ZWN1dGVBc3luYyAoYXBwLCBjb21tYW5kLCBwYXJtcywgb3B0cywgY29tcGlsYXRpb24sIGNtZEVycm9ycywgb3B0aW9ucykge1xuICAvL2NvbnN0IERFRkFVTFRfU1VCU1RSUyA9IFsnW0lORl0gTG9hZGluZycsICdbSU5GXSBQcm9jZXNzaW5nJywgJ1tMT0ddIEZhc2hpb24gYnVpbGQgY29tcGxldGUnLCAnW0VSUl0nLCAnW1dSTl0nLCBcIltJTkZdIFNlcnZlclwiLCBcIltJTkZdIFdyaXRpbmdcIiwgXCJbSU5GXSBMb2FkaW5nIEJ1aWxkXCIsIFwiW0lORl0gV2FpdGluZ1wiLCBcIltMT0ddIEZhc2hpb24gd2FpdGluZ1wiXTtcbiAgY29uc3QgREVGQVVMVF9TVUJTVFJTID0gWydbSU5GXSBMb2FkaW5nJywgJ1tJTkZdIEFwcGVuZCcsICdbSU5GXSBQcm9jZXNzaW5nJywgJ1tJTkZdIFByb2Nlc3NpbmcgQnVpbGQnLCAnW0xPR10gRmFzaGlvbiBidWlsZCBjb21wbGV0ZScsICdbRVJSXScsICdbV1JOXScsIFwiW0lORl0gU2VydmVyXCIsIFwiW0lORl0gV3JpdGluZ1wiLCBcIltJTkZdIExvYWRpbmcgQnVpbGRcIiwgXCJbSU5GXSBXYWl0aW5nXCIsIFwiW0xPR10gRmFzaGlvbiB3YWl0aW5nXCJdO1xuICB2YXIgc3Vic3RyaW5ncyA9IERFRkFVTFRfU1VCU1RSUyBcbiAgdmFyIGNoYWxrID0gcmVxdWlyZSgnY2hhbGsnKVxuICBjb25zdCBjcm9zc1NwYXduID0gcmVxdWlyZSgnY3Jvc3Mtc3Bhd24nKVxuICBjb25zdCBsb2cgPSByZXF1aXJlKCcuL3BsdWdpblV0aWwnKS5sb2dcbiAgbG9ndihvcHRpb25zLnZlcmJvc2UsIGFwcCArICdGVU5DVElPTiBleGVjdXRlQXN5bmMnKVxuICBhd2FpdCBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgbG9ndihvcHRpb25zLnZlcmJvc2UsIGAke2FwcH0gY29tbWFuZCAtICR7Y29tbWFuZH1gKVxuICAgIGxvZ3Yob3B0aW9ucy52ZXJib3NlLCBgJHthcHB9IHBhcm1zIC0gJHtwYXJtc31gKVxuICAgIGxvZ3Yob3B0aW9ucy52ZXJib3NlLCBgJHthcHB9IG9wdHMgLSAke0pTT04uc3RyaW5naWZ5KG9wdHMpfWApXG4gICAgbGV0IGNoaWxkID0gY3Jvc3NTcGF3bihjb21tYW5kLCBwYXJtcywgb3B0cylcbiAgICBjaGlsZC5vbignY2xvc2UnLCAoY29kZSwgc2lnbmFsKSA9PiB7XG4gICAgICAvL2xvZyhgLXYtJHthcHB9YCkgXG4gICAgICBpZihjb2RlID09PSAwKSB7IHJlc29sdmUoMCkgfVxuICAgICAgZWxzZSB7IGNvbXBpbGF0aW9uLmVycm9ycy5wdXNoKCBuZXcgRXJyb3IoY21kRXJyb3JzLmpvaW4oXCJcIikpICk7IHJlamVjdCgwKSB9XG4gICAgfSlcbiAgICBjaGlsZC5vbignZXJyb3InLCAoZXJyb3IpID0+IHsgXG4gICAgICAvL2xvZyhgLXYtJHthcHB9MGApIFxuICAgICAgY21kRXJyb3JzLnB1c2goZXJyb3IpXG4gICAgICByZWplY3QoZXJyb3IpIFxuICAgIH0pXG4gICAgY2hpbGQuc3Rkb3V0Lm9uKCdkYXRhJywgKGRhdGEpID0+IHtcbiAgICAgIHZhciBzdHIgPSBkYXRhLnRvU3RyaW5nKCkucmVwbGFjZSgvXFxyP1xcbnxcXHIvZywgXCIgXCIpLnRyaW0oKVxuICAgICAgbG9ndihvcHRpb25zLnZlcmJvc2UsIGAke2FwcH0gJHtzdHJ9YClcbiAgICAgIGlmIChkYXRhICYmIGRhdGEudG9TdHJpbmcoKS5tYXRjaCgvV2FpdGluZyBmb3IgY2hhbmdlc1xcLlxcLlxcLi8pKSB7XG4gICAgICAgIHJlc29sdmUoMClcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBpZiAoc3Vic3RyaW5ncy5zb21lKGZ1bmN0aW9uKHYpIHsgcmV0dXJuIGRhdGEuaW5kZXhPZih2KSA+PSAwOyB9KSkgeyBcbiAgICAgICAgICBzdHIgPSBzdHIucmVwbGFjZShcIltJTkZdXCIsIFwiXCIpXG4gICAgICAgICAgc3RyID0gc3RyLnJlcGxhY2UoXCJbTE9HXVwiLCBcIlwiKVxuICAgICAgICAgIHN0ciA9IHN0ci5yZXBsYWNlKHByb2Nlc3MuY3dkKCksICcnKS50cmltKClcbiAgICAgICAgICBpZiAoc3RyLmluY2x1ZGVzKFwiW0VSUl1cIikpIHtcbiAgICAgICAgICAgIGNtZEVycm9ycy5wdXNoKGFwcCArIHN0ci5yZXBsYWNlKC9eXFxbRVJSXFxdIC9naSwgJycpKTtcbiAgICAgICAgICAgIHN0ciA9IHN0ci5yZXBsYWNlKFwiW0VSUl1cIiwgYCR7Y2hhbGsucmVkKFwiW0VSUl1cIil9YClcbiAgICAgICAgICB9XG4gICAgICAgICAgbG9nKGAke2FwcH0ke3N0cn1gKSBcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pXG4gICAgY2hpbGQuc3RkZXJyLm9uKCdkYXRhJywgKGRhdGEpID0+IHtcbiAgICAgIC8vbG9nKGAtdi0ke2FwcH00YCkgXG4gICAgICB2YXIgc3RyID0gZGF0YS50b1N0cmluZygpLnJlcGxhY2UoL1xccj9cXG58XFxyL2csIFwiIFwiKS50cmltKClcbiAgICAgIHZhciBzdHJKYXZhT3B0cyA9IFwiUGlja2VkIHVwIF9KQVZBX09QVElPTlNcIjtcbiAgICAgIHZhciBpbmNsdWRlcyA9IHN0ci5pbmNsdWRlcyhzdHJKYXZhT3B0cylcbiAgICAgIGlmICghaW5jbHVkZXMpIHtcbiAgICAgICAgY29uc29sZS5sb2coYCR7YXBwfSAke2NoYWxrLnJlZChcIltFUlJdXCIpfSAke3N0cn1gKVxuICAgICAgfVxuICAgIH0pXG4gIH0pXG59XG4iXX0=