/**
 * @class Ext.util.Sortable
 * @extend Ext.Base
 * A mixin which allows a data component to be sorted. This is used by e.g. {@link Ext.data.Store} and {@link Ext.data.TreeStore}.
 *
 * **NOTE**: This mixin is mainly for internal use and most users should not need to use it directly. It
 * is more likely you will want to use one of the component classes that import this mixin, such as
 * {@link Ext.data.Store} or {@link Ext.data.TreeStore}.
 */

/**
 * @property {Boolean} [isSortable=true]
 * `true` in this class to identify an object as an instantiated Sortable, or subclass thereof.
 */

/**
 * @cfg {Ext.util.Sorter[]/Object[]} [sorters=null]
 * The initial set of {@link Ext.util.Sorter Sorters}.
 *
 *     sorters: [{
 *         property: 'age',
 *         direction: 'DESC'
 *     }, {
 *         property: 'firstName',
 *         direction: 'ASC'
 *     }]
 *
 * @accessor
 */

/**
 * @cfg {String} [defaultSortDirection="ASC"]
 * The default sort direction to use if one is not specified.
 */

/**
 * @event beforesort
 * Fires before a sort occurs.
 * @param {Ext.util.Sortable} me This object.
 * @param {Ext.util.Sorter[]} sorters The collection of Sorters being used to generate the comparator function.
 */

/**
 * @cfg {Number} [multiSortLimit=3]
 * The maximum number of sorters which may be applied to this Sortable when using the "multi" insertion position
 * when adding sorters.
 *
 * New sorters added using the "multi" insertion position are inserted at the top of the sorters list becoming the
 * new primary sort key.
 *
 * If the sorters collection has grown to longer then **`multiSortLimit`**, then the it is trimmed.
 *
 */

/**
 * @method createComparator
 * @static
 * Creates a single comparator function which encapsulates the passed Sorter array.
 * @param {Ext.util.Sorter[]} sorters The sorter set for which to create a comparator function
 * @return {Function} a function, which when passed two comparable objects returns the result
 * of the whole sorter comparator functions.
 */

/**
 * @cfg {String} sortRoot
 * The property in each item that contains the data to sort.
 */

/**
 * @method sort
 * Updates the sorters collection and triggers sorting of this Sortable. Example usage:
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
 * Classes which use this mixin must implement a **`soSort`** method which accepts a comparator function computed from
 * the full sorter set which performs the sort in an implementation-specific way.
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
 * @param {String/Ext.util.Sorter[]} [sorters] Either a string name of one of the fields in this Store's configured {@link Ext.data.Model Model}, or an array of sorter configurations.
 * @param {String} [direction="ASC"] The overall direction to sort the data by.
 * @param {String} [insertionPosition="replace"] Where to put the new sorter in the collection of sorters.
 * This may take the following values:
 *
 * * `replace` : This means that the new sorter(s) becomes the sole sorter set for this Sortable. This is the most useful call mode
 *           to programatically sort by multiple fields.
 *
 * * `prepend` : This means that the new sorters are inserted as the primary sorters, unchanged, and the sorter list length must be controlled by the developer.
 *
 * * `multi` :  This is mainly useful for implementing intuitive "Sort by this" user interfaces such as the {@link Ext.grid.Panel GridPanel}'s column sorting UI.
 *
 *     This mode is only supported when passing a property name and a direction.
 *
 *     This means that the new sorter is becomes the primary sorter. If the sorter was **already** the primary sorter, the direction
 *     of sort is toggled if no direction parameter is specified.
 *
 *     The number of sorters maintained is limited by the {@link #multiSortLimit} configuration.
 *
 * * `append` : This means that the new sorter becomes the last sorter.
 * @param {Boolean} doSort True to sort using a generated sorter function that combines all of the Sorters passed
 * @return {Ext.util.Sorter[]} The new sorters.
 */

/**
 * @method generateComparator
 * Returns a comparator function which compares two items and returns -1, 0, or 1 depending
 * on the currently defined set of {@link #cfg-sorters}.
 *
 * If there are no {@link #cfg-sorters} defined, it returns a function which returns `0` meaning
 * that no sorting will occur.
 */
