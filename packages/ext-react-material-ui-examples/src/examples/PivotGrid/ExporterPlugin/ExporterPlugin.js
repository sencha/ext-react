import React, { Component } from 'react';
import { Container, PivotGrid, Toolbar, Button, Menu, MenuItem } from '@sencha/ext-react-modern';
import SaleModel from '../SaleModel';
import { generateData } from '../generateSaleData';

Ext.require([
    'Ext.pivot.plugin.Exporter',
    'Ext.pivot.plugin.Configurator'
]);

export default class ExporterPlugin extends Component {

    store = Ext.create('Ext.data.Store', {
        model: SaleModel,
        data: generateData()
    })

    showConfigurator = () => { this.refs.pivotgrid.cmp.showConfigurator(); }

    onBeforeDocumentSave = view => {
        view.mask({
            xtype: 'loadmask',
            message: 'Document is prepared for export. Please wait ...'
        })
    }

    onDocumentSave = view => { view.unmask(); }

    exportDocument = menuitem => {
        const cfg = menuitem.cfg;

        if(cfg.matrix === true) {
            cfg.matrix = this.refs.pivotgrid.cmp.getMatrix();
        }

        if(!cfg.title) {
            cfg.title = 'Pivot grid export demo';
        }

        this.refs.pivotgrid.cmp.saveDocumentAs(cfg).then(null, this.onError);
    }

    onError = error => { Ext.Msg.alert('Error', typeof error === 'string' ? error : 'Unknown error'); }

    coloredRenderer = (v, record, dataIndex, cell, column) => {
        cell.setStyle( Ext.String.format('color: {0};', v > 500 ? 'green' : 'red') );

        return Ext.util.Format.number(v, '0,000.00');
    }

    monthRenderer = value => Ext.Date.monthNames[value];

