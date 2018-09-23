import React, { Component } from 'react'
import { Panel } from '@sencha/ext-classic'
import { renderWhenReady } from '@sencha/ext-react'

class App1 extends Component {
  render() {
    return (
        <Panel title="app1 title">app1</Panel>
    )
 }
}

export default renderWhenReady(App1)
