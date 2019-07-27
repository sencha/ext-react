/**
 * @class Ext.grid.plugin.RowDragDrop
 * @extend Ext.plugin.dd.DragDrop
 * This plugin provides row drag and drop functionality.
 *
 *```HTML
 *@example({tab: 1})
 *<ext-grid height="300" fullscreen="true"
 *    Plugins='{"gridrowdragdrop": true}'
 *    selectable='{ "checkbox": true }' 
 *    onready="editablegrid.onGridReady"
 *>
 *    <ext-column header="Name" dataIndex="name"></ext-column>
 *    <ext-column text="Email" dataIndex="email" width="230"></ext-column>
 *    <ext-column text="Phone" dataIndex="phone" width="150"></ext-column>
 *</ext-grid>
 *```
 *```javascript
 *@example({tab: 2, packages: ['ext-web-components']})
 *import '@sencha/ext-web-components/dist/ext-grid.component';
 *import '@sencha/ext-web-components/dist/ext-column.component';
 *
 * Ext.require(['Ext.grid.plugin.RowDragDrop']);
 * * 
 *export default class RowDragDropComponent {
 *    constructor() {
 *        this.store = new Ext.data.Store({
 *            fields: ['name', 'email', 'phone'],
 *            data: [
 *                { name: 'Lisa', email: 'lisa@simpsons.com', phone: '555-111-1224' },
 *                { name: 'Bart', email: 'bart@simpsons.com', phone: '555-222-1234' },
 *                { name: 'Homer', email: 'homer@simpsons.com', phone: '555-222-1244' },
 *                { name: 'Marge', email: 'marge@simpsons.com', phone: '555-222-1254' }
 *            ],
 *            proxy: {
 *                type: 'memory',
 *                reader: {
 *                    type: 'json'
 *                }
 *            }
 *       });
 *   }
 *
 *   onGridReady(event) {
 *       this.editableGridCmp = event.detail.cmp;
 *       this.editableGridCmp.setStore(this.store);
 *   }
 *}
 *
 *window.rowdragdrop = new RowDragDropComponent();
 *```
 *
 */ 
     
       /**
        * @cfg {String/function} dragText
        * The text to show while dragging
        * Defaults to String
        * 
        * Two placeholders can be used in the text:
        *
        * - `{0}` The number of selected items.
        * - `{1}` 's' when more than 1 items (only useful for English).
        */
   
       /**
        * @cfg {Boolean} dragIcon
        * Set as `true` to show drag icon on grid row.
        *
        * **NOTE:** Defaults to `true` in touch supported devices
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
        * **This event is fired on valid drop at {@link Ext.grid.Grid GridView}**
        * 
        * Returning `false` to this event cancels drop operation and prevent drop event.
        *  
        *     grid.on('beforedrop', function(node, data, overModel, dropPosition) {
        *          // return false;
        *     });
        *
        * @param {HTMLElement} node The {@link Ext.grid.Grid grid view} node **if any** over 
        * which the cursor was positioned.
        *
        * @param {Object} data The data object gathered on drag start.
        * It contains the following properties:
        * @param {Ext.grid.Grid} data.view The source grid view from which the drag 
        * originated
        * @param {Ext.grid.cell.Cell} data.item The grid view node upon which the mousedown event 
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
        * and the data has been moved {@link Ext.grid.Grid GridView}**
        *
        * @param {HTMLElement} node The {@link Ext.grid.Grid grid view} node **if any** over 
        * which the cursor was positioned.
        *
        * @param {Object} data The data object gathered on drag start.
        * It contains the following properties:
        * @param {Ext.grid.Grid} data.view The source grid view from which the drag 
        * originated
        * @param {Ext.grid.cell.Cell} data.item The grid view node upon which the mousedown event 
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
        * Add drag indicator on touch supported devices
        * or if `dragIcon` is true
        */
          
       /**
        * Add `dragIcon` column to the region grid if it doesn't exist
        * @param {Ext.grid.Grid} grid 
        * @param {Ext.grid.column.Column} columns 
        */
          
       /**
        * Manage `dragIcon` column
        * @param {Ext.grid.Grid} regionGrid 
        * @param {Ext.grid.column.Column} column 
        */
          
       /**
        * Reposition `dragIcon` column on region grid column changes its
        * region position 
        */
      
   