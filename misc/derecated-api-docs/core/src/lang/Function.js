/**
 * @class Ext.Function
 *
 * A collection of useful static methods to deal with function callbacks.
 * @singleton
 */

/**
 * @method flexSetter
 * A very commonly used method throughout the framework. It acts as a wrapper around another method
 * which originally accepts 2 arguments for `name` and `value`.
 * The wrapped function then allows "flexible" value setting of either:
 *
 * - `name` and `value` as 2 arguments
 * - one single object argument with multiple key - value pairs
 *
 * For example:
 *
 *     var setValue = Ext.Function.flexSetter(function(name, value) {
 *         this[name] = value;
 *     });
 *
 *     // Afterwards
 *     // Setting a single name - value
 *     setValue('name1', 'value1');
 *
 *     // Settings multiple name - value pairs
 *     setValue({
 *         name1: 'value1',
 *         name2: 'value2',
 *         name3: 'value3'
 *     });
 *
 * @param {Function} setter The single value setter method.
 * @param {String} setter.name The name of the value being set.
 * @param {Object} setter.value The value being set.
 * @return {Function}
 */

/**
 * @method bind
 * Create a new function from the provided `fn`, change `this` to the provided scope,
 * optionally overrides arguments for the call. Defaults to the arguments passed by
 * the caller.
 *
 * {@link Ext#bind Ext.bind} is alias for {@link Ext.Function#bind Ext.Function.bind}
 *
 * **NOTE:** This method is deprecated. Use the standard `bind` method of JavaScript
 * `Function` instead:
 *
 *      function foo () {
 *          ...
 *      }
 *
 *      var fn = foo.bind(this);
 *
 * This method is unavailable natively on IE8 and IE/Quirks but Ext JS provides a
 * "polyfill" to emulate the important features of the standard `bind` method. In
 * particular, the polyfill only provides binding of "this" and optional arguments.
 *
 * @param {Function} fn The function to delegate.
 * @param {Object} scope (optional) The scope (`this` reference) in which the function is executed.
 * **If omitted, defaults to the default global environment object (usually the browser window).**
 * @param {Array} args (optional) Overrides arguments for the call. (Defaults to the arguments passed by the caller)
 * @param {Boolean/Number} appendArgs (optional) if True args are appended to call args instead of overriding,
 * if a number the args are inserted at the specified position.
 * @return {Function} The new function.
 */

/**
 * @method bindCallback
 * Captures the given parameters for a later call to `Ext.callback`. This binding is
 * most useful for resolving scopes for example to an `Ext.app.ViewController`.
 *
 * The arguments match that of `Ext.callback` except for the `args` which, if provided
 * to this method, are prepended to any arguments supplied by the eventual caller of
 * the returned function.
 *
 * @return {Function} A function that, when called, uses `Ext.callback` to call the
 * captured `callback`.
 * @since 5.0.0
 */

/**
 * @method pass
 * Create a new function from the provided `fn`, the arguments of which are pre-set to `args`.
 * New arguments passed to the newly created callback when it's invoked are appended after the pre-set ones.
 * This is especially useful when creating callbacks.
 *
 * For example:
 *
 *     var originalFunction = function(){
 *         alert(Ext.Array.from(arguments).join(' '));
 *     };
 *
 *     var callback = Ext.Function.pass(originalFunction, ['Hello', 'World']);
 *
 *     callback(); // alerts 'Hello World'
 *     callback('by Me'); // alerts 'Hello World by Me'
 *
 * {@link Ext#pass Ext.pass} is alias for {@link Ext.Function#pass Ext.Function.pass}
 *
 * @param {Function} fn The original function.
 * @param {Array} args The arguments to pass to new callback.
 * @param {Object} scope (optional) The scope (`this` reference) in which the function is executed.
 * @return {Function} The new callback function.
 */

/**
 * @method alias
 * Create an alias to the provided method property with name `methodName` of `object`.
 * Note that the execution scope will still be bound to the provided `object` itself.
 *
 * @param {Object/Function} object
 * @param {String} methodName
 * @return {Function} aliasFn
 */

