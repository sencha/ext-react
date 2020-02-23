import React, { Component } from 'react';
import { Panel } from '@sencha/ext-react-modern';
import { ExtD3TreeMap } from '@sencha/ext-react-modern';

Ext.require(['Ext.d3.interaction.PanZoom']);

export default class TreeMap extends Component {

    store = Ext.create('Ext.data.TreeStore', {
        autoLoad: true,
        fields: [
            'name',
            'description',
            'cap',
            {
                name: 'leaf',
                calculate: data => {
                    return data.root ? false : !data.children;
                }
            },
            {
                name: 'change',
                calculate: () => {
                    return (-5 + Math.random() * 10).toFixed(2); // percentages
                }
            },
            {
                name: 'expanded',
                type: 'boolean',
                defaultValue: true
            }
        ],
        proxy: {
            type: 'ajax',
            url: 'resources/data/tree/stocks.json'
        }
    })

    getParentHtml = record => {
        let template = this.parentTemplate;

        if (!template) {
            template = this.parentTemplate = new Ext.XTemplate(
                '<div class="tip-title">{data.name}</div>',
                '<tpl for="childNodes">',
                '<div><span class="tip-symbol">{data.name}</span><tpl if="data.description"> - {data.description}</tpl></div>',
                '<tpl if="xindex &gt; 10">...{% break; %}</tpl>',
                '</tpl>'
            );
        }
        return template.apply(record);
    }

    getLeafHtml = record => {
        let template = this.leafTemplate;

        if (!template) {
            template = this.leafTemplate = new Ext.XTemplate(
                '<div class="tip-company">{data.description}</div>',
                '<div>Change:&nbsp;<tpl if="data.change &gt; 0">+</tpl>{data.change}%</div>'
            );
        }
        return template.apply(record);
    }

    onTooltip = (component, tooltip, node) => {
        const record = node.data;

        component.setSelection(record);

        if (record.isLeaf()) {
            tooltip.setHtml(this.getLeafHtml(record));
        } else {
            tooltip.setHtml(this.getParentHtml(record));
        }
    }

    colorAxisProcessor = (axis, scale, node, field) => {
        const record = node.data;
        return record.isLeaf() ? scale(record.get(field)) : '#ececec';
    }

    render() {
        return (
            <Panel shadow layout="fit">
                <ExtD3TreeMap
                    store={this.store}
                    interactions={{
                        type: 'panzoom',
                        zoom: {
                            doubleTap: false
                        }
                    }}
                    rootVisible={false}
                    tooltip={{
                        cls: 'tip',
                        renderer: this.onTooltip
                    }}
                    nodeValue="cap"
                    noParentValue
                    scaleLabels
                    colorAxis={{
                        scale: {
                            type: 'linear',
                            domain: [-5, 0, 5],
                            range: ['#E45649', '#ECECEC', '#50A14F']
                        },
                        field: 'change',
                        processor: this.colorAxisProcessor
                    }}
                />
            </Panel>
        )
    }
}