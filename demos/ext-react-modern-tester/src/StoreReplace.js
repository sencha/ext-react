import React, { Component } from 'react';
import { ExtPanel, ExtToolbar, ExtButton, ExtGrid } from "@sencha/ext-react-modern";
const Ext = window['Ext'];

export default class StoreReplace extends Component {

  state = {
    currentStore: this.gridStore1
  };

  constructor() {
    super()
    var data1=[
      { name: 'Marc', email: 'marc@gmail.com' },
      { name: 'Nick', email: 'nick@gmail.com' },
      { name: 'Andy', email: 'andy@gmail.com' }
    ]
    this.gridStore1 = Ext.create('Ext.data.Store', {data: data1})

    var data2=[
      { name: 'Joe', email: 'joe@gmail.com' },
      { name: 'Nick', email: 'nick@gmail.com' },
      { name: 'Andy', email: 'andy@gmail.com' }
    ]
    this.gridStore2 = Ext.create('Ext.data.Store', {data: data2})
  }

  onTap = ({sender, e}) => {
    this.setState({currentStore: this.gridStore2});
  }

  onDeleteRow = ({sender, e}) => {
    this.gridStore1.removeAt(0)
  }

  render() {

    var theStore;
    const {currentStore} = this.state;
    if (currentStore === undefined) {
      theStore = this.gridStore1
    }
    else {
      theStore = currentStore
    }

    return (
      <ExtPanel viewport="true" layout="fit">

        <ExtToolbar docked="top">
          <ExtButton text='delete row' onTap={this.onDeleteRow}></ExtButton>
          <ExtButton text='change store' onTap={this.onTap}></ExtButton>
        </ExtToolbar>

        <ExtGrid
          store={theStore}
          columnLines={true}
          rowLines={true}
          striped={true}
          columns={[
            { text: 'name', dataIndex: 'name', width: 100},
            { text: 'email', dataIndex: 'email', width: 200}
          ]}
        >
        </ExtGrid>

      </ExtPanel>
    )
  }

}
