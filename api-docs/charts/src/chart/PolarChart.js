/**
 * @class Ext.chart.PolarChart
 * @extend Ext.chart.AbstractChart
 * @xtype polar
 *
 * Represent a chart that uses polar coordinates.
 * A polar chart has two axes: an angular axis (which is a circle) and
 * a radial axis (a straight line from the center to the edge of the circle).
 * The angular axis is usually a Category axis while the radial axis is
 * typically numerical. 
 *
 * Pie charts and Radar charts are common examples of Polar charts.
 *
 */

/**
 * @cfg {Array} [center=[0, 0]]
 * Determines the center of the polar chart.
 * Updated when the chart performs layout.
 * @accessor
 */
/**
 * @cfg {Number} [radius=0]
 * Determines the radius of the polar chart.
 * Updated when the chart performs layout.
 * @accessor
 */
/**
 * @cfg {Number} [innerPadding=0]
 * The amount of inner padding in pixels.
 * Inner padding is the padding from the outermost angular axis to the series.
 * @accessor
 */
