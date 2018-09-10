"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createAppJson = createAppJson;
exports.createJSDOMEnvironment = createJSDOMEnvironment;
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
    overrides: overrides.map(dir => _path.default.resolve(dir)).concat('jsdom-environment.js'),
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


function createJSDOMEnvironment(targetDir) {
  return 'window.Ext = Ext;'; //return 'window.Ext = Ext;Ext.require("Ext.data.TreeStore");Ext.require("Ext.grid.Grid");Ext.require("Ext.plugin.Responsive");';
  //return 'window.Ext = Ext;Ext.require("Ext.react.RendererCell");Ext.require("Ext.data.TreeStore");Ext.require("Ext.grid.Grid");Ext.require("Ext.plugin.Responsive");';
}
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9hcnRpZmFjdHMuanMiXSwibmFtZXMiOlsiYnVpbGRYTUwyIiwiY29tcHJlc3MiLCJidWlsZFhNTCIsImNvbXByZXNzaW9uIiwidHJpbSIsImNyZWF0ZUFwcEpzb24iLCJ0aGVtZSIsInBhY2thZ2VzIiwidG9vbGtpdCIsIm92ZXJyaWRlcyIsInBhY2thZ2VEaXJzIiwiY29uZmlnIiwiZnJhbWV3b3JrIiwicmVxdWlyZXMiLCJtYXAiLCJkaXIiLCJwYXRoIiwicmVzb2x2ZSIsImNvbmNhdCIsIm91dHB1dCIsImJhc2UiLCJyZXNvdXJjZXMiLCJzaGFyZWQiLCJmcyIsImV4aXN0c1N5bmMiLCJwYWNrYWdlSW5mbyIsImNqc29uIiwibG9hZCIsImpvaW4iLCJuYW1lIiwicHVzaCIsIkpTT04iLCJzdHJpbmdpZnkiLCJjcmVhdGVKU0RPTUVudmlyb25tZW50IiwidGFyZ2V0RGlyIiwiY3JlYXRlV29ya3NwYWNlSnNvbiIsInNkayIsInJlbGF0aXZlIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7OztBQUNBOztBQUNBOztBQUNBOzs7O0FBRU8sTUFBTUEsU0FBUyxHQUFHLFVBQVM7QUFBRUMsRUFBQUE7QUFBRixDQUFULEVBQXVCO0FBQzlDLFNBQVE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBQVI7QUFzR0QsQ0F2R007Ozs7QUEwR0EsTUFBTUMsUUFBUSxHQUFHLFVBQVM7QUFBRUQsRUFBQUE7QUFBRixDQUFULEVBQXVCO0FBQzNDLE1BQUlFLFdBQVcsR0FBRyxFQUFsQjs7QUFFQSxNQUFJRixRQUFKLEVBQWM7QUFDVkUsSUFBQUEsV0FBVyxHQUFJOzs7Ozs7O1NBQWY7QUFRSDs7QUFFRCxTQUFROzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztZQW1GQUYsUUFBUSxHQUFHLFdBQUgsR0FBaUIsRUFBRzs7O1FBR2hDRSxXQUFZOzs7Ozs7Ozs7O2tCQVVGRixRQUFRLEdBQUcsTUFBSCxHQUFZLE9BQVE7Ozs7OztDQWhHbkMsQ0FzR1RHLElBdEdTLEVBQVA7QUF1R0gsQ0FySE07QUF1SFA7Ozs7Ozs7OztBQUtPLFNBQVNDLGFBQVQsQ0FBdUI7QUFBRUMsRUFBQUEsS0FBRjtBQUFTQyxFQUFBQSxRQUFUO0FBQW1CQyxFQUFBQSxPQUFuQjtBQUE0QkMsRUFBQUEsU0FBUyxHQUFDLEVBQXRDO0FBQTBDQyxFQUFBQSxXQUFXLEdBQUM7QUFBdEQsQ0FBdkIsRUFBbUY7QUFFeEY7QUFDQTtBQUNBLFFBQU1DLE1BQU0sR0FBRztBQUNUQyxJQUFBQSxTQUFTLEVBQUUsS0FERjtBQUVUSixJQUFBQSxPQUZTO0FBR1RLLElBQUFBLFFBQVEsRUFBRU4sUUFIRDtBQUlURSxJQUFBQSxTQUFTLEVBQUVBLFNBQVMsQ0FBQ0ssR0FBVixDQUFjQyxHQUFHLElBQUlDLGNBQUtDLE9BQUwsQ0FBYUYsR0FBYixDQUFyQixFQUF3Q0csTUFBeEMsQ0FBK0Msc0JBQS9DLENBSkY7QUFLVFgsSUFBQUEsUUFBUSxFQUFFO0FBQ05RLE1BQUFBLEdBQUcsRUFBRUwsV0FBVyxDQUFDSSxHQUFaLENBQWdCQyxHQUFHLElBQUlDLGNBQUtDLE9BQUwsQ0FBYUYsR0FBYixDQUF2QjtBQURDLEtBTEQ7QUFRVEksSUFBQUEsTUFBTSxFQUFFO0FBQ0pDLE1BQUFBLElBQUksRUFBRSxHQURGO0FBRUpDLE1BQUFBLFNBQVMsRUFBRTtBQUNQTCxRQUFBQSxJQUFJLEVBQUUsYUFEQztBQUVQTSxRQUFBQSxNQUFNLEVBQUU7QUFGRDtBQUZQO0FBUkMsR0FBZixDQUp3RixDQXFCdEY7O0FBQ0EsTUFBSUMsWUFBR0MsVUFBSCxDQUFjbEIsS0FBZCxDQUFKLEVBQTBCO0FBQ3RCLFVBQU1tQixXQUFXLEdBQUdDLGVBQU1DLElBQU4sQ0FBV1gsY0FBS1ksSUFBTCxDQUFVdEIsS0FBVixFQUFpQixjQUFqQixDQUFYLENBQXBCOztBQUNBSyxJQUFBQSxNQUFNLENBQUNMLEtBQVAsR0FBZW1CLFdBQVcsQ0FBQ0ksSUFBM0I7QUFDQWxCLElBQUFBLE1BQU0sQ0FBQ0osUUFBUCxDQUFnQlEsR0FBaEIsQ0FBb0JlLElBQXBCLENBQXlCZCxjQUFLQyxPQUFMLENBQWFYLEtBQWIsQ0FBekI7QUFDSCxHQUpELE1BSU87QUFDSEssSUFBQUEsTUFBTSxDQUFDTCxLQUFQLEdBQWVBLEtBQWY7QUFDSDs7QUFFRCxTQUFPeUIsSUFBSSxDQUFDQyxTQUFMLENBQWVyQixNQUFmLEVBQXVCLElBQXZCLEVBQTZCLENBQTdCLENBQVA7QUFDSDtBQUVEOzs7Ozs7QUFJTyxTQUFTc0Isc0JBQVQsQ0FBZ0NDLFNBQWhDLEVBQTJDO0FBQ2hELFNBQU8sbUJBQVAsQ0FEZ0QsQ0FHaEQ7QUFDQTtBQUNEO0FBRUQ7Ozs7OztBQUlPLFNBQVNDLG1CQUFULENBQTZCQyxHQUE3QixFQUFrQzdCLFFBQWxDLEVBQTRDWSxNQUE1QyxFQUFvRDtBQUN2RCxTQUFPWSxJQUFJLENBQUNDLFNBQUwsQ0FBZTtBQUNsQixrQkFBYztBQUNWLGFBQU9oQixjQUFLcUIsUUFBTCxDQUFjbEIsTUFBZCxFQUFzQmlCLEdBQXRCO0FBREcsS0FESTtBQUlsQixnQkFBWTtBQUNSLGFBQU8sQ0FBQyxpQ0FBRCxFQUFtQywyQkFBbkMsRUFBZ0VsQixNQUFoRSxDQUF1RVgsUUFBdkUsRUFBaUZxQixJQUFqRixDQUFzRixHQUF0RixDQURDO0FBRVIsaUJBQVc7QUFGSDtBQUpNLEdBQWYsRUFRSixJQVJJLEVBUUUsQ0FSRixDQUFQO0FBU0giLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IGZzIGZyb20gJ2ZzJztcbmltcG9ydCBjanNvbiBmcm9tICdjanNvbic7XG5cbmV4cG9ydCBjb25zdCBidWlsZFhNTDIgPSBmdW5jdGlvbih7IGNvbXByZXNzIH0pIHtcbiAgcmV0dXJuIGBcbiAgPHByb2plY3QgbmFtZT1cInNpbXBsZS1idWlsZFwiIGJhc2VkaXI9XCIuXCI+XG5cbiAgPCEtLSBGaW5kIGFuZCBsb2FkIFNlbmNoYSBDbWQgYW50IHRhc2tzIC0tPlxuICA8c2NyaXB0IGxhbmd1YWdlPVwiamF2YXNjcmlwdFwiPlxuICAgICAgPCFbQ0RBVEFbXG4gICAgICAgICAgdmFyIGRpciA9IHByb2plY3QuZ2V0UHJvcGVydHkoXCJiYXNlZGlyXCIpLFxuICAgICAgICAgICAgICBjbWREaXIgPSBwcm9qZWN0LmdldFByb3BlcnR5KFwiY21kLmRpclwiKSxcbiAgICAgICAgICAgICAgY21kTG9hZGVkID0gcHJvamVjdC5nZXRSZWZlcmVuY2UoXCJzZW5jaGFsb2FkZXJcIik7XG5cbiAgICAgICAgICBpZiAoIWNtZExvYWRlZCkge1xuICAgICAgICAgICAgICBmdW5jdGlvbiBlY2hvKG1lc3NhZ2UsIGZpbGUpIHtcbiAgICAgICAgICAgICAgICAgIHZhciBlID0gcHJvamVjdC5jcmVhdGVUYXNrKFwiZWNob1wiKTtcbiAgICAgICAgICAgICAgICAgIGUuc2V0TWVzc2FnZShtZXNzYWdlKTtcbiAgICAgICAgICAgICAgICAgIGlmIChmaWxlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgZS5zZXRGaWxlKGZpbGUpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgZS5leGVjdXRlKCk7XG4gICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgaWYgKCFjbWREaXIpIHtcblxuICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gZXhlYyhhcmdzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgdmFyIHByb2Nlc3MgPSBqYXZhLmxhbmcuUnVudGltZS5nZXRSdW50aW1lKCkuZXhlYyhhcmdzKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXQgPSBuZXcgamF2YS5pby5CdWZmZXJlZFJlYWRlcihuZXcgamF2YS5pby5JbnB1dFN0cmVhbVJlYWRlcihwcm9jZXNzLmdldElucHV0U3RyZWFtKCkpKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyRm91bmQgPSBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbGluZTtcblxuICAgICAgICAgICAgICAgICAgICAgIHdoaWxlIChsaW5lID0gaW5wdXQucmVhZExpbmUoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBsaW5lID0gbGluZSArICcnO1xuICAgICAgICAgICAgICAgICAgICAgICAgICBqYXZhLmxhbmcuU3lzdGVtLm91dC5wcmludGxuKGxpbmUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobGluZS5pbmRleE9mKFwiU2VuY2hhIENtZFwiKSA+IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXJGb3VuZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoaGVhZGVyRm91bmQgJiYgIWNtZERpcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY21kRGlyID0gbGluZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb2plY3Quc2V0UHJvcGVydHkoXCJjbWQuZGlyXCIsIGNtZERpcik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgcHJvY2Vzcy53YWl0Rm9yKCk7XG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICEhY21kRGlyO1xuICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICBpZiAoIWV4ZWMoW1wic2VuY2hhXCIsIFwid2hpY2hcIl0pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgdmFyIHRtcEZpbGUgPSBcInRtcC5zaFwiO1xuICAgICAgICAgICAgICAgICAgICAgIGVjaG8oXCJzb3VyY2Ugfi8uYmFzaF9wcm9maWxlOyBzZW5jaGEgXCIgKyB3aGljaEFyZ3Muam9pbihcIiBcIiksIHRtcEZpbGUpO1xuICAgICAgICAgICAgICAgICAgICAgIGV4ZWMoW1wiL2Jpbi9zaFwiLCB0bXBGaWxlXSk7XG4gICAgICAgICAgICAgICAgICAgICAgbmV3IGphdmEuaW8uRmlsZSh0bXBGaWxlKVsnZGVsZXRlJ10oKTsgXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoY21kRGlyICYmICFwcm9qZWN0LmdldFRhcmdldHMoKS5jb250YWluc0tleShcImluaXQtY21kXCIpKSB7XG4gICAgICAgICAgICAgIHZhciBpbXBvcnREaXIgPSBwcm9qZWN0LmdldFByb3BlcnR5KFwiYnVpbGQtaW1wbC5kaXJcIikgfHwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoY21kRGlyICsgXCIvYW50L2J1aWxkL2FwcC9idWlsZC1pbXBsLnhtbFwiKTtcbiAgICAgICAgICAgICAgdmFyIGltcG9ydFRhc2sgPSBwcm9qZWN0LmNyZWF0ZVRhc2soXCJpbXBvcnRcIik7XG5cbiAgICAgICAgICAgICAgaW1wb3J0VGFzay5zZXRPd25pbmdUYXJnZXQoc2VsZi5nZXRPd25pbmdUYXJnZXQoKSk7XG4gICAgICAgICAgICAgIGltcG9ydFRhc2suc2V0TG9jYXRpb24oc2VsZi5nZXRMb2NhdGlvbigpKTtcbiAgICAgICAgICAgICAgaW1wb3J0VGFzay5zZXRGaWxlKGltcG9ydERpcik7XG4gICAgICAgICAgICAgIGltcG9ydFRhc2suZXhlY3V0ZSgpO1xuICAgICAgICAgIH1cbiAgICAgIF1dPlxuICA8L3NjcmlwdD5cblxuICA8IS0tXG4gIFRoZSBmb2xsb3dpbmcgdGFyZ2V0cyBjYW4gYmUgcHJvdmlkZWQgdG8gaW5qZWN0IGxvZ2ljIGJlZm9yZSBhbmQvb3IgYWZ0ZXIga2V5IHN0ZXBzXG4gIG9mIHRoZSBidWlsZCBwcm9jZXNzOlxuXG4gICAgICBUaGUgXCJpbml0LWxvY2FsXCIgdGFyZ2V0IGlzIHVzZWQgdG8gaW5pdGlhbGl6ZSBwcm9wZXJ0aWVzIHRoYXQgbWF5IGJlIHBlcnNvbmFsaXplZFxuICAgICAgZm9yIHRoZSBsb2NhbCBtYWNoaW5lLlxuXG4gICAgICAgICAgPHRhcmdldCBuYW1lPVwiLWJlZm9yZS1pbml0LWxvY2FsXCIvPlxuICAgICAgICAgIDx0YXJnZXQgbmFtZT1cIi1hZnRlci1pbml0LWxvY2FsXCIvPlxuXG4gICAgICBUaGUgXCJjbGVhblwiIHRhcmdldCBpcyB1c2VkIHRvIGNsZWFuIGJ1aWxkIG91dHB1dCBmcm9tIHRoZSBidWlsZC5kaXIuXG5cbiAgICAgICAgICA8dGFyZ2V0IG5hbWU9XCItYmVmb3JlLWNsZWFuXCIvPlxuICAgICAgICAgIDx0YXJnZXQgbmFtZT1cIi1hZnRlci1jbGVhblwiLz5cblxuICAgICAgVGhlIGdlbmVyYWwgXCJpbml0XCIgdGFyZ2V0IGlzIHVzZWQgdG8gaW5pdGlhbGl6ZSBhbGwgb3RoZXIgcHJvcGVydGllcywgaW5jbHVkaW5nXG4gICAgICB0aG9zZSBwcm92aWRlZCBieSBTZW5jaGEgQ21kLlxuXG4gICAgICAgICAgPHRhcmdldCBuYW1lPVwiLWJlZm9yZS1pbml0XCIvPlxuICAgICAgICAgIDx0YXJnZXQgbmFtZT1cIi1hZnRlci1pbml0XCIvPlxuXG4gICAgICBUaGUgXCJwYWdlXCIgdGFyZ2V0IHBlcmZvcm1zIHRoZSBjYWxsIHRvIFNlbmNoYSBDbWQgdG8gYnVpbGQgdGhlICdhbGwtY2xhc3Nlcy5qcycgZmlsZS5cblxuICAgICAgICAgIDx0YXJnZXQgbmFtZT1cIi1iZWZvcmUtcGFnZVwiLz5cbiAgICAgICAgICA8dGFyZ2V0IG5hbWU9XCItYWZ0ZXItcGFnZVwiLz5cblxuICAgICAgVGhlIFwiYnVpbGRcIiB0YXJnZXQgcGVyZm9ybXMgdGhlIGNhbGwgdG8gU2VuY2hhIENtZCB0byBidWlsZCB0aGUgYXBwbGljYXRpb24uXG5cbiAgICAgICAgICA8dGFyZ2V0IG5hbWU9XCItYmVmb3JlLWJ1aWxkXCIvPlxuICAgICAgICAgIDx0YXJnZXQgbmFtZT1cIi1hZnRlci1idWlsZFwiLz5cbiAgLS0+XG5cbjwvcHJvamVjdD5cblxuXG5cbiAgYFxufVxuXG5cbmV4cG9ydCBjb25zdCBidWlsZFhNTCA9IGZ1bmN0aW9uKHsgY29tcHJlc3MgfSkge1xuICAgIGxldCBjb21wcmVzc2lvbiA9ICcnO1xuXG4gICAgaWYgKGNvbXByZXNzKSB7XG4gICAgICAgIGNvbXByZXNzaW9uID0gYFxuICAgICAgICAgICAgdGhlbiBcbiAgICAgICAgICAgIGZzIFxuICAgICAgICAgICAgbWluaWZ5IFxuICAgICAgICAgICAgICAgIC15dWkgXG4gICAgICAgICAgICAgICAgLWZyb209ZXh0LmpzIFxuICAgICAgICAgICAgICAgIC10bz1leHQuanNcbiAgICAgICAgYDtcbiAgICB9XG5cbiAgICByZXR1cm4gYDxwcm9qZWN0IG5hbWU9XCJzaW1wbGUtYnVpbGRcIiBiYXNlZGlyPVwiLlwiPlxuICA8IS0tICBpbnRlcm5hbGx5LCB3YXRjaCBjYWxscyB0aGUgaW5pdCB0YXJnZXQsIHNvIG5lZWQgdG8gaGF2ZSBvbmUgaGVyZSAtLT5cbiAgPHRhcmdldCBuYW1lPVwiaW5pdFwiLz5cbiAgPHRhcmdldCBuYW1lPVwiaW5pdC1jbWRcIj5cbiAgICA8dGFza2RlZiAgcmVzb3VyY2U9XCJjb20vc2VuY2hhL2FudC9hbnRsaWIueG1sXCJcbiAgICAgICAgICAgICAgY2xhc3NwYXRoPVwiXFwke2NtZC5kaXJ9L3NlbmNoYS5qYXJcIlxuICAgICAgICAgICAgICBsb2FkZXJyZWY9XCJzZW5jaGFsb2FkZXJcIi8+XG4gICAgPHgtZXh0ZW5kLWNsYXNzcGF0aD5cbiAgICAgICAgPGphciBwYXRoPVwiXFwke2NtZC5kaXJ9L3NlbmNoYS5qYXJcIi8+XG4gICAgPC94LWV4dGVuZC1jbGFzc3BhdGg+XG4gICAgPHgtc2VuY2hhLWluaXQgcHJlZml4PVwiXCIvPlxuICAgIDx4LWNvbXBpbGUgcmVmaWQ9XCJ0aGVDb21waWxlclwiXG4gICAgICAgICAgICAgICAgICAgICAgZGlyPVwiXFwke2Jhc2VkaXJ9XCJcbiAgICAgICAgICAgICAgICAgICAgICBpbml0T25seT1cInRydWVcIlxuICAgICAgICAgICAgICAgICAgICAgIGluaGVyaXRBbGw9XCJ0cnVlXCI+XG4gICAgICAgICAgICAgIDwhW0NEQVRBW1xuICAgICAgICAgICAgICAtY2xhc3NwYXRoPVxcJHtiYXNlZGlyfS9tYW5pZmVzdC5qc1xuICAgICAgICAgICAgICBsb2FkLWFwcFxuICAgICAgICAgICAgICAgICAgLXRlbXA9XFwke2Jhc2VkaXJ9L3RlbXBcbiAgICAgICAgICAgICAgICAgIC10YWc9QXBwXG4gICAgICAgIF1dPlxuICAgICAgPC94LWNvbXBpbGU+XG4gIDwvdGFyZ2V0PlxuICA8dGFyZ2V0IG5hbWU9XCJyZWJ1aWxkXCI+XG4gICAgPHgtY29tcGlsZSByZWZpZD1cInRoZUNvbXBpbGVyXCJcbiAgICAgICAgICAgICAgZGlyPVwiXFwke2Jhc2VkaXJ9XCJcbiAgICAgICAgICAgICAgaW5oZXJpdEFsbD1cInRydWVcIj5cbiAgICAgIDwhW0NEQVRBW1xuICAgICAgLS1kZWJ1Z1xuICAgICAgZXhjbHVkZVxuICAgICAgLWFsbFxuICAgICAgYW5kXG4gICAgICBpbmNsdWRlXG4gICAgICAtZj1Cb290LmpzXG4gICAgICBhbmRcbiAgICAgIGNvbmNhdGVuYXRlXG4gICAgICAgICAgZXh0LmpzXG4gICAgICBhbmRcbiAgICAgIGV4Y2x1ZGVcbiAgICAgIC1hbGxcbiAgICAgIGFuZFxuICAgICAgIyBpbmNsdWRlIHRoZW1lIG92ZXJyaWRlc1xuICAgICAgaW5jbHVkZVxuICAgICAgICAtclxuICAgICAgICAtdGFnPW92ZXJyaWRlc1xuICAgICAgYW5kXG4gICAgICAjIGluY2x1ZGUgYWxsIGpzIGZpbGVzIG5lZWRlZCBmb3IgbWFuaWZlc3QuanNcbiAgICAgIGluY2x1ZGVcbiAgICAgICAgICAtclxuICAgICAgICAgIC1mPW1hbmlmZXN0LmpzXG4gICAgICBhbmRcbiAgICAgICMgZXhjbHVkZSB0aGUgZ2VuZXJhdGVkIG1hbmlmZXN0IGZpbGUgaXRzZWxmLFxuICAgICAgIyBzaW5jZSB3ZSBkb24ndCB3YW50IHRoZSBnZW5lcmF0ZWQgYnVuZGxlIGZpbGUgdG8gY3JlYXRlIGFueSBjb21wb25lbnRzXG4gICAgICBleGNsdWRlXG4gICAgICAtZj1tYW5pZmVzdC5qc1xuICAgICAgYW5kXG4gICAgICBjb25jYXRlbmF0ZVxuICAgICAgK2FwcGVuZFxuICAgICAgICAgIGV4dC5qc1xuICAgICAgYW5kXG4gICAgICBzY3NzXG4gICAgICAgICAgLWFwcE5hbWU9QXBwXG4gICAgICAgICAgLWltYWdlU2VhcmNoUGF0aD1yZXNvdXJjZXNcbiAgICAgICAgICAtdGhlbWVOYW1lPXRyaXRvblxuICAgICAgICAgIC1yZXNvdXJjZU1hcEJhc2U9LlxuICAgICAgICAgIC1vdXRwdXQ9ZXh0LnNjc3NcbiAgICAgIGFuZFxuICAgICAgcmVzb3VyY2VzXG4gICAgICAgICAgLWV4Y2x1ZGVzPS1hbGwqLmNzc1xuICAgICAgICAgIC1vdXQ9cmVzb3VyY2VzXG4gICAgICBhbmRcbiAgICAgIHJlc291cmNlc1xuICAgICAgICAgIC1tb2RlbD10cnVlXG4gICAgICAgICAgLW91dD1yZXNvdXJjZXNcbiAgICAgIF1dPlxuICAgIDwveC1jb21waWxlPlxuICA8L3RhcmdldD5cbiAgPHRhcmdldCBuYW1lPVwiYnVpbGRcIiBkZXBlbmRzPVwiaW5pdC1jbWQscmVidWlsZFwiPlxuICAgIDx4LXNlbmNoYS1jb21tYW5kIGRpcj1cIlxcJHtiYXNlZGlyfVwiPlxuICAgICAgPCFbQ0RBVEFbXG4gICAgICBmYXNoaW9uXG4gICAgICAgICAgLXB3ZD0uXG4gICAgICAgICAgLXNwbGl0PTQwOTVcbiAgICAgICAgICAke2NvbXByZXNzID8gJy1jb21wcmVzcycgOiAnJ31cbiAgICAgICAgICAgICAgZXh0LnNjc3NcbiAgICAgICAgICBleHQuY3NzXG4gICAgICAke2NvbXByZXNzaW9ufVxuICAgICAgXV0+XG4gICAgPC94LXNlbmNoYS1jb21tYW5kPlxuICA8L3RhcmdldD5cbiAgPHRhcmdldCBuYW1lPVwid2F0Y2hcIiBkZXBlbmRzPVwiaW5pdC1jbWQsYnVpbGRcIj5cbiAgICA8eC1mYXNoaW9uLXdhdGNoXG4gICAgICByZWZOYW1lPVwiZmFzaGlvbi13YXRjaFwiXG4gICAgICBpbnB1dEZpbGU9XCJleHQuc2Nzc1wiXG4gICAgICBvdXRwdXRGaWxlPVwiZXh0LmNzc1wiXG4gICAgICBzcGxpdD1cIjQwOTVcIlxuICAgICAgY29tcHJlc3M9XCIke2NvbXByZXNzID8gJ3RydWUnIDogJ2ZhbHNlJ31cIlxuICAgICAgY29uZmlnRmlsZT1cImFwcC5qc29uXCJcbiAgICAgIGZvcms9XCJ0cnVlXCIvPlxuICAgIDx4LXdhdGNoIGNvbXBpbGVyUmVmPVwidGhlQ29tcGlsZXJcIiB0YXJnZXRzPVwicmVidWlsZFwiLz5cbiAgPC90YXJnZXQ+XG48L3Byb2plY3Q+XG5gLnRyaW0oKTtcbn07XG5cbi8qKlxuICogQ3JlYXRlcyB0aGUgYXBwLmpzb24gZmlsZVxuICogQHBhcmFtIHtTdHJpbmd9IHRoZW1lIFRoZSBuYW1lIG9mIHRoZSB0aGVtZSB0byB1c2UuXG4gKiBAcGFyYW0ge1N0cmluZ1tdfSBwYWNrYWdlcyBUaGUgbmFtZXMgb2YgcGFja2FnZXMgdG8gaW5jbHVkZSBpbiB0aGUgYnVpbGRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUFwcEpzb24oeyB0aGVtZSwgcGFja2FnZXMsIHRvb2xraXQsIG92ZXJyaWRlcz1bXSwgcGFja2FnZURpcnM9W10gfSkge1xuXG4gIC8vdmFyIHNlbmNoYVBhdGggPSAnL1VzZXJzL21hcmNndXNtYW5vL19naXQvc2VuY2hhL2V4dC1yZWFjdC9wYWNrYWdlcy9leHQtcmVhY3QtYm9pbGVycGxhdGUxNy9ub2RlX21vZHVsZXMvQHNlbmNoYSdcbiAgLy9wYWNrYWdlRGlycy5wdXNoKHNlbmNoYVBhdGgpXG4gIGNvbnN0IGNvbmZpZyA9IHtcbiAgICAgICAgZnJhbWV3b3JrOiBcImV4dFwiLFxuICAgICAgICB0b29sa2l0LFxuICAgICAgICByZXF1aXJlczogcGFja2FnZXMsXG4gICAgICAgIG92ZXJyaWRlczogb3ZlcnJpZGVzLm1hcChkaXIgPT4gcGF0aC5yZXNvbHZlKGRpcikpLmNvbmNhdCgnanNkb20tZW52aXJvbm1lbnQuanMnKSxcbiAgICAgICAgcGFja2FnZXM6IHtcbiAgICAgICAgICAgIGRpcjogcGFja2FnZURpcnMubWFwKGRpciA9PiBwYXRoLnJlc29sdmUoZGlyKSlcbiAgICAgICAgfSxcbiAgICAgICAgb3V0cHV0OiB7XG4gICAgICAgICAgICBiYXNlOiAnLicsXG4gICAgICAgICAgICByZXNvdXJjZXM6IHtcbiAgICAgICAgICAgICAgICBwYXRoOiAnLi9yZXNvdXJjZXMnLFxuICAgICAgICAgICAgICAgIHNoYXJlZDogXCIuL3Jlc291cmNlc1wiXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgLy8gaWYgdGhlbWUgaXMgbG9jYWwgYWRkIGl0IGFzIGFuIGFkZGl0aW9uYWwgcGFja2FnZSBkaXJcbiAgICBpZiAoZnMuZXhpc3RzU3luYyh0aGVtZSkpIHtcbiAgICAgICAgY29uc3QgcGFja2FnZUluZm8gPSBjanNvbi5sb2FkKHBhdGguam9pbih0aGVtZSwgJ3BhY2thZ2UuanNvbicpKTtcbiAgICAgICAgY29uZmlnLnRoZW1lID0gcGFja2FnZUluZm8ubmFtZTtcbiAgICAgICAgY29uZmlnLnBhY2thZ2VzLmRpci5wdXNoKHBhdGgucmVzb2x2ZSh0aGVtZSkpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbmZpZy50aGVtZSA9IHRoZW1lO1xuICAgIH1cblxuICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShjb25maWcsIG51bGwsIDQpO1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBqcyBmaWxlIGNvbnRhaW5pbmcgY29kZSB0byBtYWtlIEV4dCBKUyBsb2FkIHByb3Blcmx5IGluIGpzZG9tXG4gKiBAcGFyYW0ge1N0cmluZ30gdGFyZ2V0RGlyIFxuICovXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlSlNET01FbnZpcm9ubWVudCh0YXJnZXREaXIpIHtcbiAgcmV0dXJuICd3aW5kb3cuRXh0ID0gRXh0Oyc7XG5cbiAgLy9yZXR1cm4gJ3dpbmRvdy5FeHQgPSBFeHQ7RXh0LnJlcXVpcmUoXCJFeHQuZGF0YS5UcmVlU3RvcmVcIik7RXh0LnJlcXVpcmUoXCJFeHQuZ3JpZC5HcmlkXCIpO0V4dC5yZXF1aXJlKFwiRXh0LnBsdWdpbi5SZXNwb25zaXZlXCIpOyc7XG4gIC8vcmV0dXJuICd3aW5kb3cuRXh0ID0gRXh0O0V4dC5yZXF1aXJlKFwiRXh0LnJlYWN0LlJlbmRlcmVyQ2VsbFwiKTtFeHQucmVxdWlyZShcIkV4dC5kYXRhLlRyZWVTdG9yZVwiKTtFeHQucmVxdWlyZShcIkV4dC5ncmlkLkdyaWRcIik7RXh0LnJlcXVpcmUoXCJFeHQucGx1Z2luLlJlc3BvbnNpdmVcIik7Jztcbn1cblxuLyoqXG4gKiBDcmVhdGVzIHRoZSB3b3Jrc3BhY2UuanNvbiBmaWxlXG4gKiBAcGFyYW0ge1N0cmluZ30gc2RrIFRoZSBwYXRoIHRvIHRoZSBzZGtcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVdvcmtzcGFjZUpzb24oc2RrLCBwYWNrYWdlcywgb3V0cHV0KSB7XG4gICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgXCJmcmFtZXdvcmtzXCI6IHtcbiAgICAgICAgICAgIFwiZXh0XCI6IHBhdGgucmVsYXRpdmUob3V0cHV0LCBzZGspXG4gICAgICAgIH0sXG4gICAgICAgIFwicGFja2FnZXNcIjoge1xuICAgICAgICAgICAgXCJkaXJcIjogWycke3dvcmtzcGFjZS5kaXJ9L3BhY2thZ2VzL2xvY2FsJywnJHt3b3Jrc3BhY2UuZGlyfS9wYWNrYWdlcyddLmNvbmNhdChwYWNrYWdlcykuam9pbignLCcpLFxuICAgICAgICAgICAgXCJleHRyYWN0XCI6IFwiJHt3b3Jrc3BhY2UuZGlyfS9wYWNrYWdlcy9yZW1vdGVcIlxuICAgICAgICB9XG4gICAgfSwgbnVsbCwgNCk7XG59XG4iXX0=