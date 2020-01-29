/**
 * @class Ext.parse.Tokenizer
 * @extend Ext.util.Fly
 * This class is used to parse a string into a series of tokens. The syntax of the string
 * is JavaScript-like. This class is useful for creating higher-level parsers to allow
 * them to assemble tokens into a meaningful language (such as bind properties).
 *
 * The following set of punctuation characters are supported:
 *
 *      + - * / ! , : [ ] { } ( )
 *
 * This class does not currently separate the dot operator but instead includes it in a
 * single "ident" token. Whitespace between tokens is skipped.
 *
 * Tokens are parsed on-demand when `next` or `peek` are called. As much as possible,
 * the returned tokens are reused (e.g., to represent tokens like ":" the same object is
 * always returned). For tokens that contain values, a new object must be created to
 * return the value. Even so, the `is` property that describes the data is a reused object
 * in all cases.
 *
 *      var tokenizer;  // see below for getting instance
 *
 *      for (;;) {
 *          if (!(token = tokenizer.next())) {
 *              // When null is returned, there are no more tokens
 *
 *              break;
 *          }
 *
 *          var is = token.is;  // the token's classification object
 *
 *          if (is.error) {
 *              // Once an error is encountered, it will always be returned by
 *              // peek or next. The error is cleared by calling reset().
 *
 *              console.log('Syntax error', token.message);
 *              break;
 *          }
 *
 *          if (is.ident) {
 *              // an identifier...
 *              // use token.value to access the name or dot-path
 *
 *              var t = tokenizer.peek();  // don't consume next token (yet)
 *
 *              if (t && t.is.parenOpen) {
 *                  tokenizer.next();  // we'll take this one
 *
 *                  parseThingsInParens();
 *
 *                  t = tokenizer.next();
 *
 *                  mustBeCloseParen(t);
 *              }
 *          }
 *          else if (is.literal) {
 *              // a literal value (null, true/false, string, number)
 *              // use token.value to access the value
 *          }
 *          else if (is.at) {
 *              // @
 *          }
 *      }
 *
 * For details on the returned token see the `peek` method.
 *
 * There is a pool of flyweight instances to reduce memory allocation.
 *
 *      var tokenizer = Ext.parse.Tokenizer.fly('some.thing:foo()');
 *
 *      // use tokenizer (see above)
 *
 *      tokenizer.release();  // returns the fly to the flyweigt pool
 *
 * The `release` method returns the flyweight to the pool for later reuse. Failure to call
 * `release` will leave the flyweight empty which simply forces the `fly` method to always
 * create new instances on each call.
 *
 * A tokenizer can also be reused by calling its `reset` method and giving it new text to
 * tokenize.
 *
 *      this.tokenizer = new Ext.parse.Tokenizer();
 *
 *      // Later...
 *
 *      this.tokenizer.reset('some.thing:foo()');
 *
 *      // use tokenizer (see above)
 *
 *      this.tokenizer.reset();
 *
 * The final call to `reset` is optional but will avoid holding large text strings or
 * parsed results that rae no longer needed.
 *
 * @private
 */

/**
 * @cfg {Object} keywords
 * A map of keywords that should be mapped to other token types. By default the
 * `null`, `true` and `false` keywords are mapped to their respective literal
 * value tokens.
 * @accessor
 */

/**
 * @cfg {Object} operators
 * A map of operators and their names. The keys are the operator text and the
 * name (the values) are placed in the token's `is` object as `true`.
 * @accessor
 */

/**
 * @method next
 * Advance the token stream and return the next token. See `{@link #peek}` for a
 * description of the returned token.
 *
 * After calling this method, the next call to it or `peek` will not return the same
 * token but instead the token that follows the one returned.
 *
 * @return {Object} The next token in the stream (now consumed).
 */

/**
 * @method peek
 * Peeks at the next token stream and returns it. The token remains as the next token
 * and will be returned again by the next call to this method or `next`.
 *
 * At the end of the token stream, the token returned will be `null`.
 *
 * If a syntax error is encountered, the returned token will be an `Error` object. It
 * has the standard `message` property and also additional properties to make it more
 * like a standard token: `error: true`, `type: 'error'` and `at` (the index in the
 * string where the syntax error started.
 *
 * @return {Object} The next token in the stream (not yet consumed).
 *
 * @return {String} return.type The type of the token. This will be one of the
 * following values: `ident`, `literal` and `error` or the text of a operator
 * (i.e., "@", "!", ",", ":", "[", "]", "{", "}", "(" or ")").
 *
 * @return {String} return.value The value of a `"literal"` token.
 *
 * @return {Object} return.is An object containing boolean properties based on type.
 * @return {Boolean} return.is.literal True if the token is a literal value.
 * @return {Boolean} return.is.boolean True if the token is a literal boolean value.
 * @return {Boolean} return.is.error True if the token is an error.
 * @return {Boolean} return.is.ident True if the token is an identifier.
 * @return {Boolean} return.is.nil True if the token is the `null` keyword.
 * @return {Boolean} return.is.number True if the token is a number literal.
 * @return {Boolean} return.is.string True if the token is a string literal.
 * @return {Boolean} return.is.operator True if the token is a operator (i.e.,
 * "@!,:[]{}()"). operators will also have one of these boolean proprieties, in
 * the respective order: `at`, `bang`, `comma`, `colon`, `arrayOpen`, `arrayClose`,
 * `curlyOpen`, `curlyClose`, `parentOpen` and `parenClose`).
 */

/**
 * @method release
 * Returns this flyweight instance to the flyweight pool for reuse.
 */

/**
 * @method reset
 * Resets the tokenizer for a new string at a given offset (defaults to 0).
 *
 * @param {String} text The text to tokenize.
 * @param {Number} [pos=0] The character position at which to start.
 * @param {Number} [end] The index of the first character beyond the token range.
 * @returns {Ext.parse.Tokenizer}
 */

/**
 * @method advance
 * Parses and returns the next token from `text` starting at `pos`.
 * @return {Object} The next token
 */

/**
 * @method parse
 * Parses the current token that starts with the provided character `c` and
 * located at the current `pos` in the `text`.
 * @param {String} c The current character.
 * @return {Object} The next token
 */

/**
 * @method parseIdent
 * Parses the next identifier token.
 * @return {Object} The next token.
 */

/**
 * @method parseNumber
 * Parses the next number literal token.
 * @return {Object} The next token.
 */

/**
 * @method parseString
 * Parses the next string literal token.
 * @return {Object} The next token.
 */

/**
 * @method syntaxError
 * This method is called when a syntax error is encountered. It updates `error`
 * and returns the error token.
 * @param {Number} at The index of the syntax error (optional).
 * @param {String} message The error message.
 * @return {Object} The error token.
 */