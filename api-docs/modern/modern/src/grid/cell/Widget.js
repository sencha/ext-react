/**
 * @class Ext.grid.cell.Widget
 * @extend Ext.grid.cell.Base
 * @xtype widgetcell
 *
 * This class is used for {@link Ext.grid.Grid grid} cells that contain a child
 * {@link Ext.Component} or {@link Ext.Widget}. This cell type is typically used by
 * specifying {@link Ext.grid.column.Widget} column type.
 *
 * {@link Ext.grid.Row Rows} create cells based on the {@link Ext.grid.column.Column#cell}
 * config. Application code would rarely create cells directly.
 */

/**
 * @cfg {Boolean} [forceWidth=false]
 * `true` to measure the available width of the cell and set that
 * width on the underlying widget. If `false`, the widget width will auto size.
 * @accessor
 */

/**
 * @cfg {Ext.Component/Ext.Widget} [widget=null]
 * Subclasses of {@link Ext.Component} or {@link Ext.Widget}
 *
 * Example snippet:
 *
 *     <Column text="Trend" width="200">
 *         <WidgetCell forceWidth bind="{record.trend}">
 *             <SparkLineLine tipTpl='Price: {y:number("0.00")}'/>
 *         </WidgetCell>
 *     </Column>
 *
 * NOTE: Any subclass of {@link Ext.Component} or {@link Ext.Widget} may be used.  i.e.:
 * {@link Ext.Button Button}  
 * 
 * {@link Ext.Img Image}  
 * 
 * {@link Ext.sparkline.Pie SparkLinePie}
 *
 * @react-child
 */
