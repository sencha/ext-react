/**
 * @class Ext.Factory
 * @extend Ext.Base
 *
 * Manages factories for families of classes (classes with a common `alias` prefix). The
 * factory for a class family is a function stored as a `static` on `Ext.Factory`. These
 * are created either by directly calling `Ext.Factory.define` or by using the
 * `Ext.mixin.Factoryable` interface.
 *
 * To illustrate, consider the layout system's use of aliases. The `hbox` layout maps to
 * the `"layout.hbox"` alias that one typically provides via the `layout` config on a
 * Container.
 *
 * Under the covers this maps to a call like this:
 *
 *      Ext.Factory.layout('hbox');
 *
 * Or possibly:
 *
 *      Ext.Factory.layout({
 *          type: 'hbox'
 *      });
 *
 * The value of the `layout` config is passed to the `Ext.Factory.layout` function. The
 * exact signature of a factory method matches `{@link Ext.Factory#create}`.
 *
 * To define this factory directly, one could call `Ext.Factory.define` like so:
 *
 *      Ext.Factory.define('layout', 'auto');  // "layout.auto" is the default type
 *
 * @since 5.0.0
 */

/**
 * @cfg {String} [creator]
 * The name of the method used to prepare config objects for creation. This defaults
 * to `'create'` plus the capitalized name (e.g., `'createLayout'` for the 'laoyut'
 * alias family).
 */

/**
 * @cfg {String} [aliasPrefix]
 * The prefix to apply to `type` values to form a complete alias. This defaults to the
 * proper value in most all cases and should not need to be specified.
 *
 * @since 5.0.0
 */

/**
 * @cfg {String} [defaultProperty="type"]
 * The config property to set when the factory is given a config that is a string.
 *
 * @since 5.0.0
 */

/**
 * @cfg {String} [defaultType=null]
 * An optional type to use if none is given to the factory at invocation. This is a
 * suffix added to the `aliasPrefix`. For example, if `aliasPrefix="layout."` and
 * `defaultType="hbox"` the default alias is `"layout.hbox"`. This is an alternative
 * to `xclass` so only one should be provided.
 *
 * @since 5.0.0
 */

/**
 * @cfg {String} [instanceProp="isInstance"]
 * The property that identifies an object as instance vs a config.
 *
 * @since 5.0.0
 */

/**
 * @cfg {String} [xclass=null]
 * The full classname of the type of instance to create when none is provided to the
 * factory. This is an alternative to `defaultType` so only one should be specified.
 *
 * @since 5.0.0
 */

/**
 * @cfg {String} [typeProperty="type"]
 * The property from which to read the type alias suffix.
 * @since 6.5.0
 */

/**
 * @method create
 * Creates an instance of this class family given configuration options.
 *
 * @param {Object/String} [config] The configuration or instance (if an Object) or
 * just the type (if a String) describing the instance to create.
 * @param {String} [config.xclass] The full class name of the class to create.
 * @param {String} [config.type] The type string to add to the alias prefix for this
 * factory.
 * @param {String/Object} [defaultType] The type to create if no type is contained in the
 * `config`, or an object containing a default set of configs.
 * @return {Object} The newly created instance.
 *
 * @since 5.0.0
 */


/**
 * @method update
 * This method accepts a `config` object and an existing `instance` if one exists
 * (can be `null`).
 *
 * The details are best explained by example:
 *
 *      config: {
 *          header: {
 *              xtype: 'itemheader'
 *          }
 *      },
 *
 *      applyHeader: function (header, oldHeader) {
 *          return Ext.Factory.widget.update(oldHeader, header,
 *              this, 'createHeader');
 *      },
 *
 *      createHeader: function (header) {
 *          return Ext.apply({
 *              xtype: 'itemheader',
 *              ownerCmp: this
 *          }, header);
 *      }
 *
 * Normally the `applyHeader` method would have to coordinate potential reuse of
 * the `oldHeader` and perhaps call `setConfig` on it with the new `header` config
 * options. If there was no `oldHeader`, of course, a new instance must be created
 * instead. These details are handled by this method. If the `oldHeader` is not
 * reused, it will be {@link Ext.Base#method!destroy destroyed}.
 *
 * For derived class flexibility, the pattern of calling out to a "creator" method
 * that only returns the config object has become widely used in many components.
 * This pattern is also covered in this method. The goal is to allow the derived
 * class to `callParent` and yet not end up with an instantiated component (since
 * the type may not yet be known).
 *
 * This mechanism should be used in favor of `Ext.factory()`.
 *
 * @param {Ext.Base} instance
 * @param {Object/String} config The configuration (see {@link #method!create}).
 * @param {Object} [creator] If passed, this object must provide the `creator`
 * method or the `creatorMethod` parameter.
 * @param {String} [creatorMethod] The name of a creation wrapper method on the
 * given `creator` instance that "upgrades" the raw `config` object into a final
 * form for creation.
 * @return {Object} The reconfigured `instance` or a newly created one.
 * @since 6.5.0
 */

/**
 * @method define
 * For example, the layout alias family could be defined like this:
 *
 *      Ext.Factory.define('layout', {
 *          defaultType: 'auto'
 *      });
 *
 * To define multiple families at once:
 *
 *      Ext.Factory.define({
 *          layout: {
 *              defaultType: 'auto'
 *          }
 *      });
 *
 * @param {String} type The alias family (e.g., "layout").
 * @param {Object/String} [config] An object specifying the config for the `Ext.Factory`
 * to be created. If a string is passed it is treated as the `defaultType`.
 * @return {Function}
 * @static
 * @since 5.0.0
 */

/**
 * @class Ext.mixin.Factoryable
 * @extend Ext.Mixin
 *
 * This mixin automates use of `Ext.Factory`. When mixed in to a class, the `alias` of the
 * class is retrieved and combined with an optional `factoryConfig` property on that class
 * to produce the configuration to pass to `Ext.Factory`.
 *
 * The factory method created by `Ext.Factory` is also added as a static method to the
 * target class.
 *
 * Given a class declared like so:
 *
 *      Ext.define('App.bar.Thing', {
 *          mixins: [
 *              'Ext.mixin.Factoryable'
 *          ],
 *
 *          alias: 'bar.thing',  // this is detected by Factoryable
 *
 *          factoryConfig: {
 *              defaultType: 'thing',  // this is the default deduced from the alias
 *              // other configs
 *          },
 *
 *          ...
 *      });
 *
 * The produced factory function can be used to create instances using the following
 * forms:
 *
 *      var obj;
 *
 *      obj = App.bar.Thing.create('thing'); // same as "new App.bar.Thing()"
 *
 *      obj = App.bar.Thing.create({
 *          type: 'thing'       // same as above
 *      });
 *
 *      obj = App.bar.Thing.create({
 *          xclass: 'App.bar.Thing'  // same as above
 *      });
 *
 *      var obj2 = App.bar.Thing.create(obj);
 *      // obj === obj2  (passing an instance returns the instance)
 *
 * Alternatively the produced factory is available as a static method of `Ext.Factory`.
 *
 * @since 5.0.0
 */

/**
 * @property {Object} [factoryConfig]
 * If this property is specified by the target class of this mixin its properties are
 * used to configure the created `Ext.Factory`.
 */
