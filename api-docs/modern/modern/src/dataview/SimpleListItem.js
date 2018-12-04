/**
 * @class Ext.dataview.SimpleListItem
 * @extend Ext.Component
 * @xtype simplelistitem
 *
 * A SimpleListItem is a simplified list item that is used by {@link Ext.dataview.List} when
 * useSimpleItems is set to true.  It supports disclosure icons and headers and generates the
 * slimmest markup possible to achieve this. It doesn't support container functionality like adding
 * or docking items. If you require those features you should have your list use
 * {@link Ext.dataview.ListItem} instances by setting the List's
 * {@link Ext.dataview.List#useSimpleItems useSimpleItems} config to `false`.
 */

/**
 * @cfg {Ext.data.Model} [record=null]
 * The model instance of this ListTplItem. It is controlled by the List.
 * @accessor
 */
