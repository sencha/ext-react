/**
 * @class Ext.data.validator.Length
 * @extend Ext.data.validator.Bound
 * @alias data.validator.length
 * Validates that the length of the value is between a {@link #min} and {@link #max}.
 */

/**
 * @cfg {Number} min
 * The minimum length value.
 * @accessor
 */

/**
 * @cfg {Number} max
 * The maximum length value.
 * @accessor
 */

/**
 * @cfg {String} [minOnlyMessage="Length must be at least {0}"]
 * The error message to return when the value is less than the minimum
 * length and only a minimum is specified.
 * @accessor
 */

/**
 * @cfg {String} [maxOnlyMessage="Length must be no more than {0}"]
 * The error message to return when the value is more than the maximum
 * length and only a maximum is specified.
 * @accessor
 */

/**
 * @cfg {String} [bothMessage="Length must be between {0} and {1}"]
 * The error message to return when the value length is not in the specified
 * range and both the minimum and maximum are specified.
 * @accessor
 */
