/**
 * @class Ext.chart.legend.SpriteLegend
 * @extend Ext.Base
 * @alias legend.sprite
 *
 * This class uses `Ext.draw.sprite.Sprite` to render the chart legend.
 *
 * The DOM legend is essentially a data view docked inside a draw container, which a chart is.
 * The sprite legend, on the other hand, is not a foreign entity in a draw container,
 * and is rendered in a draw surface with sprites, just like series and axes.
 *
 * This means that:
 *
 * * it is styleable with chart themes
 * * it shows up in chart preview and chart download
 * * it renders markers exactly as they are in the series
 * * it can't be styled with CSS
 * * it doesn't scroll, instead the items are grouped into columns,
 *   and the legend grows in size as the number of items increases
 *
 */

/**
 * @cfg {String} [docked='bottom']
 * The position of the legend in the chart.
 * Possible values: 'bottom' (default), 'top', 'left', 'right'.
 * @accessor
 */

/**
 * @cfg {Ext.chart.legend.store.Store} [store=null]
 * The {@link Ext.chart.legend.store.Store} to bind this legend to.
 * @accessor
 */

/**
 * @cfg {Ext.chart.AbstractChart} [chart=null]
 * The chart that the store belongs to.
 * @accessor
 */

/**
 * @cfg {Boolean} [toggleable=true]
 * `true` to allow series items to have their visibility
 * toggled by interaction with the legend items.
 * @accessor
 */

/**
 * @cfg {Number} [padding=10]
 * The padding amount between legend items and legend border.
 * @accessor
 */

/**
 * @cfg {Object} border
 * The border that goes around legend item sprites.
 * The type of the sprite is determined by this config,
 * while the styling comes from a theme {@link Ext.chart.theme.Base #legend}.
 * If both this config and the theme provide values for the
 * same configs, the values from this config are used.
 * The sprite class used a legend border should have the `isLegendBorder`
 * property set to true on the prototype. The legend border sprite
 * should also have the `x`, `y`, `width` and `height` attributes
 * that determine it's position and dimensions.
 * @accessor
 */

/**
 * @cfg {Object} [background=null]
 * Set the legend background. This can be a gradient object, image, or color. This
 * config works similarly to the {@link Ext.chart.AbstractChart#background} config.
 * @accessor
 */

/**
 * @cfg {Boolean} [hidden=false]
 * Toggles the visibility of the legend.
 * @accessor
 */
