import React, { Component } from 'react';
import { Grid, Column } from '@sencha/ext-react-modern';

export default class XmlGridExample extends Component {

  store = Ext.create('Ext.data.Store', {
    autoLoad: true,
    fields:[
      {name: 'Author', mapping: '@author.name'},
      'Title',
      'Manufacturer',
      'ProductGroup'
    ],
    proxy:{
      type: 'ajax',
      url: 'resources/data/Grids/sheldon.xml',
      reader: {
        type: 'xml',
        record: 'Item',
        idProperty: 'ASIN',
        totalRecords: '@total'
      }
    }
  })

  render() {
    return (
      <Grid shadow title="Products" store={this.store}>
        <Column text="Author" dataIndex="Author" flex="1"/>
        <Column text="Title" dataIndex='Title' flex="1"/>
        <Column text="Manufacturer" dataIndex='Manufacturer' flex="1"/>
        <Column text="Product Group" dataIndex='ProductGroup' width="125"/>
      </Grid>
    )
  }
}