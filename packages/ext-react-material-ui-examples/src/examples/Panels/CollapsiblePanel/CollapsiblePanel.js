import React, { Component } from 'react';
import { Container, Panel } from '@sencha/ext-react-modern';
import { mediumText } from '../../dummy';

Ext.require('Ext.panel.Collapser');

export default class CollapsibleExample extends Component {

    render() {
        return (
            <Container padding={Ext.os.is.Phone ? 0 : 10} layout={Ext.os.is.Phone ? 'fit' : 'auto'}>
                <Panel
                    ref={panel => this.panel = panel}
                    title="Top Collapsible Panel"
                    shadow
                    height={Ext.os.is.Phone ? undefined : 400}
                    width={Ext.os.is.Phone ? undefined : 400}
                    bodyPadding={20}
                    collapsible={{
                        direction: 'top',
                        dynamic: true
                    }}
                    bodyPadding={10}
                >
                    <div> {mediumText} </div>
                    <Panel
                        docked="right"
                        width="50%"
                        bodyPadding={20}
                        title="Right Collapsible"
                        collapsible={{
                            collapsed: true,
                            direction: 'right'
                        }}
                    >
                    <div> {mediumText} </div>
                    </Panel>
                </Panel>
            </Container>
        )
    }
}