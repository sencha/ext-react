/**
 * @class Ext.sparkline.Box
 * @extend Ext.sparkline.Base
 * @alias widget.sparklinebox
 *
 * Generates a box plot graph from the provided {@link #values} array.
 *
 * See <a href="http://en.wikipedia.org/wiki/Box_plot">Wikipedia Box Plots</a>
 *
 * See {@link Ext.sparkline.Base the base class} for a simple example.
 */

/**
 * @cfg {Boolean} [raw=false]
 * By default the points are calculated from the input values array. Set this to true to
 * pass the pre-calculated points in the values config.
 * @accessor
 */

/**
 * @cfg {String} [boxLineColor=#000]
 * The color of the box outline.
 * @accessor
 */

/**
 * @cfg {String} [boxFillColor=#cdf]
 * The color of the box fill.
 * @accessor
 */

/**
 * @cfg {String} [whiskerColor=#000]
 * The color of the whiskers.
 * @accessor
 */

/**
 * @cfg {String} [outlierLineColor=#333]
 * The color of the outlier circles' outline.
 * @accessor
 */

/**
 * @cfg {String} [outlierFillColor=#fff]
 * The fill color of the outlier circles.
 * @accessor
 */

/**
 * @cfg {String} [medianColor=#f00]
 * The color of the median line.
 *
 */

/**
 * @cfg {Boolean} [showOutliers=true]
 * Configure as `false` to not show outlier circles.
 * @accessor
 */

/**
 * @cfg {Number} [outlierIQR=1.5]
 * The inter-quartile range multiplier used to calculate values that qualify as an outlier.
 * @accessor
 */

/**
 * @cfg {Number} [spotRadius=1.5]
 * The radius of the outlier circles.
 * @accessor
 */

/**
 * @cfg {Number} [target=null]
 * If set, a crosshair will be drawn at the specified value point.
 * @accessor
 */

/**
 * @cfg {String} [targetColor=#4a2]
 * The color of the crosshair drawn at the point specified by {@link #target}.
 * @accessor
 */

/**
 * @cfg {Number} [chartRangeMin=null]
 * The minimum value to use for the range of Y values of the chart - Defaults to the
 * minimum value supplied.
 * @accessor
 */

/**
 * @cfg {Number} [chartRangeMax=null]
 * The maximum value to use for the range of Y values of the chart - Defaults to the
 * minimum value supplied.
 * @accessor
 */
