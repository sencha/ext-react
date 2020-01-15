/**
 * @class Ext.data.JsonP
 * @extend Ext.Base
 * @singleton
 * This class is used to create JSONP requests. JSONP is a mechanism that allows for making
 * requests for data cross domain. JSONP is basically a `<script>` node with the source of the url executing
 * a function that was created by Ext.data.JsonP. Once the resource has loaded, the `<script>` node will be destroyed.
 *
 * If you have a request such as:
 *
 *     Ext.data.JsonP.request({
 *         url : 'foo.php'
 *     });
 *
 * Ext.data.JsonP will create a `<script>` node in the `<head>` with the `src` attribute pointing to
 * `foo.php?callback=Ext.data.JsonP.callback1`. The `foo.php` script will have to detect the `callback` URL parameter
 * and return valid JavaScript:
 *
 *     Ext.data.JsonP.callback1({"foo":"bar"});
 *
 * A simple PHP example would look like:
 *
 *     <?php
 *
 *     $data = array('foo' => 'bar');
 *
 *     if (!empty($_REQUEST['callback'])) {
 *         header('Content-Type: application/javascript');
 *         echo $_REQUEST['callback'] . '(';
 *     }
 *
 *     echo json_encode($data);
 *
 *     if (!empty($_REQUEST['callback']) {
 *         echo ');';
 *     }
 *
 *     ?>
 *
 * More information is available <a href="http://en.wikipedia.org/wiki/JSONP">here</a>. You
 * can also use <a href="http://www.jsonplint.com">JSONPLint</a> to test your JSONP.
 */

/**
 * @property {Number} [timeout=30000]
 * A default timeout for any JsonP requests. If the request has not completed in this time the
 * failure callback will be fired. The timeout is in ms. Defaults to `30000`.
 */

/**
 * @property {Boolean} [disableCaching=true]
 * True to add a unique cache-buster param to requests. Defaults to true.
 */

/**
 * @property {String} [disableCachingParam="_dc"]
 * @type String
 * Change the parameter which is sent went disabling caching through a cache buster. Defaults to `'_dc'`.
 */

/**
 * @property {String} [callbackKey="callback"]
 * Specifies the GET parameter that will be sent to the server containing the function name to be executed when
 * the request completes. Defaults to `callback`. Thus, a common request will be in the form of
 * url?callback=Ext.data.JsonP.callback1
 */

/**
 * @method request
 * Makes a JSONP request.
 * @param {Object} options An object which may contain the following properties. Note that options will
 * take priority over any defaults that are specified in the class.
 * @param {String} options.url The URL to request.
 * @param {Object} options.params (optional) An object containing a series of key value pairs that
 * will be sent along with the request.
 * @param {Number} options.timeout (optional) See {@link #timeout}
 * @param {String} options.callbackKey (optional) See {@link #callbackKey}
 * @param {String} options.callbackName (optional) The function name to use for this request. By
 * default this name will be auto-generated: Ext.data.JsonP.callback1, Ext.data.JsonP.callback2, etc.
 * Setting this option to "my_name" will force the function name to be Ext.data.JsonP.my_name. Use
 * this if you want deterministic behavior, but be careful - the callbackName should be different
 * in each JsonP request that you make.
 * @param {Boolean} options.disableCaching (optional) See {@link #disableCaching}
 * @param {String} options.disableCachingParam (optional) See {@link #disableCachingParam}
 * @param {Function} options.success (optional) A function to execute if the request succeeds.
 * @param {Function} options.failure (optional) A function to execute if the request fails.
 * @param {Function} options.callback (optional) A function to execute when the request completes,
 * whether it is a success or failure.
 * @param {Object} options.scope (optional) The scope in which to execute the callbacks: The "this"
 * object for the callback function. Defaults to the browser window.
 *
 * @return {Object} request An object containing the request details.
 */

/**
 * @method abort
 * Abort a request. If the request parameter is not specified all open requests will
 * be aborted.
 * @param {Object/String} request (Optional) The request to abort
 */
