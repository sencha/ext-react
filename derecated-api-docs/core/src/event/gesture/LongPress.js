/**
 * @class Ext.event.gesture.LongPress
 * @extend Ext.event.gesture.SingleTouch
 * A event recognizer which knows when you tap and hold for more than 1 second.
 */

/**
 * @member Ext.dom.Element
 * @event longpress
 * Fires when you touch and hold still for more than 1 second.
 * @param {Ext.event.Event} event The {@link Ext.event.Event} event encapsulating the DOM event.
 * @param {HTMLElement} node The target of the event.
 * @param {Object} options The options object passed to Ext.mixin.Observable.addListener.
 */

/**
 * @member Ext.dom.Element
 * @event taphold
 * @inheritdoc Ext.dom.Element#longpress
 */

/**
 * @member Ext.event.Event
 * @method startDrag
 *
 * Initiates a drag gesture in response to this event
 *
 * Only available when `type` is `'longpress'`.  When invoked a dragstart event
 * will be immediately fired at the coordinates of the longpress event.  Thereafter
 * drag events will fire in response to movement on the screen without regard
 * to the distance moved.
 */
