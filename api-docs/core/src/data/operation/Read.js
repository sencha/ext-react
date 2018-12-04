/**
 * @class Ext.data.operation.Read
 * @extend Ext.data.operation.Operation
 * @alias data.operation.read
 * Encapsulates a read operation as performed by a {@link Ext.data.proxy.Proxy proxy}.
 *
 * This class is instantiated by {@link Ext.data.Store stores} and {@link Ext.data.Model records} and should
 * not need to be instantiated in user code.
 */

/**
 * @cfg {Ext.util.Filter[]} filters
 * Optional array of filter objects. Only applies to 'read' actions.
 */

/**
 * @cfg {Ext.util.Sorter[]} sorters
 * Optional array of sorter objects. Only applies to 'read' actions.
 */

/**
 * @cfg {Ext.util.Grouper} grouper
 * Optional grouping configuration. Only applies to 'read' actions where grouping is desired.
 */

/**
 * @cfg {Number} start
 * The start index (offset), used in paging when running a 'read' action.
 */

/**
 * @cfg {Number} limit
 * The number of records to load. Used on 'read' actions when paging is being used.
 */

/**
 * @cfg {Number} page
 * The page for this operation.
 */
