/**
 * @class Ext.exporter.file.ooxml.excel.Field
 * @extend Ext.exporter.file.ooxml.Base
 * Represents a generic field that can appear either on the column or the row region of the PivotTable.
 * There areas many <x> elements as there are item values in any particular column or row.
 *
 * (CT_Field)
 * @private
 */

/**
 * @cfg {Number} [x=null]
 *
 * Specifies the index to a pivotField item value. There are as many x elements as there
 * are item values in any particular column. Note that these x elements sometimes are not
 * explicitly written, but instead "inherited" from the previous column or i element, via
 * the value of @r. The pivotField items don't list values explicitly, but instead reference
 * a shared item value in the pivotCacheDefinition part. The first instance of x has no
 * attribute value @v associated with it, so the default value for @v is assumed to be "0".
 * @accessor
 */
