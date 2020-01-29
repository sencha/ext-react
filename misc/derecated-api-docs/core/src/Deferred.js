/*
 Ext.Deferred adapted from:
 [DeftJS](https://github.com/deftjs/deftjs5)
 Copyright (c) 2012-2013 [DeftJS Framework Contributors](http://deftjs.org)
 Open source under the [MIT License](http://en.wikipedia.org/wiki/MIT_License).

 when(), all(), any(), some(), map(), reduce(), delay() and timeout()
 sequence(), parallel(), pipeline()
 methods adapted from: [when.js](https://github.com/cujojs/when)
 Copyright (c) B Cavalier & J Hann
 Open source under the [MIT License](http://en.wikipedia.org/wiki/MIT_License).
 */

/**
 * @class Ext.Deferred
 * @extend Ext.promise.Deferred
 *
 * Deferreds are the mechanism used to create new Promises. A Deferred has a single
 * associated Promise that can be safely returned to external consumers to ensure they do
 * not interfere with the resolution or rejection of the deferred operation.
 *
 * This implementation of Promises is an extension of the ECMAScript 6 Promises API as
 * detailed [here][1]. For a compatible, though less full featured, API see `{@link Ext.Promise}`.
 *
 * A Deferred is typically used within the body of a function that performs an asynchronous
 * operation. When that operation succeeds, the Deferred should be resolved; if that
 * operation fails, the Deferred should be rejected.
 *
 * Each Deferred has an associated Promise. A Promise delegates `then` calls to its
 * Deferred's `then` method. In this way, access to Deferred operations are divided between
 * producer (Deferred) and consumer (Promise) roles.
 *
 * ## Basic Usage
 *
 * In it's most common form, a method will create and return a Promise like this:
 *
 *      // A method in a service class which uses a Store and returns a Promise
 *      //
 *      loadCompanies: function () {
 *          var deferred = new Ext.Deferred(); // create the Ext.Deferred object
 *
 *          this.companyStore.load({
 *              callback: function (records, operation, success) {
 *                  if (success) {
 *                      // Use "deferred" to drive the promise:
 *                      deferred.resolve(records);
 *                  }
 *                  else {
 *                      // Use "deferred" to drive the promise:
 *                      deferred.reject("Error loading Companies.");
 *                  }
 *              }
 *          });
 *
 *          return deferred.promise;  // return the Promise to the caller
 *      }
 *
 * You can see this method first creates a `{@link Ext.Deferred Deferred}` object. It then
 * returns its `Promise` object for use by the caller. Finally, in the asynchronous
 * callback, it resolves the `deferred` object if the call was successful, and rejects the
 * `deferred` if the call failed.
 *
 * When a Deferred's `resolve` method is called, it fulfills with the optionally specified
 * value. If `resolve` is called with a then-able (i.e.a Function or Object with a `then`
 * function, such as another Promise) it assimilates the then-able's result; the Deferred
 * provides its own `resolve` and `reject` methods as the onFulfilled or onRejected
 * arguments in a call to that then-able's `then` function. If an error is thrown while
 * calling the then-able's `then` function (prior to any call back to the specified
 * `resolve` or `reject` methods), the Deferred rejects with that error. If a Deferred's
 * `resolve` method is called with its own Promise, it rejects with a TypeError.
 *
 * When a Deferred's `reject` method is called, it rejects with the optionally specified
 * reason.
 *
 * Each time a Deferred's `then` method is called, it captures a pair of optional
 * onFulfilled and onRejected callbacks and returns a Promise of the Deferred's future
 * value as transformed by those callbacks.
 *
 * See `{@link Ext.promise.Promise}` for an example of using the returned Promise.
 *
 * @since 6.0.0
 */
