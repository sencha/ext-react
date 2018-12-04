/**
 * @class Ext.env.OS
 *
 * Provides information about operating system environment.
 *
 * Should not be manually instantiated unless for unit-testing.
 * Access the global instance stored in {@link Ext.os} instead.
 * @private
 */

/**
 * @property is
 * A "hybrid" property, can be either accessed as a method call, i.e:
 *
 *     if (Ext.os.is('Android')) {
 *         // ...
 *     }
 *
 * or as an object with boolean properties, i.e:
 *
 *     if (Ext.os.is.Android) {
 *         // ...
 *     }
 *
 * Versions can be conveniently checked as well. For example:
 *
 *     if (Ext.os.is.Android2) {
 *         // Equivalent to (Ext.os.is.Android && Ext.os.version.equals(2))
 *     }
 *
 *     if (Ext.os.is.iOS32) {
 *         // Equivalent to (Ext.os.is.iOS && Ext.os.version.equals(3.2))
 *     }
 *
 * Note that only {@link Ext.Version#getMajor major component} and {@link Ext.Version#getShortVersion simplified}
 * value of the version are available via direct property checking. Supported values are:
 *
 * - iOS
 * - iPad
 * - iPhone
 * - iPhone5 (also true for 4in iPods).
 * - iPod
 * - Android
 * - WebOS
 * - BlackBerry
 * - Bada
 * - MacOS
 * - Windows
 * - Linux
 * - Other
 * @member Ext.os
 * @param {String} name The OS name to check.
 * @return {Boolean}
 */

/**
 * @class Ext.os
 * @extends Ext.env.OS
 * @singleton
 * Provides useful information about the current operating system environment.
 *
 * Example:
 *
 *     if (Ext.os.is.Windows) {
 *         // Windows specific code here
 *     }
 *
 *     if (Ext.os.is.iOS) {
 *         // iPad, iPod, iPhone, etc.
 *     }
 *
 *     console.log("Version " + Ext.os.version);
 *
 * For a full list of supported values, refer to the {@link #is} property/method.
 *
 */

/**
 * @property {String} deviceType
 * The generic type of the current device.
 *
 * Possible values:
 *
 * - Phone
 * - Tablet
 * - Desktop
 *
 * For testing purposes the deviceType can be overridden by adding
 * a deviceType parameter to the URL of the page, like so:
 *
 *     http://localhost/mypage.html?deviceType=Tablet
 *
 * @member Ext.os
 */
