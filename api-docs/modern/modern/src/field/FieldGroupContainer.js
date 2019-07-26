/**
 * @class Ext.field.FieldGroupContainer
 * @extend Ext.field.Container
 * @xtype groupcontainer
 *
 * This Group Container Field is useful for containing multiple form fields
 * to be a single group and will line up nicely with group other fields.
 * A common use is for grouping a set of related fields.
 */

/**
 * @cfg {Boolean} vertical
 * True to distribute contained controls vertically
 * The default value is false
 */

/**
 * @cfg {String} fieldsName
 * The value used for the name property for each field in the group.
 * If a field defines its own name property, that will take precedence over fieldsName.
 * 
 * Defaults to group id
 */

/**
 * @cfg {Mixed} defaultFieldValue
 * The value used for the name property for each field in the group.
 * If a field defines its own value property, 
 * that will take precedence over defaultFieldValue.
 */

/**
 * @cfg {String} [delegate]
 * A querySelector which identifies child component of the Group, 
 * which manages the change event to be triggered on group items.
 */

/**
 * @cfg shareableName
 * @inheritdoc
 */

/**
 * @property {String} verticalCls
 * @readonly
 */

/**
 * @event change
 * Fires when the value of a field is changed.
 * @param {Ext.field.Field} this This field
 * @param {Object} newValue Group new value
 * @param {Object} oldValue Group previous value before change
 */

/**
 * @method updateFieldsName
 * Update group items name if item name matches with old name 
 * or have no name
 * @param {String} name 
 * @param {String} oldName 
 */

/**
 * @method getGroupItems
 * @private
 * @param {String} [query] An additional query to add to the selector.
 * @return {Array} group items within the container based on delegate
 */

/**
 * @method getValue
 * Returns an object containing the value of each field in the group, keyed to the
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
 * @method setValue
 * Sets the values of fields
 */

/**
 * @method isEqual
 * Returns whether two values are logically equal. Group implementations may override this
 * to provide custom comparison logic appropriate for the particular data type.
 * @param {Object} value1 The first value to compare
 * @param {Object} value2 The second value to compare
 * @return {Boolean} True if the values are equal, false if not equal.
 */

/**
 * @method isValid
 * Returns true if field is valid.
 */