/**
 * @class Ext.pivot.matrix.Base
 * @extend Ext.util.Observable
 * @alias pivotmatrix.base
 *
 * Base implementation of a pivot matrix.
 *
 * This class contains basic methods that are used to generate the pivot data. It
 * needs to be extended by other classes to properly generate the results.
 */

/**
 * @event cleardata
 * Fires before the generated data is destroyed.
 * The components that uses the matrix should unbind this pivot store before is destroyed.
 * The grid panel will trow errors if the store is destroyed and the grid is refreshed.
 *
 * @param {Ext.pivot.matrix.Base} matrix Reference to the Matrix object
 */

/**
 * @event beforereconfigure
 * Fires before the matrix is reconfigured.
 *
 * Return false to stop reconfiguring the matrix.
 *
 * @param {Ext.pivot.matrix.Base} matrix Reference to the Matrix object
 * @param {Object} config Object used to reconfigure the matrix
 */

/**
 * @event reconfigure
 * Fires when the matrix is reconfigured.
 *
 * @param {Ext.pivot.matrix.Base} matrix Reference to the Matrix object
 * @param {Object} config Object used to reconfigure the matrix
 */

/**
 * @event start
 * Fires when the matrix starts processing the records.
 *
 * @param {Ext.pivot.matrix.Base} matrix Reference to the Matrix object
 */

/**
 * @event progress
 * Fires during records processing.
 *
 * @param {Ext.pivot.matrix.Base} matrix Reference to the Matrix object
 * @param {Integer} index Current index of record that is processed
 * @param {Integer} total Total number of records to process
 */

/**
 * @event done
 * Fires when the matrix finished processing the records
 *
 * @param {Ext.pivot.matrix.Base} matrix Reference to the Matrix object
 */

/**
 * @event modelbuilt
 * Fires after the matrix built the store model.
 *
 * @param {Ext.pivot.matrix.Base} matrix Reference to the Matrix object
 * @param {Ext.data.Model} model The built model
 */

/**
 * @event columnsbuilt
 * Fires after the matrix built the columns.
 *
 * @param {Ext.pivot.matrix.Base} matrix Reference to the Matrix object
 * @param {Array} columns The built columns
 */

/**
 * @event recordbuilt
 * Fires after the matrix built a pivot store record.
 *
 * @param {Ext.pivot.matrix.Base} matrix Reference to the Matrix object
 * @param {Ext.data.Model} record The built record
 * @param {Ext.pivot.axis.Item} item The left axis item the record was built for
 */

/**
 * @event buildtotals
 * Fires before grand total records are created in the pivot store.
 * Push additional objects to the array if you need to create additional grand totals.
 *
 * @param {Ext.pivot.matrix.Base} matrix Reference to the Matrix object
 * @param {Array} totals Array of objects that will be used to create grand total records in the pivot store. Each object should have:
 * @param {String} totals.title Name your grand total
 * @param {Object} totals.values Values used to generate the pivot store record
 */

/**
 * @event storebuilt
 * Fires after the matrix built the pivot store.
 *
 * @param {Ext.pivot.matrix.Base} matrix Reference to the Matrix object
 * @param {Ext.data.Store} store The built store
 */

/**
 * @cfg {String} [type=abstract]
 *
 * Used when you define a filter on a dimension to set what kind of filter is to be
 * instantiated.
 */

/**
 * @cfg {String} [resultType='base']
 *
 * Define the type of Result this class uses. Specify here the pivotresult alias.
 */

/**
 * @cfg {String} [leftAxisType='base']
 *
 * Define the type of left Axis this class uses. Specify here the pivotaxis alias.
 */

/**
 * @cfg {String} [topAxisType='base']
 *
 * Define the type of top Axis this class uses. Specify here the pivotaxis alias.
 */

/**
 * @cfg {String} [textRowLabels='Row Labels']
 *
 * In compact layout only one column is generated for the left axis dimensions.
 * This is value of that column header.
 */

/**
 * @cfg {String} [textTotalTpl='Total {{name}}']
 * Configure the template for the group total. (i.e. '{name} ({rows.length} items)')
 * @cfg {String}           textTotalTpl.groupField         The field name being grouped by.
 * @cfg {String}           textTotalTpl.name               Group name
 * @cfg {Ext.data.Model[]} textTotalTpl.rows               An array containing the child records for the group being rendered.
 */

/**
 * @cfg {String} [textGrandTotalTpl='Grand total']
 * Configure the template for the grand total.
 */

/**
 * @cfg {String} [keysSeparator='#_#']
 *
 * An axis item has a key that is a combination of all its parents keys. This is the keys separator.
 *
 * Do not use regexp special chars for this.
 */

/**
 * @cfg {String} [grandTotalKey='grandtotal']
 *
 * Generic key used by the grand total records.
 */

/**
 * @cfg {String} [compactViewKey='_compactview_']
 *
 * In compact view layout mode the matrix generates only one column for all left axis dimensions.
 * This is the 'dataIndex' field name on the pivot store model.
 */

/**
 * @cfg {Number} [compactViewColumnWidth=200]
 *
 * In compact view layout mode the matrix generates only one column for all left axis dimensions.
 * This is the width of that column.
 */

/**
 * @cfg {String} [viewLayoutType='outline']
 * Type of layout used to display the pivot data.
 * Possible values: outline, compact, tabular
 */

/**
 * @cfg {String} [rowSubTotalsPosition='first']
 * Possible values: `first`, `none`, `last`
 */

/**
 * @cfg {String} [rowGrandTotalsPosition='last']
 * Possible values: `first`, `none`, `last`
 */

/**
 * @cfg {String} [colSubTotalsPosition='last']
 * Possible values: `first`, `none`, `last`
 */

/**
 * @cfg {String} [colGrandTotalsPosition='last']
 * Possible values: `first`, `none`, `last`
 */

/**
 * @cfg {Boolean} [showZeroAsBlank=false]
 * Should 0 values be displayed as blank?
 */

/**
 * @cfg {Ext.pivot.axis.Base} [leftAxis=null]
 *
 * Left axis object stores all generated groups for the left axis dimensions
 */

/**
 * @cfg {Ext.pivot.axis.Base} [topAxis=null]
 *
 * Top axis object stores all generated groups for the top axis dimensions
 */

/**
 * @cfg {Ext.pivot.MixedCollection} [aggregate=null]
 *
 * Collection of configured aggregate dimensions
 */

/**
 * @cfg {Ext.Component} [cmp=null] (required)
 *
 * Reference to the pivot component that monitors this matrix.
 */

/**
 * @cfg {Boolean} [useNaturalSorting=false]
 *
 * Set to true if you want to use natural sorting algorithm when sorting dimensions.
 *
 * For performance reasons this is turned off by default.
 */

/**
 * @cfg {Boolean} [collapsibleRows=true]
 *
 * Set to false if you want row groups to always be expanded and the buttons that
 * expand/collapse groups to be hidden in the UI.
 */

/**
 * @cfg {Boolean} [collapsibleColumns=true]
 *
 * Set to false if you want column groups to always be expanded and the buttons that
 * expand/collapse groups to be hidden in the UI.
 */

/**
 * @method getColumns
 * Returns the generated model fields
 *
 * @returns {Object[]} Array of config objects used to build the pivot store model fields
 */

/**
 * @method getColumnHeaders
 * Returns all generated column headers
 *
 * @returns {Object[]} Array of config objects used to build the pivot grid columns
 */
