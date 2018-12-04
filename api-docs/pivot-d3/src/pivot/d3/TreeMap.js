/**
 * @class Ext.pivot.d3.TreeMap
 * @extend Ext.d3.hierarchy.TreeMap
 * @xtype pivottreemap
 * This component extends the D3 TreeMap to work with a pivot matrix.
 *
 * Basically this component needs a pivot matrix to be configured. The values
 * calculated by the pivot matrix are distributed as following:
 *
 *  - `leftAxis` maps to TreeMap `colorAxis`
 *  - `aggregate` maps to TreeMap `nodeValue`
 *
 * Multiple dimensions can be configured on `leftAxis` but only one dimension
 * on the `aggregate`. `topAxis` dimensions are ignored.
 *
 */

/**
 * @cfg {Boolean} autoExpand
 * Should the generated tree items be expanded by default?
 * @accessor
 */

/**
 * @cfg {Ext.pivot.matrix.Base} matrix
 * Pivot matrix specific configuration
 * @accessor
 */
