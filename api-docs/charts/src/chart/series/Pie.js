/**
 * @class Ext.chart.series.Pie
 * @extend Ext.chart.series.Polar
 * @alias series.pie
 *
 * Creates a Pie Chart. A Pie Chart is a useful visualization technique to display
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
 *                         theme="green"
 *                         interactions={['rotate']}
 *                         series={[{
 *                            type: 'pie',
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
 *
 */

/**
 * @cfg {String} radiusField
 * The store record field name to be used for the pie slice lengths.
 * The values bound to this field name must be positive real numbers.
 */

/**
 * @cfg {Number} [donut=0]
 * Specifies the radius of the donut hole, as a percentage of the chart's radius.
 * Defaults to 0 (no donut hole).
 */

/**
 * @cfg {Number} [rotation=0]
 * The starting angle of the pie slices.
 */

/**
 * @cfg {Boolean} [clockwise=true]
 * Whether the pie slices are displayed clockwise. Default's true.
 */

/**
 * @cfg {Number} [totalAngle=2*PI]
 * The total angle of the pie series.
 * @accessor
 */

/**
 * @cfg {Array} [hidden=[]]
 * Determines which pie slices are hidden.
 * @accessor
 */

/**
 * @cfg {Number} [radiusFactor=100]
 * Allows adjustment of the radius by a specific percentage.
 * @accessor
 */

/**
 * @cfg {Ext.chart.series.sprite.PieSlice/Object} highlightCfg
 * Default highlight prop for the pie series.
 * Slides highlighted pie sector outward by default.
 *
 * highlightCfg accepts as its value a prop object (or array of props) for a
 * {@link Ext.chart.series.sprite.PieSlice pie sprite}.
 *
 * Example configuration:
 *
 *    highlightCfg: {
 *       margin: 10,
 *       fillOpacity: .7
 *    }
 *
 * @accessor
 */
