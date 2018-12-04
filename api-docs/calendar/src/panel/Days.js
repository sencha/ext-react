/**
 * @class Ext.calendar.panel.Days
 * @extend Ext.calendar.panel.Base
 * @xtype calendar-days
 *
 * For an overview of calendar panels see {@link Ext.calendar.panel.Base}
 *
 * A panel for display a series of days. Composes a 
 * {@link Ext.calendar.view.Days Days View} with a
 * {@link Ext.calendar.header.Base docked header}.
 *
 * The Days panel displays events for multiple days with the time of day along the y axis.
 * The panel will display the current date as the first day displayed unless configured
 * with a different date {@link #cfg-value}.  The number of days displayed can be set
 * using the {@link #cfg-visibleDays} config option.  By default, the calendar hours are
 * displayed as a 24 hour clock and are constrained to 8 (8:00am) and 20 (8:00pm).  The
 * beginning and end hour can be set using the {@link #cfg-startTime} and
 * {@link #cfg-endTime} configs.  The time displayed on the timeline may be customized
 * using either the {@link #cfg-timeFormat} or {@link #cfg-timeRenderer} config options.
 *
 * Below are some of the distinctions to the Days panel (and generally its subclasses).
 *
 * ### Current Local Time
 *
 * The current local time (when the current date is displayed) will be shown on the panel
 * as a thin marker on the day's timeline.  The current time marker can be set using the
 * {@link #cfg-showNowMarker} option.
 *
 * ### Calendar Events
 *
 * Events show on the timeline with their start and end times correlating to the time
 * labels.  The events will display on the timeline according to your local timezone
 * offset from GMT.  The timezone offset can be applied explicitly using the
 * {@link #cfg-timezoneOffset} config option.  The exception being all day or multi-day
 * events.  All day / multi-day events will show up at the top of the panel in a dedicated
 * space preceding the panel's start time.
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
 * To display a single day consider using the {@link Ext.calendar.panel.Day} panel or
 * {@link Ext.calendar.panel.Week} to view a week at a time.
 */

/**
 * @event beforeeventdragstart
 * @inheritdoc Ext.calendar.view.Days#beforeeventdragstart
 */

/**
 * @event validateeventdrop
 * @inheritdoc Ext.calendar.view.Days#validateeventdrop
 */

/**
 * @event eventdrop
 * @inheritdoc Ext.calendar.view.Days#eventdrop
 */

/**
 * @event beforeeventresizestart
 * @inheritdoc Ext.calendar.view.Days#beforeeventresizestart
 */

/**
 * @event validateeventresize
 * @inheritdoc Ext.calendar.view.Days#validateeventresize
 */

/**
 * @event eventresize
 * @inheritdoc Ext.calendar.view.Days#eventresize
 */

/**
 * @cfg dayHeader
 * @inheritdoc
 * @accessor
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
 * @cfg [dayHeaderFormat='format']
 * @inheritdoc Ext.calendar.header.Days#format
 */

/**
 * @cfg [allowSelection=true]
 * @inheritdoc Ext.calendar.view.Days#allowSelection
 */

/**
 * @cfg [displayOverlap=true]
 * @inheritdoc Ext.calendar.view.Days#displayOverlap
 */

/**
 * @cfg [draggable=true]
 * @inheritdoc Ext.calendar.view.Days#draggable
 */

/**
 * @cfg [droppable=true]
 * @inheritdoc Ext.calendar.view.Days#droppable
 */

/**
 * @cfg [endTime=true]
 * @inheritdoc Ext.calendar.view.Days#endTime
 */

/**
 * @cfg [resizeEvents=true]
 * @inheritdoc Ext.calendar.view.Days#resizeEvents
 */

/**
 * @cfg [showNowMarker=true]
 * @inheritdoc Ext.calendar.view.Days#showNowMarker
 */

/**
 * @cfg [startTime=true]
 * @inheritdoc Ext.calendar.view.Days#startTime
 */

/**
 * @cfg [timeFormat=true]
 * @inheritdoc Ext.calendar.view.Days#timeFormat
 */

/**
 * @cfg [visibleDays=true]
 * @inheritdoc Ext.calendar.view.Days#visibleDays
 */

/**
 * @method setTimeRange
 * @inheritdoc Ext.calendar.view.Days#setTimeRange
 */
