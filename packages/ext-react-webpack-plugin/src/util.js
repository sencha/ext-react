const npmScope = '@sencha'
var chalk = require('chalk');
var fs = require('fs-extra')
//var json = require('comment-json');
//const sencha = require(`${npmScope}/cmd`)

const sencha = require(`@extjs/sencha-cmd`)

const spawnSync = require('child_process').spawnSync
const spawn = require('child_process').spawn
const crossSpawn = require('cross-spawn')

var prefix = ``
if (require('os').platform() == 'darwin') {
  prefix = `ℹ ｢ext｣:`
}
else {
  prefix = `i [ext]:`
}
const app = `${chalk.green(prefix)} ext-build-util:`
const DEFAULT_SUBSTRS = ['[ERR]', '[WRN]', '[INF] Processing', "[INF] Server", "[INF] Writing content", "[INF] Loading Build", "[INF] Waiting", "[LOG] Fashion waiting"];

exports.senchaCmd = (parms) => {
  process.stdout.cursorTo(0);console.log(app + 'started - sencha ' + parms.toString().replace(/,/g , " ") + '\n')
  spawnSync(sencha, parms, { stdio: 'inherit', encoding: 'utf-8'})
  process.stdout.cursorTo(0);console.log(app + 'completed - sencha ' + parms.toString().replace(/,/g , " "))
}

exports.senchaCmdAsync = async (parms, output, verbose, substrings = DEFAULT_SUBSTRS) => {
  console.log('here')
  spawnPromise(sencha, parms, { stdio: 'pipe', encoding: 'utf-8',cwd: output }, verbose, substrings) .then(() => {
    console.log('after spawnPromise')
    return
  })
}


var spawnPromise = (command, args, options, verbose, substrings) => {
  var noErrors = true
  let child
  let promise = new Promise((resolve, reject) => {

    child = crossSpawn(
      command, 
      args, 
      options
    )
    child.on('close', (code, signal) => {
      if(code === 0) {
        if (noErrors) {
          resolve({code, signal})
        }
        else {
          reject('ext-build errors')
        }
      }
      else {
        reject('ext-build errors...')
      }
    })
    child.on('error', (error) => {
      reject(error)
    })
    if (child.stdout) {
      child.stdout.on('data', (data) => {
        var str = data.toString()
        str = str.replace(/\r?\n|\r/g, " ")

        if (data && data.toString().match(/Waiting for changes\.\.\./)) {
          resolve({})
        }



        if(verbose == 'yes') {
          console.log(`${app}${str}`) 
        }
        else {
          if (substrings.some(function(v) { return data.indexOf(v) >= 0; })) { 
            str = str.replace("[INF]", "")
            str = str.replace(process.cwd(), '')
            if (str.includes("[ERR]")) {
              const err = `${chalk.red("[ERR]")}`
              str = str.replace("[ERR]", err)
              noErrors = false
            }
            console.log(`${app}${str}`) 
          }
          // else {//nothing}
        }
      })
    }
    else {
      console.log(`${app} ${chalk.red('[ERR]')} no stdout`) 
    }
    if (child.stderr) {
      child.stderr.on('data', (data) => {
        var str = data.toString()
        var s = str.replace(/\r?\n|\r/g, " ")
        var strJavaOpts = "Picked up _JAVA_OPTIONS";
        var includes = s.includes(strJavaOpts)
        if (!includes) {
          console.log(`${app} ${chalk.black("[ERR]")} ${s}`)
        }
      })
    }
    else {
      console.log(`${app} ${chalk.red('[ERR]')} no stderr`) 
    }
  });
  promise.child = child
  return promise
}

//exports.err = function err(s) { return chalk.red('[ERR] ') + s }
//exports.inf = function inf(s) { return chalk.green('[INF] ') + s }
//exports.wrn = function err(s) { return chalk.yellow('[WRN] ') + s }
exports.errLog = function err(s) { console.log(chalk.red('[ERR] ') + s) }
exports.infLog = function inf(s) { console.log(chalk.green('[INF] ') + s) }
exports.wrnLog = function err(s) { console.log(chalk.yellow('[WRN] ') + s) }
//exports.dbgLog = function dbgLog(s) { if (debug) console.log(chalk.blue('[DBG] ') + s) }
exports.dbgLog = function dbgLog(s) {  }
exports.err = function err(s) { return chalk.red('[ERR] ') + s }
exports.inf = function inf(s) { return chalk.green('[INF] ') + s }
exports.wrn = function err(s) { return chalk.yellow('[WRN] ') + s }
exports.dbg = function err(s) { return chalk.blue('[DBG] ') + s }

var errThrow = function err(s) { throw chalk.red('[ERR] ') + s }
exports.errThrow = errThrow
exports.dbgThrow = function err(s) { throw chalk.blue('[ERR] ') + s }

exports.getAppName = function getAppName(CurrWorkingDir) {
	var appJsonFileName = getAppJson(CurrWorkingDir)
	if (appJsonFileName == '') {
		throw 'Not a Sencha Cmd project - no app.json found'
	}
	var objAppJson = json.parse(fs.readFileSync(appJsonFileName).toString());
	var appName = objAppJson.name
	return appName
}

function getAppJson(CurrWorkingDir) {
	var myStringArray = CurrWorkingDir.split('/')
	var arrayLength = myStringArray.length
	var appJsonFile = ''
	for (var j = arrayLength; j > 0; j--) {
		var dir = ''
		for (var i = 0; i < j; i++) {
			if (myStringArray[i]!='') {
				dir = dir + '/' + myStringArray[i]
			}
		}
		// var workspaceJson = dir + '/' + 'workspace.json'
		// if (fs.existsSync(workspaceJson)) {
		// 	console.log('yes ' + workspaceJson)
		// }
		var appJson = dir + '/' + 'app.json'
//		console.log(appJson)
		if (fs.existsSync(appJson)) {
//			console.log('here')
			appJsonFile = appJson
		}
	}
	return appJsonFile
}

exports.getSenchaCmdPath = function getSenchaCmdPath(toPath, path) {
	pathVar = process.env.PATH
	var myStringArray = pathVar.split(':')
	var arrayLength = myStringArray.length
	var pathSenchaCmd = ''
	for (var i = 0; i < arrayLength; i++) {
		var str = myStringArray[i]
		var n = str.indexOf("Sencha/Cmd");
		if (n != -1) {
			pathSenchaCmd = str
		}
	}
	//var other = '/plugins/ext/current'
	//console.log(pathSenchaCmd + other)
	return pathSenchaCmd
}

exports.handleOutput = (child) => {
  child.on('exit', function (code, signal) {
    console.log(`child process exited with code ${code} and signal ${signal}`);
  });
  child.stdout.on('data', (data) => {
    var substrings = DEFAULT_SUBSTRS;
    if (substrings.some(function(v) { return data.indexOf(v) >= 0; })) { 
      var str = data.toString()
      var s = str.replace(/\r?\n|\r/g, " ")
      console.log(`${s}`) 
    }
  });
  child.stderr.on('data', (data) => {
    console.error(`E:${data}`);
  });
  return child;
}







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







