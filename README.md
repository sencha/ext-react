# ext-react 6.6

This repo is for ExtReact 6.6, which supports React 16 and above

test

The @sencha/ext-react package makes it easy to use [Ext JS](https://www.sencha.com/products/extjs) components in your [React](https://facebook.github.io/react) app. 

[![Join the chat at https://gitter.im/sencha/extjs-reactor](https://badges.gitter.im/gitterHQ/gitterHQ.github.io.svg)](https://gitter.im/sencha/extjs-reactor?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

## Requirements

* React 16.x.x 
* Ext JS 6.6+

## To Use this repo 'as-is' (to run the demos on your local machine)

* this repo manages several packages at once using Lerna, so follow these instructions:
* go to the root of your cloned local repo
* run 'npm install' - this will do an 'npm install' for every project in the packages folder
* DO NOT run npm install in the individual folders

## Installation for an existing React application

```bash
# Be sure to install react>=16 

npm install --save @esencha/ext-react

npm install --save-dev @sencha/ext-react-webpack-plugin @sencha/ext-react-babel-plugin
```

## Getting Started with ExtReact

To create a new ExtReact app, we recommend using the [ExtReact Generator](https://github.com/sencha/ext-react/tree/master/packages/ext-react-gen):

```
npm install -g @sencha/ext-react-gen
@sencha/ext-react-gen
```

The application it creates uses react, react-router, webpack, and babel (ES2015+) and is based off of the [ExtReact Boilerplate](https://github.com/sencha/ext-react/tree/master/packages/ext-react-boilerplate).


## Getting Started with Ext JS and React

If you're starting from scratch with Ext JS and React, we recommend cloning one of the boilerplates and following the instructions there:

* [React + Ext JS Classic Boilerplate](https://github.com/sencha/ext-react/tree/master/packages/ext-react-classic-boilerplate)
* [React + Ext JS Modern Boilerplate](https://github.com/sencha/ext-react/tree/master/packages/ext-react-modern-boilerplate)

## Launching your Application

### `launch(React.Element/Function)`

To launch your app, add the following to your index.js file (your webpack entry point):

```javascript
import { launch } from '@sencha/ext-react'
import { ExtReact } from '@sencha/ext-react'
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
import { ExtReact } from '@sencha/ext-react';
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

TBD reviewed for v 2.x.x

If you do not need to create fullscreen components (for example if you're using ExtReact components with another 
layout system), you can apply the `renderWhenReady` higher-order component to topmost component containing an ExtReact 
element, omit the launch function, and render to a target element as is customary with React.  This is especially useful
if you're building a library of components based on ExtReact and you don't want to require the applications that 
use your library to call `launch`.

```jsx
// App.js
import React, { Component } from 'react';
import { Panel } from '@sencha/ext-modern';
import { renderWhenReady } from '@sencha/ext-react';

class App extends Component {
    render() {
        return (
         <Panel title="ExtReact">Hello World!</Panel>
        )
    }
}

export default renderWhenReady(App);
```

```jsx
// index.js
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(<App/>, document.getElementById('root'));
```

### React Hot Loader

Here is an example that uses the launch function's callback parameter to enable react-hot-loader.  The callback is passed a DOM element that can be used as the target when calling `ReactDOM.render`.

```javascript
import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { launch } from '@sencha/ext-react';
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

TBD reviewed for v2.x.x

Here's a minimal React app that renders an `Ext.Panel` from the classic toolkit:

```jsx
import React from 'react';
import { launch } from '@extjs/reactor';
import { Panel } from '@extjs/reactor/classic';

launch(
    <Panel title="ExtReact">
        Hello World!
    </Panel>
);
```

## Importing Components

TBD reviewed for v2.x.x

Any Ext JS component can be imported by the capitalized, camel-cased version of it's xtype.  For example, 

```jsx
import { Grid } from '@extjs/reactor/classic';
```

Dashes in xtypes should be converted to underscores.  For example:

```jsx
import { D3_HeatMap } from '@extjs/reactor/classic';
```

## Configuring Components

TBD reviewed for v2.x.x

React props are converted to Ext JS configs.  Here's a typical use of `Ext.grid.Panel`:

```jsx
import React, { Component } from 'react';
import { Grid } from '@extjs/reactor/classic';

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

TBD reviewed for v2.x.x

Any prop starting with "on" followed by a capital letter is automatically converted to an Ext JS event listener.  Since Ext JS events are all lower-case, case is not preserved.  You're free to use camel-case, which is common in React.

```jsx
import React, { Component } from 'react';
import { Slider } from '@extjs/@extjs/reactor/classic';

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
import { Slider } from '@extjs/reactor/classic';

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

### defaults

TBD reviewed for v2.x.x

Use the defaults prop to apply a set of props to all children.  For example, to use flex: 1 for all items in a container:

```jsx
<Container layout="vbox" defaults={{ flex: 1 }}>
    <Container>Item</Container>
</Container>
```

## Refs

TBD reviewed for v2.x.x

Refs point to Ext JS component instances:

```jsx
import React, { Component } from 'react';
import { Slider } from '@extjs/reactor/classic';

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
        console.log('Slider value', this.slider.getValue()); // this.slider is an Ext.slider.Single
    }
}
```

## Docked Items (Classic Toolkit)

TBD reviewed for v2.x.x

When using the Ext JS classic toolkit, any component with a `dock` prop is automatically added to (dockedItems)[http://docs.sencha.com/extjs/6.2.0/classic/Ext.panel.Panel.html#cfg-dockedItems].

Here is an example which docks a toolbar above a grid:

```jsx
import { Grid, Panel, Toolbar, TextField } from '@extjs/reactor/classic';

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

TBD reviewed for v2.x.x

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

TBD reviewed for v2.x.x

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
import { MyGrid } from '@extjs/reactor/classic';
```

If your component doesn't have an xtype, you can using the `reactify` function to convert any Ext JS component into a react component:

```jsx
import { reactify } from '@extjs/reactor';

const MyGrid = reactify(MyPackage.view.MyGrid);

function MyComponent() {
    return (
        <MyGrid/>
    )
}
```

## Building

TBD reviewed for v2.x.x

Select your toolkit, theme, and packages using [@extjs/reactor-webpack-plugin](https://github.com/sencha/extjs-reactor/tree/master/packages/reactor-webpack-plugin). The plugin scans your code and only includes the classes you need in the final bundle.  Here's an example:

```JavaScript
const ExtJSReactWebpackPlugin = require('@extjs/reactor-webpack-plugin');

module.exports = {
    ...
    plugins: [
        new ExtJSReactWebpackPlugin({
            sdk: 'ext', // location of Ext JS SDK.  You can either copy the sdk into your project or create a symbolic link to it.
            theme: 'theme-material', // the name of an Ext JS theme or a relative path to a custom theme
            toolkit: 'classic',
            packages: ['charts']
        })
    ]
    ...
}
```

We recommend creating a symbolic link called "ext" in the root of your project that points to your local copy of the Ext JS SDK.  You can do this on Mac OS and linux with the following command:

```
ln -s /path/to/ext-6.x.x ext
```

Or on windows:

```
mklink ext c:\path\to\ext-6.5.x
```



If you're using Babel, we recommend adding `@sencha/ext-react-babel-plugin` to your .babelrc.  The `ext-react-babel-plugin` require module compilation to be turned off.  For example:

```javascript
{
  "presets": [
    [ "es2015", { "modules": false } ],
    "stage-2",
    "react"
  ],
  "plugins": [
    "@sencha/ext-react-babel-plugin",
    "transform-runtime"
  ]
}
```

# Development

TBD reviewed for v2.x.x

You must be authenticated to Sencha's npm registry to set up a development environment.  To do this, run:

`npm login --registry=https://npm.sencha.com --scope=@extjs`

Use your support portal credentials.  If your username is your email address, replace "@" with "..".  For example, "developer..sencha.com".

This is a monorepo that uses lerna.  After cloning, run `npm install` at the root of the project tree to install and link dependencies in all packages.

## Running Against ExtReact Pre-Releases

TBD reviewed for v2.x.x

You can upgrade all packages to use the latest `ext-react` and `sencha-cmd` by using the test.npm.sencha.com registry and running

```
npm run install:clean
``` 

## Running Tests

TBD reviewed for v2.x.x

Tests are implemented using [Sencha Test](https://www.sencha.com/products/test/). See [packages/reactor-tests](https://github.com/sencha/extjs-reactor/tree/master/packages/reactor-tests) for instructions on how to set up a test environment.

# Packages

TBD reviewed for v2.x.x

* [@extjs/reactor](https://github.com/sencha/extjs-reactor/tree/master/packages/reactor) - A custom React renderer that lets you to use any Ext JS xtype as a JSX tag
* [@extjs/reactor-webpack-plugin](https://github.com/sencha/extjs-reactor/tree/master/packages/reactor-webpack-plugin) - Integrates Webpack with Sencha Cmd to produce optimized builds of Ext JS
* [@extjs/reactor-babel-plugin](https://github.com/sencha/extjs-reactor/tree/master/packages/reactor-babel-plugin) - Allows you to load reactified Ext JS components using ES6 import syntax.
* [@extjs/reactor-boilerplate](https://github.com/sencha/extjs-reactor/tree/master/packages/reactor-boilerplate) - An example project using React, Webpack, and Ext JS 6 with the modern toolkit.
* [@extjs/reactor-classic-boilerplate](https://github.com/sencha/extjs-reactor/tree/master/packages/reactor-classic-boilerplate) - An example project using React, Webpack, and Ext JS 6 with the classic toolkit.

# Contributing

## Contributor License Agreement

We'd love to accept patches and new boilerplates.  Before we can take them, we need you to sign [this CLA](Sencha-CLA.pdf).

Once we receive it, we'll be able to accept your pull requests.

## Contributing a Patch
1. Submit an issue describing your proposed change.
2. The repo owner will respond to your issue promptly.
3. If your proposed change is accepted, fork the repo, develop and test your code changes.
4. Submit a pull request.
