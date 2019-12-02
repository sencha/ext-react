import React, { Component } from 'react';
import { Container, Panel, Button } from '@sencha/ext-react-modern';
import { shortText, mediumText } from '../../dummy';

Ext.require('Ext.Toast');

function toolHandler(owner, tool) {
    Ext.toast(`You clicked ${tool.config.type || 'a custom tool'}.`);
}

export default class BasicPanelsExample extends Component {

    render() {
        const text = Ext.os.is.Phone ? shortText : mediumText;

        return (
            <Container
                padding={10}
                width={!Ext.os.is.Phone && 700}
                layout={{
                    type: 'vbox',
                    pack: 'center',
                    align: 'stretch'
                }}
            >
                <Container
                    autoSize
                    defaults={{ flex: 1, bodyPadding: 10, shadow: true, margin: 10 }}
                    layout={{ type: Ext.os.is.Phone ? 'vbox' : 'hbox', pack: 'center', align: 'stretch' }}
                    flex={1}
                >
                    <Panel>
                        {text}
                    </Panel>
                    <Panel title="Title">
                        {text}
                    </Panel>
                </Container>
                <Container
                    autoSize
                    defaults={{ flex: 1, bodyPadding: 10, shadow: true, margin: 10 }}
                    layout={{ type: Ext.os.is.Phone ? 'vbox' : 'hbox', pack: 'center', align: 'stretch' }}
                    flex={1}
                >
                    <Panel
                        title="Built in Tools"
                        tools={[
                            {type: 'minimize', handler: toolHandler },
                            {type: 'refresh', handler: toolHandler },
                            {type: 'search', handler: toolHandler },
                            {type: 'save', handler: toolHandler },
                            {type: 'menu', handler: toolHandler }
                        ]}
                    >
                        {text}
                    </Panel>
                    <Panel
                        title="Custom Tools w/ iconCls"
                        tools={[
                            {iconCls: 'x-fa fa-wrench', handler: toolHandler },
                            {iconCls: 'x-fa fa-reply', handler: toolHandler },
                            {iconCls: 'x-fa fa-reply-all', handler: toolHandler }
                        ]}
                    >
                        {text}
                    </Panel>
                </Container>
            </Container>
        )
    }
}