## What's new for @sencha/ext-react-modern

### What's new in version 7.3.0

- new npm package for runtime
  - @sencha/ext-classic-runtime
  - @sencha/ext-material-runtime

- support for Ext JS 7.2

### What's new in version 7.1

#### separate modern and classic packages

7.1 now supports separate packages for the modern and classic toolkits of Ext JS
- @sencha/ext-react-modern
- @sencha/ext-react-classic

The @sencha/ext-react package has been deprecated

#### deprecated packages - see git repo

- deprecate-ext-react
- deprecate-ext-react-babel-plugin
- deprecate-ext-react-classic-demo
- deprecate-ext-react-renderercell (this functionality now imbedded in ext-react-modern and ext-react-classic)
- deprecate-ext-react-transition
- deprecate-ext-react-webpack-plugin (now ext-webpack-plugin)

#### launching an app

Launching an ExtReact application has been simplified:

```
import React from 'react';
//import ReactDOM from 'react-dom';
import ExtReactDOM from '@sencha/ext-react-modern';
import App from './App';

ExtReactDOM.render(<App />, document.getElementById('root'));
```

#### removal of need for <ExtReact> root element

#### all imports now from '@sencha/ext-react-modern'
#### all elements imported now prefixed with Ext

import { ExtGrid, ExtButton } from "@sencha/ext-react-modern";

#### new viewport="true" property
#### onReady event - all components available, cmp and cmpObj
#### using cmpObj

To use the Ext JS viewport, add this to root element:

```
<ExtContainer
  viewport={ true }
  extname="containerExt"
  ref={ containerReact => this.containerReact = containerReact }
  onReady={ this.extReactDidMount }
>
</ExtContainer>

extReactDidMount = ({cmp, cmpObj}) => {
  for (var prop in cmpObj) {this[prop] = cmpObj[prop]}
  console.log(this['containerExt'])
  console.log(this.containerExt)
  console.log(this.containerReact.cmp)
}
```

#### event name case change
for example: onActiveTabChange is now onActivetabchange

#### event parameters now follow what is documented
for example: for tab change event:

```
  onTabChange = ({sender, value, oldValue}) => {

  }
```

#### removal of ext-react-babel-plugin from .babelrc and/or package.json
#### need a rood <div> around plain text

#### optional - no need for webpack plugin
- see Getting Started guide for an example
