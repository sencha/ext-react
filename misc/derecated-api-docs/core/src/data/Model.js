/**
 * @class Ext.data.Model
 * @extend Ext.Base
 *
 * A Model or Entity represents some object that your application manages. For example, one
 * might define a Model for Users, Products, Cars, or other real-world object that we want
 * to model in the system. Models are used by {@link Ext.data.Store stores}, which are in
 * turn used by many of the data-bound components in Ext.
 *
 * # Fields
 *
 * Models are defined as a set of fields and any arbitrary methods and properties relevant
 * to the model. For example:
 *
 *     Ext.define('User', {
 *         extend: 'Ext.data.Model',
 *         fields: [
 *             {name: 'name',  type: 'string'},
 *             {name: 'age',   type: 'int', convert: null},
 *             {name: 'phone', type: 'string'},
 *             {name: 'alive', type: 'boolean', defaultValue: true, convert: null}
 *         ],
 *
 *         changeName: function() {
 *             var oldName = this.get('name'),
 *                 newName = oldName + " The Barbarian";
 *
 *             this.set('name', newName);
 *         }
 *     });
 *
 * Now we can create instances of our User model and call any model logic we defined:
 *
 *     var user = Ext.create('User', {
 *         id   : 'ABCD12345',
 *         name : 'Conan',
 *         age  : 24,
 *         phone: '555-555-5555'
 *     });
 *
 *     user.changeName();
 *     user.get('name'); //returns "Conan The Barbarian"
 *
 * By default, the built in field types such as number and boolean coerce string values
 * in the raw data by virtue of their {@link Ext.data.field.Field#method-convert} method.
 * When the server can be relied upon to send data in a format that does not need to be
 * converted, disabling this can improve performance. The {@link Ext.data.reader.Json Json}
 * and {@link Ext.data.reader.Array Array} readers are likely candidates for this
 * optimization. To disable field conversions you simply specify `null` for the field's
 * {@link Ext.data.field.Field#cfg-convert convert config}.
 *
 * ## The "id" Field and `idProperty`
 *
 * A Model definition always has an *identifying field* which should yield a unique key
 * for each instance. By default, a field named "id" will be created with a
 * {@link Ext.data.Field#mapping mapping} of "id". This happens because of the default
 * {@link #idProperty} provided in Model definitions.
 *
 * To alter which field is the identifying field, use the {@link #idProperty} config.
 *
 * # Validators
 *
 * Models have built-in support for field validators. Validators are added to models as in
 * the follow example:
 *
 *     Ext.define('User', {
 *         extend: 'Ext.data.Model',
 *         fields: [
 *             { name: 'name',     type: 'string' },
 *             { name: 'age',      type: 'int' },
 *             { name: 'phone',    type: 'string' },
 *             { name: 'gender',   type: 'string' },
 *             { name: 'username', type: 'string' },
 *             { name: 'alive',    type: 'boolean', defaultValue: true }
 *         ],
 *
 *         validators: {
 *             age: 'presence',
 *             name: { type: 'length', min: 2 },
 *             gender: { type: 'inclusion', list: ['Male', 'Female'] },
 *             username: [
 *                 { type: 'exclusion', list: ['Admin', 'Operator'] },
 *                 { type: 'format', matcher: /([a-z]+)[0-9]{2,3}/i }
 *             ]
 *         }
 *     });
 *
 * The derived type of `Ext.data.field.Field` can also provide validation. If `validators`
 * need to be duplicated on multiple fields, instead consider creating a custom field type.
 *
 * ## Validation
 *
 * The results of the validators can be retrieved via the "associated" validation record:
 *
 *     var instance = Ext.create('User', {
 *         name: 'Ed',
 *         gender: 'Male',
 *         username: 'edspencer'
 *     });
 *
 *     var validation = instance.getValidation();
 *
 * The returned object is an instance of `Ext.data.Validation` and has as its fields the
 * result of the field `validators`. The validation object is "dirty" if there are one or
 * more validation errors present.
 *
 * This record is also available when using data binding as a "pseudo-association" called
 * "validation". This pseudo-association can be hidden by an explicitly declared
 * association by the same name (for compatibility reasons), but doing so is not
 * recommended.
 *
 * The `{@link Ext.Component#modelValidation}` config can be used to enable automatic
 * binding from the "validation" of a record to the form fields that may be bound to its
 * values.
 *
 * # Associations
 * 
 * Models often have associations with other Models. These associations can be defined by
 * fields (often called "foreign keys") or by other data such as a many-to-many (or "matrix").
 * See {@link Ext.data.schema.Association} for information about configuring and using associations.
 *
 * # Using a Proxy
 *
 * Models are great for representing types of data and relationships, but sooner or later we're going to want to load or
 * save that data somewhere. All loading and saving of data is handled via a {@link Ext.data.proxy.Proxy Proxy}, which
 * can be set directly on the Model:
 *
 *     Ext.define('User', {
 *         extend: 'Ext.data.Model',
 *         fields: ['id', 'name', 'email'],
 *
 *         proxy: {
 *             type: 'rest',
 *             url : '/users'
 *         }
 *     });
 *
 * Here we've set up a {@link Ext.data.proxy.Rest Rest Proxy}, which knows how to load and save data to and from a
 * RESTful backend. Let's see how this works:
 *
 *     var user = Ext.create('User', {name: 'Ed Spencer', email: 'ed@sencha.com'});
 *
 *     user.save(); //POST /users
 *
 * Calling {@link #save} on the new Model instance tells the configured RestProxy that we wish to persist this Model's
 * data onto our server. RestProxy figures out that this Model hasn't been saved before because it doesn't have an id,
 * and performs the appropriate action - in this case issuing a POST request to the url we configured (/users). We
 * configure any Proxy on any Model and always follow this API - see {@link Ext.data.proxy.Proxy} for a full list.
 *
 * Loading data via the Proxy is accomplished with the static `load` method:
 *
 *     //Uses the configured RestProxy to make a GET request to /users/123
 *     User.load(123, {
 *         success: function(user) {
 *             console.log(user.getId()); //logs 123
 *         }
 *     });
 *
 * Models can also be updated and destroyed easily:
 *
 *     //the user Model we loaded in the last snippet:
 *     user.set('name', 'Edward Spencer');
 *
 *     //tells the Proxy to save the Model. In this case it will perform a PUT request to /users/123 as this Model already has an id
 *     user.save({
 *         success: function() {
 *             console.log('The User was updated');
 *         }
 *     });
 *
 *     //tells the Proxy to destroy the Model. Performs a DELETE request to /users/123
 *     user.erase({
 *         success: function() {
 *             console.log('The User was destroyed!');
 *         }
 *     });
 * 
 * # HTTP Parameter names when using a {@link Ext.data.proxy.Ajax Ajax proxy}
 *
 * By default, the model ID is specified in an HTTP parameter named `id`. To change the
 * name of this parameter use the Proxy's {@link Ext.data.proxy.Ajax#idParam idParam}
 * configuration.
 *
 * Parameters for other commonly passed values such as
 * {@link Ext.data.proxy.Ajax#pageParam page number} or
 * {@link Ext.data.proxy.Ajax#startParam start row} may also be configured.
 *
 * # Usage in Stores
 *
 * It is very common to want to load a set of Model instances to be displayed and manipulated in the UI. We do this by
 * creating a {@link Ext.data.Store Store}:
 *
 *     let store = new Ext.data.Store({
 *         model: 'User'
 *     });
 *
 *     //uses the Proxy we set up on Model to load the Store data
 *     store.load();
 *
 * A Store is just a collection of Model instances - usually loaded from a server somewhere. Store can also maintain a
 * set of added, updated and removed Model instances to be synchronized with the server via the Proxy. See the {@link
 * Ext.data.Store Store docs} for more information on Stores.
 */

