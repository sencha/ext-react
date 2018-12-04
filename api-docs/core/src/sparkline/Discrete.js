/**
 * @class Ext.sparkline.Discrete
 * @extend Ext.sparkline.BarBase
 * @alias widget.sparklinediscrete
 *
 *
 * Plots a series of thin vertical lines based upon the input {@link #values} array.
 *
 * See {@link Ext.sparkline.Base the base class} for a simple example.
 */

/**
 * @cfg {Number} [lineHeight='auto']
 * Height of each line in pixels - Defaults to 30% of the graph height.
 * @accessor
 */

/**
 * @cfg {String} [thresholdColor=null]
 * Color to use in combination with {@link #thresholdValue}
 * @accessor
 */

/**
 * @cfg {Number} [thresholdValue=0]
 * Values less than this value will be drawn using {@link #thresholdColor} instead of lineColor
 * @accessor
 */

/**
 * @cfg {Number} [chartRangeMax=null]
 * The maximum value to use for the range of Y values of the chart - Defaults to the maximum value supplied.
 * @accessor
 */

/**
 * @cfg {Number} [chartRangeMin=null]
 * The minimum value to use for the range of Y values of the chart - Defaults to the minimum value supplied.
 * @accessor
 */

/**
 * @cfg {Boolean} [chartRangeClip=false]
 * If true then the y values supplied to plot will be clipped to fall
 * between {@link #chartRangeMin} and {@link #chartRangeMax} - By default chartRangeMin/Max
 * just ensure that the chart spans at least that range of values, but does not constrain it.
 * @accessor
 */
