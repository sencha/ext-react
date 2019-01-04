"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createAppJson = createAppJson;
exports.createJSDOMEnvironment = createJSDOMEnvironment;
exports.createWorkspaceJson = createWorkspaceJson;
exports.buildXML = void 0;

const buildXML = function (compress, options, output) {
  const logv = require('./pluginUtil').logv;

  logv(options, 'FUNCTION buildXML');
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

exports.buildXML = buildXML;

function createAppJson(theme, packages, toolkit, options, output) {
  const logv = require('./pluginUtil').logv;

  logv(options, 'FUNCTION createAppJson');

  const fs = require('fs'); // overrides: overrides.map(dir => path.resolve(dir)).concat('jsdom-environment.js'),
  // packages: {
  //   dir: packageDirs.map(dir => path.resolve(dir))
  // },


  var pathDifference = output.substring(process.cwd().length);
  var numberOfPaths = pathDifference.split("/").length - 1;
  var nodeModulePath = '';

  for (var i = 0; i < numberOfPaths; i++) {
    nodeModulePath += "../";
  }

  const config = {
    framework: "ext",
    toolkit,
    requires: packages,
    "overrides": ["overrides", "jsdom-environment.js"],
    "packages": {
      "dir": [nodeModulePath + "node_modules/@sencha", "packages"]
    },
    output: {
      base: '.',
      resources: {
        path: './resources',
        shared: "./resources"
      }
    } // if theme is local add it as an additional package dir

  };

  if (fs.existsSync(theme)) {
    const packageInfo = cjson.load(path.join(theme, 'package.json'));
    config.theme = packageInfo.name;
    config.packages.dir.push(path.resolve(theme));
  } else {
    config.theme = theme;
  }

  return JSON.stringify(config, null, 2);
}

function createJSDOMEnvironment(options, output) {
  const logv = require('./pluginUtil').logv;

  logv(options, 'FUNCTION createJSDOMEnvironment');
  return 'window.Ext = Ext;';
}

function createWorkspaceJson(options, output) {
  const logv = require('./pluginUtil').logv;

  logv(options, 'FUNCTION createWorkspaceJson');
  var isWindows = typeof process != 'undefined' && typeof process.platform != 'undefined' && !!process.platform.match(/^win/);
  var pathDifference = output.substring(process.cwd().length);
  var numberOfPaths = pathDifference.split(isWindows ? "\\" : "/").length - 1;
  var nodeModulePath = '';

  for (var i = 0; i < numberOfPaths; i++) {
    nodeModulePath += "../";
  }

  const config = {
    "frameworks": {
      "ext": nodeModulePath + "node_modules/@sencha/ext"
    },
    "packages": {
      "dir": ["${workspace.dir}" + nodeModulePath + "ext-" + options.framework + "/packages", "${workspace.dir}" + nodeModulePath + "node_modules/@sencha"],
      "extract": "${workspace.dir}/packages/remote"
    }
  };
  return JSON.stringify(config, null, 2);
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9hcnRpZmFjdHMuanMiXSwibmFtZXMiOlsiYnVpbGRYTUwiLCJjb21wcmVzcyIsIm9wdGlvbnMiLCJvdXRwdXQiLCJsb2d2IiwicmVxdWlyZSIsImNvbXByZXNzaW9uIiwidHJpbSIsImNyZWF0ZUFwcEpzb24iLCJ0aGVtZSIsInBhY2thZ2VzIiwidG9vbGtpdCIsImZzIiwicGF0aERpZmZlcmVuY2UiLCJzdWJzdHJpbmciLCJwcm9jZXNzIiwiY3dkIiwibGVuZ3RoIiwibnVtYmVyT2ZQYXRocyIsInNwbGl0Iiwibm9kZU1vZHVsZVBhdGgiLCJpIiwiY29uZmlnIiwiZnJhbWV3b3JrIiwicmVxdWlyZXMiLCJiYXNlIiwicmVzb3VyY2VzIiwicGF0aCIsInNoYXJlZCIsImV4aXN0c1N5bmMiLCJwYWNrYWdlSW5mbyIsImNqc29uIiwibG9hZCIsImpvaW4iLCJuYW1lIiwiZGlyIiwicHVzaCIsInJlc29sdmUiLCJKU09OIiwic3RyaW5naWZ5IiwiY3JlYXRlSlNET01FbnZpcm9ubWVudCIsImNyZWF0ZVdvcmtzcGFjZUpzb24iLCJpc1dpbmRvd3MiLCJwbGF0Zm9ybSIsIm1hdGNoIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQU8sTUFBTUEsUUFBUSxHQUFHLFVBQVNDLFFBQVQsRUFBbUJDLE9BQW5CLEVBQTRCQyxNQUE1QixFQUFvQztBQUMxRCxRQUFNQyxJQUFJLEdBQUdDLE9BQU8sQ0FBQyxjQUFELENBQVAsQ0FBd0JELElBQXJDOztBQUNBQSxFQUFBQSxJQUFJLENBQUNGLE9BQUQsRUFBUyxtQkFBVCxDQUFKO0FBRUEsTUFBSUksV0FBVyxHQUFHLEVBQWxCOztBQUVBLE1BQUlMLFFBQUosRUFBYztBQUNaSyxJQUFBQSxXQUFXLEdBQUk7Ozs7Ozs7S0FBZjtBQVFEOztBQUVDLFNBQVE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1lBbUZB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QUFJd0MsU0FBUyxHQUFHLE9BQU8zQixPQUFQLElBQWtCLFdBQWxCLElBQWlDLE9BQU9BLE9BQU8sQ0FBQzRCLFFBQWYsSUFBMkIsV0FBNUQsSUFBMkUsQ0FBQyxDQUFDNUIsT0FBTyxDQUFDNEIsUUFBUixDQUFpQkMsS0FBakIsQ0FBdUIsTUFBdkIsQ0FBN0Y7QUFDQSxNQUFJL0IsY0FBYyxHQUFHVixNQUFNLENBQUNXLFNBQVAsQ0FBaUJDLE9BQU8sQ0FBQ0MsR0FBUixHQUFjQyxNQUEvQixDQUFyQjtBQUNBLE1BQUlDLGFBQWEsR0FBR0wsY0FBYyxDQUFDTSxLQUFmLENBQXFCdUIsU0FBUyxHQUFHLElBQUgsR0FBVSxHQUF4QyxFQUE2Q3pCLE1BQTdDLEdBQXNELENBQTFFO0FBQ0EsTUFBSUcsY0FBYyxHQUFHLEVBQXJCOztBQUNBLE9BQUssSUFBSUMsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBR0gsYUFBcEIsRUFBbUNHLENBQUMsRUFBcEMsRUFBd0M7QUFDdENELElBQUFBLGNBQWMsSUFBSSxLQUFsQjtBQUNEOztBQUVELFFBQU1FLE1BQU0sR0FBRztBQUNiLGtCQUFjO0FBQ1osYUFBT0YsY0FBYyxHQUFHO0FBRFosS0FERDtBQUliLGdCQUFZO0FBQ1YsYUFBTyxDQUNMLHFCQUFxQkEsY0FBckIsR0FBc0MsTUFBdEMsR0FBK0NsQixPQUFPLENBQUNxQixTQUF2RCxHQUFtRSxXQUQ5RCxFQUVMLHFCQUFxQkgsY0FBckIsR0FBc0Msc0JBRmpDLENBREc7QUFLVixpQkFBVztBQUxEO0FBSkMsR0FBZjtBQVlBLFNBQU9rQixJQUFJLENBQUNDLFNBQUwsQ0FBZWpCLE1BQWYsRUFBdUIsSUFBdkIsRUFBNkIsQ0FBN0IsQ0FBUDtBQUNEIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNvbnN0IGJ1aWxkWE1MID0gZnVuY3Rpb24oY29tcHJlc3MsIG9wdGlvbnMsIG91dHB1dCkge1xuICBjb25zdCBsb2d2ID0gcmVxdWlyZSgnLi9wbHVnaW5VdGlsJykubG9ndlxuICBsb2d2KG9wdGlvbnMsJ0ZVTkNUSU9OIGJ1aWxkWE1MJylcblxuICBsZXQgY29tcHJlc3Npb24gPSAnJ1xuXG4gIGlmIChjb21wcmVzcykge1xuICAgIGNvbXByZXNzaW9uID0gYFxuICAgICAgdGhlbiBcbiAgICAgIGZzIFxuICAgICAgbWluaWZ5IFxuICAgICAgICAteXVpIFxuICAgICAgICAtZnJvbT1leHQuanMgXG4gICAgICAgIC10bz1leHQuanNcbiAgICBgO1xuICB9XG5cbiAgICByZXR1cm4gYDxwcm9qZWN0IG5hbWU9XCJzaW1wbGUtYnVpbGRcIiBiYXNlZGlyPVwiLlwiPlxuICA8IS0tICBpbnRlcm5hbGx5LCB3YXRjaCBjYWxscyB0aGUgaW5pdCB0YXJnZXQsIHNvIG5lZWQgdG8gaGF2ZSBvbmUgaGVyZSAtLT5cbiAgPHRhcmdldCBuYW1lPVwiaW5pdFwiLz5cbiAgPHRhcmdldCBuYW1lPVwiaW5pdC1jbWRcIj5cbiAgICA8dGFza2RlZiAgcmVzb3VyY2U9XCJjb20vc2VuY2hhL2FudC9hbnRsaWIueG1sXCJcbiAgICAgICAgICAgICAgY2xhc3NwYXRoPVwiXFwke2NtZC5kaXJ9L3NlbmNoYS5qYXJcIlxuICAgICAgICAgICAgICBsb2FkZXJyZWY9XCJzZW5jaGFsb2FkZXJcIi8+XG4gICAgPHgtZXh0ZW5kLWNsYXNzcGF0aD5cbiAgICAgICAgPGphciBwYXRoPVwiXFwke2NtZC5kaXJ9L3NlbmNoYS5qYXJcIi8+XG4gICAgPC94LWV4dGVuZC1jbGFzc3BhdGg+XG4gICAgPHgtc2VuY2hhLWluaXQgcHJlZml4PVwiXCIvPlxuICAgIDx4LWNvbXBpbGUgcmVmaWQ9XCJ0aGVDb21waWxlclwiXG4gICAgICAgICAgICAgICAgICAgICAgZGlyPVwiXFwke2Jhc2VkaXJ9XCJcbiAgICAgICAgICAgICAgICAgICAgICBpbml0T25seT1cInRydWVcIlxuICAgICAgICAgICAgICAgICAgICAgIGluaGVyaXRBbGw9XCJ0cnVlXCI+XG4gICAgICAgICAgICAgIDwhW0NEQVRBW1xuICAgICAgICAgICAgICAtY2xhc3NwYXRoPVxcJHtiYXNlZGlyfS9tYW5pZmVzdC5qc1xuICAgICAgICAgICAgICBsb2FkLWFwcFxuICAgICAgICAgICAgICAgICAgLXRlbXA9XFwke2Jhc2VkaXJ9L3RlbXBcbiAgICAgICAgICAgICAgICAgIC10YWc9QXBwXG4gICAgICAgIF1dPlxuICAgICAgPC94LWNvbXBpbGU+XG4gIDwvdGFyZ2V0PlxuICA8dGFyZ2V0IG5hbWU9XCJyZWJ1aWxkXCI+XG4gICAgPHgtY29tcGlsZSByZWZpZD1cInRoZUNvbXBpbGVyXCJcbiAgICAgICAgICAgICAgZGlyPVwiXFwke2Jhc2VkaXJ9XCJcbiAgICAgICAgICAgICAgaW5oZXJpdEFsbD1cInRydWVcIj5cbiAgICAgIDwhW0NEQVRBW1xuICAgICAgLS1kZWJ1Z1xuICAgICAgZXhjbHVkZVxuICAgICAgLWFsbFxuICAgICAgYW5kXG4gICAgICBpbmNsdWRlXG4gICAgICAtZj1Cb290LmpzXG4gICAgICBhbmRcbiAgICAgIGNvbmNhdGVuYXRlXG4gICAgICAgICAgZXh0LmpzXG4gICAgICBhbmRcbiAgICAgIGV4Y2x1ZGVcbiAgICAgIC1hbGxcbiAgICAgIGFuZFxuICAgICAgIyBpbmNsdWRlIHRoZW1lIG92ZXJyaWRlc1xuICAgICAgaW5jbHVkZVxuICAgICAgICAtclxuICAgICAgICAtdGFnPW92ZXJyaWRlc1xuICAgICAgYW5kXG4gICAgICAjIGluY2x1ZGUgYWxsIGpzIGZpbGVzIG5lZWRlZCBmb3IgbWFuaWZlc3QuanNcbiAgICAgIGluY2x1ZGVcbiAgICAgICAgICAtclxuICAgICAgICAgIC1mPW1hbmlmZXN0LmpzXG4gICAgICBhbmRcbiAgICAgICMgZXhjbHVkZSB0aGUgZ2VuZXJhdGVkIG1hbmlmZXN0IGZpbGUgaXRzZWxmLFxuICAgICAgIyBzaW5jZSB3ZSBkb24ndCB3YW50IHRoZSBnZW5lcmF0ZWQgYnVuZGxlIGZpbGUgdG8gY3JlYXRlIGFueSBjb21wb25lbnRzXG4gICAgICBleGNsdWRlXG4gICAgICAtZj1tYW5pZmVzdC5qc1xuICAgICAgYW5kXG4gICAgICBjb25jYXRlbmF0ZVxuICAgICAgK2FwcGVuZFxuICAgICAgICAgIGV4dC5qc1xuICAgICAgYW5kXG4gICAgICBzY3NzXG4gICAgICAgICAgLWFwcE5hbWU9QXBwXG4gICAgICAgICAgLWltYWdlU2VhcmNoUGF0aD1yZXNvdXJjZXNcbiAgICAgICAgICAtdGhlbWVOYW1lPXRyaXRvblxuICAgICAgICAgIC1yZXNvdXJjZU1hcEJhc2U9LlxuICAgICAgICAgIC1vdXRwdXQ9ZXh0LnNjc3NcbiAgICAgIGFuZFxuICAgICAgcmVzb3VyY2VzXG4gICAgICAgICAgLWV4Y2x1ZGVzPS1hbGwqLmNzc1xuICAgICAgICAgIC1vdXQ9cmVzb3VyY2VzXG4gICAgICBhbmRcbiAgICAgIHJlc291cmNlc1xuICAgICAgICAgIC1tb2RlbD10cnVlXG4gICAgICAgICAgLW91dD1yZXNvdXJjZXNcbiAgICAgIF1dPlxuICAgIDwveC1jb21waWxlPlxuICA8L3RhcmdldD5cbiAgPHRhcmdldCBuYW1lPVwiYnVpbGRcIiBkZXBlbmRzPVwiaW5pdC1jbWQscmVidWlsZFwiPlxuICAgIDx4LXNlbmNoYS1jb21tYW5kIGRpcj1cIlxcJHtiYXNlZGlyfVwiPlxuICAgICAgPCFbQ0RBVEFbXG4gICAgICBmYXNoaW9uXG4gICAgICAgICAgLXB3ZD0uXG4gICAgICAgICAgLXNwbGl0PTQwOTVcbiAgICAgICAgICAke2NvbXByZXNzID8gJy1jb21wcmVzcycgOiAnJ31cbiAgICAgICAgICAgICAgZXh0LnNjc3NcbiAgICAgICAgICBleHQuY3NzXG4gICAgICAke2NvbXByZXNzaW9ufVxuICAgICAgXV0+XG4gICAgPC94LXNlbmNoYS1jb21tYW5kPlxuICA8L3RhcmdldD5cbiAgPHRhcmdldCBuYW1lPVwid2F0Y2hcIiBkZXBlbmRzPVwiaW5pdC1jbWQsYnVpbGRcIj5cbiAgICA8eC1mYXNoaW9uLXdhdGNoXG4gICAgICByZWZOYW1lPVwiZmFzaGlvbi13YXRjaFwiXG4gICAgICBpbnB1dEZpbGU9XCJleHQuc2Nzc1wiXG4gICAgICBvdXRwdXRGaWxlPVwiZXh0LmNzc1wiXG4gICAgICBzcGxpdD1cIjQwOTVcIlxuICAgICAgY29tcHJlc3M9XCIke2NvbXByZXNzID8gJ3RydWUnIDogJ2ZhbHNlJ31cIlxuICAgICAgY29uZmlnRmlsZT1cImFwcC5qc29uXCJcbiAgICAgIGZvcms9XCJ0cnVlXCIvPlxuICAgIDx4LXdhdGNoIGNvbXBpbGVyUmVmPVwidGhlQ29tcGlsZXJcIiB0YXJnZXRzPVwicmVidWlsZFwiLz5cbiAgPC90YXJnZXQ+XG48L3Byb2plY3Q+XG5gLnRyaW0oKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlQXBwSnNvbiggdGhlbWUsIHBhY2thZ2VzLCB0b29sa2l0LCBvcHRpb25zLCBvdXRwdXQgKSB7XG4gIGNvbnN0IGxvZ3YgPSByZXF1aXJlKCcuL3BsdWdpblV0aWwnKS5sb2d2XG4gIGxvZ3Yob3B0aW9ucywnRlVOQ1RJT04gY3JlYXRlQXBwSnNvbicpXG5cbiAgY29uc3QgZnMgPSByZXF1aXJlKCdmcycpXG5cbiAgLy8gb3ZlcnJpZGVzOiBvdmVycmlkZXMubWFwKGRpciA9PiBwYXRoLnJlc29sdmUoZGlyKSkuY29uY2F0KCdqc2RvbS1lbnZpcm9ubWVudC5qcycpLFxuICAvLyBwYWNrYWdlczoge1xuICAvLyAgIGRpcjogcGFja2FnZURpcnMubWFwKGRpciA9PiBwYXRoLnJlc29sdmUoZGlyKSlcbiAgLy8gfSxcblxuICB2YXIgcGF0aERpZmZlcmVuY2UgPSBvdXRwdXQuc3Vic3RyaW5nKHByb2Nlc3MuY3dkKCkubGVuZ3RoKVxuICB2YXIgbnVtYmVyT2ZQYXRocyA9IChwYXRoRGlmZmVyZW5jZS5zcGxpdChcIi9cIikubGVuZ3RoIC0gMSlcbiAgdmFyIG5vZGVNb2R1bGVQYXRoID0gJydcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBudW1iZXJPZlBhdGhzOyBpKyspIHsgXG4gICAgbm9kZU1vZHVsZVBhdGggKz0gXCIuLi9cIlxuICB9XG5cbiAgY29uc3QgY29uZmlnID0ge1xuICAgIGZyYW1ld29yazogXCJleHRcIixcbiAgICB0b29sa2l0LFxuICAgIHJlcXVpcmVzOiBwYWNrYWdlcyxcbiAgICBcIm92ZXJyaWRlc1wiOiBbXG4gICAgICBcIm92ZXJyaWRlc1wiLFxuICAgICAgXCJqc2RvbS1lbnZpcm9ubWVudC5qc1wiXG4gICAgXSxcbiAgICBcInBhY2thZ2VzXCI6IHtcbiAgICAgIFwiZGlyXCI6IFtcbiAgICAgICAgbm9kZU1vZHVsZVBhdGggKyBcIm5vZGVfbW9kdWxlcy9Ac2VuY2hhXCIsXG4gICAgICAgIFwicGFja2FnZXNcIlxuICAgICAgXVxuICAgIH0sXG4gICAgb3V0cHV0OiB7XG4gICAgICBiYXNlOiAnLicsXG4gICAgICByZXNvdXJjZXM6IHtcbiAgICAgICAgcGF0aDogJy4vcmVzb3VyY2VzJyxcbiAgICAgICAgc2hhcmVkOiBcIi4vcmVzb3VyY2VzXCJcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyBpZiB0aGVtZSBpcyBsb2NhbCBhZGQgaXQgYXMgYW4gYWRkaXRpb25hbCBwYWNrYWdlIGRpclxuICBpZiAoZnMuZXhpc3RzU3luYyh0aGVtZSkpIHtcbiAgICAgIGNvbnN0IHBhY2thZ2VJbmZvID0gY2pzb24ubG9hZChwYXRoLmpvaW4odGhlbWUsICdwYWNrYWdlLmpzb24nKSk7XG4gICAgICBjb25maWcudGhlbWUgPSBwYWNrYWdlSW5mby5uYW1lO1xuICAgICAgY29uZmlnLnBhY2thZ2VzLmRpci5wdXNoKHBhdGgucmVzb2x2ZSh0aGVtZSkpO1xuICB9IGVsc2Uge1xuICAgICAgY29uZmlnLnRoZW1lID0gdGhlbWU7XG4gIH1cbiAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KGNvbmZpZywgbnVsbCwgMilcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUpTRE9NRW52aXJvbm1lbnQob3B0aW9ucywgb3V0cHV0KSB7XG4gIGNvbnN0IGxvZ3YgPSByZXF1aXJlKCcuL3BsdWdpblV0aWwnKS5sb2d2XG4gIGxvZ3Yob3B0aW9ucywnRlVOQ1RJT04gY3JlYXRlSlNET01FbnZpcm9ubWVudCcpXG5cbiAgcmV0dXJuICd3aW5kb3cuRXh0ID0gRXh0Oydcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVdvcmtzcGFjZUpzb24ob3B0aW9ucywgb3V0cHV0KSB7XG4gIGNvbnN0IGxvZ3YgPSByZXF1aXJlKCcuL3BsdWdpblV0aWwnKS5sb2d2XG4gIGxvZ3Yob3B0aW9ucywnRlVOQ1RJT04gY3JlYXRlV29ya3NwYWNlSnNvbicpXG5cbiAgdmFyIGlzV2luZG93cyA9IHR5cGVvZiBwcm9jZXNzICE9ICd1bmRlZmluZWQnICYmIHR5cGVvZiBwcm9jZXNzLnBsYXRmb3JtICE9ICd1bmRlZmluZWQnICYmICEhcHJvY2Vzcy5wbGF0Zm9ybS5tYXRjaCgvXndpbi8pO1xuICB2YXIgcGF0aERpZmZlcmVuY2UgPSBvdXRwdXQuc3Vic3RyaW5nKHByb2Nlc3MuY3dkKCkubGVuZ3RoKVxuICB2YXIgbnVtYmVyT2ZQYXRocyA9IHBhdGhEaWZmZXJlbmNlLnNwbGl0KGlzV2luZG93cyA/IFwiXFxcXFwiIDogXCIvXCIpLmxlbmd0aCAtIDE7XG4gIHZhciBub2RlTW9kdWxlUGF0aCA9ICcnXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbnVtYmVyT2ZQYXRoczsgaSsrKSB7IFxuICAgIG5vZGVNb2R1bGVQYXRoICs9IFwiLi4vXCJcbiAgfVxuXG4gIGNvbnN0IGNvbmZpZyA9IHtcbiAgICBcImZyYW1ld29ya3NcIjoge1xuICAgICAgXCJleHRcIjogbm9kZU1vZHVsZVBhdGggKyBcIm5vZGVfbW9kdWxlcy9Ac2VuY2hhL2V4dFwiXG4gICAgfSxcbiAgICBcInBhY2thZ2VzXCI6IHtcbiAgICAgIFwiZGlyXCI6IFtcbiAgICAgICAgXCIke3dvcmtzcGFjZS5kaXJ9XCIgKyBub2RlTW9kdWxlUGF0aCArIFwiZXh0LVwiICsgb3B0aW9ucy5mcmFtZXdvcmsgKyBcIi9wYWNrYWdlc1wiLFxuICAgICAgICBcIiR7d29ya3NwYWNlLmRpcn1cIiArIG5vZGVNb2R1bGVQYXRoICsgXCJub2RlX21vZHVsZXMvQHNlbmNoYVwiXG4gICAgICBdLFxuICAgICAgXCJleHRyYWN0XCI6IFwiJHt3b3Jrc3BhY2UuZGlyfS9wYWNrYWdlcy9yZW1vdGVcIlxuICAgIH1cbiAgfVxuICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoY29uZmlnLCBudWxsLCAyKVxufSJdfQ==