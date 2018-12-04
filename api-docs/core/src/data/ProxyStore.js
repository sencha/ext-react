/**
 * @class Ext.data.ProxyStore
 * @extend Ext.data.AbstractStore
 *
 * ProxyStore is a superclass of {@link Ext.data.Store} and {@link Ext.data.BufferedStore}. It's never used directly,
 * but offers a set of methods used by both of those subclasses.
 *
 * We've left it here in the docs for reference purposes, but unless you need to make a whole new type of Store, what
 * you're probably looking for is {@link Ext.data.Store}. If you're still interested, here's a brief description of what
 * ProxyStore is and is not.
 *
 * ProxyStore provides the basic configuration for anything that can be considered a Store. It expects to be
 * given a {@link Ext.data.Model Model} that represents the type of data in the Store. It also expects to be given a
 * {@link Ext.data.proxy.Proxy Proxy} that handles the loading of data into the Store.
 *
 * ProxyStore provides a few helpful methods such as {@link #method-load} and {@link #sync}, which load and save data
 * respectively, passing the requests through the configured {@link #proxy}.
 *
 * Built-in Store subclasses add extra behavior to each of these functions. Note also that each ProxyStore subclass
 * has its own way of storing data - in {@link Ext.data.Store} the data is saved as a flat {@link Ext.util.Collection Collection},
 * whereas in {@link Ext.data.BufferedStore BufferedStore} we use a {@link Ext.data.PageMap} to maintain a client side cache of pages of records.
 *
 * The store provides filtering and sorting support. This sorting/filtering can happen on the client side
 * or can be completed on the server. This is controlled by the {@link Ext.data.Store#remoteSort remoteSort} and
 * {@link Ext.data.Store#remoteFilter remoteFilter} config options. For more information see the {@link #method-sort} and
 * {@link Ext.data.Store#filter filter} methods.
 */

/**
 * @property {Object} lastOptions
 * Property to hold the last options from a {@link #method-load} method call. This object is used for the {@link #method-reload}
 * to reuse the same options. Please see {@link #method-reload} for a simple example on how to use the lastOptions property.
 */

/**
 * @event beforeload
 * Fires before a request is made for a new data object. If the beforeload handler returns false the load
 * action will be canceled.
 * @param {Ext.data.Store} store This Store
 * @param {Ext.data.operation.Operation} operation The Ext.data.operation.Operation object that will be passed to the Proxy to
 * load the Store
 * @since 1.1.0
 */

/**
 * @event load
 * Fires whenever the store reads data from a remote data source.
 * @param {Ext.data.Store} this
 * @param {Ext.data.Model[]} records An array of records
 * @param {Boolean} successful True if the operation was successful.
 * @param {Ext.data.operation.Read} operation The
 * {@link Ext.data.operation.Read Operation} object that was used in the data
 * load call
 * @since 1.1.0
 */

/**
 * @event write
 * Fires whenever a successful write has been made via the configured {@link #proxy Proxy}
 * @param {Ext.data.Store} store This Store
 * @param {Ext.data.operation.Operation} operation The {@link Ext.data.operation.Operation Operation} object that was used in
 * the write
 * @since 3.4.0
 */

/**
 * @event beforesync
 * Fired before a call to {@link #sync} is executed. Return false from any listener to cancel the sync
 * @param {Object} options Hash of all records to be synchronized, broken down into create, update and destroy
 */

/**
 * @event metachange
 * Fires when this store's underlying reader (available via the proxy) provides new metadata.
 * Metadata usually consists of new field definitions, but can include any configuration data
 * required by an application, and can be processed as needed in the event handler.
 * This event is currently only fired for JsonReaders.
 * @param {Ext.data.Store} this
 * @param {Object} meta The JSON metadata
 * @since 1.1.0
 */

