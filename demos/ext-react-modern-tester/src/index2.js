import React from 'react'
import ExtReactDOM from '@sencha/ext-react-modern';
import './themer.js'
import '../.ext-reactrc'

import App from './App'
//import App from './Chart/AppChartLazy'
//import App from './D3/AppD3'
//import App from './Progress/AppProgress'

//import App from './Grid/AppGrid'
//import App from './DivGrid/AppDivGrid'
//import App from './Render/AppRender'
//import App from './GroupGrid/AppGroupGrid'
//import App from './Form/AppForm'
//import App from './Router/App'
//import App from './Hooks/AppHooks'
//import App from './TextColumn/AppTextColumn'
//import App from './Components/AppComponents'

Ext.require([
  'Ext.panel.Collapser',
  'Ext.layout.Fit'
])

ExtReactDOM.render(<App/>, document.getElementById('root'));
