import React, { Component } from 'react';
import { Grid, Column, RendererCell, SegmentedButton, WidgetCell } from '@sencha/ext-modern';
import ActionsCell from './ActionsCell';
import '../../CompanyData';

export default class RendererCellExample extends Component {
    componentDidMount() {
      const pctChangeColumn = this.refs.pctChangeColumn.cmp;
      pctChangeColumn.setRenderer(this.renderNumberCell.bind(this, '0.00%'));
  
      const changeColumn = this.refs.changeColumn.cmp;
      changeColumn.setRenderer(this.renderNumberCell.bind(this, '0.00'));
    }
    
    store = Ext.create('Ext.data.Store', {
        autoLoad: true,
        pageSize: 0,
        proxy: {
            type: 'ajax',
            url: '/KitchenSink/Companys'
        } 
    });

    render() {
        return (
            <Grid title="Stock Prices" store={this.store} shadow grouped>
                <Column text="Company" dataIndex="name" width="150"/>
                <Column text="Price" width="85" dataIndex="price" formatter='usMoney'/>
                <Column ref="changeColumn" text="Change" width="100" dataIndex="priceChange"/>
                <Column ref="pctChangeColumn" text="% Change" dataIndex="priceChangePct"/>
                <Column text="Actions" flex={1} minWidth={210}>
                    <WidgetCell>
                     <SegmentedButton 
                      maxWidth={300}
                      allowDepress = {true} 
                      items = {[
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
                      }
                     />
                    </WidgetCell>
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

    renderNumberCell = (format, value,record, dI, cell) => {
        let color = 'black';
    
        if (value > 0) {
          color = 'green'
        } else if (value < 0) {
          color = 'red'
        }
    
        cell.setStyle({ color });
        return Ext.util.Format.number(value, format);
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

