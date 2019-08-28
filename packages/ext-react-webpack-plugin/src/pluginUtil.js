//**********
export function _constructor(initialOptions) {
  const fs = require('fs')
  var vars = {}
  var options = {}
  try {
    if (initialOptions.framework == undefined) {
      vars.pluginErrors = []
      vars.pluginErrors.push('webpack config: framework parameter on ext-webpack-plugin is not defined - values: react, angular, extjs, components')
      var o = {}
      o.vars = vars
      return o
    }
    var framework = initialOptions.framework
    var treeshake = initialOptions.treeshake
    var verbose = initialOptions.verbose

    const validateOptions = require('schema-utils')
    validateOptions(_getValidateOptions(), initialOptions, '')

    const rc = (fs.existsSync(`.ext-${framework}rc`) && JSON.parse(fs.readFileSync(`.ext-${framework}rc`, 'utf-8')) || {})
    options = { ..._getDefaultOptions(), ...initialOptions, ...rc }

    vars = require(`./${framework}Util`)._getDefaultVars()
    vars.pluginName = 'ext-webpack-plugin'
    vars.app = _getApp()
    var pluginName = vars.pluginName
    var app = vars.app

    logv(verbose, 'FUNCTION _constructor')
    logv(verbose, `pluginName - ${pluginName}`)
    logv(verbose, `app - ${app}`)

    if (options.environment == 'production') {
      vars.production = true
      options.browser = 'no'
      options.watch = 'no'
    }
    else {
      vars.production = false
    }
    
    //logv(verbose, `options:`);if (verbose == 'yes') {console.dir(options)}
    //logv(verbose, `vars:`);if (verbose == 'yes') {console.dir(vars)}
    
    log(app, _getVersions(pluginName, framework))

    if (framework == 'react' || framework == 'extjs') {
      if (vars.production == true) {
        vars.buildstep = '1 of 1'
        log(app, 'Starting Production Build for ' + framework)
      }
      else {
        vars.buildstep = '1 of 1'
        log(app, 'Starting development build for ' + framework)
      }
    }
    else if (vars.production == true) {
      if (treeshake == 'yes') {
        vars.buildstep = '1 of 2'
        log(app, 'Starting production build for ' + framework + ' - ' + vars.buildstep)
        require(`./${framework}Util`)._toProd(vars, options)
      }
      else {
        vars.buildstep = '2 of 2'
        log(app, 'Continuing production build for ' + framework + ' - ' + vars.buildstep)
      }
    }
    else {
      vars.buildstep = '1 of 1'
      log(app, 'Starting development build for ' + framework)
    }
    logv(verbose, 'Building for ' + options.environment + ', ' + 'Treeshake is ' + options.treeshake)

    var o = {}
    o.vars = vars
    o.options = options
    return o
  }
  catch (e) {
    throw '_constructor: ' + e.toString()
  }
}

//**********
export function _thisCompilation(compiler, compilation, vars, options) {
  try {
    var app = vars.app
    var verbose = options.verbose
    logv(verbose, 'FUNCTION _thisCompilation')
    logv(verbose, `options.script: ${options.script }`)
    logv(verbose, `buildstep: ${vars.buildstep}`)

    if (vars.buildstep == '1 of 1' || vars.buildstep == '1 of 2') {
      if (options.script != undefined) {
          if (options.script != null) {
            if (options.script != '') {
            log(app, `Started running ${options.script}`)
            runScript(options.script, function (err) {
              if (err) throw err;
              log(app, `Finished running ${options.script}`)
          });
          }
        }
      }
    }
  }
  catch(e) {
    throw '_thisCompilation: ' + e.toString()
  }
}

