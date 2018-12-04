/**
 * @class Ext.data.ChainedStore
 * @extend Ext.data.AbstractStore
 * @alias store.chained
 * @mixins Ext.data.LocalStore
 *
 * A chained store is a store that is a "view" of an existing store. The data comes from the
 * {@link #source}, however this view of the store may be sorted & filtered independently without
 * having any impact on the {@link #source} store.
 */

/**
 * @cfg {Ext.data.Store/String} source
 * The backing data source for this chained store. Either a store instance
 * or the id of an existing store.
 * @accessor
 */

/**
 * @method getModel
 * Get the model used for this store.
 * @return {Ext.data.Model} The model
 */

/**
 * @method add
 * @inheritdoc Ext.data.LocalStore#add
 */

/**
 * @method each
 * @inheritdoc Ext.data.LocalStore#each
 */

/**
 * @method collect
 * @inheritdoc Ext.data.LocalStore#collect
 */

/**
 * @method getById
 * @inheritdoc Ext.data.LocalStore#getById
 */

/**
 * @method getByInternalId
 * @inheritdoc Ext.data.LocalStore#getByInternalId
 */

/**
 * @method indexOf
 * @inheritdoc Ext.data.LocalStore#indexOf
 */

/**
 * @method indexOfId
 * @inheritdoc Ext.data.LocalStore#indexOfId
 */

/**
 * @method insert
 * @inheritdoc Ext.data.LocalStore#insert
 */

/**
 * @method queryBy
 * @inheritdoc Ext.data.LocalStore#queryBy
 */

/**
 * @method query
 * @inheritdoc Ext.data.LocalStore#query
 */

/**
 * @method first
 * @inheritdoc Ext.data.LocalStore#first
 */

/**
 * @method last
 * @inheritdoc Ext.data.LocalStore#last
 */

/**
 * @method sum
 * @inheritdoc Ext.data.LocalStore#sum
 */

/**
 * @method count
 * @inheritdoc Ext.data.LocalStore#count
 */

/**
 * @method min
 * @inheritdoc Ext.data.LocalStore#min
 */

/**
 * @method max
 * @inheritdoc Ext.data.LocalStore#max
 */

/**
 * @method average
 * @inheritdoc Ext.data.LocalStore#average
 */

/**
 * @method aggregate
 * @inheritdoc Ext.data.LocalStore#aggregate
 */