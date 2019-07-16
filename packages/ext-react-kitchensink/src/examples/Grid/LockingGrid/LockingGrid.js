import React, {Component} from 'react';
import { LockedGrid, Column } from '@sencha/ext-modern';
import model from '../CompanyModel';

Ext.require([
    'Ext.data.summary.Average',
    'Ext.data.summary.Max',
    'Ext.grid.plugin.Editable',
    'Ext.grid.plugin.CellEditing',
]);

export default class LockingGridExample extends Component {
  componentDidMount() {
    const changeColumn = this.refs.changeColumn.cmp;
    changeColumn.setRenderer(this.renderSign.bind(this, '0.00'));
    const pctChangeColumn = this.refs.pctChangeColumn.cmp;
    pctChangeColumn.setRenderer(this.renderSign.bind(this, '0.00%'));
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
      <LockedGrid
          left="10" top="10" width="800" height="400"
          title="Locking Grid"
          store={this.store}
          platformConfig={{
            'desktop': {
              plugins: {
                gridcellediting: true
              }
            },
            '!desktop': {
              plugins: {
                grideditable: true
              }
            }
          }}
          shadow
          >
          <Column 
              locked="left"
              text='Company'
              width="200"
              dataIndex="name"
              minWidth="100"
              menu={{
                customFirst: {
                  text: 'Custom First',
                  weight: -200,
                  handler: 'onCustomFirst'
                },
                customLast:{
                  text: 'Custom Last',
                  separator: true,
                  handler: 'onCustomLast'
                }
              }}
            />
            <Column 
              locked="left"
              text='Price'
              width="75"
              dataIndex='price'
              formatter='usMoney'
              editable="true"
              editor={{
                xtype: 'numberfield',
                required: true,
                validators: {
                  type: 'number',
                  message: 'Invalid price'
                }
              }}
            />
            <Column 
              locked='left'
              width="70"
              cell={{
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
                },
              }}
            /> 
            <Column 
              locked='right'
              text='Change'
              ref="changeColumn"
              width='120'
              align="right"
              dataIndex='change'
              cell={{
                encodeHtml: false
              }}
            />
            <Column 
              text='% Change'
              width="130"
              align="right"
              ref="pctChangeColumn"
              dataIndex='pctChange'
              cell={{
                encodeHtml: false
              }}
            />
            <Column 
              text='Last Updated'
              width="150"
              dataIndex='lastChange'
              formatter='date("m/d/Y")'
            />
            <Column 
              text='Industry'
              width="150"
              dataIndex='industry'
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

  renderSign = (format, value,record, dI, cell) => {
    let color = 'black';

      if (value > 0) {
        color = 'green'
      } else if (value < 0) {
        color = 'red'
      }

      cell.setStyle({ color });
      return Ext.util.Format.number(value, format);
    //  <span style={{ color: value > 0 ? 'green' : value < 0 ? 'red' : ''}}>
    //      {Ext.util.Format.number(value, format)}
    //  </span>
    }

  summarizeCompanies = (grid, context) => context.records.length + ' Companies';
}