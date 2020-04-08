/**
 * @class Ext.util.History
 * @mixin Ext.util.Observable
 * @singleton
 * History management component that allows you to register arbitrary tokens that signify application
 * history state on navigation actions.  You can then handle the history {@link #change} event in order
 * to reset your application UI to the appropriate state when the user navigates forward or backward through
 * the browser history stack.
 *
 * ## Initializing
 *
 * The {@link #init} method of the History object must be called before using History. This sets up the internal
 * state and must be the first thing called before using History.
 */

/**
 * @property {Boolean} [useTopWindow=false]
 * True to use `window.top.location.hash` or false to use `window.location.hash`. Must be set before {@link #init} is called
 * because the `hashchange` event listener is added to the window at initialization time.
 */

/**
 * @property {Boolean} hashbang If set to `true`, when a hash is set, the hash will be prefixed
 * with an exclamation making it a hash bang instead of just a hash.
 *
 *     Ext.util.History.add('foo'); // will result in #foo
 *
 *     Ext.util.History.hashbang = true;
 *     Ext.util.History.add('bar'); // will result in #!bar
 */

/**
 * @event ready
 * Fires when the Ext.util.History singleton has been initialized and is ready for use.
 * @param {Ext.util.History} history The Ext.util.History singleton.
 */

/**
 * @event change
 * Fires when navigation back or forwards within the local page's history occurs.
 * @param {String} token An identifier associated with the page state at that point in its history.
 */

/**
 * @method init
 * Initializes the global History instance.
 * @param {Function} [onReady] A callback function that will be called once the history
 * component is fully initialized.
 * @param {Object} [scope] The scope (`this` reference) in which the callback is executed.
 * Defaults to the browser window.
 */

/**
 * @method add
 * Add a new token to the history stack. This can be any arbitrary value, although it would
 * commonly be the concatenation of a component id and another id marking the specific history
 * state of that component. Example usage:
 *
 *     // Handle tab changes on a TabPanel
 *     tabPanel.on('tabchange', function(tabPanel, tab){
 *          Ext.History.add(tabPanel.id + ':' + tab.id);
 *     });
 *
 * @param {String} token The value that defines a particular application-specific history state
 * @param {Boolean} [preventDuplicates=true] When true, if the passed token matches the current token
 * it will not save a new history step. Set to false if the same state can be saved more than once
 * at the same history stack location.
 */

/**
 * @method replace
 * Replaces the current resource in history.
 * @param {String} token The value that will replace the current resource in the history state.
 * @param {Boolean} [preventDuplicates=true] When `true`, if the passed token matches the current token
 * it will not save a new history step. Set to `false` if the same state can be saved more than once
 * at the same history stack location.
 * @return {Boolean} Whether the token was set.
 */

/**
 * @method back
 * Programmatically steps back one step in browser history (equivalent to the user pressing the Back button).
 */

/**
 * @method forward
 * Programmatically steps forward one step in browser history (equivalent to the user pressing the Forward button).
 */

/**
 * @method getToken
 * Retrieves the currently-active history token.
 * @return {String} The token
 */
