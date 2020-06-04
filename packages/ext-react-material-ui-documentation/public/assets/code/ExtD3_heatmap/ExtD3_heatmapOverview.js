//import React from 'react';
//import { ExtD3_heatmap } from "@sencha/ext-react-material-ui";
//import data from './data';

class Overview extends React.Component {

  constructor() {
    super()
    this.store = {
      autoLoad: true,
      fields: [
        { name: 'date', type: 'date', dateFormat: 'Y-m-d' },
        'bucket',
        'count'
      ],
      proxy: {
        type: 'ajax',
        url: datafolder + 'heatmap.json'
      }
    }
  }

  onTooltip (component, tooltip, datum) {
    var d = datum.data,
        field = component.getColorAxis().getField(),
        date = Ext.Date.monthNames[d.date.getMonth()] + ' ' + d.date.getDate();
    tooltip.setHtml(d[field] + ' customers purchased a total of $'
        + d.bucket + ' to $' + (d.bucket + 100) + '<br> of goods on ' + date);
  }

  render() {
    return (
      <ExtD3_heatmap
        fitToParent
        store={this.store}
        padding= {{
          top: 20,
          right: 30,
          bottom: 10,
          left: 80
        }}
        legend={{
          docked: 'bottom',
          items: {
            count: 7,
            slice: [1],
            reverse: true,
            size: {
              x: 60,
              y: 30
            }
          }
        }}
        xAxis={{
          axis: {
            ticks: 'd3.timeDay',
            tickFormat: "d3.timeFormat('%b %d')",
            orient: 'bottom'
          },
          scale: {
            type: 'time'
          },
          field: 'date',
          step: 24 * 60 * 60 * 1000
        }}
        yAxis={{
            title: {
                text: 'Total'
            },
            axis: {
              orient: 'left',
              tickFormat: "d3.format('$d')"
            },
            scale: {
              type: 'linear'
            },
            field: 'bucket',
            step: 100
        }}
        colorAxis={{
          scale: {
            type: 'linear',
            range: ['white', 'green']
          },
          field: 'count',
          minimum: 0
        }}
        tiles={{
          attr: {
            'stroke': 'green',
            'stroke-width': 1
          }
        }}
        tooltip={{
          renderer: this.onTooltip
        }}
      />
    )
  }
}


