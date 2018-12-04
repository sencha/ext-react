/**
 * @private
 * @class Ext.draw.LimitedCache
 * @extend Ext.Base
 * Limited cache is a size limited cache container that stores limited number of objects.
 * 
 * When {@link #get} is called, the container will try to find the object in the list.
 * If failed it will call the {@link #feeder} to create that object. If there are too many
 * objects in the container, the old ones are removed.
 * 
 * __Note:__ This is not using a Least Recently Used policy due to simplicity and performance consideration.
 */

/**
 * @cfg {Number} [limit=40]
 * The amount limit of the cache.
 * @accessor
 */

/**
 * @cfg {Function} feeder
 * Function that generates the object when look-up failed.
 * @return {Number}
 * @accessor
 */

/**
 * @cfg {Object} [scope=null]
 * The scope for {@link #feeder}
 * @accessor
 */
