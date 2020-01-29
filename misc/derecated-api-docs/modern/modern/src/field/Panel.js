/**
 * @class Ext.field.Panel
 * @extend Ext.Panel
 * @xtype fieldpanel
 * @mixin Ext.field.Manager
 * @mixin Ext.form.Borders
 * A `fieldpanel` is a convenient way to manage and load {@link Ext.field.Field fields}.
 * This class does not provide the `form` submit capabilities of
 * {@link Ext.form.Panel formpanel} but is instead designed to be used where data will be
 * saved to a server in other ways (see below) or perhaps as a child of a `formpanel`.
 *
 * Usually a `fieldpanel` just contains a set of fields.
 *
 * ## Example usage:
 *
 *   @example packages=[ext-react]
 *   import React, { Component } from 'react';
 *   import { ExtReact, FieldPanel, TextField, EmailField, PasswordField } from '@sencha/ext-modern';
 *
 *   export default class MyExample extends Component {
 *       render() {
 *           return (
 *              <ExtReact>
 *               <FieldPanel width="600" height="300">
 *                   <TextField
 *                       name="name"
 *                       label="Name"
 *                       padding="10"
 *                   >
 *                   </TextField>
 *                   <EmailField
 *                       name="email"
 *                       label="Email"
 *                       padding="10"
 *                   >
 *                   </EmailField>
 *                   <PasswordField
 *                       name="password"
 *                       label="Password"
 *                       padding="10"
 *                   >
 *                   </PasswordField>
 *               </FieldPanel>
 *              </ExtReact>
 *           )
 *       }
 *   }
 *
 * Here we just created a simple container which could be used as a registration form to
 * sign up to your service. We added a plain TextField for the user's Name, an EmailField,
 * and finally a PasswordField.
 *
 * In each case we provided a name config on the field so that we can identify it later
 * and act on the whole group of fields.
 *
 * ## Gathering Field Data
 *
 * One simple way to get the data from a `fieldpanel` is {@link #getValues}:
 *
 *      let values = panel.getValues();
 *
 *      // values now looks like this:
 *
 *      {
 *          name: 'Peter',
 *          email: 'peter.venkman@gb.com',
 *          password: '**********'
 *      }
 *
 * ## Observing Fields
 *
 *     <FieldPanel>
 *         <TextField
 *             name="name"
 *             label="Name"
 *             onChange={(field, newValue) => Ext.toast(`New value is ${newValue}`)}
 *         />
 *         <EmailField
 *             name="email"
 *             label="Email"
 *         />
 *         <PasswordField
 *             name="password"
 *             label="Password"
 *         />
 *     </FieldPanel>
 *
 * The above code responds to a {@link Ext.field.Text#change change} event from any `field`
 * that is an immediate child of its view, the `fieldpanel`.
 *
 */

/**
 * @cfg [scrollable=true]
 * @inheritdoc
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
 * @event exception
 * Fires when either the Ajax HTTP request reports a failure OR the server returns a
 * `success:false` response in the result payload.
 * @param {Ext.field.Panel} this This container.
 * @param {Object} result Either a failed `Ext.data.Connection` request object or a
 * failed (logical) server response payload.
 */

/**
 * @cfg {Object} api
 * If specified, load and submit (see `formpanel`) actions will be loaded and
 * submitted via Ext Direct. Methods which have been imported by
 * {@link Ext.direct.Manager} can be specified here to load and submit forms.
 *
 * API methods may also be specified as strings and will be parsed into the actual
 * functions when the first submit or load has occurred.
 *
 * For example, instead of the following:
 *
 *      api: {
 *          load: App.ss.MyProfile.load,
 *          submit: App.ss.MyProfile.submit
 *      }
 *
 * You can use strings:
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
 * Load actions can use {@link #paramOrder} or {@link #paramsAsHash} to customize
 * how the {@link #method!load load method} is invoked.
 *
 * For `formpanel`, submit actions will always use a standard form submit. The
 * `formHandler` configuration (see Ext.direct.RemotingProvider#action) must be
 * set on the associated server-side method which has been imported by
 * {@link Ext.direct.Manager}.
 * @accessor
 */

/**
 * @cfg {Object} baseParams
 * Optional set of params to be sent.
 *
 * For `formpanel` this only applies when `standardSubmit` is set to `false`.
 * @accessor
 */

/**
 * @cfg {String/String[]} paramOrder
 * A list of params to be executed server side. Only used for the
 * {@link #cfg!api load} config.
 *
 * Specify the params in the order in which they must be executed on the
 * server-side as either (1) a String[], or (2) a String of params delimited by
 * either whitespace, comma, or pipe.
 *
 * For example, any of the following would be acceptable:
 *
 *     paramOrder: ['param1','param2','param3']
 *     paramOrder: 'param1 param2 param3'
 *     paramOrder: 'param1,param2,param3'
 *     paramOrder: 'param1|param2|param'
 * @accessor
 */

/**
 * @cfg {Boolean} paramsAsHash
 * If true, parameters will be sent as a single hash collection of named arguments.
 * Providing a {@link #paramOrder} nullifies this configuration.
 *
 * Only used for the {@link #cfg!api load} config.
 * @accessor
 */

/**
 * @cfg {Number} [timeout=30]
 * Timeout for server actions (in seconds).
 * @accessor
 */

/**
 * @cfg {String} url
 * The default URL for server actions (`load` and `submit` in `formpanel`).
 * @accessor
 */
