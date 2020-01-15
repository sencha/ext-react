/**
 * @class Ext.data.proxy.Client
 * @extend Ext.data.proxy.Proxy
 *
 * Base class for any client-side storage. Used as a superclass for {@link Ext.data.proxy.Memory Memory} and
 * {@link Ext.data.proxy.WebStorage Web Storage} proxies. Do not use directly, use one of the subclasses instead.
 * @private
 */

/**
 * @property {Boolean} [isSynchronous=true]
 * `true` in this class to identify that requests made on this proxy are
 * performed synchronously
 */

/**
 * @method clear
 * Abstract function that must be implemented by each ClientProxy subclass. This should purge all record data
 * from the client side storage, as well as removing any supporting data (such as lists of record IDs)
 */

