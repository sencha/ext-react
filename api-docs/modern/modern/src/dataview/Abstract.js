/**
 * @class Ext.dataview.Abstract
 * @extend Ext.Container
 * @mixin Ext.mixin.ConfigProxy
 * @mixin Ext.mixin.ItemRippler
 * @private
 * @since 6.5.0
 */

/**
 * @property {Boolean} [isDataView=true]
 * `true` to identify an object as an instantiated DataView, or subclass thereof.
 */

/**
 * @event select
 * Fires whenever an item is selected
 * @param {Ext.dataview.DataView} this
 * @param {Ext.data.Model[]} records The records being selected
 */

/**
 * @event deselect
 * Fires whenever an item is deselected
 * @param {Ext.dataview.DataView} this
 * @param {Ext.data.Model[]} records The records being deselected
 */

/**
 * @event refresh
 * @preventable
 * Fires whenever the DataView is refreshed
 * @param {Ext.dataview.DataView} this
 */

/**
 * @event navigate
 * Fires whenever the user navigates to a new location.
 *
 * In regular dataviews, a location encapsulates one view item, and its associated record.
 *
 * In grids, a location encapsulates one cell, and its associated data field.
 *
 * @param {Ext.dataview.DataView} this
 * @param {Ext.dataview.Location} to The location navigated to.
 * @param {Ext.dataview.Location} from The location where navigation came from.
 */

/**
 * @hide
 * @event add
 */

/**
 * @hide
 * @event remove
 */

/**
 * @hide
 * @event move
 */

/**
 * @cfg {Boolean/Object} [associatedData=true]
 * Set this config to `false` to limit rendering data to just the record's data
 * or to an object to describe the desired associated data. This data is used to
 * satisfy the `itemTpl`. The default of `true` will gather all associated data
 * that is currently loaded. This can be expensive. If only a small amount of the
 * available data is needed, this config can speed up the rendering process.
 *
 * For example, if an `OrderItem` needs the `Item` data but not its parent `Order`,
 * this config can be set like so:
 *
 *      associatedData: {
 *          item: true
 *      }
 *
 * Given the above, only the `item` association (to the `Item` record) will be
 * gathered into the render data.
 *
 * For more details, see {@link Ext.data.Model#getData getData}.
 * @since 6.5.0
 */

/**
 * @cfg {Boolean} [deferEmptyText=true]
 * Set to `false` to not defer `emptyText` being applied until the store's first
 * load.
 */

/**
 * @cfg {Boolean} [deselectOnContainerClick=true]
 * When set to true, tapping on the DataView's background (i.e. not on
 * an item in the DataView) will deselect any currently selected items.
 */

/**
 * @cfg {Boolean} [disableSelection=false]
 * Set to `true` to disable selection styling. This only affects the presentation
 * of the selection not the internal selection state.
 */

/**
 * @cfg {Object/Ext.Component} emptyTextDefaults
 * This component config object is used to create the `emptyText` component.
 * @since 6.5.0
 */

/**
 * @cfg {String} [emptyItemText='\xA0']
 * The text to render when the rendering of the item via `itemTpl` produces no text.
 */

/**
 * @cfg {Boolean} [itemsFocusable=true]
 * For use by subclasses, not applications.
 *
 * By default the dataview items are focusable, and navigable using an
 * {@link Ext.dataview.NavigationModel}.
 *
 * {@link Ext.grid.Grid grids} set this to false to make rows non-focusable in
 * favour of cells.
 * @private
 */

/**
 * @cfg {Function/String/String[]/} [itemTpl='<div>{text:htmlEncode}</div>]
 * The `tpl` to use for each of the items displayed in this DataView. This template
 * produces HTML and can use the follow CSS class names to influence the response
 * to tapping/clicking child elements:
 *
 *  - `x-no-ripple` - Disables `itemRipple` (primarily for theme-material)
 *  - `x-item-no-select` - Disables item selection
 *  - `x-item-no-tap` - Disables all click or tap processing
 *
 * For example:
 *
 *      itemTpl: '<div>' +
 *                   '...' +
 *                   '<div class="x-item-no-select x-fa fa-gear"></div>' +
 *                   '...' +
 *               '</div>'
 *
 * Because this template produces HTML from record data it can expose applications
 * to security issues if user-provided data is not properly encoded. For example,
 * in previous releases this template was:
 *
 *      itemTpl: '<div>{text}</div>'
 *
 * If the 'text' field contained HTML scripts, these would be evaluated into
 * the application. The `itemTpl` in version 6.5 is now:
 *
 *      itemTpl: '<div>{text:htmlEncode}</div>'
 */

