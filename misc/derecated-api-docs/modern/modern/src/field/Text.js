/**
 * @class Ext.field.Text
 * @extend Ext.field.Field
 * @xtype textfield
 *
 * The text field is the basis for most of the input fields. It provides a baseline of shared
 * functionality such as input validation, standard events, state management and look
 * and feel. Typically we create text fields inside a form, like this:
 *
 *     @example packages=[ext-react]
 *     import React, { Component } from 'react';
 *     import { ExtReact, FormPanel, Container, TextField, FieldSet } from '@sencha/ext-react-modern';
 *
 *     export default class MyExample extends Component {
 *         render() {
 *             return (
 *                 <ExtReact>
 *                     <Container layout="center">
 *                         <FormPanel shadow>
 *                             <FieldSet title="Separate Label and Placeholder" margin="0 0 20 0">
 *                                 <TextField placeHolder="Enter Name..." label="Name" required/>
 *                             </FieldSet>
 *                             <FieldSet title="Label as Placeholder" margin="0 0 20 0" >
 *                                 <TextField labelAlign="placeholder" label="Name" required/>
 *                             </FieldSet>
 *                             <FieldSet title="With Error Message">
 *                                 <TextField
 *                                     labelAlign="placeholder"
 *                                     label="Label"
 *                                     errorMessage="The value you entered is invalid."
 *                                     value="invalid value"
 *                                     errorTarget="under"
 *                                 />
 *                             </FieldSet>
 *                         </FormPanel>
 *                     </Container>
 *                 </ExtReact>
 *             )
 *         }
 *     }
 *
 * * This creates two text fields inside a form. Text Fields can also be created outside of a
 * Form, like this:
 *
 *     Ext.create('Ext.field.Text', {
 *         label: 'Your Name',
 *         value: 'Ed Spencer'
 *     });
 *
 * ## Configuring
 *
 * Text field offers several configuration options, including {@link #placeholder},
 * {@link #maxLength}, {@link #autoComplete}, {@link #autoCapitalize} and
 * {@link #autoCorrect}.
 *
 * For example, here is how we would configure a text field to have a maximum length of
 * 10 characters, with placeholder text that disappears when the field is focused:
 *
 *     Ext.create('Ext.field.Text', {
 *         label: 'Username',
 *         maxLength: 10,
 *         placeholder: 'Enter your username'
 *     });
 *
 * The autoComplete, autoCapitalize and autoCorrect configs simply set those attributes on
 * the text field and allow the native browser to provide those capabilities. For example,
 * to enable auto complete and auto correct, simply configure your text field like this:
 *
 *     Ext.create('Ext.field.Text', {
 *         label: 'Username',
 *         autoComplete: true,
 *         autoCorrect: true
 *     });
 *
 * These configurations will be picked up by the native browser, which will enable the
 * options at the OS level.
 *
 * Text field inherits from {@link Ext.field.Field}, which is the base class for all
 * fields and provides a lot of shared functionality for all fields, including setting
 * values, clearing and basic validation. See the {@link Ext.field.Field} documentation
 * to see how to leverage its capabilities.
 */

/**
 * @event focus
 * Fires when this field receives input focus
 * @param {Ext.field.Text} this This field
 * @param {Ext.event.Event} e
 */

/**
 * @event blur
 * Fires when this field loses input focus
 * @param {Ext.field.Text} this This field
 * @param {Ext.event.Event} e
 */

/**
 * @event paste
 * Fires when this field is pasted.
 * @param {Ext.field.Text} this This field
 * @param {Ext.event.Event} e
 */

/**
 * @event mousedown
 * Fires when this field receives a mousedown
 * @param {Ext.field.Text} this This field
 * @param {Ext.event.Event} e
 */

/**
 * @event keyup
 * @preventable
 * Fires when a key is released on the input element
 * @param {Ext.field.Text} this This field
 * @param {Ext.event.Event} e
 */

