/**
 * @class Ext.data.validator.CurrencyUS
 * @extend Ext.data.validator.Format
 * @alias data.validator.currency-us
 *
 * Validates that the value is a valid U.S. currency value.
 *
 * A valid number may include a leading + or -, dollar sign, comma separators, and a single decimal point.
 * Both $-100 and -$100 are valid.  If a decimal point is present, two digits must follow.
 *
 */

/**
 * @cfg {String} [message="Is not a valid currency amount"]
 * The error message to return when the value is not a valid currency amount
 * @accessor
 */

/**
 * @cfg {RegExp} matcher
 * A matcher to check for simple currency amount. This may be overridden.
 * @accessor
 */
