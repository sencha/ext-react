/**
 * @class Ext.util.Collection
 * @mixin Ext.mixin.Observable
 * This class manages uniquely keyed objects such as {@link Ext.data.Model records} or
 * {@link Ext.Component components}.
 *
 * ## Keys
 *
 * Unlike `Ext.util.MixedCollection` this class can only manage objects whose key can be
 * extracted from the instance. That is, this class does not support "external" keys. This
 * makes this class more efficient because it does not need to track keys in parallel with
 * items. It also means key-to-item lookup will be optimal and never need to perform a
 * linear search.
 *
 * ### Extra Keys
 *
 * In some cases items may need to be looked up by multiple property values. To enable this
 * there is the `extraKeys` config.
 *
 * For example, to quickly look up items by their "name" property:
 *
 *      var collection = new Ext.util.Collection({
 *          extraKeys: {
 *              byName: 'name' // based on "name" property of each item
 *          }
 *      });
 *
 * ## Ranges
 *
 * When methods accept index arguments to indicate a range of items, these are either an
 * index and a number of items or a "begin" and "end" index.
 *
 * In the case of "begin" and "end", the "end" is the first item outside the range. This
 * definition makes it simple to expression empty ranges because "length = end - begin".
 *
 * ### Negative Indices
 *
 * When an item index is provided, negative values are treated as offsets from the end of
 * the collection. In other words the follow are equivalent:
 *
 *      +---+---+---+---+---+---+
 *      |   |   |   |   |   |   |
 *      +---+---+---+---+---+---+
 *        0   1   2   3   4   5
 *       -6  -5  -4  -3  -2  -1
 *
 * ## Legacy Classes
 *
 * The legacy classes `Ext.util.MixedCollection' and `Ext.util.AbstractMixedCollection`
 * may be needed if external keys are required, but for all other situations this class
 * should be used instead.
 */

/**
 * @cfg {Function} decoder
 * A function that can convert newly added items to a proper type before being
 * added to this collection.
 * @accessor
 */

/**
 * @cfg {Object} extraKeys
 * One or more `Ext.util.CollectionKey` configuration objects or key properties.
 * Each property of the given object is the name of the `CollectionKey` instance
 * that is stored on this collection. The value of each property configures the
 * `CollectionKey` instance.
 *
 *      var collection = new Ext.util.Collection({
 *          extraKeys: {
 *              byName: 'name' // based on "name" property of each item
 *          }
 *      });
 *
 * Or equivalently:
 *
 *      var collection = new Ext.util.Collection({
 *          extraKeys: {
 *              byName: {
 *                  property: 'name'
 *              }
 *          }
 *      });
 *
 * To provide a custom key extraction function instead:
 *
 *      var collection = new Ext.util.Collection({
 *          extraKeys: {
 *              byName: {
 *                  keyFn: function (item) {
 *                      return item.name;
 *                  }
 *              }
 *          }
 *      });
 *
 * Or to call a key getter method from each item:
 *
 *      var collection = new Ext.util.Collection({
 *          extraKeys: {
 *              byName: {
 *                  keyFn: 'getName'
 *              }
 *          }
 *      });
 *
 * To use the above:
 *
 *      var item = collection.byName.get('somename');
 *
 * **NOTE** Either a `property` or `keyFn` must be be specified to define each
 * key.
 * @since 5.0.0
 * @accessor
 */

/**
 * @cfg {Array/Ext.util.FilterCollection} filters
 * The collection of {@link Ext.util.Filter Filters} for this collection. At the
 * time a collection is created `filters` can be specified as a unit. After that
 * time the normal `setFilters` method can also be given a set of replacement
 * filters for the collection.
 *
 * Individual filters can be specified as an `Ext.util.Filter` instance, a config
 * object for `Ext.util.Filter` or simply a function that will be wrapped in a
 * instance with its {@Ext.util.Filter#filterFn filterFn} set.
 *
 * For fine grain control of the filters collection, call `getFilters` to return
 * the `Ext.util.Collection` instance that holds this collection's filters.
 *
 *      var collection = new Ext.util.Collection();
 *      var filters = collection.getFilters(); // an Ext.util.FilterCollection
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
 * Any changes to the `filters` collection will cause this collection to adjust
 * its items accordingly (if `autoFilter` is `true`).
 * @since 5.0.0
 * @accessor
 */

/**
 * @cfg {Object} grouper
 * A configuration object for this collection's {@link Ext.util.Grouper grouper}.
 *
 * For example, to group items by the first letter of the last name:
 *
 *      var collection = new Ext.util.Collection({
 *          grouper: {
 *              groupFn: function (item) {
 *                  return item.lastName.substring(0, 1);
 *              }
 *          }
 *      });
 * @accessor
 */

/**
 * @cfg {Ext.util.GroupCollection} groups
 * The collection of to hold each group container. This collection is created and
 * removed dynamically based on `grouper`. Application code should only need to
 * call `getGroups` to retrieve the collection and not `setGroups`.
 * @accessor
 */

/**
 * @cfg {String} rootProperty
 * The root property to use for aggregation, filtering and sorting. By default
 * this is `null` but when containing things like {@link Ext.data.Model records}
 * this config would likely be set to "data" so that property names are applied
 * to the fields of each record.
 * @accessor
 */

/**
 * @cfg {Array/Ext.util.SorterCollection} sorters
 * Array of {@link Ext.util.Sorter sorters} for this collection. At the time a
 * collection is created the `sorters` can be specified as a unit. After that time
 * the normal `setSorters` method can be also be given a set of replacement
 * sorters.
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
 *      var collection = new Ext.util.Collection();
 *      var sorters = collection.getSorters(); // an Ext.util.SorterCollection
 *
 *      sorters.add('name');
 *
 *      //...
 *
 *      sorters.remove('name');
 *
 * Any changes to the `sorters` collection will cause this collection to adjust
 * its items accordingly (if `autoSort` is `true`).
 *
 * @since 5.0.0
 * @accessor
 */

