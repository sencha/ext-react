import React, { Component } from 'react';
import { Grid, Column, GridCell } from '@sencha/ext-react-modern';

export default class GridToolsExample extends Component {

  store = Ext.create('Ext.data.Store', {
    autoLoad: true,
    fields: ['name', 'cuisine'],
    storeId: 'restaurants',
    groupField: 'cuisine',
    sorters: ['cuisine', 'name'],
    pageSize: 0,
    proxy: {
      type: 'ajax',
      url: 'resources/data/restaurants.json'
    }
  })

  helperTpl = data => (
    <ul>
      { data.group.items.map((item, i) => <li key={i}>{item.data.name}</li>) }
    </ul>
  )

  //-----------------------------------------------
  //Cell actions:
  onGear = (grid, info) => {
    Ext.Msg.alert('Settings', `Change settings for ${info.record.data.name}`);
  }

  onPin = (grid, info) => {
    Ext.Msg.alert('Pin', `Pinned item ${info.record.data.name}`);
  }

  onSearch = (grid, info) => {
    Ext.Msg.alert('Search', `Search for item ${info.record.data.name}`);
  }

  //-----------------------------------------------
  //Group actions:
  onGroupPrint = (grid, info) => {
      this.doGroup(info, 'Print Group');
  }

  onGroupRefresh = (grid, info) => {
      this.doGroup(info, 'Refresh Group');
  }

  onGroupSave = (grid, info) => {
      this.doGroup(info, 'Save Group');
  }

  doGroup = (info, action) => {
      Ext.Msg.alert(action, this.helperTpl.apply({ group: info.group }));
  }

  render() {
    return (
      <Grid title="Grid Tools"
        store={this.store}
        columnLines
        grouped
        shadow
        helperTpl={this.helperTpl}
        itemConfig={{
          header:{
            tools:{
              refresh:  {
                handler: this.onGroupRefresh
              },
              print: {
                handler: this.onGroupPrint,
                tooltip: 'Print group...',
                zone: 'tail'
              },
              save: {
                handler: this.onGroupSave,
                zone: 'end'
              }
            }
          }
        }}
      >
        <Column
          text="Name"
          dataIndex="name"
          flex={1}
          maxWidth="200"
          cell={{
            tools:{
              pin: {
                handler: this.onPin
              }
            }
          }}
        />
        <Column
          text="Cuisine"
          dataIndex="cuisine"
          flex={1}
          maxWidth="150"
          cell={{
            tools:{
              gear: {
                handler: this.onGear
              }
            }
          }}
        />
        <Column
          text="Actions"
          width="80"
          cell={{
            tools:{
              search: {
                handler: this.onSearch
              }
            }
          }}
        />
      </Grid>
    )
  }
}