/**
 * @class Ext.grid.Tree
 * @extend Ext.grid.Grid
 * @xtype tree
 */

/**
 * @cfg {Boolean} [expanderFirst=true]
 * `true` to display the expander to the left of the item text.  
 * `false` to display the expander to the right of the item text.
 */

/**
 * @cfg {Boolean} [expanderOnly=true]
 * `true` to expand only on the click of the expander element. Setting this to
 * `false` will allow expansion on click of any part of the element.
 */

/**
 * @cfg {Boolean} [selectOnExpander=false]
 * `true` to select the node when clicking the expander.
 * @accessor
 */

/**
 * @cfg {Boolean} [singleExpand=null]
 * `true` if only 1 node per branch may be expanded.
 * @accessor
 */

/**
 * @cfg {Boolean} [folderSort=false]
 * True to automatically prepend a leaf sorter to the store.
 * @accessor
 */

/**
 * @event beforenodeexpand
 * Fires before an row is visually expanded. May be vetoed by returning false from a handler.
 * @param {Ext.grid.Row} row The row to be expanded
 * @param {Ext.data.NodeInterface} record The record to be expanded
 */

/**
 * @event nodeexpand
 * Fires after an row has been visually expanded and its child nodes are visible in the tree.
 * @param {Ext.grid.Row} row The row that was expanded
 * @param {Ext.data.NodeInterface} record The record that was expanded
 */

/**
 * @event beforenodecollapse
 * Fires before an row is visually collapsed. May be vetoed by returning false from a handler.
 * @param {Ext.grid.Row} node The row to be collapsed
 * @param {Ext.data.NodeInterface} record The record to be collapsed
 */

/**
 * @event nodecollapse
 * Fires after an row has been visually collapsed and its child nodes are no longer visible in the tree.
 * @param {Ext.grid.Row} node The row that was collapsed
 * @param {Ext.data.NodeInterface} record The record that was collapsed
 */
