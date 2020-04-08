/**
 * A specialized `Ext.dataview.DataView` to display items based upon the structure of
 * the `Ext.Chip` component with the configurations of the "chips" drawn from named
 * fields in the DataView's records.
 *
 * This handles selection and deletion of chips.
 *     @example packages=[ext-react]
 *     Ext.define('Contact', {
 *         extend: 'Ext.data.Model',
 *         fields: [{
 *             name: 'emailAddress'
 *         }, {
 *             name: 'picture'
 *         }, {
 *             name: 'role',
 *             type: 'int'
 *         }, {
 *             name: 'closable',
 *             calculate: function(data) {
 *                 return data.role > 2 ? false: true;
 *             }
 *         }, {
 *             name: 'iconCls',
 *             calculate: function(data) {
 *                 return data.role > 2 ? 'x-manager-icon' : 'x-employee-icon';
 *             }
 *         }]
 *     });
 *
 *     var store = new Ext.data.Store({
 *        model: 'Contact',
 *         data: [{
 *             emailAddress: 'frederick.bloggs@sentcha.com',
 *             picture: 'https://www.sencha.com/assets/images/sencha-avatar-64x64.png',
 *             role: 1
 *         }, {
 *             emailAddress: 'joe.poe@sentcha.com',
 *             picture: 'https://www.sencha.com/assets/images/sencha-avatar-64x64.png',
 *             role: 2
 *         }, {
 *             emailAddress: 'mike.jones@sentcha.com',
 *             picture: 'https://www.sencha.com/assets/images/sencha-avatar-64x64.png',
 *             role: 3
 *         }]
 *     });
 *
 *     <ChipView
 *         store={store}
 *         displayField={'emailAddress'}
 *         iconField='picture'
 *         closeHandler={(chipview, location) => {
 *             store.remove(location.record);
 *
 *              // Stop the event, otherwise the NavigationModel
 *              // will try to click on the nonexistent Chip
 *              return false;
 *          }}
 *      />
 *
 * @since 6.7.0
 */

/**
 * @cfg itemTpl
 * @readonly
 * The `itemTpl` for a ChipView is generated and should not be configured or set.
 */

 /**
 * @cfg {String} iconField
 * The name of the property from the itemTpl's values to use
 * as the chip's {@link #cfg!icon}. Mutually exclusive with the {@link #cfg!icon}
 * prop.
 */

/**
 * @cfg {String} iconClsField
 * The name of the property from the itemTpl's values to use as the chip's
 * {@link #cfg!iconCls}. Mutually exclusive with the {@link #cfg!iconCls} prop.
 */

/**
 * @cfg {String} displayField
 * The name of the property from the itemTpl's values to display
 * as the chip's text. Mutually exclusive with the {@link #cfg!text} prop.
 */

/**
 * @cfg {String} closableField
 * The name of the property from the itemTpl's values whose truthiness value
 * determines closability. Mutually exclusive with the {@link #cfg!closable} prop.
 */

/**
 * @cfg {Boolean} closable
 * Configure as `false` to show the chips without close icons.
 * Only used if {@link #cfg!closableField} is not set.
 */

/**
 * @cfg {Function/String} closeHandler
 * @param {Ext.dom.Element} closeHandler.chipView This ChipView.
 * @param {Ext.dataview.Location} closeHandler.location The dataview location which
 * encapsulates the clicked chip.
 * The handler function to run when the close tool is tapped.
 */

/**
 * @cfg {Object} scope
 * The scope (`this` reference) in which the configured {@link #closeHandler} will be
 * executed, unless the scope is a ViewController method name.
 */

/**
 * @cfg {String/String[]} ui
 * The ui or uis to be used on Chip elements.
 *
 * When an itemUi is configured, CSS class names are added to each chip item element,
 * created by appending the itemUi name(s) to each {@link #classCls} and/or
 * {@link #baseCls}.
 */

/**
 * @cfg {String/String[]/Ext.XTemplate} displayTpl
 * A template to be used to create the textual part of the chip body given its record
 * data.
 *
 * This prop is mutually exclusive with the {@link #cfg!displayField} prop.
 */
