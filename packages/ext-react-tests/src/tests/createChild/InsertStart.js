import React, { Component } from 'react';
import { Panel, Button, Container } from '@sencha/ext-modern';

export default class InsertStart extends Component {

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
                { showInserted && <Container itemId="inserted">inserted</Container> }
                <Container>top</Container>
                <Button handler={this.insert} text="Insert" itemId="insert"/>
                <Container>bottom</Container>
            </Panel>
        )
    }

}

