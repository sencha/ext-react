import React, {Component} from 'react';
import { LockedGrid, Column } from '@sencha/ext-modern';
import model from '../CompanyModel';

Ext.require([
    'Ext.data.summary.Average',
    'Ext.data.summary.Max',
]);

export default class LockingGridExample extends Component {

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
      <LockedGrid
          title="Locking Grid"
          store={this.store}
          shadow
      >
        <Column 
          text="Company" 
          dataIndex="name" 
          width="150"
          summaryRenderer={this.summarizeCompanies}
          locked
        />
        <Column 
          text="Price" 
          width="75" 
          dataIndex="price" 
          formatter="usMoney" 
          summary="average"
          locked
        />
        <Column
          locked="left"
          cell={{
            tools: {
                approve: {
                    iconCls: 'x-fa fa-check green',
                    handler: this.onApprove
                },
                decline: {
                    iconCls: 'x-fa fa-ban red',
                    handler: this.onDecline,
                    weight: 1
                }
            }
        }}
        /> 
        <Column 
          text="Change" 
          width="90" 
          dataIndex="priceChange" 
          renderer={this.renderSign.bind(this, '0.00')}
          summary="max"
          locked="right"
        />
        <Column 
          text="% Change" 
          width="100"
          dataIndex="priceChangePct" 
          renderer={this.renderSign.bind(this, '0.00')}
          summary="average" 
        />
        <Column 
          text="Last Updated" 
          width="125" 
          dataIndex="priceLastChange" 
          formatter="date('m/d/Y')" 
          summary="max"
        />
      </LockedGrid>
    )
  }
  
  onApprove = (grid, info) => {
    Ext.Msg.alert('Approve', info.record.get('name'));
  }

  onDecline = (grid, info) => {
    Ext.Msg.alert('Decline', info.record.get('name'));
  }

  renderSign = (format, value) => (
      <span style={{ color: value > 0 ? 'green' : value < 0 ? 'red' : ''}}>
          {Ext.util.Format.number(value, format)}
      </span>
  )

  summarizeCompanies = (grid, context) => context.records.length + ' Companies';
}