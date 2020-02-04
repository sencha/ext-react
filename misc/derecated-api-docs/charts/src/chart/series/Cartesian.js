/**
 * @abstract
 * @class Ext.chart.series.Cartesian
 * @extend Ext.chart.series.Series
 *
 * Common base class for series implementations that plot values using cartesian coordinates.
 *
 * @constructor
 */

/**
 * @cfg {String} [xField=null]
 * The field used to access the x axis value from the items from the data source.
 * @accessor
 */

/**
 * @cfg {String|String[]} [yField=null]
 * The field(s) used to access the y-axis value(s) of the items from the data source.
 * @accessor
 */

/**
 * @cfg {Ext.chart.axis.Axis|Number|String} [xAxis=null]
 * xAxis The chart axis the series is bound to in the 'X' direction.
 * Normally, this would be set automatically by the series.
 * For charts with multiple x-axes, this defines which x-axis is used by the series.
 * It refers to either axis' ID or the (zero-based) index of the axis
 * in the chart's {@link Ext.chart.AbstractChart#axes axes} config.
 * @accessor
 */

/**
 * @cfg {Ext.chart.axis.Axis|Number|String} [yAxis=null]
 * yAxis The chart axis the series is bound to in the 'Y' direction.
 * Normally, this would be set automatically by the series.
 * For charts with multiple y-axes, this defines which y-axis is used by the series.
 * It refers to either axis' ID or the (zero-based) index of the axis
 * in the chart's {@link Ext.chart.AbstractChart#axes axes} config.
 * @accessor
 */
