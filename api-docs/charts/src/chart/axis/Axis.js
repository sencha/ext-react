/**
 * @class Ext.chart.axis.Axis
 * @extend Ext.Base
 * @xtype axis
 *
 * Defines axis for charts.
 *
 * Using the current model, the type of axis can be easily extended. By default, Sencha Charts provide three different
 * types of axis:
 *
 *  * **numeric** - the data attached to this axis is numeric and continuous.
 *  * **time** - the data attached to this axis is (or gets converted into) a date/time value; it is continuous.
 *  * **category** - the data attached to this axis belongs to a finite set. The data points are evenly placed along the axis.
 *
 * The behavior of an axis can be easily changed by setting different types of axis layout and axis segmenter to the axis.
 *
 * Axis layout defines how the data points are placed. Using continuous layout, the data points will be distributed by
 * the numeric value. Using discrete layout the data points will be spaced evenly. Furthermore, if you want to combine
 * the data points with the duplicate values in a discrete layout, you should use combineDuplicate layout.
 *
 * Segmenter defines the way to segment data range. For example, if you have a Date-type data range from Jan 1, 1997 to
 * Jan 1, 2017, the segmenter will segment the data range into years, months or days based on the current zooming
 * level.
 *
 * It is possible to write custom axis layouts and segmenters to extends this behavior by simply implementing interfaces
 * {@link Ext.chart.axis.layout.Layout} and {@link Ext.chart.axis.segmenter.Segmenter}.
 *
 * Here's an example for the axes part of a chart definition:
 * An example of axis for a series (in this case for an area chart that has multiple layers of yFields) could be:
 *
 *     axes: [{
 *         type: 'numeric',
 *         position: 'left',
 *         title: 'Number of Hits',
 *         grid: {
 *             odd: {
 *                 opacity: 1,
 *                 fill: '#ddd',
 *                 stroke: '#bbb',
 *                 lineWidth: 1
 *             }
 *         },
 *         minimum: 0
 *     }, {
 *         type: 'category',
 *         position: 'bottom',
 *         title: 'Month of the Year',
 *         grid: true,
 *         label: {
 *             rotate: {
 *                 degrees: 315
 *             }
 *         }
 *     }]
 *
 * In this case we use a `numeric` axis for displaying the values of the Area series and a `category` axis for displaying the names of
 * the store elements. The numeric axis is placed on the left of the screen, while the category axis is placed at the bottom of the chart.
 * Both the category and numeric axes have `grid` set, which means that horizontal and vertical lines will cover the chart background. In the
 * category axis the labels will be rotated so they can fit the space better.
 */

/**
 * @event rangechange
 * Fires when the {@link Ext.chart.axis.Axis#range range} of the axis  changes.
 * @param {Ext.chart.axis.Axis} axis
 * @param {Array} range
 * @param {Array} oldRange
 */

/**
 * @event visiblerangechange
 * Fires when the {@link #visibleRange} of the axis changes.
 * @param {Ext.chart.axis.Axis} axis
 * @param {Array} visibleRange
 */

/**
 * @cfg {String} [position='bottom']
 * Where to set the axis. Available options are `left`, `bottom`, `right`, `top`,
 * `radial` and `angular`.
 * @accessor
 */

/**
 * @cfg {Array} [fields=[]]
 * An array containing the names of the record fields which should be mapped along the axis.
 * This is optional if the binding between series and fields is clear.
 * @accessor
 */

/**
 * @cfg {Object} [label=undefined]
 *
 * The label configuration object for the Axis. This object may include style attributes
 * like `spacing`, `padding`, `font` that receives a string or number and
 * returns a new string with the modified values.
 *
 * For more supported values, see the configurations for {@link Ext.chart.sprite.Label}.
 * @accessor
 */

/**
 * @cfg {Object} [grid=false]
 * The grid configuration object for the Axis style. Can contain `stroke` or `fill` attributes.
 * Also may contain an `odd` or `even` property in which you only style things on odd or even rows.
 * For example:
 *
 *
 *     grid {
 *         odd: {
 *             stroke: '#555'
 *         },
 *         even: {
 *             stroke: '#ccc'
 *         }
 *     }
 *
 * @accessor
 */

/**
 * @cfg {Array|Object} [limits=null]
 * The limit lines configuration for the axis.
 * For example:
 *
 *     limits: [{
 *         value: 50,
 *         line: {
 *             strokeStyle: 'red',
 *             lineDash: [6, 3],
 *             title: {
 *                 text: 'Monthly minimum',
 *                 fontSize: 14
 *             }
 *         }
 *     }]
 *
 * @accessor
 */

/**
 * @cfg {Function} [renderer=null]
 * Allows to change the text shown next to the tick.
 * @param {Ext.chart.axis.Axis} axis The axis.
 * @param {String/Number} label The label.
 * @param {Object} layoutContext The object that holds calculated positions
 * of axis' ticks based on current layout, segmenter, axis length and configuration.
 * @param {String/Number/null} lastLabel The last label (if any).
 * @return {String} The label to display.
 *
 * @accessor
 */

/**
 * @cfg {Object} [style=null]
 * The style for the axis line and ticks.
 * Refer to the {@link Ext.chart.axis.sprite.Axis}
 * @accessor
 */

/**
 * @cfg {Number} [margin=0]
 * The margin of the axis. Used to control the spacing between axes in charts with multiple axes.
 * Unlike CSS where the margin is added on all 4 sides of an element, the `margin` is the total space
 * that is added horizontally for a vertical axis, vertically for a horizontal axis,
 * and radially for an angular axis.
 * @accessor
 */

