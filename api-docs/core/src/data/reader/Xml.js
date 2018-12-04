/**
 * @class Ext.data.reader.Xml
 * @extend Ext.data.reader.Reader
 * @alias reader.xml
 *
 * The XML Reader is used by a Proxy to read a server response that is sent back in XML format. This usually happens as
 * a result of loading a Store - for example we might create something like this:
 *
 *     Ext.define('User', {
 *         extend: 'Ext.data.Model',
 *         fields: ['id', 'name', 'email']
 *     });
 *
 *     let store = new Ext.data.Store({
 *         model: 'User',
 *         proxy: {
 *             type: 'ajax',
 *             url : 'users.xml',
 *             reader: {
 *                 type: 'xml',
 *                 record: 'user',
 *                 rootProperty: 'users'
 *             }
 *         }
 *     });
 *
 * The example above creates a 'User' model. Models are explained in the {@link Ext.data.Model Model} docs if you're not
 * already familiar with them.
 *
 * We created the simplest type of XML Reader possible by simply telling our {@link Ext.data.Store Store}'s {@link
 * Ext.data.proxy.Proxy Proxy} that we want a XML Reader. The Store automatically passes the configured model to the
 * Store, so it is as if we passed this instead:
 *
 *     reader: {
 *         type : 'xml',
 *         model: 'User',
 *         record: 'user',
 *         rootProperty: 'users'
 *     }
 *
 * The reader we set up is ready to read data from our server - at the moment it will accept a response like this:
 *
 *     <?xml version="1.0" encoding="UTF-8"?>
 *     <users>
 *         <user>
 *             <id>1</id>
 *             <name>Ed Spencer</name>
 *             <email>ed@sencha.com</email>
 *         </user>
 *         <user>
 *             <id>2</id>
 *             <name>Abe Elias</name>
 *             <email>abe@sencha.com</email>
 *         </user>
 *     </users>
 *
 * First off there's {@link #rootProperty} option to define the root node `<users>` (there should be only one in a well-formed
 * XML document). Then the XML Reader uses the configured {@link #record} option to pull out the data for each record -
 * in this case we set record to 'user', so each `<user>` above will be converted into a User model.
 *
 * Note that XmlReader doesn't care whether your {@link #rootProperty} and {@link #record} elements are nested deep inside a
 * larger structure, so a response like this will still work:
 *
 *     <?xml version="1.0" encoding="UTF-8"?>
 *     <deeply>
 *         <nested>
 *             <xml>
 *                 <users>
 *                     <user>
 *                         <id>1</id>
 *                         <name>Ed Spencer</name>
 *                         <email>ed@sencha.com</email>
 *                     </user>
 *                     <user>
 *                         <id>2</id>
 *                         <name>Abe Elias</name>
 *                         <email>abe@sencha.com</email>
 *                     </user>
 *                 </users>
 *             </xml>
 *         </nested>
 *     </deeply>
 *
 * If this Reader is being used by a {@link Ext.data.TreeStore TreeStore} to read tree-structured data in which records
 * are nested as descendant nodes of other records, then this lenient behaviour must be overridden by using a more specific
 * child node selector as your {@link #record} selector which will not select all descendants, such as:
 *
 *    record: '>user'
 *
 * # Response metadata
 *
 * The server can return additional data in its response, such as the {@link #totalProperty total number of records} and
 * the {@link #successProperty success status of the response}. These are typically included in the XML response like
 * this:
 *
 *     <?xml version="1.0" encoding="UTF-8"?>
 *     <users>
 *         <total>100</total>
 *         <success>true</success>
 *         <user>
 *             <id>1</id>
 *             <name>Ed Spencer</name>
 *             <email>ed@sencha.com</email>
 *         </user>
 *         <user>
 *             <id>2</id>
 *             <name>Abe Elias</name>
 *             <email>abe@sencha.com</email>
 *         </user>
 *     </users>
 *
 * If these properties are present in the XML response they can be parsed out by the XmlReader and used by the Store
 * that loaded it. We can set up the names of these properties by specifying a final pair of configuration options:
 *
 *     reader: {
 *         type: 'xml',
 *         rootProperty: 'users',
 *         totalProperty  : 'total',
 *         successProperty: 'success'
 *     }
 *
 * These final options are not necessary to make the Reader work, but can be useful when the server needs to report an
 * error or if it needs to indicate that there is a lot of data available of which only a subset is currently being
 * returned.
 *
 * # Response format
 *
 * **Note:** in order for the browser to parse a returned XML document, the Content-Type header in the HTTP response
 * must be set to "text/xml" or "application/xml". This is very important - the XmlReader will not work correctly
 * otherwise.
 */

/**
 * @cfg {String} record (required)
 * The DomQuery path to the repeated element which contains record information.
 *
 * By default, the elements which match the selector may be nested at any level
 * below the {@link #rootProperty}
 *
 * If this Reader is being used by a {@link Ext.data.TreeStore TreeStore} to read tree-structured data,
 * then only first generation child nodes of the root element must be selected, so the record selector must be
 * specified with a more specific selector which will not select all descendants. For example:
 *
 *    record: '>node'
 *
 * @accessor
 */

/**
 * @cfg {String} [namespace=""]
 * A namespace prefix that will be prepended to the field name when reading a
 * field from an XML node.  Take, for example, the following Model:
 *
 *     Ext.define('Foo', {
 *         extend: 'Ext.data.Model',
 *         fields: ['bar', 'baz']
 *     });
 *
 * The reader would need to be configured with a namespace of 'n' in order to read XML
 * data in the following format:
 *
 *     <foo>
 *         <n:bar>bar</n:bar>
 *         <n:baz>baz</n:baz>
 *     </foo>
 *
 * @accessor
 */

/**
 * @method getData
 * Normalizes the data object.
 * @param {Object} data The raw data object
 * @return {Object} The documentElement property of the data object if present, or the same object if not.
 */

/**
 * @method readRecords
 * Parses an XML document and returns a ResultSet containing the model instances.
 * @param {Object} doc Parsed XML document
 * @param {Object} [readOptions] See {@link #read} for details.
 * @param {Object} [internalReadOptions] (private)
 * @return {Ext.data.ResultSet} The parsed result set
 */
