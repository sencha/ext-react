/**
 * @class Ext.data.ErrorCollection
 * @extend Ext.util.MixedCollection
 *
 * Wraps a collection of validation error responses and provides convenient functions for
 * accessing and errors for specific fields.
 *
 * Usually this class does not need to be instantiated directly - instances are instead
 * created automatically when {@link Ext.data.Model#validate validate} on a model instance:
 *
 *      // Validate some existing model instance - in this case it returned 2 failures
 *      // messages
 *      
 *      var errors = myModel.validate();
 *      errors.isValid(); //false
 *      
 *      errors.length; //2
 *      errors.getByField('name');  // [{field: 'name',  message: 'must be present'}]
 *      errors.getByField('title'); // [{field: 'title', message: 'is too short'}]
 */

/**
 * @method isValid
 * Returns true if there are no errors in the collection
 * @return {Boolean}
 */

/**
 * @method getByField
 * Returns all of the errors for the given field
 * @param {String} fieldName The field to get errors for
 * @return {Object[]} All errors for the given field
 */
