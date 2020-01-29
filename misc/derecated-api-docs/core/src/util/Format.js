/**
 * @class Ext.util.Format
 *  
 * This class is a centralized place for formatting functions. It includes
 * functions to format various different types of data, such as text, dates and numeric values.
 *  
 * ## Localization
 *
 * This class contains several options for localization. These can be set once the library has loaded,
 * all calls to the functions from that point will use the locale settings that were specified.
 *
 * Options include:
 *
 * - thousandSeparator
 * - decimalSeparator
 * - currencyPrecision
 * - currencySign
 * - currencyAtEnd
 *
 * This class also uses the default date format defined here: {@link Ext.Date#defaultFormat}.
 *
 * ## Using with renderers
 *
 * There are two helper functions that return a new function that can be used in conjunction with
 * grid renderers:
 *  
 *     columns: [{
 *         dataIndex: 'date',
 *         renderer: Ext.util.Format.dateRenderer('Y-m-d')
 *     }, {
 *         dataIndex: 'time',
 *         renderer: Ext.util.Format.numberRenderer('0.000')
 *     }]
 *  
 * Functions that only take a single argument can also be passed directly:
 *
 *     columns: [{
 *         dataIndex: 'cost',
 *         renderer: Ext.util.Format.usMoney
 *     }, {
 *         dataIndex: 'productCode',
 *         renderer: Ext.util.Format.uppercase
 *     }]
 *  
 * ## Using with XTemplates
 *
 * XTemplates can also directly use Ext.util.Format functions:
 *  
 *     new Ext.XTemplate([
 *         'Date: {startDate:date("Y-m-d")}',
 *         'Cost: {cost:usMoney}'
 *     ]);
 *
 * @singleton
 */

/**
 * @property {String} [defaultDateFormat='m/d/Y']
 * The global default date format.
 */

/**
 * @property {String} [thousandSeparator=","]
 * The character that the {@link #number} function uses as a thousand separator.
 *
 * This may be overridden in a locale file.
 * @locale
 */

/**
 * @property {String} [decimalSeparator="."]
 * The character that the {@link #number} function uses as a decimal point.
 *
 * This may be overridden in a locale file.
 * @locale
 */

/**
 * @property {Number} [currencyPrecision=2]
 * The number of decimal places that the {@link #currency} function displays.
 *
 * This may be overridden in a locale file.
 * @locale
 */

/**
 * @property {String} [currencySign="$"]
 * The currency sign that the {@link #currency} function displays.
 *
 * This may be overridden in a locale file.
 * @locale
 */

/**
 * @property {String} [currencySpacer='']
 * True to add a space between the currency and the value
 *
 * This may be overridden in a locale file.
 * @since 6.2.0
 * @locale
 */

/**
 * @property {String} [percentSign="%"]
 * The percent sign that the {@link #percent} function displays.
 *
 * This may be overridden in a locale file.
 * @locale
 */

/**
 * @property {Boolean} [currencyAtEnd=false]
 * This may be set to <code>true</code> to make the {@link #currency} function
 * append the currency sign to the formatted value.
 *
 * This may be overridden in a locale file.
 * @locale
 */

/**
 * @method nbsp
 * Returns a non-breaking space ("NBSP") for any "blank" value.
 * @param {Mixed} value
 * @param {Boolean} [strict=true] Pass `false` to convert all falsey values to an
 * NBSP. By default, only '', `null` and `undefined` will be converted.
 * @return {Mixed}
 * @since 6.2.0
 */

/**
 * @method undef
 * Checks a reference and converts it to empty string if it is undefined.
 * @param {Object} value Reference to check
 * @return {Object} Empty string if converted, otherwise the original value
 */

/**
 * @method defaultValue
 * Checks a reference and converts it to the default value if it's empty.
 * @param {Object} value Reference to check
 * @param {String} [defaultValue=""] The value to insert of it's undefined.
 * @return {String}
 */

/**
 * Returns a substring from within an original string.
 * @param {String} value The original text
 * @param {Number} start The start index of the substring
 * @param {Number} length The length of the substring
 * @return {String} The substring
 * @method substr
 */

/**
 * @method
 * Converts a string to all lower case letters.
 * @param {String} value The text to convert
 * @return {String} The converted text
 */

