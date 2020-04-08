/**
 * @class Ext.grid.plugin.CellEditing
 * @extend Ext.plugin.Abstract
 * @alias plugin.gridcellediting
 * @alias plugin.cellediting
 *
 * The Cell Editing plugin utilizes an `Ext.Editor` to provide inline cell editing for
 * grid cells.  Each `Column` with an `editable` prop value of true will become editable when the user
 * double-clicks on a cell in the column.  By default a `TextField` is used as the editor.  You
 * can substitute a different editor by adding a subclass of `Ext.field.Field` as a child of the `Column`.
 *
 *     @example packages=[ext-react]
 *     import React, { Component } from 'react'
 *     import { ExtReact, Grid, Column, SelectField } from '@sencha/ext-react-modern';
 *
 *     Ext.require('Ext.grid.plugin.CellEditing');
 *
 *     export default class MyExample extends Component {
 *
 *         store = new Ext.data.Store({
 *             data: [
 *                 { 'fname': 'Barry',  'lname': 'Allen', 'talent': 'Speedster'},
 *                 { 'fname': 'Oliver', 'lname': 'Queen', 'talent': 'Archery'},
 *                 { 'fname': 'Kara',   'lname': 'Zor-El', 'talent': 'All'},
 *                 { 'fname': 'Helena', 'lname': 'Bertinelli', 'talent': 'Weapons Expert'},
 *                 { 'fname': 'Hal',    'lname': 'Jordan', 'talent': 'Willpower'  }
 *             ]
 *         });
 *
 *         render() {
 *             return (
 *                 <ExtReact>
 *                     <Grid
 *                         height="275"
 *                         store={this.store}
 *                         plugins={['cellediting']}
 *                     >
 *                         <Column
 *                             text="First Name"
 *                             dataIndex="fname"
 *                             flex={1}
 *                             editable
 *                         />
 *                         <Column
 *                             text="Last Name"
 *                             dataIndex="lname"
 *                             flex={1}
 *                             editable
 *                         />
 *                         <Column
 *                             text="Talent"
 *                             dataIndex="talent"
 *                             flex={1}
 *                             editable
 *                         >
 *                             <SelectField
 *                                 options={[
 *                                     { text: 'All', value: 'All' },
 *                                     { text: 'Archery', value: 'Archery' },
 *                                     { text: 'Speedster', value: 'Speedster' },
 *                                     { text: 'Weapons', value: 'Weapons' },
 *                                     { text: 'Willpower', value: 'Willpower' }
 *                                 ]}
 *                            />
 *                         </Column>
 *                     </Grid>
 *                 </ExtReact>
 *             )
 *         }
 *     }
 *
 *
 */

/**
 * @cfg {String} [triggerEvent='doubletap']
 * The event used to trigger the editor
 * @accessor
 */
