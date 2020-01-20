import React, { Component } from 'react';
import {ExtGrid} from "@sencha/ext-react-modern";
import {ExtColumn, ExtContainer} from "@sencha/ext-react-modern";
import data from '../data';
const Ext = window['Ext'];

export default class GridRowBody extends Component {

  constructor() {
    super();
    this.state = {
      num: 1,
    };
  }

  changeState = () => {
    this.setState({
      num: Math.random()
    });
  }

  store = Ext.create('Ext.data.Store', {
    fields: ['name', 'email', 'phone', 'hoursTaken', 'hoursRemaining'],
    data
  });

  tpl = data => (
    <span>
        <div>{data.name}</div>
        <div>{data.email}</div>
    </span>
  )

  render() {
    return (

<ExtContainer>

  <ExtGrid
    store={this.store}
    height="400"
    itemConfig={{
      body:{
        tpl: this.tpl
      }
    }}
  >
    <ExtColumn text="Name" dataIndex="name" flex={2}/>
  </ExtGrid>

</ExtContainer>

    )
  }

}
