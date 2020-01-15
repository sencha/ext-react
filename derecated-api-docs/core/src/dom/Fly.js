/**
 * @class Ext.dom.Fly
 * @extend Ext.dom.Element
 * A flyweight Ext.dom.Element that can be dynamically attached to a DOM node.
 * In general this class should not be instantiated directly.  Use {@link Ext#fly}
 * to create and retrieve Fly instances.
 */

/**
 * @property {Boolean} [isFly=true]
 * This is `true` to identify Element flyweights
 */

/**
 * @member Ext
 * @method fly
 * Gets the globally shared flyweight Element, with the passed node as the active
 * element. Do not store a reference to this element - the dom node can be overwritten
 * by other code. {@link Ext#fly} is alias for {@link Ext.dom.Element#fly}.
 *
 * Use this to make one-time references to DOM elements which are not going to be
 * accessed again either by application code, or by Ext's classes. If accessing an
 * element which will be processed regularly, then {@link Ext#get Ext.get} will be
 * more appropriate to take advantage of the caching provided by the
 * {@link Ext.dom.Element} class.
 *
 * If this method is called with and id or element that has already been cached by
 * a previous call to Ext.get() it will return the cached Element instead of the
 * flyweight instance.
 *
 * @param {String/HTMLElement} dom The DOM node or `id`.
 * @param {String} [named] Allows for creation of named reusable flyweights to prevent
 * conflicts (e.g. internally Ext uses "_global").
 * @return {Ext.dom.Element} The shared Element object (or `null` if no matching
 * element was found).
 */
