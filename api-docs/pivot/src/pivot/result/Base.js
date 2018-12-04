/**
 * @class Ext.pivot.result.Base
 * @extend Ext.Base
 * @alias pivotresult.base
 * Base implementation of a result object.
 *
 * The Result object stores all calculated values for the aggregate dimensions
 * for a left/top item pair.
 */

/**
 * @cfg {String} [leftKey=''] (required)
 * Key of left axis item or grandTotalKey
 */

/**
 * @cfg {String} [topKey=''] (required)
 * Key of top axis item or grandTotalKey
 */

/**
 * @property {Boolean} [dirty=false]
 * Set this flag on true if you modified at least one record in this result.
 * The grid cell will be marked as dirty in such a case.
 */

/**
 * @method addValue
 * Add the calculated value for an aggregate dimension to the internal values storage
 * @param dimensionId
 * @param value
 */

/**
 * @method getValue
 * Returns the calculated value for the specified aggregate dimension
 * @param dimensionId
 */

/**
 * @method getLeftAxisItem
 * Returns the left axis item
 * @returns {Ext.pivot.axis.Item}
 */

/**
 * @method getTopAxisItem
 * Returns the top axis item
 * @returns {Ext.pivot.axis.Item}
 */
