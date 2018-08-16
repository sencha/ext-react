import React, { Component } from 'react';
import { Panel, Button, Container } from '@sencha/ext-modern';

export default class InsertEnd extends Component {

    state = {
        showInserted: false
    }

    insert = () => {
        this.setState({ showInserted: true })
    }

    render() {
        const { showInserted } = this.state;

        return (
            <Panel>
                <Container>top</Container>
                <Button handler={this.insert} text="Insert" itemId="insert"/>
                { showInserted && <Container itemId="inserted">inserted</Container> }
            </Panel>
        )
    }

}

