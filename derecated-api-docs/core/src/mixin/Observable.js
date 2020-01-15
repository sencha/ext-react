/**
 * @class Ext.mixin.Observable
 * @extend Ext.Mixin
 *
 * Base class that provides a common interface for publishing events. Subclasses are
 * expected to have a property "events" which is populated as event listeners register,
 * and, optionally, a property "listeners" with configured listeners defined.
 *
 * *Note*: This mixin requires the constructor to be called, which is typically done
 * during the construction of your object. The Observable constructor will call 
 * {@link #initConfig}, so it does not need to be called a second time.
 *
 * For example:
 *
 *     Ext.define('Employee', {
 *         mixins: ['Ext.mixin.Observable'],
 *
 *         config: {
 *             name: ''
 *         },
 *
 *         constructor: function (config) {
 *             // The `listeners` property is processed to add listeners and the config
 *             // is applied to the object.
 *             this.mixins.observable.constructor.call(this, config);
 *             // Config has been initialized
 *             console.log(this.getName());
 *         }
 *     });
 *
 * This could then be used like this:
 *
 *     var newEmployee = new Employee({
 *         name: employeeName,
 *         listeners: {
 *             quit: function() {
 *                 // By default, "this" will be the object that fired the event.
 *                 alert(this.getName() + " has quit!");
 *             }
 *         }
 *     });
 */

/**
 * @method releaseCapture
 * Removes **all** added captures from the Observable.
 *
 * @param {Ext.util.Observable} o The Observable to release
 * @static
 */

/**
 * @method capture
 * Starts capture on the specified Observable. All events will be passed to the supplied function with the event
 * name + standard signature of the event **before** the event is fired. If the supplied function returns false,
 * the event will not fire.
 *
 * @param {Ext.util.Observable} o The Observable to capture events from.
 * @param {Function} fn The function to call when an event is fired.
 * @param {Object} scope (optional) The scope (`this` reference) in which the function is executed. Defaults to
 * the Observable firing the event.
 * @static
 */

/**
 * @method observe
 * Sets observability on the passed class constructor.
 *
 * This makes any event fired on any instance of the passed class also fire a single event through
 * the **class** allowing for central handling of events on many instances at once.
 *
 * Usage:
 *
 *     Ext.util.Observable.observe(Ext.data.Connection);
 *     Ext.data.Connection.on('beforerequest', function(con, options) {
 *         console.log('Ajax request made to ' + options.url);
 *     });
 *
 * @param {Function} c The class constructor to make observable.
 * @param {Object} listeners An object containing a series of listeners to
 * add. See {@link Ext.util.Observable#addListener addListener}.
 * @static
 */

/**
 * @cfg {Object} listeners
 *
 * A config object containing one or more event handlers to be added to this object during initialization. This
 * should be a valid listeners config object as specified in the
 * {@link Ext.util.Observable#addListener addListener} example for attaching
 * multiple handlers at once.
 *
 * **DOM events from Ext JS {@link Ext.Component Components}**
 *
 * While _some_ Ext JS Component classes export selected DOM events (e.g. "click", "mouseover" etc), this is usually
 * only done when extra value can be added. For example the {@link Ext.view.View DataView}'s **`{@link
 * Ext.view.View#itemclick itemclick}`** event passing the node clicked on. To access DOM events directly from a
 * child element of a Component, we need to specify the `element` option to identify the Component property to add a
 * DOM listener to:
 *
 *     new Ext.panel.Panel({
 *         width: 400,
 *         height: 200,
 *         dockedItems: [{
 *             xtype: 'toolbar'
 *         }],
 *         listeners: {
 *             click: {
 *                 element: 'el', //bind to the underlying el property on the panel
 *                 fn: function(){ console.log('click el'); }
 *             },
 *             dblclick: {
 *                 element: 'body', //bind to the underlying body property on the panel
 *                 fn: function(){ console.log('dblclick body'); }
 *             }
 *         }
 *     });
 */

