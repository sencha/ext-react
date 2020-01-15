/**
 * @class Ext.grid.column.Column
 * @extend Ext.grid.HeaderContainer
 * @xtype gridcolumn
 * @xtype column
 * @xtype templatecolumn
 *
 * This class specifies the definition for a column inside a {@link Ext.grid.Grid}. It
 * encompasses both the grid header configuration as well as displaying data within the
 * grid itself.
 *
 * In general an array of column configurations will be passed to the grid.
 *
 * ## Example usage:
 *
 *   @example packages=[ext-react]
 *   import React, { Component } from 'react';
 *   import { ExtReact, Grid, Column, Panel } from '@sencha/ext-modern';
 *
 *   export default class MyExample extends Component {
 *       render() {
 *           this.store = new Ext.data.Store({
 *               data: [
 *                   { "name": "Lisa", "email": "lisa@simpsons.com", "phone": "555-111-1224" },
 *                   { "name": "Bart", "email": "bart@simpsons.com", "phone": "555-222-1234" },
 *                   { "name": "Homer", "email": "home@simpsons.com", "phone": "555-222-1244" },
 *                   { "name": "Marge", "email": "marge@simpsons.com", "phone": "555-222-1254" }
 *               ]
 *           });
 *           return (
 *              </ExtReact>
 *               <Panel width="100%" height="100%">
 *                   <Grid shadow="true" height="100%" store={this.store}>
 *                       <Column text="Name" dataIndex="name" flex="1"></Column>
 *                       <Column text="Email" dataIndex="email" flex="1"></Column>
 *                       <Column text="Phone" dataIndex="phone" flex="1"></Column>
 *                   </Grid>
 *               </Panel>
 *              </ExtReact>
 *           )
 *       }
 *   }
 *
 * # Convenience Subclasses
 *
 * There are several column subclasses that provide default rendering for various data types
 *
 *  - {@link Ext.grid.column.Boolean}: Renders for boolean values
 *  - {@link Ext.grid.column.Date}: Renders for date values
 *  - {@link Ext.grid.column.Number}: Renders for numeric values
 *
 * For more information about configuring cell content, see {@link Ext.grid.Grid}.
 *
 * # Setting Sizes
 *
 * The columns can be only be given an explicit width value. If no width is specified the
 * grid will automatically the size the column to 20px.
 *
 * # Header Options
 *
 *  - {@link #text}: Sets the header text for the column
 *  - {@link #sortable}: Specifies whether the column can be sorted by clicking the header
 *    or using the column menu
 *
 * # Data Options
 *
 *  - {@link #dataIndex}: The dataIndex is the field in the underlying {@link Ext.data.Store}
 *    to use as the value for the column.
 *  - {@link #renderer}: Allows the underlying store value to be transformed before being
 *    displayed in the grid.
 */

/**
 * @property {Boolean} [isGridColumn=true]
 * Set in this class to identify, at runtime, instances which are not instances of the
 * HeaderContainer base class, but are in fact, the subclass: Ext.grid.Column.
 */

/**
 * @property {Boolean} isLeafHeader
 * This will be set to `true` if the column has no child columns.
 */

/**
 * @property {Boolean} isHeaderGroup
 * This will be set to `true` if the column has child columns.
 */

/**
 * @cfg {left/center/right} [align='null']
 * Sets the alignment of the header and rendered columns.
 * Possible values are: `'left'`, `'center'`, and `'right'`.
 * @accessor
 */

/**
 * @cfg {Ext.grid.cell.Base} cell
 * The {@link Ext.grid.cell.Base cell} to use on this column.  By default, columns use
 * {@link Ext.grid.cell.Cell GridCell}
 *
 * Example snippet:
 *
 *     <Column text="Trend" width="200">
 *         <NumberCell forceWidth bind="{record.grade}"/>
 *     </Column>
 *
 * NOTE: Any subclass of {@link Ext.grid.cell.Base} may be used.  i.e.:
 * {@link Ext.grid.cell.Boolean BooleanCell}
 *
 * {@link Ext.grid.cell.Expander ExpanderCell}
 *
 * {@link Ext.grid.cell.Cell GridCell}
 *
 * {@link Ext.grid.cell.Number NumberCell}
 *
 * {@link Ext.grid.cell.RowNumberer RowNumbererCell}
 *
 * {@link Ext.grid.cell.Text TextCell}
 *
 * {@link Ext.grid.cell.Widget WidgetCell}
 *
 * @accessor
 * @react-child
 */

