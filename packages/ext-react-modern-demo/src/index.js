import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { launch } from '@sencha/ext-react-modern'
import './themer.js'
import '../.ext-reactrc'

//import App from './App'
import App from './Chart/AppChartLazy'
//import App from './D3/AppD3'
//import App from './Progress/AppProgress'
//import App from './Button/AppButton'
//import App from './Grid/AppGrid'
//import App from './DivGrid/AppDivGrid'
//import App from './Render/AppRender'
//import App from './GroupGrid/AppGroupGrid'
//import App from './Form/AppForm'
//import App from './Router/App'
//import App from './Hooks/AppHooks'
//import App from './TextColumn/AppTextColumn'
//import App from './Components/AppComponents'


let viewport;

Ext.require([
  'Ext.panel.Collapser',
  'Ext.layout.Fit'
])

import { ExtReact } from '@sencha/ext-react-modern'

//import { reactify } from '@sencha/ext-react-modern';
//const ExtReact = reactify('ExtReact')

const render = (Component, target) => {
  ReactDOM.render(
    <ExtReact>
      <AppContainer>
        <Component/>
      </AppContainer>
    </ExtReact>,
    target
  )
}

launch(target => render(App, viewport = target))

if (module.hot) {
  module.hot.accept('./Chart/AppChart2', () => render(App, viewport))
}
