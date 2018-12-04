/**
 * @class Ext.drag.Constraint
 * @mixin Ext.mixin.Factoryable
 * @alias drag.constraint.base
 * Provides constraining behavior for a {@link Ext.drag.Source}.
 */

/**
 * @cfg {Boolean/String/HTMLELement/Ext.dom.Element} [element=null]
 *
 * The element to constrain to:
 * - `true` to constrain to the parent of the {@link Ext.drag.Source#element}.
 * - The id, DOM element or Ext.dom.Element to constrain to.
 * @accessor
 */

/**
 * @cfg {Boolean} [horizontal=null]
 * `true` to limit dragging to the horizontal axis.
 * @accessor
 */

/**
 * @cfg {Ext.util.Region} [region=null]
 *
 * The region to constrain to.
 * @accessor
 */

/**
 * @cfg {Number/Object} [snap=null]
 * The interval to move this drag target during a drag in both dimensions.
 * - `{x: 30}`, snap only x
 * - `{y: 30}`, snap only y
 * - `{x: 30, y: 40}`, snap both
 * - `40`, snap both to `40`.
 *
 * The snap may also be a function to calculate the snap value on each tick.
 *
 *      snap: {
 *          x: function(info, x) {
 *              return x < 300 ? 150 : 500;
 *          }
 *      }
 * @accessor
 */

/**
 * @cfg {Ext.drag.Source} [source=null]
 * The {@link Ext.drag.Source source} for the constraint. This will be
 * set automatically when constructed via the source.
 * @accessor
 */

/**
 * @cfg {Boolean} [vertical=null]
 * `true` to limit dragging to the vertical axis.
 * @accessor
 */

/**
 * @cfg {Number[]} [x=null]
 * The minimum and maximum x position. Use `null` to
 * not set a constraint:
 * - `[100, null]`, constrain only the minimum
 * - `[null, 100]`, constrain only the maximum
 * - `[200, 200]`, constrain both.
 * @accessor
 */

/**
 * @cfg {Number[]} [y=null]
 * The minimum and maximum y position. Use `null` to
 * not set a constraint:
 * - `[100, null]`, constrain only the minimum
 * - `[null, 100]`, constrain only the maximum
 * - `[200, 200]`, constrain both.
 * @accessor
 */

/**
 * @method constrain
 * Constrain the position of the drag proxy using the configured rules.
 *
 * @param {Number[]} xy The position.
 * @param {Ext.drag.Info} info The drag information.
 *
 * @return {Number[]} The xy position.
 */
