/**
 * @class Ext.data.LocalStore
 * @extend Ext.Mixin
 *
 * A mixin that provides common store methods for Ext.data.Store & Ext.data.ChainedStore.
 * @private
 */

/**
 * @method add
 * Adds Model instance to the Store. This method accepts either:
 *
 * - An array of Model instances or Model configuration objects.
 * - Any number of Model instance or Model configuration object arguments.
 *
 * The new Model instances will be added at the end of the existing collection.
 *
 * Sample usage:
 *
 *     myStore.add({some: 'data'}, {some: 'other data'});
 *
 * Note that if this Store is sorted, the new Model instances will be inserted
 * at the correct point in the Store to maintain the sort order.
 *
 * @param {Ext.data.Model[]/Ext.data.Model.../Object[]/Object...} record An array of
 * records or configuration objects, or variable number of record or config arguments.
 * @return {Ext.data.Model[]} The record instances that were added.
 */

/**
 * @method each
 * Calls the specified function for each {@link Ext.data.Model record} in the store.
 *
 * When store is filtered, only loops over the filtered records.
 *
 * @param {Function} fn The function to call. The {@link Ext.data.Model Record} is passed as the first parameter.
 * Returning `false` aborts and exits the iteration.
 * @param {Object} [scope] The scope (`this` reference) in which the function is executed.
 * Defaults to the current {@link Ext.data.Model record} in the iteration.
 * @param {Object/Boolean} [includeOptions] An object which contains options which
 * modify how the store is traversed. Or simply the `filtered` option.
 * @param {Boolean} [includeOptions.filtered] Pass `true` to include filtered out
 * nodes in the iteration.
 */

/**
 * @method collect
 * Collects unique values for a particular dataIndex from this store.
 *
 * Note that the `filtered` option can also be passed as a separate parameter for
 * compatibility with previous versions.
 *
 *     var store = new Ext.data.Store({
 *         fields: ['name'],
 *         data: [{
 *             name: 'Larry'
 *         }, {
 *             name: 'Darryl'
 *         }, {
 *             name: 'Darryl'
 *         }]
 *     });
 *
 *     store.collect('name');
 *     // returns ["Larry", "Darryl"]
 *
 * @param {String} property The property to collect
 * @param {Object} [includeOptions] An object which contains options which modify how
 * the store is traversed. For compatibility, this argument may be the `allowNull`
 * value itself. If so, the next argument is the `filtered` value.
 * @param {Boolean} [includeOptions.allowNull] Pass true to allow null, undefined or
 * empty string values.
 * @param {Boolean} [includeOptions.filtered] Pass `true` to collect from all records,
 * even ones which are filtered.
 * @param {Boolean} [filtered] This argument only applies when the legacy call form
 * is used and `includeOptions` is actually the `allowNull` value.
 *
 * @return {Object[]} An array of the unique values
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
 * Like #indexOf, this method is affected by filtering.
 *
 * @param {String} id The id of the Record to find.
 * @return {Number} The index of the Record. Returns -1 if not found.
 */

/**
 * @method insert
 * Inserts Model instances into the Store at the given index and fires the add event.
 * See also {@link #method-add}.
 *
 * @param {Number} index The start index at which to insert the passed Records.
 * @param {Ext.data.Model/Ext.data.Model[]/Object/Object[]} records An `Ext.data.Model` instance, the
 * data needed to populate an instance or an array of either of these.
 *
 * @return {Ext.data.Model[]} records The added records
 */

/**
 * @method queryBy
 * Query all the cached records in this Store using a filtering function. The specified function
 * will be called with each record in this Store. If the function returns `true` the record is
 * included in the results.
 *
 * This method is not affected by filtering, it will always search *all* records in the store
 * regardless of filtering.
 *
 * @param {Function} fn The function to be called. It will be passed the following parameters:
 *  @param {Ext.data.Model} fn.record The record to test for filtering. Access field values
 *  using {@link Ext.data.Model#get}.
 *  @param {Object} fn.id The ID of the Record passed.
 * @param {Object} [scope] The scope (this reference) in which the function is executed
 * Defaults to this Store.
 * @return {Ext.util.Collection} The matched records
 */

