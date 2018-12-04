/**
 * @class Ext.dom.Underlay
 * @extend Ext.Base
 *
 * A class that provides an underlay element which displays behind an absolutely positioned
 * target element and tracks its size and position. Abstract base class for
 * {@link Ext.dom.Shadow} and {@link Ext.dom.Shim}
 *  
 * 
 * @private
 * @abstract
 */

/**
 * @cfg {Ext.dom.Element} target
 * The target element
 */

/**
 * @cfg {Number} zIndex
 * The CSS z-index to use for this underlay.  Defaults to the z-index of {@link #target}.
 */

/**
 * @method hide
 * Hides the underlay
 */

/**
 * @method realign
 * Aligns the underlay to its target element
 * @param {Number} [x] The x position of the target element.  If not provided, the
 * x position will be read from the DOM.
 * @param {Number} [y] The y position of the target element.  If not provided, the
 * y position will be read from the DOM.
 * @param {Number} [width] The width of the target element.  If not provided, the
 * width will be read from the DOM.
 * @param {Number} [height] The height of the target element.  If not provided, the
 * height will be read from the DOM.
 */

/**
 * @method setZIndex
 * Adjust the z-index of this underlay
 * @param {Number} zIndex The new z-index
 */

/**
 * @method show
 * Shows the underlay
 */
