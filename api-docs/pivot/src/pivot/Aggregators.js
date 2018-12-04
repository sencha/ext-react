/**
 * @class Ext.pivot.Aggregators
 * @extend Ext.Base
 * This class contains all predefined aggregator functions for the pivot grid.
 *
 * For each summary function (ie `fn`) defined in this class there's a property name (ie `fnText`) which will be
 * used by the configurator plugin to display the function used for each aggregate dimension.
 *
 * Override this class if more aggregate functions are needed:
 *
 *      Ext.define('overrides.pivot.Aggregators', {
 *          override: 'Ext.pivot.Aggregators',
 *
 *          fnText: 'My special fn', // useful when using the Configurator plugin
 *          fn: function(records, measure, matrix, rowGroupKey, colGroupKey){
 *              var result;
 *
 *              // ... calculate the result
 *
 *              return result;
 *          }
 *      });
 *
 * @singleton
 */

/**
 * @property {String} [customText='Custom']
 *
 * **Note:** Used by the {@link Ext.pivot.plugin.Configurator configurator plugin} when listing all functions that can
 * be used on an aggregate dimension.
 */

/**
 * @property {String} [sumText='Sum']
 *
 * Defines the name of the {@link #sum} function.
 *
 * **Note:** Used by the {@link Ext.pivot.plugin.Configurator configurator plugin} when listing all functions that can
 * be used on an aggregate dimension.
 */

/**
 * @property {String} [avgText='Avg']
 *
 * Defines the name of the {@link #avg} function.
 *
 * **Note:** Used by the {@link Ext.pivot.plugin.Configurator configurator plugin} when listing all functions that can
 * be used on an aggregate dimension.
 */

/**
 * @property {String} [minText='Min']
 *
 * Defines the name of the {@link #min} function.
 *
 * **Note:** Used by the {@link Ext.pivot.plugin.Configurator configurator plugin} when listing all functions that can
 * be used on an aggregate dimension.
 */

/**
 * @property {String} [maxText='Max']
 *
 * Defines the name of the {@link #max} function.
 *
 * **Note:** Used by the {@link Ext.pivot.plugin.Configurator configurator plugin} when listing all functions that can
 * be used on an aggregate dimension.
 */

/**
 * @property {String} [countText'Count']
 *
 * Defines the name of the {@link #count} function.
 *
 * **Note:** Used by the {@link Ext.pivot.plugin.Configurator configurator plugin} when listing all functions that can
 * be used on an aggregate dimension.
 */

/**
 * @property {String} [groupSumPercentageText'Group sum percentage']
 *
 * Defines the name of the {@link #groupSumPercentage} function.
 *
 * **Note:** Used by the {@link Ext.pivot.plugin.Configurator configurator plugin} when listing all functions that can
 * be used on an aggregate dimension.
 */

/**
 * @property {String} [groupCountPercentageText'Group count percentage']
 *
 * Defines the name of the {@link #groupCountPercentage} function.
 *
 * **Note:** Used by the {@link Ext.pivot.plugin.Configurator configurator plugin} when listing all functions that can
 * be used on an aggregate dimension.
 */

/**
 * @property {String} [varianceText'Var']
 *
 * Defines the name of the {@link #variance} function.
 *
 * **Note:** Used by the {@link Ext.pivot.plugin.Configurator configurator plugin} when listing all functions that can
 * be used on an aggregate dimension.
 */

/**
 * @property {String} [variancePText'Varp']
 *
 * Defines the name of the {@link #varianceP} function.
 *
 * **Note:** Used by the {@link Ext.pivot.plugin.Configurator configurator plugin} when listing all functions that can
 * be used on an aggregate dimension.
 */

/**
 * @property {String} [stdDevText'StdDev']
 *
 * Defines the name of the {@link #stdDev} function.
 *
 * **Note:** Used by the {@link Ext.pivot.plugin.Configurator configurator plugin} when listing all functions that can
 * be used on an aggregate dimension.
 */

/**
 * @property {String} [stdDevPText='StdDevp']
 *
 * Defines the name of the {@link #stdDevP} function.
 *
 * **Note:** Used by the {@link Ext.pivot.plugin.Configurator configurator plugin} when listing all functions that can
 * be used on an aggregate dimension.
 */