/**
 * @property {String} [entityName=false]
 * The short name of this entity class. This name is derived from the `namespace` of
 * the associated `schema` and this class name. By default, a class is not given a
 * shortened name.
 *
 * All entities in a given `schema` must have a unique `entityName`.
 *
 * For more details see "Relative Naming" in {@link Ext.data.schema.Schema}.
 */

/**
 * @cfg {String} [clientIdProperty=null]
 * The name of the property a server will use to send back a client-generated id in a
 * `create` or `update` `{@link Ext.data.operation.Operation operation}`.
 *
 * If specified, this property cannot have the same name as any other field.
 *
 * For example:
 *
 *      Ext.define('Person', {
 *          idProperty: 'id',  // this is the default value (for clarity)
 *
 *          clientIdProperty: 'clientId',
 *
 *          identifier: 'negative', // to generate -1, -2 etc on the client
 *
 *          fields: [ 'name' ]
 *      });
 *
 *      var person = new Person({
 *          // no id provided, so -1 is generated
 *          name: 'Clark Kent'
 *      });
 *
 * The server is given this data during the `create`:
 *
 *      {
 *          id: -1,
 *          name: 'Clark Kent'
 *      }
 *
 * The server allocates a real id and responds like so:
 *
 *      {
 *          id: 427,
 *          clientId: -1
 *      }
 *
 * This property is most useful when creating multiple entities in a single call to
 * the server in a `{@link Ext.data.operation.Create create operation}`. Alternatively,
 * the server could respond with records that correspond one-to-one to those sent in
 * the `operation`.
 *
 * For example the client could send a `create` with this data:
 *
 *      [ { id: -1, name: 'Clark Kent' },
 *        { id: -2, name: 'Peter Parker' },
 *        { id: -3, name: 'Bruce Banner' } ]
 *
 * And the server could respond in the same order:
 *
 *      [ { id: 427 },      // updates id = -1
 *        { id: 428 },      // updates id = -2
 *        { id: 429 } ]     // updates id = -3
 *
 * Or using `clientIdProperty` the server could respond in arbitrary order:
 *
 *      [ { id: 427, clientId: -3 },
 *        { id: 428, clientId: -1 },
 *        { id: 429, clientId: -2 } ]
 *
 * **IMPORTANT:** When upgrading from previous versions be aware that this property
 * used to perform the role of `{@link Ext.data.writer.Writer#clientIdProperty}` as
 * well as that described above. To continue send a client-generated id as other than
 * the `idProperty`, set `clientIdProperty` on the `writer`. A better solution, however,
 * is most likely a properly configured `identifier` as that would work better with
 * associations.
 */

