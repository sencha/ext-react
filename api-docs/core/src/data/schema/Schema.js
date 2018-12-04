/**
 * @class Ext.data.schema.Schema
 * @extend Ext.Base
 * @mixins Ext.mixin.Factoryable
 * @alias schema.default
 *
 * A Schema is a collection of related {@link Ext.data.Model entities} and their respective
 * {@link Ext.data.schema.Association associations}.
 * 
 * # Schema Instances
 * 
 * By default a single instance of this class is created which serves as the schema for all
 * entities that do not have an explicit `{@link Ext.data.Model#cfg-schema schema}` config
 * either specified or inherited. This is sufficient in most cases.
 * 
 * When an entity does specify a `{@link Ext.data.Model#cfg-schema schema}`, however, that
 * looks up (or creates) an instance for that entity class which is then inherited.
 * 
 * **Important:** All related entities *must* belong to a single schema instance in order
 * to properly link up their associations.
 * 
 * ## Configuring Schemas
 * 
 * The best way to control the configuration of your `schema` is to define a base class for
 * all of your entities and use the `{@link Ext.data.Model#cfg-schema schema}` config like
 * this:
 * 
 *      Ext.define('MyApp.model.Base', {
 *          extend: 'Ext.data.Model',
 *
 *          // This configures the default schema because we don't assign an "id":
 *          schema: {
 *              // configs go here
 *          }
 *      });
 * 
 * **Note:** Only one explicit configuration can be applied to the default schema. In most
 * applications this will not be an issue.
 *
 * By using a base class for your entities you can ensure that the default schema is fully
 * configured before declaration of your classes proceeds. This is especially helpful if
 * you need to set the `namespace` for your schema (see below).
 *
 * ## Relative Naming
 * 
 * When describing associations between entities, it is desirable to use shorthand names
 * that do not contain the common namespace portion. This is called the `entityName` as
 * opposed to its class name. By default, the `entityName` is the full class name. However,
 * if a namespace is used, the common portion can be discarded and we can derive a shorter name.
 * In the following code, `"MyApp.model.Foo"` has an `entityName` of `"Foo"` and the schema has
 * a `namespace` of "MyApp.model".
 * 
 * If you use deeper nesting for entities, you may need to set the `namespace` config to
 * account for this. For example:
 * 
 *      Ext.define('MyApp.model.Base', {
 *          extend: 'Ext.data.Model',
 *
 *          schema: {
 *              namespace: 'MyApp.model'
 *          }
 *      });
 *
 * Your derived classes now will generate proper default `entityName` values even if they
 * have further namespaces. For example, "MyApp.model.foo.Thing" will produce "foo.Thing"
 * as the `entityName` given the above as a base class.
 *
 * # Association Naming
 * 
 * There are various terms involved when describing associations. Perhaps the simplest
 * example that will clarify these terms is that of the common many-to-many association
 * of User and Group.
 * 
 *   * `entityName` - The names "User" and "Group" are the `entityName` values associated
 *   with these two classes. These are derived from their full classnames (perhaps
 *   something like "App.model.User" and "App.model.Group").
 *   
 *   * `associationName` - When talking about associations, especially the many-to-many
 *   variety, it is important to give them names. Associations are not owned by either of
 *   the entities involved, so this name is similar to an `entityName`. In the case of
 *   "User" and "Group", the default `associationName` would be "GroupUsers".
 *   
 *   * `left` and `right` - Associations describe a relationship between two entities. To
 *   talk about specific associations we would use the `entityName` of the parties (such
 *   as "User" or "Group"). When discussing associations in the abstract, however, it is
 *   very helpful to be able to talk about the entities in an association in a general way.
 *   In the case of the "GroupUsers" association, "User" is said to be the `left` while
 *   "Group" is said to be the `right`. In a many-to-many association the selection of
 *   `left` and `right` is arbitrary. When a foreign-key is involved, the `left` entity
 *   is the one containing the foreign-key.
 *
 * ## Custom Naming Conventions
 * 
 * One of the jobs the the `Schema` is to manage name generation (such as `entityName`).
 * This job is delegated to a class called the `namer`. If you need to generate names in
 * other ways, you can provide a custom `namer` for your classes:
 *
 *      Ext.define('MyApp.model.Base', {
 *          extend: 'Ext.data.Model',
 *
 *          schema: {
 *              namespace: 'MyApp.model',
 *              namer: 'custom'
 *          }
 *      });
 *
 * This will create a class using the alias "namer.custom". For example:
 *
 *      Ext.define('MyApp.model.CustomNamer', {
 *          extend: 'Ext.data.schema.Namer',
 *
 *          alias: 'namer.custom',
 *          ...
 *      });
 *
 * For details see the documentation for {@link Ext.data.schema.Namer Namer}.
 */

