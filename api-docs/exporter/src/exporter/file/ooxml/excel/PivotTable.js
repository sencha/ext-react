/**
 * @class Ext.exporter.file.ooxml.excel.PivotTable
 * @extend Ext.exporter.file.ooxml.XmlRels
 * Represents the PivotTable root element for non-null PivotTables. There exists one pivotTableDefinition
 * for each PivotTableDefinition part.
 *
 * (CT_PivotTableDefinition)
 * @private
 */

/**
 * @cfg {Boolean} [applyAlignmentFormats=false]
 *
 * If true apply legacy table auto-format alignment properties.
 * @accessor
 */
/**
 * @cfg {Boolean} [applyBorderFormats=false]
 *
 * If true apply legacy table auto-format border properties.
 * @accessor
 */
/**
 * @cfg {Boolean} [applyFontFormats=false]
 *
 * If true apply legacy table auto-format font properties.
 * @accessor
 */
/**
 * @cfg {Boolean} [applyNumberFormats=false]
 *
 * If true apply legacy table auto-format number format properties.
 * @accessor
 */
/**
 * @cfg {Boolean} [applyPatternFormats=false]
 *
 * If true apply legacy table auto-format pattern properties.
 * @accessor
 */
/**
 * @cfg {Boolean} [applyWidthHeightFormats=true]
 *
 * If true apply legacy table auto-format width/height properties.
 * @accessor
 */
/**
 * @cfg {Boolean} [asteriskTotals=null]
 *
 * Specifies a boolean value that indicates whether an asterisks should be displayed in subtotals and
 * totals when visual totals are not used in OLAP -based PivotTables.
 *
 * A value of 1 or true indicates an asterisks are displayed in subtotals and totals for OLAP
 * PivotTables when visual tools are not available.
 *
 * A value of 0 or false indicates an asterisk will not be displayed. This attribute depends on the
 * implementation and availability of visual tools in the application user interface.
 * @accessor
 */
/**
 * @cfg {Number} [autoFormatId=4096]
 *
 * Identifies which legacy table auto-format to apply.
 *
 * Use a value >= 4096 and <= 4117.
 *
 * Annex G of the file c061750_ISO_IEC_29500-1_2012.pdf contains a listing of the supported PivotTable
 * AutoFormats, example formatting, and a sample workbook with each of those AutoFormats applied.
 * @accessor
 */
/**
 * @cfg {Number} [cacheId=null] (required)
 *
 * Specifies the identifier of the related PivotCache definition. This Id is listed in the pivotCaches
 * collection in the workbook part.
 * @accessor
 */
/**
 * @cfg {Number} [chartFormat=null]
 *
 * Specifies the next chart formatting identifier to use on the PivotTable.
 * @accessor
 */
/**
 * @cfg {Boolean} [colGrandTotals=null]
 *
 * Specifies a boolean value that indicates whether grand totals should be displayed for the PivotTable columns.
 *
 * A value of 1 or true indicates grand totals should be displayed.
 *
 * A value of 0 or false indicates grand totals should not be displayed for PivotTable columns.
 * @accessor
 */
/**
 * @cfg {String} [colHeaderCaption=null]
 *
 * Specifies the string to be displayed in column header in compact mode. This attribute depends on whether
 * the application implements a compact mode for displaying PivotTables in the user interface.
 * @accessor
 */
/**
 * @cfg {Boolean} [compact=false]
 *
 * Specifies a boolean value that indicates whether new fields should have their compact flag set to true.
 *
 * A value of 1 or true indicates new fields should default to compact mode equal to true.
 *
 * A value of 0 or false indicates new fields should default to compact mode equal to false. This attribute
 * depends on whether the application implements a compact mode in the user interface.
 * @accessor
 */
/**
 * @cfg {Boolean} [compactData=false]
 *
 * Specifies a boolean value that indicates whether the field next to the data field in the
 * PivotTable should be displayed in the same column of the spreadsheet
 * @accessor
 */
