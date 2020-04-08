/**
 * @class Ext.dataview.List
 * @extend Ext.dataview.Component
 * @xtype list
 *
 * List is a custom styled DataView which allows Grouping, Indexing, Icons, and a Disclosure.
 *
 *     @example packages=[ext-react]
 *     import React, { Component } from 'react'
 *     import { ExtReact, List } from '@sencha/ext-react-modern';
 *
 *     export default class MyExample extends Component {
 *
 *         store = new Ext.data.Store({
 *             data: [
 *                 {title: 'Item 1'},
 *                 {title: 'Item 2'},
 *                 {title: 'Item 3'},
 *                 {title: 'Item 4'}
 *             ]
 *         });
 *
 *         render() {
 *             return (
 *                 <ExtReact>
 *                     <List
 *                         itemTpl="{title}"
 *                         store={this.store}
 *                     />
 *                 </ExtReact>
 *             )
 *         }
 *     }
 *
 * A more advanced example showing a list of people grouped by last name:
 *
 *     @example packages=[ext-react]
 *     import React, { Component } from 'react'
 *     import { ExtReact, List, Button } from '@sencha/ext-react-modern';
 *
 *     export default class MyExample extends Component {
 *
 *         store = new Ext.data.Store({
 *             data: [{
 *                 firstName: 'Peter',
 *                 lastName: 'Venkman'
 *             }, {
 *                 firstName: 'Raymond',
 *                 lastName: 'Stantz'
 *             }, {
 *                 firstName: 'Egon',
 *                 lastName: 'Spengler'
 *             }, {
 *                 firstName: 'Winston',
 *                 lastName: 'Zeddemore'
 *             }],
 *
 *             sorters: 'lastName',
 *
 *             grouper: {
 *                 groupFn: function(record) {
 *                     return record.get('lastName')[0];
 *                 }
 *             }
 *         });
 *
 *         render() {
 *             return (
 *                 <ExtReact>
 *                     <List
 *                         itemTpl="{firstName} {lastName}"
 *                         store={this.store}
 *                         grouped
 *                     />
 *                 </ExtReact>
 *             )
 *         }
 *     }
 *
 * If you want to dock items to the bottom or top of a List, you can use the scrollDock configuration on child items in this List. The following example adds a button to the bottom of the List.
 *
 *     @example packages=[ext-react]
 *     import React, { Component } from 'react'
 *     import { ExtReact, List, Button } from '@sencha/ext-react-modern';
 *
 *     export default class MyExample extends Component {
 *
 *         store = new Ext.data.Store({
 *             data: [{
 *                 firstName: 'Peter',
 *                 lastName: 'Venkman'
 *             },
 *             {
 *                 firstName: 'Raymond',
 *                 lastName: 'Stantz'
 *             },
 *             {
 *                 firstName: 'Egon',
 *                 lastName: 'Spengler'
 *             },
 *             {
 *                 firstName: 'Winston',
 *                 lastName: 'Zeddemore'
 *             }]
 *         });
 *
 *         render() {
 *             return (
 *                 <ExtReact>
 *                     <List
 *                         itemTpl="{firstName} {lastName}"
 *                         store={this.store}
 *                     >
 *                         <Button
 *                             scrollDock="bottom"
 *                             docked="bottom"
 *                             text="load more..."
 *                         />
 *                     </List>
 *                 </ExtReact>
 *             )
 *         }
 *     }
 */

/**
 * @method onNavigate
 * This method is called by the {@link #cfg!navigationModel} when navigation events are
 * detected within this DataView.
 *
 * It may be overridden to control the linkage of navigation events such as
 * taps, clicks or keystrokes detected by the {@link #cfg!navigationModel} to
 * the {@link #cfg!selectionModel}.
 *
 * `callParent` if you wish selection to proceed from the passed event.
 * @param {Ext.event.Event} e The UI event which caused the navigation.
 */

/**
 * @event disclose
 * @preventable
 * Fires whenever a disclosure is handled
 * @param {Ext.dataview.List} this The List instance
 * @param {Ext.data.Model} record The record associated to the item
 * @param {HTMLElement} target The element disclosed
 * @param {Number} index The index of the item disclosed
 * @param {Ext.EventObject} e The event object
 */

/**
 * @method getItem
 * Gets a list item by record.
 * @param {Ext.data.Model} record The record
 * @return {Ext.dataview.component.(Simple)ListItem} The list item, if found.
 * `null` if no matching item exists.
 */

/**
 * @method getScrollDockedItems
 * Returns all the items that are docked in the scroller in this list.
 * @return {Ext.Component[]} An array of the scrollDock items
 */

