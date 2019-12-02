/**
 * @class Ext.grid.plugin.TreeDragDrop
 * @extend Ext.plugin.dd.DragDrop
 * This plugin provides drag and drop node moving in a tree.
 *
 * @example packages=[ext-react]
 *      import { ExtReact, Panel, Tree } from '@sencha/ext-react-modern';
 *      import React, { Component } from 'react';
 *      export default class TreeDragDropComponent extends Component {
 *          render() {
 *          var store = Ext.create('Ext.data.TreeStore', {
*         root: {
*             text: 'Genre',
*             expanded: true,
*             children: [
*                 {
*                     text: 'Comedy',
*                     children: [
*                         { leaf: true, text: '30 Rock' },
*                         { leaf: true, text: 'Arrested Development' },
*                         { leaf: true, text: 'Bob\'s Burgers' },
*                         { leaf: true, text: 'Curb your Enthusiasm' },
*                         { leaf: true, text: 'Futurama' }
*                     ]
*                 },
*                 {
*                     text: 'Drama',
*                     children: [
*                         { leaf: true, text: 'Breaking Bad', },
*                         { leaf: true, text: 'Game of Thrones' },
*                         { leaf: true, text: 'Lost' },
*                         { leaf: true, text: 'Preacher' },
*                         { leaf: true, text: 'The Wire' }
*                     ]
*                 },
*                 {
*                      text: 'Science Fiction',
*                     children: [
*                         { leaf: true, text: 'Black Mirror' },
*                         { leaf: true, text: 'Doctor Who' },
*                         { leaf: true, text: 'Eureka' },
*                         { leaf: true, text: 'Futurama' },
*                         { leaf: true, text: 'The Twilight Zone' },
*                         { leaf: true, text: 'X-Files' }
*                     ]
*                 }
*             ]
*         }
*     });
 *              return (
 *                  <ExtReact>
 *                      <Panel>
 *                          <Tree
 *                              width={400}
 *                              height={600}
 *                              title="Favourite Shows By Genre"
 *                              store={store}
 *                          >
 *                          </Tree>
 *                      </Panel>
 *                  </ExtReact>
 *              )
 *          }
 *      }
 */
/**
 * @cfg {String/Function} dragText
 * The text to show while dragging.
 *
 * Two placeholders can be used in the text:
 *
 * - `{0}` The number of selected items.
 * - `{1}` 's' when more than 1 items (only useful for English).
 *
 * **NOTE:** The node's text will be shown when a single node is dragged unless `dragText`.
 * @locale
 */

/**
 * @cfg {Number} [expandDelay=1000]
 * The delay in milliseconds to wait before expanding a target tree node while dragging
 * a droppable node over the target.
 */

/**
 * @cfg {Boolean} allowExpandOnHover
 * Waits for `[expandDelay=1000]` to expand a node while drag is hold over a non leaf node
 *
 * Defaults to `true`
 */

/**
 * @cfg {Boolean} [copy=false]
 * Set as `true` to copy the records from the source grid to the destination drop
 * grid.  Otherwise, dragged records will be moved.
 *
 * **Note:** This only applies to records dragged between two different grids with
 * unique stores.
 */

/**
 * @event beforedrop
 * **This event is fired on valid drop at {@link Ext.grid.Tree TreeView}**
 *
 * Returning `false` to this event cancels drop operation and prevent drop event.
 *
 *     tree.on('beforedrop', function(node, data, overModel, dropPosition) {
 *          // return false;
 *     });
 *
 * @param {HTMLElement} node The {@link Ext.grid.Tree tree view} node **if any** over
 * which the cursor was positioned.
 *
 * @param {Object} data The data object gathered on drag start.
 * It contains the following properties:
 * @param {Ext.grid.Tree} data.view The source grid view from which the drag
 * originated
 * @param {Ext.grid.cell.Tree} data.item The grid view node upon which the mousedown event
 * was registered
 * @param {Ext.data.Model[]} data.records An Array of Models representing the
 * selected data being dragged from the source grid view
 *
 * @param {Ext.data.Model} overModel The Model over which the drop gesture took place
 *
 * @param {String} dropPosition `"before"` or `"after"` depending on whether the
 * cursor is above or below the mid-line of the node.
 */

/**
 * @event drop
 * **This event is fired when a drop operation has been completed
 * and the data has been moved {@link Ext.grid.Tree TreeView}**
 *
 * @param {HTMLElement} node The {@link Ext.grid.Tree tree view} node **if any** over
 * which the cursor was positioned.
 *
 * @param {Object} data The data object gathered on drag start.
 * It contains the following properties:
 * @param {Ext.grid.Tree} data.view The source grid view from which the drag
 * originated
 * @param {Ext.grid.cell.Tree} data.item The grid view node upon which the mousedown event
 * was registered
 * @param {Ext.data.Model[]} data.records An Array of Models representing the
 * selected data being dragged from the source grid view
 *
 * @param {Ext.data.Model} overModel The Model over which the drop gesture took place
 *
 * @param {String} dropPosition `"before"` or `"after"` depending on whether the
 * cursor is above or below the mid-line of the node.
 */

