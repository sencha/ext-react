/**
 * @class Ext.Config
 * This class manages a config property. Instances of this type are created and cached as
 * classes declare their config properties. One instance of this class is created per
 * config property name.
 *
 *      Ext.define('MyClass', {
 *          config: {
 *              foo: 42
 *          }
 *      });
 *
 * This uses the cached `Ext.Config` instance for the "foo" property.
 *
 * When config properties apply options to config properties a prototype chained object is
 * created from the cached instance. For example:
 *
 *      Ext.define('MyClass', {
 *          config: {
 *              foo: {
 *                  $value: 42,
 *                  lazy: true
 *              }
 *          }
 *      });
 *
 * This creates a prototype chain to the cached "foo" instance of `Ext.Config` and applies
 * the `lazy` option to that new instance. This chained instance is then kept by the
 * `Ext.Configurator` for that class.
 * @private
 */

/**
 * @cfg {Boolean} [cached=false]
 * When set as `true` the config property will be stored on the class prototype once
 * the first instance has had a chance to process the default value.
 * @private
 * @since 5.0.0
 */

/**
 * @cfg {Boolean} [lazy=false]
 * When set as `true` the config property will not be immediately initialized during
 * the `initConfig` call.
 * @private
 * @since 5.0.0
 */

/**
 * @cfg {Boolean} [evented=false]
 * When set as `true` the config property will be treated as a {@link Ext.Evented Evented Config}.
 * @private
 * @since 6.0.0
 */

/**
 * @cfg {Function} [merge]
 * This function if supplied will be called as classes or instances provide values
 * that need to be combined with inherited values. The function should return the
 * value that will be the config value. Further calls may receive such returned
 * values as `oldValue`.
 *
 * @cfg {Mixed} merge.newValue The new value to merge with the old.
 *
 * @cfg {Mixed} merge.oldValue The current value prior to `newValue` being merged.
 *
 * @cfg {Mixed} merge.target The class or instance to which the merged config value
 * will be applied.
 *
 * @cfg {Ext.Class} merge.mixinClass The mixin providing the `newValue` or `null` if
 * the `newValue` is not being provided by a mixin.
 */
