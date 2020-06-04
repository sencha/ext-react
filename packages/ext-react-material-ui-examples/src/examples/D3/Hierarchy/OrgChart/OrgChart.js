import React, { Component } from 'react';
import './Chart';
//import { Orgchart } from '@sencha/ext-react-modern';
import { Panel } from '@sencha/ext-react-modern';
import createStore from './createStore';

export default class D3OrgChart extends Component {

  store = createStore()

  render() {
    return (
      <Panel shadow layout="fit" title="Organization Chart">
        {/* <Orgchart
          interactions={{
            type: 'panzoom',
            zoom: {
              extent: [0.5, 2],
              doubleTap: false
            },
          }}
          tooltip={{
            renderer: this.onTooltip
          }}
          nodeSize={[200, 100]}
          imagePath="resources/images/org-chart/"
          store={this.store}
        /> */}
      </Panel>
    )
  }

  onTooltip = (component, tooltip, node, element, event) => {
    const record = node.data,
          name = record.get('name'),
          title = record.get('title');
    tooltip.setHtml(`<span style="font-weight: bold">${name}</span><br>${title}`);
  }

}
