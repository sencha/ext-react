/**
 * @class Ext.calendar.model.Event
 * @extend Ext.data.Model
 * The default implementation for am event model. All fields are accessed via the
 * getter/setter API to allow for custom model implementations.
 *
 * ## Fields ##
 *
 * The following fields are provided:
 *
 * - id : {Number} - The unique id for the calendar event record
 * - title : {String} - The title to display for the event.  Maps to
 * {@link #method-getTitle} and {@link #method-setTitle}.
 * - calendarId : {Object} - The id of the parent source calendar.  Maps to
 * {@link #method-getCalendarId} and {@link #method-setCalendarId}.
 * - description : {String} - The description to display for the event.  Maps to
 * {@link #method-getDescription} and {@link #method-setDescription}.
 * - startDate : {Date} - The event's start date and time (in UTC format).  Maps to
 * {@link #method-getStartDate} and {@link #method-setStartDate}.
 * - endDate : {Date} - The event's end date and time (in UTC format).  Maps to
 * {@link #method-getEndDate} and {@link #method-setEndDate}.
 * - allDay : {Boolean} - A flag indicating that the event is all day.  Maps to
 * {@link #method-getAllDay} and {@link #method-setAllDay}.
 * - duration : {Number} - The duration of the event.  Maps to
 * {@link #method-getDuration} and {@link #method-setDuration}.
 *
 * Events read / write the time stamp in UTC format.  The time zone should be GMT.  The
 * timezone offset for the local computer is used when rendering the event on the
 * calendar view.  A different timezone offset can be specified using the view's
 * {@link Ext.calendar.view.Base#cfg-timezoneOffset timezoneOffset} config option.
 *
 * ### Sample Response
 *
 * Below is a sample response from a remote source providing a single event for a source
 * calendar with an id of 1:
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
 * Sample response for the same source calendar with an all day event on Sept. 30th 2016
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
 * **Note:** The "id"s for all events must be unique within a calendar store across all
 * event stores.  Duplicate "id"s even across event stores may result in unintended
 * consequences.
 *
 * ### Custom Data
 *
 * While the Event model fields may not be set on a user-defined model, custom data can
 * easily be accommodated by extending the Event model and modifying the associated
 * getter / setter methods.
 *
 * For example, let's assume your events server provides the `description` as "desc".
 * The response from the server would look like:
 *
 *     [{
 *         "id": 1001,
 *         "calendarId": 1,
 *         "startDate": "2016-09-30T21:30:00.000Z",
 *         "endDate": "2016-09-30T22:30:00.000Z",
 *         "title": "Demo starter app",
 *         "desc": "Demonstrate the starter app to project management"
 *     }]
 *
 * Internally what is used to read and write the description is `getDescription` and
 * `setDescription`.  By default those will be looking for the description string to be
 * on the `description` field.  To have our model work with the `desc` data instead the
 * derived model would look like:
 *
 *     Ext.define('MyApp.model.Event', {
 *         extend: 'Ext.calendar.model.Event',
 *
 *         getDescription: function () {
 *             return this.data.desc;
 *         },
 *         setDescription: function (description) {
 *             this.set('desc', description);
 *         }
 *     });
 *
 * The model can then be specified on the Events store config:
 *
 *     store = new Ext.data.Store({
 *         autoLoad: true,
 *         proxy: {
 *             type: 'ajax',
 *             url: 'calendars.php'
 *         },
 *         eventStoreDefaults: {
 *             model: 'MyApp.model.Event',
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
 * The calendar makes no assumptions about the structure of the data provided, only that
 * it exists. This abstraction of data access ensures flexibility for a wide range of
 * data structures to be used.
 *
 * As an example of this concept, the default Event model has a `startDate` and `endDate`
 * field. The {@link #method-getDuration} method is calculated based on these values.
 * Another possible implementation could be to have a `startDate` and `duration` field on
 * the model and have the `getEndDate` be a calculated quantity. The API makes no
 * distinction here, as long as the EventBase interface is fulfilled.
 */
