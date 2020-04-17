import React, { Component } from 'react';
import { List, Panel } from '@sencha/ext-react-modern';

Ext.require([
    'Ext.dataview.listswiper.ListSwiper'
]);

export default class BasicAccordionSwiper extends Component {

    store = Ext.create('Ext.data.Store', {
        autoLoad: true,
        sorters: ['last_name', 'first_name'],
        proxy: {
            type: 'rest',
            url: 'resources/data/people.json'
        }
    })

    tpl = data => (
        <div>
            <div style={{fontSize: '16px', marginBottom: '5px'}}>{data.first_name} {data.last_name}</div>
            <div style={{fontSize: '12px', color: '#666'}}>{data.title}</div>
        </div>
    )



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
                plugins={[{
                    type: 'listswiper',
                    defaults: {
                        ui: 'action'
                    },
                    left: [{
                        iconCls: 'x-fa fa-phone',
                        text: 'Call',
                        commit: this.onCall
                    }],
                    right: [{
                        iconCls: 'x-fa fa-envelope',
                        ui: 'alt confirm',
                        text: 'Message',
                        commit: this.onMessage
                    }, {
                        iconCls: 'x-fa fa-edit',
                        text: 'Edit',
                        commit: this.onEdit
                    }]
                }]}
            />
        )
    }

    onCall = (list, info) => {
        const record = info.record;
        Ext.toast(`Call ${record.get('first_name')} ${record.get('last_name')}`)
    }

    onMessage = (list, info) => {
        const record = info.record;
        Ext.toast(`Message ${record.get('first_name')} ${record.get('last_name')}`)
    }

    onEdit = (list, info) => {
        const record = info.record;
        Ext.toast(`Edit ${record.get('first_name')} ${record.get('last_name')}`)
    }

}