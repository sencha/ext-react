/**
 * @class Ext.ComponentQuery
 * @extend Ext.Base
 * @singleton
 *
 * Provides searching of Components within Ext.ComponentManager (globally) or a specific
 * Ext.container.Container on the document with a similar syntax to a CSS selector.
 * Returns Array of matching Components, or empty Array.
 *
 * ## Basic Component lookup
 *
 * Components can be retrieved by using their {@link Ext.Component xtype}:
 *
 * - `component`
 * - `gridpanel`
 *
 * Matching by `xtype` matches inherited types, so in the following code, the previous field
 * *of any type which inherits from `TextField`* will be found:
 *
 *     prevField = myField.previousNode('textfield');
 *
 * To match only the exact type, pass the "shallow" flag by adding `(true)` to xtype
 * (See Component's {@link Ext.Component#isXType isXType} method):
 *
 *     prevTextField = myField.previousNode('textfield(true)');
 *
 * You can search Components by their `id` or `itemId` property, prefixed with a #:
 *
 *     #myContainer
 *
 * Component `xtype` and `id` or `itemId` can be used together to avoid possible
 * id collisions between Components of different types:
 *
 *     panel#myPanel
 *
 * When Component's `id` or `xtype` contains dots, you can escape them in your selector:
 *
 *     my\.panel#myPanel
 *
 * Keep in mind that JavaScript treats the backslash character in a special way, so you
 * need to escape it, too, in the actual code:
 *
 *     var myPanel = Ext.ComponentQuery.query('my\\.panel#myPanel');
 *
 * ## Traversing Component tree
 *
 * Components can be found by their relation to other Components. There are several
 * relationship operators, mostly taken from CSS selectors:
 *
 * - **`E F`** All descendant Components of E that match F
 * - **`E > F`** All direct children Components of E that match F
 * - **`E ^ F`** All parent Components of E that match F
 *
 * Expressions between relationship operators are matched left to right, i.e. leftmost
 * selector is applied first, then if one or more matches are found, relationship operator
 * itself is applied, then next selector expression, etc. It is possible to combine
 * relationship operators in complex selectors:
 *
 *     window[title="Input form"] textfield[name=login] ^ form > button[action=submit]
 *
 * That selector can be read this way: Find a window with title "Input form", in that
 * window find a TextField with name "login" at any depth (including subpanels and/or
 * FieldSets), then find an `Ext.form.Panel` that is a parent of the TextField, and in
 * that form find a direct child that is a button with custom property `action` set to
 * value "submit".
 *
 * Whitespace on both sides of `^` and `>` operators is non-significant, i.e. can be
 * omitted, but usually is used for clarity.
 *
 * ## Searching by Component attributes
 *
 * Components can be searched by their object property values (attributes). To do that,
 * use attribute matching expression in square brackets:
 *
 * - `component[disabled]` - matches any Component that has `disabled` property with
 * any truthy (non-empty, not `false`) value.
 * - `panel[title="Test"]` - matches any Component that has `title` property set to
 * "Test". Note that if the value does not contain spaces, the quotes are optional.
 *
 * Attributes can use any of the following operators to compare values:
 * `=`, `!=`, `^=`, `$=`, `*=`, `%=`, `|=` and `~=`.
 *
 * Prefixing the attribute name with an at sign `@` means that the property must be
 * the object's `ownProperty`, not a property from the prototype chain.
 *
 * Specifications like `[propName]` check that the property is a truthy value. To check
 * that the object has an `ownProperty` of a certain name, regardless of the value use
 * the form `[?propName]`.
 *
 * The specified value is coerced to match the type of the property found in the
 * candidate Component using {@link Ext#coerce}.
 *
 * If you need to find Components by their `itemId` property, use the `#id` form; it will
 * do the same as `[itemId=id]` but is easier to read.
 *
 * If you need to include a metacharacter like (, ), [, ], etc., in the query, escape it
 * by prefixing it with a backslash:
 *
 *      var component = Ext.ComponentQuery.query('[myProperty=\\[foo\\]]');
 *
 * ## Attribute matching operators
 *
 * The '=' operator will return the results that **exactly** match the
 * specified object property (attribute):
 *
 *     Ext.ComponentQuery.query('panel[cls=my-cls]');
 *
 * Will match the following Component:
 *
 *     Ext.create('Ext.window.Window', {
 *         cls: 'my-cls'
 *     });
 *
 * But will not match the following Component, because 'my-cls' is one value
 * among others:
 *
 *      Ext.create('Ext.panel.Panel', {
 *          cls: 'foo-cls my-cls bar-cls'
 *      });
 *
 * You can use the '~=' operator instead, it will return Components with
 * the property that **exactly** matches one of the whitespace-separated
 * values. This is also true for properties that only have *one* value:
 *
 *     Ext.ComponentQuery.query('panel[cls~=my-cls]');
 *
 * Will match both Components:
 *
 *     Ext.create('Ext.panel.Panel', {
 *         cls: 'foo-cls my-cls bar-cls'
 *     });
 *     
 *     Ext.create('Ext.window.Window', {
 *         cls: 'my-cls'
 *     });
 *
 * Generally, '=' operator is more suited for object properties other than
 * CSS classes, while '~=' operator will work best with properties that
 * hold lists of whitespace-separated CSS classes.
 *
 * The '^=' operator will return Components with specified attribute that
 * start with the passed value:
 *
 *     Ext.ComponentQuery.query('panel[title^=Sales]');
 *
 * Will match the following Component:
 *
 *     Ext.create('Ext.panel.Panel', {
 *         title: 'Sales estimate for Q4'
 *     });
 *
 * The '$=' operator will return Components with specified properties that
 * end with the passed value:
 *
 *     Ext.ComponentQuery.query('field[fieldLabel$=name]');
 *
 * Will match the following Component:
 *
 *     Ext.create('Ext.form.field.Text', {
 *         fieldLabel: 'Enter your name'
 *     });
 *
 * The '/=' operator will return Components with specified properties that
 * match the passed regular expression:
 *
 *     Ext.ComponentQuery.query('button[action/="edit|save"]');
 *
 * Will match the following Components with a custom `action` property:
 *
 *     Ext.create('Ext.button.Button', {
 *          action: 'edit'
 *     });
 *
 *     Ext.create('Ext.button.Button', {
 *          action: 'save'
 *     });
 *
 * When you need to use meta characters like [], (), etc. in your query, make sure
 * to escape them with back slashes:
 *
 *     Ext.ComponentQuery.query('panel[title="^Sales for Q\\[1-4\\]"]');
 *
 * The following test will find panels with their `ownProperty` collapsed being equal to
 * `false`. It will **not** match a collapsed property from the prototype chain.
 *
 *     Ext.ComponentQuery.query('panel[@collapsed=false]');
 *
 * Member expressions from candidate Components may be tested. If the expression returns
 * a *truthy* value, the candidate Component will be included in the query:
 *
 *     var disabledFields = myFormPanel.query("{isDisabled()}");
 *
 * Such expressions are executed in Component's context, and the above expression is
 * similar to running this snippet for every Component in your application:
 *
 *      if (component.isDisabled()) {
 *          matches.push(component);
 *      }
 *
 * It is important to use only methods that are available in **every** Component instance
 * to avoid run time exceptions. If you need to match your Components with a custom
 * condition formula, you can augment `Ext.Component` to provide custom matcher that
 * will return `false` by default, and override it in your custom classes:
 * 
 *      Ext.define('My.Component', {
 *          override: 'Ext.Component',
 *          myMatcher: function() { return false; }
 *      });
 *
 *      Ext.define('My.Panel', {
 *          extend: 'Ext.panel.Panel',
 *          requires: ['My.Component'],     // Ensure that Component override is applied
 *          myMatcher: function(selector) {
 *              return selector === 'myPanel';
 *          }
 *      });
 *
 * After that you can use a selector with your custom matcher to find all instances
 * of `My.Panel`:
 *
 *      Ext.ComponentQuery.query("{myMatcher('myPanel')}");
 *
 * However if you really need to use a custom matcher, you may find it easier to implement
 * a custom Pseudo class instead (see below).
 *
 * ## Conditional matching
 *
 * Attribute matchers can be combined to select only Components that match **all**
 * conditions (logical AND operator):
 *
 *     Ext.ComponentQuery.query('panel[cls~=my-cls][floating=true][title$="sales data"]');
 *
 * E.g., the query above will match only a Panel-descended Component that has 'my-cls'
 * CSS class *and* is floating *and* with a title that ends with "sales data".
 *
 * Expressions separated with commas will match any Component that satisfies
 * *either* expression (logical OR operator):
 *
 *     Ext.ComponentQuery.query('field[fieldLabel^=User], field[fieldLabel*=password]');
 *
 * E.g., the query above will match any field with field label starting with "User",
 * *or* any field that has "password" in its label.
 *
 * If you need to include a comma in an attribute matching expression, escape it with a
 * backslash:
 *
 *     Ext.ComponentQuery.query('field[fieldLabel^="User\\, foo"], field[fieldLabel*=password]');
 *
 * ## Pseudo classes
 *
 * Pseudo classes may be used to filter results in the same way as in
 * {@link Ext.dom.Query}. There are five default pseudo classes:
 *
 * * `not` Negates a selector.
 * * `first` Filters out all except the first matching item for a selector.
 * * `last` Filters out all except the last matching item for a selector.
 * * `focusable` Filters out all except Components which by definition and configuration are
 *      potentially able to recieve focus, regardless of their current state
 * * `canfocus` Filters out all except Components which are curently able to recieve focus.
 *      That is, they are defined and configured focusable, and they are also visible and enabled.
 * * `nth-child` Filters Components by ordinal position in the selection.
 * * `scrollable` Filters out all except Components which are scrollable.
 * * `visible` Filters out hidden Components. May test deep visibility using `':visible(true)'`
 *
 * These pseudo classes can be used with other matchers or without them:
 *
 *      // Select first direct child button in any panel
 *      Ext.ComponentQuery.query('panel > button:first');
 *
 *      // Select last field in Profile form
 *      Ext.ComponentQuery.query('form[title=Profile] field:last');
 *
 *      // Find first focusable Component in a panel and focus it
 *      panel.down(':canfocus').focus();
 *
 *      // Select any field that is not hidden in a form
 *      form.query('field:not(hiddenfield)');
 *
 *      // Find last scrollable Component and reset its scroll positions.
 *      tabpanel.down(':scrollable[hideMode=display]:last').getScrollable().scrollTo(0, 0);
 *
 * Pseudo class `nth-child` can be used to find any child Component by its
 * position relative to its siblings. This class' handler takes one argument
 * that specifies the selection formula as `Xn` or `Xn+Y`:
 *
 *      // Find every odd field in a form
 *      form.query('field:nth-child(2n+1)'); // or use shortcut: :nth-child(odd)
 *
 *      // Find every even field in a form
 *      form.query('field:nth-child(2n)');   // or use shortcut: :nth-child(even)
 *
 *      // Find every 3rd field in a form
 *      form.query('field:nth-child(3n)');
 *
 * Pseudo classes can be combined to further filter the results, e.g., in the
 * form example above we can modify the query to exclude hidden fields:
 *
 *      // Find every 3rd non-hidden field in a form
 *      form.query('field:not(hiddenfield):nth-child(3n)');
 *
 * Note that when combining pseudo classes, whitespace is significant, i.e.
 * there should be no spaces between pseudo classes. This is a common mistake;
 * if you accidentally type a space between `field` and `:not`, the query
 * will not return any result because it will mean "find *field's children
 * Components* that are not hidden fields...".
 *
 * ## Custom pseudo classes
 *
 * It is possible to define your own custom pseudo classes. In fact, a
 * pseudo class is just a property in `Ext.ComponentQuery.pseudos` object
 * that defines pseudo class name (property name) and pseudo class handler
 * (property value):
 *
 *     // Function receives array and returns a filtered array.
 *     Ext.ComponentQuery.pseudos.invalid = function(items) {
 *         var i = 0, l = items.length, c, result = [];
 *         for (; i < l; i++) {
 *             if (!(c = items[i]).isValid()) {
 *                 result.push(c);
 *             }
 *         }
 *         return result;
 *     };
 * 
 *     var invalidFields = myFormPanel.query('field:invalid');
 *     if (invalidFields.length) {
 *         invalidFields[0].getEl().scrollIntoView(myFormPanel.body);
 *         for (var i = 0, l = invalidFields.length; i < l; i++) {
 *             invalidFields[i].getEl().frame("red");
 *         }
 *     }
 *
 * Pseudo class handlers can be even more flexible, with a selector
 * argument used to define the logic:
 *
 *      // Handler receives array of itmes and selector in parentheses
 *      Ext.ComponentQuery.pseudos.titleRegex = function(components, selector) {
 *          var i = 0, l = components.length, c, result = [], regex = new RegExp(selector);
 *          for (; i < l; i++) {
 *              c = components[i];
 *              if (c.title && regex.test(c.title)) {
 *                  result.push(c);
 *              }
 *          }
 *          return result;
 *      }
 *
 *      var salesTabs = tabPanel.query('panel:titleRegex("sales\\s+for\\s+201[123]")');
 *
 * Be careful when using custom pseudo classes with MVC Controllers: when
 * you use a pseudo class in Controller's `control` or `listen` component
 * selectors, the pseudo class' handler function will be called very often
 * and may slow down your application significantly. A good rule of thumb
 * is to always specify Component xtype with the pseudo class so that the
 * handlers are only called on Components that you need, and try to make
 * the condition checks as cheap in terms of execution time as possible.
 * Note how in the example above, handler function checks that Component
 * *has* a title first, before running regex test on it.
 *
 * ## Query examples
 *
 * Queries return an array of Components. Here are some example queries:
 *
 *     // retrieve all Ext.Panels in the document by xtype
 *     var panelsArray = Ext.ComponentQuery.query('panel');
 *
 *     // retrieve all Ext.Panels within the container with an id myCt
 *     var panelsWithinmyCt = Ext.ComponentQuery.query('#myCt panel');
 *
 *     // retrieve all direct children which are Ext.Panels within myCt
 *     var directChildPanel = Ext.ComponentQuery.query('#myCt > panel');
 *
 *     // retrieve all grids or trees
 *     var gridsAndTrees = Ext.ComponentQuery.query('gridpanel, treepanel');
 *
 *     // Focus first Component
 *     myFormPanel.child(':canfocus').focus();
 *
 *     // Retrieve every odd text field in a form
 *     myFormPanel.query('textfield:nth-child(odd)');
 *
 *     // Retrieve every even field in a form, excluding hidden fields
 *     myFormPanel.query('field:not(hiddenfield):nth-child(even)');
 *
 *     // Retrieve every scrollable in a tabpanel
 *     tabpanel.query(':scrollable');
 *
 * For easy access to queries based from a particular Container see the
 * {@link Ext.container.Container#query}, {@link Ext.container.Container#down} and
 * {@link Ext.container.Container#child} methods. Also see
 * {@link Ext.Component#up}.
 */

