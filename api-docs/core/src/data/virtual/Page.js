/**
 * @class Ext.data.virtual.Page
 * @extend Ext.Base
 *
 * This class manages a page of records in a virtual store's `PageMap`. It is created
 * with the page `number` (0-based) and uses the store's `pageSize` to calculate the
 * record span covered by it and stores these as `begin` and `end` properties. These
 * aspects of the `Page` as well as the owning `PageMap` are expected to be immutable
 * throughout the instance's life-cycle.
 *
 * The normal use for a `Page` is by a `Range`. Ranges acquire and `lock` the pages they
 * span. As they move on, they `release` these locks. The act of locking pages schedules
 * them for loading. Unlocking pages allows them to be evicted from the `PageMap` to
 * reclaim memory for other pages.
 *
 * @private
 * @since 6.5.0
 */

/**
 * @method adjustLock
 * Acquires or releases the specified type of lock to this page. If this causes the
 * `locked` property to transition to a new value, the `pageMap` is informed to
 * enqueue or dequeue this page from the loading queues.
 * @param {"active"/"prefetch"} kind The type of lock.
 * @param {Number} delta A value of `1` to lock or `-1` to release.
 */
