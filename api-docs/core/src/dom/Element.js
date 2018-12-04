/**
 * @class Ext.dom.Element
 * @extend Ext.Base
 * @alternateClassName Ext.Element
 * @mixins Ext.util.Positionable
 * @mixins Ext.mixin.Observable
 *
 * Encapsulates a DOM element, adding simple DOM manipulation facilities, normalizing for browser differences.
 *
 * **Note:** The events included in this Class are the ones we've found to be the most commonly used. Many events are
 * not listed here due to the expedient rate of change across browsers. For a more comprehensive list, please visit the
 * following resources:
 *
 * + [Mozilla Event Reference Guide](https://developer.mozilla.org/en-US/docs/Web/Events)
 * + [W3 Pointer Events](http://www.w3.org/TR/pointerevents/)
 * + [W3 Touch Events](http://www.w3.org/TR/touch-events/)
 * + [W3 DOM 2 Events](http://www.w3.org/TR/DOM-Level-2-Events/)
 * + [W3 DOM 3 Events](http://www.w3.org/TR/DOM-Level-3-Events/)
 *
 * ## Usage
 *
 *     // by id
 *     var el = Ext.get("my-div");
 *
 *     // by DOM element reference
 *     var el = Ext.get(myDivElement);
 *
 * ## Selecting Descendant Elements
 *
 * Ext.dom.Element instances can be used to select descendant nodes using CSS selectors.
 * There are 3 methods that can be used for this purpose, each with a slightly different
 * twist:
 *
 * - {@link #method-query}
 * - {@link #method-selectNode}
 * - {@link #method-select}
 *
 * These methods can accept any valid CSS selector since they all use
 * [querySelectorAll](http://www.w3.org/TR/css3-selectors/) under the hood. The primary
 * difference between these three methods is their return type:
 *
 * To get an array of HTMLElement instances matching the selector '.foo' use the query
 * method:
 *
 *     element.query('.foo');
 *
 * This can easily be transformed into an array of Ext.dom.Element instances by setting
 * the `asDom` parameter to `false`:
 *
 *     element.query('.foo', false);
 *
 * If the desired result is only the first matching HTMLElement use the selectNode method:
 *
 *     element.selectNode('.foo');
 *
 * Once again, the dom node can be wrapped in an Ext.dom.Element by setting the `asDom`
 * parameter to `false`:
 *
 *     element.selectNode('.foo', false);
 *
 * The `select` method is used when the desired return type is a {@link
 * Ext.CompositeElementLite CompositeElementLite} or a {@link Ext.CompositeElement
 * CompositeElement}.  These are collections of elements that can be operated on as a
 * group using any of the methods of Ext.dom.Element.  The only difference between the two
 * is that CompositeElementLite is a collection of HTMLElement instances, while
 * CompositeElement is a collection of Ext.dom.Element instances.  To retrieve a
 * CompositeElementLite that represents a collection of HTMLElements for selector '.foo':
 *
 *     element.select('.foo');
 *
 * For a {@link Ext.CompositeElement CompositeElement} simply pass `true` as the
 * `composite` parameter:
 *
 *     element.select('.foo', true);
 *
 * The query selection methods can be used even if you don't have a Ext.dom.Element to
 * start with For example to select an array of all HTMLElements in the document that match the
 * selector '.foo', simply wrap the document object in an Ext.dom.Element instance using
 * {@link Ext#fly}:
 *
 *     Ext.fly(document).query('.foo');
 *
 * # Animations
 *
 * When an element is manipulated, by default there is no animation.
 *
 *     var el = Ext.get("my-div");
 *
 *     // no animation
 *     el.setWidth(100);
 *
 * specified as boolean (true) for default animation effects.
 *
 *     // default animation
 *     el.setWidth(100, true);
 *
 * To configure the effects, an object literal with animation options to use as the Element animation configuration
 * object can also be specified. Note that the supported Element animation configuration options are a subset of the
 * {@link Ext.fx.Anim} animation options specific to Fx effects. The supported Element animation configuration options
 * are:
 *
 *     Option    Default   Description
 *     --------- --------  ---------------------------------------------
 *     duration  350       The duration of the animation in milliseconds
 *     easing    easeOut   The easing method
 *     callback  none      A function to execute when the anim completes
 *     scope     this      The scope (this) of the callback function
 *
 * Usage:
 *
 *     // Element animation options object
 *     var opt = {
 *         duration: 1000,
 *         easing: 'elasticIn',
 *         callback: this.foo,
 *         scope: this
 *     };
 *     // animation with some options set
 *     el.setWidth(100, opt);
 *
 * The Element animation object being used for the animation will be set on the options object as "anim", which allows
 * you to stop or manipulate the animation. Here is an example:
 *
 *     // using the "anim" property to get the Anim object
 *     if(opt.anim.isAnimated()){
 *         opt.anim.stop();
 *     }
 */

