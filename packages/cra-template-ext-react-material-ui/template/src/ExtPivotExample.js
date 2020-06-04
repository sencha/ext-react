import React, { Component } from 'react';
import { ExtPivotgrid } from "@sencha/ext-react-material-ui";
import data from './ExtPivotData.json';

export default class ExtPivotExample extends Component {

  constructor() {
    super()
    this.store={
      type: 'store',
      data: data
      }
    this.matrix = {
      type: 'local',
      store: this.store,
      rowGrandTotalsPosition: 'first',
      leftAxis: [{
          dataIndex: 'country',
          direction: 'DESC',
          header: 'Countries',
          width: 150
      }],
      topAxis: [{
          dataIndex: 'year',
          direction: 'ASC'
      }],
      aggregate: [{
          dataIndex: 'value',
          header: 'Total',
          aggregator: 'sum',
          width: 120
      }]
    }
  }

  render() {
    return (
      <ExtPivotgrid
        title="PivotGrid"
        height="400px"
        matrix={this.matrix}
      ></ExtPivotgrid>
    )
  }

}