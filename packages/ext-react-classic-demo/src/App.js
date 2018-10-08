import React, { Component } from 'react'
import { Panel } from '@sencha/ext-classic';

export default class App extends Component {
  render() {
    return (
      <Panel title='ExtReact Classic Demo'>
        <div>first div</div>
        <div>second div</div>
        <div style={{padding:'10px'}}>
          <div>nested div with padding</div>
        </div>
      </Panel>
    )
  }
}