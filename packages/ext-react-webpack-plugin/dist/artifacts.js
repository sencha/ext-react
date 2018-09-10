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
 * @param {Object} sass Sass configuration properties.
 * @param {Object} resources Extra resources to be copied into the resource folder as specified in the "resources" property of the "output" object. Folders specified in this list will be deeply copied.
 */


exports.buildXML = buildXML;

function createAppJson({
  theme,
  packages,
  toolkit,
  overrides = [],
  packageDirs = [],
  sass,
  resources
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
    },
    sass,
    resources
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9hcnRpZmFjdHMuanMiXSwibmFtZXMiOlsiYnVpbGRYTUwyIiwiY29tcHJlc3MiLCJidWlsZFhNTCIsImNvbXByZXNzaW9uIiwidHJpbSIsImNyZWF0ZUFwcEpzb24iLCJ0aGVtZSIsInBhY2thZ2VzIiwidG9vbGtpdCIsIm92ZXJyaWRlcyIsInBhY2thZ2VEaXJzIiwic2FzcyIsInJlc291cmNlcyIsImNvbmZpZyIsImZyYW1ld29yayIsInJlcXVpcmVzIiwiZGlyIiwibWFwIiwicGF0aCIsInJlc29sdmUiLCJvdXRwdXQiLCJiYXNlIiwic2hhcmVkIiwiZnMiLCJleGlzdHNTeW5jIiwicGFja2FnZUluZm8iLCJjanNvbiIsImxvYWQiLCJqb2luIiwibmFtZSIsInB1c2giLCJKU09OIiwic3RyaW5naWZ5IiwiY3JlYXRlV29ya3NwYWNlSnNvbiIsInNkayIsInJlbGF0aXZlIiwiY29uY2F0Il0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7QUFFTyxNQUFNQSxTQUFTLEdBQUcsVUFBUztBQUFFQyxFQUFBQTtBQUFGLENBQVQsRUFBdUI7QUFDOUMsU0FBUTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FBUjtBQXNHRCxDQXZHTTs7OztBQTBHQSxNQUFNQyxRQUFRLEdBQUcsVUFBUztBQUFFRCxFQUFBQTtBQUFGLENBQVQsRUFBdUI7QUFDM0MsTUFBSUUsV0FBVyxHQUFHLEVBQWxCOztBQUVBLE1BQUlGLFFBQUosRUFBYztBQUNWRSxJQUFBQSxXQUFXLEdBQUk7Ozs7Ozs7U0FBZjtBQVFIOztBQUVELFNBQVE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1lBbUZBRixRQUFRLEdBQUcsV0FBSCxHQUFpQixFQUFHOzs7UUFHaENFLFdBQVk7Ozs7Ozs7Ozs7a0JBVUZGLFFBQVEsR0FBRyxNQUFILEdBQVksT0FBUTs7Ozs7O0NBaEduQyxDQXNHVEcsSUF0R1MsRUFBUDtBQXVHSCxDQXJITTtBQXVIUDs7Ozs7Ozs7Ozs7QUFPTyxTQUFTQyxhQUFULENBQXVCO0FBQUVDLEVBQUFBLEtBQUY7QUFBU0MsRUFBQUEsUUFBVDtBQUFtQkMsRUFBQUEsT0FBbkI7QUFBNEJDLEVBQUFBLFNBQVMsR0FBQyxFQUF0QztBQUEwQ0MsRUFBQUEsV0FBVyxHQUFDLEVBQXREO0FBQTBEQyxFQUFBQSxJQUExRDtBQUFnRUMsRUFBQUE7QUFBaEUsQ0FBdkIsRUFBb0c7QUFFekc7QUFDQTtBQUNBLFFBQU1DLE1BQU0sR0FBRztBQUNUQyxJQUFBQSxTQUFTLEVBQUUsS0FERjtBQUVUTixJQUFBQSxPQUZTO0FBR1RPLElBQUFBLFFBQVEsRUFBRVIsUUFIRDtBQUlUQSxJQUFBQSxRQUFRLEVBQUU7QUFDTlMsTUFBQUEsR0FBRyxFQUFFTixXQUFXLENBQUNPLEdBQVosQ0FBZ0JELEdBQUcsSUFBSUUsY0FBS0MsT0FBTCxDQUFhSCxHQUFiLENBQXZCO0FBREMsS0FKRDtBQU9USSxJQUFBQSxNQUFNLEVBQUU7QUFDSkMsTUFBQUEsSUFBSSxFQUFFLEdBREY7QUFFSlQsTUFBQUEsU0FBUyxFQUFFO0FBQ1BNLFFBQUFBLElBQUksRUFBRSxhQURDO0FBRVBJLFFBQUFBLE1BQU0sRUFBRTtBQUZEO0FBRlAsS0FQQztBQWNUWCxJQUFBQSxJQWRTO0FBZVRDLElBQUFBO0FBZlMsR0FBZixDQUp5RyxDQXNCdkc7O0FBQ0EsTUFBSVcsWUFBR0MsVUFBSCxDQUFjbEIsS0FBZCxDQUFKLEVBQTBCO0FBQ3RCLFVBQU1tQixXQUFXLEdBQUdDLGVBQU1DLElBQU4sQ0FBV1QsY0FBS1UsSUFBTCxDQUFVdEIsS0FBVixFQUFpQixjQUFqQixDQUFYLENBQXBCOztBQUNBTyxJQUFBQSxNQUFNLENBQUNQLEtBQVAsR0FBZW1CLFdBQVcsQ0FBQ0ksSUFBM0I7QUFDQWhCLElBQUFBLE1BQU0sQ0FBQ04sUUFBUCxDQUFnQlMsR0FBaEIsQ0FBb0JjLElBQXBCLENBQXlCWixjQUFLQyxPQUFMLENBQWFiLEtBQWIsQ0FBekI7QUFDSCxHQUpELE1BSU87QUFDSE8sSUFBQUEsTUFBTSxDQUFDUCxLQUFQLEdBQWVBLEtBQWY7QUFDSDs7QUFFRCxTQUFPeUIsSUFBSSxDQUFDQyxTQUFMLENBQWVuQixNQUFmLEVBQXVCLElBQXZCLEVBQTZCLENBQTdCLENBQVA7QUFDSDtBQUVEOzs7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7OztBQUlPLFNBQVNvQixtQkFBVCxDQUE2QkMsR0FBN0IsRUFBa0MzQixRQUFsQyxFQUE0Q2EsTUFBNUMsRUFBb0Q7QUFDdkQsU0FBT1csSUFBSSxDQUFDQyxTQUFMLENBQWU7QUFDbEIsa0JBQWM7QUFDVixhQUFPZCxjQUFLaUIsUUFBTCxDQUFjZixNQUFkLEVBQXNCYyxHQUF0QjtBQURHLEtBREk7QUFJbEIsZ0JBQVk7QUFDUixhQUFPLENBQUMsaUNBQUQsRUFBbUMsMkJBQW5DLEVBQWdFRSxNQUFoRSxDQUF1RTdCLFFBQXZFLEVBQWlGcUIsSUFBakYsQ0FBc0YsR0FBdEYsQ0FEQztBQUVSLGlCQUFXO0FBRkg7QUFKTSxHQUFmLEVBUUosSUFSSSxFQVFFLENBUkYsQ0FBUDtBQVNIIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCBmcyBmcm9tICdmcyc7XG5pbXBvcnQgY2pzb24gZnJvbSAnY2pzb24nO1xuXG5leHBvcnQgY29uc3QgYnVpbGRYTUwyID0gZnVuY3Rpb24oeyBjb21wcmVzcyB9KSB7XG4gIHJldHVybiBgXG4gIDxwcm9qZWN0IG5hbWU9XCJzaW1wbGUtYnVpbGRcIiBiYXNlZGlyPVwiLlwiPlxuXG4gIDwhLS0gRmluZCBhbmQgbG9hZCBTZW5jaGEgQ21kIGFudCB0YXNrcyAtLT5cbiAgPHNjcmlwdCBsYW5ndWFnZT1cImphdmFzY3JpcHRcIj5cbiAgICAgIDwhW0NEQVRBW1xuICAgICAgICAgIHZhciBkaXIgPSBwcm9qZWN0LmdldFByb3BlcnR5KFwiYmFzZWRpclwiKSxcbiAgICAgICAgICAgICAgY21kRGlyID0gcHJvamVjdC5nZXRQcm9wZXJ0eShcImNtZC5kaXJcIiksXG4gICAgICAgICAgICAgIGNtZExvYWRlZCA9IHByb2plY3QuZ2V0UmVmZXJlbmNlKFwic2VuY2hhbG9hZGVyXCIpO1xuXG4gICAgICAgICAgaWYgKCFjbWRMb2FkZWQpIHtcbiAgICAgICAgICAgICAgZnVuY3Rpb24gZWNobyhtZXNzYWdlLCBmaWxlKSB7XG4gICAgICAgICAgICAgICAgICB2YXIgZSA9IHByb2plY3QuY3JlYXRlVGFzayhcImVjaG9cIik7XG4gICAgICAgICAgICAgICAgICBlLnNldE1lc3NhZ2UobWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgICBpZiAoZmlsZSkge1xuICAgICAgICAgICAgICAgICAgICAgIGUuc2V0RmlsZShmaWxlKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIGUuZXhlY3V0ZSgpO1xuICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgIGlmICghY21kRGlyKSB7XG5cbiAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uIGV4ZWMoYXJncykge1xuICAgICAgICAgICAgICAgICAgICAgIHZhciBwcm9jZXNzID0gamF2YS5sYW5nLlJ1bnRpbWUuZ2V0UnVudGltZSgpLmV4ZWMoYXJncyksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0ID0gbmV3IGphdmEuaW8uQnVmZmVyZWRSZWFkZXIobmV3IGphdmEuaW8uSW5wdXRTdHJlYW1SZWFkZXIocHJvY2Vzcy5nZXRJbnB1dFN0cmVhbSgpKSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlckZvdW5kID0gZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGxpbmU7XG5cbiAgICAgICAgICAgICAgICAgICAgICB3aGlsZSAobGluZSA9IGlucHV0LnJlYWRMaW5lKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbGluZSA9IGxpbmUgKyAnJztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgamF2YS5sYW5nLlN5c3RlbS5vdXQucHJpbnRsbihsaW5lKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxpbmUuaW5kZXhPZihcIlNlbmNoYSBDbWRcIikgPiAtMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyRm91bmQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGhlYWRlckZvdW5kICYmICFjbWREaXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNtZERpciA9IGxpbmU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9qZWN0LnNldFByb3BlcnR5KFwiY21kLmRpclwiLCBjbWREaXIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIHByb2Nlc3Mud2FpdEZvcigpO1xuICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAhIWNtZERpcjtcbiAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgaWYgKCFleGVjKFtcInNlbmNoYVwiLCBcIndoaWNoXCJdKSkge1xuICAgICAgICAgICAgICAgICAgICAgIHZhciB0bXBGaWxlID0gXCJ0bXAuc2hcIjtcbiAgICAgICAgICAgICAgICAgICAgICBlY2hvKFwic291cmNlIH4vLmJhc2hfcHJvZmlsZTsgc2VuY2hhIFwiICsgd2hpY2hBcmdzLmpvaW4oXCIgXCIpLCB0bXBGaWxlKTtcbiAgICAgICAgICAgICAgICAgICAgICBleGVjKFtcIi9iaW4vc2hcIiwgdG1wRmlsZV0pO1xuICAgICAgICAgICAgICAgICAgICAgIG5ldyBqYXZhLmlvLkZpbGUodG1wRmlsZSlbJ2RlbGV0ZSddKCk7IFxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKGNtZERpciAmJiAhcHJvamVjdC5nZXRUYXJnZXRzKCkuY29udGFpbnNLZXkoXCJpbml0LWNtZFwiKSkge1xuICAgICAgICAgICAgICB2YXIgaW1wb3J0RGlyID0gcHJvamVjdC5nZXRQcm9wZXJ0eShcImJ1aWxkLWltcGwuZGlyXCIpIHx8IFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGNtZERpciArIFwiL2FudC9idWlsZC9hcHAvYnVpbGQtaW1wbC54bWxcIik7XG4gICAgICAgICAgICAgIHZhciBpbXBvcnRUYXNrID0gcHJvamVjdC5jcmVhdGVUYXNrKFwiaW1wb3J0XCIpO1xuXG4gICAgICAgICAgICAgIGltcG9ydFRhc2suc2V0T3duaW5nVGFyZ2V0KHNlbGYuZ2V0T3duaW5nVGFyZ2V0KCkpO1xuICAgICAgICAgICAgICBpbXBvcnRUYXNrLnNldExvY2F0aW9uKHNlbGYuZ2V0TG9jYXRpb24oKSk7XG4gICAgICAgICAgICAgIGltcG9ydFRhc2suc2V0RmlsZShpbXBvcnREaXIpO1xuICAgICAgICAgICAgICBpbXBvcnRUYXNrLmV4ZWN1dGUoKTtcbiAgICAgICAgICB9XG4gICAgICBdXT5cbiAgPC9zY3JpcHQ+XG5cbiAgPCEtLVxuICBUaGUgZm9sbG93aW5nIHRhcmdldHMgY2FuIGJlIHByb3ZpZGVkIHRvIGluamVjdCBsb2dpYyBiZWZvcmUgYW5kL29yIGFmdGVyIGtleSBzdGVwc1xuICBvZiB0aGUgYnVpbGQgcHJvY2VzczpcblxuICAgICAgVGhlIFwiaW5pdC1sb2NhbFwiIHRhcmdldCBpcyB1c2VkIHRvIGluaXRpYWxpemUgcHJvcGVydGllcyB0aGF0IG1heSBiZSBwZXJzb25hbGl6ZWRcbiAgICAgIGZvciB0aGUgbG9jYWwgbWFjaGluZS5cblxuICAgICAgICAgIDx0YXJnZXQgbmFtZT1cIi1iZWZvcmUtaW5pdC1sb2NhbFwiLz5cbiAgICAgICAgICA8dGFyZ2V0IG5hbWU9XCItYWZ0ZXItaW5pdC1sb2NhbFwiLz5cblxuICAgICAgVGhlIFwiY2xlYW5cIiB0YXJnZXQgaXMgdXNlZCB0byBjbGVhbiBidWlsZCBvdXRwdXQgZnJvbSB0aGUgYnVpbGQuZGlyLlxuXG4gICAgICAgICAgPHRhcmdldCBuYW1lPVwiLWJlZm9yZS1jbGVhblwiLz5cbiAgICAgICAgICA8dGFyZ2V0IG5hbWU9XCItYWZ0ZXItY2xlYW5cIi8+XG5cbiAgICAgIFRoZSBnZW5lcmFsIFwiaW5pdFwiIHRhcmdldCBpcyB1c2VkIHRvIGluaXRpYWxpemUgYWxsIG90aGVyIHByb3BlcnRpZXMsIGluY2x1ZGluZ1xuICAgICAgdGhvc2UgcHJvdmlkZWQgYnkgU2VuY2hhIENtZC5cblxuICAgICAgICAgIDx0YXJnZXQgbmFtZT1cIi1iZWZvcmUtaW5pdFwiLz5cbiAgICAgICAgICA8dGFyZ2V0IG5hbWU9XCItYWZ0ZXItaW5pdFwiLz5cblxuICAgICAgVGhlIFwicGFnZVwiIHRhcmdldCBwZXJmb3JtcyB0aGUgY2FsbCB0byBTZW5jaGEgQ21kIHRvIGJ1aWxkIHRoZSAnYWxsLWNsYXNzZXMuanMnIGZpbGUuXG5cbiAgICAgICAgICA8dGFyZ2V0IG5hbWU9XCItYmVmb3JlLXBhZ2VcIi8+XG4gICAgICAgICAgPHRhcmdldCBuYW1lPVwiLWFmdGVyLXBhZ2VcIi8+XG5cbiAgICAgIFRoZSBcImJ1aWxkXCIgdGFyZ2V0IHBlcmZvcm1zIHRoZSBjYWxsIHRvIFNlbmNoYSBDbWQgdG8gYnVpbGQgdGhlIGFwcGxpY2F0aW9uLlxuXG4gICAgICAgICAgPHRhcmdldCBuYW1lPVwiLWJlZm9yZS1idWlsZFwiLz5cbiAgICAgICAgICA8dGFyZ2V0IG5hbWU9XCItYWZ0ZXItYnVpbGRcIi8+XG4gIC0tPlxuXG48L3Byb2plY3Q+XG5cblxuXG4gIGBcbn1cblxuXG5leHBvcnQgY29uc3QgYnVpbGRYTUwgPSBmdW5jdGlvbih7IGNvbXByZXNzIH0pIHtcbiAgICBsZXQgY29tcHJlc3Npb24gPSAnJztcblxuICAgIGlmIChjb21wcmVzcykge1xuICAgICAgICBjb21wcmVzc2lvbiA9IGBcbiAgICAgICAgICAgIHRoZW4gXG4gICAgICAgICAgICBmcyBcbiAgICAgICAgICAgIG1pbmlmeSBcbiAgICAgICAgICAgICAgICAteXVpIFxuICAgICAgICAgICAgICAgIC1mcm9tPWV4dC5qcyBcbiAgICAgICAgICAgICAgICAtdG89ZXh0LmpzXG4gICAgICAgIGA7XG4gICAgfVxuXG4gICAgcmV0dXJuIGA8cHJvamVjdCBuYW1lPVwic2ltcGxlLWJ1aWxkXCIgYmFzZWRpcj1cIi5cIj5cbiAgPCEtLSAgaW50ZXJuYWxseSwgd2F0Y2ggY2FsbHMgdGhlIGluaXQgdGFyZ2V0LCBzbyBuZWVkIHRvIGhhdmUgb25lIGhlcmUgLS0+XG4gIDx0YXJnZXQgbmFtZT1cImluaXRcIi8+XG4gIDx0YXJnZXQgbmFtZT1cImluaXQtY21kXCI+XG4gICAgPHRhc2tkZWYgIHJlc291cmNlPVwiY29tL3NlbmNoYS9hbnQvYW50bGliLnhtbFwiXG4gICAgICAgICAgICAgIGNsYXNzcGF0aD1cIlxcJHtjbWQuZGlyfS9zZW5jaGEuamFyXCJcbiAgICAgICAgICAgICAgbG9hZGVycmVmPVwic2VuY2hhbG9hZGVyXCIvPlxuICAgIDx4LWV4dGVuZC1jbGFzc3BhdGg+XG4gICAgICAgIDxqYXIgcGF0aD1cIlxcJHtjbWQuZGlyfS9zZW5jaGEuamFyXCIvPlxuICAgIDwveC1leHRlbmQtY2xhc3NwYXRoPlxuICAgIDx4LXNlbmNoYS1pbml0IHByZWZpeD1cIlwiLz5cbiAgICA8eC1jb21waWxlIHJlZmlkPVwidGhlQ29tcGlsZXJcIlxuICAgICAgICAgICAgICAgICAgICAgIGRpcj1cIlxcJHtiYXNlZGlyfVwiXG4gICAgICAgICAgICAgICAgICAgICAgaW5pdE9ubHk9XCJ0cnVlXCJcbiAgICAgICAgICAgICAgICAgICAgICBpbmhlcml0QWxsPVwidHJ1ZVwiPlxuICAgICAgICAgICAgICA8IVtDREFUQVtcbiAgICAgICAgICAgICAgLWNsYXNzcGF0aD1cXCR7YmFzZWRpcn0vbWFuaWZlc3QuanNcbiAgICAgICAgICAgICAgbG9hZC1hcHBcbiAgICAgICAgICAgICAgICAgIC10ZW1wPVxcJHtiYXNlZGlyfS90ZW1wXG4gICAgICAgICAgICAgICAgICAtdGFnPUFwcFxuICAgICAgICBdXT5cbiAgICAgIDwveC1jb21waWxlPlxuICA8L3RhcmdldD5cbiAgPHRhcmdldCBuYW1lPVwicmVidWlsZFwiPlxuICAgIDx4LWNvbXBpbGUgcmVmaWQ9XCJ0aGVDb21waWxlclwiXG4gICAgICAgICAgICAgIGRpcj1cIlxcJHtiYXNlZGlyfVwiXG4gICAgICAgICAgICAgIGluaGVyaXRBbGw9XCJ0cnVlXCI+XG4gICAgICA8IVtDREFUQVtcbiAgICAgIC0tZGVidWdcbiAgICAgIGV4Y2x1ZGVcbiAgICAgIC1hbGxcbiAgICAgIGFuZFxuICAgICAgaW5jbHVkZVxuICAgICAgLWY9Qm9vdC5qc1xuICAgICAgYW5kXG4gICAgICBjb25jYXRlbmF0ZVxuICAgICAgICAgIGV4dC5qc1xuICAgICAgYW5kXG4gICAgICBleGNsdWRlXG4gICAgICAtYWxsXG4gICAgICBhbmRcbiAgICAgICMgaW5jbHVkZSB0aGVtZSBvdmVycmlkZXNcbiAgICAgIGluY2x1ZGVcbiAgICAgICAgLXJcbiAgICAgICAgLXRhZz1vdmVycmlkZXNcbiAgICAgIGFuZFxuICAgICAgIyBpbmNsdWRlIGFsbCBqcyBmaWxlcyBuZWVkZWQgZm9yIG1hbmlmZXN0LmpzXG4gICAgICBpbmNsdWRlXG4gICAgICAgICAgLXJcbiAgICAgICAgICAtZj1tYW5pZmVzdC5qc1xuICAgICAgYW5kXG4gICAgICAjIGV4Y2x1ZGUgdGhlIGdlbmVyYXRlZCBtYW5pZmVzdCBmaWxlIGl0c2VsZixcbiAgICAgICMgc2luY2Ugd2UgZG9uJ3Qgd2FudCB0aGUgZ2VuZXJhdGVkIGJ1bmRsZSBmaWxlIHRvIGNyZWF0ZSBhbnkgY29tcG9uZW50c1xuICAgICAgZXhjbHVkZVxuICAgICAgLWY9bWFuaWZlc3QuanNcbiAgICAgIGFuZFxuICAgICAgY29uY2F0ZW5hdGVcbiAgICAgICthcHBlbmRcbiAgICAgICAgICBleHQuanNcbiAgICAgIGFuZFxuICAgICAgc2Nzc1xuICAgICAgICAgIC1hcHBOYW1lPUFwcFxuICAgICAgICAgIC1pbWFnZVNlYXJjaFBhdGg9cmVzb3VyY2VzXG4gICAgICAgICAgLXRoZW1lTmFtZT10cml0b25cbiAgICAgICAgICAtcmVzb3VyY2VNYXBCYXNlPS5cbiAgICAgICAgICAtb3V0cHV0PWV4dC5zY3NzXG4gICAgICBhbmRcbiAgICAgIHJlc291cmNlc1xuICAgICAgICAgIC1leGNsdWRlcz0tYWxsKi5jc3NcbiAgICAgICAgICAtb3V0PXJlc291cmNlc1xuICAgICAgYW5kXG4gICAgICByZXNvdXJjZXNcbiAgICAgICAgICAtbW9kZWw9dHJ1ZVxuICAgICAgICAgIC1vdXQ9cmVzb3VyY2VzXG4gICAgICBdXT5cbiAgICA8L3gtY29tcGlsZT5cbiAgPC90YXJnZXQ+XG4gIDx0YXJnZXQgbmFtZT1cImJ1aWxkXCIgZGVwZW5kcz1cImluaXQtY21kLHJlYnVpbGRcIj5cbiAgICA8eC1zZW5jaGEtY29tbWFuZCBkaXI9XCJcXCR7YmFzZWRpcn1cIj5cbiAgICAgIDwhW0NEQVRBW1xuICAgICAgZmFzaGlvblxuICAgICAgICAgIC1wd2Q9LlxuICAgICAgICAgIC1zcGxpdD00MDk1XG4gICAgICAgICAgJHtjb21wcmVzcyA/ICctY29tcHJlc3MnIDogJyd9XG4gICAgICAgICAgICAgIGV4dC5zY3NzXG4gICAgICAgICAgZXh0LmNzc1xuICAgICAgJHtjb21wcmVzc2lvbn1cbiAgICAgIF1dPlxuICAgIDwveC1zZW5jaGEtY29tbWFuZD5cbiAgPC90YXJnZXQ+XG4gIDx0YXJnZXQgbmFtZT1cIndhdGNoXCIgZGVwZW5kcz1cImluaXQtY21kLGJ1aWxkXCI+XG4gICAgPHgtZmFzaGlvbi13YXRjaFxuICAgICAgcmVmTmFtZT1cImZhc2hpb24td2F0Y2hcIlxuICAgICAgaW5wdXRGaWxlPVwiZXh0LnNjc3NcIlxuICAgICAgb3V0cHV0RmlsZT1cImV4dC5jc3NcIlxuICAgICAgc3BsaXQ9XCI0MDk1XCJcbiAgICAgIGNvbXByZXNzPVwiJHtjb21wcmVzcyA/ICd0cnVlJyA6ICdmYWxzZSd9XCJcbiAgICAgIGNvbmZpZ0ZpbGU9XCJhcHAuanNvblwiXG4gICAgICBmb3JrPVwidHJ1ZVwiLz5cbiAgICA8eC13YXRjaCBjb21waWxlclJlZj1cInRoZUNvbXBpbGVyXCIgdGFyZ2V0cz1cInJlYnVpbGRcIi8+XG4gIDwvdGFyZ2V0PlxuPC9wcm9qZWN0PlxuYC50cmltKCk7XG59O1xuXG4vKipcbiAqIENyZWF0ZXMgdGhlIGFwcC5qc29uIGZpbGVcbiAqIEBwYXJhbSB7U3RyaW5nfSB0aGVtZSBUaGUgbmFtZSBvZiB0aGUgdGhlbWUgdG8gdXNlLlxuICogQHBhcmFtIHtTdHJpbmdbXX0gcGFja2FnZXMgVGhlIG5hbWVzIG9mIHBhY2thZ2VzIHRvIGluY2x1ZGUgaW4gdGhlIGJ1aWxkXG4gKiBAcGFyYW0ge09iamVjdH0gc2FzcyBTYXNzIGNvbmZpZ3VyYXRpb24gcHJvcGVydGllcy5cbiAqIEBwYXJhbSB7T2JqZWN0fSByZXNvdXJjZXMgRXh0cmEgcmVzb3VyY2VzIHRvIGJlIGNvcGllZCBpbnRvIHRoZSByZXNvdXJjZSBmb2xkZXIgYXMgc3BlY2lmaWVkIGluIHRoZSBcInJlc291cmNlc1wiIHByb3BlcnR5IG9mIHRoZSBcIm91dHB1dFwiIG9iamVjdC4gRm9sZGVycyBzcGVjaWZpZWQgaW4gdGhpcyBsaXN0IHdpbGwgYmUgZGVlcGx5IGNvcGllZC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUFwcEpzb24oeyB0aGVtZSwgcGFja2FnZXMsIHRvb2xraXQsIG92ZXJyaWRlcz1bXSwgcGFja2FnZURpcnM9W10sIHNhc3MsIHJlc291cmNlcyB9KSB7XG5cbiAgLy92YXIgc2VuY2hhUGF0aCA9ICcvVXNlcnMvbWFyY2d1c21hbm8vX2dpdC9zZW5jaGEvZXh0LXJlYWN0L3BhY2thZ2VzL2V4dC1yZWFjdC1ib2lsZXJwbGF0ZTE3L25vZGVfbW9kdWxlcy9Ac2VuY2hhJ1xuICAvL3BhY2thZ2VEaXJzLnB1c2goc2VuY2hhUGF0aClcbiAgY29uc3QgY29uZmlnID0ge1xuICAgICAgICBmcmFtZXdvcms6IFwiZXh0XCIsXG4gICAgICAgIHRvb2xraXQsXG4gICAgICAgIHJlcXVpcmVzOiBwYWNrYWdlcyxcbiAgICAgICAgcGFja2FnZXM6IHtcbiAgICAgICAgICAgIGRpcjogcGFja2FnZURpcnMubWFwKGRpciA9PiBwYXRoLnJlc29sdmUoZGlyKSlcbiAgICAgICAgfSxcbiAgICAgICAgb3V0cHV0OiB7XG4gICAgICAgICAgICBiYXNlOiAnLicsXG4gICAgICAgICAgICByZXNvdXJjZXM6IHtcbiAgICAgICAgICAgICAgICBwYXRoOiAnLi9yZXNvdXJjZXMnLFxuICAgICAgICAgICAgICAgIHNoYXJlZDogXCIuL3Jlc291cmNlc1wiXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHNhc3MsXG4gICAgICAgIHJlc291cmNlc1xuICAgIH07XG5cbiAgICAvLyBpZiB0aGVtZSBpcyBsb2NhbCBhZGQgaXQgYXMgYW4gYWRkaXRpb25hbCBwYWNrYWdlIGRpclxuICAgIGlmIChmcy5leGlzdHNTeW5jKHRoZW1lKSkge1xuICAgICAgICBjb25zdCBwYWNrYWdlSW5mbyA9IGNqc29uLmxvYWQocGF0aC5qb2luKHRoZW1lLCAncGFja2FnZS5qc29uJykpO1xuICAgICAgICBjb25maWcudGhlbWUgPSBwYWNrYWdlSW5mby5uYW1lO1xuICAgICAgICBjb25maWcucGFja2FnZXMuZGlyLnB1c2gocGF0aC5yZXNvbHZlKHRoZW1lKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgY29uZmlnLnRoZW1lID0gdGhlbWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KGNvbmZpZywgbnVsbCwgNCk7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIGpzIGZpbGUgY29udGFpbmluZyBjb2RlIHRvIG1ha2UgRXh0IEpTIGxvYWQgcHJvcGVybHkgaW4ganNkb21cbiAqIEBwYXJhbSB7U3RyaW5nfSB0YXJnZXREaXIgXG4gKi9cbi8vIGV4cG9ydCBmdW5jdGlvbiBjcmVhdGVKU0RPTUVudmlyb25tZW50KHRhcmdldERpcikge1xuLy8gICAgIHJldHVybiAnd2luZG93LkV4dCA9IEV4dDtFeHQucmVxdWlyZShcIkV4dC5kYXRhLlRyZWVTdG9yZVwiKTtFeHQucmVxdWlyZShcIkV4dC5ncmlkLkdyaWRcIik7RXh0LnJlcXVpcmUoXCJFeHQucGx1Z2luLlJlc3BvbnNpdmVcIik7Jztcbi8vICAgICAvL3JldHVybiAnd2luZG93LkV4dCA9IEV4dDtFeHQucmVxdWlyZShcIkV4dC5yZWFjdC5SZW5kZXJlckNlbGxcIik7RXh0LnJlcXVpcmUoXCJFeHQuZGF0YS5UcmVlU3RvcmVcIik7RXh0LnJlcXVpcmUoXCJFeHQuZ3JpZC5HcmlkXCIpO0V4dC5yZXF1aXJlKFwiRXh0LnBsdWdpbi5SZXNwb25zaXZlXCIpOyc7XG4vLyB9XG5cbi8qKlxuICogQ3JlYXRlcyB0aGUgd29ya3NwYWNlLmpzb24gZmlsZVxuICogQHBhcmFtIHtTdHJpbmd9IHNkayBUaGUgcGF0aCB0byB0aGUgc2RrXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVXb3Jrc3BhY2VKc29uKHNkaywgcGFja2FnZXMsIG91dHB1dCkge1xuICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgIFwiZnJhbWV3b3Jrc1wiOiB7XG4gICAgICAgICAgICBcImV4dFwiOiBwYXRoLnJlbGF0aXZlKG91dHB1dCwgc2RrKVxuICAgICAgICB9LFxuICAgICAgICBcInBhY2thZ2VzXCI6IHtcbiAgICAgICAgICAgIFwiZGlyXCI6IFsnJHt3b3Jrc3BhY2UuZGlyfS9wYWNrYWdlcy9sb2NhbCcsJyR7d29ya3NwYWNlLmRpcn0vcGFja2FnZXMnXS5jb25jYXQocGFja2FnZXMpLmpvaW4oJywnKSxcbiAgICAgICAgICAgIFwiZXh0cmFjdFwiOiBcIiR7d29ya3NwYWNlLmRpcn0vcGFja2FnZXMvcmVtb3RlXCJcbiAgICAgICAgfVxuICAgIH0sIG51bGwsIDQpO1xufVxuIl19