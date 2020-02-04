/**
 * @class Ext.util.Spans
 * This class manages a set of numeric spans (2-element arrays marking begin and end
 * points). The method of this class coalesce and split spans as necessary to store
 * the fewest possible pairs needed to represent the covered (one-dimensional) area.
 *
 * @private
 * @since 6.5.0
 */

/**
 * @method clear
 * Clears all spans.
 * @return {Ext.util.Spans} This Spans object.
 */

/**
 * @method add
 * Adds a new span to the current set of spans. This will coalesce adjacent spans
 * as necessary to store the minimum number of spans possible.
 *
 * @param {Number/Number[]} begin Either the beginning of the span or a 2-element
 * array of `[begin,end]`.
 * @param {Number} [end] If `begin` is just the position, the second argument is
 * the end of the span to add. This value is exclusive of the span, that is it
 * marks the first position beyond the span. This ensures that `end - begin` is
 * the length of the span.
 * @return {Boolean} `true` if the new span changes this object, `false` if the
 * span was already in the set.
 */

/**
 * @method contains
 * Returns `true` if the given span is fully in the current set of spans.
 * @param {Number/Number[]} begin Either the beginning of the span or a 2-element
 * array of `[begin,end]`.
 * @param {Number} [end] If `begin` is just the position, the second argument is
 * the end of the span to add. This value is exclusive of the span, that is it
 * marks the first position beyond the span. This ensures that `end - begin` is
 * the length of the span.
 * @return {Boolean}
 */

/**
 * @method intersects
 * Returns `true` if the specified span intersects with the current set of spans.
 *
 * @param {Number/Number[]} begin Either the beginning of the span or a 2-element
 * array of `[begin,end]`.
 * @param {Number} [end] If `begin` is just the position, the second argument is
 * the end of the span to add. This value is exclusive of the span, that is it
 * marks the first position beyond the span. This ensures that `end - begin` is
 * the length of the span.
 * @return {Boolean}
 */

/**
 * @method remove
 * Removes a span from the current set of spans. This will coalesce adjacent spans
 * as necessary to store the minimum number of spans possible.
 *
 * @param {Number/Number[]} begin Either the beginning of the span or a 2-element
 * array of `[begin,end]`.
 * @param {Number} [end] If `begin` is just the position, the second argument is
 * the end of the span to add. This value is exclusive of the span, that is it
 * marks the first position beyond the span. This ensures that `end - begin` is
 * the length of the span.
 * @return {Boolean} `true` if removing the span changes this object, `false` if the
 * span was not in the set.
 */

/**
 * @method stash
 * Returns an object that holds the current state and can be passed back later
 * to `unstash` to restore that state.
 * @return {Object}
 */

/**
 * @method unstash
 * Takes an object a state object returned by `stash` and makes that the current
 * state.
 * @return {Ext.util.Spans} This Spans object.
 */

/**
 * @method getCount
 * @return {Number} the number of integer locations covered by all the spans.
 */
