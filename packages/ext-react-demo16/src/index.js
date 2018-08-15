import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import App from './App'

//import { launch } from '@sencha/ext-react16'
//import { ExtReact } from '@sencha/ext'

// const ExtReact = reactify('ExtReact')
// import {reactify} from '@sencha/ext-react16'
// import {launch} from '@sencha/ext-react16'

import { launch } from '@sencha/ext'
import { ExtReact } from '@sencha/ext'

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
  module.hot.accept('./App', () => render(App, viewport))
}
