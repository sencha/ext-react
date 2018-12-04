/**
 * @class Ext.data.validator.Number
 * @extend Ext.data.validator.Format
 * @alias data.validator.number
 *
 * Validates that the value is a valid number.
 *
 * A valid number may include a leading + or -, comma separators, and a single decimal point.
 */

/**
 * @cfg {String} [message="Is not a valid number"]
 * The error message to return when the value is not a valid number
 * @accessor
 */

/**
 * @cfg {RegExp} [matcher="/^(\+|\-){0,1}(\d{1,3}(,\d{3})*(\.\d+)?|\.\d+)$/"]
 * A matcher to check for valid number string. This may be overridden.
 * @accessor
 */
