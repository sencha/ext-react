/**
 * @class Ext.mixin.StoreWatcher
 * This mixin is used to track and listen to the `store` of its `owner` component. The
 * component must support a `storechange` event (as do grids and dataviews) as well as
 * a `getStore` method.
 * @since 6.5.0
 */

/**
 * @cfg {Ext.Base} owner
 * @accessor
 */

/**
 * @cfg {Object} ownerListeners
 * The events and associated handlers to which to listen on the `owner`.
 * @accessor
 */

/**
 * @cfg {Object} sourceListeners
 * The events and associated handlers to which to listen on the `source` of the
 * connected `store`. That is, these listeners are attached to the unfiltered
 * collection. When `remoteFilter` is `true` there is no unfiltered collection so
 * these listeners are attached to the only collection that exists (which is
 * filtered by the server).
 * @accessor
 */

/**
 * @cfg {Object} storeListeners
 * The events and associated handlers to which to listen on the `store` of the
 * `owner`.
 * @accessor
 */
