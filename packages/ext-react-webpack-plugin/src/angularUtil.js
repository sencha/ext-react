"use strict"

export function getValidateOptions() {
  return {
    "type": "object",
    "properties": {
      "framework":   {"type": [ "string" ]},
      "toolkit":     {"type": [ "string" ]},
      "port":        {"type": [ "integer" ]},
      "emit":        {"type": [ "boolean" ]},
      "browser":     {"type": [ "boolean" ]},
      "watch":       {"type": [ "string" ]},
      "profile":     {"type": [ "string" ]},
      "environment": {"type": [ "string" ]},
      "verbose":     {"type": [ "string" ]},
      "theme":       {"type": [ "string" ]},
      "treeshake": {"type": [ "boolean" ]},
      "packages":    {"type": [ "string", "array" ]}
    },
    "additionalProperties": false
    // "errorMessage": {
    //   "option": "should be {Boolean} (https:/github.com/org/repo#anchor)"
    // }
  }
}

export function getDefaultOptions() {
  return {
    port: 1962,
    emit: true,
    browser: true,
    watch: 'yes',
    profile: '', 
    treeshake: false,
    environment: 'development', 
    verbose: 'no',
    toolkit: 'modern',
    packages: null,
    prodFileReplacementConfig: []
  }
}

export function getDefaultVars() {
  return {
    watchStarted : false,
    firstTime : true,
    firstCompile: true,
    browserCount : 0,
    manifest: null,
    extPath: 'ext-angular',
    pluginErrors: [],
    deps: [],
    usedExtComponents: [],
    rebuild: true
  }
}

function toXtype(str) {
  return str.toLowerCase().replace(/_/g, '-')
}

export function extractFromSource(module, options, compilation, extComponents) {
  try {
    var js = module._source._value
    const logv = require('./pluginUtil').logv
    logv(options,'HOOK succeedModule, FUNCTION extractFromSource: ' + module.resource)

    var statements = []

    var generate = require("@babel/generator").default
    var parse = require("babylon").parse
    var traverse = require("ast-traverse")

    var ast = parse(js, {
      plugins: [
        'typescript',
        'flow',
        'doExpressions',
        'objectRestSpread',
        'classProperties',
        'exportDefaultFrom',
        'exportExtensions',
        'asyncGenerators',
        'functionBind',
        'functionSent',
        'dynamicImport'
      ],
      sourceType: 'module'
    })

    traverse(ast, {
      pre: function (node) {
        if (node.type === 'CallExpression' && node.callee && node.callee.object && node.callee.object.name === 'Ext') {
          statements.push(generate(node).code)
        }
        if(node.type === 'StringLiteral') {
          let code = node.value
          for (var i = 0; i < code.length; ++i) {
            if (code.charAt(i) == '<') {
              if (code.substr(i, 4) == '<!--') {
                i += 4
                i += code.substr(i).indexOf('-->') + 3
              } else if (code.charAt(i+1) !== '/') {
                var start = code.substring(i)
                var spaceEnd = start.indexOf(' ')
                var newlineEnd = start.indexOf('\n')
                var tagEnd = start.indexOf('>')
                var end = Math.min(spaceEnd, newlineEnd, tagEnd)
                if (end >= 0) {
                  var xtype = toXtype(start.substring(1, end))
                  if(extComponents.includes(xtype)) {
                    var type = {xtype: xtype}
                    let config = JSON.stringify(type)
                    statements.push(`Ext.create(${config})`)
                  }
                  i += end
                }
              }
            }
          }
        }
      }
    })

    return statements
  }
  catch(e) {
    console.log(e)
    compilation.errors.push('extractFromSource: ' + e)
    return []
  }
}

//**********
export function _done(vars, options) {
  try {
    const log = require('./pluginUtil').log
    const logv = require('./pluginUtil').logv
    logv(options,'FUNCTION _done')

   // if (vars.production && !options.treeshake && options.framework == 'angular') {
      const path = require('path')
      const fsx = require('fs-extra')
      var rimraf = require("rimraf");
      rimraf.sync(path.resolve(process.cwd(), `src/app/ext-angular-prod`));
      try {
        const appModulePath = path.resolve(process.cwd(), 'src/app/app.module.ts')
        var js = fsx.readFileSync(appModulePath).toString()
        var newJs = js.replace(
          `import { ExtAngularModule } from './ext-angular-prod/ext-angular.module'`,
          `import { ExtAngularModule } from '@sencha/ext-angular'`
        );
        fsx.writeFileSync(appModulePath, newJs, 'utf-8', ()=>{return})

        const mainPath = path.resolve(process.cwd(), 'src/main.ts')
        var jsMain = fsx.readFileSync(mainPath).toString()
        var newJsMain = jsMain.replace(
          `enableProdMode();bootstrapModule( AppModule );`,
          `bootstrapModule(AppModule);`
        );
        fsx.writeFileSync(mainPath, newJsMain, 'utf-8', ()=>{return})
      }
      catch (e) {
        console.log(e)
        //compilation.errors.push('replace ExtAngularModule - ext-done: ' + e)
        return []
      }
    //} 
  }
  catch(e) {
    require('./pluginUtil').logv(options,e)
  }
}