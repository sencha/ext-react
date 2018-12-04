/**
 * @class Ext.String
 * A collection of useful static methods to deal with strings.
 * @singleton
 */

/**
 * @method fromCodePoint
 * Creates a string created by using the specified sequence of code points.
 * @param {Number...} codePoint Codepoints from which to build the string.
 * @return {String} A string built from the sequence of code points passed.
 */

/**
 * @method insert
 * Inserts a substring into a string.
 * @param {String} s The original string.
 * @param {String} value The substring to insert.
 * @param {Number} index The index to insert the substring. Negative indexes will insert from the end of
 * the string. Example:
 *
 *     Ext.String.insert("abcdefg", "h", -1); // abcdefhg
 *
 * @return {String} The value with the inserted substring
 */

/**
 * @method startsWith
 * Checks if a string starts with a substring
 * @param {String} s The original string
 * @param {String} start The substring to check
 * @param {Boolean} [ignoreCase=false] True to ignore the case in the comparison
 */

/**
 * @method endsWith
 * Checks if a string ends with a substring
 * @param {String} s The original string
 * @param {String} end The substring to check
 * @param {Boolean} [ignoreCase=false] True to ignore the case in the comparison
 */

/**
 * @method createVarName
 * Converts a string of characters into a legal, parse-able JavaScript `var` name as long as the passed
 * string contains at least one alphabetic character. Non alphanumeric characters, and *leading* non alphabetic
 * characters will be removed.
 * @param {String} s A string to be converted into a `var` name.
 * @return {String} A legal JavaScript `var` name.
 */

/**
 * @method htmlEncode
 * Convert certain characters (&, <, >, ', and ") to their HTML character equivalents for literal display in web pages.
 * @param {String} value The string to encode.
 * @return {String} The encoded text.
 */

/**
 * @method htmlDecode
 * Convert certain characters (&, <, >, ', and ") from their HTML character equivalents.
 * @param {String} value The string to decode.
 * @return {String} The decoded text.
 */

/**
 * @method hasHtmlCharacters
 * Checks if a string has values needing to be html encoded.
 * @private
 * @param {String} s The string to test
 * @return {Boolean} `true` if the string contains HTML characters
 */

/**
 * @method addCharacterEntities
 * Adds a set of character entity definitions to the set used by
 * {@link Ext.String#htmlEncode} and {@link Ext.String#htmlDecode}.
 *
 * This object should be keyed by the entity name sequence,
 * with the value being the textual representation of the entity.
 *
 *      Ext.String.addCharacterEntities({
 *          '&amp;Uuml;':'Ü',
 *          '&amp;ccedil;':'ç',
 *          '&amp;ntilde;':'ñ',
 *          '&amp;egrave;':'è'
 *      });
 *      var s = Ext.String.htmlEncode("A string with entities: èÜçñ");
 *
 * __Note:__ the values of the character entities defined on this object are expected
 * to be single character values.  As such, the actual values represented by the
 * characters are sensitive to the character encoding of the JavaScript source
 * file when defined in string literal form. Script tags referencing server
 * resources with character entities must ensure that the 'charset' attribute
 * of the script node is consistent with the actual character encoding of the
 * server resource.
 *
 * The set of character entities may be reset back to the default state by using
 * the {@link Ext.String#resetCharacterEntities} method
 *
 * @param {Object} newEntities The set of character entities to add to the current
 * definitions.
 */

/**
 * @method resetCharacterEntities
 * Resets the set of character entity definitions used by
 * {@link Ext.String#htmlEncode} and {@link Ext.String#htmlDecode} back to the
 * default state.
 */

/**
 * @method urlAppend
 * Appends content to the query string of a URL, handling logic for whether to place
 * a question mark or ampersand.
 * @param {String} url The URL to append to.
 * @param {String} string The content to append to the URL.
 * @return {String} The resulting URL
 */

/**
 * @method trim
 * Trims whitespace from either end of a string, leaving spaces within the string intact.  Example:
 *
 *     var s = '  foo bar  ';
 *     alert('-' + s + '-');                   //alerts "- foo bar -"
 *     alert('-' + Ext.String.trim(s) + '-');  //alerts "-foo bar-"
 *
 * @param {String} string The string to trim.
 * @return {String} The trimmed string.
 */

