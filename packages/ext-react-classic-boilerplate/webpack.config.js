const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { BaseHrefWebpackPlugin } = require('base-href-webpack-plugin');
const ExtWebpackPlugin = require('@sencha/ext-webpack-plugin');
const portfinder = require('portfinder')

module.exports = function (env) {
  function get(it, val) {if(env == undefined) {return val} else if(env[it] == undefined) {return val} else {return env[it]}}

  //******* */
  const rules = [
    { test: /\.ext-reactrc$/, use: 'raw-loader' },
    { test: /\.(js|jsx)$/, exclude: /node_modules/, use: ['babel-loader'] },
    { test: /\.(html)$/,use: { loader: 'html-loader' } },
    {
      test: /\.(css|scss)$/,
      use: [
        { loader: 'style-loader' },
        { loader: 'css-loader' },
        { loader: 'sass-loader' }
      ]
    }
  ]

  var basehref      = get('basehref',      '/')
  var framework     = get('framework',     'react')
  var toolkit       = get('toolkit',       'classic')
  var theme         = get('theme',         'theme-material')
  var packages      = get('packages',      [])
  var script        = get('script',        '')
  var emit          = get('emit',          'yes')
  var profile       = get('profile',       '')
  var environment   = get('environment',   'development')
  var treeshake     = get('treeshake',     'no')
  var browser       = get('browser',       'yes')
  var watch         = get('watch',         'yes')
  var verbose       = get('verbose',       'no')

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

    var contextFolder = get('contextFolder', './src')
    var entryFile     = get('entryFile',     './index.js')
    var outputFolder  = get('outputFolder',  'build')
    return {
      mode: environment,
      devtool: (environment === 'development') ? 'inline-source-map' : false,
      context: path.join(__dirname, contextFolder),
      entry: entryFile,
      output: {
        path: path.join(__dirname, outputFolder),
        filename: "[name].js"
      },
      plugins: plugins,
      module: {
        rules: rules
      },
      //resolve: resolve,
      performance: { hints: false },
      stats: 'none',
      optimization: { noEmitOnErrors: true },
      node: false,
      devServer: {
        contentBase: outputFolder,
        hot: !isProd,
        historyApiFallback: true,
        host: '0.0.0.0',
        port: port,
        disableHostCheck: false,
        compress: isProd,
        inline:!isProd,
        stats: 'none'
      }
    }
  })
}
