/**
 * @class Ext.draw.sprite.Sprite
 * @extend Ext.Base
 * @alias sprite.sprite
 *
 * A sprite is a basic primitive from the charts package which represents a graphical 
 * object that can be drawn. Sprites are used extensively in the charts package to 
 * create the visual elements of each chart.  You can also create a desired image by 
 * adding one or more sprites to a {@link Ext.draw.Container draw container}.
 * 
 * The Sprite class itself is an abstract class and is not meant to be used directly.  
 * There are many different kinds of sprites available in the charts package that extend 
 * Ext.draw.sprite.Sprite. Each sprite type has various attributes that define how that 
 * sprite should look.
 * 
 * By default, sprites are added to the default 'main' {@link Ext.draw.Surface surface} 
 * of the draw container.  However, sprites may also be configured with a reference to a 
 * specific Ext.draw.Surface when set in the draw container's 
 * {@link Ext.draw.Container#cfg-sprites sprites} config.  Specifying a surface 
 * other than 'main' will create a surface by that name if it does not already exist.
 *
 * The ability to have multiple surfaces is useful for performance (and battery life) 
 * reasons. Because changes to sprite attributes cause the whole surface (and all 
 * sprites in it) to re-render, it makes sense to group sprites by surface, so changes 
 * to one group of sprites will only trigger the surface they are in to re-render.
 * 
 * You can add a sprite to an existing drawing by adding the sprite to a draw surface.  
 *
 * **Note:** Changes to the sprites on a surface will be not be reflected in the DOM 
 * until you call the surface's {@link Ext.draw.Surface#method-renderFrame renderFrame} 
 * method.  This must be done after adding, removing, or modifying sprites in order to 
 * see the changes on-screen.
 * 
 * For information on configuring a sprite with an initial transformation see 
 * {@link #scaling}, {@link rotation}, and {@link translation}.
 * 
 * For information on applying a transformation to an existing sprite see the 
 * Ext.draw.Matrix class.
 */

/**
 * @property {Boolean} [debug=false]
 * @static
 *
 * Debug rendering options:
 *
 *    debug: {
 *       bbox: true, // renders the bounding box of the sprite
 *       xray: true  // renders control points of the path (for Ext.draw.sprite.Path
 *       and descendants only)
 *    }
 *
 */

/**
 * @cfg {String} [strokeStyle="none"]
 * The color of the stroke (a CSS color value).
 */

/**
 * @cfg {String} [fillStyle="none"]
 * The color of the shape (a CSS color value).
 */

/**
 * @cfg {Number} [strokeOpacity=1]
 * The opacity of the stroke. Limited from 0 to 1.
 */

/**
 * @cfg {Number} [fillOpacity=1]
 * The opacity of the fill. Limited from 0 to 1.
 */

/**
 * @cfg {Number} [lineWidth=1]
 * The width of the line stroke.
 */

/**
 * @cfg {String} [lineCap="butt"] The style of the line caps.
 */

/**
 * @cfg {String} [lineJoin="miter"]
 * The style of the line join.
 */

/**
 * @cfg {Array} [lineDash=[]]
 * An even number of non-negative numbers specifying a dash/space sequence.
 * Note that while this is supported in IE8 (VML engine), the behavior is
 * different from Canvas and SVG. Please refer to this document for details:
 * http://msdn.microsoft.com/en-us/library/bb264085(v=vs.85).aspx
 * Although IE9 and IE10 have Canvas support, the 'lineDash'
 * attribute is not supported in those browsers.
 */

/**
 * @cfg {Number} [lineDashOffset=0]
 * A number specifying how far into the line dash sequence drawing commences.
 */

/**
 * @cfg {Number} [miterLimit=10]
 * Sets the distance between the inner corner and the outer corner where two lines meet.
 */

/**
 * @cfg {String} [shadowColor="none"]
 * The color of the shadow (a CSS color value).
 */

/**
 * @cfg {Number} [shadowOffsetX=0]
 * The offset of the sprite's shadow on the x-axis.
 */

/**
 * @cfg {Number} [shadowOffsetY=0]
 * The offset of the sprite's shadow on the y-axis.
 */

/**
 * @cfg {Number} [shadowBlur=0]
 * The amount blur used on the shadow.
 */

/**
 * @cfg {Number} [globalAlpha=1]
 * The opacity of the sprite. Limited from 0 to 1.
 */

/**
 * @cfg {String} [globalCompositeOperation=source-over]
 * Indicates how source images are drawn onto a destination image.
 * globalCompositeOperation attribute is not supported by the SVG and VML (excanvas) engines.
 */

/**
 * @cfg {Boolean} [hidden=false]
 * Determines whether or not the sprite is hidden.
 *
 */