/**
 * @property {Boolean} [phantom=false]
 * True when the record does not yet exist in a server-side database. Any record which
 * has a real database identity set as its `idProperty` is NOT a phantom -- it's real.
 */

/**
 * @cfg {String} [idProperty='id']
 * The name of the field treated as this Model's unique id.
 *
 * If changing the idProperty in a subclass, the generated id field will replace the one
 * generated by the superclass, for example;
 *
 *      Ext.define('Super', {
 *          extend: 'Ext.data.Model',
 *          fields: ['name']
 *      });
 *
 *      Ext.define('Sub', {
 *          extend: 'Super',
 *          idProperty: 'customId'
 *      });
 *
 *      var fields = Super.getFields();
 *      // Has 2 fields, "name" & "id"
 *      console.log(fields[0].name, fields[1].name, fields.length);
 *
 *      fields = Sub.getFields();
 *      // Has 2 fields, "name" & "customId", "id" is replaced
 *      console.log(fields[0].name, fields[1].name, fields.length);
 *
 * The data values for this field must be unique or there will be id value collisions
 * in the {@link Ext.data.Store Store}.
 */

/**
 * @cfg {Object} [manyToMany=null]
 * A config object for a {@link Ext.data.schema.ManyToMany ManyToMany} association.
 * See the class description for {@link Ext.data.schema.ManyToMany ManyToMany} for
 * configuration examples.
 */

/**
 * @cfg {String/Object} [identifier=null]
 * The id generator to use for this model. The `identifier` generates values for the
 * {@link #idProperty} when no value is given. Records with client-side generated
 * values for {@link #idProperty} are called {@link #phantom} records since they are
 * not yet known to the server.
 *
 * This can be overridden at the model level to provide a custom generator for a model.
 * The simplest form of this would be:
 *
 *      Ext.define('MyApp.data.MyModel', {
 *          extend: 'Ext.data.Model',
 *          requires: ['Ext.data.identifier.Sequential'],
 *          identifier: 'sequential',
 *          ...
 *      });
 *
 * The above would generate {@link Ext.data.identifier.Sequential sequential} id's such
 * as 1, 2, 3 etc..
 *
 * Another useful id generator is {@link Ext.data.identifier.Uuid}:
 *
 *      Ext.define('MyApp.data.MyModel', {
 *          extend: 'Ext.data.Model',
 *          requires: ['Ext.data.identifier.Uuid'],
 *          identifier: 'uuid',
 *          ...
 *      });
 *
 * An id generator can also be further configured:
 *
 *      Ext.define('MyApp.data.MyModel', {
 *          extend: 'Ext.data.Model',
 *          identifier: {
 *              type: 'sequential',
 *              seed: 1000,
 *              prefix: 'ID_'
 *          }
 *      });
 *
 * The above would generate id's such as ID_1000, ID_1001, ID_1002 etc..
 *
 * If multiple models share an id space, a single generator can be shared:
 *
 *      Ext.define('MyApp.data.MyModelX', {
 *          extend: 'Ext.data.Model',
 *          identifier: {
 *              type: 'sequential',
 *              id: 'xy'
 *          }
 *      });
 *
 *      Ext.define('MyApp.data.MyModelY', {
 *          extend: 'Ext.data.Model',
 *          identifier: {
 *              type: 'sequential',
 *              id: 'xy'
 *          }
 *      });
 *
 * For more complex, shared id generators, a custom generator is the best approach.
 * See {@link Ext.data.identifier.Generator} for details on creating custom id generators.
 */

/**
 * @cfg {Object[]/String[]} fields
 * An Array of `Ext.data.field.Field` config objects, simply the field
 * {@link Ext.data.field.Field#name name}, or a mix of config objects and strings.
 * If just a name is given, the field type defaults to `auto`.
 *
 * In a {@link Ext.data.field.Field Field} config object you may pass the alias of
 * the `Ext.data.field.*` type using the `type` config option.
 *
 *     // two fields are set:
 *     // - an 'auto' field with a name of 'firstName'
 *     // - and an Ext.data.field.Integer field with a name of 'age'
 *     fields: ['firstName', {
 *         type: 'int',
 *         name: 'age'
 *     }]
 *
 * Fields will automatically be created at read time for any for any keys in the
 * data passed to the Model's {@link #proxy proxy's}
 * {@link Ext.data.reader.Reader reader} whose name is not explicitly configured in
 * the `fields` config.
 *
 * Extending a Model class will inherit all the `fields` from the superclass /
 * ancestor classes.
 */

 /**
  * @property {Object} modified
  * A hash of field values which holds the initial values of fields before a set of edits
  * are {@link #commit committed}.
  */

