import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
//import { ExtPanel } from "@sencha/ext-react-classic";
//import JsxPart from "./JsxPart";

// window.myVars = {
//   React,
//   ReactDOM,
//   //Hello: Hello,
//   ExtPanel: ExtPanel
// };

const Ext = window['Ext'];
Ext.onReady(function () {

  // Ext.define('jsx', {
  //   extend: 'Ext.container.Container',
  //   xtype: 'jsx',
  //   items: [
  //     {
  //       xtype: 'button',
  //       text: 'hi jsx',
  //       listeners: {
  //         beforerender: function(h, e) {
  //           console.log('br#####')

  //           //const ReactDOM = window.myVars.ReactDOM;
  //           const React = window.myVars.React;
  //           //const Hello = window.myVars.Hello;
  //           const ExtPanel = window.myVars.ExtPanel;

  //           // var element = React.createElement(
  //           //   ExtPanel,
  //           //   {
  //           //       title: 'ExtReact - ExtPanel',
  //           //       shadow: "true",
  //           //       html: 'panel body',
  //           //   },
  //           //   null
  //           // )


  //           var element = React.createElement(
  //             JsxPart,
  //             {
  //             },
  //             null
  //           )
  //         console.dir(element)
  //         console.dir(this)
  //         var d = Ext.getDom(this)
  //         console.log(d)

  //         ReactDOM.render(
  //           element,
  //           Ext.getDom(this.container.dom)
  //       );



  //         },
  //         click: function(h, e) {
  //           console.log('click#####')
  //         },
  //       }



  //       // listeners: {
  //       //   activate: function(selModel, Cmp) {
  //       //     console.log('activate#####')
  //       //     //Ext.Msg.alert('hi', 'clicked');
  //       //   },
  //       //   click: {
  //       //     element: 'element',
  //       //     fn: function(element){
  //       //       Ext.Msg.alert('hi', 'clicked');
  //       //     }
  //       //   }
  //       // },




  //       // handler: function () {
  //       //   Ext.Msg.alert('Fiddle', 'Tapped');
  //       // }
  //     },
  //     {xtype: 'component', html: 'Custom React component'},
  //   ]
  // })


  ReactDOM.render(<App />, document.getElementById('root'));
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();


