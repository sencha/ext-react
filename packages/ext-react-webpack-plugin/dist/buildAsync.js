'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _rimraf = require('rimraf');

var _mkdirp = require('mkdirp');

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _artifacts = require('./artifacts');

var _readline = require('readline');

var readline = _interopRequireWildcard(_readline);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var chalk = require('chalk');
var util = require('./util.js');

var prefix = '';
if (require('os').platform() == 'darwin') {
  prefix = '\u2139 \uFF62ext\uFF63:';
} else {
  prefix = 'i [ext]:';
}

var app = chalk.green(prefix) + ' ext-build-async:';

var buildAsync = function () {
  function buildAsync(options) {
    _classCallCheck(this, buildAsync);

    this.isWebpack4 = options.isWebpack4;
    this.modules = options.modules;
    this.output = options.outputPath;
    this.build = options.build;
    this.callback = options.callback;
    this.watching = options.watching;
    this.treeShaking = options.treeShaking;
    this.dependencies = options.dependencies;
  }

  _createClass(buildAsync, [{
    key: 'executeAsync',
    value: function executeAsync() {
      console.log('in executeAsync');
      var toolkit = 'modern';
      var theme;
      var packages = [];
      var packageDirs = [];
      var sdk = '';
      var overrides;
      //, callback}

      //    let sencha = this._getSenchCmdPath();
      theme = theme || (toolkit === 'classic' ? 'theme-triton' : 'theme-material');

      if (!this.watching) {
        (0, _rimraf.sync)(this.output);
        (0, _mkdirp.sync)(this.output);
      }

      var js = void 0;
      if (this.treeShaking) {
        var statements = ['Ext.require(["Ext.app.Application", "Ext.Component", "Ext.Widget", "Ext.layout.Fit"])']; // for some reason command doesn't load component when only panel is required
        // if (packages.indexOf('reacto') !== -1) {
        //   statements.push('Ext.require("Ext.react.RendererCell")');
        // }
        //mjg
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = this.modules[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var _module = _step.value;

            var deps = this.dependencies[_module.resource];
            if (deps) statements = statements.concat(deps);
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        js = statements.join(';\n');
      } else {
        js = 'Ext.require("Ext.*")';
      }
      var manifest = _path2.default.join(this.output, 'manifest.js');
      // add ext-react/packages automatically if present
      var userPackages = _path2.default.join('.', 'ext-react', 'packages');
      if (_fs2.default.existsSync(userPackages)) {
        packageDirs.push(userPackages);
      }

      if (_fs2.default.existsSync(_path2.default.join(sdk, 'ext'))) {
        // local checkout of the SDK repo
        packageDirs.push(_path2.default.join('ext', 'packages'));
        sdk = _path2.default.join(sdk, 'ext');
      }
      if (!this.watching) {
        _fs2.default.writeFileSync(_path2.default.join(this.output, 'build.xml'), (0, _artifacts.buildXML)({ compress: this.production }), 'utf8');
        _fs2.default.writeFileSync(_path2.default.join(this.output, 'jsdom-environment.js'), (0, _artifacts.createJSDOMEnvironment)(), 'utf8');
        _fs2.default.writeFileSync(_path2.default.join(this.output, 'app.json'), (0, _artifacts.createAppJson)({ theme: theme, packages: packages, toolkit: toolkit, overrides: overrides, packageDirs: packageDirs }), 'utf8');
        _fs2.default.writeFileSync(_path2.default.join(this.output, 'workspace.json'), (0, _artifacts.createWorkspaceJson)(sdk, packageDirs, this.output), 'utf8');
      }
      var cmdRebuildNeeded = false;
      if (this.manifest === null || js !== this.manifest) {
        // Only write manifest if it differs from the last run.  This prevents unnecessary cmd rebuilds.
        this.manifest = js;
        //readline.cursorTo(process.stdout, 0);console.log(app + js)
        readline.cursorTo(process.stdout, 0);console.log(app + 'tree shaking: ' + this.treeShaking);
        _fs2.default.writeFileSync(manifest, js, 'utf8');
        cmdRebuildNeeded = true;
        readline.cursorTo(process.stdout, 0);console.log(app + ('building ExtReact bundle at: ' + this.output));
      }

      var me = this;
      return new Promise(function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(resolve, reject) {
          var parms;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  parms = ['ant', 'watch'];

                  if (me.verbose == 'yes') {
                    console.log(app + ' passing to \'sencha app build ' + me.profile + ' ' + me.environment + '\'');
                  }
                  _context.prev = 2;

                  console.log(app + ' passing to \'sencha ant watch\'');
                  _context.next = 6;
                  return util.senchaCmdAsync(parms, me.output, me.verbose);

                case 6:
                  console.log(app + ' after passing to \'sencha ant watch\'');

                  resolve(0);
                  _context.next = 13;
                  break;

                case 10:
                  _context.prev = 10;
                  _context.t0 = _context['catch'](2);

                  reject({ error: _context.t0 });

                case 13:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, this, [[2, 10]]);
        }));

        return function (_x, _x2) {
          return _ref.apply(this, arguments);
        };
      }());

      // return new Promise((resolve, reject) => {
      //   this.onBuildFail = reject;
      //   this.onBuildSuccess = resolve;
      //   cmdErrors = [];

      //   const onBuildDone = () => {
      //     if (cmdErrors.length) {
      //       this.onBuildFail(new Error(cmdErrors.join("")));
      //     } else {
      //       this.onBuildSuccess();
      //     }
      //   }


      //   //if (!isWebpack4) {
      //     if (this.watch) {
      //       if (!watching) {
      //         watching = gatherErrors(fork(sencha, ['ant', 'watch'], { cwd: output, silent: true }));
      //         readline.cursorTo(process.stdout, 0);console.log(app + 'sencha ant watch')
      //         watching.stderr.pipe(process.stderr);
      //         watching.stdout.pipe(process.stdout);
      //         watching.stdout.on('data', data => {
      //           if (data && data.toString().match(/Waiting for changes\.\.\./)) {
      //             onBuildDone()
      //           }
      //         })
      //         watching.on('exit', onBuildDone)
      //       }
      //       if (!cmdRebuildNeeded) {
      //         readline.cursorTo(process.stdout, 0);console.log(app + 'Ext rebuild NOT needed')
      //         onBuildDone()
      //       }
      //       else {
      //         readline.cursorTo(process.stdout, 0);console.log(app + 'Ext rebuild IS needed')
      //       }
      //     } 
      //     else {
      //       const build = gatherErrors(fork(sencha, ['ant', 'build'], { stdio: 'inherit', encoding: 'utf-8', cwd: output, silent: false }));
      //       readline.cursorTo(process.stdout, 0);console.log(app + 'sencha ant build')
      //       if(build.stdout) { build.stdout.pipe(process.stdout) }
      //       if(build.stderr) { build.stderr.pipe(process.stderr) }
      //       build.on('exit', onBuildDone);
      //     }
      //   //}


      //    });

    }
  }]);

  return buildAsync;
}();

