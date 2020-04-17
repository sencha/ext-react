import React, { Component } from 'react';
import { NestedList } from '@sencha/ext-react-modern';

Ext.require('Ext.Toast');

export default class ListExample extends Component {

    render() {
        return (
            <NestedList
                title="Products"
                shadow
                displayField="text"
                store={this.store}
                onLeafItemTap={this.onLeafItemTap}
                platformConfig={{
                    '!phone': {
                        height: 450,
                        width: 300
                    }
                }}
            />
        )
    }

    store = Ext.create('Ext.data.TreeStore', {
        autoLoad: true,
        root: {},
        proxy: {
            type: 'ajax',
            url: 'resources/data/tree/cars.json'
        }
    });

    onLeafItemTap = (nestedList, list, index, target, record) => {
        Ext.toast(`You selected ${record.get('text')}`)
    }

}