/**
 * @cfg {Number} [multiSortLimit=3]
 * The maximum number of sorters which may be applied to this Sortable when using
 * the "multi" insertion position when adding sorters.
 *
 * New sorters added using the "multi" insertion position are inserted at the top
 * of the sorters list becoming the new primary sort key.
 *
 * If the sorters collection has grown to longer then **`multiSortLimit`**, then
 * the it is trimmed.
 * @accessor
 */

/**
 * @cfg {String} [defaultSortDirection="ASC"]
 * The default sort direction to use if one is not specified.
 * @accessor
 */

/**
 * @cfg {Ext.util.Collection} source
 * The base `Collection`. This collection contains the items to which filters
 * are applied to populate this collection. In this configuration, only the
 * root `source` collection can have items truly added or removed.
 * @since 5.0.0
 * @accessor
 */

/**
 * @event add
 * Fires after items have been added to the collection.
 *
 * All `{@link #event-add add}` and `{@link #event-remove remove}` events occur between
 * `{@link #event-beginupdate beginupdate}` and `{@link #event-endupdate endupdate}`
 * events so it is best to do only the minimal amount of work in response to these
 * events and move the more expensive side-effects to an `endupdate` listener.
 *
 * @param {Ext.util.Collection} collection The collection being modified.
 *
 * @param {Object} details An object describing the addition.
 *
 * @param {Number} details.at The index in the collection where the add occurred.
 *
 * @param {Object} details.atItem The item after which the new items were inserted or
 * `null` if at the beginning of the collection.
 *
 * @param {Object[]} details.items The items that are now added to the collection.
 *
 * @param {Array} [details.keys] If available this array holds the keys (extracted by
 * `getKey`) for each item in the `items` array.
 *
 * @param {Object} [details.next] If more `{@link #event-add add}` events are in queue
 * to be delivered this is a reference to the `details` instance for the next
 * `{@link #event-add add}` event. This will only be the case when the collection is
 * sorted as the new items often need to be inserted at multiple locations to maintain
 * the sort. In this case, all of the new items have already been added not just those
 * described by the first `{@link #event-add add}` event.
 *
 * @param {Object} [details.replaced] If this addition has a corresponding set of
 * `{@link #event-remove remove}` events this reference holds the `details` object for
 * the first `remove` event. That `details` object may have a `next` property if there
 * are multiple associated `remove` events.
 *
 * @since 5.0.0
 */

/**
 * @event beginupdate
 * Fired before changes are made to the collection. This event fires when the
 * `beginUpdate` method is called and the counter it manages transitions from 0 to 1.
 *
 * All `{@link #event-add add}` and `{@link #event-remove remove}` events occur between
 * `{@link #event-beginupdate beginupdate}` and `{@link #event-endupdate endupdate}`
 * events so it is best to do only the minimal amount of work in response to these
 * events and move the more expensive side-effects to an `endupdate` listener.
 *
 * @param {Ext.util.Collection} collection The collection being modified.
 *
 * @since 5.0.0
 */

/**
 * @event endupdate
 * Fired after changes are made to the collection. This event fires when the `endUpdate`
 * method is called and the counter it manages transitions from 1 to 0.
 *
 * All `{@link #event-add add}` and `{@link #event-remove remove}` events occur between
 * `{@link #event-beginupdate beginupdate}` and `{@link #event-endupdate endupdate}`
 * events so it is best to do only the minimal amount of work in response to these
 * events and move the more expensive side-effects to an `endupdate` listener.
 *
 * @param {Ext.util.Collection} collection The collection being modified.
 *
 * @since 5.0.0
 */

/**
 * @event beforeitemchange
 * This event fires before an item change is reflected in the collection. This event
 * is always followed by an `itemchange` event and, depending on the change, possibly
 * an `add`, `remove` and/or `updatekey` event.
 *
 * @param {Ext.util.Collection} collection The collection being modified.
 *
 * @param {Object} details An object describing the change.
 *
 * @param {Object} details.item The item that has changed.
 *
 * @param {String} details.key The key of the item that has changed.
 *
 * @param {Boolean} details.filterChanged This is `true` if the filter status of the
 * `item` has changed. That is, the item was previously filtered out and is no longer
 * or the opposite.
 *
 * @param {Boolean} details.keyChanged This is `true` if the item has changed keys. If
 * so, check `oldKey` for the old key. An `updatekey` event will follow.
 *
 * @param {Boolean} details.indexChanged This is `true` if the item needs to move to
 * a new index in the collection due to sorting. The index can be seen in `index`.
 * The old index is in `oldIndex`.
 *
 * @param {String[]} [details.modified] If known this property holds the array of names
 * of the modified properties of the item.
 *
 * @param {Boolean} [details.filtered] This value is `true` if the item will be filtered
 * out of the collection.
 *
 * @param {Number} [details.index] The new index in the collection for the item if
 * the item is being moved (see `indexChanged`). If the item is being removed due to
 * filtering, this will be -1.
 *
 * @param {Number} [details.oldIndex] The old index in the collection for the item if
 * the item is being moved (see `indexChanged`). If the item was being removed due to
 * filtering, this will be -1.
 *
 * @param {Object} [details.oldKey] The old key for the `item` if the item's key has
 * changed (see `keyChanged`).
 *
 * @param {Boolean} [details.wasFiltered] This value is `true` if the item was filtered
 * out of the collection.
 *
 * @since 5.0.0
 */