/**
 * @cfg {Number} [createdVersion=null]
 *
 * Specifies the version of the application that created the cache. This attribute is application-dependent.
 * @accessor
 */
/**
 * @cfg {Boolean} [customListSort=null]
 *
 * Specifies a boolean value that indicates whether the "custom lists" option is offered when sorting
 * this PivotTable.
 *
 * A value of 1 or true indicates custom lists are offered when sorting this PivotTable.
 *
 * A value of 0 or false indicates custom lists are not offered. This attribute depends on the
 * implementation of sorting features in the application.
 * @accessor
 */
/**
 * @cfg {String} [dataCaption='Values'] (required)
 *
 * Specifies the name of the value area field header in the PivotTable. This caption is shown in
 * the PivotTable when two or more fields are in the values area.
 * @accessor
 */
/**
 * @cfg {Boolean} [dataOnRows=null]
 *
 * Specifies a boolean value that indicates whether the field representing multiple fields in the data
 * region is located in the row area or the column area.
 *
 * A value of 1 or true indicates that this field is located in the row area.
 *
 * A value of 0 or false indicates that this field is located in the column area.
 * @accessor
 */
/**
 * @cfg {Number} [dataPosition=null]
 *
 * Specifies the position for the field representing multiple data field in the PivotTable, whether
 * that field is located in the row area or column area.
 *
 * Missing attribute indicates this field is last, or innermost in the field list.
 *
 *  - 0 indicates this field is first, or outermost in the field list.
 *  - 1 indicates this field is second in the field list.
 *  - 2 indicates this field is third in the field list, and increasing values follow this pattern.
 *
 *  If this value is higher than the number of fields in the field list, then this field is last, or
 *  innermost in the field list.
 *  @accessor
 */
/**
 * @cfg {Boolean} [disableFieldList=null]
 *
 * Specifies a boolean value that indicates whether to disable the PivotTable field list.
 *
 * A value of 1 or true indicates the field list, or similar mechanism for selecting fields in the
 * user interface, is disabled.
 *
 * A value of 0 or false indicates the field list is enabled.
 * @accessor
 */
/**
 * @cfg {Boolean} [editData=null]
 *
 * Specifies a boolean value that indicates whether the user is allowed to edit the cells in the data
 * area of the PivotTable.
 *
 * A value of 1 or true indicates the user can edit values in the data area.
 *
 * A value of 0 or false indicates the cells in the data area are not editable.
 * @accessor
 */
/**
 * @cfg {Boolean} [enableDrill=null]
 *
 * Specifies a boolean value that indicates whether the user is prevented from drilling down on a
 * PivotItem or aggregate value.
 *
 * A value of 1 or true indicates the user can drill down on a pivot item or aggregate value.
 *
 * A value of 0 or false indicates the user is prevented from drilling down pivot item.
 * @accessor
 */
/**
 * @cfg {Boolean} [enableFieldProperties=null]
 *
 * Specifies a boolean value that indicates whether the user is prevented from displaying PivotField
 * properties.
 *
 * A value of 1 or true indicates the user can display pivot field properties.
 *
 * A value of 0 or false indicates the user cannot display pivot field properties. This attribute
 * depends on how pivot field properties are exposed in the application user interface.
 * @accessor
 */
/**
 * @cfg {Boolean} [enableWizard=null]
 *
 * Specifies a boolean value that indicates whether the user is prevented from displaying the
 * PivotTable wizard.
 *
 * A value of 1 or true indicates the user can display the PivotTable wizard.
 *
 * A value of 0 or false indicates the user can not display the PivotTable wizard. This attribute
 * depends on whether the application exposes a wizard or similar mechanism for creating and working
 * with PivotTables in the user interface.
 * @accessor
 */
/**
 * @cfg {String} [errorCaption=null]
 *
 * Specifies the string to be displayed in cells that contain errors.
 * @accessor
 */
