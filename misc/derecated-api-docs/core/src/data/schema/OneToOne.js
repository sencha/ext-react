/**
 * @class Ext.data.schema.OneToOne
 * @extend Ext.data.schema.Association
 *
 * **This class is never created directly. It should be constructed through associations in `Ext.data.Model`.**
 *
 * This is a specialized version of `Ext.data.schema.ManyToOne` that declares a relationship between a single 
 * entity type and a single related entities. The relationship can be declared as a keyed or keyless relationship.
 *
 *     // Keyed
 *     Ext.define('User', {
 *         extend: 'Ext.data.Model',
 *         fields: ['id', 'name', {
 *             name: 'userInfoId',
 *             reference: {
 *                 type: 'UserInfo',
 *                 unique: true
 *             }
 *         }]
 *     });
 *
 *     Ext.define('UserInfo', {
 *         extend: 'Ext.data.Model',
 *         fields: ['id', 'secretKey']
 *     });
 *
 *     // Keyless
 *     Ext.define('User', {
 *         extend: 'Ext.data.Model',
 *         fields: ['id', 'name'],
 *         hasOne: 'UserInfo'
 *     });
 *
 *     Ext.define('Ticket', {
 *         extend: 'Ext.data.Model',
 *         fields: ['id', 'secretKey']
 *     });
 *
 *     // Generated methods
 *     var user = new User();
 *     user.getUserInfo();
 *     user.setUserInfo();
 *     
 *     var info = new UserInfo();
 *     info.getUser();
 *     info.setUser();
 *     
 *
 *     var ticket = new Ticket();
 *     ticket.setCustomer(customer);
 *     console.log(ticket.getCustomer()); // The customer object
 *
 * By declaring a keyed relationship, extra functionality is gained that maintains
 * the key field in the model as changes are made to the association. 
 * 
 * For available configuration options, see {@link Ext.data.schema.Reference}.
 * Each record type will have a {@link Ext.data.schema.Association#recordGetter getter} and {@link Ext.data.schema.Association#recordSetter setter}.
 */