/**
 * @method query
 * Returns an array of matched Components from within the passed root object.
 *
 * This method filters returned Components in a similar way to how CSS selector based DOM
 * queries work using a textual selector string.
 *
 * See class summary for details.
 *
 * @param {String} selector The selector string to filter returned Components.
 * @param {Ext.container.Container} [root] The Container within which to perform the query.
 * If omitted, all Components within the document are included in the search.
 *
 * This parameter may also be an array of Components to filter according to the selector.
 * @return {Ext.Component[]} The matched Components.
 *
 * @member Ext.ComponentQuery
 */

/**
 * @method visitPreOrder
 * Traverses the tree rooted at the passed root in pre-order mode, calling the passed function on the nodes at each level.
 * That is the function is called upon each node **before** being called on its children).
 *
 * For an object to be queryable, it must implement the `getRefItems` method which returns all
 * immediate child items.
 *
 * This method is used at each level down the cascade. Currently {@link Ext.Component Component}s
 * and {@link Ext.data.TreeModel TreeModel}s are queryable.
 *
 * If you have tree-structured data, you can make your nodes queryable, and use ComponentQuery on them.
 *
 * @param {Object} selector A ComponentQuery selector used to filter candidate nodes before calling the function.
 * An empty string matches any node.
 * @param {String} root The root queryable object to start from.
 * @param {Function} fn The function to call. Return `false` to abort the traverse.
 * @param {Object} fn.node The node being visited.
 * @param {Object} [scope] The context (`this` reference) in which the function is executed.
 * @param {Array} [extraArgs] A set of arguments to be appended to the function's argument list to pass down extra data known to the caller
 * **after** the node being visited.
 */

