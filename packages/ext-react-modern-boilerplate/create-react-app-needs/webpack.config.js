const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { BaseHrefWebpackPlugin } = require('base-href-webpack-plugin');
const ExtWebpackPlugin = require('@sencha/ext-webpack-plugin');
const portfinder = require('portfinder')


  function get(it, val) {if(env == undefined) {return val} else if(env[it] == undefined) {return val} else {return env[it]}}
  var basehref      = get('basehref',      '/')
  var framework     = get('framework',     'react')
  var toolkit       = get('toolkit',       'modern')
  var theme         = get('theme',         'theme-material')
  var packages      = get('packages',      ['treegrid'])
  var script        = get('script',        '')
  var emit          = get('emit',          'yes')
  var port          = get('port',          '1962')
  var profile       = get('profile',       '')
  var environment   = get('environment',   'development')
  var treeshake     = get('treeshake',     'no')
  var browser       = get('browser',       'no')
  var watch         = get('watch',         'yes')
  var verbose       = get('verbose',       'no')

  const plugins = [
    new BaseHrefWebpackPlugin({ baseHref: basehref }),
    new ExtWebpackPlugin({
      framework: framework,
      toolkit: toolkit,
      theme: theme,
      packages: packages,
      script: script,
      emit: emit,
      port: port,
      profile: profile, 
      environment: environment,
      treeshake: treeshake,
      browser: browser,
      watch: watch,
      verbose: verbose
    })
  ]



  const isProd = environment === 'production'
  portfinder.basePort = (env && env.port) || 1962
  return portfinder.getPortPromise().then(port => {
    const plugins = [
      new HtmlWebpackPlugin({ template: "index.html", hash: true, inject: "body" }),
      new BaseHrefWebpackPlugin({ baseHref: basehref }),
      new ExtWebpackPlugin({
        framework: framework,
        toolkit: toolkit,
        theme: theme,
        packages: packages,
        script: script,
        emit: emit,
        port: port,
        profile: profile, 
        environment: environment,
        treeshake: treeshake,
        browser: browser,
        watch: watch,
        verbose: verbose
      })
    ]
