import React, { Component } from 'react';
import { Panel } from '@sencha/ext-react-modern';
import * as d3 from 'd3'
window.d3 = d3
import { ExtD3Tree } from '@sencha/ext-react-modern';
import './Salary';

Ext.require([
  'Ext.d3.interaction.PanZoom',
  'Ext.tip.ToolTip'
]);

export default class D3TreeHierarchy extends Component {

  store = Ext.create('Ext.data.TreeStore', {
    autoLoad: true,
    fields: ['state', 'text', 'salary'],
    root: { text: 'States' },
    proxy: {
      type: 'ajax',
      url: 'resources/data/tree/salary.json',
      reader: {
        type: 'salary'
      }
    }
  })

  getNodeText = (tree, node) => {
    const record = node.data;
    let text = record.data.text;
    if (node.depth > 1) {
      text += ' (' + Ext.util.Format.currency(record.data.salary, '$', 0) + ')';
    }
    return text;
  }

  onTooltip = (component, tooltip, node) => {
    const n = node.data.childNodes.length;
    tooltip.setHtml(n + ' item' + (n === 1 ? '' : 's') + ' inside.');
  }

  render() {
    return (
      <Panel shadow layout="fit">
        <ExtD3Tree
          store={this.store}
          colorAxis={{ field: 'id' }}
          interactions={{
            type: 'panzoom',
            zoom: {
              extent: [0.3, 3],
              doubleTap: false
            }
          }}
          padding={10}
          nodeSize={[300, 40]}
          nodeRadius={10}
          nodeText={this.getNodeText}
          tooltip={{ renderer: this.onTooltip }}
          platformConfig={{
            desktop: {
              nodeSize: [250, 20],
              nodeRadius: 5
            }
          }}
        />
      </Panel>
    )
  }
}