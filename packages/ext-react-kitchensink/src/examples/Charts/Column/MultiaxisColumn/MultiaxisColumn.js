import React, { Component } from 'react';
import { Container } from '@sencha/ext-react-modern';
import { Cartesian } from '@sencha/ext-react-modern';
import ChartToolbar from '../../ChartToolbar';
import createData from './createData';

export default class MultiaxisColumn extends Component {
    constructor() {
        super();
        this.refreshData();
    }

    store = Ext.create('Ext.data.Store', {
        fields: [
            'month',
            'high',
            'low',
            {
                name: 'highF',
                calculate: function (data) {
                    return data.high * 1.8 + 32;
                }
            },
            {
                name: 'lowF',
                calculate: function (data) {
                    return data.low * 1.8 + 32;
                }
            }
        ]
    })

    refreshData = () => {
        this.store.loadData(createData());
    }
    //<ChartToolbar onRefreshClick={this.refreshData}/>

    render() {
        return (
            <Container padding={!Ext.os.is.Phone && 10} layout="fit">
                <Cartesian
                    downloadServerUrl='http://svg.sencha.io'
                    shadow
                    store={this.store}
                    innerPadding={{ left: 20, right: 20}}
                    interactions="crosszoom"
                    series={[{
                        type: 'bar',
                        xField: 'month',
                        yField: 'highF',
                        //yAxis: 'fahrenheit-axis',
                        yAxis: 0,
                        style: {
                            minGapWidth: 10,
                            strokeStyle: 'rgb(52, 52, 53)'
                        },
                        subStyle: { fillStyle: 'url(#rainbow)' }
                    }, {
                        type: 'bar',
                        xField: 'month',
                        yField: ['lowF'],
                        //yAxis: 'fahrenheit-axis',
                        yAxis: 0,
                        style: {
                            minGapWidth: 10,
                            strokeStyle: 'rgb(52, 52, 53)'
                        }
                    }]}
                    axes={[{
                            type: 'numeric',
                            //id: 'fahrenheit-axis2',
                            adjustByMajorUnit: true,
                            position: 'left',
                            titleMargin: 20,
                            minimum: 32,
                            grid: true,
                            title: 'Temperature in °F',
                            // listeners: {
                            //     rangechange: (axis, range) => {
                            //         //const cAxis = axis.getChart().getAxis('celsius-axis');
                            //         const cAxis = axis.getChart().getAxis(0);
                            //         if(cAxis) {
                            //             cAxis.setMinimum((range[0] - 32) / 1.8);
                            //             cAxis.setMaximum((range[1] - 32) / 1.8);
                            //         }
                            //     }
                            // }
                        },
                        {
                            type: 'numeric',
                            //id: 'celsius-axis',
                            titleMargin: 20,
                            position: 'right',
                            title: 'Temperature in °C'
                        },
                        {
                            type: 'category',
                            id: 'months-axis',
                            position: 'bottom'
                        },
                        {
                            position: 'top',
                            linkedTo: 'months-axis',
                            title: {
                                text: 'Climate data for Redwood City, California',
                                fontSize: 18,
                                fillStyle: 'green'
                            }
                        }
                    ]}
                    // Series are dynamically added in the view controller.
                    gradients={[{
                        id: 'rainbow',
                        type: 'linear',
                        degrees: 270,
                        stops: [
                            {
                                offset: 0,
                                color: '#78C5D6'
                            },
                            {
                                offset: 0.14,
                                color: '#449AA7'
                            },
                            {
                                offset: 0.28,
                                color: '#79C267'
                            },
                            {
                                offset: 0.42,
                                color: '#C4D546'
                            },
                            {
                                offset: 0.56,
                                color: '#F5D63D'
                            },
                            {
                                offset: 0.70,
                                color: '#F18B32'
                            },
                            {
                                offset: 0.84,
                                color: '#E767A1'
                            },
                            {
                                offset: 1,
                                color: '#BF62A6'
                            }
                        ]
                    }]}
                />
            </Container>
        )
    }
}