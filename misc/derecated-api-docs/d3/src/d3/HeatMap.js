/**
 * @class Ext.d3.HeatMap
 * @extend Ext.d3.svg.Svg
 * @xtype D3_HeatMap
 *
 * The 'D3_HeatMap' component is used for visualizing matrices
 * where the individual values are represented as colors.
 * The component makes use of two {@link Ext.d3.axis.Data Data} axes (one for each
 * dimension of the matrix) and a single {@link Ext.d3.axis.Color Color} axis
 * to encode the values.
 *
 *     @example packages=[d3,ext-react]
 *     import React, { Component } from 'react'
 *     import { ExtReact, Container }  from '@sencha/ext-react-modern';
 *     import { D3_HeatMap } from '@sencha/ext-react-d3';
 *
 *     export default class MyExample extends Component {
 *
 *         store = new Ext.data.Store({
 *             fields: [
 *                 {name: 'date', type: 'date', dateFormat: 'Y-m-d'},
 *                 'bucket',
 *                 'count'
 *             ],
 *             data: [
 *                 { "date": "2012-07-20", "bucket": 800, "count": 119 },
 *                 { "date": "2012-07-20", "bucket": 900, "count": 123 },
 *                 { "date": "2012-07-20", "bucket": 1000, "count": 173 },
 *                 { "date": "2012-07-20", "bucket": 1100, "count": 226 },
 *                 { "date": "2012-07-20", "bucket": 1200, "count": 284 },
 *
 *                 { "date": "2012-07-21", "bucket": 800, "count": 123 },
 *                 { "date": "2012-07-21", "bucket": 900, "count": 165 },
 *                 { "date": "2012-07-21", "bucket": 1000, "count": 237 },
 *                 { "date": "2012-07-21", "bucket": 1100, "count": 278 },
 *                 { "date": "2012-07-21", "bucket": 1200, "count": 338 },
 *
 *                 { "date": "2012-07-22", "bucket": 900, "count": 154 },
 *                 { "date": "2012-07-22", "bucket": 1000, "count": 241 },
 *                 { "date": "2012-07-22", "bucket": 1100, "count": 246 },
 *                 { "date": "2012-07-22", "bucket": 1200, "count": 300 },
 *                 { "date": "2012-07-22", "bucket": 1300, "count": 305 },
 *
 *                 { "date": "2012-07-23", "bucket": 800, "count": 120 },
 *                 { "date": "2012-07-23", "bucket": 900, "count": 156 },
 *                 { "date": "2012-07-23", "bucket": 1000, "count": 209 },
 *                 { "date": "2012-07-23", "bucket": 1100, "count": 267 },
 *                 { "date": "2012-07-23", "bucket": 1200, "count": 299 },
 *                 { "date": "2012-07-23", "bucket": 1300, "count": 316 },
 *
 *                 { "date": "2012-07-24", "bucket": 800, "count": 105 },
 *                 { "date": "2012-07-24", "bucket": 900, "count": 156 },
 *                 { "date": "2012-07-24", "bucket": 1000, "count": 220 },
 *                 { "date": "2012-07-24", "bucket": 1100, "count": 255 },
 *                 { "date": "2012-07-24", "bucket": 1200, "count": 308 },
 *
 *                 { "date": "2012-07-25", "bucket": 800, "count": 104 },
 *                 { "date": "2012-07-25", "bucket": 900, "count": 191 },
 *                 { "date": "2012-07-25", "bucket": 1000, "count": 201 },
 *                 { "date": "2012-07-25", "bucket": 1100, "count": 238 },
 *                 { "date": "2012-07-25", "bucket": 1200, "count": 223 },
 *
 *                 { "date": "2012-07-26", "bucket": 1300, "count": 132 },
 *                 { "date": "2012-07-26", "bucket": 1400, "count": 117 },
 *                 { "date": "2012-07-26", "bucket": 1500, "count": 124 },
 *                 { "date": "2012-07-26", "bucket": 1600, "count": 154 },
 *                 { "date": "2012-07-26", "bucket": 1700, "count": 167 }
 *             ]
 *         });
 *
 *         render() {
 *             return (
 *                 <ExtReact>
 *                     <Container layout="fit">
 *                         <D3_HeatMap
 *                             store={this.store}
 *                             xAxis={{
 *                                 axis: {
 *                                     ticks: 'd3.timeDay',
 *                                     tickFormat: "d3.timeFormat('%b %d')",
 *                                     orient: 'bottom'
 *                                 },
 *                                 scale: {
 *                                     type: 'time'
 *                                 },
 *                                 field: 'date',
 *                                 step: 24 * 60 * 60 * 1000
 *                             }}
 *                             yAxis={{
 *                                 axis: {
 *                                     orient: 'left'
 *                                 },
 *                                 scale: {
 *                                     type: 'linear'
 *                                 },
 *                                 title: {
 *                                     text: 'Total'
 *                                 },
 *
 *                                 field: 'bucket',
 *                                 step: 100
 *                             }}
 *                             colorAxis={{
 *                                 scale: {
 *                                     type: 'linear',
 *                                     range: ['white', 'orange']
 *                                 },
 *                                 field: 'count',
 *                                 minimum: 0
 *                             }}
 *                             tiles={{
 *                                     attr: {
 *                                     'stroke': 'black',
 *                                     'stroke-width': 1
 *                                 }
 *                             }}
 *                         />
 *                     </Container>
 *                 </ExtReact>
 *             )
 *         }
 *     }
 *
 */

/**
 * @cfg {Ext.d3.axis.Data} xAxis
 * The axis that corresponds to the columns of the data matrix.
 * @accessor
 */

/**
 * @cfg {Ext.d3.axis.Data} yAxis
 * The axis that corresponds to the rows of the data matrix.
 * @accessor
 */

/**
 * @cfg {Ext.d3.axis.Color} [colorAxis={}]
 * The axis that corresponds to the values of the data matrix.
 */

/**
 * @cfg {Ext.d3.legend.Color} [legend=false]
 * The legend for tiles' colors.
 * See the {@link Ext.d3.legend.Color} documentation for configuration options.
 * @accessor
 */

/**
 * @cfg {Object} [tiles=null]
 * This config controls the appearance of the heatmap tiles.
 * @cfg {String} tiles.cls The CSS class name to use for each tile.
 * @cfg {Object} tiles.attr The attributes to apply to each tile ('rect') element.
 * @accessor
 */

/**
 * @cfg {Object/Boolean} [labels=true]
 * This config controls the appearance of the heatmap labels.
 * @cfg {String} labels.cls The CSS class name to use for each label.
 * @cfg {Object} labels.attr The attributes to apply to each label ('text') element.
 * @accessor
 */
