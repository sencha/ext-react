/**
 * @class Ext.chart.series.Series
 * @extend Ext.Base
 * Series is the abstract class containing the common logic to all chart series. Series includes
 * methods from Labels, Highlights, and Callouts mixins. This class implements the logic of
 * animating, hiding, showing all elements and returning the color of the series to be used as a legend item.
 */

/**
 * @property {String} [seriesType='sprite']
 * Default series sprite type.
 */

/**
 * @event itemmousemove
 * Fires when the mouse is moved on a series item.
 * *Note*: This event requires the {@link Ext.chart.plugin.ItemEvents chartitemevents}
 * plugin be added to the chart.
 * @param {Ext.chart.series.Series} series
 * @param {Object} item
 * @param {Event} event
 */

/**
 * @event itemmouseup
 * Fires when a mouseup event occurs on a series item.
 * *Note*: This event requires the {@link Ext.chart.plugin.ItemEvents chartitemevents}
 * plugin be added to the chart.
 * @param {Ext.chart.series.Series} series
 * @param {Object} item
 * @param {Event} event
 */

/**
 * @event itemmousedown
 * Fires when a mousedown event occurs on a series item.
 * *Note*: This event requires the {@link Ext.chart.plugin.ItemEvents chartitemevents}
 * plugin be added to the chart.
 * @param {Ext.chart.series.Series} series
 * @param {Object} item
 * @param {Event} event
 */

/**
 * @event itemmouseover
 * Fires when the mouse enters a series item.
 * *Note*: This event requires the {@link Ext.chart.plugin.ItemEvents chartitemevents}
 * plugin be added to the chart.
 * @param {Ext.chart.series.Series} series
 * @param {Object} item
 * @param {Event} event
 */

/**
 * @event itemmouseout
 * Fires when the mouse exits a series item.
 * *Note*: This event requires the {@link Ext.chart.plugin.ItemEvents chartitemevents}
 * plugin be added to the chart.
 * @param {Ext.chart.series.Series} series
 * @param {Object} item
 * @param {Event} event
 */

/**
 * @event itemclick
 * Fires when a click event occurs on a series item.
 * *Note*: This event requires the {@link Ext.chart.plugin.ItemEvents chartitemevents}
 * plugin be added to the chart.
 * @param {Ext.chart.series.Series} series
 * @param {Object} item
 * @param {Event} event
 */

/**
 * @event itemdblclick
 * Fires when a double click event occurs on a series item.
 * *Note*: This event requires the {@link Ext.chart.plugin.ItemEvents chartitemevents}
 * plugin be added to the chart.
 * @param {Ext.chart.series.Series} series
 * @param {Object} item
 * @param {Event} event
 */

/**
 * @event itemtap
 * Fires when a tap event occurs on a series item.
 * *Note*: This event requires the {@link Ext.chart.plugin.ItemEvents chartitemevents}
 * plugin be added to the chart.
 * @param {Ext.chart.series.Series} series
 * @param {Object} item
 * @param {Event} event
 */

/**
 * @event chartattached
 * Fires when the {@link Ext.chart.AbstractChart} has been attached to this series.
 * @param {Ext.chart.AbstractChart} chart
 * @param {Ext.chart.series.Series} series
 */
/**
 * @event chartdetached
 * Fires when the {@link Ext.chart.AbstractChart} has been detached from this series.
 * @param {Ext.chart.AbstractChart} chart
 * @param {Ext.chart.series.Series} series
 */

/**
 * @event storechange
 * Fires when the store of the series changes.
 * @param {Ext.chart.series.Series} series
 * @param {Ext.data.Store} newStore
 * @param {Ext.data.Store} oldStore
 */

/**
 * @cfg {String|String[]} [title=null]
 * The human-readable name of the series (displayed in the legend).
 * If the series is stacked (has multiple components in it) this
 * should be an array, where each string corresponds to a stacked component.
 *
 * @accessor
 */