/**
 * @event itemchange
 * This event fires after an item change is reflected in the collection. This event
 * always follows a `beforeitemchange` event and its corresponding `add`, `remove`
 * and/or `updatekey` events.
 *
 * @param {Ext.util.Collection} collection The collection being modified.
 *
 * @param {Object} details An object describing the change.
 *
 * @param {Object} details.item The item that has changed.
 *
 * @param {String} details.key The key of the item that has changed.
 *
 * @param {Boolean} details.filterChanged This is `true` if the filter status of the
 * `item` has changed. That is, the item was previously filtered out and is no longer
 * or the opposite.
 *
 * @param {Object} details.keyChanged This is `true` if the item has changed keys. If
 * so, check `oldKey` for the old key. An `updatekey` event will have been sent.
 *
 * @param {Boolean} details.indexChanged This is `true` if the item was moved to a
 * new index in the collection due to sorting. The index can be seen in `index`.
 * The old index is in `oldIndex`.
 *
 * @param {String[]} [details.modified] If known this property holds the array of names
 * of the modified properties of the item.
 *
 * @param {Boolean} [details.filtered] This value is `true` if the item is filtered
 * out of the collection.
 *
 * @param {Number} [details.index] The new index in the collection for the item if
 * the item has been moved (see `indexChanged`). If the item is removed due to
 * filtering, this will be -1.
 *
 * @param {Number} [details.oldIndex] The old index in the collection for the item if
 * the item has been moved (see `indexChanged`). If the item was being removed due to
 * filtering, this will be -1.
 *
 * @param {Object} [details.oldKey] The old key for the `item` if the item's key has
 * changed (see `keyChanged`).
 *
 * @param {Boolean} [details.wasFiltered] This value is `true` if the item was filtered
 * out of the collection.
 *
 * @since 5.0.0
 */

/**
 * @event refresh
 * This event fires when the collection has changed entirely. This event is fired in
 * cases where the collection's filter is updated or the items are sorted. While the
 * items previously in the collection may remain the same, the order at a minimum has
 * changed in ways that cannot be simply translated to other events.
 *
 * @param {Ext.util.Collection} collection The collection being modified.
 */

/**
 * @event remove
 * Fires after items have been removed from the collection. Some properties of this
 * object may not be present if calculating them is deemed too expensive. These are
 * marked as "optional".
 *
 * All `{@link #event-add add}` and `{@link #event-remove remove}` events occur between
 * `{@link #event-beginupdate beginupdate}` and `{@link #event-endupdate endupdate}`
 * events so it is best to do only the minimal amount of work in response to these
 * events and move the more expensive side-effects to an `endupdate` listener.
 *
 * @param {Ext.util.Collection} collection The collection being modified.
 *
 * @param {Object} details An object describing the removal.
 *
 * @param {Number} details.at The index in the collection where the removal occurred.
 *
 * @param {Object[]} details.items The items that are now removed from the collection.
 *
 * @param {Array} [details.keys] If available this array holds the keys (extracted by
 * `getKey`) for each item in the `items` array.
 *
 * @param {Object} [details.map] If available this is a map keyed by the key of each
 * item in the `items` array. This will often contain all of the items being removed
 * and not just the items in the range described by this event. The value held in this
 * map is the item.
 *
 * @param {Object} [details.next] If more `{@link #event-remove remove}` events are in
 * queue to be delivered this is a reference to the `details` instance for the next
 * remove event.
 *
 * @param {Object} [details.replacement] If this removal has a corresponding
 * `{@link #event-add add}` taking place this reference holds the `details` object for
 * that `add` event. If the collection is sorted, the new items are pre-sorted but the
 * `at` property for the `replacement` will **not** be correct. The new items will be
 * added in one or more chunks at their proper index.
 *
 * @since 5.0.0
 */

/**
 * @event sort
 * This event fires after the contents of the collection have been sorted.
 *
 * @param {Ext.util.Collection} collection The collection being sorted.
 */

/**
 * @event updatekey
 * Fires after the key for an item has changed.
 *
 * @param {Ext.util.Collection} collection The collection being modified.
 *
 * @param {Object} details An object describing the update.
 *
 * @param {Object} details.item The item whose key has changed.
 *
 * @param {Object} details.newKey The new key for the `item`.
 *
 * @param {Object} details.oldKey The old key for the `item`.
 *
 * @since 5.0.0
 */

/**
 * @cfg {Function} [keyFn]
 * A function to retrieve the key of an item in the collection. If provided,
 * this replaces the default `getKey` method. The default `getKey` method handles
 * items that have either an "id" or "_id" property or failing that a `getId`
 * method to call.
 * @since 5.0.0
 */

/**
 * @method destroy
 * Destroys this collection. This is only necessary if this collection uses a `source`
 * collection as that relationship will keep a reference from the `source` to this
 * collection and potentially leak memory.
 * @since 5.0.0
 */

/**
 * @method add
 * Adds an item to the collection. If the item already exists or an item with the
 * same key exists, the old item will be removed and the new item will be added to
 * the end.
 *
 * This method also accepts an array of items or simply multiple items as individual
 * arguments. The following 3 code sequences have the same end result:
 *
 *      // Call add() once per item (not optimal - best avoided):
 *      collection.add(itemA);
 *      collection.add(itemB);
 *      collection.add(itemC);
 *      collection.add(itemD);
 *
 *      // Call add() with each item as an argument:
 *      collection.add(itemA, itemB, itemC, itemD);
 *
 *      // Call add() with the items as an array:
 *      collection.add([ itemA, itemB, itemC, itemD ]);
 *
 * The first form should be avoided where possible because the collection and all
 * parties "watching" it will be updated 4 times.
 *
 * @param {Object/Object[]} item The item or items to add.
 * @return {Object/Object[]} The item or items added.
 * @since 5.0.0
 */

