/**
 * @class Ext.Component
 * @extend Ext.Widget
 * @mixins Ext.mixin.Keyboard
 *
 * Most of the visual classes you interact with are Components. Every Component is a
 * subclass of Ext.Component, which means they can all:
 *
 * * Render themselves onto the page using a template
 * * Show and hide themselves at any time
 * * Center themselves within their parent container
 * * Enable and disable themselves
 *
 * They can also do a few more advanced things:
 *
 * * Float above other components (windows, message boxes and overlays)
 * * Change size and position on the screen with animation
 * * Dock other Components inside themselves (useful for toolbars)
 * * Align to other components, allow themselves to be dragged around, make their content scrollable & more
 *
 * ## Available Components
 *
 * There are many components.  They are separated into 4 main groups:
 *
 * ### Navigation components
 * * {@link Ext.Toolbar}
 * * {@link Ext.Button}
 * * {@link Ext.TitleBar}
 * * {@link Ext.SegmentedButton}
 * * {@link Ext.Title}
 * * {@link Ext.Spacer}
 *
 * ### Store-bound components
 * * {@link Ext.dataview.DataView}
 * * {@link Ext.Carousel}
 * * {@link Ext.List}
 * * {@link Ext.NestedList}
 *
 * ### Form components
 * * {@link Ext.form.Panel}
 * * {@link Ext.form.FieldSet}
 * * {@link Ext.field.Checkbox}
 * * {@link Ext.field.Hidden}
 * * {@link Ext.field.Slider}
 * * {@link Ext.field.Text}
 * * {@link Ext.picker.Picker}
 * * {@link Ext.picker.Date}
 *
 * ### General components
 * * {@link Ext.Panel}
 * * {@link Ext.tab.Panel}
 * * {@link Ext.Img}
 * * {@link Ext.Audio}
 * * {@link Ext.Video}
 * * {@link Ext.Sheet}
 * * {@link Ext.ActionSheet}
 * * {@link Ext.MessageBox}
 *
 * ## Instantiating Components
 *
 * Components are created as you would expect in a JSX syntax. Here's how we can
 * create a Text field:
 *
 *     <Panel>
 *     	   This is my panel
 *     </Panel>
 *
 * This will create a {@link Ext.Panel Panel} instance, configured with some basic HTML content. A Panel is just a
 * simple Component that can render HTML and also contain other items.
 *
 * Panels are also Containers, which means they can contain other Components, arranged by a layout.
 *
 * ## Configuring Components
 *
 * Whenever you create a new Component you can pass in configuration options. All of the configurations for a given
 * Component are listed in the "Config options" section of its class docs page. You can pass in any number of
 * configuration options when you instantiate the Component, and modify any of them at any point later. For example, we
 * can easily modify the {@link Ext.Panel#html html content} of a Panel after creating it:
 *
 * Every config has a getter method and a setter method - these are automatically generated and always follow the same
 * pattern. For example, a config called `html` will receive `getHtml` and `setHtml` methods, a config called `defaultType`
 * will receive `getDefaultType` and `setDefaultType` methods, and so on.
 */

/**
 * @cfg {String} [xtype="component"]
 * The `xtype` configuration option can be used to optimize Component creation and rendering. It serves as a
 * shortcut to the full component name. For example, the component `Ext.button.Button` has an xtype of `button`.
 *
 * You can define your own xtype on a custom {@link Ext.Component component} by specifying the
 * {@link Ext.Class#alias alias} config option with a prefix of `widget`. For example:
 *
 *     Ext.define('PressMeButton', {
 *         extend: 'Ext.button.Button',
 *         alias: 'widget.pressmebutton',
 *         text: 'Press Me'
 *     });
 *
 * Any Component can be created implicitly as an object config with an xtype specified, allowing it to be
 * declared and passed into the rendering pipeline without actually being instantiated as an object. Not only is
 * rendering deferred, but the actual creation of the object itself is also deferred, saving memory and resources
 * until they are actually needed. In complex, nested layouts containing many Components, this can make a
 * noticeable improvement in performance.
 */

