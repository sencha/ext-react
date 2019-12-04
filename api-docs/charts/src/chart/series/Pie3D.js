/**
 * @class Ext.chart.series.Pie3D
 * @extend Ext.chart.series.Polar
 * @alias series.pie3d
 *
 * Creates a 3D Pie Chart. A Pie Chart is a useful visualization technique to display
 * quantitative information for different categories that also have a meaning as a whole.
 * As with all other series, the Pie Series must be appended in the *series* Chart array
 * prop. See the Chart documentation for more information.
 *
 *     @example packages=[charts,ext-react]
 *     import React, { Component } from 'react';
 *     import { ExtReact, Container } from '@sencha/ext-react-modern';
 *     import { Polar } from '@sencha/ext-react-modern';
 *
 *     export default class MyExample extends Component {
 *
 *        store = new Ext.data.Store({
 *             fields: ['name', 'data1'],
 *             data: [
 *                  { name: 'metric one', data1: 14 },
 *                  { name: 'metric two', data1: 16 },
 *                  { name: 'metric three', data1: 14 },
 *                  { name: 'metric four', data1: 6 },
 *                  { name: 'metric five', data1: 36 }
 *             ]
 *        })
 *
 *        render() {
 *            return (
 *                 <ExtReact>
 *                     <Polar
 *                         store={this.store}
 *                         interactions={['rotate']}
 *                         series={[{
 *                            type: 'pie3d',
 *                            angleField: 'data1',
 *                            donut: 30,
 *                            label: {
 *                                field: 'name',
 *                                display: 'rotate'
 *                            },
 *                         }]}
 *                     />
 *                 </ExtReact>
 *            )
 *        }
 *     }
 */

/**
 * @cfg {String} angleField (required)
 * The store record field name to be used for the pie angles.
 * The values bound to this field name must be positive real numbers.
 * @accessor
 */

/**
 * @cfg {Boolean/Number} [donut=false]
 * Whether to set the pie chart as donut chart.
 * Can be set to a particular percentage to set the radius
 * of the donut chart.
 * @accessor
 */

/**
 * @cfg {Array} [hidden=[]]
 * Determines which pie slices are hidden.
 * @accessor
 */

/**
 * @cfg {Object} highlightCfg
 * Default {@link #highlight} prop for the 3D pie series.
 * Slides highlighted pie sector outward.
 * @accessor
 */

/**
 * @cfg {Number} [rotation=0]
 * The starting angle of the pie slices.
 * @accessor
 */
