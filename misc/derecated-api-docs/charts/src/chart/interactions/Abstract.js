/**
 * @class Ext.chart.interactions.Abstract
 * @extend Ext.Base
 * @xtype interaction
 * Defines a common abstract parent class for all interactions.
 *
 */

/**
 * @cfg {Ext.chart.AbstractChart} [chart=null]
 * The chart that the interaction is bound.
 * @accessor
 */

/**
 * @cfg {Boolean} [enabled=true]
 * 'true' if the interaction is enabled.
 * @accessor
 */

/**
 * @cfg [throttleGap=0]
 * Android device is emerging too many events so if we re-render every frame it will take forever to finish a frame.
 * This throttle technique will limit the timespan between two frames.
 */
