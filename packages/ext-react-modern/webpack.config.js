const path = require('path');
const webpack = require("webpack")
//const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

//var sdkTarget = 'SDK_FULL'
//var theme = 'material';
//var theme = 'triton';

module.exports = function () {
  return {
    mode: 'production',
    context: path.join(__dirname, './dist'),
    plugins: [
      // new webpack.NormalModuleReplacementPlugin(
      //   /(.*).material.(.*)/,
      //   function(resource){
      //     resource.request = resource.request
      //       .replace(/.material./, `.${ theme }.`);
      //   }
      // ),
      // new webpack.NormalModuleReplacementPlugin(
      //   /(.*).SDK_EMPTY(.*)/,
      //   function(resource){
      //     resource.request = resource.request
      //       .replace(/.SDK_EMPTY/, `.${ sdkTarget }`);
      //   }
      // ),
      //new BundleAnalyzerPlugin()
    ],
    entry: './index.js',
    output: {
      filename: `ext-react-classic.js`,
      path: path.resolve(__dirname)
    }
  }
}