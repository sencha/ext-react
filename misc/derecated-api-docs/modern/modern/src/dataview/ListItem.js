/**
 * @class Ext.dataview.ListItem
 * @extend Ext.dataview.component.DataItem
 * @xtype listitem
 *
 * A ListItem is a container for {@link Ext.dataview.List} with
 * useSimpleItems: false.
 *
 * ListItem configures and updates the {@link Ext.data.Model records} for
 * the sub-component items in a list.
 *
 * Overwrite the `updateRecord()` method to set a sub-component's value.
 * the framework calls `updateRecord()` whenever the data in the list updates.
 *
 * The `updatedata` event fires after `updateRecord()` runs.
 *
 * *Note*: Use of ListItem increases overhead since it generates more markup than
 * using the List class with useSimpleItems: true. This overhead is more
 * noticeable in Internet Explorer. If at all possible, use
 * {@link Ext.dataview.SimpleListItem} instead via the List's
 * {@link Ext.dataview.List#useSimpleItems useSimpleItems} config.
 */

/**
 * @event updatedata
 * Fires whenever the data of the DataItem is updated.
 * @param {Ext.dataview.component.DataItem} this The DataItem instance.
 * @param {Object} newData The new data.
 */
