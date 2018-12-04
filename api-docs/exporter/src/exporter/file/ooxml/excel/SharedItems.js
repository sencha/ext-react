/**
 * @class Ext.exporter.file.ooxml.excel.SharedItems
 * @extend Ext.exporter.file.ooxml.Base
 * Represents the collection of unique items for a field in the PivotCacheDefinition.
 * The sharedItems complex type stores data type and formatting information about the data
 * in a field. Items in the PivotCacheDefinition can be shared in order to reduce the redundancy
 * of those values that are referenced in multiple places across all the PivotTable parts.
 * [Example: A value might be part of a filter, it might appear on a row or column axis, and
 * will appear in the pivotCacheRecords definition as well. However, because of the performance
 * cost of creating the optimized shared items, items are only shared if they are actually in
 * use in the PivotTable. Therefore, depending on user actions on the PivotTable layout, the
 * pivotCacheDefinition and underlying PivotCacheRecords part can be updated. end example]
 *
 * If there are no shared items, then field values are stored directly in the pivotCacheRecords part.
 *
 * (CT_SharedItems)
 * @private
 */

/**
 * @cfg {Boolean} [containsBlank=null]
 *
 * Specifies a boolean value that indicates whether this field contains a blank value.
 *
 * A value of 1 or true indicates this field contains one or more blank values.
 *
 * A value of 0 or false indicates this field does not contain blank values.
 * @accessor
 */

/**
 * @cfg {Boolean} [containsDate=null]
 *
 * Specifies a boolean value that indicates that the field contains at least one date.
 *
 * A value of 1 or true indicates the field contains at least one date value.
 *
 * A value of 0 or false indicates the field does not contain any date values.
 * @accessor
 */

/**
 * @cfg {Boolean} [containsInteger=null]
 *
 * Specifies a boolean value that indicates whether this field contains integer values.
 *
 * A value of 1 or true indicates this field contains integer values.
 *
 * A value of 0 or false indicates non-integer or mixed values.
 * @accessor
 */

/**
 * @cfg {Boolean} [containsMixedTypes=null]
 *
 * Specifies a boolean value that indicates whether this field contains more than one data type.
 *
 * A value of 1 or true indicates this field contains more than one data type.
 *
 * A value of 0 or false indicates contains only one data type. The field can still contain
 * blank values.
 * @accessor
 */

/**
 * @cfg {Boolean} [containsNonDate=null]
 *
 * Specifies a boolean value that indicates that the field contains at least one value that is not a date.
 *
 * A value of 1 or true indicates the field contains at least one non-date values.
 *
 * A value of 0 or false indicates this field contains no date fields.
 * @accessor
 */

/**
 * @cfg {Boolean} [containsNumber=null]
 *
 * Specifies a boolean value that indicates whether this field contains numeric values.
 *
 * A value of 1 or true indicates this field contains at least one numeric value.
 *
 * A value of 0 or false indicates this field contains no numeric values.
 * @accessor
 */

/**
 * @cfg {Boolean} [containsSemiMixedTypes=null]
 *
 * Specifies a boolean value that indicates that this field contains text values.
 * The field can also contain a mix of other data type and blank values.
 *
 * A value of 1 or true indicates at least one text value, and can also contain a mix of other
 * data types and blank values.
 *
 * A value of 0 or false indicates the field does not have a mix of text and other values.
 * @accessor
 */

/**
 * @cfg {Boolean} [containsString=null]
 *
 * Specifies a boolean value that indicates whether this field contains a text value.
 *
 * A value of 1 or true indicates this field contains at least one text value.
 *
 * A value of 0 or false indicates this field does not contain any text values.
 * @accessor
 */

/**
 * @cfg {Boolean} [longText=null]
 *
 * Specifies a boolean value that indicates whether this field contains a long text value.
 * A string is considered long if it is over 255 Unicode scalar values.
 *
 * A value of 1 or true indicates the value contains more than 255 Unicode scalar valuesof text.
 *
 * A value of 0 or false indicates the value contains less than 255 Unicode scalar values.
 *
 * **Note**: This is used as many legacy spreadsheet application support a limit of 255
 * characters for text values.
 * @accessor
 */

/**
 * @cfg {Date} [maxDate=null]
 *
 * Specifies the maximum date/time value found in a date field.
 * @accessor
 */

/**
 * @cfg {Number} [maxValue=null]
 *
 * Specifies the maximum numeric value found in a numeric field.
 * @accessor
 */

/**
 * @cfg {Date} [minDate=null]
 *
 * Specifies the minimum date/time value found in a date field.
 * @accessor
 */

/**
 * @cfg {Number} [minValue=null]
 *
 * Specifies the minimum numeric value found in a numeric field.
 * @accessor
 */

/**
 * @cfg {Boolean/Number/Date/String[]} [items=null]
 *
 * Unique values for the CacheField.
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
