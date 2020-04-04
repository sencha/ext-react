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

  renderName1 = (value, context) => (
    <div style={{height:'15px'}}>
      <span>span - {context.data.name}</span>
      <ext-button shadow="true" text={context.data.name}></ext-button>
    </div>
    //<ExtButton text="hi"></ExtButton>
  )

  renderSummaryName1 (value, context) {
    //console.log(value)
    //console.log(context)
    return 'broken'
    //return context.records.length + ' Names';
  }

  renderName2 = (value, context) => {
    //console.log(value)
    //console.log(context)
    return value
  }

  renderSummaryName3 = (value, context) => {
    //console.log(value)
    //console.log(context)
    return context.records.length + ' Names';
  }

  rowTpl = (value, context) => (
    <div >
      <span>hi</span>
      <ext-button shadow="true" text="hello"></ext-button>
    </div>
  )

  render() {
    return (
      <ExtGrid
        store={this.store}
        itemConfig={{
          body: {
            //tpl: this.rowTpl
          },
        }}
        plugins= {{gridsummaryrow: true}}
      >
        <ExtColumn text="Name" dataIndex="name" flex={2} renderer={this.renderName1} summaryRenderer={this.renderSummaryName1}/>
        <ExtColumn text="Name" dataIndex="name" flex={2} renderer={this.renderName2} summary="count"/>
        <ExtColumn text="Name" dataIndex="name" flex={2} summaryRenderer={this.renderSummaryName3}/>
        <ExtColumn text="Taken" dataIndex="hoursTaken" flex={1} summary="average"/>
      </ExtGrid>
    )
  }

}
