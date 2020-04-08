/**
 * @class Ext.calendar.view.Weeks
 * @extend Ext.calendar.view.Base
 * @xtype calendar-weeksview
 *
 * For an overview of calendar views see {@link Ext.calendar.view.Base}
 *
 * The Weeks view shows the events for one or more weeks as full days similar to a
 * conventional calendar.  For a week view including an hourly timeline see
 * {@link Ext.calendar.view.Week}.
 *
 * The weeks view shows the week containing the current date (or the date set on the
 * {@link #cfg-value} config) plus any additional weeks totaling the
 * {@link #cfg-visibleWeeks}.  The number of days shown per week is set using
 * {@link #cfg-visibleDays}.  Each week begins on the day set on the
 * {@link #cfg-firstDayOfWeek}.
 *
 * By default the first day is Sunday.  If you want to create a "work week" type view
 * where the weekend days are omitted you can modify the `visibleDays` and
 * `firstDayOfWeek` to show only Monday - Friday.
 *
 *     Ext.create({
 *         xtype: 'calendar-weeksview',
 *         renderTo: Ext.getBody(),
 *         height: 400,
 *         width: 400,
 *         firstDayOfWeek: 1,  // starts the view on Monday
 *         visibleDays: 5,     // and displays it and the 4 days after
 *         store: {
 *             autoLoad: true,
 *             proxy: {
 *                 type: 'ajax',
 *                 url: 'calendars.php'
 *             },
 *             eventStoreDefaults: {
 *                 proxy: {
 *                     type: 'ajax',
 *                     url: 'events.php'
 *                 }
 *             }
 *         }
 *     });
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
 * i.e.  `view.moveNext();` called on a 7-day view with 2 visible weeks will advance the
 * view 2 weeks.  **Note** that a view configured with 5 `visibleDays` would not advance
 * 5 days, but rather will show the next full week with only 5 visible days.
 *
 * ### Alternative Classes
 *
 * If your view requires a header showing the days of the week consider using
 * {@link Ext.calendar.panel.Weeks} instead.  For a month view refer to
 * {@link Ext.calendar.view.Month}.
 */

/**
 * @cfg {Boolean} [addOnSelect=true]
 * `true` to show the {@link #cfg-addForm} when a selection is made on the body.
 *
 * Use {@link #cfg-addOnSelect} to control view selection itself.
 * @accessor
 */

/**
 * @cfg {Boolean} [allowSelection=true]
 * `true` to allow days to be selected via the UI.
 * @accessor
 */

/**
 * @cfg compactOptions
 * @inheritdoc
 * @accessor
 */

/**
 * @cfg {String} [dayFormat='j']
 * The format for displaying the day in the cell.
 * See {@link Ext.Date} for options.
 * @accessor
 */

/**
 * @cfg {Boolean} [draggable=true]
 * `true` to allows events to be dragged from this view.
 * @accessor
 */

/**
 * @cfg {Boolean} [droppable=true]
 * `true` to allows events to be dropped on this view.
 * @accessor
 */

/**
 * @cfg {Number} [firstDayOfWeek=undefined]
 * The day on which the calendar week begins. `0` (Sunday) through `6` (Saturday).
 * Defaults to {@link Ext.Date#firstDayOfWeek}
 * @accessor
 */

/**
 * @cfg {String} [overflowText='+{0} more']
 * Text to show when events overflow on a particular day to allow the user to view
 * the rest. This string is evaluated as a formatted string where the argument is
 * the number of overflowing events. Depends on {@link #cfg-showOverflow}.
 * @accessor
 */

/**
 * @cfg {String} [showOverflow='bottom']
 * Show an overflow label that will display an overlay when
 * there are too many events to render in the view. Valid
 * configurations are:
 * - `top`
 * - `bottom`
 *
 * Pass `null` or `''` to not show overflow.
 * The overflow text may be formatted using {@link #cfg-overflowText}.
 * @accessor
 */

/**
 * @cfg {Date} [value=new Date()]
 * The start of the date range to show. The visible range of the view will begin
 * at the {@link #firstDayOfWeek} immediately preceding this value or the value if
 * it is the {@link #firstDayOfWeek}. For example, using the following configuration:
 *
 *      {
 *          firstDayOfWeek: 0, // Sunday
 *          value: new Date(2010, 2, 3) // Wed, 3 March 2010
 *      }
 *
 * The visible range would begin on Sun 28th Feb.
 * @accessor
 */

/**
 * @cfg {Number} [visibleDays=7]
 * The number of days to show in a week, starting from the {@link #firstDayOfWeek}.
 * For example, to show the view with days `Mon - Fri`, use:
 *
 *      {
 *          visibleDays: 5,
 *          firstDayOfWeek: 1 // Monday
 *      }
 * @accessor
 */

/**
 * @cfg {Number} [visibleWeeks=2]
 * The number of weeks to show in this view.
 * @accessor
 */

/**
 * @cfg {Number[]} [weekendDays=undefined]
 * The days of the week that are the weekend. `0` (Sunday) through `6` (Saturday).
 * Defaults to {@link Ext.Date#weekendDays}.
 * @accessor
 */

/**
 * @event beforeeventdragstart
 * Fired before an event drag begins. Depends on the {@link #cfg-draggable} config.
 * @param {Ext.calendar.view.Weeks} this This view.
 * @param {Object} context The context.
 * @param {Ext.calendar.model.EventBase} context.event The event model.
 *
 * Return `false` to cancel the drag.
 */

/**
 * @event eventdrop
 * Fired when an event drop is complete.
 * Depends on the {@link #droppable} config.
 * @param {Ext.calendar.view.Weeks} this The view.
 * @param {Object} context The context.
 * @param {Ext.calendar.model.EventBase} context.event The event model.
 * @param {Ext.calendar.date.Range} context.newRange The new date range.
 */

/**
 * @event select
 * Fired when a single date is selected.
 * @param {Ext.calendar.view.Weeks} this The view.
 * @param {Object} context The context.
 * @param {Date} context.date The date selected.
 */

/**
 * @event selectrange
 * Fired when a date range is selected.
 * @param {Ext.calendar.view.Weeks} this The view.
 * @param {Object} context The context.
 * @param {Ext.calendar.date.Range} context.range The date range.
 */

/**
 * @event validateeventdrop
 * Fired when an event is dropped on this view, allows the drop
 * to be validated. Depends on the {@link #droppable} config.
 * @param {Ext.calendar.view.Weeks} this The view.
 * @param {Object} context The context.
 * @param {Ext.calendar.model.EventBase} context.event The event model.
 * @param {Ext.calendar.date.Range} context.newRange The new date range.
 * @param {Ext.Promise} context.validate A promise that allows validation to occur.
 * The default behavior is for no validation to take place. To achieve asynchronous
 * validation, the promise on the context object must be replaced:
 *
 *     {
 *         listeners: {
 *             validateeventdrop: function(view, context) {
 *                 context.validate = context.then(function() {
 *                     return Ext.Ajax.request({
 *                         url: '/checkDrop'
 *                     }).then(function(response) {
 *                         return Promise.resolve(response.responseText === 'ok');
 *                     });
 *                 });
 *             }
 *         }
 *     }
 */
