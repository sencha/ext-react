/**
 * @class Ext.BreadcrumbBar
 * @extend Ext.toolbar
 * @xtype breadcrumbbar
 * 
 * 
 * A toolbar that displays hierarchical data from a {@link Ext.data.TreeStore TreeStore}
 * as a trail of breadcrumb buttons.  Each button represents a node in the store.  A click
 * on a button will "select" that node in the tree.  Non-leaf nodes will display their
 * child nodes on a dropdown menu of the corresponding button in the breadcrumb trail,
 * and a click on an item in the menu will trigger selection of the corresponding child
 * node.
 *
 * The selection can be set programmatically  using {@link #setSelection}, or retrieved
 * using {@link #getSelection}.
 */

/**
 * @cfg {String} buttonUI 
 * Button UI to use for breadcrumb items
 */

/**
 * @cfg {String} displayField 
 * The name of the field in the data model to display in the navigation items of
 * this breadcrumb toolbar
 */

/**
 * @cfg {Boolean} showIcons 
 *
 * Controls whether or not icons of tree nodes are displayed in the breadcrumb
 * buttons.  There are 3 possible values for this config:
 *
 * 1. unspecified (`null`) - the default value. In this mode only icons that are
 * specified in the tree data using ({@link Ext.data.NodeInterface#icon icon}
 * or {@link Ext.data.NodeInterface#iconCls iconCls} will be displayed, but the
 * default "folder" and "leaf" icons will not be displayed.
 *
 * 2. `true` - Icons specified in the tree data will be displayed, and the default
 * "folder" and "leaf" icons will be displayed for nodes that do not specify
 * an `icon` or `iconCls`.
 *
 * 3. `false` - No icons will be displayed in the breadcrumb buttons, only text.
 */

/**
 * @cfg {Boolean} showMenuIcons 
 *
 * Controls whether or not icons of tree nodes are displayed in the breadcrumb
 * menu items. There are 3 possible values for this config:
 *
 * 1. unspecified (`null`) - the default value. In this mode only icons that are
 * specified in the tree data using ({@link Ext.data.NodeInterface#icon icon}
 * or {@link Ext.data.NodeInterface#iconCls iconCls} will be displayed, but the
 * default "folder" and "leaf" icons will not be displayed.
 *
 * 2. `true` - Icons specified in the tree data will be displayed, and the default
 * "folder" and "leaf" icons will be displayed for nodes that do not specify
 * an `icon` or `iconCls`.
 *
 * 3. `false` - No icons will be displayed on the breadcrumb menu items, only text.
 */

/**
 * @cfg {Ext.data.TreeStore} store
 * The TreeStore that this breadcrumb toolbar should use as its data source
 */

/**
 * @cfg {Boolean} useSplitButtons 
 * `false` to use regular {@link Ext.Button Button}s instead of {@link
    * Ext.SplitButton Split Buttons}.  When `true`, a click on the body of a button
    * will navigate to the specified node, and a click on the arrow will show a menu
    * containing the the child nodes.  When `false`, the only mode of navigation is
    * the menu, since a click anywhere on the button will show the menu.
    */
   
   /**
    * @cfg {Ext.data.TreeModel/String} selection
    * The selected node, or `"root"` to select the root node
    * @accessor
    */
   
   /**
    * @cfg {Ext.menu.Menu/Boolean/Object} menu
    * A menu or menu configuration. This can be a reference to a menu instance, a menu
    * config object or the `xtype` alias of a {@link Ext.menu.Menu menu}-derived class.
    */
   
   /**
    * @cfg {Object} buttonConfig
    * Button config to be added to button instance
    */
   
   /**
    * @cfg {String} btnCls
    * The CSS class to add to this buttons widget element
    */
   
   /**
   * @property {Boolean} isBreadcrumb
   * The value `true` to identify an object as an instance of this or derived class.
   * @readonly
   */
   
   /**
   * @cfg publishes
   * @inheritdoc
   */
   
   /**
   * @cfg twoWayBindable
   * @inheritdoc
   */
   
   /**
   * @event selectionchange
   * Fires when the selected node changes. At render time, this event will fire
   * indicating that the configured {@link #selection} has been selected.
   * @param {Ext.BreadcrumbBar} this
   * @param {Ext.data.TreeModel} node The selected node.
   * @param {Ext.data.TreeModel} prevNode The previously selected node.
   */
   
   /**
   * @event change
   * Fires when the user changes the selected record. In contrast to the 
   * {@link #selectionchange} event, this does
   * *not* fire at render time, only in response to user activity.
   * @param {Ext.BreadcrumbBar} this
   * @param {Ext.data.TreeModel} node The selected node.
   * @param {Ext.data.TreeModel} prevNode The previously selected node.
   */
   
   /**
   * Internal cache of buttons that are re-used as the items of this container
   * as navigation occurs.
   * @property {Ext.SplitButton[]/Ext.Button[]} buttons
   * @private
   */
   
   
   /**
   * @method getSelection
   * Returns the currently selected {@link Ext.data.TreeModel node}.
   * @return {Ext.data.TreeModel} node The selected node (or null if there is no
   * selection).
   */
   
   /**
   * @method setSelection
   * Selects the passed {@link Ext.data.TreeModel node} in the breadcrumb component.
   * @param {Ext.data.TreeModel} node The node in the breadcrumb {@link #store} to
   * select as the active node.
   * @return {Ext.BreadcrumbBar} this The breadcrumb component
   */
   
   /**
   * Update button menu
   * If menu is null or false or there are no child nodes 
   * then no need to display menu
   * @param {Ext.SplitButton[]} buttons Internal cache of buttons
   * @param {Boolean} refreshMenuItems `true` to reset menu items
   * @param {Boolean} forceCreate `true` to recreate menu on button
   */
   
   /**
   * Handles a click on a breadcrumb button
   * @private
   * @param {Ext.SplitButton} button
   * @param {Ext.event.Event} e
   */
   
   /**
   * Handles a click on a button menu
   * @private
   * @param {Ext.menu.Menu} menu
   * @param {Ext.menu.Item} item
   * @param {Ext.event.Event} e
   */
   
   /**
   * Returns button menu items
   * @private
   * @param {String} nodeId
   */
   
   /**
   * Remove all breadcrumb buttons
   */
   
   /**
   * Handle breadcrumb store data update 
   * such as (`add`, `remove`, `update`, `refresh`).
   * Checks with button text and update button arrow
   */
   
   
   /**
   * Handle store `update` events
   */
   
   /**
   * Handler store `removeAll` method
   */
   