/**
 * @class Ext.Widget
 * @extend Ext.Evented
 * @xtype widget
 * @mixins Ext.mixin.Inheritable
 * @mixins Ext.mixin.Bindable
 * @mixins Ext.mixin.ComponentDelegation
 * @mixins Ext.mixin.Pluggable
 * @mixins Ext.mixin.Keyboard
 * @mixins Ext.mixin.Factoryable
 * @mixins Ext.mixin.Focusable
 * @mixins Ext.mixin.Accessible
 * @mixins Ext.mixin.Traversable
 *
 * Ext.Widget is a light-weight Component that consists of nothing more than a template
 * Element that can be cloned to quickly and efficiently replicate many instances.
 * Ext.Widget is typically not instantiated directly, because the default template is
 * just a single element with no listeners. Instead Ext.Widget should be extended to
 * create Widgets that have a useful markup structure and event listeners.
 *
/**
 * @cfg {String/String[]} [cls=null]
 * The CSS class to add to this widget's element, in
 * addition to the {@link #baseCls}. In many cases, this property will be specified
 * by the derived widget class. See {@link #userCls} for adding additional CSS
 * classes to widget instances (such as items in a {@link Ext.Container}).
 * @accessor
 */

/**
 * @cfg {Number/String} margin
 * The margin to use on this Component. Can be specified as a number (in which
 * case all edges get the same margin) or a CSS string like '5 10 10 10'
 */

/**
 * @cfg {String/Object} [style=null]
 * Additional CSS styles that will be rendered into an inline style attribute when
 * the widget is rendered.
 *
 * You can pass either a string syntax:
 *
 *     style: 'background:red'
 *
 * Or by using an object:
 *
 *     style: {
 *         background: 'red'
 *     }
 *
 * When using the object syntax, you can define CSS Properties by using a string:
 *
 *     style: {
 *         'border-left': '1px solid red'
 *     }
 *
 * Although the object syntax is much easier to read, we suggest you to use the
 * string syntax for better performance.
 * @accessor set
 */

/**
 * @cfg {Boolean} [border=null]
 *
 * Enables or disables bordering on this component.
 * The following values are accepted:
 *
 * - `null` or `true (default): Do nothing and allow the border to be specified by the theme.
 * - `false`: suppress the default border provided by the theme.
 *
 * Please note that enabling bordering via this config will not add a `border-color`
 * or `border-style` CSS property to the component; you provide the `border-color`
 * and `border-style` via CSS rule or {@link #style} configuration
 * (if not already provide by the theme).
 *
 * @accessor
 */

/**
 * @cfg {Object} [touchAction=null]
 *
 * Emulates the behavior of the CSS [touch-action](https://www.w3.org/TR/pointerevents/#the-touch-action-css-property)
 * property in a cross-browser compatible manner.
 *
 * Keys in this object are touch action names, and values are `false` to disable
 * a touch action or `true` to enable it.  Accepted keys are:
 *
 * - `panX`
 * - `panY`
 * - `pinchZoom`
 * - `doubleTapZoom`
 *
 * All touch actions are enabled (`true`) by default, so it is usually only necessary
 * to specify which touch actions to disable.  For example, the following disables
 * only horizontal scrolling and pinch-to-zoom on the component's main element:
 *
 *     touchAction: {
 *         panX: false,
 *         pinchZoom: false
 *     }
 *
 * Touch actions can be specified on reference elements using the reference element
 * name, for example:
 *
 *     // disables horizontal scrolling on the main element, and double-tap-zoom
 *     // on the child element named "body"
 *     touchAction: {
 *         panY: false
 *         body: {
 *             doubleTapZoom: false
 *         }
 *     }
 *
 * The primary motivation for setting the touch-action of an element is to prevent
 * the browser's default handling of a gesture such as pinch-to-zoom, or
 * drag-to-scroll, so that the application can implement its own handling of that
 * gesture on the element.  Suppose, for example, a component has a custom drag
 * handler on its element and wishes to prevent horizontal scrolling of its container
 * while it is being dragged:
 *
 */

/**
 * @cfg {String} [name=null]
 * Name for the widget to be used with {@link Ext.Container#lookupName} et al.
 */

/**
 * @cfg {Ext.Element} [renderTo=null]
 * Optional element to render this Component to.
 * Not required if this component is an {@link Ext.Container#items item} of a Container of a Container.
 */

/**
 * @cfg {String/String[]} [ui=null]
 * The ui or uis to be used on this Component
 *
 * When a ui is configured, CSS class names are added to the {@link #element}, created
 * by appending the ui name(s) to each {@link #classCls} and/or {@link #baseCls}.
 */

/**
 * @cfg {String/String[]} [userCls=null]
 * One or more CSS classes to add to the component's primary element. This config
 * is intended solely for use by the component instantiator (the "user"), not by
 * derived classes.
 *
 */

/**
 * @cfg {Number/String} [width=null]
 * The width of this Component; must be a valid CSS length value, e.g: `300`, `100px`, `30%`, etc.
 * By default, if this is not explicitly set, this Component's element will simply have its own natural size.
 * If set to `auto`, it will set the width to `null` meaning it will have its own natural size.
 * @accessor
 * @evented
 */

/**
 * @cfg {Number/String} [height=null]
 * The height of this Component; must be a valid CSS length value, e.g: `300`, `100px`, `30%`, etc.
 * By default, if this is not explicitly set, this Component's element will simply have its own natural size.
 * If set to `auto`, it will set the width to `null` meaning it will have its own natural size.
 * @accessor
 * @evented
 */

/**
 * @cfg {Boolean} [hidden=null]
 * Whether or not this Component is hidden (its CSS `display` property is set to `none`).
 *
 * Defaults to `true` for {@link #floated} Components.
 * @accessor
 * @evented
 */

/**
 * @cfg {Boolean} [disabled=null]
 * Whether or not this component is disabled
 * @accessor
 * @evented
 */

/**
 * @method up
 * Walks up the ownership hierarchy looking for an ancestor Component which matches
 * the passed simple selector.
 *
 * Example:
 *
 *     var owningTabPanel = grid.up('tabpanel');
 *
 * @param {String} selector (optional) The simple selector to test.
 * @param {String/Number/Ext.Component} [limit] This may be a selector upon which to stop the upward scan, or a limit of the number of steps, or Component reference to stop on.
 * @return {Ext.Container} The matching ancestor Container (or `undefined` if no match was found).
 */
