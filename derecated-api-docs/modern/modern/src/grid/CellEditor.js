/**
 * @class Ext.grid.CellEditor
 * @extend Ext.Editor
 * @xtype celleditor
 * This class specializes `Ext.Editor` for the purpose of editing grid cells inline. This
 * class is not instantiated by user code but rather by `Ext.grid.plugin.CellEditing`.
 * @private
 * @since 6.5.0
 */

/**
 * @cfg {Boolean} [autoPin=true]
 * Determines if the row that the cell editor is attached to will pin to the top
 * and bottom when scrolling. If false editing will be canceled when cell editor
 * is scrolled off the list.
 *
 * @accessor
 */
