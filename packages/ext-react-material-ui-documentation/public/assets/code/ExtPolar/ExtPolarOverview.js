//import React from 'react';
//import { ExtPolar } from "@sencha/ext-react-material-ui";
//import data from './data';

class Overview extends React.Component {

  constructor() {
    super()
    this.store = {
      autoLoad: true,
      fields: ['os', 'data1', 'data2'],
      proxy: {
        type: 'ajax',
        url: datafolder + 'polar.json'
      }
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
      <ExtPolar
        fitToParent
        downloadServerUrl='http://svg.sencha.io'
        insetPadding="70 40 0"
        store={this.store}
        theme='default'
        legend={{
            type: 'sprite',
            docked: 'bottom',
            marker: { size: 16 }
        }}
        interactions={['rotate', 'itemhighlight']}
        series={[{
            type: 'pie',
            animation: {
                easing: 'easeOut',
                duration: 500
            },
            angleField: 'data1',  // bind pie slice angular span to market share
            radiusField: 'data2', // bind pie slice radius to growth rate
            clockwise: false,
            highlight: {
                margin: 20
            },
            label: {
                field: 'os',      // bind label text to name
                display: 'outside',
                fontSize: 14
            },
            style: {
                strokeStyle: 'white',
                lineWidth: 1
            },
            tooltip: {
                trackMouse: true,
                renderer: (tooltip, record) => {
                  tooltip.setHtml(record.get('os') + ': ' + record.get('data1') + '%')
                }
            }
        }]}
      />
    )
  }
}


