/**
 * @class Ext.data.virtual.Store
 * @extend Ext.data.ProxyStore
 * @alias store.virtual
 *
 * This type of store is a replacement for BufferedStore at least for Modern. The primary
 * use of this store is to create and manage "active ranges" of records.
 *
 * For example:
 *
 *      var range = store.createActiveRange({
 *          begin: 100,
 *          end: 200,
 *          prefetch: true,  // allow prefetching beyond range
 *          callback: 'onRangeUpdate',
 *          scope: this
 *      });
 *
 *      // Navigate to a different range. This will causes pages to load and
 *      // the onRangeUpdate method will be called as the load(s) progress.
 *      // This can change the length or number of records spanned on each
 *      // call.
 *      //
 *      range.goto(300, 400);
 *
 *      onRangeUpdate: function (range, begin, end) {
 *          // Called when records appear in the range...
 *          // We can check if all things are loaded:
 *
 *          // Or we can use range.records (sparsely populated)
 *      }
 *
 * @since 6.5.0
 */

/**
 * @method contains
 * @inheritdoc
 */

/**
 * @method createActiveRange
 * Create a `Range` instance to access records by their index.
 *
 * @param {Object/Ext.data.virtual.Range} [config]
 * @return {Ext.data.virtual.Range}
 * @since 6.5.0
 */

/**
 * @method getAt
 * @inheritdoc
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
 * @method indexOf
 * Get the index of the record within the virtual store. Because virtual stores only
 * load a partial set of records, not all records in the logically matching set will
 * have been loaded and will therefore return -1.
 *
 * @param {Ext.data.Model} record The record to find.
 * @return {Number} The index of the `record` or -1 if not found.
 */

/**
 * @method indexOfId
 * Get the index within the store of the record with the passed id. Because virtual
 * stores only load a partial set of records, not all records in the logically
 * matching set will have been loaded and will therefore return -1.
 *
 * @param {String} id The id of the record to find.
 * @return {Number} The index of the record or -1 if not found.
 */
