/**
 * @abstract
 * @class Ext.chart.series.StackedCartesian
 * @extend Ext.chart.series.Cartesian
 * Abstract class for all the stacked cartesian series including area series
 * and bar series.
 */

/**
 * @cfg {Boolean} [stacked=true]
 * `true` to display the series in its stacked configuration.
 * @accessor
 */

/**
 * @cfg {Boolean} [splitStacks=true]
 * `true` to stack negative/positive values in respective y-axis directions.
 * @accessor
 */

/**
 * @cfg {Boolean} [fullStack=false]
 * If `true`, the height of a stacked bar is always the full height of the chart,
 * with individual components viewed as shares of the whole determined by the
 * {@link #fullStackTotal} config.
 * @accessor
 */

/**
 * @cfg {Boolean} [fullStackTotal=100]
 * If the {@link #fullStack} config is set to `true`, this will determine
 * the absolute total value of each stack.
 * @accessor
 */

/**
 * @cfg {Array} hidden
 * @accessor
 */
