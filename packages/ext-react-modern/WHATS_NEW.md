## What's new for @sencha/ext-react-modern

last run: Tue Jan 21 2020 08:28:21 GMT-0500 (Eastern Standard Time)

### What's new in version 7.1

#### separate modern and classic packages

7.1 now supports separate packages for the modern and classic toolkits of Ext JS
- @sencha/ext-react-modern
- @sencha/ext-react-classic

The @sencha/ext-react package has been deprecated

#### deprecated packages - see git repo
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


#### removal of ext-react-babel-plugin from .babelrc and/or package.json
#### need a rood <div> around plain text

#### optional - no need for webpack plugin
- see Getting Started guide for an example
