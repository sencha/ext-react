/**
 * @class Ext.chart.AbstractChart
 * @extend Ext.draw.Container
 *
 * The Ext.chart package provides the capability to visualize data.
 * Each chart binds directly to a {@link Ext.data.Store store} enabling automatic updates of the chart.
 * A chart configuration object has some overall styling options as well as an array of axes
 * and series. A chart instance example could look like this:
 *
 *     Ext.create('Ext.chart.CartesianChart', {
 *         width: 800,
 *         height: 600,
 *         animation: {
 *             easing: 'backOut',
 *             duration: 500
 *         },
 *         store: store1,
 *         legend: {
 *             position: 'right'
 *         },
 *         axes: [
 *             // ...some axes options...
 *         ],
 *         series: [
 *             // ...some series options...
 *         ]
 *     });
 *
 * In this example we set the `width` and `height` of a chart; We decide whether our series are
 * animated or not and we select a store to be bound to the chart; We also set the legend to the right part of the
 * chart.
 *
 * You can register certain interactions such as {@link Ext.chart.interactions.PanZoom} on the chart by specify an
 * array of names or more specific config objects. All the events will be wired automatically.
 *
 * You can also listen to series `itemXXX` events on both chart and series level.
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
 *                     console.log('itemmousemove', item.category, item.field);
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
 * For more information about the axes and series configurations please check the documentation of
 * each series (Line, Bar, Pie, etc).
 *
 */

/**
 * @event beforerefresh
 * Fires before a refresh to the chart data is called.  If the `beforerefresh` handler returns
 * `false` the {@link #refresh} action will be canceled.
 * @param {Ext.chart.AbstractChart} this
 */

/**
 * @event refresh
 * Fires after the chart data has been refreshed.
 * @param {Ext.chart.AbstractChart} this
 */

/**
 * @event redraw
 * Fires after each {@link #redraw} call.
 * @param {Ext.chart.AbstractChart} this
 */

/**
 * @private
 * @event layout
 * Fires after the final layout is done.
 * (Two layouts may be required to fully render a chart.
 * Typically for the initial render and every time thickness
 * of the chart's axes changes.)
 * @param {Ext.chart.AbstractChart} this
 */

/**
 * @event itemhighlight
 * Fires when a new chart item is highlighted or dehighlighted.
 * The `newHighlightItem` and `oldHighlightItem` objects will have the same type as
 * the object returned by the {@link #getItemForPoint} method.
 * @param {Ext.chart.AbstractChart} chart
 * @param {Object} newHighlightItem
 * @param {Object} oldHighlightItem
 */

/**
 * @event itemmousemove
 * Fires when the mouse is moved on a series item.
 * *Note*: This event requires the {@link Ext.chart.plugin.ItemEvents chartitemevents}
 * plugin be added to the chart.
 * @param {Ext.chart.AbstractChart} chart
 * @param {Object} item
 * @param {Event} event
 */

/**
 * @event itemmouseup
 * Fires when a mouseup event occurs on a series item.
 * *Note*: This event requires the {@link Ext.chart.plugin.ItemEvents chartitemevents}
 * plugin be added to the chart.
 * @param {Ext.chart.AbstractChart} chart
 * @param {Object} item
 * @param {Event} event
 */

/**
 * @event itemmousedown
 * Fires when a mousedown event occurs on a series item.
 * *Note*: This event requires the {@link Ext.chart.plugin.ItemEvents chartitemevents}
 * plugin be added to the chart.
 * @param {Ext.chart.AbstractChart} chart
 * @param {Object} item
 * @param {Event} event
 */

/**
 * @event itemmouseover
 * Fires when the mouse enters a series item.
 * *Note*: This event requires the {@link Ext.chart.plugin.ItemEvents chartitemevents}
 * plugin be added to the chart.
 * @param {Ext.chart.AbstractChart} chart
 * @param {Object} item
 * @param {Event} event
 */

/**
 * @event itemmouseout
 * Fires when the mouse exits a series item.
 * *Note*: This event requires the {@link Ext.chart.plugin.ItemEvents chartitemevents}
 * plugin be added to the chart.
 * @param {Ext.chart.AbstractChart} chart
 * @param {Object} item
 * @param {Event} event
 */

/**
 * @event itemclick
 * Fires when a click event occurs on a series item.
 * *Note*: This event requires the {@link Ext.chart.plugin.ItemEvents chartitemevents}
 * plugin be added to the chart.
 * @param {Ext.chart.AbstractChart} chart
 * @param {Object} item
 * @param {Event} event
 */

