/**
 * @class Ext.Container
 * @extend Ext.Component
 * @xtype container
 *
 * A Container has all of the abilities of {@link Ext.Component Component}, but lets you nest other Components inside
 * it. Applications are made up of lots of components, usually nested inside one another. Containers allow you to
 * render and arrange child Components inside them.
 *
 * Most apps have a single top-level Container called a Viewport,
 * which takes up the entire screen. Inside of this are child components, for example in a mail app the Viewport
 * Container's two children might be a message List and an email preview pane.
 *
 * Containers give the following extra functionality:
 *
 * - Adding child Components at instantiation and run time
 * - Removing child Components
 * - Specifying a Layout
 *
 * Layouts determine how the child Components should be laid out on the screen. In our mail app example we'd use an
 * HBox layout so that we can pin the email list to the left hand edge of the screen and allow the preview pane to
 * occupy the rest. There are several layouts, each of which help you achieve your desired
 * application structure.
 */

/**
 * @cfg {Boolean} [autoSize=true]
 * May be set to `false` for improved layout performance if auto-sizing is not required.
 *
 * Some versions of Safari, both desktop and mobile, have very slow performance
 * if the application has deeply nested containers due to the following WebKit
 * bug: https://bugs.webkit.org/show_bug.cgi?id=150445
 *
 * Applications that experience performance issues in the affected versions of
 * Safari may need to turn off autoSizing globally for all `Ext.Container` instances
 * by placing the following override in the application's "overrides" directory:
 *
 *     Ext.define('MyApp.overrides.Container', {
 *         override: 'Ext.Container',
 *         config: {
 *             autoSize: false
 *         }
 *     });
 *
 * Once auto-sizing support has turned off by default, it can be selectively
 * turned back on only on those container instances that explicitly need auto-sizing
 * behavior by setting `autoSize` to `true`.
 *
 * This option can also be used to allow children to be sized in percentage
 * units as a workaround for the following browser bug:
 * https://bugs.webkit.org/show_bug.cgi?id=137730
 *
 * To illustrate, the following example should render a 200px by 200px green box
 * (the container) with a yellow box inside of it (the child item).  The child
 * item's height and width are both set to `'50%'` so the child should render
 * exactly 100px by 100px in size.
 *
 *     <Container
 *         height={200}
 *         width={200}
 *         style="background: green"
 *     >
 *         <Component
 *             style="background: yellow"
 *             height="50%"
 *             width="50%"
 *         />
 *     </Container>
 *
 * All browsers except for Safari render the previous example correctly, but
 * Safari does not assign a height to the component.  To make percentage-sized
 * children work in Safari, simply set `autoSize` to `false` on the container.
 *
 * Since the underlying implementation works by absolutely positioning the container's
 * body element, this option can only be used when the container is not
 * "shrink wrapping" the content in either direction.  When `autoSize` is
 * set to `false`, shrink wrapped dimension(s) will collapse to 0.
 * @accessor
 */

/**
 * @cfg {Object} [defaults=null]
 * A set of default configurations to apply to all child Components in this Container.
 *
 * It's often useful to specify defaults when creating more than one children with similar configurations. For
 * example here we can specify that each child has a height of 20px and avoid repeating the declaration for each
 * one:
 *
 *     <Container
 *         fullscreen
 *         defaults={{
 *             height: 20
 *         }}
 *     >
 *         <Panel>Panel 1</Panel>
 *         <Panel>Panel 2</Panel>
 *     </Container>
 *
 * @accessor
 */

/**
 * @cfg {String} [buttonAlign=null]
 * The alignment of any buttons added to this panel. Valid values are 'right', 'left' and 'center' (defaults to
 * 'right' for buttons/fbar, 'left' for other toolbar types).
 *
 * **NOTE:** The preferred way to specify toolbars is to use the {@link #items} config specifying the {@link #docked}
 * config on the item. Instead of buttonAlign you would add the layout: { pack: 'start' | 'center' | 'end' }
 * option to the docked item config.
 * @since 6.5.0
 */

/**
 * @cfg {String/String[]} bodyCls
 * The CSS class to add to this container's body element.
 * @since 7.0
 */

/**
 * @cfg {Number} [minButtonWidth=null]
 * Minimum width of all footer toolbar buttons in pixels. If set, this will be used as the default
 * value for the {@link Ext.Button#minWidth} config of each Button added to the **footer toolbar** via the
 * {@link #fbar} or {@link #buttons} configurations. It will be ignored for buttons that have a minWidth configured
 * some other way, e.g. in their own config object or via the {@link Ext.Container#defaults defaults} of
 * their parent container.
 *
 * @since 6.5.0
 */

