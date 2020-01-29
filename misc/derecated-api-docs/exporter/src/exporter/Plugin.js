/**
 * @class Ext.exporter.Plugin
 * @extend Ext.plugin.Abstract
 * @alias plugin.exporterplugin
 *
 * This is the base class for an exporter plugin. It is extended by the exporter plugins
 * for grid panel and pivot grid.
 *
 * This could be used to create a plugin that allows a component to export tabular data.
 *
 * @private
 */

/**
 * @event beforedocumentsave
 * Fires on the component before a document is exported and saved.
 * @param {Ext.Component} component Reference to the component that uses this plugin
 * @param {Object} params Additional parameters sent with this event
 * @param {Object} params.config The config object used in the {@link #saveDocumentAs} method
 * @param {Ext.exporter.Base} params.exporter A reference to the exporter object used to save the document
 */
/**
 * @event documentsave
 * Fires on the component whenever a document is exported and saved.
 * @param {Ext.Component} component Reference to the component that uses this plugin
 * @param {Object} params Additional parameters sent with this event
 * @param {Object} params.config The config object used in the {@link #saveDocumentAs} method
 * @param {Ext.exporter.Base} params.exporter A reference to the exporter object used to save the document
 */
/**
 * @event dataready
 * Fires on the component when the {@link Ext.exporter.data.Table data} is ready.
 * You could adjust styles or data before the document is generated and saved.
 * @param {Ext.Component} component Reference to the component that uses this plugin
 * @param {Object} params Additional parameters sent with this event
 * @param {Object} params.config The config object used in the {@link #saveDocumentAs} method
 * @param {Ext.exporter.Base} params.exporter A reference to the exporter object used to save the document
 */

/**
 * @method saveDocumentAs
 * Save the export file. This method is added to the component as "saveDocumentAs".
 *
 * Pass in exporter specific configs to the config parameter.
 *
 * @param {Ext.exporter.Base} config Config object used to initialize the proper exporter
 * @param {String} config.type Type of the exporter as defined in the exporter alias. Default is `excel`.
 * @param {String} [config.title] Title added to the export document
 * @param {String} [config.author] Who exported the document?
 * @param {String} [config.fileName] Name of the exported file, including the extension
 * @param {String} [config.charset] Exported file's charset
 *
 * @return {Ext.promise.Promise}
 *
 */

/**
 * @method getDocumentData
 * Fetch the export data. This method is added to the component as "getDocumentData".
 *
 * Pass in exporter specific configs to the config parameter.
 *
 * @param {Ext.exporter.Base} config Config object used to initialize the proper exporter
 * @param {String} [config.type] Type of the exporter as defined in the exporter alias. Default is `excel`.
 * @param {String} [config.title] Title added to the export document
 * @param {String} [config.author] Who exported the document?
 * @return {String}
 *
 */

/**
 * @method getExportStyle
 * @param {Object/Array} style
 * @param {Object} config Configuration passed to saveDocumentAs and getDocumentData methods
 * @return {Object}
 */
