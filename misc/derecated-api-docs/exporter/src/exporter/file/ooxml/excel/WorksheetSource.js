/**
 * @class Ext.exporter.file.ooxml.excel.WorksheetSource
 * @extend Ext.exporter.file.ooxml.Base
 * Represents the location of the source of the data that is stored in the cache.
 *
 * (CT_WorksheetSource)
 * @private
 */

/**
 * @cfg {String} [id=null]
 *
 * Specifies the identifier to the Sheet part whose data is stored in the cache.
 * @accessor
 */

/**
 * @cfg {String} [name=null]
 *
 * Specifies the named range that is the source of the data.
 * @accessor
 */

/**
 * @cfg {String} [ref=null]
 *
 * Specifies the reference that defines a cell range that is the source of the data.
 * This attribute depends on how the application implements cell references.
 * @accessor
 */

/**
 * @cfg {String} [sheet=null]
 *
 * Specifies the name of the sheet that is the source for the cached data.
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