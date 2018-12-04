/**
 * @class Ext.calendar.panel.Panel
 * @extend Ext.calendar.panel.AbstractPanel
 * @xtype calendar
 *
 * This class is the main calendar panel, it wraps {@link Ext.calendar.view.Multi}.
 *
 * It allows switching between multiple views of the same dataset. It is composed of the
 * other calendar types such as {@link Ext.calendar.panel.Month},
 * {@link Ext.calendar.panel.Week}, and {@link Ext.calendar.panel.Day}.
 *
 * It also provides extra UI features like a switcher button,
 * {@link #cfg-titleBar title bar}, and navigation buttons.
 *
 * Sample Calendar panel
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
 *     <Calendar
 *         height={400}
 *         width={600}
 *         store={this.store}
 *     />
 *
 * By default, the Calendar panel contains a {@link Ext.calendar.panel.Day Day},
 * {@link Ext.calendar.panel.Week Week}, and {@link Ext.calendar.panel.Month Month} view.
 * Configurations for these views may be passed in the {@link #cfg-views} config option.
 * For example, to display only a 5-day work week instead of the default 7-day week the
 * following `views` config would be used:
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
 *     <Calendar
 *         height={400}
 *         width={600}
 *         store={this.store}
 *         views={{
 *             week: {
 *                 visibleDays: 5,
 *                 firstDayOfWeek: 1
 *             }
 *         }}
 *     />
 *
 * The previous example will result in a Day, Week, and Month view in the Calendar panel
 * with the Week view displaying only 5 days.  Set a default view to `null` to prevent it
 * from being included in the Calendar panel.
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
 *     <Calendar
 *         height={400}
 *         width={600}
 *         store={this.store}
 *         views: {{
 *             month: null,  // now only the Week and Day calendars will be included
 *             week: {
 *                 visibleDays: 5,
 *                 firstDayOfWeek: 1
 *             }
 *         }}
 *     />
 *
 * See the {@link #cfg-views} config for additional configuration options.
 *
 * The default view is "month".  This can be set using the {@link #cfg-defaultView}
 * config option.
 *
 * The following Multi view configs will be applied to any calendar panel in the views
 * config:
 *
 *  - {@link #cfg-compact}
 *  - {@link #cfg-compactOptions}
 *  - {@link #cfg-store}
 *  - {@link #cfg-timezoneOffset}
 *  - {@link #cfg-value}
 */

/**
 * @accessor
 * @cfg {Object} calendarList
 * The config for creating the {@link Ext.calendar.List calendar list).
 */

/**
 * @cfg [compact=false]
 * @accessor
 * @inheritdoc Ext.calendar.view.Multi#cfg-compact
 */

/**
 * @cfg compactOptions
 * @accessor
 * @inheritdoc Ext.calendar.view.Multi#cfg-compactOptions
 */

/**
 * @accessor
 * @cfg {Object} createButton
 * The config for creating the create button.  Clicking / tapping the create
 * button shows the {@link Ext.calendar.form.Add add event form}.  To prevent the
 * create button from being created use `null`.
 *
 *     createButton: null
 *
 * To configure the add form or prevent a user from adding events via calendar
 * interactions see calendar view's
 * {@link Ext.calendar.view.Base#cfg-addForm addForm} config option.
 */

/**
 * @accessor
 * @cfg {String} [createButtonPosition='sideBar']
 * The position for the create button. Can be "sideBar" or "titleBar".
 */

/**
 * @accessor
 * @cfg {Object} dateTitle
 * The config for the date title.
 *
 * **Note:** The date title template is configurable within the
 * {@link #cfg-views} config option for each view
 */

/**
 * @accessor
 * @cfg {Object} nextButton
 * The configuration for the next navigation button.
 */

/**
 * @accessor
 * @cfg {Object} previousButton
 * The configuration for the previous navigation button.
 */

/**
 * @accessor
 * @cfg {Object} sideBar
 * The configuration for the sidebar. Extra items can be added/inserted into
 * the sidebar by adding the items configuration. Items will be sorted by a `weight`
 * property. Existing items in the sidebar have weights `0-100` with an increment of 10
 * for each item. Use a number less than 0 to insert at the front. Use a number larger than 100
 * to insert at the end.
 */

/**
 * @cfg store
 * @accessor
 * @inheritdoc Ext.calendar.view.Multi#cfg-store
 */

/**
 * @accessor
 * @cfg {String} [switcherPosition='titleBar']
 * The position for the create button. Can be `sideBar` or `titleBar`.
 */

/**
 * @cfg timezoneOffset
 * @accessor
 * @inheritdoc Ext.calendar.view.Multi#cfg-timezoneOffset
 */

/**
 * @accessor
 * @cfg {Object} titleBar
 * The configuration for the titleBar. Extra items can be added/inserted into
 * the title bar by adding the items configuration. Items will be sorted by a
 * `weight` property. Existing items in the title bar have weights `0-100` with
 * an increment of 10 for each item. Use a number less than 0 to insert at the
 * front. Use a number larger than 100 to insert at the end.
 */

