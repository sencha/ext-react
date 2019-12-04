/**
 * @class Ext.chart.axis.Time
 * @extend Ext.chart.axis.Numeric
 * @alias axis.time
 *
 * A type of axis whose units are measured in time values. Use this axis
 * for listing dates that you will want to group or dynamically change.
 * If you just want to display dates as categories then use the
 * Category class for axis instead.
 *
 *     @example packages=[charts,ext-react]
 *     import React, { Component } from 'react';
 *     import { ExtReact, Container } from '@sencha/ext-react-modern';
 *     import { Cartesian } from '@sencha/ext-react-modern';
 *
 *     export default class MyExample extends Component {
 *
 *         store = new Ext.data.Store({
 *             fields: ['time', 'open', 'high', 'low', 'close'],
 *             data: [
 *                  { 'time': new Date('Jan 1 2010').getTime(), 'open': 600, 'high': 614, 'low': 578, 'close': 590 },
 *                  { 'time': new Date('Jan 2 2010').getTime(), 'open': 590, 'high': 609, 'low': 580, 'close': 580 },
 *                  { 'time': new Date('Jan 3 2010').getTime(), 'open': 580, 'high': 602, 'low': 578, 'close': 602 },
 *                  { 'time': new Date('Jan 4 2010').getTime(), 'open': 602, 'high': 614, 'low': 586, 'close': 586 }
 *             ]
 *        })
 *
 *        render() {
 *            return (
 *                 <ExtReact>
 *                     <Cartesian
 *                         store={this.store}
 *                         series={[{
 *                            type: 'candlestick',
 *                            xField: 'time',
 *                            openField: 'open',
 *                            highField: 'high',
 *                            lowField: 'low',
 *                            closeField: 'close',
 *                            style: {
 *                                ohlcType: 'ohlc',
 *                                dropStyle: {
 *                                    fill: 'rgb(255, 128, 128)',
 *                                    stroke: 'rgb(255, 128, 128)',
 *                                    lineWidth: 3
 *                                },
 *                                raiseStyle: {
 *                                    fill: 'rgb(48, 189, 167)',
 *                                    stroke: 'rgb(48, 189, 167)',
 *                                    lineWidth: 3
 *                                }
 *                            }
 *                         }]}
 *                         axes={[{
 *                            type: 'numeric',
 *                            position: 'left',
 *                            fields: ['open', 'high', 'low', 'close'],
 *                            title: {
 *                                text: 'Sample Values',
 *                                fontSize: 15
 *                            },
 *                            grid: true,
 *                            minimum: 560,
 *                            maximum: 640
 *                        }, {
 *                            type: 'time',
 *                            position: 'bottom',
 *                            fields: ['time'],
 *                            fromDate: new Date('Dec 31 2009'),
 *                            toDate: new Date('Jan 5 2010'),
 *                            title: {
 *                                text: 'Sample Values',
 *                                fontSize: 15
 *                            },
 *                            style: {
 *                                axisLine: false
 *                            }
 *                        }]}
 *                     />
 *                 </ExtReact>
 *            )
 *        }
 *     }
 */

/**
 * @cfg {String} [dateFormat=null]
 * Indicates the format the date will be rendered in.
 * For example: 'M d' will render the dates as 'Jan 30'.
 * This config works by setting the {@link #renderer} config
 * to a function that uses {@link Ext.Date#format} to format the dates
 * using the given `dateFormat`.
 * If the {@link #renderer} config was set by the user, changes to this config
 * won't replace the user set renderer (until the user removes the renderer by
 * setting the `renderer` config to `null`). In this case the way the `dateFormat`
 * is used (if at all) is up to the user.
 * @accessor
 */

/**
 * @cfg {Date} [fromDate=null]
 * The starting date for the time axis.
 */

/**
 * @cfg {Date} [toDate=null]
 * The ending date for the time axis.
 */
