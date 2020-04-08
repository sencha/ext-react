import React, { Component } from 'react';
import { List } from '@sencha/ext-react-modern';

Ext.require('Ext.MessageBox');

export default class DisclosureListExample extends Component {

    store = Ext.create('Ext.data.Store', {
        autoLoad: true,
        proxy: {
            type: 'rest',
            url: 'resources/data/people.json'
        },
        sorters: ['last_name', 'first_name']
    });

    tpl = data => <div>{data.first_name} {data.last_name}</div>;

    render() {
        return (
            <List
                shadow
                itemTpl={this.tpl}
                store={this.store}
                config={{
                    onItemDisclosure: (record, btn, index) => {
                        Ext.Msg.alert('Tap', 'Disclose more info for ' + record.get('first_name'), Ext.emptyFn);
                    }
                }}
                platformConfig={{
                    '!phone': {
                        height: 450,
                        width: 300
                    }
                }}
            />
        )
    }

}