/**
 * @cfg {Number} [titleMargin=4]
 * The margin around the axis title. Unlike CSS where the margin is added on all 4
 * sides of an element, the `titleMargin` is the total space that is added horizontally
 * for a vertical title and vertically for an horizontal title, with half the `titleMargin`
 * being added on either side.
 * @accessor
 */

/**
 * @cfg {Object} [background=null]
 * The background config for the axis surface.
 * @accessor
 */

/**
 * @cfg {Number} [minimum=NaN]
 * The minimum value drawn by the axis. If not set explicitly, the axis
 * minimum will be calculated automatically.
 * @accessor
 */

/**
 * @cfg {Number} [maximum=NaN]
 * The maximum value drawn by the axis. If not set explicitly, the axis
 * maximum will be calculated automatically.
 * @accessor
 */

/**
 * @cfg {Boolean} [reconcileRange=false]
 * If 'true' the range of the axis will be a union of ranges
 * of all the axes with the same direction. Defaults to 'false'.
 * @accessor
 */

/**
 * @cfg {Number} [minZoom=1]
 * The minimum zooming level for axis.
 * @accessor
 */

/**
 * @cfg {Number} [maxZoom=10000]
 * The maximum zooming level for axis.
 * @accessor
 */

/**
 * @cfg {Object|Ext.chart.axis.layout.Layout} [layout='continuous']
 * The axis layout config. See {@link Ext.chart.axis.layout.Layout}
 * @accessor
 */

/**
 * @cfg {Object|Ext.chart.axis.segmenter.Segmenter} [segmenter='numeric']
 * The segmenter config. See {@link Ext.chart.axis.segmenter.Segmenter}
 * @accessor
 */

/**
 * @cfg {Boolean} [hidden=false]
 * Indicate whether to hide the axis.
 * If the axis is hidden, one of the axis line, ticks, labels or the title will be shown and
 * no margin will be taken.
 * The coordination mechanism works fine no matter if the axis is hidden.
 * @accessor
 */

/**
 * @cfg {Number} [majorTickSteps=0]
 * Forces the number of major ticks to the specified value.
 * Both {@link #minimum} and {@link #maximum} should be specified.
 * @accessor
 */

/**
 * @cfg {Number} [minorTickSteps=0]
 * The number of small ticks between two major ticks.
 * @accessor
 */

/**
 * @cfg {Boolean} [adjustByMajorUnit=true]
 * Whether to make the auto-calculated minimum and maximum of the axis
 * a multiple of the interval between the major ticks of the axis.
 * If {@link #majorTickSteps}, {@link #minimum} or {@link #maximum}
 * configs have been set, this config will be ignored.
 * Defaults to 'true'.
 * @accessor
 */

/**
 * @cfg {String|Object} [title=null]
 * The title for the Axis.
 * If given a String, the 'text' attribute of the title sprite will be set,
 * otherwise the style will be set.
 * @accessor
 */

/**
 * @cfg {Number} [increment=0.5]
 * Given a minimum and maximum bound for the series to be rendered (that can be obtained
 * automatically or by manually setting `minimum` and `maximum`) tick marks will be added
 * on each `increment` from the minimum value to the maximum one.
 * @accessor
 */

/**
 * @cfg {Boolean} [labelInSpan=null]
 * Draws the labels in the middle of the spans.
 * @accessor
 */

/**
 * @cfg {Array} [visibleRange=[0, 1]]
 * Specify the proportion of the axis to be rendered. The series bound to
 * this axis will be synchronized and transformed accordingly.
 * @accessor
 */

/**
 * @cfg {Boolean} [needHighPrecision=false]
 * Indicates that the axis needs high precision surface implementation.
 * See {@link Ext.draw.engine.Canvas#highPrecision}
 * @accessor
 */

/**
 * @cfg {Ext.chart.axis.Axis|String|Number} [linkedTo=null]
 * Axis (itself, its ID or index) that this axis is linked to.
 * When an axis is linked to a master axis, it will use the same data as the master axis.
 * It can be used to show additional info, or to ease reading the chart by duplicating the scales.
 * @accessor
 */

/**
 * @cfg {Number|Object} [floating=null]
 * If `floating` is a number, then it's a percentage displacement of the axis from its initial {@link #position}
 * in the direction opposite to the axis' direction. For instance, '{position:"left", floating:75}' displays a vertical
 * axis at 3/4 of the chart, starting from the left. It is equivalent to '{position:"right", floating:25}'.
 * If `floating` is an object, then `floating.value` is the position of this axis along another axis,
 * defined by `floating.alongAxis`, where `alongAxis` is an ID, an {@link Ext.chart.AbstractChart#axes} config index,
 * or the other axis itself. `alongAxis` must have an opposite {@link Ext.chart.axis.Axis#getAlignment alignment}.
 * For example:
 *
 *      axes: [
 *          {
 *              title: 'Average Temperature (F)',
 *              type: 'numeric',
 *              position: 'left',
 *              id: 'temperature-vertical-axis',
 *              minimum: -30,
 *              maximum: 130
 *          },
 *          {
 *              title: 'Month (2013)',
 *              type: 'category',
 *              position: 'bottom',
 *              floating: {
 *                  value: 32,
 *                  alongAxis: 'temperature-vertical-axis'
 *              }
 *          }
 *      ]
 */
