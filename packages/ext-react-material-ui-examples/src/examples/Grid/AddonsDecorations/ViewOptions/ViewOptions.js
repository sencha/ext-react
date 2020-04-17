import React, {Component} from 'react';
import { Grid, Column, Toolbar } from '@sencha/ext-react-modern';
import model from '../../CompanyModel';

Ext.require(['Ext.grid.plugin.ViewOptions']);

export default class ViewOptionsGridExample extends Component {

  store = Ext.create('Ext.data.Store', {
    autoLoad: true,
    pageSize: 0,
    proxy: {
      type: 'ajax',
      url: 'resources/data/CompanyData.json'
    }
  });

  render() {
    return (
      <Grid
        title="Grid with View Options"
        store={this.store}
        plugins="gridviewoptions"
        shadow
      >
        <Toolbar docked="top">
          <div style={{fontSize: '14px', fontWeight: 'normal'}}>Long press on a column header to customize this grid.</div>
        </Toolbar>
        <Column text="Company" dataIndex="name" width="150"/>
        <Column text="Phone" dataIndex="phone" width="100" hidden/>
        <Column text="Industry" dataIndex="industry" width="150" hidden/>
        <Column text="Price" dataIndex="price" width="75" formatter="usMoney" />
        <Column text="Change" width="100" dataIndex="priceChange" renderer={this.renderSign.bind(this, '0.00')}/>
        <Column text="% Change" dataIndex="priceChangePct" renderer={this.renderSign.bind(this, '0.00')}/>
        <Column text="Last Updated" dataIndex="priceLastChange" width="125" formatter="date('m/d/Y')"/>
      </Grid>
    )
  }

 renderSign = (format, value) => (
      <span style={{ color: value > 0 ? 'green' : value < 0 ? 'red' : ''}}>
          {Ext.util.Format.number(value, format)}
      </span>
  )
}