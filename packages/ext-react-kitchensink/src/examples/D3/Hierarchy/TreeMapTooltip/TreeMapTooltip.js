import React, { Component } from 'react';
import { Panel } from '@sencha/ext-react-modern';
import { ExtD3TreeMap } from '@sencha/ext-react-modern';
import onTooltip from './tooltip';
import './styles.css';

export default class TreeMapTooltip extends Component {

    store = Ext.create('Ext.data.TreeStore', {
        autoLoad: true,
        fields: [
            'name',
            'description',
            'cap',
            {
                name: 'leaf',
                calculate: function (data) {
                    return data.root ? false : !data.children;
                }
            },
            {
                name: 'change',
                type: 'number',
                calculate: function () {
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

    render() {
        return (
            <Panel shadow layout="fit">
                <ExtD3TreeMap
                    rootVisible={false}
                    interactions={{
                        type: 'panzoom',
                        pan: { momentum: null },
                        zoom: { doubleTap: false }
                    }}
                    store={this.store}
                    selectEventName={null}
                    expandEventName={null}
                    nodeValue={node => node.data.cap}
                    noParentValue
                    scaleLabels
                    tooltip={{
                        cls: 'treemaptooltip-tip',
                        ui: 'd3-treemap',
                        trackMouse: true,
                        renderer: onTooltip
                    }}
                    colorAxis={{
                        scale: {
                            type: 'linear',
                            domain: [-5, 0, 5],
                            range: ['#E45649', '#ECECEC', '#50A14F']
                        },
                        field: 'change',
                        processor: (axis, scale, node, field) => {
                            var record = node.data;
                            return record.isLeaf() ? scale(record.get(field)) : '#ececec';
                        }
                    }}
                />
            </Panel>
        )
    }
}