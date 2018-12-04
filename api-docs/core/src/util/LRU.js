/**
 * This class manages a double-linked list. It provides an absolutely minimal container
 * interface.
 *
 * @class Ext.util.LRU
 * @private
 * @since 6.5.0
 */

/**
 * @method add
 * Adds an item to the list with the specified `key`. Items are added at the
 * front (MRU) of the list.
 * @param {String} key
 * @param {Object} value
 */

/**
 * @method clear
 * Removes all items from this list optionally calling a function for each
 * remove item.
 * @param {Function} [fn] A function to call for each removed item.
 * @param {Object} fn.key The key of the removed item.
 * @param {Object} fn.value The removed item.
 * @param {Object} [scope] The `this` pointer for `fn`.
 */

/**
 * @method each
 * Calls the given function `fn` for each item in the list. The items will be
 * passed to `fn` from most-to-least recently added or touched.
 * @param {Function} fn The function to call for each cache item.
 * @param {String} fn.key The key for the item.
 * @param {Object} fn.value The item.
 * @param {Object} [scope] The `this` pointer to use for `fn`.
 */

/**
 * @method prune
 * Removes the item at the end (LRU) of the list. Optionally the item can be passed
 * to a callback function. If the list is empty, no callback is made and this
 * method will return `undefined`.
 * @param {Function} fn The function to call for the removed item.
 * @param {Object} fn.key The key of the removed item.
 * @param {Object} fn.value The removed item.
 * @param {Object} [scope] The `this` pointer to use for `fn`.
 * @return {Object} The removed item.
 */

/**
 * @method remove
 * Removes an item from the list given its key.
 * @param {String} key The key of the item to remove.
 * @return {Object} The removed item or `undefined` if the key was not found.
 */

/**
 * @method touch
 * Moves the item with the given key to the front (MRU) of the list.
 * @param {String} key The key of the item to move to the front.
 */

/**
 * @method trim
 * Reduces the length of the list to be no more than the specified `size`, removing
 * items from the end of the list as necessary. Optionally each removed item can
 * be passed to a callback `fn`.
 * @param {Function} [fn] A function to call for each removed item.
 * @param {Object} fn.key The key of the removed item.
 * @param {Object} fn.value The removed item.
 * @param {Object} [scope] The `this` pointer for `fn`.
 */
