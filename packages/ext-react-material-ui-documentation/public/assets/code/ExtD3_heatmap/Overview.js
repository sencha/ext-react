//import React from 'react';
//import { ExtD3_heatmap } from "@sencha/ext-react-material-ui";
//import data from './data';

class Overview extends React.Component {

  constructor() {
    super()
    this.store={
      xtype: 'store',
      fields: [
        { name: 'date', type: 'date', dateFormat: 'Y-m-d' },
        'bucket',
        'count'
      ],
      data: data
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
        padding="20 20 40 60"
        platformConfig={{
            desktop: {
                legend: {
                    docked: 'bottom',
                    padding: 60,
                    items: {
                        count: 7,
                        slice: [1],
                        reverse: true,
                        size: {
                            x: 60,
                            y: 30
                        }
                    }
                },
                padding: {
                    top: 20,
                    right: 30,
                    bottom: 20,
                    left: 80
                }
            },
            '!phone': {
                padding: {
                    top: 40,
                    right: 40,
                    bottom: 50,
                    left: 80
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
            platformConfig: {
                desktop: {
                    title: {
                        text: 'Total'
                    }
                }
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