/**
 * @cfg {String/Boolean} [loadingText='Loading...']
 * A string to display during data load operations. This text will be displayed
 * in a loading div and the view's contents will be cleared while loading,
 * otherwise the view's contents will continue to display normally until the new
 * data is loaded and the contents are replaced.
 * @locale
 */

/**
 * @cfg {Number} [pressedDelay=100]
 * The amount of delay between the `tapstart` and adding the `pressedCls`.
 */

/**
 * @cfg {Boolean} [scrollToTopOnRefresh=true]
 * Scroll the DataView to the top when the DataView is refreshed.
 * @accessor
 */

/**
 * @cfg {'childtap'/'childsingletap'/'childdoubletap'/'childswipe'/'childtaphold'/'childlongpress'} [triggerEvent="childtap"]
 * Determines what type of touch event causes an item to be selected.
 */

/**
 * @cfg {'tap'/'singletap'} [triggerCtEvent=tap]
 * Determines what type of touch event is recognized as a touch on the container.
 */

/**
 * @cfg data
 * @inheritdoc
 * @accessor
 */

/**
 * @cfg {String/Boolean} emptyText
 * The text to display in the view when there is no data to display.
 * Set this to `true` to display the default message.
 * @accessor
 */

/**
 * @cfg {Boolean/Object} inline
 * When set to `true` the items within the DataView will have their display set to
 * inline-block and be arranged horizontally. By default the items will wrap to
 * the width of the DataView. Passing an object with `{ wrap: false }` will turn
 * off this wrapping behavior and overflowed items will need to be scrolled to
 * horizontally.
 * @accessor
 */

/**
 * @cfg {String} itemCls
 * An additional CSS class to apply to items within the DataView.
 * @accessor
 */

/**
 * @cfg {Number} [loadingHeight]
 * If specified, gives an explicit height for a {@link #cfg!floated} data view
 * when it is showing the {@link #loadingText}, if that is specified. This is
 * useful to prevent the view's height from collapsing to zero when the loading
 * mask is applied and there are no other contents in the data view.
 * @accessor
 */

/**
 * @cfg {Object} [selectable=true]
 * A configuration object which allows passing of configuration options to create or
 * reconfigure a {@link Ext.dataview.selection.Model selection model}.
 *
 * May contain the following options:
 *
 *     - mode `'single'`, '`simple'` or `'multi'` Simple and Multi are similar in that
 *     click toggle selection. Multi allows SHIFT+click and CTRL+click. Single simply
 *     toggles an item between selected and unselected (unless `deselectable` is set to `false`)
 *     - deselectable Configure as false to disallow deselecting down to zero selections.
 *
 * @accessor
 */

/**
 * @cfg {Boolean} [enableTextSelection=false]
 * True to enable text selection inside this view.
 * @accessor
 */

/**
 * @cfg {Ext.data.Store/Object} store (required)
 * Can be either a Store instance or a configuration object that will be turned
 * into a Store. The Store is used to populate the set of items that will be
 * rendered in the DataView. See the DataView intro documentation for more
 * information about the relationship between Store and DataView.
 */

/**
 * @cfg {'start'/'emd'} scrollDock
 * This property is placed on the _child items_ added to this container. The value
 * placed on the child items determines the position of that item with respect to
 * the data items.
 *
 *      Ext.Viewport.add({
 *          xtype: 'dataview',
 *          itemTpl: '{firstName}',
 *          data: [
 *              { firstName: 'Peter'},
 *              { firstName: 'Raymond'},
 *              { firstName: 'Egon'},
 *              { firstName: 'Winston'}
 *          ],
 *          items: [{
 *               xtype: 'component',
 *               html: 'Always At End!',
 *               scrollDock: 'end'
 *          }]
 *      });
 *
 * Note, a value of `'top'` is equivalent to `'start'` while `'bottom'` is
 * equivalent to `'end'`. The `'top'` and `'bottom'` values originated from the
 * `Ext.dataview.List` class.
 */

/**
 * @cfg {String} [emptyTextProperty="html"]
 * The config to set on the `emptyText` component to contain the desired text.
 * @since 6.5.0
 */

/**
 * @property {Boolean} [restoreFocus=true]
 * By default, using the TAB key to *re*enter a grid restores focus to the cell which was last focused.
 *
 * Setting this to `false` means that `TAB` from above focuses the first *rendered* cell
 * and `TAB` from below focuses the last *rendered* cell.
 *
 * Be aware that due to buffered rendering, the last row of a 1,000,000 row grid may not
 * be available to receive immediate focus.
 */

/**
 * @cfg [scrollable=true]
 * @inheritdoc
 */

