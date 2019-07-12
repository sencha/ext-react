/**
 * This plugin enables user-defined filters for a grid.
 * @since 6.7.0
 *
 * In general an gridfilters plugin will be passed to the grid:
 *
 *     @example packages=[ext-react]
 *     var store = Ext.create('Ext.data.Store', {
 *         fields: ['firstname', 'lastname', 'seniority', 'department', 'hired', 'active'],
 *         data: [
 *             {
 *                  firstname:"Michael",
 *                  lastname:"Scott",
 *                  seniority:7,
 *                  department:"Management",
 *                  hired:"01/10/2004",
 *                  active: true
 *             },
 *             {
 *                  firstname:"Dwight",
 *                  lastname:"Schrute",
 *                  seniority:2,
 *                  department:"Sales",
 *                  hired:"04/01/2004",
 *                  active: true
 *             },
 *             {
 *                  firstname:"Jim",
 *                  lastname:"Halpert",
 *                  seniority:3,
 *                  department:"Sales",
 *                  hired:"02/22/2006",
 *                  active: false
 *             },
 *             {
 *                  firstname:"Kevin",
 *                  lastname:"Malone",
 *                  seniority:4,
 *                  department:"Accounting",
 *                  hired:"06/10/2007",
 *                  active: true
 *             },
 *             {
 *                  firstname:"Angela",
 *                  lastname:"Martin",
 *                  seniority:5,
 *                  department:"Accounting",
 *                  hired:"10/21/2008",
 *                  active: false
 *             }
 *         ]
 *     });
 *
 *     render() {
 *         return (
 *           <Grid
 *               fullscreen
 *               itemConfig={{
 *                   viewModel: true
 *               }}
 *               plugins={{
 *                   gridfilters: true
 *               }}
 *               store={store}
 *               title='Filter Grid Demo'
 *               width={500}
 *           >
 *             <Column 
 *                 dataIndex='firstname'
 *                 text='First Name'
 *             />
 *             <Column 
 *                 dataIndex='lastname'
 *                 text='Last Name'
 *             />
 *             <Column 
 *                 dataIndex='hired'
 *                 text='Hired Month'
 *             />
 *             <Column 
 *                 bind='{record.department} ({record.seniority})'
 *                 text='Department'
 *                 width={200}
 *             />
 *           </Grid>
 *         );
 *     }
 *
 * # Convenience Subclasses
 *
 * There are several menu subclasses that provide default rendering for various data types
 *
 *  - {@link Ext.grid.filters.menu.Boolean}: Renders for boolean input fields
 *  - {@link Ext.grid.filters.menu.Date}: Renders for date input fields
 *  - {@link Ext.grid.filters.menu.Number}: Renders for numeric input fields
 *  - {@link Ext.grid.filters.menu.String}: Renders for string input fields
 *  
 *  These subclasses can be configured in columns as such:
 *
 *
 *      <Column
 *          dataIndex='firstname'
 *          text='First Name'
 *      />
 *      <Column
 *          dataIndex='lastname'
 *          filter='string'
 *          text='Last Name'
 *      />
 *      <Column
 *          dataIndex='seniority'
 *          filter='number'
 *          text='seniority'
 *      />
 *      <Column
 *          dataIndex='hired'
 *          filter='date'
 *          text='Hired Month'
 *      />
 *      <Column
 *          dataIndex='active'
 *          filter='boolean'
 *          text='Active'
 *      />
 *
 *
 *  Menu items can also be customised as shown below:
 *
 *
 *      <Column
 *          dataIndex='firstname'
 *          text='First Name'
 *      />
 *      <Column
 *          text='Last Name'
 *          filter={{
 *              type: 'string',
 *              menu: {
 *                  items: {
 *                      like: {
 *                          placeholder: 'Custom Like...'
 *                      }
 *                  }
 *              }
 *          }}
 *      />
 *      <Column
 *          text='Hired Month'
 *          filter={{
 *              type: 'date',
 *              menu: {
 *                  items: {
 *                      lt: {
 *                          label: 'Custom Less than',
 *                          placeholder: 'Custom Less than...',
 *                          dateFormat: 'd-m-y'
 *                      },
 *                      gt: {
 *                          label: 'Custom Greater than',
 *                          placeholder: 'Custom Greater than...',
 *                          dateFormat: 'd-m-y'
 *                      },
 *                      eq: {
 *                          label: 'Custom On',
 *                          placeholder: 'Custom On...',
 *                          dateFormat: 'd-m-y'
 *                      }
 *                  }
 *              }
 *          }}
 *      />
 *      <Column
 *          text='Seniority'
 *          filter={{
 *              type: 'number',
 *              menu: {
 *                  items: {
 *                      lt: {
 *                          label: 'Custom Less than',
 *                          placeholder: 'Custom Less than...',
 *                      },
 *                      gt: {
 *                          label: 'Custom Greater than',
 *                          placeholder: 'Custom Greater than...',
 *                      },
 *                      eq: {
 *                          label: 'Custom Equal to',
 *                          placeholder: 'Custom Equal to...',
 *                      }
 *                  }
 *              }
 *          }}
 *      />
 *      <Column
 *          text='Active'
 *          filter={{
 *              type: 'boolean',
 *              menu: {
 *                  items: {
 *                      yes: {
 *                          text: 'Custom True'
 *                      },
 *                      no: {
 *                          text: 'Custom False'
 *                      }
 *                  }
 *              }
 *          }}
 *      />
 *
 */