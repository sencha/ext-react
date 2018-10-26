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
  const path = require('path');

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

  validateOptions(require(`./${options.framework}Util`).getValidateOptions(), options, ''); //fix sencha cmd no jetty server problem
  // var watchFile = path.resolve(process.cwd(),`node_modules/@sencha/cmd/dist/ant/build/app/watch-impl.xml`)
  // logv(options, `modify ${watchFile}`)
  // var data = fs.readFileSync(watchFile, 'utf-8');
  // var ip = 'webServerRefId="app.web.server"';
  // var newValue = data.replace(new RegExp(ip), '');
  // fs.writeFileSync(watchFile, newValue, 'utf-8');

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
  } //fix fashion dist problem


  const fsx = require('fs-extra');

  var toFashionDist = path.resolve(process.cwd(), `node_modules/@sencha/cmd/dist/js/node_modules/fashion/dist`);
  logv(options, `toFashionDist ${toFashionDist}`);

  if (!fs.existsSync(toFashionDist)) {
    logv(options, `copy`);
    var fromFashionDist = path.join(process.cwd(), 'node_modules/@sencha/' + thisVars.pluginName + '/fashion/dist/');
    fsx.copySync(fromFashionDist, toFashionDist);
  } else {
    logv(options, `no copy`);
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
            _context.next = 30;
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
            _context.next = 27;
            break;
          }

          parms = [];

          if (options.profile == undefined || options.profile == '' || options.profile == null) {
            parms = ['app', command, '--web-server', 'false', options.environment];
          } else {
            parms = ['app', command, '--web-server', 'false', options.profile, options.environment];
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
          _context.next = 28;
          break;

        case 27:
          callback();

        case 28:
          _context.next = 33;
          break;

        case 30:
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

        case 33:
          _context.next = 40;
          break;

        case 35:
          _context.prev = 35;
          _context.t0 = _context["catch"](0);

          require('./pluginUtil').logv(options, _context.t0);

          compilation.errors.push('emit: ' + _context.t0);
          callback();

        case 40:
        case "end":
          return _context.stop();
      }
    }, _callee, this, [[0, 35]]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9wbHVnaW5VdGlsLmpzIl0sIm5hbWVzIjpbIl9jb25zdHJ1Y3RvciIsIm9wdGlvbnMiLCJwYXRoIiwicmVxdWlyZSIsImZzIiwidGhpc1ZhcnMiLCJ0aGlzT3B0aW9ucyIsInBsdWdpbiIsImZyYW1ld29yayIsInVuZGVmaW5lZCIsInBsdWdpbkVycm9ycyIsInB1c2giLCJ2YXJzIiwidmFsaWRhdGVPcHRpb25zIiwiZ2V0VmFsaWRhdGVPcHRpb25zIiwiZ2V0RGVmYXVsdFZhcnMiLCJwbHVnaW5OYW1lIiwiZnN4IiwidG9GYXNoaW9uRGlzdCIsInJlc29sdmUiLCJwcm9jZXNzIiwiY3dkIiwibG9ndiIsImV4aXN0c1N5bmMiLCJmcm9tRmFzaGlvbkRpc3QiLCJqb2luIiwiY29weVN5bmMiLCJhcHAiLCJfZ2V0QXBwIiwicmMiLCJKU09OIiwicGFyc2UiLCJyZWFkRmlsZVN5bmMiLCJnZXREZWZhdWx0T3B0aW9ucyIsInN0cmluZ2lmeSIsImVudmlyb25tZW50IiwicHJvZHVjdGlvbiIsImxvZyIsIl9nZXRWZXJzaW9ucyIsIl9jb21waWxhdGlvbiIsImNvbXBpbGVyIiwiY29tcGlsYXRpb24iLCJob29rcyIsInN1Y2NlZWRNb2R1bGUiLCJ0YXAiLCJtb2R1bGUiLCJyZXNvdXJjZSIsIm1hdGNoIiwidG9vbGtpdCIsImRlcHMiLCJleHRyYWN0RnJvbVNvdXJjZSIsImh0bWxXZWJwYWNrUGx1Z2luQmVmb3JlSHRtbEdlbmVyYXRpb24iLCJkYXRhIiwib3V0cHV0UGF0aCIsImRldlNlcnZlciIsImNvbnRlbnRCYXNlIiwicmVwbGFjZSIsInRyaW0iLCJqc1BhdGgiLCJleHRQYXRoIiwiY3NzUGF0aCIsImFzc2V0cyIsImpzIiwidW5zaGlmdCIsImNzcyIsImUiLCJlcnJvcnMiLCJlbWl0IiwiY2FsbGJhY2siLCJfYnVpbGRFeHRCdW5kbGUiLCJfcHJlcGFyZUZvckJ1aWxkIiwiY29tbWFuZCIsIndhdGNoIiwicmVidWlsZCIsInBhcm1zIiwicHJvZmlsZSIsIndhdGNoU3RhcnRlZCIsImJyb3dzZXIiLCJicm93c2VyQ291bnQiLCJsZW5ndGgiLCJ1cmwiLCJwb3J0Iiwib3BuIiwib3V0cHV0IiwicmltcmFmIiwibWtkaXJwIiwicGFja2FnZXMiLCJ0aGVtZSIsImZpcnN0VGltZSIsInN5bmMiLCJidWlsZFhNTCIsImNyZWF0ZUFwcEpzb24iLCJjcmVhdGVXb3Jrc3BhY2VKc29uIiwiY3JlYXRlSlNET01FbnZpcm9ubWVudCIsIndyaXRlRmlsZVN5bmMiLCJmcm9tUmVzb3VyY2VzIiwidG9SZXNvdXJjZXMiLCJtYW5pZmVzdCIsImJ1bmRsZURpciIsInNlbmNoYSIsIlByb21pc2UiLCJyZWplY3QiLCJvbkJ1aWxkRG9uZSIsIm9wdHMiLCJzaWxlbnQiLCJzdGRpbyIsImVuY29kaW5nIiwiZXhlY3V0ZUFzeW5jIiwidGhlbiIsInJlYXNvbiIsIkRFRkFVTFRfU1VCU1RSUyIsInN1YnN0cmluZ3MiLCJjaGFsayIsImNyb3NzU3Bhd24iLCJjaGlsZCIsIm9uIiwiY29kZSIsInNpZ25hbCIsIkVycm9yIiwiZXJyb3IiLCJzdGRvdXQiLCJzdHIiLCJ0b1N0cmluZyIsInNvbWUiLCJ2IiwiaW5kZXhPZiIsImluY2x1ZGVzIiwicmVkIiwic3RkZXJyIiwic3RySmF2YU9wdHMiLCJjb25zb2xlIiwicyIsImN1cnNvclRvIiwiY2xlYXJMaW5lIiwid3JpdGUiLCJ2ZXJib3NlIiwicHJlZml4IiwicGxhdGZvcm0iLCJncmVlbiIsImZyYW1ld29ya05hbWUiLCJwbHVnaW5QYXRoIiwicGx1Z2luUGtnIiwicGx1Z2luVmVyc2lvbiIsInZlcnNpb24iLCJfcmVzb2x2ZWQiLCJlZGl0aW9uIiwid2VicGFja1BhdGgiLCJ3ZWJwYWNrUGtnIiwid2VicGFja1ZlcnNpb24iLCJleHRQa2ciLCJleHRWZXJzaW9uIiwiY21kUGF0aCIsImNtZFBrZyIsImNtZFZlcnNpb24iLCJ2ZXJzaW9uX2Z1bGwiLCJmcmFtZXdvcmtJbmZvIiwiZnJhbWV3b3JrUGF0aCIsImZyYW1ld29y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RWxCLENBQUMsQ0FBQzBCLFVBQWxFLEdBQStFLEdBQS9FLEdBQXFGMUIsQ0FBQyxDQUFDcUIsT0FBdkYsR0FBaUcsd0JBQWpHLEdBQTRIckIsQ0FBQyxDQUFDNkIsVUFBOUgsR0FBMkksYUFBM0ksR0FBMko3QixDQUFDLENBQUN3QixjQUE3SixHQUE4S08sYUFBckw7QUFDQSIsInNvdXJjZXNDb250ZW50IjpbIi8vKioqKioqKioqKlxuZXhwb3J0IGZ1bmN0aW9uIF9jb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gIGNvbnN0IHBhdGggPSByZXF1aXJlKCdwYXRoJylcbiAgY29uc3QgZnMgPSByZXF1aXJlKCdmcycpXG5cbiAgdmFyIHRoaXNWYXJzID0ge31cbiAgdmFyIHRoaXNPcHRpb25zID0ge31cbiAgdmFyIHBsdWdpbiA9IHt9XG5cbiAgaWYgKG9wdGlvbnMuZnJhbWV3b3JrID09IHVuZGVmaW5lZCkge1xuICAgIHRoaXNWYXJzLnBsdWdpbkVycm9ycyA9IFtdXG4gICAgdGhpc1ZhcnMucGx1Z2luRXJyb3JzLnB1c2goJ3dlYnBhY2sgY29uZmlnOiBmcmFtZXdvcmsgcGFyYW1ldGVyIG9uIGV4dC13ZWJwYWNrLXBsdWdpbiBpcyBub3QgZGVmaW5lZCAtIHZhbHVlczogcmVhY3QsIGFuZ3VsYXIsIGV4dGpzJylcbiAgICBwbHVnaW4udmFycyA9IHRoaXNWYXJzXG4gICAgcmV0dXJuIHBsdWdpblxuICB9XG5cbiAgY29uc3QgdmFsaWRhdGVPcHRpb25zID0gcmVxdWlyZSgnc2NoZW1hLXV0aWxzJylcbiAgdmFsaWRhdGVPcHRpb25zKHJlcXVpcmUoYC4vJHtvcHRpb25zLmZyYW1ld29ya31VdGlsYCkuZ2V0VmFsaWRhdGVPcHRpb25zKCksIG9wdGlvbnMsICcnKVxuXG4gIC8vZml4IHNlbmNoYSBjbWQgbm8gamV0dHkgc2VydmVyIHByb2JsZW1cbiAgLy8gdmFyIHdhdGNoRmlsZSA9IHBhdGgucmVzb2x2ZShwcm9jZXNzLmN3ZCgpLGBub2RlX21vZHVsZXMvQHNlbmNoYS9jbWQvZGlzdC9hbnQvYnVpbGQvYXBwL3dhdGNoLWltcGwueG1sYClcbiAgLy8gbG9ndihvcHRpb25zLCBgbW9kaWZ5ICR7d2F0Y2hGaWxlfWApXG4gIC8vIHZhciBkYXRhID0gZnMucmVhZEZpbGVTeW5jKHdhdGNoRmlsZSwgJ3V0Zi04Jyk7XG4gIC8vIHZhciBpcCA9ICd3ZWJTZXJ2ZXJSZWZJZD1cImFwcC53ZWIuc2VydmVyXCInO1xuICAvLyB2YXIgbmV3VmFsdWUgPSBkYXRhLnJlcGxhY2UobmV3IFJlZ0V4cChpcCksICcnKTtcbiAgLy8gZnMud3JpdGVGaWxlU3luYyh3YXRjaEZpbGUsIG5ld1ZhbHVlLCAndXRmLTgnKTtcblxuICB0aGlzVmFycyA9IHJlcXVpcmUoYC4vJHtvcHRpb25zLmZyYW1ld29ya31VdGlsYCkuZ2V0RGVmYXVsdFZhcnMoKVxuICB0aGlzVmFycy5mcmFtZXdvcmsgPSBvcHRpb25zLmZyYW1ld29ya1xuICBzd2l0Y2godGhpc1ZhcnMuZnJhbWV3b3JrKSB7XG4gICAgY2FzZSAnZXh0anMnOlxuICAgICAgdGhpc1ZhcnMucGx1Z2luTmFtZSA9ICdleHQtd2VicGFjay1wbHVnaW4nXG4gICAgICBicmVhaztcbiAgICBjYXNlICdyZWFjdCc6XG4gICAgICB0aGlzVmFycy5wbHVnaW5OYW1lID0gJ2V4dC1yZWFjdC13ZWJwYWNrLXBsdWdpbidcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ2FuZ3VsYXInOlxuICAgICAgdGhpc1ZhcnMucGx1Z2luTmFtZSA9ICdleHQtYW5ndWxhci13ZWJwYWNrLXBsdWdpbidcbiAgICAgIGJyZWFrO1xuICAgIGRlZmF1bHQ6XG4gICAgICB0aGlzVmFycy5wbHVnaW5OYW1lID0gJ2V4dC13ZWJwYWNrLXBsdWdpbidcbiAgfVxuXG4gIC8vZml4IGZhc2hpb24gZGlzdCBwcm9ibGVtXG4gIGNvbnN0IGZzeCA9IHJlcXVpcmUoJ2ZzLWV4dHJhJylcbiAgdmFyIHRvRmFzaGlvbkRpc3QgPSBwYXRoLnJlc29sdmUocHJvY2Vzcy5jd2QoKSxgbm9kZV9tb2R1bGVzL0BzZW5jaGEvY21kL2Rpc3QvanMvbm9kZV9tb2R1bGVzL2Zhc2hpb24vZGlzdGApXG4gIGxvZ3Yob3B0aW9ucywgYHRvRmFzaGlvbkRpc3QgJHt0b0Zhc2hpb25EaXN0fWApXG4gIGlmICghZnMuZXhpc3RzU3luYyh0b0Zhc2hpb25EaXN0KSkge1xuICAgIGxvZ3Yob3B0aW9ucywgYGNvcHlgKVxuICAgIHZhciBmcm9tRmFzaGlvbkRpc3QgPSBwYXRoLmpvaW4ocHJvY2Vzcy5jd2QoKSwgJ25vZGVfbW9kdWxlcy9Ac2VuY2hhLycgKyB0aGlzVmFycy5wbHVnaW5OYW1lICsgJy9mYXNoaW9uL2Rpc3QvJylcbiAgICBmc3guY29weVN5bmMoZnJvbUZhc2hpb25EaXN0LCB0b0Zhc2hpb25EaXN0KVxuICB9XG4gIGVsc2Uge1xuICAgIGxvZ3Yob3B0aW9ucywgYG5vIGNvcHlgKVxuICB9XG5cbiAgdGhpc1ZhcnMuYXBwID0gcmVxdWlyZSgnLi9wbHVnaW5VdGlsJykuX2dldEFwcCgpXG4gIGxvZ3Yob3B0aW9ucywgYHBsdWdpbk5hbWUgLSAke3RoaXNWYXJzLnBsdWdpbk5hbWV9YClcbiAgbG9ndihvcHRpb25zLCBgdGhpc1ZhcnMuYXBwIC0gJHt0aGlzVmFycy5hcHB9YClcblxuICBjb25zdCByYyA9IChmcy5leGlzdHNTeW5jKGAuZXh0LSR7dGhpc1ZhcnMuZnJhbWV3b3JrfXJjYCkgJiYgSlNPTi5wYXJzZShmcy5yZWFkRmlsZVN5bmMoYC5leHQtJHt0aGlzVmFycy5mcmFtZXdvcmt9cmNgLCAndXRmLTgnKSkgfHwge30pXG4gIHRoaXNPcHRpb25zID0geyAuLi5yZXF1aXJlKGAuLyR7dGhpc1ZhcnMuZnJhbWV3b3JrfVV0aWxgKS5nZXREZWZhdWx0T3B0aW9ucygpLCAuLi5vcHRpb25zLCAuLi5yYyB9XG4gIGxvZ3Yob3B0aW9ucywgYHRoaXNPcHRpb25zIC0gJHtKU09OLnN0cmluZ2lmeSh0aGlzT3B0aW9ucyl9YClcbiAgaWYgKHRoaXNPcHRpb25zLmVudmlyb25tZW50ID09ICdwcm9kdWN0aW9uJykgXG4gICAge3RoaXNWYXJzLnByb2R1Y3Rpb24gPSB0cnVlfVxuICBlbHNlIFxuICAgIHt0aGlzVmFycy5wcm9kdWN0aW9uID0gZmFsc2V9XG4gIGxvZyhyZXF1aXJlKCcuL3BsdWdpblV0aWwnKS5fZ2V0VmVyc2lvbnModGhpc1ZhcnMuYXBwLCB0aGlzVmFycy5wbHVnaW5OYW1lLCB0aGlzVmFycy5mcmFtZXdvcmspKVxuICBsb2codGhpc1ZhcnMuYXBwICsgJ0J1aWxkaW5nIGZvciAnICsgdGhpc09wdGlvbnMuZW52aXJvbm1lbnQpXG5cbiAgcGx1Z2luLnZhcnMgPSB0aGlzVmFyc1xuICBwbHVnaW4ub3B0aW9ucyA9IHRoaXNPcHRpb25zXG4gIHJldHVybiBwbHVnaW5cbn1cblxuLy8qKioqKioqKioqXG5leHBvcnQgZnVuY3Rpb24gX2NvbXBpbGF0aW9uKGNvbXBpbGVyLCBjb21waWxhdGlvbiwgdmFycywgb3B0aW9ucykge1xuICB0cnkge1xuICAgIHJlcXVpcmUoJy4vcGx1Z2luVXRpbCcpLmxvZ3Yob3B0aW9ucywnRlVOQ1RJT04gX2NvbXBpbGF0aW9uJylcbiAgICBpZiAodmFycy5wcm9kdWN0aW9uKSB7XG4gICAgICBsb2d2KG9wdGlvbnMsYGV4dC1jb21waWxhdGlvbjogcHJvZHVjdGlvbiBpcyBgICsgIHZhcnMucHJvZHVjdGlvbilcbiAgICAgIGNvbXBpbGF0aW9uLmhvb2tzLnN1Y2NlZWRNb2R1bGUudGFwKGBleHQtc3VjY2VlZC1tb2R1bGVgLCAobW9kdWxlKSA9PiB7XG4gICAgICAgIGlmIChtb2R1bGUucmVzb3VyY2UgJiYgbW9kdWxlLnJlc291cmNlLm1hdGNoKC9cXC4oanx0KXN4PyQvKSAmJiAhbW9kdWxlLnJlc291cmNlLm1hdGNoKC9ub2RlX21vZHVsZXMvKSAmJiAhbW9kdWxlLnJlc291cmNlLm1hdGNoKGAvZXh0LXskb3B0aW9ucy5mcmFtZXdvcmt9L2Rpc3QvYCkgJiYgIW1vZHVsZS5yZXNvdXJjZS5tYXRjaChgL2V4dC0ke29wdGlvbnMuZnJhbWV3b3JrfS0ke29wdGlvbnMudG9vbGtpdH0vYCkpIHtcbiAgICAgICAgICB2YXJzLmRlcHMgPSBbIFxuICAgICAgICAgICAgLi4uKHZhcnMuZGVwcyB8fCBbXSksIFxuICAgICAgICAgICAgLi4ucmVxdWlyZShgLi8ke3ZhcnMuZnJhbWV3b3JrfVV0aWxgKS5leHRyYWN0RnJvbVNvdXJjZShtb2R1bGUsIG9wdGlvbnMsIGNvbXBpbGF0aW9uKSBcbiAgICAgICAgICBdXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgbG9ndihvcHRpb25zLGBleHQtY29tcGlsYXRpb246IHByb2R1Y3Rpb24gaXMgYCArICB2YXJzLnByb2R1Y3Rpb24pXG4gICAgfVxuICAgIGlmIChvcHRpb25zLmZyYW1ld29yayAhPSAnYW5ndWxhcicpIHtcbiAgICAgIGNvbXBpbGF0aW9uLmhvb2tzLmh0bWxXZWJwYWNrUGx1Z2luQmVmb3JlSHRtbEdlbmVyYXRpb24udGFwKGBleHQtaHRtbC1nZW5lcmF0aW9uYCwoZGF0YSkgPT4ge1xuICAgICAgICBsb2d2KG9wdGlvbnMsJ0hPT0sgZXh0LWh0bWwtZ2VuZXJhdGlvbicpXG4gICAgICAgIGNvbnN0IHBhdGggPSByZXF1aXJlKCdwYXRoJylcbiAgICAgICAgdmFyIG91dHB1dFBhdGggPSAnJ1xuICAgICAgICBpZiAoY29tcGlsZXIub3B0aW9ucy5kZXZTZXJ2ZXIpIHtcbiAgICAgICAgICBpZiAoY29tcGlsZXIub3V0cHV0UGF0aCA9PT0gJy8nKSB7XG4gICAgICAgICAgICBvdXRwdXRQYXRoID0gcGF0aC5qb2luKGNvbXBpbGVyLm9wdGlvbnMuZGV2U2VydmVyLmNvbnRlbnRCYXNlLCBvdXRwdXRQYXRoKVxuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlmIChjb21waWxlci5vcHRpb25zLmRldlNlcnZlci5jb250ZW50QmFzZSA9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgb3V0cHV0UGF0aCA9ICdidWlsZCdcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICBvdXRwdXRQYXRoID0gJydcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgb3V0cHV0UGF0aCA9ICdidWlsZCdcbiAgICAgICAgfVxuICAgICAgICBvdXRwdXRQYXRoID0gb3V0cHV0UGF0aC5yZXBsYWNlKHByb2Nlc3MuY3dkKCksICcnKS50cmltKClcbiAgICAgICAgdmFyIGpzUGF0aCA9IHBhdGguam9pbihvdXRwdXRQYXRoLCB2YXJzLmV4dFBhdGgsICdleHQuanMnKVxuICAgICAgICB2YXIgY3NzUGF0aCA9IHBhdGguam9pbihvdXRwdXRQYXRoLCB2YXJzLmV4dFBhdGgsICdleHQuY3NzJylcbiAgICAgICAgZGF0YS5hc3NldHMuanMudW5zaGlmdChqc1BhdGgpXG4gICAgICAgIGRhdGEuYXNzZXRzLmNzcy51bnNoaWZ0KGNzc1BhdGgpXG4gICAgICAgIGxvZyh2YXJzLmFwcCArIGBBZGRpbmcgJHtqc1BhdGh9IGFuZCAke2Nzc1BhdGh9IHRvIGluZGV4Lmh0bWxgKVxuICAgICAgfSlcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBsb2d2KG9wdGlvbnMsJ3NraXBwZWQgSE9PSyBleHQtaHRtbC1nZW5lcmF0aW9uJylcbiAgICB9XG4gIH1cbiAgY2F0Y2goZSkge1xuICAgIHJlcXVpcmUoJy4vcGx1Z2luVXRpbCcpLmxvZ3Yob3B0aW9ucyxlKVxuICAgIGNvbXBpbGF0aW9uLmVycm9ycy5wdXNoKCdfY29tcGlsYXRpb246ICcgKyBlKVxuICB9XG59XG5cbi8vKioqKioqKioqKlxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGVtaXQoY29tcGlsZXIsIGNvbXBpbGF0aW9uLCB2YXJzLCBvcHRpb25zLCBjYWxsYmFjaykge1xuICB0cnkge1xuICAgIGNvbnN0IGxvZyA9IHJlcXVpcmUoJy4vcGx1Z2luVXRpbCcpLmxvZ1xuICAgIGNvbnN0IGxvZ3YgPSByZXF1aXJlKCcuL3BsdWdpblV0aWwnKS5sb2d2XG4gICAgbG9ndihvcHRpb25zLCdGVU5DVElPTiBlbWl0JylcbiAgICB2YXIgYXBwID0gdmFycy5hcHBcbiAgICB2YXIgZnJhbWV3b3JrID0gdmFycy5mcmFtZXdvcmtcbiAgICBjb25zdCBwYXRoID0gcmVxdWlyZSgncGF0aCcpXG4gICAgY29uc3QgX2J1aWxkRXh0QnVuZGxlID0gcmVxdWlyZSgnLi9wbHVnaW5VdGlsJykuX2J1aWxkRXh0QnVuZGxlXG4gICAgbGV0IG91dHB1dFBhdGggPSBwYXRoLmpvaW4oY29tcGlsZXIub3V0cHV0UGF0aCx2YXJzLmV4dFBhdGgpXG4gICAgaWYgKGNvbXBpbGVyLm91dHB1dFBhdGggPT09ICcvJyAmJiBjb21waWxlci5vcHRpb25zLmRldlNlcnZlcikge1xuICAgICAgb3V0cHV0UGF0aCA9IHBhdGguam9pbihjb21waWxlci5vcHRpb25zLmRldlNlcnZlci5jb250ZW50QmFzZSwgb3V0cHV0UGF0aClcbiAgICB9XG4gICAgbG9ndihvcHRpb25zLCdvdXRwdXRQYXRoOiAnICsgb3V0cHV0UGF0aClcbiAgICBsb2d2KG9wdGlvbnMsJ2ZyYW1ld29yazogJyArIGZyYW1ld29yaylcbiAgICBpZiAob3B0aW9ucy5lbWl0ID09IHRydWUpIHtcbiAgICAgIGlmIChmcmFtZXdvcmsgIT0gJ2V4dGpzJykge1xuICAgICAgICBfcHJlcGFyZUZvckJ1aWxkKGFwcCwgdmFycywgb3B0aW9ucywgb3V0cHV0UGF0aCwgY29tcGlsYXRpb24pXG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgcmVxdWlyZShgLi8ke2ZyYW1ld29ya31VdGlsYCkuX3ByZXBhcmVGb3JCdWlsZChhcHAsIHZhcnMsIG9wdGlvbnMsIG91dHB1dFBhdGgsIGNvbXBpbGF0aW9uKVxuICAgICAgfVxuXG4gICAgICB2YXIgY29tbWFuZCA9ICcnXG4gICAgICBpZiAob3B0aW9ucy53YXRjaCA9PSAneWVzJykge1xuICAgICAgICBjb21tYW5kID0gJ3dhdGNoJ1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGNvbW1hbmQgPSAnYnVpbGQnXG4gICAgICB9XG5cbiAgICAgIGlmICh2YXJzLnJlYnVpbGQgPT0gdHJ1ZSkge1xuICAgICAgICB2YXIgcGFybXMgPSBbXVxuICAgICAgICBpZiAob3B0aW9ucy5wcm9maWxlID09IHVuZGVmaW5lZCB8fCBvcHRpb25zLnByb2ZpbGUgPT0gJycgfHwgb3B0aW9ucy5wcm9maWxlID09IG51bGwpIHtcbiAgICAgICAgICBwYXJtcyA9IFsnYXBwJywgY29tbWFuZCwgJy0td2ViLXNlcnZlcicsICdmYWxzZScsIG9wdGlvbnMuZW52aXJvbm1lbnRdXG5cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBwYXJtcyA9IFsnYXBwJywgY29tbWFuZCwgJy0td2ViLXNlcnZlcicsICdmYWxzZScsIG9wdGlvbnMucHJvZmlsZSwgb3B0aW9ucy5lbnZpcm9ubWVudF1cblxuICAgICAgICB9XG4gICAgICAgIGlmICh2YXJzLndhdGNoU3RhcnRlZCA9PSBmYWxzZSkge1xuICAgICAgICAgIGF3YWl0IF9idWlsZEV4dEJ1bmRsZShhcHAsIGNvbXBpbGF0aW9uLCBvdXRwdXRQYXRoLCBwYXJtcywgb3B0aW9ucylcbiAgICAgICAgICB2YXJzLndhdGNoU3RhcnRlZCA9IHRydWVcbiAgICAgICAgfVxuXG4gICAgICAgIC8vY29uc3QganNDaHVuayA9IGNvbXBpbGF0aW9uLmFkZENodW5rKGBleHQtYW5ndWxhci1qc2ApXG4gICAgICAgIC8vanNDaHVuay5oYXNSdW50aW1lID0ganNDaHVuay5pc0luaXRpYWwgPSAoKSA9PiB0cnVlO1xuICAgICAgICAvL2pzQ2h1bmsuZmlsZXMucHVzaChwYXRoLmpvaW4oJ2J1aWxkJywgJ2V4dC1hbmd1bGFyJywgJ2V4dC5qcycpKTtcbiAgICAgICAgLy9qc0NodW5rLmZpbGVzLnB1c2gocGF0aC5qb2luKCdidWlsZCcsICdleHQtYW5ndWxhcicsICAnZXh0LmNzcycpKTtcbiAgICAgICAgLy9qc0NodW5rLmlkID0gLTI7IC8vIHRoaXMgZm9yY2VzIGh0bWwtd2VicGFjay1wbHVnaW4gdG8gaW5jbHVkZSBleHQuanMgZmlyc3RcblxuICAgICAgICBpZihvcHRpb25zLmJyb3dzZXIgPT0gdHJ1ZSAmJiBvcHRpb25zLndhdGNoID09ICd5ZXMnKSB7XG4gICAgICAgICAgaWYgKHZhcnMuYnJvd3NlckNvdW50ID09IDAgJiYgY29tcGlsYXRpb24uZXJyb3JzLmxlbmd0aCA9PSAwKSB7XG4gICAgICAgICAgICB2YXIgdXJsID0gJ2h0dHA6Ly9sb2NhbGhvc3Q6JyArIG9wdGlvbnMucG9ydFxuICAgICAgICAgICAgbG9nKGFwcCArIGBPcGVuaW5nIGJyb3dzZXIgYXQgJHt1cmx9YClcbiAgICAgICAgICAgIHZhcnMuYnJvd3NlckNvdW50KytcbiAgICAgICAgICAgIGNvbnN0IG9wbiA9IHJlcXVpcmUoJ29wbicpXG4gICAgICAgICAgICBvcG4odXJsKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBsb2d2KG9wdGlvbnMsJ2Jyb3dzZXIgTk9UIG9wZW5lZCcpXG4gICAgICAgIH1cbiAgICAgICAgY2FsbGJhY2soKVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGNhbGxiYWNrKClcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBsb2coYCR7dmFycy5hcHB9RlVOQ1RJT04gZW1pdCBub3QgcnVuYClcbiAgICAgIGlmKG9wdGlvbnMuYnJvd3NlciA9PSB0cnVlKSB7XG4gICAgICAgIGlmICh2YXJzLmJyb3dzZXJDb3VudCA9PSAwICYmIG9wdGlvbnMud2F0Y2ggPT0gJ3llcycpIHtcbiAgICAgICAgICB2YXIgdXJsID0gJ2h0dHA6Ly9sb2NhbGhvc3Q6JyArIG9wdGlvbnMucG9ydFxuICAgICAgICAgIGxvZyhhcHAgKyBgT3BlbmluZyBicm93c2VyIGF0ICR7dXJsfWApXG4gICAgICAgICAgdmFycy5icm93c2VyQ291bnQrK1xuICAgICAgICAgIGNvbnN0IG9wbiA9IHJlcXVpcmUoJ29wbicpXG4gICAgICAgICAgb3BuKHVybClcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGxvZ3Yob3B0aW9ucywnYnJvd3NlciBOT1Qgb3BlbmVkJylcbiAgICAgIH1cbiAgICAgIGNhbGxiYWNrKClcbiAgICB9XG4gIH1cbiAgY2F0Y2goZSkge1xuICAgIHJlcXVpcmUoJy4vcGx1Z2luVXRpbCcpLmxvZ3Yob3B0aW9ucyxlKVxuICAgIGNvbXBpbGF0aW9uLmVycm9ycy5wdXNoKCdlbWl0OiAnICsgZSlcbiAgICBjYWxsYmFjaygpXG4gIH1cbn1cblxuLy8qKioqKioqKioqXG5leHBvcnQgZnVuY3Rpb24gX3ByZXBhcmVGb3JCdWlsZChhcHAsIHZhcnMsIG9wdGlvbnMsIG91dHB1dCwgY29tcGlsYXRpb24pIHtcbiAgdHJ5IHtcbiAgICBsb2d2KG9wdGlvbnMsJ0ZVTkNUSU9OIF9wcmVwYXJlRm9yQnVpbGQnKVxuICAgIGNvbnN0IHJpbXJhZiA9IHJlcXVpcmUoJ3JpbXJhZicpXG4gICAgY29uc3QgbWtkaXJwID0gcmVxdWlyZSgnbWtkaXJwJylcbiAgICBjb25zdCBmc3ggPSByZXF1aXJlKCdmcy1leHRyYScpXG4gICAgY29uc3QgZnMgPSByZXF1aXJlKCdmcycpXG4gICAgY29uc3QgcGF0aCA9IHJlcXVpcmUoJ3BhdGgnKVxuXG4gICAgdmFyIHBhY2thZ2VzID0gb3B0aW9ucy5wYWNrYWdlc1xuICAgIHZhciB0b29sa2l0ID0gb3B0aW9ucy50b29sa2l0XG4gICAgdmFyIHRoZW1lID0gb3B0aW9ucy50aGVtZVxuXG4gICAgdGhlbWUgPSB0aGVtZSB8fCAodG9vbGtpdCA9PT0gJ2NsYXNzaWMnID8gJ3RoZW1lLXRyaXRvbicgOiAndGhlbWUtbWF0ZXJpYWwnKVxuICAgIGxvZ3Yob3B0aW9ucywnZmlyc3RUaW1lOiAnICsgdmFycy5maXJzdFRpbWUpXG4gICAgaWYgKHZhcnMuZmlyc3RUaW1lKSB7XG4gICAgICByaW1yYWYuc3luYyhvdXRwdXQpXG4gICAgICBta2RpcnAuc3luYyhvdXRwdXQpXG4gICAgICBjb25zdCBidWlsZFhNTCA9IHJlcXVpcmUoJy4vYXJ0aWZhY3RzJykuYnVpbGRYTUxcbiAgICAgIGNvbnN0IGNyZWF0ZUFwcEpzb24gPSByZXF1aXJlKCcuL2FydGlmYWN0cycpLmNyZWF0ZUFwcEpzb25cbiAgICAgIGNvbnN0IGNyZWF0ZVdvcmtzcGFjZUpzb24gPSByZXF1aXJlKCcuL2FydGlmYWN0cycpLmNyZWF0ZVdvcmtzcGFjZUpzb25cbiAgICAgIGNvbnN0IGNyZWF0ZUpTRE9NRW52aXJvbm1lbnQgPSByZXF1aXJlKCcuL2FydGlmYWN0cycpLmNyZWF0ZUpTRE9NRW52aXJvbm1lbnRcblxuICAgICAgZnMud3JpdGVGaWxlU3luYyhwYXRoLmpvaW4ob3V0cHV0LCAnYnVpbGQueG1sJyksIGJ1aWxkWE1MKHZhcnMucHJvZHVjdGlvbiwgb3B0aW9ucyksICd1dGY4JylcbiAgICAgIGZzLndyaXRlRmlsZVN5bmMocGF0aC5qb2luKG91dHB1dCwgJ2FwcC5qc29uJyksIGNyZWF0ZUFwcEpzb24odGhlbWUsIHBhY2thZ2VzLCB0b29sa2l0LCBvcHRpb25zKSwgJ3V0ZjgnKVxuICAgICAgZnMud3JpdGVGaWxlU3luYyhwYXRoLmpvaW4ob3V0cHV0LCAnanNkb20tZW52aXJvbm1lbnQuanMnKSwgY3JlYXRlSlNET01FbnZpcm9ubWVudChvcHRpb25zKSwgJ3V0ZjgnKVxuICAgICAgZnMud3JpdGVGaWxlU3luYyhwYXRoLmpvaW4ob3V0cHV0LCAnd29ya3NwYWNlLmpzb24nKSwgY3JlYXRlV29ya3NwYWNlSnNvbihvcHRpb25zKSwgJ3V0ZjgnKVxuXG4gICAgICBpZiAoZnMuZXhpc3RzU3luYyhwYXRoLmpvaW4ocHJvY2Vzcy5jd2QoKSwncmVzb3VyY2VzLycpKSkge1xuICAgICAgICB2YXIgZnJvbVJlc291cmNlcyA9IHBhdGguam9pbihwcm9jZXNzLmN3ZCgpLCAncmVzb3VyY2VzLycpXG4gICAgICAgIHZhciB0b1Jlc291cmNlcyA9IHBhdGguam9pbihvdXRwdXQsICcuLi9yZXNvdXJjZXMnKVxuICAgICAgICBmc3guY29weVN5bmMoZnJvbVJlc291cmNlcywgdG9SZXNvdXJjZXMpXG4gICAgICAgIGxvZyhhcHAgKyAnQ29weWluZyAnICsgZnJvbVJlc291cmNlcy5yZXBsYWNlKHByb2Nlc3MuY3dkKCksICcnKSArICcgdG86ICcgKyB0b1Jlc291cmNlcy5yZXBsYWNlKHByb2Nlc3MuY3dkKCksICcnKSlcbiAgICAgIH1cblxuICAgICAgaWYgKGZzLmV4aXN0c1N5bmMocGF0aC5qb2luKHByb2Nlc3MuY3dkKCksJ3Jlc291cmNlcy8nKSkpIHtcbiAgICAgICAgdmFyIGZyb21SZXNvdXJjZXMgPSBwYXRoLmpvaW4ocHJvY2Vzcy5jd2QoKSwgJ3Jlc291cmNlcy8nKVxuICAgICAgICB2YXIgdG9SZXNvdXJjZXMgPSBwYXRoLmpvaW4ob3V0cHV0LCAncmVzb3VyY2VzJylcbiAgICAgICAgZnN4LmNvcHlTeW5jKGZyb21SZXNvdXJjZXMsIHRvUmVzb3VyY2VzKVxuICAgICAgICBsb2coYXBwICsgJ0NvcHlpbmcgJyArIGZyb21SZXNvdXJjZXMucmVwbGFjZShwcm9jZXNzLmN3ZCgpLCAnJykgKyAnIHRvOiAnICsgdG9SZXNvdXJjZXMucmVwbGFjZShwcm9jZXNzLmN3ZCgpLCAnJykpXG4gICAgICB9XG4gICAgfVxuICAgIHZhcnMuZmlyc3RUaW1lID0gZmFsc2VcbiAgICB2YXIganMgPSAnJ1xuICAgIGlmICh2YXJzLnByb2R1Y3Rpb24pIHtcbiAgICAgIHZhcnMuZGVwcy5wdXNoKCdFeHQucmVxdWlyZShcIkV4dC5sYXlvdXQuKlwiKTtcXG4nKVxuICAgICAganMgPSB2YXJzLmRlcHMuam9pbignO1xcbicpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGpzID0gJ0V4dC5yZXF1aXJlKFwiRXh0LipcIiknXG4gICAgfVxuICAgIGlmICh2YXJzLm1hbmlmZXN0ID09PSBudWxsIHx8IGpzICE9PSB2YXJzLm1hbmlmZXN0KSB7XG4gICAgICB2YXJzLm1hbmlmZXN0ID0ganNcbiAgICAgIGNvbnN0IG1hbmlmZXN0ID0gcGF0aC5qb2luKG91dHB1dCwgJ21hbmlmZXN0LmpzJylcbiAgICAgIGZzLndyaXRlRmlsZVN5bmMobWFuaWZlc3QsIGpzLCAndXRmOCcpXG4gICAgICB2YXJzLnJlYnVpbGQgPSB0cnVlXG4gICAgICB2YXIgYnVuZGxlRGlyID0gb3V0cHV0LnJlcGxhY2UocHJvY2Vzcy5jd2QoKSwgJycpXG4gICAgICBpZiAoYnVuZGxlRGlyLnRyaW0oKSA9PSAnJykge2J1bmRsZURpciA9ICcuLyd9XG4gICAgICBsb2coYXBwICsgJ0J1aWxkaW5nIEV4dCBidW5kbGUgYXQ6ICcgKyBidW5kbGVEaXIpXG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdmFycy5yZWJ1aWxkID0gZmFsc2VcbiAgICAgIGxvZyhhcHAgKyAnRXh0IHJlYnVpbGQgTk9UIG5lZWRlZCcpXG4gICAgfVxuICB9XG4gIGNhdGNoKGUpIHtcbiAgICByZXF1aXJlKCcuL3BsdWdpblV0aWwnKS5sb2d2KG9wdGlvbnMsZSlcbiAgICBjb21waWxhdGlvbi5lcnJvcnMucHVzaCgnX3ByZXBhcmVGb3JCdWlsZDogJyArIGUpXG4gIH1cbn1cblxuLy8qKioqKioqKioqXG5leHBvcnQgZnVuY3Rpb24gX2J1aWxkRXh0QnVuZGxlKGFwcCwgY29tcGlsYXRpb24sIG91dHB1dFBhdGgsIHBhcm1zLCBvcHRpb25zKSB7XG4gIHRyeSB7XG4gICAgY29uc3QgZnMgPSByZXF1aXJlKCdmcycpXG4gICAgY29uc3QgbG9ndiA9IHJlcXVpcmUoJy4vcGx1Z2luVXRpbCcpLmxvZ3ZcbiAgICBsb2d2KG9wdGlvbnMsJ0ZVTkNUSU9OIF9idWlsZEV4dEJ1bmRsZScpXG5cbiAgICBsZXQgc2VuY2hhOyB0cnkgeyBzZW5jaGEgPSByZXF1aXJlKCdAc2VuY2hhL2NtZCcpIH0gY2F0Y2ggKGUpIHsgc2VuY2hhID0gJ3NlbmNoYScgfVxuICAgIGlmIChmcy5leGlzdHNTeW5jKHNlbmNoYSkpIHtcbiAgICAgIGxvZ3Yob3B0aW9ucywnc2VuY2hhIGZvbGRlciBleGlzdHMnKVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGxvZ3Yob3B0aW9ucywnc2VuY2hhIGZvbGRlciBET0VTIE5PVCBleGlzdCcpXG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGNvbnN0IG9uQnVpbGREb25lID0gKCkgPT4ge1xuICAgICAgICBsb2d2KG9wdGlvbnMsJ29uQnVpbGREb25lJylcbiAgICAgICAgcmVzb2x2ZSgpXG4gICAgICB9XG5cbiAgICAgIHZhciBvcHRzID0geyBjd2Q6IG91dHB1dFBhdGgsIHNpbGVudDogdHJ1ZSwgc3RkaW86ICdwaXBlJywgZW5jb2Rpbmc6ICd1dGYtOCd9XG4gICAgICBleGVjdXRlQXN5bmMoYXBwLCBzZW5jaGEsIHBhcm1zLCBvcHRzLCBjb21waWxhdGlvbiwgb3B0aW9ucykudGhlbiAoXG4gICAgICAgIGZ1bmN0aW9uKCkgeyBvbkJ1aWxkRG9uZSgpIH0sIFxuICAgICAgICBmdW5jdGlvbihyZWFzb24pIHsgcmVqZWN0KHJlYXNvbikgfVxuICAgICAgKVxuICAgIH0pXG4gIH1cbiAgY2F0Y2goZSkge1xuICAgIHJlcXVpcmUoJy4vcGx1Z2luVXRpbCcpLmxvZ3Yob3B0aW9ucyxlKVxuICAgIGNvbXBpbGF0aW9uLmVycm9ycy5wdXNoKCdfYnVpbGRFeHRCdW5kbGU6ICcgKyBlKVxuICAgIGNhbGxiYWNrKClcbiAgfVxufVxuXG4vLyoqKioqKioqKipcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBleGVjdXRlQXN5bmMgKGFwcCwgY29tbWFuZCwgcGFybXMsIG9wdHMsIGNvbXBpbGF0aW9uLCBvcHRpb25zKSB7XG4gIHRyeSB7XG4gICAgLy9jb25zdCBERUZBVUxUX1NVQlNUUlMgPSBbJ1tJTkZdIExvYWRpbmcnLCAnW0lORl0gUHJvY2Vzc2luZycsICdbTE9HXSBGYXNoaW9uIGJ1aWxkIGNvbXBsZXRlJywgJ1tFUlJdJywgJ1tXUk5dJywgXCJbSU5GXSBTZXJ2ZXJcIiwgXCJbSU5GXSBXcml0aW5nXCIsIFwiW0lORl0gTG9hZGluZyBCdWlsZFwiLCBcIltJTkZdIFdhaXRpbmdcIiwgXCJbTE9HXSBGYXNoaW9uIHdhaXRpbmdcIl07XG4gICAgY29uc3QgREVGQVVMVF9TVUJTVFJTID0gW1wiW0lORl0geFNlcnZlclwiLCAnW0lORl0gTG9hZGluZycsICdbSU5GXSBBcHBlbmQnLCAnW0lORl0gUHJvY2Vzc2luZycsICdbSU5GXSBQcm9jZXNzaW5nIEJ1aWxkJywgJ1tMT0ddIEZhc2hpb24gYnVpbGQgY29tcGxldGUnLCAnW0VSUl0nLCAnW1dSTl0nLCBcIltJTkZdIFdyaXRpbmdcIiwgXCJbSU5GXSBMb2FkaW5nIEJ1aWxkXCIsIFwiW0lORl0gV2FpdGluZ1wiLCBcIltMT0ddIEZhc2hpb24gd2FpdGluZ1wiXTtcbiAgICB2YXIgc3Vic3RyaW5ncyA9IERFRkFVTFRfU1VCU1RSUyBcbiAgICB2YXIgY2hhbGsgPSByZXF1aXJlKCdjaGFsaycpXG4gICAgY29uc3QgY3Jvc3NTcGF3biA9IHJlcXVpcmUoJ2Nyb3NzLXNwYXduJylcbiAgICBjb25zdCBsb2cgPSByZXF1aXJlKCcuL3BsdWdpblV0aWwnKS5sb2dcbiAgICBsb2d2KG9wdGlvbnMsICdGVU5DVElPTiBleGVjdXRlQXN5bmMnKVxuICAgIGF3YWl0IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGxvZ3Yob3B0aW9ucyxgY29tbWFuZCAtICR7Y29tbWFuZH1gKVxuICAgICAgbG9ndihvcHRpb25zLCBgcGFybXMgLSAke3Bhcm1zfWApXG4gICAgICBsb2d2KG9wdGlvbnMsIGBvcHRzIC0gJHtKU09OLnN0cmluZ2lmeShvcHRzKX1gKVxuICAgICAgbGV0IGNoaWxkID0gY3Jvc3NTcGF3bihjb21tYW5kLCBwYXJtcywgb3B0cylcbiAgICAgIGNoaWxkLm9uKCdjbG9zZScsIChjb2RlLCBzaWduYWwpID0+IHtcbiAgICAgICAgbG9ndihvcHRpb25zLCBgb24gY2xvc2U6IGAgKyBjb2RlKSBcbiAgICAgICAgaWYoY29kZSA9PT0gMCkgeyByZXNvbHZlKDApIH1cbiAgICAgICAgZWxzZSB7IGNvbXBpbGF0aW9uLmVycm9ycy5wdXNoKCBuZXcgRXJyb3IoY29kZSkgKTsgcmVzb2x2ZSgwKSB9XG4gICAgICB9KVxuICAgICAgY2hpbGQub24oJ2Vycm9yJywgKGVycm9yKSA9PiB7IFxuICAgICAgICBsb2d2KG9wdGlvbnMsIGBvbiBlcnJvcmApIFxuICAgICAgICBjb21waWxhdGlvbi5lcnJvcnMucHVzaChlcnJvcilcbiAgICAgICAgcmVzb2x2ZSgwKVxuICAgICAgfSlcbiAgICAgIGNoaWxkLnN0ZG91dC5vbignZGF0YScsIChkYXRhKSA9PiB7XG4gICAgICAgIHZhciBzdHIgPSBkYXRhLnRvU3RyaW5nKCkucmVwbGFjZSgvXFxyP1xcbnxcXHIvZywgXCIgXCIpLnRyaW0oKVxuICAgICAgICBsb2d2KG9wdGlvbnMsIGAke3N0cn1gKVxuICAgICAgICBpZiAoZGF0YSAmJiBkYXRhLnRvU3RyaW5nKCkubWF0Y2goL3dhaXRpbmcgZm9yIGNoYW5nZXNcXC5cXC5cXC4vKSkge1xuICAgICAgICAgIHJlc29sdmUoMClcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBpZiAoc3Vic3RyaW5ncy5zb21lKGZ1bmN0aW9uKHYpIHsgcmV0dXJuIGRhdGEuaW5kZXhPZih2KSA+PSAwOyB9KSkgeyBcbiAgICAgICAgICAgIHN0ciA9IHN0ci5yZXBsYWNlKFwiW0lORl1cIiwgXCJcIilcbiAgICAgICAgICAgIHN0ciA9IHN0ci5yZXBsYWNlKFwiW0xPR11cIiwgXCJcIilcbiAgICAgICAgICAgIHN0ciA9IHN0ci5yZXBsYWNlKHByb2Nlc3MuY3dkKCksICcnKS50cmltKClcbiAgICAgICAgICAgIGlmIChzdHIuaW5jbHVkZXMoXCJbRVJSXVwiKSkge1xuICAgICAgICAgICAgICBjb21waWxhdGlvbi5lcnJvcnMucHVzaChhcHAgKyBzdHIucmVwbGFjZSgvXlxcW0VSUlxcXSAvZ2ksICcnKSk7XG4gICAgICAgICAgICAgIHN0ciA9IHN0ci5yZXBsYWNlKFwiW0VSUl1cIiwgYCR7Y2hhbGsucmVkKFwiW0VSUl1cIil9YClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxvZyhgJHthcHB9JHtzdHJ9YCkgXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgY2hpbGQuc3RkZXJyLm9uKCdkYXRhJywgKGRhdGEpID0+IHtcbiAgICAgICAgbG9ndihvcHRpb25zLCBgZXJyb3Igb24gY2xvc2U6IGAgKyBkYXRhKSBcbiAgICAgICAgdmFyIHN0ciA9IGRhdGEudG9TdHJpbmcoKS5yZXBsYWNlKC9cXHI/XFxufFxcci9nLCBcIiBcIikudHJpbSgpXG4gICAgICAgIHZhciBzdHJKYXZhT3B0cyA9IFwiUGlja2VkIHVwIF9KQVZBX09QVElPTlNcIjtcbiAgICAgICAgdmFyIGluY2x1ZGVzID0gc3RyLmluY2x1ZGVzKHN0ckphdmFPcHRzKVxuICAgICAgICBpZiAoIWluY2x1ZGVzKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coYCR7YXBwfSAke2NoYWxrLnJlZChcIltFUlJdXCIpfSAke3N0cn1gKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0pXG4gIH1cbiAgY2F0Y2goZSkge1xuICAgIHJlcXVpcmUoJy4vcGx1Z2luVXRpbCcpLmxvZ3Yob3B0aW9ucyxlKVxuICAgIGNvbXBpbGF0aW9uLmVycm9ycy5wdXNoKCdleGVjdXRlQXN5bmM6ICcgKyBlKVxuICAgIGNhbGxiYWNrKClcbiAgfSBcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gbG9nKHMpIHtcbiAgcmVxdWlyZSgncmVhZGxpbmUnKS5jdXJzb3JUbyhwcm9jZXNzLnN0ZG91dCwgMClcbiAgdHJ5IHtcbiAgICBwcm9jZXNzLnN0ZG91dC5jbGVhckxpbmUoKVxuICB9XG4gIGNhdGNoKGUpIHt9XG4gIHByb2Nlc3Muc3Rkb3V0LndyaXRlKHMpXG4gIHByb2Nlc3Muc3Rkb3V0LndyaXRlKCdcXG4nKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gbG9ndihvcHRpb25zLCBzKSB7XG4gIGlmIChvcHRpb25zLnZlcmJvc2UgPT0gJ3llcycpIHtcbiAgICByZXF1aXJlKCdyZWFkbGluZScpLmN1cnNvclRvKHByb2Nlc3Muc3Rkb3V0LCAwKVxuICAgIHRyeSB7XG4gICAgICBwcm9jZXNzLnN0ZG91dC5jbGVhckxpbmUoKVxuICAgIH1cbiAgICBjYXRjaChlKSB7fVxuICAgIHByb2Nlc3Muc3Rkb3V0LndyaXRlKGAtdmVyYm9zZTogJHtzfWApXG4gICAgcHJvY2Vzcy5zdGRvdXQud3JpdGUoJ1xcbicpXG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9nZXRBcHAoKSB7XG4gIHZhciBjaGFsayA9IHJlcXVpcmUoJ2NoYWxrJylcbiAgdmFyIHByZWZpeCA9IGBgXG4gIGNvbnN0IHBsYXRmb3JtID0gcmVxdWlyZSgnb3MnKS5wbGF0Zm9ybSgpXG4gIGlmIChwbGF0Zm9ybSA9PSAnZGFyd2luJykgeyBwcmVmaXggPSBg4oS5IO+9omV4dO+9ozpgIH1cbiAgZWxzZSB7IHByZWZpeCA9IGBpIFtleHRdOmAgfVxuICByZXR1cm4gYCR7Y2hhbGsuZ3JlZW4ocHJlZml4KX0gYFxufVxuXG5leHBvcnQgZnVuY3Rpb24gX2dldFZlcnNpb25zKGFwcCwgcGx1Z2luTmFtZSwgZnJhbWV3b3JrTmFtZSkge1xuICBjb25zdCBwYXRoID0gcmVxdWlyZSgncGF0aCcpXG4gIGNvbnN0IGZzID0gcmVxdWlyZSgnZnMnKVxuXG4gIHZhciB2ID0ge31cbiAgdmFyIHBsdWdpblBhdGggPSBwYXRoLnJlc29sdmUocHJvY2Vzcy5jd2QoKSwnbm9kZV9tb2R1bGVzL0BzZW5jaGEnLCBwbHVnaW5OYW1lKVxuICB2YXIgcGx1Z2luUGtnID0gKGZzLmV4aXN0c1N5bmMocGx1Z2luUGF0aCsnL3BhY2thZ2UuanNvbicpICYmIEpTT04ucGFyc2UoZnMucmVhZEZpbGVTeW5jKHBsdWdpblBhdGgrJy9wYWNrYWdlLmpzb24nLCAndXRmLTgnKSkgfHwge30pO1xuICB2LnBsdWdpblZlcnNpb24gPSBwbHVnaW5Qa2cudmVyc2lvblxuICB2Ll9yZXNvbHZlZCA9IHBsdWdpblBrZy5fcmVzb2x2ZWRcbiAgaWYgKHYuX3Jlc29sdmVkID09IHVuZGVmaW5lZCkge1xuICAgIHYuZWRpdGlvbiA9IGBDb21tZXJjaWFsYFxuICB9XG4gIGVsc2Uge1xuICAgIGlmICgtMSA9PSB2Ll9yZXNvbHZlZC5pbmRleE9mKCdjb21tdW5pdHknKSkge1xuICAgICAgdi5lZGl0aW9uID0gYENvbW1lcmNpYWxgXG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdi5lZGl0aW9uID0gYENvbW11bml0eWBcbiAgICB9XG4gIH1cblxuICB2YXIgd2VicGFja1BhdGggPSBwYXRoLnJlc29sdmUocHJvY2Vzcy5jd2QoKSwnbm9kZV9tb2R1bGVzL3dlYnBhY2snKVxuICB2YXIgd2VicGFja1BrZyA9IChmcy5leGlzdHNTeW5jKHdlYnBhY2tQYXRoKycvcGFja2FnZS5qc29uJykgJiYgSlNPTi5wYXJzZShmcy5yZWFkRmlsZVN5bmMod2VicGFja1BhdGgrJy9wYWNrYWdlLmpzb24nLCAndXRmLTgnKSkgfHwge30pO1xuICB2LndlYnBhY2tWZXJzaW9uID0gd2VicGFja1BrZy52ZXJzaW9uXG5cbiAgdmFyIGV4dFBhdGggPSBwYXRoLnJlc29sdmUocHJvY2Vzcy5jd2QoKSwnbm9kZV9tb2R1bGVzL0BzZW5jaGEvZXh0JylcbiAgdmFyIGV4dFBrZyA9IChmcy5leGlzdHNTeW5jKGV4dFBhdGgrJy9wYWNrYWdlLmpzb24nKSAmJiBKU09OLnBhcnNlKGZzLnJlYWRGaWxlU3luYyhleHRQYXRoKycvcGFja2FnZS5qc29uJywgJ3V0Zi04JykpIHx8IHt9KTtcbiAgdi5leHRWZXJzaW9uID0gZXh0UGtnLnNlbmNoYS52ZXJzaW9uXG5cbiAgdmFyIGNtZFBhdGggPSBwYXRoLnJlc29sdmUocHJvY2Vzcy5jd2QoKSxgbm9kZV9tb2R1bGVzL0BzZW5jaGEvY21kYClcbiAgdmFyIGNtZFBrZyA9IChmcy5leGlzdHNTeW5jKGNtZFBhdGgrJy9wYWNrYWdlLmpzb24nKSAmJiBKU09OLnBhcnNlKGZzLnJlYWRGaWxlU3luYyhjbWRQYXRoKycvcGFja2FnZS5qc29uJywgJ3V0Zi04JykpIHx8IHt9KTtcbiAgdi5jbWRWZXJzaW9uID0gY21kUGtnLnZlcnNpb25fZnVsbFxuXG4gIGlmICh2LmNtZFZlcnNpb24gPT0gdW5kZWZpbmVkKSB7XG4gICAgdmFyIGNtZFBhdGggPSBwYXRoLnJlc29sdmUocHJvY2Vzcy5jd2QoKSxgbm9kZV9tb2R1bGVzL0BzZW5jaGEvJHtwbHVnaW5OYW1lfS9ub2RlX21vZHVsZXMvQHNlbmNoYS9jbWRgKVxuICAgIHZhciBjbWRQa2cgPSAoZnMuZXhpc3RzU3luYyhjbWRQYXRoKycvcGFja2FnZS5qc29uJykgJiYgSlNPTi5wYXJzZShmcy5yZWFkRmlsZVN5bmMoY21kUGF0aCsnL3BhY2thZ2UuanNvbicsICd1dGYtOCcpKSB8fCB7fSk7XG4gICAgdi5jbWRWZXJzaW9uID0gY21kUGtnLnZlcnNpb25fZnVsbFxuICB9XG5cbiAgdmFyIGZyYW1ld29ya0luZm8gPSAnJ1xuICAgaWYgKGZyYW1ld29ya05hbWUgIT0gdW5kZWZpbmVkICYmIGZyYW1ld29ya05hbWUgIT0gJ2V4dGpzJykge1xuICAgIHZhciBmcmFtZXdvcmtQYXRoID0gJydcbiAgICBpZiAoZnJhbWV3b3JrTmFtZSA9PSAncmVhY3QnKSB7XG4gICAgICBmcmFtZXdvcmtQYXRoID0gcGF0aC5yZXNvbHZlKHByb2Nlc3MuY3dkKCksJ25vZGVfbW9kdWxlcy9yZWFjdCcpXG4gICAgfVxuICAgIGlmIChmcmFtZXdvcmtOYW1lID09ICdhbmd1bGFyJykge1xuICAgICAgZnJhbWV3b3JrUGF0aCA9IHBhdGgucmVzb2x2ZShwcm9jZXNzLmN3ZCgpLCdub2RlX21vZHVsZXMvQGFuZ3VsYXIvY29yZScpXG4gICAgfVxuICAgIHZhciBmcmFtZXdvcmtQa2cgPSAoZnMuZXhpc3RzU3luYyhmcmFtZXdvcmtQYXRoKycvcGFja2FnZS5qc29uJykgJiYgSlNPTi5wYXJzZShmcy5yZWFkRmlsZVN5bmMoZnJhbWV3b3JrUGF0aCsnL3BhY2thZ2UuanNvbicsICd1dGYtOCcpKSB8fCB7fSk7XG4gICAgdi5mcmFtZXdvcmtWZXJzaW9uID0gZnJhbWV3b3JrUGtnLnZlcnNpb25cbiAgICBmcmFtZXdvcmtJbmZvID0gJywgJyArIGZyYW1ld29ya05hbWUgKyAnIHYnICsgdi5mcmFtZXdvcmtWZXJzaW9uXG4gIH1cbiAgcmV0dXJuIGFwcCArICdleHQtd2VicGFjay1wbHVnaW4gdicgKyB2LnBsdWdpblZlcnNpb24gKyAnLCBFeHQgSlMgdicgKyB2LmV4dFZlcnNpb24gKyAnICcgKyB2LmVkaXRpb24gKyAnIEVkaXRpb24sIFNlbmNoYSBDbWQgdicgKyB2LmNtZFZlcnNpb24gKyAnLCB3ZWJwYWNrIHYnICsgdi53ZWJwYWNrVmVyc2lvbiArIGZyYW1ld29ya0luZm9cbiB9Il19