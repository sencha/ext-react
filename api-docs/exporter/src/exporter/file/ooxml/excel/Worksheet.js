/**
 * @class Ext.exporter.file.ooxml.excel.Worksheet
 * @extend Ext.exporter.file.ooxml.excel.Sheet
 * This is the root element of Worksheet parts within a SpreadsheetML document.
 *
 * (CT_Worksheet)
 * @private
 */

/**
 * @cfg {Ext.exporter.file.ooxml.excel.Column[]} [columns=null]
 *
 * Column definitions
 * @accessor
 */

/**
 * @cfg {Ext.exporter.file.ooxml.excel.Row[]} [rows=[]] (required)
 *
 * Rows in this worksheet
 * @accessor
 */

/**
 * @method addColumn
 * Convenience method to add column infos.
 * @param {Object/Array} config
 * @return {Ext.exporter.file.ooxml.excel.Column/Ext.exporter.file.ooxml.excel.Column[]}
 */

/**
 * @method addRow
 * Convenience method to add rows.
 * @param {Object/Array} config
 * @return {Ext.exporter.file.ooxml.excel.Row/Ext.exporter.file.ooxml.excel.Row[]}
 */

/**
 * @method getRow
 * Convenience method to fetch a row by its id.
 * @param id
 * @return {Ext.exporter.file.ooxml.excel.Row}
 */

/**
 * @method addPivotTable
 * Convenience method to add pivot tables.
 * @param {Object/Array} config
 * @return {Ext.exporter.file.ooxml.excel.PivotTable/Ext.exporter.file.ooxml.excel.PivotTable[]}
 */

/**
 * @method getPivotTable
 * Convenience method to fetch a pivot table by its id.
 * @param id
 * @return {Ext.exporter.file.ooxml.excel.PivotTable}
 */
