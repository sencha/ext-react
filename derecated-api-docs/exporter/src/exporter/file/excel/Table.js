/**
 * @class Ext.exporter.file.excel.Table
 * @extend Ext.exporter.file.Base
 * This class is used to create an xml Excel Table
 */

/**
 * @cfg {Number} [defaultColumnWidth=48]
 *
 * Specifies the default width of columns in this table. This attribute is specified in points.
 * @accessor
 */

/**
 * @cfg {Number} [defaultRowHeight=12.75]
 *
 * Specifies the default height of rows in this table. This attribute is specified in points.
 * @accessor
 */

/**
 * @cfg {String} [styleId=null]
 *
 * Excel style attached to this table
 * @accessor
 */

/**
 * @cfg {Number} [leftCell=1]
 *
 * Specifies the column index that this table should be placed at. This value must be greater than zero.
 * @accessor
 */

/**
 * @cfg {Number} [topCell=1]
 *
 * Specifies the row index that this table should be placed at. This value must be greater than zero.
 * @accessor
 */

/**
 * @cfg {Ext.exporter.file.excel.Column[]} [columns=[]]
 *
 * Collection of column definitions available on this table
 * @accessor
 */

/**
 * @cfg {Ext.exporter.file.excel.Row[]} [rows=[]]
 *
 * Collection of row definitions available on this table
 * @accessor
 */

/**
 * @method getColumns
 * @return {Ext.util.Collection}
 *
 * Returns the collection of columns available in this table
 */

/**
 * @method getRows
 * @return {Ext.util.Collection}
 *
 * Returns the collection of rows available in this table
 */

/**
 * @method addColumn
 * Convenience method to add columns. You can also use workbook.getColumns().add(config).
 * @param {Object/Array} config
 * @return {Ext.exporter.file.excel.Column/Ext.exporter.file.excel.Column[]}
 */

/**
 * @method getColumn
 * Convenience method to fetch a column by its id.
 * @param id
 * @return {Ext.exporter.file.excel.Column}
 */

/**
 * @method addRow
 * Convenience method to add rows. You can also use workbook.getRows().add(config).
 * @param {Object/Array} config
 * @return {Ext.exporter.file.excel.Row/Ext.exporter.file.excel.Row[]}
 */

/**
 * @method getRow
 * Convenience method to fetch a row by its id.
 * @param id
 * @return {Ext.exporter.file.excel.Row}
 */
