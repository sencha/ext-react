/**
 * @class Ext.dataview.pullrefresh.PullRefresh
 * @extend Ext.plugin.Abstract
 * @alias plugin.pullrefresh
 * @mixins Ext.mixin.ConfigProxy
 *
 * This {@link Ext.Component#cfg!plugins plugin} adds pull to refresh functionality to the
 * {@link Ext.dataview.List list} component.
 */

/**
 * @cfg {String} lastUpdatedDateFormat
 * The format to be used on the last updated date.
 */

/**
 * @cfg {String} lastUpdatedText
 * The text to be shown in front of the last updated time.
 */

/**
 * @cfg {String} loadedText
 * The text that will be when data has been loaded.
 */

/**
 * @cfg {String} loadingText
 * The text that will be shown while the list is refreshing.
 */

/**
 * @cfg {String} pullText
 * The text that will be shown while you are pulling down.
 */

/**
 * @cfg {String} releaseText
 * The text that will be shown after you have pulled down enough to show the
 * release message.
 */

/**
 * @cfg {Boolean} [autoSnapBack=true]
 * Determines whether the pulldown should automatically snap back after data has
 * been loaded. If `false` call {@link #snapBack} to manually snap the pulldown back.
 */

/**
 * @cfg {Boolean} [mergeData=true]
 * `true` to insert new records into the store and to replace the data for
 * any incoming records that exist.
 *
 * `false` to completely overwrite store data with the fetched response.
 *
 * @since 6.2.1
 */

/**
 * @cfg {Boolean} [overlay=false]
 * `false` to move the list down to display the refresh indicator. `true` to float
 * the indicator over the top of the list with no movement.
 *
 * @since 6.2.1
 */

/**
 * @cfg {Number} [snappingAnimationDuration=300]
 * The duration for snapping back animation after the data has been refreshed
 */
