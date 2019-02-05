'use strict'
require('@babel/polyfill')
const v = require('./pluginUtil').logv
export default class ExtWebpackPlugin {
  constructor(options) {
    this.plugin = require(`./pluginUtil`)._constructor(options)
  }

  apply(compiler) {
    const vars = this.plugin.vars
    const options = this.plugin.options
    v(options,'FUNCTION apply')
    if (!compiler.hooks) {console.log('not webpack 4');return}

    compiler.hooks.thisCompilation.tap(`ext-this-compilation`, (compilation) => {
      v(options,'HOOK thisCompilation')
      if (vars.pluginErrors.length > 0) {
        compilation.errors.push( new Error(vars.pluginErrors.join("")) )
      }
    })
    if (vars.pluginErrors.length > 0) {
      return
    }

    if ( vars.framework == 'extjs') {
      compiler.hooks.compilation.tap(`ext-compilation`, (compilation) => {
        v(options,'HOOK compilation (empty)')
      })
      compiler.hooks.afterCompile.tap('ext-after-compile', (compilation) => {
        v(options,'HOOK afterCompile')
        require(`./extjsUtil`)._afterCompile(compilation, vars, options)
      })
    }
    else {
      compiler.hooks.compilation.tap(`ext-compilation`, (compilation) => {
        v(options,'HOOK compilation')
        require(`./pluginUtil`)._compilation(compiler, compilation, vars, options)
      })
      compiler.hooks.afterCompile.tap('ext-after-compile', (compilation) => {
        v(options,'HOOK afterCompile')
        require(`./pluginUtil`)._afterCompile(compiler, compilation, vars, options)
      })
    }

    if((options.treeshake == true && options.environment == 'production') ||
       (options.treeshake == false && options.environment != 'production'))
    {
      compiler.hooks.emit.tapAsync(`ext-emit`, (compilation, callback) => {
        v(options,'HOOK emit')
        require(`./pluginUtil`).emit(compiler, compilation, vars, options, callback)
      })
    }

    compiler.hooks.done.tap(`ext-done`, () => {
      v(options,'HOOK done')
      require(`./pluginUtil`)._done(vars, options)
      require('./pluginUtil').log(vars.app + `Completed ext-webpack-plugin processing`)
    })
  }
}
