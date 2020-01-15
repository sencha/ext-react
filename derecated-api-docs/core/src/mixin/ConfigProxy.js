/**
 * @class Ext.mixin.ConfigProxy
 * @extend Ext.Mixin
 * This mixin allows a class to easily forward (or proxy) configs to other objects. Once
 * mixed in, the using class (and its derived classes) can add a `proxyConfig` object
 * property to their class body that specifies the accessor and configs to manage.
 *
 * For example:
 *
 *      Ext.define('ParentThing', {
 *          mixins: [
 *              'Ext.mixin.ConfigProxy'
 *          ],
 *
 *          config: {
 *              childThing: {
 *                  xtype: 'panel'
 *              }
 *          },
 *
 *          proxyConfig: {
 *              // The keys of this object are themselves configs. Their getters
 *              // are used to identify the target to which the listed configs are
 *              // proxied.
 *
 *              childThing: [
 *                  // This list of config names will be proxied to the object
 *                  // returned by the getter (getChildThing in this case). In
 *                  // addition, each of these will be defined as configs on this
 *                  // class but with a special getter and setter.
 *                  //
 *                  // These configs cannot be previously defined nor can their
 *                  // be getters or setters already present.
 *
 *                  'title'
 *              ]
 *          }
 *      });
 *
 * If the getter for a proxy target returns `null`, the setter for the proxied config
 * will simply discard the value. It is expected that the target will generally always
 * exist.
 *
 * To proxy methods, the array of config names is replaced by an object:
 *
 *      Ext.define('ParentThing', {
 *          mixins: [
 *              'Ext.mixin.ConfigProxy'
 *          ],
 *
 *          config: {
 *              childThing: {
 *                  xtype: 'panel'
 *              }
 *          },
 *
 *          proxyConfig: {
 *              // The keys of this object are themselves configs. Their getters
 *              // are used to identify the target to which the listed configs are
 *              // proxied.
 *
 *              childThing: {
 *                  configs: [
 *                      // same as when "childThing" was just this array...
 *                  ],
 *
 *                  methods: [
 *                      // A list of methods to proxy to the childThing.
 *                      'doStuff'
 *                  ]
 *              ]
 *          }
 *      });
 *
 * @private
 * @since 6.5.0
 */
