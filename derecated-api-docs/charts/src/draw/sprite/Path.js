/**
 * @class Ext.draw.sprite.Path
 * @extend Ext.draw.sprite.Sprite
 * @alias sprite.path
 * @alias Ext.draw.Sprite
 *
 * A sprite that represents a path.
 *
 * ### Drawing with SVG Paths
 * You may use special SVG Path syntax to "describe" the drawing path.  Here are the SVG path commands:
 * 
 * + M = moveto
 * + L = lineto
 * + H = horizontal lineto
 * + V = vertical lineto
 * + C = curveto
 * + S = smooth curveto
 * + Q = quadratic Bézier curve
 * + T = smooth quadratic Bézier curveto
 * + A = elliptical Arc
 * + Z = closepath
 * 
 * **Note:** Capital letters indicate that the item should be absolutely positioned. 
 * Use lower case letters for relative positioning.
 */

/**
 * @cfg {String} path
 * The SVG based path string used by the sprite.
 */