//**********
export function _compilation(compiler, compilation, vars, options) {
  try {
    var app = vars.app
    var verbose = options.verbose
    var framework = options.framework
    logv(verbose, 'FUNCTION _compilation')
    
    if (framework == 'extjs') {
      logv(verbose, 'FUNCTION _compilation end (extjs)')
      return
    }
    var extComponents = []
    if (vars.buildstep == '1 of 2') {
      extComponents = require(`./${framework}Util`)._getAllComponents(vars, options)
    }
    compilation.hooks.succeedModule.tap(`ext-succeed-module`, module => {
      if (module.resource && !module.resource.match(/node_modules/)) {
        if(module.resource.match(/\.html$/) != null) {
          if(module._source._value.toLowerCase().includes('doctype html') == false) {
            vars.deps = [
              ...(vars.deps || []),
              ...require(`./${framework}Util`)._extractFromSource(module, options, compilation, extComponents)]
          }
        }
        else {
          vars.deps = [
            ...(vars.deps || []),
            ...require(`./${framework}Util`)._extractFromSource(module, options, compilation, extComponents)]
        }
      }
    })
    if (vars.buildstep == '1 of 2') {
      compilation.hooks.finishModules.tap(`ext-finish-modules`, modules => {
        require(`./${framework}Util`)._writeFilesToProdFolder(vars, options)
      })
    }
    if (vars.buildstep == '1 of 1' || vars.buildstep == '2 of 2') {
      compilation.hooks.htmlWebpackPluginBeforeHtmlGeneration.tap(`ext-html-generation`,(data) => {
        const path = require('path')
        var jsPath = path.join(vars.extPath, 'ext.js')
        var cssPath = path.join(vars.extPath, 'ext.css')
        data.assets.js.unshift(jsPath)
        data.assets.css.unshift(cssPath)
        log(app, `Adding ${jsPath} and ${cssPath} to index.html`)
      })
    }
  }
  catch(e) {
    throw '_compilation: ' + e.toString()
//    logv(options.verbose,e)
//    compilation.errors.push('_compilation: ' + e)
  }
}

//**********
export function _afterCompile(compiler, compilation, vars, options) {
  try {
    var app = vars.app
    var verbose = options.verbose
    var framework = options.framework
    logv(verbose, 'FUNCTION _afterCompile')
    if (framework == 'extjs') {
      require(`./extjsUtil`)._afterCompile(compilation, vars, options)
    }
    else {
      logv(verbose, 'FUNCTION _afterCompile not run')
    }
  }
  catch(e) {
    throw '_afterCompile: ' + e.toString()
  }
}

//**********
export async function _emit(compiler, compilation, vars, options, callback) {
  try {
    const path = require('path')
    var app = vars.app
    var verbose = options.verbose
    var emit = options.emit
    var framework = options.framework
    logv(verbose,'FUNCTION _emit')
    if (emit == 'yes') {
      if (vars.buildstep == '1 of 1' || vars.buildstep == '1 of 2') {
        let outputPath = path.join(compiler.outputPath,vars.extPath)
        if (compiler.outputPath === '/' && compiler.options.devServer) {
          outputPath = path.join(compiler.options.devServer.contentBase, outputPath)
        }
        logv(verbose,'outputPath: ' + outputPath)
        logv(verbose,'framework: ' + framework)
        if (framework != 'extjs') {
          _prepareForBuild(app, vars, options, outputPath, compilation)
        }
        var command = ''
        if (options.watch == 'yes' && vars.production == false)
          {command = 'watch'}
        else 
          {command = 'build'}
        if (vars.rebuild == true) {
          var parms = []
          if (options.profile == undefined || options.profile == '' || options.profile == null) {
            if (command == 'build')
              { parms = ['app', command, options.environment] }
            else 
              { parms = ['app', command, '--web-server', 'false', options.environment] }
          }
          else {
            if (command == 'build') 
              {parms = ['app', command, options.profile, options.environment]}
            else 
              {parms = ['app', command, '--web-server', 'false', options.profile, options.environment]}
          }
          if (vars.watchStarted == false) {
            await _buildExtBundle(app, compilation, outputPath, parms, vars, options)
            vars.watchStarted = true
          }
          callback()
        }
        else {
          callback()
        }
      }
      else {
        logv(verbose,'NOT running emit')
        callback()
      }
    }
    else {
      logv(verbose,'emit is no')
      callback()
    }
  }
  catch(e) {
    callback()
    throw '_emit: ' + e.toString()
    // logv(options.verbose,e)
    // compilation.errors.push('_emit: ' + e)
    // callback()
  }
}

