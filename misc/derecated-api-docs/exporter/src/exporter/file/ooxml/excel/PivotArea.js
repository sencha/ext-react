/**
 * @class Ext.exporter.file.ooxml.excel.PivotArea
 * @extend Ext.exporter.file.ooxml.Base
 * Rule describing a PivotTable selection.
 *
 * (CT_PivotArea)
 * @private
 */

/**
 * @cfg {Boolean} [axis=null]
 *
 * The region of the PivotTable to which this rule applies.
 *
 * Possible values:
 *
 * - `axisCol` (Column Axis): Column axis
 * - `axisPage` (Include Count Filter): Page axis
 * - `axisRow` (Row Axis): Row axis
 * - `axisValues` (Values Axis): Values axis
 * @accessor
 */

/**
 * @cfg {Boolean} [cacheIndex=null]
 *
 * Flag indicating whether any indexes refer to fields or items in the Pivot cache and not the view.
 * @accessor
 */

/**
 * @cfg {Boolean} [collapsedLevelsAreSubtotals=null]
 *
 * Flag indicating if collapsed levels/dimensions are considered subtotals.
 * @accessor
 */

/**
 * @cfg {Boolean} [dataOnly=null]
 *
 * Flag indicating whether only the data values (in the data area of the view) for an item selection
 * are selected and does not include the item labels.
 * @accessor
 */

/**
 * @cfg {Number} [field=null]
 *
 * Index of the field that this selection rule refers to.
 * @accessor
 */

/**
 * @cfg {Number} [fieldPosition=null]
 *
 * Position of the field within the axis to which this rule applies.
 * @accessor
 */

/**
 * @cfg {Boolean} [grandCol=null]
 *
 * Flag indicating whether the column grand total is included.
 * @accessor
 */

/**
 * @cfg {Boolean} [grandRow=null]
 *
 * Flag indicating whether the row grand total is included.
 * @accessor
 */

/**
 * @cfg {Boolean} [labelOnly=null]
 *
 * Flag indicating whether only the item labels for an item selection are selected and does
 * not include the data values (in the data area of the view).
 * @accessor
 */

/**
 * @cfg {String} [offset=null]
 *
 * A Reference that specifies a subset of the selection area. Points are relative to the
 * top left of the selection area.
 *
 * A reference identifies a cell or a range of cells on a worksheet and tells the application
 * where to look for the values or data you want to use in a formula. With references, you can
 * use data contained in different parts of a worksheet in one formula or use the value from one
 * cell in several formulas. You can also refer to cells on other sheets in the same workbook,
 * and to other workbooks. References to cells in other workbooks are called links.
 * @accessor
 */

/**
 * @cfg {Boolean} [outline=null]
 *
 * Flag indicating whether the rule refers to an area that is in outline mode.
 * @accessor
 */

/**
 * @cfg {String} [type=null]
 *
 * Indicates the type of selection rule.
 *
 * Possible values:
 *
 *  - `all` (All): Refers to the whole PivotTable.
 *  - `button` (Field Button): Refers to a field button.
 *  - `data` (Data): Refers to something in the data area.
 *  - `none` (None): Refers to no Pivot area.
 *  - `normal` (Normal): Refers to a header or item.
 *  - `origin` (Origin): Refers to the blank cells at the top-left of the PivotTable
 *  (top-left to LTR sheets, top-right for RTL sheets).
 *  - `topEnd` (Top End): Refers to the blank cells at the top of the PivotTable, on its
 *  trailing edge (top-right for LTR sheets, top-left for RTL sheets).
 *  @accessor
 */

/**
 * @cfg {Ext.exporter.file.ooxml.excel.PivotAreaReference[]} [references=null]
 * @accessor
 */

/**
 * @cfg [generateTplAttributes=true]
 * @inheritdoc
 * @localdoc
 *
 * **Note** Do not rename the config names that are part of the `attributes` since they are
 * mapped to the xml attributes needed by the template.
 */
