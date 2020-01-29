/**
 * @class Ext.exporter.File
 * @extend Ext.Base
 * @singleton
 *
 * This singleton has methods for file manipulation.
 *
 * It allows file saving using browser features or remote server calls.
 *
 * Call {@link #saveAs} to save text files or {@link #saveBinaryAs} to save binary files.
 * If the browser doesn't support file saving then those functions will upload
 * the file content to the server address provided in {@link #url}.
 *
 * The script from the default {@link #url} has a 5Mb upload limitation for file content.
 * In the "server" folder of the `exporter` package there are examples of
 * scripts that could be used to implement an in-house server.
 *
 * **Note:** When using server side download browser pop-ups should NOT be blocked.
 */

/**
 * @property {String} [url='https://exporter.sencha.com']
 *
 * Address of the server that supports file downloading. Check out the scripts
 * from the "server" folder of the `exporter` package if an in-house server
 * needs to be implemented.
 */

/**
 * @property {Boolean} [forceDownload=false]
 *
 * Set to `true` to always download files from the server {@link #url} instead of saving
 * files using browser features.
 */

/**
 * @method initializePopup
 * This function tries to open a new pop-up window that will be used to
 * download the file using a remote server call.
 *
 * This function needs to be called after the end-user clicked a button and it should
 * happen in the same cycle as the user interaction otherwise the browser will block it.
 *
 * See http://stackoverflow.com/a/2587692 for more details.
 *
 * @param {Boolean} binary Set to true if the file to be downloaded is binary
 */

/**
 * @method saveBinaryAs
 * Save a binary file locally using either [Blob][1] or server side script.
 *
 * [1]: https://developer.mozilla.org/en/docs/Web/API/Blob
 *
 * Browser compatibility when using [Blob][1]:
 *
 * - Firefox 20+: max blob size 800 MB
 * - Chrome: max blob size 500 MB
 * - Chrome for Android: max blob size 500 MB
 * - Edge: max blob size n/a
 * - IE 10+: max blob size 600 MB
 * - Opera 15+: max blob size 500 MB
 *
 * For all other browsers it falls back to server side script which means that
 * the file content is uploaded to the server script defined in {@link #url} and comes
 * back to the browser as a file download.
 *
 * @param {String} content File content
 * @param {String} filename Name of the file including the extension
 * @param {String} [charset='UTF-8'] File's charset
 * @param {String} [mimeType='application/octet-stream'] Mime type of the file
 * @return {Ext.promise.Promise}
 */

/**
 * @method downloadBinaryAs
 * Save a binary file using a server side script. The file content, file name, charset and
 * mime-type are uploaded to the server side script and a download is forced from the server.
 *
 * This method can be used when the browser doesn't support [Blobs][1].
 *
 * [1]: https://developer.mozilla.org/en/docs/Web/API/Blob
 *
 * **Note** Browsers pop-ups should NOT be blocked for this feature to work as expected.
 *
 * @param {String} content File content
 * @param {String} filename Name of the file including the extension
 * @param {String} [charset='UTF-8'] File's charset
 * @param {String} [mimeType='application/octet-stream'] Mime type of the file
 * @return {Ext.promise.Promise}
 */

/**
 * @method saveAs
 * Save a text file locally using the content and name provided.
 *
 * Browser	compatibility:
 *
 * - Firefox 20+: max blob size 800 MB
 * - Chrome: max blob size 500 MB
 * - Chrome for Android: max blob size 500 MB
 * - Edge: max blob size n/a
 * - IE 10+: max blob size 600 MB
 * - IE < 10: Files are saved as text/html and max file size n/a
 * - Opera 15+: max blob size 500 MB
 * - Opera < 15: max blob size n/a
 * - Safari 6.1+: max blob size n/a; Blobs may be opened instead of saved sometimes—you may have
 * to direct your Safari users to manually press ⌘+S to save the file after it is opened.
 * Using the application/octet-stream MIME type to force downloads can cause issues in Safari.
 * - Safari < 6: max blob size n/a
 *
 *
 * @param {String} content File content
 * @param {String} filename Name of the file including the extension
 * @param {String} [charset='UTF-8'] File's charset
 * @param {String} [mimeType='application/octet-stream'] Mime type of the file
 * @return {Ext.promise.Promise}
 */