    render() {
        return (
            <Container layout="fit" padding={10}>
                <PivotGrid
                    ref="pivotgrid"
                    shadow
                    plugins={[{
                        type: 'pivotexporter'
                    }, {
                        type: 'pivotconfigurator',
                        // It is possible to configure a list of fields that can be used to
                        // configure the pivot grid
                        // If no fields list is supplied then all fields from the Store model
                        // are fetched automatically
                        fields: [{
                            dataIndex: 'quantity',
                            header: 'Qty',
                            // You can even provide a default aggregator function to be used
                            // when this field is dropped on the agg dimensions
                            aggregator: 'min',
                            formatter: 'number("0")',
                            settings: {
                                // Define here in which areas this field could be used
                                allowed: ['aggregate'],
                                // Set a custom style for this field to inform the user that
                                // it can be dragged only to "Values"
                                style: {
                                    fontWeight: 'bold'
                                },
                                // Define here custom formatters that ca be used on this
                                // dimension
                                formatters: {
                                    '0': 'number("0")',
                                    '0%': 'number("0%")'
                                }
                            }
                        }, {
                            dataIndex: 'value',
                            header: 'Value',
                            settings: {
                                // Define here in which areas this field could be used
                                allowed: 'aggregate',
                                // Define here what aggregator functions can be used when this
                                // field is used as an aggregate dimension
                                aggregators: ['sum', 'avg', 'count'],
                                // Set a custom style for this field to inform the user that it
                                // can be dragged only to "Values"
                                style: {
                                    fontWeight: 'bold'
                                },
                                // Define here custom renderers that can be used on this dimension
                                renderers: {
                                    'Colored 0,000.00': this.coloredRenderer
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
                            dataIndex: 'continent',
                            header: 'Continent',
                            settings: {
                                // Define here what aggregator functions can be used when this
                                // field is used as an aggregate dimension
                                aggregators: ['count']
                            }
                        }, {
                            dataIndex: 'company',
                            header: 'Company',
                            settings: {
                                // Define here what aggregator functions can be used when this
                                // field is used as an aggregate dimension
                                aggregators: ['count']
                            }
                        }, {
                            dataIndex: 'country',
                            header: 'Country',
                            settings: {
                                // Define here what aggregator functions can be used when this
                                // field is used as an aggregate dimension
                                aggregators: ['count']
                            }
                        }, {
                            dataIndex: 'person',
                            header: 'Person',
                            settings: {
                                // Define here what aggregator functions can be used when this
                                // field is used as an aggregate dimension
                                aggregators: 'count'
                            }
                        }, {
                            dataIndex: 'year',
                            header: 'Year',
                            settings: {
                                // Define here what aggregator functions can be used when this
                                // field is used as an aggregate dimension
                                aggregators: ['count'],
                                // Define here in which areas this field could be used
                                allowed: ['leftAxis', 'topAxis']
                            }
                        }, {
                            dataIndex: 'month',
                            header: 'Month',
                            labelRenderer: this.monthRenderer,
                            settings: {
                                // Define here what aggregator functions can be used when this
                                // field is used as an aggregate dimension
                                aggregators: ['count'],
                                // Define here in which areas this field could be used
                                allowed: ['leftAxis', 'topAxis']
                            }
                        }]
                    }]}
                    matrix={{
                        type: 'local',
                        calculateAsExcel: true,
                        store: this.store,
                        // Configure the aggregate dimensions. Multiple dimensions
                        // are supported.
                        aggregate: [{
                            dataIndex: 'value',
                            header: 'Total',
                            aggregator: 'sum',
                            width: 120,
                            exportStyle: [{
                                // no type key is defined here which means that this is the
                                // default style that will be used by all exporters
                                format: 'Currency',
                                alignment: {
                                    horizontal: 'Right'
                                }
                            }, {
                                // the type key means that this style will only be used by the
                                // html exporter and for all others the default one, defined
                                // above, will be used
                                type: 'html',
                                format: 'Currency',
                                alignment: {
                                    horizontal: 'Right'
                                },
                                font: {
                                    italic: true,
                                    bold: true
                                }
                            }]
                        }],
                        // Configure the left axis dimensions that will be used to generate
                        // the grid rows
                        leftAxis: [{
                            dataIndex: 'person',
                            header: 'Person',
                            width: 120
                        }, {
                            dataIndex: 'company',
                            header: 'Company',
                            sortable: false
                        }],
                        /**
                        * Configure the top axis dimensions that will be used to generate
                        * the columns.
                        * When columns are generated the aggregate dimensions are also used.
                        * If multiple aggregation dimensions are defined then each top axis
                        * result will have in the end a column header with children
                        * columns for each aggregate dimension defined.
                        */
                        topAxis: [{
                            dataIndex: 'year',
                            header: 'Year'
                        }, {
                            dataIndex: 'country',
                            header: 'Country'
                        }]
                    }}
                    onDocumentSave={this.onDocumentSave}
                    onBeforeDocumentSave={this.onBeforeDocumentSave}
                />
                <Toolbar
                    shadow={false}
                    docked="top"
                    ui="app-transparent-toolbar"
                    padding="5 8"
                    layout={{
                        type: 'hbox',
                        align: 'stretch'
                    }}
                    defaults={{
                        margin: '0 10 0 0',
                        shadow: true,
                        ui: 'action'
                    }}
                >
                    <Button text="Configurator" handler={this.showConfigurator}/>
                    <Button text="Export to ...">
                        <Menu defaults={{ handler: this.exportDocument, iconCls: 'x-fa fa-file-text-o' }}>
                            <MenuItem
                                text="Excel xlsx (pivot table definition)"
                                iconCls="x-fa fa-file-excel-o"
                                cfg={{
                                    type: 'pivotxlsx',
                                    matrix: true,
                                    fileName: 'ExportPivot.xlsx'
                                }}
                            />
                            <MenuItem
                                text="Excel xlsx (all items)"
                                iconCls="x-fa fa-file-excel-o"
                                cfg={{
                                    type: 'excel07',
                                    fileName: 'ExportAll.xlsx'
                                }}
                            />
                            <MenuItem
                                text="Excel xlsx (visible items)"
                                iconCls="x-fa fa-file-excel-o"
                                cfg={{
                                    type: 'excel07',
                                    fileName: 'ExportVisible.xlsx',
                                    onlyExpandedNodes: true
                                }}
                            />
                            <MenuItem
                                text="Excel xml (all items)"
                                iconCls="x-fa fa-file-excel-o"
                                cfg={{
                                    type: 'excel03',
                                    fileName: 'ExportAll.xml'
                                }}
                            />
                            <MenuItem
                                text="Excel xml (visible items)"
                                iconCls="x-fa fa-file-excel-o"
                                cfg={{
                                    type: 'excel03',
                                    fileName: 'ExportVisible.xml',
                                    onlyExpandedNodes: true
                                }}
                            />
                            <MenuItem
                                text="CSV (all items)"
                                cfg={{
                                    type: 'csv',
                                    fileName: 'ExportAll.csv'
                                }}
                            />
                            <MenuItem
                                text="CSV (visible items)"
                                cfg={{
                                    type: 'csv',
                                    fileName: 'ExportVisible.csv',
                                    onlyExpandedNodes: true
                                }}
                            />
                            <MenuItem
                                text="TSV (all items)"
                                cfg={{
                                    type: 'tsv',
                                    fileName: 'ExportAll.csv'
                                }}
                            />
                            <MenuItem
                                text="TSV (visible items)"
                                cfg={{
                                    type: 'tsv',
                                    fileName: 'ExportVisible.csv',
                                    onlyExpandedNodes: true
                                }}
                            />
                            <MenuItem
                                text="HTML (all items)"
                                iconCls="x-fa fa-html5"
                                cfg={{
                                    type: 'html',
                                    fileName: 'ExportAll.html'
                                }}
                            />
                            <MenuItem
                                text="HTML (visible items)"
                                iconCls="x-fa fa-html5"
                                cfg={{
                                    type: 'html',
                                    fileName: 'ExportVisible.html',
                                    onlyExpandedNodes: true
                                }}
                            />
                        </Menu>
                    </Button>
                </Toolbar>
            </Container>
        )
    }
}