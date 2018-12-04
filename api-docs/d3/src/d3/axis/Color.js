/**
 * @class Ext.d3.axis.Color
 * @extend Ext.Base
 * A class that maps data values to colors.
 */

/**
 * @cfg {Function} [scale=null]
 * A D3 [scale](https://github.com/d3/d3/wiki/Scales) with a color range.
 * This config is configured similarly to the {@link Ext.d3.axis.Axis#scale}
 * config.
 * @cfg {Array} scale.domain The `domain` to use. If not set (default),
 * the domain will be automatically calculated based on data.
 * @accessor
 */

/**
 * @cfg {String} [field=null]
 * The field that will be used to fetch the value,
 * when a {@link Ext.data.Model} instance is passed to the {@link #getColor} method.
 * @accessor
 */

/**
 * @cfg {Function} [processor=null]
 * Custom value processor.
 * @param {Ext.d3.axis.Color} axis
 * @param {Function} scale
 * @param {*} value The type will depend on component used.
 * @param {String} field
 * @return {String} color
 * @accessor
 */

/**
 * @cfg {Number} [minimum=null]
 * The minimum data value.
 * The data domain is calculated automatically, setting this config to a number
 * will override the calculated minimum value.
 * @accessor
 */

/**
 * @cfg {Number} [maximum=null]
 * The maximum data value.
 * The data domain is calculated automatically, setting this config to a number
 * will override the calculated maximum value.
 * @accessor
 */
