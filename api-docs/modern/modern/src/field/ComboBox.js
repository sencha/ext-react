/**
 * A combobox control with support for autocomplete, remote loading, and many other features.
 *
 * A ComboBox is like a combination of a traditional HTML text `<input>` field and a `<select>`
 * field; if the {@link #cfg!editable} config is `true`, then the user is able to type freely
 * into the field, and/or pick values from a dropdown selection list.
 *
 * The user can input any value by default, even if it does not appear in the selection list;
 * to prevent free-form values and restrict them to items in the list, set
 * {@link #forceSelection} to `true`.
 *
 * The selection list's options are populated from any {@link Ext.data.Store}, including remote
 * stores. The data items in the store are mapped to each option's displayed text and backing
 * value via the {@link #valueField} and {@link #displayField} configurations which are applied
 * to the list via the {@link #cfg!itemTpl}.
 *
 * If your store is not remote, i.e. it depends only on local data and is loaded up front, you MUST
 * set the {@link #queryMode} to `'local'`.
 *
 * # Example usage:
 *
 *      @example
 *      Ext.create({
 *          fullscreen: true,
 *          xtype: 'container',
 *          padding: 50,
 *          layout: 'vbox',
 *          items: [{
 *              xtype: 'combobox',
 *              label: 'Choose State',
 *              queryMode: 'local',
 *              displayField: 'name',
 *              valueField: 'abbr',
 *
 *              store: [
 *                  { abbr: 'AL', name: 'Alabama' },
 *                  { abbr: 'AK', name: 'Alaska' },
 *                  { abbr: 'AZ', name: 'Arizona' }
 *              ]
 *          }]
 *      });
 *
 * # Events
 *
 * ComboBox fires a select event if an item is chosen from the associated list.  If
 * the ComboBox is configured with {@link #forceSelection}: true, an action event is fired
 * when the user has typed the ENTER key while editing the field, and a change event on
 * each keystroke.
 *
 * ## Customized combobox
 *
 * Both the text shown in dropdown list and text field can be easily customized:
 *
 *      @example
 *      Ext.create({
 *          fullscreen: true,
 *          xtype: 'container',
 *          padding: 50,
 *          layout: 'vbox',
 *          items: [{
 *              xtype: 'combobox',
 *              label: 'Choose State',
 *              queryMode: 'local',
 *              displayField: 'name',
 *              valueField: 'abbr',
 *
 *              // For the dropdown list
 *              itemTpl: '<span role="option" class="x-boundlist-item">{abbr} - {name}</span>',
 *
 *              // For the content of the text field
 *              displayTpl: '{abbr} - {name}',
 *
 *              editable: false,  // disable typing in the text field
 *
 *              store: [
 *                  { abbr: 'AL', name: 'Alabama' },
 *                  { abbr: 'AK', name: 'Alaska' },
 *                  { abbr: 'AZ', name: 'Arizona' }
 *              ]
 *          }]
 *      });
 *
 * See also the {@link #cfg!floatedPicker} and {@link #cfg!edgePicker} options for additional
 * configuration of the options list.
 *
 * @since 6.5.0
 */

 /**
 * @cfg {Function/String/Object/Ext.util.Filter} primaryFilter
 * A filter config object, or a Filter instance used to filter the store on input
 * field mutation by typing or pasting.
 *
 * This may be a filter config object which specifies a filter which uses the
 * {@link #cfg!store}'s fields.
 *
 * {@link Ext.util.Filter Filters} may also be instantiated using a custom `filterFn`
 * to allow a developer to specify complex matching. For example, a combobox developer
 * might allow a user to filter using either the {@link #cfg!valueField} or
 * {@link #cfg!displayField} by using:
 *
 *     primaryFilter: function(candidateRecord) {
 *         // This called in the scope of the Filter instance, we have this config
 *         var value = this.getValue();
 *
 *         return Ext.String.startsWith(candidateRecord.get('stateName', value, true) ||
 *                Ext.String.startsWith(candidateRecord.get('abbreviation', value, true);
 *     }
 *
 * This may also be configured as the name of a method on a ViewController which is to
 * be used as the filtering function. Note that this will *still* be called in the
 * scope of the created Filter object because that has access to the `value`
 * which is being tested for.
 */

 /**
 * @cfg {String} queryParam
 * Name of the parameter used by the Store to pass the typed string when the ComboBox
 * is configured with
 * `{@link #queryMode}: 'remote'`. If explicitly set to a falsy value it will not be
 * sent.
 */

