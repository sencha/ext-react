import React, { Component } from 'react';
import { TabPanel, Panel } from '@sencha/ext-modern';

export default class AppTabPanel extends Component {

  render() {
    const files = ['1','2','3'];

    return (
      <TabPanel>
        { Object.keys(files).map((file, i) => (
          <Panel 
            key={i}
            title={file}
            html={`tab ${i}`}
          />
        ))}
      </TabPanel> 
    )
  }

}