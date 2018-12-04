/**
 * @class Ext.util.Region
 * This class represents a rectangular region in X,Y space, and performs geometric
 * transformations or tests upon the region.
 *
 * This class may be used to compare the document regions occupied by elements.
 */

/**
 * @method getRegion
 * @static
 * Retrieves an Ext.util.Region for a particular element.
 * @param {String/HTMLElement/Ext.dom.Element} el An element ID, htmlElement or Ext.Element representing an element in the document.
 * @return {Ext.util.Region} region
 */

/**
 * @method from
 * @static
 * Creates a Region from a "box" Object which contains four numeric properties `top`, `right`, `bottom` and `left`.
 * @param {Object} o An object with `top`, `right`, `bottom` and `left` properties.
 * @return {Ext.util.Region} region The Region constructed based on the passed object
 */

/**
 * @method getAlignInfo
 * This function converts a legacy alignment string such as 't-b' into a
 * pair of edge, offset objects which describe the alignment points of
 * the two regions.
 *
 * So tl-br becomes {myEdge:'t', offset:0}, {otherEdge:'b', offset:100}
 *
 * This not only allows more flexibility in the alignment possibilities,
 * but it also resolves any ambiguity as to chich two edges are desired
 * to be adjacent if an anchor pointer is required.
 *
 * @param {String} align The align spec, eg `"tl-br"`
 * @param {Boolean} [rtl] Pass `true` to use RTL calculations.
 */

/**
 * @method constructor
 * @constructor
 * Creates a region from the bounding sides.
 * @param {Number} top The topmost pixel of the Region.
 * @param {Number} right The rightmost pixel of the Region.
 * @param {Number} bottom The bottom pixel of the Region.
 * @param {Number} left The leftmost pixel of the Region.
 */

/**
 * @method setPosition
 * Translates this Region to the specified position
 * @param {Number} x The new X position.
 * @param {Number} y The new Y position.
 * @returns {Ext.util.Region} This region after translation.
 */

/**
 * @method contains
 * Checks if this region completely contains the region or point that is passed in.
 * @param {Ext.util.Region/Ext.util.Point} region
 * @return {Boolean}
 */

/**
 * @method intersect
 * Checks if this region intersects the region passed in.
 * @param {Ext.util.Region} region
 * @return {Ext.util.Region/Boolean} Returns the intersected region or false if there is no intersection.
 */

/**
 * @method union
 * Returns the smallest region that contains the current AND targetRegion.
 * @param {Ext.util.Region} region
 * @return {Ext.util.Region} a new region
 */

/**
 * @method constrainTo
 * Modifies the current region to be constrained to the targetRegion.
 * @param {Ext.util.Region} targetRegion
 * @return {Ext.util.Region} this
 */

/**
 * @method adjust
 * Modifies the current region to be adjusted by offsets.
 * @param {Number} top Top offset
 * @param {Number} right Right offset
 * @param {Number} bottom Bottom offset
 * @param {Number} left Left offset
 * @return {Ext.util.Region} this
 */

/**
 * @method getOutOfBoundOffset
 * Get the offset amount of a point outside the region
 * @param {String} [axis]
 * @param {Ext.util.Point} [p] the point
 * @return {Ext.util.Offset}
 */

/**
 * @method getOutOfBoundOffsetX
 * Get the offset amount on the x-axis
 * @param {Number} p the offset
 * @return {Number}
 */

/**
 * @method getOutOfBoundOffsetY
 * Get the offset amount on the y-axis
 * @param {Number} p the offset
 * @return {Number}
 */

/**
 * @method isOutOfBound
 * Check whether the point / offset is out of bound
 * @param {String} [axis]
 * @param {Ext.util.Point/Number} [p] the point / offset
 * @return {Boolean}
 */

/**
 * @method isOutOfBoundX
 * Check whether the offset is out of bound in the x-axis
 * @param {Number} p the offset
 * @return {Boolean}
 */

/**
 * @method isOutOfBoundY
 * Check whether the offset is out of bound in the y-axis
 * @param {Number} p the offset
 * @return {Boolean}
 */

