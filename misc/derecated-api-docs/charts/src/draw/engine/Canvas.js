/**
 * @class Ext.draw.engine.Canvas
 * @extend Ext.draw.Surface
 * Provides specific methods to draw with 2D Canvas element.
 */

/**
 * @cfg {Boolean} [highPrecision=false]
 * True to have the Canvas use JavaScript Number instead of single precision floating point for transforms.
 *
 * For example, when using data with big numbers to plot line series, the transformation
 * matrix of the canvas will have big elements. Due to the implementation of the SVGMatrix,
 * the elements are represented by 32-bits floats, which will work incorrectly.
 * To compensate for that, we enable the canvas context to perform all the transformations
 * in JavaScript.
 *
 * Do not use this if you are not encountering 32-bit floating point errors problem,
 * since this will result in a performance penalty.
 * @accessor
 */
