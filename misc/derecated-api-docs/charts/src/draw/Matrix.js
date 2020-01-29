/**
 * @class Ext.draw.Matrix
 * @extend Ext.Base
 *
 * Ext.draw.Matix is a utility class used to calculate 
 * [affine transformation](http://en.wikipedia.org/wiki/Affine_transformation) matrix.  
 * The matrix class is used to apply transformations to existing 
 * {@link Ext.draw.sprite.Sprite sprites} using a number of convenience transform 
 * methods.
 * 
 * Transformations configured directly on a sprite are processed in the following order: 
 * scaling, rotation, and translation.  The matrix class offers additional flexibility.  
 * Once a sprite is created, you can use the matrix class's transform methods as many 
 * times as needed and in any order you choose. 
 *
 * This class is compatible with 
 * [SVGMatrix](http://www.w3.org/TR/SVG11/coords.html#InterfaceSVGMatrix) except:
 *
 *   1. Ext.draw.Matrix is not read only
 *   2. Using Number as its values rather than floats
 * 
 * Using this class helps to reduce the severe numeric 
 * [problem with HTML Canvas and SVG transformation](http://stackoverflow.com/questions/8784405/large-numbers-in-html-canvas-translate-result-in-strange-behavior)
 * 
 * Additionally, there's no way to get the current transformation matrix 
 * [in Canvas](http://stackoverflow.com/questions/7395813/html5-canvas-get-transform-matrix).
 */

/**
 * @property {Number} a
 * Get x-to-x component of the matrix. Avoid using it for performance consideration.
 * Use {@link #getXX} instead.
 */
