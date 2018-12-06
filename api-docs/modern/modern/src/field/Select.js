/**
 * Simple Select field wrapper. Example usage:
 *
 *     @example
 *     Ext.create('Ext.form.Panel', {
 *         fullscreen: true,
 *         items: [{
 *             xtype: 'fieldset',
 *             title: 'Select',
 *             items: [{
 *                 xtype: 'selectfield',
 *                 label: 'Choose one',
 *                 options: [{
 *                     text: 'First Option',
 *                     value: 'first'
 *                 }, {
 *                     text: 'Second Option',
 *                     value: 'second'
 *                 }, {
 *                     text: 'Third Option',
 *                     value: 'third'
 *                 }]
 *             }]
 *         }]
 *     });
 */

/**
 * @property {Boolean} isSelectField
 * `true` in this class to identify an object this type, or subclass thereof.
 */

/**
 * @event change
 * Fires when selection has changed.
 *
 * This includes keystrokes that edit the text (if editable).
 * @param {Ext.field.Select} this
 * @param {Ext.data.Model} newValue The corresponding record for the new value
 * @param {Ext.data.Model} oldValue The corresponding record for the old value
 */

/**
 * @event select
 * Fires when an option from the drop down list has been selected.
 * @param {Ext.field.Select} this
 * @param {Ext.data.Model} newValue The corresponding record for the new value
 */

/**
 * @event focus
 * Fires when this field receives input focus. This happens both when you tap on the
 * field and when you focus on the field by using 'next' or 'tab' on a keyboard.
 *
 * Please note that this event is not very reliable on Android. For example, if your
 * Select field is second in your form panel, you cannot use the Next button to get to
 * this select field. This functionality works as expected on iOS.
 * @param {Ext.field.Select} this This field
 * @param {Ext.event.Event} e
 */

 /**
 * @cfg {Object|Ext.util.Collection} valueCollection
 * A {@link Ext.util.Collection collection} instance, or configuration object used
 * to create the collection of selected records.
 *
 * This is used by the {@link #cfg!picker} as the core of its selection handling,
 * and also as the collection of selected values for this widget.
 *
 * @readonly
 * @private
 * @since 6.5.0
 */

/**
 * @cfg {String/Number} valueField
 * The underlying {@link Ext.data.Field#name data value name} to bind to this
 * Select control. If configured as `null`, the {@link #cfg!displayField} is
 * used.
 * @accessor
 */

/**
 * @cfg {String/Ext.XTemplate} itemTpl
 * An XTemplate definition string (Or an {@link Ext.XTemplate}) which specifies
 * how to display a list item from a record values object. This is automatically
 * generated to display the {@link #cfg!displayField} if not specified.
 */

/**
 * @cfg {String} itemCls
 * An additional CSS class to apply to items within the picker list.
 */

/**
 * @cfg {String/String[]/Ext.XTemplate} displayTpl
 * The template to be used to display the selected record inside the text field.
 *
 * If not specified, the {@link #cfg!displayField} is shown in the text field.
 */

/**
 * @cfg {String/Number} displayField
 * The underlying {@link Ext.data.Field#name data value name} to bind to this
 * Select control.  If configured as `null`, the {@link #cfg!valueField} is used.
 *
 * This resolved value is the visibly rendered value of the available selection
 * options.
 * @accessor
 */

/**
 * @cfg {Ext.data.Store/Object/String} store
 * The store to provide selection options data. Either a Store instance,
 * configuration object or store ID.
 * @accessor
 */

/**
 * @cfg {Array} options
 * An array of select options.
 *
 *     [
 *         {text: 'First Option',  value: 'first'},
 *         {text: 'Second Option', value: 'second'},
 *         {text: 'Third Option',  value: 'third'}
 *     ]
 *
 * __Note:__ Option object member names should correspond with defined
 * {@link #valueField valueField} and {@link #displayField displayField} values.
 *
 * This config is mutually exclusive with the {@link #cfg!store} config. Specifying
 * them both is unssupported and will produce undefined behaviour.
 * @accessor
 */

/**
 * @cfg {String} hiddenName
 * Specify a `hiddenName` if you're using the {@link Ext.form.Panel#standardSubmit}
 * option. This name will be used to post the underlying value of the select to
 * the server.
 * @accessor
 */

/**
 * @cfg {Boolean/'initial'} autoSelect
 * `true` to auto select the first value in the {@link #store} or {@link #options}
 * when they are changed. This settings attempts to avoid the {@link #value} being
 * set to `null`, unless {@link #clearable clearable} is also `true` in which case
 * only other changes (such as store load) will trigger auto-selection.
 *
 * If this value is `'initial'` then auto selection will only occur on the first
 * opportunity (such as initial store load). This config will then be set to
 * `false`.
 */

/**
 * @cfg {Boolean} autoFocus
 * `true` to automatically focus the first result gathered by the data store in the
 * dropdown list when it is opened. A false value would cause nothing in the list
 * to be highlighted automatically, so the user would have to manually highlight an
 * item before pressing the enter or {@link #selectOnTab tab} key to select it
 * (unless the value of ({@link #typeAhead}) were true), or use the mouse to select
 * a value.
 */

/**
 * @cfg {Boolean} autoFocusLast
 * When `true`, the last selected record in the dropdown list will be re-selected
 * upon {@link #autoFocus}. Set to `false` to always select the first record in
 * the drop-down list. For accessible applications it is recommended to set this
 * option to `false`.
 */

/**
 * @cfg {Ext.data.Model} selection
 * @accessor
 * The selected model. `null` if no value exists.
 */

