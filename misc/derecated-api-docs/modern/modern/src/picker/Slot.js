/**
 * @class Ext.picker.Slot
 * @extend Ext.dataview.DataView
 * @xtype pickerslot
 * @private
 *
 * A general {@link Ext.picker.Picker} slot class.  Slots are used to organize multiple scrollable slots into
 * a single {@link Ext.picker.Picker}.
 *
 *     {
 *         name : 'limit_speed',
 *         title: 'Speed Limit',
 *         data : [
 *             {text: '50 KB/s', value: 50},
 *             {text: '100 KB/s', value: 100},
 *             {text: '200 KB/s', value: 200},
 *             {text: '300 KB/s', value: 300}
 *         ]
 *     }
 *
 * See the {@link Ext.picker.Picker} documentation on how to use slots.
 */

/**
 * @event slotpick
 * Fires whenever an slot is picked
 * @param {Ext.picker.Slot} this
 * @param {Mixed} value The value of the pick
 * @param {HTMLElement} node The node element of the pick
 */


/**
 * @cfg {String} [title=null]
 * The title to use for this slot, or `null` for no title.
 * @accessor
 */

/**
 * @cfg {String} [name=null] (required)
 * The name of this slot.
 * @accessor
 */

/**
 * @cfg {Number} [value=null]
 * The value of this slot
 * @accessor
 */

/**
 * @cfg {String} [align='left']
 * The horizontal alignment of the slot's contents.
 *
 * Valid values are: "left", "center", and "right".
 * @accessor
 */

/**
 * @cfg {String} [displayField='text']
 * The display field in the store.
 * @accessor
 */

/**
 * @cfg {String} [valueField='value']
 * The value field in the store.
 * @accessor
 */

/**
 * @cfg {Function/String/String[]} [itemTpl=null]
 * The template to be used in this slot.
 * If you set this, {@link #displayField} will be ignored.
 */

/**
 * @cfg {Object} scrollable
 * @accessor
 * @hide
 */