//**********
export function _done(stats, vars, options) {
  try {
    var verbose = options.verbose
    var framework = options.framework
    logv(verbose,'FUNCTION _done')
    if (stats.compilation.errors && stats.compilation.errors.length) // && process.argv.indexOf('--watch') == -1)
    {
      var chalk = require('chalk');
      console.log(chalk.red('******************************************'));
      console.log(stats.compilation.errors[0]);
      console.log(chalk.red('******************************************'));
      process.exit(0);
    }

    //mjg refactor
    if (vars.production == true && options.treeshake == 'no' && framework == 'angular') {
      require(`./${options.framework}Util`)._toDev(vars, options)
    }
    try {
      if(options.browser == 'yes' && options.watch == 'yes' && vars.production == false) {
        if (vars.browserCount == 0) {
          var url = 'http://localhost:' + options.port
          require('./pluginUtil').log(vars.app, `Opening browser at ${url}`)
          vars.browserCount++
          const opn = require('opn')
          opn(url)
        }
      }
    }
    catch (e) {
      console.log(e)
    }
    if (vars.buildstep == '1 of 1') {
      if (vars.production == true) {
        require('./pluginUtil').log(vars.app, `Ending production build`)
      }
      else {
        require('./pluginUtil').log(vars.app, `Ending development build`)
      }
    }
    if (vars.buildstep == '2 of 2') {
      require('./pluginUtil').log(vars.app, `Ending production build`)
    }
  }
  catch(e) {
//    require('./pluginUtil').logv(options.verbose,e)
    throw '_done: ' + e.toString()
  }
}

//**********
export function _prepareForBuild(app, vars, options, output, compilation) {
  try {
    var verbose = options.verbose
    var packages = options.packages
    var toolkit = options.toolkit
    var theme = options.theme
    logv(verbose,'FUNCTION _prepareForBuild')
    const rimraf = require('rimraf')
    const mkdirp = require('mkdirp')
    const fsx = require('fs-extra')
    const fs = require('fs')
    const path = require('path')
    theme = theme || (toolkit === 'classic' ? 'theme-triton' : 'theme-material')
    logv(verbose,'firstTime: ' + vars.firstTime)
    if (vars.firstTime) {
      rimraf.sync(output)
      mkdirp.sync(output)
      const buildXML = require('./artifacts').buildXML
      const createAppJson = require('./artifacts').createAppJson
      const createWorkspaceJson = require('./artifacts').createWorkspaceJson
      const createJSDOMEnvironment = require('./artifacts').createJSDOMEnvironment
      fs.writeFileSync(path.join(output, 'build.xml'), buildXML(vars.production, options, output), 'utf8')
      fs.writeFileSync(path.join(output, 'app.json'), createAppJson(theme, packages, toolkit, options, output), 'utf8')
      fs.writeFileSync(path.join(output, 'jsdom-environment.js'), createJSDOMEnvironment(options, output), 'utf8')
      fs.writeFileSync(path.join(output, 'workspace.json'), createWorkspaceJson(options, output), 'utf8')
      var framework = vars.framework;
      //because of a problem with colorpicker
      if (fs.existsSync(path.join(process.cwd(),`ext-${framework}/ux/`))) {
        var fromPath = path.join(process.cwd(), `ext-${framework}/ux/`)
        var toPath = path.join(output, 'ux')
        fsx.copySync(fromPath, toPath)
        log(app, 'Copying (ux) ' + fromPath.replace(process.cwd(), '') + ' to: ' + toPath.replace(process.cwd(), ''))
      }
      if (fs.existsSync(path.join(process.cwd(),`ext-${framework}/packages/`))) {
        var fromPath = path.join(process.cwd(), `ext-${framework}/packages/`)
        var toPath = path.join(output, 'packages')
        fsx.copySync(fromPath, toPath)
        log(app, 'Copying ' + fromPath.replace(process.cwd(), '') + ' to: ' + toPath.replace(process.cwd(), ''))
      }
      if (fs.existsSync(path.join(process.cwd(),`ext-${framework}/overrides/`))) {
        var fromPath = path.join(process.cwd(), `ext-${framework}/overrides/`)
        var toPath = path.join(output, 'overrides')
        fsx.copySync(fromPath, toPath)
        log(app, 'Copying ' + fromPath.replace(process.cwd(), '') + ' to: ' + toPath.replace(process.cwd(), ''))
      }
      if (fs.existsSync(path.join(process.cwd(),'resources/'))) {
        var fromResources = path.join(process.cwd(), 'resources/')
        var toResources = path.join(output, '../resources')
        fsx.copySync(fromResources, toResources)
        log(app, 'Copying ' + fromResources.replace(process.cwd(), '') + ' to: ' + toResources.replace(process.cwd(), ''))
      }
    }
    vars.firstTime = false
    var js = ''
    if (vars.production) {
      js = vars.deps.join(';\n');
    }
    else {
      js = 'Ext.require(["Ext.*","Ext.data.TreeStore"])'
    }
    if (vars.manifest === null || js !== vars.manifest) {
      vars.manifest = js
      const manifest = path.join(output, 'manifest.js')
      fs.writeFileSync(manifest, js, 'utf8')
      vars.rebuild = true
      var bundleDir = output.replace(process.cwd(), '')
      if (bundleDir.trim() == '') {bundleDir = './'}
      log(app, 'Building Ext bundle at: ' + bundleDir)
    }
    else {
      vars.rebuild = false
      log(app, 'Ext rebuild NOT needed')
    }
  }
  catch(e) {
    require('./pluginUtil').logv(options.verbose,e)
    compilation.errors.push('_prepareForBuild: ' + e)
  }
}

