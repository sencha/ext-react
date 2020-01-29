/**
 * @class Ext.data.AbstractStore
 * @extend Ext.Base
 * @mixins Ext.mixin.Observable
 * @mixins Ext.mixin.Factoryable
 *
 * AbstractStore is a superclass of {@link Ext.data.ProxyStore} and {@link Ext.data.ChainedStore}. It's never used directly,
 * but offers a set of methods used by both of those subclasses.
 *
 * We've left it here in the docs for reference purposes, but unless you need to make a whole new type of Store, what
 * you're probably looking for is {@link Ext.data.Store}.
 */

/**
 * @cfg {Object[]/Function[]} [filters=null]
 * Array of {@link Ext.util.Filter Filters} for this store. Can also be passed array of
 * functions which will be used as the {@link Ext.util.Filter#filterFn filterFn} config
 * for filters:
 *
 *     filters: [
 *         function(item) {
 *             return item.weight > 0;
 *         }
 *     ]
 *
 * Individual filters can be specified as an `Ext.util.Filter` instance, a config
 * object for `Ext.util.Filter` or simply a function that will be wrapped in a
 * instance with its {@Ext.util.Filter#filterFn filterFn} set.
 *
 * For fine grain control of the filters collection, call `getFilters` to return
 * the `Ext.util.Collection` instance that holds this store's filters.
 *
 *      var filters = store.getFilters(); // an Ext.util.FilterCollection
 *
 *      function legalAge (item) {
 *          return item.age >= 21;
 *      }
 *
 *      filters.add(legalAge);
 *
 *      //...
 *
 *      filters.remove(legalAge);
 *
 * Any changes to the `filters` collection will cause this store to adjust
 * its items accordingly.
 * @accessor
 */

/**
 * @cfg {Boolean} [autoDestroy=undefined]
 * When a Store is used by only one {@link Ext.view.View DataView}, and should
 * only exist for the lifetime of that view, then configure the autoDestroy flag
 * as `true`. This causes the destruction of the view to trigger the destruction of its Store.
 * @accessor
 */

/**
 * @cfg {String} [storeId=null]
 * Unique identifier for this store. If present, this Store will be registered
 * with the {@link Ext.data.StoreManager}, making it easy to reuse elsewhere.
 *
 * Note that when a store is instantiated by a Controller, the storeId will default
 * to the name of the store if not specified in the class.
 * @accessor
 */

/**
 * @cfg {Boolean} [statefulFilters=false]
 * Configure as `true` to have the filters saved when a client
 * {@link Ext.grid.Panel grid} saves its state.
 * @accessor
 */

/**
 * @cfg {Ext.util.Sorter[]/Object[]} [sorters=null]
 * The initial set of {@link Ext.util.Sorter Sorters}
 *
 * Individual sorters can be specified as an `Ext.util.Sorter` instance, a config
 * object for `Ext.util.Sorter` or simply the name of a property by which to sort.
 *
 * An alternative way to extend the sorters is to call the `sort` method and pass
 * a property or sorter config to add to the sorters.
 *
 * For fine grain control of the sorters collection, call `getSorters` to return
 * the `Ext.util.Collection` instance that holds this collection's sorters.
 *
 *      var sorters = store.getSorters(); // an Ext.util.SorterCollection
 *
 *      sorters.add('name');
 *
 *      //...
 *
 *      sorters.remove('name');
 *
 * Any changes to the `sorters` collection will cause this store to adjust
 * its items accordingly.
 * @accessor
 */

/**
 * @cfg {Boolean} [remoteSort=false]
 * `true` if the sorting should be performed on the server side, false if it
 * is local only.
 * @accessor
 */

/**
 * @cfg {Boolean} [remoteFilter=false]
 * `true` to defer any filtering operation to the server. If `false`,
 * filtering is done locally on the client.
 * @accessor
 */

/**
 * @cfg {String} [groupField=undefined]
 * The field by which to group data in the store. Internally, grouping is very similar to sorting - the
 * groupField and {@link #groupDir} are injected as the first sorter (see {@link #method-sort}). Stores support a single
 * level of grouping, and groups can be fetched via the {@link #getGroups} method.
 * @accessor
 */

/**
 * @cfg {String} [groupDir='ASC']
 * The direction in which sorting should be applied when grouping. Supported
 * values are "ASC" and "DESC".
 * @accessor
 */

