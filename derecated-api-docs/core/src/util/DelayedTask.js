/**
 * @class Ext.util.DelayedTask
 * 
 * The DelayedTask class provides a convenient way to "buffer" the execution of a method,
 * performing setTimeout where a new timeout cancels the old timeout. When called, the
 * task will wait the specified time period before executing. If durng that time period,
 * the task is called again, the original call will be cancelled. This continues so that
 * the function is only called a single time for each iteration.
 * 
 * This method is especially useful for things like detecting whether a user has finished
 * typing in a text field. An example would be performing validation on a keypress. You can
 * use this class to buffer the keypress events for a certain number of milliseconds, and
 * perform only if they stop for that amount of time.  
 * 
 * ## Usage
 * 
 *     var task = new Ext.util.DelayedTask(function(){
 *         alert(Ext.getDom('myInputField').value.length);
 *     });
 *     
 *     // Wait 500ms before calling our function. If the user presses another key
 *     // during that 500ms, it will be cancelled and we'll wait another 500ms.
 *     Ext.get('myInputField').on('keypress', function() {
 *         task.delay(500);
 *     });
 * 
 * Note that we are using a DelayedTask here to illustrate a point. The configuration
 * option `buffer` for {@link Ext.util.Observable#addListener addListener/on} will
 * also setup a delayed task for you to buffer events.
 * 
 * @constructor The parameters to this constructor serve as defaults and are not required.
 * @param {Function} [fn] The default function to call. If not specified here, it must be specified during the {@link #delay} call.
 * @param {Object} [scope] The default scope (The **`this`** reference) in which the
 * function is called. If not specified, `this` will refer to the browser window.
 * @param {Array} [args] The default Array of arguments.
 * @param {Boolean} [cancelOnDelay=true] By default, each call to {@link #delay} cancels any pending invocation and reschedules a new
 * invocation. Specifying this as `false` means that calls to {@link #delay} when an invocation is pending just update the call settings,
 * `newDelay`, `newFn`, `newScope` or `newArgs`, whichever are passed.
 */

/**
 * @property {Number} id
 * The id of the currently pending invocation.  Will be set to `null` if there is no
 * invocation pending.
 */

/**
 * @method delay
 * By default, cancels any pending timeout and queues a new one.
 *
 * If the `cancelOnDelay` parameter was specified as `false` in the constructor, this does not cancel and
 * reschedule, but just updates the call settings, `newDelay`, `newFn`, `newScope` or `newArgs`, whichever are passed.
 *
 * @param {Number} newDelay The milliseconds to delay. `-1` means schedule for the next animation frame if supported.
 * @param {Function} [newFn] Overrides function passed to constructor
 * @param {Object} [newScope] Overrides scope passed to constructor. Remember that if no scope
 * is specified, `this` will refer to the browser window.
 * @param {Array} [newArgs] Overrides args passed to constructor
 * @return {Number} The timer id being used.
 */

/**
 * @method cancel
 * Cancel the last queued timeout
 */
