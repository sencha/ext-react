/**
 * @class Ext.dom.Query
 * @alternateClassName Ext.DomQuery
 * @alternateClassName Ext.core.DomQuery
 * @singleton
 *
 * Provides high performance selector/xpath processing by compiling queries into reusable functions. New pseudo classes
 * and matchers can be plugged. It works on HTML and XML documents (if a content node is passed in).
 *
 * DomQuery supports most of the [CSS3 selectors spec][1], along with some custom selectors and basic XPath.
 *
 * All selectors, attribute filters and pseudos below can be combined infinitely in any order. For example
 * `div.foo:nth-child(odd)[@foo=bar].bar:first` would be a perfectly valid selector. Node filters are processed
 * in the order in which they appear, which allows you to optimize your queries for your document structure.
 * 
 * ## Simple Selectors
 * 
 * For performance reasons, some query methods accept selectors that are termed as **simple selectors**. A simple
 * selector is a selector that does not include contextual information about any parent/sibling elements.
 * 
 * Some examples of valid simple selectors:
 * 
 *     var simple = '.foo'; // Only asking for the class name on the element
 *     var simple = 'div.bar'; // Only asking for the tag/class name on the element
 *     var simple = '[href];' // Asking for an attribute on the element.
 *     var simple = ':not(.foo)'; // Only asking for the non-matches against the class name
 *     var simple = 'span:first-child'; // Doesn't require any contextual information about the parent node
 * 
 * Simple examples of invalid simple selectors:
 * 
 *     var notSimple = 'div.foo div.bar'; // Requires matching a parent node by class name
 *     var notSimple = 'span + div'; //  Requires matching a sibling by tag name
 *
 * ## Element Selectors:
 *
 *   - **`*`** any element
 *   - **`E`** an element with the tag E
 *   - **`E F`** All descendent elements of E that have the tag F
 *   - **`E > F`** or **E/F** all direct children elements of E that have the tag F
 *   - **`E + F`** all elements with the tag F that are immediately preceded by an element with the tag E
 *   - **`E ~ F`** all elements with the tag F that are preceded by a sibling element with the tag E
 *
 * ## Attribute Selectors:
 *
 * The use of `@` and quotes are optional. For example, `div[@foo='bar']` is also a valid attribute selector.
 *
 *   - **`E[foo]`** has an attribute "foo"
 *   - **`E[foo=bar]`** has an attribute "foo" that equals "bar"
 *   - **`E[foo^=bar]`** has an attribute "foo" that starts with "bar"
 *   - **`E[foo$=bar]`** has an attribute "foo" that ends with "bar"
 *   - **`E[foo*=bar]`** has an attribute "foo" that contains the substring "bar"
 *   - **`E[foo%=2]`** has an attribute "foo" that is evenly divisible by 2
 *   - **`E[foo!=bar]`** attribute "foo" does not equal "bar"
 *
 * ## Pseudo Classes:
 *
 *   - **`E:first-child`** E is the first child of its parent
 *   - **`E:last-child`** E is the last child of its parent
 *   - **`E:nth-child(_n_)`** E is the _n_th child of its parent (1 based as per the spec)
 *   - **`E:nth-child(odd)`** E is an odd child of its parent
 *   - **`E:nth-child(even)`** E is an even child of its parent
 *   - **`E:only-child`** E is the only child of its parent
 *   - **`E:checked`** E is an element that is has a checked attribute that is true (e.g. a radio or checkbox)
 *   - **`E:first`** the first E in the resultset
 *   - **`E:last`** the last E in the resultset
 *   - **`E:nth(_n_)`** the _n_th E in the resultset (1 based)
 *   - **`E:odd`** shortcut for :nth-child(odd)
 *   - **`E:even`** shortcut for :nth-child(even)
 *   - **`E:contains(foo)`** E's innerHTML contains the substring "foo"
 *   - **`E:nodeValue(foo)`** E contains a textNode with a nodeValue that equals "foo"
 *   - **`E:not(S)`** an E element that does not match simple selector S
 *   - **`E:has(S)`** an E element that has a descendent that matches simple selector S
 *   - **`E:next(S)`** an E element whose next sibling matches simple selector S
 *   - **`E:prev(S)`** an E element whose previous sibling matches simple selector S
 *   - **`E:any(S1|S2|S2)`** an E element which matches any of the simple selectors S1, S2 or S3
 *   - **`E:visible(true)`** an E element which is deeply visible according to {@link Ext.dom.Element#isVisible}
 *
 * ## CSS Value Selectors:
 *
 *   - **`E{display=none}`** css value "display" that equals "none"
 *   - **`E{display^=none}`** css value "display" that starts with "none"
 *   - **`E{display$=none}`** css value "display" that ends with "none"
 *   - **`E{display*=none}`** css value "display" that contains the substring "none"
 *   - **`E{display%=2}`** css value "display" that is evenly divisible by 2
 *   - **`E{display!=none}`** css value "display" that does not equal "none"
 * 
 * ## XML Namespaces:
 *   - **`ns|E`** an element with tag E and namespace prefix ns
 *
 * [1]: http://www.w3.org/TR/2005/WD-css3-selectors-20051215/#selectors
 */

