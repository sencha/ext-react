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
    return 'window.Ext = Ext;Ext.require("Ext.data.TreeStore");Ext.require("Ext.grid.Grid");Ext.require("Ext.plugin.Responsive");';
    //return 'window.Ext = Ext;Ext.require("Ext.react.RendererCell");Ext.require("Ext.data.TreeStore");Ext.require("Ext.grid.Grid");Ext.require("Ext.plugin.Responsive");';
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9hcnRpZmFjdHMuanMiXSwibmFtZXMiOlsiY3JlYXRlQXBwSnNvbiIsImNyZWF0ZUpTRE9NRW52aXJvbm1lbnQiLCJjcmVhdGVXb3Jrc3BhY2VKc29uIiwiYnVpbGRYTUwiLCJjb21wcmVzcyIsImNvbXByZXNzaW9uIiwidHJpbSIsInRoZW1lIiwicGFja2FnZXMiLCJ0b29sa2l0Iiwib3ZlcnJpZGVzIiwicGFja2FnZURpcnMiLCJjb25maWciLCJmcmFtZXdvcmsiLCJyZXF1aXJlcyIsIm1hcCIsInBhdGgiLCJyZXNvbHZlIiwiZGlyIiwiY29uY2F0Iiwib3V0cHV0IiwiYmFzZSIsInJlc291cmNlcyIsInNoYXJlZCIsImZzIiwiZXhpc3RzU3luYyIsInBhY2thZ2VJbmZvIiwiY2pzb24iLCJsb2FkIiwiam9pbiIsIm5hbWUiLCJwdXNoIiwiSlNPTiIsInN0cmluZ2lmeSIsInRhcmdldERpciIsInNkayIsInJlbGF0aXZlIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O1FBb0lnQkEsYSxHQUFBQSxhO1FBcUNBQyxzQixHQUFBQSxzQjtRQVNBQyxtQixHQUFBQSxtQjs7QUFoTGhCOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBRU8sSUFBTUMsOEJBQVcsU0FBWEEsUUFBVyxPQUF1QjtBQUFBLFFBQVpDLFFBQVksUUFBWkEsUUFBWTs7QUFDM0MsUUFBSUMsY0FBYyxFQUFsQjs7QUFFQSxRQUFJRCxRQUFKLEVBQWM7QUFDVkM7QUFRSDs7QUFFRCxXQUFPLG9sR0FvRmNELFdBQVcsV0FBWCxHQUF5QixFQXBGdkMsbUdBdUZVQyxXQXZGVixpWkFpR3lCRCxXQUFXLE1BQVgsR0FBb0IsT0FqRzdDLGtQQXdHTEUsSUF4R0ssRUFBUDtBQXlHSCxDQXZITTs7QUF5SFA7Ozs7O0FBS08sU0FBU04sYUFBVCxRQUFtRjtBQUFBLFFBQTFETyxLQUEwRCxTQUExREEsS0FBMEQ7QUFBQSxRQUFuREMsUUFBbUQsU0FBbkRBLFFBQW1EO0FBQUEsUUFBekNDLE9BQXlDLFNBQXpDQSxPQUF5QztBQUFBLGdDQUFoQ0MsU0FBZ0M7QUFBQSxRQUFoQ0EsU0FBZ0MsbUNBQXRCLEVBQXNCO0FBQUEsa0NBQWxCQyxXQUFrQjtBQUFBLFFBQWxCQSxXQUFrQixxQ0FBTixFQUFNOzs7QUFFeEY7QUFDQTtBQUNBLFFBQU1DLFNBQVM7QUFDVEMsbUJBQVcsS0FERjtBQUVUSix3QkFGUztBQUdUSyxrQkFBVU4sUUFIRDtBQUlURSxtQkFBV0EsVUFBVUssR0FBVixDQUFjO0FBQUEsbUJBQU9DLGVBQUtDLE9BQUwsQ0FBYUMsR0FBYixDQUFQO0FBQUEsU0FBZCxFQUF3Q0MsTUFBeEMsQ0FBK0Msc0JBQS9DLENBSkY7QUFLVFgsa0JBQVU7QUFDTlUsaUJBQUtQLFlBQVlJLEdBQVosQ0FBZ0I7QUFBQSx1QkFBT0MsZUFBS0MsT0FBTCxDQUFhQyxHQUFiLENBQVA7QUFBQSxhQUFoQjtBQURDLFNBTEQ7QUFRVEUsZ0JBQVE7QUFDSkMsa0JBQU0sR0FERjtBQUVKQyx1QkFBVztBQUNQTixzQkFBTSxhQURDO0FBRVBPLHdCQUFRO0FBRkQ7QUFGUDtBQVJDLEtBQWY7O0FBaUJFO0FBQ0EsUUFBSUMsYUFBR0MsVUFBSCxDQUFjbEIsS0FBZCxDQUFKLEVBQTBCO0FBQ3RCLFlBQU1tQixjQUFjQyxnQkFBTUMsSUFBTixDQUFXWixlQUFLYSxJQUFMLENBQVV0QixLQUFWLEVBQWlCLGNBQWpCLENBQVgsQ0FBcEI7QUFDQUssZUFBT0wsS0FBUCxHQUFlbUIsWUFBWUksSUFBM0I7QUFDQWxCLGVBQU9KLFFBQVAsQ0FBZ0JVLEdBQWhCLENBQW9CYSxJQUFwQixDQUF5QmYsZUFBS0MsT0FBTCxDQUFhVixLQUFiLENBQXpCO0FBQ0gsS0FKRCxNQUlPO0FBQ0hLLGVBQU9MLEtBQVAsR0FBZUEsS0FBZjtBQUNIOztBQUVELFdBQU95QixLQUFLQyxTQUFMLENBQWVyQixNQUFmLEVBQXVCLElBQXZCLEVBQTZCLENBQTdCLENBQVA7QUFDSDs7QUFFRDs7OztBQUlPLFNBQVNYLHNCQUFULENBQWdDaUMsU0FBaEMsRUFBMkM7QUFDOUMsV0FBTyx1SEFBUDtBQUNBO0FBQ0g7O0FBRUQ7Ozs7QUFJTyxTQUFTaEMsbUJBQVQsQ0FBNkJpQyxHQUE3QixFQUFrQzNCLFFBQWxDLEVBQTRDWSxNQUE1QyxFQUFvRDtBQUN2RCxXQUFPWSxLQUFLQyxTQUFMLENBQWU7QUFDbEIsc0JBQWM7QUFDVixtQkFBT2pCLGVBQUtvQixRQUFMLENBQWNoQixNQUFkLEVBQXNCZSxHQUF0QjtBQURHLFNBREk7QUFJbEIsb0JBQVk7QUFDUixtQkFBTyxDQUFDLGlDQUFELEVBQW1DLDJCQUFuQyxFQUFnRWhCLE1BQWhFLENBQXVFWCxRQUF2RSxFQUFpRnFCLElBQWpGLENBQXNGLEdBQXRGLENBREM7QUFFUix1QkFBVztBQUZIO0FBSk0sS0FBZixFQVFKLElBUkksRUFRRSxDQVJGLENBQVA7QUFTSCIsImZpbGUiOiJhcnRpZmFjdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgZnMgZnJvbSAnZnMnO1xuaW1wb3J0IGNqc29uIGZyb20gJ2Nqc29uJztcblxuZXhwb3J0IGNvbnN0IGJ1aWxkWE1MID0gZnVuY3Rpb24oeyBjb21wcmVzcyB9KSB7XG4gICAgbGV0IGNvbXByZXNzaW9uID0gJyc7XG5cbiAgICBpZiAoY29tcHJlc3MpIHtcbiAgICAgICAgY29tcHJlc3Npb24gPSBgXG4gICAgICAgICAgICB0aGVuIFxuICAgICAgICAgICAgZnMgXG4gICAgICAgICAgICBtaW5pZnkgXG4gICAgICAgICAgICAgICAgLXl1aSBcbiAgICAgICAgICAgICAgICAtZnJvbT1leHQuanMgXG4gICAgICAgICAgICAgICAgLXRvPWV4dC5qc1xuICAgICAgICBgO1xuICAgIH1cblxuICAgIHJldHVybiBgXG4gICAgICAgIDxwcm9qZWN0IG5hbWU9XCJzaW1wbGUtYnVpbGRcIiBiYXNlZGlyPVwiLlwiPlxuICAgICAgICAgICAgPCEtLSAgaW50ZXJuYWxseSwgd2F0Y2ggY2FsbHMgdGhlIGluaXQgdGFyZ2V0LCBzbyBuZWVkIHRvIGhhdmUgb25lIGhlcmUgLS0+XG4gICAgICAgICAgICA8dGFyZ2V0IG5hbWU9XCJpbml0XCIvPlxuICAgICAgICAgICAgPHRhcmdldCBuYW1lPVwiaW5pdC1jbWRcIj5cbiAgICAgICAgICAgICAgICA8dGFza2RlZiByZXNvdXJjZT1cImNvbS9zZW5jaGEvYW50L2FudGxpYi54bWxcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc3BhdGg9XCJcXCR7Y21kLmRpcn0vc2VuY2hhLmphclwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvYWRlcnJlZj1cInNlbmNoYWxvYWRlclwiLz5cbiAgICAgICAgICAgICAgICA8eC1leHRlbmQtY2xhc3NwYXRoPlxuICAgICAgICAgICAgICAgICAgICA8amFyIHBhdGg9XCJcXCR7Y21kLmRpcn0vc2VuY2hhLmphclwiLz5cbiAgICAgICAgICAgICAgICA8L3gtZXh0ZW5kLWNsYXNzcGF0aD5cbiAgICAgICAgICAgICAgICA8eC1zZW5jaGEtaW5pdCBwcmVmaXg9XCJcIi8+XG4gICAgICAgICAgICAgICAgPHgtY29tcGlsZSByZWZpZD1cInRoZUNvbXBpbGVyXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpcj1cIlxcJHtiYXNlZGlyfVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbml0T25seT1cInRydWVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5oZXJpdEFsbD1cInRydWVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPCFbQ0RBVEFbXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC1jbGFzc3BhdGg9XFwke2Jhc2VkaXJ9L21hbmlmZXN0LmpzXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGxvYWQtYXBwXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAtdGVtcD1cXCR7YmFzZWRpcn0vdGVtcFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLXRhZz1BcHBcbiAgICAgICAgICAgICAgICAgICAgXV0+XG4gICAgICAgICAgICAgICAgICA8L3gtY29tcGlsZT5cbiAgICAgICAgICAgIDwvdGFyZ2V0PlxuICAgICAgICAgICAgPHRhcmdldCBuYW1lPVwicmVidWlsZFwiPlxuICAgICAgICAgICAgICAgPHgtY29tcGlsZSByZWZpZD1cInRoZUNvbXBpbGVyXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgZGlyPVwiXFwke2Jhc2VkaXJ9XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgaW5oZXJpdEFsbD1cInRydWVcIj5cbiAgICAgICAgICAgICAgICAgIDwhW0NEQVRBW1xuICAgICAgICAgICAgICAgICAgLS1kZWJ1Z1xuICAgICAgICAgICAgICAgICAgZXhjbHVkZVxuICAgICAgICAgICAgICAgICAgLWFsbFxuICAgICAgICAgICAgICAgICAgYW5kXG4gICAgICAgICAgICAgICAgICBpbmNsdWRlXG4gICAgICAgICAgICAgICAgICAtZj1Cb290LmpzXG4gICAgICAgICAgICAgICAgICBhbmRcbiAgICAgICAgICAgICAgICAgIGNvbmNhdGVuYXRlXG4gICAgICAgICAgICAgICAgICAgICAgZXh0LmpzXG4gICAgICAgICAgICAgICAgICBhbmRcbiAgICAgICAgICAgICAgICAgIGV4Y2x1ZGVcbiAgICAgICAgICAgICAgICAgIC1hbGxcbiAgICAgICAgICAgICAgICAgIGFuZFxuICAgICAgICAgICAgICAgICAgIyBpbmNsdWRlIHRoZW1lIG92ZXJyaWRlc1xuICAgICAgICAgICAgICAgICAgaW5jbHVkZVxuICAgICAgICAgICAgICAgICAgICAtclxuICAgICAgICAgICAgICAgICAgICAtdGFnPW92ZXJyaWRlc1xuICAgICAgICAgICAgICAgICAgYW5kXG4gICAgICAgICAgICAgICAgICAjIGluY2x1ZGUgYWxsIGpzIGZpbGVzIG5lZWRlZCBmb3IgbWFuaWZlc3QuanNcbiAgICAgICAgICAgICAgICAgIGluY2x1ZGVcbiAgICAgICAgICAgICAgICAgICAgICAtclxuICAgICAgICAgICAgICAgICAgICAgIC1mPW1hbmlmZXN0LmpzXG4gICAgICAgICAgICAgICAgICBhbmRcbiAgICAgICAgICAgICAgICAgICMgZXhjbHVkZSB0aGUgZ2VuZXJhdGVkIG1hbmlmZXN0IGZpbGUgaXRzZWxmLFxuICAgICAgICAgICAgICAgICAgIyBzaW5jZSB3ZSBkb24ndCB3YW50IHRoZSBnZW5lcmF0ZWQgYnVuZGxlIGZpbGUgdG8gY3JlYXRlIGFueSBjb21wb25lbnRzXG4gICAgICAgICAgICAgICAgICBleGNsdWRlXG4gICAgICAgICAgICAgICAgICAtZj1tYW5pZmVzdC5qc1xuICAgICAgICAgICAgICAgICAgYW5kXG4gICAgICAgICAgICAgICAgICBjb25jYXRlbmF0ZVxuICAgICAgICAgICAgICAgICAgK2FwcGVuZFxuICAgICAgICAgICAgICAgICAgICAgIGV4dC5qc1xuICAgICAgICAgICAgICAgICAgYW5kXG4gICAgICAgICAgICAgICAgICBzY3NzXG4gICAgICAgICAgICAgICAgICAgICAgLWFwcE5hbWU9QXBwXG4gICAgICAgICAgICAgICAgICAgICAgLWltYWdlU2VhcmNoUGF0aD1yZXNvdXJjZXNcbiAgICAgICAgICAgICAgICAgICAgICAtdGhlbWVOYW1lPXRyaXRvblxuICAgICAgICAgICAgICAgICAgICAgIC1yZXNvdXJjZU1hcEJhc2U9LlxuICAgICAgICAgICAgICAgICAgICAgIC1vdXRwdXQ9ZXh0LnNjc3NcbiAgICAgICAgICAgICAgICAgIGFuZFxuICAgICAgICAgICAgICAgICAgcmVzb3VyY2VzXG4gICAgICAgICAgICAgICAgICAgICAgLWV4Y2x1ZGVzPS1hbGwqLmNzc1xuICAgICAgICAgICAgICAgICAgICAgIC1vdXQ9cmVzb3VyY2VzXG4gICAgICAgICAgICAgICAgICBhbmRcbiAgICAgICAgICAgICAgICAgIHJlc291cmNlc1xuICAgICAgICAgICAgICAgICAgICAgIC1tb2RlbD10cnVlXG4gICAgICAgICAgICAgICAgICAgICAgLW91dD1yZXNvdXJjZXNcbiAgICAgICAgICAgICAgICAgIF1dPlxuICAgICAgICAgICAgICAgPC94LWNvbXBpbGU+XG4gICAgICAgICAgICA8L3RhcmdldD5cbiAgICAgICAgICAgIDx0YXJnZXQgbmFtZT1cImJ1aWxkXCIgZGVwZW5kcz1cImluaXQtY21kLHJlYnVpbGRcIj5cbiAgICAgICAgICAgICAgIDx4LXNlbmNoYS1jb21tYW5kIGRpcj1cIlxcJHtiYXNlZGlyfVwiPlxuICAgICAgICAgICAgICAgICAgIDwhW0NEQVRBW1xuICAgICAgICAgICAgICAgICAgIGZhc2hpb25cbiAgICAgICAgICAgICAgICAgICAgICAgLXB3ZD0uXG4gICAgICAgICAgICAgICAgICAgICAgIC1zcGxpdD00MDk1XG4gICAgICAgICAgICAgICAgICAgICAgICR7Y29tcHJlc3MgPyAnLWNvbXByZXNzJyA6ICcnfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgZXh0LnNjc3NcbiAgICAgICAgICAgICAgICAgICAgICAgZXh0LmNzc1xuICAgICAgICAgICAgICAgICAgICR7Y29tcHJlc3Npb259XG4gICAgICAgICAgICAgICAgICAgXV0+XG4gICAgICAgICAgICAgICA8L3gtc2VuY2hhLWNvbW1hbmQ+XG4gICAgICAgICAgICA8L3RhcmdldD5cbiAgICAgICAgICAgIDx0YXJnZXQgbmFtZT1cIndhdGNoXCIgZGVwZW5kcz1cImluaXQtY21kLGJ1aWxkXCI+XG4gICAgICAgICAgICAgICAgPHgtZmFzaGlvbi13YXRjaFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVmTmFtZT1cImZhc2hpb24td2F0Y2hcIlxuICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXRGaWxlPVwiZXh0LnNjc3NcIlxuICAgICAgICAgICAgICAgICAgICAgICAgb3V0cHV0RmlsZT1cImV4dC5jc3NcIlxuICAgICAgICAgICAgICAgICAgICAgICAgc3BsaXQ9XCI0MDk1XCJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbXByZXNzPVwiJHtjb21wcmVzcyA/ICd0cnVlJyA6ICdmYWxzZSd9XCJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbmZpZ0ZpbGU9XCJhcHAuanNvblwiXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JrPVwidHJ1ZVwiLz5cbiAgICAgICAgICAgICAgICA8eC13YXRjaCBjb21waWxlclJlZj1cInRoZUNvbXBpbGVyXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXRzPVwicmVidWlsZFwiLz5cbiAgICAgICAgICAgIDwvdGFyZ2V0PlxuICAgICAgICA8L3Byb2plY3Q+XG4gICAgYC50cmltKCk7XG59O1xuXG4vKipcbiAqIENyZWF0ZXMgdGhlIGFwcC5qc29uIGZpbGVcbiAqIEBwYXJhbSB7U3RyaW5nfSB0aGVtZSBUaGUgbmFtZSBvZiB0aGUgdGhlbWUgdG8gdXNlLlxuICogQHBhcmFtIHtTdHJpbmdbXX0gcGFja2FnZXMgVGhlIG5hbWVzIG9mIHBhY2thZ2VzIHRvIGluY2x1ZGUgaW4gdGhlIGJ1aWxkXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVBcHBKc29uKHsgdGhlbWUsIHBhY2thZ2VzLCB0b29sa2l0LCBvdmVycmlkZXM9W10sIHBhY2thZ2VEaXJzPVtdIH0pIHtcblxuICAvL3ZhciBzZW5jaGFQYXRoID0gJy9Vc2Vycy9tYXJjZ3VzbWFuby9fZ2l0L3NlbmNoYS9leHQtcmVhY3QvcGFja2FnZXMvZXh0LXJlYWN0LWJvaWxlcnBsYXRlMTcvbm9kZV9tb2R1bGVzL0BzZW5jaGEnXG4gIC8vcGFja2FnZURpcnMucHVzaChzZW5jaGFQYXRoKVxuICBjb25zdCBjb25maWcgPSB7XG4gICAgICAgIGZyYW1ld29yazogXCJleHRcIixcbiAgICAgICAgdG9vbGtpdCxcbiAgICAgICAgcmVxdWlyZXM6IHBhY2thZ2VzLFxuICAgICAgICBvdmVycmlkZXM6IG92ZXJyaWRlcy5tYXAoZGlyID0+IHBhdGgucmVzb2x2ZShkaXIpKS5jb25jYXQoJ2pzZG9tLWVudmlyb25tZW50LmpzJyksXG4gICAgICAgIHBhY2thZ2VzOiB7XG4gICAgICAgICAgICBkaXI6IHBhY2thZ2VEaXJzLm1hcChkaXIgPT4gcGF0aC5yZXNvbHZlKGRpcikpXG4gICAgICAgIH0sXG4gICAgICAgIG91dHB1dDoge1xuICAgICAgICAgICAgYmFzZTogJy4nLFxuICAgICAgICAgICAgcmVzb3VyY2VzOiB7XG4gICAgICAgICAgICAgICAgcGF0aDogJy4vcmVzb3VyY2VzJyxcbiAgICAgICAgICAgICAgICBzaGFyZWQ6IFwiLi9yZXNvdXJjZXNcIlxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcblxuICAgIC8vIGlmIHRoZW1lIGlzIGxvY2FsIGFkZCBpdCBhcyBhbiBhZGRpdGlvbmFsIHBhY2thZ2UgZGlyXG4gICAgaWYgKGZzLmV4aXN0c1N5bmModGhlbWUpKSB7XG4gICAgICAgIGNvbnN0IHBhY2thZ2VJbmZvID0gY2pzb24ubG9hZChwYXRoLmpvaW4odGhlbWUsICdwYWNrYWdlLmpzb24nKSk7XG4gICAgICAgIGNvbmZpZy50aGVtZSA9IHBhY2thZ2VJbmZvLm5hbWU7XG4gICAgICAgIGNvbmZpZy5wYWNrYWdlcy5kaXIucHVzaChwYXRoLnJlc29sdmUodGhlbWUpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBjb25maWcudGhlbWUgPSB0aGVtZTtcbiAgICB9XG5cbiAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoY29uZmlnLCBudWxsLCA0KTtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEganMgZmlsZSBjb250YWluaW5nIGNvZGUgdG8gbWFrZSBFeHQgSlMgbG9hZCBwcm9wZXJseSBpbiBqc2RvbVxuICogQHBhcmFtIHtTdHJpbmd9IHRhcmdldERpciBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUpTRE9NRW52aXJvbm1lbnQodGFyZ2V0RGlyKSB7XG4gICAgcmV0dXJuICd3aW5kb3cuRXh0ID0gRXh0O0V4dC5yZXF1aXJlKFwiRXh0LmRhdGEuVHJlZVN0b3JlXCIpO0V4dC5yZXF1aXJlKFwiRXh0LmdyaWQuR3JpZFwiKTtFeHQucmVxdWlyZShcIkV4dC5wbHVnaW4uUmVzcG9uc2l2ZVwiKTsnO1xuICAgIC8vcmV0dXJuICd3aW5kb3cuRXh0ID0gRXh0O0V4dC5yZXF1aXJlKFwiRXh0LnJlYWN0LlJlbmRlcmVyQ2VsbFwiKTtFeHQucmVxdWlyZShcIkV4dC5kYXRhLlRyZWVTdG9yZVwiKTtFeHQucmVxdWlyZShcIkV4dC5ncmlkLkdyaWRcIik7RXh0LnJlcXVpcmUoXCJFeHQucGx1Z2luLlJlc3BvbnNpdmVcIik7Jztcbn1cblxuLyoqXG4gKiBDcmVhdGVzIHRoZSB3b3Jrc3BhY2UuanNvbiBmaWxlXG4gKiBAcGFyYW0ge1N0cmluZ30gc2RrIFRoZSBwYXRoIHRvIHRoZSBzZGtcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVdvcmtzcGFjZUpzb24oc2RrLCBwYWNrYWdlcywgb3V0cHV0KSB7XG4gICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgXCJmcmFtZXdvcmtzXCI6IHtcbiAgICAgICAgICAgIFwiZXh0XCI6IHBhdGgucmVsYXRpdmUob3V0cHV0LCBzZGspXG4gICAgICAgIH0sXG4gICAgICAgIFwicGFja2FnZXNcIjoge1xuICAgICAgICAgICAgXCJkaXJcIjogWycke3dvcmtzcGFjZS5kaXJ9L3BhY2thZ2VzL2xvY2FsJywnJHt3b3Jrc3BhY2UuZGlyfS9wYWNrYWdlcyddLmNvbmNhdChwYWNrYWdlcykuam9pbignLCcpLFxuICAgICAgICAgICAgXCJleHRyYWN0XCI6IFwiJHt3b3Jrc3BhY2UuZGlyfS9wYWNrYWdlcy9yZW1vdGVcIlxuICAgICAgICB9XG4gICAgfSwgbnVsbCwgNCk7XG59XG4iXX0=