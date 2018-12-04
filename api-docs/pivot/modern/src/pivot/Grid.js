/**
 * @class Ext.pivot.Grid
 * @extend Ext.grid.Grid
 * @xtype pivotgrid
 *
 * The pivot grid helps you analyze your data.
 *
 * Calculations can be done either in your browser using a {@link Ext.pivot.matrix.Local}
 * matrix or remotely on the server using a {@link Ext.pivot.matrix.Remote} matrix.
 *
 * Example usage:
 *
 *      {
 *          xtype:  'pivotgrid',
 *          matrix: {
 *              type: 'local',
 *              store: 'yourStoreId',    // or a store instance
 *              rowGrandTotalsPosition: 'first',
 *              leftAxis: [{
 *                  dataIndex: 'country',
 *                  direction: 'DESC',
 *                  header: 'Countries',
 *                  width: 150
 *              }],
 *              topAxis: [{
 *                  dataIndex: 'year',
 *                  direction: 'ASC'
 *              }],
 *              aggregate: [{
 *                  dataIndex: 'value',
 *                  header: 'Total',
 *                  aggregator: 'sum',
 *                  width: 120
 *              }]
 *          }
 *      }
 *
 *
 * The modern pivot grid could be styled using data binding as following:
 *
 * ## ViewModel on rows
 *
 * Let's have a look at this example:
 *
 *      {
 *          xtype: 'pivotgrid',
 *          itemConfig: {
 *              viewModel: {
 *                  type: 'pivot-row-model'
 *              },
 *              bind: {
 *                  userCls: '{rowStyle}'
 *                  // or you can define a template
 *                  //userCls: '{record.isRowGroupHeader:pick("","pivotRowHeader")}'
 *              }
 *          }
 *          // ... more configs
 *      }
 *
 * In the ViewModel we would declare a formula that will use the record data. The record
 * has all values that are displayed for that row and the following additional fields:
 *
 * - isRowGroupHeader
 * - isRowGroupTotal
 * - isRowGrandTotal
 * - leftAxisKey: This is either the grand total key or a key that identifies the left axis item
 *
 * All these properties can help us style the entire row without knowing anything about the generated columns.
 *
 * In some case we may want to style positive and negative values generated in the pivot grid. This can be done
 * as following.
 *
 *      {
 *          xtype: 'pivotgrid',
 *          itemConfig: {
 *              viewModel: {
 *                  type: 'default'
 *              }
 *          },
 *          topAxisCellConfig: {
 *              bind: {
 *                  userCls: '{value:sign("pivotCellNegative","pivotCellPositive")}'
 *              }
 *          }
 *          // ... more configs
 *      }
 *
 * The following data is available for use in the bind template:
 *
 * - column
 *      - isColGroupTotal: this tells us that the column for that specific cell is a group total
 *      - isColGrandTotal: this tells us that the column for that specific cell is a grand total
 *
 * - value: cell value
 *
 * **Note:** In such cases you cannot use formulas because the column and value are generated dynamically
 * and can't be replaced in formulas.
 *
 *
 * It is also possible to style a specific dimension from left axis or aggregate:
 *
 *      {
 *          xtype: 'pivotgrid',
 *          itemConfig: {
 *              viewModel: {
 *                  type: 'default'
 *              }
 *          },
 *          matrix: {
 *              aggregate: [{
 *                  dataIndex:  'value',
 *                  aggregator: 'sum',
 *                  align:      'right',
 *
 *                  cellConfig: {
 *                      bind: {
 *                          userCls: '{value:sign("pivotCellNegative","pivotCellPositive")}'
 *                      }
 *                  }
 *              },{
 *                  dataIndex:  'value',
 *                  aggregator: 'count'
 *              }],
 *              leftAxis: [{
 *                  dataIndex:  'person',
 *                  // This is used only when `viewLayoutType` is `outline`
 *                  cellConfig: {
 *                      bind: {
 *                          userCls: '{record.isRowGroupHeader::pick("","pivotRowHeader")}'
 *                      }
 *                  }
 *              },{
 *                  dataIndex:  'country'
 *              }]
 *              // ... more configs
 *          }
 *      }
 *
 *
 * ## ViewModel on cells
 *
 * This scenario allows you to define formulas to use in cell binding. Be careful that this means that
 * each cell will have an own ViewModel and this may decrease the pivot grid performance. Use it only
 * if necessary.
 *
 *      {
 *          xtype: 'pivotgrid',
 *          leftAxisCellConfig: {
 *              viewModel: {
 *                  type: 'default'
 *              },
 *              bind: {
 *                  userCls: '{record.isRowGroupHeader::pick("","pivotRowHeader")}'
 *              }
 *          },
 *          topAxisCellConfig: {
 *              viewModel: {
 *                  type: 'pivot-cell-model' // to be able to define your own formulas
 *              },
 *              bind: {
 *                  userCls: '{value:sign("pivotCellNegative","pivotCellPositive")}'
 *                  //userCls: '{column.isColGrandTotal:pick(null,"pivotCellGrandTotal")}'
 *                  //userCls: '{cellCls}
 *              }
 *          }
 *          // ... more configs
 *      }
 *
 * This approach lets you use record, column and value in both bind templates and formulas.
 *
 *
 * If multiple aggregate dimensions are available and you want to style one of them you can define the
 * binding on that dimension like this:
 *
 *      {
 *          xtype: 'pivotgrid',
 *          matrix: {
 *              aggregate: [{
 *                  dataIndex:  'value',
 *                  aggregator: 'sum',
 *                  align:      'right',
 *
 *                  cellConfig: {
 *                      viewModel: {
 *                          type: 'pivot-cell-model'
 *                      },
 *                      bind: {
 *                          userCls: '{value:sign("pivotCellNegative","pivotCellPositive")}'
 *                          //userCls: '{column.isColGrandTotal:pick(null,"pivotCellGrandTotal")}'
 *                          //userCls: '{cellCls}
 *                      }
 *                  }
 *              },{
 *                  dataIndex:  'value',
 *                  aggregator: 'count'
 *              }]
 *              // ... more configs
 *          }
 *      }
 *
 */