/**
 * @property {Boolean} [isObservable=true]
 * `true` in this class to identify an object as an instantiated Observable, or subclass thereof.
 */

/**
 * @method addManagedListener
 * The addManagedListener method is used when some object (call it "A") is listening
 * to an event on another observable object ("B") and you want to remove that listener
 * from "B" when "A" is destroyed. This is not an issue when "B" is destroyed because
 * all of its listeners will be removed at that time.
 *
 * Example:
 *
 *     Ext.define('Foo', {
 *         extend: 'Ext.Component',
 *
 *         initComponent: function () {
 *             this.addManagedListener(MyApp.SomeGlobalSharedMenu, 'show', this.doSomething);
 *             this.callParent();
 *         }
 *     });
 *
 * As you can see, when an instance of Foo is destroyed, it ensures that the 'show'
 * listener on the menu (`MyApp.SomeGlobalSharedMenu`) is also removed.
 *
 * As of version 5.1 it is no longer necessary to use this method in most cases because
 * listeners are automatically managed if the scope object provided to
 * {@link Ext.util.Observable#addListener addListener} is an Observable instance.
 * However, if the observable instance and scope are not the same object you
 * still need to use `mon` or `addManagedListener` if you want the listener to be
 * managed.
 *
 * @param {Ext.util.Observable/Ext.dom.Element} item The item to which to add a listener/listeners.
 * @param {Object/String} ename The event name, or an object containing event name properties.
 * @param {Function/String} fn (optional) If the `ename` parameter was an event
 * name, this is the handler function or the name of a method on the specified
 * `scope`.
 * @param {Object} scope (optional) If the `ename` parameter was an event name, this is the scope (`this` reference)
 * in which the handler function is executed.
 * @param {Object} options (optional) If the `ename` parameter was an event name, this is the
 * {@link Ext.util.Observable#addListener addListener} options.
 * @return {Object} **Only when the `destroyable` option is specified. **
 *
 *  A `Destroyable` object. An object which implements the `destroy` method which removes all listeners added in this call. For example:
 *
 *     this.btnListeners = myButton.mon({
 *         destroyable: true
 *          mouseover:   function() { console.log('mouseover'); },
 *         mouseout:    function() { console.log('mouseout'); },
 *         click:       function() { console.log('click'); }
 *     });
 *
 * And when those listeners need to be removed:
 *
 *     Ext.destroy(this.btnListeners);
 *
 * or
 *
 *     this.btnListeners.destroy();
 */

/**
 * @method removeManagedListener
 * Removes listeners that were added by the {@link #mon} method.
 *
 * @param {Ext.util.Observable/Ext.dom.Element} item The item from which to remove a listener/listeners.
 * @param {Object/String} ename The event name, or an object containing event name properties.
 * @param {Function} fn (optional) If the `ename` parameter was an event name, this is the handler function.
 * @param {Object} scope (optional) If the `ename` parameter was an event name, this is the scope (`this` reference)
 * in which the handler function is executed.
 */

/**
 * @method fireEvent
 * Fires the specified event with the passed parameters (minus the event name, plus the `options` object passed
 * to {@link Ext.util.Observable#addListener addListener}).
 *
 * An event may be set to bubble up an Observable parent hierarchy (See {@link Ext.Component#getBubbleTarget}) by
 * calling {@link #enableBubble}.
 *
 * @param {String} eventName The name of the event to fire.
 * @param {Object...} args Variable number of parameters are passed to handlers.
 * @return {Boolean} returns false if any of the handlers return false otherwise it returns true.
 */

/**
 * @method fireEventArgs
 * Fires the specified event with the passed parameter list.
 *
 * An event may be set to bubble up an Observable parent hierarchy (See {@link Ext.Component#getBubbleTarget}) by
 * calling {@link #enableBubble}.
 *
 * @param {String} eventName The name of the event to fire.
 * @param {Object[]} args An array of parameters which are passed to handlers.
 * @return {Boolean} returns false if any of the handlers return false otherwise it returns true.
 */

