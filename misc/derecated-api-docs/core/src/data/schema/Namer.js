/**
 * @class Ext.data.schema.Namer
 * @extend Ext.Base
 * @mixins Ext.mixin.Factoryable
 * @alias namer.default
 *
 * This class provides name derivation methods for use by a `Schema`.
 * 
 * # Caching
 * 
 * Because most name derivations are only textual manipulations of input strings, the
 * results can be cached. This is handled by the `apply` method by giving it the name of
 * the method to call. For example:
 * 
 *      var str = namer.capitalize('foo'); //  = "Foo"
 *      
 *      var str = namer.apply('capitalize', 'foo');
 * 
 * The return value of the second call (using `apply`) is the same as the first, however,
 * the results of `capitalize` are cached. This allows repeated calls to `apply` given the
 * same operation and string to avoid the extra string manipulation.
 * 
 * # Usage
 * 
 * This class is not intended to be created by application code. It is created by `Schema`
 * instances as directed by the `namer` config. Application code can derive from this
 * class and set the `namer` config to customize naming conventions used by the `Schema`.
 * 
 * @protected
 */

/**
 * @method fieldRole
 * Given the name of a foreign key field, return the role of the related entity. For
 * example, fields like "fooId" or "foo_id" this implementation returns "foo".
 * @template
 */

/**
 * @method manyToOne
 * Returns the name for a one-to-many association given the left and right type and
 * the associating `role`.
 *
 * In many cases the `role` matches the target type. For example, an OrderItem might
 * have an "orderId" field which would have a `role` of "order". If this is a reference
 * to an Order entity then the association name will be "OrderOrderItems".
 *
 * When the `role` does not match, it is included in the association name. For example,
 * consider a Ticket entity with a "creatorId" field that references a User entity.
 * The `role` of that field will (by default) be "creator". The returned association
 * name will be "UserCreatorTickets".
 */
