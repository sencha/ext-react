/**
 * @class Ext.calendar.panel.Weeks
 * @extend Ext.calendar.panel.Base
 * @xtype calendar-weeks
 *
 * For an overview of calendar panels see {@link Ext.calendar.panel.Base}
 *
 * A panel for display a series of weeks. Composes a 
 * {@link Ext.calendar.view.Weeks Weeks View} with a
 * {@link Ext.calendar.header.Base docked header}.
 *
 * The Weeks panel shows the events for one or more weeks as full days similar to a
 * conventional calendar.  For a week view including an hourly timeline see
 * {@link Ext.calendar.panel.Week}.
 *
 * The weeks panel shows the week containing the current date (or the date set on the
 * {@link #cfg-value} config) plus any additional weeks totaling the
 * {@link #cfg-visibleWeeks}.  The number of days shown per week is set using
 * {@link #cfg-visibleDays}.  Each week begins on the day set on the
 * {@link #cfg-firstDayOfWeek}.
 *
 * By default the first day is Sunday.  If you want to create a "work week" type view
 * where the weekend days are omitted you can modify the `visibleDays` and
 * `firstDayOfWeek` to show only Monday - Friday.
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
 *     <Calendar_Weeks
 *         height={400}
 *         width={400}
 *         store={this.store}
 *         firstDayOfWeek="1" // starts the view on Monday
 *         visibleDays="5" // and displays it and the 4 days after
 *     />
 *
 * ### Calendar Events
 *
 * Events show on the view with their start and end days correlating to the day
 * labels.  The events will display on the timeline according to your local timezone
 * offset from GMT.  The timezone offset can be applied explicitly using the
 * {@link #cfg-timezoneOffset} config option.
 *
 * ### Adding All Day Events
 *
 * Dragging / swiping across multiple days will show the event add form with multiple
 * days pre-populated in the form's start / end dates.  A single all day type event can
 * be added by tapping / clicking on a single day.
 *
 * ### Date Range Navigation
 *
 * The {@link #cfg-movePrevious} and {@link #cfg-moveNext} methods modify the displayed
 * date range by moving the range forward or backward the number of
 * {@link #cfg-visibleWeeks}.
 *
 * i.e.  `panel.moveNext();` called on a 7-day view with 2 visible weeks will advance the
 * view 2 weeks.  **Note** that a panel configured with 5 `visibleDays` would not advance
 * 5 days, but rather will show the next full week with only 5 visible days.
 *
 * ### Alternative Classes
 *
 * For a month view refer to {@link Ext.calendar.view.Month}.
 */

/**
 * @cfg dayHeader
 * @inheritdoc
 * @accessor
 */

/**
 * @event beforeeventdragstart
 * @inheritdoc Ext.calendar.view.Weeks#beforeeventdragstart
 */

/**
 * @event validateeventdrop
 * @inheritdoc Ext.calendar.view.Weeks#validateeventdrop
 */

/**
 * @event eventdrop
 * @inheritdoc Ext.calendar.view.Weeks#eventdrop
 */

/**
 * @cfg eventRelayers
 * @inheritdoc
 * @accessor
 */

/**
 * @cfg view
 * @inheritdoc
 * @accessor
 */

/**
 * @cfg [addOnSelect=true]
 * @inheritdoc Ext.calendar.view.Weeks#cfg-addOnSelect
 */

/**
 * @cfg [allowSelection=true]
 * @inheritdoc Ext.calendar.view.Weeks#cfg-addOnSelect
 */

/**
 * @cfg [dayFormat=true]
 * @inheritdoc Ext.calendar.view.Weeks#cfg-addOnSelect
 */

/**
 * @cfg [draggable=true]
 * @inheritdoc Ext.calendar.view.Weeks#cfg-addOnSelect
 */

/**
 * @cfg [droppable=true]
 * @inheritdoc Ext.calendar.view.Weeks#cfg-addOnSelect
 */

/**
 * @cfg [firstDayOfWeek=true]
 * @inheritdoc Ext.calendar.view.Weeks#cfg-addOnSelect
 */

/**
 * @cfg [overflowText=true]
 * @inheritdoc Ext.calendar.view.Weeks#cfg-addOnSelect
 */

/**
 * @cfg [showOverflow=true]
 * @inheritdoc Ext.calendar.view.Weeks#cfg-showOverflow
 */

/**
 * @cfg [visibleDays=true]
 * @inheritdoc Ext.calendar.view.Weeks#cfg!visibleDays
 */

/**
 * @cfg [visibleWeeks=true]
 * @inheritdoc Ext.calendar.view.Weeks#cfg!visibleWeeks
 */

/**
 * @cfg [weekendDays=true]
 * @inheritdoc Ext.calendar.view.Weeks#cfg!weekendDays
 */

/**
 * @cfg [dayHeaderFormat='format']
 * @inheritdoc Ext.calendar.header.Weeks#cfg-format
 */
