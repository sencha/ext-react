/**
 * @class Ext.pivot.matrix.Local
 * @extend Ext.pivot.matrix.Base
 * @alias pivotmatrix.local
 *
 * This type of matrix does all calculations in the browser.
 *
 * You need to provide at least a store that contains the records
 * that need to be processed.
 *
 * The store records are processed in batch jobs to avoid freezing the browser.
 * You can also configure how many records should be processed per job
 * and time to wait between jobs.
 *
 *
 * Example:
 *
 *      {
 *          xtype: 'pivotgrid',
 *          matrix: {
 *              type: 'local',
 *              store: 'yourStore',
 *              leftAxis: [...],
 *              topAxis: [...],
 *              aggregate: [...]
 *          }
 *      }
 *
 */

/**
 * Fires before updating the matrix data due to a change in the bound store.
 *
 * @event beforeupdate
 * @param {Ext.pivot.matrix.Base} matrix Reference to the Matrix object
 * @private
 */

/**
 * Fires after updating the matrix data due to a change in the bound store.
 *
 * @event afterupdate
 * @param {Ext.pivot.matrix.Base} matrix Reference to the Matrix object
 * @private
 */

/**
 * @cfg {Ext.data.Store/String} [store=null] (required)
 *
 * This is the store that needs to be processed. The store should contain all records
 * and cannot be paginated or buffered.
 */

/**
 * @cfg {Number} [recordsPerJob=1000]
 *
 * The matrix processes the records in multiple jobs.
 * Specify here how many records should be processed in a single job.
 */

/**
 * @cfg {Number} [timeBetweenJobs=2]
 *
 * How many milliseconds between processing jobs?
 */

/**
 * @method getRecordsByRowGroup
 * Fetch all records that belong to the specified row group
 *
 * @param {String} key Row group key
 */

/**
 * @method getRecordsByColGroup
 * Fetch all records that belong to the specified col group
 *
 * @param {String} key Col group key
 */

/**
 * @method getRecordsByGroups
 * Fetch all records that belong to the specified row/col group
 *
 * @param {String} rowKey Row group key
 * @param {String} colKey Col group key
 */
