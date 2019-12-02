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
                  value={this.state.button1}
                  onChange={(button, value) => this.setState({ button1: value })}
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
                  value={this.state.button2}
                  onChange={(button, value) => this.setState({ button2: value })}
                >
                  <Button value="low" text="Low"/>
                  <Button value="medium" text="Medium"/>
                  <Button value="high" text="High"/>
                </SegmentedButton>
              </Toolbar>
          </Panel>
      )
  }



    // render() {
    //     return (
    //         <Panel shadow={!Ext.os.is.Phone}>
    //                 <div style={{marginRight: '10px'}}>Default UI:</div>
    //                 <SegmentedButton
    //                   value={this.state.button1}
    //                   onChange={(button, value) => this.setState({ button1: value })}
    //                 >
    //                   <Button value="low" text="Low"/>
    //                   <Button value="medium" text="Medium"/>
    //                   <Button value="high" text="High"/>
    //                 </SegmentedButton>

    //                 <div style={{marginRight: '10px'}}>Toolbar UI:</div>
    //                 <SegmentedButton
    //                   defaultUI="toolbar-default"
    //                   value={this.state.button2}
    //                   onChange={(button, value) => this.setState({ button2: value })}
    //                 >
    //                   <Button value="low" text="Low"/>
    //                   <Button value="medium" text="Medium"/>
    //                   <Button value="high" text="High"/>
    //                 </SegmentedButton>
    //         </Panel>
    //     )
    // }


  //   render() {
  //     return (
  //         <Panel shadow={!Ext.os.is.Phone}>
  //             <Toolbar shadow={false}>
  //                 <div style={{marginRight: '10px'}}>Default UI:</div>
  //                 <SegmentedButton
  //                     onChange={(button, value) => this.setState({ button1: value })}
  //                 >
  //                     <Button value="low" text="Low"/>
  //                     <Button value="medium" text="Medium"/>
  //                     <Button value="high" text="High"/>
  //                 </SegmentedButton>
  //             </Toolbar>

  //             <Toolbar shadow={false}>
  //                 <div style={{marginRight: '10px'}}>Toolbar UI:</div>
  //                 <SegmentedButton
  //                     defaultUI="toolbar-default"
  //                     onChange={(button, value) => this.setState({ button2: value })}
  //                 >
  //                     <Button value="low" text="Low"/>
  //                     <Button value="medium" text="Medium"/>
  //                     <Button value="high" text="High"/>
  //                 </SegmentedButton>
  //             </Toolbar>
  //         </Panel>
  //     )
  // }



}