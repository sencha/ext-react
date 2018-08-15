const webpack = require('webpack');
const path = require('path');

const config = {
	target: 'node',
	// node: {
	// 	fs: 'empty'
	// },
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, './dist'),
        filename: 'ext-react-babel-plugin.js',
        library: 'ExtReactBabelPlugin',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    module: {
        loaders: [{
            test: /(\.js)$/,
            loader: 'babel-loader',
            exclude: /node_modules/
        }]
    }
}

module.exports = config;