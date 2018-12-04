/**
 * @class Ext.util.Point
 * @extend Ext.util.Region
 * Represents a 2D point with x and y properties, useful for comparison and instantiation
 * from an event:
 *
 *     var point = Ext.util.Point.fromEvent(e);
 */

/**
 * @method translate
 * Alias for {@link #translateBy}
 * @inheritdoc Ext.util.Region#translateBy
 */

/**
 * @method fromEvent
 * Returns a new instance of {@link Ext.util.Point} based on the `pageX` / `pageY` values of the given event.
 * @static
 * @param {Event} e The event.
 * @return {Ext.util.Point}
 */

/**
 * @method fromTouch
 * Returns a new instance of {@link Ext.util.Point} based on the `pageX` / `pageY` values of the given touch.
 * @static
 * @param {Event} touch
 * @return {Ext.util.Point}
 */

/**
 * @method from
 * Returns a new point from an object that has `x` and `y` properties, if that object is not an instance
 * of {@link Ext.util.Point}. Otherwise, returns the given point itself.
 * @param {Object} object
 * @return {Ext.util.Point}
 */

/**
 * @method constructor
 * @constructor
 * Creates point on 2D plane.
 * @param {Number} [x=0] X coordinate.
 * @param {Number} [y=0] Y coordinate.
 */

/**
 * @method clone
 * Copy a new instance of this point.
 * @return {Ext.util.Point} The new point.
 */

/**
 * @method copyFrom
 * Copy the `x` and `y` values of another point / object to this point itself.
 * @param {Ext.util.Point/Object} point.
 * @return {Ext.util.Point} This point.
 */

/**
 * @method toString
 * Returns a human-eye-friendly string that represents this point,
 * useful for debugging.
 * @return {String} For example `Point[12,8]`.
 */

/**
 * @method equals
 * Compare this point and another point.
 * @param {Ext.util.Point/Object} point The point to compare with, either an instance
 * of {@link Ext.util.Point} or an object with `x` and `y` properties.
 * @return {Boolean} Returns whether they are equivalent.
 */

/**
 * @method isCloseTo
 * Returns `true` if the passed point is within a certain distance of this point.
 * @param {Ext.util.Point/Object} point The point to check with, either an instance
 * of {@link Ext.util.Point} or an object with `x` and `y` properties.
 * @param {Object/Number} threshold Can be either an object with `x` and `y` properties or a number.
 * @return {Boolean}
 */

/**
 * @method isContainedBy
 * Determines whether this Point contained by the passed Region, Component or element.
 * @param {Ext.util.Region/Ext.Component/Ext.dom.Element/HTMLElement} region
 * The rectangle to check that this Point is within.
 * @return {Boolean}
 */

/**
 * @method roundedEquals
 * Compare this point with another point when the `x` and `y` values of both points are rounded. For example:
 * [100.3,199.8] will equals to [100, 200].
 * @param {Ext.util.Point/Object} point The point to compare with, either an instance
 * of Ext.util.Point or an object with `x` and `y` properties.
 * @return {Boolean}
 */
