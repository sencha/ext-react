/**
 * @class Ext.dataview.DataView
 * @extend Ext.Container
 * @xtype dataview
 *
 * DataView makes it easy to create lots of components dynamically, usually based off a {@link Ext.data.Store Store}.
 * It's great for rendering lots of data from your server backend or any other data source and is what powers
 * components like {@link Ext.List}.
 *
 * Use DataView whenever you want to show sets of the same component many times, for examples in apps like these:
 *
 * - List of messages in an email app
 * - Showing latest news/tweets
 * - Tiled set of albums in an HTML5 music player
 *
 * # Creating a Simple DataView
 *
 * At its simplest, a DataView is just a Store full of data and a simple template that we
 * use to render each item:
 *
 *     @example packages=[ext-react]
 *     import React, { Component } from 'react'
 *     import { ExtReact, DataView } from '@sencha/ext-react-modern';
 *
 *     export default class MyExample extends Component {
 *
 *         store = new Ext.data.Store({
 *             data: [
 *                  {name: 'Peter', age: 26},
 *                  {name: 'Ray', age: 21},
 *                  {name: 'Egon', age: 29},
 *                  {name: 'Winston', age: 24},
 *             ]
 *         });
 *
 *         render() {
 *             return (
 *                 <ExtReact>
 *                     <DataView
 *                         itemTpl="{name} is {age} years old"
 *                         store={this.store}
 *                     />
 *                 </ExtReact>
 *             )
 *         }
 *     }
 *
 *
 * Here we just defined everything inline so it's all local with nothing being loaded from a server. For each of the
 * data items defined in our Store, DataView will render a {@link Ext.Component Component} and pass in the name and age
 * data. The component will use the tpl we provided above, rendering the data in the curly bracket placeholders we
 * provided.
 *
 * Because DataView is integrated with Store, any changes to the Store are immediately reflected on the screen. For
 * example, if we add a new record to the Store it will be rendered into our DataView:
 *
 *     this.store().add({
 *         name: 'Gozer',
 *         age: 567
 *     });
 *
 * We didn't have to manually update the DataView, it's just automatically updated. The same happens if we modify one
 * of the existing records in the Store:
 *
 *     this.store.getAt(0).set('age', 42);
 *
 * This will get the first record in the Store (Peter), change the age to 42 and automatically update what's on the
 * screen.
 *
 *     this.store.add({
 *         name: 'Gozer',
 *         age: 21
 *     });
 *
 *     this.store.getAt(0).set('age', 42);
 *
 * # Loading data from a server
 *
 * We often want to load data from our server or some other web service so that we don't have to hard code it all
 * locally. Let's say we want to load some horror movies from Rotten Tomatoes into a DataView, and for each one
 * render the cover image and title. To do this all we have to do is grab an api key from
 * rotten tomatoes (http://developer.rottentomatoes.com/) and modify the {@link #store}
 * and {@link #itemTpl} a little:
 *
 *     @example packages=[ext-react]
 *     import React, { Component } from 'react'
 *     import { ExtReact, DataView } from '@sencha/ext-react-modern';
 *
 *     export default class MyExample extends Component {
 *
 *         store = new Ext.data.Store({
 *              autoLoad: true,
 *              proxy: {
 *                  type: 'jsonp',
 *                  url: 'https://itunes.apple.com/search?term=Pink+Floyd&entity=album',
 *                  reader: {
 *                      type: 'json',
 *                      rootProperty: 'results'
 *                 }
 *              }
 *         });
 *
 *         render() {
 *             return (
 *                 <ExtReact>
 *                     <DataView
 *                         itemTpl="<h2>{collectionName}</h2><p><img src='{artworkUrl100}' /></p>"
 *                         store={this.store}
 *                         />
 *                 </ExtReact>
 *             )
 *         }
 *     }
 *
 * The Store no longer has hard coded data, instead we've provided a {@link Ext.data.proxy.Proxy Proxy}, which fetches
 * the data for us. In this case we used a JSON-P proxy.
 */

/**
 * @method prepareData
 * Function which can be overridden to provide custom formatting for each Record that is used by this
 * DataView's {@link #tpl template} to render each node.
 * @param {Object/Object[]} data The raw data object that was used to create the Record.
 * @param {Number} index the index number of the Record being prepared for rendering.
 * @param {Ext.data.Model} record The Record being prepared for rendering.
 * @return {Array/Object} The formatted data in a format expected by the internal {@link #tpl template}'s `overwrite()` method.
 * (either an array if your params are numeric (i.e. `{0}`) or an object (i.e. `{foo: 'bar'}`))
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
 * @method refresh
 * Refreshes the view by reloading the data from the store and re-rendering
 * the template.
 */

/**
 * @method getItemAt
 * Returns an item at the specified index.
 * @param {Number} index Index of the item.
 * @return {HTMLElement/Ext.dataview.component.DataItem} item Item at the specified index.
 */

