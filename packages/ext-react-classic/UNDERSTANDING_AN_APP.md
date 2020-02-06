## Understanding an app for @sencha/ext-react-classic

This guide will illustrate some of the key features of ExtReact within a React application.
To get a starter application created,
follow the [Getting Started guide](https://github.com/sencha/ext-react/blob/ext-react-7.1.1/packages/ext-react-classic/GETTING_STARTED.md).

## adding ExtReact to an existing React application

To add ExtReact to an existing application created with create-react-app, run the following
in the root folder of the React app:

```
npm install @sencha/ext-react-classic
``

This will create a 'public/ext-runtime-classic' folder, and also add several entries in the 'public/index.html'
file.

```
<script src="%PUBLIC_URL%/ext-runtime-classic/classic.engine.js"></script>
<link href="%PUBLIC_URL%/ext-runtime-classic/material/material-all.css" rel="stylesheet" type="text/css"></link>
```

The original index.html is backed up as public.indexBack.html'


## Changing the theme for an ExtReact app

in the 'public/ext-runtime-classic' folder, you will notice several theme folders.  To change
and use one of these themes, find the following line:

```
<link href="%PUBLIC_URL%/ext-runtime-classic/material/material-all.css" rel="stylesheet" type="text/css"></link>
```

notice that this line points to the material folder and material-all.css file.  For example, to change to triton, update to the following:

```
<link href="%PUBLIC_URL%/ext-runtime-classic/triton/triton-all.css" rel="stylesheet" type="text/css"></link>
```


here are all the classic themes available:

```
<link href="%PUBLIC_URL%/ext-runtime-classic/graphite/graphite-all.css" rel="stylesheet" type="text/css"></link>
<link href="%PUBLIC_URL%/ext-runtime-classic/material/material-all.css" rel="stylesheet" type="text/css"></link>
<link href="%PUBLIC_URL%/ext-runtime-classic/triton/triton-all.css" rel="stylesheet" type="text/css"></link>

```





## Initializing an ExtReact application

To render the root node in an ExtReact application, the 'src/index.js' file contains
an 'ExtReactDOM.render' method.  This method is exactly the same as 'ReactDOM.render', except for
doing some needed ExtReact initialization.

Original render (commented out)
```
//import ReactDOM from 'react-dom';
//ReactDOM.render(<App />, document.getElementById('root'));
```

Updated render (for ExtReact)
```
import ExtReactDOM from '@sencha/ext-react-classic';
ExtReactDOM.render(<App />, document.getElementById('root'));
```

## Using ExtReact components in your application

To use an ExtReact component, and it's needed import statements

```
import { ExtPanel } from "@sencha/ext-react-classic";
import { ExtButton } from "@sencha/ext-react-classic";
```

This can also be combined on 1 line

```
import { ExtPanel, ExtButton } from "@sencha/ext-react-classic";
```

## understanding the ExtReact 'ready' event

When using ExtReact components, you want to make sure that the components are completely available
before calling any component methods or updating properties in code.
For this reason, every componenthas a 'ready' event.

This event, when listened to, will indicate to your app that ALL ExtReact components on the page are
ready and available.  With this event, 2 paremeters are send, the first is the ExtReact component of
the calling ready event,
the second is an array of components on your page that have the 'extname' property applied to it.

```
  pageReady = ({cmp, cmpObj}) => {
    //ExtPanel component available as cmp parm
    //ExtButton available as cmpObj['theButton1']
    //can now call the following:
    //cmpObj['theButton1'].setText('new button1 text')
    //ExtButton available as cmpObj['theButton2']
  }

  render() {
    return (
      <ExtPanel
        extname="thePanel"
        onReady={ this.pageReady }
      >
        <ExtButton text="Click Me" extname="theButton1"></ExtButton>
        <ExtButton text="Click Me" extname="theButton2"></ExtButton>
    )
  }
```

you can also identify any ExtReact component with the 'ref' property

```
  render() {
    return (
      <ExtGrid
        ref={ grid => this.grid = grid }
```

this property will make the ExtGrid component available as 'this.grid'.  Do note, however, that the
full functionality or any ExtReact component is not guaranteed to be available until the 'ready' event is called

```
  pageReady = ({cmp, cmpObj}) => {
    //ExtButton available as this.button1
    //can now call the following:
    //this.button1.setText('new button1 text')
    //ExtButton available as cmpObj['theButton2']
  }

  render() {
    return (
      <ExtPanel
        extname="thePanel"
        onReady={ this.pageReady }
      >
        <ExtButton text="Click Me" ref={ button1 => this.button1 = button1 }></ExtButton>
        <ExtButton text="Click Me" extname="theButton2"></ExtButton>
    )
  }
```

## using JSX in grid column render functions

The ExtColumn supports render functions as JSX

```
  renderName = (value, context) => (
    <div style={{height:'15px'}}>
      <span>span - { context.data.name }</span>
      <ext-button shadow="true" text={ context.data.name }></ext-button>
    </div>
  )


  render() {
    return (
      <ExtGrid

      >
        <ExtColumn text="Name" dataIndex="name" flex= renderer={ this.renderName }/>

      </ExtGrid>
    )
  }