/**
 * @cfg {Object/Ext.util.Grouper} [grouper=null]
 * The grouper by which to group the data store. May also be specified by the
 * {@link #groupField} config, however they should not be used together.
 * @accessor
 */

/**
 * @cfg {Number} [pageSize=25]
 * The number of records considered to form a 'page'. This is used to power the built-in
 * paging using the nextPage and previousPage functions when the grid is paged using a
 * {@link Ext.toolbar.Paging PagingToolbar} Defaults to 25.
 *
 * To disable paging, set the pageSize to `0`.
 * @accessor
 */

/**
 * @property {Number} [currentPage=1]
 * The page that the Store has most recently loaded (see {@link Ext.data.Store#loadPage loadPage})
 */

/**
 * @property {Boolean} [isStore=true]
 * `true` in this class to identify an object as an instantiated Store, or subclass thereof.
 */

/**
 * @method getCount
 * Gets the number of records in store.
 *
 * If using paging, this may not be the total size of the dataset. If the data object
 * used by the Reader contains the dataset size, then the {@link Ext.data.ProxyStore#getTotalCount} function returns
 * the dataset size.  **Note**: see the Important note in {@link Ext.data.ProxyStore#method-load}.
 *
 * When store is filtered, it's the number of records matching the filter.
 *
 * @return {Number} The number of Records in the Store.
 */

/**
 * Checks if a record is in the current active data set.
 * @param {Ext.data.Model} record The record
 * @return {Boolean} `true` if the record is in the current active data set.
 * @method contains
 */

/**
 * @method find
 * Finds the index of the first matching Record in this store by a specific field value.
 *
 * When store is filtered, finds records only within filter.
 *
 * **IMPORTANT
 *
 * If this store is {@link Ext.data.BufferedStore Buffered}, this can ONLY find records which happen to be cached in the page cache.
 * This will be parts of the dataset around the currently visible zone, or recently visited zones if the pages
 * have not yet been purged from the cache.**
 *
 * @param {String} property The name of the Record field to test.
 * @param {String/RegExp} value Either a string that the field value
 * should begin with, or a RegExp to test against the field.
 * @param {Number} [startIndex=0] The index to start searching at
 * @param {Boolean} [anyMatch=false] True to match any part of the string, not just the
 * beginning.
 * @param {Boolean} [caseSensitive=false] True for case sensitive comparison
 * @param {Boolean} [exactMatch=false] True to force exact match (^ and $ characters
 * added to the regex). Ignored if `anyMatch` is `true`.
 * @return {Number} The matched index or -1
 */

/**
 * @method findRecord
 * Finds the first matching Record in this store by a specific field value.
 *
 * When store is filtered, finds records only within filter.
 *
 * **IMPORTANT
 *
 * If this store is {@link Ext.data.BufferedStore Buffered}, this can ONLY find records which happen to be cached in the page cache.
 * This will be parts of the dataset around the currently visible zone, or recently visited zones if the pages
 * have not yet been purged from the cache.**
 *
 * @param {String} fieldName The name of the Record field to test.
 * @param {String/RegExp} value Either a string that the field value
 * should begin with, or a RegExp to test against the field.
 * @param {Number} [startIndex=0] The index to start searching at
 * @param {Boolean} [anyMatch=false] True to match any part of the string, not just the
 * beginning.
 * @param {Boolean} [caseSensitive=false] True for case sensitive comparison
 * @param {Boolean} [exactMatch=false] True to force exact match (^ and $ characters
 * added to the regex). Ignored if `anyMatch` is `true`.
 * @return {Ext.data.Model} The matched record or null
 */

/**
 * @method findExact
 * Finds the index of the first matching Record in this store by a specific field value.
 *
 * When store is filtered, finds records only within filter.
 *
 * **IMPORTANT
 *
 * If this store is {@link Ext.data.BufferedStore Buffered}, this can ONLY find records which happen to be cached in the page cache.
 * This will be parts of the dataset around the currently visible zone, or recently visited zones if the pages
 * have not yet been purged from the cache.**
 *
 * @param {String} fieldName The name of the Record field to test.
 * @param {Object} value The value to match the field against.
 * @param {Number} [startIndex=0] The index to start searching at
 * @return {Number} The matched index or -1
 */

