import React, { Component } from 'react';
import { ExtTreelist } from "@sencha/ext-react-material-ui";
import treeData from './treeData';
const Ext = window['Ext'];

export default class ExtChartExample extends Component {

  constructor() {
    super()
    this.treestore = Ext.create('Ext.data.TreeStore', {
      rootVisible: true,
      root: treeData
    });
  }

  render() {
    return (
      <ExtTreelist
      ref="tree"
      width="100%"
      height="300px"
      expanderOnly={false}
      store={this.treestore}
      micro={false}
      expanderFirst={true}
      ui={'nav'}
    />
    )
  }

}