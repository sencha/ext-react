/**
 * @class Ext.chart.sprite.Label
 * @extend Ext.draw.sprite.Text
 *
 * Sprite used to represent labels in series.
 *
 * Important: the actual default values are determined by the theme used.
 * Please see the `label` config of the {@link Ext.chart.theme.Base#axis}.
 */
/**
 * @cfg {Object} animation Animation configuration.
 * @accessor
 */

/**
 * @cfg {Boolean|Object} [calloutLine=true]
 *
 * True to draw a line between the label and the chart with the default settings,
 * or an Object that defines the 'color', 'width' and 'length' properties of the line.
 * This config is only applicable when the label is displayed outside the chart.
 * @accessor
 */

/**
 * @cfg {Number} [hideLessThan=20]
 * Hides labels for pie slices with segment length less than this value (in pixels).
 * @accessor
 */