/**
 * @method fireEventedAction
 * Fires the specified event with the passed parameters and executes a function (action).
 * Evented Actions will automatically dispatch a 'before' event passing. This event will
 * be given a special controller that allows for pausing/resuming of the event flow.
 *
 * By pausing the controller the updater and events will not run until resumed. Pausing,
 * however, will not stop the processing of any other before events.
 *
 * @param {String} eventName The name of the event to fire.
 * @param {Array} args Arguments to pass to handlers and to the action function.
 * @param {Function/String} fn The action function.
 * @param {Object} [scope] The scope (`this` reference) in which the handler function is
 * executed. **If omitted, defaults to the object which fired the event.**
 * @param {Array/Boolean} [fnArgs] Optional arguments for the action `fn`. If not
 * given, the normal `args` will be used to call `fn`. If `false` is passed, the
 * `args` are used but if the first argument is this instance it will be removed
 * from the args passed to the action function.
 */

/**
 * @method addListener
 * The {@link #on} method is shorthand for
 * {@link Ext.util.Observable#addListener addListener}.
 *
 * Appends an event handler to this object.  For example:
 *
 *     myGridPanel.on("itemclick", this.onItemClick, this);
 *
 * The method also allows for a single argument to be passed which is a config object
 * containing properties which specify multiple events. For example:
 *
 *     myGridPanel.on({
 *         cellclick: this.onCellClick,
 *         select: this.onSelect,
 *         viewready: this.onViewReady,
 *         scope: this // Important. Ensure "this" is correct during handler execution
 *     });
 *
 * One can also specify options for each event handler separately:
 *
 *     myGridPanel.on({
 *         cellclick: {fn: this.onCellClick, scope: this, single: true},
 *         viewready: {fn: panel.onViewReady, scope: panel}
 *     });
 *
 * *Names* of methods in a specified scope may also be used:
 *
 *     myGridPanel.on({
 *         cellclick: {fn: 'onCellClick', scope: this, single: true},
 *         viewready: {fn: 'onViewReady', scope: panel}
 *     });
 *
 * @param {String/Object} eventName The name of the event to listen for.
 * May also be an object who's property names are event names.
 *
 * @param {Function/String} [fn] The method the event invokes or the *name* of
 * the method within the specified `scope`.  Will be called with arguments
 * given to {@link Ext.util.Observable#fireEvent} plus the `options` parameter described
 * below.
 *
 * @param {Object} [scope] The scope (`this` reference) in which the handler function is
 * executed. **If omitted, defaults to the object which fired the event.**
 *
 * @param {Object} [options] An object containing handler configuration.
 *
 * **Note:** The options object will also be passed as the last argument to every
 * event handler.
 *
 * This object may contain any of the following properties:
 *
 * @param {Object} options.scope
 *   The scope (`this` reference) in which the handler function is executed. **If omitted,
 *   defaults to the object which fired the event.**
 *
 * @param {Number} options.delay
 *   The number of milliseconds to delay the invocation of the handler after the event
 *   fires.
 *
 * @param {Boolean} options.single
 *   True to add a handler to handle just the next firing of the event, and then remove
 *   itself.
 *
 * @param {Number} options.buffer
 *   Causes the handler to be scheduled to run in an {@link Ext.util.DelayedTask} delayed
 *   by the specified number of milliseconds. If the event fires again within that time,
 *   the original handler is _not_ invoked, but the new handler is scheduled in its place.
 *
 * @param {Number} options.onFrame
 *   Causes the handler to be scheduled to run at the next
 *   {@link Ext.Function#requestAnimationFrame animation frame event}. If the
 *   event fires again before that time, the handler is not rescheduled - the handler
 *   will only be called once when the next animation frame is fired, with the last set
 *   of arguments passed.
 *
 * @param {Ext.util.Observable} options.target
 *   Only call the handler if the event was fired on the target Observable, _not_ if the
 *   event was bubbled up from a child Observable.
 *
 * @param {String} options.element
 *   **This option is only valid for listeners bound to {@link Ext.Component Components}.**
 *   The name of a Component property which references an {@link Ext.dom.Element element}
 *   to add a listener to.
 *
 *   This option is useful during Component construction to add DOM event listeners to
 *   elements of {@link Ext.Component Components} which will exist only after the
 *   Component is rendered.
 *
 *   For example, to add a click listener to a Panel's body:
 *
 *       var panel = new Ext.panel.Panel({
 *           title: 'The title',
 *           listeners: {
 *               click: this.handlePanelClick,
 *               element: 'body'
 *           }
 *       });
 *
 * In order to remove listeners attached using the element, you'll need to reference
 * the element itself as seen below.
 *
 *      panel.body.un(...)
 *
 * @param {String} [options.delegate]
 *   A simple selector to filter the event target or look for a descendant of the target.
 *
 *   The "delegate" option is only available on Ext.dom.Element instances (or
 *   when attaching a listener to a Ext.dom.Element via a Component using the
 *   element option).
 *
 *   See the *delegate* example below.
 *
 * @param {Boolean} [options.capture]
 *  When set to `true`, the listener is fired in the capture phase of the event propagation
 *  sequence, instead of the default bubble phase.
 *
 *   The `capture` option is only available on Ext.dom.Element instances (or
 *   when attaching a listener to a Ext.dom.Element via a Component using the
 *   element option).
 *
 * @param {Boolean} [options.stopPropagation]
 *   **This option is only valid for listeners bound to {@link Ext.dom.Element Elements}.**
 *   `true` to call {@link Ext.event.Event#stopPropagation stopPropagation} on the event object
 *   before firing the handler.
 *
 * @param {Boolean} [options.preventDefault]
 *   **This option is only valid for listeners bound to {@link Ext.dom.Element Elements}.**
 *   `true` to call {@link Ext.event.Event#preventDefault preventDefault} on the event object
 *   before firing the handler.
 *
 * @param {Boolean} [options.stopEvent]
 *   **This option is only valid for listeners bound to {@link Ext.dom.Element Elements}.**
 *   `true` to call {@link Ext.event.Event#stopEvent stopEvent} on the event object
 *   before firing the handler.
 *
 * @param {Array} [options.args]
 *   Optional arguments to pass to the handler function. Any additional arguments
 *   passed to {@link Ext.util.Observable#fireEvent fireEvent} will be appended
 *   to these arguments.
 *
 * @param {Boolean} [options.destroyable=false]
 *   When specified as `true`, the function returns a `destroyable` object. An object
 *   which implements the `destroy` method which removes all listeners added in this call.
 *   This syntax can be a helpful shortcut to using {@link #un}; particularly when
 *   removing multiple listeners.  *NOTE* - not compatible when using the _element_
 *   option.  See {@link #un} for the proper syntax for removing listeners added using the
 *   _element_ config.
 *
 * @param {Number} [options.priority]
 *   An optional numeric priority that determines the order in which event handlers
 *   are run. Event handlers with no priority will be run as if they had a priority
 *   of 0. Handlers with a higher priority will be prioritized to run sooner than
 *   those with a lower priority.  Negative numbers can be used to set a priority
 *   lower than the default. Internally, the framework uses a range of 1000 or
 *   greater, and -1000 or lesser for handlers that are intended to run before or
 *   after all others, so it is recommended to stay within the range of -999 to 999
 *   when setting the priority of event handlers in application-level code.
 *   A priority must be an integer to be valid.  Fractional values are reserved for
 *   internal framework use.
 *
 * @param {String} [options.order='current']
 *   A legacy option that is provided for backward compatibility.
 *   It is recommended to use the `priority` option instead.  Available options are:
 *
 *   - `'before'`: equal to a priority of `100`
 *   - `'current'`: equal to a priority of `0` or default priority
 *   - `'after'`: equal to a priority of `-100`
 *
 * @param {String} [order='current']
 *   A shortcut for the `order` event option.  Provided for backward compatibility.
 *   Please use the `priority` event option instead.
 *
 * **Combining Options**
 *
 * Using the options argument, it is possible to combine different types of listeners:
 *
 * A delayed, one-time listener.
 *
 *     myPanel.on('hide', this.handleClick, this, {
 *         single: true,
 *         delay: 100
 *     });
 *
 * **Attaching multiple handlers in 1 call**
 *
 * The method also allows for a single argument to be passed which is a config object
 * containing properties which specify multiple handlers and handler configs.
 *
 *     grid.on({
 *         itemclick: 'onItemClick',
 *         itemcontextmenu: grid.onItemContextmenu,
 *         destroy: {
 *             fn: function () {
 *                 // function called within the 'altCmp' scope instead of grid
 *             },
 *             scope: altCmp // unique scope for the destroy handler
 *         },
 *         scope: grid       // default scope - provided for example clarity
 *     });
 *
 * **Delegate**
 *
 * This is a configuration option that you can pass along when registering a handler for
 * an event to assist with event delegation. By setting this configuration option
 * to a simple selector, the target element will be filtered to look for a
 * descendant of the target. For example:
 *
 *     var panel = Ext.create({
 *         xtype: 'panel',
 *         renderTo: document.body,
 *         title: 'Delegate Handler Example',
 *         frame: true,
 *         height: 220,
 *         width: 220,
 *         html: '<h1 class="myTitle">BODY TITLE</h1>Body content'
 *     });
 *
 *     // The click handler will only be called when the click occurs on the
 *     // delegate: h1.myTitle ("h1" tag with class "myTitle")
 *     panel.on({
 *         click: function (e) {
 *             console.log(e.getTarget().innerHTML);
 *         },
 *         element: 'body',
 *         delegate: 'h1.myTitle'
 *      });
 *
 * @return {Object} **Only when the `destroyable` option is specified. **
 *
 *  A `Destroyable` object. An object which implements the `destroy` method which removes
 *  all listeners added in this call. For example:
 *
 *     this.btnListeners =  = myButton.on({
 *         destroyable: true
 *         mouseover:   function() { console.log('mouseover'); },
 *         mouseout:    function() { console.log('mouseout'); },
 *         click:       function() { console.log('click'); }
 *     });
 *
 * And when those listeners need to be removed:
 *
 *     Ext.destroy(this.btnListeners);
 *
 * or
 *
 *     this.btnListeners.destroy();
 */

