/**
 * @class Ext.panel.Collapser
 * @extend Ext.Base
 * This class allows a {@link Ext.Panel Panel} to be collapsible via user interaction.
 *
 * @since 6.5.0
 */

/**
 * @cfg {Boolean/Object} [animation]
 * Animation effect to apply when the Panel is being expanded or collapsed.
 * Set to `null` for no animations. For more fine grained control, see
 * {@link #cfg-expandAnimation} and {@link #cfg-collapseAnimation}.
 * @accessor
 */

/**
 * @cfg {Boolean/Object} [collapseAnimation]
 * Animation effect to apply when the panel is being collapsed. If not specified,
 * this falls back to {@link #cfg-animation}.
 * @accessor
 */

/**
 * @cfg {Boolean} [collapsed=false]
 * True to make the panel collapsed. False to expand the panel.
 * @accessor
 */

/**
 * @cfg {String} [collapseToolText='Collapse panel']
 * Text to be announced by screen readers when
 * **collapse** {@link Ext.panel.Tool tool} is focused.  Will also be set as the
 * collapse tool's {@link Ext.panel.Tool#cfg-tooltip tooltip} text.
 *
 * @locale
 * @accessor
 */

/**
 * @cfg {'top'/'right'/'bottom'/'left'} [direction='top']
 * The direction to collapse the Panel when the toggle button is clicked.
 * Defaults to {@link Ext.Panel#headerPosition}.
 * @accessor
 */

/**
 * @cfg {Object} [drawer]
 * The configuration for the drawer component that can display the collapsed
 * component contents without expanding.
 * @accessor
 */

/**
 * @cfg {Number} [drawerHideDelay=500]
 * @accessor
 */

/**
 * @cfg {Boolean} [dynamic=null]
 * `true` to "live resize" the panels as they collapse. `false` to pre-determine
 * the size of surrounding components and then animate. `false` provides a performance
 * benefit because it won't trigger reflow of other components during resizing.
 *
 * The value defaults to `null` and the behavior is determined via the current state.
 * `true` for floated containers, or containers that are not inside a parent container.
 *
 * This config only applies when using animation.
 * @accessor
 */

/**
 * @cfg {Boolean/Object} [expandAnimation]
 * Animation effect to apply when the panel is being expanded. If not specified,
 * this falls back to {@link #cfg-animation}.
 * @accessor
 */

/**
 * @cfg {String} [expandToolText='Expand panel'] Text to be announced by screen readers when
 * **expand** {@link Ext.panel.Tool tool} is focused.  Will also be set as the
 * expand tool's {@link Ext.panel.Tool#cfg-tooltip tooltip} text.
 *
 * @locale
 * @accessor
 */

/**
 * @cfg {Object} [tool]
 * The configuration for the collapsible tool. This may be set to `null` to not
 * show the tool.
 * @accessor
 */

/**
 * @cfg {Boolean} [useDrawer=true]
 * True to enable the {@link #drawer} to display from user interaction.
 * @accessor
 */
