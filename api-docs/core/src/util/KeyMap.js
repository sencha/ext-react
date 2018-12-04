/**
 * @class Ext.util.KeyMap
 * Handles mapping key events to handling functions for an element or a Component.
 * One KeyMap can be used for multiple actions.
 *
 * A KeyMap must be configured with a {@link #target} as an event source which may be
 * an Element or a Component.
 *
 * If the target is an element, then the `keydown` event will trigger the invocation
 * of {@link #binding}s.
 *
 * It is possible to configure the KeyMap with a custom {@link #eventName} to listen for.
 * This may be useful when the {@link #target} is a Component.
 *
 * The KeyMap's event handling requires that the first parameter passed is a key event.
 * So if the Component's event signature is different, specify a {@link #processEvent}
 * configuration which accepts the event's parameters and returns a key event.
 *
 * Functions specified in {@link #binding}s are called with this signature:
 * `(String key, Ext.event.Event e)` (if the match is a multi-key combination
 * the callback will still be called only once). A KeyMap can also handle a string
 * representation of keys. By default KeyMap starts enabled.
 *
 * Usage:
 *
 *      // map one key by key code
 *      var map = new Ext.util.KeyMap({
 *          target: "my-element",
 *          key: 13, // or Ext.event.Event.ENTER
 *          handler: myHandler,
 *          scope: myObject
 *      });
 *
 *      // map multiple keys to one action by string
 *      var map = new Ext.util.KeyMap({
 *          target: "my-element",
 *          key: "a\r\n\t",
 *          handler: myHandler,
 *          scope: myObject
 *      });
 *
 *      // map multiple keys to multiple actions by strings and array of codes
 *      var map = new Ext.util.KeyMap({
 *          target: "my-element",
 *          binding: [{
 *              key: [10, 13],
 *              handler: function() {
 *                  alert("Return was pressed");
 *              }
 *          }, {
 *              key: "abc",
 *              handler: function() {
 *                  alert('a, b or c was pressed');
 *              }
 *          }, {
 *              key: "\t",
 *              ctrl: true,
 *              shift: true,
 *              handler: function() {
 *                  alert('Control + shift + tab was pressed.');
 *              }
 *          }]
 *      });
 *
 * KeyMaps can also bind to Components and process key-based events fired by Components.
 *
 * To bind to a Component, include the Component event name to listen for, and a `processEvent`
 * implementation which returns the key event for further processing by the KeyMap:
 *
 *      var map = new Ext.util.KeyMap({
 *          target: myGridView,
 *          eventName: 'itemkeydown',
 *          processEvent: function(view, record, node, index, event) {
 *              // Load the event with the extra information needed by the mappings
 *              event.view = view;
 *              event.store = view.getStore();
 *              event.record = record;
 *              event.index = index;
 *              return event;
 *          },
 *          binding: {
 *              key: Ext.event.Event.DELETE,
 *              handler: function(keyCode, e) {
 *                  e.store.remove(e.record);
 *                  
 *                  // Attempt to select the record that's now in its place
 *                  e.view.getSelectionModel().select(e.index);
 *              }
 *          }
 *      });
 */

/**
 * @property {Ext.event.Event} lastKeyEvent
 * The last key event that this KeyMap handled.
 */

/**
 * @cfg {Ext.Component/Ext.dom.Element/HTMLElement/String} target
 * The object on which to listen for the event specified by the {@link #eventName} config option.
 */

/**
 * @cfg {Object/Object[][]} binding
 * Either a single object describing a handling function for s specified key (or set of keys), or
 * an array of such objects.
 * @cfg {String/String[]} binding.key A single keycode or an array of keycodes to handle, or
 * a RegExp which specifies characters to handle, eg `/[a-z]/`.
 * @cfg {Boolean} binding.shift `true` to handle key only when shift is pressed, `false` to handle
 * the key only when shift is not pressed (defaults to undefined)
 * @cfg {Boolean} binding.ctrl `true` to handle key only when ctrl is pressed, `false` to handle
 * the key only when ctrl is not pressed (defaults to undefined)
 * @cfg {Boolean} binding.alt `true` to handle key only when alt is pressed, `false` to handle
 * the key only when alt is not pressed (defaults to undefined)
 * @cfg {Function} binding.handler The function to call when KeyMap finds the expected
 * key combination
 * @cfg {Function} binding.fn Alias of handler (for backwards-compatibility)
 * @cfg {Object} binding.scope The scope (`this` context) in which the handler function
 * is executed.
 * @cfg {String} binding.defaultEventAction A default action to apply to the event
 * *when the handler returns `true`*. Possible values are: stopEvent, stopPropagation,
 * preventDefault. If no value is set no action is performed.
 */

