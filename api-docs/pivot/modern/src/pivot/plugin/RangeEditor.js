/**
 * @class Ext.pivot.plugin.RangeEditor
 * @extend Ext.plugin.Abstract
 * @alias plugin.pivotrangeeditor
 * This plugin allows the user to modify records behind a pivot cell.
 *
 * The user has to double click that cell to open the range editor window.
 *
 * The following types of range editing are available:
 *
 * - `percentage`: the user fills in a percentage that is applied to each record.
 * - `increment`:  the user fills in a value that is added to each record.
 * - `overwrite`:  the new value filled in by the user overwrites each record.
 * - `uniform`:  replace sum of values with a provided value using uniform distribution
 *
 * More pivot updater types can be defined by extending {@link Ext.pivot.update.Base}.
 *
 * **Note:** Only works when using a {@link Ext.pivot.matrix.Local} matrix on a pivot grid.
 */

/**
 * Fires on the pivot grid before updating all result records.
 *
 * @event pivotbeforeupdate
 * @param {Ext.pivot.update.Base} updater Reference to the updater object
 */

/**
 * Fires on the pivot grid after updating all result records.
 *
 * @event pivotupdate
 * @param {Ext.pivot.update.Base} updater Reference to the updater object
 */

/**
 * Fired on the pivot component when the range editor window is visible
 *
 * @event showrangeeditorpanel
 * @param {Ext.Sheet} panel Range editor sheet
 */

/**
 * Fired on the pivot component when the range editor window is hidden
 *
 * @event hiderangeeditorpanel
 * @param {Ext.Sheet} panel Range editor sheet
 */

/**
 * @cfg {Array} [updaters=[]]
 *
 * Define here the updaters available for the user.
 * @accessor
 */

/**
 * @cfg {String} [defaultUpdater='uniform']
 *
 * Define which updater is selected by default.
 * @accessor
 */

/**
 * @cfg {Number} [width=400]
 *
 * Width of the viewer's window.
 * @accessor
 */

/**
 * @cfg {Object} panel
 *
 * Configuration object used to instantiate the range editor panel.
 * @accessor
 */

/**
 * @cfg {Object} panelWrapper
 *
 * Configuration object used to wrap the range editor panel when needed.
 * @accessor
 */


/**
 * @cfg {Boolean} [panelWrap=true]
 *
 * Enable or disable the configurator panel wrapper.
 * @accessor
 */