/**
 * @cfg {Boolean} [fieldListSortAscending=null]
 *
 * Specifies a boolean value that indicates whether fields in the PivotTable are sorted in non-default
 * order in the field list.
 *
 * A value of 1 or true indicates fields for the PivotTable are sorted in the field list. The sort
 * order from the data source is applied for range-based PivotTables. Alphabetical sorting is applied
 * for external data PivotTables.
 *
 * A value of 0 or false indicates fields in the field list are not sorted.
 * @accessor
 */
/**
 * @cfg {Boolean} [fieldPrintTitles=null]
 *
 * Specifies a boolean value that indicates whether the row and column titles from the PivotTable
 * should be printed.
 *
 * A value of 1 or true indicates row and column titles should be printed.
 *
 * A value of 0 or false indicates row and column titles should not be printed.
 * @accessor
 */
/**
 * @cfg {String} [grandTotalCaption=null]
 *
 * Specifies the string to be displayed for grand totals.
 * @accessor
 */
/**
 * @cfg {Boolean} [gridDropZones=null]
 *
 * Specifies a boolean value that indicates whether the in-grid drop zones should be displayed at
 * runtime, and whether classic layout is applied.
 *
 * A value of 1 or true indicates in-grid drop zones should be displayed and classic layout should be
 * applied to the PivotTable.
 *
 * A value of 0 or false indicates in-grid drop zones should be disabled and classic layout should not
 * be applied.
 *
 * **Note**: Grid drop zones are optional runtime UI, determined by the application, that indicate to
 * the user the locations of the page, row, column, and data fields in the PivotTable report. See layout
 * discussion under pivotTableDefinition for the precise locations of these areas.
 * @accessor
 */
/**
 * @cfg {Boolean} [immersive=null]
 *
 * Specifies a boolean value that indicates whether PivotTable immersive experience user interface
 * should be turned off.
 *
 * A value of 1 or true indicates the PivotTable immersive experience should be turned off for this
 * PivotTable.
 *
 * A value of 0 or false indicates the immersive experience should be left on. This attribute
 * depends on whether the application implements an immersive experience in the user interface.
 * @accessor
 */
/**
 * @cfg {Number} [indent=null]
 *
 * Specifies the indentation increment for compact axis and can be used to set the Report Layout
 * to Compact Form.
 * @accessor
 */
/**
 * @cfg {Boolean} [itemPrintTitles=true]
 *
 * Specifies a boolean value that indicates whether PivotItem names should be repeated at the top of
 * each printed page.
 *
 * A value of 1 or true indicates pivot items names should be repeated at the top of each page.
 *
 * A value of 0 or false indicates should not be repeated.
 * @accessor
 */
/**
 * @cfg {Boolean} [mdxSubqueries=null]
 *
 * Specifies a boolean value that indicates whether MDX sub-queries are supported by OLAP data provider
 * for this PivotTable.
 *
 * A value of 1 or true indicates MDX sub-queries are supported by the OLAP data provider.
 *
 * A value of 0 or false indicates MDX sub-queries are not supported.
 * @accessor
 */
/**
 * @cfg {Boolean} [mergeItem=null]
 *
 * Specifies a boolean value that indicates whether row or column titles that span multiple cells
 * should be merged into a single cell.
 *
 * A value of 1 or true indicates that titles that span multiple cells are merged into a single cell.
 *
 * A value of 0 or false indicates titles are not merged.
 * @accessor
 */
/**
 * @cfg {Number} [minRefreshableVersion=null]
 *
 * Specifies the minimum version of the application required to update this PivotTable view.
 * This attribute is application-dependent.
 * @accessor
 */
/**
 * @cfg {String} [missingCaption=null]
 *
 * Specifies the string to be displayed in cells with no value
 * @accessor
 */
/**
 * @cfg {Boolean} [multipleFieldFilters=null]
 *
 * Specifies a boolean value that indicates whether the fields of a PivotTable can have
 * multiple filters set on them.
 *
 * A value of 1 or true indicates the fields of a PivotTable can have multiple filters.
 *
 * A value of 0 or false indicates the fields of a PivotTable can only have a simple filter.
 * @accessor
 */
/**
 * @cfg {String} [name=null] (required)
 *
 * Specifies the PivotTable name.
 * @accessor
 */
