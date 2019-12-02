import React, { Component } from 'react';
import { List } from '@sencha/ext-react-modern';

require('../stocks');

Ext.require([
    'Ext.plugin.PullRefresh'
]);

export default class PullRefreshListExample extends Component {

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

    render() {
        return (
            <List
                shadow
                itemTpl="{name}"
                store={this.store}
                plugins={[
                    { type: 'pullrefresh', mergeData: false }
                ]}
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