/**
 * @property {Ext.Component} component
 * A reference to the `Component` that owns this element. This is `null` if there
 * is no direct owner.
 */

//  Mouse events
/**
 * @event click
 * Fires when a mouse click is detected within the element.
 * @param {Ext.event.Event} e The {@link Ext.event.Event} encapsulating the DOM event.
 * @param {HTMLElement} t The target of the event.
 */
/**
 * @event contextmenu
 * Fires when a right click is detected within the element.
 * @param {Ext.event.Event} e The {@link Ext.event.Event} encapsulating the DOM event.
 * @param {HTMLElement} t The target of the event.
 */
/**
 * @event dblclick
 * Fires when a mouse double click is detected within the element.
 * @param {Ext.event.Event} e The {@link Ext.event.Event} encapsulating the DOM event.
 * @param {HTMLElement} t The target of the event.
 */
/**
 * @event mousedown
 * Fires when a mousedown is detected within the element.
 * @param {Ext.event.Event} e The {@link Ext.event.Event} encapsulating the DOM event.
 * @param {HTMLElement} t The target of the event.
 */
/**
 * @event mouseup
 * Fires when a mouseup is detected within the element.
 * @param {Ext.event.Event} e The {@link Ext.event.Event} encapsulating the DOM event.
 * @param {HTMLElement} t The target of the event.
 */
/**
 * @event mouseover
 * Fires when a mouseover is detected within the element.
 * @param {Ext.event.Event} e The {@link Ext.event.Event} encapsulating the DOM event.
 * @param {HTMLElement} t The target of the event.
 */
/**
 * @event mousemove
 * Fires when a mousemove is detected with the element.
 * @param {Ext.event.Event} e The {@link Ext.event.Event} encapsulating the DOM event.
 * @param {HTMLElement} t The target of the event.
 */
/**
 * @event mouseout
 * Fires when a mouseout is detected with the element.
 * @param {Ext.event.Event} e The {@link Ext.event.Event} encapsulating the DOM event.
 * @param {HTMLElement} t The target of the event.
 */
/**
 * @event mouseenter
 * Fires when the mouse enters the element.
 * @param {Ext.event.Event} e The {@link Ext.event.Event} encapsulating the DOM event.
 * @param {HTMLElement} t The target of the event.
 */
/**
 * @event mouseleave
 * Fires when the mouse leaves the element.
 * @param {Ext.event.Event} e The {@link Ext.event.Event} encapsulating the DOM event.
 * @param {HTMLElement} t The target of the event.
 */

//  Keyboard events
/**
 * @event keypress
 * Fires when a keypress is detected within the element.
 * @param {Ext.event.Event} e The {@link Ext.event.Event} encapsulating the DOM event.
 * @param {HTMLElement} t The target of the event.
 */
/**
 * @event keydown
 * Fires when a keydown is detected within the element.
 * @param {Ext.event.Event} e The {@link Ext.event.Event} encapsulating the DOM event.
 * @param {HTMLElement} t The target of the event.
 */
