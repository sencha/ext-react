"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createAppJson = createAppJson;
exports.createWorkspaceJson = createWorkspaceJson;
exports.buildXML = exports.buildXML2 = void 0;

var _path = _interopRequireDefault(require("path"));

var _fs = _interopRequireDefault(require("fs"));

var _cjson = _interopRequireDefault(require("cjson"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const buildXML2 = function ({
  compress
}) {
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



  `;
};

exports.buildXML2 = buildXML2;

const buildXML = function ({
  compress
}) {
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
 */


exports.buildXML = buildXML;

function createAppJson({
  theme,
  packages,
  toolkit,
  overrides = [],
  packageDirs = []
}) {
  //var senchaPath = '/Users/marcgusmano/_git/sencha/ext-react/packages/ext-react-boilerplate17/node_modules/@sencha'
  //packageDirs.push(senchaPath)
  const config = {
    framework: "ext",
    toolkit,
    requires: packages,
    packages: {
      dir: packageDirs.map(dir => _path.default.resolve(dir))
    },
    output: {
      base: '.',
      resources: {
        path: './resources',
        shared: "./resources"
      }
    }
  }; // if theme is local add it as an additional package dir

  if (_fs.default.existsSync(theme)) {
    const packageInfo = _cjson.default.load(_path.default.join(theme, 'package.json'));

    config.theme = packageInfo.name;
    config.packages.dir.push(_path.default.resolve(theme));
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


function createWorkspaceJson(sdk, packages, output) {
  return JSON.stringify({
    "frameworks": {
      "ext": _path.default.relative(output, sdk)
    },
    "packages": {
      "dir": ['${workspace.dir}/packages/local', '${workspace.dir}/packages'].concat(packages).join(','),
      "extract": "${workspace.dir}/packages/remote"
    }
  }, null, 4);
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9hcnRpZmFjdHMuanMiXSwibmFtZXMiOlsiYnVpbGRYTUwyIiwiY29tcHJlc3MiLCJidWlsZFhNTCIsImNvbXByZXNzaW9uIiwidHJpbSIsImNyZWF0ZUFwcEpzb24iLCJ0aGVtZSIsInBhY2thZ2VzIiwidG9vbGtpdCIsIm92ZXJyaWRlcyIsInBhY2thZ2VEaXJzIiwiY29uZmlnIiwiZnJhbWV3b3JrIiwicmVxdWlyZXMiLCJkaXIiLCJtYXAiLCJwYXRoIiwicmVzb2x2ZSIsIm91dHB1dCIsImJhc2UiLCJyZXNvdXJjZXMiLCJzaGFyZWQiLCJmcyIsImV4aXN0c1N5bmMiLCJwYWNrYWdlSW5mbyIsImNqc29uIiwibG9hZCIsImpvaW4iLCJuYW1lIiwicHVzaCIsIkpTT04iLCJzdHJpbmdpZnkiLCJjcmVhdGVXb3Jrc3BhY2VKc29uIiwic2RrIiwicmVsYXRpdmUiLCJjb25jYXQiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7QUFDQTs7QUFDQTs7QUFDQTs7OztBQUVPLE1BQU1BLFNBQVMsR0FBRyxVQUFTO0FBQUVDLEVBQUFBO0FBQUYsQ0FBVCxFQUF1QjtBQUM5QyxTQUFROzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQUFSO0FBc0dELENBdkdNOzs7O0FBMEdBLE1BQU1DLFFBQVEsR0FBRyxVQUFTO0FBQUVELEVBQUFBO0FBQUYsQ0FBVCxFQUF1QjtBQUMzQyxNQUFJRSxXQUFXLEdBQUcsRUFBbEI7O0FBRUEsTUFBSUYsUUFBSixFQUFjO0FBQ1ZFLElBQUFBLFdBQVcsR0FBSTs7Ozs7OztTQUFmO0FBUUg7O0FBRUQsU0FBUTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7WUFtRkFGLFFBQVEsR0FBRyxXQUFILEdBQWlCLEVBQUc7OztRQUdoQ0UsV0FBWTs7Ozs7Ozs7OztrQkFVRkYsUUFBUSxHQUFHLE1BQUgsR0FBWSxPQUFROzs7Ozs7Q0FoR25DLENBc0dURyxJQXRHUyxFQUFQO0FBdUdILENBckhNO0FBdUhQOzs7Ozs7Ozs7QUFLTyxTQUFTQyxhQUFULENBQXVCO0FBQUVDLEVBQUFBLEtBQUY7QUFBU0MsRUFBQUEsUUFBVDtBQUFtQkMsRUFBQUEsT0FBbkI7QUFBNEJDLEVBQUFBLFNBQVMsR0FBQyxFQUF0QztBQUEwQ0MsRUFBQUEsV0FBVyxHQUFDO0FBQXRELENBQXZCLEVBQW1GO0FBRXhGO0FBQ0E7QUFDQSxRQUFNQyxNQUFNLEdBQUc7QUFDVEMsSUFBQUEsU0FBUyxFQUFFLEtBREY7QUFFVEosSUFBQUEsT0FGUztBQUdUSyxJQUFBQSxRQUFRLEVBQUVOLFFBSEQ7QUFJVEEsSUFBQUEsUUFBUSxFQUFFO0FBQ05PLE1BQUFBLEdBQUcsRUFBRUosV0FBVyxDQUFDSyxHQUFaLENBQWdCRCxHQUFHLElBQUlFLGNBQUtDLE9BQUwsQ0FBYUgsR0FBYixDQUF2QjtBQURDLEtBSkQ7QUFPVEksSUFBQUEsTUFBTSxFQUFFO0FBQ0pDLE1BQUFBLElBQUksRUFBRSxHQURGO0FBRUpDLE1BQUFBLFNBQVMsRUFBRTtBQUNQSixRQUFBQSxJQUFJLEVBQUUsYUFEQztBQUVQSyxRQUFBQSxNQUFNLEVBQUU7QUFGRDtBQUZQO0FBUEMsR0FBZixDQUp3RixDQW9CdEY7O0FBQ0EsTUFBSUMsWUFBR0MsVUFBSCxDQUFjakIsS0FBZCxDQUFKLEVBQTBCO0FBQ3RCLFVBQU1rQixXQUFXLEdBQUdDLGVBQU1DLElBQU4sQ0FBV1YsY0FBS1csSUFBTCxDQUFVckIsS0FBVixFQUFpQixjQUFqQixDQUFYLENBQXBCOztBQUNBSyxJQUFBQSxNQUFNLENBQUNMLEtBQVAsR0FBZWtCLFdBQVcsQ0FBQ0ksSUFBM0I7QUFDQWpCLElBQUFBLE1BQU0sQ0FBQ0osUUFBUCxDQUFnQk8sR0FBaEIsQ0FBb0JlLElBQXBCLENBQXlCYixjQUFLQyxPQUFMLENBQWFYLEtBQWIsQ0FBekI7QUFDSCxHQUpELE1BSU87QUFDSEssSUFBQUEsTUFBTSxDQUFDTCxLQUFQLEdBQWVBLEtBQWY7QUFDSDs7QUFFRCxTQUFPd0IsSUFBSSxDQUFDQyxTQUFMLENBQWVwQixNQUFmLEVBQXVCLElBQXZCLEVBQTZCLENBQTdCLENBQVA7QUFDSDtBQUVEOzs7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7OztBQUlPLFNBQVNxQixtQkFBVCxDQUE2QkMsR0FBN0IsRUFBa0MxQixRQUFsQyxFQUE0Q1csTUFBNUMsRUFBb0Q7QUFDdkQsU0FBT1ksSUFBSSxDQUFDQyxTQUFMLENBQWU7QUFDbEIsa0JBQWM7QUFDVixhQUFPZixjQUFLa0IsUUFBTCxDQUFjaEIsTUFBZCxFQUFzQmUsR0FBdEI7QUFERyxLQURJO0FBSWxCLGdCQUFZO0FBQ1IsYUFBTyxDQUFDLGlDQUFELEVBQW1DLDJCQUFuQyxFQUFnRUUsTUFBaEUsQ0FBdUU1QixRQUF2RSxFQUFpRm9CLElBQWpGLENBQXNGLEdBQXRGLENBREM7QUFFUixpQkFBVztBQUZIO0FBSk0sR0FBZixFQVFKLElBUkksRUFRRSxDQVJGLENBQVA7QUFTSCIsInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgZnMgZnJvbSAnZnMnO1xuaW1wb3J0IGNqc29uIGZyb20gJ2Nqc29uJztcblxuZXhwb3J0IGNvbnN0IGJ1aWxkWE1MMiA9IGZ1bmN0aW9uKHsgY29tcHJlc3MgfSkge1xuICByZXR1cm4gYFxuICA8cHJvamVjdCBuYW1lPVwic2ltcGxlLWJ1aWxkXCIgYmFzZWRpcj1cIi5cIj5cblxuICA8IS0tIEZpbmQgYW5kIGxvYWQgU2VuY2hhIENtZCBhbnQgdGFza3MgLS0+XG4gIDxzY3JpcHQgbGFuZ3VhZ2U9XCJqYXZhc2NyaXB0XCI+XG4gICAgICA8IVtDREFUQVtcbiAgICAgICAgICB2YXIgZGlyID0gcHJvamVjdC5nZXRQcm9wZXJ0eShcImJhc2VkaXJcIiksXG4gICAgICAgICAgICAgIGNtZERpciA9IHByb2plY3QuZ2V0UHJvcGVydHkoXCJjbWQuZGlyXCIpLFxuICAgICAgICAgICAgICBjbWRMb2FkZWQgPSBwcm9qZWN0LmdldFJlZmVyZW5jZShcInNlbmNoYWxvYWRlclwiKTtcblxuICAgICAgICAgIGlmICghY21kTG9hZGVkKSB7XG4gICAgICAgICAgICAgIGZ1bmN0aW9uIGVjaG8obWVzc2FnZSwgZmlsZSkge1xuICAgICAgICAgICAgICAgICAgdmFyIGUgPSBwcm9qZWN0LmNyZWF0ZVRhc2soXCJlY2hvXCIpO1xuICAgICAgICAgICAgICAgICAgZS5zZXRNZXNzYWdlKG1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgICAgaWYgKGZpbGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICBlLnNldEZpbGUoZmlsZSk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBlLmV4ZWN1dGUoKTtcbiAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICBpZiAoIWNtZERpcikge1xuXG4gICAgICAgICAgICAgICAgICBmdW5jdGlvbiBleGVjKGFyZ3MpIHtcbiAgICAgICAgICAgICAgICAgICAgICB2YXIgcHJvY2VzcyA9IGphdmEubGFuZy5SdW50aW1lLmdldFJ1bnRpbWUoKS5leGVjKGFyZ3MpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBpbnB1dCA9IG5ldyBqYXZhLmlvLkJ1ZmZlcmVkUmVhZGVyKG5ldyBqYXZhLmlvLklucHV0U3RyZWFtUmVhZGVyKHByb2Nlc3MuZ2V0SW5wdXRTdHJlYW0oKSkpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXJGb3VuZCA9IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBsaW5lO1xuXG4gICAgICAgICAgICAgICAgICAgICAgd2hpbGUgKGxpbmUgPSBpbnB1dC5yZWFkTGluZSgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGxpbmUgPSBsaW5lICsgJyc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGphdmEubGFuZy5TeXN0ZW0ub3V0LnByaW50bG4obGluZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsaW5lLmluZGV4T2YoXCJTZW5jaGEgQ21kXCIpID4gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlckZvdW5kID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChoZWFkZXJGb3VuZCAmJiAhY21kRGlyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbWREaXIgPSBsaW5lO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvamVjdC5zZXRQcm9wZXJ0eShcImNtZC5kaXJcIiwgY21kRGlyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICBwcm9jZXNzLndhaXRGb3IoKTtcbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gISFjbWREaXI7XG4gICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgIGlmICghZXhlYyhbXCJzZW5jaGFcIiwgXCJ3aGljaFwiXSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICB2YXIgdG1wRmlsZSA9IFwidG1wLnNoXCI7XG4gICAgICAgICAgICAgICAgICAgICAgZWNobyhcInNvdXJjZSB+Ly5iYXNoX3Byb2ZpbGU7IHNlbmNoYSBcIiArIHdoaWNoQXJncy5qb2luKFwiIFwiKSwgdG1wRmlsZSk7XG4gICAgICAgICAgICAgICAgICAgICAgZXhlYyhbXCIvYmluL3NoXCIsIHRtcEZpbGVdKTtcbiAgICAgICAgICAgICAgICAgICAgICBuZXcgamF2YS5pby5GaWxlKHRtcEZpbGUpWydkZWxldGUnXSgpOyBcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChjbWREaXIgJiYgIXByb2plY3QuZ2V0VGFyZ2V0cygpLmNvbnRhaW5zS2V5KFwiaW5pdC1jbWRcIikpIHtcbiAgICAgICAgICAgICAgdmFyIGltcG9ydERpciA9IHByb2plY3QuZ2V0UHJvcGVydHkoXCJidWlsZC1pbXBsLmRpclwiKSB8fCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChjbWREaXIgKyBcIi9hbnQvYnVpbGQvYXBwL2J1aWxkLWltcGwueG1sXCIpO1xuICAgICAgICAgICAgICB2YXIgaW1wb3J0VGFzayA9IHByb2plY3QuY3JlYXRlVGFzayhcImltcG9ydFwiKTtcblxuICAgICAgICAgICAgICBpbXBvcnRUYXNrLnNldE93bmluZ1RhcmdldChzZWxmLmdldE93bmluZ1RhcmdldCgpKTtcbiAgICAgICAgICAgICAgaW1wb3J0VGFzay5zZXRMb2NhdGlvbihzZWxmLmdldExvY2F0aW9uKCkpO1xuICAgICAgICAgICAgICBpbXBvcnRUYXNrLnNldEZpbGUoaW1wb3J0RGlyKTtcbiAgICAgICAgICAgICAgaW1wb3J0VGFzay5leGVjdXRlKCk7XG4gICAgICAgICAgfVxuICAgICAgXV0+XG4gIDwvc2NyaXB0PlxuXG4gIDwhLS1cbiAgVGhlIGZvbGxvd2luZyB0YXJnZXRzIGNhbiBiZSBwcm92aWRlZCB0byBpbmplY3QgbG9naWMgYmVmb3JlIGFuZC9vciBhZnRlciBrZXkgc3RlcHNcbiAgb2YgdGhlIGJ1aWxkIHByb2Nlc3M6XG5cbiAgICAgIFRoZSBcImluaXQtbG9jYWxcIiB0YXJnZXQgaXMgdXNlZCB0byBpbml0aWFsaXplIHByb3BlcnRpZXMgdGhhdCBtYXkgYmUgcGVyc29uYWxpemVkXG4gICAgICBmb3IgdGhlIGxvY2FsIG1hY2hpbmUuXG5cbiAgICAgICAgICA8dGFyZ2V0IG5hbWU9XCItYmVmb3JlLWluaXQtbG9jYWxcIi8+XG4gICAgICAgICAgPHRhcmdldCBuYW1lPVwiLWFmdGVyLWluaXQtbG9jYWxcIi8+XG5cbiAgICAgIFRoZSBcImNsZWFuXCIgdGFyZ2V0IGlzIHVzZWQgdG8gY2xlYW4gYnVpbGQgb3V0cHV0IGZyb20gdGhlIGJ1aWxkLmRpci5cblxuICAgICAgICAgIDx0YXJnZXQgbmFtZT1cIi1iZWZvcmUtY2xlYW5cIi8+XG4gICAgICAgICAgPHRhcmdldCBuYW1lPVwiLWFmdGVyLWNsZWFuXCIvPlxuXG4gICAgICBUaGUgZ2VuZXJhbCBcImluaXRcIiB0YXJnZXQgaXMgdXNlZCB0byBpbml0aWFsaXplIGFsbCBvdGhlciBwcm9wZXJ0aWVzLCBpbmNsdWRpbmdcbiAgICAgIHRob3NlIHByb3ZpZGVkIGJ5IFNlbmNoYSBDbWQuXG5cbiAgICAgICAgICA8dGFyZ2V0IG5hbWU9XCItYmVmb3JlLWluaXRcIi8+XG4gICAgICAgICAgPHRhcmdldCBuYW1lPVwiLWFmdGVyLWluaXRcIi8+XG5cbiAgICAgIFRoZSBcInBhZ2VcIiB0YXJnZXQgcGVyZm9ybXMgdGhlIGNhbGwgdG8gU2VuY2hhIENtZCB0byBidWlsZCB0aGUgJ2FsbC1jbGFzc2VzLmpzJyBmaWxlLlxuXG4gICAgICAgICAgPHRhcmdldCBuYW1lPVwiLWJlZm9yZS1wYWdlXCIvPlxuICAgICAgICAgIDx0YXJnZXQgbmFtZT1cIi1hZnRlci1wYWdlXCIvPlxuXG4gICAgICBUaGUgXCJidWlsZFwiIHRhcmdldCBwZXJmb3JtcyB0aGUgY2FsbCB0byBTZW5jaGEgQ21kIHRvIGJ1aWxkIHRoZSBhcHBsaWNhdGlvbi5cblxuICAgICAgICAgIDx0YXJnZXQgbmFtZT1cIi1iZWZvcmUtYnVpbGRcIi8+XG4gICAgICAgICAgPHRhcmdldCBuYW1lPVwiLWFmdGVyLWJ1aWxkXCIvPlxuICAtLT5cblxuPC9wcm9qZWN0PlxuXG5cblxuICBgXG59XG5cblxuZXhwb3J0IGNvbnN0IGJ1aWxkWE1MID0gZnVuY3Rpb24oeyBjb21wcmVzcyB9KSB7XG4gICAgbGV0IGNvbXByZXNzaW9uID0gJyc7XG5cbiAgICBpZiAoY29tcHJlc3MpIHtcbiAgICAgICAgY29tcHJlc3Npb24gPSBgXG4gICAgICAgICAgICB0aGVuIFxuICAgICAgICAgICAgZnMgXG4gICAgICAgICAgICBtaW5pZnkgXG4gICAgICAgICAgICAgICAgLXl1aSBcbiAgICAgICAgICAgICAgICAtZnJvbT1leHQuanMgXG4gICAgICAgICAgICAgICAgLXRvPWV4dC5qc1xuICAgICAgICBgO1xuICAgIH1cblxuICAgIHJldHVybiBgPHByb2plY3QgbmFtZT1cInNpbXBsZS1idWlsZFwiIGJhc2VkaXI9XCIuXCI+XG4gIDwhLS0gIGludGVybmFsbHksIHdhdGNoIGNhbGxzIHRoZSBpbml0IHRhcmdldCwgc28gbmVlZCB0byBoYXZlIG9uZSBoZXJlIC0tPlxuICA8dGFyZ2V0IG5hbWU9XCJpbml0XCIvPlxuICA8dGFyZ2V0IG5hbWU9XCJpbml0LWNtZFwiPlxuICAgIDx0YXNrZGVmICByZXNvdXJjZT1cImNvbS9zZW5jaGEvYW50L2FudGxpYi54bWxcIlxuICAgICAgICAgICAgICBjbGFzc3BhdGg9XCJcXCR7Y21kLmRpcn0vc2VuY2hhLmphclwiXG4gICAgICAgICAgICAgIGxvYWRlcnJlZj1cInNlbmNoYWxvYWRlclwiLz5cbiAgICA8eC1leHRlbmQtY2xhc3NwYXRoPlxuICAgICAgICA8amFyIHBhdGg9XCJcXCR7Y21kLmRpcn0vc2VuY2hhLmphclwiLz5cbiAgICA8L3gtZXh0ZW5kLWNsYXNzcGF0aD5cbiAgICA8eC1zZW5jaGEtaW5pdCBwcmVmaXg9XCJcIi8+XG4gICAgPHgtY29tcGlsZSByZWZpZD1cInRoZUNvbXBpbGVyXCJcbiAgICAgICAgICAgICAgICAgICAgICBkaXI9XCJcXCR7YmFzZWRpcn1cIlxuICAgICAgICAgICAgICAgICAgICAgIGluaXRPbmx5PVwidHJ1ZVwiXG4gICAgICAgICAgICAgICAgICAgICAgaW5oZXJpdEFsbD1cInRydWVcIj5cbiAgICAgICAgICAgICAgPCFbQ0RBVEFbXG4gICAgICAgICAgICAgIC1jbGFzc3BhdGg9XFwke2Jhc2VkaXJ9L21hbmlmZXN0LmpzXG4gICAgICAgICAgICAgIGxvYWQtYXBwXG4gICAgICAgICAgICAgICAgICAtdGVtcD1cXCR7YmFzZWRpcn0vdGVtcFxuICAgICAgICAgICAgICAgICAgLXRhZz1BcHBcbiAgICAgICAgXV0+XG4gICAgICA8L3gtY29tcGlsZT5cbiAgPC90YXJnZXQ+XG4gIDx0YXJnZXQgbmFtZT1cInJlYnVpbGRcIj5cbiAgICA8eC1jb21waWxlIHJlZmlkPVwidGhlQ29tcGlsZXJcIlxuICAgICAgICAgICAgICBkaXI9XCJcXCR7YmFzZWRpcn1cIlxuICAgICAgICAgICAgICBpbmhlcml0QWxsPVwidHJ1ZVwiPlxuICAgICAgPCFbQ0RBVEFbXG4gICAgICAtLWRlYnVnXG4gICAgICBleGNsdWRlXG4gICAgICAtYWxsXG4gICAgICBhbmRcbiAgICAgIGluY2x1ZGVcbiAgICAgIC1mPUJvb3QuanNcbiAgICAgIGFuZFxuICAgICAgY29uY2F0ZW5hdGVcbiAgICAgICAgICBleHQuanNcbiAgICAgIGFuZFxuICAgICAgZXhjbHVkZVxuICAgICAgLWFsbFxuICAgICAgYW5kXG4gICAgICAjIGluY2x1ZGUgdGhlbWUgb3ZlcnJpZGVzXG4gICAgICBpbmNsdWRlXG4gICAgICAgIC1yXG4gICAgICAgIC10YWc9b3ZlcnJpZGVzXG4gICAgICBhbmRcbiAgICAgICMgaW5jbHVkZSBhbGwganMgZmlsZXMgbmVlZGVkIGZvciBtYW5pZmVzdC5qc1xuICAgICAgaW5jbHVkZVxuICAgICAgICAgIC1yXG4gICAgICAgICAgLWY9bWFuaWZlc3QuanNcbiAgICAgIGFuZFxuICAgICAgIyBleGNsdWRlIHRoZSBnZW5lcmF0ZWQgbWFuaWZlc3QgZmlsZSBpdHNlbGYsXG4gICAgICAjIHNpbmNlIHdlIGRvbid0IHdhbnQgdGhlIGdlbmVyYXRlZCBidW5kbGUgZmlsZSB0byBjcmVhdGUgYW55IGNvbXBvbmVudHNcbiAgICAgIGV4Y2x1ZGVcbiAgICAgIC1mPW1hbmlmZXN0LmpzXG4gICAgICBhbmRcbiAgICAgIGNvbmNhdGVuYXRlXG4gICAgICArYXBwZW5kXG4gICAgICAgICAgZXh0LmpzXG4gICAgICBhbmRcbiAgICAgIHNjc3NcbiAgICAgICAgICAtYXBwTmFtZT1BcHBcbiAgICAgICAgICAtaW1hZ2VTZWFyY2hQYXRoPXJlc291cmNlc1xuICAgICAgICAgIC10aGVtZU5hbWU9dHJpdG9uXG4gICAgICAgICAgLXJlc291cmNlTWFwQmFzZT0uXG4gICAgICAgICAgLW91dHB1dD1leHQuc2Nzc1xuICAgICAgYW5kXG4gICAgICByZXNvdXJjZXNcbiAgICAgICAgICAtZXhjbHVkZXM9LWFsbCouY3NzXG4gICAgICAgICAgLW91dD1yZXNvdXJjZXNcbiAgICAgIGFuZFxuICAgICAgcmVzb3VyY2VzXG4gICAgICAgICAgLW1vZGVsPXRydWVcbiAgICAgICAgICAtb3V0PXJlc291cmNlc1xuICAgICAgXV0+XG4gICAgPC94LWNvbXBpbGU+XG4gIDwvdGFyZ2V0PlxuICA8dGFyZ2V0IG5hbWU9XCJidWlsZFwiIGRlcGVuZHM9XCJpbml0LWNtZCxyZWJ1aWxkXCI+XG4gICAgPHgtc2VuY2hhLWNvbW1hbmQgZGlyPVwiXFwke2Jhc2VkaXJ9XCI+XG4gICAgICA8IVtDREFUQVtcbiAgICAgIGZhc2hpb25cbiAgICAgICAgICAtcHdkPS5cbiAgICAgICAgICAtc3BsaXQ9NDA5NVxuICAgICAgICAgICR7Y29tcHJlc3MgPyAnLWNvbXByZXNzJyA6ICcnfVxuICAgICAgICAgICAgICBleHQuc2Nzc1xuICAgICAgICAgIGV4dC5jc3NcbiAgICAgICR7Y29tcHJlc3Npb259XG4gICAgICBdXT5cbiAgICA8L3gtc2VuY2hhLWNvbW1hbmQ+XG4gIDwvdGFyZ2V0PlxuICA8dGFyZ2V0IG5hbWU9XCJ3YXRjaFwiIGRlcGVuZHM9XCJpbml0LWNtZCxidWlsZFwiPlxuICAgIDx4LWZhc2hpb24td2F0Y2hcbiAgICAgIHJlZk5hbWU9XCJmYXNoaW9uLXdhdGNoXCJcbiAgICAgIGlucHV0RmlsZT1cImV4dC5zY3NzXCJcbiAgICAgIG91dHB1dEZpbGU9XCJleHQuY3NzXCJcbiAgICAgIHNwbGl0PVwiNDA5NVwiXG4gICAgICBjb21wcmVzcz1cIiR7Y29tcHJlc3MgPyAndHJ1ZScgOiAnZmFsc2UnfVwiXG4gICAgICBjb25maWdGaWxlPVwiYXBwLmpzb25cIlxuICAgICAgZm9yaz1cInRydWVcIi8+XG4gICAgPHgtd2F0Y2ggY29tcGlsZXJSZWY9XCJ0aGVDb21waWxlclwiIHRhcmdldHM9XCJyZWJ1aWxkXCIvPlxuICA8L3RhcmdldD5cbjwvcHJvamVjdD5cbmAudHJpbSgpO1xufTtcblxuLyoqXG4gKiBDcmVhdGVzIHRoZSBhcHAuanNvbiBmaWxlXG4gKiBAcGFyYW0ge1N0cmluZ30gdGhlbWUgVGhlIG5hbWUgb2YgdGhlIHRoZW1lIHRvIHVzZS5cbiAqIEBwYXJhbSB7U3RyaW5nW119IHBhY2thZ2VzIFRoZSBuYW1lcyBvZiBwYWNrYWdlcyB0byBpbmNsdWRlIGluIHRoZSBidWlsZFxuICovXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlQXBwSnNvbih7IHRoZW1lLCBwYWNrYWdlcywgdG9vbGtpdCwgb3ZlcnJpZGVzPVtdLCBwYWNrYWdlRGlycz1bXSB9KSB7XG5cbiAgLy92YXIgc2VuY2hhUGF0aCA9ICcvVXNlcnMvbWFyY2d1c21hbm8vX2dpdC9zZW5jaGEvZXh0LXJlYWN0L3BhY2thZ2VzL2V4dC1yZWFjdC1ib2lsZXJwbGF0ZTE3L25vZGVfbW9kdWxlcy9Ac2VuY2hhJ1xuICAvL3BhY2thZ2VEaXJzLnB1c2goc2VuY2hhUGF0aClcbiAgY29uc3QgY29uZmlnID0ge1xuICAgICAgICBmcmFtZXdvcms6IFwiZXh0XCIsXG4gICAgICAgIHRvb2xraXQsXG4gICAgICAgIHJlcXVpcmVzOiBwYWNrYWdlcyxcbiAgICAgICAgcGFja2FnZXM6IHtcbiAgICAgICAgICAgIGRpcjogcGFja2FnZURpcnMubWFwKGRpciA9PiBwYXRoLnJlc29sdmUoZGlyKSlcbiAgICAgICAgfSxcbiAgICAgICAgb3V0cHV0OiB7XG4gICAgICAgICAgICBiYXNlOiAnLicsXG4gICAgICAgICAgICByZXNvdXJjZXM6IHtcbiAgICAgICAgICAgICAgICBwYXRoOiAnLi9yZXNvdXJjZXMnLFxuICAgICAgICAgICAgICAgIHNoYXJlZDogXCIuL3Jlc291cmNlc1wiXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgLy8gaWYgdGhlbWUgaXMgbG9jYWwgYWRkIGl0IGFzIGFuIGFkZGl0aW9uYWwgcGFja2FnZSBkaXJcbiAgICBpZiAoZnMuZXhpc3RzU3luYyh0aGVtZSkpIHtcbiAgICAgICAgY29uc3QgcGFja2FnZUluZm8gPSBjanNvbi5sb2FkKHBhdGguam9pbih0aGVtZSwgJ3BhY2thZ2UuanNvbicpKTtcbiAgICAgICAgY29uZmlnLnRoZW1lID0gcGFja2FnZUluZm8ubmFtZTtcbiAgICAgICAgY29uZmlnLnBhY2thZ2VzLmRpci5wdXNoKHBhdGgucmVzb2x2ZSh0aGVtZSkpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbmZpZy50aGVtZSA9IHRoZW1lO1xuICAgIH1cblxuICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShjb25maWcsIG51bGwsIDQpO1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBqcyBmaWxlIGNvbnRhaW5pbmcgY29kZSB0byBtYWtlIEV4dCBKUyBsb2FkIHByb3Blcmx5IGluIGpzZG9tXG4gKiBAcGFyYW0ge1N0cmluZ30gdGFyZ2V0RGlyIFxuICovXG4vLyBleHBvcnQgZnVuY3Rpb24gY3JlYXRlSlNET01FbnZpcm9ubWVudCh0YXJnZXREaXIpIHtcbi8vICAgICByZXR1cm4gJ3dpbmRvdy5FeHQgPSBFeHQ7RXh0LnJlcXVpcmUoXCJFeHQuZGF0YS5UcmVlU3RvcmVcIik7RXh0LnJlcXVpcmUoXCJFeHQuZ3JpZC5HcmlkXCIpO0V4dC5yZXF1aXJlKFwiRXh0LnBsdWdpbi5SZXNwb25zaXZlXCIpOyc7XG4vLyAgICAgLy9yZXR1cm4gJ3dpbmRvdy5FeHQgPSBFeHQ7RXh0LnJlcXVpcmUoXCJFeHQucmVhY3QuUmVuZGVyZXJDZWxsXCIpO0V4dC5yZXF1aXJlKFwiRXh0LmRhdGEuVHJlZVN0b3JlXCIpO0V4dC5yZXF1aXJlKFwiRXh0LmdyaWQuR3JpZFwiKTtFeHQucmVxdWlyZShcIkV4dC5wbHVnaW4uUmVzcG9uc2l2ZVwiKTsnO1xuLy8gfVxuXG4vKipcbiAqIENyZWF0ZXMgdGhlIHdvcmtzcGFjZS5qc29uIGZpbGVcbiAqIEBwYXJhbSB7U3RyaW5nfSBzZGsgVGhlIHBhdGggdG8gdGhlIHNka1xuICovXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlV29ya3NwYWNlSnNvbihzZGssIHBhY2thZ2VzLCBvdXRwdXQpIHtcbiAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICBcImZyYW1ld29ya3NcIjoge1xuICAgICAgICAgICAgXCJleHRcIjogcGF0aC5yZWxhdGl2ZShvdXRwdXQsIHNkaylcbiAgICAgICAgfSxcbiAgICAgICAgXCJwYWNrYWdlc1wiOiB7XG4gICAgICAgICAgICBcImRpclwiOiBbJyR7d29ya3NwYWNlLmRpcn0vcGFja2FnZXMvbG9jYWwnLCcke3dvcmtzcGFjZS5kaXJ9L3BhY2thZ2VzJ10uY29uY2F0KHBhY2thZ2VzKS5qb2luKCcsJyksXG4gICAgICAgICAgICBcImV4dHJhY3RcIjogXCIke3dvcmtzcGFjZS5kaXJ9L3BhY2thZ2VzL3JlbW90ZVwiXG4gICAgICAgIH1cbiAgICB9LCBudWxsLCA0KTtcbn1cbiJdfQ==