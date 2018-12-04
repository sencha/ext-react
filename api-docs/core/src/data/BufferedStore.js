/**
 * @class Ext.data.BufferedStore
 * @extend Ext.data.ProxyStore
 * @alias store.buffered
 *
 * A BufferedStore maintains a sparsely populated map of pages corresponding to an extremely large server-side dataset.
 *
 * **Note:** Buffered Stores are not available in the modern toolkit. Instead use
 * `Ext.data.virtual.Store`.
 *
 * Use a BufferedStore when the dataset size is so large that the database and network latency, and client memory requirements
 * preclude caching the entire dataset in a regular {@link Ext.data.Store Store}.
 *
 * When using a BufferedStore *not all of the dataset is present in the client*. Only pages which have been
 * requested by the UI (usually a {@link Ext.grid.Panel GridPanel}) and surrounding pages will be present. Retention
 * of viewed pages in the BufferedStore after they have been scrolled out of view is configurable. See {@link #leadingBufferZone},
 * {@link #trailingBufferZone} and {@link #purgePageCount}.
 *
 * To use a BufferedStore, initiate the loading process by loading the first page. The number of rows rendered are
 * determined automatically, and the range of pages needed to keep the cache primed for scrolling is
 * requested and cached.
 * Example:
 *
 *     myBufferedStore.loadPage(1); // Load page 1
 *
 * A {@link Ext.grid.plugin.BufferedRenderer BufferedRenderer} is instantiated which will monitor the scrolling in the grid, and
 * refresh the view's rows from the page cache as needed. It will also pull new data into the page
 * cache when scrolling of the view draws upon data near either end of the prefetched data.
 *
 * The margins which trigger view refreshing from the prefetched data are {@link Ext.grid.plugin.BufferedRenderer#numFromEdge},
 * {@link Ext.grid.plugin.BufferedRenderer#leadingBufferZone} and {@link Ext.grid.plugin.BufferedRenderer#trailingBufferZone}.
 *
 * The margins which trigger loading more data into the page cache are, {@link #leadingBufferZone} and
 * {@link #trailingBufferZone}.
 *
 * By default, only 5 pages of data (in addition to the pages which over the visible region) are cached in the page cache,
 * with old pages being evicted from the cache as the view moves down through the dataset. This is controlled by the
 * {@link #purgePageCount} setting.
 *
 * Setting this value to zero means that no pages are *ever* scrolled out of the page cache, and
 * that eventually the whole dataset may become present in the page cache. This is sometimes desirable
 * as long as datasets do not reach astronomical proportions.
 *
 * Selection state may be maintained across page boundaries by configuring the SelectionModel not to discard
 * records from its collection when those Records cycle out of the Store's primary collection. This is done
 * by configuring the SelectionModel like this:
 *
 *     selModel: {
 *         pruneRemoved: false
 *     }
 *
 */

/**
 * @property {Boolean} [isBufferedStore=true]
 * `true` in this class to identify an object as an instantiated BufferedStore, or subclass thereof.
 */

/**
 * @cfg {Number} [purgePageCount=5]
 *
 * The number of pages *in addition to twice the required buffered range* to keep
 * in the prefetch cache before purging least recently used records.
 *
 * For example, if the height of the view area and the configured
 * {@link #trailingBufferZone} and {@link #leadingBufferZone} require that there
 * are three pages in the cache, then a `purgePageCount` of 5 ensures that up to
 * 11 pages can be in the page cache any any one time. This is enough to allow the
 * user to scroll rapidly between different areas of the dataset without evicting
 * pages which are still needed.
 *
 * A value of 0 indicates to never purge the pre-fetched data.
 * @accessor
 */

/**
 * @cfg {Number} [trailingBufferZone=25]
 * The number of extra records to keep cached on the trailing side of scrolling
 * buffer as scrolling proceeds. A larger number means fewer replenishments from
 * the server.
 * @accessor
 */

/**
 * @cfg {Number} [leadingBufferZone=200]
 * The number of extra rows to keep cached on the leading side of scrolling buffer
 * as scrolling proceeds. A larger number means fewer replenishments from the server.
 * @accessor
 */

/**
 * @cfg [trackRemoved=false]
 * @inheritdoc
 * @accessor
 */

/**
 * @method applyData
 * We are using applyData so that we can return nothing and prevent the `this.data`
 * property to be overridden.
 * @param {Array/Object} data
 */

/**
 * @method getById
 * Get the Record with the specified id.
 *
 * This method is not affected by filtering, lookup will be performed from all records
 * inside the store, filtered or not.
 *
 * @param {Mixed} id The id of the Record to find.
 * @return {Ext.data.Model} The Record with the passed id. Returns null if not found.
 */

/**
 * @method getAt
 * @inheritdoc
 */

/**
 * @method contains
 * @inheritdoc
 */

/**
 * @method indexOf
 * Get the index of the record within the store.
 *
 * When store is filtered, records outside of filter will not be found.
 *
 * @param {Ext.data.Model} record The Ext.data.Model object to find.
 * @return {Number} The index of the passed Record. Returns -1 if not found.
 */

/**
 * @method indexOfId
 * Get the index within the store of the Record with the passed id.
 *
 * Like #indexOf, this method is effected by filtering.
 *
 * @param {String} id The id of the Record to find.
 * @return {Number} The index of the Record. Returns -1 if not found.
 */

/**
 * @method getPageFromRecordIndex
 * Determines the page from a record index
 * @param {Number} index The record index
 * @return {Number} The page the record belongs to
 */

/**
 * @method prefetch
 * Pre-fetches data into the store using its configured {@link #proxy}.
 * @param {Object} options (Optional) config object, passed into the Ext.data.operation.Operation object before loading.
 * See {@link #method-load}
 */

/**
 * @method prefetchPage
 * Pre-fetches a page of data.
 * @param {Number} page The page to prefetch
 * @param {Object} options (Optional) config object, passed into the Ext.data.operation.Operation object before loading.
 * See {@link #method-load}
 */

/**
 * @method prefetchRange
 * Ensures that the specified range of rows is present in the cache.
 *
 * Converts the row range to a page range and then only load pages which are not already
 * present in the page cache.
 * @param start
 * @param end
 */
