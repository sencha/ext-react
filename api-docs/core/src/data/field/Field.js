/**
 * @class Ext.data.field.Field
 * @extend Ext.Base
 * @mixins Ext.mixin.Factoryable
 * @alias data.field.auto
 *
 * Fields are used to define the members of a Model. They aren't instantiated directly;
 * instead, when we create a class that extends {@link Ext.data.Model}, it automatically
 * creates Field instances for each field configured in a {@link Ext.data.Model Model}.
 * For example, we might set up a model like this:
 *
 *     Ext.define('User', {
 *         extend: 'Ext.data.Model',
 *         fields: [
 *             'name', 'email',
 *             { name: 'age', type: 'int' },
 *             { name: 'gender', type: 'string', defaultValue: 'Unknown' }
 *         ]
 *     });
 *
 * Four fields will have been created for the User Model - name, email, age and gender.
 * Note that we specified a couple of different formats here; if we only pass in the string
 * name of the field (as with name and email), the field is set up with the 'auto' type.
 * It's as if we'd done this instead:
 *
 *     Ext.define('User', {
 *         extend: 'Ext.data.Model',
 *         fields: [
 *             { name: 'name', type: 'auto' },
 *             { name: 'email', type: 'auto' },
 *             { name: 'age', type: 'int' },
 *             { name: 'gender', type: 'string', defaultValue: 'Unknown' }
 *         ]
 *     });
 *
 * # Field Types
 *
 * Fields come in various types. When declaring a field, the `type` property is used to
 * specify the type of `Field` derived class used to manage values.
 *
 * The predefined set of types are:
 *
 *  - {@link Ext.data.field.Field auto} (Default, implies no conversion)
 *  - {@link Ext.data.field.String string}
 *  - {@link Ext.data.field.Integer int}
 *  - {@link Ext.data.field.Number number}
 *  - {@link Ext.data.field.Boolean boolean}
 *  - {@link Ext.data.field.Date date}
 *
 * # Conversion
 *
 * When reading fields it is often necessary to convert the values received before using
 * them or storing them in records. To handle these cases there is the
 * `{@link #method-convert convert}` method. This method is passed the received value (as
 * well as the current record instance, but see below) and it returns the value to carry
 * forward.
 *
 * For `auto` fields there is no `{@link #method-convert convert}` method. This is for
 * efficiency. For other field types, there are often `convert` methods. You can provide
 * a `{@link #cfg-convert convert}` config when the field is defined like this:
 *
 *      {
 *          name: 'timestamp',
 *
 *          convert: function (value) {
 *              return new Date(value);
 *          }
 *      }
 *
 * While this can be convenient, see below for details on defining Custom Types as that is
 * often a better practice and avoids repeating these functions.
 *
 * Note that when a `defaultValue` is specified, it will also be passed through to
 * `convert` (either to the `{@link #method-convert convert}` method or to the
 * `{@link #cfg-convert convert} config)`.
 *
 * ## Calculated Values
 *
 * In some cases fields are the result of a calculation from other fields. Historically
 * this was a second role for `{@link #method-convert convert}` but that has some short
 * comings. The simpler solution is the `{@link #cfg-calculate calculate}` config.
 *
 * Values produced by `{@link #cfg-calculate calculate}` and `{@link #method-convert convert}`
 * are stored in the record as with any other field. In fact, if we define a calculated
 * "firstName" field and log out all of the data, we'll see this:
 *
 *     var ed = Ext.create('User', { name: 'Ed Spencer' });
 *
 *     console.log(ed.data);
 *
 *     //outputs this:
 *     {
 *         age: 0,
 *         email: "",
 *         firstName: "Ed",  // calculated field
 *         gender: "Unknown",
 *         name: "Ed Spencer"
 *     }
 *
 * ### Using `calculate`
 *
 *      {
 *          name: 'firstName',
 *
 *          calculate: function (data) {
 *              return data.name.split(' ')[0];
 *          }
 *      }
 *
 * Using `{@link #cfg-calculate calculate}` is the simplest and safest way to define a
 * calculated field. The most important part of this is that, internally, the code of the
 * supplied function is parsed to extract its dependencies. In this case, the "name" field
 * is the only dependency. This means that "firstName" will only need to be recalculated
 * when "name" is modified.
 *
 * **Note:** Fields used by the calculate method must be explicitly defined in the
 * {@link Ext.data.Model#cfg-fields #fields} of the model.
 *
 * ### Using `convert`
 *
 * Following is the equivalent technique using `{@link #cfg-convert convert}`
 *
 *      {
 *          name: 'firstName',
 *
 *          convert: function (value, record) {
 *              return record.get('name').split(' ')[0];
 *          },
 *
 *          depends: [ 'name' ]
 *      }
 *
 * When a `{@link #method-convert convert}` function accepts a 2nd argument (a reference to
 * the record), it is considered a calculated field. If a `{@link #cfg-depends depends}`
 * config is not provided then this field's dependencies are unknown. In this case, the
 * `{@link #cfg-depends depends}` are provided as would be automatically determined with
 * the `{@link #cfg-calculate calculate}` config.
 *
 * ### Updating
 *
 * Fields modified with the {@link Ext.data.Model#set set} method will have their stored 
 * value set using the convert / calculate method when present.
 * 
 * For example:
 *
 *     Ext.define('MyApp.model.Employee', {
 *         extend: 'Ext.data.Model',
 *         fields: [{
 *             name: 'salary',
 *             convert: function (val) {
 *                 var startingBonus = val * .1;
 *                 return val + startingBonus;
 *             }
 *         }],
 *         convertOnSet: false
 *     });
 *     
 *     var tina = Ext.create('MyApp.model.Employee', {
 *         salary: 50000
 *     });
 *     
 *     console.log(tina.get('salary')); // logs 55000
 *     
 *     tina.set('salary', 60000);
 *     console.log(tina.get('salary')); // logs 60000
 * 
 * This default behavior can be disabled by setting the Model's 
 * `{@link Ext.data.Model#cfg-convertOnSet}` config to `false`.
 * 
 * **Note:** convertOnSet `false` only prevents the convert / calculate call when the 
 * set `fieldName` param matches the field's `{@link #name}`.  See 
 * {@link Ext.data.Model#convertOnSet convertOnSet} for additional details.
 *
 * ### Dependencies
 *
 * When a field's `{@link #method-convert convert}` method processes values from the record
 * (vs. just the field's value), it is best to also provide a `depends` config as shown
 * above. Fields that provide a `{@link #cfg-calculate calculate}` method must follow the
 * proper form for using fields so that dependencies can be extracted.
 *
 * Calculated fields are processed after other fields based on their dependencies. Fields
 * with `{@link #method-convert convert}` methods that use the provided record that do *not*
 * specify a `{@link #cfg-depends depends}` config are processed as a group after all other
 * fields since such converters can rely on anything in the record. The order of processing
 * these fields with respect to each other is unspecified and should not be relied upon.
 *
 * # Serialization
 *
 * To handle the inverse scenario of `convert` there is the `serialize` method. This
 * method is called to produce the value to send to a server based on the internal value
 * as would be returned from `convert`. In most cases, these methods should "round trip"
 * a value:
 *
 *      assertEqual(value, field.serialize(field.convert(value)));
 *
 * By default, only `{@link Ext.data.field.Date date}` fields have a `serialize` method.
 * Other types simply send their value unmodified.
 *
 * # Custom Types
 *
 * Developers may create their own application-specific data types by deriving from this
 * class. This is typically much better than applying multiple configuration values on
 * field instances as these often become repetitive.
 *
 * To illustrate, we define a "time" field type that stores a time-of-day represented as a
 * number of minutes since Midnight.
 *
 *      Ext.define('App.field.Time', {
 *          extend: 'Ext.data.field.Field',
 *
 *          alias: 'data.field.time',
 *
 *          timeFormat: 'g:i',
 *
 *          convert: function (value) {
 *              if (value && Ext.isString(value)) {
 *                  var date = Ext.Date.parse(value, this.timeFormat);
 *                  if (!date) {
 *                      return null;
 *                  }
 *                  return (date.getHours() - 1) * 60 + date.getMinutes();
 *              }
 *              return value;
 *          }
 *      });
 *
 * ## Validation
 *
 * Custom field types can override the `{@link #method-validate validate}` method or
 * provide a set of `{@link #cfg-validators validators}`.
 *
 *      Ext.define('App.field.PhoneNumber', {
 *          extend: 'Ext.data.field.Field',
 *
 *          alias: 'data.field.phonenumber',
 *
 *          // Match U.S. phone numbers for example purposes
 *          validators: {
 *              type: 'format',
 *              matcher: /\d{3}\-\d{3}\-\d{4}/
 *          }
 *      });
 *
 * Once the class is defined, fields can be declared using the new type (based on its
 * `alias`) like so:
 *
 *      Ext.define('App.model.PhoneCall', {
 *          fields: [
 *              { name: 'startTime', type: 'time' },
 *              { name: 'phoneNumber', type: 'phonenumber' }
 *          ]
 *      });
 */