/**
 * @method replaceAll
 * Adds an item to the collection while removing any existing items. Similar to {@link #method-add}.
 * @param {Object/Object[]} item The item or items to add.
 * @return {Object/Object[]} The item or items added.
 * @since 5.0.0
 */

/**
 * @method aggregate
 * Returns the result of the specified aggregation operation against all items in this
 * collection.
 *
 * This method is not typically called directly because there are convenience methods
 * for each of the supported `operation` values. These are:
 *
 *   * **average** - Returns the average value.
 *   * **bounds**  - Returns an array of `[min, max]`.
 *   * **max**     - Returns the maximum value or `undefined` if empty.
 *   * **min**     - Returns the minimum value or `undefined` if empty.
 *   * **sum**     - Returns the sum of all values.
 *
 * For example:
 *
 *      result = collection.aggregate('age', 'sum');
 *
 *      result = collection.aggregate('age', 'sum', 2, 10); // the 8 items at index 2
 *
 * To provide a custom operation function:
 *
 *      function averageAgeOfMinors (items, values) {
 *          var sum = 0,
 *              count = 0;
 *
 *          for (var i = 0; i < values.length; ++i) {
 *              if (values[i] < 18) {
 *                  sum += values[i];
 *                  ++count;
 *              }
 *          }
 *
 *          return count ? sum / count : 0;
 *      }
 *
 *      result = collection.aggregate('age', averageAgeOfMinors);
 *
 * @param {String} property The name of the property to aggregate from each item.
 * @param {String/Function} operation The operation to perform.
 * @param {Array} operation.items The items on which the `operation` function is to
 * operate.
 * @param {Array} operation.values The values on which the `operation` function is to
 * operate.
 * @param {Number} [begin] The index of the first item in `items` to include in the
 * aggregation.
 * @param {Number} [end] The index at which to stop aggregating `items`. The item at
 * this index will *not* be included in the aggregation.
 * @param {Object} [scope] The `this` pointer to use if `operation` is a function.
 * Defaults to this collection.
 * @return {Object}
 */

/**
 * @method aggregateByGroup
 * See {@link #aggregate}. The functionality is the same, however the aggregates are
 * provided per group. Assumes this collection has an active {@link #grouper}.
 *
 * @param {String} property The name of the property to aggregate from each item.
 * @param {String/Function} operation The operation to perform.
 * @param {Array} operation.items The items on which the `operation` function is to
 * operate.
 * @param {Array} operation.values The values on which the `operation` function is to
 * operate.
 * @param {Object} [scope] The `this` pointer to use if `operation` is a function.
 * Defaults to this collection.
 * @return {Object}
 */

/**
 * @method beginUpdate
 * This method is called to indicate the start of multiple changes to the collection.
 * Application code should seldom need to call this method as it is called internally
 * when needed. If multiple collection changes are needed, consider wrapping them in
 * an `update` call rather than calling `beginUpdate` directly.
 *
 * Internally this method increments a counter that is decremented by `endUpdate`. It
 * is important, therefore, that if you call `beginUpdate` directly you match that
 * call with a call to `endUpdate` or you will prevent the collection from updating
 * properly.
 *
 * For example:
 *
 *      var collection = new Ext.util.Collection();
 *
 *      collection.beginUpdate();
 *
 *      collection.add(item);
 *      // ...
 *
 *      collection.insert(index, otherItem);
 *      //...
 *
 *      collection.endUpdate();
 *
 * @since 5.0.0
 */

/**
 * @method clear
 * Removes all items from the collection. This is similar to `removeAll` except that
 * `removeAll` fire events to inform listeners. This means that this method should be
 * called only when you are sure there are no listeners.
 * @since 5.0.0
 */

/**
 * @method clone
 * Creates a shallow copy of this collection
 * @return {Ext.util.Collection}
 * @since 5.0.0
 */

/**
 * @method collect
 * Collects unique values of a particular property in this Collection.
 * @param {String} property The property to collect on
 * @param {String} root (optional) 'root' property to extract the first argument from. This is used mainly when
 * summing fields in records, where the fields are all stored inside the 'data' object
 * @param {Boolean} [allowNull] Pass `true` to include `null`, `undefined` or empty
 * string values.
 * @return {Array} The unique values
 * @since 5.0.0
 */

/**
 * @method contains
 * Returns true if the collection contains the passed Object as an item.
 * @param {Object} item The Object to look for in the collection.
 * @return {Boolean} `true` if the collection contains the Object as an item.
 * @since 5.0.0
 */

/**
 * @method containsKey
 * Returns true if the collection contains the passed Object as a key.
 * @param {String} key The key to look for in the collection.
 * @return {Boolean} True if the collection contains the Object as a key.
 * @since 5.0.0
 */