/**
 * @cfg {String} [dataIndex=null] (required)
 * The name of the field in the grid's {@link Ext.data.Store}'s {@link Ext.data.Model} definition from
 * which to draw the column's value. **Required.**
 * @accessor
 */

/**
 * @cfg {Number} [defaultWidth=100]
 * A width to apply if the {@link #flex} or {@link #width} configurations have not
 * been specified.
 *
 * @accessor
 * @since 6.2.0
 */

/**
 * @cfg {String} [text='\xa0']
 * The header text to be used as innerHTML (html tags are accepted) to display in the Grid.
 * **Note**: to have a clickable header with no text displayed you can use the default of `&#160;` aka `&nbsp;`.
 * @accessor
 */

/**
 * @cfg {Boolean} [sortable=true]
 * False to disable sorting of this column. Whether local/remote sorting is used is specified in
 * `{@link Ext.data.Store#remoteSort}`.
 * @accessor
 */

/**
 * @cfg {Boolean} [groupable=true]
 * If the grid is {@link Ext.grid.Grid#grouped grouped}, and uses a
 * {@link Ext.grid.plugin.ViewOptions ViewOptions} plugin this option may be used to
 * disable the option to group by this column. By default, the group option is enabled.
 * @accessor
 */

/**
 * @cfg {Boolean} [resizable=true]
 * False to prevent the column from being resizable.
 * Note that this configuration only works when the {@link Ext.grid.plugin.ColumnResizing ColumnResizing} plugin
 * is enabled on the {@link Ext.grid.Grid Grid}.
 * @accessor
 */

/**
 * @cfg {Function/String} [renderer=null]
 * A renderer is a function which is used to transform data (value, appearance, etc.)
 * before it is rendered.
 *
 * For example:
 *
 *      <Grid>
 *          <Column
 *              text="Full Name"
 *              renderer={(value, record) => (
 *                  <div>{record.get('firstName')} {record.get('lastName')}</div>
 *              )}
 *          />
 *      </Grid>
 *
 * A renderer may return any React element or component.  Here is an example that embeds a button in a grid cell:
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
 * When the renderer prop is specified, a {@link Ext.reactor.RendererCell RendererCell} is used.  Be sure to import
 * RendererCell so that it is included in your application's JavaScript bundle:
 *
 *      import { RendererCell } from '@sencha/ext-react-modern';
 *
 * @cfg {Object} renderer.value The data value for the current cell.
 * @cfg {Ext.data.Model} renderer.record The record for the current row.
 * @cfg {Number} renderer.dataIndex The dataIndex of the current column.
 * @cfg {Ext.grid.cell.Base} renderer.cell The current cell.
 * @cfg {Ext.grid.column.Column} renderer.column The current column.
 * @cfg {String} renderer.return The HTML string to be rendered. *Note*: to
 * render HTML into the cell, you will have to configure the column's {@link #cell}
 * with `encodeHtml: false`
 * @accessor
 */

/**
 * @cfg {String} [formatter=null]
 * This config accepts a format specification as would be used in a `Ext.Template`
 * formatted token. For example `'round(2)'` to round numbers to 2 decimal places
 * or `'date("Y-m-d")'` to format a Date.
 *
 * In previous releases the `renderer` config had limited abilities to use one
 * of the `Ext.util.Format` methods but `formatter` now replaces that usage and
 * can also handle formatting parameters.
 *
 * When the value begins with `"this."` (for example, `"this.foo(2)"`), the
 * implied scope on which "foo" is found is the `scope` config for the column.
 *
 * @accessor
 * @since 6.2.0
 */

/**
 * @cfg {Object} [scope=null]
 * The scope to use when calling the {@link #renderer} or {@link #formatter} function.
 * @accessor
 */

/**
 * @cfg {Boolean} [editable=null]
 * Set this to true to make this column editable.
 * Only applicable if the grid is using an {@link Ext.grid.plugin.Editable Editable} plugin.
 * @accessor
 */

