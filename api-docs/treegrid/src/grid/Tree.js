/**
 * @class Ext.grid.Tree
 * @extend Ext.grid.Grid
 * @xtype tree
 * @alternateClassName Ext.tree.Tree
 * The TreeGrid provides a tree-structured UI representation of tree-structured data.
 * TreeGrids must be bound to a {@link Ext.data.TreeStore}.
 *
 * TreeGrid supports multiple columns through the {@link #columns} configuration.
 *
 * By default a TreeGrid contains a single column that uses the `text` field of
 * the store's nodes.
 *
 * Here is a simple TreeGrid using inline data:
 *
 * @example packages=[ext-react]
 * import React, { Component } from 'react';
 * import { Panel, Tree } from '@sencha/ext-modern';
 *
 * export default class MyExample extends Component {
 *      state = {
 *          store: Ext.create('Ext.data.TreeStore', {
 *              root: {
 *                  text: 'Genre',
 *                  expanded: true,
 *                  children: [
 *                      {
 *                          text: 'Comedy',
 *                          children: [
 *                              { leaf: true, text: '30 Rock' },
 *                              { leaf: true, text: 'Arrested Development' },
 *                              { leaf: true, text: 'Bob\'s Burgers' },
 *                              { leaf: true, text: 'Curb your Enthusiasm' },
 *                              { leaf: true, text: 'Futurama' }
 *                          ]
 *                      },
 *                      {
 *                          text: 'Drama',
 *                          children: [
 *                              { leaf: true, text: 'Breaking Bad', },
 *                              { leaf: true, text: 'Game of Thrones' },
 *                              { leaf: true, text: 'Lost' },
 *                              { leaf: true, text: 'Preacher' },
 *                              { leaf: true, text: 'The Wire' }
 *                          ]
 *                      },
 *                      {
 *                          text: 'Science Fiction',
 *                          children: [
 *                              { leaf: true, text: 'Black Mirror' },
 *                              { leaf: true, text: 'Doctor Who' },
 *                              { leaf: true, text: 'Eureka' },
 *                              { leaf: true, text: 'Futurama' },
 *                              { leaf: true, text: 'The Twilight Zone' },
 *                              { leaf: true, text: 'X-Files' }
 *                          ]
 *                      }
 *                  ]
 *              }
 *          })
 *       }
 *       render() {
 *           return (
 *               <Panel fullscreen>
 *                   <Tree    
 *                       height="600"
 *                       width="400"
 *                       title="Favorite Shows by Genre"
 *                       store={this.state.store}
 *                   />
 *               </Panel>
 *           )
 *       }
 *  }
 */

/**
 * @event beforenodeexpand
 * Fires before an row is visually expanded. May be vetoed by returning false from a handler.
 * @param {Ext.grid.Row} row                    The row to be expanded
 * @param {Ext.data.NodeInterface} record       The record to be expanded
 */

/**
 * @event nodeexpand
 * Fires after an row has been visually expanded and its child nodes are visible in the tree.
 * @param {Ext.grid.Row} row                    The row that was expanded
 * @param {Ext.data.NodeInterface} record       The record that was expanded
 */

/**
 * @event beforenodecollapse
 * Fires before an row is visually collapsed. May be vetoed by returning false from a handler.
 * @param {Ext.grid.Row} node                   The row to be collapsed
 * @param {Ext.data.NodeInterface} record       The record to be collapsed
 */

/**
 * @event nodecollapse
 * Fires after an row has been visually collapsed and its child nodes are no longer
 * visible in the tree.
 * @param {Ext.grid.Row} node                   The row that was collapsed
 * @param {Ext.data.NodeInterface} record       The record that was collapsed
 */

/**
 * @event checkchange
 * Fires when a node with a checkbox's checked property changes.
 * @param {Ext.grid.cell.Tree} cell               The cell who's checked property was changed.
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
 * @cfg {Boolean} expanderFirst
 * `true` to display the expander to the left of the item text.
 * `false` to display the expander to the right of the item text.
 */

/**
 * @cfg {Boolean} expanderOnly
 * `true` to expand only on the click of the expander element. Setting this to
 * `false` will allow expansion on click of any part of the element.
 */

/**
 * @cfg {Boolean} selectOnExpander
 * `true` to select the node when clicking the expander.
 */

/**
 * @cfg {Boolean} [singleExpand]
 * `true` if only 1 node per branch may be expanded.
 */

/**
 * @cfg {Boolean} [folderSort=false]
 * True to automatically prepend a leaf sorter to the store.
 */

/**
 * Sets root node of this tree. All trees *always* have a root node. It may be
 * {@link #rootVisible hidden}.
 *
 * If the passed node has not already been loaded with child nodes, and has its expanded field
 * set, this triggers the {@link #cfg-store} to load the child nodes of the root.
 * @param {Ext.data.TreeModel/Object} root
 * @return {Ext.data.TreeModel} The new root
 */

/**
 * Returns the root node for this tree.
 * @return {Ext.data.TreeModel}
 */

/**
 * Expands a record that is loaded in the tree.
 * @param {Ext.data.Model} record The record to expand
 * @param {Boolean} [deep] True to expand nodes all the way down the tree hierarchy.
 * @param {Function} [callback] The function to run after the expand is completed
 * @param {Object} [scope] The scope of the callback function.
 */

/**
 * Collapses a record that is loaded in the tree.
 * @param {Ext.data.Model} record The record to collapse
 * @param {Boolean} [deep] True to collapse nodes all the way up the tree hierarchy.
 * @param {Function} [callback] The function to run after the collapse is completed
 * @param {Object} [scope] The scope of the callback function.
 */

/**
 * Expand all nodes
 * @param {Function} [callback] A function to execute when the expand finishes.
 * @param {Object} [scope] The scope of the callback function
 */

/**
 * Collapse all nodes
 * @param {Function} [callback] A function to execute when the collapse finishes.
 * @param {Object} [scope] The scope of the callback function
 */

/**
 * @method getChecked
 * Retrieve an array of checked records.
 * @return {Ext.data.NodeInterface[]} An array containing the checked records
 * @since 7.0
 */

/**
 * get checked nodes
 * @param {Array} [childNodes] childNodes of a parent node
 * @param {Array} [checked] array of checked nodes
 */