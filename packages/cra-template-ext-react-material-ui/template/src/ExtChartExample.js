import React, { Component } from 'react';
import { ExtChart } from "@sencha/ext-react-material-ui";
//import data from './ExtChartData.json';
import createData from './createData';
const Ext = window['Ext'];

export default class ExtChartExample extends Component {

  constructor() {
    super()
    this.theme = 'default'
    this.chartstore = Ext.create('Ext.data.Store', {
      fields: ['month','high','low',
        {
            name: 'highF',
            calculate: function (data) {
                return data.high * 1.8 + 32;
            }
        },
        {
            name: 'lowF',
            calculate: function (data) {
                return data.low * 1.8 + 32;
            }
        }
      ]
    });
  }

  render() {
    this.chartstore.loadData(createData());
    return (
      <ExtChart
      height="300px"
      downloadServerUrl='http://svg.sencha.io'
      theme={this.theme}
      store={this.chartstore}
      axes={[{
          type: 'numeric',
          position: 'left',
          minimum: 30,
          title: 'Temperature in °F'
      }, {
          type: 'category',
          position: 'bottom'
      }]}
      series={[{
          type: 'bar',
          xField: 'month',
          yField: 'highF'
      }]}
    />
    )
  }

}