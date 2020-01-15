/**
 * @class Ext.exporter.file.ooxml.excel.CacheSource
 * @extend Ext.exporter.file.ooxml.Base
 * Represents the description of data source whose data is stored in the pivot cache. The data
 * source refers to the underlying rows or database records that provide the data for a PivotTable.
 * You can create a PivotTable report from a SpreadsheetML table, an external database (including OLAP cubes),
 * multiple SpreadsheetML worksheets, or another PivotTable.
 *
 * (CT_CacheSource)
 * @private
 */

/**
 * @cfg {String} [type='worksheet']
 *
 * Specifies the cache type.
 *
 * Possible values:
 *
 *  - `consolidation` (Consolidation Ranges): Indicates that the cache contains data that consolidates ranges.
 *  - `external` (External): Indicates that the cache contains data from an external data source.
 *  - `scenario` (Scenario Summary Report): Indicates that the cache contains a scenario summary report
 *  - `worksheet` (Worksheet): Indicates that the cache contains worksheet data.
 * @accessor
 */

/**
 * @cfg {Ext.exporter.file.ooxml.excel.WorksheetSource} [worksheetSource={}]
 *
 * Represents the location of the source of the data that is stored in the cache.
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
