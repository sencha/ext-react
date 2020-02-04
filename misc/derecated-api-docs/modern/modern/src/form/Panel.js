/**
 * @class Ext.form.Panel
 * @extend Ext.Panel
 * @xtype formpanel
 *
 * The Form panel presents a set of form fields and provides convenient ways to load and save data. Usually a form
 * panel just contains the set of fields you want to display.
 *
 *     @example packages=[ext-react]
 *     import React, { Component } from 'react';
 *     import { ExtReact, Button, FormPanel, TextField } from '@sencha/ext-react-modern';
 *
 *     export default class myExample extends Component {
 *         render() {
 *             return (
 *                 <ExtReact>
 *                     <FormPanel title="Form Panel">
 *                         <TextField label="First Name"></TextField>
 *                         <TextField label="Last Name"></TextField>
 *                         <TextField label="Account Number"></TextField>
 *                         <Button text="Submit"></Button>
 *                     </FormPanel>
 *                 </ExtReact>
 *             )
 *         }
 *     }
 *
 * ##Loading data
 *
 * You can load data into forms in a few different ways, the easiest is to use
 * {@link #setValues}:
 *
 *     form.setValues({
 *         name: 'Peter',
 *         email: 'peter.venkman@gb.com',
 *         password: 'secret'
 *     });
 *
 * It's also easy to load {@link Ext.data.Model Model} instances into a form.
 *
 * ##Retrieving form data
 *
 * Getting data out of the form panel is simple and is usually achieve via the {@link #getValues} method:
 *
 *     var values = form.getValues();
 *
 *     //values now looks like this:
 *     {
 *         name: 'Peter',
 *         email: 'peter.venkman@gb.com',
 *         password: 'secret'
 *     }
 *
 * It's also possible to listen to the change events on individual fields to get more timely notification of changes
 * that the user is making. Here we expand on the example above with the User model, updating the model as soon as
 * any of the fields are changed:
 *
 * ##Setting multiple errors on fields
 *
 * While you can call {@link Ext.field.Field#markInvalid} and {@link Ext.field.Field#clearInvalid} on each field,
 * in your form, FormPanel provides a {@link #setErrors} method that will apply an Object of error states to multiple
 * fields with one call:
 *
 *      formpanel.setErrors({
 *          field1: 'field1 is in error',               // markInvalid on the field
 *          name2: 'field2 is in error',                // markInvalid on the field
 *          fieldname3: null,                           // clearInvalid on the field
 *          fieldname4: [ 'one', 'two', 'three' },      // multiple errors on one field
 *          ...
 *      });
 *
 * While you can call {@link Ext.field.Field#getActiveErrors} on each field in the form to query the form for errors,
 * you can call {@link #getErrors} on the form to get an array of error states, suitable to pass into {@link #setErrors}.
 *
 * NOTE: these methods will only work on fields that are named.
 *
 * ##Submitting forms
 *
 * There are a few ways to submit form data. In our example above we have a Model instance that we have updated, giving
 * us the option to use the Model's {@link Ext.data.Model#save save} method to persist the changes back to our server,
 * without using a traditional form submission. Alternatively, we can send a normal browser form submit using the
 * {@link #method} method:
 *
 *     form.submit({
 *         url: 'url/to/submit/to',
 *         method: 'POST',
 *         success: function() {
 *             alert('form submitted successfully!');
 *         }
 *     });
 *
 * In this case we provided the `url` to submit the form to inside the submit call - alternatively you can just set the
 * {@link #url} configuration when you create the form. We can specify other parameters (see {@link #method} for a
 * full list), including callback functions for success and failure, which are called depending on whether or not the
 * form submission was successful. These functions are usually used to take some action in your app after your data
 * has been saved to the server side.
 */

/**
 * @event submit
 * @preventable
 * Fires upon successful (Ajax-based) form submission.
 * @param {Ext.form.Panel} this This FormPanel.
 * @param {Object} result The result object as returned by the server.
 * @param {Ext.event.Event} e The event object.
 */

/**
 * @event beforesubmit
 * @preventable
 * Fires immediately preceding any Form submit action.
 * Implementations may adjust submitted form values or options prior to execution.
 * A return value of `false` from this listener will abort the submission
 * attempt (regardless of `standardSubmit` configuration).
 * @param {Ext.form.Panel} this This FormPanel.
 * @param {Object} values A hash collection of the qualified form values about to be submitted.
 * @param {Object} options Submission options hash (only available when `standardSubmit` is `false`).
 * @param {Ext.event.Event} e The event object if the form was submitted via a HTML5 form submit event.
 */

/**
 * @event exception
 * Fires when either the Ajax HTTP request reports a failure OR the server returns a `success:false`
 * response in the result payload.
 * @param {Ext.form.Panel} this This FormPanel.
 * @param {Object} result Either a failed Ext.data.Connection request object or a failed (logical) server.
 * response payload.
 */

