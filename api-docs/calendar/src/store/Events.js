/**
 * @class Ext.calendar.store.Events
 * @extend Ext.data.Store
 * @alias store.calendar-events
 *
 * This store contains the {@link Ext.calendar.model.EventBase events} for a particular
 * {@link Ext.calendar.model.CalendarBase} calendar.
 *
 * This store has an active range that is typically set via a calendar view.  This store
 * pre-fetches events outside of the current range (governed by
 * {@link #cfg-prefetchMode}), to facilitate a smoother user experience when navigating
 * views. Once events fall out of the prefetched range, they are pruned from the store.
 *
 * For more information on the the data the Events store may consume refer to
 * {@link Ext.calendar.model.Event}
 */

/**
 * @cfg {Ext.calendar.model.Calendar} [calendar=null]
 * The calendar for the events.
 * @accessor
 */

/**
 * @cfg {String} [calendarParam='calendar']
 * The parameter name for the calendar to be sent to the server.
 * @accessor
 */

/**
 * @cfg {String} [dateFormat='C']
 * The date format to send to the server.
 * @accessor
 */

/**
 * @cfg {String} [endParam='endDate']
 * The parameter name for the end date to be sent to the server.
 * @accessor
 */

/**
 * @cfg {String} [prefetchMode='month']
 * The prefetch mode for pre-loading records on either side of the active range.
 * Possible values are:
 * - `month`
 * - `week`
 * - `day`
 *
 * If this store will be used amongst multiple views, it is recommended to use the largest
 * unit.
 * @accessor
 */

/**
 * @cfg {String} [startParam='startDate']
 * The parameter name for the start date to be sent to the server.
 * @accessor
 */

/**
 * @method getInRange
 * Gets a list of events that occurs in the specified range.
 * @param {Date} start The start of the range.
 * @param {Date} end The end of the range.
 * @return {Ext.calendar.model.EventBase[]} The events.
 */

/**
 * @method hasRangeCached
 * Checks whether a particular date range is cached in this store.
 * @param {Ext.calendar.date.Range} range The range.
 * @return {Boolean} `true` if the range is cached.
 */

/**
 * @method setRange
 * Sets the range for the current store. This may trigger the
 * store to load, or to prefetch events.
 * @param {Ext.calendar.date.Range} range The range.
 */
