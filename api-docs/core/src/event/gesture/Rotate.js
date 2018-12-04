/**
 * @class Ext.event.gesture.Rotate
 * @extend Ext.event.gesture.MultiTouch
 * A simple event recognizer which knows when you rotate.
 */

/**
 * @member Ext.dom.Element
 * @event rotatestart
 * Fired once when a rotation has started.
 * @param {Ext.event.Event} event The {@link Ext.event.Event} event encapsulating the DOM event.
 * @param {HTMLElement} node The target of the event.
 * @param {Object} options The options object passed to Ext.mixin.Observable.addListener.
 */

/**
 * @member Ext.dom.Element
 * @event rotate
 * Fires continuously when there is rotation (the touch must move for this to be fired).
 * When listening to this, ensure you know about the {@link Ext.event.Event#angle} and
 * {@link Ext.event.Event#rotation} properties in the `event` object.
 * @param {Ext.event.Event} event The {@link Ext.event.Event} event encapsulating the DOM event.
 * @param {HTMLElement} node The target of the event.
 * @param {Object} options The options object passed to Ext.mixin.Observable.addListener.
 */

/**
 * @member Ext.dom.Element
 * @event rotateend
 * Fires when a rotation event has ended.
 * @param {Ext.event.Event} event The {@link Ext.event.Event} event encapsulating the DOM event.
 * @param {HTMLElement} node The target of the event.
 * @param {Object} options The options object passed to Ext.mixin.Observable.addListener.
 */

/**
 * @property {Number} angle
 * The angle of the rotation.
 *
 * **This is only available when the event type is `rotate`**
 * @member Ext.event.Event
 */

/**
 * @property {Number} rotation
 * A amount of rotation, since the start of the event.
 *
 * **This is only available when the event type is `rotate`**
 * @member Ext.event.Event
 */
