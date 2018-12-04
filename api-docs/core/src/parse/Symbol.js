/**
 * @class Ext.parse.Symbol
 * This class represents a symbol in the parser.
 * @private
 */

/**
 * This property holds the name of the property to update when a config provided is
 * not an object (just a value).
 * @property {String} defaultProperty
 */

/**
 * @method led
 * This abstract method is implemented by operators that follow their operand (like
 * a binary operator). When the symbol is encountered in an expression this method
 * is called. The name "led" stands for "left denotation".
 *
 * @param {Ext.parse.Symbol} left
 */

/**
 * @method nud
 * This abstract method is implemented by operators that precede their operand (like
 * a unary operator). When the symbol is encountered in an expression this method
 * is called. The name "nud" stands for "null denotation".
 */

/**
 * @method update
 * This method updates this symbol given an additional config object. This is used
 * when a symbol is placed in multiple categories (such `infix` and `prefix`). The
 * `priority` is the most likely value to update, but also a `led` or `nud` method
 * may be provided to complete the symbol.
 *
 * @param {Object} config
 */
