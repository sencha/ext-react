/**
 * @class Ext.grid.selection.Model
 * @extend Ext.dataview.selection.Model
 * @alias selmodel.grid
 * A selection model for {@link Ext.grid.Grid grids} which allows you to select data in
 * a spreadsheet-like manner.
 *
 * Supported features:
 *
 *  - Single / Range / Multiple individual row selection.
 *  - Single / Range cell selection.
 *  - Column selection by click selecting column headers.
 *  - Select / deselect all by clicking in the top-left, header.
 *  - Adds row number column to enable row selection.
 *  - Optionally you can enable row selection using checkboxes
 *
 * # Using {@link Ext.data.virtual.Store}s
 * It is very important to remember that a {@link Ext.data.virtual.Store} does *not* contain the
 * full dataset. The purpose of a VirtualStore is to only hold in the client, a range of
 * pages from the dataset that corresponds with what is currently visible in the grid
 * (plus a few pages above and below the visible range to allow fast scrolling).
 *
 * When using "select all" rows and a VirtualStore, an `allSelected` flag is set, and so all
 * records which are read into the client side cache will thenceforth be selected, and will
 * be rendered as selected in the grid.
 *
 * *But records which have not been read into the cache will obviously not be available
 * when interrogating selected records. What is stored as being selected is row index ranges.*
 *
 */

/**
 * @cfg {Boolean} [columns=false]
 * Set to `true` to enable selection of columns.
 *
 * **NOTE**: This will disable sorting on header click and instead provide column
 * selection and deselection. Sorting is still available via column header menu.
 * @accessor
 */

/**
 * @cfg {Boolean} [cells=false]
 * Set to `true` to enable selection of individual cells or a single rectangular
 * range of cells. This will provide cell range selection using click, and
 * potentially drag to select a rectangular range if (@link #cfg!dragSelect} is `true`.
 * You can also use "SHIFT + arrow" key navigation to select a range of cells.
 * @accessor
 */

/**
 * @cfg {Boolean} [rows=true]
 * Set to `true` to enable selection of rows by clicking on the selection model's
 * {@link #cfg!checkbox} column, {@link Ext.grid.Grid#cfg!rowNumbers row number column}, or, if (@link #cfg!dragSelect}
 * is `true`, by swiping down the {@link Ext.grid.Grid#cfg!rowNumbers row number column}.
 * @accessor
 */

/**
 * @cfg {Boolean} [dragSelect=true]
 * Set to `true` to enables cell and row range selection by dragging.
 * @accessor
 */

/**
 * @cfg {String} [extensible=false]
 * This configures whether this selection model is to implement a mouse based dragging gesture to extend a *contiguous* selection.
 *
 * Note that if there are multiple, discontiguous selected rows or columns, selection extension is not available.
 *
 * If set, then the bottom right corner of the contiguous selection will display a drag handle. By dragging this, an extension area
 * may be defined into which the selection is extended.
 *
 * Upon the end of the drag, the {@link Ext.grid.Grid#beforeselectionextend beforeselectionextend} event will be fired though the
 * encapsulating grid. Event handlers may manipulate the store data in any way.
 *
 * Possible values for this configuration are
 *
 *    - `"x"` Only allow extending the block to the left or right.
 *    - `"y"` Only allow extending the block above or below.
 *    - `"xy"` Allow extending the block in both dimensions.
 *    - `"both"` Allow extending the block in both dimensions.
 *    - `true` Allow extending the block in both dimensions.
 *    - `false` Disable the extensible feature
 *    - `null` Disable the extensible feature
 *
 * It's important to notice that setting this to `"both"`, `"xy"` or `true` will allow you to extend the selection in both
 * directions, but only one direction at a time. It will NOT be possible to drag it diagonally.
 * @accessor
 */

/**
 * @cfg {Boolean} [checkbox=false]
 * Configure as `true` to include a checkbox to indicate selection of *Records*. The
 * checkbox cell plays no part in cell or column selection apart from being a selected
 * cell and part of any iteration through selections.
 *
 * See {@link #cfg!headerCheckbox} for inclusion of a "select all" checkbox in the
 * column header of the checkbox column.
 *
 * See {@link #cfg!checkboxDefaults} for how to influence the configuration of the checkbox
 * column header.
 * @accessor
 */

/**
 * @cfg {Boolean} [headerCheckbox=true]
 * Configure as `false` to not display the header checkbox at the top of the checkbox column
 * when {@link #checkboxSelect} is set.
 * @accessor
 */

/**
 * @cfg {Object} [checkboxDefaults]
 * A config object to configure the checkbox column header if {@link #cfg!checkbox} is set.
 * @accessor
 */

/**
 * @event selectionchange
 * Fired *by the grid* after the selection changes. Return `false` to veto the selection extension.
 *
 * Note that the behavior of selectionchange is different in Ext 6.x vs. Ext 5.  In Ext 6.x, if rows
 * are being selected, a block of records is passed as the second parameter.  In Ext 5, the selection
 * object was passed.
 *
 *
 * @param {Ext.grid.Panel} grid The grid whose selection has changed.
 * @param {Ext.dataview.selection.Selection} selection A subclass of
 * {@link Ext.dataview.selection.Selection} describing the new selection.
 */

