/**
 * @class Ext.exporter.file.ooxml.excel.PivotField
 * @extend Ext.exporter.file.ooxml.Base
 * Represents a single field in the PivotTable. This element contains information about the field,
 * including the collection of items in the field.
 *
 * (CT_PivotField)
 * @private
 */

/**
 * @cfg {Boolean} [allDrilled]
 *
 * Specifies a boolean value that indicates whether all items in the field are expanded.
 * Applies only to OLAP PivotTables.
 *
 * A value of 1 or true indicates all items in the field are expanded.
 *
 * A value of 0 or false indicates all items are not expanded. However some items might be
 * expanded.
 * @accessor
 */

/**
 * @cfg {Boolean} [autoShow]
 *
 * Specifies a boolean value that indicates whether an "AutoShow" filter is applied to this
 * field. This attribute depends on the implementation of filtering in the application.
 *
 * A value of 1 or true indicates an "AutoShow" filter is applied to the field.
 *
 * A value of 0 or false indicates an "AutoShow" filter is not applied.
 * @accessor
 */

/**
 * @cfg {Boolean} [avgSubtotal]
 *
 * Specifies a boolean value that indicates whether to apply the 'Average' aggregation function
 * in the subtotal of this field.
 *
 * A value of 1 or true indicates the subtotal for this field is 'Average.'
 *
 * A value of 0 or false indicates a different aggregation function is applied to the subtotal
 * for this field.
 * @accessor
 */

/**
 * @cfg {String} [axis]
 *
 * Specifies the region of the PivotTable that this field is displayed.
 *
 * Possible values:
 *
 * - `axisCol`: Column axis
 * - `axisPage`: Page axis
 * - `axisRow`: Row axis
 * - `axisValues`: Values axis
 * @accessor
 */

/**
 * @cfg {Boolean} [compact]
 *
 * Specifies a boolean value that indicates whether the application will display fields compactly
 * in the sheet on which this PivotTable resides.
 *
 * A value of 1 or true indicates the next field should be displayed in the same column of the sheet.
 *
 * A value of 0 or false indicates each pivot field will display in its own column in the sheet.
 * @accessor
 */

/**
 * @cfg {Boolean} [countASubtotal]
 *
 * Specifies a boolean value that indicates whether to apply the 'countA' aggregation function in the
 * subtotal of this field.
 *
 * A value of 1 or true indicates the subtotal for this field is 'countA.'
 *
 * A value of 0 or false indicates a different aggregation function is applied to the subtotal
 * for this field.
 * @accessor
 */

/**
 * @cfg {Boolean} [countSubtotal]
 *
 * Specifies a boolean value that indicates whether to apply the 'count' aggregation function in the
 * subtotal of this field.
 *
 * A value of 1 or true indicates the subtotal for this field is 'count.'
 *
 * A value of 0 or false indicates a different aggregation vfunction is applied to the subtotal
 * for this field.
 * @accessor
 */

/**
 * @cfg {Boolean} [dataField]
 *
 * Specifies a boolean value that indicates whether this field appears in the data region
 * of the PivotTable.
 *
 * A value of 1 or true indicates this field appears in the data region of the PivotTable.
 *
 * A value of 0 or false indicates this field appears in another region of the PivotTable.
 * @accessor
 */

/**
 * @cfg {Boolean} [dataSourceSort]
 *
 * Specifies a boolean value that indicates whether sort is applied to this field in the data source.
 *
 * A value of 1 or true indicates this field is sorted in the data source.
 *
 * A value of 0 or false indicates this field is not sorted in the data source.
 * @accessor
 */

/**
 * @cfg {Boolean} [defaultAttributeDrillState]
 *
 * Specifies a boolean value that indicates the drill state of the attribute hierarchy in an
 * OLAP-based PivotTable.
 *
 * A value of 1 or true indicates the attribute hierarchy is expanded.
 *
 * A value of 0 or false indicates the attribute hierarchy is collapsed.
 *
 * This attribute is designed to allow the application to issue more optimized queries when all
 * items of each field have the same drill state.
 * @accessor
 */

/**
 * @cfg {Boolean} [defaultSubtotal]
 *
 * Specifies a boolean value that indicates whether the default subtotal aggregation function
 * is displayed for this field.
 *
 * A value of 1 or true indicates the default subtotal aggregation function is displayed for this field.
 *
 * A value of 0 or false indicates the default aggregation function is not displayed.
 * @accessor
 */

