/**
 * @class Ext.grid.Row
 * @extend Ext.Component
 * @xtype gridrow
 *
 * This class is created by a {@link Ext.grid.Grid grid} to manage each record. Rows act
 * as containers for {@link Ext.grid.cell.Base cells}.
 *
 * Row does not extend {@link Ext.Container} to keep overhead to a minimum. Application
 * code should not need to create instances of this class directly. Rows are created by
 * the {@link Ext.dataview.List} base as configured by {@link Ext.grid.Grid}.
 */

/**
 * @cfg {Object} [body=null]
 * A config object for this row's {@link Ext.grid.RowBody Row Body}.
 * When a {@link Ext.grid.plugin.RowExpander Row Expander} is used all row bodies
 * begin collapsed, and can be expanded by clicking on the row expander icon.
 * When no Row Expander is present row bodies are always expanded by default but
 * can be collapsed programmatically using {@link #collapse}.
 * @accessor
 */

/**
 * @cfg {String} [expandedField=null]
 * The name of a `boolean` field in the grid's record which is to be used to check expanded state.
 * Note that this field should be `true` to indicate expanded, and `false` to indicate collapsed.
 * By default the expanded state of a record is stored on the associated `grid` component allowing
 * that record to have different expand/collapse states on a per-grid basis.
 * @accessor
 */

/**
 * @cfg {String} [defaultCellUI=null]
 * A default {@link #ui ui} to use for {@link Ext.grid.cell.Base cells} in this row.
 * @accessor
 */
