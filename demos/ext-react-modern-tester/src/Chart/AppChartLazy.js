import React, { Component } from 'react';
import { Container, Button } from '@sencha/ext-react-modern';
import { Cartesian } from '@sencha/ext-react-modern';
import createData from './createData';
const Ext = window['Ext']

Ext.require([
  'Ext.chart.series.Area',
  'Ext.chart.axis.Numeric',
  'Ext.chart.axis.Category'
]);

export default class App extends Component {

    constructor() {
        super();
    }

    render() {
        var me = this;
        var viewport = document.getElementById('ext-viewport');
        viewport.addEventListener('click', function (event) {
            console.log(me.refs.chart.cmp);
            var chart = me.refs.chart.cmp;
            var store = new Ext.data.Store({
                fields: ['time', 'd1', 'd2', 'd3', 'd4' ],
                data: [
                    { time: new Date('2/25/2018'), d1: 14, d2: 19, d3: 10 },
                    { time: new Date('3/4/2018'), d1: 16, d2: 7, d3: 11, d4:10 },
                    { time: new Date('3/11/2018'), d1: 11, d2: 25, d3: 10 },
                    { time: new Date('3/18/2018'), d1: 6, d2: 4, d3: 11 },
                    { time: new Date('3/25/2018'), d1: 36, d2: 12, d3: 10 }
                ]
            });
            chart.setStore(store)
            chart.setInteractions(['rotate'])
            chart.setAxes(
                [
                    {
                        type: 'numeric',
                        position: 'left',
                        fields: ['d1'],
                        title: {
                            text: 'Sample Values',
                            fontSize: 15
                        },
                        grid: true,
                        minimum: 0
                    },
                    {
                        type: 'time',
                        position: 'bottom',
                        fields: ['time'],
                        dateFormat: 'j-M-y',
                        label: { rotate: { degrees: 60 } },
                        title: {
                            text: 'Date',
                            fontSize: 15
                        }
                    }
                ]
            )
            chart.setSeries(
                [
                    {
                        type: 'line',
                        style: {
                            stroke: '#30BDA7',
                            lineWidth: 2
                        },
                        xField: 'time',
                        yField: 'd1',
                        marker: {
                            type: 'circle',
                            radius: 4,
                            //scale: 1.2,
                            lineWidth: 2,
                            fill: 'white'
                        }
                    },
                    {
                        type: 'area',
                        fill: true,
                        style: {
                            fillOpacity: .6,
                        },
                        xField: 'time',
                        yField: ['d2', 'd3' ],
                        marker: {
                            type: 'circle',
                            radius: 4,
                            lineWidth: 2,
                            fill: 'white'
                        }
                        //renderer: this.onSeriesRenderer,
                        //tooltip: { trackMouse:true, renderer: this.onTooltipRenderer }
                    }
                ]
            )
        });

        return (

            <Cartesian
                viewport="true"
                height="500px"
                ref="chart"
            ></Cartesian>
        )
    }
}