/**
 * @cfg {Boolean} autoLoadOnValue
 * This option controls whether to initially load the store when a value is set so
 * that the display value can be determined from the appropriate record.
 *
 * The store will only be loaded in a limited set of circumstances:
 * - The store is not currently loading.
 * - The store does not have a pending {@link Ext.data.Store#autoLoad}.
 * - The store has not been loaded before.
 */

/**
 * @cfg {Boolean} forceSelection
 * By default the value must always be the {@link #cfg!valueField} of one of the
 * records in the store. Configure as `false` to allow the value to be set to
 * arbitrary text, and have this component auto create an associated record with
 * the typed value as the {@link #cfg!valueField}.
 *
 * This config is only supported for use in {@link Ext.field.ComboBox} but is defined
 * here (as private) because of its many entanglements with value processing.
 * @private
 * @since 6.5.0
 */

/**
 * @cfg {String} valueNotFoundText
 * The message to display if the value passed to `setValue` is not found in the store.
 */

/**
 * @cfg {Boolean} selectOnTab
 * Whether the Tab key should select the currently highlighted item.
 */

/**
 * @cfg {Boolean} multiSelect
 * Configure as `true` to allow selection of multiple items from the picker. This
 * results in each selected item being represented by a "chip" in the input area.
 *
 * When `true`, the field's {@link #cfg!value} will be an array containing the
 * {@link #cfg!valueField} values of all selected records or `null` when there is
 * no selection.
 */

/**
 * @cfg {String} delimiter
 * The character(s) used to separate new values to be added when {@link #createNewOnEnter}
 * or {@link #createNewOnBlur} are set.
 *
 * Only meaningful when {@link #cfg!multiSelect} is `true`.
 */

/*
* @cfg {Boolean} filterPickList
* True to hide the currently selected values from the drop down list.
*
* Setting this option to `true` is not recommended for accessible applications.
*
* - `true` to hide currently selected values from the drop down pick list
* - `false` to keep the item in the pick list as a selected item
*/

/**
 * @cfg {Boolean} [collapseOnSelect=false]
 * Has no effect if {@link #cfg!multiSelect} is `false`
 *
 * Configure as true to automatically hide the picker after a selection is made.
 */

/**
 * A configuration object which may be specified to configure the
 * {@link Ext.dataview.ChipView} used to display "tags" representing selected items
 * when {@link #cfg!multiSelect} is `true`.
 * @since 6.7.0
 */

/**
 * @cfg {Function/String} recordCreator
 * @cfg {String} recordCreator.value The typed value to be converted into a new record.
 * @cfg {ObExt.data.Model} recordCreator.model This field's {@link #cfg!store}'s
 * {@link Ext.data.Store#cfg!model Model}.
 * @cfg {Ext.field.Select} recordCreator.field This SelectField.
 *
 * A function, or a method name in this class, or in a ViewController to be used to
 * create a record from a typed value when {@link #cfg!forceSelection} is `false`.
 *
 * This gives app developers a chance to create a full featured record, or to veto the
 * record creation by returning `null`.
 * @since 6.6.0
 */

/**
 * @cfg {Object} recordCreatorScope
 * The scope (`this` reference) in which the configured {@link #cfg!recordCreator}
 * will be executed, unless the recordCreator is a ViewController method name.
 * @since 6.6.0
 */

/**
 * @cfg editable
 * @inheritdoc
 */

/**
 * @cfg floatedPicker
 * @inheritdoc
 */

/**
 * @cfg edgePicker
 * @inheritdoc
 */

/**
 * @property classCls
 * @inheritdoc
 */

/**
 * @cfg twoWayBindable
 * @inheritdoc
 */

/**
 * @cfg publishes
 * @inheritdoc
 */

/**
 * This method is called to create a temporary record when the value entered does not
 * match a record in the `store` (when {@link #cfg!forceSelection} is `false`).
 *
 * The `data` object passed contains the typed value in both the {@link #cfg!valueField}
 * and the {@link #cfg!displayField}.
 *
 * The record created and returned from this method will be the {@link #cfg!selection}
 * value in this non-matching state.
 *
 * @param data The data object used to create the new record.
 * @return {Ext.data.Model} The new record.
 * @template
 * @since 6.5.1
 */

/**
 * Finds the record in the {@link #cfg!store}, or the {@link #cfg!valueCollection}
 * which has the {@link #cfg!valueField} matching the passed value.
 *
 * The {@link #cfg!valueCollection} is included because of the {@link #cfg!createNewOnEnter},
 * {@link #cfg!createNewOnBlur}, and {@link #cfg!forceSelection} configs which allow
 * for insertion into the {@link #cfg!valueCollection} of newly created records which
 * are not in the configured {@link #cfg!store}.
 *
 * Also, a currently selected value may be filtered out of visibility in the
 * configured {@link #cfg!store}.
 *
 * @param {String} value The value to match the {@link #valueField} against.
 * @return {Ext.data.Model} The matched record or null.
 */

/**
 * Finds the record by searching values in the {@link #displayField}.
 * @param {Object} value The value to match the field against.
 * @return {Ext.data.Model/false} The matched record or `false`.
 */


/**
 * Gets data for each record to be used for constructing the display value with
 * the {@link #displayTpl}. This may be overridden to provide access to associated records.
 * @param {Ext.data.Model} record The record.
 * @return {Object} The data to be passed for each record to the {@link #displayTpl}.
 *
 * @protected
 * @template
 */

/**
 * Resets the Select field to the value of the first record in the store.
 * @return {Ext.field.Select} this
 * @chainable
 */
