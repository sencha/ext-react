/**
 * @class Ext.feature
 * @singleton
 *
 * A simple class to verify if a browser feature exists or not on the current device.
 *
 *     if (Ext.feature.has.Canvas) {
 *         // do some cool things with canvas here
 *     }
 *
 * See the {@link #has} property/method for details of the features that can be detected.
 *
 */

/**
 * @method has
 * @member Ext.feature
 * Verifies if a browser feature exists or not on the current device.
 *
 * A "hybrid" property, can be either accessed as a method call, i.e:
 *
 *     if (Ext.feature.has('Canvas')) {
 *         // ...
 *     }
 *
 * or as an object with boolean properties, i.e:
 *
 *     if (Ext.feature.has.Canvas) {
 *         // ...
 *     }
 *
 * For possible properties/parameter values see `Ext.supports`.
 *
 * @param {String} name The feature name to check.
 * @return {Boolean}
 */

/**
 * @class Ext.supports
 *
 * Contains information about features supported in the current environment as well
 * as bugs detected.
 *
 * @singleton
 */
]        /**
 * @property CloneNodeCopiesExpando `true` if the native DOM cloneNode method copies
 * expando properties to the newly cloned node.
 *
 * This property is available at application boot time, before document ready.
 * @type {Boolean}
 */

/**
 * @property CSSPointerEvents `true` if document environment supports the CSS3
 * pointer-events style.
 *
 * This property is available at application boot time, before document ready.
 * @type {Boolean}
 */

/**
 * @property CSS3BoxShadow `true` if document environment supports the CSS3
 * box-shadow style.
 *
 * This property is available at application boot time, before document ready.
 * @type {Boolean}
 */

/**
 * @property ClassList `true` if document environment supports the HTML5
 * classList API.
 *
 * This property is available at application boot time, before document ready.
 * @type {Boolean}
 */

/**
 * @property Canvas `true` if the device supports Canvas.
 *
 * This property is available at application boot time, before document ready.
 * @type {Boolean}
 */

/**
 * @property Svg `true` if the device supports SVG.
 *
 * This property is available at application boot time, before document ready.
 * @type {Boolean}
 */

/**
 * @property Vml `true` if the device supports VML.
 * @type {Boolean}
 *
 * This property is available at application boot time, before document ready.
 */

/**
 * @property {Boolean} Touch `true` if the browser supports touch input.
 *
 * This property is available at application boot time, before document ready.
 */

/**
 * @property {Boolean} TouchEvents
 *
 * `true` if the device supports touch events (`touchstart`, `touchmove`, `touchend`).
 *
 * This property is available at application boot time, before document ready.
 */

/**
 * @property {Boolean} TouchAction
 * @private
 *
 * A bit flag representing which property values the browser recognizes as valid
 * values of the CSS `touch-action` property.
 *
 *     panX            1  "00000001"
 *     panY            2  "00000010"
 *     pinchZoom       4  "00000100"
 *     doubleTapZoom   8  "00001000"
 */

/**
 * @property Orientation `true` if the device supports different orientations.
 * @type {Boolean}
 *
 * This property is available at application boot time, before document ready.
 */

/**
 * @property OrientationChange `true` if the device supports the `orientationchange`
 * event.
 *
 * This property is available at application boot time, before document ready.
 * @type {Boolean}
 */

/**
 * @property DeviceMotion `true` if the device supports device motion (acceleration
 * and rotation rate).
 *
 * This property is available at application boot time, before document ready.
 * @type {Boolean}
 */

/**
 * @property Geolocation `true` if the device supports GeoLocation.
 * @type {Boolean}
 *
 * This property is available at application boot time, before document ready.
 */

/**
 * @property Range `true` if browser support document.createRange native method.
 * See https://developer.mozilla.org/en/DOM/range.
 *
 * This property is available at application boot time, before document ready.
 * @type {Boolean}
 */

/**
 * @property CreateContextualFragment `true` if browser support CreateContextualFragment
 * range native methods.
 * See https://developer.mozilla.org/en/DOM/range.createContextualFragment
 *
 * This property is available at application boot time, before document ready.
 * @type {Boolean}
 */

/**
 * @property History `true` if the device supports HTML5 history. See
 * https://developer.mozilla.org/en/DOM/Manipulating_the_browser_history
 *
 * This property is available at application boot time, before document ready.
 * @type {Boolean}
 */

/**
 * @property Css3DTransforms `true` if the device supports CSS3DTransform.
 * @type {Boolean}
 *
 * This property is available at application boot time, before document ready.
 */

