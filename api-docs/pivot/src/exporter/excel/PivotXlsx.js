/**
 * @class Ext.exporter.excel.PivotXlsx
 * @extend Ext.exporter.Base
 * @alias exporter.pivotxlsx
 *
 * This exporter class creates an XLSX file that has 2 sheets:
 *
 * - one sheet that has the pivot table
 * - one sheet that has the raw data
 *
 * To be able to correctly export the pivot table definition to Excel you need to ensure that:
 * 
 * - only the following aggregator functions are used: min, max, avg, count, variance, varianceP, stdDev and stdDevP
 * - the pivot matrix provided should be {@link Ext.pivot.matrix.Local}
 *
 * This exporter can be used together with the {@link Ext.pivot.plugin.Exporter}.
 */

/**
 * @cfg {Ext.exporter.file.excel.Style} titleStyle
 *
 * Default style applied to the title
 * @accessor
 */

/**
 * @cfg {Ext.pivot.matrix.Local} [matrix=null]
 *
 * Reference to the pivot matrix that needs to be exported
 * @accessor
 */

/**
 * @cfg {Ext.exporter.file.ooxml.excel.PivotTableStyleInfo} pivotTableStyle
 *
 * Represent information on style applied to the PivotTable.
 *
 * The following style names are predefined:
 * - `PivotStyleLight1` -> `PivotStyleLight28`
 * - `PivotStyleMedium1` -> `PivotStyleMedium28`
 * - `PivotStyleDark1` -> `PivotStyleDark28`
 *@accessor
 */

/**
 * @cfg data
 * @hide
 */
