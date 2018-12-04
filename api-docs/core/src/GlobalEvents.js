/**
 * @class Ext.GlobalEvents
 * @extend Ext.mixin.Observable
 * @singleton
 * An `{@link Ext.mixin.Observable Observable}` through which Ext fires global events.
 * 
 * Ext.on() and Ext.un() are shorthand for {@link #addListener} and {@link #removeListener}
 * on this Observable.  For example, to listen for the idle event:
 * 
 *     Ext.on('idle', function() {
 *         // do something
 *     });
 */

/**
 * @event added
 * Fires when a Component is added to a Container.
 * @param {Ext.Component} component
 */

/**
 * @event beforeresponsiveupdate
 * Fires before {@link Ext.mixin.Responsive} perform any updates in response to
 * dynamic changes. This is prior to refreshing `responsiveFormulas`.
 * @param {Object} context The context object used by `responsiveConfig` expressions.
 * @since 5.0.1
 */

/**
 * @event beginresponsiveupdate
 * Fires when {@link Ext.mixin.Responsive} is about to perform updates in response to
 * dynamic changes. At this point all `responsiveFormulas` have been refreshed.
 * @param {Object} context The context object used by `responsiveConfig` expressions.
 * @since 5.0.1
 */

/**
 * @event responsiveupdate
 * Fires after {@link Ext.mixin.Responsive} has performed updates in response to
 * dynamic changes.
 * @param {Object} context The context object used by `responsiveConfig` expressions.
 * @since 5.0.1
 */

/**
 * @event collapse
 * Fires when a Component is collapsed (e.g., a panel).
 * @param {Ext.Component} component
 */

/**
 * @event expand
 * Fires when a Component is expanded (e.g., a panel).
 * @param {Ext.Component} component
 */

/**
 * @event hide
 * Fires when a Component is hidden.
 * @param {Ext.Component} component
 */

/**
 * @event idle
 * Fires when an event handler finishes its run, just before returning to
 * browser control.
 *
 * This includes DOM event handlers, Ajax (including JSONP) event handlers,
 * and {@link Ext.util.TaskRunner TaskRunners}
 *
 * When called at the tail of a DOM event, the event object is passed as the
 * sole parameter.
 *
 * This can be useful for performing cleanup, or update tasks which need to
 * happen only after all code in an event handler has been run, but which
 * should not be executed in a timer due to the intervening browser
 * reflow/repaint which would take place.
 */

/**
 * @event onlinechange
 * Fires when the online status of the page changes. See {@link Ext#method-isOnline}
 * @param {Boolean} online `true` if in an online state.
 *
 * @since 6.2.1
 */

/**
 * @event removed
 * Fires when a Component is removed from a Container.
 * @param {Ext.Component} component
 */

/**
 * @event resize
 * Fires when the browser window is resized.  To avoid running resize handlers
 * too often resulting in sluggish window resizing, the resize event uses a buffer
 * of 100 milliseconds in the Classic toolkit, and fires on animation frame
 * in the Modern toolkit.
 * @param {Number} width The new width
 * @param {Number} height The new height
 */

/**
 * @event show
 * Fires when a Component is shown.
 * @param {Ext.Component} component
 */

/**
 * @event mousedown
 * A mousedown listener on the document that is immune to stopPropagation()
 * used in cases where we need to know if a mousedown event occurred on the
 * document regardless of whether some other handler tried to stop it.  An
 * example where this is useful is a menu that needs to be hidden whenever
 * there is a mousedown event on the document.
 * @param {Ext.event.Event} e The event object
 */

/**
 * @event mouseup
 * A mouseup listener on the document that is immune to stopPropagation()
 * used in cases where we need to know if a mouseup event occurred on the
 * document regardless of whether some other handler tried to stop it.  An
 * example where this is useful is a component which enters a "pressed" state
 * upon mousedown, and needs to exit that state even if the mouse exits
 * before being released.
 * @param {Ext.event.Event} e The event object
 */

/**
 * @member Ext
 * @method on
 * Shorthand for {@link Ext.GlobalEvents#addListener}.
 * @inheritdoc Ext.mixin.Observable#addListener
 */

/**
 * @member Ext
 * @method un
 * Shorthand for {@link Ext.GlobalEvents#removeListener}.
 * @inheritdoc Ext.mixin.Observable#removeListener
 */

/**
 * @member Ext
 * @method fireEvent
 * Shorthand for {@link Ext.GlobalEvents#fireEvent}.
 * @inheritdoc Ext.mixin.Observable#fireEvent
 *
 * @since 6.2.0
 */
