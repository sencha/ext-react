import React, { Component } from 'react';
import { List } from '@sencha/ext-react-modern';

Ext.require('Ext.Toast');

export default class BasicListExample extends Component {

    store = Ext.create('Ext.data.Store', {
        autoLoad: true,
        proxy: {
            type: 'rest',
            url: 'resources/data/people.json'
        },
        sorters: ['last_name', 'first_name']
    })

    tpl = data => (
        <div>
            <div style={{fontSize: '16px', marginBottom: '5px'}}>{data.first_name} {data.last_name}</div>
            <div style={{fontSize: '12px', color: '#666'}}>{data.title}</div>
        </div>
    )

    onSelect = (list, record) => {
        Ext.toast(`You selected ${record.get('first_name')} ${record.get('last_name')}.`)
    }

    render() {
        return (
            <List
                shadow
                itemTpl={this.tpl}
                store={this.store}
                onSelect={this.onSelect}
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