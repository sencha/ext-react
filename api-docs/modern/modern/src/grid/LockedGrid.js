/**
 * The `lockedgrid` component manages one or more child `grid`s that independently scroll
 * in the horizontal axis but are vertically synchronized. The end-user can, using column
 * menus or drag-drop, control which of these {@link #cfg!regions regions} contain which
 * columns.
 *
 * ## Locked Regions
 *
 * The `lockedgrid` always has a `center` {@link Ext.grid.LockedGridRegion region} and by
 * default a `left` and `right` region. These regions are derivatives of `Ext.panel.Panel`
 * (to allow them to be resized and collapsed) and contain normal `grid` with a subset of
 * the overall set of `columns`. All keys in the `regions` config object are valid values
 * for a {@link Ext.grid.column.Column column}'s `locked` config. The values of each of
 * the properties of the `regions` config are configurations for the locked region itself.
 *
 * The layout of the locked regions is a simple `hbox` with the `center` assigned `flex:1`
 * and the non-center regions assigned a width based on the columns contained in that
 * region. The order of items in the container is determined by the `weight` assigned to
 * each region. Regions to the left of center have negative `weight` values, while regions
 * to the right of center have positive `weight` values. This distinction is important
 * primarily to determine the side of the region on which to display the resizer as well
 * as setting the direction of collapse for the region.
 *
 * ## Config and Event Delegation
 *
 * The `lockedgrid` mimics the config properties and events fired by a normal `grid`. It
 * does this in some cases by delegating configs to each child grid. The `regions` config
 * should be used to listen to events or configure a child grid independently when this
 * isn't desired.
 */

/**
 * @cfg {String} defaultLockedRegion
 * This config determines which region corresponds to `locked: true` on a column.
 */

/**
 * @cfg {Object} gridDefaults
 * This config is applied to the child `grid` in all regions.
 */

/**
 * @cfg {Object} leftGridDefaults
 * This config is applied to the child `grid` in all left-side regions (those of
 * negative `weight`)
 */

/**
 * @cfg {Object} regions
 * This config determines the set of possible locked regions. Each key name in this
 * object denotes a named region (for example, "left", "right" and "center"). While
 * the set of names is not fixed, meaning a `lockedgrid` can have more than these
 * three regions, there must always be a "center" region. The center regions cannot
 * be hidden or collapsed or emptied of all columns.
 *
 * The values of each property in this object are configuration objects for the
 * {@link Ext.grid.LockedGridRegion region}. The ordering of grids is determined
 * by the `weight` config. Negative values are "left" regions, while positive values
 * are "right" regions. The `menuLabel` is used in the column menu to allow the user
 * to place columns into the region.
 *
 * To add an additional left region:
 *
 *      xtype: 'lockedgrid',
 *      regions: {
 *          left2: {
 *              menuLabel: 'Locked (leftmost)',
 *              weight: -20   // to the left of the standard "left" region
 *          }
 *      }
 */

/**
 * @cfg {Object} rightGridDefaults
 * This config is applied to the child `grid` in all right-side regions (those of
 * positive `weight`)
 */
