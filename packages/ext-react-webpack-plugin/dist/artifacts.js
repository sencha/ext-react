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
}

function createWorkspaceJson2(options, output) {
  const logv = require('./pluginUtil').logv;

  logv(options, 'FUNCTION createWorkspaceJson');
  var isWindows = typeof process != 'undefined' && typeof process.platform != 'undefined' && !!process.platform.match(/^win/);
  var pathDifference = output.substring(process.cwd().length);
  var numberOfPaths = pathDifference.split(isWindows ? "\\" : "/").length - 1;
  var nodeModulePath = '';

  for (var i = 0; i < numberOfPaths; i++) {
    nodeModulePath += "../";
  }

  logv(options, 'isWindows: ' + isWindows);
  logv(options, 'output: ' + output);
  logv(options, 'pathDifference: ' + pathDifference);
  logv(options, 'numberOfPaths: ' + numberOfPaths);
  logv(options, 'nodeModulePath: ' + nodeModulePath);
  const config = {
    "frameworks": {
      "ext": "${workspace.dir}" + nodeModulePath + "node_modules/@sencha/ext"
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9hcnRpZmFjdHMuanMiXSwibmFtZXMiOlsiYnVpbGRYTUwiLCJjb21wcmVzcyIsIm9wdGlvbnMiLCJvdXRwdXQiLCJsb2d2IiwicmVxdWlyZSIsImNvbXByZXNzaW9uIiwidHJpbSIsImNyZWF0ZUFwcEpzb24iLCJ0aGVtZSIsInBhY2thZ2VzIiwidG9vbGtpdCIsImZzIiwiaXNXaW5kb3dzIiwicHJvY2VzcyIsInBsYXRmb3JtIiwibWF0Y2giLCJwYXRoRGlmZmVyZW5jZSIsInN1YnN0cmluZyIsImN3ZCIsImxlbmd0aCIsIm51bWJlck9mUGF0aHMiLCJzcGxpdCIsIm5vZGVNb2R1bGVQYXRoIiwiaSIsImNvbmZpZyIsImZyYW1ld29yayIsInJlcXVpcmVzIiwiYmFzZSIsInJlc291cmNlcyIsInBhdGgiLCJzaGFyZWQiLCJleGlzdHNTeW5jIiwiY2pzb24iLCJwYWNrYWdlSW5mbyIsImxvYWQiLCJqb2luIiwibmFtZSIsImRpciIsInB1c2giLCJyZXNvbHZlIiwiSlNPTiIsInN0cmluZ2lmeSIsImNyZWF0ZUpTRE9NRW52aXJvbm1lbnQiLCJjcmVhdGVXb3Jrc3BhY2VKc29uMiIsImNyZWF0ZVdvcmtzcGFjZUpzb24iLCJleHRBbmd1bGFyTW9kdWxlIiwiaW1wb3J0cyIsImV4cG9ydHMiLCJkZWNsYXJhdGlvbnMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQU8sTUFBTUEsUUFBUSxHQUFHLFVBQVNDLFFBQVQsRUFBbUJDLE9BQW5CLEVBQTRCQyxNQUE1QixFQUFvQztBQUMxRCxRQUFNQyxJQUFJLEdBQUdDLE9BQU8sQ0FBQyxjQUFELENBQVAsQ0FBd0JELElBQXJDOztBQUNBQSxFQUFBQSxJQUFJLENBQUNGLE9BQUQsRUFBUyxtQkFBVCxDQUFKO0FBRUEsTUFBSUksV0FBVyxHQUFHLEVBQWxCOztBQUVBLE1BQUlMLFFBQUosRUFBYztBQUNaSyxJQUFBQSxXQUFXLEdBQUk7Ozs7Ozs7S0FBZjtBQVFEOztBQUVDLFNBQVE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1lBbUZBTCxRQUFRLEdBQUcsV0FBSCxHQUFpQixFQUFHOzs7UUFHaENLLFdBQVk7Ozs7Ozs7Ozs7a0JBVUZMLFFBQVEsR0FBRyxNQUFILEdBQVksT0FBUTs7Ozs7O0NBaEduQyxDQXNHVE0sSUF0R1MsRUFBUDtBQXVHSCxDQXhITTs7OztBQTBIQSxTQUFTQyxhQUFULENBQXdCQyxLQUF4QixFQUErQkMsUUFBL0IsRUFBeUNDLE9BQXpDLEVBQWtEVCxPQUFsRCxFQUEyREMsTUFBM0QsRUFBb0U7QUFDekUsUUFBTUMsSUFBSSxHQUFHQyxPQUFPLENBQUMsY0FBRCxDQUFQLENBQXdCRCxJQUFyQzs7QUFDQUEsRUFBQUEsSUFBSSxDQUFDRixPQUFELEVBQVMsd0JBQVQsQ0FBSjs7QUFFQSxRQUFNVSxFQUFFLEdBQUdQLE9BQU8sQ0FBQyxJQUFELENBQWxCLENBSnlFLENBTXpFO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQSxNQUFJUSxTQUFTLEdBQUcsT0FBT0MsT0FBUCxJQUFrQixXQUFsQixJQUFpQyxPQUFPQSxPQUFPLENBQUNDLFFBQWYsSUFBMkIsV0FBNUQsSUFBMkUsQ0FBQyxDQUFDRCxPQUFPLENBQUNDLFFBQVIsQ0FBaUJDLEtBQWpCLENBQXVCLE1BQXZCLENBQTdGO0FBQ0EsTUFBSUMsY0FBYyxHQUFHZCxNQUFNLENBQUNlLFNBQVAsQ0FBaUJKLE9BQU8sQ0FBQ0ssR0FBUixHQUFjQyxNQUEvQixDQUFyQjtBQUNBLE1BQUlDLGFBQWEsR0FBR0osY0FBYyxDQUFDSyxLQUFmLENBQXFCVCxTQUFTLEdBQUcsSUFBSCxHQUFVLEdBQXhDLEVBQTZDTyxNQUE3QyxHQUFzRCxDQUExRTtBQUNBLE1BQUlHLGNBQWMsR0FBRyxFQUFyQjs7QUFDQSxPQUFLLElBQUlDLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUdILGFBQXBCLEVBQW1DRyxDQUFDLEVBQXBDLEVBQXdDO0FBQ3RDRCxJQUFBQSxjQUFjLElBQUksS0FBbEI7QUFDRDs7QUFHRCxRQUFNRSxNQUFNLEdBQUc7QUFDYkMsSUFBQUEsU0FBUyxFQUFFLEtBREU7QUFFYmYsSUFBQUEsT0FGYTtBQUdiZ0IsSUFBQUEsUUFBUSxFQUFFakIsUUFIRztBQUliLGlCQUFhLENBQ1gsV0FEVyxFQUVYLHNCQUZXLENBSkE7QUFRYixnQkFBWTtBQUNWLGFBQU8sQ0FDTGEsY0FBYyxHQUFHLHNCQURaLEVBRUwsVUFGSztBQURHLEtBUkM7QUFjYnBCLElBQUFBLE1BQU0sRUFBRTtBQUNOeUIsTUFBQUEsSUFBSSxFQUFFLEdBREE7QUFFTkMsTUFBQUEsU0FBUyxFQUFFO0FBQ1RDLFFBQUFBLElBQUksRUFBRSxhQURHO0FBRVRDLFFBQUFBLE1BQU0sRUFBRTtBQUZDO0FBRkwsS0FkSyxDQXVCZjs7QUF2QmUsR0FBZjs7QUF3QkEsTUFBSW5CLEVBQUUsQ0FBQ29CLFVBQUgsQ0FBY3ZCLEtBQWQsQ0FBSixFQUEwQjtBQUN0QixVQUFNcUIsSUFBSSxHQUFHekIsT0FBTyxDQUFDLE1BQUQsQ0FBcEI7O0FBQ0EsVUFBTTRCLEtBQUssR0FBRzVCLE9BQU8sQ0FBQyxPQUFELENBQXJCOztBQUNBLFVBQU02QixXQUFXLEdBQUdELEtBQUssQ0FBQ0UsSUFBTixDQUFXTCxJQUFJLENBQUNNLElBQUwsQ0FBVTNCLEtBQVYsRUFBaUIsY0FBakIsQ0FBWCxDQUFwQjtBQUNBZ0IsSUFBQUEsTUFBTSxDQUFDaEIsS0FBUCxHQUFleUIsV0FBVyxDQUFDRyxJQUEzQjtBQUNBWixJQUFBQSxNQUFNLENBQUNmLFFBQVAsQ0FBZ0I0QixHQUFoQixDQUFvQkMsSUFBcEIsQ0FBeUJULElBQUksQ0FBQ1UsT0FBTCxDQUFhL0IsS0FBYixDQUF6QjtBQUNILEdBTkQsTUFNTztBQUNIZ0IsSUFBQUEsTUFBTSxDQUFDaEIsS0FBUCxHQUFlQSxLQUFmO0FBQ0g7O0FBQ0QsU0FBT2dDLElBQUksQ0FBQ0MsU0FBTCxDQUFlakIsTUFBZixFQUF1QixJQUF2QixFQUE2QixDQUE3QixDQUFQO0FBQ0Q7O0FBRU0sU0FBU2tCLHNCQUFULENBQWdDekMsT0FBaEMsRUFBeUNDLE1BQXpDLEVBQWlEO0FBQ3RELFFBQU1DLElBQUksR0FBR0MsT0FBTyxDQUFDLGNBQUQsQ0FBUCxDQUF3QkQsSUFBckM7O0FBQ0FBLEVBQUFBLElBQUksQ0FBQ0YsT0FBRCxFQUFTLGlDQUFULENBQUo7QUFFQSxTQUFPLG1CQUFQO0FBQ0Q7O0FBRU0sU0FBUzBDLG9CQUFULENBQThCMUMsT0FBOUIsRUFBdUNDLE1BQXZDLEVBQStDO0FBQ3BELFFBQU1DLElBQUksR0FBR0MsT0FBTyxDQUFDLGNBQUQsQ0FBUCxDQUF3QkQsSUFBckM7O0FBQ0FBLEVBQUFBLElBQUksQ0FBQ0YsT0FBRCxFQUFTLDhCQUFULENBQUo7QUFFQSxNQUFJVyxTQUFTLEdBQUcsT0FBT0MsT0FBUCxJQUFrQixXQUFsQixJQUFpQyxPQUFPQSxPQUFPLENBQUNDLFFBQWYsSUFBMkIsV0FBNUQsSUFBMkUsQ0FBQyxDQUFDRCxPQUFPLENBQUNDLFFBQVIsQ0FBaUJDLEtBQWpCLENBQXVCLE1BQXZCLENBQTdGO0FBQ0EsTUFBSUMsY0FBYyxHQUFHZCxNQUFNLENBQUNlLFNBQVAsQ0FBaUJKLE9BQU8sQ0FBQ0ssR0FBUixHQUFjQyxNQUEvQixDQUFyQjtBQUNBLE1BQUlDLGFBQWEsR0FBR0osY0FBYyxDQUFDSyxLQUFmLENBQXFCVCxTQUFTLEdBQUcsSUFBSCxHQUFVLEdBQXhDLEVBQTZDTyxNQUE3QyxHQUFzRCxDQUExRTtBQUNBLE1BQUlHLGNBQWMsR0FBRyxFQUFyQjs7QUFDQSxPQUFLLElBQUlDLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUdILGFBQXBCLEVBQW1DRyxDQUFDLEVBQXBDLEVBQXdDO0FBQ3RDRCxJQUFBQSxjQUFjLElBQUksS0FBbEI7QUFDRDs7QUFFRG5CLEVBQUFBLElBQUksQ0FBQ0YsT0FBRCxFQUFTLGdCQUFnQlcsU0FBekIsQ0FBSjtBQUNBVCxFQUFBQSxJQUFJLENBQUNGLE9BQUQsRUFBUyxhQUFhQyxNQUF0QixDQUFKO0FBQ0FDLEVBQUFBLElBQUksQ0FBQ0YsT0FBRCxFQUFTLHFCQUFxQmUsY0FBOUIsQ0FBSjtBQUNBYixFQUFBQSxJQUFJLENBQUNGLE9BQUQsRUFBUyxvQkFBb0JtQixhQUE3QixDQUFKO0FBQ0FqQixFQUFBQSxJQUFJLENBQUNGLE9BQUQsRUFBUyxxQkFBcUJxQixjQUE5QixDQUFKO0FBRUEsUUFBTUUsTUFBTSxHQUFHO0FBQ2Isa0JBQWM7QUFDWixhQUFRLHFCQUFxQkYsY0FBckIsR0FBc0M7QUFEbEMsS0FERDtBQUliLGdCQUFZO0FBQ1YsYUFBTyxDQUNMLHFCQUFxQkEsY0FBckIsR0FBc0MsTUFBdEMsR0FBK0NyQixPQUFPLENBQUN3QixTQUF2RCxHQUFtRSxXQUQ5RCxFQUVMLHFCQUFxQkgsY0FBckIsR0FBc0Msc0JBRmpDLENBREc7QUFLVixpQkFBVztBQUxEO0FBSkMsR0FBZjtBQVlBLFNBQU9rQixJQUFJLENBQUNDLFNBQUwsQ0FBZWpCLE1BQWYsRUFBdUIsSUFBdkIsRUFBNkIsQ0FBN0IsQ0FBUDtBQUNEOztBQUVNLFNBQVNvQixtQkFBVCxDQUE2QjNDLE9BQTdCLEVBQXNDQyxNQUF0QyxFQUE4QztBQUNuRCxRQUFNQyxJQUFJLEdBQUdDLE9BQU8sQ0FBQyxjQUFELENBQVAsQ0FBd0JELElBQXJDOztBQUNBQSxFQUFBQSxJQUFJLENBQUNGLE9BQUQsRUFBUyw4QkFBVCxDQUFKLENBRm1ELENBSW5EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFHQSxNQUFJVyxTQUFTLEdBQUcsT0FBT0MsT0FBUCxJQUFrQixXQUFsQixJQUFpQyxPQUFPQSxPQUFPLENBQUNDLFFBQWYsSUFBMkIsV0FBNUQsSUFBMkUsQ0FBQyxDQUFDRCxPQUFPLENBQUNDLFFBQVIsQ0FBaUJDLEtBQWpCLENBQXVCLE1BQXZCLENBQTdGO0FBQ0EsTUFBSUMsY0FBYyxHQUFHZCxNQUFNLENBQUNlLFNBQVAsQ0FBaUJKLE9BQU8sQ0FBQ0ssR0FBUixHQUFjQyxNQUEvQixDQUFyQjtBQUNBLE1BQUlDLGFBQWEsR0FBR0osY0FBYyxDQUFDSyxLQUFmLENBQXFCVCxTQUFTLEdBQUcsSUFBSCxHQUFVLEdBQXhDLEVBQTZDTyxNQUE3QyxHQUFzRCxDQUExRTtBQUNBLE1BQUlHLGNBQWMsR0FBRyxFQUFyQjs7QUFDQSxPQUFLLElBQUlDLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUdILGFBQXBCLEVBQW1DRyxDQUFDLEVBQXBDLEVBQXdDO0FBQ3RDRCxJQUFBQSxjQUFjLElBQUksS0FBbEI7QUFDRDs7QUFFRCxRQUFNRSxNQUFNLEdBQUc7QUFDYixrQkFBYztBQUNaLGFBQU8sc0JBQXNCRixjQUF0QixHQUF1QztBQURsQyxLQUREO0FBSWIsYUFBUztBQUNQLGFBQU8sc0JBQXNCQSxjQUF0QixHQUF1QztBQUR2QyxLQUpJO0FBT2IsZ0JBQVk7QUFDVixhQUFPLENBQ0wsc0JBQXNCQSxjQUF0QixHQUF1QyxNQUF2QyxHQUFnRHJCLE9BQU8sQ0FBQ3dCLFNBQXhELEdBQW9FLGlCQUQvRCxFQUVMLHNCQUFzQkgsY0FBdEIsR0FBdUMsTUFBdkMsR0FBZ0RyQixPQUFPLENBQUN3QixTQUF4RCxHQUFvRSxXQUYvRCxFQUdMLHNCQUFzQkgsY0FBdEIsR0FBdUMsc0JBSGxDLEVBSUwsc0JBQXNCQSxjQUF0QixHQUF1QywwQ0FKbEMsRUFLTCxzQkFBc0JBLGNBQXRCLEdBQXVDLHFEQUxsQyxFQU1MLHNCQUFzQkEsY0FBdEIsR0FBdUMsb0RBTmxDLEVBT0wsc0JBQXNCQSxjQUF0QixHQUF1Qyx5REFQbEMsRUFRTCxzQkFBc0JBLGNBQXRCLEdBQXVDLHFEQVJsQyxFQVNMLHNCQUFzQkEsY0FBdEIsR0FBdUMsd0RBVGxDLEVBVUwsc0JBQXNCQSxjQUF0QixHQUF1Qyx3REFWbEMsRUFXTCxzQkFBc0JBLGNBQXRCLEdBQXVDLHFEQVhsQyxFQVlMLHNCQUFzQkEsY0FBdEIsR0FBdUMsc0RBWmxDLEVBYUwsc0JBQXNCQSxjQUF0QixHQUF1Qyw0REFibEMsRUFjTCxzQkFBc0JBLGNBQXRCLEdBQXVDLHdEQWRsQyxFQWVMLHNCQUFzQkEsY0FBdEIsR0FBdUMsOERBZmxDLEVBZ0JMLHNCQUFzQkEsY0FBdEIsR0FBdUMsdURBaEJsQyxFQWlCTCxzQkFBc0JBLGNBQXRCLEdBQXVDLHlEQWpCbEMsQ0FERztBQW9CVixpQkFBVyxzQkFBc0JBLGNBQXRCLEdBQXVDO0FBcEJ4QztBQVBDLEdBQWY7QUE4QkEsU0FBT2tCLElBQUksQ0FBQ0MsU0FBTCxDQUFlakIsTUFBZixFQUF1QixJQUF2QixFQUE2QixDQUE3QixDQUFQO0FBQ0Q7O0FBRU0sTUFBTXFCLGdCQUFnQixHQUFHLFVBQVNDLE9BQVQsRUFBa0JDLE9BQWxCLEVBQTJCQyxZQUEzQixFQUF5QztBQUN2RSxTQUFROztJQUVORixPQUFROzs7OztJQUtSRSxZQUFhOztJQUViRCxPQUFROzs7R0FUVjtBQWFELENBZE0iLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY29uc3QgYnVpbGRYTUwgPSBmdW5jdGlvbihjb21wcmVzcywgb3B0aW9ucywgb3V0cHV0KSB7XG4gIGNvbnN0IGxvZ3YgPSByZXF1aXJlKCcuL3BsdWdpblV0aWwnKS5sb2d2XG4gIGxvZ3Yob3B0aW9ucywnRlVOQ1RJT04gYnVpbGRYTUwnKVxuICBcbiAgbGV0IGNvbXByZXNzaW9uID0gJydcblxuICBpZiAoY29tcHJlc3MpIHtcbiAgICBjb21wcmVzc2lvbiA9IGBcbiAgICAgIHRoZW4gXG4gICAgICBmcyBcbiAgICAgIG1pbmlmeSBcbiAgICAgICAgLXl1aSBcbiAgICAgICAgLWZyb209ZXh0LmpzIFxuICAgICAgICAtdG89ZXh0LmpzXG4gICAgYDtcbiAgfVxuXG4gICAgcmV0dXJuIGA8cHJvamVjdCBuYW1lPVwic2ltcGxlLWJ1aWxkXCIgYmFzZWRpcj1cIi5cIj5cbiAgPCEtLSAgaW50ZXJuYWxseSwgd2F0Y2ggY2FsbHMgdGhlIGluaXQgdGFyZ2V0LCBzbyBuZWVkIHRvIGhhdmUgb25lIGhlcmUgLS0+XG4gIDx0YXJnZXQgbmFtZT1cImluaXRcIi8+XG4gIDx0YXJnZXQgbmFtZT1cImluaXQtY21kXCI+XG4gICAgPHRhc2tkZWYgIHJlc291cmNlPVwiY29tL3NlbmNoYS9hbnQvYW50bGliLnhtbFwiXG4gICAgICAgICAgICAgIGNsYXNzcGF0aD1cIlxcJHtjbWQuZGlyfS9zZW5jaGEuamFyXCJcbiAgICAgICAgICAgICAgbG9hZGVycmVmPVwic2VuY2hhbG9hZGVyXCIvPlxuICAgIDx4LWV4dGVuZC1jbGFzc3BhdGg+XG4gICAgICAgIDxqYXIgcGF0aD1cIlxcJHtjbWQuZGlyfS9zZW5jaGEuamFyXCIvPlxuICAgIDwveC1leHRlbmQtY2xhc3NwYXRoPlxuICAgIDx4LXNlbmNoYS1pbml0IHByZWZpeD1cIlwiLz5cbiAgICA8eC1jb21waWxlIHJlZmlkPVwidGhlQ29tcGlsZXJcIlxuICAgICAgICAgICAgICAgICAgICAgIGRpcj1cIlxcJHtiYXNlZGlyfVwiXG4gICAgICAgICAgICAgICAgICAgICAgaW5pdE9ubHk9XCJ0cnVlXCJcbiAgICAgICAgICAgICAgICAgICAgICBpbmhlcml0QWxsPVwidHJ1ZVwiPlxuICAgICAgICAgICAgICA8IVtDREFUQVtcbiAgICAgICAgICAgICAgLWNsYXNzcGF0aD1cXCR7YmFzZWRpcn0vbWFuaWZlc3QuanNcbiAgICAgICAgICAgICAgbG9hZC1hcHBcbiAgICAgICAgICAgICAgICAgIC10ZW1wPVxcJHtiYXNlZGlyfS90ZW1wXG4gICAgICAgICAgICAgICAgICAtdGFnPUFwcFxuICAgICAgICBdXT5cbiAgICAgIDwveC1jb21waWxlPlxuICA8L3RhcmdldD5cbiAgPHRhcmdldCBuYW1lPVwicmVidWlsZFwiPlxuICAgIDx4LWNvbXBpbGUgcmVmaWQ9XCJ0aGVDb21waWxlclwiXG4gICAgICAgICAgICAgIGRpcj1cIlxcJHtiYXNlZGlyfVwiXG4gICAgICAgICAgICAgIGluaGVyaXRBbGw9XCJ0cnVlXCI+XG4gICAgICA8IVtDREFUQVtcbiAgICAgIC0tZGVidWdcbiAgICAgIGV4Y2x1ZGVcbiAgICAgIC1hbGxcbiAgICAgIGFuZFxuICAgICAgaW5jbHVkZVxuICAgICAgLWY9Qm9vdC5qc1xuICAgICAgYW5kXG4gICAgICBjb25jYXRlbmF0ZVxuICAgICAgICAgIGV4dC5qc1xuICAgICAgYW5kXG4gICAgICBleGNsdWRlXG4gICAgICAtYWxsXG4gICAgICBhbmRcbiAgICAgICMgaW5jbHVkZSB0aGVtZSBvdmVycmlkZXNcbiAgICAgIGluY2x1ZGVcbiAgICAgICAgLXJcbiAgICAgICAgLXRhZz1vdmVycmlkZXNcbiAgICAgIGFuZFxuICAgICAgIyBpbmNsdWRlIGFsbCBqcyBmaWxlcyBuZWVkZWQgZm9yIG1hbmlmZXN0LmpzXG4gICAgICBpbmNsdWRlXG4gICAgICAgICAgLXJcbiAgICAgICAgICAtZj1tYW5pZmVzdC5qc1xuICAgICAgYW5kXG4gICAgICAjIGV4Y2x1ZGUgdGhlIGdlbmVyYXRlZCBtYW5pZmVzdCBmaWxlIGl0c2VsZixcbiAgICAgICMgc2luY2Ugd2UgZG9uJ3Qgd2FudCB0aGUgZ2VuZXJhdGVkIGJ1bmRsZSBmaWxlIHRvIGNyZWF0ZSBhbnkgY29tcG9uZW50c1xuICAgICAgZXhjbHVkZVxuICAgICAgLWY9bWFuaWZlc3QuanNcbiAgICAgIGFuZFxuICAgICAgY29uY2F0ZW5hdGVcbiAgICAgICthcHBlbmRcbiAgICAgICAgICBleHQuanNcbiAgICAgIGFuZFxuICAgICAgc2Nzc1xuICAgICAgICAgIC1hcHBOYW1lPUFwcFxuICAgICAgICAgIC1pbWFnZVNlYXJjaFBhdGg9cmVzb3VyY2VzXG4gICAgICAgICAgLXRoZW1lTmFtZT10cml0b25cbiAgICAgICAgICAtcmVzb3VyY2VNYXBCYXNlPS5cbiAgICAgICAgICAtb3V0cHV0PWV4dC5zY3NzXG4gICAgICBhbmRcbiAgICAgIHJlc291cmNlc1xuICAgICAgICAgIC1leGNsdWRlcz0tYWxsKi5jc3NcbiAgICAgICAgICAtb3V0PXJlc291cmNlc1xuICAgICAgYW5kXG4gICAgICByZXNvdXJjZXNcbiAgICAgICAgICAtbW9kZWw9dHJ1ZVxuICAgICAgICAgIC1vdXQ9cmVzb3VyY2VzXG4gICAgICBdXT5cbiAgICA8L3gtY29tcGlsZT5cbiAgPC90YXJnZXQ+XG4gIDx0YXJnZXQgbmFtZT1cImJ1aWxkXCIgZGVwZW5kcz1cImluaXQtY21kLHJlYnVpbGRcIj5cbiAgICA8eC1zZW5jaGEtY29tbWFuZCBkaXI9XCJcXCR7YmFzZWRpcn1cIj5cbiAgICAgIDwhW0NEQVRBW1xuICAgICAgZmFzaGlvblxuICAgICAgICAgIC1wd2Q9LlxuICAgICAgICAgIC1zcGxpdD00MDk1XG4gICAgICAgICAgJHtjb21wcmVzcyA/ICctY29tcHJlc3MnIDogJyd9XG4gICAgICAgICAgICAgIGV4dC5zY3NzXG4gICAgICAgICAgZXh0LmNzc1xuICAgICAgJHtjb21wcmVzc2lvbn1cbiAgICAgIF1dPlxuICAgIDwveC1zZW5jaGEtY29tbWFuZD5cbiAgPC90YXJnZXQ+XG4gIDx0YXJnZXQgbmFtZT1cIndhdGNoXCIgZGVwZW5kcz1cImluaXQtY21kLGJ1aWxkXCI+XG4gICAgPHgtZmFzaGlvbi13YXRjaFxuICAgICAgcmVmTmFtZT1cImZhc2hpb24td2F0Y2hcIlxuICAgICAgaW5wdXRGaWxlPVwiZXh0LnNjc3NcIlxuICAgICAgb3V0cHV0RmlsZT1cImV4dC5jc3NcIlxuICAgICAgc3BsaXQ9XCI0MDk1XCJcbiAgICAgIGNvbXByZXNzPVwiJHtjb21wcmVzcyA/ICd0cnVlJyA6ICdmYWxzZSd9XCJcbiAgICAgIGNvbmZpZ0ZpbGU9XCJhcHAuanNvblwiXG4gICAgICBmb3JrPVwidHJ1ZVwiLz5cbiAgICA8eC13YXRjaCBjb21waWxlclJlZj1cInRoZUNvbXBpbGVyXCIgdGFyZ2V0cz1cInJlYnVpbGRcIi8+XG4gIDwvdGFyZ2V0PlxuPC9wcm9qZWN0PlxuYC50cmltKClcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUFwcEpzb24oIHRoZW1lLCBwYWNrYWdlcywgdG9vbGtpdCwgb3B0aW9ucywgb3V0cHV0ICkge1xuICBjb25zdCBsb2d2ID0gcmVxdWlyZSgnLi9wbHVnaW5VdGlsJykubG9ndlxuICBsb2d2KG9wdGlvbnMsJ0ZVTkNUSU9OIGNyZWF0ZUFwcEpzb24nKVxuXG4gIGNvbnN0IGZzID0gcmVxdWlyZSgnZnMnKVxuXG4gIC8vIG92ZXJyaWRlczogb3ZlcnJpZGVzLm1hcChkaXIgPT4gcGF0aC5yZXNvbHZlKGRpcikpLmNvbmNhdCgnanNkb20tZW52aXJvbm1lbnQuanMnKSxcbiAgLy8gcGFja2FnZXM6IHtcbiAgLy8gICBkaXI6IHBhY2thZ2VEaXJzLm1hcChkaXIgPT4gcGF0aC5yZXNvbHZlKGRpcikpXG4gIC8vIH0sXG5cbiAgLy8gdmFyIHBhdGhEaWZmZXJlbmNlID0gb3V0cHV0LnN1YnN0cmluZyhwcm9jZXNzLmN3ZCgpLmxlbmd0aClcbiAgLy8gdmFyIG51bWJlck9mUGF0aHMgPSAocGF0aERpZmZlcmVuY2Uuc3BsaXQoXCIvXCIpLmxlbmd0aCAtIDEpXG4gIC8vIHZhciBub2RlTW9kdWxlUGF0aCA9ICcnXG4gIC8vIGZvciAodmFyIGkgPSAwOyBpIDwgbnVtYmVyT2ZQYXRoczsgaSsrKSB7IFxuICAvLyAgIG5vZGVNb2R1bGVQYXRoICs9IFwiLi4vXCJcbiAgLy8gfVxuXG4gIHZhciBpc1dpbmRvd3MgPSB0eXBlb2YgcHJvY2VzcyAhPSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgcHJvY2Vzcy5wbGF0Zm9ybSAhPSAndW5kZWZpbmVkJyAmJiAhIXByb2Nlc3MucGxhdGZvcm0ubWF0Y2goL153aW4vKTtcbiAgdmFyIHBhdGhEaWZmZXJlbmNlID0gb3V0cHV0LnN1YnN0cmluZyhwcm9jZXNzLmN3ZCgpLmxlbmd0aClcbiAgdmFyIG51bWJlck9mUGF0aHMgPSBwYXRoRGlmZmVyZW5jZS5zcGxpdChpc1dpbmRvd3MgPyBcIlxcXFxcIiA6IFwiL1wiKS5sZW5ndGggLSAxO1xuICB2YXIgbm9kZU1vZHVsZVBhdGggPSAnJ1xuICBmb3IgKHZhciBpID0gMDsgaSA8IG51bWJlck9mUGF0aHM7IGkrKykgeyBcbiAgICBub2RlTW9kdWxlUGF0aCArPSBcIi4uL1wiXG4gIH1cblxuXG4gIGNvbnN0IGNvbmZpZyA9IHtcbiAgICBmcmFtZXdvcms6IFwiZXh0XCIsXG4gICAgdG9vbGtpdCxcbiAgICByZXF1aXJlczogcGFja2FnZXMsXG4gICAgXCJvdmVycmlkZXNcIjogW1xuICAgICAgXCJvdmVycmlkZXNcIixcbiAgICAgIFwianNkb20tZW52aXJvbm1lbnQuanNcIlxuICAgIF0sXG4gICAgXCJwYWNrYWdlc1wiOiB7XG4gICAgICBcImRpclwiOiBbXG4gICAgICAgIG5vZGVNb2R1bGVQYXRoICsgXCJub2RlX21vZHVsZXMvQHNlbmNoYVwiLFxuICAgICAgICBcInBhY2thZ2VzXCJcbiAgICAgIF1cbiAgICB9LFxuICAgIG91dHB1dDoge1xuICAgICAgYmFzZTogJy4nLFxuICAgICAgcmVzb3VyY2VzOiB7XG4gICAgICAgIHBhdGg6ICcuL3Jlc291cmNlcycsXG4gICAgICAgIHNoYXJlZDogXCIuL3Jlc291cmNlc1wiXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy8gaWYgdGhlbWUgaXMgbG9jYWwgYWRkIGl0IGFzIGFuIGFkZGl0aW9uYWwgcGFja2FnZSBkaXJcbiAgaWYgKGZzLmV4aXN0c1N5bmModGhlbWUpKSB7XG4gICAgICBjb25zdCBwYXRoID0gcmVxdWlyZSgncGF0aCcpXG4gICAgICBjb25zdCBjanNvbiA9IHJlcXVpcmUoJ2Nqc29uJylcbiAgICAgIGNvbnN0IHBhY2thZ2VJbmZvID0gY2pzb24ubG9hZChwYXRoLmpvaW4odGhlbWUsICdwYWNrYWdlLmpzb24nKSk7XG4gICAgICBjb25maWcudGhlbWUgPSBwYWNrYWdlSW5mby5uYW1lO1xuICAgICAgY29uZmlnLnBhY2thZ2VzLmRpci5wdXNoKHBhdGgucmVzb2x2ZSh0aGVtZSkpO1xuICB9IGVsc2Uge1xuICAgICAgY29uZmlnLnRoZW1lID0gdGhlbWU7XG4gIH1cbiAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KGNvbmZpZywgbnVsbCwgMilcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUpTRE9NRW52aXJvbm1lbnQob3B0aW9ucywgb3V0cHV0KSB7XG4gIGNvbnN0IGxvZ3YgPSByZXF1aXJlKCcuL3BsdWdpblV0aWwnKS5sb2d2XG4gIGxvZ3Yob3B0aW9ucywnRlVOQ1RJT04gY3JlYXRlSlNET01FbnZpcm9ubWVudCcpXG5cbiAgcmV0dXJuICd3aW5kb3cuRXh0ID0gRXh0Oydcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVdvcmtzcGFjZUpzb24yKG9wdGlvbnMsIG91dHB1dCkge1xuICBjb25zdCBsb2d2ID0gcmVxdWlyZSgnLi9wbHVnaW5VdGlsJykubG9ndlxuICBsb2d2KG9wdGlvbnMsJ0ZVTkNUSU9OIGNyZWF0ZVdvcmtzcGFjZUpzb24nKVxuXG4gIHZhciBpc1dpbmRvd3MgPSB0eXBlb2YgcHJvY2VzcyAhPSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgcHJvY2Vzcy5wbGF0Zm9ybSAhPSAndW5kZWZpbmVkJyAmJiAhIXByb2Nlc3MucGxhdGZvcm0ubWF0Y2goL153aW4vKTtcbiAgdmFyIHBhdGhEaWZmZXJlbmNlID0gb3V0cHV0LnN1YnN0cmluZyhwcm9jZXNzLmN3ZCgpLmxlbmd0aClcbiAgdmFyIG51bWJlck9mUGF0aHMgPSBwYXRoRGlmZmVyZW5jZS5zcGxpdChpc1dpbmRvd3MgPyBcIlxcXFxcIiA6IFwiL1wiKS5sZW5ndGggLSAxO1xuICB2YXIgbm9kZU1vZHVsZVBhdGggPSAnJ1xuICBmb3IgKHZhciBpID0gMDsgaSA8IG51bWJlck9mUGF0aHM7IGkrKykgeyBcbiAgICBub2RlTW9kdWxlUGF0aCArPSBcIi4uL1wiXG4gIH1cblxuICBsb2d2KG9wdGlvbnMsJ2lzV2luZG93czogJyArIGlzV2luZG93cylcbiAgbG9ndihvcHRpb25zLCdvdXRwdXQ6ICcgKyBvdXRwdXQpXG4gIGxvZ3Yob3B0aW9ucywncGF0aERpZmZlcmVuY2U6ICcgKyBwYXRoRGlmZmVyZW5jZSlcbiAgbG9ndihvcHRpb25zLCdudW1iZXJPZlBhdGhzOiAnICsgbnVtYmVyT2ZQYXRocylcbiAgbG9ndihvcHRpb25zLCdub2RlTW9kdWxlUGF0aDogJyArIG5vZGVNb2R1bGVQYXRoKVxuXG4gIGNvbnN0IGNvbmZpZyA9IHtcbiAgICBcImZyYW1ld29ya3NcIjoge1xuICAgICAgXCJleHRcIjogIFwiJHt3b3Jrc3BhY2UuZGlyfVwiICsgbm9kZU1vZHVsZVBhdGggKyBcIm5vZGVfbW9kdWxlcy9Ac2VuY2hhL2V4dFwiXG4gICAgfSxcbiAgICBcInBhY2thZ2VzXCI6IHtcbiAgICAgIFwiZGlyXCI6IFtcbiAgICAgICAgXCIke3dvcmtzcGFjZS5kaXJ9XCIgKyBub2RlTW9kdWxlUGF0aCArIFwiZXh0LVwiICsgb3B0aW9ucy5mcmFtZXdvcmsgKyBcIi9wYWNrYWdlc1wiLFxuICAgICAgICBcIiR7d29ya3NwYWNlLmRpcn1cIiArIG5vZGVNb2R1bGVQYXRoICsgXCJub2RlX21vZHVsZXMvQHNlbmNoYVwiXG4gICAgICBdLFxuICAgICAgXCJleHRyYWN0XCI6IFwiJHt3b3Jrc3BhY2UuZGlyfS9wYWNrYWdlcy9yZW1vdGVcIlxuICAgIH1cbiAgfVxuICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoY29uZmlnLCBudWxsLCAyKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlV29ya3NwYWNlSnNvbihvcHRpb25zLCBvdXRwdXQpIHtcbiAgY29uc3QgbG9ndiA9IHJlcXVpcmUoJy4vcGx1Z2luVXRpbCcpLmxvZ3ZcbiAgbG9ndihvcHRpb25zLCdGVU5DVElPTiBjcmVhdGVXb3Jrc3BhY2VKc29uJylcblxuICAvLyB2YXIgcGF0aERpZmZlcmVuY2UgPSBvdXRwdXQuc3Vic3RyaW5nKHByb2Nlc3MuY3dkKCkubGVuZ3RoKVxuICAvLyB2YXIgbnVtYmVyT2ZQYXRocyA9IChwYXRoRGlmZmVyZW5jZS5zcGxpdChcIi9cIikubGVuZ3RoIC0gMSlcbiAgLy8gdmFyIG5vZGVNb2R1bGVQYXRoID0gJydcbiAgLy8gZm9yICh2YXIgaSA9IDA7IGkgPCBudW1iZXJPZlBhdGhzOyBpKyspIHsgXG4gIC8vICAgbm9kZU1vZHVsZVBhdGggKz0gXCIuLi9cIlxuICAvLyB9XG5cblxuICB2YXIgaXNXaW5kb3dzID0gdHlwZW9mIHByb2Nlc3MgIT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIHByb2Nlc3MucGxhdGZvcm0gIT0gJ3VuZGVmaW5lZCcgJiYgISFwcm9jZXNzLnBsYXRmb3JtLm1hdGNoKC9ed2luLyk7XG4gIHZhciBwYXRoRGlmZmVyZW5jZSA9IG91dHB1dC5zdWJzdHJpbmcocHJvY2Vzcy5jd2QoKS5sZW5ndGgpXG4gIHZhciBudW1iZXJPZlBhdGhzID0gcGF0aERpZmZlcmVuY2Uuc3BsaXQoaXNXaW5kb3dzID8gXCJcXFxcXCIgOiBcIi9cIikubGVuZ3RoIC0gMTtcbiAgdmFyIG5vZGVNb2R1bGVQYXRoID0gJydcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBudW1iZXJPZlBhdGhzOyBpKyspIHsgXG4gICAgbm9kZU1vZHVsZVBhdGggKz0gXCIuLi9cIlxuICB9XG5cbiAgY29uc3QgY29uZmlnID0ge1xuICAgIFwiZnJhbWV3b3Jrc1wiOiB7XG4gICAgICBcImV4dFwiOiBcIiR7d29ya3NwYWNlLmRpcn0vXCIgKyBub2RlTW9kdWxlUGF0aCArIFwibm9kZV9tb2R1bGVzL0BzZW5jaGEvZXh0XCJcbiAgICB9LFxuICAgIFwiYnVpbGRcIjoge1xuICAgICAgXCJkaXJcIjogXCIke3dvcmtzcGFjZS5kaXJ9L1wiICsgbm9kZU1vZHVsZVBhdGggKyBcImJ1aWxkXCJcbiAgICB9LFxuICAgIFwicGFja2FnZXNcIjoge1xuICAgICAgXCJkaXJcIjogW1xuICAgICAgICBcIiR7d29ya3NwYWNlLmRpcn0vXCIgKyBub2RlTW9kdWxlUGF0aCArIFwiZXh0LVwiICsgb3B0aW9ucy5mcmFtZXdvcmsgKyBcIi9wYWNrYWdlcy9sb2NhbFwiLFxuICAgICAgICBcIiR7d29ya3NwYWNlLmRpcn0vXCIgKyBub2RlTW9kdWxlUGF0aCArIFwiZXh0LVwiICsgb3B0aW9ucy5mcmFtZXdvcmsgKyBcIi9wYWNrYWdlc1wiLFxuICAgICAgICBcIiR7d29ya3NwYWNlLmRpcn0vXCIgKyBub2RlTW9kdWxlUGF0aCArIFwibm9kZV9tb2R1bGVzL0BzZW5jaGFcIixcbiAgICAgICAgXCIke3dvcmtzcGFjZS5kaXJ9L1wiICsgbm9kZU1vZHVsZVBhdGggKyBcIm5vZGVfbW9kdWxlcy9Ac2VuY2hhL2V4dC0ke3Rvb2xraXQubmFtZX1cIixcbiAgICAgICAgXCIke3dvcmtzcGFjZS5kaXJ9L1wiICsgbm9kZU1vZHVsZVBhdGggKyBcIm5vZGVfbW9kdWxlcy9Ac2VuY2hhL2V4dC0ke3Rvb2xraXQubmFtZX0tdGhlbWUtYmFzZVwiLFxuICAgICAgICBcIiR7d29ya3NwYWNlLmRpcn0vXCIgKyBub2RlTW9kdWxlUGF0aCArIFwibm9kZV9tb2R1bGVzL0BzZW5jaGEvZXh0LSR7dG9vbGtpdC5uYW1lfS10aGVtZS1pb3NcIixcbiAgICAgICAgXCIke3dvcmtzcGFjZS5kaXJ9L1wiICsgbm9kZU1vZHVsZVBhdGggKyBcIm5vZGVfbW9kdWxlcy9Ac2VuY2hhL2V4dC0ke3Rvb2xraXQubmFtZX0tdGhlbWUtbWF0ZXJpYWxcIixcbiAgICAgICAgXCIke3dvcmtzcGFjZS5kaXJ9L1wiICsgbm9kZU1vZHVsZVBhdGggKyBcIm5vZGVfbW9kdWxlcy9Ac2VuY2hhL2V4dC0ke3Rvb2xraXQubmFtZX0tdGhlbWUtYXJpYVwiLFxuICAgICAgICBcIiR7d29ya3NwYWNlLmRpcn0vXCIgKyBub2RlTW9kdWxlUGF0aCArIFwibm9kZV9tb2R1bGVzL0BzZW5jaGEvZXh0LSR7dG9vbGtpdC5uYW1lfS10aGVtZS1uZXV0cmFsXCIsXG4gICAgICAgIFwiJHt3b3Jrc3BhY2UuZGlyfS9cIiArIG5vZGVNb2R1bGVQYXRoICsgXCJub2RlX21vZHVsZXMvQHNlbmNoYS9leHQtJHt0b29sa2l0Lm5hbWV9LXRoZW1lLWNsYXNzaWNcIixcbiAgICAgICAgXCIke3dvcmtzcGFjZS5kaXJ9L1wiICsgbm9kZU1vZHVsZVBhdGggKyBcIm5vZGVfbW9kdWxlcy9Ac2VuY2hhL2V4dC0ke3Rvb2xraXQubmFtZX0tdGhlbWUtZ3JheVwiLFxuICAgICAgICBcIiR7d29ya3NwYWNlLmRpcn0vXCIgKyBub2RlTW9kdWxlUGF0aCArIFwibm9kZV9tb2R1bGVzL0BzZW5jaGEvZXh0LSR7dG9vbGtpdC5uYW1lfS10aGVtZS1jcmlzcFwiLFxuICAgICAgICBcIiR7d29ya3NwYWNlLmRpcn0vXCIgKyBub2RlTW9kdWxlUGF0aCArIFwibm9kZV9tb2R1bGVzL0BzZW5jaGEvZXh0LSR7dG9vbGtpdC5uYW1lfS10aGVtZS1jcmlzcC10b3VjaFwiLFxuICAgICAgICBcIiR7d29ya3NwYWNlLmRpcn0vXCIgKyBub2RlTW9kdWxlUGF0aCArIFwibm9kZV9tb2R1bGVzL0BzZW5jaGEvZXh0LSR7dG9vbGtpdC5uYW1lfS10aGVtZS1uZXB0dW5lXCIsXG4gICAgICAgIFwiJHt3b3Jrc3BhY2UuZGlyfS9cIiArIG5vZGVNb2R1bGVQYXRoICsgXCJub2RlX21vZHVsZXMvQHNlbmNoYS9leHQtJHt0b29sa2l0Lm5hbWV9LXRoZW1lLW5lcHR1bmUtdG91Y2hcIixcbiAgICAgICAgXCIke3dvcmtzcGFjZS5kaXJ9L1wiICsgbm9kZU1vZHVsZVBhdGggKyBcIm5vZGVfbW9kdWxlcy9Ac2VuY2hhL2V4dC0ke3Rvb2xraXQubmFtZX0tdGhlbWUtdHJpdG9uXCIsXG4gICAgICAgIFwiJHt3b3Jrc3BhY2UuZGlyfS9cIiArIG5vZGVNb2R1bGVQYXRoICsgXCJub2RlX21vZHVsZXMvQHNlbmNoYS9leHQtJHt0b29sa2l0Lm5hbWV9LXRoZW1lLWdyYXBoaXRlXCJcbiAgICAgIF0sXG4gICAgICBcImV4dHJhY3RcIjogXCIke3dvcmtzcGFjZS5kaXJ9L1wiICsgbm9kZU1vZHVsZVBhdGggKyBcInBhY2thZ2VzL3JlbW90ZVwiXG4gICAgfVxuICB9XG4gIHJldHVybiBKU09OLnN0cmluZ2lmeShjb25maWcsIG51bGwsIDIpXG59XG5cbmV4cG9ydCBjb25zdCBleHRBbmd1bGFyTW9kdWxlID0gZnVuY3Rpb24oaW1wb3J0cywgZXhwb3J0cywgZGVjbGFyYXRpb25zKSB7XG4gIHJldHVybiBgXG4gIGltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG4gICR7aW1wb3J0c31cbiAgQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbXG4gICAgXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtcbiAgJHtkZWNsYXJhdGlvbnN9ICBdLFxuICAgIGV4cG9ydHM6IFtcbiAgJHtleHBvcnRzfSAgXVxuICB9KVxuICBleHBvcnQgY2xhc3MgRXh0QW5ndWxhck1vZHVsZSB7IH1cbiAgYFxufVxuIl19