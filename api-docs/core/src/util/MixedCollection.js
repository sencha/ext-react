/**
 * @class Ext.util.MixedCollection
 * @extend Ext.util.AbstractMixedCollection
 * @mixins Ext.util.Sortable
 *
 * Represents a collection of a set of key and value pairs. Each key in the MixedCollection
 * must be unique, the same key cannot exist twice. This collection is ordered, items in the
 * collection can be accessed by index  or via the key. Newly added items are added to
 * the end of the collection. This class is similar to {@link Ext.util.HashMap} however it
 * is heavier and provides more functionality. Sample usage:
 *
 *     var coll = new Ext.util.MixedCollection();
 *     coll.add('key1', 'val1');
 *     coll.add('key2', 'val2');
 *     coll.add('key3', 'val3');
 *
 *     console.log(coll.get('key1')); // prints 'val1'
 *     console.log(coll.indexOfKey('key3')); // prints 2
 *
 * The MixedCollection also has support for sorting and filtering of the values in the collection.
 *
 *     var coll = new Ext.util.MixedCollection();
 *     coll.add('key1', 100);
 *     coll.add('key2', -100);
 *     coll.add('key3', 17);
 *     coll.add('key4', 0);
 *     var biggerThanZero = coll.filterBy(function(value){
 *         return value > 0;
 *     });
 *     console.log(biggerThanZero.getCount()); // prints 2
 *
 */

/**
 * @cfg {Boolean} allowFunctions
 * Configure as `true` if the {@link #addAll} function should add function references to the collection.
 */

/**
 * @method constructor
 * @constructor
 * Creates new MixedCollection.
 * @param {Object} config A configuration object.
 * @param {Boolean} [config.allowFunctions=false] Specify `true` if the {@link #addAll}
 * function should add function references to the collection.
 * @param {Function} [config.getKey] A function that can accept an item of the type(s) stored in this MixedCollection
 * and return the key value for that item.  This is used when available to look up the key on items that
 * were passed without an explicit key parameter to a MixedCollection method.  Passing this parameter is
 * equivalent to overriding the {@link #method-getKey} method.
 */

/**
 * @method sortBy
 * Sorts the collection by a single sorter function
 * @param {Function} sorterFn The function to sort by
 */

/**
 * @method findInsertionIndex
 * Calculates the insertion index of the new item based upon the comparison function passed, or the current sort order.
 * @param {Object} newItem The new object to find the insertion position of.
 * @param {Function} [sorterFn] The function to sort by. This is the same as the sorting function
 * passed to {@link #sortBy}. It accepts 2 items from this MixedCollection, and returns -1 0, or 1
 * depending on the relative sort positions of the 2 compared items.
 *
 * If omitted, a function {@link #generateComparator generated} from the currently defined set of
 * {@link #cfg-sorters} will be used.
 *
 * @return {Number} The insertion point to add the new item into this MixedCollection at using {@link #insert}
 */

/**
 * @method reorder
 * @inheritdoc Ext.util.AbstractMixedCollection#method-reorder
 */

/**
 * @method sortByKey
 * Sorts this collection by <b>key</b>s.
 * @param {String} direction (optional) 'ASC' or 'DESC'. Defaults to 'ASC'.
 * @param {Function} fn (optional) Comparison function that defines the sort order.
 * Defaults to sorting by case insensitive string.
 */