/**
 * @cfg {Boolean} [autoDestroy=true]
 * If `true`, children will be destroyed as soon as they are {@link #method-remove removed}
 * from this container.
 * @accessor
 */

/** @cfg {String} [defaultType=null]
 * The default {@link Ext.Component xtype} of child Components to create in this Container when a child item
 * is specified as a raw configuration object, rather than as an instantiated Component.
 * @accessor
 */

/**
 * @cfg {String} defaultFocus
 *
 * Specifies a child Component to receive focus when this Container's {@link #method-focus}
 * method is called. Should be a valid {@link Ext.ComponentQuery query} selector.
 */

/**
 * @cfg {Boolean/Object/Ext.Mask/Ext.LoadMask} [masked=null]
 * A configuration to allow you to mask this container.
 *
 * If the value is a boolean, a plain mask will be displayed without a message.
 * 
 *     <Container masked>
 *         Hello World
 *     </Container> 
 * 
 * If the value is a string, it will be used as the message config for an {@link Ext.LoadMask}.
 * 
 *     <Container masked="Please wait...">
 *         Hello World
 *     </Container> 
 *
 * For more precise control over the mask, you add a `<LoadMask/>` as a child of the container.
 * Please refer to the {@link Ext.LoadMask} component to see the props it supports.
 *
 *     <Container>
 *         <LoadMask message="Please wait..."/>
 *     </Container> 
 *
 * There are also two convenient methods, {@link #method-mask} and {@link #unmask}, to allow you to mask and unmask
 * this container at any time.
 *
 * @accessor
 */

/**
 * @cfg {Object/String} [layout=auto]
 * Configuration for this Container's layout. Example:
 *
 *     <Container
 *         layout={{
 *             type: "hbox",
 *             align: "middle"
 *         }}
 *     >
 *         <Panel
 *             html="hello"
 *             flex={1}
 *             bodyStyle={{
 *                 background: "#000",
 *                 color: "#fff"
 *             }}
 *         />
 *         <Panel
 *             html="world"
 *             flex={2}
 *             bodyStyle={{
 *                 background: "#f00",
 *                 color: "#fff"
 *             }}
 *         />
 *     </Container>
 *
 * @accessor
 */

/**
 * @cfg {Object/String/Number} [activeItem=0] The item from the {@link #cfg-items} collection that will be active first. This is
 * usually only meaningful in a {@link Ext.layout.Card card layout}, where only one item can be active at a
 * time. If passes a string, it will be assumed to be a {@link Ext.ComponentQuery} selector.
 * @accessor
 * @evented
 */

/**
 * @cfg {Boolean} [weighted=false]
 * If set to `true`, then child {@link #cfg!items} may be specified as a object,
 * with each property name specifying an {@link #cfg!itemId}, and the property
 * value being the child item configuration object.
 *
 * When using this scheme, each child item may contain a {@link #cfg!weight}
 * configuration value which affects its order in this container. Lower weights
 * are towards the start, higher weights towards the end.
 */

/**
 * @event add
 * Fires whenever item added to the Container.
 * @param {Ext.Container} this The Container instance.
 * @param {Object} item The item added to the Container.
 * @param {Number} index The index of the item within the Container.
 */

/**
 * @event remove
 * Fires whenever item removed from the Container.
 * @param {Ext.Container} this The Container instance.
 * @param {Object} item The item removed from the Container.
 * @param {Number} index The index of the item that was removed.
 */

/**
 * @event move
 * Fires whenever item moved within the Container.
 * @param {Ext.Container} this The Container instance.
 * @param {Object} item The item moved within the Container.
 * @param {Number} toIndex The new index of the item.
 * @param {Number} fromIndex The old index of the item.
 */

/**
 * @event activate
 * Fires whenever item within the Container is activated.
 * @param {Object} newActiveItem The new active item within the container.
 * @param {Ext.Container} this The Container instance.
 * @param {Object} oldActiveItem The old active item within the container.
 */

/**
 * @event deactivate
 * Fires whenever item within the Container is deactivated.
 * @param {Object} oldActiveItem The old active item within the container.
 * @param {Ext.Container} this The Container instance.
 * @param {Object} newActiveItem The new active item within the container.
 */
