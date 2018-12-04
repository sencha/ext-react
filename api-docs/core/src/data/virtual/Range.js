/**
 * @class Ext.data.virtual.Range
 * @extend Ext.data.Range
 * @since 6.5.0
 */

/**
 * @cfg {String/Function} callback
 * The callback to call when new records in this range become available.
 */

/**
 * @cfg {Number} [leadingBufferZone=200]
 * The number of records to fetch beyond the active range in the direction of movement.
 * If the range is advancing forward, the additional records are beyond `end`. If
 * advancing backwards, they are before `begin`.
 */

/**
 * @cfg {Boolean} [prefetch=false]
 * Specify `true` to enable prefetching for this range.
 */

/**
 * @cfg {Object} scope
 * The object that implements the supplied `callback` method.
 */

/**
 * @cfg {Number} [trailingBufferZone=50]
 * The number of records to fetch beyond the active trailing the direction of movement.
 * If the range is advancing forward, the additional records are before `begin`. If
 * advancing backwards, they are beyond `end`.
 */
