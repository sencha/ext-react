import React, { Component } from 'react';
import { Panel, Button, Container } from '@sencha/ext-modern';

export default class ElementInsertBetween extends Component {

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
                { showInserted && <div id="inserted">inserted</div> }
                <Button handler={this.insert} text="Insert" itemId="insert"/>
                <Container>bottom</Container>
            </Panel>
        )
    }

}