/**
 * @method uppercase
 * Converts a string to all upper case letters.
 * @param {String} value The text to convert
 * @return {String} The converted text
 */

/**
 * @method usMoney
 * Format a number as US currency.
 * @param {Number/String} value The numeric value to format
 * @return {String} The formatted currency string
 */

/**
 * @method currency
 * Format a number as a currency.
 * @param {Number/String} value The numeric value to format
 * @param {String} [sign] The currency sign to use (defaults to {@link #currencySign})
 * @param {Number} [decimals] The number of decimals to use for the currency
 * (defaults to {@link #currencyPrecision})
 * @param {Boolean} [end] True if the currency sign should be at the end of the string
 * (defaults to {@link #currencyAtEnd})
 * @param {String} [currencySpacer] True to add a space between the currency and value
 * @return {String} The formatted currency string
 */

/**
 * @method date
 * Formats the passed date using the specified format pattern.
 * Note that this uses the native Javascript Date.parse() method and is therefore subject to its idiosyncrasies.
 * Most formats assume the local timezone unless specified. One notable exception is 'YYYY-MM-DD' (note the dashes)
 * which is typically interpreted in UTC and can cause date shifting.
 *
 * @param {String/Date} value The value to format. Strings must conform to the format
 * expected by the JavaScript Date object's
 * [parse() method](http://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Date/parse).
 * @param {String} [format] Any valid date format string. Defaults to {@link Ext.Date#defaultFormat}.
 * @return {String} The formatted date string.
 */

/**
 * @method dateRenderer
 * Returns a date rendering function that can be reused to apply a date format multiple times efficiently.
 * @param {String} format Any valid date format string. Defaults to {@link Ext.Date#defaultFormat}.
 * @return {Function} The date formatting function
 */

/**
 * @method hex
 * Returns the given number as a base 16 string at least `digits` in length. If
 * the number is fewer digits, 0's are prepended as necessary. If `digits` is
 * negative, the absolute value is the *exact* number of digits to return. In this
 * case, if then number has more digits, only the least significant digits are
 * returned.
 *
 *      expect(Ext.util.Format.hex(0x12e4, 2)).toBe('12e4');
 *      expect(Ext.util.Format.hex(0x12e4, -2)).toBe('e4');
 *      expect(Ext.util.Format.hex(0x0e, 2)).toBe('0e');
 *
 * @param {Number} value The number to format in hex.
 * @param {Number} digits
 * @return {string}
 */

/**
 * @method or
 * Returns this result:
 *
 *      value || orValue
 *
 * The usefulness of this formatter method is in templates. For example:
 *
 *      {foo:or("bar")}
 *
 * @param {Boolean} value The "if" value.
 * @param {Mixed} orValue
 */

/**
 * @method pick
 * If `value` is a number, returns the argument from that index. For example
 *
 *      var s = Ext.util.Format.pick(2, 'zero', 'one', 'two');
 *      // s === 'two'
 *
 * Otherwise, `value` is treated in a truthy/falsey manner like so:
 *
 *      var s = Ext.util.Format.pick(null, 'first', 'second');
 *      // s === 'first'
 *
 *      s = Ext.util.Format.pick({}, 'first', 'second');
 *      // s === 'second'
 *
 * The usefulness of this formatter method is in templates. For example:
 *
 *      {foo:pick("F","T")}
 *
 *      {bar:pick("first","second","third")}
 *
 * @param {Boolean} value The "if" value.
 * @param {Mixed} firstValue
 * @param {Mixed} secondValue
 */

/**
 * @method lessThanElse
 * Compares `value` against `threshold` and returns:
 *
 * - if `value` < `threshold` then it returns `below`
 * - if `value` > `threshold` then it returns `above`
 * - if `value` = `threshold` then it returns `equal` or `above` when `equal` is missing
 *
 * The usefulness of this formatter method is in templates. For example:
 *
 *      {foo:lessThanElse(0, 'negative', 'positive')}
 *
 *      {bar:lessThanElse(200, 'lessThan200', 'greaterThan200', 'equalTo200')}
 *
 * @param {Number} value Value that will be checked
 * @param {Number} threshold Value to compare against
 * @param {Mixed} below Value to return when `value` < `threshold`
 * @param {Mixed} above Value to return when `value` > `threshold`. If `value` = `threshold` and
 * `equal` is missing then `above` is returned.
 * @param {Mixed} equal Value to return when `value` = `threshold`
 * @return {Mixed}
 */

