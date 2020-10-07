const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { BaseHrefWebpackPlugin } = require('base-href-webpack-plugin');
const ExtWebpackPlugin = require('@sencha/ext-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const portfinder = require('portfinder')

module.exports = function (env) {
  function get(it, val) {if(env == undefined) {return val} else if(env[it] == undefined) {return val} else {return env[it]}}

//   var profile     = get('profile',     '')
//   var environment = get('environment', 'development')
//   var treeshake   = get('treeshake',   'no')
//   var browser     = get('browser',     'yes')
//   var watch       = get('watch',       'yes')
//   var verbose     = get('verbose',     'no')
//   var basehref    = get('basehref',    '/')

  var toolkit       = get('toolkit',       'modern')
  var theme         = get('theme',         'theme-material')
  var packages      = get('packages',      ['treegrid'])
  var script        = get('script',        '')
  var emit          = get('emit',          'yes')
  var profile       = get('profile',       '')
  var environment   = get('environment',   'development')
  var treeshake     = get('treeshake',     'no')
  var browser       = get('browser',       'yes')
  var watch         = get('watch',         'yes')
  var verbose       = get('verbose',       'no')
  var basehref      = get('basehref',      '/')
  var build_v       = get('build_v', '7.3.0.0');

  const isProd = environment === 'production'
  const outputFolder = 'build'
  portfinder.basePort = (env && env.port) || 1962

  return portfinder.getPortPromise().then(port => {
    const plugins = [
      new HtmlWebpackPlugin({ template: "index.html", hash: true, inject: "body" }),
      new BaseHrefWebpackPlugin({ baseHref: basehref }),
      new ExtWebpackPlugin({
        framework: 'react',
        toolkit: 'modern',
        theme: 'theme-kitchensink',
        packages: [
          'treegrid',
          'ux',
          'font-ext',
          'd3',
          'pivot-d3',
          'font-awesome',
          'exporter',
          'pivot',
          'calendar',
          'charts',
          'froala-editor'
        ],
        script: './extract-code.js',
        emit: emit,
        port: port,
        profile: profile,
        environment: environment,
        treeshake: treeshake,
        browser: browser,
        watch: watch,
        verbose: verbose,
        inject: 'yes',
        intellishake: 'no'
      }),
      new CopyWebpackPlugin([{
        from: '../node_modules/@sencha/ext-ux/modern/resources',
        to: './ext/ux'
      }]),
      new webpack.DefinePlugin({
        BUILD_VERSION: JSON.stringify(build_v)
      })
    ]
    return {
       resolve: {
         alias: {
          //'react-dom': '@hot-loader/react-dom'
          react: path.resolve('./node_modules/react')
         }
       },
      mode: environment,
      devtool: (environment === 'development') ? 'inline-source-map' : false,
      context: path.join(__dirname, './src'),
      entry: './index.js',
      output: {
        path: path.join(__dirname, outputFolder),
        filename: "[name].js"
        //filename: "[name].[chunkhash:20].js"
      },
      plugins: plugins,
      module: {
        rules: [
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
      },
      performance: { hints: false },
      stats: 'none',
      optimization: { noEmitOnErrors: true },
      node: false,
      devServer: {
        //contentBase: outputFolder,
        contentBase: path.resolve(__dirname, './build'),
        //contentBase: path.resolve(__dirname, './src'),
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
