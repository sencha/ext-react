/**
 * @class Ext.util.KeyNav
 * @extend Ext.util.KeyMap
 * Provides a convenient wrapper for normalized keyboard navigation. KeyNav allows you to bind
 * navigation keys to function calls that will get called when the keys are pressed, providing
 * an easy way to implement custom navigation schemes for any UI component.
 *
 * The following are all of the possible keys that can be implemented: Enter, Space, Left, Right,
 * Up, Down, Tab, Esc, Page Up, Page Down, Delete, Backspace, Home, End.
 *
 * Usage:
 *
 *      var nav = new Ext.util.KeyNav({
 *          target: "my-element",
 *          
 *          left: function(e) {
 *              this.moveLeft(e.ctrlKey);
 *          },
 *          right: function(e) {
 *              this.moveRight(e.ctrlKey);
 *          },
 *          enter: function(e) {
 *              this.save();
 *          },
 *          
 *          // Binding may be a function specifiying fn, scope and defaultEventAction
 *          esc: {
 *              fn: this.onEsc,
 *              defaultEventAction: false
 *          },
 *          
 *          // Binding may be keyed by a single character
 *          A: {
 *              ctrl: true,
 *              fn: selectAll
 *          },
 *          
 *          // Binding may be keyed by a key code (45 = INSERT)
 *          45: {
 *              fn: doInsert
 *          },
 *          
 *          scope: myObject
 *     });
 */

/**
 * @cfg {Boolean} [disabled=false]
 * True to disable this KeyNav instance.
 */

/**
 * @cfg {String} [defaultEventAction=false]
 * The method to call on the {@link Ext.event.Event} after this KeyNav intercepts a key.
 * Valid values are {@link Ext.event.Event#stopEvent}, {@link Ext.event.Event#preventDefault}
 * and {@link Ext.event.Event#stopPropagation}.
 *
 * If a falsy value is specified, no method is called on the key event.
 */

/**
 * @cfg {Boolean} [forceKeyDown=false]
 *
 * Handle the keydown event instead of keypress. KeyNav automatically does this for IE
 * since IE does not propagate special keys on keypress, but setting this to true will force
 * other browsers to also handle keydown instead of keypress.
 */

/**
 * @cfg {Ext.Component/Ext.dom.Element/HTMLElement/String} target
 * The object on which to listen for the event specified by the {@link #eventName} config option.
 */

/**
 * @cfg {String} [eventName="keypress"]
 * The event to listen for to pick up key events.
 */

/**
 * @cfg {Function} processEvent
 * An optional event processor function which accepts the argument list provided by the
 * {@link #eventName configured event} of the {@link #target}, and returns a keyEvent
 * for processing by the KeyMap.
 *
 * This may be useful when the {@link #target} is a Component with s complex event signature.
 * Extra information from the event arguments may be injected into the event for use
 * by the handler functions before returning it.
 */

/**
 * @cfg {Object} [processEventScope=this]
 * The scope (`this` context) in which the {@link #processEvent} method is executed.
 */

/**
 * @cfg {Boolean} [ignoreInputFields=false]
 * Configure this as `true` if there are any input fields within the {@link #target}, and this
 * KeyNav should not process events from input fields (`<input>`, `<textarea>` and elements
 * with `contentEditable="true"`)
 */

/**
 * @cfg {Ext.util.KeyMap} [keyMap]
 * An optional pre-existing {@link Ext.util.KeyMap KeyMap} to use to listen for key events.
 * If not specified, one is created.
 */

/**
 * @property {Ext.event.Event} lastKeyEvent
 * The last key event that this KeyMap handled.
 */

/**
 * @cfg {Number} [priority]
 * The priority to set on this KeyNav's listener. Listeners with a higher priority are fired
 * before those with lower priority.
 */

/**
 * @method destroy
 * Destroy this KeyNav.
 * @param {Boolean} removeEl Pass `true` to remove the element associated with this KeyNav.
 */

/**
 * @method enable
 * Enables this KeyNav.
 */

/**
 * @method disable
 * Disables this KeyNav.
 */

/**
 * @method setDisabled
 * Convenience function for setting disabled/enabled by boolean.
 * @param {Boolean} disabled
 */
