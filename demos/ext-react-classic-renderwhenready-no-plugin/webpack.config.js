const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const portfinder = require('portfinder')
const sourcePath = path.join(__dirname, './src');

module.exports = function (env) {
  const isProd = env.environment === 'production'
  portfinder.basePort = (env && env.port) || 1962
  return portfinder.getPortPromise().then(port => {
    const plugins = [
      new HtmlWebpackPlugin({
        template: 'index.html',
        hash: true
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
      plugins,
      devServer: {
        contentBase: './',
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