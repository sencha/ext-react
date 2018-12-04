/**
 * @class Ext.pivot.filter.Label
 * @extend Ext.pivot.filter.Base
 * @alias pivotfilter.label
 *
 * Label filter class. Use this filter type when you want to filter
 * the left/top axis results by their values.
 *
 * Example:
 *
 *      {
 *          xtype: 'pivotgrid',
 *
 *          matrix: {
 *              // This example will generate a grid column for the year 2012
 *              // instead of columns for all unique years.
 *              topAxis: [{
 *                  dataIndex:  'year',
 *                  header:     'Year',
 *                  filter: {
 *                      type:       'label',
 *                      operator:   '=',
 *                      value:      2012
 *                  }
 *              }]
 *
 *              leftAxis: [{
 *                  dataIndex:  'country',
 *                  header:     'Country',
 *                  filter: {
 *                      type:       'label',
 *                      operator:   'in',
 *                      value:      ['USA', 'Canada', 'Australia']
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
 *  * `begins`
 *  * `not begins`
 *  * `ends`
 *  * `not ends`
 *  * `contains`
 *  * `not contains`
 *  * `in`
 *  * `not in`
 *
 * The `in` and `not in` operators expect this filter's {@link #value} to be an array of values.
 */