/**
 * Fires before the matrix is reconfigured.
 *
 * Return false to stop reconfiguring the matrix.
 *
 * @event pivotbeforereconfigure
 * @param {Ext.pivot.matrix.Base} matrix Reference to the Matrix object
 * @param {Object} config Object used to reconfigure the matrix
 */

/**
 * Fires when the matrix is reconfigured.
 *
 * @event pivotreconfigure
 * @param {Ext.pivot.matrix.Base} matrix Reference to the Matrix object
 * @param {Object} config Object used to reconfigure the matrix
 */

/**
 * Fires when the matrix starts processing the records.
 *
 * @event pivotstart
 * @param {Ext.pivot.matrix.Base} matrix Reference to the Matrix object
 */

/**
 * Fires during records processing.
 *
 * @event pivotprogress
 * @param {Ext.pivot.matrix.Base} matrix Reference to the Matrix object
 * @param {Integer} index Current index of record that is processed
 * @param {Integer} total Total number of records to process
 */

/**
 * Fires when the matrix finished processing the records
 *
 * @event pivotdone
 * @param {Ext.pivot.matrix.Base} matrix Reference to the Matrix object
 */

/**
 * Fires after the matrix built the store model.
 *
 * @event pivotmodelbuilt
 * @param {Ext.pivot.matrix.Base} matrix Reference to the Matrix object
 * @param {Ext.data.Model} model The built model
 */

/**
 * Fires after the matrix built the columns.
 *
 * @event pivotcolumnsbuilt
 * @param {Ext.pivot.matrix.Base} matrix Reference to the Matrix object
 * @param {Array} columns The built columns
 */

/**
 * Fires after the matrix built a pivot store record.
 *
 * @event pivotrecordbuilt
 * @param {Ext.pivot.matrix.Base} matrix Reference to the Matrix object
 * @param {Ext.data.Model} record The built record
 */

/**
 * Fires before grand total records are created in the pivot store.
 * Push additional objects to the array if you need to create additional grand totals.
 *
 * @event pivotbuildtotals
 * @param {Ext.pivot.matrix.Base} matrix Reference to the Matrix object
 * @param {Array} totals Array of objects that will be used to create grand total records in the pivot store. Each object should have:
 * @param {String} totals.title Name your grand total
 * @param {Object} totals.values Values used to generate the pivot store record
 */

