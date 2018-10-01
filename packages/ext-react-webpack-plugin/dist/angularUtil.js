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
    extPath: 'ext-angular',
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
  return statements; //temporary until angular parse is written

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9hbmd1bGFyVXRpbC5qcyJdLCJuYW1lcyI6WyJnZXRWYWxpZGF0ZU9wdGlvbnMiLCJnZXREZWZhdWx0T3B0aW9ucyIsInBvcnQiLCJlbWl0IiwiYnJvd3NlciIsInByb2ZpbGUiLCJlbnZpcm9ubWVudCIsInZlcmJvc2UiLCJ0b29sa2l0IiwicGFja2FnZXMiLCJnZXREZWZhdWx0VmFycyIsImZpcnN0VGltZSIsImZpcnN0Q29tcGlsZSIsImJyb3dzZXJDb3VudCIsIm1hbmlmZXN0IiwiZXh0UGF0aCIsInBsdWdpbkVycm9ycyIsImRlcHMiLCJyZWJ1aWxkIiwidG9YdHlwZSIsInN0ciIsInRvTG93ZXJDYXNlIiwicmVwbGFjZSIsImV4dHJhY3RGcm9tU291cmNlIiwianMiLCJnZW5lcmF0ZSIsInJlcXVpcmUiLCJkZWZhdWx0IiwicGFyc2UiLCJ0cmF2ZXJzZSIsInN0YXRlbWVudHMiLCJhc3QiLCJwbHVnaW5zIiwic291cmNlVHlwZSIsImFkZFR5cGUiLCJhcmdOb2RlIiwidHlwZSIsInh0eXBlIiwidmFsdWUiLCJ4Y2xhc3MiLCJzbGljZSIsInN0YXJ0IiwiZW5kIiwidW5kZWZpbmVkIiwiY29uZmlnIiwiSlNPTiIsInN0cmluZ2lmeSIsInB1c2giLCJwcmUiLCJub2RlIiwiY2FsbGVlIiwib2JqZWN0IiwibmFtZSIsImNvZGUiLCJpbml0IiwiaSIsImFyZ3VtZW50cyIsImxlbmd0aCIsInZhbHVlTm9kZSJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7QUFFTyxTQUFTQSxrQkFBVCxHQUE4QjtBQUNuQyxTQUFPO0FBQ0wsWUFBUSxRQURIO0FBRUwsa0JBQWM7QUFDWixtQkFBZTtBQUFDLGdCQUFRLENBQUUsUUFBRjtBQUFULE9BREg7QUFFWixjQUFlO0FBQUMsZ0JBQVEsQ0FBRSxTQUFGO0FBQVQsT0FGSDtBQUdaLGNBQWU7QUFBQyxnQkFBUSxDQUFFLFNBQUY7QUFBVCxPQUhIO0FBSVosaUJBQWU7QUFBQyxnQkFBUSxDQUFFLFNBQUY7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QWxCO0FBQ0EsZ0JBQUksQ0FBQ0csU0FBTCxFQUFnQjtBQUNoQnhCLFlBQUFBLE9BQU8sQ0FBQ3dCLFNBQUQsQ0FBUDtBQUNEO0FBQ0Q7QUFDSCxPQXBCaUIsQ0FzQmxCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNEO0FBdkNXLEdBQU4sQ0FBUjtBQXlDQSxTQUFPNUIsVUFBUDtBQUNEIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCJcblxuZXhwb3J0IGZ1bmN0aW9uIGdldFZhbGlkYXRlT3B0aW9ucygpIHtcbiAgcmV0dXJuIHtcbiAgICBcInR5cGVcIjogXCJvYmplY3RcIixcbiAgICBcInByb3BlcnRpZXNcIjoge1xuICAgICAgXCJmcmFtZXdvcmtcIjogICB7XCJ0eXBlXCI6IFsgXCJzdHJpbmdcIiBdfSxcbiAgICAgIFwicG9ydFwiOiAgICAgICAge1widHlwZVwiOiBbIFwiaW50ZWdlclwiIF19LFxuICAgICAgXCJlbWl0XCI6ICAgICAgICB7XCJ0eXBlXCI6IFsgXCJib29sZWFuXCIgXX0sXG4gICAgICBcImJyb3dzZXJcIjogICAgIHtcInR5cGVcIjogWyBcImJvb2xlYW5cIiBdfSxcbiAgICAgIFwicHJvZmlsZVwiOiAgICAge1widHlwZVwiOiBbIFwic3RyaW5nXCIgXX0sXG4gICAgICBcImVudmlyb25tZW50XCI6IHtcInR5cGVcIjogWyBcInN0cmluZ1wiIF19LFxuICAgICAgXCJ2ZXJib3NlXCI6ICAgICB7XCJ0eXBlXCI6IFsgXCJzdHJpbmdcIiBdfSxcbiAgICAgIFwidGhlbWVcIjogICAgICAge1widHlwZVwiOiBbIFwic3RyaW5nXCIgXX0sXG4gICAgICBcInRvb2xraXRcIjogICAgIHtcInR5cGVcIjogWyBcInN0cmluZ1wiIF19LFxuICAgICAgXCJwYWNrYWdlc1wiOiAgICB7XCJ0eXBlXCI6IFsgXCJzdHJpbmdcIiwgXCJhcnJheVwiIF19XG4gICAgfSxcbiAgICBcImFkZGl0aW9uYWxQcm9wZXJ0aWVzXCI6IGZhbHNlXG4gICAgLy8gXCJlcnJvck1lc3NhZ2VcIjoge1xuICAgIC8vICAgXCJvcHRpb25cIjogXCJzaG91bGQgYmUge0Jvb2xlYW59IChodHRwczovZ2l0aHViLmNvbS9vcmcvcmVwbyNhbmNob3IpXCJcbiAgICAvLyB9XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldERlZmF1bHRPcHRpb25zKCkge1xuICByZXR1cm4ge1xuICAgIHBvcnQ6IDE5NjIsXG4gICAgZW1pdDogdHJ1ZSxcbiAgICBicm93c2VyOiB0cnVlLFxuICAgIHByb2ZpbGU6ICcnLCBcbiAgICBlbnZpcm9ubWVudDogJ2RldmVsb3BtZW50JywgXG4gICAgdmVyYm9zZTogJ25vJyxcbiAgICB0b29sa2l0OiAnbW9kZXJuJyxcbiAgICBwYWNrYWdlczogbnVsbFxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXREZWZhdWx0VmFycygpIHtcbiAgcmV0dXJuIHtcbiAgICBmaXJzdFRpbWUgOiB0cnVlLFxuICAgIGZpcnN0Q29tcGlsZTogdHJ1ZSxcbiAgICBicm93c2VyQ291bnQgOiAwLFxuICAgIG1hbmlmZXN0OiBudWxsLFxuICAgIGV4dFBhdGg6ICdleHQtYW5ndWxhcicsXG4gICAgcGx1Z2luRXJyb3JzOiBbXSxcbiAgICBkZXBzOiBbXSxcbiAgICByZWJ1aWxkOiB0cnVlXG4gIH1cbn1cblxuXG5cblxuZnVuY3Rpb24gdG9YdHlwZShzdHIpIHtcbiAgcmV0dXJuIHN0ci50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoL18vZywgJy0nKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZXh0cmFjdEZyb21Tb3VyY2UoanMpIHtcbiAgdmFyIGdlbmVyYXRlID0gcmVxdWlyZShcIkBiYWJlbC9nZW5lcmF0b3JcIikuZGVmYXVsdFxuICB2YXIgcGFyc2UgPSByZXF1aXJlKFwiYmFieWxvblwiKS5wYXJzZVxuICB2YXIgdHJhdmVyc2UgPSByZXF1aXJlKFwiYXN0LXRyYXZlcnNlXCIpXG4gIGNvbnN0IHN0YXRlbWVudHMgPSBbXVxuICByZXR1cm4gc3RhdGVtZW50cyAgLy90ZW1wb3JhcnkgdW50aWwgYW5ndWxhciBwYXJzZSBpcyB3cml0dGVuXG4gIFxuICBjb25zdCBhc3QgPSBwYXJzZShqcywge1xuICAgIHBsdWdpbnM6IFtcbiAgICAgICdqc3gnLFxuICAgICAgJ2Zsb3cnLFxuICAgICAgJ2RvRXhwcmVzc2lvbnMnLFxuICAgICAgJ29iamVjdFJlc3RTcHJlYWQnLFxuICAgICAgJ2NsYXNzUHJvcGVydGllcycsXG4gICAgICAnZXhwb3J0RXh0ZW5zaW9ucycsXG4gICAgICAnYXN5bmNHZW5lcmF0b3JzJyxcbiAgICAgICdmdW5jdGlvbkJpbmQnLFxuICAgICAgJ2Z1bmN0aW9uU2VudCcsXG4gICAgICAnZHluYW1pY0ltcG9ydCdcbiAgICBdLFxuICAgIHNvdXJjZVR5cGU6ICdtb2R1bGUnXG4gIH0pXG5cbiAgZnVuY3Rpb24gYWRkVHlwZShhcmdOb2RlKSB7XG4gICAgdmFyIHR5cGVcbiAgICBpZiAoYXJnTm9kZS50eXBlID09PSAnU3RyaW5nTGl0ZXJhbCcpIHtcbiAgICAgIHZhciB4dHlwZSA9IHRvWHR5cGUoYXJnTm9kZS52YWx1ZSlcbiAgICAgIGlmICh4dHlwZSAhPSAnZXh0cmVhY3QnKSB7XG4gICAgICAgIHR5cGUgPSB7IHh0eXBlOiB0b1h0eXBlKGFyZ05vZGUudmFsdWUpIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdHlwZSA9IHsgeGNsYXNzOiBqcy5zbGljZShhcmdOb2RlLnN0YXJ0LCBhcmdOb2RlLmVuZCkgfVxuICAgIH1cbiAgICBpZiAodHlwZSAhPSB1bmRlZmluZWQpIHtcbiAgICAgIGxldCBjb25maWcgPSBKU09OLnN0cmluZ2lmeSh0eXBlKVxuICAgICAgc3RhdGVtZW50cy5wdXNoKGBFeHQuY3JlYXRlKCR7Y29uZmlnfSlgKVxuICAgIH1cbiAgfVxuXG4gIHRyYXZlcnNlKGFzdCwge1xuICAgIHByZTogZnVuY3Rpb24obm9kZSkge1xuICAgICAgaWYgKG5vZGUudHlwZSA9PT0gJ0NhbGxFeHByZXNzaW9uJ1xuICAgICAgICAgICYmIG5vZGUuY2FsbGVlXG4gICAgICAgICAgJiYgbm9kZS5jYWxsZWUub2JqZWN0XG4gICAgICAgICAgJiYgbm9kZS5jYWxsZWUub2JqZWN0Lm5hbWUgPT09ICdFeHQnXG4gICAgICApIHtcbiAgICAgICAgc3RhdGVtZW50cy5wdXNoKGdlbmVyYXRlKG5vZGUpLmNvZGUpXG4gICAgICB9XG4gICAgICBpZiAobm9kZS50eXBlID09ICdWYXJpYWJsZURlY2xhcmF0b3InIFxuICAgICAgICAgICYmIG5vZGUuaW5pdCBcbiAgICAgICAgICAmJiBub2RlLmluaXQudHlwZSA9PT0gJ0NhbGxFeHByZXNzaW9uJyBcbiAgICAgICAgICAmJiBub2RlLmluaXQuY2FsbGVlIFxuICAgICAgKSB7XG4gICAgICAgIGlmIChub2RlLmluaXQuY2FsbGVlLm5hbWUgPT0gJ3JlYWN0aWZ5Jykge1xuICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbm9kZS5pbml0LmFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgdmFsdWVOb2RlID0gbm9kZS5pbml0LmFyZ3VtZW50c1tpXTtcbiAgICAgICAgICAgIGlmICghdmFsdWVOb2RlKSBjb250aW51ZTtcbiAgICAgICAgICAgIGFkZFR5cGUodmFsdWVOb2RlKVxuICAgICAgICAgIH1cbiAgICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gLy8gQ29udmVydCBSZWFjdC5jcmVhdGVFbGVtZW50KC4uLikgY2FsbHMgdG8gdGhlIGVxdWl2YWxlbnQgRXh0LmNyZWF0ZSguLi4pIGNhbGxzIHRvIHB1dCBpbiB0aGUgbWFuaWZlc3QuXG4gICAgICAvLyBpZiAobm9kZS50eXBlID09PSAnQ2FsbEV4cHJlc3Npb254JyBcbiAgICAgIC8vICAgICAmJiBub2RlLmNhbGxlZS5vYmplY3QgXG4gICAgICAvLyAgICAgJiYgbm9kZS5jYWxsZWUub2JqZWN0Lm5hbWUgPT09ICdSZWFjdCcgXG4gICAgICAvLyAgICAgJiYgbm9kZS5jYWxsZWUucHJvcGVydHkubmFtZSA9PT0gJ2NyZWF0ZUVsZW1lbnQnKSB7XG4gICAgICAvLyAgIGNvbnN0IFtwcm9wc10gPSBub2RlLmFyZ3VtZW50c1xuICAgICAgLy8gICBsZXQgY29uZmlnXG4gICAgICAvLyAgIGlmIChBcnJheS5pc0FycmF5KHByb3BzLnByb3BlcnRpZXMpKSB7XG4gICAgICAvLyAgICAgY29uZmlnID0gZ2VuZXJhdGUocHJvcHMpLmNvZGVcbiAgICAgIC8vICAgICBmb3IgKGxldCBrZXkgaW4gdHlwZSkge1xuICAgICAgLy8gICAgICAgY29uZmlnID0gYHtcXG4gICR7a2V5fTogJyR7dHlwZVtrZXldfScsJHtjb25maWcuc2xpY2UoMSl9YFxuICAgICAgLy8gICAgIH1cbiAgICAgIC8vICAgfSBlbHNlIHtcbiAgICAgIC8vICAgICBjb25maWcgPSBKU09OLnN0cmluZ2lmeSh0eXBlKVxuICAgICAgLy8gICB9XG4gICAgICAvLyB9XG4gICAgfVxuICB9KVxuICByZXR1cm4gc3RhdGVtZW50c1xufVxuIl19