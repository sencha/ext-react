//import React from 'react';
//import { ExtD3_heatmap } from "@sencha/ext-react-material-ui";
//import data from './data';

class Overview extends React.Component {

  constructor() {
    super()
    this.treestore = Ext.create('Ext.data.TreeStore', {
      rootVisible: true,
      root: data
    });
  }

  render() {
    return (
      <ExtTreelist
        fitToParent
        expanderOnly={false}
        store={this.treestore}
        micro={false}
        expanderFirst={true}
        ui={'nav'}
      />
    )
  }
}