/**
 * @event itemdblclick
 * Fires when a double click event occurs on a series item.
 * *Note*: This event requires the {@link Ext.chart.plugin.ItemEvents chartitemevents}
 * plugin be added to the chart.
 * @param {Ext.chart.AbstractChart} chart
 * @param {Object} item
 * @param {Event} event
 */

/**
 * @event itemtap
 * Fires when a tap event occurs on a series item.
 * *Note*: This event requires the {@link Ext.chart.plugin.ItemEvents chartitemevents}
 * plugin be added to the chart.
 * @param {Ext.chart.AbstractChart} chart
 * @param {Object} item
 * @param {Event} event
 */

/**
 * @event storechange
 * Fires when the store of the chart changes.
 * @param {Ext.chart.AbstractChart} chart
 * @param {Ext.data.Store} newStore
 * @param {Ext.data.Store} oldStore
 */

/**
 * @cfg {Ext.data.Store/String/Object} [store='ext-empty-store']
 * The data source to which the chart is bound. Acceptable values for this property are:
 *
 *   - **any {@link Ext.data.Store Store} class / subclass**
 *   - **an {@link Ext.data.Store#storeId ID of a store}**
 *   - **a {@link Ext.data.Store Store} config object**.  When passing a config you can
 *     specify the store type by alias.  Passing a config object with a store type will
 *     dynamically create a new store of that type when the chart is instantiated.
 *
 * For example:
 *
 *     Ext.define('MyApp.store.Customer', {
 *         extend: 'Ext.data.Store',
 *         alias: 'store.customerstore',
 *
 *         fields: ['name', 'value']
 *     });
 *
 *
 *     Ext.create({
 *         xtype: 'cartesian',
 *         renderTo: document.body,
 *         height: 400,
 *         width: 400,
 *         store: {
 *             type: 'customerstore',
 *             data: [{
 *                 name: 'metric one',
 *                 value: 10
 *             }]
 *         },
 *         axes: [{
 *             type: 'numeric',
 *             position: 'left',
 *             title: {
 *                 text: 'Sample Values',
 *                 fontSize: 15
 *             },
 *             fields: 'value'
 *         }, {
 *             type: 'category',
 *             position: 'bottom',
 *             title: {
 *                 text: 'Sample Values',
 *                 fontSize: 15
 *             },
 *             fields: 'name'
 *         }],
 *         series: {
 *             type: 'bar',
 *             xField: 'name',
 *             yField: 'value'
 *         }
 *     });
 *
 * @accessor
 */

/**
 * @cfg {String} [theme="default"]
 * The name of the theme to be used. A theme defines the colors and styles
 * used by the series, axes, markers and other chart components.
 * Please see the documentation for the {@link Ext.chart.theme.Base} class for more information.
 * Possible theme values are:
 *   - 'green', 'sky', 'red', 'purple', 'blue', 'yellow'
 *   - 'category1' to 'category6'
 *   - and the above theme names with the '-gradients' suffix, e.g. 'green-gradients'
 *
 * IMPORTANT: You should require the themes you use; for example, to use:
 *
 *     theme: 'blue'
 *
 * the `Ext.chart.theme.Blue` class should be required:
 *
 *     requires: 'Ext.chart.theme.Blue'
 *
 * To require all chart themes:
 *
 *     requires: 'Ext.chart.theme.*'
 *
 * @accessor
 */

/**
 * @cfg {Object} style
 * The style for the chart component.
 * @accessor
 */

/**
 * @cfg {Boolean/Object} animation (optional)
 * `true` for the default animation (easing: 'ease' and duration: 500)
 * or a standard animation config object to be used for default chart animations.
 * @accessor
 */

/**
 * @cfg {Ext.chart.series.Series/Array} [series=[]]
 * Array of {@link Ext.chart.series.Series Series} instances or config objects. For example:
 *
 *     series: [{
 *         type: 'column',
 *         axis: 'left',
 *         listeners: {
 *             'afterrender': function() {
 *                 console.log('afterrender');
 *             }
 *         },
 *         xField: 'category',
 *         yField: 'data1'
 *     }]
 *
 * @accessor
 */

/**
 * @cfg {Ext.chart.axis.Axis/Array/Object} [axes=[]]
 * Array of {@link Ext.chart.axis.Axis Axis} instances or config objects. For example:
 *
 *     axes: [{
 *         type: 'numeric',
 *         position: 'left',
 *         title: 'Number of Hits',
 *         minimum: 0
 *     }, {
 *         type: 'category',
 *         position: 'bottom',
 *         title: 'Month of the Year'
 *     }]
 *
 * @accessor
 */