/**
 * @method removeListener
 * Removes an event handler.
 *
 * @param {String} eventName The type of event the handler was associated with.
 * @param {Function} fn The handler to remove. **This must be a reference to the function
 * passed into the
 * {@link Ext.util.Observable#addListener addListener} call.**
 * @param {Object} scope (optional) The scope originally specified for the handler. It
 * must be the same as the scope argument specified in the original call to
 * {@link Ext.util.Observable#addListener} or the listener will not be removed.
 *
 * **Convenience Syntax**
 *
 * You can use the {@link Ext.util.Observable#addListener addListener}
 * `destroyable: true` config option in place of calling un().  For example:
 *
 *     var listeners = cmp.on({
 *         scope: cmp,
 *         afterrender: cmp.onAfterrender,
 *         beforehide: cmp.onBeforeHide,
 *         destroyable: true
 *     });
 *
 *     // Remove listeners
 *     listeners.destroy();
 *     // or
 *     cmp.un(
 *         scope: cmp,
 *         afterrender: cmp.onAfterrender,
 *         beforehide: cmp.onBeforeHide
 *     );
 *
 * **Exception - DOM event handlers using the element config option**
 *
 * You must go directly through the element to detach an event handler attached using
 * the {@link Ext.util.Observable#addListener addListener} _element_ option.
 *
 *     panel.on({
 *         element: 'body',
 *         click: 'onBodyCLick'
 *     });
 *
 *     panel.body.un({
 *         click: 'onBodyCLick'
 *     });
 */