/**
 * @event clearicontap
 * @preventable
 * Fires when the clear icon is tapped
 * @param {Ext.field.Text} this This field
 * @param {Ext.field.Input} input The field's input component.
 * @param {Ext.event.Event} e
 */

/**
 * @event change
 * Fires when the value has changed.
 * @param {Ext.field.Text} this This field
 * @param {String} newValue The new value
 * @param {String} oldValue The original value
 */

/**
 * @event action
 * @preventable
 * Fires whenever the return key or go is pressed. FormPanel listeners
 * for this event, and submits itself whenever it fires. Also note
 * that this event bubbles up to parent containers.
 * @param {Ext.field.Text} this This field
 * @param {Mixed} e The key event object
 */

/**
 * @cfg {Boolean} [clearIcon=true]
 * `true` to use a clear icon in this field.
 * @accessor
 */

/**
 * @cfg labelAlign
 * When value is `'placeholder'`, the label text will be rendered as placeholder
 * text inside the empty input and will animated to "top" alignment when the input
 * is focused or contains text.
 * @inheritdoc
 * @accessor
 */

/**
 * @cfg {String} [placeholder=null]
 * A string value displayed in the input when the control is empty.
 *
 * @accessor
 */

/**
 * @cfg {Number} [maxLength=null]
 * The maximum number of permitted input characters.
 * @accessor
 */

/**
 * @cfg {Boolean} [autoComplete=null]
 * True to set the field's DOM element autocomplete attribute to "on", false to set to "off".
 *
 * @accessor
 */

/**
 * @cfg {Boolean} [autoCapitalize=null]
 * True to set the field's DOM element auto=capitalize attribute to "on", false to set to "off".
 * @accessor
 */

/**
 * @cfg {Boolean} [autoCorrect=null]
 * True to set the field DOM element auto-correct attribute to "on", false to set to "off".
 * @accessor
 */

/**
 * @cfg {Boolean} [readOnly=null]
 * True to set the field DOM element readonly attribute to true.
 * @accessor
 */

/**
 * @cfg {String} [pattern=null]
 * The value for the HTML5 `pattern` attribute.
 * You can use this to change which keyboard layout will be used.
 *
 * Even though it extends {@link Ext.field.Text}, it will display the number keyboard.
 *
 * @accessor
 */

/**
 * @cfg {Object} triggers
 * {@link Ext.field.trigger.Trigger Triggers} to use in this field.  The keys in
 * this object are unique identifiers for the triggers. The values in this object
 * are {@link Ext.field.trigger.Trigger Trigger} configuration objects.
 *
 * The weight value may be a negative value in order to position custom triggers
 * ahead of default triggers like that of a DatePicker field.
 *
 * @accessor
 */

/**
 * @cfg {Boolean} [editable=true]
 * Configure as `false` to prevent the user from typing text directly into the field;
 * the field can only have its value set programmatically or via an action invoked by a trigger.
 *
 * Contrast with {@link #cfg!readOnly} which disables all mutation via the UI.
 *
 * @accessor
 */

/**
 * @cfg {'left'/'center'/'right'} [textAlign=null]
 * The text alignment of this field.
 *
 * @accessor
 */

/**
 * @cfg {RegExp} stripCharsRe
 * A JavaScript RegExp object used to strip unwanted content from the value
 * during input. If `stripCharsRe` is specified,
 * every *character sequence* matching `stripCharsRe` will be removed.
 */

/**
 * @property doKeyDown
 * Called when a key has been pressed in the `<input>`
 * @protected
 */

/**
 * @property defaultBindProperty
 * @inheritdoc
 */

/**
 * @property classCls
 * @inheritdoc
 */

/**
 * @method doKeyUp
 * Called when a key has been pressed in the `<input>`
 * @private
 */

/**
 * @method processRawValue
 * Performs any necessary manipulation of a raw String value to prepare
 * it for conversion and/or
 * {@link #validate validation}. For text fields this applies the configured
 * {@link #stripCharsRe} to the raw value.
 * @param {String} value The unprocessed string value
 * @return {String} The processed string value
 * @since 7.0
 */
