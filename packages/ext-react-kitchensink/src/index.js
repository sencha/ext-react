// import React from 'react'
// import App from './App'
// import * as d3 from 'd3'
// import * as FroalaEditor from 'froala-editor/js/froala_editor.pkgd.min.js';

// window.d3 = d3
// require('./index.css')
// import './Data'
// window.FroalaEditor = FroalaEditor;

// Ext.require([
//   'Ext.*',
//   'Ext.ux.*',
//   'Ext.panel.Collapser',
//   'Ext.layout.Fit'
// ])

// import { launch } from '@sencha/ext-react-modern'
// import { ExtReact } from '@sencha/ext-react-modern'
// //import './themer.js'

// launch(() => {
//   let top = Ext.get('loadingSplashTop'), wrapper = Ext.get('loadingSplash')
//   top.on('transitionend', wrapper.destroy, wrapper, { single: true })
//   wrapper.addCls('app-loaded')
//   return <ExtReact><App/></ExtReact>
//   },
//   { debug: false },
//   {
//     quickTips: {
//       tooltip: {
//           // show qtips on tap on mobile
//           showOnTap: true
//       },
//       overflowTip: {
//           // This means that mouseover (or a touch)
//           // cancels the auto dismiss timer to give the
//           // user an opportunity to read long text.
//           // Tap outside of the tip then closes it.
//           allowOver: true
//       }
//     }
//   }
// )


import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
//import { launch } from '@sencha/ext-react-modern'
//import * as serviceWorker from './serviceWorker';

import * as d3 from 'd3'
import * as FroalaEditor from 'froala-editor/js/froala_editor.pkgd.min.js';

window.d3 = d3
require('./index.css')
import './Data'
window.FroalaEditor = FroalaEditor;

Ext.require([
  'Ext.*',
  'Ext.ux.*',
  'Ext.panel.Collapser',
  'Ext.layout.Fit'
])

//launch(<App />, document.getElementById('root'));

Ext.onReady(function () {
  ReactDOM.render(<App />, document.getElementById('root'));
});



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();

