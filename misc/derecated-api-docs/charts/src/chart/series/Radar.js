/**
 * @class Ext.chart.series.Radar
 * @extend Ext.chart.series.Polar
 * @alias series.radar
 *
 * Creates a Radar Chart. A Radar Chart is a useful visualization technique for comparing different quantitative values for
 * a constrained number of categories.
 *
 * As with all other series, the Radar series must be appended in the *series* Chart array configuration. See the Chart
 * documentation for more information.
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
 *                            type: 'radar',
 *                            angleField: 'name',
 *                            radiusField: 'data1',
 *                            style: {
 *                                fillStyle: '#388FAD',
 *                                fillOpacity: .1,
 *                                strokeStyle: '#388FAD',
 *                                strokeOpacity: .8,
 *                                lineWidth: 1
 *                            }
 *                         }]}
 *                         axes={[{
 *                            type: 'numeric',
 *                            position: 'radial',
 *                            fields: 'data1',
 *                            style: {
 *                                estStepSize: 10
 *                            },
 *                            grid: true
 *                         }, {
 *                            type: 'category',
 *                            position: 'angular',
 *                            fields: 'name',
 *                            style: {
 *                                estStepSize: 1
 *                            },
 *                            grid: true
 *                        }]}
 *                     />
 *                 </ExtReact>
 *            )
 *        }
 *     }
 *
 */

