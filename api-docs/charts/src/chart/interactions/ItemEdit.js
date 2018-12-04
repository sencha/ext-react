/**
 * @class Ext.chart.interactions.ItemEdit
 * @extend Ext.chart.interactions.ItemHighlight
 * @alias interaction.itemedit
 *
 * The 'itemedit' interaction allows the user to edit store data
 * by dragging series items in the chart.
 *
 * The 'itemedit' interaction extends the
 * {@link Ext.chart.interactions.ItemHighlight 'itemhighlight'} interaction,
 * so it also acts like one. If you need both interactions in a single chart,
 * 'itemedit' should be sufficient. Hovering/tapping will result in highlighting,
 * and dragging will result in editing.
 */

/**
 * @cfg {Object} [style=null]
 * The style that will be applied to the series item on dragging.
 * By default, series item will have no fill,
 * and will have a dashed stroke of the same color.
 * @accessor
 */

/**
 * @cfg {Function/String} [renderer=null]
 * A function that returns style attributes for the item that's being dragged.
 * This is useful if you want to give a visual feedback to the user when
 * they dragged to a certain point.
 *
 * @param {Object} [data] The following properties are available:
 *
 * @param {Object} data.target The object containing the xField/xValue or/and
 * yField/yValue properties, where the xField/yField specify the store records
 * being edited and the xValue/yValue the target values to be set when
 * the interaction ends. The object also contains the 'index' of the record
 * being edited.
 * @param {Object} data.style The style that is going to be used for the dragged item.
 * The attributes returned by the renderer will be applied on top of this style.
 * @param {Object} data.item The series item being dragged.
 * This is actually the {@link Ext.chart.AbstractChart#highlightItem}.
 *
 * @return {Object} The style attributes to be set on the dragged item.
 * @accessor
 */

/**
 * @cfg {Object/Boolean} [tooltip=true]
 * @accessor
 */

/**
 * @event beginitemedit
 * Fires when item edit operation (dragging) begins.
 * @param {Ext.chart.AbstractChart} chart The chart the interaction belongs to.
 * @param {Ext.chart.interactions.ItemEdit} interaction The interaction.
 * @param {Object} item The item that is about to be edited.
 */

/**
 * @event enditemedit
 * Fires when item edit operation (dragging) ends.
 * @param {Ext.chart.AbstractChart} chart The chart the interaction belongs to.
 * @param {Ext.chart.interactions.ItemEdit} interaction The interaction.
 * @param {Object} item The item that was edited.
 * @param {Object} target The object containing target values the were used.
 */
