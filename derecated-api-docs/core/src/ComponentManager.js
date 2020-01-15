/**
 * @class Ext.ComponentManager
 *
 * Provides a registry of all Components (instances of {@link Ext.Component} or any subclass
 * thereof) on a page so that they can be easily accessed by {@link Ext.Component component}
 * {@link Ext.Component#id id} (see {@link #get}, or the convenience method
 * {@link Ext#getCmp Ext.getCmp}).
 *
 * This object also provides a registry of available Component *classes* indexed by a
 * mnemonic code known as the Component's {@link Ext.Component#xtype xtype}. The `xtype`
 * provides a way to avoid instantiating child Components when creating a full, nested
 * config object for a complete Ext page.
 *
 * A child Component may be specified simply as a *config object* as long as the correct
 * `{@link Ext.Component#xtype xtype}` is specified so that if and when the Component
 * needs rendering, the correct type can be looked up for lazy instantiation.
 * 
 * @singleton
 */

/**
 * @method get
 * Returns an item by id.
 * @param {String} id The id of the item
 * @return {Object} The item, undefined if not found.
 */

/**
 * @method getCmp
 * This is shorthand reference to {@link Ext.ComponentManager#get}.
 * Looks up an existing {@link Ext.Component Component} by {@link Ext.Component#id id}
 *
 * @param {String} id The component {@link Ext.Component#id id}
 * @return {Ext.Component} The Component, `undefined` if not found, or `null` if a
 * Class was found.
 * @member Ext
 */
