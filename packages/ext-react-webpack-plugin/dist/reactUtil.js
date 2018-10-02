"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getValidateOptions = getValidateOptions;
exports.getDefaultOptions = getDefaultOptions;
exports.getDefaultVars = getDefaultVars;
exports.extractFromSource = extractFromSource;

function getValidateOptions() {
  return {
    "type": "object",
    "properties": {
      "framework": {
        "type": ["string"]
      },
      "port": {
        "type": ["integer"]
      },
      "emit": {
        "type": ["boolean"]
      },
      "browser": {
        "type": ["boolean"]
      },
      "extRoot": {
        "type": ["string"]
      },
      "extFolder": {
        "type": ["string"]
      },
      "profile": {
        "type": ["string"]
      },
      "environment": {
        "type": ["string"]
      },
      "verbose": {
        "type": ["string"]
      },
      "theme": {
        "type": ["string"]
      },
      "toolkit": {
        "type": ["string"]
      },
      "packages": {
        "type": ["string", "array"]
      }
    },
    "additionalProperties": false // "errorMessage": {
    //   "option": "should be {Boolean} (https:/github.com/org/repo#anchor)"
    // }

  };
}

function getDefaultOptions() {
  return {
    port: 1962,
    emit: true,
    browser: true,
    extRoot: 'ext',
    extFolder: '../../node_modules/@sencha',
    profile: '',
    environment: 'development',
    verbose: 'no',
    toolkit: 'modern',
    packages: null
  };
}

function getDefaultVars() {
  return {
    firstTime: true,
    firstCompile: true,
    browserCount: 0,
    manifest: null,
    extPath: 'ext-react',
    pluginErrors: [],
    deps: [],
    rebuild: true
  };
}

function toXtype(str) {
  return str.toLowerCase().replace(/_/g, '-');
}