/**
 * @method capitalize
 * Capitalize the first letter of the given string.
 * @param {String} string
 * @return {String}
 */

/**
 * @method uncapitalize
 * Uncapitalize the first letter of a given string.
 * @param {String} string
 * @return {String}
 */

/**
 * @method ellipsis
 * Truncate a string and add an ellipsis ('...') to the end if it exceeds the specified length.
 * @param {String} value The string to truncate.
 * @param {Number} length The maximum length to allow before truncating.
 * @param {Boolean} [word=false] `true` to try to find a common word break.
 * @return {String} The converted text.
 */

/**
 * @method escapeRegex
 * Escapes the passed string for use in a regular expression.
 * @param {String} string The string to escape.
 * @return {String} The escaped string.
 */

/**
 * @method createRegex
 * Creates a `RegExp` given a string `value` and optional flags. For example, the
 * following two regular expressions are equivalent.
 *
 *      var regex1 = Ext.String.createRegex('hello');
 *
 *      var regex2 = /^hello$/i;
 *
 * The following two regular expressions are also equivalent:
 *
 *      var regex1 = Ext.String.createRegex('world', false, false, false);
 *
 *      var regex2 = /world/;
 *
 * @param {String/RegExp} value The String to convert to a `RegExp`.
 * @param {Boolean} [startsWith=true] Pass `false` to allow a match to start
 * anywhere in the string. By default the `value` will match only at the start
 * of the string.
 * @param {Boolean} [endsWith=true] Pass `false` to allow the match to end before
 * the end of the string. By default the `value` will match only at the end of the
 * string.
 * @param {Boolean} [ignoreCase=true] Pass `false` to make the `RegExp` case
 * sensitive (removes the 'i' flag).
 * @since 5.0.0
 * @return {RegExp}
 */

/**
 * @method escape
 * Escapes the passed string for ' and \.
 * @param {String} string The string to escape.
 * @return {String} The escaped string.
 */

/**
 * @method toggle
 * Utility function that allows you to easily switch a string between two alternating values.  The passed value
 * is compared to the current string, and if they are equal, the other value that was passed in is returned.  If
 * they are already different, the first value passed in is returned.  Note that this method returns the new value
 * but does not change the current string.
 *
 *     // alternate sort directions
 *     sort = Ext.String.toggle(sort, 'ASC', 'DESC');
 *
 *     // instead of conditional logic:
 *     sort = (sort === 'ASC' ? 'DESC' : 'ASC');
 *
 * @param {String} string The current string.
 * @param {String} value The value to compare to the current string.
 * @param {String} other The new value to use if the string already equals the first value passed in.
 * @return {String} The new value.
 */

/**
 * @method leftPad
 * Pads the left side of a string with a specified character.  This is especially useful
 * for normalizing number and date strings.  Example usage:
 *
 *     var s = Ext.String.leftPad('123', 5, '0');
 *     // s now contains the string: '00123'
 *
 * @param {String} string The original string.
 * @param {Number} size The total length of the output string.
 * @param {String} [character=' '] (optional) The character with which to pad the original string.
 * @return {String} The padded string.
 */

/**
 * @method repeat
 * Returns a string with a specified number of repetitions a given string pattern.
 * The pattern be separated by a different string.
 *
 *      var s = Ext.String.repeat('---', 4); // = '------------'
 *      var t = Ext.String.repeat('--', 3, '/'); // = '--/--/--'
 *
 * @param {String} pattern The pattern to repeat.
 * @param {Number} count The number of times to repeat the pattern (may be 0).
 * @param {String} sep An option string to separate each pattern.
 */

/**
 * @method splitWords
 * Splits a string of space separated words into an array, trimming as needed. If the
 * words are already an array, it is returned.
 *
 * @param {String/Array} words
 */


/**
 * @method htmlEncode
 * @member Ext
 * @inheritdoc Ext.String#htmlEncode
 */

/**
 * @method htmlDecode
 * @member Ext
 * @inheritdoc Ext.String#htmlDecode
 */

/**
 * @method urlAppend
 * @member Ext
 * @inheritdoc Ext.String#urlAppend
 */
