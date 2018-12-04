/**
 * @class Ext.d3.svg.Svg
 * @extend Ext.d3.Component
 * @xtype d3-svg
 * @xtype d3
 *
 * The base class of every SVG D3 Component that can also be used standalone.
 */

/**
 * The padding of the scene.
 * See {@link Ext.util.Format#parseBox} for syntax details,
 * if using a string for this config.
 * @cfg {Object/String/Number} [padding=0]
 * @cfg {Number} padding.top
 * @cfg {Number} padding.right
 * @cfg {Number} padding.bottom
 * @cfg {Number} padding.left
 * @accessor
 */

/**
 * If the scene elements that go outside the scene and into the padding area
 * should be clipped.
 * Note: stock D3 components are not designed to work with this config set to `true`.
 * @cfg {Boolean} [clipScene=false]
 * @accessor
 */

/**
 * @event sceneresize
 * Fires after scene size has changed.
 * Notes: the scene is a 'g' element, so it cannot actually have a size.
 * The size reported is the size the drawing is supposed to fit in.
 * @param {Ext.d3.svg.Svg} component
 * @param {d3.selection} scene
 * @param {Object} size An object with `width` and `height` properties.
 */

/**
 * Whether or not the component got its first size.
 * Can be used in the `sceneresize` event handler to do user-defined setup on first
 * resize, for example:
 *
 *     listeners: {
 *         sceneresize: function (component, scene, rect) {
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
 * @event scenesetup
 * Fires once after the scene has been created.
 * Note that at this time the component doesn't have a size yet.
 * @param {Ext.d3.svg.Svg} component
 * @param {d3.selection} scene
 */
