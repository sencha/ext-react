/**
 * @class Ext.calendar.theme.Theme
 * @extend Ext.Base
 *
 * This class provides theming functionality for events in the calendar.
 *
 * The colors used for call calendars in an app can be stipulated by overriding this
 * class.  Below is an example override that sets the `colors`, `lightColor`, and
 * `darkColor` values:
 *
 *     Ext.define('MyApp.util.MyPalette', {
 *         override: 'Ext.calendar.theme.Theme',
 *         colors: [
 *             'rgb(44,151,222)',
 *             'rgb(233,75,53)',
 *             'rgb(30,206,109)',
 *             'rgb(156,86,184)',
 *             'rgb(60,214,220)',
 *             'rgb(232,126,3)',
 *             'rgb(0,189,156)'
 *         ],
 *         lightColor: 'rgb(238,238,238)',
 *         darkColor: 'rgb(34,34,34)'
 *     });
 *
 * @singleton
 */

/**
 * @property {String[]} colors
 * The list of primary colors to use for events. These colors will be used as
 * defaults if the event or owning calendar does not specify a color.
 */

/**
 * @property {String} [lightColor='#FFFFFF']
 * A complementary color to be used when the primary color is dark.
 */

/**
 * @property {String} [darkColor='#000000']
 * A complementary color to be used when the primary color is light.
 */
