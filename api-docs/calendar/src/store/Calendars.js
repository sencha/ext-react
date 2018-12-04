/**
 * @class Ext.calendar.store.Calendars
 * @extend Ext.data.Store
 * @alias store.calendar-calendars
 *
 * A store for {@link Ext.calendar.model.CalendarBase Calendar} models.
 *
 * This store type is used as the base store for
 * {@link Ext.calendar.view.Base calendar views}.  The Calendars store contains one or
 * more source calendars whose primary purpose is to own
 * {@link Ext.calendar.Event Events} within the source calendar's
 * {@link Ext.calendar.store.Events Events store}.
 *
 * ### Dynamic Events Store Configuration
 *
 * Below is a sample calendar configured to {@link #cfg-autoLoad} source calendars from
 * "calendars.php":
 *
 *     store = new Ext.data.Store({
 *         autoLoad: true,
 *         proxy: {
 *             type: 'ajax',
 *             url: 'calendars.php'
 *         }
 *     });
 *
 *     <Calendar
 *         height={400}
 *         width={600}
 *         store={this.store}
 *     />
 *
 * As mentioned before, source calendars themselves own Events stores.  Loading the
 * Calendars store and its source calendars will automatically fetch events for the
 * calendar view's date range.  However, by default the Events store belonging to each
 * source calendar is not configured with a {@link Ext.data.proxy.Server proxy} to fetch
 * the remote events.  Using the above example the expected data response for a single
 * source calendar would look something like:
 *
 *     [{
 *         "id": 1,
 *         "title": "Personal",
 *         "eventStore": {
 *             "proxy": {
 *                 "type": "ajax",
 *                 "url": "events.php"
 *             }
 *         }
 *     }]
 *
 * In the above data response we see:
 *
 *  - **id** - The unique id for this source calendar record in the Calendars store
 *  - **title** - The source calendar title (used when displayed in a
 * {@link Ext.calendar.form.CalendarPicker CalendarPicker})
 *  - **eventStore** - The config options for the source calendar Events store
 *
 * **Note:** for more information on the data the Calendar model consumes refer to
 * {@link Ext.calendar.model.Calendar}
 *
 * ### Default Events Store Configuration
 *
 * Passing the `eventStore` config back with the calendar offers maximum flexibility as
 * the Events store config / url can be specified uniquely per source calendar.  However,
 * if the events will all be served up from the same remote source it may be more
 * effective to configure the Calendars store's {@link #cfg-eventStoreDefaults} with
 * common defaults.  As an example:
 *
 *     store = new Ext.data.Store({
 *         autoLoad: true,
 *         proxy: {
 *             type: 'ajax',
 *             url: 'calendars.php'
 *         },
 *         eventStoreDefaults: {
 *             proxy: {
 *                 type: 'ajax',
 *                 url: 'events.php'
 *             }
 *         }
 *     });
 *
 *     <Calendar
 *         height={400}
 *         width={600}
 *         store={this.store}
 *     />
 *
 * With the above configuration a sample response from "calendars.php" including a single
 * source calendar would be:
 *
 *     [{
 *         "id": 1,
 *         "title": "Personal"
 *     }]
 *
 * Using the above Calendars config every source calendar passed back from
 * "calendars.php" will have its events store configured to fetch events from
 * "events.php".  Read operations requesting events will pass up to the remote server:
 *
 *  - **calendar** - The id of the source calendar
 *  - **startDate** - The start date / time of events for the current calendar view
 *  - **endDate** - The end date / time of events for the current calendar view
 *
 * You can configure the param names sent using the Event model's
 * {@link Ext.calendar.store.Events#cfg-calendarParam calendarParam},
 * {@link Ext.calendar.store.Events#cfg-startParam startParam}, and
 * {{@link Ext.calendar.store.Events#cfg-endParam endParam}} config options.
 *
 * **Note:** The date range requested will be somewhat larger than the current visible
 * date range in the calendar view as set in the Events store's
 * {@link Ext.calendar.store.Events#cfg-prefetchMode prefetchMode} config option.
 * Commonly this configuration can be left as its default.
 *
 * ### Events Response
 *
 * Below is a sample response from 'events.php' for a 1 hour event.
 *
 *     [{
 *         "id": 1001,
 *         "calendarId": 1,
 *         "startDate": "2016-09-30T21:30:00.000Z",
 *         "endDate": "2016-09-30T22:30:00.000Z",
 *         "title": "Watch cartoons",
 *         "description": "Catch up with adventurers Finn and Jake"
 *     }]
 *
 * Sample response from 'events.php' for an all day event on Sept. 30th 2016
 *
 *     [{
 *         "id": 1001,
 *         "calendarId": 1,
 *         "startDate": "2016-09-30T00:00:00.000Z",
 *         "endDate": "2016-10-01T00:00:00.000Z",
 *         "allDay": true,
 *         "title": "Netflix Binge",
 *         "description": "Watch Luke Cage.  Maybe twice."
 *     }]
 *
 * An all day event should be indicated as `allDay`: true.  Its `startDate` will be the
 * 00:00:00 hour of the target date and have an `endDate` with a 00:00:00 time on the
 * following day.
 *
 * In the event response we see:
 *
 *  - **id** - The unique id for the calendar event record
 *  - **calendarId** - The id of the parent source calendar
 *  - **startDate** - The event's start date and time (in UTC format)
 *  - **endDate** - The event's end date and time (in UTC format)
 *  - **title** - The title to display for the event
 *  - **description** - The description to display for the event
 *
 * **Note:** for more information on the data the Events model consumes refer to
 * {@link Ext.calendar.model.Event}
 *
 * ### Multi-Calendar Support
 *
 * The calendar views also accommodate multiple source calendars within the same view.
 * The response from the Calendars store (from 'calendars.php' using the above example)
 * should be an array of objects containing a unique "id" per source calendar along with
 * unique "title"s.  The titles will display in a combo field in the add/edit event forms
 * as a way to indicate what source calendar an event belongs to as well as in the
 * {@link Ext.calendar.panel.Panel Calendar panel's}
 * {@link Ext.calendar.List calendar list}.  The id will correlate to the "calendarId"
 * key in the event response.
 *
 * Sample response from 'calendars.php' including two source calendars: "Personal" and
 * "Work"
 *
 *     [{
 *         "id": 1,
 *         "title": "Personal"
 *     }, {
 *         "id": 2,
 *         "title": "Work"
 *     }]
 *
 * A view with two source calendars will make two read request each time the view's date
 * range is rendered.  Expected in return is two separate responses containing events
 * with "calendarId" keys corresponding to the calendar that owns the events.  With a
 * calendar view with both "Personal" and "Work" source calendars two responses would be
 * expected: one like as seen above including a key of `"calendarId": 1` and one for the
 * Work calendar as seen here.
 *
 *     [{
 *         "id": 2001,
 *         "calendarId": 2,
 *         "startDate": "2016-09-30T21:30:00.000Z",
 *         "endDate": "2016-09-30T22:30:00.000Z",
 *         "title": "Meet with Development",
 *         "description": "Discuss the current cycle requirements"
 *     }]
 *
 * **Note:** The "id"s for all events must be unique within a calendar store across all
 * event stores.  Duplicate "id"s even across event stores may result in unintended
 * consequences.
 */

/**
 * @cfg {Object} [eventStoreDefaults=null]
 * Defaults for the {@link Ext.calendar.model.CalendarBase event stores}
 * generated by the calendars.
 * @accessor
 */

/**
 * @method getEventSource
 * Get the event source for this calendar.
 * @return {Ext.calendar.store.EventSource} The event source.
 */
