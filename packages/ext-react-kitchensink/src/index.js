import React from 'react'
import App from './App'
import * as d3 from 'd3'
import * as FroalaEditor from 'froala-editor';

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

import { launch } from '@sencha/ext-react'
import { ExtReact } from '@sencha/ext-react'
import './themer.js'

launch(() => {
  let top = Ext.get('loadingSplashTop'), wrapper = Ext.get('loadingSplash')
  top.on('transitionend', wrapper.destroy, wrapper, { single: true })
  wrapper.addCls('app-loaded')
  return <ExtReact><App/></ExtReact>
  },
  { debug: false },
  {
    quickTips: {
      tooltip: {
          // show qtips on tap on mobile
          showOnTap: true
      },
      overflowTip: {
          // This means that mouseover (or a touch)
          // cancels the auto dismiss timer to give the
          // user an opportunity to read long text.
          // Tap outside of the tip then closes it.
          allowOver: true
      }
    }
  }
)
