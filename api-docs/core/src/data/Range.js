/**
 * @class Ext.data.Range
 * @extend Ext.Base
 *
 * This class provides access to a range of records in a {@link Ext.data.Store store}.
 * Instances of this class are not created directly but are rather returned by a store's
 * {@link Ext.data.AbstractStore#createActiveRange createActiveRange} method.
 *
 * This class is useful for buffered rendering where only a portion of the total set of
 * records are needed. By passing that information to a `Range`, the access to records
 * can be abstracted even across {@link Ext.data.virtual.Store virtual stores} where
 * only those records needed by views are fetched from the server.
 * @since 6.5.0
 */

/**
 * @cfg {Number} [buffer=0]
 * The buffer to execute server requests.
 */

/**
 * @cfg {Number} [end=0]
 * The first record beyond the range of interest. This is to make "length" of the
 * range simply `end - begin`.
 *
 * This property is set by the `goto` method and is stored on the instance for
 * readonly use.
 */
