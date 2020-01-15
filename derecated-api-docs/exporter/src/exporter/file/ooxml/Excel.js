/**
 * @class Ext.exporter.file.ooxml.Excel
 * @extend Ext.exporter.file.ooxml.XmlRels
 * An Office Open XML SpreasheetML implementation according to the [ISO/IEC 29500-1:2012][1].
 *
 * [1]: http://www.iso.org/iso/home/store/catalogue_ics/catalogue_detail_ics.htm?csnumber=61750
 *
 * Only a small subset of that standard is implemented.
 *
 * @private
 */

/**
 * @cfg {Ext.exporter.file.ooxml.CoreProperties} [properties=null]
 *
 * Core properties of the Excel file
 * @accessor
 */

/**
 * @cfg {Ext.exporter.file.ooxml.Workbook} [workbook={}]
 *
 * At least one Workbook needs to be in the file
 * @accessor
 */

/**
 * @method addWorksheet
 * Convenience method to add worksheets.
 *
 * @param {Object/Array} config
 * @return {Ext.exporter.file.ooxml.excel.Worksheet/Ext.exporter.file.ooxml.excel.Worksheet[]}
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
