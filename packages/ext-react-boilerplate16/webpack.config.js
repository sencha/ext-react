const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtReactWebpackPlugin = require('@sencha/ext-react-webpack-plugin')
const portfinder = require('portfinder')
const sourcePath = path.join(__dirname, './src');

module.exports = function (env) {
  portfinder.basePort = (env && env.port) || 8080; // the default port to use
  return portfinder.getPortPromise().then(port => {
    const nodeEnv = env && env.prod ? 'production' : 'development';
    const isProd = nodeEnv === 'production'
    const plugins = [
      new HtmlWebpackPlugin({
        template: 'index.html',
        hash: true
      }), 
      new ExtReactWebpackPlugin({
        port: port,
        //theme: 'custom-ext-react-theme',
        //overrides: ['ext-react/overrides'],
        production: isProd
      })
    ]
    if (!isProd) {
      plugins.push(
        new webpack.HotModuleReplacementPlugin()
      )
    }
    return {
      mode: 'development',
      devtool: isProd ? 'source-map' : 'cheap-module-source-map',
      context: sourcePath,
      entry: {
        ext-react16: ['@sencha/ext-react16'],
        'app': [
          'babel-polyfill',
          './index.js'
        ]
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