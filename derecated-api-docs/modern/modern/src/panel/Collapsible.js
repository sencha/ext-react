/**
 * @class Ext.Panel
 */

/**
 * @cfg {Boolean} [collapsed]
 * `true` to start collapsed.
 * @accessor
 */

/**
 * @cfg {'top'/'right'/'bottom'/'left'/Boolean/Object} [collapsible]
 * A configuration for a {@link Ext.panel.Collapser Collapser}.
 *
 * True to make the panel collapsible and have an expand/collapse toggle Tool added into the header tool button
 * area.
 *
 * You can also set `top`/`right`/`bottom`/`left` to directly specify the collapse direction.
 *
 * @since 6.5.0
 * @accessor
 */

 /**
* @cfg {Boolean} [titleCollapse]
* `true` to allow expanding and collapsing the panel (when `{@link #collapsible} = true`)
* by clicking anywhere in the header bar, `false` to allow it only by clicking to tool
* button.
* @since 7.0
*/

/**
 * @event beforecollapse
 * Fires before collapse starts. Return `false` to cancel collapse.
 * @param {Ext.panel.Panel} this
 *
 * @since 6.5.0
 */

/**
 * @event beforeexpand
 * Fires before expand starts. Return `false` to cancel expand.
 * @param {Ext.panel.Panel} this
 *
 * @since 6.5.0
 */

/**
 * @event collapse
 * Fires when the collapse starts.
 * @param {Ext.panel.Panel} this
 *
 * @since 6.5.0
 */

/**
 * @event drawerhide
 * Fires then the {@link #Ext.panel.Collapser#cfg-drawer drawer} hides.
 *
 * @param {Ext.panel.Panel} this
 * @since 6.5.0
 */

/**
 * @event drawershow
 * Fires then the {@link #Ext.panel.Collapser#cfg-drawer drawer} shows.
 *
 * @param {Ext.panel.Panel} this
 * @since 6.5.0
 */

/**
 * @event expand
 * Fires when the expand starts.
 * @param {Ext.panel.Panel} this
 *
 * @since 6.5.0
 */

/**
 * @property {Boolean} [hasCollapsible=true]
 * `true` if this panel has the collapsible override added.
 *
 * @since 6.5.0
 */
