/**
 * @class Ext.field.Input
 * @extend Ext.Component
 * @xtype input
 */

/**
 * @cfg {String} [type='text']
 *
 * The type attribute for input fields -- e.g. radio, text, password.
 *
 * If you want to use a `file` input, please use the {@link Ext.field.File} component instead.
 * @accessor
 */

/**
 * @cfg {Boolean} [checked=false]
 * `true` if the checkbox should render initially checked.
 * @accessor
 */

/**
 * @cfg {String} [name=null]
 * The field's HTML name attribute.
 *
 * __Note:__ This property must be set if this field is to be automatically included with
 * {@link Ext.form.Panel#method-submit form submit()}.
 * @accessor
 */

/**
 * @cfg {Mixed} [value=null]
 * A value to initialize this field with.
 * @accessor
 */

/**
 * @cfg {Boolean} isFocused
 * `true` if the field currently has focus.
 * @accessor
 */

/**
 * @cfg {String} [placeHolder=null]
 * A string value displayed in the input (if supported) when the control is empty.
 * @accessor
 */

/**
 * @cfg {Number} [minValue=null]
 * The minimum value that this Number field can accept (defaults to `undefined`, e.g. no minimum).
 * @accessor
 */

/**
 * @cfg {Number} [maxValue=null]
 * The maximum value that this Number field can accept (defaults to `undefined`, e.g. no maximum).
 * @accessor
 */

/**
 * @cfg {Number} [stepValue=null]
 * The amount by which the field is incremented or decremented each time the spinner is tapped.
 * Defaults to `undefined`, which means that the field goes up or down by 1 each time the spinner is tapped.
 * @accessor
 */

/**
 * @cfg {Number} [maxLength=null]
 * The maximum number of permitted input characters.
 * @accessor
 */

/**
 * @cfg {Boolean} [autoComplete=null]
 * `true` to set the field's DOM element `autocomplete` attribute to `"on"`, `false` to set to `"off"`. Defaults to `undefined`, leaving the attribute unset.
 * @accessor
 */

/**
 * @cfg {Boolean} [autoCapitalize=null]
 * `true` to set the field's DOM element `autocapitalize` attribute to `"on"`, `false` to set to `"off"`. Defaults to `undefined`, leaving the attribute unset
 * @accessor
 */

/**
 * @cfg {Boolean} [autoCorrect=null]
 * `true` to set the field DOM element `autocorrect` attribute to `"on"`, `false` to set to `"off"`. Defaults to `undefined`, leaving the attribute unset.
 * @accessor
 */

/**
 * @cfg {Boolean} [readOnly=null]
 * `true` to set the field DOM element `readonly` attribute to `"true"`. Defaults to `undefined`, leaving the attribute unset.
 * @accessor
 */

/**
 * @cfg {Number} [maxRows=null]
 * Sets the field DOM element `maxRows` attribute. Defaults to `undefined`, leaving the attribute unset.
 * @accessor
 */

/**
 * @cfg {Mixed} validators
 * Field validators.
 */

/**
 * @cfg {Boolean} [disabled=false] `true` to disable the field.
 *
 * Be aware that conformant with the [HTML specification](http://www.w3.org/TR/html401/interact/forms.html),
 * disabled Fields will not be {@link Ext.form.Panel#method-submit submitted}.
 * @accessor
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
 * @cfg {Boolean} [fastFocus=false]
 *
 * Enable Fast Input Focusing on iOS, using this workaround will stop some touchstart events in order to prevent
 * delayed focus issues.
 *
 * @accessor
 */

/**
 * @cfg {String} [validationMessage='Is in the wrong format']
 * For HTML5 validation, regex, etc., this is the error message returned if field
 * is invalid.
 *
 * @accessor
 */

/**
 * @event masktap
 * @preventable
 * Fires whenever a mask is tapped.
 * @param {Ext.field.Input} this
 * @param {Ext.event.Event} e The event object.
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
 * @method getValue
 * Returns the field data value.
 * @return {Mixed} value The field value.
 */
