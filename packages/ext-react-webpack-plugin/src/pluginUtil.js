var chalk = require('chalk')
const path = require('path')
const fs = require('fs')
const crossSpawn = require('cross-spawn')
var prefix = ``;if (require('os').platform() == 'darwin') {prefix = `ℹ ｢ext｣:`} else {prefix = `i [ext]:`}
const app = `${chalk.green(prefix)} ext-build:`
const DEFAULT_SUBSTRS = ['[INF] Loading', '[LOG] Fashion build complete', '[ERR]', '[WRN]', '[INF] Processing', "[INF] Server", "[INF] Writing", "[INF] Loading Build", "[INF] Waiting", "[LOG] Fashion waiting"];


export function _getApp(pluginName) {
  var prefix = ``
  const platform = require('os').platform()
  if (platform == 'darwin') { prefix = `ℹ ｢ext｣:` }
  else { prefix = `i [ext]:` }
  return `${chalk.green(prefix)} ${pluginName}: `
}


export function _getVersions(app, pluginName, frameworkName) {
  var v = {}
  var pluginPath = path.resolve(process.cwd(),'node_modules/@sencha', pluginName)
  console.log(pluginPath)
  var pluginPkg = (fs.existsSync(pluginPath+'/package.json') && JSON.parse(fs.readFileSync(pluginPath+'/package.json', 'utf-8')) || {});
  v.pluginVersion = pluginPkg.version

  var webpackPath = path.resolve(process.cwd(),'node_modules/webpack')
  var webpackPkg = (fs.existsSync(webpackPath+'/package.json') && JSON.parse(fs.readFileSync(webpackPath+'/package.json', 'utf-8')) || {});
  v.webpackVersion = webpackPkg.version

  var extPath = path.resolve(process.cwd(),'node_modules/@sencha/ext')
  var extPkg = (fs.existsSync(extPath+'/package.json') && JSON.parse(fs.readFileSync(extPath+'/package.json', 'utf-8')) || {});
  v.extVersion = extPkg.sencha.version

  var cmdPath = path.resolve(pluginPath,'node_modules/@sencha/cmd')
  var cmdPkg = (fs.existsSync(cmdPath+'/package.json') && JSON.parse(fs.readFileSync(cmdPath+'/package.json', 'utf-8')) || {});
  v.cmdVersion = cmdPkg.version_full

  var frameworkInfo = ''
  if (frameworkName != undefined) {
    var frameworkPath = path.resolve(process.cwd(),'node_modules', frameworkName)
    var frameworkPkg = (fs.existsSync(frameworkPath+'/package.json') && JSON.parse(fs.readFileSync(frameworkPath+'/package.json', 'utf-8')) || {});
    v.frameworkVersion = frameworkPkg.version
    frameworkInfo = ', ' + frameworkName + ' v' + v.frameworkVersion
  }

  return app + 'v' + v.pluginVersion + ', Ext JS v' + v.extVersion + ', Sencha Cmd v' + v.cmdVersion + ', Webpack v' + v.webpackVersion + frameworkInfo
}




function _getSenchCmdPath() {
  try { return require('@sencha/cmd') } 
  catch (e) { return 'sencha' }
}

export function _buildExtBundle(compilation, cmdErrors, output, parms, verbose) {
  let sencha = _getSenchCmdPath()

 return new Promise((resolve, reject) => {
   const onBuildDone = () => {
     if (cmdErrors.length) {
       reject(new Error(cmdErrors.join("")))
     } else {
       resolve()
     }
   }

   var opts = { cwd: output, silent: true, stdio: 'pipe', encoding: 'utf-8'}
   executeAsync(sencha, parms, opts, compilation, cmdErrors, verbose).then (
     function() { onBuildDone() }, 
     function(reason) { resolve(reason) }
   )
 })
}




export async function executeAsync (command, parms, options, compilation, cmdErrors, verbose = 'no', substrings = DEFAULT_SUBSTRS ) {
  await new Promise((resolve, reject) => {
    if(verbose == 'yes') {
      console.log(`-v-${app} command - ${command}`) 
      console.log(`-v-${app} parms - ${parms}`) 
      console.log(`-v-${app} options - ${JSON.stringify(options)}`) 
    }
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
