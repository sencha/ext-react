import React from 'react';
import './index.css';
//import { reactify } from '@sencha/ext-react-modern';
import { launch } from '@sencha/ext-react-modern'
import App from './App';

//var ExtReact = reactify('ExtReact');
import { ExtReact } from '@sencha/ext-react-modern'

const Ext = window.Ext;
Ext.require([
    'Ext.*',
    'Ext.ux.ajax.SimManager',
    'Ext.ux.*',
    'Ext.panel.Collapser',
    'Ext.layout.Fit'
  ])

launch(() => {
    return <ExtReact><App/></ExtReact>
})
