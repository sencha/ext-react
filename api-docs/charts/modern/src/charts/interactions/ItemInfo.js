/**
 * @class Ext.chart.interactions.ItemInfo
 * @extend Ext.chart.interactions.Abstract
 * @alias interaction.iteminfo
 *
 * The ItemInfo interaction allows displaying detailed information about a series data
 * point in a popup panel.
 *
 * To attach this interaction to a chart, include an entry in the chart's
 * {@link Ext.chart.AbstractChart#interactions interactions} config with the `iteminfo` type:
 *
 *     new Ext.chart.AbstractChart({
 *         renderTo: Ext.getBody(),
 *         width: 800,
 *         height: 600,
 *         store: store1,
 *         axes: [ ...some axes options... ],
 *         series: [ ...some series options... ],
 *         interactions: [{
 *             type: 'iteminfo',
 *             listeners: {
 *                 show: function(me, item, panel) {
 *                     panel.setHtml('Stock Price: $' + item.record.get('price'));
 *                 }
 *             }
 *         }]
 *     });
 */

/**
 * @event show
 * Fires when the info panel is shown.
 * @param {Ext.chart.interactions.ItemInfo} this The interaction instance
 * @param {Object} item The item whose info is being displayed
 * @param {Ext.Panel} panel The panel for displaying the info
 */

/**
 * @cfg {Object} gestures
 * Defines the gestures that should trigger the item info panel to be displayed.
 * @accessor
 */

/**
 * @cfg {Object} panel
 * An optional set of configuration overrides for the {@link Ext.Panel} that gets
 * displayed. This object will be merged with the default panel configuration.
 * @accessor
 */
