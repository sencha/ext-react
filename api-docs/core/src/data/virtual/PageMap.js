/**
 * @class Ext.data.virtual.PageMap
 * @extend Ext.Base
 *
 * This class manages a sparse collection of `Page` objects keyed by their page number.
 * Pages are lazily created on request by the `getPage` method.
 *
 * When pages are locked, they are scheduled to be loaded. The loading is prioritized by
 * the type of lock held on the page. Pages with "active" locks are loaded first while
 * those with "prefetch" locks are loaded only when no "active" locked pages are in the
 * queue.
 *
 * The value of the `concurrentLoading` config controls the maximum number of simultaneously
 * pending, page load requests.
 *
 * @private
 * @since 6.5.0
 */

/**
 * @cfg {Number} [cacheSize=10]
 * The number of pages to retain in the `cache`.
 * @accessor
 */

/**
 * @cfg {Number} [concurrentLoading=1]
 * The maximum number of simultaneous load requests that should be made to the
 * server for pages.
 * @accessor
 */

/**
 * @cfg pageCount
 * The number of pages in the data set.
 * @accessor
 */

/**
 * @property {Object} byId
 * A map of records by their `idProperty`.
 */

/**
 * @property {Object} byInternalId
 * A map of records by their `internalId`.
 */

/**
 * @property {Object} indexMap
 * A map of record indices by their `internalId`.
 */

/**
 * @property {Ext.data.virtual.Page[]} loading
 * The array of currently loading pages.
 */

/**
 * @property {Object} loadQueues
 * A collection of loading queues keyed by the lock state.
 * @property {Ext.data.virtual.Page[]} loadQueues.active The queue of pages to
 * load that have an "active" lock state.
 * @property {Ext.data.virtual.Page[]} loadQueues.prefetch The queue of pages to
 * load that have a "prefetch" lock state.
 */