/**
 * @method getItemIndex
 * Returns an index for the specified item.
 * @param {Ext.dom.Element/HTMLElement/Ext.dataview.component.DataItem} item The item to locate.
 * @return {Number} Index for the specified item.
 */

/**
 * @method getViewItems
 * Returns an array of the current items in the DataView. Depends on the {@link #cfg-useComponents}
 * configuration.
 * @return {HTMLElement[]/Ext.dataview.component.DataItem[]} The items.
 */

/**
 * @property {Boolean} [isDataView=true]
 * `true` in this class to identify an object as an instantiated DataView, or subclass thereof.
 */

/**
 * @event itemtouchstart
 * Fires whenever an item is touched
 * @param {Ext.dataview.DataView} this
 * @param {Number} index The index of the item touched
 * @param {Ext.Element/Ext.dataview.component.DataItem} target The element or DataItem touched
 * @param {Ext.data.Model} record The record associated to the item
 * @param {Ext.event.Event} e The event object
 */

/**
 * @event itemtouchmove
 * Fires whenever an item is moved
 * @param {Ext.dataview.DataView} this
 * @param {Number} index The index of the item moved
 * @param {Ext.Element/Ext.dataview.component.DataItem} target The element or DataItem moved
 * @param {Ext.data.Model} record The record associated to the item
 * @param {Ext.event.Event} e The event object
 */

/**
 * @event itemtouchend
 * Fires whenever an item is touched
 * @param {Ext.dataview.DataView} this
 * @param {Number} index The index of the item touched
 * @param {Ext.Element/Ext.dataview.component.DataItem} target The element or DataItem touched
 * @param {Ext.data.Model} record The record associated to the item
 * @param {Ext.event.Event} e The event object
 */

/**
 * @event itemtouchcancel
 * Fires whenever an item touch is cancelled
 * @param {Ext.dataview.DataView} this
 * @param {Number} index The index of the item touched
 * @param {Ext.Element/Ext.dataview.component.DataItem} target The element or DataItem touched
 * @param {Ext.data.Model} record The record associated to the item
 * @param {Ext.event.Event} e The event object
 */

/**
 * @event itemtap
 * Fires whenever an item is tapped
 * @param {Ext.dataview.DataView} this
 * @param {Number} index The index of the item tapped
 * @param {Ext.Element/Ext.dataview.component.DataItem} target The element or DataItem tapped
 * @param {Ext.data.Model} record The record associated to the item
 * @param {Ext.event.Event} e The event object
 */

/**
 * @event itemlongpress
 * Fires whenever an item's longpress event fires
 * @param {Ext.dataview.DataView} this
 * @param {Number} index The index of the item touched
 * @param {Ext.Element/Ext.dataview.component.DataItem} target The element or DataItem touched
 * @param {Ext.data.Model} record The record associated to the item
 * @param {Ext.event.Event} e The event object
 */

/**
 * @event itemtaphold
 * Fires whenever an item's taphold event fires
 * @param {Ext.dataview.DataView} this
 * @param {Number} index The index of the item touched
 * @param {Ext.Element/Ext.dataview.component.DataItem} target The element or DataItem touched
 * @param {Ext.data.Model} record The record associated to the item
 * @param {Ext.event.Event} e The event object
 */

/**
 * @event itemsingletap
 * Fires whenever an item is singletapped
 * @param {Ext.dataview.DataView} this
 * @param {Number} index The index of the item singletapped
 * @param {Ext.Element/Ext.dataview.component.DataItem} target The element or DataItem singletapped
 * @param {Ext.data.Model} record The record associated to the item
 * @param {Ext.event.Event} e The event object
 */

/**
 * @event itemdoubletap
 * Fires whenever an item is doubletapped
 * @param {Ext.dataview.DataView} this
 * @param {Number} index The index of the item doubletapped
 * @param {Ext.Element/Ext.dataview.component.DataItem} target The element or DataItem doubletapped
 * @param {Ext.data.Model} record The record associated to the item
 * @param {Ext.event.Event} e The event object
 */

/**
 * @event itemswipe
 * Fires whenever an item is swiped
 * @param {Ext.dataview.DataView} this
 * @param {Number} index The index of the item swiped
 * @param {Ext.Element/Ext.dataview.component.DataItem} target The element or DataItem swiped
 * @param {Ext.data.Model} record The record associated to the item
 * @param {Ext.event.Event} e The event object
 */

/**
 * @event itemmouseenter
 * Fires whenever the mouse pointer moves over an item
 * @param {Ext.dataview.DataView} this
 * @param {Number} index The index of the item
 * @param {Ext.Element/Ext.dataview.component.DataItem} target The element or DataItem
 * @param {Ext.data.Model} record The record associated to the item
 * @param {Ext.event.Event} e The event object
 */

