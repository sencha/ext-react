/**
 * @class Ext.data.ResultSet
 * @extend Ext.Base
 * @protected
 * Simple wrapper class that represents a set of records returned by a Proxy.
 */

/**
 * @property {Boolean} [isResultSet=true]
 * Identifies this class as a result set.
 */

/**
 * @cfg {Boolean} loaded
 * True if the records have already been loaded. This is only meaningful when dealing with
 * SQL-backed proxies.
 * @accessor
 */

/**
 * @cfg {Number} count
 * The number of records in this ResultSet. Note that total may differ from this number.
 * @accessor
 */

/**
 * @cfg {Number} total
 * The total number of records reported by the data source. This ResultSet may form a subset of
 * those records (see {@link #count}).
 * @accessor
 */

/**
 * @cfg {Number} remoteTotal
 * The total number of records reported by the remote data source.
 * @accessor
 */

/**
 * @cfg {Boolean} success
 * True if the ResultSet loaded successfully, false if any errors were encountered.
 * @accessor
 */

/**
 * @cfg {Ext.data.Model[]/Object[]} records (required)
 * The array of record instances or record config objects.
 * @accessor
 */

/**
 * @cfg {String} message
 * The message that was read in from the data
 * @accessor
 */

/**
 * @cfg {Object} metadata
 * The metadata object from a server sourced JSON data packet.
 * @accessor
 */

/**
 * @cfg {Ext.data.Model[]} groupData
 * The grouping data.
 * @accessor
 */

/**
 * @cfg {Ext.data.Model} summaryData
 * The summary data.
 * @accessor
 */

/**
 * @method constructor
 * Creates the resultSet
 * @param {Object} [config] Config object.
 */