/**
 * @cfg {String/Object/Ext.data.proxy.Proxy} [proxy=undefined]
 * The {@link Ext.data.proxy.Proxy proxy} to use for this class.
 */

/**
 * @cfg {String/Object} [schema='default']
 * The name of the {@link Ext.data.schema.Schema schema} to which this entity and its
 * associations belong. For details on custom schemas see `Ext.data.schema.Schema`.
 */

/**
 * @cfg {String} [versionProperty=null]
 * If specified, this is the name of the property that contains the entity "version".
 * The version property is used to manage a long-running transaction and allows the
 * detection of simultaneous modification.
 *
 * The way a version property is used is that the client receives the version as it
 * would any other entity property. When saving an entity, this property is always
 * included in the request and the server uses the value in a "conditional update".
 * If the current version of the entity on the server matches the version property
 * sent by the client, the update is allowed. Otherwise, the update fails.
 *
 * On successful update, both the client and server increment the version. This is
 * done on the server in the conditional update and on the client when it receives a
 * success on its update request.
 */

/**
 * @cfg {Object[]} validators
 * An array of {@link Ext.data.validator.Validator validators} for this model.
 */

/**
 * @cfg {String} [validationSeparator=null]
 * If specified this property is used to concatenate multiple errors for each field
 * as reported by the `validators`.
 */

/**
 * @cfg {Boolean} [convertOnSet=true]
 * Set to `false` to prevent any converters from being called on fields specified in
 * a {@link Ext.data.Model#set set} operation.
 *
 * **Note:** Setting the config to `false` will only prevent the convert / calculate
 * call when the set `fieldName` param matches the field's `{@link #name}`.  In the
 * following example the calls to set `salary` will not execute the convert method
 * on `set` while the calls to set `vested` will execute the convert method on the
 * initial read as well as on `set`.
 *
 * Example model definition:
 *
 *     Ext.define('MyApp.model.Employee', {
 *         extend: 'Ext.data.Model',
 *         fields: ['yearsOfService', {
 *             name: 'salary',
 *             convert: function (val) {
 *                 var startingBonus = val * .1;
 *                 return val + startingBonus;
 *             }
 *         }, {
 *             name: 'vested',
 *             convert: function (val, record) {
 *                 return record.get('yearsOfService') >= 4;
 *             },
 *             depends: 'yearsOfService'
 *         }],
 *         convertOnSet: false
 *     });
 *
 *     var tina = Ext.create('MyApp.model.Employee', {
 *         salary: 50000,
 *         yearsOfService: 3
 *     });
 *
 *     console.log(tina.get('salary')); // logs 55000
 *     console.log(tina.get('vested')); // logs false
 *
 *     tina.set({
 *         salary: 60000,
 *         yearsOfService: 4
 *     });
 *     console.log(tina.get('salary')); // logs 60000
 *     console.log(tina.get('vested')); // logs true
 */

/**
 * @cfg {String/Object/String[]/Object[]} hasMany
 * One or more `Ext.data.schema.HasMany` associations for this model.
 */

/**
 * @cfg {String/Object/String[]/Object[]} hasOne
 * One or more `Ext.data.schema.HasOne` associations for this model.
 */

/**
 * @cfg {String/Object/String[]/Object[]} belongsTo
 * One or more `Ext.data.schema.BelongsTo` associations for this model.
 */

/**
 * @method beginEdit
 * Begins an edit. While in edit mode, no events (e.g.. the `update` event) are
 * relayed to the containing store. When an edit has begun, it must be followed by
 * either `endEdit` or `cancelEdit`.
 */

/**
 * @method cancelEdit
 * Cancels all changes made in the current edit operation.
 */

/**
 * @method endEdit
 * Ends an edit. If any data was modified, the containing store is notified
 * (ie, the store's `update` event will fire).
 * @param {Boolean} [silent] True to not notify any stores of the change.
 * @param {String[]} [modifiedFieldNames] Array of field names changed during edit.
 */

/**
 * @method getFields
 * Get the fields array for this model.
 * @return {Ext.data.field.Field[]} The fields array
 */

/**
 * @method getIdProperty
 * Get the idProperty for this model.
 * @return {String} The idProperty
 */

/**
 * @method getId
 * Returns the unique ID allocated to this model instance as defined by `idProperty`.
 * @return {Number/String} The id
 */

/**
 * @method setId
 * Sets the model instance's id field to the given id.
 * @param {Number/String} id The new id.
 * @param {Object} [options] See {@link #set}.
 */

/**
 * @method getPrevious
 * This method returns the value of a field given its name prior to its most recent
 * change.
 * @param {String} fieldName The field's {@link Ext.data.field.Field#name name}.
 * @return {Object} The value of the given field prior to its current value. `undefined`
 * if there is no previous value;
 */

/**
 * @method isModified
 * Returns true if the passed field name has been `{@link #modified}` since the load or last commit.
 * @param {String} fieldName The field's {@link Ext.data.field.Field#name name}.
 * @return {Boolean}
 */

