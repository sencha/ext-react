import React, { Component } from 'react';
import { Button, Toolbar, Spacer } from '@sencha/ext-react-modern';
import { ExtPivotD3Container } from '@sencha/ext-react-modern';
import salesData from './salesData';

Ext.require('Ext.pivot.d3.HeatMap');

const regions = {
    "Belgium": 'Europe',
    "Netherlands": 'Europe',
    "United Kingdom": 'Europe',
    "Canada": 'North America',
    "United States": 'North America',
    "Australia": 'Australia'
};

export default class ConfigurablePivotHeatmap extends Component {

    store = Ext.create('Ext.data.Store', {
        fields: [
            {name: 'id',        type: 'string'},
            {name: 'company',   type: 'string'},
            {name: 'country',   type: 'string'},
            {name: 'person',    type: 'string'},
            {name: 'date',      type: 'date', dateFormat: 'c'},
            {name: 'value',     type: 'float'},
            {name: 'quantity',  type: 'float'},
            {
                name: 'year',
                calculate: function(data){
                    return parseInt(Ext.Date.format(data.date, "Y"), 10);
                }
            },{
                name: 'month',
                calculate: function(data){
                    return parseInt(Ext.Date.format(data.date, "m"), 10) - 1;
                }
            },{
                name: 'continent',
                calculate: function(data){
                    return regions[data.country];
                }
            }
        ],
        data: salesData
    })

    showConfigurator = () => {
        this.refs.mainCtn.cmp.showConfigurator();
    }

    onBeforeAddConfigField = (panel, config) => {
        const dest = config.toContainer,
            store = dest.getStore()

        if(dest.getFieldType() !== 'all' && store.getCount() >= 1) {
            // this will force single fields on both axis and aggregate
            store.removeAll();
        }
    }

    onShowFieldSettings = (panel, config) => {
        const align = config.container.down('[name=align]');

        // hide the alignment field in settings since it's useless
        if(align) {
            align.hide();
        }
    }

    onTooltip = (component, tooltip, datum) => {
        const d = datum.data,
            x = component.getXAxis().getField(),
            y = component.getYAxis().getField(),
            z = component.getColorAxis().getField();

        tooltip.setHtml(
            '<div>X: ' + d[x] + '</div>' +
            '<div>Y: ' + d[y] + '</div>' +
            '<div>Z: ' + d[z] + '</div>' +
            '<div>Records: ' + d.records + '</div>'
        );
    }

    state = {
        theme: 'default'
    }

    changeTheme = (select, choice) => {
        this.setState({ theme: choice.get('value') });
    }

    render() {
        const { theme } = this.state;

        return (
            <ExtPivotD3Container
                ref="mainCtn"
                shadow
                layout="fit"
                onBeforemoveconfigfield={this.onBeforeAddConfigField}
                onShowconfigfieldsettings={this.onShowFieldSettings}
                matrix={{
                    store: this.store,
                    aggregate: [{
                        dataIndex: 'value',
                        header: 'Value',
                        aggregator: 'avg'
                    }],

                    leftAxis: [{
                        dataIndex: 'person',
                        header: 'Person'
                    }],

                    topAxis: [{
                        dataIndex: 'year',
                        header: 'Year'
                    }]
                }}
                drawing={{
                    xtype: 'pivotheatmap',

                    legend: {
                        items: {
                            count: 10
                        }
                    },

                    tooltip: {
                        renderer: this.onTooltip
                    },

                    platformConfig: {
                        phone: {
                            tiles: {
                                cls: 'phone-tiles'
                            }
                        },
                        tablet: {
                            tiles: {
                                cls: 'tablet-tiles'
                            }
                        }
                    }
                }}
                configurator={{
                    // It is possible to configure a list of fields that can be used to configure the pivot matrix
                    // If no fields list is supplied then all fields from the Store model are fetched automatically
                    fields: [{
                        dataIndex:  'quantity',
                        header:     'Qty',
                        // You can even provide a default aggregator function to be used when this field is dropped
                        // on the agg dimensions
                        aggregator: 'sum',
                        formatter: 'number("0")',

                        settings: {
                            // Define here in which areas this field could be used
                            allowed: ['aggregate'],
                            // Set a custom style for this field to inform the user that it can be dragged only to "Values"
                            style: {
                                fontWeight: 'bold'
                            },
                            // Define here custom formatters that ca be used on this dimension
                            formatters: {
                                '0': 'number("0")',
                                '0%': 'number("0%")'
                            }
                        }
                    }, {
                        dataIndex:  'value',
                        header:     'Value',

                        settings: {
                            // Define here in which areas this field could be used
                            allowed: 'aggregate',
                            // Define here what aggregator functions can be used when this field is
                            // used as an aggregate dimension
                            aggregators: ['sum', 'avg', 'count'],
                            // Set a custom style for this field to inform the user that it can be dragged only to "Values"
                            style: {
                                fontWeight: 'bold'
                            },
                            // Define here custom formatters that ca be used on this dimension
                            formatters: {
                                '0': 'number("0")',
                                '0.00': 'number("0.00")',
                                '0,000.00': 'number("0,000.00")',
                                '0%': 'number("0%")',
                                '0.00%': 'number("0.00%")'
                            }
                        }
                    }, {
                        dataIndex:  'company',
                        header:     'Company',

                        settings: {
                            // Define here what aggregator functions can be used when this field is
                            // used as an aggregate dimension
                            aggregators: ['count']
                        }
                    }, {
                        dataIndex:  'country',
                        header:     'Country',

                        settings: {
                            // Define here what aggregator functions can be used when this field is
                            // used as an aggregate dimension
                            aggregators: ['count']
                        }
                    }, {
                        dataIndex: 'person',
                        header: 'Person',

                        settings: {
                            // Define here what aggregator functions can be used when this field is
                            // used as an aggregate dimension
                            aggregators: 'count'
                        }
                    }, {
                        dataIndex:  'year',
                        header:     'Year',

                        settings: {
                            // Define here in which areas this field could be used
                            allowed: ['leftAxis', 'topAxis']
                        }
                    }, {
                        dataIndex:      'month',
                        header:         'Month',
                        labelRenderer:  'monthLabelRenderer',

                        settings: {
                            // Define here in which areas this field could be used
                            allowed: ['leftAxis', 'topAxis']
                        }
                    }]
                }}
            >
                <Toolbar docked="top">
                    <Spacer/>
                    <Button handler={this.showConfigurator} text="Show configurator"/>
                </Toolbar>
            </ExtPivotD3Container>
        )
    }
}