/**
 * @cfg {Boolean} [outline=true]
 *
 * Specifies a boolean value that indicates whether new fields should have their outline flag set to true.
 *
 * A value of 1 or true indicates new fields are created with outline equal to true.
 *
 * A value of 0 or false indicates new fields are created with outline equal to false.
 * @accessor
 */
/**
 * @cfg {Boolean} [outlineData=null]
 *
 * Specifies a boolean value that indicates whether data fields in the PivotTable should be
 * displayed in outline form.
 *
 * A value of 1 or true indicates data fields will display in outline form.
 *
 * A value of 0 or false indicates data fields will not display in outline form.
 * @accessor
 */
/**
 * @cfg {Boolean} [pageOverThenDown=null]
 *
 * Specifies a boolean value that indicates how the page fields are laid out when there are multiple
 * PivotFields in the page area.
 *
 * A value of 1 or true indicates the fields will display "Over, then down"
 *
 * A value of 0 or false indicates the fields will display "down, then Over"
 * @accessor
 */
/**
 * @cfg {String} [pageStyle=null]
 *
 * Specifies the name of the style to apply to each of the field item headers in the page
 * area of the PivotTable.
 * @accessor
 */
/**
 * @cfg {Number} [pageWrap=null]
 *
 * Specifies the number of page fields to display before starting another row or column.
 * @accessor
 */
/**
 * @cfg {String} [pivotTableStyle=null]
 *
 * Specifies the name of the style to apply to the main table area of the PivotTable.
 * @accessor
 */
/**
 * @cfg {Boolean} [preserveFormatting=null]
 *
 * Specifies a boolean value that indicates whether the formatting applied by the user to the
 * PivotTable cells is discarded on refresh.
 *
 * A value of 1 or true indicates the formatting applied by the end user is discarded on refresh.
 *
 * A value of 0 or false indicates the end-user formatting is retained on refresh.
 * @accessor
 */
/**
 * @cfg {Boolean} [printDrill=null]
 *
 * Specifies a boolean value that indicates whether drill indicators expand collapse buttons should be printed.
 *
 * A value of 1 or true indicates that these buttons should be printed.
 *
 * A value of 0 or false indicates that these buttons should not be printed.
 * @accessor
 */
/**
 * @cfg {Boolean} [published=null]
 *
 * Specifies a boolean value that indicates whether data fields in the PivotTable are published and
 * available for viewing in a server rendering environment.
 *
 * A value of 1 or true indicates that the data fields in the PivotTable are published and shall be
 * available for viewing in a server rendering environment.
 *
 * A value of 0 or false indicates that the data fields in the PivotTable are not published and shall
 * not be available for viewing in a server rendering environment.
 * @accessor
 */
/**
 * @cfg {Boolean} [rowGrandTotals=null]
 *
 * Specifies a boolean value that indicates whether grand totals should be displayed for the
 * PivotTable rows. The default value for this attribute is true.
 *
 * A value of 1 or true indicates grand totals are displayed for the PivotTable rows.
 *
 * A value of 0 or false indicates grand totals will not be displayed.
 * @accessor
 */
/**
 * @cfg {String} [rowHeaderCaption=null]
 *
 * Specifies the string to be displayed in row header in compact mode.
 * @accessor
 */
/**
 * @cfg {Boolean} [showCalcMbrs=null]
 *
 * Specifies a boolean value that indicates whether calculated members should be shown in the
 * PivotTable view. This attribute applies to PivotTables from OLAP-sources only.
 *
 * A value of 1 or true indicates that calculated members should be shown.
 *
 * A value of 0 or false indicates calculated members should not be shown.
 * @accessor
 */
/**
 * @cfg {Boolean} [showDataDropDown=null]
 *
 * Specifies a boolean value that indicates whether the drop-down lists for the fields in the
 * PivotTable should be hidden. This attribute depends on whether the application implements drop down
 * lists or similar mechanism in the user interface.
 *
 * A value of 1 or true indicates drop down lists are displayed for fields.
 *
 * A value of 0 or false indicates drop down lists will not be displayed.
 * @accessor
 */
