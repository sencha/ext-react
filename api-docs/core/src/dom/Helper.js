/**
 * @class Ext.dom.Helper
 * @alternateClassName Ext.DomHelper
 * @singleton
 *
 * The DomHelper class provides a layer of abstraction from DOM and transparently supports creating elements via DOM or
 * using HTML fragments. It also has the ability to create HTML fragment templates from your DOM building code.
 *
 * ## DomHelper element specification object
 *
 * A specification object is used when creating elements. Attributes of this object are assumed to be element
 * attributes, except for 4 special attributes:
 *
 * * **tag**: The tag name of the element
 * * **children (or cn)**: An array of the same kind of element definition objects to be created and appended. These
 * can be nested as deep as you want.
 * * **cls**: The class attribute of the element. This will end up being either the "class" attribute on a HTML
 * fragment or className for a DOM node, depending on whether DomHelper is using fragments or DOM.
 * * **html**: The innerHTML for the element
 *
 * ## Insertion methods
 *
 * Commonly used insertion methods:
 *
 * * {@link #append}
 * * {@link #insertBefore}
 * * {@link #insertAfter}
 * * {@link #overwrite}
 * * {@link #insertHtml}
 *
 * ## Example
 *
 * This is an example, where an unordered list with 3 children items is appended to an existing element with id
 * 'my-div':
 *
 *     var dh = Ext.DomHelper; // create shorthand alias
 *     // specification object
 *     var spec = {
 *         id: 'my-ul',
 *         tag: 'ul',
 *         cls: 'my-list',
 *         // append children after creating
 *         children: [     // may also specify 'cn' instead of 'children'
 *             {tag: 'li', id: 'item0', html: 'List Item 0'},
 *             {tag: 'li', id: 'item1', html: 'List Item 1'},
 *             {tag: 'li', id: 'item2', html: 'List Item 2'}
 *         ]
 *     };
 *     var list = dh.append(
 *         'my-div', // the context element 'my-div' can either be the id or the actual node
 *         spec      // the specification object
 *     );
 *
 * Element creation specification parameters in this class may also be passed as an Array of specification objects.
 * This can be used to insert multiple sibling nodes into an existing container very efficiently. For example, to add
 * more list items to the example above:
 *
 *     dh.append('my-ul', [
 *         {tag: 'li', id: 'item3', html: 'List Item 3'},
 *         {tag: 'li', id: 'item4', html: 'List Item 4'}
 *     ]);
 *
 * ## Templating
 *
 * The real power is in the built-in templating. Instead of creating or appending any elements, createTemplate returns
 * a Template object which can be used over and over to insert new elements. Revisiting the example above, we could
 * utilize templating this time:
 *
 *     // create the node
 *     var list = dh.append('my-div', {tag: 'ul', cls: 'my-list'});
 *     // get template
 *     var tpl = dh.createTemplate({tag: 'li', id: 'item{0}', html: 'List Item {0}'});
 *
 *     for(var i = 0; i < 5; i++){
 *         tpl.append(list, i); // use template to append to the actual node
 *     }
 *
 * An example using a template:
 *
 *     var html = '"{0}" href="{1}" class="nav">{2}';
 *
 *     var tpl = new Ext.DomHelper.createTemplate(html);
 *     tpl.append('blog-roll', ['link1', 'http://www.foxmulder.com/', "Fox's Site"]);
 *     tpl.append('blog-roll', ['link2', 'http://www.danascully.org/', "Scully's Site"]);
 *
 * The same example using named parameters:
 *
 *     var html = '"{id}" href="{url}" class="nav">{text}';
 *
 *     var tpl = new Ext.DomHelper.createTemplate(html);
 *     tpl.append('blog-roll', {
 *         id: 'link1',
 *         url: 'http://www.danascully.org/',
 *         text: "Scully's Site"
 *     });
 *     tpl.append('blog-roll', {
 *         id: 'link2',
 *         url: 'http://www.foxmulder.com/',
 *         text: "Fox's Site"
 *     });
 *
 * ## Compiling Templates
 *
 * Templates are applied using regular expressions. The performance is great, but if you are adding a bunch of DOM
 * elements using the same template, you can increase performance even further by "compiling" the template. The way
 * "compile()" works is the template is parsed and broken up at the different variable points and a dynamic function is
 * created and eval'ed. The generated function performs string concatenation of these parts and the passed variables
 * instead of using regular expressions.
 *
 *     var html = '"{id}" href="{url}" class="nav">{text}';
 *
 *     var tpl = new Ext.DomHelper.createTemplate(html);
 *     tpl.compile();
 *
 *     // ... use template like normal
 *
 * ## Performance Boost
 *
 * DomHelper will transparently create HTML fragments when it can. Using HTML fragments instead of DOM can
 * significantly boost performance.
 *
 * Element creation specification parameters may also be strings which are used as innerHTML.
 */

