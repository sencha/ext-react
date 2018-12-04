/**
 * @class Ext.data.validator.Bound
 * @extend Ext.data.validator.Validator
 * @alias data.validator.bound
 *
 * A superclass for a validator that checks if a value is within a certain range.
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
 * @cfg {String} [emptyMessage="Must be present"]
 * The error message to return when the value is empty.
 * @accessor
 */

/**
 * @cfg {String} [minOnlyMessage="Value must be greater than {0}"]
 * The error message to return when the value is less than the minimum
 * and only a minimum is specified.
 * @accessor
 */

/**
 * @cfg {String} [maxOnlyMessage="Value must be less than {0}"]
 * The error message to return when the value is more than the maximum
 * and only a maximum is specified.
 * @accessor
 */

/**
 * @cfg {String} [bothMessage="Value must be between {0} and {1}"]
 * The error message to return when the value is not in the specified range
 * and both the minimum and maximum are specified.
 * @accessor
 */
