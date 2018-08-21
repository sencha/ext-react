'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

//const npmScope = '@sencha'
var chalk = require('chalk');
var fs = require('fs-extra');
//var json = require('comment-json');
//const sencha = require(`${npmScope}/cmd`)

var sencha = require('@sencha/cmd');

var spawnSync = require('child_process').spawnSync;
//const spawn = require('child_process').spawn
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy91dGlsLmpzIl0sIm5hbWVzIjpbImNoYWxrIiwicmVxdWlyZSIsImZzIiwic2VuY2hhIiwic3Bhd25TeW5jIiwiY3Jvc3NTcGF3biIsInByZWZpeCIsInBsYXRmb3JtIiwiYXBwIiwiZ3JlZW4iLCJERUZBVUxUX1NVQlNUUlMiLCJleHBvcnRzIiwic2VuY2hhQ21kIiwicGFybXMiLCJwcm9jZXNzIiwic3Rkb3V0IiwiY3Vyc29yVG8iLCJjb25zb2xlIiwibG9nIiwidG9TdHJpbmciLCJyZXBsYWNlIiwic3RkaW8iLCJlbmNvZGluZyIsInNlbmNoYUNtZEFzeW5jIiwib3V0cHV0IiwidmVyYm9zZSIsInN1YnN0cmluZ3MiLCJzcGF3blByb21pc2UiLCJjd2QiLCJ0aGVuIiwiY29tbWFuZCIsImFyZ3MiLCJvcHRpb25zIiwibm9FcnJvcnMiLCJjaGlsZCIsInByb21pc2UiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsIm9uIiwiY29kZSIsInNpZ25hbCIsImVycm9yIiwiZGF0YSIsInN0ciIsIm1hdGNoIiwic29tZSIsInYiLCJpbmRleE9mIiwiaW5jbHVkZXMiLCJlcnIiLCJyZWQiLCJzdGRlcnIiLCJzIiwic3RySmF2YU9wdHMiLCJibGFjayIsImVyckxvZyIsImluZkxvZyIsImluZiIsIndybkxvZyIsInllbGxvdyIsImRiZ0xvZyIsIndybiIsImRiZyIsImJsdWUiLCJlcnJUaHJvdyIsImRiZ1Rocm93IiwiZ2V0QXBwTmFtZSIsIkN1cnJXb3JraW5nRGlyIiwiYXBwSnNvbkZpbGVOYW1lIiwiZ2V0QXBwSnNvbiIsIm9iakFwcEpzb24iLCJqc29uIiwicGFyc2UiLCJyZWFkRmlsZVN5bmMiLCJhcHBOYW1lIiwibmFtZSIsIm15U3RyaW5nQXJyYXkiLCJzcGxpdCIsImFycmF5TGVuZ3RoIiwibGVuZ3RoIiwiYXBwSnNvbkZpbGUiLCJqIiwiZGlyIiwiaSIsImFwcEpzb24iLCJleGlzdHNTeW5jIiwiZ2V0U2VuY2hhQ21kUGF0aCIsInRvUGF0aCIsInBhdGgiLCJwYXRoVmFyIiwiZW52IiwiUEFUSCIsInBhdGhTZW5jaGFDbWQiLCJuIiwiaGFuZGxlT3V0cHV0Il0sIm1hcHBpbmdzIjoiOzs7O0FBQUE7QUFDQSxJQUFJQSxRQUFRQyxRQUFRLE9BQVIsQ0FBWjtBQUNBLElBQUlDLEtBQUtELFFBQVEsVUFBUixDQUFUO0FBQ0E7QUFDQTs7QUFFQSxJQUFNRSxTQUFTRixzQkFBZjs7QUFFQSxJQUFNRyxZQUFZSCxRQUFRLGVBQVIsRUFBeUJHLFNBQTNDO0FBQ0E7QUFDQSxJQUFNQyxhQUFhSixRQUFRLGFBQVIsQ0FBbkI7O0FBRUEsSUFBSUssV0FBSjtBQUNBLElBQUlMLFFBQVEsSUFBUixFQUFjTSxRQUFkLE1BQTRCLFFBQWhDLEVBQTBDO0FBQ3hDRDtBQUNELENBRkQsTUFHSztBQUNIQTtBQUNEO0FBQ0QsSUFBTUUsTUFBU1IsTUFBTVMsS0FBTixDQUFZSCxNQUFaLENBQVQscUJBQU47QUFDQSxJQUFNSSxrQkFBa0IsQ0FBQyxPQUFELEVBQVUsT0FBVixFQUFtQixrQkFBbkIsRUFBdUMsY0FBdkMsRUFBdUQsdUJBQXZELEVBQWdGLHFCQUFoRixFQUF1RyxlQUF2RyxFQUF3SCx1QkFBeEgsQ0FBeEI7O0FBRUFDLFFBQVFDLFNBQVIsR0FBb0IsVUFBQ0MsS0FBRCxFQUFXO0FBQzdCQyxVQUFRQyxNQUFSLENBQWVDLFFBQWYsQ0FBd0IsQ0FBeEIsRUFBMkJDLFFBQVFDLEdBQVIsQ0FBWVYsTUFBTSxtQkFBTixHQUE0QkssTUFBTU0sUUFBTixHQUFpQkMsT0FBakIsQ0FBeUIsSUFBekIsRUFBZ0MsR0FBaEMsQ0FBNUIsR0FBbUUsSUFBL0U7QUFDM0JoQixZQUFVRCxNQUFWLEVBQWtCVSxLQUFsQixFQUF5QixFQUFFUSxPQUFPLFNBQVQsRUFBb0JDLFVBQVUsT0FBOUIsRUFBekI7QUFDQVIsVUFBUUMsTUFBUixDQUFlQyxRQUFmLENBQXdCLENBQXhCLEVBQTJCQyxRQUFRQyxHQUFSLENBQVlWLE1BQU0scUJBQU4sR0FBOEJLLE1BQU1NLFFBQU4s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QUFDRDtBQUNGLEdBUEQ7QUFRQW5CLFFBQU1rQixNQUFOLENBQWFiLEVBQWIsQ0FBZ0IsTUFBaEIsRUFBd0IsVUFBQ0ksSUFBRCxFQUFVO0FBQ2hDMUIsWUFBUXlCLEtBQVIsUUFBbUJDLElBQW5CO0FBQ0QsR0FGRDtBQUdBLFNBQU9ULEtBQVA7QUFDRCxDQWhCRDs7QUF3QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQWdCQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEiLCJmaWxlIjoidXRpbC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vY29uc3QgbnBtU2NvcGUgPSAnQHNlbmNoYSdcbnZhciBjaGFsayA9IHJlcXVpcmUoJ2NoYWxrJyk7XG52YXIgZnMgPSByZXF1aXJlKCdmcy1leHRyYScpXG4vL3ZhciBqc29uID0gcmVxdWlyZSgnY29tbWVudC1qc29uJyk7XG4vL2NvbnN0IHNlbmNoYSA9IHJlcXVpcmUoYCR7bnBtU2NvcGV9L2NtZGApXG5cbmNvbnN0IHNlbmNoYSA9IHJlcXVpcmUoYEBzZW5jaGEvY21kYClcblxuY29uc3Qgc3Bhd25TeW5jID0gcmVxdWlyZSgnY2hpbGRfcHJvY2VzcycpLnNwYXduU3luY1xuLy9jb25zdCBzcGF3biA9IHJlcXVpcmUoJ2NoaWxkX3Byb2Nlc3MnKS5zcGF3blxuY29uc3QgY3Jvc3NTcGF3biA9IHJlcXVpcmUoJ2Nyb3NzLXNwYXduJylcblxudmFyIHByZWZpeCA9IGBgXG5pZiAocmVxdWlyZSgnb3MnKS5wbGF0Zm9ybSgpID09ICdkYXJ3aW4nKSB7XG4gIHByZWZpeCA9IGDihLkg772iZXh0772jOmBcbn1cbmVsc2Uge1xuICBwcmVmaXggPSBgaSBbZXh0XTpgXG59XG5jb25zdCBhcHAgPSBgJHtjaGFsay5ncmVlbihwcmVmaXgpfSBleHQtYnVpbGQtdXRpbDpgXG5jb25zdCBERUZBVUxUX1NVQlNUUlMgPSBbJ1tFUlJdJywgJ1tXUk5dJywgJ1tJTkZdIFByb2Nlc3NpbmcnLCBcIltJTkZdIFNlcnZlclwiLCBcIltJTkZdIFdyaXRpbmcgY29udGVudFwiLCBcIltJTkZdIExvYWRpbmcgQnVpbGRcIiwgXCJbSU5GXSBXYWl0aW5nXCIsIFwiW0xPR10gRmFzaGlvbiB3YWl0aW5nXCJdO1xuXG5leHBvcnRzLnNlbmNoYUNtZCA9IChwYXJtcykgPT4ge1xuICBwcm9jZXNzLnN0ZG91dC5jdXJzb3JUbygwKTtjb25zb2xlLmxvZyhhcHAgKyAnc3RhcnRlZCAtIHNlbmNoYSAnICsgcGFybXMudG9TdHJpbmcoKS5yZXBsYWNlKC8sL2cgLCBcIiBcIikgKyAnXFxuJylcbiAgc3Bhd25TeW5jKHNlbmNoYSwgcGFybXMsIHsgc3RkaW86ICdpbmhlcml0JywgZW5jb2Rpbmc6ICd1dGYtOCd9KVxuICBwcm9jZXNzLnN0ZG91dC5jdXJzb3JUbygwKTtjb25zb2xlLmxvZyhhcHAgKyAnY29tcGxldGVkIC0gc2VuY2hhICcgKyBwYXJtcy50b1N0cmluZygpLnJlcGxhY2UoLywvZyAsIFwiIFwiKSlcbn1cblxuZXhwb3J0cy5zZW5jaGFDbWRBc3luYyA9IGFzeW5jIChwYXJtcywgb3V0cHV0LCB2ZXJib3NlLCBzdWJzdHJpbmdzID0gREVGQVVMVF9TVUJTVFJTKSA9PiB7XG4gIGNvbnNvbGUubG9nKCdoZXJlJylcbiAgc3Bhd25Qcm9taXNlKHNlbmNoYSwgcGFybXMsIHsgc3RkaW86ICdwaXBlJywgZW5jb2Rpbmc6ICd1dGYtOCcsY3dkOiBvdXRwdXQgfSwgdmVyYm9zZSwgc3Vic3RyaW5ncykgLnRoZW4oKCkgPT4ge1xuICAgIGNvbnNvbGUubG9nKCdhZnRlciBzcGF3blByb21pc2UnKVxuICAgIHJldHVyblxuICB9KVxufVxuXG5cbnZhciBzcGF3blByb21pc2UgPSAoY29tbWFuZCwgYXJncywgb3B0aW9ucywgdmVyYm9zZSwgc3Vic3RyaW5ncykgPT4ge1xuICB2YXIgbm9FcnJvcnMgPSB0cnVlXG4gIGxldCBjaGlsZFxuICBsZXQgcHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblxuICAgIGNoaWxkID0gY3Jvc3NTcGF3bihcbiAgICAgIGNvbW1hbmQsIFxuICAgICAgYXJncywgXG4gICAgICBvcHRpb25zXG4gICAgKVxuICAgIGNoaWxkLm9uKCdjbG9zZScsIChjb2RlLCBzaWduYWwpID0+IHtcbiAgICAgIGlmKGNvZGUgPT09IDApIHtcbiAgICAgICAgaWYgKG5vRXJyb3JzKSB7XG4gICAgICAgICAgcmVzb2x2ZSh7Y29kZSwgc2lnbmFsfSlcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICByZWplY3QoJ2V4dC1idWlsZCBlcnJvcnMnKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgcmVqZWN0KCdleHQtYnVpbGQgZXJyb3JzLi4uJylcbiAgICAgIH1cbiAgICB9KVxuICAgIGNoaWxkLm9uKCdlcnJvcicsIChlcnJvcikgPT4ge1xuICAgICAgcmVqZWN0KGVycm9yKVxuICAgIH0pXG4gICAgaWYgKGNoaWxkLnN0ZG91dCkge1xuICAgICAgY2hpbGQuc3Rkb3V0Lm9uKCdkYXRhJywgKGRhdGEpID0+IHtcbiAgICAgICAgdmFyIHN0ciA9IGRhdGEudG9TdHJpbmcoKVxuICAgICAgICBzdHIgPSBzdHIucmVwbGFjZSgvXFxyP1xcbnxcXHIvZywgXCIgXCIpXG5cbiAgICAgICAgaWYgKGRhdGEgJiYgZGF0YS50b1N0cmluZygpLm1hdGNoKC9XYWl0aW5nIGZvciBjaGFuZ2VzXFwuXFwuXFwuLykpIHtcbiAgICAgICAgICByZXNvbHZlKHt9KVxuICAgICAgICB9XG5cblxuXG4gICAgICAgIGlmKHZlcmJvc2UgPT0gJ3llcycpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhgJHthcHB9JHtzdHJ9YCkgXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgaWYgKHN1YnN0cmluZ3Muc29tZShmdW5jdGlvbih2KSB7IHJldHVybiBkYXRhLmluZGV4T2YodikgPj0gMDsgfSkpIHsgXG4gICAgICAgICAgICBzdHIgPSBzdHIucmVwbGFjZShcIltJTkZdXCIsIFwiXCIpXG4gICAgICAgICAgICBzdHIgPSBzdHIucmVwbGFjZShwcm9jZXNzLmN3ZCgpLCAnJylcbiAgICAgICAgICAgIGlmIChzdHIuaW5jbHVkZXMoXCJbRVJSXVwiKSkge1xuICAgICAgICAgICAgICBjb25zdCBlcnIgPSBgJHtjaGFsay5yZWQoXCJbRVJSXVwiKX1gXG4gICAgICAgICAgICAgIHN0ciA9IHN0ci5yZXBsYWNlKFwiW0VSUl1cIiwgZXJyKVxuICAgICAgICAgICAgICBub0Vycm9ycyA9IGZhbHNlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgJHthcHB9JHtzdHJ9YCkgXG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIGVsc2Ugey8vbm90aGluZ31cbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBjb25zb2xlLmxvZyhgJHthcHB9ICR7Y2hhbGsucmVkKCdbRVJSXScpfSBubyBzdGRvdXRgKSBcbiAgICB9XG4gICAgaWYgKGNoaWxkLnN0ZGVycikge1xuICAgICAgY2hpbGQuc3RkZXJyLm9uKCdkYXRhJywgKGRhdGEpID0+IHtcbiAgICAgICAgdmFyIHN0ciA9IGRhdGEudG9TdHJpbmcoKVxuICAgICAgICB2YXIgcyA9IHN0ci5yZXBsYWNlKC9cXHI/XFxufFxcci9nLCBcIiBcIilcbiAgICAgICAgdmFyIHN0ckphdmFPcHRzID0gXCJQaWNrZWQgdXAgX0pBVkFfT1BUSU9OU1wiO1xuICAgICAgICB2YXIgaW5jbHVkZXMgPSBzLmluY2x1ZGVzKHN0ckphdmFPcHRzKVxuICAgICAgICBpZiAoIWluY2x1ZGVzKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coYCR7YXBwfSAke2NoYWxrLmJsYWNrKFwiW0VSUl1cIil9ICR7c31gKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGNvbnNvbGUubG9nKGAke2FwcH0gJHtjaGFsay5yZWQoJ1tFUlJdJyl9IG5vIHN0ZGVycmApIFxuICAgIH1cbiAgfSk7XG4gIHByb21pc2UuY2hpbGQgPSBjaGlsZFxuICByZXR1cm4gcHJvbWlzZVxufVxuXG4vL2V4cG9ydHMuZXJyID0gZnVuY3Rpb24gZXJyKHMpIHsgcmV0dXJuIGNoYWxrLnJlZCgnW0VSUl0gJykgKyBzIH1cbi8vZXhwb3J0cy5pbmYgPSBmdW5jdGlvbiBpbmYocykgeyByZXR1cm4gY2hhbGsuZ3JlZW4oJ1tJTkZdICcpICsgcyB9XG4vL2V4cG9ydHMud3JuID0gZnVuY3Rpb24gZXJyKHMpIHsgcmV0dXJuIGNoYWxrLnllbGxvdygnW1dSTl0gJykgKyBzIH1cbmV4cG9ydHMuZXJyTG9nID0gZnVuY3Rpb24gZXJyKHMpIHsgY29uc29sZS5sb2coY2hhbGsucmVkKCdbRVJSXSAnKSArIHMpIH1cbmV4cG9ydHMuaW5mTG9nID0gZnVuY3Rpb24gaW5mKHMpIHsgY29uc29sZS5sb2coY2hhbGsuZ3JlZW4oJ1tJTkZdICcpICsgcykgfVxuZXhwb3J0cy53cm5Mb2cgPSBmdW5jdGlvbiBlcnIocykgeyBjb25zb2xlLmxvZyhjaGFsay55ZWxsb3coJ1tXUk5dICcpICsgcykgfVxuLy9leHBvcnRzLmRiZ0xvZyA9IGZ1bmN0aW9uIGRiZ0xvZyhzKSB7IGlmIChkZWJ1ZykgY29uc29sZS5sb2coY2hhbGsuYmx1ZSgnW0RCR10gJykgKyBzKSB9XG5leHBvcnRzLmRiZ0xvZyA9IGZ1bmN0aW9uIGRiZ0xvZyhzKSB7ICB9XG5leHBvcnRzLmVyciA9IGZ1bmN0aW9uIGVycihzKSB7IHJldHVybiBjaGFsay5yZWQoJ1tFUlJdICcpICsgcyB9XG5leHBvcnRzLmluZiA9IGZ1bmN0aW9uIGluZihzKSB7IHJldHVybiBjaGFsay5ncmVlbignW0lORl0gJykgKyBzIH1cbmV4cG9ydHMud3JuID0gZnVuY3Rpb24gZXJyKHMpIHsgcmV0dXJuIGNoYWxrLnllbGxvdygnW1dSTl0gJykgKyBzIH1cbmV4cG9ydHMuZGJnID0gZnVuY3Rpb24gZXJyKHMpIHsgcmV0dXJuIGNoYWxrLmJsdWUoJ1tEQkddICcpICsgcyB9XG5cbnZhciBlcnJUaHJvdyA9IGZ1bmN0aW9uIGVycihzKSB7IHRocm93IGNoYWxrLnJlZCgnW0VSUl0gJykgKyBzIH1cbmV4cG9ydHMuZXJyVGhyb3cgPSBlcnJUaHJvd1xuZXhwb3J0cy5kYmdUaHJvdyA9IGZ1bmN0aW9uIGVycihzKSB7IHRocm93IGNoYWxrLmJsdWUoJ1tFUlJdICcpICsgcyB9XG5cbmV4cG9ydHMuZ2V0QXBwTmFtZSA9IGZ1bmN0aW9uIGdldEFwcE5hbWUoQ3VycldvcmtpbmdEaXIpIHtcblx0dmFyIGFwcEpzb25GaWxlTmFtZSA9IGdldEFwcEpzb24oQ3VycldvcmtpbmdEaXIpXG5cdGlmIChhcHBKc29uRmlsZU5hbWUgPT0gJycpIHtcblx0XHR0aHJvdyAnTm90IGEgU2VuY2hhIENtZCBwcm9qZWN0IC0gbm8gYXBwLmpzb24gZm91bmQnXG5cdH1cblx0dmFyIG9iakFwcEpzb24gPSBqc29uLnBhcnNlKGZzLnJlYWRGaWxlU3luYyhhcHBKc29uRmlsZU5hbWUpLnRvU3RyaW5nKCkpO1xuXHR2YXIgYXBwTmFtZSA9IG9iakFwcEpzb24ubmFtZVxuXHRyZXR1cm4gYXBwTmFtZVxufVxuXG5mdW5jdGlvbiBnZXRBcHBKc29uKEN1cnJXb3JraW5nRGlyKSB7XG5cdHZhciBteVN0cmluZ0FycmF5ID0gQ3VycldvcmtpbmdEaXIuc3BsaXQoJy8nKVxuXHR2YXIgYXJyYXlMZW5ndGggPSBteVN0cmluZ0FycmF5Lmxlbmd0aFxuXHR2YXIgYXBwSnNvbkZpbGUgPSAnJ1xuXHRmb3IgKHZhciBqID0gYXJyYXlMZW5ndGg7IGogPiAwOyBqLS0pIHtcblx0XHR2YXIgZGlyID0gJydcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGo7IGkrKykge1xuXHRcdFx0aWYgKG15U3RyaW5nQXJyYXlbaV0hPScnKSB7XG5cdFx0XHRcdGRpciA9IGRpciArICcvJyArIG15U3RyaW5nQXJyYXlbaV1cblx0XHRcdH1cblx0XHR9XG5cdFx0Ly8gdmFyIHdvcmtzcGFjZUpzb24gPSBkaXIgKyAnLycgKyAnd29ya3NwYWNlLmpzb24nXG5cdFx0Ly8gaWYgKGZzLmV4aXN0c1N5bmMod29ya3NwYWNlSnNvbikpIHtcblx0XHQvLyBcdGNvbnNvbGUubG9nKCd5ZXMgJyArIHdvcmtzcGFjZUpzb24pXG5cdFx0Ly8gfVxuXHRcdHZhciBhcHBKc29uID0gZGlyICsgJy8nICsgJ2FwcC5qc29uJ1xuLy9cdFx0Y29uc29sZS5sb2coYXBwSnNvbilcblx0XHRpZiAoZnMuZXhpc3RzU3luYyhhcHBKc29uKSkge1xuLy9cdFx0XHRjb25zb2xlLmxvZygnaGVyZScpXG5cdFx0XHRhcHBKc29uRmlsZSA9IGFwcEpzb25cblx0XHR9XG5cdH1cblx0cmV0dXJuIGFwcEpzb25GaWxlXG59XG5cbmV4cG9ydHMuZ2V0U2VuY2hhQ21kUGF0aCA9IGZ1bmN0aW9uIGdldFNlbmNoYUNtZFBhdGgodG9QYXRoLCBwYXRoKSB7XG5cdHBhdGhWYXIgPSBwcm9jZXNzLmVudi5QQVRIXG5cdHZhciBteVN0cmluZ0FycmF5ID0gcGF0aFZhci5zcGxpdCgnOicpXG5cdHZhciBhcnJheUxlbmd0aCA9IG15U3RyaW5nQXJyYXkubGVuZ3RoXG5cdHZhciBwYXRoU2VuY2hhQ21kID0gJydcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBhcnJheUxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIHN0ciA9IG15U3RyaW5nQXJyYXlbaV1cblx0XHR2YXIgbiA9IHN0ci5pbmRleE9mKFwiU2VuY2hhL0NtZFwiKTtcblx0XHRpZiAobiAhPSAtMSkge1xuXHRcdFx0cGF0aFNlbmNoYUNtZCA9IHN0clxuXHRcdH1cblx0fVxuXHQvL3ZhciBvdGhlciA9ICcvcGx1Z2lucy9leHQvY3VycmVudCdcblx0Ly9jb25zb2xlLmxvZyhwYXRoU2VuY2hhQ21kICsgb3RoZXIpXG5cdHJldHVybiBwYXRoU2VuY2hhQ21kXG59XG5cbmV4cG9ydHMuaGFuZGxlT3V0cHV0ID0gKGNoaWxkKSA9PiB7XG4gIGNoaWxkLm9uKCdleGl0JywgZnVuY3Rpb24gKGNvZGUsIHNpZ25hbCkge1xuICAgIGNvbnNvbGUubG9nKGBjaGlsZCBwcm9jZXNzIGV4aXRlZCB3aXRoIGNvZGUgJHtjb2RlfSBhbmQgc2lnbmFsICR7c2lnbmFsfWApO1xuICB9KTtcbiAgY2hpbGQuc3Rkb3V0Lm9uKCdkYXRhJywgKGRhdGEpID0+IHtcbiAgICB2YXIgc3Vic3RyaW5ncyA9IERFRkFVTFRfU1VCU1RSUztcbiAgICBpZiAoc3Vic3RyaW5ncy5zb21lKGZ1bmN0aW9uKHYpIHsgcmV0dXJuIGRhdGEuaW5kZXhPZih2KSA+PSAwOyB9KSkgeyBcbiAgICAgIHZhciBzdHIgPSBkYXRhLnRvU3RyaW5nKClcbiAgICAgIHZhciBzID0gc3RyLnJlcGxhY2UoL1xccj9cXG58XFxyL2csIFwiIFwiKVxuICAgICAgY29uc29sZS5sb2coYCR7c31gKSBcbiAgICB9XG4gIH0pO1xuICBjaGlsZC5zdGRlcnIub24oJ2RhdGEnLCAoZGF0YSkgPT4ge1xuICAgIGNvbnNvbGUuZXJyb3IoYEU6JHtkYXRhfWApO1xuICB9KTtcbiAgcmV0dXJuIGNoaWxkO1xufVxuXG5cblxuXG5cblxuXG4vLyBhc3luYyBleGVjdXRlQXN5bmMyKHBhcm1zKSB7XG4vLyAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbi8vICAgICB2YXIgY2hpbGQgPSBzcGF3bihzZW5jaGEsIHBhcm1zKVxuLy8gICAgIGNoaWxkLm9uKCdleGl0JywgZnVuY3Rpb24gKGNvZGUsIHNpZ25hbCkge1xuLy8gICAgICAgcmVzb2x2ZSgwKSBcbi8vICAgICB9KVxuLy8gICAgIGNoaWxkLnN0ZG91dC5vbignZGF0YScsIChkYXRhKSA9PiB7XG4vLyAgICAgICB2YXIgc3Vic3RyaW5ncyA9IFtcIltJTkZdIFdyaXRpbmcgeGNvbnRlbnRcIiwgJ1tFUlJdJywgJ1tXUk5dJywgJ1tJTkZdIFByb2Nlc3NpbmcnLCBcIltJTkZdIFNlcnZlclwiLCBcIltJTkZdIExvYWRpbmcgQnVpbGRcIiwgXCJbSU5GXSBXYWl0aW5nXCIsIFwiW0xPR10gRmFzaGlvbiB3YWl0aW5nXCJdXG4vLyAgICAgICBpZiAoc3Vic3RyaW5ncy5zb21lKGZ1bmN0aW9uKHYpIHsgcmV0dXJuIGRhdGEuaW5kZXhPZih2KSA+PSAwOyB9KSkgeyBcbi8vICAgICAgICAgdmFyIHN0ciA9IGRhdGEudG9TdHJpbmcoKVxuLy8gICAgICAgICB2YXIgcyA9IHN0ci5yZXBsYWNlKC9cXHI/XFxufFxcci9nLCBcIiBcIilcbi8vICAgICAgICAgdmFyIHMyID0gcy5yZXBsYWNlKFwiW0lORl1cIiwgXCJcIilcbi8vICAgICAgICAgY29uc29sZS5sb2coYCR7YXBwfSAke3MyfWApIFxuLy8gICAgICAgfVxuLy8gICAgIH0pXG4vLyAgICAgY2hpbGQuc3RkZXJyLm9uKCdkYXRhJywgKGRhdGEpID0+IHtcbi8vICAgICAgIHZhciBzdHIgPSBkYXRhLnRvU3RyaW5nKClcbi8vICAgICAgIHZhciBzID0gc3RyLnJlcGxhY2UoL1xccj9cXG58XFxyL2csIFwiIFwiKVxuLy8gICAgICAgY29uc29sZS5sb2coYCR7YXBwfSAke2NoYWxrLnJlZChcIltFUlJdXCIpfSAke3N9YCkgXG4vLyAgICAgfSlcbi8vICAgfSlcbi8vIH1cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cbi8vIGNvbnN0IHNwYXduID0gcmVxdWlyZSgnY2hpbGRfcHJvY2VzcycpLnNwYXduO1xuLy8gdmFyIHNwYXduID0gcmVxdWlyZSgnY2hpbGQtcHJvY2Vzcy1wcm9taXNlJykuc3Bhd247XG4vLyBmdW5jdGlvbiBleGVjdXRlQ29tbWFuZChjbWQsIGFyZ3MpIHtcbi8vICAgICB2YXIgcHJvbWlzZSA9IHNwYXduKGNtZCwgYXJncyk7XG4gXG4vLyAgICAgdmFyIGNoaWxkUHJvY2VzcyA9IHByb21pc2UuY2hpbGRQcm9jZXNzO1xuICAgIFxuLy8gICAgIGNvbnNvbGUubG9nKCdbc3Bhd25dIGNoaWxkUHJvY2Vzcy5waWQ6ICcsIGNoaWxkUHJvY2Vzcy5waWQpO1xuLy8gICAgIGNoaWxkUHJvY2Vzcy5zdGRvdXQub24oJ2RhdGEnLCBmdW5jdGlvbiAoZGF0YSkge1xuLy8gICAgICAgICBjb25zb2xlLmxvZygnW3NwYXduXSBzdGRvdXQ6ICcsIGRhdGEudG9TdHJpbmcoKSk7XG4vLyAgICAgfSk7XG4vLyAgICAgY2hpbGRQcm9jZXNzLnN0ZGVyci5vbignZGF0YScsIGZ1bmN0aW9uIChkYXRhKSB7XG4vLyAgICAgICAgIGNvbnNvbGUubG9nKCdbc3Bhd25dIHN0ZGVycjogJywgZGF0YS50b1N0cmluZygpKTtcbi8vICAgICB9KTtcbi8vICAgICByZXR1cm4gcHJvbWlzZTtcbi8vIH1cblxuLy8gZXhwb3J0cy5zZW5jaGFDbWQyID0gKHBhcm1zKSA9PiB7XG4vLyAgIHByb2Nlc3Muc3Rkb3V0LmN1cnNvclRvKDApO2NvbnNvbGUubG9nKGFwcCArICdzdGFydGVkIC0gc2VuY2hhICcgKyBwYXJtcy50b1N0cmluZygpLnJlcGxhY2UoLywvZyAsIFwiIFwiKSArICdcXG4nKVxuLy8gICBhd2FpdCBleGVjdXRlQ29tbWFuZChzZW5jaGEsIHBhcm1zKVxuLy8gICBwcm9jZXNzLnN0ZG91dC5jdXJzb3JUbygwKTtjb25zb2xlLmxvZyhhcHAgKyAnY29tcGxldGVkIC0gc2VuY2hhICcgKyBwYXJtcy50b1N0cmluZygpLnJlcGxhY2UoLywvZyAsIFwiIFwiKSlcblxuLy8gfVxuXG5cbi8vIGFzeW5jIGZ1bmN0aW9uIGV4ZWN1dGVyKCkge1xuLy8gICAgIGNvbnNvbGUubG9nKCdbTUFJTl0gc3RhcnQnKTtcbi8vICAgICBhd2FpdCBleGVjdXRlQ29tbWFuZCgnZWNobycsIFsnaW5mbyddKTtcbi8vICAgICBjb25zb2xlLmxvZygnW01BSU5dIGVuZCcpO1xuLy8gfVxuIFxuLy8gZXhlY3V0ZXIoKTtcblxuXG5cblxuXG5cblxuIl19