/**
 * @cfg {Function} [renderer=null]
 * A function that can be provided to set custom styling properties to each rendered element.
 * It receives `(sprite, config, rendererData, index)` as parameters.
 *
 * @param {Object} sprite The sprite affected by the renderer. The visual attributes are in `sprite.attr`.
 * The data field is available in `sprite.getField()`.
 * @param {Object} config The sprite configuration. It varies with the series and the type of sprite:
 * for instance, a Line chart sprite might have just the `x` and `y` properties while a Bar
 * chart sprite also has `width` and `height`. A `type` might be present too. For instance to
 * draw each marker and each segment of a Line chart, the renderer is called with the
 * `config.type` set to either `marker` or `line`.
 * @param {Object} rendererData A record with different properties depending on the type of chart.
 * The only guaranteed property is `rendererData.store`, the store used by the series.
 * In some cases, a store may not exist: for instance a Gauge chart may read its value directly
 * from its configuration; in this case rendererData.store is null and the value is
 * available in rendererData.value.
 * @param {Number} index The index of the sprite. It is usually the index of the store record associated
 * with the sprite, in which case the record can be obtained with `store.getData().items[index]`.
 * If the chart is not associated with a store, the index represents the index of the sprite within
 * the series. For instance a Gauge chart may have as many sprites as there are sectors in the
 * background of the gauge, plus one for the needle.
 *
 * @return {Object} The attributes that have been changed or added. Note: it is usually possible to
 * add or modify the attributes directly into the `config` parameter and not return anything,
 * but returning an object with only those attributes that have been changed may allow for
 * optimizations in the rendering of some series. Example to draw every other marker in red:
 *
 *      renderer: function (sprite, config, rendererData, index) {
 *          if (config.type === 'marker') {
 *              return { strokeStyle: (index % 2 === 0 ? 'red' : 'black') };
 *          }
 *      }
 * @accessor
 */

/**
 * @cfg {Boolean} [showInLegend=true]
 * Whether to show this series in the legend.
 * @accessor
 */

/**
 * @cfg {Object} [style={}]
 * Custom style configuration for the sprite used in the series.
 * It overrides the style that is provided by the current theme.
 * @accessor
 */

/**
 * @cfg {Object} [subStyle={}]
 * This is the cyclic used if the series has multiple sprites.
 * @accessor
 */

/**
 * @cfg {Array} [colors=null]
 * An array of color values which is used, in order of appearance, by the series. Each series
 * can request one or more colors from the array. Radar, Scatter or Line charts require just
 * one color each. Candlestick and OHLC require two (1 for drops + 1 for rises). Pie charts
 * and Stacked charts (like Bar or Pie charts) require one color for each data category
 * they represent, so one color for each slice of a Pie chart or each segment (not bar) of
 * a Bar chart.
 * It overrides the colors that are provided by the current theme.
 * @accessor
 */

/**
 * @cfg {Boolean|Number} [useDarkerStrokeColor=true]
 * Colors for the series can be set directly through the 'colors' config, or indirectly
 * with the current theme or the 'colors' config that is set onto the chart. These colors
 * are used as "fill color". Set this config to true, if you want a darker color for the
 * strokes. Set it to false if you want to use the same color as the fill color.
 * Alternatively, you can set it to a number between 0 and 1 to control how much darker
 * the strokes should be.
 *
 * Note: this should be initial config and cannot be changed later on.
 * @accessor
 */

/**
 * @cfg {Object} [store=null]
 * The store to use for this series. If not specified,
 * the series will use the chart's {@link Ext.chart.AbstractChart#store store}.
 * @accessor
 */

/**
 * @cfg {Object} [label={}]
 * Object with the following properties:
 *
 * @cfg {String} label.display
 *
 * Specifies the presence and position of the labels. The possible values depend on the series type.
 * For Line and Scatter series: 'under' | 'over' | 'rotate'.
 * For Bar and 3D Bar series: 'insideStart' | 'insideEnd' | 'outside'.
 * For Pie series: 'outside' | 'rotate' | 'horizontal' | 'vertical'.
 * Area, Radar and Candlestick series don't support labels.
 * For Area and Radar series please consider using {@link #tooltip tooltips} instead.
 * 3D Pie series currently always display labels 'outside'.
 * For all series: 'none' hides the labels.
 *
 * Default value: 'none'.
 *
 * @cfg {String} label.color
 *
 * The color of the label text.
 *
 * Default value: '#000' (black).
 *
 * @cfg {String|String[]} label.field
 *
 * The name(s) of the field(s) to be displayed in the labels. If your chart has 3 series
 * that correspond to the fields 'a', 'b', and 'c' of your model, and you only want to
 * display labels for the series 'c', you must still provide an array `[null, null, 'c']`.
 *
 * Default value: null.
 *
 * @cfg {String} label.font
 *
 * The font used for the labels.
 *
 * Default value: '14px Helvetica'.
 *
 * @cfg {String} label.orientation
 *
 * Either 'horizontal' or 'vertical'. If not set (default), the orientation is inferred
 * from the value of the flipXY property of the series.
 *
 * Default value: ''.
 *
 * @cfg {Function} label.renderer
 *
 * Optional function for formatting the label into a displayable value.
 *
 * The arguments to the method are:
 *
 *   - *`text`*, *`sprite`*, *`config`*, *`rendererData`*, *`index`*
 *
 *     Label's renderer is passed the same arguments as {@link #renderer}
 *     plus one extra 'text' argument which comes first.
 *
 * @return {Object|String} The attributes that have been changed or added, or the text for the label.
 * Example to enclose every other label in parentheses:
 *
 *      renderer: function (text) {
 *          if (index % 2 == 0) {
 *              return '(' + text + ')'
 *          }
 *      }
 *
 * Default value: null
 * @accessor
 */