/**
 * @event keyup
 * Fires when a keyup is detected within the element.
 * @param {Ext.event.Event} e The {@link Ext.event.Event} encapsulating the DOM event.
 * @param {HTMLElement} t The target of the event.
 */

//  HTML frame/object events
/**
 * @event load
 * Fires when the user agent finishes loading all content within the element. Only supported by window, frames,
 * objects and images.
 * @param {Ext.event.Event} e The {@link Ext.event.Event} encapsulating the DOM event.
 * @param {HTMLElement} t The target of the event.
 */
/**
 * @event unload
 * Fires when the user agent removes all content from a window or frame. For elements, it fires when the target
 * element or any of its content has been removed.
 * @param {Ext.event.Event} e The {@link Ext.event.Event} encapsulating the DOM event.
 * @param {HTMLElement} t The target of the event.
 */
/**
 * @event abort
 * Fires when an object/image is stopped from loading before completely loaded.
 * @param {Ext.event.Event} e The {@link Ext.event.Event} encapsulating the DOM event.
 * @param {HTMLElement} t The target of the event.
 */
/**
 * @event error
 * Fires when an object/image/frame cannot be loaded properly.
 * @param {Ext.event.Event} e The {@link Ext.event.Event} encapsulating the DOM event.
 * @param {HTMLElement} t The target of the event.
 */
/**
 * @event painted
 * Fires whenever this Element actually becomes visible (painted) on the screen. This is useful when you need to
 * perform 'read' operations on the DOM element, i.e: calculating natural sizes and positioning.
 *
 * __Note:__ This event is not available to be used with event delegation. Instead `painted` only fires if you explicitly
 * add at least one listener to it, for performance reasons.
 *
 * @param {Ext.dom.Element} this The component instance.
 */
/**
 * @event resize
 * Important note: For the best performance on mobile devices, use this only when you absolutely need to monitor
 * a Element's size.
 *
 * __Note:__ This event is not available to be used with event delegation. Instead `resize` only fires if you explicitly
 * add at least one listener to it, for performance reasons.
 *
 * @param {Ext.dom.Element} this The component instance.
 */
/**
 * @event scroll
 * Fires when a document view is scrolled.
 * @param {Ext.event.Event} e The {@link Ext.event.Event} encapsulating the DOM event.
 * @param {HTMLElement} t The target of the event.
 */

//  Form events
/**
 * @event select
 * Fires when a user selects some text in a text field, including input and textarea.
 * @param {Ext.event.Event} e The {@link Ext.event.Event} encapsulating the DOM event.
 * @param {HTMLElement} t The target of the event.
 */
/**
 * @event change
 * Fires when a control loses the input focus and its value has been modified since gaining focus.
 * @param {Ext.event.Event} e The {@link Ext.event.Event} encapsulating the DOM event.
 * @param {HTMLElement} t The target of the event.
 */
/**
 * @event submit
 * Fires when a form is submitted.
 * @param {Ext.event.Event} e The {@link Ext.event.Event} encapsulating the DOM event.
 * @param {HTMLElement} t The target of the event.
 */
/**
 * @event reset
 * Fires when a form is reset.
 * @param {Ext.event.Event} e The {@link Ext.event.Event} encapsulating the DOM event.
 * @param {HTMLElement} t The target of the event.
 */
/**
 * @event focus
 * Fires when an element receives focus either via the pointing device or by tab navigation.
 * @param {Ext.event.Event} e The {@link Ext.event.Event} encapsulating the DOM event.
 * @param {HTMLElement} t The target of the event.
 */
/**
 * @event blur
 * Fires when an element loses focus either via the pointing device or by tabbing navigation.
 * @param {Ext.event.Event} e The {@link Ext.event.Event} encapsulating the DOM event.
 * @param {HTMLElement} t The target of the event.
 */