/**
 * @method sum
 * Calculates the sum of all records using the measure field.
 *
 * @param {Array} records Records to process.
 * @param {String} measure Field to aggregate by.
 * @param {Ext.pivot.matrix.Base} matrix The matrix object reference.
 * @param {String} rowGroupKey Key of the left axis item.
 * @param {String} colGroupKey Key of the top axis item.
 *
 * @return {Number}
 */

/**
 * @method avg
 * Calculates the avg of all records using the measure field.
 *
 * @param {Array} records Records to process.
 * @param {String} measure Field to aggregate by.
 * @param {Ext.pivot.matrix.Base} matrix The matrix object reference.
 * @param {String} rowGroupKey Key of the left axis item.
 * @param {String} colGroupKey Key of the top axis item.
 *
 * @return {Number}
 */

/**
 * @method min
 * Calculates the min of all records using the measure field.
 *
 * @param {Array} records Records to process.
 * @param {String} measure Field to aggregate by.
 * @param {Ext.pivot.matrix.Base} matrix The matrix object reference.
 * @param {String} rowGroupKey Key of the left axis item.
 * @param {String} colGroupKey Key of the top axis item.
 *
 * @return {Number}
 */

/**
 * @method max
 * Calculates the max of all records using the measure field.
 *
 * @param {Array} records Records to process.
 * @param {String} measure Field to aggregate by.
 * @param {Ext.pivot.matrix.Base} matrix The matrix object reference.
 * @param {String} rowGroupKey Key of the left axis item.
 * @param {String} colGroupKey Key of the top axis item.
 *
 * @return {Number}
 */

/**
 * @method count
 * Calculates the count of all records using the measure field.
 *
 * @param {Array} records Records to process.
 * @param {String} measure Field to aggregate by.
 * @param {Ext.pivot.matrix.Base} matrix The matrix object reference.
 * @param {String} rowGroupKey Key of the left axis item.
 * @param {String} colGroupKey Key of the top axis item.
 *
 * @return {Number}
 */

/**
 * @method groupSumPercentage
 * Calculates the percentage from the row group sum.
 *
 * @param {Array} records Records to process.
 * @param {String} measure Field to aggregate by.
 * @param {Ext.pivot.matrix.Base} matrix The matrix object reference.
 * @param {String} rowGroupKey Key of the left axis item.
 * @param {String} colGroupKey Key of the top axis item.
 *
 * @return {Number}
 */

/**
 * @method groupCountPercentage
 * Calculates the percentage from the row group count.
 *
 * @param {Array} records Records to process.
 * @param {String} measure Field to aggregate by.
 * @param {Ext.pivot.matrix.Base} matrix The matrix object reference.
 * @param {String} rowGroupKey Key of the left axis item.
 * @param {String} colGroupKey Key of the top axis item.
 *
 * @return {Number}
 */

/**
 * @method variance
 * Calculates the sample variance of all records using the measure field.
 *
 * @param {Array} records Records to process.
 * @param {String} measure Field to aggregate by.
 * @param {Ext.pivot.matrix.Base} matrix The matrix object reference.
 * @param {String} rowGroupKey Key of the left axis item.
 * @param {String} colGroupKey Key of the top axis item.
 *
 * @return {Number}
 */

/**
 * @method varianceP
 * Calculates the population variance of all records using the measure field.
 *
 * @param {Array} records Records to process.
 * @param {String} measure Field to aggregate by.
 * @param {Ext.pivot.matrix.Base} matrix The matrix object reference.
 * @param {String} rowGroupKey Key of the left axis item.
 * @param {String} colGroupKey Key of the top axis item.
 *
 * @return {Number}
 */

/**
 * @method stdDev
 * Calculates the sample standard deviation of all records using the measure field.
 *
 * @param {Array} records Records to process.
 * @param {String} measure Field to aggregate by.
 * @param {Ext.pivot.matrix.Base} matrix The matrix object reference.
 * @param {String} rowGroupKey Key of the left axis item.
 * @param {String} colGroupKey Key of the top axis item.
 *
 * @return {Number}
 */

/**
 * @method stdDevP
 * Calculates the population standard deviation of all records using the measure field.
 *
 * @param {Array} records Records to process.
 * @param {String} measure Field to aggregate by.
 * @param {Ext.pivot.matrix.Base} matrix The matrix object reference.
 * @param {String} rowGroupKey Key of the left axis item.
 * @param {String} colGroupKey Key of the top axis item.
 *
 * @return {Number}
 */

