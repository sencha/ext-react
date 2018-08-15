"use strict";

import { parse } from 'babylon';
import traverse from 'ast-traverse';
import generate from 'babel-generator';

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
    const types = {};

    // Aliases used for reactify
    const reactifyAliases = new Set([]);

    const ast = parse(js, {
        plugins: [
            'jsx',
            'flow',
            'doExpressions',
            'objectRestSpread',
            'classProperties',
            'exportExtensions',
            'asyncGenerators',
            'functionBind',
            'functionSent',
            'dynamicImport'
        ],
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

    traverse(ast, {
        pre: function(node) {
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
                      types[spec.local.name] = { xtype: toXtype(spec.imported.name) };
                  }
              } else if (node.source.value === `@sencha/ext-react${reactVersion}`) {
                  // identify local names of reactify based on import { reactify as foo } from '@sencha/ext-react';
                  for (let spec of node.specifiers) {
                      if (spec.imported.name === 'reactify') {
                          reactifyAliases.add(spec.local.name);
                      }
                  }
              }
          }

          // Look for reactify calls. Keep track of the names of each component so we can map JSX tags to xtypes and
          // convert props to configs so Sencha Cmd can discover automatic dependencies in the manifest.
          if (node.type == 'VariableDeclarator' 
          && node.init 
          && node.init.type === 'CallExpression' 
          && node.init.callee 
          && reactifyAliases.has(node.init.callee.name)) {
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
          }

          // Convert React.createElement(...) calls to the equivalent Ext.create(...) calls to put in the manifest.
          if (node.type === 'CallExpression' 
          && node.callee.object 
          && node.callee.object.name === 'React' 
          && node.callee.property.name === 'createElement') {
            //console.log(node.type)
            const [tag, props] = node.arguments;
            let type = types[tag.name];
            if (type) {
              let config;
              if (Array.isArray(props.properties)) {
                  config = generate(props).code;
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
    });

    // ensure that all imported classes are present in the build even if they aren't used,
    // otherwise the call to reactify will fail
    for (let key in types) {
      statements.push(`Ext.create(${JSON.stringify(types[key])})`)
    }

//console.log('\n\nstatements:')
//console.log(statements)
//console.log('\n\n')

    return statements;
};
