# ext-react 7.1.x

This repo is for ExtReact 7.1, which supports React 16 and above

The @sencha/ext-react package makes it easy to use [Ext JS](https://www.sencha.com/products/extjs) components in your [React](https://facebook.github.io/react) app.

[![Join the chat at https://gitter.im/sencha/ext-react](https://badges.gitter.im/gitterHQ/gitterHQ.github.io.svg)](https://gitter.im/sencha/ext-react?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

## Requirements

* React 16.12.x
* Ext JS 7.1+

## To Use this repo 'as-is' (to run the demos on your local machine)

* this repo manages several packages at once using Lerna, so follow these instructions:
* go to the root of your cloned local repo
* run 'npm install' - this will do an 'npm install' for every project in the packages folder
* DO NOT run npm install in the individual folders

## Installation for an existing React application

```bash
# Be sure to install react>=16

npm install --save @sencha/ext-react
npm install --save @sencha/ext @sencha/ext-modern @sencha/ext-modern-theme-material
npm install --save-dev @sencha/ext-webpack-plugin @sencha/ext-react-babel-plugin html-webpack-plugin
```

## Getting Started with ExtReact

To create a new ExtReact app, we recommend using the [ExtReact Generator](https://github.com/sencha/ext-react/tree/master/packages/ext-react-gen):

```
npm install -g @sencha/ext-react-gen

ext-react-gen app CoolExtReactApp

```

The application it creates uses react, react-router, webpack, and babel (ES2015+) and is based off of the [ExtReact Modern Boilerplate](https://github.com/sencha/ext-react/tree/master/packages/ext-react-modern-boilerplate).


## Getting Started with Ext JS and React

If you're starting from scratch with Ext JS and React, we recommend cloning one of the boilerplates and following the instructions there:

* [React + Ext JS Classic Boilerplate](https://github.com/sencha/ext-react/tree/master/packages/ext-react-classic-boilerplate)
* [React + Ext JS Modern Boilerplate](https://github.com/sencha/ext-react/tree/master/packages/ext-react-modern-boilerplate)

## Launching your Application

### `launch(React.Element/Function)`

To launch your app, add the following to your index.js file (your webpack entry point):

```javascript
import { launch } from '@sencha/ext-react-modern'
import { ExtReact } from '@sencha/ext-react-modern'
import App from './App'

launch(<ExtReact><App/></ExtReact>)
```

The launch function renders the specified component into the document body. It also accepts a callback function that returns the component to be rendered:

```javascript
launch(() => {
  // do some initialization before initial render
  // ...

  // return the component to be rendered
  return <ExtReact><App/></ExtReact>
})
```

The `launch` function serves two purposes:

1. It delays your App's initial render until the ExtReact class system is fully initialized
2. It creates a viewport, which is needed for creating components that take up the full height and width of the screen.

When using `launch` you do not need a separate target `<div id="root"/>` in your `index.html` file. If you have one you
should remove it. The code above replaces the typical code for launching a React app, which generally looks something like:

```javascript
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(<App/>, document.getElementById('root'));
```

### your app component

```jsx
// App.js
import React, { Component } from 'react';
import { ExtReact } from '@sencha/ext-react-modern';
import { Panel } from '@sencha/ext-modern';

class App extends Component {
  render() {
    return (
      <ExtReact>
        <Panel title="ExtReact">Hello World!</Panel>
      <ExtReact>
    )
  }
}
```

### renderWhenReady(Component)

If you do not need to create fullscreen components (for example if you're using ExtReact components with another
layout system), you can apply the `renderWhenReady` higher-order component to topmost component containing an ExtReact
element, omit the launch function, and render to a target element with render (just like ReactDOM.render).  This is especially useful
if you're building a library of components based on ExtReact and you don't want to require the applications that
use your library to call `launch`.

```jsx
// App.js
import React, { Component } from 'react'
import { Panel } from '@sencha/ext-modern'
import { renderWhenReady } from '@sencha/ext-react-modern'
import { ExtReact } from '@sencha/ext-react-modern'

class App extends Component {
  render() {
    return (
      <ExtReact>
        <Panel title="hello"style={{height:'400px'}}>Hello World!</Panel>
      </ExtReact>
    )
 }
}

export default renderWhenReady(App)
```

```jsx
// index.js
import React from 'react'
import App from './App'
import { render } from '@sencha/ext-react-modern'

render(<App/>, document.getElementById('root'))
```

### React Hot Loader

Here is an example that uses the launch function's callback parameter to enable react-hot-loader.  The callback is passed a DOM element that can be used as the target when calling `ReactDOM.render`.

```javascript
import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { launch } from '@sencha/ext-react-modern';
import App from './App'

let viewport;

const render = (Component, target) => {
  ReactDOM.render(
    <AppContainer>
      <Component/>
    </AppContainer>,
    target
  )
}

launch(target => render(App, viewport = target));

if (module.hot) {
  module.hot.accept('./App', () => render(App, viewport));
}
```

### HTML Doctype

The HTML5 doctype declaration is required for ExtReact components to display properly.  Please
make sure that this begins your HTML document:

```html
<!doctype html>
```

### Viewport Meta Tag

ExtReact requires a viewport meta tag.  This should be added to the `head` element in your index.html.

```html
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
```

## The `fullscreen` config

2.x.x Root component or ExtReact will handle this

Most apps that use ExtReact are single-page applications that occupy the full height and width of the browser window.  To acheive this, the root ExtReact component in your app should be configured with the `fullscreen` prop set to `true`.  For example:

```javascript
import { Container } from '@sencha/ext-modern';

export default function App() {
  return (
    <Container fullscreen>
      ...
    </Container>
  )
}
```

## Hello World

Here's a minimal React app that renders an `Ext.Panel` from the classic toolkit:

```jsx
import React from 'react';
import { launch } from '@sencha/ext-react-modern'
import { Panel } from '@sencha/ext-modern'

launch(
  <Panel title="ExtReact">
    Hello World!
  </Panel>
);
```

## Importing Components

Any Ext JS component can be imported by the capitalized, camel-cased version of it's xtype.  For example,

```jsx
import { Grid } from '@sencha/ext-classic';
```

Dashes in xtypes should be converted to underscores.  For example:

```jsx
import { D3_HeatMap } from '@sencha/ext-D3';
```

## Configuring Components

React props are converted to Ext JS configs.  Here's a typical use of `Ext.grid.Panel`:

```jsx
import React, { Component } from 'react';
import { Grid } from '@sencha/ext-classic';

export default class MyComponent extends Component {
  render() {
    return (
      <Grid
        columns={[
          { text: 'Name', dataIndex: 'name' },
          { text: 'Email', dataIndex: 'email' }
        ]}
        store={{
          fields: ['name', 'email'],
          data: [
            { name: 'Tim Smith', email: 'tim101@gmail.com' },
            { name: 'Jill Lindsey', email: 'jlindsey890@gmail.com' }
          ]
        }}
      />
    )
  }
}
```

## Handling Events

Any prop starting with "on" followed by a capital letter is automatically converted to an Ext JS event listener.  Since Ext JS events are all lower-case, case is not preserved.  You're free to use camel-case, which is common in React.

```jsx
import React, { Component } from 'react';
import { Slider } from '@sencha/ext-classic';

export default function MyComponent() {
  return (
    <Slider
      minValue={0}
      maxValue={100}
      onChange={(slider, value) => console.log(`Value set to ${value}`)}
    />
  )
}
```

Event handler props can also take an object with additional options:

```jsx
<Button
  onAfterRender={{
    single: true, // handler will only be called once
    fn: () => {...}
  }}
/>
```

You can also use a listeners object as is common in traditional Ext JS:

```jsx
import React, { Component } from 'react';
import { Slider } from '@sencha/ext-classic';

export default function MyComponent() {
  return (
    <Slider
      minValue={0}
      maxValue={100}
      listeners={{
        change: (slider, value) => console.log(`Value set to ${value}`)
      }}
    />
  )
}
```

## Special Props

## Refs

Refs point to Ext JS component instances:

```jsx
import React, { Component } from 'react';
import { Slider } from '@sencha/ext-classic';

export default class MyComponent {
  render() {
    return (
      <Slider
        ref={ slider => this.slider = slider }
        minValue={0}
        maxValue={100}
        onChange={() => this.onChange()}
      />
    )
  }

  onChange() {
    console.log('Slider value', this.slider.cmp.getValue()); // this.slider is an Ext.slider.Single
  }
}
```

## Docked Items (Classic Toolkit)

TBD reviewed for v2.x.x

When using the Ext JS classic toolkit, any component with a `dock` prop is automatically added to (dockedItems)[http://docs.sencha.com/extjs/6.7.0/classic/Ext.panel.Panel.html#cfg-dockedItems].

Here is an example which docks a toolbar above a grid:

```jsx
import { Grid, Panel, Toolbar, TextField } from '@sencha/ext-classic';

function MyComponent(props) {
  return (
    <Panel layout="fit">
      <Toolbar dock="top">
        <TextField emptyText="Search..." flex={1}/>
      </Toolbar>
      <Grid>...</Grid>
    </Panel>
  )
}
```

## Using HTML Elements and Non-Ext JS Components Inside of Ext JS Components

HTML elements and other non-Ext JS React components are wrapped in an Ext.Component instance when they appear within an Ext JS Component.  This is allows Ext JS layouts to work with non-Ext JS components.  For example...

```jsx
<Panel layout="hbox">
  <div>left</div>
  <div>right</div>
</Panel>
```
... will result in two divs side-by-side.  The component structure created is equivalent to:

```javascript
Ext.create({
  xtype: 'panel',
  layout: 'hbox'
  items: [{
    xtype: 'component',
    html: '<div>left</div>'
  }, {
    xtype: 'component',
    html: '<div>right</div>'
  }]
});
```

When an Ext JS component contains only text, that text will be set as the html config of the component.  For example...

```jsx
<Panel>Hello World!</Panel>
```

... results in ...

```javascript
Ext.create({
  xtype: 'panel',
  html: 'Hello World!'
});
```

## Using Custom Ext JS Components

You can import custom Ext JS components in much the same way you would those from Ext JS itself.  Just reference the camel-case version of the component's xtype.

For example, given the following component:

```javascript
Ext.define('MyPackage.view.MyGrid', {
  extend: 'Ext.grid.Grid',
  xtype: 'mygrid'
})
```

You could import and use that component using:

```jsx
import { MyGrid } from '@sencha/ext-classic';
```

If your component doesn't have an xtype, you can using the `reactify` function to convert any Ext JS component into a react component:

```jsx
import { reactify } from '@sencha/ext-react-modern'

const MyGrid = reactify(MyPackage.view.MyGrid);

function MyComponent() {
  return (
    <MyGrid/>
  )
}
```

## Building

Select your toolkit, theme, and packages using [@sencha/ext-webpack-plugin](https://github.com/sencha/ext-react/tree/master/packages/ext-webpack-plugin). The plugin scans your code and only includes the classes you need in the final bundle.  Here's an example:

```JavaScript
const ExtWebpackPlugin = require('@sencha/ext-webpack-plugin');

module.exports = {
  ...
  plugins: [
    new ExtWebpackPlugin({
      framework: 'react',
      toolkit: 'classic',
      port: '1962',
      theme: 'theme-material', // the name of an Ext JS theme or a relative path to a custom theme
      packages: ['charts']
    })
  ]
  ...
}
```

If you're using Babel, we recommend adding `@sencha/ext-react-babel-plugin` to your .babelrc.  The `ext-react-babel-plugin` require module compilation to be turned off.  For example:

```javascript
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "modules": false
      }
    ],
    "@babel/preset-react"
  ],
  "plugins": [
    "react-hot-loader/babel",
    "@sencha/ext-react-babel-plugin",
    "@babel/plugin-transform-runtime",
    "@babel/plugin-syntax-dynamic-import",
    "@babel/plugin-syntax-import-meta",
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-proposal-json-strings",
    [
      "@babel/plugin-proposal-decorators",
      {
        "legacy": true
      }
    ],
    "@babel/plugin-proposal-function-sent",
    "@babel/plugin-proposal-export-namespace-from",
    "@babel/plugin-proposal-numeric-separator",
    "@babel/plugin-proposal-throw-expressions"
  ],
  "ignore": [
    "build"
  ],
  "env": {
    "test": {
      "presets": [
        "@babel/preset-env",
        "@babel/preset-react"
      ],
      "plugins": [
        "@babel/plugin-syntax-dynamic-import",
        "@babel/plugin-syntax-import-meta",
        "@babel/plugin-proposal-class-properties",
        "@babel/plugin-proposal-json-strings",
        [
          "@babel/plugin-proposal-decorators",
          {
            "legacy": true
          }
        ],
        "@babel/plugin-proposal-function-sent",
        "@babel/plugin-proposal-export-namespace-from",
        "@babel/plugin-proposal-numeric-separator",
        "@babel/plugin-proposal-throw-expressions"
      ]
    }
  }
}
```

# Development

You must be authenticated to Sencha's npm registry to set up a development environment.  To do this, run:

`npm login --registry=https://npm.sencha.com --scope=@sencha`

Use your support portal credentials.  If your username is your email address, replace "@" with "..".  For example, "developer..sencha.com".

This is a monorepo that uses lerna.  After cloning, run `npm install` at the root of the project tree to install and link dependencies in all packages.

## Running Against ExtReact Pre-Releases

You can upgrade all packages to use the latest `ext-react` and `sencha-cmd` by using the test.npm.sencha.com registry and running

```
npm run install:clean
```

## Running Tests

Tests are implemented using [Sencha Test](https://www.sencha.com/products/test/). See [packages/ext-react-tests](https://github.com/sencha/ext-react/tree/master/packages/ext-react-tests) for instructions on how to set up a test environment.

# Packages

* [@sencha/ext-react](https://github.com/sencha/ext-react/tree/master/packages/ext-react) - A custom React renderer that lets you to use any Ext JS xtype as a JSX tag
* [@sencha/ext-webpack-plugin](https://github.com/sencha/ext-react/tree/master/packages/ext-webpack-plugin) - Integrates Webpack with Sencha Cmd to produce optimized builds of Ext JS
* [@sencha/ext-react-babel-plugin](https://github.com/sencha/ext-react/tree/master/packages/ext-react-babel-plugin) - Allows you to load reactified Ext JS components using ES6 import syntax.
* [@sencha/ext-react-modern-boilerplate](https://github.com/sencha/ext-react/tree/master/packages/ext-react-modern-boilerplate) - An example project using React, Webpack, and Ext JS 6 with the modern toolkit.
* [@sencha/ext-react-classic-boilerplate](https://github.com/sencha/ext-react/tree/master/packages/ext-react-classic-boilerplate) - An example project using React, Webpack, and Ext JS 6 with the classic toolkit.

# Contributing

## Contributor License Agreement

We'd love to accept patches and new boilerplates.  Before we can take them, we need you to sign [this CLA](Sencha-CLA.pdf).

Once we receive it, we'll be able to accept your pull requests.

## Contributing a Patch
1. Submit an issue describing your proposed change.
2. The repo owner will respond to your issue promptly.
3. If your proposed change is accepted, fork the repo, develop and test your code changes.
4. Submit a pull request.
