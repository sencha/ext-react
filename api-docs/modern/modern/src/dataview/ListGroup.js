/**
 * @class Ext.dataview.ListGroup
 * @extend Ext.Base
 *
 * This class manages a group in a `list` or `grid`. These objects arrive as parameters to
 * events and can be retrieved via the {@link Ext.dataview.List#method!groupFrom groupFrom}
 * method.
 * @since 7.0
*/
 /**
  * @cfg {Boolean} collapsed
  * This config controls whether a group is expanded or collapsed. Setting this
  * config is equivalent to calling the `collapse`, `expand` or `toggleCollapsed`
  * methods. Setting this config will control the collapse state without firing
  * the {@link Ext.dataview.List#event!beforegroupcollapse beforegroupcollapse} or
  * {@link Ext.dataview.List#event!beforegroupexpand beforegroupexpand} event.
  * Call `toggleCollapsed` to allow these events to veto the state change.
  *
  * The initial collapse state of a group is determined at the `list` level from
  * its {@link Ext.dataview.List#cfg!collapsible collapsible} config:
  */

   /**
    * @cfg {Boolean} collapsible
    * Set to `false` to prevent a group from collapsing. Since these objects come
    * and go based on user driven grouping choices, it is often easier to listen to
    * the {@link Ext.dataview.List#event!beforegroupcollapse beforegroupcollapse}
    * and/or {@link Ext.dataview.List#event!beforegroupexpand beforegroupexpand}
    * events.
    */

   /**
    * @cfg {Ext.Component} header
    * The group's header component. Typically a {@link Ext.dataview.ItemHeader} or
    * {@link Ext.grid.RowHeader}.
    * @readonly
    */

    /**
* @property {Ext.data.Group} data
* The underlying data for this group.
* @readonly
*/

    /**
* @property {Ext.dataview.List} list
* The owning `list` (or `grid`) component.
* @readonly
*/

    /**
* Collapses this group by calling `toggleCollapsed(false)`. This can be vetoed by the
* {@link Ext.dataview.List#event!beforegroupcollapse beforegroupcollapse} event.
*
* See also `expand` and `toggleCollapsed`.
*/

    /**
* Expands this group by calling `toggleCollapsed(true)`. This can be vetoed by the
* {@link Ext.dataview.List#event!beforegroupexpand beforegroupexpand} event.
*
* See also `collapse` and `toggleCollapsed`.
*/

/**
* Toggles the collapse state this group. Before changing the collapse state, this
* method fires a {@link Ext.dataview.List#event!beforegroupexpand beforegroupexpand}
* or {@link Ext.dataview.List#event!beforegroupcollapse beforegroupcollapse} event.
* This is unlike calling `setCollapsed` which will always change the collapse state
* as directed.
*
* See also `collapse` and `expand`.
* @param {Boolean} [collapsed] Pass `true` or `false` to specify the desired state
* or `null`/`undefined` to toggle the current state.
*/