/**
 * Fires after the matrix built the pivot store.
 *
 * @event pivotstorebuilt
 * @param {Ext.pivot.matrix.Base} matrix Reference to the Matrix object
 * @param {Ext.data.Store} store The built store
 */

/**
 * Fires when a pivot group is expanded. Could be a row or col pivot group.
 *
 * The same event is fired when all groups are expanded but no group param is provided.
 *
 * @event pivotgroupexpand
 * @param {Ext.pivot.matrix.Base} matrix Reference to the Matrix object
 * @param {String} type  Either 'row' or 'col'
 * @param {Ext.pivot.axis.Item} group The axis item
 */

/**
 * Fires when a pivot group is collapsed. Could be a row or col pivot group.
 *
 * The same event is fired when all groups are collapsed but no group param is provided.
 *
 * @event pivotgroupcollapse
 * @param {Ext.pivot.matrix.Base} matrix Reference to the Matrix object
 * @param {String} type  Either 'row' or 'col'
 * @param {Ext.pivot.axis.Item} group The axis item
 */



/**
 * Fires when a tap is detected on a pivot group element.
 * The pivot group element is the one that belongs to the columns generated for the left axis dimensions.
 *
 * Return false if you want to prevent expanding/collapsing that group.
 *
 * @event pivotgrouptap
 * @param {Object} params Object with following configuration
 * @param {Ext.pivot.Grid} params.grid Pivot grid instance
 * @param {Ext.grid.cell.Cell} params.cell The target of the event
 * @param {String} params.leftKey Key of the left axis item
 * @param {Ext.pivot.axis.Item} params.leftItem Left axis item
 * @param {Ext.grid.column.Column} params.column Column header object
 * @param {Ext.event.Event} e Event object
 */

/**
 * Fires when a double tap is detected on a pivot group element.
 * The pivot group element is the one that belongs to the columns generated for the left axis dimensions.
 *
 * @event pivotgroupdoubletap
 * @param {Object} params Object with following configuration
 * @param {Ext.pivot.Grid} params.grid Pivot grid instance
 * @param {Ext.grid.cell.Cell} params.cell The target of the event
 * @param {String} params.leftKey Key of the left axis item
 * @param {Ext.pivot.axis.Item} params.leftItem Left axis item
 * @param {Ext.grid.column.Column} params.column Column header object
 * @param {Ext.event.Event} e Event object
 */

/**
 * Fires when a tap hold is detected on a pivot group element.
 * The pivot group element is the one that belongs to the columns generated for the left axis dimensions.
 *
 * @event pivotgrouptaphold
 * @param {Object} params Object with following configuration
 * @param {Ext.pivot.Grid} params.grid Pivot grid instance
 * @param {Ext.grid.cell.Cell} params.cell The target of the event
 * @param {String} params.leftKey Key of the left axis item
 * @param {Ext.pivot.axis.Item} params.leftItem Left axis item
 * @param {Ext.grid.column.Column} params.column Column header object
 * @param {Ext.event.Event} e Event object
 */

/**
 * Fires when a tap is detected on a pivot group cell.
 * The pivot group cell is the one that belongs to the columns generated for the top axis dimensions.
 *
 * @event pivotgroupcelltap
 * @param {Object} params Object with following configuration
 * @param {Ext.pivot.Grid} params.grid Pivot grid instance
 * @param {Ext.grid.cell.Cell} params.cell The target of the event
 * @param {String} params.leftKey Key of the left axis item
 * @param {Ext.pivot.axis.Item} params.leftItem Left axis item
 * @param {String} params.topKey Key of the top axis item
 * @param {Ext.pivot.axis.Item} params.topItem Top axis item
 * @param {String} params.dimensionId Id of the aggregate dimension
 * @param {Ext.grid.column.Column} params.column Column header object
 * @param {Ext.event.Event} e Event object
 */

