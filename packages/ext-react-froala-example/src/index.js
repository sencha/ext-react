import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { launch } from '@sencha/ext-react-modern'
import AppFroala from './AppFroala'

let viewport

import {ExtReact} from '@sencha/ext-react-modern'
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

launch(target => render(AppFroala, viewport = target))

if (module.hot) {
  module.hot.accept('./AppFroala', () => render(AppFroala, viewport))
}
