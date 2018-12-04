/**
 * @class Ext.data.schema.ManyToOne
 * @extend Ext.data.schema.Association
 * **This class is never created directly. It should be constructed through associations in `Ext.data.Model`.**
 *
 * Declares a relationship between a single entity type and multiple related entities. The relationship can
 * be declared as a keyed or keyless relationship.
 *
 *     // Keyed
 *     Ext.define('Customer', {
 *         extend: 'Ext.data.Model',
 *         fields: ['id', 'name']
 *     });
 *
 *     Ext.define('Ticket', {
 *         extend: 'Ext.data.Model',
 *         fields: ['id', 'title', {
 *             name: 'customerId',
 *             reference: 'Customer'
 *         }]
 *     });
 *
 *     // Keyless
 *     Ext.define('Customer', {
 *         extend: 'Ext.data.Model',
 *         fields: ['id', 'name'],
 *         hasMany: 'Ticket'
 *     });
 *
 *     Ext.define('Ticket', {
 *         extend: 'Ext.data.Model',
 *         fields: ['id', 'title']
 *     });
 *
 *     // Generated methods
 *     var customer = new Customer();
 *     customer.tickets();
 *
 *     var ticket = new Ticket();
 *     ticket.getCustomer();
 *     ticket.setCustomer();
 *
 * By declaring a keyed relationship, extra functionality is gained that maintains
 * the key field in the model as changes are made to the association. 
 * 
 * For available configuration options, see {@link Ext.data.schema.Reference}.
 * The "one" record type will have a generated {@link Ext.data.schema.Association#storeGetter}. The "many" record type
 * will have a {@link Ext.data.schema.Association#recordGetter getter} and {@link Ext.data.schema.Association#recordSetter setter}.
 */