/**
 * @cfg {Boolean} [allowNull=false]
 *
 * Use when converting received data into a {@link Ext.data.field.Integer `int`},
 * {@link Ext.data.field.Number `float`}, {@link Ext.data.field.Boolean `bool`}
 * or {@link Ext.data.field.String `string`} type. If the value cannot be
 * parsed, `null` will be used if allowNull is true, otherwise a default value for that type will be used:
 *
 * - for `int` and `float` - `0`.
 * - for `string` - `""`.
 * - for `bool` - `false`.
 *
 * Note that when parsing of {@link Ext.data.field.Date `date`} type fails, the value will
 * be `null` regardless of this setting.
 */

/**
 * @cfg {Function} calculate
 * This config defines a simple field calculation function. A calculate method only
 * has access to the record data and should return the value of the calculated field.
 * When provided in this way, the `depends` config is automatically determined by
 * parsing the `calculate` function. For example:
 *
 *      fields: [{
 *          name: 'firstName',
 *          type: 'string'
 *      },{
 *          name: 'lastName',
 *          type: 'string'
 *      },{
 *          name: 'fullName',
 *          calculate: function (data) {
 *              return data.firstName + ' ' + data.lastName;
 *          }
 *      }]
 *
 * The above 'fullName' field is equivalent to:
 *
 *      {
 *          name: 'fullName',
 *          convert: function (v, rec) {
 *              return rec.get('firstName') + ' ' + rec.get('lastName');
 *          },
 *          depends: ['firstName', 'lastName']
 *      }
 *
 * The restrictions on form for a `calculate` method are that the accesses to field
 * values must match the following regular expression (case insensitive):
 *
 *      data.([a-z_][a-z0-9_]*)
 *      // where 'data' is the param passed to the calculate method
 *
 * The only advantage of a `calculate` method over a `convert` method is automatic
 * determination of `depends`.
 *
 * **Note:** The use of calculate and {@link #method-convert} are exclusive.  The
 * calculate method will override the convert method if both are configured.
 *
 * **Note:** Fields used by the calculate method must be explicitly defined in the
 * {@link Ext.data.Model#cfg-fields #fields} of the model.
 *
 * @param {Object} data An object with all values for each field in the parent
 * model.  See {@link Ext.data.Model#getData getData}.
 * @return {Mixed} value The value of the calculated field
 */

