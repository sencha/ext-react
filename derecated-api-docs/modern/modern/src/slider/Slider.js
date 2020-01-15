/**
 * @class Ext.slider.Slider
 * @extend Ext.Component
 * @xtype slider
 *
 * Slider component used by Ext.field.Slider.
 */

/**
 * @event change
 * Fires when the value changes
 * @param {Ext.slider.Slider} this
 * @param {Ext.slider.Thumb} thumb The thumb being changed
 * @param {Number} newValue The new value
 * @param {Number} oldValue The old value
 */

/**
 * @event dragstart
 * Fires when the slider thumb starts a drag
 * @param {Ext.slider.Slider} this
 * @param {Ext.slider.Thumb} thumb The thumb being dragged
 * @param {Array} value The start value
 * @param {Ext.EventObject} e
 */

/**
 * @event drag
 * Fires when the slider thumb starts a drag
 * @param {Ext.slider.Slider} this
 * @param {Ext.slider.Thumb} thumb The thumb being dragged
 * @param {Ext.EventObject} e
 */

/**
 * @event dragend
 * Fires when the slider thumb starts a drag
 * @param {Ext.slider.Slider} this
 * @param {Ext.slider.Thumb} thumb The thumb being dragged
 * @param {Array} value The end value
 * @param {Ext.EventObject} e
 */

/**
 * @cfg {Object} thumbDefaults
 * The config object to factory {@link Ext.slider.Thumb} instances
 * @accessor
 */

/**
 * @cfg {Number} [increment=1]
 * The increment by which to snap each thumb when its value changes. Any
 * thumb movement will be snapped to the nearest value that is a multiple of
 * the increment (e.g. if increment is 10 and the user tries to move the thumb
 * to 67, it will be snapped to 70 instead)
 * @accessor
 */

/**
 * @cfg {Number/Number[]} [value=0]
 * The value(s) of this slider's thumbs. If you pass
 * a number, it will assume you have just 1 thumb.
 * @accessor
 */

/**
 * @cfg {Boolean} [valueIsArray=false]
 * If `false` the {@link #value} will be a number when a single value is given
 * (even if it's an array containing that single value), and an array,
 * when an array of values was given.
 *
 * If `true`, the {@link #value} will always be converted to an array.
 * @accessor
 */

/**
 * @cfg {Number} [minValue=0]
 * The lowest value any thumb on this slider can be set to.
 * @accessor
 */

/**
 * @cfg {Number} [maxValue=100]
 * The highest value any thumb on this slider can be set to.
 * @accessor
 */

/**
 * @cfg {Boolean} [allowThumbsOverlapping=false]
 * Whether or not to allow multiple thumbs to overlap each other.
 * Setting this to true guarantees the ability to select every possible value in between {@link #minValue}
 * and {@link #maxValue} that satisfies {@link #increment}
 * @accessor
 */

/**
 * @cfg {Boolean/Object} [animation=true]
 * The animation to use when moving the slider. Possible properties are:
 *
 * - duration
 * - easingX
 * - easingY
 *
 * @accessor
 */

/**
 * @cfg {Boolean} [readOnly=false]
 * Will make this field read only, meaning it cannot be changed from the user interface.
 *
 * @accessor
 */

/**
 * @cfg {Number/Number[]} values
 * Alias to {@link #value}
 */