/**
 * @method onBefore
 * Appends a before-event handler.  Returning `false` from the handler will stop the event.
 *
 * Same as {@link Ext.util.Observable#addListener addListener} with `order` set
 * to `'before'`.
 *
 * @param {String/String[]/Object} eventName The name of the event to listen for.
 * @param {Function/String} fn The method the event invokes.
 * @param {Object} [scope] The scope for `fn`.
 * @param {Object} [options] An object containing handler configuration.
 */

/**
 * @method onAfter
 * Appends an after-event handler.
 *
 * Same as {@link Ext.util.Observable#addListener addListener} with `order` set
 * to `'after'`.
 *
 * @param {String/String[]/Object} eventName The name of the event to listen for.
 * @param {Function/String} fn The method the event invokes.
 * @param {Object} [scope] The scope for `fn`.
 * @param {Object} [options] An object containing handler configuration.
 */

/**
 * @method unBefore
 * Removes a before-event handler.
 *
 * Same as {@link #removeListener} with `order` set to `'before'`.
 *
 * @param {String/String[]/Object} eventName The name of the event the handler was associated with.
 * @param {Function/String} fn The handler to remove.
 * @param {Object} [scope] The scope originally specified for `fn`.
 * @param {Object} [options] Extra options object.
 */

/**
 * @method unAfter
 * Removes a before-event handler.
 *
 * Same as {@link #removeListener} with `order` set to `'after'`.
 *
 * @param {String/String[]/Object} eventName The name of the event the handler was associated with.
 * @param {Function/String} fn The handler to remove.
 * @param {Object} [scope] The scope originally specified for `fn`.
 * @param {Object} [options] Extra options object.
 */

