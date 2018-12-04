/**
 * @class Ext.data.Session
 * @mixins Ext.mixin.Observable
 * @mixins Ext.mixin.Dirty
 * This class manages models and their associations. Instances of `Session` are typically
 * associated with some `Component` (perhaps the Viewport or a Window) and then used by
 * their `{@link Ext.app.ViewModel view models}` to enable data binding.
 *
 * The primary job of a Session is to manage a collection of records of many different
 * types and their associations. This often starts by loading records when requested (via
 * bind - see below) and culminates when it is time to save to the server.
 *
 * Because the Session tracks all records it loads, it ensures that for any given type of
 * model, only one record exists with a given `id`. This means that all edits of that
 * record are properly targeted at that one instance.
 *
 * Similarly, when associations are loaded, the `Ext.data.Store` created to hold the
 * associated records is tracked by the Session. So all requests for the "OrderItems" of
 * a particular Order id will result in the same Store. Adding and removing items from
 * that Order then is sure to remain consistent.
 *
 * # Data
 *
 * Since the Session is managing all this data, there are several methods it provides
 * to give convenient access to that data. The most important of these is `update` and
 * `getChanges`.
 *
 * The `update` and `getChanges` methods both operate on object that contains a summary
 * of records and associations and different CRUD operations.
 *
 * ## Saving
 *
 * There are two basic ways to save the contents of a Session: `getChanges` and
 * `getSaveBatch`. We've already seen `getChanges`. The data contained in the CRUD object
 * can be translated into whatever shape is needed by the server.
 *
 * To leverage the `{@link Ext.data.Model#proxy proxy}` facilities defined by each Model
 * class, there is the `getSaveBatch` method. That method returns an `Ext.data.Batch`
 * object populated with the necessary `create`, `update` and `destory` operations to
 * save all of the changes in the Session.
 *
 * ## Conflicts
 *
 * If data is loaded from the server (for example a store load) and there is an existing record,
 * the {@link Ext.data.Model#method-mergeData `mergeData`} method will be called to resolve the conflict.
 * 
 * @since 5.0.0
 */

/**
 * @cfg {String/Ext.data.schema.Schema} [schema="default"]
 * @accessor
 */

/**
 * @cfg {Ext.data.Session} parent
 * The parent session for this session.
 * @accessor
 */

/**
 * @cfg {Boolean} [autoDestroy=true]
 * `true` to automatically destroy this session when a component it is attached
 * to is destroyed. This should be set to false if the session is intended to be
 * used across multiple root level components.
 *
 * @accessor
 * @since 5.0.1
 */

/**
 * @method adopt
 * Adds an existing record instance to the session. The record
 * may not belong to another session. The record cannot be a phantom record, instead
 * use {@link #createRecord}.
 * @param {Ext.data.Model} record The record to adopt.
 */

/**
 * @method commit
 * Marks the session as "clean" by calling {@link Ext.data.Model#commit} on each record
 * that is known to the session.
 *
 * - Phantom records will no longer be phantom.
 * - Modified records will no longer be dirty.
 * - Dropped records will be erased.
 *
 * @since 5.1.0
 */

/**
 * @method createRecord
 * Creates a new record and tracks it in this session.
 *
 * @param {String/Ext.Class} type The `entityName` or the actual class of record to create.
 * @param {Object} [data] The data for the record.
 * @return {Ext.data.Model} The new record.
 */

/**
 * @method getChanges
 * Returns an object describing all of the modified fields, created or dropped records
 * and many-to-many association changes maintained by this session.
 *
 * @return {Object} An object in the CRUD format (see the intro docs). `null` if there are no changes.
 */

