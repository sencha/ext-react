'use strict'
require('@babel/polyfill')

export default class ExtWebpackPlugin {
  constructor(options) {
    this.plugin = require(`./pluginUtil`)._constructor(options)
  }
  apply(compiler) {
    if (compiler.hooks) {

      compiler.hooks.thisCompilation.tap(`ext-this-compilation`, (compilation) => {
        if (this.plugin.vars.pluginErrors.length > 0) {
          compilation.errors.push( new Error(this.plugin.vars.pluginErrors.join("")) )
        }
      })

      if (this.plugin.vars.pluginErrors.length > 0) {
        return
      }

      if ( this.plugin.vars.framework == 'extjs') {
        compiler.hooks.afterCompile.tap('ext-after-compile', (compilation) => {
          require(`./extjsUtil`)._afterCompile(compilation, this.plugin.vars, this.plugin.options)
        })
      }
      else {
        compiler.hooks.compilation.tap(`ext-compilation`, (compilation) => {
          require(`./pluginUtil`)._compilation(compilation, this.plugin.vars, this.plugin.options)
        })
      }

      if (this.plugin.options.emit == true) {
        compiler.hooks.emit.tapAsync(`ext-emit`, (compilation, callback) => {
          require(`./pluginUtil`).emit(compiler, compilation, this.plugin.vars, this.plugin.options, callback)
        })
      }
      else {
        require('./pluginUtil').log(`${this.plugin.vars.app}Emit not run`)
      }

      compiler.hooks.done.tap(`ext-done`, () => {
        require('./pluginUtil').log(this.plugin.vars.app + `Completed ext-webpack-plugin processing`)
      })

    }
    else {console.log('not webpack 4')}
  }
}
