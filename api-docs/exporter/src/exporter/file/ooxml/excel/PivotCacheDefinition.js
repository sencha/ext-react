/**
 * @class Ext.exporter.file.ooxml.excel.PivotCacheDefinition
 * @extend Ext.exporter.file.ooxml.XmlRels
 * Represents the pivotCacheDefinition part. This part defines each field in the source data,
 * including the name, the string resources of the instance data (for shared items), and information
 * about the type of data that appears in the field.
 *
 * (CT_PivotCacheDefinition)
 * @private
 */

/**
 * @cfg {Boolean} [backgroundQuery=null]
 *
 * Specifies a boolean value that indicates whether the application should query and retrieve
 * records asynchronously from the cache.
 *
 * A value of 1 or true indicates the application will retrieve records asynchronously from the cache.
 *
 * A value of 0 or false indicates the application will retrieve records synchronously.
 * @accessor
 */

/**
 * @cfg {Number} [createdVersion=null]
 *
 * Specifies the version of the application that created the cache. This attribute is application-dependent.
 * @accessor
 */

/**
 * @cfg {Boolean} [enableRefresh=null]
 *
 * Specifies a boolean value that indicates whether the end-user can refresh the cache. This
 * attribute depends on whether the application exposes a method for allowing end-users control
 * over refreshing the cache via the user interface.
 *
 * A value of 1 or true indicates the end-user can refresh the cache.
 *
 * A value of 0 or false indicates the end-user cannot refresh the cache.
 * @accessor
 */

/**
 * @cfg {Boolean} [invalid=null]
 *
 * Specifies a boolean value that indicates whether the cache needs to be refreshed.
 *
 * A value of 1 or true indicates the cache needs to be refreshed.
 *
 * A value of 0 or false indicates the cache does not need to be refreshed.
 * @accessor
 */

/**
 * @cfg {Number} [minRefreshableVersion=null]
 *
 * Specifies the earliest version of the application that is required to refresh the cache.
 * This attribute is application-dependent.
 * @accessor
 */

/**
 * @cfg {Number} [missingItemsLimit=null]
 *
 * Specifies the number of unused items to allow before discarding unused items.
 * This attribute is application-dependent. The application shall specify a threshold for unused items.
 * @accessor
 */

/**
 * @cfg {Boolean} [optimizeMemory=null]
 *
 * Specifies a boolean value that indicates whether the application will apply optimizations to
 * the cache to reduce memory usage. This attribute is application-dependent. This application shall
 * define its own cache optimization methods. The application shall also decide whether to expose
 * cache optimization status via the user interface or an object model.
 *
 * A value of 1 or true indicates the application will apply optimizations to the cache.
 *
 * A value of 0 or false indicates the application will not apply optimizations to the cache.
 * @accessor
 */

/**
 * @cfg {Number} [recordCount=null]
 *
 * Specifies the number of records in the cache.
 * @accessor
 */

/**
 * @cfg {String} [refreshedBy=null]
 *
 * Specifies the name of the end-user who last refreshed the cache. This attribute is
 * application-dependent and is specified by applications that track and store the identity
 * of the current user. This attribute also depends on whether the application exposes mechanisms
 * via the user interface whereby the end-user can refresh the cache.
 * @accessor
 */

/**
 * @cfg {Date} [refreshedDateIso=null]
 *
 * Specifies the date when the cache was last refreshed. This attribute depends on whether the
 * application exposes mechanisms via the user interface whereby the end-user can refresh the cache.
 * @accessor
 */

/**
 * @cfg {Number} [refreshedVersion=null]
 *
 * Specifies the version of the application that last refreshed the cache. This attribute
 * depends on whether the application exposes mechanisms via the user interface whereby the
 * end-user can refresh the cache.
 * @accessor
 */

/**
 * @cfg {Boolean} [refreshOnLoad=null]
 *
 * Specifies a boolean value that indicates whether the application will refresh the cache
 * when the workbook has been opened.
 *
 * A value of 1 or true indicates that application will refresh the cache when the workbook is loaded.
 *
 * A value of 0 or false indicates the application will not automatically refresh cached data.
 * The end user shall trigger refresh of the cache manually via the application user interface.
 * @accessor
 */

/**
 * @cfg {Boolean} [saveData=null]
 *
 * Specifies a boolean value that indicates whether the pivot records are saved with the cache.
 *
 * A value of 1 or true indicates pivot records are saved in the cache.
 *
 * A value of 0 or false indicates are not saved in the cache.
 * @accessor
 */

/**
 * @cfg {Boolean} [supportAdvancedDrill=null]
 *
 * Specifies whether the cache's data source supports attribute drill-down.
 * @accessor
 */

/**
 * @cfg {Boolean} [supportSubquery=null]
 *
 * Specifies whether the cache's data source supports sub-queries.
 * @accessor
 */

/**
 * @cfg {Boolean} [tupleCache=null]
 *
 * Specifies a boolean value that indicates whether the PivotCache is used store information
 * for OLAP sheet data functions.
 *
 * A value of 1 or true indicates information about OLAP sheet data functions are stored in the cache.
 *
 * A value of 0 or false indicates the PivotCache does not contain information about OLAP sheet data functions.
 * @accessor
 */

/**
 * @cfg {Boolean} [upgradeOnRefresh=null]
 *
 * Specifies a boolean value that indicates whether the cache is scheduled for version upgrade.
 * This attribute depends on whether the application exposes mechanisms via the user interface whereby
 * the cache might be upgraded.
 *
 * A value of 1 or true indicates the cache is scheduled for upgrade.
 *
 * A value of 0 or false indicates the cache is not scheduled for upgrade.
 * @accessor
 */

/**
 * @cfg {Ext.exporter.file.ooxml.excel.PivotCacheRecords} [cacheRecords={}]
 *
 * Represents the collection of records in the PivotCache. This part stores the underlying
 * source data that the PivotTable aggregates.
 * @accessor
 */

/**
 * @cfg {Ext.exporter.file.ooxml.excel.CacheSource} [cacheSource={}]
 *
 * Represents the description of data source whose data is stored in the pivot cache.
 * @accessor
 */

/**
 * @cfg {Ext.exporter.file.ooxml.excel.CacheField[]} [cacheFields=null]
 *
 * Represents the collection of field definitions in the source data.
 * @accessor
 */

/**
 * @cfg {Ext.exporter.file.ooxml.excel.PivotCache} [pivotCache={}]
 *
 * This element enumerates pivot cache definition parts used by pivot tables and formulas in this workbook.
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