/**
 * @event itemmouseleave
 * Fires whenever the mouse pointer leaves an item
 * @param {Ext.dataview.DataView} this
 * @param {Number} index The index of the item
 * @param {Ext.Element/Ext.dataview.component.DataItem} target The element or DataItem
 * @param {Ext.data.Model} record The record associated to the item
 * @param {Ext.event.Event} e The event object
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
 * @param {Boolean} supressed Flag to suppress the event
 */

/**
 * @event refresh
 * @preventable
 * Fires whenever the DataView is refreshed
 * @param {Ext.dataview.DataView} this
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
 * @cfg {Ext.data.Store/Object} [store=null] (required)
 * Can be either a Store instance or a configuration object that will be turned into a Store. The Store is used
 * to populate the set of items that will be rendered in the DataView. See the DataView intro documentation for
 * more information about the relationship between Store and DataView.
 * @accessor
 */

/**
 * @cfg [data=null]
 * @inheritdoc
 * @accessor
 */

/**
 * @cfg {String} [emptyText=null]
 * The text to display in the view when there is no data to display
 * @accessor
 */

/**
 * @cfg {Boolean} [deferEmptyText=true]
 * `true` to defer `emptyText` being applied until the store's first load.
 * @accessor
 */

/**
 * @cfg {String/String[]/Ext.XTemplate} [itemTpl='<div>{text}</div>']
 * The `tpl` to use for each of the items displayed in this DataView.
 * @accessor
 */

/**
 * @cfg {String} [itemCls=null]
 * An additional CSS class to apply to items within the DataView.
 * @accessor
 */

/**
 * @cfg {String} [triggerEvent='itemtap']
 * Determines what type of touch event causes an item to be selected.
 * Valid options are: 'itemtap', 'itemsingletap',
 * 'itemdoubletap', 'itemswipe', 'itemtaphold', 'itemlongpress'.
 * @accessor
 */

/**
 * @cfg {String} [triggerCtEvent='tap']
 * Determines what type of touch event is recognized as a touch on the container.
 * Valid options are 'tap' and 'singletap'.
 * @accessor
 */

/**
 * @cfg {Boolean} [deselectOnContainerClick=true]
 * When set to true, tapping on the DataView's background (i.e. not on
 * an item in the DataView) will deselect any currently selected items.
 * @accessor
 */

/**
 * @cfg [scrollable=true]
 * @inheritdoc
 * @accessor
 */

/**
 * @cfg {Boolean/Object} [inline=null]
 * When set to `true` the items within the DataView will have their display set to inline-block
 * and be arranged horizontally. By default the items will wrap to the width of the DataView.
 * Passing an object with `{ wrap: false }` will turn off this wrapping behavior and overflowed
 * items will need to be scrolled to horizontally.
 * @accessor
 */

/**
 * @cfg {Number} [pressedDelay=100]
 * The amount of delay between the `tapstart` and the moment we add the `pressedCls`.
 * @accessor
 */

/**
 * @cfg {String/Boolean} [loadingText='Loading...']
 * A string to display during data load operations.  If specified, this text will be
 * displayed in a loading div and the view's contents will be cleared while loading, otherwise the view's
 * contents will continue to display normally until the new data is loaded and the contents are replaced.
 */

/**
 * @cfg {Boolean} [useComponents=null]
 * Flag the use a component based DataView implementation.  This allows the full use of components in the
 * DataView at the cost of some performance.
 *
 * @accessor
 */

/**
 * @cfg {Object} [itemConfig=null]
 * A configuration object that is passed to every item created by a component based DataView. Because each
 * item that a DataView renders is a Component, we can pass configuration options to each component to
 * easily customize how each child component behaves.
 *
 * __Note:__ this is only used when `{@link #useComponents}` is `true`.
 * @accessor
 */

/**
 * @cfg {Number} [maxItemCache=20]
 * Maintains a cache of reusable components when using a component based DataView.  Improving performance at
 * the cost of memory.
 *
 * __Note:__ this is currently only used when `{@link #useComponents}` is `true`.
 * @accessor
 */

/**
 * @cfg {String} [defaultType='dataitem']
 * The xtype used for the component based DataView.
 *
 * __Note:__ this is only used when `{@link #useComponents}` is `true`.
 * @accessor
 */

/**
 * @cfg {Boolean} [scrollToTopOnRefresh=true]
 * Scroll the DataView to the top when the DataView is refreshed.
 * @accessor
 */

/**
 * @cfg {Number} [loadingHeight=null]
 * If specified, gives an explicit height for a {@link #cfg!floated} data view when it is showing the {@link #loadingText},
 * if that is specified. This is useful to prevent the view's height from collapsing to zero when the
 * loading mask is applied and there are no other contents in the data view.
 * @accessor
 */
