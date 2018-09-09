"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

//const npmScope = '@sencha'
var chalk = require('chalk');

var fs = require('fs-extra'); //var json = require('comment-json');
//const sencha = require(`${npmScope}/cmd`)


const sencha = require(`@sencha/cmd`);

const spawnSync = require('child_process').spawnSync; //const spawn = require('child_process').spawn


const crossSpawn = require('cross-spawn');

var prefix = ``;

if (require('os').platform() == 'darwin') {
  prefix = `ℹ ｢ext｣:`;
} else {
  prefix = `i [ext]:`;
}

const app = `${chalk.green(prefix)} ext-build-util:`;
const DEFAULT_SUBSTRS = ['[ERR]', '[WRN]', '[INF] Processing', "[INF] Server", "[INF] Writing content", "[INF] Loading Build", "[INF] Waiting", "[LOG] Fashion waiting"];

exports.senchaCmd = parms => {
  process.stdout.cursorTo(0);
  console.log(app + 'started - sencha ' + parms.toString().replace(/,/g, " ") + '\n');
  spawnSync(sencha, parms, {
    stdio: 'inherit',
    encoding: 'utf-8'
  });
  process.stdout.cursorTo(0);
  console.log(app + 'completed - sencha ' + parms.toString().replace(/,/g, " "));
};

exports.senchaCmdAsync =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(parms, output, verbose, substrings = DEFAULT_SUBSTRS) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          console.log('here');
          spawnPromise(sencha, parms, {
            stdio: 'pipe',
            encoding: 'utf-8',
            cwd: output
          }, verbose, substrings).then(() => {
            console.log('after spawnPromise');
            return;
          });

        case 2:
        case "end":
          return _context.stop();
      }
    }, _callee, this);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var spawnPromise = (command, args, options, verbose, substrings) => {
  var noErrors = true;
  let child;
  let promise = new Promise((resolve, reject) => {
    child = crossSpawn(command, args, options);
    child.on('close', (code, signal) => {
      if (code === 0) {
        if (noErrors) {
          resolve({
            code,
            signal
          });
        } else {
          reject('ext-build errors');
        }
      } else {
        reject('ext-build errors...');
      }
    });
    child.on('error', error => {
      reject(error);
    });

    if (child.stdout) {
      child.stdout.on('data', data => {
        var str = data.toString();
        str = str.replace(/\r?\n|\r/g, " ");

        if (data && data.toString().match(/Waiting for changes\.\.\./)) {
          resolve({});
        }

        if (verbose == 'yes') {
          console.log(`${app}${str}`);
        } else {
          if (substrings.some(function (v) {
            return data.indexOf(v) >= 0;
          })) {
            str = str.replace("[INF]", "");
            str = str.replace(process.cwd(), '');

            if (str.includes("[ERR]")) {
              const err = `${chalk.red("[ERR]")}`;
              str = str.replace("[ERR]", err);
              noErrors = false;
            }

            console.log(`${app}${str}`);
          } // else {//nothing}

        }
      });
    } else {
      console.log(`${app} ${chalk.red('[ERR]')} no stdout`);
    }

    if (child.stderr) {
      child.stderr.on('data', data => {
        var str = data.toString();
        var s = str.replace(/\r?\n|\r/g, " ");
        var strJavaOpts = "Picked up _JAVA_OPTIONS";
        var includes = s.includes(strJavaOpts);

        if (!includes) {
          console.log(`${app} ${chalk.black("[ERR]")} ${s}`);
        }
      });
    } else {
      console.log(`${app} ${chalk.red('[ERR]')} no stderr`);
    }
  });
  promise.child = child;
  return promise;
}; //exports.err = function err(s) { return chalk.red('[ERR] ') + s }
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
}; //exports.dbgLog = function dbgLog(s) { if (debug) console.log(chalk.blue('[DBG] ') + s) }


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
    } // var workspaceJson = dir + '/' + 'workspace.json'
    // if (fs.existsSync(workspaceJson)) {
    // 	console.log('yes ' + workspaceJson)
    // }


    var appJson = dir + '/' + 'app.json'; //		console.log(appJson)

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
  } //var other = '/plugins/ext/current'
  //console.log(pathSenchaCmd + other)


  return pathSenchaCmd;
};

