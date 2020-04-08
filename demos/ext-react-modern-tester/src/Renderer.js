import React, { Component } from 'react';
import { ExtGrid, ExtColumn } from "@sencha/ext-react-modern";
const Ext = window['Ext'];

export default class Renderer extends Component {

  constructor() {
    super()
    var data=[
      { name: 'Marc', email: 'marc@gmail.com',priceChangePct: .25 },
      { name: 'Nick', email: 'nick@gmail.com',priceChangePct: .35 },
      { name: 'Andy', email: 'andy@gmail.com',priceChangePct: .45 }
    ]
    this.store = {xtype: 'store',data: data}
  }

  renderSign = (format, value) => (
    <span style={{ color: value > 0 ? 'green' : value < 0 ? 'red' : ''}}>
        {Ext.util.Format.number(value, format)}
    </span>
  )

  render() {
    return (
      <ExtGrid
        viewport={ true }
        title="The Grid"
        store={ this.store }
      >
        <ExtColumn
          text="% Change"
          dataIndex="priceChangePct"
          align="right"
          renderer={ this.renderSign.bind(this, '0.00') }
        />
      </ExtGrid>
    )
  }

}
