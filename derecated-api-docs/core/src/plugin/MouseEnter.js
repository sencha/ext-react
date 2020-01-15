/**
 * @class Ext.plugin.MouseEnter
 * @extend Ext.plugin.Abstract
 * @alias plugin.mouseenter
 * This plugin calls a callback whenever the mouse enters or leaves descendant
 * elements of its host component identified by a {@link Ext.plugin.MouseEnter#delegate delegate}
 * query selector string.
 *
 * This is useful for components which render arbitrary and transient child elements
 * such as DataViews and Charts. It allows notification of mousenter events from 
 * child nodes without having to add  listeners to each child element.
 */

/**
 * @cfg {Ext.dom.Element/String} [element="el"] The element, or component element reference
 * name to which to add the mouse listener.
 */

/**
 * @cfg {String} delegate A query selector string to identify descendant elements
 * which trigger a call to the handler.
 */

/**
 * @cfg {String/Function} handler A callback to invoke when a the mouse enters a
 * descendant delegate.
 * @cfg {Ext.event.Event} handler.e The `mouseover` event which triggered the mouse enter.
 * @cfg {HTMLElement} handler.target The delegate element into which the mouse just entered.
 */

/**
 * @cfg {String/Function} [leaveHandler] A callback to invoke when a the mouse leaves a
 * descendant delegate.
 * @cfg {Ext.event.Event} leaveHandler.e The `mouseover` event which triggered the mouse leave.
 * @cfg {HTMLElement} leaveHandler.target The delegate element which the mouse just left.
 */

/**
 * @cfg {Object} [scope] The scope (`this` pointer) in which to execute the callback(s).
 */

/**
 * @cfg {Number} [delay] The time in milliseconds to wait before processing the mouse event.
 * This can prevent unwanted processing when the user swipes the mouse rapidly across the component.
 */
