/**
 * @class Ext.field.SingleSlider
 * @extend Ext.field.Slider
 * @xtype singlesliderfield
 *
 * The slider is a way to allow the user to select a value from a given numerical
 * range. You might use it for choosing
 */

/**
 * @event change
 * Fires when the value changes.
 * @param {Ext.field.Slider} me
 * @param {Number} newValue The new value.
 * @param {Number} oldValue The old value.
 */

/**
 * @event dragchange
 * Fires when the value changes via drag.
 * @param {Ext.field.Slider} me
 * @param {Ext.slider.Slider} sl Slider Component.
 * @param {Number} newValue The new value.
 * @param {Number} oldValue The old value.
 */

/**
 * @event dragstart
 * Fires when the slider thumb starts a drag operation.
 * @param {Ext.field.Slider} this
 * @param {Ext.slider.Slider} sl Slider Component.
 * @param {Ext.slider.Thumb} thumb The thumb being dragged.
 * @param {Array} value The start value.
 * @param {Ext.event.Event} e
 */

/**
 * @event drag
 * Fires when the slider thumb starts a drag operation.
 * @param {Ext.field.Slider} this
 * @param {Ext.slider.Slider} sl Slider Component.
 * @param {Ext.slider.Thumb} thumb The thumb being dragged.
 * @param {Ext.event.Event} e
 */

/**
 * @event dragend
 * Fires when the slider thumb ends a drag operation.
 * @param {Ext.field.Slider} this
 * @param {Ext.slider.Slider} sl Slider Component.
 * @param {Ext.slider.Thumb} thumb The thumb being dragged.
 * @param {Array} value The end value.
 * @param {Ext.event.Event} e
 */

/**
 * @cfg value
 * @inheritdoc Ext.slider.Slider#cfg-value
 * @accessor
 */