/**
 * @cfg {Number} [labelOverflowPadding=null]
 * Extra distance value for which the labelOverflow listener is triggered.
 * @accessor
 */

/**
 * @cfg {Boolean} [showMarkers=true]
 * Whether markers should be displayed at the data points along the line. If true,
 * then the {@link #marker} config item will determine the markers' styling.
 * @accessor
 */

/**
 * @cfg {Object|Boolean} [marker=null]
 * The sprite template used by marker instances on the series.
 * If the value of the marker config is set to `true` or the type
 * of the sprite instance is not specified, the {@link Ext.draw.sprite.Circle}
 * sprite will be used.
 *
 * Examples:
 *
 *     marker: true
 *
 *     marker: {
 *         radius: 8
 *     }
 *
 *     marker: {
 *         type: 'arrow',
 *         animation: {
 *             duration: 200,
 *             easing: 'backOut'
 *         }
 *     }
 * @accessor
 */

/**
 * @cfg {Object} [markerSubStyle=null]
 * This is cyclic used if series have multiple marker sprites.
 * @accessor
 */

/**
 * @cfg {Object} [background=null]
 * Sets the background of the surface the series is attached.
 * @accessor
 */

/**
 * @cfg {Boolean|Array} [hidden=false]
 * @accessor
 */

/**
 * @cfg {Boolean/Object} [highlight=false]
 * The sprite attributes that will be applied to the highlighted items in the series.
 * If set to 'true', the default highlight style from {@link #highlightCfg} will be used.
 * If the value of this config is an object, it will be merged with the {@link #highlightCfg}.
 * In case merging of 'highlight' and 'highlightCfg' configs in not the desired behavior,
 * provide the 'highlightCfg' instead.
 * @accessor
 */

/**
 * @cfg {Object} [animation=null]
 * The series animation configuration.
 * @accessor
 */

/**
 * @cfg {Object} [tooltip=null]
 * Add tooltips to the visualization's markers. The config options for the
 * tooltip are the same configuration used with {@link Ext.tip.ToolTip} plus a
 * `renderer` config option and a `scope` for the renderer. For example:
 *
 *     tooltip: {
 *       trackMouse: true,
 *       width: 140,
 *       height: 28,
 *       renderer: function (toolTip, record, ctx) {
 *           toolTip.setHtml(record.get('name') + ': ' + record.get('data1') + ' views');
 *       }
 *     }
 *
 * Note that tooltips are shown for series markers and won't work
 * if the {@link #marker} is not configured.
 * @cfg {Object} tooltip.scope The scope to use when the renderer function is
 * called.  Defaults to the Series instance.
 * @cfg {Function} tooltip.renderer An 'interceptor' method which can be used to
 * modify the tooltip attributes before it is shown.  The renderer function is
 * passed the following params:
 * @cfg {Ext.tip.ToolTip} tooltip.renderer.toolTip The tooltip instance
 * @cfg {Ext.data.Model} tooltip.renderer.record The record instance for the
 * chart item (sprite) currently targeted by the tooltip.
 * @cfg {Object} tooltip.renderer.ctx A data object with values relating to the
 * currently targeted chart sprite
 * @cfg {String} tooltip.renderer.ctx.category The type of sprite passed to the
 * renderer function (will be "items", "markers", or "labels" depending on the
 * target sprite of the tooltip)
 * @cfg {String} tooltip.renderer.ctx.field The {@link #yField} for the series
 * @cfg {Number} tooltip.renderer.ctx.index The target sprite's index within the
 * series' items
 * @cfg {Ext.data.Model} tooltip.renderer.ctx.record The record instance for the
 * chart item (sprite) currently targeted by the tooltip.
 * @cfg {Ext.chart.series.Series} tooltip.renderer.ctx.series The series instance
 * containing the tooltip's target sprite
 * @cfg {Ext.draw.sprite.Sprite} tooltip.renderer.ctx.sprite The sprite (item)
 * target of the tooltip
 * @accessor
 */
