"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.buildXML = undefined;
exports.createAppJson = createAppJson;
exports.createJSDOMEnvironment = createJSDOMEnvironment;
exports.createWorkspaceJson = createWorkspaceJson;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _cjson = require('cjson');

var _cjson2 = _interopRequireDefault(_cjson);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var buildXML = exports.buildXML = function buildXML(_ref) {
    var compress = _ref.compress;

    var compression = '';

    if (compress) {
        compression = '\n            then \n            fs \n            minify \n                -yui \n                -from=ext.js \n                -to=ext.js\n        ';
    }

    return ('\n        <project name="simple-build" basedir=".">\n            <!--  internally, watch calls the init target, so need to have one here -->\n            <target name="init"/>\n            <target name="init-cmd">\n                <taskdef resource="com/sencha/ant/antlib.xml"\n                                classpath="${cmd.dir}/sencha.jar"\n                                loaderref="senchaloader"/>\n                <x-extend-classpath>\n                    <jar path="${cmd.dir}/sencha.jar"/>\n                </x-extend-classpath>\n                <x-sencha-init prefix=""/>\n                <x-compile refid="theCompiler"\n                                 dir="${basedir}"\n                                 initOnly="true"\n                                 inheritAll="true">\n                          <![CDATA[\n                          -classpath=${basedir}/manifest.js\n                          load-app\n                              -temp=${basedir}/temp\n                              -tag=App\n                    ]]>\n                  </x-compile>\n            </target>\n            <target name="rebuild">\n               <x-compile refid="theCompiler"\n                          dir="${basedir}"\n                          inheritAll="true">\n                  <![CDATA[\n                  --debug\n                  exclude\n                  -all\n                  and\n                  include\n                  -f=Boot.js\n                  and\n                  concatenate\n                      ext.js\n                  and\n                  exclude\n                  -all\n                  and\n                  # include theme overrides\n                  include\n                    -r\n                    -tag=overrides\n                  and\n                  # include all js files needed for manifest.js\n                  include\n                      -r\n                      -f=manifest.js\n                  and\n                  # exclude the generated manifest file itself,\n                  # since we don\'t want the generated bundle file to create any components\n                  exclude\n                  -f=manifest.js\n                  and\n                  concatenate\n                  +append\n                      ext.js\n                  and\n                  scss\n                      -appName=App\n                      -imageSearchPath=resources\n                      -themeName=triton\n                      -resourceMapBase=.\n                      -output=ext.scss\n                  and\n                  resources\n                      -excludes=-all*.css\n                      -out=resources\n                  and\n                  resources\n                      -model=true\n                      -out=resources\n                  ]]>\n               </x-compile>\n            </target>\n            <target name="build" depends="init-cmd,rebuild">\n               <x-sencha-command dir="${basedir}">\n                   <![CDATA[\n                   fashion\n                       -pwd=.\n                       -split=4095\n                       ' + (compress ? '-compress' : '') + '\n                           ext.scss\n                       ext.css\n                   ' + compression + '\n                   ]]>\n               </x-sencha-command>\n            </target>\n            <target name="watch" depends="init-cmd,build">\n                <x-fashion-watch\n                        refName="fashion-watch"\n                        inputFile="ext.scss"\n                        outputFile="ext.css"\n                        split="4095"\n                        compress="' + (compress ? 'true' : 'false') + '"\n                        configFile="app.json"\n                        fork="true"/>\n                <x-watch compilerRef="theCompiler"\n                         targets="rebuild"/>\n            </target>\n        </project>\n    ').trim();
};

/**
 * Creates the app.json file
 * @param {String} theme The name of the theme to use.
 * @param {String[]} packages The names of packages to include in the build
 */