/**
 * @cfg {Ext.chart.legend.Legend/Ext.chart.legend.SpriteLegend/Boolean} [legend=null]
 * The legend config for the chart. If specified, a legend block will be shown
 * next to the chart.
 * Each legend item displays the {@link Ext.chart.series.Series#title title}
 * of the series, the color of the series and allows to toggle the visibility
 * of the series (at least one series should remain visible).
 *
 * Sencha Charts support two types of legends: DOM based and sprite based.
 *
 * The sprite based legend can be shown in chart {@link Ext.draw.Container#preview preview}
 * and is a part of the downloaded {@link Ext.draw.Container#download chart image}.
 * The sprite based legend is always displayed in full and takes as much space as necessary,
 * the legend items are split into columns to use the available space efficiently.
 * The sprite based legend is styled via a {@link Ext.chart.theme.Base chart theme}.
 *
 * The DOM based legend supports RTL.
 * It occupies a fixed width or height and scrolls when the content overflows.
 * The DOM based legend is styled via CSS rules.
 *
 * By default the DOM legend is used. The type can be explicitly specified:
 *
 *     legend: {
 *         type: 'sprite', // 'dom' is another possible value
 *         docked: 'top'
 *     }
 *
 * If the legend config is set to `true`, the DOM legend will be used
 * docked to the bottom.
 *
 * @accessor
 */

/**
 * @cfg {Array} [colors=null]
 * Array of colors/gradients to override the color of items and legends.
 *
 * @accessor
 */

/**
 * @cfg {Object|Number|String} insetPadding
 * The amount of inset padding in pixels for the chart.
 * Inset padding is the padding from the boundary of the chart to any of its contents.
 *
 * @accessor
 */

/**
 * @cfg {Object} [background=null]
 * Set the chart background.
 * This can be a gradient object, image, or color.
 *
 * For example, if `background` were to be a color we could set the object as
 *
 *     background: '#ccc'
 *
 * You can specify an image by using:
 *
 *     background: {
 *         type: 'image',
 *         src: 'http://path.to.image/'
 *     }
 *
 * Also you can specify a gradient by using the gradient object syntax:
 *
 *     background: {
 *         type: 'linear',
 *         degrees: 0,
 *         stops: [
 *             {
 *                 offset: 0,
 *                 color: 'white'
 *             },
 *             {
 *                 offset: 1,
 *                 color: 'blue'
 *             }
 *         ]
 *     }
 *
 * @accessor
 */

/**
 * @cfg {Array} [interactions=[]]
 * Interactions are optional modules that can be plugged in to a chart
 * to allow the user to interact with the chart and its data in special ways.
 * The `interactions` config takes an Array of Object configurations,
 * each one corresponding to a particular interaction class identified
 * by a `type` property:
 *
 *     new Ext.chart.AbstractChart({
 *         renderTo: Ext.getBody(),
 *         width: 800,
 *         height: 600,
 *         store: store1,
 *         axes: [
 *             // ...some axes options...
 *         ],
 *         series: [
 *             // ...some series options...
 *         ],
 *         interactions: [{
 *             type: 'interactiontype'
 *             // ...additional configs for the interaction...
 *         }]
 *     });
 *
 * When adding an interaction which uses only its default configuration
 * (no extra properties other than `type`), you can alternately specify
 * only the type as a String rather than the full Object:
 *
 *     interactions: ['reset', 'rotate']
 *
 * The current supported interaction types include:
 *
 * - {@link Ext.chart.interactions.PanZoom panzoom} - allows pan and zoom of axes
 * - {@link Ext.chart.interactions.ItemHighlight itemhighlight} - allows highlighting of series data points
 * - {@link Ext.chart.interactions.ItemInfo iteminfo} - allows displaying details of a data point in a popup panel
 * - {@link Ext.chart.interactions.Rotate rotate} - allows rotation of pie and radar series
 *
 * See the documentation for each of those interaction classes to see how they can be configured.
 *
 * Additional custom interactions can be registered using `'interactions.'` alias prefix.
 * @accessor
 */

/**
 * @cfg {Object} [highlightItem=null]
 * The current highlight item in the chart.
 * The object must be the one that you get from item events.
 *
 * Note that series can also own highlight items.
 * This notion is separate from this one and should not be used at the same time.
 *
 * @accessor
 */
