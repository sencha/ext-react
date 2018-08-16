import React, { Component } from 'react';
import { Panel, Button, Container } from '@sencha/ext-modern';

export default class InsertBetween extends Component {

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
                { showInserted && <Container itemId="inserted">inserted</Container> }
                <Button handler={this.insert} text="Insert" itemId="insert"/>
                <Container>bottom</Container>
            </Panel>
        )
    }

}