/**
 * @method clone
 * Create a "clone" of the provided method. The returned method will call the given
 * method passing along all arguments and the "this" pointer and return its result.
 *
 * @param {Function} method
 * @return {Function} cloneFn
 */

/**
 * @method createInterceptor
 * Creates an interceptor function. The passed function is called before the original one. If it returns false,
 * the original one is not called. The resulting function returns the results of the original function.
 * The passed function is called with the parameters of the original function. Example usage:
 *
 *     var sayHi = function(name){
 *         alert('Hi, ' + name);
 *     };
 *
 *     sayHi('Fred'); // alerts "Hi, Fred"
 *
 *     // create a new function that validates input without
 *     // directly modifying the original function:
 *     var sayHiToFriend = Ext.Function.createInterceptor(sayHi, function(name){
 *         return name === 'Brian';
 *     });
 *
 *     sayHiToFriend('Fred');  // no alert
 *     sayHiToFriend('Brian'); // alerts "Hi, Brian"
 *
 * @param {Function} origFn The original function.
 * @param {Function} newFn The function to call before the original.
 * @param {Object} [scope] The scope (`this` reference) in which the passed function is executed.
 * **If omitted, defaults to the scope in which the original function is called or the browser window.**
 * @param {Object} [returnValue=null] The value to return if the passed function return `false`.
 * @return {Function} The new function.
 */

/**
 * @method createDelayed
 * Creates a delegate (callback) which, when called, executes after a specific delay.
 *
 * @param {Function} fn The function which will be called on a delay when the returned function is called.
 * Optionally, a replacement (or additional) argument list may be specified.
 * @param {Number} delay The number of milliseconds to defer execution by whenever called.
 * @param {Object} scope (optional) The scope (`this` reference) used by the function at execution time.
 * @param {Array} args (optional) Override arguments for the call. (Defaults to the arguments passed by the caller)
 * @param {Boolean/Number} appendArgs (optional) if True args are appended to call args instead of overriding,
 * if a number the args are inserted at the specified position.
 * @return {Function} A function which, when called, executes the original function after the specified delay.
 */

/**
 * @method defer
 * Calls this function after the number of milliseconds specified, optionally in a specific scope. Example usage:
 *
 *     var sayHi = function(name){
 *         alert('Hi, ' + name);
 *     }
 *
 *     // executes immediately:
 *     sayHi('Fred');
 *
 *     // executes after 2 seconds:
 *     Ext.Function.defer(sayHi, 2000, this, ['Fred']);
 *
 *     // this syntax is sometimes useful for deferring
 *     // execution of an anonymous function:
 *     Ext.Function.defer(function(){
 *         alert('Anonymous');
 *     }, 100);
 *
 * {@link Ext#defer Ext.defer} is alias for {@link Ext.Function#defer Ext.Function.defer}
 *
 * @param {Function} fn The function to defer.
 * @param {Number} millis The number of milliseconds for the `setTimeout` call
 * (if less than or equal to 0 the function is executed immediately).
 * @param {Object} scope (optional) The scope (`this` reference) in which the function is executed.
 * **If omitted, defaults to the browser window.**
 * @param {Array} [args] Overrides arguments for the call. Defaults to the arguments passed by the caller.
 * @param {Boolean/Number} [appendArgs=false] If `true` args are appended to call args instead of overriding,
 * or, if a number, then the args are inserted at the specified position.
 * @return {Number} The timeout id that can be used with `clearTimeout`.
 */

/**
 * @method interval
 * Calls this function repeatedly at a given interval, optionally in a specific scope.
 *
 * {@link Ext#defer Ext.defer} is alias for {@link Ext.Function#defer Ext.Function.defer}
 *
 * @param {Function} fn The function to defer.
 * @param {Number} millis The number of milliseconds for the `setInterval` call
 * @param {Object} scope (optional) The scope (`this` reference) in which the function is executed.
 * **If omitted, defaults to the browser window.**
 * @param {Array} [args] Overrides arguments for the call. Defaults to the arguments passed by the caller.
 * @param {Boolean/Number} [appendArgs=false] If `true` args are appended to call args instead of overriding,
 * or, if a number, then the args are inserted at the specified position.
 * @return {Number} The interval id that can be used with `clearInterval`.
 */

