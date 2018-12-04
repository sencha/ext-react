/**
 * @class Ext.d3.canvas.Canvas
 * @extend Ext.d3.Component
 * @xtype d3-canvas
 *
 * The base class of every Canvas D3 Component that can also be used standalone.
 */

/**
 * @cfg {Boolean} [hdpi=true]
 * If `true`, will automatically override Canvas context ('2d') methods
 * when running on HDPI displays. Setting this to 'false' will greatly
 * improve performance on such devices at the cost of image quality.
 * It can also be useful when this class is used in conjunction with
 * another Canvas library that provides HDPI support as well.
 * Once set cannot be changed.
 * @accessor
 */

/**
 * Whether or not the component got its first size.
 * Can be used in the `canvasresize` event handler to do user-defined setup on first
 * resize, for example:
 *
 *     listeners: {
 *         canvasresize: function (component, canvas, rect) {
 *             if (!component.size) {
 *                 // set things up
 *             } else {
 *                 // handle resize
 *             }
 *         }
 *     }
 *
 * @cfg {Object} size
 * @accessor
 */

/**
 * @event sceneresize
 * Fires after scene size has changed.
 * Note that resizing the Canvas will reset its context, e.g.
 * `lineWidth` will be reset to `1`, `fillStyle` to `#000000`, and so on,
 * including transformations.
 * @param {Ext.d3.canvas.Canvas} component
 * @param {HTMLCanvasElement} canvas
 * @param {Object} size An object with `width` and `height` properties.
 */