module.exports = buildAsync;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9idWlsZEFzeW5jLmpzIl0sIm5hbWVzIjpbInJlYWRsaW5lIiwiY2hhbGsiLCJyZXF1aXJlIiwidXRpbCIsInByZWZpeCIsInBsYXRmb3JtIiwiYXBwIiwiZ3JlZW4iLCJidWlsZEFzeW5jIiwib3B0aW9ucyIsImlzV2VicGFjazQiLCJtb2R1bGVzIiwib3V0cHV0Iiwib3V0cHV0UGF0aCIsImJ1aWxkIiwiY2FsbGJhY2siLCJ3YXRjaGluZyIsInRyZWVTaGFraW5nIiwiZGVwZW5kZW5jaWVzIiwiY29uc29sZSIsImxvZyIsInRvb2xraXQiLCJ0aGVtZSIsInBhY2thZ2VzIiwicGFja2FnZURpcnMiLCJzZGsiLCJvdmVycmlkZXMiLCJqcyIsInN0YXRlbWVudHMiLCJtb2R1bGUiLCJkZXBzIiwicmVzb3VyY2UiLCJjb25jYXQiLCJqb2luIiwibWFuaWZlc3QiLCJwYXRoIiwidXNlclBhY2thZ2VzIiwiZnMiLCJleGlzdHNTeW5jIiwicHVzaCIsIndyaXRlRmlsZVN5bmMiLCJjb21wcmVzcyIsInByb2R1Y3Rpb24iLCJjbWRSZWJ1aWxkTmVlZGVkIiwiY3Vyc29yVG8iLCJwcm9jZXNzIiwic3Rkb3V0IiwibWUiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsInBhcm1zIiwidmVyYm9zZSIsInByb2ZpbGUiLCJlbnZpcm9ubWVudCIsInNlbmNoYUNtZEFzeW5jIiwiZXJyb3IiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7O0FBRUE7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOztBQUNBOztJQUFZQSxROzs7Ozs7Ozs7O0FBUFosSUFBTUMsUUFBUUMsUUFBUSxPQUFSLENBQWQ7QUFDQSxJQUFNQyxPQUFPRCxRQUFRLFdBQVIsQ0FBYjs7QUFPQSxJQUFJRSxXQUFKO0FBQ0EsSUFBSUYsUUFBUSxJQUFSLEVBQWNHLFFBQWQsTUFBNEIsUUFBaEMsRUFBMEM7QUFDeENEO0FBQ0QsQ0FGRCxNQUdLO0FBQ0hBO0FBQ0Q7O0FBRUQsSUFBSUUsTUFBU0wsTUFBTU0sS0FBTixDQUFZSCxNQUFaLENBQVQsc0JBQUo7O0lBRU1JLFU7QUFFSixzQkFBWUMsT0FBWixFQUFxQjtBQUFBOztBQUNuQixTQUFLQyxVQUFMLEdBQWtCRCxRQUFRQyxVQUExQjtBQUNBLFNBQUtDLE9BQUwsR0FBZUYsUUFBUUUsT0FBdkI7QUFDQSxTQUFLQyxNQUFMLEdBQWNILFFBQVFJLFVBQXRCO0FBQ0EsU0FBS0MsS0FBTCxHQUFhTCxRQUFRSyxLQUFyQjtBQUNBLFNBQUtDLFFBQUwsR0FBZ0JOLFFBQVFNLFFBQXhCO0FBQ0EsU0FBS0MsUUFBTCxHQUFnQlAsUUFBUU8sUUFBeEI7QUFDQSxTQUFLQyxXQUFMLEdBQW1CUixRQUFRUSxXQUEzQjtBQUNBLFNBQUtDLFlBQUwsR0FBb0JULFFBQVFTLFlBQTVCO0FBQ0Q7Ozs7bUNBRWM7QUFDYkMsY0FBUUMsR0FBUixDQUFZLGlCQUFaO0FBQ0EsVUFBSUMsVUFBUSxRQUFaO0FBQ0EsVUFBSUMsS0FBSjtBQUNBLFVBQUlDLFdBQVMsRUFBYjtBQUNBLFVBQUlDLGNBQVksRUFBaEI7QUFDQSxVQUFJQyxNQUFNLEVBQVY7QUFDQSxVQUFJQyxTQUFKO0FBQ0E7O0FBRUo7QUFDSUosY0FBUUEsVUFBVUQsWUFBWSxTQUFaLEdBQXdCLGNBQXhCLEdBQXlDLGdCQUFuRCxDQUFSOztBQUVBLFVBQUksQ0FBQyxLQUFLTCxRQUFWLEVBQW9CO0FBQ2xCLDBCQUFPLEtBQUtKLE1BQVo7QUFDQSwwQkFBTyxLQUFLQSxNQUFaO0FBQ0Q7O0FBRUQsVUFBSWUsV0FBSjtBQUNBLFVBQUksS0FBS1YsV0FBVCxFQUFzQjtBQUNwQixZQUFJVyxhQUFhLENBQUMsdUZBQUQsQ0FBakIsQ0FEb0IsQ0FDd0Y7QUFDNUc7QUFDQTtBQUNBO0FBQ0E7QUFMb0I7QUFBQTtBQUFBOztBQUFBO0FBTXBCLCtCQUFtQixLQUFLakIsT0FBeEIsOEhBQWlDO0FBQUEsZ0JBQXhCa0IsT0FBd0I7O0FBQy9CLGdCQUFNQyxPQUFPLEtBQUtaLFlBQUwsQ0FBa0JXLFFBQU9FLFFBQXpCLENBQWI7QUFDQSxnQkFBSUQsSUFBSixFQUFVRixhQUFhQSxXQUFXSSxNQUFYLENBQWtCRixJQUFsQixDQUFiO0FBQ1g7QUFUbUI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFVcEJILGFBQUtDLFdBQVdLLElBQVgsQ0FBZ0IsS0FBaEIsQ0FBTDtBQUNELE9BWEQsTUFXTztBQUNMTixhQUFLLHNCQUFMO0FBQ0Q7QUFDRCxVQUFNTyxXQUFXQyxlQUFLRixJQUFMLENBQVUsS0FBS3JCLE1BQWYsRUFBdUIsYUFBdkIsQ0FBakI7QUFDQTtBQUNBLFVBQU13QixlQUFlRCxlQUFLRixJQUFMLENBQVUsR0FBVixFQUFlLFdBQWYsRUFBNEIsVUFBNUIsQ0FBckI7QUFDQSxVQUFJSSxhQUFHQyxVQUFILENBQWNGLFlBQWQsQ0FBSixFQUFpQztBQUMvQlosb0JBQVllLElBQVosQ0FBaUJILFlBQWpCO0FBQ0Q7O0FBRUQsVUFBSUMsYUFBR0MsVUFBSCxDQUFjSCxlQUFLRixJQUFMLENBQVVSLEdBQVYsRUFBZSxLQUFmLENBQWQsQ0FBSixFQUEwQztBQUN4QztBQUNBRCxvQkFBWWUsSUFBWixDQUFpQkosZUFBS0YsSUFBTCxDQUFVLEtBQVYsRUFBaUIsVUFBakIsQ0FBakI7QUFDQVIsY0FBTVUsZUFBS0YsSUFBTCxDQUFVUixHQUFWLEVBQWUsS0FBZixDQUFOO0FBQ0Q7QUFDRCxVQUFJLENBQUMsS0FBS1QsUUFBVixFQUFvQjtBQUNsQnFCLHFCQUFHRyxhQUFILENBQWlCTCxlQUFLRixJQUFMLENBQVUsS0FBS3JCLE1BQWYsRUFBdUIsV0FBdkIsQ0FBakIsRUFBc0QseUJBQVMsRUFBRTZCLFVBQVUsS0FBS0MsVUFBakIsRUFBVCxDQUF0RCxFQUErRixNQUEvRjtBQUNBTCxxQkFBR0csYUFBSCxDQUFpQkwsZUFBS0YsSUFBTCxDQUFVLEtBQUtyQixNQUFmLEVBQXVCLHNCQUF2QixDQUFqQixFQUFpRSx3Q0FBakUsRUFBMkYsTUFBM0Y7QUFDQXlCLHFCQUFHRyxhQUFILENBQWlCTCxlQUFLRixJQUFMLENBQVUsS0FBS3JCLE1BQWYsRUFBdUIsVUFBdkIsQ0FBakIsRUFBcUQsOEJBQWMsRUFBRVUsWUFBRixFQUFTQyxrQkFBVCxFQUFtQkYsZ0JBQW5CLEVBQTRCSyxvQkFBNUIsRUFBdUNGLHdCQUF2QyxFQUFkLENBQXJELEVBQTBILE1BQTFIO0FBQ0FhLHFCQUFHRyxhQUFILENBQWlCTCxlQUFLRixJQUFMLENBQVUsS0FBS3JCLE1BQWYsRUFBdUIsZ0JBQXZCLENBQWpCLEVBQTJELG9DQUFvQmEsR0FBcEIsRUFBeUJELFdBQXpCLEVBQXNDLEtBQUtaLE1BQTNDLENBQTNELEVBQStHLE1BQS9HO0FBQ0Q7QUFDRCxVQUFJK0IsbUJBQW1CLEtBQXZCO0FBQ0EsVUFBSSxLQUFLVCxRQUFMLEtBQWtCLElBQWxCLElBQTBCUCxPQUFPLEtBQUtPLFFBQTFDLEVBQW9EO0FBQ2xEO0FBQ0EsYUFBS0EsUUFBTCxHQUFnQlAsRUFBaEI7QUFDQTtBQUNBM0IsaUJBQVM0QyxRQUFULENBQWtCQyxRQUFRQyxNQUExQixFQUFrQyxDQUFsQyxFQUFxQzNCLFFBQVFDLEdBQVIsQ0FBWWQsTUFBTSxnQkFBTixHQUF5QixLQUFLVyxXQUExQztBQUNyQ29CLHFCQUFHRyxhQUFILENBQWlCTixRQUFqQixFQUEyQlAsRUFBM0IsRUFBK0IsTUFBL0I7QUFDQWdCLDJCQUFtQixJQUFuQjtBQUNBM0MsaUJBQVM0QyxRQUFULENBQWtCQyxRQUFRQyxNQUExQixFQUFrQyxDQUFsQyxFQUFxQzNCLFFBQVFDLEdBQVIsQ0FBWWQseUNBQXNDLEtBQUtNLE1BQTNDLENBQVo7QUFDdEM7O0FBRUQsVUFBSW1DLEtBQUssSUFBVDtBQUNBLGFBQU8sSUFBSUMsT0FBSjtBQUFBLDJFQUFZLGlCQUFlQyxPQUFmLEVBQXdCQyxNQUF4QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDYkMsdUJBRGEsR0FDTCxDQUFDLEtBQUQsRUFBTyxPQUFQLENBREs7O0FBRWpCLHNCQUFJSixHQUFHSyxPQUFILElBQWMsS0FBbEIsRUFBeUI7QUFDdkJqQyw0QkFBUUMsR0FBUixDQUFlZCxHQUFmLHVDQUFtRHlDLEdBQUdNLE9BQXRELFNBQWlFTixHQUFHTyxXQUFwRTtBQUNEO0FBSmdCOztBQU1mbkMsMEJBQVFDLEdBQVIsQ0FBZWQsR0FBZjtBQU5lO0FBQUEseUJBT1RILEtBQUtvRCxjQUFMLENBQW9CSixLQUFwQixFQUEyQkosR0FBR25DLE1BQTlCLEVBQXNDbUMsR0FBR0ssT0FBekMsQ0FQUzs7QUFBQTtBQVFmakMsMEJBQVFDLEdBQVIsQ0FBZWQsR0FBZjs7QUFFQTJDLDBCQUFRLENBQVI7QUFWZTtBQUFBOztBQUFBO0FBQUE7QUFBQTs7QUFZZkMseUJBQU8sRUFBQ00sa0JBQUQsRUFBUDs7QUFaZTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxTQUFaOztBQUFBO0FBQUE7QUFBQTtBQUFBLFVBQVA7O0FBbUJBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdKOztBQTJCRzs7Ozs7O0FBSUgzQixPQUFPNEIsT0FBUCxHQUFpQmpELFVBQWpCIiwiZmlsZSI6ImJ1aWxkQXN5bmMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBjaGFsayA9IHJlcXVpcmUoJ2NoYWxrJyk7XG5jb25zdCB1dGlsID0gcmVxdWlyZSgnLi91dGlsLmpzJylcbmltcG9ydCB7IHN5bmMgYXMgcmltcmFmIH0gZnJvbSAncmltcmFmJztcbmltcG9ydCB7IHN5bmMgYXMgbWtkaXJwIH0gZnJvbSAnbWtkaXJwJztcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IGZzIGZyb20gJ2ZzJztcbmltcG9ydCB7IGJ1aWxkWE1MLCBjcmVhdGVBcHBKc29uLCBjcmVhdGVXb3Jrc3BhY2VKc29uLCBjcmVhdGVKU0RPTUVudmlyb25tZW50IH0gZnJvbSAnLi9hcnRpZmFjdHMnO1xuaW1wb3J0ICogYXMgcmVhZGxpbmUgZnJvbSAncmVhZGxpbmUnXG52YXIgcHJlZml4ID0gYGBcbmlmIChyZXF1aXJlKCdvcycpLnBsYXRmb3JtKCkgPT0gJ2RhcndpbicpIHtcbiAgcHJlZml4ID0gYOKEuSDvvaJleHTvvaM6YFxufVxuZWxzZSB7XG4gIHByZWZpeCA9IGBpIFtleHRdOmBcbn1cblxudmFyIGFwcCA9IGAke2NoYWxrLmdyZWVuKHByZWZpeCl9IGV4dC1idWlsZC1hc3luYzpgO1xuXG5jbGFzcyBidWlsZEFzeW5jIHtcblxuICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgdGhpcy5pc1dlYnBhY2s0ID0gb3B0aW9ucy5pc1dlYnBhY2s0XG4gICAgdGhpcy5tb2R1bGVzID0gb3B0aW9ucy5tb2R1bGVzXG4gICAgdGhpcy5vdXRwdXQgPSBvcHRpb25zLm91dHB1dFBhdGhcbiAgICB0aGlzLmJ1aWxkID0gb3B0aW9ucy5idWlsZFxuICAgIHRoaXMuY2FsbGJhY2sgPSBvcHRpb25zLmNhbGxiYWNrXG4gICAgdGhpcy53YXRjaGluZyA9IG9wdGlvbnMud2F0Y2hpbmdcbiAgICB0aGlzLnRyZWVTaGFraW5nID0gb3B0aW9ucy50cmVlU2hha2luZ1xuICAgIHRoaXMuZGVwZW5kZW5jaWVzID0gb3B0aW9ucy5kZXBlbmRlbmNpZXNcbiAgfVxuXG4gIGV4ZWN1dGVBc3luYygpIHtcbiAgICBjb25zb2xlLmxvZygnaW4gZXhlY3V0ZUFzeW5jJylcbiAgICB2YXIgdG9vbGtpdD0nbW9kZXJuJ1xuICAgIHZhciB0aGVtZVxuICAgIHZhciBwYWNrYWdlcz1bXVxuICAgIHZhciBwYWNrYWdlRGlycz1bXVxuICAgIHZhciBzZGsgPSAnJ1xuICAgIHZhciBvdmVycmlkZXNcbiAgICAvLywgY2FsbGJhY2t9XG5cbi8vICAgIGxldCBzZW5jaGEgPSB0aGlzLl9nZXRTZW5jaENtZFBhdGgoKTtcbiAgICB0aGVtZSA9IHRoZW1lIHx8ICh0b29sa2l0ID09PSAnY2xhc3NpYycgPyAndGhlbWUtdHJpdG9uJyA6ICd0aGVtZS1tYXRlcmlhbCcpO1xuXG4gICAgaWYgKCF0aGlzLndhdGNoaW5nKSB7XG4gICAgICByaW1yYWYodGhpcy5vdXRwdXQpO1xuICAgICAgbWtkaXJwKHRoaXMub3V0cHV0KTtcbiAgICB9XG5cbiAgICBsZXQganM7XG4gICAgaWYgKHRoaXMudHJlZVNoYWtpbmcpIHtcbiAgICAgIGxldCBzdGF0ZW1lbnRzID0gWydFeHQucmVxdWlyZShbXCJFeHQuYXBwLkFwcGxpY2F0aW9uXCIsIFwiRXh0LkNvbXBvbmVudFwiLCBcIkV4dC5XaWRnZXRcIiwgXCJFeHQubGF5b3V0LkZpdFwiXSknXTsgLy8gZm9yIHNvbWUgcmVhc29uIGNvbW1hbmQgZG9lc24ndCBsb2FkIGNvbXBvbmVudCB3aGVuIG9ubHkgcGFuZWwgaXMgcmVxdWlyZWRcbiAgICAgIC8vIGlmIChwYWNrYWdlcy5pbmRleE9mKCdyZWFjdG8nKSAhPT0gLTEpIHtcbiAgICAgIC8vICAgc3RhdGVtZW50cy5wdXNoKCdFeHQucmVxdWlyZShcIkV4dC5yZWFjdC5SZW5kZXJlckNlbGxcIiknKTtcbiAgICAgIC8vIH1cbiAgICAgIC8vbWpnXG4gICAgICBmb3IgKGxldCBtb2R1bGUgb2YgdGhpcy5tb2R1bGVzKSB7XG4gICAgICAgIGNvbnN0IGRlcHMgPSB0aGlzLmRlcGVuZGVuY2llc1ttb2R1bGUucmVzb3VyY2VdO1xuICAgICAgICBpZiAoZGVwcykgc3RhdGVtZW50cyA9IHN0YXRlbWVudHMuY29uY2F0KGRlcHMpO1xuICAgICAgfVxuICAgICAganMgPSBzdGF0ZW1lbnRzLmpvaW4oJztcXG4nKTtcbiAgICB9IGVsc2Uge1xuICAgICAganMgPSAnRXh0LnJlcXVpcmUoXCJFeHQuKlwiKSc7XG4gICAgfVxuICAgIGNvbnN0IG1hbmlmZXN0ID0gcGF0aC5qb2luKHRoaXMub3V0cHV0LCAnbWFuaWZlc3QuanMnKTtcbiAgICAvLyBhZGQgZXh0LXJlYWN0L3BhY2thZ2VzIGF1dG9tYXRpY2FsbHkgaWYgcHJlc2VudFxuICAgIGNvbnN0IHVzZXJQYWNrYWdlcyA9IHBhdGguam9pbignLicsICdleHQtcmVhY3QnLCAncGFja2FnZXMnKTtcbiAgICBpZiAoZnMuZXhpc3RzU3luYyh1c2VyUGFja2FnZXMpKSB7XG4gICAgICBwYWNrYWdlRGlycy5wdXNoKHVzZXJQYWNrYWdlcylcbiAgICB9XG5cbiAgICBpZiAoZnMuZXhpc3RzU3luYyhwYXRoLmpvaW4oc2RrLCAnZXh0JykpKSB7XG4gICAgICAvLyBsb2NhbCBjaGVja291dCBvZiB0aGUgU0RLIHJlcG9cbiAgICAgIHBhY2thZ2VEaXJzLnB1c2gocGF0aC5qb2luKCdleHQnLCAncGFja2FnZXMnKSk7XG4gICAgICBzZGsgPSBwYXRoLmpvaW4oc2RrLCAnZXh0Jyk7XG4gICAgfVxuICAgIGlmICghdGhpcy53YXRjaGluZykge1xuICAgICAgZnMud3JpdGVGaWxlU3luYyhwYXRoLmpvaW4odGhpcy5vdXRwdXQsICdidWlsZC54bWwnKSwgYnVpbGRYTUwoeyBjb21wcmVzczogdGhpcy5wcm9kdWN0aW9uIH0pLCAndXRmOCcpO1xuICAgICAgZnMud3JpdGVGaWxlU3luYyhwYXRoLmpvaW4odGhpcy5vdXRwdXQsICdqc2RvbS1lbnZpcm9ubWVudC5qcycpLCBjcmVhdGVKU0RPTUVudmlyb25tZW50KCksICd1dGY4Jyk7XG4gICAgICBmcy53cml0ZUZpbGVTeW5jKHBhdGguam9pbih0aGlzLm91dHB1dCwgJ2FwcC5qc29uJyksIGNyZWF0ZUFwcEpzb24oeyB0aGVtZSwgcGFja2FnZXMsIHRvb2xraXQsIG92ZXJyaWRlcywgcGFja2FnZURpcnMgfSksICd1dGY4Jyk7XG4gICAgICBmcy53cml0ZUZpbGVTeW5jKHBhdGguam9pbih0aGlzLm91dHB1dCwgJ3dvcmtzcGFjZS5qc29uJyksIGNyZWF0ZVdvcmtzcGFjZUpzb24oc2RrLCBwYWNrYWdlRGlycywgdGhpcy5vdXRwdXQpLCAndXRmOCcpO1xuICAgIH1cbiAgICBsZXQgY21kUmVidWlsZE5lZWRlZCA9IGZhbHNlO1xuICAgIGlmICh0aGlzLm1hbmlmZXN0ID09PSBudWxsIHx8IGpzICE9PSB0aGlzLm1hbmlmZXN0KSB7XG4gICAgICAvLyBPbmx5IHdyaXRlIG1hbmlmZXN0IGlmIGl0IGRpZmZlcnMgZnJvbSB0aGUgbGFzdCBydW4uICBUaGlzIHByZXZlbnRzIHVubmVjZXNzYXJ5IGNtZCByZWJ1aWxkcy5cbiAgICAgIHRoaXMubWFuaWZlc3QgPSBqcztcbiAgICAgIC8vcmVhZGxpbmUuY3Vyc29yVG8ocHJvY2Vzcy5zdGRvdXQsIDApO2NvbnNvbGUubG9nKGFwcCArIGpzKVxuICAgICAgcmVhZGxpbmUuY3Vyc29yVG8ocHJvY2Vzcy5zdGRvdXQsIDApO2NvbnNvbGUubG9nKGFwcCArICd0cmVlIHNoYWtpbmc6ICcgKyB0aGlzLnRyZWVTaGFraW5nKVxuICAgICAgZnMud3JpdGVGaWxlU3luYyhtYW5pZmVzdCwganMsICd1dGY4Jyk7XG4gICAgICBjbWRSZWJ1aWxkTmVlZGVkID0gdHJ1ZTtcbiAgICAgIHJlYWRsaW5lLmN1cnNvclRvKHByb2Nlc3Muc3Rkb3V0LCAwKTtjb25zb2xlLmxvZyhhcHAgKyBgYnVpbGRpbmcgRXh0UmVhY3QgYnVuZGxlIGF0OiAke3RoaXMub3V0cHV0fWApXG4gICAgfVxuXG4gICAgdmFyIG1lID0gdGhpc1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShhc3luYyBmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIHZhciBwYXJtcyA9IFsnYW50Jywnd2F0Y2gnXVxuICAgICAgaWYgKG1lLnZlcmJvc2UgPT0gJ3llcycpIHtcbiAgICAgICAgY29uc29sZS5sb2coYCR7YXBwfSBwYXNzaW5nIHRvICdzZW5jaGEgYXBwIGJ1aWxkICR7bWUucHJvZmlsZX0gJHttZS5lbnZpcm9ubWVudH0nYClcbiAgICAgIH1cbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGAke2FwcH0gcGFzc2luZyB0byAnc2VuY2hhIGFudCB3YXRjaCdgKVxuICAgICAgICBhd2FpdCB1dGlsLnNlbmNoYUNtZEFzeW5jKHBhcm1zLCBtZS5vdXRwdXQsIG1lLnZlcmJvc2UpXG4gICAgICAgIGNvbnNvbGUubG9nKGAke2FwcH0gYWZ0ZXIgcGFzc2luZyB0byAnc2VuY2hhIGFudCB3YXRjaCdgKVxuXG4gICAgICAgIHJlc29sdmUoMCk7XG4gICAgICB9IGNhdGNoKGVycikge1xuICAgICAgICByZWplY3Qoe2Vycm9yOiBlcnJ9KVxuICAgICAgfVxuICAgIH0pXG5cblxuXG5cbiAgICAvLyByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIC8vICAgdGhpcy5vbkJ1aWxkRmFpbCA9IHJlamVjdDtcbiAgICAvLyAgIHRoaXMub25CdWlsZFN1Y2Nlc3MgPSByZXNvbHZlO1xuICAgIC8vICAgY21kRXJyb3JzID0gW107XG4gICAgICBcbiAgICAvLyAgIGNvbnN0IG9uQnVpbGREb25lID0gKCkgPT4ge1xuICAgIC8vICAgICBpZiAoY21kRXJyb3JzLmxlbmd0aCkge1xuICAgIC8vICAgICAgIHRoaXMub25CdWlsZEZhaWwobmV3IEVycm9yKGNtZEVycm9ycy5qb2luKFwiXCIpKSk7XG4gICAgLy8gICAgIH0gZWxzZSB7XG4gICAgLy8gICAgICAgdGhpcy5vbkJ1aWxkU3VjY2VzcygpO1xuICAgIC8vICAgICB9XG4gICAgLy8gICB9XG5cblxuXG4gICAgLy8gICAvL2lmICghaXNXZWJwYWNrNCkge1xuICAgIC8vICAgICBpZiAodGhpcy53YXRjaCkge1xuICAgIC8vICAgICAgIGlmICghd2F0Y2hpbmcpIHtcbiAgICAvLyAgICAgICAgIHdhdGNoaW5nID0gZ2F0aGVyRXJyb3JzKGZvcmsoc2VuY2hhLCBbJ2FudCcsICd3YXRjaCddLCB7IGN3ZDogb3V0cHV0LCBzaWxlbnQ6IHRydWUgfSkpO1xuICAgIC8vICAgICAgICAgcmVhZGxpbmUuY3Vyc29yVG8ocHJvY2Vzcy5zdGRvdXQsIDApO2NvbnNvbGUubG9nKGFwcCArICdzZW5jaGEgYW50IHdhdGNoJylcbiAgICAvLyAgICAgICAgIHdhdGNoaW5nLnN0ZGVyci5waXBlKHByb2Nlc3Muc3RkZXJyKTtcbiAgICAvLyAgICAgICAgIHdhdGNoaW5nLnN0ZG91dC5waXBlKHByb2Nlc3Muc3Rkb3V0KTtcbiAgICAvLyAgICAgICAgIHdhdGNoaW5nLnN0ZG91dC5vbignZGF0YScsIGRhdGEgPT4ge1xuICAgIC8vICAgICAgICAgICBpZiAoZGF0YSAmJiBkYXRhLnRvU3RyaW5nKCkubWF0Y2goL1dhaXRpbmcgZm9yIGNoYW5nZXNcXC5cXC5cXC4vKSkge1xuICAgIC8vICAgICAgICAgICAgIG9uQnVpbGREb25lKClcbiAgICAvLyAgICAgICAgICAgfVxuICAgIC8vICAgICAgICAgfSlcbiAgICAvLyAgICAgICAgIHdhdGNoaW5nLm9uKCdleGl0Jywgb25CdWlsZERvbmUpXG4gICAgLy8gICAgICAgfVxuICAgIC8vICAgICAgIGlmICghY21kUmVidWlsZE5lZWRlZCkge1xuICAgIC8vICAgICAgICAgcmVhZGxpbmUuY3Vyc29yVG8ocHJvY2Vzcy5zdGRvdXQsIDApO2NvbnNvbGUubG9nKGFwcCArICdFeHQgcmVidWlsZCBOT1QgbmVlZGVkJylcbiAgICAvLyAgICAgICAgIG9uQnVpbGREb25lKClcbiAgICAvLyAgICAgICB9XG4gICAgLy8gICAgICAgZWxzZSB7XG4gICAgLy8gICAgICAgICByZWFkbGluZS5jdXJzb3JUbyhwcm9jZXNzLnN0ZG91dCwgMCk7Y29uc29sZS5sb2coYXBwICsgJ0V4dCByZWJ1aWxkIElTIG5lZWRlZCcpXG4gICAgLy8gICAgICAgfVxuICAgIC8vICAgICB9IFxuICAgIC8vICAgICBlbHNlIHtcbiAgICAvLyAgICAgICBjb25zdCBidWlsZCA9IGdhdGhlckVycm9ycyhmb3JrKHNlbmNoYSwgWydhbnQnLCAnYnVpbGQnXSwgeyBzdGRpbzogJ2luaGVyaXQnLCBlbmNvZGluZzogJ3V0Zi04JywgY3dkOiBvdXRwdXQsIHNpbGVudDogZmFsc2UgfSkpO1xuICAgIC8vICAgICAgIHJlYWRsaW5lLmN1cnNvclRvKHByb2Nlc3Muc3Rkb3V0LCAwKTtjb25zb2xlLmxvZyhhcHAgKyAnc2VuY2hhIGFudCBidWlsZCcpXG4gICAgLy8gICAgICAgaWYoYnVpbGQuc3Rkb3V0KSB7IGJ1aWxkLnN0ZG91dC5waXBlKHByb2Nlc3Muc3Rkb3V0KSB9XG4gICAgLy8gICAgICAgaWYoYnVpbGQuc3RkZXJyKSB7IGJ1aWxkLnN0ZGVyci5waXBlKHByb2Nlc3Muc3RkZXJyKSB9XG4gICAgLy8gICAgICAgYnVpbGQub24oJ2V4aXQnLCBvbkJ1aWxkRG9uZSk7XG4gICAgLy8gICAgIH1cbiAgICAvLyAgIC8vfVxuXG5cbi8vICAgIH0pO1xuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cbiAgfVxuXG5cbn1cbm1vZHVsZS5leHBvcnRzID0gYnVpbGRBc3luYyJdfQ==