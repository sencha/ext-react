/**
 * @class Ext.data.Batch
 * @extend Ext.Base
 * @mixins Ext.mixin.Observable
 *
 * Provides a mechanism to run one or more {@link Ext.data.operation.Operation operations}
 * in a given order. Fires the `operationcomplete` event after the completion of each
 * Operation, and the `complete` event when all Operations have been successfully executed.
 * Fires an `exception` event if any of the Operations encounter an exception.
 *
 * Usually these are only used internally by {@link Ext.data.proxy.Proxy} classes.
 */

/**
 * @cfg {Boolean} [pauseOnException=false]
 * True to pause the execution of the batch if any operation encounters an exception
 * (defaults to false). If you set this to true you are responsible for implementing the appropriate
 * handling logic and restarting or discarding the batch as needed. There are different ways you could
 * do this, e.g. by handling the batch's {@link #event-exception} event directly, or perhaps by overriding
 * {@link Ext.data.ProxyStore#onBatchException onBatchException} at the store level. If you do pause
 * and attempt to handle the exception you can call {@link #retry} to process the same operation again.
 *
 * Note that {@link Ext.data.operation.Operation operations} are atomic, so any operations that may have succeeded
 * prior to an exception (and up until pausing the batch) will be finalized at the server level and will
 * not be automatically reversible. Any transactional / rollback behavior that might be desired would have
 * to be implemented at the application level. Pausing on exception will likely be most beneficial when
 * used in coordination with such a scheme, where an exception might actually affect subsequent operations
 * in the same batch and so should be handled before continuing with the next operation.
 *
 * If you have not implemented transactional operation handling then this option should typically be left
 * to the default of false (e.g. process as many operations as possible, and handle any exceptions
 * asynchronously without holding up the rest of the batch).
 * @accessor
 */

/**
 * @method constructor
 * Creates new Batch object.
 * @param {Object} [config] Config object
 */

/**
 * @event complete
 * Fired when all operations of this batch have been completed
 * @param {Ext.data.Batch} batch The batch object
 * @param {Object} operation The last operation that was executed
 */

/**
 * @event exception
 * Fired when a operation encountered an exception
 * @param {Ext.data.Batch} batch The batch object
 * @param {Object} operation The operation that encountered the exception
 */

/**
 * @event operationcomplete
 * Fired when each operation of the batch completes
 * @param {Ext.data.Batch} batch The batch object
 * @param {Object} operation The operation that just completed
 */

/**
 * @property {Ext.data.operation.Operation[]} exceptions
 * Ordered array of operations that raised an exception during the most recent
 * batch execution and did not successfully complete
 */

/**
 * @method add
 * Adds a new operation to this batch at the end of the {@link #operations} array
 * @param {Ext.data.operation.Operation/Ext.data.operation.Operation[]} operation
 * The {@link Ext.data.operation.Operation Operation} object or an array of operations.
 * @return {Ext.data.Batch} this
 */

/**
 * @method sort
 * Sorts the `{@link Ext.data.operation.Operation operations}` based on their type and
 * the foreign key dependencies of the entities. Consider a simple Parent and Child
 * case where the Child has a "parentId" field. If this batch contains two `create`
 * operations, one of a Parent and one for its Child, the server must receive and
 * process the `create` of the Parent before the Child can be created.
 *
 * In the case of `destroy` operations this order is reversed. The Child entity must be
 * destroyed before the Parent to avoid any foreign key constraints (a Child with an
 * invalid parentId field).
 *
 * Further, `create` operations must all occur before `update` operations to ensure
 * that all entities exist that might be now referenced by the updates. The created
 * entities can safely reference already existing entities.
 *
 * Finally, `destroy` operations are sorted after `update` operations to allow those
 * updates to remove references to the soon-to-be-deleted entities.
 */

/**
 * @method start
 * Kicks off execution of the batch, continuing from the next operation if the previous
 * operation encountered an exception, or if execution was paused. Use this method to start
 * the batch for the first time or to restart a paused batch by skipping the current
 * unsuccessful operation.
 *
 * To retry processing the current operation before continuing to the rest of the batch (e.g.
 * because you explicitly handled the operation's exception), call {@link #retry} instead.
 *
 * Note that if the batch is already running any call to start will be ignored.
 *
 * @return {Ext.data.Batch} this
 */

/**
 * @method retry
 * Kicks off execution of the batch, continuing from the current operation. This is intended
 * for restarting a {@link #pause paused} batch after an exception, and the operation that raised
 * the exception will now be retried. The batch will then continue with its normal processing until
 * all operations are complete or another exception is encountered.
 *
 * Note that if the batch is already running any call to retry will be ignored.
 *
 * @return {Ext.data.Batch} this
 */

/**
 * @method pause
 * Pauses execution of the batch, but does not cancel the current operation
 * @return {Ext.data.Batch} this
 */

/**
 * @method getOperations
 * Gets the operations for this batch.
 * @return {Ext.data.operation.Operation[]} The operations.
 */

/**
 * @method getExceptions
 * Gets any operations that have returned without success in this batch.
 * @return {Ext.data.operation.Operation[]} The exceptions
 */

/**
 * @method getCurrent
 * Gets the currently running operation. Will return null if the batch has
 * not started or is completed.
 * @return {Ext.data.operation.Operation} The operation
 */

/**
 * @method getTotal
 * Gets the total number of operations in this batch.
 * @return {Number} The total
 */

/**
 * @method isRunning
 * Checks if this batch is running.
 * @return {Boolean} `true` if this batch is running.
 */

/**
 * @method isComplete
 * Checks if this batch is complete.
 * @return {Boolean} `true` if this batch is complete.
 */

/**
 * @method hasExceptions
 * Checks if this batch has any exceptions.
 * @return {Boolean} `true` if this batch has any exceptions.
 */
