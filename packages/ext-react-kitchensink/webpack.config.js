const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
//const ExtWebpackPlugin = require('@sencha/ext-react-webpack-plugin')
const ExtWebpackPlugin = require('@sencha/ext-webpack-plugin')
//const WebpackShellPlugin = require('webpack-shell-plugin-next')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const portfinder = require('portfinder')
//const sourcePath = path.join(__dirname, './src')

module.exports = function (env) {
  var browserprofile
  var watchprofile
  var buildenvironment = env.environment || process.env.npm_package_extbuild_defaultenvironment
  if (buildenvironment == 'production') {
    browserprofile = false
    watchprofile = 'no'
  }
  else {
    if (env.browser == undefined) {env.browser = true}
    browserprofile = JSON.parse(env.browser) || true
    watchprofile = env.watch || 'yes'
  }
  const isProd = buildenvironment === 'production'
  var buildprofile = env.profile || process.env.npm_package_extbuild_defaultprofile
  var buildenvironment = env.environment || process.env.npm_package_extbuild_defaultenvironment
  var buildverbose = env.verbose || process.env.npm_package_extbuild_defaultverbose
  if (buildprofile == 'all') { buildprofile = '' }
  if (env.treeshake == undefined) {env.treeshake = false}
  var treeshake = env.treeshake ? JSON.parse(env.treeshake) : false
  var mode = isProd ? 'production': 'development'
  var outputFolder = 'build'


  portfinder.basePort = (env && env.port) || 1962
  return portfinder.getPortPromise().then(port => {
    const plugins = [
      new HtmlWebpackPlugin({template: './src/index.html',hash: true,inject: "body"}), 
      new ExtWebpackPlugin({
        framework: 'react',
        toolkit: 'modern',
        theme: 'theme-kitchensink',
        profile: buildprofile, 
        environment: buildenvironment,
        treeshake: treeshake,
        port: port,
        emit: true,
        browser: browserprofile,
        watch: watchprofile,
        verbose: buildverbose,
        script: './extract-code.js',
        packages: [
          'treegrid',
          'transition', 
          'renderercell', 
          'font-ext', 
          'ux', 
          'd3',
          'pivot-d3',
          'font-awesome', 
          'exporter',
          'pivot', 
          'calendar', 
          'charts'
        ]
      }),
      // new CopyWebpackPlugin([{
      //   from: './node_modules/@sencha/ext-ux/modern/resources',
      //   to: './ext-react/ux'
      // }]),
      // new WebpackShellPlugin({
      //   onBuildEnd:{
      //     scripts: ['node extract-code.js'],
      //     blocking: false,
      //     parallel: true
      //   }
      // })
    ]
    if (!isProd) {
      plugins.push(
        new webpack.HotModuleReplacementPlugin()
      )
    }
    return {
      mode: mode,
      devtool: (mode === 'development') ? 'inline-source-map' : false,
      entry: path.resolve(__dirname, 'src/index.js'),
//      cache: true,
      output: {
        path: path.resolve(__dirname, outputFolder),
        filename: '[name].js'
      },
      plugins : plugins,
      module: {
        rules: [
          //{ test: /\.(js|jsx)$/,exclude: /node_modules/,use: ['babel-loader'] },
          { test: /\.(js)$/, exclude: /node_modules/, use: ['babel-loader'] },
          {
            test: /\.css$/,
            use: ['style-loader','css-loader']
          }
        ]
      },
      resolve: {
        // The following is only needed when running this boilerplate within the ext-react repo.  You can remove this from your own projects.
        alias: {
          "react-dom": path.resolve('./node_modules/react-dom'),
          "react": path.resolve('./node_modules/react')
        }
      },
      stats: 'none',
      optimization: {
        noEmitOnErrors: true
      },
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