/**
 * @cfg {Boolean} [standardSubmit=false]
 * Whether or not we want to perform a standard form submit.
 * @accessor
 */

/**
 * @cfg {String} [url=null]
 * The default url for submit actions.
 * @accessor
 */

/**
 * @cfg {String} [enctype=null]
 * The enctype attribute for the form, specifies how the form should be encoded when submitting
 * @accessor
 */

/**
 * @cfg {Object} [baseParams=null]
 * Optional hash of params to be sent (when `standardSubmit` configuration is `false`) on every submit.
 * @accessor
 */

/**
 * @cfg {Object} [submitOnAction=false]
 * When this is set to `true`, the form will automatically submit itself whenever the `action`
 * event fires on a field in this form. The action event usually fires whenever you press
 * go or enter inside a textfield.
 * @accessor
 */

/**
 * @cfg {Ext.data.Model} [record=null]
 * The model instance of this form. Can by dynamically set at any time.
 * @accessor
 */

/**
 * @cfg {String} [method='post']
 * The method which this form will be submitted. `post` or `get`.
 * @accessor
 */

/**
 * @cfg [scrollable=true]
 * @inheritdoc
 * @accessor
 */

/**
 * @cfg {Boolean} [trackResetOnLoad=false]
 * If set to true, {@link #reset}() resets to the last loaded or {@link #setValues}() data instead of
 * when the form was first created.
 * @accessor
 */

/**
 * @cfg {Object} [api=null]
 * If specified, load and submit actions will be loaded and submitted via Ext Direct.  Methods which have been imported by
 * {@link Ext.direct.Manager} can be specified here to load and submit forms. API methods may also be
 * specified as strings and will be parsed into the actual functions when the first submit or load has occurred. Such as the following:
 *
 *      api: {
 *          load: App.ss.MyProfile.load,
 *          submit: App.ss.MyProfile.submit
 *      }
 *
 *      api: {
 *          load: 'App.ss.MyProfile.load',
 *          submit: 'App.ss.MyProfile.submit'
 *      }
 *
 * You can also use a prefix instead of fully qualified function names:
 *
 *      api: {
 *          prefix: 'App.ss.MyProfile',
 *          load: 'load',
 *          submit: 'submit'
 *      }
 *
 * Load actions can use {@link #paramOrder} or {@link #paramsAsHash} to customize how the load method
 * is invoked.  Submit actions will always use a standard form submit. The `formHandler` configuration
 * (see Ext.direct.RemotingProvider#action) must be set on the associated server-side method which has
 * been imported by {@link Ext.direct.Manager}.
 * @accessor
 */

/**
 * @cfg {String/String[]} [paramOrder=null]
 * A list of params to be executed server side. Only used for the {@link #api} `load`
 * configuration.
 *
 * Specify the params in the order in which they must be executed on the
 * server-side as either (1) an Array of String values, or (2) a String of params
 * delimited by either whitespace, comma, or pipe. For example,
 * any of the following would be acceptable:
 *
 *     paramOrder: ['param1','param2','param3']
 *     paramOrder: 'param1 param2 param3'
 *     paramOrder: 'param1,param2,param3'
 *     paramOrder: 'param1|param2|param'
 *
 * @accessor
 */

/**
 * @cfg {Boolean} [paramsAsHash=null]
 * Only used for the {@link #api} `load` configuration. If true, parameters will be sent as a
 * single hash collection of named arguments. Providing a {@link #paramOrder} nullifies this
 * configuration.
 * @accessor
 */

/**
 * @cfg {Number} [timeout=30]
 * Timeout for form actions in seconds.
 * @accessor
 */

/**
 * @cfg {Boolean} [multipartDetection=true]
 * If this is enabled the form will automatically detect the need to use
 * 'multipart/form-data' during submission.
 * @accessor
 */

/**
 * @cfg {Boolean} [enableSubmissionForm=true]
 * The submission form is generated but never added to the dom. It is a submittable
 * version of your form panel, allowing for fields that are not simple text-fields
 * to be properly submitted to servers. It will also send values that are easier to parse
 * with server side code.
 *
 * If this is false we will attempt to subject the raw form inside the form panel.
 * @accessor
 */

/**
 * @cfg [nameable=true]
 * @inheritdoc
 * Forms can be assigned names to be used in parent forms.
 */

/**
 * @cfg [shareableName=true]
 * @inheritdoc
 * Forms can be assigned the same name as other forms in their parent form. This
 * means that if a form is assigned a `name` it will be returned as an array from
 * `lookupName` in its parent form.
 */

/**
 * @cfg [nameHolder=true]
 * @inheritdoc
 */

/**
 * @cfg {Object} fieldDefaults
 * The properties in this object are used as default config values for field instance.
 */

