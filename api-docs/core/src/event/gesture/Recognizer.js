/**
 * @class Ext.event.gesture.Recognizer
 * @extend Ext.Base
 *
 * A base class for all gesture recognizers.
 *
 * The following gestures are enabled by default in both Ext JS and Sencha Touch:
 *
 * * {@link Ext.event.gesture.Tap}
 * * {@link Ext.event.gesture.DoubleTap}
 * * {@link Ext.event.gesture.LongPress}
 * * {@link Ext.event.gesture.Drag}
 * * {@link Ext.event.gesture.Swipe}
 * * {@link Ext.event.gesture.Pinch}
 * * {@link Ext.event.gesture.Rotate}
 * * {@link Ext.event.gesture.EdgeSwipe}
 *
 * @abstract
 * @private
 */

/**
 * @property {Number} [priority=0]
 * The priority of the recognizer. Determines the order in which it recognizes gestures
 * relative to other recognizers.  The default recognizers use the following priorities:
 *
 * - Ext.event.gesture.Drag: 100
 * - Ext.event.gesture.Tap: 200
 * - Ext.event.gesture.DoubleTap: 300
 * - Ext.event.gesture.LongPress: 400
 * - Ext.event.gesture.EdgeSwipe: 500
 * - Ext.event.gesture.Swipe: 600
 * - Ext.event.gesture.Pinch: 700
 * - Ext.event.gesture.Rotate: 800
 */
