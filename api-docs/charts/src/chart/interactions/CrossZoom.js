/**
 * @class Ext.chart.interactions.CrossZoom
 * @extend Ext.chart.interactions.Abstract
 * @alias interaction.crosszoom
 *
 * The CrossZoom interaction allows the user to zoom in on a selected area of the chart.
 *
 */
/**
 * @cfg {Object/Array} [axes=true]
 * Specifies which axes should be made navigable. The config value can take the following formats:
 *
 * - An Object whose keys correspond to the {@link Ext.chart.axis.Axis#position position} of each
 *   axis that should be made navigable. Each key's value can either be an Object with further
 *   configuration options for each axis or simply `true` for a default set of options.
 *       {
 *           type: 'crosszoom',
 *           axes: {
 *               left: {
 *                   maxZoom: 5,
 *                   allowPan: false
 *               },
 *               bottom: true
 *           }
 *       }
 *
 *   If using the full Object form, the following options can be specified for each axis:
 *
 *   - minZoom (Number) A minimum zoom level for the axis. Defaults to `1` which is its natural size.
 *   - maxZoom (Number) A maximum zoom level for the axis. Defaults to `10`.
 *   - startZoom (Number) A starting zoom level for the axis. Defaults to `1`.
 *   - allowZoom (Boolean) Whether zooming is allowed for the axis. Defaults to `true`.
 *   - allowPan (Boolean) Whether panning is allowed for the axis. Defaults to `true`.
 *   - startPan (Boolean) A starting panning offset for the axis. Defaults to `0`.
 *
 * - An Array of strings, each one corresponding to the {@link Ext.chart.axis.Axis#position position}
 *   of an axis that should be made navigable. The default options will be used for each named axis.
 *
 *       {
 *           type: 'crosszoom',
 *           axes: ['left', 'bottom']
 *       }
 *
 * If the `axes` config is not specified, it will default to making all axes navigable with the
 * default axis options.
 * @accessor
 */