/**
 * @method addBeforeListener
 * Alias for {@link #onBefore}.
 */

/**
 * @method addAfterListener
 * Alias for {@link #onAfter}.
 */

/**
 * @method removeBeforeListener
 * Alias for {@link #unBefore}.
 */

/**
 * @method removeAfterListener
 * Alias for {@link #unAfter}.
 */

/**
 * @method clearListeners
 * Removes all listeners for this object including the managed listeners
 */

/**
 * @method clearManagedListeners
 * Removes all managed listeners for this object.
 */

/**
 * @method hasListener
 * Checks to see if this object has any listeners for a specified event, or whether the event bubbles. The answer
 * indicates whether the event needs firing or not.
 *
 * @param {String} eventName The name of the event to check for
 * @return {Boolean} `true` if the event is being listened for or bubbles, else `false`
 */
        
/**
 * @method isSuspended
 * Checks if all events, or a specific event, is suspended.
 * @param {String} [event] The name of the specific event to check
 * @return {Boolean} `true` if events are suspended
 */

/**
 * @method suspendEvents
 * Suspends the firing of all events. (see {@link #resumeEvents})
 *
 * @param {Boolean} queueSuspended `true` to queue up suspended events to be fired
 * after the {@link #resumeEvents} call instead of discarding all suspended events.
 */

/**
 * @method suspendEvent
 * Suspends firing of the named event(s).
 *
 * After calling this method to suspend events, the events will no longer fire when requested to fire.
 *
 * **Note that if this is called multiple times for a certain event, the converse method
 * {@link #resumeEvent} will have to be called the same number of times for it to resume firing.**
 *
 * @param  {String...} eventName Multiple event names to suspend.
 */

/**
 * @method resumeEvent
 * Resumes firing of the named event(s).
 *
 * After calling this method to resume events, the events will fire when requested to fire.
 *
 * **Note that if the {@link #suspendEvent} method is called multiple times for a certain event,
 * this converse method will have to be called the same number of times for it to resume firing.**
 *
 * @param  {String...} eventName Multiple event names to resume.
 */

/**
 * @method resumeEvents
 * Resumes firing events (see {@link #suspendEvents}).
 *
 * If events were suspended using the `queueSuspended` parameter, then all events fired
 * during event suspension will be sent to any listeners now.
 *
 * @param {Boolean} [discardQueue] `true` to prevent any previously queued events from firing
 * while we were suspended. See {@link #suspendEvents}.
 */

