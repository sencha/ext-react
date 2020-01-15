/**
 * @class Ext.exporter.file.ooxml.excel.Cell
 * @extend Ext.exporter.file.Base
 * @private
 */

/**
 * @cfg {Ext.exporter.file.ooxml.excel.Row} [row=null]
 *
 * Reference to the parent row
 * @accessor
 */

/**
 * @cfg {String} [dataType=null] (required)
 *
 * The cell's data type. Possible values:
 *
 * - `b` (Boolean) Cell containing a boolean.
 * - `d` (Date) Cell contains a date in the ISO 8601 format.
 * - `e` (Error) Cell containing an error.
 * - `inlineStr` (InlineString) Cell containing an (inline) rich string, i.e., one not in the shared
 * string table. If this cell type is used, then the cell value is in the `is` element rather than the `v`
 * element in the cell (`c` element).
 * - `n` (Number) Cell containing a number.
 * - `s` (SharedString) Cell containing a shared string.
 * - `str` (String) Cell containing a formula string.
 * @accessor
 */

/**
 * @cfg {Boolean} [showPhonetic=null]
 *
 * `true` if the cell should show phonetic.
 * @accessor
 */

/**
 * @cfg {Number} [index=null]
 *
 * Specifies the column index of this cell within the containing row. If this tag is not specified, the first
 * instance of a Cell element within a row has an assumed Index="1".
 * @accessor
 */

/**
 * @cfg {String} [styleId=null]
 *
 * The index of this cell's style. Style records are stored in the Styles Part.
 * @accessor
 */

/**
 * @cfg {Number} [mergeAcross=null]
 *
 * Number of cells to merge to the right side of this cell
 * @accessor
 */

/**
 * @cfg {Number} [mergeDown=null]
 *
 * Number of cells to merge below this cell
 * @accessor
 */

/**
 * @cfg {Number/Date/String} [value=null] (required)
 *
 * Value assigned to this cell
 * @accessor
 */

/**
 * @method getNotation
 * Formats a number to the A1 style
 *
 * @param index
 * @return {string}
 */

/**
 * @method getRef
 * Returns the cell reference using the A4 notation
 * @return {String}
 */
