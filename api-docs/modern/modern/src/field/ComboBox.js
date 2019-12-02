/**
 * @class Ext.field.ComboBox
 * @extend Ext.field.Select
 * @xtype combobox
 * @xtype comboboxfield
 *
 * A combobox control with support for autocomplete, remote loading, and many other features.
 *
 * A ComboBox is like a combination of a traditional HTML text `<input>` field and a `<select>`
 * field; if the {@link #cfg!editable} prop is `true`, then the user is able to type freely
 * into the field, and/or pick values from a dropdown selection list.
 *
 * The user can input any value by default, even if it does not appear in the selection list;
 * to prevent free-form values and restrict them to items in the list, set {@link #forceSelection} to `true`.
 *
 * The selection list's options are populated from any {@link Ext.data.Store}, including remote
 * stores. The data items in the store are mapped to each option's displayed text and backing value via
 * the {@link #valueField} and {@link #displayField} props which are applied to the list
 * via the {@link #cfg!itemTpl}.
 *
 * If your store is not remote, i.e. it depends only on local data and is loaded up front, you MUST
 * set the {@link #queryMode} to `'local'`.
 *
 * ## Example usage:
 *
 *     @example packages=[ext-react]
 *     import React, { Component } from 'react';
 *     import { ExtReact, FormPanel, ComboBox } from '@sencha/ext-react-modern';
 *
 *     export default class MyExample extends Component {
 *
 *     render() {
 *          const data = [
 *               {"name":"Alabama","abbrev":"AL"},
 *               {"name":"Alaska","abbrev":"AK"},
 *               {"name":"Arizona","abbrev":"AZ"}
 *          ]
 *
 *          return (
 *             <ExtReact>
 *              <FormPanel shadow>
 *                  <ComboBox
 *                      width={200}
 *                      label="State"
 *                      options={data}
 *                      displayField="name"
 *                      valueField="code"
 *                      queryMode="local"
 *                      labelAlign="placeholder"
 *                      typeAhead
 *                  />
 *              </FormPanel>
 *              </ExtReact>
 *          )
 *       }
 *     }
 */

/**
 * @cfg {String} [queryParam='query']
 * Name of the parameter used by the Store to pass the typed string when the ComboBox is configured with
 * `{@link #queryMode}: 'remote'`. If explicitly set to a falsy value it will not be sent.
 * @accessor
 */

/**
 * @cfg {Boolean} [hideTrigger=false]
 * `true` to hide the expand trigger.
 * @accessor
 */

/**
 * @cfg {String} [queryMode='remote']
 * The mode in which the ComboBox uses the configured Store. Acceptable values are:
 *
 *   - **`'remote'`** :
 *
 *     In `queryMode: 'remote'`, the ComboBox loads its Store dynamically based upon user interaction.
 *
 *     This is typically used for "autocomplete" type inputs, and after the user finishes typing, the Store is {@link
 *     Ext.data.Store#method!load load}ed.
 *
 *     A parameter containing the typed string is sent in the load request. The default parameter name for the input
 *     string is `query`, but this can be configured using the {@link #cfg!queryParam} prop.
 *
 *     In `queryMode: 'remote'`, the Store may be configured with `{@link Ext.data.Store#cfg!remoteFilter remoteFilter}:
 *     true`, and further filters may be _programatically_ added to the Store which are then passed with every load
 *     request which allows the server to further refine the returned dataset.
 *
 *     Typically, in an autocomplete situation, {@link #cfg!hideTrigger} is configured `true` because it has no meaning for
 *     autocomplete.
 *
 *   - **`'local'`** :
 *
 *     ComboBox loads local data
 *
 *     @example packages=[ext-react]
 *     import React, { Component } from "react";
 *     import { FormPanel, ComboBox } from '@sencha/ext-react-modern';
 *
 *     export default class ComboBoxExample extends Component {
 *         render() {
 *             return (
 *                 <FormPanel shadow>
 *                     <ComboBox
 *                         queryMode="local"
 *                         store={new Ext.data.ArrayStore({
 *                             id: 0,
 *                             fields: [
 *                                 "myId",  // numeric value is the key
 *                                 "displayText"
 *                             ],
 *                             data: [[1, "item1"], [2, "item2"]]  // data is local
 *                         })}
 *                         valueField="myId"
 *                         displayField="displayText"
 *                         triggerAction="all"
 *                     />
 *                 </FormPanel>
 *             )
 *         }
 *     }
 *
 * @accessor
 */

