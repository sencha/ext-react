/**
 * @class Ext.field.Manager
 * This mixin is used by {@link Ext.field.Panel fieldpanel} to provide field management
 * methods.
 *
 * ## Setting Form Data
 *
 * The {@link #setValues} can be used to populate fields from a data object.
 *
 *     form.setValues({
 *         name: 'Peter',
 *         email: 'peter.venkman@gb.com',
 *         password: 'secret'
 *     });
 *
 * It's also easy to load {@link Ext.data.Model Model} instances into a form - let's say
 * we have a User model and want to load a particular instance into our form:
 *
 *     Ext.define('MyApp.model.User', {
 *         extend: 'Ext.data.Model',
 *         config: {
 *             fields: ['name', 'email', 'password']
 *         }
 *     });
 *
 *     var ed = Ext.create('MyApp.model.User', {
 *         name: 'Peter',
 *         email: 'peter.venkman@gb.com',
 *         password: 'secret'
 *     });
 *
 *     form.setRecord(ed);
 *
 * ## Setting multiple errors on fields
 *
 * While you can call {@link Ext.field.Field#setError} and
 * {@link Ext.field.Field#setError setError(null)} on each field, in your form, FormPanel provides a
 * {@link #setErrors} method that will apply an Object of error states to multiple fields
 * with one call:
 *
 *      panel.setErrors({
 *          field1: 'field1 is in error',
 *          name2: 'field2 is in error',
 *          fieldname3: null,   // clear any errors
 *          fieldname4: [ 'one', 'two', 'three' },      // multiple errors
 *          ...
 *      });
 *
 * While you can call {@link Ext.field.Field#getError} on each field in the form to query
 * the form for errors, you can call {@link #getError} on the form to get an array of
 * error states, suitable to pass into {@link #setErrors}.
 *
 * NOTE: these methods will only work on fields with a {@link Ext.field.Field#cfg!name name}
 * config specified.
 * @protected
 * @since 6.5.0
 */

/**
 * @method setValues
 * Sets the values of form fields in bulk. Example usage:
 *
 *     myForm.setValues({
 *         name: 'Bill',
 *         crazy: true,
 *         username: 'bill.preston'
 *     });
 *
 * If there groups of checkbox fields with the same name, pass their values in an
 * array. For example:
 *
 *     myForm.setValues({
 *         name: 'Ted',
 *         crazy: false,
 *         hobbies: [
 *             'reading',
 *             'cooking',
 *             'gaming'
 *         ]
 *     });
 *
 * @param {Object} values field name => value mapping object.
 * @return {Ext.field.Manager} this
 */

/**
 * @method getValues
 * Returns an object containing the value of each field in the form, keyed to the
 * field's name.
 *
 * For groups of checkbox fields with the same name, it will be arrays of values.
 * For example:
 *
 *     {
 *         name: "Bill", // From a TextField
 *         favorites: [
 *             'pizza',
 *             'noodle',
 *             'cake'
 *         ]
 *     }
 *
 * @param {Boolean} [enabled] `true` to return only enabled fields.
 * @param {Boolean} [all] `true` to return all fields even if they don't have a
 * {@link Ext.field.Field#name name} configured.
 * @return {Object} Object mapping field name to its value.
 */

/**
 * @method setErrors
 * Marks multiple fields valid or invalid based upon an Object of error states
 *
 * Each key of the error states Object is the name of the field whose validity status
 * is to be affected. Each value of the error states Object is either a string or array
 * of strings to set as the field's invalid message(s). If the value is null or an
 * empty array, the field is marked valid instead of invalid.
 *
 * @param {Object} errors The errors to set child fields with.
 * @return {Ext.field.Manager} this
 */

/**
 * @method clearErrors
 * Marks all named fields as valid by calling setError() on each.
 *
 * @return {Ext.field.Manager} this
 */

/**
 * @method getErrors
 * Gets error state for all named fields of the form.
 *
 * The Object returned is exactly the same as one that can be passed to {@link #setErrors}.
 */

/**
 * @method isValid
 * Test to see if the form has any invalid fields.
 *
 * **NOTE** This method does not validate the fields, it only returns
 * `true` if any field is already marked invalid using the field's
 * {@link Ext.field.Field#isValid isValid}. If field values need to
 * be validated, {@link #validate} should be used instead.
 *
 * @return {Boolean} `true` if all fields are currently valid.
 */

/**
 * @method validate
 * Calls {@link Ext.field.Field#validate validate} on each field in the form.
 *
 * **Note** This will validate the field's current value. If you want to check if
 * all the fields are currently valid without validating the fields value,
 * {@link #isValid} should be used instead.
 *
 * @param {Boolean} [skipLazy] (private) Pass `true` to skip validators marked as `lazy`.
 * @return {Boolean} `true` if all fields in the form are valid, false if
 * any one (or more) of the fields is invalid.
 */
