import React, { Component } from 'react';
import { Container, PivotGrid, Toolbar, Button } from '@sencha/ext-react-modern';
import { generateData } from '../generateSaleData';
import SaleModel from '../SaleModel';

export default class CompactLayout extends Component {

    store = Ext.create('Ext.data.Store', {
        model: SaleModel,
        data: generateData()
    })

    expandAll = () => { this.refs.pivotgrid.cmp.expandAll() }
    collapseAll = () => { this.refs.pivotgrid.cmp.collapseAll() }

    monthLabelRenderer = value => Ext.Date.monthNames[value]

    render() {
        return (
            <Container layout="fit" padding={10}>
                <PivotGrid
                    ref="pivotgrid"
                    shadow
                    matrix={{
                        type: 'local',
                        // change the text of the column generated for all left axis dimensions
                        textRowLabels: 'Custom header',
                        // change the width of the column generated for all left axis dimensions
                        compactViewColumnWidth: 210,
                        // Set layout type to "compact"
                        viewLayoutType: 'compact',
                        store: this.store,
                        // Configure the aggregate dimensions. Multiple dimensions are supported.
                        aggregate: [{
                            dataIndex: 'value',
                            header: 'Total',
                            aggregator: 'sum',
                            width: 120
                        }],
                        // Configure the left axis dimensions that will be used to generate
                        // the grid rows
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
                        // Configure the top axis dimensions that will be used to generate
                        // the columns.
                        //
                        // When columns are generated the aggregate dimensions are also used.
                        // If multiple aggregation dimensions are defined then each top axis
                        // result will have in the end a column header with children columns
                        // for each aggregate dimension defined.
                        topAxis: [{
                            dataIndex: 'year',
                            header: 'Year'
                        }, {
                            dataIndex: 'month',
                            header: 'Month',
                            labelRenderer: this.monthLabelRenderer
                        }]
                    }}
                />
                <Toolbar
                    docked="top"
                    ui="app-transparent-toolbar"
                    padding="5 8"
                    shadow={false}
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
                    <Button text="Expand All" handler={this.expandAll}/>
                    <Button text="Collapse All" handler={this.collapseAll}/>
                </Toolbar>
            </Container>
        )
    }
}