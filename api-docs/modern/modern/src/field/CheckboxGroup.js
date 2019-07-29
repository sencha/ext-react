/**
 * @class Ext.field.CheckboxGroup
 * @extend Ext.field.FieldGroupContainer
 * @xtype checkboxgroup
 * 
 * This Field is useful for containing multiple {@link Ext.field.Checkbox checkbox}.
 * 
 * It plots items into wither horizontal / vertical depending on 
 * {@link Ext.field.FieldGroupContainer#vertical} config properties.
 *
 * ## Example usage:
 *
 *   @example packages=[ext-react]
 *   import React, { Component } from 'react';
 *   import { ExtReact, FormPanel, CheckBoxGroup, CheckBoxField } from '@sencha/ext-modern';
 *
 *   export default class MyExample extends Component {
 *       render() {
 *           return (
 *              <ExtReact>
 *               <FormPanel
 *                title="Checkbox Group"
 *                width="300"
 *                height="125"
 *                fullscreen={true}
 *               >
 *                   <CheckBoxGroup 
 *                       label="Checkbox Group"
 *                       vertical
 *                       height="100"
 *                   >
 *                   <CheckBoxField
 *                       label="Item 1"
 *                       name="cb-item-1"
 *                       value="1"
 *                   >
 *                   </CheckBoxField>
 *                   <CheckBoxField
 *                       label="Item 2"
 *                       name="cb-item-2"
 *                       value="2"
 *                       checked="true"
 *                   >
 *                   </CheckBoxField>
 *                   <CheckBoxField
 *                       label="Item 3"
 *                       name="cb-item-3"
 *                       value="3"
 *                   >
 *                   </CheckBoxField>
 *                   <CheckBoxField
 *                       label="Item 4"
 *                       name="cb-common"
 *                       value="4"
 *                   >
 *                   </CheckBoxField>
 *                   <CheckBoxField
 *                       label="Item 5"
 *                       name="cb-common"
 *                       value="5"
 *                   >
 *                   </CheckBoxField>
 *                   <CheckBoxField
 *                       label="Item 6"
 *                       name="cb-common"
 *                       value="6"
 *                   >
 *                   </CheckBoxField>
 *               </CheckBoxGroup>
 *           </FormPanel>
 *          </ExtReact>
 *       )
 *   }
 * }
 *
 */

/**
 * @property {Boolean} [isCheckboxGroup=true]
 * The value `true` to identify an object as an instance of this or derived class.
 * @readonly
 */

/**
 * @property {String} [defaultType='checkbox']
 * Default item type in radio group
 * @readonly
 */

/**
 * Sets the value(s) of all checkboxes in the group. The expected format is an Object
 * of name-value pairs corresponding to the names of the checkboxes in the group. Each pair
 * can have either a single or multiple values:
 *
 *   - A single Boolean or String value will be passed to the `setValue` method of the checkbox
 *     with that name.
 *   - An Array of String values will be matched against the
 *     {@link Ext.field.Checkbox#value value} of checkboxes in the group
 *     with that name; those checkboxes whose value exists in the array will be
 *     checked and others will be unchecked.
 *
 * If a checkbox's name is not in the mapping at all, it will be unchecked.
 *
 * An example:
 *
 *     var myCheckboxGroup = new Ext.field.CheckboxGroup({
 *         items: [{
 *             name: 'cb1',
 *             label: 'Single 1'
 *         }, {
 *             name: 'cb2',
 *             label: 'Single 2'
 *         }, {
 *             name: 'cb3',
 *             label: 'Single 3'
 *         }, {
 *             name: 'cbGroup',
 *             label: 'Grouped 1',
 *             value: 'value1'
 *         }, {
 *             name: 'cbGroup',
 *             label: 'Grouped 2',
 *             value: 'value2'
 *         }, {
 *             name: 'cbGroup',
 *             label: 'Grouped 3',
 *             value: 'value3'
 *         }]
 *     });
 *
 *     myCheckboxGroup.setValue({
 *         cb1: true,
 *         cb3: false,
 *         cbGroup: ['value1', 'value3']
 *     });
 *
 * The above code will cause the checkbox named 'cb1' to be checked, as well as the first
 * and third checkboxes named 'cbGroup'. The other three checkboxes will be unchecked.
 *
 * @param {Object} value The mapping of checkbox names to values.
 * @return {Ext.field.CheckboxGroup} this
 */

/**
 * Returns an object containing the values of all checked checkboxes within the group.
 * Each key-value pair in the object corresponds to a checkbox
 * {@link Ext.field.Checkbox#name name}. If there is only one checked checkbox
 * with a particular name, the value of that pair will be the String
 * {@link Ext.field.Checkbox#value value} of that checkbox. If there are
 * multiple checked checkboxes with that name, the value of that pair will be an Array
 * of the selected inputValues.
 *
 * The object format returned from this method can also be passed directly to the
 * {@link #setValue} method.
 */
