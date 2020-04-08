/**
 * @class Ext.chart.series.Bar
 * @extend Ext.chart.series.StackedCartesian
 * @alias series.bar
 *
 * Creates a Bar or Column Chart (depending on the value of the
 * {@link Ext.chart.CartesianChart#flipXY flipXY} prop).
 *
 * Note: 'bar' series is meant to be used with the
 * {@link Ext.chart.axis.Category 'category'} axis as its x-axis.
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
 *              { 'name': 'metric one', 'data1': 10  },
 *              { 'name': 'metric two', 'data1': 7   },
 *              { 'name': 'metric three', 'data1': 5 },
 *              { 'name': 'metric four', 'data1': 2  },
 *              { 'name': 'metric five', 'data1': 2  }
 *             ]
 *        })
 *
 *        render() {
 *            return (
 *                 <ExtReact>
 *                     <Cartesian
 *                         store={this.store}
 *                         series={[{
 *                            type: 'bar',
 *                            xField: 'name',
 *                            yField: 'data1'
 *                         }]}
 *                         axes={[{
 *                            type: 'category',
 *                            position: 'bottom',
 *                            fields: ['name'],
 *                            title: {
 *                                text: 'Sample Values',
 *                                fontSize: 15
 *                            }
 *                        },{
 *                            type: 'numeric',
 *                            position: 'left',
 *                            fields: 'data1'
 *                        }]}
 *                     />
 *                 </ExtReact>
 *            )
 *        }
 *     }
 */