/**
 * @method compile
 * Compiles a selector/xpath query into a reusable function. The returned function
 * takes one parameter "root" (optional), which is the context node from where the query should start.
 * @param {String} selector The selector/xpath query
 * @param {String} [type="select"] Either "select" or "simple" for a simple selector match
 * @return {Function}
 */

/**
 * @method jsSelect
 * Selects an array of DOM nodes using JavaScript-only implementation.
 *
 * Use {@link #select} to take advantage of browsers built-in support for CSS selectors.
 * @param {String} selector The selector/xpath query (can be a comma separated list of selectors)
 * @param {HTMLElement/String} [root=document] The start of the query.
 * @return {HTMLElement[]} An Array of DOM elements which match the selector. If there are
 * no matches, and empty Array is returned.
 */

/**
 * Selects an array of DOM nodes by CSS/XPath selector.
 *
 * Uses [document.querySelectorAll][0] if browser supports that, otherwise falls back to
 * {@link Ext.dom.Query#jsSelect} to do the work.
 *
 * [0]: https://developer.mozilla.org/en/DOM/document.querySelectorAll
 *
 * @param {String} path The selector/xpath query
 * @param {HTMLElement} [root=document] The start of the query.
 * @return {HTMLElement[]} An array of DOM elements (not a NodeList as returned by `querySelectorAll`).
 * @param {String} [type="select"] Either "select" or "simple" for a simple selector match (only valid when
 * used when the call is deferred to the jsSelect method)
 * @param {Boolean} [single] Pass `true` to select only the first matching node using `document.querySelector` (where available)
 * @method select
 */

/**
 * @method selectNode
 * Selects a single element.
 * @param {String} selector The selector/xpath query
 * @param {HTMLElement} [root=document] The start of the query.
 * @return {HTMLElement} The DOM element which matched the selector.
 */

/**
 * @method selectValue
 * Selects the value of a node, optionally replacing null with the defaultValue.
 * @param {String} selector The selector/xpath query
 * @param {HTMLElement} [root=document] The start of the query.
 * @param {String} [defaultValue] When specified, this is return as empty value.
 * @return {String}
 */

/**
 * @method getNodeValue
 * Get the text value for a node, optionally replacing null with the defaultValue.
 * @param {Object} node The node
 * @param {String} [defaultValue] When specified, this is return as empty value.
 * @return {String} The value
 */

/**
 * @method selectNumber
 * Selects the value of a node, parsing integers and floats.
 * Returns the defaultValue, or 0 if none is specified.
 * @param {String} selector The selector/xpath query
 * @param {HTMLElement} [root=document] The start of the query.
 * @param {Number} [defaultValue] When specified, this is return as empty value.
 * @return {Number}
 */

/**
 * @method is
 * Returns true if the passed element(s) match the passed simple selector
 * @param {String/HTMLElement/HTMLElement[]} el An element id, element or array of elements
 * @param {String} selector The simple selector to test
 * @return {Boolean}
 */

/**
 * @method filter
 * Filters an array of elements to only include matches of a simple selector
 * @param {HTMLElement[]} el An array of elements to filter
 * @param {String} selector The simple selector to test
 * @param {Boolean} nonMatches If true, it returns the elements that DON'T match the selector instead of the
 * ones that match
 * @return {HTMLElement[]} An Array of DOM elements which match the selector. If there are no matches, and empty
 * Array is returned.
 */

/**
 * @property matchers
 * Collection of matching regular expressions and code snippets.
 * Each capture group within `()` will be replace the `{}` in the select
 * statement as specified by their index.
 */

/**
 * Collection of operator comparison functions.
 * The default operators are `=`, `!=`, `^=`, `$=`, `*=`, `%=`, `|=` and `~=`.
 *
 * New operators can be added as long as the match the format *c*`=` where *c*
 * is any character other than space, `>`, or `<`.
 *
 * Operator functions are passed the following parameters:
 *
 * * `propValue` : The property value to test.
 * * `compareTo` : The value to compare to.
 *
 * @property {Object} operators
 */

/**
 * @property pseudos
 * Object hash of "pseudo class" filter functions which are used when filtering selections.
 * Each function is passed two parameters:
 *
 * - **c** : Array
 *     An Array of DOM elements to filter.
 *
 * - **v** : String
 *     The argument (if any) supplied in the selector.
 *
 * A filter function returns an Array of DOM elements which conform to the pseudo class.
 * In addition to the provided pseudo classes listed above such as `first-child` and `nth-child`,
 * developers may add additional, custom psuedo class filters to select elements according to application-specific requirements.
 *
 * For example, to filter `a` elements to only return links to __external__ resources:
 *
 *     Ext.DomQuery.pseudos.external = function(c, v) {
 *         var r = [], ri = -1;
 *         for(var i = 0, ci; ci = c[i]; i++) {
 *             // Include in result set only if it's a link to an external resource
 *             if (ci.hostname != location.hostname) {
 *                 r[++ri] = ci;
 *             }
 *         }
 *         return r;
 *     };
 *
 * Then external links could be gathered with the following statement:
 *
 *     var externalLinks = Ext.select("a:external");
 */
