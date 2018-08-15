const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtReactWebpackPlugin = require('@sencha/ext-react-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WebpackShellPlugin = require('webpack-shell-plugin');
const sourcePath = path.join(__dirname, './src');

module.exports = function (env) {
    const nodeEnv = env && env.prod ? 'production' : 'development';
    const isProd = nodeEnv === 'production';
    const local = env && env.local;
    //const disableTreeShaking = env && env.treeShaking === 'false';
    const port = 8017

    const plugins = [
      //this plugin has to be first
      new HtmlWebpackPlugin({
        template: 'index.html',
        hash: true
      }), 
      new ExtReactWebpackPlugin({
        port: port,
        packages: local ? [
          'font-ext', 
          'ux', 
          'd3',
          'pivot-d3',
          'font-awesome', 
          'exporter', 
          'pivot', 
          'calendar', 
          'charts'
        ] : undefined,
        theme: 'theme-kitchensink',
        overrides: [
          path.join('.', 'ext-react', 'overrides')
        ],
        production: isProd,
        treeShaking: false
      }),
      new webpack.EnvironmentPlugin({
          NODE_ENV: nodeEnv
      }),
      new CopyWebpackPlugin([{
        from: path.join(__dirname, 'resources'), 
        to: 'resources'
      }]),
      new WebpackShellPlugin({
        dev: false,
        onBuildEnd: ['node extract-code.js']
      }),
      new webpack.NamedModulesPlugin()
    ];

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
            'vendor': ['react', 'prop-types', 'react-redux', 'react-dom', 'react-router-dom', 'history', 'redux', 'd3', 'highlightjs'],
            'ext-react16': ['@sencha/ext-react16'],
            'app': ['babel-polyfill','./index.js']
        },
        output: {
            path: path.join(__dirname, 'build'),
            filename: '[name].js'
        },
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /(node_modules|dist)/,
                    use: {
                        loader: 'babel-loader'
                    }
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
            // The following is only needed when running this boilerplate within the ext-react repo with lerna bootstrap.  You can remove this from your own projects.
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
            },
        }
    };
};

//https://medium.com/@hpux/webpack-4-in-production-how-make-your-life-easier-4d03e2e5b081
//https://stackoverflow.com/questions/49017682/webpack-4-migration-commonschunkplugin

