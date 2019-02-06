import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { launch } from '@sencha/ext-react'
import { ExtReact } from '@sencha/ext-react'
//import App from './App'
//import App from './Chart/AppChart'
//import App from './D3/AppD3'
//import App from './Progress/AppProgress'
//import App from './Button/AppButton'
import App from './Grid/AppGrid'
//import App from './Router/App'

Ext.require('Ext.panel.Collapser')

var store = Ext.create('Ext.data.Store', {
  data: {a:'1'}
})

let viewport

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
  module.hot.accept('./Button/AppButton', () => render(App, viewport))
}
