export const buildXML = function(compress, options, output) {
  const logv = require('./pluginUtil').logv
  logv(options,'FUNCTION buildXML')
  
  let compression = ''

  if (compress) {
    compression = `
      then 
      fs 
      minify 
        -yui 
        -from=ext.js 
        -to=ext.js
    `;
  }

    return `<project name="simple-build" basedir=".">
  <!--  internally, watch calls the init target, so need to have one here -->
  <target name="init"/>
  <target name="init-cmd">
    <taskdef  resource="com/sencha/ant/antlib.xml"
              classpath="\${cmd.dir}/sencha.jar"
              loaderref="senchaloader"/>
    <x-extend-classpath>
        <jar path="\${cmd.dir}/sencha.jar"/>
    </x-extend-classpath>
    <x-sencha-init prefix=""/>
    <x-compile refid="theCompiler"
                      dir="\${basedir}"
                      initOnly="true"
                      inheritAll="true">
              <![CDATA[
              -classpath=\${basedir}/manifest.js
              load-app
                  -temp=\${basedir}/temp
                  -tag=App
        ]]>
      </x-compile>
  </target>
  <target name="rebuild">
    <x-compile refid="theCompiler"
              dir="\${basedir}"
              inheritAll="true">
      <![CDATA[
      --debug
      exclude
      -all
      and
      include
      -f=Boot.js
      and
      concatenate
          ext.js
      and
      exclude
      -all
      and
      # include theme overrides
      include
        -r
        -tag=overrides
      and
      # include all js files needed for manifest.js
      include
          -r
          -f=manifest.js
      and
      # exclude the generated manifest file itself,
      # since we don't want the generated bundle file to create any components
      exclude
      -f=manifest.js
      and
      concatenate
      +append
          ext.js
      and
      scss
          -appName=App
          -imageSearchPath=resources
          -themeName=triton
          -resourceMapBase=.
          -output=ext.scss
      and
      resources
          -excludes=-all*.css
          -out=resources
      and
      resources
          -model=true
          -out=resources
      ]]>
    </x-compile>
  </target>
  <target name="build" depends="init-cmd,rebuild">
    <x-sencha-command dir="\${basedir}">
      <![CDATA[
      fashion
          -pwd=.
          -split=4095
          ${compress ? '-compress' : ''}
              ext.scss
          ext.css
      ${compression}
      ]]>
    </x-sencha-command>
  </target>
  <target name="watch" depends="init-cmd,build">
    <x-fashion-watch
      refName="fashion-watch"
      inputFile="ext.scss"
      outputFile="ext.css"
      split="4095"
      compress="${compress ? 'true' : 'false'}"
      configFile="app.json"
      fork="true"/>
    <x-watch compilerRef="theCompiler" targets="rebuild"/>
  </target>
</project>
`.trim()
}

export function createAppJson( theme, packages, toolkit, options, output ) {
  const logv = require('./pluginUtil').logv
  logv(options,'FUNCTION createAppJson')

  const fs = require('fs')

  var isWindows = typeof process != 'undefined' && typeof process.platform != 'undefined' && !!process.platform.match(/^win/);
  var pathDifference = output.substring(process.cwd().length)
  var numberOfPaths = pathDifference.split(isWindows ? "\\" : "/").length - 1;
  var nodeModulePath = ''
  for (var i = 0; i < numberOfPaths; i++) { 
    nodeModulePath += "../"
  }

  const config = {
    framework: "ext",
    toolkit,
    requires: packages,
    "overrides": [
      "overrides",
      "jsdom-environment.js"
    ],
    "packages": {
      "dir": [
        nodeModulePath + "node_modules/@sencha",
        "packages"
      ]
    },
    output: {
      base: '.',
      resources: {
        path: './resources',
        shared: "./resources"
      }
    }
  }

  // if theme is local add it as an additional package dir
  if (fs.existsSync(theme)) {
      const path = require('path')
      const cjson = require('cjson')
      const packageInfo = cjson.load(path.join(theme, 'package.json'));
      config.theme = packageInfo.name;
      config.packages.dir.push(path.resolve(theme));
  } else {
      config.theme = theme;
  }
  return JSON.stringify(config, null, 2)
}

