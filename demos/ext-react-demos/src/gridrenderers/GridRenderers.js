import React, { Component } from 'react';
import {ExtGrid} from "@sencha/ext-react-modern";
import {ExtColumn} from "@sencha/ext-react-modern";
import data from './data';
const Ext = window['Ext'];

export default class GridRenderers extends Component {

  store = Ext.create('Ext.data.Store', {
    fields: ['name', 'email', 'phone', 'hoursTaken', 'hoursRemaining'],
    data
  });

  renderChange = (value, record) => (
    <div style={{height:'15px'}}>
      <span>span - {record.data.name}</span>
      <ext-button text={record.data.name}></ext-button>
    </div>
    //<ExtButton text="hi"></ExtButton>
  )

  summarizeNames (grid, context) {
    console.log(grid)
    console.log(context)
    return 'hi'
    //return context.records.length + ' Names';
  }

  summarizeNames2 = (sender, context) => {
    console.log(sender)
    console.log(context)
    //return 'hi'
    return context.records.length + ' Names';
  }

  render() {
    return (
      <ExtGrid
        store={this.store}
        plugins= {{gridsummaryrow: true}}
      >
        <ExtColumn text="Name" dataIndex="name" flex={2} renderer={this.renderChange} summaryRenderer={this.summarizeNames}/>
        <ExtColumn text="Name" dataIndex="name" flex={2} summaryRenderer={this.summarizeNames2}/>
        <ExtColumn text="Taken" dataIndex="hoursTaken" flex={1} summary="average"/>
      </ExtGrid>
    )
  }

}
