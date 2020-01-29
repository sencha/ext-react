/**
 * @class Ext.pivot.plugin.configurator.FieldSettings
 * @extend Ext.Base
 * This class allows you to define various settings for each configurator field.
 */

/**
 * @cfg {String} [cls='']
 *
 * CSS class to add to this configurator field
 * @accessor
 */

/**
 * @cfg {String/Object} [style=null]
 * Similar to {@link Ext.Component#style Component style config}.
 * @accessor
 */

/**
 * @cfg {String/Array} [fixed=[]]
 *
 * If you want a field to be fixed in a specific area then you must define those areas here.
 *
 * Possible values:
 *
 * - `aggregate`: "values" area;
 * - `leftAxis`: "row values" area;
 * - `topAxis`: "column values" area;
 *
 * @accessor
 */

/**
 * @cfg {String[]} [allowed=['leftAxis', 'topAxis', 'aggregate']]
 *
 * Define here the areas where this field can be used.
 *
 * Possible values:
 *
 * - `aggregate`: "values" area;
 * - `leftAxis`: "row values" area;
 * - `topAxis`: "column values" area;
 *
 * @accessor
 */

/**
 * @cfg {String[]} [aggregators=[]]
 *
 * Define here the functions that can be used when the dimension is configured as an aggregate.
 *
 * If you need to use your own function then you could override {@link Ext.pivot.Aggregators} like this:
 *
 *      Ext.define('overrides.pivot.Aggregators', {
 *          customFn: function(){
 *              // ... do your own calculation
 *          },
 *          customFnText: 'Custom fn'
 *      });
 *
 * Do not forget to define a text for your function. It will be displayed inside the 'Summarize by' field of
 * the FieldSettings window.
 *
 * If no text is defined then `Custom` will be used.
 *
 * You can also provide a function on the view controller and it will appear in the FieldSettings window as
 * "Custom".
 * @accessor
 */

/**
 * @cfg {Object} [renderers={}]
 *
 * These renderers are used only on the aggregate dimensions.
 *
 * The expected value is an object. Each key of this object is a text that will be shown in the "Format as" field
 * in the FieldSettings window. Check out the {@link Ext.grid.column.Column#renderer grid column renderer}
 * to see what is supported.
 *
 *      renderers: {
 *          'Colored 0,000.00': 'coloredRenderer' // function on the controller
 *      }
 * @accessor
 */

/**
 * @cfg {Object} [formatters={}]
 *
 * Formatters are used only on the aggregate dimensions.
 *
 * The expected value is an object. Each key of this object is a text that will be shown in the "Format as" field
 * in the FieldSettings window. Check out the {@link Ext.grid.column.Column#formatter grid column formatter}
 * to see what is supported.
 *
 *      formatters: {
 *          '0': 'number("0")',
 *          '0%': 'number("0%")'
 *      }
 * @accessor
 */