exports.handleOutput = child => {
  child.on('exit', function (code, signal) {
    console.log(`child process exited with code ${code} and signal ${signal}`);
  });
  child.stdout.on('data', data => {
    var substrings = DEFAULT_SUBSTRS;

    if (substrings.some(function (v) {
      return data.indexOf(v) >= 0;
    })) {
      var str = data.toString();
      var s = str.replace(/\r?\n|\r/g, " ");
      console.log(`${s}`);
    }
  });
  child.stderr.on('data', data => {
    console.error(`E:${data}`);
  });
  return child;
}; // async executeAsync2(parms) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy91dGlsLmpzIl0sIm5hbWVzIjpbImNoYWxrIiwicmVxdWlyZSIsImZzIiwic2VuY2hhIiwic3Bhd25TeW5jIiwiY3Jvc3NTcGF3biIsInByZWZpeCIsInBsYXRmb3JtIiwiYXBwIiwiZ3JlZW4iLCJERUZBVUxUX1NVQlNUUlMiLCJleHBvcnRzIiwic2VuY2hhQ21kIiwicGFybXMiLCJwcm9jZXNzIiwic3Rkb3V0IiwiY3Vyc29yVG8iLCJjb25zb2xlIiwibG9nIiwidG9TdHJpbmciLCJyZXBsYWNlIiwic3RkaW8iLCJlbmNvZGluZyIsInNlbmNoYUNtZEFzeW5jIiwib3V0cHV0IiwidmVyYm9zZSIsInN1YnN0cmluZ3MiLCJzcGF3blByb21pc2UiLCJjd2QiLCJ0aGVuIiwiY29tbWFuZCIsImFyZ3MiLCJvcHRpb25zIiwibm9FcnJvcnMiLCJjaGlsZCIsInByb21pc2UiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsIm9uIiwiY29kZSIsInNpZ25hbCIsImVycm9yIiwiZGF0YSIsInN0ciIsIm1hdGNoIiwic29tZSIsInYiLCJpbmRleE9mIiwiaW5jbHVkZXMiLCJlcnIiLCJyZWQiLCJzdGRlcnIiLCJzIiwic3RySmF2YU9wdHMiLCJibGFjayIsImVyckxvZyIsImluZkxvZyIsImluZiIsIndybkxvZyIsInllbGxvdyIsImRiZ0xvZyIsIndybiIsImRiZyIsImJsdWUiLCJlcnJUaHJvdyIsImRiZ1Rocm93IiwiZ2V0QXBwTmFtZSIsIkN1cnJXb3JraW5nRGlyIiwiYXBwSnNvbkZpbGVOYW1lIiwiZ2V0QXBwSnNvbiIsIm9iakFwcEpzb24iLCJqc29uIiwicGFyc2UiLCJyZWFkRmlsZVN5bmMiLCJhcHBOYW1lIiwibmFtZSIsIm15U3RyaW5nQXJyYXkiLCJzcGxpdCIsImFycmF5TGVuZ3RoIiwibGVuZ3RoIiwiYXBwSnNvbkZpbGUiLCJqIiwiZGlyIiwiaSIsImFwcEpzb24iLCJleGlzdHNTeW5jIiwiZ2V0U2VuY2hhQ21kUGF0aCIsInRvUGF0aCIsInBhdGgiLCJwYXRoVmFyIiwiZW52IiwiUEFUSCIsInBhdGhTZW5jaGFDbWQiLCJuIiwiaGFuZGxlT3V0cHV0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTtBQUNBLElBQUlBLEtBQUssR0FBR0MsT0FBTyxDQUFDLE9BQUQsQ0FBbkI7O0FBQ0EsSUFBSUMsRUFBRSxHQUFHRCxPQUFPLENBQUMsVUFBRCxDQUFoQixDLENBQ0E7QUFDQTs7O0FBRUEsTUFBTUUsTUFBTSxHQUFHRixPQUFPLENBQUUsYUFBRixDQUF0Qjs7QUFFQSxNQUFNRyxTQUFTLEdBQUdILE9BQU8sQ0FBQyxlQUFELENBQVAsQ0FBeUJHLFNBQTNDLEMsQ0FDQTs7O0FBQ0EsTUFBTUMsVUFBVSxHQUFHSixPQUFPLENBQUMsYUFBRCxDQUExQjs7QUFFQSxJQUFJSyxNQUFNLEdBQUksRUFBZDs7QUFDQSxJQUFJTCxPQUFPLENBQUMsSUFBRCxDQUFQLENBQWNNLFFBQWQsTUFBNEIsUUFBaEMsRUFBMEM7QUFDeENELEVBQUFBLE1BQU0sR0FBSSxVQUFWO0FBQ0QsQ0FGRCxNQUdLO0FBQ0hBLEVBQUFBLE1BQU0sR0FBSSxVQUFWO0FBQ0Q7O0FBQ0QsTUFBTUUsR0FBRyxHQUFJLEdBQUVSLEtBQUssQ0FBQ1MsS0FBTixDQUFZSCxNQUFaLENBQW9CLGtCQUFuQztBQUNBLE1BQU1JLGVBQWUsR0FBRyxDQUFDLE9BQUQsRUFBVSxPQUFWLEVBQW1CLGtCQUFuQixFQUF1QyxjQUF2QyxFQUF1RCx1QkFBdkQsRUFBZ0YscUJBQWhGLEVBQXVHLGVBQXZHLEVBQXdILHVCQUF4SCxDQUF4Qjs7QUFFQUMsT0FBTyxDQUFDQyxTQUFSLEdBQXFCQyxLQUFELElBQVc7QUFDN0JDLEVBQUFBLE9BQU8sQ0FBQ0MsTUFBUixDQUFlQyxRQUFmLENBQXdCLENBQXhCO0FBQTJCQyxFQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWVYsR0FBRyxHQUFHLG1CQUFOLEdBQTRCSyxLQUFLLENBQUNNLFFBQU4sR0FBaUJDLE9BQWpCLENBQXlCLElBQXpCLEVBQWdDLEdB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cXVpcmUoJ2NoYWxrJyk7XG52YXIgZnMgPSByZXF1aXJlKCdmcy1leHRyYScpXG4vL3ZhciBqc29uID0gcmVxdWlyZSgnY29tbWVudC1qc29uJyk7XG4vL2NvbnN0IHNlbmNoYSA9IHJlcXVpcmUoYCR7bnBtU2NvcGV9L2NtZGApXG5cbmNvbnN0IHNlbmNoYSA9IHJlcXVpcmUoYEBzZW5jaGEvY21kYClcblxuY29uc3Qgc3Bhd25TeW5jID0gcmVxdWlyZSgnY2hpbGRfcHJvY2VzcycpLnNwYXduU3luY1xuLy9jb25zdCBzcGF3biA9IHJlcXVpcmUoJ2NoaWxkX3Byb2Nlc3MnKS5zcGF3blxuY29uc3QgY3Jvc3NTcGF3biA9IHJlcXVpcmUoJ2Nyb3NzLXNwYXduJylcblxudmFyIHByZWZpeCA9IGBgXG5pZiAocmVxdWlyZSgnb3MnKS5wbGF0Zm9ybSgpID09ICdkYXJ3aW4nKSB7XG4gIHByZWZpeCA9IGDihLkg772iZXh0772jOmBcbn1cbmVsc2Uge1xuICBwcmVmaXggPSBgaSBbZXh0XTpgXG59XG5jb25zdCBhcHAgPSBgJHtjaGFsay5ncmVlbihwcmVmaXgpfSBleHQtYnVpbGQtdXRpbDpgXG5jb25zdCBERUZBVUxUX1NVQlNUUlMgPSBbJ1tFUlJdJywgJ1tXUk5dJywgJ1tJTkZdIFByb2Nlc3NpbmcnLCBcIltJTkZdIFNlcnZlclwiLCBcIltJTkZdIFdyaXRpbmcgY29udGVudFwiLCBcIltJTkZdIExvYWRpbmcgQnVpbGRcIiwgXCJbSU5GXSBXYWl0aW5nXCIsIFwiW0xPR10gRmFzaGlvbiB3YWl0aW5nXCJdO1xuXG5leHBvcnRzLnNlbmNoYUNtZCA9IChwYXJtcykgPT4ge1xuICBwcm9jZXNzLnN0ZG91dC5jdXJzb3JUbygwKTtjb25zb2xlLmxvZyhhcHAgKyAnc3RhcnRlZCAtIHNlbmNoYSAnICsgcGFybXMudG9TdHJpbmcoKS5yZXBsYWNlKC8sL2cgLCBcIiBcIikgKyAnXFxuJylcbiAgc3Bhd25TeW5jKHNlbmNoYSwgcGFybXMsIHsgc3RkaW86ICdpbmhlcml0JywgZW5jb2Rpbmc6ICd1dGYtOCd9KVxuICBwcm9jZXNzLnN0ZG91dC5jdXJzb3JUbygwKTtjb25zb2xlLmxvZyhhcHAgKyAnY29tcGxldGVkIC0gc2VuY2hhICcgKyBwYXJtcy50b1N0cmluZygpLnJlcGxhY2UoLywvZyAsIFwiIFwiKSlcbn1cblxuZXhwb3J0cy5zZW5jaGFDbWRBc3luYyA9IGFzeW5jIChwYXJtcywgb3V0cHV0LCB2ZXJib3NlLCBzdWJzdHJpbmdzID0gREVGQVVMVF9TVUJTVFJTKSA9PiB7XG4gIGNvbnNvbGUubG9nKCdoZXJlJylcbiAgc3Bhd25Qcm9taXNlKHNlbmNoYSwgcGFybXMsIHsgc3RkaW86ICdwaXBlJywgZW5jb2Rpbmc6ICd1dGYtOCcsY3dkOiBvdXRwdXQgfSwgdmVyYm9zZSwgc3Vic3RyaW5ncykgLnRoZW4oKCkgPT4ge1xuICAgIGNvbnNvbGUubG9nKCdhZnRlciBzcGF3blByb21pc2UnKVxuICAgIHJldHVyblxuICB9KVxufVxuXG5cbnZhciBzcGF3blByb21pc2UgPSAoY29tbWFuZCwgYXJncywgb3B0aW9ucywgdmVyYm9zZSwgc3Vic3RyaW5ncykgPT4ge1xuICB2YXIgbm9FcnJvcnMgPSB0cnVlXG4gIGxldCBjaGlsZFxuICBsZXQgcHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblxuICAgIGNoaWxkID0gY3Jvc3NTcGF3bihcbiAgICAgIGNvbW1hbmQsIFxuICAgICAgYXJncywgXG4gICAgICBvcHRpb25zXG4gICAgKVxuICAgIGNoaWxkLm9uKCdjbG9zZScsIChjb2RlLCBzaWduYWwpID0+IHtcbiAgICAgIGlmKGNvZGUgPT09IDApIHtcbiAgICAgICAgaWYgKG5vRXJyb3JzKSB7XG4gICAgICAgICAgcmVzb2x2ZSh7Y29kZSwgc2lnbmFsfSlcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICByZWplY3QoJ2V4dC1idWlsZCBlcnJvcnMnKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgcmVqZWN0KCdleHQtYnVpbGQgZXJyb3JzLi4uJylcbiAgICAgIH1cbiAgICB9KVxuICAgIGNoaWxkLm9uKCdlcnJvcicsIChlcnJvcikgPT4ge1xuICAgICAgcmVqZWN0KGVycm9yKVxuICAgIH0pXG4gICAgaWYgKGNoaWxkLnN0ZG91dCkge1xuICAgICAgY2hpbGQuc3Rkb3V0Lm9uKCdkYXRhJywgKGRhdGEpID0+IHtcbiAgICAgICAgdmFyIHN0ciA9IGRhdGEudG9TdHJpbmcoKVxuICAgICAgICBzdHIgPSBzdHIucmVwbGFjZSgvXFxyP1xcbnxcXHIvZywgXCIgXCIpXG5cbiAgICAgICAgaWYgKGRhdGEgJiYgZGF0YS50b1N0cmluZygpLm1hdGNoKC9XYWl0aW5nIGZvciBjaGFuZ2VzXFwuXFwuXFwuLykpIHtcbiAgICAgICAgICByZXNvbHZlKHt9KVxuICAgICAgICB9XG5cblxuXG4gICAgICAgIGlmKHZlcmJvc2UgPT0gJ3llcycpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhgJHthcHB9JHtzdHJ9YCkgXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgaWYgKHN1YnN0cmluZ3Muc29tZShmdW5jdGlvbih2KSB7IHJldHVybiBkYXRhLmluZGV4T2YodikgPj0gMDsgfSkpIHsgXG4gICAgICAgICAgICBzdHIgPSBzdHIucmVwbGFjZShcIltJTkZdXCIsIFwiXCIpXG4gICAgICAgICAgICBzdHIgPSBzdHIucmVwbGFjZShwcm9jZXNzLmN3ZCgpLCAnJylcbiAgICAgICAgICAgIGlmIChzdHIuaW5jbHVkZXMoXCJbRVJSXVwiKSkge1xuICAgICAgICAgICAgICBjb25zdCBlcnIgPSBgJHtjaGFsay5yZWQoXCJbRVJSXVwiKX1gXG4gICAgICAgICAgICAgIHN0ciA9IHN0ci5yZXBsYWNlKFwiW0VSUl1cIiwgZXJyKVxuICAgICAgICAgICAgICBub0Vycm9ycyA9IGZhbHNlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgJHthcHB9JHtzdHJ9YCkgXG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIGVsc2Ugey8vbm90aGluZ31cbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBjb25zb2xlLmxvZyhgJHthcHB9ICR7Y2hhbGsucmVkKCdbRVJSXScpfSBubyBzdGRvdXRgKSBcbiAgICB9XG4gICAgaWYgKGNoaWxkLnN0ZGVycikge1xuICAgICAgY2hpbGQuc3RkZXJyLm9uKCdkYXRhJywgKGRhdGEpID0+IHtcbiAgICAgICAgdmFyIHN0ciA9IGRhdGEudG9TdHJpbmcoKVxuICAgICAgICB2YXIgcyA9IHN0ci5yZXBsYWNlKC9cXHI/XFxufFxcci9nLCBcIiBcIilcbiAgICAgICAgdmFyIHN0ckphdmFPcHRzID0gXCJQaWNrZWQgdXAgX0pBVkFfT1BUSU9OU1wiO1xuICAgICAgICB2YXIgaW5jbHVkZXMgPSBzLmluY2x1ZGVzKHN0ckphdmFPcHRzKVxuICAgICAgICBpZiAoIWluY2x1ZGVzKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coYCR7YXBwfSAke2NoYWxrLmJsYWNrKFwiW0VSUl1cIil9ICR7c31gKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGNvbnNvbGUubG9nKGAke2FwcH0gJHtjaGFsay5yZWQoJ1tFUlJdJyl9IG5vIHN0ZGVycmApIFxuICAgIH1cbiAgfSk7XG4gIHByb21pc2UuY2hpbGQgPSBjaGlsZFxuICByZXR1cm4gcHJvbWlzZVxufVxuXG4vL2V4cG9ydHMuZXJyID0gZnVuY3Rpb24gZXJyKHMpIHsgcmV0dXJuIGNoYWxrLnJlZCgnW0VSUl0gJykgKyBzIH1cbi8vZXhwb3J0cy5pbmYgPSBmdW5jdGlvbiBpbmYocykgeyByZXR1cm4gY2hhbGsuZ3JlZW4oJ1tJTkZdICcpICsgcyB9XG4vL2V4cG9ydHMud3JuID0gZnVuY3Rpb24gZXJyKHMpIHsgcmV0dXJuIGNoYWxrLnllbGxvdygnW1dSTl0gJykgKyBzIH1cbmV4cG9ydHMuZXJyTG9nID0gZnVuY3Rpb24gZXJyKHMpIHsgY29uc29sZS5sb2coY2hhbGsucmVkKCdbRVJSXSAnKSArIHMpIH1cbmV4cG9ydHMuaW5mTG9nID0gZnVuY3Rpb24gaW5mKHMpIHsgY29uc29sZS5sb2coY2hhbGsuZ3JlZW4oJ1tJTkZdICcpICsgcykgfVxuZXhwb3J0cy53cm5Mb2cgPSBmdW5jdGlvbiBlcnIocykgeyBjb25zb2xlLmxvZyhjaGFsay55ZWxsb3coJ1tXUk5dICcpICsgcykgfVxuLy9leHBvcnRzLmRiZ0xvZyA9IGZ1bmN0aW9uIGRiZ0xvZyhzKSB7IGlmIChkZWJ1ZykgY29uc29sZS5sb2coY2hhbGsuYmx1ZSgnW0RCR10gJykgKyBzKSB9XG5leHBvcnRzLmRiZ0xvZyA9IGZ1bmN0aW9uIGRiZ0xvZyhzKSB7ICB9XG5leHBvcnRzLmVyciA9IGZ1bmN0aW9uIGVycihzKSB7IHJldHVybiBjaGFsay5yZWQoJ1tFUlJdICcpICsgcyB9XG5leHBvcnRzLmluZiA9IGZ1bmN0aW9uIGluZihzKSB7IHJldHVybiBjaGFsay5ncmVlbignW0lORl0gJykgKyBzIH1cbmV4cG9ydHMud3JuID0gZnVuY3Rpb24gZXJyKHMpIHsgcmV0dXJuIGNoYWxrLnllbGxvdygnW1dSTl0gJykgKyBzIH1cbmV4cG9ydHMuZGJnID0gZnVuY3Rpb24gZXJyKHMpIHsgcmV0dXJuIGNoYWxrLmJsdWUoJ1tEQkddICcpICsgcyB9XG5cbnZhciBlcnJUaHJvdyA9IGZ1bmN0aW9uIGVycihzKSB7IHRocm93IGNoYWxrLnJlZCgnW0VSUl0gJykgKyBzIH1cbmV4cG9ydHMuZXJyVGhyb3cgPSBlcnJUaHJvd1xuZXhwb3J0cy5kYmdUaHJvdyA9IGZ1bmN0aW9uIGVycihzKSB7IHRocm93IGNoYWxrLmJsdWUoJ1tFUlJdICcpICsgcyB9XG5cbmV4cG9ydHMuZ2V0QXBwTmFtZSA9IGZ1bmN0aW9uIGdldEFwcE5hbWUoQ3VycldvcmtpbmdEaXIpIHtcblx0dmFyIGFwcEpzb25GaWxlTmFtZSA9IGdldEFwcEpzb24oQ3VycldvcmtpbmdEaXIpXG5cdGlmIChhcHBKc29uRmlsZU5hbWUgPT0gJycpIHtcblx0XHR0aHJvdyAnTm90IGEgU2VuY2hhIENtZCBwcm9qZWN0IC0gbm8gYXBwLmpzb24gZm91bmQnXG5cdH1cblx0dmFyIG9iakFwcEpzb24gPSBqc29uLnBhcnNlKGZzLnJlYWRGaWxlU3luYyhhcHBKc29uRmlsZU5hbWUpLnRvU3RyaW5nKCkpO1xuXHR2YXIgYXBwTmFtZSA9IG9iakFwcEpzb24ubmFtZVxuXHRyZXR1cm4gYXBwTmFtZVxufVxuXG5mdW5jdGlvbiBnZXRBcHBKc29uKEN1cnJXb3JraW5nRGlyKSB7XG5cdHZhciBteVN0cmluZ0FycmF5ID0gQ3VycldvcmtpbmdEaXIuc3BsaXQoJy8nKVxuXHR2YXIgYXJyYXlMZW5ndGggPSBteVN0cmluZ0FycmF5Lmxlbmd0aFxuXHR2YXIgYXBwSnNvbkZpbGUgPSAnJ1xuXHRmb3IgKHZhciBqID0gYXJyYXlMZW5ndGg7IGogPiAwOyBqLS0pIHtcblx0XHR2YXIgZGlyID0gJydcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGo7IGkrKykge1xuXHRcdFx0aWYgKG15U3RyaW5nQXJyYXlbaV0hPScnKSB7XG5cdFx0XHRcdGRpciA9IGRpciArICcvJyArIG15U3RyaW5nQXJyYXlbaV1cblx0XHRcdH1cblx0XHR9XG5cdFx0Ly8gdmFyIHdvcmtzcGFjZUpzb24gPSBkaXIgKyAnLycgKyAnd29ya3NwYWNlLmpzb24nXG5cdFx0Ly8gaWYgKGZzLmV4aXN0c1N5bmMod29ya3NwYWNlSnNvbikpIHtcblx0XHQvLyBcdGNvbnNvbGUubG9nKCd5ZXMgJyArIHdvcmtzcGFjZUpzb24pXG5cdFx0Ly8gfVxuXHRcdHZhciBhcHBKc29uID0gZGlyICsgJy8nICsgJ2FwcC5qc29uJ1xuLy9cdFx0Y29uc29sZS5sb2coYXBwSnNvbilcblx0XHRpZiAoZnMuZXhpc3RzU3luYyhhcHBKc29uKSkge1xuLy9cdFx0XHRjb25zb2xlLmxvZygnaGVyZScpXG5cdFx0XHRhcHBKc29uRmlsZSA9IGFwcEpzb25cblx0XHR9XG5cdH1cblx0cmV0dXJuIGFwcEpzb25GaWxlXG59XG5cbmV4cG9ydHMuZ2V0U2VuY2hhQ21kUGF0aCA9IGZ1bmN0aW9uIGdldFNlbmNoYUNtZFBhdGgodG9QYXRoLCBwYXRoKSB7XG5cdHBhdGhWYXIgPSBwcm9jZXNzLmVudi5QQVRIXG5cdHZhciBteVN0cmluZ0FycmF5ID0gcGF0aFZhci5zcGxpdCgnOicpXG5cdHZhciBhcnJheUxlbmd0aCA9IG15U3RyaW5nQXJyYXkubGVuZ3RoXG5cdHZhciBwYXRoU2VuY2hhQ21kID0gJydcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBhcnJheUxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIHN0ciA9IG15U3RyaW5nQXJyYXlbaV1cblx0XHR2YXIgbiA9IHN0ci5pbmRleE9mKFwiU2VuY2hhL0NtZFwiKTtcblx0XHRpZiAobiAhPSAtMSkge1xuXHRcdFx0cGF0aFNlbmNoYUNtZCA9IHN0clxuXHRcdH1cblx0fVxuXHQvL3ZhciBvdGhlciA9ICcvcGx1Z2lucy9leHQvY3VycmVudCdcblx0Ly9jb25zb2xlLmxvZyhwYXRoU2VuY2hhQ21kICsgb3RoZXIpXG5cdHJldHVybiBwYXRoU2VuY2hhQ21kXG59XG5cbmV4cG9ydHMuaGFuZGxlT3V0cHV0ID0gKGNoaWxkKSA9PiB7XG4gIGNoaWxkLm9uKCdleGl0JywgZnVuY3Rpb24gKGNvZGUsIHNpZ25hbCkge1xuICAgIGNvbnNvbGUubG9nKGBjaGlsZCBwcm9jZXNzIGV4aXRlZCB3aXRoIGNvZGUgJHtjb2RlfSBhbmQgc2lnbmFsICR7c2lnbmFsfWApO1xuICB9KTtcbiAgY2hpbGQuc3Rkb3V0Lm9uKCdkYXRhJywgKGRhdGEpID0+IHtcbiAgICB2YXIgc3Vic3RyaW5ncyA9IERFRkFVTFRfU1VCU1RSUztcbiAgICBpZiAoc3Vic3RyaW5ncy5zb21lKGZ1bmN0aW9uKHYpIHsgcmV0dXJuIGRhdGEuaW5kZXhPZih2KSA+PSAwOyB9KSkgeyBcbiAgICAgIHZhciBzdHIgPSBkYXRhLnRvU3RyaW5nKClcbiAgICAgIHZhciBzID0gc3RyLnJlcGxhY2UoL1xccj9cXG58XFxyL2csIFwiIFwiKVxuICAgICAgY29uc29sZS5sb2coYCR7c31gKSBcbiAgICB9XG4gIH0pO1xuICBjaGlsZC5zdGRlcnIub24oJ2RhdGEnLCAoZGF0YSkgPT4ge1xuICAgIGNvbnNvbGUuZXJyb3IoYEU6JHtkYXRhfWApO1xuICB9KTtcbiAgcmV0dXJuIGNoaWxkO1xufVxuXG5cblxuXG5cblxuXG4vLyBhc3luYyBleGVjdXRlQXN5bmMyKHBhcm1zKSB7XG4vLyAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbi8vICAgICB2YXIgY2hpbGQgPSBzcGF3bihzZW5jaGEsIHBhcm1zKVxuLy8gICAgIGNoaWxkLm9uKCdleGl0JywgZnVuY3Rpb24gKGNvZGUsIHNpZ25hbCkge1xuLy8gICAgICAgcmVzb2x2ZSgwKSBcbi8vICAgICB9KVxuLy8gICAgIGNoaWxkLnN0ZG91dC5vbignZGF0YScsIChkYXRhKSA9PiB7XG4vLyAgICAgICB2YXIgc3Vic3RyaW5ncyA9IFtcIltJTkZdIFdyaXRpbmcgeGNvbnRlbnRcIiwgJ1tFUlJdJywgJ1tXUk5dJywgJ1tJTkZdIFByb2Nlc3NpbmcnLCBcIltJTkZdIFNlcnZlclwiLCBcIltJTkZdIExvYWRpbmcgQnVpbGRcIiwgXCJbSU5GXSBXYWl0aW5nXCIsIFwiW0xPR10gRmFzaGlvbiB3YWl0aW5nXCJdXG4vLyAgICAgICBpZiAoc3Vic3RyaW5ncy5zb21lKGZ1bmN0aW9uKHYpIHsgcmV0dXJuIGRhdGEuaW5kZXhPZih2KSA+PSAwOyB9KSkgeyBcbi8vICAgICAgICAgdmFyIHN0ciA9IGRhdGEudG9TdHJpbmcoKVxuLy8gICAgICAgICB2YXIgcyA9IHN0ci5yZXBsYWNlKC9cXHI/XFxufFxcci9nLCBcIiBcIilcbi8vICAgICAgICAgdmFyIHMyID0gcy5yZXBsYWNlKFwiW0lORl1cIiwgXCJcIilcbi8vICAgICAgICAgY29uc29sZS5sb2coYCR7YXBwfSAke3MyfWApIFxuLy8gICAgICAgfVxuLy8gICAgIH0pXG4vLyAgICAgY2hpbGQuc3RkZXJyLm9uKCdkYXRhJywgKGRhdGEpID0+IHtcbi8vICAgICAgIHZhciBzdHIgPSBkYXRhLnRvU3RyaW5nKClcbi8vICAgICAgIHZhciBzID0gc3RyLnJlcGxhY2UoL1xccj9cXG58XFxyL2csIFwiIFwiKVxuLy8gICAgICAgY29uc29sZS5sb2coYCR7YXBwfSAke2NoYWxrLnJlZChcIltFUlJdXCIpfSAke3N9YCkgXG4vLyAgICAgfSlcbi8vICAgfSlcbi8vIH1cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cbi8vIGNvbnN0IHNwYXduID0gcmVxdWlyZSgnY2hpbGRfcHJvY2VzcycpLnNwYXduO1xuLy8gdmFyIHNwYXduID0gcmVxdWlyZSgnY2hpbGQtcHJvY2Vzcy1wcm9taXNlJykuc3Bhd247XG4vLyBmdW5jdGlvbiBleGVjdXRlQ29tbWFuZChjbWQsIGFyZ3MpIHtcbi8vICAgICB2YXIgcHJvbWlzZSA9IHNwYXduKGNtZCwgYXJncyk7XG4gXG4vLyAgICAgdmFyIGNoaWxkUHJvY2VzcyA9IHByb21pc2UuY2hpbGRQcm9jZXNzO1xuICAgIFxuLy8gICAgIGNvbnNvbGUubG9nKCdbc3Bhd25dIGNoaWxkUHJvY2Vzcy5waWQ6ICcsIGNoaWxkUHJvY2Vzcy5waWQpO1xuLy8gICAgIGNoaWxkUHJvY2Vzcy5zdGRvdXQub24oJ2RhdGEnLCBmdW5jdGlvbiAoZGF0YSkge1xuLy8gICAgICAgICBjb25zb2xlLmxvZygnW3NwYXduXSBzdGRvdXQ6ICcsIGRhdGEudG9TdHJpbmcoKSk7XG4vLyAgICAgfSk7XG4vLyAgICAgY2hpbGRQcm9jZXNzLnN0ZGVyci5vbignZGF0YScsIGZ1bmN0aW9uIChkYXRhKSB7XG4vLyAgICAgICAgIGNvbnNvbGUubG9nKCdbc3Bhd25dIHN0ZGVycjogJywgZGF0YS50b1N0cmluZygpKTtcbi8vICAgICB9KTtcbi8vICAgICByZXR1cm4gcHJvbWlzZTtcbi8vIH1cblxuLy8gZXhwb3J0cy5zZW5jaGFDbWQyID0gKHBhcm1zKSA9PiB7XG4vLyAgIHByb2Nlc3Muc3Rkb3V0LmN1cnNvclRvKDApO2NvbnNvbGUubG9nKGFwcCArICdzdGFydGVkIC0gc2VuY2hhICcgKyBwYXJtcy50b1N0cmluZygpLnJlcGxhY2UoLywvZyAsIFwiIFwiKSArICdcXG4nKVxuLy8gICBhd2FpdCBleGVjdXRlQ29tbWFuZChzZW5jaGEsIHBhcm1zKVxuLy8gICBwcm9jZXNzLnN0ZG91dC5jdXJzb3JUbygwKTtjb25zb2xlLmxvZyhhcHAgKyAnY29tcGxldGVkIC0gc2VuY2hhICcgKyBwYXJtcy50b1N0cmluZygpLnJlcGxhY2UoLywvZyAsIFwiIFwiKSlcblxuLy8gfVxuXG5cbi8vIGFzeW5jIGZ1bmN0aW9uIGV4ZWN1dGVyKCkge1xuLy8gICAgIGNvbnNvbGUubG9nKCdbTUFJTl0gc3RhcnQnKTtcbi8vICAgICBhd2FpdCBleGVjdXRlQ29tbWFuZCgnZWNobycsIFsnaW5mbyddKTtcbi8vICAgICBjb25zb2xlLmxvZygnW01BSU5dIGVuZCcpO1xuLy8gfVxuIFxuLy8gZXhlY3V0ZXIoKTtcblxuXG5cblxuXG5cblxuIl19