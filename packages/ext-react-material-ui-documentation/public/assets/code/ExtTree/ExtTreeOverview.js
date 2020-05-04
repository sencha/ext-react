//import React from 'react';
//import { ExtD3_heatmap } from "@sencha/ext-react-material-ui";
//import data from './data';

class Overview extends React.Component {

  constructor() {
    super()

    this.treestore = Ext.create('Ext.data.TreeStore', {
      proxy: {
        type: 'ajax',
        url: datafolder + 'tree.json',
        reader: {
            type: 'json',
            rootProperty: 'children'
        }
      },
      autoLoad: true,
      root: {
          text: 'Root',
          id: 'data',
          expanded: true
      },
      folderSort: true,
      sorters: [{
          property: 'text',
          direction: 'ASC'
      }]
    });
  }

  render() {
    return (
      <ExtTree
        fitToParent
        title='ExtTree'
        store={this.treestore}
      />
    )
  }
}