/**
 * @cfg {String} queryMode
 * The mode in which the ComboBox uses the configured Store. Acceptable values are:
 *
 *  - **`'local'`** : In this mode, the ComboBox assumes the store is fully loaded and
 *   will query it directly.
 *
 *  - **`'remote'`** : In this mode the ComboBox loads its Store dynamically based upon
 *   user interaction.
 *
 *   This is typically used for "autocomplete" type inputs, and after the user finishes
 *   typing, the Store is {@link Ext.data.Store#method!load load}ed.
 *
 *   A parameter containing the typed string is sent in the load request. The default
 *   parameter name for the input string is `query`, but this can be configured using
 *   the {@link #cfg!queryParam} config.
 *
 *   In `queryMode: 'remote'`, the Store may be configured with
 *   `{@link Ext.data.Store#cfg!remoteFilter remoteFilter}: true`, and further filters
 *   may be _programmatically_ added to the Store which are then passed with every
 *   load request which allows the server to further refine the returned dataset.
 *
 *   Typically, in an autocomplete situation, {@link #cfg!hideTrigger} is configured
 *   `true` because it has no meaning for autocomplete.
 */

/**
 * @cfg {Boolean} queryCaching
 * When true, this prevents the combo from re-querying (either locally or remotely)
 * when the current query is the same as the previous query.
 */

/**
 * @cfg {Number} queryDelay
 * The length of time in milliseconds to delay between the start of typing and sending
 * the query to filter the dropdown list.
 *
 * Defaults to `500` if `{@link #queryMode} = 'remote'` or `10` if
 * `{@link #queryMode} = 'local'`
 */

/**
 * @cfg {Number} minChars
 * The minimum number of characters the user must type before autocomplete and
 * {@link #typeAhead} activate.
 *
 * Defaults to `4` if {@link #queryMode} is `'remote'` or `0` if {@link #queryMode}
 * is `'local'`, does not apply if {@link Ext.form.field.Trigger#editable editable}
 * is `false`.
 */

/**
 * @cfg {Boolean} anyMatch
 * * Only valid when {@link #cfg!queryMode} is `'local'`.*
 * Configure as `true` to cause the {@link #cfg!primaryFilter} to match the typed
 * characters at any position in the {@link #displayField}'s value when filtering
 * *locally*.
 */

/**
 * @cfg {Boolean} caseSensitive
 * * Only valid when {@link #cfg!queryMode} is `'local'`.*
 * Configure as `true` to cause the {@link #cfg!primaryFilter} to match with
 * exact case matching.
 */

/**
 * @cfg {Boolean} typeAhead
 * `true` to populate and autoselect the remainder of the text being typed after
 * a configurable delay ({@link #typeAheadDelay}) if it matches a known value.
 */

/**
 * @cfg {Number} typeAheadDelay
 * The length of time in milliseconds to wait until the typeahead text is displayed
 * if {@link #typeAhead} is `true`.
 */

/**
 * @cfg {String} triggerAction
 * The action to execute when the trigger is clicked.
 *
 *  - **`'all'`** :
 *
 *   {@link #doFilter run the query} specified by the `{@link #cfg!allQuery}` config option
 *
 *  - **`'last'`** :
 *
 *   {@link #doFilter run the query} using the `{@link #lastQuery last query value}`.
 *
 *  - **`'query'`** :
 *
 *   {@link #doFilter run the query} using the {@link Ext.form.field.Base#getRawValue
 *   raw value}.
 *
 * See also `{@link #queryParam}`.
 */

/**
 * @cfg {String} allQuery
 * The text query to use to filter the store when the trigger element is tapped
 * (or expansion is requested by a keyboard gesture). By default, this is `null`
 * causing no filtering to occur.
 */

