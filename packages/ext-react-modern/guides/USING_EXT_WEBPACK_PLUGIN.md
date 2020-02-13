## Using ext-webpack-plugin for @sencha/ext-react-modern

### Adding ext-webpack-plugin to app

#### 1. install ExtReact Packages using npm

To add the ext-webpack-plugin, we must first
[eject](https://github.com/facebookincubator/create-react-app#converting-to-a-custom-setup)

To eject, run the following in the root directory of your app.

```
npm run eject
```

Two new folders are created:

- config
- scripts

also, many package entries are added to the 'dependencies' section of the 'package.json' file

#### 2. add to package.json

add the following to the dependencies section of 'package.json', after "@sencha/ext-react-classic": "^7.1.0",

```
    "@sencha/ext": "^7.1.0",
    "@sencha/ext-classic": "^7.1.0",
    "@sencha/ext-classic-theme-material": "^7.1.0",
    "@sencha/ext-webpack-plugin": "^7.1.0",
```

run npm install:

```
npm install
```

#### 3. add ext-webpack-plugin to 'config/webpack.config.js'

Add the following to the top of config/webpack.config.js:

```JavaScript
const ExtWebpackPlugin = require('@sencha/ext-webpack-plugin');
```

Add the following plugin entry:

- search for 'new HtmlWebpackPlugin'
- after the ), for that plugin entry, (around line 540) add the following:

```
      new ExtWebpackPlugin({
        framework: 'react',
        toolkit: 'classic',
        theme: 'theme-material',
        packages: [],
        script: '',
        emit: 'yes',
        port: 1962,
        profile: '',
        environment: 'development',
        treeshake: 'no',
        browser: 'no',
        watch: 'yes',
        verbose: 'no',
        inject: 'no',
        intellishake: 'no'
      }),
```

#### 4. in 'config/webpack.config.js' on or around line 171, change to this:

```
    output: {
      // The build folder.
      //path: isEnvProduction ? paths.appBuild : undefined,
      path: isEnvProduction ? paths.appBuild : paths.appPublic,
```

#### 5. in 'public/index.html', comment out the 3 script tags for the ExtReact engine and add a script and link tag:

```
<title>React App</title>
<script src="/ext/ext.js"></script>
<link rel="stylesheet" type="text/css" href="/ext/ext.css">

<!--
<script src="%PUBLIC_URL%/ext-runtime-classic/boot.js"></script>
<script src="%PUBLIC_URL%/ext-runtime-classic/engine.js"></script>
<script src="%PUBLIC_URL%/ext-runtime-classic/themes/css.classic.material.js"></script>
-->
```

#### 6. optionally, to stop the build from clearing the screen, make the following changes ineach of the files below:

- in 'scripts/start.js', on or around line 36
- in 'scripts/build.js', on or around line 39
- in 'node_modules/react-dev-utils/WebpackDevServerUtils.js', on or around line 23

```
//const isInteractive = process.stdout.isTTY;
const isInteractive = false;
```

#### 7. Add .ext-reactrc to the root of your project

Since create-react-app uses separate webpack config files for development and production, we recommend putting
shared config options for ExtReactWebpackPlugin in a `.ext-reactrc` file in the root of your project.  For example, the following sets the output path for the ExtReact bundle to static/js/ext-react, to match the default output path set by create-react-app.

```json
{
    "output": "static/js/ext-react"
}
```

#### 8. Add Ext as a global to the ESLint config

In package.json, add Ext as a global by changing the eslintConfig to:

```
"eslintConfig": {
  "extends": "react-app",
  "globals": {
    "Ext": true
  }
}
```

#### 9. run the create-react-app application

```
npm start
```

The ExtReact application will load in a browser window with the ext-webpack-plugin!

