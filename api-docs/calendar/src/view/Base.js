/**
 * @class Ext.calendar.view.Base
 * @extend Ext.Gadget
 * @abstract
 * This is a base class for calendar views.  Calendar views display events for a date /
 * time range specified by the view subclasses:
 *
 * - {@link Ext.calendar.view.Day Day}
 * - {@link Ext.calendar.view.Days Days}
 * - {@link Ext.calendar.view.Week Week}
 * - {@link Ext.calendar.view.Weeks Weeks}
 * - {@link Ext.calendar.view.Month Month}
 * - {@link Ext.calendar.view.Multi Multi}
 *
 * By default, the view will display the current date along with any other dates surround
 * that date as specified by the particular view type.  A target date can be specified
 * by setting the {@link #cfg-value} config option.
 *
 * ### Sample View
 *
 * Below is a sample view instance.  The following example shows how to create a day view,
 * but the basic configuration applies to all view subclasses with the exception of the
 * xtype used.
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
 *     <Calendar_DayView
 *         height={400}
 *         width={400}
 *         store={this.store}
 *         firstDayOfWeek="1" // starts the view on Monday
 *         visibleDays="5" // and displays it and the 4 days after
 *     />
 *
 * **Note:** For more information on possible store configurations and the expected
 * server response for both Calendars and Events stores see:
 * {@link Ext.calendar.store.Calendars}.
 *
 * ### In-View Calendar Events
 *
 * Events show on the view timeline with their start and end times correlating to either
 * the date or the time slots depending on the view type.  The events will display on the
 * timeline according to your local timezone offset from GMT (the expected format for
 * start / end times for events is UTC).  The timezone offset can be applied explicitly
 * using the {@link #cfg-timezoneOffset} config option.  If the view has multiple source
 * calendars, their events will attempt to share overlapping space within their
 * corresponding date / time slots.  Events will be displayed as a different color for
 * each source calendar and their appearance will vary slightly depending on their
 * {@link Ext.calendar.Event.html#cfg-mode mode}.  The overlapping behavior of events
 * competing for the same time slot can be managed using the {@link #cfg-displayOverlap}
 * config option.
 *
 * ### Adding / Editing Events
 *
 * Events may be added to the view by dragging / swiping across the timeline to create
 * the event endpoints.  Doing so shows the {@link Ext.calendar.form.Add add event form}
 * with the dates / times pre-populated from the drag selection.  The
 * {@link #cfg-allowSelection} config can be set to false to prevent user from creating
 * events in this way.  Events added programmatically by calling the
 * {@link #method-showAddForm} method to present the add input form.  Set the view's
 * {@link #cfg-addForm} config to `null` to prevent events from being added to the
 * calendar.
 *
 * Double clicking / tapping an event within the view shows the
 * {@link Ext.calendar.form.Edit edit event form} allowing events to be edited by users.
 * The add form and edit form can be configured using the view's {@link #cfg-addForm} and
 * {@link #cfg-editForm} configs.  For views with time displayed on the y axis of the
 * view (Day, Days, and Week), existing events can be resized using the resize handle on
 * the event widget as well as dragged across the view.  The {@link #cfg-resizeEvents},
 * {@link #cfg-draggable}, and {@link #cfg-droppable} configs may be used to manage event
 * interactions.
 *
 * ### View Navigation
 *
 * The calendar view does not create controls for navigating the view's date range,
 * however the view can be navigated programmatically.  The view's target date can be set
 * explicitly using the {@link #method-setValue} method.  The
 * {@link #method-movePrevious} and {@link #method-moveNext} methods may be called to
 * move the displayed date range forward or back.  And the {@link #method-navigate} lets
 * you move the date an arbitrary amount relative to the current date {@link #cfg-value}.
 *
 * ### Compact Mode
 * The base view class has a {@link #cfg-compact} config.  This boolean configures
 * whether or not the view is in compact mode.  It’s expected that this will be used as a
 * platform config or a responsive config.  Setting compact mode by itself does not
 * modify how the view displays.  What it does do is apply the
 * {@link #cfg-compactOptions} config over the top over the current configuration
 * options.  These `compactOptions` are what is used to specify what compactness means
 * for a particular view.  Check out the `compactOptions` for each calendar view type to
 * see its default `compactOptions`.
 */

/**
 * @cfg {Object} addForm
 * The configuration for the {@link Ext.calendar.form.Add add form} to be used
 * when an event is to be created.  Use `null` to disable creation.
 * @accessor
 */

