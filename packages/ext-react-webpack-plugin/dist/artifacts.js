"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createAppJson = createAppJson;
exports.createJSDOMEnvironment = createJSDOMEnvironment;
exports.createWorkspaceJson2 = createWorkspaceJson2;
exports.createWorkspaceJson = createWorkspaceJson;
exports.extAngularModule = exports.buildXML = void 0;

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
    const path = require('path');

    const cjson = require('cjson');

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

function createWorkspaceJson2(options, output) {
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
    "build": {
      "dir": "${workspace.dir}/" + nodeModulePath + "build"
    },
    "packages": {
      "dir": ["${workspace.dir}/" + nodeModulePath + "ext-" + options.framework + "/packages/local", "${workspace.dir}/" + nodeModulePath + "ext-" + options.framework + "/packages", "${workspace.dir}/" + nodeModulePath + "node_modules/@sencha", "${workspace.dir}/" + nodeModulePath + "node_modules/@sencha/ext-${toolkit.name}", "${workspace.dir}/" + nodeModulePath + "node_modules/@sencha/ext-${toolkit.name}-theme-base", "${workspace.dir}/" + nodeModulePath + "node_modules/@sencha/ext-${toolkit.name}-theme-ios", "${workspace.dir}/" + nodeModulePath + "node_modules/@sencha/ext-${toolkit.name}-theme-material", "${workspace.dir}/" + nodeModulePath + "node_modules/@sencha/ext-${toolkit.name}-theme-aria", "${workspace.dir}/" + nodeModulePath + "node_modules/@sencha/ext-${toolkit.name}-theme-neutral", "${workspace.dir}/" + nodeModulePath + "node_modules/@sencha/ext-${toolkit.name}-theme-classic", "${workspace.dir}/" + nodeModulePath + "node_modules/@sencha/ext-${toolkit.name}-theme-gray", "${workspace.dir}/" + nodeModulePath + "node_modules/@sencha/ext-${toolkit.name}-theme-crisp", "${workspace.dir}/" + nodeModulePath + "node_modules/@sencha/ext-${toolkit.name}-theme-crisp-touch", "${workspace.dir}/" + nodeModulePath + "node_modules/@sencha/ext-${toolkit.name}-theme-neptune", "${workspace.dir}/" + nodeModulePath + "node_modules/@sencha/ext-${toolkit.name}-theme-neptune-touch", "${workspace.dir}/" + nodeModulePath + "node_modules/@sencha/ext-${toolkit.name}-theme-triton", "${workspace.dir}/" + nodeModulePath + "node_modules/@sencha/ext-${toolkit.name}-theme-graphite"],
      "extract": "${workspace.dir}/" + nodeModulePath + "packages/remote"
    }
  };
  return JSON.stringify(config, null, 2);
}

