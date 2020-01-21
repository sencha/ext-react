//this file exists so the webpack build process will succeed
Ext._find = require('lodash.find');

import JsxPart1 from './app/desktop/src/view/personnel/jsx/JsxPart1';
import JsxPart2 from './app/desktop/src/view/personnel/jsx/JsxPart2';
import JsxPartDefault from './app/desktop/src/view/personnel/jsx/JsxPartDefault';


import React from 'react';
import ReactDOM from 'react-dom';
import { ExtPanel } from "@sencha/ext-react-modern";
//import "@sencha/ext-elements-all/src/ext-button.component";
//import "@sencha/ext-elements-all/src/ext-panel.component";
//import ExtPanel from "@sencha/ext-elements-all/react/ExtPanel";
//import Panel from "@sencha/ext-elements-all/reactOrig/Panel";

export class Hello extends React.Component {
    render() {
      return React.createElement('div', null, `Hello ${this.props.text}`);
    }
}

window.myVars = {
    React,
    ReactDOM,
    Hello: Hello,
    ExtPanel: ExtPanel,
    JsxPart1,
    JsxPart2,
    JsxPartDefault
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
