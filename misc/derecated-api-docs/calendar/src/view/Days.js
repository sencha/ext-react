/**
 * @class Ext.calendar.view.Days
 * @extend Ext.calendar.view.Base
 * @xtype calendar-daysview
 *
 * For an overview of calendar views see {@link Ext.calendar.view.Base}
 *
 * The Days view displays events for multiple days with the time of day along the y axis.
 * The view will display the current date as the first day displayed unless configured
 * with a different date {@link #cfg-value}.  The number of days displayed can be set
 * using the {@link #cfg-visibleDays} config option.  By default, the calendar hours are
 * displayed as a 24 hour clock and are constrained to 8 (8:00am) and 20 (8:00pm).  The
 * beginning and end hour can be set using the {@link #cfg-startTime} and
 * {@link #cfg-endTime} configs.  The time displayed on the timeline may be customized
 * using either the {@link #cfg-timeFormat} or {@link #cfg-timeRenderer} config options.
 *
 * Below are some of the distinctions to the Days view (and generally its subclasses).
 *
 * ### Current Local Time
 *
 * The current local time (when the current date is displayed) will be shown on the view
 * as a thin marker on the day's timeline.  The current time marker can be set using the
 * {@link #cfg-showNowMarker} option.
 *
 * ### Calendar Events
 *
 * Events show on the timeline with their start and end times correlating to the time
 * labels.  The events will display on the timeline according to your local timezone
 * offset from GMT.  The timezone offset can be applied explicitly using the
 * {@link #cfg-timezoneOffset} config option.  The exception being all day or multi-day
 * events.  All day / multi-day events will show up at the top of the view in a dedicated
 * space preceding the view's start time.
 *
 * ### Adding All Day Events
 *
 * In addition to being able to drag / swipe across a day's timeline to show the event
 * add form, an all day type event can be quickly added by tapping / clicking on the
 * dedicated all day row displayed above the start hour.  This is the same dedicated
 * space used to display existing all day events.
 *
 * ### Date Range Navigation
 *
 * The {@link #cfg-movePrevious} and {@link #cfg-moveNext} methods modify the displayed
 * date range by moving the range forward or backward the number of days set on the
 * {@link #cfg-visibleDays} config.
 *
 * ### Alternative Classes
 *
 * If your view requires a header showing the dates displayed consider using
 * {@link Ext.calendar.panel.Days} instead.  To display a single day consider using the
 * {@link Ext.calendar.view.Day} view or {@link Ext.calendar.view.Week} to view a week at
 * a time.
 */

/**
 * @cfg {Boolean} [allowSelection=true]
 * `true` to allow selection in the UI to create events. This includes being able
 * to drag-select a range in the all day area, as well as click/tap in the day
 * area (the dedicated space just above the start time's row) to create an event.
 *
 * See {@link #method-showAddForm} for adding an event when selection is
 * disabled.
 * @accessor
 */

/**
 * @cfg {Boolean} [displayOverlap=true]
 * When displaying events, allow events that intersect to horizontally overlap to
 * save on horizontal space.
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
 * @cfg {Number} [endTime=20]
 * The hour number to end this view. Should be a value between `1` and `24`.
 * @accessor
 */

/**
 * @cfg {Boolean} [resizeEvents=true]
 * `true` to allow events in the day area to be resized.
 * @accessor
 */

/**
 * @cfg {Boolean} [showNowMarker=true]
 * `true` to show a marker on the view that equates to the current local time.
 * @accessor
 */

/**
 * @cfg {Number} [startTime=8]
 * The hour number to start this view. Should be a value between `0` and `23`.
 * @accessor
 */

/**
 * @cfg {String} [timeFormat='H:i']
 * The format to display the time values in the time gutter.
 *
 * Refer to the class description of {@link Ext.Date} for formatting options.
 *
 * Example format for displaying a 12-hour time with an am/pm suffix:
 *
 *     timeFormat: 'h:ia' // displays 14:00 hours as 2:00pm
 *
 * @accessor
 */

/**
 * @cfg {Function} [timeRenderer=null]
 * A formatting function for more complex displays of time values in the time
 * gutter.
 *
 * @param {Number} hour The hour being shown.
 * @param {String} formatted The formatted value as specified by the {@link #timeFormat}.
 * @param {Boolean} firstInGroup `true` if this hour is the first hour in the specified time
 * range to be in the morning (< 12) or in the afternoon > 12.
 *
 * @accessor
 */

/**
 * @cfg {Date} [value=new Date()]
 * The value to start the view from. The events displayed on this
 * view are configured by the value and the {@link #visibleDays}.
 *
 * @accessor
 */

/**
 * @cfg {Number} [visibleDays=4]
 * The number of days to show starting from the {@link #cfg-value}.
 * @accessor
 */

/**
 * @event beforeeventdragstart
 * Fired before an event drag begins. Depends on the {@link #cfg-draggable} config.
 * @param {Ext.calendar.view.Days} this This view.
 * @param {Object} context The context.
 * @param {Ext.calendar.model.EventBase} context.event The event model.
 *
 * Return `false` to cancel the drag.
 */

/**
 * @event beforeeventresizestart
 * Fired before an event resize begins. Depends on the {@link #cfg-resizeEvents} config.
 * @param {Ext.calendar.view.Days} this This view.
 * @param {Object} context The context.
 * @param {Ext.calendar.model.EventBase} context.event The event model.
 *
 * Return `false` to cancel the resize.
 */

/**
 * @event eventdrop
 * Fired when an event drop is complete.
 * Depends on the {@link #cfg-droppable} config.
 * @param {Ext.calendar.view.Days} this The view.
 * @param {Object} context The context.
 * @param {Ext.calendar.model.EventBase} context.event The event model.
 * @param {Ext.calendar.date.Range} context.newRange The new date range.
 */

/**
 * @event eventresize
 * Fired when an event resize is complete.
 * Depends on the {@link #cfg-resizeEvents} config.
 * @param {Ext.calendar.view.Days} this The view.
 * @param {Object} context The context.
 * @param {Ext.calendar.model.EventBase} context.event The event model.
 * @param {Ext.calendar.date.Range} context.newRange The new date range.
 */

/**
 * @event validateeventdrop
 * Fired when an event is dropped on this view, allows the drop
 * to be validated. Depends on the {@link #cfg-droppable} config.
 * @param {Ext.calendar.view.Days} this The view.
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

/**
 * @event validateeventresize
 * Fired when an event is resized on this view, allows the resize
 * to be validated. Depends on the {@link #cfg-resizeEvents} config.
 * @param {Ext.calendar.view.Days} this The view.
 * @param {Object} context The context.
 * @param {Ext.calendar.model.EventBase} context.event The event model.
 * @param {Ext.calendar.date.Range} context.newRange The new date range.
 * @param {Ext.Promise} context.validate A promise that allows validation to occur.
 * The default behavior is for no validation to take place. To achieve asynchronous
 * validation, the promise on the context object must be replaced:
 *
 *     {
 *         listeners: {
 *             validateeventresize: function(view, context) {
 *                 context.validate = context.then(function() {
 *                     return Ext.Ajax.request({
 *                         url: '/checkResize'
 *                     }).then(function(response) {
 *                         return Promise.resolve(response.responseText === 'ok');
 *                     });
 *                 });
 *             }
 *         }
 *     }
 */

/**
 * @method setTimeRange
 * Sets the {@link #startTime} and {@link #endTime} simultaneously.
 * @param {Number} start The start hour between 0 and 23.
 * @param {Number} end The end hour between 1 and 24.
 */
