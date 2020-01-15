/**
 * @class Ext.chart.navigator.Navigator
 * @extend Ext.chart.navigator.NavigatorBase
 *
 * The Navigator component is used to visually set the visible range of the x-axis
 * of a cartesian chart.
 *
 * This component is meant to be used with the Navigator Container
 * via its {@link Ext.chart.navigator.Container#navigator} config.
 *
 * IMPORTANT: even though the Navigator component is a kind of chart, it should not be
 * treated as such. Correct behavior is not guaranteed when using hidden/private configs.
 */

/**
 * @cfg {'bottom'/'top'} [docked='bottom']
 * @accessor
 */

/**
 * @cfg {String} [axis=null]
 * The ID of the {@link #chart chart's} axis to link to.
 * The axis should be positioned to 'bottom' or 'top' in the chart.
 * @accessor
 */

/**
 * @cfg {Number} [tolerance=20]
 * The maximum horizontal delta between the pointer/finger and the center of a navigator thumb.
 * Used for hit testing.
 * @accessor
 */

/**
 * @cfg {Number} [minimum=0.8]
 * The start of the visible range, where the visible range is a [0, 1] interval.
 * @accessor
 */

/**
 * @cfg {Number} [maximum=1]
 * The end of the visible range, where the visible range is a [0, 1] interval.
 * @accessor
 */

/**
 * @cfg {Number} [thumbGap=30]
 * Minimum gap between navigator thumbs in pixels.
 * @accessor
 */

/**
 * @cfg {Number} [height=75]
 * The height of the navigator component.
 * @accessor
 */

/**
 * @cfg flipXY
 * @hide
 */

/**
 * @cfg series
 * @hide
 */

/**
 * @cfg axes
 * @hide
 */

/**
 * @cfg store
 * @hide
 */

/**
 * @cfg legend
 * @hide
 */

/**
 * @cfg interactions
 * @hide
 */

/**
 * @cfg highlightItem
 * @hide
 */

/**
 * @cfg theme
 * @hide
 */

/**
 * @cfg innerPadding
 * @hide
 */

/**
 * @cfg insetPadding
 * @hide
 */
