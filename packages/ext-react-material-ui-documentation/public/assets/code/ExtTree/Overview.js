//import React from 'react';
//import { ExtD3_heatmap } from "@sencha/ext-react-material-ui";
//import data from './data';

class Overview extends React.Component {

  constructor() {
    super()
    this.treestore = Ext.create('Ext.data.TreeStore', {
      root: {
        text: 'Genre',
        expanded: true,
        children: data
      }
    });
  }

  render() {
    return (
      <ExtTree
        fitToParent
        title='Favorite Shows by Genre'
        store={this.treestore}
      />
    )
  }
}
