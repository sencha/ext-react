/**
 * @class Ext.pivot.d3.AbstractContainer
 * @extend Ext.Panel
 * This container can host D3 drawing components that need a pivot configurator
 * plugin.
 */

/**
 * @cfg {Ext.pivot.matrix.Base} matrix (required)
 *
 * This is the pivot matrix used by the pivot D3 container. All axis and aggregate dimensions should
 * be defined here.
 *
 * Needed by this pivot container so that the configurator plugin can call getMatrix.
 *
 * This matrix is also used by the {@link #drawing}.
 * @accessor
 */

/**
 * @cfg {Ext.Component} drawing
 *
 * Configuration object for the item that will be added to this container
 * @accessor
 */

/**
 * @cfg {Ext.pivot.plugin.Configurator} [configurator=null]
 *
 * Configuration object for the pivot Configurator plugin.
 * @accessor
 */
