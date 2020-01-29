/**
 * @class Ext.grid.cell.Text
 * @extend Ext.grid.cell.Base
 * @xtype textcell
 *
 * This is the base class for {@link Ext.grid.Grid grid} cells that contain only text.
 *
 * {@link Ext.grid.Row Rows} create cells based on the {@link Ext.grid.column.Column#cell}
 * config. Application code would rarely create cells directly.
 */

/**
 * @cfg {Boolean} [encodeHtml=true]
 * Specify `false` to write HTML directly to the cell. Be aware that doing this
 * can expose your application to security issues if that content is not known to
 * be safe. User input can contain malicious content such as `script` tags and
 * should be scrubbed before directly rendering that HTML.
 * @accessor
 */

/**
 * @cfg {String} [zeroValue=null]
 *
 * A replacement value for 0.
 *
 * If the cell value is 0 and you want to display it or hide it then you can define
 * a not null value here.
 *
 * Set it as an empty string if you want to hide cells that have 0s.
 * @accessor
 */
