/**
 * @class Ext.dataview.NestedList
 * @extend Ext.Container
 * @xtype nestedlist
 *
 * NestedList provides a miller column interface to navigate between nested sets
 * and provide a clean interface with limited screen real-estate.
 *
 *     @example packages=[ext-react]
 *     import React, { Component } from 'react'
 *     import { ExtReact, NestedList } from '@sencha/ext-react-modern';
 *
 *     export default class MyExample extends Component {
 *
 *         store = Ext.create('Ext.data.TreeStore', {
 *             defaultRootProperty: 'items',
 *             root: {
 *                 text: 'Groceries',
 *                 items: [{
 *                     text: 'Drinks',
 *                     items: [{
 *                         text: 'Water',
 *                         items: [{
 *                             text: 'Sparkling',
 *                             leaf: true
 *                         }, {
 *                             text: 'Still',
 *                             leaf: true
 *                         }]
 *                     }]
 *                 },{
 *                     text: 'Snacks',
 *                     items: [{
 *                         text: 'Nuts',
 *                         leaf: true
 *                     }, {
 *                         text: 'Pretzels',
 *                         leaf: true
 *                     }, {
 *                         text: 'Wasabi Peas',
 *                         leaf: true
 *                     }]
 *                 }]
 *             }
 *         });
 *
 *         render() {
 *             return (
 *                 <ExtReact>
 *                      <NestedList
 *                          displayField="text"
 *                          store={this.store}
 *                          title="Groceries"
 *                      />
 *                 <ExtReact>
 *             )
 *         }
 *     }
 *
 */

/**
 * @cfg {String} [backText='Back']
 * The label to display for the back button.
 * @accessor
 */

/**
 * @cfg {Boolean} [useTitleAsBackText=true]
 * `true` to use title as a label for back button.
 * @accessor
 */

/**
 * @cfg {Boolean} [updateTitleText=true]
 * Update the title text with the currently selected category.
 * @accessor
 */

/**
 * @cfg {String} [displayField='text']
 * Display field to use when setting item text and title.
 * This configuration is ignored when overriding {@link #getItemTextTpl} or
 * {@link #getTitleTextTpl} for the item text or title.
 * @accessor
 */

/**
 * @cfg {String} [loadingText='Loading...']
 * Loading text to display when a subtree is loading.
 * @accessor
 */

/**
 * @cfg {String} [emptyText='No items available.']
 * Empty text to display when a subtree is empty.
 * @accessor
 */

/**
 * @cfg {Boolean/Function} [onItemDisclosure=false]
 * Maps to the {@link Ext.List#onItemDisclosure} configuration for individual lists.
 * @accessor
 */

/**
 * @cfg {Boolean} [allowDeselect=false]
 * Set to `true` to allow the user to deselect leaf items via interaction.
 * @accessor
 */

/**
 * @cfg {Ext.Toolbar/Object/Boolean} toolbar
 * The configuration to be used for the toolbar displayed in this nested list.
 * @accessor
 */

/**
 * @cfg {String} [title='']
 * The title of the toolbar.
 * @accessor
 */

/**
 * @cfg {String} layout
 * @hide
 * @accessor
 */

/**
 * @cfg {Ext.data.TreeStore/String} [store=null]
 * The tree store to be used for this nested list.
 * @accessor
 */

/**
 * @cfg {Ext.Container} [detailContainer=null]
 * The container of the `detailCard`. A detailContainer is a reference to the container
 * where a detail card displays.
 *
 * See http://docs.sencha.com/touch/2-2/#!/guide/nested_list-section-4
 * and http://en.wikipedia.org/wiki/Miller_columns
 *
 * The two possible values for a detailContainer are undefined (default),
 * which indicates that a detailCard appear in the same container, or you
 * can specify a new container location. The default condition uses the
 * current List container.
 *
 * The following example shows creating a location for a detailContainer:
 *
 * var detailContainer = Ext.create('Ext.Container', {
         *     layout: 'card'
         * });
 *
 * var nestedList = Ext.create('Ext.NestedList', {
         *     store: treeStore,
         *     detailCard: true,
         *     detailContainer: detailContainer
         * });
 *
 * The default value is typically used for phone devices in portrait mode
 * where the small screen size dictates that the detailCard replace the
 * current container.
 * @accessor
 */

/**
 * @cfg {Ext.Component} [detailCard=null]
 * Provides the information for a leaf in a Miller column list. In a Miller column,
 * users follow a hierarchical tree structure to a leaf, which provides information
 * about the item in the list. The detailCard lists the information at
 * the leaf.
 *
 * See http://docs.sencha.com/touch/2-2/#!/guide/nested_list-section-3
 * and http://en.wikipedia.org/wiki/Miller_columns
 *
 * @accessor
 */

/**
 * @cfg {Object} backButton
 * The configuration for the back button used in the nested list.
 * @accessor
 */

/**
 * @cfg {Object} [listConfig=null]
 * An optional config object which is merged with the default
 * configuration used to create each nested list.
 * @accessor
 */

