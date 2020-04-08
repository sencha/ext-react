/**
 * @class Ext.calendar.panel.Week
 * @extend Ext.calendar.panel.Days
 * @xtype calendar-week
 *
 * For an overview of calendar panels see {@link Ext.calendar.panel.Base}
 *
 * A panel for display a Week. Composes a {@link Ext.calendar.view.Week Week View} with a
 * {@link Ext.calendar.header.Base docked header}.
 *
 * The Week panel displays the week containing the current date (or the date
 * set on the {@link #cfg-value} config).  The number of days configured on the
 * {@link #cfg-visibleDays} config (defaults to 7) are displayed starting with the value
 * set on the {@link #cfg-firstDayOfWeek}.
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
 *     <Calendar_Week
 *         height={400}
 *         width={400}
 *         store={this.store}
 *         firstDayOfWeek="1" // starts the view on Monday
 *         visibleDays="5" // and displays it and the 4 days after
 *     />
 *
 * ### Date Range Navigation
 *
 * The {@link #cfg-movePrevious} and {@link #cfg-moveNext} methods modify the displayed
 * date range by moving the range forward or backward one week.
 *
 * i.e.  `panel.moveNext();` called on a 7-day view 1 week.  **Note** that a panel
 * configured with 5 `visibleDays` would not advance 5 days, but rather will show the
 * next full week with only 5 visible days.
 *
 * ### Alternative Classes
 *
 * To display fewer days consider using {@link Ext.calendar.panel.Day} or
 * {@link Ext.calendar.panel.Days}.
 */

/**
 * @cfg [firstDayOfWeek=true]
 * @inheritdoc Ext.calendar.view.Week#cfg-firstDayOfWeek
 */

/**
 * @cfg value
 * @inheritdoc Ext.calendar.view.Week#value
 */

/**
 * @cfg visibleDays
 * @inheritdoc Ext.calendar.view.Week#visibleDays
 */

/**
 * @cfg view
 * @inheritdoc
 * @accessor
 */
