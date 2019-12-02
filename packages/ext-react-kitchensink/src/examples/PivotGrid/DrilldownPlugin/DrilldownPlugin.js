import React, { Component} from 'react';
import { Container, PivotGrid, Toolbar, Button } from '@sencha/ext-react-modern';
import SaleModel from '../SaleModel';
import { generateData } from '../generateSaleData';

Ext.require(['Ext.pivot.plugin.DrillDown']);

export default class DrilldownPlugin extends Component {

    store = Ext.create('Ext.data.Store', {
        model: SaleModel,
        data: generateData()
    })

    collapseAll = () => { this.refs.pivotgrid.cmp.collapseAll(); }
    expandAll = () => { this.refs.pivotgrid.cmp.expandAll(); }

    render() {
        return (
            <Container layout="fit" padding={10}>
                <PivotGrid
                    shadow
                    ref="pivotgrid"
                    plugins={[{ type: 'pivotdrilldown' }]}
                    matrix={{
                        type: 'local',
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
                            dataIndex: 'company',
                            header: 'Company'
                        }, {
                            dataIndex: 'country',
                            header: 'Country',
                            direction: 'DESC'
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
                        }, {
                            dataIndex: 'month',
                            header: 'Month',
                            labelRenderer: value => Ext.Date.monthNames[value]
                        }]
                    }}
                />
                <Toolbar
                    shadow={false}
                    docked="top"
                    ui="app-transparent-toolbar"
                    padding="5 8"
                    defaults={{
                        margin: '0 10 0 0',
                        shadow: true,
                        ui: 'action'
                    }}
                >
                    <Button text="Expand All" handler={this.expandAll}/>
                    <Button text="Collapse All" handler={this.collapseAll}/>
                    <div style={{fontSize: '12px', fontWeight: 'normal', marginLeft: '10px'}}>Double click an amount to drill down.</div>
                </Toolbar>
            </Container>
        )
    }
}