/**
 * @class Ext.grid.cell.Base
 * @extend Ext.Widget
 *
 * This is the base class for {@link Ext.grid.Grid grid} cells.
 *
 * {@link Ext.grid.Row Rows} create cells based on the {@link Ext.grid.column.Column#cell}
 * config. Application code would rarely create cells directly.
 */

/**
 * @cfg {"left"/"center"/"right"} [align=null]
 * The value for the `text-align` of the cell content.
 */

/**
 * @cfg {String} [cls=null]
 * An arbitrary CSS class to add to the cell's outermost element.
 */

/**
 * @cfg {String} [bodyCls=null]
 * An arbitrary CSS class to add to the cell's inner element (the element that
 * typically contains the cell's text).
 */

/**
 * @cfg {String/Object} [bodyStyle=null]
 * Additional CSS styles that will be rendered into the cell's inner element (the element
 * that typically contains the cell's text).
 *
 * You can pass either a string syntax:
 *
 *     bodyStyle: 'background:red'
 *
 * Or by using an object:
 *
 *     bodyStyle: {
 *         background: 'red'
 *     }
 *
 * When using the object syntax, you can define CSS Properties by using a string:
 *
 *     bodyStyle: {
 *         'border-left': '1px solid red'
 *     }
 *
 * Although the object syntax is much easier to read, we suggest you to use the
 * string syntax for better performance.
 */

/**
 * @cfg {Mixed} [value=null]
 * The value of the {@link Ext.grid.column.Column#dataIndex dataIndex} field of
 * the associated record. Application code should not need to set this value.
 * @accessor
 */
