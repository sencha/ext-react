const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtWebpackPlugin = require('@sencha/ext-react-webpack-plugin')
const portfinder = require('portfinder')
const sourcePath = path.join(__dirname, './src')

module.exports = function (env) {
  var buildprofile = env.profile || process.env.npm_package_extbuild_defaultprofile
  var buildenvironment = env.environment || process.env.npm_package_extbuild_defaultenvironment
  var buildverbose = env.verbose || process.env.npm_package_extbuild_defaultverbose
  if (buildprofile == 'all') { buildprofile = '' }
  const isProd = buildenvironment === 'production'

  portfinder.basePort = (env && env.port) || 1962; // the default port to use
  return portfinder.getPortPromise().then(port => {
    const plugins = [
      new HtmlWebpackPlugin({
        template: 'index.html',
        hash: true
      }), 
      new ExtWebpackPlugin({
        framework: 'react',
        port: port,
        profile: buildprofile, 
        environment: buildenvironment, 
        verbose: buildverbose
      })
    ]
    if (!isProd) {
      plugins.push(
        new webpack.HotModuleReplacementPlugin()
      )
    }
    return {
      mode: 'development',
      cache: true,
      devtool: isProd ? 'source-map' : 'cheap-module-source-map',
      context: sourcePath,
      entry: {
        'app': ['./index.js']
      },
      output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].js'
      },
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
      resolve: {
        // The following is only needed when running this boilerplate within the ext-react repo.  You can remove this from your own projects.
        alias: {
          "react-dom": path.resolve('./node_modules/react-dom'),
          "react": path.resolve('./node_modules/react')
        }
      },
      plugins,
      devServer: {
        contentBase: './build',
        historyApiFallback: true,
        hot: false,
        host: '0.0.0.0',
        port: port,
        disableHostCheck: false,
        compress: isProd,
        inline: !isProd,
        stats: {
          assets: false,
          children: false,
          chunks: false,
          hash: false,
          modules: false,
          publicPath: false,
          timings: false,
          version: false,
          warnings: false,
          colors: {
            green: '\u001b[32m'
          }
        }
      }
    }
  })
}