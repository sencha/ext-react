import React, { Component } from 'react';
import { Container, PivotGrid, Toolbar, Button } from '@sencha/ext-react-modern';
import SaleModel from '../SaleModel';
import { generateData } from '../generateSaleData';

export default class TabularLayout extends Component {

    store = Ext.create('Ext.data.Store', {
        model: SaleModel,
        data: generateData()
    })

    expandAll = () => { this.refs.pivotgrid.cmp.expandAll() }
    collapseAll = () => { this.refs.pivotgrid.cmp.collapseAll() }

    render() {
        return (
            <Container layout="fit" padding={10}>
                <PivotGrid
                    shadow
                    ref="pivotgrid"
                    startRowGroupsCollapsed={false}
                    startColGroupsCollapsed={false}
                    matrix={{
                        type: 'local',
                        store: this.store,
                        // Set layout type to "tabular"
                        viewLayoutType: 'tabular',
                        // Configure the aggregate dimensions. Multiple dimensions are supported.
                        aggregate: [{
                            dataIndex: 'value',
                            header: 'Total',
                            aggregator: 'sum',
                            width: 110
                        }],
                        // Configure the left axis dimensions that will be used to generate
                        // the grid rows
                        leftAxis: [{
                            dataIndex: 'person',
                            header: 'Person',
                            width: 150
                        }, {
                            dataIndex: 'company',
                            header: 'Company',
                            sortable: false,
                            width: 150
                        }, {
                            dataIndex: 'country',
                            header: 'Country',
                            width: 150
                        }],
                        /**
                        * Configure the top axis dimensions that will be used to generate
                        * the columns.
                        *
                        * When columns are generated the aggregate dimensions are also used.
                        * If multiple aggregation dimensions are defined then each top axis
                        * result will have in the end a column header with children columns
                        * for each aggregate dimension defined.
                        */
                        topAxis: [{
                            dataIndex: 'year',
                            header: 'Year'
                        }]
                    }}
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
                    <Button text="Expand All" handler={this.expandAll}/>
                    <Button text="Collapse All" handler={this.collapseAll}/>
                </Toolbar>
            </Container>
        )
    }
}