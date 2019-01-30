"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createAppJson = createAppJson;
exports.createJSDOMEnvironment = createJSDOMEnvironment;
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
  // var pathDifference = output.substring(process.cwd().length)
  // var numberOfPaths = (pathDifference.split("/").length - 1)
  // var nodeModulePath = ''
  // for (var i = 0; i < numberOfPaths; i++) { 
  //   nodeModulePath += "../"
  // }


  var isWindows = typeof process != 'undefined' && typeof process.platform != 'undefined' && !!process.platform.match(/^win/);
  var pathDifference = output.substring(process.cwd().length);
  var numberOfPaths = pathDifference.split(isWindows ? "\\" : "/").length - 1;
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
} // export function createWorkspaceJson2(options, output) {
//   const logv = require('./pluginUtil').logv
//   logv(options,'FUNCTION createWorkspaceJson')
//   var isWindows = typeof process != 'undefined' && typeof process.platform != 'undefined' && !!process.platform.match(/^win/);
//   var pathDifference = output.substring(process.cwd().length)
//   var numberOfPaths = pathDifference.split(isWindows ? "\\" : "/").length - 1;
//   var nodeModulePath = ''
//   for (var i = 0; i < numberOfPaths; i++) { 
//     nodeModulePath += "../"
//   }
//   const config = {
//     "frameworks": {
//       "ext":  "${workspace.dir}" + nodeModulePath + "node_modules/@sencha/ext"
//     },
//     "packages": {
//       "dir": [
//         "${workspace.dir}" + nodeModulePath + "ext-" + options.framework + "/packages",
//         "${workspace.dir}" + nodeModulePath + "node_modules/@sencha"
//       ],
//       "extract": "${workspace.dir}/packages/remote"
//     }
//   }
//   return JSON.stringify(config, null, 2)
// }