function createAppJson(_ref2) {
    var theme = _ref2.theme,
        packages = _ref2.packages,
        toolkit = _ref2.toolkit,
        _ref2$overrides = _ref2.overrides,
        overrides = _ref2$overrides === undefined ? [] : _ref2$overrides,
        _ref2$packageDirs = _ref2.packageDirs,
        packageDirs = _ref2$packageDirs === undefined ? [] : _ref2$packageDirs;


    //var senchaPath = '/Users/marcgusmano/_git/sencha/ext-react/packages/ext-react-boilerplate17/node_modules/@sencha'
    //packageDirs.push(senchaPath)
    var config = {
        framework: "ext",
        toolkit: toolkit,
        requires: packages,
        overrides: overrides.map(function (dir) {
            return _path2.default.resolve(dir);
        }).concat('jsdom-environment.js'),
        packages: {
            dir: packageDirs.map(function (dir) {
                return _path2.default.resolve(dir);
            })
        },
        output: {
            base: '.',
            resources: {
                path: './resources',
                shared: "./resources"
            }
        }
    };

    // if theme is local add it as an additional package dir
    if (_fs2.default.existsSync(theme)) {
        var packageInfo = _cjson2.default.load(_path2.default.join(theme, 'package.json'));
        config.theme = packageInfo.name;
        config.packages.dir.push(_path2.default.resolve(theme));
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
    return 'window.Ext = Ext;Ext.require("Ext.react.RendererCell");Ext.require("Ext.data.TreeStore");Ext.require("Ext.grid.Grid");Ext.require("Ext.plugin.Responsive");';
}

/**
 * Creates the workspace.json file
 * @param {String} sdk The path to the sdk
 */
function createWorkspaceJson(sdk, packages, output) {
    return JSON.stringify({
        "frameworks": {
            "ext": _path2.default.relative(output, sdk)
        },
        "packages": {
            "dir": ['${workspace.dir}/packages/local', '${workspace.dir}/packages'].concat(packages).join(','),
            "extract": "${workspace.dir}/packages/remote"
        }
    }, null, 4);
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9hcnRpZmFjdHMuanMiXSwibmFtZXMiOlsiY3JlYXRlQXBwSnNvbiIsImNyZWF0ZUpTRE9NRW52aXJvbm1lbnQiLCJjcmVhdGVXb3Jrc3BhY2VKc29uIiwiYnVpbGRYTUwiLCJjb21wcmVzcyIsImNvbXByZXNzaW9uIiwidHJpbSIsInRoZW1lIiwicGFja2FnZXMiLCJ0b29sa2l0Iiwib3ZlcnJpZGVzIiwicGFja2FnZURpcnMiLCJjb25maWciLCJmcmFtZXdvcmsiLCJyZXF1aXJlcyIsIm1hcCIsInBhdGgiLCJyZXNvbHZlIiwiZGlyIiwiY29uY2F0Iiwib3V0cHV0IiwiYmFzZSIsInJlc291cmNlcyIsInNoYXJlZCIsImZzIiwiZXhpc3RzU3luYyIsInBhY2thZ2VJbmZvIiwiY2pzb24iLCJsb2FkIiwiam9pbiIsIm5hbWUiLCJwdXNoIiwiSlNPTiIsInN0cmluZ2lmeSIsInRhcmdldERpciIsInNkayIsInJlbGF0aXZlIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O1FBb0lnQkEsYSxHQUFBQSxhO1FBcUNBQyxzQixHQUFBQSxzQjtRQVFBQyxtQixHQUFBQSxtQjs7QUEvS2hCOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBRU8sSUFBTUMsOEJBQVcsU0FBWEEsUUFBVyxPQUF1QjtBQUFBLFFBQVpDLFFBQVksUUFBWkEsUUFBWTs7QUFDM0MsUUFBSUMsY0FBYyxFQUFsQjs7QUFFQSxRQUFJRCxRQUFKLEVBQWM7QUFDVkM7QUFRSDs7QUFFRCxXQUFPLG9sR0FvRmNELFdBQVcsV0FBWCxHQUF5QixFQXBGdkMsbUdBdUZVQyxXQXZGVixpWkFpR3lCRCxXQUFXLE1BQVgsR0FBb0IsT0FqRzdDLGtQQXdHTEUsSUF4R0ssRUFBUDtBQXlHSCxDQXZITTs7QUF5SFA7Ozs7O0FBS08sU0FBU04sYUFBVCxRQUFtRjtBQUFBLFFBQTFETyxLQUEwRCxTQUExREEsS0FBMEQ7QUFBQSxRQUFuREMsUUFBbUQsU0FBbkRBLFFBQW1EO0FBQUEsUUFBekNDLE9BQXlDLFNBQXpDQSxPQUF5QztBQUFBLGdDQUFoQ0MsU0FBZ0M7QUFBQSxRQUFoQ0EsU0FBZ0MsbUNBQXRCLEVBQXNCO0FBQUEsa0NBQWxCQyxXQUFrQjtBQUFBLFFBQWxCQSxXQUFrQixxQ0FBTixFQUFNOzs7QUFFeEY7QUFDQTtBQUNBLFFBQU1DLFNBQVM7QUFDVEMsbUJBQVcsS0FERjtBQUVUSix3QkFGUztBQUdUSyxrQkFBVU4sUUFIRDtBQUlURSxtQkFBV0EsVUFBVUssR0FBVixDQUFjO0FBQUEsbUJBQU9DLGVBQUtDLE9BQUwsQ0FBYUMsR0FBYixDQUFQO0FBQUEsU0FBZCxFQUF3Q0MsTUFBeEMsQ0FBK0Msc0JBQS9DLENBSkY7QUFLVFgsa0JBQVU7QUFDTlUsaUJBQUtQLFlBQVlJLEdBQVosQ0FBZ0I7QUFBQSx1QkFBT0MsZUFBS0MsT0FBTCxDQUFhQyxHQUFiLENBQVA7QUFBQSxhQUFoQjtBQURDLFNBTEQ7QUFRVEUsZ0JBQVE7QUFDSkMsa0JBQU0sR0FERjtBQUVKQyx1QkFBVztBQUNQTixzQkFBTSxhQURDO0FBRVBPLHdCQUFRO0FBRkQ7QUFGUDtBQVJDLEtBQWY7O0FBaUJFO0FBQ0EsUUFBSUMsYUFBR0MsVUFBSCxDQUFjbEIsS0FBZCxDQUFKLEVBQTBCO0FBQ3RCLFlBQU1tQixjQUFjQyxnQkFBTUMsSUFBTixDQUFXWixlQUFLYSxJQUFMLENBQVV0QixLQUFWLEVBQWlCLGNBQWpCLENBQVgsQ0FBcEI7QUFDQUssZUFBT0wsS0FBUCxHQUFlbUIsWUFBWUksSUFBM0I7QUFDQWxCLGVBQU9KLFFBQVAsQ0FBZ0JVLEdBQWhCLENBQW9CYSxJQUFwQixDQUF5QmYsZUFBS0MsT0FBTCxDQUFhVixLQUFiLENBQXpCO0FBQ0gsS0FKRCxNQUlPO0FBQ0hLLGVBQU9MLEtBQVAsR0FBZUEsS0FBZjtBQUNIOztBQUVELFdBQU95QixLQUFLQyxTQUFMLENBQWVyQixNQUFmLEVBQXVCLElBQXZCLEVBQTZCLENBQTdCLENBQVA7QUFDSDs7QUFFRDs7OztBQUlPLFNBQVNYLHNCQUFULENBQWdDaUMsU0FBaEMsRUFBMkM7QUFDOUMsV0FBTyw2SkFBUDtBQUNIOztBQUVEOzs7O0FBSU8sU0FBU2hDLG1CQUFULENBQTZCaUMsR0FBN0IsRUFBa0MzQixRQUFsQyxFQUE0Q1ksTUFBNUMsRUFBb0Q7QUFDdkQsV0FBT1ksS0FBS0MsU0FBTCxDQUFlO0FBQ2xCLHNCQUFjO0FBQ1YsbUJBQU9qQixlQUFLb0IsUUFBTCxDQUFjaEIsTUFBZCxFQUFzQmUsR0FBdEI7QUFERyxTQURJO0FBSWxCLG9CQUFZO0FBQ1IsbUJBQU8sQ0FBQyxpQ0FBRCxFQUFtQywyQkFBbkMsRUFBZ0VoQixNQUFoRSxDQUF1RVgsUUFBdkUsRUFBaUZxQixJQUFqRixDQUFzRixHQUF0RixDQURDO0FBRVIsdUJBQVc7QUFGSDtBQUpNLEtBQWYsRUFRSixJQVJJLEVBUUUsQ0FSRixDQUFQO0FBU0giLCJmaWxlIjoiYXJ0aWZhY3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IGZzIGZyb20gJ2ZzJztcbmltcG9ydCBjanNvbiBmcm9tICdjanNvbic7XG5cbmV4cG9ydCBjb25zdCBidWlsZFhNTCA9IGZ1bmN0aW9uKHsgY29tcHJlc3MgfSkge1xuICAgIGxldCBjb21wcmVzc2lvbiA9ICcnO1xuXG4gICAgaWYgKGNvbXByZXNzKSB7XG4gICAgICAgIGNvbXByZXNzaW9uID0gYFxuICAgICAgICAgICAgdGhlbiBcbiAgICAgICAgICAgIGZzIFxuICAgICAgICAgICAgbWluaWZ5IFxuICAgICAgICAgICAgICAgIC15dWkgXG4gICAgICAgICAgICAgICAgLWZyb209ZXh0LmpzIFxuICAgICAgICAgICAgICAgIC10bz1leHQuanNcbiAgICAgICAgYDtcbiAgICB9XG5cbiAgICByZXR1cm4gYFxuICAgICAgICA8cHJvamVjdCBuYW1lPVwic2ltcGxlLWJ1aWxkXCIgYmFzZWRpcj1cIi5cIj5cbiAgICAgICAgICAgIDwhLS0gIGludGVybmFsbHksIHdhdGNoIGNhbGxzIHRoZSBpbml0IHRhcmdldCwgc28gbmVlZCB0byBoYXZlIG9uZSBoZXJlIC0tPlxuICAgICAgICAgICAgPHRhcmdldCBuYW1lPVwiaW5pdFwiLz5cbiAgICAgICAgICAgIDx0YXJnZXQgbmFtZT1cImluaXQtY21kXCI+XG4gICAgICAgICAgICAgICAgPHRhc2tkZWYgcmVzb3VyY2U9XCJjb20vc2VuY2hhL2FudC9hbnRsaWIueG1sXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NwYXRoPVwiXFwke2NtZC5kaXJ9L3NlbmNoYS5qYXJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2FkZXJyZWY9XCJzZW5jaGFsb2FkZXJcIi8+XG4gICAgICAgICAgICAgICAgPHgtZXh0ZW5kLWNsYXNzcGF0aD5cbiAgICAgICAgICAgICAgICAgICAgPGphciBwYXRoPVwiXFwke2NtZC5kaXJ9L3NlbmNoYS5qYXJcIi8+XG4gICAgICAgICAgICAgICAgPC94LWV4dGVuZC1jbGFzc3BhdGg+XG4gICAgICAgICAgICAgICAgPHgtc2VuY2hhLWluaXQgcHJlZml4PVwiXCIvPlxuICAgICAgICAgICAgICAgIDx4LWNvbXBpbGUgcmVmaWQ9XCJ0aGVDb21waWxlclwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXI9XCJcXCR7YmFzZWRpcn1cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5pdE9ubHk9XCJ0cnVlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluaGVyaXRBbGw9XCJ0cnVlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwhW0NEQVRBW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAtY2xhc3NwYXRoPVxcJHtiYXNlZGlyfS9tYW5pZmVzdC5qc1xuICAgICAgICAgICAgICAgICAgICAgICAgICBsb2FkLWFwcFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLXRlbXA9XFwke2Jhc2VkaXJ9L3RlbXBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC10YWc9QXBwXG4gICAgICAgICAgICAgICAgICAgIF1dPlxuICAgICAgICAgICAgICAgICAgPC94LWNvbXBpbGU+XG4gICAgICAgICAgICA8L3RhcmdldD5cbiAgICAgICAgICAgIDx0YXJnZXQgbmFtZT1cInJlYnVpbGRcIj5cbiAgICAgICAgICAgICAgIDx4LWNvbXBpbGUgcmVmaWQ9XCJ0aGVDb21waWxlclwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGRpcj1cIlxcJHtiYXNlZGlyfVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGluaGVyaXRBbGw9XCJ0cnVlXCI+XG4gICAgICAgICAgICAgICAgICA8IVtDREFUQVtcbiAgICAgICAgICAgICAgICAgIC0tZGVidWdcbiAgICAgICAgICAgICAgICAgIGV4Y2x1ZGVcbiAgICAgICAgICAgICAgICAgIC1hbGxcbiAgICAgICAgICAgICAgICAgIGFuZFxuICAgICAgICAgICAgICAgICAgaW5jbHVkZVxuICAgICAgICAgICAgICAgICAgLWY9Qm9vdC5qc1xuICAgICAgICAgICAgICAgICAgYW5kXG4gICAgICAgICAgICAgICAgICBjb25jYXRlbmF0ZVxuICAgICAgICAgICAgICAgICAgICAgIGV4dC5qc1xuICAgICAgICAgICAgICAgICAgYW5kXG4gICAgICAgICAgICAgICAgICBleGNsdWRlXG4gICAgICAgICAgICAgICAgICAtYWxsXG4gICAgICAgICAgICAgICAgICBhbmRcbiAgICAgICAgICAgICAgICAgICMgaW5jbHVkZSB0aGVtZSBvdmVycmlkZXNcbiAgICAgICAgICAgICAgICAgIGluY2x1ZGVcbiAgICAgICAgICAgICAgICAgICAgLXJcbiAgICAgICAgICAgICAgICAgICAgLXRhZz1vdmVycmlkZXNcbiAgICAgICAgICAgICAgICAgIGFuZFxuICAgICAgICAgICAgICAgICAgIyBpbmNsdWRlIGFsbCBqcyBmaWxlcyBuZWVkZWQgZm9yIG1hbmlmZXN0LmpzXG4gICAgICAgICAgICAgICAgICBpbmNsdWRlXG4gICAgICAgICAgICAgICAgICAgICAgLXJcbiAgICAgICAgICAgICAgICAgICAgICAtZj1tYW5pZmVzdC5qc1xuICAgICAgICAgICAgICAgICAgYW5kXG4gICAgICAgICAgICAgICAgICAjIGV4Y2x1ZGUgdGhlIGdlbmVyYXRlZCBtYW5pZmVzdCBmaWxlIGl0c2VsZixcbiAgICAgICAgICAgICAgICAgICMgc2luY2Ugd2UgZG9uJ3Qgd2FudCB0aGUgZ2VuZXJhdGVkIGJ1bmRsZSBmaWxlIHRvIGNyZWF0ZSBhbnkgY29tcG9uZW50c1xuICAgICAgICAgICAgICAgICAgZXhjbHVkZVxuICAgICAgICAgICAgICAgICAgLWY9bWFuaWZlc3QuanNcbiAgICAgICAgICAgICAgICAgIGFuZFxuICAgICAgICAgICAgICAgICAgY29uY2F0ZW5hdGVcbiAgICAgICAgICAgICAgICAgICthcHBlbmRcbiAgICAgICAgICAgICAgICAgICAgICBleHQuanNcbiAgICAgICAgICAgICAgICAgIGFuZFxuICAgICAgICAgICAgICAgICAgc2Nzc1xuICAgICAgICAgICAgICAgICAgICAgIC1hcHBOYW1lPUFwcFxuICAgICAgICAgICAgICAgICAgICAgIC1pbWFnZVNlYXJjaFBhdGg9cmVzb3VyY2VzXG4gICAgICAgICAgICAgICAgICAgICAgLXRoZW1lTmFtZT10cml0b25cbiAgICAgICAgICAgICAgICAgICAgICAtcmVzb3VyY2VNYXBCYXNlPS5cbiAgICAgICAgICAgICAgICAgICAgICAtb3V0cHV0PWV4dC5zY3NzXG4gICAgICAgICAgICAgICAgICBhbmRcbiAgICAgICAgICAgICAgICAgIHJlc291cmNlc1xuICAgICAgICAgICAgICAgICAgICAgIC1leGNsdWRlcz0tYWxsKi5jc3NcbiAgICAgICAgICAgICAgICAgICAgICAtb3V0PXJlc291cmNlc1xuICAgICAgICAgICAgICAgICAgYW5kXG4gICAgICAgICAgICAgICAgICByZXNvdXJjZXNcbiAgICAgICAgICAgICAgICAgICAgICAtbW9kZWw9dHJ1ZVxuICAgICAgICAgICAgICAgICAgICAgIC1vdXQ9cmVzb3VyY2VzXG4gICAgICAgICAgICAgICAgICBdXT5cbiAgICAgICAgICAgICAgIDwveC1jb21waWxlPlxuICAgICAgICAgICAgPC90YXJnZXQ+XG4gICAgICAgICAgICA8dGFyZ2V0IG5hbWU9XCJidWlsZFwiIGRlcGVuZHM9XCJpbml0LWNtZCxyZWJ1aWxkXCI+XG4gICAgICAgICAgICAgICA8eC1zZW5jaGEtY29tbWFuZCBkaXI9XCJcXCR7YmFzZWRpcn1cIj5cbiAgICAgICAgICAgICAgICAgICA8IVtDREFUQVtcbiAgICAgICAgICAgICAgICAgICBmYXNoaW9uXG4gICAgICAgICAgICAgICAgICAgICAgIC1wd2Q9LlxuICAgICAgICAgICAgICAgICAgICAgICAtc3BsaXQ9NDA5NVxuICAgICAgICAgICAgICAgICAgICAgICAke2NvbXByZXNzID8gJy1jb21wcmVzcycgOiAnJ31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgIGV4dC5zY3NzXG4gICAgICAgICAgICAgICAgICAgICAgIGV4dC5jc3NcbiAgICAgICAgICAgICAgICAgICAke2NvbXByZXNzaW9ufVxuICAgICAgICAgICAgICAgICAgIF1dPlxuICAgICAgICAgICAgICAgPC94LXNlbmNoYS1jb21tYW5kPlxuICAgICAgICAgICAgPC90YXJnZXQ+XG4gICAgICAgICAgICA8dGFyZ2V0IG5hbWU9XCJ3YXRjaFwiIGRlcGVuZHM9XCJpbml0LWNtZCxidWlsZFwiPlxuICAgICAgICAgICAgICAgIDx4LWZhc2hpb24td2F0Y2hcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZk5hbWU9XCJmYXNoaW9uLXdhdGNoXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0RmlsZT1cImV4dC5zY3NzXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIG91dHB1dEZpbGU9XCJleHQuY3NzXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNwbGl0PVwiNDA5NVwiXG4gICAgICAgICAgICAgICAgICAgICAgICBjb21wcmVzcz1cIiR7Y29tcHJlc3MgPyAndHJ1ZScgOiAnZmFsc2UnfVwiXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25maWdGaWxlPVwiYXBwLmpzb25cIlxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yaz1cInRydWVcIi8+XG4gICAgICAgICAgICAgICAgPHgtd2F0Y2ggY29tcGlsZXJSZWY9XCJ0aGVDb21waWxlclwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0cz1cInJlYnVpbGRcIi8+XG4gICAgICAgICAgICA8L3RhcmdldD5cbiAgICAgICAgPC9wcm9qZWN0PlxuICAgIGAudHJpbSgpO1xufTtcblxuLyoqXG4gKiBDcmVhdGVzIHRoZSBhcHAuanNvbiBmaWxlXG4gKiBAcGFyYW0ge1N0cmluZ30gdGhlbWUgVGhlIG5hbWUgb2YgdGhlIHRoZW1lIHRvIHVzZS5cbiAqIEBwYXJhbSB7U3RyaW5nW119IHBhY2thZ2VzIFRoZSBuYW1lcyBvZiBwYWNrYWdlcyB0byBpbmNsdWRlIGluIHRoZSBidWlsZFxuICovXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlQXBwSnNvbih7IHRoZW1lLCBwYWNrYWdlcywgdG9vbGtpdCwgb3ZlcnJpZGVzPVtdLCBwYWNrYWdlRGlycz1bXSB9KSB7XG5cbiAgLy92YXIgc2VuY2hhUGF0aCA9ICcvVXNlcnMvbWFyY2d1c21hbm8vX2dpdC9zZW5jaGEvZXh0LXJlYWN0L3BhY2thZ2VzL2V4dC1yZWFjdC1ib2lsZXJwbGF0ZTE3L25vZGVfbW9kdWxlcy9Ac2VuY2hhJ1xuICAvL3BhY2thZ2VEaXJzLnB1c2goc2VuY2hhUGF0aClcbiAgY29uc3QgY29uZmlnID0ge1xuICAgICAgICBmcmFtZXdvcms6IFwiZXh0XCIsXG4gICAgICAgIHRvb2xraXQsXG4gICAgICAgIHJlcXVpcmVzOiBwYWNrYWdlcyxcbiAgICAgICAgb3ZlcnJpZGVzOiBvdmVycmlkZXMubWFwKGRpciA9PiBwYXRoLnJlc29sdmUoZGlyKSkuY29uY2F0KCdqc2RvbS1lbnZpcm9ubWVudC5qcycpLFxuICAgICAgICBwYWNrYWdlczoge1xuICAgICAgICAgICAgZGlyOiBwYWNrYWdlRGlycy5tYXAoZGlyID0+IHBhdGgucmVzb2x2ZShkaXIpKVxuICAgICAgICB9LFxuICAgICAgICBvdXRwdXQ6IHtcbiAgICAgICAgICAgIGJhc2U6ICcuJyxcbiAgICAgICAgICAgIHJlc291cmNlczoge1xuICAgICAgICAgICAgICAgIHBhdGg6ICcuL3Jlc291cmNlcycsXG4gICAgICAgICAgICAgICAgc2hhcmVkOiBcIi4vcmVzb3VyY2VzXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG5cbiAgICAvLyBpZiB0aGVtZSBpcyBsb2NhbCBhZGQgaXQgYXMgYW4gYWRkaXRpb25hbCBwYWNrYWdlIGRpclxuICAgIGlmIChmcy5leGlzdHNTeW5jKHRoZW1lKSkge1xuICAgICAgICBjb25zdCBwYWNrYWdlSW5mbyA9IGNqc29uLmxvYWQocGF0aC5qb2luKHRoZW1lLCAncGFja2FnZS5qc29uJykpO1xuICAgICAgICBjb25maWcudGhlbWUgPSBwYWNrYWdlSW5mby5uYW1lO1xuICAgICAgICBjb25maWcucGFja2FnZXMuZGlyLnB1c2gocGF0aC5yZXNvbHZlKHRoZW1lKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgY29uZmlnLnRoZW1lID0gdGhlbWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KGNvbmZpZywgbnVsbCwgNCk7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIGpzIGZpbGUgY29udGFpbmluZyBjb2RlIHRvIG1ha2UgRXh0IEpTIGxvYWQgcHJvcGVybHkgaW4ganNkb21cbiAqIEBwYXJhbSB7U3RyaW5nfSB0YXJnZXREaXIgXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVKU0RPTUVudmlyb25tZW50KHRhcmdldERpcikge1xuICAgIHJldHVybiAnd2luZG93LkV4dCA9IEV4dDtFeHQucmVxdWlyZShcIkV4dC5yZWFjdC5SZW5kZXJlckNlbGxcIik7RXh0LnJlcXVpcmUoXCJFeHQuZGF0YS5UcmVlU3RvcmVcIik7RXh0LnJlcXVpcmUoXCJFeHQuZ3JpZC5HcmlkXCIpO0V4dC5yZXF1aXJlKFwiRXh0LnBsdWdpbi5SZXNwb25zaXZlXCIpOyc7XG59XG5cbi8qKlxuICogQ3JlYXRlcyB0aGUgd29ya3NwYWNlLmpzb24gZmlsZVxuICogQHBhcmFtIHtTdHJpbmd9IHNkayBUaGUgcGF0aCB0byB0aGUgc2RrXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVXb3Jrc3BhY2VKc29uKHNkaywgcGFja2FnZXMsIG91dHB1dCkge1xuICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgIFwiZnJhbWV3b3Jrc1wiOiB7XG4gICAgICAgICAgICBcImV4dFwiOiBwYXRoLnJlbGF0aXZlKG91dHB1dCwgc2RrKVxuICAgICAgICB9LFxuICAgICAgICBcInBhY2thZ2VzXCI6IHtcbiAgICAgICAgICAgIFwiZGlyXCI6IFsnJHt3b3Jrc3BhY2UuZGlyfS9wYWNrYWdlcy9sb2NhbCcsJyR7d29ya3NwYWNlLmRpcn0vcGFja2FnZXMnXS5jb25jYXQocGFja2FnZXMpLmpvaW4oJywnKSxcbiAgICAgICAgICAgIFwiZXh0cmFjdFwiOiBcIiR7d29ya3NwYWNlLmRpcn0vcGFja2FnZXMvcmVtb3RlXCJcbiAgICAgICAgfVxuICAgIH0sIG51bGwsIDQpO1xufVxuIl19