/**
 * @event focusmove
 * Fires when focus is moved *within* an element.
 * @param {Ext.event.Event} e The {@link Ext.event.Event} encapsulating the DOM event.
 * @param {Ext.dom.Element} e.target The {@link Ext.dom.Element} element which *recieved* focus.
 * @param {Ext.dom.Element} e.relatedTarget The {@link Ext.dom.Element} element which *lost* focus.
 * @param {HTMLElement} t The target of the event.
 */

//  User Interface events
/**
 * @event DOMFocusIn
 * Where supported. Similar to HTML focus event, but can be applied to any focusable element.
 * @param {Ext.event.Event} e The {@link Ext.event.Event} encapsulating the DOM event.
 * @param {HTMLElement} t The target of the event.
 */
/**
 * @event DOMFocusOut
 * Where supported. Similar to HTML blur event, but can be applied to any focusable element.
 * @param {Ext.event.Event} e The {@link Ext.event.Event} encapsulating the DOM event.
 * @param {HTMLElement} t The target of the event.
 */
/**
 * @event DOMActivate
 * Where supported. Fires when an element is activated, for instance, through a mouse click or a keypress.
 * @param {Ext.event.Event} e The {@link Ext.event.Event} encapsulating the DOM event.
 * @param {HTMLElement} t The target of the event.
 */

//  DOM Mutation events
/**
 * @event DOMSubtreeModified
 * Where supported. Fires when the subtree is modified.
 * @param {Ext.event.Event} e The {@link Ext.event.Event} encapsulating the DOM event.
 * @param {HTMLElement} t The target of the event.
 */
/**
 * @event DOMNodeInserted
 * Where supported. Fires when a node has been added as a child of another node.
 * @param {Ext.event.Event} e The {@link Ext.event.Event} encapsulating the DOM event.
 * @param {HTMLElement} t The target of the event.
 */
/**
 * @event DOMNodeRemoved
 * Where supported. Fires when a descendant node of the element is removed.
 * @param {Ext.event.Event} e The {@link Ext.event.Event} encapsulating the DOM event.
 * @param {HTMLElement} t The target of the event.
 */
/**
 * @event DOMNodeRemovedFromDocument
 * Where supported. Fires when a node is being removed from a document.
 * @param {Ext.event.Event} e The {@link Ext.event.Event} encapsulating the DOM event.
 * @param {HTMLElement} t The target of the event.
 */
/**
 * @event DOMNodeInsertedIntoDocument
 * Where supported. Fires when a node is being inserted into a document.
 * @param {Ext.event.Event} e The {@link Ext.event.Event} encapsulating the DOM event.
 * @param {HTMLElement} t The target of the event.
 */
/**
 * @event DOMAttrModified
 * Where supported. Fires when an attribute has been modified.
 * @param {Ext.event.Event} e The {@link Ext.event.Event} encapsulating the DOM event.
 * @param {HTMLElement} t The target of the event.
 */
/**
 * @event DOMCharacterDataModified
 * Where supported. Fires when the character data has been modified.
 * @param {Ext.event.Event} e The {@link Ext.event.Event} encapsulating the DOM event.
 * @param {HTMLElement} t The target of the event.
 */

/**
 * @member Ext
 * @method get
 */

/**
 * @property {Number} [VISIBILITY=1]
 * Visibility mode constant for use with {@link Ext.dom.Element#setVisibilityMode}.
 * Use the CSS 'visibility' property to hide the element.
 *
 * Note that in this mode, {@link Ext.dom.Element#isVisible isVisible} may return true
 * for an element even though it actually has a parent element that is hidden. For this
 * reason, and in most cases, using the {@link #OFFSETS} mode is a better choice.
 * @static
 * @inheritable
 */

/**
 * @property {Number} [DISPLAY=2]
 * Visibility mode constant for use with {@link Ext.dom.Element#setVisibilityMode}.
 * Use the CSS 'display' property to hide the element.
 * @static
 * @inheritable
 */

