/**
 * @class Ext.grid.plugin.RowOperations
 * @extend Ext.plugin.Abstract
 * @alias plugin.rowoperations
 *
 * The RowOperations plugin enables user to select rows in a {@link Ext.grid.Grid grid} and
 * then perform an operation (e.g. Delete) on them. This plugin adds a "Select" button
 * to the grid's title to start the selection process. This button is replaced by "Done"
 * while in selection mode. When selecting an extra `operation` button is displayed. By
 * default this button can be used to delete records.
 *
 * In addition, this plugin will ensure that the {@link Ext.grid.Grid#cfg!selectable checkbox}
 * selection method is enabled. The {@link #selectionColumn} config of this plugin can be
 * used to control this configuration.
 *
 * Customizing the RowOperations plugin to provide operations other then "Delete" can
 * be done with the `operation` config:
 *
 *      @example packages = [ext-react]
 *      import React, { Component } from 'react'
 *      import { ExtReact, Grid, Column } from '@sencha/ext-react-modern';
 *
 *      Ext.require('Ext.grid.plugin.RowOperations');
 *
 *      export default class MyExample extends Component {
 *
 *          store = new Ext.data.Store({
 *              data: [
 *                  { 'fname': 'Barry', 'lname': 'Allen', 'talent': 'Speedster' },
 *                  { 'fname': 'Oliver', 'lname': 'Queen', 'talent': 'Archery' },
 *                  { 'fname': 'Kara', 'lname': 'Zor-El', 'talent': 'All' },
 *                  { 'fname': 'Helena', 'lname': 'Bertinelli', 'talent': 'Weapons Expert' },
 *                  { 'fname': 'Hal', 'lname': 'Jordan', 'talent': 'Willpower' }
 *              ]
 *          });
 *
 *          render() {
 *              return (
 *                  <ExtReact>
 *                      <Grid
 *                          ref={grid => this.grid = grid}
 *                          store={this.store}
 *                          title="People"
 *                          fullscreen
 *                          plugins={{
 *                              rowoperations: {
 *                                  operation: {
 *                                      text: "Archive",
 *                                      handler: this.archiveSelected,
 *                                      ui: "alt"
 *                                  }
 *                              }
 *                          }}
 *                      >
 *                          <Column text="First Name" dataIndex="fname" flex="1" />
 *                          <Column text="Last Name" dataIndex="lname" flex="1" />
 *                          <Column text="Talent" dataIndex="talent" flex="1" />
 *                      </Grid>
 *                  </ExtReact>
 *              )
 *          }
 *
 *          archiveSelected = () => {
 *              const selected = this.grid.getSelected().items
 *                  .map(record => `${record.get('fname')} ${record.get('lname')}`)
 *                  .join(', ');
 *
 *              console.log(`Archived ${selected}`)
 *          }
 *      }
 *
 * Since the `operation` is a {@link Ext.Button button}, multiple operations can easily be
 * provided using the button's  {@link Ext.Button#cfg!menu menu}.
 */

/**
 * @cfg {Object/Ext.Button} operation
 * This button is displayed when the `selectButton` is tapped. By default it is
 * a "Delete" button (see `deleteText`). This button can be customized to perform
 * other operations than delete by replacing the `handler` (or using a `menu`).
 * @since 6.5.0
 * @accessor
 */

/**
 * @cfg {Object/Ext.Button} selectButton
 * This config drives the "Select" button added to the grid's title bar. This
 * button's handler is provided by the plugin and toggles the visibility of the
 * `operation` button.
 * @since 6.5.0
 * @accessor
 */

/**
 * @cfg {Object} selectionColumn
 * The default settings for the selection column. Used as a config object for the
 * {@link Ext.grid.selection.Model#checkbox}. You may provide a value for this
 * config in order to:
 *
 * + Change column width
 * + Show the selectionColumn by default
 * + Change the default cls or cellCls
 * + Etc.
 * @accessor
 */

/**
 * @cfg {Boolean} [useTriggerButton=true]
 * Determines whether or not the trigger button is show when the grid is loaded.
 * This most commonly be set to false if you wanted to have the selectionColumn
 * shown 100% of the time instead of hidden by default. You could show the {@link #selectionColumn}
 * by modifying its hidden value to be false.
 * @accessor
 */

/**
 * @cfg {String} [triggerText="Select"]
 * The text of the button used to display the `operation` and the `selectionColumn`.
 * @accessor
 */

/**
 * @cfg {String} [cancelText="Done"]
 * The text of the button used to hide the `operation` and the `selectionColumn`.
 * @accessor
 */

/**
 * @cfg {String} [deleteText="Delete"]
 * The text of the button used to delete selected rows.
 * @accessor
 */