/**
 * @property Transitions `true` if the device supports CSS3 Transitions.
 *
 * This property is available at application boot time, before document ready.
 * @type {Boolean}
 */

/**
 * @property Audio `true` if the device supports the HTML5 `audio` tag.
 *
 * This property is available at application boot time, before document ready.
 * @type {Boolean}
 */

/**
 * @property Video `true` if the device supports the HTML5 `video` tag.
 *
 * This property is available at application boot time, before document ready.
 * @type {Boolean}
 */

/**
 * @property LocalStorage `true` if localStorage is supported.
 *
 * This property is available at application boot time, before document ready.
 * @type {Boolean}
 */

/**
 * @property {Boolean} XmlQuerySelector `true` if the browsers supports querySelector
 * and querySelectorAll methods on XML nodes.
 *
 * This property is available at application boot time, before document ready.
 */

/**
 * @property XHR2 `true` if the browser supports XMLHttpRequest
 *
 * This property is available at application boot time, before document ready.
 * @type {Boolean}
 */

/**
 * @property XHRUploadProgress `true` if the browser supports XMLHttpRequest
 * upload progress info
 *
 * This property is available at application boot time, before document ready.
 * @type {Boolean}
 */

/**
 * @property NumericInputPlaceHolder `true` if the browser supports placeholders
 * on numeric input fields
 *
 * This property is available at application boot time, before document ready.
 * @type {Boolean}
 */

/**
 * @property {String} matchesSelector
 * The method name which matches an element against a selector if implemented in this environment.
 *
 * This property is available at application boot time, before document ready.
 */

/**
 * @property RightMargin `true` if the device supports right margin.
 * See https://bugs.webkit.org/show_bug.cgi?id=13343 for why this is needed.
 *
 * This property is *NOT* available at application boot time. Only after the document ready event.
 * @type {Boolean}
 */

/**
 * @property DisplayChangeInputSelectionBug `true` if INPUT elements lose their
 * selection when their display style is changed. Essentially, if a text input
 * has focus and its display style is changed, the I-beam disappears.
 *
 * This bug is encountered due to the work around in place for the {@link #RightMargin}
 * bug. This has been observed in Safari 4.0.4 and older, and appears to be fixed
 * in Safari 5. It's not clear if Safari 4.1 has the bug, but it has the same WebKit
 * version number as Safari 5 (according to http://unixpapa.com/js/gecko.html).
 *
 * This property is available at application boot time, before document ready.
 */

/**
 * @property DisplayChangeTextAreaSelectionBug `true` if TEXTAREA elements lose their
 * selection when their display style is changed. Essentially, if a text area has
 * focus and its display style is changed, the I-beam disappears.
 *
 * This bug is encountered due to the work around in place for the {@link #RightMargin}
 * bug. This has been observed in Chrome 10 and Safari 5 and older, and appears to
 * be fixed in Chrome 11.
 *
 * This property is available at application boot time, before document ready.
 */

/**
 * @property TransparentColor `true` if the device supports transparent color.
 * @type {Boolean}
 *
 * This property is *NOT* available at application boot time. Only after the document ready event.
 */

/**
 * @property ComputedStyle `true` if the browser supports document.defaultView.getComputedStyle().
 * @type {Boolean}
 *
 * This property is *NOT* available at application boot time. Only after the document ready event.
 */

/**
 * @property Float `true` if the device supports CSS float.
 * @type {Boolean}
 *
 * This property is available at application boot time, before document ready.
 */

/**
 * @property CSS3BorderRadius `true` if the device supports CSS3 border radius.
 * @type {Boolean}
 *
 * This property is *NOT* available at application boot time. Only after the document ready event.
 */

/**
 * @property CSS3LinearGradient `true` if the device supports CSS3 linear gradients.
 * @type {Boolean}
 *
 * This property is available at application boot time, before document ready.
 */

/**
 * @property MouseEnterLeave `true` if the browser supports mouseenter and mouseleave events
 * @type {Boolean}
 *
 * This property is available at application boot time, before document ready.
 */

/**
 * @property MouseWheel `true` if the browser supports the mousewheel event
 * @type {Boolean}
 *
 * This property is available at application boot time, before document ready.
 */

/**
 * @property Opacity `true` if the browser supports normal css opacity
 * @type {Boolean}
 *
 * This property is available at application boot time, before document ready.
 */

