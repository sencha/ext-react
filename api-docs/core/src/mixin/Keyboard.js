/**
 * @class Ext.mixin.Keyboard
 * @extend Ext.Mixin
 *
 * A mixin for components that need to interact with the keyboard. The primary config
 * for this class is the `{@link #keyMap keyMap}` config. This config is an object
 * with key names as its properties and with values that describe how the key event
 * should be handled.
 *
 * Key names may key name as documented in `Ext.event.Event`, numbers (which are treated
 * as `keyCode` values), single characters (for those that are not defined in
 * `Ext.event.Event`) or `charCode` values prefixed by '#' (e.g., "#65" for `charCode=65`).
 *
 * Entries that use a `keyCode` will be processed in a `keydown` event listener, while
 * those that use a `charCode` will be processed in `keypress`. This can be overridden
 * if the `keyMap` entry specifies an `event` property.
 *
 * Key names may be preceded by key modifiers. The modifier keys can be specified
 * by prepending the modifier name to the key name separated by `+` or `-` (e.g.,
 * "Ctrl+A" or "Ctrl-A"). Only one of these delimiters can be used in a given
 * entry.
 *
 * Valid modifier names are:
 *
 *  - Alt
 *  - Shift
 *  - Control (or "Ctrl" for short)
 *  - Command (or "Cmd" or "Meta")
 *  - CommandOrControl (or "CmdOrCtrl") for Cmd on Mac, Ctrl otherwise.
 *
 * *All these names are case insensitive and will be stored in upper case internally.*
 *
 * For example:
 *
 *      Ext.define('MyChartPanel', {
 *          extend: 'Ext.panel.Panel',
 *
 *          mixins: [
 *              'Ext.mixin.Keyboard'
 *          ],
 *
 *          controller: 'mycontroller',
 *
 *          // Map keys to methods (typically in a ViewController):
 *          keyMap: {
 *              ENTER: 'onEnterKey',
 *
 *              "ALT+PRINT_SCREEN": 'doScreenshot',
 *
 *              // Cmd on Mac OS X, Ctrl on Windows/Linux.
 *              "CmdOrCtrl+C": 'doCopy',
 *
 *              // This one is handled by a class method.
 *              ESC: {
 *                  handler: 'destroy',
 *                  scope: 'this',
 *                  event: 'keypress'  // default would be keydown
 *              },
 *
 *              "ALT+DOWN": 'openExpander',
 *
 *              // Match any key modifiers and invoke before any other DOWN keys
 *              // handlers with lower or default priority.
 *              "*+DOWN": {
 *                  handler: 'preprocessDownKey',
 *                  priority: 100
 *              }
 *          }
 *      });
 *
 * The method names are interpreted in the same way that event listener names are
 * interpreted.
 *
 * @since 6.2.0
 */

/**
 * @cfg {Object} keyMap
 * An object containing handlers for keyboard events. The property names of this
 * object are the key name and any modifiers. The values of the properties are the
 * descriptors of how to handle each event.
 *
 * The handler descriptor can be simply the handler function (either the
 * literal function or the method name), or it can be an object with these
 * properties:
 *
 *  - `handler`: The function or its name to call to handle the event.
 *  - `scope`: The this pointer context (can be "this" or "controller").
 *  - `event`: An optional override of the key event to which to listen.
 *
 * **Important:** Calls to `setKeyMap` do not replace the entire `keyMap` but
 * instead update the provided mappings. That is, unless `null` is passed as the
 * value of the `keyMap` which will clear the `keyMap` of all entries.
 *
 * @cfg {String} [keyMap.scope] The default scope to apply to key handlers
 * which do not specify a scope. This is processed the same way as the scope of
 * {@link #cfg-listeners}. It defaults to the `"controller"`, but using `'this'`
 * means that an instance method will be used.
 * @accessor
 */

/**
 * @cfg {Boolean} [keyMapEnabled=null]
 * Enables or disables processing keys in the `keyMap`. This value starts as
 * `null` and if it is `null` when `initKeyMap` is called, it will automatically
 * be set to `true`. Since `initKeyMap` is called by `Ext.Component` at the
 * proper time, this is not something application code normally handles.
 * @accessor
 */
