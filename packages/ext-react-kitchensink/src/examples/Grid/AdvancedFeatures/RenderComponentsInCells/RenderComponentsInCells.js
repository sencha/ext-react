import React, { Component } from 'react';
import { Grid, Column, RendererCell, SegmentedButton, ExtWidgetcell } from '@sencha/ext-react-modern';
import ActionsCell from './ActionsCell';
import '../../CompanyData';

export default class RendererCellExample extends Component {

    store = Ext.create('Ext.data.Store', {
        autoLoad: true,
        pageSize: 0,
        proxy: {
            type: 'ajax',
            url: '/KitchenSink/Companys'
        }
    });

    readyColumn = ({cmp, cmpObj}) => {
      this.ColumnCmp = cmp;
      this.ColumnCmp.setCell({
        xtype: 'widgetcell',
        forceWidth: 'true',
        widget: {
          xtype: 'segmentedbutton',
          maxWidth: '300',
          allowDepress: 'true',
          items: [
            {
              text: 'Buy',
              handler: this.buyHandler.bind(this)
            },
            {
              text: 'Sell',
              handler: this.sellHandler.bind(this)
            },
            {
              text: 'Watch',
              handler: this.watchHandler.bind(this)
            }
          ]
        }
      });
    }

    render() {
        return (
            <Grid title="Stock Prices" store={this.store} shadow grouped>
                <Column text="Company" dataIndex="name" width="150"/>
                <Column text="Price" width="85" dataIndex="price" formatter='usMoney'/>
                <Column text="Change" width="100" dataIndex="priceChange" renderer={this.renderNumberCell.bind(this, '0.00')}/>
                <Column text="% Change" dataIndex="priceChangePct" renderer={this.renderNumberCell.bind(this, '0.00%')}/>
                <Column text="Actions" flex={1} minWidth={210} onReady={this.readyColumn}>
                  {/* <ExtWidgetcell
                      widget={{
                        xtype: 'segmentedbutton',
                        maxWidth: 300,
                        allowDepress: true,
                        items: [
                          {
                            text: 'Buy',
                            handler : this.buyHandler
                          },
                          {
                            text: 'Sell',
                            handler : this.sellHandler
                          },
                          {
                            text: 'Watch',
                            handler : this.watchHandler
                          }
                        ]
                      }}
                    >
                    </ExtWidgetcell> */}
                </Column>
            </Grid>
        )
    }

    renderActionsCell = (value, record) => {
        return (
            <ActionsCell
                buyHandler={this.buyHandler.bind(this, record)}
                sellHandler={this.sellHandler.bind(this, record)}
                watchHandler={this.watchHandler.bind(this, record)}
            />
        )
    }

    renderNumberCell(format, value) {
        return (
            <span style={{ color: value > 0 ? 'green' : value < 0 ? 'red' : ''}}>
                {Ext.util.Format.number(value, format)}
            </span>
        )
    }

    buyHandler = (button) => {
        let gridrow = button.up('gridrow'),
            record = gridrow.getRecord();
        Ext.toast(`Buy ${record.get('name')}`)
    }
    sellHandler = (button) => {
        let gridrow = button.up('gridrow'),
            record = gridrow.getRecord();
        Ext.toast(`Sell ${record.get('name')}`)
    }
    watchHandler = (button) => {
        let gridrow = button.up('gridrow'),
            record = gridrow.getRecord();
        Ext.toast(`Watch ${record.get('name')}`)
    }

}