/**
 * @cfg {Number/String} [padding=null]
 * The padding to use on this Component. Can be specified as a number (in which
 * case all edges get the same padding) or a CSS string like '5 10 10 10'
 * @accessor
 */

/**
 * @cfg {Number} [tabIndex=null]
 * DOM tabIndex attribute for this component's {@link #focusEl}.
 */

/**
 * @cfg {Number/String} [left=null]
 * The absolute left position of this Component; must be a valid CSS length value, e.g: `300`, `100px`, `30%`, etc.
 * Explicitly setting this value will make this Component become 'positioned', which means it will no
 * longer participate in the layout of the Container that it resides in.
 * @accessor
 * @evented
 */

/**
 * @cfg {Number/String} [top=null]
 * The absolute top position of this Component; must be a valid CSS length value, e.g: `300`, `100px`, `30%`, etc.
 * Explicitly setting this value will make this Component become 'positioned', which means it will no
 * longer participate in the layout of the Container that it resides in.
 * @accessor
 * @evented
 */

/**
 * @cfg {Number/String} [right=null]
 * The absolute right position of this Component; must be a valid CSS length value, e.g: `300`, `100px`, `30%`, etc.
 * Explicitly setting this value will make this Component become 'positioned', which means it will no
 * longer participate in the layout of the Container that it resides in.
 * @accessor
 * @evented
 */

/**
 * @cfg {Number/String} [bottom=null]
 * The absolute bottom position of this Component; must be a valid CSS length value, e.g: `300`, `100px`, `30%`, etc.
 * Explicitly setting this value will make this Component become 'positioned', which means it will no
 * longer participate in the layout of the Container that it resides in.
 * @accessor
 * @evented
 */

/**
 * @cfg {Number/String} [minWidth=null]
 * The minimum width of this Component; must be a valid CSS length value, e.g: `300`, `100px`, `30%`, etc.
 * If set to `auto`, it will set the width to `null` meaning it will have its own natural size.
 * @accessor
 * @evented
 */

/**
 * @cfg {Number/String} [minHeight=null]
 * The minimum height of this Component; must be a valid CSS length value, e.g: `300`, `100px`, `30%`, etc.
 * If set to `auto`, it will set the width to `null` meaning it will have its own natural size.
 * @accessor
 * @evented
 */

/**
 * @cfg {Number/String} [maxWidth=null]
 * The maximum width of this Component; must be a valid CSS length value, e.g: `300`, `100px`, `30%`, etc.
 * If set to `auto`, it will set the width to `null` meaning it will have its own natural size.
 * Note that this config will not apply if the Component is 'positioned' (absolutely positioned or centered)
 * @accessor
 * @evented
 */

/**
 * @cfg {Number/String} [maxHeight=null]
 * The maximum height of this Component; must be a valid CSS length value, e.g: `300`, `100px`, `30%`, etc.
 * If set to `auto`, it will set the width to `null` meaning it will have its own natural size.
 * Note that this config will not apply if the Component is 'positioned' (absolutely positioned or centered)
 * @accessor
 * @evented
 */

/**
 * @cfg {Boolean/String/Object} [scrollable=null]
 * Configuration options to make this Component scrollable. Acceptable values are:
 *
 * - `true` to enable auto scrolling.
 * - `false` (or `null`) to disable scrolling - this is the default.
 * - `x` or `horizontal` to enable horizontal scrolling only
 * - `y` or `vertical` to enable vertical scrolling only
 *
 * Also accepts a configuration object for a `{@link Ext.scroll.Scroller}` if
 * if advanced configuration is needed.
 *
 * The getter for this config returns the {@link Ext.scroll.Scroller Scroller}
 * instance.  You can use the Scroller API to read or manipulate the scroll position:
 *
 *     // scrolls the component to 5 on the x axis and 10 on the y axis
 *     component.getScrollable().scrollTo(5, 10);
 *
 * @accessor
 * @evented
 */

