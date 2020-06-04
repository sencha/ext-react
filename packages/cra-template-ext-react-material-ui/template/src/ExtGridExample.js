import React, { Component } from 'react';
import { ExtGrid } from "@sencha/ext-react-material-ui";
//import data from './ExtGridData.json';
const Ext = window['Ext'];

export default class ExtGridExample extends Component {

  constructor() {
    super()
    this.store = {
      xtype: 'store',
      data: [
        { name: 'Marc',email: 'marc@gmail.com',priceChangePct: -.25 },
        { name: 'Nick', email: 'nick@gmail.com',priceChangePct: .35 },
        { name: 'Andy', email: 'andy@gmail.com',priceChangePct: 1.45 }
      ]
    }
  }

  renderSign = (format, value) => (
    <span style={{ color: value > 0 ? 'green' : value < 0 ? 'red' : ''}}>
      {Ext.util.Format.number(value, format)}
    </span>
  )

  render() {
    return (
      <ExtGrid
        height="300px"
        title="ExtReact Grid"
        store={this.store}
        columns={[
          {
            text: "name",
            dataIndex: "name",
            cell: { encodeHtml: false, xtype: 'reactcell' },
            renderer: v => <strong>{v}</strong>
          },
          {text: "email", dataIndex: "email", flex: "1"},
          {
            text: "% Change",
            dataIndex: "priceChangePct",
            align: "right",
            cell: { encodeHtml: false, xtype: 'reactcell' },
            renderer: this.renderSign.bind(this, '0.00')
          }
        ]}
      />
    )
  }

}