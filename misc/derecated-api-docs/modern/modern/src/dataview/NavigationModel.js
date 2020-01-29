/**
 * @class Ext.dataview.NavigationModel
 * @extend Ext.Evented
 * @alias navmodel.dataview
 * @private
 */

/**
 * @property {Ext.dataview.Location} lastLocation
 * This is the location that we last positively focused upon, whether or not focus
 * has been lost from the view, and the location has been cleared.
 *
 * Contrast this with {@link #property!previousLocation).
 */

/**
 * @property {Ext.dataview.Location} prevLocation
 * This is the location that we previously *`set`*, whether it was `null` or not.
 * So if focus is not currently in the view, this will be null.
 *
 * Contrast this with {@link #property!lastLocation).
 */

/**
 * @method setLocation
 * Focuses the passed position, and optionally selects that position.
 * @param {Ext.dataview.Location/Ext.data.Model/Number} location The location to focus.
 * @param {Object} [options]
 * @param {Object} [options.event] The UI event which caused the navigation if any.
 * @param {Object} [options.select] Pass as `true` to also select the location.
 */
