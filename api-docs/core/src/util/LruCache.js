/**
 * @private
 * @class Ext.util.LruCache
 * @extend Ext.util.HashMap
 * A linked {@link Ext.util.HashMap HashMap} implementation which maintains most recently accessed
 * items at the end of the list, and purges the cache down to the most recently accessed {@link #maxSize} items
 * upon add.
 */

/**
 * @cfg {Number} maxSize
 * The maximum size the cache is allowed to grow to before further additions cause
 * removal of the least recently used entry.
 * @accessor
 */

/**
 * @method add
 * @inheritdoc
 */

/**
 * @method get
 * @inheritdoc
 */

/**
 * @method clear
 * @inheritdoc
 */

/**
 * @method each
 * Executes the specified function once for each item in the cache.
 * Returning false from the function will cease iteration.
 *
 * By default, iteration is from least recently used to most recent.
 *
 * The parameters passed to the function are:
 * <div class="mdetail-params"><ul>
 * <li><b>key</b> : String<p class="sub-desc">The key of the item</p></li>
 * <li><b>value</b> : Number<p class="sub-desc">The value of the item</p></li>
 * <li><b>length</b> : Number<p class="sub-desc">The total number of items in the hash</p></li>
 * </ul></div>
 * @param {Function} fn The function to execute.
 * @param {Object} scope The scope (<code>this</code> reference) to execute in. Defaults to this LruCache.
 * @param {Boolean} [reverse=false] Pass <code>true</code> to iterate the list in reverse (most recent first) order.
 * @return {Ext.util.LruCache} this
 */

/**
 * @method clone
 * Performs a shallow copy on this haLruCachesh.
 * @return {Ext.util.HashMap} The new hash object.
 */

/**
 * @method prune
 * Purge the least recently used entries if the maxSize has been exceeded.
 */