/**
 * @method scrollToRecord
 * Scrolls the list so that the specified record is at the top. <-- NO. Scroll *into view*.
 *                                                              === TODO: fix scrollTo API
 * @param {Ext.data.Model} record Record in the store to scroll to.
 * @param {Boolean} [animate=false] Determines if scrolling is animated.
 * @param {Boolean} [overscroll=true] Determines if list can be overscrolled.
 */

/**
 * @cfg {Object} container
 * This config is used to control the internal {@link Ext.Container} created to
 * manage this list's items. One common use for this is to apply a {@link #userCls}
 * to the item container.
 *
 *      {
 *          xtype: 'list',
 *          container: {
 *              userCls: 'mylist-cls'
 *          },
 *          ...
 *      }
 *
 * @accessor
 * @since 6.0.1
 */

/**
 * @cfg {Boolean/Object} [indexBar=false]
 * Set to `true` to render an alphabet IndexBar docked on the right. This can also
 * be a config object for the {@link Ext.dataview.IndexBar IndexBar} component.
 * @accessor
 */

/**
 * @cfg {Boolean} [preventSelectionOnDisclose=true]
 * `true` to prevent the item selection when the user
 * taps a disclose icon.
 * @accessor
 */

/**
 * @cfg {Boolean} [pinHeaders=true]
 * Whether or not to pin headers on top of item groups while scrolling for an iPhone native list experience.
 * @accessor
 */

/**
 * @cfg {Object} pinnedHeader
 * A config object for the pinned header.  Only applicable when {@link #pinHeaders}
 * is `true`.
 */

/**
 * @cfg {Boolean} [grouped=null]
 * Whether or not to group items in the provided Store with a header for each item.
 * @accessor
 */

/**
 * @cfg {String/String[]/Ext.XTemplate} groupHeaderTpl
 * A single string or an array of strings (optionally followed by an
 * object containing template methods) used to create an `Ext.XTemplate`, or an
 * `Ext.XTemplate` instance.
 *
 * A single string:
 *
 *       groupHeaderTpl: 'Group: {name}'
 *
 * Using a string array (followed by an options object):
 *
 *       groupHeaderTpl: [
 *           'Group: ',
 *           '<div>{name:this.formatName}</div>',
 *           {
 *               formatName: function(name) {
 *                   return Ext.String.trim(name);
 *               }
 *           }
 *       ]
 *
 * The data object available to the template provides the following properties:
 *
 *  * `name` The grouping string of the {@link Ext.data.Store#groupField groupField}
 *    for the group header. This string is the string produced by grouper's
 *    {@link Ext.util.Grouper#groupFn groupFn}.
 *  * `value` The value of the {@link Ext.data.Store#groupField groupField}
 *    for the group header being rendered.
 *  * `columnName` The column header associated with the field being grouped
 *    by *if there is a column for the field*, falls back to the `groupField`.
 *  * `groupField` The field name being grouped by.
 *  * `html` The rendering of the `value` as handled by the cell (for a grid,
 *    otherwise the same as `name`).
 *  * `children` An array containing the child records for the group. **This is not
 *    available if the store is a {@link Ext.data.BufferedStore BufferedStore}.**
 *
 * @accessor
 * @since 6.5.0
 */

/**
 * @cfg {Boolean/Function/String/Object} [onItemDisclosure=null]
 * `true` to display a disclosure icon on each list item.
 * The list will still fire the disclose event, and the event can be stopped before itemtap.
 * By setting this config to a function, the function passed will be called when the disclosure
 * is tapped.
 * Finally you can specify an object with a 'scope' and 'handler'
 * property defined. This will also be bound to the tap event listener
 * and is useful when you want to change the scope of the handler.
 * @accessor
 * @controllable
 */

/**
 * @cfg {String} [disclosureProperty='disclosure']
 * A property to check on each record to display the disclosure on a per record basis.  This
 * property must be false to prevent the disclosure from being displayed on the item.
 * @accessor
 */

/**
 * @cfg {Boolean} useComponents
 * @hide
 */

/**
 * @cfg {String} [defaultType=undefined]
 * The xtype used for the component based DataView. Defaults to dataitem.
 * Note this is only used when useComponents is true.
 * @accessor
 */

/**
 * @cfg {Number} [itemHeight=null]
 * This allows you to set the default item height and is used to roughly calculate the amount
 * of items needed to fill the list. By default items are around 50px high.
 * @accessor
 */

