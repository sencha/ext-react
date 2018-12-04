/**
 * @class Ext.util.AbstractMixedCollection
 * @extend Ext.Base
 * @mixins Ext.util.Observable
 * @private
 */

/**
 * @property {Boolean} [isMixedCollection=true]
 * `true` in this class to identify an object as an instantiated MixedCollection, or subclass thereof.
 */

/**
 * @event clear
 * Fires when the collection is cleared.
 * @since 1.1.0
 */

/**
 * @event add
 * Fires when an item is added to the collection.
 * @param {Number} index The index at which the item was added.
 * @param {Object} o The item added.
 * @param {String} key The key associated with the added item.
 * @since 1.1.0
 */

/**
 * @event replace
 * Fires when an item is replaced in the collection.
 * @param {String} key he key associated with the new added.
 * @param {Object} old The item being replaced.
 * @param {Object} new The new item.
 * @since 1.1.0
 */

/**
 * @event remove
 * Fires when an item is removed from the collection.
 * @param {Object} o The item being removed.
 * @param {String} key The key associated with the removed item.
 * @since 1.1.0
 */

/**
 * @cfg {Boolean} [allowFunctions=false]
 * Specify <code>true</code> if the {@link #addAll}
 * function should add function references to the collection. Defaults to
 * <code>false</code>.
 * @since 3.4.0
 */
