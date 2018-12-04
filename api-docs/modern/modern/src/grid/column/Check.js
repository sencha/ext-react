/**
 * @class Ext.grid.column.Check
 * @extend Ext.grid.column.Column
 * @xtype checkcolumn
 *
 * A Column subclass which renders a checkbox in each column cell which toggles the
 * truthiness of the associated data field on click.
 */

/**
 * @cfg {String} align
 * @hide
 */

/**
 * @cfg {Boolean} [stopSelection=true]
 * Prevent grid selection upon tap.
 * @accessor
 */

/**
 * @cfg {Boolean} [headerCheckbox=null]
 * Configure as `true` to display a checkbox below the header text.
 *
 * Clicking the checkbox will check/uncheck all records.
 * @accessor
 */

/**
 * @cfg {Boolean} [menuDisabled=true]
 * Column menu is disabled by default for check columnd.
 */

/**
 * @event beforecheckchange
 * Fires when the UI requests a change of check status.
 * The change may be vetoed by returning `false` from a listener.
 * @param {Ext.grid.cell.Check} this The cell changing its state.
 * @param {Number} rowIndex The row index.
 * @param {Boolean} checked `true` if the box is to be checked.
 * @param {Ext.data.Model} record The record to be updated.
 * @param {Ext.event.Event} e The underlying event which caused the check change.
 * @param {Ext.grid.CellContext} e.position A {@link Ext.grid.CellContext CellContext} object
 * containing all contextual information about where the event was triggered.
 */

/**
 * @event checkchange
 * Fires when the UI has successfully changed the checked state of a row.
 * @param {Ext.grid.cell.Check} this The cell changing its state.
 * @param {Number} rowIndex The row index.
 * @param {Boolean} checked `true` if the box is now checked.
 * @param {Ext.data.Model} record The record which was updated.
 * @param {Ext.event.Event} e The underlying event which caused the check change.
 * @param {Ext.grid.CellContext} e.position A {@link Ext.grid.CellContext CellContext} object
 */
