/**
 * @class Ext.data.writer.Json
 * @extend Ext.data.writer.Writer
 * @alias writer.json
 *
 * This class is used to write {@link Ext.data.Model} data to the server in a JSON format.
 * The {@link #allowSingle} configuration can be set to false to force the records to always
 * be encoded in an array, even if there is only a single record being sent.
 */

 /**
  * @cfg {String} rootProperty
  * The HTTP parameter name by which JSON encoded records will be passed to the server if the
  * {@link #encode} option is `true`.
  * @accessor
  */

/**
 * @cfg {Boolean} [encode=false]
 * Configure `true` to send record data (all record fields if {@link #writeAllFields} is `true`)
 * as a JSON encoded HTTP parameter named by the {@link #rootProperty} configuration.
 *
 * The encode option should only be set to true when a {@link #rootProperty} is defined, because the values will be
 * sent as part of the request parameters as opposed to a raw post. The root will be the name of the parameter
 * sent to the server.
 * @accessor
 */

/**
 * @cfg {Boolean} [allowSingle=true]
 * Configure with `false` to ensure that records are always wrapped in an array, even if there is only
 * one record being sent. When there is more than one record, they will always be encoded into an array.
 * @accessor
 */

/**
 * @cfg {Boolean} [expandData=false]
 * By default, when dot-delimited field {@link #nameProperty mappings} are
 * used (e.g. `name: 'myProperty', mapping: 'my.nested.property'`) the writer will simply output a flat data
 * object containing the mapping string literal as the property name (e.g. `{ 'my.nested.property': 'foo' }`).
 *
 * Mappings are used to map incoming nested JSON to flat Ext models. In many case, the data output by the
 * writer should preferrably match the original nested data format. Setting this config to `true` will ensure
 * that the output will instead look like `{ my: { nested: { property: 'foo' }}}`. The output is generated
 * by {@link #getExpandedData}, which can optionally be overridden to apply more customized logic.
 * @accessor
 */
