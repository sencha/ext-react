/**
 * @class Ext.grid.plugin.BaseExporter
 * @extend Ext.exporter.Plugin
 * Base class for the grid exporter plugin. It contains common functions for both classic and modern toolkits.
 *
 * This class is extended by the toolkit specific grid plugin.
 *
 * @private
 */

/**
 * @event beforedocumentsave
 * Fires on the grid panel before a document is exported and saved.
 * @param {Ext.grid.Panel} grid Reference to the grid panel
 * @param {Object} params Additional parameters sent with this event
 * @param {Object} params.config The config object used in the {@link #saveDocumentAs} method
 * @param {Ext.exporter.Base} params.exporter A reference to the exporter object used to save the document
 */
/**
 * @event documentsave
 * Fires on the grid panel whenever a document is exported and saved.
 * @param {Ext.grid.Panel} grid Reference to the grid panel
 * @param {Object} params Additional parameters sent with this event
 * @param {Object} params.config The config object used in the {@link #saveDocumentAs} method
 * @param {Ext.exporter.Base} params.exporter A reference to the exporter object used to save the document
 */
/**
 * @event dataready
 * Fires on the grid panel when the {@link Ext.exporter.data.Table data} is ready.
 * You could adjust styles or data before the document is generated and saved.
 * @param {Ext.grid.Panel} grid Reference to the grid panel
 * @param {Object} params Additional parameters sent with this event
 * @param {Object} params.config The config object used in the {@link #saveDocumentAs} method
 * @param {Ext.exporter.Base} params.exporter A reference to the exporter object used to save the document
 */

/**
 * Save the export file. This method is added to the grid panel as "saveDocumentAs".
 *
 * Pass in exporter specific configs to the config parameter.
 *
 * @method saveDocumentAs
 * @param {Ext.exporter.Base} config Config object used to initialize the proper exporter
 * @param {String} config.type Type of the exporter as defined in the exporter alias. Default is `excel`.
 * @param {String} [config.title] Title added to the export document
 * @param {String} [config.author] Who exported the document?
 * @param {String} [config.fileName] Name of the exported file, including the extension
 * @param {String} [config.charset] Exported file's charset
 *
 */

/**
 * Fetch the export data. This method is added to the grid panel as "getDocumentData".
 *
 * Pass in exporter specific configs to the config parameter.
 *
 * @method getDocumentData
 * @param {Ext.exporter.Base} config Config object used to initialize the proper exporter
 * @param {String} [config.type] Type of the exporter as defined in the exporter alias. Default is `excel`.
 * @param {String} [config.title] Title added to the export document
 * @param {String} [config.author] Who exported the document?
 * @return {String}
 *
 */

/**
 * @method prepareData
 * @inheritdoc
 */
