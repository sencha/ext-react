/**
 * @class Ext.chart.plugin.ItemEvents
 * @extend Ext.plugin.Abstract
 * @alias plugin.chartitemevents
 *
 * A chart {@link Ext.AbstractPlugin plugin} that adds ability to listen to chart series
 * items events. Item event listeners are passed two parameters: the target item and the
 * event itself. The item object has the following properties:
 *
 * * **category** - the category the item falls under: 'items' or 'markers'
 * * **field** - the store field used by this series item
 * * **index** - the index of the series item
 * * **record** - the store record associated with this series item
 * * **series** - the series the item belongs to
 * * **sprite** - the sprite used to represents this series item
 *
 * For example:
 *
 *     Ext.create('Ext.chart.CartesianChart', {
 *         plugins: {
 *             ptype: 'chartitemevents',
 *             moveEvents: true
 *         },
 *         store: {
 *             fields: ['pet', 'households', 'total'],
 *             data: [
 *                 {pet: 'Cats', households: 38, total: 93},
 *                 {pet: 'Dogs', households: 45, total: 79},
 *                 {pet: 'Fish', households: 13, total: 171}
 *             ]
 *         },
 *         axes: [{
 *             type: 'numeric',
 *             position: 'left'
 *         }, {
 *             type: 'category',
 *             position: 'bottom'
 *         }],
 *         series: [{
 *             type: 'bar',
 *             xField: 'pet',
 *             yField: 'households',
 *             listeners: {
 *                 itemmousemove: function (series, item, event) {
 *                      console.log('itemmousemove', item.category, item.field);
 *                 }
 *             }
 *         }, {
 *             type: 'line',
 *             xField: 'pet',
 *             yField: 'total',
 *             marker: true
 *         }],
 *         listeners: { // Listen to itemclick events on all series.
 *             itemclick: function (chart, item, event) {
 *                 console.log('itemclick', item.category, item.field);
 *             }
 *         }
 *     });
 *
 */

/**
 * @cfg {Boolean} [moveEvents=false]
 * If `itemmousemove`, `itemmouseover` or `itemmouseout` event listeners are attached
 * to the chart, the plugin will detect those and will hit test series items on
 * every move. However, if the above item events are attached on the series level
 * only, this config has to be set to true, as the plugin won't perform a similar
 * detection on every series.
 */
