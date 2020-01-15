/**
 * @class Ext.data.summary.Base
 * @extend Ext.Base
 * @mixins Ext.mixin.Factoryable
 * @alias data.summary.base
 * The base class for calculating data summaries. The summary is calculated using the 
 * {@link #method!calculate} method. This is overridden in subclasses.
 *
 * @since 6.5.0
 */

/**
 * This method calculates the summary value of the given records.
 * @param {Ext.data.Model[]/Object[]} records The records to aggregate.
 * @param {String} property The property to aggregate on.
 * @param {String} root The root to extra the data from.
 * @param {Number} begin The starting index to calculate from.
 * @param {Number} end The index at which to stop calculating. The item at this
 * index will *not* be included in the calculation.
 *
 * @return {Object} The calculated summary value.
 * @method calculate
 */