/**
 * @cfg {String} [docked=null]
 * The dock position of this component in its container. Can be `left`, `top`, `right` or `bottom`.
 *
 * __Notes__
 *
 * You must use a HTML5 doctype for {@link #docked} `bottom` to work. To do this, simply add the following code to the HTML file:
 *
 *     <!doctype html>
 *
 * So your index.html file should look a little like this:
 *
 *     <!doctype html>
 *     <html>
 *         <head>
 *             <title>MY application title</title>
 *             ...
 *
 * @accessor
 * @evented
 */

/**
 * Force the component to take up 100% width and height available, by adding it
 * to {@link Ext.Viewport}.
 * @cfg {Boolean} fullscreen
 */

/**
 * @cfg {Boolean} [centered=null]
 * Configure this as `true` to have this Component centered within its Container.
 * Setting this value to `true` will make this Component become 'positioned', which means it will no
 * longer participate in the layout of the Container that it resides in.
 * @accessor
 * @evented
 */

/**
 * @cfg {String/Ext.Element/HTMLElement} [html=null]
 * Optional HTML content to render inside this Component, or a reference
 * to an existing element on the page.
 * @accessor
 */

/**
 * @cfg {Object} [draggable=null]
 * Configuration options to make this Component draggable
 * @accessor
 */

/**
 * @cfg {Number} [zIndex=null] The z-index to give this Component when it is rendered.
 *
 * Not valid for {@link #cfg-floated} Components. The Z ordering of {@link #cfg-floated}
 * Components is managed by ordering of the DOM elements.
 * @accessor
 */

/**
 * @cfg {Function/String/String[]} [tpl=null]
 *
 * A string, array of strings, or a function that returns JSX.
 *
 *    tpl = data => <div>{data.first_name} {data.last_name}</div>
 *
 * __Note__
 * The {@link #data} configuration _must_ be set for any content to be shown in the component when using this configuration.
 * @accessor
 */

/**
 * @cfg {String/Mixed} [showAnimation=null]
 * Animation effect to apply when the Component is being shown.  Typically you want to use an
 * inbound animation type such as 'fadeIn' or 'slideIn'. For more animations, check the {@link Ext.fx.Animation#type} config.
 * @accessor
 */

/**
 * @cfg {String/Mixed} [hideAnimation=null]
 * Animation effect to apply when the Component is being hidden.  Typically you want to use an
 * outbound animation type such as 'fadeOut' or 'slideOut'. For more animations, check the {@link Ext.fx.Animation#type} config.
 * @accessor
 */

/**
 * @cfg {String} [tplWriteMode='overwrite']
 * The Ext.(X)Template method to use when updating the content area of the Component.
 *
 * Valid modes are:
 *
 * - append
 * - insertAfter
 * - insertBefore
 * - insertFirst
 * - overwrite
 * @accessor
 */

/**
 * @cfg {Object} [data=null]
 * The initial set of data to apply to the `{@link #tpl}` to
 * update the content area of the Component.
 * @accessor
 */

/**
 * @cfg {Ext.Element/HTMLElement/String} [contentEl=null] The configured element will automatically be
 * added as the content of this component. When you pass a string, we expect it to be an element id.
 * If the content element is hidden, we will automatically show it.
 * @accessor
 */

/**
 * @cfg {Ext.data.Model} [record=null]
 * A model instance which updates the Component's html based on it's tpl. Similar to the data
 * configuration, but tied to to a record to make allow dynamic updates.  This must be a model
 * instance and not a configuration of one.
 * @accessor
 */

/**
 * @cfg {Ext.tip.ToolTip} [tooltip=null]
 * The {@link Ext.tip.ToolTip ToolTip} for this component.
 *
 *     <Button text="Basic Tip">
 *         <ToolTip>A simple tooltip</ToolTip>
 *     </Button>
 *
 * @react-child
 */

/**
 * @cfg {Boolean} [axisLock=null]
 * If `true`, then, when {@link #showBy} or {@link #alignTo} fallback on
 * constraint violation only takes place along the major align axis.
 *
 * That is, if alignment `"l-r"` is being used, and `axisLock: true` is used, then if constraints
 * fail, only fallback to `"r-l"` is considered.
 */