/**
 * @method findBy
 * Find the index of the first matching Record in this Store by a function.
 * If the function returns `true` it is considered a match.
 *
 * When store is filtered, finds records only within filter.
 *
 * **IMPORTANT
 *
 * If this store is {@link Ext.data.BufferedStore Buffered}, this can ONLY find records which happen to be cached in the page cache.
 * This will be parts of the dataset around the currently visible zone, or recently visited zones if the pages
 * have not yet been purged from the cache.**
 *
 * @param {Function} fn The function to be called. It will be passed the following parameters:
 * @param {Ext.data.Model} fn.record The record to test for filtering. Access field values
 *  using {@link Ext.data.Model#get}.
 * @param {Object} fn.id The ID of the Record passed.
 * @param {Object} [scope] The scope (this reference) in which the function is executed.
 * Defaults to this Store.
 * @param {Number} [start=0] The index at which to start searching.
 * @return {Number} The matched index or -1
 */

/**
 * @method getAt
 * Get the Record at the specified index.
 *
 * The index is effected by filtering.
 *
 * @param {Number} index The index of the Record to find.
 * @return {Ext.data.Model} The Record at the passed index. Returns null if not found.
 */

/**
 * @method getRange
 * Gathers a range of Records between specified indices.
 *
 * This method is affected by filtering.
 *
 * @param {Number} start The starting index. Defaults to zero.
 * @param {Number} end The ending index. Defaults to the last record. The end index
 * **is included**.
 * @param [options] (private) Used by BufferedRenderer when using a BufferedStore.
 * @return {Ext.data.Model[]} An array of records.
 */

/**
 * @method getFilters
 * Gets the filters for this store.
 * @param {Boolean} [autoCreate] (private)
 * @return {Ext.util.FilterCollection} The filters
 */

/**
 * @method getSorters
 * Gets the sorters for this store.
 * @param {Boolean} [autoCreate] (private)
 * @return {Ext.util.SorterCollection} The sorters
 */

/**
 * @method filter
 * Filters the data in the Store by one or more fields. Example usage:
 *
 *     //filter with a single field
 *     myStore.filter('firstName', 'Don');
 *
 *     //filtering with multiple filters
 *     myStore.filter([
 *         {
 *             property : 'firstName',
 *             value    : 'Don'
 *         },
 *         {
 *             property : 'lastName',
 *             value    : 'Griffin'
 *         }
 *     ]);
 *
 * Internally, Store converts the passed arguments into an array of
 * {@link Ext.util.Filter} instances, and delegates the actual filtering to its internal
 * {@link Ext.util.Collection} or the remote server.
 *
 * @param {String/Ext.util.Filter[]} [filters] Either a string name of one of the
 * fields in this Store's configured {@link Ext.data.Model Model}, or an array of
 * filter configurations.
 * @param {String} [value] The property value by which to filter. Only applicable if
 * `filters` is a string.
 * @param {Boolean} [suppressEvent] (private)
 */

/**
 * @method removeFilter
 * Removes an individual Filter from the current {@link #cfg-filters filter set}
 * using the passed Filter/Filter id and by default, applies the updated filter set
 * to the Store's unfiltered dataset.
 *
 * @param {String/Ext.util.Filter} toRemove The id of a Filter to remove from the
 * filter set, or a Filter instance to remove.
 * @param {Boolean} [suppressEvent] If `true` the filter is cleared silently.
 */

/**
 * @method addFilter
 * Adds a new Filter to this Store's {@link #cfg-filters filter set} and
 * by default, applies the updated filter set to the Store's unfiltered dataset.
 * @param {Object[]/Ext.util.Filter[]} filters The set of filters to add to the current {@link #cfg-filters filter set}.
 * @param {Boolean} [suppressEvent] If `true` the filter is cleared silently.
 */

/**
 * @method filterBy
 * Filters by a function. The specified function will be called for each
 * Record in this Store. If the function returns `true` the Record is included,
 * otherwise it is filtered out.
 *
 * When store is filtered, most of the methods for accessing store data will be working only
 * within the set of filtered records. The notable exception is {@link #getById}.
 *
 * @param {Function} fn The function to be called. It will be passed the following parameters:
 *  @param {Ext.data.Model} fn.record The record to test for filtering. Access field values
 *  using {@link Ext.data.Model#get}.
 * @param {Object} [scope] The scope (this reference) in which the function is executed.
 * Defaults to this Store.
 */

