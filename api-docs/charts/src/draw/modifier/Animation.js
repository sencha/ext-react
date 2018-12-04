/**
 * @class Ext.draw.modifier.Animation
 * @extend Ext.draw.modifier.Modifier
 * The Animation modifier.
 *
 * Sencha Charts allow users to use transitional animation on sprites. Simply set the duration
 * and easing in the animation modifier, then all the changes to the sprites will be animated.
 *
 * Also, you can use different durations and easing functions on different attributes by using
 * {@link #customDurations} and {@link #customEasings}.
 *
 * By default, an animation modifier will be created during the initialization of a sprite.
 * You can get the animation modifier of a sprite via its 
 * {@link Ext.draw.sprite.Sprite#method-getAnimation getAnimation} method.
 */

/**
 * @cfg {Function} easing
 * Default easing function.
 * @accessor
 */

/**
 * @cfg {Number} [duration=0]
 * Default duration time (ms).
 */

/**
 * @cfg {Object} [customEasings={}]
 *
 * Overrides the default easing function for defined attributes. E.g.:
 *
 *     // Assuming the sprite the modifier is applied to is a 'circle'.
 *     customEasings: {
 *         r: 'easeOut',
 *         'fillStyle,strokeStyle': 'linear',
 *         'cx,cy': function (p, n) {
 *             p = 1 - p;
 *             n = n || 1.616;
 *             return 1 - p * p * ((n + 1) * p - n);
 *         }
 *     }
 *
 * @accessor
 */

/**
 * @cfg {Object} [customDurations={}]
 *
 * Overrides the default duration for defined attributes. E.g.:
 *
 *     // Assuming the sprite the modifier is applied to is a 'circle'.
 *     customDurations: {
 *         r: 1000,
 *         'fillStyle,strokeStyle': 2000,
 *         'cx,cy': 1000
 *     }
 *
 * @accessor
 */
