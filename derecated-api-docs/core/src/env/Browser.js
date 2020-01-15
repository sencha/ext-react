/**
 * @class Ext.env.Browser
 * Provides information about browser.
 *
 * Should not be manually instantiated unless for unit-testing.
 * Access the global instance stored in {@link Ext.browser} instead.
 * @private
 */

/**
 * @property {String} userAgent
 * Browser User Agent string.
 */

/**
 * @property is
 * A "hybrid" property, can be either accessed as a method call, for example:
 *
 *     if (Ext.browser.is('IE')) {
 *         // ...
 *     }
 *
 * Or as an object with Boolean properties, for example:
 *
 *     if (Ext.browser.is.IE) {
 *         // ...
 *     }
 *
 * Versions can be conveniently checked as well. For example:
 *
 *     if (Ext.browser.is.IE10) {
 *         // Equivalent to (Ext.browser.is.IE && Ext.browser.version.equals(10))
 *     }
 *
 * __Note:__ Only {@link Ext.Version#getMajor major component}  and {@link Ext.Version#getShortVersion simplified}
 * value of the version are available via direct property checking.
 *
 * Supported values are:
 *
 * - IE
 * - Firefox
 * - Safari
 * - Chrome
 * - Opera
 * - WebKit
 * - Gecko
 * - Presto
 * - Trident
 * - WebView
 * - Other
 *
 * @param {String} name The OS name to check.
 * @return {Boolean}
 */

/**
 * @property {Boolean} isStrict
 * `true` if browser is using strict mode.
 */

/**
 * @property {Boolean} isSecure
 * `true` if page is running over SSL.
 */

/**
 * @class Ext.browser
 * @extends Ext.env.Browser
 * @singleton
 * Provides useful information about the current browser.
 *
 * Example:
 *
 *     if (Ext.browser.is.IE) {
 *         // IE specific code here
 *     }
 *
 *     if (Ext.browser.is.WebKit) {
 *         // WebKit specific code here
 *     }
 *
 *     console.log("Version " + Ext.browser.version);
 *
 * For a full list of supported values, refer to {@link #is} property/method.
 *
 */

/**
 * @property {String} SSL_SECURE_URL
 * URL to a blank file used by Ext when in secure mode for iframe src and onReady src
 * to prevent the IE insecure content warning (`'about:blank'`, except for IE
 * in secure mode, which is `'javascript:""'`).
 * @member Ext
 */