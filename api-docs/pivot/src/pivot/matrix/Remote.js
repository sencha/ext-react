/**
 * @class Ext.pivot.matrix.Remote
 * @extend Ext.pivot.matrix.Base
 * @alias pivotmatrix.remote
 *
 * This matrix allows you to do all the calculations on the backend.
 * This is handy when you have large data sets.
 *
 * Basically this class sends to the specified URL the following configuration object:
 *
 * - leftAxis: array of serialized dimensions on the left axis
 *
 * - topAxis: array of serialized dimensions on the top axis
 *
 * - aggregate: array of serialized dimensions on the aggregate
 *
 * - keysSeparator: the separator used by the left/top items keys. It's the one defined on the matrix
 *
 * - grandTotalKey: the key for the grand total items. It's the one defined on the matrix
 *
 *
 * The expected JSON should have the following format:
 *
 * - success - true/false
 *
 * - leftAxis - array of items that were generated for the left axis. Each item is an
 * object with keys for: key, value, name, dimensionId. If you send back the item name and you also
 * have a renderer defined then the renderer is not called anymore.
 *
 * - topAxis - array of items that were generated for the top axis.
 *
 * - results - array of results for all left/top axis items. Each result is an object
 * with keys for: leftKey, topKey, values. The 'values' object has keys for each
 * aggregate id that was sent to the backend.
 *
 * Example
 *
 *      // let's assume that we have this configuration on the pivot grid
 *      {
 *          xtype:  'pivotgrid',
 *
 *          matrix: {
 *              type:   'remote',
 *              url:    'your-backend-url'.
 *
 *              aggregate: [{
 *                  id:         'agg1',
 *                  dataIndex:  'value',
 *                  header:     'Sum of value',
 *                  aggregator: 'sum'
 *              },{
 *                  id:         'agg2',
 *                  dataIndex:  'value',
 *                  header:     '# records',
 *                  aggregator: 'count',
 *                  align:      'right',
 *                  renderer:   Ext.util.Format.numberRenderer('0')
 *              }],
 *
 *              leftAxis: [{
 *                  id:         'person',
 *                  dataIndex:  'person',
 *                  header:     'Person',
 *                  sortable:   false
 *              },{
 *                  id:         'country',
 *                  dataIndex:  'country',
 *                  header:     'Country'
 *              }],
 *
 *              topAxis: [{
 *                  id:         'year',
 *                  dataIndex:  'year',
 *                  header:     'Year'
 *              },{
 *                  id:         'month',
 *                  dataIndex:  'month',
 *                  header:     'Month'
 *              }]
 *          }
 *      }
 *
 *      // this is the expected result from the server
 *      {
 *          "success": true,
 *          "leftAxis": [{
 *              "key": "john",
 *              "value": "John",
 *              "name": "John",
 *              "dimensionId": "person"
 *          }, {
 *              "key": "john#_#usa",
 *              "value": "USA",
 *              "name": "United States of America",
 *              "dimensionId": "country"
 *          }, {
 *              "key": "john#_#canada",
 *              "value": "Canada",
 *              "name": "Canada",
 *              "dimensionId": "country"
 *          }],
 *          "topAxis": [{
 *              "key": "2014",
 *              "value": "2014",
 *              "name": "2014",
 *              "dimensionId": "year"
 *          }, {
 *              "key": "2014#_#2",
 *              "value": "2",
 *              "name": "February",
 *              "dimensionId": "month"
 *          }],
 *          "results": [{
 *              "leftKey": "grandtotal",
 *              "topKey": "grandtotal",
 *              "values": {
 *                  "agg1": 100,
 *                  "agg2": 20
 *              }
 *          }, {
 *              "leftKey": "john",
 *              "topKey": "grandtotal",
 *              "values": {
 *                  "agg1": 100,
 *                  "agg2": 20
 *              }
 *          }, {
 *              "leftKey": "john#_#canada",
 *              "topKey": "grandtotal",
 *              "values": {
 *                  "agg1": 70,
 *                  "agg2": 13
 *              }
 *          }, {
 *              "leftKey": "john#_#usa",
 *              "topKey": "grandtotal",
 *              "values": {
 *                  "agg1": 30,
 *                  "agg2": 7
 *              }
 *          }, {
 *              "leftKey": "grandtotal",
 *              "topKey": "2014",
 *              "values": {
 *                  "agg1": 100,
 *                  "agg2": 20
 *              }
 *          }, {
 *              "leftKey": "grandtotal",
 *              "topKey": "2014#_#2",
 *              "values": {
 *                  "agg1": 50,
 *                  "agg2": 70
 *              }
 *          }, {
 *              "leftKey": "john",
 *              "topKey": "2014",
 *              "values": {
 *                  "agg1": 100,
 *                  "agg2": 20
 *              }
 *          }, {
 *              "leftKey": "john",
 *              "topKey": "2014#_#2",
 *              "values": {
 *                  "agg1": 100,
 *                  "agg2": 20
 *              }
 *          }, {
 *              "leftKey": "john#_#usa",
 *              "topKey": "2014",
 *              "values": {
 *                  "agg1": 70,
 *                  "agg2": 13
 *              }
 *          }, {
 *              "leftKey": "john#_#usa",
 *              "topKey": "2014#_#2",
 *              "values": {
 *                  "agg1": 70,
 *                  "agg2": 13
 *              }
 *          }, {
 *              "leftKey": "john#_#canada",
 *              "topKey": "2014",
 *              "values": {
 *                  "agg1": 30,
 *                  "agg2": 7
 *              }
 *          }, {
 *              "leftKey": "john#_#canada",
 *              "topKey": "2014#_#2",
 *              "values": {
 *                  "agg1": 30,
 *                  "agg2": 7
 *              }
 *          }]
 *      }
 *
 *
 * It is very important to use the dimension IDs that were sent to the backend
 * instead of creating new ones.
 *
 * This class can also serve as an example for implementing various types of
 * remote matrix.
 */

/**
 * Fires before requesting data from the server side.
 * Return false if you don't want to make the Ajax request.
 *
 * @event beforerequest
 * @param {Ext.pivot.matrix.Remote} matrix Reference to the Matrix object
 * @param {Object} params Params sent by the Ajax request
 */

/**
 * Fires if there was any Ajax exception or the success value in the response was false.
 *
 * @event requestexception
 * @param {Ext.pivot.matrix.Remote} matrix Reference to the Matrix object
 * @param {Object} response The Ajax response object
 */

/**
 * @cfg {String} [url='']
 *
 * URL on the server side where the calculations are performed.
 */

/**
 * @cfg {Number} [timeout=3000]
 *
 * The timeout in miliseconds to be used for the server side request.
 * Default to 30 seconds.
 */
