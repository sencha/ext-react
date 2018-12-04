/**
 * @class Ext.util.CollectionKey
 * @mixin Ext.mixin.Identifiable
 * Maintains an additional key map for an `Ext.util.Collection`. Instances of this class
 * are seldom created manually. Rather they are created by the `Ext.util.Collection' when
 * given an `extraKeys` config.
 *
 * @since 5.0.0
 */

/**
 * @cfg {Function/String} [keyFn]
 * A function to retrieve the key of an item in the collection. This can be normal
 * function that takes an item and returns the key or it can be the name of the
 * method to call on an item to get the key.
 *
 * For example:
 *
 *      new Ext.util.Collection({
 *          keys: {
 *              byName: {
 *                  keyFn: 'getName' // each item has a "getName" method
 *              }
 *          }
 *      });
 *
 * Or equivalently:
 *
 *      new Ext.util.Collection({
 *          keys: {
 *              byName: {
 *                  keyFn: function (item) {
 *                      return item.getName();
 *                  }
 *              }
 *          }
 *      });
 *
 * @since 5.0.0
 * @accessor
 */

/**
 * @cfg {String} property
 * The name of the property on each item that is its key.
 *
 *      new Ext.util.Collection({
 *          keys: {
 *              byName: 'name'
 *          }
 *      });
 *
 * Or equivalently:
 *
 *      new Ext.util.Collection({
 *          keys: {
 *              byName: {
 *                  property: 'name'
 *              }
 *          }
 *      });
 *
 *      var item = collection.byName.get('fooname');
 *
 * @accessor
 */

/**
 * @cfg {String} rootProperty
 * The name of the sub-object property on each item that is its key. This value
 * overrides `{@link Ext.util.Collection#rootProperty}`.
 *
 *      new Ext.util.Collection({
 *          keys: {
 *              byName: {
 *                  property: 'name',
 *                  rootProperty: 'data'
 *              }
 *          }
 *      });
 *
 *      var item = collection.byName.get('fooname');
 *
 * @accessor
 */

/**
 * @method get
 * Returns the item or, if not `unique` possibly array of items that have the given
 * key.
 * @param {Mixed} key The key that will match the `keyFn` return value or value of
 * the specified `property`.
 * @return {Object}
 */

/**
 * @method indexOf
 * Returns the index of the item with the given key in the collection. If this is not
 * a `unique` result, the index of the first item in the collection with the matching
 * key.
 *
 * To iterate the indices of all items with a matching (not `unique`) key:
 *
 *      for (index = collection.byName.indexOf('foo');
 *              index >= 0;
 *              index = collection.byName.indexOf('foo', index)) {
 *          // process item at "index"
 *      }
 *
 * @param {Mixed} key The key that will match the `keyFn` return value or value of
 * the specified `property`.
 * @param {Number} [startAt=-1] The index at which to start. Only occurrences beyond
 * this index are returned.
 * @return {Number} The index of the first item with the given `key` beyond the given
 * `startAt` index or -1 if there are no such items.
 */

/**
 * @method updateKey
 * Change the key for an existing item in the collection. If the old key does not
 * exist this call does nothing.
 * @param {Object} item The item whose key has changed.
 * @param {String} oldKey The old key for the `item`.
 * @since 5.0.0
 */
