# Adding ext-webpack-plugin to app generated with create-react-app

Follow these steps to add the ExtWebpackPlugin to your ejected app.  For reference, all of the changes needed to get ExtReact working after ejecting from create-react-app are captured in [this diff](https://github.com/sencha/ext-react-cra-eject/compare/after-eject...with-ext-react).

### 1. Install ExtReact Packages using npm

* Note, you must be signed into the Sencha npm registry to access the ExtReact packages. See [Authenticating to Sencha's npm Registry](getting_started.html#getting_started_-_authenticating_to_sencha_s_npm_registry) for more information.

## Ejecting

There is no way to add a webpack plugin to create-react-app.  To add the ext-webpack-plugin, we must first [eject](https://github.com/facebookincubator/create-react-app#converting-to-a-custom-setup) to copy the default configuration into your project so it can be modified.  To eject, run the following in the root directory of your app.

```
npm run eject
```

2 new folders are created:

- config
- scripts

also, many package entries are added to the 'dependencies' section of the 'package.json' file

### add to package.json

add the following to the dependencies section of 'package.json'

```
"@sencha/ext": "^7.1.0",
"@sencha/ext-classic": "^7.1.0",
"@sencha/ext-classic-theme-material": "^7.1.0",
"@sencha/ext-react-classic": "^7.1.0",
"@sencha/ext-webpack-plugin": "^7.1.0",
```

run npm install:

```
npm install
```

### add ext-webpack-plugin to 'config/webpack.config.js'

Add the following to the top of config/webpack.config.js:

```JavaScript
const ExtWebpackPlugin = require('@sencha/ext-webpack-plugin');
```

Add the following plugin entry:

- search for 'new HtmlWebpackPlugin'
- after the ), for that plugin entry, add the following:

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

### in 'public/index.html', comment out the 3 script tags for the ExtReact engine and add a script and link tag:

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

### in 'config/webpack.config.js' on or around line 171, change to this:

```
    output: {
      // The build folder.
      //path: isEnvProduction ? paths.appBuild : undefined,
      path: isEnvProduction ? paths.appBuild : paths.appPublic,
```

### optionally, to stop the build from clearing the screen, make the following changes ineach of the files below:

- in 'scripts/start.js', on or around line 36
- in 'scripts/build.js', on or around line 39
- in 'node_modules/WebpackDevServerUtils.js', on or around line 39

```
//const isInteractive = process.stdout.isTTY;
const isInteractive = false;
```

### run the create-react-app application

```
npm start
```


























### 7. Add .ext-reactrc to the root of your project

Since create-react-app uses separate webpack config files for development and production, we recommend putting
shared config options for ExtReactWebpackPlugin in a `.ext-reactrc` file in the root of your project.  For example, the following sets the output path for the ExtReact bundle to static/js/ext-react, to match the default output path set by create-react-app.

```json
{
    "output": "static/js/ext-react"
}
```

### 8. Add Ext as a global to the ESLint config

In package.json, add Ext as a global by changing the eslintConfig to:

```
"eslintConfig": {
  "extends": "react-app",
  "globals": {
    "Ext": true
  }
}
```