/**
 * @cfg {Boolean} checkboxSelect [checkboxSelect=false]
 * Enables selection of the row via clicking on checkbox. Note: this feature will add
 * new column at position specified by {@link #checkboxColumnIndex}.
 */

/**
 * @cfg {Number/String} [checkboxColumnIndex=0]
 * The index at which to insert the checkbox column.
 * Supported values are a numeric index, and the strings 'first' and 'last'. Only valid when set
 * *before* render.
 */

/**
 * @member Ext.grid.Grid
 * @event beforeselectionextend An event fired when an extension block is extended
 * using a drag gesture. Only fired when the grid's `{@link Ext.grid.Grid.selectable #cfg!selectable}`
 * is configured with the {@link Ext.grid.selection.Model#extensible extensible} config.
 * @param {Ext.grid.Grid} grid The owning grid.
 * @param {Ext.dataview.selection.Selection} An object which encapsulates a contiguous selection block.
 * @param {Object} extension An object describing the type and size of extension.
 * @param {String} extension.type `"rows"` or `"columns"`
 * @param {Ext.grid.Location} extension.start The start (top left) cell of the extension area.
 * @param {Ext.grid.Location} extension.end The end (bottom right) cell of the extension area.
 * @param {number} [extension.columns] The number of columns extended (-ve means on the left side).
 * @param {number} [extension.rows] The number of rows extended (-ve means on the top side).
 */

/**
 * @member Ext.grid.Grid
 * @event selectionextenderdrag An event fired when an extension block is dragged to
 * encompass a new range. Only fired when the grid's `{@link Ext.grid.Grid.selectable #cfg!selectable}`
 * is configured with the {@link Ext.grid.selection.Model#extensible extensible} config.
 * @param {Ext.grid.Grid} grid The owning grid.
 * @param {Ext.dataview.selection.Selection} An object which encapsulates a contiguous selection block.
 * @param {Object} extension An object describing the type and size of extension.
 * @param {String} extension.type `"rows"` or `"columns"`
 * @param {HTMLElement} extension.overCell The grid cell over which the mouse is being dragged.
 * @param {Ext.grid.Location} extension.start The start (top left) cell of the extension area.
 * @param {Ext.grid.Location} extension.end The end (bottom right) cell of the extension area.
 * @param {number} [extension.columns] The number of columns extended (-ve means on the left side).
 * @param {number} [extension.rows] The number of rows extended (-ve means on the top side).
 */

/**
 * @method selectCells
 * This method allows programmatic selection of the cell range.
 *
 * @param rangeStart {Ext.grid.Location/Number[]} Range starting position. Can be either Cell context or a `[rowIndex, columnIndex]` numeric array.
 *
 * Note that when a numeric array is used in a locking grid, the column indices are relative to the outermost grid, encompassing locked *and* normal sides.
 * @param rangeEnd {Ext.grid.Location/Number[]} Range end position. Can be either Cell context or a `[rowIndex, columnIndex]` numeric array.
 *
 * Note that when a numeric array is used in a locking grid, the column indices are relative to the outermost grid, encompassing locked *and* normal sides.
 * @param {Boolean} [suppressEvent] Pass `true` to prevent firing the
 * `{@link #selectionchange}` event.
 */

/**
 * @method selectAll
 * Select all the data if possible.
 *
 * If {@link #rows} is `true`, then all *records* will be selected.
 *
 * If {@link #cells} is `true`, then all *rendered cells* will be selected.
 *
 * If {@link #columns} is `true`, then all *columns* will be selected.
 *
 * @param {Boolean} [suppressEvent] Pass `true` to prevent firing the
 * `{@link #selectionchange}` event.
 */

/**
 * @method deselectAll
 * Clears the selection.
 * @param {Boolean} [suppressEvent] Pass `true` to prevent firing the
 * `{@link #selectionchange}` event.
 */

/**
 * @method selectRows
 * Select one or more rows.
 * @param rows {Ext.data.Model[]} Records to select.
 * @param {Boolean} [keepSelection=false] Pass `true` to keep previous selection.
 * @param {Boolean} [suppressEvent] Pass `true` to prevent firing the
 * `{@link #selectionchange}` event.
 */

/**
 * @method selectColumn
 * Selects a column.
 * @param {Ext.grid.column.Column} column Column to select.
 * @param {Boolean} [keepSelection=false] Pass `true` to keep previous selection.
 * @param {Boolean} [suppressEvent] Pass `true` to prevent firing the
 * `{@link #selectionchange}` event.
 */

/**
 * @method deselectColumn
 * Deselects a column.
 * @param {Ext.grid.column.Column} column Column to deselect.
 * @param {Boolean} [suppressEvent] Pass `true` to prevent firing the
 * `{@link #selectionchange}` event.
 */
