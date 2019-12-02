import React, { Component } from 'react'
import { Panel } from '@sencha/ext-modern'
import { renderWhenReady } from '@sencha/ext-react-modern'
import { ExtReact } from '@sencha/ext-react-modern'

class App2 extends Component {
  render() {
    return (
      <ExtReact>
        <Panel title="app2 title"style={{height:'400px'}}>app2</Panel>
      </ExtReact>
    )
 }
}

export default renderWhenReady(App2)
