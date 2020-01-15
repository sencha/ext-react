/**
 * @class Ext.util.HashMap
 * @mixin Ext.mixin.Observable
 * Represents a collection of a set of key and value pairs. Each key in the HashMap
 * must be unique, the same key cannot exist twice. Access to items is provided via
 * the key only. Sample usage:
 *
 *     var map = new Ext.util.HashMap();
 *     map.add('key1', 1);
 *     map.add('key2', 2);
 *     map.add('key3', 3);
 *
 *     map.each(function(key, value, length){
 *         console.log(key, value, length);
 *     });
 *
 * The HashMap is an unordered class,
 * there is no guarantee when iterating over the items that they will be in any particular
 * order. If this is required, then use a {@link Ext.util.MixedCollection}.
 */

/**
 * @cfg {Function} keyFn
 * A function that is used to retrieve a default key for a passed object.
 * A default is provided that returns the `id` property on the object. This function is only used
 * if the `add` method is called with a single argument.
 * @accessor
 */

/**
 * @event add
 * Fires when a new item is added to the hash.
 * @param {Ext.util.HashMap} this
 * @param {String} key The key of the added item.
 * @param {Object} value The value of the added item.
 */

/**
 * @event clear
 * Fires when the hash is cleared.
 * @param {Ext.util.HashMap} this
 */

/**
 * @event remove
 * Fires when an item is removed from the hash.
 * @param {Ext.util.HashMap} this
 * @param {String} key The key of the removed item.
 * @param {Object} value The value of the removed item.
 */

/**
 * @event replace
 * Fires when an item is replaced in the hash.
 * @param {Ext.util.HashMap} this
 * @param {String} key The key of the replaced item.
 * @param {Object} value The new value for the item.
 * @param {Object} old The old value for the item.
 */
