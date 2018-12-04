/**
 * @class Ext.util.Sorter
 * Represents a single sorter that can be used as part of the sorters configuration in Ext.mixin.Sortable.
 *
 * A common place for Sorters to be used are {@link Ext.data.Store Stores}.
 */

/**
 * @cfg {String} property
 * The property to sort by. Required unless `sorterFn` is provided
 * @accessor
 */

/**
 * @cfg {Function} sorterFn
 * A specific sorter function to execute. Can be passed instead of {@link #property}.
 * This function should compare the two passed arguments, returning -1, 0 or 1 depending on if item 1 should be
 * sorted before, at the same level, or after item 2.
 *
 *     sorterFn: function(person1, person2) {
 *         return (person1.age > person2.age) ? 1 : (person1.age === person2.age ? 0 : -1);
 *     }
 *
 * @accessor
 */

/**
 * @cfg {String} root
 * Optional root property. This is mostly useful when sorting a Store, in which case we set the
 * root to 'data' to make the filter pull the {@link #property} out of the data object of each item
 * @accessor
 */

/**
 * @cfg {Function} transform
 * A function that will be run on each value before
 * it is compared in the sorter. The function will receive a single argument,
 * the value.
 * @accessor
 */

/**
 * @cfg {String} [direction="ASC"]
 * The direction to sort by. Valid values are "ASC", and "DESC".
 * @accessor
 */

/**
 * @cfg {Mixed} id
 * An optional id this sorter can be keyed by in Collections. If
 * no id is specified it will use the property name used in this Sorter. If no
 * property is specified, e.g. when adding a custom sorter function we will generate
 * a random id.
 * @accessor
 */

/**
 * @method createComparator
 * Creates a comparator function (a function that can be passed to `Array.sort`)
 * given one or more `Sorter` instances.
 *
 * The returned function retains a reference to the collection or array of sorters
 * passed. This means the function will produce a comparison based on the current
 * content of the collection or array, and not based on the content at the time of
 * this call.
 *
 * @param {Ext.util.Sorter[]/Ext.util.Collection} sorters The `Sorter` instances.
 * @param [nextFn] The next comparator function to call if all the `sorters` end
 * with equality.
 * @return {Function} The comparator function.
 */

/**
 * @method toggle
 * Toggles the direction of this Sorter. Note that when you call this function,
 * the Collection this Sorter is part of does not get refreshed automatically.
 */

/**
 * @method getState
 * Returns this sorter's state.
 * @return {Object}
 */

/**
 * @method serialize
 * Returns this sorter's serialized state. This is used when transmitting this sorter
 * to a server.
 * @return {Object}
 */