/**
 * @cfg {Boolean} jsonSubmit
 * If set to true, the field values are sent as JSON in the request body.
 * All of the field values, plus any additional params configured via
 * {@link #baseParams} and/or the `options` to {@link #submit},
 * will be included in the values POSTed in the body of the request.
 */

/**
 * @method submit
 * Performs a Ajax-based submission of form values (if {@link #standardSubmit} is false) or otherwise
 * executes a standard HTML Form submit action.
 *
 * **Notes**
 *
 *  1. Only the first parameter is implemented. Put all other parameters inside the first
 *  parameter:
 *
 *     submit({params: "" ,headers: "" etc.})
 *
 *  2. Submit example:
 *
 *     myForm.submit({
 *       url: 'PostMyData/To',
 *       method: 'Post',
 *       success: function() { Ext.Msg.alert("success"); },
 *       failure: function() { Ext.Msg.alert("error"); }
 *     });
 *
 *  3. Parameters and values only submit for a POST and not for a GET.
 *
 * @param {Object} options
 * The configuration when submitting this form.
 *
 * The following are the configurations when submitting via Ajax only:
 *
 * @param {String} options.url
 * The url for the action (defaults to the form's {@link #url}).
 *
 * @param {String} options.method
 * The form method to use (defaults to the form's {@link #method}, or POST if not defined).
 *
 * @param {Object} options.headers
 * Request headers to set for the action.
 *
 * @param {Boolean} [options.autoAbort=false]
 * `true` to abort any pending Ajax request prior to submission.
 * __Note:__ Has no effect when `{@link #standardSubmit}` is enabled.
 *
 * @param {Number} options.timeout
 * The number is seconds the loading will timeout in.
 *
 * The following are the configurations when loading via Ajax or Direct:
 *
 * @param {String/Object} options.params
 * The params to pass when submitting this form (defaults to this forms {@link #baseParams}).
 * Parameters are encoded as standard HTTP parameters using {@link Ext#urlEncode}.
 *
 * @param {Boolean} [options.submitDisabled=false]
 * `true` to submit all fields regardless of disabled state.
 * __Note:__ Has no effect when `{@link #standardSubmit}` is enabled.
 *
 * @param {String/Object} [options.waitMsg]
 * If specified, the value which is passed to the loading {@link #masked mask}. See {@link #masked} for
 * more information.
 *
 * @param {Function} options.success
 * The callback that will be invoked after a successful response. A response is successful if
 * a response is received from the server and is a JSON object where the `success` property is set
 * to `true`, `{"success": true}`.
 *
 * The function is passed the following parameters and can be used for submitting via Ajax or Direct:
 *
 * @param {Ext.form.Panel} options.success.form
 * The {@link Ext.form.Panel} that requested the action.
 *
 * @param {Object/Ext.direct.Event} options.success.result
 * The result object returned by the server as a result of the submit request. If the submit is sent using Ext Direct,
 * this will return the {@link Ext.direct.Event} instance, otherwise will return an Object.
 *
 * @param {Object} options.success.data
 * The parsed data returned by the server.
 *
 * @param {Function} options.failure
 * The callback that will be invoked after a failed transaction attempt.
 *
 * The function is passed the following parameters and can be used for submitting via Ajax or Direct:
 *
 * @param {Ext.form.Panel} options.failure.form
 * The {@link Ext.form.Panel} that requested the submit.
 *
 * @param {Ext.form.Panel} options.failure.result
 * The failed response or result object returned by the server which performed the operation.
 *
 * @param {Object} options.scope
 * The scope in which to call the callback functions (The `this` reference for the callback functions).
 *
 * @return {Ext.data.Connection} The request object if the {@link #standardSubmit} config is false.
 * If the standardSubmit config is true, then the return value is undefined.
 */

/**
 * @method setValues
 * Sets the values of form fields in bulk. Example usage:
 *
 *     myForm.setValues({
 *         name: 'Ed',
 *         crazy: true,
 *         username: 'edspencer'
 *     });
 *
 * If there groups of checkbox fields with the same name, pass their values in an array. For example:
 *
 *     myForm.setValues({
 *         name: 'Jacky',
 *         crazy: false,
 *         hobbies: [
 *             'reading',
 *             'cooking',
 *             'gaming'
 *         ]
 *     });
 *
 * @param {Object} values field name => value mapping object.
 * @return {Ext.form.Panel} This form.
 */

/**
 * @method getValues
 * Returns an object containing the value of each field in the form, keyed to the field's name.
 * For groups of checkbox fields with the same name, it will be arrays of values. For example:
 *
 *     {
 *         name: "Jacky Nguyen", // From a TextField
 *         favorites: [
 *             'pizza',
 *             'noodle',
 *             'cake'
 *         ]
 *     }
 *
 * @param {Boolean} [enabled] `true` to return only enabled fields.
 * @param {Boolean} [all] `true` to return all fields even if they don't have a
 * {@link Ext.field.Field#name name} configured.
 * @return {Object} Object mapping field name to its value.
 */
