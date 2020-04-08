import React, { Component } from 'react';
import { Panel, Toolbar, Spacer, Button } from '@sencha/ext-react-modern';
import createData from './createData';
import { ExtPivotHeatMap } from '@sencha/ext-react-modern';

export default class PivotHeatMapExample extends Component {
    constructor() {
        super();
        this.refreshData();
    }

    store = Ext.create('Ext.data.Store', {
        fields: [
            {name: 'employee', type: 'string'},
            {name: 'dayNumber', type: 'int'},
            {name: 'day', type: 'string'},
            {name: 'sales', type: 'number'}
        ]
    })

    refreshData = () => {
        this.store.loadData(createData());
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
            <Panel
                shadow
                layout="fit"
            >
                <Toolbar docked="top">
                    <Spacer/>
                    <Button iconCls="x-fa fa-refresh" handler={this.refreshData} text="Refresh Data"/>
                </Toolbar>
                <ExtPivotHeatMap
                    matrix={{
                        store: this.store,
                        leftAxis: {
                            dataIndex: 'employee',
                            header: !Ext.platformTags.phone && 'Employee',
                            sortable: false
                        },
                        topAxis: {
                            dataIndex: 'day',
                            sortIndex: 'dayNumber',
                            header: 'Day'
                        },
                        aggregate: {
                            dataIndex: 'sales',
                            aggregator: 'sum'
                        }
                    }}
                    padding={Ext.platformTags.phone ? '20 20 60 60' : '20 30 70 120'}
                    xAxis={{
                        title: {
                            attr: {
                                'font-size': '12px'
                            }
                        }
                    }}
                    yAxis={{
                        title: {
                            attr: {
                                'font-size': '12px'
                            }
                        }
                    }}
                    colorAxis={{
                        scale: {
                            type: 'linear',
                            range: ['#ffffd9', '#49b6c4', '#225ea8']
                        }
                    }}
                    legend={!Ext.platformTags.phone && {
                        docked: 'right',
                        padding: 50,
                        items: {
                            count: 10,
                            slice: [1],
                            reverse: true,
                            size: {
                                x: 60,
                                y: 30
                            }
                        }
                    }}
                    tooltip={{
                        renderer: this.onTooltip
                    }}

                    platformConfig={{
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
                    }}
                />
            </Panel>
        );
    }
}