/**
 * @cfg {Boolean} [refreshHeightOnUpdate=true]
 * Set this to false if you make many updates to your list (like in an interval), but updates
 * won't affect the item's height. Doing this will increase the performance of these updates.
 * @accessor
 */

/**
 * @cfg {Boolean} [infinite=false]
 * Set this to false to render all items in this list, and render them relatively.
 * Note that this configuration can not be dynamically changed after the list has instantiated.
 * @accessor
 */

/**
 * @cfg {Boolean} [useSimpleItems=true]
 * Set this to true if you just want to have the list create simple items that use the itemTpl.
 * These simple items still support headers, grouping and disclosure functionality but avoid
 * container layouts and deeply nested markup. For many Lists using this configuration will
 * drastically increase the scrolling and render performance.
 * @accessor
 */

/**
 * @cfg {String} [scrollDock=null]
 * The dock position of a list's child items relative to the list itself. Can be `top` or `bottom`.
 *
 *     Ext.create('Ext.List', {
 *          fullscreen: true,
 *          itemTpl: '{firstName}',
 *          data: [
 *              { firstName: 'Peter'},
 *              { firstName: 'Raymond'},
 *              { firstName: 'Egon'},
 *              { firstName: 'Winston'}
 *          ],
 *          items: [{
 *               xtype: 'component',
 *               html: 'Docked!',
 *               docked: 'top'
 *          },{
 *               xtype: 'component',
 *               html: 'Scroll Docked!',
 *               scrollDock: 'top'
 *          }]
 *      });
 *
 * @accessor
 */

/**
 * @cfg {Number} [bufferSize=20]
 * The amount of items we render additionally besides the ones currently visible.
 * We try to prevent the rendering of items while scrolling until the next time you stop scrolling.
 * If you scroll close to the end of the buffer, we start rendering individual items to always
 * have the {@link #minimumBufferSize} prepared.
 * @accessor
 */

/**
 * @cfg {Boolean} [striped=false]
 * Set this to true if you want the items in the list to be zebra striped, alternating their
 * background color.
 * @accessor
 */

/**
 * @cfg {Boolean} [rowLines=null]
 * Set this to `false` to suppress the borders in between the items in this list.
 * By default the presence of borders in between the items is determined by the stylesheet.
 * @accessor
 */

/**
 * @cfg {Ext.dataview.ListCollapser/Object} collapseDefaults
 * This config object supplies default for the `collapsible` config. When that
 * config is simply `true`, this is the complete config object for the group
 * collapser.
 *
 * NOTE: This config cannot be changed after instantiation. Instead, change the
 * `collapsible` config.
 * @since 7.0
 */

 /**
 * @cfg {Object/Ext.dataview.ListItemPlaceholder} groupPlaceholder
 * This config provides defaults for the placeholder items rendered for collapsed
 * groups.
 * @since 7.0
 * @private
 */

 /**
 * @cfg {Object} grouping
 * @private
 * @since 7.0
 */

/**
 * @cfg {Ext.dataview.ListCollapser/Object/Boolean} collapsible
 * This object configures group collapse. It is only applicable when `grouped`.
 * Set to `false` to disable group collapsibility. The default value of `true`
 * uses the `collapseDefaults` config for the final collapser configuration
 * object. If this config is an object, it is merged with `collapseDefaults`
 * giving this object's properties priority over the defaults.
 * @since 7.0
 */

/**
 * @cfg {Object[]} [data=null]
 * An array of records to display. Use in place of {@link #store} when fetching data directly
 * or using static data rather than fetching data with an ExtReact proxy.
 *
 *      <List
 *          data={[
 *              { name: 'Apple', symbol: 'AAPL' },
 *              { name: 'Microsoft', symbol: 'MSFT' },
 *              { name: 'Oracle', symbol: 'ORCL' }
 *          ]}
 *          itemTpl={data => (
 *              <div>
 *                  <div style={{ fontWeight: 'bold' }}>{data.name}</div>
 *                  <div>{data.symbol}</div>
 *              </div>
 *          )}
 *      />
 */

/**
 * @method getItemAt
 * Returns an item at the specified index.
 * @param {Number} index Index of the item.
 * @return {Ext.dom.Element/Ext.dataview.component.DataItem} item Item at the specified index.
 */

/**
 * @method getItemIndex
 * Returns an index for the specified item.
 * @param {Number} item The item to locate.
 * @return {Number} Index for the specified item.
 */

/**
 * @method getViewItems
 * Returns an array of the current items in the DataView.
 * @return {Ext.dom.Element[]/Ext.dataview.component.DataItem[]} Array of Items.
 */
