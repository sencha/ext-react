/**
 * @class Ext.util.LocalStorage
 * This class provides a common API to LocalStorage with backwards compatibility for IE.
 * 
 * The primary aspects of this API match the HTML5 standard API except that this class
 * provides a scoping mechanism to isolate property values by instance. This scope is
 * determined from the `id` property. Further, this class does not expose the number of
 * keys in the store as a `length` property as this cannot be maintained reliably without
 * undue cost. Instead there is a `getKeys` method that returns the cached array of keys
 * which is lazily populated on first call.
 * 
 * For example:
 * 
 *      var store = new Ext.util.LocalStorage({
 *              id: 'foo'
 *          });
 * 
 *      store.setItem('bar', 'stuff');
 *      
 *      // Equivalent to:
 *      window.localStorage.setItem('foo-bar', 'stuff');
 * 
 * In all cases, the `id` property is only used by the underlying storage and should not
 * be needed in item access calls or appear when enumerating keys.
 * 
 * To continue with the previous example:
 * 
 *      var keys = store.getKeys();
 *      console.log(keys.length);   // logs 1
 *      console.log(store.key(0));  // logs "bar"
 *
 * ## Sharing Instances
 * 
 * The management of the underlying storage can be broken if multiple instances of this
 * class are created with the same `id` simultaneously. To avoid creating multiple instances
 * with the same `id`, use the `get` method and it will lazily create and share a single
 * instance. When you are done with the shared instance, call `release`.
 * 
 *      var storage = Ext.util.LocalStorage.get('id');
 *      
 *      ...
 *      
 *      storage.release(); // do not call `destroy` as others may be using this object
 *
 * **IMPORTANT:** Do not mix direction instantiation and `get` with the same `id`.
 * 
 * ## Legacy IE
 * 
 * Older IE browsers (specifically IE7 and below) do not support `localStorage` so this
 * class provides equivalent support using the IE proprietary persistence mechanism: the
 * [`userData` behavior](http://msdn.microsoft.com/en-us/library/ms531424(VS.85).aspx). In
 * this mode, the `id` serves as name passed to the `load` and `save` methods and as the
 * suffix on the DOM element added to the `head`.
 * 
 * In this mode, writes to the underlying storage are buffered and delayed for performance
 * reasons. This can be managed using the `flushDelay` config or by directly calling the
 * `save` method.
 *
 * @since 4.2.2
 */

/**
 * The unique identifier for this store. This config is required to scope this storage
 * distinctly from others. Ultimately, this is used to set a prefix on all keys.
 * @cfg {String} id
 */

/**
 * @cfg {Boolean} [lazyKeys=true]
 * Determines if the keys collection is continuously maintained by this object. By
 * default the keys array is lazily fetched from the underlying store and when keys
 * are removed, the array is discarded. This heuristic tends to be safer than doing
 * the linear removal and array rippling to remove keys from the array on each call
 * to `removeItem`. If the cost of scanning `localStorage` for keys is high enough
 * and if the keys are frequently needed, then this flag can be set to `false` to
 * instruct this class to maintain the keys array once it has been determined.
 * @cfg {Boolean} [lazyKeys=true]
 */

/**
 * @cfg {String} [prefix=""]
 * The prefix to apply to all `localStorage` keys manages by this instance. This does
 * not apply to the legacy IE mechanism but only to the HTML5 `localStorage` keys. If
 * not provided, the `id` property initializes this value with `"id-"`.
 * @cfg {String} [prefix]
 */

/**
 * @cfg {Boolean} [session=false]
 * Specify this as `true` to use `sessionStorage` instead of the default `localStoreage`.
 * This option is not supported in legacy IE browsers (IE 6 and 7) and is ignored.
 * @cfg {Boolean} [session=false]
 */

/**
 * @method get
 * Returns a shared instance of the desired local store given its `id`. When you
 * are finished with the returned object call the `release` method:
 *
 *      var store = Ext.util.LocalStorage.get('foo');
 *
 *      // .. use store
 *
 *      store.release();
 *
 * **NOTE:** Do not mix this call with direct instantiation of the same `id`.
 * @param {String/Object} id The `id` of the desired instance or a config object
 * with an `id` property at a minimum.
 * @return {Ext.util.LocalStorage} The desired instance, created if needed.
 */

/**
 * @method destroy
 * Destroys this instance and for legacy IE, ensures data is flushed to persistent
 * storage. This method should not be called directly on instances returned by the
 * `get` method. Call `release` instead for such instances.
 *
 * *NOTE:* For non-legacy IE browsers, there is no harm in failing to call this
 * method. In legacy IE, however, failing to call this method can result in memory
 * leaks.
 */

/**
 * @method getKeys
 * Returns the keys for this storage.
 * @return {String[]} The keys for this storage. This array should be considered as
 * readonly.
 */

/**
 * @method release
 * Call this method when finished with an instance returned by `get` instead of calling
 * `destroy`. When the last shared use of this instance calls `release`, the `destroy`
 * method is called automatically.
 *
 * *NOTE:* Failing to call this method will result in memory leaks.
 */

/**
 * @method clear
 * Removes all of the keys of this storage.
 * **NOTE:** This method conforms to the standard HTML5 Storage interface.
 */

/**
 * @method key
 * Returns the specified key given its `index`. These keys have the scoping prefix
 * removed so they match what was passed to `setItem`.
 * **NOTE:** This method conforms to the standard HTML5 Storage interface.
 * @param {Number} index The index of the desired key.
 * @return {String} The key.
 */

/**
 * @method getItem
 * Returns the value associated with the given `key`.
 * **NOTE:** This method conforms to the standard HTML5 Storage interface.
 * @param {String} key The key.
 * @return {String} The value associated with the given `key`.
 */

/**
 * @method removeItem
 * Removes the value associated with the given `key`.
 * **NOTE:** This method conforms to the standard HTML5 Storage interface.
 * @param {String} key The key.
 */

/**
 * @method setItem
 * Sets the value associated with the given `key`.
 * **NOTE:** This method conforms to the standard HTML5 Storage interface.
 * @param {String} key The key.
 * @param {String} value The new associated value for `key`.
 */

/**
 * The number of milliseconds to delay writing changes to the underlying store.
 * This applies only to legacy IE mode and helps batch multiple writes into one
 * flush to storage.
 * @cfg {Number} [flushDelay=1]
 */

/**
 * @method save
 * This method ensures the content of the store is saved to the underlying storage.
 * This applies only to legacy IE. This is not normally called by user code but can
 * be called to ensure storage is saved.
 * @param {Number} [delay=0]
 */
