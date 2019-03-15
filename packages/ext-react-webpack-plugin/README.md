# ExtReact Webpack Plugin

This [Webpack](http://webpack.github.io/) plugin produces a minimized build of the [Sencha Ext JS](https://www.sencha.com/products/extjs) framework containing only those classes used by your React app.  Use with the react-extjs custom renderer for React.

## How it works
The plugin crawls your React source code looking for JSX tags that match Ext JS xtypes as well as calls to Ext.create() and Ext.require() to compile a list of classes used by your app.  It then uses [Sencha Cmd](https://www.sencha.com/products/extjs/cmd-download/) to produce an optimized build of Ext JS containing only those classes and corresponding CSS.  You include the built js and css
files into your index.html.

## Dependencies
You must have Ext JS 6.6+ and Sencha Cmd 6.6+ to use this plugin.

## Plugin Order

The ExtReactWebpackPlugin adds assets to the webpack build (ext.js and ext.css).  As a result it needs to appear before HtmlWebpackPlugin in the webpack config's `plugins` array.

## Options
The ExtReactWebpackPlugin constructor takes an object with the following properties:

### toolkit (optional) [string]
"modern" or "classic".  Defaults to "modern".

### theme (optional) [string]
The name of the theme package to use, or the path to a custom theme package. Defaults to "theme-triton".

### packages (optional) [string[]]
Packages to include.  Values correspond to the names of directories in the packages directory of your SDK.

### overrides (optional) [string[]]
Paths to directories or files containing Ext JS overrides.

### output (optional) [string]
The path within the output directory in which the Ext JS build should be created.  Defaults to "ext-react"

### production (optional) [boolean]
Set to true for production builds.  This compresses the generated Ext JS bundle.  Defaults to false.

### test (optional) [RegExp]
All files matching this pattern will be searched for usage of Ext classes to include in the build.  Defaults to `/\.jsx?$/`

### asynchronous (optional) [boolean]
Set to true to run Sencha Cmd builds asynchronously.  This makes the webpack build finish much faster, but the app may not load correctly in your browser until Sencha Cmd is finished building the Ext JS bundle.  Defaults to false.

### debug (optional) [boolean]
True to output debug information.  Defaults to false.

### treeShaking (optional) [boolean]
Set to false to disable tree shaking in development builds.  This makes incremental rebuilds faster by including all
ExtReact components in the initial build and thus not requiring a rebuild after each change.  This option only takes affect when `production` is set to false. Defaults to `true`.


## Example

```javascript
'use strict';

const path = require('path');
const webpack = require('webpack');
const ExtWebpackPlugin = require('@sencha/ext-webpack-plugin');

module.exports = {
    devtool: 'inline-source-map',
    entry: [
        './src/index'
    ],
    output: {
        path: path.join(__dirname, 'build'),
        filename: 'index.js'
    },
    plugins: [
        new ExtWebpackPlugin({
          framework: 'react,
          toolkit: 'modern',
          port: 1962,
          theme: 'theme-material',
          packages: ['ux', 'calendar']
        })
    ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel',
                include: [
                    path.join(__dirname, 'src')
                ]
            },
            {
                test: /\.css$/,
                loader: 'style!css'
            },
            {
                test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
                exclude: /\/favicon.ico$/,
                loader: 'file',
                query: {
                    name: 'static/media/[name].[hash:8].[ext]'
                }
            }
        ]
    }
};
```
