/**
 * @class Ext.calendar.view.Week
 * @extend Ext.calendar.view.Days
 * @xtype calendar-weekview
 *
 * For an overview of calendar views see {@link Ext.calendar.view.Base}
 *
 * The Week view displays the week containing the current date (or the date
 * set on the {@link #cfg-value} config).  The number of days configured on the
 * {@link #cfg-visibleDays} config (defaults to 7) are displayed starting with the value
 * set on the {@link #cfg-firstDayOfWeek}.
 *
 * By default the first day is Sunday.  If you want to create a "work week" type view
 * where the weekend days are omitted you can modify the `visibleDays` and
 * `firstDayOfWeek` to show only Monday - Friday.
 *
 *     Ext.create({
 *         xtype: 'calendar-weekview',
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
 * ### Date Range Navigation
 *
 * The {@link #cfg-movePrevious} and {@link #cfg-moveNext} methods modify the displayed
 * date range by moving the range forward or backward one week.
 *
 * i.e.  `view.moveNext();` called on a 7-day view 1 week.  **Note** that a view
 * configured with 5 `visibleDays` would not advance 5 days, but rather will show the
 * next full week with only 5 visible days.
 *
 * ### Alternative Classes
 *
 * If your view requires a header showing the dates displayed consider using
 * {@link Ext.calendar.panel.Week} instead.  To display fewer days consider using the
 * {@link Ext.calendar.view.Day} or {@link Ext.calendar.view.Days} view.
 */

/**
 * @cfg {Number} [firstDayOfWeek=undefined]
 * The day on which the calendar week begins. `0` (Sunday) through `6` (Saturday).
 * Defaults to {@link Ext.Date#firstDayOfWeek}
 * @accessor
 */

/**
 * @cfg {Date} [value=new Date()]
 * The start of the date range to show. The visible range of the view will begin
 * at the {@link #firstDayOfWeek} immediately preceding this value, or the value if
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
 * @cfg [visibleDays=7]
 * @inheritdoc
 * @accessor
 */
