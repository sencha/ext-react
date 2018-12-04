/**
 * @class Ext.calendar.panel.Month
 * @extend Ext.calendar.panel.Weeks
 * @xtype calendar-month
 * For an overview of calendar panels see {@link Ext.calendar.panel.Base}
 *
 * A panel for display a calendar month. Composes a
 * {@link Ext.calendar.view.Month Month View} with a
 * {@link Ext.calendar.header.Base docked header}.
 *
 * The Month panel shows events over an entire month.  The panel shows a summary of the
 * events that occur on each day.  The Month view uses the current date (or the date set
 * on the {@link #cfg-value} config) to determine the month to show.
 *
 * The Month panel displays (as needed) days from trailing/leading months as required to
 * fill the space in the view based on the {@link #cfg-value} and the
 * {@link #cfg-firstDayOfWeek}.  In the following example, the view will start on Sun Dec
 * 27 and conclude on Sat Feb 6 because we require 6 rows to display the month of
 * January.
 *
 *      {
 *          value: new Date(2010, 0, 1) // Fri
 *          firstDayOfWeek: 0 // Sunday
 *      }
 *
 * The {@link #cfg-visibleWeeks} can be specified as `null` to allow the view to
 * calculate the appropriate number of rows to show in the view, as this varies
 * from month to month.  This defaults to the largest possible value (6 weeks) so that
 * the view size is consistent across months.
 *
 * ### Date Range Navigation
 *
 * In addition to {@link #cfg-navigate}, {@link #cfg-movePrevious}, and
 * {@link #cfg-moveNext} the Month view let you quickly navigate between months and
 * years.  The {@link #cfg-previousMonth} and {@link #cfg-nextMonth} methods allow for
 * programmatic month-to-month navigation while {@link #cfg-previousYear} and
 * {@link #cfg-nextYear} navigate the view across years.
 *
 * ### Alternative Classes
 *
 * For a multi-week panel refer to {@link Ext.calendar.panel.Weeks}.
 */

/**
 * @cfg value
 * @inheritdoc Ext.calendar.view.Month#value
 */

/**
 * @cfg visibleWeeks
 * @inheritdoc Ext.calendar.view.Month#visibleWeeks
 */

/**
 * @method nextMonth
 * @inheritdoc Ext.calendar.view.Month#nextMonth
 */

/**
 * @method nextYear
 * @inheritdoc Ext.calendar.view.Month#nextYear
 */

/**
 * @method previousMonth
 * @inheritdoc Ext.calendar.view.Month#previousMonth
 */

/**
 * @method previousYear
 * @inheritdoc Ext.calendar.view.Month#previousYear
 */

/**
 * @cfg view
 * @inheritdoc
 * @accessor
 */
