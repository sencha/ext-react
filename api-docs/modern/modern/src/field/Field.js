/**
 * @class Ext.field.Field
 * @extend Ext.Decorator
 * @xtype field
 *
 * Field is the base class for all form fields. It provides a lot of shared functionality to all
 * field subclasses (for example labels, simple validation, {@link #clearIcon clearing} and tab index management), but
 * is rarely used directly. Instead, it is much more common to use one of the field subclasses:
 *
 *     xtype            Class
 *     ---------------------------------------
 *     textfield        {@link Ext.field.Text}
 *     numberfield      {@link Ext.field.Number}
 *     textareafield    {@link Ext.field.TextArea}
 *     hiddenfield      {@link Ext.field.Hidden}
 *     radiofield       {@link Ext.field.Radio}
 *     filefield        {@link Ext.field.File}
 *     checkboxfield    {@link Ext.field.Checkbox}
 *     selectfield      {@link Ext.field.Select}
 *     togglefield      {@link Ext.field.Toggle}
 *     fieldset         {@link Ext.form.FieldSet}
 *
 * Fields are normally used within the context of a form and/or fieldset. See the {@link Ext.form.Panel FormPanel}
 * and {@link Ext.form.FieldSet FieldSet} docs for examples on how to put those together, or the list of links above
 * for usage of individual field types. If you wish to create your own Field subclasses you can extend this class,
 * though it is sometimes more useful to extend {@link Ext.field.Text} as this provides additional text entry
 * functionality.
 */

/**
 * @property {Boolean} [isField=true]
 * Set to `true` on all Ext.field.Field subclasses. This is used by
 * {@link Ext.form.Panel#getValues} to determine which components inside a form are fields.
 */

/**
 * @event click
 * Fires whenever the input is clicked.
 * @param {Ext.event.Event} e The event object.
 */

/**
 * @event keyup
 * Fires whenever keyup is detected.
 * @param {Ext.event.Event} e The event object.
 */

/**
 * @event paste
 * Fires whenever paste is detected.
 * @param {Ext.event.Event} e The event object.
 */

/**
 * @event mousedown
 * Fires whenever the input has a mousedown occur.
 * @param {Ext.event.Event} e The event object.
 */

/**
 * @cfg {Boolean} [allowBlank=null]
 * Specify `false` to not accept blank values
 * @accessor
 */

/**
 * @cfg {String} [inputType=null]
 *
 * The type attribute for input fields -- e.g. text, password, date, url, email, etc.
 * @accessor
 */

/**
 * @cfg {String} [name=null]
 *
 * The field's HTML name attribute.
 *
 * __Note:__ this property must be set if this field is to be automatically included with.
 * {@link Ext.form.Panel#method-submit form submit()}.
 * @accessor
 */

/**
 * @cfg {String} [label=null]
 * The label of this field
 * @accessor
 */

/**
 * @cfg {'top'/'left'/'bottom'/'right'} [labelAlign='left']
 *
 * The position to render the label relative to the field input.
 * @accessor
 */

/**
 * @cfg {'top'/'right'/'bottom'/'left'} [labelTextAlign='left']
 *
 * Text alignment of this field's label
 * @accessor
 */

/**
 * @cfg {'start'/'center'/'end'/'stretch'} [bodyAlign='start']
 *
 * The horizontal alignment of this field's {@link #component} within the body
 * of the field
 * @accessor
 */

/**
 * @cfg {Number/String} [labelWidth='30%'] The width to make this field's label.
 * @accessor
 */

/**
 * @cfg {Boolean} [labelWrap=false]
 *
 * `true` to allow the label to wrap. If set to `false`, the label will be truncated with
 * an ellipsis.
 * @accessor
 */

/**
 * @cfg {Boolean} [required=false]
 *
 * `true` to make this field required.
 *
 * __Note:__ this only causes a visual indication.
 *
 * Doesn't prevent user from submitting the form.
 * @accessor
 */

/**
 * @cfg {Mixed} [value=null]
 * A value to initialize this field with.
 * @accessor
 */

/**
 * @cfg {Boolean} [readOnly=null]
 * `true` to set the field DOM element `readonly` attribute to `"true"`.
 * Defaults to `undefined`, leaving the attribute unset.
 *
 * Mutation of {@link Ext.field.Text text fields} through triggers is also disabled.
 *
 * To simply prevent typing into the field while still allowing mutation through
 * triggers, set {@link Ext.field.Text#cfg!editable} to `false`.
 * @accessor
 */

