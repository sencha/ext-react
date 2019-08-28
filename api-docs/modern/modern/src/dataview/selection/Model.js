/**
 * @class Ext.dataview.selection.Model
 * @extend Ext.Evented
 * @alias selmodel.dataview
 * @mixin Ext.mixin.Factoryable
 * Tracks what records are currently selected in a databound widget. This class is used by
 * {@link Ext.view.View dataview} and all subclasses.
 *
 * If a {Ext.data.virtual.Store virtual store} is being used, then record *indices* are stored
 * as the selection, not a collection of records.
 *
 * If selecting records, the selection model {@link #cfg!selected may be configured with} an
 * {@link Ext.util.Collection} to use to store the selected records. This can be useful when
 * other objects need access to the current selection. In particular, ComboBox uses this
 * technique to track which records are selected and form the value of the ComboBox field.
 * @private
 */

/**
 * @event selectionchange
 * Fires when a selection changes.
 * @param {Ext.dataview.DataView} view this DataView
 * @param {Ext.data.Model[]} records The records whose selection has changed.
 * @param {Boolean} selected `true` if the records are now selected, `false` if not.
 * @param {Ext.dataview.selection.Selection} selection An object whicn encapsulates the selection.
 * @member Ext.dataview.DataView
 */

/**
 * @event rowselection
 * Fires when a selection changes and a {@link Ext.data.virtual.Store VirtualStore} is being used.
 * @param {Ext.dataview.DataView} view this DataView
 * @param {Ext.dataview.selection.Rows} selection An object whicn encapsulates the selected row range(s).
 * @member Ext.dataview.DataView
 */

/**
 * @cfg {Boolean} disabled
 * Set to `true` to disable selection.
 * This configuration will lock the selection model that the DataView uses.
 * @accessor
 */

/**
 * @cfg {'single'/'simple'/'multi'} [mode='single']
 * Modes of selection.
 * @accessor
 */

/**
 * @cfg {Boolean} [deselectable=true]
 * Allow users to deselect the last selected *record* in a DataView and reduce the selected
 * *record* count to zero. Configure this as `false` if there must always be at least one
 * record selected.
 * @accessor
 */

 /**
  * @cfg {Boolean} toggleOnClick
  * `true` to toggle the selection state of an item when clicked.
  * Only applicable when the {@link #mode} is 'single'.
  * Only applicable when the {@link #deselectable} is 'true'.
  */

/**
 * @cfg {Ext.data.Model} lastSelected
 * @private
 * @accessor
 * @member Ext.dataview.DataView
 */

/**
 * @method getSelectedRecords
 * Returns the selected records only if this selection model is configured to select records
 * as opposed to record *indices*.
 * @return {Ext.data.Model[]} The selected records.
 */

/**
 * @method selectAll
 * Selects all records.
 * @param {Boolean} suppressEvent `true` to suppress all select events.
 */

/**
 * @method deselectAll
 * Deselects all records.
 */

/**
 * @method selectRange
 * Selects a range of rows if the selection model if not {@link #cfg!disabled}.
 * All rows in between `startRecord` and `endRecord` are also selected.
 * @param {Number} startRecord The index of the first row in the range.
 * @param {Number} endRecord The index of the last row in the range.
 * @param {Boolean} [keepExisting] `true` to retain existing selections.
 */

/**
 * @method select
 * Adds the given records to the currently selected set if not {@link #cfg!disabled}..
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
 * @method getSelections
 * Returns the currently selected records *if this selection model is selecting records*..
 * @return {Ext.data.Model[]} The selected records.
 */

/**
 * @method isRowSelected
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
