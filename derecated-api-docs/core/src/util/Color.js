/**
 * @class Ext.util.Color
 * Represents an RGB color and provides helper functions on it e.g. to get
 * color components in HSL color space.
 */

/**
 * @cfg {Number} [lightnessFactor='0.2']
 *
 * The default factor to compute the lighter or darker color.
 */

/**
 * @method constructor
 * @constructor
 * @param {Number} red Red component (0..255)
 * @param {Number} green Green component (0..255)
 * @param {Number} blue Blue component (0..255)
 * @param {Number} [alpha=1] (optional) Alpha component (0..1)
 */

/**
 * @method getBrightness
 * The the brightness of a color as defined by W3C:
 * https://www.w3.org/TR/AERT#color-contrast
 * @return {Number} The brightness, between `0` and `100`.
 */

/**
 * @method getGrayscale
 * Returns the gray value (0 to 255) of the color.
 *
 * The gray value is calculated using the formula r*0.3 + g*0.59 + b*0.11.
 *
 * @return {Number}
 */

/**
 * @method getHSL
 * Get the equivalent HSL components of the color.
 * @return {Number[]}
 */

/**
 * @method getHSV
 * Get the equivalent HSV components of the color.
 * @return {Number[]}
 */

/**
 * @method setHSL
 * Set current color based on the specified HSL values.
 *
 * @param {Number} h Hue component [0..360)
 * @param {Number} s Saturation component [0..1]
 * @param {Number} l Lightness component [0..1]
 * @return {Ext.util.Color}
 */

/**
 * @method setHSV
 * Set current color based on the specified HSV values.
 *
 * @param {Number} h Hue component [0..360)
 * @param {Number} s Saturation component [0..1]
 * @param {Number} v Value component [0..1]
 * @return {Ext.util.Color}
 */

/**
 * @method createLighter
 * Returns a new color that is lighter than this color in the HSL color space.
 * @param {Number} [factor=0.2] Lighter factor (0..1).
 * @return {Ext.util.Color}
 */

/**
 * @method lighten
 * Lighten this color in the HSL color space.
 * @param {Number} [factor=0.2] Lighten factor (0..1).
 */

/**
 * @method createDarker
 * Returns a new color that is darker than this color in the HSL color space.
 * @param {Number} [factor=0.2] Darker factor (0..1).
 * @return {Ext.util.Color}
 */

/**
 * @method darken
 * Darken this color in the HSL color space.
 * @param {Number} [factor=0.2] Darken factor (0..1).
 */

/**
 * @method toString
 * toString() returns a color in hex format ('#rrggbb') if the alpha is 1. If the
 * alpha is less than one, toString() returns the color in RGBA format ('rgba(255,0,0,0.3)').
 *
 * @return {String}
 */

/**
 * @method toHex
 * Get this color in hexadecimal format.
 * @return {String} The color in hexadecimal format.
 */

/**
 * @method setFromString
 * Parse the string and set the current color.
 *
 * Supported formats:
 *
 * + '#rrggbb'
 * + '#rgb', 'rgb(r,g,b)'
 * + 'rgba(r,g,b,a)'
 * + supported CSS color names (e.g., 'black', 'white', etc).
 *
 * If the string is not recognized, setFromString returns rgba(0,0,0,0).
 *
 * @param {String} Color Color as string.
 * @return this
 */

/**
 * @method fly
 * Returns a flyweight instance of Ext.util.Color.
 *
 * Can be called with either a CSS color string or with separate
 * arguments for red, green, blue, alpha.
 *
 * @param {Number/String} red Red component (0..255) or CSS color string.
 * @param {Number} [green] Green component (0..255)
 * @param {Number} [blue] Blue component (0..255)
 * @param {Number} [alpha=1] Alpha component (0..1)
 * @return {Ext.util.Color}
 * @static
 */

/**
 * @method fromHSL
 * Create a new color based on the specified HSL values.
 *
 * @param {Number} h Hue component [0..360)
 * @param {Number} s Saturation component [0..1]
 * @param {Number} l Lightness component [0..1]
 * @return {Ext.util.Color}
 * @static
 */

/**
 * @method fromHSV
 * Create a new color based on the specified HSV values.
 *
 * @param {Number} h Hue component [0..360)
 * @param {Number} s Saturation component [0..1]
 * @param {Number} v Value component [0..1]
 * @return {Ext.util.Color}
 * @static
 */

/**
 * @method fromString
 * Parse the string and create a new color.
 *
 * Supported formats:
 *
 * + '#rrggbb'
 * + '#rgb', 'rgb(r,g,b)'
 * + 'rgba(r,g,b,a)'
 * + supported CSS color names (e.g., 'black', 'white', etc).
 *
 * If the string is not recognized, fromString returns rgba(0,0,0,0).
 *
 * @param {String} color Color as string.
 * @return {Ext.util.Color}
 * @static
 */

/**
 * @method create
 * Convenience method for creating a color.
 *
 * Can be called with several different combinations of arguments:
 *
 *     // Ext.util.Color is returned unchanged.
 *     Ext.util.Color.create(new Ext.util.color(255, 0, 0, 0));
 *
 *     // CSS color string.
 *     Ext.util.Color.create("red");
 *
 *     // Array of red, green, blue, alpha
 *     Ext.util.Color.create([255, 0, 0, 0]);
 *
 *     // Separate arguments of red, green, blue, alpha
 *     Ext.util.Color.create(255, 0, 0, 0);
 *
 *     // Returns black when no arguments given.
 *     Ext.util.Color.create();
 *
 * @param {Array} arg
 * @param {Ext.util.Color/String/Number[]/Number} [arg.red] Red component (0..255),
 * CSS color string or array of all components.
 * @param {Number} [arg.green] Green component (0..255)
 * @param {Number} [arg.blue] Blue component (0..255)
 * @param {Number} [arg.alpha=1] Alpha component (0..1)
 * @return {Ext.util.Color}
 * @static
 */