/**
 * @method alignTo
 * Returns the Region to which this rectangle should be moved in order to
 * have the desired alignment with the specified target while remaining within the
 * constraint.
 *
 * The `align` option can be one of these forms:
 *
 * - **Blank**: Defaults to aligning the region's top-left corner to the target's
 *   bottom-left corner ("tl-bl").
 * - **Two anchors**: If two values from the table below are passed separated by a dash,
 *   the first value is used as this region's anchor point, and the second value is
 *   used as the target's anchor point.
 * - **One anchor**: The passed anchor position is used as the target's anchor point.
 *   This region will position its top-left corner (tl) to that point.
 * - **Two edge/offset descriptors:** An edge/offset descriptor is an edge initial
 *   (`t`/`r`/`b`/`l`) followed by a percentage along that side. This describes a
 *   point to align with a similar point in the target. So `'t0-b0'` would be
 *   the same as `'tl-bl'`, `'l0-r50'` would place the top left corner of this item
 *   halfway down the right edge of the target item. This allows more flexibility
 *   and also describes which two edges are considered adjacent when positioning an anchor.
 *
 * If the `inside` option is passed, the Region will attempt to align as specified,
 * but the position will be adjusted to constrain to the `inside` Region if necessary.
 * Note that the Region being aligned might be swapped to align to a different position
 * than that specified in order to enforce the constraints. Following are all of the
 * supported anchor positions:
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
 *      var xy = comp.getRegion().alignTo({
 *          align: 't-b',  // align comp's top/center to el's bottom/center
 *          target: el.getRegion(),
 *          anchorSize: new Ext.util.Point(10, 10),
 *          inside: new Ext.util.Region(0, Ext.Element.getViewportWidth(), Ext.Element.getViewportHeight(), 0)
 *      });
 *
 * @param {Object} options The alignment options.
 * @param {Ext.util.Region} options.target The rectangle to which this rectangle
 * should align.
 * @param {String} [options.align=tl-bl] The alignment descriptor for positioning this
 * rectangle with respect to the `target`. See {@link Ext.util.Positionable#alignTo}.
 * Note that if the requested alignment results in violation of the `inside` constraint,
 * the result will be flipped align to the closest edge which conforms to the constraint.
 *
 * @param {Array/Ext.util.Position} [options.position] The position at which to place the
 * resulting region before being excluded from the target area and aligned to the closest
 * edge which allows conformity with any passed `inside` option. Used instead of the `align` option.
 * @param {Ext.util.Offset/Number[]} [options.offset] An offset by which to adjust the result.
 * @param {Ext.util.Offset/Number[]} [options.anchorSize] The width and height of any external anchor
 * element. This is used to calculate the true bounds of the Region inclusive of the anchor.
 * The `x` dimension is the height of the arrow in all orientations, and the `y` dimension
 * is the width of the baseline of the arrow in all dimensions.
 * If this option is used, and the returned region successfully clears the
 * bounds of the target, then the anchor region will be returned in the return value
 * as the `anchor` property. This will in turn have a `position` property which will
 * be `'top'`, `'left`, `'right'`, or `'bottom'`.
 * @param {Boolean} [options.overlap] Pass `true` to allow this rectangle to overlap
 * the target.
 * @param {Boolean} [options.rtl] Pass `true` to swap left/right alignment.
 * @param {Ext.util.Region/Ext.dom.Element} [options.inside] The rectangle to
 * which this rectangle is constrained.
 * @param {Number} [options.minHeight] Used when this Region is to be aligned directly
 * below or above  the target. Gives the option to reduce the height to fit in the
 * available space.
 * @param {Boolean} [options.axisLock] If `true`, then fallback on constraint violation will
 * only take place along the major align axis. That is, if `align: "l-r"` is being used, and
 * `axisLock: true` is used, then if constraints fail, only fallback to `r-l` is considered.
 * @return {Ext.util.Region} The Region that will align this rectangle. Note that if
 * a `minHeight` option was passed, and aligment is either above or below the target,
 * the Region might be reduced to fit within the space.
 */

/**
 * @method exclude
 * This method pushes the "other" Region out of this region via the shortest
 * translation. If an "inside" Region is passed, the exclusion also honours
 * that constraint.
 * @param {Region} other The Region to move so that it does not intersect this Region.
 * @param {Region} inside A Region into which the other Region must be constrained.
 * @param {Number} [minHeight] If passed, indicates that the height may be reduced up
 * to a point to fit the "other" region below or above the target but within the "inside" Region.
 * @param {Boolean} [allowX=true] Pass `false` to disallow translation along the X axis.
 * @param {Boolean} [allowY=true] Pass `false` to disallow translation along the Y axis.
 * @return {Number} The edge it is now aligned to, 0=top, 1=right, 2=bottom, 3=left.
 */

/**
 * @method copy
 * Create a copy of this Region.
 * @return {Ext.util.Region}
 */

/**
 * @method copyFrom
 * Copy the values of another Region to this Region
 * @param {Ext.util.Region} p The region to copy from.
 * @return {Ext.util.Region} This Region
 */

/**
 * @method translateBy
 * Translate this Region by the given offset amount
 * @param {Ext.util.Offset/Object} x Object containing the `x` and `y` properties.
 * Or the x value is using the two argument form.
 * @param {Number} y The y value unless using an Offset object.
 * @return {Ext.util.Region} this This Region
 */

/**
 * @method round
 * Round all the properties of this region
 * @return {Ext.util.Region} this This Region
 */

/**
 * @method equals
 * Check whether this region is equivalent to the given region
 * @param {Ext.util.Region} region The region to compare with
 * @return {Boolean}
 */

/**
 * @method getOffsetsTo
 * Returns the offsets of this region from the passed region or point.
 * @param {Ext.util.Region/Ext.util.Point} offsetsTo The region or point to get get
 * the offsets from.
 * @return {Object} The XY page offsets
 * @return {Number} return.x The x offset
 * @return {Number} return.y The y offset
 */