/**
 * @method getModified
 * Returns the original value of a modified field. If there is no modified value,
 * `undefined` will be return. Also see {@link #isModified}.
 * @param {String} fieldName The name of the field for which to return the original value.
 * @return {Object} modified
 */

/**
 * @method get
 * Returns the value of the given field.
 * @param {String} fieldName The name of the field.
 * @return {Object} The value of the specified field.
 */

/**
 * @method set
 * Sets the given field to the given value. For example:
 *
 *      record.set('name', 'value');
 *
 * This method can also be passed an object containing multiple values to set at once.
 * For example:
 *
 *      record.set({
 *          name: 'value',
 *          age: 42
 *      });
 *
 * The following store events are fired when the modified record belongs to a store:
 *
 *  - {@link Ext.data.Store#event-beginupdate beginupdate}
 *  - {@link Ext.data.Store#event-update update}
 *  - {@link Ext.data.Store#event-endupdate endupdate}
 *
 * @param {String/Object} fieldName The field to set, or an object containing key/value
 * pairs.
 * @param {Object} newValue The value for the field (if `fieldName` is a string).
 * @param {Object} [options] Options for governing this update.
 * @param {Boolean} [options.convert=true] Set to `false` to  prevent any converters from
 * being called during the set operation. This may be useful when setting a large bunch of
 * raw values.
 * @param {Boolean} [options.dirty=true] Pass `false` if the field values are to be
 * understood as non-dirty (fresh from the server). When `true`, this change will be
 * reflected in the `modified` collection.
 * @param {Boolean} [options.commit=false] Pass `true` to call the {@link #commit} method
 * after setting fields. If this option is passed, the usual after change processing will
 * be bypassed. {@link #commit Commit} will be called even if there are no field changes.
 * @param {Boolean} [options.silent=false] Pass `true` to suppress notification of any
 * changes made by this call. Use with caution.
 * @return {String[]} The array of modified field names or null if nothing was modified.
 */

/**
 * @method reject
 * Usually called by the {@link Ext.data.Store} to which this model instance has been {@link #join joined}. Rejects
 * all changes made to the model instance since either creation, or the last commit operation. Modified fields are
 * reverted to their original values.
 *
 * Developers should subscribe to the {@link Ext.data.Store#event-update} event to have their code notified of reject
 * operations.
 *
 * @param {Boolean} [silent=false] `true` to skip notification of the owning store of the change.
 */

/**
 * @method commit
 * Usually called by the {@link Ext.data.Store} which owns the model instance. Commits all changes made to the
 * instance since either creation or the last commit operation.
 *
 * Developers should subscribe to the {@link Ext.data.Store#event-update} event to have their code notified of commit
 * operations.
 *
 * @param {Boolean} [silent=false] Pass `true` to skip notification of the owning store of the change.
 * @param {String[]} [modifiedFieldNames] Array of field names changed during sync with server if known.
 * Omit or pass `null` if unknown. An empty array means that it is known that no fields were modified
 * by the server's response.
 * Defaults to false.
 */

/**
 * @method drop
 * Marks this record as `dropped` and waiting to be deleted on the server. When a
 * record is dropped, it is automatically removed from all association stores and
 * any child records associated to this record are also dropped (a "cascade delete")
 * depending on the `cascade` parameter.
 *
 * @param {Boolean} [cascade=true] Pass `false` to disable the cascade to drop child
 * records.
 * @since 5.0.0
 */

/**
 * @method join
 * Tells this model instance that an observer is looking at it.
 * @param {Ext.data.Store} owner The store or other owner object to which this model
 * has been added.
 */

/**
 * @method unjoin
 * Tells this model instance that it has been removed from the store.
 * @param {Ext.data.Store} owner The store or other owner object from which this
 * model has been removed.
 */

/**
 * @method clone
 * Creates a clone of this record. States like `dropped`, `phantom` and `dirty` are
 * all preserved in the cloned record.
 *
 * @param {Ext.data.Session} [session] The session to which the new record
 * belongs.
 * @return {Ext.data.Model} The cloned record.
 */

/**
 * @method copy
 * Creates a clean copy of this record. The returned record will not consider any its
 * fields as modified.
 *
 * To generate a phantom instance with a new id pass `null`:
 *
 *     var rec = record.copy(null); // clone the record but no id (one is generated)
 *
 * @param {String} [newId] A new id, defaults to the id of the instance being copied.
 * See `{@link Ext.data.Model#idProperty idProperty}`.
 * @param {Ext.data.Session} [session] The session to which the new record
 * belongs.
 *
 * @return {Ext.data.Model}
 */

/**
 * @method getProxy
 * Returns the configured Proxy for this Model.
 * @return {Ext.data.proxy.Proxy} The proxy
 */

/**
 * @method getValidation
 * Returns the `Ext.data.Validation` record holding the results of this record's
 * `validators`. This record is lazily created on first request and is then kept on
 * this record to be updated later.
 *
 * See the class description for more about `validators`.
 *
 * @param {Boolean} [refresh] Pass `false` to not call the `refresh` method on the
 * validation instance prior to returning it. Pass `true` to force a `refresh` of the
 * validation instance. By default the returned record is only refreshed if changes
 * have been made to this record.
 * @return {Ext.data.Validation} The `Validation` record for this record.
 * @since 5.0.0
 */