/**
 * @property {Number} [OFFSETS=3]
 * Visibility mode constant for use with {@link Ext.dom.Element#setVisibilityMode}.
 * Use CSS absolute positioning and top/left offsets to hide the element.
 * @static
 * @inheritable
 */

/**
 * @property {Number} [CLIP=4]
 * Visibility mode constant for use with {@link Ext.dom.Element#setVisibilityMode}.
 * Use CSS `clip` property to reduce element's dimensions to 0px by 0px, effectively
 * making it hidden while not being truly invisible. This is useful when an element
 * needs to be published to the Assistive Technologies such as screen readers.
 * @static
 * @inheritable
 */

/**
 * @property {Number} [OPACITY=5]
 * Visibility mode constant for use with {@link Ext.dom.Element#setVisibilityMode}.
 * Use CSS `opacity` property to set an elements opacity to 0
 * @static
 * @inheritable
 */

/**
 * @method fly
 * @inheritdoc Ext#fly
 * @inheritable
 * @static
 */

/**
 * @method get
 * Retrieves Ext.dom.Element objects. {@link Ext#get} is alias for {@link Ext.dom.Element#get}.
 *
 * **This method does not retrieve {@link Ext.Component Component}s.** This method retrieves Ext.dom.Element
 * objects which encapsulate DOM elements. To retrieve a Component by its ID, use {@link Ext.ComponentManager#get}.
 *
 * When passing an id, it should not include the `#` character that is used for a css selector.
 *
 *     // For an element with id 'foo'
 *     Ext.get('foo'); // Correct
 *     Ext.get('#foo'); // Incorrect
 *
 * Uses simple caching to consistently return the same object. Automatically fixes if an object was recreated with
 * the same id via AJAX or DOM.
 *
 * @param {String/HTMLElement/Ext.dom.Element} el The `id` of the node, a DOM Node or an existing Element.
 * @return {Ext.dom.Element} The Element object (or `null` if no matching element was found).
 * @static
 * @inheritable
 */

/**
 * @method select
 * Selects elements based on the passed CSS selector to enable
 * {@link Ext.dom.Element Element} methods to be applied to many related
 * elements in one statement through the returned
 * {@link Ext.dom.CompositeElementLite CompositeElementLite} object.
 * @static
 * @inheritable
 * @param {String/HTMLElement[]} selector The CSS selector or an array of
 * elements
 * @param {Boolean} [composite=false] Return a CompositeElement as opposed to
 * a CompositeElementLite. Defaults to false.
 * @param {HTMLElement/String} [root] The root element of the query or id of
 * the root
 * @return {Ext.dom.CompositeElementLite/Ext.dom.CompositeElement}
 */

/**
 * @method query
 * Selects child nodes of a given root based on the passed CSS selector.
 * @static
 * @inheritable
 * @param {String} selector The CSS selector.
 * @param {Boolean} [asDom=true] `false` to return an array of Ext.dom.Element
 * @param {HTMLElement/String} [root] The root element of the query or id of
 * the root
 * @return {HTMLElement[]/Ext.dom.Element[]} An Array of elements that match
 * the selector.  If there are no matches, an empty Array is returned.
 */

/**
 * @method down
 * Selects a single child at any depth below this element based on the passed CSS selector (the selector should not contain an id).
 * @param {String} selector The CSS selector
 * @param {Boolean} [returnDom=false] `true` to return the DOM node instead of Ext.dom.Element
 * @return {HTMLElement/Ext.dom.Element} The child Ext.dom.Element (or DOM node if `returnDom` is `true`)
 */

/**
 * @method focus
 * Try to focus the element either immediately or after a timeout
 * if `defer` argument is specified.
 *
 * @param {Number} [defer] Milliseconds to defer the focus
 *
 * @return {Ext.dom.Element} this
 */

/**
 * @method getValue
 * Returns the value of the `value` attribute.
 * @param {Boolean} asNumber `true` to parse the value as a number.
 * @return {String/Number}
 */

