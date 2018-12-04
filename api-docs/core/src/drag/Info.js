/**
 * @class Ext.drag.Info
 * This class is used to unify information for a specific drag instance.
 * This object is passed to template methods and events to obtain
 * details about the current operation.
 *
 * It is not expected that this class will be created by user code.
 */

/**
 * @property {Object} cursor
 * Information about the cursor position. Not available when
 * {@link #isNative} is `true`.
 *
 *
 * @property {Object} cursor.current
 * The current cursor position.
 *
 * @property {Number} cursor.current.x
 * The current x position.
 *
 * @property {Number} cursor.current.y
 * The current y position.
 *
 *
 * @property {Object} cursor.delta
 * The change in cursor position.
 *
 * @property {Number} cursor.delta.x
 * The change in x position.
 *
 * @property {Number} cursor.delta.y
 * The change in y position.
 *
 *
 * @property {Object} cursor.initial
 * The intial cursor position.
 *
 * @property {Number} cursor.initial.x
 * The initial x position.
 *
 * @property {Number} cursor.initial.y
 * The initial y position.
 *
 *
 * @property {Object} cursor.offset
 * The offset from the cursor to the top/left of
 * the {@link Ext.drag.Source#element element}.
 *
 * @property {Number} cursor.offset.x
 * The x offset.
 *
 * @property {Number} cursor.offset.y
 * The y offset.
 */

/**
 * @property {Object} element
 * Information about the {@link Ext.drag.Source#element} position.
 * Not available when {@link #isNative} is `true`.
 *
 *
 * @property {Object} element.current
 * The current element position.
 *
 * @property {Number} element.current.x
 * The current x position.
 *
 * @property {Number} element.current.y
 * The current y position.
 *
 *
 * @property {Object} element.delta
 * The change in element position.
 *
 * @property {Number} element.delta.x
 * The change in x position.
 *
 * @property {Number} element.delta.y
 * The change in y position.
 *
 *
 * @property {Object} element.initial
 * The intial element position.
 *
 * @property {Number} element.initial.x
 * The initial x position.
 *
 * @property {Number} element.initial.y
 * The initial y position.
 */

/**
 * @property {HTMLElement} eventTarget
 * The event target that the drag started on.
 *
 * Not available when {@link #isNative} is `true`.
 */

/**
 * @property {FileList} files
 * A list of files included for this drag. See:
 * https://developer.mozilla.org/en/docs/Web/API/FileList
 *
 * Only available when {@link #isNative} is `true`.
 */

/**
 * @property {Boolean} [isNative=false]
 * `true` if the drag is a native drag event, for example
 * a file draggedi nto the browser.
 */

/**
 * @property {Object} proxy
 * Information about the {@link Ext.drag.Source#proxy} position.
 * This may be the actual {@link Ext.drag.Source#element}.
 * Not available when {@link #isNative} is `true`.
 *
 *
 * @property {Object} proxy.current
 * The current proxy position.
 *
 * @property {Number} proxy.current.x
 * The current x position.
 *
 * @property {Number} proxy.current.y
 * The current y position.
 *
 *
 * @property {Object} proxy.delta
 * The change in proxy position.
 *
 * @property {Number} proxy.delta.x
 * The change in x position.
 *
 * @property {Number} proxy.delta.y
 * The change in y position.
 *
 *
 * @property {Object} proxy.initial
 * The intial proxy position.
 *
 * @property {Number} proxy.initial.x
 * The initial x position.
 *
 * @property {Number} proxy.initial.y
 * The initial y position.
 *
 * @property {Ext.dom.Element} proxy.element
 * The proxy element.
 *
 * @property {Boolean} proxy.isElement
 * `true` if the proxy is the {@link Ext.drag.Source#element}.
 *
 * @property {Boolean} proxy.isUnderCursor
 * `true` if the alignment causes the proxy to be under the cursor.
 */

/**
 * @property {Ext.drag.Source} source
 * The drag source. Not available when {@link #isNative} is `true`.
 */

/**
 * @property {Ext.drag.Target} target
 * The active target. `null` if not over a target.
 */

/**
 * @property {String[]} types
 * The data types this drag provides. Added via {@link #setData}.
 */

/**
 * @property {Boolean} [valid=false]
 * `true` if the {@link #target} is valid. See {@link Ext.drag.Target} for
 * information about validity. `false` if there is no target.
 */

/**
 * @method clearData
 * Clear the data for a particular type.
 * @param {String} type The type.
 */

/**
 * @method clone
 * Create a copy of this object with the current state.
 * @return {Ext.drag.Info} A copy of this object.
 */

/**
 * @method getData
 * Get data for this drag. This method may only be called once the drop completes.
 *
 * @param {String} type The type of data to retrieve. Must be in the {@link #types}.
 * See also {@link #setData}.
 *
 * @return {Ext.Promise} The data. If the produced data is not a {@link Ext.Promise},
 * it will be wrapped in one.
 */

/**
 * @method setData
 * Set data for this drag. Multiple types may be registered. Each type will be
 * added to {@link #types}.
 *
 * @param {String} type The type of data being registered.
 * @param {Object/Function} value The value being registered. If a function
 * is provided it will be evaluated if requested when the drop completes. The
 * function should return a value or a {@link Ext.Promise} that will produce a value.
 */
