/**
 * @class Ext.Widget
 * @override Ext.Widget
 * @mixin Ext.mixin.Traversable
 */

/**
 * @property {Number} [floatInset=8]
 * @static
 * The inset from document edges within which floated components are constrained for readability so that
 * they do not merge into the document edge.
 * The default value is 8.
 */

/**
 * @cfg {Number/String/Object} flex
 * The flex of this item *if* this item item is inside a {@link Ext.layout.HBox} or {@link Ext.layout.VBox}
 * layout.
 *
 * You can also update the flex of a component dynamically using the {@link Ext.layout.FlexBox#setItemFlex}
 * method.
 *
 * When supplied as a string or number this option supports the same syntax
 * as CSS {@link https://developer.mozilla.org/en-US/docs/Web/CSS/flex flex}.
 * For example:
 *
 *     flex: '1 2 auto'
 *
 * sets `flex-grow` property to `0`, `flex-shrink` to `2` and `flex-basis` to
 * `'auto'`.
 *
 * The default `flex-shrink` value for box layout items is set to `0` in the
 * stylesheet, which is different from the browser's default `flex-shrink` value
 * of `1`.  This accommodates the majority use case for applications since where
 * non-flexed components are typically not expected to shrink smaller than their
 * default size.
 *
 * For convenience when only a single number is supplied it is used as the value
 * for both `flex-grow` and `flex-shrink`, for example `flex: 3` is the same as
 * `flex: '3 3'`
 *
 * An object form with camel-cased names is also accepted:
 *
 *     flex: {
 *         grow: 1,
 *         shrink: 2,
 *         basis: 'auto'
 *     }
 *
 * When the object form is supplied `shrink` always defaults to `0` regardless
 * of the value of `grow`.
 *
 * Although `'auto'` is the default value for flex-basis, flex-basis defaults to 0%
 * when flex is supplied as a single numeric or string value (e.g. `flex: 1`). If
 * this behavior is not desired either explicitly set flex-basis to `'auto'` or use
 * the object form to set only grow and/or shrink:
 *
 *     flex: {
 *         grow: 2
 *     }
 *
 * @accessor
 */

/**
 * @cfg {String} id
 * The **unique id of this component instance.**
 *
 * It should not be necessary to use this configuration except for singleton objects in your application. Components
 * created with an id may be accessed globally using {@link Ext#getCmp Ext.getCmp}.
 *
 * Instead of using assigned ids, use the {@link #itemId} config, and {@link Ext.ComponentQuery ComponentQuery}
 * which provides selector-based searching for Sencha Components analogous to DOM querying. The
 * {@link Ext.Container} class contains {@link Ext.Container#down shortcut methods} to query
 * its descendant Components by selector.
 *
 * Note that this id will also be used as the element id for the containing HTML element that is rendered to the
 * page for this component. This allows you to write id-based CSS rules to style the specific instance of this
 * component uniquely, and also to select sub-elements using this component's id as the parent.
 *
 * **Note**: to avoid complications imposed by a unique id also see `{@link #itemId}`.
 *
 * Defaults to an auto-assigned id.
 *
 * @accessor
 */

/**
 * @cfg {String} itemId
 * An itemId can be used as an alternative way to get a reference to a component when no object reference is
 * available. Instead of using an `{@link #id}` with {@link Ext#getCmp}, use `itemId` with
 * {@link Ext.Container#getComponent} which will retrieve `itemId`'s or {@link #id}'s. Since `itemId`'s are an
 * index to the container's internal MixedCollection, the `itemId` is scoped locally to the container - avoiding
 * potential conflicts with {@link Ext.ComponentManager} which requires a **unique** `{@link #id}`.
 *
 * Also see {@link #id}, {@link Ext.Container#query}, {@link Ext.Container#down} and {@link Ext.Container#child}.
 *
 * @accessor
 */

/**
 * @cfg {Boolean} [floated=null]
 * A Component may be floated above all other components in the application. This means that the component is absolutely
 * positioned, and will move to the front and occlude other sibling floated component if clicked.
 *
 * A Floated component may have floated descendants. It will bring these decendants to the front with it when brought
 * to the front of its sibling floated components.
 *
 * By default, descendant floated components are all positioned using the viewport coordinate system. To make a floating
 * component a positioning parent for descendants, and have the ancestors positioned relatively, configure the parent
 * floated component with `{@link #cfg-relative}: true`.
 *
 * @since 6.2.0
 * @accessor
 */

/**
 * @cfg {Boolean} [relative=null]
 * *Only valid when a component is `{@link #cfg-floated}`*
 *
 * Configure this as `true` if you require descendant floated components to be positioned  relative to this
 * component's coordinate space, not the viewport's coordinate space.
 *
 * *Note:* The coordinate space is this Component's encapsulating element's area. Not that of the inner
 * element in which static child items are rendered by the layout.
 *
 * @since 6.2.0
 * @accessor
 */

/**
 * @cfg {Number} [x=0]
 * *Only valid when a component is `{@link #cfg-floated}`*
 *
 * The x position at which to position this component. This is usually viewport-relative. But if there is a
 * `{@link #relative}: true` ancestor, it will be relative to that.
 * @accessor
 */

/**
 * @cfg {Number} [y=0]
 * *Only valid when a component is `{@link #cfg-floated}`*
 *
 * The x position at which to position this component. This is usually viewport-relative. But if there is a
 * `{@link #relative}: true` ancestor, it will be relative to that.
 * @accessor
 */

/**
 * @cfg {Boolean} [shadow=null]
 * Configure as `true` for the component to have a drop shadow. 'false' will suppress any default shadow.
 * By default the theme will determine the presence of a shadow.
 *
 * @since 6.2.0
 * @accessor
 */

/**
 * @cfg {Boolean} [shim=null]
 * *Only valid when a component is `{@link #cfg-floated}`*
 *
 * Configure as `true` for the component to use an `<iframe>` as an underlay to ensure certain non-standard
 * browser plugins are occluded by this component.
 *
 * @since 6.2.0
 * @accessor
 */

/**
 * @cfg {Boolean/Number} [alwaysOnTop=null]
 * A flag indicating that this component should be above its floated siblings.
 *
 * This may be a positive number to prioritize the ordering of multiple visible always on top components.
 *
 * This may be set to a *negative* number to prioritize a component to the *bottom* of the z-index stack.
 *
 * @since 6.2.0
 * @accessor
 */

/**
 * @cfg {Boolean} [toFrontOnShow=true]
 * True to automatically call {@link #toFront} when a {@link #cfg-floated} Component is shown.
 * @accessor
 */

/**
 * @cfg {Ext.dom.Element/Ext.util.Region} [constrainTo=null]
 * The element into which floated or positioned items constrain their position.
 *
 * Defaults to the parent container for {@link #isPositioned positioned} components,
 * and to the viewport for {@link #floated} components.
 * @accessor
 */

/**
 * @event beforetofront
 * Fires before a {@link #cfg-floated} component is brought to the front of the visual stack.
 * @param {Ext.Component} this The component instance
 */

/**
 * @event tofront
 * Fires when a {@link #cfg-floated} component has been brought to the front of the visual stack.
 * @param {Ext.Component} this The component instance
 */
