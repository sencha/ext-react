/**
 * @class Ext.draw.Surface
 * @extend Ext.draw.SurfaceBase
 * @xtype surface
 *
 * A surface is an interface to render {@link Ext.draw.sprite.Sprite sprites} inside a
 * {@link Ext.draw.Container draw container}.  The surface API has methods to render
 * sprites, get sprite bounding boxes (dimensions), add sprites to the underlying DOM,
 * and more.
 *
 * A surface is automatically created when a draw container is created.  By default,
 * this will be a surface with an `id` of "main" and will manage all sprites in the draw
 * container (unless the sprite configs specify a unique surface "id").
 *
 * The ability to have multiple surfaces is useful for performance (and battery life)
 * reasons. Because changes to sprite attributes cause the whole surface (and all
 * sprites in it) to re-render, it makes sense to group sprites by surface, so changes
 * to one group of sprites will only trigger the surface they are in to re-render.
 *
 * **Note:** Changes to the sprites on a surface will be not be reflected in the DOM
 * until you call the surface's {@link Ext.draw.Surface#method-renderFrame renderFrame}
 * method.  This must be done after adding, removing, or modifying sprites in order to
 * see the changes on-screen.
 */

/**
 * @property devicePixelRatio
 * The reported device pixel density.
 * devicePixelRatio is only supported from IE11,
 * so we use deviceXDPI and logicalXDPI that are supported from IE6.
 */

/**
 * @cfg {Array} [rect=null]
 * The [x, y, width, height] rect of the surface related to its container.
 * @accessor
 */

/**
 * @cfg {Object} [background=null]
 * Background sprite config of the surface.
 * @accessor
 */

/**
 * @cfg {Array} [items=]]]
 * Array of sprite instances.
 * @accessor
 */

/**
 * @cfg {Boolean} [dirty=false]
 * Indicates whether the surface needs to redraw.
 * @accessor
 */

/**
 * @cfg {Boolean} [flipRtlText=false]
 * If the surface is in the RTL mode, text will render with the RTL direction,
 * but the alignment and position of the text won't change by default.
 * Setting this config to 'true' will get text alignment and its position
 * within a surface mirrored.
 * @accessor
 */
