/**
 * @class Ext.sparkline.Base
 * @extend Ext.Gadget
 * @xtype sparkline
 *
 * The base class for ExtJS SparkLines. SparkLines are small, inline graphs used to visually
 * display small amounts of data. For large datasets, use the {@link Ext.chart.AbstractChart chart package}.
 *
 * The SparkLine subclasses accept an {@link #values array of values}, and present the data in different visualizations.
 */

/**
 * @cfg {Number[]} [values=null]
 * An array of numbers which define the chart.
 * @accessor
 */

/**
 * @cfg {String} [lineColor=#157fcc]
 * The hex value for line colors in graphs which display lines
 * ({@link Ext.sparkline.Box Box}, {@link Ext.sparkline.Discrete Discrete} and {@link Ext.sparkline.Line Line}).
 */

/**
 * @cfg {String} [highlightColor=null]
 * The hex value for the highlight color to use when mouseing over a graph segment.
 */

/**
 * @cfg {Number} [highlightLighten=0.1]
 * How much to lighten the highlight color by when mouseing over a graph segment.
 */

/**
 * @cfg {Boolean} [tooltipSkipNull=true]
 * Null values will not have a tooltip displayed.
 */

/**
 * @cfg {String} [tooltipPrefix='']
 * A string to prepend to each field displayed in a tooltip.
 */

/**
 * @cfg {String} [tooltipSuffix='']
 * A string to append to each field displayed in a tooltip.
 */

/**
 * @cfg {Boolean} [disableTooltips=false]
 * Set to `true` to disable mouseover tooltips.
 */

/**
 * @cfg {String/Ext.XTemplate} [tipTpl=null]
 * An XTemplate used to display the value or values in a tooltip when hovering
 * over a Sparkline.
 *
 * The implemented subclases all define their own `tipTpl`, but it can be overridden.
 */
