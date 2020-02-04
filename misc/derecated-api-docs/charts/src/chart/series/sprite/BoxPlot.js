/**
 * @class Ext.chart.series.sprite.BoxPlot
 * @extend Ext.chart.series.sprite.Cartesian
 * @alias sprite.boxplotseries
 *
 * BoxPlot series sprite that manages {@link Ext.chart.sprite.BoxPlot} instances.
 */

/**
 * @cfg {Number[]} [dataLow=null]
 * Array of coordinated minimum values.
 */

/**
 * @cfg {Number[]} [dataQ1=null]
 * Array of coordinated 1-st quartile values.
 */

/**
 * @cfg {Number[]} [dataQ3=null]
 * Array of coordinated 3-rd quartile values.
 */

/**
 * @cfg {Number[]} [dataHigh=null]
 * Array of coordinated maximum values.
 */

/**
 * @cfg {Number} [minBoxWidth=2]
 * The minimum box width.
 */

/**
 * @cfg {Number} [maxBoxWidth=20]
 * The maximum box width.
 */

/**
 * @cfg {Number} [minGapWidth=5]
 * The minimum gap between boxes.
 */

/**
 * @cfg [dataMedian='dataY']
 * The `dataMedian` attribute can be used to set the value of
 * the `dataY` attribute. E.g.:
 *
 *     sprite.setAttributes({
 *         dataMedian: [...]
 *     });
 *
 * To fetch the value of the attribute one has to use
 *
 *     sprite.attr.dataY // array of coordinated median values
 *
 * and not
 *
 *     sprite.attr.dataMedian // WRONG!
 *
 * `dataY` attribute is defined by the `Ext.chart.series.sprite.Series`.
 */
