/**
 * @class Ext.data.proxy.Server
 * @extend Ext.data.proxy.Proxy
 * @alias proxy.server
 * ServerProxy is a superclass of {@link Ext.data.proxy.JsonP JsonPProxy} and {@link Ext.data.proxy.Ajax AjaxProxy}, and
 * would not usually be used directly.
 * @protected
 */

/**
 * @cfg {String} url
 * The URL from which to request the data object.
 *
 */

/**
 * @cfg {String} [pageParam="page"]
 * The name of the 'page' parameter to send in a request. Defaults to 'page'. Set this to `''` if you don't
 * want to send a page parameter.
 * @accessor
 */

/**
 * @cfg {String} [startParam="start"]
 * The name of the 'start' parameter to send in a request. Defaults to 'start'. Set this to `''` if you don't
 * want to send a start parameter.
 * @accessor
 */

/**
 * @cfg {String} [limitParam="limit"]
 * The name of the 'limit' parameter to send in a request. Defaults to 'limit'. Set this to `''` if you don't
 * want to send a limit parameter.
 * @accessor
 */

/**
 * @cfg {String} [groupParam="group"]
 * The name of the 'group' parameter to send in a request. Defaults to 'group'. Set this to `''` if you don't
 * want to send a group parameter.
 * @accessor
 */

/**
 * @cfg {String} [groupDirectionParam="groupDir"]
 * The name of the direction parameter to send in a request. **This is only used when simpleGroupMode is set to
 * true.**
 * If this is set to the same value as the {@link #groupParam}, then the group property name *and* direction
 * of each grouper is passed as a single, space separated parameter, looking like a database `group by` specification.
 *
 * So if there are multiple groupers, the single group parameter will look like this:
 *
 *     ?group=name%20ASC&group=age%20DESC
 *
 * @accessor
 */

/**
 * @cfg {String} [sortParam="sort"]
 * The name of the 'sort' parameter to send in a request. Defaults to 'sort'. Set this to `''` if you don't
 * want to send a sort parameter.
 * @accessor
 */

/**
 * @cfg {String} [filterParam="filter"]
 * The name of the 'filter' parameter to send in a request. Defaults to 'filter'. Set this to `''` if you don't
 * want to send a filter parameter.
 * @accessor
 */

/**
 * @cfg {String} [directionParam="dir"]
 * The name of the direction parameter to send in a request. **This is only used when simpleSortMode is set to
 * true.**
 *
 * If this is set to the same value as the {@link #sortParam}, then the sort property name *and* direction
 * of each sorter is passed as a single, space separated parameter, looking like a database `order by` specification.
 *
 * So if there are multiple sorters, the single sort parameter will look like this:
 *
 *     ?sort=name%20ASC&sort=age%20DESC
 *
 * @accessor
 */

/**
 * @cfg {String} [idParam="id"]
 * The name of the parameter which carries the id of the entity being operated upon.
 * @accessor
 */

/**
 * @cfg {Boolean} [simpleSortMode=false]
 * Enabling simpleSortMode in conjunction with remoteSort will send the sorted field names in the
 * parameter named by {@link #sortParam}, and the directions for each sorted field in a parameter named by {@link #directionParam}.
 *
 * In the simplest case, with one Sorter, this will result in HTTP parameters like this:
 *
 *     ?sort=name&dir=ASC
 *
 * If there are multiple sorters, the parameters will be encoded like this:
 *
 *     ?sort=name&sort=age&dir=ASC&dir=DESC
 *
 * @accessor
 */

/**
 * @cfg {Boolean} [simpleGroupMode=false]
 * Enabling simpleGroupMode in conjunction with remoteGroup will only send one group property and a direction when a
 * remote group is requested. The {@link #groupDirectionParam} and {@link #groupParam} will be sent with the property name and either 'ASC'
 * or 'DESC'.
 * @accessor
 */

/**
 * @cfg {Boolean} [noCache=true]
 * Disable caching by adding a unique parameter name to the request. Set to false
 * to allow caching. Defaults to true.
 * @accessor
 */

