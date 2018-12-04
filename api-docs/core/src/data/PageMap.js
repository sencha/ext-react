/**
 * @class Ext.data.PageMap
 * @extend Ext.util.LruCache
 * Private class for use by only Store when configured `buffered: true`.
 * @private
 */

/**
 * @cfg {Number} [pageSize=0]
 * The size of pages in this map.
 * @accessor
 */

/**
 * @cfg {String} [rootProperty=""]
 * The root property to use for aggregation, filtering and sorting. By default
 * this is `null` but when containing things like {@link Ext.data.Model records}
 * this config would likely be set to "data" so that property names are applied
 * to the fields of each record.
 * @accessor
 */

/**
 * @method findBy
 * Returns the first record in this page map which elicits a true return value from the
 * passed selection function.
 *
 * **IMPORTANT
 * This can ONLY find records which happen to be cached in the page cache. This will be parts of the dataset around the currently
 * visible zone, or recently visited zones if the pages have not yet been purged from the cache.
 *
 * This CAN NOT find records which have not been loaded into the cache.**
 *
 * If full client side searching is required, do not use a buffered store, instead use a regular, fully loaded store and
 * use the {@link Ext.grid.plugin.BufferedRenderer BufferedRenderer} plugin to minimize DOM footprint.
 * @param {Function} fn The selection function to execute for each item.
 * @param {Mixed} fn.rec The record.
 * @param {Mixed} fn.index The index in the total dataset of the record.
 * @param {Object} [scope] The scope (`this` reference) in which the function is executed. Defaults to this PageMap.
 * @return {Object} The first record in this page map which returned true from the selection
 * function, or null if none was found.
 */

/**
 * @method findIndexBy
 * Returns the index *in the whole dataset* of the first record in this page map which elicits a true return value from the
 * passed selection function.
 *
 * **IMPORTANT
 * This can ONLY find records which happen to be cached in the page cache. This will be parts of the dataset around the currently
 * visible zone, or recently visited zones if the pages have not yet been purged from the cache.
 *
 * This CAN NOT find records which have not been loaded into the cache.**
 *
 * If full client side searching is required, do not use a buffered store, instead use a regular, fully loaded store and
 * use the {@link Ext.grid.plugin.BufferedRenderer BufferedRenderer} plugin to minimize DOM footprint.
 * @param {Function} fn The selection function to execute for each item.
 * @param {Mixed} fn.rec The record.
 * @param {Mixed} fn.index The index in the total dataset of the record.
 * @param {Object} [scope] The scope (`this` reference) in which the function is executed. Defaults to this PageMap.
 * @return {Number} The index first record in this page map which returned true from the selection
 * function, or -1 if none was found.
 */

