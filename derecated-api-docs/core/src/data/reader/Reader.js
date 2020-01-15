/**
 * @class Ext.data.reader.Reader
 * @extend Ext.Base
 * @alias reader.base
 * @mixins Ext.mixin.Observable
 * @mixins Ext.mixin.Factoryable
 *
 * Readers are used to interpret data to be loaded into a {@link Ext.data.Model Model} instance or a {@link
 * Ext.data.Store Store} - often in response to an AJAX request. In general there is usually no need to create
 * a Reader instance directly, since a Reader is almost always used together with a {@link Ext.data.proxy.Proxy Proxy},
 * and is configured using the Proxy's {@link Ext.data.proxy.Proxy#cfg-reader reader} configuration property:
 * 
 *     new Ext.data.Store({
 *         model: 'User',
 *         proxy: {
 *             type: 'ajax',
 *             url : 'users.json',
 *             reader: {
 *                 type: 'json',
 *                 rootProperty: 'users'
 *             }
 *         },
 *     });
 *     
 * The above reader is configured to consume a JSON string that looks something like this:
 *  
 *     {
 *         "success": true,
 *         "users": [
 *             { "name": "User 1" },
 *             { "name": "User 2" }
 *         ]
 *     }
 * 
 *
 * # Loading Nested Data
 *
 * Readers have the ability to automatically load deeply-nested data objects based on the {@link Ext.data.schema.Association associations}
 * configured on each Model. Below is an example demonstrating the flexibility of these associations in a
 * fictional CRM system which manages a User, their Orders, OrderItems and Products. First we'll define the models:
 *
 *     Ext.define("User", {
 *         extend: 'Ext.data.Model',
 *         fields: [
 *             'id', 'name'
 *         ],
 *
 *         hasMany: {model: 'Order', name: 'orders'},
 *
 *         proxy: {
 *             type: 'rest',
 *             url : 'users.json',
 *             reader: {
 *                 type: 'json',
 *                 rootProperty: 'users'
 *             }
 *         }
 *     });
 *
 *     Ext.define("Order", {
 *         extend: 'Ext.data.Model',
 *         fields: [
 *             'id', 'total'
 *         ],
 *
 *         hasMany  : {model: 'OrderItem', name: 'orderItems', associationKey: 'order_items'},
 *         belongsTo: 'User'
 *     });
 *
 *     Ext.define("OrderItem", {
 *         extend: 'Ext.data.Model',
 *         fields: [
 *             'id', 'price', 'quantity', 'order_id', 'product_id'
 *         ],
 *
 *         belongsTo: ['Order', {model: 'Product', associationKey: 'product'}]
 *     });
 *
 *     Ext.define("Product", {
 *         extend: 'Ext.data.Model',
 *         fields: [
 *             'id', 'name'
 *         ],
 *
 *         hasMany: 'OrderItem'
 *     });
 *
 * This may be a lot to take in - basically a User has many Orders, each of which is composed of several OrderItems.
 * Finally, each OrderItem has a single Product. This allows us to consume data like this:
 *
 *     {
 *         "users": [
 *             {
 *                 "id": 123,
 *                 "name": "Ed",
 *                 "orders": [
 *                     {
 *                         "id": 50,
 *                         "total": 100,
 *                         "order_items": [
 *                             {
 *                                 "id"      : 20,
 *                                 "price"   : 40,
 *                                 "quantity": 2,
 *                                 "product" : {
 *                                     "id": 1000,
 *                                     "name": "MacBook Pro"
 *                                 }
 *                             },
 *                             {
 *                                 "id"      : 21,
 *                                 "price"   : 20,
 *                                 "quantity": 3,
 *                                 "product" : {
 *                                     "id": 1001,
 *                                     "name": "iPhone"
 *                                 }
 *                             }
 *                         ]
 *                     }
 *                 ]
 *             }
 *         ]
 *     }
 *
 * The JSON response is deeply nested - it returns all Users (in this case just 1 for simplicity's sake), all of the
 * Orders for each User (again just 1 in this case), all of the OrderItems for each Order (2 order items in this case),
 * and finally the Product associated with each OrderItem. Now we can read the data and use it as follows:
 *
 *     let store = new Ext.data.Store({
 *         model: "User"
 *     });
 *
 *     store.load({
 *         callback: function() {
 *             //the user that was loaded
 *             var user = store.first();
 *
 *             console.log("Orders for " + user.get('name') + ":")
 *
 *             //iterate over the Orders for each User
 *             user.orders().each(function(order) {
 *                 console.log("Order ID: " + order.getId() + ", which contains items:");
 *
 *                 //iterate over the OrderItems for each Order
 *                 order.orderItems().each(function(orderItem) {
 *                     //we know that the Product data is already loaded, so we can use the synchronous getProduct
 *                     //usually, we would use the asynchronous version (see #belongsTo)
 *                     var product = orderItem.getProduct();
 *
 *                     console.log(orderItem.get('quantity') + ' orders of ' + product.get('name'));
 *                 });
 *             });
 *         }
 *     });
 *
 * Running the code above results in the following:
 *
 *     Orders for Ed:
 *     Order ID: 50, which contains items:
 *     2 orders of MacBook Pro
 *     3 orders of iPhone
 */

