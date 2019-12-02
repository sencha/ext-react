/**
 * @class Ext.list.Tree
 * @extend Ext.Widget
 * @xtype treelist
 * A lightweight component to display data in a simple tree structure using a
 * {@link Ext.data.TreeStore}.
 *
 * Simple Treelist using inline data:
 *
 *     @example packages=[ext-react]
 *     import React, { Component } from 'react';
 *     import { Panel, TreeList } from '@sencha/ext-react-modern';
 *
 *     export default class MyExample extends Component {
 *
 *         store = Ext.create('Ext.data.TreeStore', {
 *             rootVisible: true,
 *             root: {
 *                 expanded: true,
 *                 children: [{
 *                     text: 'detention',
 *                     leaf: true,
 *                     iconCls: 'x-fa fa-frown-o'
 *                 }, {
 *                     text: 'homework',
 *                     expanded: true,
 *                     iconCls: 'x-fa fa-folder',
 *                     children: [{
 *                         text: 'book report',
 *                         leaf: true,
 *                         iconCls: 'x-fa fa-book'
 *                     }, {
 *                         text: 'algebra',
 *                         leaf: true,
 *                         iconCls: 'x-fa fa-graduation-cap'
 *                     }]
 *                 }, {
 *                     text: 'buy lottery tickets',
 *                     leaf: true,
 *                     iconCls: 'x-fa fa-usd'
 *                 }]
 *             }
 *         });
 *
 *         render() {
 *             return (
 *                 <Panel shadow layout="fit">
 *                     <TreeList
 *                         ref="tree"
 *                         store={this.store}
 *                     />
 *                 </Panel>
 *             )
 *         }
 *     }
 *
 * To collapse the Treelist for use in a smaller navigation view see {@link #micro}.
 * Parent Treelist node expansion may be refined using the {@link #singleExpand} and
 * {@link #expanderOnly} config options.  Treelist nodes will be selected when clicked /
 * tapped excluding clicks on the expander unless {@link #selectOnExpander} is set to
 * `true`.
 *
 * @since 6.0.0
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
 * @cfg {Object} [defaults]
 * The default configuration for the widgets created for tree items.
 *
 * @cfg {String} [defaults.xtype="treelistitem"]
 * The type of item to create. By default, items are `{@link Ext.list.TreeItem treelistitem}`
 * instances. This can be customized but this `xtype` must reference a class that
 * ultimately derives from the `{@link Ext.list.AbstractTreeItem}` base class.
 * @accessor
 */

/**
 * @cfg {Boolean} [highlightPath=null]
 * Set as `true` to highlight all items on the path to the currently selected
 * node.
 * @accessor
 */

/**
 * @cfg {Boolean} [micro=false]
 *
 * Set to `true` to collapse the Treelist UI to display only the
 * {@link Ext.data.NodeInterface#cfg-iconCls icons} of the root nodes.  Hovering
 * the cursor (or tapping on a touch-enabled device) shows the child nodes beside
 * the icon.
 * @accessor
 */

/**
 * @cfg {Ext.data.TreeModel} [selection=null]
 *
 * The current selected node.
 * @accessor
 */

/**
 * @cfg {Boolean} [selectOnExpander=false]
 * `true` to select the node when clicking the expander.
 * @accessor
 */

/**
 * @cfg {Boolean} [singleExpand=false]
 * `true` if only 1 node per branch may be expanded.
 * @accessor
 */

/**
 * @cfg {String/Object/Ext.data.TreeStore} [store=null]
 * The data source to which this component is bound.
 * @accessor
 */

/**
 * @method getItem
 * Get a child {@link Ext.list.AbstractTreeItem item} by node.
 * @param {Ext.data.TreeModel} node The node.
 * @return {Ext.list.AbstractTreeItem} The item. `null` if not found.
 */

/**
 * @method getItemConfig
 * This method is called to populate and return a config object for new nodes. This
 * can be overridden by derived classes to manipulate properties or `xtype` of the
 * returned object. Upon return, the object is passed to `{@link Ext#create}` and the
 * reference is stored as part of this tree.
 *
 * The base class implementation will apply any configured `{@link #defaults}` to the
 * object it returns.
 *
 * @param {Ext.data.TreeModel} node The node backing the item.
 * @param {Ext.list.AbstractTreeItem} parent The parent item. This is never `null` but
 * may be an instance of `{@link Ext.list.RootTreeItem}`.
 * @return {Object} The config object to pass to `{@link Ext#create}` for the item.
 * @template
 */
