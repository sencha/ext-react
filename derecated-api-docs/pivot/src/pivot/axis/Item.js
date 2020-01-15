/**
 * @class Ext.pivot.axis.Item
 * @extend Ext.Base
 *
 * The axis has items that are generated when the records are processed.
 *
 * This class stores info about such an item.
 */

/**
 * @cfg {String} [key='']
 *
 * The key that uniquely identifies this item in the tree. The key is a string compound of
 * all parent items keys separated by the matrix keysSeparator
 */

/**
 * @cfg {String/Number} [value='']
 * The item value as it appears in the store
 */

/**
 * @cfg {String/Number} [sortValue='']
 * The item sort value as it appears in the store. This value will be used when sorting results.
 */

/**
 * @cfg {String} [name='']
 * The item name after the grouperFn was applied to the {@link #value}
 */

/**
 * @cfg {String} [id='']
 * Id of the dimension this item refers to.
 */

/**
 * @property {Ext.pivot.axis.Item[]} [children=null]
 * Array of children items this item has
 */

/**
 * @property {Boolean} [expanded=false]
 * Is this item expanded or collapsed?
 */