/**
 * @method get
 * Returns the `Schema` instance given its `id` or config object. If only the `id`
 * is specified, that `Schema` instance is looked up and returned. If there is no
 * instance already created, the `id` is assumed to be the `type`. For example:
 *
 *      schema: 'foo'
 *
 * Would be created from the alias `"schema.foo"` and assigned the `id` of "foo"
 * as well.
 *
 * @param {String/Object} config The id, type or config object of the schema.
 * @param {String} [config.type] The type alias of the schema. A "schema." prefix
 * is added to this string, if provided, to complete the alias. This should match
 * match the "alias" of some class derived from `Ext.data.schema.Schema`.
 * @return {Ext.data.schema.Schema} The previously existing or newly created
 * instance.
 * @static
 */

/**
 * @cfg {Object} defaultIdentifier
 * This config is used to initialize the `{@link Ext.data.Model#identifier}` config
 * for classes that do not define one.
 * @accessor
 */

/**
 * @cfg {String/Object/Ext.data.schema.Namer} [namer="default"]
 * Specifies or configures the name generator for the schema.
 * @accessor
 */

/**
 * @cfg {String} namespace
 * The namespace for entity classes in this schema.
 * @accessor
 */

/**
 * @cfg {Object/Ext.util.ObjectTemplate} proxy
 * This is a template used to produce `Ext.data.proxy.Proxy` configurations for
 * Models that do not define an explicit `{@link Ext.data.Model#cfg-proxy proxy}`.
 *
 * This template is processed with the Model class as the data object which means
 * any static properties of the Model are available. The most useful of these are
 *
 *  * `prefix` - The `urlPrefix` property of this instance.
 *  * `entityName` - The {@link Ext.data.Model#entityName name} of the Model
 *      (for example, "User").
 *  * `schema` - This instance.
 *  @accessor
 */

/**
 * @cfg {String} [urlPrefix=""]
 * This is the URL prefix used for all requests to the server. It could be something
 * like "/~api". This value is included in the `proxy` template data as "prefix".
 * @accessor
 */

/**
 * @method getAssociation
 * Returns an `Association` by name.
 * @param {String} name The name of the association.
 * @return {Ext.data.schema.Association} The association instance.
 */

/**
 * @method getEntity
 * Returns an entity by name.
 * @param {String} name The name of the entity
 * @return {Ext.data.Model} The entity class.
 */

/**
 * @method getEntityName
 * Get the entity name taking into account the {@link #namespace}.
 * @param {String/Ext.data.Model} cls The model class or name of the class.
 * @return {String} The entity name
 */

/**
 * @method hasAssociations
 * Checks if the passed entity has attached associations that need to be read when
 * using nested loading.
 *
 * @param {String/Ext.Class/Ext.data.Model} name The name, instance, or Model class.
 * @return {Boolean} `true` if there are associations attached to the entity.
 */

/**
 * @method hasEntity
 * Checks if an entity is defined
 * @param {String/Ext.data.Model} entity The name or model
 * @return {Boolean} True if this entity is defined
 */
