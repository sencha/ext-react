import React, { Component } from 'react';
import {ExtGrid, ExtColumn, ExtContainer, ExtButton, ExtToolbar} from "@sencha/ext-react-modern";
import data from '../data';
import datanew from '../datanew';
const Ext = window['Ext'];

export default class gridsummarychangestate extends Component {



  constructor() {
    super();

    this.store = Ext.create('Ext.data.Store', {
      fields: ['name', 'email', 'phone', 'hoursTaken', 'hoursRemaining'],
      data
    });

    this.storenew = Ext.create('Ext.data.Store', {
      fields: ['name', 'email', 'phone', 'hoursTaken', 'hoursRemaining'],
      datanew
    });


    console.log(data)
    console.log(datanew)
    this.state = {
      store: this.store,
      height: 200,
      num: 1
    };
  }

  changeState = () => {
    console.log(this.storenew)
    var h = this.state.height + 100
    this.setState({
      //store: this.storenew,
      height: h,
      num: Math.random()
    });
  }

  renderSummaryName3 = (value, context) => {
    //console.log(value)
    //console.log(context)
    return context.records.length + ' Names';
  }

//plugins= {{gridsummaryrow: true}}
//plugins= '{"gridsummaryrow": true}'

  render() {
    return (
      <ExtContainer>
        <ExtToolbar>
          <ExtButton text="Change State" handler={this.changeState}/>
        </ExtToolbar>
        <ExtGrid
          xfitToParent="true"
          height={this.state.height}
          store={this.state.store}
          plugins= {{gridsummaryrow: true}}

        >
          <ExtColumn text="Name" dataIndex="name" flex={2} summaryRenderer={this.renderSummaryName3}/>
        </ExtGrid>
      </ExtContainer>
    )
  }

}