/**
 * @method ensureVisible
 * Scrolls the specified record into view.
 *
 * @param {Number/Ext.data.Model} [record] The record or the 0-based position
 * to which to scroll. If this parameter is not passed, the `options` argument must
 * be passed and contain either `record` or `recordIndex`.
 *
 * @param {Object} [options] An object containing options to modify the operation.
 *
 * @param {Boolean} [options.animation] Pass `true` to animate the row into view.
 *
 * @param {Boolean} [options.focus] Pass as `true` to focus the specified row.
 *
 * @param {Boolean} [options.highlight] Pass `true` to highlight the row with a glow
 * animation when it is in view.
 *
 * @param {Ext.data.Model} [options.record] The record to which to scroll.
 *
 * @param {Number} [options.recordIndex] The 0-based position to which to scroll.
 *
 * @param {Boolean} [options.select] Pass as `true` to select the specified row.
 */

/**
 * @method getItemAt
 * Returns an item at the specified view `index`. This may return items that do not
 * correspond to a {@link Ext.data.Model record} in the store if such items have been
 * added to this container.
 *
 * Negative numbers are treated as relative to the end such that `-1` is the last
 * item, `-2` is the next-to-last and so on.
 *
 * The `mapToItem` method recommended over this method as it is more flexible and can
 * also handle a {@link Ext.data.Model record} as the parameter. To handle store
 * index values, use `mapToViewIndex`:
 *
 *      item = view.mapToItem(view.mapToViewIndex(storeIndex));
 *
 * @param {Number} index The index of the item in the view.
 * @return {HTMLElement/Ext.Component}
 */

/**
 * @method getScrollDockedItems
 * Returns all the items that are docked at the ends of the items.
 * @param {'start'/'end'} which The set of desired `scrollDock` items.
 * @return {Ext.Component[]} An array of the `scrollDock` items.
 */

/**
 * Returns an array of the current items in the DataView. Depends on the {@link #cfg-useComponents}
 * configuration.
 * @return {HTMLElement[]/Ext.dataview.DataItem[]} The items.
 * @method getViewItems
 */

/**
 * @method mapToItem
 * Converts the given `indexOrRecord` to an "item".
 *
 * An "item" can be either an `Ext.dom.Element` or an `Ext.Component` depending on the
 * type of dataview. For convenience the `as` parameter can be used to convert the
 * returned item to a common type such as `Ext.dom.Element` or `HTMLElement`.
 *
 * Be aware that the `Ext.List` subclass can optionally render only some records, in
 * which case not all records will have an associated item in the view and this method
 * will return `null`.
 *
 * An index value is a view index. These will only match the record's index in the
 * `store` when no extra items are added to this dataview (so called "non-record"
 * items). These are often unaligned in `Ext.List` due to group headers as well as
 * `infinite` mode where not all records are rendered into the view at one time.
 *
 * Negative index values are treated as relative to the end such that `-1` is the last
 * item, `-2` is the next-to-last and so on.
 *
 * For example:
 *
 *      // Add "foo" class to the last item in the view
 *      view.mapToItem(-1, 'el').addCls('foo');
 *
 *      // Add "foo" class to the last data item in the view
 *      view.mapToItem(view.getStore().last(), 'el').addCls('foo');
 *
 * To handle a record's index in the `store`:
 *
 *      item = view.mapToItem(view.mapToViewIndex(storeIndex));
 *
 * @param {Number/Ext.data.Model/Ext.event.Event} value The event, view index or
 * {@link Ext.data.Model record}.
 *
 * @param {"dom"/"el"} [as] Pass `"dom"` to always return an `HTMLElement` for the item.
 * For component dataviews this is the component's main element. Pass `"el"` to return
 * the `Ext.dom.Element` form of the item. For component dataviews this will be the
 * component's main element. For other dataviews the returned instance is produced by
 * {@link Ext#fly Ext.fly()} and should not be retained.
 *
 * @return {HTMLElement/Ext.dom.Element/Ext.Component}
 * @since 6.5.0
 */

/**
 * @method mapToRecord
 * Converts the given parameter to a {@link Ext.data.Model record}. Not all items
 * in a dataview correspond to records (such as group headers in `Ext.List`). In these
 * cases `null` is returned.
 *
 * An "item" can be simply an element or a component depending on the type of dataview.
 *
 * An index value is a view index. These will only match the record's index in the
 * `store` when no extra items are added to this dataview (so called "non-record"
 * items). These are often unaligned in `Ext.List` due to group headers as well as
 * `infinite` mode where not all records are rendered into the view at one time.
 *
 * Negative index values are treated as relative to the end such that `-1` is the last
 * item, `-2` is the next-to-last and so on.
 *
 * @param {Ext.event.Event/Number/HTMLElement/Ext.dom.Element/Ext.Component} value
 * @return {Ext.data.Model} The associated record or `null` if there is none.
 * @since 6.5.0
 */

