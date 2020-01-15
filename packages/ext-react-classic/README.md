## @sencha/ext-react-classic

last run: Wed Jan 15 2020 09:03:42 GMT-0500 (Eastern Standard Time)

This npm package contains the needed files to add the @sencha/ext-react-classic package to a React application

### Login to the Sencha npm repo

* Note, you must be signed into the Sencha npm registry to access packages.
See [Authenticating to Sencha's npm Registry](getting_started.html#getting_started_-_authenticating_to_sencha_s_npm_registry)
for more information.

production:

```sh
npm login --registry=https://npm.sencha.com/ --scope=@sencha
```

early adopter:

```sh
npm login --registry=https://sencha.myget.org/F/early-adopter/npm/ --scope=@sencha
```

### Create a React application with create-react-app

- Run the following:

```sh
npx create-react-app ext-react-classic-demo --template @sencha/ext-react-classic
```

create-react-app will create a new application using the ext-react-classic template
(from the sencha/ext-react git repo)

- When create-react-app is completed, Run the following:

```sh
cd ext-react-classic-demo
```

- To change the theme, edit 'public/index.html' and uncomment one of the links below this line:

```sh
<script src="%PUBLIC_URL%/ext-runtime-classic/themes/css.classic.material.js"></script>
```

- To start the ExtReact application, run the following in a terminal window:

```sh
npm start
```

The ExtReact application will load in a browser window!

<hr>

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

<hr>

### Review Code

#### Open an editor to review the code that was added to your ExtReact project

(You can use any editor)

To open Visual Studio Code, type the following:

```sh
code .
```

#### Review the code that was added to your ExtReact project

- Replaced ./src/index.js with:

```sh
import React from 'react';
//import ReactDOM from 'react-dom';
import ExtReactDOM from '@sencha/ext-react-classic';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ExtReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
```

- Replaced ./src/App.js with:

```sh
import React, { Component } from 'react';
import { ExtGrid } from "@sencha/ext-react-classic";

class App extends Component {

  constructor() {
    super()
    var data=[
      { name: 'Marc', email: 'marc@gmail.com',priceChangePct: .25 },
      { name: 'Nick', email: 'nick@gmail.com',priceChangePct: .35 },
      { name: 'Andy', email: 'andy@gmail.com',priceChangePct: 1.45 }
    ]
    this.store = { xtype: 'store', data: data }
  }

  renderSign = (value, context) => {
    var iValue = parseInt(value);
    var color;
    if (iValue > 0)
      { color = 'green'; }
    else
      { color = 'red'; }
    return `<span style="color:$;">
    $
    <i class="fa fa-camera-retro fa-lg"></i>
    </span>`
  }

  render() {
    return (
      <ExtGrid
        extname="gridExt"
        viewport={ true }
        ref={ gridReact => this.gridReact = gridReact }
        title="The Grid"
        store={ this.store }
        onReady={ this.extReactDidMount }
        columns=[object Object]
      >
      </ExtGrid>
    )
  }

  extReactDidMount = ({cmp, cmpObj}) => {
    for (var prop in cmpObj) {this[prop] = cmpObj[prop]}
    console.log(this['gridExt'])
    console.log(this.gridExt)
    console.log(this.gridReact.cmp)
  }

}
export default App;
```

