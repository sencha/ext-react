/**
 * @class Ext.mixin.Toolable
 *
 * A Toolable component is a lightweight container of `Ext.Tool` components. The tools
 * are defined using the `tools` config like so:
 *
 *      tools: [{
 *          type: 'gear',
 *          itemId: 'settings'
 *      }]
 *
 * Equivalently tools can also be declared as a keyed container of `itemId`s:
 *
 *      tools: {
 *          settings: {
 *              type: 'gear'
 *          }
 *      }
 *
 * This second form is more flexible since it allow config system merging. Unfortunately
 * this form does not provide the same simplicity for controlling tool order. To control
 * item order the tools can be assigned a {@link Ext.Component#cfg!weight}.
 *
 * Consider this array form:
 *
 *      tools: [{
 *          type: 'gear',
 *          itemId: 'settings'
 *      }, {
 *          type: 'pin',
 *          itemId: 'pin
 *      }]
 *
 * The equivalent object form would be:
 *
 *      tools: {
 *          settings: {
 *              type: 'gear',
 *              weight: 1
 *          },
 *          pin: {
 *              type: 'pin',
 *              weight: 2
 *          }
 *      }
 *
 * @private
 * @since 6.5.0
 */

/**
 * @cfg {Object} defaultToolWeights
 * The default `weight` for tools in the `header`.
 * @since 6.5.0
 * @accessor
 */

/**
 * @cfg {Object} toolDefaults
 * The properties of this object are shallow copied (via {@link Ext#applyIf applyIf()}
 * as opposed to {@link Ext#merge Ext.merge()} to each tool declared in the `tools`
 * config.
 */

/**
 * @cfg {Ext.Tool[]/Object/Object[]} tools
 * An array of {@link Ext.Tool} configs or an object keyed by `itemId`.
 */

