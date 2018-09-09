"use strict";

var _babylon = require("babylon");

var _astTraverse = _interopRequireDefault(require("ast-traverse"));

var _generator = _interopRequireDefault(require("@babel/generator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const MODULE_PATTERN = /^@extjs\/(ext-react.*|reactor\/(classic|modern))$/;

function toXtype(str) {
  return str.toLowerCase().replace(/_/g, '-');
}
/**
 * Extracts Ext.create equivalents from jsx tags so that cmd knows which classes to include in the bundle
 * @param {String} js The javascript code
 * @param {Compilation} compilation The webpack compilation object
 * @returns {Array} An array of Ext.create statements
 */


module.exports = function extractFromJSX(js, compilation, module, reactVersion) {
  // var isFile = module.resource.includes("Home.js")
  // if(isFile) { 
  //   console.log(module.resource)
  //   console.log('****************') 
  //   console.log(js) 
  //   console.log('****************') 
  // }
  const statements = [];
  const types = {}; // Aliases used for reactify

  const reactifyAliases = new Set([]);
  const ast = (0, _babylon.parse)(js, {
    plugins: ['jsx', 'flow', 'doExpressions', 'objectRestSpread', 'classProperties', 'exportExtensions', 'asyncGenerators', 'functionBind', 'functionSent', 'dynamicImport'],
    sourceType: 'module'
  });
  /**
   * Adds a type mapping for a reactify call
   * @param {String} varName The name of the local variable being defined.
   * @param {Node} reactifyArgNode The argument passed to reactify()
   */

  function addType(varName, reactifyArgNode) {
    if (reactifyArgNode.type === 'StringLiteral') {
      types[varName] = {
        xtype: toXtype(reactifyArgNode.value)
      };
    } else {
      types[varName] = {
        xclass: js.slice(reactifyArgNode.start, reactifyArgNode.end)
      };
    }
  }

  (0, _astTraverse.default)(ast, {
    pre: function (node) {
      //if (node.type == 'ExpressionStatement') {
      // if(isFile) {
      //   console.log(node.type)
      //   console.log(JSON.stringify(node))
      // }
      if (node.type == 'ImportDeclaration') {
        //console.log(node.type)
        //console.log('node: ' + node.source.value)
        //console.log('option: ' + node.source.value)
        if (node.source.value.match(MODULE_PATTERN)) {
          //console.log('node: ' + node.source.value)
          // look for: import { Grid } from '@sencha/react-modern'
          for (let spec of node.specifiers) {
            types[spec.local.name] = {
              xtype: toXtype(spec.imported.name)
            };
          }
        } else if (node.source.value === `@sencha/ext-react${reactVersion}`) {
          // identify local names of reactify based on import { reactify as foo } from '@sencha/ext-react';
          for (let spec of node.specifiers) {
            if (spec.imported.name === 'reactify') {
              reactifyAliases.add(spec.local.name);
            }
          }
        }
      } // Look for reactify calls. Keep track of the names of each component so we can map JSX tags to xtypes and
      // convert props to configs so Sencha Cmd can discover automatic dependencies in the manifest.


      if (node.type == 'VariableDeclarator' && node.init && node.init.type === 'CallExpression' && node.init.callee && reactifyAliases.has(node.init.callee.name)) {
        //console.log(node.type)
        //console.log('VariableDeclarator')
        if (node.id.elements) {
          // example: const [ Panel, Grid ] = reactify('Panel', 'Grid');
          for (let i = 0; i < node.id.elements.length; i++) {
            const tagName = node.id.elements[i].name;
            if (!tagName) continue;
            const valueNode = node.init.arguments[i];
            if (!valueNode) continue;
            addType(tagName, valueNode);
          }
        } else {
          // example: const Grid = reactify('grid');
          const varName = node.id.name;
          const arg = node.init.arguments && node.init.arguments[0] && node.init.arguments[0];
          if (varName && arg) addType(varName, arg);
        }
      } // Convert React.createElement(...) calls to the equivalent Ext.create(...) calls to put in the manifest.


      if (node.type === 'CallExpression' && node.callee.object && node.callee.object.name === 'React' && node.callee.property.name === 'createElement') {
        //console.log(node.type)
        const [tag, props] = node.arguments;
        let type = types[tag.name];

        if (type) {
          let config;

          if (Array.isArray(props.properties)) {
            config = (0, _generator.default)(props).code;

            for (let key in type) {
              config = `{\n  ${key}: '${type[key]}',${config.slice(1)}`;
            }
          } else {
            config = JSON.stringify(type);
          }

          statements.push(`Ext.create(${config})`);
        }
      }
    }
  }); // ensure that all imported classes are present in the build even if they aren't used,
  // otherwise the call to reactify will fail

  for (let key in types) {
    statements.push(`Ext.create(${JSON.stringify(types[key])})`);
  } //console.log('\n\nstatements:')
  //console.log(statements)
  //console.log('\n\n')


  return statements;
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9leHRyYWN0RnJvbUpTWC5qcyJdLCJuYW1lcyI6WyJNT0RVTEVfUEFUVEVSTiIsInRvWHR5cGUiLCJzdHIiLCJ0b0xvd2VyQ2FzZSIsInJlcGxhY2UiLCJtb2R1bGUiLCJleHBvcnRzIiwiZXh0cmFjdEZyb21KU1giLCJqcyIsImNvbXBpbGF0aW9uIiwicmVhY3RWZXJzaW9uIiwic3RhdGVtZW50cyIsInR5cGVzIiwicmVhY3RpZnlBbGlhc2VzIiwiU2V0IiwiYXN0IiwicGx1Z2lucyIsInNvdXJjZVR5cGUiLCJhZGRUeXBlIiwidmFyTmFtZSIsInJlYWN0aWZ5QXJnTm9kZSIsInR5cGUiLCJ4dHlwZSIsInZhbHVlIiwieGNsYXNzIiwic2xpY2UiLCJzdGFydCIsImVuZCIsInByZSIsIm5vZGUiLCJzb3VyY2UiLCJtYXRjaCIsInNwZWMiLCJzcGVjaWZpZXJzIiwibG9jYWwiLCJuYW1lIiwiaW1wb3J0ZWQiLCJhZGQiLCJpbml0IiwiY2FsbGVlIiwiaGFzIiwiaWQiLCJlbGVtZW50cyIsImkiLCJsZW5ndGgiLCJ0YWdOYW1lIiwidmFsdWVOb2RlIiwiYXJndW1lbnRzIiwiYXJnIiwib2JqZWN0IiwicHJvcGVydHkiLCJ0YWciLCJwcm9wcyIsImNvbmZpZyIsIkFycmF5IiwiaXNBcnJheSIsInByb3BlcnRpZXMiLCJjb2RlIiwia2V5IiwiSlNPTiIsInN0cmluZ2lmeSIsInB1c2giXSwibWFwcGluZ3MiOiJBQUFBOztBQUVBOztBQUNBOztBQUNBOzs7O0FBRUEsTUFBTUEsY0FBYyxHQUFHLG1EQUF2Qjs7QUFFQSxTQUFTQyxPQUFULENBQWlCQyxHQUFqQixFQUFzQjtBQUNsQixTQUFPQSxHQUFHLENBQUNDLFdBQUosR0FBa0JDLE9BQWxCLENBQTBCLElBQTFCLEVBQWdDLEdBQWhDLENBQVA7QUFDSDtBQUVEOzs7Ozs7OztBQU1BQyxNQUFNLENBQUNDLE9BQVAsR0FBaUIsU0FBU0MsY0FBVCxDQUF3QkMsRUFBeEIsRUFBNEJDLFdBQTVCLEVBQXlD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S0FBTixJQUFldkIsSUFBSSxDQUFDa0IsU0FBMUI7QUFDQSxZQUFJMUIsSUFBSSxHQUFHVCxLQUFLLENBQUN1QyxHQUFHLENBQUNoQixJQUFMLENBQWhCOztBQUNBLFlBQUlkLElBQUosRUFBVTtBQUNSLGNBQUlnQyxNQUFKOztBQUNBLGNBQUlDLEtBQUssQ0FBQ0MsT0FBTixDQUFjSCxLQUFLLENBQUNJLFVBQXBCLENBQUosRUFBcUM7QUFDakNILFlBQUFBLE1BQU0sR0FBRyx3QkFBU0QsS0FBVCxFQUFnQkssSUFBekI7O0FBQ0EsaUJBQUssSUFBSUMsR0FBVCxJQUFnQnJDLElBQWhCLEVBQXNCO0FBQ2xCZ0MsY0FBQUEsTUFBTSxHQUFJLFFBQU9LLEdBQUksTUFBS3JDLElBQUksQ0FBQ3FDLEdBQUQsQ0FBTSxLQUFJTCxNQUFNLENBQUM1QixLQUFQLENBQWEsQ0FBYixDQUFnQixFQUF4RDtBQUNIO0FBQ0osV0FMRCxNQUtPO0FBQ0g0QixZQUFBQSxNQUFNLEdBQUdNLElBQUksQ0FBQ0MsU0FBTCxDQUFldkMsSUFBZixDQUFUO0FBQ0g7O0FBQ0RWLFVBQUFBLFVBQVUsQ0FBQ2tELElBQVgsQ0FBaUIsY0FBYVIsTUFBTyxHQUFyQztBQUNEO0FBQ0Y7QUFDRjtBQTdFUyxHQUFkLEVBNUM0RSxDQTRINUU7QUFDQTs7QUFDQSxPQUFLLElBQUlLLEdBQVQsSUFBZ0I5QyxLQUFoQixFQUF1QjtBQUNyQkQsSUFBQUEsVUFBVSxDQUFDa0QsSUFBWCxDQUFpQixjQUFhRixJQUFJLENBQUNDLFNBQUwsQ0FBZWhELEtBQUssQ0FBQzhDLEdBQUQsQ0FBcEIsQ0FBMkIsR0FBekQ7QUFDRCxHQWhJMkUsQ0FrSWhGO0FBQ0E7QUFDQTs7O0FBRUksU0FBTy9DLFVBQVA7QUFDSCxDQXZJRCIsInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgeyBwYXJzZSB9IGZyb20gJ2JhYnlsb24nO1xuaW1wb3J0IHRyYXZlcnNlIGZyb20gJ2FzdC10cmF2ZXJzZSc7XG5pbXBvcnQgZ2VuZXJhdGUgZnJvbSAnQGJhYmVsL2dlbmVyYXRvcic7XG5cbmNvbnN0IE1PRFVMRV9QQVRURVJOID0gL15AZXh0anNcXC8oZXh0LXJlYWN0Lip8cmVhY3RvclxcLyhjbGFzc2ljfG1vZGVybikpJC87XG5cbmZ1bmN0aW9uIHRvWHR5cGUoc3RyKSB7XG4gICAgcmV0dXJuIHN0ci50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoL18vZywgJy0nKTtcbn1cblxuLyoqXG4gKiBFeHRyYWN0cyBFeHQuY3JlYXRlIGVxdWl2YWxlbnRzIGZyb20ganN4IHRhZ3Mgc28gdGhhdCBjbWQga25vd3Mgd2hpY2ggY2xhc3NlcyB0byBpbmNsdWRlIGluIHRoZSBidW5kbGVcbiAqIEBwYXJhbSB7U3RyaW5nfSBqcyBUaGUgamF2YXNjcmlwdCBjb2RlXG4gKiBAcGFyYW0ge0NvbXBpbGF0aW9ufSBjb21waWxhdGlvbiBUaGUgd2VicGFjayBjb21waWxhdGlvbiBvYmplY3RcbiAqIEByZXR1cm5zIHtBcnJheX0gQW4gYXJyYXkgb2YgRXh0LmNyZWF0ZSBzdGF0ZW1lbnRzXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZXh0cmFjdEZyb21KU1goanMsIGNvbXBpbGF0aW9uLCBtb2R1bGUsIHJlYWN0VmVyc2lvbikge1xuICAvLyB2YXIgaXNGaWxlID0gbW9kdWxlLnJlc291cmNlLmluY2x1ZGVzKFwiSG9tZS5qc1wiKVxuICAvLyBpZihpc0ZpbGUpIHsgXG4gIC8vICAgY29uc29sZS5sb2cobW9kdWxlLnJlc291cmNlKVxuICAvLyAgIGNvbnNvbGUubG9nKCcqKioqKioqKioqKioqKioqJykgXG4gIC8vICAgY29uc29sZS5sb2coanMpIFxuICAvLyAgIGNvbnNvbGUubG9nKCcqKioqKioqKioqKioqKioqJykgXG4gIC8vIH1cbiBcbiAgICBjb25zdCBzdGF0ZW1lbnRzID0gW107XG4gICAgY29uc3QgdHlwZXMgPSB7fTtcblxuICAgIC8vIEFsaWFzZXMgdXNlZCBmb3IgcmVhY3RpZnlcbiAgICBjb25zdCByZWFjdGlmeUFsaWFzZXMgPSBuZXcgU2V0KFtdKTtcblxuICAgIGNvbnN0IGFzdCA9IHBhcnNlKGpzLCB7XG4gICAgICAgIHBsdWdpbnM6IFtcbiAgICAgICAgICAgICdqc3gnLFxuICAgICAgICAgICAgJ2Zsb3cnLFxuICAgICAgICAgICAgJ2RvRXhwcmVzc2lvbnMnLFxuICAgICAgICAgICAgJ29iamVjdFJlc3RTcHJlYWQnLFxuICAgICAgICAgICAgJ2NsYXNzUHJvcGVydGllcycsXG4gICAgICAgICAgICAnZXhwb3J0RXh0ZW5zaW9ucycsXG4gICAgICAgICAgICAnYXN5bmNHZW5lcmF0b3JzJyxcbiAgICAgICAgICAgICdmdW5jdGlvbkJpbmQnLFxuICAgICAgICAgICAgJ2Z1bmN0aW9uU2VudCcsXG4gICAgICAgICAgICAnZHluYW1pY0ltcG9ydCdcbiAgICAgICAgXSxcbiAgICAgICAgc291cmNlVHlwZTogJ21vZHVsZSdcbiAgICB9KTtcblxuICAgIC8qKlxuICAgICAqIEFkZHMgYSB0eXBlIG1hcHBpbmcgZm9yIGEgcmVhY3RpZnkgY2FsbFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSB2YXJOYW1lIFRoZSBuYW1lIG9mIHRoZSBsb2NhbCB2YXJpYWJsZSBiZWluZyBkZWZpbmVkLlxuICAgICAqIEBwYXJhbSB7Tm9kZX0gcmVhY3RpZnlBcmdOb2RlIFRoZSBhcmd1bWVudCBwYXNzZWQgdG8gcmVhY3RpZnkoKVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGFkZFR5cGUodmFyTmFtZSwgcmVhY3RpZnlBcmdOb2RlKSB7XG4gICAgICAgIGlmIChyZWFjdGlmeUFyZ05vZGUudHlwZSA9PT0gJ1N0cmluZ0xpdGVyYWwnKSB7XG4gICAgICAgICAgICB0eXBlc1t2YXJOYW1lXSA9IHsgeHR5cGU6IHRvWHR5cGUocmVhY3RpZnlBcmdOb2RlLnZhbHVlKSB9O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdHlwZXNbdmFyTmFtZV0gPSB7IHhjbGFzczoganMuc2xpY2UocmVhY3RpZnlBcmdOb2RlLnN0YXJ0LCByZWFjdGlmeUFyZ05vZGUuZW5kKSB9O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdHJhdmVyc2UoYXN0LCB7XG4gICAgICAgIHByZTogZnVuY3Rpb24obm9kZSkge1xuICAgICAgICAgIC8vaWYgKG5vZGUudHlwZSA9PSAnRXhwcmVzc2lvblN0YXRlbWVudCcpIHtcbiAgICAgICAgICAvLyBpZihpc0ZpbGUpIHtcbiAgICAgICAgICAvLyAgIGNvbnNvbGUubG9nKG5vZGUudHlwZSlcbiAgICAgICAgICAvLyAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KG5vZGUpKVxuICAgICAgICAgIC8vIH1cbiAgICAgICAgICBpZiAobm9kZS50eXBlID09ICdJbXBvcnREZWNsYXJhdGlvbicpIHtcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2cobm9kZS50eXBlKVxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZygnbm9kZTogJyArIG5vZGUuc291cmNlLnZhbHVlKVxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZygnb3B0aW9uOiAnICsgbm9kZS5zb3VyY2UudmFsdWUpXG5cbiAgICAgICAgICAgICAgaWYgKG5vZGUuc291cmNlLnZhbHVlLm1hdGNoKE1PRFVMRV9QQVRURVJOKSkge1xuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ25vZGU6ICcgKyBub2RlLnNvdXJjZS52YWx1ZSlcbiAgICAgICAgICAgICAgICAvLyBsb29rIGZvcjogaW1wb3J0IHsgR3JpZCB9IGZyb20gJ0BzZW5jaGEvcmVhY3QtbW9kZXJuJ1xuICAgICAgICAgICAgICAgICAgZm9yIChsZXQgc3BlYyBvZiBub2RlLnNwZWNpZmllcnMpIHtcbiAgICAgICAgICAgICAgICAgICAgICB0eXBlc1tzcGVjLmxvY2FsLm5hbWVdID0geyB4dHlwZTogdG9YdHlwZShzcGVjLmltcG9ydGVkLm5hbWUpIH07XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAobm9kZS5zb3VyY2UudmFsdWUgPT09IGBAc2VuY2hhL2V4dC1yZWFjdCR7cmVhY3RWZXJzaW9ufWApIHtcbiAgICAgICAgICAgICAgICAgIC8vIGlkZW50aWZ5IGxvY2FsIG5hbWVzIG9mIHJlYWN0aWZ5IGJhc2VkIG9uIGltcG9ydCB7IHJlYWN0aWZ5IGFzIGZvbyB9IGZyb20gJ0BzZW5jaGEvZXh0LXJlYWN0JztcbiAgICAgICAgICAgICAgICAgIGZvciAobGV0IHNwZWMgb2Ygbm9kZS5zcGVjaWZpZXJzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgaWYgKHNwZWMuaW1wb3J0ZWQubmFtZSA9PT0gJ3JlYWN0aWZ5Jykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdGlmeUFsaWFzZXMuYWRkKHNwZWMubG9jYWwubmFtZSk7XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gTG9vayBmb3IgcmVhY3RpZnkgY2FsbHMuIEtlZXAgdHJhY2sgb2YgdGhlIG5hbWVzIG9mIGVhY2ggY29tcG9uZW50IHNvIHdlIGNhbiBtYXAgSlNYIHRhZ3MgdG8geHR5cGVzIGFuZFxuICAgICAgICAgIC8vIGNvbnZlcnQgcHJvcHMgdG8gY29uZmlncyBzbyBTZW5jaGEgQ21kIGNhbiBkaXNjb3ZlciBhdXRvbWF0aWMgZGVwZW5kZW5jaWVzIGluIHRoZSBtYW5pZmVzdC5cbiAgICAgICAgICBpZiAobm9kZS50eXBlID09ICdWYXJpYWJsZURlY2xhcmF0b3InIFxuICAgICAgICAgICYmIG5vZGUuaW5pdCBcbiAgICAgICAgICAmJiBub2RlLmluaXQudHlwZSA9PT0gJ0NhbGxFeHByZXNzaW9uJyBcbiAgICAgICAgICAmJiBub2RlLmluaXQuY2FsbGVlIFxuICAgICAgICAgICYmIHJlYWN0aWZ5QWxpYXNlcy5oYXMobm9kZS5pbml0LmNhbGxlZS5uYW1lKSkge1xuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhub2RlLnR5cGUpXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdWYXJpYWJsZURlY2xhcmF0b3InKVxuICAgICAgICAgICAgaWYgKG5vZGUuaWQuZWxlbWVudHMpIHtcbiAgICAgICAgICAgICAgICAgIC8vIGV4YW1wbGU6IGNvbnN0IFsgUGFuZWwsIEdyaWQgXSA9IHJlYWN0aWZ5KCdQYW5lbCcsICdHcmlkJyk7XG4gICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5vZGUuaWQuZWxlbWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICBjb25zdCB0YWdOYW1lID0gbm9kZS5pZC5lbGVtZW50c1tpXS5uYW1lO1xuICAgICAgICAgICAgICAgICAgICAgIGlmICghdGFnTmFtZSkgY29udGludWU7XG5cbiAgICAgICAgICAgICAgICAgICAgICBjb25zdCB2YWx1ZU5vZGUgPSBub2RlLmluaXQuYXJndW1lbnRzW2ldO1xuICAgICAgICAgICAgICAgICAgICAgIGlmICghdmFsdWVOb2RlKSBjb250aW51ZTtcblxuICAgICAgICAgICAgICAgICAgICAgIGFkZFR5cGUodGFnTmFtZSwgdmFsdWVOb2RlKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIC8vIGV4YW1wbGU6IGNvbnN0IEdyaWQgPSByZWFjdGlmeSgnZ3JpZCcpO1xuICAgICAgICAgICAgICAgICAgY29uc3QgdmFyTmFtZSA9IG5vZGUuaWQubmFtZTtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IGFyZyA9IG5vZGUuaW5pdC5hcmd1bWVudHMgJiYgbm9kZS5pbml0LmFyZ3VtZW50c1swXSAmJiBub2RlLmluaXQuYXJndW1lbnRzWzBdO1xuICAgICAgICAgICAgICAgICAgaWYgKHZhck5hbWUgJiYgYXJnKSBhZGRUeXBlKHZhck5hbWUsIGFyZyk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBDb252ZXJ0IFJlYWN0LmNyZWF0ZUVsZW1lbnQoLi4uKSBjYWxscyB0byB0aGUgZXF1aXZhbGVudCBFeHQuY3JlYXRlKC4uLikgY2FsbHMgdG8gcHV0IGluIHRoZSBtYW5pZmVzdC5cbiAgICAgICAgICBpZiAobm9kZS50eXBlID09PSAnQ2FsbEV4cHJlc3Npb24nIFxuICAgICAgICAgICYmIG5vZGUuY2FsbGVlLm9iamVjdCBcbiAgICAgICAgICAmJiBub2RlLmNhbGxlZS5vYmplY3QubmFtZSA9PT0gJ1JlYWN0JyBcbiAgICAgICAgICAmJiBub2RlLmNhbGxlZS5wcm9wZXJ0eS5uYW1lID09PSAnY3JlYXRlRWxlbWVudCcpIHtcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2cobm9kZS50eXBlKVxuICAgICAgICAgICAgY29uc3QgW3RhZywgcHJvcHNdID0gbm9kZS5hcmd1bWVudHM7XG4gICAgICAgICAgICBsZXQgdHlwZSA9IHR5cGVzW3RhZy5uYW1lXTtcbiAgICAgICAgICAgIGlmICh0eXBlKSB7XG4gICAgICAgICAgICAgIGxldCBjb25maWc7XG4gICAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KHByb3BzLnByb3BlcnRpZXMpKSB7XG4gICAgICAgICAgICAgICAgICBjb25maWcgPSBnZW5lcmF0ZShwcm9wcykuY29kZTtcbiAgICAgICAgICAgICAgICAgIGZvciAobGV0IGtleSBpbiB0eXBlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgY29uZmlnID0gYHtcXG4gICR7a2V5fTogJyR7dHlwZVtrZXldfScsJHtjb25maWcuc2xpY2UoMSl9YDtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIGNvbmZpZyA9IEpTT04uc3RyaW5naWZ5KHR5cGUpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHN0YXRlbWVudHMucHVzaChgRXh0LmNyZWF0ZSgke2NvbmZpZ30pYCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyBlbnN1cmUgdGhhdCBhbGwgaW1wb3J0ZWQgY2xhc3NlcyBhcmUgcHJlc2VudCBpbiB0aGUgYnVpbGQgZXZlbiBpZiB0aGV5IGFyZW4ndCB1c2VkLFxuICAgIC8vIG90aGVyd2lzZSB0aGUgY2FsbCB0byByZWFjdGlmeSB3aWxsIGZhaWxcbiAgICBmb3IgKGxldCBrZXkgaW4gdHlwZXMpIHtcbiAgICAgIHN0YXRlbWVudHMucHVzaChgRXh0LmNyZWF0ZSgke0pTT04uc3RyaW5naWZ5KHR5cGVzW2tleV0pfSlgKVxuICAgIH1cblxuLy9jb25zb2xlLmxvZygnXFxuXFxuc3RhdGVtZW50czonKVxuLy9jb25zb2xlLmxvZyhzdGF0ZW1lbnRzKVxuLy9jb25zb2xlLmxvZygnXFxuXFxuJylcblxuICAgIHJldHVybiBzdGF0ZW1lbnRzO1xufTtcbiJdfQ==