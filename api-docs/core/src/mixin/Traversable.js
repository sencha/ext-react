/**
 * A Traversable mixin.
 * @class Ext.mixin.Traversable
 * @extend Ext.Mixin
 * @private
 */

/**
 * @method hasParent
 * Returns `true` if this component has a parent.
 * @return {Boolean} `true` if this component has a parent.
 */

/**
 * @method is
 * @template
 * Selector processing function for use by {@link #nextSibling},{@link #previousibling},
 * {@link #nextNode},and {@link #previousNode}, to filter candidate nodes.
 *
 * The base implementation returns true. Classes which mix in `Traversable` may implement
 * their own implementations. `@link{Ext.Widget}` does this to implement
 * {@link Ext.ComponentQuery} based filterability.
 * @returns {boolean}
 */

/**
 * @method getParent
 * Returns the parent of this component, if it has one.
 * @return {Ext.Component} The parent of this component.
 */

/**
 * @method previousNode
 * Returns the previous node in the Component tree in tree traversal order.
 *
 * Note that this is not limited to siblings, and if invoked upon a node with no matching siblings, will walk the
 * tree in reverse order to attempt to find a match. Contrast with {@link #previousSibling}.
 * @param {String} [selector] A {@link Ext.ComponentQuery ComponentQuery} selector to filter the preceding nodes.
 * @param includeSelf (private)
 * @return {Ext.Component} The previous node (or the previous node which matches the selector).
 * Returns `null` if there is no matching node.
 */

/**
 * @method previousSibling
 * Returns the previous sibling of this Component.
 *
 * Optionally selects the previous sibling which matches the passed {@link Ext.ComponentQuery ComponentQuery}
 * selector.
 *
 * May also be referred to as **`prev()`**
 *
 * Note that this is limited to siblings, and if no siblings of the item match, `null` is returned. Contrast with
 * {@link #previousNode}
 * @param {String} [selector] A {@link Ext.ComponentQuery ComponentQuery} selector to filter the preceding items.
 * @return {Ext.Component} The previous sibling (or the previous sibling which matches the selector).
 * Returns `null` if there is no matching sibling.
 */

/**
 * @method nextNode
 * Returns the next node in the Component tree in tree traversal order.
 *
 * Note that this is not limited to siblings, and if invoked upon a node with no matching siblings, will walk the
 * tree to attempt to find a match. Contrast with {@link #nextSibling}.
 * @param {String} [selector] A {@link Ext.ComponentQuery ComponentQuery} selector to filter the following nodes.
 * @param includeSelf (private)
 * @return {Ext.Component} The next node (or the next node which matches the selector).
 * Returns `null` if there is no matching node.
 */

/**
 * @method nextSibling
 * Returns the next sibling of this Component.
 *
 * Optionally selects the next sibling which matches the passed {@link Ext.ComponentQuery ComponentQuery} selector.
 *
 * May also be referred to as **`next()`**
 *
 * Note that this is limited to siblings, and if no siblings of the item match, `null` is returned. Contrast with
 * {@link #nextNode}
 * @param {String} [selector] A {@link Ext.ComponentQuery ComponentQuery} selector to filter the following items.
 * @return {Ext.Component} The next sibling (or the next sibling which matches the selector).
 * Returns `null` if there is no matching sibling.
 */
