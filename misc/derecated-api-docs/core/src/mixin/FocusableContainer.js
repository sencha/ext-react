/**
 * @class Ext.mixin.FocusableContainer
 * @extend Ext.Mixin
 *
 * A mixin for groups of Focusable things (Components, Widgets, etc) that
 * should respond to arrow keys to navigate among the peers, but keep only
 * one of the peers tabbable by default (tabIndex=0)
 *
 * Some examples: Toolbars, Tab bars, Panel headers, Menus
 */

/**
 * @cfg {Boolean} [focusableContainer=false]
 * Enable or disable navigation
 * with arrow keys for this FocusableContainer. This option may be useful
 * with nested FocusableContainers, when only the root container should
 * handle keyboard events.
 */

/**
 * @cfg {Boolean} [resetFocusPosition=false]
 * When `true`, FocusableContainer
 * will reset last focused position whenever focus leaves the container.
 * Subsequent tabbing into the container will always focus the first eligible
 * child item.
 *
 * When `false`, subsequent tabbing into the container will focus the child
 * item that was last focused before.
 */

/**
 * @cfg {Number} [activeChildTabIndex=0]
 * DOM tabIndex attribute to set on the
 * active Focusable child of this container when using the "Roaming tabindex"
 * technique.
 */

/**
 * @cfg {Number} [inactiveChildTabIndex=-1]
 * DOM tabIndex attribute to set on
 * inactive Focusable children of this container when using the "Roaming tabindex"
 * technique. This value rarely needs to be changed from its default.
 */

/**
 * @cfg {Boolean} [allowFocusingDisabledChildren=false]
 * Set this to `true`
 * to enable focusing disabled child items via keyboard.
 */

/**
 * @property {String/Ext.dom.Element} [focusableContainerEl="el"]
 * The name of the element
 * that FocusableContainer should bind its keyboard handler to. Similar to {@link #ariaEl},
 * this name is resolved to the {@link Ext.dom.Element} instance after rendering.
 */
