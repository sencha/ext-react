/**
 * @class Ext.data.flash.BinaryXhr
 * @extend Ext.Base
 *
 * Simulates an XMLHttpRequest object's methods and properties as returned
 * form the flash polyfill plugin. Used in submitting binary data in browsers that do 
 * not support doing so from JavaScript.
 *
 * NOTE: By default this will look for the flash object in the ext directory. When
 * packaging and deploying the app, copy the `ext/plugins` directory and its
 * contents to your root directory. For custom deployments where just the `FlashPlugin.swf`
 * file gets copied (e.g. to `/resources/FlashPlugin.swf`), make sure to notify the
 * framework of the location of the plugin before making the first attempt to post binary
 * data, e.g. in the `launch` method of your app do:
 *
 *     Ext.flashPluginPath="/resources/FlashPlugin.swf";
 *
 * @private
 */

/**
 * @property {number} [readyState=0]
 * The connection's simulated readyState. Note that the only supported values are 0, 1 and 4. States 2 and 3 will never be reported.
 */

/**
 * @property {number} [status=0]
 * Connection status code returned by flash or the server.
 */

/**
 * @property {String} [statusText=""]
 * Status text (if any) returned by flash or the server.
 */

/**
 * @property {Array} responseBytes
 * The binary bytes returned.
 */

/**
 * @method constructor
 * Creates a new instance of BinaryXhr.
 */

/**
 * @method abort
 * Abort this connection. Sets its readyState to 4.
 */

/**
 * @method getAllResponseHeaders
 * As in XMLHttpRequest.
 */

/**
 * @method getResponseHeader
 * As in XMLHttpRequest.
 */

/**
 * @method open
 * As in XMLHttpRequest.
 */

/**
 * @method overrideMimeType
 * As in XMLHttpRequest.
 */

/**
 * @method send
 * Initiate the request.
 * @param {Array} body an array of byte values to send.
 */

/**
 * @method setRequestHeader
 * As in XMLHttpRequest.
 */

/**
 * @method onreadystatechange
 * As in XMLHttpRequest.
 */
