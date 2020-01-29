/**
 * @class Ext.util.Positionable
 * @extend Ext.Base
 * This mixin provides a common interface for objects that can be positioned, e.g.
 * {@link Ext.Component Components} and {@link Ext.dom.Element Elements}
 * @private
 */

/**
 * @method getLocalX
 * Returns the x coordinate of this element reletive to its `offsetParent`.
 * @return {Number} The local x coordinate
 */

/**
 * @method getLocalXY
 * Returns the x and y coordinates of this element relative to its `offsetParent`.
 * @return {Number[]} The local XY position of the element
 */

/**
 * @method getLocalY
 * Returns the y coordinate of this element reletive to its `offsetParent`.
 * @return {Number} The local y coordinate
 */

/**
 * @method getX
 * Gets the current X position of the DOM element based on page coordinates.
 * @return {Number} The X position of the element
 */

/**
 * @method getXY
 * Gets the current position of the DOM element based on page coordinates.
 * @return {Number[]} The XY position of the element
 */

/**
 * @method getY
 * Gets the current Y position of the DOM element based on page coordinates.
 * @return {Number} The Y position of the element
 */

/**
 * @method setLocalX
 * Sets the local x coordinate of this element using CSS style. When used on an
 * absolute positioned element this method is symmetrical with {@link #getLocalX}, but
 * may not be symmetrical when used on a relatively positioned element.
 * @param {Number} x The x coordinate. A value of `null` sets the left style to 'auto'.
 * @return {Ext.util.Positionable} this
 */

/**
 * @method setLocalXY
 * Sets the local x and y coordinates of this element using CSS style. When used on an
 * absolute positioned element this method is symmetrical with {@link #getLocalXY}, but
 * may not be symmetrical when used on a relatively positioned element.
 * @param {Number/Array} x The x coordinate or an array containing [x, y]. A value of
 * `null` sets the left style to 'auto'
 * @param {Number} [y] The y coordinate, required if x is not an array. A value of
 * `null` sets the top style to 'auto'
 * @return {Ext.util.Positionable} this
 */

/**
 * @method setLocalY
 * Sets the local y coordinate of this element using CSS style. When used on an
 * absolute positioned element this method is symmetrical with {@link #getLocalY}, but
 * may not be symmetrical when used on a relatively positioned element.
 * @param {Number} y The y coordinate. A value of `null` sets the top style to 'auto'.
 * @return {Ext.util.Positionable} this
 */

/**
 * @method setX
 * Sets the X position of the DOM element based on page coordinates.
 * @param {Number} x The X position
 * @return {Ext.util.Positionable} this
 */

/**
 * @method setXY
 * Sets the position of the DOM element in page coordinates.
 * @param {Number[]} pos Contains X & Y [x, y] values for new position (coordinates
 * are page-based)
 * @return {Ext.util.Positionable} this
 */

/**
 * @method setY
 * Sets the Y position of the DOM element based on page coordinates.
 * @param {Number} y The Y position
 * @return {Ext.util.Positionable} this
 */

/**
 * @method alignTo
 * Aligns the element with another element relative to the specified anchor points. If
 * the other element is the document it aligns it to the viewport. The position
 * parameter is optional, and can be specified in any one of the following formats:
 *
 * - **Blank**: Defaults to aligning the element's top-left corner to the target's
 *   bottom-left corner ("tl-bl").
 * - **Two anchors**: If two values from the table below are passed separated by a dash,
 *   the first value is used as the element's anchor point, and the second value is
 *   used as the target's anchor point.
 * - **Two edge/offset descriptors:** An edge/offset descriptor is an edge initial
 *   (`t`/`r`/`b`/`l`) followed by a percentage along that side. This describes a
 *   point to align with a similar point in the target. So `'t0-b0'` would be
 *   the same as `'tl-bl'`, `'l0-r50'` would place the top left corner of this item
 *   halfway down the right edge of the target item. This allows more flexibility
 *   and also describes which two edges are considered adjacent when positioning a tip pointer.
 *
 * In addition to the anchor points, the position parameter also supports the "?"
 * character. If "?" is passed at the end of the position string, the element will
 * attempt to align as specified, but the position will be adjusted to constrain to
 * the viewport if necessary. Note that the element being aligned might be swapped to
 * align to a different position than that specified in order to enforce the viewport
 * constraints. Following are all of the supported anchor positions:
 *
 *      Value  Description
 *      -----  -----------------------------
 *      tl     The top left corner
 *      t      The center of the top edge
 *      tr     The top right corner
 *      l      The center of the left edge
 *      c      The center
 *      r      The center of the right edge
 *      bl     The bottom left corner
 *      b      The center of the bottom edge
 *      br     The bottom right corner
 *
 * Example Usage:
 *
 *     // align el to other-el using the default positioning
 *     // ("tl-bl", non-constrained)
 *     el.alignTo("other-el");
 *
 *     // align the top left corner of el with the top right corner of other-el
 *     // (constrained to viewport)
 *     el.alignTo("other-el", "tl-tr?");
 *
 *     // align the bottom right corner of el with the center left edge of other-el
 *     el.alignTo("other-el", "br-l?");
 *
 *     // align the center of el with the bottom left corner of other-el and
 *     // adjust the x position by -6 pixels (and the y position by 0)
 *     el.alignTo("other-el", "c-bl", [-6, 0]);
 *
 *     // align the 25% point on the bottom edge of this el
 *     // with the 75% point on the top edge of other-el.
 *     el.alignTo("other-el", 'b25-c75');
 *
 * @param {Ext.util.Positionable/HTMLElement/String} element The Positionable,
 * HTMLElement, or id of the element to align to.
 * @param {String} [position="tl-bl?"] The position to align to
 * @param {Number[]} [offsets] Offset the positioning by [x, y]
 * Element animation config object
 * @return {Ext.util.Positionable} this
 */

