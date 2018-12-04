/**
 * @class Ext.exporter.file.excel.Row
 * @extend Ext.exporter.file.Base
 * This class is used to create an xml Excel Row
 */

/**
 * @cfg {Boolean} [autoFitHeight=false]
 *
 * Set this to 1 if you want to auto fit its height
 * @accessor
 */

/**
 * @cfg {String} [caption=null]
 *
 * Specifies the caption that should appear when the Component's custom row and column headers are showing.
 * @accessor
 */

/**
 * @cfg {Ext.exporter.file.excel.Cell[]} [cells=[]]
 *
 * Collection of cells available on this row.
 * @accessor
 */

/**
 * @cfg {Number} [height=null]
 *
 * Row's height in the Excel table
 * @accessor
 */

/**
 * @cfg {String} [index=null]
 *
 * Index of this row in the Excel table
 * @accessor
 */

/**
 * @cfg {Number} [span=null]
 *
 * Specifies the number of adjacent rows with the same formatting as this row. When a Span attribute
 * is used, the spanned row elements are not written out.
 *
 * As mentioned in the index config, rows must not overlap. Doing so results in an XML Spreadsheet document
 * that is invalid. Care must be taken with this attribute to ensure that the span does not include another
 * row index that is specified.
 *
 * Unlike columns, rows with the Span attribute must be empty. A row that contains a Span attribute and
 * one or more Cell elements is considered invalid. The Span attribute for rows is a short-hand method
 * for setting formatting properties for multiple, empty rows.
 * @accessor
 */

/**
 * @cfg {String} [styleId=null]
 *
 * Excel style attached to this row
 * @accessor
 */

/**
 * @method addCell
 * Convenience method to add cells. You can also use workbook.getCells().add(config).
 * @param {Object/Array} config
 * @return {Ext.exporter.file.excel.Cell/Ext.exporter.file.excel.Cell[]}
 */

/**
 * @method getCell
 * Convenience method to fetch a cell by its id.
 * @param id
 * @return {Ext.exporter.file.excel.Cell}
 */

/**
 * @method getCells
 * @return {Ext.util.Collection}
 *
 * Returns the collection of cells available in this row
 */
