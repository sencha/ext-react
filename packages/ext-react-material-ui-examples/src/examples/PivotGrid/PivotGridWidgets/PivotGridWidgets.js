import React, { Component } from 'react';
import { Container, PivotGrid, Toolbar, Button, Menu, MenuItem } from '@sencha/ext-react-modern';
import SaleModel from '../SaleModel';
import { generateData, randomItem } from '../generateSaleData';

export default class PivotGridWidgets extends Component {

    store = Ext.create('Ext.data.Store', {
        model: SaleModel,
        data: generateData()
    })

    addData = () => {
        const data = generateData(6);
        for(let i=0; i<data.length; i++) {
            const record = data[i];
            record.person = 'Adrian';
            record.company = (i < 3 ? 'Microsoft' : 'Apple');
            record.country = 'United States'
            record.date = new Date(2012, 0, 1)
            record.value = Math.random() * 1000 + 1
            record.quantity = Math.floor(Math.random() * 30 + 1)
        }
        this.store.add(data);
    }
    updateData = () => {
        const data = generateData(1)[0],
            record = randomItem(this.store.data.items);
        if(record) record.set(data);
    }
    removeData = () => {
        const record = randomItem(this.store.data.items);
        if(record) this.store.remove(record);
    }
    clearData =() => { this.store.removeAll(); }

    getPerformance = (records, dataIndex) => {
        const ret = records.map(r => r.get(dataIndex));
        return ret.length ? ret : null;
    }

    render() {
        return (
            <Container layout="fit" padding={10}>
                <PivotGrid
                    shadow
                    selModel={{ type: 'cellmodel' }}
                    matrix={{
                        type: 'local',
                        store: this.store,
                        // change the text of the column generated for all left axis dimensions
                        textRowLabels: 'Custom header',
                        // change the width of the column generated for all left axis dimensions
                        compactViewColumnWidth: 210,
                        viewLayoutType: 'compact',
                        // Configure the aggregate dimensions. Multiple dimensions are supported.
                        aggregate: [{
                            dataIndex: 'value',
                            header: 'Performance',
                            aggregator: this.getPerformance,
                            width: 90,
                            // Define here column specific configs for all columns
                            // generated for this aggregate dimension
                            column: {
                                cell: {
                                    xtype: 'widgetcell',
                                    forceWidth: true,
                                    widget: {
                                        xtype: 'sparklineline'
                                    }
                                }
                            }
                        }, {
                            dataIndex: 'value',
                            header: 'Count',
                            aggregator: 'count'
                        }],
                        // Configure the left axis dimensions that will be used to generate rows
                        leftAxis: [{
                            dataIndex: 'person',
                            header: 'Person'
                        }, {
                            dataIndex: 'company',
                            header: 'Company',
                            sortable: false
                        }, {
                            dataIndex: 'country',
                            header: 'Country'
                        }],
                        // Configure the top axis dimensions that will be used to generate the
                        // columns. When columns are generated the aggregate dimensions are also
                        // used. If multiple aggregation dimensions are defined then each
                        // top-axis result will have in the end a column header with children
                        // columns for each aggregate dimension defined.
                        topAxis: [{
                            dataIndex: 'year',
                            header: 'Year'
                        }]
                    }}
                />
                <Toolbar
                    docked="top"
                    shadow={false}
                    ui="app-transparent-toolbar"
                    padding="5 8"
                    defaults={{
                        margin: '0 10 0 0',
                        shadow: true,
                        ui: 'action'
                    }}
                >
                    <Button text="Change data">
                        <Menu>
                            <MenuItem text="Add" iconCls="x-fa fa-plus" handler={this.addData}/>
                            <MenuItem text="Update" iconCls="x-fa fa-edit" handler={this.updateData}/>
                            <MenuItem text="Remove" iconCls="x-fa fa-minus" handler={this.removeData}/>
                            <MenuItem text="Clear all" iconCls="x-fa fa-trash" handler={this.clearData}/>
                        </Menu>
                    </Button>
                </Toolbar>
            </Container>
        )
    }
}