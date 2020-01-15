/**
 * @class Ext.d3.legend.Color
 * @extend Ext.d3.legend.Legend
 * The `Ext.d3.legend.Color` is designed to work with the {@link Ext.d3.axis.Color Color} axis
 * and present the range of its possible values in various ways.
 */

/**
 * @cfg {Ext.d3.axis.Color} [axis=null]
 * The color axis that this legend represents.
 * @accessor
 */

/**
 * @cfg {Object} items
 * @cfg {Number} items.count The number of legend items to use to represent
 * the range of possible values of the color axis scale.
 * This config makes use of the `ticks` method of the color axis
 * scale. Please see the method's [documentation](https://github.com/d3/d3-3.x-api-reference/blob/master/Quantitative-Scales.md#user-content-linear_ticks)
 * for more info.
 * This number is only a hint, the actual number may be different.
 * @cfg {Number[]} items.slice Arguments to the Array's `slice` method.
 * For example, to skip the first legend item use the value of `[1]`,
 * to skip the first and last item: `[1, -1]`.
 * @cfg {Boolean} items.reverse Set to `true` to reverse the order of items in the legend.
 * Note: the slicing of items happens before the order is reversed.
 * @cfg {Object} items.size The size of a single legend item.
 * @cfg {Number} items.size.x The width of a legend item.
 * @cfg {Number} items.size.y The height of a legend item.
 * @accessor
 */
