import React, { Component } from 'react';
import { Container, Button } from '@sencha/ext-react-modern';

Ext.require('Ext.MessageBox');

export default class MsgExample extends Component {

    onConfirmResult(buttonId, value, opt) {
        Ext.toast(`User clicked ${buttonId} button.`);
    }

    onPromptResult(buttonId, value) {
        Ext.toast(`User clicked ${buttonId} and entered value "${value}".`);
    }

    render() {
        return (
            <Container layout="vbox">
                <Button
                    ui="action raised"
                    margin="0 0 20 0"
                    handler={() => Ext.Msg.alert('Title', 'The quick brown fox jumped over the lazy dog.')}
                    text="Alert"
                />
                <Button
                    ui="action raised"
                    margin="0 0 20 0"
                    handler={() => Ext.Msg.prompt('Welcome!', "What's your first name?", this.onPromptResult.bind(this))}
                    text="Prompt"
                />
                <Button
                    ui="action raised"
                    margin="0 0 20 0"
                    handler={() => Ext.Msg.confirm("Confirmation", "Are you sure you want to do that?", this.onConfirmResult.bind(this))}
                    text="Confirm"
                />
            </Container>
        )
    }

}