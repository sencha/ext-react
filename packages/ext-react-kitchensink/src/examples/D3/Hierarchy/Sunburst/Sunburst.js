import React, { Component } from 'react';
import { Panel, Tree } from '@sencha/ext-react-modern';
import { D3_Sunburst } from '@sencha/ext-d3';

Ext.require([
    'Ext.util.Format',
    'Ext.plugin.Responsive'
]);

export default class Sunburst extends Component {

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
            length = record.childNodes.length;

        tooltip.setTitle(record.get('text'));
        tooltip.setHtml(size ?
            Ext.util.Format.fileSize(size) :
            length + ' file' + (length === 1 ? '' : 's') + ' inside.'
        );
    }

    onSelectionChange = (field, selection) => {
        if(Ext.isArray(selection)) selection = selection[0];
        this.setState({selection});
    }

    state = {
        selection: null
    }

    render() {
        const { selection } = this.state;

        return (
            <Panel
                shadow
                plugins="responsive"
                layout={Ext.platformTags.phone ? 'vbox' : 'hbox'}
                responsiveConfig={{
                    'width > 600': {
                        layout: 'hbox'
                    },
                    'width <= 600': {
                        layout: 'vbox'
                    }
                }}
            >
                <Tree
                    store={this.store}
                    selection={selection}
                    onSelect={this.onSelectionChange}
                    plugins="responsive"
                    title={!Ext.platformTags.phone && "Folders"}
                    shadow
                    responsiveConfig={{
                        'width > 600': {
                            width: 230,
                            height: undefined,
                        },
                        'width <= 600': {
                            height: 200,
                            width: undefined
                        }
                    }}
                />
                <D3_Sunburst
                    flex={1}
                    padding={20}
                    store={this.store}
                    selection={selection}
                    tooltip={{ renderer: this.onTooltip }}
                    onSelectionChange={this.onSelectionChange}
                />
            </Panel>
        )
    }
}