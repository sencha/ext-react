/**
 * @class Ext.data.proxy.Memory
 * @extend Ext.data.proxy.Client
 * @alias proxy.memory
 *
 * In-memory proxy. This proxy simply uses a local variable for data storage/retrieval, so its contents are lost on
 * every page refresh.
 *
 * Usually this Proxy isn't used directly, serving instead as a helper to a {@link Ext.data.Store Store} where a reader
 * is required to load data. For example, say we have a Store for a User model and have some inline data we want to
 * load, but this data isn't in quite the right format: we can use a MemoryProxy with a JsonReader to read it into our
 * Store:
 *
 *     //this is the model we will be using in the store
 *     Ext.define('User', {
 *         extend: 'Ext.data.Model',
 *         fields: [
 *             {name: 'id',    type: 'int'},
 *             {name: 'name',  type: 'string'},
 *             {name: 'phone', type: 'string', mapping: 'phoneNumber'}
 *         ]
 *     });
 *
 *     //this data does not line up to our model fields - the phone field is called phoneNumber
 *     var data = {
 *         users: [
 *             {
 *                 id: 1,
 *                 name: 'Ed Spencer',
 *                 phoneNumber: '555 1234'
 *             },
 *             {
 *                 id: 2,
 *                 name: 'Abe Elias',
 *                 phoneNumber: '666 1234'
 *             }
 *         ]
 *     };
 *
 *     //note how we set the 'root' in the reader to match the data structure above
 *     let store = new Ext.data.Store({
 *         autoLoad: true,
 *         model: 'User',
 *         data : data,
 *         proxy: {
 *             type: 'memory',
 *             reader: {
 *                 type: 'json',
 *                 rootProperty: 'users'
 *             }
 *         }
 *     });
 */

/**
 * @cfg {Boolean} [enablePaging=false]
 * Configure as `true` to enable this MemoryProxy to honour a read operation's `start` and `limit` options.
 *
 * When `true`, read operations will be able to read *pages* of records from the data object.
 */

/**
 * @cfg {Object} data
 * Optional data to pass to configured Reader.
 * @accessor
 */

/**
 * @cfg {Boolean} [clearOnRead=false]
 * By default, MemoryProxy data is persistent, and subsequent reads will read the
 * same data. If this is not required, configure the proxy using `clearOnRead: true`.
 * @accessor
 */

/**
 * Currently this is a hard-coded method that simply commits any records and sets the operation to successful,
 * then calls the callback function, if provided. It is essentially mocking a server call in memory, but since
 * there is no real back end in this case there's not much else to do. This method can be easily overridden to
 * implement more complex logic if needed.
 * @param {Ext.data.operation.Operation} operation The Operation to perform
 * @method create
 */

/**
 * Currently this is a hard-coded method that simply commits any records and sets the operation to successful,
 * then calls the callback function, if provided. It is essentially mocking a server call in memory, but since
 * there is no real back end in this case there's not much else to do. This method can be easily overridden to
 * implement more complex logic if needed.
 * @param {Ext.data.operation.Operation} operation The Operation to perform
 * @method update
 */

/**
 * Currently this is a hard-coded method that simply commits any records and sets the operation to successful,
 * then calls the callback function, if provided. It is essentially mocking a server call in memory, but since
 * there is no real back end in this case there's not much else to do. This method can be easily overridden to
 * implement more complex logic if needed.
 * @param {Ext.data.operation.Operation} operation The Operation to perform
 * @method erase
 */

/**
 * @method read
 * Reads data from the configured {@link #data} object. Uses the Proxy's {@link #reader}, if present.
 * @param {Ext.data.operation.Operation} operation The read Operation
 */
