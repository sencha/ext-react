import React, { Component } from 'react';
import { Container, Panel, Toolbar, CheckBoxField } from '@sencha/ext-react-modern';
import { mediumText } from '../../dummy';

Ext.require('Ext.panel.Resizer');

export default class ResizableHandleExample extends Component {

    state = {
        dynamic: false
    }

    toggleDynamic = (cb, dynamic) => {
        this.setState({ dynamic })
    }

    componentDidMount() {
        this.panel.cmp.center();
    }

    render() {
        const { dynamic } = this.state;

        return (
            <Container padding={10}>
                <Panel
                    ref={panel => this.panel = panel}
                    title="Resize Me"
                    shadow
                    height={400}
                    width={400}
                    resizable={{
                        edges: 'all',
                        dynamic
                    }}
                    bodyPadding={10}
                >
                    <Toolbar docked="top">
                        <CheckBoxField checked={dynamic} onChange={this.toggleDynamic} boxLabel="Dynamic"/>
                    </Toolbar>
                    <Container html={mediumText}/>
                </Panel>
            </Container>
        )
    }
}