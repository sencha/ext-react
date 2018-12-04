/**
 * @class Ext.viewport.Default
 * @extend Ext.Container
 * @xtype viewport
 * @private
 * Base class for iOS and Android viewports.
 */

/**
 * @event ready
 * Fires when the Viewport is in the DOM and ready.
 * @param {Ext.Viewport} this
 */

/**
 * @event maximize
 * Fires when the Viewport is maximized.
 * @param {Ext.Viewport} this
 */

/**
 * @event orientationchange
 * Fires when the Viewport orientation has changed.
 * @param {Ext.Viewport} this
 * @param {String} newOrientation The new orientation.
 * @param {Number} width The width of the Viewport.
 * @param {Number} height The height of the Viewport.
 */

/**
 * @cfg {Boolean} [preventZooming=false]
 * `true` to attempt to stop zooming when you double tap on the screen on mobile devices,
 * typically HTC devices with HTC Sense UI.
 * @accessor
 */

/**
 * @property {Boolean} [isReady=false]
 * `true` if the DOM is ready.
 */
