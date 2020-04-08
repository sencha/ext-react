import React, { Component } from 'react';
import { Toolbar, Panel, Button, SearchField, SegmentedButton, Spacer, Container } from '@sencha/ext-react-modern';

export default class ToolbarExample extends Component {

    constructor() {
        super();
        this.state = {
           message: 'Option 1 selected',
           optionButton: '1'
          }
    }

    buttonHandler(button) {
      console.log(button.getValue())
        this.setState(
          {
            message: `User clicked "${button.getText()}"`,
            optionButton: button.getValue()
          }
        )
    }

    render() {
        const { message } = this.state;

        return (
            <Panel flex={1} shadow bodyPadding={0}>
                <Toolbar docked="top">
                    <Button text="Button" ui="toolbar-default" onTap={this.buttonHandler.bind(this)} badgeText="2"/>
                    <Spacer/>
                    {!Ext.os.is.Phone && (
                        <SegmentedButton
                          onReady={({cmp, cmpObj}) => {
                            cmp.setValue(this.state.optionButton)
                          }}
                        >
                            <Button value="1" text="Option 1" pressed handler={this.buttonHandler.bind(this)}/>
                            <Button value="2" text="Option 2" handler={this.buttonHandler.bind(this)}/>
                        </SegmentedButton>
                    )}
                    <Spacer/>
                    <SearchField ui="faded" placeholder="Search"/>
                </Toolbar>
                <Container style={{padding: '20px'}} html={ message }></Container>
            </Panel>
        )
    }
}