/**
 * @class Ext.grid.selection.Replicator
 * @extend Ext.plugin.Abstract
 * @alias plugin.selectionreplicator
 * A plugin for use in grids which use the {@link Ext.grid.selection.SpreadsheetModel spreadsheet} selection model,
 * with {@link Ext.grid.selection.SpreadsheetModel#extensible extensible} configured as `true` or `"y"`, meaning that
 * the selection may be extended up or down using a draggable extension handle.
 *
 * This plugin propagates values from the selection into the extension area.
 *
 * If just *one* row is selected, the values in that row are replicated unchanged into the extension area.
 *
 * If more than one row is selected, the two rows closest to the selected block are taken to provide a numeric
 * difference, and that difference is used to calculate the sequence of values all the way into the extension area.
 *
 */

/**
 * @property {Ext.grid.column.Column[]} columns
 * An array of the columns encompassed by the selection block. This is gathered before {@link #replicateSelection}
 * is called, so is available to subclasses which implement their own {@link #replicateSelection} method.
 */
