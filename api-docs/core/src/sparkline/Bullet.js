/**
 * @class Ext.sparkline.Bullet
 * @extend Ext.sparkline.Base
 * @alias widget.sparklinebullet
 *
 * Plots a bullet graph based upon the input {@link #values} array.
 *
 * See <a href="http://en.wikipedia.org/wiki/Bullet_graph">Bullet graphs Wikipedia Page</a> for more information.
 *
 * The first value should be the target value. If there is no target value, it should be `null`.
 * The second value should be the performance value. If there is no performance value, it should be specified as `null`.
 *
 * An example value:
 *
 *     // Target 10
 *     // Performance 12
 *     // Ranges 12,9,7
 *     [10, 12, 12, 9, 7]
 *
 * See {@link Ext.sparkline.Base the base class} for a simple example.
 */

/**
 * @cfg {String} [targetColor=#f33]
 * The color of the vertical target marker.
 * @accessor
 */

/**
 * @cfg {Number} [targetWidth=3]
 * Width of the target bar in pixels.
 * @accessor
 */

/**
 * @cfg {String} [performanceColor=#33f]
 * The color of the performance measure horizontal bar.
 * @accessor
 */

/**
 * @cfg {String[]} [rangeColors=['#d3dafe','#a8b6ff','#7f94ff']]
 * An array of colors to use for each qualitative range background color.
 * @accessor
 */

/**
 * @cfg {Number} [base=null]
 * Set this to a number to change the base start number.
 * @accessor
 */