/**
 * @cfg {Ext.field.Field} [editor=null]
 * Any {@link Ext.field.Field Form Field} to be used as the editor for cells on this
 * column.  Only applicable if the grid is using an
 * {@link Ext.grid.plugin.Editable editable} plugin.  Note also that {@link #editable}
 * has to be set to true if you want to make this column editable.  If this configuration
 * is not set, and {@link #editable} is set to true, the {@link #defaultEditor} is used.
 *
 * Example snippet:
 *
 *     <Column
 *         text="Price"
 *         width="120"
 *         dataIndex="price"
 *         formatter="usMoney"
 *         editable
 *     >
 *         <NumberField required validators={{type:"number", message:"Invalid price"}}/>
 *     </Column>
 *
 * NOTE: Any subclass of {@link Ext.field.Field} may be used.  i.e.:
 * {@link Ext.field.Checkbox CheckboxField}
 *
 * {@link Ext.field.ComboBox ComboBoxField}
 *
 * {@link Ext.field.Container ContainerField}
 *
 * {@link Ext.field.Date DatePickerField}
 *
 * {@link Ext.field.Email EmailField}
 *
 * {@link Ext.field.File FileField}
 *
 * {@link Ext.field.Number NumberField}
 *
 * {@link Ext.field.Picker PickerField}
 *
 * {@link Ext.field.Search SearchField}
 *
 * {@link Ext.field.Select SelectField}
 *
 * {@link Ext.field.Slider SliderField}
 *
 * {@link Ext.field.Spinner SpinnerField}
 *
 * {@link Ext.field.TextArea TextArea}
 *
 * {@link Ext.field.Toggle ToggleField}
 *
 * {@link Ext.field.URL URLField}
 *
 * @accessor
 * @react-child
 */

/**
 * @cfg {Object/Ext.field.Field} [defaultEditor==null]
 * An optional config object that should not really be modified. This is used to create
 * a default editor used by the {@link Ext.grid.plugin.Editable Editable} plugin when no
 * {@link #editor} is specified.
 * @accessor
 */

/**
 * @cfg {Boolean} [ignore=false]
 * This configuration should be left alone in most cases. This is used to prevent certain columns
 * (like the MultiSelection plugin column) to show up in plugins (like the {@link Ext.grid.plugin.ViewOptions} plugin).
 * @accessor
 */

/**
 * @cfg {Boolean} [ignoreExport=false]
 * This flag indicates that this column will be ignored when grid data is exported.
 *
 * When grid data is exported you may want to export only some columns that are important
 * and not everything. You can set this flag on any column that you want to be ignored during export.
 *
 * This is used by {@link Ext.grid.plugin.Exporter exporter plugin}.
 * @accessor
 */

/**
 * @cfg {Ext.exporter.file.Style/Ext.exporter.file.Style[]} [exportStyle=null]
 *
 * A style definition that is used during data export via the {@link Ext.grid.plugin.Exporter exporter plugin}.
 * This style will be applied to the columns generated in the exported file.
 *
 * You could define it as a single object that will be used by all exporters:
 *
 *      {
 *          xtype: 'numbercolumn',
 *          dataIndex: 'price',
 *          exportStyle: {
 *              format: 'Currency',
 *              alignment: {
 *                  horizontal: 'Right'
 *              },
 *              font: {
 *                  italic: true
 *              }
 *          }
 *      }
 *
 * You could also define it as an array of objects, each object having a `type` that specifies by
 * which exporter will be used:
 *
 *      {
 *          xtype: 'numbercolumn',
 *          dataIndex: 'price',
 *          exportStyle: [{
 *              type: 'html', // used by the `html` exporter
 *              format: 'Currency',
 *              alignment: {
 *                  horizontal: 'Right'
 *              },
 *              font: {
 *                  italic: true
 *              }
 *          },{
 *              type: 'csv', // used by the `csv` exporter
 *              format: 'General'
 *          }]
 *      }
 *
 * Or you can define it as an array of objects that has:
 *
 * - one object with no `type` key that is considered the style to use by all exporters
 * - objects with the `type` key defined that are exceptions of the above rule
 *
 *      {
 *          xtype: 'numbercolumn',
 *          dataIndex: 'price',
 *          exportStyle: [{
 *              // no type defined means this is the default
 *              format: 'Currency',
 *              alignment: {
 *                  horizontal: 'Right'
 *              },
 *              font: {
 *                  italic: true
 *              }
 *          },{
 *              type: 'csv', // only the CSV exporter has a special style
 *              format: 'General'
 *          }]
 *      }
 *
 * @accessor
 */

