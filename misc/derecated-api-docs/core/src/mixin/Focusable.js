/**
 * @class Ext.mixin.Focusable
 * @extend Ext.Base
 * This mixin implements focus management functionality in Widgets and Components
 */

/**
 * @cfg {String} [focusCls='x-focused']
 * CSS class that will be added to focused
 * component's {@link #focusClsEl}, and removed when component blurs.
 */

/**
 * @property {Ext.dom.Element} [focusEl='el']
 * The element that will be focused
 * when {@link #focus} method is called on this component. Usually this is
 * the same element that receives focus via mouse clicks, taps, and pressing
 * Tab key.
 */

/**
 * @property {Ext.dom.Element} focusClsEl
 * The element that will have the {@link #focusCls} applied when component's
 * {@link #focusEl} is focused.
 */

/**
 * @event focus
 * Fires when this Component's {@link #focusEl} receives focus.
 * @param {Ext.Component/Ext.Widget} this
 * @param {Ext.event.Event} event The focus event.
 */

/**
 * @event blur
 * Fires when this Component's {@link #focusEl} loses focus.
 * @param {Ext.Component} this
 * @param {Ext.event.Event} event The blur event.
 */

/**
 * @event focusenter
 * Fires when focus enters this Component's hierarchy.
 * @param {Ext.Component} this
 * @param {Ext.event.Event} event The focusenter event.
 */

/**
 * @event focusleave
 * Fires when focus leaves this Component's hierarchy.
 * @param {Ext.Component} this
 * @param {Ext.event.Event} event The focusleave event.
 */

/**
 * @method isFocusable
 * Determine if this Focusable can receive focus at this time.
 *
 * Note that Containers can be non-focusable themselves while delegating
 * focus treatment to a child Component; see {@link Ext.Container #defaultFocus}
 * for more information.
 *
 * @param {Boolean} [deep=false] Optionally determine if the container itself
 * is focusable, or if container's focus is delegated to a child component
 * and that child is focusable.
 *
 * @return {Boolean} True if component is focusable, false if not.
 */

/**
 * @method focus
 * Try to focus this component.
 *
 * If this component is disabled or otherwise not focusable, a close relation
 * will be targeted for focus instead to keep focus localized for keyboard users.
 *
 * @param {Boolean/Number[]} [selectText] If applicable, `true` to also select all the text
 * in this component, or an array consisting of start and end (defaults to start)
 * position of selection.
 *
 * @return {Boolean} `true` if focus target was found and focusing was attempted,
 * `false` if no focusing attempt was made.
 */

/**
 * @method getTabIndex
 * Return the actual tabIndex for this Focusable.
 *
 * @return {Number} tabIndex attribute value
 */

/**
 * @method setTabIndex
 * Set the tabIndex property for this Focusable. If the focusEl
 * is available, set tabIndex attribute on it, too.
 *
 * @param {Number} newTabIndex new tabIndex to set
 */
