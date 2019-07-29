/**
 * @class  Ext.grid.cell.Tree
 * @extend Ext.grid.cell.Cell
 * @xtype treecell
 */
/**
 * @property classCls
 * @inheritdoc
 */

/**
 * @event checkchange
 * Fires when a node with a checkbox's checked property changes.
 * @param {Ext.grid.cell.Tree} this               The cell who's checked property was changed.
 * @param {Boolean} checked                       The cell's new checked state.
 * @param {Ext.data.Model} record                 The record that was checked
 * @param {Ext.event.Event} e                     The tap event.
 * @since 7.0
 */

/**
 * @event beforecheckchange  cell, checked, current, record
 * Fires before a node with a checkbox's checked property changes.
 * @param {Ext.grid.cell.Tree} this               The cell who's checked property was changed.
 * @param {Boolean} checked                       The cell's new checked state.
 * @param {Boolean} current                       The cell's old checked state.
 * @param {Ext.data.Model} record                 The record that was checked
 * @param {Ext.event.Event} e                     The tap event.
 * @since 7.0
 */

/**
 * @cfg {String} iconClsProperty
 * The property from the associated record to map for the {@link #iconCls} config.
 */

/**
 * @cfg iconCls
 * @inheritdoc Ext.panel.Header#cfg-iconCls
 * @localdoc **Note:** This value is taken from the underlying {@link #node}.
 */

/**
 * @cfg {String} text
 * The text for this item. This value is taken from
 * the underlying {@link #node}.
 */

/**
 * @cfg {Boolean} [autoCheckChildren=true]
 * If `true`, checking a folder will check all child nodes. If `false`,
 * checking a folder will not affect child nodes.
 * {@link #checkable} should be true/false
 */

/**
 * @cfg {Boolean} [checkable=null]
 * If `null` this cell will check the node's data for a `checked`
 * field to exist and to be a boolean. Allowing the node data to
 * control whether the cell is checkable.
 *
 * If `true`, this cell will be checkable by default with no other
 * configuration. Nodes can still opt out if their `checkable` field is
 * set to `false`.
 *
 * If `false`, this cell does not support checking regardless of
 * node data.
 *
 * See also: {@link #checkableField} and {@link #checkedField}
 */

/**
 * @cfg {String} [checkableField=checkable]
 * The field name in the node that allows to control whether this
 * node can be checked or not.
 */

/**
 * @cfg {String} [checkedField=checked]
 * The field name in the node that controls whether this node is
 * checked or not.
 */

/**
 * @cfg {Boolean} [checkOnTriTap=true]
 * Controls whether that node (and child nodes depending on
 * {@link #autoCheckChildren}) should be checked or unchecked
 * when tapped on and if in tri-mode. So if the node is in
 * tri-mode and you tap on it, `true` will check the item while
 * `false` will uncheck it.
 */

/**
 * @cfg {Boolean} [enableTri=true]
 * Whether to support tri-mode. This means when a child is checked
 * or unchecked, the parent nodes will determine if all children
 * are checked or not and if there is a mix of checked and unchecked
 * child nodes, the parent items will show a tri-mode icon.
 * {@link #checkable} should be true/false
 */
/**
 * @property element
 * @inheritdoc
 */

/**
 * @cfg toolDefaults
 * @inheritdoc
 */

/**
 * Expand this tree node if collapse, collapse it if expanded.
 */

/**
 * Collapse this tree node.
 */

/**
 * Expand this tree node.
 */

/**
 * If this cell's checkable config is set to true,
 * it wants to force all nodes to be checkable. A
 * node can opt-out of this and set it's checkable
 * to false.
 *
 * If this cell's checkable config is set to false,
 * it will force all nodes to not be checkable and
 * a node cannot opt-in to being checkable. It's
 * always off.
 *
 * If this cell's checkable config is set to null,
 * which is default, this cell will allow the
 * nodes to opt into being checkable by setting
 * their checkable. In this mode, the node's
 * checked has to be set to true/false.
 */

/**
 * Update properties after a record update.
 *
 * @param {Ext.data.TreeModel} record The node.
 *
 * @private
 */
