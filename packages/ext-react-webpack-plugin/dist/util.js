'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var npmScope = '@sencha';
var chalk = require('chalk');
var fs = require('fs-extra');
//var json = require('comment-json');
//const sencha = require(`${npmScope}/cmd`)

var sencha = require('@extjs/sencha-cmd');

var spawnSync = require('child_process').spawnSync;
var spawn = require('child_process').spawn;
var crossSpawn = require('cross-spawn');

var prefix = '';
if (require('os').platform() == 'darwin') {
  prefix = '\u2139 \uFF62ext\uFF63:';
} else {
  prefix = 'i [ext]:';
}
var app = chalk.green(prefix) + ' ext-build-util:';
var DEFAULT_SUBSTRS = ['[ERR]', '[WRN]', '[INF] Processing', "[INF] Server", "[INF] Writing content", "[INF] Loading Build", "[INF] Waiting", "[LOG] Fashion waiting"];

exports.senchaCmd = function (parms) {
  process.stdout.cursorTo(0);console.log(app + 'started - sencha ' + parms.toString().replace(/,/g, " ") + '\n');
  spawnSync(sencha, parms, { stdio: 'inherit', encoding: 'utf-8' });
  process.stdout.cursorTo(0);console.log(app + 'completed - sencha ' + parms.toString().replace(/,/g, " "));
};

