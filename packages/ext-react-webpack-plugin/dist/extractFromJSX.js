"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _babylon = require('babylon');

var _astTraverse = require('ast-traverse');

var _astTraverse2 = _interopRequireDefault(_astTraverse);

var _babelGenerator = require('babel-generator');

var _babelGenerator2 = _interopRequireDefault(_babelGenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MODULE_PATTERN = /^@extjs\/(ext-react.*|reactor\/(classic|modern))$/;

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

    var statements = [];
    var types = {};

    // Aliases used for reactify
    var reactifyAliases = new Set([]);

    var ast = (0, _babylon.parse)(js, {
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
            types[varName] = { xtype: toXtype(reactifyArgNode.value) };
        } else {
            types[varName] = { xclass: js.slice(reactifyArgNode.start, reactifyArgNode.end) };
        }
    }

    (0, _astTraverse2.default)(ast, {
        pre: function pre(node) {
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
                    var _iteratorNormalCompletion = true;
                    var _didIteratorError = false;
                    var _iteratorError = undefined;

                    try {
                        for (var _iterator = node.specifiers[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                            var spec = _step.value;

                            types[spec.local.name] = { xtype: toXtype(spec.imported.name) };
                        }
                    } catch (err) {
                        _didIteratorError = true;
                        _iteratorError = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion && _iterator.return) {
                                _iterator.return();
                            }
                        } finally {
                            if (_didIteratorError) {
                                throw _iteratorError;
                            }
                        }
                    }
                } else if (node.source.value === '@sencha/ext-react' + reactVersion) {
                    // identify local names of reactify based on import { reactify as foo } from '@sencha/ext-react';
                    var _iteratorNormalCompletion2 = true;
                    var _didIteratorError2 = false;
                    var _iteratorError2 = undefined;

                    try {
                        for (var _iterator2 = node.specifiers[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                            var _spec = _step2.value;

                            if (_spec.imported.name === 'reactify') {
                                reactifyAliases.add(_spec.local.name);
                            }
                        }
                    } catch (err) {
                        _didIteratorError2 = true;
                        _iteratorError2 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion2 && _iterator2.return) {
                                _iterator2.return();
                            }
                        } finally {
                            if (_didIteratorError2) {
                                throw _iteratorError2;
                            }
                        }
                    }
                }
            }

            // Look for reactify calls. Keep track of the names of each component so we can map JSX tags to xtypes and
            // convert props to configs so Sencha Cmd can discover automatic dependencies in the manifest.
            if (node.type == 'VariableDeclarator' && node.init && node.init.type === 'CallExpression' && node.init.callee && reactifyAliases.has(node.init.callee.name)) {
                //console.log(node.type)
                //console.log('VariableDeclarator')
                if (node.id.elements) {
                    // example: const [ Panel, Grid ] = reactify('Panel', 'Grid');
                    for (var i = 0; i < node.id.elements.length; i++) {
                        var tagName = node.id.elements[i].name;
                        if (!tagName) continue;

                        var valueNode = node.init.arguments[i];
                        if (!valueNode) continue;

                        addType(tagName, valueNode);
                    }
                } else {
                    // example: const Grid = reactify('grid');
                    var varName = node.id.name;
                    var arg = node.init.arguments && node.init.arguments[0] && node.init.arguments[0];
                    if (varName && arg) addType(varName, arg);
                }
            }

            // Convert React.createElement(...) calls to the equivalent Ext.create(...) calls to put in the manifest.
            if (node.type === 'CallExpression' && node.callee.object && node.callee.object.name === 'React' && node.callee.property.name === 'createElement') {
                //console.log(node.type)
                var _node$arguments = _slicedToArray(node.arguments, 2),
                    tag = _node$arguments[0],
                    props = _node$arguments[1];

                var type = types[tag.name];
                if (type) {
                    var config = void 0;
                    if (Array.isArray(props.properties)) {
                        config = (0, _babelGenerator2.default)(props).code;
                        for (var key in type) {
                            config = '{\n  ' + key + ': \'' + type[key] + '\',' + config.slice(1);
                        }
                    } else {
                        config = JSON.stringify(type);
                    }
                    statements.push('Ext.create(' + config + ')');
                }
            }
        }
    });

    // ensure that all imported classes are present in the build even if they aren't used,
    // otherwise the call to reactify will fail
    for (var key in types) {
        statements.push('Ext.create(' + JSON.stringify(types[key]) + ')');
    }

    //console.log('\n\nstatements:')
    //console.log(statements)
    //console.log('\n\n')

    return statements;
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9leHRyYWN0RnJvbUpTWC5qcyJdLCJuYW1lcyI6WyJNT0RVTEVfUEFUVEVSTiIsInRvWHR5cGUiLCJzdHIiLCJ0b0xvd2VyQ2FzZSIsInJlcGxhY2UiLCJtb2R1bGUiLCJleHBvcnRzIiwiZXh0cmFjdEZyb21KU1giLCJqcyIsImNvbXBpbGF0aW9uIiwicmVhY3RWZXJzaW9uIiwic3RhdGVtZW50cyIsInR5cGVzIiwicmVhY3RpZnlBbGlhc2VzIiwiU2V0IiwiYXN0IiwicGx1Z2lucyIsInNvdXJjZVR5cGUiLCJhZGRUeXBlIiwidmFyTmFtZSIsInJlYWN0aWZ5QXJnTm9kZSIsInR5cGUiLCJ4dHlwZSIsInZhbHVlIiwieGNsYXNzIiwic2xpY2UiLCJzdGFydCIsImVuZCIsInByZSIsIm5vZGUiLCJzb3VyY2UiLCJtYXRjaCIsInNwZWNpZmllcnMiLCJzcGVjIiwibG9jYWwiLCJuYW1lIiwiaW1wb3J0ZWQiLCJhZGQiLCJpbml0IiwiY2FsbGVlIiwiaGFzIiwiaWQiLCJlbGVtZW50cyIsImkiLCJsZW5ndGgiLCJ0YWdOYW1lIiwidmFsdWVOb2RlIiwiYXJndW1lbnRzIiwiYXJnIiwib2JqZWN0IiwicHJvcGVydHkiLCJ0YWciLCJwcm9wcyIsImNvbmZpZyIsIkFycmF5IiwiaXNBcnJheSIsInByb3BlcnRpZXMiLCJjb2RlIiwia2V5IiwiSlNPTiIsInN0cmluZ2lmeSIsInB1c2giXSwibWFwcGluZ3MiOiJBQUFBOzs7O0FBRUE7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBRUEsSUFBTUEsaUJBQWlCLG1EQUF2Qjs7QUFFQSxTQUFTQyxPQUFULENBQWlCQyxHQUFqQixFQUFzQjtBQUNsQixXQUFPQSxJQUFJQyxXQUFKLEdBQWtCQyxPQUFsQixDQUEwQixJQUExQixFQUFnQyxHQUFoQyxDQUFQO0FBQ0g7O0FBRUQ7Ozs7OztBQU1BQyxPQUFPQyxPQUFQLEdBQWlCLFNBQVNDLGNBQVQsQ0FBd0JDLEVBQXhCLEVBQTRCQyxXQUE1QixFQUF5Q0osTUFBekMs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OEJBQVNELEtBQVQsRUFBZ0JLLElBQXpCO0FBQ0EsNkJBQUssSUFBSUMsR0FBVCxJQUFnQnJDLElBQWhCLEVBQXNCO0FBQ2xCZ0MsK0NBQWlCSyxHQUFqQixZQUEwQnJDLEtBQUtxQyxHQUFMLENBQTFCLFdBQXdDTCxPQUFPNUIsS0FBUCxDQUFhLENBQWIsQ0FBeEM7QUFDSDtBQUNKLHFCQUxELE1BS087QUFDSDRCLGlDQUFTTSxLQUFLQyxTQUFMLENBQWV2QyxJQUFmLENBQVQ7QUFDSDtBQUNEViwrQkFBV2tELElBQVgsaUJBQThCUixNQUE5QjtBQUNEO0FBQ0Y7QUFDRjtBQTdFUyxLQUFkOztBQWdGQTtBQUNBO0FBQ0EsU0FBSyxJQUFJSyxHQUFULElBQWdCOUMsS0FBaEIsRUFBdUI7QUFDckJELG1CQUFXa0QsSUFBWCxpQkFBOEJGLEtBQUtDLFNBQUwsQ0FBZWhELE1BQU04QyxHQUFOLENBQWYsQ0FBOUI7QUFDRDs7QUFFTDtBQUNBO0FBQ0E7O0FBRUksV0FBTy9DLFVBQVA7QUFDSCxDQXZJRCIsImZpbGUiOiJleHRyYWN0RnJvbUpTWC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgeyBwYXJzZSB9IGZyb20gJ2JhYnlsb24nO1xuaW1wb3J0IHRyYXZlcnNlIGZyb20gJ2FzdC10cmF2ZXJzZSc7XG5pbXBvcnQgZ2VuZXJhdGUgZnJvbSAnYmFiZWwtZ2VuZXJhdG9yJztcblxuY29uc3QgTU9EVUxFX1BBVFRFUk4gPSAvXkBleHRqc1xcLyhleHQtcmVhY3QuKnxyZWFjdG9yXFwvKGNsYXNzaWN8bW9kZXJuKSkkLztcblxuZnVuY3Rpb24gdG9YdHlwZShzdHIpIHtcbiAgICByZXR1cm4gc3RyLnRvTG93ZXJDYXNlKCkucmVwbGFjZSgvXy9nLCAnLScpO1xufVxuXG4vKipcbiAqIEV4dHJhY3RzIEV4dC5jcmVhdGUgZXF1aXZhbGVudHMgZnJvbSBqc3ggdGFncyBzbyB0aGF0IGNtZCBrbm93cyB3aGljaCBjbGFzc2VzIHRvIGluY2x1ZGUgaW4gdGhlIGJ1bmRsZVxuICogQHBhcmFtIHtTdHJpbmd9IGpzIFRoZSBqYXZhc2NyaXB0IGNvZGVcbiAqIEBwYXJhbSB7Q29tcGlsYXRpb259IGNvbXBpbGF0aW9uIFRoZSB3ZWJwYWNrIGNvbXBpbGF0aW9uIG9iamVjdFxuICogQHJldHVybnMge0FycmF5fSBBbiBhcnJheSBvZiBFeHQuY3JlYXRlIHN0YXRlbWVudHNcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBleHRyYWN0RnJvbUpTWChqcywgY29tcGlsYXRpb24sIG1vZHVsZSwgcmVhY3RWZXJzaW9uKSB7XG4gIC8vIHZhciBpc0ZpbGUgPSBtb2R1bGUucmVzb3VyY2UuaW5jbHVkZXMoXCJIb21lLmpzXCIpXG4gIC8vIGlmKGlzRmlsZSkgeyBcbiAgLy8gICBjb25zb2xlLmxvZyhtb2R1bGUucmVzb3VyY2UpXG4gIC8vICAgY29uc29sZS5sb2coJyoqKioqKioqKioqKioqKionKSBcbiAgLy8gICBjb25zb2xlLmxvZyhqcykgXG4gIC8vICAgY29uc29sZS5sb2coJyoqKioqKioqKioqKioqKionKSBcbiAgLy8gfVxuIFxuICAgIGNvbnN0IHN0YXRlbWVudHMgPSBbXTtcbiAgICBjb25zdCB0eXBlcyA9IHt9O1xuXG4gICAgLy8gQWxpYXNlcyB1c2VkIGZvciByZWFjdGlmeVxuICAgIGNvbnN0IHJlYWN0aWZ5QWxpYXNlcyA9IG5ldyBTZXQoW10pO1xuXG4gICAgY29uc3QgYXN0ID0gcGFyc2UoanMsIHtcbiAgICAgICAgcGx1Z2luczogW1xuICAgICAgICAgICAgJ2pzeCcsXG4gICAgICAgICAgICAnZmxvdycsXG4gICAgICAgICAgICAnZG9FeHByZXNzaW9ucycsXG4gICAgICAgICAgICAnb2JqZWN0UmVzdFNwcmVhZCcsXG4gICAgICAgICAgICAnY2xhc3NQcm9wZXJ0aWVzJyxcbiAgICAgICAgICAgICdleHBvcnRFeHRlbnNpb25zJyxcbiAgICAgICAgICAgICdhc3luY0dlbmVyYXRvcnMnLFxuICAgICAgICAgICAgJ2Z1bmN0aW9uQmluZCcsXG4gICAgICAgICAgICAnZnVuY3Rpb25TZW50JyxcbiAgICAgICAgICAgICdkeW5hbWljSW1wb3J0J1xuICAgICAgICBdLFxuICAgICAgICBzb3VyY2VUeXBlOiAnbW9kdWxlJ1xuICAgIH0pO1xuXG4gICAgLyoqXG4gICAgICogQWRkcyBhIHR5cGUgbWFwcGluZyBmb3IgYSByZWFjdGlmeSBjYWxsXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHZhck5hbWUgVGhlIG5hbWUgb2YgdGhlIGxvY2FsIHZhcmlhYmxlIGJlaW5nIGRlZmluZWQuXG4gICAgICogQHBhcmFtIHtOb2RlfSByZWFjdGlmeUFyZ05vZGUgVGhlIGFyZ3VtZW50IHBhc3NlZCB0byByZWFjdGlmeSgpXG4gICAgICovXG4gICAgZnVuY3Rpb24gYWRkVHlwZSh2YXJOYW1lLCByZWFjdGlmeUFyZ05vZGUpIHtcbiAgICAgICAgaWYgKHJlYWN0aWZ5QXJnTm9kZS50eXBlID09PSAnU3RyaW5nTGl0ZXJhbCcpIHtcbiAgICAgICAgICAgIHR5cGVzW3Zhck5hbWVdID0geyB4dHlwZTogdG9YdHlwZShyZWFjdGlmeUFyZ05vZGUudmFsdWUpIH07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0eXBlc1t2YXJOYW1lXSA9IHsgeGNsYXNzOiBqcy5zbGljZShyZWFjdGlmeUFyZ05vZGUuc3RhcnQsIHJlYWN0aWZ5QXJnTm9kZS5lbmQpIH07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB0cmF2ZXJzZShhc3QsIHtcbiAgICAgICAgcHJlOiBmdW5jdGlvbihub2RlKSB7XG4gICAgICAgICAgLy9pZiAobm9kZS50eXBlID09ICdFeHByZXNzaW9uU3RhdGVtZW50Jykge1xuICAgICAgICAgIC8vIGlmKGlzRmlsZSkge1xuICAgICAgICAgIC8vICAgY29uc29sZS5sb2cobm9kZS50eXBlKVxuICAgICAgICAgIC8vICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkobm9kZSkpXG4gICAgICAgICAgLy8gfVxuICAgICAgICAgIGlmIChub2RlLnR5cGUgPT0gJ0ltcG9ydERlY2xhcmF0aW9uJykge1xuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhub2RlLnR5cGUpXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdub2RlOiAnICsgbm9kZS5zb3VyY2UudmFsdWUpXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdvcHRpb246ICcgKyBub2RlLnNvdXJjZS52YWx1ZSlcblxuICAgICAgICAgICAgICBpZiAobm9kZS5zb3VyY2UudmFsdWUubWF0Y2goTU9EVUxFX1BBVFRFUk4pKSB7XG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZygnbm9kZTogJyArIG5vZGUuc291cmNlLnZhbHVlKVxuICAgICAgICAgICAgICAgIC8vIGxvb2sgZm9yOiBpbXBvcnQgeyBHcmlkIH0gZnJvbSAnQHNlbmNoYS9yZWFjdC1tb2Rlcm4nXG4gICAgICAgICAgICAgICAgICBmb3IgKGxldCBzcGVjIG9mIG5vZGUuc3BlY2lmaWVycykge1xuICAgICAgICAgICAgICAgICAgICAgIHR5cGVzW3NwZWMubG9jYWwubmFtZV0gPSB7IHh0eXBlOiB0b1h0eXBlKHNwZWMuaW1wb3J0ZWQubmFtZSkgfTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSBlbHNlIGlmIChub2RlLnNvdXJjZS52YWx1ZSA9PT0gYEBzZW5jaGEvZXh0LXJlYWN0JHtyZWFjdFZlcnNpb259YCkge1xuICAgICAgICAgICAgICAgICAgLy8gaWRlbnRpZnkgbG9jYWwgbmFtZXMgb2YgcmVhY3RpZnkgYmFzZWQgb24gaW1wb3J0IHsgcmVhY3RpZnkgYXMgZm9vIH0gZnJvbSAnQHNlbmNoYS9leHQtcmVhY3QnO1xuICAgICAgICAgICAgICAgICAgZm9yIChsZXQgc3BlYyBvZiBub2RlLnNwZWNpZmllcnMpIHtcbiAgICAgICAgICAgICAgICAgICAgICBpZiAoc3BlYy5pbXBvcnRlZC5uYW1lID09PSAncmVhY3RpZnknKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0aWZ5QWxpYXNlcy5hZGQoc3BlYy5sb2NhbC5uYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBMb29rIGZvciByZWFjdGlmeSBjYWxscy4gS2VlcCB0cmFjayBvZiB0aGUgbmFtZXMgb2YgZWFjaCBjb21wb25lbnQgc28gd2UgY2FuIG1hcCBKU1ggdGFncyB0byB4dHlwZXMgYW5kXG4gICAgICAgICAgLy8gY29udmVydCBwcm9wcyB0byBjb25maWdzIHNvIFNlbmNoYSBDbWQgY2FuIGRpc2NvdmVyIGF1dG9tYXRpYyBkZXBlbmRlbmNpZXMgaW4gdGhlIG1hbmlmZXN0LlxuICAgICAgICAgIGlmIChub2RlLnR5cGUgPT0gJ1ZhcmlhYmxlRGVjbGFyYXRvcicgXG4gICAgICAgICAgJiYgbm9kZS5pbml0IFxuICAgICAgICAgICYmIG5vZGUuaW5pdC50eXBlID09PSAnQ2FsbEV4cHJlc3Npb24nIFxuICAgICAgICAgICYmIG5vZGUuaW5pdC5jYWxsZWUgXG4gICAgICAgICAgJiYgcmVhY3RpZnlBbGlhc2VzLmhhcyhub2RlLmluaXQuY2FsbGVlLm5hbWUpKSB7XG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKG5vZGUudHlwZSlcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ1ZhcmlhYmxlRGVjbGFyYXRvcicpXG4gICAgICAgICAgICBpZiAobm9kZS5pZC5lbGVtZW50cykge1xuICAgICAgICAgICAgICAgICAgLy8gZXhhbXBsZTogY29uc3QgWyBQYW5lbCwgR3JpZCBdID0gcmVhY3RpZnkoJ1BhbmVsJywgJ0dyaWQnKTtcbiAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbm9kZS5pZC5lbGVtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHRhZ05hbWUgPSBub2RlLmlkLmVsZW1lbnRzW2ldLm5hbWU7XG4gICAgICAgICAgICAgICAgICAgICAgaWYgKCF0YWdOYW1lKSBjb250aW51ZTtcblxuICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHZhbHVlTm9kZSA9IG5vZGUuaW5pdC5hcmd1bWVudHNbaV07XG4gICAgICAgICAgICAgICAgICAgICAgaWYgKCF2YWx1ZU5vZGUpIGNvbnRpbnVlO1xuXG4gICAgICAgICAgICAgICAgICAgICAgYWRkVHlwZSh0YWdOYW1lLCB2YWx1ZU5vZGUpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgLy8gZXhhbXBsZTogY29uc3QgR3JpZCA9IHJlYWN0aWZ5KCdncmlkJyk7XG4gICAgICAgICAgICAgICAgICBjb25zdCB2YXJOYW1lID0gbm9kZS5pZC5uYW1lO1xuICAgICAgICAgICAgICAgICAgY29uc3QgYXJnID0gbm9kZS5pbml0LmFyZ3VtZW50cyAmJiBub2RlLmluaXQuYXJndW1lbnRzWzBdICYmIG5vZGUuaW5pdC5hcmd1bWVudHNbMF07XG4gICAgICAgICAgICAgICAgICBpZiAodmFyTmFtZSAmJiBhcmcpIGFkZFR5cGUodmFyTmFtZSwgYXJnKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIENvbnZlcnQgUmVhY3QuY3JlYXRlRWxlbWVudCguLi4pIGNhbGxzIHRvIHRoZSBlcXVpdmFsZW50IEV4dC5jcmVhdGUoLi4uKSBjYWxscyB0byBwdXQgaW4gdGhlIG1hbmlmZXN0LlxuICAgICAgICAgIGlmIChub2RlLnR5cGUgPT09ICdDYWxsRXhwcmVzc2lvbicgXG4gICAgICAgICAgJiYgbm9kZS5jYWxsZWUub2JqZWN0IFxuICAgICAgICAgICYmIG5vZGUuY2FsbGVlLm9iamVjdC5uYW1lID09PSAnUmVhY3QnIFxuICAgICAgICAgICYmIG5vZGUuY2FsbGVlLnByb3BlcnR5Lm5hbWUgPT09ICdjcmVhdGVFbGVtZW50Jykge1xuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhub2RlLnR5cGUpXG4gICAgICAgICAgICBjb25zdCBbdGFnLCBwcm9wc10gPSBub2RlLmFyZ3VtZW50cztcbiAgICAgICAgICAgIGxldCB0eXBlID0gdHlwZXNbdGFnLm5hbWVdO1xuICAgICAgICAgICAgaWYgKHR5cGUpIHtcbiAgICAgICAgICAgICAgbGV0IGNvbmZpZztcbiAgICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkocHJvcHMucHJvcGVydGllcykpIHtcbiAgICAgICAgICAgICAgICAgIGNvbmZpZyA9IGdlbmVyYXRlKHByb3BzKS5jb2RlO1xuICAgICAgICAgICAgICAgICAgZm9yIChsZXQga2V5IGluIHR5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICBjb25maWcgPSBge1xcbiAgJHtrZXl9OiAnJHt0eXBlW2tleV19Jywke2NvbmZpZy5zbGljZSgxKX1gO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgY29uZmlnID0gSlNPTi5zdHJpbmdpZnkodHlwZSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgc3RhdGVtZW50cy5wdXNoKGBFeHQuY3JlYXRlKCR7Y29uZmlnfSlgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIGVuc3VyZSB0aGF0IGFsbCBpbXBvcnRlZCBjbGFzc2VzIGFyZSBwcmVzZW50IGluIHRoZSBidWlsZCBldmVuIGlmIHRoZXkgYXJlbid0IHVzZWQsXG4gICAgLy8gb3RoZXJ3aXNlIHRoZSBjYWxsIHRvIHJlYWN0aWZ5IHdpbGwgZmFpbFxuICAgIGZvciAobGV0IGtleSBpbiB0eXBlcykge1xuICAgICAgc3RhdGVtZW50cy5wdXNoKGBFeHQuY3JlYXRlKCR7SlNPTi5zdHJpbmdpZnkodHlwZXNba2V5XSl9KWApXG4gICAgfVxuXG4vL2NvbnNvbGUubG9nKCdcXG5cXG5zdGF0ZW1lbnRzOicpXG4vL2NvbnNvbGUubG9nKHN0YXRlbWVudHMpXG4vL2NvbnNvbGUubG9nKCdcXG5cXG4nKVxuXG4gICAgcmV0dXJuIHN0YXRlbWVudHM7XG59O1xuIl19