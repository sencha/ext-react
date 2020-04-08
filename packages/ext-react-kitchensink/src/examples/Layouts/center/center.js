import React, { Component } from 'react';
import { Container, Panel } from '@sencha/ext-react-modern';
import colors from '../../colors';

export default class CenterLayoutExample extends Component {

    render() {
        return (
            <Container layout="vbox" padding={10}>
                <Panel shadow ui="instructions" margin="0 0 20 0">
                    <div>A <b>center</b> layout displays a single item, vertically and horizontally centered in the container.</div>
                </Panel>
                <Panel layout="center" flex={1} shadow>
                    <Container height="200" width="200" style={colors.card.red} layout="center">Content</Container>
                </Panel>
            </Container>
        )
    }

}

