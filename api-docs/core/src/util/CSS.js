/**
 * @class Ext.util.CSS
 * Utility class for manipulating CSS rules
 * @singleton
 */

/**
 * @method createStyleSheet
 * Creates a stylesheet from a text blob of rules.
 * These rules will be wrapped in a STYLE tag and appended to the HEAD of the document.
 * @param {String} cssText The text containing the css rules
 * @param {String} id An id to add to the stylesheet for later removal
 * @return {CSSStyleSheet}
 */

/**
 * @method removeStyleSheet
 * Removes a style or link tag by id
 * @param {String/CSSStyleSheet} stylesheet The id of the style tag, or the CSSStyleSheet
 * reference to remove
 */

/**
 * @method swapStyleSheet
 * Dynamically swaps an existing stylesheet reference for a new one
 * @param {String} id The id of an existing link tag to remove
 * @param {String} url The href of the new stylesheet to include
 */

/**
 * @method getRules
 * Gets all css rules for the document
 * @param {Boolean} refreshCache true to refresh the internal cache
 * @return {Object} An object (hash) of rules indexed by selector
 */

/**
 * @method refreshCache
 * Refresh the rule cache if you have dynamically added stylesheets
 * @return {Object} An object (hash) of rules indexed by selector
 */

/**
 * @method getRule
 * Gets an an individual CSS rule by selector(s)
 * @param {String/String[]} selector The CSS selector or an array of selectors to try. The first selector that is found is returned.
 * @param {Boolean} refreshCache true to refresh the internal cache if you have recently updated any rules or added styles dynamically
 * @return {CSSStyleRule} The CSS rule or null if one is not found
 */

/**
 * @method createRule
 * Creates a rule.
 * @param {CSSStyleSheet} styleSheet The StyleSheet to create the rule in as returned from {@link #createStyleSheet}.
 * @param {String} selector The selector to target the rule.
 * @param {String} property The cssText specification eg `"color:red;font-weight:bold;text-decoration:underline"`
 * @return {CSSStyleRule} The created rule
 */

/**
 * @method updateRule
 * Updates a rule property
 * @param {String/String[]} selector If it's an array it tries each selector until it finds one. Stops immediately once one is found.
 * @param {String} property The css property or a cssText specification eg `"color:red;font-weight:bold;text-decoration:underline"`
 * @param {String} value The new value for the property
 * @return {Boolean} true If a rule was found and updated
 */
