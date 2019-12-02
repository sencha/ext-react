/**
 * @class Ext.field.Select
 * @extend Ext.field.Picker
 * @xtype selectfield
 *
 * Simple Select field wrapper. Example usage:
 *
 *     @example packages=[ext-react]
 *     import React, { Component } from 'react';
 *     import { ExtReact, FormPanel, SelectField, Container } from '@sencha/ext-react-modern';
 *
 *     Ext.require('Ext.Toast');
 *
 *     export default class MyExample extends Component {
 *         render() {
 *             return (
 *                 <ExtReact>
 *                     <Container layout="center">
 *                         <FormPanel shadow>
 *                             <SelectField
 *                                 label="Select"
 *                                 width="200"
 *                                 onChange={(field, newValue) => Ext.toast(`You selected ${newValue.get('value')}`)}
 *                                 options={[
 *                                     { text: 'Option 1', value: 1 },
 *                                     { text: 'Option 2', value: 2 },
 *                                     { text: 'Option 3', value: 3 }
 *                                 ]}
 *                             />
 *                         </FormPanel>
 *                     </Container>
 *                 </ExtReact>
 *             )
 *         }
 *     }
 */

/**
 * @event change
 * Fires when an option selection has changed
 * @param {Ext.field.Select} this
 * @param {Ext.data.Model} newValue The corresponding record for the new value
 * @param {Ext.data.Model} oldValue The corresponding record for the old value
 */

/**
 * @event focus
 * Fires when this field receives input focus. This happens both when you tap on the field and when you focus on the field by using
 * 'next' or 'tab' on a keyboard.
 *
 * Please note that this event is not very reliable on Android. For example, if your Select field is second in your form panel,
 * you cannot use the Next button to get to this select field. This functionality works as expected on iOS.
 * @param {Ext.field.Select} this This field
 * @param {Ext.event.Event} e
 */

/**
 * @cfg {Boolean} useClearIcon
 * @accessor
 */

/**
 * @cfg {String/Number} [valueField=value]
 * The underlying {@link Ext.data.Field#name data value name} to bind to this
 * Select control. If configured as `null`, the {@link #cfg!displayField} is used.
 * @accessor
 */

/**
 * @cfg {Function/String/String[]} [itemTpl=false]
 * An XTemplate definition string (Or an {@link Ext.XTemplate}) which specifies how to display a list
 * item from a record values object. This is automatically generated to display the {@link #cfg!displayField}
 * if not specified.
 * @accessor
 */

/**
 * @cfg {Function/String/String[]} [displayTpl=null]
 * The template to be used to display the selected record inside the text field.
 *
 * If not specified, the {@link #cfg!displayField} is shown in the text field.
 * @accessor
 */

/**
 * @cfg {String/Number} [displayField=text] The underlying {@link Ext.data.Field#name data value name} to bind to this
 * Select control.  If configured as `null`, the {@link #cfg!valueField} is used.
 *
 * This resolved value is the visibly rendered value of the available selection options.
 * @accessor
 */

/**
 * @cfg {Ext.data.Store/Object/String} [store=null]
 * The store to provide selection options data.
 * Either a Store instance, configuration object or store ID.
 * @accessor
 */

/**
 * @cfg {Array} [options=null] An array of select options.
 *
 *     [
 *         {text: 'First Option',  value: 'first'},
 *         {text: 'Second Option', value: 'second'},
 *         {text: 'Third Option',  value: 'third'}
 *     ]
 *
 * __Note:__ Option object member names should correspond with defined {@link #valueField valueField} and {@link #displayField displayField} values.
 * This config will be ignored if a {@link #store store} instance is provided.
 * @accessor
 */

/**
 * @cfg {String} [hiddenName=null] Specify a `hiddenName` if you're using the {@link Ext.form.Panel#standardSubmit standardSubmit} option.
 * This name will be used to post the underlying value of the select to the server.
 * @accessor
 */

/**
 * @cfg {Boolean} [autoSelect=true]
 * `true` to auto select the first value in the {@link #store} or {@link #options} when they are changed. Only happens when
 * the {@link #value} is set to `null`.
 * @accessor
 */

/**
 * @cfg {Ext.data.Model} [selection=null]
 * The selected model. `null` if no value exists.
 * @accessor
 */

/**
 * @cfg {Boolean} [autoLoadOnValue=false]
 * This option controls whether to *initially* load the store when a value is set so that
 * the display value can be determined from the appropriate record.
 * The store will only be loaded in a limited set of circumstances:
 * - The store is not currently loading.
 * - The store does not have a pending {@link Ext.data.Store#autoLoad}.
 * - The store has not been loaded before.
 * @accessor
 */

/**
 * @cfg {Boolean} [forceSelection=true]
 * By default the value must always be the {@link #cfg!valueField} of one of the records in the store.
 * Configure as `false` to allow the value to be set to arbitrary text, and have this component
 * auto create an associated record with the typed value as the {@link #cfg!valueField}.
 * @accessor
 */

/**
 * @cfg {String} [valueNotFoundText=null]
 * If the value passed to setValue is not found in the store, valueNotFoundText will
 * be displayed as the field text if defined. If this default text is used, it means there
 * is no value set and no validation will occur on this field.
 * @accessor
 */

/**
 * @method getValue
 * Gets the currently selected value
 * @returns {String} Value Field from Selected Model
 */