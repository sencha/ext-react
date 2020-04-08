/**
 * @class Ext.pivot.result.Collection
 * @extend Ext.Base
 *
 * This class stores the matrix results. When the pivot component uses the
 * {@link Ext.pivot.matrix.Local} matrix then this class does
 * calculations in the browser.
 */

/**
 * @cfg {String} [resultType='base']
 *
 * Define here what class to be used when creating {@link Ext.pivot.result.Base Result} objects
 */

/**
 * @cfg {Ext.pivot.matrix.Base} [matrix=null]
 *
 * Reference to the matrix object
 */

/**
 * @method get
 * Returns the Result object for the specified left/top axis keys
 *
 * @param leftKey
 * @param topKey
 * @returns {Ext.pivot.result.Base}
 */

/**
 * @method getByLeftKey
 * Return all Result objects for the specified leftKey
 *
 * @param leftKey
 * @returns Array
 */

/**
 * @method getByTopKey
 * Return all Result objects for the specified topKey
 *
 * @param topKey
 * @returns Array
 */

/**
 * @method calculate
 * Calculate aggregate values for each available Result object
 */
