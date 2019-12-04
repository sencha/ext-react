/**
 * @class Ext.chart.series.Line
 * @extend Ext.chart.series.Cartesian
 * @alias series.line
 *
 * Creates a Line Chart. A Line Chart is a useful visualization technique to display quantitative information for different
 * categories or other real values (as opposed to the bar chart), that can show some progression (or regression) in the dataset.
 * As with all other series, the Line Series must be appended in the *series* Chart array configuration. See the Chart
 * documentation for more information.
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
 *                            type: 'line',
 *                            style: {
 *                                stroke: '#30BDA7',
 *                                lineWidth: 2
 *                            },
 *                            xField: 'name',
 *                            yField: 'data1',
 *                            marker: {
 *                                type: 'path',
 *                                path: ['M', - 4, 0, 0, 4, 4, 0, 0, - 4, 'Z'],
 *                                stroke: '#30BDA7',
 *                                lineWidth: 2,
 *                                fill: 'white'
 *                            }
 *                         }, {
 *                            type: 'line',
 *                            fill: true,
 *                            style: {
 *                                fill: '#96D4C6',
 *                                fillOpacity: .6,
 *                                stroke: '#0A3F50',
 *                                strokeOpacity: .6,
 *                            },
 *                            xField: 'name',
 *                            yField: 'data2',
 *                            marker: {
 *                                type: 'circle',
 *                                radius: 4,
 *                                lineWidth: 2,
 *                                fill: 'white'
 *                            }
 *                        }]}
 *                     />
 *                 </ExtReact>
 *            )
 *        }
 *     }
 */

/**
 * @cfg {Number} [selectionTolerance=20]
 * The offset distance from the cursor position to the line series to trigger
 * events (then used for highlighting series, etc).
 * @accessor
 */

/**
 * @cfg {Object} style
 * An object containing styles for the visualization lines. These styles will override the theme styles.
 * Some options contained within the style object will are described next.
 * @accessor
 */

/**
 * @cfg {Boolean} [smooth=false]
 * `true` if the series' line should be smoothed.
 * Line smoothing only works with gap-less data.
 * @accessor
 */

/**
 * @cfg {Boolean} [step=false]
 * If set to `true`, the line uses steps instead of straight lines to connect the dots.
 * It is ignored if `smooth` is true.
 * @accessor
 */

/**
 * @cfg {"gap"/"connect"/"origin"} [nullStyle="gap"]
 * Possible values:
 * 'gap' - null points are rendered as gaps.
 * 'connect' - non-null points are connected across null points, so that
 * there is no gap, unless null points are at the beginning/end of the line.
 * Only the visible data points are connected - if a visible data point
 * is followed by a series of null points that go off screen and eventually
 * terminate with a non-null point, the connection won't be made.
 * 'origin' - null data points are rendered at the origin,
 * which is the y-coordinate of a point where the x and y axes meet.
 * This requires that at least the x-coordinate of a point is a valid value.
 * @accessor
 */

/**
 * @cfg {Boolean} [fill=undefined]
 * If set to `true`, the area underneath the line is filled with the color defined as follows, listed by priority:
 * - The color that is configured for this series ({@link Ext.chart.series.Series#colors}).
 * - The color that is configured for this chart ({@link Ext.chart.AbstractChart#colors}).
 * - The fill color that is set in the {@link #style} prop.
 * - The stroke color that is set in the {@link #style} prop, or the same color as the line.
 *
 * Note: Do not confuse `series.config.fill` (which is a boolean) with `series.style.fill' (which is an alias
 * for the `fillStyle` property and contains a color). For compatibility with previous versions of the API,
 * if `config.fill` is undefined but a `style.fill' color is provided, `config.fill` is considered true.
 * So the default value below must be undefined, not false.
 * @accessor
 */