/**
 * @method sign
 * Checks if `value` is a positive or negative number and returns the proper param.
 *
 * The usefulness of this formatter method is in templates. For example:
 *
 *      {foo:sign("clsNegative","clsPositive")}
 *
 * @param {Number} value
 * @param {Mixed} negative
 * @param {Mixed} positive
 * @param {Mixed} zero
 * @return {Mixed}
 */

/**
 * @method stripTags
 * Strips all HTML tags.
 * @param {Object} value The text from which to strip tags
 * @return {String} The stripped text
 */

/**
 * @method stripScripts
 * Strips all script tags.
 * @param {Object} value The text from which to strip script tags
 * @return {String} The stripped text
 */

/**
 * @method fileSize
 * Simple format for a file size (xxx bytes, xxx KB, xxx MB).
 * @param {Number/String} size The numeric value to format
 * @return {String} The formatted file size
 */

/**
 * It does simple math for use in a template, for example:
 *
 *     var tpl = new Ext.Template('{value} * 10 = {value:math("* 10")}');
 *
 * @return {Function} A function that operates on the passed value.
 * @method math
 */

/**
 * @method round
 * Rounds the passed number to the required decimal precision.
 * @param {Number/String} value The numeric value to round.
 * @param {Number} [precision] The number of decimal places to which to round the
 * first parameter's value. If `undefined` the `value` is passed to `Math.round`
 * otherwise the value is returned unmodified.
 * @return {Number} The rounded value.
 */

/**
 * @method number
 * Formats the passed number according to the passed format string.
 *
 * The number of digits after the decimal separator character specifies the number of
 * decimal places in the resulting string. The *local-specific* decimal character is
 * used in the result.
 *
 * The *presence* of a thousand separator character in the format string specifies that
 * the *locale-specific* thousand separator (if any) is inserted separating thousand groups.
 *
 * By default, "," is expected as the thousand separator, and "." is expected as the decimal separator.
 *
 * Locale-specific characters are always used in the formatted output when inserting
 * thousand and decimal separators. These can be set using the {@link #thousandSeparator} and
 * {@link #decimalSeparator} options.
 *
 * The format string must specify separator characters according to US/UK conventions ("," as the
 * thousand separator, and "." as the decimal separator)
 *
 * To allow specification of format strings according to local conventions for separator characters, add
 * the string `/i` to the end of the format string. This format depends on the {@link #thousandSeparator} and
 * {@link #decimalSeparator} options. For example, if using European style separators, then the format string
 * can be specified as `'0.000,00'`. This would be equivalent to using `'0,000.00'` when using US style formatting.
 *
 * Examples (123456.789):
 *
 * - `0` - (123457) show only digits, no precision
 * - `0.00` - (123456.79) show only digits, 2 precision
 * - `0.0000` - (123456.7890) show only digits, 4 precision
 * - `0,000` - (123,457) show comma and digits, no precision
 * - `0,000.00` - (123,456.79) show comma and digits, 2 precision
 * - `0,0.00` - (123,456.79) shortcut method, show comma and digits, 2 precision
 * - `0.####` - (123,456.789) Allow maximum 4 decimal places, but do not right pad with zeroes
 * - `0.00##` - (123456.789) Show at least 2 decimal places, maximum 4, but do not right pad with zeroes
 *
 * @param {Number} v The number to format.
 * @param {String} formatString The way you would like to format this text.
 * @return {String} The formatted number.
 */

/**
 * @method numberRenderer
 * Returns a number rendering function that can be reused to apply a number format multiple
 * times efficiently.
 *
 * @param {String} format Any valid number format string for {@link #number}
 * @return {Function} The number formatting function
 */

/**
 * @method percent
 * Formats the passed number as a percentage according to the passed format string.
 * The number should be between 0 and 1 to represent 0% to 100%.
 *
 * @param {Number} value The percentage to format.
 * @param {String} [formatString="0"] See {@link #number} for details.
 * @return {String} The formatted percentage.
 */

/**
 * @method attributes
 * Formats an object of name value properties as HTML element attribute values suitable for using when creating textual markup.
 * @param {Object} attributes An object containing the HTML attributes as properties eg: `{height:40, vAlign:'top'}`
 */