/**
 * @method createFiltered
 * Creates a new collection that is a filtered subset of this collection. The filter
 * passed can be a function, a simple property name and value, an `Ext.util.Filter`
 * instance, an array of `Ext.util.Filter` instances.
 *
 * If the passed filter is a function the second argument is its "scope" (or "this"
 * pointer). The function should return `true` given each item in the collection if
 * that item should be included in the filtered collection.
 *
 *      var people = new Ext.util.Collection();
 *
 *      people.add([
 *          { id: 1, age: 25, name: 'Ed' },
 *          { id: 2, age: 24, name: 'Tommy' },
 *          { id: 3, age: 24, name: 'Arne' },
 *          { id: 4, age: 26, name: 'Aaron' }
 *      ]);
 *
 *      // Create a collection of people who are older than 24:
 *      var oldPeople = people.createFiltered(function (item) {
 *          return item.age > 24;
 *      });
 *
 * If the passed filter is a `Ext.util.Filter` instance or array of `Ext.util.Filter`
 * instances the filter(s) are used to produce the filtered collection and there are
 * no further arguments.
 *
 * If the passed filter is a string it is understood as the name of the property by
 * which to filter. The second argument is the "value" used to compare each item's
 * property value. This comparison can be further tuned with the `anyMatch` and
 * `caseSensitive` (optional) arguments.
 *
 *    // Create a new Collection containing only the items where age == 24
 *    var middleAged = people.createFiltered('age', 24);
 *
 * Alternatively you can apply `filters` to this Collection by calling `setFilters`
 * or modifying the filter collection returned by `getFilters`.
 *
 * @param {Ext.util.Filter[]/String/Function} property A property on your objects, an
 * array of {@link Ext.util.Filter Filter} objects or a filter function.
 *
 * @param {Object} value If `property` is a function, this argument is the "scope"
 * (or "this" pointer) for the function. Otherwise this is either a `RegExp` to test
 * property values or the value with which to compare.
 *
 * @param {Boolean} [anyMatch=false] True to match any part of the string, not just
 * the beginning.
 *
 * @param {Boolean} [caseSensitive=false] True for case sensitive comparison.
 *
 * @param {Boolean} [exactMatch=false] `true` to force exact match (^ and $ characters added to the regex).
 *
 * @return {Ext.util.Collection} The new, filtered collection.
 *
 * @since 5.0.0
 */

/**
 * @method each
 * Executes the specified function once for every item in the collection. If the value
 * returned by `fn` is `false` the iteration stops. In all cases, the last value that
 * `fn` returns is returned by this method.
 *
 * @param {Function} fn The function to execute for each item.
 * @param {Object} fn.item The collection item.
 * @param {Number} fn.index The index of item.
 * @param {Number} fn.len Total length of collection.
 * @param {Object} [scope=this] The scope (`this` reference) in which the function
 * is executed. Defaults to this collection.
 * @since 5.0.0
 */

/**
 * @method eachKey
 * Executes the specified function once for every key in the collection, passing each
 * key, and its associated item as the first two parameters. If the value returned by
 * `fn` is `false` the iteration stops. In all cases, the last value that `fn` returns
 * is returned by this method.
 *
 * @param {Function} fn The function to execute for each item.
 * @param {String} fn.key The key of collection item.
 * @param {Object} fn.item The collection item.
 * @param {Number} fn.index The index of item.
 * @param {Number} fn.len Total length of collection.
 * @param {Object} [scope=this] The scope (`this` reference) in which the function
 * is executed. Defaults to this collection.
 * @since 5.0.0
 */

/**
 * @method endUpdate
 * This method is called after modifications are complete on a collection. For details
 * see `beginUpdate`.
 * @since 5.0.0
 */

/**
 * @method find
 * Finds the first matching object in this collection by a specific property/value.
 *
 * @param {String} property The name of a property on your objects.
 * @param {String/RegExp} value A string that the property values
 * should start with or a RegExp to test against the property.
 * @param {Number} [start=0] The index to start searching at.
 * @param {Boolean} [startsWith=true] Pass `false` to allow a match start anywhere in
 * the string. By default the `value` will match only at the start of the string.
 * @param {Boolean} [endsWith=true] Pass `false` to allow the match to end before the
 * end of the string. By default the `value` will match only at the end of the string.
 * @param {Boolean} [ignoreCase=true] Pass `false` to make the `RegExp` case
 * sensitive (removes the 'i' flag).
 * @return {Object} The first item in the collection which matches the criteria or
 * `null` if none was found.
 * @since 5.0.0
 */

/**
 * @method findBy
 * Returns the first item in the collection which elicits a true return value from the
 * passed selection function.
 * @param {Function} fn The selection function to execute for each item.
 * @param {Object} fn.item The collection item.
 * @param {String} fn.key The key of collection item.
 * @param {Object} [scope=this] The scope (`this` reference) in which the function
 * is executed. Defaults to this collection.
 * @param {Number} [start=0] The index at which to start searching.
 * @return {Object} The first item in the collection which returned true from the selection
 * function, or null if none was found.
 * @since 5.0.0
 */

/**
 * @method findIndex
 * Finds the index of the first matching object in this collection by a specific
 * property/value.
 *
 * @param {String} property The name of a property on your objects.
 * @param {String/RegExp} value A string that the property values
 * should start with or a RegExp to test against the property.
 * @param {Number} [start=0] The index to start searching at.
 * @param {Boolean} [startsWith=true] Pass `false` to allow a match start anywhere in
 * the string. By default the `value` will match only at the start of the string.
 * @param {Boolean} [endsWith=true] Pass `false` to allow the match to end before the
 * end of the string. By default the `value` will match only at the end of the string.
 * @param {Boolean} [ignoreCase=true] Pass `false` to make the `RegExp` case
 * sensitive (removes the 'i' flag).
 * @return {Number} The matched index or -1 if not found.
 * @since 5.0.0
 */

/**
 * @method findIndexBy
 * Find the index of the first matching object in this collection by a function.
 * If the function returns `true` it is considered a match.
 * @param {Function} fn The function to be called.
 * @param {Object} fn.item The collection item.
 * @param {String} fn.key The key of collection item.
 * @param {Object} [scope=this] The scope (`this` reference) in which the function
 * is executed. Defaults to this collection.
 * @param {Number} [start=0] The index at which to start searching.
 * @return {Number} The matched index or -1
 * @since 5.0.0
 */

/**
 * @method first
 * Returns the first item in the collection.
 * @param {Boolean} [grouped] `true` to extract the first item in each group. Only applies if
 * a {@link #grouper} is active in the collection.
 * @return {Object} The first item in the collection. If the grouped parameter is passed,
 * see {@link #aggregateByGroup} for information on the return type.
 * @since 5.0.0
 */

