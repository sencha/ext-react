/**
 * @class Ext.chart.series.Gauge
 * @extend Ext.chart.series.Series
 *
 * Creates a Gauge Chart.
 *
 *     @example packages=[charts,ext-react]
 *     import React, { Component } from 'react';
 *     import { ExtReact, Container } from '@sencha/ext-react-modern';
 *     import { Polar } from '@sencha/ext-react-modern';
 *
 *     export default class MyExample extends Component {
 *
 *        store = new Ext.data.Store({
 *             fields: ['name', 'data1', 'data2', 'data3'],
 *             data: [{
 *                 mph: 65,
 *                 fuel: 50,
 *                 temp: 150,
 *                 rpm: 6000
 *             }]
 *        })
 *
 *        render() {
 *            return (
 *                 <ExtReact>
 *                     <Polar
 *                         store={this.store}
 *                         series={[{
 *                            type: 'gauge',
 *                            angleField: 'mph',
 *                            needle: true,
 *                            donut: 30
 *                         }]}
 *                     />
 *                 </ExtReact>
 *            )
 *        }
 *     }
 */

/**
 * @cfg {String} angleField
 * The store record field name to be used for the gauge value.
 * The values bound to this field name must be positive real numbers.
 * @accessor
 */

/**
 * @cfg {Boolean} [needle=false]
 * If true, display the gauge as a needle, otherwise as a sector.
 * @accessor
 */

/**
 * @cfg {Number} [needleLength=90]
 * Percentage of the length of needle compared to the radius of the entire disk.
 * @accessor
 */

/**
 * @cfg {Number} [needleWidth=4]
 * Width of the needle in pixels.
 * @accessor
 */

/**
 * @cfg {Number} [donut=30]
 * Percentage of the radius of the donut hole compared to the entire disk.
 * @accessor
 */

/**
 * @cfg {Boolean} [showInLegend=false]
 * Whether to add the gauge chart elements as legend items.
 */

/**
 * @cfg {Number} [value=null]
 * Directly sets the displayed value of the gauge.
 * It is ignored if {@link #angleField} is provided.
 * @accessor
 */

/**
 * @cfg {Array} [colors=null] (required)
 * An array of color values which is used for the needle and the `sectors`.
 * @accessor
 */

/**
 * @cfg {Array} [sectors=null]
 * Allows to paint sectors of different colors in the background of the gauge,
 * with optional labels.
 *
 * It can be an array of numbers (each between `minimum` and `maximum`) that
 * define the highest value of each sector. For N sectors, only (N-1) values are
 * needed because it is assumed that the first sector starts at `minimum` and the
 * last sector ends at `maximum`. Example: a water temperature gauge that is blue
 * below 20C, red above 80C, gray in-between, and with an orange needle...
 *
 *      minimum: 0,
 *      maximum: 100,
 *      sectors: [20, 80],
 *      colors: ['orange', 'blue', 'lightgray', 'red']
 *
 * It can be also an array of objects, each with the following properties:
 *
 * @cfg {Number} sectors.start The starting value of the sector. If omitted, it
 * uses the previous sector's `end` value or the chart's `minimum`.
 * @cfg {Number} sectors.end The ending value of the sector. If omitted, it uses
 * the `maximum` defined for the chart.
 * @cfg {String} sectors.label The label for this sector. Labels are styled using
 * the series' {@link Ext.chart.series.Series#label label} prop.
 * @cfg {String} sectors.color The color of the sector. If omitted, it uses one
 * of the `colors` defined for the series or for the chart.
 * @cfg {Object} sectors.style An additional style object for the sector (for
 * instance to set the opacity or to draw a line of a different color around the
 * sector).
 *
 *      minimum: 0,
 *      maximum: 100,
 *      sectors: [{
 *              end: 20,
 *              label: 'Cold',
 *              color: 'aqua'
 *          },
 *          {
 *              end: 80,
 *              label: 'Temp.',
 *              color: 'lightgray',
 *              style: { strokeStyle:'black', strokeOpacity:1, lineWidth:1 }
 *          },
 *          {
 *              label: 'Hot',
 *              color: 'tomato'
 *          }]
 *
 * @accessor
 */

/**
 * @cfg {Number} [minimum=0]
 * The minimum value of the gauge.
 * @accessor
 */

/**
 * @cfg {Number} [maximum=100]
 * The maximum value of the gauge.
 * @accessor
 */

/**
 * @cfg {Number} totalAngle
 * The size of the sector that the series will occupy.
 * @accessor
 */

/**
 * @cfg {Boolean} [wholeDisk=false]
 * Indicates whether to show the whole disk or only the marked part.
 * @accessor
 */
