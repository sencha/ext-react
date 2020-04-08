/**
 * @class Ext.chart.series.BoxPlot
 * @extend Ext.chart.series.Cartesian
 * @alias series.boxplot
 *
 * A box plot chart is a useful tool for visualizing data distribution within data-sets.
 * For example, salary ranges for a set of occupations, or life expectancy for a set
 * of countries. A single box with whiskers displays the following values for a data-set:
 *
 * * minimum
 * * lower quartile (Q1)
 * * median (Q2)
 * * higher quartile (Q3)
 * * maximum
 *
 * For example:
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
 *                  {
 *                      category: 'Engineer IV',
 *                      low: 110, q1: 130, median: 175, q3: 200, high: 225
 *                  }, {
 *                      category: 'Market',
 *                      low: 75, q1: 125, median: 210, q3: 230, high: 255
 *                  }
 *             ]
 *        })
 *
 *        render() {
 *            return (
 *                 <ExtReact>
 *                     <Cartesian
 *                         store={this.store}
 *                         series={[{
 *                            type: 'boxplot',
 *                            xField: 'category'
 *                         }]}
 *                         axes={[{
 *                            type: 'category',
 *                            position: 'bottom'
 *                        },{
 *                            type: 'numeric',
 *                            position: 'left',
 *                            renderer: function (axis, text) {
 *                                return '$' + text + ' K'
 *                            }
 *                        }]}
 *                     />
 *                 </ExtReact>
 *            )
 *        }
 *     }
 *
 */

/**
 * @cfg {String} [lowField='low']
 * The name of the store record field that represents the smallest value of a dataset.
 * @accessor
 */

/**
 * @cfg {String} [q1Field='q1']
 * The name of the store record field that represents the lower (1-st) quartile
 * value of a dataset.
 * @accessor
 */

/**
 * @cfg {String} [medianField='median']
 * The name of the store record field that represents the median of a dataset.
 * @accessor
 */

/**
 * @cfg {String} [q3Field='q3']
 * The name of the store record field that represents the upper (3-rd) quartile
 * value of a dataset.
 * @accessor
 */

/**
 * @cfg {String} [highField='high']
 * The name of the store record field that represents the largest value of a dataset.
 * @accessor
 */
