/**
 * @class Ext.grid.cell.Boolean
 * @extend Ext.grid.cell.Text
 * @xtype booleancell
 *
 * This class displays a boolean value in a {@link Ext.grid.Grid grid} cell. This cell type
 * is typically used by specifying {@link Ext.grid.column.Boolean} column type.
 *
 * {@link Ext.grid.Row Rows} create cells based on the {@link Ext.grid.column.Column#cell}
 * config. Application code would rarely create cells directly.
 */

/**
 * @cfg {String} [falseText='False']
 * The string to display when the value is falsey (but not undefined).
 * @accessor
 */

/**
 * @cfg {String} [trueText='True']
 * The string to display when the value is not falsey.
 * @accessor
 */

/**
 * @cfg {String} [undefinedText='']
 * The string to display when the column value is `undefined`.
 * @accessor
 */
