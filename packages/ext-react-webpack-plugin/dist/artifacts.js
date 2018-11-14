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
  var pathDifference = output.substring(process.cwd().length);
  var numberOfPaths = pathDifference.split("/").length - 1;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9hcnRpZmFjdHMuanMiXSwibmFtZXMiOlsiYnVpbGRYTUwiLCJjb21wcmVzcyIsIm9wdGlvbnMiLCJvdXRwdXQiLCJsb2d2IiwicmVxdWlyZSIsImNvbXByZXNzaW9uIiwidHJpbSIsImNyZWF0ZUFwcEpzb24iLCJ0aGVtZSIsInBhY2thZ2VzIiwidG9vbGtpdCIsImZzIiwicGF0aERpZmZlcmVuY2UiLCJzdWJzdHJpbmciLCJwcm9jZXNzIiwiY3dkIiwibGVuZ3RoIiwibnVtYmVyT2ZQYXRocyIsInNwbGl0Iiwibm9kZU1vZHVsZVBhdGgiLCJpIiwiY29uZmlnIiwiZnJhbWV3b3JrIiwicmVxdWlyZXMiLCJiYXNlIiwicmVzb3VyY2VzIiwicGF0aCIsInNoYXJlZCIsImV4aXN0c1N5bmMiLCJwYWNrYWdlSW5mbyIsImNqc29uIiwibG9hZCIsImpvaW4iLCJuYW1lIiwiZGlyIiwicHVzaCIsInJlc29sdmUiLCJKU09OIiwic3RyaW5naWZ5IiwiY3JlYXRlSlNET01FbnZpcm9ubWVudCIsImNyZWF0ZVdvcmtzcGFjZUpzb24iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBTyxNQUFNQSxRQUFRLEdBQUcsVUFBU0MsUUFBVCxFQUFtQkMsT0FBbkIsRUFBNEJDLE1BQTVCLEVBQW9DO0FBQzFELFFBQU1DLElBQUksR0FBR0MsT0FBTyxDQUFDLGNBQUQsQ0FBUCxDQUF3QkQsSUFBckM7O0FBQ0FBLEVBQUFBLElBQUksQ0FBQ0YsT0FBRCxFQUFTLG1CQUFULENBQUo7QUFFQSxNQUFJSSxXQUFXLEdBQUcsRUFBbEI7O0FBRUEsTUFBSUwsUUFBSixFQUFjO0FBQ1pLLElBQUFBLFdBQVcsR0FBSTs7Ozs7OztLQUFmO0FBUUQ7O0FBRUMsU0FBUTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7WUFtRkFMLFFBQVEsR0FBRyxXQUFILEdBQWlCLEVBQUc7OztR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LENBQWlCQyxPQUFPLENBQUNDLEdBQVIsR0FBY0MsTUFBL0IsQ0FBckI7QUFDQSxNQUFJQyxhQUFhLEdBQUlMLGNBQWMsQ0FBQ00sS0FBZixDQUFxQixHQUFyQixFQUEwQkYsTUFBMUIsR0FBbUMsQ0FBeEQ7QUFDQSxNQUFJRyxjQUFjLEdBQUcsRUFBckI7O0FBQ0EsT0FBSyxJQUFJQyxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHSCxhQUFwQixFQUFtQ0csQ0FBQyxFQUFwQyxFQUF3QztBQUN0Q0QsSUFBQUEsY0FBYyxJQUFJLEtBQWxCO0FBQ0Q7O0FBRUQsUUFBTUUsTUFBTSxHQUFHO0FBQ2Isa0JBQWM7QUFDWixhQUFPRixjQUFjLEdBQUc7QUFEWixLQUREO0FBSWIsZ0JBQVk7QUFDVixhQUFPLENBQ0wscUJBQXFCQSxjQUFyQixHQUFzQyxNQUF0QyxHQUErQ2xCLE9BQU8sQ0FBQ3FCLFNBQXZELEdBQW1FLFdBRDlELEVBRUwscUJBQXFCSCxjQUFyQixHQUFzQyxzQkFGakMsQ0FERztBQUtWLGlCQUFXO0FBTEQ7QUFKQyxHQUFmO0FBWUEsU0FBT2tCLElBQUksQ0FBQ0MsU0FBTCxDQUFlakIsTUFBZixFQUF1QixJQUF2QixFQUE2QixDQUE3QixDQUFQO0FBQ0QiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY29uc3QgYnVpbGRYTUwgPSBmdW5jdGlvbihjb21wcmVzcywgb3B0aW9ucywgb3V0cHV0KSB7XG4gIGNvbnN0IGxvZ3YgPSByZXF1aXJlKCcuL3BsdWdpblV0aWwnKS5sb2d2XG4gIGxvZ3Yob3B0aW9ucywnRlVOQ1RJT04gYnVpbGRYTUwnKVxuXG4gIGxldCBjb21wcmVzc2lvbiA9ICcnXG5cbiAgaWYgKGNvbXByZXNzKSB7XG4gICAgY29tcHJlc3Npb24gPSBgXG4gICAgICB0aGVuIFxuICAgICAgZnMgXG4gICAgICBtaW5pZnkgXG4gICAgICAgIC15dWkgXG4gICAgICAgIC1mcm9tPWV4dC5qcyBcbiAgICAgICAgLXRvPWV4dC5qc1xuICAgIGA7XG4gIH1cblxuICAgIHJldHVybiBgPHByb2plY3QgbmFtZT1cInNpbXBsZS1idWlsZFwiIGJhc2VkaXI9XCIuXCI+XG4gIDwhLS0gIGludGVybmFsbHksIHdhdGNoIGNhbGxzIHRoZSBpbml0IHRhcmdldCwgc28gbmVlZCB0byBoYXZlIG9uZSBoZXJlIC0tPlxuICA8dGFyZ2V0IG5hbWU9XCJpbml0XCIvPlxuICA8dGFyZ2V0IG5hbWU9XCJpbml0LWNtZFwiPlxuICAgIDx0YXNrZGVmICByZXNvdXJjZT1cImNvbS9zZW5jaGEvYW50L2FudGxpYi54bWxcIlxuICAgICAgICAgICAgICBjbGFzc3BhdGg9XCJcXCR7Y21kLmRpcn0vc2VuY2hhLmphclwiXG4gICAgICAgICAgICAgIGxvYWRlcnJlZj1cInNlbmNoYWxvYWRlclwiLz5cbiAgICA8eC1leHRlbmQtY2xhc3NwYXRoPlxuICAgICAgICA8amFyIHBhdGg9XCJcXCR7Y21kLmRpcn0vc2VuY2hhLmphclwiLz5cbiAgICA8L3gtZXh0ZW5kLWNsYXNzcGF0aD5cbiAgICA8eC1zZW5jaGEtaW5pdCBwcmVmaXg9XCJcIi8+XG4gICAgPHgtY29tcGlsZSByZWZpZD1cInRoZUNvbXBpbGVyXCJcbiAgICAgICAgICAgICAgICAgICAgICBkaXI9XCJcXCR7YmFzZWRpcn1cIlxuICAgICAgICAgICAgICAgICAgICAgIGluaXRPbmx5PVwidHJ1ZVwiXG4gICAgICAgICAgICAgICAgICAgICAgaW5oZXJpdEFsbD1cInRydWVcIj5cbiAgICAgICAgICAgICAgPCFbQ0RBVEFbXG4gICAgICAgICAgICAgIC1jbGFzc3BhdGg9XFwke2Jhc2VkaXJ9L21hbmlmZXN0LmpzXG4gICAgICAgICAgICAgIGxvYWQtYXBwXG4gICAgICAgICAgICAgICAgICAtdGVtcD1cXCR7YmFzZWRpcn0vdGVtcFxuICAgICAgICAgICAgICAgICAgLXRhZz1BcHBcbiAgICAgICAgXV0+XG4gICAgICA8L3gtY29tcGlsZT5cbiAgPC90YXJnZXQ+XG4gIDx0YXJnZXQgbmFtZT1cInJlYnVpbGRcIj5cbiAgICA8eC1jb21waWxlIHJlZmlkPVwidGhlQ29tcGlsZXJcIlxuICAgICAgICAgICAgICBkaXI9XCJcXCR7YmFzZWRpcn1cIlxuICAgICAgICAgICAgICBpbmhlcml0QWxsPVwidHJ1ZVwiPlxuICAgICAgPCFbQ0RBVEFbXG4gICAgICAtLWRlYnVnXG4gICAgICBleGNsdWRlXG4gICAgICAtYWxsXG4gICAgICBhbmRcbiAgICAgIGluY2x1ZGVcbiAgICAgIC1mPUJvb3QuanNcbiAgICAgIGFuZFxuICAgICAgY29uY2F0ZW5hdGVcbiAgICAgICAgICBleHQuanNcbiAgICAgIGFuZFxuICAgICAgZXhjbHVkZVxuICAgICAgLWFsbFxuICAgICAgYW5kXG4gICAgICAjIGluY2x1ZGUgdGhlbWUgb3ZlcnJpZGVzXG4gICAgICBpbmNsdWRlXG4gICAgICAgIC1yXG4gICAgICAgIC10YWc9b3ZlcnJpZGVzXG4gICAgICBhbmRcbiAgICAgICMgaW5jbHVkZSBhbGwganMgZmlsZXMgbmVlZGVkIGZvciBtYW5pZmVzdC5qc1xuICAgICAgaW5jbHVkZVxuICAgICAgICAgIC1yXG4gICAgICAgICAgLWY9bWFuaWZlc3QuanNcbiAgICAgIGFuZFxuICAgICAgIyBleGNsdWRlIHRoZSBnZW5lcmF0ZWQgbWFuaWZlc3QgZmlsZSBpdHNlbGYsXG4gICAgICAjIHNpbmNlIHdlIGRvbid0IHdhbnQgdGhlIGdlbmVyYXRlZCBidW5kbGUgZmlsZSB0byBjcmVhdGUgYW55IGNvbXBvbmVudHNcbiAgICAgIGV4Y2x1ZGVcbiAgICAgIC1mPW1hbmlmZXN0LmpzXG4gICAgICBhbmRcbiAgICAgIGNvbmNhdGVuYXRlXG4gICAgICArYXBwZW5kXG4gICAgICAgICAgZXh0LmpzXG4gICAgICBhbmRcbiAgICAgIHNjc3NcbiAgICAgICAgICAtYXBwTmFtZT1BcHBcbiAgICAgICAgICAtaW1hZ2VTZWFyY2hQYXRoPXJlc291cmNlc1xuICAgICAgICAgIC10aGVtZU5hbWU9dHJpdG9uXG4gICAgICAgICAgLXJlc291cmNlTWFwQmFzZT0uXG4gICAgICAgICAgLW91dHB1dD1leHQuc2Nzc1xuICAgICAgYW5kXG4gICAgICByZXNvdXJjZXNcbiAgICAgICAgICAtZXhjbHVkZXM9LWFsbCouY3NzXG4gICAgICAgICAgLW91dD1yZXNvdXJjZXNcbiAgICAgIGFuZFxuICAgICAgcmVzb3VyY2VzXG4gICAgICAgICAgLW1vZGVsPXRydWVcbiAgICAgICAgICAtb3V0PXJlc291cmNlc1xuICAgICAgXV0+XG4gICAgPC94LWNvbXBpbGU+XG4gIDwvdGFyZ2V0PlxuICA8dGFyZ2V0IG5hbWU9XCJidWlsZFwiIGRlcGVuZHM9XCJpbml0LWNtZCxyZWJ1aWxkXCI+XG4gICAgPHgtc2VuY2hhLWNvbW1hbmQgZGlyPVwiXFwke2Jhc2VkaXJ9XCI+XG4gICAgICA8IVtDREFUQVtcbiAgICAgIGZhc2hpb25cbiAgICAgICAgICAtcHdkPS5cbiAgICAgICAgICAtc3BsaXQ9NDA5NVxuICAgICAgICAgICR7Y29tcHJlc3MgPyAnLWNvbXByZXNzJyA6ICcnfVxuICAgICAgICAgICAgICBleHQuc2Nzc1xuICAgICAgICAgIGV4dC5jc3NcbiAgICAgICR7Y29tcHJlc3Npb259XG4gICAgICBdXT5cbiAgICA8L3gtc2VuY2hhLWNvbW1hbmQ+XG4gIDwvdGFyZ2V0PlxuICA8dGFyZ2V0IG5hbWU9XCJ3YXRjaFwiIGRlcGVuZHM9XCJpbml0LWNtZCxidWlsZFwiPlxuICAgIDx4LWZhc2hpb24td2F0Y2hcbiAgICAgIHJlZk5hbWU9XCJmYXNoaW9uLXdhdGNoXCJcbiAgICAgIGlucHV0RmlsZT1cImV4dC5zY3NzXCJcbiAgICAgIG91dHB1dEZpbGU9XCJleHQuY3NzXCJcbiAgICAgIHNwbGl0PVwiNDA5NVwiXG4gICAgICBjb21wcmVzcz1cIiR7Y29tcHJlc3MgPyAndHJ1ZScgOiAnZmFsc2UnfVwiXG4gICAgICBjb25maWdGaWxlPVwiYXBwLmpzb25cIlxuICAgICAgZm9yaz1cInRydWVcIi8+XG4gICAgPHgtd2F0Y2ggY29tcGlsZXJSZWY9XCJ0aGVDb21waWxlclwiIHRhcmdldHM9XCJyZWJ1aWxkXCIvPlxuICA8L3RhcmdldD5cbjwvcHJvamVjdD5cbmAudHJpbSgpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVBcHBKc29uKCB0aGVtZSwgcGFja2FnZXMsIHRvb2xraXQsIG9wdGlvbnMsIG91dHB1dCApIHtcbiAgY29uc3QgbG9ndiA9IHJlcXVpcmUoJy4vcGx1Z2luVXRpbCcpLmxvZ3ZcbiAgbG9ndihvcHRpb25zLCdGVU5DVElPTiBjcmVhdGVBcHBKc29uJylcblxuICBjb25zdCBmcyA9IHJlcXVpcmUoJ2ZzJylcblxuICAvLyBvdmVycmlkZXM6IG92ZXJyaWRlcy5tYXAoZGlyID0+IHBhdGgucmVzb2x2ZShkaXIpKS5jb25jYXQoJ2pzZG9tLWVudmlyb25tZW50LmpzJyksXG4gIC8vIHBhY2thZ2VzOiB7XG4gIC8vICAgZGlyOiBwYWNrYWdlRGlycy5tYXAoZGlyID0+IHBhdGgucmVzb2x2ZShkaXIpKVxuICAvLyB9LFxuXG4gIHZhciBwYXRoRGlmZmVyZW5jZSA9IG91dHB1dC5zdWJzdHJpbmcocHJvY2Vzcy5jd2QoKS5sZW5ndGgpXG4gIHZhciBudW1iZXJPZlBhdGhzID0gKHBhdGhEaWZmZXJlbmNlLnNwbGl0KFwiL1wiKS5sZW5ndGggLSAxKVxuICB2YXIgbm9kZU1vZHVsZVBhdGggPSAnJ1xuICBmb3IgKHZhciBpID0gMDsgaSA8IG51bWJlck9mUGF0aHM7IGkrKykgeyBcbiAgICBub2RlTW9kdWxlUGF0aCArPSBcIi4uL1wiXG4gIH1cblxuICBjb25zdCBjb25maWcgPSB7XG4gICAgZnJhbWV3b3JrOiBcImV4dFwiLFxuICAgIHRvb2xraXQsXG4gICAgcmVxdWlyZXM6IHBhY2thZ2VzLFxuICAgIFwib3ZlcnJpZGVzXCI6IFtcbiAgICAgIFwib3ZlcnJpZGVzXCIsXG4gICAgICBcImpzZG9tLWVudmlyb25tZW50LmpzXCJcbiAgICBdLFxuICAgIFwicGFja2FnZXNcIjoge1xuICAgICAgXCJkaXJcIjogW1xuICAgICAgICBub2RlTW9kdWxlUGF0aCArIFwibm9kZV9tb2R1bGVzL0BzZW5jaGFcIixcbiAgICAgICAgXCJwYWNrYWdlc1wiXG4gICAgICBdXG4gICAgfSxcbiAgICBvdXRwdXQ6IHtcbiAgICAgIGJhc2U6ICcuJyxcbiAgICAgIHJlc291cmNlczoge1xuICAgICAgICBwYXRoOiAnLi9yZXNvdXJjZXMnLFxuICAgICAgICBzaGFyZWQ6IFwiLi9yZXNvdXJjZXNcIlxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vIGlmIHRoZW1lIGlzIGxvY2FsIGFkZCBpdCBhcyBhbiBhZGRpdGlvbmFsIHBhY2thZ2UgZGlyXG4gIGlmIChmcy5leGlzdHNTeW5jKHRoZW1lKSkge1xuICAgICAgY29uc3QgcGFja2FnZUluZm8gPSBjanNvbi5sb2FkKHBhdGguam9pbih0aGVtZSwgJ3BhY2thZ2UuanNvbicpKTtcbiAgICAgIGNvbmZpZy50aGVtZSA9IHBhY2thZ2VJbmZvLm5hbWU7XG4gICAgICBjb25maWcucGFja2FnZXMuZGlyLnB1c2gocGF0aC5yZXNvbHZlKHRoZW1lKSk7XG4gIH0gZWxzZSB7XG4gICAgICBjb25maWcudGhlbWUgPSB0aGVtZTtcbiAgfVxuICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoY29uZmlnLCBudWxsLCAyKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlSlNET01FbnZpcm9ubWVudChvcHRpb25zLCBvdXRwdXQpIHtcbiAgY29uc3QgbG9ndiA9IHJlcXVpcmUoJy4vcGx1Z2luVXRpbCcpLmxvZ3ZcbiAgbG9ndihvcHRpb25zLCdGVU5DVElPTiBjcmVhdGVKU0RPTUVudmlyb25tZW50JylcblxuICByZXR1cm4gJ3dpbmRvdy5FeHQgPSBFeHQ7J1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlV29ya3NwYWNlSnNvbihvcHRpb25zLCBvdXRwdXQpIHtcbiAgY29uc3QgbG9ndiA9IHJlcXVpcmUoJy4vcGx1Z2luVXRpbCcpLmxvZ3ZcbiAgbG9ndihvcHRpb25zLCdGVU5DVElPTiBjcmVhdGVXb3Jrc3BhY2VKc29uJylcblxuICB2YXIgcGF0aERpZmZlcmVuY2UgPSBvdXRwdXQuc3Vic3RyaW5nKHByb2Nlc3MuY3dkKCkubGVuZ3RoKVxuICB2YXIgbnVtYmVyT2ZQYXRocyA9IChwYXRoRGlmZmVyZW5jZS5zcGxpdChcIi9cIikubGVuZ3RoIC0gMSlcbiAgdmFyIG5vZGVNb2R1bGVQYXRoID0gJydcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBudW1iZXJPZlBhdGhzOyBpKyspIHsgXG4gICAgbm9kZU1vZHVsZVBhdGggKz0gXCIuLi9cIlxuICB9XG5cbiAgY29uc3QgY29uZmlnID0ge1xuICAgIFwiZnJhbWV3b3Jrc1wiOiB7XG4gICAgICBcImV4dFwiOiBub2RlTW9kdWxlUGF0aCArIFwibm9kZV9tb2R1bGVzL0BzZW5jaGEvZXh0XCJcbiAgICB9LFxuICAgIFwicGFja2FnZXNcIjoge1xuICAgICAgXCJkaXJcIjogW1xuICAgICAgICBcIiR7d29ya3NwYWNlLmRpcn1cIiArIG5vZGVNb2R1bGVQYXRoICsgXCJleHQtXCIgKyBvcHRpb25zLmZyYW1ld29yayArIFwiL3BhY2thZ2VzXCIsXG4gICAgICAgIFwiJHt3b3Jrc3BhY2UuZGlyfVwiICsgbm9kZU1vZHVsZVBhdGggKyBcIm5vZGVfbW9kdWxlcy9Ac2VuY2hhXCJcbiAgICAgIF0sXG4gICAgICBcImV4dHJhY3RcIjogXCIke3dvcmtzcGFjZS5kaXJ9L3BhY2thZ2VzL3JlbW90ZVwiXG4gICAgfVxuICB9XG4gIHJldHVybiBKU09OLnN0cmluZ2lmeShjb25maWcsIG51bGwsIDIpXG59Il19