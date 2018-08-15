const chalk = require('chalk');
const util = require('./util.js')
import { sync as rimraf } from 'rimraf';
import { sync as mkdirp } from 'mkdirp';
import path from 'path';
import fs from 'fs';
import { buildXML, createAppJson, createWorkspaceJson, createJSDOMEnvironment } from './artifacts';
import * as readline from 'readline'
var prefix = ``
if (require('os').platform() == 'darwin') {
  prefix = `ℹ ｢ext｣:`
}
else {
  prefix = `i [ext]:`
}

var app = `${chalk.green(prefix)} ext-build-async:`;

class buildAsync {

  constructor(options) {
    this.isWebpack4 = options.isWebpack4
    this.modules = options.modules
    this.output = options.outputPath
    this.build = options.build
    this.callback = options.callback
    this.watching = options.watching
    this.treeShaking = options.treeShaking
    this.dependencies = options.dependencies
  }

  executeAsync() {
    console.log('in executeAsync')
    var toolkit='modern'
    var theme
    var packages=[]
    var packageDirs=[]
    var sdk = ''
    var overrides
    //, callback}

//    let sencha = this._getSenchCmdPath();
    theme = theme || (toolkit === 'classic' ? 'theme-triton' : 'theme-material');

    if (!this.watching) {
      rimraf(this.output);
      mkdirp(this.output);
    }

    let js;
    if (this.treeShaking) {
      let statements = ['Ext.require(["Ext.app.Application", "Ext.Component", "Ext.Widget", "Ext.layout.Fit"])']; // for some reason command doesn't load component when only panel is required
      // if (packages.indexOf('reacto') !== -1) {
      //   statements.push('Ext.require("Ext.react.RendererCell")');
      // }
      //mjg
      for (let module of this.modules) {
        const deps = this.dependencies[module.resource];
        if (deps) statements = statements.concat(deps);
      }
      js = statements.join(';\n');
    } else {
      js = 'Ext.require("Ext.*")';
    }
    const manifest = path.join(this.output, 'manifest.js');
    // add ext-react/packages automatically if present
    const userPackages = path.join('.', 'ext-react', 'packages');
    if (fs.existsSync(userPackages)) {
      packageDirs.push(userPackages)
    }

    if (fs.existsSync(path.join(sdk, 'ext'))) {
      // local checkout of the SDK repo
      packageDirs.push(path.join('ext', 'packages'));
      sdk = path.join(sdk, 'ext');
    }
    if (!this.watching) {
      fs.writeFileSync(path.join(this.output, 'build.xml'), buildXML({ compress: this.production }), 'utf8');
      fs.writeFileSync(path.join(this.output, 'jsdom-environment.js'), createJSDOMEnvironment(), 'utf8');
      fs.writeFileSync(path.join(this.output, 'app.json'), createAppJson({ theme, packages, toolkit, overrides, packageDirs }), 'utf8');
      fs.writeFileSync(path.join(this.output, 'workspace.json'), createWorkspaceJson(sdk, packageDirs, this.output), 'utf8');
    }
    let cmdRebuildNeeded = false;
    if (this.manifest === null || js !== this.manifest) {
      // Only write manifest if it differs from the last run.  This prevents unnecessary cmd rebuilds.
      this.manifest = js;
      //readline.cursorTo(process.stdout, 0);console.log(app + js)
      readline.cursorTo(process.stdout, 0);console.log(app + 'tree shaking: ' + this.treeShaking)
      fs.writeFileSync(manifest, js, 'utf8');
      cmdRebuildNeeded = true;
      readline.cursorTo(process.stdout, 0);console.log(app + `building ExtReact bundle at: ${this.output}`)
    }

    var me = this
    return new Promise(async function(resolve, reject) {
      var parms = ['ant','watch']
      if (me.verbose == 'yes') {
        console.log(`${app} passing to 'sencha app build ${me.profile} ${me.environment}'`)
      }
      try {
        console.log(`${app} passing to 'sencha ant watch'`)
        await util.senchaCmdAsync(parms, me.output, me.verbose)
        console.log(`${app} after passing to 'sencha ant watch'`)

        resolve(0);
      } catch(err) {
        reject({error: err})
      }
    })




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


}
module.exports = buildAsync