/**
 * @cfg {Boolean} [compact=false]
 * `true` to display this view in compact mode, typically used
 * for smaller form factors.  Setting to `true` applies any configured
 * {@link #cfg-compactOptions}.
 * @accessor
 */

/**
 * @cfg {Object} [compactOptions=null]
 * A series of config options for this class to set when this class is in
 * {@link #cfg-compact} mode.
 * @accessor
 */

/**
 * @cfg {Object} editForm
 * The configuration for the {@link Ext.calendar.form.Edit edit form} to be used
 * when an event is to be modified. Use `null` to disable editing.
 * @accessor
 */

/**
 * @cfg {Object} eventDefaults
 * The default configuration for {@link Ext.calendar.Event event} widgets
 * @accessor
 */

/**
 * @cfg {Boolean} [gestureNavigation=true]
 * Allow the view to have the value (displayed date range) changed via swipe
 * navigation on devices that support it
 * @accessor
 */

/**
 * @cfg {Object/Ext.calendar.store.Calendars} [store=null]
 * A {@link Ext.calendar.store.Calendars calendar store} instance or
 * configuration
 * @accessor
 */

/**
 * @cfg {Number} [timezoneOffset=undefined]
 * The timezone offset to display this calendar in. The value should be
 * specified in the same way as the native Date offset. That is, the number
 * of minutes between UTC and local time. For example the offset for UTC+10
 * would be -600 (10 hours * 60 minutes ahead).
 *
 * Defaults to the current browser offset.
 * @accessor
 */

/**
 *
 * @cfg {Date} [value=undefined]
 * The value for the current view.
 *
 *     value: new Date('10-02-2016') // to set the date to Oct 2nd 2016
 *
 * @accessor
 */

/**
 * @event beforeeventadd
 * Fired before an event {@link #addForm} is shown.
 * @param {Ext.calendar.view.Base} this This view.
 * @param {Object} context The context.
 * @param {Ext.calendar.model.EventBase} context.event The new event to be added.
 *
 * Return `false` to cancel the form being shown.
 */

/**
 * @event beforeeventedit
 * Fired before an event {@link #editForm} is shown.
 * @param {Ext.calendar.view.Base} this This view.
 * @param {Object} context The context.
 * @param {Ext.calendar.model.EventBase} context.event The event to be edited.
 *
 * Return `false` to cancel the form being shown.
 */

/**
 * @event eventadd
 * Fired when an event has been added via the {@link #addForm}.
 * @param {Ext.calendar.view.Base} this This view.
 * @param {Object} context The context.
 * @param {Ext.calendar.model.EventBase} context.event The newly added event with data.
 * @param {Object} context.data The data provided by the form.
 */

/**
 * @event eventedit
 * Fired when an event has been edited via the {@link #editForm}.
 * @param {Ext.calendar.view.Base} this This view.
 * @param {Object} context The context.
 * @param {Ext.calendar.model.EventBase} context.event The edited event with data.
 * @param {Object} context.data The data provided by the form.
 */

/**
 * @event eventdrop
 * Fired when an event has been deleted via the {@link #editForm}.
 * @param {Ext.calendar.view.Base} this This view.
 * @param {Object} context The context.
 * @param {Ext.calendar.model.EventBase} context.event The removed event.
 */

/**
 * @event eventtap
 * Fired when an event is tapped.
 * @param {Ext.calendar.view.Base} this This view.
 * @param {Object} context The context.
 * @param {Ext.calendar.model.EventBase} context.event The event model.
 */

/**
 * @event validateeventadd
 * Fired after the {@link #addForm} has been completed, but before the event
 * is added. Allows the add to be validated.
 * @param {Ext.calendar.view.Base} this This view.
 * @param {Object} context The context.
 * @param {Ext.calendar.model.EventBase} context.event The new event to be added, the
 * data is not yet set on the event.
 * @param {Object} context.data The data provided by the form. This will be used to set the
 * event data using {@link Ext.calendar.model.EventBase#setData}.
 * @param {Ext.Promise} context.validate A promise that allows validation to occur.
 * The default behavior is for no validation to take place. To achieve asynchronous
 * validation, the promise on the context object must be replaced:
 *
 *     {
 *         listeners: {
 *             validateeventadd: function(view, context) {
 *                 context.validate = context.then(function() {
 *                     return Ext.Ajax.request({
 *                         url: '/checkAdd'
 *                     }).then(function(response) {
 *                         return Promise.resolve(response.responseText === 'ok');
 *                     });
 *                 });
 *             }
 *         }
 *     }
 */