/**
 * @method getRecord
 * Get a cached record from the session. If the record does not exist, it will
 * be created. If the `autoLoad` parameter is not set to `false`, the record will
 * be loaded via the {@link Ext.data.Model#proxy proxy} of the Model.
 *
 * If this session is configured with a `{@link #parent}` session, a *copy* of any existing record
 * in the `parent` will be adopted into this session. If the `parent` does not contain the record,
 * the record will be created and *not* inserted into the parent.
 *
 * See also {@link #peekRecord}.
 *
 * @param {String/Ext.Class/Ext.data.Model} type The `entityName` or the actual class of record to create.
 * This may also be a record instance, where the type and id will be inferred from the record. If the record is
 * not attached to a session, it will be adopted. If it exists in a parent, an appropriate copy will be made as
 * described.
 * @param {Object} id The id of the record.
 * @param {Boolean/Object} [autoLoad=true] `false` to prevent the record from being loaded if
 * it does not exist. If this parameter is an object, it will be passed to the {@link Ext.data.Model#load} call.
 * @return {Ext.data.Model} The record.
 */

/**
 * @method getSaveBatch
 * Returns an `Ext.data.Batch` containing the `Ext.data.operation.Operation` instances
 * that are needed to save all of the changes in this session. This sorting is based
 * on operation type, associations and foreign keys. Generally speaking the operations
 * in the batch can be committed to a server sequentially and the server will never be
 * sent a request with an invalid (client-generated) id in a foreign key field.
 *
 * @param {Boolean} [sort=true] Pass `false` to disable the batch operation sort.
 * @return {Ext.data.Batch}
 */

/**
 * @method peekRecord
 * Gets an existing record from the session. The record will *not* be created if it does
 * not exist.
 *
 * See also: {@link #getRecord}.
 *
 * @param {String/Ext.Class} type The `entityName` or the actual class of record to create.
 * @param {Object} id The id of the record.
 * @param {Boolean} [deep=false] `true` to consult
 * @return {Ext.data.Model} The record, `null` if it does not exist.
 */

/**
 * @method save
 * Save any changes in this session to a {@link #parent} session.
 */

/**
 * @method spawn
 * Create a child session with this session as the {@link #parent}.
 * @return {Ext.data.Session} The copied session.
 */


/**
 * @method update
 * Complete a bulk update for this session.
 * @param {Object} data Data in the CRUD format (see the intro docs).
 */

/**
 * @method getEntityList
 * Transforms a list of ids into a list of records for a particular type.
 * @param {Ext.Class} entityType The entity type.
 * @param {Object[]} ids The ids to transform.
 * @return {Ext.data.Model[]} The models corresponding to the ids.
 */

/**
 * @method getModelIdentifier
 * Gets a user friendly identifier for a Model.
 * @param {Ext.Class} entityType The entity type.
 * @param {Object} id The id of the entity.
 * @return {String} The identifier.
 */

/**
 * @method visitData
 * Walks the internal data tracked by this session and calls methods on the provided
 * `visitor` object. The visitor can then accumulate whatever data it finds important.
 * The visitor object can provide a number of methods, but all are optional.
 *
 * This method does not enumerate associations since these can be traversed given the
 * records that are enumerated. For many-to-many associations, however, this method
 * does enumerate the changes because these changes are not "owned" by either side of
 * such associations.
 *
 * @param {Object} visitor
 * @param {Function} [visitor.onCleanRecord] This method is called to describe a record
 * that is known but unchanged.
 * @param {Ext.data.Model} visitor.onCleanRecord.record The unmodified record.
 * @param {Function} [visitor.onDirtyRecord] This method is called to describe a record
 * that has either been created, dropped or modified.
 * @param {Ext.data.Model} visitor.onDirtyRecord.record The modified record.
 * @param {Function} [visitor.onMatrixChange] This method is called to describe a
 * change in a many-to-many association (a "matrix").
 * @param {Ext.data.schema.Association} visitor.onMatrixChange.association The object
 * describing the many-to-many ("matrix") association.
 * @param {Mixed} visitor.onMatrixChange.leftId The `idProperty` of the record on the
 * "left" of the association.
 * @param {Mixed} visitor.onMatrixChange.rightId The `idProperty` of the record on the
 * "right" of the association.
 * @param {Number} visitor.onMatrixChange.state A negative number if the two records
 * are being disassociated or a positive number if they are being associated. For
 * example, when adding User 10 to Group 20, this would be 1. When removing the User
 * this argument would be -1.
 * @return {Object} The visitor instance
 */
