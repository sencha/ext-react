/**
 * This class manages ready detection and handling. Direct use of this class is not
 * recommended. Instead use `Ext.onReady`:
 * 
 *      Ext.onReady(function () {
 *          // DOM and Framework are ready...
 *      });
 *
 * ## DOM Ready
 *
 * The lowest-level of readiness is DOM readiness. This level implies only that the document
 * body exists. Many things require the DOM to be ready for manipulation. If that is all
 * that is required, the `Ext.onDocumentReady` method can be called to register a callback
 * to be called as soon as the DOM is ready:
 *
 *      Ext.onDocumentReady(function () {
 *          // the document body is ready
 *      });
 *
 * ## Framework Ready
 *
 * In production builds of applications it is common to have all of the code loaded before
 * DOM ready, so the need to wait for "onReady" is often confused with only that concern.
 * This is easy to understand, at least in part because historically `Ext.onReady` only
 * waited for DOM ready.
 *
 * With the introduction of `Ext.Loader`, however, it became common for DOM ready to occur
 * in the middle of dynamically loading code. If application code were executed at that
 * time, any use of the yet-to-be-loaded classes would throw errors. As a consequence of
 * this, the `Ext.onReady` mechanism was extended to wait for both DOM ready *and* all of
 * the required classes to be loaded.
 *
 * When the framework enters or leaves a state where it is not ready (for example, the
 * first dynamic load is requested or last load completes), `Ext.env.Ready` is informed.
 * For example:
 *
 *      Ext.env.Ready.block();
 *
 *      //...
 *
 *      Ext.env.Ready.unblock();
 *
 * When there are no blocks and the DOM is ready, the Framework is ready and the "onReady"
 * callbacks are called.
 *
 * Priority can be used to control the ordering of onReady listeners, for example:
 *
 *     Ext.onReady(function() {
 *
 *     }, null, {
 *         priority: 100
 *     });
 *
 * Ready listeners with higher priorities will run sooner than those with lower priorities,
 * the default priority being `0`.  Internally the framework reserves priorities of 1000
 * or greater, and -1000 or lesser for onReady handlers that must run before or after
 * any application code.  Applications should stick to using priorities in the -999 - 999
 * range. The following priorities are currently in use by the framework:
 *
 * - Element_scroll rtl override: `1001`
 * - Event system initialization: `2000`
 * - Ext.dom.Element: `1500`
 *
 * @class Ext.env.Ready
 * @singleton
 * @private
 * @since 5.0.0
 */

/**
 * @method invoke
 * This method invokes the given `listener` instance based on its options.
 * @param {Object} listener
 */

/**
 * @method invokeAll
 * Invokes as many listeners as are appropriate given the current state. This should
 * only be called when DOM ready is achieved. The remaining business of `blocks` is
 * handled here.
 */

/**
 * @method onReady
 * @member Ext
 * Adds a listener to be notified when the document is ready (before onload and before
 * images are loaded).
 *
 * @param {Function} fn The method to call.
 * @param {Object} [scope] The scope (`this` reference) in which the handler function
 * executes. Defaults to the browser window.
 * @param {Object} [options] An object with extra options.
 * @param {Number} [options.delay=0] A number of milliseconds to delay.
 * @param {Number} [options.priority=0] Relative priority of this callback. A larger
 * number will result in the callback being sorted before the others.  Priorities
 * 1000 or greater and -1000 or lesser are reserved for internal framework use only.
 * @param {Boolean} [options.dom=false] Pass `true` to only wait for DOM ready, `false`
 * means full Framework and DOM readiness.
 * numbers are reserved.
 */
