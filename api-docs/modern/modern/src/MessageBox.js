/**
 * @class Ext.MessageBox
 * @extend Ext.Sheet
 * @xtype messagebox
 *
 * Utility class for generating different styles of message boxes. The framework provides a global singleton
 * {@link Ext.Msg} for common usage which you should use in most cases.
 *
 * If you want to use {@link Ext.MessageBox} directly, just think of it as a modal {@link Ext.Container}.
 *
 * Note that the MessageBox is asynchronous. Unlike a regular JavaScript `alert` (which will halt browser execution),
 * showing a MessageBox will not cause the code to stop. For this reason, if you have code that should only run _after_
 * some user feedback from the MessageBox, you must use a callback function (see the `fn` configuration option parameter
 * for the {@link #method-show show} method for more details).
 *
 * Checkout {@link Ext.Msg} for more examples.
 *
 * ## Static Values
 *
 * The following values can be utilized by Ext.window.MessageBox and Ext.Msg:
 *
 *      INFO    : Ext.baseCSSPrefix + 'msgbox-info',
 *      WARNING : Ext.baseCSSPrefix + 'msgbox-warning',
 *      QUESTION: Ext.baseCSSPrefix + 'msgbox-question',
 *      ERROR   : Ext.baseCSSPrefix + 'msgbox-error',
 *
 *      OK    : { ok: 'me.onClick' },
 *      YES   : { yes: 'me.onClick' },
 *      NO    : { no: 'me.onClick' },
 *      CANCEL: { cancel: 'me.onClick' },
 *
 *      OKCANCEL: {
 *          ok: 'me.onClick',
 *          cancel: 'me.onClick'
 *      },
 *
 *      YESNOCANCEL: {
 *          yes: 'me.onClick',
 *          no: 'me.onClick',
 *          cancel: 'me.onClick'
 *      },
 *
 *      YESNO: {
 *          yes: 'me.onClick',
 *          no: 'me.onClick'
 *      }
 *
 */

/**
 * @cfg [iconCls=null]
 * @inheritdoc Ext.Button#cfg-iconCls
 * @accessor
 */

/**
 * @cfg showAnimation
 * @inheritdoc
 */

/**
 * @cfg hideAnimation
 * @inheritdoc
 */

/**
 * @cfg {Number} [defaultTextHeight=75]
 * The default height in pixels of the message box's multiline textarea if displayed.
 * @accessor
 */

/**
 * @cfg {String} [title=null]
 * The title of this {@link Ext.MessageBox}.
 * @accessor
 */

/**
 * @cfg {Array/Object} [buttons=null]
 * An array of buttons, or an object of a button to be displayed in the toolbar of
 * this {@link Ext.MessageBox}.
 */

/**
 * @cfg {Object} buttonToolbar
 * Configure the toolbar that holds the buttons inside the MessageBox
 */

/**
 * @cfg {String} [message=null]
 * The message to be displayed in the {@link Ext.MessageBox}.
 * @accessor
 */

/**
 * @cfg {Object} [prompt=null]
 * The configuration to be passed if you want an {@link Ext.field.Text} or {@link Ext.field.TextArea} field
 * in your {@link Ext.MessageBox}.
 *
 * Pass an object with the property `multiLine` with a value of `true`, if you want the prompt to use a TextArea.
 *
 * Alternatively, you can just pass in an object, which has an xtype/xclass of another component.
 *
 * @accessor
 */

/**
 * @cfg layout
 * @inheritdoc
 */

/**
 * @method show
 * Displays the {@link Ext.MessageBox} with a specified configuration. All
 * display functions (e.g. {@link #method-prompt}, {@link #alert}, {@link #confirm})
 * on MessageBox call this function internally, although those calls
 * are basic shortcuts and do not support all of the prop options allowed here.
 *
 * @param {Object} options An object with the following prop options:
 *
 * @param {Object/Array} [options.buttons=false]
 * A button prop object or Array of the same(e.g., `Ext.MessageBox.OKCANCEL` or `{text:'Foo', itemId:'cancel'}`),
 * or false to not show any buttons.
 *
 * @param {String} options.cls
 * A custom CSS class to apply to the message box's container element.
 *
 * @param {Function} options.fn
 * A callback function which is called when the dialog is dismissed by clicking on the configured buttons.
 *
 * @param {String} options.fn.buttonId The `itemId` of the button pressed, one of: 'ok', 'yes', 'no', 'cancel'.
 * @param {String} options.fn.value Value of the input field if either `prompt` or `multiline` option is `true`.
 * @param {Object} options.fn.opt The prop object passed to show.
 *
 * @param {Number} [options.width=auto]
 * A fixed width for the MessageBox.
 *
 * @param {Number} [options.height=auto]
 * A fixed height for the MessageBox.
 *
 * @param {Object} options.scope
 * The scope of the callback function
 *
 * @param {String} options.icon
 * A CSS class that provides a background image to be used as the body icon for the dialog
 * (e.g. Ext.MessageBox.WARNING or 'custom-class').
 *
 * @param {Boolean} [options.modal=true]
 * `false` to allow user interaction with the page while the message box is displayed.
 *
 * @param {String} [options.message=&#160;]
 * A string that will replace the existing message box body text.
 * Defaults to the XHTML-compliant non-breaking space character `&#160;`.
 *
 * @param {Number} [options.defaultTextHeight=75]
 * The default height in pixels of the message box's multiline textarea if displayed.
 *
 * @param {Boolean} [options.prompt=false]
 * `true` to prompt the user to enter single-line text. Please view the {@link Ext.MessageBox#method-prompt} documentation in {@link Ext.MessageBox}.
 * for more information.
 *
 * @param {Boolean} [options.multiline=false]
 * `true` to prompt the user to enter multi-line text.
 *
 * @param {String} options.title
 * The title text.
 *
 * @param {String} options.value
 * The string value to set into the active textbox element if displayed.
 *
 * @return {Ext.MessageBox} this
 */

