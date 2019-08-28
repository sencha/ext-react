const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtWebpackPlugin = require('@sencha/ext-webpack-plugin')

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
  var port = 8082
  const plugins = [
    new HtmlWebpackPlugin({ template: "index.html", hash: true, inject: "body" }),
    new ExtWebpackPlugin({
      framework: 'react',
      toolkit: 'modern',
      theme: 'theme-rest-example',
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
  if (!isProd) {
    plugins.push(
      new webpack.HotModuleReplacementPlugin()
    )
  }
  return {
    resolve: {
      alias: {
        "react-dom": path.resolve('./node_modules/react-dom'),
        "react": path.resolve('./node_modules/react')
        //'react-dom': '@hot-loader/react-dom',
        //react: path.resolve('./node_modules/react')
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
      { test: /\.(js|jsx)$/, exclude: /node_modules/, use: ['babel-loader'] },
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

}