/**
 * @cfg {Boolean} [useSimpleItems=true]
 * Set this to false if you want the lists in this NestedList to create complex
 * container list items.
 * @accessor
 */

/**
 * @cfg {Number} [itemHeight=null]
 * This allows you to set the default item height and is used to roughly calculate the amount
 * of items needed to fill the list. By default items are around 50px high. If you set this
 * configuration in combination with setting the {@link #variableHeights} to false you
 * can improve the scrolling speed.
 * @accessor
 */

/**
 * @cfg {Boolean} [variableHeights=false]
 * This configuration allows you optimize the picker by not having it read the DOM
 * heights of list items. Instead it will assume (and set) the height to be the
 * {@link #itemHeight}.
 * @accessor
 */

/**
 * @event itemtap
 * Fires when a node is tapped on.
 * @param {Ext.dataview.NestedList} this
 * @param {Ext.dataview.List} list The Ext.dataview.List that is currently active.
 * @param {Number} index The index of the item tapped.
 * @param {Ext.dom.Element} target The element tapped.
 * @param {Ext.data.Record} record The record tapped.
 * @param {Ext.event.Event} e The event object.
 */

/**
 * @event itemdoubletap
 * Fires when a node is double tapped on.
 * @param {Ext.dataview.NestedList} this
 * @param {Ext.dataview.List} list The Ext.dataview.List that is currently active.
 * @param {Number} index The index of the item that was tapped.
 * @param {Ext.dom.Element} target The element tapped.
 * @param {Ext.data.Record} record The record tapped.
 * @param {Ext.event.Event} e The event object.
 */

/**
 * @event containertap
 * Fires when a tap occurs and it is not on a template node.
 * @param {Ext.dataview.NestedList} this
 * @param {Ext.dataview.List} list The Ext.dataview.List that is currently active.
 * @param {Ext.event.Event} e The raw event object.
 */

/**
 * @event selectionchange
 * Fires when the selected nodes change.
 * @param {Ext.dataview.NestedList} this
 * @param {Ext.dataview.List} list The Ext.dataview.List that is currently active.
 * @param {Array} selections Array of the selected nodes.
 */

/**
 * @event listchange
 * Fires when the user taps a list item.
 * @param {Ext.dataview.NestedList} this
 * @param {Object} listitem The new active list.
 */

/**
 * @event leafitemtap
 * Fires when the user taps a leaf list item.
 * @param {Ext.dataview.NestedList} this
 * @param {Ext.List} list The subList the item is on.
 * @param {Number} index The index of the item tapped.
 * @param {Ext.dom.Element} target The element tapped.
 * @param {Ext.data.Record} record The record tapped.
 * @param {Ext.event.Event} e The event.
 */

/**
 * @event back
 * @preventable
 * Fires when the user taps Back.
 * @param {Ext.dataview.NestedList} this
 * @param {HTMLElement} node The node to be selected.
 * @param {Ext.dataview.List} lastActiveList The Ext.dataview.List that was last active.
 * @param {Boolean} detailCardActive Flag set if the detail card is currently active.
 */

/**
 * @event beforeload
 * Fires before a request is made for a new data object.
 * @param {Ext.dataview.NestedList} this
 * @param {Ext.data.Store} store The store instance.
 * @param {Ext.data.Operation} operation The Ext.data.Operation object that will be passed to the Proxy to
 * load the Store.
 */

/**
 * @event load
 * Fires whenever records have been loaded into the store.
 * @param {Ext.dataview.NestedList} this
 * @param {Ext.data.Store} store The store instance.
 * @param {Ext.util.Grouper[]} records An array of records.
 * @param {Boolean} successful `true` if the operation was successful.
 * @param {Ext.data.Operation} operation The associated operation.
 */

/**
 * @method onItemTap
 * Called when an list item has been tapped.
 * @param {Ext.List} list The subList the item is on.
 * @param {Number} index The id of the item tapped.
 * @param {Ext.Element} target The list item tapped.
 * @param {Ext.data.Record} record The record which as tapped.
 * @param {Ext.event.Event} e The event.
 */

/**
 * @method onBackTap
 * Called when the backButton has been tapped.
 */

/**
 * @method getItemTextTpl
 * Override this method to provide custom template rendering of individual
 * nodes. The template will receive all data within the Record and will also
 * receive whether or not it is a leaf node.
 * @param {Ext.data.Record} node
 * @return {String}
 */

/**
 * @method getTitleTextTpl
 * Override this method to provide custom template rendering of titles/back
 * buttons when {@link #useTitleAsBackText} is enabled.
 * @param {Ext.data.Record} node
 * @return {String}
 */

/**
 * @method goToNode
 * Method to handle going to a specific node within this nested list. Node must be part of the
 * internal {@link #store}.
 * @param {Ext.data.NodeInterface} node The specified node to navigate to.
 */

/**
 * @method goToLeaf
 * The leaf you want to navigate to. You should pass a node instance.
 * @param {Ext.data.NodeInterface} node The specified node to navigate to.
 */
