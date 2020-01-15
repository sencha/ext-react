/**
 * @class Ext.event.gesture.Swipe
 * @extend Ext.event.gesture.SingleTouch
 * A gesture recognizer for swipe events
 */

/**
 * @member Ext.dom.Element
 * @event swipe
 * Fires when there is a swipe
 * When listening to this, ensure you know about the {@link Ext.event.Event#direction} property in the `event` object.
 * @param {Ext.event.Event} event The {@link Ext.event.Event} event encapsulating the DOM event.
 * @param {HTMLElement} node The target of the event.
 * @param {Object} options The options object passed to Ext.mixin.Observable.addListener.
 */

/**
 * @property {Number} direction
 * The direction of the swipe. Available options are:
 *
 * - up
 * - down
 * - left
 * - right
 *
 * **This is only available when the event type is `swipe`**
 * @member Ext.event.Event
 */

/**
 * @property {Number} duration
 * The duration of the swipe.
 *
 * **This is only available when the event type is `swipe`**
 * @member Ext.event.Event
 */
