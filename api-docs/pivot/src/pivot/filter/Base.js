/**
 * @class Ext.pivot.filter.Base
 * @extend Ext.Base
 * @alias pivotfilter.base
 * Base implementation of a filter. It handles common type of filters.
 */

/**
 * @cfg {String} [type=abstract]
 *
 * Used when you define a filter on a dimension to set what kind of filter is to be
 * instantiated.
 */

/**
 * @cfg {String} [operator=null] (required)
 *
 * Operator to use to compare labels/values to this Filter's {@link #value}.
 *
 * The `between` and `not between` operators expect this filter's {@link #value} to be an array with two values.
 *
 * Possible values are:
 *
 *    * `<`
 *    * `<=`
 *    * `=`
 *    * `>=`
 *    * `>`
 *    * `!=`
 *    * `between`
 *    * `not between`
 */

/**
 * @cfg {String/Array} [value=null] (required)
 *
 * Value to filter by. For 'between' and 'not between' operators this should be an array of values.
 */

/**
 * @cfg {Boolean} [caseSensitive=true]
 *
 * During filtering should we use case sensitive comparison?
 *
 */
