/**
 * @class Ext.drag.Source
 * @extend Ext.drag.Item
 *
 * A wrapper around a DOM element that allows it to be dragged.
 *
 * ## Constraining
 *
 * The {@link #constrain} config gives various options for limiting drag, for example:
 * - Vertical or horizontal only
 * - Minimum/maximum x/y values.
 * - Snap to grid
 * - Constrain to an element or region.
 *
 * See {@link Ext.drag.Constrain} for detailed options.
 *
 *
 *      new Ext.drag.Source({
 *          element: dragEl,
 *          constrain: {
 *              // Drag only vertically in 30px increments
 *              vertical: true,
 *              snap: {
 *                  y: 30
 *              }
 *          }
 *      });
 *
 * ## Data
 *
 * Data representing the underlying drag is driven by the {@link #describe} method. This method
 * is called once at the beginning of the drag. It should populate the info object with data using
 * the {@link Ext.data.Info#setData setData} method. It accepts 2 arguments.
 *
 * - The `type` is used to indicate to {@link Ext.drag.Target targets} the type(s) of data being provided.
 * This allows the {@link Ext.drag.Target target} to decide whether it is able to interact with the source.
 * All types added are available in {@link Ext.data.Info#types types}.
 * - The value can be a static value, or a function reference. In the latter case, the function is evaluated
 * when the data is requested.
 *
 * The {@link Ext.drag.Info#getData} method may be called once the drop completes. The data for the relevant type
 * is retrieved. All values from this method return a {@link Ext.Promise} to allow for consistency when dealing
 * with synchronous and asynchronous data.
 *
 * ## Proxy
 *
 * A {@link #proxy} is an element that follows the mouse cursor during a drag. This may be the {@link #element},
 * a newly created element, or none at all (if the purpose is to just track the cursor).
 *
 * See {@link Ext.drag.proxy.None for details}.
 *
 *      var data = [{
 *          id: 1,
 *          name: 'Adam'
 *      }, {
 *          id: 2,
 *          name: 'Barbara'
 *      }, {
 *          id: 3,
 *          name: 'Charlie'
 *      }];
 *
 *      var tpl = new Ext.XTemplate(
 *          '<div class="container">',
 *              '<tpl for=".">',
 *                  '<div class="child" data-id="{id}">{name}</div>',
 *              '</tpl>',
 *          '</div>'
 *      );
 *
 *      var el = tpl.append(Ext.getBody(), data);
 *
 *      new Ext.drag.Source({
 *          element: el,
 *          handle: '.child',
 *          proxy: {
 *              type: 'placeholder',
 *              getElement: function(info) {
 *                  return Ext.getBody().createChild({
 *                      cls: 'foo',
 *                      html: info.eventTarget.innerHTML
 *                  });
 *              }
 *          }
 *      });
 *
 *
 * ## Handle
 *
 * A {@link #handle} is a CSS selector that allows certain child elements of the {@link #element}
 * to begin a drag. This is useful in 2 case:
 * - Where only a certain part of the element should trigger a drag, but the whole element should move.
 * - When there are several repeated elements that may represent objects.
 *
 * In the example below, each child element becomes draggable and
 * the describe method is used to extract the id from the DOM element.
 *
 *
 *      var data = [{
 *          id: 1,
 *          name: 'Adam'
 *      }, {
 *          id: 2,
 *          name: 'Barbara'
 *      }, {
 *          id: 3,
 *          name: 'Charlie'
 *      }];
 *
 *      var tpl = new Ext.XTemplate(
 *          '<div class="container">',
 *              '<tpl for=".">',
 *                  '<div class="child" data-id="{id}">{name}</div>',
 *              '</tpl>',
 *          '</div>'
 *      );
 *
 *      var el = tpl.append(Ext.getBody(), data);
 *
 *      new Ext.drag.Source({
 *          element: el,
 *          handle: '.child',
 *          describe: function(info) {
 *              info.setData('item', Ext.fly(info.eventTarget).getAttribute('data-id'));
 *          }
 *      });
 *
 */

/**
 * @cfg {Boolean/String/String[]} [activeOnLongPress=false]
 * `true` to always begin a drag with longpress. `false` to
 * never drag with longpress. If a string (or strings) are passed, it should
 * correspond to the pointer event type that should initiate a a drag on
 * longpress. See {@Ext.event.Event#pointerType} for available types.
 * @accessor
 */

/**
 * @cfg {String} [activeCls=null]
 * A css class to add to the {@link #element} while dragging is
 * active.
 * @accessor
 */

/**
 * @cfg {Object/Ext.util.Region/Ext.dom.Element} [constrain=null]
 *
 * Adds constraining behavior for this drag source. See {@link Ext.drag.Constraint} for
 * configuration options. As a shortcut, a {@link Ext.util.Region Region}
 * or {@link Ext.dom.Element} may be passed, which will be mapped to the
 * appropriate configuration on the constraint.
 * @accessor
 */

/**
 * @cfg {String} [handle=null]
 * A CSS selector to identify child elements of the {@link #element} that will cause
 * a drag to be activated. If this is not specified, the entire {@link #element} will
 * be draggable.
 * @accessor
 */

/**
 * {String/Object/Ext.drag.proxy.Base} [proxy='original']
 * The proxy to show while this element is dragging. This may be
 * the alias, a config, or instance of a proxy.
 *
 * See {@link Ext.drag.proxy.None None}, {@link Ext.drag.proxy.Original Original},
 * {@link Ext.drag.proxy.Status Status}.
 * @accessor
 */

/**
 * @cfg {Boolean/Object} [revert=false]
 * `true` (or an animation configuration) to animate the {@link #proxy} (which may be
 * the {@link #element}) back to the original position after drag.
 * @accessor
 */

/**
 * @cfg {Function} describe
 * See {@link #method-describe}.
 */

/**
 * @event beforedragstart
 * Fires before drag starts on this source. Return `false` to cancel the drag.
 *
 * @param {Ext.drag.Source} this This source.
 * @param {Ext.drag.Info} info The drag info.
 * @param {Ext.event.Event} event The event.
 */

/**
 * @event dragstart
 * Fires when the drag starts on this source.
 *
 * @param {Ext.drag.Source} this This source.
 * @param {Ext.drag.Info} info The drag info.
 * @param {Ext.event.Event} event The event.
 */

/**
 * @event dragmove
 * Fires continuously as this source is dragged.
 *
 * @param {Ext.drag.Source} this This source.
 * @param {Ext.drag.Info} info The drag info.
 * @param {Ext.event.Event} event The event.
 */

/**
 * @event dragend
 * Fires when the drag ends on this source.
 *
 * @param {Ext.drag.Source} this This source.
 * @param {Ext.drag.Info} info The drag info.
 * @param {Ext.event.Event} event The event.
 */

/**
 * @event dragcancel
 * Fires when a drag is cancelled.
 *
 * @param {Ext.drag.Source} this This source.
 * @param {Ext.drag.Info} info The drag info.
 * @param {Ext.event.Event} event The event.
 */

/**
 * @method isDragging
 * Checks whether this source is actively dragging.
 * @return {Boolean} `true` if this source is dragging.
 */
