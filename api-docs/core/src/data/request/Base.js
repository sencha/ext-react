/**
 * @class Ext.data.request.Base
 * @extend Ext.Base
 * @mixins Ext.mixin.Factoryable
 *
 * This class manages a pending Ajax request. Instances of this type are created by the
 * `{@link Ext.data.Connection#request}` method.
 * @since 6.0.0
 */

/**
 * @method start
 * Start the request.
 */

/**
 * @method then
 * Returns a new promise resolving to the value of the called method.
 * @param {Function} success Called when the Promise is fulfilled.
 * @param {Function} failure Called when the Promise is rejected.
 * @returns {Ext.promise.Promise}
 */

/**
 * @method isLoading
 * Determines whether this request is in progress.
 *
 * @return {Boolean} `true` if this request is in progress, `false` if complete.
 */
