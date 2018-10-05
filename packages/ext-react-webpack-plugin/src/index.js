'use strict'
require('@babel/polyfill')

export default class ExtWebpackPlugin {
  constructor(options) {
    this.plugin = require(`./pluginUtil`)._constructor(options)
  }
  apply(compiler) {
    require('./pluginUtil').logv(this.plugin.options,'FUNCTION apply')
    if (compiler.hooks) {

      compiler.hooks.thisCompilation.tap(`ext-this-compilation`, (compilation) => {
        require('./pluginUtil').logv(this.plugin.options,'HOOK thisCompilation')
        if (this.plugin.vars.pluginErrors.length > 0) {
          compilation.errors.push( new Error(this.plugin.vars.pluginErrors.join("")) )
        }
        else {
          //this.plugin.vars.deps = []
        }
      })

      if (this.plugin.vars.pluginErrors.length > 0) {
        return
      }

      if ( this.plugin.vars.framework == 'extjs') {
        compiler.hooks.afterCompile.tap('ext-after-compile', (compilation) => {
          require('./pluginUtil').logv(this.plugin.options,'HOOK afterCompile')
          require(`./extjsUtil`)._afterCompile(compilation, this.plugin.vars, this.plugin.options)
        })
      }
      else {
        compiler.hooks.compilation.tap(`ext-compilation`, (compilation) => {
          require('./pluginUtil').logv(this.plugin.options,'HOOK compilation')
          require(`./pluginUtil`)._compilation(compiler, compilation, this.plugin.vars, this.plugin.options)
        })
      }

      compiler.hooks.emit.tapAsync(`ext-emit`, (compilation, callback) => {
        require('./pluginUtil').logv(this.plugin.options,'HOOK emit')
        require(`./pluginUtil`).emit(compiler, compilation, this.plugin.vars, this.plugin.options, callback)
      })

      compiler.hooks.done.tap(`ext-done`, () => {
        require('./pluginUtil').logv(this.plugin.options,'HOOK done')
        require('./pluginUtil').log(this.plugin.vars.app + `Completed ext-webpack-plugin processing`)
      })

    }
    else {console.log('not webpack 4')}
  }
}
