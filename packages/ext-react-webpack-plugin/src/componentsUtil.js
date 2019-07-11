"use strict"

export function _getDefaultVars() {
  return {
    touchFile: '/src/themer.js',
    watchStarted : false,
    buildstep: '1 of 1',
    firstTime : true,
    firstCompile: true,
    browserCount : 0,
    manifest: null,
    extPath: 'ext',
    pluginErrors: [],
    deps: [],
    usedExtComponents: [],
    rebuild: true
  }
}

export function _extractFromSource(module, options, compilation, extComponents) {
  const logv = require('./pluginUtil').logv
  logv(options.verbose,'FUNCTION _extractFromSource (empty)')
  try {
    var statements = [
      'Ext.require("Ext.*")',
    ]
    return statements
  }
  catch(e) {
    console.log(e)
    compilation.errors.push('extractFromSource: ' + e)
    return []
  }
}

export function _toProd(vars, options) {
  const logv = require('./pluginUtil').logv
  logv(options.verbose,'FUNCTION _toProd (empty')
  try {
  }
  catch (e) {
    console.log(e)
    return []
  }
}

export function _toDev(vars, options) {
  try {
  }
  catch (e) {
    console.log(e)
    return []
  }
}

export function _getAllComponents(vars, options) {
   const logv = require('./pluginUtil').logv
  logv(options.verbose,'FUNCTION _getAllComponents (empty)')
  try {
    var extComponents = []
     return extComponents
  }
  catch (e) {
    console.log(e)
    return []
  }
}

export function _writeFilesToProdFolder(vars, options) {
  const logv = require('./pluginUtil').logv
  logv(options.verbose,'FUNCTION _writeFilesToProdFolder (empty)')
  try {
  }
  catch (e) {
    console.log(e)
  }
}