exports.senchaCmdAsync = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(parms, output, verbose) {
    var substrings = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : DEFAULT_SUBSTRS;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.log('here');
            spawnPromise(sencha, parms, { stdio: 'pipe', encoding: 'utf-8', cwd: output }, verbose, substrings).then(function () {
              console.log('after spawnPromise');
              return;
            });

          case 2:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var spawnPromise = function spawnPromise(command, args, options, verbose, substrings) {
  var noErrors = true;
  var child = void 0;
  var promise = new Promise(function (resolve, reject) {

    child = crossSpawn(command, args, options);
    child.on('close', function (code, signal) {
      if (code === 0) {
        if (noErrors) {
          resolve({ code: code, signal: signal });
        } else {
          reject('ext-build errors');
        }
      } else {
        reject('ext-build errors...');
      }
    });
    child.on('error', function (error) {
      reject(error);
    });
    if (child.stdout) {
      child.stdout.on('data', function (data) {
        var str = data.toString();
        str = str.replace(/\r?\n|\r/g, " ");

        if (data && data.toString().match(/Waiting for changes\.\.\./)) {
          resolve({});
        }

        if (verbose == 'yes') {
          console.log('' + app + str);
        } else {
          if (substrings.some(function (v) {
            return data.indexOf(v) >= 0;
          })) {
            str = str.replace("[INF]", "");
            str = str.replace(process.cwd(), '');
            if (str.includes("[ERR]")) {
              var err = '' + chalk.red("[ERR]");
              str = str.replace("[ERR]", err);
              noErrors = false;
            }
            console.log('' + app + str);
          }
          // else {//nothing}
        }
      });
    } else {
      console.log(app + ' ' + chalk.red('[ERR]') + ' no stdout');
    }
    if (child.stderr) {
      child.stderr.on('data', function (data) {
        var str = data.toString();
        var s = str.replace(/\r?\n|\r/g, " ");
        var strJavaOpts = "Picked up _JAVA_OPTIONS";
        var includes = s.includes(strJavaOpts);
        if (!includes) {
          console.log(app + ' ' + chalk.black("[ERR]") + ' ' + s);
        }
      });
    } else {
      console.log(app + ' ' + chalk.red('[ERR]') + ' no stderr');
    }
  });
  promise.child = child;
  return promise;
};

//exports.err = function err(s) { return chalk.red('[ERR] ') + s }
//exports.inf = function inf(s) { return chalk.green('[INF] ') + s }
//exports.wrn = function err(s) { return chalk.yellow('[WRN] ') + s }
exports.errLog = function err(s) {
  console.log(chalk.red('[ERR] ') + s);
};
exports.infLog = function inf(s) {
  console.log(chalk.green('[INF] ') + s);
};
exports.wrnLog = function err(s) {
  console.log(chalk.yellow('[WRN] ') + s);
};
//exports.dbgLog = function dbgLog(s) { if (debug) console.log(chalk.blue('[DBG] ') + s) }
exports.dbgLog = function dbgLog(s) {};
exports.err = function err(s) {
  return chalk.red('[ERR] ') + s;
};
exports.inf = function inf(s) {
  return chalk.green('[INF] ') + s;
};
exports.wrn = function err(s) {
  return chalk.yellow('[WRN] ') + s;
};
exports.dbg = function err(s) {
  return chalk.blue('[DBG] ') + s;
};

var errThrow = function err(s) {
  throw chalk.red('[ERR] ') + s;
};
exports.errThrow = errThrow;
exports.dbgThrow = function err(s) {
  throw chalk.blue('[ERR] ') + s;
};

exports.getAppName = function getAppName(CurrWorkingDir) {
  var appJsonFileName = getAppJson(CurrWorkingDir);
  if (appJsonFileName == '') {
    throw 'Not a Sencha Cmd project - no app.json found';
  }
  var objAppJson = json.parse(fs.readFileSync(appJsonFileName).toString());
  var appName = objAppJson.name;
  return appName;
};

function getAppJson(CurrWorkingDir) {
  var myStringArray = CurrWorkingDir.split('/');
  var arrayLength = myStringArray.length;
  var appJsonFile = '';
  for (var j = arrayLength; j > 0; j--) {
    var dir = '';
    for (var i = 0; i < j; i++) {
      if (myStringArray[i] != '') {
        dir = dir + '/' + myStringArray[i];
      }
    }
    // var workspaceJson = dir + '/' + 'workspace.json'
    // if (fs.existsSync(workspaceJson)) {
    // 	console.log('yes ' + workspaceJson)
    // }
    var appJson = dir + '/' + 'app.json';
    //		console.log(appJson)
    if (fs.existsSync(appJson)) {
      //			console.log('here')
      appJsonFile = appJson;
    }
  }
  return appJsonFile;
}

exports.getSenchaCmdPath = function getSenchaCmdPath(toPath, path) {
  pathVar = process.env.PATH;
  var myStringArray = pathVar.split(':');
  var arrayLength = myStringArray.length;
  var pathSenchaCmd = '';
  for (var i = 0; i < arrayLength; i++) {
    var str = myStringArray[i];
    var n = str.indexOf("Sencha/Cmd");
    if (n != -1) {
      pathSenchaCmd = str;
    }
  }
  //var other = '/plugins/ext/current'
  //console.log(pathSenchaCmd + other)
  return pathSenchaCmd;
};

exports.handleOutput = function (child) {
  child.on('exit', function (code, signal) {
    console.log('child process exited with code ' + code + ' and signal ' + signal);
  });
  child.stdout.on('data', function (data) {
    var substrings = DEFAULT_SUBSTRS;
    if (substrings.some(function (v) {
      return data.indexOf(v) >= 0;
    })) {
      var str = data.toString();
      var s = str.replace(/\r?\n|\r/g, " ");
      console.log('' + s);
    }
  });
  child.stderr.on('data', function (data) {
    console.error('E:' + data);
  });
  return child;
};

// async executeAsync2(parms) {
//   return new Promise(function(resolve, reject) {
//     var child = spawn(sencha, parms)
//     child.on('exit', function (code, signal) {
//       resolve(0) 
//     })
//     child.stdout.on('data', (data) => {
//       var substrings = ["[INF] Writing xcontent", '[ERR]', '[WRN]', '[INF] Processing', "[INF] Server", "[INF] Loading Build", "[INF] Waiting", "[LOG] Fashion waiting"]
//       if (substrings.some(function(v) { return data.indexOf(v) >= 0; })) { 
//         var str = data.toString()
//         var s = str.replace(/\r?\n|\r/g, " ")
//         var s2 = s.replace("[INF]", "")
//         console.log(`${app} ${s2}`) 
//       }
//     })
//     child.stderr.on('data', (data) => {
//       var str = data.toString()
//       var s = str.replace(/\r?\n|\r/g, " ")
//       console.log(`${app} ${chalk.red("[ERR]")} ${s}`) 
//     })
//   })
// }


// const spawn = require('child_process').spawn;
// var spawn = require('child-process-promise').spawn;
// function executeCommand(cmd, args) {
//     var promise = spawn(cmd, args);

//     var childProcess = promise.childProcess;

//     console.log('[spawn] childProcess.pid: ', childProcess.pid);
//     childProcess.stdout.on('data', function (data) {
//         console.log('[spawn] stdout: ', data.toString());
//     });
//     childProcess.stderr.on('data', function (data) {
//         console.log('[spawn] stderr: ', data.toString());
//     });
//     return promise;
// }

// exports.senchaCmd2 = (parms) => {
//   process.stdout.cursorTo(0);console.log(app + 'started - sencha ' + parms.toString().replace(/,/g , " ") + '\n')
//   await executeCommand(sencha, parms)
//   process.stdout.cursorTo(0);console.log(app + 'completed - sencha ' + parms.toString().replace(/,/g , " "))

// }


// async function executer() {
//     console.log('[MAIN] start');
//     await executeCommand('echo', ['info']);
//     console.log('[MAIN] end');
// }

// executer();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy91dGlsLmpzIl0sIm5hbWVzIjpbIm5wbVNjb3BlIiwiY2hhbGsiLCJyZXF1aXJlIiwiZnMiLCJzZW5jaGEiLCJzcGF3blN5bmMiLCJzcGF3biIsImNyb3NzU3Bhd24iLCJwcmVmaXgiLCJwbGF0Zm9ybSIsImFwcCIsImdyZWVuIiwiREVGQVVMVF9TVUJTVFJTIiwiZXhwb3J0cyIsInNlbmNoYUNtZCIsInBhcm1zIiwicHJvY2VzcyIsInN0ZG91dCIsImN1cnNvclRvIiwiY29uc29sZSIsImxvZyIsInRvU3RyaW5nIiwicmVwbGFjZSIsInN0ZGlvIiwiZW5jb2RpbmciLCJzZW5jaGFDbWRBc3luYyIsIm91dHB1dCIsInZlcmJvc2UiLCJzdWJzdHJpbmdzIiwic3Bhd25Qcm9taXNlIiwiY3dkIiwidGhlbiIsImNvbW1hbmQiLCJhcmdzIiwib3B0aW9ucyIsIm5vRXJyb3JzIiwiY2hpbGQiLCJwcm9taXNlIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJvbiIsImNvZGUiLCJzaWduYWwiLCJlcnJvciIsImRhdGEiLCJzdHIiLCJtYXRjaCIsInNvbWUiLCJ2IiwiaW5kZXhPZiIsImluY2x1ZGVzIiwiZXJyIiwicmVkIiwic3RkZXJyIiwicyIsInN0ckphdmFPcHRzIiwiYmxhY2siLCJlcnJMb2ciLCJpbmZMb2ciLCJpbmYiLCJ3cm5Mb2ciLCJ5ZWxsb3ciLCJkYmdMb2ciLCJ3cm4iLCJkYmciLCJibHVlIiwiZXJyVGhyb3ciLCJkYmdUaHJvdyIsImdldEFwcE5hbWUiLCJDdXJyV29ya2luZ0RpciIsImFwcEpzb25GaWxlTmFtZSIsImdldEFwcEpzb24iLCJvYmpBcHBKc29uIiwianNvbiIsInBhcnNlIiwicmVhZEZpbGVTeW5jIiwiYXBwTmFtZSIsIm5hbWUiLCJteVN0cmluZ0FycmF5Iiwic3BsaXQiLCJhcnJheUxlbmd0aCIsImxlbmd0aCIsImFwcEpzb25GaWxlIiwiaiIsImRpciIsImkiLCJhcHBKc29uIiwiZXhpc3RzU3luYyIsImdldFNlbmNoYUNtZFBhdGgiLCJ0b1BhdGgiLCJwYXRoIiwicGF0aFZhciIsImVudiIsIlBBVEgiLCJwYXRoU2VuY2hhQ21kIiwibiIsImhhbmRsZU91dHB1dCJdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLElBQU1BLFdBQVcsU0FBakI7QUFDQSxJQUFJQyxRQUFRQyxRQUFRLE9BQVIsQ0FBWjtBQUNBLElBQUlDLEtBQUtELFFBQVEsVUFBUixDQUFUO0FBQ0E7QUFDQTs7QUFFQSxJQUFNRSxTQUFTRiw0QkFBZjs7QUFFQSxJQUFNRyxZQUFZSCxRQUFRLGVBQVIsRUFBeUJHLFNBQTNDO0FBQ0EsSUFBTUMsUUFBUUosUUFBUSxlQUFSLEVBQXlCSSxLQUF2QztBQUNBLElBQU1DLGFBQWFMLFFBQVEsYUFBUixDQUFuQjs7QUFFQSxJQUFJTSxXQUFKO0FBQ0EsSUFBSU4sUUFBUSxJQUFSLEVBQWNPLFFBQWQsTUFBNEIsUUFBaEMsRUFBMEM7QUFDeENEO0FBQ0QsQ0FGRCxNQUdLO0FBQ0hBO0FBQ0Q7QUFDRCxJQUFNRSxNQUFTVCxNQUFNVSxLQUFOLENBQVlILE1BQVosQ0FBVCxxQkFBTjtBQUNBLElBQU1JLGtCQUFrQixDQUFDLE9BQUQsRUFBVSxPQUFWLEVBQW1CLGtCQUFuQixFQUF1QyxjQUF2QyxFQUF1RCx1QkFBdkQsRUFBZ0YscUJBQWhGLEVBQXVHLGVBQXZHLEVBQXdILHVCQUF4SCxDQUF4Qjs7QUFFQUMsUUFBUUMsU0FBUixHQUFvQixVQUFDQyxLQUFELEVBQVc7QUFDN0JDLFVBQVFDLE1BQVIsQ0FBZUMsUUFBZixDQUF3QixDQUF4QixFQUEyQkMsUUFBUUMsR0FBUixDQUFZVixNQUFNLG1CQUFOLEdBQTRCSyxNQUFNTSxRQUFOLEdBQWlCQyxPQUFqQixDQUF5QixJQUF6QixFQUFnQyxHQUFoQyxDQUE1QixHQUFtRSxJQUEvRTtBQUMzQmpCLFlBQVVELE1BQVYsRUFBa0JXLEtBQWxCLEVBQXlCLEVBQUVRLE9BQU8sU0FBVCxFQUFvQkMsVUFBVSxPQUE5QixFQUF6QjtBQUNBUixVQUFRQyxNQUFSLENBQWVD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SVQsSUFBSXhCLE9BQUosQ0FBWSxXQUFaLEVBQXlCLEdBQXpCLENBQVI7QUFDQUgsY0FBUUMsR0FBUixNQUFlbUMsQ0FBZjtBQUNEO0FBQ0YsR0FQRDtBQVFBbkIsUUFBTWtCLE1BQU4sQ0FBYWIsRUFBYixDQUFnQixNQUFoQixFQUF3QixVQUFDSSxJQUFELEVBQVU7QUFDaEMxQixZQUFReUIsS0FBUixRQUFtQkMsSUFBbkI7QUFDRCxHQUZEO0FBR0EsU0FBT1QsS0FBUDtBQUNELENBaEJEOztBQXdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBZ0JBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSIsImZpbGUiOiJ1dGlsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgbnBtU2NvcGUgPSAnQHNlbmNoYSdcbnZhciBjaGFsayA9IHJlcXVpcmUoJ2NoYWxrJyk7XG52YXIgZnMgPSByZXF1aXJlKCdmcy1leHRyYScpXG4vL3ZhciBqc29uID0gcmVxdWlyZSgnY29tbWVudC1qc29uJyk7XG4vL2NvbnN0IHNlbmNoYSA9IHJlcXVpcmUoYCR7bnBtU2NvcGV9L2NtZGApXG5cbmNvbnN0IHNlbmNoYSA9IHJlcXVpcmUoYEBleHRqcy9zZW5jaGEtY21kYClcblxuY29uc3Qgc3Bhd25TeW5jID0gcmVxdWlyZSgnY2hpbGRfcHJvY2VzcycpLnNwYXduU3luY1xuY29uc3Qgc3Bhd24gPSByZXF1aXJlKCdjaGlsZF9wcm9jZXNzJykuc3Bhd25cbmNvbnN0IGNyb3NzU3Bhd24gPSByZXF1aXJlKCdjcm9zcy1zcGF3bicpXG5cbnZhciBwcmVmaXggPSBgYFxuaWYgKHJlcXVpcmUoJ29zJykucGxhdGZvcm0oKSA9PSAnZGFyd2luJykge1xuICBwcmVmaXggPSBg4oS5IO+9omV4dO+9ozpgXG59XG5lbHNlIHtcbiAgcHJlZml4ID0gYGkgW2V4dF06YFxufVxuY29uc3QgYXBwID0gYCR7Y2hhbGsuZ3JlZW4ocHJlZml4KX0gZXh0LWJ1aWxkLXV0aWw6YFxuY29uc3QgREVGQVVMVF9TVUJTVFJTID0gWydbRVJSXScsICdbV1JOXScsICdbSU5GXSBQcm9jZXNzaW5nJywgXCJbSU5GXSBTZXJ2ZXJcIiwgXCJbSU5GXSBXcml0aW5nIGNvbnRlbnRcIiwgXCJbSU5GXSBMb2FkaW5nIEJ1aWxkXCIsIFwiW0lORl0gV2FpdGluZ1wiLCBcIltMT0ddIEZhc2hpb24gd2FpdGluZ1wiXTtcblxuZXhwb3J0cy5zZW5jaGFDbWQgPSAocGFybXMpID0+IHtcbiAgcHJvY2Vzcy5zdGRvdXQuY3Vyc29yVG8oMCk7Y29uc29sZS5sb2coYXBwICsgJ3N0YXJ0ZWQgLSBzZW5jaGEgJyArIHBhcm1zLnRvU3RyaW5nKCkucmVwbGFjZSgvLC9nICwgXCIgXCIpICsgJ1xcbicpXG4gIHNwYXduU3luYyhzZW5jaGEsIHBhcm1zLCB7IHN0ZGlvOiAnaW5oZXJpdCcsIGVuY29kaW5nOiAndXRmLTgnfSlcbiAgcHJvY2Vzcy5zdGRvdXQuY3Vyc29yVG8oMCk7Y29uc29sZS5sb2coYXBwICsgJ2NvbXBsZXRlZCAtIHNlbmNoYSAnICsgcGFybXMudG9TdHJpbmcoKS5yZXBsYWNlKC8sL2cgLCBcIiBcIikpXG59XG5cbmV4cG9ydHMuc2VuY2hhQ21kQXN5bmMgPSBhc3luYyAocGFybXMsIG91dHB1dCwgdmVyYm9zZSwgc3Vic3RyaW5ncyA9IERFRkFVTFRfU1VCU1RSUykgPT4ge1xuICBjb25zb2xlLmxvZygnaGVyZScpXG4gIHNwYXduUHJvbWlzZShzZW5jaGEsIHBhcm1zLCB7IHN0ZGlvOiAncGlwZScsIGVuY29kaW5nOiAndXRmLTgnLGN3ZDogb3V0cHV0IH0sIHZlcmJvc2UsIHN1YnN0cmluZ3MpIC50aGVuKCgpID0+IHtcbiAgICBjb25zb2xlLmxvZygnYWZ0ZXIgc3Bhd25Qcm9taXNlJylcbiAgICByZXR1cm5cbiAgfSlcbn1cblxuXG52YXIgc3Bhd25Qcm9taXNlID0gKGNvbW1hbmQsIGFyZ3MsIG9wdGlvbnMsIHZlcmJvc2UsIHN1YnN0cmluZ3MpID0+IHtcbiAgdmFyIG5vRXJyb3JzID0gdHJ1ZVxuICBsZXQgY2hpbGRcbiAgbGV0IHByb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cbiAgICBjaGlsZCA9IGNyb3NzU3Bhd24oXG4gICAgICBjb21tYW5kLCBcbiAgICAgIGFyZ3MsIFxuICAgICAgb3B0aW9uc1xuICAgIClcbiAgICBjaGlsZC5vbignY2xvc2UnLCAoY29kZSwgc2lnbmFsKSA9PiB7XG4gICAgICBpZihjb2RlID09PSAwKSB7XG4gICAgICAgIGlmIChub0Vycm9ycykge1xuICAgICAgICAgIHJlc29sdmUoe2NvZGUsIHNpZ25hbH0pXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgcmVqZWN0KCdleHQtYnVpbGQgZXJyb3JzJylcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHJlamVjdCgnZXh0LWJ1aWxkIGVycm9ycy4uLicpXG4gICAgICB9XG4gICAgfSlcbiAgICBjaGlsZC5vbignZXJyb3InLCAoZXJyb3IpID0+IHtcbiAgICAgIHJlamVjdChlcnJvcilcbiAgICB9KVxuICAgIGlmIChjaGlsZC5zdGRvdXQpIHtcbiAgICAgIGNoaWxkLnN0ZG91dC5vbignZGF0YScsIChkYXRhKSA9PiB7XG4gICAgICAgIHZhciBzdHIgPSBkYXRhLnRvU3RyaW5nKClcbiAgICAgICAgc3RyID0gc3RyLnJlcGxhY2UoL1xccj9cXG58XFxyL2csIFwiIFwiKVxuXG4gICAgICAgIGlmIChkYXRhICYmIGRhdGEudG9TdHJpbmcoKS5tYXRjaCgvV2FpdGluZyBmb3IgY2hhbmdlc1xcLlxcLlxcLi8pKSB7XG4gICAgICAgICAgcmVzb2x2ZSh7fSlcbiAgICAgICAgfVxuXG5cblxuICAgICAgICBpZih2ZXJib3NlID09ICd5ZXMnKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coYCR7YXBwfSR7c3RyfWApIFxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIGlmIChzdWJzdHJpbmdzLnNvbWUoZnVuY3Rpb24odikgeyByZXR1cm4gZGF0YS5pbmRleE9mKHYpID49IDA7IH0pKSB7IFxuICAgICAgICAgICAgc3RyID0gc3RyLnJlcGxhY2UoXCJbSU5GXVwiLCBcIlwiKVxuICAgICAgICAgICAgc3RyID0gc3RyLnJlcGxhY2UocHJvY2Vzcy5jd2QoKSwgJycpXG4gICAgICAgICAgICBpZiAoc3RyLmluY2x1ZGVzKFwiW0VSUl1cIikpIHtcbiAgICAgICAgICAgICAgY29uc3QgZXJyID0gYCR7Y2hhbGsucmVkKFwiW0VSUl1cIil9YFxuICAgICAgICAgICAgICBzdHIgPSBzdHIucmVwbGFjZShcIltFUlJdXCIsIGVycilcbiAgICAgICAgICAgICAgbm9FcnJvcnMgPSBmYWxzZVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc29sZS5sb2coYCR7YXBwfSR7c3RyfWApIFxuICAgICAgICAgIH1cbiAgICAgICAgICAvLyBlbHNlIHsvL25vdGhpbmd9XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgY29uc29sZS5sb2coYCR7YXBwfSAke2NoYWxrLnJlZCgnW0VSUl0nKX0gbm8gc3Rkb3V0YCkgXG4gICAgfVxuICAgIGlmIChjaGlsZC5zdGRlcnIpIHtcbiAgICAgIGNoaWxkLnN0ZGVyci5vbignZGF0YScsIChkYXRhKSA9PiB7XG4gICAgICAgIHZhciBzdHIgPSBkYXRhLnRvU3RyaW5nKClcbiAgICAgICAgdmFyIHMgPSBzdHIucmVwbGFjZSgvXFxyP1xcbnxcXHIvZywgXCIgXCIpXG4gICAgICAgIHZhciBzdHJKYXZhT3B0cyA9IFwiUGlja2VkIHVwIF9KQVZBX09QVElPTlNcIjtcbiAgICAgICAgdmFyIGluY2x1ZGVzID0gcy5pbmNsdWRlcyhzdHJKYXZhT3B0cylcbiAgICAgICAgaWYgKCFpbmNsdWRlcykge1xuICAgICAgICAgIGNvbnNvbGUubG9nKGAke2FwcH0gJHtjaGFsay5ibGFjayhcIltFUlJdXCIpfSAke3N9YClcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBjb25zb2xlLmxvZyhgJHthcHB9ICR7Y2hhbGsucmVkKCdbRVJSXScpfSBubyBzdGRlcnJgKSBcbiAgICB9XG4gIH0pO1xuICBwcm9taXNlLmNoaWxkID0gY2hpbGRcbiAgcmV0dXJuIHByb21pc2Vcbn1cblxuLy9leHBvcnRzLmVyciA9IGZ1bmN0aW9uIGVycihzKSB7IHJldHVybiBjaGFsay5yZWQoJ1tFUlJdICcpICsgcyB9XG4vL2V4cG9ydHMuaW5mID0gZnVuY3Rpb24gaW5mKHMpIHsgcmV0dXJuIGNoYWxrLmdyZWVuKCdbSU5GXSAnKSArIHMgfVxuLy9leHBvcnRzLndybiA9IGZ1bmN0aW9uIGVycihzKSB7IHJldHVybiBjaGFsay55ZWxsb3coJ1tXUk5dICcpICsgcyB9XG5leHBvcnRzLmVyckxvZyA9IGZ1bmN0aW9uIGVycihzKSB7IGNvbnNvbGUubG9nKGNoYWxrLnJlZCgnW0VSUl0gJykgKyBzKSB9XG5leHBvcnRzLmluZkxvZyA9IGZ1bmN0aW9uIGluZihzKSB7IGNvbnNvbGUubG9nKGNoYWxrLmdyZWVuKCdbSU5GXSAnKSArIHMpIH1cbmV4cG9ydHMud3JuTG9nID0gZnVuY3Rpb24gZXJyKHMpIHsgY29uc29sZS5sb2coY2hhbGsueWVsbG93KCdbV1JOXSAnKSArIHMpIH1cbi8vZXhwb3J0cy5kYmdMb2cgPSBmdW5jdGlvbiBkYmdMb2cocykgeyBpZiAoZGVidWcpIGNvbnNvbGUubG9nKGNoYWxrLmJsdWUoJ1tEQkddICcpICsgcykgfVxuZXhwb3J0cy5kYmdMb2cgPSBmdW5jdGlvbiBkYmdMb2cocykgeyAgfVxuZXhwb3J0cy5lcnIgPSBmdW5jdGlvbiBlcnIocykgeyByZXR1cm4gY2hhbGsucmVkKCdbRVJSXSAnKSArIHMgfVxuZXhwb3J0cy5pbmYgPSBmdW5jdGlvbiBpbmYocykgeyByZXR1cm4gY2hhbGsuZ3JlZW4oJ1tJTkZdICcpICsgcyB9XG5leHBvcnRzLndybiA9IGZ1bmN0aW9uIGVycihzKSB7IHJldHVybiBjaGFsay55ZWxsb3coJ1tXUk5dICcpICsgcyB9XG5leHBvcnRzLmRiZyA9IGZ1bmN0aW9uIGVycihzKSB7IHJldHVybiBjaGFsay5ibHVlKCdbREJHXSAnKSArIHMgfVxuXG52YXIgZXJyVGhyb3cgPSBmdW5jdGlvbiBlcnIocykgeyB0aHJvdyBjaGFsay5yZWQoJ1tFUlJdICcpICsgcyB9XG5leHBvcnRzLmVyclRocm93ID0gZXJyVGhyb3dcbmV4cG9ydHMuZGJnVGhyb3cgPSBmdW5jdGlvbiBlcnIocykgeyB0aHJvdyBjaGFsay5ibHVlKCdbRVJSXSAnKSArIHMgfVxuXG5leHBvcnRzLmdldEFwcE5hbWUgPSBmdW5jdGlvbiBnZXRBcHBOYW1lKEN1cnJXb3JraW5nRGlyKSB7XG5cdHZhciBhcHBKc29uRmlsZU5hbWUgPSBnZXRBcHBKc29uKEN1cnJXb3JraW5nRGlyKVxuXHRpZiAoYXBwSnNvbkZpbGVOYW1lID09ICcnKSB7XG5cdFx0dGhyb3cgJ05vdCBhIFNlbmNoYSBDbWQgcHJvamVjdCAtIG5vIGFwcC5qc29uIGZvdW5kJ1xuXHR9XG5cdHZhciBvYmpBcHBKc29uID0ganNvbi5wYXJzZShmcy5yZWFkRmlsZVN5bmMoYXBwSnNvbkZpbGVOYW1lKS50b1N0cmluZygpKTtcblx0dmFyIGFwcE5hbWUgPSBvYmpBcHBKc29uLm5hbWVcblx0cmV0dXJuIGFwcE5hbWVcbn1cblxuZnVuY3Rpb24gZ2V0QXBwSnNvbihDdXJyV29ya2luZ0Rpcikge1xuXHR2YXIgbXlTdHJpbmdBcnJheSA9IEN1cnJXb3JraW5nRGlyLnNwbGl0KCcvJylcblx0dmFyIGFycmF5TGVuZ3RoID0gbXlTdHJpbmdBcnJheS5sZW5ndGhcblx0dmFyIGFwcEpzb25GaWxlID0gJydcblx0Zm9yICh2YXIgaiA9IGFycmF5TGVuZ3RoOyBqID4gMDsgai0tKSB7XG5cdFx0dmFyIGRpciA9ICcnXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBqOyBpKyspIHtcblx0XHRcdGlmIChteVN0cmluZ0FycmF5W2ldIT0nJykge1xuXHRcdFx0XHRkaXIgPSBkaXIgKyAnLycgKyBteVN0cmluZ0FycmF5W2ldXG5cdFx0XHR9XG5cdFx0fVxuXHRcdC8vIHZhciB3b3Jrc3BhY2VKc29uID0gZGlyICsgJy8nICsgJ3dvcmtzcGFjZS5qc29uJ1xuXHRcdC8vIGlmIChmcy5leGlzdHNTeW5jKHdvcmtzcGFjZUpzb24pKSB7XG5cdFx0Ly8gXHRjb25zb2xlLmxvZygneWVzICcgKyB3b3Jrc3BhY2VKc29uKVxuXHRcdC8vIH1cblx0XHR2YXIgYXBwSnNvbiA9IGRpciArICcvJyArICdhcHAuanNvbidcbi8vXHRcdGNvbnNvbGUubG9nKGFwcEpzb24pXG5cdFx0aWYgKGZzLmV4aXN0c1N5bmMoYXBwSnNvbikpIHtcbi8vXHRcdFx0Y29uc29sZS5sb2coJ2hlcmUnKVxuXHRcdFx0YXBwSnNvbkZpbGUgPSBhcHBKc29uXG5cdFx0fVxuXHR9XG5cdHJldHVybiBhcHBKc29uRmlsZVxufVxuXG5leHBvcnRzLmdldFNlbmNoYUNtZFBhdGggPSBmdW5jdGlvbiBnZXRTZW5jaGFDbWRQYXRoKHRvUGF0aCwgcGF0aCkge1xuXHRwYXRoVmFyID0gcHJvY2Vzcy5lbnYuUEFUSFxuXHR2YXIgbXlTdHJpbmdBcnJheSA9IHBhdGhWYXIuc3BsaXQoJzonKVxuXHR2YXIgYXJyYXlMZW5ndGggPSBteVN0cmluZ0FycmF5Lmxlbmd0aFxuXHR2YXIgcGF0aFNlbmNoYUNtZCA9ICcnXG5cdGZvciAodmFyIGkgPSAwOyBpIDwgYXJyYXlMZW5ndGg7IGkrKykge1xuXHRcdHZhciBzdHIgPSBteVN0cmluZ0FycmF5W2ldXG5cdFx0dmFyIG4gPSBzdHIuaW5kZXhPZihcIlNlbmNoYS9DbWRcIik7XG5cdFx0aWYgKG4gIT0gLTEpIHtcblx0XHRcdHBhdGhTZW5jaGFDbWQgPSBzdHJcblx0XHR9XG5cdH1cblx0Ly92YXIgb3RoZXIgPSAnL3BsdWdpbnMvZXh0L2N1cnJlbnQnXG5cdC8vY29uc29sZS5sb2cocGF0aFNlbmNoYUNtZCArIG90aGVyKVxuXHRyZXR1cm4gcGF0aFNlbmNoYUNtZFxufVxuXG5leHBvcnRzLmhhbmRsZU91dHB1dCA9IChjaGlsZCkgPT4ge1xuICBjaGlsZC5vbignZXhpdCcsIGZ1bmN0aW9uIChjb2RlLCBzaWduYWwpIHtcbiAgICBjb25zb2xlLmxvZyhgY2hpbGQgcHJvY2VzcyBleGl0ZWQgd2l0aCBjb2RlICR7Y29kZX0gYW5kIHNpZ25hbCAke3NpZ25hbH1gKTtcbiAgfSk7XG4gIGNoaWxkLnN0ZG91dC5vbignZGF0YScsIChkYXRhKSA9PiB7XG4gICAgdmFyIHN1YnN0cmluZ3MgPSBERUZBVUxUX1NVQlNUUlM7XG4gICAgaWYgKHN1YnN0cmluZ3Muc29tZShmdW5jdGlvbih2KSB7IHJldHVybiBkYXRhLmluZGV4T2YodikgPj0gMDsgfSkpIHsgXG4gICAgICB2YXIgc3RyID0gZGF0YS50b1N0cmluZygpXG4gICAgICB2YXIgcyA9IHN0ci5yZXBsYWNlKC9cXHI/XFxufFxcci9nLCBcIiBcIilcbiAgICAgIGNvbnNvbGUubG9nKGAke3N9YCkgXG4gICAgfVxuICB9KTtcbiAgY2hpbGQuc3RkZXJyLm9uKCdkYXRhJywgKGRhdGEpID0+IHtcbiAgICBjb25zb2xlLmVycm9yKGBFOiR7ZGF0YX1gKTtcbiAgfSk7XG4gIHJldHVybiBjaGlsZDtcbn1cblxuXG5cblxuXG5cblxuLy8gYXN5bmMgZXhlY3V0ZUFzeW5jMihwYXJtcykge1xuLy8gICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4vLyAgICAgdmFyIGNoaWxkID0gc3Bhd24oc2VuY2hhLCBwYXJtcylcbi8vICAgICBjaGlsZC5vbignZXhpdCcsIGZ1bmN0aW9uIChjb2RlLCBzaWduYWwpIHtcbi8vICAgICAgIHJlc29sdmUoMCkgXG4vLyAgICAgfSlcbi8vICAgICBjaGlsZC5zdGRvdXQub24oJ2RhdGEnLCAoZGF0YSkgPT4ge1xuLy8gICAgICAgdmFyIHN1YnN0cmluZ3MgPSBbXCJbSU5GXSBXcml0aW5nIHhjb250ZW50XCIsICdbRVJSXScsICdbV1JOXScsICdbSU5GXSBQcm9jZXNzaW5nJywgXCJbSU5GXSBTZXJ2ZXJcIiwgXCJbSU5GXSBMb2FkaW5nIEJ1aWxkXCIsIFwiW0lORl0gV2FpdGluZ1wiLCBcIltMT0ddIEZhc2hpb24gd2FpdGluZ1wiXVxuLy8gICAgICAgaWYgKHN1YnN0cmluZ3Muc29tZShmdW5jdGlvbih2KSB7IHJldHVybiBkYXRhLmluZGV4T2YodikgPj0gMDsgfSkpIHsgXG4vLyAgICAgICAgIHZhciBzdHIgPSBkYXRhLnRvU3RyaW5nKClcbi8vICAgICAgICAgdmFyIHMgPSBzdHIucmVwbGFjZSgvXFxyP1xcbnxcXHIvZywgXCIgXCIpXG4vLyAgICAgICAgIHZhciBzMiA9IHMucmVwbGFjZShcIltJTkZdXCIsIFwiXCIpXG4vLyAgICAgICAgIGNvbnNvbGUubG9nKGAke2FwcH0gJHtzMn1gKSBcbi8vICAgICAgIH1cbi8vICAgICB9KVxuLy8gICAgIGNoaWxkLnN0ZGVyci5vbignZGF0YScsIChkYXRhKSA9PiB7XG4vLyAgICAgICB2YXIgc3RyID0gZGF0YS50b1N0cmluZygpXG4vLyAgICAgICB2YXIgcyA9IHN0ci5yZXBsYWNlKC9cXHI/XFxufFxcci9nLCBcIiBcIilcbi8vICAgICAgIGNvbnNvbGUubG9nKGAke2FwcH0gJHtjaGFsay5yZWQoXCJbRVJSXVwiKX0gJHtzfWApIFxuLy8gICAgIH0pXG4vLyAgIH0pXG4vLyB9XG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG4vLyBjb25zdCBzcGF3biA9IHJlcXVpcmUoJ2NoaWxkX3Byb2Nlc3MnKS5zcGF3bjtcbi8vIHZhciBzcGF3biA9IHJlcXVpcmUoJ2NoaWxkLXByb2Nlc3MtcHJvbWlzZScpLnNwYXduO1xuLy8gZnVuY3Rpb24gZXhlY3V0ZUNvbW1hbmQoY21kLCBhcmdzKSB7XG4vLyAgICAgdmFyIHByb21pc2UgPSBzcGF3bihjbWQsIGFyZ3MpO1xuIFxuLy8gICAgIHZhciBjaGlsZFByb2Nlc3MgPSBwcm9taXNlLmNoaWxkUHJvY2VzcztcbiAgICBcbi8vICAgICBjb25zb2xlLmxvZygnW3NwYXduXSBjaGlsZFByb2Nlc3MucGlkOiAnLCBjaGlsZFByb2Nlc3MucGlkKTtcbi8vICAgICBjaGlsZFByb2Nlc3Muc3Rkb3V0Lm9uKCdkYXRhJywgZnVuY3Rpb24gKGRhdGEpIHtcbi8vICAgICAgICAgY29uc29sZS5sb2coJ1tzcGF3bl0gc3Rkb3V0OiAnLCBkYXRhLnRvU3RyaW5nKCkpO1xuLy8gICAgIH0pO1xuLy8gICAgIGNoaWxkUHJvY2Vzcy5zdGRlcnIub24oJ2RhdGEnLCBmdW5jdGlvbiAoZGF0YSkge1xuLy8gICAgICAgICBjb25zb2xlLmxvZygnW3NwYXduXSBzdGRlcnI6ICcsIGRhdGEudG9TdHJpbmcoKSk7XG4vLyAgICAgfSk7XG4vLyAgICAgcmV0dXJuIHByb21pc2U7XG4vLyB9XG5cbi8vIGV4cG9ydHMuc2VuY2hhQ21kMiA9IChwYXJtcykgPT4ge1xuLy8gICBwcm9jZXNzLnN0ZG91dC5jdXJzb3JUbygwKTtjb25zb2xlLmxvZyhhcHAgKyAnc3RhcnRlZCAtIHNlbmNoYSAnICsgcGFybXMudG9TdHJpbmcoKS5yZXBsYWNlKC8sL2cgLCBcIiBcIikgKyAnXFxuJylcbi8vICAgYXdhaXQgZXhlY3V0ZUNvbW1hbmQoc2VuY2hhLCBwYXJtcylcbi8vICAgcHJvY2Vzcy5zdGRvdXQuY3Vyc29yVG8oMCk7Y29uc29sZS5sb2coYXBwICsgJ2NvbXBsZXRlZCAtIHNlbmNoYSAnICsgcGFybXMudG9TdHJpbmcoKS5yZXBsYWNlKC8sL2cgLCBcIiBcIikpXG5cbi8vIH1cblxuXG4vLyBhc3luYyBmdW5jdGlvbiBleGVjdXRlcigpIHtcbi8vICAgICBjb25zb2xlLmxvZygnW01BSU5dIHN0YXJ0Jyk7XG4vLyAgICAgYXdhaXQgZXhlY3V0ZUNvbW1hbmQoJ2VjaG8nLCBbJ2luZm8nXSk7XG4vLyAgICAgY29uc29sZS5sb2coJ1tNQUlOXSBlbmQnKTtcbi8vIH1cbiBcbi8vIGV4ZWN1dGVyKCk7XG5cblxuXG5cblxuXG5cbiJdfQ==