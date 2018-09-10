"use strict";
import path from 'path';
import fs from 'fs';
import cjson from 'cjson';

export const buildXML2 = function({ compress }) {
  return `
  <project name="simple-build" basedir=".">

  <!-- Find and load Sencha Cmd ant tasks -->
  <script language="javascript">
      <![CDATA[
          var dir = project.getProperty("basedir"),
              cmdDir = project.getProperty("cmd.dir"),
              cmdLoaded = project.getReference("senchaloader");

          if (!cmdLoaded) {
              function echo(message, file) {
                  var e = project.createTask("echo");
                  e.setMessage(message);
                  if (file) {
                      e.setFile(file);
                  }
                  e.execute();
              };

              if (!cmdDir) {

                  function exec(args) {
                      var process = java.lang.Runtime.getRuntime().exec(args),
                          input = new java.io.BufferedReader(new java.io.InputStreamReader(process.getInputStream())),
                          headerFound = false,
                          line;

                      while (line = input.readLine()) {
                          line = line + '';
                          java.lang.System.out.println(line);
                          if (line.indexOf("Sencha Cmd") > -1) {
                              headerFound = true;
                          }
                          else if (headerFound && !cmdDir) {
                              cmdDir = line;
                              project.setProperty("cmd.dir", cmdDir);
                          }
                      }
                      process.waitFor();
                      return !!cmdDir;
                  }

                  if (!exec(["sencha", "which"])) {
                      var tmpFile = "tmp.sh";
                      echo("source ~/.bash_profile; sencha " + whichArgs.join(" "), tmpFile);
                      exec(["/bin/sh", tmpFile]);
                      new java.io.File(tmpFile)['delete'](); 
                  }
              }
          }

          if (cmdDir && !project.getTargets().containsKey("init-cmd")) {
              var importDir = project.getProperty("build-impl.dir") || 
                              (cmdDir + "/ant/build/app/build-impl.xml");
              var importTask = project.createTask("import");

              importTask.setOwningTarget(self.getOwningTarget());
              importTask.setLocation(self.getLocation());
              importTask.setFile(importDir);
              importTask.execute();
          }
      ]]>
  </script>

  <!--
  The following targets can be provided to inject logic before and/or after key steps
  of the build process:

      The "init-local" target is used to initialize properties that may be personalized
      for the local machine.

          <target name="-before-init-local"/>
          <target name="-after-init-local"/>

      The "clean" target is used to clean build output from the build.dir.

          <target name="-before-clean"/>
          <target name="-after-clean"/>

      The general "init" target is used to initialize all other properties, including
      those provided by Sencha Cmd.

          <target name="-before-init"/>
          <target name="-after-init"/>

      The "page" target performs the call to Sencha Cmd to build the 'all-classes.js' file.

          <target name="-before-page"/>
          <target name="-after-page"/>

      The "build" target performs the call to Sencha Cmd to build the application.

          <target name="-before-build"/>
          <target name="-after-build"/>
  -->

</project>



  `
}


export const buildXML = function({ compress }) {
    let compression = '';

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
`.trim();
};

/**
 * Creates the app.json file
 * @param {String} theme The name of the theme to use.
 * @param {String[]} packages The names of packages to include in the build
 * @param {Object} sass Sass configuration properties.
 * @param {Object} resources Extra resources to be copied into the resource folder as specified in the "resources" property of the "output" object. Folders specified in this list will be deeply copied.
 */
export function createAppJson({ theme, packages, toolkit, overrides=[], packageDirs=[], sass, resources }) {

  //var senchaPath = '/Users/marcgusmano/_git/sencha/ext-react/packages/ext-react-boilerplate17/node_modules/@sencha'
  //packageDirs.push(senchaPath)
  const config = {
        framework: "ext",
        toolkit,
        requires: packages,
        packages: {
            dir: packageDirs.map(dir => path.resolve(dir))
        },
        output: {
            base: '.',
            resources: {
                path: './resources',
                shared: "./resources"
            }
        },
        sass,
        resources
    };

    // if theme is local add it as an additional package dir
    if (fs.existsSync(theme)) {
        const packageInfo = cjson.load(path.join(theme, 'package.json'));
        config.theme = packageInfo.name;
        config.packages.dir.push(path.resolve(theme));
    } else {
        config.theme = theme;
    }

    return JSON.stringify(config, null, 4);
}

/**
 * Creates a js file containing code to make Ext JS load properly in jsdom
 * @param {String} targetDir 
 */
// export function createJSDOMEnvironment(targetDir) {
//     return 'window.Ext = Ext;Ext.require("Ext.data.TreeStore");Ext.require("Ext.grid.Grid");Ext.require("Ext.plugin.Responsive");';
//     //return 'window.Ext = Ext;Ext.require("Ext.react.RendererCell");Ext.require("Ext.data.TreeStore");Ext.require("Ext.grid.Grid");Ext.require("Ext.plugin.Responsive");';
// }

/**
 * Creates the workspace.json file
 * @param {String} sdk The path to the sdk
 */
export function createWorkspaceJson(sdk, packages, output) {
    return JSON.stringify({
        "frameworks": {
            "ext": path.relative(output, sdk)
        },
        "packages": {
            "dir": ['${workspace.dir}/packages/local','${workspace.dir}/packages'].concat(packages).join(','),
            "extract": "${workspace.dir}/packages/remote"
        }
    }, null, 4);
}