/**
 * @method isValid
 * Checks if the model is valid. See {@link #getValidation}.
 * @return {Boolean} True if the model is valid.
 */

/**
 * @method toUrl
 * Returns a url-suitable string for this model instance. By default this just returns the name of the Model class
 * followed by the instance ID - for example an instance of MyApp.model.User with ID 123 will return 'user/123'.
 * @return {String} The url string for this model instance.
 */

/**
 * @method erase
 * @localdoc Destroys the model using the configured proxy.  The erase action is
 * asynchronous.  Any processing of the erased record should be done in a callback.
 *
 *     Ext.define('MyApp.model.User', {
 *         extend: 'Ext.data.Model',
 *         fields: [
 *             {name: 'id', type: 'int'},
 *             {name: 'name', type: 'string'}
 *         ],
 *         proxy: {
 *             type: 'ajax',
 *             url: 'server.url'
 *         }
 *     });
 *
 *     var user = new MyApp.model.User({
 *         name: 'Foo'
 *     });
 *
 *     // pass the phantom record data to the server to be saved
 *     user.save({
 *         success: function(record, operation) {
 *             // do something if the save succeeded
 *             // erase the created record
 *             record.erase({
 *                 failure: function(record, operation) {
 *                     // do something if the erase failed
 *                 },
 *                 success: function(record, operation) {
 *                     // do something if the erase succeeded
 *                 },
 *                 callback: function(record, operation, success) {
 *                     // do something if the erase succeeded or failed
 *                 }
 *             });
 *         }
 *     });
 *
 * **NOTE:** If a {@link #phantom} record is erased it will not be processed via the
 * proxy.  However, any passed `success` or `callback` functions will be called.
 *
 * The options param is an {@link Ext.data.operation.Destroy} config object
 * containing success, failure and callback functions, plus optional scope.
 *
 * @inheritdoc #method-load
 * @return {Ext.data.operation.Destroy} The destroy operation
 */

/**
 * @method getChanges
 * Gets an object of only the fields that have been modified since this record was
 * created or committed. Only persistent fields are tracked in the `modified` set so
 * this method will only return changes to persistent fields.
 *
 * For more control over the returned data, see `{@link #getData}`.
 * @return {Object}
 */

/**
 * @method getCriticalFields
 * Returns the array of fields that are declared as critical (must always send).
 * @return {Ext.data.field.Field[]}
 */

/**
 * @method getAssociatedData
 * Gets all of the data from this Models *loaded* associations. It does this
 * recursively. For example if we have a User which hasMany Orders, and each Order
 * hasMany OrderItems, it will return an object like this:
 *
 *     {
 *         orders: [
 *             {
 *                 id: 123,
 *                 status: 'shipped',
 *                 orderItems: [
 *                     ...
 *                 ]
 *             }
 *         ]
 *     }
 *
 * @param {Object} [result] The object on to which the associations will be added. If
 * no object is passed one is created. This object is then returned.
 * @param {Boolean/Object} [options] An object containing options describing the data
 * desired.
 * @param {Boolean} [options.associated=true] Pass `true` to include associated data from
 * other associated records.
 * @param {Boolean} [options.changes=false] Pass `true` to only include fields that
 * have been modified. Note that field modifications are only tracked for fields that
 * are not declared with `persist` set to `false`. In other words, only persistent
 * fields have changes tracked so passing `true` for this means `options.persist` is
 * redundant.
 * @param {Boolean} [options.critical] Pass `true` to include fields set as `critical`.
 * This is only meaningful when `options.changes` is `true` since critical fields may
 * not have been modified.
 * @param {Boolean} [options.persist] Pass `true` to only return persistent fields.
 * This is implied when `options.changes` is set to `true`.
 * @param {Boolean} [options.serialize=false] Pass `true` to invoke the `serialize`
 * method on the returned fields.
 * @return {Object} The nested data set for the Model's loaded associations.
 */

/**
 * @method getData
 * Gets all values for each field in this model and returns an object containing the
 * current data. This can be tuned by passing an `options` object with various
 * properties describing the desired result. Passing `true` simply returns all fields
 * *and* all associated record data.
 *
 * @param {Boolean/Object} [options] An object containing options describing the data
 * desired. If `true` is passed it is treated as an object with `associated` set to
 * `true`.
 * @param {Boolean} [options.associated=false] Pass `true` to include associated data.
 * This is equivalent to pass `true` as the only argument. See `getAssociatedData`.
 * @param {Boolean} [options.changes=false] Pass `true` to only include fields that
 * have been modified. Note that field modifications are only tracked for fields that
 * are not declared with `persist` set to `false`. In other words, only persistent
 * fields have changes tracked so passing `true` for this means `options.persist` is
 * redundant.
 * @param {Boolean} [options.critical] Pass `true` to include fields set as `critical`.
 * This is only meaningful when `options.changes` is `true` since critical fields may
 * not have been modified.
 * @param {Boolean} [options.persist] Pass `true` to only return persistent fields.
 * This is implied when `options.changes` is set to `true`.
 * @param {Boolean} [options.serialize=false] Pass `true` to invoke the `serialize`
 * method on the returned fields.
 * @return {Object} An object containing all the values in this model.
 */

