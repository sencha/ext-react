/**
 * @class Ext.d3.mixin.ToolTip
 * @extend Ext.Mixin
 * The ToolTip mixin is used to add {@link Ext.tip.ToolTip tooltip} support to various
 * D3 components.
 */

/**
 * @cfg {Ext.tip.ToolTip} [tooltip=null]
 * The {@link Ext.tip.ToolTip} class config object with one extra supported
 * property: `renderer`.
 * @cfg {Function} tooltip.renderer
 * For example:
 *
 *     tooltip: {
 *         renderer: function (component, tooltip, node, element) {
 *             tooltip.setHtml('Customer: ' + node.data.get('name'));
 *         }
 *     }
 * @accessor
 */