//**********
export function _buildExtBundle(app, compilation, outputPath, parms, vars, options) {
//  try {
    var verbose = options.verbose
    const fs = require('fs')
    logv(verbose,'FUNCTION _buildExtBundle')
    let sencha; try { sencha = require('@sencha/cmd') } catch (e) { sencha = 'sencha' }
    if (fs.existsSync(sencha)) {
      logv(verbose,'sencha folder exists')
    }
    else {
      logv(verbose,'sencha folder DOES NOT exist')
    }
    return new Promise((resolve, reject) => {
      const onBuildDone = () => {
        logv(verbose,'onBuildDone')
        resolve()
      }
      var opts = { cwd: outputPath, silent: true, stdio: 'pipe', encoding: 'utf-8'}
      _executeAsync(app, sencha, parms, opts, compilation, vars, options).then (
        function() { onBuildDone() }, 
        function(reason) { reject(reason) }
      )
    })
  // }
  // catch(e) {
  //   console.log('e')
  //   require('./pluginUtil').logv(options.verbose,e)
  //   compilation.errors.push('_buildExtBundle: ' + e)
  //   callback()
  // }
}

//**********
export async function _executeAsync (app, command, parms, opts, compilation, vars, options) {
//  try {
    var verbose = options.verbose
    var framework = options.framework
    //const DEFAULT_SUBSTRS = ['[INF] Loading', '[INF] Processing', '[LOG] Fashion build complete', '[ERR]', '[WRN]', "[INF] Server", "[INF] Writing", "[INF] Loading Build", "[INF] Waiting", "[LOG] Fashion waiting"];
    const DEFAULT_SUBSTRS = ["[INF] xServer", '[INF] Loading', '[INF] Append', '[INF] Processing', '[INF] Processing Build', '[LOG] Fashion build complete', '[ERR]', '[WRN]', "[INF] Writing", "[INF] Loading Build", "[INF] Waiting", "[LOG] Fashion waiting"];
    var substrings = DEFAULT_SUBSTRS 
    var chalk = require('chalk')
    const crossSpawn = require('cross-spawn')
    logv(verbose, 'FUNCTION _executeAsync')
    await new Promise((resolve, reject) => {
      logv(verbose,`command - ${command}`)
      logv(verbose, `parms - ${parms}`)
      logv(verbose, `opts - ${JSON.stringify(opts)}`)
      let child = crossSpawn(command, parms, opts)
      child.on('close', (code, signal) => {
        logv(verbose, `on close: ` + code) 
        if(code === 0) { resolve(0) }
        else { compilation.errors.push( new Error(code) ); resolve(0) }
      })
      child.on('error', (error) => { 
        logv(verbose, `on error`) 
        compilation.errors.push(error)
        resolve(0)
      })
      child.stdout.on('data', (data) => {
        var str = data.toString().replace(/\r?\n|\r/g, " ").trim()
        logv(verbose, `${str}`)
        if (data && data.toString().match(/Fashion waiting for changes\.\.\./)) {

          const fs = require('fs');
          var filename = process.cwd() + vars.touchFile;
          try {
            var d = new Date().toLocaleString()
            var data = fs.readFileSync(filename);
            fs.writeFileSync(filename, '//' + d, 'utf8');
            log(app, `touching ${filename}`);
          }
          catch(e) {
            log(app, `NOT touching ${filename}`);
          }

          resolve(0)
        }
        else {
          if (substrings.some(function(v) { return data.indexOf(v) >= 0; })) { 
            str = str.replace("[INF]", "")
            str = str.replace("[LOG]", "")
            str = str.replace(process.cwd(), '').trim()
            if (str.includes("[ERR]")) {
              compilation.errors.push(app + str.replace(/^\[ERR\] /gi, ''));
              str = str.replace("[ERR]", `${chalk.red("[ERR]")}`)
            }
            log(app, str) 
          }
        }
      })
      child.stderr.on('data', (data) => {
        logv(options, `error on close: ` + data) 
        var str = data.toString().replace(/\r?\n|\r/g, " ").trim()
        var strJavaOpts = "Picked up _JAVA_OPTIONS";
        var includes = str.includes(strJavaOpts)
        if (!includes) {
          console.log(`${app} ${chalk.red("[ERR]")} ${str}`)
        }
      })
    })
  // }
  // catch(e) {
  //   logv(options,e)
  //   compilation.errors.push('_executeAsync: ' + e)
  //   callback()
  // } 
}