/**
 * @cfg {Boolean} [queryCaching=true]
 * When true, this prevents the combo from re-querying (either locally or remotely) when the current query
 * is the same as the previous query.
 * @accessor
 */

/**
 * @cfg {Number} [queryDelay=true]
 * The length of time in milliseconds to delay between the start of typing and sending the query to filter the
 * dropdown list.
 *
 * Defaults to `500` if `{@link #queryMode} = 'remote'` or `10` if `{@link #queryMode} = 'local'`.
 * @accessor
 */

/**
 * @cfg {Number} [minChars=false]
 * The minimum number of characters the user must type before autocomplete and {@link #typeAhead} activate.
 *
 * Defaults to `4` if `{@link #queryMode} = 'remote'` or `0` if `{@link #queryMode} = 'local'`,
 * does not apply if `{@link Ext.form.field.Trigger#editable editable} = false`.
 * @accessor
 */

/**
 * @cfg {Boolean} [anyMatch=false]
 * * Only valid when {@link #cfg!queryMode} is `'local'`.*
 * Configure as `true` to cause the {@link #cfg!primaryFilter} to match the typed
 * characters at any position in the {@link #displayField}'s value when filtering *locally*.
 * @accessor
 */

/**
 * @cfg {Boolean} [caseSensitive=false]
 * * Only valid when {@link #cfg!queryMode} is `'local'`.*
 * Configure as `true` to cause the {@link #cfg!primaryFilter} to match with exact case matching.
 * @accessor
 */

/**
 * @cfg {Boolean} [autoFocus=true]
 * `true` to automatically focus the first result gathered by the data store in the dropdown list when it is
 * opened. A false value would cause nothing in the list to be highlighted automatically, so
 * the user would have to manually highlight an item before pressing the enter or {@link #selectOnTab tab} key to
 * select it (unless the value of ({@link #typeAhead}) were true), or use the mouse to select a value.
 * @accessor
 */

/**
 * @cfg {Boolean} [autoFocusLast=true] When `true`, the last selected record in the dropdown
 * list will be re-selected upon {@link #autoFocus}. Set to `false` to always select the first
 * record in the drop-down list.
 * For accessible applications it is recommended to set this option to `false`.
 * @accessor
 */

/**
 * @cfg {Boolean} [typeAhead=false]
 * `true` to populate and auto-select the remainder of the text being typed after a configurable delay
 * ({@link #typeAheadDelay}) if it matches a known value.
 * @accessor
 */

/**
 * @cfg {Number} [typeAheadDelay=250]
 * The length of time in milliseconds to wait until the type-ahead text is displayed
 * if `{@link #typeAhead} = true`
 * @accessor
 */

/**
 * @cfg {Boolean} [multiSelect=null]
 * @hide
 * Configure as `true` to allow selection of multiple items from the picker. This results in each
 * selected item being represented by a "tag" in the combobox's input area.
 * @accessor
 */

/**
 * @cfg {String} [triggerAction='all']
 * The action to execute when the trigger is clicked.
 *
 *   - **`'all'`** :
 *
 *     {@link #doFilter run the query} specified by the `{@link #cfg!allQuery}` prop option
 *
 *   - **`'last'`** :
 *
 *     {@link #doFilter run the query} using the `{@link #lastQuery last query value}`.
 *
 *   - **`'query'`** :
 *
 *     {@link #doFilter run the query} using the {@link Ext.form.field.Base#getRawValue raw value}.
 *
 * See also `{@link #queryParam}`.
 * @accessor
 */

