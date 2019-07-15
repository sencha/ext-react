import React, {Component} from 'react';
import { Grid, Column, Toolbar } from '@sencha/ext-modern';
import model from '../../CompanyModel';

Ext.require(['Ext.grid.plugin.ViewOptions']);

export default class ViewOptionsGridExample extends Component {
  componentDidMount() {
    const pctChangeColumn = this.refs.pctChangeColumn.cmp;
    pctChangeColumn.setRenderer(this.renderSign.bind(this, '0.00%'));

    const changeColumn = this.refs.changeColumn.cmp;
    changeColumn.setRenderer(this.renderSign.bind(this, '0.00'));
  }

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
        <Column ref="changeColumn" text="Change" width="100" dataIndex="priceChange"/>
        <Column ref="pctChangeColumn" text="% Change" dataIndex="priceChangePct"/>
        <Column text="Last Updated" dataIndex="priceLastChange" width="125" formatter="date('m/d/Y')"/>
      </Grid>
    )
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
}