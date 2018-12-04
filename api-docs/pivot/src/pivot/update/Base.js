/**
 * @class Ext.pivot.update.Base
 * @extend Ext.mixin.Observable
 * @alias pivotupdate.base
 *
 * This class defines an update operation that occurs on records belonging to a
 * {@link Ext.pivot.result.Base result}.
 *
 * This class should be extended to provide the update operation algorithm.
 *
 * How does such an update work?
 *
 * The {@link Ext.pivot.result.Base result object} contains an array of records that participate
 * in the result aggregation. The {@link #value} is used to update all these records on the
 * {@link #dataIndex} field.
 *
 * **Note:** These updaters are used by the {@link Ext.pivot.plugin.RangeEditor} plugin.
 */

/**
 * @cfg {String} [leftKey=null] (required)
 *
 * Key of left axis item or grandTotalKey
 * @accessor
 */
/**
 * @cfg {String} [topKey=null] (required)
 *
 * Key of top axis item or grandTotalKey
 * @accessor
 */
/**
 * @cfg {Ext.pivot.matrix.Base} [matrix=null] (required)
 *
 * Reference to the matrix object
 * @accessor
 */
/**
 * @cfg {String} [dataIndex=null] (required)
 *
 * Field that needs to be updated on all records found on the {@link Ext.pivot.result.Base matrix result}.
 * @accessor
 */
/**
 * @cfg {Variant} [value=null]
 *
 * The new value that is set for each record found on the {@link Ext.pivot.result.Base matrix result}.
 * @accessor
 */
/**
 * @event beforeupdate
 * Fires before updating all result records.
 *
 * @param {Ext.pivot.update.Base} updater Reference to the updater object
 */

/**
 * @event update
 * Fires after updating all result records.
 *
 * @param {Ext.pivot.update.Base} updater Reference to the updater object
 */
