/**
 * @class Ext.data.operation.Operation
 * @extend Ext.Base
 *
 * Represents a read or write operation performed by a {@link Ext.data.proxy.Proxy Proxy}.
 * Operation objects are used to enable communication between Stores and Proxies.
 * Application developers should rarely need to interact with Operation objects directly.
 *
 * Several Operations can be batched together in a {@link Ext.data.Batch batch}.
 */

/**
 * @cfg {Boolean} [synchronous=false]
 * True if this Operation is to be executed synchronously. This property is inspected by a
 * {@link Ext.data.Batch Batch} to see if a series of Operations can be executed in parallel or not.
 * @accessor
 */

/**
 * @cfg {String} [url=""]
 * The url for this operation. Typically this will be provided by a proxy and not configured here.
 * @accessor
 */

/**
 * @cfg {Object} params
 * Parameters to pass along with the request when performing the operation.
 * @accessor
 */

/**
 * @cfg {Function} callback
 * Function to execute when operation completed.
 * @cfg {Ext.data.Model[]} callback.records Array of records.
 * @cfg {Ext.data.operation.Operation} callback.operation The Operation itself.
 * @cfg {Boolean} callback.success True when operation completed successfully.
 * @accessor
 */

/**
 * @cfg {Object} scope
 * Scope for the {@link #callback} function.
 * @accessor
 */

/**
 * @cfg {Ext.data.ResultSet} resultSet
 * The ResultSet for this operation.
 * @accessor
 */

/**
 * @cfg {Ext.data.Request} request
 * The request for this operation.
 * @accessor
 */

/**
 * @cfg {Ext.data.Model[]} records
 * The records associated with this operation. If this is a `read` operation, this will be
 * `null` until data is returned from the {@link Ext.data.proxy.Proxy}.
 * @accessor
 */

/**
 * @cfg {Object} id
 * The id of the operation.
 * @accessor
 */

/**
 * @cfg {Ext.data.proxy.Proxy} proxy
 * The proxy for this operation
 * @accessor
 */

/**
 * @cfg {Ext.data.Batch} batch
 * The batch for this operation, if applicable
 * @accessor
 */

/**
 * @method constructor
 * Creates new Operation object.
 * @param {Object} config (optional) Config object.
 */

/**
 * @method abort
 * Aborts the processing of this operation on the {@link #proxy}.
 * This is only valid for proxies that make asynchronous requests.
 */

/**
 * @method setStarted
 * Marks the Operation as started.
 */

/**
 * @method setCompleted
 * Marks the Operation as completed.
 */

/**
 * @method setSuccessful
 * Marks the Operation as successful.
 * @param {Boolean} [complete] `true` to also mark this operation
 * as being complete See {@link #setCompleted}.
 */

/**
 * @method setException
 * Marks the Operation as having experienced an exception. Can be supplied with an option error message/object.
 * @param {String/Object} error (optional) error string/object
 */

/**
 * @method hasException
 * Returns true if this Operation encountered an exception (see also {@link #getError})
 * @return {Boolean} True if there was an exception
 */

/**
 * @method getError
 * Returns the error string or object that was set using {@link #setException}
 * @return {String/Object} The error object
 */

/**
 * @method getRecords
 * Returns the {@link Ext.data.Model record}s associated with this operation. For read
 * operations the records as set by the {@link Ext.data.proxy.Proxy Proxy} will be
 * returned (returns `null` if the proxy has not yet set the records).
 *
 * For create, update, and destroy operations the operation's initially configured
 * records will be returned, although the proxy may modify these records' data at some
 * point after the operation is initialized.
 *
 * @return {Ext.data.Model[]}
 */

/**
 * @method isStarted
 * Returns true if the Operation has been started. Note that the Operation may have started AND completed, see
 * {@link #isRunning} to test if the Operation is currently running.
 * @return {Boolean} True if the Operation has started
 */

/**
 * @method isRunning
 * Returns true if the Operation has been started but has not yet completed.
 * @return {Boolean} True if the Operation is currently running
 */

/**
 * @method isComplete
 * Returns true if the Operation has been completed
 * @return {Boolean} True if the Operation is complete
 */

/**
 * @method wasSuccessful
 * Returns true if the Operation has completed and was successful
 * @return {Boolean} True if successful
 */

/**
 * @method allowWrite
 * Checks whether this operation should cause writing to occur.
 * @return {Boolean} Whether the operation should cause a write to occur.
 */
