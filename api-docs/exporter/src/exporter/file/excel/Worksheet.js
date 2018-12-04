/**
 * @class Ext.exporter.file.excel.Worksheet
 * @extend Ext.exporter.file.Base
 * This class is used to create an xml Excel Worksheet
 */

/**
 * @cfg {String} [name='Sheet'] (required)
 *
 * This value must be unique within the list of sheet names in the workbook. Sheet names must conform to
 * the legal names of Excel sheets and, thus, cannot contain /, \, ?, *, [, ] and are limited to 31 chars.
 * @accessor
 */

/**
 * @cfg {Boolean} [protection=null]
 *
 * This attribute indicates whether or not the worksheet is protected. When the worksheet is
 * not protected, cell-level protection has no effect.
 * @accessor
 */

/**
 * @cfg {Boolean} [rightToLeft=null]
 *
 * If this attribute is `true`, the window displays from right to left, but if this element is not
 * specified (or `false`), the window displays from left to right. The Spreadsheet component does not
 * support this attribute.
 * @accessor
 */

/**
 * @cfg {Boolean} [showGridLines=true]
 *
 * Should grid lines be visible in this spreadsheet?
 * @accessor
 */

/**
 * @cfg {Ext.exporter.file.excel.Table[]} [tables=[]]]
 *
 * Collection of tables available in this worksheet
 * @accessor
 */

/**
 * @method getTables
 * @return {Ext.util.Collection}
 *
 * Returns the collection of tables available in this worksheet
 */

/**
 * @method addTable
 * Convenience method to add tables. You can also use workbook.getTables().add(config).
 * @param {Object/Array} config
 * @return {Ext.exporter.file.excel.Table/Ext.exporter.file.excel.Table[]}
 */

/**
 * @method getTable
 * Convenience method to fetch a table by its id.
 * @param id
 * @return {Ext.exporter.file.excel.Table}
 */
