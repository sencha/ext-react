/**
 * @class Ext.pivot.plugin.Exporter
 * @extend Ext.exporter.Plugin
 * @alias plugin.pivotexporter
 * @alias plugin.mzexcelexport
 *
 * This plugin allows pivot grid data export using various exporters. Each exporter should extend
 * the {@link Ext.exporter.Base} class.
 *
 * Two new methods are created on the pivot grid by this plugin:
 *
 *  - saveDocumentAs(config): saves the document
 *  - getDocumentData(config): returns the document content
 *
 * Example usage:
 *
 *
 *      {
 *          xtype: 'pivotgrid',
 *          plugins: 'pivotexporter'
 *      }
 *
 *      pivot.saveDocumentAs({
 *          type: 'xlsx',
 *          title: 'My export',
 *          fileName: 'myExport.xlsx'
 *      });
 *
 *
 * When the exported data needs to be formatted then the {@link Ext.pivot.dimension.Item#exportStyle}
 * can be used on either left axis or aggregate dimensions.
 *
 *      {
 *          xtype: 'pivotgrid',
 *
 *          matrix: {
 *              aggregate: [{
 *                  dataIndex:  'value',
 *                  header:     'Total',
 *                  aggregator: 'sum',
 *                  exportStyle: {
 *                      format: 'Currency',
 *                      alignment: {
 *                          horizontal: 'Right'
 *                      }
 *                  }
 *              }],
 *
 *              leftAxis: [{
 *                  dataIndex:  'date',
 *                  header:     'Transaction date',
 *                  exportStyle: {
 *                      format: 'Short Date',
 *                      alignment: {
 *                          horizontal: 'Right'
 *                      }
 *                  }
 *              },{
 *                  dataIndex:  'company',
 *                  header:     'Company',
 *                  sortable:   false
 *              }]
 *          }
 *          // ...
 *      }
 *
 */

/**
 * @event beforedocumentsave
 * Fires on the pivot grid before a document is exported and saved.
 * @param {Ext.pivot.Grid} pivotGrid Reference to the pivot grid
 * @param {Object} params Additional parameters sent with this event
 * @param {Object} params.config The config object used in the {@link #saveDocumentAs} method
 * @param {Ext.exporter.Base} params.exporter A reference to the exporter object used to save the document
 */
/**
 * @event documentsave
 * Fires on the pivot grid whenever a document is exported and saved.
 * @param {Ext.pivot.Grid} pivotGrid Reference to the pivot grid
 * @param {Object} params Additional parameters sent with this event
 * @param {Object} params.config The config object used in the {@link #saveDocumentAs} method
 * @param {Ext.exporter.Base} params.exporter A reference to the exporter object used to save the document
 */
/**
 * @event dataready
 * Fires on the pivot grid when the {Ext.exporter.data.Table data object} is ready.
 * You could adjust styles or data before the document is generated and saved.
 * @param {Ext.pivot.Grid} pivotGrid Reference to the pivot grid
 * @param {Object} params Additional parameters sent with this event
 * @param {Object} params.config The config object used in the {@link #saveDocumentAs} method
 * @param {Ext.exporter.Base} params.exporter A reference to the exporter object used to save the document
 */
