/**
 * @class Ext.util.Schedulable
 * This is a base class for objects that can be managed by `Ext.util.Scheduler`.
 * @private
 */

/**
 * @method getScheduler
 * This method returns the `Scheduler` for this item.
 * @return {Ext.util.Scheduler}
 */

/**
 * @method schedule
 * Schedules this item with the associated `Ext.util.Scheduler`.
 */

/**
 * @method unschedule
 * Unschedules this item with the associated `Ext.util.Scheduler`.
 */

/**
 * @method sort
 * This method should be overridden by items that have dependencies to insert. The
 * standard form would be:
 *
 *      sort: function () {
 *          this.getScheduler().sortItems(this.dependencies);
 *      }
 *
 * This example assumes the item has a "dependencies" array to pass to the scheduler.
 */