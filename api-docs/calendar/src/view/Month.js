/**
 * @class Ext.calendar.view.Month
 * @extend Ext.calendar.view.Weeks
 * @xtype calendar-monthview
 *
 * For an overview of calendar views see {@link Ext.calendar.view.Base}
 *
 * The Month view shows events over an entire month.  The view shows a summary of the
 * events that occur on each day.  The month view uses the current date (or the date set
 * on the {@link #cfg-value} config) to determine the month to show.
 *
 * The Month view displays (as needed) days from trailing/leading months as required to
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
 * If your view requires a header showing the days of the week consider using
 * {@link Ext.calendar.panel.Weeks} instead.  For a multi-week view refer to
 * {@link Ext.calendar.view.Weeks}.
 */

/**
 * @cfg {Date} [value=new Date()]
 * The current month to show. The value will default to the
 * first date of the configured month.  For example:
 *
 *      calendar.setValue(new Date(2010, 0, 13));
 *      console.log(calendar.getValue()); // -> 2010-01-01
 *
 * @accessor
 */

/**
 * @cfg {Number} [visibleWeeks=6]
 * The number of weeks to show in this view. If specified as `null`, the view will generate the appropriate
 * number of rows to display a full month based on the passed {@link #cfg-value}. In a majority of cases,
 * this will be 5, however some months will only require 4, while others will need 6. Defaults to the
 * largest value to keep the view size consistent.
 * @accessor
 */

/**
 * @method nextMonth
 * Move forward by a number of months.
 * @param {Number} [months=1] The number of months to move.
 */

/**
 * @method nextYear
 * Move forward by a number of years.
 * @param {Number} [years=1] The number of years to move.
 */

/**
 * @method previousMonth
 * Move backward by a number of months.
 * @param {Number} [months=1] The number of months to move.
 */

/**
 * @method previousYear
 * Move backward by a number of years.
 * @param {Number} [years=1] The number of years to move.
 */
