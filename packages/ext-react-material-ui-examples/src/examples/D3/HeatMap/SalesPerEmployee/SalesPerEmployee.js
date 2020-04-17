import React, { Component } from 'react';
import { Panel, Toolbar, Button } from '@sencha/ext-react-modern';
import { ExtD3HeatMap } from '@sencha/ext-react-modern';
import { refreshData, refreshSize } from './createData';

export default class SalesPerEmployee extends Component {

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
    });

    refreshData = () => {
        this.store.loadData(refreshData());
    }

    refreshSize = () => {
        this.store.loadData(refreshSize());
    }

    state = {
        theme: 'default'
    };

    changeTheme = (select, choice) => {
        this.setState({ theme: choice.get('value') });
    }

    render() {
        const { theme } = this.state;

        return (
            <Panel shadow layout="vbox">
                <Toolbar docked="top">
                    <Button iconCls="x-fa fa-refresh" handler={this.refreshData} text="Refresh Data"/>
                    <Button iconCls="x-fa fa-table" handler={this.refreshSize} text="Refresh Size"/>
                </Toolbar>
                <ExtD3HeatMap
                    store={this.store}
                    padding="30 30 40 100"
                    flex={1}
                    platformConfig={{
                        '!phone': {
                            padding: {
                                top: 40,
                                right: 30,
                                bottom: 70,
                                left: 120
                            },
                            legend: {
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
                            }
                        }
                    }}
                    xAxis={{
                        platformConfig: {
                            '!phone': {
                                title: {
                                    text: 'Employee',
                                    attr: {
                                        'font-size': '14px'
                                    }
                                }
                            }
                        },
                        axis: {
                            orient: 'bottom'
                        },
                        scale: {
                            type: 'band'
                        },
                        field: 'employee'
                    }}
                    yAxis={{
                        platformConfig: {
                            '!phone': {
                                title: {
                                    text: 'Day',
                                    attr: {
                                        'font-size': '14px'
                                    }
                                }
                            }
                        },
                        axis: {
                            orient: 'left'
                        },
                        scale: {
                            type: 'band'
                        },
                        field: 'day'
                    }}
                    colorAxis={{
                        scale: {
                            type: 'linear',
                            range: ['#ffffd9', '#49b6c4', '#225ea8']
                        },
                        field: 'sales'
                    }}
                    tiles={{
                        attr: {
                            'stroke': '#081d58',
                            'stroke-width': 2
                        }
                    }}
                />
            </Panel>
        )
    }
}