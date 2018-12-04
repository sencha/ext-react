/**
 * @class Ext.exporter.file.ooxml.excel.PageField
 * @extend Ext.exporter.file.ooxml.Base
 * Represents a field on the page or report filter of the PivotTable.
 *
 * [CT_PageField]
 * @private
 */

/**
 * @cfg {String} [cap=null]
 *
 * Specifies the display name of the hierarchy.
 * @accessor
 */

/**
 * @cfg {Number} [fld=null] (required)
 *
 * Specifies the index of the field that appears on the page or filter report area of the PivotTable.
 * @accessor
 */

/**
 * @cfg {Number} [hier=null]
 *
 * Specifies the index of the OLAP hierarchy to which this item belongs.
 * @accessor
 */

/**
 * @cfg {Number} [item=null]
 *
 * Specifies the index of the item in the PivotCache.
 * @accessor
 */

/**
 * @cfg {String} [name=null]
 *
 * Specifies the unique name of the hierarchy.
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
