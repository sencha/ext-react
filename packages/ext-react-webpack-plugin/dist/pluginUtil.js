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
    var log, logv, app, framework, path, _buildExtBundle, outputPath, parms, url, opn;

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
            _context.next = 23;
            break;
          }

          if (framework != 'extjs') {
            _prepareForBuild(app, vars, options, outputPath, compilation);
          } else {
            require(`./${framework}Util`)._prepareForBuild(app, vars, options, outputPath, compilation);
          }

          if (!(vars.rebuild == true)) {
            _context.next = 21;
            break;
          }

          parms = [];

          if (options.profile == undefined || options.profile == '' || options.profile == null) {
            parms = ['app', 'watch', options.environment];
          } else {
            parms = ['app', 'watch', options.profile, options.environment];
          }

          _context.next = 19;
          return _buildExtBundle(app, compilation, outputPath, parms, options);

        case 19:
          //const jsChunk = compilation.addChunk(`ext-angular-js`)
          //jsChunk.hasRuntime = jsChunk.isInitial = () => true;
          //jsChunk.files.push(path.join('build', 'ext-angular', 'ext.js'));
          //jsChunk.files.push(path.join('build', 'ext-angular',  'ext.css'));
          //jsChunk.id = -2; // this forces html-webpack-plugin to include ext.js first
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
          log(`${vars.app}FUNCTION emit not run`);

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
          _context.next = 33;
          break;

        case 28:
          _context.prev = 28;
          _context.t0 = _context["catch"](0);

          require('./pluginUtil').logv(options, _context.t0);

          compilation.errors.push('emit: ' + _context.t0);
          callback();

        case 33:
        case "end":
          return _context.stop();
      }
    }, _callee, this, [[0, 28]]);
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
      } // if (fs.existsSync(path.join(process.cwd(),vars.extPath + '/packages/'))) {
      //   var fromPackages = path.join(process.cwd(),vars.extPath + '/packages/')
      //   var toPackages = path.join(output, 'packages/')
      //   fsx.copySync(fromPackages, toPackages)
      //   log(app + 'Copying ' + fromPackages.replace(process.cwd(), '') + ' to: ' + toPackages.replace(process.cwd(), ''))
      // }
      // if (fs.existsSync(path.join(process.cwd(),vars.extPath + '/overrides/'))) {
      //   var fromOverrides = path.join(process.cwd(),vars.extPath + '/overrides/')
      //   var toOverrides = path.join(output, 'overrides/')
      //   fsx.copySync(fromOverrides, toOverrides)
      //   log(app + 'Copying ' + fromOverrides.replace(process.cwd(), '') + ' to: ' + toOverrides.replace(process.cwd(), ''))
      //}

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
  v.extVersion = extPkg.sencha.version; //var cmdPath = path.resolve(process.cwd(),`node_modules/@sencha/${pluginName}/node_modules/@sencha/cmd`)

  var cmdPath = path.resolve(process.cwd(), `node_modules/@sencha/cmd`);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9wbHVnaW5VdGlsLmpzIl0sIm5hbWVzIjpbIl9jb25zdHJ1Y3RvciIsIm9wdGlvbnMiLCJ0aGlzVmFycyIsInRoaXNPcHRpb25zIiwicGx1Z2luIiwiZnJhbWV3b3JrIiwidW5kZWZpbmVkIiwicGx1Z2luRXJyb3JzIiwicHVzaCIsInZhcnMiLCJ2YWxpZGF0ZU9wdGlvbnMiLCJyZXF1aXJlIiwiZ2V0VmFsaWRhdGVPcHRpb25zIiwiZ2V0RGVmYXVsdFZhcnMiLCJwbHVnaW5OYW1lIiwiYXBwIiwiX2dldEFwcCIsImxvZ3YiLCJmcyIsInJjIiwiZXhpc3RzU3luYyIsIkpTT04iLCJwYXJzZSIsInJlYWRGaWxlU3luYyIsImdldERlZmF1bHRPcHRpb25zIiwic3RyaW5naWZ5IiwiZW52aXJvbm1lbnQiLCJwcm9kdWN0aW9uIiwibG9nIiwiX2dldFZlcnNpb25zIiwiX2NvbXBpbGF0aW9uIiwiY29tcGlsZXIiLCJjb21waWxhdGlvbiIsImhvb2tzIiwic3VjY2VlZE1vZHVsZSIsInRhcCIsIm1vZHVsZSIsInJlc291cmNlIiwibWF0Y2giLCJ0b29sa2l0IiwiZGVwcyIsImV4dHJhY3RGcm9tU291cmNlIiwiaHRtbFdlYnBhY2tQbHVnaW5CZWZvcmVIdG1sR2VuZXJhdGlvbiIsImRhdGEiLCJwYXRoIiwib3V0cHV0UGF0aCIsImRldlNlcnZlciIsImpvaW4iLCJjb250ZW50QmFzZSIsInJlcGxhY2UiLCJwcm9jZXNzIiwiY3dkIiwidHJpbSIsImpzUGF0aCIsImV4dFBhdGgiLCJjc3NQYXRoIiwiYXNzZXRzIiwianMiLCJ1bnNoaWZ0IiwiY3NzIiwiZSIsImVycm9ycyIsImVtaXQiLCJjYWxsYmFjayIsIl9idWlsZEV4dEJ1bmRsZSIsIl9wcmVwYXJlRm9yQnVpbGQiLCJyZWJ1aWxkIiwicGFybXMiLCJwcm9maWxlIiwiYnJvd3NlciIsImJyb3dzZXJDb3VudCIsImxlbmd0aCIsInVybCIsInBvcnQiLCJvcG4iLCJvdXRwdXQiLCJyaW1yYWYiLCJta2RpcnAiLCJmc3giLCJwYWNrYWdlcyIsInRoZW1lIiwiZmlyc3RUaW1lIiwic3luYyIsImJ1aWxkWE1MIiwiY3JlYXRlQXBwSnNvbiIsImNyZWF0ZVdvcmtzcGFjZUpzb24iLCJjcmVhdGVKU0RPTUVudmlyb25tZW50Iiwid3JpdGVGaWxlU3luYyIsImZyb21SZXNvdXJjZXMiLCJ0b1Jlc291cmNlcyIsImNvcHlTeW5jIiwibWFuaWZlc3QiLCJzZW5jaGEiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsIm9uQnVpbGREb25lIiwib3B0cyIsInNpbGVudCIsInN0ZGlvIiwiZW5jb2RpbmciLCJleGVjdXRlQXN5bmMiLCJ0aGVuIiwicmVhc29uIiwiY29tbWFuZCIsIkRFRkFVTFRfU1VCU1RSUyIsInN1YnN0cmluZ3MiLCJjaGFsayIsImNyb3NzU3Bhd24iLCJjaGlsZCIsIm9uIiwiY29kZSIsInNpZ25hbCIsIkVycm9yIiwiZXJyb3IiLCJzdGRvdXQiLCJzdHIiLCJ0b1N0cmluZyIsInNvbWUiLCJ2IiwiaW5kZXhPZiIsImluY2x1ZGVzIiwicmVkIiwic3RkZXJyIiwic3RySmF2YU9wdHMiLCJjb25zb2xlIiwicyIsImN1cnNvclRvIiwiY2xlYXJMaW5lIiwid3JpdGUiLCJ2ZXJib3NlIiwicHJlZml4IiwicGxhdGZvcm0iLCJncmVlbiIsImZyYW1ld29ya05hbWUiLCJwbHVnaW5QYXRoIiwicGx1Z2luUGtnIiwicGx1Z2luVmVyc2lvbiIsInZlcnNpb24iLCJ3ZWJwYWNrUGF0aCIsIndlYnBhY2tQa2ciLCJ3ZWJwYWNrVmVyc2lvbiIsImV4dFBrZyIsImV4dFZlcnNpb24iLCJjbWRQYXRoIiwiY21kUGtnIiwiY21kVmVyc2lvbiIsInZlcnNpb25fZnVsbCIsImZyYW1ld29ya0luZm8iLCJmcmFtZXdvcmtQYXRoIiwiZnJhbWV3b3JrUGtnIiwiZnJhbWV3b3JrVmVyc2lvbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDTyxTQUFTQSxZQUFULENBQXNCQyxP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b3VyY2VzQ29udGVudCI6WyIvLyoqKioqKioqKipcbmV4cG9ydCBmdW5jdGlvbiBfY29uc3RydWN0b3Iob3B0aW9ucykge1xuICB2YXIgdGhpc1ZhcnMgPSB7fVxuICB2YXIgdGhpc09wdGlvbnMgPSB7fVxuICB2YXIgcGx1Z2luID0ge31cblxuICBpZiAob3B0aW9ucy5mcmFtZXdvcmsgPT0gdW5kZWZpbmVkKSB7XG4gICAgdGhpc1ZhcnMucGx1Z2luRXJyb3JzID0gW11cbiAgICB0aGlzVmFycy5wbHVnaW5FcnJvcnMucHVzaCgnd2VicGFjayBjb25maWc6IGZyYW1ld29yayBwYXJhbWV0ZXIgb24gZXh0LXdlYnBhY2stcGx1Z2luIGlzIG5vdCBkZWZpbmVkIC0gdmFsdWVzOiByZWFjdCwgYW5ndWxhciwgZXh0anMnKVxuICAgIHBsdWdpbi52YXJzID0gdGhpc1ZhcnNcbiAgICByZXR1cm4gcGx1Z2luXG4gIH1cblxuICBjb25zdCB2YWxpZGF0ZU9wdGlvbnMgPSByZXF1aXJlKCdzY2hlbWEtdXRpbHMnKVxuICB2YWxpZGF0ZU9wdGlvbnMocmVxdWlyZShgLi8ke29wdGlvbnMuZnJhbWV3b3JrfVV0aWxgKS5nZXRWYWxpZGF0ZU9wdGlvbnMoKSwgb3B0aW9ucywgJycpXG5cbiAgdGhpc1ZhcnMgPSByZXF1aXJlKGAuLyR7b3B0aW9ucy5mcmFtZXdvcmt9VXRpbGApLmdldERlZmF1bHRWYXJzKClcbiAgdGhpc1ZhcnMuZnJhbWV3b3JrID0gb3B0aW9ucy5mcmFtZXdvcmtcbiAgc3dpdGNoKHRoaXNWYXJzLmZyYW1ld29yaykge1xuICAgIGNhc2UgJ2V4dGpzJzpcbiAgICAgIHRoaXNWYXJzLnBsdWdpbk5hbWUgPSAnZXh0LXdlYnBhY2stcGx1Z2luJ1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAncmVhY3QnOlxuICAgICAgdGhpc1ZhcnMucGx1Z2luTmFtZSA9ICdleHQtcmVhY3Qtd2VicGFjay1wbHVnaW4nXG4gICAgICBicmVhaztcbiAgICBjYXNlICdhbmd1bGFyJzpcbiAgICAgIHRoaXNWYXJzLnBsdWdpbk5hbWUgPSAnZXh0LWFuZ3VsYXItd2VicGFjay1wbHVnaW4nXG4gICAgICBicmVhaztcbiAgICBkZWZhdWx0OlxuICAgICAgdGhpc1ZhcnMucGx1Z2luTmFtZSA9ICdleHQtd2VicGFjay1wbHVnaW4nXG4gIH1cbiAgdGhpc1ZhcnMuYXBwID0gcmVxdWlyZSgnLi9wbHVnaW5VdGlsJykuX2dldEFwcCgpXG4gIGxvZ3Yob3B0aW9ucywgYHBsdWdpbk5hbWUgLSAke3RoaXNWYXJzLnBsdWdpbk5hbWV9YClcbiAgbG9ndihvcHRpb25zLCBgdGhpc1ZhcnMuYXBwIC0gJHt0aGlzVmFycy5hcHB9YClcbiAgY29uc3QgZnMgPSByZXF1aXJlKCdmcycpXG4gIGNvbnN0IHJjID0gKGZzLmV4aXN0c1N5bmMoYC5leHQtJHt0aGlzVmFycy5mcmFtZXdvcmt9cmNgKSAmJiBKU09OLnBhcnNlKGZzLnJlYWRGaWxlU3luYyhgLmV4dC0ke3RoaXNWYXJzLmZyYW1ld29ya31yY2AsICd1dGYtOCcpKSB8fCB7fSlcbiAgdGhpc09wdGlvbnMgPSB7IC4uLnJlcXVpcmUoYC4vJHt0aGlzVmFycy5mcmFtZXdvcmt9VXRpbGApLmdldERlZmF1bHRPcHRpb25zKCksIC4uLm9wdGlvbnMsIC4uLnJjIH1cbiAgbG9ndihvcHRpb25zLCBgdGhpc09wdGlvbnMgLSAke0pTT04uc3RyaW5naWZ5KHRoaXNPcHRpb25zKX1gKVxuICBpZiAodGhpc09wdGlvbnMuZW52aXJvbm1lbnQgPT0gJ3Byb2R1Y3Rpb24nKSBcbiAgICB7dGhpc1ZhcnMucHJvZHVjdGlvbiA9IHRydWV9XG4gIGVsc2UgXG4gICAge3RoaXNWYXJzLnByb2R1Y3Rpb24gPSBmYWxzZX1cbiAgbG9nKHJlcXVpcmUoJy4vcGx1Z2luVXRpbCcpLl9nZXRWZXJzaW9ucyh0aGlzVmFycy5hcHAsIHRoaXNWYXJzLnBsdWdpbk5hbWUsIHRoaXNWYXJzLmZyYW1ld29yaykpXG4gIGxvZyh0aGlzVmFycy5hcHAgKyAnQnVpbGRpbmcgZm9yICcgKyB0aGlzT3B0aW9ucy5lbnZpcm9ubWVudClcblxuICBwbHVnaW4udmFycyA9IHRoaXNWYXJzXG4gIHBsdWdpbi5vcHRpb25zID0gdGhpc09wdGlvbnNcbiAgcmV0dXJuIHBsdWdpblxufVxuXG4vLyoqKioqKioqKipcbmV4cG9ydCBmdW5jdGlvbiBfY29tcGlsYXRpb24oY29tcGlsZXIsIGNvbXBpbGF0aW9uLCB2YXJzLCBvcHRpb25zKSB7XG4gIHRyeSB7XG4gICAgcmVxdWlyZSgnLi9wbHVnaW5VdGlsJykubG9ndihvcHRpb25zLCdGVU5DVElPTiBfY29tcGlsYXRpb24nKVxuICAgIGlmICh2YXJzLnByb2R1Y3Rpb24pIHtcbiAgICAgIGxvZ3Yob3B0aW9ucyxgZXh0LWNvbXBpbGF0aW9uOiBwcm9kdWN0aW9uIGlzIGAgKyAgdmFycy5wcm9kdWN0aW9uKVxuICAgICAgY29tcGlsYXRpb24uaG9va3Muc3VjY2VlZE1vZHVsZS50YXAoYGV4dC1zdWNjZWVkLW1vZHVsZWAsIChtb2R1bGUpID0+IHtcbiAgICAgICAgaWYgKG1vZHVsZS5yZXNvdXJjZSAmJiBtb2R1bGUucmVzb3VyY2UubWF0Y2goL1xcLihqfHQpc3g/JC8pICYmICFtb2R1bGUucmVzb3VyY2UubWF0Y2goL25vZGVfbW9kdWxlcy8pICYmICFtb2R1bGUucmVzb3VyY2UubWF0Y2goYC9leHQteyRvcHRpb25zLmZyYW1ld29ya30vZGlzdC9gKSAmJiAhbW9kdWxlLnJlc291cmNlLm1hdGNoKGAvZXh0LSR7b3B0aW9ucy5mcmFtZXdvcmt9LSR7b3B0aW9ucy50b29sa2l0fS9gKSkge1xuICAgICAgICAgIHZhcnMuZGVwcyA9IFsgXG4gICAgICAgICAgICAuLi4odmFycy5kZXBzIHx8IFtdKSwgXG4gICAgICAgICAgICAuLi5yZXF1aXJlKGAuLyR7dmFycy5mcmFtZXdvcmt9VXRpbGApLmV4dHJhY3RGcm9tU291cmNlKG1vZHVsZSwgb3B0aW9ucywgY29tcGlsYXRpb24pIFxuICAgICAgICAgIF1cbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBsb2d2KG9wdGlvbnMsYGV4dC1jb21waWxhdGlvbjogcHJvZHVjdGlvbiBpcyBgICsgIHZhcnMucHJvZHVjdGlvbilcbiAgICB9XG4gICAgaWYgKG9wdGlvbnMuZnJhbWV3b3JrICE9ICdhbmd1bGFyJykge1xuICAgICAgY29tcGlsYXRpb24uaG9va3MuaHRtbFdlYnBhY2tQbHVnaW5CZWZvcmVIdG1sR2VuZXJhdGlvbi50YXAoYGV4dC1odG1sLWdlbmVyYXRpb25gLChkYXRhKSA9PiB7XG4gICAgICAgIGxvZ3Yob3B0aW9ucywnSE9PSyBleHQtaHRtbC1nZW5lcmF0aW9uJylcbiAgICAgICAgY29uc3QgcGF0aCA9IHJlcXVpcmUoJ3BhdGgnKVxuICAgICAgICB2YXIgb3V0cHV0UGF0aCA9ICcnXG4gICAgICAgIGlmIChjb21waWxlci5vcHRpb25zLmRldlNlcnZlcikge1xuICAgICAgICAgIGlmIChjb21waWxlci5vdXRwdXRQYXRoID09PSAnLycpIHtcbiAgICAgICAgICAgIG91dHB1dFBhdGggPSBwYXRoLmpvaW4oY29tcGlsZXIub3B0aW9ucy5kZXZTZXJ2ZXIuY29udGVudEJhc2UsIG91dHB1dFBhdGgpXG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaWYgKGNvbXBpbGVyLm9wdGlvbnMuZGV2U2VydmVyLmNvbnRlbnRCYXNlID09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICBvdXRwdXRQYXRoID0gJ2J1aWxkJ1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgIG91dHB1dFBhdGggPSAnJ1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBvdXRwdXRQYXRoID0gJ2J1aWxkJ1xuICAgICAgICB9XG4gICAgICAgIG91dHB1dFBhdGggPSBvdXRwdXRQYXRoLnJlcGxhY2UocHJvY2Vzcy5jd2QoKSwgJycpLnRyaW0oKVxuICAgICAgICB2YXIganNQYXRoID0gcGF0aC5qb2luKG91dHB1dFBhdGgsIHZhcnMuZXh0UGF0aCwgJ2V4dC5qcycpXG4gICAgICAgIHZhciBjc3NQYXRoID0gcGF0aC5qb2luKG91dHB1dFBhdGgsIHZhcnMuZXh0UGF0aCwgJ2V4dC5jc3MnKVxuICAgICAgICBkYXRhLmFzc2V0cy5qcy51bnNoaWZ0KGpzUGF0aClcbiAgICAgICAgZGF0YS5hc3NldHMuY3NzLnVuc2hpZnQoY3NzUGF0aClcbiAgICAgICAgbG9nKHZhcnMuYXBwICsgYEFkZGluZyAke2pzUGF0aH0gYW5kICR7Y3NzUGF0aH0gdG8gaW5kZXguaHRtbGApXG4gICAgICB9KVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGxvZ3Yob3B0aW9ucywnc2tpcHBlZCBIT09LIGV4dC1odG1sLWdlbmVyYXRpb24nKVxuICAgIH1cbiAgfVxuICBjYXRjaChlKSB7XG4gICAgcmVxdWlyZSgnLi9wbHVnaW5VdGlsJykubG9ndihvcHRpb25zLGUpXG4gICAgY29tcGlsYXRpb24uZXJyb3JzLnB1c2goJ19jb21waWxhdGlvbjogJyArIGUpXG4gIH1cbn1cblxuLy8qKioqKioqKioqXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZW1pdChjb21waWxlciwgY29tcGlsYXRpb24sIHZhcnMsIG9wdGlvbnMsIGNhbGxiYWNrKSB7XG4gIHRyeSB7XG4gICAgY29uc3QgbG9nID0gcmVxdWlyZSgnLi9wbHVnaW5VdGlsJykubG9nXG4gICAgY29uc3QgbG9ndiA9IHJlcXVpcmUoJy4vcGx1Z2luVXRpbCcpLmxvZ3ZcbiAgICBsb2d2KG9wdGlvbnMsJ0ZVTkNUSU9OIGVtaXQnKVxuICAgIHZhciBhcHAgPSB2YXJzLmFwcFxuICAgIHZhciBmcmFtZXdvcmsgPSB2YXJzLmZyYW1ld29ya1xuICAgIGNvbnN0IHBhdGggPSByZXF1aXJlKCdwYXRoJylcbiAgICBjb25zdCBfYnVpbGRFeHRCdW5kbGUgPSByZXF1aXJlKCcuL3BsdWdpblV0aWwnKS5fYnVpbGRFeHRCdW5kbGVcbiAgICBsZXQgb3V0cHV0UGF0aCA9IHBhdGguam9pbihjb21waWxlci5vdXRwdXRQYXRoLHZhcnMuZXh0UGF0aClcbiAgICBpZiAoY29tcGlsZXIub3V0cHV0UGF0aCA9PT0gJy8nICYmIGNvbXBpbGVyLm9wdGlvbnMuZGV2U2VydmVyKSB7XG4gICAgICBvdXRwdXRQYXRoID0gcGF0aC5qb2luKGNvbXBpbGVyLm9wdGlvbnMuZGV2U2VydmVyLmNvbnRlbnRCYXNlLCBvdXRwdXRQYXRoKVxuICAgIH1cbiAgICBsb2d2KG9wdGlvbnMsJ291dHB1dFBhdGg6ICcgKyBvdXRwdXRQYXRoKVxuICAgIGxvZ3Yob3B0aW9ucywnZnJhbWV3b3JrOiAnICsgZnJhbWV3b3JrKVxuICAgIGlmIChvcHRpb25zLmVtaXQgPT0gdHJ1ZSkge1xuICAgICAgaWYgKGZyYW1ld29yayAhPSAnZXh0anMnKSB7XG4gICAgICAgIF9wcmVwYXJlRm9yQnVpbGQoYXBwLCB2YXJzLCBvcHRpb25zLCBvdXRwdXRQYXRoLCBjb21waWxhdGlvbilcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICByZXF1aXJlKGAuLyR7ZnJhbWV3b3JrfVV0aWxgKS5fcHJlcGFyZUZvckJ1aWxkKGFwcCwgdmFycywgb3B0aW9ucywgb3V0cHV0UGF0aCwgY29tcGlsYXRpb24pXG4gICAgICB9XG4gICAgICBpZiAodmFycy5yZWJ1aWxkID09IHRydWUpIHtcbiAgICAgICAgdmFyIHBhcm1zID0gW11cbiAgICAgICAgaWYgKG9wdGlvbnMucHJvZmlsZSA9PSB1bmRlZmluZWQgfHwgb3B0aW9ucy5wcm9maWxlID09ICcnIHx8IG9wdGlvbnMucHJvZmlsZSA9PSBudWxsKSB7XG4gICAgICAgICAgcGFybXMgPSBbJ2FwcCcsICd3YXRjaCcsIG9wdGlvbnMuZW52aXJvbm1lbnRdXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgcGFybXMgPSBbJ2FwcCcsICd3YXRjaCcsIG9wdGlvbnMucHJvZmlsZSwgb3B0aW9ucy5lbnZpcm9ubWVudF1cbiAgICAgICAgfVxuICAgICAgICBhd2FpdCBfYnVpbGRFeHRCdW5kbGUoYXBwLCBjb21waWxhdGlvbiwgb3V0cHV0UGF0aCwgcGFybXMsIG9wdGlvbnMpXG5cbiAgICAgICAgLy9jb25zdCBqc0NodW5rID0gY29tcGlsYXRpb24uYWRkQ2h1bmsoYGV4dC1hbmd1bGFyLWpzYClcbiAgICAgICAgLy9qc0NodW5rLmhhc1J1bnRpbWUgPSBqc0NodW5rLmlzSW5pdGlhbCA9ICgpID0+IHRydWU7XG4gICAgICAgIC8vanNDaHVuay5maWxlcy5wdXNoKHBhdGguam9pbignYnVpbGQnLCAnZXh0LWFuZ3VsYXInLCAnZXh0LmpzJykpO1xuICAgICAgICAvL2pzQ2h1bmsuZmlsZXMucHVzaChwYXRoLmpvaW4oJ2J1aWxkJywgJ2V4dC1hbmd1bGFyJywgICdleHQuY3NzJykpO1xuICAgICAgICAvL2pzQ2h1bmsuaWQgPSAtMjsgLy8gdGhpcyBmb3JjZXMgaHRtbC13ZWJwYWNrLXBsdWdpbiB0byBpbmNsdWRlIGV4dC5qcyBmaXJzdFxuXG4gICAgICAgIGlmKG9wdGlvbnMuYnJvd3NlciA9PSB0cnVlKSB7XG4gICAgICAgICAgaWYgKHZhcnMuYnJvd3NlckNvdW50ID09IDAgJiYgY29tcGlsYXRpb24uZXJyb3JzLmxlbmd0aCA9PSAwKSB7XG4gICAgICAgICAgICB2YXIgdXJsID0gJ2h0dHA6Ly9sb2NhbGhvc3Q6JyArIG9wdGlvbnMucG9ydFxuICAgICAgICAgICAgbG9nKGFwcCArIGBPcGVuaW5nIGJyb3dzZXIgYXQgJHt1cmx9YClcbiAgICAgICAgICAgIHZhcnMuYnJvd3NlckNvdW50KytcbiAgICAgICAgICAgIGNvbnN0IG9wbiA9IHJlcXVpcmUoJ29wbicpXG4gICAgICAgICAgICBvcG4odXJsKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBsb2d2KG9wdGlvbnMsJ2Jyb3dzZXIgTk9UIG9wZW5lZCcpXG4gICAgICAgIH1cbiAgICAgICAgY2FsbGJhY2soKVxuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGxvZyhgJHt2YXJzLmFwcH1GVU5DVElPTiBlbWl0IG5vdCBydW5gKVxuICAgICAgaWYob3B0aW9ucy5icm93c2VyID09IHRydWUpIHtcbiAgICAgICAgaWYgKHZhcnMuYnJvd3NlckNvdW50ID09IDAgJiYgY29tcGlsYXRpb24uZXJyb3JzLmxlbmd0aCA9PSAwKSB7XG4gICAgICAgICAgdmFyIHVybCA9ICdodHRwOi8vbG9jYWxob3N0OicgKyBvcHRpb25zLnBvcnRcbiAgICAgICAgICBsb2coYXBwICsgYE9wZW5pbmcgYnJvd3NlciBhdCAke3VybH1gKVxuICAgICAgICAgIHZhcnMuYnJvd3NlckNvdW50KytcbiAgICAgICAgICBjb25zdCBvcG4gPSByZXF1aXJlKCdvcG4nKVxuICAgICAgICAgIG9wbih1cmwpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBsb2d2KG9wdGlvbnMsJ2Jyb3dzZXIgTk9UIG9wZW5lZCcpXG4gICAgICB9XG4gICAgICBjYWxsYmFjaygpXG4gICAgfVxuICB9XG4gIGNhdGNoKGUpIHtcbiAgICByZXF1aXJlKCcuL3BsdWdpblV0aWwnKS5sb2d2KG9wdGlvbnMsZSlcbiAgICBjb21waWxhdGlvbi5lcnJvcnMucHVzaCgnZW1pdDogJyArIGUpXG4gICAgY2FsbGJhY2soKVxuICB9XG59XG5cbi8vKioqKioqKioqKlxuZXhwb3J0IGZ1bmN0aW9uIF9wcmVwYXJlRm9yQnVpbGQoYXBwLCB2YXJzLCBvcHRpb25zLCBvdXRwdXQsIGNvbXBpbGF0aW9uKSB7XG4gIHRyeSB7XG4gICAgbG9ndihvcHRpb25zLCdGVU5DVElPTiBfcHJlcGFyZUZvckJ1aWxkJylcbiAgICBjb25zdCByaW1yYWYgPSByZXF1aXJlKCdyaW1yYWYnKVxuICAgIGNvbnN0IG1rZGlycCA9IHJlcXVpcmUoJ21rZGlycCcpXG4gICAgY29uc3QgZnN4ID0gcmVxdWlyZSgnZnMtZXh0cmEnKVxuICAgIGNvbnN0IGZzID0gcmVxdWlyZSgnZnMnKVxuICAgIGNvbnN0IHBhdGggPSByZXF1aXJlKCdwYXRoJylcblxuICAgIHZhciBwYWNrYWdlcyA9IG9wdGlvbnMucGFja2FnZXNcbiAgICB2YXIgdG9vbGtpdCA9IG9wdGlvbnMudG9vbGtpdFxuICAgIHZhciB0aGVtZSA9IG9wdGlvbnMudGhlbWVcblxuICAgIHRoZW1lID0gdGhlbWUgfHwgKHRvb2xraXQgPT09ICdjbGFzc2ljJyA/ICd0aGVtZS10cml0b24nIDogJ3RoZW1lLW1hdGVyaWFsJylcbiAgICBsb2d2KG9wdGlvbnMsJ2ZpcnN0VGltZTogJyArIHZhcnMuZmlyc3RUaW1lKVxuICAgIGlmICh2YXJzLmZpcnN0VGltZSkge1xuICAgICAgcmltcmFmLnN5bmMob3V0cHV0KVxuICAgICAgbWtkaXJwLnN5bmMob3V0cHV0KVxuICAgICAgY29uc3QgYnVpbGRYTUwgPSByZXF1aXJlKCcuL2FydGlmYWN0cycpLmJ1aWxkWE1MXG4gICAgICBjb25zdCBjcmVhdGVBcHBKc29uID0gcmVxdWlyZSgnLi9hcnRpZmFjdHMnKS5jcmVhdGVBcHBKc29uXG4gICAgICBjb25zdCBjcmVhdGVXb3Jrc3BhY2VKc29uID0gcmVxdWlyZSgnLi9hcnRpZmFjdHMnKS5jcmVhdGVXb3Jrc3BhY2VKc29uXG4gICAgICBjb25zdCBjcmVhdGVKU0RPTUVudmlyb25tZW50ID0gcmVxdWlyZSgnLi9hcnRpZmFjdHMnKS5jcmVhdGVKU0RPTUVudmlyb25tZW50XG5cbiAgICAgIGZzLndyaXRlRmlsZVN5bmMocGF0aC5qb2luKG91dHB1dCwgJ2J1aWxkLnhtbCcpLCBidWlsZFhNTCh2YXJzLnByb2R1Y3Rpb24sIG9wdGlvbnMpLCAndXRmOCcpXG4gICAgICBmcy53cml0ZUZpbGVTeW5jKHBhdGguam9pbihvdXRwdXQsICdhcHAuanNvbicpLCBjcmVhdGVBcHBKc29uKHRoZW1lLCBwYWNrYWdlcywgdG9vbGtpdCwgb3B0aW9ucyksICd1dGY4JylcbiAgICAgIGZzLndyaXRlRmlsZVN5bmMocGF0aC5qb2luKG91dHB1dCwgJ2pzZG9tLWVudmlyb25tZW50LmpzJyksIGNyZWF0ZUpTRE9NRW52aXJvbm1lbnQob3B0aW9ucyksICd1dGY4JylcbiAgICAgIGZzLndyaXRlRmlsZVN5bmMocGF0aC5qb2luKG91dHB1dCwgJ3dvcmtzcGFjZS5qc29uJyksIGNyZWF0ZVdvcmtzcGFjZUpzb24ob3B0aW9ucyksICd1dGY4JylcblxuICAgICAgaWYgKGZzLmV4aXN0c1N5bmMocGF0aC5qb2luKHByb2Nlc3MuY3dkKCksICdyZXNvdXJjZXMvJykpKSB7XG4gICAgICAgIHZhciBmcm9tUmVzb3VyY2VzID0gcGF0aC5qb2luKHByb2Nlc3MuY3dkKCksICdyZXNvdXJjZXMvJylcbiAgICAgICAgdmFyIHRvUmVzb3VyY2VzID0gcGF0aC5qb2luKG91dHB1dCwgJy4uL3Jlc291cmNlcycpXG4gICAgICAgIGZzeC5jb3B5U3luYyhmcm9tUmVzb3VyY2VzLCB0b1Jlc291cmNlcylcbiAgICAgICAgbG9nKGFwcCArICdDb3B5aW5nICcgKyBmcm9tUmVzb3VyY2VzLnJlcGxhY2UocHJvY2Vzcy5jd2QoKSwgJycpICsgJyB0bzogJyArIHRvUmVzb3VyY2VzLnJlcGxhY2UocHJvY2Vzcy5jd2QoKSwgJycpKVxuICAgICAgfVxuXG4gICAgICBpZiAoZnMuZXhpc3RzU3luYyhwYXRoLmpvaW4ocHJvY2Vzcy5jd2QoKSwncmVzb3VyY2VzLycpKSkge1xuICAgICAgICB2YXIgZnJvbVJlc291cmNlcyA9IHBhdGguam9pbihwcm9jZXNzLmN3ZCgpLCAncmVzb3VyY2VzLycpXG4gICAgICAgIHZhciB0b1Jlc291cmNlcyA9IHBhdGguam9pbihvdXRwdXQsICdyZXNvdXJjZXMnKVxuICAgICAgICBmc3guY29weVN5bmMoZnJvbVJlc291cmNlcywgdG9SZXNvdXJjZXMpXG4gICAgICAgIGxvZyhhcHAgKyAnQ29weWluZyAnICsgZnJvbVJlc291cmNlcy5yZXBsYWNlKHByb2Nlc3MuY3dkKCksICcnKSArICcgdG86ICcgKyB0b1Jlc291cmNlcy5yZXBsYWNlKHByb2Nlc3MuY3dkKCksICcnKSlcbiAgICAgIH1cblxuICAgICAgLy8gaWYgKGZzLmV4aXN0c1N5bmMocGF0aC5qb2luKHByb2Nlc3MuY3dkKCksdmFycy5leHRQYXRoICsgJy9wYWNrYWdlcy8nKSkpIHtcbiAgICAgIC8vICAgdmFyIGZyb21QYWNrYWdlcyA9IHBhdGguam9pbihwcm9jZXNzLmN3ZCgpLHZhcnMuZXh0UGF0aCArICcvcGFja2FnZXMvJylcbiAgICAgIC8vICAgdmFyIHRvUGFja2FnZXMgPSBwYXRoLmpvaW4ob3V0cHV0LCAncGFja2FnZXMvJylcbiAgICAgIC8vICAgZnN4LmNvcHlTeW5jKGZyb21QYWNrYWdlcywgdG9QYWNrYWdlcylcbiAgICAgIC8vICAgbG9nKGFwcCArICdDb3B5aW5nICcgKyBmcm9tUGFja2FnZXMucmVwbGFjZShwcm9jZXNzLmN3ZCgpLCAnJykgKyAnIHRvOiAnICsgdG9QYWNrYWdlcy5yZXBsYWNlKHByb2Nlc3MuY3dkKCksICcnKSlcbiAgICAgIC8vIH1cblxuICAgICAgLy8gaWYgKGZzLmV4aXN0c1N5bmMocGF0aC5qb2luKHByb2Nlc3MuY3dkKCksdmFycy5leHRQYXRoICsgJy9vdmVycmlkZXMvJykpKSB7XG4gICAgICAvLyAgIHZhciBmcm9tT3ZlcnJpZGVzID0gcGF0aC5qb2luKHByb2Nlc3MuY3dkKCksdmFycy5leHRQYXRoICsgJy9vdmVycmlkZXMvJylcbiAgICAgIC8vICAgdmFyIHRvT3ZlcnJpZGVzID0gcGF0aC5qb2luKG91dHB1dCwgJ292ZXJyaWRlcy8nKVxuICAgICAgLy8gICBmc3guY29weVN5bmMoZnJvbU92ZXJyaWRlcywgdG9PdmVycmlkZXMpXG4gICAgICAvLyAgIGxvZyhhcHAgKyAnQ29weWluZyAnICsgZnJvbU92ZXJyaWRlcy5yZXBsYWNlKHByb2Nlc3MuY3dkKCksICcnKSArICcgdG86ICcgKyB0b092ZXJyaWRlcy5yZXBsYWNlKHByb2Nlc3MuY3dkKCksICcnKSlcbiAgICAgIC8vfVxuICAgIH1cbiAgICB2YXJzLmZpcnN0VGltZSA9IGZhbHNlXG4gICAgdmFyIGpzID0gJydcbiAgICBpZiAodmFycy5wcm9kdWN0aW9uKSB7XG4gICAgICB2YXJzLmRlcHMucHVzaCgnRXh0LnJlcXVpcmUoXCJFeHQubGF5b3V0LipcIik7XFxuJylcbiAgICAgIGpzID0gdmFycy5kZXBzLmpvaW4oJztcXG4nKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBqcyA9ICdFeHQucmVxdWlyZShcIkV4dC4qXCIpJ1xuICAgIH1cbiAgICBpZiAodmFycy5tYW5pZmVzdCA9PT0gbnVsbCB8fCBqcyAhPT0gdmFycy5tYW5pZmVzdCkge1xuICAgICAgdmFycy5tYW5pZmVzdCA9IGpzXG4gICAgICBjb25zdCBtYW5pZmVzdCA9IHBhdGguam9pbihvdXRwdXQsICdtYW5pZmVzdC5qcycpXG4gICAgICBmcy53cml0ZUZpbGVTeW5jKG1hbmlmZXN0LCBqcywgJ3V0ZjgnKVxuICAgICAgdmFycy5yZWJ1aWxkID0gdHJ1ZVxuICAgICAgbG9nKGFwcCArICdCdWlsZGluZyBFeHQgYnVuZGxlIGF0OiAnICsgb3V0cHV0LnJlcGxhY2UocHJvY2Vzcy5jd2QoKSwgJycpKVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHZhcnMucmVidWlsZCA9IGZhbHNlXG4gICAgICBsb2coYXBwICsgJ0V4dFJlYWN0IHJlYnVpbGQgTk9UIG5lZWRlZCcpXG4gICAgfVxuICB9XG4gIGNhdGNoKGUpIHtcbiAgICByZXF1aXJlKCcuL3BsdWdpblV0aWwnKS5sb2d2KG9wdGlvbnMsZSlcbiAgICBjb21waWxhdGlvbi5lcnJvcnMucHVzaCgnX3ByZXBhcmVGb3JCdWlsZDogJyArIGUpXG4gIH1cbn1cblxuLy8qKioqKioqKioqXG5leHBvcnQgZnVuY3Rpb24gX2J1aWxkRXh0QnVuZGxlKGFwcCwgY29tcGlsYXRpb24sIG91dHB1dFBhdGgsIHBhcm1zLCBvcHRpb25zKSB7XG4gIHRyeSB7XG4gICAgY29uc3QgZnMgPSByZXF1aXJlKCdmcycpXG4gICAgY29uc3QgbG9ndiA9IHJlcXVpcmUoJy4vcGx1Z2luVXRpbCcpLmxvZ3ZcbiAgICBsb2d2KG9wdGlvbnMsJ0ZVTkNUSU9OIF9idWlsZEV4dEJ1bmRsZScpXG5cbiAgICBsZXQgc2VuY2hhOyB0cnkgeyBzZW5jaGEgPSByZXF1aXJlKCdAc2VuY2hhL2NtZCcpIH0gY2F0Y2ggKGUpIHsgc2VuY2hhID0gJ3NlbmNoYScgfVxuICAgIGlmIChmcy5leGlzdHNTeW5jKHNlbmNoYSkpIHtcbiAgICAgIGxvZ3Yob3B0aW9ucywnc2VuY2hhIGZvbGRlciBleGlzdHMnKVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGxvZ3Yob3B0aW9ucywnc2VuY2hhIGZvbGRlciBET0VTIE5PVCBleGlzdCcpXG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGNvbnN0IG9uQnVpbGREb25lID0gKCkgPT4ge1xuICAgICAgICBsb2d2KG9wdGlvbnMsJ29uQnVpbGREb25lJylcbiAgICAgICAgcmVzb2x2ZSgpXG4gICAgICB9XG5cbiAgICAgIHZhciBvcHRzID0geyBjd2Q6IG91dHB1dFBhdGgsIHNpbGVudDogdHJ1ZSwgc3RkaW86ICdwaXBlJywgZW5jb2Rpbmc6ICd1dGYtOCd9XG4gICAgICBleGVjdXRlQXN5bmMoYXBwLCBzZW5jaGEsIHBhcm1zLCBvcHRzLCBjb21waWxhdGlvbiwgb3B0aW9ucykudGhlbiAoXG4gICAgICAgIGZ1bmN0aW9uKCkgeyBvbkJ1aWxkRG9uZSgpIH0sIFxuICAgICAgICBmdW5jdGlvbihyZWFzb24pIHsgcmVqZWN0KHJlYXNvbikgfVxuICAgICAgKVxuICAgIH0pXG4gIH1cbiAgY2F0Y2goZSkge1xuICAgIHJlcXVpcmUoJy4vcGx1Z2luVXRpbCcpLmxvZ3Yob3B0aW9ucyxlKVxuICAgIGNvbXBpbGF0aW9uLmVycm9ycy5wdXNoKCdfYnVpbGRFeHRCdW5kbGU6ICcgKyBlKVxuICAgIGNhbGxiYWNrKClcbiAgfVxufVxuXG4vLyoqKioqKioqKipcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBleGVjdXRlQXN5bmMgKGFwcCwgY29tbWFuZCwgcGFybXMsIG9wdHMsIGNvbXBpbGF0aW9uLCBvcHRpb25zKSB7XG4gIHRyeSB7XG4gICAgLy9jb25zdCBERUZBVUxUX1NVQlNUUlMgPSBbJ1tJTkZdIExvYWRpbmcnLCAnW0lORl0gUHJvY2Vzc2luZycsICdbTE9HXSBGYXNoaW9uIGJ1aWxkIGNvbXBsZXRlJywgJ1tFUlJdJywgJ1tXUk5dJywgXCJbSU5GXSBTZXJ2ZXJcIiwgXCJbSU5GXSBXcml0aW5nXCIsIFwiW0lORl0gTG9hZGluZyBCdWlsZFwiLCBcIltJTkZdIFdhaXRpbmdcIiwgXCJbTE9HXSBGYXNoaW9uIHdhaXRpbmdcIl07XG4gICAgY29uc3QgREVGQVVMVF9TVUJTVFJTID0gWydbSU5GXSBMb2FkaW5nJywgJ1tJTkZdIEFwcGVuZCcsICdbSU5GXSBQcm9jZXNzaW5nJywgJ1tJTkZdIFByb2Nlc3NpbmcgQnVpbGQnLCAnW0xPR10gRmFzaGlvbiBidWlsZCBjb21wbGV0ZScsICdbRVJSXScsICdbV1JOXScsIFwiW0lORl0gU2VydmVyXCIsIFwiW0lORl0gV3JpdGluZ1wiLCBcIltJTkZdIExvYWRpbmcgQnVpbGRcIiwgXCJbSU5GXSBXYWl0aW5nXCIsIFwiW0xPR10gRmFzaGlvbiB3YWl0aW5nXCJdO1xuICAgIHZhciBzdWJzdHJpbmdzID0gREVGQVVMVF9TVUJTVFJTIFxuICAgIHZhciBjaGFsayA9IHJlcXVpcmUoJ2NoYWxrJylcbiAgICBjb25zdCBjcm9zc1NwYXduID0gcmVxdWlyZSgnY3Jvc3Mtc3Bhd24nKVxuICAgIGNvbnN0IGxvZyA9IHJlcXVpcmUoJy4vcGx1Z2luVXRpbCcpLmxvZ1xuICAgIGxvZ3Yob3B0aW9ucywgJ0ZVTkNUSU9OIGV4ZWN1dGVBc3luYycpXG4gICAgYXdhaXQgbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgbG9ndihvcHRpb25zLGBjb21tYW5kIC0gJHtjb21tYW5kfWApXG4gICAgICBsb2d2KG9wdGlvbnMsIGBwYXJtcyAtICR7cGFybXN9YClcbiAgICAgIGxvZ3Yob3B0aW9ucywgYG9wdHMgLSAke0pTT04uc3RyaW5naWZ5KG9wdHMpfWApXG4gICAgICBsZXQgY2hpbGQgPSBjcm9zc1NwYXduKGNvbW1hbmQsIHBhcm1zLCBvcHRzKVxuICAgICAgY2hpbGQub24oJ2Nsb3NlJywgKGNvZGUsIHNpZ25hbCkgPT4ge1xuICAgICAgICBsb2d2KG9wdGlvbnMsIGBvbiBjbG9zZTogYCArIGNvZGUpIFxuICAgICAgICBpZihjb2RlID09PSAwKSB7IHJlc29sdmUoMCkgfVxuICAgICAgICBlbHNlIHsgY29tcGlsYXRpb24uZXJyb3JzLnB1c2goIG5ldyBFcnJvcihjb2RlKSApOyByZXNvbHZlKDApIH1cbiAgICAgIH0pXG4gICAgICBjaGlsZC5vbignZXJyb3InLCAoZXJyb3IpID0+IHsgXG4gICAgICAgIGxvZ3Yob3B0aW9ucywgYG9uIGVycm9yYCkgXG4gICAgICAgIGNvbXBpbGF0aW9uLmVycm9ycy5wdXNoKGVycm9yKVxuICAgICAgICByZXNvbHZlKDApXG4gICAgICB9KVxuICAgICAgY2hpbGQuc3Rkb3V0Lm9uKCdkYXRhJywgKGRhdGEpID0+IHtcbiAgICAgICAgdmFyIHN0ciA9IGRhdGEudG9TdHJpbmcoKS5yZXBsYWNlKC9cXHI/XFxufFxcci9nLCBcIiBcIikudHJpbSgpXG4gICAgICAgIGxvZ3Yob3B0aW9ucywgYCR7c3RyfWApXG4gICAgICAgIGlmIChkYXRhICYmIGRhdGEudG9TdHJpbmcoKS5tYXRjaCgvd2FpdGluZyBmb3IgY2hhbmdlc1xcLlxcLlxcLi8pKSB7XG4gICAgICAgICAgcmVzb2x2ZSgwKVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIGlmIChzdWJzdHJpbmdzLnNvbWUoZnVuY3Rpb24odikgeyByZXR1cm4gZGF0YS5pbmRleE9mKHYpID49IDA7IH0pKSB7IFxuICAgICAgICAgICAgc3RyID0gc3RyLnJlcGxhY2UoXCJbSU5GXVwiLCBcIlwiKVxuICAgICAgICAgICAgc3RyID0gc3RyLnJlcGxhY2UoXCJbTE9HXVwiLCBcIlwiKVxuICAgICAgICAgICAgc3RyID0gc3RyLnJlcGxhY2UocHJvY2Vzcy5jd2QoKSwgJycpLnRyaW0oKVxuICAgICAgICAgICAgaWYgKHN0ci5pbmNsdWRlcyhcIltFUlJdXCIpKSB7XG4gICAgICAgICAgICAgIGNvbXBpbGF0aW9uLmVycm9ycy5wdXNoKGFwcCArIHN0ci5yZXBsYWNlKC9eXFxbRVJSXFxdIC9naSwgJycpKTtcbiAgICAgICAgICAgICAgc3RyID0gc3RyLnJlcGxhY2UoXCJbRVJSXVwiLCBgJHtjaGFsay5yZWQoXCJbRVJSXVwiKX1gKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbG9nKGAke2FwcH0ke3N0cn1gKSBcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgICBjaGlsZC5zdGRlcnIub24oJ2RhdGEnLCAoZGF0YSkgPT4ge1xuICAgICAgICBsb2d2KG9wdGlvbnMsIGBlcnJvciBvbiBjbG9zZTogYCArIGRhdGEpIFxuICAgICAgICB2YXIgc3RyID0gZGF0YS50b1N0cmluZygpLnJlcGxhY2UoL1xccj9cXG58XFxyL2csIFwiIFwiKS50cmltKClcbiAgICAgICAgdmFyIHN0ckphdmFPcHRzID0gXCJQaWNrZWQgdXAgX0pBVkFfT1BUSU9OU1wiO1xuICAgICAgICB2YXIgaW5jbHVkZXMgPSBzdHIuaW5jbHVkZXMoc3RySmF2YU9wdHMpXG4gICAgICAgIGlmICghaW5jbHVkZXMpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhgJHthcHB9ICR7Y2hhbGsucmVkKFwiW0VSUl1cIil9ICR7c3RyfWApXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfSlcbiAgfVxuICBjYXRjaChlKSB7XG4gICAgcmVxdWlyZSgnLi9wbHVnaW5VdGlsJykubG9ndihvcHRpb25zLGUpXG4gICAgY29tcGlsYXRpb24uZXJyb3JzLnB1c2goJ2V4ZWN1dGVBc3luYzogJyArIGUpXG4gICAgY2FsbGJhY2soKVxuICB9IFxufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBsb2cocykge1xuICByZXF1aXJlKCdyZWFkbGluZScpLmN1cnNvclRvKHByb2Nlc3Muc3Rkb3V0LCAwKVxuICB0cnkge1xuICAgIHByb2Nlc3Muc3Rkb3V0LmNsZWFyTGluZSgpXG4gIH1cbiAgY2F0Y2goZSkge31cbiAgcHJvY2Vzcy5zdGRvdXQud3JpdGUocylcbiAgcHJvY2Vzcy5zdGRvdXQud3JpdGUoJ1xcbicpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBsb2d2KG9wdGlvbnMsIHMpIHtcbiAgaWYgKG9wdGlvbnMudmVyYm9zZSA9PSAneWVzJykge1xuICAgIHJlcXVpcmUoJ3JlYWRsaW5lJykuY3Vyc29yVG8ocHJvY2Vzcy5zdGRvdXQsIDApXG4gICAgdHJ5IHtcbiAgICAgIHByb2Nlc3Muc3Rkb3V0LmNsZWFyTGluZSgpXG4gICAgfVxuICAgIGNhdGNoKGUpIHt9XG4gICAgcHJvY2Vzcy5zdGRvdXQud3JpdGUoYC12ZXJib3NlOiAke3N9YClcbiAgICBwcm9jZXNzLnN0ZG91dC53cml0ZSgnXFxuJylcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gX2dldEFwcCgpIHtcbiAgdmFyIGNoYWxrID0gcmVxdWlyZSgnY2hhbGsnKVxuICB2YXIgcHJlZml4ID0gYGBcbiAgY29uc3QgcGxhdGZvcm0gPSByZXF1aXJlKCdvcycpLnBsYXRmb3JtKClcbiAgaWYgKHBsYXRmb3JtID09ICdkYXJ3aW4nKSB7IHByZWZpeCA9IGDihLkg772iZXh0772jOmAgfVxuICBlbHNlIHsgcHJlZml4ID0gYGkgW2V4dF06YCB9XG4gIHJldHVybiBgJHtjaGFsay5ncmVlbihwcmVmaXgpfSBgXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfZ2V0VmVyc2lvbnMoYXBwLCBwbHVnaW5OYW1lLCBmcmFtZXdvcmtOYW1lKSB7XG4gIGNvbnN0IHBhdGggPSByZXF1aXJlKCdwYXRoJylcbiAgY29uc3QgZnMgPSByZXF1aXJlKCdmcycpXG5cbiAgdmFyIHYgPSB7fVxuICB2YXIgcGx1Z2luUGF0aCA9IHBhdGgucmVzb2x2ZShwcm9jZXNzLmN3ZCgpLCdub2RlX21vZHVsZXMvQHNlbmNoYScsIHBsdWdpbk5hbWUpXG4gIHZhciBwbHVnaW5Qa2cgPSAoZnMuZXhpc3RzU3luYyhwbHVnaW5QYXRoKycvcGFja2FnZS5qc29uJykgJiYgSlNPTi5wYXJzZShmcy5yZWFkRmlsZVN5bmMocGx1Z2luUGF0aCsnL3BhY2thZ2UuanNvbicsICd1dGYtOCcpKSB8fCB7fSk7XG4gIHYucGx1Z2luVmVyc2lvbiA9IHBsdWdpblBrZy52ZXJzaW9uXG5cbiAgdmFyIHdlYnBhY2tQYXRoID0gcGF0aC5yZXNvbHZlKHByb2Nlc3MuY3dkKCksJ25vZGVfbW9kdWxlcy93ZWJwYWNrJylcbiAgdmFyIHdlYnBhY2tQa2cgPSAoZnMuZXhpc3RzU3luYyh3ZWJwYWNrUGF0aCsnL3BhY2thZ2UuanNvbicpICYmIEpTT04ucGFyc2UoZnMucmVhZEZpbGVTeW5jKHdlYnBhY2tQYXRoKycvcGFja2FnZS5qc29uJywgJ3V0Zi04JykpIHx8IHt9KTtcbiAgdi53ZWJwYWNrVmVyc2lvbiA9IHdlYnBhY2tQa2cudmVyc2lvblxuXG4gIHZhciBleHRQYXRoID0gcGF0aC5yZXNvbHZlKHByb2Nlc3MuY3dkKCksJ25vZGVfbW9kdWxlcy9Ac2VuY2hhL2V4dCcpXG4gIHZhciBleHRQa2cgPSAoZnMuZXhpc3RzU3luYyhleHRQYXRoKycvcGFja2FnZS5qc29uJykgJiYgSlNPTi5wYXJzZShmcy5yZWFkRmlsZVN5bmMoZXh0UGF0aCsnL3BhY2thZ2UuanNvbicsICd1dGYtOCcpKSB8fCB7fSk7XG4gIHYuZXh0VmVyc2lvbiA9IGV4dFBrZy5zZW5jaGEudmVyc2lvblxuXG4gIC8vdmFyIGNtZFBhdGggPSBwYXRoLnJlc29sdmUocHJvY2Vzcy5jd2QoKSxgbm9kZV9tb2R1bGVzL0BzZW5jaGEvJHtwbHVnaW5OYW1lfS9ub2RlX21vZHVsZXMvQHNlbmNoYS9jbWRgKVxuICB2YXIgY21kUGF0aCA9IHBhdGgucmVzb2x2ZShwcm9jZXNzLmN3ZCgpLGBub2RlX21vZHVsZXMvQHNlbmNoYS9jbWRgKVxuICB2YXIgY21kUGtnID0gKGZzLmV4aXN0c1N5bmMoY21kUGF0aCsnL3BhY2thZ2UuanNvbicpICYmIEpTT04ucGFyc2UoZnMucmVhZEZpbGVTeW5jKGNtZFBhdGgrJy9wYWNrYWdlLmpzb24nLCAndXRmLTgnKSkgfHwge30pO1xuICB2LmNtZFZlcnNpb24gPSBjbWRQa2cudmVyc2lvbl9mdWxsXG5cbiAgdmFyIGZyYW1ld29ya0luZm8gPSAnJ1xuICAgaWYgKGZyYW1ld29ya05hbWUgIT0gdW5kZWZpbmVkICYmIGZyYW1ld29ya05hbWUgIT0gJ2V4dGpzJykge1xuICAgIHZhciBmcmFtZXdvcmtQYXRoID0gJydcbiAgICBpZiAoZnJhbWV3b3JrTmFtZSA9PSAncmVhY3QnKSB7XG4gICAgICBmcmFtZXdvcmtQYXRoID0gcGF0aC5yZXNvbHZlKHByb2Nlc3MuY3dkKCksJ25vZGVfbW9kdWxlcy9yZWFjdCcpXG4gICAgfVxuICAgIGlmIChmcmFtZXdvcmtOYW1lID09ICdhbmd1bGFyJykge1xuICAgICAgZnJhbWV3b3JrUGF0aCA9IHBhdGgucmVzb2x2ZShwcm9jZXNzLmN3ZCgpLCdub2RlX21vZHVsZXMvQGFuZ3VsYXIvY29yZScpXG4gICAgfVxuICAgIHZhciBmcmFtZXdvcmtQa2cgPSAoZnMuZXhpc3RzU3luYyhmcmFtZXdvcmtQYXRoKycvcGFja2FnZS5qc29uJykgJiYgSlNPTi5wYXJzZShmcy5yZWFkRmlsZVN5bmMoZnJhbWV3b3JrUGF0aCsnL3BhY2thZ2UuanNvbicsICd1dGYtOCcpKSB8fCB7fSk7XG4gICAgdi5mcmFtZXdvcmtWZXJzaW9uID0gZnJhbWV3b3JrUGtnLnZlcnNpb25cbiAgICBmcmFtZXdvcmtJbmZvID0gJywgJyArIGZyYW1ld29ya05hbWUgKyAnIHYnICsgdi5mcmFtZXdvcmtWZXJzaW9uXG4gIH1cblxuICByZXR1cm4gYXBwICsgJ2V4dC13ZWJwYWNrLXBsdWdpbiB2JyArIHYucGx1Z2luVmVyc2lvbiArICcsIEV4dCBKUyB2JyArIHYuZXh0VmVyc2lvbiArICcsIFNlbmNoYSBDbWQgdicgKyB2LmNtZFZlcnNpb24gKyAnLCB3ZWJwYWNrIHYnICsgdi53ZWJwYWNrVmVyc2lvbiArIGZyYW1ld29ya0luZm9cbn0iXX0=