/**
 * @method clearFilter
 * Reverts to a view of the Record cache with no filtering applied.
 * @param {Boolean} [suppressEvent] If `true` the filter is cleared silently.
 *
 * For a locally filtered Store, this means that the filter collection is cleared without firing the
 * {@link #datachanged} event.
 *
 * For a remotely filtered Store, this means that the filter collection is cleared, but the store
 * is not reloaded from the server.
 */

/**
 * @method isFiltered
 * Tests whether the store currently has any active filters.
 * @return {Boolean} `true` if the store is filtered.
 */

/**
 * @method isSorted
 * Tests whether the store currently has any active sorters.
 * @return {Boolean} `true` if the store is sorted.
 */

/**
 * @method beginUpdate
 * This method may be called to indicate the start of multiple changes to the store.
 *
 * Automatic synchronization as configured by the {@link Ext.data.ProxyStore#autoSync autoSync} flag is deferred
 * until the {@link #endUpdate} method is called, so multiple mutations can be coalesced
 * into one synchronization operation.
 *
 * Internally this method increments a counter that is decremented by `endUpdate`. It
 * is important, therefore, that if you call `beginUpdate` directly you match that
 * call with a call to `endUpdate` or you will prevent the collection from updating
 * properly.
 *
 * For example:
 *
 *      var store = Ext.StoreManager.lookup({
 *          //...
 *          autoSync: true
 *      });
 *
 *      store.beginUpdate();
 *
 *      record.set('fieldName', 'newValue');
 *
 *      store.add(item);
 *      // ...
 *
 *      store.insert(index, otherItem);
 *      //...
 *
 *      // Interested parties will listen for the endupdate event
 *      store.endUpdate();
 *
 * @since 5.0.0
 */

/**
 * @method endUpdate
 * This method is called after modifications are complete on a store. For details
 * see `{@link #beginUpdate}`.
 * @since 5.0.0
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
 * @method isLoaded
 * Returns `true` if the Store has been loaded.
 * @return {Boolean} `true` if the Store has been loaded.
 */

/**
 * @method isLoading
 * Returns `true` if the Store is currently performing a load operation.
 * @return {Boolean} `true` if the Store is currently loading.
 */

/**
 * @method doDestroy
 * Perform the Store destroying sequence. Override this method to add destruction
 * behaviors to your custom Stores.
 */

/**
 * @method sort
 * Sorts the data in the Store by one or more of its properties. Example usage:
 *
 *     //sort by a single field
 *     myStore.sort('myField', 'DESC');
 *
 *     //sorting by multiple fields
 *     myStore.sort([
 *         {
 *             property : 'age',
 *             direction: 'ASC'
 *         },
 *         {
 *             property : 'name',
 *             direction: 'DESC'
 *         }
 *     ]);
 *
 * Internally, Store converts the passed arguments into an array of {@link Ext.util.Sorter} instances, and
 * either delegates the actual sorting to its internal {@link Ext.util.Collection} or the remote server.
 *
 * When passing a single string argument to sort, Store maintains a ASC/DESC toggler per field, so this code:
 *
 *     store.sort('myField');
 *     store.sort('myField');
 *
 * Is equivalent to this code, because Store handles the toggling automatically:
 *
 *     store.sort('myField', 'ASC');
 *     store.sort('myField', 'DESC');
 *
 * @param {String/Ext.util.Sorter[]} [field] Either a string name of one of the
 * fields in this Store's configured {@link Ext.data.Model Model}, or an array of
 * sorter configurations.
 * @param {"ASC"/"DESC"} [direction="ASC"] The overall direction to sort the data by.
 * @param {"append"/"prepend"/"replace"/"multi"} [mode="replace"]
 */

/**
 * @method setFilters
 */

/**
 * @method setSorters
 */

/**
 * @method group
 * Groups data inside the store.
 * @param {String/Object} grouper Either a string name of one of the fields in this Store's
 * configured {@link Ext.data.Model Model}, or an object, or a {@link Ext.util.Grouper grouper} configuration object.
 * @param {String} [direction] The overall direction to group the data by. Defaults to the value of {@link #groupDir}.
 */

/**
 * @method clearGrouping
 * Clear the store grouping
 */

/**
 * @method isGrouped
 * Tests whether the store currently has an active grouper.
 * @return {Boolean} `true` if the store is grouped.
 */

