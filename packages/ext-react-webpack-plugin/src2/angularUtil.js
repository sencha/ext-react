"use strict"

export function getValidateOptions() {
  return {
    "type": "object",
    "properties": {
      "framework":   {"type": [ "string" ]},
      "port":        {"type": [ "integer" ]},
      "emit":        {"type": [ "boolean" ]},
      "browser":     {"type": [ "boolean" ]},
      "watch":       {"type": [ "string" ]},
      "profile":     {"type": [ "string" ]},
      "environment": {"type": [ "string" ]},
      "verbose":     {"type": [ "string" ]},
      "theme":       {"type": [ "string" ]},
      "toolkit":     {"type": [ "string" ]},
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
    environment: 'development', 
    verbose: 'no',
    toolkit: 'modern',
    packages: null
  }
}

export function getDefaultVars() {
  return {
    firstTime : true,
    firstCompile: true,
    browserCount : 0,
    manifest: null,
    extPath: 'ext-angular',
    pluginErrors: [],
    deps: [],
    rebuild: true
  }
}

function toXtype(str) {
  return str.toLowerCase().replace(/_/g, '-')
}

export function extractFromSource(module, options, compilation) {
  try {
    var js = module._source._value
    const logv = require('./pluginUtil').logv
    logv(options,'FUNCTION extractFromSource')
    var statements = []
    var prefix = '<ext-'
    for (var i = 0; i < js.length; ++i) {
      if (js.substring(i, i + prefix.length) == prefix) {
        var start = js.substring(i)
        var end = start.indexOf(' ')
        var xtype = start.substring(prefix.length,end)
        var type = { xtype: toXtype(xtype) }
        let config = JSON.stringify(type)
        statements.push(`Ext.create(${config})`)
      }
    }
    return statements
  }
  catch(e) {
    console.log(e)
    compilation.errors.push('extractFromSource: ' + e)
    return []
  }
}
