/**
 * @class Ext.sparkline.Bar
 * @extend Ext.sparkline.BarBase
 * @alias widget.sparklinebar
 *
 * Plots a bar chart of the values in the passed {@link #values} array.
 *
 * See {@link Ext.sparkline.Base the base class} for a simple example.
 */

/**
 * @cfg {String} [barColor=#3366cc]
 * The bar color for positive values.
 * @accessor
 */

/**
 * @cfg {String} [negBarColor=#f44]
 * The bar color for negative values.
 * @accessor
 */

/**
 * @cfg {String[]} [stackedBarColor=['#3366cc','#dc3912','#ff9900','#109618','#66aa00','#dd4477','#0099c6','#990099']
 * An array of colours to use for stacked bar charts.
 * The first series will use the first value in the array, the second series will use the second, etc.
 * @accessor
 */

/**
 * @cfg {String} [zeroColor=null] The bar color for zero values.
 * @accessor
 */

/**
 * @cfg {String} [nullColor=null] The bar color for null values. Usually null values are
 * omitted and not plotted. Setting this config causes a very thin bar to be plotted with
 * the special color in the case that null is a meaningful value in the series.
 * @accessor
 */

/**
 * @cfg {Boolean} [zeroAxis=true]
 * Centers the Y axis at zero by default.
 * @accessor
 */

/**
 * @cfg {Number} [barWidth=4]
 * The pixel width of bars.
 * @accessor
 */

/**
 * @cfg {Number} [barSpacing=1]
 * The pixel spacing between bars.
 * @accessor
 */

/**
 * @cfg {Number} [chartRangeMin=null]
 * The minimum value to use for the range of Y values of the chart - Defaults to the
 * minimum value supplied.
 * @accessor
 */

/**
 * @cfg {Number} [chartRangeMax=null] The maximum value to use for the range of Y values
 * of the chart - Defaults to the minimum value supplied.
 * @accessor
 */

/**
 * @cfg {Boolean} [chartRangeClip=false]
 * If true then the y values supplied to plot will be clipped to fall
 * between {@link #chartRangeMin} and {@link #chartRangeMax} - By default
 * chartRangeMin/Max just ensure that the chart
 * spans at least that range of values, but does not constrain it.
 * @accessor
 */

/**
 * @cfg [colorMap=null]
 * @inheritdoc Ext.sparkline.TriState
 * @accessor
 */
