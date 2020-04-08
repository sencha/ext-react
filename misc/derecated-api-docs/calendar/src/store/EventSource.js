/**
 * @class Ext.calendar.store.EventSource
 * @extend Ext.data.Store
 * This store contains a flattened list of {@link Ext.calendar.model.EventBase events}
 * from multiple {@link Ext.calendar.store.Calendars calendars}. It provides a simpler
 * API for calendar views to interact with and monitors the attached {@link #source}
 * for changes.
 *
 * This store ensures that only events within the specified {@link #setRange range} are
 * included. Views will communicate with this store to set the range, which is then 
 * forwarded to any appropriate {@link Ext.calendar.store.Events event stores}.
 *
 * Typically, this class is not created directly but rather via the 
 * {@link Ext.calendar.store.Calendars#getEventSource} method.
 */

/**
 * @cfg {Ext.calendar.store.Calendars} [source=null]
 * The calendar source for events.
 * @accessor
 */
