/**
 * @class Ext.grid.plugin.PagingToolbar
 * @extend Ext.plugin.Abstract
 * @alias plugin.pagingtoolbar
 * @alias plugin.gridpagingtoolbar
 *
 * The Paging Toolbar is a specialized toolbar that is
 * bound to a `Ext.data.Store` and provides automatic paging control.
 *
 *     @example packages=[ext-react]
 *     import React, { Component } from 'react'
 *     import { ExtReact, Grid, Column } from '@sencha/ext-react-modern';
 *
 *     Ext.require('Ext.grid.plugin.PagingToolbar');
 *
 *     export default class MyExample extends Component {
 *
 *         store = new Ext.data.Store({
 *             pageSize: 3,
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
 *                         height="180"
 *                         store={this.store}
 *                         plugins={['pagingtoolbar']}
 *                     >
 *                         <Column
 *                             text="First Name"
 *                             dataIndex="fname"
 *                             flex={1}
 *                         />
 *                         <Column
 *                             text="Last Name"
 *                             dataIndex="lname"
 *                             flex={1}
 *                         />
 *                         <Column
 *                             text="Talent"
 *                             dataIndex="talent"
 *                             flex={1}
 *                         />
 *                     </Grid>
 *                 </ExtReact>
 *             )
 *         }
 *     }
 */
