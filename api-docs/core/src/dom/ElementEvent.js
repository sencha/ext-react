/**
 * @class Ext.dom.ElementEvent
 * @extend Ext.util.Event
 * A special Ext.util.Event subclass that adds support for capture (top-down propagation)
 * listeners, and non-delegated (directly attached to the dom) listeners.
 *
 * An Ext.Element will have one instance of this class per event type that is being listened
 * for.  The ElementEvent instance provides a single point for attaching event listeners
 * and abstracts away important details on the timing and ordering of event firing.
 * Internally this class manages up to 3 separate Ext.util.Event instances.  These represent
 * separate stacks of listeners that may be invoked during different phases of event propagation.
 *
 * - `captures` - tracks listeners that should fire during the "capture" phase of the
 * standard delegated model (listeners attached using capture:true)
 * - `direct` - tracks directly attached listeners, that is listeners that should fire
 * immediately when the event is dispatched to the dom element, before the event bubbles
 * upward and delegated listener processing begins
 * (listeners attached using delegated:false)
 * - `directCaptures` - tracks directly attached capture listeners (only works in IE10+)
 *
 * For more detail on the timing of when these event stacks are dispatched please see
 * Ext.event.publisher.Dom
 *
 * @private
 */
