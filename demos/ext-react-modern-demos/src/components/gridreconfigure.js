import React, { Component } from 'react';
//import ReactDOMServer from 'react-dom/server';
import { ExtPanel, ExtSpacer, ExtContainer, ExtToolbar, ExtButton, ExtGrid } from "@sencha/ext-react-modern";
import data from './data';

const columns1 = [
  { text: 'name', dataIndex: 'name', flex: 1 },
  { text: 'email', dataIndex: 'email', flex: 1 },
]

const store1 = {
  xtype: 'store',
  data: data
}

const columns2 = [
  { text: 'email2', dataIndex: 'email', flex: 1 },
  { text: 'name2', dataIndex: 'name', flex: 1 },
  { text: 'phone2', dataIndex: 'phone', flex: 1 },
]

const store2 = {
  xtype: 'store',
  data: data.slice(0,5)
}

class gridreconfigure extends Component {

  pageReady = ({cmp, cmpObj}) => {
    for (var prop in cmpObj) {
      this[prop] = cmpObj[prop];
    }
  }

  reconfigureGrid1 = () => {
    this.grid.setColumns(columns1)
             .setStore(store1)
    this.div.setHtml('grid has been reconfigured to 1')
  }

  reconfigureGrid2 = () => {
    this.grid.setColumns(columns2)
             .setStore(store2)
    this.div.setHtml('grid has been reconfigured to 2')
  }

  render() {
    return (
      <ExtPanel layout="fit" title="Grid" shadow onReady={this.pageReady}>
        <ExtToolbar docked="top">
          <ExtButton text="reconfigure grid to 1" shadow onTap={this.reconfigureGrid1}></ExtButton>
          <ExtButton text="reconfigure grid to 2" shadow onTap={this.reconfigureGrid2} margin="10"></ExtButton>
          <ExtSpacer/>
          <ExtContainer extname="div" html="grid is 1"></ExtContainer>
        </ExtToolbar>
        <ExtGrid extname="grid" columns={columns1} store={store1}/>
      </ExtPanel>
    )
  }
}
export default gridreconfigure;