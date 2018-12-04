/**
 * @class Ext.dom.CompositeElementLite
 * This class encapsulates a *collection* of DOM elements, providing methods to filter members, or to perform collective
 * actions upon the whole set.
 *
 * Although they are not listed, this class supports all of the methods of {@link Ext.dom.Element}. The
 * methods from these classes will be performed on all the elements in this collection.
 *
 * Example:
 *
 *     var els = Ext.select("#some-el div.some-class");
 *     // or select directly from an existing element
 *     var el = Ext.get('some-el');
 *     el.select('div.some-class');
 *
 *     els.setWidth(100); // all elements become 100 width
 *     els.hide(true); // all elements fade out and hide
 *     // or
 *     els.setWidth(100).hide(true);
 *
 * @mixins Ext.dom.Element
 */

/**
 * @property {Boolean} [isComposite=true]
 * `true` in this class to identify an object as an instantiated CompositeElement, or subclass thereof.
 */

/**
 * @cfg bubbleEvents
 */

/**
 * @cfg listeners
 * @hide
 */

/**
 * @property dom
 * @hide
 */

/**
 * @property id
 * @hide
 */
