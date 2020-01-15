/**
 * @class Ext.util.FilterCollection
 * @extend Ext.util.Collection
 *
 * This class provides a flexible means to control the
 * `{@link Ext.util.Collection#cfg!filters filters}` of a
 * `{@link Ext.util.Collection Collection}`. Instances of this class are created
 * automatically when filters are added to added to Collections.
 *
 * This collection can be directly manipulated by application code to gain full
 * control over the filters of the owner collection. Be aware that some components
 * create filters internally (such as `Ext.form.field.ComboBox` and the
 * `Ext.grid.filters.Filters` plugin) so be careful in such cases to not disturb
 * these additional filters.
 *
 * Items in this collection are `Ext.util.Filter` instances and can be managed
 * individually by their `id`. This is the recommended way to manage application
 * filters while preserving filters applied from other sources.
 *
 * Bulk changes to this collection should be wrapped in
 * `{@link Ext.util.Collection#method!beginUpdate beginUpdate}` and
 * `{@link Ext.util.Collection#method!endUpdate endUpdate}` (as with any collection).
 * During these bulk updates all reactions to filter changes will be suspended.
 */

/**
 * @method filterData
 * This method will filter an array based on the currently configured `filters`.
 * @param {Array} data The array you want to have filtered.
 * @return {Array} The array you passed after it is filtered.
 */

/**
 * @method getFilterFn
 * Returns the filter function.
 * @return {Function} The filter function.
 */

/**
 * @method getFilterCount
 * returns the number of *enabled* filters in this `FilterCollection`
 * @returns {Number}
 */
