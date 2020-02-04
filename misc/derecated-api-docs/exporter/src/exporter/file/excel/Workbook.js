/**
 * @class Ext.exporter.file.excel.Workbook
 * @extend Ext.exporter.file.Base
 * This class generates an Excel 2003 XML workbook.
 *
 * The workbook is the top level object of an xml Excel file.
 * It should have at least one Worksheet before rendering.
 *
 * This is how an xml Excel file looks like:
 *
 *  - Workbook
 *      - Style[]
 *      - Worksheet[]
 *          - Table[]
 *              - Column[]
 *              - Row[]
 *                  - Cell[]
 *
 *
 * Check Microsoft's website for more info about Excel XML:
 * https://msdn.microsoft.com/en-us/Library/aa140066(v=office.10).aspx
 *
 *
 * Here is an example of how to create an Excel XML document:
 *
 *      var workbook = Ext.create('Ext.exporter.file.excel.Workbook', {
 *              title:  'My document',
 *              author: 'John Doe'
 *          }),
 *          table = workbook.addWorksheet({
 *              name:   'Sheet 1'
 *          }).addTable();
 *
 *      // add formatting to the first two columns of the spreadsheet
 *      table.addColumn({
 *          width:  120,
 *          styleId: workbook.addStyle({
 *              format: 'Long Time'
 *          }).getId()
 *      });
 *      table.addColumn({
 *          width:  100,
 *          styleId: workbook.addStyle({
 *              format: 'Currency'
 *          }).getId()
 *      });
 *
 *      // add rows and cells with data
 *      table.addRow().addCell([{
 *          value: 'Date'
 *      },{
 *          value: 'Value'
 *      }]);
 *      table.addRow().addCell([{
 *          value: new Date('06/17/2015')
 *      },{
 *          value: 15
 *      }]);
 *      table.addRow().addCell([{
 *          value: new Date('06/18/2015')
 *      },{
 *          value: 30
 *      }]);
 *
 *      //add a formula on the 4th row which sums up the previous 2 rows
 *      table.addRow().addCell({
 *          index: 2,
 *          formula: '=SUM(R[-2]C:R[-1]C)'
 *      });
 *
 *      // save the document in the browser
 *      Ext.exporter.File.saveAs(workbook.render(), 'document.xml', 'UTF-8');
 *
 */

/**
 * @cfg {String} [title="Workbook"]
 *
 * The title of the workbook
 * @accessor
 */

/**
 * @cfg {String} [author="Sencha"]
 *
 * The author of the generated Excel file
 * @accessor
 */

/**
 * @cfg {Number} [windowHeight=9000]
 *
 * Excel window height
 * @accessor
 */

/**
 * @cfg {Number} [windowWidth=50000]
 *
 * Excel window width
 * @accessor
 */

/**
 * @cfg {Boolean} [protectStructure=false]
 *
 * Protect structure
 * @accessor
 */

/**
 * @cfg {Boolean} [protectWindows=false]
 *
 * Protect windows
 * @accessor
 */

/**
 * @cfg {Ext.exporter.file.excel.Style[]} [styles=[]]
 *
 * Collection of styles available in this workbook
 * @accessor
 */

/**
 * @cfg {Ext.exporter.file.excel.Worksheet[]} [worksheets=[]]
 *
 * Collection of worksheets available in this workbook
 * @accessor
 */

/**
 * @method getStyles
 * @returns {Ext.util.Collection}
 *
 * Returns the collection of styles available in this workbook
 */

/**
 * @method getWorksheets
 * @returns {Ext.util.Collection}
 *
 * Returns the collection of worksheets available in this workbook
 */

/**
 * @method addStyle
 * Convenience method to add styles. You can also use workbook.getStyles().add(config).
 * @param {Object/Array} config
 * @returns {Ext.exporter.file.excel.Style/Ext.exporter.file.excel.Style[]}
 */

/**
 * @method getStyle
 * Convenience method to fetch a style by its id.
 * @param id
 * @returns {Ext.exporter.file.excel.Style}
 */

/**
 * @method addWorksheet
 * Convenience method to add worksheets. You can also use workbook.getWorksheets().add(config).
 * @param {Object/Array} config
 * @returns {Ext.exporter.file.excel.Worksheet/Ext.exporter.file.excel.Worksheet[]}
 */

/**
 * @method getWorksheet
 * Convenience method to fetch a worksheet by its id.
 * @param id
 * @returns {Ext.exporter.file.excel.Worksheet}
 */
