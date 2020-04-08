import React, { Component } from 'react';
import {ExtGrid} from "@sencha/ext-react-modern";
import {ExtToolbar} from "@sencha/ext-react-modern";
import {ExtColumn} from "@sencha/ext-react-modern";
import {ExtSearchfield} from "@sencha/ext-react-modern";
import data from './data';
const Ext = window['Ext'];

export default class Grid extends Component {

  store = Ext.create('Ext.data.Store', {
    fields: ['name', 'email', 'phone', 'hoursTaken', 'hoursRemaining'],
    data
  });

  onReady = ({cmp, cmpObj}) => {
    //console.log(cmpObj)
    //console.log(this.searchfield.cmp)
  }

  onSearch = ({sender, oldValue, newValue}) => {
    const query = sender.getValue().toLowerCase();
    this.store.clearFilter();
    if (query.length) this.store.filterBy(record => {
      const { name, email, phone } = record.data;
      return name.toLowerCase().indexOf(query) !== -1 ||
             email.toLowerCase().indexOf(query) !== -1 ||
             phone.toLowerCase().indexOf(query) !== -1;
    });
  }

  renderChange = (value, context) => (
    <div style={{height:'15px'}}>
      <ext-button text={context.data.name}></ext-button>
      <span>span - {context.data.name}</span>
    </div>
    //<ExtButton text="hi"></ExtButton>
  )

  renderSummary = (value, context) => {
    return context.records.length;
}

  render() {
    return (
      <ExtGrid
        onReady={this.onReady}
        store={this.store}
        plugins= {{
          gridfilters: true,
          gridsummaryrow: true
      }}
        // columns={[{text:'Name', dataIndex:'name', width: '200px'}]}
      >
        <ExtToolbar docked="top">
          <ExtSearchfield
            ref={searchfield => this.searchfield = searchfield}
            extname="searchfield"
            onChange={this.onSearch.bind(this)}
            ui="faded"
            //ref={field => this.query = field}
            placeholder="Search..."
          />
        </ExtToolbar>
        <ExtColumn text="Name" dataIndex="name" flex={1} renderer={this.renderChange} summary="count"/>
        <ExtColumn text="Taken" dataIndex="hoursTaken" flex={1} summaryRenderer={this.renderSummary}/>
        {/* <ExtColumn text="Email" dataIndex="email" flex={3} resizable/>
        <ExtColumn text="Phone" dataIndex="phone" flex={2} resizable/> */}
      </ExtGrid>
    )
  }
}

// cell={{encodeHtml: false}}