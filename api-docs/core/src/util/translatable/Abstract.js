/**
 * @class Ext.util.translatable.Abstract
 * @extend Ext.Evented
 * @mixin Ext.mixin.Factoryable
 * @private
 *
 * The abstract class. Sub-classes are expected, at the very least, to implement translation logics inside
 * the 'translate' method
 */

/**
 * @event animationstart
 * Fires whenever the animation is started
 * @param {Ext.util.translatable.Abstract} this
 * @param {Number} x The current translation on the x axis
 * @param {Number} y The current translation on the y axis
 */

/**
 * @event animationframe
 * Fires for each animation frame
 * @param {Ext.util.translatable.Abstract} this
 * @param {Number} x The new translation on the x axis
 * @param {Number} y The new translation on the y axis
 */

/**
 * @event animationend
 * Fires whenever the animation is ended
 * @param {Ext.util.translatable.Abstract} this
 * @param {Number} x The current translation on the x axis
 * @param {Number} y The current translation on the y axis
 */

/**
 * @property {Number} [x=0]
 * @private
 * The last translated x value
 */

/**
 * @property {Number} [y=0]
 * @private
 * The last translated y value
 */

/**
 * @method getPosition
 * Returns the translatable object's current position.
 * @return {Object} position An object with x and y properties
 */
