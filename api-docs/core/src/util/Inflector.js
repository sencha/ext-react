/**
 * @class Ext.util.Inflector
 * @singleton
 * General purpose inflector class that {@link #pluralize pluralizes}, {@link #singularize singularizes} and
 * {@link #ordinalize ordinalizes} words. Sample usage:
 *
 *     //turning singular words into plurals
 *     Ext.util.Inflector.pluralize('word'); //'words'
 *     Ext.util.Inflector.pluralize('person'); //'people'
 *     Ext.util.Inflector.pluralize('sheep'); //'sheep'
 *
 *     //turning plurals into singulars
 *     Ext.util.Inflector.singularize('words'); //'word'
 *     Ext.util.Inflector.singularize('people'); //'person'
 *     Ext.util.Inflector.singularize('sheep'); //'sheep'
 *
 *     //ordinalizing numbers
 *     Ext.util.Inflector.ordinalize(11); //"11th"
 *     Ext.util.Inflector.ordinalize(21); //"21st"
 *     Ext.util.Inflector.ordinalize(1043); //"1043rd"
 *
 * # Customization
 *
 * The Inflector comes with a default set of US English pluralization rules. These can be augmented with additional
 * rules if the default rules do not meet your application's requirements, or swapped out entirely for other languages.
 * Here is how we might add a rule that pluralizes "ox" to "oxen":
 *
 *     Ext.util.Inflector.plural(/^(ox)$/i, "$1en");
 *
 * Each rule consists of two items - a regular expression that matches one or more rules, and a replacement string. In
 * this case, the regular expression will only match the string "ox", and will replace that match with "oxen". Here's
 * how we could add the inverse rule:
 *
 *     Ext.util.Inflector.singular(/^(ox)en$/i, "$1");
 *
 * Note that the ox/oxen rules are present by default.
 */

/**
 * @method singular
 * Adds a new singularization rule to the Inflector. See the intro docs for more information
 * @param {RegExp} matcher The matcher regex
 * @param {String} replacer The replacement string, which can reference matches from the matcher argument
 */

/**
 * @method plural
 * Adds a new pluralization rule to the Inflector. See the intro docs for more information
 * @param {RegExp} matcher The matcher regex
 * @param {String} replacer The replacement string, which can reference matches from the matcher argument
 */

/**
 * @method clearSingulars
 * Removes all registered singularization rules
 */

/**
 * @method clearPlurals
 * Removes all registered pluralization rules
 */

/**
 * @method isTransnumeral
 * Returns true if the given word is transnumeral (the word is its own singular and plural form - e.g. sheep, fish)
 * @param {String} word The word to test
 * @return {Boolean} True if the word is transnumeral
 */

/**
 * @method pluralize
 * Returns the pluralized form of a word (e.g. Ext.util.Inflector.pluralize('word') returns 'words')
 * @param {String} word The word to pluralize
 * @return {String} The pluralized form of the word
 */

/**
 * @method singularize
 * Returns the singularized form of a word (e.g. Ext.util.Inflector.singularize('words') returns 'word')
 * @param {String} word The word to singularize
 * @return {String} The singularized form of the word
 */

/**
 * @method classify
 * Returns the correct {@link Ext.data.Model Model} name for a given string. Mostly used internally by the data
 * package
 * @param {String} word The word to classify
 * @return {String} The classified version of the word
 */

/**
 * @method ordinalize
 * Ordinalizes a given number by adding a prefix such as 'st', 'nd', 'rd' or 'th' based on the last digit of the
 * number. 21 -> 21st, 22 -> 22nd, 23 -> 23rd, 24 -> 24th etc
 * @param {Number} number The number to ordinalize
 * @return {String} The ordinalized number
 */
