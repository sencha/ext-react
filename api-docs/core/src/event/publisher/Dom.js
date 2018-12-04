/**
 * @class Ext.event.publisher.Dom
 * @extend Ext.event.publisher.Publisher
 * @private
 */

/**
 * @property {Array} [handledDomEvents=[]]
 * An array of DOM events that this publisher handles.  Events specified in this array
 * will be added as global listeners on the {@link #target}
 */

/**
 * @method reset
 * Resets the internal state of the Dom publisher.  Internally the Dom publisher
 * keeps track of timing and coordinates of events for eliminating browser duplicates
 * (e.g. emulated mousedown after pointerdown etc.).  This method resets all this
 * cached data to a state similar to when the publisher was first instantiated.
 *
 * Applications will not typically need to use this method, but it is useful for
 * Unit-testing situations where a clean slate is required for each test.
 */

/**
 * @method publishDelegateDomEvent
 * Hook for gesture publisher to override and perform gesture recognition
 * @param {Ext.event.Event} e
 */
