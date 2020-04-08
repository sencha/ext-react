import React, { Component } from 'react';
import { Container } from '@sencha/ext-react-modern';
import { Cartesian } from '@sencha/ext-react-modern';
import addNewData from './addNewData';

const interval = 1000;

export default class Realtime extends Component {

    constructor() {
        super();
        this.startTask();
    }

    store = Ext.create('Ext.data.Store', {
        fields: ['yValue', 'metric1', 'metric2']
    })

    startTask = () => {
        let callCount = 1;
        this.timeChartTask = setInterval(() => {
            if(callCount >= 120){
                clearInterval(this.timeChartTask);
            } else {
                callCount++;
                addNewData(this.refs.chart, this.store, interval);
            }
        }, interval);
    }

    stopTask = () => {
        clearInterval(this.timeChartTask);
    }

    render() {
        return (
            <Cartesian
                downloadServerUrl='http://svg.sencha.io'
                shadow
                ref="chart"
                store={this.store}
                onDestroy={this.stopTask}
                title="Time Axis"
                insetPadding="30 30 10 10"
                axes={[{
                    type: 'numeric',
                    minimum: 0,
                    maximum: 20,
                    grid: true,
                    position: 'left',
                    title: 'Number of Hits'
                }, {
                    type: 'time',
                    dateFormat: 'G:i:s',
                    segmenter: {
                        type: 'time',
                        step: {
                            unit: Ext.Date.SECOND,
                            step: 1
                        }
                    },
                    label: {
                        fontSize: 10
                    },
                    grid: true,
                    position: 'bottom',
                    title: 'Seconds',
                    fields: ['xValue'],
                    majorTickSteps: 10
                }]}
                series={[{
                    type: 'line',
                    title: 'Metric 1',
                    marker: {
                        type: 'cross',
                        size: 5
                    },
                    style: {
                        miterLimit: 0
                    },
                    xField: 'xValue',
                    yField: 'metric1'
                }, {
                    type: 'line',
                    title: 'Metric 2',
                    marker: {
                        type: 'arrow',
                        size: 5
                    },
                    style: {
                        miterLimit: 0
                    },
                    xField: 'xValue',
                    yField: 'metric2'
                }]}
            />
        )
    }
}