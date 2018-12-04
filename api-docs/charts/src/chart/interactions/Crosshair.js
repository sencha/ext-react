/**
 * @class Ext.chart.interactions.Crosshair
 * @extend Ext.chart.interactions.Abstract
 * @alias interaction.crosshair
 *
 * The Crosshair interaction allows the user to get precise values for a specific point on the chart.
 * The values are obtained by single-touch dragging on the chart.
 */

/**
 * @cfg {Object} axes
 * Specifies label text and label rect configs on per axis basis or as a single config for all axes.
 *
 *     {
 *         type: 'crosshair',
 *         axes: {
 *             label: { fillStyle: 'white' },
 *             rect: { fillStyle: 'maroon'}
 *         }
 *     }
 *
 * In case per axis configuration is used, an object with keys corresponding
 * to the {@link Ext.chart.axis.Axis#position position} must be provided.
 *
 *     {
 *         type: 'crosshair',
 *         axes: {
 *             left: {
 *                 label: { fillStyle: 'white' },
 *                 rect: {
 *                     fillStyle: 'maroon',
 *                     radius: 4
 *                 }
 *             },
 *             bottom: {
 *                 label: {
 *                     fontSize: '14px',
 *                     fontWeight: 'bold'
 *                 },
 *                 rect: { fillStyle: 'white' }
 *             }
 *         }
 *
 * If the `axes` config is not specified, the following defaults will be used:
 * - `label` will use values from the {@link Ext.chart.axis.Axis#label label} config.
 * - `rect` will use the 'white' fillStyle.
 * @accessor
 */

/**
 * @cfg {Object} lines
 * Specifies attributes of horizontal and vertical lines that make up the crosshair.
 * If this config is missing, black dashed lines will be used.
 *
 *     {
 *         horizontal: {
 *             strokeStyle: 'red',
 *             lineDash: [] // solid line
 *         },
 *         vertical: {
 *             lineWidth: 2,
 *             lineDash: [15, 5, 5, 5]
 *         }
 *     }
 *
 * @accessor
 */

/**
 * @cfg {String} [gesture='drag']
 * Specifies which gesture should be used for starting/maintaining/ending the interaction.
 * @accessor
 */
