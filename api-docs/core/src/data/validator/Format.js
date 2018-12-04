/**
 * @class Ext.data.validator.Format
 * @extend Ext.data.validator.Validator
 * @alias data.validator.format
 *
 * Validates that the passed value matches a specific format specified by a regex.
 * The format is provided by the {@link #matcher} config.
 */

/**
 * @cfg {String} [message="Is in the wrong format"]
 * The error message to return when the value does not match the format.
 * @accessor
 */

/**
 * @cfg {RegExp} matcher (required)
 * The matcher regex to test against the value.
 * @accessor
 */
