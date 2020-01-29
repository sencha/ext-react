/**
 * @class Ext.chart.series.sprite.Series
 * @extend Ext.draw.sprite.Sprite
 * Base class for all series sprites.
 * Defines attributes common to all series sprites, like data in x/y directions and its min/max values,
 * and configs, like the {@link Ext.chart.series.Series} instance that manages the sprite.
 *
 */

/**
 * @cfg {String} [field=null]
 * The store field used by the series.
 * @accessor
 */

/**
 * @cfg {Number} [dataMinX=0]
 * Data minimum on the x-axis.
 */

/**
 * @cfg {Number} [dataMaxX=1]
 * Data maximum on the x-axis.
 */

/**
 * @cfg {Number} [dataMinY=0]
 * Data minimum on the y-axis.
 */

/**
 * @cfg {Number} [dataMaxY=1]
 * Data maximum on the y-axis.
 */

/**
 * @cfg {Array} [rangeX=null]
 * Data range derived from all the series bound to the x-axis.
 */
/**
 * @cfg {Array} [rangeY=null]
 * Data range derived from all the series bound to the y-axis.
 */

/**
 * @cfg {Object} [dataX=null]
 * Data items on the x-axis.
 */

/**
 * @cfg {Object} [dataY=null]
 * Data items on the y-axis.
 */

/**
 * @cfg {Object} [labels=null]
 * Labels used in the series.
 */

/**
 * @cfg {Number} [labelOverflowPadding=10]
 * Padding around labels to determine overlap.
 */
