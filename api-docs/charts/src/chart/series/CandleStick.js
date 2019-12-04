/**
 * @class Ext.chart.series.CandleStick
 * @extend Ext.chart.series.Cartesian
 * @alias series.candlestick
 *
 * Creates a candlestick or OHLC Chart.
 *
 * CandleStick series are typically used to plot price movements of a security on an exchange over time.
 * The series can be used with the 'time' axis, but since exchanges often close for weekends,
 * and the price data has gaps for those days, it's more practical to use this series with
 * the 'category' axis to avoid rendering those data gaps. The 'category' axis has no notion
 * of time (and thus gaps) and treats every Date object (value of the 'xField') as a unique
 * category. However, it also means that it doesn't support the 'dateFormat' prop,
 * which can be easily remedied with a 'renderer' that formats a Date object for use
 * as an axis label. For example:
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
 * @cfg {String} openField
 * The store record field name that represents the opening value of the given period.
 * @accessor
 */

/**
 * @cfg {String} highField
 * The store record field name that represents the highest value of the time interval represented.
 * @accessor
 */

/**
 * @cfg {String} lowField
 * The store record field name that represents the lowest value of the time interval represented.
 * @accessor
 */

/**
 * @cfg {String} closeField
 * The store record field name that represents the closing value of the given period.
 * @accessor
 */
