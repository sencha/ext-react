/**
 * @class Ext.data.amf.RemotingMessage
 * @alias data.amf.remotingmessage
 * Represents a remote call to be sent to the server.
 */

/**
 * @property {Array} [body=[]]
 * typically an array of parameters to pass to a method call
 * @accessor
 */

/**
 * @property {String} [clientID=""]
 * identifies the calling client.
 * @accessor
 */

/**
 * @property {String} [destination=""]
 * the service destination on the server
 * @accessor
 */

/**
 * @property {Object} [headers=[]]
 * the headers to attach to the message.
 * Would typically contain the DSEndpoint and DSId fields.
 * @accessor
 */

/**
 * @property {String} [messageId=""]
 * message identifier
 * @accessor
 */

/**
 * @property {String} [operation=""]
 * the method name to call
 * @accessor
 */

/**
 * @property {Array} [source=""]
 * should be empty for security purposes
 * @accessor
 */

/**
 * @property {Number} [timestamp=[]]
 * when the message was created
 * @accessor
 */

/**
 * @property {Number} [timeToLive=[]]
 * how long the message is still valid for passing
 * @accessor
 */
