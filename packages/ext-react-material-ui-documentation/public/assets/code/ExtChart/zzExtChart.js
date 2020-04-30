//import React from 'react';
//import { ExtChart } from "@sencha/ext-react-material-ui";
//import data from './data';

class Overview extends React.Component {

  constructor() {
    super()
    this.store={
      xtype: 'store',
      fields: ['country', 'agr', 'ind', 'ser'],
      data: data
      }
  }

  onAxisLabelRender(axis, label, layoutContext){
    return Ext.util.Format.number(layoutContext.renderer(label) / 1000, '0,000');
  }

  onSeriesLabelRender(v){
      return Ext.util.Format.number(v / 1000, '0,000');
  }

  render() {
    return (
      <ExtChart
        fitToParent
        downloadServerUrl='http://svg.sencha.io'
        insetPadding="70 40 0"
        flipXY
        store={this.store}
        theme='default'
        series={[{
          type: 'bar',
          xField: 'country',
          yField: 'ind',
          style: {
            opacity: 0.80,
            minGapWidth: 10
          },
          label: {
            field: 'ind',
            display: 'insideEnd',
            renderer: this.onSeriesLabelRender
          }
        }]}
        axes={[{
          type: 'numeric',
          position: 'bottom',
          fields: 'ind',
          grid: true,
          maximum: 4000000,
          majorTickSteps: 10,
          title: 'Billions of USD',
          renderer: this.onAxisLabelRender
        }, {
          type: 'category',
          position: 'left',
          fields: 'country',
          grid: true
        }]}
        captions={{
          title: {
              text: '2011 Industry size in major economies',
          },
          subtitle: {
              text: 'http://en.wikipedia.org/wiki/List_of_countries_by_GDP_sector_composition',
          }
        }}
      />
    )
  }
}


