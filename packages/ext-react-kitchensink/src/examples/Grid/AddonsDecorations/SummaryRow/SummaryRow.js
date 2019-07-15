import React, {Component} from 'react';
import { Grid, Column } from '@sencha/ext-modern';
import model from '../../CompanyModel';

Ext.require([
    'Ext.grid.plugin.SummaryRow',
    'Ext.data.summary.Average',
    'Ext.data.summary.Max',
]);

export default class RowBodyGridExample extends Component {
  componentDidMount() {
    const pctChangeColumn = this.refs.pctChangeColumn.cmp;
    pctChangeColumn.setRenderer(this.renderSign.bind(this, '0.00%'));

    const changeColumn = this.refs.changeColumn.cmp;
    changeColumn.setRenderer(this.renderSign.bind(this, '0.00'));
  }

  store = Ext.create('Ext.data.Store', {
    model,
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
          title="Summary Row Grid"
          store={this.store}
          shadow
          plugins={{
              gridsummaryrow: true
          }}
      >
        <Column 
          text="Company" 
          dataIndex="name" 
          width="150"
          summaryRenderer={this.summarizeCompanies}
        />
        <Column 
          text="Price" 
          width="75" 
          dataIndex="price" 
          formatter="usMoney" 
          summary="average"
        />
        <Column 
          ref="changeColumn" 
          text="Change" 
          width="90" 
          dataIndex="priceChange" 
          summary="max" 
        />
        <Column 
          ref="pctChangeColumn"
          text="% Change" 
          width="100"
          dataIndex="priceChangePct" 
          summary="average" 
        />
        <Column 
          text="Last Updated" 
          width="125" 
          dataIndex="priceLastChange" 
          formatter="date('m/d/Y')" 
          summary="max"
        />
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

  summarizeCompanies = (grid, context) => context.records.length + ' Companies';
}