/**
 * @class Ext.dom.Shadow
 * @extend Ext.dom.Underlay
 * Simple class that can provide a shadow effect for any absolutely positioned {@link
 * Ext.dom.Element Element}.
 * 
 * Not meant to be used directly. To apply a shadow to an Element use the 
 * {@link Ext.dom.Element#enableShadow enableShadow} method.
 * 
 * @private
 */

/**
 * @cfg {String} [mode="drop"]
 * The shadow display mode.  Supports the following options:
 *
 * - sides : Shadow displays on both sides and bottom only
 * - frame : Shadow displays equally on all four sides
 * - drop : Traditional bottom-right drop shadow
 */

/**
 * @cfg {Number} [offset=4]
 * The number of pixels to offset the shadow from the element
 */

/**
 * @method constructor
 * @constructor
 * Creates new Shadow.
 * @param {Object} config (optional) Config object.
 */

/**
 * @property {Object} offsets The offsets used for positioning the shadow element
 * relative to its target element
 */

/**
 * @property {Object} outerOffsets Offsets that represent the union of the areas
 * of the target element and the shadow combined.  Used by Ext.dom.Element for
 * ensuring that the shim (if present) extends under the full area of both elements.
 */

/**
 * @method setOpacity
 * Sets the opacity of the shadow
 * @param {Number} opacity The opacity
 */