/**
 * @method last
 * Returns the last item in the collection.
 * @param {Boolean} [grouped] `true` to extract the first item in each group. Only applies if
 * a {@link #grouper} is active in the collection.
 * @return {Object} The last item in the collection. If the grouped parameter is passed,
 * see {@link #aggregateByGroup} for information on the return type.
 * @since 5.0.0
 */

/**
 * @method get
 * Returns the item associated with the passed key.
 * @param {String/Number} key The key of the item.
 * @return {Object} The item associated with the passed key.
 * @since 5.0.0
 */

/**
 * @method getAt
 * Returns the item at the specified index.
 * @param {Number} index The index of the item.
 * @return {Object} The item at the specified index.
 * @since 5.0.0
 */

/**
 * @method getByKey
 * Returns the item associated with the passed key.
 * @param {String/Number} key The key of the item.
 * @return {Object} The item associated with the passed key.
 * @since 5.0.0
 */

/**
 * @method getCount
 * Returns the number of items in the collection.
 * @return {Number} the number of items in the collection.
 * @since 5.0.0
 */

/**
 * @method getKey
 * A function which will be called, passing an object belonging to this collection.
 * The function should return the key by which that object will be indexed. This key
 * must be unique to this item as only one item with this key will be retained.
 *
 * The default implementation looks basically like this (give or take special case
 * handling of 0):
 *
 *      function getKey (item) {
 *          return item.id || item._id || item.getId();
 *      }
 *
 * You can provide your own implementation by passing the `keyFn` config.
 *
 * For example, to hold items that have a unique "name" property:
 *
 *     var elementCollection = new Ext.util.Collection({
 *         keyFn: function (item) {
 *             return item.name;
 *         }
 *     });
 *
 * The collection can have `extraKeys` if items need to be quickly looked up by other
 * (potentially non-unique) properties.
 *
 * @param {Object} item The item.
 * @return {Object} The key for the passed item.
 * @since 5.0.0
 */

/**
 * @method getRange
 * Returns a range of items in this collection
 * @param {Number} [begin=0] The index of the first item to get.
 * @param {Number} [end] The ending index. The item at this index is *not* included.
 * @return {Array} An array of items
 * @since 5.0.0
 */

/**
 * @method getSource
 * Returns all unfiltered items in the Collection when the Collection has been
 * filtered.  Returns `null` when the Collection is not filtered.
 * @return {Ext.util.Collection} items All unfiltered items (or `null` when the
 * Collection is not filtered)
 */

/**
 * @method getValues
 * Returns an array of values for the specified (sub) property.
 *
 * For example, to get an array of "name" properties from a collection of records (of
 * `Ext.data.Model` objects):
 *
 *      var names = collection.getValues('name', 'data');
 *
 * @param {String} property The property to collect on
 * @param {String} [root] 'root' property to extract the first argument from. This is
 * used mainly when operating on fields in records, where the fields are all stored
 * inside the 'data' object.
 * @return {Array} The values.
 * @param {Number} [start=0] The index of the first item to include.
 * @param {Number} [end] The index at which to stop getting values. The value of this
 * item is *not* included.
 * @return {Object[]} The array of values.
 * @since 5.0.0
 */

/**
 * @method indexOf
 * Returns index within the collection of the passed Object.
 * @param {Object} item The item to find.
 * @return {Number} The index of the item or -1 if not found.
 * @since 5.0.0
 */

/**
 * @method indexOfKey
 * Returns index within the collection of the passed key.
 * @param {Object} key The key to find.
 * @return {Number} The index of the item or -1 if not found.
 * @since 5.0.0
 */

/**
 * @method insert
 * Inserts one or more items to the collection. The `index` value is the position at
 * which the first item will be placed. The items starting at that position will be
 * shifted to make room.
 *
 * @param {Number} index The index at which to insert the item(s).
 * @param {Object/Object[]} item The item or items to add.
 * @return {Object/Object[]} The item or items added.
 * @since 5.0.0
 */

/**
 * @method itemChanged
 * This method should be called when an item in this collection has been modified. If
 * the collection is sorted or filtered the result of modifying an item needs to be
 * reflected in the collection. If the item's key is also being modified, it is best
 * to pass the `oldKey` to this same call rather than call `updateKey` separately.
 *
 * @param {Object} item The item that was modified.
 * @param {String[]} [modified] The names of the modified properties of the item.
 * @param {String/Number} [oldKey] Passed if the item's key was also modified.
 * @since 5.0.0
 */

/**
 * @method remove
 * Remove an item from the collection.
 * @param {Object/Object[]} item The item or items to remove.
 * @return {Number} The number of items removed.
 * @since 5.0.0
 */

/**
 * @method removeAll
 * Remove all items in the collection.
 * @return {Ext.util.Collection} This object.
 * @since 5.0.0
 */

/**
 * @method removeAt
 * Remove an item from a specified index in the collection.
 * @param {Number} index The index within the collection of the item to remove.
 * @param {Number} [count=1] The number of items to remove.
 * @return {Object/Number} If `count` was 1 and the item was removed, that item is
 * returned. Otherwise the number of items removed is returned.
 * @since 5.0.0
 */

/**
 * @method removeByKey
 * Removes the item associated with the passed key from the collection.
 * @param {String} key The key of the item to remove.
 * @return {Object} Only returned if removing at a specified key. The item removed or
 * `false` if no item was removed.
 * @since 5.0.0
 */

/**
 * @method splice
 * This method is basically the same as the JavaScript Array splice method.
 *
 * Negative indexes are interpreted starting at the end of the collection. That is,
 * a value of -1 indicates the last item, or equivalent to `length - 1`.
 *
 * @param {Number} index The index at which to add or remove items.
 * @param {Number/Object[]} toRemove The number of items to remove or an array of the
 * items to remove.
 * @param {Object[]} [toAdd] The items to insert at the given `index`.
 * @since 5.0.0
 */

