/**
 * @class Ext.mixin.Selectable
 * @extend Ext.Mixin
 * Tracks what records are currently selected in a databound widget. This class is mixed in to
 * {@link Ext.view.View dataview} and all subclasses.
 * @private
 */

/**
 * @event selectionchange
 * Fires when a selection changes.
 * @param {Ext.mixin.Selectable} this
 * @param {Ext.data.Model[]} records The records whose selection has changed.
 */
/**
 * @cfg {Boolean} [disableSelection=null]
 * Set to `true` to disable selection.
 * This configuration will lock the selection model that the DataView uses.
 * @accessor
 */

/**
 * @cfg {'SINGLE'/'SIMPLE'/'MULTI'} [mode='SINGLE']
 * Modes of selection.
 * @accessor
 */

/**
 * @cfg {Boolean} [allowDeselect=false]
 * Allow users to deselect a record in a DataView, List or Grid. Only applicable when
 * the Selectable's `mode` is `'SINGLE'`.
 * @accessor
 */

/**
 * @cfg {Boolean} [deselectOnContainerClick=true]
 * Set to `true` to deselect current selection when the container body is clicked.
 * @accessor
 */

/**
 * @cfg {Boolean} [pruneRemoved=true]
 * Remove records from the selection when they are removed from the store.
 *
 * **Important:** When using {@link Ext.toolbar.Paging paging} or a {@link Ext.data.BufferedStore},
 * records which are cached in the Store's {@link Ext.data.Store#property-data data collection} may be removed from the Store when pages change,
 * or when rows are scrolled out of view. For this reason `pruneRemoved` should be set to `false` when using a buffered Store.
 *
 * Also, when previously pruned pages are returned to the cache, the records objects in the page will be
 * *new instances*, and will not match the instances in the selection model's collection. For this reason,
 * you MUST ensure that the Model definition's {@link Ext.data.Model#idProperty idProperty} references a unique
 * key because in this situation, records in the Store have their **IDs** compared to records in the SelectionModel
 * in order to re-select a record which is scrolled back into view.
 * @accessor
 */

/**
 * @cfg {Ext.data.Model} [selection=null]
 * The selected record.
 * @accessor
 */

/**
 * @method selectAll
 * Selects all records.
 * @param {Boolean} silent `true` to suppress all select events.
 */

/**
 * @method deselectAll
 * Deselects all records.
 */

/**
 * @method selectRange
 * Selects a range of rows if the selection model {@link Ext.mixin.Selectable#getDisableSelection} is not locked.
 * All rows in between `startRecord` and `endRecord` are also selected.
 * @param {Number} startRecord The index of the first row in the range.
 * @param {Number} endRecord The index of the last row in the range.
 * @param {Boolean} [keepExisting] `true` to retain existing selections.
 */

/**
 * @method select
 * Adds the given records to the currently selected set.
 * @param {Ext.data.Model/Array/Number} records The records to select.
 * @param {Boolean} keepExisting If `true`, the existing selection will be added to (if not, the old selection is replaced).
 * @param {Boolean} suppressEvent If `true`, the `select` event will not be fired.
 */

/**
 * @method deselect
 * Deselects the given record(s). If many records are currently selected, it will only deselect those you pass in.
 * @param {Number/Array/Ext.data.Model} records The record(s) to deselect. Can also be a number to reference by index.
 * @param {Boolean} suppressEvent If `true` the `deselect` event will not be fired.
 */

/**
 * @method updateLastFocused
 * Sets a record as the last focused record. This does NOT mean
 * that the record has been selected.
 * @param {Ext.data.Record} newRecord
 * @param {Ext.data.Record} oldRecord
 */

/**
 * @method getSelection
 * Returns the currently selected records.
 * @return {Ext.data.Model[]} The selected records.
 */

/**
 * @method isSelected
 * Returns `true` if the specified row is selected.
 * @param {Ext.data.Model/Number} record The record or index of the record to check.
 * @return {Boolean}
 */

/**
 * @method hasSelection
 * Returns `true` if there is a selected record.
 * @return {Boolean}
 */

/**
 * @method getSelectionCount
 * Returns the number of selections.
 * @return {Number}
 */
