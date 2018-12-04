/**
 * @class Ext.exporter.excel.Xml
 * @extend Ext.exporter.Base
 * @alias exporter.excel03
 * This exporter produces Microsoft Excel 2003 XML files for the supplied data. It was implemented according to
 * [this][1] documentation.
 *
 * [1]: https://msdn.microsoft.com/en-us/Library/aa140066(v=office.10).aspx
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
 * @cfg {Ext.exporter.file.excel.Style} defaultStyle
 *
 * Default style applied to all cells
 * @accessor
 */

/**
 * @cfg {Ext.exporter.file.excel.Style} titleStyle
 *
 * Default style applied to the title
 * @accessor
 */

/**
 * @cfg {Ext.exporter.file.excel.Style} groupHeaderStyle
 *
 * Default style applied to the group headers
 * @accessor
 */

/**
 * @cfg {Ext.exporter.file.excel.Style} groupFooterStyle
 *
 * Default style applied to the group footers
 * @accessor
 */

/**
 * @cfg {Ext.exporter.file.excel.Style} tableHeaderStyle
 *
 * Default style applied to the table headers
 * @accessor
 */
