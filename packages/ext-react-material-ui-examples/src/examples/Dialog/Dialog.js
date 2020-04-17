import React, { Component } from 'react';
import { Dialog, Container, Button } from '@sencha/ext-react-modern';

export default class DialogExample extends Component {

    state = {
        showDialog: false
    }

    render() {
        const { showDialog } = this.state;

        return (
            <Container>
                <Button text="Show Dialog" handler={this.showDialog} ui="action raised"/>
                <Dialog
                    displayed={showDialog}
                    title="Dialog"
                    closable
                    maximizable
                    closeAction="hide"
                    maskTapHandler={this.onCancel}
                    bodyPadding="20"
                    maxWidth="200"
                    defaultFocus="#ok"
                    onHide={() => this.setState({ showDialog: false })}
                    html = {`Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
                    magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                    commodo consequat.`}
                >
                    <Button text="Cancel" handler={this.onCancel}/>
                    <Button itemId="ok" text="OK" handler={this.onOk}/>
                </Dialog>
            </Container>
        )
    }

    showDialog = () => {
        this.setState({ showDialog: true });
    }

    onOk = () => {
        this.setState({ showDialog: false });
    }

    onCancel = () => {
        this.setState({ showDialog: false });
    }

}