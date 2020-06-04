//import React from 'react';
//import { ExtD3_heatmap } from "@sencha/ext-react-material-ui";
//import data from './data';

class Overview extends React.Component {

  constructor() {
    super()

  //   this.store = {
  //     type: 'tree',
  //     root: {
  //         name: 'A',
  //         expanded: true,
  //         children: [{
  //             name: 'B',
  //             expanded: true,
  //             children: [{
  //                 name: 'D',
  //                 leaf: true
  //             }, {
  //                 name: 'E',
  //                 leaf: true
  //             }]
  //         }, {
  //             name: 'C',
  //                 leaf: true
  //         }]
  //     }
  // }


    this.treestore3 = {
      type: 'tree',
      proxy: {
        type: 'ajax',
        url: datafolder + 'sunburst.json',
        reader: {
          type: 'json',
          rootProperty: 'children'
        },
      root: {
        text: 'A',
        expanded: true
    }
      },
    }

    this.treestore2 = Ext.create('Ext.data.TreeStore', {
      proxy: {
        type: 'ajax',
        url: datafolder + 'sunburst.json',
        reader: {
            type: 'json',
            rootProperty: 'children'
        }
      },
      autoLoad: true,
      root: {
          text: 'A',
          expanded: true
      }
    });



    this.treestore = Ext.create('Ext.data.TreeStore', {
      proxy: {
        type: 'ajax',
        url: datafolder + 'treemap.json',
        reader: {
            type: 'json',
            rootProperty: 'children'
        }
      },
      autoLoad: true,
      root: {
          text: 'A',
          expanded: true
      }
    });



    // this.store2 = {
    //   autoLoad: true,
    //   proxy: {
    //     type: 'ajax',
    //     url: datafolder + 'treemap.json'
    //   }
    // }
  }

  getNodeValue(record) {
    // The value in your data to derive the size of the tile from.
    return record.get('age');
  }

  tooltipRenderer (component, tooltip, node) {

    tooltip.setHtml(node.data.get('name'));
  }



  render() {
    return (
      <ExtD3_sunburst
      fitToParent
      padding={16}
      store={this.treestore2}
      tooltip={this.tooltipRenderer}
       nodeValue={this.getNodeValue}
      >
        </ExtD3_sunburst>
    )
  }
}