/**
 * Fires when a double tap is detected on a pivot group cell.
 * The pivot group cell is the one that belongs to the columns generated for the top axis dimensions.
 *
 * @event pivotgroupcelldoubletap
 * @param {Object} params Object with following configuration
 * @param {Ext.pivot.Grid} params.grid Pivot grid instance
 * @param {Ext.grid.cell.Cell} params.cell The target of the event
 * @param {String} params.leftKey Key of the left axis item
 * @param {Ext.pivot.axis.Item} params.leftItem Left axis item
 * @param {String} params.topKey Key of the top axis item
 * @param {Ext.pivot.axis.Item} params.topItem Top axis item
 * @param {String} params.dimensionId Id of the aggregate dimension
 * @param {Ext.grid.column.Column} params.column Column header object
 * @param {Ext.event.Event} e Event object
 */

/**
 * Fires when a tap hold is detected on a pivot group cell.
 * The pivot group cell is the one that belongs to the columns generated for the top axis dimensions.
 *
 * @event pivotgroupcelltaphold
 * @param {Object} params Object with following configuration
 * @param {Ext.pivot.Grid} params.grid Pivot grid instance
 * @param {Ext.grid.cell.Cell} params.cell The target of the event
 * @param {String} params.leftKey Key of the left axis item
 * @param {Ext.pivot.axis.Item} params.leftItem Left axis item
 * @param {String} params.topKey Key of the top axis item
 * @param {Ext.pivot.axis.Item} params.topItem Top axis item
 * @param {String} params.dimensionId Id of the aggregate dimension
 * @param {Ext.grid.column.Column} params.column Column header object
 * @param {Ext.event.Event} e Event object
 */

/**
 * Fires when a tap is detected on a pivot item element.
 * The pivot item element is the one that belongs to the columns generated for the left axis dimensions.
 *
 * @event pivotitemtap
 * @param {Object} params Object with following configuration
 * @param {Ext.pivot.Grid} params.grid Pivot grid instance
 * @param {Ext.grid.cell.Cell} params.cell The target of the event
 * @param {String} params.leftKey Key of the left axis item
 * @param {Ext.pivot.axis.Item} params.leftItem Left axis item
 * @param {Ext.grid.column.Column} params.column Column header object
 * @param {Ext.event.Event} e Event object
 */

/**
 * Fires when a double tap is detected on a pivot item element.
 * The pivot item element is the one that belongs to the columns generated for the left axis dimensions.
 *
 * @event pivotitemdoubletap
 * @param {Object} params Object with following configuration
 * @param {Ext.pivot.Grid} params.grid Pivot grid instance
 * @param {Ext.grid.cell.Cell} params.cell The target of the event
 * @param {String} params.leftKey Key of the left axis item
 * @param {Ext.pivot.axis.Item} params.leftItem Left axis item
 * @param {Ext.grid.column.Column} params.column Column header object
 * @param {Ext.event.Event} e Event object
 */

/**
 * Fires when a tap hold is detected on a pivot item element.
 * The pivot item element is the one that belongs to the columns generated for the left axis dimensions.
 *
 * @event pivotitemtaphold
 * @param {Object} params Object with following configuration
 * @param {Ext.pivot.Grid} params.grid Pivot grid instance
 * @param {Ext.grid.cell.Cell} params.cell The target of the event
 * @param {String} params.leftKey Key of the left axis item
 * @param {Ext.pivot.axis.Item} params.leftItem Left axis item
 * @param {Ext.grid.column.Column} params.column Column header object
 * @param {Ext.event.Event} e Event object
 */

/**
 * Fires when a tap is detected on a pivot item cell.
 * The pivot item cell is the one that belongs to the columns generated for the top axis dimensions.
 *
 * @event pivotitemcelltap
 * @param {Object} params Object with following configuration
 * @param {Ext.pivot.Grid} params.grid Pivot grid instance
 * @param {Ext.grid.cell.Cell} params.cell The target of the event
 * @param {String} params.leftKey Key of the left axis item
 * @param {Ext.pivot.axis.Item} params.leftItem Left axis item
 * @param {String} params.topKey Key of the top axis item
 * @param {Ext.pivot.axis.Item} params.topItem Top axis item
 * @param {String} params.dimensionId Id of the aggregate dimension
 * @param {Ext.grid.column.Column} params.column Column header object
 * @param {Ext.event.Event} e Event object
 */

