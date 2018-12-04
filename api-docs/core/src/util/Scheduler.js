/**
 * @class Ext.util.Scheduler
 * @mixin Ext.mixin.Observable
 * This class is used to bulk schedule a set of `Ext.util.Schedulable` items. The items
 * in the scheduler request time by calling their `schedule` method and when the time has
 * arrived its `react` method is called.
 *
 * The `react` methods are called in dependency order as determined by the sorting process.
 * The sorting process relies on each item to implement its own `sort` method.
 *
 * @private
 */

/**
 * @cfg {String/Function} preSort
 * If provided the `Schedulable` items will be pre-sorted by this function or
 * property value before the dependency sort.
 * @accessor
 */

/**
 * @cfg {Number} [tickDelay=5]
 * The number of milliseconds to delay notification after the first `schedule`
 * request.
 * @accessor
 */

/**
 * @property {Boolean} [suspendOnNotify=true]
 * `true` to suspend layouts when the scheduler is triggering bindings. Setting this to `false`
 * may mean multiple layout runs on a single bind call which could affect performance.
 */

/**
 * @method sortItem
 * Adds one item to the sorted items array. This can be called by the `sort` method of
 * `{@link Ext.util.Sortable sortable}` objects to add an item on which it depends.
 *
 * @param {Object} item The item to add.
 * @return {Ext.util.Scheduler} This instance.
 * @since 5.0.0
 */

/**
 * @method sortItems
 * Adds multiple items to the sorted items array. This can be called by the `sort`
 * method of `{@link Ext.util.Sortable sortable}` objects to add items on which it
 * depends.
 *
 * @param {Object/Object[]} items The items to add. If this is an object, the values
 * are considered the items and the keys are ignored.
 * @return {Ext.util.Scheduler} This instance.
 * @since 5.0.0
 */

/**
 * @method notify
 * This method can be called to force the delivery of any scheduled items. This is
 * called automatically on a timer when items request service.
 *
 * @since 5.0.0
 */

/**
 * @method adjustBusy
 * This method should be called when items become busy or idle. These changes are
 * useful outside to do things like update modal masks or status indicators. The
 * changes are delivered as `busy` and `idle` events.
 *
 * @param {Number} adjustment Should be `1` or `-1` only to indicate transition to
 * busy state or from busy state, respectively.
 * @since 5.0.0
 */

/**
 * @method isBusy
 * Returns `true` if this object contains one or more busy items.
 * @return {Boolean}
 * @since 5.0.0
 */

/**
 * @method isIdle
 * Returns `true` if this object contains no busy items.
 * @return {Boolean}
 * @since 5.0.0
 */