/**
 * @method relayEvents
 * Relays selected events from the specified Observable as if the events were fired by `this`.
 *
 * For example if you are extending Grid, you might decide to forward some events from store.
 * So you can do this inside your initComponent:
 *
 *     this.relayEvents(this.getStore(), ['load']);
 *
 * The grid instance will then have an observable 'load' event which will be passed
 * the parameters of the store's load event and any function fired with the grid's
 * load event would have access to the grid using the this keyword (unless the event
 * is handled by a controller's control/listen event listener in which case 'this'
 * will be the controller rather than the grid).
 *
 * @param {Object} origin The Observable whose events this object is to relay.
 * @param {String[]/Object} events Array of event names to relay or an Object with key/value
 * pairs translating to ActualEventName/NewEventName respectively. For example:
 *     this.relayEvents(this, {add:'push', remove:'pop'});
 *
 * Would now redispatch the add event of this as a push event and the remove event as a pop event.
 *
 * @param {String} [prefix] A common prefix to prepend to the event names. For example:
 *
 *     this.relayEvents(this.getStore(), ['load', 'clear'], 'store');
 *
 * Now the grid will forward 'load' and 'clear' events of store as 'storeload' and 'storeclear'.
 *
 * @return {Object} A `Destroyable` object. An object which implements the `destroy` method which, when destroyed, removes all relayers. For example:
 *
 *     this.storeRelayers = this.relayEvents(this.getStore(), ['load', 'clear'], 'store');
 *
 * Can be undone by calling
 *
 *     Ext.destroy(this.storeRelayers);
 *
 * or
 *     this.store.relayers.destroy();
 */

/**
 * @method enableBubble
 * Enables events fired by this Observable to bubble up an owner hierarchy by calling `this.getBubbleTarget()` if
 * present. There is no implementation in the Observable base class.
 *
 * This is commonly used by Ext.Components to bubble events to owner Containers.
 * See {@link Ext.Component#getBubbleTarget}. The default implementation in Ext.Component returns the
 * Component's immediate owner. But if a known target is required, this can be overridden to access the
 * required target more quickly.
 *
 * Example:
 *
 *     Ext.define('Ext.overrides.form.field.Base', {
 *         override: 'Ext.form.field.Base',
 *
 *         //  Add functionality to Field's initComponent to enable the change event to bubble
 *         initComponent: function () {
 *             this.callParent();
 *             this.enableBubble('change');
 *         }
 *     });
 *
 *     var myForm = Ext.create('Ext.form.Panel', {
 *         title: 'User Details',
 *         items: [{
 *             ...
 *         }],
 *         listeners: {
 *             change: function() {
 *                 // Title goes red if form has been modified.
 *                 myForm.header.setStyle('color', 'red');
 *             }
 *         }
 *     });
 *
 * @param {String/String[]} eventNames The event name to bubble, or an Array of event names.
 */

/**
 * @method on
 * @inheritdoc Ext.util.Observable#addListener
 */

/**
 * @method un
 * Shorthand for {@link #removeListener}.
 * @inheritdoc Ext.util.Observable#removeListener
 */

/**
 * @method mon
 * Shorthand for {@link #addManagedListener}.
 * @inheritdoc Ext.util.Observable#addManagedListener
 */

/**
 * @method mun
 * Shorthand for {@link #removeManagedListener}.
 * @inheritdoc Ext.util.Observable#removeManagedListener
 */

/**
 * @method setListeners
 * An alias for {@link Ext.util.Observable#addListener addListener}.  In
 * versions prior to 5.1, {@link #listeners} had a generated setter which could
 * be called to add listeners.  In 5.1 the listeners config is not processed
 * using the config system and has no generated setter, so this method is
 * provided for backward compatibility.  The preferred way of adding listeners
 * is to use the {@link #on} method.
 * @param {Object} listeners The listeners
 */
