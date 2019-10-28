//this file exists so the webpack build process will succeed
Ext._find = require('lodash.find');

import React from 'react';
import ReactDOM from 'react-dom';
import "@sencha/ext-elements-all/src/ext-button.component";
import "@sencha/ext-elements-all/src/ext-panel.component";
import ExtPanel from "@sencha/ext-elements-all/react/ExtPanel";
import Panel from "@sencha/ext-elements-all/reactOrig/Panel";

export class Hello extends React.Component {
    render() {
      return React.createElement('div', null, `Hello ${this.props.text}`);
    }
}

window.myVars = {
    React,
    ReactDOM,
    Hello: Hello,
    ExtPanel: ExtPanel
};

// import MyReactCmp from './my-react-cmp'; // pure react component
// const ReactDOMRender = (key, el) => {
//     ReactDOM.render(window.myVars[key], el);
// };

// window.myVars = {
// 	React,
// 	ReactDOM,
// 	ReactDOMRender,
// 	MyReactCmp: <MyReactCmp />
// };
