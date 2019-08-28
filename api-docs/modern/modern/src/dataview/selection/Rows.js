/**
 * @class Ext.dataview.selection.Rows
 * @extend Ext.dataview.selection.Selection
 * @alias selection.rows
 * A class which encapsulates a range of rows defining a selection in a grid.
 *
 */
/**
 * @property {Boolean} isRows
 * This property indicates the this selection represents selected rows.
 * @readonly
 */

/**
 * @cfg {Ext.util.Spans} selected
 * A cache of start/end row ranges which encpsulates the selected rows.
 * @readonly
 */

/**
* Returns `true` if the passed {@link Ext.data.Model record} is selected.
* @param {Ext.data.Model} record The record to test.
* @return {Boolean} `true` if the passed {@link Ext.data.Model record} is selected.
*/


/**
* Returns the number of records selected
* @return {Number} The number of records selected.
*/


/**
* @return {Number} The row index of the first row in the range or zero if no range.
*/


/**
* @return {Number} The row index of the last row in the range or -1 if no range.
*/


/**
 * @private
 */


/**
 * @return {Boolean}
 * @private
 */

/**
 * Used during drag/shift+downarrow range selection on start.
 * @param {Number} start The start row index of the row drag selection.
 * @private
 */

/**
 * Used during drag/shift+downarrow range selection on change of row.
 * @param {Number} end The end row index of the row drag selection.
 * @private
 */


/**
 * Called at the end of a drag, or shift+downArrow row range select.
 * The record range delineated by the start and end row indices is added to the
 * selected Collection.
 * @private
 */

/**
 * @return {Number[]}
 * @private
 */

/**
 * Returns the size of the mousedown+drag, or SHIFT+arrow selection range.
 * @return {Number}
 * @private
 */


/**
 * Update view selection on `single` selectable mode.
 * @param {Ext.data.Model/null} record Selected row record,
 * if `null` remove selected record
 * @private
 */

/**
 * Acquires or releases the lock to the page.
 * Utility method only called from manageSelection.
 * @param {Ext.data.virtual.Store} store View store.
 * @param {Ext.data.Model} record Selected record
 * @param {Number} delta A value of `1` to lock or `-1` to release.
 * @private
 */
