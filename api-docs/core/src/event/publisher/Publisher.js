/**
 * @class Ext.event.publisher.Publisher
 * @extend Ext.Base
 * Abstract base class for event publishers
 * @private
 */

/**
 * @property {Object} publishers
 * A map of all publisher singleton instances.  Publishers register themselves
 * in this map as soon as they are constructed.
 * @static
 */

/**
 * @property {Object} publishersByEvent
 * A map of handled event names to the publisher that handles each event.
 * Provides a convenient way for looking up the publisher that handles any given
 * event, for example:
 *
 *     // get the publisher that  handles click:
 *     var publisher = Ext.event.publisher.Publisher.publishersByEvent.click;
 *
 * @static
 */

/**
 * @property {Array} handledEvents
 * An array of events that this publisher handles.
 */
