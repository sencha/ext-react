//const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtWebpackPlugin = require('@sencha/ext-webpack-plugin')
const portfinder = require('portfinder')
const sourcePath = path.join(__dirname, './src')

module.exports = function (env) {
  function get(it, val) {if(env == undefined) {return val} else if(env[it] == undefined) {return val} else {return env[it]}}

  var profile     = get('profile',     '')
  var environment = get('environment', 'development')
  var treeshake   = get('treeshake',   'no')
  var browser     = get('browser',     'yes')
  var watch       = get('watch',       'yes')
  var verbose     = get('verbose',     'no')
  var basehref    = get('basehref',    '/')

  const isProd = environment === 'production'
  const outputFolder = 'build'
  portfinder.basePort = (env && env.port) || 1962

  return portfinder.getPortPromise().then(port => {
    const plugins = [
      new HtmlWebpackPlugin({
        template: 'index.html',
        hash: true
      }), 
      new ExtWebpackPlugin({
        framework: 'react',
        toolkit: 'modern',
        theme: 'custom-ext-react-theme',
        packages: [],
        script: '',
        emit: 'yes',
        port: port,
        profile: profile, 
        environment: environment,
        treeshake: treeshake,
        browser: browser,
        watch: watch,
        verbose: verbose
      })
    ]
    // if (!isProd) {
    //   plugins.push(
    //     new webpack.HotModuleReplacementPlugin()
    //   )
    // }
    return {
      resolve: {
        // The following is only needed when running this boilerplate within the ext-react repo.  You can remove this from your own projects.
        alias: {
          "react-dom": path.resolve('./node_modules/react-dom'),
          "react": path.resolve('./node_modules/react')
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
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: [
              'babel-loader'
            ]
          },
          {
            test: /\.css$/,
            use: [
                'style-loader', 
                'css-loader'
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
