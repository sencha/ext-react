import React from 'react';
import { reactify } from '@sencha/ext-react-modern';
import { launch } from '@sencha/ext-react-modern'
import MessageBox from './MessageBox';
var ExtReact = reactify('ExtReact');

// const Ext = window.Ext;
// Ext.require([
//     'Ext.Msg'
//   ])

launch(() => {
    return <ExtReact><MessageBox/></ExtReact>
})
