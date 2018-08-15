import React, { Component } from 'react';
import { Grid, Column, RendererCell, Button, Container } from '@sencha/ext-modern';
import ActionsCell from './ActionsCell';

export default class App extends Component {

  store = Ext.create('Ext.data.Store', {
    autoLoad: true,
    pageSize: 0,
    proxy: {
      type: 'ajax',
      url: 'resources/data/CompanyData.json'
    } 
  })

//   <Column 
//   text="% Change" 
//   dataIndex="priceChangePct" 
//   cell= "{
//     bind: {
//         value: '{record.pctChange:number(".00")}',
//         cls: '{cellCls}',
//         bodyCls: '{record.pctChange:sign("ticker-body-loss", "ticker-body-gain")}'
//     }
// }"
//   renderer={this.renderNumberCell.bind(this, '0.00%')}
//   />

// <Column text="Actions" flex={1} minWidth={210} cell={{ encodeHtml: false }}>
// <RendererCell renderer={this.renderActionsCell} bodyStyle={{ padding: '0 10px'}}/>
// </Column>

// <Column text="Actions" flex={1} minWidth={210} cell={{ encodeHtml: false }}>
// <RendererCell/>
// </Column>

// <Column 
// text="price2" 
// cell={{
//   bind: '{record.price:usMoney}'
// }}
// />




  render() {
    return (
      <Grid title="Stock Prices" store={this.store} 
      viewModel={{
        data: {
          tickDelay: 200
        }
      }}
      shadow grouped>

      <Column text="Price" width="85" 
      cell= {{bind: '{tickDelay}'}}
      />

      <Column text="Price" width="85" 
      cell= {{bind: '{tickDelay}'}}
      />

        <Column text="Company" dataIndex="name" width="150"/>
        <Column text="Price" width="85" dataIndex="price" formatter='usMoney'/>
        <Column text="Change" width="100" dataIndex="priceChange" cell={{ encodeHtml: false }} tpl={this.renderNumberCell.bind(this, "priceChange",'0.00')}/>
       </Grid>
    )
  }

  renderNumberCell = (field, format, data) => {
    const value = data[field];
    return (
      <span style={{ color: value > 0 ? 'green' : value < 0 ? 'red' : ''}}>

      <ActionsCell 
        buyHandler={this.buyHandler.bind(this, data)} 
        sellHandler={this.sellHandler.bind(this, data)} 
        watchHandler={this.watchHandler.bind(this, data)} 
      />

        {Ext.util.Format.number(value, format)}
      </span>
    )
  }


  renderActionsCell2 = (value, record) => {
    return (
      <ActionsCell 
        buyHandler={this.buyHandler.bind(this, record)} 
        sellHandler={this.sellHandler.bind(this, record)} 
        watchHandler={this.watchHandler.bind(this, record)} 
      />
    )
  }

  renderNumberCell2(format, value) {
    return (
      <span style={{ color: value > 0 ? 'green' : value < 0 ? 'red' : ''}}>
        {Ext.util.Format.number(value, format)}
      </span>
    )
  }


//   <ActionsCell 
//   buyHandler={this.buyHandler.bind(this, record)} 
//   sellHandler={this.sellHandler.bind(this, record)} 
//   watchHandler={this.watchHandler.bind(this, record)} 
// />


  renderActionsCell = (field, format, record) => {
    return (
'hi'
    )
  }






  buyHandler = (record) => Ext.toast(`Buy ${record.get('name')}`)
  sellHandler = (record) => Ext.toast(`Sell ${record.get('name')}`)
  watchHandler = (record) => Ext.toast(`Watch ${record.get('name')}`)

}