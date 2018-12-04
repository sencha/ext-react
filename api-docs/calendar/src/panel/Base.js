/**
 * @class Ext.calendar.panel.Base
 * @extend Ext.calendar.panel.AbstractBase
 * @abstract
 * A base class that composes a calendar view and a
 * {@link Ext.calendar.header.Base header}.  Calendar views display events for a date /
 * time range specified by the view subclasses:
 *
 * - {@link Ext.calendar.panel.Day Day}
 * - {@link Ext.calendar.panel.Days Days}
 * - {@link Ext.calendar.panel.Week Week}
 * - {@link Ext.calendar.panel.Weeks Weeks}
 * - {@link Ext.calendar.panel.Month Month}
 * - {@link Ext.calendar.panel.Multi Multi}
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
 *     <Calendar
 *         renderTo={Ext.getBody()}
 *         height={400}
 *         width={600}
 *         store={this.store}
 *     />
 *
 * Configurations for the view can be specified directly on the panel:
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
 *         views={{
 *             week: {
 *                 visibleDays: 5,
 *                 firstDayOfWeek: 1
 *             }
 *         }}
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
 * @cfg [addForm=true]
 * @inheritdoc Ext.calendar.view.Base#cfg-addForm
 * @accessor
 */
/**
 * @cfg [compact=true]
 * @inheritdoc Ext.calendar.view.Base#cfg-compact
 * @accessor
 */
/**
 * @cfg [compactOptions=true]
 * @inheritdoc Ext.calendar.view.Base#cfg-compactOptions
 * @accessor
 */
/**
 * @cfg [controlStoreRange=true]
 * @inheritdoc Ext.calendar.view.Base#cfg-controlStoreRange
 * @accessor
 */
/**
 * @cfg [editForm=true]
 * @inheritdoc Ext.calendar.view.Base#cfg-editForm
 * @accessor
 */
/**
 * @cfg [eventDefaults=true]
 * @inheritdoc Ext.calendar.view.Base#cfg-eventDefaults
 * @accessor
 */
/**
 * @cfg [gestureNavigation=true]
 * @inheritdoc Ext.calendar.view.Base#cfg-gestureNavigation
 * @accessor
 */
/**
 * @cfg [store=true]
 * @inheritdoc Ext.calendar.view.Base#cfg-store
 * @accessor
 */
/**
 * @cfg [timezoneOffset=true]
 * @inheritdoc Ext.calendar.view.Base#cfg-timezoneOffset
 * @accessor
 */
/**
 * @cfg [value=true]
 * @inheritdoc Ext.calendar.view.Base#cfg-value
 * @accessor
 */

/**
 * @event beforeeventadd
 * @inheritdoc Ext.calendar.view.Base#beforeeventadd
 */

/**
 * @event beforeeventedit
 * @inheritdoc Ext.calendar.view.Base#beforeeventadd
 */

/**
 * @event eventadd
 * @inheritdoc Ext.calendar.view.Base#eventadd
 */

/**
 * @event eventedit
 * @inheritdoc Ext.calendar.view.Base#eventedit
 */

/**
 * @event eventdrop
 * @inheritdoc Ext.calendar.view.Base#eventdrop
 */

/**
 * @event eventtap
 * @inheritdoc Ext.calendar.view.Base#eventtap
 */

/**
 * @event validateeventadd
 * @inheritdoc Ext.calendar.view.Base#validateeventadd
 */

/**
 * @event validateeventedit
 * @inheritdoc Ext.calendar.view.Base#validateeventedit
 */

/**
 * @event validateeventdrop
 * @inheritdoc Ext.calendar.view.Base#validateeventdrop
 */

/**
 * @event valuechange
 * @inheritdoc Ext.calendar.view.Base#valuechange
 */

/**
 * @cfg {Object} [dayHeader=null]
 * A config for the {@link Ext.calendar.header.Base day header}. This can be
 * configured directly on the panel.  The relevant configurations will be
 * forwarded to the header.
 * @accessor
 */

/**
 * @cfg {Object} [view=null]
 * A config for the main calendar view. This can be configured directly on the panel,
 * the relevant configurations will be forwarded to the view.
 */

/**
 * @method getDisplayRange
 * @inheritdoc Ext.calendar.view.Base#method-getDisplayRange
 */

/**
 * @method getVisibleRange
 * @inheritdoc Ext.calendar.view.Base#method-getVisibleRange
 */

/**
 * @method moveNext
 * @inheritdoc Ext.calendar.view.Base#method-moveNext
 */

/**
 * @method movePrevious
 * @inheritdoc Ext.calendar.view.Base#method-movePrevious
 */

/**
 * @method navigate
 * @inheritdoc Ext.calendar.view.Base#method-navigate
 */

/**
 * @method showAddForm
 * @inheritdoc Ext.calendar.view.Base#method-showAddForm
 */

/**
 * @method showEditForm
 * @inheritdoc Ext.calendar.view.Base#method-showEditForm
 */
