/**
 * @class Ext.data.validator.Validator
 * @extend Ext.Base
 * @mixins Ext.mixin.Factoryable
 * @alias data.validator.base
 *
 * The base class for validators to be used to validate {@link Ext.data.Field fields} in
 * a {@link Ext.data.Model model}.
 * 
 * The model will call the {@link #validate} method, which may be overridden by subclasses.
 */

/**
 * @property {String} [type="base"]
 * A string representation of this format.
 */

/**
 * @method constructor
 * Creates new Validator.
 * @param {Object/Function} config A config object. A function may also be passed,
 * which will be used as the {@link #validate} method for this validator.
 */

/**
 * @method validate
 * Validates the passed value.
 * @param {Object} value The value
 * @param {Ext.data.Model} record The record
 * @return {Boolean/String} `true` if the value is valid. A string may be returned if the value
 * is not valid, to indicate an error message. Any other non `true` value indicates the value
 * is not valid.
 */
