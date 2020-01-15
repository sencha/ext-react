/**
 * @class Ext.dataview.plugin.SortableList
 * @extend Ext.plugin.Abstract
 * @alias plugin.sortablelist
 *
 * The SortableList plugin gives your list items the ability to be reordered by tapping and
 * dragging elements within the item.
 *
 * The list-sortablehandle is not added to your tpl by default, so it's important that you
 * manually include it. It's also important to recognize that list-items are not draggable
 * themselves.  You must add an element to the itemTpl for it to be dragged.
 *
 * The CSS for MyStyle can be anything that creates an element to tap and drag.  For this
 * example we made a simple rectangle like so:
 *
 *      .myStyle{
 *          width:30px;
 *          height:20px;
 *          background:gray;
 *          float:left;
 *      }
 *
 * Note: You must have infinite set to 'true' when using the SortableList plugin.
 *
 */
