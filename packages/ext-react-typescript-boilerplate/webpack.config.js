const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtReactWebpackPlugin = require('@extjs/reactor-webpack-plugin');
const portfinder = require('portfinder');
const sourcePath = path.join(__dirname, './src');

module.exports = function (env) {
  portfinder.basePort = (env && env.port) || 8080; // the default port to use
  return portfinder.getPortPromise().then(port => {
    const nodeEnv = env && env.prod ? 'production' : 'development';
    const isProd = nodeEnv === 'production';
    const plugins = [
      new HtmlWebpackPlugin({
        template: 'index.html',
        hash: true
      }),
      new ExtReactWebpackPlugin({
        port: port,
        theme: 'custom-ext-react-theme',
        overrides: ['ext-react/overrides'],
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
          reactor16: ['@extjs/reactor16'],
          'app': [
            'babel-polyfill',
            './index.tsx'
          ]
        },
        output: {
          path: path.join(__dirname, 'build'),
          filename: '[name].js',
        },
        module: {
          rules: [
            {
              test: /\.(ts|tsx)$/,
              //include: path.join(__dirname, 'ExtReact.d.ts'),
              exclude: /node_modules/,
              use: [
                {
                  loader: 'babel-loader',
                  options: {
                    "plugins": [
                        "@extjs/reactor-babel-plugin"
                    ]
                  }
                },
                {
                  loader: 'awesome-typescript-loader'
                }
              ]
            }
          ]
        },
        resolve: {
            extensions: ['.ts', '.tsx', '.js', '.json'],
            // The following is only needed when running this boilerplate within the extjs-reactor repo.  You can remove this from your own projects.
            alias: {
              "react-dom": path.resolve('./node_modules/react-dom'),
              "react": path.resolve('./node_modules/react')
            }
        },
        plugins,
        devServer: {
          contentBase: './build',
          historyApiFallback: true,
          host: '0.0.0.0',
          disableHostCheck: true,
          port: port,
          compress: isProd,
          inline: !isProd,
          hot: !isProd,
          stats: {
            assets: true,
            children: false,
            chunks: false,
            hash: false,
            modules: false,
            publicPath: false,
            timings: true,
            version: false,
            warnings: true,
            colors: {
              green: '\u001b[32m'
            }
          }
        }
      }
  })
}