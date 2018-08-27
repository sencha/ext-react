import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { launch } from '@sencha/ext-react'
import { ExtReact } from '@sencha/ext-react'
//import App from './App'
//import App from './Chart/AppChart'
import App from './D3/AppD3'

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
  module.hot.accept('./D3/AppD3', () => render(App, viewport))
}
