/**
 * @class Ext.event.Event
 * @extend Ext.Base
 *
 * Just as {@link Ext.dom.Element} wraps around a native DOM node, {@link Ext.event.Event}
 * wraps the browser's native event-object normalizing cross-browser differences such as
 * mechanisms to stop event-propagation along with a method to prevent default actions
 * from taking place.
 *
 * ## Recognizers
 *
 * Ext JS includes many default event recognizers to know when a user interacts with
 * the application.
 *
 * For a full list of default recognizers, and more information, please view the
 * {@link Ext.event.gesture.Recognizer} documentation.
 * 
 * This class also provides a set of constants for use with key events.  These are useful
 * for determining if a specific key was pressed, and are available both on instances,
 * and as static properties of the class.  The following two statements are equivalent:
 * 
 *     if (e.getKey() === Ext.event.Event.TAB) {
 *         // tab key was pressed
 *     }
 * 
 *     if (e.getKey() === e.TAB) {
 *         // tab key was pressed
 *     }
 */

/**
 * @property {Number} distance
 * The distance of the event.
 *
 * **This is only available when the event type is `swipe` and `pinch`.**
 */

/**
 * @property {HTMLElement} target
 * The element that fired this event.  For the element whose handlers are currently
 * being processed, i.e. the element that the event handler was attached to, use
 * `currentTarget`
 */

/**
 * @property {HTMLElement} currentTarget
 * Refers to the element the event handler was attached to, vs the `target`, which is
 * the actual element that fired the event.  For example, if the event bubbles, the
 * `target` element may be a descendant of the `currentTarget`, as the event may
 * have been triggered on the `target` and then bubbled up to the `currentTarget`
 * where it was handled.
 */

/**
 * @property {Number} button
 * Indicates which mouse button caused the event for mouse events, for example
 * `mousedown`, `click`, `mouseup`:
 * - `0` for left button.
 * - `1` for middle button.
 * - `2` for right button.
 *
 * *Note*: In IE8 & IE9, the `click` event does not provide the button.
 */

/**
 * @property {Number} pageX The browsers x coordinate of the event.
 * Note: this only works in browsers that support pageX on the native browser event
 * object (pageX is not natively supported in IE9 and earlier).  In Ext JS, for a
 * cross browser normalized x-coordinate use {@link #getX}
 */

/**
 * @property {Number} pageY The browsers y coordinate of the event.
 * Note: this only works in browsers that support pageY on the native browser event
 * object (pageY is not natively supported in IE9 and earlier).  In Ext JS, for a
 * cross browser normalized y-coordinate use {@link #getY}
 */

/**
 * @property {Boolean} ctrlKey
 * True if the control key was down during the event.
 * In Mac this will also be true when meta key was down.
 */

/**
 * @property {Boolean} altKey
 * True if the alt key was down during the event.
 */

/**
 * @property {Boolean} shiftKey
 * True if the shift key was down during the event.
 */

/**
 * @property {Event} browserEvent
 * The raw browser event which this object wraps.
 */

/**
 * @property {String} pointerType
 * The pointer type for this event. May be empty if the event was
 * not triggered by a pointer. Current available types are:
 * - `mouse`
 * - `touch`
 * - `pen`
 */

/**
 * @property {Boolean} [defaultPrevented=false]
 * Indicates whether or not {@link #preventDefault preventDefault()} was called on the event.
 */

/**
 * @property WHEEL_SCALE
 * The mouse wheel delta scaling factor. This value depends on browser version and OS and
 * attempts to produce a similar scrolling experience across all platforms and browsers.
 *
 * To change this value:
 *
 *      Ext.event.Event.prototype.WHEEL_SCALE = 72;
 *
 * @type Number
 */
