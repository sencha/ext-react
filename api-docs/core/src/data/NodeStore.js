/**
 * @class Ext.data.NodeStore
 * @extend Ext.data.Store
 * @alias store.node
 *
 * Node Store
 * @private
 */

/**
 * @property {Boolean} [isNodeStore=true]
 * `true` in this class to identify an object as an instantiated NodeStore, or subclass thereof.
 */

/**
 * @cfg {Ext.data.Model} node The Record you want to bind this Store to. Note that
 * this record will be decorated with the {@link Ext.data.NodeInterface} if this is not the
 * case yet.
 * @accessor
 */

/**
 * @cfg {Boolean} [recursive=false]
 * Set this to `true` if you want this NodeStore to represent
 * all the descendants of the node in its flat data collection. This is useful for
 * rendering a tree structure to a DataView and is being used internally by
 * the TreeView. Any records that are moved, removed, inserted or appended to the
 * node at any depth below the node this store is bound to will be automatically
 * updated in this Store's internal flat data structure.
 * @accessor
 */

/**
 * @cfg {Boolean} [rootVisible=false]
 * `false` to not include the root node in this Stores collection.
 * @accessor
 */

/**
 * @cfg {Boolean} [folderSort=false]
 * Set to `true` to automatically prepend a leaf sorter.
 * @accessor
 */

/**
 * @method isVisible
 * @param {Object} node
 * @return {Boolean}
 */
