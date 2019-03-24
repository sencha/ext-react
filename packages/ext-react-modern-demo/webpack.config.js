const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { BaseHrefWebpackPlugin } = require('base-href-webpack-plugin');
const ExtWebpackPlugin = require('@sencha/ext-react-webpack-plugin');

const portfinder = require('portfinder')

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
      new HtmlWebpackPlugin({ template: "index.html", hash: true, inject: "body" }),
      new BaseHrefWebpackPlugin({ baseHref: basehref }),
      new ExtWebpackPlugin({
        framework: 'react',
        toolkit: 'modern',
        theme: 'theme-material',
        packages: [
        ],
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
    return {
      resolve: {
        alias: {
          'react-dom': '@hot-loader/react-dom'
        }
      },
      mode: environment,
      devtool: (environment === 'development') ? 'inline-source-map' : false,
      context: path.join(__dirname, './src'),
      entry: './index.js',
      output: {
        path: path.join(__dirname, outputFolder),
        filename: "[name].js"
      },
      plugins: plugins,
      module: {
        rules: [
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



// const webpack = require('webpack');
// const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin')
// const ExtWebpackPlugin = require('@sencha/ext-react webpack-plugin')
// const portfinder = require('portfinder')
// const sourcePath = path.join(__dirname, './src')

// module.exports = function (env) {
//   var browserprofile = JSON.parse(env.browser) || true
//   var watchprofile = env.watch || 'yes'
//   var buildprofile = env.profile || process.env.npm_package_extbuild_defaultprofile
//   var buildenvironment = env.environment || process.env.npm_package_extbuild_defaultenvironment
//   var buildverbose = env.verbose || process.env.npm_package_extbuild_defaultverbose
//   if (buildprofile == 'all') { buildprofile = '' }
//   const isProd = buildenvironment === 'production'

//   portfinder.basePort = (env && env.port) || 1962
//   return portfinder.getPortPromise().then(port => {
//     const plugins = [
//       new HtmlWebpackPlugin({
//         template: './index.html',
//         hash: true
//       }), 
//       new webpack.DefinePlugin({
//         MESSAGE: JSON.stringify('Message from Define Plugin')
//       }),
//       new ExtWebpackPlugin({
//         framework: 'react',
//         port: port,
//         emit: true,
//         browser: browserprofile,
//         watch: watchprofile,
//         profile: buildprofile, 
//         environment: buildenvironment, 
//         verbose: buildverbose,
//         theme: 'theme-material',
//         packages: []
//       })
//     ]
//     if (!isProd) {
//       plugins.push(
//         new webpack.HotModuleReplacementPlugin()
//       )
//     }
//     return {
//       mode: 'development',
//       cache: true,
//       devtool: isProd ? 'source-map' : 'cheap-module-source-map',
//       context: sourcePath,
//       entry: {
//         'app': ['./index.js']
//       },
//       output: {
//         path: path.resolve(__dirname, 'build'),
//         filename: '[name].js'
//       },
//       module: {
//         rules: [
//           {
//             test: /\.(js|jsx)$/,
//             exclude: /node_modules/,
//             use: [
//               'babel-loader'
//             ]
//           },
//           {
//             test: /\.css$/,
//             use: [
//                 'style-loader', 
//                 'css-loader'
//             ]
//           }
//         ]
//       },
//       resolve: {
//         // The following is only needed when running this boilerplate within the ext-react repo.  You can remove this from your own projects.
//         alias: {
//           "react-dom": path.resolve('./node_modules/react-dom'),
//           "react": path.resolve('./node_modules/react')
//         }
//       },
//       plugins,
//       devServer: {
//         contentBase: './build',
//         historyApiFallback: true,
//         hot: false,
//         host: '0.0.0.0',
//         port: port,
//         disableHostCheck: false,
//         compress: isProd,
//         inline: !isProd,
//         stats: {
//           assets: false,
//           children: false,
//           chunks: false,
//           hash: false,
//           modules: false,
//           publicPath: false,
//           timings: false,
//           version: false,
//           warnings: false,
//           colors: {
//             green: '\u001b[32m'
//           }
//         }
//       }
//     }
//   })
// }