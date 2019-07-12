
import React, { Component } from 'react';
import { Grid, Column } from '@sencha/ext-modern';
import '../CompanyData';
import model from '../CompanyModel';

Ext.require({ "xtype": "renderercell" })
Ext.require([
  'Ext.grid.plugin.HeaderReorder'
]);
export default class BasicGridExample extends Component {

  renderSign (format, value) {
    value = Ext.util.Format.number(value, format)
    if (value > 0) {
      return '<span style="color:green;">' + value + '</span>';
    } else if (value < 0) {
      return '<span style="color:red;">' + value + '</span>';
    }
  }


  store = Ext.create('Ext.data.Store', {
    model,
    autoLoad: true,
    pageSize: 0,
    proxy: {
      type: 'ajax',
      url: '/KitchenSink/Companys'
    }
  });

  render () {
    return (
      <Grid title="Stock Prices" store={this.store} shadow grouped enableColumnMove="true">
        <Column text="Company" width="150" dataIndex="name" />
        <Column text="Price" width="85" dataIndex="price" formatter='usMoney' />
        <Column
          text="Change"
          width="100"
          dataIndex="priceChange"
          renderer={function (value) {
            value = Ext.util.Format.number(value, '0.00');
            if (value > 0) {
              return '<span style="color:green;">' + value + '</span>';
            } else if (value < 0) {
              return '<span style="color:red;">' + value + '</span>';
            }
          }}
        />
        <Column
          text="% Change"
          dataIndex="priceChangePct"
          renderer={this.renderSign.bind(this, '0.00')}
        />
        <Column text="Last Updated" width="125" dataIndex="lastChange" formatter='date("m/d/Y")' />
      </Grid>
    )
  }
}