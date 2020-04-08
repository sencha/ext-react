/**
 * @class Ext.exporter.file.ooxml.excel.Workbook
 * @extend Ext.exporter.file.ooxml.XmlRels
 * The workbook element is the top level element. It contains elements and attributes that encompass the
 * data content of the workbook.
 *
 * (CT_Workbook)
 * @private
 */

/**
 * @cfg {Ext.exporter.file.ooxml.excel.Stylesheet} [stylesheet=null]
 *
 * This is the root element of the Styles part.
 * @accessor
 */

/**
 * @cfg {Ext.exporter.file.ooxml.excel.SharedStrings} [sharedStrings=null]
 *
 * A workbook can contain thousands of cells containing string (non-numeric) data.
 * Furthermore this data is very likely to be repeated across many rows or columns.
 * The goal of implementing a single string table that is shared across the workbook is
 * to improve performance in opening and saving the file by only reading and writing the
 * repetitive information once.
 * @accessor
 */

/**
 * @cfg {Ext.exporter.file.ooxml.excel.Sheet[]} [sheets=null]
 *
 * This element represents the collection of sheets in the workbook. There are different
 * types of sheets you can create in SpreadsheetML. The most common sheet type is a worksheet;
 * also called a spreadsheet. A worksheet is the primary document that you use in SpreadsheetML
 * to store and work with data. A worksheet consists of cells that are organized into columns and rows.
 * @accessor
 */

/**
 * @cfg {Ext.exporter.file.ooxml.excel.PivotCache[]} [pivotCaches=null]
 *
 * This element enumerates pivot cache definition parts used by pivot tables and formulas in this workbook.
 * @accessor
 */

/**
 * @method addWorksheet
 * Convenience method to add worksheets.
 * @param {Object/Array} config
 * @return {Ext.exporter.file.ooxml.excel.Worksheet/Ext.exporter.file.ooxml.excel.Worksheet[]}
 */

/**
 * @method removeWorksheet
 * Convenience method to remove worksheets.
 * @param {Object/Array} config
 * @return {Ext.exporter.file.ooxml.excel.Worksheet/Ext.exporter.file.ooxml.excel.Worksheet[]}
 */

/**
 * @method addPivotCache
 * Convenience method to add pivot caches.
 * @param {Object/Array} config
 * @return {Ext.exporter.file.ooxml.excel.PivotCache/Ext.exporter.file.ooxml.excel.PivotCache[]}
 */

/**
 * @method removePivotCache
 * Convenience method to remove pivot caches.
 * @param {Object/Array} config
 * @return {Ext.exporter.file.ooxml.excel.PivotCache/Ext.exporter.file.ooxml.excel.PivotCache[]}
 */

/**
 * @method addStyle
 * Convenience method to add a style.
 *
 * @param {Ext.exporter.file.Style} config
 * @return {Number} Index of the cell style
 */

/**
 * @method addCellStyle
 * Convenience method to add a style.
 *
 * @param {Ext.exporter.file.Style} config
 * @return {Number} Index of the cell style
 */