/**
 * @cfg {Boolean} enableRegEx
 * *When {@link #queryMode} is `'local'` only*
 *
 * Set to `true` to have the ComboBox use the typed value as a RegExp source to
 * filter the store to get possible matches.
 * Invalid regex values will be ignored.
 */

/**
 * @cfg {Boolean} autoSelect
 * `true` to auto select the first value in the {@link #store} or {@link #options} when
 * they are changed. Only happens when the {@link #value} is set to `null`.
 */

 /**
 * @cfg editable
 * @inheritdoc Ext.field.Text#cfg-editable
 */

/**
 * @cfg {Boolean} forceSelection
 * Set to `true` to restrict the selected value to one of the values in the list, or
 * `false` to allow the user to set arbitrary text into the field.
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
 * Fires before all queries are processed. Return false to cancel the query or set the
 * queryPlan's cancel property to true.
 *
 * @param {Object} queryPlan An object containing details about the query to be executed.
 * @param {Ext.form.field.ComboBox} queryPlan.combo A reference to this ComboBox.
 * @param {String} queryPlan.query The query value to be used to match against the ComboBox's
 * {@link #valueField}.
 * @param {Boolean} queryPlan.force If `true`, causes the query to be executed even if the
 * minChars threshold is not met.
 * @param {Boolean} queryPlan.cancel A boolean value which, if set to `true` upon return,
 * causes the query not to be executed.
 * @param {Object} [queryPlan.lastQuery] The queryPlan object used in the previous query.
 */

/**
 * @event select
 * Fires when the user has selected an item from the associated picker.
 * @param {Ext.field.ComboBox} this This field
 * @param {Ext.data.Model} newValue The corresponding record for the new value
 */

/**
 * @event change
 * Fires when the field is changed, or if forceSelection is false, on keystroke.
 * @param {Ext.field.ComboBox} this This field
 * @param {Ext.data.Model} newValue The new value
 * @param {Ext.data.Model} oldValue The original value
 */

/**
 * Executes a query to filter the dropdown list. Fires the {@link #beforequery} event
 * prior to performing the query allowing the query action to be canceled if needed.
 *
 * @param {Object} query An object containing details about the query to be executed.
 * @param {String} [query.query] The query value to be used to match against the
 * ComboBox's {@link #textField}. If not present, the primary {@link #cfg!textfield}
 * filter is disabled.
 * @param {Boolean} query.force If `true`, causes the query to be executed even if
 * the {@link #cfg!minChars} threshold is not met.
 * @returns {Boolean} `true` if the query resulted in picker expansion.
 */

/**
 * @template
 * A method which may modify aspects of how the store is to be filtered (if
 * {@link #queryMode} is `"local"`) of loaded (if {@link #queryMode} is `"remote"`).
 *
 * This is called by the {@link #doFilter method, and may be overridden in subclasses to modify
 * the default behaviour.
 *
 * This method is passed an object containing information about the upcoming query operation
 * which it may modify before returning.
 *
 * @param {Object} queryPlan An object containing details about the query to be executed.
 * @param {String} [queryPlan.query] The query value to be used to match against the
 * ComboBox's {@link #textField}.
 * If not present, the primary {@link #cfg!textfield} filter is disabled.
 * @param {String} queryPlan.lastQuery The query value used the last time a store query
 * was made.
 * @param {Boolean} queryPlan.force If `true`, causes the query to be executed even if
 * the minChars threshold is not met.
 * @param {Boolean} queryPlan.cancel A boolean value which, if set to `true` upon
 * return, causes the query not to be executed.
 */

/**
 * @template
 * A method that may be overridden in a subclass which serializes the primary filter
 * (the filter that passes the typed value for transmission to the server in the
 * {@link #cfg!queryParam}).
 *
 * The provided implementation simply passes the filter's textual value as the
 * {@link #cfg!queryParam} value.
 *
 * @param {Ext.util.Filter} filter The {@link #cfg!primaryFilter} of this ComboBox which
 * encapsulates the typed value and the matching rules.
 * @return {String/Object} A value which, when encoded as an HTML parameter, your server
 * will understand.
 */
