/**
 * @class Ext.exporter.file.ooxml.excel.Row
 * @extend Ext.exporter.file.Base
 * @private
 */

/**
 * @method addCell
 * Convenience method to add cells.
 * @param {Object/Array} config
 * @return {Ext.exporter.file.ooxml.excel.Cell/Ext.exporter.file.ooxml.excel.Cell[]}
 */

/**
 * @method getCell
 * Convenience method to fetch a cell by its id.
 * @param id
 * @return {Ext.exporter.file.ooxml.excel.Cell}
 */

/**
 * @cfg {Boolean} [collapsed=null]
 *
 * `true` if the rows 1 level of outlining deeper than the current row are in the collapsed outline state.
 * It means that the rows which are 1 outline level deeper (numerically higher value) than the current
 * row are currently hidden due to a collapsed outline state.
 *
 * It is possible for collapsed to be false and yet still have the rows in question hidden. This can
 * be achieved by having a lower outline level collapsed, thus hiding all the child rows.
 * @accessor
 */

/**
 * @cfg {Boolean} [hidden=false]
 * `true` if the row is hidden, e.g., due to a collapsed outline or by manually selecting and hiding a row.
 * @accessor
 */

/**
 * @cfg {Number} [height=null]
 * Row height measured in point size. There is no margin padding on row height.
 * @accessor
 */

/**
 * @cfg {Number} [outlineLevel=null]
 * Outlining level of the row, when outlining is on.
 * @accessor
 */

/**
 * @cfg {Boolean} [showPhonetic=null]
 * `true` if the row should show phonetic.
 * @accessor
 */

/**
 * @cfg {String} [index=null]
 * Row index. Indicates to which row in the sheet this row definition corresponds.
 * @accessor
 */

/**
 * @cfg {String} [styleId=null]
 * Index to style record for the row
 * @accessor
 */

/**
 * @cfg {Ext.exporter.file.ooxml.excel.Worksheet} [worksheet=null]
 * Reference to the parent worksheet
 * @accessor
 */

/**
 * @cfg {Ext.exporter.file.ooxml.excel.Cell[]} [cells=[]]
 * Collection of cells available on this row.
 * @accessor
 */