/**
 * @cfg {String} [validationMessage='Is in the wrong format']
 * For HTML5 validation, regex, etc., this is the error message returned if field is invalid.
 * @accessor
 */

/**
 * @cfg {Boolean} [validateDisabled=false]
 *
 * `true` to validate the field, even if it is disabled.
 * @accessor
 */

/**
 * @cfg {Boolean} [disabled=false]
 *
 * `true` to disable the field.
 *
 * Be aware that conformant with the [HTML specification](http://www.w3.org/TR/html401/interact/forms.html),
 * disabled Fields will not be {@link Ext.form.Panel#method-submit submitted}.
 * @accessor
 */

/**
 * @cfg {Number} [tabIndex=null]
 * The `tabIndex` for this field. Note this only applies to fields that are rendered,
 * not those which are built via `applyTo`.
 * @accessor
 */

/**
 * @cfg {Boolean} fullscreen
 * @hide
 */

/**
 * @cfg {String} msgTarget [msgTarget="qtip"]
 *
 * The location where the error message text should display.  Must be one of the
 * following values:
 *
 * * qtip Display a quick tip containing the message when the user hovers (or taps) the field.  This is the default.
 *   Ext.tip.Manager#init must have been called for this setting to work.
 * * title Display the message in a default browser title attribute popup
 * * under Add a block div beneath the field containing the error message.
 * * side Add an error icon to the right of the field, displaying the message in a popup on hover or tap
 * * none Don't display any error message.  This might be useful if you are implementing custom error display.
 * [element id] Add the error message to the innerHTML of the specified element
 */

/**
 * @cfg {Boolean} [autoFitErrors=null]
 * Whether to adjust the component's body width to make room for {@link #msgTarget error messages}.
 */

/**
 * @cfg {Boolean} [autoComplete=true]
 * If configured as `false`, disabled autocomplete on this input field. It is enabled by default
 * on text input fields, but disabled on picker fields.
 */

/**
 * @cfg {String/String[]/Ext.XTemplate} [activeErrorsTpl=undefined]
 * The template used to format the Array of error messages passed to {@link #setActiveErrors} into a single HTML
 * string. if the {@link #msgTarget} is title, it defaults to a list separated by new lines. Otherwise, it
 * renders each message as an item in an unordered list.
 */

/**
 * @cfg {String} [blankText='This field is required']
 * The error text to display if the **{@link #allowBlank}** validation fails.
 * @locale
 */

/**
 * @cfg {String} [labelCls=null]
 * Optional CSS class to add to the Label element.
 * @accessor
 */

/**
 * @cfg {String} [inputCls=null]
 * CSS class to add to the input element of this field
 */

/**
 * @cfg {Ext.data.field.Field/Object/String} dataType
 * A config for a {@link Ext.data.field.Field} or data field sub-class instance
 * used to serialize this field's value for form submission. This is used by the
 * {@link #serialize} method unless `modelValidation` is used, in which case, the
 * data field of the bound {@link Ext.data.Model model} is used.
 *
 * For example:
 *
 *      <DateField
 *           dataType={
 *              {
 *                  "type": "date",
 *                  "dateWriteFormat": "Y-m-d"
 *              }    
 *           }
 *       >
 *       </DateField>
 *
 * If this config is a string, it is used to create a {@link Ext.data.field.Field field}
 * by that alias.
 * @since 7.0
 */

/**
 * @cfg {Mixed} [startValue=false]
 * The value that the Field had at the time it was last focused. This is the value that is passed
 * to the {@link Ext.field.Text#change} event which is fired if the value has been changed when the Field is blurred.
 *
 * __This will be `undefined` until the Field has been visited.__ Compare {@link #originalValue}.
 * @accessor
 */

/**
 * @property {Ext.dom.Element} labelElement
 * The label Element associated with this Field.
 */

/**
 * @property {"none"/"auto"/"all"} [validateOnInit='auto']
 * Determines how initial values will handle validation
 * - none: Will not validate any initial values
 * - auto: Will only validate non-empty initial values
 * - all: Will validate all initial values
 */

/**
 * @method getValue
 * Returns the field data value.
 * @return {Mixed} value The field value.
 */

/**
 * @method reset
 * Resets the current field value back to the original value on this field when it was created.
 *
 *     // Update the value
 *     field.setValue('new value');
 *
 *     // Now you can reset it back to the `first value`
 *     field.reset();
 *
 * @return {Ext.field.Field} this
 */

