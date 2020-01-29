/**
 * @class Ext.chart.axis.Axis3D
 * @extend Ext.chart.axis.Axis
 * @xtype axis3d
 *
 * Defines a 3D axis for charts.
 *
 * A 3D axis has the same properties as the regular {@link Ext.chart.axis.Axis axis},
 * plus a notion of depth. The depth of the 3D axis is determined automatically
 * based on the depth of the bound series.
 *
 * This type of axis has the following limitations compared to the regular axis class:
 * - supported {@link Ext.chart.axis.Axis#position positions} are 'left' and 'bottom' only;
 * - floating axes are not supported.
 *
 * At the present moment only {@link Ext.chart.series.Bar3D} series can make use of the 3D axis.
 */

/**
 * @cfg {String} position
 * Where to set the axis. Available options are `left` and `bottom`.
 * @accessor
 */
