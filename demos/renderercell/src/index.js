import React from 'react';
import ExtReactDOM from '@sencha/ext-react-modern';
//import './index.css';
import App from './App';

const Ext = window.Ext;
Ext.require([
    'Ext.*',
    'Ext.ux.ajax.SimManager',
    'Ext.ux.*',
    'Ext.panel.Collapser',
    'Ext.layout.Fit'
  ])

  ExtReactDOM.render(<App />, document.getElementById('root'));