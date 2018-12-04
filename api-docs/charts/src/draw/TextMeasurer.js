/**
 * @class Ext.draw.TextMeasurer
 * @extend Ext.Base
 * @singleton
 * Utility class to provide a way to *approximately* measure the dimension of text
 * without a drawing context.
 */

/**
 * @cfg {Boolean} [precise=false]
 * This singleton tries not to make use of the Ext.util.TextMetrics because it is
 * several times slower than TextMeasurer's own solution. TextMetrics is more precise
 * though, so if you have a case where the error is too big, you may want to set
 * this config to `true` to get perfect results at the expense of performance.
 * Note: defaults to `true` in IE8.
 */