/**
 * @cfg {String/Function} [groupRootProperty=""]
 * Name of the property from which to retrieve remote grouping summary information.
 * There should be an item for each group.
 *
 * The remote summary data should be parseable as a {@link #model} used by this reader.
 * @accessor
 */

/**
 * @cfg {Boolean} [implicitIncludes=true]
 * True to automatically parse models nested within other models in a response object. See the
 * Ext.data.reader.Reader intro docs for full explanation.
 * @accessor
 */

/**
 * @cfg {Boolean} [keepRawData] Determines if the Reader will keep raw data
 * received from the server in the {@link #rawData} property.
 *
 * While this might seem useful to do additional data processing, keeping raw data
 * might cause adverse effects such as memory leaks. It is recommended to set
 * `keepRawData` to `false` if you do not need the raw data.
 *
 * If you need to process data packet to extract additional data such as row summaries,
 * it is recommended to use {@link #transform} function for that purpose.
 *
 * Note that starting with Ext JS 6.0 the default behavior has been changed to
 * **not** keep the raw data because of the high potential for memory leaks.
 * @since 5.1.1
 * @accessor
 */

/**
 * @cfg {String/Function} [messageProperty=""]
 * The name of the property which contains a response message for exception handling. If you want to return a false success
 * response from the server, maybe due to some server-side validation, the messageProperty can hold the error message. For
 * example:
 *
 *     {
 *         "success": false,
 *         "error": "There was an error with your request"
 *     }
 *
 * You can retrieve this error message in a callback when loading a {@link Ext.data.Store Store} or {@link Ext.data.Model Model} like:
 *
 *     var store = new Ext.data.Store({
 *         fields : ['foo'],
 *         proxy  : {
 *             type   : 'ajax',
 *             url    : 'data.json',
 *             reader : {
 *                 type            : 'json',
 *                 rootProperty    : 'data',
 *                 messageProperty : 'error'
 *             }
 *         }
 *     });
 *
 *     store.load({
 *         callback: function(records, operation, success) {
 *             if (success) {
 *                 // ...
 *             } else {
 *                 var error = operation.getError();
 *
 *                 Ext.Msg.alert('Error', error);
 *             }
 *         }
 *     });
 *
 * In this example, the callback will execute with `success` being `false` and will therefore show the {@link Ext.MessageBox#alert Ext.Msg.alert} with
 * the error string returned in the response.
 * @accessor
 */

/**
 * @cfg {String/Ext.data.Model} [model]
 * The model to use for this reader. This config is only required if the reader is being used
 * without a proxy, otherwise the proxy will automatically set the model.
 * @accessor
 */

