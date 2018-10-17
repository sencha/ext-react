import React, { Component } from 'react'

//import { Grid } from '@sencha/ext-classic'
import { reactify } from '@sencha/ext-react'
const Grid = reactify('Grid')

import { renderWhenReady } from '@sencha/ext-react'
import data from './data';

class App1 extends Component {

  onButtonWidgetClick = (button) => {
    Ext.create('Ext.window.Window', {
      title: 'Hello ' + button.text,
      height: 200,
      width: 400,
      modal: true,
      padding: '20px',
      html: 'Hello ' + button.text
    }).show()
  }

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
          {
            text: 'Button',
            width: 150,
            xtype: 'widgetcolumn',
            widget: {
              textAlign: 'center',
              bind: '{record.name}',
              xtype: 'button',
              handler: this.onButtonWidgetClick
            }
          },
          {text:'Name',dataIndex:'name',width:250,locked:true},
          {
            text: 'Stock Price',
            columns: [
              {text:'Price',dataIndex:'price',width:75,formatter:'usMoney',summaryType:'sum',summaryFormatter:'usMoney'}, 
              {text:'Change',dataIndex:'priceChange',width:80}, 
              {text:'% Change',dataIndex:'priceChangePct',width:100}
            ]
          },
          {text:'Email',dataIndex:'email',width:200},
        ]}
      />
    )
 }
}

export default renderWhenReady(App1)
