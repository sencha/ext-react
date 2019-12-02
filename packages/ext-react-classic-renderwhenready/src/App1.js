import React, { Component } from 'react'
import { Grid } from '@sencha/ext-classic'
import { renderWhenReady } from '@sencha/ext-react-modern'
import data from './data';

class App1 extends Component {
  store = Ext.create('Ext.data.Store', {data})
  render() {
    return (
      <Grid
        height={500}
        width={500}
        title="Classic Toolkit Grid"
        store={this.store}
        features= {[{ftype: 'summary',dock: 'bottom'}]}
        columns={[
          {text:'Name',dataIndex:'name',width:250,locked:true},
          {
            text: 'Stock Price',
            columns: [
              {text:'Price',dataIndex:'price',width:75,formatter:'usMoney',summaryType:'sum',summaryFormatter:'usMoney'},
              {text:'Change',dataIndex:'priceChange',width:80},
              {text:'% Change',dataIndex:'priceChangePct',width:100}
            ]
          },
          {text:'Email',dataIndex:'email',width:200}
        ]}
      />
    )
 }
}

export default renderWhenReady(App1)
