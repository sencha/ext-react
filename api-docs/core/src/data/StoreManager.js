/**
 * @class Ext.data.StoreManager
 * @extend Ext.util.MixedCollection
 * @singleton
 *
 * Contains a collection of all stores that are created that have an identifier. An identifier can be assigned by
 * setting the {@link Ext.data.AbstractStore#storeId storeId} property. When a store is in the StoreManager, it can be
 * referred to via it's identifier:
 *
 *     new Ext.data.Store({
 *         model: 'SomeModel',
 *         storeId: 'myStore'
 *     });
 *
 *     var store = Ext.data.StoreManager.lookup('myStore');
 *
 * Also note that the {@link #lookup} method is aliased to {@link Ext#getStore} for convenience.
 *
 * If a store is registered with the StoreManager, you can also refer to the store by it's identifier when registering
 * it with any Component that consumes data from a store:
 *
 *     new Ext.data.Store({
 *         model: 'SomeModel',
 *         storeId: 'myStore'
 *     });
 *
 *     Ext.create('Ext.view.View', {
 *         store: 'myStore',
 *         // other configuration here
 *     });
 *
 */

/**
 * @method regsiter
 * Registers one or more Stores with the StoreManager. You do not normally need to register stores manually. Any
 * store initialized with a {@link Ext.data.Store#storeId} will be auto-registered.
 * @param {Ext.data.Store...} stores Any number of Store instances
 */

/**
 * @method unregister
 * Unregisters one or more Stores with the StoreManager
 * @param {String/Object...} stores Any number of Store instances or ID-s
 */

/**
 * @method lookup
 * Gets a registered Store by id
 * @param {String/Object} store The id of the Store, or a Store instance, or a store configuration
 * @param {String} [defaultType] The store type to create when used with store configuration and there
 * is no type specified on the config.
 * @return {Ext.data.Store}
 */

/**
 * Creates a new store for the given id and config, then registers it with the {@link Ext.data.StoreManager Store Manager}.
 * Sample usage:
 *
 *     Ext.regStore('AllUsers', {
 *         model: 'User'
 *     });
 *
 *     // the store can now easily be used throughout the application
 *     new Ext.List({
 *         store: 'AllUsers',
 *         ... other config
 *     });
 *
 * @param {String/Object} id The id to set on the new store, or the `config` object
 * that contains the `storeId` property.
 * @param {Object} config The store config if the first parameter (`id`) is just the
 * id.
 * @member Ext
 * @method regStore
 */

/**
 * @method getStore
 * @inheritdoc Ext.data.StoreManager#method-lookup
 * @member Ext
 * Shortcut to {@link Ext.data.StoreManager#lookup}.
 */