/**
 * @cfg {Object} [processEventScope=this]
 * The scope (`this` context) in which the {@link #processEvent} method is executed.
 */

/**
 * @cfg {Boolean} [ignoreInputFields=false]
 * Configure this as `true` if there are any input fields within the {@link #target},
 * and this KeyNav should not process events from input fields
 * (`<input>`,`<textarea> and elements with `contentEditable="true"`)
 */

/**
 * @cfg {Number} [priority]
 * The priority to set on this KeyMap's listener. Listeners with a higher priority
 * are fired before those with lower priority.
 */

/**
 * @cfg {String} [eventName="keydown"]
 * The event to listen for to pick up key events.
 */

/**
 * @method addBinding
 * Add a new binding to this KeyMap.
 *
 * Usage:
 *
 *      // Create a KeyMap
 *      var map = new Ext.util.KeyMap({
 *          target: Ext.getDoc(),
 *          key: Ext.event.Event.ENTER,
 *          handler: handleKey
 *      });
 *
 *      // Add a new binding to the existing KeyMap later
 *      map.addBinding({
 *          key: 'abc',
 *          shift: true,
 *          handler: handleKey
 *      });
 *
 * @param {Object/Object[]} binding A single KeyMap config or an array of configs.
 * The following config object properties are supported:
 *
 * @param {String/Array} binding.key A single keycode or an array of keycodes to handle,
 * or a RegExp which specifies characters to handle, eg `/[a-z]/`.
 * @param {Boolean} binding.shift `true` to handle key only when shift is pressed,
 * `false` to handle the key only when shift is not pressed (defaults to undefined).
 * @param {Boolean} binding.ctrl `true` to handle key only when ctrl is pressed,
 * `false` to handle the key only when ctrl is not pressed (defaults to undefined).
 * @param {Boolean} binding.alt `true` to handle key only when alt is pressed,
 * `false` to handle the key only when alt is not pressed (defaults to undefined).
 * @param {Function} binding.handler The function to call when KeyMap finds the
 * expected key combination.
 * @param {Function} binding.fn Alias of handler (for backwards-compatibility).
 * @param {Object} binding.scope The scope (`this` context) in which the handler function
 * is executed.
 * @param {String} binding.defaultEventAction A default action to apply to the event
 * *when the handler returns `true`*. Possible values are: stopEvent, stopPropagation,
 * preventDefault. If no value is set no action is performed.
 */

/**
 * @method removeBinding
 * Remove a binding from this KeyMap.
 * @param {Object} binding See {@link #addBinding for options}
 */

/**
 * @cfg {Function} processEvent
 * An optional event processor function which accepts the argument list provided by the
 * {@link #eventName configured event} of the {@link #target}, and returns a keyEvent
 * for processing by the KeyMap.
 *
 * This may be useful when the {@link #target} is a Component with a complex event signature,
 * where the event is not the first parameter. Extra information from the event arguments
 * may be injected into the event for use by the handler functions before returning it.
 *
 * If `null` is returned the KeyMap stops processing the event.
 */

/**
 * @method on
 * Shorthand for adding a single key listener.
 *
 * @param {Number/Number[]/Object} key Either the numeric key code, array of key codes
 * or an object with the following options: `{key: (number or array), shift: (true/false),
 * ctrl: (true/false), alt: (true/false)}`
 * @param {Function} fn The function to call
 * @param {Object} [scope] The scope (`this` reference) in which the function is executed.
 * Defaults to the browser window.
 */

/**
 * @method un
 * Shorthand for removing a single key listener.
 *
 * @param {Number/Number[]/Object} key Either the numeric key code, array of key codes
 * or an object with the following options: `{key: (number or array), shift: (true/false),
 * ctrl: (true/false), alt: (true/false)}`
 * @param {Function} fn The function to call
 * @param {Object} [scope] The scope (`this` reference) in which the function is executed.
 * Defaults to the browser window.
 */

/**
 * @method isEnabled
 * Returns true if this KeyMap is enabled
 * @return {Boolean}
 */

/**
 * @method enable
 * Enables this KeyMap
 */

/**
 * @method disable
 * Disable this KeyMap
 */

/**
 * @method setDisabled
 * Convenience function for setting disabled/enabled by boolean.
 * @param {Boolean} disabled
 */

/**
 * @method destroy
 * Destroys the KeyMap instance and removes all handlers.
 * @param {Boolean} removeTarget True to also remove the {@link #target}
 */