/**
 * @method getTotalCount
 * Returns the total number of {@link Ext.data.Model Model} instances that the {@link Ext.data.proxy.Proxy Proxy}
 * indicates exist. This will usually differ from {@link #getCount} when using paging - getCount returns the
 * number of records loaded into the Store at the moment, getTotalCount returns the number of records that
 * could be loaded into the Store if the Store contained all data
 * @return {Number} The total number of Model instances available via the Proxy. 0 returned if
 * no value has been set via the reader.
 */

/**
 * @cfg {String/Ext.data.Model} [model=undefined]
 * Name of the {@link Ext.data.Model Model} associated with this store. See
 * {@link Ext.data.Model#entityName}.
 *
 * May also be the actual Model subclass.
 *
 * This config is required for the store to be able to read data unless you have defined
 * the {@link #fields} config which will create an anonymous `Ext.data.Model`.
 * @accessor
 */

/**
 * @cfg [fields=undefined]
 * @inheritdoc Ext.data.Model#cfg-fields
 *
 * @localdoc **Note:** In general, this configuration option should only be used
 * for simple stores like a two-field store of
 * {@link Ext.form.field.ComboBox ComboBox}. For anything more complicated, such
 * as specifying a particular id property or associations, a
 * {@link Ext.data.Model Model} should be defined and specified for the
 * {@link #model} config.
 *
 * @accessor
 * @since 2.3.0
 */

/**
 * @cfg {String/Ext.data.proxy.Proxy/Object} [proxy=undefined]
 * The Proxy to use for this Store. This can be either a string, a config object or a Proxy instance -
 * see {@link #setProxy} for details.
 * @accessor
 * @since 1.1.0
 */

/**
 * @cfg {Boolean/Object} [autoLoad=undefined]
 * If data is not specified, and if autoLoad is true or an Object, this store's load method is automatically called
 * after creation. If the value of autoLoad is an Object, this Object will be passed to the store's load method.
 *
 * It's important to note that {@link Ext.data.TreeStore Tree Stores} will
 * load regardless of autoLoad's value if expand is set to true on the
 * {@link Ext.data.TreeStore#root root node}.
 *
 * @accessor
 * @since 2.3.0
 */

/**
 * @cfg {Boolean} [autoSync=false]
 * True to automatically sync the Store with its Proxy after every edit to one of its Records. Defaults to false.
 * @accessor
 */

/**
 * @cfg {String} [batchUpdateMode='operation']
 * Sets the updating behavior based on batch synchronization. 'operation' (the default) will update the Store's
 * internal representation of the data after each operation of the batch has completed, 'complete' will wait until
 * the entire batch has been completed before updating the Store's data. 'complete' is a good choice for local
 * storage proxies, 'operation' is better for remote proxies, where there is a comparatively high latency.
 * @accessor
 */

/**
 * @cfg {Boolean} [sortOnLoad=true]
 * If true, any sorters attached to this Store will be run after loading data, before the datachanged event is fired.
 * Defaults to true, ignored if {@link Ext.data.Store#remoteSort remoteSort} is true
 * @accessor
 */

/**
 * @cfg {Boolean} [trackRemoved=true]
 * This config controls whether removed records are remembered by this store for
 * later saving to the server.
 * @accessor
 */

/**
 * @cfg {Boolean} [asynchronousLoad=undefined]
 * This defaults to `true` when this store's {@link #cfg-proxy} is asynchronous, such as an
 * {@link Ext.data.proxy.Ajax Ajax proxy}.
 *
 * When the proxy is synchronous, such as a {@link Ext.data.proxy.Memory} memory proxy, this
 * defaults to `false`.
 *
 * *NOTE:* This does not cause synchronous Ajax requests if configured `false` when an Ajax proxy
 * is used. It causes immediate issuing of an Ajax request when {@link #method-load} is called
 * rather than issuing the request at the end of the current event handler run.
 *
 * What this means is that when using an Ajax proxy, calls to
 * {@link #method-load} do not fire the request to the remote resource
 * immediately, but schedule a request to be made. This is so that multiple
 * requests are not fired when mutating a store's remote filters and sorters (as
 * happens during state restoration). The request is made only once after all
 * relevant store state is fully set.
 *
 * @accessor
 * @since 6.0.1
 */

