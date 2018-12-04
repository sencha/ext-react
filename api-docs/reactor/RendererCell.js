/**
 * @class Ext.reactor.RendererCell
 * @extends Ext.grid.cell.Base
 * @xtype renderercell
 * 
 * Use this component to render a React element inside of a grid cell.  
 *
 *      <Grid>
 *          <Column text="Actions" dataIndex="name">
 *              <RendererCell
 *                  renderer={(value, record) => (
 *                      <Button text={`Call ${value}`} handler={this.onCallClick.bind(this, record)}/>
 *                  )}
 *              />
 *          </Column>
 *      </Grid>
 *
 * RendererCell is automatically used when a Column contains a renderer prop. The following is equivalent to the example above:
 * 
 *      <Grid>
 *          <Column 
 *              text="Actions" 
 *              dataIndex="name"
 *              renderer={(value, record) => (
 *                  <Button text={`Call ${value}`} handler={this.onCallClick.bind(this, record)}/>
 *              )}
 *          />
 *      </Grid>
 * 
 */

/**
 * @cfg {Function} renderer
 * @accessor
 * A function that returns a React element or text to render. It is passed 
 * the following arguments:
 * @cfg {Object} renderer.value The data value for the current cell.
 * @cfg {Ext.data.Model} renderer.record The record for the current row.
 * @cfg {Number} renderer.dataIndex The dataIndex of the current column.
 * @cfg {Ext.grid.cell.Base} renderer.cell The current cell.
 * @cfg {Ext.grid.column.Column} renderer.column The current column.
 * @cfg {React.Element/String} renderer.return The React element or text to be rendered.
 */

/**
 * @cfg {Function} summaryRenderer
 * @accessor
 * A function that returns a React element or text to render in the summary 
 * row. It is passed the following arguments:
 * @cfg {Object} renderer.value The data value for the current cell.
 * @cfg {React.Element/String} renderer.return The React element or text to be rendered.
 */

/**
 * @cfg {Boolean} [forceWidth=false]
 * @accessor
 * `true` to measure the available width of the cell and set that
 * width on the underlying widget. If `false`, the widget width will auto
 * size.
 */