/**
 * @method getGroups
 * Returns a collection of readonly sub-collections of your store's records
 * with grouping applied. These sub-collections are maintained internally by
 * the collection.
 *
 * See {@link #groupField}, {@link #groupDir}. Example for a store
 * containing records with a color field:
 *
 *     var myStore = new Ext.data.Store({
 *         groupField: 'color',
 *         groupDir  : 'DESC'
 *     });
 *
 *     myStore.getGroups();
 *
 * The above should result in the following format:
 *
 *     [
 *         {
 *             name: 'yellow',
 *             children: [
 *                 // all records where the color field is 'yellow'
 *             ]
 *         },
 *         {
 *             name: 'red',
 *             children: [
 *                 // all records where the color field is 'red'
 *             ]
 *         }
 *     ]
 *
 * Group contents are affected by filtering.
 *
 * @return {Ext.util.Collection} The grouped data
 */

/**
 * @event add
 * Fired when a Model instance has been added to this Store.
 *
 * @param {Ext.data.Store} store The store.
 * @param {Ext.data.Model[]} records The records that were added.
 * @param {Number} index The index at which the records were inserted.
 * @since 1.1.0
 */

/**
 * @event remove
 * Fired when one or more records have been removed from this Store.
 *
 * **The signature for this event has changed in 5.0: **
 *
 * @param {Ext.data.Store} store The Store object
 * @param {Ext.data.Model[]} records The records that were removed. In previous
 * releases this was a single record, not an array.
 * @param {Number} index The index at which the records were removed.
 * @param {Boolean} isMove `true` if the child node is being removed so it can be
 * moved to another position in this Store.
 * @since 5.0.0
 */

/**
 * @event update
 * Fires when a Model instance has been updated.
 * @param {Ext.data.Store} this
 * @param {Ext.data.Model} record The Model instance that was updated
 * @param {String} operation The update operation being performed. Value may be one of:
 *
 *     Ext.data.Model.EDIT
 *     Ext.data.Model.REJECT
 *     Ext.data.Model.COMMIT
 * @param {String[]} modifiedFieldNames Array of field names changed during edit.
 * @param {Object} details An object describing the change. See the
 * {@link Ext.util.Collection#event-itemchange itemchange event} of the store's backing collection
 * @since 1.1.0
 */

/**
 * @event clear
 * Fired after the {@link Ext.data.Store#removeAll removeAll} method is called.
 * @param {Ext.data.Store} this
 * @since 1.1.0
 */

/**
 * @event datachanged
 * Fires whenever records are added to or removed from the Store.
 *
 * To hook into modifications of records in this Store use the {@link #update} event.
 * @param {Ext.data.Store} this The data store
 * @since 1.1.0
 */

/**
 * @event refresh
 * Fires when the data cache has changed in a bulk manner (e.g., it has been sorted, filtered, etc.) and a
 * widget that is using this Store as a Record cache should refresh its view.
 * @param {Ext.data.Store} this The data store
 */

/**
 * @event beginupdate
 * Fires when the {@link #beginUpdate} method is called. Automatic synchronization as configured
 * by the {@link Ext.data.ProxyStore#autoSync autoSync} flag is deferred until the {@link #endUpdate} method is called, so multiple
 * mutations can be coalesced into one synchronization operation.
 */

/**
 * @event endupdate
 * Fires when the {@link #endUpdate} method is called. Automatic synchronization as configured
 * by the {@link Ext.data.ProxyStore#autoSync autoSync} flag is deferred until the {@link #endUpdate} method is called, so multiple
 * mutations can be coalesced into one synchronization operation.
 */

/**
 * @event beforesort
 * Fires before a store is sorted.
 *
 * For {@link #remoteSort remotely sorted} stores, this will be just before the load operation triggered by changing the
 * store's sorters.
 *
 * For locally sorted stores, this will be just before the data items in the store's backing collection are sorted.
 * @param {Ext.data.Store} store The store being sorted
 * @param {Ext.util.Sorter[]} sorters Array of sorters applied to the store
 */

/**
 * @event sort
 * Fires after a store is sorted.
 *
 * For {@link #remoteSort remotely sorted} stores, this will be upon the success of a load operation triggered by
 * changing the store's sorters.
 *
 * For locally sorted stores, this will be just after the data items in the store's backing collection are sorted.
 * @param {Ext.data.Store} store The store being sorted
 */
