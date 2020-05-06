//import React from 'react';
//import { ExtGrid } from "@sencha/ext-react-material-ui";

class Rows extends React.Component {

  constructor() {
    super()
    this.store = {
      autoLoad: true,
      proxy: {
        type: 'ajax',
        url: datafolder + 'grouping.json'
      }
    }
    this.columns = [
      {
        text: "Name",
        dataIndex: "name",
        key: "name",
        width: 150,
        cell: { encodeHtml: false, xtype: 'reactcell' },
        renderer: v => <strong>{v}</strong>,
        //groupHeaderTpl: '{columnName}: {value:htmlEncode}',
        groupHeaderTpl: v => <strong> {v.columnName}: {v.name}</strong>,
        summaryRenderer: v => <strong>Total</strong>
      },
      {
        text: 'Number',
        dataIndex: "num",
        key: "num",
        width: 200,
        summary: 'sum',
        // summaryRenderer: v => `$${v}`
      },
      {
        text: "Email",
        dataIndex: "email",
        key: "email",
        width: 200,
        summary: 'count',
        // groupHeaderTpl: v => <em>{v.name}</em>,
        // summaryRenderer: v => `Count - ${v}`
      }
    ];
  }

  render() {
    return (
      <ExtGrid
        fitToParent
        title='ExtGrid Grouping'
        store={ this.store }
        columns={ this.columns }
        grouped={true}
        infinite={false}
      />
    )
  }

}