/**
 * @cfg {Boolean} [dragOff]
 *
 * Specifies a boolean value that indicates whether the field can be removed from the PivotTable.
 *
 * A value of 1 or true indicates the field can be removed from the PivotTable.
 *
 * A value of 0 or false indicates the field cannot be removed from the PivotTable.
 * @accessor
 */

/**
 * @cfg {Boolean} [dragToCol]
 *
 * Specifies a boolean value that indicates whether the field can be dragged to the column axis.
 *
 * A value of 1 or true indicates the field can be dragged to the column axis.
 *
 * A value of 0 or false indicates the field cannot be dragged to the column axis.
 * @accessor
 */

/**
 * @cfg {Boolean} [dragToData]
 *
 * Specifies a boolean value that indicates whether the field can be dragged to the data region.
 *
 * A value of 1 or true indicates the field can be dragged to the data region.
 *
 * A value of 0 or false indicates the field cannot be dragged to the data region.
 * @accessor
 */

/**
 * @cfg {Boolean} [dragToPage]
 *
 * Specifies a boolean value that indicates whether the field can be dragged to the page region.
 *
 * A value of 1 or true indicates the field can be dragged to the page region.
 *
 * A value of 0 or false indicates the field cannot be dragged to the page region.
 * @accessor
 */

/**
 * @cfg {Boolean} [dragToRow]
 *
 * Specifies a boolean value that indicates whether the field can be dragged to the row axis.
 *
 * A value of 1 or true indicates the field can be dragged to the row axis.
 *
 * A value of 0 or false indicates the field cannot be dragged to the row axis.
 * @accessor
 */

/**
 * @cfg {Boolean} [hiddenLevel]
 *
 * Specifies a boolean value that indicates whether there is a hidden level in the PivotTable.
 * This attribute applies to OLAP-based PivotTables only.
 *
 * A value of 1 or true indicates the OLAP PivotTable contains a hidden level.
 *
 * A value of 0 or false indicates the OLAP PivotTable does not contain any hidden levels.
 * @accessor
 */

/**
 * @cfg {Boolean} [hideNewItems]
 *
 * Specifies a boolean value that indicates whether new items that appear after a refresh should
 * be hidden by default.
 *
 * A value of 1 or true indicates that items that appear after a refresh should be hidden by default.
 *
 * A value of 0 or false indicates that items that appear after a refresh should be shown by default.
 * @accessor
 */

/**
 * @cfg {Boolean} [includeNewItemsInFilter]
 *
 * Specifies a boolean value that indicates whether manual filter is in inclusive mode.
 *
 * A value of 1 or true indicates the manual filter is inclusive.
 *
 * A value of 0 or false indicates the manual filter is not inclusive.
 * @accessor
 */

/**
 * @cfg {Boolean} [insertBlankRow]
 *
 * Specifies a boolean value that indicates whether to insert a blank row after each item.
 *
 * A value of 1 or true indicates that a blank row is inserted after each item.
 *
 * A value of 0 or false indicates no additional rows are inserted after each item.
 * @accessor
 */

/**
 * @cfg {Boolean} [insertPageBreak]
 *
 * Specifies a boolean value that indicates whether to insert a page break after each item.
 *
 * A value of 1 or true indicates that a page break is inserted after each item.
 *
 * A value of 0 or false indicates no page breaks are inserted after items.
 * @accessor
 */

/**
 * @cfg {Number} [itemPageCount]
 *
 * Specifies the number of items showed per page in the PivotTable.
 * @accessor
 */

/**
 * @cfg {Boolean} [maxSubtotal]
 *
 * Specifies a boolean value that indicates whether to apply the 'max' aggregation function
 * in the subtotal of this field.
 *
 * A value of 1 or true indicates that the 'max' aggregation function is applied in the subtotal
 * for this field.
 *
 * A value of 0 or false indicates another aggregation function is applied in the subtotal
 * for this field.
 * @accessor
 */

/**
 * @cfg {Boolean} [measureFilter]
 *
 * Specifies a boolean value that indicates whether field has a measure based filter.
 *
 * A value of 1 or true indicates the field has a measure-based filter.
 *
 * A value of 0 or false indicates does not have a measure-based filter.
 * @accessor
 */

