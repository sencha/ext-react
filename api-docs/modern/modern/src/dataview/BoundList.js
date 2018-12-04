/**
 * @class Ext.dataview.BoundList
 * @extend Ext.dataview.List
 * @xtype boundlist
 * @private
 * Class used to display popup selection lists bound to fields.
 *
 * A BoundList is not focusable, has no `focusEl`, and has no `tabIndex` stamped into it.
 *
 * Its keyboard events are provided by its owning field, referenced by its `ownerCmp`, and
 * the `BoundListNavigationModel` uses the field as the key event source.
 */
