/**
 * @class Ext.dom.GarbageCollector
 * @singleton
 * Garbage collector for Ext.dom.Element instances.  Automatically cleans up Elements
 * that are no longer in the dom, but were not properly destroyed using
 * {@link Ext.dom.Element#destroy destroy()}.  Recommended practice is for Components to
 * clean up their own elements, but the GarbageCollector runs on regularly scheduled
 * intervals to attempt to clean up orphaned Elements that may have slipped through the cracks.
 * @private
 */

/**
 * @property {Number} [interval=30000]
 * The interval at which to run Element garbage collection. Set this property directly
 * to tune the interval.
 *
 *     Ext.dom.GarbageCollector.interval = 60000; // run garbage collection every one minute
 */

/**
 * @method collect
 * Collects orphaned Ext.dom.Elements by removing their listeners and evicting them
 * from the cache.  Runs on a regularly scheduled {@link #interval} but can be called
 * directly to force garbage collection.
 * @return {String[]} An array containing the IDs of the elements that were garbage
 * collected, prefixed by their tag names.  Only applies in dev mode.  Returns nothing
 * in a production build.
 */

/**
 * @method pause
 * Pauses the timer and stops garbage collection
 */

/**
 * @method resume
 * Resumes garbage collection at the specified {@link #interval}
 */
