/**
 * @property {Boolean} [USE_NATIVE_JSON=false]
 * @member Ext
 * Indicates whether to use native browser parsing for JSON methods.
 * This option is ignored if the browser does not support native JSON methods.
 *
 * **Note:** Native JSON methods will not work with objects that have functions.
 * Also, property names must be quoted, otherwise the data will not parse.
 */

/**
 * Modified version of [Douglas Crockford's JSON.js][dc] that doesn't
 * mess with the Object prototype.
 *
 * [dc]: http://www.json.org/js.html
 *
 * @class Ext.JSON
 * @singleton
 */