/**
 * @cfg {Boolean/Function/String} [exportRenderer=false]
 *
 * During data export via the {@link Ext.grid.plugin.Exporter} plugin the data for
 * this column could be formatted in multiple ways:
 *
 * - using the `exportStyle.format`
 * - using the `formatter` if no `exportStyle` is defined
 * - using the `exportRenderer`
 *
 * If you want to use the `renderer` defined on this column then set `exportRenderer`
 * to `true`. Beware that this should only happen if the `renderer` deals only with
 * data on the record or value and it does NOT style the cell or returns an html
 * string.
 *
 *      <NumberColumn
 *          dataIndex="price"
 *          text="Price"
 *          renderer={value => Ext.util.Format.currency(value)}
 *          exportRenderer
 *      />
 *
 * If you don't want to use the `renderer` during export but you still want to format
 * the value in a special way then you can provide a function to `exportRenderer`
 * The provided function has the same signature as the renderer prop.
 *
 *      <NumberColumn
 *          dataIndex="price"
 *          text="Price"
 *          exportRenderer={value => Ext.util.Format.currency(value)}
 *      />
 *
 * If `exportStyle.format`, `formatter` and `exportRenderer` are all defined on the
 * column then the `exportStyle` wins and will be used to format the data for this
 * column.
 * @accessor
 */

/**
 * @cfg {Object} [summaryCell=null]
 * The config object used to create {@link Ext.grid.cell.Base cells} in
 * {@link Ext.grid.plugin.Summary Summary Rows} for this column.
 * @accessor
 */

/**
 * @cfg {String/Function} summaryType
 * This configuration specifies the type of summary. There are several built in
 * summary types. These call underlying methods on the store:
 *
 *  - {@link Ext.data.Store#count count}
 *  - {@link Ext.data.Store#sum sum}
 *  - {@link Ext.data.Store#min min}
 *  - {@link Ext.data.Store#max max}
 *  - {@link Ext.data.Store#average average}
 *
 * Any other name is assumed to be the name of a method on the associated
 * {@link Ext.app.ViewController view controller}.
 *
 * Note that this configuration only works when the grid has the
 * {@link Ext.grid.plugin.SummaryRow SummaryRow} plugin enabled.
 * @accessor
 */

/**
 * @cfg {String/Function} [summaryRenderer=null]
 * This summaryRenderer is called before displaying a value in the SummaryRow. The
 * function is optional, if not specified the default calculated value is shown. The
 * summaryRenderer is called with:
 *
 *  - value {Object} - The calculated value.
 *
 * Note that this configuration only works when the grid has the
 * {@link Ext.grid.plugin.SummaryRow SummaryRow} plugin enabled.
 * @accessor
 */

/**
 * @cfg {String} [summaryFormatter=null]
 * This summaryFormatter is similar to {@link #formatter} but is called before
 * displaying a value in the SummaryRow. The config is optional, if not specified
 * the default calculated value is shown. The summaryFormatter is called with:
 *
 *  - value {Object} - The calculated value.
 *
 * Note that this configuration only works when the grid has the
 * {@link Ext.grid.plugin.SummaryRow SummaryRow} plugin enabled.
 * @accessor
 */

/**
 * @cfg {Boolean/Function/String} [exportSummaryRenderer=false]
 *
 * This config is similar to {@link #exportRenderer} but is applied to summary records.
 *@accessor
 */

/**
 * @cfg {String/String[]/Ext.XTemplate} [tpl=null]
 * An {@link Ext.XTemplate XTemplate}, or an XTemplate *definition string* to use
 * to process a {@link Ext.data.Model records} data to produce a cell's rendered
 * value.
 *
 * This config is only processed if the {@link #cell} type is the default of
 * {@link Ext.grid.cell.Cell gridcell}.
 *
 * **Note** See {@link Ext.grid.Grid} documentation for other, better alternatives
 * to rendering cell content.
 * @accessor
 */