/**
 * @cfg {Boolean} [showDataTips=null]
 *
 * Specifies a boolean value that indicates whether tooltips should be displayed for PivotTable data cells.
 *
 * A value of 1 or true indicates tooltips are displayed.
 *
 * A value of 0 or false indicates tooltips will not be displayed. This attribute depends on
 * whether the application employs tooltips or similar mechanism in the user interface.
 * @accessor
 */
/**
 * @cfg {Boolean} [showDrill=null]
 *
 * Specifies a boolean value that indicates whether drill indicators should be hidden.
 *
 * A value of 1 or true indicates drill indicators are displayed.
 *
 * A value of 0 or false indicates drill indicators will not be displayed.
 * @accessor
 */
/**
 * @cfg {Boolean} [showDropZones=null]
 *
 * Specifies a boolean value that indicates whether the PivotTable should display large drop zones
 * when there are no fields in the data region.
 *
 * A value of 1 or true indicates a large drop zone is displayed.
 *
 * A value of 0 or false indicates a large drop zone will not be displayed.
 * @accessor
 */
/**
 * @cfg {Boolean} [showEmptyCol=null]
 *
 * Specifies a boolean value that indicates whether to include empty columns in the table.
 *
 * A value of 1 or true indicates empty columns are included in the PivotTable.
 *
 * A value of 0 or false indicates empty columns are excluded.
 * @accessor
 */
/**
 * @cfg {Boolean} [showEmptyRow=null]
 *
 * Specifies a boolean value that indicates whether to include empty rows in the table.
 *
 * A value of 1 or true indicates empty rows are included in the PivotTable.
 *
 * A value of 0 or false indicates empty rows are excluded.
 * @accessor
 */
/**
 * @cfg {Boolean} [showError=null]
 *
 * Specifies a boolean value that indicates whether to show error messages in cells.
 *
 * A value of 1 or true indicates error messages are shown in cells.
 *
 * A value of 0 or false indicates error messages are shown through another mechanism the
 * application provides in the user interface.
 * @accessor
 */
/**
 * @cfg {Boolean} [showHeaders=null]
 *
 * Specifies a boolean value that indicates whether to suppress display of pivot field headers.
 *
 * A value of 1 or true indicates field headers are shown in the PivotTable.
 *
 * A value of 0 or false indicates field headers are excluded.
 * @accessor
 */
/**
 * @cfg {Boolean} [showItems=null]
 *
 * Specifies a boolean value that indicates whether to display item names when adding a field onto
 * a PivotTable that has no data fields.
 *
 * A value of 1 or true indicates item names are displayed.
 *
 * A value of 0 or false indicates item names will not be displayed.
 * @accessor
 */
/**
 * @cfg {Boolean} [showMemberPropertyTips=null]
 *
 * Specifies a boolean value that indicates whether member property information should be omitted
 * from PivotTable tooltips.
 *
 * A value of 1 or true indicates member property information is included.
 *
 * A value of 0 or false indicates member property information is excluded. This attribute depends on
 * whether the application employs tooltips or similar mechanism in the user interface.
 * @accessor
 */
/**
 * @cfg {Boolean} [showMissing=null]
 *
 * Specifies a boolean value that indicates whether to show a message in cells with no value.
 *
 * A value of 1 or true indicates to show a message string in cells without values.
 *
 * A value of 0 or false indicates no message string will shown in cells without values.
 * @accessor
 */
/**
 * @cfg {Boolean} [showMultipleLabel=null]
 *
 * Specifies a boolean value that indicates whether a page field with multiple selected items should
 * display "(multiple items)" instead of "All". This attribute applies only to non-OLAP PivotTables.
 * The messages displayed depend on the application implementation.
 *
 * A value of 1 or true indicates a different message string is displayed for a page field with
 * multiple items.
 *
 * A value of 0 or false indicates the same message string is displayed for all page fields.
 * @accessor
 */
