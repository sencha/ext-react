/**
 * @class Ext.plugin.Abstract
 * @extend Ext.Base
 *
 * This is the base class from which all plugins should extend.
 *
 * This class defines the essential API of plugins as used by Components by defining the
 * following methods:
 *
 *  - `init` : The plugin initialization method which the host Component calls during
 *     Component initialization. The Component passes itself as the sole parameter.
 *     Subclasses should set up bidirectional links between the plugin and its host
 *     Component here.
 *
 *  - `destroy` : The plugin cleanup method which the host Component calls at Component
 *     destruction time. Use this method to break links between the plugin and the
 *     Component and to free any allocated resources.
 */

/**
 * @method detachCmp
 * Plugins that can be disconnected from their host component should implement
 * this method.
 * @since 6.2.0
 */

/**
 * @method getCmp
 * Returns the component to which this plugin is attached.
 * @return {Ext.Component} The owning host component.
 */

/**
 * @method clonePlugin
 * Creates clone of the plugin.
 * @param {Object} [overrideCfg] Additional config for the derived plugin.
 */

/**
 * @method setCmp
 * Sets the host component to which this plugin is attached. For a plugin to be
 * removable without being destroyed, this method should be provided and be prepared
 * to receive `null` for the component.
 * @param {Ext.Component} host The owning host component.
 */

/**
 * @cfg {String} id
 * An identifier for the plugin that can be set at creation time to later retrieve the
 * plugin using the {@link #getPlugin getPlugin} method. For example:
 *
 *      var panel = Ext.create({
 *          xtype: 'panel',
 *
 *          plugins: [{
 *              id: 'foo',
 *              ...
 *          }]
 *      });
 *
 *      // later on:
 *      var plugin = panel.getPlugin('foo');
 *
 * @since 6.2.0
 */

/**
 * @method destroy
 *
 * The destroy method is invoked by the owning Component at the time the Component is
 * being destroyed.
 */

/**
 * @method init
 * The init method is invoked to formally associate the host component and the plugin.
 *
 * Subclasses should perform initialization and set up any requires links between the
 * plugin and its host Component in their own implementation of this method.
 * @param {Ext.Component} host The host Component which owns this plugin.
 */
