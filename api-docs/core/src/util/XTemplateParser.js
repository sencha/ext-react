/**
 * @class Ext.util.XTemplateParser
 * This class parses the XTemplate syntax and calls abstract methods to process the parts.
 * @private
 */

/**
 * @property {Number} level The 'for' or 'foreach' loop context level. This is adjusted
 * up by one prior to calling {@link #doFor} or {@link #doForEach} and down by one after
 * calling the corresponding {@link #doEnd} that closes the loop. This will be 1 on the
 * first {@link #doFor} or {@link #doForEach} call.
 */

/**
 * This method is called to process a piece of raw text from the tpl.
 * @param {String} text
 * @method doText
 */

/**
 * This method is called to process expressions (like `{[expr]}`).
 * @param {String} expr The body of the expression (inside "{[" and "]}").
 * @method doExpr
 */

/**
 * This method is called to process simple tags (like `{tag}`).
 * @method doTag
 */

/**
 * This method is called to process `<tpl else>`.
 * @method doElse
 */

/**
 * This method is called to process `{% text %}`.
 * @param {String} text
 * @method doEval
 */

/**
 * This method is called to process `<tpl if="action">`. If there are other attributes,
 * these are passed in the actions object.
 * @param {String} action
 * @param {Object} actions Other actions keyed by the attribute name (such as 'exec').
 * @method doIf
 */

/**
 * This method is called to process `<tpl elseif="action">`. If there are other attributes,
 * these are passed in the actions object.
 * @param {String} action
 * @param {Object} actions Other actions keyed by the attribute name (such as 'exec').
 * @method doElseIf
 */

/**
 * This method is called to process `<tpl switch="action">`. If there are other attributes,
 * these are passed in the actions object.
 * @param {String} action
 * @param {Object} actions Other actions keyed by the attribute name (such as 'exec').
 * @method doSwitch
 */

/**
 * This method is called to process `<tpl case="action">`. If there are other attributes,
 * these are passed in the actions object.
 * @param {String} action
 * @param {Object} actions Other actions keyed by the attribute name (such as 'exec').
 * @method doCase
 */

/**
 * This method is called to process `<tpl default>`.
 * @method doDefault
 */

/**
 * This method is called to process `</tpl>`. It is given the action type that started
 * the tpl and the set of additional actions.
 * @param {String} type The type of action that is being ended.
 * @param {Object} actions The other actions keyed by the attribute name (such as 'exec').
 * @method doEnd
 */

/**
 * This method is called to process `<tpl for="action">`. If there are other attributes,
 * these are passed in the actions object.
 * @param {String} action
 * @param {Object} actions Other actions keyed by the attribute name (such as 'exec').
 * @method doFor
 */

/**
 * This method is called to process `<tpl foreach="action">`. If there are other
 * attributes, these are passed in the actions object.
 * @param {String} action
 * @param {Object} actions Other actions keyed by the attribute name (such as 'exec').
 * @method doForEach
 */

/**
 * This method is called to process `<tpl exec="action">`. If there are other attributes,
 * these are passed in the actions object.
 * @param {String} action
 * @param {Object} actions Other actions keyed by the attribute name.
 * @method doExec
 */

/**
 * This method is called to process an empty `<tpl>`. This is unlikely to need to be
 * implemented, so a default (do nothing) version is provided.
 * @method doTpl
 */