/**
 * @method plural
 * Selectively return the plural form of a word based on a numeric value.
 *
 * For example, the following template would result in "1 Comment".  If the
 * value of `count` was 0 or greater than 1, the result would be "x Comments".
 *
 *     var tpl = new Ext.XTemplate('{count:plural("Comment")}');
 *
 *     tpl.apply({
 *         count: 1
 *     }); // returns "1 Comment"
 *
 * Examples using the static `plural` method call:
 *
 *     Ext.util.Format.plural(2, 'Comment');
 *     // returns "2 Comments"
 *
 *     Ext.util.Format.plural(4, 'person', 'people');
 *     // returns "4 people"
 *
 * @param {Number} value The value to compare against
 * @param {String} singular The singular form of the word
 * @param {String} [plural] The plural form of the word (defaults to the
 * singular form with an "s" appended)
 * @return {String} output The pluralized output of the passed singular form
 */

/**
 * @method nl2br
 * Converts newline characters to the HTML tag `<br/>`
 *
 * @param {String} v The string value to format.
 * @return {String} The string with embedded `<br/>` tags in place of newlines.
 */

/**
 * @method capitalize
 * @inheritdoc Ext.String#method-capitalize
 * Alias for {@link Ext.String#capitalize}.
 */

/**
 * @method uncapitalize
 * @inheritdoc Ext.String#method-uncapitalize
 * Alias for {@link Ext.String#uncapitalize}.
 */

/**
 * @method ellipsis
 * @inheritdoc Ext.String#method-ellipsis
 * Alias for {@link Ext.String#ellipsis}.
 */

/**
 * @method escape
 * @inheritdoc Ext.String#method-escape
 * Alias for {@link Ext.String#escape}.
 */

/**
 * @method escapeRegex
 * @inheritdoc Ext.String#method-escapeRegex
 * Alias for {@link Ext.String#escapeRegex}.
 */

/**
 * @method htmlDecode
 * @inheritdoc Ext.String#method-htmlDecode
 * Alias for {@link Ext.String#htmlDecode}.
 */

/**
 * @method htmlEncode
 * @inheritdoc Ext.String#method-htmlEncode
 * Alias for {@link Ext.String#htmlEncode}.
 */

/**
 * @method leftPad
 * @inheritdoc Ext.String#method-leftPad
 * Alias for {@link Ext.String#leftPad}.
 */

/**
 * @method toggle
 * @inheritdoc Ext.String#method-toggle
 * Alias for {@link Ext.String#toggle}.
 */

/**
 * @method trim
 * @inheritdoc Ext.String#method-trim
 * Alias for {@link Ext.String#trim}.
 */

/**
 * @method parseBox
 * Parses a number or string representing margin sizes into an object.
 * Supports CSS-style margin declarations (e.g. 10, "10", "10 10", "10 10 10" and
 * "10 10 10 10" are all valid options and would return the same result).
 *
 * @param {Number/String} box The encoded margins
 * @return {Object} An object with margin sizes for top, right, bottom and left
 */

/**
 * @method resource
 * Resolves the specified resource `url` with an optional `prefix`. This resolution
 * is based on {@link Ext#resolveResource}. The prefix is intended to be used for
 * a package or resource pool identifier.
 *
 * @param {String} url The resource url to resolve
 * @param {String} [prefix] A prefix/identifier to include in the resolution.
 * @return {String}
 */

/**
 * @method uri
 * Formats the given value using `encodeURI`.
 * @param {String} value The value to encode.
 * @returns {string}
 * @since 6.2.0
 */

/**
 * @method uriCmp
 * Formats the given value using `encodeURIComponent`.
 * @param {String} value The value to encode.
 * @returns {string}
 * @since 6.2.0
 */

/**
 * @method word
 * Returns the word at the given `index`. Spaces and punctuation are considered
 * as word separators by default. For example:
 *
 *      console.log(Ext.util.Format.word('Hello, my name is Bob.', 2);
 *      // == 'name'
 *
 * @param {String} value The sentence to break into words.
 * @param {Number} index The 0-based word index.
 * @param {String/RegExp} [sep="[\W\s]+"] The pattern by which to separate words.
 * @return {String} The requested word or empty string.
 */