//**********
function runScript(scriptPath, callback) {
  var childProcess = require('child_process');
  // keep track of whether callback has been invoked to prevent multiple invocations
  var invoked = false;
  var process = childProcess.fork(scriptPath);
  // listen for errors as they may prevent the exit event from firing
  process.on('error', function (err) {
    if (invoked) return;
    invoked = true;
    callback(err);
  });
  // execute the callback once the process has finished running
  process.on('exit', function (code) {
    if (invoked) return;
    invoked = true;
    var err = code === 0 ? null : new Error('exit code ' + code);
    callback(err);
  });
}

//**********
export function _toXtype(str) {
  return str.toLowerCase().replace(/_/g, '-')
}

//**********
export function _getApp() {
  var chalk = require('chalk')
  var prefix = ``
  const platform = require('os').platform()
  if (platform == 'darwin') { prefix = `ℹ ｢ext｣:` }
  else { prefix = `i [ext]:` }
  return `${chalk.green(prefix)} `
}

//**********
export function _getVersions(pluginName, frameworkName) {
  const path = require('path')
  const fs = require('fs')
  var v = {}
  var pluginPath = path.resolve(process.cwd(),'node_modules/@sencha', pluginName)
  var pluginPkg = (fs.existsSync(pluginPath+'/package.json') && JSON.parse(fs.readFileSync(pluginPath+'/package.json', 'utf-8')) || {});
  v.pluginVersion = pluginPkg.version
  v._resolved = pluginPkg._resolved
  if (v._resolved == undefined) {
    v.edition = `Commercial`
  }
  else {
    if (-1 == v._resolved.indexOf('community')) {
      v.edition = `Commercial`
    }
    else {
      v.edition = `Community`
    }
  }
  var webpackPath = path.resolve(process.cwd(),'node_modules/webpack')
  var webpackPkg = (fs.existsSync(webpackPath+'/package.json') && JSON.parse(fs.readFileSync(webpackPath+'/package.json', 'utf-8')) || {});
  v.webpackVersion = webpackPkg.version
  var extPath = path.resolve(process.cwd(),'node_modules/@sencha/ext')
  var extPkg = (fs.existsSync(extPath+'/package.json') && JSON.parse(fs.readFileSync(extPath+'/package.json', 'utf-8')) || {});
  v.extVersion = extPkg.sencha.version
  var cmdPath = path.resolve(process.cwd(),`node_modules/@sencha/cmd`)
  var cmdPkg = (fs.existsSync(cmdPath+'/package.json') && JSON.parse(fs.readFileSync(cmdPath+'/package.json', 'utf-8')) || {});
  v.cmdVersion = cmdPkg.version_full
  if (v.cmdVersion == undefined) {
    var cmdPath = path.resolve(process.cwd(),`node_modules/@sencha/${pluginName}/node_modules/@sencha/cmd`)
    var cmdPkg = (fs.existsSync(cmdPath+'/package.json') && JSON.parse(fs.readFileSync(cmdPath+'/package.json', 'utf-8')) || {});
    v.cmdVersion = cmdPkg.version_full
  }
  var frameworkInfo = ''
   if (frameworkName != undefined && frameworkName != 'extjs') {
    var frameworkPath = ''
    if (frameworkName == 'react') {
      frameworkPath = path.resolve(process.cwd(),'node_modules/react')
    }
    if (frameworkName == 'angular') {
      frameworkPath = path.resolve(process.cwd(),'node_modules/@angular/core')
    }
    var frameworkPkg = (fs.existsSync(frameworkPath+'/package.json') && JSON.parse(fs.readFileSync(frameworkPath+'/package.json', 'utf-8')) || {});
    v.frameworkVersion = frameworkPkg.version
    frameworkInfo = ', ' + frameworkName + ' v' + v.frameworkVersion
  }
  return 'ext-webpack-plugin v' + v.pluginVersion + ', Ext JS v' + v.extVersion + ' ' + v.edition + ' Edition, Sencha Cmd v' + v.cmdVersion + ', webpack v' + v.webpackVersion + frameworkInfo
 }

