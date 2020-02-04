/**
 * @class Ext.pivot.filter.Value
 * @extend Ext.pivot.filter.Base
 * @alias pivotfilter.value
 *
 * Value filter class. Use this filter type when you want to filter
 * the left/top axis results by the grand total summary values.
 *
 * Example for a value filter:
 *
 *      {
 *          xtype: 'pivotgrid',
 *
 *          matrix: {
 *              // This example will generate a column for each year
 *              // that has its grand total value between 1,000 and 15,000.
 *              aggregate: [{
 *                  id:         'agg',
 *                  dataIndex:  'value',
 *                  aggregator: 'sum',
 *                  header:     'Total'
 *              }],
 *              topAxis: [{
 *                  dataIndex:  'year',
 *                  header:     'Year',
 *                  filter: {
 *                      type:           'value',
 *                      operator:       'between',
 *                      dimensionId:    'agg',  // this is the id of an aggregate dimension
 *                      value:          [1000, 15000]
 *                  }
 *              }]
 *          }
 *      }
 *
 * Top 10 filter works as following:
 *
 * First of all sort axis groups by grand total value of the specified dimension. The sorting
 * order depends on top/bottom configuration.
 *
 *  - Top/Bottom 10 Items: Keep only the top x items from the groups array
 *
 *  - Top/Bottom 10 Percent: Find first combined values to total at least x percent of the parent grandtotal
 *
 *  - Top/Bottom 10 Sum: Find first combined values to total at least x
 *
 *
 * Example for a top 10 value filter:
 *
 *      {
 *          xtype: 'pivotgrid',
 *
 *          matrix: {
 *              // This example will return the bottom 3 years that have the smallest
 *              // sum of value.
 *              aggregate: [{
 *                  id:         'agg',
 *                  dataIndex:  'value',
 *                  aggregator: 'sum',
 *                  header:     'Total'
 *              }],
 *              leftAxis: [{
 *                  dataIndex:  'year',
 *                  header:     'Year',
 *                  filter: {
 *                      type:           'value',
 *                      operator:       'top10',
 *                      dimensionId:    'agg',   // this is the id of an aggregate dimension
 *                      topType:        'items',
 *                      topOrder:       'bottom',
 *                      value:          3
 *                  }
 *              }]
 *          }
 *      }
 *
 */

/**
 * @cfg operator
 * @inheritdoc
 * @localdoc
 *    * `top10`
 */

/**
 * @cfg {String} [dimensionId=''] (required)
 *
 * Id of the aggregate dimension used to filter by the specified value
 */

/**
 * @cfg {String} [topType="items"]
 *
 * Specify here which kind of Top10 we need to perform.
 * Possible values: items, percent, sum
 */

/**
 * @cfg {String} [topOrder="top"]
 *
 * Which kind of top10 do you want? Possible values: top, bottom
 *
 */

/**
 * @cfg {Boolean} [topSort=true]
 *
 * Should the top10 results be sorted? If True then the dimension sorting is ignored and
 * the results are sorted by the grand total in DESC (topOrder = top) or ASC (topOrder = bottom) order.
 *
 */
