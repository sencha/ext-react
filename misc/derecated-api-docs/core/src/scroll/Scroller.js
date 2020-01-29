/**
 * @class Ext.scroll.Scroller
 * @extend Ext.Evented
 * @alias scroller.scroller
 * @mixin Ext.mixin.Factoryable
 *
 * Ext.scroll.Scroller allows any element to have scrollable content, both on desktop and
 * touch-screen devices, and defines a set of useful methods for manipulating the scroll
 * position and controlling the scrolling behavior.
 */

/**
 * @event refresh
 * Fires whenever the Scroller is refreshed.
 * @param {Ext.scroll.Scroller} this
 */

/**
 * @event scrollstart
 * Fires whenever the scrolling is started.
 * @param {Ext.scroll.Scroller} this
 * @param {Number} x The current x position.
 * @param {Number} y The current y position.
 */

/**
 * @event scrollend
 * Fires whenever the scrolling is ended.
 * @param {Ext.scroll.Scroller} this
 * @param {Number} x The current x position.
 * @param {Number} y The current y position.
 * @param {Number} deltaX The change in x value.
 * @param {Number} deltaY The change in y value.
 */

/**
 * @event scroll
 * Fires whenever the Scroller is scrolled.
 * @param {Ext.scroll.Scroller} this
 * @param {Number} x The new x position.
 * @param {Number} y The new y position.
 * @param {Number} deltaX The change in x value.
 * @param {Number} deltaY The change in y value.
 */

/**
 * @cfg {String/HTMLElement/Ext.dom.Element} element
 * The element to make scrollable.
 * @accessor
 */

/**
 * @cfg {Boolean/String} [x=true]
 * - `true` or `'auto'` to enable horizontal auto-scrolling. In auto-scrolling mode
 * scrolling is only enabled when the {@link #element} has overflowing content.
 * - `false` to disable horizontal scrolling
 * - `'scroll'` to always enable horizontal scrolling regardless of content size.
 * @accessor
 */

/**
 * @cfg {Boolean/String} [y=true]
 * - `true` or `'auto'` to enable vertical auto-scrolling. In auto-scrolling mode
 * scrolling is only enabled when the {@link #element} has overflowing content.
 * - `false` to disable vertical scrolling
 * - `'scroll'` to always enable vertical scrolling regardless of content size.
 * @accessor
 */

/**
 * @cfg {Object} touchAction
 * Touch Action for the scroller's {@link #element}.
 *
 * For more details see {@link Ext.dom.Element#setTouchAction}
 * @accessor
 */

/**
 * @property create
 * @static
 * Creates and returns an appropriate Scroller instance for the current device.
 * @param {Object} config Configuration options for the Scroller
 * @return {Ext.scroll.Scroller}
 */