/**
 * Fires when a double tap is detected on a pivot item cell.
 * The pivot item cell is the one that belongs to the columns generated for the top axis dimensions.
 *
 * @event pivotitemcelldoubletap
 * @param {Object} params Object with following configuration
 * @param {Ext.pivot.Grid} params.grid Pivot grid instance
 * @param {Ext.grid.cell.Cell} params.cell The target of the event
 * @param {String} params.leftKey Key of the left axis item
 * @param {Ext.pivot.axis.Item} params.leftItem Left axis item
 * @param {String} params.topKey Key of the top axis item
 * @param {Ext.pivot.axis.Item} params.topItem Top axis item
 * @param {String} params.dimensionId Id of the aggregate dimension
 * @param {Ext.grid.column.Column} params.column Column header object
 * @param {Ext.event.Event} e Event object
 */

/**
 * Fires when a tap hold is detected on a pivot item cell.
 * The pivot item cell is the one that belongs to the columns generated for the top axis dimensions.
 *
 * @event pivotitemcelltaphold
 * @param {Object} params Object with following configuration
 * @param {Ext.pivot.Grid} params.grid Pivot grid instance
 * @param {Ext.grid.cell.Cell} params.cell The target of the event
 * @param {String} params.leftKey Key of the left axis item
 * @param {Ext.pivot.axis.Item} params.leftItem Left axis item
 * @param {String} params.topKey Key of the top axis item
 * @param {Ext.pivot.axis.Item} params.topItem Top axis item
 * @param {String} params.dimensionId Id of the aggregate dimension
 * @param {Ext.grid.column.Column} params.column Column header object
 * @param {Ext.event.Event} e Event object
 */

/**
 * Fires when a tap is detected on a pivot grand total element.
 * The pivot grand total element is the one that belongs to the columns generated for the left axis dimensions.
 *
 * @event pivottotaltap
 * @param {Object} params Object with following configuration
 * @param {Ext.pivot.Grid} params.grid Pivot grid instance
 * @param {Ext.grid.cell.Cell} params.cell The target of the event
 * @param {String} params.leftKey Key of the left axis item
 * @param {Ext.grid.column.Column} params.column Column header object
 * @param {Ext.event.Event} e Event object
 */

/**
 * Fires when a double tap is detected on a pivot grand total element.
 * The pivot grand total element is the one that belongs to the columns generated for the left axis dimensions.
 *
 * @event pivottotaldoubletap
 * @param {Object} params Object with following configuration
 * @param {Ext.pivot.Grid} params.grid Pivot grid instance
 * @param {Ext.grid.cell.Cell} params.cell The target of the event
 * @param {String} params.leftKey Key of the left axis item
 * @param {Ext.grid.column.Column} params.column Column header object
 * @param {Ext.event.Event} e Event object
 */

/**
 * Fires when a tap hold is detected on a pivot grand total element.
 * The pivot grand total element is the one that belongs to the columns generated for the left axis dimensions.
 *
 * @event pivottotaltaphold
 * @param {Object} params Object with following configuration
 * @param {Ext.pivot.Grid} params.grid Pivot grid instance
 * @param {Ext.grid.cell.Cell} params.cell The target of the event
 * @param {String} params.leftKey Key of the left axis item
 * @param {Ext.grid.column.Column} params.column Column header object
 * @param {Ext.event.Event} e Event object
 */

/**
 * Fires when a tap is detected on a pivot grand total cell.
 * The pivot total cell is the one that belongs to the columns generated for the top axis dimensions.
 *
 * @event pivottotalcelltap
 * @param {Object} params Object with following configuration
 * @param {Ext.pivot.Grid} params.grid Pivot grid instance
 * @param {Ext.grid.cell.Cell} params.cell The target of the event
 * @param {String} params.leftKey Key of the left axis item
 * @param {String} params.topKey Key of the top axis item
 * @param {String} params.dimensionId Id of the aggregate dimension
 * @param {Ext.grid.column.Column} params.column Column header object
 * @param {Ext.event.Event} e Event object
 */

