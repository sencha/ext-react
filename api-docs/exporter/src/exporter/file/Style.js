/**
 * @class Ext.exporter.file.Style
 * @extend Ext.exporter.file.Base
 * This class is a generic implementation of a Style. This should be extended to provide Style implementations
 * for different use cases. Check out {@link Ext.exporter.file.excel.Style} and {@link Ext.exporter.file.html.Style}.
 */

/**
 * @cfg {String} id
 * A unique name within the document that identifies this style.
 * @accessor
 */

/**
 * @cfg {String} [name=null]
 *
 * This property identifies this style as a named style.
 * @accessor
 */

/**
 * @cfg {Object} [alignment=null]
 *
 * Following keys are allowed on this object and are all optional:
 *
 * @cfg {String} alignment.horizontal
 * Specifies the left-to-right alignment of text within a cell. Possible values: `Left`, `Center`, `Right`,
 * `Justify` and `Automatic`.
 *
 * @cfg {Number} alignment.indent
 * Specifies the number of indents.
 *
 * @cfg {String} alignment.readingOrder
 * Specifies the default right-to-left text entry mode for a cell. Possible values: `LeftToRight`,
 * `RightToLeft` and `Context`.
 *
 * @cfg {Number} alignment.rotate
 * Specifies the rotation of the text within the cell.
 *
 * @cfg {String} alignment.vertical
 * Specifies the top-to-bottom alignment of text within a cell. Possible values: `Top`, `Bottom`,
 * `Center` and `Automatic`.
 * @accessor
 */

/**
 * @cfg {Object} [font=null]
 * Defines the font attributes to use in this style.
 *
 *
 * Following keys are allowed on this object:
 *
 * @cfg {Boolean} font.bold
 * Specifies the bold state of the font.
 *
 * @cfg {String} font.color
 * Specifies the color of the font. This value should be a 6-hexadecimal digit number in "#rrggbb" format.
 *
 * @cfg {String} font.fontName
 * Specifies the name of the font.
 *
 * @cfg {Boolean} font.italic
 * Similar to `font.bold` in behavior, this attribute specifies the italic state of the font.
 *
 * @cfg {Number} font.size
 * Specifies the size of the font.
 *
 * @cfg {Boolean} font.strikeThrough
 * Similar to `font.bold` in behavior, this attribute specifies the strike-through state
 * of the font.
 *
 * @cfg {String} font.underline
 * Specifies the underline state of the font. Possible values: `None` and `Single`.
 *
 * @cfg {String} font.family
 * Font family name.
 * @accessor
 */

/**
 * @cfg {Object} [interior=null]
 * Defines the fill properties to use in this style. Each attribute that is specified is
 * considered an override from the default.
 *
 * Following keys are allowed on this object:
 *
 * @cfg {String} interior.color
 * Specifies the fill color of the cell. This value should be a 6-hexadecimal digit number in "#rrggbb" format.
 *
 * @cfg {String} interior.pattern
 * Specifies the fill pattern in the cell. Possible values: `None`, `Solid`.
 * @accessor
 */

/**
 * @cfg {String} [format=null]
 *
 * This can be one of the following values:
 * `General`, `General Number`, `General Date`, `Long Date`, `Medium Date`, `Short Date`, `Long Time`, `Medium Time`,
 * `Short Time`, `Currency`, `Euro Currency`, `Fixed`, `Standard`, `Percent`, `Scientific`, `Yes/No`,
 * `True/False`, or `On/Off`.
 *
 * `Currency` is the currency format with two decimal places.
 *
 * `Euro Currency` is the same as `Currency` using the Euro currency symbol instead.
 * @accessor
 */

/**
 * @cfg {Object[]} [borders=null]
 *
 * Array of border objects. Following keys are allowed for border objects:
 *
 * @cfg {String} borders.position
 * Specifies which of the possible borders this element represents. Duplicate
 * borders are not permitted and are considered invalid. Possible values: `Left`, `Top`, `Right`, `Bottom`.
 *
 * @cfg {String} borders.color
 * Specifies the color of this border. This value should be a 6-hexadecimal digit number in "#rrggbb" format.
 *
 * @cfg {String} borders.lineStyle
 * Specifies the appearance of this border. Possible values: `None`, `Continuous`, `Dash` and `Dot`.
 *
 * @cfg {Number} borders.weight
 * Specifies the weight (or thickness) of this border.
 * @accessor
 */

/**
 * @method getFormattedValue
 * Returns the specified value formatted according to the format of this style.
 * @param v
 */
