import React, { Component } from 'react';
import { Container, Panel } from '@sencha/ext-react-modern';
import colors from '../../colors';

export default class FitLayoutExample extends Component {

    render() {
        return (
            <Container layout="vbox" padding={10}>
                <Panel shadow ui="instructions" margin="0 0 20 0">
                    <div>A <b>fit</b> layout displays a single item, which takes on the full height and width of the container.</div>
                </Panel>
                <Panel layout="fit" height={200} flex={1} shadow>
                    <Container {...itemDefaults} style={colors.card.red}>Content</Container>
                </Panel>
            </Container>
        )
    }

}

const itemDefaults = {
    layout: {
        type: 'vbox',
        pack: 'center',
        align: 'center'
    }
}