/**
 * @cfg {Boolean} [readRecordsOnFailure=true]
 * True to extract the records from a data packet even if the {@link #successProperty} returns false.
 * @accessor
 */

/**
 * @cfg {String/Function} rootProperty
 * The property that contains data items corresponding to the
 * Model(s) of the configured Reader. `rootProperty` varies by Reader type.
 *
 * ##JSON Reader
 * `rootProperty` is a property name. It may also be a dot-separated
 * list of property names if the root is nested. The root JSON array will be
 * used by default.
 *
 *     // rootPropety config
 *     rootProperty: 'embedded.myresults'
 *
 *     // server response
 *     {
 *         embedded: {
 *             myresults: [{
 *                 name: 'Scott',
 *                 age: 22
 *             }, {
 *                 name: 'Ramona',
 *                 age: 24
 *             }]
 *         },
 *         success: true
 *     }
 *
 * ##XML Reader
 * `rootProperty` is a CSS selector. The root XML element will be used
 * by default.
 *
 *     // rootProperty config (plus record config)
 *     rootProperty: 'myresults',
 *     record: 'user'
 *
 *     // server response
 *     <?xml version="1.0" encoding="UTF-8"?>
 *     <embedded>
 *         <myresults>
 *             <user>
 *                 <name>Scott</name>
 *                 <age>22</age>
 *             </user>
 *             <user>
 *                 <name>Ramona</name>
 *                 <age>24</age>
 *             </user>
 *         </myresults>
 *     </embedded>
 *
 * ##Array Reader
 * `rootProperty` is not typically applicable since the data is assumed to be a
 * single-level array of arrays.  However, if the array of records is returned
 * within a JSON response a `rootProperty` config may be used:
 *
 *     // rootProperty config
 *     rootProperty: 'embedded.myresults'
 *
 *     // server response
 *     {
 *         embedded: {
 *             myresults: [['Scott', 22], ['Ramona', 24]]
 *         },
 *         success: true
 *     }
 *
 * ##rootProperty as a function
 * The `rootProperty` may also be a function that returns the root node from
 * the dataset. For example:
 *
 *     var store = Ext.create('Ext.data.TreeStore', {
 *         proxy: {
 *             type: 'memory',
 *             reader: {
 *                 type: 'json',
 *                 rootProperty: function(data){
 *                     // Extract child nodes from the items or children property in the dataset
 *                     return data.items || data.children;
 *                 }
 *             }
 *         },
 *         data: {
 *             items: [{
 *                 text: 'item 1',
 *                 children: [{
 *                     text: 'child A',
 *                     leaf: true
 *                 }]
 *             }]
 *         }
 *     });
 *
 *     Ext.create('Ext.tree.Panel', {
 *         title: 'rootProperty as a function',
 *         width: 200,
 *         height:150,
 *         store: store,
 *         rootVisible: false,
 *         renderTo: Ext.getBody()
 *     });
 *
 * @accessor
 */

/**
 * @cfg {String} [successProperty="success"]
 * Name of the property from which to retrieve the `success` attribute, the value of which indicates
 * whether a given request succeeded or failed (typically a boolean or 'true'|'false'). See
 * {@link Ext.data.proxy.Server}.{@link Ext.data.proxy.Server#exception exception} for additional information.
 * @accessor
 */

/**
 * @cfg {String/Function} [summaryRootProperty=""]
 * Name of the property from which to retrieve remote summary information.
 *
 * The remote summary data should be parseable as a {@link #model} used by this reader.
 * @accessor
 */

/**
 * @cfg {String} [totalProperty="total"]
 * Name of the property from which to retrieve the total number of records in the dataset. This is only needed if
 * the whole dataset is not passed in one go, but is being paged from the remote server.
 * @accessor
 */