/**
 * @cfg {Boolean} [modal=null]
 * `true` to make this Component modal. This will create a mask underneath the Component
 * that covers its parent and does not allow the user to interact with any other Components until this
 * Component is dismissed.
 * @accessor
 */

/**
 * @cfg {Boolean} [hideOnMaskTap=null]
 * When using a {@link #cfg!modal} Component, setting this to `true`
 * will hide the modal mask and the Container when the mask is tapped on.
 * @accessor
 */

/**
 * @cfg {Number} [weight=null]
 * This value controls this item's order in a {@link Ext.Container#cfg!weighted weighted}
 * {@link Ext.Container container} (see {@link #cfg!parent}).
 *
 * Lower values gravitate towards the start of the container - the top in vertical layouts, the
 * locale start side in horizontal layouts.
 */

/**
 * @event beforeshow
 * Fires before the Component is shown. Show may be vetoed by returning `false` from a handler.
 * @param {Ext.Component} this The component instance
 */

/**
 * @event show
 * Fires whenever the Component is shown
 * @param {Ext.Component} this The component instance
 */

/**
 * @event beforehide
 * Fires before the Component is hidden. Hide may be vetoed by returning `false` from a handler.
 * @param {Ext.Component} this The component instance
 */

/**
 * @event hide
 * Fires whenever the Component is hidden
 * @param {Ext.Component} this The component instance
 */

/**
 * @event fullscreen
 * Fires whenever a Component with the fullscreen config is instantiated
 * @param {Ext.Component} this The component instance
 */

/**
 * @event positionedchange
 * Fires whenever there is a change in the positioned status of a component
 * @param {Ext.Component} this The component instance
 * @param {Boolean} positioned The component's new positioned state. This becomes
 * `true` is a component is positioned using the {@link #cfg-top}, {@link #cfg-right},
 * {@link #cfg-bottom} or {@link #cfg-left} configs.
 */

/**
 * @event destroy
 * Fires when the component is destroyed
 */

/**
 * @event initialize
 * Fires when the component has been initialized
 * @param {Ext.Component} this The component instance
 */

/**
 * @event painted
 * @inheritdoc Ext.dom.Element#painted
 * @param {Ext.Element} element The component's outer element (this.element)
 */

/**
 * @event erased
 * Fires when the component is no longer displayed in the DOM.  Listening to this event will
 * degrade performance not recommend for general use.
 * @param {Ext.Component} this The component instance
 */

/**
 * @event resize
 * Fires *asynchronously* after a browser layout caused by a component resize. This may be triggered for any or
 * several of the following reasons:
 *    - Programmatic changes to {@link #cfg-width} or {@link #cfg-height} configs.
 *    - Setting the {@link #cfg-flex} config when the owning layout is {@link Ext.layout.Box}.
 *    - Setting {@link #cfg-minHeight}, {@link #cfg-maxHeight}, {@link #cfg-minWidth} or {@link #cfg-maxWidth}.
 *    - Changing device orientation.
 *    - Changing the browser viewport size.
 *    - Any resize caused by browser layout recalculation which may be caused by content size changes
 *      or application of default browser layout rules.
 * @param {Ext.Component} component This Component.
 * @param {String/Number} width The new width.
 * @param {String/Number} height The new height.
 * @param {String/Number} oldWidth The previous width.
 * @param {String/Number} oldHeight The previous height.
 */

/**
 * @event added
 * Fires after a Component had been added to a Container.
 * @param {Ext.Component} this
 * @param {Ext.Container} container Parent Container
 * @param {Number} index The index of the item within the Container.
 */

/**
 * @event removed
 * Fires when a component is removed from a Container
 * @param {Ext.Component} this
 * @param {Ext.Container} container Container which holds the component
 * @param {Number} index The index of the item that was removed.
 */

/**
 * @event moved
 * Fires when a component si moved within its Container.
 * @param {Ext.Component} this
 * @param {Ext.Container} container Container which holds the component
 * @param {Number} toIndex The new index of the item.
 * @param {Number} fromIndex The old index of the item.
 */