/**
 * @accessor
 * @cfg {Object} todayButton
 * The configuration for the today button.
 */

/**
 * @cfg value
 * @accessor
 * @inheritdoc Ext.calendar.view.Multi#cfg-value
 */

/**
 * @accessor
 * @cfg {Object} views
 * The calendar views to have available.  Each item in this configuration
 * (labelled by a key) is to contain the configuration for the view, a class that
 * extends {@link Ext.calendar.panel.Base}. There are also other configurations
 * available only when used in conjunction with this panel:
 *
 * - `label` - A label to display on the switcher control
 * - `weight` - A number to indicate the order in which items are
 * displayed in the switcher.  Lower numbers are displayed first.
 * - `titleTpl` - A template string for displaying the current date title.  The
 * values passed are the start and end dates.
 *
 * The default configuration:
 *
 *     views: {
 *         day: {
 *             xtype: 'calendar-day',
 *             titleTpl: '{start:date("l F d, Y")}',
 *             controlStoreRange: false,
 *             label: 'Day',
 *             weight: 10,
 *             dayHeader: null
 *         },
 *         week: {
 *             xtype: 'calendar-week',
 *             dayHeaderFormat: 'D d',
 *             controlStoreRange: false,
 *             titleTpl: '{start:date("j M")} - {end:date("j M Y")}',
 *             label: 'Week',
 *             weight: 20
 *         },
 *         month: {
 *             xtype: 'calendar-month',
 *             titleTpl: '{start:date("F Y")}',
 *             label: 'Month',
 *             weight: 30
 *         }
 *     }
 *
 * Any view configuration options passed will override the default configuration.
 * For example, to change the week view to show 5 days with the week beginning on
 * Monday:
 *
 *     views: {
 *         week: {
 *             visibleDays: 5,
 *             firstDayOfWeek: 1,
 *             label: 'Work Week'
 *         }
 *     }
 *
 * With the above config the default day and month views will be rendered along
 * with a modified week view with the text of "Work Week" in the view switcher
 * control.
 *
 * To prevent a default view from being displayed set the view config to `null`.
 * For example, to hide the Month view:
 *
 *     views: {
 *         month: null
 *     }
 *
 * Any calendar views configured with keys other than "day", "week", and "month"
 * will be included in addition to the default views.  For example, to show the
 * modified work week view we configured above in addition to the default Day,
 * Week, and Month views we would pass in the same config with a key of
 * "workweek" (the can be anything you choose) along with a weight indicating the
 * placement of the "Work Week" button in the switcher.
 *
 *     views: {
 *         workweek: {
 *             visibleDays: 5,
 *             firstDayOfWeek: 1,
 *             label: 'Work Week',
 *             weight: 25
 *         }
 *     }
 *
 * Using the above config the Calendar would now have 4 views available and would
 * display "Work Week" in the switcher control after "Week" and before "Month".
 *
 * The configuration key will be the string used when specifying the
 * {@link #cfg-defaultView} as well as that passed to the {@link #method-setView}
 * method.  For example, using the last views config example the "worweek" would
 * be shown using:
 *
 *     CalendarInstance.setView('workweek');
 */

/**
 * @cfg [defaultView='month']
 * @inheritdoc Ext.calendar.view.Multi#cfg-defaultView
 */

/**
 * @method getCalendarList
 * @hide
 */

/**
 * @method setCalendarList
 * @hide
 */

/**
 * @method getCreateButton
 * @hide
 */

/**
 * @method setCreateButton
 * @hide
 */

/**
 * @method getNextButton
 * @hide
 */

/**
 * @method setNextButton
 * @hide
 */

/**
 * @method getPreviousButton
 * @hide
 */

/**
 * @method setPreviousButton
 * @hide
 */

/**
 * @method getSideBar
 * @hide
 */

/**
 * @method setSideBar
 * @hide
 */

/**
 * @method getSwitcher
 * @hide
 */

/**
 * @method setSwitcher
 * @hide
 */

/**
 * @method getTitleBar
 * @hide
 */

/**
 * @method setTitleBar
 * @hide
 */

/**
 * @method getTodayButton
 * @hide
 */

/**
 * @method setTodayButton
 * @hide
 */

/**
 * @method setViews
 * @hide
 */

/**
 * @method moveNext
 * Moves the active view forward. The amount moved
 * depends on the current view.
 */

/**
 * @method movePrevious
 * Moves the active view backward. The amount moved
 * depends on the current view.
 */

/**
 * @method navigate
 * Move the current view by an amount based of the current {@link #value}.
 * @param {Number} amount The number of intervals to move.
 * @param {String} [interval=Ext.Date.DAY] The interval to navigate by. See {@link Ext.Date}
 * for valid intervals.
 */

/**
 * @method setView
 * @inheritdoc Ext.calendar.view.Multi#method-setView
 */
