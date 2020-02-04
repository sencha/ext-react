/**
 * @class Ext.exporter.file.ooxml.excel.CellAlignment
 * @extend Ext.exporter.file.ooxml.Base
 * @private
 */

/**
 * @cfg {String} [horizontal='general']
 * Possible values:
 * - general
 * - left
 * - center
 * - right
 * - fill
 * - justify
 * - centerContinuous
 * - distributed
 * @accessor
 */

/**
 * @cfg {String} [vertical='top']
 * Possible values:
 * - top
 * - center
 * - bottom
 * - justify
 * - distributed
 * @accessor
 */

/**
 * @cfg {Number} [readingOrder=null]
 * An integer value indicating whether the reading order (bidirectionality) of the
 * cell is left- to-right, right-to-left, or context dependent.
 *
 * 0 - Context Dependent - reading order is determined by scanning the text for
 * the first non-whitespace character: if it is a strong right-to-left character,
 * the reading order is right-to-left; otherwise, the reading order left-to-right.
 * 1 - Left-to-Right- reading order is left-to-right in the cell, as in English.
 * 2 - Right-to-Left - reading order is right-to-left in the cell, as in Hebrew.
 *
 * The possible values for this attribute are defined by the W3C XML Schema
 * unsignedInt data-type.
 * @accessor
 */
