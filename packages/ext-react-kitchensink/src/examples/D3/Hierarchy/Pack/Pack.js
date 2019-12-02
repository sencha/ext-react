import React, { Component } from 'react';
import { Panel } from '@sencha/ext-react-modern';
import { D3_Pack } from '@sencha/ext-d3';

export default class Pack extends Component {

    store = Ext.create('Ext.data.TreeStore', {
        autoLoad: true,
        defaultRootText: 'd3',
        fields: [
            'name',
            'path',
            'size',
            {
                name: 'leaf',
                calculate: function (data) {
                    return data.root ? false : !data.children;
                }
            },
            {
                name: 'text',
                calculate: function (data) {
                    return data.name;
                }
            }
        ],
        proxy: {
            type: 'ajax',
            url: 'resources/data/tree/tree.json'
        },
        idProperty: 'path'
    })

    onTooltip = (component, tooltip, node) => {
        const record = node.data,
            size = record.get('size'),
            n = record.childNodes.length;
        let html = '<span style="font-weight: bold">' + record.get('text') + '</span><br>';

        if (size) {
            html += Ext.util.Format.fileSize(size);
        } else {
            html += n + ' file' + (n === 1 ? '' : 's') + ' inside.'
        }

        tooltip.setHtml(html);
    }

    render() {
        return (
            <Panel shadow layout="fit">
                <D3_Pack
                    padding="20"
                    store={this.store}
                    tooltip={{renderer: this.onTooltip}}
                />
            </Panel>
        )
    }
}