export function createJSDOMEnvironment(options, output) {
  const logv = require('./pluginUtil').logv
  logv(options,'FUNCTION createJSDOMEnvironment')

  return 'window.Ext = Ext;'
}

export function createWorkspaceJson(options, output) {
  const logv = require('./pluginUtil').logv
  logv(options,'FUNCTION createWorkspaceJson')

  var isWindows = typeof process != 'undefined' && typeof process.platform != 'undefined' && !!process.platform.match(/^win/);
  var pathDifference = output.substring(process.cwd().length)
  var numberOfPaths = pathDifference.split(isWindows ? "\\" : "/").length - 1;
  var nodeModulePath = ''
  for (var i = 0; i < numberOfPaths; i++) { 
    nodeModulePath += "../"
  }

  logv(options,'isWindows: ' + isWindows)
  logv(options,'output: ' + output)
  logv(options,'pathDifference: ' + pathDifference)
  logv(options,'numberOfPaths: ' + numberOfPaths)
  logv(options,'nodeModulePath: ' + nodeModulePath)

  const config = {
    "frameworks": {
      "ext": nodeModulePath + "node_modules/@sencha/ext"
    },
    "build": {
      "dir": "${workspace.dir}/" + nodeModulePath + "build"
    },
    "packages": {
      "dir": [
        "${workspace.dir}/" + nodeModulePath + "ext-" + options.framework + "/packages/local",
        "${workspace.dir}/" + nodeModulePath + "ext-" + options.framework + "/packages",
        "${workspace.dir}/" + nodeModulePath + "node_modules/@sencha",
        "${workspace.dir}/" + nodeModulePath + "node_modules/@sencha/ext-${toolkit.name}",
        "${workspace.dir}/" + nodeModulePath + "node_modules/@sencha/ext-${toolkit.name}-theme-base",
        "${workspace.dir}/" + nodeModulePath + "node_modules/@sencha/ext-${toolkit.name}-theme-ios",
        "${workspace.dir}/" + nodeModulePath + "node_modules/@sencha/ext-${toolkit.name}-theme-material",
        "${workspace.dir}/" + nodeModulePath + "node_modules/@sencha/ext-${toolkit.name}-theme-aria",
        "${workspace.dir}/" + nodeModulePath + "node_modules/@sencha/ext-${toolkit.name}-theme-neutral",
        "${workspace.dir}/" + nodeModulePath + "node_modules/@sencha/ext-${toolkit.name}-theme-classic",
        "${workspace.dir}/" + nodeModulePath + "node_modules/@sencha/ext-${toolkit.name}-theme-gray",
        "${workspace.dir}/" + nodeModulePath + "node_modules/@sencha/ext-${toolkit.name}-theme-crisp",
        "${workspace.dir}/" + nodeModulePath + "node_modules/@sencha/ext-${toolkit.name}-theme-crisp-touch",
        "${workspace.dir}/" + nodeModulePath + "node_modules/@sencha/ext-${toolkit.name}-theme-neptune",
        "${workspace.dir}/" + nodeModulePath + "node_modules/@sencha/ext-${toolkit.name}-theme-neptune-touch",
        "${workspace.dir}/" + nodeModulePath + "node_modules/@sencha/ext-${toolkit.name}-theme-triton",
        "${workspace.dir}/" + nodeModulePath + "node_modules/@sencha/ext-${toolkit.name}-theme-graphite"
      ],
      "extract": "${workspace.dir}/" + nodeModulePath + "packages/remote"
    }
  }
  return JSON.stringify(config, null, 2)
}

export const extAngularModule = function(imports, exports, declarations) {
  return `
  import { NgModule } from '@angular/core';
  ${imports}
  @NgModule({
    imports: [
    ],
    declarations: [
  ${declarations}  ],
    exports: [
  ${exports}  ]
  })
  export class ExtAngularModule { }
  `
}