/**
 * @cfg {String} [allQuery=null]
 * The text query to use to filter the store when the trigger element is tapped (or expansion is requested
 * by a keyboard gesture). By default, this is `null` causing no filtering to occur.
 *
 * @accessor
 */

/**
 * @cfg {Boolean} [collapseOnSelect=null]
 * Has no effect if {@link #cfg!multiSelect} is `false`
 *
 * Configure as true to automatically hide the picker after a selection is made.
 * @accessor
 */

/**
 * @cfg {Boolean} [clearFilterOnBlur=true]
 * *When {@link #queryMode} is `'local'` only*
 *
 * As text is entered, the underlying store is filtered to match the value. When this option is `true`,
 * any filtering applied by this field will be cleared when focus is removed & reinstated on focus.
 * If `false`, the filters will be left in place.
 * @accessor
 */

/**
 * @cfg {Boolean} [enableRegEx=null]
 * *When {@link #queryMode} is `'local'` only*
 *
 * Set to `true` to have the ComboBox use the typed value as a RegExp source to filter the store to get possible matches.
 * Invalid regex values will be ignored.
 * @accessor
 */

/**
 * @cfg {Boolean} [selectOnTab=true]
 * Whether the Tab key should select the currently highlighted item.
 * @accessor
 */

/**
 * @cfg {Boolean} [autoSelect=false]
 * `true` to auto select the first value in the {@link #store} or {@link #options} when they are changed. Only happens when
 * the {@link #value} is set to `null`.
 */

/**
 * @cfg [editable=true]
 * @inheritdoc Ext.field.Text#cfg-editable
 */

/**
 * @cfg {Boolean} [forceSelection=false]
 * `true` to restrict the selected value to one of the values in the list, `false` to allow the user to set
 * arbitrary text into the field.
 */

/**
 * @event beforepickercreate
 * Fires before the pop-up picker is created to give a developer a chance to configure it.
 * @param {Ext.field.ComboBox} this
 * @param {Object} newValue The config object for the picker.
 */

/**
 * @event pickercreate
 * Fires after the pop-up picker is created to give a developer a chance to configure it.
 * @param {Ext.field.ComboBox} this
 * @param {Ext.dataview.List/Ext.Component} picker The instantiated picker.
 */

/**
 * @event beforequery
 * Fires before all queries are processed. Return false to cancel the query or set the queryPlan's cancel
 * property to true.
 *
 * @param {Object} queryPlan An object containing details about the query to be executed.
 * @param {Ext.form.field.ComboBox} queryPlan.combo A reference to this ComboBox.
 * @param {String} queryPlan.query The query value to be used to match against the ComboBox's {@link #valueField}.
 * @param {Boolean} queryPlan.force If `true`, causes the query to be executed even if the minChars threshold is not met.
 * @param {Boolean} queryPlan.cancel A boolean value which, if set to `true` upon return, causes the query not to be executed.
 * @param {Object} [queryPlan.lastQuery] The queryPlan object used in the previous query.
 */

/**
 * @method getValue
 * Gets the currently selected value, or array of values if {@link #cfg!multiSelect} is `true`.
 * @returns {String/String[]} Value(s) of the value field from configured Model.
 */

/**
 * @method findRecordByValue
 * Finds the record in the {@link #cfg!store}, or the {@link #cfg!valueCollection} which has the {@link #cfg!valueField}
 * matching the passed value.
 *
 * The {@link #cfg!valueCollection} is included because of the {@link #cfg!createNewOnEnter}, {@link #cfg!createNewOnBlur},
 * {@link #cfg!valueNotFoundText} and {@link #cfg!forceSelection} props which allow for insertion into the
 * {@link #cfg!valueCollection} of newly created records which are not in the configured {@link #cfg!store}.
 *
 * Also, a currently selected value may be filtered out of visibility in the configured {@link #cfg!store}
 *
 * @param {String} value The value to match the {@link #valueField} against.
 * @return {Ext.data.Model} The matched record or null.
 */