/**
 * @cfg {Function} convert
 * If specified this config overrides the `{@link #method-convert convert}` method. See
 * also `{@link #cfg-calculate calculate}` for simple field calculations.
 *
 * **Note:** The use of {@link #calculate} and convert are exclusive.  The calculate
 * method will override the convert method if both are configured.
 */

/**
 * @cfg {Boolean} [critical=false]
 * A critical field is a field that must always be sent to the server even if it has
 * not changed. The most common example of such a field is the "id" of a record (see
 * `{@link Ext.data.Model#idProperty}` but the `{@link Ext.data.Model#versionProperty}`
 * is similarly a `critical` field.
 */

/**
 * @property {String} [defaultInvalidMessage="This field is invalid"]
 * The default message to present for an invalid field.
 * @since 5.0.0
 */

/**
 * @cfg {Object} [defaultValue=undefined]
 *
 * The default value used when the creating an instance from a raw data object,
 * and the property referenced by the `{@link Ext.data.field.Field#mapping mapping}`
 * does not exist in that data object.
 *
 * The value `undefined` prevents defaulting in a value.
 */

/**
 * @property {Ext.Class} definedBy
 * The class (derived from {@link Ext.data.Model}) that defined this field.
 *
 *      Ext.define('MyApp.models.Foo', {
 *          extend: 'Ext.data.Model',
 *
 *          fields: [
 *              { name: 'bar' }
 *          ],
 *          ...
 *      });
 *
 *      var barField = MyApp.models.Foo.getField('bar');
 *
 *      alert(barField.definedBy === MyApp.models.Foo); // alerts 'true'
 *
 * When a field is inherited, this value will reference the class that originally
 * defined the field.
 *
 *      Ext.define('MyApp.models.Base', {
 *          extend: 'Ext.data.Model',
 *
 *          fields: [
 *              { name: 'foo' }
 *          ],
 *          ...
 *      });
 *
 *      Ext.define('MyApp.models.Derived', {
 *          extend: 'MyApp.models.Base',
 *
 *          fields: [
 *              { name: 'bar' }
 *          ],
 *          ...
 *      });
 *
 *      var fooField = MyApp.models.Derived.getField('foo');
 *
 *      alert(fooField.definedBy === MyApp.models.Base); // alerts 'true'
 */

