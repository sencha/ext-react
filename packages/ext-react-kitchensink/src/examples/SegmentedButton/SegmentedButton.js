import React, { Component } from 'react';

import { SegmentedButton, Button, Panel, Toolbar, Container } from '@sencha/ext-react-modern';

export default class SegementedButtonExample extends Component {

    state = {
        button1: 'low',
        button2: 'low'
    };

    render() {
      return (
          <Panel shadow={!Ext.os.is.Phone}>
              <Toolbar shadow={false}>
                <Container>
                  <div style={{marginRight: '10px'}}>Default UI:</div>
                </Container>
                <SegmentedButton
                  onChange={(button, value) => { this.setState({ button1: value }) }}
                  onReady={({cmp, cmpObj}) => {
                    cmp.setValue(this.state.button1)
                  }}
                >
                  <Button value="low" text="Low"/>
                  <Button value="medium" text="Medium"/>
                  <Button value="high" text="High"/>
                </SegmentedButton>
              </Toolbar>

              <Toolbar shadow={false}>
                <Container>
                  <div style={{marginRight: '10px'}}>Toolbar UI:</div>
                </Container>
                <SegmentedButton
                  defaultUI="toolbar-default"
                  onChange={(button, value) => this.setState({ button2: value })}
                  onReady={({cmp, cmpObj}) => {
                    cmp.setValue(this.state.button2)
                  }}
                >
                  <Button value="low" text="Low"/>
                  <Button value="medium" text="Medium"/>
                  <Button value="high" text="High"/>
                </SegmentedButton>
              </Toolbar>
          </Panel>
      )
  }

}