/**
 * @class Ext.util.ClickRepeater
 * @mixin Ext.mixin.Observable
 * A wrapper class which can be applied to any element. Fires a "click" event while the
 * mouse is pressed. The interval between firings may be specified in the config but
 * defaults to 20 milliseconds.
 *
 * Optionally, a CSS class may be applied to the element during the time it is pressed.
 */

/**
 * @event mousedown
 * Fires when the mouse button is depressed.
 * @param {Ext.util.ClickRepeater} this
 * @param {Ext.event.Event} e
 */

/**
 * @event click
 * Fires on a specified interval during the time the element is pressed.
 * @param {Ext.util.ClickRepeater} this
 * @param {Ext.event.Event} e
 */

/**
 * @event mouseup
 * Fires when the mouse key is released.
 * @param {Ext.util.ClickRepeater} this
 * @param {Ext.event.Event} e
 */
    
/**
 * @cfg {Ext.dom.Element} [el]
 * The element to listen for clicks/taps on.
 * @accessor
 */

/**
 * @cfg {Ext.Component} [target]
 * The Component who's encapsulating element to listen for clicks/taps on.
 * @accessor
 */

/**
 * @cfg {String/HTMLElement/Ext.dom.Element} el
 * The element to act as a button.
 */

/**
 * @cfg {String} pressedCls
 * A CSS class name to be applied to the element while pressed.
 */

/**
 * @cfg {Boolean} accelerate
 * True if autorepeating should start slowly and accelerate.
 * "interval" and "delay" are ignored.
 */

/**
 * @cfg {Number} [interval=20]
 * The interval between firings of the "click" event (in milliseconds).
 */

/**
 * @cfg {Number} [delay=250]
 * The initial delay before the repeating event begins firing.
 * Similar to an autorepeat key delay.
 */

/**
 * @cfg {Boolean} [preventDefault=true]
 * True to prevent the default click event
 */

/**
 * @cfg {Boolean} [stopDefault=false]
 * True to stop the default click event
 */

/**
* @cfg {Function/String} handler
* A function called when the menu item is clicked (can be used instead of {@link #click} event).
* @cfg {Ext.util.ClickRepeater} handler.clickRepeater This ClickRepeater.
* @cfg {Ext.event.Event} handler.e The underlying {@link Ext.event.Event}.
* @controllable
*/

/**
 * @cfg {Object} scope
 * The scope (`this` refeence) in which the configured {@link #handler} will be executed,
 * unless the scope is a ViewController method nmame.
 * @accessor
 */

/**
 * @method constructor
 * @constructor
 * Creates new ClickRepeater.
 * @param {Object} [config] Config object.
 */