/**
 * @cfg {Boolean} [minSubtotal]
 *
 * Specifies a boolean value that indicates whether to apply the 'min' aggregation function
 * in the subtotal of this field.
 *
 * A value of 1 or true indicates that the 'min' aggregation function is applied in the subtotal
 * for this field.
 *
 * A value of 0 or false indicates another aggregation function is applied in the subtotal
 * for this field.
 * @accessor
 */

/**
 * @cfg {Boolean} [multipleItemSelectionAllowed]
 *
 * Specifies a boolean value that indicates whether the field can have multiple items selected
 * in the page field.
 *
 * A value of 1 or true indicates the PivotTable can have multiple items selected in the page field.
 *
 * A value of 0 or false indicates the PivotTable cannot have multiple items selected in the page
 * field. This attribute depends on the application support for selecting multiple items in page fields.
 * @accessor
 */

/**
 * @cfg {Boolean} [nonAutoSortDefault]
 *
 * Specifies a boolean value that indicates whether sort operation that is applied to field should
 * be AutoSort operation or simple data sort operation.
 *
 * A value of 1 or true indicates that an AutoSort operation is applied to the field.
 *
 * A value of 0 or false indicates a simple data sort operation is applied to the field.
 * @accessor
 */

/**
 * @cfg {Number} [numFmtId]
 *
 * Specifies the identifier of the number format to apply to this field. Number formats are written
 * to the styles part. See the Styles section (§18.8) for more information on number formats.
 *
 * Formatting information provided by cell table and by PivotTable need not agree. If the two formats
 * differ, the cell-level formatting takes precedence. If you change the layout the PivotTable,
 * the PivotTable formatting will then take precedence.
 * @accessor
 */

/**
 * @cfg {Boolean} [outline]
 *
 * Specifies a boolean value that indicates whether the items in this field should be shown in Outline form.
 *
 * A value of 1 or true indicates the items in this field is shown in Outline form.
 *
 * A value of 0 or false indicates the items in this field will not be shown in Outline form.
 *
 * This attribute depends on the application support for displaying items in Outline form.
 * @accessor
 */

/**
 * @cfg {Boolean} [productSubtotal]
 *
 * Specifies a boolean value that indicates whether to apply 'product' aggregation function
 * in the subtotal of this field.
 *
 * A value of 1 or true indicates that the 'product' aggregation function is applied in the subtotal
 * for this field.
 *
 * A value of 0 or false indicates another aggregation function is applied in the subtotal
 * for this field.
 * @accessor
 */

/**
 * @cfg {Number} [rankBy]
 *
 * Specifies the index of the data field by which AutoShow will rank.
 * @accessor
 */

/**
 * @cfg {Boolean} [serverField]
 *
 * Specifies a boolean value that indicates whether this is a server-based page field.
 *
 * A value of 1 or true indicates this is a server-based page field.
 *
 * A value of 0 or false indicates this is a local page field.
 * @accessor
 */

/**
 * @cfg {Boolean} [showAll]
 *
 * Specifies a boolean value that indicates whether to show all items for this field.
 *
 * A value of 1 or true indicates that all items be shown.
 *
 * A value of 0 or false indicates items be shown according to user specified criteria.
 * @accessor
 */

/**
 * @cfg {Boolean} [showDropDowns]
 *
 * Specifies a boolean value that indicates whether to hide drop down buttons on PivotField headers.
 * This attribute depends on the application implementation for filtering in the user interface.
 *
 * A value of 1 or true indicates the application will display some mechanism for selecting and
 * applying filters – [Example: A dropdown menu end example] – in the user interface.
 *
 * A value of 0 or false indicates for mechanism for applying a filter is displayed in the user interface.
 * @accessor
 */

/**
 * @cfg {Boolean} [showPropAsCaption]
 *
 * Specifies a boolean value that indicates whether to show the property as a member caption.
 *
 * A value of 1 or true indicates the property is shown as a member caption.
 *
 * A value of 0 or false indicates the property will not be shown as a member caption.
 * @accessor
 */

/**
 * @cfg {Boolean} [showPropCell]
 *
 * Specifies a boolean value that indicates whether to show the member property value in a PivotTable cell.
 *
 * A value of 1 or true indicates the property value is shown in a PivotTable cell.
 *
 * A value of 0 or false indicates the property value will not be shown in a PivotTable cell.
 * @accessor
 */