/**
 * @method query
 * Query all the cached records in this Store by name/value pair.
 * The parameters will be used to generated a filter function that is given
 * to the queryBy method.
 *
 * This method complements queryBy by generating the query function automatically.
 *
 * This method is not affected by filtering, it will always search *all* records in the store
 * regardless of filtering.
 *
 * @param {String} property The property to create the filter function for
 * @param {String/RegExp} value The string/regex to compare the property value to
 * @param {Boolean} [anyMatch=false] True to match any part of the string, not just the
 * beginning.
 * @param {Boolean} [caseSensitive=false] `true` to create a case-sensitive regex.
 * @param {Boolean} [exactMatch=false] True to force exact match (^ and $ characters
 * added to the regex). Ignored if `anyMatch` is `true`.
 * @return {Ext.util.Collection} The matched records
 */

/**
 * @method first
 * Convenience function for getting the first model instance in the store.
 *
 * When store is filtered, will return first item within the filter.
 *
 * @param {Boolean} [grouped] True to perform the operation for each group
 * in the store. The value returned will be an object literal with the key being the group
 * name and the first record being the value. The grouped parameter is only honored if
 * the store has a groupField.
 * @return {Ext.data.Model/undefined} The first model instance in the store, or undefined
 */

/**
 * @method last
 * Convenience function for getting the last model instance in the store.
 *
 * When store is filtered, will return last item within the filter.
 *
 * @param {Boolean} [grouped] True to perform the operation for each group
 * in the store. The value returned will be an object literal with the key being the group
 * name and the last record being the value. The grouped parameter is only honored if
 * the store has a groupField.
 * @return {Ext.data.Model/undefined} The last model instance in the store, or undefined
 */

/**
 * @method sum
 * Sums the value of `field` for each {@link Ext.data.Model record} in store
 * and returns the result.
 *
 * When store is filtered, only sums items within the filter.
 *
 * @param {String} field A field in each record
 * @param {Boolean} [grouped] True to perform the operation for each group
 * in the store. The value returned will be an object literal with the key being the group
 * name and the sum for that group being the value. The grouped parameter is only honored if
 * the store has a groupField.
 * @return {Number} The sum
 */

/**
 * @method count
 * Gets the count of items in the store.
 *
 * When store is filtered, only items within the filter are counted.
 *
 * @param {Boolean} [grouped] True to perform the operation for each group
 * in the store. The value returned will be an object literal with the key being the group
 * name and the count for each group being the value. The grouped parameter is only honored if
 * the store has a groupField.
 * @return {Number} the count
 */

/**
 * @method min
 * Gets the minimum value in the store.
 *
 * When store is filtered, only items within the filter are aggregated.
 *
 * @param {String} field The field in each record
 * @param {Boolean} [grouped] True to perform the operation for each group
 * in the store. The value returned will be an object literal with the key being the group
 * name and the minimum in the group being the value. The grouped parameter is only honored if
 * the store has a groupField.
 * @return {Object} The minimum value, if no items exist, undefined.
 */

/**
 * @method max
 * Gets the maximum value in the store.
 *
 * When store is filtered, only items within the filter are aggregated.
 *
 * @param {String} field The field in each record
 * @param {Boolean} [grouped] True to perform the operation for each group
 * in the store. The value returned will be an object literal with the key being the group
 * name and the maximum in the group being the value. The grouped parameter is only honored if
 * the store has a groupField.
 * @return {Object} The maximum value, if no items exist, undefined.
 */

/**
 * @method average
 * Gets the average value in the store.
 *
 * When store is filtered, only items within the filter are aggregated.
 *
 * @param {String} field The field in each record
 * @param {Boolean} [grouped] True to perform the operation for each group
 * in the store. The value returned will be an object literal with the key being the group
 * name and the group average being the value. The grouped parameter is only honored if
 * the store has a groupField.
 * @return {Object} The average value, if no items exist, 0.
 */

/**
 * @method aggregate
 * Runs the aggregate function for all the records in the store.
 *
 * When store is filtered, only items within the filter are aggregated.
 *
 * @param {Function} fn The function to execute. The function is called with a single parameter,
 * an array of records for that group.
 * @param {Object} [scope] The scope to execute the function in. Defaults to the store.
 * @param {Boolean} [grouped] True to perform the operation for each group
 * in the store. The value returned will be an object literal with the key being the group
 * name and the group average being the value. The grouped parameter is only honored if
 * the store has a groupField.
 * @param {String} field The field to get the value from
 * @return {Object} An object literal with the group names and their appropriate values.
 */
