/**
 * @class Ext.data.validator.IPAddress
 * @extend Ext.data.validator.Format
 * @alias data.validator.ipaddress
 *
 * Validates that the value is a valid IP address.
 *
 * Works for both IPV4 and IPV6.
 */

/**
 * @cfg {String} [message="Is not a valid IP address"]
 * The error message to return when the value is not a valid IP address
 * @accessor
 */

/**
 * @cfg {RegExp} matcher
 * A matcher to check for valid IP address. This may be overridden.
 * @accessor
 */