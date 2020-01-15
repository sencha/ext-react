/**
 * @class Ext.data.proxy.JsonP
 * @extend Ext.data.proxy.Server
 * @alias proxy.jsonp
 * @alias proxy.scripttag
 *
 * The JsonP proxy is useful when you need to load data from a domain other than the one your application is running on. If
 * your application is running on http://domainA.com it cannot use {@link Ext.data.proxy.Ajax Ajax} to load its data
 * from http://domainB.com because cross-domain ajax requests are prohibited by the browser.
 *
 * We can get around this using a JsonP proxy. JsonP proxy injects a `<script>` tag into the DOM whenever an AJAX request
 * would usually be made. Let's say we want to load data from http://domainB.com/users - the script tag that would be
 * injected might look like this:
 *
 *     <script src="http://domainB.com/users?callback=someCallback"></script>
 *
 * When we inject the tag above, the browser makes a request to that url and includes the response as if it was any
 * other type of JavaScript include. By passing a callback in the url above, we're telling domainB's server that we want
 * to be notified when the result comes in and that it should call our callback function with the data it sends back. So
 * long as the server formats the response to look like this, everything will work:
 *
 *     someCallback({
 *         users: [
 *             {
 *                 id: 1,
 *                 name: "Ed Spencer",
 *                 email: "ed@sencha.com"
 *             }
 *         ]
 *     });
 *
 * As soon as the script finishes loading, the 'someCallback' function that we passed in the url is called with the JSON
 * object that the server returned.
 *
 * JsonP proxy takes care of all of this automatically. It formats the url you pass, adding the callback parameter
 * automatically. It even creates a temporary callback function, waits for it to be called and then puts the data into
 * the Proxy making it look just like you loaded it through a normal {@link Ext.data.proxy.Ajax AjaxProxy}. Here's how
 * we might set that up:
 *
 *     Ext.define('User', {
 *         extend: 'Ext.data.Model',
 *         fields: ['id', 'name', 'email']
 *     });
 *
 *     let store = new Ext.data.Store({
 *         model: 'User',
 *         proxy: {
 *             type: 'jsonp',
 *             url : 'http://domainB.com/users'
 *         }
 *     });
 *
 *     store.load();
 *
 * That's all we need to do - JsonP proxy takes care of the rest. In this case the Proxy will have injected a script tag
 * like this:
 *
 *     <script src="http://domainB.com/users?callback=callback1"></script>
 *
 * # Customization
 *
 * This script tag can be customized using the {@link #callbackKey} configuration. For example:
 *
 *     let store = new Ext.data.Store({
 *         model: 'User',
 *         proxy: {
 *             type: 'jsonp',
 *             url : 'http://domainB.com/users',
 *             callbackKey: 'theCallbackFunction'
 *         }
 *     });
 *
 *     store.load();
 *
 * Would inject a script tag like this:
 *
 *     <script src="http://domainB.com/users?theCallbackFunction=callback1"></script>
 *
 * # Implementing on the server side
 *
 * The remote server side needs to be configured to return data in this format. Here are suggestions for how you might
 * achieve this using Java, PHP and ASP.net:
 *
 * Java:
 *
 *     boolean jsonP = false;
 *     String cb = request.getParameter("callback");
 *     if (cb != null) {
 *         jsonP = true;
 *         response.setContentType("text/javascript");
 *     } else {
 *         response.setContentType("application/x-json");
 *     }
 *     Writer out = response.getWriter();
 *     if (jsonP) {
 *         out.write(cb + "(");
 *     }
 *     out.print(dataBlock.toJsonString());
 *     if (jsonP) {
 *         out.write(");");
 *     }
 *
 * PHP:
 *
 *     $callback = $_REQUEST['callback'];
 *
 *     // Create the output object.
 *     $output = array('a' => 'Apple', 'b' => 'Banana');
 *
 *     //start output
 *     if ($callback) {
 *         header('Content-Type: text/javascript');
 *         echo $callback . '(' . json_encode($output) . ');';
 *     } else {
 *         header('Content-Type: application/x-json');
 *         echo json_encode($output);
 *     }
 *
 * ASP.net:
 *
 *     String jsonString = "{success: true}";
 *     String cb = Request.Params.Get("callback");
 *     String responseString = "";
 *     if (!String.IsNullOrEmpty(cb)) {
 *         responseString = cb + "(" + jsonString + ")";
 *     } else {
 *         responseString = jsonString;
 *     }
 *     Response.Write(responseString);
 */

/**
 * @cfg {String} [callbackKey="callback"]
 * See {@link Ext.data.JsonP#callbackKey}.
 * @accessor
 */

/**
 * @cfg {String} [recordParam="records"]
 * The HTTP parameter name to use when passing records to the server and the {@link #writer Json writer} is not configured
 * to {@link Ext.data.writer.Json#encode encode} records into a parameter.
 *
 * The {@link #encodeRecords} method is used to encode the records to create this parameter's value.
 * @accessor
 */

/**
 * @cfg {Boolean} [autoAppendParams=true]
 * True to automatically append the request's params to the generated url. Defaults to true
 * @accessor
 */

/**
 * @method buildUrl
 * Generates a url based on a given Ext.data.Request object. Adds the params and callback function name to the url
 * @param {Ext.data.Request} request The request object
 * @return {String} The url
 */

/**
 * @method abort
 * Aborts a server request. If no request is passed, the most recent request
 * will be aborted.
 * @param {Ext.data.Request} [request] The request to abort.
 */

/**
 * @method encodeRecords
 * Encodes an array of records into a value suitable to be added to the request `params` as the {@link #recordParam} parameter.
 * This is broken out into its own function so that it can be easily overridden.
 *
 * The default implementation
 * @param {Ext.data.Model[]} records The records array
 * @return {Array} An array of record data objects
 */
