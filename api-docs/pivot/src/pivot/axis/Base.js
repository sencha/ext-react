/**
 * @class Ext.pivot.axis.Base
 * @extend Ext.Base
 * @alias pivotaxis.base
 * Base implementation of a pivot axis. You may customize multiple dimensions
 * on an axis. Basically this class stores all labels that were generated
 * for the configured dimensions.
 *
 * Example:
 *
 *      leftAxis: [{
 *          dataIndex:  'person',
 *          header:     'Person',
 *          sortable:   false
 *      },{
 *          dataIndex:  'country',
 *          header:     'Country',
 *          direction:  'DESC'
 *      }]
 *
 */

/**
 * @cfg {Ext.pivot.dimension.Item[]} [dimensions=null]
 * All dimensions configured for this axis.
 *
 */

/**
 * @property {Ext.pivot.matrix.Base} [matrix=null]
 * Matrix instance this axis belongs to.
 *
 */

/**
 * @property {Ext.pivot.MixedCollection} [items=null]
 * All items generated for this axis are stored in this collection.
 *
 */