/**
 * @method getAlignToXY
 * Gets the x,y coordinates to align this element with another element. See
 * {@link #alignTo} for more info on the supported position values.
 * @param {Ext.util.Positionable/HTMLElement/String} alignToEl The Positionable,
 * HTMLElement, or id of the element to align to.
 * @param {String} [position="tl-bl?"] The position to align to
 * @param {Number[]} [offsets] Offset the positioning by [x, y]
 * @return {Number[]} [x, y]
 */

/**
 * @method getAnchorXY
 * Gets the x,y coordinates specified by the anchor position on the element.
 * @param {String} [anchor='tl'] The specified anchor position.
 * See {@link #alignTo} for details on supported anchor positions.
 * @param {Boolean} [local] True to get the local (element top/left-relative) anchor
 * position instead of page coordinates
 * @param {Object} [size] An object containing the size to use for calculating anchor
 * position {width: (target width), height: (target height)} (defaults to the
 * element's current size)
 * @return {Number[]} [x, y] An array containing the element's x and y coordinates
 */

/**
 * @method getBox
 * Return an object defining the area of this Element which can be passed to
 * {@link #setBox} to set another Element's size/location to match this element.
 *
 * @param {Boolean} [contentBox] If true a box for the content of the element is
 * returned.
 * @param {Boolean} [local] If true the element's left and top relative to its
 * `offsetParent` are returned instead of page x/y.
 * @return {Object} An object in the format
 * @return {Number} return.x The element's X position.
 * @return {Number} return.y The element's Y position.
 * @return {Number} return.width The element's width.
 * @return {Number} return.height The element's height.
 * @return {Number} return.bottom The element's lower bound.
 * @return {Number} return.right The element's rightmost bound.
 *
 * The returned object may also be addressed as an Array where index 0 contains the X
 * position and index 1 contains the Y position. The result may also be used for
 * {@link #setXY}
 */

/**
 * @method getConstrainRegion
 * Returns the content region of this element for purposes of constraining or clipping floating
 * children.  That is the region within the borders and scrollbars, but not within the padding.
 *
 * @return {Ext.util.Region} A Region containing "top, left, bottom, right" properties.
 */

/**
 * @method getConstrainVector
 * Returns the `[X, Y]` vector by which this Positionable's element must be translated to make a best
 * attempt to constrain within the passed constraint. Returns `false` if the element
 * does not need to be moved.
 *
 * Priority is given to constraining the top and left within the constraint.
 *
 * The constraint may either be an existing element into which the element is to be
 * constrained, or a {@link Ext.util.Region Region} into which this element is to be
 * constrained.
 *
 * By default, any extra shadow around the element is **not** included in the constrain calculations - the edges
 * of the element are used as the element bounds. To constrain the shadow within the constrain region, set the
 * `constrainShadow` property on this element to `true`.
 *
 * @param {Ext.util.Positionable/HTMLElement/String/Ext.util.Region} [constrainTo] The
 * Positionable, HTMLElement, element id, or Region into which the element is to be
 * constrained.
 * @param {Number[]} [proposedPosition] A proposed `[X, Y]` position to test for validity
 * and to produce a vector for instead of using the element's current position
 * @param {Number[]} [proposedSize] A proposed `[width, height]` size to constrain
 * instead of using the element's current size
 * @return {Number[]/Boolean} **If** the element *needs* to be translated, an `[X, Y]`
 * vector by which this element must be translated. Otherwise, `false`.
 */

/**
 * @method getOffsetsTo
 * Returns the offsets of this element from the passed element. The element must both
 * be part of the DOM tree and not have display:none to have page coordinates.
 * @param {Ext.util.Positionable/HTMLElement/String} offsetsTo The Positionable,
 * HTMLElement, or element id to get get the offsets from.
 * @return {Number[]} The XY page offsets (e.g. `[100, -200]`)
 */

/**
 * @method getRegion
 * Returns a region object that defines the area of this element.
 * @param {Boolean} [contentBox] If true a box for the content of the element is
 * returned.
 * @param {Boolean} [local] If true the element's left and top relative to its
 * `offsetParent` are returned instead of page x/y.
 * @return {Ext.util.Region} A Region containing "top, left, bottom, right" properties.
 */

/**
 * @method getClientRegion
 * Returns a region object that defines the client area of this element.
 *
 * That is, the area *within* any scrollbars.
 * @return {Ext.util.Region} A Region containing "top, left, bottom, right" properties.
 */

/**
 * @method getViewRegion
 * Returns the **content** region of this element. That is the region within the borders
 * and padding.
 * @return {Ext.util.Region} A Region containing "top, left, bottom, right" member data.
 */

/**
 * @method move
 * Move the element relative to its current position.
 * @param {String} direction Possible values are:
 *
 * - `"l"` (or `"left"`)
 * - `"r"` (or `"right"`)
 * - `"t"` (or `"top"`, or `"up"`)
 * - `"b"` (or `"bottom"`, or `"down"`)
 *
 * @param {Number} distance How far to move the element in pixels
 */

/**
 * @method setBox
 * Sets the element's box.
 * @param {Object} box The box to fill {x, y, width, height}
 * @return {Ext.util.Positionable} this
 */

/**
 * @method translatePoints
 * Translates the passed page coordinates into left/top css values for the element
 * @param {Number/Array} x The page x or an array containing [x, y]
 * @param {Number} [y] The page y, required if x is not an array
 * @return {Object} An object with left and top properties. e.g.
 * {left: (value), top: (value)}
 */
