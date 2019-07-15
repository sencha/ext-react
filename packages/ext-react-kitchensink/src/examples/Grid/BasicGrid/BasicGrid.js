import React, { Component } from 'react';
import { Grid, Column } from '@sencha/ext-modern';
import '../CompanyData';
import model from '../CompanyModel';

Ext.require({ "xtype": "renderercell" })
Ext.require([
  'Ext.grid.plugin.HeaderReorder'
]);
export default class BasicGridExample extends Component {
  componentDidMount() {
    const pctChangeColumn = this.refs.pctChangeColumn.cmp;
    pctChangeColumn.setRenderer(this.renderSign.bind(this, '0.00%'));

    const changeColumn = this.refs.changeColumn.cmp;
    changeColumn.setRenderer(this.renderSign.bind(this, '0.00'));
  }

  renderSign = (format, value,record, dI, cell) => {
    let color = 'black';

    if (value > 0) {
      color = 'green'
    } else if (value < 0) {
      color = 'red'
    }

    cell.setStyle({ color });
    return Ext.util.Format.number(value, format);
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
          ref="changeColumn"
          dataIndex="priceChange"
        />
        <Column
          text="% Change"
          dataIndex="priceChangePct"
          ref="pctChangeColumn"
        />
        <Column text="Last Updated" width="125" dataIndex="lastChange" formatter='date("m/d/Y")' />
      </Grid>
    )
  }
}