/**
 * @cfg {Boolean} [showPropTip]
 *
 * Specifies a boolean value that indicates whether to show the member property value in a
 * tooltip on the appropriate PivotTable cells.
 *
 * A value of 1 or true indicates the property value is shown in a tooltip in the user interface.
 *
 * A value of 0 or false indicates the property will not be shown in a tooltip. This attribute depends
 * on whether the application employs tooltips or similar mechanism in the user interface.
 * @accessor
 */

/**
 * @cfg {String} [sortType]
 *
 * Specifies the type of sort that is applied to this field.
 *
 * Possible values:
 *
 * - `ascending`: Indicates the field is sorted in ascending order.
 * - `descending`: Indicates the field is sorted in descending order.
 * - `manual`: Indicates the field is sorted manually.
 * @accessor
 */

/**
 * @cfg {Boolean} [stdDevPSubtotal]
 *
 * Specifies a boolean value that indicates whether to apply the 'stdDevP' aggregation function in
 * the subtotal of this field.
 *
 * A value of 1 or true indicates that the 'stdDevP' aggregation function is applied in the subtotal
 * for this field.
 *
 * A value of 0 or false indicates another aggregation function is applied in the subtotal
 * for this field.
 * @accessor
 */

/**
 * @cfg {Boolean} [stdDevSubtotal]
 *
 * Specifies a boolean value that indicates whether to use 'stdDev' in the subtotal of this field.
 *
 * A value of 1 or true indicates that the 'stdDev' aggregation function is applied in the subtotal
 * for this field.
 *
 * A value of 0 or false indicates another aggregation function is applied in the subtotal
 * for this field.
 * @accessor
 */

/**
 * @cfg {String} [subtotalCaption]
 *
 * Specifies the custom text that is displayed for the subtotals label.
 * @accessor
 */

/**
 * @cfg {Boolean} [subtotalTop]
 *
 * Specifies a boolean value that indicates whether to display subtotals at the top of the group.
 * Applies only when Outline its true.
 *
 * A value of 1 or true indicates a subtotal is display at the top of the group.
 *
 * A value of 0 or false indicates subtotal will not be displayed at the top of the group.
 * @accessor
 */

/**
 * @cfg {Boolean} [sumSubtotal]
 *
 * Specifies a boolean value that indicates whether apply the 'sum' aggregation function in
 * the subtotal of this field.
 *
 * A value of 1 or true indicates the 'sum' aggregation function is applied in the subtotal of this field.
 *
 * A value of 0 or false indicates another aggregation function is applied in the subtotal of this field.
 * @accessor
 */

/**
 * @cfg {Boolean} [topAutoShow]
 *
 * Specifies a boolean value that indicates whether an AutoShow filter applied to this field is set
 * to show the top ranked values.
 *
 * A value of 1 or true indicates whether an AutoShow filter will show top values for this field.
 *
 * A value of 0 or false indicates bottom ranked values are shown.
 * @accessor
 */

/**
 * @cfg {String} [uniqueMemberProperty]
 *
 * Specifies the unique name of the member property to be used as a caption for the field and field items.
 * @accessor
 */

/**
 * @cfg {Boolean} [varPSubtotal]
 *
 * Specifies a boolean value that indicates whether to apply the 'varP' aggregation function in
 * the subtotal of this field.
 *
 * A value of 1 or true indicates the 'varP' aggregation function is applied in the subtotal of this field.
 *
 * A value of 0 or false indicates another aggregation function is applied in the subtotal of this field.
 * @accessor
 */

/**
 * @cfg {Boolean} [varSubtotal]
 *
 * Specifies a boolean value that indicates whether to apply the 'variance' aggregation function
 * in the subtotal of this field.
 *
 * A value of 1 or true indicates the 'variance' aggregation function is applied in the subtotal of this field.
 *
 * A value of 0 or false indicates another aggregation function is applied in the subtotal of this field.
 * @accessor
 */

/**
 * @cfg {Ext.exporter.file.ooxml.excel.FieldItem[]} [items]
 *
 * Represents the collection of items in a PivotTable field. The items in the collection are ordered by index.
 *
 * Items represent the unique entries from the field in the source data.
 * @accessor
 */

/**
 * @cfg {Ext.exporter.file.ooxml.excel.AutoSortScope} [autoSortScope]
 *
 * Represents the sorting scope for the PivotTable.
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
