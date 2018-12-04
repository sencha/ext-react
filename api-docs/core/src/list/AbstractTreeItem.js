/**
 * @class Ext.list.AbstractTreeItem
 * @extend Ext.Widget
 * The base class for all items in the `{@link Ext.list.Tree treelist}`.
 * @since 6.0.0
 */

/**
 * @method setExpandable
 * @ignore
 */

/**
 * @method setExpanded
 * @ignore
 */

/**
 * @method setIconCls
 * @ignore
 */

/**
 * @method setLeaf
 * @ignore
 */

/**
 * @method setOwner
 * @ignore
 */

/**
 * @method setLoading
 * @ignore
 */

/**
 * @method setNode
 * @ignore
 */

/**
 * @method setParentItem
 * @ignore
 */

/**
 * @method setText
 * @ignore
 */

/**
 * @method destroy
 * @inheritdoc
 */

/**
 * @cfg {Boolean} [expandable=false]
 * `true` if this item is expandable. This value is taken from
 * the underlying {@link #node}.
 */

/**
 * @cfg {Boolean} [expanded=false]
 * `true` if this item is expanded. This value is taken from
 * the underlying {@link #node}.
 */

/**
 * @cfg [iconCls='']
 * @inheritdoc Ext.panel.Header#cfg-iconCls
 * @localdoc **Note:** This value is taken from the underlying {@link #node}.
 */

/**
 * @cfg {Boolean} [leaf=false]
 * `true` if this item is a leaf. This value is taken from
 * the underlying {@link #node}.
 */

/**
 * @cfg {Boolean} [loading=false]
 * `true` if this item is currently loading data. This value is taken from
 * the underlying {@link #node}.
 */

/**
 * @cfg {Boolean} [selected=false]
 * `true` if this is the selected item in the tree.
 */

/**
 * @cfg {Boolean} [selectedParent=false]
 * `true` if this item contains the {@link #selected} item in the tree.
 */

/**
 * @cfg {String} [iconClsProperty='iconCls']
 * The property from the {@link #node} to map for the {@link #iconCls} config.
 * @accessor
 */

/**
 * @cfg {Ext.list.Tree} [owner=null]
 * The owning list for this container.
 * @accessor
 */

/**
 * @cfg {Ext.data.TreeModel} [node=null]
 * The backing node for this item.
 * @accessor
 */

/**
 * @cfg {Number} [over=null]
 * One of three possible values:
 *
 *   - 0 if mouse is not over this item or any of its descendants.
 *   - 1 if mouse is not over this item but is over one of this item's descendants.
 *   - 2 if mouse is directly over this item.
 * @accessor
 */

/**
 * @cfg {Ext.list.AbstractTreeItem} [parentItem=null]
 * The parent item for this item.
 * @accessor
 */

/**
 * @cfg {String} text
 * The text for this item. This value is taken from
 * the underlying {@link #node}.
 * @accessor
 */

/**
 * @cfg {String} [textProperty='text']
 * The property from the {@link #node} to map for the {@link #text} config.
 * @accessor
 */

/**
 * @method collapse
 * Collapse this item. Does nothing if already collapsed.
 */

/**
 * @method expand
 * Expand this item. Does nothing if already expanded.
 */

/**
 * @method isExpanded
 * Check if the current item is expanded.
 * @return {Boolean} `true` if this item is expanded.
 */

/**
 * @event itemclick
 * @member Ext.list.Tree
 *
 * @param {Ext.list.Tree} sender The `treelist` that fired this event.
 *
 * @param {Object} info
 * @param {Ext.event.Event} info.event The DOM event that precipitated this
 * event.
 * @param {Ext.list.AbstractTreeItem} info.item The tree node that was clicked.
 * @param {Ext.list.Tree} info.tree The `treelist` that fired this event.
 * @param {Boolean} info.select On input this is value is the result of the
 *   {@link #isSelectionEvent} method. On return from event handlers (assuming a
 *   `false` return does not cancel things) this property is used to determine
 *   if the clicked node should be selected.
 * @param {Boolean} info.toggle On input this is value is the result of the
 *   {@link #isToggleEvent} method. On return from event handlers (assuming a
 *   `false` return does not cancel things) this property is used to determine
 *   if the clicked node's expand/collapse state should be toggled.
 *
 * @since 6.0.1
 */
