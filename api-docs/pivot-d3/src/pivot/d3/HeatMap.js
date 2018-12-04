/**
 * @class Ext.pivot.d3.HeatMap
 * @extend Ext.d3.HeatMap
 * @xtype pivotheatmap
 *
 * This component extends the D3 HeatMap to work with a pivot matrix.
 *
 * Basically this component needs a pivot matrix to be configured. The values
 * calculated by the pivot matrix are distributed as following:
 *
 *  - `leftAxis` maps to HeatMap `xAxis`
 *  - `topAxis` maps to HeatMap `yAxis`
 *  - `aggregate` maps to HeatMap `colorAxis`
 *
 * The pivot matrix should be configured with maximum one dimension per
 * `leftAxis`, `topAxis` or `aggregate`.
 *
 */

/**
 * @cfg {String} [defaultFormatter='number("0.00")']
 * Default formatter used to render cells on colorAxis
 * @accessor
 */

/**
 * @cfg {Ext.pivot.matrix.Base} matrix
 * Pivot matrix specific configuration
 * @accessor
 */
