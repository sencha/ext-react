/**
 * @class Ext.pivot.plugin.DrillDown
 * @extend Ext.plugin.Abstract
 * @alias plugin.pivotdrilldown
 * This plugin allows the user to view all records that were aggregated for a specified cell.
 *
 * The user has to double click that cell to open the records viewer.
 *
 * **Note:** If a {@link Ext.pivot.matrix.Remote} matrix is used then the plugin requires
 * a {@link #remoteStore} to be provided to fetch the records for a left/top keys pair.
 */

/**
 * Fired on the pivot component when the drill down window is visible
 *
 * @event showdrilldownpanel
 * @param {Ext.Sheet} panel Drill down sheet
 */

/**
 * Fired on the pivot component when the drill down window is hidden
 *
 * @event hidedrilldownpanel
 * @param {Ext.Sheet} panel Drill down sheet
 */

/**
 * @cfg {Ext.grid.column.Column[]} [columns=null]
 * Specify which columns should be visible in the grid.
 *
 * Use the same definition as for a grid column.
 */
/**
 * @cfg {Number} [width=500]
 *
 * Width of the viewer's window.
 * @accessor
 */

/**
 * @cfg {Ext.data.Store} [remoteStore=null]
 * Provide either a store config or a store instance when using a {@link Ext.pivot.matrix.Remote Remote} matrix on the pivot grid.
 *
 * The store will be remotely filtered to fetch records from the server.
 * @accessor
 */
