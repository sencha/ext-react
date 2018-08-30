import React, { Component } from 'react'
import { Panel } from '@sencha/ext-modern'
import { renderWhenReady } from '@sencha/ext-react'
import { ExtReact } from '@sencha/ext-react'

class App extends Component {
  render() {
    return (
      <ExtReact>
        <Panel title="hello"style={{height:'400px'}}>Hello World!</Panel>
      </ExtReact>
    )
 }
}

export default renderWhenReady(App)