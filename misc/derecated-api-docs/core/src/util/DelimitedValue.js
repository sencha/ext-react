/**
 * @class Ext.util.DelimitedValue
 * This base class contains utility methods for dealing with formats such as CSV (Comma
 * Separated Values) as specified in <a href="http://tools.ietf.org/html/rfc4180">RFC 4180</a>.
 *
 * The base class implements the mechanics and is governed by these config options:
 *
 *  * `{@link #delimiter}`
 *  * `{@link #lineBreak}`
 *  * `{@link #quote}`
 *
 * These options affect the `{@link #method-encode}` and `{@link #method-decode}` methods.
 * When *decoding*, however, `{@link #lineBreak}` is ignored and instead each line can
 * be separated by any standard line terminator character or character sequence:
 *
 *  * ```\u000a```
 *  * ```\u000d```
 *  * ```\u000d\u000a```
 *
 * Strings which contain the {@link #delimiter} character are quoted using the
 * {@link #quote} character, and any internal {@link #quote} characters are doubled.
 *
 * *Important*
 * While the primary use case is to encode strings, other atomic data types can be encoded
 * as values within a line such as:
 *
 *  * Number
 *  * Boolean
 *  * Date (encoded as an <a href="http://www.iso.org/iso/home/standards/iso8601.htm">ISO 8601</a> date string.)
 *  * null (encoded as an empty string.)
 *  * undefined (encoded as an empty string.)
 *
 * Not that when *decoding*, all data is read as strings. This class does not convert
 * incoming data. To do that, use an {@link Ext.data.reader.Array ArrayReader}.
 *
 * See `{@link Ext.util.CSV}` and  `{@link Ext.util.TSV}` for pre-configured instances.
 *
 * @since 5.1.0
 */

/**
 * @cfg {String} [dateFormat="C"]
 * The {@link Ext.Date#format format} to use for dates
 */

/**
 * @cfg {String} [delimiter="\t"]
 * The string used to separate the values in a row. Common values for this config
 * are comma (",") and tab ("\t"). See `{@link Ext.util.CSV}` and  `{@link Ext.util.TSV}`
 * for pre-configured instances of these formats.
 */

/**
 * @cfg {String} [lineBreak="\n"]
 * The string used by `{@link #encode}` to separate each row. The `{@link #decode}`
 * method accepts all forms of line break.
 */

/**
 * @cfg {String} [quote=""]
 * The character to use as to quote values that contain the special `delimiter`
 * or `{@link #lineBreak}` characters.
 */

/**
 * @method decode
 * Decodes a string of encoded values into an array of rows. Each row is an array of
 * strings.
 *
 * Note that this function does not convert the string values in each column into
 * other data types. To do that, use an {@link Ext.data.reader.Array ArrayReader}.
 *
 * For example:
 *
 *     Ext.util.CSV.decode('"foo ""bar"", bletch",Normal String,2010-01-01T21:45:32.004Z\u000a3.141592653589793,1,false');
 *
 * produces the following array of string arrays:
 *
 *     [
 *         ['foo "bar", bletch','Normal String', '2010-01-01T21:45:32.004Z'],
 *         ['3.141592653589793', '1', 'false']
 *     ]
 *
 * @param {String} input The string to parse.
 *
 * @param {String} [delimiter] The column delimiter to use if the default value
 * of {@link #cfg-delimiter delimiter} is not desired.
 *
 * @return {String[][]} An array of rows where each row is an array of Strings.
 */

/**
 * @method encode
 * Converts a two-dimensional array into an encoded string.
 *
 * For example:
 *
 *     Ext.util.CSV.encode([
 *         ['foo "bar", bletch', 'Normal String', new Date()],
 *         [Math.PI, 1, false]
 *     ]);
 *
 * The above produces the following string:
 *
 *     '"foo ""bar"", bletch",Normal String,2010-01-01T21:45:32.004Z\u000a3.141592653589793,1,false'
 *
 * @param {Mixed[][]} input An array of row data arrays.
 *
 * @param {String} [delimiter] The column delimiter to use if the default value
 * of {@link #cfg-delimiter delimiter} is not desired.
 *
 * @return {String} A string in which data items are separated by {@link #delimiter}
 * characters, and rows are separated by {@link #lineBreak} characters.
 */
