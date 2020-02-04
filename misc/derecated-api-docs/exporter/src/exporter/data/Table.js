/**
 * @class Ext.exporter.data.Table
 * @extend Ext.exporter.data.Base
 * This class implements the data structure required by an exporter.
 */

/**
 * @cfg {Ext.exporter.data.Column[]} [columns=null]
 *
 * Collection of columns that need to be exported.
 * @accessor
 */

/**
 * @cfg {Ext.exporter.data.Group[]} [groups=null]
 *
 * Collection of groups that need to be exported.
 * @accessor
 */

/**
 * @method getBottomColumns
 * Fetch all bottom columns from the `columns` hierarchy.
 *
 * @return {Ext.exporter.data.Column[]}
 */

/**
 * @method addColumn
 * Convenience method to add columns.
 * @param {Object/Array} config
 * @return {Ext.exporter.data.Column/Ext.exporter.data.Column[]}
 */

/**
 * @method getColumn
 * Convenience method to fetch a column by its id.
 * @param id
 * @return {Ext.exporter.data.Column}
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
