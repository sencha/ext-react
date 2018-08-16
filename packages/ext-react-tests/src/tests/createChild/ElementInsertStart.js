import React, { Component } from 'react';
import { Panel, Button, Container } from '@sencha/ext-modern';

export default class ElementInsertStart extends Component {

    state = {
        showInserted: false
    }

    insert = () => {
        this.setState({ showInserted: true })
    }

    render() {
        const { showInserted } = this.state;
        debugger;
        return (
            <Panel>
                {showInserted && <div id="inserted">inserted</div>}
                <Container>top</Container>
                <Button handler={this.insert} text="Insert" itemId="insert"/>
                <Container>bottom</Container>
            </Panel>
        )
    }

}