/**
 * @cfg {String/String[]} [depends]
 * The field name or names within the {@link Ext.data.Model Model} on which the value
 * of this field depends, and from which a new value may be calculated. These values
 * are the values used by the `convert` method. If you do not have a `convert` method
 * then this config should not be specified.
 *
 * Before using this config you should consider if using a `calculate` method instead
 * of a `convert` method would be simpler.
 *
 * Whenever any of the named fields are set using the {@link Ext.data.Model#set set}
 * method, this fields will have its `convert` method called passing the
 * {@link Ext.data.Model record} so that the dependent value can be calculated from
 * all fields which it needs.
 *
 * For example, to display a person's full name, using two separate `firstName` and
 * `lastName` fields, configure the name field like this:
 *
 *     {
 *         name: 'name',
 *
 *         // Will be called whenever forename or surname fields are set
 *         convert: function (v, rec) {
 *             return rec.get('firstName') + ' ' + rec.get('lastName');
 *         },
 *
 *         depends: [ 'firstName', 'lastName' ],
 *
 *         // It should not be returned to the server - it's not a database field
 *         persist: false
 *     }
 *
 * Note that if you do not want the calculated field to be part of the field set sent
 * back to the server when the store is synchronized, you should configure the field
 * with `persist` set to `false`.
 */

/**
 * @cfg {String/Number/Function} mapping
 *
 * (Optional) A path expression for use by the {@link Ext.data.reader.Reader} implementation that is creating the
 * {@link Ext.data.Model Model} to extract the Field value from the data object. If the path expression is the same
 * as the field name, the mapping may be omitted. A function may be passed to do complex data extraction. The examples
 * below are simple just to demonstrate the capability, typically, a function would not be used to extract such
 * simple data.
 *
 * The form of the mapping expression depends on the Reader being used.
 *
 * - {@link Ext.data.reader.Json}
 *
 *   The mapping is a string containing the javascript expression to reference the data from an element of the data
 *   item's {@link Ext.data.reader.Json#cfg-rootProperty rootProperty} Array. Defaults to the field name. If a function is passed,
 *   a single argument is received which contains the raw json object:
 *
 *       // Server returns [{"name": "Foo", "age": 1}, {"name": "Bar", "age": 2}]
 *       mapping: function(data) {
 *           return data.name;
 *       }
 *
 * - {@link Ext.data.reader.Xml}
 *
 *   The mapping is an {@link Ext.DomQuery} path to the data item relative to the DOM element that represents the
 *   {@link Ext.data.reader.Xml#record record}. Defaults to the field name. If a function is passed, a single argument
 *   is received which contains the record node:
 *
 *       // Server returns <Root><Person><Name>Foo</Name><Age>1</Age></Person><Person><Name>Bar</Name><Age>2</Age></Person></Root>
 *       mapping: function(data) {
 *           return data.firstChild.textContent;
 *       }
 *
 * - {@link Ext.data.reader.Array}
 *
 *   The mapping is a number indicating the Array index of the field's value. Defaults to the field specification's
 *   Array position. If a function is passed, a single argument is received which contains the child array.
 *
 *       // Server returns [["Foo", 1], ["Bar", 2]]
 *       mapping: function(data) {
 *           return data[0];
 *       }
 *
 * If a more complex value extraction strategy is required, then configure the Field with a {@link #cfg-convert}
 * function. This is passed the whole row object, and may interrogate it in whatever way is necessary in order to
 * return the desired data.
 */

