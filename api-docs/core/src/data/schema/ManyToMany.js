/**
 * @class Ext.data.schema.ManyToMany
 * @extend Ext.data.schema.Association
 *
 * This relationship describes the case where any one entity of one type may relate to any
 * number of entities of another type, and also in the reverse.
 * 
 * This form of association cannot store id's in the related entities since that would
 * limit the number of related entities to one for the entity with the foreign key. Instead,
 * these relationships are typically implemented using a so-called "matrix" table. This
 * table typically has two columns to hold the id's of a pair of related entities. This
 * pair of id's is unique in the matrix table.
 * 
 * # Declaration Forms
 * 
 *      // Fully spelled out - all properties are their defaults:
 *      
 *      Ext.define('App.models.Group', {
 *          extend: 'Ext.data.Model',
 *          
 *          manyToMany: {
 *              UserGroups: {
 *                  type: 'User',
 *                  role: 'users',
 *                  field: 'userId',
 *                  right: {
 *                      field: 'groupId',
 *                      role: 'groups'
 *                  }
 *              }
 *          }
 *      });
 *
 *      // Eliminate "right" object and use boolean to indicate Group is on the
 *      // right. By default, left/right is determined by alphabetic order.
 *      
 *      Ext.define('App.models.Group', {
 *          extend: 'Ext.data.Model',
 *          
 *          manyToMany: {
 *              UserGroups: {
 *                  type: 'User',
 *                  role: 'users',
 *                  field: 'userId',
 *                  right: true
 *              }
 *          }
 *      });
 *
 *      // Eliminate object completely and rely on string to name the other type. Still
 *      // keep Group on the "right".
 *      
 *      Ext.define('App.models.Group', {
 *          extend: 'Ext.data.Model',
 *          
 *          manyToMany: {
 *              UserGroups: 'User#'   // '#' is on the side (left or right) of Group
 *          }
 *      });
 *
 *      // Remove explicit matrix name and keep Group on the "right". Generated matrixName
 *      // remains "UserGroups".
 *      
 *      Ext.define('App.models.Group', {
 *          extend: 'Ext.data.Model',
 *          
 *          manyToMany: [
 *              'User#'
 *          ]
 *      });
 *
 *      // Minimal definition but now Group is on the "left" since "Group" sorts before
 *      // "User". Generated matrixName is now "GroupUsers".
 *      
 *      Ext.define('App.models.Group', {
 *          extend: 'Ext.data.Model',
 *          
 *          manyToMany: [
 *              'User'
 *          ]
 *      });
 */
