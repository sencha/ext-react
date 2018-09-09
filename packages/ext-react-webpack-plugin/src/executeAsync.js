var chalk = require('chalk')
const crossSpawn = require('cross-spawn')
var prefix = ``;if (require('os').platform() == 'darwin') {prefix = `ℹ ｢ext｣:`} else {prefix = `i [ext]:`}
const app = `${chalk.green(prefix)} ext-build:`
const DEFAULT_SUBSTRS = ['[INF] Loading', '[LOG] Fashion build complete', '[ERR]', '[WRN]', '[INF] Processing', "[INF] Server", "[INF] Writing", "[INF] Loading Build", "[INF] Waiting", "[LOG] Fashion waiting"];

export async function executeAsync (command, parms, options, compilation, cmdErrors, verbose = 'no', substrings = DEFAULT_SUBSTRS ) {
  await new Promise((resolve, reject) => {
    let child = crossSpawn(command, parms, options)
    child.on('close', (code, signal) => {
      if(code === 0) { resolve(0) }
      else { compilation.errors.push( new Error(cmdErrors.join("")) ); reject(0) }
    })
    child.on('error', (error) => { reject(error) })
    child.stdout.on('data', (data) => {
      var str = data.toString().replace(/\r?\n|\r/g, " ").trim()
      if (data && data.toString().match(/Waiting for changes\.\.\./)) {
        resolve(0)
      }
      if(verbose == 'yes') {
        console.log(`-v-${app}${str}`) 
      }
      else {
        if (substrings.some(function(v) { return data.indexOf(v) >= 0; })) { 
          str = str.replace("[INF]", "")
          str = str.replace("[LOG]", "")
          str = str.replace(process.cwd(), '')
          if (str.includes("[ERR]")) {
            cmdErrors.push(app + str.replace(/^\[ERR\] /gi, ''));
            str = str.replace("[ERR]", `${chalk.red("[ERR]")}`)
          }
          console.log(`${app}${str}`) 
        }
      }
    })
    child.stderr.on('data', (data) => {
      var str = data.toString().replace(/\r?\n|\r/g, " ").trim()
      var strJavaOpts = "Picked up _JAVA_OPTIONS";
      var includes = str.includes(strJavaOpts)
      if (!includes) {
        console.log(`${app} ${chalk.red("[ERR]")} ${str}`)
      }
    })
  })
}