/**
 * @method is
 * Returns `true` if this element matches the passed simple selector
 * (e.g. 'div.some-class' or 'span:first-child').
 * @param {String/Function} selector The simple selector to test or a function which is passed
 * candidate nodes, and should return `true` for nodes which match.
 * @return {Boolean} `true` if this element matches the selector, else `false`.
 */

/**
 * @cfg listeners
 * @hide
 */

/**
 * @method query
 * Selects child nodes based on the passed CSS selector.
 * Delegates to document.querySelectorAll. More information can be found at
 * [http://www.w3.org/TR/css3-selectors/](http://www.w3.org/TR/css3-selectors/)
 *
 * All selectors, attribute filters and pseudos below can be combined infinitely
 * in any order. For example `div.foo:nth-child(odd)[@foo=bar].bar:first` would be
 * a perfectly valid selector.
 *
 * ## Element Selectors:
 *
 * * \* any element
 * * E an element with the tag E
 * * E F All descendant elements of E that have the tag F
 * * E > F or E/F all direct children elements of E that have the tag F
 * * E + F all elements with the tag F that are immediately preceded by an element with the tag E
 * * E ~ F all elements with the tag F that are preceded by a sibling element with the tag E
 *
 * ## Attribute Selectors:
 *
 * The use of @ and quotes are optional. For example, div[@foo='bar'] is also a valid attribute selector.
 *
 * * E[foo] has an attribute "foo"
 * * E[foo=bar] has an attribute "foo" that equals "bar"
 * * E[foo^=bar] has an attribute "foo" that starts with "bar"
 * * E[foo$=bar] has an attribute "foo" that ends with "bar"
 * * E[foo*=bar] has an attribute "foo" that contains the substring "bar"
 * * E[foo%=2] has an attribute "foo" that is evenly divisible by 2
 * * E[foo!=bar] has an attribute "foo" that does not equal "bar"
 *
 * ## Pseudo Classes:
 *
 * * E:first-child E is the first child of its parent
 * * E:last-child E is the last child of its parent
 * * E:nth-child(n) E is the nth child of its parent (1 based as per the spec)
 * * E:nth-child(odd) E is an odd child of its parent
 * * E:nth-child(even) E is an even child of its parent
 * * E:only-child E is the only child of its parent
 * * E:checked E is an element that is has a checked attribute that is true (e.g. a radio or checkbox)
 * * E:first the first E in the resultset
 * * E:last the last E in the resultset
 * * E:nth(n) the nth E in the resultset (1 based)
 * * E:odd shortcut for :nth-child(odd)
 * * E:even shortcut for :nth-child(even)
 * * E:not(S) an E element that does not match simple selector S
 * * E:has(S) an E element that has a descendant that matches simple selector S
 * * E:next(S) an E element whose next sibling matches simple selector S
 * * E:prev(S) an E element whose previous sibling matches simple selector S
 * * E:any(S1|S2|S2) an E element which matches any of the simple selectors S1, S2 or S3//\\
 *
 * ## CSS Value Selectors:
 *
 * * E{display=none} CSS value "display" that equals "none"
 * * E{display^=none} CSS value "display" that starts with "none"
 * * E{display$=none} CSS value "display" that ends with "none"
 * * E{display*=none} CSS value "display" that contains the substring "none"
 * * E{display%=2} CSS value "display" that is evenly divisible by 2
 * * E{display!=none} CSS value "display" that does not equal "none"
 *
 * @param {String} selector The CSS selector.
 * @param {Boolean} [asDom=true] `false` to return an array of Ext.dom.Element
 * @return {HTMLElement[]/Ext.dom.Element[]} An Array of elements (
 * HTMLElement or Ext.dom.Element if _asDom_ is _false_) that match the selector.
 * If there are no matches, an empty Array is returned.
 */

