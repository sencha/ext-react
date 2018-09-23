"use strict";

var _babylon = require("babylon");

var _astTraverse = _interopRequireDefault(require("ast-traverse"));

var _generator = _interopRequireDefault(require("@babel/generator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//const MODULE_PATTERN = /^@sencha\/(ext-react.*|ext-\/(classic|modern))$/;
function toXtype(str) {
  return str.toLowerCase().replace(/_/g, '-');
}

module.exports = function extractFromJSX(js) {
  const statements = []; //const types = {}
  // Aliases used for reactify
  //    const reactifyAliases = new Set([]);

  const ast = (0, _babylon.parse)(js, {
    plugins: ['jsx', 'flow', 'doExpressions', 'objectRestSpread', 'classProperties', 'exportExtensions', 'asyncGenerators', 'functionBind', 'functionSent', 'dynamicImport'],
    sourceType: 'module'
  });

  function addType(argNode) {
    var type;

    if (argNode.type === 'StringLiteral') {
      var xtype = toXtype(argNode.value);

      if (xtype != 'extreact') {
        //types[varName] = { xtype: toXtype(argNode.value) }
        type = {
          xtype: toXtype(argNode.value)
        };
      }
    } else {
      //types[varName] = { xclass: js.slice(argNode.start, argNode.end) }
      type = {
        xclass: js.slice(argNode.start, argNode.end)
      };
    }

    let config = JSON.stringify(type);
    statements.push(`Ext.create(${config})`);
  }

  (0, _astTraverse.default)(ast, {
    pre: function (node) {
      if (node.type === 'CallExpression' && node.callee && node.callee.object && node.callee.object.name === 'Ext') {
        statements.push((0, _generator.default)(node).code);
      }

      if (node.type == 'VariableDeclarator' && node.init && node.init.type === 'CallExpression' && node.init.callee) {
        if (node.init.callee.name == 'reactify') {
          for (let i = 0; i < node.init.arguments.length; i++) {
            //console.log(node.init.arguments[i].value)
            //              const tagName = node.id.elements[i].name;
            //              if (!tagName) continue;
            const valueNode = node.init.arguments[i];
            if (!valueNode) continue; //console.log(tagName)

            addType(valueNode);
          }
        }
      } // Convert React.createElement(...) calls to the equivalent Ext.create(...) calls to put in the manifest.


      if (node.type === 'CallExpressionx' && node.callee.object && node.callee.object.name === 'React' && node.callee.property.name === 'createElement') {
        //console.log(node.type)
        const [tag, props] = node.arguments;
        console.log('********');
        console.log(tag.name);
        console.log((0, _generator.default)(props).code); //return
        //let type = types[tag.name]
        //if (type) {

        let config;

        if (Array.isArray(props.properties)) {
          config = (0, _generator.default)(props).code;

          for (let key in type) {
            config = `{\n  ${key}: '${type[key]}',${config.slice(1)}`;
          }
        } else {
          config = JSON.stringify(type);
        }

        console.log(`Ext.create(${config})`); //statements.push(`Ext.create(${config})`)
        //}
      } //return
      //if (node.type == 'ExpressionStatement') {
      // if(isFile) {
      //   console.log(node.type)
      //   console.log(JSON.stringify(node))
      // }
      // if (node.type == 'ImportDeclaration') {
      //   //console.log(node.type)
      //   //console.log('node: ' + node.source.value)
      //   //console.log('option: ' + node.source.value)
      //     //if (node.source.value.match(MODULE_PATTERN)) {
      //     if (node.source.value.match('@sencha/')) {
      //       //console.log('node: ' + node.source.value)
      //       // look for: import { Grid } from '@sencha/react-modern'
      //         for (let spec of node.specifiers) {
      //             types[spec.local.name] = { xtype: toXtype(spec.imported.name) };
      //         }
      //     } else if (node.source.value === `@sencha/ext-react`) {
      //         // identify local names of reactify based on import { reactify as foo } from '@sencha/ext-react';
      //         for (let spec of node.specifiers) {
      //             if (spec.imported.name === 'reactify') {
      //                 reactifyAliases.add(spec.local.name);
      //             }
      //         }
      //     }
      // }
      // Look for reactify calls. Keep track of the names of each component so we can map JSX tags to xtypes and
      // convert props to configs so Sencha Cmd can discover automatic dependencies in the manifest.
      // if (node.type == 'VariableDeclarator' 
      // && node.init 
      // && node.init.type === 'CallExpression' 
      // && node.init.callee 
      // && reactifyAliases.has(node.init.callee.name)) {
      //   //console.log(node.type)
      //   //console.log('VariableDeclarator')
      //   if (node.id.elements) {
      //         // example: const [ Panel, Grid ] = reactify('Panel', 'Grid');
      //         for (let i = 0; i < node.id.elements.length; i++) {
      //             const tagName = node.id.elements[i].name;
      //             if (!tagName) continue;
      //             const valueNode = node.init.arguments[i];
      //             if (!valueNode) continue;
      //             addType(tagName, valueNode);
      //         }
      //     } else {
      //         // example: const Grid = reactify('grid');
      //         const varName = node.id.name;
      //         const arg = node.init.arguments && node.init.arguments[0] && node.init.arguments[0];
      //         if (varName && arg) addType(varName, arg);
      //     }
      // }

    }
  }); // ensure that all imported classes are present in the build even if they aren't used,
  // otherwise the call to reactify will fail
  // for (let key in types) {
  //   statements.push(`Ext.create(${JSON.stringify(types[key])})`)
  // }
  // console.log('\n\nstatements:')
  // console.log(statements)
  // console.log('\n\n')

  return statements;
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy96enpleHRyYWN0RnJvbUpTWC5qcyJdLCJuYW1lcyI6WyJ0b1h0eXBlIiwic3RyIiwidG9Mb3dlckNhc2UiLCJyZXBsYWNlIiwibW9kdWxlIiwiZXhwb3J0cyIsImV4dHJhY3RGcm9tSlNYIiwianMiLCJzdGF0ZW1lbnRzIiwiYXN0IiwicGx1Z2lucyIsInNvdXJjZVR5cGUiLCJhZGRUeXBlIiwiYXJnTm9kZSIsInR5cGUiLCJ4dHlwZSIsInZhbHVlIiwieGNsYXNzIiwic2xpY2UiLCJzdGFydCIsImVuZCIsImNvbmZpZyIsIkpTT04iLCJzdHJpbmdpZnkiLCJwdXNoIiwicHJlIiwibm9kZSIsImNhbGxlZSIsIm9iamVjdCIsIm5hbWUiLCJjb2RlIiwiaW5pdCIsImkiLCJhcmd1bWVudHMiLCJsZW5ndGgiLCJ2YWx1ZU5vZGUiLCJwcm9wZXJ0eSIsInRhZyIsInByb3BzIiwiY29uc29sZSIsImxvZyIsIkFycmF5IiwiaXNBcnJheSIsInByb3BlcnRpZXMiLCJrZXkiXSwibWFwcGluZ3MiOiJBQUFBOztBQUNBOztBQUNBOztBQUNBOzs7O0FBQ0E7QUFFQSxTQUFTQSxPQUFULENBQWlCQyxHQUFqQixFQUFzQjtBQUNsQixTQUFPQSxHQUFHLENBQUNDLFdBQUosR0FBa0JDLE9BQWxCLENBQTBCLElBQTFCLEVBQWdDLEdBQWhDLENBQVA7QUFDSDs7QUFFREMsTUFBTSxDQUFDQyxPQUFQLEdBQWlCLFNBQVNDLGNBQVQsQ0FBd0JDLEVBQXhCLEVBQTRCO0FBQ3pDLFFBQU1DLFVBQVUsR0FBRyxFQUFuQixDQUR5QyxDQUV6QztBQUVBO0FBQ0o7O0FBRUksUUFBTUMsR0FBRyxHQUFHLG9CQUFNRixFQUFOLEVBQVU7QUFDcEJHLElBQUFBLE9BQU8sRUFBRSxDQUNQLEtBRE8sRUFFUCxNQUZPLEVBR1AsZUFITyxFQUlQLGtCQUpPLEVBS1AsaUJBTE8sRUFNUCxrQkFOTyxFQU9QLGlCQVBPLEVBUVAsY0FSTyxFQVNQLGNBVE8sRUFVUCxlQVZPLENBRFc7QUFh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QTs7QUFDRSxZQUFJVCxNQUFKOztBQUNBLFlBQUlvQixLQUFLLENBQUNDLE9BQU4sQ0FBY0osS0FBSyxDQUFDSyxVQUFwQixDQUFKLEVBQXFDO0FBQ2pDdEIsVUFBQUEsTUFBTSxHQUFHLHdCQUFTaUIsS0FBVCxFQUFnQlIsSUFBekI7O0FBQ0EsZUFBSyxJQUFJYyxHQUFULElBQWdCOUIsSUFBaEIsRUFBc0I7QUFDbEJPLFlBQUFBLE1BQU0sR0FBSSxRQUFPdUIsR0FBSSxNQUFLOUIsSUFBSSxDQUFDOEIsR0FBRCxDQUFNLEtBQUl2QixNQUFNLENBQUNILEtBQVAsQ0FBYSxDQUFiLENBQWdCLEVBQXhEO0FBQ0g7QUFDSixTQUxELE1BS087QUFDSEcsVUFBQUEsTUFBTSxHQUFHQyxJQUFJLENBQUNDLFNBQUwsQ0FBZVQsSUFBZixDQUFUO0FBQ0g7O0FBQ0R5QixRQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBYSxjQUFhbkIsTUFBTyxHQUFqQyxFQW5COEMsQ0FvQjlDO0FBQ0Y7QUFDRCxPQXJEaUIsQ0F5RGxCO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFHRDtBQXJIVyxHQUFkLEVBdkN5QyxDQStKekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTs7QUFFQSxTQUFPYixVQUFQO0FBQ0gsQ0ExS0QiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcbmltcG9ydCB7IHBhcnNlIH0gZnJvbSAnYmFieWxvbic7XG5pbXBvcnQgdHJhdmVyc2UgZnJvbSAnYXN0LXRyYXZlcnNlJztcbmltcG9ydCBnZW5lcmF0ZSBmcm9tICdAYmFiZWwvZ2VuZXJhdG9yJztcbi8vY29uc3QgTU9EVUxFX1BBVFRFUk4gPSAvXkBzZW5jaGFcXC8oZXh0LXJlYWN0Lip8ZXh0LVxcLyhjbGFzc2ljfG1vZGVybikpJC87XG5cbmZ1bmN0aW9uIHRvWHR5cGUoc3RyKSB7XG4gICAgcmV0dXJuIHN0ci50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoL18vZywgJy0nKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBleHRyYWN0RnJvbUpTWChqcykge1xuICAgIGNvbnN0IHN0YXRlbWVudHMgPSBbXVxuICAgIC8vY29uc3QgdHlwZXMgPSB7fVxuXG4gICAgLy8gQWxpYXNlcyB1c2VkIGZvciByZWFjdGlmeVxuLy8gICAgY29uc3QgcmVhY3RpZnlBbGlhc2VzID0gbmV3IFNldChbXSk7XG5cbiAgICBjb25zdCBhc3QgPSBwYXJzZShqcywge1xuICAgICAgcGx1Z2luczogW1xuICAgICAgICAnanN4JyxcbiAgICAgICAgJ2Zsb3cnLFxuICAgICAgICAnZG9FeHByZXNzaW9ucycsXG4gICAgICAgICdvYmplY3RSZXN0U3ByZWFkJyxcbiAgICAgICAgJ2NsYXNzUHJvcGVydGllcycsXG4gICAgICAgICdleHBvcnRFeHRlbnNpb25zJyxcbiAgICAgICAgJ2FzeW5jR2VuZXJhdG9ycycsXG4gICAgICAgICdmdW5jdGlvbkJpbmQnLFxuICAgICAgICAnZnVuY3Rpb25TZW50JyxcbiAgICAgICAgJ2R5bmFtaWNJbXBvcnQnXG4gICAgICBdLFxuICAgICAgc291cmNlVHlwZTogJ21vZHVsZSdcbiAgICB9KVxuXG4gICAgZnVuY3Rpb24gYWRkVHlwZShhcmdOb2RlKSB7XG4gICAgICB2YXIgdHlwZVxuICAgICAgaWYgKGFyZ05vZGUudHlwZSA9PT0gJ1N0cmluZ0xpdGVyYWwnKSB7XG4gICAgICAgIHZhciB4dHlwZSA9IHRvWHR5cGUoYXJnTm9kZS52YWx1ZSlcbiAgICAgICAgaWYgKHh0eXBlICE9ICdleHRyZWFjdCcpIHtcbiAgICAgICAgICAvL3R5cGVzW3Zhck5hbWVdID0geyB4dHlwZTogdG9YdHlwZShhcmdOb2RlLnZhbHVlKSB9XG4gICAgICAgICAgdHlwZSA9IHsgeHR5cGU6IHRvWHR5cGUoYXJnTm9kZS52YWx1ZSkgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvL3R5cGVzW3Zhck5hbWVdID0geyB4Y2xhc3M6IGpzLnNsaWNlKGFyZ05vZGUuc3RhcnQsIGFyZ05vZGUuZW5kKSB9XG4gICAgICAgIHR5cGUgPSB7IHhjbGFzczoganMuc2xpY2UoYXJnTm9kZS5zdGFydCwgYXJnTm9kZS5lbmQpIH1cbiAgICAgIH1cbiAgICAgIGxldCBjb25maWcgPSBKU09OLnN0cmluZ2lmeSh0eXBlKVxuICAgICAgc3RhdGVtZW50cy5wdXNoKGBFeHQuY3JlYXRlKCR7Y29uZmlnfSlgKVxuICAgIH1cblxuICAgIHRyYXZlcnNlKGFzdCwge1xuICAgICAgcHJlOiBmdW5jdGlvbihub2RlKSB7XG4gICAgICAgIGlmIChub2RlLnR5cGUgPT09ICdDYWxsRXhwcmVzc2lvbidcbiAgICAgICAgJiYgbm9kZS5jYWxsZWVcbiAgICAgICAgJiYgbm9kZS5jYWxsZWUub2JqZWN0XG4gICAgICAgICYmIG5vZGUuY2FsbGVlLm9iamVjdC5uYW1lID09PSAnRXh0J1xuICAgICAgICApIHtcbiAgICAgICAgICBzdGF0ZW1lbnRzLnB1c2goZ2VuZXJhdGUobm9kZSkuY29kZSlcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChub2RlLnR5cGUgPT0gJ1ZhcmlhYmxlRGVjbGFyYXRvcicgXG4gICAgICAgICAgICAmJiBub2RlLmluaXQgXG4gICAgICAgICAgICAmJiBub2RlLmluaXQudHlwZSA9PT0gJ0NhbGxFeHByZXNzaW9uJyBcbiAgICAgICAgICAgICYmIG5vZGUuaW5pdC5jYWxsZWUgXG4gICAgICAgICkge1xuICAgICAgICAgIGlmIChub2RlLmluaXQuY2FsbGVlLm5hbWUgPT0gJ3JlYWN0aWZ5Jykge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBub2RlLmluaXQuYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgIC8vY29uc29sZS5sb2cobm9kZS5pbml0LmFyZ3VtZW50c1tpXS52YWx1ZSlcbi8vICAgICAgICAgICAgICBjb25zdCB0YWdOYW1lID0gbm9kZS5pZC5lbGVtZW50c1tpXS5uYW1lO1xuLy8gICAgICAgICAgICAgIGlmICghdGFnTmFtZSkgY29udGludWU7XG4gICAgICAgICAgICAgIGNvbnN0IHZhbHVlTm9kZSA9IG5vZGUuaW5pdC5hcmd1bWVudHNbaV07XG4gICAgICAgICAgICAgIGlmICghdmFsdWVOb2RlKSBjb250aW51ZTtcbiAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyh0YWdOYW1lKVxuICAgICAgICAgICAgICBhZGRUeXBlKHZhbHVlTm9kZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIENvbnZlcnQgUmVhY3QuY3JlYXRlRWxlbWVudCguLi4pIGNhbGxzIHRvIHRoZSBlcXVpdmFsZW50IEV4dC5jcmVhdGUoLi4uKSBjYWxscyB0byBwdXQgaW4gdGhlIG1hbmlmZXN0LlxuICAgICAgICBpZiAobm9kZS50eXBlID09PSAnQ2FsbEV4cHJlc3Npb254JyBcbiAgICAgICAgJiYgbm9kZS5jYWxsZWUub2JqZWN0IFxuICAgICAgICAmJiBub2RlLmNhbGxlZS5vYmplY3QubmFtZSA9PT0gJ1JlYWN0JyBcbiAgICAgICAgJiYgbm9kZS5jYWxsZWUucHJvcGVydHkubmFtZSA9PT0gJ2NyZWF0ZUVsZW1lbnQnKSB7XG4gICAgICAgICAgLy9jb25zb2xlLmxvZyhub2RlLnR5cGUpXG4gICAgICAgICAgY29uc3QgW3RhZywgcHJvcHNdID0gbm9kZS5hcmd1bWVudHNcblxuICAgICAgICAgIGNvbnNvbGUubG9nKCcqKioqKioqKicpXG4gICAgICAgICAgY29uc29sZS5sb2codGFnLm5hbWUpXG4gICAgICAgICAgY29uc29sZS5sb2coZ2VuZXJhdGUocHJvcHMpLmNvZGUpXG4gICAgICAgICAgLy9yZXR1cm5cbiAgICAgICAgICAvL2xldCB0eXBlID0gdHlwZXNbdGFnLm5hbWVdXG4gICAgICAgICAgLy9pZiAodHlwZSkge1xuICAgICAgICAgICAgbGV0IGNvbmZpZ1xuICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkocHJvcHMucHJvcGVydGllcykpIHtcbiAgICAgICAgICAgICAgICBjb25maWcgPSBnZW5lcmF0ZShwcm9wcykuY29kZVxuICAgICAgICAgICAgICAgIGZvciAobGV0IGtleSBpbiB0eXBlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbmZpZyA9IGB7XFxuICAke2tleX06ICcke3R5cGVba2V5XX0nLCR7Y29uZmlnLnNsaWNlKDEpfWBcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbmZpZyA9IEpTT04uc3RyaW5naWZ5KHR5cGUpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgRXh0LmNyZWF0ZSgke2NvbmZpZ30pYClcbiAgICAgICAgICAgIC8vc3RhdGVtZW50cy5wdXNoKGBFeHQuY3JlYXRlKCR7Y29uZmlnfSlgKVxuICAgICAgICAgIC8vfVxuICAgICAgICB9XG5cblxuXG4gICAgICAgIC8vcmV0dXJuXG5cblxuXG4gICAgICAgIC8vaWYgKG5vZGUudHlwZSA9PSAnRXhwcmVzc2lvblN0YXRlbWVudCcpIHtcbiAgICAgICAgLy8gaWYoaXNGaWxlKSB7XG4gICAgICAgIC8vICAgY29uc29sZS5sb2cobm9kZS50eXBlKVxuICAgICAgICAvLyAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KG5vZGUpKVxuICAgICAgICAvLyB9XG4gICAgICAgIC8vIGlmIChub2RlLnR5cGUgPT0gJ0ltcG9ydERlY2xhcmF0aW9uJykge1xuICAgICAgICAvLyAgIC8vY29uc29sZS5sb2cobm9kZS50eXBlKVxuICAgICAgICAvLyAgIC8vY29uc29sZS5sb2coJ25vZGU6ICcgKyBub2RlLnNvdXJjZS52YWx1ZSlcbiAgICAgICAgLy8gICAvL2NvbnNvbGUubG9nKCdvcHRpb246ICcgKyBub2RlLnNvdXJjZS52YWx1ZSlcbiAgICAgICAgLy8gICAgIC8vaWYgKG5vZGUuc291cmNlLnZhbHVlLm1hdGNoKE1PRFVMRV9QQVRURVJOKSkge1xuICAgICAgICAvLyAgICAgaWYgKG5vZGUuc291cmNlLnZhbHVlLm1hdGNoKCdAc2VuY2hhLycpKSB7XG4gICAgICAgIC8vICAgICAgIC8vY29uc29sZS5sb2coJ25vZGU6ICcgKyBub2RlLnNvdXJjZS52YWx1ZSlcbiAgICAgICAgLy8gICAgICAgLy8gbG9vayBmb3I6IGltcG9ydCB7IEdyaWQgfSBmcm9tICdAc2VuY2hhL3JlYWN0LW1vZGVybidcbiAgICAgICAgLy8gICAgICAgICBmb3IgKGxldCBzcGVjIG9mIG5vZGUuc3BlY2lmaWVycykge1xuICAgICAgICAvLyAgICAgICAgICAgICB0eXBlc1tzcGVjLmxvY2FsLm5hbWVdID0geyB4dHlwZTogdG9YdHlwZShzcGVjLmltcG9ydGVkLm5hbWUpIH07XG4gICAgICAgIC8vICAgICAgICAgfVxuICAgICAgICAvLyAgICAgfSBlbHNlIGlmIChub2RlLnNvdXJjZS52YWx1ZSA9PT0gYEBzZW5jaGEvZXh0LXJlYWN0YCkge1xuICAgICAgICAvLyAgICAgICAgIC8vIGlkZW50aWZ5IGxvY2FsIG5hbWVzIG9mIHJlYWN0aWZ5IGJhc2VkIG9uIGltcG9ydCB7IHJlYWN0aWZ5IGFzIGZvbyB9IGZyb20gJ0BzZW5jaGEvZXh0LXJlYWN0JztcbiAgICAgICAgLy8gICAgICAgICBmb3IgKGxldCBzcGVjIG9mIG5vZGUuc3BlY2lmaWVycykge1xuICAgICAgICAvLyAgICAgICAgICAgICBpZiAoc3BlYy5pbXBvcnRlZC5uYW1lID09PSAncmVhY3RpZnknKSB7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICByZWFjdGlmeUFsaWFzZXMuYWRkKHNwZWMubG9jYWwubmFtZSk7XG4gICAgICAgIC8vICAgICAgICAgICAgIH1cbiAgICAgICAgLy8gICAgICAgICB9XG4gICAgICAgIC8vICAgICB9XG4gICAgICAgIC8vIH1cblxuICAgICAgICAvLyBMb29rIGZvciByZWFjdGlmeSBjYWxscy4gS2VlcCB0cmFjayBvZiB0aGUgbmFtZXMgb2YgZWFjaCBjb21wb25lbnQgc28gd2UgY2FuIG1hcCBKU1ggdGFncyB0byB4dHlwZXMgYW5kXG4gICAgICAgIC8vIGNvbnZlcnQgcHJvcHMgdG8gY29uZmlncyBzbyBTZW5jaGEgQ21kIGNhbiBkaXNjb3ZlciBhdXRvbWF0aWMgZGVwZW5kZW5jaWVzIGluIHRoZSBtYW5pZmVzdC5cbiAgICAgICAgLy8gaWYgKG5vZGUudHlwZSA9PSAnVmFyaWFibGVEZWNsYXJhdG9yJyBcbiAgICAgICAgLy8gJiYgbm9kZS5pbml0IFxuICAgICAgICAvLyAmJiBub2RlLmluaXQudHlwZSA9PT0gJ0NhbGxFeHByZXNzaW9uJyBcbiAgICAgICAgLy8gJiYgbm9kZS5pbml0LmNhbGxlZSBcbiAgICAgICAgLy8gJiYgcmVhY3RpZnlBbGlhc2VzLmhhcyhub2RlLmluaXQuY2FsbGVlLm5hbWUpKSB7XG4gICAgICAgIC8vICAgLy9jb25zb2xlLmxvZyhub2RlLnR5cGUpXG4gICAgICAgIC8vICAgLy9jb25zb2xlLmxvZygnVmFyaWFibGVEZWNsYXJhdG9yJylcbiAgICAgICAgLy8gICBpZiAobm9kZS5pZC5lbGVtZW50cykge1xuICAgICAgICAvLyAgICAgICAgIC8vIGV4YW1wbGU6IGNvbnN0IFsgUGFuZWwsIEdyaWQgXSA9IHJlYWN0aWZ5KCdQYW5lbCcsICdHcmlkJyk7XG4gICAgICAgIC8vICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBub2RlLmlkLmVsZW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIC8vICAgICAgICAgICAgIGNvbnN0IHRhZ05hbWUgPSBub2RlLmlkLmVsZW1lbnRzW2ldLm5hbWU7XG4gICAgICAgIC8vICAgICAgICAgICAgIGlmICghdGFnTmFtZSkgY29udGludWU7XG5cbiAgICAgICAgLy8gICAgICAgICAgICAgY29uc3QgdmFsdWVOb2RlID0gbm9kZS5pbml0LmFyZ3VtZW50c1tpXTtcbiAgICAgICAgLy8gICAgICAgICAgICAgaWYgKCF2YWx1ZU5vZGUpIGNvbnRpbnVlO1xuXG4gICAgICAgIC8vICAgICAgICAgICAgIGFkZFR5cGUodGFnTmFtZSwgdmFsdWVOb2RlKTtcbiAgICAgICAgLy8gICAgICAgICB9XG4gICAgICAgIC8vICAgICB9IGVsc2Uge1xuICAgICAgICAvLyAgICAgICAgIC8vIGV4YW1wbGU6IGNvbnN0IEdyaWQgPSByZWFjdGlmeSgnZ3JpZCcpO1xuICAgICAgICAvLyAgICAgICAgIGNvbnN0IHZhck5hbWUgPSBub2RlLmlkLm5hbWU7XG4gICAgICAgIC8vICAgICAgICAgY29uc3QgYXJnID0gbm9kZS5pbml0LmFyZ3VtZW50cyAmJiBub2RlLmluaXQuYXJndW1lbnRzWzBdICYmIG5vZGUuaW5pdC5hcmd1bWVudHNbMF07XG4gICAgICAgIC8vICAgICAgICAgaWYgKHZhck5hbWUgJiYgYXJnKSBhZGRUeXBlKHZhck5hbWUsIGFyZyk7XG4gICAgICAgIC8vICAgICB9XG4gICAgICAgIC8vIH1cblxuXG4gICAgICB9XG4gICAgfSlcblxuICAgIC8vIGVuc3VyZSB0aGF0IGFsbCBpbXBvcnRlZCBjbGFzc2VzIGFyZSBwcmVzZW50IGluIHRoZSBidWlsZCBldmVuIGlmIHRoZXkgYXJlbid0IHVzZWQsXG4gICAgLy8gb3RoZXJ3aXNlIHRoZSBjYWxsIHRvIHJlYWN0aWZ5IHdpbGwgZmFpbFxuICAgIC8vIGZvciAobGV0IGtleSBpbiB0eXBlcykge1xuICAgIC8vICAgc3RhdGVtZW50cy5wdXNoKGBFeHQuY3JlYXRlKCR7SlNPTi5zdHJpbmdpZnkodHlwZXNba2V5XSl9KWApXG4gICAgLy8gfVxuXG4gICAgLy8gY29uc29sZS5sb2coJ1xcblxcbnN0YXRlbWVudHM6JylcbiAgICAvLyBjb25zb2xlLmxvZyhzdGF0ZW1lbnRzKVxuICAgIC8vIGNvbnNvbGUubG9nKCdcXG5cXG4nKVxuXG4gICAgcmV0dXJuIHN0YXRlbWVudHNcbn07XG4iXX0=