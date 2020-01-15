/**
 * @class Ext.parse.Parser
 * @extend Ext.util.Fly
 * This class parses simple expressions. The parser can be enhanced by providing any of
 * the following configs:
 *
 *  * `constants`
 *  * `infix`
 *  * `infixRight`
 *  * `postfix`
 *  * `symbols`
 *
 * The parser requires a `{@link Ext.parse.Tokenizer tokenizer}` which can be configured
 * using the `tokenizer` config. The parser keeps the tokenizer instance and recycles it
 * as it is itself reused.
 *
 * See http://javascript.crockford.com/tdop/tdop.html for background on the techniques
 * used in this parser.
 * @private
 */

/**
 * @cfg {Object} constants
 * A map of identifiers that should be converted to literal value tokens. The
 * key in this object is the name of the constant and the value is the constant
 * value.
 *
 * If the value of a key is an object, it is a config object for the
 * `{@link Ext.parse.symbol.Constant constant}`.
 * @accessor
 */

/**
 * @cfg {Object} infix
 * A map of binary operators and their associated precedence (or binding priority).
 * These binary operators are left-associative.
 *
 * If the value of a key is an object, it is a config object for the
 * `{@link Ext.parse.symbol.Infix operator}`.
 * @accessor
 */

/**
 * @cfg {Object} infixRight
 * A map of binary operators and their associated precedence (or binding priority).
 * These binary operators are right-associative.
 *
 * If the value of a key is an object, it is a config object for the
 * `{@link Ext.parse.symbol.InfixRight operator}`.
 * @accessor
 */

/**
 * @cfg {Object} prefix
 * A map of unary operators. Typically no value is needed, so `0` is used.
 *
 * If the value of a key is an object, it is a config object for the
 * `{@link Ext.parse.symbol.Prefix operator}`.
 * @accessor
 */

/**
 * @cfg {Object} symbols
 * General language symbols. The values in this object are used as config objects
 * to configure the associated `{@link Ext.parse.Symbol symbol}`. If there is no
 * configuration, use `0` for the value.
 * @accessor
 */

/**
 * @cfg {Object/Ext.parse.Tokenizer} tokenizer
 * The tokenizer or a config object used to create one.
 * @accessor
 */

/**
 * @method advance
 * Advances the token stream and returns the next `token`.
 * @param {String} [expected] The type of symbol that is expected to follow.
 * @return {Ext.parse.Symbol}
 */

/**
 * @method parseExpression
 * @param {Number} [rightPriority=0] The precedence of the current operator.
 * @return {Ext.parse.Symbol} The parsed expression tree.
 */

/**
 * @method reset
 * Resets this parser given the text to parse or a `Tokenizer`.
 * @param {String} text
 * @param {Number} [pos=0] The character position at which to start.
 * @param {Number} [end] The index of the first character beyond the token range.
 * @return {Ext.parse.Parser}
 */

/**
 * @method syntaxError
 * This method is called when a syntax error is encountered. It updates `error`
 * and returns the error token.
 * @param {Number} at The index of the syntax error (optional).
 * @param {String} message The error message.
 * @return {Object} The error token.
 */