/**
 * @method createSequence
 * Create a combined function call sequence of the original function + the passed function.
 * The resulting function returns the results of the original function.
 * The passed function is called with the parameters of the original function. Example usage:
 *
 *     var sayHi = function(name){
 *         alert('Hi, ' + name);
 *     };
 *
 *     sayHi('Fred'); // alerts "Hi, Fred"
 *
 *     var sayGoodbye = Ext.Function.createSequence(sayHi, function(name){
 *         alert('Bye, ' + name);
 *     });
 *
 *     sayGoodbye('Fred'); // both alerts show
 *
 * @param {Function} originalFn The original function.
 * @param {Function} newFn The function to sequence.
 * @param {Object} [scope] The scope (`this` reference) in which the passed function is executed.
 * If omitted, defaults to the scope in which the original function is called or the
 * default global environment object (usually the browser window).
 * @return {Function} The new function.
 */

/**
 * @method createBuffered
 * Creates a delegate function, optionally with a bound scope which, when called, buffers
 * the execution of the passed function for the configured number of milliseconds.
 * If called again within that period, the impending invocation will be canceled, and the
 * timeout period will begin again.
 *
 * @param {Function} fn The function to invoke on a buffered timer.
 * @param {Number} buffer The number of milliseconds by which to buffer the invocation of the
 * function.
 * @param {Object} [scope] The scope (`this` reference) in which.
 * the passed function is executed. If omitted, defaults to the scope specified by the caller.
 * @param {Array} [args] Override arguments for the call. Defaults to the arguments
 * passed by the caller.
 * @return {Function} A function which invokes the passed function after buffering for the specified time.
 */

/**
 * @method createThrottled
 * Creates a throttled version of the passed function which, when called repeatedly and
 * rapidly, invokes the passed function only after a certain interval has elapsed since the
 * previous invocation.
 *
 * This is useful for wrapping functions which may be called repeatedly, such as
 * a handler of a mouse move event when the processing is expensive.
 *
 * @param {Function} fn The function to execute at a regular time interval.
 * @param {Number} interval The interval in milliseconds on which the passed function is executed.
 * @param {Object} [scope] The scope (`this` reference) in which
 * the passed function is executed. If omitted, defaults to the scope specified by the caller.
 * @return {Function} A function which invokes the passed function at the specified interval.
 */

/**
 * @method createBarrier
 * Wraps the passed function in a barrier function which will call the passed function after the passed number of invocations.
 * @param {Number} count The number of invocations which will result in the calling of the passed function.
 * @param {Function} fn The function to call after the required number of invocations.
 * @param {Object} scope The scope (`this` reference) in which the function will be called.
 */

/**
 * @method interceptBefore
 * Adds behavior to an existing method that is executed before the
 * original behavior of the function.  For example:
 *
 *     var soup = {
 *         contents: [],
 *         add: function(ingredient) {
 *             this.contents.push(ingredient);
 *         }
 *     };
 *     Ext.Function.interceptBefore(soup, "add", function(ingredient){
 *         if (!this.contents.length && ingredient !== "water") {
 *             // Always add water to start with
 *             this.contents.push("water");
 *         }
 *     });
 *     soup.add("onions");
 *     soup.add("salt");
 *     soup.contents; // will contain: water, onions, salt
 *
 * @param {Object} object The target object
 * @param {String} methodName Name of the method to override
 * @param {Function} fn Function with the new behavior.  It will
 * be called with the same arguments as the original method.  The
 * return value of this function will be the return value of the
 * new method.
 * @param {Object} [scope] The scope to execute the interceptor function. Defaults to the object.
 * @return {Function} The new function just created.
 */

