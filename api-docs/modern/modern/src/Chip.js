/**
 * This class is used to display instances of a data item in an input area. For example,
 * email addresses.
 *
 * To represent {@link Ext.data.Store Stores} of {@link Ext.data.Model records} using Chips,
 * see the {@link Ext.dataview.ChipView} class.
 *
 * @since 6.7.0
 */

 /**
 * @cfg {String} icon
 * Url to the icon image to use if you want an icon to appear on ths chip.
 * See {@link Ext#resolveResource} for details on locating application resources.
 */

/**
 * @cfg {String} iconCls
 * The CSS class to apply to the icon on this chip.
 */

/**
 * @cfg {String} text
 * The text to display in the chip. Mutually exclusive with the
 * {@link #cfg!displayField} config.
 */

/**
 * @cfg {Boolean} [closable=false]
 * Configure as `true` to show a close icon in the chip.
 */

/**
 * @cfg {Function/String} closeHandler
 * @param {Ext.Chip} closeHandler.chip This Chip.
 * @param {Ext.event.Event} closeHandler.e The triggering event.
 * The handler function to run when the close tool is tapped.
 */

/**
 * @cfg {Object} scope
 * The scope (`this` reference) in which the configured {@link #closeHandler} will
 * be executed, unless the scope is a ViewController method name.
 * @accessor
 */