function extractFromSource(js) {
  var generate = require("@babel/generator").default;

  var parse = require("babylon").parse;

  var traverse = require("ast-traverse");

  const statements = [];
  const ast = parse(js, {
    plugins: ['jsx', 'flow', 'doExpressions', 'objectRestSpread', 'classProperties', 'exportExtensions', 'asyncGenerators', 'functionBind', 'functionSent', 'dynamicImport'],
    sourceType: 'module'
  });

  function addType(argNode) {
    var type;

    if (argNode.type === 'StringLiteral') {
      var xtype = toXtype(argNode.value);

      if (xtype != 'extreact') {
        type = {
          xtype: toXtype(argNode.value)
        };
      }
    } else {
      type = {
        xclass: js.slice(argNode.start, argNode.end)
      };
    }

    if (type != undefined) {
      let config = JSON.stringify(type);
      statements.push(`Ext.create(${config})`);
    }
  }

  traverse(ast, {
    pre: function (node) {
      if (node.type === 'CallExpression' && node.callee && node.callee.object && node.callee.object.name === 'Ext') {
        statements.push(generate(node).code);
      }

      if (node.type == 'VariableDeclarator' && node.init && node.init.type === 'CallExpression' && node.init.callee) {
        if (node.init.callee.name == 'reactify') {
          for (let i = 0; i < node.init.arguments.length; i++) {
            const valueNode = node.init.arguments[i];
            if (!valueNode) continue;
            addType(valueNode);
          }
        }
      } // // Convert React.createElement(...) calls to the equivalent Ext.create(...) calls to put in the manifest.
      // if (node.type === 'CallExpressionx' 
      //     && node.callee.object 
      //     && node.callee.object.name === 'React' 
      //     && node.callee.property.name === 'createElement') {
      //   const [props] = node.arguments
      //   let config
      //   if (Array.isArray(props.properties)) {
      //     config = generate(props).code
      //     for (let key in type) {
      //       config = `{\n  ${key}: '${type[key]}',${config.slice(1)}`
      //     }
      //   } else {
      //     config = JSON.stringify(type)
      //   }
      // }

    }
  });
  return statements;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9yZWFjdFV0aWwuanMiXSwibmFtZXMiOlsiZ2V0VmFsaWRhdGVPcHRpb25zIiwiZ2V0RGVmYXVsdE9wdGlvbnMiLCJwb3J0IiwiZW1pdCIsImJyb3dzZXIiLCJleHRSb290IiwiZXh0Rm9sZGVyIiwicHJvZmlsZSIsImVudmlyb25tZW50IiwidmVyYm9zZSIsInRvb2xraXQiLCJwYWNrYWdlcyIsImdldERlZmF1bHRWYXJzIiwiZmlyc3RUaW1lIiwiZmlyc3RDb21waWxlIiwiYnJvd3NlckNvdW50IiwibWFuaWZlc3QiLCJleHRQYXRoIiwicGx1Z2luRXJyb3JzIiwiZGVwcyIsInJlYnVpbGQiLCJ0b1h0eXBlIiwic3RyIiwidG9Mb3dlckNhc2UiLCJyZXBsYWNlIiwiZXh0cmFjdEZyb21Tb3VyY2UiLCJqcyIsImdlbmVyYXRlIiwicmVxdWlyZSIsImRlZmF1bHQiLCJwYXJzZSIsInRyYXZlcnNlIiwic3RhdGVtZW50cyIsImFzdCIsInBsdWdpbnMiLCJzb3VyY2VUeXBlIiwiYWRkVHlwZSIsImFyZ05vZGUiLCJ0eXBlIiwieHR5cGUiLCJ2YWx1ZSIsInhjbGFzcyIsInNsaWNlIiwic3RhcnQiLCJlbmQiLCJ1bmRlZmluZWQiLCJjb25maWciLCJKU09OIiwic3RyaW5naWZ5IiwicHVzaCIsInByZSIsIm5vZGUiLCJjYWxsZWUiLCJvYmplY3QiLCJuYW1lIiwiY29kZSIsImluaXQiLCJpIiwiYXJndW1lbnRzIiwibGVuZ3RoIiwidmFsdWVOb2RlIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7OztBQUVPLFNBQVNBLGtCQUFULEdBQThCO0FBQ25DLFNBQU87QUFDTCxZQUFRLFFBREg7QUFFTCxrQkFBYztBQUNaLG1CQUFlO0FBQUMsZ0JBQVEsQ0FBRSxRQUFGO0FBQVQsT0FESDtBQUVaLGNBQWU7QUFBQyxnQkFBUSxDQUFFLFNBQUY7QUFBVCxPQUZIO0FBR1osY0FBZTtBQUFDLGdCQUFRLENBQUUsU0FBRjtBQUFULE9BSEg7QUFJWixpQkFBZTtB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TixJQUFJLENBQUNLLElBQUwsQ0FBVUUsU0FBVixDQUFvQkMsTUFBeEMsRUFBZ0RGLENBQUMsRUFBakQsRUFBcUQ7QUFDbkQsa0JBQU1HLFNBQVMsR0FBR1QsSUFBSSxDQUFDSyxJQUFMLENBQVVFLFNBQVYsQ0FBb0JELENBQXBCLENBQWxCO0FBQ0EsZ0JBQUksQ0FBQ0csU0FBTCxFQUFnQjtBQUNoQnhCLFlBQUFBLE9BQU8sQ0FBQ3dCLFNBQUQsQ0FBUDtBQUNEO0FBQ0Q7QUFDSCxPQXBCaUIsQ0FzQmxCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNEO0FBdkNXLEdBQU4sQ0FBUjtBQXlDQSxTQUFPNUIsVUFBUDtBQUNEIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCJcblxuZXhwb3J0IGZ1bmN0aW9uIGdldFZhbGlkYXRlT3B0aW9ucygpIHtcbiAgcmV0dXJuIHtcbiAgICBcInR5cGVcIjogXCJvYmplY3RcIixcbiAgICBcInByb3BlcnRpZXNcIjoge1xuICAgICAgXCJmcmFtZXdvcmtcIjogICB7XCJ0eXBlXCI6IFsgXCJzdHJpbmdcIiBdfSxcbiAgICAgIFwicG9ydFwiOiAgICAgICAge1widHlwZVwiOiBbIFwiaW50ZWdlclwiIF19LFxuICAgICAgXCJlbWl0XCI6ICAgICAgICB7XCJ0eXBlXCI6IFsgXCJib29sZWFuXCIgXX0sXG4gICAgICBcImJyb3dzZXJcIjogICAgIHtcInR5cGVcIjogWyBcImJvb2xlYW5cIiBdfSxcbiAgICAgIFwiZXh0Um9vdFwiOiAgICAge1widHlwZVwiOiBbIFwic3RyaW5nXCIgXX0sXG4gICAgICBcImV4dEZvbGRlclwiOiAgIHtcInR5cGVcIjogWyBcInN0cmluZ1wiIF19LFxuICAgICAgXCJwcm9maWxlXCI6ICAgICB7XCJ0eXBlXCI6IFsgXCJzdHJpbmdcIiBdfSxcbiAgICAgIFwiZW52aXJvbm1lbnRcIjoge1widHlwZVwiOiBbIFwic3RyaW5nXCIgXX0sXG4gICAgICBcInZlcmJvc2VcIjogICAgIHtcInR5cGVcIjogWyBcInN0cmluZ1wiIF19LFxuICAgICAgXCJ0aGVtZVwiOiAgICAgICB7XCJ0eXBlXCI6IFsgXCJzdHJpbmdcIiBdfSxcbiAgICAgIFwidG9vbGtpdFwiOiAgICAge1widHlwZVwiOiBbIFwic3RyaW5nXCIgXX0sXG4gICAgICBcInBhY2thZ2VzXCI6ICAgIHtcInR5cGVcIjogWyBcInN0cmluZ1wiLCBcImFycmF5XCIgXX1cbiAgICB9LFxuICAgIFwiYWRkaXRpb25hbFByb3BlcnRpZXNcIjogZmFsc2VcbiAgICAvLyBcImVycm9yTWVzc2FnZVwiOiB7XG4gICAgLy8gICBcIm9wdGlvblwiOiBcInNob3VsZCBiZSB7Qm9vbGVhbn0gKGh0dHBzOi9naXRodWIuY29tL29yZy9yZXBvI2FuY2hvcilcIlxuICAgIC8vIH1cbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0RGVmYXVsdE9wdGlvbnMoKSB7XG4gIHJldHVybiB7XG4gICAgcG9ydDogMTk2MixcbiAgICBlbWl0OiB0cnVlLFxuICAgIGJyb3dzZXI6IHRydWUsXG4gICAgZXh0Um9vdDogJ2V4dCcsXG4gICAgZXh0Rm9sZGVyOiAnLi4vLi4vbm9kZV9tb2R1bGVzL0BzZW5jaGEnLFxuICAgIHByb2ZpbGU6ICcnLCBcbiAgICBlbnZpcm9ubWVudDogJ2RldmVsb3BtZW50JywgXG4gICAgdmVyYm9zZTogJ25vJyxcbiAgICB0b29sa2l0OiAnbW9kZXJuJyxcbiAgICBwYWNrYWdlczogbnVsbFxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXREZWZhdWx0VmFycygpIHtcbiAgcmV0dXJuIHtcbiAgICBmaXJzdFRpbWUgOiB0cnVlLFxuICAgIGZpcnN0Q29tcGlsZTogdHJ1ZSxcbiAgICBicm93c2VyQ291bnQgOiAwLFxuICAgIG1hbmlmZXN0OiBudWxsLFxuICAgIGV4dFBhdGg6ICdleHQtcmVhY3QnLFxuICAgIHBsdWdpbkVycm9yczogW10sXG4gICAgZGVwczogW10sXG4gICAgcmVidWlsZDogdHJ1ZVxuICB9XG59XG5cblxuXG5cbmZ1bmN0aW9uIHRvWHR5cGUoc3RyKSB7XG4gIHJldHVybiBzdHIudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC9fL2csICctJylcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGV4dHJhY3RGcm9tU291cmNlKGpzKSB7XG4gIHZhciBnZW5lcmF0ZSA9IHJlcXVpcmUoXCJAYmFiZWwvZ2VuZXJhdG9yXCIpLmRlZmF1bHRcbiAgdmFyIHBhcnNlID0gcmVxdWlyZShcImJhYnlsb25cIikucGFyc2VcbiAgdmFyIHRyYXZlcnNlID0gcmVxdWlyZShcImFzdC10cmF2ZXJzZVwiKVxuICBjb25zdCBzdGF0ZW1lbnRzID0gW11cbiAgXG4gIGNvbnN0IGFzdCA9IHBhcnNlKGpzLCB7XG4gICAgcGx1Z2luczogW1xuICAgICAgJ2pzeCcsXG4gICAgICAnZmxvdycsXG4gICAgICAnZG9FeHByZXNzaW9ucycsXG4gICAgICAnb2JqZWN0UmVzdFNwcmVhZCcsXG4gICAgICAnY2xhc3NQcm9wZXJ0aWVzJyxcbiAgICAgICdleHBvcnRFeHRlbnNpb25zJyxcbiAgICAgICdhc3luY0dlbmVyYXRvcnMnLFxuICAgICAgJ2Z1bmN0aW9uQmluZCcsXG4gICAgICAnZnVuY3Rpb25TZW50JyxcbiAgICAgICdkeW5hbWljSW1wb3J0J1xuICAgIF0sXG4gICAgc291cmNlVHlwZTogJ21vZHVsZSdcbiAgfSlcblxuICBmdW5jdGlvbiBhZGRUeXBlKGFyZ05vZGUpIHtcbiAgICB2YXIgdHlwZVxuICAgIGlmIChhcmdOb2RlLnR5cGUgPT09ICdTdHJpbmdMaXRlcmFsJykge1xuICAgICAgdmFyIHh0eXBlID0gdG9YdHlwZShhcmdOb2RlLnZhbHVlKVxuICAgICAgaWYgKHh0eXBlICE9ICdleHRyZWFjdCcpIHtcbiAgICAgICAgdHlwZSA9IHsgeHR5cGU6IHRvWHR5cGUoYXJnTm9kZS52YWx1ZSkgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0eXBlID0geyB4Y2xhc3M6IGpzLnNsaWNlKGFyZ05vZGUuc3RhcnQsIGFyZ05vZGUuZW5kKSB9XG4gICAgfVxuICAgIGlmICh0eXBlICE9IHVuZGVmaW5lZCkge1xuICAgICAgbGV0IGNvbmZpZyA9IEpTT04uc3RyaW5naWZ5KHR5cGUpXG4gICAgICBzdGF0ZW1lbnRzLnB1c2goYEV4dC5jcmVhdGUoJHtjb25maWd9KWApXG4gICAgfVxuICB9XG5cbiAgdHJhdmVyc2UoYXN0LCB7XG4gICAgcHJlOiBmdW5jdGlvbihub2RlKSB7XG4gICAgICBpZiAobm9kZS50eXBlID09PSAnQ2FsbEV4cHJlc3Npb24nXG4gICAgICAgICAgJiYgbm9kZS5jYWxsZWVcbiAgICAgICAgICAmJiBub2RlLmNhbGxlZS5vYmplY3RcbiAgICAgICAgICAmJiBub2RlLmNhbGxlZS5vYmplY3QubmFtZSA9PT0gJ0V4dCdcbiAgICAgICkge1xuICAgICAgICBzdGF0ZW1lbnRzLnB1c2goZ2VuZXJhdGUobm9kZSkuY29kZSlcbiAgICAgIH1cbiAgICAgIGlmIChub2RlLnR5cGUgPT0gJ1ZhcmlhYmxlRGVjbGFyYXRvcicgXG4gICAgICAgICAgJiYgbm9kZS5pbml0IFxuICAgICAgICAgICYmIG5vZGUuaW5pdC50eXBlID09PSAnQ2FsbEV4cHJlc3Npb24nIFxuICAgICAgICAgICYmIG5vZGUuaW5pdC5jYWxsZWUgXG4gICAgICApIHtcbiAgICAgICAgaWYgKG5vZGUuaW5pdC5jYWxsZWUubmFtZSA9PSAncmVhY3RpZnknKSB7XG4gICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBub2RlLmluaXQuYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCB2YWx1ZU5vZGUgPSBub2RlLmluaXQuYXJndW1lbnRzW2ldO1xuICAgICAgICAgICAgaWYgKCF2YWx1ZU5vZGUpIGNvbnRpbnVlO1xuICAgICAgICAgICAgYWRkVHlwZSh2YWx1ZU5vZGUpXG4gICAgICAgICAgfVxuICAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyAvLyBDb252ZXJ0IFJlYWN0LmNyZWF0ZUVsZW1lbnQoLi4uKSBjYWxscyB0byB0aGUgZXF1aXZhbGVudCBFeHQuY3JlYXRlKC4uLikgY2FsbHMgdG8gcHV0IGluIHRoZSBtYW5pZmVzdC5cbiAgICAgIC8vIGlmIChub2RlLnR5cGUgPT09ICdDYWxsRXhwcmVzc2lvbngnIFxuICAgICAgLy8gICAgICYmIG5vZGUuY2FsbGVlLm9iamVjdCBcbiAgICAgIC8vICAgICAmJiBub2RlLmNhbGxlZS5vYmplY3QubmFtZSA9PT0gJ1JlYWN0JyBcbiAgICAgIC8vICAgICAmJiBub2RlLmNhbGxlZS5wcm9wZXJ0eS5uYW1lID09PSAnY3JlYXRlRWxlbWVudCcpIHtcbiAgICAgIC8vICAgY29uc3QgW3Byb3BzXSA9IG5vZGUuYXJndW1lbnRzXG4gICAgICAvLyAgIGxldCBjb25maWdcbiAgICAgIC8vICAgaWYgKEFycmF5LmlzQXJyYXkocHJvcHMucHJvcGVydGllcykpIHtcbiAgICAgIC8vICAgICBjb25maWcgPSBnZW5lcmF0ZShwcm9wcykuY29kZVxuICAgICAgLy8gICAgIGZvciAobGV0IGtleSBpbiB0eXBlKSB7XG4gICAgICAvLyAgICAgICBjb25maWcgPSBge1xcbiAgJHtrZXl9OiAnJHt0eXBlW2tleV19Jywke2NvbmZpZy5zbGljZSgxKX1gXG4gICAgICAvLyAgICAgfVxuICAgICAgLy8gICB9IGVsc2Uge1xuICAgICAgLy8gICAgIGNvbmZpZyA9IEpTT04uc3RyaW5naWZ5KHR5cGUpXG4gICAgICAvLyAgIH1cbiAgICAgIC8vIH1cbiAgICB9XG4gIH0pXG4gIHJldHVybiBzdGF0ZW1lbnRzXG59XG4iXX0=