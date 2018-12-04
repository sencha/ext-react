/**
 * @class Ext.layout.Carousel
 * @extend Ext.layout.Auto
 * @alias layout.carousel
 * @private
 */

/**
 * @cfg {Number} [visibleChildren=1]
 * Number of children visible simultaneously
 * in the container.
 * @accessor
 */

/**
 * @cfg {Number} [frontIndex]
 * Index of the child considered "front", 0-based.
 *
 * Default value is calculated thusly: for layouts with odd number of
 * {@link #cfg!visibleChildren} the index is calculated to be the center item, for even
 * number of visible children the index is `visibleChildren / 2`.
 */

/**
 * @cfg {Boolean} [animation=true]
 * Set to `false` to disable animated transitions.
 */

/**
 * @cfg {Number} [duration=null]
 * Animated transition duration, in milliseconds.
 */

/**
 * @cfg {Number} [throttleDelay=50]
 * Timeout in milliseconds during which new
 * transitions are prohibited. This is used to avoid jagged animation.
 */