/**
 * @cfg {String} [cacheString="_dc"]
 * The name of the cache param added to the url when using noCache. Defaults to "_dc".
 * @accessor
 */

/**
 * @cfg {Number} [timeout=30000]
 * The number of milliseconds to wait for a response. Defaults to 30000 milliseconds (30 seconds).
 * @accessor
 */

/**
 * @cfg {Object} api
 * Specific urls to call on CRUD action methods "create", "read", "update" and "destroy". Defaults to:
 *
 *     api: {
 *         create  : undefined,
 *         read    : undefined,
 *         update  : undefined,
 *         destroy : undefined
 *     }
 *
 * The url is built based upon the action being executed [create|read|update|destroy] using the commensurate
 * {@link #api} property, or if undefined default to the configured
 * {@link Ext.data.Store}.{@link Ext.data.proxy.Server#url url}.
 *
 * For example:
 *
 *     api: {
 *         create  : '/controller/new',
 *         read    : '/controller/load',
 *         update  : '/controller/update',
 *         destroy : '/controller/destroy_action'
 *     }
 *
 * If the specific URL for a given CRUD action is undefined, the CRUD action request will be directed to the
 * configured {@link Ext.data.proxy.Server#url url}.
 * @accessor
 */

/**
 * @cfg {Object} extraParams
 * Extra parameters that will be included on every request. Individual requests with params of the same name
 * will override these params when they are in conflict.
 * @accessor
 */

/**
 * @event exception
 * Fires when the server returns an exception. This event may also be listened
 * to in the event that a request has timed out or has been aborted.
 * @param {Ext.data.proxy.Proxy} this
 * @param {Ext.data.Response} response The response that was received
 * @param {Ext.data.operation.Operation} operation The operation that triggered the request
 */

/**
 * @method setExtraParam
 * Sets a value in the underlying {@link #extraParams}.
 * @param {String} name The key for the new value
 * @param {Object} value The value
 */

/**
 * @method buildRequest
 * Creates an {@link Ext.data.Request Request} object from {@link Ext.data.operation.Operation Operation}.
 *
 * This gets called from doRequest methods in subclasses of Server proxy.
 *
 * @param {Ext.data.operation.Operation} operation The operation to execute
 * @return {Ext.data.Request} The request object
 */

/**
 * @method encodeSorters
 * Encodes the array of {@link Ext.util.Sorter} objects into a string to be sent in the request url. By default,
 * this simply JSON-encodes the sorter data
 * @param {Ext.util.Sorter[]} sorters The array of {@link Ext.util.Sorter Sorter} objects
 * @param {Boolean} [preventArray=false] Prevents the items from being output as an array.
 * @return {String} The encoded sorters
 */

/**
 * @method encodeFilters
 * Encodes the array of {@link Ext.util.Filter} objects into a string to be sent in the request url. By default,
 * this simply JSON-encodes the filter data
 * @param {Ext.util.Filter[]} filters The array of {@link Ext.util.Filter Filter} objects
 * @return {String} The encoded filters
 */

/**
 * @method buildUrl
 * Generates a url based on a given Ext.data.Request object. By default, ServerProxy's buildUrl will add the
 * cache-buster param to the end of the url. Subclasses may need to perform additional modifications to the url.
 * @param {Ext.data.Request} request The request object
 * @return {String} The url
 */

/**
 * @method doRequest
 * In ServerProxy subclasses, the {@link #method-create}, {@link #method-read}, {@link #method-update} and
 * {@link #method-erase} methods all pass through to doRequest. Each ServerProxy subclass must implement the
 * doRequest method - see {@link Ext.data.proxy.JsonP} and {@link Ext.data.proxy.Ajax} for examples. This method
 * carries the same signature as each of the methods that delegate to it.
 *
 * @param {Ext.data.operation.Operation} operation The Ext.data.operation.Operation object
 * @param {Function} callback The callback function to call when the Operation has completed
 * @param {Object} scope The scope in which to execute the callback
 */