/**
 * @method update
 * This method calls the supplied function `fn` between `beginUpdate` and `endUpdate`
 * calls.
 *
 *      collection.update(function () {
 *          // Perform multiple collection updates...
 *
 *          collection.add(item);
 *          // ...
 *
 *          collection.insert(index, otherItem);
 *          //...
 *
 *          collection.remove(someItem);
 *      });
 *
 * @param {Function} fn The function to call that will modify this collection.
 * @param {Ext.util.Collection} fn.collection This collection.
 * @param {Object} [scope=this] The `this` pointer to use when calling `fn`.
 * @return {Object} Returns the value returned from `fn` (typically `undefined`).
 * @since 5.0.0
 */

/**
 * @method updateKey
 * Change the key for an existing item in the collection. If the old key does not
 * exist this call does nothing. Even so, it is highly recommended to *avoid* calling
 * this method for an `item` that is not a member of this collection.
 *
 * @param {Object} item The item whose key has changed. The `item` should be a member
 * of this collection.
 * @param {String} oldKey The old key for the `item`.
 * @since 5.0.0
 */

/**
 * @method average
 * Averages property values from some or all of the items in this collection.
 *
 * @param {String} property The name of the property to average from each item.
 * @param {Number} [begin] The index of the first item to include in the average.
 * @param {Number} [end] The index at which to stop averaging `items`. The item at
 * this index will *not* be included in the average.
 * @return {Object} The result of averaging the specified property from the indicated
 * items.
 * @since 5.0.0
 */

/**
 * @method averageByGroup
 * See {@link #average}. The result is partitioned by group.
 *
 * @param {String} property The name of the property to average from each item.
 * @return {Object} The result of {@link #average}, partitioned by group. See {@link #aggregateByGroup}.
 * @since 5.0.0
 */

/**
 * @method bounds
 * Determines the minimum and maximum values for the specified property over some or
 * all of the items in this collection.
 *
 * @param {String} property The name of the property from each item.
 * @param {Number} [begin] The index of the first item to include in the bounds.
 * @param {Number} [end] The index at which to stop in `items`. The item at this index
 * will *not* be included in the bounds.
 * @return {Array} An array `[min, max]` with the minimum and maximum of the specified
 * property.
 * @since 5.0.0
 */

/**
 * @method boundsByGroup
 * See {@link #bounds}. The result is partitioned by group.
 *
 * @param {String} property The name of the property from each item.
 * @return {Object} The result of {@link #bounds}, partitioned by group. See {@link #aggregateByGroup}.
 * @since 5.0.0
 */

/**
 * @method count
 * Determines the number of items in the collection.
 *
 * @return {Number} The number of items.
 * @since 5.0.0
 */

/**
 * @method countByGroup
 * See {@link #count}. The result is partitioned by group.
 *
 * @return {Object} The result of {@link #count}, partitioned by group. See {@link #aggregateByGroup}.
 * @since 5.0.0
 */

/**
 * @method extremes
 * Finds the items with the minimum and maximum for the specified property over some
 * or all of the items in this collection.
 *
 * @param {String} property The name of the property from each item.
 * @param {Number} [begin] The index of the first item to include.
 * @param {Number} [end] The index at which to stop in `items`. The item at this index
 * will *not* be included.
 * @return {Array} An array `[minItem, maxItem]` with the items that have the minimum
 * and maximum of the specified property.
 * @since 5.0.0
 */

/**
 * @method extremesByGroup
 * See {@link #extremes}. The result is partitioned by group.
 *
 * @param {String} property The name of the property from each item.
 * @return {Object} The result of {@link #extremes}, partitioned by group. See {@link #aggregateByGroup}.
 * @since 5.0.0
 */

/**
 * @method max
 * Determines the maximum value for the specified property over some or all of the
 * items in this collection.
 *
 * @param {String} property The name of the property from each item.
 * @param {Number} [begin] The index of the first item to include in the maximum.
 * @param {Number} [end] The index at which to stop in `items`. The item at this index
 * will *not* be included in the maximum.
 * @return {Object} The maximum of the specified property from the indicated items.
 * @since 5.0.0
 */

/**
 * @method maxByGroup
 * See {@link #max}. The result is partitioned by group.
 *
 * @param {String} property The name of the property from each item.
 * @return {Object} The result of {@link #max}, partitioned by group. See {@link #aggregateByGroup}.
 * @since 5.0.0
 */

/**
 * @method maxItem
 * Finds the item with the maximum value for the specified property over some or all
 * of the items in this collection.
 *
 * @param {String} property The name of the property from each item.
 * @param {Number} [begin] The index of the first item to include in the maximum.
 * @param {Number} [end] The index at which to stop in `items`. The item at this index
 * will *not* be included in the maximum.
 * @return {Object} The item with the maximum of the specified property from the
 * indicated items.
 * @since 5.0.0
 */

/**
 * @method maxItemByGroup
 * See {@link #maxItem}. The result is partitioned by group.
 *
 * @param {String} property The name of the property from each item.
 * @return {Object} The result of {@link #maxItem}, partitioned by group. See {@link #aggregateByGroup}.
 * @since 5.0.0
 */

/**
 * @method min
 * Determines the minimum value for the specified property over some or all of the
 * items in this collection.
 *
 * @param {String} property The name of the property from each item.
 * @param {Number} [begin] The index of the first item to include in the minimum.
 * @param {Number} [end] The index at which to stop in `items`. The item at this index
 * will *not* be included in the minimum.
 * @return {Object} The minimum of the specified property from the indicated items.
 * @since 5.0.0
 */

/**
 * @method minByGroup
 * See {@link #min}. The result is partitioned by group.
 *
 * @param {String} property The name of the property from each item.
 * @return {Object} The result of {@link #min}, partitioned by group. See {@link #aggregateByGroup}.
 * @since 5.0.0
 */