/**
 * @cfg {Function|String|Object} [transform]
 * If a transform function is set, it will be invoked just before {@link #readRecords} executes.
 * It is passed the raw (deserialized) data object. The transform function returns a data object, which can be
 * a modified version of the original data object, or a completely new data object. The transform can
 * be a function, or a method name on the Reader instance, or an object with a 'fn' key
 * and an optional 'scope' key.
 *
 * Example usage:
 *
 *     new Ext.data.Store({
 *         model: 'User',
 *         proxy: {
 *             type: 'ajax',
 *             url : 'users.json',
 *             reader: {
 *                 type: 'json',
 *                 transform: {
 *                     fn: function(data) {
 *                         // do some manipulation of the raw data object
 *                         return data;
 *                     },
 *                     scope: this
 *                 }
 *             }
 *         },
 *     });
 *
 * @accessor
 */

/**
* @cfg {String} [typeProperty]
* The name of the property in a node raw data block which indicates the type of the model to be created from that raw data. Useful for heterogeneous trees.
*
* For example, hierarchical geographical data may look like this:
*
*     {
*         nodeType: 'Territory',
*         name: 'EMEA',
*         children: [{
*             nodeType: 'Country',
*             name: 'United Kingdon',
*             children: [{
*                 nodeType: 'City',
*                 name: 'London'
*             }]
*         }]
*     }
*
* You would configure the typeProperty in this case to be `"nodeType"` which would cause the models named "Territory", "Country" and "City" to
* be used.
* @accessor
*/

/**
 * @property {Object} rawData
 * The raw data object that was last passed to {@link #readRecords}. rawData is populated
 * based on the results of {@link Ext.data.proxy.Server#processResponse}. rawData will
 * maintain a cached copy of the last successfully returned records. In other words,
 * if processResponse is unsuccessful, the records from the last successful response
 * will remain cached in rawData.
 *
 * Since Ext JS 5.1.1 you can use the {@link #keepRawData} config option to
 * control this behavior.
 */

/**
 * @property {Boolean} [isReader=true]
 * `true` in this class to identify an object as an instantiated Reader, or subclass thereof.
 */

/**
 * @event exception
 * Fires when the reader receives improperly encoded data from the server
 * @param {Ext.data.reader.Reader} reader A reference to this reader
 * @param {XMLHttpRequest} response The XMLHttpRequest response object
 * @param {Ext.data.ResultSet} error The error object
 */

/**
 * @method constructor
 * Creates new Reader.
 * @param {Object} [config] Config object.
 */

/**
 * @method read
 * Reads the given response object. This method normalizes the different types of response object that may be passed to it.
 * If it's an XMLHttpRequest object, hand off to the subclass' {@link #getResponseData} method.
 * Else, hand off the reading of records to the {@link #readRecords} method.
 * @param {Object} response The response object. This may be either an XMLHttpRequest object or a plain JS object
 * @param {Object} [readOptions] Various options that instruct the reader on how to read the data
 * @param {Function} [readOptions.recordCreator] A function to construct the model based on the processed data. By default,
 * this just calls the model constructor and passes the raw data.
 * @return {Ext.data.ResultSet} The parsed or default ResultSet object
 */

/**
 * @method readRecords
 * Abstracts common functionality used by all Reader subclasses. Each subclass is expected to call this function
 * before running its own logic and returning the Ext.data.ResultSet instance. For most Readers additional
 * processing should not be needed.
 * @param {Object} data The raw data object
 * @param {Object} [readOptions] See {@link #read} for details.
 * @param {Object} [internalReadOptions] (private)
 * @return {Ext.data.ResultSet} A ResultSet object
 */

/**
 * @method getResponseData
 * Takes a raw response object (as passed to the {@link #read} method) and returns the useful data
 * segment from it. This must be implemented by each subclass.
 * @param {Object} response The response object
 * @return {Object} The extracted data from the response. For example, a JSON object or an XML document.
 */