/**
 * @cfg {Function/String/Object/Ext.util.Grouper} grouper
 * A grouper config object to apply when the standard grouping user interface is
 * is invoked. This option is, for example, available in the column's header
 * menu.
 *
 * Note that a grouper may also be specified as a function which accepts two
 * records to compare.
 *
 * A `{@link Ext.app.ViewController controller}` method can be used like so:
 *
 *      grouper: 'groupMethodName'
 *
 * This is different then a `sorter` in that the `grouper` method is used to
 * set the {@link Ext.util.Grouper#cfg!groupFn groupFn}. This string returned
 * by this method is used to determine group membership. To specify both the
 * `grpoupFn` and the `sorterFn`:
 *
 *      grouper: {
 *          groupFn: 'groupMethodName'
 *          sorterFn: 'sorterMethodName
 *      }
 *
 * @accessor
 * @since 6.5.0
 */

/**
 * @cfg {String/String[]/Ext.XTemplate} [groupHeaderTpl=null]
 * This config allows a column to replace the default template supplied by the
 * grid's {@link Ext.grid.Grid#groupHeaderTpl groupHeaderTpl}.
 *
 * @accessor
 * @since 6.5.0
 */

/**
 * @cfg {Function/String/Object/Ext.util.Sorter} [sorter=null]
 * A sorter config object to apply when the standard sort user interface is
 * is invoked. This is usually clicking this column header, but there are also
 * menu options to sort ascending or descending.
 *
 * Note that a sorter may also be specified as a function which accepts two
 * records to compare.
 *
 * A `{@link Ext.app.ViewController controller}` method can be used like so:
 *
 *      sorter: 'sorterMethodName'
 *
 * Or more explicitly:
 *
 *      sorter: {
 *          sorterFn: 'sorterMethodName'
 *      }
 *
 * By default sorting is based on the `dataIndex` but this can be adjusted
 * like so:
 *
 *      sorter: {
 *          property: 'otherProperty'
 *      }
 *
 * @accessor
 * @since 6.5.0
 */

/**
 * @cfg {Boolean} [menuDisabled=null]
 * True to disable the column header menu containing sort/hide options.
 * @accessor
 */

/**
 * @cfg {Object} [menu]
 * An optional menu configuration object which is merged with the grid's
 * {@link #cfg!columnMenu} to create this column's header menu.
 *
 * The grid's {@link #cfg!columnMenu} provides the sort items, this config can be
 * used to add application-specific column menu items.
 * @accessor
 * @since 6.5.0
 */

/**
 * @event columnmenucreated
 * @member Ext.grid.Grid
 * Fired when a column first creates its column menu. This is to allow plugins
 * to access and manipulate the column menu.
 *
 * There will be the two sort items, and a column hide/show item with a child menu of
 * checkboxes. After this, developers may add custom enu items.
 *
 * Menu items may be configured with a `weight` config, and those with the lowest weight
 * gravitate to the top.
 *
 * The sort ascending, sort descending, and hide columns items have weight -3, -2, and -1
 * @param {Ext.grid.Grid} grid This Grid
 * @param {Ext.grid.Column} column The column creating the menu
 * @param {Ext.menu.Menu} menu The column's new menu
 */

/**
 * @cfg {Object} editorDefaults
 * This object holds default config objects for creating the column's `editor`.
 * The keys of this object are {@link Ext.data.field.Field#cfg!type field type}
 * values (such as `'date'` or `'int'`). These keys can also be a comma-separated
 * list of such type names.
 *
 * These defaults are applied when producing an `editor` based on the field of
 * {@link #cfg!store store's} {@link Ext.data.Store#cfg!model model} identified
 * by the {@link #cfg!dataIndex dataIndex}.
 *
 * See {@link #ensureEditor ensureEditor}.
 * @since 7.0
 */

/**
 * @method autoSize
 * Sizes this Column to fit the max content width of records.
 * @since 7.0
 */

/**
 * @method ensureEditor
 * This method returns the {@link #cfg!editor editor} for this column. If an `editor`
 * is not explicitly configured and `editable` is `true`, then `defaultEditor` and
 * `editorDefaults` configs are used to produce an appropriate editor based on the
 * column's derived type and/or the `dataIndex` of the associated model.
 * @return {Ext.Component}
 * @since 7.0
 */
