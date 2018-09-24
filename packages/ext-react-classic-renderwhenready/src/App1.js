import React, { Component } from 'react'
import { Grid } from '@sencha/ext-classic'
import { renderWhenReady } from '@sencha/ext-react'
import data from './data';

class App1 extends Component {
  store = Ext.create('Ext.data.Store', {data})
  render() {
    return (
      <Grid 
        height={600} 
        width={500} 
        title="Classic Toolkit Grid"
        store={this.store}
        features= {[{ftype: 'summary',dock: 'bottom'}]}
        columns={[
          { text: 'Name', dataIndex: 'name', width:250,  locked: true},
          {
            text: 'Stock Price',
            columns: [
              {
                text: 'Price',
                dataIndex: 'price',
                width: 75,
                sortable: true,
                formatter: 'usMoney',
                summaryType: 'sum',
                summaryFormatter: 'usMoney'
              }, 
              {
                text: 'Change',
                dataIndex: 'priceChange',
                width: 80,
                sortable: true
              }, 
              {
                text: '% Change',
                dataIndex: 'priceChangePct',
                width: 100,
                sortable: true
              }
            ]
          },
          { text: 'Email', dataIndex: 'email', flex: 1 }
        ]}
      />
    )
 }
}

export default renderWhenReady(App1)
