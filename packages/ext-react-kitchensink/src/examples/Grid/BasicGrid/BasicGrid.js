
import React, { Component } from 'react';
import { Grid, Column } from '@sencha/ext-react-modern';
import '../CompanyData';
import model from '../CompanyModel';

Ext.require({"xtype":"renderercell"})
Ext.require([
  'Ext.grid.plugin.HeaderReorder'
]);

export default class BasicGridExample extends Component {
  store = Ext.create('Ext.data.Store', {
    model,
    autoLoad: true,
    pageSize: 0,
    proxy: {
      type: 'ajax',
      url: '/KitchenSink/Companys'
    }
  });

  render() {
    return (
      <Grid title="Stock Prices" store={this.store} scrollable shadow grouped>
        <Column text="Company" dataIndex="name" width="150"/>
        <Column text="Price" width="85" dataIndex="price" formatter='usMoney'/>
        {/* <Column
          text="Change"
          width="100"
          dataIndex="priceChange"
          renderer={this.renderSign.bind(this, '0.00')}
        /> */}
        <Column
          text="% Change"
          dataIndex="priceChangePct"
          renderer={this.renderSign.bind(this, '0.00')}
        />
        <Column text="Last Updated" width="125" dataIndex="lastChange" formatter='date("m/d/Y")'/>
    </Grid>
    )
  }

 renderSign = (format, value) => (
      <span style={{ color: value > 0 ? 'green' : value < 0 ? 'red' : ''}}>
          {Ext.util.Format.number(value, format)}
      </span>
  )

}