/**
 * @method select
 * Selects descendant elements of this element based on the passed CSS selector to
 * enable {@link Ext.dom.Element Element} methods to be applied to many related
 * elements in one statement through the returned
 * {@link Ext.dom.CompositeElementLite CompositeElementLite} object.
 *
 * @param {String/HTMLElement[]} selector The CSS selector or an array of elements
 * @param {Boolean} composite Return a CompositeElement as opposed to a
 * CompositeElementLite. Defaults to false.
 * @return {Ext.dom.CompositeElementLite/Ext.dom.CompositeElement}
 */

/**
 * @method set
 * Sets the passed attributes as attributes of this element (a `style` attribute
 * can be a string, object or function).
 *
 * Example component (though any Ext.dom.Element would suffice):
 *
 *     var cmp = Ext.create({
 *         xtype: 'component',
 *         html: 'test',
 *         renderTo: Ext.getBody()
 *     });
 *
 * Once the component is rendered, you can fetch a reference to its outer
 * element to use `set`:
 *
 *     cmp.el.set({
 *         foo: 'bar'
 *     });
 *
 * This sets an attribute on the element of **foo="bar"**:
 *
 *     <div class="x-component x-component-default x-border-box" id="component-1009" foo="bar">test</div>
 *
 * To remove the attribute pass a value of **undefined**:
 *
 *     cmp.el.set({
 *         foo: undefined
 *     });
 *
 * **Note:**
 *
 *  - You cannot remove an attribute by passing `undefined` when the
 * `expandos` param is set to **false**.
 *  - Passing an attribute of `style` results in the request being handed off to
 * {@link #method-applyStyles}.
 *  - Passing an attribute of `cls` results in the element's dom's
 * [className](http://www.w3schools.com/jsref/prop_html_classname.asp) property
 * being set directly.  For additional flexibility when setting / removing
 * classes see:
 *     - {@link #method-addCls}
 *     - {@link #method-removeCls}
 *     - {@link #method-replaceCls}
 *     - {@link #method-setCls}
 *     - {@link #method-toggleCls}
 *
 * @param {Object} attributes The object with the attributes.
 * @param {Boolean} [useSet=true] `false` to override the default `setAttribute`
 * to use [expandos](http://help.dottoro.com/ljvovanq.php).
 * @return {Ext.dom.Element} this
 */

/**
 * @method up
 * Walks up the dom looking for a parent node that matches the passed simple selector (e.g. 'div.some-class' or 'span:first-child').
 * This is a shortcut for findParentNode() that always returns an Ext.dom.Element.
 * @param {String} selector The simple selector to test. See {@link Ext.dom.Query} for information about simple selectors.
 * @param {Number/String/HTMLElement/Ext.dom.Element} [limit]
 * The max depth to search as a number or an element that causes the upward
 * traversal to stop and is **not** considered for inclusion as the result.
 * (defaults to 50 || document.documentElement)
 * @param {Boolean} [returnDom=false] True to return the DOM node instead of Ext.dom.Element
 * @return {Ext.dom.Element/HTMLElement} The matching DOM node (or HTMLElement if
 * _returnDom_ is _true_).  Or null if no match was found.
 */

/**
 * @method isFocusable
 * Checks whether this element can be focused programmatically or by clicking.
 * To check if an element is in the document tab flow, use {@link #isTabbable}.
 *
 * @return {Boolean} True if the element is focusable
 */

/**
 * @member Ext
 * @method select
 * Shorthand for {@link Ext.dom.Element#method-select Ext.dom.Element.select}<br><br>
 * @inheritdoc Ext.dom.Element#method-select
 */

/**
 * @member Ext
 * @method query
 * Shorthand for {@link Ext.dom.Element#method-query Ext.dom.Element.query}<br><br>
 * @inheritdoc Ext.dom.Element#method-query
 */

/**
 * @method id
 * Generates unique ids. If the element already has an id, it is unchanged
 * @member Ext
 * @param {Object/HTMLElement/Ext.dom.Element} [obj] The element to generate an id for
 * @param {String} prefix (optional) Id prefix (defaults "ext-gen")
 * @return {String} The generated Id.
 */