/**
 * @cfg {Boolean} [transformFillStroke=false]
 * Determines whether the fill and stroke are affected by sprite transformations.
 *
 */

/**
 * @cfg {Number} [zIndex=0]
 * The stacking order of the sprite.
 *
 */

/**
 * @cfg {Number} [translationX=0]
 * The translation, position offset, of the sprite on the x-axis.
 *
 * **Note:** Transform configs are *always* performed in the following
 * order:
 *
 *  1. Scaling
 *  2. Rotation
 *  3. Translation
 *
 * See also: {@link #translation} and {@link #translationY}
 *
 */

/**
 * @cfg {Number} [translationY=0]
 * The translation, position offset, of the sprite on the y-axis.
 *
 * **Note:** Transform configs are *always* performed in the following
 * order:
 *
 *  1. Scaling
 *  2. Rotation
 *  3. Translation
 *
 * See also: {@link #translation} and {@link #translationX}
 *
 */

/**
 * @cfg {Number} [rotationRads=0]
 * The angle of rotation of the sprite in radians.
 *
 * **Note:** Transform configs are *always* performed in the following
 * order:
 *
 *  1. Scaling
 *  2. Rotation
 *  3. Translation
 *
 * See also: {@link #rotation}, {@link #rotationCenterX}, and
 * {@link #rotationCenterY}
 *
 */

/**
 * @cfg {Number} [rotationCenterX=null]
 * The central coordinate of the sprite's scale operation on the x-axis.
 * Unless explicitly set, will default to the calculated center of the
 * sprite along the x-axis.
 *
 * **Note:** Transform configs are *always* performed in the following
 * order:
 *
 *  1. Scaling
 *  2. Rotation
 *  3. Translation
 *
 * See also: {@link #rotation}, {@link #rotationRads}, and
 * {@link #rotationCenterY}
 *
 */

/**
 * @cfg {Number} [rotationCenterY=null]
 * The central coordinate of the sprite's rotate operation on the y-axis.
 * Unless explicitly set, will default to the calculated center of the
 * sprite along the y-axis.
 *
 * **Note:** Transform configs are *always* performed in the following
 * order:
 *
 *  1. Scaling
 *  2. Rotation
 *  3. Translation
 *
 * See also: {@link #rotation}, {@link #rotationRads}, and
 * {@link #rotationCenterX}
 *
 */

/**
 * @cfg {Number} [scalingX=1] The scaling of the sprite on the x-axis.
 * The number value represents a percentage by which to scale the
 * sprite.  **1** is equal to 100%, **2** would be 200%, etc.
 *
 * **Note:** Transform configs are *always* performed in the following
 * order:
 *
 *  1. Scaling
 *  2. Rotation
 *  3. Translation
 *
 * See also: {@link #scaling}, {@link #scalingY},
 * {@link #scalingCenterX}, and {@link #scalingCenterY}
 *
 */

/**
 * @cfg {Number} [scalingY=1] The scaling of the sprite on the y-axis.
 * The number value represents a percentage by which to scale the
 * sprite.  **1** is equal to 100%, **2** would be 200%, etc.
 *
 * **Note:** Transform configs are *always* performed in the following
 * order:
 *
 *  1. Scaling
 *  2. Rotation
 *  3. Translation
 *
 * See also: {@link #scaling}, {@link #scalingX},
 * {@link #scalingCenterX}, and {@link #scalingCenterY}
 *
 */

/**
 * @cfg {Number} [scalingCenterX=null]
 * The central coordinate of the sprite's scale operation on the x-axis.
 *
 * **Note:** Transform configs are *always* performed in the following
 * order:
 *
 *  1. Scaling
 *  2. Rotation
 *  3. Translation
 *
 * See also: {@link #scaling}, {@link #scalingX},
 * {@link #scalingY}, and {@link #scalingCenterY}
 */

/**
 * @cfg {Number} [scalingCenterY=null]
 * The central coordinate of the sprite's scale operation on the y-axis.
 *
 * **Note:** Transform configs are *always* performed in the following
 * order:
 *
 *  1. Scaling
 *  2. Rotation
 *  3. Translation
 *
 * See also: {@link #scaling}, {@link #scalingX},
 * {@link #scalingY}, and {@link #scalingCenterX}
 *
 */