/**
 * @method alert
 * Displays a standard read-only message box with an OK button (comparable to the basic JavaScript alert prompt). If
 * a callback function is passed it will be called after the user clicks the button, and the `itemId` of the button
 * that was clicked will be passed as the only parameter to the callback.
 *
 * @param {String} title The title bar text.
 * @param {String} message The message box body text.
 * @param {Function} [fn] A callback function which is called when the dialog is dismissed by clicking on the configured buttons.
 * @param {String} fn.buttonId The `itemId` of the button pressed, one of: 'ok', 'yes', 'no', 'cancel'.
 * @param {String} fn.value Value of the input field if either `prompt` or `multiLine` option is `true`.
 * @param {Object} fn.opt The prop object passed to show.
 * @param {Object} [scope] The scope (`this` reference) in which the callback is executed.
 * Defaults to: the browser window
 *
 * @return {Ext.MessageBox} this
 */

/**
 * @method confirm
 * Displays a confirmation message box with Yes and No buttons (comparable to JavaScript's confirm). If a callback
 * function is passed it will be called after the user clicks either button, and the id of the button that was
 * clicked will be passed as the only parameter to the callback (could also be the top-right close button).
 *
 * @param {String} title The title bar text.
 * @param {String} message The message box body text.
 * @param {Function} fn A callback function which is called when the dialog is dismissed by clicking on the configured buttons.
 * @param {String} fn.buttonId The `itemId` of the button pressed, one of: 'ok', 'yes', 'no', 'cancel'.
 * @param {String} fn.value Value of the input field if either `prompt` or `multiLine` option is `true`.
 * @param {Object} fn.opt The prop object passed to show.
 * @param {Object} [scope] The scope (`this` reference) in which the callback is executed.
 *
 * Defaults to: the browser window
 *
 * @return {Ext.MessageBox} this
 */

/**
 * @method prompt
 * Displays a message box with OK and Cancel buttons prompting the user to enter some text (comparable to
 * JavaScript's prompt). The prompt can be a single-line or multi-line textbox. If a callback function is passed it
 * will be called after the user clicks either button, and the id of the button that was clicked (could also be the
 * top-right close button) and the text that was entered will be passed as the two parameters to the callback.
 *
 * @param {String} title The title bar text.
 * @param {String} message The message box body text.
 * @param {Function} fn A callback function which is called when the dialog is dismissed by clicking on the configured buttons.
 * @param {String} fn.buttonId The `itemId` of the button pressed, one of: 'ok', 'yes', 'no', 'cancel'.
 * @param {String} fn.value Value of the input field if either `prompt` or `multiLine` option is `true`.
 * @param {Object} fn.opt The prop object passed to show.
 * @param {Object} scope The scope (`this` reference) in which the callback is executed.
 *
 * Defaults to: the browser window.
 *
 * @param {Boolean/Number} [multiLine=false] `true` to create a multiline textbox using the `defaultTextHeight` property,
 * or the height in pixels to create the textbox.
 *
 * @param {String} [value] Default value of the text input element.
 *
 * @param {Object} [prompt=true]
 * The configuration for the prompt. See the {@link Ext.MessageBox#cfg-prompt prompt} documentation in {@link Ext.MessageBox}
 * for more information.
 *
 * @return {Ext.MessageBox} this
 */

/**
 * @class Ext.Msg
 * @extend Ext.MessageBox
 * @singleton
 *
 * A global shared singleton instance of the {@link Ext.MessageBox} class.
 *
 * Allows for simple creation of various different alerts and notifications.
 *
 * ## Examples
 *
 *     @example packages=[ext-react]
 *     import React, { Component } from 'react';
 *     import { ExtReact, Panel, Button } from '@sencha/ext-react-modern';
 *
 *     Ext.require('Ext.MessageBox');
 *
 *     export default class MyExample extends Component {
 *
 *         onConfirmResult(buttonId, value, opt) {
 *             Ext.toast(`User clicked ${buttonId} button.`);
 *         }
 *
 *         onPromptResult(buttonId, value) {
 *             Ext.toast(`User clicked ${buttonId} and entered value "${value}".`);
 *         }
 *
 *         render() {
 *             return (
 *                 <ExtReact>
 *                     <Panel shadow layout={{type: 'vbox', align: 'stretch'}}>
 *                         <Button handler={() => Ext.Msg.alert('Title', 'The quick brown fox jumped over the lazy dog.')} text="Alert"/>
 *                         <Button handler={() => Ext.Msg.prompt('Welcome!', "What's your first name?", this.onPromptResult.bind(this))} text="Prompt"/>
 *                         <Button handler={() => Ext.Msg.confirm("Confirmation", "Are you sure you want to do that?", this.onConfirmResult.bind(this))} text="Confirm"/>
 *                     </Panel>
 *                 </ExtReact>
 *             )
 *         }
 *
 *     }
 *
 */
