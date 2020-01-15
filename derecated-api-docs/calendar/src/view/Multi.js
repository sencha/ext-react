/**
 * @class Ext.calendar.view.Multi
 * @extend Ext.Container
 * @xtype calendar-multiview
 *
 * For an overview of calendar views see {@link Ext.calendar.view.Base}
 *
 * This view is used to wrap multiple calendar panels and allows switching between and
 * communicating with them through a single interface. This class does not provide any
 * additional UI functionality.  That is provided by {@link Ext.calendar.panel.Panel}
 * which wraps this component.
 *
 * Sample Multi view
 *
 *     Ext.create({
 *         xtype: 'calendar-multiview',
 *         renderTo: Ext.getBody(),
 *         height: 400,
 *         width: 400,
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
 *         },
 *         views: {
 *             day: {
 *                 xtype: 'calendar-day'
 *             },
 *             week: {
 *                 xtype: 'calendar-week'
 *             },
 *             month: {
 *                 xtype: 'calendar-month'
 *             }
 *         },
 *         defaultView: 'day'
 *     });
 *
 * In the previous example we've detailed the calendar panel types we're interested in
 * having contained within the multi view using the {@link #cfg-views} config option.
 * The key specified for each calendar panel will be used when specifying the initial
 * {@link #cfg-defaultView} as well as when setting the current view at runtime using
 * the {@link method-setView} method.
 *
 * The following Multi view configs will be applied to any calendar panel in the views
 * config:
 *
 *  - {@link #cfg-compact}
 *  - {@link #cfg-compactOptions}
 *  - {@link #cfg-store}
 *  - {@link #cfg-timezoneOffset}
 *  - {@link #cfg-value}
 *
 * ### Date Range Navigation
 *
 * The {@link #cfg-movePrevious} and {@link #cfg-moveNext} move the active view backward
 * and forward.  The amount moved depends on the current view type.
 *
 * ### Alternative Classes
 *
 * If you require UI controls for navigating views and toggling the visibility of events
 * per source calendar consider {@link Ext.calendar.panel.Panel}.
 * Ext.calendar.panel.Panel wraps the Multi view and provides navigational controls.
 */

/**
 * @cfg [compact=false]
 * @inheritdoc Ext.calendar.view.Base#cfg-compact
 * The compact config is applied to all configured {@link #cfg-views}.
 * @accessor
 */

/**
 * @cfg [compactOptions=null]
 * @inheritdoc Ext.calendar.view.Base#cfg-compactOptions
 * The compactOptions config is applied to all configured {@link #cfg-views}.
 * @accessor
 */

/**
 * @cfg [store=null]
 * @inheritdoc Ext.calendar.view.Base#cfg-store
 * The store config is applied to all configured {@link #cfg-views}.
 * @accessor
 */

/**
 * @cfg [timezoneOffset=null]
 * @inheritdoc Ext.calendar.view.Base#cfg-timezoneOffset
 * The timezoneOffset config is applied to all configured {@link #cfg-views}.
 * @accessor
 */

/**
 * @cfg [value=null]
 * @inheritdoc Ext.calendar.view.Base#cfg-value
 * The value config is applied to all configured {@link #cfg-views}.
 * @accessor
 */

/**
 * @cfg {Object} [views=null]
 * The calendar views to have available, each item in this configuration
 * (labelled by a key) is to contain the configuration for the view, a class that
 * extends {@link Ext.calendar.panel.Base}.
 *
 * Example with a day and week view:
 *
 *     views: {
 *         day: {
 *             xtype: 'calendar-day'
 *         },
 *         week: {
 *             xtype: 'calendar-week'
 *         }
 *     }
 *
 * The "day" and "week" keys would be the eligible values for the
 * {@link #cfg-defaultView} and the param string to pass to
 * {@link #method-setView}.
 * @accessor
 */

/**
 * @cfg {String} [defaultView=null]
 * The key of the item from {@link #views} to use as the default.
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
 * Set the active view.
 *
 * Example defaultView / views configuration
 *
 *     defaultView: 'day',
 *     views: {
 *         day: {
 *             xtype: 'calendar-day'
 *         },
 *         week: {
 *             xtype: 'calendar-week'
 *         }
 *     }
 *
 * To change the view from the default of "day" to "week":
 *
 *     ViewInstance.setView('week');
 *
 * @param {String} view The view name from {@link #views}.
 */