//**********
export function log(app,message) {
  var s = app + message 
  require('readline').cursorTo(process.stdout, 0)
  try {process.stdout.clearLine()}catch(e) {}
  process.stdout.write(s);process.stdout.write('\n')
}

//**********
export function logh(app,message) {
  var h = false
  var s = app + message 
  if (h == true) {
    require('readline').cursorTo(process.stdout, 0)
    try {
      process.stdout.clearLine()
    }
    catch(e) {}
    process.stdout.write(s)
    process.stdout.write('\n')
  }
}

//**********
export function logv(verbose, s) {
  if (verbose == 'yes') {
    require('readline').cursorTo(process.stdout, 0)
    try {
      process.stdout.clearLine()
    }
    catch(e) {}
    process.stdout.write(`-verbose: ${s}`)
    process.stdout.write('\n')
  }
}

function _getValidateOptions() {
  return {
    "type": "object",
    "properties": {
      "framework": {
        "type": ["string"]
      },
      "toolkit": {
        "type": ["string"]
      },
      "theme": {
        "type": ["string"]
      },
      "emit": {
        "errorMessage": "should be 'yes' or 'no' string value (NOT true or false)",
        "type": ["string"]
      },
      "script": {
        "type": ["string"]
      },
      "port": {
        "type": ["integer"]
      },
      "packages": {
        "type": ["string", "array"]
      },
      "profile": {
        "type": ["string"]
      },
      "environment": {
        "errorMessage": "should be 'development' or 'production' string value",
        "type": ["string"]
      },
      "treeshake": {
        "errorMessage": "should be 'yes' or 'no' string value (NOT true or false)",
        "type": ["string"]
      },
      "browser": {
        "errorMessage": "should be 'yes' or 'no' string value (NOT true or false)",
        "type": ["string"]
      },
      "watch": {
        "errorMessage": "should be 'yes' or 'no' string value (NOT true or false)",
        "type": ["string"]
      },
      "verbose": {
        "errorMessage": "should be 'yes' or 'no' string value (NOT true or false)",
        "type": ["string"]
      }
    },
    "additionalProperties": false
  };
}


function _getDefaultOptions() {
  return {
    framework: 'extjs',
    toolkit: 'modern',
    theme: 'theme-material',
    emit: 'yes',
    script: null,
    port: 1962,
    packages: [],

    profile: '', 
    environment: 'development', 
    treeshake: 'no',
    browser: 'yes',
    watch: 'yes',
    verbose: 'no'
  }
}


