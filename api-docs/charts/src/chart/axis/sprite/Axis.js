/**
 * @private
 * @class Ext.chart.axis.sprite.Axis
 * @extend Ext.draw.sprite.Sprite
 * @alias sprite.axis
 *
 * The axis sprite. Currently all types of the axis will be rendered with this sprite.
 */

/**
 * @cfg {Boolean} grid
 * 'true' if the axis has a grid.
 */

/**
 * @cfg {Boolean} axisLine
 * 'true' if the main line of the axis is drawn.
 */

/**
 * @cfg {Boolean} minorTicks
 * 'true' if the axis has sub ticks.
 */

/**
 * @cfg {Number} minorTickSize
 * The length of the minor ticks.
 */

/**
 * @cfg {Boolean} majorTicks
 * 'true' if the axis has major ticks.
 */

/**
 * @cfg {Number} majorTickSize
 * The length of the major ticks.
 */

/**
 * @cfg {Number} length
 * The total length of the axis.
 */

/**
 * @cfg {Number} dataMin
 * The minimum value of the axis data.
 */

/**
 * @cfg {Number} dataMax
 * The maximum value of the axis data.
 */

/**
 * @cfg {Number} visibleMin
 * The minimum value that is displayed.
 */

/**
 * @cfg {Number} visibleMax
 * The maximum value that is displayed.
 */

/**
 * @cfg {String} position
 * The position of the axis on the chart.
 */

/**
 * @cfg {Number} minStepSize
 * The minimum step size between ticks.
 */

/**
 * @cfg {Number} [textPadding=0]
 * The padding around axis labels to determine collision.
 * The default is 0 for all axes except horizontal axes of cartesian charts,
 * where the default is 5 to prevent axis labels from blending one into another.
 * This default is defined in the {@link Ext.chart.theme.Base#axis axis} config
 * of the {@link Ext.chart.theme.Base Base} theme.
 * You may want to change this default to a smaller number or 0, if you have
 * horizontal axis labels rotated, which allows for more text to fit in.
 */

/**
 * @cfg {Number} min
 * The minimum value of the axis.
 * `min` and {@link #max} attributes represent the effective range of the axis
 * after segmentation, layout, and range reconciliation between axes.
 */

/**
 * @cfg {Number} max
 * The maximum value of the axis.
 * {@link #min} and `max` attributes represent the effective range of the axis
 * after segmentation, layout, and range reconciliation between axes.
 */

/**
 * @cfg {Number} centerX
 * The central point of the angular axis on the x-axis.
 */

/**
 * @cfg {Number} centerY
 * The central point of the angular axis on the y-axis.
 */

/**
 * @cfg {Number} baseRotation
 * The starting rotation of the angular axis.
 */

/**
 * @cfg {Boolean} enlargeEstStepSizeByText
 * 'true' if the estimated step size is adjusted by text size.
 */

/**
 * @cfg {Object} [label=null]
 *
 * The label configuration object for the Axis. This object may include style attributes
 * like `spacing`, `padding`, `font` that receives a string or number and
 * returns a new string with the modified values.
 * @accessor
 */

/**
 * @cfg {Number} [labelOffset=10]
 * The distance between the label and the edge of a major tick.
 * Only applicable for 'gauge' and 'angular' axes.
 * @accessor
 */

/**
 * @cfg {Object|Ext.chart.axis.layout.Layout} [layout=null]
 * The layout configuration used by the axis.
 * @accessor
 */

/**
 * @cfg {Object|Ext.chart.axis.segmenter.Segmenter} [segmenter=null]
 * The method of segmenter used by the axis.
 * @accessor
 */

/**
 * @cfg {Function} [renderer=null]
 * Allows direct customisation of rendered axis sprites.
 * @accessor
 */

/**
 * @private
 * @cfg {Object} [layoutContext=null]
 * Stores the context after calculating layout.
 * @accessor
 */

/**
 * @cfg {Ext.chart.axis.Axis} [axis=null]
 * The axis represented by this sprite.
 * @accessor
 */
