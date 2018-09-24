'use strict'
require('@babel/polyfill')

export default class ExtWebpackPlugin {

  constructor(options) {

    var data = require(`./pluginUtil`)._constructor(options)
    this.plugin = data.plugin

  }

  apply(compiler) {
    if (compiler.hooks) {
      if ( this.plugin.vars.framework == 'extjs') {
        compiler.hooks.afterCompile.tap('ext-after-compile', (compilation) => {
          require(`./extjsUtil`)._afterCompile(compilation, this.plugin.vars, this.plugin.options)
        })
      }
      else {
        compiler.hooks.compilation.tap(`ext-compilation`, (compilation) => {
          require(`./pluginUtil`)._compile(compilation, this.plugin.vars, this.plugin.options)
        })
      }

      if (this.plugin.vars.pluginErrors.length == 0) {
        compiler.hooks.emit.tapAsync(`ext-emit`, (compilation, callback) => {
          require(`./pluginUtil`).emit(compiler, compilation, this.plugin.vars, this.plugin.options, callback)
        })

        compiler.hooks.done.tap(`ext-done`, () => {
          require('./pluginUtil').log(this.plugin.vars.app + `Completed ext-webpack-plugin processing`)
        })
      }

    }
    else {console.log('not webpack 4')}
  }

}

