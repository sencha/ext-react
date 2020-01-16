
import React, { Component } from 'react';
import { ExtGrid, ExtColumn } from '@sencha/ext-react-modern';
import '../CompanyData';
import model from '../CompanyModel';

Ext.require({"xtype":"renderercell"})
Ext.require([
  'Ext.ExtGrid.plugin.HeaderReorder'
]);

export default class BasicExtGridExample extends Component {
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
      <ExtGrid title="Stock Prices" store={this.store} scrollable shadow grouped>
        <ExtColumn text="Company" dataIndex="name" width="150"/>
        <ExtColumn text="Price" width="85" dataIndex="price" formatter='usMoney'/>
        {/* <ExtColumn
          text="Change"
          width="100"
          dataIndex="priceChange"
          renderer={this.renderSign.bind(this, '0.00')}
        /> */}
        <ExtColumn
          text="% Change"
          dataIndex="priceChangePct"
          renderer={this.renderSign.bind(this, '0.00')}
        />
        <ExtColumn text="Last Updated" width="125" dataIndex="lastChange" formatter='date("m/d/Y")'/>
    </ExtGrid>
    )
  }

 renderSign = (format, value) => (
      <span style={{ color: value > 0 ? 'green' : value < 0 ? 'red' : ''}}>
          {Ext.util.Format.number(value, format)}
      </span>
  )

}