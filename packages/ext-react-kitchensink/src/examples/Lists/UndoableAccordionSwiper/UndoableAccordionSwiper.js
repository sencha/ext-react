import React, { Component } from 'react';
import { List, Panel } from '@sencha/ext-react-modern';

Ext.require([
    'Ext.dataview.listswiper.ListSwiper'
]);

export default class UndoableAccordionSwiper extends Component {

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
                        iconCls: 'x-fa fa-trash',
                        ui: 'alt decline',
                        text: 'Delete',
                        precommit: this.onDeleteItem,
                        commit: this.onCommitDeleteItem,
                        revert: this.onUndoDeleteItem,
                        undoable: true
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

    onCommitDeleteItem = (list, info) => {
        const store = list.getStore(),
            record = info.record;

        Ext.toast(`Commit delete ${record.get('first_name')} ${record.get('last_name')}`)

        store.remove(record);
    }

    onDeleteItem = (list, info) => {
        const record = info.record;
        Ext.toast(`Delete ${record.get('first_name')} ${record.get('last_name')}`)
    }

    onUndoDeleteItem = (list, info) => {
        const record = info.record;
        Ext.toast(`Recover ${record.get('first_name')} ${record.get('last_name')}`)
    }

}