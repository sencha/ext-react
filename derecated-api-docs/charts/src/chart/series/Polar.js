/**
 * @abstract
 * @class Ext.chart.series.Polar
 * @extend Ext.chart.series.Series
 *
 * Common base class for series implementations that plot values using polar coordinates.
 */

/**
 * @cfg {Number} [rotation=0]
 * The angle in degrees at which the first polar series item should start.
 * @accessor
 */

/**
 * @cfg {Array} [center=[0,0]]
 * Center of the polar series.
 * @accessor
 */

/**
 * @cfg {Number} [offsetX=0]
 * The x-offset of center of the polar series related to the center of the boundary.
 * @accessor
 */

/**
 * @cfg {Number} [offsetY=0]
 * The y-offset of center of the polar series related to the center of the boundary.
 * @accessor
 */

/**
 * @cfg {Boolean} [showInLegend=true]
 * Whether to add the series elements as legend items.
 * @accessor
 */

/**
 * @cfg {String} [angleField=null]
 * The store record field name for the angular axes in radar charts,
 * or the size of the slices in pie charts.
 * @accessor
 */

/**
 * @cfg {String} [radiusField]
 * The store record field name for the radial axes in radar charts,
 * or the radius of the slices in pie charts.
 * @accessor
 */
