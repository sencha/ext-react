/**
 * @class Ext.chart.interactions.PanZoom
 * @extend Ext.chart.interactions.Abstract
 * @alias interaction.panzoom
 *
 * The PanZoom interaction allows the user to navigate the data for one or more chart
 * axes by panning and/or zooming. Navigation can be limited to particular axes. Zooming is
 * performed by pinching on the chart or axis area; panning is performed by single-touch dragging.
 * The interaction only works with cartesian charts/series.
 *
 * For devices which do not support multiple-touch events, zooming can not be done via pinch gestures; in this case the
 * interaction will allow the user to perform both zooming and panning using the same single-touch drag gesture.
 * {@link #modeToggleButton} provides a button to indicate and toggle between two modes.
 *
 * The configuration object for the `panzoom` interaction type should specify which axes
 * will be made navigable via the `axes` config. See the {@link #axes} config documentation
 * for details on the allowed formats. If the `axes` config is not specified, it will default
 * to making all axes navigable with the default axis options.
 *
 */

/**
 * @cfg {Object/Array} axes
 * Specifies which axes should be made navigable. The config value can take the following formats:
 *
 * - An Object with keys corresponding to the {@link Ext.chart.axis.Axis#position position} of each
 *   axis that should be made navigable. Each key's value can either be an Object with further
 *   configuration options for each axis or simply `true` for a default set of options.
 *
 *       {
 *           type: 'panzoom',
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
 *           type: 'panzoom',
 *           axes: ['left', 'bottom']
 *       }
 *
 * If the `axes` config is not specified, it will default to making all axes navigable with the
 * default axis options.
 * @accessor
 */

/**
 * @cfg {Boolean} [showOverflowArrows=true]
 * If `true`, arrows will be conditionally shown at either end of each axis to indicate that the
 * axis is overflowing and can therefore be panned in that direction. Set this to `false` to
 * prevent the arrows from being displayed.
 * @accessor
 */

/**
 * @cfg {Object} overflowArrowOptions
 * A set of optional overrides for the overflow arrow sprites' options. Only relevant when
 * {@link #showOverflowArrows} is `true`.
 */

/**
 * @cfg {Boolean} [zoomOnPan=false]
 * If `true`, the pan gesture will zoom the chart.
 */

/**
 * @cfg {Boolean} [doubleTapReset=false]
 * If `true`, the double tap on a chart will reset the current pan/zoom to show the whole chart.
 */
