/**
 * @class Ext.exporter.data.Base
 * @extend Ext.Base
 * Base class for data object.
 */

/**
 * @cfg {String} [id=null]
 *
 * Unique id for this object. Auto generated when missing.
 * @accessor
 */

/**
 * @cfg {Boolean} [autoGenerateId=true]
 *
 * Set to `true` to auto generate an id if none is defined.
 * @accessor
 */

/**
 * @method checkCollection
 * This method could be used in config appliers that need to initialize a
 * Collection that has items of type className.
 *
 * @param data
 * @param dataCollection
 * @param className
 * @return {Ext.util.Collection}
 */
