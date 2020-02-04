/**
 * @class Ext.util.SorterCollection
 * @extend Ext.util.Collection
 * This class provides a flexible means to control the
 * `{@link Ext.util.Collection#cfg!sorters sorters}` of a
 * `{@link Ext.util.Collection Collection}`. Instances of this class are created
 * automatically when sorters are added to added to Collections.
 *
 * This collection can be directly manipulated by application code to gain full
 * control over the sorters of the owner collection. Be aware that some components
 * create sorters internally (such as grids) so be careful in such cases to not disturb
 * these additional sorters.
 *
 * Items in this collection are `Ext.util.Sorter` instances and can be managed
 * individually by their `id`. This is the recommended way to manage application
 * filters while preserving sorter applied from other sources.
 *
 * Bulk changes to this collection should be wrapped in
 * `{@link Ext.util.Collection#method!beginUpdate beginUpdate}` and
 * `{@link Ext.util.Collection#method!endUpdate endUpdate}` (as with any collection).
 * During these bulk updates all reactions to sorter changes will be suspended.
 */

/**
 * @method getSortFn
 * Returns an up to date sort function.
 * @return {Function} The sort function.
 */
