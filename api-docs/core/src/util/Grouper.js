/**
 * @class Ext.util.Grouper
 * @extend Ext.util.Sorter
 * Represents a grouping of items. The grouper works in a similar fashion as the
 * `Ext.util.Sorter` except that groups must be able to extract a value by which all items
 * in the group can be collected. By default this is derived from the `property` config
 * but can be customized using the `groupFn` if necessary.
 *
 * All items with the same group value compare as equal. If the group values do not compare
 * equally, the sort can be controlled further by setting `sortProperty` or `sorterFn`.
 */

/**
 * @cfg {Function} groupFn
 * This function is called for each item in the collection
 * to determine the group to which it belongs. By default the `property` value is
 * used to group items.
 * @cfg {Object} groupFn.item The current item from the collection.
 * @cfg {String} groupFn.return The group identifier for the item.
 * @accessor
 */

/**
 * @cfg {String} property
 * The field by which records are grouped. Groups are
 * sorted alphabetically by group value as the default. To sort groups by a different
 * property, use the {@link #sortProperty} configuration.
 * @accessor
 */

/**
 * @cfg {String} sortProperty
 * You can set this configuration if you want the groups
 * to be sorted on something other then the group string returned by the `groupFn`.
 * This serves the same role as `property` on a normal `Ext.util.Sorter`.
 * @accessor
 */

/**
 * @method getGroupString
 * Returns the value for grouping to be used.
 * @param {Ext.data.Model} item The Model instance
 * @return {String}
 */
