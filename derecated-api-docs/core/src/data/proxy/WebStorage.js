/**
 * @class Ext.data.proxy.WebStorage
 * @extend Ext.data.proxy.Client
 * WebStorageProxy is simply a superclass for the {@link Ext.data.proxy.LocalStorage LocalStorage} and {@link
 * Ext.data.proxy.SessionStorage SessionStorage} proxies. It uses the new HTML5 key/value client-side storage objects to
 * save {@link Ext.data.Model model instances} for offline use.
 * @private
 */

/**
 * @cfg {String} id
 * The unique ID used as the key in which all record data are stored in the local storage object.
 * @accessor
 */

/**
 * @cfg {Object} reader
 * Not used by web storage proxy.
 * @hide
 */

/**
 * @cfg {Object} writer
 * Not used by web storage proxy.
 * @hide
 */

/**
 * @method constructor
 * Creates the proxy, throws an error if local storage is not supported in the current browser.
 * @param {Object} config (optional) Config object.
 */

/**
 * @property {Object} cache
 * Cached map of records already retrieved by this Proxy. Ensures that the same instance is always retrieved.
 */

/**
 * @method create
 * @inheritdoc
 */

/**
 * @method read
 * @inheritdoc
 */

/**
 * @method update
 * @inheritdoc
 */

/**
 * @method erase
 * @inheritdoc
 */

/**
 * @method setRecord
 * Saves the given record in the Proxy.
 * @param {Ext.data.Model} record The model instance
 * @param {String} [id] The id to save the record under (defaults to the value of the record's getId() function)
 */