/**
 * @cfg {Number/Object} rotation
 * Applies an initial angle of rotation to the sprite.  May be a number
 * specifying the rotation in degrees.  Or may be a config object using
 * the below config options.
 *
 * **Note:** Rotation config options will be overridden by values set on
 * the {@link #rotationRads}, {@link #rotationCenterX}, and
 * {@link #rotationCenterY} configs.
 *
 *     Ext.create({
 *         xtype: 'draw',
 *         renderTo: Ext.getBody(),
 *         width: 600,
 *         height: 400,
 *         sprites: [{
 *             type: 'rect',
 *             x: 50,
 *             y: 50,
 *             width: 100,
 *             height: 100,
 *             fillStyle: '#1F6D91',
 *             //rotation: 45
 *             rotation: {
 *                 degrees: 45,
 *                 //rads: Math.PI / 4,
 *                 //centerX: 50,
 *                 //centerY: 50
 *             }
 *         }]
 *     });
 *
 * **Note:** Transform configs are *always* performed in the following
 * order:
 *
 *  1. Scaling
 *  2. Rotation
 *  3. Translation
 *
 * @cfg {Number} rotation.rads
 * The angle in radians to rotate the sprite
 *
 * @cfg {Number} rotation.degrees
 * The angle in degrees to rotate the sprite (is ignored if rads or
 * {@link #rotationRads} is set
 *
 * @cfg {Number} rotation.centerX
 * The central coordinate of the sprite's rotation on the x-axis.
 * Unless explicitly set, will default to the calculated center of the
 * sprite along the x-axis.
 *
 * @cfg {Number} rotation.centerY
 * The central coordinate of the sprite's rotation on the y-axis.
 * Unless explicitly set, will default to the calculated center of the
 * sprite along the y-axis.
 */

/**
 * @cfg {Number/Object} scaling
 * Applies initial scaling to the sprite.  May be a number specifying
 * the amount to scale both the x and y-axis.  The number value
 * represents a percentage by which to scale the sprite.  **1** is equal
 * to 100%, **2** would be 200%, etc.  Or may be a config object using
 * the below config options.
 *
 * **Note:** Scaling config options will be overridden by values set on
 * the {@link #scalingX}, {@link #scalingY}, {@link #scalingCenterX},
 * and {@link #scalingCenterY} configs.
 *
 *     Ext.create({
 *         xtype: 'draw',
 *         renderTo: Ext.getBody(),
 *         width: 600,
 *         height: 400,
 *         sprites: [{
 *             type: 'rect',
 *             x: 50,
 *             y: 50,
 *             width: 100,
 *             height: 100,
 *             fillStyle: '#1F6D91',
 *             //scaling: 2,
 *             scaling: {
 *                 x: 2,
 *                 y: 2
 *                 //centerX: 100,
 *                 //centerY: 100
 *             }
 *         }]
 *     });
 *
 * **Note:** Transform configs are *always* performed in the following
 * order:
 *
 *  1. Scaling
 *  2. Rotation
 *  3. Translation
 *
 * @cfg {Number} scaling.x
 * The amount by which to scale the sprite along the x-axis.  The number
 * value represents a percentage by which to scale the sprite.  **1** is
 * equal to 100%, **2** would be 200%, etc.
 *
 * @cfg {Number} scaling.y
 * The amount by which to scale the sprite along the y-axis.  The number
 * value represents a percentage by which to scale the sprite.  **1** is
 * equal to 100%, **2** would be 200%, etc.
 *
 * @cfg scaling.centerX
 * The central coordinate of the sprite's scaling on the x-axis.  Unless
 * explicitly set, will default to the calculated center of the sprite
 * along the x-axis.
 *
 * @cfg {Number} scaling.centerY
 * The central coordinate of the sprite's scaling on the y-axis.  Unless
 * explicitly set, will default to the calculated center of the sprite
 * along the y-axis.
 */

/**
 * @cfg {Object} translation
 * Applies an initial translation, adjustment in x/y positioning, to the
 * sprite.
 *
 * **Note:** Translation config options will be overridden by values set
 * on the {@link #translationX} and {@link #translationY} configs.
 *
 *     Ext.create({
 *         xtype: 'draw',
 *         renderTo: Ext.getBody(),
 *         width: 600,
 *         height: 400,
 *             sprites: [{
 *             type: 'rect',
 *             x: 50,
 *             y: 50,
 *             width: 100,
 *             height: 100,
 *             fillStyle: '#1F6D91',
 *             translation: {
 *                 x: 50,
 *                 y: 50
 *             }
 *         }]
 *     });
 *
 * **Note:** Transform configs are *always* performed in the following
 * order:
 *
 *  1. Scaling
 *  2. Rotation
 *  3. Translation
 *
 * @cfg {Number} translation.x
 * The amount to translate the sprite along the x-axis.
 *
 * @cfg {Number} translation.y
 * The amount to translate the sprite along the y-axis.
 */

/**
 * @property {Object} attr
 * The visual attributes of the sprite, e.g. strokeStyle, fillStyle, lineWidth...
 */

/**
 * @cfg {Ext.draw.modifier.Animation} animation
 * @accessor
 */
