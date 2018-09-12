const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtReactWebpackPlugin = require('@sencha/ext-react-webpack-plugin')
const portfinder = require('portfinder')
const sourcePath = path.join(__dirname, './src');

module.exports = function (env) {
  portfinder.basePort = (env && env.port) || 1962; // the default port to use
  return portfinder.getPortPromise().then(port => {
    const nodeEnv = env && env.prod ? 'production' : 'development';
    const isProd = nodeEnv === 'production'
    const local = env && env.local
    const plugins = [
      new HtmlWebpackPlugin({
        template: 'index.html',
        hash: true
      }), 
      new ExtReactWebpackPlugin({
        port: port,
        production: isProd,
        treeShaking: false
      }),
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery"
      })
    ]
    if (!isProd) {
      plugins.push(
        new webpack.HotModuleReplacementPlugin()
      )
    }
    return {
      mode: 'development',
      cache: true, //??
      devtool: isProd ? 'source-map' : 'cheap-module-source-map',
      context: sourcePath,
      entry: {
        'vendor': ['react', 'prop-types', 'react-dom', 'react-router-dom', 'history'],
        'ext-react': ['@sencha/ext-react'],
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
          },
          {
            test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
            use: "url-loader?limit=10000&mimetype=application/font-woff"
          }, {
            test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
            use: "url-loader?limit=10000&mimetype=application/font-woff"
          }, {
            test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
            use: "url-loader?limit=10000&mimetype=application/octet-stream"
          }, {
            test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
            use: "file-loader"
          }, {
            test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
            use: "url-loader?limit=10000&mimetype=image/svg+xml"
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