/**
 * @class Ext.exporter.file.ooxml.excel.CacheField
 * @extend Ext.exporter.file.ooxml.Base
 * Represent a single field in the PivotCache. This definition contains information about the field,
 * such as its source, data type, and location within a level or hierarchy. The sharedItems element
 * stores additional information about the data in this field. If there are no shared items, then
 * values are stored directly in the pivotCacheRecords part.
 *
 * (CT_CacheField)
 * @private
 */

/**
 * @cfg {String} [caption=null]
 *
 * Specifies the caption of the cache field.
 * @accessor
 */

/**
 * @cfg {Boolean} [databaseField=null]
 *
 * Specifies a boolean value that indicates whether this field came from the source database
 * rather having been created by the application.
 *
 * A value of 1 or true indicates the field is from the source database.
 *
 * A value of 0 or false indicates the field was created by the application.
 *
 * **Note**: This attribute could be used for a defined grouped or calculated field. In this case,
 * source database fields should precede defined grouped or calculated fields.
 * @accessor
 */

/**
 * @cfg {String} [formula=null]
 *
 * Specifies the formula for the calculated field. This formula is specified by the end-user.
 * Calculated fields can perform calculations by using the contents of other fields in the PivotTable.
 *
 * In formulas you create for calculated fields or calculated items, you can use operators and
 * expressions as you do in other worksheet formulas. You can use constants and refer to data
 * from the PivotTable, but you cannot use cell references or defined names. You cannot use
 * worksheet functions that require cell references or defined names as arguments, and you cannot
 * use array functions.
 *
 * Further behaviors and restrictions apply to formulas for calculated fields:
 *
 * - Formulas for calculated fields operate on the sum of the underlying data for any fields in
 * the formula. [Example: The formula =Sales * 1.2 multiplies the sum of the sales for each type
 * and region by 1.2; it does not multiply each individual sale by 1.2 and then sum the multiplied
 * amounts. end example]
 * - Formulas cannot refer to totals.
 * @accessor
 */

/**
 * @cfg {Number} [hierarchy=null]
 *
 * Specifies the hierarchy that this field is part of.
 * @accessor
 */

/**
 * @cfg {Number} [level=null]
 *
 * Specifies the hierarchy level that this field is part of.
 * @accessor
 */

/**
 * @cfg {Number} [mappingCount=null]
 *
 * Specifies the number of property mappings for this field.
 * @accessor
 */

/**
 * @cfg {Boolean} [memberPropertyField=null]
 *
 * Specifies a boolean value that indicates whether the field contains OLAP member property information.
 *
 * A value of 1 or true indicates this field contains OLAP member property information.
 *
 * A value of 0 or false indicates this field does not contain OLAP member property information.
 * @accessor
 */

/**
 * @cfg {String} [name=null]
 *
 * Specifies the name of the cache field.
 * @accessor
 */

/**
 * @cfg {Number} [numFmtId=null]
 *
 * Specifies the number format that is applied to all items in the field. Number formats are written
 * to the styles part.
 *
 * **Note**: Formatting information provided by cell table and by PivotTable need not agree. If the
 * two formats differ, the cell-level formatting takes precedence. If you change the layout of the
 * PivotTable, the PivotTable formatting will then take precedence.
 * @accessor
 */

/**
 * @cfg {String} [propertyName=null]
 *
 * Specifies the name of the property if this field is an OLAP property field.
 * @accessor
 */

/**
 * @cfg {Boolean} [serverField=null]
 *
 * Specifies a boolean value that indicates whether the field is a server-based page field.
 *
 * A value of 1 or true indicates this field is a server-based page field.
 *
 * A value of 0 or false indicates this field is not a server-based page field.
 *
 * This attribute applies to ODBC sources only.
 * @accessor
 */

/**
 * @cfg {Number} [sqlType=null]
 *
 * Specifies the SQL data type of the field. This attribute stores an ODBC data type and
 * applies to ODBC data sources only. A value is supplied for this attribute only if it
 * is provided to the application.
 *
 * The following are data types supported by ODBC. For a more information, see the ODBC specification.
 *
 * - `0` SQL_UNKNOWN_TYPE
 * - `1` SQL_CHAR
 * - `2` SQL_VARCHAR
 * - `-1` SQL_LONGVARCHAR
 * - `-8` SQL_WCHAR
 * - `-9` SQL_WVARCHAR
 * - `-10` SQL_WLONGVARCHAR
 * - `3`  SQL_DECIMAL
 * - `2`  SQL_NUMERIC
 * - `5`  SQL_SMALLINT
 * - `4`  S`QL_INTEGER
 * - `7`  SQL_REAL
 * - `6`  SQL_FLOAT
 * - `8`  SQL_DOUBLE
 * - `-7` SQL_BIT
 * - `-6` SQL_TINYINT
 * - `-5` SQL_BIGINT
 * - `-2` SQL_BINARY
 * - `-3` SQL_VARBINARY
 * - `-4` SQL_LONGVARBINARY
 * - `9`` SQL_TYPE_DATE or SQL_DATE
 * - `10` SQL_TYPE_TIME or SQL_TIME
 * - `11` SQL_TYPE_TIMESTAMP or SQL_TIMESTAMP
 * - `102` SQL_INTERVAL_MONTH
 * - `101` SQL_INTERVAL_YEAR
 * - `107` SQL_INTERVAL_YEAR_TO_MONTH
 * - `103` SQL_INTERVAL_DAY
 * - `104` SQL_INTERVAL_HOUR
 * - `105` SQL_INTERVAL_MINUTE
 * - `106` SQL_INTERVAL_SECOND
 * - `108` SQL_INTERVAL_DAY_TO_HOUR
 * - `109` SQL_INTERVAL_DAY_TO_MINUTE
 * - `110` SQL_INTERVAL_DAY_TO_SECOND
 * - `111` SQL_INTERVAL_HOUR_TO_MINUTE
 * - `112` SQL_INTERVAL_HOUR_TO_SECOND
 * - `113` SQL_INTERVAL_MINUTE_TO_SECOND
 * - `-11` SQL_GUID
 * - `-20` SQL_SIGNED_OFFSET`
 * - `-22` SQL_UNSIGNED_OFFSET
 * @accessor
 */

/**
 * @cfg {Boolean} [uniqueList=null]
 *
 * Specifies a boolean value that indicates whether the application was able to get a list
 * of unique items for the field. The attribute only applies to PivotTables that use ODBC
 * and is intended to be used in conjunction with optimization features in the application.
 * [Example: the application can optimize memory usage when populating PivotCache records
 * if it has a list of unique items for a field before all the records are retrieved from ODBC. end example]
 *
 * A value of 1 or true indicates the application was able to get a list of unique values for the field.
 *
 * A value of 0 or false indicates the application was unable to get a list of unique values for the field.
 * @accessor
 */

/**
 * @cfg {Ext.exporter.file.ooxml.excel.SharedItems} [sharedItems=null]
 *
 * Represents the collection of unique items for a field in the PivotCacheDefinition.
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