/**
 * @method getTransientFields
 * Returns the array of fields that are declared as non-persist or "transient".
 * @return {Ext.data.field.Field[]}
 * @since 5.0.0
 */

/**
 * @method isLoading
 * Checks whether this model is loading data from the {@link #proxy}.
 * @return {Boolean} `true` if in a loading state.
 */

/**
 * @method abort
 * Aborts a pending {@link #load} operation. If the record is not loading, this does nothing.
 */

/**
 * @method load
 * @localdoc Loads the model instance using the configured proxy.  The load action
 * is asynchronous.  Any processing of the loaded record should be done in a
 * callback.
 *
 *     Ext.define('MyApp.model.User', {
 *         extend: 'Ext.data.Model',
 *         fields: [
 *             {name: 'id', type: 'int'},
 *             {name: 'name', type: 'string'}
 *         ],
 *         proxy: {
 *             type: 'ajax',
 *             url: 'server.url'
 *         }
 *     });
 *
 *     var user = new MyApp.model.User();
 *     user.load({
 *         scope: this,
 *         failure: function(record, operation) {
 *             // do something if the load failed
 *         },
 *         success: function(record, operation) {
 *             // do something if the load succeeded
 *         },
 *         callback: function(record, operation, success) {
 *             // do something whether the load succeeded or failed
 *         }
 *     });
 *
 * The options param is an {@link Ext.data.operation.Read} config object containing
 * success, failure and callback functions, plus optional scope.
 *
 * @param {Object} [options] Options to pass to the proxy.
 * @param {Function} options.success A function to be called when the
 * model is processed by the proxy successfully.
 * The callback is passed the following parameters:
 * @param {Ext.data.Model} options.success.record The record.
 * @param {Ext.data.operation.Operation} options.success.operation The operation.
 *
 * @param {Function} options.failure A function to be called when the
 * model is unable to be processed by the server.
 * The callback is passed the following parameters:
 * @param {Ext.data.Model} options.failure.record The record.
 * @param {Ext.data.operation.Operation} options.failure.operation The operation.
 *
 * @param {Function} options.callback A function to be called whether the proxy
 * transaction was successful or not.
 * The callback is passed the following parameters:
 * @param {Ext.data.Model} options.callback.record The record.
 * @param {Ext.data.operation.Operation} options.callback.operation The operation.
 * @param {Boolean} options.callback.success `true` if the operation was successful.
 *
 * @param {Object} options.scope The scope in which to execute the callback
 * functions.  Defaults to the model instance.
 *
 * @return {Ext.data.operation.Read} The read operation.
 */

/**
 * @method save
 * @localdoc Saves the model instance using the configured proxy.  The save action
 * is asynchronous.  Any processing of the saved record should be done in a callback.
 *
 * Create example:
 *
 *     Ext.define('MyApp.model.User', {
 *         extend: 'Ext.data.Model',
 *         fields: [
 *             {name: 'id', type: 'int'},
 *             {name: 'name', type: 'string'}
 *         ],
 *         proxy: {
 *             type: 'ajax',
 *             url: 'server.url'
 *         }
 *     });
 *
 *     var user = new MyApp.model.User({
 *         name: 'Foo'
 *     });
 *
 *     // pass the phantom record data to the server to be saved
 *     user.save({
 *         failure: function(record, operation) {
 *             // do something if the save failed
 *         },
 *         success: function(record, operation) {
 *             // do something if the save succeeded
 *         },
 *         callback: function(record, operation, success) {
 *             // do something whether the save succeeded or failed
 *         }
 *     });
 *
 * The response from a create operation should include the ID for the newly created
 * record:
 *
 *     // sample response
 *     {
 *         success: true,
 *         id: 1
 *     }
 *
 *     // the id may be nested if the proxy's reader has a rootProperty config
 *     Ext.define('MyApp.model.User', {
 *         extend: 'Ext.data.Model',
 *         proxy: {
 *             type: 'ajax',
 *             url: 'server.url',
 *             reader: {
 *                 type: 'ajax',
 *                 rootProperty: 'data'
 *             }
 *         }
 *     });
 *
 *     // sample nested response
 *     {
 *         success: true,
 *         data: {
 *             id: 1
 *         }
 *     }
 *
 * (Create + ) Update example:
 *
 *     Ext.define('MyApp.model.User', {
 *         extend: 'Ext.data.Model',
 *         fields: [
 *             {name: 'id', type: 'int'},
 *             {name: 'name', type: 'string'}
 *         ],
 *         proxy: {
 *             type: 'ajax',
 *             url: 'server.url'
 *         }
 *     });
 *
 *     var user = new MyApp.model.User({
 *         name: 'Foo'
 *     });
 *     user.save({
 *         success: function(record, operation) {
 *             record.set('name', 'Bar');
 *             // updates the remote record via the proxy
 *             record.save();
 *         }
 *     });
 *
 * (Create + ) Destroy example - see also {@link #erase}:
 *
 *     Ext.define('MyApp.model.User', {
 *         extend: 'Ext.data.Model',
 *         fields: [
 *             {name: 'id', type: 'int'},
 *             {name: 'name', type: 'string'}
 *         ],
 *         proxy: {
 *             type: 'ajax',
 *             url: 'server.url'
 *         }
 *     });
 *
 *     var user = new MyApp.model.User({
 *         name: 'Foo'
 *     });
 *     user.save({
 *         success: function(record, operation) {
 *             record.drop();
 *             // destroys the remote record via the proxy
 *             record.save();
 *         }
 *     });
 *
 * **NOTE:** If a {@link #phantom} record is {@link #drop dropped} and subsequently
 * saved it will not be processed via the proxy.  However, any passed `success`
 * or `callback` functions will be called.
 *
 * The options param is an Operation config object containing success, failure and
 * callback functions, plus optional scope.  The type of Operation depends on the
 * state of the model being saved.
 *
 *  - {@link #phantom} model - {@link Ext.data.operation.Create}
 *  - {@link #isModified modified} model - {@link Ext.data.operation.Update}
 *  - {@link #dropped} model - {@link Ext.data.operation.Destroy}
 *
 * @inheritdoc #method-load
 * @return {Ext.data.operation.Create/Ext.data.operation.Update/Ext.data.operation.Destroy}
 * The operation instance for saving this model.  The type of operation returned
 * depends on the model state at the time of the action.
 *
 *  - {@link #phantom} model - {@link Ext.data.operation.Create}
 *  - {@link #isModified modified} model - {@link Ext.data.operation.Update}
 *  - {@link #dropped} model - {@link Ext.data.operation.Destroy}
 */

