/**
 * @class Ext.calendar.model.Calendar
 * @extend Ext.data.Model
 * The default implementation for a calendar model. All fields are accessed via the
 * getter/setter API to allow for custom model implementations.
 *
 * ## Fields ##
 *
 * The following fields are provided:
 *
 * - id : {Number} - The unique id for this source calendar record in the Calendars
 * store.
 * - title : {String} - The source calendar title (used when displayed in a
 * {@link Ext.calendar.form.CalendarPicker CalendarPicker})  Maps to
 * {@link #method-getTitle} and {@link #method-setTitle}.
 * - description : {String} - The source calendar description.  Maps to
 * {@link #method-getDescription} and {@link #method-setDescription}.
 * - color : {String} - The color to use in {@link Ext.calendar.Event events} as well as
 * the {@link Ext.calendar.List calendar list}.  Maps to {@link #method-getColor} and
 * {@link #method-setColor}.
 * - hidden : {Boolean} - `true` to hide the source calendar events.  Maps to
 * {@link #method-getHidden} and {@link #method-setHidden}.
 * - editable : {Boolean} - `false` to disable editing of this calendar's events.  Maps
 * to {@link #method-getEditable} and {@link #method-setEditable}.
 * - eventStore : {Object} - Allow per-instance configuration for the
 * {@link #method-events} store. This configuration is merged with the
 * {@link #cfg-eventStoreDefaults}.
 *
 * ### Updating the UI
 *
 * You can programmatically update the UI using a variety of the Calendar model's setters
 *
 *     var store = CalendarInstance.getStore();
 *     var rec = store.first(); // find your source calendar with any of Store's methods
 *     rec.setHidden(true);     // hides the events on the calendar view
 *     rec.setEditable(false);  // disables editing this source calendar's events
 *     rec.setColor('#2fa749'); // sets the events' default color to green
 *
 *
 * ### Custom Data
 *
 * For information on custom calendar / event data as well as how the model may be
 * extended to accommodate the custom data see {@link Ext.calendar.model.Event}'s
 * **Custom Data** section.
 */
