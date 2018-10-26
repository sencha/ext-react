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
      "dir": ["../../node_modules/@sencha", "packages"]
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
  const logv = require('./pluginUtil').logv;

  logv(options, 'FUNCTION createWorkspaceJson'); //"dir": ['${workspace.dir}/packages/local','${workspace.dir}/packages'].concat(packages).join(','),

  const config = {
    "frameworks": {
      "ext": "../../node_modules/@sencha/ext"
    },
    "packages": {
      "dir": ["${workspace.dir}/../../ext-" + options.framework + "/packages", "${workspace.dir}/../../node_modules/@sencha"],
      "extract": "${workspace.dir}/packages/remote"
    }
  };
  return JSON.stringify(config, null, 2);
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9hcnRpZmFjdHMuanMiXSwibmFtZXMiOlsiYnVpbGRYTUwiLCJjb21wcmVzcyIsIm9wdGlvbnMiLCJsb2d2IiwicmVxdWlyZSIsImNvbXByZXNzaW9uIiwidHJpbSIsImNyZWF0ZUFwcEpzb24iLCJ0aGVtZSIsInBhY2thZ2VzIiwidG9vbGtpdCIsImZzIiwiY29uZmlnIiwiZnJhbWV3b3JrIiwicmVxdWlyZXMiLCJvdXRwdXQiLCJiYXNlIiwicmVzb3VyY2VzIiwicGF0aCIsInNoYXJlZCIsImV4aXN0c1N5bmMiLCJwYWNrYWdlSW5mbyIsImNqc29uIiwibG9hZCIsImpvaW4iLCJuYW1lIiwiZGlyIiwicHVzaCIsInJlc29sdmUiLCJKU09OIiwic3RyaW5naWZ5IiwiY3JlYXRlSlNET01FbnZpcm9ubWVudCIsImNyZWF0ZVdvcmtzcGFjZUpzb24iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBTyxNQUFNQSxRQUFRLEdBQUcsVUFBU0MsUUFBVCxFQUFtQkMsT0FBbkIsRUFBNEI7QUFDbEQsUUFBTUMsSUFBSSxHQUFHQyxPQUFPLENBQUMsY0FBRCxDQUFQLENBQXdCRCxJQUFyQzs7QUFDQUEsRUFBQUEsSUFBSSxDQUFDRCxPQUFELEVBQVMsbUJBQVQsQ0FBSjtBQUVBLE1BQUlHLFdBQVcsR0FBRyxFQUFsQjs7QUFFQSxNQUFJSixRQUFKLEVBQWM7QUFDWkksSUFBQUEsV0FBVyxHQUFJOzs7Ozs7O0tBQWY7QUFRRDs7QUFFQyxTQUFROzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztZQW1GQUosUUFBUSxHQUFHLFdBQUgsR0FBaUIsRUFBRzs7O1FBR2hDSSxXQUFZOzs7Ozs7Ozs7O2tCQVVGSixRQUFRLEdBQUcsTUFBSCxHQUFZLE9BQVE7Ozs7OztDQWhHbkMsQ0FzR1RLLElBdEdTLEVBQVA7QUF1R0gsQ0F4SE07Ozs7QUEwSEEsU0FBU0MsYUFBVCxDQUF3QkMsS0FBeEIsRUFBK0JDLFFBQS9CLEVBQXlDQyxPQUF6QyxFQUFrRFIsT0FBbEQsRUFBNEQ7QUFDakUsUUFBTUMsSUFBSSxHQUFHQyxPQUFPLENBQUMsY0FBRCxDQUFQLENBQXdCRCxJQUFyQzs7QUFDQUEsRUFBQUEsSUFBSSxDQUFDRCxPQUFELEVBQVMsd0JBQVQsQ0FBSjs7QUFFQSxRQUFNUyxFQUFFLEdBQUdQLE9BQU8sQ0FBQyxJQUFELENBQWxCLENBSmlFLENBS2pFO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUEsUUFBTVEsTUFBTSxHQUFHO0FBQ2JDLElBQUFBLFNBQVMsRUFBRSxLQURFO0FBRWJILElBQUFBLE9BRmE7QUFHYkksSUFBQUEsUUFBUSxFQUFFTCxRQUhHO0FBSWIsaUJBQWEsQ0FDWCxXQURXLEVBRVgsc0JBRlcsQ0FKQTtBQVFiLGdCQUFZO0FBQ1YsYUFBTyxDQUNMLDRCQURLLEVBRUwsVUFGSztBQURHLEtBUkM7QUFjYk0sSUFBQUEsTUFBTSxFQUFFO0FBQ05DLE1BQUFBLElBQUksRUFBRSxHQURBO0FBRU5DLE1BQUFBLFNBQVMsRUFBRTtBQUNUQyxRQUFBQSxJQUFJLEVBQUUsYUFERztBQUVUQyxRQUFBQSxNQUFNLEVBQUU7QUFGQztBQUZMLEtBZEssQ0F1QmY7O0FBdkJlLEdBQWY7O0FBd0JBLE1BQUlSLEVBQUUsQ0FBQ1MsVUFBSCxDQUFjWixLQUFkLENBQUosRUFBMEI7QUFDdEIsVUFBTWEsV0FBVyxHQUFHQyxLQUFLLENBQUNDLElBQU4sQ0FBV0wsSUFBSSxDQUFDTSxJQUFMLENBQVVoQixLQUFWLEVBQWlCLGNBQWpCLENBQVgsQ0FBcEI7QUFDQUksSUFBQUEsTUFBTSxDQUFDSixLQUFQLEdBQWVhLFdBQVcsQ0FBQ0ksSUFBM0I7QUFDQWIsSUFBQUEsTUFBTSxDQUFDSCxRQUFQLENBQWdCaUIsR0FBaEIsQ0FBb0JDLElBQXBCLENBQXlCVCxJQUFJLENBQUNVLE9BQUwsQ0FBYXBCLEtBQWIsQ0FBekI7QUFDSCxHQUpELE1BSU87QUFDSEksSUFBQUEsTUFBTSxDQUFDSixLQUFQLEdBQWVBLEtBQWY7QUFDSDs7QUFDRCxTQUFPcUIsSUFBSSxDQUFDQyxTQUFMLENBQWVsQixNQUFmLEVBQXVCLElBQXZCLEVBQTZCLENBQTdCLENBQVA7QUFDRDs7QUFFTSxTQUFTbUIsc0JBQVQsQ0FBZ0M3QixPQUFoQyxFQUF5QztBQUM5QyxRQUFNQyxJQUFJLEdBQUdDLE9BQU8sQ0FBQyxjQUFELENBQVAsQ0FBd0JELElBQXJDOztBQUNBQSxFQUFBQSxJQUFJLENBQUNELE9BQUQsRUFBUyxpQ0FBVCxDQUFKO0FBRUEsU0FBTyxtQkFBUDtBQUNEOztBQUVNLFNBQVM4QixtQkFBVCxDQUE2QjlCLE9BQTdCLEVBQXNDO0FBQzNDLFFBQU1DLElBQUksR0FBR0MsT0FBTyxDQUFDLGNBQUQsQ0FBUCxDQUF3QkQsSUFBckM7O0FBQ0FBLEVBQUFBLElBQUksQ0FBQ0QsT0FBRCxFQUFTLDhCQUFULENBQUosQ0FGMkMsQ0FJM0M7O0FBRUEsUUFBTVUsTUFBTSxHQUFHO0FBQ2Isa0JBQWM7QUFDWixhQUFPO0FBREssS0FERDtBQUliLGdCQUFZO0FBQ1YsYUFBTyxDQUNMLGdDQUFnQ1YsT0FBTyxDQUFDVyxTQUF4QyxHQUFvRCxXQUQvQyxFQUVMLDZDQUZLLENBREc7QUFLVixpQkFBVztBQUxEO0FBSkMsR0FBZjtBQVlBLFNBQU9nQixJQUFJLENBQUNDLFNBQUwsQ0FBZWxCLE1BQWYsRUFBdUIsSUFBdkIsRUFBNkIsQ0FBN0IsQ0FBUDtBQUNEIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNvbnN0IGJ1aWxkWE1MID0gZnVuY3Rpb24oY29tcHJlc3MsIG9wdGlvbnMpIHtcbiAgY29uc3QgbG9ndiA9IHJlcXVpcmUoJy4vcGx1Z2luVXRpbCcpLmxvZ3ZcbiAgbG9ndihvcHRpb25zLCdGVU5DVElPTiBidWlsZFhNTCcpXG5cbiAgbGV0IGNvbXByZXNzaW9uID0gJydcblxuICBpZiAoY29tcHJlc3MpIHtcbiAgICBjb21wcmVzc2lvbiA9IGBcbiAgICAgIHRoZW4gXG4gICAgICBmcyBcbiAgICAgIG1pbmlmeSBcbiAgICAgICAgLXl1aSBcbiAgICAgICAgLWZyb209ZXh0LmpzIFxuICAgICAgICAtdG89ZXh0LmpzXG4gICAgYDtcbiAgfVxuXG4gICAgcmV0dXJuIGA8cHJvamVjdCBuYW1lPVwic2ltcGxlLWJ1aWxkXCIgYmFzZWRpcj1cIi5cIj5cbiAgPCEtLSAgaW50ZXJuYWxseSwgd2F0Y2ggY2FsbHMgdGhlIGluaXQgdGFyZ2V0LCBzbyBuZWVkIHRvIGhhdmUgb25lIGhlcmUgLS0+XG4gIDx0YXJnZXQgbmFtZT1cImluaXRcIi8+XG4gIDx0YXJnZXQgbmFtZT1cImluaXQtY21kXCI+XG4gICAgPHRhc2tkZWYgIHJlc291cmNlPVwiY29tL3NlbmNoYS9hbnQvYW50bGliLnhtbFwiXG4gICAgICAgICAgICAgIGNsYXNzcGF0aD1cIlxcJHtjbWQuZGlyfS9zZW5jaGEuamFyXCJcbiAgICAgICAgICAgICAgbG9hZGVycmVmPVwic2VuY2hhbG9hZGVyXCIvPlxuICAgIDx4LWV4dGVuZC1jbGFzc3BhdGg+XG4gICAgICAgIDxqYXIgcGF0aD1cIlxcJHtjbWQuZGlyfS9zZW5jaGEuamFyXCIvPlxuICAgIDwveC1leHRlbmQtY2xhc3NwYXRoPlxuICAgIDx4LXNlbmNoYS1pbml0IHByZWZpeD1cIlwiLz5cbiAgICA8eC1jb21waWxlIHJlZmlkPVwidGhlQ29tcGlsZXJcIlxuICAgICAgICAgICAgICAgICAgICAgIGRpcj1cIlxcJHtiYXNlZGlyfVwiXG4gICAgICAgICAgICAgICAgICAgICAgaW5pdE9ubHk9XCJ0cnVlXCJcbiAgICAgICAgICAgICAgICAgICAgICBpbmhlcml0QWxsPVwidHJ1ZVwiPlxuICAgICAgICAgICAgICA8IVtDREFUQVtcbiAgICAgICAgICAgICAgLWNsYXNzcGF0aD1cXCR7YmFzZWRpcn0vbWFuaWZlc3QuanNcbiAgICAgICAgICAgICAgbG9hZC1hcHBcbiAgICAgICAgICAgICAgICAgIC10ZW1wPVxcJHtiYXNlZGlyfS90ZW1wXG4gICAgICAgICAgICAgICAgICAtdGFnPUFwcFxuICAgICAgICBdXT5cbiAgICAgIDwveC1jb21waWxlPlxuICA8L3RhcmdldD5cbiAgPHRhcmdldCBuYW1lPVwicmVidWlsZFwiPlxuICAgIDx4LWNvbXBpbGUgcmVmaWQ9XCJ0aGVDb21waWxlclwiXG4gICAgICAgICAgICAgIGRpcj1cIlxcJHtiYXNlZGlyfVwiXG4gICAgICAgICAgICAgIGluaGVyaXRBbGw9XCJ0cnVlXCI+XG4gICAgICA8IVtDREFUQVtcbiAgICAgIC0tZGVidWdcbiAgICAgIGV4Y2x1ZGVcbiAgICAgIC1hbGxcbiAgICAgIGFuZFxuICAgICAgaW5jbHVkZVxuICAgICAgLWY9Qm9vdC5qc1xuICAgICAgYW5kXG4gICAgICBjb25jYXRlbmF0ZVxuICAgICAgICAgIGV4dC5qc1xuICAgICAgYW5kXG4gICAgICBleGNsdWRlXG4gICAgICAtYWxsXG4gICAgICBhbmRcbiAgICAgICMgaW5jbHVkZSB0aGVtZSBvdmVycmlkZXNcbiAgICAgIGluY2x1ZGVcbiAgICAgICAgLXJcbiAgICAgICAgLXRhZz1vdmVycmlkZXNcbiAgICAgIGFuZFxuICAgICAgIyBpbmNsdWRlIGFsbCBqcyBmaWxlcyBuZWVkZWQgZm9yIG1hbmlmZXN0LmpzXG4gICAgICBpbmNsdWRlXG4gICAgICAgICAgLXJcbiAgICAgICAgICAtZj1tYW5pZmVzdC5qc1xuICAgICAgYW5kXG4gICAgICAjIGV4Y2x1ZGUgdGhlIGdlbmVyYXRlZCBtYW5pZmVzdCBmaWxlIGl0c2VsZixcbiAgICAgICMgc2luY2Ugd2UgZG9uJ3Qgd2FudCB0aGUgZ2VuZXJhdGVkIGJ1bmRsZSBmaWxlIHRvIGNyZWF0ZSBhbnkgY29tcG9uZW50c1xuICAgICAgZXhjbHVkZVxuICAgICAgLWY9bWFuaWZlc3QuanNcbiAgICAgIGFuZFxuICAgICAgY29uY2F0ZW5hdGVcbiAgICAgICthcHBlbmRcbiAgICAgICAgICBleHQuanNcbiAgICAgIGFuZFxuICAgICAgc2Nzc1xuICAgICAgICAgIC1hcHBOYW1lPUFwcFxuICAgICAgICAgIC1pbWFnZVNlYXJjaFBhdGg9cmVzb3VyY2VzXG4gICAgICAgICAgLXRoZW1lTmFtZT10cml0b25cbiAgICAgICAgICAtcmVzb3VyY2VNYXBCYXNlPS5cbiAgICAgICAgICAtb3V0cHV0PWV4dC5zY3NzXG4gICAgICBhbmRcbiAgICAgIHJlc291cmNlc1xuICAgICAgICAgIC1leGNsdWRlcz0tYWxsKi5jc3NcbiAgICAgICAgICAtb3V0PXJlc291cmNlc1xuICAgICAgYW5kXG4gICAgICByZXNvdXJjZXNcbiAgICAgICAgICAtbW9kZWw9dHJ1ZVxuICAgICAgICAgIC1vdXQ9cmVzb3VyY2VzXG4gICAgICBdXT5cbiAgICA8L3gtY29tcGlsZT5cbiAgPC90YXJnZXQ+XG4gIDx0YXJnZXQgbmFtZT1cImJ1aWxkXCIgZGVwZW5kcz1cImluaXQtY21kLHJlYnVpbGRcIj5cbiAgICA8eC1zZW5jaGEtY29tbWFuZCBkaXI9XCJcXCR7YmFzZWRpcn1cIj5cbiAgICAgIDwhW0NEQVRBW1xuICAgICAgZmFzaGlvblxuICAgICAgICAgIC1wd2Q9LlxuICAgICAgICAgIC1zcGxpdD00MDk1XG4gICAgICAgICAgJHtjb21wcmVzcyA/ICctY29tcHJlc3MnIDogJyd9XG4gICAgICAgICAgICAgIGV4dC5zY3NzXG4gICAgICAgICAgZXh0LmNzc1xuICAgICAgJHtjb21wcmVzc2lvbn1cbiAgICAgIF1dPlxuICAgIDwveC1zZW5jaGEtY29tbWFuZD5cbiAgPC90YXJnZXQ+XG4gIDx0YXJnZXQgbmFtZT1cIndhdGNoXCIgZGVwZW5kcz1cImluaXQtY21kLGJ1aWxkXCI+XG4gICAgPHgtZmFzaGlvbi13YXRjaFxuICAgICAgcmVmTmFtZT1cImZhc2hpb24td2F0Y2hcIlxuICAgICAgaW5wdXRGaWxlPVwiZXh0LnNjc3NcIlxuICAgICAgb3V0cHV0RmlsZT1cImV4dC5jc3NcIlxuICAgICAgc3BsaXQ9XCI0MDk1XCJcbiAgICAgIGNvbXByZXNzPVwiJHtjb21wcmVzcyA/ICd0cnVlJyA6ICdmYWxzZSd9XCJcbiAgICAgIGNvbmZpZ0ZpbGU9XCJhcHAuanNvblwiXG4gICAgICBmb3JrPVwidHJ1ZVwiLz5cbiAgICA8eC13YXRjaCBjb21waWxlclJlZj1cInRoZUNvbXBpbGVyXCIgdGFyZ2V0cz1cInJlYnVpbGRcIi8+XG4gIDwvdGFyZ2V0PlxuPC9wcm9qZWN0PlxuYC50cmltKClcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUFwcEpzb24oIHRoZW1lLCBwYWNrYWdlcywgdG9vbGtpdCwgb3B0aW9ucyApIHtcbiAgY29uc3QgbG9ndiA9IHJlcXVpcmUoJy4vcGx1Z2luVXRpbCcpLmxvZ3ZcbiAgbG9ndihvcHRpb25zLCdGVU5DVElPTiBjcmVhdGVBcHBKc29uJylcblxuICBjb25zdCBmcyA9IHJlcXVpcmUoJ2ZzJylcbiAgLy9jb25zdCBwYXRoID0gcmVxdWlyZSgncGF0aCcpXG4gIC8vY29uc3QgY2pzb24gPSByZXF1aXJlKCdjanNvbicpXG5cblxuICAvLyBvdmVycmlkZXM6IG92ZXJyaWRlcy5tYXAoZGlyID0+IHBhdGgucmVzb2x2ZShkaXIpKS5jb25jYXQoJ2pzZG9tLWVudmlyb25tZW50LmpzJyksXG4gIC8vIHBhY2thZ2VzOiB7XG4gIC8vICAgZGlyOiBwYWNrYWdlRGlycy5tYXAoZGlyID0+IHBhdGgucmVzb2x2ZShkaXIpKVxuICAvLyB9LFxuXG4gIGNvbnN0IGNvbmZpZyA9IHtcbiAgICBmcmFtZXdvcms6IFwiZXh0XCIsXG4gICAgdG9vbGtpdCxcbiAgICByZXF1aXJlczogcGFja2FnZXMsXG4gICAgXCJvdmVycmlkZXNcIjogW1xuICAgICAgXCJvdmVycmlkZXNcIixcbiAgICAgIFwianNkb20tZW52aXJvbm1lbnQuanNcIlxuICAgIF0sXG4gICAgXCJwYWNrYWdlc1wiOiB7XG4gICAgICBcImRpclwiOiBbXG4gICAgICAgIFwiLi4vLi4vbm9kZV9tb2R1bGVzL0BzZW5jaGFcIixcbiAgICAgICAgXCJwYWNrYWdlc1wiXG4gICAgICBdXG4gICAgfSxcbiAgICBvdXRwdXQ6IHtcbiAgICAgIGJhc2U6ICcuJyxcbiAgICAgIHJlc291cmNlczoge1xuICAgICAgICBwYXRoOiAnLi9yZXNvdXJjZXMnLFxuICAgICAgICBzaGFyZWQ6IFwiLi9yZXNvdXJjZXNcIlxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vIGlmIHRoZW1lIGlzIGxvY2FsIGFkZCBpdCBhcyBhbiBhZGRpdGlvbmFsIHBhY2thZ2UgZGlyXG4gIGlmIChmcy5leGlzdHNTeW5jKHRoZW1lKSkge1xuICAgICAgY29uc3QgcGFja2FnZUluZm8gPSBjanNvbi5sb2FkKHBhdGguam9pbih0aGVtZSwgJ3BhY2thZ2UuanNvbicpKTtcbiAgICAgIGNvbmZpZy50aGVtZSA9IHBhY2thZ2VJbmZvLm5hbWU7XG4gICAgICBjb25maWcucGFja2FnZXMuZGlyLnB1c2gocGF0aC5yZXNvbHZlKHRoZW1lKSk7XG4gIH0gZWxzZSB7XG4gICAgICBjb25maWcudGhlbWUgPSB0aGVtZTtcbiAgfVxuICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoY29uZmlnLCBudWxsLCAyKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlSlNET01FbnZpcm9ubWVudChvcHRpb25zKSB7XG4gIGNvbnN0IGxvZ3YgPSByZXF1aXJlKCcuL3BsdWdpblV0aWwnKS5sb2d2XG4gIGxvZ3Yob3B0aW9ucywnRlVOQ1RJT04gY3JlYXRlSlNET01FbnZpcm9ubWVudCcpXG5cbiAgcmV0dXJuICd3aW5kb3cuRXh0ID0gRXh0Oydcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVdvcmtzcGFjZUpzb24ob3B0aW9ucykge1xuICBjb25zdCBsb2d2ID0gcmVxdWlyZSgnLi9wbHVnaW5VdGlsJykubG9ndlxuICBsb2d2KG9wdGlvbnMsJ0ZVTkNUSU9OIGNyZWF0ZVdvcmtzcGFjZUpzb24nKVxuXG4gIC8vXCJkaXJcIjogWycke3dvcmtzcGFjZS5kaXJ9L3BhY2thZ2VzL2xvY2FsJywnJHt3b3Jrc3BhY2UuZGlyfS9wYWNrYWdlcyddLmNvbmNhdChwYWNrYWdlcykuam9pbignLCcpLFxuXG4gIGNvbnN0IGNvbmZpZyA9IHtcbiAgICBcImZyYW1ld29ya3NcIjoge1xuICAgICAgXCJleHRcIjogXCIuLi8uLi9ub2RlX21vZHVsZXMvQHNlbmNoYS9leHRcIlxuICAgIH0sXG4gICAgXCJwYWNrYWdlc1wiOiB7XG4gICAgICBcImRpclwiOiBbXG4gICAgICAgIFwiJHt3b3Jrc3BhY2UuZGlyfS8uLi8uLi9leHQtXCIgKyBvcHRpb25zLmZyYW1ld29yayArIFwiL3BhY2thZ2VzXCIsXG4gICAgICAgIFwiJHt3b3Jrc3BhY2UuZGlyfS8uLi8uLi9ub2RlX21vZHVsZXMvQHNlbmNoYVwiXG4gICAgICBdLFxuICAgICAgXCJleHRyYWN0XCI6IFwiJHt3b3Jrc3BhY2UuZGlyfS9wYWNrYWdlcy9yZW1vdGVcIlxuICAgIH1cbiAgfVxuICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoY29uZmlnLCBudWxsLCAyKVxufSJdfQ==