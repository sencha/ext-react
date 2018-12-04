/**
 * @class Ext.event.gesture.DoubleTap
 * @extend Ext.event.gesture.SingleTouch
 * A simple event recognizer which knows when you double tap.
 */

/**
 * @cfg {Number} [moveDistance=8]
 * The maximum distance a touch can move without canceling recognition
 */

/**
 * @cfg {Number} [tapDistance=24]
 * The minimum distance the second tap can occur from the first tap and still
 * be considered a doubletap
 */

/**
 * @member Ext.dom.Element
 * @event singletap
 * Fires when there is a single tap.
 * @param {Ext.event.Event} event The {@link Ext.event.Event} event encapsulating the DOM event.
 * @param {HTMLElement} node The target of the event.
 * @param {Object} options The options object passed to Ext.mixin.Observable.addListener.
 */

/**
 * @member Ext.dom.Element
 * @event doubletap
 * Fires when there is a double tap.
 * @param {Ext.event.Event} event The {@link Ext.event.Event} event encapsulating the DOM event.
 * @param {HTMLElement} node The target of the event.
 * @param {Object} options The options object passed to Ext.mixin.Observable.addListener.
 */
