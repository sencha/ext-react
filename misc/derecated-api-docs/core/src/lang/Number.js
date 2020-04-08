/**
 * @class Ext.Number
 *
 * A collection of useful static methods to deal with numbers
 * @singleton
 */

/**
 * @method clipIndices
 * Coerces a given index into a valid index given a `length`.
 *
 * Negative indexes are interpreted starting at the end of the collection. That is,
 * a value of -1 indicates the last item, or equivalent to `length - 1`.
 *
 * When handling methods that take "begin" and "end" arguments like most array or
 * string methods, this method can be used like so:
 *
 *      function foo (array, begin, end) {
 *          var range = Ext.Number.clipIndices(array.length, [begin, end]);
 *
 *          begin = range[0];
 *          end   = range[1];
 *
 *          // 0 <= begin <= end <= array.length
 *
 *          var length = end - begin;
 *      }
 *
 * For example:
 *
 *      +---+---+---+---+---+---+---+---+
 *      |   |   |   |   |   |   |   |   |  length = 8
 *      +---+---+---+---+---+---+---+---+
 *        0   1   2   3   4   5   6   7
 *       -8  -7  -6  -5  -4  -3  -2  -1
 *
 *      console.log(Ext.Number.clipIndices(8, [3, 10]); // logs "[3, 8]"
 *      console.log(Ext.Number.clipIndices(8, [-5]);    // logs "[3, 8]"
 *      console.log(Ext.Number.clipIndices(8, []);
 *      console.log(Ext.Number.clipIndices(8, []);
 *
 * @param {Number} length
 * @param {Number[]} indices
 * @param {Object} [options] An object with different option flags.
 * @param {Boolean} [options.count=false] The second number in `indices` is the
 * count not and an index.
 * @param {Boolean} [options.inclusive=false] The second number in `indices` is
 * "inclusive" meaning that the item should be considered in the range. Normally,
 * the second number is considered the first item outside the range or as an
 * "exclusive" bound.
 * @param {Boolean} [options.wrap=true] Wraps negative numbers backwards from the
 * end of the array. Passing `false` simply clips negative index values at 0.
 * @return {Number[]} The normalized `[begin, end]` array where `end` is now
 * exclusive such that `length = end - begin`. Both values are between 0 and the
 * given `length` and `end` will not be less-than `begin`.
 */

/**
 * @method constrain
 * Checks whether or not the passed number is within a desired range.  If the number is already within the
 * range it is returned, otherwise the min or max value is returned depending on which side of the range is
 * exceeded. Note that this method returns the constrained value but does not change the current number.
 * @param {Number} number The number to check
 * @param {Number} min The minimum number in the range
 * @param {Number} max The maximum number in the range
 * @return {Number} The constrained value if outside the range, otherwise the current value
 */

/**
 * @method snap
 * Snaps the passed number between stopping points based upon a passed increment value.
 *
 * The difference between this and {@link #snapInRange} is that {@link #snapInRange} uses the minValue
 * when calculating snap points:
 *
 *     r = Ext.Number.snap(56, 2, 55, 65);        // Returns 56 - snap points are zero based
 *
 *     r = Ext.Number.snapInRange(56, 2, 55, 65); // Returns 57 - snap points are based from minValue
 *
 * @param {Number} value The unsnapped value.
 * @param {Number} increment The increment by which the value must move.
 * @param {Number} minValue The minimum value to which the returned value must be constrained. Overrides the increment.
 * @param {Number} maxValue The maximum value to which the returned value must be constrained. Overrides the increment.
 * @return {Number} The value of the nearest snap target.
 */

/**
 * @method snapInRange
 * Snaps the passed number between stopping points based upon a passed increment value.
 *
 * The difference between this and {@link #snap} is that {@link #snap} does not use the minValue
 * when calculating snap points:
 *
 *     r = Ext.Number.snap(56, 2, 55, 65);        // Returns 56 - snap points are zero based
 *
 *     r = Ext.Number.snapInRange(56, 2, 55, 65); // Returns 57 - snap points are based from minValue
 *
 * @param {Number} value The unsnapped value.
 * @param {Number} increment The increment by which the value must move.
 * @param {Number} [minValue=0] The minimum value to which the returned value must be constrained.
 * @param {Number} [maxValue=Infinity] The maximum value to which the returned value must be constrained.
 * @return {Number} The value of the nearest snap target.
 */

/**
 * @method roundToNearest
 * Round a number to the nearest interval.
 * @param {Number} value The value to round.
 * @param {Number} interval The interval to round to.
 * @return {Number} The rounded value.
 *
 * @since 6.2.0
 */

/**
 * @method sign
 * Returns the sign of the given number. See also MDN for Math.sign documentation
 * for the standard method this method emulates.
 * @param {Number} x The number.
 * @return {Number} The sign of the number `x`, indicating whether the number is
 * positive (1), negative (-1) or zero (0).
 * @method sign
 */

/**
 * @method log10
 * Returns the base 10 logarithm of a number.
 * This will use Math.log10, if available (ES6).
 * @param {Number} x The number.
 * @return {Number} Base 10 logarithm of the number 'x'.
 * @method log10
 */

/**
 * @method isEqual
 * Determines if two numbers `n1` and `n2` are equal within a given
 * margin of precision `epsilon`.
 * @param {Number} n1 First number.
 * @param {Number} n2 Second number.
 * @param {Number} epsilon Margin of precision.
 * @returns {Boolean} `true`, if numbers are equal. `false` otherwise.
 */

/**
 * @method isFinite
 * Determines if the value passed is a number and also finite.
 * This a Polyfill version of Number.isFinite(),differently than
 * the isFinite() function, this method doesn't convert the parameter to a number.
 * @param {Number} value Number to be tested.
 * @returns {Boolean} `true`, if the parameter is a number and finite, `false` otherwise.
 * @since 6.2
 */

/**
 * @method toFixed
 * Formats a number using fixed-point notation
 * @param {Number} value The number to format
 * @param {Number} precision The number of digits to show after the decimal point
 */

/**
 * @method from
 * Validate that a value is numeric and convert it to a number if necessary. Returns the specified default value if
 * it is not.
 *
 *     Ext.Number.from('1.23', 1); // returns 1.23
 *     Ext.Number.from('abc', 1); // returns 1
 *
 * @param {Object} value
 * @param {Number} defaultValue The value to return if the original value is non-numeric
 * @return {Number} value, if numeric, defaultValue otherwise
 */

/**
 * @method randomInt
 * Returns a random integer between the specified range (inclusive)
 * @param {Number} from Lowest value to return.
 * @param {Number} to Highest value to return.
 * @return {Number} A random integer within the specified range.
 */

/**
 * @method correctFloat
 * Corrects floating point numbers that overflow to a non-precise
 * value because of their floating nature, for example `0.1 + 0.2`
 * @param {Number} n The number
 * @return {Number} The correctly rounded number
 */
