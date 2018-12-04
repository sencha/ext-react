/**
 * @class Ext.chart.CartesianChart
 * @extend Ext.chart.AbstractChart
 * @xtype cartesian
 * @xtype chart
 *
 * Represents a chart that uses cartesian coordinates.
 * A cartesian chart has two directions, X direction and Y direction.
 * The series and axes are coordinated along these directions.
 * By default the x direction is horizontal and y direction is vertical,
 * You can swap the direction by setting the {@link #flipXY} config to `true`.
 *
 * Cartesian series often treats x direction an y direction differently.
 * In most cases, data on x direction are assumed to be monotonically increasing.
 * Based on this property, cartesian series can be trimmed and summarized properly
 * to gain a better performance.
 *
 */

/**
 * @cfg {Boolean} [flipXY=false]
 * Flip the direction of X and Y axis.
 * If flipXY is `true`, the X axes will be vertical and Y axes will be horizontal.
 * Note that {@link Ext.chart.axis.Axis#position positions} of chart axes have
 * to be updated accordingly: axes positioned to the `top` and `bottom` should
 * be positioned to the `left` or `right` and vice versa.
 * @accessor
 */

/**
 * @cfg {Object} innerPadding
 * The amount of inner padding in pixels.
 * Inner padding is the padding from the innermost axes to the series.
 * @accessor
 */
