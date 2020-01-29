/**
 * @class Ext.event.gesture.Pinch
 * @extend Ext.event.gesture.MultiTouch
 * A event recognizer which knows when you pinch.
 */

/**
 * @member Ext.dom.Element
 * @event pinchstart
 * Fired once when a pinch has started.
 * @param {Ext.event.Event} event The {@link Ext.event.Event} event encapsulating the DOM event.
 * @param {HTMLElement} node The target of the event.
 * @param {Object} options The options object passed to Ext.mixin.Observable.addListener.
 */

/**
 * @member Ext.dom.Element
 * @event pinch
 * Fires continuously when there is pinching (the touch must move for this to be fired).
 * @param {Ext.event.Event} event The {@link Ext.event.Event} event encapsulating the DOM event.
 * @param {HTMLElement} node The target of the event.
 * @param {Object} options The options object passed to Ext.mixin.Observable.addListener.
 */

/**
 * @member Ext.dom.Element
 * @event pinchend
 * Fires when a pinch has ended.
 * @param {Ext.event.Event} event The {@link Ext.event.Event} event encapsulating the DOM event.
 * @param {HTMLElement} node The target of the event.
 * @param {Object} options The options object passed to Ext.mixin.Observable.addListener.
 */

/**
 * @property {Number} scale
 * The scape of a pinch event.
 *
 * **This is only available when the event type is `pinch`**
 * @member Ext.event.Event
 */
