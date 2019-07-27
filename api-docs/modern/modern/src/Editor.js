/**
 * @class Ext.Editor
 * @extend Ext.Container
 * @xtype editor
 *
 * The Editor class is used to provide inline editing for elements on the page. The editor
 * is backed by a {@link Ext.form.field.Field} that will be displayed to edit the underlying content.
 * The editor is a floating Component, when the editor is shown it is automatically aligned to
 * display over the top of the bound element it is editing. The Editor contains several options
 * for how to handle key presses:
 *
 * - {@link #completeOnEnter}
 * - {@link #cancelOnEsc}
 * - {@link #swallowKeys}
 *
 * It also has options for how to use the value once the editor has been activated:
 *
 * - {@link #revertInvalid}
 * - {@link #ignoreNoChange}
 * - {@link #updateEl}
 */

/**
 * @cfg {Object} field
 * Config object for a {@link Ext.field.Field}
 * @accessor
 */

/**
 * @cfg {Boolean} [allowBlur=true]
 * True to {@link #completeEdit complete the editing process} if in edit mode when focus exits from this Editor's hierarchy.
 */

/**
 * @cfg {Boolean} [revertInvalid=true]
 * True to automatically revert the field value and cancel the edit when the user completes an edit and the field
 * validation fails
 */

/**
 * @cfg {Boolean} [ignoreNoChange=false]
 * True to skip the edit completion process (no save, no events fired) if the user completes an edit and
 * the value has not changed.  Applies only to string values - edits for other data types
 * will never be ignored.
 */

/**
 * @cfg {Boolean} [hideEl=true]
 * False to keep the bound element visible while the editor is displayed
 */

/**
 * @cfg {Object} [value='']
 * The data value of the underlying field
 */

/**
 * @cfg {String} [alignment=c-c?]
 * The position to align to (see {@link Ext.util.Positionable#alignTo} for more details).
 */

/**
 * @cfg {Number[]} [offset=[0,0]]
 * The offset to use when aligning (see {@link Ext.util.Positionable#alignTo} for more details.
 */

/**
 * @cfg {Boolean/String} [shadow='frame']
 * "sides" for sides/bottom only, "frame" for 4-way shadow, and "drop" for bottom-right shadow.
 */

/**
 * @cfg {Boolean} [constrain=false]
 * True to constrain the editor to the viewport
 */

/**
 * @cfg {Boolean} [swallowKeys=true]
 * Handle the keydown/keypress events so they don't propagate
 */

/**
 * @cfg {Boolean} [completeOnEnter=true]
 * True to complete the edit when the enter key is pressed.
 */

/**
 * @cfg {Boolean} [cancelOnEsc=true]
 * True to cancel the edit when the escape key is pressed.
 */

/**
 * @cfg {Boolean} [cancelOnClear=false]
 * True to cancel edit when the clear icon of a field is pressed
 */

/**
 * @cfg {Boolean} [updateEl=false]
 * True to update the innerHTML of the bound element when the update completes
 */

/**
 * @cfg {String/HTMLElement/Ext.dom.Element} [parentEl=document.body]
 * An element to render to.
 */

/**
 * @event beforestartedit
 * Fires when editing is initiated, but before the value changes.  Editing can be canceled by returning
 * false from the handler of this event.
 * @param {Ext.Editor} this
 * @param {Ext.dom.Element} boundEl The underlying element bound to this editor
 * @param {Object} value The field value being set
 */

/**
 * @event startedit
 * Fires when this editor is displayed
 * @param {Ext.Editor} this
 * @param {Ext.dom.Element} boundEl The underlying element bound to this editor
 * @param {Object} value The starting field value
 */

/**
 * @event beforecomplete
 * Fires after a change has been made to the field, but before the change is reflected in the underlying
 * field.  Saving the change to the field can be canceled by returning false from the handler of this event.
 * Note that if the value has not changed and ignoreNoChange = true, the editing will still end but this
 * event will not fire since no edit actually occurred.
 * @param {Ext.Editor} this
 * @param {Object} value The current field value
 * @param {Object} startValue The original field value
 */

/**
 * @event complete
 * Fires after editing is complete and any changed value has been written to the underlying field.
 * @param {Ext.Editor} this
 * @param {Object} value The current field value
 * @param {Object} startValue The original field value
 */

/**
 * @event canceledit
 * Fires after editing has been canceled and the editor's value has been reset.
 * @param {Ext.Editor} this
 * @param {Object} value The user-entered field value that was discarded
 * @param {Object} startValue The original field value that was set back into the editor after cancel
 */

/**
 * @event specialkey
 * Fires when any key related to navigation (arrows, tab, enter, esc, etc.) is pressed.  You can check
 * {@link Ext.event.Event#getKey} to determine which key was pressed.
 * @param {Ext.Editor} this
 * @param {Ext.form.field.Field} field The field attached to this editor
 * @param {Ext.event.Event} event The event object
 */

/**
 * @cfg {Boolean} [matchFont=false]
 * Determines if the editor input should match the font style of the target element
 */

/**
 * @method getValue
 * Gets the data value of the editor
 * @return {Object} The data value
 */

/**
 * @method setValue
 * Sets the data value of the editor
 * @param {Object} value Any valid value supported by the underlying field
 */

/**
 * @method getLocation
 * @protected
 * @returns {Ext.grid.Location} The location where editing is active *if* editing is
 * active, else `null`.
 */