/**
 * @property Placeholder `true` if the browser supports the HTML5 placeholder attribute on inputs
 * @type {Boolean}
 *
 * This property is available at application boot time, before document ready.
 */

/**
 * @property Direct2DBug `true` if when asking for an element's dimension via offsetWidth or offsetHeight,
 * getBoundingClientRect, etc. the browser returns the subpixel width rounded to the nearest pixel.
 *
 * This property is available at application boot time, before document ready.
 * @type {Boolean}
 */

/**
 * @property BoundingClientRect `true` if the browser supports the getBoundingClientRect method on elements
 * @type {Boolean}
 *
 * This property is available at application boot time, before document ready.
 */

/**
 * @property RotatedBoundingClientRect `true` if the BoundingClientRect is
 * rotated when the element is rotated using a CSS transform.
 * @type {Boolean}
 *
 * This property is *NOT* available at application boot time. Only after the document ready event.
 */

/**
 * @property ChildContentClearedWhenSettingInnerHTML `true` if created child elements
 * lose their innerHTML when modifying the innerHTML of the parent element.
 * @type {Boolean}
 *
 * This property is *NOT* available at application boot time. Only after the document ready event.
 */

/**
 * @property TextAreaMaxLength `true` if the browser supports maxlength on textareas.
 * @type {Boolean}
 *
 * This property is available at application boot time, before document ready.
 */

/**
 * @property GetPositionPercentage `true` if the browser will return the left/top/right/bottom
 * position as a percentage when explicitly set as a percentage value.
 *
 * This property is *NOT* available at application boot time. Only after the document ready event.
 * @type {Boolean}
 */

/**
 * @property {Boolean} ScrollWidthInlinePaddingBug
 * In some browsers the right padding of an overflowing element is not accounted
 * for in its scrollWidth.  The result can vary depending on whether or not
 * The element contains block-level children.  This method tests the effect
 * of padding on scrollWidth when there are no block-level children inside the
 * overflowing element.
 *
 * This method returns true if the browser is affected by this bug.
 *
 * This property is *NOT* available at application boot time. Only after the document ready event.
 */

/**
 * @property {Boolean} SpecialKeyDownRepeat
 * True if the browser fires the keydown event on specialkey autorepeat
 *
 * note 1: IE fires ONLY the keydown event on specialkey autorepeat
 * note 2: Safari < 3.1, Gecko (Mac/Linux) & Opera fire only the keypress event on
 * specialkey autorepeat (research done by Jan Wolter at
 * http://unixpapa.com/js/key.html)
 * note 3: Opera 12 behaves like other modern browsers so this workaround does not
 * work anymore
 *
 * This property is available at application boot time, before document ready.
 */

/**
 * @property {Boolean} EmulatedMouseOver
 * True if the browser emulates a mouseover event on tap (mobile safari)
 *
 * This property is available at application boot time, before document ready.
 */

/**
 * @property Hashchange True if the user agent supports the hashchange event
 *
 * This property is available at application boot time, before document ready.
 * @type {Boolean}
 */

/**
 * @property {Boolean} AsyncFocusEvents
 * `true` if the browser fires focus events (focus, blur, focusin, focusout)
 * asynchronously, i.e. in a separate event loop invocation. This is only true
 * for all versions Internet Explorer; Microsoft Edge and other browsers fire
 * focus events synchronously.
 */

/**
 * @property {Boolean} HighContrastMode `true` if the browser is currently
 * running in Windows High Contrast accessibility mode.
 *
 * @property {Object} accessibility Accessibility features.
 *
 * @property {Boolean} accessibility.Images `true` if the browser is configured
 * to display images.
 *
 * @property {Boolean} accessibility.BackgroundImages `true` if the browser
 * is configured to display background images.
 *
 * @property {Boolean} accessibility.BorderColors `true` if the browser
 * is configured to honor CSS styling for border colors.
 *
 * @property {Boolean} accessibility.LightOnDark `true` if the browser
 * is currently using reverse colors in light-on-dark accessibility mode.
 */

/**
 * @property ViewportUnits `true` if the device supports ViewportUnits.
 * @type {Boolean}
 *
 */

/**
 * @property Selectors2 `true` if the browser supports the CSS selector API level 2.
 * https://dev.w3.org/2006/webapi/selectors-api2/
 * @type {Boolean}
 *
 */

/**
 * @property CannotScrollExactHeight
 * @type {Boolean}
 *
 * Feature detect the support of browsers that are unable to scroll elements that are the same
 * height as the native scrollbar height.
 */