/**
 * @method getUpdatedRecords
 * Returns all valid, non-phantom Model instances that have been updated in the Store but not yet synchronized with the Proxy.
 * @return {Ext.data.Model[]} The updated Model instances
 */

/**
 * @method getModifiedRecords
 * Gets all {@link Ext.data.Model records} added or updated since the last commit. Note that the order of records
 * returned is not deterministic and does not indicate the order in which records were modified. Note also that
 * removed records are not included (use {@link #getRemovedRecords} for that).
 * @return {Ext.data.Model[]} The added and updated Model instances
 */

/**
 * @method getRemovedRecords
 * Returns any records that have been removed from the store but not yet destroyed on the proxy.
 * @return {Ext.data.Model[]} The removed Model instances. Note that this is a *copy* of the store's
 * array, so may be mutated.
 */

/**
 * @method sync
 * Synchronizes the store with its {@link #proxy}. This asks the proxy to batch together any new, updated
 * and deleted records in the store, updating the store's internal representation of the records
 * as each operation completes.
 *
 * @param {Object} [options] Object containing one or more properties supported by the sync method (these get
 * passed along to the underlying proxy's {@link Ext.data.Proxy#batch batch} method):
 *
 * @param {Ext.data.Batch/Object} [options.batch] A {@link Ext.data.Batch} object (or batch config to apply
 * to the created batch). If unspecified a default batch will be auto-created as needed.
 *
 * @param {Function} [options.callback] The function to be called upon completion of the sync.
 * The callback is called regardless of success or failure and is passed the following parameters:
 * @param {Ext.data.Batch} options.callback.batch The {@link Ext.data.Batch batch} that was processed,
 * containing all operations in their current state after processing
 * @param {Object} options.callback.options The options argument that was originally passed into sync
 *
 * @param {Function} [options.success] The function to be called upon successful completion of the sync. The
 * success function is called only if no exceptions were reported in any operations. If one or more exceptions
 * occurred then the failure function will be called instead. The success function is called
 * with the following parameters:
 * @param {Ext.data.Batch} options.success.batch The {@link Ext.data.Batch batch} that was processed,
 * containing all operations in their current state after processing
 * @param {Object} options.success.options The options argument that was originally passed into sync
 *
 * @param {Function} [options.failure] The function to be called upon unsuccessful completion of the sync. The
 * failure function is called when one or more operations returns an exception during processing (even if some
 * operations were also successful). In this case you can check the batch's {@link Ext.data.Batch#exceptions
 * exceptions} array to see exactly which operations had exceptions. The failure function is called with the
 * following parameters:
 * @param {Ext.data.Batch} options.failure.batch The {@link Ext.data.Batch} that was processed, containing all
 * operations in their current state after processing
 * @param {Object} options.failure.options The options argument that was originally passed into sync
 *
 * @param {Object} [options.params] Additional params to send during the sync Operation(s).
 *
 * @param {Object} [options.scope] The scope in which to execute any callbacks (i.e. the `this` object inside
 * the callback, success and/or failure functions). Defaults to the store's proxy.
 *
 * @return {Ext.data.Store} this
 */

