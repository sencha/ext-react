/**
 * @class Ext.grid.cell.Cell
 * @extend Ext.grid.cell.Text
 * @xtype gridcell
 *
 * This is the default cell class for {@link Ext.grid.Grid grid} cells. Use this class if
 * you use the {@link Ext.grid.column.Column#renderer} or {@link Ext.grid.column.Column#tpl}
 * configs for a column.
 *
 * {@link Ext.grid.Row Rows} create cells based on the {@link Ext.grid.column.Column#cell}
 * config. Application code would rarely create cells directly.
 */

/**
 * @cfg {String/String[]/Ext.XTemplate} [tpl=null]
 * An {@link Ext.XTemplate XTemplate}, or an XTemplate *definition string* to use
 * to process a {@link Ext.data.Model records} data to produce a cell's rendered
 * value.
 *
 * This config is only processed if the {@link #cell} type is the default of
 * {@link Ext.grid.cell.Cell gridcell}.
 *
 * **Note** See {@link Ext.grid.Grid} documentation for other, better alternatives
 * to rendering cell content.
 * @accessor
 */

/**
 * @cfg {Function/String} [renderer=null]
 * A renderer is a method which can be used to transform data (value, appearance, etc.)
 * before it is rendered.
 *
 * For example:
 *
 *      {
 *          text: 'Some column',
 *          dataIndex: 'fieldName',
 *
 *          renderer: function (value, record) {
 *              if (value === 1) {
 *                  return '1 person';
 *              }
 *              return value + ' people';
 *          }
 *      }
 *
 * If a string is supplied, it should be the name of a renderer method from the
 * appropriate {@link Ext.app.ViewController}.
 *
 * This config is only processed if the {@link #cell} type is the default of
 * {@link Ext.grid.cell.Cell gridcell}.
 *
 * **Note** See {@link Ext.grid.Grid} documentation for other, better alternatives
 * to rendering cell content.
 *
 * @cfg {Object} renderer.value The data value for the current cell.
 * @cfg {Ext.data.Model} renderer.record The record for the current row.
 * @cfg {Number} renderer.dataIndex The dataIndex of the current column.
 * @cfg {Ext.grid.cell.Base} renderer.cell The current cell.
 * @cfg {Ext.grid.column.Column} renderer.column The current column.
 * @cfg {String} renderer.return The HTML string to be rendered.
 * @accessor
 */

/**
 * @cfg {String} [formatter=null]
 * This config accepts a format specification as would be used in a `Ext.Template`
 * formatted token. For example `'round(2)'` to round numbers to 2 decimal places
 * or `'date("Y-m-d")'` to format a Date.
 *
 * In previous releases the `renderer` config had limited abilities to use one
 * of the `Ext.util.Format` methods but `formatter` now replaces that usage and
 * can also handle formatting parameters.
 *
 * When the value begins with `"this."` (for example, `"this.foo(2)"`), the
 * implied scope on which "foo" is found is the `scope` config for the column.
 *
 * If the `scope` is not given, or implied using a prefix of `"this"`, then either the
 * {@link #method-getController ViewController} or the closest ancestor component configured
 * as {@link #defaultListenerScope} is assumed to be the object with the method.
 * @accessor
 * @since 6.2.0
 */

/**
 * @cfg {Object} [scope=null]
 * The scope to use when calling the {@link #renderer} or {@link #formatter} function.
 * @accessor
 */
