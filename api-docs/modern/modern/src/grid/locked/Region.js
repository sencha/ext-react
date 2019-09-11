/**
 * @class Ext.grid.locked.Region
 * @extend Ext.Panel
 * @xtype lockedgridregion
 * @isLockedGridRegion true
 * @alternateClassName Ext.grid.LockedGridRegion
 * This class is used by the {@link Ext.grid.locked.Grid lockedgrid} component to wrap each
 * child grid. Being a `panel`, regions can be `resizable` and `collapsible`.
 * In collapsed state, the region will also display a `title`.
 *
 * The `weight` config is used to configure the {@link Ext.panel.Resizer resizable} and
 * {@link Ext.panel.Collapser collapsible} panel properties.
 */

/**
 * @cfg {Ext.grid.Grid} grid
 * This config governs the child grid in this region.
 */


/**
 * @cfg {Boolean/String} locked
 * Determines whether the region is locked or not.
 * Configure as `true` to lock the grid to default locked region 
 * {@link Ext.grid.locked.Grid LockedGrid}
 * String values contains one of the defined locking regions - "left", "right" or "center"
 */

/**
 * @cfg {String} menuItem
 * Configuration for the `menuItem` used in the "Locked" regions menu.
 * @since 7.0
 */

/**
 * @cfg {String} menuLabel
 * The `menuLabel` is used to give custom menu labels to the defined regions
 * This is deprecated. Instead use:
 *
 *      menuItem: {
 *          text: 'Text'
 *      }
 *
 * @deprecated 7.0 Use `menuItem` instead.
 */

/**
 * @cfg {String} regionKey
 * This config provides the set of possible locked regions. Each value denotes a named 
 * region (for example, "left", "right" and "center").
 * While the set of names is not fixed, meaning a `lockedgrid` can have more than these
 * three regions, there must always be a "center" region. The center regions cannot
 * be hidden or collapsed or emptied of all columns.
 */