/**
 * @method minItem
 * Finds the item with the minimum value for the specified property over some or all
 * of the items in this collection.
 *
 * @param {String} property The name of the property from each item.
 * @param {Number} [begin] The index of the first item to include in the minimum.
 * @param {Number} [end] The index at which to stop in `items`. The item at this index
 * will *not* be included in the minimum.
 * @return {Object} The item with the minimum of the specified property from the
 * indicated items.
 * @since 5.0.0
 */

/**
 * @method minItemByGroup
 * See {@link #minItem}. The result is partitioned by group.
 *
 * @param {String} property The name of the property from each item.
 * @return {Object} The result of {@link #minItem}, partitioned by group. See {@link #aggregateByGroup}.
 * @since 5.0.0
 */

/**
 * @method sum
 * Sums property values from some or all of the items in this collection.
 *
 * @param {String} property The name of the property to sum from each item.
 * @param {Number} [begin] The index of the first item to include in the sum.
 * @param {Number} [end] The index at which to stop summing `items`. The item at this
 * index will *not* be included in the sum.
 * @return {Object} The result of summing the specified property from the indicated
 * items.
 * @since 5.0.0
 */

/**
 * @method sumByGroup
 * See {@link #sum}. The result is partitioned by group.
 *
 * @param {String} property The name of the property to sum from each item.
 * @return {Object} The result of {@link #sum}, partitioned by group. See {@link #aggregateByGroup}.
 * @since 5.0.0
 */

/**
 * @method getFilterFn
 * Returns the filter function.
 * @return {Function} sortFn The sort function.
 */

/**
 * @method getFilters
 * Returns the `Ext.util.FilterCollection`. Unless `autoCreate` is explicitly passed
 * as `false` this collection will be automatically created if it does not yet exist.
 * @param [autoCreate=true] Pass `false` to disable auto-creation of the collection.
 * @return {Ext.util.FilterCollection} The collection of filters.
 */

/**
 * @method isItemFiltered
 * This method can be used to conveniently test whether an individual item would be
 * removed due to the current filter.
 * @param {Object} item The item to test.
 * @return {Boolean} The value `true` if the item would be "removed" from the
 * collection due to filters or `false` otherwise.
 */

/**
 * @method onFilterChange
 * Called after a change of the filter is complete.
 *
 * For example:
 *
 *      onFilterChange: function (filters) {
 *          if (this.filtered) {
 *              // process filters
 *          } else {
 *              // no filters present
 *          }
 *      }
 *
 * @template
 * @param {Ext.util.FilterCollection} filters The filters collection.
 */

/**
 * @method getSortFn
 * Returns an up to date sort function.
 * @return {Function} The sort function.
 */

/**
 * @method getSorters
 * Returns the `Ext.util.SorterCollection`. Unless `autoCreate` is explicitly passed
 * as `false` this collection will be automatically created if it does not yet exist.
 * @param [autoCreate=true] Pass `false` to disable auto-creation of the collection.
 * @return {Ext.util.SorterCollection} The collection of sorters.
 */

/**
 * @method onSortChange
 * Called after a change of the sort is complete.
 *
 * For example:
 *
 *      onSortChange: function (sorters) {
 *          if (this.sorted) {
 *              // process sorters
 *          } else {
 *              // no sorters present
 *          }
 *      }
 *
 * @template
 * @param {Ext.util.SorterCollection} sorters The sorters collection.
 */

/**
 * @method sort
 * Updates the sorters collection and triggers sorting of this Sortable.
 *
 * For example:
 *
 *     //sort by a single field
 *     myStore.sort('myField', 'DESC');
 *
 *     //sorting by multiple fields
 *     myStore.sort([{
 *         property : 'age',
 *         direction: 'ASC'
 *     }, {
 *         property : 'name',
 *         direction: 'DESC'
 *     }]);
 *
 * When passing a single string argument to sort, the `direction` is maintained for
 * each field and is toggled automatically. So this code:
 *
 *     store.sort('myField');
 *     store.sort('myField');
 *
 * Is equivalent to the following:
 *
 *     store.sort('myField', 'ASC');
 *     store.sort('myField', 'DESC');
 *
 * @param {String/Function/Ext.util.Sorter[]} [property] Either the name of a property
 * (such as a field of a `Ext.data.Model` in a `Store`), an array of configurations
 * for `Ext.util.Sorter` instances or just a comparison function.
 * @param {String} [direction] The direction by which to sort the data. This parameter
 * is only valid when `property` is a String, otherwise the second parameter is the
 * `mode`.
 * @param {String} [mode="replace"] Where to put new sorters in the collection. This
 * should be one the following values:
 *
 * * `**replace**` : The new sorter(s) become the sole sorter set for this Sortable.
 *   This is the most useful call mode to programmatically sort by multiple fields.
 *
 * * `**prepend**` : The new sorters are inserted as the primary sorters. The sorter
 *   collection length must be controlled by the developer.
 *
 * * `**multi**` : Similar to `**prepend**` the new sorters are inserted at the front
 *   of the collection of sorters. Following the insertion, however, this mode trims
 *   the sorter collection to enforce the `multiSortLimit` config. This is useful for
 *   implementing intuitive "Sort by this" user interfaces.
 *
 * * `**append**` : The new sorters are added at the end of the collection.
 * @return {Ext.util.Collection} This instance.
 */

/**
 * @method sortData
 * This method will sort an array based on the currently configured {@link #sorters}.
 * @param {Array} data The array you want to have sorted.
 * @return {Array} The array you passed after it is sorted.
 */

/**
 * @method sortItems
 * Sorts the items of the collection using the supplied function. This should only be
 * called for collections that have no `sorters` defined.
 * @param {Function} sortFn The function by which to sort the items.
 * @since 5.0.0
 */
