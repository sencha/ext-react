/**
 * @class Ext.grid.plugin.Exporter
 * @alias plugin.gridexporter
 * @extend Ext.grid.plugin.BaseExporter
 *
 * This plugin allows grid data export using various exporters. Each exporter should extend
 * the {@link Ext.exporter.Base} class.
 *
 * Two new methods are created on the grid panel by this plugin:
 *
 *  - saveDocumentAs(config): saves the document
 *  - getDocumentData(config): returns the document content
 *
 * The grid data is exported for all grid columns that have the flag
 * {@link Ext.grid.column.Column#ignoreExport ignoreExport} as false.
 *
 * If the grid store is grouped and you want the export to group your results
 * then use the following properties in the config object sent to the `saveDocumentAs` function:
 *
 * - includeGroups: set to true to include the groups
 * - includeSummary: set to true to include also group/grand summaries if proper `summaryType` was defined on columns
 *
 * During data export the data for each column could be formatted in multiple ways:
 *
 * - using the {@link Ext.grid.column.Column#exportStyle exportStyle} format
 * - using the {@link Ext.grid.column.Column#formatter formatter} if no `exportStyle` is defined
 * - using the {@link Ext.grid.column.Column#exportRenderer exportRenderer}
 *
 * If `exportStyle.format`, `formatter` and `exportRenderer` are all defined on a column then the `exportStyle.format`
 * wins and will be used to format the data for that column.
 *
 * Example usage:
 *
 *      {
 *          xtype: 'grid',
 *          plugins: [{
 *              type: 'gridexporter'
 *          }],
 *          columns: [{
 *              dataIndex: 'value',
 *              text: 'Total',
 *              exportStyle: {
 *                  format: 'Currency',
 *                  alignment: {
 *                      horizontal: 'Right'
 *                  }
 *              }
 *          }]
 *      }
 *
 *      grid.saveDocumentAs({
 *          type: 'xlsx',
 *          title: 'My export',
 *          fileName: 'myExport.xlsx'
 *      });
 *
 */
