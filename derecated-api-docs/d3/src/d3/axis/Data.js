/**
 * @class Ext.d3.axis.Data
 * @extend Ext.d3.axis.Axis
 * `Ext.d3.axis.Data` is an {@link Ext.d3.axis.Axis} that holds extra information
 * needed for use with stores.
 */

/**
 * @cfg {String} [field=null]
 * An Ext.data.Model field name.
 * @accessor
 */

/**
 * @cfg {Number} [step=null]
 * The step of an axis. Indicates the extent of a single data chunk.
 * E.g. `24 * 60 * 60 * 1000` (one day) for a time axis.
 * @accessor
 */
