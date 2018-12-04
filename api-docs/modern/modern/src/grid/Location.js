/**
 * @class Ext.grid.Location
 * @extend Ext.dataview.Location
 * Instances of this class encapsulate a position in a grid's row/column coordinate system.
 *
 * Cell addresses are configured using the owning {@link #cfg!record} and {@link #cfg!column}
 * for robustness.
 *
 * The column may be moved, the store may be sorted, and the grid Location will still reference
 * the same *logical* cell. Be aware that due to buffered rendering the *physical* cell may
 * be recycled and used by another record.
 *
 * The {@link #setPosition}, {@link #setRecord} and {@link #setColumn} methods however,
 * allow numeric row and column values to be passed in. These are immediately converted.
 *
 * Be careful not to make `grid Location` objects *too* persistent. If the owning record
 * is removed or filtered out, or the owning column is removed, the reference will be stale.
 *
 * Note that due to buffered rendering, a valid `location` object might be scrolled out of
 * visibility, and therefore derendered, and may not not have a corresponding rendered
 * row.
 *
 * Also, when using {@link Ext.data.virtual.Store virtual stores}, the record referenced may
 * not be present in the store, and may require an asynchronous load to bring it into the
 * store before the location can be realized.
 *
 * Freshly created Location objects, such as those exposed by events from the
 * {@link Ext.grid.Selectable grid selection model} are safe to use until your
 * application mutates the store, or changes the column set.
 */

/**
 * @cfg {Ext.grid.column.Column} column
 * The grid column which owns this location.
 * @accessor
 */

/**
 * @method getRow
 * Returns the {@link Ext.grid.Row row} Component referenced *at the time of calling*.
 * Note that grid DOM is recycled, and the row referenced may be repurposed for use by
 * another record.
 *
 * @return {Ext.grid.Row} The Row component referenced by this Location.
 */

/**
 * @method getCell
 * Returns the {@link Ext.grid.Cell cell} Component referenced *at the time of calling*.
 * Note that grid DOM is recycled, and the cell referenced may be repurposed for use by
 * another record.
 *
 * @param {"cmp"/"dom"/"el"} [as=el] Pass `"dom"` to always return the cell's `HTMLElement`.
 * Pass `"el"` to return the cell's `Ext.dom.Element` . Pass `"cmp"` to
 * return the cell `Ext.Component` reference for this location (if one exists).
 * @return {Ext.grid.cell.Cell} The Cell component referenced by this Location.
 */

/**
 * @method get
 * Returns the {@link Ext.grid.cell.Cell cell} Component referenced *at the time of
 * calling*. Note that grid DOM is recycled, and the cell referenced may be repurposed
 * for use by another record.
 *
 * @return {Ext.grid.cell.Cell} The Cell component referenced by this Location.
 */

/**
 * @method next
 * Navigates to the next visible Location.
 * @param {Boolean/Object} options An options object or a boolean flag meaning wrap
 * @param {Boolean} [options.wrap] `true` to wrap from the last to the first Location.
 * @param {Boolean} [options.move=false] `true` to change this location's position.
 * @returns {Ext.grid.Location} A Location object representing the new location.
 * By default, this will be a new instance. If the `move` option is passed as `true`
 * this instance will be mutated.
 */

/**
 * @method previous
 * Navigates to the previous visible Location.
 * @param {Boolean/Object} options An options object or a boolean flag meaning wrap
 * @param {Boolean} [options.wrap] `true` to wrap from the first to the last Location.
 * @param {Boolean} [options.move=false] `true` to change this location's position.
 * @returns {Ext.grid.Location} A Location object representing the new location.
 * By default, this will be a new instance. If the `move` option is passed as `true`
 * this instance will be mutated.
 */

/**
 * @method down
 * Navigates to the next visible Location.
 * @param {Boolean/Object} options An options object or a boolean flag meaning wrap
 * @param {Boolean} [options.wrap] `true` to wrap from the last to the first Location.
 * @param {Number} [options.column] The column to move to if not the current column.
 * @returns {Ext.dataview.Location} A *new* Location object representing the new location.
 */

/**
 * @method up
 * Navigates to the previous visible Location.
 * @param {Boolean/Object} options An options object or a boolean flag meaning wrap
 * @param {Boolean} [options.wrap] `true` to wrap from the first to the last Location.
 * @param {Number} [options.column] The column to move to if not the current column.
 * @returns {Ext.dataview.Location} A *new* Location object representing the new location.
 */