/**
 * @event validateeventedit
 * Fired after the {@link #editForm} has been completed, but before the event
 * is saved. Allows the edit to be validated.
 * @param {Ext.calendar.view.Base} this This view.
 * @param {Object} context The context.
 * @param {Ext.calendar.model.EventBase} context.event The event to be edited, the data
 * is not yet set on the event.
 * @param {Object} context.data The data provided by the form. This will be used to set the
 * event data using {@link Ext.calendar.model.EventBase#setData}.
 * @param {Ext.Promise} context.validate A promise that allows validation to occur.
 * The default behavior is for no validation to take place. To achieve asynchronous
 * validation, the promise on the context object must be replaced:
 *
 *     {
 *         listeners: {
 *             validateeventedit: function(view, context) {
 *                 context.validate = context.then(function() {
 *                     return Ext.Ajax.request({
 *                         url: '/checkEdit'
 *                     }).then(function(response) {
 *                         return Promise.resolve(response.responseText === 'ok');
 *                     });
 *                 });
 *             }
 *         }
 *     }
 */

/**
 * @event validateeventdrop
 * Fired when the delete button has been tapped on the {@link #editForm}, but before the event
 * is removed. Allows the removal to be validated.
 * @param {Ext.calendar.view.Base} this This view.
 * @param {Object} context The context.
 * @param {Ext.calendar.model.EventBase} context.event The event to be removed.
 * @param {Ext.Promise} context.validate A promise that allows validation to occur.
 * The default behavior is for no validation to take place. To achieve asynchronous
 * validation, the promise on the context object must be replaced:
 *
 *     {
 *         listeners: {
 *             validateeventdrop: function(view, context) {
 *                 context.validate = context.then(function() {
 *                     return new Promise(function(resolve, reject) {
 *                         Ext.Msg.confirm('Delete', 'Really delete this event?', function(btn) {
 *                             return Promise.resolve(btn === 'yes');
 *                         });
 *                     });
 *                 });
 *             }
 *         }
 *     }
 */

/**
 * @event valuechange
 * Fired when the {@link #cfg-value} changes.
 * @param {Ext.calendar.view.Base} this This view.
 * @param {Object} context The context.
 * @param {Date} context.value The new value.
 */

/**
 * @method getDisplayRange
 * Get the display range for this view.
 * @return {Ext.calendar.date.Range} The display range.
 */

/**
 * @method getForm
 * Get the active {@link #cfg-editForm} or {@link #cfg-addForm} if it exists.
 * @return {Ext.calendar.form.Base} The active form. `null` if not active.
 */

/**
 * @method getVisibleRange
 * Get the visible range for this view.
 * @return {Ext.calendar.date.Range} The visible range.
 */

/**
 * @method moveNext
 * Move the view forward to view the "next" portion of the view based
 * on the current {@link #cfg-value}.
 * This amount depends on the current view.
 */

/**
 * @method movePrevious
 * Move the view forward to view the "next" portion of the view based
 * on the current {@link #cfg-value}.
 * This amount depends on the current view.
 */

/**
 * @method navigate
 * Move the current view by an amount based off of the current {@link #cfg-value}.
 * @param {Number} amount The number of intervals to move
 * @param {String} [interval=Ext.Date.DAY] The interval to navigate by. See {@link Ext.Date}
 * for valid intervals.
 */

/**
 * @method showAddForm
 * Show the {@link #cfg-addForm} for this calendar. Has no behavior if
 * {@link #cfg-addForm} is `null`.
 * @param {Ext.calendar.model.EventBase} [event] A new event record containing
 * any data to be passed to the form. If not specified, default dates from
 * this view will be chosen.
 * @param {Object} [options] Callback options for form creation.
 * @param {Function} [options.onSave] A save callback function.
 * @param {Function} [options.onCancel] A cancel callback function.
 * @param {Object} [options.scope] A scope for the callback functions.
 */

/**
 * @method showEditForm
 * Show the {@link #cfg-editForm} for this calendar. Has no behavior if
 * {@link #cfg-editForm} is `null`.
 * @param {Ext.calendar.model.EventBase} event The event to be passed to the form.
 * @param {Object} [options] Callback options for form creation.
 * @param {Function} [options.onSave] A save callback function.
 * @param {Function} [options.onCancel] A cancel callback function.
 * @param {Object} [options.scope] A scope for the callback functions.
 */

/**
 * @method getEventSource
 * Get the {@link Ext.calendar.store.EventSource event source} for this view.
 * @return {Ext.calendar.store.EventSource} The event source.
 */
