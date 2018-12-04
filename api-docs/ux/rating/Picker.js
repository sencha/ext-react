/**
 * @class Ext.ux.rating.Picker
 * @extend Ext.Gadget
 * @xtype rating
 *
 * A ratings picker based on `Ext.Gadget`.
 */

/**
 * @cfg {String} [family="monospace"]
 * The CSS `font-family` to use for displaying the `{@link #glyphs}`.
 */

/**
 * @cfg {String/String[]/Number[]} [glyphs="☆★"]
 * Either a string containing the two glyph characters, or an array of two strings
 * containing the individual glyph characters or an array of two numbers with the
 * character codes for the individual glyphs.
 */

/**
 * @cfg {Number} [minimum=1]
 * The minimum allowed `{@link #value}` (rating).
 */

/**
 * @cfg {Number} [limit=5]
 * The maximum allowed `{@link #value}` (rating).
 */

/**
 * @cfg {String/Object} [overStyle]
 * Optional styles to apply to the rating glyphs when `{@link #trackOver}` is
 * enabled.
 */

/**
 * @cfg {Number} [rounding=1]
 * The rounding to apply to values. Common choices are 0.5 (for half-steps) or
 * 0.25 (for quarter steps).
 */

/**
 * @cfg {String} [scale="125%"]
 * The CSS `font-size` to apply to the glyphs. This value defaults to 125% because
 * glyphs in the stock font tend to be too small. When using specially designed
 * "icon fonts" you may want to set this to 100%.
 */

/**
 * @cfg {String/Object} [selectedStyle]
 * Optional styles to apply to the rating value glyphs.
 */

/**
 * @cfg {Object/String/String[]/Ext.XTemplate/Function} tip
 * A template or a function that produces the tooltip text. The `Object`, `String`
 * and `String[]` forms are converted to an `Ext.XTemplate`. If a function is given,
 * it will be called with an object parameter and should return the tooltip text.
 * The object contains these properties:
 *
 *   - component: The rating component requesting the tooltip.
 *   - tracking: The current value under the mouse cursor.
 *   - trackOver: The value of the `{@link #trackOver}` config.
 *   - value: The current value.
 *
 * Templates can use these properties to generate the proper text.
 */

/**
 * @cfg {Boolean} [trackOver=true]
 * Determines if mouse movements should temporarily update the displayed value.
 * The actual `value` is only updated on `click` but this rather acts as the
 * "preview" of the value prior to click.
 */

/**
 * @cfg {Number} value
 * The rating value. This value is bounded by `minimum` and `limit` and is also
 * adjusted by the `rounding`.
 */

/**
 * @cfg {Boolean/Object} [animate=false]
 * Specifies an animation to use when changing the `{@link #value}`. When setting
 * this config, it is probably best to set `{@link #trackOver}` to `false`.
 * @accessor
 */
