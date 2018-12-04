/**
 * @class Ext.data.reader.Array
 * @extend Ext.data.reader.Json
 * @alias reader.array
 *
 * Data reader class to create an Array of {@link Ext.data.Model} objects from an Array.
 * Each element of that Array represents a row of data fields. The
 * fields are pulled into a Record object using as a subscript, the `mapping` property
 * of the field definition if it exists, or the field's ordinal position in the definition.
 * 
 * ##Example code:
 * 
 *      Employee = Ext.define('Employee', {
 *          extend: 'Ext.data.Model',
 *          fields: [
 *              'id',
 *              {name: 'name', mapping: 1},         // "mapping" only needed if an "id" field is present which
 *              {name: 'occupation', mapping: 2}    // precludes using the ordinal position as the index.
 *          ]
 *      });
 *
 *       var myReader = new Ext.data.reader.Array({
 *            model: 'Employee'
 *       }, Employee);
 *
 * This would consume an Array like this:
 *
 *      [ [1, 'Bill', 'Gardener'], [2, 'Ben', 'Horticulturalist'] ]
 *
 */

 /**
  * @constructor
  * Create a new ArrayReader
  * @param {Object} meta Metadata configuration options.
  */

/**
 * @cfg totalProperty
 * @inheritdoc
 * @accessor
 */

/**
 * @cfg successProperty
 * @inheritdoc
 * @accessor
 */

/**
 * @cfg {Boolean} preserveRawData
 * @hide
 * @accessor
 */