/**
 * @method mapToRecordIndex
 * Converts the given parameter to the record's index in the `store`. Not all items
 * in a dataview correspond to records (such as group headers in `Ext.List`). In these
 * cases `-1` is returned.
 *
 * An "item" can be simply an element or a component depending on the type of dataview.
 *
 * An input index value is a view index. These will only match the record's index in
 * the `store` when no extra items are added to this dataview (so called "non-record"
 * items). These are often unaligned in `Ext.List` due to group headers as well as
 * `infinite` mode where not all records are rendered into the view at one time.
 *
 * Negative index values are treated as relative to the end such that `-1` is the last
 * item, `-2` is the next-to-last and so on.
 *
 * @param {Ext.event.Event/Number/HTMLElement/Ext.dom.Element/Ext.Component/Ext.data.Model} value
 * @return {Number} The record's index in the store or -1 if not found.
 * @since 6.5.0
 */

/**
 * @method mapToViewIndex
 * Converts the given parameter to the equivalent record index in the `store`.
 *
 * In this method alone, the index parameter is a *store index* not a *view index*.
 *
 * Be aware that the `Ext.List` subclass can optionally render only some records, in
 * which case not all records will have an associated item in the view and this method
 * will return `-1`.
 *
 * Negative index values are treated as relative to the end such that `-1` is the last
 * record, `-2` is the next-to-last and so on.
 *
 * An "item" can be simply an element or a component depending on the type of dataview.
 *
 * The view index will only match the record's index in the `store` when no extra
 * items are added to this dataview (so called "non-record" items). These are often
 * unaligned in `Ext.List` due to group headers as well as `infinite` mode where not
 * all records are rendered into the view at one time.
 *
 * @param {Ext.event.Event/Number/HTMLElement/Ext.dom.Element/Ext.Component/Ext.data.Model} value
 * @param {Number} [indexOffset] (private) This is passed by an infinite list.
 * @return {Number} The view index or -1 if not found.
 * @since 6.5.0
 */

/**
 * @method nextItem
 * Returns the item following the passed `item` in the view. For `infinite` lists, this
 * traversal can encounter unrendered records. In this case, the record index of the
 * unrendered record is returned.
 *
 * If `as` is specified, the item is converted to the desired form, if possible. If
 * that conversion cannot be performed, `null` is returned.
 *
 * @param {Ext.dom.Element/Ext.Component} item The item from which to navigate.
 *
 * @param {"cmp"/"dom"/"el"} [as] Pass `"dom"` to always return an `HTMLElement` for
 * the item. For component dataviews this is the component's main element. Pass `"el"`
 * to return the `Ext.dom.Element` form of the item. For component dataviews this will
 * be the component's main element. For other dataviews the returned instance is
 * produced by {@link Ext#fly Ext.fly()} and should not be retained. Pass `"cmp"` to
 * return the `Ext.Component` reference for the item (if one exists).
 *
 * @return {Number/HTMLElement/Ext.dom.Element/Ext.Component}
 */

/**
 * @method previousItem
 * Returns the item preceding the passed `item` in the view. For `infinite` lists, this
 * traversal can encounter unrendered records. In this case, the record index of the
 * unrendered record is returned.
 *
 * If `as` is specified, the item is converted to the desired form, if possible. If
 * that conversion cannot be performed, `null` is returned.
 *
 * @param {Ext.dom.Element/Ext.Component} item The item from which to navigate.
 *
 * @param {"cmp"/"dom"/"el"} [as] Pass `"dom"` to always return an `HTMLElement` for
 * the item. For component dataviews this is the component's main element. Pass `"el"`
 * to return the `Ext.dom.Element` form of the item. For component dataviews this will
 * be the component's main element. For other dataviews the returned instance is
 * produced by {@link Ext#fly Ext.fly()} and should not be retained. Pass `"cmp"` to
 * return the `Ext.Component` reference for the item (if one exists).
 *
 * @return {Number/HTMLElement/Ext.dom.Element/Ext.Component}
 */

/**
 * @method prepareData
 * Function which can be overridden to provide custom formatting for each Record that is used
 * by this DataView's {@link #tpl template} to render each node.
 * @param {Object/Object[]} data The raw data object that was used to create the Record.
 * @param {Number} index the index number of the Record being prepared for rendering.
 * @param {Ext.data.Model} record The Record being prepared for rendering.
 * @return {Array/Object} The formatted data in a format expected by the internal
 * {@link #tpl template}'s `overwrite()` method.
 * (either an array if your params are numeric (i.e. `{0}`) or an object (i.e. `{foo: 'bar'}`))
 */

/**
 * @method refresh
 * Refreshes the view by reloading the data from the store and re-rendering the template.
 */
