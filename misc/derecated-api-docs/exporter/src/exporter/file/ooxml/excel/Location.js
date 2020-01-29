/**
 * @class Ext.exporter.file.ooxml.excel.Location
 * @extend Ext.exporter.file.ooxml.Base
 * (CT_Location)
 * @private
 */

/**
 * @cfg {String} [ref=null] (required)
 *
 * Specifies the first row of the PivotTable.
 * @accessor
 */

/**
 * @cfg {Number} [firstHeaderRow=null] (required)
 *
 * Specifies the first row of the PivotTable header, relative to the top left cell in the ref value.
 * @accessor
 */

/**
 * @cfg {Number} [firstDataRow=null] (required)
 *
 * Specifies the first row of the PivotTable data, relative to the top left cell in the ref value.
 * @accessor
 */

/**
 * @cfg {Number} [firstDataCol=null] (required)
 *
 * Specifies the first column of the PivotTable data, relative to the top left cell in the ref value.
 * @accessor
 */

/**
 * @cfg {Number} [rowPageCount=null]
 *
 * Specifies the number of rows per page for this PivotTable that the filter area will occupy.
 * By default there is a single column of filter fields per page and the fields occupy as many rows
 * as there are fields.
 * @accessor
 */

/**
 * @cfg {Number} [colPageCount=null]
 *
 * Specifies the number of columns per page for this PivotTable that the filter area will occupy.
 * By default there is a single column of filter fields per page and the fields occupy as many rows
 * as there are fields.
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
