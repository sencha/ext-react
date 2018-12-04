/**
 * @class Ext.util.XTemplateCompiler
 * @extend Ext.util.XTemplateParser
 * This class compiles the XTemplate syntax into a function object. The function is used
 * like so:
 * 
 *      function (out, values, parent, xindex, xcount) {
 *          // out is the output array to store results
 *          // values, parent, xindex and xcount have their historical meaning
 *      }
 *
 * @private
 */
