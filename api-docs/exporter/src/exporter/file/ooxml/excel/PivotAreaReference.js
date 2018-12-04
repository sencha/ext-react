/**
 * @class Ext.exporter.file.ooxml.excel.PivotAreaReference
 * @extend Ext.exporter.file.ooxml.Base
 * Represents a set of selected fields and selected items within those fields.
 *
 * (CT_PivotAreaReference)
 * @private
 */

/**
 * @cfg {Boolean} [avgSubtotal=null]
 *
 * Specifies a boolean value that indicates whether the 'average' aggregate function is
 * included in the filter.
 *
 * A value of 1 or true indicates the average aggregation function is included in the filter.
 *
 * A value of 0 or false indicates another aggregation function is included in the filter.
 * @accessor
 */

/**
 * @cfg {Boolean} [byPosition=null]
 *
 * Specifies a boolean value that indicates whether the item is referred to by position
 * rather than item index.
 *
 * A value of 1 or true indicates the item is referred to by position.
 *
 * A value of 0 or false indicates the item is referred to by index.
 * @accessor
 */

/**
 * @cfg {Number} [count=null]
 *
 * Specifies the number of item indexes in the collection of indexes (x tags).
 * @accessor
 */

/**
 * @cfg {Boolean} [countASubtotal=null]
 *
 * Specifies a boolean value that indicates whether the 'countA' subtotal is
 * included in the filter.
 *
 * A value of 1 or true indicates the count aggregation function is included in the filter.
 *
 * A value of 0 or false indicates another aggregation function is included in the filter.
 * @accessor
 */

/**
 * @cfg {Boolean} [countSubtotal=null]
 *
 * Specifies a boolean value that indicates whether the count aggregate function is included
 * in the filter.
 *
 * A value of 1 or true indicates the count aggregation function is included in the filter.
 *
 * A value of 0 or false indicates another aggregation function is included in the filter.
 * @accessor
 */

/**
 * @cfg {Boolean} [defaultSubtotal=null]
 *
 * Specifies a boolean value that indicates whether the default subtotal is included in the filter.
 *
 * A value of 1 or true indicates the default subtotal is included in the filter. The default is to
 * display the total or the grand total.
 *
 * A value of 0 or false indicates another subtotal or aggregation function is included in the filter.
 * @accessor
 */

/**
 * @cfg {Number} [field=null]
 *
 * Specifies the index of the field to which this filter refers. A value of -2 indicates
 * the 'data' field.
 * @accessor
 */

/**
 * @cfg {Boolean} [maxSubtotal=null]
 *
 * Specifies a boolean value that indicates whether the 'maximum' aggregate function is
 * included in the filter.
 *
 * A value of 1 or true indicates the maximum aggregation function is included in the filter.
 *
 * A value of 0 or false indicates another aggregation function is included in the filter.
 * @accessor
 */

/**
 * @cfg {Boolean} [minSubtotal=null]
 *
 * Specifies a boolean value that indicates whether the 'minimum' aggregate function is
 * included in the filter.
 *
 * A value of 1 or true indicates the minimum aggregation function is included in the filter.
 *
 * A value of 0 or false indicates another aggregation function is included in the filter.
 * @accessor
 */

/**
 * @cfg {Boolean} [productSubtotal=null]
 *
 * Specifies a boolean value that indicates whether the 'product' aggregate function is
 * included in the filter.
 *
 * A value of 1 or true indicates the product aggregation function is included in the filter.
 *
 * A value of 0 or false indicates another aggregation function is included in the filter.
 * @accessor
 */

/**
 * @cfg {Boolean} [relative=null]
 *
 * Specifies a boolean value that indicates whether the item is referred to by a relative reference
 * rather than an absolute reference. This attribute is used if posRef is set to true.
 *
 * A value of 1 or true indicates the item is referred to by a relative reference.
 *
 * A value of 0 or false indicates the item is referred to by an absolute reference.
 * @accessor
 */

/**
 * @cfg {Boolean} [selected=null]
 *
 * Specifies a boolean value that indicates whether this field has selection. This attribute is
 * used when the PivotTable is in Outline view. It is also used when both header and data cells
 * have selection.
 *
 * A value of 1 or true indicates the field has selection.
 *
 * A value of 0 or false indicates the field does not have selection.
 * @accessor
 */

/**
 * @cfg {Boolean} [stdDevPSubtotal=null]
 *
 * Specifies a boolean value that indicates whether the population standard deviation aggregate
 * function is included in the filter.
 *
 * A value of 1 or true indicates the population standard deviation aggregation function is
 * included in the filter.
 *
 * A value of 0 or false indicates another aggregation function is included in the filter.
 * @accessor
 */

/**
 * @cfg {Boolean} [stdDevSubtotal=null]
 *
 * Specifies a boolean value that indicates whether the standard deviation aggregate function
 * is included in the filter.
 *
 * A value of 1 or true indicates the standard deviation aggregation function is included in
 * the filter.
 *
 * A value of 0 or false indicates another aggregation function is included in the filter.
 * @accessor
 */

/**
 * @cfg {Boolean} [sumSubtotal=null]
 *
 * Specifies a boolean value that indicates whether the sum aggregate function is included
 * in the filter.
 *
 * A value of 1 or true indicates the sum aggregation function is included in the filter.
 *
 * A value of 0 or false indicates another aggregation function is included in the filter.
 * @accessor
 */

/**
 * @cfg {Boolean} [varPSubtotal=null]
 *
 * Specifies a boolean value that indicates whether the population variance aggregate function
 * is included in the filter.
 *
 * A value of 1 or true indicates the population variance aggregation function is included
 * in the filter.
 *
 * A value of 0 or false indicates another aggregation function is included in the filter.
 * @accessor
 */

/**
 * @cfg {Boolean} [varSubtotal=null]
 *
 * Specifies a boolean value that indicates whether the variance aggregate function is included
 * in the filter.
 *
 * A value of 1 or true indicates the variance aggregation function is included in the filter.
 *
 * A value of 0 or false indicates another aggregation function is included in the filter.
 * @accessor
 */

/**
 * @cfg {Number[]} [items=[]]
 *
 * Selected items within the selected fields.
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