/**
 * @cfg {String} name
 *
 * The name by which the field is referenced within the Model. This is referenced by,
 * for example, the `dataIndex` property in column definition objects passed to
 * {@link Ext.grid.property.HeaderContainer}.
 *
 * Note: In the simplest case, if no properties other than `name` are required, a
 * field definition may consist of just a String for the field name.
 */

/**
 * @property {Number} ordinal
 *
 * The position of this field in the {@link Ext.data.Model} in which it was defined.
 */

/**
 * @cfg {Boolean} [persist]
 *
 * False to exclude this field from the {@link Ext.data.Model#modified} fields in a
 * record. This will also exclude the field from being written using a
 * {@link Ext.data.writer.Writer}. This option is useful when fields are used to keep
 * state on the client but do not need to be persisted to the server.
 *
 * Defaults to `false` for `calculated` fields and `true` otherwise.
 */

/**
 * @cfg {String/Object} [reference]
 * The {@link Ext.data.Model#entityName name} of the entity referenced by this field.
 * In most databases, this relationship is represented by a "foreign key". That is, a
 * value for such a field matches the value of the {@link Ext.data.Model#idProperty id}
 * for an entity of this type.
 *
 * For further documentation, see {@link Ext.data.schema.Reference}.
 */

/**
 * @cfg serialize
 * @inheritdoc #method-serialize
 */
    
/**
 * @cfg {String/Object/Function} [summary]
 * The summary type for this field. This is used to calculate a
 * summary value by the {@link Ext.data.Model Model}.
 *
 * - If a string, it should be an alias for one of the Ext.data.summary types.
 * - If an object, a config for one of the Ext.data.summary types.
 * - If a function, it should match the signature for {@link Ext.data.summary.Base#method-calculate calculate}.
 *
 * @since 6.5.0
 */

/**
 * @cfg {String} [summaryField=""]
 * A field to use as the basis for calculating a summary. This is used in
 * conjunction with the virtual summary fields. See {@link Ext.data.Model#cfg-summary}.
 *
 * @since 6.5.0
 */

/**
 * @cfg {Function/String} sortType
 *
 * A function which converts a Field's value to a comparable value in order to ensure
 * correct sort ordering.
 *
 * Predefined functions are provided in {@link Ext.data.SortTypes}. A custom sort example:
 *
 *     // current sort     after sort we want
 *     // +-+------+          +-+------+
 *     // |1|First |          |1|First |
 *     // |2|Last  |          |3|Second|
 *     // |3|Second|          |2|Last  |
 *     // +-+------+          +-+------+
 *
 *     sortType: function(value) {
 *        switch (value.toLowerCase()) // native toLowerCase():
 *        {
 *           case 'first': return 1;
 *           case 'second': return 2;
 *           default: return 3;
 *        }
 *     }
 *
 * May also be set to a String value, corresponding to one of the named sort types in
 * {@link Ext.data.SortTypes}.
 */

/**
 * @cfg {Boolean} [unique=false]
 * `true` if the value of this field is unique amongst all instances. When used with a
 * `reference` this describes a "one-to-one" relationship. It is almost always the case
 * that a `unique` field cannot also be {@link #allowBlank nullable}.
 */

/**
 * @cfg {Object[]} validators
 * An array of {@link Ext.data.validator.Validator validators} for this field. These
 * `validators` will only be passed a field value to validate.
 */

/**
 * @method collate
 * Compares two values to retrieve their relative position in sort order, taking into account
 * any {@link #sortType}. Also see {@link #compare}.
 * @param {Object} value1 The first value.
 * @param {Object} value2 The second value.
 * @return {Number} `-1` if `value1` is less than `value2`. `1` if `value1` is greater than `value2`.
 * `0` otherwise.
 */

/**
 * @method compare
 * Compares two values to retrieve their relative position in sort order. Also see
 * {@link #collate}.
 * @param {Object} value1 The first value.
 * @param {Object} value2 The second value.
 * @return {Number} `-1` if `value1` is less than `value2`. `1` if `value1` is greater than `value2`.
 * `0` otherwise.
 */

/**
 * @method isEqual
 * Tests whether two values are equal based on this field type.
 * This uses the {@link #compare} method to determine equality, so
 * this method should generally not be overridden.
 * @param {Object} value1 The first value.
 * @param {Object} value2 The second value.
 * @return {Boolean} `true` if the values are equal.
 */

