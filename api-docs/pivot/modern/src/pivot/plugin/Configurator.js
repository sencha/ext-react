/**
 * @class Ext.pivot.plugin.Configurator
 * @extend Ext.plugin.Abstract
 * @alias plugin.pivotconfigurator
 * This plugin allows the end user to configure the pivot component.
 *
 * It adds the following methods to the pivot grid:
 * - showConfigurator: which when called will show the configurator panel
 * - hideConfigurator: which when called will hide the configurator panel
 *
 * The configurator panel will be shown when the end-user does a `longpress` event
 * on the column headers.
 */

/**
 * Fired on the pivot component before a configurator field is moved.
 *
 * Return false if you don't want to move that field.
 *
 * @event beforemoveconfigfield
 * @param {Ext.pivot.plugin.configurator.Panel} panel Configurator panel
 * @param {Object} config
 * @param {Ext.pivot.plugin.configurator.Container} config.fromContainer Source container to move from
 * @param {Ext.pivot.plugin.configurator.Container} config.toContainer Destination container to move to
 * @param {Ext.pivot.plugin.configurator.Field} config.field Field configuration
 */

/**
 * Fired on the pivot component before the pivot settings container is shown.
 *
 * Return false if you don't want to show the container.
 *
 * @event beforeshowpivotsettings
 * @param {Ext.pivot.plugin.configurator.Panel} panel Configurator panel
 * @param {Object} config
 * @param {Ext.pivot.plugin.configurator.window.Settings} config.container Form panel container where you can inject
 * additional fields
 * @param {Object} config.settings Settings that will be loaded into the form
 */

/**
 * Fired on the pivot component after the configurator pivot settings container is shown.
 *
 * @event showpivotsettings
 * @param {Ext.pivot.plugin.configurator.Panel} panel Configurator panel
 * @param {Object} config
 * @param {Ext.pivot.plugin.configurator.window.Settings} config.container Form panel container where you can inject
 * additional fields
 * @param {Object} config.settings Settings that were loaded into the form
 */

/**
 * Fired on the pivot component before settings are applied to the pivot matrix.
 *
 * Return false if you don't want to apply the settings to the pivot matrix.
 *
 * @event beforeapplypivotsettings
 * @param {Ext.pivot.plugin.configurator.Panel} panel Configurator panel
 * @param {Object} config
 * @param {Ext.pivot.plugin.configurator.Settings} config.container Form panel container that contains all
 * pivot matrix settings.
 * @param {Object} config.settings Settings that will be loaded into the form
 */

/**
 * Fired on the pivot component after settings are applied to the pivot matrix.
 *
 * @event applypivotsettings
 * @param {Ext.pivot.plugin.configurator.Panel} panel Configurator panel
 * @param {Object} config
 * @param {Ext.pivot.plugin.configurator.Settings} config.container Form panel container where you can inject
 * additional fields
 * @param {Object} config.settings Settings that were loaded into the form
 */

/**
 * Fired on the pivot component before the field settings container is shown.
 *
 * Return false if you don't want to show the field settings container.
 *
 * @event beforeshowconfigfieldsettings
 * @param {Ext.pivot.plugin.configurator.Panel} panel Configurator panel
 * @param {Object} config
 * @param {Ext.pivot.plugin.configurator.Form} config.container Form panel container where you can inject
 * additional fields
 * @param {Object} config.settings Settings that will be loaded into the form
 */

/**
 * Fired on the pivot component after the configurator field settings container is shown.
 *
 * @event showconfigfieldsettings
 * @param {Ext.pivot.plugin.configurator.Panel} panel Configurator panel
 * @param {Object} config
 * @param {Ext.pivot.plugin.configurator.Form} config.container Form panel container where you can inject
 * additional fields
 * @param {Object} config.settings Settings that were loaded into the form
 */

/**
 * Fired on the pivot component before settings are applied to the configurator field.
 *
 * Return false if you don't want to apply the settings to the field.
 *
 * @event beforeapplyconfigfieldsettings
 * @param {Ext.pivot.plugin.configurator.Panel} panel Configurator panel
 * @param {Object} config
 * @param {Ext.pivot.plugin.configurator.Form} config.container Form panel container that contains all field settings
 * @param {Object} config.settings Settings that will be loaded into the form
 */

/**
 * Fired on the pivot component after settings are applied to the configurator field.
 *
 * @event applyconfigfieldsettings
 * @param {Ext.pivot.plugin.configurator.Panel} panel Configurator panel
 * @param {Object} config
 * @param {Ext.pivot.plugin.configurator.Form} config.container Form panel container that contains all field settings
 * @param {Object} config.settings Settings that were loaded into the form
 */

/**
 * Fired on the pivot component before the new configuration is applied.
 *
 * Return false if you don't want to apply the new configuration to the pivot grid.
 *
 * @event beforeconfigchange
 * @param {Ext.pivot.plugin.configurator.Panel} panel Configurator panel
 * @param {Object} config Config object used to reconfigure the pivot
 */

/**
 * Fired on the pivot component when the configuration changes.
 *
 * @event configchange
 * @param {Ext.pivot.plugin.configurator.Panel} panel Configurator panel
 * @param {Object} config Config object used to reconfigure the pivot
 */

/**
 * Fired on the pivot component when the configurator panel is visible
 *
 * @event showconfigpanel
 * @param {Ext.pivot.plugin.configurator.Panel} panel Configurator panel
 */

/**
 * Fired on the pivot component when the configurator panel is disabled
 *
 * @event hideconfigpanel
 * @param {Ext.pivot.plugin.configurator.Panel} panel Configurator panel
 */

/**
 * @cfg {Ext.pivot.plugin.configurator.Field[]} [fields=[]]
 *
 * This is the array of fields you want to be used in the configurator.
 *
 * If no fields are defined then all fields are fetched from the store model if
 * a {@link Ext.pivot.matrix.Local Local} matrix is used.
 *
 * The fields are indexed by the dataIndex supplied to them which means that you can't have two fields
 * sharing the same dataIndex. If you want to define two fields that share the same dataIndex then
 * it's best to use a unique dataIndex for the 2nd field and define a grouperFn on it.
 *
 * The dimensions that are configured on the pivot component but do not exist in this fields collection
 * will be added here with a set of default settings.
 */
/**
 * @cfg {Number} [width=400]
 *
 * The width of the configurator panel.
 */

/**
 * @cfg {Object} panel
 *
 * Configuration object used to instantiate the configurator panel.
 */

/**
 * @cfg {Object} panelWrapper
 *
 * Configuration object used to wrap the configurator panel when needed.
 */

/**
 * @cfg {Boolean} [panelWrap=true]
 *
 * Enable or disable the configurator panel wrapper.
 * @accessor
 */
