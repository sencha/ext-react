/**
 * @class Ext.grid.plugin.RowExpander
 * @extend Ext.Component
 * @alias plugin.rowexpander
 *
 * The Row Expander plugin provides an "expander" column to give the user the ability to show
 * or hide the {@link Ext.grid.Row#cfg!body body} of each row.
 *
 *     @example packages=[ext-react]
 *     import React, { Component } from 'react'
 *     import { ExtReact, Grid, Column } from '@sencha/ext-react-modern';
 *
 *     Ext.require('Ext.grid.plugin.RowExpander');
 *
 *     export default class MyExample extends Component {
 *
 *         store = Ext.create('Ext.data.Store', {
 *             data: [
 *                 { 'fname': 'Barry',  'lname': 'Allen', 'title': 'Director of Engineering', 'department': 'Engineering'  },
 *                 { 'fname': 'Oliver', 'lname': 'Queen', 'title': 'Senior Developer', 'department': 'Engineering'  },
 *                 { 'fname': 'Kara',   'lname': 'Zor-El', 'title': 'Senior Marketing Manager', 'department': 'Marketing'  },
 *                 { 'fname': 'Helena', 'lname': 'Bertinelli', 'title': 'Marketing Associate', 'department': 'Marketing'  },
 *                 { 'fname': 'Hal',    'lname': 'Jordan', 'title': 'Product Manager', 'department': 'Marketing'  }
 *             ],
 *             sorters: [
 *                 { property: 'lname' }
 *             ]
 *         });
 *
 *         render() {
 *             return (
 *                 <ExtReact>
 *                     <Grid
 *                         store={this.store}
 *                         fullscreen
 *                         plugins={['rowexpander']}
 *                         itemConfig={{
 *                             body: {
 *                                 tpl: (record) => (
 *                                     <div>
 *                                         <img height="100" src="http://www.sencha.com/assets/images/sencha-avatar-64x64.png"/>
 *                                         <div style={styles.name}>{record.fname} {record.lname}</div>
 *                                         <div style={styles.title}>{record.title}</div>
 *                                         <div style={styles.department}>{record.department}</div>
 *                                     </div>
 *                                 )
 *                             }
 *                         }}
 *                         variableHeights
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
 *                             text="Department"
 *                             dataIndex="department"
 *                             flex={1}
 *                         />
 *                     </Grid>
 *                 </ExtReact>
 *             )
 *         }
 *     }
 *
 *     const styles = {
 *         name: {
 *             fontSize: '16px',
 *             marginBottom: '5px'
 *         },
 *         department: {
 *             fontWeight: 'bold'
 *         },
 *         title: {
 *             fontWeight: 'bold',
 *             fontSize: '14px'
 *         }
 *     }
 *
 */
