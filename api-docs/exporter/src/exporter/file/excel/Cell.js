/**
 * @class Ext.exporter.file.excel.Cell
 * @extend Ext.exporter.file.Base
 * This class is used to create an xml Excel Cell.
 *
 * The data type of the cell value is automatically determined.
 */

/**
 * @cfg {String} [dataType='String'] (required)
 *
 * Excel data type for the cell value. It is automatically set when the value is set.
 *
 * Possible values: `Number`, `DateTime`, `Boolean`, `String`
 * @accessor
 */

 /**
 * @cfg {String} [formula=null]
 *
 * Specifies the formula stored in this cell. All formulas are persisted in R1C1 notation because they are
 * significantly easier to parse and generate than A1-style formulas. The formula is calculated upon reload
 * unless calculation is set to manual. Recalculation of the formula overrides the value in this cell's Value config.
 *
 * Examples:
 *
 * - "=SUM(R1C1:R2C2)": sums up values from Row1/Column1 to Row2/Column2
 * - "=SUM(R[-2]C:R[-1]C[1])": sums up values from 2 rows above the current row and current column to
 * values from 1 row above the current row and 1 column after the current column
 * - "=SUM(R[-1]C,R[-1]C[1])": sums up values from cell positioned one row above current row and current column,
 * and the cell positioned one row above current row and next column
 *
 * Check Excel for more formulas.
 * @accessor
 */

 /**
 * @cfg {Number} [index=null]
 *
 * Specifies the column index of this cell within the containing row. If this tag is not specified, the first
 * instance of a Cell element within a row has an assumed Index="1". Each additional Cell element has an assumed
 * Index that is one higher.
 *
 * Indices must appear in strictly increasing order. Failure to do so will result in an XML Spreadsheet
 * document that is invalid. Indices do not need to be sequential, however. Omitted indices are formatted with
 * either the default format, the column's format, or the table's format (depending on what has been specified).
 *
 * Indices must not overlap. If duplicates exist, the behavior is unspecified and the XML Spreadsheet document
 * is considered invalid. If the previous cell is a merged cell and no index is specified on this cell, its
 * start index is assumed to be the first cell after the merge.
 * @accessor
 */

 /**
 * @cfg {String} [styleId=null]
 *
 * Excel style attached to this cell
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
 * @cfg {Number/Date/String} [value=''] (required)
 *
 * Value assigned to this cell
 * @accessor
 */
