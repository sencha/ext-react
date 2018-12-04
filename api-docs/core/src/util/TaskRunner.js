/**
 * @class Ext.util.TaskRunner
 * Provides the ability to execute one or more arbitrary tasks in an asynchronous manner.
 *
 * Generally, you can use the singleton {@link Ext.TaskManager}.  Or you can create 
 * separate TaskRunner instances to start and stop unique tasks independent of one 
 * another.
 *
 * To end a running task:
 * 
 *      task.destroy();
 *
 * If a task needs to be started and stopped repeated over time, you can create a
 * {@link Ext.util.TaskRunner.Task Task} instance.
 *
 *     var runner = new Ext.util.TaskRunner(),
 *         task;
 *     
 *     task = runner.newTask({
 *         run: function() {
 *             // useful code
 *         },
 *         interval: 1000
 *     });
 *     
 *     task.start();
 *     
 *     // ...
 *     
 *     task.stop();
 *     
 *     // ...
 *     
 *     task.start();
 *
 * A re-usable, single-run task can be managed similar to the above:
 *
 *     var runner = new Ext.util.TaskRunner(),
 *         task;
 *     
 *     task = runner.newTask({
 *         run: function() {
 *             // useful code
 *         },
 *         interval: 1000,
 *         repeat: 1
 *     });
 *     
 *     task.start();
 *     
 *     // ...
 *     
 *     task.stop();
 *     
 *     // ...
 *     
 *     task.start();
 *
 * See the {@link #start} method for details about how to configure a Task.
 *
 * Also see {@link Ext.util.DelayedTask}.
 * 
 * @constructor
 * @param {Number/Object} [interval=10] The minimum precision in milliseconds supported by 
 * this TaskRunner instance. Alternatively, a config object to apply to the new instance.
 */

/**
 * @cfg {Boolean} [fireIdleEvent=true]
 * This may be configured `false` to inhibit firing of the {@link
 * Ext.GlobalEvents#idle idle event} after task invocation.
 */

/**
 * @cfg {Number} [interval=10]
 * How often to run the task in milliseconds. Defaults to every 10ms.
 */

/**
 * @method newTask
 * Creates a new {@link Ext.util.TaskRunner.Task Task} instance. These instances can
 * be easily started and stopped.
 * @param {Object} config The config object. For details on the supported properties,
 * see {@link #start}.
 *
 * @return {Ext.util.TaskRunner.Task}
 * Ext.util.TaskRunner.Task instance, which can be useful for method chaining.
 */

/**
 * @method start
 * Starts a new task.
 *
 * Before each invocation, Ext injects the property `taskRunCount` into the task object
 * so that calculations based on the repeat count can be performed.
 *
 * The returned task will contain a `destroy` method that can be used to destroy the
 * task and cancel further calls. This is equivalent to the {@link #stop} method.
 *
 * @param {Object} task A config object that supports the following properties:
 * @param {Function} task.run The function to execute each time the task is invoked. The
 * function will be called at each interval and passed the `args` argument if specified,
 * and the current invocation count if not.
 *
 * If a particular scope (`this` reference) is required, be sure to specify it using
 * the `scope` argument.
 *
 * @param {Function} task.onError The function to execute in case of unhandled
 * error on task.run.
 *
 * @param {Boolean} task.run.return `false` from this function to terminate the task.
 *
 * @param {Number} task.interval The frequency in milliseconds with which the task
 * should be invoked.
 *
 * @param {Object[]} [task.args] An array of arguments to be passed to the function
 * specified by `run`. If not specified, the current invocation count is passed.
 *
 * @param {Boolean} [task.addCountToArgs=false] True to add the current invocation count as
 * one of the arguments of args.
 * Note: This only takes effect when args is specified.
 *
 * @param {Object} [task.scope] The scope (`this` reference) in which to execute the
 * `run` function. Defaults to the task config object.
 *
 * @param {Number} [task.duration] The length of time in milliseconds to invoke the task
 * before stopping automatically (defaults to indefinite).
 *
 * @param {Number} [task.repeat] The number of times to invoke the task before stopping
 * automatically (defaults to indefinite).
 *
 * @param {Number} [task.fireIdleEvent=true] If all tasks in a TaskRunner's execution
 * sweep are configured with `fireIdleEvent: false`, then the
 * {@link Ext.GlobalEvents#idle idleEvent} is not fired when the TaskRunner's execution
 * sweep finishes.
 *
 * @param {Boolean} [task.fireOnStart=false] True to run the task immediately instead of
 * waiting for the _interval's_ initial pass to call the _run_ function.
 */

/**
 * @method stop
 * Stops an existing running task.
 * @param {Object} task The task to stop.
 * @param {Boolean} andRemove Pass `true` to also remove the task from the queue.
 * @return {Object} The task
 */

/**
 * @method stopAll
 * Stops all tasks that are currently running.
 * @param {Boolean} andRemove Pass `true` to also remove the tasks from the queue.
 */

/**
 * Destroys this instance, stopping all tasks that are currently running.
 * @method destroy
 */

/**
 * Instances of this class are created by {@link Ext.util.TaskRunner#newTask} method.
 *
 * For details on config properties, see {@link Ext.util.TaskRunner#start}.
 * @class Ext.util.TaskRunner.Task
 */

/**
 * @method restart
 * Restarts this task, clearing it duration, expiration and run count.
 * @param {Number} [interval] Optionally reset this task's interval.
 */

/**
 * @method start
 * Starts this task if it is not already started.
 * @param {Number} [interval] Optionally reset this task's interval.
 */

/**
 * @method stop
 * Stops this task.
 */

/**
 * Destroys this instance, stopping this task's execution.
 * @method destroy
 * @member Ext.util.TaskRunner.Task
 */
