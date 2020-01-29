/**
 * @class Ext.chart.axis.Numeric
 * @extend Ext.chart.axis.Axis
 * @alias axis.numeric
 * @alias axis.radial
 *
 * An axis to handle numeric values. This axis is used for quantitative data as
 * opposed to the category axis. You can set minimum and maximum values to the
 * axis so that the values are bound to that. If no values are set, then the
 * scale will auto-adjust to the values.
 *
 *     @example packages=[charts,ext-react]
 *     import React, { Component } from 'react';
 *     import { ExtReact, Container } from '@sencha/ext-react-modern';
 *     import { Cartesian } from '@sencha/ext-react-modern';
 *
 *     export default class MyExample extends Component {
 *
 *         store = new Ext.data.Store({
 *             fields: ['name', 'data1', 'data2', 'data3'],
 *             data: [
 *                 {'name': 1, 'data1': 10, 'data2':12, 'data3':14},
 *                 {'name': 2, 'data1': 7,  'data2':8,  'data3':16},
 *                 {'name': 3, 'data1': 10, 'data2':12, 'data3':14},
 *                 {'name': 4, 'data1': 2,  'data2':14, 'data3':6},
 *                 {'name': 5, 'data1': 27, 'data2':38, 'data3':36}
 *             ]
 *        })
 *
 *        render() {
 *            return (
 *                 <ExtReact>
 *                     <Cartesian
 *                         store={this.store}
 *                         series={[{
 *                             type: 'area',
 *                             subStyle: {
 *                                 fill: ['#0A3F50', '#30BDA7', '#96D4C6']
 *                             },
 *                             xField: 'name',
 *                             yField: ['data1', 'data2', 'data3']
 *                         }]}
 *                         axes={[{
 *                             type: 'numeric',
 *                             position: 'left',
 *                             minimum: 0,
 *                             fields: ['data1', 'data2', 'data3'],
 *                             title: 'Sample Values',
 *                             grid: {
 *                                 odd: {
 *                                     opacity: 1,
 *                                     fill: '#f2f2f2',
 *                                     stroke: '#ddd'
 *                                 }
 *                             }
 *                         }]}
 *                     />
 *                 </ExtReact>
 *            )
 *        }
 *     }
 *
 * In this example we create an axis of Numeric type. We set a minimum value so that
 * even if all series have values greater than zero, the grid starts at zero. We bind
 * the axis onto the left part of the surface by setting _position_ to _left_.
 * We bind three different store fields to this axis by setting _fields_ to an array.
 * We set the title of the axis to _Number of Hits_ by using the _title_ property.
 * We use a _grid_ configuration to set odd background rows to a certain style and even rows
 * to be transparent/ignored.
 *
 */
