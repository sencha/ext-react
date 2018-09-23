"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createAppJson = createAppJson;
exports.createJSDOMEnvironment = createJSDOMEnvironment;
exports.createWorkspaceJson = createWorkspaceJson;
exports.buildXML = void 0;

var _path = _interopRequireDefault(require("path"));

var _fs = _interopRequireDefault(require("fs"));

var _cjson = _interopRequireDefault(require("cjson"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

function createAppJson(theme, packages, toolkit) {
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

  if (_fs.default.existsSync(theme)) {
    const packageInfo = _cjson.default.load(_path.default.join(theme, 'package.json'));

    config.theme = packageInfo.name;
    config.packages.dir.push(_path.default.resolve(theme));
  } else {
    config.theme = theme;
  }

  return JSON.stringify(config, null, 2);
}

function createJSDOMEnvironment() {
  return 'window.Ext = Ext;';
}

function createWorkspaceJson() {
  //"dir": ['${workspace.dir}/packages/local','${workspace.dir}/packages'].concat(packages).join(','),
  const config = {
    "frameworks": {
      "ext": "../../node_modules/@sencha/ext"
    },
    "packages": {
      "dir": ["${workspace.dir}/packages", "${workspace.dir}/../../node_modules/@esencha"],
      "extract": "${workspace.dir}/packages/remote"
    }
  };
  return JSON.stringify(config, null, 2); // return JSON.stringify(
  // {
  //   "frameworks": {
  //     "ext": "../../node_modules/@sencha/ext"
  //   },
  //   "packages": {
  //     "dir": [
  //       "${workspace.dir}/packages/local",
  //       "${workspace.dir}/packages",
  //       "../../node_modules/@esencha"
  //     ],
  //     "extract": "${workspace.dir}/packages/remote"
  //   }
  // }
  // , null, 2);
  // return JSON.stringify({
  //   "frameworks": {
  //     "ext": path.relative(output, sdk)
  //   },
  //   "packages": {
  //     "dir": [
  //       '${workspace.dir}/packages/local',
  //       '${workspace.dir}/packages',
  //       '../../node_modules/@sencha'
  //     ],
  //     "extract": "${workspace.dir}/packages/remote"
  //   }
  // }
  // , null, 2);
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9hcnRpZmFjdHMuanMiXSwibmFtZXMiOlsiYnVpbGRYTUwiLCJjb21wcmVzcyIsImNvbXByZXNzaW9uIiwidHJpbSIsImNyZWF0ZUFwcEpzb24iLCJ0aGVtZSIsInBhY2thZ2VzIiwidG9vbGtpdCIsImNvbmZpZyIsImZyYW1ld29yayIsInJlcXVpcmVzIiwib3V0cHV0IiwiYmFzZSIsInJlc291cmNlcyIsInBhdGgiLCJzaGFyZWQiLCJmcyIsImV4aXN0c1N5bmMiLCJwYWNrYWdlSW5mbyIsImNqc29uIiwibG9hZCIsImpvaW4iLCJuYW1lIiwiZGlyIiwicHVzaCIsInJlc29sdmUiLCJKU09OIiwic3RyaW5naWZ5IiwiY3JlYXRlSlNET01FbnZpcm9ubWVudCIsImNyZWF0ZVdvcmtzcGFjZUpzb24iXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7QUFFTyxNQUFNQSxRQUFRLEdBQUcsVUFBUztBQUFFQyxFQUFBQTtBQUFGLENBQVQsRUFBdUI7QUFDN0MsTUFBSUMsV0FBVyxHQUFHLEVBQWxCOztBQUVBLE1BQUlELFFBQUosRUFBYztBQUNaQyxJQUFBQSxXQUFXLEdBQUk7Ozs7Ozs7S0FBZjtBQVFEOztBQUVDLFNBQVE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1lBbUZBRCxRQUFRLEdBQUcsV0FBSCxHQUFpQixFQUFHOzs7UUFHaENDLFdBQVk7Ozs7Ozs7Ozs7a0JBVUZELFFBQVEsR0FBRyxNQUFILEdBQVksT0FBUTs7Ozs7O0NBaEduQyxDQXNHVEUsSUF0R1MsRUFBUDtBQXVHSCxDQXJITTtBQXVIUDs7Ozs7Ozs7O0FBS08sU0FBU0MsYUFBVCxDQUF3QkMsS0FBeEIsRUFBK0JDLFFBQS9CLEVBQXlDQyxPQUF6QyxFQUFtRDtBQUN4RDtBQUNBO0FBQ0E7QUFDQTtBQUVBLFFBQU1DLE1BQU0sR0FBRztBQUNiQyxJQUFBQSxTQUFTLEVBQUUsS0FERTtBQUViRixJQUFBQSxPQUZhO0FBR2JHLElBQUFBLFFBQVEsRUFBRUosUUFIRztBQUliLGlCQUFhLENBQ1gsV0FEVyxFQUVYLHNCQUZXLENBSkE7QUFRYixnQkFBWTtBQUNWLGFBQU8sQ0FDTCw0QkFESyxFQUVMLFVBRks7QUFERyxLQVJDO0FBY2JLLElBQUFBLE1BQU0sRUFBRTtBQUNOQyxNQUFBQSxJQUFJLEVBQUUsR0FEQTtBQUVOQyxNQUFBQSxTQUFTLEVBQUU7QUFDVEMsUUFBQUEsSUFBSSxFQUFFLGFBREc7QUFFVEMsUUFBQUEsTUFBTSxFQUFFO0FBRkM7QUFGTCxLQWRLLENBdUJmOztBQXZCZSxHQUFmOztBQXdCQSxNQUFJQyxZQUFHQyxVQUFILENBQWNaLEtBQWQsQ0FBSixFQUEwQjtBQUN0QixVQUFNYSxXQUFXLEdBQUdDLGVBQU1DLElBQU4sQ0FBV04sY0FBS08sSUFBTCxDQUFVaEIsS0FBVixFQUFpQixjQUFqQixDQUFYLENBQXBCOztBQUNBRyxJQUFBQSxNQUFNLENBQUNILEtBQVAsR0FBZWEsV0FBVyxDQUFDSSxJQUEzQjtBQUNBZCxJQUFBQSxNQUFNLENBQUNGLFFBQVAsQ0FBZ0JpQixHQUFoQixDQUFvQkMsSUFBcEIsQ0FBeUJWLGNBQUtXLE9BQUwsQ0FBYXBCLEtBQWIsQ0FBekI7QUFDSCxHQUpELE1BSU87QUFDSEcsSUFBQUEsTUFBTSxDQUFDSCxLQUFQLEdBQWVBLEtBQWY7QUFDSDs7QUFDRCxTQUFPcUIsSUFBSSxDQUFDQyxTQUFMLENBQWVuQixNQUFmLEVBQXVCLElBQXZCLEVBQTZCLENBQTdCLENBQVA7QUFDRDs7QUFFTSxTQUFTb0Isc0JBQVQsR0FBa0M7QUFDdkMsU0FBTyxtQkFBUDtBQUNEOztBQUVNLFNBQVNDLG1CQUFULEdBQStCO0FBQ3BDO0FBRUEsUUFBTXJCLE1BQU0sR0FBRztBQUNiLGtCQUFjO0FBQ1osYUFBTztBQURLLEtBREQ7QUFJYixnQkFBWTtBQUNWLGFBQU8sQ0FDTCwyQkFESyxFQUVMLDhDQUZLLENBREc7QUFLVixpQkFBVztBQUxEO0FBSkMsR0FBZjtBQVlBLFNBQU9rQixJQUFJLENBQUNDLFNBQUwsQ0FBZW5CLE1BQWYsRUFBdUIsSUFBdkIsRUFBNkIsQ0FBN0IsQ0FBUCxDQWZvQyxDQWlCcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNEIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCBmcyBmcm9tICdmcyc7XG5pbXBvcnQgY2pzb24gZnJvbSAnY2pzb24nO1xuXG5leHBvcnQgY29uc3QgYnVpbGRYTUwgPSBmdW5jdGlvbih7IGNvbXByZXNzIH0pIHtcbiAgbGV0IGNvbXByZXNzaW9uID0gJyc7XG5cbiAgaWYgKGNvbXByZXNzKSB7XG4gICAgY29tcHJlc3Npb24gPSBgXG4gICAgICB0aGVuIFxuICAgICAgZnMgXG4gICAgICBtaW5pZnkgXG4gICAgICAgIC15dWkgXG4gICAgICAgIC1mcm9tPWV4dC5qcyBcbiAgICAgICAgLXRvPWV4dC5qc1xuICAgIGA7XG4gIH1cblxuICAgIHJldHVybiBgPHByb2plY3QgbmFtZT1cInNpbXBsZS1idWlsZFwiIGJhc2VkaXI9XCIuXCI+XG4gIDwhLS0gIGludGVybmFsbHksIHdhdGNoIGNhbGxzIHRoZSBpbml0IHRhcmdldCwgc28gbmVlZCB0byBoYXZlIG9uZSBoZXJlIC0tPlxuICA8dGFyZ2V0IG5hbWU9XCJpbml0XCIvPlxuICA8dGFyZ2V0IG5hbWU9XCJpbml0LWNtZFwiPlxuICAgIDx0YXNrZGVmICByZXNvdXJjZT1cImNvbS9zZW5jaGEvYW50L2FudGxpYi54bWxcIlxuICAgICAgICAgICAgICBjbGFzc3BhdGg9XCJcXCR7Y21kLmRpcn0vc2VuY2hhLmphclwiXG4gICAgICAgICAgICAgIGxvYWRlcnJlZj1cInNlbmNoYWxvYWRlclwiLz5cbiAgICA8eC1leHRlbmQtY2xhc3NwYXRoPlxuICAgICAgICA8amFyIHBhdGg9XCJcXCR7Y21kLmRpcn0vc2VuY2hhLmphclwiLz5cbiAgICA8L3gtZXh0ZW5kLWNsYXNzcGF0aD5cbiAgICA8eC1zZW5jaGEtaW5pdCBwcmVmaXg9XCJcIi8+XG4gICAgPHgtY29tcGlsZSByZWZpZD1cInRoZUNvbXBpbGVyXCJcbiAgICAgICAgICAgICAgICAgICAgICBkaXI9XCJcXCR7YmFzZWRpcn1cIlxuICAgICAgICAgICAgICAgICAgICAgIGluaXRPbmx5PVwidHJ1ZVwiXG4gICAgICAgICAgICAgICAgICAgICAgaW5oZXJpdEFsbD1cInRydWVcIj5cbiAgICAgICAgICAgICAgPCFbQ0RBVEFbXG4gICAgICAgICAgICAgIC1jbGFzc3BhdGg9XFwke2Jhc2VkaXJ9L21hbmlmZXN0LmpzXG4gICAgICAgICAgICAgIGxvYWQtYXBwXG4gICAgICAgICAgICAgICAgICAtdGVtcD1cXCR7YmFzZWRpcn0vdGVtcFxuICAgICAgICAgICAgICAgICAgLXRhZz1BcHBcbiAgICAgICAgXV0+XG4gICAgICA8L3gtY29tcGlsZT5cbiAgPC90YXJnZXQ+XG4gIDx0YXJnZXQgbmFtZT1cInJlYnVpbGRcIj5cbiAgICA8eC1jb21waWxlIHJlZmlkPVwidGhlQ29tcGlsZXJcIlxuICAgICAgICAgICAgICBkaXI9XCJcXCR7YmFzZWRpcn1cIlxuICAgICAgICAgICAgICBpbmhlcml0QWxsPVwidHJ1ZVwiPlxuICAgICAgPCFbQ0RBVEFbXG4gICAgICAtLWRlYnVnXG4gICAgICBleGNsdWRlXG4gICAgICAtYWxsXG4gICAgICBhbmRcbiAgICAgIGluY2x1ZGVcbiAgICAgIC1mPUJvb3QuanNcbiAgICAgIGFuZFxuICAgICAgY29uY2F0ZW5hdGVcbiAgICAgICAgICBleHQuanNcbiAgICAgIGFuZFxuICAgICAgZXhjbHVkZVxuICAgICAgLWFsbFxuICAgICAgYW5kXG4gICAgICAjIGluY2x1ZGUgdGhlbWUgb3ZlcnJpZGVzXG4gICAgICBpbmNsdWRlXG4gICAgICAgIC1yXG4gICAgICAgIC10YWc9b3ZlcnJpZGVzXG4gICAgICBhbmRcbiAgICAgICMgaW5jbHVkZSBhbGwganMgZmlsZXMgbmVlZGVkIGZvciBtYW5pZmVzdC5qc1xuICAgICAgaW5jbHVkZVxuICAgICAgICAgIC1yXG4gICAgICAgICAgLWY9bWFuaWZlc3QuanNcbiAgICAgIGFuZFxuICAgICAgIyBleGNsdWRlIHRoZSBnZW5lcmF0ZWQgbWFuaWZlc3QgZmlsZSBpdHNlbGYsXG4gICAgICAjIHNpbmNlIHdlIGRvbid0IHdhbnQgdGhlIGdlbmVyYXRlZCBidW5kbGUgZmlsZSB0byBjcmVhdGUgYW55IGNvbXBvbmVudHNcbiAgICAgIGV4Y2x1ZGVcbiAgICAgIC1mPW1hbmlmZXN0LmpzXG4gICAgICBhbmRcbiAgICAgIGNvbmNhdGVuYXRlXG4gICAgICArYXBwZW5kXG4gICAgICAgICAgZXh0LmpzXG4gICAgICBhbmRcbiAgICAgIHNjc3NcbiAgICAgICAgICAtYXBwTmFtZT1BcHBcbiAgICAgICAgICAtaW1hZ2VTZWFyY2hQYXRoPXJlc291cmNlc1xuICAgICAgICAgIC10aGVtZU5hbWU9dHJpdG9uXG4gICAgICAgICAgLXJlc291cmNlTWFwQmFzZT0uXG4gICAgICAgICAgLW91dHB1dD1leHQuc2Nzc1xuICAgICAgYW5kXG4gICAgICByZXNvdXJjZXNcbiAgICAgICAgICAtZXhjbHVkZXM9LWFsbCouY3NzXG4gICAgICAgICAgLW91dD1yZXNvdXJjZXNcbiAgICAgIGFuZFxuICAgICAgcmVzb3VyY2VzXG4gICAgICAgICAgLW1vZGVsPXRydWVcbiAgICAgICAgICAtb3V0PXJlc291cmNlc1xuICAgICAgXV0+XG4gICAgPC94LWNvbXBpbGU+XG4gIDwvdGFyZ2V0PlxuICA8dGFyZ2V0IG5hbWU9XCJidWlsZFwiIGRlcGVuZHM9XCJpbml0LWNtZCxyZWJ1aWxkXCI+XG4gICAgPHgtc2VuY2hhLWNvbW1hbmQgZGlyPVwiXFwke2Jhc2VkaXJ9XCI+XG4gICAgICA8IVtDREFUQVtcbiAgICAgIGZhc2hpb25cbiAgICAgICAgICAtcHdkPS5cbiAgICAgICAgICAtc3BsaXQ9NDA5NVxuICAgICAgICAgICR7Y29tcHJlc3MgPyAnLWNvbXByZXNzJyA6ICcnfVxuICAgICAgICAgICAgICBleHQuc2Nzc1xuICAgICAgICAgIGV4dC5jc3NcbiAgICAgICR7Y29tcHJlc3Npb259XG4gICAgICBdXT5cbiAgICA8L3gtc2VuY2hhLWNvbW1hbmQ+XG4gIDwvdGFyZ2V0PlxuICA8dGFyZ2V0IG5hbWU9XCJ3YXRjaFwiIGRlcGVuZHM9XCJpbml0LWNtZCxidWlsZFwiPlxuICAgIDx4LWZhc2hpb24td2F0Y2hcbiAgICAgIHJlZk5hbWU9XCJmYXNoaW9uLXdhdGNoXCJcbiAgICAgIGlucHV0RmlsZT1cImV4dC5zY3NzXCJcbiAgICAgIG91dHB1dEZpbGU9XCJleHQuY3NzXCJcbiAgICAgIHNwbGl0PVwiNDA5NVwiXG4gICAgICBjb21wcmVzcz1cIiR7Y29tcHJlc3MgPyAndHJ1ZScgOiAnZmFsc2UnfVwiXG4gICAgICBjb25maWdGaWxlPVwiYXBwLmpzb25cIlxuICAgICAgZm9yaz1cInRydWVcIi8+XG4gICAgPHgtd2F0Y2ggY29tcGlsZXJSZWY9XCJ0aGVDb21waWxlclwiIHRhcmdldHM9XCJyZWJ1aWxkXCIvPlxuICA8L3RhcmdldD5cbjwvcHJvamVjdD5cbmAudHJpbSgpO1xufTtcblxuLyoqXG4gKiBDcmVhdGVzIHRoZSBhcHAuanNvbiBmaWxlXG4gKiBAcGFyYW0ge1N0cmluZ30gdGhlbWUgVGhlIG5hbWUgb2YgdGhlIHRoZW1lIHRvIHVzZS5cbiAqIEBwYXJhbSB7U3RyaW5nW119IHBhY2thZ2VzIFRoZSBuYW1lcyBvZiBwYWNrYWdlcyB0byBpbmNsdWRlIGluIHRoZSBidWlsZFxuICovXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlQXBwSnNvbiggdGhlbWUsIHBhY2thZ2VzLCB0b29sa2l0ICkge1xuICAvLyBvdmVycmlkZXM6IG92ZXJyaWRlcy5tYXAoZGlyID0+IHBhdGgucmVzb2x2ZShkaXIpKS5jb25jYXQoJ2pzZG9tLWVudmlyb25tZW50LmpzJyksXG4gIC8vIHBhY2thZ2VzOiB7XG4gIC8vICAgZGlyOiBwYWNrYWdlRGlycy5tYXAoZGlyID0+IHBhdGgucmVzb2x2ZShkaXIpKVxuICAvLyB9LFxuXG4gIGNvbnN0IGNvbmZpZyA9IHtcbiAgICBmcmFtZXdvcms6IFwiZXh0XCIsXG4gICAgdG9vbGtpdCxcbiAgICByZXF1aXJlczogcGFja2FnZXMsXG4gICAgXCJvdmVycmlkZXNcIjogW1xuICAgICAgXCJvdmVycmlkZXNcIixcbiAgICAgIFwianNkb20tZW52aXJvbm1lbnQuanNcIlxuICAgIF0sXG4gICAgXCJwYWNrYWdlc1wiOiB7XG4gICAgICBcImRpclwiOiBbXG4gICAgICAgIFwiLi4vLi4vbm9kZV9tb2R1bGVzL0BzZW5jaGFcIixcbiAgICAgICAgXCJwYWNrYWdlc1wiXG4gICAgICBdXG4gICAgfSxcbiAgICBvdXRwdXQ6IHtcbiAgICAgIGJhc2U6ICcuJyxcbiAgICAgIHJlc291cmNlczoge1xuICAgICAgICBwYXRoOiAnLi9yZXNvdXJjZXMnLFxuICAgICAgICBzaGFyZWQ6IFwiLi9yZXNvdXJjZXNcIlxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vIGlmIHRoZW1lIGlzIGxvY2FsIGFkZCBpdCBhcyBhbiBhZGRpdGlvbmFsIHBhY2thZ2UgZGlyXG4gIGlmIChmcy5leGlzdHNTeW5jKHRoZW1lKSkge1xuICAgICAgY29uc3QgcGFja2FnZUluZm8gPSBjanNvbi5sb2FkKHBhdGguam9pbih0aGVtZSwgJ3BhY2thZ2UuanNvbicpKTtcbiAgICAgIGNvbmZpZy50aGVtZSA9IHBhY2thZ2VJbmZvLm5hbWU7XG4gICAgICBjb25maWcucGFja2FnZXMuZGlyLnB1c2gocGF0aC5yZXNvbHZlKHRoZW1lKSk7XG4gIH0gZWxzZSB7XG4gICAgICBjb25maWcudGhlbWUgPSB0aGVtZTtcbiAgfVxuICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoY29uZmlnLCBudWxsLCAyKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlSlNET01FbnZpcm9ubWVudCgpIHtcbiAgcmV0dXJuICd3aW5kb3cuRXh0ID0gRXh0Oyc7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVXb3Jrc3BhY2VKc29uKCkge1xuICAvL1wiZGlyXCI6IFsnJHt3b3Jrc3BhY2UuZGlyfS9wYWNrYWdlcy9sb2NhbCcsJyR7d29ya3NwYWNlLmRpcn0vcGFja2FnZXMnXS5jb25jYXQocGFja2FnZXMpLmpvaW4oJywnKSxcblxuICBjb25zdCBjb25maWcgPSB7XG4gICAgXCJmcmFtZXdvcmtzXCI6IHtcbiAgICAgIFwiZXh0XCI6IFwiLi4vLi4vbm9kZV9tb2R1bGVzL0BzZW5jaGEvZXh0XCJcbiAgICB9LFxuICAgIFwicGFja2FnZXNcIjoge1xuICAgICAgXCJkaXJcIjogW1xuICAgICAgICBcIiR7d29ya3NwYWNlLmRpcn0vcGFja2FnZXNcIixcbiAgICAgICAgXCIke3dvcmtzcGFjZS5kaXJ9Ly4uLy4uL25vZGVfbW9kdWxlcy9AZXNlbmNoYVwiXG4gICAgICBdLFxuICAgICAgXCJleHRyYWN0XCI6IFwiJHt3b3Jrc3BhY2UuZGlyfS9wYWNrYWdlcy9yZW1vdGVcIlxuICAgIH1cbiAgfVxuICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoY29uZmlnLCBudWxsLCAyKTtcblxuICAvLyByZXR1cm4gSlNPTi5zdHJpbmdpZnkoXG4gIC8vIHtcbiAgLy8gICBcImZyYW1ld29ya3NcIjoge1xuICAvLyAgICAgXCJleHRcIjogXCIuLi8uLi9ub2RlX21vZHVsZXMvQHNlbmNoYS9leHRcIlxuICAvLyAgIH0sXG4gIC8vICAgXCJwYWNrYWdlc1wiOiB7XG4gIC8vICAgICBcImRpclwiOiBbXG4gIC8vICAgICAgIFwiJHt3b3Jrc3BhY2UuZGlyfS9wYWNrYWdlcy9sb2NhbFwiLFxuICAvLyAgICAgICBcIiR7d29ya3NwYWNlLmRpcn0vcGFja2FnZXNcIixcbiAgLy8gICAgICAgXCIuLi8uLi9ub2RlX21vZHVsZXMvQGVzZW5jaGFcIlxuICAvLyAgICAgXSxcbiAgLy8gICAgIFwiZXh0cmFjdFwiOiBcIiR7d29ya3NwYWNlLmRpcn0vcGFja2FnZXMvcmVtb3RlXCJcbiAgLy8gICB9XG4gIC8vIH1cbiAgLy8gLCBudWxsLCAyKTtcblxuXG4gIC8vIHJldHVybiBKU09OLnN0cmluZ2lmeSh7XG4gIC8vICAgXCJmcmFtZXdvcmtzXCI6IHtcbiAgLy8gICAgIFwiZXh0XCI6IHBhdGgucmVsYXRpdmUob3V0cHV0LCBzZGspXG4gIC8vICAgfSxcbiAgLy8gICBcInBhY2thZ2VzXCI6IHtcbiAgLy8gICAgIFwiZGlyXCI6IFtcbiAgLy8gICAgICAgJyR7d29ya3NwYWNlLmRpcn0vcGFja2FnZXMvbG9jYWwnLFxuICAvLyAgICAgICAnJHt3b3Jrc3BhY2UuZGlyfS9wYWNrYWdlcycsXG4gIC8vICAgICAgICcuLi8uLi9ub2RlX21vZHVsZXMvQHNlbmNoYSdcbiAgLy8gICAgIF0sXG4gIC8vICAgICBcImV4dHJhY3RcIjogXCIke3dvcmtzcGFjZS5kaXJ9L3BhY2thZ2VzL3JlbW90ZVwiXG4gIC8vICAgfVxuICAvLyB9XG4gIC8vICwgbnVsbCwgMik7XG59XG4iXX0=