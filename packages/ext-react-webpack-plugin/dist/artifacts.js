"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createAppJson = createAppJson;
exports.createJSDOMEnvironment = createJSDOMEnvironment;
exports.createWorkspaceJson = createWorkspaceJson;
exports.buildXML = void 0;

const buildXML = function (compress, options) {
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

function createAppJson(theme, packages, toolkit, options) {
  const logv = require('./pluginUtil').logv;

  logv(options, 'FUNCTION createAppJson');

  const fs = require('fs'); //const path = require('path')
  //const cjson = require('cjson')
  // overrides: overrides.map(dir => path.resolve(dir)).concat('jsdom-environment.js'),
  // packages: {
  //   dir: packageDirs.map(dir => path.resolve(dir))
  // },


  const config = {
    framework: "ext",
    toolkit,
    requires: packages,
    "overrides": ["overrides", "jsdom-environment.js"],
    "packages": {
      "dir": [options.extFolder, "packages"]
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

function createJSDOMEnvironment(options) {
  const logv = require('./pluginUtil').logv;

  logv(options, 'FUNCTION createJSDOMEnvironment');
  return 'window.Ext = Ext;';
}

function createWorkspaceJson(options) {
  const path = require('path');

  const logv = require('./pluginUtil').logv;

  logv(options, 'FUNCTION createWorkspaceJson'); //"dir": ['${workspace.dir}/packages/local','${workspace.dir}/packages'].concat(packages).join(','),
  //"ext": `${options.extFolder}/ext`

  const config = {
    "frameworks": {
      "ext": path.join(options.extFolder, options.extRoot)
    },
    "packages": {
      "dir": ["${workspace.dir}/packages", "${workspace.dir}" + options.extFolder],
      "extract": "${workspace.dir}/packages/remote"
    }
  };
  return JSON.stringify(config, null, 2);
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9hcnRpZmFjdHMuanMiXSwibmFtZXMiOlsiYnVpbGRYTUwiLCJjb21wcmVzcyIsIm9wdGlvbnMiLCJsb2d2IiwicmVxdWlyZSIsImNvbXByZXNzaW9uIiwidHJpbSIsImNyZWF0ZUFwcEpzb24iLCJ0aGVtZSIsInBhY2thZ2VzIiwidG9vbGtpdCIsImZzIiwiY29uZmlnIiwiZnJhbWV3b3JrIiwicmVxdWlyZXMiLCJleHRGb2xkZXIiLCJvdXRwdXQiLCJiYXNlIiwicmVzb3VyY2VzIiwicGF0aCIsInNoYXJlZCIsImV4aXN0c1N5bmMiLCJwYWNrYWdlSW5mbyIsImNqc29uIiwibG9hZCIsImpvaW4iLCJuYW1lIiwiZGlyIiwicHVzaCIsInJlc29sdmUiLCJKU09OIiwic3RyaW5naWZ5IiwiY3JlYXRlSlNET01FbnZpcm9ubWVudCIsImNyZWF0ZVdvcmtzcGFjZUpzb24iLCJleHRSb290Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQU8sTUFBTUEsUUFBUSxHQUFHLFVBQVNDLFFBQVQsRUFBbUJDLE9BQW5CLEVBQTRCO0FBQ2xELFFBQU1DLElBQUksR0FBR0MsT0FBTyxDQUFDLGNBQUQsQ0FBUCxDQUF3QkQsSUFBckM7O0FBQ0FBLEVBQUFBLElBQUksQ0FBQ0QsT0FBRCxFQUFTLG1CQUFULENBQUo7QUFFQSxNQUFJRyxXQUFXLEdBQUcsRUFBbEI7O0FBRUEsTUFBSUosUUFBSixFQUFjO0FBQ1pJLElBQUFBLFdBQVcsR0FBSTs7Ozs7OztLQUFmO0FBUUQ7O0FBRUMsU0FBUTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7WUFtRkFKLFFBQVEsR0FBRyxXQUFILEdBQWlCLEVBQUc7OztRQUdoQ0ksV0FBWTs7Ozs7Ozs7OztrQkFVRkosUUFBUSxHQUFHLE1BQUgsR0FBWSxPQUFROzs7Ozs7Q0FoR25DLENBc0dUSyxJQXRHUyxFQUFQO0FBdUdILENBeEhNOzs7O0FBMEhBLFNBQVNDLGFBQVQsQ0FBd0JDLEtBQXhCLEVBQStCQyxRQUEvQixFQUF5Q0MsT0FBekMsRUFBa0RSLE9BQWxELEVBQTREO0FBQ2pFLFFBQU1DLElBQUksR0FBR0MsT0FBTyxDQUFDLGNBQUQsQ0FBUCxDQUF3QkQsSUFBckM7O0FBQ0FBLEVBQUFBLElBQUksQ0FBQ0QsT0FBRCxFQUFTLHdCQUFULENBQUo7O0FBRUEsUUFBTVMsRUFBRSxHQUFHUCxPQUFPLENBQUMsSUFBRCxDQUFsQixDQUppRSxDQUtqRTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7OztBQUVBLFFBQU1RLE1BQU0sR0FBRztBQUNiQyxJQUFBQSxTQUFTLEVBQUUsS0FERTtBQUViSCxJQUFBQSxPQUZhO0FBR2JJLElBQUFBLFFBQVEsRUFBRUwsUUFIRztBQUliLGlCQUFhLENBQ1gsV0FEVyxFQUVYLHNCQUZXLENBSkE7QUFRYixnQkFBWTtBQUNWLGFBQU8sQ0FDTFAsT0FBTyxDQUFDYSxTQURILEVBRUwsVUFGSztBQURHLEtBUkM7QUFjYkMsSUFBQUEsTUFBTSxFQUFFO0FBQ05DLE1BQUFBLElBQUksRUFBRSxHQURBO0FBRU5DLE1BQUFBLFNBQVMsRUFBRTtBQUNUQyxRQUFBQSxJQUFJLEVBQUUsYUFERztBQUVUQyxRQUFBQSxNQUFNLEVBQUU7QUFGQztBQUZMLEtBZEssQ0F1QmY7O0FBdkJlLEdBQWY7O0FBd0JBLE1BQUlULEVBQUUsQ0FBQ1UsVUFBSCxDQUFjYixLQUFkLENBQUosRUFBMEI7QUFDdEIsVUFBTWMsV0FBVyxHQUFHQyxLQUFLLENBQUNDLElBQU4sQ0FBV0wsSUFBSSxDQUFDTSxJQUFMLENBQVVqQixLQUFWLEVBQWlCLGNBQWpCLENBQVgsQ0FBcEI7QUFDQUksSUFBQUEsTUFBTSxDQUFDSixLQUFQLEdBQWVjLFdBQVcsQ0FBQ0ksSUFBM0I7QUFDQWQsSUFBQUEsTUFBTSxDQUFDSCxRQUFQLENBQWdCa0IsR0FBaEIsQ0FBb0JDLElBQXBCLENBQXlCVCxJQUFJLENBQUNVLE9BQUwsQ0FBYXJCLEtBQWIsQ0FBekI7QUFDSCxHQUpELE1BSU87QUFDSEksSUFBQUEsTUFBTSxDQUFDSixLQUFQLEdBQWVBLEtBQWY7QUFDSDs7QUFDRCxTQUFPc0IsSUFBSSxDQUFDQyxTQUFMLENBQWVuQixNQUFmLEVBQXVCLElBQXZCLEVBQTZCLENBQTdCLENBQVA7QUFDRDs7QUFFTSxTQUFTb0Isc0JBQVQsQ0FBZ0M5QixPQUFoQyxFQUF5QztBQUM5QyxRQUFNQyxJQUFJLEdBQUdDLE9BQU8sQ0FBQyxjQUFELENBQVAsQ0FBd0JELElBQXJDOztBQUNBQSxFQUFBQSxJQUFJLENBQUNELE9BQUQsRUFBUyxpQ0FBVCxDQUFKO0FBRUEsU0FBTyxtQkFBUDtBQUNEOztBQUVNLFNBQVMrQixtQkFBVCxDQUE2Qi9CLE9BQTdCLEVBQXNDO0FBQzNDLFFBQU1pQixJQUFJLEdBQUdmLE9BQU8sQ0FBQyxNQUFELENBQXBCOztBQUNBLFFBQU1ELElBQUksR0FBR0MsT0FBTyxDQUFDLGNBQUQsQ0FBUCxDQUF3QkQsSUFBckM7O0FBQ0FBLEVBQUFBLElBQUksQ0FBQ0QsT0FBRCxFQUFTLDhCQUFULENBQUosQ0FIMkMsQ0FLM0M7QUFDQTs7QUFFQyxRQUFNVSxNQUFNLEdBQUc7QUFDZCxrQkFBYztBQUNaLGFBQU9PLElBQUksQ0FBQ00sSUFBTCxDQUFVdkIsT0FBTyxDQUFDYSxTQUFsQixFQUE2QmIsT0FBTyxDQUFDZ0MsT0FBckM7QUFESyxLQURBO0FBSWQsZ0JBQVk7QUFDVixhQUFPLENBQ0wsMkJBREssRUFFTCxxQkFBcUJoQyxPQUFPLENBQUNhLFNBRnhCLENBREc7QUFLVixpQkFBVztBQUxEO0FBSkUsR0FBZjtBQVlELFNBQU9lLElBQUksQ0FBQ0MsU0FBTCxDQUFlbkIsTUFBZixFQUF1QixJQUF2QixFQUE2QixDQUE3QixDQUFQO0FBQ0QiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY29uc3QgYnVpbGRYTUwgPSBmdW5jdGlvbihjb21wcmVzcywgb3B0aW9ucykge1xuICBjb25zdCBsb2d2ID0gcmVxdWlyZSgnLi9wbHVnaW5VdGlsJykubG9ndlxuICBsb2d2KG9wdGlvbnMsJ0ZVTkNUSU9OIGJ1aWxkWE1MJylcblxuICBsZXQgY29tcHJlc3Npb24gPSAnJ1xuXG4gIGlmIChjb21wcmVzcykge1xuICAgIGNvbXByZXNzaW9uID0gYFxuICAgICAgdGhlbiBcbiAgICAgIGZzIFxuICAgICAgbWluaWZ5IFxuICAgICAgICAteXVpIFxuICAgICAgICAtZnJvbT1leHQuanMgXG4gICAgICAgIC10bz1leHQuanNcbiAgICBgO1xuICB9XG5cbiAgICByZXR1cm4gYDxwcm9qZWN0IG5hbWU9XCJzaW1wbGUtYnVpbGRcIiBiYXNlZGlyPVwiLlwiPlxuICA8IS0tICBpbnRlcm5hbGx5LCB3YXRjaCBjYWxscyB0aGUgaW5pdCB0YXJnZXQsIHNvIG5lZWQgdG8gaGF2ZSBvbmUgaGVyZSAtLT5cbiAgPHRhcmdldCBuYW1lPVwiaW5pdFwiLz5cbiAgPHRhcmdldCBuYW1lPVwiaW5pdC1jbWRcIj5cbiAgICA8dGFza2RlZiAgcmVzb3VyY2U9XCJjb20vc2VuY2hhL2FudC9hbnRsaWIueG1sXCJcbiAgICAgICAgICAgICAgY2xhc3NwYXRoPVwiXFwke2NtZC5kaXJ9L3NlbmNoYS5qYXJcIlxuICAgICAgICAgICAgICBsb2FkZXJyZWY9XCJzZW5jaGFsb2FkZXJcIi8+XG4gICAgPHgtZXh0ZW5kLWNsYXNzcGF0aD5cbiAgICAgICAgPGphciBwYXRoPVwiXFwke2NtZC5kaXJ9L3NlbmNoYS5qYXJcIi8+XG4gICAgPC94LWV4dGVuZC1jbGFzc3BhdGg+XG4gICAgPHgtc2VuY2hhLWluaXQgcHJlZml4PVwiXCIvPlxuICAgIDx4LWNvbXBpbGUgcmVmaWQ9XCJ0aGVDb21waWxlclwiXG4gICAgICAgICAgICAgICAgICAgICAgZGlyPVwiXFwke2Jhc2VkaXJ9XCJcbiAgICAgICAgICAgICAgICAgICAgICBpbml0T25seT1cInRydWVcIlxuICAgICAgICAgICAgICAgICAgICAgIGluaGVyaXRBbGw9XCJ0cnVlXCI+XG4gICAgICAgICAgICAgIDwhW0NEQVRBW1xuICAgICAgICAgICAgICAtY2xhc3NwYXRoPVxcJHtiYXNlZGlyfS9tYW5pZmVzdC5qc1xuICAgICAgICAgICAgICBsb2FkLWFwcFxuICAgICAgICAgICAgICAgICAgLXRlbXA9XFwke2Jhc2VkaXJ9L3RlbXBcbiAgICAgICAgICAgICAgICAgIC10YWc9QXBwXG4gICAgICAgIF1dPlxuICAgICAgPC94LWNvbXBpbGU+XG4gIDwvdGFyZ2V0PlxuICA8dGFyZ2V0IG5hbWU9XCJyZWJ1aWxkXCI+XG4gICAgPHgtY29tcGlsZSByZWZpZD1cInRoZUNvbXBpbGVyXCJcbiAgICAgICAgICAgICAgZGlyPVwiXFwke2Jhc2VkaXJ9XCJcbiAgICAgICAgICAgICAgaW5oZXJpdEFsbD1cInRydWVcIj5cbiAgICAgIDwhW0NEQVRBW1xuICAgICAgLS1kZWJ1Z1xuICAgICAgZXhjbHVkZVxuICAgICAgLWFsbFxuICAgICAgYW5kXG4gICAgICBpbmNsdWRlXG4gICAgICAtZj1Cb290LmpzXG4gICAgICBhbmRcbiAgICAgIGNvbmNhdGVuYXRlXG4gICAgICAgICAgZXh0LmpzXG4gICAgICBhbmRcbiAgICAgIGV4Y2x1ZGVcbiAgICAgIC1hbGxcbiAgICAgIGFuZFxuICAgICAgIyBpbmNsdWRlIHRoZW1lIG92ZXJyaWRlc1xuICAgICAgaW5jbHVkZVxuICAgICAgICAtclxuICAgICAgICAtdGFnPW92ZXJyaWRlc1xuICAgICAgYW5kXG4gICAgICAjIGluY2x1ZGUgYWxsIGpzIGZpbGVzIG5lZWRlZCBmb3IgbWFuaWZlc3QuanNcbiAgICAgIGluY2x1ZGVcbiAgICAgICAgICAtclxuICAgICAgICAgIC1mPW1hbmlmZXN0LmpzXG4gICAgICBhbmRcbiAgICAgICMgZXhjbHVkZSB0aGUgZ2VuZXJhdGVkIG1hbmlmZXN0IGZpbGUgaXRzZWxmLFxuICAgICAgIyBzaW5jZSB3ZSBkb24ndCB3YW50IHRoZSBnZW5lcmF0ZWQgYnVuZGxlIGZpbGUgdG8gY3JlYXRlIGFueSBjb21wb25lbnRzXG4gICAgICBleGNsdWRlXG4gICAgICAtZj1tYW5pZmVzdC5qc1xuICAgICAgYW5kXG4gICAgICBjb25jYXRlbmF0ZVxuICAgICAgK2FwcGVuZFxuICAgICAgICAgIGV4dC5qc1xuICAgICAgYW5kXG4gICAgICBzY3NzXG4gICAgICAgICAgLWFwcE5hbWU9QXBwXG4gICAgICAgICAgLWltYWdlU2VhcmNoUGF0aD1yZXNvdXJjZXNcbiAgICAgICAgICAtdGhlbWVOYW1lPXRyaXRvblxuICAgICAgICAgIC1yZXNvdXJjZU1hcEJhc2U9LlxuICAgICAgICAgIC1vdXRwdXQ9ZXh0LnNjc3NcbiAgICAgIGFuZFxuICAgICAgcmVzb3VyY2VzXG4gICAgICAgICAgLWV4Y2x1ZGVzPS1hbGwqLmNzc1xuICAgICAgICAgIC1vdXQ9cmVzb3VyY2VzXG4gICAgICBhbmRcbiAgICAgIHJlc291cmNlc1xuICAgICAgICAgIC1tb2RlbD10cnVlXG4gICAgICAgICAgLW91dD1yZXNvdXJjZXNcbiAgICAgIF1dPlxuICAgIDwveC1jb21waWxlPlxuICA8L3RhcmdldD5cbiAgPHRhcmdldCBuYW1lPVwiYnVpbGRcIiBkZXBlbmRzPVwiaW5pdC1jbWQscmVidWlsZFwiPlxuICAgIDx4LXNlbmNoYS1jb21tYW5kIGRpcj1cIlxcJHtiYXNlZGlyfVwiPlxuICAgICAgPCFbQ0RBVEFbXG4gICAgICBmYXNoaW9uXG4gICAgICAgICAgLXB3ZD0uXG4gICAgICAgICAgLXNwbGl0PTQwOTVcbiAgICAgICAgICAke2NvbXByZXNzID8gJy1jb21wcmVzcycgOiAnJ31cbiAgICAgICAgICAgICAgZXh0LnNjc3NcbiAgICAgICAgICBleHQuY3NzXG4gICAgICAke2NvbXByZXNzaW9ufVxuICAgICAgXV0+XG4gICAgPC94LXNlbmNoYS1jb21tYW5kPlxuICA8L3RhcmdldD5cbiAgPHRhcmdldCBuYW1lPVwid2F0Y2hcIiBkZXBlbmRzPVwiaW5pdC1jbWQsYnVpbGRcIj5cbiAgICA8eC1mYXNoaW9uLXdhdGNoXG4gICAgICByZWZOYW1lPVwiZmFzaGlvbi13YXRjaFwiXG4gICAgICBpbnB1dEZpbGU9XCJleHQuc2Nzc1wiXG4gICAgICBvdXRwdXRGaWxlPVwiZXh0LmNzc1wiXG4gICAgICBzcGxpdD1cIjQwOTVcIlxuICAgICAgY29tcHJlc3M9XCIke2NvbXByZXNzID8gJ3RydWUnIDogJ2ZhbHNlJ31cIlxuICAgICAgY29uZmlnRmlsZT1cImFwcC5qc29uXCJcbiAgICAgIGZvcms9XCJ0cnVlXCIvPlxuICAgIDx4LXdhdGNoIGNvbXBpbGVyUmVmPVwidGhlQ29tcGlsZXJcIiB0YXJnZXRzPVwicmVidWlsZFwiLz5cbiAgPC90YXJnZXQ+XG48L3Byb2plY3Q+XG5gLnRyaW0oKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlQXBwSnNvbiggdGhlbWUsIHBhY2thZ2VzLCB0b29sa2l0LCBvcHRpb25zICkge1xuICBjb25zdCBsb2d2ID0gcmVxdWlyZSgnLi9wbHVnaW5VdGlsJykubG9ndlxuICBsb2d2KG9wdGlvbnMsJ0ZVTkNUSU9OIGNyZWF0ZUFwcEpzb24nKVxuXG4gIGNvbnN0IGZzID0gcmVxdWlyZSgnZnMnKVxuICAvL2NvbnN0IHBhdGggPSByZXF1aXJlKCdwYXRoJylcbiAgLy9jb25zdCBjanNvbiA9IHJlcXVpcmUoJ2Nqc29uJylcblxuXG4gIC8vIG92ZXJyaWRlczogb3ZlcnJpZGVzLm1hcChkaXIgPT4gcGF0aC5yZXNvbHZlKGRpcikpLmNvbmNhdCgnanNkb20tZW52aXJvbm1lbnQuanMnKSxcbiAgLy8gcGFja2FnZXM6IHtcbiAgLy8gICBkaXI6IHBhY2thZ2VEaXJzLm1hcChkaXIgPT4gcGF0aC5yZXNvbHZlKGRpcikpXG4gIC8vIH0sXG5cbiAgY29uc3QgY29uZmlnID0ge1xuICAgIGZyYW1ld29yazogXCJleHRcIixcbiAgICB0b29sa2l0LFxuICAgIHJlcXVpcmVzOiBwYWNrYWdlcyxcbiAgICBcIm92ZXJyaWRlc1wiOiBbXG4gICAgICBcIm92ZXJyaWRlc1wiLFxuICAgICAgXCJqc2RvbS1lbnZpcm9ubWVudC5qc1wiXG4gICAgXSxcbiAgICBcInBhY2thZ2VzXCI6IHtcbiAgICAgIFwiZGlyXCI6IFtcbiAgICAgICAgb3B0aW9ucy5leHRGb2xkZXIsXG4gICAgICAgIFwicGFja2FnZXNcIlxuICAgICAgXVxuICAgIH0sXG4gICAgb3V0cHV0OiB7XG4gICAgICBiYXNlOiAnLicsXG4gICAgICByZXNvdXJjZXM6IHtcbiAgICAgICAgcGF0aDogJy4vcmVzb3VyY2VzJyxcbiAgICAgICAgc2hhcmVkOiBcIi4vcmVzb3VyY2VzXCJcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyBpZiB0aGVtZSBpcyBsb2NhbCBhZGQgaXQgYXMgYW4gYWRkaXRpb25hbCBwYWNrYWdlIGRpclxuICBpZiAoZnMuZXhpc3RzU3luYyh0aGVtZSkpIHtcbiAgICAgIGNvbnN0IHBhY2thZ2VJbmZvID0gY2pzb24ubG9hZChwYXRoLmpvaW4odGhlbWUsICdwYWNrYWdlLmpzb24nKSk7XG4gICAgICBjb25maWcudGhlbWUgPSBwYWNrYWdlSW5mby5uYW1lO1xuICAgICAgY29uZmlnLnBhY2thZ2VzLmRpci5wdXNoKHBhdGgucmVzb2x2ZSh0aGVtZSkpO1xuICB9IGVsc2Uge1xuICAgICAgY29uZmlnLnRoZW1lID0gdGhlbWU7XG4gIH1cbiAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KGNvbmZpZywgbnVsbCwgMilcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUpTRE9NRW52aXJvbm1lbnQob3B0aW9ucykge1xuICBjb25zdCBsb2d2ID0gcmVxdWlyZSgnLi9wbHVnaW5VdGlsJykubG9ndlxuICBsb2d2KG9wdGlvbnMsJ0ZVTkNUSU9OIGNyZWF0ZUpTRE9NRW52aXJvbm1lbnQnKVxuXG4gIHJldHVybiAnd2luZG93LkV4dCA9IEV4dDsnXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVXb3Jrc3BhY2VKc29uKG9wdGlvbnMpIHtcbiAgY29uc3QgcGF0aCA9IHJlcXVpcmUoJ3BhdGgnKVxuICBjb25zdCBsb2d2ID0gcmVxdWlyZSgnLi9wbHVnaW5VdGlsJykubG9ndlxuICBsb2d2KG9wdGlvbnMsJ0ZVTkNUSU9OIGNyZWF0ZVdvcmtzcGFjZUpzb24nKVxuXG4gIC8vXCJkaXJcIjogWycke3dvcmtzcGFjZS5kaXJ9L3BhY2thZ2VzL2xvY2FsJywnJHt3b3Jrc3BhY2UuZGlyfS9wYWNrYWdlcyddLmNvbmNhdChwYWNrYWdlcykuam9pbignLCcpLFxuICAvL1wiZXh0XCI6IGAke29wdGlvbnMuZXh0Rm9sZGVyfS9leHRgXG5cbiAgIGNvbnN0IGNvbmZpZyA9IHtcbiAgICBcImZyYW1ld29ya3NcIjoge1xuICAgICAgXCJleHRcIjogcGF0aC5qb2luKG9wdGlvbnMuZXh0Rm9sZGVyLCBvcHRpb25zLmV4dFJvb3QpXG4gICAgfSxcbiAgICBcInBhY2thZ2VzXCI6IHtcbiAgICAgIFwiZGlyXCI6IFtcbiAgICAgICAgXCIke3dvcmtzcGFjZS5kaXJ9L3BhY2thZ2VzXCIsXG4gICAgICAgIFwiJHt3b3Jrc3BhY2UuZGlyfVwiICsgb3B0aW9ucy5leHRGb2xkZXJcbiAgICAgIF0sXG4gICAgICBcImV4dHJhY3RcIjogXCIke3dvcmtzcGFjZS5kaXJ9L3BhY2thZ2VzL3JlbW90ZVwiXG4gICAgfVxuICB9XG4gIHJldHVybiBKU09OLnN0cmluZ2lmeShjb25maWcsIG51bGwsIDIpXG59Il19