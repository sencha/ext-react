/**
 * @class Ext.dataview.listswiper.ListSwiper
 * @extend Ext.plugin.Abstract
 * @alias plugin.listswiper
 * This plugin provides a way to map actions to swipe gesture on all list items.
 */

/**
 * @event itemaction
 * Fires whenever a swipe action has been triggered from a list item.
 * @param {Ext.dataview.List} this
 * @param {Number} index The index of the swipped item.
 * @param {Ext.data.Model} record The record associated to the item.
 * @param {String} action The triggered action key.
 * @member Ext.dataview.List
 */

/**
 * @cfg {Boolean} [dismissOnTap=true]
 * If `true`, actions in the undo state will be committed when the item is tapped.
 * Any open menus will be closed.
 * @accessor
 */

/**
 * @cfg {Boolean} [dismissOnScroll=true]
 * If `true`, actions in the undo state will be committed as soon as the list is scrolled.
 * Any open menus will be closed
 * @accessor
 */

/**
 * @cfg {Number} [commitDelay=0]
 * Number of milliseconds before actions in the undo state are automatically committed (`0` to
 * disable this behavior). Only applicable for {@link #actions} with `undoable: true`.
 * @accessor
 */

/**
 * @cfg {Object/Ext.dataview.plugin.ListSwiperStepper} widget
 * The config object for a {@link Ext.dataview.plugin.ListSwiperStepper}.
 * @cfg {String} widget.xtype (required) The type of component or widget to create.
 * @accessor
 */

/**
 * @cfg {'inner'/'outer'} [target='inner']
 * The section of the list item that is swipable.  Supports the following values:
 *
 * - `'inner'` - the default value. the body of the list item, which includes any
 * tools is swipable, and any docked items remain fixed in place while swiping.
 * - `'outer'` - the entire list item including the docked items is swipable
 * @accessor
 */
