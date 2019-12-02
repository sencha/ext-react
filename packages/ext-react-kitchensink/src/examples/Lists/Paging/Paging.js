import React, { Component } from 'react';
import { List, SegmentedButton, Button, Panel, Container } from '@sencha/ext-react-modern';

require('../stocks');

Ext.require('Ext.plugin.ListPaging');

export default class PagingListExample extends Component {

    state = {
        bufferZone: false
    }

    store = Ext.create('Ext.data.Store', {
        fields: ['name'],
        autoLoad: true,
        proxy: {
            type: 'ajax',
            url: '/KitchenSink/Company',
            reader: {
                type: 'json',
                rootProperty: 'data',
                // Do not attempt to load orders inline.
                // They are loaded through the proxy
                implicitIncludes: false
            },
            extraParams: {
                shuffle: true
            }
        }
    });

    componentDidUpdate(prevProps, prevState) {
        const { bufferZone } = this.state;

        if (prevState.bufferZone !== bufferZone) {
            const plugin = this.list.cmp.findPlugin('listpaging');
            console.log('got here');
            plugin.setAutoPaging(bufferZone !== false);
            plugin.setBufferZone(bufferZone);
        }
    }

    render() {
        const { bufferZone } = this.state;

        return (
            <List
                ref={list => this.list = list}
                shadow
                itemTpl="{name}"
                store={this.store}
                plugins={[
                    { type: 'listpaging' }
                ]}
                platformConfig={{
                    '!phone': {
                        height: 450,
                        width: 300
                    }
                }}
            >
                <Container docked="top">
                    <div style={{ padding: '15px' }}><b>Auto Paging</b>: { bufferZone === false ? 'OFF' : `ON (buffer zone: ${bufferZone})` }</div>
                    <SegmentedButton>
                        <Button text="Off" pressed={bufferZone === false} handler={() => this.setState({ bufferZone: false })} flex={1}/>
                        <Button text="0" pressed={bufferZone === 0} handler={() => this.setState({ bufferZone: 0 })} flex={1}/>
                        <Button text="8" pressed={bufferZone === 8} handler={() => this.setState({ bufferZone: 8 })} flex={1}/>
                        <Button text="16" pressed={bufferZone === 16} handler={() => this.setState({ bufferZone: 16 })} flex={1}/>
                        <Button text="32" pressed={bufferZone === 32} handler={() => this.setState({ bufferZone: 32 })} flex={1}/>
                    </SegmentedButton>
                </Container>
            </List>
        )
    }

}