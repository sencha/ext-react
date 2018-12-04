/**
 * @class Ext.exporter.data.Group
 * @extend Ext.exporter.data.Base
 * This class implements a table group definition.
 */

/**
 * @cfg {String} [text=null]
 *
 * Group's header
 * @accessor
 */

/**
 * @cfg {Ext.exporter.data.Row[]} [rows=null]
 *
 * Group's rows
 * @accessor
 */

/**
 * @cfg {Ext.exporter.data.Row[]} [summaries=null]
 *
 * Group's summaries
 * @accessor
 */

/**
 * @cfg {Ext.exporter.data.Group[]} [groups=null]
 *
 * Collection of sub-groups belonging to this group.
 * @accessor
 */

/**
 * @method addRow
 * Convenience method to add rows.
 * @param {Object/Array} config
 * @return {Ext.exporter.data.Row/Ext.exporter.data.Row[]}
 */

/**
 * @method getRow
 * Convenience method to fetch a row by its id.
 * @param id
 * @return {Ext.exporter.data.Row}
 */

/**
 * @method addGroup
 * Convenience method to add groups.
 * @param {Object/Array} config
 * @return {Ext.exporter.data.Group/Ext.exporter.data.Group[]}
 */

/**
 * @method getGroup
 * Convenience method to fetch a group by its id.
 * @param id
 * @return {Ext.exporter.data.Group}
 */

/**
 * @method addSummary
 * Convenience method to add summary rows.
 * @param {Object/Array} config
 * @return {Ext.exporter.data.Row/Ext.exporter.data.Row[]}
 */

/**
 * @method getSummary
 * Convenience method to fetch a summary row by its id.
 * @param id Id of the summary row
 * @return {Ext.exporter.data.Row}
 */
