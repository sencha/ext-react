/**
 * @class Ext.sparkline.TriState
 * @extend Ext.sparkline.BarBase
 * @alias widget.sparklinetristate
 *
 * Plots bars based upon "win"/"draw" or "lose" status of the input {@link #values} array. Positive values mean
 * a win, zero a draw, and negative a lose. 
 *
 * See {@link Ext.sparkline.Base the base class} for a simple example.
 */

/**
 * @cfg {Number} [barWidth=4]
 * The pixel width of each bar.
 * @accessor
 */

/**
 * @cfg {Number} [barSpacing=1]
 * The pixel spacing between each bar.
 * @accessor
 */

/**
 * @cfg {String} [posBarColor=#6f6]
 * The color for positive value bars.
 * @accessor
 */

/**
 * @cfg {String} [negBarColor=#f44]
 * The color for negative value bars.
 * @accessor
 */

/**
 * @cfg {String} [zeroBarColor=#999]
 * The color for zero value bars.
 * @accessor
 */

/**
 * @cfg {Object} [colorMap] An object that uses range specifiers as keys to
 * indicate bar color values for a range of values. A range specifier is
 * specified in the form `[number]:[number]`, which indicates start and end range.
 * Omitting either means an open ended range.
 *
 * For example, to render green bars on all values less than -1 and red on values
 * higher than 1, you would use:
 *
 *     colorMap: {
 *         // Open ended range, with max value -1
 *         ":-1": "green",
 *
 *         // Open ended range, with min value 1
 *         "1:": "red"
 *     }
 * @accessor
 */