/**
 * @method visitPostOrder
 * Traverses the tree rooted at the passed root in post-order mode, calling the passed function on the nodes at each level.
 * That is the function is called upon each node **after** being called on its children).
 *
 * For an object to be queryable, it must implement the `getRefItems` method which returns all
 * immediate child items.
 *
 * This method is used at each level down the cascade. Currently {@link Ext.Component Component}s
 * and {@link Ext.data.TreeModel TreeModel}s are queryable.
 *
 * If you have tree-structured data, you can make your nodes queryable, and use ComponentQuery on them.
 *
 * @param {Object} selector A ComponentQuery selector used to filter candidate nodes before calling the function.
 * An empty string matches any node.
 * @param {String} root The root queryable object to start from.
 * @param {Function} fn The function to call. Return `false` to abort the traverse.
 * @param {Object} fn.node The node being visited.
 * @param {Object} [scope] The context (`this` reference) in which the function is executed.
 * @param {Array} [extraArgs] A set of arguments to be appended to the function's argument list to pass down extra data known to the caller
 * **after** the node being visited.
 */

/**
 * @method is
 * Tests whether the passed Component matches the selector string.
 * An empty selector will always match.
 *
 * @param {Ext.Component} component The Component to test
 * @param {String} selector The selector string to test against.
 * @param {Ext.Component} [root=null] The root component.
 * @return {Boolean} True if the Component matches the selector.
 */

/**
 * @method all
 * Same as {@link Ext.ComponentQuery#query}.
 * @param {String} selector The selector string to filter returned Components.
 * @param {Ext.container.Container} [root] The Container within which to perform the query.
 * If omitted, all Components within the document are included in the search.
 *
 * This parameter may also be an array of Components to filter according to the selector.
 * @return {Ext.Component[]} The matched Components.
 * @member Ext
 */

/**
 * @method first
 * Returns the first match to the given component query.
 * See {@link Ext.ComponentQuery#query}.
 * @param {String} selector The selector string to filter returned Component.
 * @param {Ext.container.Container} [root] The Container within which to perform the query.
 * If omitted, all Components within the document are included in the search.
 *
 * This parameter may also be an array of Components to filter according to the selector.
 * @return {Ext.Component} The first matched Component or `null`.
 * @member Ext
 */