/**
 * Fires when a double tap is detected on a pivot grand total cell.
 * The pivot total cell is the one that belongs to the columns generated for the top axis dimensions.
 *
 * @event pivottotalcelldoubletap
 * @param {Object} params Object with following configuration
 * @param {Ext.pivot.Grid} params.grid Pivot grid instance
 * @param {Ext.grid.cell.Cell} params.cell The target of the event
 * @param {String} params.leftKey Key of the left axis item
 * @param {String} params.topKey Key of the top axis item
 * @param {String} params.dimensionId Id of the aggregate dimension
 * @param {Ext.grid.column.Column} params.column Column header object
 * @param {Ext.event.Event} e Event object
 */

/**
 * Fires when a double tap is detected on a pivot grand total cell.
 * The pivot total cell is the one that belongs to the columns generated for the top axis dimensions.
 *
 * @event pivottotalcelltaphold
 * @param {Object} params Object with following configuration
 * @param {Ext.pivot.Grid} params.grid Pivot grid instance
 * @param {Ext.grid.cell.Cell} params.cell The target of the event
 * @param {String} params.leftKey Key of the left axis item
 * @param {String} params.topKey Key of the top axis item
 * @param {String} params.dimensionId Id of the aggregate dimension
 * @param {Ext.grid.column.Column} params.column Column header object
 * @param {Ext.event.Event} e Event object
 */

/**
 * Available only when using a {@link Ext.pivot.matrix.Remote Remote} matrix.
 * Fires before requesting data from the server side.
 * Return false if you don't want to make the Ajax request.
 *
 * @event pivotbeforerequest
 * @param {Ext.pivot.matrix.Base} matrix Reference to the Matrix object
 * @param {Object} params Params sent by the Ajax request
 */

/**
 * Available only when using a {@link Ext.pivot.matrix.Remote Remote} matrix.
 * Fires if there was any Ajax exception or the success value in the response was false.
 *
 * @event pivotrequestexception
 * @param {Ext.pivot.matrix.Base} matrix Reference to the Matrix object
 * @param {Object} response The Ajax response object
 */

/**
 * @cfg {Boolean} [enableLoadMask=true]
 * Set this on false if you don't want to see the loading mask.
 */

/**
 * @cfg {Boolean} [enableColumnSort=true]
 * Set this on false if you don't want to allow column sorting
 * in the pivot grid generated columns.
 */

/**
 * @cfg {Boolean} [startRowGroupsCollapsed=true]
 * Should the row groups be expanded on first init?
 *
 */

/**
 * @cfg {Boolean} [startColGroupsCollapsed=true]
 * Should the col groups be expanded on first init?
 *
 */

/**
 * @cfg {String} [clsGroupTotal=true]
 * CSS class assigned to the group totals.
 */

/**
 * @cfg {String} [clsGrandTotal=true]
 * CSS class assigned to the grand totals.
 */

/**
 * @cfg {Ext.pivot.matrix.Base} matrix (required)
 *
 * This is the pivot matrix used by the pivot grid. All axis and aggregate dimensions should
 * be defined here.
 *
 * Example usage:
 *
 *      {
 *          xtype:  'pivotgrid',
 *          matrix: {
 *              type: 'local',
 *              store: 'yourStoreId'    // or a store instance
 *              rowGrandTotalsPosition: 'first',
 *              leftAxis: [{
 *                  dataIndex: 'country',
 *                  direction: 'DESC',
 *                  header: 'Countries'
 *                  width: 150
 *              }],
 *              topAxis: [{
 *                  dataIndex: 'year',
 *                  direction: 'ASC'
 *              }],
 *              aggregate: [{
 *                  dataIndex: 'value',
 *                  header: 'Total',
 *                  aggregator: 'sum',
 *                  width: 120
 *              }]
 *          }
 *      }
 * @accessor
 */

/**
 * @cfg {Object} leftAxisCellConfig
 *
 * Cell configuration for columns generated for the left axis dimensions.
 *
 * Binding could be defined here.
 * @accessor
 */

/**
 * @cfg {Object} topAxisCellConfig
 *
 * Cell configuration for columns generated for the top axis and aggregate dimensions.
 *
 * Binding could be defined here.
 * @accessor
 */

/**
 * @cfg record
 * @hide
 */
