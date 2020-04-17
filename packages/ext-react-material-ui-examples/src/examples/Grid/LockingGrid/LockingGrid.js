import React, {Component} from 'react';
import { LockedGrid, Column } from '@sencha/ext-react-modern';
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
          left="10" top="10" width="800" height="400"
          title="Locking Grid"
          store={this.store}
          shadow
          columns={[
            {
              locked: true,
              text: 'Company',
              width: 200,
              dataIndex: 'name',
              minWidth: 100,
              menu: {
                customFirst: {
                  text: 'Custom First',
                  weight: -200,
                  handler: 'onCustomFirst'
                },
                customLast: {
                  text: 'Custom Last',
                  separator: true,
                  handler: 'onCustomLast'
                }
              }
            },
            {
              locked: true,
              text: 'Price',
              width: 75,
              dataIndex: 'price',
              formatter: 'usMoney',
              editable: true,
              editor: {
                xtype: 'numberfield',
                required: true,
                validators: {
                  type: 'number',
                  message: 'Invalid price'
                }
              }
            },
            {
              locked: 'left',
              width: 70,
              cell: {
                tools: {
                  approve: {
                    iconCls: 'x-fa fa-check green',
                    handler: this.onApprove.bind(this)
                  },
                  decline: {
                    iconCls: 'x-fa fa-ban red',
                    handler:  this.onDecline.bind(this),
                    weight: 1
                  }
                }
              }
            },
            {
              locked: 'right',
              text: 'Change',
              width: 120,
              align: "right",
              renderer: this.renderSign.bind(this, '0.00'),
              dataIndex: 'change',
              cell: {
                encodeHtml: false
              }
            },
            {
              text: '% Change',
              width: 130,
              align: "right",
              dataIndex: 'pctChange',
              renderer: this.renderSign.bind(this, '0.00%'),
              cell: {
                encodeHtml: false
              }
            },
            {
              text: 'Last Updated',
              width: 150,
              dataIndex: 'lastChange',
              formatter: 'date("m/d/Y")'
            },
            {
              text: 'Industry',
              width: 150,
              dataIndex: 'industry'
            }
          ]}
      >

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
    Ext.util.Format.number(value, format)
    //  <span style={{ color: value > 0 ? 'green' : value < 0 ? 'red' : ''}}>
    //      {Ext.util.Format.number(value, format)}
    //  </span>
  )

  summarizeCompanies = (grid, context) => context.records.length + ' Companies';
}