/**
 * A function which converts the value provided by the Reader into the value that will
 * be stored in the record. This method can be overridden by a derived class or set as
 * a `{@link #cfg-convert convert}` config.
 *
 * If configured as `null`, then no conversion will be applied to the raw data property
 * when this Field is read. This will increase performance. but you must ensure that
 * the data is of the correct type and does not *need* converting.
 *
 * Example of convert functions:
 *
 *     function fullName(v, record){
 *         return record.data.last + ', ' + record.data.first;
 *     }
 *
 *     function location(v, record){
 *         return !record.data.city ? '' : (record.data.city + ', ' + record.data.state);
 *     }
 *
 *     Ext.define('Dude', {
 *         extend: 'Ext.data.Model',
 *         fields: [
 *             {name: 'fullname',  convert: fullName},
 *             {name: 'firstname', mapping: 'name.first'},
 *             {name: 'lastname',  mapping: 'name.last'},
 *             {name: 'city', defaultValue: 'unknown'},
 *             'state',
 *             {name: 'location',  convert: location}
 *         ]
 *     });
 *
 *     // create the data store
 *     let store = new Ext.data.Store({
 *         model: 'Dude',
 *         proxy: {
 *             type: 'memory',
 *             reader: {
 *                 type: 'json',
 *                 rootProperty: 'daRoot',
 *                 totalProperty: 'total'
 *             }
 *         }
 *     });
 *
 *     var myData = [
 *         { key: 1,
 *           name: { first: 'Fat',    last:  'Albert' }
 *           // notice no city, state provided in data object
 *         },
 *         { key: 2,
 *           name: { first: 'Barney', last:  'Rubble' },
 *           city: 'Bedrock', state: 'Stoneridge'
 *         },
 *         { key: 3,
 *           name: { first: 'Cliff',  last:  'Claven' },
 *           city: 'Boston',  state: 'MA'
 *         }
 *     ];
 *
 * @method convert
 * @param {Mixed} value The data value as read by the Reader, if undefined will use
 * the configured `defaultValue`.
 * @param {Ext.data.Model} record The data object containing the Model as read so far
 * by the Reader. Note that the Model may not be fully populated at this point as the
 * fields are read in the order that they are defined.
 * {@link Ext.data.Model#cfg-fields fields} array.
 * @return {Mixed} The converted value for storage in the record.
 */

/**
 * A function which converts the Model's value for this Field into a form which can be used by whatever {@link Ext.data.writer.Writer Writer}
 * is being used to sync data with the server.
 *
 * @method serialize
 * @param {Mixed} value The Field's value - the value to be serialized.
 * @param {Ext.data.Model} record The record being serialized.
 * @return {String} The string that represents the Field's value.
 */

/**
 * @method getName
 * Gets the name for this field. See {@link #name}.
 * @return {String} name
 */

/**
 * @method getAllowBlank
 * Gets allowBlank for this field. See {@link #allowBlank}.
 * @return {Boolean} allowBlank
 */

/**
 * @method getAllowNull
 * Gets allowNull for this field. See {@link #allowNull}.
 * @return {Boolean} allowNull
 */

/**
 * @method getConvert
 * Gets converter for this field. See {@link #method-convert}.
 * @return {Function} convert
 */

/**
 * @method getDefaultValue
 * Gets the defaultValue for this field. See {@link #defaultValue}.
 * @return {Object} defaultValue
 */

/**
 * @method getDepends
 * Gets the depends for this field. See {@link #depends}.
 * @return {String[]} depends
 */

/**
 * @method getMapping
 * Get the mapping for this field. See {@link #mapping}.
 * @return {Object} mapping
 */

/**
 * @method hasMapping
 * Checks if this field has a mapping applied.
 * @return {Boolean} `true` if this field has a mapping.
 */

/**
 * @method getPersist
 * Gets the persist for this field. See {@link #persist}.
 * @return {Boolean} persist
 */

/**
 * @method getSortType
 * Gets the sortType for this field. See {@link #sortType}.
 * @return {Function} sortType
 */

/**
 * @method getSummary
 * Gets the summary for this field. See {@link #summary}.
 * @return {Ext.data.summary.Base} The summary.
 */

/**
 * @method getType
 * Gets a string representation of the type of this field.
 * @return {String} type
 */
