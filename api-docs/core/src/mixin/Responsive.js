/**
 * @class Ext.mixin.Responsive
 * @extend Ext.Mixin
 *
 * This mixin provides its user with a `responsiveConfig` config that allows the class
 * to conditionally control config properties.
 *
 * For example:
 *
 *      Ext.define('ResponsiveClass', {
 *          mixin: [
 *              'Ext.mixin.Responsive'
 *          ],
 *
 *          responsiveConfig: {
 *              portrait: {
 *              },
 *
 *              landscape: {
 *              }
 *          }
 *      });
 *
 * For a config to participate as a responsiveConfig it must have a "setter" method. In
 * the below example, a "setRegion" method must exist.
 *
 *      Ext.create({
 *          xtype: 'viewport',
 *          layout: 'border',
 *
 *          items: [{
 *              title: 'Some Title',
 *              plugins: 'responsive',
 *
 *              responsiveConfig: {
 *                  'width < 800': {
 *                      region: 'north'
 *                  },
 *                  'width >= 800': {
 *                      region: 'west'
 *                  }
 *              }
 *          }]
 *      });
 *
 * To use responsiveConfig the class must be defined using the Ext.mixin.Responsive mixin.
 *
 *      Ext.define('App.view.Foo', {
 *          extend: 'Ext.panel.Panel',
 *          xtype: 'foo',
 *          mixins: [
 *               'Ext.mixin.Responsive'
 *          ],
 *          ...
 *      });
 *
 * Otherwise, you will need to use the responsive plugin if the class is not one you authored.
 *
 *      Ext.create('Ext.panel.Panel', {
 *          renderTo: document.body,
 *          plugins: 'responsive',
 *          ...
 *      });
 * 
 *  _Note:_ There is the exception of `Ext.container.Viewport` or other classes using `Ext.plugin.Viewport`.
 *  In those cases, the viewport plugin inherits from `Ext.plugin.Responsive`.
 *
 * For details see `{@link #responsiveConfig}`.
 * @since 5.0.0
 */

/**
 * @cfg {Object} responsiveConfig
 * This object consists of keys that represent the conditions on which configs
 * will be applied. For example:
 *
 *      responsiveConfig: {
 *          landscape: {
 *              region: 'west'
 *          },
 *          portrait: {
 *              region: 'north'
 *          }
 *      }
 *
 * In this case the keys ("landscape" and "portrait") are the criteria (or "rules")
 * and the object to their right contains the configs that will apply when that
 * rule is true.
 *
 * These rules can be any valid JavaScript expression but the following values
 * are considered in scope:
 *
 *  * `landscape` - True if the device orientation is landscape (always `true` on
 *   desktop devices).
 *  * `portrait` - True if the device orientation is portrait (always `false` on
 *   desktop devices).
 *  * `tall` - True if `width` < `height` regardless of device type.
 *  * `wide` - True if `width` > `height` regardless of device type.
 *  * `width` - The width of the viewport in pixels.
 *  * `height` - The height of the viewport in pixels.
 *  * `platform` - An object containing various booleans describing the platform
 *  (see `{@link Ext#platformTags Ext.platformTags}`). The properties of this
 *  object are also available implicitly (without "platform." prefix) but this
 *  sub-object may be useful to resolve ambiguity (for example, if one of the
 *  `{@link #responsiveFormulas}` overlaps and hides any of these properties).
 *  Previous to Ext JS 5.1, the `platformTags` were only available using this
 *  prefix.
 *
 * A more complex example:
 *
 *      responsiveConfig: {
 *          'desktop || width > 800': {
 *              region: 'west'
 *          },
 *
 *          '!(desktop || width > 800)': {
 *              region: 'north'
 *          }
 *      }
 *
 * **NOTE**: If multiple rules set a single config (like above), it is important
 * that the rules be mutually exclusive. That is, only one rule should set each
 * config. If multiple rules are actively setting a single config, the order of
 * these (and therefore the config's value) is unspecified.
 *
 * For a config to participate as a `responsiveConfig` it must have a "setter"
 * method. In the above example, a "setRegion" method must exist.
 *
 * @since 5.0.0
 * @accessor
 */

/**
 * @cfg {Object} responsiveFormulas
 * It is common when using `responsiveConfig` to have recurring expressions that
 * make for complex configurations. Using `responsiveFormulas` allows you to cut
 * down on this repetition by adding new properties to the "scope" for the rules
 * in a `responsiveConfig`.
 *
 * For example:
 *
 *      Ext.define('MyApp.view.main.Main', {
 *          extend: 'Ext.container.Container',
 *
 *          mixins: [
 *              'Ext.mixin.Responsive'
 *          ],
 *
 *          responsiveFormulas: {
 *              small: 'width < 600',
 *
 *              medium: 'width >= 600 && width < 800',
 *
 *              large: 'width >= 800',
 *
 *              tuesday: function (context) {
 *                  return (new Date()).getDay() === 2;
 *              }
 *          }
 *      });
 *
 * With the above declaration, any `responsiveConfig` can now use these values
 * like so:
 *
 *      responsiveConfig: {
 *          small: {
 *              hidden: true
 *          },
 *          'medium && !tuesday': {
 *              hidden: false,
 *              region: 'north'
 *          },
 *          large: {
 *              hidden: false,
 *              region: 'west'
 *          }
 *      }
 *
 * @since 5.0.1
 * @accessor
 */

/**
 * @method destroy
 * This method removes this instance from the Responsive collection.
 */