/**
 * @method resetOriginalValue
 * Resets the field's {@link #originalValue} property so it matches the current
 * {@link #getValue value}. This is called by {@link Ext.form.Panel}.
 * {@link Ext.form.Panel#setValues setValues} if the
 * form's {@link Ext.form.Panel#trackResetOnLoad trackResetOnLoad} property
 * is set to true.
 */

/**
 * @method isDirty
 * Returns `true` if the value of this Field has been changed from its {@link #originalValue}.
 * Will return `false` if the field is disabled or has not been rendered yet.
 *
 * @return {Boolean} `true` if this field has been changed from its original value (and
 * is not disabled), `false` otherwise.
 */

/**
 * @method setActiveError
 * Store the activeError message string, fire the errorchange event accordingly, and
 * update the UI. If the error to be set is empty string, any validation UI is removed,
 * otherwise the proper validation UI is displayed, based upon `msgTarget`.
 */

/**
 * @method getActiveError
 * Gets the active error message for this component, if any. This does not trigger
 * validation on its own, it merely returns any message that the component may already hold.
 * @return {String} The active error message on the component; if there is no error, an
 * empty string is returned.
 */

/**
 * @method hasActiveError
 * Tells whether the field currently has an active error message. This does not trigger
 * validation on its own, it merely looks for any message that the component may
 * already hold.
 * @return {Boolean}
 */

/**
 * @method getActiveErrors
 * Gets the array of active errors for this component, if any.
 *
 * @return {Array} The active error message(s) on the component.
 */

/**
 * @method setActiveErrors
 * Set the active error message to an Array of error messages. The messages are formatted into a single message
 * string using the {@link #activeErrorsTpl}. Also see {@link #setActiveError} which allows setting the entire error
 * contents with a single string.  You probably want to call {@link Ext.form.field.Base#markInvalid markInvalid} instead.
 * @param {String[]} errors The error messages
 */

/**
 * @method markInvalid
 * Mark field as invalid.
 */

/**
 * @method clearInvalid
 * Mark field as valid.
 */

/**
 * @method isValid
 * Returns true if field is valid.
 */

/**
 * @method isEqual
 * Returns whether two field {@link #getValue values} are logically equal. Field implementations may override this
 * to provide custom comparison logic appropriate for the particular field's data type.
 * @param {Object} value1 The first value to compare
 * @param {Object} value2 The second value to compare
 * @return {Boolean} True if the values are equal, false if inequal.
 */

/**
 * @method validate
 * Validate the field and return it's validity state.
 * To get the existing validity state without re-validating current value,
 * use {@link isValid}.
 */

/**
 * @method getRawValue
 * Returns the raw value of the field, without performing any normalization, conversion,
 * or validation. To get a normalized and converted value see {@link #getValue}.
 * @return {String} value The raw String value of the field
 *
 * @since 7.0
 */

/**
 * @method processRawValue
 * Performs any necessary manipulation of a raw field value to prepare it for
 * {@link #rawToValue conversion} and/or {@link #validate validation}, for instance
 * stripping out ignored characters. In the base implementation it does nothing;
 * individual subclasses may override this as needed.
 *
 * @param {Object} value The unprocessed string value
 * @return {Object} The processed string value
 *
 * @since 7.0
 */

/**
 * @method rawToValue
 * Converts a raw input field value into a mixed-type value that is suitable for this particular
 * field type. This allows controlling the normalization and conversion of user-entered values
 * into field-type-appropriate values, e.g. a Date object for {@link Ext.field.Date},
 * and is invoked by {@link #getValue}.
 *
 * It is up to individual implementations to decide how to handle raw values that cannot be
 * successfully converted to the desired object type.
 *
 * The base implementation does no conversion, returning the raw value untouched.
 *
 * @param {Object} rawValue
 * @return {Object} The converted value.
 *
 * @since 7.0
 */

/**
 * @method serialize
 * A function which converts the field’s value for submission. This is the value used
 * for form submit. The field's value is serialized using the serializer for the
 * associated {@link Ext.data.Model} when using `modelValidation`, or using the
 * serializer specified by the {@link #dataType} config.
 * @return {String}
 * @since 7.0
 */

/**
 * @method transformRawValue
 * Transform the raw value before it is set
 * @protected
 * @param {Object} value The value
 * @return {Object} The value to set
 *
 * @since 7.0
 */
