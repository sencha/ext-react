const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtWebpackPlugin = require('@sencha/ext-webpack-plugin')
const portfinder = require('portfinder')

module.exports = function (env) {
  function get(it, val) {if(env == undefined) {return val} else if(env[it] == undefined) {return val} else {return env[it]}}

  var profile     = get('profile',     '')
  var environment = get('environment', 'development')
  var treeshake   = get('treeshake',   'no')
  var browser     = get('browser',     'yes')
  var watch       = get('watch',       'yes')
  var verbose     = get('verbose',     'no')

  const isProd = environment === 'production'
  const outputFolder = 'build'
  portfinder.basePort = (env && env.port) || 1962

  return portfinder.getPortPromise().then(port => {
    const plugins = [
      new HtmlWebpackPlugin({template: "index.html",hash: true,inject: "body"}),
      new ExtWebpackPlugin({
        framework: 'components',
        toolkit: 'modern',
        theme: 'theme-material',
        emit: 'yes',
        script: '',
        port: port,
        packages: [
          'treegrid'
        ],
        profile: profile, 
        environment: environment,
        treeshake: treeshake,
        browser: browser,
        watch: watch,
        verbose: verbose
      })
    ]
    return {
      mode: environment,
      devtool: (environment === 'development') ? 'inline-source-map' : false,
      context: path.join(__dirname, './src'),
      entry: './app.js',
      output: {
        path: path.join(__dirname, outputFolder),
        filename: "[name].js"
        //filename: "[name].[chunkhash:20].js"
      },
      plugins: plugins,
      module: {
        rules: [
          { test: /\.(js)$/, exclude: /node_modules/, use: ['babel-loader'] },
          { test: /\.(html)$/,use: { loader: 'html-loader' } },
          //{ test: /\.css$/,use: ['style-loader','css-loader'] }

          {
            test: /\.(css|scss)$/,
            use: [
              {
                loader: 'style-loader'
              },
              {
                loader: 'css-loader'
              },
              {
                loader: 'sass-loader'
              }
            ]
          }
        ]
      },
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
