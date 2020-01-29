/**
 * @class Ext.chart.series.Scatter
 * @extend Ext.chart.series.Cartesian
 * @alias series.scatter
 *
 * Creates a Scatter Chart. The scatter plot is useful when trying to display more than two variables in the same visualization.
 * These variables can be mapped into x, y coordinates and also to an element's radius/size, color, etc.
 * As with all other series, the Scatter Series must be appended in the *series* Chart array configuration. See the Chart
 * documentation for more information on creating charts.
 *
 *     @example packages=[charts,ext-react]
 *     import React, { Component } from 'react';
 *     import { ExtReact, Container } from '@sencha/ext-react-modern';
 *     import { Cartesian } from '@sencha/ext-react-modern';
 *
 *     export default class MyExample extends Component {
 *
 *        store = new Ext.data.Store({
 *             fields: ['name', 'data1', 'data2', 'data3'],
 *             data: [
 *                 { name: 'metric one', data1: 14, data2: 19 },
 *                 { name: 'metric two', data1: 16, data2: 7 },
 *                 { name: 'metric three', data1: 11, data2: 25 },
 *                 { name: 'metric four', data1: 6, data2: 4 },
 *                 { name: 'metric five', data1: 36, data2: 12 }
 *             ]
 *        })
 *
 *        render() {
 *            return (
 *                 <ExtReact>
 *                     <Cartesian
 *                         store={this.store}
 *                         interactions={['rotate']}
 *                         axes={[{
 *                            type: 'numeric',
 *                            position: 'left',
 *                            fields: ['data1'],
 *                            title: {
 *                                text: 'Sample Values',
 *                                fontSize: 15
 *                            },
 *                            grid: true,
 *                            minimum: 0
 *                         }, {
 *                            type: 'category',
 *                            position: 'bottom',
 *                            fields: ['name'],
 *                            title: {
 *                                text: 'Sample Values',
 *                                fontSize: 15
 *                            }
 *                        }]}
 *                        series={[{
 *                            type: 'scatter',
 *                            highlight: {
 *                                size: 12,
 *                                radius: 12,
 *                                fill: '#96D4C6',
 *                                stroke: '#30BDA7'
 *                            },
 *                            fill: true,
 *                            xField: 'name',
 *                            yField: 'data2',
 *                            marker: {
 *                                type: 'circle',
 *                                fill: '#30BDA7',
 *                                radius: 10,
 *                                lineWidth: 0
 *                            }
 *                        }]}
 *                     />
 *                 </ExtReact>
 *            )
 *        }
 *     }
 *
 */