/**
 * @method load
 * Marks this store as needing a load. When the current executing event handler exits,
 * this store will send a request to load using its configured {@link #proxy}.
 *
 * Upon return of the data from whatever data source the proxy connected to, the retrieved
 * {@link Ext.data.Model records} will be loaded into this store, and the optional callback will be called.
 * Example usage:
 *
 *     store.load({
 *         scope: this,
 *         callback: function(records, operation, success) {
 *             // the operation object
 *             // contains all of the details of the load operation
 *             console.log(records);
 *         }
 *     });
 *
 * If the callback scope does not need to be set, a function can simply be passed:
 *
 *     store.load(function(records, operation, success) {
 *         console.log('loaded records');
 *     });
 *
 * @param {Object} [options] This is passed into the {@link Ext.data.operation.Operation Operation}
 * object that is created and then sent to the proxy's {@link Ext.data.proxy.Proxy#read} function.
 * In addition to the options listed below, this object may contain properties to configure the
 * {@link Ext.data.operation.Operation Operation}.
 * @param {Function} [options.callback] A function which is called when the response arrives.
 * @param {Ext.data.Model[]} options.callback.records Array of records.
 * @param {Ext.data.operation.Operation} options.callback.operation The Operation itself.
 * @param {Boolean} options.callback.success `true` when operation completed successfully.
 * @param {Boolean} [options.addRecords=false] Specify as `true` to *add* the incoming records rather than the
 * default which is to have the incoming records *replace* the existing store contents.
 *
 * @return {Ext.data.Store} this
 * @since 1.1.0
 */

/**
 * @method flushLoad
 * Called when the event handler which called the {@link #method-load} method exits.
 */

/**
 * @method reload
 * Reloads the store using the last options passed to the {@link #method-load} method. You can use the reload method to reload the
 * store using the parameters from the last load() call. For example:
 *
 *     store.load({
 *         params : {
 *             userid : 22216
 *         }
 *     });
 *
 *     //...
 *
 *     store.reload();
 *
 * The initial {@link #method-load} execution will pass the `userid` parameter in the request. The {@link #reload} execution
 * will also send the same `userid` parameter in its request as it will reuse the `params` object from the last {@link #method-load} call.
 *
 * You can override a param by passing in the config object with the `params` object:
 *
 *     store.load({
 *         params : {
 *             userid : 22216,
 *             foo    : 'bar'
 *         }
 *     });
 *
 *     //...
 *
 *     store.reload({
 *         params : {
 *             userid : 1234
 *         }
 *     });
 *
 * The initial {@link #method-load} execution sends the `userid` and `foo` parameters but in the {@link #reload} it only sends
 * the `userid` paramter because you are overriding the `params` config not just overriding the one param. To only change a single param
 * but keep other params, you will have to get the last params from the {@link #lastOptions} property:
 *
 *     var lastOptions = store.lastOptions,
 *         lastParams = Ext.clone(lastOptions.params); // make a copy of the last params so we don't affect future reload() calls
 *
 *     lastParams.userid = 1234;
 *
 *     store.reload({
 *         params : lastParams
 *     });
 *
 * This will now send the `userid` parameter as `1234` and the `foo` param as `'bar'`.
 *
 * @param {Object} [options] A config object which contains options which may override the options passed to the previous load call. See the
 * {@link #method-load} method for valid configs.
 */

/**
 * @method isLoading
 * Returns true if the Store is currently performing a load operation
 * @return {Boolean} `true` if the Store is currently loading
 */

/**
 * @method isLoading
 * Returns `true` if the Store has been loaded.
 * @return {Boolean} `true` if the Store has been loaded.
 */

/**
 * @method suspendAutoSync
 * Suspends automatically syncing the Store with its Proxy.  Only applicable if {@link #autoSync} is `true`
 */

/**
 * @method resumeAutoSync
 * Resumes automatically syncing the Store with its Proxy.  Only applicable if {@link #autoSync} is `true`
 * @param {Boolean} syncNow Pass `true` to synchronize now. Only synchronizes with the Proxy if the suspension
 * count has gone to zero (We are not under a higher level of suspension)
 *
 */

/**
 * Removes all records from the store. This method does a "fast remove",
 * individual remove events are not called. The {@link #clear} event is
 * fired upon completion.
 * @method removeAll
 * @since 1.1.0
 */