function createWorkspaceJson(options, output) {
  const logv = require('./pluginUtil').logv;

  logv(options, 'FUNCTION createWorkspaceJson'); // var pathDifference = output.substring(process.cwd().length)
  // var numberOfPaths = (pathDifference.split("/").length - 1)
  // var nodeModulePath = ''
  // for (var i = 0; i < numberOfPaths; i++) { 
  //   nodeModulePath += "../"
  // }

  var isWindows = typeof process != 'undefined' && typeof process.platform != 'undefined' && !!process.platform.match(/^win/);
  var pathDifference = output.substring(process.cwd().length);
  var numberOfPaths = pathDifference.split(isWindows ? "\\" : "/").length - 1;
  var nodeModulePath = '';

  for (var i = 0; i < numberOfPaths; i++) {
    nodeModulePath += "../";
  }

  const config = {
    "frameworks": {
      "ext": "${workspace.dir}/" + nodeModulePath + "node_modules/@sencha/ext"
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9hcnRpZmFjdHMuanMiXSwibmFtZXMiOlsiYnVpbGRYTUwiLCJjb21wcmVzcyIsIm9wdGlvbnMiLCJvdXRwdXQiLCJsb2d2IiwicmVxdWlyZSIsImNvbXByZXNzaW9uIiwidHJpbSIsImNyZWF0ZUFwcEpzb24iLCJ0aGVtZSIsInBhY2thZ2VzIiwidG9vbGtpdCIsImZzIiwiaXNXaW5kb3dzIiwicHJvY2VzcyIsInBsYXRmb3JtIiwibWF0Y2giLCJwYXRoRGlmZmVyZW5jZSIsInN1YnN0cmluZyIsImN3ZCIsImxlbmd0aCIsIm51bWJlck9mUGF0aHMiLCJzcGxpdCIsIm5vZGVNb2R1bGVQYXRoIiwiaSIsImNvbmZpZyIsImZyYW1ld29yayIsInJlcXVpcmVzIiwiYmFzZSIsInJlc291cmNlcyIsInBhdGgiLCJzaGFyZWQiLCJleGlzdHNTeW5jIiwiY2pzb24iLCJwYWNrYWdlSW5mbyIsImxvYWQiLCJqb2luIiwibmFtZSIsImRpciIsInB1c2giLCJyZXNvbHZlIiwiSlNPTiIsInN0cmluZ2lmeSIsImNyZWF0ZUpTRE9NRW52aXJvbm1lbnQiLCJjcmVhdGVXb3Jrc3BhY2VKc29uIiwiZXh0QW5ndWxhck1vZHVsZSIsImltcG9ydHMiLCJleHBvcnRzIiwiZGVjbGFyYXRpb25zIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQU8sTUFBTUEsUUFBUSxHQUFHLFVBQVNDLFFBQVQsRUFBbUJDLE9BQW5CLEVBQTRCQyxNQUE1QixFQUFvQztBQUMxRCxRQUFNQyxJQUFJLEdBQUdDLE9BQU8sQ0FBQyxjQUFELENBQVAsQ0FBd0JELElBQXJDOztBQUNBQSxFQUFBQSxJQUFJLENBQUNGLE9BQUQsRUFBUyxtQkFBVCxDQUFKO0FBRUEsTUFBSUksV0FBVyxHQUFHLEVBQWxCOztBQUVBLE1BQUlMLFFBQUosRUFBYztBQUNaSyxJQUFBQSxXQUFXLEdBQUk7Ozs7Ozs7S0FBZjtBQVFEOztBQUVDLFNBQVE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7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QUFPa0IsSUFBSSxDQUFDQyxTQUFMLENBQWVqQixNQUFmLEVBQXVCLElBQXZCLEVBQTZCLENBQTdCLENBQVA7QUFDRDs7QUFFTSxNQUFNb0IsZ0JBQWdCLEdBQUcsVUFBU0MsT0FBVCxFQUFrQkMsT0FBbEIsRUFBMkJDLFlBQTNCLEVBQXlDO0FBQ3ZFLFNBQVE7O0lBRU5GLE9BQVE7Ozs7O0lBS1JFLFlBQWE7O0lBRWJELE9BQVE7OztHQVRWO0FBYUQsQ0FkTSIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjb25zdCBidWlsZFhNTCA9IGZ1bmN0aW9uKGNvbXByZXNzLCBvcHRpb25zLCBvdXRwdXQpIHtcbiAgY29uc3QgbG9ndiA9IHJlcXVpcmUoJy4vcGx1Z2luVXRpbCcpLmxvZ3ZcbiAgbG9ndihvcHRpb25zLCdGVU5DVElPTiBidWlsZFhNTCcpXG4gIFxuICBsZXQgY29tcHJlc3Npb24gPSAnJ1xuXG4gIGlmIChjb21wcmVzcykge1xuICAgIGNvbXByZXNzaW9uID0gYFxuICAgICAgdGhlbiBcbiAgICAgIGZzIFxuICAgICAgbWluaWZ5IFxuICAgICAgICAteXVpIFxuICAgICAgICAtZnJvbT1leHQuanMgXG4gICAgICAgIC10bz1leHQuanNcbiAgICBgO1xuICB9XG5cbiAgICByZXR1cm4gYDxwcm9qZWN0IG5hbWU9XCJzaW1wbGUtYnVpbGRcIiBiYXNlZGlyPVwiLlwiPlxuICA8IS0tICBpbnRlcm5hbGx5LCB3YXRjaCBjYWxscyB0aGUgaW5pdCB0YXJnZXQsIHNvIG5lZWQgdG8gaGF2ZSBvbmUgaGVyZSAtLT5cbiAgPHRhcmdldCBuYW1lPVwiaW5pdFwiLz5cbiAgPHRhcmdldCBuYW1lPVwiaW5pdC1jbWRcIj5cbiAgICA8dGFza2RlZiAgcmVzb3VyY2U9XCJjb20vc2VuY2hhL2FudC9hbnRsaWIueG1sXCJcbiAgICAgICAgICAgICAgY2xhc3NwYXRoPVwiXFwke2NtZC5kaXJ9L3NlbmNoYS5qYXJcIlxuICAgICAgICAgICAgICBsb2FkZXJyZWY9XCJzZW5jaGFsb2FkZXJcIi8+XG4gICAgPHgtZXh0ZW5kLWNsYXNzcGF0aD5cbiAgICAgICAgPGphciBwYXRoPVwiXFwke2NtZC5kaXJ9L3NlbmNoYS5qYXJcIi8+XG4gICAgPC94LWV4dGVuZC1jbGFzc3BhdGg+XG4gICAgPHgtc2VuY2hhLWluaXQgcHJlZml4PVwiXCIvPlxuICAgIDx4LWNvbXBpbGUgcmVmaWQ9XCJ0aGVDb21waWxlclwiXG4gICAgICAgICAgICAgICAgICAgICAgZGlyPVwiXFwke2Jhc2VkaXJ9XCJcbiAgICAgICAgICAgICAgICAgICAgICBpbml0T25seT1cInRydWVcIlxuICAgICAgICAgICAgICAgICAgICAgIGluaGVyaXRBbGw9XCJ0cnVlXCI+XG4gICAgICAgICAgICAgIDwhW0NEQVRBW1xuICAgICAgICAgICAgICAtY2xhc3NwYXRoPVxcJHtiYXNlZGlyfS9tYW5pZmVzdC5qc1xuICAgICAgICAgICAgICBsb2FkLWFwcFxuICAgICAgICAgICAgICAgICAgLXRlbXA9XFwke2Jhc2VkaXJ9L3RlbXBcbiAgICAgICAgICAgICAgICAgIC10YWc9QXBwXG4gICAgICAgIF1dPlxuICAgICAgPC94LWNvbXBpbGU+XG4gIDwvdGFyZ2V0PlxuICA8dGFyZ2V0IG5hbWU9XCJyZWJ1aWxkXCI+XG4gICAgPHgtY29tcGlsZSByZWZpZD1cInRoZUNvbXBpbGVyXCJcbiAgICAgICAgICAgICAgZGlyPVwiXFwke2Jhc2VkaXJ9XCJcbiAgICAgICAgICAgICAgaW5oZXJpdEFsbD1cInRydWVcIj5cbiAgICAgIDwhW0NEQVRBW1xuICAgICAgLS1kZWJ1Z1xuICAgICAgZXhjbHVkZVxuICAgICAgLWFsbFxuICAgICAgYW5kXG4gICAgICBpbmNsdWRlXG4gICAgICAtZj1Cb290LmpzXG4gICAgICBhbmRcbiAgICAgIGNvbmNhdGVuYXRlXG4gICAgICAgICAgZXh0LmpzXG4gICAgICBhbmRcbiAgICAgIGV4Y2x1ZGVcbiAgICAgIC1hbGxcbiAgICAgIGFuZFxuICAgICAgIyBpbmNsdWRlIHRoZW1lIG92ZXJyaWRlc1xuICAgICAgaW5jbHVkZVxuICAgICAgICAtclxuICAgICAgICAtdGFnPW92ZXJyaWRlc1xuICAgICAgYW5kXG4gICAgICAjIGluY2x1ZGUgYWxsIGpzIGZpbGVzIG5lZWRlZCBmb3IgbWFuaWZlc3QuanNcbiAgICAgIGluY2x1ZGVcbiAgICAgICAgICAtclxuICAgICAgICAgIC1mPW1hbmlmZXN0LmpzXG4gICAgICBhbmRcbiAgICAgICMgZXhjbHVkZSB0aGUgZ2VuZXJhdGVkIG1hbmlmZXN0IGZpbGUgaXRzZWxmLFxuICAgICAgIyBzaW5jZSB3ZSBkb24ndCB3YW50IHRoZSBnZW5lcmF0ZWQgYnVuZGxlIGZpbGUgdG8gY3JlYXRlIGFueSBjb21wb25lbnRzXG4gICAgICBleGNsdWRlXG4gICAgICAtZj1tYW5pZmVzdC5qc1xuICAgICAgYW5kXG4gICAgICBjb25jYXRlbmF0ZVxuICAgICAgK2FwcGVuZFxuICAgICAgICAgIGV4dC5qc1xuICAgICAgYW5kXG4gICAgICBzY3NzXG4gICAgICAgICAgLWFwcE5hbWU9QXBwXG4gICAgICAgICAgLWltYWdlU2VhcmNoUGF0aD1yZXNvdXJjZXNcbiAgICAgICAgICAtdGhlbWVOYW1lPXRyaXRvblxuICAgICAgICAgIC1yZXNvdXJjZU1hcEJhc2U9LlxuICAgICAgICAgIC1vdXRwdXQ9ZXh0LnNjc3NcbiAgICAgIGFuZFxuICAgICAgcmVzb3VyY2VzXG4gICAgICAgICAgLWV4Y2x1ZGVzPS1hbGwqLmNzc1xuICAgICAgICAgIC1vdXQ9cmVzb3VyY2VzXG4gICAgICBhbmRcbiAgICAgIHJlc291cmNlc1xuICAgICAgICAgIC1tb2RlbD10cnVlXG4gICAgICAgICAgLW91dD1yZXNvdXJjZXNcbiAgICAgIF1dPlxuICAgIDwveC1jb21waWxlPlxuICA8L3RhcmdldD5cbiAgPHRhcmdldCBuYW1lPVwiYnVpbGRcIiBkZXBlbmRzPVwiaW5pdC1jbWQscmVidWlsZFwiPlxuICAgIDx4LXNlbmNoYS1jb21tYW5kIGRpcj1cIlxcJHtiYXNlZGlyfVwiPlxuICAgICAgPCFbQ0RBVEFbXG4gICAgICBmYXNoaW9uXG4gICAgICAgICAgLXB3ZD0uXG4gICAgICAgICAgLXNwbGl0PTQwOTVcbiAgICAgICAgICAke2NvbXByZXNzID8gJy1jb21wcmVzcycgOiAnJ31cbiAgICAgICAgICAgICAgZXh0LnNjc3NcbiAgICAgICAgICBleHQuY3NzXG4gICAgICAke2NvbXByZXNzaW9ufVxuICAgICAgXV0+XG4gICAgPC94LXNlbmNoYS1jb21tYW5kPlxuICA8L3RhcmdldD5cbiAgPHRhcmdldCBuYW1lPVwid2F0Y2hcIiBkZXBlbmRzPVwiaW5pdC1jbWQsYnVpbGRcIj5cbiAgICA8eC1mYXNoaW9uLXdhdGNoXG4gICAgICByZWZOYW1lPVwiZmFzaGlvbi13YXRjaFwiXG4gICAgICBpbnB1dEZpbGU9XCJleHQuc2Nzc1wiXG4gICAgICBvdXRwdXRGaWxlPVwiZXh0LmNzc1wiXG4gICAgICBzcGxpdD1cIjQwOTVcIlxuICAgICAgY29tcHJlc3M9XCIke2NvbXByZXNzID8gJ3RydWUnIDogJ2ZhbHNlJ31cIlxuICAgICAgY29uZmlnRmlsZT1cImFwcC5qc29uXCJcbiAgICAgIGZvcms9XCJ0cnVlXCIvPlxuICAgIDx4LXdhdGNoIGNvbXBpbGVyUmVmPVwidGhlQ29tcGlsZXJcIiB0YXJnZXRzPVwicmVidWlsZFwiLz5cbiAgPC90YXJnZXQ+XG48L3Byb2plY3Q+XG5gLnRyaW0oKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlQXBwSnNvbiggdGhlbWUsIHBhY2thZ2VzLCB0b29sa2l0LCBvcHRpb25zLCBvdXRwdXQgKSB7XG4gIGNvbnN0IGxvZ3YgPSByZXF1aXJlKCcuL3BsdWdpblV0aWwnKS5sb2d2XG4gIGxvZ3Yob3B0aW9ucywnRlVOQ1RJT04gY3JlYXRlQXBwSnNvbicpXG5cbiAgY29uc3QgZnMgPSByZXF1aXJlKCdmcycpXG5cbiAgLy8gb3ZlcnJpZGVzOiBvdmVycmlkZXMubWFwKGRpciA9PiBwYXRoLnJlc29sdmUoZGlyKSkuY29uY2F0KCdqc2RvbS1lbnZpcm9ubWVudC5qcycpLFxuICAvLyBwYWNrYWdlczoge1xuICAvLyAgIGRpcjogcGFja2FnZURpcnMubWFwKGRpciA9PiBwYXRoLnJlc29sdmUoZGlyKSlcbiAgLy8gfSxcblxuICAvLyB2YXIgcGF0aERpZmZlcmVuY2UgPSBvdXRwdXQuc3Vic3RyaW5nKHByb2Nlc3MuY3dkKCkubGVuZ3RoKVxuICAvLyB2YXIgbnVtYmVyT2ZQYXRocyA9IChwYXRoRGlmZmVyZW5jZS5zcGxpdChcIi9cIikubGVuZ3RoIC0gMSlcbiAgLy8gdmFyIG5vZGVNb2R1bGVQYXRoID0gJydcbiAgLy8gZm9yICh2YXIgaSA9IDA7IGkgPCBudW1iZXJPZlBhdGhzOyBpKyspIHsgXG4gIC8vICAgbm9kZU1vZHVsZVBhdGggKz0gXCIuLi9cIlxuICAvLyB9XG5cbiAgdmFyIGlzV2luZG93cyA9IHR5cGVvZiBwcm9jZXNzICE9ICd1bmRlZmluZWQnICYmIHR5cGVvZiBwcm9jZXNzLnBsYXRmb3JtICE9ICd1bmRlZmluZWQnICYmICEhcHJvY2Vzcy5wbGF0Zm9ybS5tYXRjaCgvXndpbi8pO1xuICB2YXIgcGF0aERpZmZlcmVuY2UgPSBvdXRwdXQuc3Vic3RyaW5nKHByb2Nlc3MuY3dkKCkubGVuZ3RoKVxuICB2YXIgbnVtYmVyT2ZQYXRocyA9IHBhdGhEaWZmZXJlbmNlLnNwbGl0KGlzV2luZG93cyA/IFwiXFxcXFwiIDogXCIvXCIpLmxlbmd0aCAtIDE7XG4gIHZhciBub2RlTW9kdWxlUGF0aCA9ICcnXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbnVtYmVyT2ZQYXRoczsgaSsrKSB7IFxuICAgIG5vZGVNb2R1bGVQYXRoICs9IFwiLi4vXCJcbiAgfVxuXG5cbiAgY29uc3QgY29uZmlnID0ge1xuICAgIGZyYW1ld29yazogXCJleHRcIixcbiAgICB0b29sa2l0LFxuICAgIHJlcXVpcmVzOiBwYWNrYWdlcyxcbiAgICBcIm92ZXJyaWRlc1wiOiBbXG4gICAgICBcIm92ZXJyaWRlc1wiLFxuICAgICAgXCJqc2RvbS1lbnZpcm9ubWVudC5qc1wiXG4gICAgXSxcbiAgICBcInBhY2thZ2VzXCI6IHtcbiAgICAgIFwiZGlyXCI6IFtcbiAgICAgICAgbm9kZU1vZHVsZVBhdGggKyBcIm5vZGVfbW9kdWxlcy9Ac2VuY2hhXCIsXG4gICAgICAgIFwicGFja2FnZXNcIlxuICAgICAgXVxuICAgIH0sXG4gICAgb3V0cHV0OiB7XG4gICAgICBiYXNlOiAnLicsXG4gICAgICByZXNvdXJjZXM6IHtcbiAgICAgICAgcGF0aDogJy4vcmVzb3VyY2VzJyxcbiAgICAgICAgc2hhcmVkOiBcIi4vcmVzb3VyY2VzXCJcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyBpZiB0aGVtZSBpcyBsb2NhbCBhZGQgaXQgYXMgYW4gYWRkaXRpb25hbCBwYWNrYWdlIGRpclxuICBpZiAoZnMuZXhpc3RzU3luYyh0aGVtZSkpIHtcbiAgICAgIGNvbnN0IHBhdGggPSByZXF1aXJlKCdwYXRoJylcbiAgICAgIGNvbnN0IGNqc29uID0gcmVxdWlyZSgnY2pzb24nKVxuICAgICAgY29uc3QgcGFja2FnZUluZm8gPSBjanNvbi5sb2FkKHBhdGguam9pbih0aGVtZSwgJ3BhY2thZ2UuanNvbicpKTtcbiAgICAgIGNvbmZpZy50aGVtZSA9IHBhY2thZ2VJbmZvLm5hbWU7XG4gICAgICBjb25maWcucGFja2FnZXMuZGlyLnB1c2gocGF0aC5yZXNvbHZlKHRoZW1lKSk7XG4gIH0gZWxzZSB7XG4gICAgICBjb25maWcudGhlbWUgPSB0aGVtZTtcbiAgfVxuICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoY29uZmlnLCBudWxsLCAyKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlSlNET01FbnZpcm9ubWVudChvcHRpb25zLCBvdXRwdXQpIHtcbiAgY29uc3QgbG9ndiA9IHJlcXVpcmUoJy4vcGx1Z2luVXRpbCcpLmxvZ3ZcbiAgbG9ndihvcHRpb25zLCdGVU5DVElPTiBjcmVhdGVKU0RPTUVudmlyb25tZW50JylcblxuICByZXR1cm4gJ3dpbmRvdy5FeHQgPSBFeHQ7J1xufVxuXG4vLyBleHBvcnQgZnVuY3Rpb24gY3JlYXRlV29ya3NwYWNlSnNvbjIob3B0aW9ucywgb3V0cHV0KSB7XG4vLyAgIGNvbnN0IGxvZ3YgPSByZXF1aXJlKCcuL3BsdWdpblV0aWwnKS5sb2d2XG4vLyAgIGxvZ3Yob3B0aW9ucywnRlVOQ1RJT04gY3JlYXRlV29ya3NwYWNlSnNvbicpXG5cbi8vICAgdmFyIGlzV2luZG93cyA9IHR5cGVvZiBwcm9jZXNzICE9ICd1bmRlZmluZWQnICYmIHR5cGVvZiBwcm9jZXNzLnBsYXRmb3JtICE9ICd1bmRlZmluZWQnICYmICEhcHJvY2Vzcy5wbGF0Zm9ybS5tYXRjaCgvXndpbi8pO1xuLy8gICB2YXIgcGF0aERpZmZlcmVuY2UgPSBvdXRwdXQuc3Vic3RyaW5nKHByb2Nlc3MuY3dkKCkubGVuZ3RoKVxuLy8gICB2YXIgbnVtYmVyT2ZQYXRocyA9IHBhdGhEaWZmZXJlbmNlLnNwbGl0KGlzV2luZG93cyA/IFwiXFxcXFwiIDogXCIvXCIpLmxlbmd0aCAtIDE7XG4vLyAgIHZhciBub2RlTW9kdWxlUGF0aCA9ICcnXG4vLyAgIGZvciAodmFyIGkgPSAwOyBpIDwgbnVtYmVyT2ZQYXRoczsgaSsrKSB7IFxuLy8gICAgIG5vZGVNb2R1bGVQYXRoICs9IFwiLi4vXCJcbi8vICAgfVxuXG4vLyAgIGNvbnN0IGNvbmZpZyA9IHtcbi8vICAgICBcImZyYW1ld29ya3NcIjoge1xuLy8gICAgICAgXCJleHRcIjogIFwiJHt3b3Jrc3BhY2UuZGlyfVwiICsgbm9kZU1vZHVsZVBhdGggKyBcIm5vZGVfbW9kdWxlcy9Ac2VuY2hhL2V4dFwiXG4vLyAgICAgfSxcbi8vICAgICBcInBhY2thZ2VzXCI6IHtcbi8vICAgICAgIFwiZGlyXCI6IFtcbi8vICAgICAgICAgXCIke3dvcmtzcGFjZS5kaXJ9XCIgKyBub2RlTW9kdWxlUGF0aCArIFwiZXh0LVwiICsgb3B0aW9ucy5mcmFtZXdvcmsgKyBcIi9wYWNrYWdlc1wiLFxuLy8gICAgICAgICBcIiR7d29ya3NwYWNlLmRpcn1cIiArIG5vZGVNb2R1bGVQYXRoICsgXCJub2RlX21vZHVsZXMvQHNlbmNoYVwiXG4vLyAgICAgICBdLFxuLy8gICAgICAgXCJleHRyYWN0XCI6IFwiJHt3b3Jrc3BhY2UuZGlyfS9wYWNrYWdlcy9yZW1vdGVcIlxuLy8gICAgIH1cbi8vICAgfVxuLy8gICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoY29uZmlnLCBudWxsLCAyKVxuLy8gfVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlV29ya3NwYWNlSnNvbihvcHRpb25zLCBvdXRwdXQpIHtcbiAgY29uc3QgbG9ndiA9IHJlcXVpcmUoJy4vcGx1Z2luVXRpbCcpLmxvZ3ZcbiAgbG9ndihvcHRpb25zLCdGVU5DVElPTiBjcmVhdGVXb3Jrc3BhY2VKc29uJylcblxuICAvLyB2YXIgcGF0aERpZmZlcmVuY2UgPSBvdXRwdXQuc3Vic3RyaW5nKHByb2Nlc3MuY3dkKCkubGVuZ3RoKVxuICAvLyB2YXIgbnVtYmVyT2ZQYXRocyA9IChwYXRoRGlmZmVyZW5jZS5zcGxpdChcIi9cIikubGVuZ3RoIC0gMSlcbiAgLy8gdmFyIG5vZGVNb2R1bGVQYXRoID0gJydcbiAgLy8gZm9yICh2YXIgaSA9IDA7IGkgPCBudW1iZXJPZlBhdGhzOyBpKyspIHsgXG4gIC8vICAgbm9kZU1vZHVsZVBhdGggKz0gXCIuLi9cIlxuICAvLyB9XG5cblxuICB2YXIgaXNXaW5kb3dzID0gdHlwZW9mIHByb2Nlc3MgIT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIHByb2Nlc3MucGxhdGZvcm0gIT0gJ3VuZGVmaW5lZCcgJiYgISFwcm9jZXNzLnBsYXRmb3JtLm1hdGNoKC9ed2luLyk7XG4gIHZhciBwYXRoRGlmZmVyZW5jZSA9IG91dHB1dC5zdWJzdHJpbmcocHJvY2Vzcy5jd2QoKS5sZW5ndGgpXG4gIHZhciBudW1iZXJPZlBhdGhzID0gcGF0aERpZmZlcmVuY2Uuc3BsaXQoaXNXaW5kb3dzID8gXCJcXFxcXCIgOiBcIi9cIikubGVuZ3RoIC0gMTtcbiAgdmFyIG5vZGVNb2R1bGVQYXRoID0gJydcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBudW1iZXJPZlBhdGhzOyBpKyspIHsgXG4gICAgbm9kZU1vZHVsZVBhdGggKz0gXCIuLi9cIlxuICB9XG5cbiAgY29uc3QgY29uZmlnID0ge1xuICAgIFwiZnJhbWV3b3Jrc1wiOiB7XG4gICAgICBcImV4dFwiOiBcIiR7d29ya3NwYWNlLmRpcn0vXCIgKyBub2RlTW9kdWxlUGF0aCArIFwibm9kZV9tb2R1bGVzL0BzZW5jaGEvZXh0XCJcbiAgICB9LFxuICAgIFwiYnVpbGRcIjoge1xuICAgICAgXCJkaXJcIjogXCIke3dvcmtzcGFjZS5kaXJ9L1wiICsgbm9kZU1vZHVsZVBhdGggKyBcImJ1aWxkXCJcbiAgICB9LFxuICAgIFwicGFja2FnZXNcIjoge1xuICAgICAgXCJkaXJcIjogW1xuICAgICAgICBcIiR7d29ya3NwYWNlLmRpcn0vXCIgKyBub2RlTW9kdWxlUGF0aCArIFwiZXh0LVwiICsgb3B0aW9ucy5mcmFtZXdvcmsgKyBcIi9wYWNrYWdlcy9sb2NhbFwiLFxuICAgICAgICBcIiR7d29ya3NwYWNlLmRpcn0vXCIgKyBub2RlTW9kdWxlUGF0aCArIFwiZXh0LVwiICsgb3B0aW9ucy5mcmFtZXdvcmsgKyBcIi9wYWNrYWdlc1wiLFxuICAgICAgICBcIiR7d29ya3NwYWNlLmRpcn0vXCIgKyBub2RlTW9kdWxlUGF0aCArIFwibm9kZV9tb2R1bGVzL0BzZW5jaGFcIixcbiAgICAgICAgXCIke3dvcmtzcGFjZS5kaXJ9L1wiICsgbm9kZU1vZHVsZVBhdGggKyBcIm5vZGVfbW9kdWxlcy9Ac2VuY2hhL2V4dC0ke3Rvb2xraXQubmFtZX1cIixcbiAgICAgICAgXCIke3dvcmtzcGFjZS5kaXJ9L1wiICsgbm9kZU1vZHVsZVBhdGggKyBcIm5vZGVfbW9kdWxlcy9Ac2VuY2hhL2V4dC0ke3Rvb2xraXQubmFtZX0tdGhlbWUtYmFzZVwiLFxuICAgICAgICBcIiR7d29ya3NwYWNlLmRpcn0vXCIgKyBub2RlTW9kdWxlUGF0aCArIFwibm9kZV9tb2R1bGVzL0BzZW5jaGEvZXh0LSR7dG9vbGtpdC5uYW1lfS10aGVtZS1pb3NcIixcbiAgICAgICAgXCIke3dvcmtzcGFjZS5kaXJ9L1wiICsgbm9kZU1vZHVsZVBhdGggKyBcIm5vZGVfbW9kdWxlcy9Ac2VuY2hhL2V4dC0ke3Rvb2xraXQubmFtZX0tdGhlbWUtbWF0ZXJpYWxcIixcbiAgICAgICAgXCIke3dvcmtzcGFjZS5kaXJ9L1wiICsgbm9kZU1vZHVsZVBhdGggKyBcIm5vZGVfbW9kdWxlcy9Ac2VuY2hhL2V4dC0ke3Rvb2xraXQubmFtZX0tdGhlbWUtYXJpYVwiLFxuICAgICAgICBcIiR7d29ya3NwYWNlLmRpcn0vXCIgKyBub2RlTW9kdWxlUGF0aCArIFwibm9kZV9tb2R1bGVzL0BzZW5jaGEvZXh0LSR7dG9vbGtpdC5uYW1lfS10aGVtZS1uZXV0cmFsXCIsXG4gICAgICAgIFwiJHt3b3Jrc3BhY2UuZGlyfS9cIiArIG5vZGVNb2R1bGVQYXRoICsgXCJub2RlX21vZHVsZXMvQHNlbmNoYS9leHQtJHt0b29sa2l0Lm5hbWV9LXRoZW1lLWNsYXNzaWNcIixcbiAgICAgICAgXCIke3dvcmtzcGFjZS5kaXJ9L1wiICsgbm9kZU1vZHVsZVBhdGggKyBcIm5vZGVfbW9kdWxlcy9Ac2VuY2hhL2V4dC0ke3Rvb2xraXQubmFtZX0tdGhlbWUtZ3JheVwiLFxuICAgICAgICBcIiR7d29ya3NwYWNlLmRpcn0vXCIgKyBub2RlTW9kdWxlUGF0aCArIFwibm9kZV9tb2R1bGVzL0BzZW5jaGEvZXh0LSR7dG9vbGtpdC5uYW1lfS10aGVtZS1jcmlzcFwiLFxuICAgICAgICBcIiR7d29ya3NwYWNlLmRpcn0vXCIgKyBub2RlTW9kdWxlUGF0aCArIFwibm9kZV9tb2R1bGVzL0BzZW5jaGEvZXh0LSR7dG9vbGtpdC5uYW1lfS10aGVtZS1jcmlzcC10b3VjaFwiLFxuICAgICAgICBcIiR7d29ya3NwYWNlLmRpcn0vXCIgKyBub2RlTW9kdWxlUGF0aCArIFwibm9kZV9tb2R1bGVzL0BzZW5jaGEvZXh0LSR7dG9vbGtpdC5uYW1lfS10aGVtZS1uZXB0dW5lXCIsXG4gICAgICAgIFwiJHt3b3Jrc3BhY2UuZGlyfS9cIiArIG5vZGVNb2R1bGVQYXRoICsgXCJub2RlX21vZHVsZXMvQHNlbmNoYS9leHQtJHt0b29sa2l0Lm5hbWV9LXRoZW1lLW5lcHR1bmUtdG91Y2hcIixcbiAgICAgICAgXCIke3dvcmtzcGFjZS5kaXJ9L1wiICsgbm9kZU1vZHVsZVBhdGggKyBcIm5vZGVfbW9kdWxlcy9Ac2VuY2hhL2V4dC0ke3Rvb2xraXQubmFtZX0tdGhlbWUtdHJpdG9uXCIsXG4gICAgICAgIFwiJHt3b3Jrc3BhY2UuZGlyfS9cIiArIG5vZGVNb2R1bGVQYXRoICsgXCJub2RlX21vZHVsZXMvQHNlbmNoYS9leHQtJHt0b29sa2l0Lm5hbWV9LXRoZW1lLWdyYXBoaXRlXCJcbiAgICAgIF0sXG4gICAgICBcImV4dHJhY3RcIjogXCIke3dvcmtzcGFjZS5kaXJ9L1wiICsgbm9kZU1vZHVsZVBhdGggKyBcInBhY2thZ2VzL3JlbW90ZVwiXG4gICAgfVxuICB9XG4gIHJldHVybiBKU09OLnN0cmluZ2lmeShjb25maWcsIG51bGwsIDIpXG59XG5cbmV4cG9ydCBjb25zdCBleHRBbmd1bGFyTW9kdWxlID0gZnVuY3Rpb24oaW1wb3J0cywgZXhwb3J0cywgZGVjbGFyYXRpb25zKSB7XG4gIHJldHVybiBgXG4gIGltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG4gICR7aW1wb3J0c31cbiAgQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbXG4gICAgXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtcbiAgJHtkZWNsYXJhdGlvbnN9ICBdLFxuICAgIGV4cG9ydHM6IFtcbiAgJHtleHBvcnRzfSAgXVxuICB9KVxuICBleHBvcnQgY2xhc3MgRXh0QW5ndWxhck1vZHVsZSB7IH1cbiAgYFxufVxuIl19