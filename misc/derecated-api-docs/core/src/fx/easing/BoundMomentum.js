/**
 * @class Ext.fx.easing.BoundMomentum
 * @extend Ext.fx.easing.Abstract
 * @private
 *
 * This easing is typically used for {@link Ext.scroll.Scroller}. It's a combination of
 * {@link Ext.fx.easing.Momentum} and {@link Ext.fx.easing.Bounce}, which emulates deceleration when the animated element
 * is still within its boundary, then bouncing back (snapping) when it's out-of-bound.
 */

/**
 * @cfg {Object} [momentum=null]
 * A valid config object for {@link Ext.fx.easing.Momentum}
 * @accessor
 */

/**
 * @cfg {Object} [bounce=null]
 * A valid config object for {@link Ext.fx.easing.Bounce}
 * @accessor
 */

/**
 * @cfg {Number} [minVelocity=0.01]
 * The minimum velocity to end this easing
 * @accessor
 */

/**
 * @cfg {Number} [startVelocity=0]
 * The start velocity
 * @accessor
 */