const extAngularModule = function (imports, exports, declarations) {
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
  `;
};

exports.extAngularModule = extAngularModule;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9hcnRpZmFjdHMuanMiXSwibmFtZXMiOlsiYnVpbGRYTUwiLCJjb21wcmVzcyIsIm9wdGlvbnMiLCJvdXRwdXQiLCJsb2d2IiwicmVxdWlyZSIsImNvbXByZXNzaW9uIiwidHJpbSIsImNyZWF0ZUFwcEpzb24iLCJ0aGVtZSIsInBhY2thZ2VzIiwidG9vbGtpdCIsImZzIiwicGF0aERpZmZlcmVuY2UiLCJzdWJzdHJpbmciLCJwcm9jZXNzIiwiY3dkIiwibGVuZ3RoIiwibnVtYmVyT2ZQYXRocyIsInNwbGl0Iiwibm9kZU1vZHVsZVBhdGgiLCJpIiwiY29uZmlnIiwiZnJhbWV3b3JrIiwicmVxdWlyZXMiLCJiYXNlIiwicmVzb3VyY2VzIiwicGF0aCIsInNoYXJlZCIsImV4aXN0c1N5bmMiLCJjanNvbiIsInBhY2thZ2VJbmZvIiwibG9hZCIsImpvaW4iLCJuYW1lIiwiZGlyIiwicHVzaCIsInJlc29sdmUiLCJKU09OIiwic3RyaW5naWZ5IiwiY3JlYXRlSlNET01FbnZpcm9ubWVudCIsImNyZWF0ZVdvcmtzcGFjZUpzb24yIiwiY3JlYXRlV29ya3NwYWNlSnNvbiIsImV4dEFuZ3VsYXJNb2R1bGUiLCJpbXBvcnRzIiwiZXhwb3J0cyIsImRlY2xhcmF0aW9ucyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBTyxNQUFNQSxRQUFRLEdBQUcsVUFBU0MsUUFBVCxFQUFtQkMsT0FBbkIsRUFBNEJDLE1BQTVCLEVBQW9DO0FBQzFELFFBQU1DLElBQUksR0FBR0MsT0FBTyxDQUFDLGNBQUQsQ0FBUCxDQUF3QkQsSUFBckM7O0FBQ0FBLEVBQUFBLElBQUksQ0FBQ0YsT0FBRCxFQUFTLG1CQUFULENBQUo7QUFDQSxNQUFJSSxXQUFXLEdBQUcsRUFBbEI7O0FBRUEsTUFBSUwsUUFBSixFQUFjO0FBQ1pLLElBQUFBLFdBQVcsR0FBSTs7Ozs7OztLQUFmO0FBUUQ7O0FBRUMsU0FBUTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7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QkFBc0JBLGNBQXRCLEdBQXVDLHdEQWRsQyxFQWVMLHNCQUFzQkEsY0FBdEIsR0FBdUMsOERBZmxDLEVBZ0JMLHNCQUFzQkEsY0FBdEIsR0FBdUMsdURBaEJsQyxFQWlCTCxzQkFBc0JBLGNBQXRCLEdBQXVDLHlEQWpCbEMsQ0FERztBQW9CVixpQkFBVyxzQkFBc0JBLGNBQXRCLEdBQXVDO0FBcEJ4QztBQVBDLEdBQWY7QUE4QkEsU0FBT2tCLElBQUksQ0FBQ0MsU0FBTCxDQUFlakIsTUFBZixFQUF1QixJQUF2QixFQUE2QixDQUE3QixDQUFQO0FBQ0Q7O0FBRU0sTUFBTXFCLGdCQUFnQixHQUFHLFVBQVNDLE9BQVQsRUFBa0JDLE9BQWxCLEVBQTJCQyxZQUEzQixFQUF5QztBQUN2RSxTQUFROztJQUVORixPQUFROzs7OztJQUtSRSxZQUFhOztJQUViRCxPQUFROzs7R0FUVjtBQWFELENBZE0iLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY29uc3QgYnVpbGRYTUwgPSBmdW5jdGlvbihjb21wcmVzcywgb3B0aW9ucywgb3V0cHV0KSB7XG4gIGNvbnN0IGxvZ3YgPSByZXF1aXJlKCcuL3BsdWdpblV0aWwnKS5sb2d2XG4gIGxvZ3Yob3B0aW9ucywnRlVOQ1RJT04gYnVpbGRYTUwnKVxuICBsZXQgY29tcHJlc3Npb24gPSAnJ1xuXG4gIGlmIChjb21wcmVzcykge1xuICAgIGNvbXByZXNzaW9uID0gYFxuICAgICAgdGhlbiBcbiAgICAgIGZzIFxuICAgICAgbWluaWZ5IFxuICAgICAgICAteXVpIFxuICAgICAgICAtZnJvbT1leHQuanMgXG4gICAgICAgIC10bz1leHQuanNcbiAgICBgO1xuICB9XG5cbiAgICByZXR1cm4gYDxwcm9qZWN0IG5hbWU9XCJzaW1wbGUtYnVpbGRcIiBiYXNlZGlyPVwiLlwiPlxuICA8IS0tICBpbnRlcm5hbGx5LCB3YXRjaCBjYWxscyB0aGUgaW5pdCB0YXJnZXQsIHNvIG5lZWQgdG8gaGF2ZSBvbmUgaGVyZSAtLT5cbiAgPHRhcmdldCBuYW1lPVwiaW5pdFwiLz5cbiAgPHRhcmdldCBuYW1lPVwiaW5pdC1jbWRcIj5cbiAgICA8dGFza2RlZiAgcmVzb3VyY2U9XCJjb20vc2VuY2hhL2FudC9hbnRsaWIueG1sXCJcbiAgICAgICAgICAgICAgY2xhc3NwYXRoPVwiXFwke2NtZC5kaXJ9L3NlbmNoYS5qYXJcIlxuICAgICAgICAgICAgICBsb2FkZXJyZWY9XCJzZW5jaGFsb2FkZXJcIi8+XG4gICAgPHgtZXh0ZW5kLWNsYXNzcGF0aD5cbiAgICAgICAgPGphciBwYXRoPVwiXFwke2NtZC5kaXJ9L3NlbmNoYS5qYXJcIi8+XG4gICAgPC94LWV4dGVuZC1jbGFzc3BhdGg+XG4gICAgPHgtc2VuY2hhLWluaXQgcHJlZml4PVwiXCIvPlxuICAgIDx4LWNvbXBpbGUgcmVmaWQ9XCJ0aGVDb21waWxlclwiXG4gICAgICAgICAgICAgICAgICAgICAgZGlyPVwiXFwke2Jhc2VkaXJ9XCJcbiAgICAgICAgICAgICAgICAgICAgICBpbml0T25seT1cInRydWVcIlxuICAgICAgICAgICAgICAgICAgICAgIGluaGVyaXRBbGw9XCJ0cnVlXCI+XG4gICAgICAgICAgICAgIDwhW0NEQVRBW1xuICAgICAgICAgICAgICAtY2xhc3NwYXRoPVxcJHtiYXNlZGlyfS9tYW5pZmVzdC5qc1xuICAgICAgICAgICAgICBsb2FkLWFwcFxuICAgICAgICAgICAgICAgICAgLXRlbXA9XFwke2Jhc2VkaXJ9L3RlbXBcbiAgICAgICAgICAgICAgICAgIC10YWc9QXBwXG4gICAgICAgIF1dPlxuICAgICAgPC94LWNvbXBpbGU+XG4gIDwvdGFyZ2V0PlxuICA8dGFyZ2V0IG5hbWU9XCJyZWJ1aWxkXCI+XG4gICAgPHgtY29tcGlsZSByZWZpZD1cInRoZUNvbXBpbGVyXCJcbiAgICAgICAgICAgICAgZGlyPVwiXFwke2Jhc2VkaXJ9XCJcbiAgICAgICAgICAgICAgaW5oZXJpdEFsbD1cInRydWVcIj5cbiAgICAgIDwhW0NEQVRBW1xuICAgICAgLS1kZWJ1Z1xuICAgICAgZXhjbHVkZVxuICAgICAgLWFsbFxuICAgICAgYW5kXG4gICAgICBpbmNsdWRlXG4gICAgICAtZj1Cb290LmpzXG4gICAgICBhbmRcbiAgICAgIGNvbmNhdGVuYXRlXG4gICAgICAgICAgZXh0LmpzXG4gICAgICBhbmRcbiAgICAgIGV4Y2x1ZGVcbiAgICAgIC1hbGxcbiAgICAgIGFuZFxuICAgICAgIyBpbmNsdWRlIHRoZW1lIG92ZXJyaWRlc1xuICAgICAgaW5jbHVkZVxuICAgICAgICAtclxuICAgICAgICAtdGFnPW92ZXJyaWRlc1xuICAgICAgYW5kXG4gICAgICAjIGluY2x1ZGUgYWxsIGpzIGZpbGVzIG5lZWRlZCBmb3IgbWFuaWZlc3QuanNcbiAgICAgIGluY2x1ZGVcbiAgICAgICAgICAtclxuICAgICAgICAgIC1mPW1hbmlmZXN0LmpzXG4gICAgICBhbmRcbiAgICAgICMgZXhjbHVkZSB0aGUgZ2VuZXJhdGVkIG1hbmlmZXN0IGZpbGUgaXRzZWxmLFxuICAgICAgIyBzaW5jZSB3ZSBkb24ndCB3YW50IHRoZSBnZW5lcmF0ZWQgYnVuZGxlIGZpbGUgdG8gY3JlYXRlIGFueSBjb21wb25lbnRzXG4gICAgICBleGNsdWRlXG4gICAgICAtZj1tYW5pZmVzdC5qc1xuICAgICAgYW5kXG4gICAgICBjb25jYXRlbmF0ZVxuICAgICAgK2FwcGVuZFxuICAgICAgICAgIGV4dC5qc1xuICAgICAgYW5kXG4gICAgICBzY3NzXG4gICAgICAgICAgLWFwcE5hbWU9QXBwXG4gICAgICAgICAgLWltYWdlU2VhcmNoUGF0aD1yZXNvdXJjZXNcbiAgICAgICAgICAtdGhlbWVOYW1lPXRyaXRvblxuICAgICAgICAgIC1yZXNvdXJjZU1hcEJhc2U9LlxuICAgICAgICAgIC1vdXRwdXQ9ZXh0LnNjc3NcbiAgICAgIGFuZFxuICAgICAgcmVzb3VyY2VzXG4gICAgICAgICAgLWV4Y2x1ZGVzPS1hbGwqLmNzc1xuICAgICAgICAgIC1vdXQ9cmVzb3VyY2VzXG4gICAgICBhbmRcbiAgICAgIHJlc291cmNlc1xuICAgICAgICAgIC1tb2RlbD10cnVlXG4gICAgICAgICAgLW91dD1yZXNvdXJjZXNcbiAgICAgIF1dPlxuICAgIDwveC1jb21waWxlPlxuICA8L3RhcmdldD5cbiAgPHRhcmdldCBuYW1lPVwiYnVpbGRcIiBkZXBlbmRzPVwiaW5pdC1jbWQscmVidWlsZFwiPlxuICAgIDx4LXNlbmNoYS1jb21tYW5kIGRpcj1cIlxcJHtiYXNlZGlyfVwiPlxuICAgICAgPCFbQ0RBVEFbXG4gICAgICBmYXNoaW9uXG4gICAgICAgICAgLXB3ZD0uXG4gICAgICAgICAgLXNwbGl0PTQwOTVcbiAgICAgICAgICAke2NvbXByZXNzID8gJy1jb21wcmVzcycgOiAnJ31cbiAgICAgICAgICAgICAgZXh0LnNjc3NcbiAgICAgICAgICBleHQuY3NzXG4gICAgICAke2NvbXByZXNzaW9ufVxuICAgICAgXV0+XG4gICAgPC94LXNlbmNoYS1jb21tYW5kPlxuICA8L3RhcmdldD5cbiAgPHRhcmdldCBuYW1lPVwid2F0Y2hcIiBkZXBlbmRzPVwiaW5pdC1jbWQsYnVpbGRcIj5cbiAgICA8eC1mYXNoaW9uLXdhdGNoXG4gICAgICByZWZOYW1lPVwiZmFzaGlvbi13YXRjaFwiXG4gICAgICBpbnB1dEZpbGU9XCJleHQuc2Nzc1wiXG4gICAgICBvdXRwdXRGaWxlPVwiZXh0LmNzc1wiXG4gICAgICBzcGxpdD1cIjQwOTVcIlxuICAgICAgY29tcHJlc3M9XCIke2NvbXByZXNzID8gJ3RydWUnIDogJ2ZhbHNlJ31cIlxuICAgICAgY29uZmlnRmlsZT1cImFwcC5qc29uXCJcbiAgICAgIGZvcms9XCJ0cnVlXCIvPlxuICAgIDx4LXdhdGNoIGNvbXBpbGVyUmVmPVwidGhlQ29tcGlsZXJcIiB0YXJnZXRzPVwicmVidWlsZFwiLz5cbiAgPC90YXJnZXQ+XG48L3Byb2plY3Q+XG5gLnRyaW0oKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlQXBwSnNvbiggdGhlbWUsIHBhY2thZ2VzLCB0b29sa2l0LCBvcHRpb25zLCBvdXRwdXQgKSB7XG4gIGNvbnN0IGxvZ3YgPSByZXF1aXJlKCcuL3BsdWdpblV0aWwnKS5sb2d2XG4gIGxvZ3Yob3B0aW9ucywnRlVOQ1RJT04gY3JlYXRlQXBwSnNvbicpXG5cbiAgY29uc3QgZnMgPSByZXF1aXJlKCdmcycpXG5cbiAgLy8gb3ZlcnJpZGVzOiBvdmVycmlkZXMubWFwKGRpciA9PiBwYXRoLnJlc29sdmUoZGlyKSkuY29uY2F0KCdqc2RvbS1lbnZpcm9ubWVudC5qcycpLFxuICAvLyBwYWNrYWdlczoge1xuICAvLyAgIGRpcjogcGFja2FnZURpcnMubWFwKGRpciA9PiBwYXRoLnJlc29sdmUoZGlyKSlcbiAgLy8gfSxcblxuICB2YXIgcGF0aERpZmZlcmVuY2UgPSBvdXRwdXQuc3Vic3RyaW5nKHByb2Nlc3MuY3dkKCkubGVuZ3RoKVxuICB2YXIgbnVtYmVyT2ZQYXRocyA9IChwYXRoRGlmZmVyZW5jZS5zcGxpdChcIi9cIikubGVuZ3RoIC0gMSlcbiAgdmFyIG5vZGVNb2R1bGVQYXRoID0gJydcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBudW1iZXJPZlBhdGhzOyBpKyspIHsgXG4gICAgbm9kZU1vZHVsZVBhdGggKz0gXCIuLi9cIlxuICB9XG5cbiAgY29uc3QgY29uZmlnID0ge1xuICAgIGZyYW1ld29yazogXCJleHRcIixcbiAgICB0b29sa2l0LFxuICAgIHJlcXVpcmVzOiBwYWNrYWdlcyxcbiAgICBcIm92ZXJyaWRlc1wiOiBbXG4gICAgICBcIm92ZXJyaWRlc1wiLFxuICAgICAgXCJqc2RvbS1lbnZpcm9ubWVudC5qc1wiXG4gICAgXSxcbiAgICBcInBhY2thZ2VzXCI6IHtcbiAgICAgIFwiZGlyXCI6IFtcbiAgICAgICAgbm9kZU1vZHVsZVBhdGggKyBcIm5vZGVfbW9kdWxlcy9Ac2VuY2hhXCIsXG4gICAgICAgIFwicGFja2FnZXNcIlxuICAgICAgXVxuICAgIH0sXG4gICAgb3V0cHV0OiB7XG4gICAgICBiYXNlOiAnLicsXG4gICAgICByZXNvdXJjZXM6IHtcbiAgICAgICAgcGF0aDogJy4vcmVzb3VyY2VzJyxcbiAgICAgICAgc2hhcmVkOiBcIi4vcmVzb3VyY2VzXCJcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyBpZiB0aGVtZSBpcyBsb2NhbCBhZGQgaXQgYXMgYW4gYWRkaXRpb25hbCBwYWNrYWdlIGRpclxuICBpZiAoZnMuZXhpc3RzU3luYyh0aGVtZSkpIHtcbiAgICAgIGNvbnN0IHBhdGggPSByZXF1aXJlKCdwYXRoJylcbiAgICAgIGNvbnN0IGNqc29uID0gcmVxdWlyZSgnY2pzb24nKVxuICAgICAgY29uc3QgcGFja2FnZUluZm8gPSBjanNvbi5sb2FkKHBhdGguam9pbih0aGVtZSwgJ3BhY2thZ2UuanNvbicpKTtcbiAgICAgIGNvbmZpZy50aGVtZSA9IHBhY2thZ2VJbmZvLm5hbWU7XG4gICAgICBjb25maWcucGFja2FnZXMuZGlyLnB1c2gocGF0aC5yZXNvbHZlKHRoZW1lKSk7XG4gIH0gZWxzZSB7XG4gICAgICBjb25maWcudGhlbWUgPSB0aGVtZTtcbiAgfVxuICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoY29uZmlnLCBudWxsLCAyKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlSlNET01FbnZpcm9ubWVudChvcHRpb25zLCBvdXRwdXQpIHtcbiAgY29uc3QgbG9ndiA9IHJlcXVpcmUoJy4vcGx1Z2luVXRpbCcpLmxvZ3ZcbiAgbG9ndihvcHRpb25zLCdGVU5DVElPTiBjcmVhdGVKU0RPTUVudmlyb25tZW50JylcblxuICByZXR1cm4gJ3dpbmRvdy5FeHQgPSBFeHQ7J1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlV29ya3NwYWNlSnNvbjIob3B0aW9ucywgb3V0cHV0KSB7XG4gIGNvbnN0IGxvZ3YgPSByZXF1aXJlKCcuL3BsdWdpblV0aWwnKS5sb2d2XG4gIGxvZ3Yob3B0aW9ucywnRlVOQ1RJT04gY3JlYXRlV29ya3NwYWNlSnNvbicpXG5cbiAgdmFyIHBhdGhEaWZmZXJlbmNlID0gb3V0cHV0LnN1YnN0cmluZyhwcm9jZXNzLmN3ZCgpLmxlbmd0aClcbiAgdmFyIG51bWJlck9mUGF0aHMgPSAocGF0aERpZmZlcmVuY2Uuc3BsaXQoXCIvXCIpLmxlbmd0aCAtIDEpXG4gIHZhciBub2RlTW9kdWxlUGF0aCA9ICcnXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbnVtYmVyT2ZQYXRoczsgaSsrKSB7IFxuICAgIG5vZGVNb2R1bGVQYXRoICs9IFwiLi4vXCJcbiAgfVxuXG4gIGNvbnN0IGNvbmZpZyA9IHtcbiAgICBcImZyYW1ld29ya3NcIjoge1xuICAgICAgXCJleHRcIjogbm9kZU1vZHVsZVBhdGggKyBcIm5vZGVfbW9kdWxlcy9Ac2VuY2hhL2V4dFwiXG4gICAgfSxcbiAgICBcInBhY2thZ2VzXCI6IHtcbiAgICAgIFwiZGlyXCI6IFtcbiAgICAgICAgXCIke3dvcmtzcGFjZS5kaXJ9XCIgKyBub2RlTW9kdWxlUGF0aCArIFwiZXh0LVwiICsgb3B0aW9ucy5mcmFtZXdvcmsgKyBcIi9wYWNrYWdlc1wiLFxuICAgICAgICBcIiR7d29ya3NwYWNlLmRpcn1cIiArIG5vZGVNb2R1bGVQYXRoICsgXCJub2RlX21vZHVsZXMvQHNlbmNoYVwiXG4gICAgICBdLFxuICAgICAgXCJleHRyYWN0XCI6IFwiJHt3b3Jrc3BhY2UuZGlyfS9wYWNrYWdlcy9yZW1vdGVcIlxuICAgIH1cbiAgfVxuICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoY29uZmlnLCBudWxsLCAyKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlV29ya3NwYWNlSnNvbihvcHRpb25zLCBvdXRwdXQpIHtcbiAgY29uc3QgbG9ndiA9IHJlcXVpcmUoJy4vcGx1Z2luVXRpbCcpLmxvZ3ZcbiAgbG9ndihvcHRpb25zLCdGVU5DVElPTiBjcmVhdGVXb3Jrc3BhY2VKc29uJylcblxuICB2YXIgcGF0aERpZmZlcmVuY2UgPSBvdXRwdXQuc3Vic3RyaW5nKHByb2Nlc3MuY3dkKCkubGVuZ3RoKVxuICB2YXIgbnVtYmVyT2ZQYXRocyA9IChwYXRoRGlmZmVyZW5jZS5zcGxpdChcIi9cIikubGVuZ3RoIC0gMSlcbiAgdmFyIG5vZGVNb2R1bGVQYXRoID0gJydcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBudW1iZXJPZlBhdGhzOyBpKyspIHsgXG4gICAgbm9kZU1vZHVsZVBhdGggKz0gXCIuLi9cIlxuICB9XG4gIGNvbnN0IGNvbmZpZyA9IHtcbiAgICBcImZyYW1ld29ya3NcIjoge1xuICAgICAgXCJleHRcIjogbm9kZU1vZHVsZVBhdGggKyBcIm5vZGVfbW9kdWxlcy9Ac2VuY2hhL2V4dFwiXG4gICAgfSxcbiAgICBcImJ1aWxkXCI6IHtcbiAgICAgIFwiZGlyXCI6IFwiJHt3b3Jrc3BhY2UuZGlyfS9cIiArIG5vZGVNb2R1bGVQYXRoICsgXCJidWlsZFwiXG4gICAgfSxcbiAgICBcInBhY2thZ2VzXCI6IHtcbiAgICAgIFwiZGlyXCI6IFtcbiAgICAgICAgXCIke3dvcmtzcGFjZS5kaXJ9L1wiICsgbm9kZU1vZHVsZVBhdGggKyBcImV4dC1cIiArIG9wdGlvbnMuZnJhbWV3b3JrICsgXCIvcGFja2FnZXMvbG9jYWxcIixcbiAgICAgICAgXCIke3dvcmtzcGFjZS5kaXJ9L1wiICsgbm9kZU1vZHVsZVBhdGggKyBcImV4dC1cIiArIG9wdGlvbnMuZnJhbWV3b3JrICsgXCIvcGFja2FnZXNcIixcbiAgICAgICAgXCIke3dvcmtzcGFjZS5kaXJ9L1wiICsgbm9kZU1vZHVsZVBhdGggKyBcIm5vZGVfbW9kdWxlcy9Ac2VuY2hhXCIsXG4gICAgICAgIFwiJHt3b3Jrc3BhY2UuZGlyfS9cIiArIG5vZGVNb2R1bGVQYXRoICsgXCJub2RlX21vZHVsZXMvQHNlbmNoYS9leHQtJHt0b29sa2l0Lm5hbWV9XCIsXG4gICAgICAgIFwiJHt3b3Jrc3BhY2UuZGlyfS9cIiArIG5vZGVNb2R1bGVQYXRoICsgXCJub2RlX21vZHVsZXMvQHNlbmNoYS9leHQtJHt0b29sa2l0Lm5hbWV9LXRoZW1lLWJhc2VcIixcbiAgICAgICAgXCIke3dvcmtzcGFjZS5kaXJ9L1wiICsgbm9kZU1vZHVsZVBhdGggKyBcIm5vZGVfbW9kdWxlcy9Ac2VuY2hhL2V4dC0ke3Rvb2xraXQubmFtZX0tdGhlbWUtaW9zXCIsXG4gICAgICAgIFwiJHt3b3Jrc3BhY2UuZGlyfS9cIiArIG5vZGVNb2R1bGVQYXRoICsgXCJub2RlX21vZHVsZXMvQHNlbmNoYS9leHQtJHt0b29sa2l0Lm5hbWV9LXRoZW1lLW1hdGVyaWFsXCIsXG4gICAgICAgIFwiJHt3b3Jrc3BhY2UuZGlyfS9cIiArIG5vZGVNb2R1bGVQYXRoICsgXCJub2RlX21vZHVsZXMvQHNlbmNoYS9leHQtJHt0b29sa2l0Lm5hbWV9LXRoZW1lLWFyaWFcIixcbiAgICAgICAgXCIke3dvcmtzcGFjZS5kaXJ9L1wiICsgbm9kZU1vZHVsZVBhdGggKyBcIm5vZGVfbW9kdWxlcy9Ac2VuY2hhL2V4dC0ke3Rvb2xraXQubmFtZX0tdGhlbWUtbmV1dHJhbFwiLFxuICAgICAgICBcIiR7d29ya3NwYWNlLmRpcn0vXCIgKyBub2RlTW9kdWxlUGF0aCArIFwibm9kZV9tb2R1bGVzL0BzZW5jaGEvZXh0LSR7dG9vbGtpdC5uYW1lfS10aGVtZS1jbGFzc2ljXCIsXG4gICAgICAgIFwiJHt3b3Jrc3BhY2UuZGlyfS9cIiArIG5vZGVNb2R1bGVQYXRoICsgXCJub2RlX21vZHVsZXMvQHNlbmNoYS9leHQtJHt0b29sa2l0Lm5hbWV9LXRoZW1lLWdyYXlcIixcbiAgICAgICAgXCIke3dvcmtzcGFjZS5kaXJ9L1wiICsgbm9kZU1vZHVsZVBhdGggKyBcIm5vZGVfbW9kdWxlcy9Ac2VuY2hhL2V4dC0ke3Rvb2xraXQubmFtZX0tdGhlbWUtY3Jpc3BcIixcbiAgICAgICAgXCIke3dvcmtzcGFjZS5kaXJ9L1wiICsgbm9kZU1vZHVsZVBhdGggKyBcIm5vZGVfbW9kdWxlcy9Ac2VuY2hhL2V4dC0ke3Rvb2xraXQubmFtZX0tdGhlbWUtY3Jpc3AtdG91Y2hcIixcbiAgICAgICAgXCIke3dvcmtzcGFjZS5kaXJ9L1wiICsgbm9kZU1vZHVsZVBhdGggKyBcIm5vZGVfbW9kdWxlcy9Ac2VuY2hhL2V4dC0ke3Rvb2xraXQubmFtZX0tdGhlbWUtbmVwdHVuZVwiLFxuICAgICAgICBcIiR7d29ya3NwYWNlLmRpcn0vXCIgKyBub2RlTW9kdWxlUGF0aCArIFwibm9kZV9tb2R1bGVzL0BzZW5jaGEvZXh0LSR7dG9vbGtpdC5uYW1lfS10aGVtZS1uZXB0dW5lLXRvdWNoXCIsXG4gICAgICAgIFwiJHt3b3Jrc3BhY2UuZGlyfS9cIiArIG5vZGVNb2R1bGVQYXRoICsgXCJub2RlX21vZHVsZXMvQHNlbmNoYS9leHQtJHt0b29sa2l0Lm5hbWV9LXRoZW1lLXRyaXRvblwiLFxuICAgICAgICBcIiR7d29ya3NwYWNlLmRpcn0vXCIgKyBub2RlTW9kdWxlUGF0aCArIFwibm9kZV9tb2R1bGVzL0BzZW5jaGEvZXh0LSR7dG9vbGtpdC5uYW1lfS10aGVtZS1ncmFwaGl0ZVwiXG4gICAgICBdLFxuICAgICAgXCJleHRyYWN0XCI6IFwiJHt3b3Jrc3BhY2UuZGlyfS9cIiArIG5vZGVNb2R1bGVQYXRoICsgXCJwYWNrYWdlcy9yZW1vdGVcIlxuICAgIH1cbiAgfVxuICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoY29uZmlnLCBudWxsLCAyKVxufVxuXG5leHBvcnQgY29uc3QgZXh0QW5ndWxhck1vZHVsZSA9IGZ1bmN0aW9uKGltcG9ydHMsIGV4cG9ydHMsIGRlY2xhcmF0aW9ucykge1xuICByZXR1cm4gYFxuICBpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuICAke2ltcG9ydHN9XG4gIEBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW1xuICAgIF0sXG4gICAgZGVjbGFyYXRpb25zOiBbXG4gICR7ZGVjbGFyYXRpb25zfSAgXSxcbiAgICBleHBvcnRzOiBbXG4gICR7ZXhwb3J0c30gIF1cbiAgfSlcbiAgZXhwb3J0IGNsYXNzIEV4dEFuZ3VsYXJNb2R1bGUgeyB9XG4gIGBcbn1cbiJdfQ==