/**
 * @method interceptAfter
 * Adds behavior to an existing method that is executed after the
 * original behavior of the function.  For example:
 *
 *     var soup = {
 *         contents: [],
 *         add: function(ingredient) {
 *             this.contents.push(ingredient);
 *         }
 *     };
 *     Ext.Function.interceptAfter(soup, "add", function(ingredient){
 *         // Always add a bit of extra salt
 *         this.contents.push("salt");
 *     });
 *     soup.add("water");
 *     soup.add("onions");
 *     soup.contents; // will contain: water, salt, onions, salt
 *
 * @param {Object} object The target object
 * @param {String} methodName Name of the method to override
 * @param {Function} fn Function with the new behavior.  It will
 * be called with the same arguments as the original method.  The
 * return value of this function will be the return value of the
 * new method.
 * @param {Object} [scope] The scope to execute the interceptor function. Defaults to the object.
 * @return {Function} The new function just created.
 */

/**
 * @method memoize
 * Returns a wrapper function that caches the return value for previously
 * processed function argument(s).
 *
 * For example:
 *
 *      function factorial (value) {
 *          var ret = value;
 *
 *          while (--value > 1) {
 *              ret *= value;
 *          }
 *
 *          return ret;
 *      }
 *
 * Each call to `factorial` will loop and multiply to produce the answer. Using
 * this function we can wrap the above and cache its answers:
 *
 *      factorial = Ext.Function.memoize(factorial);
 *
 * The returned function operates in the same manner as before, but results are
 * stored in a cache to avoid calling the wrapped function when given the same
 * arguments.
 *
 *      var x = factorial(20);  // first time; call real factorial()
 *      var y = factorial(20);  // second time; return value from first call
 *
 * To support multi-argument methods, you will need to provide a `hashFn`.
 *
 *      function permutation (n, k) {
 *          return factorial(n) / factorial(n - k);
 *      }
 *
 *      permutation = Ext.Function.memoize(permutation, null, function (n, k) {
 *          n + '-' + k;
 *      });
 *
 * In this case, the `memoize` of `factorial` is sufficient optimization, but the
 * example is simply to illustrate how to generate a unique key for an expensive,
 * multi-argument method.
 *
 * **IMPORTANT**: This cache is unbounded so be cautious of memory leaks if the
 * `memoize`d function is kept indefinitely or is given an unbounded set of
 * possible arguments.
 *
 * @param {Function} fn Function to wrap.
 * @param {Object} scope Optional scope in which to execute the wrapped function.
 * @param {Function} hashFn Optional function used to compute a hash key for
 * storing the result, based on the arguments to the original function.
 * @return {Function} The caching wrapper function.
 * @since 6.0.0
 */

/**
 * @member Ext
 * @method asap
 * Schedules the specified callback function to be executed on the next turn of the
 * event loop. Where available, this method uses the browser's `setImmediate` API. If
 * not available, this method substitutes `setTimeout(0)`. Though not a perfect
 * replacement for `setImmediate` it is sufficient for many use cases.
 *
 * For more details see [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window/setImmediate).
 *
 * @param {Function} fn Callback function.
 * @param {Object} [scope] The scope for the callback (`this` pointer).
 * @param {Mixed[]} [parameters] Additional parameters to pass to `fn`.
 * @return {Number} A cancelation id for `{@link Ext#asapCancel}`.
 */

/**
 * @member Ext
 * @method asapCancel
 * Cancels a previously scheduled call to `{@link Ext#asap}`.
 *
 *      var asapId = Ext.asap(me.method, me);
 *      ...
 *
 *      if (nevermind) {
 *          Ext.apasCancel(asapId);
 *      }
 *
 * @param {Number} id The id returned by `{@link Ext#asap}`.
 */

/**
 * @method defer
 * @member Ext
 * @inheritdoc Ext.Function#defer
 */

/**
 * @method interval
 * @member Ext
 * @inheritdoc Ext.Function#interval
 */

/**
 * @method pass
 * @member Ext
 * @inheritdoc Ext.Function#pass
 */

/**
 * @method bind
 * @member Ext
 * @inheritdoc Ext.Function#bind
 */
