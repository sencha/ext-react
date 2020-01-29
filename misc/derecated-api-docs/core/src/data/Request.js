/**
 * @class Ext.data.Request
 * @extend Ext.Base
 * Simple class that represents a Request that will be made by any {@link Ext.data.proxy.Server} subclass.
 * All this class does is standardize the representation of a Request as used by any ServerProxy subclass,
 * it does not contain any actual logic or perform the request itself.
 */

/**
 * @cfg {String} action
 * The name of the action this Request represents. Usually one of 'create', 'read', 'update' or 'destroy'.
 * @accessor
 */

/**
 * @cfg {Object} params
 * HTTP request params. The Proxy and its Writer have access to and can modify this object.
 * @accessor
 */

/**
 * @cfg {String} [method='GET']
 * The HTTP method to use on this Request. Should be one of 'GET', 'POST', 'PUT' or 'DELETE'.
 * @accessor
 */

/**
 * @cfg {String} url
 * The url to access on this Request.
 * @accessor
 */

/**
 * @cfg {Ext.data.operation.Operation} operation
 * The operation this request belongs to.
 * @accessor
 */

/**
 * @cfg {Ext.data.proxy.Proxy} proxy
 * The proxy this request belongs to.
 * @accessor
 */

/**
 * @cfg {Boolean} [disableCaching=false]
 * Whether or not to disable caching for this request.
 * @accessor
 */

/**
 * @cfg {Object} headers
 * Some requests (like XMLHttpRequests) want to send additional server headers.
 * This configuration can be set for those types of requests.
 * @accessor
 */

/**
 * @cfg {String} callbackKey
 * Some requests (like JsonP) want to send an additional key that contains
 * the name of the callback function.
 * @accessor
 */

/**
 * @cfg {Object} jsonData
 * This is used by some write actions to attach data to the request without encoding it
 * as a parameter.
 * @accessor
 */

/**
 * @cfg {Object} xmlData
 * This is used by some write actions to attach data to the request without encoding it
 * as a parameter, but instead sending it as XML.
 * @accessor
 */

/**
 * @cfg {Boolean} [withCredentials=false]
 * This field is necessary when using cross-origin resource sharing.
 * @accessor
 */

/**
 * @cfg {String} username
 * Most oData feeds require basic HTTP authentication. This configuration allows
 * you to specify the username.
 * @accessor
 */

/**
 * @cfg {String} password
 * Most oData feeds require basic HTTP authentication. This configuration allows
 * you to specify the password.
 * @accessor
 */

/**
 * @cfg {Boolean} [binary=false]
 * True to request binary data from the server.  This feature requires
 * the use of a binary reader such as {@link Ext.data.amf.Reader AMF Reader}
 * @accessor
 */

/**
 * @method constructor
 * Creates the Request object.
 * @param {Object} [config] Config object.
 */

/**
 * @method getParam
 * Gets a single param from the {@link #params}.
 * @param {String} key The key for the param.
 * @return {Object} The value for the param. `undefined` if it does not exist.
 */

/**
 * @method setParam
 * Sets a single param value in the {@link #params}.
 * @param {String} key The key to set.
 * @param {Object} value The value to set.
 */
