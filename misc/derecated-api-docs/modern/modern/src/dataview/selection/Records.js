/**
 * @class Ext.dataview.selection.Records
 * @extend Ext.dataview.selection.Rows
 * @alias selection.records
 * A class which encapsulates a collections of records defining a selection in a {@link Ext.dataview.DataView}
 */

/**
 * @method isSelected
 * Returns `true` if the passed {@link Ext.data.Model record} is selected.
 * @param {Ext.data.Model} record The record to test.
 * @return {Boolean} `true` if the passed {@link Ext.data.Model record} is selected.
 */

/**
 * @method getRecords
 * Returns the records selected.
 * @return {Ext.data.Model[]} The records selected.
 */

/**
 * @method getFirstRowIndex
 * @return {Number} The row index of the first row in the range or zero if no range.
 */

/**
 * @method getLastRowIndex
 * @return {Number} The row index of the last row in the range or -1 if no range.
 */

/**
 * @method beginUpdate
 * This method is called to indicate the start of multiple changes to the selected record set.
 *
 * Internally this method increments a counter that is decremented by `{@link #endUpdate}`. It
 * is important, therefore, that if you call `beginUpdate` directly you match that
 * call with a call to `endUpdate` or you will prevent the collection from updating
 * properly.
 */

/**
 * @method endUpdate
 * This method is called after modifications are complete on a selected row set. For details
 * see `{@link #beginUpdate}`.
 */

/**
 * @method refresh
 * Called when the store is reloaded, or the data is mutated to synchronize the
 * selected collection with what is now in the store.
 */