/**
 * @method loadData
 * Create a model while also parsing any data for associations.
 * @param {Object} data The model data, including any associated data if required. The type of
 * data should correspond to what the configured data reader would expect.
 * @param {Ext.data.Session} [session] The session.
 * @return {Ext.data.Model} The model.
 *
 * @static
 * @inheritable
 * @since 6.5.0
 */

/**
 * @method getProxy
 * Returns the configured Proxy for this Model.
 * @return {Ext.data.proxy.Proxy} The proxy
 * @static
 * @inheritable
 */

/**
 * @method setProxy
 * Sets the Proxy to use for this model. Accepts any options that can be accepted by
 * {@link Ext#createByAlias Ext.createByAlias}.
 * @param {String/Object/Ext.data.proxy.Proxy} proxy The proxy
 * @return {Ext.data.proxy.Proxy}
 * @static
 * @inheritable
 */

/**
 * @method load
 * Asynchronously loads a model instance by id. Any processing of the loaded
 * record should be done in a callback.
 *
 * Sample usage:
 *
 *     Ext.define('MyApp.User', {
 *         extend: 'Ext.data.Model',
 *         fields: [
 *             {name: 'id', type: 'int'},
 *             {name: 'name', type: 'string'}
 *         ]
 *     });
 *
 *     MyApp.User.load(10, {
 *         scope: this,
 *         failure: function(record, operation) {
 *             //do something if the load failed
 *         },
 *         success: function(record, operation) {
 *             //do something if the load succeeded
 *         },
 *         callback: function(record, operation, success) {
 *             //do something whether the load succeeded or failed
 *         }
 *     });
 *
 * @param {Number/String} id The ID of the model to load.
 * **NOTE:** The model returned must have an ID matching the param in the load
 * request.
 *
 * @param {Object} [options] The options param is an
 * {@link Ext.data.operation.Read} config object containing success, failure and
 * callback functions, plus optional scope.
 *
 * @param {Function} options.success A function to be called when the
 * model is processed by the proxy successfully.
 * The callback is passed the following parameters:
 * @param {Ext.data.Model} options.success.record The record.
 * @param {Ext.data.operation.Operation} options.success.operation The operation.
 *
 * @param {Function} options.failure A function to be called when the
 * model is unable to be processed by the server.
 * The callback is passed the following parameters:
 * @param {Ext.data.Model} options.failure.record The record.
 * @param {Ext.data.operation.Operation} options.failure.operation The operation.
 *
 * @param {Function} options.callback A function to be called whether the proxy
 * transaction was successful or not.
 * The callback is passed the following parameters:
 * @param {Ext.data.Model} options.callback.record The record.
 * @param {Ext.data.operation.Operation} options.callback.operation The
 * operation.
 * @param {Boolean} options.callback.success `true` if the operation was
 * successful.
 *
 * @param {Object} options.scope The scope in which to execute the callback
 * functions.  Defaults to the model instance.
 *
 * @param {Ext.data.Session} [session] The session for this record.
 *
 * @return {Ext.data.Model} The newly created model. Note that the model will
 * (probably) still be loading once it is returned from this method. To do any
 * post-processing on the data, the appropriate place to do see is in the
 * callback.
 *
 * @static
 * @inheritable
 */
