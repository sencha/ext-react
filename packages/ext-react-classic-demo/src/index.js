import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { launch } from '@sencha/ext-react-modern'
import { ExtReact } from '@sencha/ext-react-modern'
import gridApp from './grid/gridApp'
import App from './App'
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

launch(target => render(App, viewport = target));

if (module.hot) {
    module.hot.accept('./grid/gridApp', () => render(App, viewport))
}