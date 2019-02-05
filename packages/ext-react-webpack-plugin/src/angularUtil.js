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
    packages: null
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
    //logv(options,'HOOK succeedModule, FUNCTION extractFromSource: ' + module.resource)

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
                    var theValue = node.value.toLowerCase()
                    if (theValue.indexOf('doctype html') == -1) {
                      var type = {xtype: xtype}
                      let config = JSON.stringify(type)
                      statements.push(`Ext.create(${config})`)
                    }
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

function changeIt(o) {
  const path = require('path')
  const fsx = require('fs-extra')
  const wherePath = path.resolve(process.cwd(), o.where)
  var js = fsx.readFileSync(wherePath).toString()
  var newJs = js.replace(o.from,o.to);
  fsx.writeFileSync(wherePath, newJs, 'utf-8', ()=>{return})
}

export function _toProd(vars, options) {
  const log = require('./pluginUtil').log
  const logv = require('./pluginUtil').logv
  logv(options,'FUNCTION _toProd')
  try {
    const fsx = require('fs-extra')
    const fs = require('fs')
    const mkdirp = require('mkdirp')
    const path = require('path')

    const pathExtAngularProd = path.resolve(process.cwd(), `src/app/ext-angular-prod`);
    if (!fs.existsSync(pathExtAngularProd)) {
      mkdirp.sync(pathExtAngularProd)
      const t = require('./artifacts').extAngularModule('', '', '')
      fsx.writeFileSync(`${pathExtAngularProd}/ext-angular.module.ts`, t, 'utf-8', () => {
        return
      })
    }

    var o = {}
    o.where = 'src/app/app.module.ts'
    o.from = `import { ExtAngularModule } from '@sencha/ext-angular'`
    o.to = `import { ExtAngularModule } from './ext-angular-prod/ext-angular.module'`
    changeIt(o)

    o = {}
    o.where = 'src/main.ts'
    o.from = `bootstrapModule( AppModule );`
    o.to = `enableProdMode();bootstrapModule(AppModule);`
    changeIt(o)
  }
  catch (e) {
    console.log(e)
    return []
  }
}

export function _toDev(vars, options) {
  const log = require('./pluginUtil').log
  const logv = require('./pluginUtil').logv
  logv(options,'FUNCTION _toProd')
  try {
    const path = require('path')
    const pathExtAngularProd = path.resolve(process.cwd(), `src/app/ext-angular-prod`);
    require('rimraf').sync(pathExtAngularProd);

    var o = {}
    o.where = 'src/app/app.module.ts'
    o.from = `import { ExtAngularModule } from './ext-angular-prod/ext-angular.module'`
    o.to = `import { ExtAngularModule } from '@sencha/ext-angular'`
    changeIt(o)

    o = {}
    o.where = 'src/main.ts'
    o.from = `enableProdMode();bootstrapModule(AppModule);`
    o.to = `bootstrapModule( AppModule );`
    changeIt(o)
  }
  catch (e) {
    console.log(e)
    return []
  }
}


export function _getAllComponents(vars, options) {
  const log = require('./pluginUtil').log
  const logv = require('./pluginUtil').logv
  logv(options,'FUNCTION _getAllComponents')

  try {
    const path = require('path')
    const fsx = require('fs-extra')

    var extComponents = []
    const packageLibPath = path.resolve(process.cwd(), 'node_modules/@sencha/ext-angular/src/lib')
    var files = fsx.readdirSync(packageLibPath)
    files.forEach((fileName) => {
      if (fileName && fileName.substr(0, 4) == 'ext-') {
        var end = fileName.substr(4).indexOf('.component')
        if (end >= 0) {
          extComponents.push(fileName.substring(4, end + 4))
        }
      }
    })
    return extComponents

  }
  catch (e) {
    console.log(e)
    return []
  }
}

export function _writeFilesToProdFolder(vars, options) {
  const log = require('./pluginUtil').log
  const logv = require('./pluginUtil').logv
  logv(options,'FUNCTION _writeFilesToProdFolder')

  try {
    const path = require('path')
    const fsx = require('fs-extra')

    const packageLibPath = path.resolve(process.cwd(), 'node_modules/@sencha/ext-angular/src/lib')
    const pathToExtAngularProd = path.resolve(process.cwd(), `src/app/ext-angular-prod`)
    const string = 'Ext.create({\"xtype\":\"'

    vars.deps.forEach(code => {
      var index = code.indexOf(string)
      if (index >= 0) {
        code = code.substring(index + string.length)
        var end = code.indexOf('\"')
        vars.usedExtComponents.push(code.substr(0, end))
      }
    })
    vars.usedExtComponents = [...new Set(vars.usedExtComponents)]

    var writeToPathWritten = false
    var moduleVars = {
      imports: '',
      exports: '',
      declarations: ''
    }
    vars.usedExtComponents.forEach(xtype => {
      var capclassname = xtype.charAt(0).toUpperCase() + xtype.replace(/-/g, "_").slice(1)
      moduleVars.imports = moduleVars.imports + `import { Ext${capclassname}Component } from './ext-${xtype}.component';\n`
      moduleVars.exports = moduleVars.exports + `    Ext${capclassname}Component,\n`
      moduleVars.declarations = moduleVars.declarations + `    Ext${capclassname}Component,\n`
      var classFile = `ext-${xtype}.component.ts`
      const contents = fsx.readFileSync(`${packageLibPath}/${classFile}`).toString()
      fsx.writeFileSync(`${pathToExtAngularProd}/${classFile}`, contents, 'utf-8', ()=>{return})
      writeToPathWritten = true
    })
    if (writeToPathWritten) {
      var t = require('./artifacts').extAngularModule(
        moduleVars.imports, moduleVars.exports, moduleVars.declarations
      )
      fsx.writeFileSync(`${pathToExtAngularProd}/ext-angular.module.ts`, t, 'utf-8', ()=>{return})
    }

    const baseContent = fsx.readFileSync(`${packageLibPath}/base.ts`).toString()
    fsx.writeFileSync(`${pathToExtAngularProd}/base.ts`, baseContent, 'utf-8', ()=>{return})

  }
  catch (e) {
    console.log(e)
    return []
  }
}