/**
 * @cfg {Boolean} [subtotalHiddenItems=null]
 *
 * Specifies a boolean value that indicates whether data for hidden pivotItems for PivotFields in the
 * data area should be included in subtotals.
 *
 * A value of 1 or true indicates that data for hidden pivot items in the data area is included in
 * subtotals.
 *
 * A value of 0 or false indicates hidden pivot items will not be included in subtotals.
 * @accessor
 */
/**
 * @cfg {String} [tag=null]
 *
 * Specifies a user-defined string that is associated with this PivotTable.
 * @accessor
 */
/**
 * @cfg {Number} [updatedVersion=null]
 *
 * Specifies the version of the application that last updated the PivotTable view. This attribute is
 * application-dependent.
 * @accessor
 */
/**
 * @cfg {Boolean} [useAutoFormatting=true]
 *
 * Specifies a boolean value that indicates whether legacy auto formatting has been applied
 * to the PivotTable view.
 *
 * A value of 1 or true indicates that legacy auto formatting has been applied to the PivotTable.
 *
 * A value of 0 or false indicates that legacy auto formatting has not been applied to the PivotTable.
 * @accessor
 */
/**
 * @cfg {String} [vacatedStyle=null]
 *
 * Specifies the name of the style to apply to the cells left blank when a PivotTable shrinks
 * during a refresh operation
 * @accessor
 */
/**
 * @cfg {Boolean} [visualTotals=null]
 *
 * Specifies a boolean value that indicates whether totals should be based on visible data only.
 * This attribute applies to OLAP PivotTables only.
 *
 * A value of 1 or true indicates subtotals are computed on visible data only.
 *
 * A value of 0 or false indicates subtotals are computed on all data.
 * @accessor
 */

/**
 * @cfg {Ext.exporter.file.ooxml.excel.Location} [location={}]
 *
 * Represents location information for the PivotTable.
 * @accessor
 */
/**
 * @cfg {Ext.exporter.file.ooxml.excel.PivotField[]} [pivotFields=null]
 *
 * Represents the collection of fields that appear on the PivotTable.
 * @accessor
 */
/**
 * @cfg {Ext.exporter.file.ooxml.excel.Field[]} [rowFields=null]
 *
 * Represents the collection of row fields for the PivotTable.
 * @accessor
 */
/**
 * @cfg {Ext.exporter.file.ooxml.excel.Item[]} [rowItems=null]
 *
 * Represents the collection of items in row axis of the PivotTable.
 * @accessor
 */
/**
 * @cfg {Ext.exporter.file.ooxml.excel.Field[]} [colFields=null]
 *
 * Represents the collection of fields that are on the column axis of the PivotTable.
 * @accessor
 */
/**
 * @cfg {Ext.exporter.file.ooxml.excel.Item[]} [colItems=null]
 *
 * Represents the collection of column items of the PivotTable.
 * @accessor
 */
/**
 * @cfg {Ext.exporter.file.ooxml.excel.PageField[]} [pageFields=null]
 *
 * Represents the collection of items in the page or report filter region of the PivotTable.
 * @accessor
 */
/**
 * @cfg {Ext.exporter.file.ooxml.excel.DataField[]} [dataFields=null]
 *
 * Represents the collection of items in the data region of the PivotTable.
 * @accessor
 */
/**
 * @cfg {Ext.exporter.file.ooxml.excel.PivotTableStyleInfo} [pivotTableStyleInfo={}]
 *
 * Represent information on style applied to the PivotTable.
 * @accessor
 */

/**
 * @cfg {Ext.exporter.file.ooxml.excel.Worksheet} [worksheet=null]
 *
 * Reference to the parent worksheet.
 * @accessor
 */
/**
 * @cfg {Ext.exporter.file.ooxml.excel.PivotCacheDefinition} [cacheDefinition={}]
 *
 * Represents the pivotCacheDefinition part.
 * @accessor
 */

/**
 * @cfg {String} [viewLayoutType='outline']
 *
 * Possible values:
 * - compact
 * - outline
 * - tabular
 *
 * Use this config to set the pivot table layout
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
